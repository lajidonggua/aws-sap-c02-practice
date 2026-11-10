'use strict';

// Learning order follows prerequisites, not the order of the question bank.
const STUDY_CHAPTERS = [
  {
    id: 'foundations', title: '先读懂一张云架构图', subtitle: '区域、网络、计算与数据，各自负责什么', minutes: 10,
    goal: '能用自己的话说清楚：用户的请求怎样到达应用，数据又存在哪里。',
    story: '把一个网上商城想成一家店：域名是店名，DNS 帮顾客查地址；负载均衡器分配请求，计算资源处理业务，数据库保存订单，存储服务保存商品图片。',
    principles: [
      ['先区分职责', '计算负责执行程序，存储负责保存数据，网络负责连通，权限负责允许哪些操作。一个服务通常只解决其中一部分问题。'],
      ['再看故障范围', 'Region 是地理区域，AZ 是区域内的隔离位置。多台实例、跨可用区、跨区域，对应不同层次的故障应对。'],
      ['最后找约束', '先圈出可用性、延迟、成本、合规、迁移窗口，再比较方案。看到某个服务名就选，容易忽略题目的限制条件。']
    ],
    flow: [['查地址', '客户端先通过 DNS 获得目标地址'], ['接请求', '例如由 ALB 把 HTTP 请求交给应用'], ['做业务', 'EC2、容器或 Lambda 执行程序'], ['存结果', '数据库保存记录，S3 等保存对象']],
    terms: ['region', 'availability-zone', 'vpc', 'ec2', 's3', 'dns'], comparisons: ['failure-scope'],
    quiz: { question: '题目担心某个可用区故障。仅在同一可用区多开几台 EC2，是否就解决了这个风险？', choices: ['解决了，机器数量多就够了', '没有，还需要考虑跨可用区部署', '只要更换域名就能解决'], correct: 1, explanation: '实例数量和故障隔离范围是两件事。同一可用区内的多台实例仍可能受该可用区的共同故障影响。' },
    sources: [['AWS 全球基础设施', 'https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html']]
  },
  {
    id: 'networking', title: '网络与 DNS：先连通，再找地址', subtitle: 'VPC、子网、路由、端点和混合网络', minutes: 18,
    goal: '分清“没有路”“查不到地址”和“访问被拦”这三类问题。',
    story: '公司本地机房要访问 AWS 内部应用。专线解决网络连接，DNS 解决域名查地址，安全规则与应用权限再决定请求是否允许。缺少任何一环，都可能访问失败。',
    principles: [
      ['网络连通不等于 DNS 可用', '有 Direct Connect 或 VPN，并不代表本地就会自动解析 AWS 私有域名。混合 DNS 还需要考虑解析器端点、私有区域关联和转发规则。'],
      ['把进出方向画出来', '私有子网向互联网发起连接、公网用户访问应用、VPC 私有访问 AWS 服务，是三种需求。分别判断 NAT、负载均衡入口、VPC 端点是否适合。'],
      ['路由与安全分开检查', '路由表决定流量往哪里走；安全组和网络 ACL 决定网络流量是否放行；IAM 等策略再控制服务操作。']
    ],
    flow: [['确认方向', '谁访问谁？从本地、VPC 还是互联网发起？'], ['检查路由', '目标网段要走哪条连接？'], ['检查解析', '域名由哪台 DNS 服务器负责？'], ['检查放行', '安全规则、端点策略和资源权限是否允许？']],
    terms: ['vpc', 'subnet', 'route-table', 'security-group', 'nacl', 'nat', 'vpc-gateway-endpoint', 'vpc-interface-endpoint', 'route53', 'route53-private-hosted-zone', 'route53-inbound-resolver', 'route53-outbound-resolver', 'direct-connect', 'site-to-site-vpn', 'transit-gateway'],
    comparisons: ['network-filter', 'endpoints', 'dns-direction'],
    quiz: { question: 'VPC 内的应用访问同区域 S3，不想继续经过 NAT 网关。首先核对哪种方案？', choices: ['为 S3 配置网关端点并关联适当路由表', '再增加一台 NAT 网关', '仅给 EC2 增加 IAM 权限'], correct: 0, explanation: 'S3 网关端点可提供不经过 NAT 的访问路径；同时仍要核对路由、端点策略和 S3 权限。IAM 权限不能代替网络路径。' },
    sources: [['VPC 网络安全', 'https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Security.html'], ['网关端点', 'https://docs.aws.amazon.com/vpc/latest/privatelink/gateway-endpoints.html'], ['混合 DNS', 'https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver.html']]
  },
  {
    id: 'compute', title: '计算与流量：程序在哪里运行', subtitle: '服务器、函数、容器与自动扩展', minutes: 14,
    goal: '按运行方式和运维需求，比较 EC2、Lambda 与容器方案。',
    story: '同一个业务可以部署在虚拟服务器上，也可以打包成容器，或拆成事件触发的函数。选择依据是工作负载需求，而不只是“哪个服务更新”。',
    principles: [
      ['区分管理层次', 'EC2 提供虚拟服务器；ECS / EKS 负责编排容器；Fargate 是运行容器的计算选项。它们并不是互相完全替代的同一层产品。'],
      ['先看工作负载', '是否有持续运行的进程、特定操作系统需求、事件触发、资源要求和执行限制？先回答这些，再判断函数或容器是否合适。'],
      ['扩容要连同状态一起看', '负载均衡负责分流，Auto Scaling 负责资源数量。多开实例前，要考虑会话、共享文件和数据库瓶颈。']
    ],
    flow: [['识别程序', '虚拟机、容器，还是事件处理函数？'], ['确定运行环境', '选择 EC2、Fargate 或 Lambda 等'], ['安排流量', '按协议选择负载均衡或 API 入口'], ['应对变化', '结合扩展策略与状态管理']],
    terms: ['ec2', 'lambda', 'ecs', 'eks', 'fargate', 'ecr', 'auto-scaling', 'alb', 'nlb', 'cloudfront', 'global-accelerator'], comparisons: ['compute-model', 'load-balancer', 'global-delivery'],
    quiz: { question: '题目说已有容器镜像，希望减少底层服务器维护。哪个组合更符合这个描述？', choices: ['ECR 负责容器调度，S3 负责运行容器', 'ECS / EKS 负责编排，按需求考虑 Fargate 运行', '只建立负载均衡器就能运行镜像'], correct: 1, explanation: '镜像仓库存放镜像，编排服务安排容器运行，计算资源执行容器。这三种职责要分清。' },
    sources: [['计算服务选择指南', 'https://docs.aws.amazon.com/decision-guides/latest/decision-guides/choosing-aws-compute-service.html'], ['Fargate 与 Lambda', 'https://docs.aws.amazon.com/decision-guides/latest/decision-guides/fargate-or-lambda.html'], ['CloudFront', 'https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html'], ['Global Accelerator', 'https://docs.aws.amazon.com/global-accelerator/latest/dg/what-is-global-accelerator.html']]
  },
  {
    id: 'storage', title: '存储：文件、磁盘和对象怎么选', subtitle: 'S3、EBS、EFS、FSx 与数据保护', minutes: 14,
    goal: '先根据访问方式选存储类型，再讨论容量、性能和成本。',
    story: '商品图片、服务器系统盘、多台应用共享的目录，看起来都在“存文件”，实际使用接口和共享方式不同，适合的服务也不同。',
    principles: [
      ['先问应用如何读写', '通过对象 API、操作系统磁盘，还是共享文件协议访问？这一步往往比“数据量有多大”更早决定服务类型。'],
      ['耐久性与访问能力不同', '数据能长期保存，不等于应用始终可访问；副本、备份、恢复时间与访问权限需要分别考虑。'],
      ['省存储费要连带看取回', '生命周期和分层要结合访问频率、检索等待、请求与取回费用等条件，不能只比较存储单价。']
    ],
    flowKind: 'choices',
    flow: [['对象数据', '图片、备份、数据湖：先看 S3'], ['块设备', '操作系统当磁盘使用：先看 EBS'], ['共享目录', '多客户端文件访问：看 EFS / FSx'], ['数据保护', '在所选存储上规划版本、复制、备份与恢复']],
    terms: ['s3', 'ebs', 'efs', 'fsx', 's3-intelligent-tiering', 's3-object-lock', 's3-replication', 'backup'], comparisons: ['storage-types'],
    quiz: { question: '多台 Linux 应用需要同时挂载并共享一个 NFS 文件目录。先考虑哪项？', choices: ['EFS', '给每台机器单独一块 EBS 就自动共享', 'S3 的对象键就是 NFS 目录'], correct: 0, explanation: 'EFS 提供共享 NFS 文件系统。独立磁盘不会自动形成共享目录；对象存储和文件系统的访问语义也不同。' },
    sources: [['存储服务选择指南', 'https://docs.aws.amazon.com/decision-guides/latest/decision-guides/choosing-aws-storage-service.html'], ['S3 Object Lock', 'https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock.html']]
  },
  {
    id: 'databases', title: '数据库：读、写与故障恢复', subtitle: '关系型、NoSQL、读副本与缓存', minutes: 16,
    goal: '能判断题目是在要求读扩展、写扩展、缓存，还是高可用。',
    story: '商城查询商品的人很多，订单写入也很重要。增加只读副本可以分担读取，但不能直接把所有写入也分给这些副本。',
    principles: [
      ['访问模式优先', '先看事务、关联查询、键值访问、延迟和扩展需求，再比较关系型数据库与 DynamoDB 等方案。'],
      ['副本要看它的角色', '备机、读副本、跨区域副本可能解决不同问题。特别注意：RDS 的 Multi-AZ DB 实例与 Multi-AZ DB 集群，不是同一种部署模式。'],
      ['缓存不等于原始数据库', '缓存加速访问，但需要处理命中、过期、更新与故障。还要区分通用应用缓存和 DynamoDB 专用加速器。']
    ],
    flow: [['识别请求', '读多、写多，还是复杂事务？'], ['选择数据库', '关系型或按访问模式设计的 NoSQL'], ['处理瓶颈', '索引、读副本、容量或缓存'], ['验证恢复', '故障切换、数据丢失与跨区域策略']],
    terms: ['rds', 'aurora', 'aurora-writer', 'read-replica', 'dynamodb', 'global-tables', 'elasticache', 'dax', 'rcu', 'wcu'], comparisons: ['database-replicas', 'database-cache'],
    quiz: { question: '数据库读取压力很高，写入压力不大。增加只读副本主要改善什么？', choices: ['直接增加写入节点数量', '分担读取请求', '自动替代所有数据备份'], correct: 1, explanation: '只读副本的主要职责是承担读请求。写入扩展、备份与故障恢复需要另外分析。' },
    sources: [['数据库选择指南', 'https://docs.aws.amazon.com/decision-guides/latest/decision-guides/databases-on-aws-how-to-choose.html'], ['RDS Multi-AZ', 'https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.html']]
  },
  {
    id: 'security', title: '权限与加密：能连上不代表有权用', subtitle: 'IAM、角色、资源策略和密钥', minutes: 15,
    goal: '分清身份、操作权限、权限边界与加密密钥权限。',
    story: '应用已经能连接 S3，读取对象却被拒绝。原因可能不是网络，而是角色、桶策略、显式拒绝或 KMS 解密权限。',
    principles: [
      ['把身份和权限分开', '身份验证确认“是谁”；授权判断“允许做什么”。角色与临时凭证常用于工作负载访问资源。'],
      ['允许操作还要看边界', '身份策略、资源策略、组织策略等可能共同影响结果。显式拒绝与权限上限不能靠随便增加一个 Allow 绕过。'],
      ['加密增加了一层检查', '访问加密数据时，资源访问权限和密钥使用权限都可能影响请求。凭证、密码、TLS 证书和加密密钥也不能混为一谈。']
    ],
    flow: [['你是谁', '用户、应用角色或联合身份'], ['你要做什么', '操作、资源和请求条件'], ['有什么限制', '组织边界、资源策略与拒绝规则'], ['还需要什么', '例如使用 KMS 解密密钥的权限']],
    terms: ['iam', 'iam-role', 'resource-policy', 'sts', 'kms', 'secrets-manager', 'acm', 'waf', 'shield'], comparisons: ['permission-layers', 'secrets-certificates'],
    quiz: { question: 'SCP 中允许了某项操作，是否意味着成员账户里的角色已经获得操作权限？', choices: ['是，SCP 就是直接授权', '否，还要有适当的身份或资源授权，并考虑其他限制', '只要网络可达就不需要权限'], correct: 1, explanation: 'SCP 设置权限边界，本身不授予权限。网络连通也不能代替服务授权。' },
    sources: [['IAM 策略与权限', 'https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html'], ['SCP 的作用', 'https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html']]
  },
  {
    id: 'governance', title: '多账户与运维：统一管，分清职责', subtitle: 'Organizations、监控、审计与合规', minutes: 12,
    goal: '能判断题目需要的是组织治理、运行监控、操作审计还是配置检查。',
    story: '一家集团有多个 AWS 账户。总部要统一安全边界，运维要看运行指标，审计人员要追踪操作，合规人员要检查配置。四种需求不能只靠一个“监控服务”。',
    principles: [
      ['账户分组与权限上限分开', 'Organizations 组织账户，OU 把账户分组，SCP 约束成员账户的可用权限。继承关系会影响账户的实际边界。'],
      ['分清三种“看见”', 'CloudWatch 关注运行信息与告警；CloudTrail 追踪 API 活动；Config 记录配置及变化、评估规则。'],
      ['发现问题与修复问题不同', '评估、告警、审计与自动修复可能需要组合服务。题目问“自动修复”时，不能只停留在检测和记录。']
    ],
    flow: [['组织账户', '按环境或业务划分 OU'], ['设置边界', '用组织策略约束允许范围'], ['观察与审计', '分别收集指标、操作与配置'], ['响应问题', '通知、调查，或按流程自动修复']],
    terms: ['organizations', 'ou', 'scp', 'control-tower', 'cloudwatch', 'cloudtrail', 'config', 'systems-manager'], comparisons: ['observability'],
    quiz: { question: '审计人员想知道谁调用 API 删除了某个 AWS 资源，应首先查看哪类记录？', choices: ['仅看 CPU 指标', 'CloudTrail 操作事件', '只检查 Auto Scaling 目标值'], correct: 1, explanation: '这是“谁执行了什么操作”的审计问题，首先关注 CloudTrail，而不是把运行指标当作操作记录。' },
    sources: [['AWS 管理与治理', 'https://docs.aws.amazon.com/whitepapers/latest/aws-overview/management-and-governance.html']]
  },
  {
    id: 'integration', title: '消息与事件：不必所有人一起等', subtitle: '队列、广播、路由、工作流和设备', minutes: 14,
    goal: '区分排队处理、通知多方、按事件路由和编排多个步骤。',
    story: '用户下单后，订单处理、发邮件和数据分析不必全部同步完成。先识别哪些工作可以异步，再决定消息如何保存、分发和重试。',
    principles: [
      ['先确定通信方式', 'SQS 偏任务队列，SNS 偏发布订阅，EventBridge 偏事件匹配与路由；Step Functions 则组织多个业务步骤。'],
      ['可靠处理不是一句“保证成功”', '设计时要考虑重试、重复处理、幂等与失败去向。消息进入死信队列，表示还需要排查或重新处理。'],
      ['设备连接也要身份和权限', 'IoT Core 连接设备；MQTT 是消息协议；证书验证设备身份；Thing 是设备档案；策略控制它能做什么。']
    ],
    flow: [['接收工作', '例如应用产生一个订单事件'], ['解耦传递', '根据需求选队列、通知或事件路由'], ['独立处理', '消费者完成任务，并考虑幂等'], ['处理失败', '重试、告警、死信和补偿流程']],
    terms: ['sqs', 'sns', 'eventbridge', 'step-functions', 'api-gateway', 'dlq', 'idempotency', 'iot-core', 'iot-thing', 'mqtt', 'x509'], comparisons: ['messaging'],
    quiz: { question: '第三方服务偶尔很慢，主应用不想一直等待，希望先保存待办任务。哪种思路更贴切？', choices: ['主应用一直同步重试直到卡住', '把任务放进队列，由消费者独立处理', '只增加 DNS 记录数量'], correct: 1, explanation: '队列有助于解耦和缓冲，但仍需要消费者、重试、幂等与失败处理设计。' },
    sources: [['SQS / SNS / EventBridge 选择指南', 'https://docs.aws.amazon.com/decision-guides/latest/decision-guides/sns-or-sqs-or-eventbridge.html'], ['SQS 死信队列', 'https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-dead-letter-queues.html'], ['IoT Core', 'https://docs.aws.amazon.com/iot/latest/developerguide/what-is-aws-iot.html']]
  },
  {
    id: 'migration', title: '迁移与混合云：先看搬的是什么', subtitle: '服务器、数据库、文件与持续连接', minutes: 13,
    goal: '根据迁移对象、停机窗口和带宽限制，选择工具组合。',
    story: '“把系统搬到 AWS”可能是在复制整台服务器、迁移数据库数据、同步文件，或者保留本地系统长期接入云端。这些并不是同一件事。',
    principles: [
      ['把迁移对象说具体', 'MGN 类方案迁移服务器，DMS 迁移数据库数据，SCT 帮助评估和转换数据库结构与代码，DataSync 处理支持的存储间数据传输。'],
      ['全量与增量分开规划', '先搬历史数据，再持续同步变化，最后验证并切换。是否支持增量、是否需要结构转换，要逐项核对。'],
      ['迁移前也要发现依赖', '进程、网络连接、数据量和业务停机窗口影响迁移计划。需要详细运行信息时，应检查发现工具能实际采集哪些数据。']
    ],
    flow: [['盘点', '系统、数据和应用依赖'], ['选择工具', '按服务器、数据库或文件分类'], ['复制与验证', '全量、增量、测试和回退'], ['切换', '在允许的业务窗口完成切换']],
    terms: ['mgn', 'dms', 'schema-conversion-tool', 'datasync', 'storage-gateway', 'application-discovery-service', 'application-discovery-agent', 'snowball'], comparisons: ['migration-tools'],
    quiz: { question: '从一个数据库引擎迁往另一种引擎，为什么不能只考虑复制数据？', choices: ['不同引擎的结构、类型和数据库代码可能需要评估或转换', '因为 DNS 记录一定会全部失效', '因为所有数据库引擎都完全相同'], correct: 0, explanation: '数据搬运与结构 / 代码转换是不同职责，常需要配合评估、转换工具和实际测试。' },
    sources: [['迁移工具决策比较', 'https://docs.aws.amazon.com/prescriptive-guidance/latest/migration-database-rehost-tools/decision-matrix.html'], ['AWS DMS', 'https://docs.aws.amazon.com/dms/latest/userguide/Welcome.html']]
  },
  {
    id: 'resilience', title: '高可用与容灾：可以丢多少，能停多久', subtitle: 'RPO、RTO、备份与备用架构', minutes: 12,
    goal: '用业务目标比较灾备方案，不把备份、多可用区和跨区域混为一谈。',
    story: '如果恢复了昨天的订单数据，却丢掉今天的交易，系统虽然重新开机，业务仍可能无法接受。恢复速度和数据损失是两条不同的要求。',
    principles: [
      ['先问业务目标', 'RPO 描述最多能接受的数据损失时间范围；RTO 描述恢复业务的目标时间。需要和业务方确认，而不是由服务名倒推。'],
      ['备用能力越完整，通常维护越多', '备份恢复、Pilot Light、Warm Standby、主动主动，各自保留的运行能力不同，需要平衡恢复目标、成本和复杂度。'],
      ['演练才知道能否恢复', '检查数据、应用、入口、配置和权限，并测试真正的恢复流程。已有备份不等于已经满足 RTO / RPO。']
    ],
    flow: [['定义目标', '允许丢多少数据？多久恢复？'], ['准备副本', '数据、基础设施和应用配置'], ['切换入口', '按策略恢复应用并导流'], ['验证演练', '实测恢复耗时与数据完整性']],
    terms: ['rpo', 'rto', 'disaster-recovery', 'multi-az', 'pilot-light', 'warm-standby', 'route53-failover-routing', 'global-tables'], comparisons: ['recovery-targets', 'dr-strategies'],
    quiz: { question: '要求“最多丢失最近 5 分钟的数据”，这是在描述哪个目标？', choices: ['RTO', 'RPO', 'CPU 利用率'], correct: 1, explanation: '这是数据损失窗口，即 RPO；“故障后多久恢复业务”才是 RTO。这里的数字是业务要求，不是某种架构的固定保证。' },
    sources: [['灾难恢复规划', 'https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/plan-for-disaster-recovery-dr.html'], ['灾备策略比较', 'https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html']]
  },
  {
    id: 'cost', title: '成本优化：不只看单价', subtitle: '用量、承诺、容量、传输和运维', minutes: 11,
    goal: '区分价格折扣与容量保证，并识别成本真正发生在哪里。',
    story: '同样一份文件，绕经 NAT、跨区域传输、重复检索或长期闲置，都可能产生不同成本。买了便宜实例，也不代表整体方案更便宜。',
    principles: [
      ['先消除浪费', '检查闲置资源、过度配置、不必要的数据路径与存储方式，再考虑是否做长期用量承诺。'],
      ['折扣与容量是两件事', 'Savings Plans 等解决符合条件用量的价格承诺；按需容量预留解决指定条件下的容量保障，本身不是折扣方案。'],
      ['把可靠性算进去', '可中断工作负载可以评估 Spot。不能为了降低单价，忽略业务对可用性、中断和完成时间的要求。']
    ],
    flow: [['定位账单', '计算、存储、请求、传输或运维？'], ['调整用量', '缩减闲置与不必要的数据路径'], ['匹配承诺', '确认稳定用量与折扣适用范围'], ['守住目标', '核对容量、恢复和中断风险']],
    terms: ['spot-instance', 'savings-plans', 'capacity-reservation', 'compute-optimizer', 's3-storage-lens', 'vpc-gateway-endpoint'], comparisons: ['purchase-options'],
    quiz: { question: '为 EC2 创建按需容量预留，能否单靠这一步就获得计费折扣？', choices: ['能，容量预留一定打折', '不能，容量保证和价格折扣要分开判断', '会自动把所有实例改成 Spot'], correct: 1, explanation: 'Capacity Reservation 的主要作用是保障符合条件的容量，单独使用本身不提供计费折扣。' },
    sources: [['容量预留与购买方式', 'https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-capacity-reservations.html'], ['成本优化支柱', 'https://docs.aws.amazon.com/wellarchitected/latest/cost-optimization-pillar/welcome.html']]
  },
  {
    id: 'analytics', title: '分析与 AI：收集、加工、查询、使用', subtitle: '数据流水线与服务选型', minutes: 14,
    goal: '能沿着一条数据流水线，指出每个服务负责哪一段。',
    story: '网站日志产生后，需要先收集和存储，再整理格式、查询分析，最后展示结果或供模型使用。“处理大数据”不是一个单独服务的全部工作。',
    principles: [
      ['区分接入、加工与查询', '流式接入、数据投递、ETL、交互查询和数据仓库有不同职责。先找到题目卡住的环节，再选择工具。'],
      ['先看已有数据和访问模式', '临时查询 S3 数据、持续分析流式数据、复杂数据仓库分析，适合的服务组合并不相同。'],
      ['AI 也需要数据与权限设计', '分清自建 / 训练模型与通过托管接口使用基础模型的需求。模型访问、检索资料权限和内容安全需要独立考虑。']
    ],
    flow: [['接入', '例如 Kinesis 收集流式记录'], ['保存与加工', 'S3 存数据，Glue 等整理数据'], ['查询或建模', '按需求选 Athena、Redshift 或模型服务'], ['消费结果', '报表、应用与业务决策']],
    terms: ['kinesis-streams', 'firehose', 'glue', 'athena', 'redshift', 'opensearch', 'sagemaker', 'bedrock'], comparisons: ['analytics-tools'],
    quiz: { question: '数据已经在 S3，希望用 SQL 做临时交互查询，且不想管理查询服务器。首先评估哪项？', choices: ['Athena', '只增加 SQS 队列', '仅创建 IAM 用户就完成查询'], correct: 0, explanation: 'Athena 可用于查询 S3 数据，但仍需合适的数据格式、表结构与访问权限。' },
    sources: [['分析服务选择指南', 'https://docs.aws.amazon.com/decision-guides/latest/decision-guides/analytics-on-aws-how-to-choose.html'], ['Amazon Bedrock', 'https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html']]
  },
  {
    id: 'delivery', title: '部署与自动化：把方案可靠地交付', subtitle: '基础设施代码、流水线与发布策略', minutes: 11,
    goal: '区分“创建环境”“构建软件”“发布软件”和“组织流水线”。',
    story: '程序改完以后，还要构建、测试、部署，并在失败时能恢复。基础设施也可以用模板管理，减少手工配置差异。',
    principles: [
      ['基础设施也可以版本管理', 'CloudFormation 用模板声明资源，CDK 用代码定义基础设施并生成 CloudFormation 相关配置。改应用与改基础设施要分清。'],
      ['流水线中每一环职责不同', 'CodeBuild 侧重构建与测试，CodeDeploy 侧重部署，CodePipeline 编排发布阶段。不能把它们都笼统当作“自动化服务”。'],
      ['发布策略要包含回退', '蓝绿、金丝雀与滚动发布影响流量切换、资源成本和故障范围。监测和回退方案要与发布步骤一起设计。']
    ],
    flow: [['提交改动', '代码与基础设施配置进入版本管理'], ['构建测试', '生成可发布的构件并执行检查'], ['部署验证', '选择发布策略并观测健康状态'], ['继续或回退', '验证成功再扩大流量，异常时按方案恢复']],
    terms: ['cloudformation', 'cdk', 'codebuild', 'codedeploy', 'codepipeline', 'appconfig'], comparisons: ['delivery-tools'],
    quiz: { question: '需要编译代码、运行测试并生成发布包，主要对应哪一环？', choices: ['CodeBuild 的构建阶段', 'Route 53 的私有区域关联', 'SCP 的账户权限上限'], correct: 0, explanation: '构建测试、部署执行和流水线编排是不同工作。辨认题目要完成的动作，再选择相应服务。' },
    sources: [['AWS 开发工具', 'https://docs.aws.amazon.com/whitepapers/latest/aws-overview/developer-tools.html'], ['CloudFormation', 'https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html']]
  }
];

