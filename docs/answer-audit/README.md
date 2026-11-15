# SAP-C02 逐题答案校对（2026-11-16）

已逐题审阅全部 **529** 道英文题干和所有英文选项。**38 道明确纠正答案**；**38 道题面或条件存在歧义**并提供参考判断，其中 11 道的参考选择也与原题库不同。合计 49 道选择变化。

每题有中文判断、全选项理由、AWS资料链接与适用限制。结论由题目条件和资料推理得出，是本站的学习用校对结果，不是 AWS 公布的考试答案。社区投票仅保留为历史元数据，不用于定答案。

## 处理方式

- 英文题干和英文选项全文与基线 ced0e02 相同；Q337、Q515 的重复字母已修复，修复记录保留在 JSON。Q200 的损坏中文 API 名称已恢复。
- 原题含缺图、缺选项、条件冲突或已变化的服务能力时，说明缺陷并提供参考选择。歧义题记为已练习，不计入错题与正确率；模拟练习计分分母也排除。
- 当前作答显示按保存的选择重新对照校准答案；旧历史尝试未存选项、无法重判的修订题，不用于最近正确率。原选择、收藏和已做覆盖保留。
- 原来未经核对的架构图/结论已由逐题核对流程和理由替换，所有入口与闪记共用同一答案数据。

## 明确纠正的题目

