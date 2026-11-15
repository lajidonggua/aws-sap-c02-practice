/* Compile individually compared bilingual corrections; never alter English or scoring keys. */
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..'),read=n=>fs.readFileSync(path.join(root,n),'utf8');
const c=vm.createContext({});vm.runInContext(read('sap_questions.js')+'\n'+read('sap_explanations.js')+';this.q=CHOICE_QUESTIONS;this.d=DISPUTED_QUESTIONS;this.e=QUESTION_EXPLANATIONS;',c);
const rows=['q001-140.json','q141-280.json','q281-420.json','q421-498.json','q499-529.json'].flatMap(n=>JSON.parse(read('docs/translation-review/'+n))).sort((a,b)=>a.id-b.id);
if(rows.length!==529||rows.some((r,i)=>r.id!==i+1||r.reviewed!==true))throw Error('Every question must have an explicit bilingual review.');
const replacements={
 '子网路':'子网','网际网路':'互联网','物件储存':'对象存储','资料库':'数据库','应用程式':'应用程序','伺服器':'服务器','执行个体':'实例','虚拟机器':'虚拟机','虚拟机​​':'虚拟机','无伺服器':'无服务器','档案系统':'文件系统','档案':'文件','储存':'存储','资料':'数据','网路':'网络','连线':'连接','连结':'链接','帐户':'账户','帐号':'账户','会员账户':'成员账户','使用者':'用户','用户端':'客户端','介面':'接口','位址':'地址','记忆体':'内存','函式库':'库','函式':'函数','负载平衡器':'负载均衡器','负载平衡':'负载均衡','唯读':'只读','快取':'缓存','伫列':'队列','讯息':'消息','软体':'软件','硬体':'硬件','原始码':'源代码','程式码':'代码','程式':'程序','自订':'自定义','相容':'兼容','效能':'性能','支援':'支持','透过':'通过','装置':'设备','营运开销':'运维开销','营运工作量':'运维工作量','营运团队':'运维团队','营运效率':'运维效率','运转状况检查':'健康检查','运行状况检查':'健康检查','运作状况检查':'健康检查','回传':'返回','回应':'响应','存取':'访问','闸道':'网关','范本':'模板','复原':'恢复','汇入':'导入','汇出':'导出','堆叠':'堆栈','预设':'默认','登入':'登录','排程':'调度','预存程序':'存储过程','原点':'源站','CloudFront 发行版':'CloudFront 分配','CloudFront发行版':'CloudFront 分配','CloudFront 分布':'CloudFront 分配','CloudFront分布':'CloudFront 分配','自动缩放':'自动扩缩容','预先配置并发性':'预置并发','预先配置吞吐量':'预置吞吐量','预先配置容量':'预置容量','频宽':'带宽','公用 IP':'公网 IP','私人 IP':'私有 IP'
};
Object.assign(replacements,{'身分':'身份','金钥':'密钥','物件':'对象','磁碟区':'卷','磁碟':'磁盘','终端节点':'端点','主控台':'控制台','呼叫':'调用','线上':'在线','元件':'组件','Docker图像':'Docker 镜像','Docker 图像':'Docker 镜像','Docker映像':'Docker 镜像','Docker 映像':'Docker 镜像'});
// Longest first prevents partial replacements such as 网路 before 子网路.
const pairs=Object.entries(replacements).sort((a,b)=>b[0].length-a[0].length);
function normalize(v){let t=String(v);for(const [a,b]of pairs)t=t.split(a).join(b);return t.replace(/於/g,'于').replace(/[\u200b\ufeff]/g,'');}
let changedQuestions=0,stemPatches=0,optionPatches=0;
for(const r of rows){
 const q=c.q.find(q=>q.id===r.id);if(!q||!r.notes)throw Error('Incomplete review '+r.id);
 if(r.question_zh){if(typeof r.question_zh!=='string')throw Error('Invalid stem '+r.id);q.question_zh=r.question_zh;stemPatches++;}
 for(const [letter,text]of Object.entries(r.options||{})){const o=q.options.find(o=>o.letter===letter);if(!o||typeof text!=='string'||!text.trim())throw Error('Invalid option '+r.id+letter);o.text_zh=text;optionPatches++;}
 if(r.question_zh||Object.keys(r.options||{}).length)changedQuestions++;
 q.question_zh=normalize(q.question_zh);for(const o of q.options)o.text_zh=normalize(o.text_zh);
 q.translation_review={revision:'2026-11-16',reviewed:true};
 if(c.e[q.id])c.e[q.id].blocker=q.question_zh;
}
fs.writeFileSync(path.join(root,'sap_questions.js'),'/* English source preserved; answers and Chinese translations reviewed individually, 2026-11-16. */\nconst CHOICE_QUESTIONS = '+JSON.stringify(c.q,null,2)+';\n\nconst DISPUTED_QUESTIONS = '+JSON.stringify(c.d,null,2)+';\n');
fs.writeFileSync(path.join(root,'sap_explanations.js'),'/* Individually reviewed reasoning; not an official AWS exam answer key. */\nconst QUESTION_EXPLANATIONS = '+JSON.stringify(c.e,null,2)+';\n');
const overrides=JSON.parse(read('quick_overrides.json'));
for(const q of c.q){const o=overrides[q.id];if(!o)continue;for(const key of ['questionCues','avoid']){if(o[key])o[key]=Array.isArray(o[key])?o[key].map(normalize):normalize(o[key]);}if(o.answerCues)for(const k of Object.keys(o.answerCues))o.answerCues[k]=o.answerCues[k].map(normalize);
 const compact=s=>s.replace(/\s+/g,'');
 if(o.questionCues?.some(x=>!compact(q.question_zh).includes(compact(x))))delete o.questionCues;
 if(o.answerCues&&Object.entries(o.answerCues).some(([l,cues])=>!q.options.find(p=>p.letter===l)||cues.some(x=>!compact(q.options.find(p=>p.letter===l).text_zh).includes(compact(x)))))delete o.answerCues;
}
fs.writeFileSync(path.join(root,'quick_overrides.json'),JSON.stringify(overrides,null,2)+'\n');
fs.writeFileSync(path.join(root,'docs/translation-review/summary.json'),JSON.stringify({revision:'2026-11-16',reviewed:529,semanticCorrectionQuestions:changedQuestions,stemPatches,optionPatches},null,2)+'\n');
console.log({reviewed:529,semanticCorrectionQuestions:changedQuestions,stemPatches,optionPatches});
