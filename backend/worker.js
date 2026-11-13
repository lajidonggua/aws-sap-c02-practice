import { createAuth } from './auth.js';
import Model from '../progress_model.js';

const json=(data,status=200)=>new Response(JSON.stringify(data),{status,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
async function readLimited(request,limit){
 if(!request.body)return '';const reader=request.body.getReader(),chunks=[];let bytes=0;
 while(true){const {done,value}=await reader.read();if(done)break;bytes+=value.byteLength;if(bytes>limit){reader.cancel();throw new RangeError('Request too large');}chunks.push(value);}
 const combined=new Uint8Array(bytes);let offset=0;for(const chunk of chunks){combined.set(chunk,offset);offset+=chunk.byteLength;}return new TextDecoder().decode(combined);
}
export default {
 async fetch(request,env){
  const url=new URL(request.url),origin=request.headers.get('Origin');
  const allowed=new Set(env.ALLOWED_ORIGINS.split(',').map(value=>value.trim()));
  if(origin&&!allowed.has(origin))return json({message:'此网站尚未获准访问账号服务。'},403);
  function cors(response){const headers=new Headers(response.headers);if(origin){headers.set('Access-Control-Allow-Origin',origin);headers.set('Vary','Origin');}headers.set('Access-Control-Allow-Headers','Content-Type, Authorization');headers.set('Access-Control-Allow-Methods','GET, POST, OPTIONS');headers.set('Access-Control-Expose-Headers','set-auth-token');headers.set('Cache-Control','no-store');headers.set('X-Content-Type-Options','nosniff');return new Response(response.body,{status:response.status,headers});}
  if(request.method==='OPTIONS')return cors(new Response(null,{status:204}));
  if(url.pathname==='/api/health')return cors(json({ready:true}));
  try{
   if(Number(request.headers.get('Content-Length')||0)>1100000)return cors(json({message:'请求内容过大。'},413));
   const auth=createAuth(env);
   if(url.pathname.startsWith('/api/auth/')){
    if(request.method==='POST'){
     const text=await readLimited(request,20000);request=new Request(request,{body:text});
    }
    return cors(await auth.handler(request));
   }
   if(url.pathname!=='/api/progress'||!['GET','POST'].includes(request.method))return cors(json({message:'页面不存在。'},404));
   const session=await auth.api.getSession({headers:request.headers});
   if(!session)return cors(json({message:'请先登录。'},401));
   const userId=session.user.id;let schema=url.searchParams.get('schema')==='2'?2:1;
   if(request.method==='POST'){
    const text=await readLimited(request,1100000);
    let cells;try{const body=JSON.parse(text);schema=body.schema===2?2:1;cells=Model.validate(body.cells);}catch{return cors(json({message:'学习记录格式不正确。'},400));}
    if(Object.keys(cells).length){
     await env.DB.prepare(`INSERT INTO learning_progress (user_id,cell,stamp,value)
      SELECT ?,key,json_extract(value,'$.stamp'),value -> '$.value' FROM json_each(?) WHERE true
      ON CONFLICT(user_id,cell) DO UPDATE SET stamp=excluded.stamp,value=excluded.value
      WHERE excluded.stamp>learning_progress.stamp OR (excluded.stamp=learning_progress.stamp AND excluded.value>learning_progress.value)`)
      .bind(userId,JSON.stringify(cells)).run();
    }
   }
   const result=await env.DB.prepare('SELECT cell,stamp,value FROM learning_progress WHERE user_id=?').bind(userId).all();
   const cells=Object.create(null);for(const row of result.results)cells[row.cell]={stamp:row.stamp,value:JSON.parse(row.value)};
   return cors(json({cells:Model.forSchema(cells,schema)}));
  }catch(error){if(error instanceof RangeError)return cors(json({message:'请求内容过大。'},413));console.error('Account request failed',error.name);return cors(json({message:'账号服务暂时不可用，请稍后重试。'},500));}
 }
};