const STUDY_COMPARISONS = [
  { id: 'failure-scope', title: '多实例、多可用区、跨区域', cue: '题目担心哪一层故障？', rows: [['多实例', '分担负载、应对单个实例故障', '实例若仍在同一可用区，隔离范围没有扩大。'], ['多可用区', '应对单个可用区的故障', '不等于已经具备完整的跨区域灾备。'], ['跨区域', '应对区域级故障等需求', '还需要数据、应用、入口和恢复流程配合。']] },
  { id: 'network-filter', title: '安全组 vs 网络 ACL', cue: '先看生效范围，再看返回流量', rows: [['安全组', '资源网络接口层面的有状态流量控制', '允许规则；响应流量按有状态连接跟踪处理。'], ['网络 ACL', '子网层面的无状态流量控制', '有允许与拒绝规则；入站、出站及返回流量都要考虑。']] },
  { id: 'endpoints', title: '网关端点 vs 接口端点', cue: '私有访问哪个服务？从哪里访问？', rows: [['网关端点', '通过路由表访问支持的 S3 / DynamoDB 场景', '不使用 PrivateLink；不要当作所有服务的通用入口。'], ['接口端点', '通过 PrivateLink 网络接口访问受支持服务', '支持范围、DNS、网络入口和计费需分别核对。']] },
  { id: 'dns-direction', title: 'Inbound vs Outbound Resolver', cue: '站在 AWS 这一侧看方向', rows: [['Inbound', '本地网络的 DNS 查询进入 AWS', '让本地查询 AWS 内的相关域名。'], ['Outbound', 'VPC 的 DNS 查询转发到外部网络', '让 AWS 查询本地等网络负责的域名。']] },
  { id: 'compute-model', title: 'EC2、容器编排、Fargate 与 Lambda', cue: '谁管理服务器？程序以什么方式执行？', rows: [['EC2', '虚拟服务器，可控制操作系统与运行环境', '运维职责和资源规划要自己更多地承担。'], ['ECS / EKS', '容器编排服务', '还要选择容器实际运行在哪种计算资源上。'], ['Fargate', '运行容器的托管计算选项', '不是镜像仓库，也不替代所有编排职责。'], ['Lambda', '事件或请求触发的函数执行方式', '核对执行模型、资源、并发和运行限制。']] },
  { id: 'load-balancer', title: 'ALB vs NLB', cue: '先看协议，再看路由与入口要求', rows: [['ALB', '处理 HTTP / HTTPS 等应用层请求', '常看主机名、路径路由、应用会话等要求。'], ['NLB', '处理 TCP / UDP 等传输层连接', '常看协议、连接与网络入口相关要求。']] },
  { id: 'global-delivery', title: 'CloudFront vs Global Accelerator', cue: '边缘内容交付与网络路径优化', rows: [['CloudFront', '通过边缘节点交付内容，并缓存支持的内容', '关注源站、缓存、HTTP / HTTPS、内容更新和访问控制。'], ['Global Accelerator', '通过 AWS 全球网络优化到配置端点的流量路径', '关注 TCP / UDP 入口、固定任播 IP 和端点健康；核心不是缓存网站内容。']] },
  { id: 'storage-types', title: 'S3 vs EBS vs EFS / FSx', cue: '访问接口比“都是存文件”更重要', rows: [['S3', '对象存储：通过桶和对象键访问', '不要直接等同于操作系统磁盘或普通共享目录。'], ['EBS', '块存储：供计算资源当作磁盘使用', '不是默认就能给多台机器共享的文件服务。'], ['EFS / FSx', '文件系统：按支持的文件协议访问', '根据客户端、协议、兼容性与性能选择。']] },
  { id: 'database-replicas', title: '高可用备机 vs 只读副本', cue: '需要“坏了接手”还是“读得更多”？', rows: [['RDS Multi-AZ DB 实例', '主实例与备用实例用于高可用', '备用实例不是普通的读取扩展入口。'], ['RDS Multi-AZ DB 集群', '不同于 Multi-AZ DB 实例的集群部署模式', '有可读实例；不要把两种模式的结论混用。'], ['只读副本', '承担读取等复制场景', '不能直接承接常规写入扩展，恢复能力需核对具体服务。']] },
  { id: 'database-cache', title: 'ElastiCache vs DAX', cue: '加速的是哪个系统，数据怎么被访问？', rows: [['ElastiCache', '供应用使用的托管内存缓存', '应用通常需要设计缓存访问、更新与失效逻辑。'], ['DAX', '面向 DynamoDB 的内存加速器', '并不是所有数据库的通用缓存替代品。']] },
  { id: 'permission-layers', title: '身份策略、资源策略与 SCP', cue: '谁获得许可？谁设置边界？', rows: [['身份策略', '挂在用户、组或角色上，描述允许的操作', '最终结果还受其他适用策略影响。'], ['资源策略', '挂在桶等资源上，指定允许的主体与操作', '跨账户请求常需结合双方配置与适用限制。'], ['SCP', '设置成员账户中身份可用权限的边界', '本身不授予权限；管理账户等适用例外也要区分。']] },
  { id: 'secrets-certificates', title: '密码、加密密钥与 TLS 证书', cue: '不要把“安全相关的东西”混成一类', rows: [['Secrets Manager', '保管密码、API 密钥等机密', '关注应用读取与轮换机密的需求。'], ['KMS', '管理加密密钥与密钥使用授权', '关注加解密与密钥权限。'], ['ACM', '管理 TLS 证书', '关注 HTTPS 等需要的证书，不是数据库密码仓库。']] },
  { id: 'observability', title: 'CloudWatch vs CloudTrail vs Config', cue: '运行怎么样、谁操作了、配置合规吗？', rows: [['CloudWatch', '指标、日志、告警等运行可观测性', '看性能与运行状态。'], ['CloudTrail', 'API 活动等操作事件', '看谁在什么时候执行了什么操作。'], ['Config', '资源配置及变化与规则评估', '看资源如何配置、是否符合规则。']] },
  { id: 'messaging', title: 'SQS vs SNS vs EventBridge vs Step Functions', cue: '排队、广播、路由、编排', rows: [['SQS', '保存待消费消息，解耦生产者和消费者', '考虑重试、幂等、顺序与失败处理。'], ['SNS', '发布订阅，把通知发给多个订阅方', '可与队列组合，不必在所有题里二选一。'], ['EventBridge', '按事件匹配规则路由到目标', '关注事件来源、规则、目标和失败投递。'], ['Step Functions', '编排步骤、分支、等待与错误处理', '不是单纯用来保存一堆待办消息。']] },
  { id: 'migration-tools', title: 'MGN vs DMS vs SCT vs DataSync', cue: '按迁移对象分类', rows: [['MGN', '服务器迁移与复制场景', '关注整机迁移、测试、切换和依赖。'], ['DMS', '数据库数据迁移和支持的持续复制', '不等于自动迁移所有应用与转换所有代码。'], ['SCT', '评估并帮助转换数据库结构与代码', '转换结果需要测试，数据搬运是另一项工作。'], ['DataSync', '支持的存储之间的数据传输', '关注源、目标、网络与文件属性要求。']] },
  { id: 'recovery-targets', title: 'RPO vs RTO', cue: '数据损失与停机时间', rows: [['RPO', '最多容忍丢失多长时间的数据', '影响备份和复制频率等设计。'], ['RTO', '业务应在多长时间内恢复', '影响备用资源和恢复自动化等设计。']] },
  { id: 'dr-strategies', title: '四种常见灾备思路', cue: '比较保留的运行能力，而不是死背固定恢复分钟数', rows: [['备份与恢复', '准备备份，灾后恢复数据与环境', '恢复步骤多；实际目标要演练验证。'], ['Pilot Light', '提前保持核心部分，其余在恢复时补齐', '重点是核心能力先在，不是完整环境都在接业务。'], ['Warm Standby', '备用区保持缩小但可工作的完整环境', '故障后还要扩展至所需容量。'], ['主动主动', '多个站点平时都承接业务', '数据一致性、冲突与故障导流更复杂。']] },
  { id: 'purchase-options', title: 'Spot、Savings Plans 与容量预留', cue: '低价、中断、用量承诺和容量保障要分开', rows: [['Spot', '使用可被中断的闲置计算容量', '是否可中断、如何补偿与恢复非常关键。'], ['Savings Plans', '为符合条件的计算用量做承诺以获得折扣', '不是通用的实例容量保证。'], ['按需容量预留', '在指定条件下预留实例容量', '预留本身不提供计费折扣。']] },
  { id: 'analytics-tools', title: 'Glue、Athena、Redshift 与流式服务', cue: '数据在哪一段需要处理？', rows: [['Glue', '数据集成、目录和 ETL 等工作', '先看题目需要整理数据还是查询数据。'], ['Athena', '对 S3 等支持的数据源进行交互式查询', '数据格式、扫描量和访问权限会影响使用。'], ['Redshift', '数据仓库分析', '关注分析模型、数据组织与查询需求。'], ['Kinesis / Firehose', '流式接入处理与数据投递等场景', '不要把“提供消费能力”与“托管投递”当作完全相同。']] },
  { id: 'delivery-tools', title: 'CloudFormation、CodeBuild、CodeDeploy、CodePipeline', cue: '环境、构建、部署、编排', rows: [['CloudFormation', '用模板声明与管理基础设施资源', '不是应用代码编译器。'], ['CodeBuild', '构建代码、执行测试、产出构件', '不是流水线全部阶段的总称。'], ['CodeDeploy', '执行支持目标上的软件部署', '结合发布策略、健康验证与回退。'], ['CodePipeline', '组织发布流程中的各个阶段', '通常会调用构建、测试、部署等其他工具。']] }
];

