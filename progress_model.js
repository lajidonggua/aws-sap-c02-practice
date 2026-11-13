(function(root){
 'use strict';
 const KEYS={practice:'sap-quick-practice-v1',flash:'sap-five-second-v1',study:'sap-prestudy-v1',review:'sapc02-progress-v1',position:'sap-review-position-v1',reviewed:'sap-review-answers-v1',scopes:'sap-scoped-practice-v1',multi:'sap_multi_mode_v1',multiPosition:'sap-multi-position-v1',path:'sap-learning-path-v1'};
 const known=new Set(Object.values(KEYS));
 const own=(object,key)=>Object.prototype.hasOwnProperty.call(object,key);
 const object=value=>value&&typeof value==='object'&&!Array.isArray(value);
 const clone=value=>JSON.parse(JSON.stringify(value));
 const id=value=>/^\d+$/.test(String(value))&&Number(value)>=1&&Number(value)<=529;
 const safeName=value=>/^[a-z0-9][a-z0-9:-]{0,100}$/.test(value)&&!['constructor','prototype','__proto__'].includes(value);
 const lessonId=value=>typeof value==='string'&&/^[a-z][a-z0-9-]{0,63}$/.test(value)&&safeName(value);
 const timestamp=value=>Number.isSafeInteger(value)&&value>=0&&value<=8640000000000000;
 const minutes=value=>[5,10,15].includes(value);
 const shape=(value,fields)=>object(value)&&Object.keys(value).length===fields.length&&fields.every(field=>own(value,field));
 function encode(key,data){
  if(!known.has(key)||!object(data))throw new Error('学习记录格式不正确。');
  const fields=Object.create(null),put=(field,value)=>{if(value!==undefined)fields[field]=clone(value);};
  const map=(name,source)=>{if(object(source))for(const [item,value]of Object.entries(source))if((id(item)||safeName(item))&&value!==undefined)put(name+'/'+item,value);};
  const set=(name,values)=>{if(Array.isArray(values))for(const item of values)if(id(item)||safeName(String(item)))put(name+'/'+item,true);};
  if(key===KEYS.practice){map('answers',data.answers);set('stars',data.stars);put('last',data.last);}
  else if(key===KEYS.flash){if(Array.isArray(data.again))for(const q of data.again)if(id(q))put('mark/'+q,'again');if(Array.isArray(data.known))for(const q of data.known)if(id(q))put('mark/'+q,'known');put('last',data.last);}
  else if(key===KEYS.study){set('read',data.read);map('quiz',data.quiz);put('last',data.last);}
  else if(key===KEYS.path){map('reviews',data.reviews);for(const field of ['last','minutes','draft'])put(field,data[field]);}
  else if(key===KEYS.multi){set('wrongIds',data.wrongIds);set('starredIds',data.starredIds);map('answeredIds',data.answeredIds);for(const k of ['filterNeed','seconds'])put(k,data[k]);}
  else if(key===KEYS.position)put('value',data);
  else for(const [item,value]of Object.entries(data))if(safeName(item)||id(item))put(item,value);
  for(const [field,value]of Object.entries(fields))if(!validField(key,field,value))throw new Error('学习记录包含无效内容。');
  return fields;
 }
 function validField(key,field,value){
  if(!known.has(key)||typeof field!=='string')return false;
  const [name,item,...extra]=field.split('/');if(extra.length)return false;
  let permitted=false;
  if(key===KEYS.practice)permitted=(name==='answers'&&id(item))||(name==='stars'&&id(item))||field==='last';
  else if(key===KEYS.flash)permitted=(name==='mark'&&id(item))||field==='last';
  else if(key===KEYS.study)permitted=(['read','quiz'].includes(name)&&safeName(item||''))||field==='last';
  else if(key===KEYS.path)permitted=(name==='reviews'&&lessonId(item))||['last','minutes','draft'].includes(field);
  else if(key===KEYS.multi)permitted=(['wrongIds','starredIds','answeredIds'].includes(name)&&id(item))||['filterNeed','seconds'].includes(field);
  else if(key===KEYS.position)permitted=field==='value';
  else permitted=!item&&safeName(field);
  if(!permitted)return false;
  if(value===null)return true;
  if(key===KEYS.path){
   if(name==='reviews')return shape(value,['reviewedAt','dueAt','rating','reviews','streak'])&&timestamp(value.reviewedAt)&&timestamp(value.dueAt)&&value.dueAt>=value.reviewedAt&&['again','fuzzy','clear'].includes(value.rating)&&Number.isInteger(value.reviews)&&value.reviews>=1&&value.reviews<=1000000&&Number.isInteger(value.streak)&&value.streak>=0&&value.streak<=4;
   if(field==='last')return lessonId(value);
   if(field==='minutes')return minutes(value);
   return shape(value,['id','folded','answer','openedAt','minutes'])&&lessonId(value.id)&&typeof value.folded==='boolean'&&(value.answer===null||Number.isInteger(value.answer)&&value.answer>=0&&value.answer<=2)&&timestamp(value.openedAt)&&minutes(value.minutes);
  }
  if(key===KEYS.practice&&name==='answers')return object(value)&&typeof value.correct==='boolean'&&Array.isArray(value.selected)&&value.selected.length<=8&&value.selected.every(letter=>/^[A-H]$/.test(letter));
  if(['stars','read','wrongIds','starredIds'].includes(name)||key===KEYS.review||key===KEYS.reviewed)return typeof value==='boolean';
  if(key===KEYS.flash&&name==='mark')return ['again','known'].includes(value);
  if(key===KEYS.study&&name==='quiz')return Number.isInteger(value)&&value>=0&&value<=10;
  if(field==='last')return key===KEYS.study?safeName(value):id(value);
  if(key===KEYS.position)return object(value)&&typeof value.anchor==='string'&&/^[a-z0-9-]{1,100}$/.test(value.anchor)&&Number.isFinite(value.offset)&&value.offset>=0&&value.offset<=100000;
  if(key===KEYS.scopes||key===KEYS.multiPosition)return id(value);
  if(key===KEYS.multi&&name==='answeredIds')return typeof value==='boolean'||(object(value)&&JSON.stringify(value).length<2000);
  return typeof value==='number'&&Number.isFinite(value)&&value>=0&&value<1e10;
 }
 function decode(key,fields){
  const entries=Object.entries(fields).filter(([,value])=>value!==null);if(!entries.length)return null;
  let out={};
  if(key===KEYS.practice)out={answers:{},stars:[],last:1};
  else if(key===KEYS.flash)out={again:[],known:[],last:1};
  else if(key===KEYS.study)out={read:[],quiz:{},last:'foundations'};
  else if(key===KEYS.path)out={reviews:{}};
  else if(key===KEYS.multi)out={wrongIds:[],starredIds:[],answeredIds:{},filterNeed:0,seconds:0};
  for(const [field,value]of entries){const [name,item]=field.split('/');
   if(key===KEYS.position)return clone(value);
   if(key===KEYS.flash&&name==='mark'){out[value].push(Number(item));continue;}
   if(item){if(Array.isArray(out[name])){if(value)out[name].push(name==='read'?item:Number(item));}else out[name][item]=clone(value);}
   else out[field]=clone(value);
  }
  return out;
 }
 function validate(cells){
  if(!object(cells)||Object.keys(cells).length>5000||JSON.stringify(cells).length>1000000)throw new Error('学习备份过大或格式不正确。');
  for(const [cell,entry]of Object.entries(cells)){
   const parts=cell.split('|');
   if(parts.length!==2||!object(entry)||typeof entry.stamp!=='string'||!/^\d{16}-[a-z0-9-]{8,64}$/.test(entry.stamp)||!own(entry,'value')||!validField(parts[0],parts[1],entry.value))throw new Error('学习备份包含无法识别的记录。');
  }
  return clone(cells);
 }
 function merge(a,b){
  const out=Object.assign(Object.create(null),a);
  for(const [key,entry]of Object.entries(b)){const previous=out[key];if(!previous||entry.stamp>previous.stamp||(entry.stamp===previous.stamp&&JSON.stringify(entry.value)>JSON.stringify(previous.value)))out[key]=clone(entry);}
  return out;
 }
 // Older clients reject unknown cells, so opt into the expanded response explicitly.
 function forSchema(cells,schema=1){return Object.fromEntries(Object.entries(cells).filter(([cell])=>schema===2||!cell.startsWith(KEYS.path+'|')));}
 const api={KEYS,known,encode,decode,validate,merge,clone,forSchema};root.ProgressModel=api;
 if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(globalThis);
