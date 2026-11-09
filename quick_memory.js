/* Short study cues derived from the existing question bank, not a new answer key. */
const MEMORY_CUES = {
447:['费用突然涨：异常检测找来源，订阅负责通知。','本题看 Cost Anomaly Detection 的 AWS services 监控。'],
492:['进 SSM 管理：Agent 装好，IAM 权限给够。','本题按题库 A、D 判分；原解析提示 Discovery Agent 并非 SSM Agent，勿混记。'],
446:['共享数据库题：先分清共享资源与打通网络。','原题库选择 RAM 共享 Aurora；这条依照旧解析保留，使用前须核对题目适用条件。'],
1:['本地查云用 Inbound；云查本地用 Outbound。','本题还要把私有域关联到所有需要解析的 VPC。'],
2:['跨区容灾三件套：应用备一套、数据同步、DNS 切换。','DynamoDB 用 Global Tables；主备切换看 Failover + 健康检查。'],
3:['新人先入临时组，限制下放生产组。','根上的 Deny 不搬走，下面加 Allow 也没用。'],
4:['会话要黏住，读多加副本。','本题选 ALB Sticky + Aurora 读副本扩缩；别把读扩容当成写扩容。'],
6:['跨账号开两把锁：桶放行，人有权。','Bucket Policy 和访问者 IAM 权限都要有。'],
7:['容器要长跑，省运维找 Fargate。','镜像放 ECR，流量走 ALB；按本题需求选择。'],
8:['主站倒，DNS 切；备库升，容量补。','故障转移还要自动提升数据库、扩容备用应用。'],
9:['三层都防倒：应用、数据库、缓存都要高可用。','只给 EC2 做扩容，不代表数据库和缓存也能自动恢复。'],
10:['错误页放 S3，CloudFront 来替换。','本题考自定义错误响应，不必再造一套转发流程。'],
11:['网络集中管，子网 RAM 分享。','先开组织共享，再把子网共享到目标 OU。'],
12:['私网接服务：对方开服务，我方建端点。','PrivateLink：提供方 Endpoint Service，使用方 VPC Endpoint。'],
13:['批量打补丁，找 Patch Manager。','本题要统一修补和报告。'],
14:['删机先暂停，命令做完再放行。','Lifecycle Hook → EventBridge → Lambda → SSM。'],
15:['跨账号私有域：先授权，再关联，最后撤授权。','别把数据库 IP 填进 DNS 服务器配置。'],
16:['媒体放 S3，分发用 CloudFront。','本题瓶颈在媒体分发，不是盲目升级共享磁盘。'],
18:['文件进桶、队列排队、函数调用识别。','S3 → SQS → Lambda → Rekognition，减少自管服务器。'],
19:['Lambda 灰度：SAM 配，CodeDeploy 切。','渐进放量，异常自动回滚。'],
22:['限制某个客户请求量：Usage Plan。','看清是按客户限流，不只是系统总体扩容。']
};
function memoryClean(text){return String(text||'').replace(/（[^（）]*）|\([^()]*\)/g,'').replace(/^正确答案(?:是|为)[^。]*。\s*/,'').replace(/^[✓✔]\s*正确[。．：:]?\s*/,'').replace(/^错[。．：:]\s*/,'').trim();}
function memorySentence(text){return memoryClean(text).split(/(?<=[。！？])\s*/).filter(Boolean)[0]||'';}
function quickMemory(q){
 const exp=typeof QUESTION_EXPLANATIONS==='undefined'?{}:QUESTION_EXPLANATIONS[q.id]||{};
 const custom=MEMORY_CUES[q.id];
 const source=memoryClean(exp.solutions||exp.solution||exp.approach);
 const sentences=source.split(/(?<=[。！？])\s*/).filter(Boolean);
 const points=(q.correct_answers||[]).map(l=>memorySentence((exp.options||{})[l])).filter(Boolean);
 const cue=custom?custom[0]:(sentences[0]||points.join('；')||'先圈出题目限制，再对照正确选项。');
 const traps=Object.entries(exp.options||{}).filter(([l])=>!q.correct_answers.includes(l)).map(([l,t])=>({letter:l,text:memorySentence(t)}));
 return {cue,note:custom?custom[1]:'',points,traps};
}