// Each core card has a concrete use case, an exam distinction, and a boundary.
const STUDY_TERM_NOTES = {
  region: ['按地理位置、合规和用户距离选择部署区域。', '区分跨区域容灾与同区域多可用区高可用。', '跨区域不会自动复制应用和所有数据。'],
  'availability-zone': ['把应用分散到同区域的多个隔离位置。', '题目描述单个可用区故障时，检查是否有跨 AZ 资源与数据。', 'AZ 不应简单等同于“一台服务器”或固定一个数据中心。'],
  vpc: ['为应用规划隔离网络、子网、路由与访问控制。', '检查网络地址、路径、连接方向及 DNS。', 'VPC 相连不代表权限和域名解析也已就绪。'],
  ec2: ['需要控制操作系统或运行环境的服务器工作负载。', '结合实例、存储、扩展、角色和网络判断整套方案。', '实例增加后，数据库、共享状态等仍可能是瓶颈。'],
  s3: ['存放对象，例如图片、备份和数据湖文件。', '比较访问模式、生命周期、版本、复制和资源权限。', '不要把对象接口直接当成普通共享文件系统。'],
  dns: ['把域名解析到对应记录或地址。', '先判断查询由谁发起、哪个 DNS 系统负责。', '解析成功与业务连接成功是两项检查。'],
  route53: ['管理域名解析，并按路由策略等条件选择响应。', '区分公开域名、私有域名、健康检查与解析器转发。', 'DNS 返回地址，后续业务通常由客户端直接连接目标。'],
  'route53-private-hosted-zone': ['在关联的网络范围中维护私有域名记录。', '看到多个 VPC 或本地需要查询同一内部域名时，核对关联与查询路径。', '托管区域是域名记录本，不是运行应用的服务器。'],
  subnet: ['在 VPC 内划分地址段并安排资源位置。', '子网属于一个可用区；公有与私有的判断要结合路由。', '公有子网中的资源也不一定天然能从互联网访问。'],
  'route-table': ['决定发往目标地址范围的流量下一跳。', '看目的网段、路由优先级与返回路径。', '路由不是 IAM 授权，也不是 DNS 记录。'],
  'security-group': ['控制资源网络接口相关的入站和出站流量。', '区分有状态控制、允许规则和资源层面生效。', '安全组放行不会自动增加应用或资源操作权限。'],
  nacl: ['在子网边界设置允许或拒绝规则。', '无状态：返回方向与临时端口也可能需要规则。', '不要把它与安全组的状态跟踪行为混用。'],
  nat: ['公有 NAT 网关常用于私有子网主动访问互联网。', '注意出站方向、固定出口 IP 和数据处理路径。', '它不是让互联网主动访问私有服务器的负载均衡器。'],
  'vpc-gateway-endpoint': ['让 VPC 中符合范围的流量通过路由表访问 S3 / DynamoDB。', '看到不经 NAT 访问同区域 S3 时，核对网关端点。', '不是所有服务可用，也不能当作跨所有网络的中转入口。'],
  'vpc-interface-endpoint': ['通过 PrivateLink 网络接口私有访问受支持的服务。', '核对服务支持、DNS、网络可达性与端点权限。', '接口端点和网关端点的访问范围与计费不同。'],
  'route53-inbound-resolver': ['本地 DNS 要查询 AWS 内部相关域名。', '记方向：本地查询进入 AWS。', '还要有网络连接、正确的区域关联与转发配置。'],
  'route53-outbound-resolver': ['VPC 内资源要查询本地等外部网络负责的域名。', '记方向：查询从 AWS 转发出去。', '先确认转发规则，再检查端点与目标 DNS 可达。'],
  'direct-connect': ['需要专用网络连接访问 AWS。', '结合可用性、带宽、路由与备份连接要求。', '专线不自动解决 DNS；也不要直接假定所有链路内容都已加密。'],
  'site-to-site-vpn': ['通过 IPsec VPN 连接本地网络与 AWS。', '核对加密通道、网关、路由、带宽和连接冗余。', '站点到站点 VPN 与单个远程用户使用的 Client VPN 不是同一种入口。'],
  'transit-gateway': ['集中连接多个 VPC 和本地网络。', '关注中枢连接、路由表与网络隔离。', '中枢连通不等于各网络的全部流量都应相互放行。'],
  lambda: ['事件或请求触发的代码处理任务。', '看运行模型、并发、权限、失败重试与外部依赖。', '无服务器不是没有限制，也不是不需要应用设计。'],
  ecs: ['使用 AWS 的容器编排能力部署和管理容器。', '区分任务定义、服务、计算选项和镜像来源。', 'ECS 不是镜像存储仓库。'],
  eks: ['需要 Kubernetes 编排生态或兼容能力。', '结合集群、节点 / 计算方式、权限与运维需求。', '托管控制平面不等于所有容器运维都消失。'],
  fargate: ['希望运行容器并减少底层服务器管理。', '它是计算选项，常与 ECS / EKS 等编排服务结合。', '不要用它代替镜像仓库或把它和编排层混淆。'],
  ecr: ['保存和分发容器镜像。', '区分镜像存放、镜像构建和容器实际运行。', '有镜像仓库不会自动部署应用。'],
  'auto-scaling': ['按需求和策略调整计算容量。', '比较动态、计划等扩展方式与实际负载规律。', '扩展数量不能代替负载均衡和会话设计。'],
  alb: ['需要 HTTP / HTTPS 应用层流量分配与路由。', '关注路径、主机名、目标与应用协议需求。', '不要因为题目写“负载均衡”就忽略协议条件。'],
  nlb: ['需要 TCP / UDP 等传输层连接分配。', '核对协议、连接模式、入口地址等具体要求。', '不应直接套用 ALB 的全部 HTTP 路由能力。'],
  cloudfront: ['面向用户交付网站、API 或其他支持的内容。', '区分缓存命中、源站请求、内容更新与边缘访问控制。', '边缘缓存不能自动解决数据库写入与所有后端瓶颈。'],
  'global-accelerator': ['需要通过 AWS 全球网络优化到应用端点的网络访问。', '结合 TCP / UDP、固定入口地址、端点健康与区域选择。', '不要把它当成存储和缓存网站对象的 CDN。'],
  ebs: ['为计算实例提供持久块存储。', '按 IOPS、吞吐、容量、快照与挂载限制判断。', '共享挂载与应用文件系统语义需要单独设计。'],
  efs: ['多客户端需要共享 NFS 文件系统。', '看到共享 Linux 文件目录时，核对协议和连接条件。', '并非所有文件协议或应用兼容要求都适用。'],
  fsx: ['需要特定文件系统与协议兼容能力。', '区分 Windows、Lustre、ONTAP、OpenZFS 等类型。', 'FSx 是产品家族，具体功能不能混为一谈。'],
  's3-intelligent-tiering': ['访问模式变化、不容易预先划分冷热数据。', '比较自动分层与明确生命周期规则的适用条件。', '仍需检查对象条件与相关费用，不能只说自动就最省。'],
  's3-object-lock': ['需要在保留期等条件下防止对象被删除或覆盖。', '区分保留模式、法律保留和版本管理。', '锁定对象不是加密数据，也不是普通访问策略的同义词。'],
  's3-replication': ['按规则把对象复制到目标桶。', '检查已有对象、后续对象、区域、账户与复制权限。', '复制不是完整备份策略，更不是自动让应用容灾。'],
  backup: ['集中为支持的资源安排和管理备份。', '关注备份计划、保留、跨账户 / 区域与恢复验证。', '有备份不等于已经满足业务恢复时间。'],
  rds: ['需要托管关系型数据库能力。', '先读清引擎、部署模式、读写需求和恢复要求。', '不要把所有 Multi-AZ 模式都理解为同一种主备结构。'],
  aurora: ['需要兼容 MySQL / PostgreSQL 的关系型集群方案。', '分清写入节点、读取节点与集群存储。', '读扩展与写扩展不是同一件事。'],
  'aurora-writer': ['承担集群中的数据库写入。', '查看应用是否把写请求发往正确入口。', '增加读副本并不等于新增常规写入节点。'],
  'read-replica': ['分担读请求或满足支持的复制场景。', '核对复制方式、延迟、提升与故障切换条件。', '不能把所有读副本都当成同步备机。'],
  dynamodb: ['按键值 / 文档访问模式设计的托管数据库场景。', '看分区键、访问模式、一致性、容量与热点。', '无服务器不代表不需要数据建模。'],
  'global-tables': ['在支持的多个区域保留 DynamoDB 副本。', '结合跨区域读写、复制模式和冲突 / 一致性要求。', '不要直接假设所有全球表配置的一致性行为相同。'],
  elasticache: ['在应用前面缓存热点数据、会话等。', '比较缓存用途、引擎、失效策略与持久性要求。', '缓存不是不需要更新与故障处理的永久真相来源。'],
  dax: ['为符合条件的 DynamoDB 访问加速。', '先确认数据库是 DynamoDB，再看访问和一致性需求。', '不是所有数据库的通用加速器。'],
  rcu: ['理解 DynamoDB 预置容量模式下的读取容量。', '读容量受项目大小与一致性等条件影响。', '不要只按请求次数、忽略数据大小来判断。'],
  wcu: ['理解 DynamoDB 预置容量模式下的写入容量。', '写容量要结合项目大小和操作类型。', '读与写的容量单位不能互换。'],
  iam: ['管理 AWS 身份及其可执行操作。', '分析主体、操作、资源、条件与适用策略。', '登录成功不代表任意操作都被允许。'],
  'iam-role': ['让应用、人员或其他主体按信任关系获取角色权限。', '区分信任策略与权限策略，关注临时凭证。', '允许扮演角色与角色能操作什么是两个问题。'],
  'resource-policy': ['在 S3 桶等资源上指定访问主体与权限。', '跨账户访问时结合双方策略和适用限制判断。', '不能只看单个 Allow 就断定请求一定成功。'],
  sts: ['获取临时安全凭证，例如扮演角色。', '区分临时凭证、长期访问密钥与角色授权。', '临时凭证仍然受到有效权限与有效期约束。'],
  kms: ['管理加密密钥和密钥的使用权限。', '读加密数据时同时检查资源权限与解密授权。', 'KMS 不是应用密码仓库的同义词。'],
  'secrets-manager': ['保存并管理数据库密码、API 密钥等机密。', '核对轮换、读取权限和应用如何获取机密。', '不要把密码直接硬编码在镜像或公开配置中。'],
  acm: ['管理服务使用的 TLS 证书。', '检查域名覆盖、证书部署位置与服务集成。', '证书、数据加密密钥和应用密码是不同对象。'],
  waf: ['在受支持的入口过滤 Web 应用请求。', '看到 HTTP 请求规则、恶意请求等条件时核对 WAF。', '不能代替全部网络安全或操作授权。'],
  shield: ['保护 AWS 上的应用应对 DDoS 等相关威胁。', '区分 DDoS 防护与应用层请求规则。', '具体保障能力和成本要按产品方案核对。'],
  organizations: ['集中组织和管理多个 AWS 账户。', '查看组织根、OU、账户和策略继承。', '账户进入组织不会自动获得所有其他账户的访问权限。'],
  ou: ['把账户分组，便于套用组织管理策略。', '账户移动后要重看继承的上层策略。', 'OU 不是 VPC 子网，也不是 IAM 用户组。'],
  scp: ['给组织成员账户中的身份权限设置边界。', '看根、OU、账户层的策略与显式拒绝。', 'SCP 不直接授予权限，且适用主体有例外。'],
  'control-tower': ['帮助设置和治理多账户环境。', '区分建立治理基础与具体应用资源部署。', '不能把它当成所有应用合规问题的单一修复按钮。'],
  cloudwatch: ['收集运行指标、日志并设置告警。', '看到 CPU、延迟、日志和运行告警时先定位可观测性需求。', '运行指标不是“谁删除了资源”的审计记录。'],
  cloudtrail: ['追踪 API 活动等账户操作事件。', '审计谁在何时对什么资源执行了操作。', '不应把操作审计当成完整的应用性能监控。'],
  config: ['记录资源配置及变更，评估规则。', '看到配置合规与配置历史时优先区分 Config。', '检测不合规与自动修复是不同阶段。'],
  'systems-manager': ['对支持的资源进行集中运维与自动化管理。', '按会话、补丁、命令、自动化等具体能力判断。', '需要合适代理、连接与身份权限等条件。'],
  sqs: ['保存待消费任务并解耦处理方。', '看顺序、重试、可见性、重复处理和死信要求。', '队列持有消息不等于业务任务已经成功。'],
  sns: ['把发布消息通知多个订阅方。', '判断是否是一对多通知，及是否要搭配独立队列。', '广播与排队处理不能简单视作相同能力。'],
  eventbridge: ['将事件按规则送往匹配目标。', '关注事件来源、过滤匹配、目标与失败处理。', '事件总线不是所有场景下的任务队列替代品。'],
  'step-functions': ['组织业务步骤、分支、等待和重试。', '题目有多步骤协调与状态管理时重点比较。', '单纯保存任务与编排工作流不是同一职责。'],
  'api-gateway': ['向调用者提供 API 入口并集成后端。', '看接口类型、身份验证、限流与后端集成要求。', 'API 入口通常不替代后端业务处理。'],
  dlq: ['隔离多次处理失败或投递失败的消息。', '看失败去向、告警、调查与重新驱动流程。', '进入死信队列不代表任务完成。'],
  idempotency: ['让同一业务操作被重复提交时，不重复产生副作用。', '重复投递、重试和网络超时时要考虑幂等。', '不能只靠“正常时不会重复”来设计支付、扣库存等操作。'],
  'iot-core': ['连接和管理设备消息通信。', '看 MQTT、设备身份、策略与规则处理。', '设备连接、设备档案与访问授权分别配置。'],
  'iot-thing': ['为设备或其他对象建立云端注册档案。', '把 Thing、证书、私钥与策略的职责分开。', '有一条设备档案，不代表已经完成设备连接和授权。'],
  mqtt: ['设备等客户端进行轻量发布订阅通信。', '区分协议要求与承载它的云服务。', 'HTTP API 与 MQTT 消息模式不能直接互换。'],
  x509: ['使用证书验证设备等客户端身份。', '注意每台设备的证书、私钥与策略关联。', '身份证明不直接赋予全部资源权限。'],
  mgn: ['支持服务器迁移中的复制、测试与切换。', '区分整机迁移与数据库数据 / 文件搬运。', '应用依赖和切换验证不会因为复制完成而自动消失。'],
  dms: ['数据库数据迁移，以及受支持的持续数据复制。', '区分全量、变更复制、源目标支持与切换窗口。', '不保证自动转换所有数据库代码或搬迁整个应用。'],
  'schema-conversion-tool': ['评估并帮助转换数据库结构及相关代码。', '异构引擎迁移时，识别结构转换这一环。', '结构转换与实际数据复制是两项工作。'],
  datasync: ['在支持的本地与云存储之间传输数据。', '核对协议、数据量、网络、验证和元数据要求。', '它不是数据库结构转换工具。'],
  'storage-gateway': ['让本地应用使用云端支持的存储接口。', '区分文件、卷、磁带等网关类型及缓存模式。', '长期混合存储与一次性搬迁不是完全相同的需求。'],
  'application-discovery-service': ['迁移前收集系统信息与依赖，支持规划。', '先读清需要发现哪些配置和运行信息。', '盘点工具不等于迁移执行工具。'],
  'application-discovery-agent': ['需要深入采集服务器运行与连接等信息。', '比较安装代理与无代理方案的实际采集范围。', '无代理并不代表与代理采集完全相同的信息。'],
  snowball: ['理解旧题中带宽受限时通过物理设备搬运数据的思路。', '区分在线传输和离线搬运；新项目先核对服务可用性。', '设备运输、复制和切换都需要时间，不适合所有实时同步需求。'],
  rpo: ['定义最多可接受的数据损失时间窗口。', '题目说“最多丢失最近多久的数据”时识别 RPO。', '不是系统恢复所需时间。'],
  rto: ['定义业务中断后恢复的目标时间。', '题目说“多久必须恢复”时识别 RTO。', '不是数据备份间隔。'],
  'disaster-recovery': ['设计严重故障后的业务恢复方案。', '数据、应用、基础设施、入口和演练要一起看。', '高耐久存储并不自动等于完整业务容灾。'],
  'multi-az': ['将资源分布到多个可用区。', '结合具体服务部署模式判断故障切换与读取能力。', '多可用区不等于跨区域。'],
  'pilot-light': ['灾备区预先保持核心部分，故障时补齐其他能力。', '区分只保留核心与保留缩小的完整运行环境。', '恢复时间取决于实际设计和演练，没有固定保证。'],
  'warm-standby': ['灾备区运行缩小但完整的备用环境。', '故障后通常需要扩展并切换流量。', '备用环境运行中不代表容量已经足以承担全部业务。'],
  'route53-failover-routing': ['按健康状态与主动 / 被动设计选择 DNS 响应。', '看健康检查、主备记录与应用 / 数据的备用能力。', '改 DNS 不会自动部署备用应用或复制数据库。'],
  'spot-instance': ['可中断、能重试或可分散执行的计算任务。', '核对中断容忍度、容量变化与恢复策略。', '低单价不等于适合不可中断的关键业务。'],
  'savings-plans': ['符合条件、相对稳定的计算用量。', '看承诺用量与适用范围，而不是只看折扣描述。', '不是通用容量预留。'],
  'capacity-reservation': ['为指定条件的 EC2 工作负载保障容量。', '把容量保证与计费折扣分开分析。', '单独做容量预留本身不提供折扣。'],
  'compute-optimizer': ['分析支持资源的使用情况并获取优化建议。', '看到资源配置过大 / 过小的建议需求时核对。', '建议与自动修改资源不是同一件事。'],
  's3-storage-lens': ['查看 S3 存储使用与活动等相关分析。', '区分存储可见性、生命周期规则与计算资源优化。', '它不是自动给 EC2 调整规格的服务。'],
  'kinesis-streams': ['持续接入并由消费者处理流式记录。', '看顺序范围、消费者、保留与吞吐需求。', '不要直接把数据流当成只有单次消费的待办队列。'],
  firehose: ['将流式数据托管投递到支持的目的地。', '区分流式投递与自定义消费处理架构。', '投递缓冲与目标服务影响端到端延迟。'],
  glue: ['数据目录、集成与 ETL 等处理。', '判断题目是在整理数据还是查询分析。', '不是所有 SQL 查询任务都需要先建 ETL 作业。'],
  athena: ['对 S3 等支持数据源做交互式 SQL 查询。', '注意数据格式、分区、扫描量和权限。', '查询工具不自动修复错误数据模型与访问权限。'],
  redshift: ['数据仓库分析需求。', '关注分析查询、数据组织、加载与扩展方式。', '数据仓库不能简单当作所有交易系统的首选数据库。'],
  opensearch: ['搜索、日志与相关分析场景。', '辨认全文搜索与日志检索需求。', '搜索索引不是所有数据的唯一备份来源。'],
  sagemaker: ['机器学习模型开发、训练、部署等需求。', '分清数据准备、模型训练与推理阶段。', '不要把所有 AI 需求都等同于自行训练新模型。'],
  bedrock: ['通过托管能力访问基础模型并构建生成式 AI 应用。', '结合数据访问、检索增强、模型选择与内容控制要求。', '模型能生成内容不代表它天然能访问私有业务数据。'],
  cloudformation: ['用模板声明并管理基础设施。', '看模板、堆栈、依赖、变更和回滚。', '声明资源与编译应用代码是不同的工作。'],
  cdk: ['用支持的编程语言定义基础设施。', '理解它与 CloudFormation 的关系。', '使用代码定义资源不等于跳过底层部署与权限检查。'],
  codebuild: ['编译、测试并产出构件。', '题目问构建环境或测试执行时先识别这一环。', '不能笼统代替整条发布流程。'],
  codedeploy: ['把软件部署到支持的计算目标。', '结合发布方式、健康检查与回退。', '部署执行与基础设施创建、软件构建不是同一职责。'],
  codepipeline: ['编排源代码、构建、测试与部署等阶段。', '关注阶段如何串联、审批与失败处理。', '流水线中的实际构建或部署通常由相应工具完成。'],
  appconfig: ['管理并逐步发布应用配置。', '区别应用配置发布与二进制软件部署。', '配置变化同样需要验证、观测与回滚设计。']
};