| 题号 | 原选择 | 校准答案 | 判断依据摘要 |
| --- | --- | --- | --- |
| [第 5 题](https://lajidonggua.github.io/aws-sap-c02-practice/index.html?q=5) | D | A | 按原题只需检查User-Agent并删除响应头，CloudFront Functions的viewer-response事件包含request和response对象，可直接按请求头修改响应头；A满足需求，无需Lambda@Edge。 |
| [第 33 题](https://lajidonggua.github.io/aws-sap-c02-practice/index.html?q=33) | D | A | 突发流量需要自动增减处理容量。API Gateway配Lambda去除EC2集群管理，Lambda按并发请求扩展；D仅把现有五台实例放在ALB后，不能增加可用算力。 |
| [第 45 题](https://lajidonggua.github.io/aws-sap-c02-practice/index.html?q=45) | B | A | Lambda function URL直接提供稳定HTTPS webhook地址，Git服务按各URL调用对应函数，省掉API Gateway配置，是所给条件下最少运维的serverless接入。 |
| [第 55 题](https://lajidonggua.github.io/aws-sap-c02-practice/index.html?q=55) | ACF | ADF | 团队已经给资源加应用/团队自定义标签，应激活成本分配标签、启用IAM对账单控制台访问，并开启Cost Explorer做历史分析与预测。成本类别不是按现有标签分析的必要步骤。 |
| [第 137 题](https://lajidonggua.github.io/aws-sap-c02-practice/index.html?q=137) | BCF | ACF | 跨账户读取SSE-KMS对象需要源桶资源策略、调用者S3只读+KMS decrypt身份策略，以及源KMS key policy允许decrypt。ACF三项各补一层，B全权限不符合最小授权。 |
| [第 152 题](https://lajidonggua.github.io/aws-sap-c02-practice/index.html?q=152) | B | D | 按稳定基线购买Compute Savings Plans，兼容现有EC2及将来Fargate；短峰用Spot，RDS只为基线购全预付预留、峰期临时扩容。 |
| [第 179 题](https://lajidonggua.github.io/aws-sap-c02-practice/index.html?q=179) | B | A | SNS异步触发Lambda随事件负载扩缩，Lambda处理重试耗尽后用on-failure destination把失败记录送SQS供审查。 |
| [第 196 题](https://lajidonggua.github.io/aws-sap-c02-practice/index.html?q=196) | BE | CE | 静态前端S3+CloudFront、API Gateway+Lambda后端按请求自动扩缩，S3存考勤并用Athena/QuickSight按需报告，无需维护容器节点或数据库集群。 |
| [第 200 题](https://lajidonggua.github.io/aws-sap-c02-practice/index.html?q=200) | BCE | BDF | 检查角色信任是否信任SAML provider、STS AssumeRoleWithSAML是否带正确provider/role ARN和断言，以及IdP用户/组到角色映射。 |
| [第 319 题](https://lajidonggua.github.io/aws-sap-c02-practice/index.html?q=319) | B | C | 已有VPN硬件时，Site-to-Site VPN让私有Windows实例直接加入本地AD并通过企业网络RDP，复用现有身份管理，避免AD Connector/Managed AD和堡垒机的额外费用。 |
| [第 328 题](https://lajidonggua.github.io/aws-sap-c02-practice/index.html?q=328) | C | A | 自定义规则用Organizations SCP附加到开发OU，按ec2:InstanceType和rds:DatabaseClass限制T系列，并拒绝无关服务。Control Tower内置控制不等于可直接创建任意自定义控制。 |
| [第 370 题](https://lajidonggua.github.io/aws-sap-c02-practice/index.html?q=370) | CD | AC | 既有EBS卷不能原地加密，应创建快照并从快照创建加密卷后替换；未来检测应启用Control Tower强烈建议的EBS加密侦测控制，不是仅mandatory控制。 |
| [第 373 题](https://lajidonggua.github.io/aws-sap-c02-practice/index.html?q=373) | CDF | ABE | 只禁止少数不使用服务应采用deny-list，利用IAM Access Advisor查看最近服务使用，再把账户按OU管理并附SCP；保留默认FullAWSAccess作为允许上限基线。 |
| [第 379 题](https://lajidonggua.github.io/aws-sap-c02-practice/index.html?q=379) | AB | BD | Organizations建立统一付款与账户/OU层级，开启全部功能后以SCP统一限定成员IAM权限上限；保留每个业务账户费用明细满足分摊。 |
| [第 381 题](https://lajidonggua.github.io/aws-sap-c02-practice/index.html?q=381) | AEF | ABD | Aurora慢查询/错误日志提供SQL诊断，Java X-Ray追踪HTTP和JDBC调用定位端到端延迟，CloudWatch日志代理持续外送Apache日志，避免ASG终止实例后日志丢失。 |
| [第 396 题](https://lajidonggua.github.io/aws-sap-c02-practice/index.html?q=396) | B | A | DynamoDB前用托管多节点DAX替代自管缓存，EC2放入ASG由ALB路由，并在已知季度更新前计划扩容，避免固定两实例与单缓存节点的瓶颈。 |
| [第 397 题](https://lajidonggua.github.io/aws-sap-c02-practice/index.html?q=397) | ACD | BCE | 移动端直接上传S3，事件进入SQS标准队列吸收工作日高峰，Lambda按队列消费图片任务，完成后SNS向移动设备推送。 |
| [第 399 题](https://lajidonggua.github.io/aws-sap-c02-practice/index.html?q=399) | CD | BE | awsvpc给每个任务独立ENI和安全组实现网络最小权限，任务IAM角色按服务分配短期凭证，避免所有容器共享实例权限或注入长期密钥。 |
| [第 400 题](https://lajidonggua.github.io/aws-sap-c02-practice/index.html?q=400) | AE | BE | Lambda需接入Neptune所在VPC私网访问数据库，同时以NAT访问DynamoDB公共端点，或用DynamoDB VPC端点保持隔离私网，两种路径都可行。 |
| [第 433 题](https://lajidonggua.github.io/aws-sap-c02-practice/index.html?q=433) | C | D | 赛事时长不固定、结束后数据无保留需求，按请求计费的 Lambda 与 DynamoDB 比持续保留 RDS、Redis 和 Fargate 更符合降成本目标。TTL 用于异步清理过期条目。 |
| [第 440 题](https://lajidonggua.github.io/aws-sap-c02-practice/index.html?q=440) | AE | AC | 公司内部大量 VPC 用 Transit Gateway 汇聚，客户只发起到许可证服务的连接则用 NLB + PrivateLink。E 的 peering 提供网络级双向可路由性，不是题述最少运维的单向服务访问。 |
| [第 442 题](https://lajidonggua.github.io/aws-sap-c02-practice/index.html?q=442) | AE | DE | 多层记录树中，叶子节点必须有健康检查，顶层 latency alias 必须评估目标健康，才会从整个故障区域撤走响应。 |
| [第 444 题](https://lajidonggua.github.io/aws-sap-c02-practice/index.html?q=444) | AB | BE | B 将实例存活检查与完整业务检查分开，避免数据库慢导致 ASG 误杀健康实例；E 缓存产品读取可减轻 RDS 压力。A 声称普通 RDS MySQL 多只读副本有统一 reader endpoint，是将 Aurora 能力混用。 |
| [第 446 题](https://lajidonggua.github.io/aws-sap-c02-practice/index.html?q=446) | A | B | 不重叠 VPC 通过共享 Transit Gateway 汇聚到共享服务 VPC，再连接 Aurora 数据库。普通 Aurora DB cluster 不能靠 RAM 分享就获得实时 SQL 网络访问。 |
| [第 448 题](https://lajidonggua.github.io/aws-sap-c02-practice/index.html?q=448) | B | A | EFS 读取按其他操作的三分之一计量，75 MiB/s 预置可承载约 225 MiB/s 纯读；Regional EFS 多 AZ，EFS replication 的目标 RPO 为分钟级，适合小于一小时目标。 |
| [第 450 题](https://lajidonggua.github.io/aws-sap-c02-practice/index.html?q=450) | B | D | 成员账户可以创建只包含本账户数据的 CUR 并交付到自己拥有的桶，再用 Athena 查询，天然隔离账单数据且不需要开发拆分管道。 |
| [第 453 题](https://lajidonggua.github.io/aws-sap-c02-practice/index.html?q=453) | C | A | EFS 不支持 AWS Backup continuous/PITR。应新建每小时备份计划，授权备份角色使用 KMS 密钥，以恢复点满足约 100 分钟的数据恢复目标。 |
| [第 471 题](https://lajidonggua.github.io/aws-sap-c02-practice/index.html?q=471) | ACF | ACE | GWLB 将流量透明分发给防火墙，ASG/launch template 用启动脚本自动恢复与扩展。消费者 VPC 中的 GWLBe 才可作为该 VPC 路由目标；F 将成员路由直接指向别的 VPC 的 endpoint 不成立。 |
| [第 485 题](https://lajidonggua.github.io/aws-sap-c02-practice/index.html?q=485) | AB | AD | A增加DynamoDB写容量以消除明确的写限流；D让API Gateway先写Kinesis、Lambda按分片批处理，降低请求与执行环境并发压力。增加内存不能直接消除TooManyRequests并发配额限流。 |
| [第 492 题](https://lajidonggua.github.io/aws-sap-c02-practice/index.html?q=492) | AD | AB | Systems Manager托管节点需要运行SSM Agent与适当实例IAM权限；导入的VM未必预装agent。公有子网有公网IP时可通过公网服务端点连接，VPC endpoint不是必需。 |
| [第 502 题](https://lajidonggua.github.io/aws-sap-c02-practice/index.html?q=502) | BD | CD | SCT评估模式/存储过程的转换工作，DMS迁移表数据并可持续复制，二者分工不同。 |
| [第 503 题](https://lajidonggua.github.io/aws-sap-c02-practice/index.html?q=503) | BC | CD | 把共享内容迁到EFS，让本地作者经VPN持续更新、跨AZ EC2同时读取；大批量历史档案用Snowball Edge离线搬入S3。 |
| [第 509 题](https://lajidonggua.github.io/aws-sap-c02-practice/index.html?q=509) | AEF | ADE | CloudFormation复用基础设施，延迟路由将用户导向较近区域，扩展原DynamoDB表为global table同步数据。E/F二选一而非一起选，F无必要新表和数据搬迁。 |
| [第 513 题](https://lajidonggua.github.io/aws-sap-c02-practice/index.html?q=513) | C | A | 已知同样EC2资源还需三年，三年All Upfront标准RI通常提供高折扣；新增Lambda/Fargate等由Compute Savings Plan覆盖。C是No Upfront，D又遗漏serverless覆盖。 |
| [第 514 题](https://lajidonggua.github.io/aws-sap-c02-practice/index.html?q=514) | CE | AE | S3 MRAP提供多区域统一端点与网络路由；本地经DX加PrivateLink访问MRAP避免公网。自建Lambda追踪路由没有必要。 |
| [第 524 题](https://lajidonggua.github.io/aws-sap-c02-practice/index.html?q=524) | A | C | 题干阈值正是Trusted Advisor的低利用率EC2检查；已有Business Support可使用该建议，通过EventBridge/Lambda筛选开发标签后停止实例，比自建统计更省运维。 |
| [第 526 题](https://lajidonggua.github.io/aws-sap-c02-practice/index.html?q=526) | A | B | 无其他订阅者时Basic Ingest绕过MQTT消息broker节费；Firehose缓冲聚合后做Lambda转换和批量S3交付，900秒缓冲在30分钟目标内。 |
| [第 529 题](https://lajidonggua.github.io/aws-sap-c02-practice/index.html?q=529) | AC | AE | 同区域S3改gateway endpoint可消除该流量的NAT处理费；已知事件时间用scheduled scaling精确预扩/缩容，避免不匹配的预测容量。 |

## 歧义题

6、20、32、37、44、49、101、146、163、177、185、197、198、232、243、274、275、277、324、326、327、331、337、339、341、375、376、392、394、414、438、445、447、451、458、483、486、527

请打开该题解析查看具体缺陷、建议和官方资料。对这类题，学习服务边界比背字母可靠。

## 可追溯记录

- [Q1–140](q001-140.json)
- [Q141–280](q141-280.json)
- [Q281–420](q281-420.json)
- [Q421–529](q421-529.json)
- [汇总](summary.json)

生成：`node scripts/build_answer_audit.cjs`，再运行 `node build_quick_cards.cjs`。覆盖、引用、选项、闪记和解析一致性由 `test_answer_audit.cjs` / `test_quick_cards.cjs` / `test_learning_review.cjs` 验证。