const STUDY_EXTRA_TERMS = [
  { id: 'subnet', abbr: 'Subnet（子网）', name: 'VPC Subnet', aliases: ['subnet', 'subnets', '子网'], category: 'networking', function: 'VPC 内的一段 IP 地址范围，子网属于一个可用区。' },
  { id: 'route-table', abbr: 'Route Table', name: '路由表', aliases: ['route table', 'route tables', '路由表'], category: 'networking', function: '一组将目标地址范围映射到下一跳的路由规则。' },
  { id: 'security-group', abbr: 'Security Group', name: '安全组', aliases: ['security group', 'security groups', '安全组'], category: 'networking', function: '与资源网络接口关联的有状态网络流量控制，使用允许规则。' },
  { id: 'nacl', abbr: 'Network ACL', name: '网络访问控制列表', aliases: ['network ACL', 'NACL', 'network access control list', '网络ACL'], category: 'networking', function: '子网层面的无状态网络流量控制，可配置允许和拒绝规则。' },
  { id: 'iam-role', abbr: 'IAM Role', name: 'IAM 角色', aliases: ['IAM role', 'IAM roles', 'IAM角色'], category: 'security', function: '一种可按信任关系被扮演的 IAM 身份，具有相应权限，可通过临时凭证使用。' },
  { id: 'resource-policy', abbr: 'Resource Policy', name: '资源策略', aliases: ['resource policy', 'resource-based policy', 'bucket policy', '资源策略', '桶策略'], category: 'security', function: '附加在资源上的策略，用来说明哪些主体在什么条件下可以执行哪些操作。' },
  { id: 'dms', abbr: 'DMS', name: 'AWS Database Migration Service', aliases: ['DMS', 'Database Migration Service', '数据库迁移服务'], category: 'migration', function: '支持数据库数据迁移，以及兼容源和目标之间的持续数据复制。' },
  { id: 'global-tables', abbr: 'Global Tables', name: 'DynamoDB 全球表', aliases: ['global table', 'global tables', '全局表', '全球表'], category: 'database', function: '在多个支持的区域保留 DynamoDB 表副本；具体复制和一致性行为由所选模式决定。' },
  { id: 'dlq', abbr: 'DLQ', name: '死信队列', aliases: ['dead-letter queue', 'dead letter queue', 'DLQ', '死信队列', '死信伫列'], category: 'integration', function: '保存未能成功处理或投递的消息，供排查、告警和重新处理。' },
  { id: 'idempotency', abbr: 'Idempotency', name: '幂等性', aliases: ['idempotency', 'idempotent', '幂等'], category: 'concepts', function: '同一业务操作重复执行时，不重复产生原本只应发生一次的业务副作用。' },
  { id: 'bedrock', abbr: 'Bedrock', name: 'Amazon Bedrock', aliases: ['Bedrock', '基础模型'], category: 'analytics', function: '用于访问基础模型并构建生成式 AI 应用的托管服务。' }
];

const STUDY_LEGACY_TERMS = new Set(['qldb', 'pinpoint', 'opsworks', 'sms', 'agentless-discovery-connector', 'snowball', 'application-discovery-service', 'application-discovery-agent']);
const STUDY_EXAM_GUIDE = 'https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-professional-02/solutions-architect-professional-02.html';
