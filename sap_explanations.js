const QUESTION_EXPLANATIONS = {
  "1": {
    "blocker": "公司有地端机房同 AWS 多个 VPC，但内部域名 cloud.example.com 只想放在 AWS 管理。地端同各 VPC 都要解析到呢个域名，而家未有清晰、高效能嘅混合 DNS 路径。已有 Direct Connect（专线）接 Transit Gateway（跨 VPC 汇流排）。",
    "requirements": "1) 用 Route 53 私有托管区域（Private Hosted Zone：只在指定 VPC 内有效的 DNS 区域）管理 cloud.example.com；2) 地端系统同所有 VPC 都能解析；3) 走已有 DX + TGW，要求最高效能。",
    "steps": [
      "把 Private Hosted Zone 关联到所有需要解析的 VPC，令 VPC 内资源可直接查这个域名。",
      "在 Shared Services VPC 建立 Route 53 Inbound Resolver Endpoint（入站解析器：接收外部 DNS 查询）。",
      "在地端 DNS 设定条件转送：遇到 cloud.example.com 就转去 Inbound Resolver 的 IP。",
      "确保地端经 Direct Connect → Transit Gateway 可到达 Shared Services VPC，查询路径最短。"
    ],
    "solutions": "正确答案是 A。核心三件套：Private Hosted Zone 全 VPC 关联 + Inbound Resolver（地端查 AWS）+ Transit Gateway/Direct Connect 高效能连线。唔好用自建 EC2 做 DNS 转送（维护重、可用性差）。 补充：Inbound Resolver / Private Hosted Zone 都是 DNS 基础设施，不是跑业务的伺服器；查到 IP 之后，应用仍要连到 VPC 里真正的 EC2/ALB 等资源。",
    "result_flow": "分两段理解：【DNS 查名】地端伺服器上的应用查 cloud.example.com → 地端 DNS 条件转送 → Direct Connect → Transit Gateway → Shared Services VPC 的 Inbound Resolver（这是 DNS 入口，不是业务伺服器）→ Private Hosted Zone 回传 AWS 资源的私有 IP。【真正连线】应用拿到 IP 后，再经 DX → TGW 连到业务 VPC 内真正的伺服器／负载平衡器（EC2、ALB 等）。VPC 内资源则直接查已关联的 Private Hosted Zone，不必绕地端。",
    "options": {
      "A": "✓ 正确。Inbound 方向正确、Zone 关联完整、连线走 TGW/DX 高效能。",
      "B": "错。自建 EC2 Conditional Forwarder 要自己做高可用与扩展，营运成本高。",
      "C": "错。Outbound Resolver 是 AWS 查地端，方向反了；且只关联 Shared VPC 不够。",
      "D": "错。其他 VPC 未完整接到 TGW 或关联不完整，无法全网解析。"
    },
    "diagram_before": "flowchart TB\n  subgraph onprem[\"地端机房\"]\n    APP[\"地端伺服器<br/>跑应用程式\"]\n    DNS[\"地端 DNS 伺服器\"]\n  end\n  DX[\"Direct Connect DX\"]\n  TGW[\"Transit Gateway\"]\n  VPC[\"AWS 各 VPC<br/>内有 EC2/ALB 等资源\"]\n  GAP{{\"缺口: 查唔到<br/>cloud.example.com 对应边个 IP\"}}\n  APP --> DNS\n  APP -.->|想连 AWS 资源| VPC\n  DNS -.-> GAP\n  APP --> DX --> TGW --> VPC\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  subgraph onprem[\"地端机房\"]\n    APP[\"地端伺服器<br/>跑应用程式\"]\n    DNS[\"地端 DNS<br/>条件转送\"]\n  end\n  subgraph aws[\"AWS\"]\n    DX[\"Direct Connect<br/>DX 专线\"]\n    TGW[\"Transit Gateway<br/>TGW\"]\n    IR[\"Inbound Resolver<br/>DNS 入口不是业务伺服器\"]\n    PHZ[\"Private Hosted Zone<br/>只系 DNS 记录本\"]\n    SVC[\"业务 VPC 内资源<br/>EC2 / ALB / 其他服务\"]\n  end\n  APP -->|\"① 查名 cloud.example.com\"| DNS\n  DNS -->|\"② DNS 查询\"| DX\n  DX --> TGW\n  TGW -->|\"入 Shared Services VPC\"| IR\n  IR --> PHZ\n  PHZ -->|\"③ 回传私有 IP\"| APP\n  APP -->|\"④ 真正业务连线\"| DX\n  TGW -->|\"到业务 VPC\"| SVC\n  SVC -.->|\"各 VPC 已关联 PHZ<br/>VPC 内亦可直接解析\"| PHZ"
  },
  "2": {
    "blocker": "天气资料 REST API 用 API Gateway + Lambda + DynamoDB，DNS 在 Route 53。而家只有单一 Region，Region 故障就整条 API 断线。",
    "requirements": "要跨 Region 故障转移（Disaster Recovery：灾难复原），资料层要同步，DNS 要能自动切到备援 Region。",
    "steps": [
      "在另一个 Region 部署一套完整的 API Gateway + Lambda。",
      "把 DynamoDB 改为 Global Tables（全球表：多 Region 自动复写同一份资料）。",
      "把 weather.example.com 改成 Route 53 Failover 记录，并对主 Region 端点做 Health Check（健康检查）。",
      "主 Region 不健康时，DNS 自动把流量导向备援 Region。"
    ],
    "solutions": "正确答案是 C。标准主动-被动 DR：备援堆叠 + DynamoDB Global Tables + Route 53 Failover + Health Check。",
    "result_flow": "用户查 weather.example.com → Route 53 健康检查主 Region → 正常则回主 API；故障则回备援 API Gateway → Lambda → 读写本 Region 的 DynamoDB Global Tables 副本。",
    "options": {
      "A": "错。Edge-optimized API 不能当 Region 级故障转移；Lambda 亦唔系咁跨 Region 当 target。",
      "B": "错。Multivalue 是同时分流量，唔系故障转移，两个 API 会同时收流量。",
      "C": "✓ 正确。Failover + Health Check + Global Tables 是跨 Region API DR 标准做法。",
      "D": "错。Lambda 冇「global functions」呢种概念；Multivalue 亦唔系 DR。"
    },
    "diagram_before": "flowchart TB\n  U[\"用户\"] --> R53[\"Route 53\"]\n  R53 --> API[\"API Gateway<br/>单一 Region\"]\n  API --> L[\"Lambda\"]\n  L --> DDB[\"DynamoDB<br/>单 Region\"]\n  X{{\"Region 故障<br/>整条 API 中断\"}}\n  API -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  U[\"用户\"] --> R53[\"Route 53 Failover<br/>+ Health Check\"]\n  R53 -->|主| API1[\"API Gateway + Lambda<br/>主 Region\"]\n  R53 -.->|备援| API2[\"API Gateway + Lambda<br/>备援 Region\"]\n  API1 --> GT[\"DynamoDB<br/>Global Tables\"]\n  API2 --> GT\n"
  },
  "3": {
    "blocker": "公司用 Organizations（多帐户组织）管理帐户，全部喺 Production OU，根层有 deny list SCP（服务控制政策：组织级禁止规则，下层改不掉）限制服务。新并购帐户加咗入嚟，管理员想改 AWS Config 规则但被 SCP 挡住。",
    "requirements": "要临时允许新帐户调整 Config，完成后仍要回到既有 Production 政策，又唔好增加长期维护负担、唔好削弱全组织安全。",
    "steps": [
      "建立临时 Onboarding OU，把新帐户放进去。",
      "在 Onboarding OU 套用允许 AWS Config 操作的 SCP。",
      "把原本挂在组织根的限制性 SCP 移到 Production OU（只影响 Production 成员）。",
      "新帐户完成 Config 调整后，移入 Production OU，自动继承原有限制。"
    ],
    "solutions": "正确答案是 D。暂时 OU + 把根 SCP 下移到 Production 是标准 onboarding 模式，唔使永久改根政策，亦唔使转成 allow list。",
    "result_flow": "新帐户 → Onboarding OU（可改 Config）→ 调整完成 → 移入 Production OU → 重新受 Production SCP 约束；其他既有帐户全程留在 Production 不受影响。",
    "options": {
      "A": "错。移除根 SCP 会令全组织失去限制；Service Catalog 亦取代唔到 SCP 强制力。",
      "B": "错。有 Onboarding OU 但根 SCP 仍在，新帐户仍可能被限制。",
      "C": "错。转 allow list 要重写所有允许服务，维护成本极高。",
      "D": "✓ 正确。临时 OU + SCP 重新定位，完成后帐户自动继承 Production 政策。"
    },
    "diagram_before": "flowchart TB\n  ROOT[\"Organizations 根\"]\n  PROD[\"Production OU<br/>全部帐户\"]\n  SCP[\"根层 deny list SCP\"]\n  NEW[\"新并购帐户\"]\n  GAP{{\"缺口: 无法改<br/>AWS Config 规则\"}}\n  ROOT --> PROD\n  ROOT --> SCP\n  SCP -.-> PROD\n  NEW --> PROD\n  NEW -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  ROOT[\"Organizations 根\"]\n  ONB[\"Onboarding OU<br/>可改 Config\"]\n  PROD[\"Production OU<br/>限制性 SCP\"]\n  NEW[\"新帐户\"]\n  ROOT --> ONB\n  ROOT --> PROD\n  NEW -->|先入| ONB\n  ONB -->|调整完成| PROD\n"
  },
  "4": {
    "blocker": "地端有 stateful（有状态：要记住使用者连到边部机）两层应用 + PostgreSQL，用户会大增。要搬上 AWS（Aurora PostgreSQL、EC2 Auto Scaling、负载平衡器），又要体验一致、应用同资料库都可扩展。",
    "requirements": "应用层要可横向扩展又维持 session；资料库读取要可扩展；使用 ALB/NLB 其中合适者。",
    "steps": [
      "把资料库迁到 Aurora PostgreSQL，并为读取副本开启 Aurora Auto Scaling。",
      "应用层放在 EC2 Auto Scaling 群组前面加 ALB（应用负载平衡器）。",
      "在 ALB 开 sticky sessions（黏性工作阶段：同一用户固定到同一后端）。",
      "新 session 用 round robin 均匀分配，既有 session 靠 sticky 保持一致体验。"
    ],
    "solutions": "正确答案是 C。读取用 Aurora Replicas Auto Scaling；写入仍系单一 Writer；ALB sticky sessions 适合 HTTP stateful 应用。",
    "result_flow": "用户 → ALB（sticky + round robin）→ 同一 EC2 实例处理 session → 读请求可打到自动增减的 Aurora Replicas；写仍走 Writer。",
    "options": {
      "A": "错。NLB 在 L4，HTTP sticky 支援有限；Least Outstanding 较适合无状态。",
      "B": "错。Aurora Auto Scaling 唔可以扩展 Writer 数量（只得一个 Writer）。",
      "C": "✓ 正确。Read Replica Auto Scaling + ALB Sticky 是 stateful 标准架构。",
      "D": "错。「Aurora Scaling for writers」唔啱；NLB 亦不适合 HTTP session 亲和。"
    },
    "diagram_before": "flowchart TB\n  USER[\"用户\"] --> APP[\"地端 stateful<br/>两层应用\"]\n  APP --> PG[\"PostgreSQL<br/>单机\"]\n  X{{\"用户暴增<br/>扩展不足\"}}\n  APP -.-> X\n  PG -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  U[\"用户\"] --> ALB[\"ALB<br/>sticky session\"]\n  ALB --> ASG[\"EC2 Auto Scaling\"]\n  ASG -->|写| W[\"Aurora Writer\"]\n  ASG -->|读| R[\"Aurora Replicas<br/>Auto Scaling\"]\n  W --> R\n"
  },
  "5": {
    "blocker": "公司有 metadata 服务，用户端系智能电视、网络收音机等装置。好多旧装置唔支援某啲 HTTP 回应标头（header：回应里额外嘅说明栏），见到就会报错。以前地端负载平衡器会睇 User-Agent（装置「自称系边个」），系旧装置就拆走有问题嘅标头。而家应用已迁去 AWS Lambda（无伺服器函数），需要喺 serverless 架构下继续呢个能力。",
    "requirements": "1) 采用 serverless，用 Lambda 处理业务；2) 仍然按 User-Agent 识别旧装置，并移除其不支援的回应标头；3) 尽量用托管服务，少自己管伺服器。",
    "steps": [
      "用 CloudFront（CDN：全球内容加速／入口）作为对外统一入口。",
      "后面接 ALB（应用负载平衡器），把请求路由到对应的 Lambda 函数处理 metadata 业务。",
      "在 CloudFront 加上 Lambda@Edge（喺 CDN 边缘节点执行的函数），处理「回给用户之前」的回应。",
      "Lambda@Edge 读取请求的 User-Agent：若系旧装置，就从回应中拆走不支援的标头。",
      "新装置可原样收到完整标头；旧装置收到「干净」回应，唔会再因标头报错。"
    ],
    "solutions": "正确答案是 D。角色分工要分清楚：Lambda = 厨房（产生 metadata 内容）；CloudFront + ALB = 入口同路由；Lambda@Edge = 出门前再检查一次（改 HTTP 回应标头）。技术上改「回给装置的标头」应发生在回应路径（viewer-response 一类事件）；题库选项写 “in response to viewer requests” 意思系回应用户请求时改标头，考点系用 Lambda@Edge 喺边缘改标头，而唔系用 API Gateway 预设错误回应。唔好用 CloudFront Functions（A）：能力较受限，呢类条件式改标头考题偏好 Lambda@Edge。",
    "result_flow": "【请求】旧装置 → CloudFront → ALB → Lambda 产生业务回应（可能带有问题标头）。【回应】Lambda → ALB → CloudFront；喺交回装置前，Lambda@Edge 按 User-Agent 拆标头 → 旧装置收到干净回应。记住：拆标头发生在「回应离开 CloudFront 回用户」𠮶下，唔系 Lambda 业务逻辑入面必须做嘅事。",
    "options": {
      "A": "错。前半 CloudFront + ALB + Lambda 可以，但用 CloudFront Functions 拆标头能力受限；按 User-Agent 条件式改回应标头，考题标准做法系 Lambda@Edge，唔系 Functions。",
      "B": "错。API Gateway REST 的 gateway responses 主要处理闸道自己的错误回应（例如 4xx/5xx），唔系「每个成功业务回应都按 User-Agent 动态拆自订标头」的正确位置。",
      "C": "错。HTTP API 的 response mapping 能力较弱，难以灵活做「睇 User-Agent → 条件式删多个回应标头」。",
      "D": "✓ 正确。CloudFront 做入口、ALB 调 Lambda 做业务、Lambda@Edge 在边缘按 User-Agent 移除有问题的回应标头，对应 serverless + 支援旧装置，最接近以前地端 LB 拆标头的角色。"
    },
    "diagram_before": "flowchart TB\n  subgraph onprem[\"地端现况\"]\n    DEV[\"旧装置<br/>TV / 收音机\"]\n    LB[\"地端负载平衡器<br/>按 User-Agent 拆标头\"]\n    APP[\"应用伺服器\"]\n  end\n  DEV --> LB --> APP\n  X{{\"迁到 Lambda 后<br/>缺「拆回应标头」能力\"}}\n  APP -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  DEV[\"装置<br/>带 User-Agent\"] -->|\"① 请求\"| CF[\"CloudFront<br/>全球入口\"]\n  CF -->|\"② 转发\"| ALB[\"ALB<br/>负载平衡\"]\n  ALB -->|\"③ 调用\"| L[\"Lambda<br/>业务：产生 metadata\"]\n  L -->|\"④ 业务回应\"| ALB\n  ALB --> CF\n  EDGE[\"Lambda@Edge<br/>viewer-response<br/>按 User-Agent 拆标头\"]\n  CF --> EDGE\n  EDGE -->|\"⑤ 干净回应\"| DEV"
  },
  "6": {
    "blocker": "零售公司 Account A 的 S3（物件储存）有资料档，商业伙伴 Account B 的 IAM 使用者 User_DataProcessor 要从自己帐户读取。呢个系跨帐户 IAM 存取，唔系浏览器 CORS 问题。",
    "requirements": "要双向授权齐全：资源端（Bucket Policy）同身分端（IAM）都允许 GetObject 同 ListBucket。选两个步骤。",
    "steps": [
      "在 Account A 的 S3 Bucket Policy 写明 Principal 为 User_DataProcessor，允许 s3:GetObject 与 s3:ListBucket。",
      "Resource 要同时涵盖物件 ARN 同储存桶 ARN（ListBucket 要对 bucket 本身）。",
      "在 Account B 帮 User_DataProcessor 挂 IAM 政策，允许对该桶 GetObject 与 ListBucket。",
      "双方政策齐全后，User_DataProcessor 即可跨帐户列目录与下载档。"
    ],
    "solutions": "正确答案是 C + D。跨帐户 S3：Bucket Policy 指定外部 Principal + 使用者 IAM 有对应权限，两者缺一不可。",
    "result_flow": "User_DataProcessor 呼叫 S3 API → Account B IAM 允许 → Account A Bucket Policy 允许该 Principal → 成功 List/Get 物件。",
    "options": {
      "A": "错。CORS 只服务浏览器跨来源，同 IAM 跨帐户无关。",
      "B": "错。缺少 Principal，且 Resource 未正确涵盖 ListBucket 所需的 bucket ARN。",
      "C": "✓ 正确。Bucket Policy 明确指定外部帐户 Principal 系资源端授权。",
      "D": "✓ 正确。身分端 IAM 要有 ListBucket + GetObject 及正确 Resource。",
      "E": "错。只有 GetObject 冇 ListBucket，无法列出桶内容。"
    },
    "diagram_before": "flowchart TB\n  UB[\"Account B<br/>User_DataProcessor\"]\n  SA[\"Account A<br/>S3 资料桶\"]\n  X{{\"跨帐户<br/>未授权读取\"}}\n  UB -.->|失败| SA\n  UB -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart LR\n  UB[\"Account B<br/>User + IAM\"] -->|API| SA[\"Account A<br/>S3 桶\"]\n  BP[\"Bucket Policy<br/>允许外部 Principal\"] -.-> SA\n  IAM[\"IAM 允许<br/>GetObject/List\"] -.-> UB\n  UB -->|\"List/Get 成功\"| OK[\"读取物件\"]\n"
  },
  "7": {
    "blocker": "传统 Web 应用跑喺 EC2，要重构成容器化微服务，有 production 同 testing 两环境。负载有已知上下限，想 serverless（少管伺服器）、最低营运复杂度同成本效益。",
    "requirements": "容器要可自动扩展、环境隔离、入口用负载平衡，唔好引入过重平台。",
    "steps": [
      "把容器映像推上 Amazon ECR（容器映像仓库）。",
      "建两个自动扩展的 ECS（容器编排）丛集，使用 Fargate（免管 EC2 的容器执行模式）。",
      "production 同 testing 各配一个 ALB 分流流量。",
      "依已知负载上下限设定 Auto Scaling 规则。"
    ],
    "solutions": "正确答案是 B。ECR + 双 Fargate ECS Cluster + ALB。Fargate 比 EKS 简单、比 Lambda 更适合长跑容器微服务。",
    "result_flow": "映像 → ECR → production/testing 各自 Fargate 服务自动扩展 → 各 ALB 对外；无需管理底层 EC2。",
    "options": {
      "A": "错。Lambda 容器映像有执行时间与冷启动限制，唔适合持续跑嘅微服务。",
      "B": "✓ 正确。ECS Fargate 系 serverless 容器首选，双 Cluster 隔离环境。",
      "C": "错。EKS（Kubernetes）营运复杂度远高于 ECS，唔符合最低营运要求。",
      "D": "错。Elastic Beanstalk 唔系 serverless，仍要管底层资源。"
    },
    "diagram_before": "flowchart TB\n  U[\"用户\"] --> WEB[\"传统 Web 应用\"]\n  WEB --> EC2[\"EC2 单体\"]\n  X{{\"要容器化微服务<br/>低营运成本\"}}\n  EC2 -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  IMG[\"容器映像\"] --> ECR[\"Amazon ECR\"]\n  ECR --> PROD[\"ECS Fargate<br/>production\"]\n  ECR --> TEST[\"ECS Fargate<br/>testing\"]\n  PROD --> ALB1[\"ALB\"]\n  TEST --> ALB2[\"ALB\"]\n"
  },
  "8": {
    "blocker": "多层 Web：ALB + Auto Scaling EC2，备援 Region 已复制但 ASG min/max=0（平时零台）。RDS Multi-AZ 有跨 Region Read Replica。想 RTO（复原时间目标）<15 分钟自动故障转移，预算唔够 active-active（双活）。",
    "requirements": "被动 DR：平时省钱，故障时自动 promote 资料库、扩展 ASG、DNS 切流量。",
    "steps": [
      "在备援 Region 写 Lambda：promote RDS Read Replica 成主库，并把 ASG 容量从 0 调高。",
      "用 Route 53 Health Check 监控主 Region 应用健康。",
      "健康失败时 SNS 通知触发该 Lambda 做故障转移。",
      "Route 53 Failover 记录把 DNS 指去备援 ALB。"
    ],
    "solutions": "正确答案是 B。Health Check + Failover + Lambda 自动化 promote/扩容，系被动 DR 标准，可达分钟级 RTO。",
    "result_flow": "主 Region 故障 → Route 53 Health Check 失败 → SNS → 备援 Lambda promote 副本并调 ASG → DNS Failover 导向备援 ALB → 应用恢复。",
    "options": {
      "A": "错。Latency-based 系 active-active 分流，成本高且唔系被动 DR。",
      "B": "✓ 正确。自动化 promote + ASG 扩容 + Failover DNS。",
      "C": "错。备援 ASG 平时开住加成本；用 snapshot 复制 RTO 太长。",
      "D": "错。Global Accelerator 偏 active-active 且贵；CloudWatch 5XX 不如 Health Check 直接。"
    },
    "diagram_before": "flowchart TB\n  U[\"用户\"] --> ALB1[\"主 Region<br/>ALB + ASG\"]\n  ALB1 --> RDS[\"RDS Multi-AZ\"]\n  RDS -.->|非同步复写| RR[\"跨 Region<br/>Read Replica\"]\n  RR -.-> DR[\"备援 Region<br/>ASG min=0 未热备\"]\n  X{{\"主挂时 RTO 难 <15 分<br/>备援未自动接管\"}}\n  ALB1 -.-> X\n  DR -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  U[\"用户\"] --> R53[\"Route 53 Failover<br/>+ Health Check\"]\n  R53 -->|主| ALB1[\"主 ALB + ASG\"]\n  R53 -.->|备| ALB2[\"备援 ALB + ASG\"]\n  HC[\"Health Check 失败\"] --> SNS[\"SNS\"]\n  SNS --> L[\"Lambda<br/>promote + 调 ASG\"]\n  L --> ALB2\n  L --> RDS2[\"Promote RDS 副本\"]\n"
  },
  "9": {
    "blocker": "关键应用只跑喺单一 EC2，ElastiCache Redis 单节点，RDS MariaDB 单实例。任何一层挂掉就全挂，要自动恢复、尽量少停机。选三个步骤。",
    "requirements": "运算、资料库、快取三层都要消单点故障，并尽量自动故障转移。",
    "steps": [
      "EC2 改为多实例：前面加 ELB，并用 Auto Scaling（min≥2）自动替换故障实例。",
      "RDS 改 Multi-AZ（多可用区同步备援），主库故障自动切换。",
      "ElastiCache 建 Replication Group（主从复写）并开 Multi-AZ。",
      "验证任一一层故障时流量/连线可自动恢复。"
    ],
    "solutions": "正确答案是 A + D + F。ALB/ASG + RDS Multi-AZ + Redis Replication Group Multi-AZ，三层都有自动恢复。",
    "result_flow": "用户 → ELB → ASG 多 EC2；应用 → Multi-AZ RDS（主挂自动切备）；应用 → Redis Replication Group Multi-AZ（主挂自动切）。",
    "options": {
      "A": "✓ 正确。ELB 分散流量，ASG 保证至少两台并自动替换。",
      "B": "错。「unlimited mode」唔系有效 EC2 高可用配置。",
      "C": "错。同 AZ 读取副本挡唔到 AZ 故障；手动 promote 唔系自动恢复。",
      "D": "✓ 正确。RDS Multi-AZ 同步复写，故障自动切换。",
      "E": "错。ElastiCache 唔系用 Auto Scaling Group 模式嚟做 Redis HA。",
      "F": "✓ 正确。Replication Group + Multi-AZ 提供 Redis 高可用。"
    },
    "diagram_before": "flowchart TB\n  U[\"用户\"] --> EC2[\"单一 EC2\"]\n  EC2 --> REDIS[\"ElastiCache Redis<br/>单节点\"]\n  EC2 --> RDS[\"RDS MariaDB<br/>单实例\"]\n  X{{\"任一层挂<br/>全服务中断\"}}\n  EC2 -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  U[\"用户\"] --> ELB[\"ELB / ALB\"]\n  ELB --> ASG[\"ASG 多 EC2<br/>min≥2\"]\n  ASG --> RDS[\"RDS Multi-AZ\"]\n  ASG --> REDIS[\"Redis Replication<br/>Group Multi-AZ\"]\n"
  },
  "10": {
    "blocker": "电商：CloudFront 指 ALB，后面 EC2 + RDS。更新后 ALB 偶发 502（畸形 HTTP 标头）。要向用户显示自订错误页，营运负担要最低。选两步骤。",
    "requirements": "唔好为每次 502 改 ALB 规则或搞复杂告警自动化；用 CDN 层直接回自订错误页。",
    "steps": [
      "建立 S3 桶并开静态网站托管，上传自订错误页。",
      "在 CloudFront 设定 Custom Error Response（自订错误回应）。",
      "把 502 等错误码对应到 S3 上的错误页路径。",
      "用户遇到来源 502 时由 CloudFront 直接回友善页面。"
    ],
    "solutions": "正确答案是 A + E。S3 放错误页 + CloudFront Custom Error Response，无需改 ALB/Lambda 复杂流程。",
    "result_flow": "用户 → CloudFront → 来源 ALB 回 502 → CloudFront 拦截并改回 S3 自订错误页 → 用户看到友善讯息。",
    "options": {
      "A": "✓ 正确。S3 静态托管错误页系最简单内容来源。",
      "B": "错。CloudWatch + Lambda 改 ALB 规则太重，亦唔能即时处理每次 502。",
      "C": "错。Route 53 Health Check 侦测唔到 ALB 应用层 502。",
      "D": "错。同 B，营运负担高且反应不及时。",
      "E": "✓ 正确。CloudFront Custom Error Response 系处理来源错误页的标准做法。"
    },
    "diagram_before": "flowchart TB\n  U[\"用户\"] --> CF[\"CloudFront\"]\n  CF --> ALB[\"ALB + EC2\"]\n  ALB --> RDS[\"RDS\"]\n  X{{\"偶发 502<br/>丑错误页\"}}\n  ALB -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart LR\n  U[\"用户\"] --> CF[\"CloudFront<br/>Custom Error\"]\n  CF --> ALB[\"来源 ALB\"]\n  S3[\"S3<br/>自订错误页\"]\n  ALB -.->|502| CF\n  CF -->|改回| S3\n  S3 -->|\"友善页\"| U\n"
  },
  "11": {
    "blocker": "多帐户用 Organizations。基建团队有专用基础设施帐户管 VPC，成员帐户要可在子网路建资源，但唔可以自己管网路。要共享共用网路。选两步骤。",
    "requirements": "集中式 VPC：基础设施帐户拥有网路，成员只「用」共享子网路。",
    "steps": [
      "在 Organizations 管理帐户启用 RAM（Resource Access Manager：跨帐户资源共享）与组织整合。",
      "在基础设施帐户用 RAM 建立 Resource Share，把子网路共享给指定 OU。",
      "成员帐户在共享子网路建立 EC2/ENI 等资源。",
      "成员无法修改 VPC/路由等网路设定，仍由基建帐户管理。"
    ],
    "solutions": "正确答案是 B + D。启用组织级 RAM 共享 + 在基建帐户共享子网路到 OU，系 AWS 推荐集中网路模型。",
    "result_flow": "管理帐户开 RAM → 基建帐户共享 Subnet 至 OU → 成员帐户在共享 Subnet 建资源 → 网路控制权仍在基建帐户。",
    "options": {
      "A": "错。Transit Gateway 用嚟连接网路，唔系共享子网路畀人建资源。",
      "B": "✓ 正确。必须由 Organizations 管理帐户启用 RAM 共享。",
      "C": "错。每帐户建相同 CIDR VPC + Peering 管理混乱，亦违反集中管理。",
      "D": "✓ 正确。RAM 共享子网路系推荐做法。",
      "E": "错。Prefix List 用嚟引用 CIDR，唔能共享子网路部署资源。"
    },
    "diagram_before": "flowchart TB\n  INFRA[\"基建帐户<br/>管 VPC\"]\n  MEM[\"成员帐户\"]\n  X{{\"成员要建资源<br/>但不能管网路\"}}\n  MEM -.-> X\n  INFRA -.-> MEM\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  MGMT[\"管理帐户<br/>启用 RAM\"]\n  INFRA[\"基建帐户\"] --> SHARE[\"RAM Resource Share<br/>共享 Subnet\"]\n  SHARE --> OU[\"目标 OU\"]\n  OU --> MEM[\"成员帐户<br/>在共享 Subnet 建资源\"]\n  MGMT -.-> SHARE\n"
  },
  "12": {
    "blocker": "公司要喺 VPC 内用私有连线呼叫第三方 SaaS API，流量唔好经公网，又要最小权限，唔好令外部可摸入公司 VPC 资源。",
    "requirements": "用 AWS 私有网路对接 SaaS，只开需要的连线方向与安全群组。",
    "steps": [
      "确认第三方有提供 PrivateLink Endpoint Service（私有连线服务端点）。",
      "在自己 VPC 建立 Interface VPC Endpoint（介面端点）连去该服务。",
      "用 Security Group 限制边啲资源可以打呢个 Endpoint。",
      "应用改连 Endpoint 私有 DNS/地址，流量留在 AWS 骨干。"
    ],
    "solutions": "正确答案是 A。PrivateLink（私有连线）系 SaaS 私有整合标准：消费方建 VPC Endpoint，提供方暴露 Endpoint Service。",
    "result_flow": "VPC 内应用 → Interface Endpoint → AWS 私有骨干 → 第三方 Endpoint Service → SaaS API；唔经互联网，对方亦唔直接进你 VPC。",
    "options": {
      "A": "✓ 正确。PrivateLink 流量唔经公网，最小暴露面。",
      "B": "错。Site-to-Site VPN 要对方配合，复杂度高且唔系呢类标准私有连线。",
      "C": "错。VPC Peering 会令网路互通，可能违反「外部唔好存取公司 VPC」要求。",
      "D": "错。应由消费方建 Endpoint 连对方 Service，唔系自己建 Endpoint Service。"
    },
    "diagram_before": "flowchart TB\n  APP[\"VPC 内应用\"]\n  SaaS[\"第三方 SaaS API\"]\n  X{{\"要私有连线<br/>勿经公网\"}}\n  APP -.->|公网风险| SaaS\n  APP -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart LR\n  APP[\"VPC 内应用\"] --> EP[\"Interface Endpoint<br/>PrivateLink\"]\n  EP --> BACK[\"AWS 私有骨干\"]\n  BACK --> ES[\"第三方<br/>Endpoint Service\"]\n  ES --> SaaS[\"SaaS API\"]\n"
  },
  "13": {
    "blocker": "公司有地端伺服器同 AWS EC2，修补（patch）状态散落各处，好难出一份统一合规报告。",
    "requirements": "要同一套工具管理地端 + EC2 修补，并产生单一合规报告。",
    "steps": [
      "在 EC2 与地端机安装/启用 SSM Agent（Systems Manager 代理）。",
      "地端用 Hybrid Activation 注册到 Systems Manager。",
      "用 Patch Manager 定义修补基准并执行。",
      "在 Systems Manager 查看/汇出统一修补合规报告。"
    ],
    "solutions": "正确答案是 A。Systems Manager Patch Manager 系统一修补管理与报告的标准服务。",
    "result_flow": "地端/EC2（SSM Agent）→ Patch Manager 扫描与修补 → 合规资料汇总 → 单一合规报告。",
    "options": {
      "A": "✓ 正确。SSM Patch Manager 覆盖混合环境并可出报告。",
      "B": "错。OpsWorks 已不适合新场景，亦唔系地端修补首选。",
      "C": "错。Inspector 偏安全评估；EventBridge 只系排程，唔管理修补。",
      "D": "错。OpsWorks 不适用；X-Ray 系分散式追踪。"
    },
    "diagram_before": "flowchart TB\n  ONP[\"地端伺服器\"]\n  EC2[\"AWS EC2\"]\n  X{{\"修补状态分散<br/>难统一合规报告\"}}\n  ONP -.-> X\n  EC2 -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  ONP[\"地端 + SSM Agent\"] --> PM[\"Systems Manager<br/>Patch Manager\"]\n  EC2[\"EC2 + SSM Agent\"] --> PM\n  PM --> RPT[\"统一合规报告\"]\n"
  },
  "14": {
    "blocker": "Auto Scaling 缩容会终止 EC2，但实例日志有时未上传到 S3 就已被销毁，资料流失。",
    "requirements": "终止前必须先把日志复制到 S3，完成后先至允许实例真正终止。",
    "steps": [
      "为 Auto Scaling 群组加 Lifecycle Hook（生命周期挂钩：终止前先暂停）。",
      "用 EventBridge 侦测 EC2_INSTANCE_TERMINATING 事件。",
      "Lambda 透过 SSM SendCommand 喺实例上执行复制日志到 S3 的文件。",
      "完成后送 CONTINUE，让 Auto Scaling 继续终止实例。"
    ],
    "solutions": "正确答案是 B。Lifecycle Hook + EventBridge + Lambda + SSM SendCommand 系终止前执行动作的标准模式。",
    "result_flow": "ASG 要终止实例 → Lifecycle Hook 暂停 → EventBridge → Lambda → SSM 复制日志到 S3 → CONTINUE → 实例终止。",
    "options": {
      "A": "错。ABANDON 会阻终止令实例堆住；手动终止亦增复杂度。",
      "B": "✓ 正确。Lifecycle Hook + SSM 保证终止前完成日志搬运。",
      "C": "错。User Data 唔保证喺终止时跑；EventBridge 亦拦截唔到终止前窗口。",
      "D": "错。ABANDON 破坏正常终止；SNS 中间层无必要。"
    },
    "diagram_before": "flowchart TB\n  ASG[\"Auto Scaling\"] -->|缩容终止| EC2[\"EC2\"]\n  EC2 -.->|日志未上传| S3[\"S3\"]\n  X{{\"实例销毁<br/>日志流失\"}}\n  EC2 -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart LR\n  ASG[\"ASG 终止\"] --> HOOK[\"Lifecycle Hook<br/>暂停\"]\n  HOOK --> EB[\"EventBridge\"]\n  EB --> L[\"Lambda\"]\n  L --> SSM[\"SSM SendCommand<br/>复制日志 → S3\"]\n  SSM --> CONT[\"CONTINUE<br/>再终止\"]\n"
  },
  "15": {
    "blocker": "公司用多个 AWS 帐户。DNS 记录（Private Hosted Zone / PHZ：私有 DNS 记录本）放喺 Account A；应用同资料库喺 Account B。新 VPC 入面 EC2 要解析 db.example.com（指去 RDS），记录喺 A 嘅 PHZ 已建好，但 B 嘅 EC2 仍然 resolve 唔到。原因系：跨帐户时，B 嘅 VPC 未获授权、亦未关联到 A 嘅 PHZ，VPC 内 DNS 睇唔到𠮶本记录本。",
    "requirements": "选两个步骤，令 Account B 新 VPC 入面可以解析 Account A 私有托管区域嘅 db.example.com；要符合 Route 53 跨帐户关联正式流程，唔好用临时 hack。",
    "steps": [
      "（Account A）建立「关联授权」（association authorization）：允许指定嘅 Account B VPC 关联到呢个 PHZ。",
      "（Account B）把新 VPC 真正关联（associate）到 Account A 嘅 private hosted zone。",
      "（Account A，建议）关联成功后删除授权，避免之后被重复／误用同一授权（官方建议清理步骤）。",
      "完成后，B 内 EC2 用 VPC DNS 查 db.example.com 就能命中 A 的 PHZ 记录，应用可连 RDS。"
    ],
    "solutions": "正确答案是 C、E（题库原先误标 B+C，已更正）。跨帐户 Private Hosted Zone 标准三步：Authorize（C）→ Associate（E 前半）→ 删除授权（E 后半，官方建议）。B 错：改 /etc/resolv.conf 加 RDS IP 既唔正确（resolv.conf 系 DNS 伺服器清单，唔系 hostname 对照表），又唔可扩展、RDS IP 可能变、ASG 新机会冇呢个设定。社群同 AWS 文件一致选 C+E。",
    "result_flow": "Account A 建立授权 → Account B 将新 VPC 关联到 A 的 PHZ →（可选）A 删除授权 → EC2 查 db.example.com → VPC DNS / Route 53 Resolver → 读到 A 的 PHZ 记录 → 得到 RDS 端点 → 应用连线成功。",
    "options": {
      "A": "错。把 DB 改去 EC2 偏离 RDS 架构，亦解决唔到「跨帐户 PHZ 未关联」呢个根因。",
      "B": "错。手动改 /etc/resolv.conf 塞 IP 唔系 DNS 正解，易坏、难维护，唔符合题目「记录已正确建在 Route 53」应走嘅路。",
      "C": "✓ 正确。跨帐户关联前，拥有 PHZ 的 Account A 必须先建立 association authorization。",
      "D": "错。Route 53 冇「跨帐户复制 private hosted zone」呢种做法嚟解呢题；亦冇必要另建一套 zone。",
      "E": "✓ 正确。Account B 侧把 VPC 关联到 A 的 hosted zone，令该 VPC 可以解析 PHZ；之后删除授权系官方建议收尾。"
    },
    "diagram_before": "flowchart TB\n  subgraph A[\"Account A\"]\n    PHZ[\"Private Hosted Zone PHZ<br/>db.example.com → RDS\"]\n  end\n  subgraph B[\"Account B 新 VPC\"]\n    EC2[\"应用 EC2\"]\n    RDS[\"RDS\"]\n  end\n  EC2 -.->|查 db.example.com<br/>失败| PHZ\n  X{{\"缺口: 未跨帐户授权<br/>亦未关联 VPC↔PHZ\"}}\n  EC2 -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  subgraph A[\"Account A\"]\n    AUTH[\"① 建立关联授权<br/>Authorize\"]\n    PHZ[\"Private Hosted Zone<br/>db.example.com\"]\n    DEL[\"③ 删除授权<br/>官方建议\"]\n  end\n  subgraph B[\"Account B\"]\n    VPC[\"新 VPC\"]\n    EC2[\"应用 EC2\"]\n    RDS[\"RDS\"]\n  end\n  AUTH -->|\"允许 B 的 VPC\"| VPC\n  VPC -->|\"② Associate\"| PHZ\n  AUTH --> DEL\n  EC2 -->|\"查 db.example.com\"| PHZ\n  PHZ -->|\"回传端点\"| EC2\n  EC2 --> RDS"
  },
  "16": {
    "blocker": "部落格网站影片突然爆量，内容放 EFS（共享档案系统），I/O 打爆导致逾时。要最具成本效益地扩展。",
    "requirements": "大型静态/媒体档应用 CDN 与物件储存，而唔系一直加 EFS 效能。",
    "steps": [
      "把影片物件迁到 S3。",
      "建立 CloudFront，来源指 S3（或适当 origin）。",
      "网站改为从 CloudFront URL 播片，减轻 EFS。",
      "EFS 只保留真正需要共享档案系统的内容。"
    ],
    "solutions": "正确答案是 C。S3 + CloudFront 系媒体分发高性价比标准方案，比加 EFS Max I/O 更对症。",
    "result_flow": "用户播片 → CloudFront 边缘快取 →（未命中）S3 取片；Web 动态请求仍可走原 ALB/EFS，影片流量与 EFS 脱钩。",
    "options": {
      "A": "错。EFS Max I/O 加钱但未解决「静态影片应用 CDN」根本问题。",
      "B": "错。Instance Store 易失且迁移麻烦，唔适合持久内容。",
      "C": "✓ 正确。S3 + CloudFront 标准、省钱、可全球加速。",
      "D": "错。全部经 CloudFront 仍打 ALB/EFS，影片仍压档案系统。"
    },
    "diagram_before": "flowchart TB\n  U[\"用户播片\"] --> ALB[\"ALB + EC2\"]\n  ALB --> EFS[\"EFS<br/>影片档\"]\n  X{{\"EFS 成本高<br/>吞吐压力大\"}}\n  EFS -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart LR\n  U[\"用户播片\"] --> CF[\"CloudFront\"]\n  CF --> S3[\"S3<br/>影片物件\"]\n  WEB[\"动态 Web\"] --> ALB[\"ALB + EC2\"]\n  ALB --> EFS[\"EFS<br/>仅共享档\"]\n"
  },
  "17": {
    "blocker": "公司要加冗余 Direct Connect（专线），并预留将来多 Region 连线扩展，而家架构要一次拣啱。",
    "requirements": "多条 DX、多 VPC/未来多 Region，应用同一套可扩展连接模型。",
    "steps": [
      "建立 Direct Connect Gateway（DX 闸道：可连多 VPC/跨 Region）。",
      "每条 DX 连线各建 Private VIF 接到 DX Gateway。",
      "把相关 VPC 的 Virtual Private Gateway 关联到 DX Gateway。",
      "验证冗余路径与日后加 Region/VPC 只需再关联即可。"
    ],
    "solutions": "正确答案是 A。DX Gateway + 双 Private VIF 系多 VPC/多 Region DX 的标准冗余架构。",
    "result_flow": "地端 → 冗余 DX 连线 → 各自 Private VIF → DX Gateway → 关联多个 VPC（可跨 Region）→ 云端资源。",
    "options": {
      "A": "✓ 正确。DX Gateway 支援多 VPC/Region 扩展。",
      "B": "错。单条 VIF 绑定模型唔适合跨 Region 灵活扩展描述。",
      "C": "错。Public VIF 用嚟去 AWS 公网服务，唔系连 VPC 私网。",
      "D": "错。应经 DX Gateway 连 VPC；描述用 TGW 直接接 DX 的方式不正确。"
    },
    "diagram_before": "flowchart TB\n  ONP[\"地端\"] --> DX[\"多条 DX\"]\n  DX --> VPC[\"多 VPC / 多 Region\"]\n  X{{\"缺统一 DX 闸道<br/>冗余难扩\"}}\n  DX -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  ONP[\"地端\"] --> DX1[\"DX 连线 1\"]\n  ONP --> DX2[\"DX 连线 2\"]\n  DX1 --> VIF1[\"Private VIF\"]\n  DX2 --> VIF2[\"Private VIF\"]\n  VIF1 --> DXG[\"Direct Connect<br/>Gateway\"]\n  VIF2 --> DXG\n  DXG --> VPCs[\"多 VPC / 跨 Region\"]\n"
  },
  "18": {
    "blocker": "影片上传后要分析分类，而家靠第三方软体，营运重。想重构成 AWS 托管服务、降低维运。",
    "requirements": "上传、排队、分析、分类全程 serverless/托管，少管伺服器。",
    "steps": [
      "用 S3 托管静态网站并存放上传影片。",
      "S3 事件通知送到 SQS（讯息伫列）缓冲。",
      "Lambda 消费 SQS，呼叫 Rekognition（影像/影片分析服务）做分类。",
      "结果写回储存或资料库，全程无自管伺服器。"
    ],
    "solutions": "正确答案是 C。S3 + SQS + Lambda + Rekognition 全托管事件驱动，营运负担最低。",
    "result_flow": "用户上传 → S3 → 事件 → SQS → Lambda → Rekognition 分类 → 写回结果；无需 ECS/EC2 常驻。",
    "options": {
      "A": "错。ECS + Spot 仍要管容器与容量。",
      "B": "错。EFS 通常贵过 S3；架构亦未尽用 S3 事件驱动。",
      "C": "✓ 正确。全托管无伺服器分析管线。",
      "D": "错。Elastic Beanstalk 仍涉及管理 EC2。"
    },
    "diagram_before": "flowchart TB\n  U[\"用户上传影片\"] --> APP[\"现有流程\"]\n  X{{\"要自动分类<br/>最低营运\"}}\n  APP -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart LR\n  U[\"用户上传\"] --> S3[\"S3\"]\n  S3 -->|事件| SQS[\"SQS\"]\n  SQS --> L[\"Lambda\"]\n  L --> REK[\"Rekognition<br/>分类\"]\n  REK --> OUT[\"结果储存\"]\n"
  },
  "19": {
    "blocker": "Lambda 部署慢、出错回滚慢，想加快发布与错误侦测/回滚。",
    "requirements": "要渐进式（金丝雀）切流量，告警时可自动回滚。",
    "steps": [
      "用 AWS SAM 定义 Lambda 与部署偏好。",
      "整合 CodeDeploy 做 Lambda 流量渐进切换。",
      "设定 pre/post-traffic hook 做验证测试。",
      "CloudWatch 告警触发时自动回滚到旧版本。"
    ],
    "solutions": "正确答案是 B。SAM + CodeDeploy 系 Lambda 金丝雀部署与自动回滚最佳实践。",
    "result_flow": "发新版本 → CodeDeploy 渐进把 Alias 流量切去新版本 → 指标异常 → 自动回滚旧版本。",
    "options": {
      "A": "错。纯 CloudFormation change set 回滚粒度不如流量切换细。",
      "B": "✓ 正确。原生金丝雀/线性部署 + 自动回滚。",
      "C": "错。自订 CLI 脚本维护重，无内建流量管理。",
      "D": "错。新建 API + 改 CloudFront origin 又慢又复杂。"
    },
    "diagram_before": "flowchart TB\n  REQ[\"请求\"] --> L[\"Lambda\"]\n  L --> VER[\"新版本全量切换\"]\n  X{{\"缺金丝雀<br/>+ 自动回滚\"}}\n  VER -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart LR\n  SAM[\"AWS SAM\"] --> CD[\"CodeDeploy\"]\n  CD --> ALIAS[\"Lambda Alias<br/>渐进切流量\"]\n  ALIAS --> NEW[\"新版本\"]\n  ALIAS --> OLD[\"旧版本\"]\n  CW[\"CloudWatch 告警\"] -.->|回滚| CD\n"
  },
  "20": {
    "blocker": "内部文件经 Client VPN 存取，低频、唔需要高可用同极速撷取，但一定唔好公开上网，又要最低成本。",
    "requirements": "冷/低频私有物件储存 + 私有网路路径存取。",
    "steps": [
      "资料放 S3 One Zone-IA（单可用区低频存取，更平）。",
      "建 S3 Interface VPC Endpoint，让 VPC/VPN 路径私有存取。",
      "Bucket Policy 限制只允许经 Endpoint 存取。",
      "用户经 Client VPN 入 VPC 再存 S3，唔经公网。"
    ],
    "solutions": "正确答案是 A。One Zone-IA + VPC Endpoint + 桶策略限制，系低频私有存取最低成本组合。",
    "result_flow": "用户 → Client VPN → VPC → S3 Interface Endpoint → One Zone-IA 物件；公网直连被政策拒绝。",
    "options": {
      "A": "✓ 正确。成本低且可私有化存取。",
      "B": "错。EC2 + EFS 常驻成本高。",
      "C": "错。EC2 + EBS 同样要常开机。",
      "D": "错。Deep Archive 撷取极慢；网站托管设定亦易误公开。"
    },
    "diagram_before": "flowchart TB\n  U[\"用户\"] --> DATA[\"低频私有资料\"]\n  DATA --> PUB[\"可能经公网存取\"]\n  X{{\"要最低成本<br/>且私有存取\"}}\n  DATA -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart LR\n  U[\"用户\"] --> VPN[\"Client VPN\"]\n  VPN --> VPC[\"VPC\"]\n  VPC --> EP[\"S3 Interface<br/>Endpoint\"]\n  EP --> S3[\"S3 One Zone-IA\"]\n  BP[\"桶政策限 Endpoint\"] -.-> S3\n"
  },
  "21": {
    "blocker": "公司已有 Active Directory，想用同一套身分登入 Organizations 内多个 AWS 帐户，要条件式存取、单一身分管理，唔好每帐户各自搞一套。",
    "requirements": "联合身分（Federation）+ 自动同步使用者 + 依属性授权（ABAC）。",
    "steps": [
      "启用 IAM Identity Center（身分中心，前称 SSO）。",
      "用 SAML 2.0 连接现有 Active Directory。",
      "用 SCIM 自动同步使用者与群组。",
      "以 ABAC（属性型存取控制）依 AD 群组/属性决定可进边个帐户、边组权限。"
    ],
    "solutions": "正确答案是 A。Identity Center + AD SAML + SCIM + ABAC 系企业多帐户联合身分标准架构。",
    "result_flow": "员工用 AD 凭证 → SAML 登入 Identity Center → 依属性/Permission Set 进入对应帐户角色 → 操作 AWS。",
    "options": {
      "A": "✓ 正确。保留现有 AD，集中管多帐户存取。",
      "B": "错。若 Identity Center 本身做身分来源，就用唔到现有 AD 凭证流程。",
      "C": "错。单帐户 IAM SAML 难集中管 Organizations 多帐户。",
      "D": "错。OIDC 非 AD 典型整合；手动跨帐户 Role 难维护。"
    },
    "diagram_before": "flowchart TB\n  AD[\"Active Directory\"]\n  ACC[\"多个 AWS 帐户\"]\n  X{{\"缺企业级<br/>联合身分\"}}\n  AD -.-> X\n  ACC -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart LR\n  AD[\"Active Directory\"] -->|SAML + SCIM| IC[\"IAM Identity Center\"]\n  IC -->|ABAC / Permission Set| A1[\"帐户 A\"]\n  IC --> A2[\"帐户 B\"]\n  IC --> A3[\"帐户 C\"]\n"
  },
  "22": {
    "blocker": "少数客户端狂打大量 PUT，令 API 出错、终端体验差。客户端可以接受重试。",
    "requirements": "要喺 API 层限制个别客户速率，回 429 让对方重试，保护后端。",
    "steps": [
      "为 API 建立 Usage Plan（用量计划）并绑 API Key。",
      "对问题客户的 Key 设 throttling（节流）上限。",
      "超出时 API Gateway 回 429。",
      "客户端依重试策略稍后再送，后端唔再被打爆。"
    ],
    "solutions": "正确答案是 B。API Gateway Usage Plan 节流系限制特定客户请求率的标准做法。",
    "result_flow": "问题客户 PUT → API Gateway Usage Plan 节流 → 429 → 客户端重试；其他客户正常，后端稳定。",
    "options": {
      "A": "错。只改客户端重试阻止唔到对方过量请求打爆伺服器。",
      "B": "✓ 正确。API 层按 Key 节流，体验可控。",
      "C": "错。快取解决唔到 PUT 写入过载。",
      "D": "错。Reserved Concurrency 限并发且影响所有呼叫者，唔系按客户节流。"
    },
    "diagram_before": "flowchart TB\n  BAD[\"问题客户<br/>高频 PUT\"] --> API[\"API Gateway\"]\n  API --> BE[\"后端\"]\n  X{{\"单一客户<br/>打爆后端\"}}\n  BAD -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart LR\n  BAD[\"问题客户\"] --> KEY[\"API Key\"]\n  KEY --> PLAN[\"Usage Plan<br/>节流\"]\n  PLAN -->|超限 429| BAD\n  PLAN -->|正常| BE[\"后端\"]\n  OK[\"其他客户\"] --> PLAN\n"
  },
  "23": {
    "blocker": "每月只要跑约 72 小时高效能批次，需要共享高效能档案系统，其余时间系统闲置。想尽量悭钱。",
    "requirements": "资料长期平价存放；高效能档案系统只在作业期间存在。",
    "steps": [
      "原始资料放 S3 Intelligent-Tiering（自动调储存层悭钱）。",
      "作业前建立 FSx for Lustre（高效能平行档案系统），从 S3 lazy load。",
      "跑完 72 小时批次后删除 Lustre 档案系统。",
      "结果写回 S3，平时只付 S3 费用。"
    ],
    "solutions": "正确答案是 A。S3 长期存 + 按需 FSx Lustre 系批次 HPC 档案负载最低成本模式。",
    "result_flow": "S3 存资料 → 建 Lustre 并载入 → 批次运算读写 Lustre → 结果回 S3 → 删 Lustre → 只留 S3。",
    "options": {
      "A": "✓ 正确。用完即删高效能层，悭最多。",
      "B": "错。EBS Multi-Attach 持续收费且容量固定。",
      "C": "错。S3 Standard 通常贵过 Intelligent-Tiering；batch load 亦较慢。",
      "D": "错。File Gateway 要常驻闸道，唔适合每月只 72 小时。"
    },
    "diagram_before": "flowchart TB\n  STORE[\"长期储存\"] --> DATA[\"HPC 批次资料\"]\n  DATA --> JOB[\"72h 批次运算\"]\n  X{{\"平时要悭<br/>作业要高效能 FS\"}}\n  JOB -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  S3[\"S3 Intelligent-Tiering\"] -->|lazy load| FSX[\"FSx for Lustre\"]\n  FSX --> BATCH[\"批次运算 72h\"]\n  BATCH --> S3\n  BATCH -.->|完成删除| FSX\n"
  },
  "24": {
    "blocker": "对外提供固定 TCP 埠服务，客户要把 IP 加白名单，又要公开 DNS 名称，并要高可用。",
    "requirements": "要有稳定公有 IP（每 AZ）、L4 负载平衡、DNS 指向负载平衡器。",
    "steps": [
      "部署 NLB（网路负载平衡器，适合 TCP）。",
      "每个 AZ 分配 Elastic IP 给 NLB。",
      "Target Group 挂上后端 EC2，监听固定 TCP 埠。",
      "Route 53 Alias 记录指向 NLB DNS 名称。"
    ],
    "solutions": "正确答案是 C。NLB + 每 AZ EIP + Route 53 Alias 系「固定 IP + TCP + HA」标准架构。",
    "result_flow": "客户 allow list EIP → 连 NLB 固定 TCP 埠 → 转发多 AZ EC2；DNS 名 Alias 到 NLB。",
    "options": {
      "A": "错。EIP 直接绑单机 EC2 无负载平衡与 HA。",
      "B": "错。ECS 丛集本身无「固定 public IP」这套正确模型。",
      "C": "✓ 正确。NLB 支援静态 IP 与任意 TCP。",
      "D": "错。ALB 唔适合任意静态 TCP 埠场景；CNAME 亦无固定 IP。"
    },
    "diagram_before": "flowchart TB\n  CLIENT[\"客户<br/>要 allow list 固定 IP\"]\n  APP[\"TCP 应用 EC2\"]\n  X{{\"缺固定公网 IP<br/>+ TCP HA\"}}\n  CLIENT -.-> X\n  APP -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  CLIENT[\"客户 allow list\"] --> EIP[\"NLB 每 AZ EIP\"]\n  EIP --> NLB[\"NLB TCP\"]\n  NLB --> EC2[\"多 AZ EC2\"]\n  R53[\"Route 53 Alias\"] --> NLB\n"
  },
  "25": {
    "blocker": "12 台伺服器迁 EC2：约 65% 排程作业要稳（SLA），35% 使用者作业可延迟。要高可用又悭钱。",
    "requirements": "保证容量用 On-Demand/Capacity Reservation；可中断用 Spot；跨多 AZ。",
    "steps": [
      "在三个 AZ 分散部署。",
      "每 AZ 放足够 On-Demand 并用 Capacity Reservation 锁排程 SLA 容量。",
      "每 AZ 再加 Spot 处理可延迟使用者作业。",
      "总规模对齐约 12 实例级需求，平衡成本与可用性。"
    ],
    "solutions": "正确答案是 D。三 AZ ×（3 On-Demand Capacity Reservation + 1 Spot）平衡 SLA 与成本。",
    "result_flow": "排程作业 → 预留 On-Demand 容量保证；使用者作业 → Spot 可省钱；AZ 故障仍有其他 AZ。",
    "options": {
      "A": "错。只两 AZ 可用性较差；Spot 过多可能影响排程 SLA。",
      "B": "错。单 AZ 全 On-Demand 最贵且无跨 AZ HA。",
      "C": "错。Savings Plans 唔等同按 AZ 保证容量。",
      "D": "✓ 正确。Reservation 保 SLA，Spot 处理可延迟负载。"
    },
    "diagram_before": "flowchart TB\n  SCH[\"排程作业 SLA\"] --> FLEET[\"运算机群\"]\n  USER[\"使用者作业\"] --> FLEET\n  X{{\"要 3 AZ<br/>SLA + 省成本\"}}\n  FLEET -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  AZ1[\"AZ1: 3 On-Demand CR<br/>+ 1 Spot\"]\n  AZ2[\"AZ2: 3 On-Demand CR<br/>+ 1 Spot\"]\n  AZ3[\"AZ3: 3 On-Demand CR<br/>+ 1 Spot\"]\n  SCH[\"排程作业\"] --> AZ1\n  SCH --> AZ2\n  SCH --> AZ3\n  USER[\"使用者作业\"] -.-> AZ1\n  USER -.-> AZ2\n  USER -.-> AZ3\n"
  },
  "26": {
    "blocker": "用 CloudFormation 部署应用，RDS 密码想交 Secrets Manager 管，要 90 天自动轮换，营运开销要最低。",
    "requirements": "宣告式管理密码产生与轮换，避免人手改密码。",
    "steps": [
      "在模板建立 Secrets Manager Secret 存放 RDS 密码。",
      "配置 Secrets Manager 原生 RDS 轮换 Lambda。",
      "用 RotationSchedule 宣告每 90 天轮换。",
      "应用从 Secrets Manager 读最新密码连库。"
    ],
    "solutions": "正确答案是 A。Secrets Manager + RotationSchedule 系 RDS 密码自动轮换最低营运方案。",
    "result_flow": "CloudFormation 建 Secret 与轮换 → 每 90 天自动改 RDS 密码并更新 Secret → 应用取新密码。",
    "options": {
      "A": "✓ 正确。原生轮换、宣告式、开销低。",
      "B": "错。Parameter Store 无同等 RotationSchedule 原生体验。",
      "C": "错。自建 EventBridge 轮换可做但营运重过原生。",
      "D": "错。AppSync DataSource 同密码轮换无关。"
    },
    "diagram_before": "flowchart TB\n  APP[\"应用\"] --> RDS[\"RDS\"]\n  X{{\"密码要 90 天轮换<br/>最低营运\"}}\n  RDS -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart LR\n  CFN[\"CloudFormation\"] --> SM[\"Secrets Manager<br/>Secret\"]\n  SM -->|RotationSchedule| ROT[\"轮换 Lambda\"]\n  ROT --> RDS[\"RDS 密码\"]\n  APP[\"应用\"] --> SM\n"
  },
  "27": {
    "blocker": "多张 DynamoDB 表要经 HTTPS 公开简单 API 读资料，要 serverless、自动扩展。选两个方案。",
    "requirements": "入口用 API Gateway，后端可直接整合 DynamoDB 或经 Lambda。",
    "steps": [
      "方案一：API Gateway REST API 用 AWS 服务整合直接打 DynamoDB。",
      "方案二：API Gateway HTTP API 整合 Lambda，由 Lambda 读 DynamoDB。",
      "两者都 HTTPS、按需扩展、无需自管伺服器。",
      "避免用唔支援的直接整合或错误负载平衡组合。"
    ],
    "solutions": "正确答案是 A + C。REST 直接整合最简洁；HTTP API + Lambda 同样 serverless 且更灵活。",
    "result_flow": "客户 HTTPS → API Gateway →（A）直接 DynamoDB 或（C）Lambda → DynamoDB → JSON 回应。",
    "options": {
      "A": "✓ 正确。REST API 支援直接 AWS 整合 DynamoDB。",
      "B": "错。HTTP API 一般唔支援同 REST 一样的直接 AWS Service Integration。",
      "C": "✓ 正确。HTTP API + Lambda 读表，自动扩展。",
      "D": "错。Global Accelerator + Lambda@Edge 过重且唔系典型 DynamoDB API 方案。",
      "E": "错。NLB 唔能直接把 Lambda 当典型 target 咁用（应 ALB 或 Function URL 等）。"
    },
    "diagram_before": "flowchart TB\n  C[\"客户 HTTPS\"] --> API[\"要建 API\"]\n  API --> DDB[\"DynamoDB\"]\n  X{{\"要 serverless<br/>读写 DynamoDB\"}}\n  API -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  C[\"客户 HTTPS\"] --> APIG[\"API Gateway<br/>REST / HTTP API\"]\n  APIG -->|直接整合 A| DDB[\"DynamoDB\"]\n  APIG -->|Lambda C| L[\"Lambda\"]\n  L --> DDB\n"
  },
  "28": {
    "blocker": "10 个行销域名要 HTTP/HTTPS 重新导向去不同 URL，规则在 JSON，DNS 用 Route 53，想最低营运。选三步骤。",
    "requirements": "统一入口接 HTTP/HTTPS，用无伺服器逻辑读 JSON 回 302/301，多域名要合法凭证。",
    "steps": [
      "建立 ALB，开 HTTP 与 HTTPS 监听器。",
      "用 Lambda 读 JSON，按 Host/路径决定 redirect 目标。",
      "用 ACM 申请凭证，把所有域名加入 SAN。",
      "Route 53 各域名指到 ALB；HTTPS 用该多域名凭证。"
    ],
    "solutions": "正确答案是 B + C + F。ALB 入口 + Lambda 导向逻辑 + ACM 多 SAN 凭证。",
    "result_flow": "用户开任一域名 → Route 53 → ALB（HTTPS/ACM）→ Lambda 查 JSON → 回重新导向 URL。",
    "options": {
      "A": "错。EC2 动态网页要管机，营运高。",
      "B": "✓ 正确。ALB 提供 HTTP/HTTPS 入口。",
      "C": "✓ 正确。Lambda 无伺服器执行导向逻辑。",
      "D": "错。API Gateway 自订多域名导向较繁。",
      "E": "错。CloudFront + Lambda@Edge 可行但通常重过 ALB+Lambda。",
      "F": "✓ 正确。ACM 多 SAN 一次覆盖 10 域名 HTTPS。"
    },
    "diagram_before": "flowchart TB\n  DOMS[\"多个旧域名\"] --> DNS[\"DNS / 网站\"]\n  DNS --> OLD[\"旧导向方式\"]\n  X{{\"要 HTTPS 导向<br/>到新 URL\"}}\n  OLD -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart LR\n  U[\"用户多域名\"] --> R53[\"Route 53\"]\n  R53 --> ALB[\"ALB + ACM<br/>多 SAN\"]\n  ALB --> L[\"Lambda<br/>查 JSON 导向\"]\n  L -->|\"302 URL\"| U\n"
  },
  "29": {
    "blocker": "多帐户环境要计清所有标了 costCenter=compliance 的资源实际花咗几多钱，方便向合规团队收费。",
    "requirements": "要组织级启用成本分配标签，并用最细的帐单资料拆成本。",
    "steps": [
      "在 Organizations 管理帐户启用 costCenter 使用者定义成本分配标签。",
      "开启 Cost and Usage Report（CUR：详细费用报告）汇出到 S3。",
      "按 costCenter 标签过滤/汇总。",
      "得出 compliance 团队应分摊金额。"
    ],
    "solutions": "正确答案是 A。管理帐户启用标签 + CUR 系跨帐户标签成本最精准做法。",
    "result_flow": "各帐户资源打 costCenter 标签 → 管理帐户启用分配 → CUR 进 S3 → 按标签加总 compliance 成本。",
    "options": {
      "A": "✓ 正确。组织级标签 + CUR 最准。",
      "B": "错。应在管理帐户启用；自写 Lambda 无必要。",
      "C": "错。成员帐户各自 CUR 睇唔到完整组织视图。",
      "D": "错。Trusted Advisor 唔提供标签级成本报告。"
    },
    "diagram_before": "flowchart TB\n  A1[\"帐户 A 资源\"] --> TAG[\"costCenter 标签\"]\n  A2[\"帐户 B 资源\"] --> TAG\n  X{{\"跨帐户标签成本<br/>难精准加总\"}}\n  TAG -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart LR\n  RES[\"各帐户资源<br/>costCenter 标签\"] --> MGMT[\"管理帐户<br/>启用分配标签\"]\n  MGMT --> CUR[\"CUR → S3\"]\n  CUR --> RPT[\"按标签加总<br/>compliance 成本\"]\n"
  },
  "30": {
    "blocker": "50 个帐户多 VPC，想用 Transit Gateway 互连；每次有新帐户要自动建 VPC 同 TGW Attachment。选两步骤。",
    "requirements": "共享 TGW + 自动化布建网路。",
    "steps": [
      "在管理帐户用 RAM 把 Transit Gateway 共享给成员帐户。",
      "用 CloudFormation StackSets 在成员帐户自动建 VPC。",
      "Stack 内建立 VPC 对共享 TGW 的 Attachment。",
      "新帐户纳管时自动跑同一套 StackSet。"
    ],
    "solutions": "正确答案是 A + C。RAM 共享 TGW + StackSets 自动建 VPC/Attachment。",
    "result_flow": "管理帐户共享 TGW → StackSet 部署到新帐户 → 建 VPC + Attachment → 帐户 VPC 经 TGW 互通。",
    "options": {
      "A": "✓ 正确。RAM 跨帐户共享 TGW。",
      "B": "错。SCP 系权限边界，唔系资源共享工具。",
      "C": "✓ 正确。StackSets 自动化网路落地。",
      "D": "错。Attachment 类型描述不正确（非 peering 那种讲法）。",
      "E": "错。Service Catalog 偏产品目录，非呢题基础设施自动化首选。"
    },
    "diagram_before": "flowchart TB\n  NEW[\"新帐户 VPC\"]\n  TGW[\"中央 Transit Gateway\"]\n  NEW -.->|未自动 attach| TGW\n  X{{\"缺口: 新帐户难自动<br/>接到 TGW\"}}\n  NEW -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  MGMT[\"管理帐户\"] --> RAM[\"RAM 共享 TGW\"]\n  MGMT --> SS[\"StackSets\"]\n  SS --> NEW[\"新帐户\"]\n  NEW --> VPC[\"VPC + Attachment\"]\n  VPC --> TGW[\"Transit Gateway\"]\n  RAM -.-> TGW\n"
  },
  "31": {
    "blocker": "要限制得 procurement-manager-role 先可以管 Private Marketplace（私有软体市集），开发者帐户只用嚟攞已核准软体，唔好人人都有管理权。",
    "requirements": "集中管理角色 + 组织 SCP 锁死管理动作 + 防止他人建同名角色绕过。",
    "steps": [
      "在 shared services 帐户建立 procurement-manager-role，挂 AWSPrivateMarketplaceAdminFullAccess。",
      "根层 SCP 拒绝非该角色的 Private Marketplace 管理动作。",
      "另一 SCP 防止任意建立同名角色。",
      "开发者帐户只消费已核准产品，唔能改市集设定。"
    ],
    "solutions": "正确答案是 C。集中角色 + 双 SCP（限管理者、禁建同名角色）系高效治理。",
    "result_flow": "采购角色在共享帐户管理 Private Marketplace → 全组织 SCP 挡其他 principal → 开发者只能启动已核准软体。",
    "options": {
      "A": "错。每帐户建角色 + inline deny 又散又难维护。",
      "B": "错。AdministratorAccess 太大；permissions boundary 亦难防其他管理员。",
      "C": "✓ 正确。集中 + SCP 最干净。",
      "D": "错。SCP 只套 shared services 挡唔到其他帐户管理市集。"
    },
    "diagram_before": "flowchart TB\n  DEV[\"开发者帐户\"]\n  MKT[\"软体采购\"]\n  X{{\"要集中核准<br/>禁未核准软体\"}}\n  DEV -.-> X\n  MKT -.->|存在但未接上| X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  ROLE[\"共享帐户<br/>采购角色\"] --> PM[\"Private Marketplace\"]\n  SCP[\"SCP 双层限制\"] -.-> DEV[\"开发者\"]\n  DEV -->|\"只能启动<br/>已核准软体\"| PM\n"
  },
  "32": {
    "blocker": "公司以为 SCP 已限制开发者 OU 只用 EC2/S3/DynamoDB，但开发者仍可用其他服务。",
    "requirements": "要令 deny list SCP 真正生效，必须处理 Organizations 预设 FullAWSAccess。",
    "steps": [
      "检查开发者 OU 是否仍挂住 FullAWSAccess（允许所有动作）。",
      "移除该 OU 的 FullAWSAccess SCP。",
      "保留/确认自订 deny list 或允许清单策略正确。",
      "验证未允许服务已被拒。"
    ],
    "solutions": "正确答案是 B。有 FullAWSAccess 时等同最大允许，限制策略难达预期；要移除先至令限制生效。",
    "result_flow": "开发者呼叫未准服务 → 只有自订限制 SCP、无 FullAWSAccess → 被拒；S3/EC2/DynamoDB 仍可用（再加 IAM）。",
    "options": {
      "A": "错。逐个服务手写 deny 唔切实际。",
      "B": "✓ 正确。移除 FullAWSAccess 系关键。",
      "C": "错。唔应胡乱改 FullAWSAccess 本体当长期方案。",
      "D": "错。乱用万用字元 deny 易误杀必要服务。"
    },
    "diagram_before": "flowchart TB\n  DEV[\"开发者 OU\"]\n  FULL[\"FullAWSAccess SCP\"]\n  LIMIT[\"自订限制 SCP\"]\n  X{{\"限制 SCP<br/>未真正生效\"}}\n  FULL -.-> DEV\n  LIMIT -.-> DEV\n  DEV -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  DEV[\"开发者 OU\"]\n  LIMIT[\"自订限制 SCP<br/>仅允许 S3/EC2/DDB\"]\n  LIMIT --> DEV\n  DENY[\"未准服务\"] -.->|被拒| DEV\n  OK[\"S3 / EC2 / DynamoDB\"] --> DEV\n"
  },
  "33": {
    "blocker": "5 台 EC2 公网 IP 直接写入 Route 53 multivalue，流量一爆就顶唔住，营运又重。想最低开销扩展。",
    "requirements": "用负载平衡 + Auto Scaling，DNS 只指稳定入口。",
    "steps": [
      "建 ALB 作为统一入口。",
      "EC2 放私有子网路并加入 Auto Scaling 群组。",
      "Route 53 改指 ALB。",
      "依 CPU/请求自动加减实例。"
    ],
    "solutions": "正确答案是 D。ALB + ASG 系扩展现有 EC2 应用最低营运方案。",
    "result_flow": "用户 → Route 53 → ALB → ASG 动态 EC2；唔再人手改多个 A 记录。",
    "options": {
      "A": "错。整成 Lambda + API Gateway 改动过大。",
      "B": "错。EKS 太重。",
      "C": "错。Lambda 改 DNS 慢且不可靠。",
      "D": "✓ 正确。经典、简单、可扩展。"
    },
    "diagram_before": "flowchart TB\n  U[\"用户\"] --> R53[\"Route 53<br/>多个 A 记录\"]\n  R53 --> EC2[\"多台 EC2<br/>人手管理\"]\n  X{{\"扩展靠人手<br/>改 DNS\"}}\n  EC2 -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart LR\n  U[\"用户\"] --> R53[\"Route 53\"]\n  R53 --> ALB[\"ALB\"]\n  ALB --> ASG[\"Auto Scaling<br/>动态 EC2\"]\n"
  },
  "34": {
    "blocker": "每个 OU 团队想睇自己 OU 下面所有帐户的成本拆解，而家缺乏组织级统一帐单视图。",
    "requirements": "从管理帐户出完整 CUR，再按 OU/帐户视觉化。",
    "steps": [
      "在管理帐户启用 Cost and Usage Report。",
      "CUR 送到 S3。",
      "用 QuickSight（或同类 BI）按 OU/帐户做仪表板。",
      "各团队只看自己范围的分解。"
    ],
    "solutions": "正确答案是 B。管理帐户 CUR 系跨帐户成本报告标准来源。",
    "result_flow": "全组织用量 → 管理帐户 CUR → S3 → QuickSight 按 OU 筛选 → 各团队报表。",
    "options": {
      "A": "错。RAM 唔能「建立 CUR」。",
      "B": "✓ 正确。管理帐户 CUR + 视觉化。",
      "C": "错。成员帐户各自 CUR 无完整 OU 视图。",
      "D": "错。Systems Manager 唔做成本报告。"
    },
    "diagram_before": "flowchart TB\n  ORG[\"Organizations\"] --> A1[\"帐户用量\"]\n  ORG --> A2[\"帐户用量\"]\n  X{{\"跨帐户成本<br/>缺统一报告\"}}\n  A1 -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart LR\n  ORG[\"全组织用量\"] --> CUR[\"管理帐户 CUR\"]\n  CUR --> S3[\"S3\"]\n  S3 --> QS[\"QuickSight<br/>按 OU 筛选\"]\n  QS --> RPT[\"各团队报表\"]\n"
  },
  "35": {
    "blocker": "地端 Windows 档案伺服器每日约 5GB 新资料，已有 Direct Connect，要同步到云端档案系统并保持 Windows/SMB 相容。",
    "requirements": "排程复制 + 云端原生 Windows 档案服务。",
    "steps": [
      "在云端建立 FSx for Windows File Server。",
      "部署 DataSync（托管资料搬运）代理/任务。",
      "设定每日排程，经 DX 复制到 FSx。",
      "验证 SMB 权限与资料一致性。"
    ],
    "solutions": "正确答案是 B。DataSync 排程 + FSx for Windows 系地端 Windows 档案上云标准。",
    "result_flow": "地端 Windows 档案 → DataSync 每日任务 → DX → FSx for Windows → 云端 SMB 存取。",
    "options": {
      "A": "错。File Gateway 偏混合快取存取，非完整同步取代。",
      "B": "✓ 正确。专为档案复制 + Windows 档案系统。",
      "C": "错。Data Pipeline 非档案同步；EFS 亦非原生 Windows ACL/SMB 首选。",
      "D": "错。EFS 不适合直接替代 Windows 档服。"
    },
    "diagram_before": "flowchart TB\n  ONP[\"地端 Windows<br/>档案伺服器\"] --> SMB[\"SMB 共用\"]\n  SMB --> USERS[\"地端用户\"]\n  X{{\"要每日同步<br/>上云 SMB\"}}\n  ONP -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart LR\n  ONP[\"地端 Windows 档案\"] --> DS[\"DataSync<br/>每日任务\"]\n  DS -->|DX| FSX[\"FSx for Windows\"]\n  FSX --> SMB[\"云端 SMB 用户\"]\n"
  },
  "36": {
    "blocker": "S3 静态资产要跨 Region 容错，第二 Region 已有桶，想最低营运开销。",
    "requirements": "自动复写 + CDN 来源自动故障转移。",
    "steps": [
      "开 S3 Cross-Region Replication（跨区复写）到第二 Region。",
      "CloudFront 设定 Origin Group（来源组）：主桶 + 备援桶。",
      "主来源失败时自动试备援。",
      "无需改应用双写逻辑。"
    ],
    "solutions": "正确答案是 C。CRR + CloudFront Origin Group 营运最轻。",
    "result_flow": "写入主 Region S3 → CRR 到备援 Region → 用户经 CloudFront → 主 origin 挂则自动打备援 origin。",
    "options": {
      "A": "错。应用双写 + weighted DNS 复杂且非自动 origin failover。",
      "B": "错。自写 Lambda 复制多余，CRR 已内建。",
      "C": "✓ 正确。托管复写 + CDN 故障转移。",
      "D": "错。要改程式手动切换，营运高。"
    },
    "diagram_before": "flowchart TB\n  U[\"用户\"] --> S3[\"S3 单 Region\"]\n  X{{\"Region 故障<br/>内容不可用\"}}\n  S3 -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  W[\"写入\"] --> S3A[\"S3 主 Region\"]\n  S3A -->|CRR| S3B[\"S3 备援 Region\"]\n  U[\"用户\"] --> CF[\"CloudFront<br/>Origin Group\"]\n  CF -->|主| S3A\n  CF -.->|备| S3B\n"
  },
  "37": {
    "blocker": "三层 .NET + MySQL 要迁 AWS，约 20 万日活，要可扩展、高可用，并用基础设施即程式码。",
    "requirements": "多 AZ 运算 + 托管高可用资料库 + CloudFormation 部署 + 保护资料删除策略。",
    "steps": [
      "用 CloudFormation 定义整栈。",
      "ALB + 跨三 AZ 的 Auto Scaling 跑应用。",
      "资料库用 Aurora MySQL Multi-AZ，DeletionPolicy Retain 防误删。",
      "Route 53 Alias 指 ALB。"
    ],
    "solutions": "正确答案是 B。CloudFormation + ALB + 三 AZ ASG + Aurora Multi-AZ 系企业 Web 标准。",
    "result_flow": "用户 → Route 53 → ALB → 三 AZ ASG 上 .NET → Aurora MySQL Multi-AZ；模板可重复部署。",
    "options": {
      "A": "错。Beanstalk/NLB/RDS MySQL 组合弹性与效能通常不如描述的 Aurora 架构。",
      "B": "✓ 正确。高可用、可扩展、IaC。",
      "C": "错。跨 Region 双份部署过高成本。",
      "D": "错。Spot 不适合关键生产；错误 deletion policy 有资料风险。"
    },
    "diagram_before": "flowchart TB\n  U[\"用户\"] --> APP[\".NET Web\"]\n  APP --> DB[\"资料库\"]\n  X{{\"要企业级 HA<br/>可重复部署\"}}\n  APP -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  U[\"用户\"] --> R53[\"Route 53\"]\n  R53 --> ALB[\"ALB\"]\n  ALB --> ASG[\"ASG 三 AZ<br/>.NET on EC2\"]\n  ASG --> AUR[\"Aurora MySQL<br/>Multi-AZ\"]\n  CFN[\"CloudFormation\"] -.-> ALB\n  CFN -.-> ASG\n  CFN -.-> AUR\n"
  },
  "38": {
    "blocker": "要用 CloudFormation StackSets 把 SNS Topic 部署到 Organizations 所有成员帐户。",
    "requirements": "从管理帐户用 service-managed 权限，对整个 organization 自动部署。",
    "steps": [
      "在管理帐户建立 StackSet。",
      "选 service-managed permissions（交由 Organizations 管理权限）。",
      "部署目标设为 organization/OU。",
      "启用 automatic deployment，新帐户自动有一份。"
    ],
    "solutions": "正确答案是 C。Service-managed StackSets 系组织集中部署标准。",
    "result_flow": "管理帐户 StackSet → 自动在各成员帐户建 SNS Topic → 新帐户加入亦自动部署。",
    "options": {
      "A": "错。唔应从成员帐户建组织级 StackSet。",
      "B": "错。self-managed 权限模型唔系呢题最佳。",
      "C": "✓ 正确。service-managed + org 自动部署。",
      "D": "错。Drift detection 系侦测偏离，唔系部署手段。"
    },
    "diagram_before": "flowchart TB\n  MGMT[\"管理帐户\"] --> MEM[\"多成员帐户\"]\n  MEM --> GAP[\"SNS 未统一部署\"]\n  X{{\"要集中自动<br/>部署 SNS\"}}\n  GAP -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  MGMT[\"管理帐户\"] --> SS[\"Service-managed<br/>StackSets\"]\n  SS --> A1[\"帐户 A SNS\"]\n  SS --> A2[\"帐户 B SNS\"]\n  SS --> A3[\"新帐户自动部署\"]\n"
  },
  "39": {
    "blocker": "迁移前要收集地端组态/效能/程序/网路，分组应用，并取得 EC2 实例类型建议。选三步骤。",
    "requirements": "探索代理收集 → Migration Hub 分组 → 产出 right-sizing 建议。",
    "steps": [
      "安装 Application Discovery Agent 收集详细系统资讯。",
      "在 Migration Hub 把伺服器分组成应用。",
      "用 Migration Hub 产生建议实例类型与成本。",
      "依建议规划迁移波次。"
    ],
    "solutions": "正确答案是 A + D + E。Discovery Agent + Migration Hub 分组 + 实例建议。",
    "result_flow": "Agent 上报 → Migration Hub 汇总 → 分组应用 → 产出 EC2 规格/成本建议 → 迁移计划。",
    "options": {
      "A": "✓ 正确。Agent 收组态、效能、程序、网路。",
      "B": "错。SSM Agent 主管理，非迁移探索主力。",
      "C": "错。Application Manager 非迁移分组工具。",
      "D": "✓ 正确。Migration Hub 应用分组。",
      "E": "✓ 正确。产出实例与成本建议。",
      "F": "错。Trusted Advisor 唔提供呢类迁移 right-sizing。"
    },
    "diagram_before": "flowchart TB\n  SRV[\"地端伺服器群\"] --> APP[\"多应用依赖\"]\n  APP --> PLAN[\"迁移计划草稿\"]\n  X{{\"缺盘点分组<br/>与 EC2 建议\"}}\n  PLAN -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart LR\n  AGENT[\"Discovery Agent\"] --> MH[\"Migration Hub\"]\n  MH --> GRP[\"应用分组\"]\n  GRP --> REC[\"EC2 规格<br/>成本建议\"]\n"
  },
  "40": {
    "blocker": "VPC 内 EC2 经 NAT Gateway 读 S3，每日约 1TB，NAT 流量费贵。要降成本又唔好牺牲安全。",
    "requirements": "S3 流量改走 Gateway VPC Endpoint，唔经 NAT。",
    "steps": [
      "建立 S3 Gateway Endpoint。",
      "更新私有子网路路由，S3 前缀走 Endpoint。",
      "可加 Endpoint Policy 限制允许的桶/动作。",
      "确认安全群组/桶策略仍符合最小权限。"
    ],
    "solutions": "正确答案是 C。S3 Gateway Endpoint 免费通道，省 NAT 处理费且更私有。",
    "result_flow": "EC2 → 私有路由 → S3 Gateway Endpoint → S3；其他互联网流量仍可走 NAT。",
    "options": {
      "A": "错。NAT Instance 要自维且可用性较差。",
      "B": "错。搬公有子网路降安全性。",
      "C": "✓ 正确。省钱又更安全。",
      "D": "错。EFS 取代唔到 S3 物件储存场景。"
    },
    "diagram_before": "flowchart TB\n  EC2[\"私有子网 EC2\"] --> NAT[\"NAT Gateway\"]\n  NAT --> S3[\"S3\"]\n  X{{\"NAT 处理费高<br/>S3 流量贵\"}}\n  NAT -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart LR\n  EC2[\"私有 EC2\"] -->|Gateway Endpoint| S3[\"S3\"]\n  EC2 -.->|其他上网| NAT[\"NAT Gateway\"]\n  NAT --> INET[\"互联网\"]\n"
  },
  "41": {
    "blocker": "DynamoDB 每周有 4 小时峰值约系平均 2 倍，写入多于读取，想最小化成本。",
    "requirements": "基础容量用 Reserved 悭钱，峰值用 Auto Scaling 临时升高。",
    "steps": [
      "以平均负载购买 Reserved Capacity。",
      "开 Application Auto Scaling 调 WCU/RCU。",
      "峰值自动加容量，过后缩回。",
      "唔好无谓上 DAX（读加速）因为写为主。"
    ],
    "solutions": "正确答案是 A。Auto Scaling + 匹配平均的 Reserved Capacity 最悭。",
    "result_flow": "平时 Reserved 低价扛平均 → 峰值 Auto Scaling 加 WCU → 峰值完缩回。",
    "options": {
      "A": "✓ 正确。可预测周期峰值的成本最佳解。",
      "B": "错。可预测负载下纯 On-Demand 通常更贵。",
      "C": "错。DAX 加速读，写为主场景不对症。",
      "D": "错。DAX + On-Demand 更贵。"
    },
    "diagram_before": "flowchart TB\n  APP[\"应用\"] --> DDB[\"DynamoDB<br/>尖峰预留过量\"]\n  X{{\"平时浪费<br/>峰值不足风险\"}}\n  DDB -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart LR\n  APP[\"应用\"] --> DDB[\"DynamoDB\"]\n  RC[\"Reserved Capacity<br/>扛平均\"] -.-> DDB\n  AS[\"Auto Scaling WCU<br/>扛峰值\"] -.-> DDB\n"
  },
  "42": {
    "blocker": "媒体处理：上传后排队，上班高峰，每档最多处理 1 小时。要成本效益迁移，唔能用 15 分钟就 timeout 的模型硬撑。",
    "requirements": "长时间任务用 EC2/ASG + 伫列；储存用 S3。",
    "steps": [
      "上传档案到 S3，讯息进 SQS。",
      "Auto Scaling EC2 依伫列深度扩展处理。",
      "处理结果写回 S3。",
      "下班伫列清空后 ASG 缩容悭钱。"
    ],
    "solutions": "正确答案是 D。SQS + ASG EC2 适合最长 1 小时任务，比 Lambda 更合适。",
    "result_flow": "上传 → S3/SQS → ASG Worker 最长 1 小时处理 → 结果 S3；高峰扩、低峰缩。",
    "options": {
      "A": "错。Lambda 上限 15 分钟，撑唔到 1 小时。",
      "B": "错。Amazon MQ 通常贵过 SQS；每次开关机效率差。",
      "C": "错。Lambda 同样有时限问题。",
      "D": "✓ 正确。伫列 + 弹性 EC2 最划算。"
    },
    "diagram_before": "flowchart TB\n  UP[\"上传档案\"] --> JOB[\"最长 1 小时任务\"]\n  X{{\"Lambda 15 分上限<br/>不适合\"}}\n  JOB -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart LR\n  UP[\"上传\"] --> S3[\"S3\"]\n  S3 --> SQS[\"SQS\"]\n  SQS --> ASG[\"ASG Worker EC2<br/>最长 1 小时\"]\n  ASG --> OUT[\"结果 → S3\"]\n"
  },
  "43": {
    "blocker": "OpenSearch 只分析约 1 个月热资料，但原始输入要法规长期留存，持续成本太高。",
    "requirements": "热节点精简 + UltraWarm 降温 + 原始档进超便宜归档。",
    "steps": [
      "减少 data nodes，加入 UltraWarm 节点。",
      "旧索引自动转移到 UltraWarm。",
      "输入资料用 S3 Lifecycle 转 Glacier Deep Archive。",
      "保持可查 1 个月分析窗口，同时合规保留原始档。"
    ],
    "solutions": "正确答案是 B。精简 data nodes + UltraWarm + Deep Archive 系标准降本组合。",
    "result_flow": "新资料写 data nodes → 转 UltraWarm 分析/低成本存放 → 原始输入 S3 → Lifecycle → Deep Archive。",
    "options": {
      "A": "错。全部 UltraWarm 难满足写入/索引效能。",
      "B": "✓ 正确。兼顾分析、成本与法规。",
      "C": "错。删 S3 输入违反保留；cold 策略描述亦不完整。",
      "D": "错。未真正降本，且过早 Glacier 影响载入。"
    },
    "diagram_before": "flowchart TB\n  IN[\"日志/搜寻资料\"] --> OS[\"OpenSearch\"]\n  OS --> HOT[\"全 hot data nodes\"]\n  X{{\"储存成本过高\"}}\n  HOT -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  IN[\"新资料\"] --> HOT[\"精简 data nodes\"]\n  HOT --> UW[\"UltraWarm\"]\n  RAW[\"原始输入\"] --> S3[\"S3\"]\n  S3 -->|Lifecycle| DA[\"Glacier Deep Archive\"]\n"
  },
  "44": {
    "blocker": "NonProd OU 唔准开来源 0.0.0.0/0 的安全群组入站规则，想最低营运开销、事前阻挡。",
    "requirements": "用组织 SCP 直接拒绝违规 API，而唔系事后救火。",
    "steps": [
      "撰写 SCP：当入站来源系 0.0.0.0/0 时 deny 相关 AuthorizeSecurityGroupIngress。",
      "把 SCP 挂到 NonProd OU。",
      "开发者尝试开全世界通行规则会被拒。",
      "无需每帐户装 Lambda/Config 补救。"
    ],
    "solutions": "正确答案是 D。SCP Deny 事前拦截，营运最轻。",
    "result_flow": "NonProd 帐户呼叫开 0.0.0.0/0 入站 → Organizations SCP 拒绝 → 规则建立失败。",
    "options": {
      "A": "错。EventBridge + Lambda 事后改，窗口期有风险且重。",
      "B": "错。Config 多为侦测，未必即时阻止。",
      "C": "错。Allow 条件写法通常不如明确 Deny 干净。",
      "D": "✓ 正确。OU 级 SCP Deny 最低开销。"
    },
    "diagram_before": "flowchart TB\n  NP[\"NonProd 帐户\"] --> SG[\"安全群组\"]\n  X{{\"可能开<br/>0.0.0.0/0 入站\"}}\n  SG -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart LR\n  NP[\"NonProd\"] -->|开 0.0.0.0/0| DENY[\"Organizations SCP<br/>Deny\"]\n  DENY -->|\"建立失败\"| NP\n  OK[\"合规规则\"] --> SG[\"安全群组\"]\n"
  },
  "45": {
    "blocker": "Git Webhook 而家 EC2 + ALB，想改 serverless、最低营运。",
    "requirements": "HTTP 入口 + 每条 webhook 一个函数处理。",
    "steps": [
      "建 API Gateway HTTP API 做统一入口。",
      "每个 Webhook 对应 Lambda。",
      "Git 伺服器改指 API Gateway URL。",
      "退役 EC2/ALB。"
    ],
    "solutions": "正确答案是 B。HTTP API + Lambda 系 Webhook 无伺服器标准。",
    "result_flow": "Git 事件 → API Gateway → 对应 Lambda 处理 → 完成；无伺服器常驻。",
    "options": {
      "A": "错。每个 Webhook 各自 Function URL 管理散乱。",
      "B": "✓ 正确。统一入口、好扩展。",
      "C": "错。App Runner + ALB 仍偏重。",
      "D": "错。ECS Fargate + API Gateway 过复杂。"
    },
    "diagram_before": "flowchart TB\n  GIT[\"Git 平台\"] --> WH[\"Webhook 事件\"]\n  WH --> HANDLER[\"处理逻辑\"]\n  X{{\"要无伺服器<br/>webhook\"}}\n  HANDLER -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart LR\n  GIT[\"Git 事件\"] --> APIG[\"API Gateway<br/>HTTP API\"]\n  APIG --> L[\"对应 Lambda\"]\n  L --> DONE[\"处理完成\"]\n"
  },
  "46": {
    "blocker": "要迁 1000 台 VMware，先收集系统指标、分组应用、仲要用 SQL 式查询分析资料。",
    "requirements": "Agent 深度收集 + Migration Hub 汇出 + Athena 查询。",
    "steps": [
      "每台装 Application Discovery Agent。",
      "开 Migration Hub Data Exploration，资料进 S3。",
      "用 Athena 跑分析查询。",
      "依结果分波迁移。"
    ],
    "solutions": "正确答案是 D。Discovery Agent + Migration Hub + Athena 系大型迁移评估标准流。",
    "result_flow": "1000 伺服器 Agent → Migration Hub/S3 → Athena 查询分组与依赖 → 迁移计划。",
    "options": {
      "A": "错。Agentless 细节通常不如 Agent。",
      "B": "错。手动汇出唔完整。",
      "C": "错。put-resource-attributes 非标准探索主路径。",
      "D": "✓ 正确。可规模化收集与分析。"
    },
    "diagram_before": "flowchart TB\n  SRV[\"约 1000 伺服器\"] --> DEP[\"应用依赖\"]\n  DEP --> PLAN[\"迁移评估\"]\n  X{{\"缺大规模<br/>盘点分析\"}}\n  PLAN -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart LR\n  AGENT[\"Discovery Agent<br/>×1000\"] --> MH[\"Migration Hub / S3\"]\n  MH --> ATH[\"Athena 查询\"]\n  ATH --> PLAN[\"分组依赖<br/>迁移计划\"]\n"
  },
  "47": {
    "blocker": "VPC 内 Lambda 要呼叫只接受固定公有 IPv4 白名单的外部服务。",
    "requirements": "出站走 NAT Gateway + Elastic IP，令来源 IP 固定。",
    "steps": [
      "在公有子网路部署 NAT Gateway 并绑 EIP。",
      "Lambda 放私有子网路，预设路由指 NAT。",
      "外部服务只 allow 该 EIP。",
      "Lambda 出站呈现固定公网 IP。"
    ],
    "solutions": "正确答案是 A。NAT Gateway + EIP 系 VPC 资源固定出站 IP 标准。",
    "result_flow": "Lambda（私有）→ NAT Gateway（EIP）→ 互联网外部 API（白名单命中）。",
    "options": {
      "A": "✓ 正确。固定出站 IP。",
      "B": "错。Egress-only IGW 只服务 IPv6。",
      "C": "错。Lambda 唔能直接「用 IGW」咁简单出站。",
      "D": "错。IGW 模型唔系私有 Lambda 固定 IP 解法。"
    },
    "diagram_before": "flowchart TB\n  L[\"Lambda\"] --> API[\"外部 API<br/>要固定 IP 白名单\"]\n  X{{\"出站 IP 不固定\"}}\n  L -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart LR\n  L[\"Lambda<br/>私有子网\"] --> NAT[\"NAT Gateway\"]\n  NAT --> EIP[\"Elastic IP<br/>固定出站\"]\n  EIP --> API[\"外部 API<br/>白名单命中\"]\n"
  },
  "48": {
    "blocker": "Lambda 打 Aurora 高峰开太多 DB 连线，效能差。选两步骤。",
    "requirements": "连线池代理 + 连线物件重用。",
    "steps": [
      "部署 RDS Proxy，指向 Aurora Reader（读多场景）。",
      "Lambda 改连 Proxy 端点。",
      "把 DB 连线初始化移出 handler，跨呼叫重用。",
      "观察连线数与延迟下降。"
    ],
    "solutions": "正确答案是 B + D。RDS Proxy 管池；handler 外重用连线系 Lambda 最佳实践。",
    "result_flow": "大量 Lambda 并发 → RDS Proxy 连线池 → Aurora Reader；单实例内连线重用减少握手。",
    "options": {
      "A": "错。Cluster/Writer 端点唔适合读密集。",
      "B": "✓ 正确。Proxy 缓解连线风暴。",
      "C": "错。Provisioned Concurrency 解冷启动，非连线爆炸。",
      "D": "✓ 正确。连线放 handler 外重用。",
      "E": "错。Edge-optimized API 同 DB 连线无关。"
    },
    "diagram_before": "flowchart TB\n  L[\"大量 Lambda 并发\"] --> AUR[\"Aurora\"]\n  X{{\"连线数爆<br/>握手过重\"}}\n  L -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart LR\n  L[\"Lambda 并发\"] --> PROXY[\"RDS Proxy<br/>连线池\"]\n  PROXY --> R[\"Aurora Reader\"]\n  L -.->|handler 外重用| CONN[\"连线重用\"]\n"
  },
  "49": {
    "blocker": "要客户端到 Web 伺服器全程加密（end-to-end in transit），唔系只加密到负载平衡器就明文入内网。",
    "requirements": "ALB 终止 TLS 后要再以 HTTPS 打后端；ALB 用 ACM，后端用可安装嘅凭证。",
    "steps": [
      "ACM 凭证绑 ALB HTTPS 监听器。",
      "在 EC2 安装第三方/可汇出 SSL 凭证。",
      "ALB 以 HTTPS 转发到实例 443。",
      "用户到 ALB、ALB 到 EC2 都系加密。"
    ],
    "solutions": "正确答案是 C。ALB TLS 终止 + 后端再加密；ACM 私钥唔能汇出到 EC2。",
    "result_flow": "浏览器 HTTPS → ALB（ACM）→ HTTPS → EC2（第三方凭证）→ 应用。",
    "options": {
      "A": "错。ACM 凭证唔能汇出装上 EC2。",
      "B": "错。CloudFront 唔能用 Target Group 当 origin 咁配。",
      "C": "✓ 正确。端到端加密正确拆分凭证。",
      "D": "错。NLB 不终止 TLS 的模式难满足题述 ALB 灵活路由需求。"
    },
    "diagram_before": "flowchart TB\n  B[\"浏览器 HTTPS\"] --> ALB[\"ALB\"]\n  ALB --> EC2[\"EC2 要再加密\"]\n  X{{\"ACM 私钥<br/>不能汇出到 EC2\"}}\n  EC2 -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart LR\n  B[\"浏览器\"] -->|HTTPS ACM| ALB[\"ALB TLS 终止\"]\n  ALB -->|HTTPS 再加密| EC2[\"EC2<br/>第三方凭证\"]\n  EC2 --> APP[\"应用\"]\n"
  },
  "50": {
    "blocker": "分析平台要迁 AWS，要零停机、解决载入失败、聚合作业可打读取副本。",
    "requirements": "DMS 持续复写 + 读写分离 + 连线管理。",
    "steps": [
      "用 DMS 持续复写到 Aurora。",
      "聚合查询打 Aurora Replica。",
      "收集端用 Lambda + ALB。",
      "写入经 RDS Proxy；切换后停 DMS。"
    ],
    "solutions": "正确答案是 C。DMS + Replica 读分离 + RDS Proxy 系零停机迁移佳实践。",
    "result_flow": "地端 → DMS 持续同步 Aurora → 应用渐切；聚合读 Replica；写入经 Proxy；完成后断 DMS。",
    "options": {
      "A": "错。用 Replica 当 DMS 目标等描述不标准。",
      "B": "错。聚合打主库会加重载入问题。",
      "C": "✓ 正确。复写、读写分离、连线管理齐。",
      "D": "错。Kinesis 增加无谓复杂度。"
    },
    "diagram_before": "flowchart TB\n  ONP[\"地端资料库\"] --> APP[\"应用\"]\n  X{{\"要迁 Aurora<br/>接近零停机\"}}\n  ONP -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  ONP[\"地端 DB\"] -->|DMS 持续同步| AUR[\"Aurora\"]\n  APP[\"应用\"] --> PROXY[\"RDS Proxy\"]\n  PROXY -->|写| AUR\n  APP -->|聚合读| RR[\"Aurora Replica\"]\n  AUR --> RR\n"
  },
  "51": {
    "blocker": "S3 物件要改用客户管理 KMS 金钥（SSE-KMS）加密，桶未开版本控制，旧物件唔会自动变加密方式。",
    "requirements": "新物件预设 SSE-KMS；旧物件要重写；政策拒绝未加密上传。",
    "steps": [
      "桶预设加密改 SSE-KMS（CMK）。",
      "Bucket Policy 拒绝无 KMS 加密的 PutObject。",
      "用 CLI/批次把既有物件 copy 自身以重新加密。",
      "验证新旧物件都系 SSE-KMS。"
    ],
    "solutions": "正确答案是 B。预设加密 + 重新上传/重写 + 政策强制。",
    "result_flow": "新上传自动 SSE-KMS → 旧物件 rewrite 成 SSE-KMS → 违规未加密上传被政策拒。",
    "options": {
      "A": "错。SSE-S3 唔系客户管理 KMS 金钥。",
      "B": "✓ 正确。迁移加密标准流程。",
      "C": "错。Get/Put 唔会魔法加密旧物件。",
      "D": "错。描述混淆 SSE-S3 与 SSE-KMS。"
    },
    "diagram_before": "flowchart TB\n  UP[\"上传者\"] --> S3[\"S3 桶\"]\n  S3 --> MIX[\"混杂加密状态\"]\n  X{{\"要全数 SSE-KMS<br/>拒未加密上传\"}}\n  MIX -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  NEW[\"新上传\"] --> DEF[\"预设 SSE-KMS\"]\n  OLD[\"旧物件\"] --> RW[\"Rewrite 加密\"]\n  POL[\"桶政策强制\"] -->|\"拒未加密\"| DENY[\"上传失败\"]\n  DEF --> S3[\"S3 全加密\"]\n  RW --> S3\n"
  },
  "52": {
    "blocker": "CloudFront + ALB + ASG 要高可用容错，跨 Region，营运开销要低。",
    "requirements": "备援 Region 完整堆叠 + CloudFront Origin Group 自动切来源。",
    "steps": [
      "在备援 Region 部署 ALB + ASG + EC2。",
      "CloudFront 设 Origin Group：主/备 ALB。",
      "主 origin 健康检查失败自动改打备援。",
      "无需额外在前面再叠一层复杂 DNS 方案。"
    ],
    "solutions": "正确答案是 B。CloudFront Origin Group 系 CDN 层 failover 最低营运做法。",
    "result_flow": "用户 → CloudFront → 主 Region ALB；主挂 → 自动 → 备援 Region ALB/ASG。",
    "options": {
      "A": "错。CloudFront 前再加 Route 53 Failover 多余复杂。",
      "B": "✓ 正确。Origin Group 原生故障转移。",
      "C": "错。ALB 唔支援跨 Region Target Group。",
      "D": "错。Global Accelerator 加成本且非必要。"
    },
    "diagram_before": "flowchart TB\n  U[\"用户\"] --> ALB1[\"主 Region ALB\"]\n  DR[\"备援 Region 架构\"]\n  U -.->|无 CDN 层 failover| DR\n  X{{\"主挂时 CDN/DNS<br/>无自动切换\"}}\n  ALB1 -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  U[\"用户\"] --> CF[\"CloudFront<br/>Origin Group\"]\n  CF -->|主| ALB1[\"主 Region ALB+ASG\"]\n  CF -.->|备| ALB2[\"备援 Region ALB+ASG\"]\n"
  },
  "53": {
    "blocker": "全球办公室内部 IP 范围要集中维护，畀多帐户安全群组引用，唔好每帐户人手改 CIDR。",
    "requirements": "Managed Prefix List + RAM 共享。",
    "steps": [
      "在 Transit/网路帐户建立 VPC Managed Prefix List。",
      "用 RAM 共享畀其他帐户。",
      "各帐户安全群组规则引用该 Prefix List。",
      "办公室 IP 变更只改一处清单。"
    ],
    "solutions": "正确答案是 C。Prefix List + RAM 系集中管理 IP 范围标准。",
    "result_flow": "更新 Prefix List → 已共享帐户的 SG 规则自动用新 CIDR → 办公室网段一致放行。",
    "options": {
      "A": "错。S3 JSON + SNS + Lambda 自维成本高。",
      "B": "错。Config 偏合规侦测，唔系集中 IP 清单。",
      "C": "✓ 正确。托管清单 + 共享。",
      "D": "错。安全群组唔能跨帐户嵌套引用对方 SG 嚟替代 Prefix List 方案。"
    },
    "diagram_before": "flowchart TB\n  OFF[\"多办公室 IP\"]\n  SG[\"多帐户安全群组\"]\n  X{{\"IP 范围分散<br/>难集中更新\"}}\n  OFF -.-> X\n  SG -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart LR\n  NET[\"网路帐户\"] --> PL[\"Managed Prefix List\"]\n  PL -->|RAM 共享| ACC[\"其他帐户 SG\"]\n  OFF[\"办公室 IP 变更\"] --> PL\n  PL -->|\"自动生效\"| ACC\n"
  },
  "54": {
    "blocker": "每两周要出一份 Lambda 记忆体/成本建议 CSV 存 S3，开发时间要最短。",
    "requirements": "用 Compute Optimizer 现成汇出 API，再排程。",
    "steps": [
      "启用 AWS Compute Optimizer。",
      "写小 Lambda 呼叫 ExportLambdaFunctionRecommendations。",
      "把 CSV 汇到 S3。",
      "EventBridge 每两周触发一次。"
    ],
    "solutions": "正确答案是 B。Compute Optimizer 汇出 API 开发量最小。",
    "result_flow": "每 2 周 EventBridge → Lambda → Export 建议 CSV → S3 报告桶。",
    "options": {
      "A": "错。自己从 Logs 抽指标开发长。",
      "B": "✓ 正确。官方建议直接汇出。",
      "C": "错。主控台排程灵活性与自动化通常不如 API。",
      "D": "错。Trusted Advisor 无此 Lambda 记忆体建议汇出。"
    },
    "diagram_before": "flowchart TB\n  L[\"大量 Lambda\"] --> PERF[\"效能/成本未知\"]\n  PERF --> RPT[\"需要定期报告\"]\n  X{{\"要自动汇出<br/>优化建议\"}}\n  RPT -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart LR\n  EB[\"EventBridge<br/>每 2 周\"] --> FN[\"Lambda\"]\n  FN --> CO[\"Compute Optimizer<br/>Export API\"]\n  CO --> S3[\"S3 CSV 报告\"]\n"
  },
  "55": {
    "blocker": "要按应用与团队标签分析成本，要 12 个月历史比较同未来预测。选三个动作。",
    "requirements": "启用成本分配标签 + Cost Categories + Cost Explorer。",
    "steps": [
      "启用 application/team 使用者定义成本分配标签。",
      "建立 Cost Categories 按应用分组。",
      "启用 Cost Explorer 做历史与预测。",
      "用标签与类别出比较报表。"
    ],
    "solutions": "正确答案是 A + C + F。标签启用、Cost Categories、Cost Explorer 三者齐。",
    "result_flow": "资源打标 → 启用分配标签 → Categories 分组 → Cost Explorer 睇 12 个月与预测。",
    "options": {
      "A": "✓ 正确。自订标签要启用先至入成本报告。",
      "B": "错。AWS 产生标签唔包含你自订 application/team。",
      "C": "✓ 正确。Categories 方便按应用汇总。",
      "D": "错。IAM 睇帐单权限唔等于有分析能力。",
      "E": "错。Budget 系告警唔系历史分析主力。",
      "F": "✓ 正确。Cost Explorer 历史 + 预测。"
    },
    "diagram_before": "flowchart TB\n  RES[\"多应用资源\"] --> TAG[\"application/team 标签\"]\n  TAG --> COST[\"成本视图\"]\n  X{{\"缺 12 个月分析<br/>与预测\"}}\n  COST -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  TAG[\"资源标签<br/>application/team\"] --> ACT[\"启用成本分配标签\"]\n  ACT --> CAT[\"Cost Categories\"]\n  CAT --> CE[\"Cost Explorer<br/>历史 + 预测\"]\n"
  },
  "56": {
    "blocker": "私有子网路 EC2 经 NAT 打第三方 API，对方只接受单一公有 CIDR 白名单（公司自有网段）。",
    "requirements": "把自有公网 IP（BYOIP）带入 AWS，绑去 NAT 的 EIP。",
    "steps": [
      "在 AWS 注册 BYOIP 公有 IP 区块。",
      "从该区块配置 EIP。",
      "把 EIP 指派给 NAT Gateway。",
      "出站流量来源落入对方 allow list CIDR。"
    ],
    "solutions": "正确答案是 B。BYOIP + NAT EIP 先至保证出站 IP 落在既有白名单。",
    "result_flow": "私有 EC2 → NAT（BYOIP EIP）→ 第三方 API（CIDR 白名单命中）。",
    "options": {
      "A": "错。IP 关联到 VPC 唔等于 NAT 用𠮶啲 IP 出站。",
      "B": "✓ 正确。BYOIP 给 NAT 固定落白名单。",
      "C": "错。ALB IP 系入站用。",
      "D": "错。Global Accelerator 偏入站加速。"
    },
    "diagram_before": "flowchart TB\n  EC2[\"私有 EC2\"] --> API[\"第三方 API<br/>既有 CIDR 白名单\"]\n  X{{\"出站 IP<br/>不在白名单\"}}\n  EC2 -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart LR\n  EC2[\"私有 EC2\"] --> NAT[\"NAT Gateway\"]\n  NAT --> EIP[\"BYOIP EIP<br/>自家公网段\"]\n  EIP --> API[\"第三方 API<br/>白名单命中\"]\n"
  },
  "57": {
    "blocker": "SCP 允许所有动作并只 Deny CloudTrail，但开发者仍无法 CreateBucket。",
    "requirements": "理解 SCP 只系权限边界、唔会授予权限；需在帐户 IAM 身份上明确允许 S3。",
    "steps": [
      "确认 SCP 并未 deny S3。",
      "检查开发者 IAM 使用者/角色是否有 s3:CreateBucket 等权限。",
      "在 IAM 补上所需 S3 权限。",
      "重试建立储存桶。"
    ],
    "solutions": "正确答案是 C。题目 SCP：Allow * + Deny cloudtrail:*，并未挡 s3:CreateBucket；SCP 亦唔会「授予」权限。开发者 IAM 使用者/角色本身缺 S3 权限，要补上。",
    "result_flow": "开发者 CreateBucket → IAM 允许 → SCP 未拒绝 → 成功；缺任一层都失败。",
    "options": {
      "A": "错。SCP 已 Allow *，再加 s3:CreateBucket Allow 无解决 IAM 缺权问题；且 SCP Allow 唔等于授予使用者权限。",
      "B": "错。把帐户移出 OU / 改挂 SCP 唔能补 IAM 权限。",
      "C": "✓ 正确。在开发者 IAM 实体加上 Amazon S3（含 CreateBucket）权限。",
      "D": "错。SCP 并非挡 S3 的原因，移除 SCP 亦唔会自动给 IAM 权限。"
    },
    "diagram_before": "flowchart TB\n  DEV[\"开发者\"] -->|CreateBucket| S3[\"S3\"]\n  SCP[\"SCP 组织政策<br/>已允许\"]\n  DEV -.->|仍缺身份权限| IAM[\"帐户 IAM 未允许\"]\n  SCP -.-> S3\n  X{{\"失败原因: 有 SCP 通过<br/>但仍缺 IAM 权限\"}}\n  DEV -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart LR\n  DEV[\"开发者\"] --> IAM[\"IAM 允许<br/>s3:CreateBucket\"]\n  IAM --> SCP[\"SCP 未拒绝\"]\n  SCP --> OK[\"建立桶成功\"]\n"
  },
  "58": {
    "blocker": "冇 SSH 金钥，应用又要持续服务，要将加密 EBS 上资料备份到 S3。",
    "requirements": "用 Session Manager 免 SSH 登入，IAM Role 写 S3，唔好重启做映像。",
    "steps": [
      "给实例 IAM Role 授 S3 写入。",
      "确保 SSM Agent 正常，用 Session Manager 进入。",
      "在系统内执行备份命令把资料同步到 S3。",
      "全程无需 SSH 金钥、无需为备份而停机做 AMI。"
    ],
    "solutions": "正确答案是 A。Session Manager + 实例角色写 S3 系无金钥、不停机备份路径。",
    "result_flow": "管理员 → Session Manager → EC2（持续跑应用）→ 用角色凭证 → 资料上传 S3。",
    "options": {
      "A": "✓ 正确。无 SSH、唔影响服务。",
      "B": "错。整映像可能要重启，违持续服务。",
      "C": "错。DLM snapshot 系磁碟快照，非题述档案级备份到 S3 的同一解法。",
      "D": "错。建映像有服务中断风险。"
    },
    "diagram_before": "flowchart TB\n  APP[\"生产应用\"] --> EC2[\"EC2 持续运行\"]\n  EC2 --> DATA[\"本机资料\"]\n  X{{\"要备份到 S3<br/>无金钥不停机\"}}\n  DATA -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart LR\n  ADM[\"管理员\"] --> SSM[\"Session Manager\"]\n  SSM --> EC2[\"EC2 持续运行\"]\n  EC2 -->|实例角色| S3[\"S3 备份\"]\n"
  },
  "59": {
    "blocker": "要用 AWS CLI 跨帐户把 S3 资料从来源桶抄到目的地桶。选三步骤。",
    "requirements": "来源桶政策准目的地读；目的地身分有读来源+写目的地；用目的地帐户身份跑 sync。",
    "steps": [
      "在来源桶 Bucket Policy 允许目的地帐户读取/列出。",
      "在目的地帐户 IAM 允许读来源与写入目的地。",
      "以目的地帐户使用者执行 aws s3 sync。",
      "验证物件完整出现在目的地桶。"
    ],
    "solutions": "正确答案是 B + D + F。资源政策 + 目的地 IAM + 目的地身份执行 sync。",
    "result_flow": "目的地使用者 sync → 读来源（桶政策+IAM）→ 写目的地（IAM）→ 复制完成。",
    "options": {
      "A": "错。应在来源桶授权读，唔系搞错方向。",
      "B": "✓ 正确。来源 Bucket Policy 准目的地读。",
      "C": "错。只靠来源帐户 IAM 难完整跨帐户写入目的地。",
      "D": "✓ 正确。目的地 IAM 要读来源+写目的地。",
      "E": "错。应用目的地帐户身份执行。",
      "F": "✓ 正确。目的地使用者跑 sync。"
    },
    "diagram_before": "flowchart TB\n  SRC[\"来源帐户 S3\"]\n  DST[\"目的地帐户\"]\n  SRC -.->|跨帐户 sync 未齐权限| DST\n  X{{\"缺口: 跨帐户<br/>复制/同步权限未齐\"}}\n  DST -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart LR\n  USER[\"目的地使用者\"] -->|s3 sync| SRC[\"来源桶<br/>Bucket Policy 读\"]\n  USER --> DST[\"目的地桶<br/>IAM 写入\"]\n  SRC --> DST\n"
  },
  "60": {
    "blocker": "CloudFormation 部署的 Lambda 要支援金丝雀发布（先小流量再全量）。",
    "requirements": "用 Lambda Alias + routing-config 渐进切流量。",
    "steps": [
      "发布新 Lambda 版本。",
      "Alias 指向版本并设定流量权重。",
      "用 update-alias --routing-config 逐步加大新版本比例。",
      "观察指标后全量或回滚。"
    ],
    "solutions": "正确答案是 A。Alias + routing-config 系 Lambda 金丝雀标准机制。",
    "result_flow": "请求打 Alias → 例如 10% 新版本 / 90% 旧版本 → 逐步调整 → 全量新版本。",
    "options": {
      "A": "✓ 正确。原生流量分割。",
      "B": "错。Route 53 权重在 DNS 层太粗。",
      "C": "错。update-function-configuration 无 routing-config。",
      "D": "错。OneAtATime 系 EC2/CodeDeploy 配置，非 Lambda 金丝雀。"
    },
    "diagram_before": "flowchart TB\n  REQ[\"生产流量\"] --> L[\"Lambda\"]\n  L --> NEW[\"新版本\"]\n  X{{\"要金丝雀<br/>逐步放量\"}}\n  NEW -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  REQ[\"请求\"] --> ALIAS[\"Lambda Alias<br/>routing-config\"]\n  ALIAS -->|\"10%\"| NEW[\"新版本\"]\n  ALIAS -->|\"90%\"| OLD[\"旧版本\"]\n  NEW -.->|逐步 100%| ALIAS\n"
  },
  "61": {
    "blocker": "地端 SFTP 收第三方档后用 cron 搬去 S3，可靠度与扩展性差。",
    "requirements": "改用托管 SFTP 直接写 S3。",
    "steps": [
      "建立 AWS Transfer Family SFTP 伺服器。",
      "后端对接 S3 桶。",
      "Route 53 指到 Transfer 端点。",
      "第三方改连新 SFTP，档案直达 S3。"
    ],
    "solutions": "正确答案是 B。Transfer Family 托管 SFTP，原生 S3，免自管伺服器。",
    "result_flow": "第三方 SFTP 客户端 → Transfer Family → 直接存 S3；无 cron 搬档单点。",
    "options": {
      "A": "错。ALB 唔支援 SFTP 协定。",
      "B": "✓ 正确。托管、可扩展、可靠。",
      "C": "错。Storage Gateway 唔系 SFTP 介面替代。",
      "D": "错。NLB+EC2 仍要自维 SFTP。"
    },
    "diagram_before": "flowchart TB\n  PART[\"第三方 SFTP\"] --> EC2[\"自管 SFTP<br/>+ cron 搬 S3\"]\n  X{{\"单点故障<br/>营运重\"}}\n  EC2 -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart LR\n  PART[\"第三方 SFTP 客户端\"] --> TF[\"Transfer Family<br/>SFTP\"]\n  TF --> S3[\"S3 直接存\"]\n  R53[\"Route 53\"] --> TF\n"
  },
  "62": {
    "blocker": "VMware 虚拟机要迁 EC2，并保留软体与组态。",
    "requirements": "OVF 汇出 + VM Import/Export。",
    "steps": [
      "在 vSphere 汇出 OVF/OVA。",
      "上传到 S3。",
      "设定 VM Import 所需 IAM 角色。",
      "用 CLI ec2 import-image/import-instance 汇入成 EC2。"
    ],
    "solutions": "正确答案是 B。OVF + VM Import/Export 保留完整 VM 组态上 EC2。",
    "result_flow": "VMware VM → 汇出 OVF → S3 → VM Import → EC2 AMI/实例 → 启动即用。",
    "options": {
      "A": "错。DataSync/FSx 系档案同步非整机迁移。",
      "B": "✓ 正确。标准 VM 汇入路径。",
      "C": "错。Storage Gateway 唔适合整机。",
      "D": "错。SSM+Backup 路径迂回非标准。"
    },
    "diagram_before": "flowchart TB\n  VSP[\"vSphere\"] --> VM[\"VMware VM\"]\n  VM --> CFG[\"完整 OS/组态\"]\n  X{{\"要保留组态<br/>上 EC2\"}}\n  CFG -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart LR\n  VM[\"VMware\"] --> OVF[\"汇出 OVF/OVA\"]\n  OVF --> S3[\"S3\"]\n  S3 --> IMP[\"VM Import/Export\"]\n  IMP --> EC2[\"EC2 AMI / 实例\"]\n"
  },
  "63": {
    "blocker": "图片变大后 Lambda 经常 timeout，且已设到最大 15 分钟；公司又不想管理底层基础设施。",
    "requirements": "把长时间影像处理迁出 Lambda 硬上限；用无伺服器容器（Fargate）避免自管 EC2；仍可用短生命周期 Lambda 只负责触发任务。",
    "steps": [
      "把 Node.js 处理逻辑做成 Docker 映像并推上 Amazon ECR。",
      "建立 ECS 任务定义，相容类型选 AWS Fargate，引用 ECR 映像。",
      "保留 S3 事件触发的 Lambda，但只负责启动 ECS 任务（RunTask），不再在 Lambda 内做重处理。",
      "在 Fargate 任务中完成下载、转换、写回 S3 与更新 DynamoDB。"
    ],
    "solutions": "正确答案是 A + B。A 提供可在 ECS 执行的容器映像；B 用 Fargate 跑长时间任务并符合「不管理基础设施」。PDF/ExamTopics 曾标 DE，与题干冲突，已改为社群共识 AB。",
    "result_flow": "S3 上传 → 短时 Lambda 触发 → ECS on Fargate 长时间处理 → 结果写第二个 S3 → DynamoDB 更新 metadata。",
    "options": {
      "A": "✓ 正确。容器化并推 ECR，是 ECS/Fargate 执行的前提。",
      "B": "✓ 正确。Fargate 无 15 分钟硬限，且无需管理 EC2 丛集，符合题干。",
      "C": "错。Step Functions Parallel 与预留并发都无法突破单一 Lambda 15 分钟上限。",
      "D": "错。ECS on EC2 要管理/扩缩计算节点，违反「不想管理底层基础设施」。",
      "E": "错。EFS + RDS 挂载仍跑在 Lambda 上，timeout 问题依旧；也不必把已可用的 DynamoDB 换成 RDS。"
    },
    "diagram_before": "flowchart TB\n  S3[\"S3 上传图片\"] --> L[\"Lambda<br/>已达 15 分上限\"]\n  X{{\"timeout<br/>呼叫失败\"}}\n  L -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  S3[\"S3 上传\"] -->|事件| L[\"Lambda<br/>只 RunTask\"]\n  L -->|启动| ECS[\"ECS on Fargate<br/>长时间处理\"]\n  ECS --> OUT[\"S3 结果\"]\n  ECS --> DDB[\"DynamoDB metadata\"]\n"
  },
  "64": {
    "blocker": "Control Tower 环境要侦测 Production OU 里未加密的 RDS。",
    "requirements": "用 Control Tower 预建 strongly recommended guardrail，而非自建一堆规则。",
    "steps": [
      "在 Control Tower 启用 strongly recommended guardrails。",
      "套用到 Production OU。",
      "侦测未开加密的 RDS。",
      "依告警/合规状态修复。"
    ],
    "solutions": "正确答案是 B。Strongly recommended guardrail 含 RDS 静态加密检查。",
    "result_flow": "Production 帐户建未加密 RDS → Control Tower guardrail/Config 侦测 → 合规仪表板显示不合格。",
    "options": {
      "A": "错。Mandatory guardrails 系基础必备集，唔系呢条 RDS 加密侦测。",
      "B": "✓ 正确。强烈建议防护栏含加密检查。",
      "C": "错。自订 Config 增加营运，非 Control Tower 首选整合。",
      "D": "错。SCP 难侦测「已存在资源是否加密」。"
    },
    "diagram_before": "flowchart TB\n  PROD[\"Production 帐户\"] --> RDS[\"RDS 可能未加密\"]\n  X{{\"缺组织级<br/>加密合规侦测\"}}\n  RDS -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart LR\n  CT[\"Control Tower<br/>strongly recommended\"] --> OU[\"Production OU\"]\n  OU --> CFG[\"Config / Guardrail\"]\n  CFG -->|\"未加密 RDS\"| ALERT[\"合规不合格\"]\n"
  },
  "65": {
    "blocker": "工程师经 VPN SSH 入 EC2，22 埠暴露面大，稽核弱，要最小权限安全存取。",
    "requirements": "用 Session Manager 取代 SSH，关 22，命令可稽核。",
    "steps": [
      "实例角色附加 AmazonSSMManagedInstanceCore。",
      "安全群组移除 22 埠。",
      "工程师本机用 Session Manager plugin。",
      "aws ssm start-session 连入，动作可记日志。"
    ],
    "solutions": "正确答案是 D。Session Manager 系 AWS 推荐安全远端存取。",
    "result_flow": "工程师 →（VPN 可选）→ SSM start-session → EC2；无公开 22，session 可审计。",
    "options": {
      "A": "错。Instance Connect 仍要 22。",
      "B": "错。限制来源 IP 仍留 SSH 攻击面。",
      "C": "错。Config/Firewall Manager 未从根本取代 SSH。",
      "D": "✓ 正确。无 22、可稽核、最小权限。"
    },
    "diagram_before": "flowchart TB\n  ENG[\"工程师\"] -->|SSH 22| EC2[\"EC2 公开埠\"]\n  X{{\"金钥与暴露面<br/>安全风险\"}}\n  EC2 -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart LR\n  ENG[\"工程师\"] --> SSM[\"Session Manager\"]\n  SSM --> EC2[\"EC2<br/>无公开 22\"]\n  ROLE[\"SSM 实例角色\"] -.-> EC2\n  LOG[\"可审计 session\"] -.-> SSM\n"
  },
  "66": {
    "blocker": "开发者实验帐户要固定月预算、限制昂贵服务、超支要停服务。选三步骤。",
    "requirements": "Budgets + SCP 拒贵服务 + 告警驱动 Lambda 清理。",
    "steps": [
      "每个开发者帐户建 AWS Budgets 固定月预算。",
      "SCP 拒绝昂贵服务。",
      "预算告警经 SNS 触发 Lambda。",
      "Lambda 终止/停用超支资源。"
    ],
    "solutions": "正确答案是 B + C + F。预算、SCP、SNS+Lambda 自动化回应。",
    "result_flow": "开发者开资源 → SCP 挡贵服务 → 费用近上限 Budgets 告警 → SNS → Lambda 停服务。",
    "options": {
      "A": "错。SCP 设唔到金额用量上限。",
      "B": "✓ 正确。每帐户固定月预算。",
      "C": "✓ 正确。SCP 拒昂贵服务。",
      "D": "错。IAM 难全面跨服务且易被绕。",
      "E": "错。Budget 内建动作唔能万能终止所有服务。",
      "F": "✓ 正确。SNS + Lambda 自动化超支处理。"
    },
    "diagram_before": "flowchart TB\n  DEV[\"开发者帐户\"] --> SPEND[\"费用失控风险\"]\n  X{{\"缺预算+SCP<br/>+自动止血\"}}\n  SPEND -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  DEV[\"开发者开资源\"] --> SCP[\"SCP 挡贵服务\"]\n  DEV --> BUD[\"AWS Budgets\"]\n  BUD -->|近上限| SNS[\"SNS\"]\n  SNS --> L[\"Lambda<br/>停用超支资源\"]\n"
  },
  "67": {
    "blocker": "Lambda 同 Aurora 要跨帐户迁移，停机要最短。",
    "requirements": "Lambda 打包重建；Aurora 用 RAM 共享再 clone。",
    "steps": [
      "下载来源 Lambda 部署套件，在目标帐户重建函数。",
      "用 RAM 共享 Aurora 丛集。",
      "在目标帐户 clone 丛集。",
      "切换应用指向新帐户资源。"
    ],
    "solutions": "正确答案是 B。RAM 共享 Aurora + clone 停机最短；Lambda 重新部署套件。",
    "result_flow": "Lambda 套件 → 目标帐户重建；Aurora → RAM 共享 → clone → 应用切换，接近最短中断。",
    "options": {
      "A": "错。只靠 snapshot 共享通常停机/时间差过 RAM clone。",
      "B": "✓ 正确。最低停机组合。",
      "C": "错。Lambda 唔能靠 RAM 共享函数本身。",
      "D": "错。Snapshot 迁 Aurora 通常较慢。"
    },
    "diagram_before": "flowchart TB\n  SRC[\"来源帐户<br/>Lambda + Aurora\"]\n  DST[\"目标帐户\"]\n  X{{\"迁移要最短停机\"}}\n  SRC -.-> X\n  DST -.->|存在但未接上| X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  PKG[\"Lambda 套件\"] --> DST_L[\"目标帐户<br/>重建 Lambda\"]\n  AUR[\"Aurora\"] -->|RAM 共享| CLONE[\"目标帐户 clone\"]\n  CLONE --> APP[\"应用切换\"]\n  DST_L --> APP\n"
  },
  "68": {
    "blocker": "EC2 每 10 分钟处理 S3 档，平均 5 分钟，约 40% 时间闲置，想高可用可扩展又悭钱。",
    "requirements": "改事件驱动，有档先算钱。",
    "steps": [
      "开 S3 Event Notification。",
      "直接触发 Lambda 处理新物件。",
      "处理完写回结果。",
      "无档案时零运算成本。"
    ],
    "solutions": "正确答案是 A。S3 事件 + Lambda 消除闲置 EC2 成本。",
    "result_flow": "新档上传 S3 → 事件 → Lambda 处理 5 分钟级工作 → 完成；无轮询空转。",
    "options": {
      "A": "✓ 正确。按执行付费，自动扩展。",
      "B": "错。ASG min=1 仍有闲置费。",
      "C": "错。容器 EC2 仍有底成本。",
      "D": "错。Fargate + Lambda 触发过复杂。"
    },
    "diagram_before": "flowchart TB\n  S3[\"S3 新档\"] -.->|轮询| EC2[\"常驻 EC2\"]\n  X{{\"闲置成本高\"}}\n  EC2 -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart LR\n  S3[\"S3 上传\"] -->|事件| L[\"Lambda<br/>约 5 分钟处理\"]\n  L --> OUT[\"结果\"]\n  IDLE[\"无档案\"] -.->|零运算成本| L\n"
  },
  "69": {
    "blocker": "Web 在 us-east-1，us-west-1 做主动-被动 DR，要动态扩展。",
    "requirements": "两 Region 完整堆叠 + Route 53 Failover + Health Check。",
    "steps": [
      "两 Region 各部署 ALB + ASG 应用。",
      "Route 53 建 Failover 记录。",
      "Health Check 监控主 Region。",
      "主挂则 DNS 切到 us-west-1。"
    ],
    "solutions": "正确答案是 C。Failover routing 系主动-被动 DR 标准。",
    "result_flow": "用户 → Route 53 → 主 Region ALB/ASG；健康失败 → 备援 Region ALB/ASG。",
    "options": {
      "A": "错。跨 Region 单 ALB/Peering 模型不成立。",
      "B": "错。Separate records 唔系 Failover 策略。",
      "C": "✓ 正确。Health Check + Failover。",
      "D": "错。单一 ALB 唔能跨 Region。"
    },
    "diagram_before": "flowchart TB\n  U[\"用户\"] --> APP[\"单一 Region<br/>ALB + ASG\"]\n  X{{\"Region 故障<br/>无自动切换\"}}\n  APP -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  U[\"用户\"] --> R53[\"Route 53<br/>Failover\"]\n  R53 -->|主| E1[\"Region A<br/>ALB + ASG\"]\n  R53 -.->|备| E2[\"Region B<br/>ALB + ASG\"]\n  HC[\"Health Check\"] -.-> R53\n"
  },
  "70": {
    "blocker": "单一 AWS 帐户 IT 支援要用现有 AD 凭证登 Console，想最具成本效益。",
    "requirements": "AD Connector 比自建 Managed AD 平，配合 Identity Center。",
    "steps": [
      "Organizations 开全功能（如需要身份中心整合）。",
      "建 AD Connector 连地端 AD。",
      "Identity Center 以 AD 为身分来源。",
      "Permission Set 对应 AD 群组登入 Console。"
    ],
    "solutions": "正确答案是 D。AD Connector + Identity Center 成本低于 Managed Microsoft AD。",
    "result_flow": "支援人员 AD 登入 → AD Connector/Identity Center → Permission Set → 帐户 Console。",
    "options": {
      "A": "错。Managed Microsoft AD 较贵。",
      "B": "错。未正确开 Organizations 全功能等前置。",
      "C": "错。Managed AD 非最悭。",
      "D": "✓ 正确。连接现有 AD 最平。"
    },
    "diagram_before": "flowchart TB\n  AD[\"现有 AD\"]\n  IT[\"IT 支援要登 Console\"]\n  X{{\"要最具成本效益<br/>联合登入\"}}\n  AD -.-> X\n  IT -.->|存在但未接上| X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart LR\n  AD[\"地端 AD\"] --> ADC[\"AD Connector\"]\n  ADC --> IC[\"IAM Identity Center\"]\n  IC --> PS[\"Permission Set\"]\n  PS --> CON[\"帐户 Console\"]\n"
  },
  "71": {
    "blocker": "澳洲用户上传 1–10GB 到 us-east-1 S3 又慢又易失败。选两个方案。",
    "requirements": "边缘加速上传 + 分段上传提升可靠。",
    "steps": [
      "桶启用 S3 Transfer Acceleration，App 用加速端点。",
      "应用把大档切块做 Multipart Upload。",
      "失败可重传单一 part。",
      "整体完成时间与成功率提升。"
    ],
    "solutions": "正确答案是 A + D。Transfer Acceleration + Multipart Upload。",
    "result_flow": "澳洲 App → 就近边缘 → 加速网路到 us-east-1 S3；档案分 part 上传合并。",
    "options": {
      "A": "✓ 正确。跨洲上传走边缘加速。",
      "B": "错。CRR 系复制，唔加速来源上传。",
      "C": "错。Route 53 latency 解决唔到单一 S3 区域上传。",
      "D": "✓ 正确。Multipart 大档更稳更快。",
      "E": "错。随机前缀主要影响列出/分区效能，非上传加速关键。"
    },
    "diagram_before": "flowchart TB\n  AU[\"澳洲 App\"] -->|直传| S3[\"us-east-1 S3<br/>1–10GB\"]\n  X{{\"又慢又易失败\"}}\n  AU -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart LR\n  AU[\"澳洲 App\"] --> EDGE[\"就近边缘<br/>Transfer Acceleration\"]\n  EDGE --> S3[\"us-east-1 S3\"]\n  AU --> MP[\"Multipart Upload<br/>分 part 上传\"]\n  MP --> S3\n"
  },
  "72": {
    "blocker": "RDS Multi-AZ 故障转移后，应用重建连线失败，想唔重启应用就恢复。",
    "requirements": "中间加 RDS Proxy 抽象端点，failover 时代理重连。",
    "steps": [
      "建立 RDS Proxy 指去现有 RDS。",
      "应用连线字串改 Proxy 端点。",
      "Multi-AZ failover 时 Proxy 自动对新主库。",
      "应用无感或短暂重试即可恢复。"
    ],
    "solutions": "正确答案是 B。RDS Proxy 专门处理故障转移连线中断。",
    "result_flow": "App → RDS Proxy → RDS；主库切换 → Proxy 换连新主 → App 连线池可重用/恢复。",
    "options": {
      "A": "错。整库改 Aurora Serverless 过大。",
      "B": "✓ 正确。标准解法。",
      "C": "错。迁 Aurora + Proxy 多余。",
      "D": "错。Athena 唔系 OLTP 替代。"
    },
    "diagram_before": "flowchart TB\n  APP[\"应用连线池\"] --> RDS[\"RDS Multi-AZ\"]\n  X{{\"failover 后<br/>重建连线失败\"}}\n  RDS -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart LR\n  APP[\"App\"] --> PROXY[\"RDS Proxy\"]\n  PROXY --> RDS[\"RDS 主/备\"]\n  FAILOVER[\"Multi-AZ 切换\"] -.-> PROXY\n  PROXY -->|\"换连新主\"| APP\n"
  },
  "73": {
    "blocker": "数千装置要 MQTT 即时通讯，每机唯一 X.509 凭证，营运要最低。",
    "requirements": "用 IoT Core 托管 MQTT 与凭证装置身分。",
    "steps": [
      "在 IoT Core 为每装置建 Thing。",
      "布建唯一 X.509 凭证并附加政策。",
      "装置用 MQTT 连 IoT Core。",
      "后端订阅/规则引擎处理讯息。"
    ],
    "solutions": "正确答案是 C。IoT Core 原生 MQTT + 凭证管理。",
    "result_flow": "装置（X.509）→ MQTT → IoT Core → 规则/后端；无需自建 broker。",
    "options": {
      "A": "错。IoT Core 唔系同 Amazon MQ 咁拼。",
      "B": "错。自建 MQTT 营运重。",
      "C": "✓ 正确。托管、可扩展、凭证原生。",
      "D": "错。API GW + NLB + EC2 MQTT 过重。"
    },
    "diagram_before": "flowchart TB\n  DEV[\"数千装置\"] --> MSG[\"即时讯息\"]\n  MSG --> CERT[\"每机 X.509\"]\n  X{{\"要 MQTT + 凭证<br/>营运最低\"}}\n  CERT -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart LR\n  DEV[\"装置 + X.509\"] -->|MQTT| IOT[\"IoT Core\"]\n  IOT --> RULE[\"规则引擎\"]\n  RULE --> BE[\"后端服务\"]\n"
  },
  "74": {
    "blocker": "工程师只准经 CloudFormation 部署「已核准」资源，要强制无法手动乱建。",
    "requirements": "人只有 CFN 权限；真正建资源用 Service Role 且角色权限已收敛。",
    "steps": [
      "工程师 IAM 只允许 CloudFormation 相关动作。",
      "建立 CloudFormation Service Role，内含核准资源权限。",
      "建 Stack 时指定该 Service Role。",
      "工程师无直接 ec2:RunInstances 等权限，无法绕过。"
    ],
    "solutions": "正确答案是 C。IAM 限人 + Service Role 部署系强制 IaC 标准模式。",
    "result_flow": "工程师 CreateStack → CloudFormation 用 Service Role 建资源 → 仅角色允许的资源类型成功。",
    "options": {
      "A": "错。只开 S3+CFN 仍限唔准资源类型。",
      "B": "错。人若有资源建立权就可绕过模板。",
      "C": "✓ 正确。职责分离强制走 CFN。",
      "D": "错。只限「自己的 stack」仍可能直接建资源。"
    },
    "diagram_before": "flowchart TB\n  ENG[\"工程师\"] -->|可能手动| RES[\"AWS 资源\"]\n  X{{\"要强制只准<br/>已核准 IaC 部署\"}}\n  ENG -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart LR\n  ENG[\"工程师 IAM<br/>仅 CFN 动作\"] --> CFN[\"CloudFormation\"]\n  CFN --> ROLE[\"Service Role<br/>核准资源权限\"]\n  ROLE --> RES[\"已核准资源\"]\n"
  },
  "75": {
    "blocker": "每秒数百万笔 <4KB 小记录，要低延迟读，存 120 天后删，年 10–15TB，要最悭。",
    "requirements": "DynamoDB + TTL 自动过期。",
    "steps": [
      "设计 DynamoDB 表存小记录。",
      "写入设 TTL 属性约 120 天。",
      "读取毫秒级；到期项目自动删。",
      "按吞吐付费，避免海量小档在 S3。"
    ],
    "solutions": "正确答案是 B。DynamoDB + TTL 适合高吞吐时效资料。",
    "result_flow": "装置/服务写入 DynamoDB → 低延迟读 → 120 天 TTL 删除 → 成本随用量。",
    "options": {
      "A": "错。每笔一个 S3 CSV 管理灾难。",
      "B": "✓ 正确。吞吐、延迟、过期都合适。",
      "C": "错。RDS 顶唔住每秒数百万写。",
      "D": "错。S3 批次+metadata search 延迟与模型都不对。"
    },
    "diagram_before": "flowchart TB\n  SRC[\"高吞吐写入\"] --> REC[\"每秒数百万<br/><4KB\"]\n  REC --> RET[\"保留 120 天\"]\n  X{{\"要低延迟读<br/>最悭\"}}\n  RET -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart LR\n  SRC[\"装置/服务\"] --> DDB[\"DynamoDB\"]\n  DDB --> READ[\"毫秒级读\"]\n  DDB --> TTL[\"TTL 120 天自动删\"]\n"
  },
  "76": {
    "blocker": "电商要资料库最高可用，跨 Region 部署。",
    "requirements": "RDS 跨 Region 读副本，故障时 promote。",
    "steps": [
      "建立 Cross-Region Read Replica。",
      "主 Region 故障时 promote 副本成独立主库。",
      "应用流量切到新主库。",
      "再建立新的跨 Region 副本恢复 DR 姿态。"
    ],
    "solutions": "正确答案是 D。Cross-Region Read Replica + Promote 系 RDS 跨区高可用常见做法。",
    "result_flow": "主 Region RDS → 异步复写跨 Region 副本 → 灾难 promote → 流量切换 → 重建新副本。",
    "options": {
      "A": "错。只靠 backup promote 通常慢过健康副本 promote。",
      "B": "错。RDS 无 DynamoDB 那种 Global Tables；乱用 Lambda 复制非标准。",
      "C": "错。Global Tables 系 DynamoDB 功能。",
      "D": "✓ 正确。跨区副本 + promote。"
    },
    "diagram_before": "flowchart TB\n  APP[\"电商应用\"] --> RDS[\"RDS 单 Region\"]\n  RDS --> AZ[\"Multi-AZ 本地\"]\n  X{{\"跨 Region<br/>最高可用不足\"}}\n  AZ -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  PRI[\"主 Region RDS\"] -->|异步复写| RR[\"跨 Region<br/>Read Replica\"]\n  RR -->|灾难 promote| NEW[\"新主库\"]\n  NEW --> APP[\"流量切换\"]\n  NEW -.->|重建| RR2[\"新跨区副本\"]\n"
  },
  "77": {
    "blocker": "地端 VPN 只连 VPC A，而家 A 同 B peering，地端要去 B，NACL/SG 已开，想最低营运。",
    "requirements": "用 Transit Gateway 统一接 VPN、A、B。",
    "steps": [
      "建立 Transit Gateway。",
      "挂上 Site-to-Site VPN、VPC A、VPC B。",
      "更新路由表涵盖各地网段。",
      "地端经 TGW 到达 B，无需再为 B 拉新 VPN。"
    ],
    "solutions": "正确答案是 A。TGW 星型互连，营运最轻。",
    "result_flow": "地端 → VPN → TGW → VPC A/B；peering 唔使再靠路由神奇穿透。",
    "options": {
      "A": "✓ 正确。统一路由。",
      "B": "错。再为 B 建 VPN 多余。",
      "C": "错。Peering 唔会自动把 VPN 路由传去 peer VPC。",
      "D": "错。VGW（Virtual Private Gateway，虚拟私有闸道）只挂在单一 VPC，不能改定义同时涵盖 A+B，也无法把两个 router 拆去两个 VPC。"
    },
    "diagram_before": "flowchart TB\n  ONP[\"地端\"] -->|VPN| VPCA[\"VPC A\"]\n  VPCA -.->|peering| VPCB[\"VPC B\"]\n  X{{\"地端难达 B<br/>路由复杂\"}}\n  ONP -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  ONP[\"地端\"] -->|VPN| TGW[\"Transit Gateway\"]\n  TGW --> VPCA[\"VPC A\"]\n  TGW --> VPCB[\"VPC B\"]\n"
  },
  "78": {
    "blocker": "旧应用只懂 SMTP（TCP 25，本来无 TLS），要改用 Amazon SES 寄信。",
    "requirements": "用 SES SMTP 介面 + STARTTLS + SMTP 凭证。",
    "steps": [
      "在 SES 建立 SMTP 凭证。",
      "应用改连 SES SMTP 端点。",
      "启用 STARTTLS。",
      "用 SMTP 用户/密码（凭证）验证后寄信。"
    ],
    "solutions": "正确答案是 B。SES SMTP + STARTTLS + SMTP credentials 最贴旧 SMTP 应用。",
    "result_flow": "旧 App SMTP 客户端 → STARTTLS → SES SMTP 端点 → SES 寄出邮件。",
    "options": {
      "A": "错。TLS Wrapper 非本题标准说法。",
      "B": "✓ 正确。最少改动接 SES。",
      "C": "错。应用只支援 SMTP 非 SES API。",
      "D": "错。SDK 要改程式较大。"
    },
    "diagram_before": "flowchart TB\n  APP[\"旧应用\"] --> SMTP[\"SMTP TCP 25\"]\n  SMTP --> MAIL[\"寄信\"]\n  X{{\"要改 SES<br/>又贴近 SMTP\"}}\n  MAIL -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart LR\n  APP[\"旧 App<br/>SMTP 客户端\"] -->|STARTTLS| SES[\"SES SMTP 端点\"]\n  SES --> MAIL[\"寄出邮件\"]\n  CRED[\"SMTP 凭证\"] -.-> SES\n"
  },
  "79": {
    "blocker": "多帐户收购后要统一成本报告，仲要自建应用查询、按团队分组。",
    "requirements": "CUR + Athena + QuickSight 资料管线。",
    "steps": [
      "Organizations 开 CUR，用标签/Cost Categories 分团队。",
      "CUR 落地 S3 建 Athena 表。",
      "QuickSight 连 Athena 做资料集。",
      "财务/自建应用查统一成本。"
    ],
    "solutions": "正确答案是 A。CUR + Athena + QuickSight 系自建成本分析标准。",
    "result_flow": "各帐户用量 → 组织 CUR → S3 → Athena SQL → QuickSight/自建 App 按团队展示。",
    "options": {
      "A": "✓ 正确。可查询、可分组、可自建。",
      "B": "错。Cost Explorer 范本难满足自建应用。",
      "C": "错。Price List API 唔系实际帐单。",
      "D": "错。定价 API 无帐户实支。"
    },
    "diagram_before": "flowchart TB\n  A1[\"帐户成本\"] --> ORG[\"收购后多帐户\"]\n  A2[\"帐户成本\"] --> ORG\n  X{{\"要统一报告<br/>+ 按团队查询\"}}\n  ORG -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart LR\n  ORG[\"各帐户用量\"] --> CUR[\"组织 CUR\"]\n  CUR --> S3[\"S3\"]\n  S3 --> ATH[\"Athena SQL\"]\n  ATH --> QS[\"QuickSight / 自建 App\"]\n"
  },
  "80": {
    "blocker": "IoT API 伺服器过载，RDS 写延迟高，装置持续增加，要永久且成本效益方案。选两步。",
    "requirements": "串流解耦尖峰 + 用可水平扩展资料库。",
    "steps": [
      "装置资料改入 Kinesis Data Streams。",
      "Lambda 消费串流处理。",
      "资料层改 DynamoDB 扛超高写入。",
      "API/EC2 不再同步直写 RDS 成瓶颈。"
    ],
    "solutions": "正确答案是 C + E。Kinesis+Lambda 解耦；DynamoDB 取代 RDS 写入瓶颈。",
    "result_flow": "感测器 → Kinesis → Lambda 处理 → DynamoDB；尖峰被串流吸收，DB 可扩展。",
    "options": {
      "A": "错。只加大 EBS 唔解架构瓶颈。",
      "B": "错。Aurora 改善有限，写入扩展仍受限。",
      "C": "✓ 正确。串流解耦。",
      "D": "错。X-Ray+加机器唔解 DB 写入。",
      "E": "✓ 正确。DynamoDB 高写扩展。"
    },
    "diagram_before": "flowchart TB\n  IOT[\"感测器暴增\"] --> API[\"IoT API 伺服器\"]\n  API --> RDS[\"RDS 写延迟高\"]\n  X{{\"同步写库<br/>过载\"}}\n  RDS -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart LR\n  SEN[\"感测器\"] --> KDS[\"Kinesis<br/>Data Streams\"]\n  KDS --> L[\"Lambda\"]\n  L --> DDB[\"DynamoDB<br/>高写入\"]\n"
  },
  "81": {
    "blocker": "文件系统全 serverless 在 eu-central-1，欧外用户慢：S3 上传与 Regional API Gateway 延迟。选两步。",
    "requirements": "上传加速 + API 改 edge-optimized。",
    "steps": [
      "S3 开 Transfer Acceleration，前端用加速签章 URL。",
      "API Gateway 由 Regional 改 Edge-optimized。",
      "API 经 CloudFront 边缘接入。",
      "无需全球复制整套堆叠。"
    ],
    "solutions": "正确答案是 A + C。加速上传 + Edge API 降全球延迟。",
    "result_flow": "全球用户上传 → Transfer Acceleration → 欧区 S3；API → Edge-optimized → 边缘就近接入 → 回欧区 Lambda/Aurora。",
    "options": {
      "A": "✓ 正确。加速跨区上传。",
      "B": "错。Global Accelerator 挂 CloudFront 增益有限/不正确组合。",
      "C": "✓ 正确。Edge-optimized 降 API 延迟。",
      "D": "错。三地完整部署极贵。",
      "E": "错。RDS Proxy 解连线非全球延迟。"
    },
    "diagram_before": "flowchart TB\n  GLOBAL[\"欧外用户\"] --> S3[\"eu-central-1 S3\"]\n  GLOBAL --> APIG[\"Regional API GW\"]\n  X{{\"上传与 API<br/>全球延迟高\"}}\n  GLOBAL -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  U[\"全球用户\"] -->|Transfer Acceleration| S3[\"欧区 S3\"]\n  U --> EDGE[\"API Gateway<br/>Edge-optimized\"]\n  EDGE --> L[\"Lambda / Aurora<br/>欧区\"]\n"
  },
  "82": {
    "blocker": "手机 App 相片/影片存 S3 Standard，经 CloudFront 提供。30 天后多数好少人睇，但有啲仍热门；要毫秒撷取又最低成本。",
    "requirements": "存取模式不规则 → Intelligent-Tiering 自动调层。",
    "steps": [
      "桶启用 S3 Intelligent-Tiering。",
      "热物件留高频层，冷物件自动降层。",
      "撷取仍系毫秒级（非 Glacier 小时级）。",
      "无需人手猜生命周期。"
    ],
    "solutions": "正确答案是 A。Intelligent-Tiering 最适合「大多数冷、少数仍热」。",
    "result_flow": "上传 S3 → CloudFront 分发；30 天后存取降 → 自动降成本层；偶发热点仍快速读。",
    "options": {
      "A": "✓ 正确。自动、毫秒、悭钱。",
      "B": "错。Deep Archive 撷取太慢。",
      "C": "错。EFS 更贵且非物件分发模型。",
      "D": "错。Cache-Control 唔降 S3 储存费。"
    },
    "diagram_before": "flowchart TB\n  APP[\"手机 App\"] --> S3[\"S3 Standard<br/>全部\"]\n  S3 --> CF[\"CloudFront\"]\n  X{{\"30 天后多数冷<br/>少数仍热，成本高\"}}\n  S3 -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart LR\n  APP[\"上传\"] --> S3[\"S3 Intelligent-Tiering\"]\n  S3 --> CF[\"CloudFront\"]\n  S3 --> HOT[\"热: 高频层\"]\n  S3 --> COLD[\"冷: 自动降层<br/>毫秒撷取\"]\n"
  },
  "83": {
    "blocker": "S3 成本急升，要回顾过去 12 个月趋势，拣合适储存类别。",
    "requirements": "用 S3 Storage Lens 进阶指标做趋势分析。",
    "steps": [
      "开启 S3 Storage Lens。",
      "升级预设仪表板到 advanced metrics。",
      "检视 12 个月级储存与存取趋势。",
      "依结果调整储存类别/生命周期。"
    ],
    "solutions": "正确答案是 C。Storage Lens 专为 S3 库存与趋势分析。",
    "result_flow": "各桶用量与存取 → Storage Lens 进阶仪表板 → 判断边啲该转 IA/Glacier 等。",
    "options": {
      "A": "错。CUR+Trusted Advisor 粒度与物件存取趋势不足。",
      "B": "错。Storage Class Analysis 窗口短且偏单桶。",
      "C": "✓ 正确。专用储存分析。",
      "D": "错。Access Analyzer 偏安全暴露，非成本趋势。"
    },
    "diagram_before": "flowchart TB\n  B1[\"S3 桶群\"] --> COST[\"成本急升\"]\n  COST --> NEED[\"要 12 个月趋势\"]\n  X{{\"缺 Storage 洞察<br/>难选储存类别\"}}\n  NEED -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart LR\n  BUCKETS[\"各桶用量/存取\"] --> SL[\"S3 Storage Lens<br/>进阶仪表板\"]\n  SL --> DEC[\"决策: IA / Glacier\"]\n"
  },
  "84": {
    "blocker": "基础设施而家得一个 Region，要用 IaC 扩到多 Region、多帐户。",
    "requirements": "Organizations + CloudFormation StackSets 一次部署多目标。",
    "steps": [
      "用 Organizations 管理多帐户。",
      "在有权限帐户建立 StackSet。",
      "指定多帐户、多 Region 目标部署同一模板。",
      "后续更新模板即可滚动所有目标。"
    ],
    "solutions": "正确答案是 C。StackSets 系跨帐户跨 Region IaC 标准。",
    "result_flow": "一份模板 → StackSet → 帐户A/Region1、帐户B/Region2… 同步有相同基础设施。",
    "options": {
      "A": "错。只有模板+IAM 难真正跨帐户批量部署。",
      "B": "错。Control Tower 系治理落地，非本题部署主力。",
      "C": "✓ 正确。Organizations + StackSets。",
      "D": "错。Nested stacks 解模组化，唔解跨帐户。"
    },
    "diagram_before": "flowchart TB\n  ACC[\"多帐户\"] --> INFRA[\"基础设施\"]\n  INFRA --> REG[\"单一 Region\"]\n  X{{\"要 IaC 扩到<br/>多 Region 多帐户\"}}\n  REG -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  TPL[\"一份模板\"] --> SS[\"CloudFormation<br/>StackSets\"]\n  SS --> A1[\"帐户A × Region1\"]\n  SS --> A2[\"帐户B × Region2\"]\n  SS --> A3[\"更多目标…\"]\n"
  },
  "85": {
    "blocker": "同第 84 题：基础设施要 IaC 扩到多 Region、多帐户（题库重复题）。",
    "requirements": "Organizations + CloudFormation StackSets 跨帐户跨 Region 部署。",
    "steps": [
      "组织化多帐户。",
      "建立 StackSet 与具权限的管理/管理员帐户。",
      "选择多 Region 部署目标。",
      "统一模板滚动更新。"
    ],
    "solutions": "正确答案是 C。与 84 相同：StackSets 跨帐户跨 Region。",
    "result_flow": "模板 → StackSet → 多帐户 × 多 Region 堆叠实例 → 一致基础设施。",
    "options": {
      "A": "错。无法有效跨帐户批量。",
      "B": "错。Control Tower 非部署工具本体。",
      "C": "✓ 正确。StackSets 标准解。",
      "D": "错。Nested stacks 不解决跨帐户。"
    },
    "diagram_before": "flowchart TB\n  ACC[\"多帐户\"] --> INFRA[\"基础设施\"]\n  INFRA --> REG[\"单一 Region\"]\n  X{{\"要 IaC 扩到<br/>多 Region 多帐户\"}}\n  REG -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  TPL[\"CloudFormation 模板\"] --> SS[\"StackSets\"]\n  SS --> INST[\"多帐户 × 多 Region<br/>堆叠实例\"]\n  INST --> OUT[\"一致基础设施\"]\n"
  },
  "86": {
    "blocker": "单体要现代化，CI/CD 要每小时可多次发布，并要极快回滚。",
    "requirements": "用 Elastic Beanstalk 双环境（蓝绿）交换 URL。",
    "steps": [
      "Beanstalk 建 staging 与 production 环境。",
      "CI/CD 先部署到 staging。",
      "验证后交换 CNAME/URL 切流量。",
      "有问题再交换回来即回滚。"
    ],
    "solutions": "正确答案是 B。Beanstalk 环境 URL 交换支援快速发布与回滚。",
    "result_flow": "Pipeline → 部署次环境 → 交换 URL 上线 → 异常再交换回旧环境。",
    "options": {
      "A": "错。AMI 换机偏慢，难每小时多次。",
      "B": "✓ 正确。蓝绿式切换快。",
      "C": "错。每次 SSM 重布基建太慢。",
      "D": "错。ASG+AMI 滚动慢且回滚繁。"
    },
    "diagram_before": "flowchart TB\n  DEV[\"开发团队\"] --> MONO[\"单体应用\"]\n  MONO --> REL[\"发布流程\"]\n  X{{\"要高频发布<br/>+ 极快回滚\"}}\n  REL -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart LR\n  PIPE[\"CI/CD Pipeline\"] --> STG[\"Beanstalk<br/>staging\"]\n  STG -->|交换 URL| PROD[\"Beanstalk<br/>production\"]\n  PROD -.->|异常再交换| STG\n"
  },
  "87": {
    "blocker": "同一 Region 内 EC2 应用要以最小权限连 Aurora；两边各有安全群组，选两步。",
    "requirements": "EC2 出站允许连到 DB 安全群组的 Aurora 埠；DB 入站允许 EC2 安全群组来源。安全群组有状态，回程自动放行。",
    "steps": [
      "在 EC2 安全群组加出站规则：目的地 = DB 安全群组、预设 Aurora 埠（MySQL 3306／PostgreSQL 5432）。",
      "在 DB 安全群组加入站规则：来源 = EC2 安全群组、同一 Aurora 埠。",
      "不要在 EC2 开入站 Aurora 埠（A）：应用是 client，主动连出，不是听 Aurora 埠。",
      "不要在 DB 加出站去 EC2（D／E）：SG 有状态，回程自动允许。"
    ],
    "solutions": "正确答案是 B + C。PDF 标 AB 有误；社群约 77% 选 BC。B 收窄 EC2 出站到 DB；C 是 DB 放行连入的必要规则，缺 C 则连唔入。",
    "result_flow": "EC2 → 出站（B，目的 DB SG／Aurora 埠）→ Aurora 入站（C，来源 EC2 SG）→ 回程由 stateful SG 自动处理。",
    "options": {
      "A": "错。EC2 入站开 Aurora 埠方向错误；应用主动连出，唔系收 DB 连入。",
      "B": "✓ 正确。EC2 出站允许到 DB SG 的 Aurora 埠；least privilege 下收窄预设「全部出站」。",
      "C": "✓ 正确。DB 入站允许 EC2 SG 来源；DB 预设拒收所有入站，无此规则连唔通。",
      "D": "错。DB 不需出站到 EC2 的 Aurora 埠。",
      "E": "错。stateful 下不需 DB 出站 ephemeral；亦非标准两步。"
    },
    "diagram_before": "flowchart TB\n  EC2[\"EC2\"] -.->|过宽规则| AUR[\"Aurora\"]\n  X{{\"要最小权限<br/>SG 对 SG\"}}\n  EC2 -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  EC2[\"EC2 实例\"] --> ESG[\"EC2 安全群组<br/>B 出站: 放行 DB 埠\"]\n  ESG --> ASG[\"Aurora 安全群组<br/>C 入站: 允许 EC2 SG\"]\n  ASG --> AUR[\"Aurora\"]"
  },
  "88": {
    "blocker": "各业务单位要按标签睇成本，超阈值要通知，多帐户 Organizations，想最成本效益。",
    "requirements": "管理帐户集中 Budgets（按标签）+ SNS + Cost Explorer 月报。",
    "steps": [
      "在管理帐户设定 AWS Budgets，按 application/environment/owner 等标签分组。",
      "超预算发 SNS 通知。",
      "用 Cost Explorer 出各业务单位月报。",
      "避免每帐户重复建一套。"
    ],
    "solutions": "正确答案是 B。集中 Budgets + Cost Explorer 最悭营运。",
    "result_flow": "全组织消费 → 管理帐户 Budgets 按标签监控 → 超标 SNS → Cost Explorer 月报给各 BU。",
    "options": {
      "A": "错。每帐户各建 Budgets 营运重。",
      "B": "✓ 正确。集中、有效、成本效益。",
      "C": "错。分散 Billing Dashboard 无组织视图效率。",
      "D": "错。CUR+Lambda 自建开发成本高。"
    },
    "diagram_before": "flowchart TB\n  BU[\"各业务单位\"]\n  ORG[\"Organizations\"]\n  X{{\"要按标签成本<br/>+ 超阈值通知\"}}\n  BU -.-> X\n  ORG -.->|存在但未接上| X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  ORG[\"全组织消费\"] --> BUD[\"管理帐户 Budgets<br/>按标签\"]\n  BUD -->|超标| SNS[\"SNS 通知\"]\n  ORG --> CE[\"Cost Explorer<br/>BU 月报\"]\n"
  },
  "89": {
    "blocker": "惊生产 CloudFormation Stack 被删时，连 RDS/EBS 重要资料一并删走。",
    "requirements": "在模板对资料资源设 DeletionPolicy（Retain/Snapshot）。",
    "steps": [
      "在模板为 RDS 设 DeletionPolicy: Snapshot 或 Retain。",
      "为 EBS 等设 DeletionPolicy: Retain。",
      "更新堆叠套用政策。",
      "之后删 Stack 时资料资源保留或留快照。"
    ],
    "solutions": "正确答案是 A。DeletionPolicy 系防 Stack 删除连带删资料的标准属性。",
    "result_flow": "删除 Stack → CloudFormation 见 DeletionPolicy → RDS/EBS 保留或建快照 → 资料唔没。",
    "options": {
      "A": "✓ 正确。模板级保护资料。",
      "B": "错。Stack policy 主要限更新操作，唔等同保留资料。",
      "C": "错。IAM deny 难优雅嵌入删 Stack 生命周期。",
      "D": "错。Config 侦测唔阻止删除连带。"
    },
    "diagram_before": "flowchart TB\n  STACK[\"CloudFormation Stack\"] --> RDS[\"RDS\"]\n  STACK --> EBS[\"EBS\"]\n  X{{\"删 Stack 恐<br/>连资料一并删\"}}\n  STACK -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart LR\n  DEL[\"删除 Stack\"] --> CFN[\"CloudFormation\"]\n  CFN --> DP[\"DeletionPolicy<br/>Retain / Snapshot\"]\n  DP --> KEEP[\"RDS / EBS 保留\"]\n"
  },
  "90": {
    "blocker": "公司开咗 NAT Gateway（让私有网段可以出站上网）嘅 VPC Flow Logs（流量日志），见到公网 IP 198.51.100.2 打向私有 EC2 而且 Action=ACCEPT。唔知系外面主动打入嚟，定系内部先连出去嘅回程封包。",
    "requirements": "1) 判断系咪未经请求嘅入站连线；2) VPC CIDR 前两段系 203.0；3) 要用啱嘅工具同来源／目的方向。",
    "steps": [
      "到 CloudWatch Logs（监控日志服务）打开 NAT Gateway 同私有实例网卡嘅 Flow Log 日志群组。",
      "用 Logs Insights 筛选：来源 like 198.51.100.2、目的地 like 203.0（内部网段）。",
      "用 stats 统计位元组量，睇清有冇真正入站流量。",
      "唔好用 CloudTrail——𠮶个系 API 操作纪录，唔系网路封包。"
    ],
    "solutions": "正确答案是 B。Flow Logs 存在 CloudWatch，入站特征系 src=公网、dst=VPC 内部。CloudTrail 睇唔到封包；来源目的调转会查成出站。",
    "result_flow": "可疑流量 → Flow Logs 写入 CloudWatch → Logs Insights（src 198.51.100.2、dst 203.0）→ stats 睇流量 → 判断是否未经请求入站。",
    "options": {
      "A": "错。CloudTrail 只记 API 管理事件，查唔到 Flow Logs 封包。",
      "B": "✓ 正确。CloudWatch Logs Insights 查 Flow Logs；dst 像 203.0、src 像 198.51.100.2 方向啱。",
      "C": "错。工具用错（CloudTrail），而且来源／目的对调。",
      "D": "错。工具啱但来源／目的对调，会看成出站。"
    },
    "diagram_before": "flowchart TB\n  PUB[\"公网 IP<br/>198.51.100.2\"]\n  NAT[\"NAT Gateway\"]\n  EC2[\"私有 EC2\"]\n  FL[\"VPC Flow Logs<br/>Action=ACCEPT\"]\n  X{{\"缺口: 分不清<br/>主动入站或回程\"}}\n  PUB --> NAT --> EC2\n  NAT --> FL\n  FL -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  FL[\"NAT / ENI<br/>Flow Logs\"]\n  CW[\"CloudWatch Logs\"]\n  LI[\"Logs Insights<br/>src=公网 dst=203.0\"]\n  ST[\"stats 统计流量\"]\n  R[\"判断是否<br/>未经请求入站\"]\n  FL --> CW --> LI --> ST --> R"
  },
  "91": {
    "blocker": "两个业务单位各有 AWS 帐户，用 S3 双向复写共享文件，桶入面有数百万物件。稽核发现两边都未开静态加密，违反公司政策。",
    "requirements": "1) 全部文件必须用 SSE-S3（S3 代管金钥嘅伺服器端加密）；2) 要以最高营运效率处理既有数百万物件。",
    "steps": [
      "喺两个 S3 桶都开启预设加密 SSE-S3，之后新物件自动加密。",
      "用 S3 Batch Operations（批次作业）对既有物件做同位置复制，套用加密。",
      "确认复写同新写入都维持加密状态。"
    ],
    "solutions": "正确答案是 A。政策指定 SSE-S3 不是 KMS。海量既有物件用 Batch Operations 就地加密，远好过 CLI 逐笔 copy。",
    "result_flow": "开启 SSE-S3 → 新物件自动加密；Batch Operations 加密旧物件 → 双向复写继续共享已加密文件。",
    "options": {
      "A": "✓ 正确。SSE-S3 符合政策；Batch Operations 可大规模处理数百万物件。",
      "B": "错。用咗 SSE-KMS 不符政策；CLI 逐笔效率差。",
      "C": "错。加密类型啱，但 CLI 处理数百万物件效率极低。",
      "D": "错。SSE-KMS 不符要求，仲多咗 KMS 管理。"
    },
    "diagram_before": "flowchart TB\n  A[\"帐户 A S3\"]\n  B[\"帐户 B S3\"]\n  CR[\"双向复写<br/>数百万物件\"]\n  X{{\"缺口: 未开<br/>静态加密\"}}\n  A <--> CR\n  CR <--> B\n  A -.-> X\n  B -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart LR\n  SSE[\"两边桶<br/>开启 SSE-S3\"]\n  NEW[\"新物件<br/>自动加密\"]\n  BAT[\"S3 Batch Operations<br/>加密旧物件\"]\n  REP[\"双向复写<br/>已加密文件\"]\n  SSE --> NEW\n  SSE --> BAT\n  NEW --> REP\n  BAT --> REP"
  },
  "92": {
    "blocker": "应用把数 TB 非结构化资料放喺 S3 Standard，每日再长几 GB。要查询分析，但超过一年几乎唔睇，又要永久保留合规。",
    "requirements": "1) 最省成本查询 S3 资料；2) 一年以上资料降到最便宜长期封存层。",
    "steps": [
      "用 AWS Glue Data Catalog（资料目录）描述 S3 入面嘅表结构。",
      "用 Amazon Athena（无伺服器 SQL 查 S3）做分析，按扫描量收费。",
      "建 S3 Lifecycle：超过 1 年转到 Glacier Deep Archive（最便宜长期封存）。"
    ],
    "solutions": "正确答案是 C。Athena+Glue 系资料湖低成本查询标准；Deep Archive 适合「几乎唔睇但永久留」。S3 Select 只能查单一物件。",
    "result_flow": "日常：Athena 经 Glue 目录查 S3 → 分析；1 年后 Lifecycle 自动降到 Deep Archive 继续合规保存。",
    "options": {
      "A": "错。S3 Select 只适合单物件部分读取，唔适合跨 TB 分析。",
      "B": "错。Redshift Spectrum 要丛集，成本较高。",
      "C": "✓ 正确。Athena+Glue 低成本查询；Deep Archive 长期最省。",
      "D": "错。查询层偏贵；Intelligent-Tiering 对一年以上几乎唔存取不如 Deep Archive 省。"
    },
    "diagram_before": "flowchart TB\n  APP[\"应用程式\"]\n  S3[\"S3 Standard<br/>数 TB\"]\n  GROW[\"每日再增几 GB\"]\n  QRY[\"要查询分析\"]\n  X{{\"缺口: 旧资料<br/>永久合规保存\"}}\n  APP --> S3 --> GROW\n  S3 --> QRY\n  GROW -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  S3[\"S3 资料湖\"]\n  GLUE[\"Glue Data Catalog\"]\n  ATH[\"Athena 查询\"]\n  LC[\"Lifecycle 1 年后\"]\n  DA[\"Glacier Deep Archive\"]\n  S3 --> GLUE --> ATH\n  S3 --> LC --> DA"
  },
  "93": {
    "blocker": "地端 NAS 有 600 TB 压缩资料要上 AWS 做 ML。网速得 100 Mbps 又多人共用，要 3 周内完成、传输加密、一次性搬移。",
    "requirements": "3 周内完成 600 TB 一次转移并加密；唔可以靠现有窄频硬传。",
    "steps": [
      "喺主控台订购多台 Snowball Edge Storage Optimized（实体运资料加密装置）。",
      "设定目的 S3 桶，把资料复制到装置。",
      "寄返 AWS，由 AWS 汇入 S3。"
    ],
    "solutions": "正确答案是 A。粗算 600 TB／100 Mbps 要数百日，远超 3 周。Snowball 实体转移先赶得切同内建加密。DX／VPN／Storage Gateway 仍然受频宽或建置时间限制。",
    "result_flow": "地端复制到 Snowball → 加密实体寄送 → AWS 汇入 S3 → 开始云端 ML。",
    "options": {
      "A": "✓ 正确。大容量实体转移，时限同加密都符合。",
      "B": "错。DX 建置常要数周，唔适合急迫一次性 600 TB。",
      "C": "错。VPN 仍然食 100 Mbps，时间远超 3 周。",
      "D": "错。File Gateway 仍然行网路，瓶颈一样。"
    },
    "diagram_before": "flowchart TB\n  NAS[\"地端 NAS<br/>600 TB\"]\n  NET[\"共用 100 Mbps\"]\n  ML[\"要上 AWS 做 ML\"]\n  X{{\"缺口: 3 周内<br/>加密一次性搬移\"}}\n  NAS --> NET\n  NAS --> ML\n  NET -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart LR\n  NAS[\"地端 NAS\"]\n  SB[\"Snowball Edge<br/>多台加密装置\"]\n  SHIP[\"实体寄送\"]\n  S3[\"汇入 S3\"]\n  ML[\"云端 ML 训练\"]\n  NAS --> SB --> SHIP --> S3 --> ML"
  },
  "94": {
    "blocker": "表单处理已上 AWS（EC2+RDS+S3），使用者上传扫描档后仍然靠人工验证同撷取，又慢又贵。",
    "requirements": "高准确 OCR 同资料抽取；上市要快；长期营运负担要低。",
    "steps": [
      "用 Step Functions（工作流程编排）+ Lambda 串起上传后处理。",
      "呼叫 Amazon Textract（文件 OCR／表单栏位撷取）读扫描表单。",
      "搭配 Amazon Comprehend（文字语意理解）补强处理。",
      "结果写返系统，取代人工。"
    ],
    "solutions": "正确答案是 D。托管 AI（Textract／Comprehend）+ 无伺服器编排，比自训模型或 EKS 自管 OCR 更快上线、更好维护。",
    "result_flow": "上传表单 → 触发 Step Functions → Lambda 呼叫 Textract／Comprehend → 结构化资料入库或送下游。",
    "options": {
      "A": "错。自建 OCR 上 EKS 开发久、维护重。",
      "B": "错。自管 AI／ML 模型长期负担高。",
      "C": "错。SageMaker 自训托管成本高，唔系最快路径。",
      "D": "✓ 正确。托管 OCR／NLU + 无伺服器，准、快、省运维。"
    },
    "diagram_before": "flowchart TB\n  U[\"使用者上传<br/>扫描表单\"]\n  WEB[\"EC2 Web\"]\n  S3[\"S3 档案\"]\n  RDS[\"RDS 中继资料\"]\n  HUM[\"人工验证撷取\"]\n  X{{\"缺口: 慢且贵\"}}\n  U --> WEB --> S3\n  WEB --> RDS\n  S3 --> HUM\n  HUM -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  U[\"上传表单\"] --> S3[\"S3\"]\n  S3 --> SF[\"Step Functions\"]\n  SF --> L[\"Lambda\"]\n  L --> TX[\"Textract OCR\"]\n  L --> CP[\"Comprehend\"]\n  TX --> DB[\"结构化入库\"]\n  CP --> DB"
  },
  "95": {
    "blocker": "地端订单平台有 VM 前端、RabbitMQ 伫列、Kubernetes 后端，要搬 AWS 但唔想大改应用。",
    "requirements": "最小程式码变更；讯息协定尽量相容；降低 K8s 控制平面维护。",
    "steps": [
      "用前端 VM 做 AMI，放到 EC2 Auto Scaling + ALB（应用负载平衡器）。",
      "用 Amazon MQ（可相容 RabbitMQ 嘅托管讯息代理）取代地端 RabbitMQ。",
      "后端容器改跑 Amazon EKS（托管 Kubernetes）。"
    ],
    "solutions": "正确答案是 A。AMI／ASG／ALB 接近原 VM；Amazon MQ 同 RabbitMQ 协定相容；EKS 比自管 K8s 省事。SQS 协定唔同要改码。",
    "result_flow": "使用者 → ALB → ASG 前端 → Amazon MQ → EKS 后端处理订单。",
    "options": {
      "A": "✓ 正确。协定相容、变更小、EKS 降维护。",
      "B": "错。Lambda／API Gateway 重写前端系大改。",
      "C": "错。EC2 自装 K8s 要自己管控制平面。",
      "D": "错。SQS 同 RabbitMQ 唔相容，要改应用。"
    },
    "diagram_before": "flowchart TB\n  VM[\"地端 VM 前端\"]\n  MQ[\"RabbitMQ\"]\n  K8S[\"自管 Kubernetes\"]\n  X{{\"缺口: 搬 AWS<br/>不想大改应用\"}}\n  VM --> MQ --> K8S\n  K8S -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart LR\n  U[\"使用者\"] --> ALB[\"ALB\"]\n  ALB --> ASG[\"ASG 前端<br/>AMI\"]\n  ASG --> AMQ[\"Amazon MQ\"]\n  AMQ --> EKS[\"EKS 后端\"]\n  EKS --> OUT[\"处理订单\"]"
  },
  "96": {
    "blocker": "S3 客户端加密用 KMS CMK。题干 IAM 已有 s3:Get/Put 与 kms:Encrypt、kms:Decrypt，读既有物件得，上传新物件 Forbidden。",
    "requirements": "补上客户端加密上传所需的 KMS API：kms:GenerateDataKey。",
    "steps": [
      "对照题干政策：DownloadUpload 有 S3 读写；KMSAccess 只有 Encrypt/Decrypt。",
      "客户端加密上传会先呼叫 GenerateDataKey 产生 DEK，再用 DEK 本地加密后 PutObject。",
      "喺 IAM 加上 kms:GenerateDataKey；读取仍靠已有 kms:Decrypt，所以会「能读不能写」。"
    ],
    "solutions": "正确答案是 A。政策缺 GenerateDataKey，上传客户端加密会 Forbidden；Encrypt 唔等于产生资料金钥。",
    "result_flow": "上传前 → GenerateDataKey 攞 DEK → 本地加密 → PutObject；读取 → Decrypt 解 DEK → 还原内容。",
    "options": {
      "A": "✓ 正确。客户端加密上传必备 GenerateDataKey。",
      "B": "错。GetKeyPolicy 同加密上传无关。",
      "C": "错。GetPublicKey 用于非对称场景。",
      "D": "错。Sign 系签章，唔系加密上传。"
    },
    "diagram_before": "flowchart TB\n  APP[\"应用\"]\n  KMS[\"KMS CMK\"]\n  S3[\"S3 物件\"]\n  R[\"读取: 成功\"]\n  X{{\"缺口: 上传<br/>Forbidden\"}}\n  APP --> KMS\n  APP -->|读| S3\n  S3 --> R\n  APP -.->|写| X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  APP[\"客户端应用\"]\n  GDK[\"kms:GenerateDataKey\"]\n  ENC[\"本地加密 DEK\"]\n  PUT[\"PutObject → S3\"]\n  DEC[\"kms:Decrypt 读取\"]\n  APP --> GDK --> ENC --> PUT\n  APP --> DEC"
  },
  "97": {
    "blocker": "Web 喺 ALB 后面，想加 AWS WAF（网页防火墙）强化安全，又怕误挡合法流量。",
    "requirements": "部署 WAF 时唔好伤害正常使用者；要先观察误判再正式阻挡。",
    "steps": [
      "先把 web ACL 规则动作设为 Count（只计数不挡）。",
      "开启 WAF 日志，分析边啲请求会被误判。",
      "调整规则降低 false positive。",
      "确认稳定后再改为 Block。"
    ],
    "solutions": "正确答案是 A。Count → 分析 → 调整 → Block 系 WAF 渐进上线标准，避免一上线就挡错人。",
    "result_flow": "请求进 WAF → Count 只记录 → 睇日志调规则 → 改 Block → 恶意挡下、合法放行。",
    "options": {
      "A": "✓ 正确。Count 先观测再阻挡，保护合法流量。",
      "B": "错。得 rate-based 防护面不足，亦可能误挡尖峰。",
      "C": "错。一开始就 Block 容易大量误判。",
      "D": "错。Allow 自订规则难以覆盖攻击面。"
    },
    "diagram_before": "flowchart TB\n  U[\"用户请求\"]\n  ALB[\"ALB\"]\n  APP[\"EC2 应用\"]\n  X{{\"缺口: 要加 WAF<br/>又怕误挡合法流量\"}}\n  U --> ALB --> APP\n  ALB -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  U[\"请求\"] --> WAF[\"WAF 规则<br/>先 Count\"]\n  WAF --> LOG[\"WAF Logging\"]\n  LOG --> FIX[\"分析误判<br/>调规则\"]\n  FIX --> BLK[\"改为 Block\"]\n  BLK --> ALB[\"ALB → 应用\"]"
  },
  "98": {
    "blocker": "多帐户组织要统一管理「安全群组允许嘅 CIDR 清单」。安全团队一改，要自动套到所有帐户。",
    "requirements": "集中维护允许清单；变更一处全组织生效；营运负担最低。",
    "steps": [
      "喺安全帐户建立 customer-managed prefix list（可重用 IP 网段清单）。",
      "用 AWS RAM（跨帐户资源共享）把 prefix list 分享畀 Organization。",
      "各帐户安全群组引用该 prefix list ID，唔好手写一堆 CIDR。"
    ],
    "solutions": "正确答案是 C。集中 prefix list + RAM 分享系推荐做法；更新后引用端自动生效。",
    "result_flow": "安全团队更新 prefix list → RAM 已共享 → 各帐户 SG 引用同一 ID → 允许来源全域一致。",
    "options": {
      "A": "错。SNS+每帐户 Lambda 维护成本高。",
      "B": "错。每帐户各自一份 list，同步难。",
      "C": "✓ 正确。集中 list + RAM，营运最轻。",
      "D": "错。跨帐户 AssumeRole 改 SG 复杂易错。"
    },
    "diagram_before": "flowchart TB\n  SEC[\"安全团队\"]\n  A1[\"帐户 A SG\"]\n  A2[\"帐户 B SG\"]\n  A3[\"帐户 C SG\"]\n  X{{\"缺口: CIDR 清单<br/>各帐户手动维护\"}}\n  SEC -.-> A1\n  SEC -.-> A2\n  SEC -.-> A3\n  A1 -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  SEC[\"安全帐户\"]\n  PL[\"Customer<br/>Prefix List\"]\n  RAM[\"RAM 共享\"]\n  SG[\"各帐户 SG<br/>引用同一 ID\"]\n  SEC --> PL --> RAM --> SG"
  },
  "99": {
    "blocker": "员工居家办公要用 Client VPN 入多帐户 VPC 内部应用。主帐户 VPC 已经同其他帐户 VPC 做咗 Peering。",
    "requirements": "最具成本效益地让远端员工连到各帐户内部应用。",
    "steps": [
      "只喺主帐户建一个 Client VPN endpoint（远端 VPN 入口）。",
      "设定路由指向已 peering 嘅各 VPC CIDR。",
      "员工连上后经 Peering 到达各帐户应用。"
    ],
    "solutions": "正确答案是 B。既有 Peering 已打通，一个 Client VPN 就够；唔使每帐户建 VPN，亦唔使再上 Transit Gateway。",
    "result_flow": "员工 → Client VPN（主帐户）→ 主 VPC → VPC Peering → 各业务帐户应用。",
    "options": {
      "A": "错。每帐户一个 Client VPN 成本高、管理散。",
      "B": "✓ 正确。单一 endpoint + 既有 Peering，最省。",
      "C": "错。多加 TGW 提高成本，已有 Peering 唔必要。",
      "D": "错。Client VPN 同 Site-to-Site 概念混用，方案唔成立。"
    },
    "diagram_before": "flowchart TB\n  EMP[\"居家员工\"]\n  ONP[\"原: 地端连入\"]\n  MAIN[\"主帐户 VPC\"]\n  PEER[\"VPC Peering\"]\n  APP[\"多帐户应用\"]\n  X{{\"缺口: 要 Client VPN<br/>存取多帐户\"}}\n  EMP -.-> X\n  ONP --> MAIN --> PEER --> APP\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart LR\n  EMP[\"员工\"] --> CVPN[\"Client VPN<br/>主帐户\"]\n  CVPN --> MAIN[\"主 VPC\"]\n  MAIN --> PEER[\"既有 Peering\"]\n  PEER --> APP[\"各业务帐户<br/>内部应用\"]"
  },
  "100": {
    "blocker": "应用同步呼叫第三方 Lambda，延迟同错误率上升，呼叫方被拖累。",
    "requirements": "要把第三方呼叫解耦成非同步，并确保工作最终会被做完。",
    "steps": [
      "主应用改为把工作丢入 SQS（讯息伫列）后立刻返回。",
      "另建 Lambda 当消费者，从伫列取讯息去呼叫第三方。",
      "靠伫列重试同可见性逾时，确保讯息最终被处理（或进死信伫列）。"
    ],
    "solutions": "正确答案是 A。SQS 系标准解耦同缓冲；SNS 偏推播唔保证逐则处理完成；Step Functions／EventBridge 对此简单场景过重。",
    "result_flow": "主应用 → SQS 入列 → 立即回应；消费者 Lambda → 呼叫第三方 → 失败重试直至成功或进 DLQ。",
    "options": {
      "A": "✓ 正确。伫列解耦 + 重试，确保最终完成。",
      "B": "错。Step Functions 对简单解耦过重。",
      "C": "错。EventBridge 唔系此场景最佳持久伫列模式。",
      "D": "错。SNS 推播唔保证逐则处理完成。"
    },
    "diagram_before": "flowchart TB\n  APP[\"主应用\"]\n  SYNC[\"同步呼叫\"]\n  L[\"第三方 Lambda\"]\n  X{{\"缺口: 延迟上升<br/>错误拖累呼叫方\"}}\n  APP --> SYNC --> L\n  L -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  APP[\"主应用\"] --> SQS[\"SQS 伫列\"]\n  SQS --> OK[\"立即回应\"]\n  SQS --> CON[\"消费者 Lambda\"]\n  CON --> TP[\"呼叫第三方\"]\n  TP --> DLQ[\"失败重试 / DLQ\"]"
  },
  "101": {
    "blocker": "Sales 帐户嘅 S3（KMS 加密）要畀 Marketing 嘅 QuickSight 读，唔想复制成个桶资料。",
    "requirements": "跨帐户安全读取；兼顾 KMS 解密；营运负担低。",
    "steps": [
      "喺 Sales 建立 IAM 角色，权限含 S3 读同 KMS 解密。",
      "信任政策允许 Marketing 嘅 QuickSight 角色 AssumeRole（临时扮演跨帐户角色）。",
      "QuickSight 用该角色跨帐读资料做分析。"
    ],
    "solutions": "正确答案是 D。跨帐户 Role + AssumeRole 系标准，唔使复制资料。",
    "result_flow": "QuickSight（Marketing）→ AssumeRole → Sales 角色临时凭证 → 读 S3 + KMS 解密 → 分析。",
    "options": {
      "A": "错。复制资料增加成本同同步问题。",
      "B": "错。SCP 系限制政策，唔系授与跨帐读取主路径。",
      "C": "错。资源政策应喺拥有 bucket 嘅 Sales 帐户设定。",
      "D": "✓ 正确。跨帐户 Role + AssumeRole，安全又省运维。"
    },
    "diagram_before": "flowchart TB\n  SALES[\"Sales 帐户\"]\n  S3[\"S3 + KMS<br/>PB 级资料\"]\n  MKT[\"Marketing<br/>QuickSight\"]\n  X{{\"缺口: 跨帐户读<br/>不想整桶复制\"}}\n  SALES --> S3\n  MKT -.-> X\n  S3 -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart LR\n  QS[\"QuickSight<br/>Marketing\"]\n  ROLE[\"AssumeRole<br/>Sales 角色\"]\n  S3[\"读 S3\"]\n  KMS[\"KMS 解密\"]\n  OUT[\"分析报表\"]\n  QS --> ROLE --> S3 --> KMS --> OUT"
  },
  "102": {
    "blocker": "要把地端 SQL Server Always On 异质迁到 AWS 托管资料库（引擎会变）。",
    "requirements": "完成 schema 转换同资料迁移；支援异质引擎。",
    "steps": [
      "用 SCT（结构转换工具）转换 schema 到目标引擎。",
      "用 DMS（资料库迁移服务）做全量／增量资料迁移。",
      "验证后切换应用连线到托管资料库。"
    ],
    "solutions": "正确答案是 C。异质迁移必须 SCT + DMS；backup/restore、Snowball、DataSync 解唔到引擎差异。",
    "result_flow": "SCT 转结构 → DMS 搬资料 → 验证 → 切到 RDS／Aurora 等托管库。",
    "options": {
      "A": "错。Backup/restore 只适合同引擎。",
      "B": "错。Snowball 唔解决 schema 转换。",
      "C": "✓ 正确。SCT+DMS 系异质迁移标准组合。",
      "D": "错。DataSync 系档案同步，唔系资料库异质迁移。"
    },
    "diagram_before": "flowchart TB\n  ONP[\"地端 SQL Server<br/>Always On\"]\n  APP[\"业务关键应用\"]\n  AWS[\"AWS 托管库\"]\n  X{{\"缺口: 异质迁移<br/>引擎会变\"}}\n  APP --> ONP\n  ONP -.-> X\n  X -.-> AWS\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart LR\n  SRC[\"地端 SQL Server\"]\n  SCT[\"SCT 转结构\"]\n  DMS[\"DMS 搬资料\"]\n  RDS[\"RDS / Aurora\"]\n  VAL[\"验证后切换\"]\n  SRC --> SCT --> DMS --> RDS --> VAL"
  },
  "103": {
    "blocker": "开发帐户设计团队要把静态资产上传到生产帐户 S3，但不能摸到生产其他资源。选三步。",
    "requirements": "跨帐户最小权限：资源端（生产）建政策与角色；身分端（开发）AssumeRole。",
    "steps": [
      "A：喺生产帐户建立只允许该 S3 桶读写嘅 IAM 政策。",
      "C：喺生产帐户建立角色，附加该政策，信任开发帐户为 trusted entity。",
      "E：喺开发帐户建设计团队群组，授权 sts:AssumeRole 到「生产帐户」嘅角色。",
      "唔好选 D／F：角色唔应建喺开发，亦唔应 Assume 开发帐户内角色。"
    ],
    "solutions": "正确答案是 A、C、E。PDF 标 ADE 有误；社群约 95% 选 ACE。标准跨帐户：生产角色 + 信任开发 + 开发端 AssumeRole。",
    "result_flow": "开发使用者 → sts:AssumeRole（生产角色）→ 生产 IAM 政策（只限指定 S3）→ 上传静态资产。",
    "options": {
      "A": "✓ 正确。生产帐户定义 S3 最小权限政策（资源拥有端）。",
      "B": "错。S3 桶喺生产；政策应喺生产帐户建立。",
      "C": "✓ 正确。生产建角色、附加政策、信任开发帐户。",
      "D": "错。角色应建喺生产（资源端），唔系开发。",
      "E": "✓ 正确。开发群组可 AssumeRole 到生产角色，攞临时权限。",
      "F": "错。AssumeRole 目标变成开发帐户角色，方向错，到唔到生产 S3。"
    },
    "diagram_before": "flowchart TB\n  DEV[\"开发帐户<br/>设计团队\"]\n  ASSETS[\"静态图示/资产\"]\n  PROD[\"生产帐户 S3\"]\n  X{{\"缺口: 只能上传资产<br/>不能摸其他资源\"}}\n  DEV --> ASSETS\n  ASSETS -.-> X\n  X -.-> PROD\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  DEVU[\"开发群组\"] -->|E AssumeRole| ROLE[\"C 生产角色<br/>信任开发帐户\"]\n  POL[\"A 生产 IAM 政策<br/>只限指定 S3\"] --> ROLE\n  ROLE --> S3[\"生产 S3 读写\"]"
  },
  "104": {
    "blocker": "Elastic Beanstalk 单一实例环境 CPU 成日超过 85%，上线前要扩展而且运维要少。",
    "requirements": "改成可水平扩展；CPU 高时自动加机器；尽量改现有环境。",
    "steps": [
      "把现有环境容量设定改成 load-balanced。",
      "涵盖多个可用区。",
      "加 scale-out 规则：平均 CPU > 85% 就扩展。"
    ],
    "solutions": "正确答案是 C。就地改 load-balanced 比建新环境／重建更省事。",
    "result_flow": "流量 → ELB → 多实例；平均 CPU >85% → 自动加实例 → 压力下降。",
    "options": {
      "A": "错。新建环境增加迁移同切换成本。",
      "B": "错。流量分割系部署策略，唔解决 CPU 瓶颈。",
      "C": "✓ 正确。就地改 load-balanced + 扩展规则。",
      "D": "错。Rebuild 会中断，而且单 AZ、指标选择唔好。"
    },
    "diagram_before": "flowchart TB\n  U[\"用户流量\"]\n  EB[\"Beanstalk<br/>单一实例\"]\n  CPU[\"CPU 常 >85%\"]\n  X{{\"缺口: 上线前要扩展<br/>运维要少\"}}\n  U --> EB --> CPU\n  CPU -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  U[\"流量\"] --> ELB[\"Load Balancer\"]\n  ELB --> MULTI[\"多实例环境\"]\n  CW[\"平均 CPU >85%\"]\n  AS[\"自动加实例\"]\n  MULTI --> CW --> AS\n  AS --> MULTI"
  },
  "105": {
    "blocker": "自管 MySQL on EC2 月末报表时 I/O 爆，想尽量少影响主库写入。",
    "requirements": "把报表读负载从主库挪走；撑住月末高峰。",
    "steps": [
      "把资料库迁到 Amazon RDS。",
      "建立多个 Read Replica（读取复本）。",
      "报表查询打到复本，写入仍然走主库。"
    ],
    "solutions": "正确答案是 B。瓶颈喺资料库 I/O，读写分离最对症。",
    "result_flow": "写入 → RDS 主库；月末报表读取 → Read Replica → 主库唔被报表拖垮。",
    "options": {
      "A": "错。未对准资料库 I/O 根因。",
      "B": "✓ 正确。读写分离处理报表高峰。",
      "C": "错。动态改 volume 类型风险高。",
      "D": "错。定期切换 PIOPS 运维重又危险。"
    },
    "diagram_before": "flowchart TB\n  APP[\"应用写入\"]\n  EC2[\"自管 MySQL<br/>on EC2\"]\n  RPT[\"月末报表读取\"]\n  X{{\"缺口: I/O 爆<br/>拖累主库写入\"}}\n  APP --> EC2\n  RPT --> EC2\n  EC2 -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart LR\n  W[\"写入\"] --> PRI[\"RDS 主库\"]\n  R[\"月末报表\"] --> RR[\"Read Replica\"]\n  PRI --> RR\n  RR --> OK[\"主库不被拖垮\"]"
  },
  "106": {
    "blocker": "Java 应用有复杂 VM 依赖，要上 AWS，希望少改码、少管机器。",
    "requirements": "最小改码；免管伺服器嘅容器环境。",
    "steps": [
      "用 App2Container 把 Java 应用容器化。",
      "部署到 ECS Fargate（免管伺服器容器）。",
      "前面用 ALB 接流量。"
    ],
    "solutions": "正确答案是 A。App2Container + Fargate 改码少；搬 Lambda 通常要大重构。",
    "result_flow": "App2Container 产出映像 → Fargate 执行 → ALB 对外服务。",
    "options": {
      "A": "✓ 正确。自动容器化 + Fargate，改码少、无伺服器。",
      "B": "错。改成 Lambda 常要大幅重构。",
      "C": "错。EKS 节点同入口变更较多。",
      "D": "错。Lambda 路径改动大，唔系最小变更。"
    },
    "diagram_before": "flowchart TB\n  JAVA[\"Java 应用\"]\n  DEP[\"复杂 VM 依赖\"]\n  ONP[\"地端/自管机器\"]\n  X{{\"缺口: 少改码<br/>又少管机器\"}}\n  JAVA --> DEP --> ONP\n  ONP -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart LR\n  A2C[\"App2Container<br/>产出映像\"]\n  FG[\"Fargate 执行\"]\n  ALB[\"ALB 对外\"]\n  SVC[\"服务上线\"]\n  A2C --> FG --> ALB --> SVC"
  },
  "107": {
    "blocker": "Lambda + API Gateway 只喺 us-east-1，需要 Region 级故障转移。",
    "requirements": "备援 Region 完整堆叠；健康检查失败时 DNS 切换。",
    "steps": [
      "喺 us-west-2 部署同样嘅 Lambda 同 API Gateway。",
      "Route 53 设 Failover 记录并做健康检查。",
      "主 Region 不健康时把流量指到备援 Region。"
    ],
    "solutions": "正确答案是 D。双 Region + Route 53 failover 系 API 标准 DR。",
    "result_flow": "用户 → Route 53 → 主 Region API/Lambda；健康检查失败 → DNS 指到 us-west-2。",
    "options": {
      "A": "错。跨 Region 指返单一 Lambda 做唔到 Region 级 DR。",
      "B": "错。SQS 解唔到 Region 单点。",
      "C": "错。Global Accelerator 唔适合呢个 API Gateway 场景。",
      "D": "✓ 正确。双部署 + Failover 路由。"
    },
    "diagram_before": "flowchart TB\n  U[\"用户\"]\n  API[\"API Gateway<br/>us-east-1\"]\n  L[\"Lambda\"]\n  X{{\"缺口: 单 Region<br/>无故障转移\"}}\n  U --> API --> L\n  API -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  U[\"用户\"] --> R53[\"Route 53<br/>Failover\"]\n  R53 -->|主| E1[\"API + Lambda<br/>us-east-1\"]\n  R53 -.->|备援| E2[\"API + Lambda<br/>us-west-2\"]\n  HC[\"Health Check\"]\n  HC -.-> R53"
  },
  "108": {
    "blocker": "HR production 帐户买咗 RI（预留实例折扣），唔想其他部门食到呢个折扣。",
    "requirements": "只让该帐户享用 RI；阻止组织内共享。",
    "steps": [
      "由 Organizations 管理帐户操作帐单设定。",
      "关闭 HR production 帐户嘅 RI sharing。",
      "其他帐户用量唔再食到该 RI 折扣。"
    ],
    "solutions": "正确答案是 C。RI 共享由管理帐户喺 Billing 控制；SCP 管唔到。",
    "result_flow": "管理帐户 Billing → 关闭 HR 帐户 RI 共享 → 折扣只留喺 HR。",
    "options": {
      "A": "错。成员帐户无权关闭共享。",
      "B": "错。移出组织代价过大。",
      "C": "✓ 正确。管理帐户关闭指定帐户 RI 共享。",
      "D": "错。SCP 唔能控制 RI 共享。"
    },
    "diagram_before": "flowchart TB\n  HR[\"HR production\"]\n  RI[\"已买 RI 折扣\"]\n  OTHER[\"其他部门帐户\"]\n  X{{\"缺口: 折扣被<br/>其他帐户吃到\"}}\n  HR --> RI\n  OTHER -.-> RI\n  RI -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  MGMT[\"管理帐户\"]\n  BILL[\"Billing 控制\"]\n  OFF[\"关闭 HR 帐户<br/>RI 共享\"]\n  HR[\"折扣只留在 HR\"]\n  MGMT --> BILL --> OFF --> HR"
  },
  "109": {
    "blocker": "ASG 一判定 unhealthy 就砍实例，容量跌咗又查唔到根因，需要留机除错。",
    "requirements": "暂时唔好终止 unhealthy 实例；用 Session Manager 入去查。",
    "steps": [
      "喺 Auto Scaling 暂停 Terminate 程序。",
      "实例维持 unhealthy 但唔会被砍。",
      "用 Systems Manager Session Manager 连线除错。"
    ],
    "solutions": "正确答案是 D。HealthCheck 同 Terminate 分开；要留机必须暂停 Terminate。",
    "result_flow": "标记 unhealthy → Terminate 已暂停 → Session Manager 登入查根因 → 修好后恢复程序。",
    "options": {
      "A": "错。暂停 HealthCheck 唔能可靠留下已 unhealthy 实例。",
      "B": "错。唔系对应 ASG 终止流程嘅最佳做法。",
      "C": "错。改 termination policy 解唔到而家正在被杀嘅机。",
      "D": "✓ 正确。Suspend Terminate + Session Manager 除错。"
    },
    "diagram_before": "flowchart TB\n  ASG[\"Auto Scaling\"]\n  UNH[\"判定 unhealthy\"]\n  TERM[\"立刻终止实例\"]\n  X{{\"缺口: 容量跌<br/>又查不到根因\"}}\n  ASG --> UNH --> TERM\n  TERM -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  UNH[\"标记 unhealthy\"]\n  SUS[\"暂停 Terminate\"]\n  SSM[\"Session Manager<br/>登入除错\"]\n  FIX[\"修好后恢复\"]\n  UNH --> SUS --> SSM --> FIX"
  },
  "110": {
    "blocker": "多帐户／OU 要集中管 WAF，帐户会动态进出，不合规要能自动修。",
    "requirements": "组织级集中 WAF 治理；动态帐户清单；自动修复；营运负担低。",
    "steps": [
      "用 Firewall Manager（组织级防火墙／WAF 集中管理）下发 WAF 政策。",
      "帐户／OU 清单放 Parameter Store 方便动态维护。",
      "EventBridge + Lambda 喺清单变更时更新政策范围。"
    ],
    "solutions": "正确答案是 A。Firewall Manager 就系为组织集中管 WAF 而生。",
    "result_flow": "Firewall Manager 政策 → 套到帐户／OU → 新帐户纳管 → 不合规自动修正。",
    "options": {
      "A": "✓ 正确。Firewall Manager + 动态清单系最低负担。",
      "B": "错。Config+StackSets 可行但较重。",
      "C": "错。手写跨帐 Lambda 改 WAF 运维地狱。",
      "D": "错。Control Tower 唔直接管 WAF 规则细节。"
    },
    "diagram_before": "flowchart TB\n  ORG[\"多帐户 / OU\"]\n  WAF1[\"帐户 A WAF\"]\n  WAF2[\"帐户 B WAF\"]\n  X{{\"缺口: 集中管 WAF<br/>帐户动态进出\"}}\n  ORG --> WAF1\n  ORG --> WAF2\n  WAF1 -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  FM[\"Firewall Manager<br/>政策\"]\n  OU[\"帐户 / OU\"]\n  NEW[\"新帐户自动纳管\"]\n  FIX[\"不合规自动修正\"]\n  FM --> OU --> NEW\n  FM --> FIX"
  },
  "111": {
    "blocker": "Lambda 用环境变数存 Aurora 密码，汇总后写 S3（KMS）。要求资料唔好行公网，凭证外泄影响要最小。",
    "requirements": "短期凭证登入 DB；S3 走私有网路。",
    "steps": [
      "启用 Aurora IAM 资料库验证（用短期 token 登入，少放长期密码）。",
      "Lambda 执行角色取得连库 token，唔再放长期密码。",
      "建 S3 Gateway VPC Endpoint，令存取 S3 唔经网际网路。"
    ],
    "solutions": "正确答案是 A。IAM DB Auth 换掉长期密码；S3 Gateway Endpoint 令流量留喺 AWS 网路。",
    "result_flow": "Lambda → IAM token 连 Aurora；Lambda → VPC Endpoint → S3（KMS），全程私有。",
    "options": {
      "A": "✓ 正确。IAM 认证 + S3 Gateway Endpoint。",
      "B": "错。仍然可能经公网，不符要求。",
      "C": "错。Parameter Store 仍然可能系静态长期凭证。",
      "D": "错。Secrets Manager 有帮助，但未完整满足私有网路存取组合。"
    },
    "diagram_before": "flowchart TB\n  L[\"Lambda<br/>环境变数存密码\"]\n  AUR[\"Aurora\"]\n  S3[\"S3 KMS 加密\"]\n  X{{\"缺口: 凭证外泄风险<br/>+ 流量走公网\"}}\n  L --> AUR\n  L --> S3\n  L -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart LR\n  L[\"Lambda\"]\n  IAM[\"IAM DB Auth<br/>短期 token\"]\n  AUR[\"Aurora\"]\n  EP[\"S3 Gateway<br/>Endpoint\"]\n  S3[\"S3 + KMS\"]\n  L --> IAM --> AUR\n  L --> EP --> S3"
  },
  "112": {
    "blocker": "游戏公司云上成本入面，开发者乱开贵嘅 EC2 类型造成浪费，要喺启动当下挡住。",
    "requirements": "只允许核准实例类型；喺 API 层强制，唔系事后先发现。",
    "steps": [
      "建立 IAM 政策，用条件限制允许嘅 ec2:InstanceType。",
      "把政策附加到开发者所在 IAM 群组。",
      "开发者 RunInstances 不合规类型会被拒。"
    ],
    "solutions": "正确答案是 C。IAM 条件喺启动当下拒绝；Config 多数事后侦测；Launch Template 唔能强制一定要用。",
    "result_flow": "开发者启动 EC2 → IAM 检查实例类型 → 唔喺白名单就拒绝 → 成本受控。",
    "options": {
      "A": "错。Config 多数事后侦测，唔能喺启动当下阻止。",
      "B": "错。Launch Template 指派唔能强制开发者一定用。",
      "C": "✓ 正确。IAM 条件喺 API 层阻止不合规类型。",
      "D": "错。Image Builder 整黄金映像，唔限制实例类型。"
    },
    "diagram_before": "flowchart TB\n  DEV[\"开发者\"]\n  EC2[\"乱开贵价<br/>EC2 类型\"]\n  BILL[\"云上成本浪费\"]\n  X{{\"缺口: 启动当下<br/>挡不住\"}}\n  DEV --> EC2 --> BILL\n  BILL -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  DEV[\"开发者启动 EC2\"]\n  IAM[\"IAM 条件<br/>检查实例类型\"]\n  OK[\"白名单: 允许\"]\n  NO[\"非白名单: 拒绝\"]\n  DEV --> IAM\n  IAM --> OK\n  IAM --> NO"
  },
  "113": {
    "blocker": "多帐户专案要用 Project 标签分摊成本，但好多 EC2 缺标签，仲要防止以后再漏。",
    "requirements": "找出既有缺标签资源；组织层级阻止无标签启动；跨帐户汇总清单。",
    "steps": [
      "各帐户建 Config 规则找出缺 Project 标签嘅资源。",
      "用 SCP（组织层级禁止规则）拒绝缺少 Project 标签嘅 ec2:RunInstances。",
      "建 Config Aggregator 汇整全组织缺标签清单。"
    ],
    "solutions": "正确答案是 A、B、E。侦测（Config）+ 预防（SCP）+ 汇总（Aggregator）。",
    "result_flow": "SCP 挡新实例无标签 → Config 扫既有不合规 → Aggregator 汇总畀团队补标 → 成本可归因。",
    "options": {
      "A": "✓ 正确。各帐户 Config 规则侦测缺标签 EC2。",
      "B": "✓ 正确。SCP 组织级拒绝无标签启动。",
      "C": "错。Inspector 系漏洞扫描，唔系标签合规。",
      "D": "错。逐帐户 IAM 唔能跨组织统一强制。",
      "E": "✓ 正确。Config Aggregator 汇整全组织清单。",
      "F": "错。Security Hub 唔系缺标签汇总首选。"
    },
    "diagram_before": "flowchart TB\n  ACC[\"多帐户专案\"]\n  EC2[\"大量 EC2\"]\n  TAG[\"缺 Project 标签\"]\n  X{{\"缺口: 成本难分摊<br/>+ 防再漏\"}}\n  ACC --> EC2 --> TAG\n  TAG -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  SCP[\"SCP 挡<br/>无标签启动\"]\n  CFG[\"Config 扫<br/>既有不合规\"]\n  AGG[\"Config Aggregator<br/>汇总清单\"]\n  FIX[\"团队补标签\"]\n  COST[\"成本可归因\"]\n  SCP --> CFG --> AGG --> FIX --> COST"
  },
  "114": {
    "blocker": "地端 PostgreSQL 监控库灌爆、储存不够，已有 VPN，想要托管缓冲、动态 schema、近即时仪表板、少持续管理。",
    "requirements": "托管缓冲同转换；搜寻型储存食 JSON；近即时视觉化。",
    "steps": [
      "用 Kinesis Data Firehose（托管串流投递）缓冲事件，并用 Lambda 转换。",
      "把结果送入 OpenSearch，用 Kibana 做近即时仪表板。",
      "确认 JSON／动态栏位可以被搜寻同展示。"
    ],
    "solutions": "正确答案是 A、D。Firehose 全托管缓冲；OpenSearch+Kibana 适合半结构化事件。",
    "result_flow": "地端事件 → VPN → Firehose（+Lambda 转换）→ OpenSearch → Kibana 仪表板。",
    "options": {
      "A": "✓ 正确。Firehose 全托管缓冲 + Lambda 转换。",
      "B": "错。Kinesis Data Streams 要自己管 shard。",
      "C": "错。Aurora 唔适合动态 schema 事件监控。",
      "D": "✓ 正确。OpenSearch + Kibana 近即时视觉化。",
      "E": "错。Neptune 系图资料库，唔适合呢个场景。"
    },
    "diagram_before": "flowchart TB\n  PG[\"地端 PostgreSQL<br/>监控库\"]\n  FULL[\"储存灌爆\"]\n  VPN[\"已有 VPN\"]\n  X{{\"缺口: 要托管缓冲<br/>近即时仪表板\"}}\n  PG --> FULL\n  PG -.-> VPN\n  FULL -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart LR\n  EVT[\"地端事件\"] -->|VPN| FH[\"Kinesis Firehose\"]\n  FH --> L[\"Lambda 转换\"]\n  L --> OS[\"OpenSearch\"]\n  OS --> KB[\"Kibana 仪表板\"]"
  },
  "115": {
    "blocker": "私有子网工作负载经 NAT Gateway 狂打 Kinesis，NatGateway-Bytes 帐单好痛。",
    "requirements": "维持功能；降低 NAT 费用。",
    "steps": [
      "喺 VPC 建立 Kinesis Data Streams 嘅 Interface VPC Endpoint（PrivateLink 介面端点）。",
      "设定 endpoint policy 允许应用存取。",
      "流量改走 AWS 私有网路，唔再经 NAT。"
    ],
    "solutions": "正确答案是 D。Interface Endpoint 令 Kinesis API 唔经 NAT，直接悭流量费。",
    "result_flow": "应用（私有子网）→ Interface Endpoint → Kinesis；NAT 唔再承载呢段流量 → 费用下降。",
    "options": {
      "A": "错。只分析 Flow Logs 唔直接悭钱。",
      "B": "错。缺少 endpoint policy 描述唔完整。",
      "C": "错。Detective 系安全调查，唔系成本优化。",
      "D": "✓ 正确。Endpoint + policy，绕过 NAT。"
    },
    "diagram_before": "flowchart TB\n  APP[\"私有子网<br/>工作负载\"]\n  NAT[\"NAT Gateway\"]\n  KIN[\"Kinesis\"]\n  BILL[\"NatGateway-Bytes<br/>帐单痛\"]\n  X{{\"缺口: 流量费过高\"}}\n  APP --> NAT --> KIN\n  NAT --> BILL\n  BILL -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart LR\n  APP[\"私有子网应用\"]\n  EP[\"Interface Endpoint\"]\n  KIN[\"Kinesis API\"]\n  SAVE[\"不再经 NAT<br/>费用下降\"]\n  APP --> EP --> KIN --> SAVE"
  },
  "116": {
    "blocker": "欧洲机房有两条 DX 到唔同 location，AWS 有 eu-west-1 同 us-east-1 嘅 TGW。要地端入两 Region、Region 间 VPC 互通，无单点故障。",
    "requirements": "双 DX 高可用；跨 Region VPC 互通；正确 VIF 类型。",
    "steps": [
      "两条 DX 各建 transit VIF 接到同一个 Direct Connect Gateway。",
      "两个 Region 嘅 Transit Gateway 都关联到该 DX Gateway。",
      "两个 TGW 做 peering 支援跨 Region 路由。"
    ],
    "solutions": "正确答案是 D。要用 transit VIF；DX Gateway 唔会自己喺 TGW 之间路由，跨 Region 靠 TGW peering。",
    "result_flow": "地端 → DX-A／DX-B → 同一 DX Gateway → 各 Region TGW → VPC；跨 Region 走 TGW peering。",
    "options": {
      "A": "错。Private VIF 模式唔适合呢个 TGW 集中架构。",
      "B": "错。两个 DX Gateway 唔能互 peer 做 HA／跨 Region。",
      "C": "错。DX Gateway 唔会喺 TGW 之间直接路由。",
      "D": "✓ 正确。Transit VIF + 单一 DXGW + TGW 关联 + TGW peering。"
    },
    "diagram_before": "flowchart TB\n  EU[\"欧洲机房\"]\n  DXA[\"DX location A\"]\n  DXB[\"DX location B\"]\n  R1[\"eu-west-1 TGW\"]\n  R2[\"us-east-1 TGW\"]\n  X{{\"缺口: 地端进两 Region<br/>+ Region 间互通\"}}\n  EU --> DXA\n  EU --> DXB\n  DXA -.-> X\n  DXB -.-> X\n  R1 -.-> X\n  R2 -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  ONP[\"地端\"]\n  DX[\"DX-A / DX-B<br/>Transit VIF\"]\n  DXGW[\"同一 DX Gateway\"]\n  TGW1[\"eu-west-1 TGW\"]\n  TGW2[\"us-east-1 TGW\"]\n  VPC[\"各 Region VPC\"]\n  ONP --> DX --> DXGW\n  DXGW --> TGW1 --> VPC\n  DXGW --> TGW2 --> VPC\n  TGW1 -.->|TGW peering| TGW2"
  },
  "117": {
    "blocker": "新建 IAM 使用者要先被安全团队核准；一建立就要拎走存取权并通知。已有多 Region CloudTrail。",
    "requirements": "侦测 CreateUser；自动撤权；SNS 通知。三步骤。",
    "steps": [
      "EventBridge 规则匹配 CloudTrail 嘅 CreateUser。",
      "触发 Step Functions 移除新使用者存取。",
      "用 SNS 通知安全团队核准。"
    ],
    "solutions": "正确答案是 A、D、E。CloudTrail 唔直接 SNS；ECS 过重；Pinpoint 偏行销。",
    "result_flow": "CreateUser → CloudTrail → EventBridge → Step Functions 撤权 → SNS 通知安全 → 人工核准。",
    "options": {
      "A": "✓ 正确。EventBridge 听 CreateUser。",
      "B": "错。CloudTrail 唔直接发 SNS。",
      "C": "错。ECS 过重。",
      "D": "✓ 正确。Step Functions 撤权。",
      "E": "✓ 正确。SNS 通知安全团队。",
      "F": "错。Pinpoint 偏行销简讯，唔适合内部安全核准。"
    },
    "diagram_before": "flowchart TB\n  IAM[\"新建 IAM 使用者\"]\n  CT[\"多 Region CloudTrail\"]\n  NEED[\"安全先核准\"]\n  X{{\"缺口: 建立即撤权<br/>并通知\"}}\n  IAM --> CT\n  IAM --> NEED\n  NEED -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  CU[\"CreateUser\"]\n  CT[\"CloudTrail\"]\n  EB[\"EventBridge\"]\n  SF[\"Step Functions<br/>撤权\"]\n  SNS[\"SNS 通知安全\"]\n  CU --> CT --> EB --> SF --> SNS"
  },
  "118": {
    "blocker": "要多帐户（dev／staging／prod／shared network）、集中 MFA 登入、私有网路：prod 同 shared 连所有，dev 同 staging 只互连。",
    "requirements": "Landing zone；SSO+MFA；TGW 路由隔离。三步骤。",
    "steps": [
      "用 Control Tower 部署 landing zone 并纳管帐户。",
      "各帐户用 Transit Gateway 附件同路由表控制边个连边个。",
      "启用 IAM Identity Center，权限集强制 MFA。"
    ],
    "solutions": "正确答案是 A、C、D。Security Hub 唔系帐户工厂；Control Tower 唔管路由。",
    "result_flow": "Control Tower 开帐 → Identity Center MFA 登入 → TGW 路由：prod／shared 全通、dev↔staging 互连。",
    "options": {
      "A": "✓ 正确。Control Tower landing zone。",
      "B": "错。Security Hub 唔系帐户／网路治理主方案。",
      "C": "✓ 正确。TGW 控制私有连通。",
      "D": "✓ 正确。Identity Center + MFA。",
      "E": "错。Control Tower 唔管帐户间路由。",
      "F": "错。手建 IAM 使用者 + Cognito 唔符合集中 SSO 最佳实务。"
    },
    "diagram_before": "flowchart TB\n  DEV[\"dev\"]\n  STG[\"staging\"]\n  PROD[\"prod\"]\n  NET[\"shared network\"]\n  X{{\"缺口: 多帐户工厂<br/>+ MFA + 私有连通规则\"}}\n  DEV -.-> X\n  STG -.-> X\n  PROD -.-> X\n  NET -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  CT[\"Control Tower<br/>开帐\"]\n  IDC[\"Identity Center<br/>+ MFA\"]\n  TGW[\"TGW 路由\"]\n  PS[\"prod / shared<br/>全通\"]\n  DS[\"dev ↔ staging\"]\n  CT --> IDC --> TGW\n  TGW --> PS\n  TGW --> DS"
  },
  "119": {
    "blocker": "dev／test 其实只喺工作日白天用，但 24/7 开住，想悭钱同运维少。资源已有 environment 标签。",
    "requirements": "工作日下班停、上班开非生产运算；唔好 terminate+restore。",
    "steps": [
      "EventBridge 工作日傍晚触发 Lambda，依 tag 停止 dev／test 实例。",
      "工作日早上另一条规则触发 Lambda 依 tag 启动。",
      "prod 唔喺停止清单，维持 24/7。"
    ],
    "solutions": "正确答案是 B。stop／start 比 terminate／restore 轻；分早晚两条规则清楚。",
    "result_flow": "工作日晚间 → 停 development／testing EC2 → 次日早上启动 → 电费下降。",
    "options": {
      "A": "错。每日一次难分工作日同起停逻辑。",
      "B": "✓ 正确。工作日早晚 stop／start。",
      "C": "错。terminate／restore 过重又慢。",
      "D": "错。每小时 terminate／restore 负担高。"
    },
    "diagram_before": "flowchart TB\n  DEV[\"dev / test EC2\"]\n  TAG[\"environment 标签\"]\n  RUN[\"24/7 开着\"]\n  X{{\"缺口: 只白天用<br/>浪费电费\"}}\n  DEV --> TAG\n  DEV --> RUN\n  RUN -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  EVE[\"工作日晚间\"]\n  STOP[\"Stop development<br/>/ testing EC2\"]\n  MORN[\"次日早上\"]\n  START[\"Start 实例\"]\n  SAVE[\"电费下降\"]\n  EVE --> STOP --> MORN --> START --> SAVE"
  },
  "120": {
    "blocker": "多 Region API Gateway + Lambda 嘅 SaaS，Premium 客户尖峰时收到 429，而且 Lambda 完全冇被叫到。",
    "requirements": "揾出限流发生喺边一层；恢复 Premium 吞吐。",
    "steps": [
      "确认 429 且 Lambda 未触发 → 挡喺 API Gateway。",
      "对照 API Gateway 帐户层级每秒请求配额（多 API 共享）。",
      "向 AWS 申请提高帐户级 throttle 限额。"
    ],
    "solutions": "正确答案是 C。Lambda 都冇被叫到，唔系 Lambda 并发问题，而系 API Gateway 帐户级限流。",
    "result_flow": "客户请求 → API Gateway 帐户级 RPS 满 → 429 → Lambda 零呼叫；提高限额后先入 Lambda。",
    "options": {
      "A": "错。Lambda 并发限制会先「呼叫到 Lambda」先限流。",
      "B": "错。同样系 Lambda 层问题，症状不符。",
      "C": "✓ 正确。帐户级 API Gateway 限流会喺到达 Lambda 前 429。",
      "D": "错。单 method 预设限额通常唔系多客户同时尖峰主因。"
    },
    "diagram_before": "flowchart TB\n  CLI[\"Premium 客户\"]\n  APIG[\"API Gateway<br/>多 Region\"]\n  L[\"Lambda\"]\n  X{{\"缺口: 尖峰 429<br/>Lambda 零呼叫\"}}\n  CLI --> APIG\n  APIG -.-> X\n  APIG -.->|未到达| L\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  CLI[\"客户请求\"]\n  QUOTA[\"提高帐户级<br/>API Gateway RPS\"]\n  APIG[\"API Gateway\"]\n  L[\"Lambda 处理\"]\n  OK[\"不再前置 429\"]\n  CLI --> QUOTA --> APIG --> L --> OK"
  },
  "121": {
    "blocker": "Web 要迁 EC2，但用咗 15 年嘅第三方安全工具冇云端版，必须即时检查进出 VPC 封包，又要高可用。",
    "requirements": "把虚拟安全设备透明串入流量；可扩展。选两个步骤。",
    "steps": [
      "喺 Auto Scaling 部署安全工具 EC2。",
      "每 AZ 布署 Gateway Load Balancer（专门串接第三方安全设备）。",
      "检查通过后流量返原路径到应用。"
    ],
    "solutions": "正确答案是 A、D。GWLB 专为插入第三方防火墙／IDS 设计。",
    "result_flow": "流量 → GWLB → 安全工具 ASG 检查 → 应用；工具故障由 ASG 换节点。",
    "options": {
      "A": "✓ 正确。ASG 跑第三方安全工具，可扩展高可用。",
      "B": "错。NLB 取代唔到 GWLB 透明串接模型。",
      "C": "错。ALB 放安全工具前唔系正确嵌入模式。",
      "D": "✓ 正确。每 AZ GWLB 导流做封包检查。",
      "E": "错。Transit Gateway 系连 VPC，唔系 VPC 内流量检查。"
    },
    "diagram_before": "flowchart TB\n  WEB[\"Web 要迁 EC2\"]\n  TOOL[\"15 年第三方<br/>安全工具\"]\n  NOC[\"无云端版本\"]\n  X{{\"缺口: 即时检查<br/>进出 VPC 封包\"}}\n  WEB --> TOOL\n  TOOL --> NOC\n  NOC -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart LR\n  TRAF[\"进出流量\"]\n  GWLB[\"Gateway Load Balancer\"]\n  ASG[\"安全工具 ASG\"]\n  APP[\"应用\"]\n  TRAF --> GWLB --> ASG --> APP"
  },
  "122": {
    "blocker": "多厂商 IoT 各有私有格式，每日先批次转 JSON 入关联式库，分析又慢又贵。",
    "requirements": "更快更省嘅近即时接收、解析同分析。",
    "steps": [
      "感测器连 AWS IoT Core（物联网装置连线同规则）。",
      "规则触发 Lambda 解析各格式，落地 S3。",
      "Glue Catalog + Athena + QuickSight 分析。"
    ],
    "solutions": "正确答案是 A。IoT Core + 无伺服器分析系标准；Fargate+Redshift 较重。",
    "result_flow": "感测器 → IoT Core → Lambda → S3 → Glue／Athena／QuickSight。",
    "options": {
      "A": "✓ 正确。IoT 标准无伺服器分析管线。",
      "B": "错。Fargate+Redshift 成本同维护较高。",
      "C": "错。SFTP 多余，IoT Core 更直接。",
      "D": "错。Snowball 唔适合持续 IoT 串流。"
    },
    "diagram_before": "flowchart TB\n  IOT[\"多厂商 IoT<br/>私有格式\"]\n  BAT[\"每日批次转 JSON\"]\n  RDB[\"关联式库\"]\n  X{{\"缺口: 分析慢又贵\"}}\n  IOT --> BAT --> RDB\n  RDB -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart LR\n  SEN[\"感测器\"] --> IOT[\"IoT Core\"]\n  IOT --> L[\"Lambda\"]\n  L --> S3[\"S3\"]\n  S3 --> AN[\"Glue / Athena\"]\n  AN --> QS[\"QuickSight\"]"
  },
  "123": {
    "blocker": "中央网路帐户已有 Direct Connect，未来数百 VPC。地端要通所有 VPC，而且 AWS 出站要走地端 NAT，唔可以直接上公网。",
    "requirements": "可扩展中枢；跨帐户挂 VPC；只私有子网、出站返地端。三步骤。",
    "steps": [
      "中央帐户建 Direct Connect Gateway + Transit Gateway，用 transit VIF 连接。",
      "用 RAM 分享 TGW，各帐户 VPC attach 到 TGW。",
      "只建私有子网，路由经 TGW 令出站走地端 NAT。"
    ],
    "solutions": "正确答案是 B、D、F。TGW 先扛得起数百 VPC；IGW 会直接出公网违规。",
    "result_flow": "地端 ↔ DX ↔ DX Gateway ↔ TGW ↔ 各 VPC；出站 → TGW → 地端 NAT → 网际网路。",
    "options": {
      "A": "错。每 VPC 虚拟私有闸道模式唔适合数百 VPC。",
      "B": "✓ 正确。DX Gateway + TGW + transit VIF。",
      "C": "错。IGW 直接上网，违规。",
      "D": "✓ 正确。分享 TGW 并 attach VPC。",
      "E": "错。大规模 Peering 唔可扩展。",
      "F": "✓ 正确。只私有子网，出站返地端 NAT。"
    },
    "diagram_before": "flowchart TB\n  ONP[\"地端\"]\n  DX[\"中央网路帐户<br/>Direct Connect\"]\n  VPC[\"未来数百 VPC\"]\n  X{{\"缺口: 全 VPC 互通<br/>出站必须走地端 NAT\"}}\n  ONP --> DX\n  DX -.-> VPC\n  VPC -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  ONP[\"地端\"] <--> DX[\"DX + DX Gateway\"]\n  DX <--> TGW[\"Transit Gateway\"]\n  TGW <--> VPC[\"各 VPC 私有子网\"]\n  OUT[\"出站\"] --> TGW\n  TGW --> NAT[\"地端 NAT\"]\n  NAT --> INET[\"网际网路\"]"
  },
  "124": {
    "blocker": "数百帐户以前可以自己买／改 RI，而家要强制走中央采购，唔可以再私下下单。",
    "requirements": "组织层级硬挡 RI 购买同修改；需要全功能 Organizations。",
    "steps": [
      "确保所有帐户喺 Organizations 而且 all features enabled。",
      "建立 SCP 拒绝购买／修改 RI 嘅 API。",
      "把 SCP 挂到各 OU。"
    ],
    "solutions": "正确答案是 A、D。全功能模式先用得 SCP；Config 只能报告；合并帐单 alone 唔够。",
    "result_flow": "成员帐户尝试买 RI → SCP 拒绝 → 只能提需求畀中央采购。",
    "options": {
      "A": "✓ 正确。SCP 需要 all features。",
      "B": "错。Config 唔能阻止 API。",
      "C": "错。分散 IAM 挡唔住管理员。",
      "D": "✓ 正确。OU 级 SCP 统一禁止。",
      "E": "错。得 consolidated billing 唔能套 SCP。"
    },
    "diagram_before": "flowchart TB\n  ACC[\"数百帐户\"]\n  BUY[\"各自买/改 RI\"]\n  CTRL[\"要中央采购\"]\n  X{{\"缺口: 无法禁止<br/>私下下单\"}}\n  ACC --> BUY\n  CTRL -.-> X\n  BUY -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  FEAT[\"Organizations<br/>all features\"]\n  SCP[\"OU 级 SCP<br/>禁止买 RI\"]\n  REQ[\"提需求给<br/>中央采购\"]\n  FEAT --> SCP\n  BUY[\"成员尝试买 RI\"] --> SCP\n  SCP -->|拒绝| REQ"
  },
  "125": {
    "blocker": "关键应用用 Multi-AZ RDS MySQL，演练故障转移要 40 秒中断，目标要压到 20 秒内。",
    "requirements": "缩短 DB 故障转移；应用连线快速重连。三步骤。",
    "steps": [
      "把资料库迁到 Aurora MySQL。",
      "建立 Aurora Replica。",
      "前面加 RDS Proxy（连线池代理）管理连线并喺切换时重连。"
    ],
    "solutions": "正确答案是 C、D、E。Aurora 转移较快；Proxy 减少应用中断；快取层解唔到 failover 时间。",
    "result_flow": "应用 → RDS Proxy → Aurora（含 Replica）；故障 → 快速提升 → Proxy 重路由 → 中断缩短。",
    "options": {
      "A": "错。Memcached 解唔到 failover 中断。",
      "B": "错。Redis 同样唔系 failover 解法。",
      "C": "✓ 正确。RDS Proxy 缩短连线中断。",
      "D": "✓ 正确。迁 Aurora 缩短转移。",
      "E": "✓ 正确。Aurora Replica 协助快速切换。",
      "F": "错。传统 MySQL read replica 提升慢过 Aurora。"
    },
    "diagram_before": "flowchart TB\n  APP[\"关键应用\"]\n  RDS[\"Multi-AZ<br/>RDS MySQL\"]\n  FO[\"故障转移 ~40 秒\"]\n  X{{\"缺口: 要压到<br/>20 秒内\"}}\n  APP --> RDS --> FO\n  FO -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart LR\n  APP[\"应用\"] --> PROXY[\"RDS Proxy\"]\n  PROXY --> AUR[\"Aurora + Replica\"]\n  FAIL[\"故障\"] --> PROMOTE[\"快速提升\"]\n  PROMOTE --> PROXY\n  PROXY --> OK[\"中断缩短\"]"
  },
  "126": {
    "blocker": "合作伙伴要用 API／CLI 存取客户另一个组织嘅帐户资源，要最安全而且最小权限。",
    "requirements": "跨组织临时凭证；防混淆代理；唔好分享长期金钥。",
    "steps": [
      "客户建立 IAM 角色并只附必要权限。",
      "信任政策纳入合作伙伴帐户并要求 External ID（防混淆代理密语）。",
      "合作伙伴用 Role ARN + External ID 做 AssumeRole。"
    ],
    "solutions": "正确答案是 D。Role + External ID 系跨帐户最安全模式。",
    "result_flow": "合作伙伴 CLI → AssumeRole(ARN, ExternalId) → 临时凭证 → 呼叫客户 API。",
    "options": {
      "A": "错。分享 access key 极度不安全。",
      "B": "错。长期 IAM user 凭证唔建议。",
      "C": "错。有 Role 但缺 External ID。",
      "D": "✓ 正确。Role ARN + External ID 最安全。"
    },
    "diagram_before": "flowchart TB\n  PART[\"合作伙伴<br/>API / CLI\"]\n  ORG[\"客户另一组织\"]\n  RES[\"帐户资源\"]\n  X{{\"缺口: 最安全<br/>最小权限跨帐\"}}\n  PART -.-> X\n  X -.-> ORG --> RES\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart LR\n  PART[\"合作伙伴 CLI\"]\n  AR[\"AssumeRole<br/>+ External ID\"]\n  TMP[\"临时凭证\"]\n  API[\"呼叫客户 API\"]\n  PART --> AR --> TMP --> API"
  },
  "127": {
    "blocker": "第三方提供公开 Docker 映像做路线规划，要大量启动容器并标签，希望少管机器。",
    "requirements": "容器化执行；可水平扩；task 可标记。",
    "steps": [
      "建立 ECS on Fargate 丛集。",
      "用 run-task 并启用 ECS managed tags／自订 tags。",
      "按配送分区启动多个 task。"
    ],
    "solutions": "正确答案是 D。ECS Fargate + run-task 标签符合需求，比 EKS／EC2 管理更轻。",
    "result_flow": "run-task → Fargate 拉映像 → 按标签执行 → 产出路线图。",
    "options": {
      "A": "错。EKS on EC2 管理较重。",
      "B": "错。标签方式不如 ECS managed tags 直接。",
      "C": "错。ECS on EC2 要管实例。",
      "D": "✓ 正确。ECS Fargate + run-task 标签，负担最低。"
    },
    "diagram_before": "flowchart TB\n  IMG[\"第三方公开<br/>Docker 映像\"]\n  NEED[\"大量启动容器\"]\n  TAG[\"需要标签\"]\n  X{{\"缺口: 少管机器\"}}\n  IMG --> NEED --> TAG\n  TAG -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart LR\n  RUN[\"ecs run-task\"]\n  FG[\"Fargate 拉映像\"]\n  TAG[\"按标签执行\"]\n  OUT[\"产出路线图\"]\n  RUN --> FG --> TAG --> OUT"
  },
  "128": {
    "blocker": "两个帐户想做 VPC Peering，但连线起唔到或路由唔通，要找出根因（选两个）。",
    "requirements": "检查 CIDR 有冇重叠；检查接受方 IAM／权限是否允许 peering。",
    "steps": [
      "核对两边 VPC CIDR 有冇重叠（例如 10.10.0.0/16 同 10.10.10.0/24）。",
      "检查接受方帐户 IAM role 有冇正确 peering 权限。",
      "修正重叠网段或补齐权限后重新建立 peering。"
    ],
    "solutions": "正确答案是 A、E。CIDR 重叠会令 peering 失败；接受方缺权限亦建唔成。",
    "result_flow": "检查 CIDR → 无重叠先建立 peering → 接受方有权限接受 → 更新路由表互通。",
    "options": {
      "A": "✓ 正确。10.10.0.0/16 包住 10.10.10.0/24，CIDR 重叠系 Peering 失败常见原因。",
      "B": "错。VPC Peering 支援跨 Region，唔系失败原因。",
      "C": "错。VPC Peering 唔需要 Internet Gateway。",
      "D": "错。VPC Peering 唔使经 RAM 分享 VPC。",
      "E": "✓ 正确。接受方 IAM 要有 AcceptVpcPeeringConnection 等权限。"
    },
    "diagram_before": "flowchart TB\n  A[\"帐户 A VPC<br/>10.10.0.0/16\"]\n  B[\"帐户 B VPC<br/>10.10.10.0/24\"]\n  PEER[\"VPC Peering\"]\n  X{{\"缺口: 连线起不了<br/>或路由不通\"}}\n  A -.-> PEER\n  B -.-> PEER\n  PEER -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  CIDR[\"检查 CIDR<br/>无重叠\"]\n  REQ[\"建立 Peering\"]\n  IAM[\"接受方有<br/>Accept 权限\"]\n  RT[\"更新双方路由表\"]\n  OK[\"互通成功\"]\n  CIDR --> REQ --> IAM --> RT --> OK"
  },
  "129": {
    "blocker": "想为 IAM 实体收敛到最小权限，但唔知实际用咗边啲 API。",
    "requirements": "记录 API 活动；根据实际使用产生最小权限建议。",
    "steps": [
      "启用 CloudTrail 记录帐户 API 活动。",
      "用 IAM Access Analyzer 根据实际使用产生最小权限政策建议。",
      "把建议收敛后套用到角色／使用者。"
    ],
    "solutions": "正确答案是 B。CloudTrail + Access Analyzer 可以根据真实呼叫产生最小权限政策。",
    "result_flow": "API 呼叫 → CloudTrail 记录 → Access Analyzer 分析 → 产出最小权限政策 → 套用。",
    "options": {
      "A": "错。CodeGuru 系程式码品质分析，唔系 IAM 权限分析。",
      "B": "✓ 正确。CloudTrail 记录实际 API + Access Analyzer 产生最小权限政策，工作量最低。",
      "C": "错。手写脚本解析 CloudTrail 工作量大又易错。",
      "D": "错。EMR 处理 CloudTrail 过度复杂，Access Analyzer 已内建。"
    },
    "diagram_before": "flowchart TB\n  IAM[\"IAM 实体\"]\n  PERM[\"现有权限偏阔\"]\n  API[\"实际 API 不明\"]\n  X{{\"缺口: 收敛到<br/>最小权限\"}}\n  IAM --> PERM --> API\n  API -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart LR\n  API[\"API 呼叫\"]\n  CT[\"CloudTrail 记录\"]\n  AA[\"Access Analyzer\"]\n  POL[\"最小权限政策\"]\n  APPLY[\"套用收敛\"]\n  API --> CT --> AA --> POL --> APPLY"
  },
  "130": {
    "blocker": "想 rightsize EC2，但预设指标未必有记忆体，建议唔准。",
    "requirements": "收集记忆体等指标；用 Compute Optimizer 攞建议并调整。",
    "steps": [
      "安装 CloudWatch agent，收集记忆体等主机指标。",
      "启用 Compute Optimizer 取得 rightsize 建议。",
      "按建议调整 EC2 实例类型以悭成本。"
    ],
    "solutions": "正确答案是 C。CloudWatch agent 补记忆体指标 + Compute Optimizer 系 rightsize 标准组合。",
    "result_flow": "CloudWatch agent 报 CPU／记忆体 → Compute Optimizer 分析 → 建议更合适实例 → 调整后悭成本。",
    "options": {
      "A": "错。手动仪表板定期检视效率低。",
      "B": "错。手动分析指标不如 Compute Optimizer 自动化精准。",
      "C": "✓ 正确。CloudWatch agent 收集记忆体 + Compute Optimizer rightsize，最具成本效益。",
      "D": "错。Enterprise Support 有额外费用，建议亦不如 Compute Optimizer 精准。"
    },
    "diagram_before": "flowchart TB\n  EC2[\"EC2 机群\"]\n  CPU[\"有 CPU 指标\"]\n  MEM[\"缺记忆体指标\"]\n  X{{\"缺口: rightsize<br/>建议不准\"}}\n  EC2 --> CPU\n  EC2 --> MEM\n  MEM -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  AG[\"CloudWatch agent<br/>报 CPU/记忆体\"]\n  CO[\"Compute Optimizer\"]\n  REC[\"实例建议\"]\n  ADJ[\"调整后悭成本\"]\n  AG --> CO --> REC --> ADJ"
  },
  "131": {
    "blocker": "DBA 帐户要安全存取应用帐户入面嘅资料库密钥（Secrets），要跨帐户最小权限。",
    "requirements": "应用帐户提供可被 Assume 嘅角色；DBA 用自己角色跨帐取密。",
    "steps": [
      "喺应用帐户建立可读 secrets 嘅 IAM 角色（例如 DBA-Secret）。",
      "信任政策允许 DBA 帐户管理角色 AssumeRole。",
      "DBA 用自己角色 Assume 过去攞密钥，唔好分享长期金钥。"
    ],
    "solutions": "正确答案是 B。跨帐户用角色链／AssumeRole 存取 secrets，唔好分享长期金钥。",
    "result_flow": "DBA-Admin（DBA 帐户）→ AssumeRole → 应用帐户 secret 角色 → 读 Secrets Manager。",
    "options": {
      "A": "错。RAM 分享 secrets 要额外处理 KMS，不如 AssumeRole 标准。",
      "B": "✓ 正确。应用帐户角色授权 secrets，DBA 用 AssumeRole 跨帐存取。",
      "C": "错。直接跨帐玩 KMS key policy 更复杂。",
      "D": "错。SCP 只能限制，唔能授予跨帐 secrets 存取。"
    },
    "diagram_before": "flowchart TB\n  DBA[\"DBA 帐户\"]\n  APP[\"应用帐户\"]\n  SM[\"Secrets 密钥\"]\n  X{{\"缺口: 跨帐安全读<br/>最小权限\"}}\n  DBA -.-> X\n  APP --> SM\n  X -.-> SM\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart LR\n  ADMIN[\"DBA-Admin\"]\n  ROLE[\"AssumeRole\"]\n  SEC[\"应用帐户<br/>secret 角色\"]\n  SM[\"Secrets Manager\"]\n  ADMIN --> ROLE --> SEC --> SM"
  },
  "132": {
    "blocker": "组织要限制只能用 ap-northeast-1，而且 DataOps OU 还要限制 EC2 实例类型。",
    "requirements": "用 SCP 喺 root 限 Region；用另一条 SCP 限 DataOps 实例类型。",
    "steps": [
      "建立 SCP，用 aws:RequestedRegion 只允许 ap-northeast-1，挂到 root OU。",
      "另建 SCP 用 ec2:InstanceType 限制 DataOps OU 允许嘅类型。",
      "确认条件键正确（唔好用无效嘅 ec2:Region）。"
    ],
    "solutions": "正确答案是 C、E。Region 限制用 aws:RequestedRegion；实例类型用 SCP 挂 DataOps OU。",
    "result_flow": "任何帐户 API → root SCP 检查 Region → DataOps 再检查实例类型 → 不合规即拒绝。",
    "options": {
      "A": "错。单一帐户 IAM 唔能跨组织强制。",
      "B": "错。逐 user inline policy 管理散。",
      "C": "✓ 正确。aws:RequestedRegion SCP 挂 root。",
      "D": "错。ec2:Region 唔系有效 SCP 条件键。",
      "E": "✓ 正确。DataOps OU 限制实例类型。"
    },
    "diagram_before": "flowchart TB\n  ORG[\"整个组织\"]\n  ANY[\"任意 Region API\"]\n  DATA[\"DataOps OU\"]\n  EC2[\"任意 EC2 类型\"]\n  X{{\"缺口: 要限 Region<br/>+ DataOps 实例类型\"}}\n  ORG --> ANY\n  DATA --> EC2\n  ANY -.-> X\n  EC2 -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  API[\"任何帐户 API\"]\n  ROOT[\"root SCP<br/>aws:RequestedRegion\"]\n  DO[\"DataOps OU SCP<br/>实例类型\"]\n  OK[\"合规才允许\"]\n  API --> ROOT --> DO --> OK"
  },
  "133": {
    "blocker": "无伺服器应用用 SNS→SQS→Lambda 处理 URL，而家单一 Region，想扩到其他 Region。",
    "requirements": "其他 Region 要有 SQS+Lambda；各 Region 伫列订阅来源 SNS。",
    "steps": [
      "喺其他 Region 部署 SQS 伫列同 Lambda。",
      "令各 Region 嘅 SQS 订阅来源 Region 嘅 SNS topic。",
      "SNS 自动把讯息推去所有订阅者处理。"
    ],
    "solutions": "正确答案是 A、C。SQS 订阅 SNS（方向唔好反）；SNS topic 唔使每个 Region 都建一份。",
    "result_flow": "发布 URL 到 SNS → 各 Region SQS 收到 → 各 Region Lambda 处理 → 结果落地。",
    "options": {
      "A": "✓ 正确。其他 Region 部署 SQS+Lambda。",
      "B": "错。订阅方向反咗。",
      "C": "✓ 正确。各 Region SQS 订阅来源 SNS。",
      "D": "错。SQS 唔系发布去 SNS。",
      "E": "错。SNS 唔使每个 Region 再部署一份。"
    },
    "diagram_before": "flowchart TB\n  SNS[\"SNS\"]\n  SQS[\"SQS\"]\n  L[\"Lambda\"]\n  R[\"单一 Region\"]\n  X{{\"缺口: 要扩到<br/>其他 Region\"}}\n  SNS --> SQS --> L --> R\n  R -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  PUB[\"发布 URL → SNS\"]\n  Q1[\"Region A SQS\"]\n  Q2[\"Region B SQS\"]\n  L1[\"Region A Lambda\"]\n  L2[\"Region B Lambda\"]\n  PUB --> Q1 --> L1\n  PUB --> Q2 --> L2"
  },
  "134": {
    "blocker": "有个唔改得嘅 Linux binary ETL，单线程、2GB RAM、好食 CPU，每 4 小时跑最多 20 分钟，想减少管机器。",
    "requirements": "免管伺服器执行容器；定时触发；执行时间可以超过 Lambda 15 分钟限制。",
    "steps": [
      "把 binary 放进容器，用 Fargate 跑。",
      "用 EventBridge 每 4 小时触发 Fargate task。",
      "确认唔使自己管 EC2 同唔好用会中断嘅 Spot 当唯一方案。"
    ],
    "solutions": "正确答案是 C。Fargate 无 15 分钟限制；EventBridge 定时最简洁。Lambda 最长 15 分钟唔够。",
    "result_flow": "EventBridge 每 4 小时 → 启动 Fargate task → 跑 binary 最多 20 分钟 → 结束释放。",
    "options": {
      "A": "错。Lambda 最长 15 分钟，而且 Logs 唔系定时触发器。",
      "B": "错。Batch+Step Functions 可行但更复杂。",
      "C": "✓ 正确。Fargate + EventBridge 最简洁。",
      "D": "错。Spot 可能中断，CodeDeploy 多余。"
    },
    "diagram_before": "flowchart TB\n  BIN[\"Linux binary ETL\"]\n  SPEC[\"单线程 2GB RAM\"]\n  JOB[\"每 4 小时 ≤20 分\"]\n  X{{\"缺口: 少管机器<br/>Lambda 15 分不够\"}}\n  BIN --> SPEC --> JOB\n  JOB -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart LR\n  EB[\"EventBridge<br/>每 4 小时\"]\n  FG[\"Fargate task\"]\n  RUN[\"跑 binary ≤20 分\"]\n  END[\"结束释放\"]\n  EB --> FG --> RUN --> END"
  },
  "135": {
    "blocker": "游戏要全球首周大流量，资产喺 S3、分数喺 DynamoDB，而家得单一 Region。",
    "requirements": "多 Region 资产同资料；CloudFront 回源可 failover；工作量合理。",
    "steps": [
      "另一 Region 建 S3 桶并开 Cross-Region Replication。",
      "CloudFront 设双 origin 同 origin failover。",
      "DynamoDB 用 Global Tables 做多 Region。"
    ],
    "solutions": "正确答案是 C。S3 CRR + CloudFront origin failover + DynamoDB Global Tables 最完整。",
    "result_flow": "玩家 → CloudFront → 主 S3 origin；主 origin 故障 → failover 到另一 Region S3；分数读写 Global Tables。",
    "options": {
      "A": "错。未完整处理 DynamoDB 多 Region 写入同 origin failover。",
      "B": "错。Same-Region Replication 唔跨 Region。",
      "C": "✓ 正确。CRR + origin failover + Global Tables。",
      "D": "错。Same-Region 唔降低全球延迟。"
    },
    "diagram_before": "flowchart TB\n  P[\"全球玩家\"]\n  S3[\"S3 资产<br/>单一 Region\"]\n  DDB[\"DynamoDB 分数<br/>单一 Region\"]\n  X{{\"缺口: 首周大流量<br/>无多 Region 备援\"}}\n  P --> S3\n  P --> DDB\n  S3 -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  P[\"玩家\"] --> CF[\"CloudFront\"]\n  CF -->|主| S3A[\"S3 主 Region\"]\n  CF -.->|failover| S3B[\"S3 备援 Region\"]\n  CRR[\"S3 CRR\"]\n  S3A --> CRR --> S3B\n  P --> GT[\"DynamoDB<br/>Global Tables\"]"
  },
  "136": {
    "blocker": "地端 Java + MongoDB 网站要搬 AWS，架构要相似、高可用，又唔可以改应用。",
    "requirements": "MongoDB 相容托管库；Java 后端跨多 AZ Auto Scaling。",
    "steps": [
      "用 DocumentDB（相容 MongoDB API）Multi-AZ 取代 MongoDB。",
      "Java 后端放 EC2 Auto Scaling 跨多个可用区。",
      "前面加负载平衡，保持应用连线字串／API 相容。"
    ],
    "solutions": "正确答案是 C。DocumentDB 相容 MongoDB 唔使改码；Aurora 系关联式唔相容。",
    "result_flow": "用户 → ALB → 跨 AZ EC2 Java → DocumentDB Multi-AZ。",
    "options": {
      "A": "错。Aurora 唔相容 MongoDB，要改应用。",
      "B": "错。自管 MongoDB 单 AZ 无高可用。",
      "C": "✓ 正确。DocumentDB Multi-AZ + 跨 AZ ASG。",
      "D": "错。DocumentDB 无呢种 on-demand 模式描述。"
    },
    "diagram_before": "flowchart TB\n  WEB[\"地端 Java 网站\"]\n  MONGO[\"MongoDB\"]\n  NEED[\"高可用相似架构\"]\n  X{{\"缺口: 搬 AWS<br/>又不能改码\"}}\n  WEB --> MONGO\n  WEB --> NEED\n  NEED -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart LR\n  U[\"用户\"] --> ALB[\"ALB\"]\n  ALB --> ASG[\"跨 AZ EC2 Java\"]\n  ASG --> DOC[\"DocumentDB<br/>Multi-AZ\"]"
  },
  "137": {
    "blocker": "Creative 帐户用自订 KMS 加密 S3，Strategy 帐户 strategy_reviewer 角色要读，而家 Access Denied，要最小权限（三步骤）。",
    "requirements": "角色本身要有 S3 读 + KMS decrypt；KMS key policy 要信任该角色。",
    "steps": [
      "更新 strategy_reviewer 角色权限：S3 读 + KMS decrypt。",
      "喺 Creative 帐户更新 KMS key policy，允许该角色 decrypt。",
      "确认唔好开匿名存取，亦唔好只畀 encrypt。"
    ],
    "solutions": "正确答案是 B、C、F。跨帐户读 KMS 加密物件要「身分政策 + 金钥政策」两边都准 decrypt。",
    "result_flow": "strategy_reviewer Assume／呼叫 → S3 GetObject → KMS Decrypt（key policy 允许）→ 读到明文。",
    "options": {
      "A": "错（对照答案键）。本题组合系 B、C、F。",
      "B": "✓ 正确。更新角色授予 S3 同 KMS decrypt。",
      "C": "✓ 正确。KMS key policy 授权 decrypt。",
      "D": "错。匿名存取违反安全。",
      "E": "错。要 decrypt 唔系 encrypt。",
      "F": "✓ 正确。以 read + decrypt 最小权限更新角色。"
    },
    "diagram_before": "flowchart TB\n  CRE[\"Creative 帐户\"]\n  S3[\"S3 + 自订 KMS\"]\n  STR[\"strategy_reviewer\"]\n  X{{\"缺口: Access Denied<br/>读不到加密物件\"}}\n  CRE --> S3\n  STR -.-> X\n  X -.-> S3\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  ROLE[\"角色政策<br/>S3 读 + KMS decrypt\"]\n  KEY[\"KMS key policy<br/>允许 decrypt\"]\n  GET[\"GetObject\"]\n  OK[\"读到明文\"]\n  ROLE --> GET\n  KEY --> GET\n  GET --> OK"
  },
  "138": {
    "blocker": "基因定序资料喺地端 SAN，用开源工具 + Docker 处理，容量爆；想搬上 AWS 可扩展。",
    "requirements": "稳定传资料上 S3；事件触发工作流；用 Batch 跑 ECR 入面 Docker。",
    "steps": [
      "用 DataSync 把定序资料同步到 S3。",
      "S3 事件触发 Lambda 启动 Step Functions。",
      "Step Functions 呼叫 Batch，拉 ECR 映像处理基因组资料。"
    ],
    "solutions": "正确答案是 C。DataSync + Step Functions + Batch + ECR 系基因组学可扩展标准。",
    "result_flow": "地端 SAN → DataSync → S3 → 事件 → Step Functions → Batch（ECR 映像）→ 结果回 S3。",
    "options": {
      "A": "错。有稳定连线时 Snowball 不如 DataSync 持续传。",
      "B": "错。Data Pipeline 偏旧，自管 ASG 重。",
      "C": "✓ 正确。DataSync + Step Functions + Batch + ECR。",
      "D": "错。Storage Gateway 快取层唔必要。"
    },
    "diagram_before": "flowchart TB\n  SAN[\"地端 SAN<br/>基因定序\"]\n  DOCK[\"开源工具 + Docker\"]\n  CAP[\"容量爆\"]\n  X{{\"缺口: 要可扩展<br/>搬上 AWS\"}}\n  SAN --> DOCK --> CAP\n  CAP -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart LR\n  SAN[\"地端 SAN\"]\n  DS[\"DataSync → S3\"]\n  SF[\"Step Functions\"]\n  BAT[\"Batch + ECR\"]\n  OUT[\"处理结果\"]\n  SAN --> DS --> SF --> BAT --> OUT"
  },
  "139": {
    "blocker": "开发环境单一 Windows EC2 + 2TB 根 EBS 跑 CMS，生产要至少三 AZ 高可用，仲要 Windows ACL／AD。",
    "requirements": "共用 Windows 档案系统；跨三 AZ 最少三实例；domain join。",
    "steps": [
      "建立 FSx for Windows File Server（Windows 档案托管）。",
      "建跨三 AZ、最少三实例嘅 Auto Scaling。",
      "user data 做 domain join 同挂载 FSx，安装应用。"
    ],
    "solutions": "正确答案是 C。FSx for Windows 支援 AD、Windows ACL、SMB；EFS／Lustre 唔啱 Windows ACL。",
    "result_flow": "用户 → ALB → 跨 AZ Windows 实例 → FSx for Windows 共用内容。",
    "options": {
      "A": "错。EFS 只支援 Linux／NFS。",
      "B": "错。FSx for Lustre 唔系 Windows ACL／AD 场景。",
      "C": "✓ 正确。FSx for Windows + 跨 AZ ASG。",
      "D": "错。EFS 唔支援 Windows。"
    },
    "diagram_before": "flowchart TB\n  APP[\"应用\"]\n  S3[\"S3 大量小档\"]\n  GET[\"GetObject 频繁\"]\n  X{{\"缺口: 请求费高<br/>延迟偏高\"}}\n  APP --> GET --> S3\n  GET -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart LR\n  APP[\"应用\"] --> CF[\"CloudFront\"]\n  CF --> CACHE[\"边缘快取\"]\n  CF --> S3[\"S3 来源\"]\n  CACHE --> SAVE[\"降请求费/延迟\"]"
  },
  "140": {
    "blocker": "应用要用范本 email 大量发送，想最少自己管伺服器。",
    "requirements": "托管发信；范本同参数替换；Lambda 触发。",
    "steps": [
      "用 SES（托管电邮）存放范本。",
      "Lambda 呼叫 SendTemplatedEmail 传参数。",
      "确认寄件网域验证同退信处理。"
    ],
    "solutions": "正确答案是 D。SES 原生范本 + 参数，完全托管，营运最低。",
    "result_flow": "事件 → Lambda → SES SendTemplatedEmail → 收件人收到合并后邮件。",
    "options": {
      "A": "错。自建 SMTP on EC2 要管伺服器。",
      "B": "错。范本放 S3 再合并多余。",
      "C": "错。SES 用法描述混乱。",
      "D": "✓ 正确。SES 范本 API 最简洁。"
    },
    "diagram_before": "flowchart TB\n  EVT[\"业务事件\"]\n  MAIL[\"合并栏位电邮\"]\n  OPS[\"自管范本重\"]\n  X{{\"缺口: 营运最低<br/>托管寄信\"}}\n  EVT --> MAIL --> OPS\n  OPS -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart LR\n  EVT[\"事件\"] --> L[\"Lambda\"]\n  L --> SES[\"SES<br/>SendTemplatedEmail\"]\n  SES --> RCV[\"收件人\"]"
  },
  "141": {
    "blocker": "SQS 驱动影片处理（每部约 30 分钟），讯息入咗 DLQ 但应用日志冇错误。",
    "requirements": "防止处理中被 ASG scale-in 杀掉；令长任务可以做完。",
    "steps": [
      "喺开始处理时对 EC2 开 scale-in protection。",
      "处理完成后先解除 protection。",
      "再让 ASG 正常缩容。"
    ],
    "solutions": "正确答案是 C。Scale-in protection 避免处理中被回收导致讯息失败入 DLQ。",
    "result_flow": "取 SQS 讯息 → 开 scale-in protection → 处理 30 分钟 → 完成 → 解除 protection → 删讯息。",
    "options": {
      "A": "错。Termination protection 唔针对 ASG scale-in 流程。",
      "B": "错。只加 visibility timeout 治标唔治本。",
      "C": "✓ 正确。Scale-in protection 保命。",
      "D": "错。maxReceiveCount=0 会令讯息即入 DLQ。"
    },
    "diagram_before": "flowchart TB\n  SQS[\"SQS 影片任务<br/>约 30 分钟\"]\n  ASG[\"ASG 处理\"]\n  DLQ[\"讯息进 DLQ\"]\n  X{{\"缺口: 应用日志<br/>却无错误\"}}\n  SQS --> ASG\n  ASG --> DLQ\n  DLQ -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  GET[\"取 SQS 讯息\"]\n  PROT[\"开 scale-in<br/>protection\"]\n  WORK[\"处理 30 分钟\"]\n  DONE[\"解除 protection<br/>删讯息\"]\n  GET --> PROT --> WORK --> DONE"
  },
  "142": {
    "blocker": "Regional API Gateway + Lambda 而家公开，想改成只可以由 VPC 内存取，仲要认证，工作量最低。",
    "requirements": "Private API；Interface VPC Endpoint；resource policy 限制。",
    "steps": [
      "把 API 改成 Private endpoint。",
      "建立 Interface VPC Endpoint 畀 API Gateway。",
      "附加 resource policy 只允许该 VPC 存取。"
    ],
    "solutions": "正确答案是 C。Private API + VPC Endpoint + Resource Policy 系标准。",
    "result_flow": "VPC 内用户／服务 → VPC Endpoint → Private API Gateway → Lambda。",
    "options": {
      "A": "错。Internal ALB 唔能直接代理呢种 API Gateway 整合。",
      "B": "错。改 DNS／CNAME 做唔到真正私有。",
      "C": "✓ 正确。Private API + Endpoint + policy。",
      "D": "错。自建 Apache 代理过重。"
    },
    "diagram_before": "flowchart TB\n  NET[\"互联网\"]\n  APIG[\"Regional API<br/>Gateway\"]\n  L[\"Lambda\"]\n  X{{\"缺口: 要改私有<br/>+ 认证 工作量低\"}}\n  NET --> APIG --> L\n  APIG -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart LR\n  VPC[\"VPC 内服务\"]\n  EP[\"VPC Endpoint\"]\n  PRIV[\"Private API<br/>+ Resource Policy\"]\n  L[\"Lambda\"]\n  VPC --> EP --> PRIV --> L"
  },
  "143": {
    "blocker": "CloudFront 分发气象地图（S3 喺 eu-west-1），美国用户有时好慢，要两个步骤改善。",
    "requirements": "缩短北美回源距离；按地区把请求导去近嘅桶。",
    "steps": [
      "喺 us-east-1 建 S3 桶并开 Cross-Region Replication 同步。",
      "用 Lambda@Edge 把北美请求路由到 us-east-1 桶。",
      "CloudFront 快取未中时回源更近，延迟下降。"
    ],
    "solutions": "正确答案是 B、D。CRR 就近放资料 + Lambda@Edge 按地区选 origin。",
    "result_flow": "美国用户 → CloudFront → Lambda@Edge 选 us-east-1 S3 → 命中或短距回源。",
    "options": {
      "A": "错。Global Accelerator 去 S3 唔系标准。",
      "B": "✓ 正确。CRR 到 us-east-1。",
      "C": "错。Transfer Acceleration 主要加速上传。",
      "D": "✓ 正确。Lambda@Edge 按地理导向。",
      "E": "错。架构过度复杂。"
    },
    "diagram_before": "flowchart TB\n  US[\"美国用户\"]\n  CF[\"CloudFront\"]\n  S3[\"S3 地图<br/>eu-west-1\"]\n  X{{\"缺口: 有时好慢\"}}\n  US --> CF --> S3\n  S3 -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  US[\"美国用户\"] --> CF[\"CloudFront\"]\n  CF --> EDGE[\"Lambda@Edge<br/>按地理选 origin\"]\n  EDGE --> S3US[\"S3 us-east-1\"]\n  CRR[\"CRR 自 eu-west-1\"]\n  CRR --> S3US"
  },
  "144": {
    "blocker": "WorkSpaces 用 FSx for Windows 做 Profile，档案系统满咗，新 session 起唔到。",
    "requirements": "立即恢复容量；自动监控防止再满。",
    "steps": [
      "用 update-file-system 加大 FSx 储存容量。",
      "CloudWatch 监控 FreeStorageCapacity。",
      "低水位时 EventBridge + Lambda 自动再扩容。"
    ],
    "solutions": "正确答案是 B。FSx 支援线上扩容 + 监控自动扩容系标准。",
    "result_flow": "容量满 → 手动／API 扩容恢复 → 监控告警 → 自动再扩 → session 可建。",
    "options": {
      "A": "错。删 profile／转 Lustre 唔啱 Windows profile。",
      "B": "✓ 正确。线上扩容 + 自动监控扩容。",
      "C": "错。未先救容量而且编排过重。",
      "D": "错。删 profile 同拆档案系统管理更乱。"
    },
    "diagram_before": "flowchart TB\n  WS[\"WorkSpaces\"]\n  FSX[\"FSx for Windows<br/>Profile\"]\n  FULL[\"档案系统已满\"]\n  X{{\"缺口: 新 session<br/>起不了\"}}\n  WS --> FSX --> FULL\n  FULL -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  FULL[\"容量满\"]\n  GROW[\"线上扩容 FSx\"]\n  MON[\"监控告警\"]\n  AUTO[\"自动再扩\"]\n  OK[\"session 可建\"]\n  FULL --> GROW --> MON --> AUTO --> OK"
  },
  "145": {
    "blocker": "司机手持装置用 FTP 上传签收图到单一 EC2，已经超载；又改唔到手持装置。",
    "requirements": "可扩展 FTP 入口；上传后自动处理 metadata 同系统更新。",
    "steps": [
      "用 AWS Transfer Family 建托管 FTP，档案直接入 S3。",
      "S3 事件经 SNS 触发 Lambda。",
      "Lambda 加 metadata 并更新配送系统。"
    ],
    "solutions": "正确答案是 C。Transfer Family → S3 → SNS → Lambda 全托管可扩展；改手持装置直接上 S3 做唔到。",
    "result_flow": "手持 FTP → Transfer Family → S3 → SNS → Lambda → 更新系统。",
    "options": {
      "A": "错。AMI+ASG 仍系 FTP on EC2 思维。",
      "B": "错。仲依赖 EC2 处理。",
      "C": "✓ 正确。全托管可扩展管线。",
      "D": "错。改唔到手持装置，唔能直接上 S3。"
    },
    "diagram_before": "flowchart TB\n  DEV[\"司机手持 FTP\"]\n  EC2[\"单一 EC2\"]\n  FULL[\"已超载\"]\n  X{{\"缺口: 改不了手持<br/>又要可扩展\"}}\n  DEV --> EC2 --> FULL\n  FULL -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart LR\n  FTP[\"手持 FTP\"]\n  TF[\"Transfer Family\"]\n  S3[\"S3\"]\n  SNS[\"SNS\"]\n  L[\"Lambda 更新系统\"]\n  FTP --> TF --> S3 --> SNS --> L"
  },
  "146": {
    "blocker": "ECS Fargate + Aurora MySQL 要跨 Region DR，而且唔可以丢资料，营运要低。",
    "requirements": "接近零 RPO 嘅跨 Region 资料复写；少自管。",
    "steps": [
      "启用 Aurora 跨 Region 复本（Global Database 概念）。",
      "应用／容灾流程指向备援 Region。",
      "定期演练提升备援。"
    ],
    "solutions": "正确答案是 A。Aurora 跨 Region Replica／Global Database RPO 接近零，运维最低。",
    "result_flow": "主 Region 写入 Aurora → 秒级复写到备援 Region → 灾难时提升备援继续服务。",
    "options": {
      "A": "✓ 正确。Aurora 跨 Region 复本，RPO 低、运维低。",
      "B": "错。DataSync 管复写负担高。",
      "C": "错。DMS 持续复写较重。",
      "D": "错。5 分钟快照 RPO 唔系零。"
    },
    "diagram_before": "flowchart TB\n  ECS[\"ECS Fargate\"]\n  AUR[\"Aurora MySQL\"]\n  REG[\"单一 Region\"]\n  X{{\"缺口: 跨 Region DR<br/>不能丢资料\"}}\n  ECS --> AUR --> REG\n  REG -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart LR\n  PRI[\"主 Region Aurora\"]\n  REP[\"跨 Region 复本\"]\n  DR[\"灾难提升备援\"]\n  OK[\"继续服务 RPO≈0\"]\n  PRI --> REP --> DR --> OK"
  },
  "147": {
    "blocker": "每 15 分钟收到信用卡 PAN 明文档入 S3，要自动遮罩、合并栏位转 JSON，量会再大。",
    "requirements": "可扩展 ETL；schema 可发现；易加新 feed。",
    "steps": [
      "用 Glue crawler／classifier 建立表定义。",
      "档案到达时 Lambda 启动 Glue ETL job。",
      "ETL 遮罩 PAN、合并栏位、输出 JSON 到下一桶。"
    ],
    "solutions": "正确答案是 C。Glue 系托管 ETL，适合遮罩转换同扩展。",
    "result_flow": "HTTPS 入 S3 → 事件 → Glue ETL（遮罩／转 JSON）→ 下游桶供内部处理。",
    "options": {
      "A": "错。多 Lambda+SQS 编排复杂。",
      "B": "错。Fargate 要管扩展。",
      "C": "✓ 正确。Glue crawler + ETL。",
      "D": "错。Athena+EMR 过重。"
    },
    "diagram_before": "flowchart TB\n  IN[\"每 15 分入 S3\"]\n  PAN[\"信用卡 PAN 明文\"]\n  NEED[\"遮罩+转 JSON\"]\n  X{{\"缺口: 量会再大<br/>要自动可扩展\"}}\n  IN --> PAN --> NEED\n  NEED -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart LR\n  S3[\"HTTPS → S3\"]\n  EVT[\"S3 事件\"]\n  GLUE[\"Glue ETL<br/>遮罩 / 转 JSON\"]\n  DST[\"下游桶\"]\n  S3 --> EVT --> GLUE --> DST"
  },
  "148": {
    "blocker": "地端实体伺服器（含 MySQL）要业务连续，OS 相容 EC2，想最低营运负担 DR。",
    "requirements": "持续复制；可演练；一键故障转移。",
    "steps": [
      "喺来源伺服器（含 MySQL）安装 Replication Agent。",
      "初始化 Elastic Disaster Recovery 并定义启动设定。",
      "定期做 failover／fallback 演练。"
    ],
    "solutions": "正确答案是 B。Elastic Disaster Recovery 持续复制 + 非破坏演练 + 一键切换，运维最低。",
    "result_flow": "地端持续复制到 AWS staging → 演练／真实故障 → 启动复原实例接手。",
    "options": {
      "A": "错。手动管理复制同测试较重。",
      "B": "✓ 正确。Elastic DR 标准低负担。",
      "C": "错。只迁库唔覆盖成个应用。",
      "D": "错。Storage Gateway 快照 RPO／RTO 较差。"
    },
    "diagram_before": "flowchart TB\n  PHYS[\"地端实体伺服器\"]\n  MYSQL[\"含 MySQL\"]\n  OS[\"OS 相容 EC2\"]\n  X{{\"缺口: 业务连续<br/>最低营运 DR\"}}\n  PHYS --> MYSQL\n  PHYS --> OS\n  PHYS -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  ONP[\"地端伺服器\"]\n  EDR[\"Elastic DR<br/>持续复制\"]\n  STG[\"AWS staging\"]\n  FAIL[\"演练 / 故障\"]\n  REC[\"启动复原实例\"]\n  ONP --> EDR --> STG --> FAIL --> REC"
  },
  "149": {
    "blocker": "外部稽核师用单一 AWS 帐户，要安全唯读入公司帐户，符合最佳实务。",
    "requirements": "跨帐户角色；External ID；唯读政策；唔好分享 access key。",
    "steps": [
      "喺公司帐户建 IAM 角色，信任稽核师帐户。",
      "附加唯读政策。",
      "信任政策加 External ID，稽核师 AssumeRole 进入。"
    ],
    "solutions": "正确答案是 B。跨帐户 Role + External ID + 唯读系标准。",
    "result_flow": "稽核师帐户 → AssumeRole（+External ID）→ 公司帐户唯读角色 → 稽核资源。",
    "options": {
      "A": "错。资源政策到处开唔系标准唯读模式。",
      "B": "✓ 正确。Role + External ID + 唯读。",
      "C": "错。分享 Access Key 违反最佳实务。",
      "D": "错。喺公司帐户开 IAM user 畀外人唔啱。"
    },
    "diagram_before": "flowchart TB\n  AUD[\"外部稽核师\"]\n  ACC[\"单一 AWS 帐户\"]\n  CO[\"公司资源\"]\n  X{{\"缺口: 安全唯读<br/>符合最佳实务\"}}\n  AUD --> ACC\n  ACC -.-> X\n  X -.-> CO\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart LR\n  AUD[\"稽核师帐户\"]\n  AR[\"AssumeRole<br/>+ External ID\"]\n  RO[\"公司唯读角色\"]\n  RES[\"稽核资源\"]\n  AUD --> AR --> RO --> RES"
  },
  "150": {
    "blocker": "延迟敏感交易平台用 DynamoDB on-demand，想再降延迟又要高可用。",
    "requirements": "读取走记忆体快取；写入直写表保持一致；丛集要多节点 HA。",
    "steps": [
      "建三节点 DAX（DynamoDB Accelerator 记忆体快取）丛集。",
      "应用读取经 DAX。",
      "写入直接写 DynamoDB 表。"
    ],
    "solutions": "正确答案是 B。三节点 DAX 读取微秒级；写入直写表；单节点无 HA，读写都经 DAX 或写入经 DAX 都非最佳。",
    "result_flow": "读请求 → DAX 快取命中即回；未中 → DynamoDB → 回填 DAX；写请求 → 直写 DynamoDB。",
    "options": {
      "A": "错。读写都经 DAX 且两节点 HA 不足。",
      "B": "✓ 正确。三节点 DAX 读 + 直写表。",
      "C": "错。写入经 DAX、读直打表，优劣颠倒。",
      "D": "错。单节点无高可用。"
    },
    "diagram_before": "flowchart TB\n  TX[\"延迟敏感交易\"]\n  DDB[\"DynamoDB<br/>on-demand\"]\n  HA[\"要高可用\"]\n  X{{\"缺口: 再降读延迟\"}}\n  TX --> DDB\n  DDB --> HA\n  DDB -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  R[\"读请求\"] --> DAX[\"DAX 三节点\"]\n  DAX -->|命中| OK[\"微秒回\"]\n  DAX -->|未中| DDB[\"DynamoDB\"]\n  DDB --> DAX\n  W[\"写请求\"] --> DDB"
  },
  "151": {
    "blocker": "前端静态站两部 EC2 后 ALB、后端 Python 三部大 On-Demand EC2，主要午餐尖峰，想悭钱又唔好影响可用性。",
    "requirements": "静态前端唔好再用 EC2；后端改适合间歇尖峰嘅实例。两步骤。",
    "steps": [
      "前端改为 S3 托管静态网站。",
      "后端改用同核心数嘅 burstable（可爆量）一般用途实例。",
      "保持后端可用性，唔好改 Spot 冒中断风险。"
    ],
    "solutions": "正确答案是 B、E。S3 消前端 EC2 成本；burstable 适合间歇尖峰。",
    "result_flow": "用户 → S3 静态前端；API → burstable 后端 ASG／ALB → 尖峰靠 CPU credit。",
    "options": {
      "A": "错。Compute optimized 适合持续高 CPU，唔系间歇尖峰。",
      "B": "✓ 正确。前端上 S3 最悭。",
      "C": "错。Beanstalk 仍用 EC2，未必悭。",
      "D": "错。Spot 可能中断影响可用性。",
      "E": "✓ 正确。burstable 处理间歇尖峰更悭。"
    },
    "diagram_before": "flowchart TB\n  FE[\"前端 2×EC2<br/>后 ALB\"]\n  BE[\"后端 3×大<br/>On-Demand EC2\"]\n  PEAK[\"午餐尖峰\"]\n  X{{\"缺口: 成本高<br/>又要保可用性\"}}\n  FE --> BE\n  PEAK --> BE\n  BE -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart LR\n  U[\"用户\"] --> S3[\"S3 静态前端\"]\n  U --> ALB[\"ALB\"]\n  ALB --> BT[\"burstable 后端<br/>ASG\"]\n  BT --> CRED[\"CPU credit 扛尖峰\"]"
  },
  "152": {
    "blocker": "EKS on EC2 + RDS MySQL，新功能会上 Fargate，需求随活动日期尖峰，要最成本效益。",
    "requirements": "基线运算折扣要覆盖 EC2 同 Fargate；尖峰有容量；资料库基线用 RI。",
    "steps": [
      "为预测中等／基线负载买 Compute Savings Plans（可覆盖 EC2／Fargate）。",
      "活动尖峰用 On-Demand Capacity Reservations 预留容量。",
      "资料库买 1 年 No Upfront RI，尖峰加 read replica。"
    ],
    "solutions": "正确答案是 B（依题库）。Compute Savings Plans 灵活覆盖 EC2／Fargate；可预测尖峰用 Capacity Reservation；RDS No Upfront RI + replica。",
    "result_flow": "日常：Savings Plans 覆盖 EKS 基线 → 活动前 Capacity Reservation 抬尖峰 → RDS RI 基线 + replica 读扩展。",
    "options": {
      "A": "错。Standard RI 欠 Fargate 灵活性。",
      "B": "✓ 正确。Compute SP + Capacity Reservation + RDS RI。",
      "C": "错。EC2 Instance SP 唔覆盖 Fargate。",
      "D": "错。对照题库答案系 B（尖峰策略同 RI 预付方式唔同）。"
    },
    "diagram_before": "flowchart TB\n  EKS[\"EKS on EC2\"]\n  FG[\"新功能 → Fargate\"]\n  RDS[\"RDS MySQL\"]\n  SPIKE[\"活动日期尖峰\"]\n  X{{\"缺口: 最成本效益<br/>覆盖混合运算\"}}\n  EKS --> SPIKE\n  FG --> SPIKE\n  RDS --> SPIKE\n  SPIKE -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  SP[\"Compute Savings Plans<br/>覆盖 EC2/Fargate\"]\n  CR[\"活动前<br/>Capacity Reservation\"]\n  RI[\"RDS No Upfront RI\"]\n  RR[\"Read Replica 读扩展\"]\n  SP --> CR\n  RI --> RR"
  },
  "153": {
    "blocker": "CloudFront 指住 Elastic Beanstalk，每周维护时用户见到错误，想显示 S3 静态维护页。",
    "requirements": "同一 distribution 多 origin；维护时切 default behavior；OAI 保护 S3。三步骤。",
    "steps": [
      "上传静态维护内容到 S3。",
      "把 S3 设为第二 origin，并用 OAI（源站存取身分）限制只畀 CloudFront 读。",
      "维护期间改 default cache behavior 指去 S3，完结后改返。"
    ],
    "solutions": "正确答案是 A、C、D。唔使另建新 distribution。",
    "result_flow": "正常：CloudFront → Beanstalk；维护：CloudFront default behavior → S3 维护页（OAI）。",
    "options": {
      "A": "✓ 正确。上传维护页到 S3。",
      "B": "错。唔使新 distribution。",
      "C": "✓ 正确。第二 origin + OAI。",
      "D": "✓ 正确。维护期切换 default behavior。",
      "E": "错。另建 distribution 复杂。",
      "F": "错。唔应叫 Beanstalk 去服务 S3 内容。"
    },
    "diagram_before": "flowchart TB\n  U[\"用户\"]\n  CF[\"CloudFront\"]\n  EB[\"Elastic Beanstalk\"]\n  MAINT[\"每周维护\"]\n  X{{\"缺口: 维护时<br/>见到错误页\"}}\n  U --> CF --> EB\n  MAINT --> EB\n  EB -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  U[\"用户\"] --> CF[\"CloudFront\"]\n  CF -->|正常| EB[\"Beanstalk\"]\n  CF -->|维护| S3[\"S3 维护页<br/>+ OAI\"]\n  SW[\"切换 default<br/>behavior\"]\n  SW --> CF"
  },
  "154": {
    "blocker": "客户端用固定 Lambda 版本 ARN 呼叫，环境变数成日改，搞到要改 ARN／客户端，想减少中断。",
    "requirements": "稳定引用点；测试完先切流量；客户端唔使改。",
    "steps": [
      "建立 Lambda alias（别名）。",
      "客户端改用 alias ARN。",
      "测试新版本后，把 alias 指去新版本。"
    ],
    "solutions": "正确答案是 D。Alias 提供稳定 ARN，版本切换对客户端透明。",
    "result_flow": "客户端 → alias ARN → 指向目前版本；发布 v2 测完 → 改 alias 指向 v2。",
    "options": {
      "A": "错。已发布版本唔能改环境变数。",
      "B": "错。DynamoDB 存参数可行但多余。",
      "C": "错。硬编码仍要发新版本。",
      "D": "✓ 正确。Alias 稳定引用、低负担。"
    },
    "diagram_before": "flowchart TB\n  CLI[\"客户端固定<br/>Lambda 版本 ARN\"]\n  ENV[\"环境变数常改\"]\n  VER[\"新版本新 ARN\"]\n  X{{\"缺口: 客户端要改<br/>中断多\"}}\n  ENV --> VER\n  CLI --> VER\n  VER -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart LR\n  CLI[\"客户端\"]\n  ALIAS[\"Lambda Alias<br/>稳定 ARN\"]\n  V1[\"目前版本\"]\n  V2[\"发布 v2 后切换\"]\n  CLI --> ALIAS --> V1\n  ALIAS -.-> V2"
  },
  "155": {
    "blocker": "多 Region ALB + DynamoDB Global Tables，要 apex domain 对外，DNS 由内部管理，工作量最低。",
    "requirements": "apex 要用 A record；要静态 IP；要按地区／健康路由。",
    "steps": [
      "建立 Global Accelerator，endpoint group 指各 Region ALB。",
      "把 Accelerator 静态 IP 写入内部 DNS 做 apex A record。",
      "流量自动就近／健康路由到 Region。"
    ],
    "solutions": "正确答案是 C。Global Accelerator 静态 IP 可做 apex；CNAME 唔能用喺 apex。",
    "result_flow": "用户查 apex → DNS A 到 Global Accelerator IP → 导向最近健康 ALB → DynamoDB Global Tables。",
    "options": {
      "A": "错。CNAME 唔能用喺 apex。",
      "B": "错。加 NLB 复杂，CNAME 仍然有 apex 问题。",
      "C": "✓ 正确。Accelerator 静态 IP + 多 endpoint。",
      "D": "错。API Gateway+Lambda 路由增加延迟同复杂度。"
    },
    "diagram_before": "flowchart TB\n  APEX[\"apex domain\"]\n  ALB1[\"Region A ALB\"]\n  ALB2[\"Region B ALB\"]\n  DDB[\"DynamoDB<br/>Global Tables\"]\n  X{{\"缺口: apex 对外<br/>DNS 自管 工作量低\"}}\n  APEX -.-> X\n  ALB1 --> DDB\n  ALB2 --> DDB\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  DNS[\"DNS A 记录\"]\n  GA[\"Global Accelerator<br/>静态 IP\"]\n  ALB1[\"最近健康 ALB\"]\n  ALB2[\"其他 Region ALB\"]\n  DDB[\"DynamoDB GT\"]\n  DNS --> GA\n  GA --> ALB1 --> DDB\n  GA --> ALB2 --> DDB"
  },
  "156": {
    "blocker": "API Gateway + Lambda 用共享函式库同自订类别，想简化部署同重用。",
    "requirements": "完整依赖环境；可共享复杂套件；部署一致。",
    "steps": [
      "把共享程式码同函数打成 Docker image。",
      "推上 ECR。",
      "Lambda 用 container image 部署。"
    ],
    "solutions": "正确答案是 D。复杂依赖同自订类别用 Lambda 容器映像最合适；Layer 只适合 zip。",
    "result_flow": "建 image → ECR → Lambda 从映像启动 → API Gateway 呼叫。",
    "options": {
      "A": "错。Layer 唔接受 Docker image 来源。",
      "B": "错。Layer 只支援 zip。",
      "C": "错。Fargate 容器唔能当 Lambda Layer。",
      "D": "✓ 正确。Lambda container image + ECR。"
    },
    "diagram_before": "flowchart TB\n  APIG[\"API Gateway\"]\n  L[\"Lambda\"]\n  LIB[\"共享函式库<br/>+ 自订类别\"]\n  X{{\"缺口: 部署重用<br/>复杂依赖难管\"}}\n  APIG --> L\n  LIB --> L\n  LIB -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart LR\n  IMG[\"建 container image\"]\n  ECR[\"推上 ECR\"]\n  L[\"Lambda 从映像启动\"]\n  APIG[\"API Gateway 呼叫\"]\n  IMG --> ECR --> L --> APIG"
  },
  "157": {
    "blocker": "工厂要用 SageMaker 训练嘅缺陷侦测模型做即时推论，网路断都要得，本地 Linux 已有 API。",
    "requirements": "边缘本地推论；离线可运行；结果打本地 API。",
    "steps": [
      "喺本地伺服器部署 Greengrass。",
      "把 ML 模型当 Greengrass 元件本地推论。",
      "侦测到缺陷就呼叫本地 API。"
    ],
    "solutions": "正确答案是 B。Greengrass 支援边缘 ML，完全本地跑。",
    "result_flow": "相机／感测 → 本地 Greengrass 推论 → 缺陷 → 本地 API；无云都得。",
    "options": {
      "A": "错。依赖云端，断网就挂。",
      "B": "✓ 正确。Greengrass 边缘推论。",
      "C": "错。Snowball 唔适合长期工厂部署。",
      "D": "错。Monitron 唔系视觉缺陷 ML。"
    },
    "diagram_before": "flowchart TB\n  CAM[\"工厂相机/感测\"]\n  SM[\"SageMaker 模型\"]\n  CLOUD[\"依赖云端推论\"]\n  X{{\"缺口: 网路断<br/>也要本地推论\"}}\n  CAM --> CLOUD\n  SM --> CLOUD\n  CLOUD -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart LR\n  CAM[\"相机/感测\"]\n  GG[\"Greengrass<br/>边缘推论\"]\n  API[\"本地 Linux API\"]\n  OUT[\"缺陷结果\"]\n  CAM --> GG --> API --> OUT"
  },
  "158": {
    "blocker": "有 CMDB 汇出资料，要建立迁上 AWS 嘅商业案例，想最省。",
    "requirements": "分析伺服器清单同成本；产出商业案例报告。",
    "steps": [
      "把 CMDB 汇出套入 Migration Evaluator 范本。",
      "产生伺服器清单同成本评估。",
      "输出商业案例报告。"
    ],
    "solutions": "正确答案是 B。Migration Evaluator 专为 CMDB／迁移商业案例而设。",
    "result_flow": "CMDB 汇出 → Migration Evaluator → 成本／案例报告 → 决策迁移。",
    "options": {
      "A": "错。Well-Architected 唔系迁移商业案例工具。",
      "B": "✓ 正确。Migration Evaluator。",
      "C": "错。手动对价目表工作量巨大。",
      "D": "错。Discovery agent 多余，已有 CMDB。"
    },
    "diagram_before": "flowchart TB\n  CMDB[\"既有 CMDB\"]\n  EXP[\"汇出资产资料\"]\n  NEED[\"迁移商业案例\"]\n  X{{\"缺口: 想最省<br/>完成评估\"}}\n  CMDB --> EXP --> NEED\n  NEED -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart LR\n  CMDB[\"CMDB 汇出\"]\n  ME[\"Migration Evaluator\"]\n  RPT[\"成本/案例报告\"]\n  DEC[\"决策迁移\"]\n  CMDB --> ME --> RPT --> DEC"
  },
  "159": {
    "blocker": "ALB 后端应用被应用层攻击，大量唔同 IP 流量暴增，想最低营运负担缓解。",
    "requirements": "自动化 DDoS／应用层防护；少手动封 IP。",
    "steps": [
      "启用 Shield Advanced。",
      "把 ALB 加为受保护资源。",
      "配合 WAF 规则做自动缓解。"
    ],
    "solutions": "正确答案是 B。Shield Advanced 提供自动化缓解同 DRT，适合大量分散 IP 攻击。",
    "result_flow": "攻击流量 → Shield Advanced／WAF → 缓解 → 正常流量到 ALB。",
    "options": {
      "A": "错。手动 deny list 应付唔到大量 IP。",
      "B": "✓ 正确。Shield Advanced 自动化。",
      "C": "错。路由表 deny 有条数限制。",
      "D": "错。地理封锁易误伤。"
    },
    "diagram_before": "flowchart TB\n  ATT[\"应用层攻击<br/>大量分散 IP\"]\n  ALB[\"ALB 后端应用\"]\n  SPIKE[\"流量暴增\"]\n  X{{\"缺口: 最低营运<br/>负担缓解\"}}\n  ATT --> ALB\n  SPIKE --> ALB\n  ALB -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  ATT[\"攻击流量\"]\n  SH[\"Shield Advanced<br/>+ WAF\"]\n  MIT[\"自动化缓解\"]\n  OK[\"正常流量 → ALB\"]\n  ATT --> SH --> MIT\n  SH --> OK"
  },
  "160": {
    "blocker": "应用层已双 Region，资料层 DynamoDB + Aurora MySQL 要跨两 Region，RTO／RPO 得数分钟。",
    "requirements": "Aurora 全球资料库；DynamoDB Global Tables。两步骤。",
    "steps": [
      "把 Aurora 做成 Global Database，加次要 Region。",
      "把 DynamoDB 转 Global Tables 并加 Region。",
      "验证复写延迟符合数分钟 RPO。"
    ],
    "solutions": "正确答案是 B、D。两边都用原生多 Region 复写，先达分钟级 RPO。",
    "result_flow": "写入主 Region → Aurora global 复写／DynamoDB global 复写 → 备援 Region 可读；故障可提升。",
    "options": {
      "A": "错。表述／做法唔完整。",
      "B": "✓ 正确。Aurora Global Database 加 Region。",
      "C": "错。排程备份 RPO 太粗。",
      "D": "✓ 正确。DynamoDB Global Tables。",
      "E": "错。ARC 唔系资料库复写方案。"
    },
    "diagram_before": "flowchart TB\n  APP[\"应用层<br/>已双 Region\"]\n  DDB[\"DynamoDB<br/>单 Region\"]\n  AUR[\"Aurora MySQL<br/>单 Region\"]\n  X{{\"缺口: 资料层也要<br/>跨 Region 分钟级 RPO\"}}\n  APP --> DDB\n  APP --> AUR\n  DDB -.-> X\n  AUR -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart LR\n  W[\"主 Region 写入\"]\n  AG[\"Aurora Global DB\"]\n  GT[\"DynamoDB<br/>Global Tables\"]\n  DR[\"备援可读/可提升\"]\n  W --> AG --> DR\n  W --> GT --> DR"
  },
  "161": {
    "blocker": "内部 ALB 终止 TLS，客户防火墙要 IP allow list，需要静态 IP 连入 AWS。",
    "requirements": "入口有静态 IP；后面仍用现有 ALB 能力。",
    "steps": [
      "前面加 NLB（可提供每 AZ 静态 IP）。",
      "NLB 用 ALB-type target group 指住现有 ALB。",
      "把 NLB IP 加入客户防火墙 allow list。"
    ],
    "solutions": "正确答案是 B。NLB 静态 IP + 转发到 ALB 系标准。",
    "result_flow": "客户 → 防火墙（allow NLB IP）→ NLB → ALB → 后端。",
    "options": {
      "A": "错。ALB 本身无静态 IP。",
      "B": "✓ 正确。NLB 静态 IP + ALB target。",
      "C": "错。搬走 target 会失去 ALB 路由能力。",
      "D": "错。GWLB 系串安全设备。"
    },
    "diagram_before": "flowchart TB\n  CLI[\"客户防火墙\"]\n  ALLOW[\"要 IP allow list\"]\n  ALB[\"内部 ALB 终止 TLS\"]\n  X{{\"缺口: ALB 无<br/>固定静态 IP\"}}\n  CLI --> ALLOW\n  ALLOW -.-> X\n  X -.-> ALB\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart LR\n  CLI[\"客户\"]\n  FW[\"防火墙 allow<br/>NLB 静态 IP\"]\n  NLB[\"NLB\"]\n  ALB[\"ALB\"]\n  BE[\"后端\"]\n  CLI --> FW --> NLB --> ALB --> BE"
  },
  "162": {
    "blocker": "CloudFront + WAF 喺前面，想禁止互联网直接打 ALB，营运要最低。",
    "requirements": "ALB 安全群组只允许 CloudFront；IP 范围要自动更新。",
    "steps": [
      "喺 ALB 安全群组加入 AWS 托管 CloudFront prefix list。",
      "只允许嚟自该 prefix list 嘅流量。",
      "唔好手动维护 CloudFront IP 清单。"
    ],
    "solutions": "正确答案是 C。Managed CloudFront prefix list 自动更新，最省事。",
    "result_flow": "用户 → CloudFront／WAF →（只有 CloudFront IP 可入）ALB → 应用；直接打 ALB 被 SG 拒。",
    "options": {
      "A": "错。复制 WAF 规则到 ALB 多余。",
      "B": "错。ALB 再挂 WAF 增加复杂。",
      "C": "✓ 正确。CloudFront managed prefix list。",
      "D": "错。手动维护 IP 易过期。"
    },
    "diagram_before": "flowchart TB\n  U[\"用户\"]\n  CF[\"CloudFront + WAF\"]\n  ALB[\"ALB\"]\n  APP[\"应用\"]\n  X{{\"缺口: 互联网<br/>可直打 ALB\"}}\n  U --> CF --> ALB --> APP\n  U -.->|直连| X\n  X -.-> ALB\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  U[\"用户\"] --> CF[\"CloudFront/WAF\"]\n  CF --> ALB[\"ALB SG 只准<br/>CloudFront prefix list\"]\n  ALB --> APP[\"应用\"]\n  BAD[\"直打 ALB\"] -.->|拒绝| ALB"
  },
  "163": {
    "blocker": "ElastiCache Redis 已开静态加密，仲要传输中加密同使用者认证，端到端加密。",
    "requirements": "AUTH + transit encryption；AUTH token 安全存放。",
    "steps": [
      "建立新 Redis 丛集，启用 AUTH 同传输中加密（旧丛集多数唔能就地开）。",
      "把 AUTH token 存 Parameter Store（加密参数）。",
      "应用读 token 再连线认证。"
    ],
    "solutions": "正确答案是 A。加密同 AUTH 要新建丛集；Redis 用 AUTH token 唔系客户 SSL 凭证那套。",
    "result_flow": "应用 → 取 Parameter Store token → TLS + AUTH 连新 Redis → 端到端加密。",
    "options": {
      "A": "✓ 正确。新丛集开 AUTH+TLS，token 放 Parameter Store。",
      "B": "错。现有丛集通常唔能就地开。",
      "C": "错。唔系用 SSL 客户凭证认证 Redis。",
      "D": "错。就地开唔到，认证方式亦不对。"
    },
    "diagram_before": "flowchart TB\n  APP[\"应用\"]\n  REDIS[\"ElastiCache Redis\"]\n  AT[\"已开静态加密\"]\n  X{{\"缺口: 传输中加密<br/>+ 使用者认证\"}}\n  APP --> REDIS --> AT\n  AT -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart LR\n  APP[\"应用\"]\n  PS[\"Parameter Store<br/>AUTH token\"]\n  NEW[\"新 Redis 丛集<br/>TLS + AUTH\"]\n  OK[\"端到端加密\"]\n  APP --> PS --> NEW --> OK"
  },
  "164": {
    "blocker": "Spot ASG 用两个 placement group 同单一实例类型，成日启动失败，用户等好耐。",
    "requirements": "扩大 Spot 容量池；提高取得成功率。",
    "steps": [
      "建立新 launch template 版本，改用 attribute-based instance type selection。",
      "ASG 改用该版本。",
      "让系统从多种相容类型攞 Spot 容量。"
    ],
    "solutions": "正确答案是 B。属性化实例类型选择可大幅提高 Spot 成功率。",
    "result_flow": "ASG 要加机器 → 多实例类型匹配 Spot 池 → 较易启动成功 → 用户等待下降。",
    "options": {
      "A": "错。Launch configuration 已过时。",
      "B": "✓ 正确。attribute-based instance selection。",
      "C": "错。加 placement group 唔解决容量池窄。",
      "D": "错。更大类型可能更难攞 Spot。"
    },
    "diagram_before": "flowchart TB\n  ASG[\"Spot ASG\"]\n  PG[\"两个 placement group\"]\n  TYPE[\"单一实例类型\"]\n  X{{\"缺口: 启动常失败<br/>用户等很久\"}}\n  ASG --> PG\n  ASG --> TYPE\n  TYPE -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  ASG[\"ASG 要加机器\"]\n  ATTR[\"attribute-based<br/>多实例类型\"]\n  SPOT[\"匹配更多 Spot 池\"]\n  OK[\"启动成功率升\"]\n  ASG --> ATTR --> SPOT --> OK"
  },
  "165": {
    "blocker": "Linux 处理伺服器唔能即改 S3 API，要好快本地档案存取，完成后 30 分钟内档案要公开下载。",
    "requirements": "NFS 高速本地盘；自动同 S3 同步。",
    "steps": [
      "建立 FSx for Lustre 并连结 S3 桶。",
      "用 NFS 挂载到 EC2 畀应用高速读写。",
      "处理完后档案自动 export 到 S3 供下载。"
    ],
    "solutions": "正确答案是 C。FSx for Lustre + S3 整合满足高速本地同快速上云公开。",
    "result_flow": "应用 NFS 写 Lustre → 自动同步 S3 → 30 分钟内公开下载。",
    "options": {
      "A": "错。要改应用用 S3 API。",
      "B": "错。File Gateway 效能同刷新较弱。",
      "C": "✓ 正确。Lustre + S3 连结。",
      "D": "错。DataSync 排程唔保证 30 分钟。"
    },
    "diagram_before": "flowchart TB\n  APP[\"Linux 处理伺服器<br/>不能即改 S3 API\"]\n  LOCAL[\"要高速本地档\"]\n  PUB[\"完成后 30 分内<br/>公开下载\"]\n  X{{\"缺口: 本地快<br/>又要快上云公开\"}}\n  APP --> LOCAL\n  LOCAL --> PUB\n  PUB -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart LR\n  APP[\"应用 NFS 写\"]\n  LUS[\"FSx for Lustre\"]\n  S3[\"自动同步 S3\"]\n  DL[\"30 分内公开下载\"]\n  APP --> LUS --> S3 --> DL"
  },
  "166": {
    "blocker": "中央使用者服务删除用户后，其他微服务各自存有敏感资料副本，要即时全部删除。",
    "requirements": "一对多即时事件通知；微服务解耦。",
    "steps": [
      "使用者服务删除时向 EventBridge 自订汇流排发事件。",
      "每个微服务建 EventBridge 规则匹配删除事件。",
      "规则触发各服务删除本地敏感副本。"
    ],
    "solutions": "正确答案是 C。EventBridge 自订汇流排系微服务事件驱动标准。",
    "result_flow": "删用户 → EventBridge 事件 → 各微服务规则 → 各自删敏感资料。",
    "options": {
      "A": "错。Streams+SQS 可行但逻辑／耦合较差。",
      "B": "错。DynamoDB 唔直接 SNS。",
      "C": "✓ 正确。EventBridge 一对多。",
      "D": "错。单 SQS 点对点唔适合一对多。"
    },
    "diagram_before": "flowchart TB\n  USER[\"中央使用者服务<br/>删除用户\"]\n  MS1[\"微服务 A 副本\"]\n  MS2[\"微服务 B 副本\"]\n  MS3[\"微服务 C 副本\"]\n  X{{\"缺口: 敏感资料<br/>要即时全删\"}}\n  USER --> MS1\n  USER --> MS2\n  USER --> MS3\n  MS1 -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  DEL[\"删用户\"]\n  EB[\"EventBridge<br/>自订汇流排\"]\n  R1[\"微服务 A 规则\"]\n  R2[\"微服务 B 规则\"]\n  R3[\"微服务 C 规则\"]\n  DEL --> EB\n  EB --> R1\n  EB --> R2\n  EB --> R3"
  },
  "167": {
    "blocker": "ALB + WAF 后端应用，外部客户要连入，公司必须提供 IP 地址，营运负担要最低。",
    "requirements": "静态 IP；继续用 ALB／WAF；少改架构。",
    "steps": [
      "建立 Global Accelerator standard accelerator。",
      "把 ALB 设为 endpoint。",
      "把 Accelerator 静态 IP 提供畀客户。"
    ],
    "solutions": "正确答案是 C。Global Accelerator 提供静态 IP 指去 ALB，最省事。ALB 本身无弹性 IP。",
    "result_flow": "客户 → Accelerator 静态 IP → ALB（WAF）→ 应用。",
    "options": {
      "A": "错。换 NLB 会影响现有 ALB／WAF 架构。",
      "B": "错。ALB 唔能直接派 Elastic IP。",
      "C": "✓ 正确。Accelerator 静态 IP + ALB endpoint。",
      "D": "错。CloudFront IP 会变，唔适合固定 allow list。"
    },
    "diagram_before": "flowchart TB\n  CUST[\"外部客户\"]\n  ALB[\"ALB + WAF\"]\n  APP[\"后端应用\"]\n  X{{\"缺口: 必须提供 IP<br/>ALB 无弹性 IP\"}}\n  CUST -.-> X\n  X -.-> ALB --> APP\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart LR\n  CUST[\"客户\"]\n  GA[\"Global Accelerator<br/>静态 IP\"]\n  ALB[\"ALB + WAF\"]\n  APP[\"应用\"]\n  CUST --> GA --> ALB --> APP"
  },
  "168": {
    "blocker": "公司有开发帐户，想把 production 上 AWS，要强制 production（含未来）EBS 加密，仲要内建蓝图同 guardrails。",
    "requirements": "Control Tower landing zone；帐户入组织；production OU 护栏。三步骤。",
    "steps": [
      "喺管理帐户建立 Control Tower Landing Zone。",
      "邀请现有帐户加入 Organizations，分 production／development OU。",
      "对 production OU 建立 EBS 加密 guardrail（可用 SCP 辅助合规）。"
    ],
    "solutions": "正确答案是 C、D、F。Landing Zone 要喺管理帐户；护栏挂 production OU 而非全管理帐户乱套。",
    "result_flow": "管理帐户 Control Tower → 帐户入组织／OU → production OU 套 EBS 加密护栏 → 现有同未来 production 合规。",
    "options": {
      "A": "错。StackSets Config 不如 Control Tower 护栏。",
      "B": "错。唔好喺 developer 帐户建 Landing Zone。",
      "C": "✓ 正确。管理帐户 Landing Zone。",
      "D": "✓ 正确。邀请帐户 + SCP 合规。",
      "E": "错。未限定 production OU。",
      "F": "✓ 正确。production OU 嘅 EBS 加密 guardrail。"
    },
    "diagram_before": "flowchart TB\n  DEV[\"开发帐户\"]\n  PROD[\"production 要上云\"]\n  EBS[\"要强制 EBS 加密\"]\n  X{{\"缺口: 含未来帐户<br/>+ 蓝图 guardrails\"}}\n  DEV --> PROD --> EBS\n  EBS -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  CT[\"管理帐户<br/>Control Tower\"]\n  OU[\"production / dev OU\"]\n  SCP[\"SCP 合规\"]\n  GR[\"production OU<br/>EBS 加密护栏\"]\n  OK[\"现有+未来合规\"]\n  CT --> OU --> SCP\n  OU --> GR --> OK"
  },
  "169": {
    "blocker": "关键 stateful Web：两部 Linux EC2 + ALB + RDS MySQL，DNS 喺 Route 53。要双 Region DR：应用 RPO 2 分／RTO 30 分，资料库 RPO 5 分／RTO 30 分，架构改动少、切换后延迟低。",
    "requirements": "持续复制 EC2；跨 Region DB 复本；全球入口低延迟故障转移。",
    "steps": [
      "EC2 用 Elastic Disaster Recovery 持续复制（可达约 2 分 RPO）。",
      "RDS 建跨 Region read replica（约 5 分级 RPO）。",
      "第二 Region 建 ALB，用 Global Accelerator 做低延迟入口同故障转移。"
    ],
    "solutions": "正确答案是 A。Elastic DR + 跨 Region DB 复本 + Global Accelerator 满足 RPO／RTO 同低延迟。",
    "result_flow": "日常复制到备援 Region → 故障 → Accelerator／DNS 切到备援 ALB → 提升 DB 复本 → 服务恢复。",
    "options": {
      "A": "✓ 正确。满足应用 2 分 RPO、DB 5 分 RPO 同低延迟切换。",
      "B": "错。快照 RPO 难稳定性达到 2 分。",
      "C": "错。Backup 排程 RPO 较粗。",
      "D": "错。缺全球低延迟入口，快照亦难达 2 分 RPO。"
    },
    "diagram_before": "flowchart TB\n  U[\"用户\"]\n  ALB[\"ALB\"]\n  EC2[\"2× Linux EC2<br/>stateful\"]\n  RDS[\"RDS MySQL\"]\n  X{{\"缺口: 双 Region DR<br/>RPO/RTO 紧\"}}\n  U --> ALB --> EC2 --> RDS\n  EC2 -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  EDR[\"Elastic DR<br/>复制应用\"]\n  RR[\"跨 Region<br/>DB 复本\"]\n  GA[\"Global Accelerator\"]\n  ALB2[\"备援 Region ALB\"]\n  PROMOTE[\"故障提升 DB\"]\n  EDR --> ALB2\n  GA --> ALB2\n  RR --> PROMOTE"
  },
  "170": {
    "blocker": "单一帐户想悭 EC2 成本同 rightsize，要睇 CPU、记忆体、网路。",
    "requirements": "找出低利用率；用优化建议。两步骤。",
    "steps": [
      "开启 Trusted Advisor，睇 Low Utilization EC2 建议。",
      "启用 Compute Optimizer 攞 rightsize 建议。",
      "按建议调整实例。"
    ],
    "solutions": "正确答案是 B、D。Trusted Advisor + Compute Optimizer 系成本／规格优化组合。",
    "result_flow": "指标／使用率 → Trusted Advisor／Compute Optimizer → 建议 → 缩规格悭钱。",
    "options": {
      "A": "错。买 Support  alone 唔等于完成优化。",
      "B": "✓ 正确。Trusted Advisor 低利用率检查。",
      "C": "错。只装 agent 未完成优化闭环（题库选 B+D）。",
      "D": "✓ 正确。Compute Optimizer 建议。",
      "E": "错。Savings Plan 系购买承诺，唔系 rightsize 分析。"
    },
    "diagram_before": "flowchart TB\n  ACC[\"单一帐户\"]\n  EC2[\"EC2 机群\"]\n  MET[\"CPU/记忆体/网路\"]\n  X{{\"缺口: 要 rightsize<br/>悭成本\"}}\n  ACC --> EC2 --> MET\n  MET -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart LR\n  MET[\"使用率指标\"]\n  TA[\"Trusted Advisor<br/>低利用率\"]\n  CO[\"Compute Optimizer\"]\n  REC[\"缩规格建议\"]\n  SAVE[\"悭成本\"]\n  MET --> TA --> REC\n  MET --> CO --> REC\n  REC --> SAVE"
  },
  "171": {
    "blocker": "CodeCommit repo 要喺第二 Region 存一份备份。",
    "requirements": "有推送就备份；备份落到第二 Region。",
    "steps": [
      "EventBridge 规则监听 code push。",
      "触发 CodeBuild clone repo 并打 zip。",
      "把 zip 存到第二 Region 嘅 S3。"
    ],
    "solutions": "正确答案是 C。CodeCommit 无原生跨 Region 复写，用事件 + CodeBuild + S3 系可行备份。",
    "result_flow": "git push → EventBridge → CodeBuild clone／zip → S3（第二 Region）备份。",
    "options": {
      "A": "错。Elastic DR 唔系为 CodeCommit 设计。",
      "B": "错。AWS Backup 唔直接咁备 CodeCommit。",
      "C": "✓ 正确。EventBridge + CodeBuild + 跨 Region S3。",
      "D": "错。Step Functions snapshot 概念唔适用。"
    },
    "diagram_before": "flowchart TB\n  CC[\"CodeCommit repo\"]\n  CODE[\"原始码\"]\n  R1[\"单一 Region\"]\n  X{{\"缺口: 第二 Region<br/>无原生复写\"}}\n  CC --> CODE --> R1\n  R1 -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart LR\n  PUSH[\"git push\"]\n  EB[\"EventBridge\"]\n  CB[\"CodeBuild<br/>clone / zip\"]\n  S3[\"S3 第二 Region\"]\n  PUSH --> EB --> CB --> S3"
  },
  "172": {
    "blocker": "多业务单位帐户 VPC CIDR 重叠，行销内部应用要以私有 IP 畀所有单位用，营运负担最低。",
    "requirements": "私有连线；容忍 CIDR 重叠；少建复杂路由。",
    "steps": [
      "行销帐户建立 PrivateLink endpoint service。",
      "授权其他帐户连线。",
      "其他单位建 Interface VPC Endpoint 用私有 IP 存取。"
    ],
    "solutions": "正确答案是 C。PrivateLink 最适合 CIDR 重叠仍要私有存取。",
    "result_flow": "消费帐户 Interface Endpoint → PrivateLink → 行销 NLB／服务 → 应用；双方 CIDR 可重叠。",
    "options": {
      "A": "错。重叠 CIDR 下 peering／NAT 好复杂。",
      "B": "错。每单位 VPN 到虚拟设备运维重。",
      "C": "✓ 正确。PrivateLink 标准。",
      "D": "错。API Gateway private integration 过重且唔必要。"
    },
    "diagram_before": "flowchart TB\n  MKT[\"行销内部应用\"]\n  BU1[\"业务单位 A VPC\"]\n  BU2[\"业务单位 B VPC\"]\n  X{{\"缺口: CIDR 重叠<br/>仍要以私有 IP 存取\"}}\n  MKT -.-> BU1\n  MKT -.-> BU2\n  BU1 -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart LR\n  CONS[\"消费帐户<br/>Interface Endpoint\"]\n  PL[\"PrivateLink\"]\n  NLB[\"行销 NLB/服务\"]\n  APP[\"内部应用\"]\n  CONS --> PL --> NLB --> APP"
  },
  "173": {
    "blocker": "新收购帐户要稽核安全，得喺 S3 桶变成公开时通知安全团队；SNS 已订阅电邮。",
    "requirements": "侦测公开暴露；只告警 isPublic；送到既有 SNS。",
    "steps": [
      "建立 IAM Access Analyzer。",
      "EventBridge 规则听 Access Analyzer Finding，过滤 isPublic。",
      "目标设为既有 SNS topic。"
    ],
    "solutions": "正确答案是 B。Access Analyzer 专门揾公开资源；只听 PutBucketPolicy 会漏其他公开途径。",
    "result_flow": "桶政策／ACL 变公开 → Access Analyzer Finding → EventBridge（isPublic）→ SNS → 安全电邮。",
    "options": {
      "A": "错。S3 无 isPublic 事件类型。",
      "B": "✓ 正确。Access Analyzer + EventBridge + SNS。",
      "C": "错。只听 PutBucketPolicy 唔够。",
      "D": "错。该 Config 规则唔系侦测桶公开。"
    },
    "diagram_before": "flowchart TB\n  ACC[\"新收购帐户\"]\n  S3[\"S3 桶\"]\n  PUB[\"可能变公开\"]\n  X{{\"缺口: 只在公开时<br/>通知安全团队\"}}\n  ACC --> S3 --> PUB\n  PUB -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  S3[\"桶政策/ACL 变公开\"]\n  AA[\"Access Analyzer<br/>Finding\"]\n  EB[\"EventBridge<br/>isPublic=true\"]\n  SNS[\"SNS\"]\n  MAIL[\"安全电邮\"]\n  S3 --> AA --> EB --> SNS --> MAIL"
  },
  "174": {
    "blocker": "新收购公司地端机房文件不足，流量有啲系月末批次，要评估组合并做迁移商业案例。",
    "requirements": "伺服器清单；商业案例；依赖关系；集中检视组合。",
    "steps": [
      "用 Migration Evaluator 产生伺服器清单同商业案例。",
      "用 Migration Hub 检视迁移组合。",
      "用 Application Discovery Service 了解应用依赖。"
    ],
    "solutions": "正确答案是 C。评估阶段用 Evaluator + Hub + Discovery；SMS／MGN 系执行迁移。",
    "result_flow": "Discovery／Evaluator 收集 → Hub 看组合 → 商业案例报告 → 先规划再迁移。",
    "options": {
      "A": "错。SMS／DMS 偏执行迁移。",
      "B": "错。MGN／Storage Gateway 唔系评估主工具。",
      "C": "✓ 正确。Evaluator + Hub + Discovery。",
      "D": "错。Control Tower 系治理唔系评估。"
    },
    "diagram_before": "flowchart TB\n  DC[\"地端机房\"]\n  DOC[\"文件不足\"]\n  BAT[\"月末批次流量\"]\n  X{{\"缺口: 评估组合<br/>做迁移商业案例\"}}\n  DC --> DOC\n  DC --> BAT\n  DOC -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart LR\n  DIS[\"Application<br/>Discovery\"]\n  ME[\"Migration Evaluator\"]\n  HUB[\"Migration Hub\"]\n  RPT[\"商业案例报告\"]\n  DIS --> ME --> HUB --> RPT"
  },
  "175": {
    "blocker": "EKS 多 AZ 上嘅 ReplicaSet 产生好多小档，要所有 Pod 共享，仲要最快储存效能，备份留 1 年。",
    "requirements": "多 Pod 同时挂载；跨 AZ；自动备份一年。",
    "steps": [
      "建 EFS，并喺每个有 node 嘅子网建 mount target。",
      "ReplicaSet 挂载 EFS 存放小档。",
      "用 AWS Backup 备份 EFS 并保留 1 年。"
    ],
    "solutions": "正确答案是 A。EFS 支援多客户端 NFS，跨 AZ；EBS Multi-Attach 唔跨 AZ。",
    "result_flow": "各 Pod → 挂 EFS → 共享小档高速读写；AWS Backup 定期备份保留 1 年。",
    "options": {
      "A": "✓ 正确。EFS + 每子网 mount target + Backup。",
      "B": "错。EBS Multi-Attach 唔适合跨 AZ 多 Pod。",
      "C": "错。S3 当档案系统挂载慢。",
      "D": "错。本地盘唔共享。"
    },
    "diagram_before": "flowchart TB\n  EKS[\"EKS 多 AZ\"]\n  POD[\"ReplicaSet Pods\"]\n  FILES[\"大量小档\"]\n  X{{\"缺口: 全 Pod 共享<br/>最快+备 1 年\"}}\n  EKS --> POD --> FILES\n  FILES -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  POD1[\"Pod AZ-a\"]\n  POD2[\"Pod AZ-b\"]\n  EFS[\"EFS 共享档案\"]\n  BAK[\"AWS Backup<br/>保留 1 年\"]\n  POD1 --> EFS\n  POD2 --> EFS\n  EFS --> BAK"
  },
  "176": {
    "blocker": "客服中心硬体好旧，要接受来电并自动发互动式双向简讯问卷，想最低持续营运负担。",
    "requirements": "托管呼叫中心；互动式 SMS；少自管。",
    "steps": [
      "用 Amazon Connect 取代旧呼叫中心硬体。",
      "用 Amazon Pinpoint 发送互动式简讯问卷。",
      "通话结束后自动触发问卷流程。"
    ],
    "solutions": "正确答案是 A。Connect 管通话；Pinpoint 做互动 SMS。SNS 多数单向；Pinpoint 本身唔系呼叫中心。",
    "result_flow": "来电 → Connect 处理 → 触发 Pinpoint 互动简讯问卷 → 客户回复。",
    "options": {
      "A": "✓ 正确。Connect + Pinpoint。",
      "B": "错。SNS 唔适合互动双向问卷。",
      "C": "错。EC2 自管呼叫中心负担高。",
      "D": "错。Pinpoint 取代唔到通话中心。"
    },
    "diagram_before": "flowchart TB\n  HW[\"旧客服硬体\"]\n  CALL[\"接受来电\"]\n  SMS[\"互动双向<br/>简讯问卷\"]\n  X{{\"缺口: 最低持续<br/>营运负担\"}}\n  HW --> CALL --> SMS\n  HW -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart LR\n  CALL[\"来电\"]\n  CON[\"Amazon Connect\"]\n  PP[\"Pinpoint<br/>互动 SMS\"]\n  R[\"客户回复\"]\n  CALL --> CON --> PP --> R"
  },
  "177": {
    "blocker": "Amazon Connect 要跨 Region DR：数十 contact flow、数百使用者、数十电话号码，要最低 RTO。",
    "requirements": "预先放好最耗时资源；故障时只搬最必要嘅（电话号码）。",
    "steps": [
      "喺第二 Region 预先建立 Connect 实例，放好 users 同 contact flows。",
      "Route 53 健康检查监控主实例 URL。",
      "不健康时 CloudWatch 告警触发自动化转移电话号码。"
    ],
    "solutions": "正确答案是 D。预先布署 users+flows（最耗时），电话号码故障时先搬，RTO 最低。",
    "result_flow": "主 Region 故障 → 健康检查失败 → 告警／自动化转移号码 → 备援 Connect（已有 users／flows）接手。",
    "options": {
      "A": "错。故障后先建全部资源 RTO 最差。",
      "B": "错。只预布署 users，flows／号码仍慢。",
      "C": "错。users 故障后先布署，RTO 较长。",
      "D": "✓ 正确。预布署 users+flows，动态转号码。"
    },
    "diagram_before": "flowchart TB\n  CON[\"Connect 主 Region\"]\n  FLOW[\"数十 contact flow\"]\n  USERS[\"数百使用者\"]\n  NUM[\"数十电话号码\"]\n  X{{\"缺口: 跨 Region DR<br/>要最低 RTO\"}}\n  CON --> FLOW\n  CON --> USERS\n  CON --> NUM\n  CON -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  PRI[\"主 Region 故障\"]\n  HC[\"Route 53<br/>Health Check\"]\n  NUM[\"转移电话号码\"]\n  DR[\"备援 Connect<br/>已有 users/flows\"]\n  OK[\"快速接手\"]\n  PRI --> HC --> NUM --> DR --> OK"
  },
  "178": {
    "blocker": "公司用 Redshift 整资料卖畀客户，而家下载档案传输好麻烦，想用 Data Exchange，要验证客户身分同最新资料，营运最低。",
    "requirements": "Redshift datashare 直连；subscription verification；即时最新资料。",
    "steps": [
      "喺生产帐户用 Data Exchange 连接 Redshift 做 datashare。",
      "设定 subscription verification 验证客户。",
      "客户订阅后直接存取最新资料。"
    ],
    "solutions": "正确答案是 B。Data Exchange datashare 直连 Redshift，内建验证，运维最低。",
    "result_flow": "Redshift 最新资料 → Data Exchange datashare → 客户通过验证订阅 → 即时读取。",
    "options": {
      "A": "错。Data Exchange for APIs 要额外 API 整合。",
      "B": "✓ 正确。datashare + 订阅验证。",
      "C": "错。定期落地 S3 唔系最新即时。",
      "D": "错。Open Data 无客户身分验证。"
    },
    "diagram_before": "flowchart TB\n  RS[\"Redshift 整理资料\"]\n  FILE[\"下载档案传输\"]\n  CUST[\"客户\"]\n  X{{\"缺口: 验证身分<br/>+ 最新资料 运维低\"}}\n  RS --> FILE --> CUST\n  FILE -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart LR\n  RS[\"Redshift 最新资料\"]\n  DX[\"Data Exchange<br/>datashare\"]\n  VER[\"订阅验证\"]\n  CUST[\"客户即时读取\"]\n  RS --> DX --> VER --> CUST"
  },
  "179": {
    "blocker": "要做事件处理，但事件量会忽大忽小；若处理出错，事件不能默默消失，必须进独立伫列给人检查。",
    "requirements": "1) 可依事件量自动扩缩；2) 处理失败时事件进独立伫列审查；3) 架构解耦、可重试。",
    "steps": [
      "把事件先发到 Amazon SQS（简单伫列：先排队再处理，吸收尖峰）。",
      "用 EC2 Auto Scaling 群组（自动增减伺服器）从伫列拉讯息处理。",
      "以 ApproximateAgeOfOldestMessage（最旧讯息年龄）当扩缩指标，积压就加机器。",
      "失败讯息写入 Dead-Letter Queue（死信伫列：反复失败的讯息隔离存放）供审查。"
    ],
    "solutions": "正确答案 B。SQS 缓冲 + Auto Scaling 依伫列指标扩缩 + DLQ 隔离失败，是经典、运维清楚的事件处理架构。",
    "result_flow": "事件 → SQS 排队 → Auto Scaling 上应用拉讯息处理 → 成功删讯息；失败写入 DLQ → 人工审查。",
    "options": {
      "A": "错。SNS + Lambda 虽可 on-failure，但并发有上限，推送模式也不如 SQS 拉取＋DLQ 适合此需求。",
      "B": "✓ 正确。SQS 缓冲、依伫列扩缩、DLQ 隔离失败，三项要求一次满足。",
      "C": "错。DynamoDB Streams + Lambda 没有明确独立审查伫列，扩缩也受限。",
      "D": "错。EventBridge + ALB + EC2 过重；重试不等同专用 DLQ。"
    },
    "diagram_before": "flowchart TB\n  EVT[\"事件来源\"] --> APP[\"应用直接处理\"]\n  APP --> OK[\"成功就结束\"]\n  APP -.-> FAIL[\"失败时事件可能消失\"]\n  X{{\"缺口: 无缓冲/扩缩<br/>也无独立失败伫列\"}}\n  FAIL -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  EVT[\"事件来源\"] --> SQS[\"SQS 主伫列\"]\n  SQS --> ASG[\"Auto Scaling 应用<br/>依伫列深度扩缩\"]\n  ASG -->|成功| DEL[\"删除讯息\"]\n  ASG -->|反复失败| DLQ[\"DLQ 死信伫列\"]\n  DLQ --> HUM[\"人工审查\"]\n"
  },
  "180": {
    "blocker": "欧洲数百万装置用 REST API 上传环境资料，流量会突然暴冲；若后端跟不上，资料可能丢失，公司不能接受。",
    "requirements": "1) 必须处理所有上传资料；2) 资料遗失不可接受；3) 能扛不可预测尖峰。",
    "steps": [
      "建立 Amazon API Gateway HTTP API 当 REST 入口。",
      "建立 Amazon SQS 伫列作为持久缓冲。",
      "设定 API Gateway 与 SQS 整合：请求一进伫列就回应成功，不卡同步处理。",
      "用 AWS Lambda 非同步消费 SQS，处理永续指数计算。"
    ],
    "solutions": "正确答案 B。关键是「先收进伫列再处理」：SQS 持久化保证不丢，Lambda 再慢慢消化尖峰。",
    "result_flow": "装置 REST 请求 → API Gateway → 写入 SQS（持久化）→ 立即回 200 → Lambda 取讯息处理 → 完成删讯息。",
    "options": {
      "A": "错。ALB 不能把 SQS 当目标群组；架构不成立。",
      "B": "✓ 正确。API Gateway → SQS 是标准解耦，保证尖峰也不丢资料。",
      "C": "错。同步打 EC2，尖峰易逾时或拒绝，无法保证不丢。",
      "D": "错。CloudFront 不适合当 Kinesis origin，也无法缓冲 REST 突发上传。"
    },
    "diagram_before": "flowchart TB\n  DEV[\"数百万装置\"] --> REST[\"REST 上传\"]\n  REST --> BE[\"后端即时处理\"]\n  BE -.-> DROP{{\"尖峰时后端跟不上<br/>资料可能丢失\"}}\n  style DROP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  DEV[\"装置 REST\"] --> APIGW[\"API Gateway\"]\n  APIGW --> SQS[\"SQS 持久化\"]\n  SQS --> ACK[\"立即回 200\"]\n  SQS --> L[\"Lambda 非同步消化\"]\n  L -->|完成| DEL[\"删讯息\"]\n"
  },
  "181": {
    "blocker": "三个 OU、每 OU 逾 100 帐号各有 VPC；同 OU 要互通、跨 OU 要隔离。若逐一 VPC Peering，连线数会爆。",
    "requirements": "1) 同 OU VPC 互通；2) 跨 OU 隔离；3) 运维负担最低。",
    "steps": [
      "在每个 OU 的一个帐号建立 Transit Gateway（中转闸道：VPC 接上即可互通）。",
      "用 AWS RAM（资源共用）把 TGW 分享给同 OU 其他帐号。",
      "每个 VPC 建立 TGW attachment。",
      "不同 OU 的 TGW 互不连线，自然跨 OU 隔离。"
    ],
    "solutions": "正确答案 C。每 OU 一个 TGW + RAM 共享，支援传递式路由，又避免数百条 Peering 的维运地狱。",
    "result_flow": "OU 内 VPC-A → TGW attachment → TGW 路由 → VPC-B；其他 OU 的 TGW 独立，无法互通。",
    "options": {
      "A": "错。100+ 帐号 Peering 连线与路由管理爆炸。",
      "B": "错。中央 networking + 每帐号 Peering 仍是 N 条连线，且无传递式路由。",
      "C": "✓ 正确。每 OU 独立 TGW + RAM，互通又隔离，运维最轻。",
      "D": "错。VPN + 第三方路由授权与维运重，不如 TGW。"
    },
    "diagram_before": "flowchart TB\n  V1[\"OU-A VPC 们\"] -.-> PEER[\"逐条 VPC Peering\"]\n  V2[\"OU-B VPC 们\"] -.-> PEER\n  V3[\"OU-C VPC 们\"] -.-> PEER\n  X{{\"缺口: 连线数爆炸<br/>跨 OU 隔离难管\"}}\n  PEER -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  VA[\"OU-A 各 VPC\"] --> TGWA[\"TGW-A + RAM\"]\n  VB[\"OU-B 各 VPC\"] --> TGWB[\"TGW-B + RAM\"]\n  VC[\"OU-C 各 VPC\"] --> TGWC[\"TGW-C + RAM\"]\n  TGWA --> ISO[\"同 OU 互通<br/>跨 OU 隔离\"]\n  TGWB --> ISO\n  TGWC --> ISO\n"
  },
  "182": {
    "blocker": "大型重要文件要上云，希望全托管；同时要超高耐久、传输与静态都加密，且金钥由公司管并可轮替。",
    "requirements": "1) 高度耐久可用；2) 静态与传输加密；3) 客户管理 KMS 并定期轮替；4) 尽量全托管。",
    "steps": [
      "选 Amazon S3 存大型文件（11 个 9 耐久）。",
      "启用 SSE-KMS，用公司管理的 KMS 金钥加密并设定轮替。",
      "用 bucket policy 强制 HTTPS 连线。",
      "同一政策强制必须伺服器端加密，未加密请求拒绝。"
    ],
    "solutions": "正确答案 B。S3 + 强制 HTTPS + SSE-KMS，一次满足耐久、双向加密与客户管钥。",
    "result_flow": "应用 HTTPS 上传 → S3 用客户 KMS 加密存放 → 读取同样走 HTTPS 解密回传。",
    "options": {
      "A": "错。File Gateway 偏混合场景；非纯云全托管大型文件最佳解。",
      "B": "✓ 正确。S3 耐久 + SSE-KMS + 强制 TLS，要求齐全。",
      "C": "错。DynamoDB 有项目大小限制，不适合大型文件。",
      "D": "错。EBS 绑 EC2，非全托管物件储存，耐久不如 S3。"
    },
    "diagram_before": "flowchart TB\n  DOC[\"大型重要文件\"] --> UP[\"上传到某储存\"]\n  UP -.-> KEY[\"金钥谁管？能否轮替？\"]\n  UP -.-> ENC[\"传输/静态有否加密？\"]\n  X{{\"缺口: 要全托管+高耐久<br/>+客户管 KMS 轮替\"}}\n  KEY -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  APP[\"应用 HTTPS 上传\"] --> S3[\"S3 高耐久\"]\n  S3 --> KMS[\"SSE-KMS<br/>客户管理金钥\"]\n  KMS --> ROT[\"定期轮替 CMK\"]\n  S3 --> READ[\"HTTPS 读取解密\"]\n"
  },
  "183": {
    "blocker": "公开 API（ALB + ECS Fargate）遭大量 SQL 注入，Auto Scaling 打满，服务慢到不能用。",
    "requirements": "1) 挡 SQL 注入不进 ECS；2) 合法流量仍可过；3) 运维效率最高。",
    "steps": [
      "建立 AWS WAF（Web 应用防火墙）Web ACL。",
      "加入 AWS 托管 SQL database 规则群组，封锁注入请求。",
      "其余请求允许通过。",
      "把 Web ACL 绑到 ALB，恶意请求在进容器前被挡。"
    ],
    "solutions": "正确答案 C。托管 SQL 规则一键防护，绑 ALB 即可，无需自建 IP 黑名单。",
    "result_flow": "流量 → ALB 上 WAF → 命中 SQL 规则则封锁；合法请求 → ECS Fargate 处理。",
    "options": {
      "A": "错。只监控不封锁，攻击仍会打进 API。",
      "B": "错。Bot Control 针对机器人，不是 SQL 注入主解。",
      "C": "✓ 正确。托管 SQL 规则 + 允许其他流量 + 绑 ALB，精准且省运维。",
      "D": "错。扫 log 加黑名单慢、易漏、维护重。"
    },
    "diagram_before": "flowchart TB\n  ATK[\"SQL 注入流量\"] --> ALB[\"ALB\"]\n  ALB --> ECS[\"ECS Fargate\"]\n  ECS --> ASG[\"Auto Scaling 打满\"]\n  X{{\"缺口: 恶意请求<br/>已打进应用层\"}}\n  ATK -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  TRAF[\"用户/攻击流量\"] --> ALB[\"ALB\"]\n  ALB --> WAF[\"WAF 托管 SQL 规则\"]\n  WAF -->|命中| BLK[\"封锁\"]\n  WAF -->|合法| ECS[\"ECS Fargate 处理\"]\n"
  },
  "184": {
    "blocker": "空气感测器经 IoT Core 写 DynamoDB；业务连续要求两个 Region 都能「收资料＋存资料」。",
    "requirements": "1) 双 Region 可摄取；2) 双 Region 可储存；3) 故障时可切换。",
    "steps": [
      "在两个 Region 各自设定 IoT Core domain configuration。",
      "用 Route 53 health check + failover routing 指向两个 IoT Core 端点。",
      "把资料层改为 DynamoDB Global Tables（跨 Region 自动复写）。",
      "各 Region IoT 规则写入本 Region 的全域表。"
    ],
    "solutions": "正确答案 C。双 Region IoT Core + Route 53 failover 管摄取；Global Tables 管储存复写。",
    "result_flow": "感测器 → Route 53（主端健康则主 Region，否则备援）→ IoT Core → DynamoDB Global Table → 自动复写到另一 Region。",
    "options": {
      "A": "错。Alias failover 无法直接套 IoT Core data endpoint；Aurora 也不符 DynamoDB 需求。",
      "B": "错。延迟路由非业务连续 failover；MemoryDB 与现有 DynamoDB 路径不符。",
      "C": "✓ 正确。IoT Core domain + failover + Global Table，撷取与储存双 Region 完整。",
      "D": "错。延迟路由非 DR failover；Streams 手搓复写不如 Global Table。"
    },
    "diagram_before": "flowchart TB\n  SEN[\"空气感测器\"] --> IOT[\"IoT Core 单 Region\"]\n  IOT --> DDB[\"DynamoDB 单 Region\"]\n  X{{\"缺口: 另一 Region<br/>无法收资料/存资料\"}}\n  IOT -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  SEN[\"感测器\"] --> R53[\"Route 53 Failover\"]\n  R53 -->|主| I1[\"IoT Core 主 Region\"]\n  R53 -.->|备| I2[\"IoT Core 备 Region\"]\n  I1 --> GT[\"DynamoDB Global Tables\"]\n  I2 --> GT\n"
  },
  "185": {
    "blocker": "财务帐号 DynamoDB 有机密；行销在另一帐号，只准看特定属性，需要安全的跨帐号细粒度存取。",
    "requirements": "1) 跨帐号存取；2) 仅特定属性；3) 财务帐号掌控授权。",
    "steps": [
      "在财务帐号建立 IAM Role，policy 用条件限制可存取的 DynamoDB 属性（细粒度存取）。",
      "在 Role 信任政策允许行销帐号的角色来 AssumeRole。",
      "行销帐号建立可 assume 该财务 Role 的 IAM Role。",
      "行销应用透过 STS AssumeRole 取得临时凭证后存取 DynamoDB。"
    ],
    "solutions": "正确答案 B。跨帐号 IAM Role + 条件式 policy 做属性级控制，是 DynamoDB 跨帐号细粒度标准做法。",
    "result_flow": "行销应用 → AssumeRole 到财务帐号 Role → 临时凭证 → 仅能读允许属性的 DynamoDB 项目。",
    "options": {
      "A": "错。SCP 管的是帐号级服务允许/拒绝，做不到属性级。",
      "B": "✓ 正确。财务建细粒度 Role、行销 assume，标准且安全。",
      "C": "错。资源政策 alone 叙述不完整，细粒度条件应在角色 policy 搭配信任关系。",
      "D": "错。Permissions boundary 限最大权限，不能单独做「只某属性」。"
    },
    "diagram_before": "flowchart TB\n  FIN[\"财务帐号 DynamoDB<br/>机密资料\"]\n  MKT[\"行销帐号应用\"] -.-> FIN\n  NEED[\"要属性级只读\"]\n  MKT --> NEED\n  X{{\"缺口: 跨帐号未授权<br/>且要属性级限制\"}}\n  NEED -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  MKT[\"行销应用\"] --> STS[\"AssumeRole\"]\n  STS --> ROLE[\"财务帐号细粒度 Role\"]\n  ROLE --> TMP[\"临时凭证\"]\n  TMP --> DDB[\"只读允许属性<br/>DynamoDB\"]\n"
  },
  "186": {
    "blocker": "应用要同时部署在两个 Region，两个 S3 bucket 的物件必须同步；不想自己写复制逻辑。",
    "requirements": "1) 双 Region 同时使用；2) 物件保持同步；3) 运维负担最低。（选三项）",
    "steps": [
      "两个 bucket 都开启 S3 Versioning（版本控制，CRR 必要前提）。",
      "设定双向 Cross-Region Replication（跨区复写）自动同步物件。",
      "建立 S3 Multi-Region Access Point（MRAP：单一全球端点）。",
      "应用改打 MRAP，不必自己选 Region bucket。"
    ],
    "solutions": "正确答案 A、B、E。MRAP 统一端点 + 双向 CRR + Versioning，原生同步、改动最小。",
    "result_flow": "应用 → MRAP 路由到近端 bucket → 写入后 CRR 复写到另一 Region；反向同理，两边资料一致。",
    "options": {
      "A": "✓ 正确。MRAP 让应用只认一个端点，降低改造与运维。",
      "B": "✓ 正确。双向 CRR 原生同步，无需自订程式。",
      "C": "错。应用分别写两 bucket 复杂且易不一致。",
      "D": "错。Lifecycle 管生命周期，不是即时同步。",
      "E": "✓ 正确。Versioning 是 CRR 必要条件，也防覆写遗失。",
      "F": "错。Lambda 复制要自己处理重试与冲突，运维重。"
    },
    "diagram_before": "flowchart TB\n  A1[\"Region A 应用\"] --> S3A[\"S3 Bucket A\"]\n  A2[\"Region B 应用\"] --> S3B[\"S3 Bucket B\"]\n  S3A -.-> S3B\n  X{{\"缺口: 物件不同步<br/>要自写复制逻辑\"}}\n  S3A -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  APP[\"双 Region 应用\"] --> MRAP[\"S3 Multi-Region<br/>Access Point\"]\n  MRAP --> BA[\"Bucket A\"]\n  MRAP --> BB[\"Bucket B\"]\n  BA <-->|\"双向 CRR + Versioning\"| BB\n"
  },
  "187": {
    "blocker": "地端 IoT MQTT 平台（broker + MongoDB 元资料 + 批次报表）想搬上 AWS，并大降运维。",
    "requirements": "1) 取代自建 MQTT；2) 元资料用 Mongo 相容全托管；3) 周期批次报表与 Web 展示；4) 运维最低。（选三项）",
    "steps": [
      "装置改连 AWS IoT Core（全托管 MQTT）。",
      "元资料改存 Amazon DocumentDB（全托管、MongoDB 相容）。",
      "用 Step Functions 编排 Lambda 做 120–600 秒批次，结果写 S3。",
      "CloudFront 挂 S3 来源提供报表下载／浏览。"
    ],
    "solutions": "正确答案 B、D、E。IoT Core + DocumentDB + Step Functions/Lambda/S3/CloudFront 全托管链，取代自建 broker 与 Mongo。",
    "result_flow": "装置 MQTT → IoT Core → 规则写入 DocumentDB／触发处理 → Step Functions 批次产报表 → S3 → CloudFront 给使用者。",
    "options": {
      "A": "错。Lambda 不能当持久 MQTT broker。",
      "B": "✓ 正确。IoT Core 全托管大规模 MQTT。",
      "C": "错。MongoDB on EC2 仍要管机器，运维高。",
      "D": "✓ 正确。DocumentDB 全托管 Mongo 相容。",
      "E": "✓ 正确。Step Functions + S3 + CloudFront 适合周期报表。",
      "F": "错。EKS 要管 K8s，运维远高于无伺服器。"
    },
    "diagram_before": "flowchart TB\n  DEV[\"IoT 装置 MQTT\"] --> BRK[\"自建 Broker EC2\"]\n  BRK --> MON[\"自建 MongoDB 元资料\"]\n  MON --> RPT[\"批次报表\"]\n  X{{\"缺口: 自管 broker/Mongo<br/>运维负担高\"}}\n  BRK -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  DEV[\"装置 MQTT\"] --> IOT[\"IoT Core\"]\n  IOT --> DOC[\"DocumentDB<br/>Mongo 相容\"]\n  IOT --> SF[\"Step Functions 批次\"]\n  SF --> S3[\"S3 报表\"]\n  S3 --> CF[\"CloudFront 展示\"]\n"
  },
  "188": {
    "blocker": "全球制造：有些系统因法规／毫秒延迟必须留在特定国家或厂区；厂站网路又差；开发者要同一套 API 到处部署。",
    "requirements": "1) 本地／特定地法规与低延迟；2) 网路受限厂区可运算；3) 与云端一致的开发体验。",
    "steps": [
      "在必须留资料／低延迟的地点部署 AWS Outposts（把 AWS 机柜放到地端，API 与云一样）。",
      "在网路受限工厂用 Snowball Edge Compute Optimized 做边缘运算与暂存。",
      "应用用同一套 AWS API／服务模型编写，可部署到云、Outposts 或边缘装置。",
      "网路恢复后把需要上云的资料同步回中央 Region。"
    ],
    "solutions": "正确答案 C。Outposts 满足法规与低延迟；Snowball Edge Compute 满足弱网工厂；开发体验一致。",
    "result_flow": "开发同一应用 → 合规／低延迟站点跑 Outposts；弱网工厂跑 Snowball Edge Compute → 可连线时同步回 AWS 云端 Region。",
    "options": {
      "A": "错。只有 Direct Connect 解不了「资料必须在地」与工厂边缘运算。",
      "B": "错。Storage Optimized 偏搬资料；Wavelength 需 5G，工厂不一定有。",
      "C": "✓ 正确。Outposts + Snowball Edge Compute 对口法规、延迟与弱网。",
      "D": "错。Local Zone 是城市边缘，不是任意国家／地端机房。"
    },
    "diagram_before": "flowchart TB\n  DEV[\"同一套 API 要部署\"]\n  REG[\"法规/毫秒延迟站点\"]\n  FAC[\"弱网工厂\"]\n  DEV -.-> REG\n  DEV -.-> FAC\n  X{{\"缺口: 云端 Region<br/>无法满足在地与弱网\"}}\n  REG -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  DEV[\"同一应用映像\"] --> OUT[\"Outposts<br/>合规/低延迟站\"]\n  DEV --> SBE[\"Snowball Edge Compute<br/>弱网工厂\"]\n  OUT --> AWS[\"可连线时同步云端\"]\n  SBE --> AWS\n"
  },
  "189": {
    "blocker": "订单系统（ECS + DynamoDB + 公开 ALB）被恶意流量狂打，需要挡攻击且尽量不停服，还要成本划算。",
    "requirements": "1) 防护攻击；2) 攻击期间中断最小；3) 最具成本效益。（选两项）",
    "steps": [
      "在 ALB 前加 Amazon CloudFront（CDN：边缘吸收流量、隐藏来源）。",
      "ALB 只接受带有 CloudFront 自订 header 的请求，防止直接打 ALB。",
      "在 CloudFront 上挂 AWS WAF，挡恶意 HTTP 请求。",
      "合法使用者仍经 CloudFront 正常下单。"
    ],
    "solutions": "正确答案 A、E。CloudFront 吸 DDoS + 自订 header 锁来源 + WAF 挡应用层攻击，成本效益高。",
    "result_flow": "用户／攻击 → CloudFront（边缘）→ WAF 过滤 → 带自订 header 到 ALB → ECS；直接打 ALB 因缺 header 被拒。",
    "options": {
      "A": "✓ 正确。CloudFront + 自订 header 吸攻击并保护 ALB 来源。",
      "B": "错。双 Region 贵，且不直接解应用层攻击。",
      "C": "错。Auto Scaling／DAX 助效能但不防攻击。",
      "D": "错。快取减轻 DB 但不防攻击。",
      "E": "✓ 正确。WAF 挂 CloudFront 在边缘挡恶意请求，划算。"
    },
    "diagram_before": "flowchart TB\n  ATK[\"恶意/DDoS 流量\"] --> ALB[\"公开 ALB\"]\n  ALB --> ECS[\"ECS + DynamoDB\"]\n  X{{\"缺口: 攻击直达来源<br/>成本高且易中断\"}}\n  ATK -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  U[\"用户/攻击\"] --> CF[\"CloudFront 边缘\"]\n  CF --> WAF[\"WAF 过滤\"]\n  WAF -->|自订 header| ALB[\"ALB 锁来源\"]\n  ALB --> ECS[\"ECS 订单系统\"]\n  DIR[\"直打 ALB\"] -.->|缺 header 拒绝| ALB\n"
  },
  "190": {
    "blocker": "CloudFront 管静态（S3）与动态（ALB）；ALB 偶发 503，使用者看到难懂错误，要立刻显示友善错误页且好维护。",
    "requirements": "1) ALB 503 时立即自订错误页；2) 运维负担最低。",
    "steps": [
      "把友善错误页静态档放在 S3（可开静态网站）。",
      "在 CloudFront 建 Origin Group：主 origin 是 ALB，备援是 S3。",
      "启用 Origin Failover，主 origin 回 503 等错误时切到备援。",
      "使用者立刻看到 S3 上的自订错误页，无需额外 Lambda。"
    ],
    "solutions": "正确答案 C。CloudFront Origin Group 原生故障切换，设定简单、回应即时。",
    "result_flow": "请求 → CloudFront → 正常时打 ALB；ALB 回 503 → 自动改打 S3 错误页 → 使用者看到友善讯息。",
    "options": {
      "A": "错。Route 53 failover 是 DNS 层，慢且难即时显示 CloudFront 层错误页。",
      "B": "错。双 distribution + DNS 过复杂。",
      "C": "✓ 正确。Origin Group failover 原生、即时、好维护。",
      "D": "错。CloudFront Function 手写逻辑，运维高于 Origin Group。"
    },
    "diagram_before": "flowchart TB\n  U[\"使用者\"] --> CF[\"CloudFront\"]\n  CF --> ALB[\"ALB 动态\"]\n  CF --> S3[\"S3 静态\"]\n  ALB -.-> E503{{\"偶发 503<br/>难懂错误页\"}}\n  style E503 fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  U[\"使用者\"] --> CF[\"CloudFront\"]\n  CF --> OG[\"Origin Group\"]\n  OG -->|正常| ALB[\"主来源 ALB\"]\n  OG -->|503 切换| ERR[\"S3 友善错误页\"]\n  ERR --> U\n"
  },
  "191": {
    "blocker": "Docker 应用用 NFS v4 共享档；要上容器平台且安全可扩展，又不能自己管底层机器。",
    "requirements": "1) 容器化；2) NFS v4 相容共享储存；3) 不管理 EC2 等基础设施。",
    "steps": [
      "用 Amazon ECS 搭配 Fargate（无伺服器容器：不用管机器）。",
      "建立 Amazon EFS（全托管 NFS 相容档案系统）。",
      "在 task definition 挂载 EFS 到容器路径。",
      "多任务可同时读写同一 EFS，符合原 NFS 共享模式。"
    ],
    "solutions": "正确答案 A。Fargate + EFS 都是全托管，原生 NFS 语意，零机器管理。",
    "result_flow": "任务启动于 Fargate → 挂载 EFS → 容器像 NFS 一样读写共享档 → 多任务共享同一档案系统。",
    "options": {
      "A": "✓ 正确。Fargate + EFS 符合无基础设施与 NFS 共享。",
      "B": "错。FSx for Lustre 偏 HPC，不是一般 NFS v4 场景。",
      "C": "错。EC2 launch type 要管机器，不符要求。",
      "D": "错。EBS Multi-Attach 限制多，不适合容器共享，且要 EC2。"
    },
    "diagram_before": "flowchart TB\n  APP[\"Docker 应用\"] --> NFS[\"NFS v4 共享档\"]\n  APP -.-> INF[\"若上容器仍要管机器？\"]\n  X{{\"缺口: 要无基础设施<br/>+ NFS 相容共享\"}}\n  INF -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  TASK[\"Fargate 任务\"] --> MNT[\"挂载 EFS\"]\n  MNT --> EFS[\"EFS NFS v4\"]\n  TASK2[\"其他 Fargate 任务\"] --> EFS\n  EFS --> SHARE[\"多任务共享档案\"]\n"
  },
  "192": {
    "blocker": "新业务逻辑要金丝雀：只有约 10% 客户试用；测试期间同一客户必须一直用同一版本。",
    "requirements": "1) 约 10% 流量走新版本；2) 同一客户粘在同一版本。",
    "steps": [
      "建第二个 target group，部署新版本 EC2／ASG。",
      "在 ALB listener 用加权规则：约 90% 旧群组、10% 新群组。",
      "开启 target group stickiness（黏性：用 cookie 记住客户）。",
      "观察指标，再决定全量或回滚。"
    ],
    "solutions": "正确答案 B。ALB 加权目标群组 + stickiness 是金丝雀标准做法，可精准控比与黏客户。",
    "result_flow": "客户请求 → ALB 依权重选群组 → cookie 记住版本 → 之后同一客户固定走同版本。",
    "options": {
      "A": "错。DNS 加权无法保证同一客户固定版本（快取／解析不一致）。",
      "B": "✓ 正确。ALB 加权 + stickiness 精准 10% 并黏客户。",
      "C": "错。RollingUpdate 控批次替换，不是 10% 客户流量。",
      "D": "错。双 ASG + LOR 不保证版本比例与客户粘性。"
    },
    "diagram_before": "flowchart TB\n  C[\"客户流量 100%\"] --> OLD[\"现行版本\"]\n  NEW[\"新业务逻辑 10%?\"]\n  C -.-> NEW\n  X{{\"缺口: 无金丝雀权重<br/>也无同客户黏版本\"}}\n  NEW -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  C[\"客户请求\"] --> ALB[\"ALB 加权目标群组\"]\n  ALB -->|约 90%| V1[\"旧版本 TG\"]\n  ALB -->|约 10%| V2[\"新版本 TG\"]\n  ALB --> STK[\"Stickiness cookie<br/>同客户固定版本\"]\n"
  },
  "193": {
    "blocker": "WorkSpaces 使用者设定档在 FSx for Windows（HDD、16 MBps），登入变慢；维护窗内要用最少操作拉高效能。",
    "requirements": "1) 提升档案系统效能；2) 管理 effort 最低；3) 可在维护窗完成。",
    "steps": [
      "在 FSx 主控台选取现有档案系统。",
      "将储存类型由 HDD 改为 SSD（原地升级）。",
      "将吞吐量容量提高到 32 MBps。",
      "无需搬资料、不必改 DNS 或重建系统。"
    ],
    "solutions": "正确答案 B。FSx for Windows 支援原地改储存类型与吞吐量，管理成本最低。",
    "result_flow": "维护窗 → 主控台升级 SSD + 32 MBps → WorkSpaces 读写设定档变快 → 使用者登入改善。",
    "options": {
      "A": "错。备份还原到新系统要停机与 DNS 切换，effort 高。",
      "B": "✓ 正确。原地改 type／throughput，effort 最低。",
      "C": "错。DataSync 迁到新系统步骤多。",
      "D": "错。Shadow copy + 新建系统复杂，非标准调校。"
    },
    "diagram_before": "flowchart TB\n  WS[\"WorkSpaces\"] --> PROF[\"使用者设定档\"]\n  PROF --> FSX[\"FSx for Windows<br/>HDD 16 MBps\"]\n  X{{\"缺口: 登入变慢<br/>效能不足\"}}\n  FSX -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  WIN[\"维护窗\"] --> UP[\"原地升级 FSx\"]\n  UP --> SSD[\"改 SSD 储存类型\"]\n  UP --> TH[\"吞吐量 32 MBps\"]\n  WS[\"WorkSpaces\"] --> FSX[\"FSx 设定档变快\"]\n  FSX --> OK[\"登入改善\"]\n"
  },
  "194": {
    "blocker": "应用只读写单一 S3 bucket，现在要双 Region 部署，又不想大改应用或重维运。",
    "requirements": "1) 双 Region 部署；2) 物件可在两地使用；3) 运维最低。",
    "steps": [
      "在第二 Region 建新 bucket，两 bucket 开 Versioning。",
      "设定双向 CRR 保持同步。",
      "建立 S3 Multi-Region Access Point 当统一端点。",
      "两 Region 部署应用，一律透过 MRAP 存取。"
    ],
    "solutions": "正确答案 B。双向 CRR + MRAP 让应用不需知道 bucket 在哪，运维最简。",
    "result_flow": "Region A/B 应用 → MRAP → 近端 bucket 读写 → CRR 同步到另一 Region。",
    "options": {
      "A": "错。CloudFront／Global Accelerator 不解双 Region S3 写入同步。",
      "B": "✓ 正确。双向 CRR + MRAP 是推荐的低运维双 Region S3 方案。",
      "C": "错。单向 CRR + 只写新 bucket，另一区资料不完整。",
      "D": "错。Gateway Endpoint 是 VPC 内网路径，不解跨 Region 复写。"
    },
    "diagram_before": "flowchart TB\n  APP[\"应用\"] --> S3[\"单一 Region S3\"]\n  R2[\"第二 Region 部署\"]\n  APP -.-> R2\n  X{{\"缺口: 双 Region 物件<br/>又怕大改应用\"}}\n  R2 -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  A[\"Region A 应用\"] --> MRAP[\"MRAP 统一端点\"]\n  B[\"Region B 应用\"] --> MRAP\n  MRAP --> BA[\"Bucket A\"]\n  MRAP --> BB[\"Bucket B\"]\n  BA <-->|\"双向 CRR\"| BB\n"
  },
  "195": {
    "blocker": "游戏平台要上 AWS：需要高效能运算、排行榜变很快（原 on-prem Redis）、Node.js 展示层，要优化效能且稳定。",
    "requirements": "1) HPC／运算密集；2) 低延迟排行榜（Redis 类）；3) 可扩展 Web；4) 关键服务稳定。",
    "steps": [
      "选 compute-optimized（如 c5）On-Demand 组成 Auto Scaling，挂在 ALB 后。",
      "用 Amazon ElastiCache for Redis 取代地端 Redis 存排行榜与游戏状态。",
      "应用连 ElastiCache 读写排行榜，避免每次打磁碟型资料库。",
      "依 CPU／连线扩缩 ASG，维持游戏尖峰效能。"
    ],
    "solutions": "正确答案 C。c5 On-Demand 适合运算密集游戏逻辑；ElastiCache Redis 对口原 Redis 排行榜；On-Demand 避免 Spot 被回收影响体验。",
    "result_flow": "玩家 → ALB → c5 游戏节点 → ElastiCache Redis 更新／读取排行榜 → 回应玩家。",
    "options": {
      "A": "错。m5 非运算优化首选；Spot 可能中断影响游戏。",
      "B": "错。OpenSearch 不是 Redis 排行榜的自然对应，且 Spot 有中断风险。",
      "C": "✓ 正确。c5 On-Demand + ElastiCache Redis，效能与稳定兼顾。",
      "D": "错。m5 非 HPC 首选；DynamoDB 可做排行榜但迁移自 Redis 不如 ElastiCache 直接。"
    },
    "diagram_before": "flowchart TB\n  P[\"玩家\"] --> WEB[\"Node 展示层\"]\n  WEB --> COMP[\"高效能游戏逻辑?\"]\n  WEB --> LB[\"排行榜 原 on-prem Redis\"]\n  X{{\"缺口: 要稳定 HPC<br/>+ 低延迟 Redis 类\"}}\n  LB -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  P[\"玩家\"] --> ALB[\"ALB\"]\n  ALB --> C5[\"c5 On-Demand<br/>运算密集\"]\n  C5 --> REDIS[\"ElastiCache Redis<br/>排行榜\"]\n  REDIS --> P\n"
  },
  "196": {
    "blocker": "员工用手机交工时表，周五尖峰；要高可用可扩展，资料要能做月报，且运维要少。",
    "requirements": "1) 周五尖峰可扩；2) 高可用；3) 支援月报；4) 运维最低。（选两项）",
    "steps": [
      "把应用做成容器，跑在 ECS，跨多 AZ 并用排程 Service Auto Scaling 周五前加容量。",
      "工时资料存 Amazon S3（低成本物件储存）。",
      "用 Amazon Athena 直接查 S3 产报表。",
      "用 Amazon QuickSight 做月报仪表板。"
    ],
    "solutions": "正确答案 B、E。ECS 排程扩展扛周五；S3 + Athena + QuickSight 无伺服器分析，不用养资料库丛集。",
    "result_flow": "手机提交 → ECS 服务（周五已预扩）→ 写入 S3 → Athena 查询 → QuickSight 月报。",
    "options": {
      "A": "错。EC2 On-Demand 自管机器，运维高于 ECS 托管排程扩展。",
      "B": "✓ 正确。ECS + 排程扩展对周五尖峰，运维较低。",
      "C": "错。此组合未同时满足尖峰容器扩展与低运维报表的最佳配对（题库选 B+E）。",
      "D": "错。Redshift 丛集运维与成本高于 S3+Athena。",
      "E": "✓ 正确。S3 + Athena + QuickSight 低运维月报链。"
    },
    "diagram_before": "flowchart TB\n  PH[\"手机交工时表\"] --> APP[\"后端\"]\n  APP --> FRI{{\"周五尖峰压力\"}}\n  APP --> RPT[\"月报需求\"]\n  X{{\"缺口: 扩展+分析<br/>运维要低\"}}\n  FRI -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  PH[\"手机提交\"] --> ECS[\"ECS + 排程扩展<br/>周五预扩\"]\n  ECS --> S3[\"写入 S3\"]\n  S3 --> ATH[\"Athena 查询\"]\n  ATH --> QS[\"QuickSight 月报\"]\n"
  },
  "197": {
    "blocker": "S3 放敏感资料：要记所有物件活动、日志留 5 年；有人试图删资料要立刻 email；还要尽量省钱。",
    "requirements": "1) 记录物件级活动；2) 日志保留 5 年；3) 删除尝试 email；4) 最具成本效益。（选三项）",
    "steps": [
      "开启 CloudTrail 的 S3 data events，记录 Get/Put/Delete 等物件操作。",
      "另建 S3 bucket 存日志，用 Lifecycle 转低成本层并保留 5 年。",
      "物件删除事件送到 EventBridge，再发到 SNS。",
      "SNS 订阅 email，安全团队即时收到删除尝试通知。"
    ],
    "solutions": "正确答案 A、D、F。CloudTrail data events 记活动；EventBridge→SNS 做删除告警；独立 bucket + Lifecycle 管 5 年最省事省钱。",
    "result_flow": "S3 物件操作 → CloudTrail data events → 日志 bucket（Lifecycle 5 年）；Delete 事件 → EventBridge → SNS → email。",
    "options": {
      "A": "✓ 正确。CloudTrail data events 记录物件级活动。",
      "B": "错。Server access log 较粗，合规物件级活动首选 CloudTrail data events。",
      "C": "错。S3 不能直接把删除事件丢 SES，应走 EventBridge/SNS。",
      "D": "✓ 正确。删除事件 → EventBridge → SNS email，标准告警链。",
      "E": "错。Timestream 不适合当 5 年审计日志主存。",
      "F": "✓ 正确。独立日志 bucket + Lifecycle 成本与保留兼顾。"
    },
    "diagram_before": "flowchart TB\n  S3[\"敏感 S3 资料\"]\n  S3 -.-> ACT[\"物件活动谁记？\"]\n  S3 -.-> DEL[\"删除尝试谁通知？\"]\n  X{{\"缺口: 5 年日志+即时告警<br/>又要省钱\"}}\n  ACT -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  S3[\"S3 物件操作\"] --> CT[\"CloudTrail Data Events\"]\n  CT --> LOG[\"独立日志 Bucket<br/>Lifecycle 5 年\"]\n  S3 --> EB[\"Delete → EventBridge\"]\n  EB --> SNS[\"SNS email 告警\"]\n"
  },
  "198": {
    "blocker": "地端要连三个不同 Region 的 VPC 里 EC2，也要能用 AWS 公有服务；目前只有一条 Direct Connect 接到最近 Region，想最低成本。",
    "requirements": "1) 地端进三 Region VPC；2) 地端进 AWS 公有服务；3) 最低成本。（选两项）",
    "steps": [
      "在最近 Region 建 Direct Connect Gateway，把现有 DX 接上去。",
      "透过 DX Gateway 关联各 Region 的 VPC，让一条 DX 通多 Region 私有网。",
      "建立 Public VIF，让地端走专线存取 S3 等 AWS 公有服务。",
      "避免再拉两条跨 Region 的昂贵 DX。"
    ],
    "solutions": "正确答案 A、D。DX Gateway 用一条 DX 连多 Region VPC；Public VIF 提供公有服务路径，整体成本最低。",
    "result_flow": "地端 → DX → DX Gateway → 各 Region VPC 内 EC2；另经 Public VIF → AWS 公有服务端点。",
    "options": {
      "A": "✓ 正确。DX Gateway 一条 DX 扩到多 Region VPC，省成本。",
      "B": "错。每 Region 再拉 DX 最贵。",
      "C": "错。Private VIF 上再架 VPN 到其他 VPC 路径别扭且非最低成本首选。",
      "D": "✓ 正确。Public VIF 解决公有服务存取。",
      "E": "错。跨 Region Peering + 单 private VIF 无法完整覆盖三 Region 与公有服务。"
    },
    "diagram_before": "flowchart TB\n  OP[\"地端\"] --> DX[\"一条 DX<br/>最近 Region\"]\n  DX --> VPC1[\"该 Region VPC\"]\n  R2[\"其他两 Region VPC\"]\n  PUB[\"AWS 公有服务\"]\n  OP -.-> R2\n  OP -.-> PUB\n  X{{\"缺口: 多 Region + 公有服务<br/>成本要最低\"}}\n  R2 -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  OP[\"地端\"] --> DX[\"Direct Connect\"]\n  DX --> DXGW[\"DX Gateway\"]\n  DXGW --> V1[\"Region1 VPC/EC2\"]\n  DXGW --> V2[\"Region2 VPC/EC2\"]\n  DXGW --> V3[\"Region3 VPC/EC2\"]\n  DX --> PVIF[\"Public VIF → 公有服务\"]\n"
  },
  "199": {
    "blocker": "Organizations 下数百帐号，所有 CloudFront 都要有 OWASP Top 10 基线 WAF，要能自动套到新旧 distribution。",
    "requirements": "1) 全组织 CloudFront 基线 WAF；2) 涵盖现有与新建；3) 可集中管理。（选三项）",
    "steps": [
      "为组织开启 all features（完整功能，Firewall Manager 需要）。",
      "在所有帐号启用 AWS Config（Firewall Manager 合规评估依赖）。",
      "用 AWS Firewall Manager 集中部署 WAF 规则到所有帐号的 CloudFront。",
      "规则采用 OWASP 相关托管规则组做基线防护。"
    ],
    "solutions": "正确答案 A、C、D。Config + 组织全功能 + Firewall Manager 是跨帐号强制 WAF 的标准三件套。",
    "result_flow": "管理帐号设 Firewall Manager 政策 → 依赖 Config 与 Organizations 全功能 → 自动把 WAF 绑到各帐号 CloudFront。",
    "options": {
      "A": "✓ 正确。Config 是 Firewall Manager 必要前提。",
      "B": "错。GuardDuty 是威胁侦测，不负责部署 WAF。",
      "C": "✓ 正确。组织 all features 才能用 Firewall Manager 等进阶功能。",
      "D": "✓ 正确。Firewall Manager 跨帐号部署 WAF 到 CloudFront。",
      "E": "错。Shield Advanced 偏 DDoS，不是部署 OWASP WAF 规则的工具。",
      "F": "错。Security Hub 是汇总发现，不部署 WAF。"
    },
    "diagram_before": "flowchart TB\n  CF1[\"帐号A CloudFront\"]\n  CF2[\"帐号B CloudFront\"]\n  CFN[\"新建 distribution\"]\n  CF1 -.-> WAF[\"WAF 各管各的?\"]\n  CF2 -.-> WAF\n  X{{\"缺口: 全组织基线 OWASP WAF<br/>新旧都要自动套\"}}\n  CFN -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  ORG[\"Organizations 全功能\"] --> CFG[\"AWS Config\"]\n  ORG --> FMS[\"Firewall Manager 政策\"]\n  CFG --> FMS\n  FMS --> WAF[\"自动绑 WAF<br/>到各帐号 CloudFront\"]\n  WAF --> BASE[\"OWASP Top 10 基线\"]\n"
  },
  "200": {
    "blocker": "SAML 2.0 联合登入：管理员测试可以进 AWS，一般测试使用者却进不去，要逐项排查设定。",
    "requirements": "1) 找出联合失败原因；2) 确认 IdP 映射、STS 呼叫、使用者群组。（选三项）",
    "steps": [
      "确认测试使用者是否在公司 IdP 的联合群组（如 AWSFederatedUsers）。",
      "确认入口网站呼叫 STS AssumeRoleWithSAML 时带了 SAML provider ARN、Role ARN 与 assertion。",
      "确认 IdP 的 SAML assertion 正确把使用者／群组映射到有权限的 IAM Role。",
      "修正后再以测试使用者走完整登入流程验证。"
    ],
    "solutions": "正确答案 B、C、E。联合成功靠：使用者在正确 IdP 群组、前端正确呼叫 AssumeRoleWithSAML、assertion 映射到 IAM Role。",
    "result_flow": "使用者 → 公司 IdP 验证 → SAML assertion → 入口呼叫 AssumeRoleWithSAML → 取得临时凭证 → 进 AWS。",
    "options": {
      "A": "错。联合用的是 IAM Role，不是 IAM user 的 SAML 权限政策。",
      "B": "✓ 正确。测试使用者不在联合群组会被 IdP 挡下。",
      "C": "✓ 正确。AssumeRoleWithSAML 参数必须正确。",
      "D": "错。IdP DNS 不必从 VPC 可达；浏览器／入口在使用者网路连 IdP。",
      "E": "✓ 正确。assertion 映射错误会拿到错 Role 或没 Role。"
    },
    "diagram_before": "flowchart TB\n  ADM[\"管理员测试 ✓ 可进\"]\n  USR[\"一般测试使用者 ✗ 进不去\"]\n  IDP[\"SAML 2.0 IdP\"]\n  USR --> IDP\n  X{{\"缺口: 群组/映射/STS<br/>设定要逐项查\"}}\n  USR -.-> X\n  ADM -.->|存在但未接上| X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  U[\"使用者\"] --> IDP[\"公司 IdP 群组正确\"]\n  IDP --> SAML[\"SAML assertion 映射 Role\"]\n  SAML --> STS[\"AssumeRoleWithSAML\"]\n  STS --> TMP[\"临时凭证\"]\n  TMP --> AWS[\"进入 AWS\"]\n"
  },
  "201": {
    "blocker": "Aurora MySQL 连线被打满（多为插入）；凭证还写在明文设定档，要解连线过载并安全管密。",
    "requirements": "1) 缓解连线过载；2) 凭证安全存放并可轮替。",
    "steps": [
      "在 DB 前部署 Amazon RDS Proxy（连线池代理：多应用共用少数 DB 连线）。",
      "把资料库帐密存进 AWS Secrets Manager（机密管理员）。",
      "让 RDS Proxy 从 Secrets Manager 取凭证，支援自动轮替。",
      "应用改连 Proxy 端点，不再直连 Aurora、不再读明文档。"
    ],
    "solutions": "正确答案 A。RDS Proxy 解连线风暴；Secrets Manager 专为密钥轮替，与 Proxy 整合最佳。",
    "result_flow": "应用 → RDS Proxy（连线池）→ Aurora；凭证由 Secrets Manager 注入 Proxy，轮替时应用无感。",
    "options": {
      "A": "✓ 正确。Proxy + Secrets Manager，连线与密钥一次解。",
      "B": "错。Parameter Store 轮替能力不如 Secrets Manager 完整。",
      "C": "错。Replica 帮读不帮写连线过载；也没有 Proxy。",
      "D": "错。同样没解写入连线池问题。"
    },
    "diagram_before": "flowchart TB\n  APP[\"大量插入应用\"] --> AUR[\"Aurora MySQL\"]\n  AUR --> FULL{{\"连线被打满\"}}\n  CFG[\"明文设定档密码\"]\n  APP -.-> CFG\n  X{{\"缺口: 连线池+密钥安全\"}}\n  FULL -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  APP[\"应用\"] --> PROXY[\"RDS Proxy 连线池\"]\n  PROXY --> AUR[\"Aurora\"]\n  SM[\"Secrets Manager\"] --> PROXY\n  SM --> ROT[\"凭证轮替应用无感\"]\n"
  },
  "202": {
    "blocker": "电商站要 DR：EC2 ASG + RDS MySQL；灾难时要在短 RTO 内切到备援 Region，RPO 约 30 秒级，成本可控。",
    "requirements": "1) 跨 Region DR；2) 低 RPO／约 10 分钟内 RTO；3) 备援区成本不要全量常开。",
    "steps": [
      "用 IaC 在 DR Region 准备基础设施模板。",
      "RDS 建 cross-Region read replica 持续复写。",
      "用 AWS Elastic Disaster Recovery 持续复制 EC2，DR 区以最小容量待命。",
      "Route 53 failover + health check，灾难时切流量并放大 DR 容量、提升 replica 为主库。"
    ],
    "solutions": "正确答案 B。IaC + RDS 跨区副本 + Elastic DR 持续复制 EC2 + DNS failover，兼顾 RPO/RTO 与成本。",
    "result_flow": "日常：主 Region 服务，EDR／RDS 副本同步到 DR → 灾难：Route 53 切换 → DR 起机器 + promote 提升 → 服务恢复。",
    "options": {
      "A": "错。高频备份不切实际；geolocation 不是 failover。",
      "B": "✓ 正确。Elastic DR + 跨区副本 + 最小容量 + failover，达标且省钱。",
      "C": "错。每 30 秒备份不实际；手动还原难达 10 分钟 RTO。",
      "D": "错。改 Aurora Global 迁移动作大；DR 全容量常开最贵。"
    },
    "diagram_before": "flowchart TB\n  U[\"用户\"] --> ASG[\"EC2 ASG 主 Region\"]\n  ASG --> RDS[\"RDS MySQL 主 Region\"]\n  X{{\"缺口: 短 RTO 跨 Region DR<br/>RPO 约 30 秒\"}}\n  ASG -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  PRI[\"主 Region 服务\"] --> EDR[\"Elastic DR 复写 EC2\"]\n  PRI --> RR[\"RDS 跨区唯读副本\"]\n  EDR --> DR[\"备援 Region\"]\n  RR --> DR\n  R53[\"Route 53 Failover\"] --> DR\n  DR --> UP[\"提升 DB + 起机器\"]\n"
  },
  "203": {
    "blocker": "一次性把 60TB 地端 MySQL 迁到 us-east-1 Aurora；现有上网频宽很窄，估要一个月，想更快完成。",
    "requirements": "1) 60TB 尽快进 AWS；2) 最终在 Aurora MySQL；3) 不受窄频宽拖死。",
    "steps": [
      "订购 AWS Snowball Edge，在地端把资料载到设备。",
      "设备运回 AWS，经 S3 介面把资料进 S3 bucket。",
      "用 AWS DMS 从 S3／来源路径迁移到 Aurora MySQL。",
      "可再跑增量同步，缩短切换窗口。"
    ],
    "solutions": "正确答案 C。大容量一次迁移用 Snowball Edge 实体运送最快；DMS 负责进 Aurora。",
    "result_flow": "地端 60TB → Snowball Edge → 运送上云 → S3 → DMS → Aurora MySQL。",
    "options": {
      "A": "错。1Gbps DX 仍慢且申请久，不如实体运送 60TB。",
      "B": "错。DataSync 仍受窄频限制；Application Migration 偏整机不是 60TB 库。",
      "C": "✓ 正确。Snowball Edge + S3 + DMS 最快大容量路径。",
      "D": "错。旧版 Snowball Adapter 过时；App Migration 非 DB 工具。"
    },
    "diagram_before": "flowchart TB\n  DB[\"地端 MySQL 60TB\"] --> NET[\"窄频宽上网\"]\n  NET --> AWS[\"us-east-1 Aurora\"]\n  X{{\"缺口: 估要一个月<br/>太慢\"}}\n  NET -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  DB[\"地端 60TB\"] --> SB[\"Snowball Edge\"]\n  SB --> SHIP[\"实体运送上云\"]\n  SHIP --> S3[\"S3\"]\n  S3 --> DMS[\"DMS\"]\n  DMS --> AUR[\"Aurora MySQL\"]\n"
  },
  "204": {
    "blocker": "20 台持久 EC2 挂多颗 EBS，要在另一 Region 备援；1 个工作天内能复原组态与磁碟，资料丢失不超过一天，人手有限。",
    "requirements": "1) 跨 Region 备份；2) 约 1 日 RPO／1 工作日 RTO；3) 集中好管。",
    "steps": [
      "用 AWS Backup 建每日排程，备份 EC2／EBS。",
      "设定 backup 自动 copy 到次 Region 的 vault。",
      "IaC（CloudFormation）保存如何重建实例的组态。",
      "灾难时：在次 Region 跑模板 + Backup 还原磁碟并挂回。"
    ],
    "solutions": "正确答案 C。AWS Backup 统一排程、跨区复制与还原，人手少时最省事。",
    "result_flow": "每日 AWS Backup → 主 Region vault → copy 次 Region vault；灾难 → CloudFormation 建基础 → 还原 EBS → 挂到实例。",
    "options": {
      "A": "错。SSM runbook 自管快照复制，复杂度高于 Backup。",
      "B": "错。DLM 只管 EBS 生命周期，EC2 组态覆盖不足。",
      "C": "✓ 正确。Backup 集中管 EC2/EBS 与跨区，最合适。",
      "D": "错。次 Region 常开同等 EC2 成本高；DataSync 也不备 EC2 组态。"
    },
    "diagram_before": "flowchart TB\n  EC2[\"20 台持久 EC2\"] --> EBS[\"多颗 EBS\"]\n  DR[\"另一 Region 备援?\"]\n  EC2 -.-> DR\n  X{{\"缺口: 1 工作天复原<br/>RPO 1 天、人手少\"}}\n  DR -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  RES[\"EC2 + EBS\"] --> BKP[\"AWS Backup 每日\"]\n  BKP --> V1[\"主 Region vault\"]\n  V1 --> V2[\"跨区 copy 次 Region\"]\n  DIS[\"灾难\"] --> CFN[\"CloudFormation 基础\"]\n  CFN --> RST[\"还原 EBS 挂实例\"]\n"
  },
  "205": {
    "blocker": "新站用 S3 + CloudFront 上下载大档，公司要求传输与静态都必须加密。",
    "requirements": "1) 静态加密；2) 传输加密（用户到边缘、到 S3）；3) 拒绝未加密操作。（选三项）",
    "steps": [
      "开启 S3 server-side encryption。",
      "写 bucket policy 拒绝未加密／非 TLS 的操作。",
      "CloudFront 把 HTTP 重导到 HTTPS。",
      "使用者全程走 TLS，物件落盘已加密。"
    ],
    "solutions": "正确答案 A、C、E。SSE + 拒绝未加密操作 + CloudFront 强制 HTTPS，覆盖静态与传输。",
    "result_flow": "用户 HTTPS → CloudFront →（TLS）→ S3；物件以 SSE 存放；违规 API 被 bucket policy 拒绝。",
    "options": {
      "A": "✓ 正确。SSE 是静态加密基础。",
      "B": "错。SecureTransport 应写在 bucket policy，不是 ACL。",
      "C": "✓ 正确。Bucket policy 拒绝未加密操作。",
      "D": "错。CloudFront 没有这种 SSE-KMS at rest 设定方式。",
      "E": "✓ 正确。CloudFront HTTP→HTTPS 保证浏览器传输加密。",
      "F": "错。Presigned RequireSSL 只涵盖预签场景，不如全面政策。"
    },
    "diagram_before": "flowchart TB\n  U[\"用户\"] --> CF[\"CloudFront\"]\n  CF --> S3[\"S3 大档\"]\n  X{{\"缺口: 传输+静态<br/>都必须加密\"}}\n  S3 -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  U[\"用户 HTTPS\"] --> CF[\"CloudFront 强制 TLS\"]\n  CF --> S3[\"S3 SSE 静态加密\"]\n  POL[\"Bucket Policy\"] --> DENY[\"拒未加密 PUT\"]\n  S3 --> POL\n"
  },
  "206": {
    "blocker": "Lambda 要连 RDS SQL Server；开发可碰开发库密码，正式库密码只能 IT 安全用客户管理金钥加密并轮替，开发者不能看。",
    "requirements": "1) 正式凭证保密且可轮替；2) Lambda 执行时能取密连库；3) 仅 IT 安全可管理 secret／金钥。",
    "steps": [
      "把正式 DB 帐密存 Secrets Manager，用 KMS 客户管理金钥加密。",
      "Secret 与 KMS key 政策只允许 IT 安全与正式 Lambda 角色存取。",
      "Lambda execution role 授予 secretsmanager:GetSecretValue。",
      "启用 Secrets Manager 对 RDS 的自动轮替。"
    ],
    "solutions": "正确答案 D。Secrets Manager + KMS CMK + 严格 IAM 是 Lambda 连 RDS 的标准：可轮替、可最小权限、不把密码塞环境变数。",
    "result_flow": "Lambda 启动 → 用角色读 Secrets Manager（KMS 解密）→ 取得帐密 → 连 RDS；开发者 IAM 无法读正式 secret。",
    "options": {
      "A": "错。Parameter Store 可存密，但 RDS 自动轮替不如 Secrets Manager 完整。",
      "B": "错。预设 Lambda KMS key 非客户管；环境变数在主控台可见，不安全。",
      "C": "错。环境变数即使加密仍易在主控台暴露，轮替要自己写。",
      "D": "✓ 正确。Secrets Manager + CMK + IAM 最小权限，最佳实践。"
    },
    "diagram_before": "flowchart TB\n  DEV[\"开发者\"] --> DEVDB[\"开发库密码可碰\"]\n  L[\"Lambda\"] --> PROD[\"正式 RDS SQL Server\"]\n  PROD -.-> SEC{{\"正式密码暴露风险\"}}\n  X{{\"缺口: CMK 加密轮替<br/>开发者不可见正式密\"}}\n  SEC -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  L[\"Lambda 角色\"] --> SM[\"Secrets Manager\"]\n  SM --> KMS[\"KMS CMK 解密\"]\n  KMS --> CRED[\"正式帐密\"]\n  CRED --> RDS[\"连 RDS\"]\n  DEV[\"开发者 IAM\"] -.->|无权读正式 secret| SM\n"
  },
  "207": {
    "blocker": ".NET 三层（Web ALB + App ALB + SQL Server）要上 AWS，不想大改写，要更好扩展并降低授权成本。",
    "requirements": "1) 尽量托管；2) 少改应用；3) 可扩展；4) 降低 SQL Server 授权成本。",
    "steps": [
      "Web／App 层改跑 EC2 Auto Scaling，前面各挂 ALB。",
      "资料库改 Amazon Aurora PostgreSQL 并启用 Babelfish（相容许多 SQL Server 语法／协议）。",
      "应用连线字串指向 Babelfish 端点，减少改写。",
      "用 ASG 指标扩缩承载尖峰。"
    ],
    "solutions": "正确答案 A。ASG+ALB 解扩展；Babelfish 让多数 .NET／SQL Server 应用少改写上 Aurora，省授权费。",
    "result_flow": "用户 → ALB(Web) → ALB(App) → Aurora PostgreSQL（Babelfish）→ 回应用户。",
    "options": {
      "A": "✓ 正确。EC2 ASG + ALB + Aurora Babelfish，扩展与省授权兼顾。",
      "B": "错。仍用 SQL Server 授权成本高。",
      "C": "错。大改写不符「不重写」。",
      "D": "错。未同时解决扩展与授权的最佳组合。"
    },
    "diagram_before": "flowchart TB\n  U[\"用户\"] --> WEB[\".NET Web + ALB\"]\n  WEB --> APP[\"App + ALB\"]\n  APP --> SQL[\"SQL Server<br/>授权成本高\"]\n  X{{\"缺口: 想少改写上云<br/>又要扩展与省授权\"}}\n  SQL -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  U[\"用户\"] --> W[\"ALB Web ASG\"]\n  W --> A[\"ALB App ASG\"]\n  A --> AUR[\"Aurora PostgreSQL<br/>Babelfish\"]\n  AUR --> U\n"
  },
  "208": {
    "blocker": "EKS API 经 ALB 对外，还有非标准 HTTP 方法；美国以外使用者很慢，想加速又少运维。",
    "requirements": "1) 降低跨洲延迟；2) 支援非标准 HTTP 方法；3) 运维最低。",
    "steps": [
      "在 ALB 前加 AWS Global Accelerator（全球加速：就近进 AWS 骨干网）。",
      "GA 终端指向现有 ALB。",
      "保留原 ALB／EKS 组态，不必为非标准方法换 CDN 规则。",
      "海外使用者连最近 PoP，再经骨干到应用 Region。"
    ],
    "solutions": "正确答案 C。Global Accelerator 加速任意 TCP 到 ALB，含非标准方法；CloudFront 对非标准方法支援较受限。",
    "result_flow": "海外用户 → 近端 GA 边缘 → AWS 全球网路 → ALB → EKS API。",
    "options": {
      "A": "错。CloudFront 对非标准方法／部分 API 场景不如 GA 直接。",
      "B": "错。多 Region 全复制成本高、运维重。",
      "C": "✓ 正确。GA + 既有 ALB，延迟降、运维低。",
      "D": "错。只加快取不解跨洋 TCP 延迟与非标准方法。"
    },
    "diagram_before": "flowchart TB\n  US[\"美国外用户\"] --> ALB[\"ALB 公开\"]\n  ALB --> EKS[\"EKS API<br/>含非标准 HTTP 方法\"]\n  X{{\"缺口: 跨洋延迟高<br/>方法支援要完整\"}}\n  US -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  US[\"海外用户\"] --> GA[\"Global Accelerator<br/>近端边缘\"]\n  GA --> NET[\"AWS 全球骨干\"]\n  NET --> ALB[\"ALB\"]\n  ALB --> EKS[\"EKS API 任意 TCP\"]\n"
  },
  "209": {
    "blocker": "数百万 MQTT 感测器打到单一 EC2 自建 broker，再写 DynamoDB；broker 过载丢资料。",
    "requirements": "1) 提高可靠性；2) 不再单点；3) 仍写 DynamoDB。",
    "steps": [
      "改用 AWS IoT Core 当全托管 MQTT broker。",
      "设定自订网域，装置 DNS 尽量不变。",
      "建 IoT Rule 把讯息写入 DynamoDB。",
      "装置改连 IoT Core，淘汰单机 broker。"
    ],
    "solutions": "正确答案 B。IoT Core 自动扩展、高可用，消除 EC2 broker 单点，Rule 直写 DynamoDB。",
    "result_flow": "感测器 MQTT → IoT Core → IoT Rule → DynamoDB；不再经单一 EC2。",
    "options": {
      "A": "错。多 EC2 broker 仍要自己做 HA／扩展。",
      "B": "✓ 正确。IoT Core + Rule → DynamoDB，可靠且省运维。",
      "C": "错。NLB + 单机仍是瓶颈风险。",
      "D": "错。Kinesis 链过重且未直接解 MQTT 接入。"
    },
    "diagram_before": "flowchart TB\n  SEN[\"数百万 MQTT 感测器\"] --> EC2[\"单一 EC2 自建 broker\"]\n  EC2 --> DDB[\"DynamoDB\"]\n  X{{\"缺口: broker 过载<br/>丢资料\"}}\n  EC2 -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  SEN[\"感测器 MQTT\"] --> IOT[\"IoT Core 自动扩展\"]\n  IOT --> RULE[\"IoT Rule\"]\n  RULE --> DDB[\"DynamoDB\"]\n  NOTE[\"不再经单一 EC2\"] --> IOT\n"
  },
  "210": {
    "blocker": "每台 EC2 用不同 SSH key，要自动轮替、安全存放，且轮替时停机少于 1 分钟。",
    "requirements": "1) 自动轮替全部 key；2) 加密安全存放；3) 停机 < 1 分钟。",
    "steps": [
      "把私钥／相关材料存 Secrets Manager。",
      "排程触发 Lambda：产生新 key pair。",
      "Lambda 更新实例 authorized_keys（或同等机制）并写回 secret。",
      "旧 key 失效，全程短暂、可自动化。"
    ],
    "solutions": "正确答案 A。Secrets Manager 管轮替排程 + Lambda 换 key，专为凭证生命周期设计。",
    "result_flow": "排程 → Secrets Manager 轮替 → Lambda 产新 key → 更新 EC2 公钥 → 新 secret 生效。",
    "options": {
      "A": "✓ 正确。Secrets Manager + Lambda 轮替，标准且低停机。",
      "B": "错。Parameter Store 缺完整轮替工作流。",
      "C": "错。手动／SSM 片段化，难保证全体自动与 <1 分。",
      "D": "错。存在明文或非托管轮替风险。"
    },
    "diagram_before": "flowchart TB\n  EC2A[\"EC2 A 独有 SSH key\"]\n  EC2B[\"EC2 B 独有 SSH key\"]\n  EC2C[\"EC2 C 独有 SSH key\"]\n  X{{\"缺口: 无法自动轮替<br/>且停机要 <1 分\"}}\n  EC2A -.-> X\n  EC2B -.->|存在但未接上| X\n  EC2C -.->|存在但未接上| X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  SCH[\"轮替排程\"] --> SM[\"Secrets Manager\"]\n  SM --> L[\"Lambda 产新 key\"]\n  L --> EC2[\"更新 EC2 公钥\"]\n  L --> SEC[\"新 secret 生效\"]\n"
  },
  "211": {
    "blocker": "数千 VMware VM 要迁 AWS，没 CMDB、不知利用率，要准确盘点又少装 agent。",
    "requirements": "1) 准确盘点与利用率；2) 成本规划；3) 运维最低。",
    "steps": [
      "在 VMware 环境部署 Migration Evaluator agentless collector。",
      "收集 CPU／记忆体／磁碟等利用率，找出闲置机。",
      "把资料汇入 Migration Hub 做迁移规划。",
      "依建议选对实例与关闭浪费。"
    ],
    "solutions": "正确答案 C。Agentless collector 免逐台装 agent，对大规模 VMware 评估最省事。",
    "result_flow": "ESXi 环境 → agentless 收集 → Migration Evaluator 分析 → Migration Hub 规划迁移。",
    "options": {
      "A": "错。逐台 agent 在数千机运维高。",
      "B": "错。只靠帐单／手动试算不够准。",
      "C": "✓ 正确。Agentless + Evaluator + Hub，准且省。",
      "D": "错。Application Discovery 有 agent 方案，大规模不如 agentless 轻。"
    },
    "diagram_before": "flowchart TB\n  VM[\"数千 VMware VM\"]\n  CMDB[\"无 CMDB\"]\n  UTIL[\"不知利用率\"]\n  VM -.-> CMDB\n  X{{\"缺口: 要准确盘点<br/>又少装 agent\"}}\n  UTIL -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  ESX[\"ESXi 环境\"] --> COL[\"Agentless Collector\"]\n  COL --> ME[\"Migration Evaluator\"]\n  ME --> MH[\"Migration Hub 规划\"]\n  MH --> PLAN[\"迁移建议\"]\n"
  },
  "212": {
    "blocker": "Lambda 写地端 SQL（连线数有限，已有 DX）；大量并发一打，资料库就垮。",
    "requirements": "1) 保护有限 DB 连线；2) 尖峰可缓冲；3) 仍经 DX 写入。",
    "steps": [
      "Lambda 先把写入请求丢进 SQS。",
      "另一组 Lambda 从 SQS 拉讯息再写 DB。",
      "对写 DB 的 Lambda 设 reserved concurrency（保留并发上限）。",
      "尖峰积在伫列，DB 连线数被并发上限保护。"
    ],
    "solutions": "正确答案 A。SQS 缓冲 + reserved concurrency 限流，是保护下游小连线池的标准模式。",
    "result_flow": "高并发 Lambda → SQS → 限并发 Lambda → DX → 地端 SQL。",
    "options": {
      "A": "✓ 正确。伫列 + 限并发，保护 DB。",
      "B": "错。只加机器不解 Lambda 并发打爆连线。",
      "C": "错。没有缓冲与限流，问题依旧。",
      "D": "错。同步重试可能更打爆 DB。"
    },
    "diagram_before": "flowchart TB\n  L[\"大量并发 Lambda\"] --> DX[\"Direct Connect\"]\n  DX --> SQL[\"地端 SQL<br/>连线数有限\"]\n  X{{\"缺口: 一打就垮<br/>无缓冲限流\"}}\n  L -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  SRC[\"高并发来源\"] --> L1[\"Lambda 写入\"]\n  L1 --> SQS[\"SQS 缓冲\"]\n  SQS --> L2[\"Lambda reserved<br/>concurrency 限流\"]\n  L2 --> DX[\"DX\"]\n  DX --> SQL[\"地端 SQL 受保护\"]\n"
  },
  "213": {
    "blocker": "Grafana 跑单机 EC2 监看 AWS，要 HA（停机目标 <10 分）、保留 dashboard、少运维。",
    "requirements": "1) 高可用；2) 沿用既有 dashboard；3) 运维最低。",
    "steps": [
      "改用 Amazon Managed Grafana 工作区。",
      "接 CloudWatch 等资料源。",
      "汇出旧 dashboard JSON 再汇入托管工作区。",
      "关掉单机 EC2 Grafana。"
    ],
    "solutions": "正确答案 B。托管 Grafana 自带 HA，免 ASG/ALB 自管，dashboard 可迁移。",
    "result_flow": "使用者开 Managed Grafana → 查 CloudWatch → 看既有 dashboard；AWS 负责多 AZ 可用性。",
    "options": {
      "A": "错。自建 ASG+ALB 仍要管 Grafana 版本与状态。",
      "B": "✓ 正确。Managed Grafana 最低运维 + HA。",
      "C": "错。只加第二台 EC2 仍要自己做故障切换。",
      "D": "错。QuickSight 不是 Grafana 替代，dashboard 不相通。"
    },
    "diagram_before": "flowchart TB\n  U[\"使用者\"] --> G[\"Grafana 单机 EC2\"]\n  G --> CW[\"CloudWatch\"]\n  X{{\"缺口: 无 HA<br/>停机目标 <10 分\"}}\n  G -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  U[\"使用者\"] --> MG[\"Amazon Managed Grafana<br/>内建 HA\"]\n  MG --> CW[\"查 CloudWatch\"]\n  MG --> DASH[\"既有 dashboard 迁移\"]\n  AWS[\"AWS 管多 AZ\"] --> MG\n"
  },
  "214": {
    "blocker": "地端 Linux 上 Oracle 要上 AWS，每年要换 DB 密码，想运维最少。",
    "requirements": "1) 迁到托管 Oracle；2) 年度密码轮替自动化。",
    "steps": [
      "迁移到 Amazon RDS for Oracle。",
      "密码存 Secrets Manager。",
      "启用 Secrets Manager 自动轮替（可排一年一次）。",
      "应用从 secret 取连线资讯。"
    ],
    "solutions": "正确答案 B。RDS 托管 + Secrets Manager 自动轮替，免自己写 cron 改密码。",
    "result_flow": "应用 → 读 Secrets Manager → 连 RDS Oracle；到期自动轮替 → 新密码写回 secret。",
    "options": {
      "A": "错。EC2 自管 Oracle 运维重。",
      "B": "✓ 正确。RDS + Secrets Manager 轮替，最低运维。",
      "C": "错。手动年度改密易漏。",
      "D": "错。SSM 参数手动流程不如 Secrets 轮替完整。"
    },
    "diagram_before": "flowchart TB\n  APP[\"应用\"] --> ORCL[\"地端 Linux Oracle\"]\n  ORCL --> PW[\"每年手改 DB 密码\"]\n  X{{\"缺口: 上云后仍要<br/>最低运维轮替\"}}\n  PW -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  APP[\"应用\"] --> SM[\"Secrets Manager\"]\n  SM --> RDS[\"RDS Oracle\"]\n  SM --> ROT[\"自动轮替密码\"]\n  ROT --> SM\n"
  },
  "215": {
    "blocker": "多团队多帐号都要 VPC 连地端，频宽需求 <50Mbps，要最省钱。",
    "requirements": "1) 每帐号 VPC 可连地端；2) <50Mbps 足够；3) 最具成本效益。（选两项）",
    "steps": [
      "用 CloudFormation 在各帐号标准化建 VPC。",
      "各 VPC 建 Site-to-Site VPN 连地端。",
      "避免先上昂贵 Direct Connect／复杂 TGW（流量很小）。",
      "团队用同一模板扩帐号。"
    ],
    "solutions": "正确答案 A、D。小流量场景 VPN + 模板化 VPC 最省；DX/TGW 固定成本不划算。",
    "result_flow": "帐号 VPC（CloudFormation）→ Site-to-Site VPN → 地端机房；多帐号重复同一模式。",
    "options": {
      "A": "✓ 正确。模板化 VPC 降低多帐号建置成本。",
      "B": "错。DX 对 <50Mbps 通常过贵。",
      "C": "错。TGW 增加成本，小流量非必须。",
      "D": "✓ 正确。Site-to-Site VPN 成本效益高。",
      "E": "错。其他高成本连线不符「最省」。"
    },
    "diagram_before": "flowchart TB\n  A1[\"帐号A VPC\"] -.-> OP[\"地端\"]\n  A2[\"帐号B VPC\"] -.-> OP\n  A3[\"多团队多帐号\"] -.-> OP\n  X{{\"缺口: <50Mbps<br/>要最省钱连地端\"}}\n  OP -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  CFN[\"CloudFormation<br/>标准 VPC 模板\"] --> VPC[\"各帐号 VPC\"]\n  VPC --> VPN[\"Site-to-Site VPN\"]\n  VPN --> OP[\"地端机房\"]\n  NOTE[\"小流量免 DX/TGW\"] --> VPN\n"
  },
  "216": {
    "blocker": "100+ 帐号经 TGW 互通，要集中管所有帐号的出站上网过滤；每 AZ 峰值 <25Gbps。",
    "requirements": "1) 集中 egress 过滤；2) 全帐号流量都经此；3) 容量足够。",
    "steps": [
      "建专用 egress VPC 接上 TGW。",
      "放 NAT Gateway 与 AWS Network Firewall（每 AZ endpoint）。",
      "预设路由改指向 Firewall，再出 NAT 上网。",
      "各帐号 VPC 出站路由经 TGW 进 egress VPC。"
    ],
    "solutions": "正确答案 B。集中 egress VPC + Network Firewall 是 Organizations 出站治理标准，全托管规则。",
    "result_flow": "工作负载 VPC → TGW → egress VPC → Network Firewall 检查 → NAT → Internet。",
    "options": {
      "A": "错。每帐号自建防火墙难集中、运维爆炸。",
      "B": "✓ 正确。集中 egress + Firewall + NAT，正确。",
      "C": "错。只靠 SG/NACL 难做进阶 URL/域名过滤与集中政策。",
      "D": "错。第三方虚机防火墙运维重于 Network Firewall。"
    },
    "diagram_before": "flowchart TB\n  V1[\"帐号 VPC 们\"] --> TGW[\"TGW 互通\"]\n  V1 -.-> NET[\"各自上网?\"]\n  X{{\"缺口: 要集中出站过滤<br/>每 AZ <25Gbps\"}}\n  NET -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  WL[\"工作负载 VPC\"] --> TGW[\"Transit Gateway\"]\n  TGW --> EG[\"Egress VPC\"]\n  EG --> NFW[\"Network Firewall\"]\n  NFW --> NAT[\"NAT\"]\n  NAT --> INET[\"Internet\"]\n"
  },
  "217": {
    "blocker": "要挡常见 Web 漏洞入站攻击，被拒请求还要送到第三方审计系统，且全部高可用。",
    "requirements": "1) 过滤漏洞攻击；2) 拒绝流量送审计；3) 全架构 HA。",
    "steps": [
      "应用放 Multi-AZ Auto Scaling，前挂 ALB。",
      "ALB 绑 WAF，使用托管规则挡常见漏洞。",
      "开启 WAF logging 到 Kinesis Data Firehose。",
      "Firehose 把被拒请求记录送到第三方审计应用。"
    ],
    "solutions": "正确答案 D。ALB+WAF 过滤 + Firehose 日志外送 + Multi-AZ，三要求齐。",
    "result_flow": "请求 → ALB/WAF → 合法进 ASG；违规封锁并 log → Firehose → 第三方审计。",
    "options": {
      "A": "错。缺完整 WAF 日志外送或 HA 描述。",
      "B": "错。NACL 难做应用层漏洞签名过滤。",
      "C": "错。架构不完整或不 HA。",
      "D": "✓ 正确。WAF + Firehose + Multi-AZ ASG/ALB 完整。"
    },
    "diagram_before": "flowchart TB\n  ATK[\"常见 Web 漏洞攻击\"] --> APP[\"Web 应用\"]\n  APP -.-> AUD[\"被拒请求要给第三方审计?\"]\n  X{{\"缺口: 挡攻击+外送日志<br/>+ 高可用\"}}\n  AUD -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  REQ[\"请求\"] --> ALB[\"ALB Multi-AZ\"]\n  ALB --> WAF[\"WAF 过滤\"]\n  WAF -->|合法| ASG[\"ASG 应用\"]\n  WAF -->|违规 log| FH[\"Kinesis Firehose\"]\n  FH --> AUDIT[\"第三方审计系统\"]"
  },
  "218": {
    "blocker": "VPC 内 EC2 微服务要呼叫新建的 API Gateway REST API；API 绝不能从公网进，流量也不能走公网。",
    "requirements": "1) API 私有；2) 流量不经公网；3) 仅 VPC 内可呼叫。",
    "steps": [
      "把 API 设为 private endpoint type。",
      "建 API Gateway interface VPC endpoint（PrivateLink）。",
      "用 endpoint policy 与 API resource policy 限制只能从该 endpoint 存取。",
      "EC2 透过 endpoint 私有呼叫 API。"
    ],
    "solutions": "正确答案 B。Private API + VPC interface endpoint + 双重政策锁定，流量走 AWS 私有网。",
    "result_flow": "EC2 → VPC endpoint（PrivateLink）→ 私有 API Gateway → 后端整合；公网无法到达。",
    "options": {
      "A": "错。公有 API + IP 限制仍可能暴露面较大。",
      "B": "✓ 正确。Private API + endpoint policy 正确。",
      "C": "错。仅安全群组不够隐藏公有 API。",
      "D": "错。Lambda 在公网 API 前仍是公网模型。"
    },
    "diagram_before": "flowchart TB\n  EC2[\"VPC 内 EC2 微服务\"] -.-> API[\"新建 API Gateway\"]\n  PUB[\"公网\"] -.-> API\n  X{{\"缺口: API 绝不能公网进<br/>流量也不能走公网\"}}\n  PUB -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  EC2[\"EC2\"] --> EP[\"VPC Interface Endpoint<br/>PrivateLink\"]\n  EP --> PAPI[\"Private API Gateway\"]\n  PAPI --> BE[\"后端整合\"]\n  PUB[\"公网\"] -.->|无法到达| PAPI\n"
  },
  "219": {
    "blocker": "要追踪工程师改 EC2 security group，不合规要告警，要最快上线。",
    "requirements": "1) 追踪 SG 变更；2) 不合规告警；3) 最快实现。",
    "steps": [
      "开启 AWS Config，记录 security group 组态。",
      "用托管规则评估不合规变更。",
      "Config 发现不合规时发 SNS。",
      "安全／运维订阅 SNS 收 email 或票。"
    ],
    "solutions": "正确答案 D。Config 开箱监控资源组态，比自写 CloudTrail 解析快很多。",
    "result_flow": "有人改 SG → Config 记录并评估 → 不合规 → SNS 告警。",
    "options": {
      "A": "错。只靠 CloudTrail 要自己写解析与规则，较慢。",
      "B": "错。CloudWatch 指标不直接表达 SG 规则合规。",
      "C": "错。手动查主控台不即时。",
      "D": "✓ 正确。Config + SNS 最快合规告警。"
    },
    "diagram_before": "flowchart TB\n  ENG[\"工程师\"] --> SG[\"改 EC2 Security Group\"]\n  SG -.-> MON[\"谁追踪? 谁告警?\"]\n  X{{\"缺口: 不合规要告警<br/>要最快上线\"}}\n  MON -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  CHG[\"有人改 SG\"] --> CFG[\"AWS Config 记录\"]\n  CFG --> RULE[\"规则评估\"]\n  RULE -->|不合规| SNS[\"SNS 告警\"]\n  SNS --> TEAM[\"通知团队\"]\n"
  },
  "220": {
    "blocker": "Kinesis Data Streams 多消费者出现 ReadProvisionedThroughputExceeded 节流。",
    "requirements": "1) 提高读取供给；2) 减少消费者互相抢配额；3) 优雅处理暂时错误。（选三项）",
    "steps": [
      "Reshard 增加 shard 数，提高读吞吐。",
      "消费者改 Enhanced Fan-Out（专用读取通道）。",
      "消费逻辑加 error retry 与 exponential backoff。",
      "观察节流指标是否下降。"
    ],
    "solutions": "正确答案 A、C、E。扩 shard + EFO + 退避重试，从容量、隔离、重试三层解节流。",
    "result_flow": "生产者写 shard → 各消费者用 EFO 专用管道读 → 若仍限流则退避重试；容量不够就 reshard。",
    "options": {
      "A": "✓ 正确。Reshard 增加读配额。",
      "B": "错。只加消费者可能更抢共用配额。",
      "C": "✓ 正确。Enhanced Fan-Out 隔离读取吞吐。",
      "D": "错。缩 shard 会更糟。",
      "E": "✓ 正确。指数退避避免重试打爆。",
      "F": "错。动态分割是写入场景，不解读节流主因。"
    },
    "diagram_before": "flowchart TB\n  P[\"生产者\"] --> SH[\"Kinesis Shards\"]\n  C1[\"消费者1\"] --> SH\n  C2[\"消费者2\"] --> SH\n  X{{\"ReadProvisioned<br/>ThroughputExceeded\"}}\n  SH -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  P[\"生产者\"] --> SH[\"扩容后 Shards\"]\n  SH --> EFO1[\"EFO 专用管道 消费1\"]\n  SH --> EFO2[\"EFO 专用管道 消费2\"]\n  EFO1 --> RET[\"限流则退避重试\"]\n  EFO2 --> RET\n"
  },
  "221": {
    "blocker": "Organizations 里要列出所有低利用率 EC2 并给降规建议，希望 effort 最低。",
    "requirements": "1) 跨帐号找低利用率；2) 有权利建议；3) 最少操作。",
    "steps": [
      "确保实例有足够 CloudWatch 指标（必要时装 agent）。",
      "在管理帐号使用 Compute Optimizer／Cost Explorer 相关建议视图。",
      "一次查看成员帐号的 over-provisioned 实例。",
      "依建议降规或买合适购买选项。"
    ],
    "solutions": "正确答案 B。管理帐号集中看 Compute Optimizer 建议，effort 最低。",
    "result_flow": "各帐号指标 → Compute Optimizer 分析 → 管理帐号汇总建议 → 降规。",
    "options": {
      "A": "错。每帐号手动汇出耗时。",
      "B": "✓ 正确。管理帐号集中 Optimizer 建议，effort 低。",
      "C": "错。只看帐单无利用率权利建议。",
      "D": "错。自建 Athena 分析 effort 高。"
    },
    "diagram_before": "flowchart TB\n  A1[\"帐号A EC2\"] \n  A2[\"帐号B EC2\"]\n  A3[\"更多帐号…\"]\n  X{{\"缺口: 全 Org 低利用率<br/>建议 effort 要最低\"}}\n  A1 -.-> X\n  A2 -.->|存在但未接上| X\n  A3 -.->|存在但未接上| X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  MET[\"各帐号指标\"] --> CO[\"Compute Optimizer\"]\n  CO --> MGMT[\"管理帐号汇总\"]\n  MGMT --> ADV[\"降规建议\"]\n  ADV --> ACT[\"执行优化\"]\n"
  },
  "222": {
    "blocker": "网路分析用的 EC2 在 ASG 里，实例被换掉后路由没更新，流量指到死机器。",
    "requirements": "1) 不健康要自动换机；2) 路由要跟著新实例改；3) 可用 IaC 固定流程。（选三项）",
    "steps": [
      "对实例设 status check 告警，触发 ASG 换机。",
      "另用自订指标／事件经 SNS 通知。",
      "Lambda 收到通知后更新网路路由指到新实例。",
      "CloudFormation 条件／自订资源在替换时同步改路由。"
    ],
    "solutions": "正确答案 A、D、F。健康检查换机 + Lambda 改路由 + 模板条件保证重建时路由一致。",
    "result_flow": "实例失败 → 告警 → ASG 换新机 → SNS/Lambda 或 CFN 条件更新路由 → 流量到新机。",
    "options": {
      "A": "✓ 正确。Status check + ASG 替换是基础。",
      "B": "错。只换机不改路由不够。",
      "C": "错。手动改路由不可扩展。",
      "D": "✓ 正确。SNS + Lambda 自动改路由。",
      "E": "错。只移出服务不解路由表。",
      "F": "✓ 正确。CFN 条件在替换时更新路由。"
    },
    "diagram_before": "flowchart TB\n  TRAF[\"分析流量\"] --> RT[\"路由\"]\n  RT --> OLD[\"已终止的旧 EC2\"]\n  ASG[\"ASG 已换新机\"]\n  X{{\"缺口: 路由没更新<br/>流量指死机器\"}}\n  OLD -.-> X\n  ASG -.->|存在但未接上| X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  FAIL[\"实例失败\"] --> HC[\"健康检查/告警\"]\n  HC --> ASG[\"ASG 换新机\"]\n  ASG --> L[\"SNS → Lambda\"]\n  L --> RT[\"更新路由到新机\"]\n  CFN[\"模板条件\"] --> RT\n"
  },
  "223": {
    "blocker": "ECS Fargate HTTPS 微服务要 blue/green 部署，经负载平衡器分流量，并依 CloudWatch 告警自动调 task 数。",
    "requirements": "1) Blue/green；2) HTTPS LB；3) 依告警自动扩缩 task。",
    "steps": [
      "ECS 服务使用 blue/green 部署类型（搭配 CodeDeploy）。",
      "前面用 ALB，监听 HTTPS。",
      "设定 Service Auto Scaling，依 CloudWatch 指标／告警调 task 数。",
      "新版本先 green，验证后切流量，有问题可回 blue。"
    ],
    "solutions": "正确答案 D。ECS blue/green + ALB HTTPS + Service Auto Scaling 原生满足三项。",
    "result_flow": "流量 → ALB(HTTPS) → blue 或 green 目标群组 → Fargate tasks；指标触发 → 自动加减 task。",
    "options": {
      "A": "错。NLB 对 HTTPS 应用层／进阶部署支援不如 ALB 完整。",
      "B": "错。缺 blue/green 或扩缩其一。",
      "C": "错。滚动部署不是 blue/green。",
      "D": "✓ 正确。blue/green + ALB + Service Auto Scaling 正确。"
    },
    "diagram_before": "flowchart TB\n  U[\"用户 HTTPS\"] --> SVC[\"ECS Fargate 微服务\"]\n  DEP[\"部署方式?\"]\n  SCALE[\"依指标调 task?\"]\n  SVC -.-> DEP\n  X{{\"缺口: blue/green + ALB<br/>+ 自动扩缩\"}}\n  SCALE -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  U[\"流量\"] --> ALB[\"ALB HTTPS\"]\n  ALB --> BLUE[\"Blue 目标群组\"]\n  ALB --> GREEN[\"Green 目标群组\"]\n  BLUE --> FG[\"Fargate tasks\"]\n  GREEN --> FG\n  CW[\"CloudWatch 告警\"] --> SAS[\"Service Auto Scaling\"]\n"
  },
  "224": {
    "blocker": "ECR 一有人 push 新映像就要扫漏洞；若 Critical/High 要自动拿掉 tag 并通知开发。",
    "requirements": "1) Push 即扫；2) 高严重度处置；3) 通知开发。",
    "steps": [
      "开启 ECR scan on push。",
      "EventBridge 接扫描完成事件。",
      "触发 Step Functions：高严重度则删 tag／隔离。",
      "SNS 通知开发团队。"
    ],
    "solutions": "正确答案 A。Scan on push + EventBridge + Step Functions + SNS，事件驱动全自动。",
    "result_flow": "docker push → ECR 扫描 → 事件 → Step Functions 判断 → 删高危 tag + SNS 通知。",
    "options": {
      "A": "✓ 正确。事件驱动扫描与处置，完整。",
      "B": "错。排程扫描有时间差，不是 push 即时。",
      "C": "错。手动看报告太慢。",
      "D": "错。缺自动删 tag 与通知链。"
    },
    "diagram_before": "flowchart TB\n  DEV[\"开发者\"] --> PUSH[\"docker push ECR\"]\n  PUSH --> IMG[\"新映像\"]\n  X{{\"缺口: 无自动扫漏洞<br/>高危 tag 未处理\"}}\n  IMG -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  PUSH[\"docker push\"] --> ECR[\"ECR Scan on push\"]\n  ECR --> EB[\"EventBridge 事件\"]\n  EB --> SF[\"Step Functions\"]\n  SF -->|Critical/High| DEL[\"删除危险 tag\"]\n  SF --> SNS[\"SNS 通知开发\"]\n"
  },
  "225": {
    "blocker": "Organizations 多帐号 EC2/Fargate/Lambda 未来 3 年要优化运算成本，已有 6 个月用量。",
    "requirements": "1) 覆盖多种运算；2) 3 年视角；3) 管理简单。",
    "steps": [
      "在管理帐号检视 Savings Plans 建议。",
      "购买 Compute Savings Plan（可跨 EC2/Fargate/Lambda）。",
      "依 6 个月基线选承诺量。",
      "成员帐号用量自动套用折扣。"
    ],
    "solutions": "正确答案 B。Compute Savings Plan 一张承诺盖三种运算，比一堆 RI 灵活。",
    "result_flow": "管理帐号买 Compute SP → 组织内符合的 EC2/Fargate/Lambda 用量自动折扣。",
    "options": {
      "A": "错。标准 RI 绑实例族／Region，灵活度差。",
      "B": "✓ 正确。Compute SP 最灵活覆盖。",
      "C": "错。只买 EC2 不解 Fargate/Lambda。",
      "D": "错。Spot 不适合所有稳定基线。"
    },
    "diagram_before": "flowchart TB\n  EC2[\"EC2 用量\"]\n  FG[\"Fargate 用量\"]\n  L[\"Lambda 用量\"]\n  X{{\"缺口: 未来 3 年<br/>跨服务运算成本优化\"}}\n  EC2 -.-> X\n  FG -.->|存在但未接上| X\n  L -.->|存在但未接上| X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  MGMT[\"管理帐号\"] --> SP[\"Compute Savings Plan\"]\n  SP --> EC2[\"EC2 自动折扣\"]\n  SP --> FG[\"Fargate 自动折扣\"]\n  SP --> L[\"Lambda 自动折扣\"]\n"
  },
  "226": {
    "blocker": "管理帐号要盯全组织成本，每日预算用超 80% 就 email 财务。",
    "requirements": "1) 组织级成本；2) 日预算；3) 80% 告警 email。",
    "steps": [
      "在管理帐号建 AWS Budgets 日预算。",
      "设实际花费 ≥80% 告警。",
      "告警接到 SNS，订阅财务 email。",
      "每日自动评估。"
    ],
    "solutions": "正确答案 A。Budgets 原生支援组织合并帐单告警。",
    "result_flow": "组织花费累计 → Budgets 日预算检查 → ≥80% → SNS → 财务 email。",
    "options": {
      "A": "✓ 正确。Budgets + SNS email 正确。",
      "B": "错。Cost Explorer 是分析工具，不是主动日预算告警主体。",
      "C": "错。CloudWatch 帐单告警较粗，组织场景首选 Budgets。",
      "D": "错。手动汇出报表不即时。"
    },
    "diagram_before": "flowchart TB\n  ORG[\"组织合并帐单\"] --> COST[\"每日成本累计\"]\n  COST -.-> ALR[\"超 80% 谁通知财务?\"]\n  X{{\"缺口: 集中预算告警\"}}\n  ALR -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  SPEND[\"组织花费累计\"] --> BUD[\"AWS Budgets 日预算\"]\n  BUD -->|≥80%| SNS[\"SNS\"]\n  SNS --> MAIL[\"财务 email\"]\n  BUD --> OK[\"未超标持续监控\"]\n"
  },
  "227": {
    "blocker": "欧洲用户上传高解析图到 us-east-1 S3 很慢，要加快上传。",
    "requirements": "1) 改善跨洲上传；2) 仍落到 us-east-1 bucket。",
    "steps": [
      "在目标 bucket 开启 S3 Transfer Acceleration。",
      "上传 SDK／URL 改用 acceleration 端点。",
      "用户连最近 CloudFront 边缘节点上传。",
      "资料经 AWS 骨干进 us-east-1 bucket。"
    ],
    "solutions": "正确答案 C。Transfer Acceleration 专为长距离上传加速。",
    "result_flow": "欧洲用户 → 近端边缘 → AWS 骨干 → us-east-1 S3（加速端点）。",
    "options": {
      "A": "错。只开多 Region 复写不解上传路径慢。",
      "B": "错。CloudFront 主要加速下载，上传要 Transfer Acceleration 或特殊设计。",
      "C": "✓ 正确。S3 TA 正确。",
      "D": "错。加大实例不解跨洋最后一哩到 S3。"
    },
    "diagram_before": "flowchart TB\n  EU[\"欧洲用户\"] --> NET[\"长距离公网\"]\n  NET --> S3[\"us-east-1 S3\"]\n  X{{\"缺口: 高解析图上传很慢\"}}\n  NET -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  EU[\"欧洲用户\"] --> EDGE[\"近端加速边缘\"]\n  EDGE --> BB[\"AWS 骨干\"]\n  BB --> S3[\"us-east-1 S3<br/>Transfer Acceleration\"]\n  S3 --> OK[\"上传变快\"]\n"
  },
  "228": {
    "blocker": "三层 Web 要容器化上 AWS：要容错扩展、共用频繁存取档、Web session 要可扩且持久，运维要低。",
    "requirements": "1) 容错可扩；2) 跨应用节点共享档；3) Session 可扩；4) 低运维。",
    "steps": [
      "用 EKS managed node groups 跑容器。",
      "Session 存 DynamoDB（全托管、可扩）。",
      "共享档用 EFS 挂到多 Pod。",
      "多 AZ 部署服务。"
    ],
    "solutions": "正确答案 D。EKS managed + DynamoDB session + EFS 共享，少自管状态储存。",
    "result_flow": "用户 → 服务 Pod → Session 读写 DynamoDB；档案读写 EFS → 多 Pod 一致。",
    "options": {
      "A": "错。本机 session 难扩展。",
      "B": "错。EBS 难多节点同时共享。",
      "C": "错。自管 DB session 运维高。",
      "D": "✓ 正确。DynamoDB + EFS + managed EKS 正确。"
    },
    "diagram_before": "flowchart TB\n  WEB[\"三层 Web\"] --> CONT[\"要容器化\"]\n  CONT --> FILE[\"频繁共享档?\"]\n  CONT --> SESS[\"Session 持久可扩?\"]\n  X{{\"缺口: 容错+共享+session<br/>运维要低\"}}\n  SESS -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  U[\"用户\"] --> POD[\"EKS managed Pod\"]\n  POD --> DDB[\"DynamoDB Session\"]\n  POD --> EFS[\"EFS 共享档\"]\n  DDB --> OK[\"多 Pod 一致状态\"]\n  EFS --> OK\n"
  },
  "229": {
    "blocker": "关键 SQL Server 要迁到现代托管架构，几乎不能停机。",
    "requirements": "1) 近零停机；2) 迁到 RDS／现代架构。",
    "steps": [
      "在 RDS for SQL Server 建目标库。",
      "用地端到 RDS 的原生 HA／复写机制持续同步。",
      "落后接近零时切换应用连线。",
      "验证后下线地端。"
    ],
    "solutions": "正确答案 C。原生复写＋切换窗口极短，比停机全备还原更适合关键库。",
    "result_flow": "地端 SQL Server → 持续复写 → RDS → 切换连线 → 近零停机上线。",
    "options": {
      "A": "错。备份还原停机长。",
      "B": "错。手动汇出汇入窗口大。",
      "C": "✓ 正确。原生复写近零停机。",
      "D": "错。只 snapshot 不够近零。"
    },
    "diagram_before": "flowchart TB\n  ONP[\"地端关键 SQL Server\"] --> MIG[\"要迁现代托管\"]\n  MIG -.-> DT{{\"几乎不能停机\"}}\n  X{{\"缺口: 近零停机迁移路径\"}}\n  DT -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  ONP[\"地端 SQL Server\"] --> REP[\"持续原生复写\"]\n  REP --> RDS[\"RDS SQL Server\"]\n  CUT[\"极短切换窗口\"] --> CONN[\"应用改连线\"]\n  CONN --> RDS\n"
  },
  "230": {
    "blocker": "两个 Organizations 之间用 PrivateLink 互连，资料传输费很高，要给开发者降费准则。",
    "requirements": "1) 降 PrivateLink 传输费；2) 可落地的部署指南。（选两项）",
    "steps": [
      "把服务提供方与消费方帐户并入同一 Organization（同组织 PrivateLink 传输优惠／免费策略依规定）。",
      "用 RAM 共享子网路，让双方资源同网段／同 AZ 部署，减少跨 AZ 流量。",
      "文件化：消费端尽量用同 AZ endpoint。",
      "避免无必要的跨组织、跨 AZ 绕路。"
    ],
    "solutions": "正确答案 A、B。同 Organization + RAM 共享子网路是降 PrivateLink 费用的主要架构手段。",
    "result_flow": "消费端 ENI（共享子网路／同 Org）→ PrivateLink → 提供端 NLB；减少跨 Org／跨 AZ 计费路径。",
    "options": {
      "A": "✓ 正确。RAM 共享子网路减少跨 AZ 费。",
      "B": "✓ 正确。同一 Organization 降低跨组织传输成本。",
      "C": "错。关 cross-zone 可能伤 HA，非主解。",
      "D": "错。AZ-specific DNS 有助但题库主选 A+B。",
      "E": "错。Savings Plan 不盖 PrivateLink 传输。"
    },
    "diagram_before": "flowchart TB\n  ORG1[\"Organization A\"] --> PL[\"PrivateLink\"]\n  ORG2[\"Organization B\"] --> PL\n  PL --> FEE{{\"资料传输费很高\"}}\n  X{{\"缺口: 要降费准则\"}}\n  FEE -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  CONS[\"消费端 ENI\"] --> RAM[\"同 Org + RAM<br/>共享子网路\"]\n  RAM --> PL[\"PrivateLink\"]\n  PL --> NLB[\"提供端 NLB\"]\n  NOTE[\"减少跨 Org/跨 AZ 费\"] --> RAM\n"
  },
  "231": {
    "blocker": "地端 SQL Server 每晚 200GB 汇出，要稳稳进 S3；已有 10Gbps DX，想最省钱。",
    "requirements": "1) 夜间 200GB 上 S3；2) 走 DX；3) 最具成本效益。",
    "steps": [
      "建 S3 bucket。",
      "在接 DX 的 VPC 部署 Storage Gateway File Gateway。",
      "建 SMB 共用给备份程式。",
      "每晚写入共用，闸道非同步上传 S3。"
    ],
    "solutions": "正确答案 A。File Gateway 提供 SMB，背后是 S3，比 FSx 全档案系统便宜单纯。",
    "result_flow": "备份作业 → SMB（File Gateway）→ 经 DX → 上传 S3。",
    "options": {
      "A": "✓ 正确。File Gateway + S3 最省。",
      "B": "错。FSx 小时费较贵，只为备份过剩。",
      "C": "错。Multi-AZ FSx 更贵。",
      "D": "错。Volume Gateway 较重，File Gateway 更直接。"
    },
    "diagram_before": "flowchart TB\n  JOB[\"地端 SQL Server<br/>每晚汇出 200GB\"] --> PATH[\"进 S3 路径?\"]\n  DX[\"已有 10Gbps DX\"]\n  JOB -.-> DX\n  X{{\"缺口: 要稳又最省钱\"}}\n  PATH -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  JOB[\"备份作业\"] --> SMB[\"SMB 写入\"]\n  SMB --> FG[\"Storage Gateway<br/>File Gateway\"]\n  FG --> DX[\"Direct Connect\"]\n  DX --> S3[\"S3\"]\n"
  },
  "232": {
    "blocker": "地端要连 AWS 全部多 Region VPC，要传递式路由、降出站成本、高频宽、体验一致。",
    "requirements": "1) 多 Region VPC 互通；2) 传递式路由；3) 高频宽低单位成本。",
    "steps": [
      "建立 Direct Connect。",
      "建 transit VIF 接到 Direct Connect Gateway。",
      "各 Region 用 Transit Gateway 接 VPC，并与 DX Gateway 关联。",
      "地端经 DX 进 TGW 再到各 VPC。"
    ],
    "solutions": "正确答案 B。DX + transit VIF + DX Gateway + 各 Region TGW 是多 Region 混合网路标准。",
    "result_flow": "地端 → DX → transit VIF → DX Gateway → Region TGW → VPCs（传递式互通）。",
    "options": {
      "A": "错。VPN 频宽与成本差；Peering 无传递式。",
      "B": "✓ 正确。DX + TGW 架构正确。",
      "C": "错。VPN + 单 TGW 难满足全球频宽与成本。",
      "D": "错。DX + 各区 VPN + Peering 复杂且慢。"
    },
    "diagram_before": "flowchart TB\n  OP[\"地端\"] -.-> R1[\"Region1 VPC\"]\n  OP -.-> R2[\"Region2 VPC\"]\n  OP -.-> R3[\"更多 Region…\"]\n  X{{\"缺口: 传递式路由<br/>高频宽、降出站成本\"}}\n  OP -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  OP[\"地端\"] --> DX[\"Direct Connect\"]\n  DX --> TVIF[\"Transit VIF\"]\n  TVIF --> DXGW[\"DX Gateway\"]\n  DXGW --> TGW[\"各 Region TGW\"]\n  TGW --> VPC[\"各 Region VPC 互通\"]\n"
  },
  "233": {
    "blocker": "新 Org 有开发与正式成员帐号；要在管理帐号建一个 IAM 使用者，能停／删两边资源，且最小权限。",
    "requirements": "1) 单一管理使用者；2) 跨帐号操作；3) 最小权限。",
    "steps": [
      "在管理帐号建立 IAM 使用者。",
      "在开发、正式帐号各建 cross-account Role，权限仅 stop/terminate 等需要动作。",
      "Role 信任政策允许该管理使用者 assume。",
      "使用者切换角色操作各帐号。"
    ],
    "solutions": "正确答案 D。资源在成员帐号，Role 必须建在成员帐号，再信任管理帐号主体。",
    "result_flow": "管理 IAM 使用者 → AssumeRole 到成员帐号 Role → 对该帐号 EC2 等执行停机／终止。",
    "options": {
      "A": "错。Role 建在管理帐号无法直接管成员资源。",
      "B": "错。每成员帐号建 IAM user 难管。",
      "C": "错。IAM Group 不能跨帐号加使用者。",
      "D": "✓ 正确。成员帐号 Role + trust 管理使用者，标准。"
    },
    "diagram_before": "flowchart TB\n  MGMT[\"管理帐号 IAM 使用者\"]\n  DEV[\"开发成员帐号资源\"]\n  PROD[\"正式成员帐号资源\"]\n  MGMT -.-> DEV\n  MGMT -.-> PROD\n  X{{\"缺口: 跨帐号停/删<br/>要最小权限 Role\"}}\n  MGMT -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  U[\"管理帐号 IAM 使用者\"] --> STS[\"AssumeRole\"]\n  STS --> RDEV[\"开发帐号 Role\"]\n  STS --> RPROD[\"正式帐号 Role\"]\n  RDEV --> ACT[\"停/删该帐号资源\"]\n  RPROD --> ACT\n"
  },
  "234": {
    "blocker": "数百台 Windows 地端应用要 AWS DR，有共用档；RTO 15 分、RPO 5 分，要原生 failover/failback，且相对省。",
    "requirements": "1) RTO 15／RPO 5；2) 原生切换与回切；3) 成本效益。",
    "steps": [
      "用 AWS Elastic Disaster Recovery 持续复制伺服器。",
      "共用资料用 DataSync 同步到 FSx for Windows。",
      "灾难时一键 failover 到 AWS，伺服器挂 FSx。",
      "恢复后 failback 回地端。"
    ],
    "solutions": "正确答案 D。Elastic DR 专为持续复写与双向切换；FSx 对口 Windows 共用。",
    "result_flow": "地端 Windows → Elastic DR 持续复写；共用 → DataSync → FSx → 灾难 failover 上 AWS。",
    "options": {
      "A": "错。日备 RPO 差太多。",
      "B": "错。无原生一键 failback，RTO 风险。",
      "C": "错。双活成本高。",
      "D": "✓ 正确。Elastic DR + FSx 正确。"
    },
    "diagram_before": "flowchart TB\n  WIN[\"数百台 Windows 地端\"] --> SHARE[\"共用档\"]\n  DR[\"AWS DR?\"]\n  WIN -.-> DR\n  X{{\"缺口: RTO 15分 RPO 5分<br/>要原生 failback\"}}\n  DR -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  WIN[\"地端 Windows\"] --> EDR[\"Elastic DR 持续复写\"]\n  SHARE[\"共用档\"] --> DS[\"DataSync\"]\n  DS --> FSX[\"FSx for Windows\"]\n  EDR --> FO[\"灾难 failover 上 AWS\"]\n  FSX --> FO\n"
  },
  "235": {
    "blocker": "HPC 紧耦合丛集 100 台时 OK，扩到 1000 台 EFS 共享档后效能崩盘。",
    "requirements": "1) 提升大规模节点间通讯；2) 提升共享档吞吐；3) 降网路延迟。（选三项）",
    "steps": [
      "丛集放在单一 AZ，避免跨 AZ 延迟。",
      "选支援 Elastic Fabric Adapter（EFA）的实例做低延迟 RDMA。",
      "共享档改 Amazon FSx for Lustre（HPC 平行档案系统）。",
      "重新跑扩展测试验证。"
    ],
    "solutions": "正确答案 A、C、F。单 AZ + EFA + FSx for Lustre 是 AWS HPC 参考架构三大件。",
    "result_flow": "1000 节点（单 AZ、EFA）→ 高速互通；共享 I/O → FSx for Lustre 而非通用 EFS。",
    "options": {
      "A": "✓ 正确。单 AZ 降延迟。",
      "B": "错。ENI×4 非关键最佳化。",
      "C": "✓ 正确。EFA 必要。",
      "D": "错。多 AZ 增延迟，有害。",
      "E": "错。EBS RAID 不适合大规模共享。",
      "F": "✓ 正确。FSx for Lustre 取代 EFS。"
    },
    "diagram_before": "flowchart TB\n  N100[\"HPC 100 节点 OK\"] --> EFS[\"EFS 共享\"]\n  N1000[\"扩到 1000 节点\"] --> EFS\n  X{{\"缺口: 紧耦合+大规模<br/>EFS 效能崩盘\"}}\n  N1000 -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  NODES[\"1000 节点单 AZ\"] --> EFA[\"EFA 高速互连\"]\n  NODES --> LUS[\"FSx for Lustre\"]\n  EFA --> HPC[\"紧耦合运算\"]\n  LUS --> IO[\"高吞吐共享 I/O\"]\n"
  },
  "236": {
    "blocker": "Organizations 要标准化标签：建资源必须带指定标签，且各 OU 标签值不同。",
    "requirements": "1) 强制必填标签；2) 各 OU 不同允许值。",
    "steps": [
      "写 SCP：拒绝建立未带必要标签的资源。",
      "为各 OU 建 tag policy，列出该 OU 允许的标签值。",
      "把 tag policy 附加到对应 OU。",
      "不合规建立在 API 层被拒。"
    ],
    "solutions": "正确答案 A。SCP 强制「有标签」；tag policy 管「值对不对」，且应挂在 OU。",
    "result_flow": "使用者建资源 → SCP 查有无必要标签 → tag policy 查值是否在 OU 允许清单 → 通过才建立。",
    "options": {
      "A": "✓ 正确。SCP deny + OU tag policy 正确。",
      "B": "错。Tag policy 挂管理帐号无法表达每 OU 不同值。",
      "C": "错。Allow 语意通常不如明确 Deny 好用。",
      "D": "错。只有 SCP 列表难强制合法值。"
    },
    "diagram_before": "flowchart TB\n  T1[\"团队A 建资源\"] --> TAG[\"标签随意\"]\n  T2[\"团队B 建资源\"] --> TAG\n  OU[\"各 OU 值应不同\"]\n  X{{\"缺口: 强制必要标签<br/>+ OU 级允许值\"}}\n  TAG -.-> X\n  OU -.->|存在但未接上| X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  U[\"使用者建资源\"] --> SCP[\"SCP 查有无必要标签\"]\n  SCP --> TP[\"Tag Policy 查 OU 允许值\"]\n  TP -->|通过| OK[\"允许建立\"]\n  TP -->|不符| DENY[\"拒绝\"]\n"
  },
  "237": {
    "blocker": "上万感测器 MQTT 进地端 Kafka 再转 S3；Kafka 当机就丢资料，要更可靠的全托管管线。",
    "requirements": "1) 高可靠摄取；2) 转换；3) 落 S3；4) 少自管。",
    "steps": [
      "感测器改连 AWS IoT Core。",
      "IoT 接 Kinesis Data Firehose 交付流。",
      "用 Lambda 做转换。",
      "Firehose 写入 S3。"
    ],
    "solutions": "正确答案 C。IoT Core + Firehose + Lambda 全托管，消除 Kafka 单点。",
    "result_flow": "感测器 MQTT → IoT Core →（Lambda 转换）→ Firehose → S3。",
    "options": {
      "A": "错。自管 Kafka HA 仍重。",
      "B": "错。MSK 仍偏 Kafka 运维；NLB 也不懂 MQTT。",
      "C": "✓ 正确。IoT + Firehose 正确。",
      "D": "错。IoT 后又接 EC2 Kafka，单点还在。"
    },
    "diagram_before": "flowchart TB\n  SEN[\"上万感测器 MQTT\"] --> KAF[\"地端 Kafka\"]\n  KAF --> S3[\"转 S3\"]\n  X{{\"缺口: Kafka 当机丢资料\"}}\n  KAF -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  SEN[\"感测器 MQTT\"] --> IOT[\"IoT Core\"]\n  IOT --> L[\"Lambda 转换\"]\n  L --> FH[\"Kinesis Firehose\"]\n  FH --> S3[\"S3 可靠落地\"]\n"
  },
  "238": {
    "blocker": "EC2、EFS、RDS 上云后，备份要依不同保留天数、要跨 Region 复本、失败要通知。",
    "requirements": "1) 多保留周期；2) 跨 Region；3) 失败通知；4) 统一管理。（选三项）",
    "steps": [
      "建 AWS Backup plan，多条 rule 对应不同保留。",
      "计划中启用 copy 到另一 Region。",
      "Backup 完成状态非成功时发 SNS。",
      "把 EC2/EFS/RDS 指派进同一 plan。"
    ],
    "solutions": "正确答案 A、B、D。AWS Backup 一站式：规则、跨区、SNS，免自写 Lambda 复制。",
    "result_flow": "资源 → Backup plan 排程 → 本地 vault + 跨 Region copy；失败 → SNS。",
    "options": {
      "A": "✓ 正确。多 rule 管不同保留。",
      "B": "✓ 正确。原生跨 Region copy。",
      "C": "错。自写 Lambda 复制多余。",
      "D": "✓ 正确。SNS 通知非 COMPLETED。",
      "E": "错。DLM 只盖 EBS。",
      "F": "错。只 RDS snapshot 不统一。"
    },
    "diagram_before": "flowchart TB\n  EC2[\"EC2\"] \n  EFS[\"EFS\"]\n  RDS[\"RDS\"]\n  X{{\"缺口: 不同保留天数<br/>跨 Region 复本+失败通知\"}}\n  EC2 -.-> X\n  EFS -.->|存在但未接上| X\n  RDS -.->|存在但未接上| X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  RES[\"EC2/EFS/RDS\"] --> PLAN[\"AWS Backup Plan\"]\n  PLAN --> V1[\"本地 vault<br/>各保留规则\"]\n  PLAN --> V2[\"跨 Region copy\"]\n  PLAN -->|失败| SNS[\"SNS 通知\"]\n"
  },
  "239": {
    "blocker": "基因装置每秒推 8KB，平台要近即时处理分析并回馈研究员，结果要进分析仓储。",
    "requirements": "1) 高频摄取；2) 即时／近即时分析；3) 结果入仓。",
    "steps": [
      "用 Kinesis Data Streams 收感测资料。",
      "Kinesis 应用即时分析。",
      "用 EMR 处理大批结果。",
      "写入 Redshift 供研究员查。"
    ],
    "solutions": "正确答案 B。Data Streams 适高频即时；EMR+Redshift 做后段分析仓储。",
    "result_flow": "装置 → Kinesis Data Streams → 即时消费者分析 → EMR → Redshift。",
    "options": {
      "A": "错。Firehose 偏投递；RDS 非基因大仓首选。",
      "B": "✓ 正确。Streams + EMR + Redshift 正确。",
      "C": "错。S3+SQS 延迟高。",
      "D": "错。API GW+SQS+Lambda 吞吐难匹配每秒持续 8KB×N。"
    },
    "diagram_before": "flowchart TB\n  DEV[\"基因装置<br/>每秒 8KB\"] --> PLAT[\"处理平台?\"]\n  PLAT -.-> RT[\"要近即时回馈\"]\n  PLAT -.-> WH[\"结果进分析仓储\"]\n  X{{\"缺口: 高频串流+分析\"}}\n  RT -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  DEV[\"装置\"] --> KS[\"Kinesis Data Streams\"]\n  KS --> CON[\"即时消费者分析\"]\n  CON --> FB[\"回馈研究员\"]\n  CON --> EMR[\"EMR\"]\n  EMR --> RS[\"Redshift 仓储\"]\n"
  },
  "240": {
    "blocker": "三层（Web/App/NoSQL）参考架构：Region 内 HA、1 分钟内可 fail 到另一 Region、尽量省成本。",
    "requirements": "1) 区内 HA；2) 1 分钟跨区 DR；3) 成本优化。（选三项）",
    "steps": [
      "Route 53 failover，TTL 30 秒，主／备 Region。",
      "DynamoDB Global Table 双 Region 资料。",
      "Web/App 用多 AZ ASG hot standby：最少 RI + 额外 On-Demand。",
      "灾难时 DNS 切换，备援区放大。"
    ],
    "solutions": "正确答案 B、C、E。短 TTL failover + Global Table + hot standby 才能 1 分钟级 RTO。",
    "result_flow": "用户 → Route 53（健康）→ 主 Region 多 AZ；主挂 → 30s TTL 内指到备 Region → Global Table 资料已在。",
    "options": {
      "A": "错。Weighted 100/0 + TTL 1h 太慢。",
      "B": "✓ 正确。Failover + TTL 30s。",
      "C": "✓ 正确。Global Table。",
      "D": "错。60 分备份 RPO/RTO 不够。",
      "E": "✓ 正确。Hot standby + RI 基线。",
      "F": "错。Spot 不保证 DR 当下有容量。"
    },
    "diagram_before": "flowchart TB\n  U[\"用户\"] --> WEB[\"Web 多 AZ?\"]\n  WEB --> APP[\"App\"]\n  APP --> NOSQL[\"NoSQL 单 Region\"]\n  X{{\"缺口: 1 分钟级跨 Region<br/>failover + 省成本\"}}\n  NOSQL -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  U[\"用户\"] --> R53[\"Route 53 Failover<br/>TTL 30s\"]\n  R53 -->|主| PRI[\"主 Region 多 AZ<br/>Hot standby 备援\"]\n  R53 -.->|备| SEC[\"备 Region Hot standby\"]\n  PRI --> GT[\"DynamoDB Global Tables\"]\n  SEC --> GT\n"
  },
  "241": {
    "blocker": "智慧车 MQTT 遥测，5 分钟一批分析，要上云且最低运维，含异常侦测与存 S3。",
    "requirements": "1) MQTT 大规模接入；2) 存 S3；3) 分析异常；4) 低运维。",
    "steps": [
      "AWS IoT Core 收车机 MQTT。",
      "Rule 转 Kinesis Data Firehose 写 S3。",
      "Kinesis Data Analytics 做近即时异常侦测。",
      "结果可再写 S3／告警。"
    ],
    "solutions": "正确答案 B。IoT Core + Firehose + Data Analytics 全托管链，免自管 Kafka/MQ。",
    "result_flow": "车机 → IoT Core → Firehose → S3；同时 Analytics 读流侦测异常。",
    "options": {
      "A": "错。Greengrass/MSK/SageMaker 链过重。",
      "B": "✓ 正确。全托管正确。",
      "C": "错。FleetWise/Glue 较不贴通用 MQTT。",
      "D": "错。Amazon MQ 要管 broker。"
    },
    "diagram_before": "flowchart TB\n  CAR[\"智慧车 MQTT\"] --> PIPE[\"遥测管线?\"]\n  PIPE -.-> AN[\"5 分钟批分析\"]\n  PIPE -.-> AD[\"异常侦测\"]\n  X{{\"缺口: 全托管低运维\"}}\n  AD -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  CAR[\"车机 MQTT\"] --> IOT[\"IoT Core\"]\n  IOT --> FH[\"Firehose\"]\n  FH --> S3[\"S3\"]\n  IOT --> ANA[\"IoT Analytics<br/>异常侦测\"]\n"
  },
  "242": {
    "blocker": "审计发现开发者把长期凭证提交到 CodeCommit；要每次 commit 自动扫，发现就停用金钥并通知。",
    "requirements": "1) 提交即扫描；2) 发现凭证立即停用；3) 通知开发者。",
    "steps": [
      "CodeCommit 触发（或 EventBridge）在新 commit 时呼叫 Lambda。",
      "Lambda 扫描 diff 是否含 AKIA 等金钥模式。",
      "命中则呼叫 IAM 停用该 access key。",
      "SNS／邮件通知提交者。"
    ],
    "solutions": "正确答案 D。Commit 触发 Lambda 即时扫描 + 自动停用，比周期扫仓库更快止血。",
    "result_flow": "git push → CodeCommit 事件 → Lambda 扫描 → 发现金钥 → IAM 停用 + 通知。",
    "options": {
      "A": "错。周期全库扫描有空窗。",
      "B": "错。只靠 git-secrets 客户端挡不住已设好的远端提交。",
      "C": "错。人工审查太慢。",
      "D": "✓ 正确。每次提交自动扫并停用，正确。"
    },
    "diagram_before": "flowchart TB\n  DEV[\"开发者\"] --> PUSH[\"git push CodeCommit\"]\n  PUSH --> KEY{{\"长期凭证被提交\"}}\n  X{{\"缺口: 非即时扫描<br/>金钥未自动停用\"}}\n  KEY -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  PUSH[\"git push\"] --> CC[\"CodeCommit 事件\"]\n  CC --> L[\"Lambda 即时扫描\"]\n  L -->|发现金钥| IAM[\"IAM 停用金钥\"]\n  L --> NTF[\"通知开发者\"]\n"
  },
  "243": {
    "blocker": "多应用帐号要安全共用一个中央 S3，又不能互相看到对方前缀，流量走私有网路。",
    "requirements": "1) 每应用只看自己资料；2) 私有存取；3) 中央 bucket。（选两项）",
    "steps": [
      "为每应用建 S3 Access Point，并限制只能从该应用 VPC 使用。",
      "各应用 VPC 建 S3 interface endpoint。",
      "Bucket policy 要求必须经对应 access point 存取。",
      "应用只设定自己的 access point ARN。"
    ],
    "solutions": "正确答案 B、D。Access Point 做网路与前缀隔离；interface endpoint 保私有路径。",
    "result_flow": "应用 VPC → S3 interface endpoint → 该应用 Access Point → 中央 bucket 限定前缀。",
    "options": {
      "A": "错。只靠 IAM user 金钥不安全且难 VPC 锁定。",
      "B": "✓ 正确。每应用 VPC 限定 Access Point。",
      "C": "错。Gateway endpoint 可私有但缺 per-app 隔离模型。",
      "D": "✓ 正确。Interface endpoint + policy 要求经 access point。",
      "E": "错。公开 bucket 错误。"
    },
    "diagram_before": "flowchart TB\n  A1[\"应用帐号1\"] -.-> S3[\"中央 S3\"]\n  A2[\"应用帐号2\"] -.-> S3\n  A1 -.-> A2\n  X{{\"缺口: 前缀互不可见<br/>流量要私有\"}}\n  S3 -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  VPC[\"应用 VPC\"] --> EP[\"S3 Interface Endpoint\"]\n  EP --> AP[\"该应用 Access Point\"]\n  AP --> S3[\"中央 Bucket 限定前缀\"]\n  OTHER[\"其他应用\"] -.->|看不到此前缀| S3\n"
  },
  "244": {
    "blocker": "VPC Flow Logs 要近即时进 Splunk 分析，中间可做一点转换。",
    "requirements": "1) Flow Logs 收集；2) 近即时到 Splunk；3) 可预处理。",
    "steps": [
      "开 VPC Flow Logs 送到 CloudWatch Logs。",
      "Subscription filter 转到 Kinesis Data Firehose。",
      "Firehose 用 Lambda 做预处理。",
      "Firehose 原生 Splunk 目的地送出。"
    ],
    "solutions": "正确答案 B。CW Logs → Firehose（Lambda 转换）→ Splunk 是常见近即时管线。",
    "result_flow": "ENI 流量 → Flow Logs → CloudWatch Logs → Firehose →（Lambda）→ Splunk。",
    "options": {
      "A": "错。批次 S3 汇出不够近即时。",
      "B": "✓ 正确。Subscription + Firehose + Splunk 正确。",
      "C": "错。手动下载不行。",
      "D": "错。缺 Firehose/Splunk 整合效率。"
    },
    "diagram_before": "flowchart TB\n  ENI[\"ENI 流量\"] --> FL[\"VPC Flow Logs\"]\n  FL -.-> SPL[\"要近即时进 Splunk\"]\n  X{{\"缺口: 中间要可转换\"}}\n  SPL -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  ENI[\"ENI 流量\"] --> FL[\"Flow Logs\"]\n  FL --> CWL[\"CloudWatch Logs\"]\n  CWL --> FH[\"Firehose\"]\n  FH --> L[\"Lambda 转换\"]\n  L --> SPL[\"Splunk\"]\n"
  },
  "245": {
    "blocker": "财务要集中看多帐号成本，还要用 SCP 限制只能在美国 Region，并给财务跨帐号帐单权限。",
    "requirements": "1) 集中 CUR；2) 仅 US Region；3) 财务可看帐单。（选三项）",
    "steps": [
      "在管理帐号启用 Cost and Usage Report 丢到集中 S3。",
      "SCP 只允许美国 Region 的 API。",
      "各帐号（或管理帐号）建 IAM Role 给财务 assume 看 Billing。",
      "财务用 Cost Explorer／帐单主控台分析。"
    ],
    "solutions": "正确答案 A、C、F。CUR 集中 + SCP 锁 Region + 各帐号帐单 Role 是组织财务治理组合。",
    "result_flow": "各帐号用量 → CUR 到管理 S3；API 受 SCP 限 US；财务 AssumeRole 看各帐帐单。",
    "options": {
      "A": "✓ 正确。CUR 集中报告。",
      "B": "错。只开 Cost Explorer 不够完整治理。",
      "C": "✓ 正确。SCP 限制 Region。",
      "D": "错。Tag  alone 不锁 Region。",
      "E": "错。只管理帐号 Role 可能看不全成员细节（依题库 F 要每帐号）。",
      "F": "✓ 正确。每帐号帐单 Role 供财务。"
    },
    "diagram_before": "flowchart TB\n  A1[\"多帐号用量\"] \n  FIN[\"财务要集中看成本\"]\n  REG[\"也要锁只能 US Region\"]\n  A1 -.-> FIN\n  X{{\"缺口: CUR + SCP + 帐单权限\"}}\n  REG -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  ACC[\"各帐号用量\"] --> CUR[\"CUR → 管理帐号 S3\"]\n  SCP[\"SCP 限 US Region\"] --> API[\"API 呼叫受限\"]\n  FIN[\"财务\"] --> ROLE[\"Assume 各帐帐单 Role\"]\n  ROLE --> BILL[\"看跨帐帐单\"]\n"
  },
  "246": {
    "blocker": "安全团队要在成员帐号做唯读稽核，模式要标准、可重复。",
    "requirements": "1) 跨帐号唯读；2) 安全帐号发起；3) 标准角色模式。",
    "steps": [
      "在各成员帐号建唯读 Role（类似 OrganizationAccountAccessRole 概念）。",
      "信任政策允许安全帐号主体 assume。",
      "安全帐号使用者／角色 AssumeRole。",
      "用临时凭证做稽核，不做写入。"
    ],
    "solutions": "正确答案 B。成员帐号 Role + 安全帐号 assume 是跨帐号稽核标准。",
    "result_flow": "安全帐号 → STS AssumeRole → 成员唯读 Role → 列出／读取资源做稽核。",
    "options": {
      "A": "错。共用长期金钥危险。",
      "B": "✓ 正确。跨帐号唯读 Role 正确。",
      "C": "错。每帐号建 IAM user 难管。",
      "D": "错。SCP 不能当登入身分。"
    },
    "diagram_before": "flowchart TB\n  SEC[\"安全团队\"] -.-> M1[\"成员帐号1\"]\n  SEC -.-> M2[\"成员帐号2\"]\n  X{{\"缺口: 标准跨帐号<br/>唯读稽核模式\"}}\n  SEC -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  SEC[\"安全帐号\"] --> STS[\"STS AssumeRole\"]\n  STS --> ROLE[\"成员帐号唯读 Role\"]\n  ROLE --> LIST[\"列出/读取资源\"]\n  LIST --> AUD[\"完成稽核\"]\n"
  },
  "247": {
    "blocker": "多帐号 VPC 要互通，且出站上网要集中走某 egress VPC 的 NAT。",
    "requirements": "1) 全 VPC 互连；2) 出站集中 NAT；3) 可共享。",
    "steps": [
      "建 Transit Gateway，用 RAM 共享到各帐号。",
      "所有 VPC attach 到 TGW。",
      "路由：跨 VPC 走 TGW；0.0.0.0/0 指向 egress VPC。",
      "Egress VPC 内 NAT Gateway 上网。"
    ],
    "solutions": "正确答案 B。TGW + RAM + 预设路由进 egress VPC 是集中出口标准。",
    "result_flow": "工作 VPC → TGW → 东西部到其他 VPC；上网 → TGW → egress VPC NAT → Internet。",
    "options": {
      "A": "错。全网 Peering 难管且无传递预设路由模型。",
      "B": "✓ 正确。TGW 集中路由正确。",
      "C": "错。每 VPC 自建 NAT 非集中。",
      "D": "错。VPN hub 复杂且频宽差。"
    },
    "diagram_before": "flowchart TB\n  V1[\"工作 VPC A\"]\n  V2[\"工作 VPC B\"]\n  V1 -.-> V2\n  V1 -.-> NET[\"各自 NAT 上网?\"]\n  X{{\"缺口: 全互通 + 集中 egress NAT\"}}\n  NET -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  WA[\"工作 VPC A\"] --> TGW[\"TGW + RAM\"]\n  WB[\"工作 VPC B\"] --> TGW\n  TGW --> EW[\"东西向互通\"]\n  TGW --> EG[\"Egress VPC NAT\"]\n  EG --> INET[\"Internet\"]\n"
  },
  "248": {
    "blocker": "ALB 后应用被 HTTP flood／高频刷，要自动限速又好维护。",
    "requirements": "1) 挡高频来源；2) 运维效率高。",
    "steps": [
      "建 WAF Web ACL。",
      "加 rate-based rule，超过阈值 Block。",
      "Web ACL 绑 ALB。",
      "无需手维 IP 黑名单。"
    ],
    "solutions": "正确答案 B。WAF rate-based rule 自动限流，最适合暴力刷流量。",
    "result_flow": "请求 → ALB/WAF → 超速 IP 被 Block；正常请求进应用。",
    "options": {
      "A": "错。只靠 SG 难做 HTTP 层速率。",
      "B": "✓ 正确。WAF rate-based 正确。",
      "C": "错。手动 IP 集合维护重。",
      "D": "错。Shield Advanced 偏大型 DDoS，未必最低运维。"
    },
    "diagram_before": "flowchart TB\n  FLOOD[\"HTTP flood / 高频刷\"] --> ALB[\"ALB\"]\n  ALB --> APP[\"应用被打爆\"]\n  X{{\"缺口: 要自动限速<br/>好维护\"}}\n  FLOOD -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  REQ[\"请求\"] --> ALB[\"ALB\"]\n  ALB --> WAF[\"WAF rate-based rule\"]\n  WAF -->|超速 IP| BLK[\"Block\"]\n  WAF -->|正常| APP[\"应用处理\"]\n"
  },
  "249": {
    "blocker": "合作伙伴要求 SFTP 且来源 IP 必须是公司固定公网 IP 段；档案要进 S3，想托管。",
    "requirements": "1) SFTP；2) 固定客户自有 IP；3) 存 S3。",
    "steps": [
      "用 BYOIP 把公司 IP 段带进 AWS。",
      "建 AWS Transfer Family SFTP 端点，配 EIP 来自 BYOIP。",
      "后端对接 S3。",
      "防火墙白名单该固定 IP。"
    ],
    "solutions": "正确答案 A。Transfer Family + BYOIP EIP 满足固定 IP SFTP 上 S3。",
    "result_flow": "合作伙伴 SFTP → 固定 BYOIP → Transfer Family → S3。",
    "options": {
      "A": "✓ 正确。BYOIP + Transfer Family 正确。",
      "B": "错。EC2 自建 SFTP 运维重。",
      "C": "错。无固定 BYOIP 难满足白名单。",
      "D": "错。API 非 SFTP。"
    },
    "diagram_before": "flowchart TB\n  PART[\"合作伙伴 SFTP\"] -.-> AWS[\"要进 S3\"]\n  IP[\"来源必须固定<br/>公司公网 IP 段\"]\n  PART --> IP\n  X{{\"缺口: 托管 SFTP + BYOIP\"}}\n  AWS -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  PART[\"合作伙伴 SFTP\"] --> EIP[\"BYOIP 固定 EIP\"]\n  EIP --> TF[\"Transfer Family\"]\n  TF --> S3[\"S3\"]\n  S3 --> OK[\"档案落地\"]\n"
  },
  "250": {
    "blocker": "HPC（高效能运算）丛集节点之间需要极低延迟、高吞吐的网路互连，一般分散放置无法稳定达标。",
    "requirements": "1) 最低网路延迟；2) 高吞吐。",
    "steps": [
      "建 cluster placement group。",
      "选支援 enhanced networking 的实例。",
      "全部放同一 placement group／适当 AZ。",
      "跑延迟测试确认。"
    ],
    "solutions": "正确答案 A。Cluster placement group + 增强网路是 HPC 低延迟标准。",
    "result_flow": "HPC 节点（同 cluster PG）→ 物理邻近高速网 → 紧耦合运算。",
    "options": {
      "A": "✓ 正确。Cluster PG + enhanced networking。",
      "B": "错。Spread PG 求分散非低延迟。",
      "C": "错。Partition 跨 partition 延迟较高。",
      "D": "错。无 PG 延迟不稳。"
    },
    "diagram_before": "flowchart TB\n  N1[\"HPC 节点\"] -.-> NET[\"分散放置网路\"]\n  N2[\"HPC 节点\"] -.-> NET\n  N3[\"HPC 节点\"] -.-> NET\n  X{{\"缺口: 延迟/吞吐<br/>无法稳定达标\"}}\n  NET -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  N1[\"HPC 节点\"] --> PG[\"Cluster Placement Group\"]\n  N2[\"HPC 节点\"] --> PG\n  N3[\"HPC 节点\"] --> PG\n  PG --> EN[\"增强网路 物理邻近\"]\n  EN --> HPC[\"紧耦合高吞吐\"]\n"
  },
  "251": {
    "blocker": "公开 API 被 botnet 刷爆成本；只有 6 个合作伙伴 IP 该用，还要限制合法呼叫量，成本要低。",
    "requirements": "1) 只允许 6 IP；2) 限流；3) 成本最低。",
    "steps": [
      "WAF 只 allow 6 个合作伙伴 IP，其余挡。",
      "API Gateway 建 usage plan 限请求配额。",
      "核发 API key 给合作伙伴。",
      "超额拒绝，botnet 到不了。"
    ],
    "solutions": "正确答案 D。WAF IP allow + usage plan + API key 便宜有效。",
    "result_flow": "请求 → WAF（仅 6 IP）→ API Gateway（usage plan/API key）→ 后端。",
    "options": {
      "A": "错。CloudFront 无 IP 限制仍可能被刷。",
      "B": "错。只 API key 易泄漏，botnet 仍可打。",
      "C": "错。NAT 不解公网 API 被刷。",
      "D": "✓ 正确。WAF allowlist + usage plan 正确。"
    },
    "diagram_before": "flowchart TB\n  BOT[\"Botnet 狂刷\"] --> API[\"公开 API\"]\n  API --> COST{{\"成本暴冲\"}}\n  PART[\"仅 6 个合作伙伴 IP 该用\"]\n  X{{\"缺口: IP 白名单+限流<br/>成本要低\"}}\n  COST -.-> X\n  PART -.->|存在但未接上| COST\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  REQ[\"请求\"] --> WAF[\"WAF 仅允许 6 IP\"]\n  WAF --> APIGW[\"API Gateway\"]\n  APIGW --> PLAN[\"Usage Plan + API Key\"]\n  PLAN --> BE[\"后端\"]\n"
  },
  "252": {
    "blocker": "Aurora 要监控资料库活动给安全分析，记录要进 S3。",
    "requirements": "1) DB 活动监控；2) 串流到可分析储存。",
    "steps": [
      "启用 Aurora Database Activity Streams。",
      "活动进 Kinesis data stream。",
      "Firehose 接流写 S3。",
      "安全团队用 Athena 等分析。"
    ],
    "solutions": "正确答案 C。DAS 是 Aurora 专用活动稽核，接 Kinesis/Firehose/S3。",
    "result_flow": "DB 活动 → Activity Stream → Kinesis → Firehose → S3 → 分析。",
    "options": {
      "A": "错。一般 log 不够细的资料活动。",
      "B": "错。CloudTrail 不记 SQL 活动细节。",
      "C": "✓ 正确。DAS + Kinesis + Firehose + S3。",
      "D": "错。自管代理运维高。"
    },
    "diagram_before": "flowchart TB\n  AUR[\"Aurora\"] -.-> ACT[\"DB 活动谁记?\"]\n  ACT -.-> STORE[\"要进可分析储存\"]\n  X{{\"缺口: 活动串流到 S3\"}}\n  STORE -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  AUR[\"Aurora 活动\"] --> DAS[\"Database Activity Streams\"]\n  DAS --> KIN[\"Kinesis\"]\n  KIN --> FH[\"Firehose\"]\n  FH --> S3[\"S3 供分析\"]\n"
  },
  "253": {
    "blocker": "记忆体优化 ASG 目前过大（使用率约 25%），要降成本又保留可扩与记忆体型。",
    "requirements": "1) 降成本；2) 仍 memory-optimized；3) 可再扩。",
    "steps": [
      "改用较小 r6g.4xlarge（贴近实际用量）。",
      "ASG min/desired=3、max=12 保留扩展空间。",
      "观察记忆体与延迟。",
      "需要时再水平扩。"
    ],
    "solutions": "正确答案 C。缩小单机规格比一直开超大机省钱，并保留 ASG 上限。",
    "result_flow": "流量 → 较小 r6g 机群（3 台起）→ 负载升 → ASG 加到最多 12。",
    "options": {
      "A": "错。维持超大机浪费。",
      "B": "错。改运算型可能记忆体不够。",
      "C": "✓ 正确。r6g.4xlarge + 合理 ASG 范围。",
      "D": "错。固定台数无扩展。"
    },
    "diagram_before": "flowchart TB\n  TRAF[\"流量\"] --> ASG[\"记忆体优化 ASG\"]\n  ASG --> BIG[\"机型过大<br/>使用率约 25%\"]\n  BIG --> COST{{\"成本偏高\"}}\n  X{{\"缺口: 要降成本仍可扩<br/>且维持 memory 型\"}}\n  COST -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  TRAF[\"流量\"] --> ASG[\"较小 r6g 机群<br/>最少 3 台\"]\n  ASG -->|负载升| UP[\"扩到最多 12\"]\n  ASG -->|负载降| DOWN[\"缩回基线\"]\n  NOTE[\"仍 memory-optimized\"] --> ASG\n"
  },
  "254": {
    "blocker": "DynamoDB 大量重复 lookup，成本高；流量可预测，要降费。",
    "requirements": "1) 降读成本；2) 可预测流量优化购买。",
    "steps": [
      "加 DAX 快取热点 lookup。",
      "表改 provisioned + auto scaling。",
      "买 Compute／合适 Savings Plans 覆盖。",
      "监控快取命中与节流。"
    ],
    "solutions": "正确答案 D。DAX 砍重复读 + provisioned 适合可预测 + SP 再省。",
    "result_flow": "应用读 → DAX 命中则回；未命中 → DynamoDB provisioned → 用量套 SP 折扣。",
    "options": {
      "A": "错。一直 on-demand 对稳定流量可能较贵。",
      "B": "错。无快取重复读仍贵。",
      "C": "错。只 SP 不解读放大。",
      "D": "✓ 正确。DAX + provisioned + SP 正确。"
    },
    "diagram_before": "flowchart TB\n  APP[\"应用\"] --> DDB[\"DynamoDB<br/>大量重复 lookup\"]\n  DDB --> COST{{\"读成本高\"}}\n  X{{\"缺口: 可预测流量<br/>要降费\"}}\n  COST -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  APP[\"应用读\"] --> DAX[\"DAX 快取\"]\n  DAX -->|命中| HIT[\"直接回\"]\n  DAX -->|未命中| DDB[\"DynamoDB Provisioned\"]\n  DDB --> SP[\"Savings Plan 折扣\"]\n"
  },
  "255": {
    "blocker": "PrivateLink 服务：消费者连不上提供者 NLB 后的 EC2，要查网路 ACL／SG。",
    "requirements": "1) 找出连线阻挡点；2) 修正 NACL/SG。（选两项）",
    "steps": [
      "检查 endpoint 子网、NLB 子网、EC2 子网的 NACL 是否双向放行。",
      "检查 EC2 security group 是否允许来自 NLB 子网的入站。",
      "修正后重试连线。",
      "确认监听埠一致。"
    ],
    "solutions": "正确答案 A、C。PrivateLink 资料路径上 NACL 与目标 SG 是最常见挡点。",
    "result_flow": "消费 endpoint → PrivateLink → 提供 NLB →（NACL/SG）→ EC2。",
    "options": {
      "A": "✓ 正确。NACL 路径双向检查。",
      "B": "错。只开 0.0.0.0/0 出站不够精准。",
      "C": "✓ 正确。EC2 SG 允许 NLB 网段。",
      "D": "错。乱改路由可能破坏 PrivateLink。",
      "E": "错。无关服务。"
    },
    "diagram_before": "flowchart TB\n  CONS[\"消费者 Endpoint\"] --> PL[\"PrivateLink\"]\n  PL --> NLB[\"提供者 NLB\"]\n  NLB -.-> EC2[\"后端 EC2 连不上\"]\n  X{{\"缺口: 查 NACL / SG 挡点\"}}\n  EC2 -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  CONS[\"消费 Endpoint\"] --> PL[\"PrivateLink\"]\n  PL --> NLB[\"提供者 NLB\"]\n  NLB --> NACL[\"NACL 双向放行\"]\n  NACL --> SG[\"EC2 SG 允 NLB 网段\"]\n  SG --> EC2[\"EC2 通了\"]\n"
  },
  "256": {
    "blocker": "大量 S3 物件用 SSE-KMS，KMS 请求费很高；要压成本并批次改加密，运维要低。",
    "requirements": "1) 降 KMS 费用；2) 既有物件迁移；3) 低运维。",
    "steps": [
      "新建预设 SSE-S3 的 bucket。",
      "用 S3 Batch Operations 把物件复制到新桶（或重写加密）。",
      "应用改指新桶。",
      "旧桶生命周期清理。"
    ],
    "solutions": "正确答案 B。SSE-S3 无 per-request KMS 费；Batch Operations 大批迁移省事。",
    "result_flow": "旧 SSE-KMS 物件 → Batch Operations 复制 → 新 SSE-S3 bucket → 应用读新桶。",
    "options": {
      "A": "错。逐物件自写脚本运维高。",
      "B": "✓ 正确。新桶 SSE-S3 + Batch Ops。",
      "C": "错。仍用 KMS 省不到请求费。",
      "D": "错。手动不够规模。"
    },
    "diagram_before": "flowchart TB\n  OBJ[\"大量 S3 物件\"] --> KMS[\"SSE-KMS\"]\n  KMS --> FEE{{\"KMS 请求费很高\"}}\n  X{{\"缺口: 降费 + 批次改加密<br/>低运维\"}}\n  FEE -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  OLD[\"旧 SSE-KMS 物件\"] --> BATCH[\"S3 Batch Operations\"]\n  BATCH --> NEW[\"新 Bucket SSE-S3\"]\n  APP[\"应用\"] --> NEW\n  NOTE[\"无 per-request KMS 费\"] --> NEW\n"
  },
  "257": {
    "blocker": "S3 事件触发 Lambda 写 DynamoDB 时，尖峰写爆 WCU，部分事件失败要可重试。",
    "requirements": "1) 缓冲尖峰；2) 调高写容量；3) 可重处理。（选两项）",
    "steps": [
      "S3 与 Lambda 之间加 SQS 缓冲。",
      "调高 DynamoDB WCU（或 auto scaling）。",
      "Lambda 从 SQS 拉讯息写表，失败可回伫列。",
      "监控 DLQ。"
    ],
    "solutions": "正确答案 B、D。加 WCU 应对写入；SQS 平滑 Lambda 并发与重试。",
    "result_flow": "S3 事件 → SQS → Lambda → DynamoDB（足够 WCU）；失败回伫列／DLQ。",
    "options": {
      "A": "错。只加 Lambda 并发可能更打爆 DB。",
      "B": "✓ 正确。提高 WCU。",
      "C": "错。同步重试无缓冲。",
      "D": "✓ 正确。SQS 重新处理。",
      "E": "错。改 RDS 无关。"
    },
    "diagram_before": "flowchart TB\n  S3[\"S3 事件\"] --> L[\"Lambda\"]\n  L --> DDB[\"DynamoDB\"]\n  DDB --> TH{{\"尖峰写爆 WCU<br/>部分失败\"}}\n  X{{\"缺口: 缓冲+加容量+可重试\"}}\n  TH -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  S3[\"S3 事件\"] --> SQS[\"SQS 缓冲/重试\"]\n  SQS --> L[\"Lambda\"]\n  L --> DDB[\"DynamoDB 足够 WCU\"]\n  L -->|失败| DLQ[\"回伫列 / DLQ\"]\n"
  },
  "258": {
    "blocker": "小队要快速做可扩前端：上传档、登入、全球加速，运维要极低。",
    "requirements": "1) 快上线；2) 认证；3) 静态托管+CDN；4) 上传储存。",
    "steps": [
      "用 Amplify Hosting 部署前端。",
      "CloudFront 加速。",
      "上传档放 S3。",
      "Cognito 做使用者认证。"
    ],
    "solutions": "正确答案 D。Amplify + CloudFront + S3 + Cognito 是快速低运维 Web 堆叠。",
    "result_flow": "使用者 → CloudFront/Amplify 前端 → Cognito 登入 → 上传至 S3。",
    "options": {
      "A": "错。自管 EC2 前端慢且重。",
      "B": "错。缺托管认证与加速整合。",
      "C": "错。只 S3 网站缺完整认证上传流。",
      "D": "✓ 正确。Amplify 堆叠正确。"
    },
    "diagram_before": "flowchart TB\n  TEAM[\"小队\"] -.-> NEED[\"可扩前端\"]\n  NEED --> UP[\"上传档\"]\n  NEED --> AUTH[\"登入\"]\n  NEED --> CDN[\"全球加速\"]\n  X{{\"缺口: 要极低运维快上线\"}}\n  CDN -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  U[\"使用者\"] --> CF[\"CloudFront / Amplify\"]\n  CF --> WEB[\"前端\"]\n  U --> COG[\"Cognito 登入\"]\n  U --> S3[\"上传至 S3\"]\n  WEB --> COG\n"
  },
  "259": {
    "blocker": "ASG 实例常被换掉，应用 log 在本机就没了，要集中保留。",
    "requirements": "1) 实例终止后 log 仍在；2) 集中查询。",
    "steps": [
      "在 AMI／启动范本装 CloudWatch Agent。",
      "Agent 把应用 log 丢到 CloudWatch Logs。",
      "设保留天数。",
      "用 Logs Insights 查。"
    ],
    "solutions": "正确答案 B。CloudWatch Agent → Logs，实例没了 log 仍在服务里。",
    "result_flow": "App 写本机 log → Agent → CloudWatch Logs（持久）→ 查询；ASG 换机不影响历史。",
    "options": {
      "A": "错。只本机档，机没就没。",
      "B": "✓ 正确。CW Agent 正确。",
      "C": "错。手动 scp 不可扩。",
      "D": "错。EBS 快照不适即时 log。"
    },
    "diagram_before": "flowchart TB\n  APP[\"应用\"] --> LOG[\"本机 log\"]\n  ASG[\"ASG 常换实例\"] --> GONE{{\"实例没了 log 没了\"}}\n  X{{\"缺口: 要集中保留可查\"}}\n  GONE -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  APP[\"App 写本机\"] --> AGENT[\"CloudWatch Agent\"]\n  AGENT --> CWL[\"CloudWatch Logs 持久\"]\n  ASG[\"ASG 换机\"] -.->|不影响历史| CWL\n  CWL --> Q[\"集中查询\"]\n"
  },
  "260": {
    "blocker": "前端 www.example.com 呼叫 API 时浏览器 CORS 失败。",
    "requirements": "1) 浏览器允许跨源；2) API 回应正确 CORS 头。",
    "steps": [
      "在 API Gateway 启用 CORS。",
      "确保回应含 Access-Control-Allow-Origin: https://www.example.com（或适当值）。",
      "处理 OPTIONS 预检。",
      "再测前端。"
    ],
    "solutions": "正确答案 C。CORS 必须在 API 层正确回应，不是只改 S3 或 origin 设定。",
    "result_flow": "浏览器预检 OPTIONS → API Gateway 回 CORS 头 → 实际请求放行 → 前端读回应。",
    "options": {
      "A": "错。只改 S3 CORS 不解 API 跨源。",
      "B": "错。CloudFront 不设对的 API CORS 仍失败。",
      "C": "✓ 正确。API Gateway CORS 正确。",
      "D": "错。关浏览器安全不可行。"
    },
    "diagram_before": "flowchart TB\n  B[\"浏览器 www.example.com\"] --> API[\"呼叫 API\"]\n  API --> CORS{{\"CORS 失败\"}}\n  X{{\"缺口: API 未回正确 CORS 头\"}}\n  CORS -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  B[\"浏览器\"] --> OPT[\"预检 OPTIONS\"]\n  OPT --> APIGW[\"API Gateway CORS 头\"]\n  APIGW --> OK[\"预检通过\"]\n  B --> REQ[\"实际请求\"]\n  REQ --> APIGW\n  APIGW --> RESP[\"前端可读回应\"]\n"
  },
  "261": {
    "blocker": "多帐号要连 Azure AD 联合登入、发临时凭证、集中权限，还可能要 Managed AD。",
    "requirements": "1) 联合身分；2) 临时凭证；3) 集中权限集。（选三项）",
    "steps": [
      "用 IAM Identity Center 连接 Azure AD。",
      "在管理帐号部署 Managed Microsoft AD 并 RAM 共享（若需要 AD 整合）。",
      "建 permission sets 指到群组与帐号。",
      "使用者联合登入拿临时凭证。"
    ],
    "solutions": "正确答案 C、D、E。Identity Center +（Managed AD/RAM）+ permission sets 是组织级联合标准。",
    "result_flow": "使用者 → Azure AD → IAM Identity Center → permission set 临时凭证 → 目标帐号。",
    "options": {
      "A": "错。只建管理帐号不够。",
      "B": "错。统一 email 非解法。",
      "C": "✓ 正确。Identity Center 连 Azure AD。",
      "D": "✓ 正确。Managed AD + RAM。",
      "E": "✓ 正确。Permission sets。",
      "F": "错。每帐号自管 IAM 非集中。"
    },
    "diagram_before": "flowchart TB\n  U[\"多帐号使用者\"] -.-> AAD[\"Azure AD?\"]\n  U -.-> TMP[\"临时凭证?\"]\n  U -.-> PERM[\"集中权限集?\"]\n  X{{\"缺口: 组织级联合登入\"}}\n  AAD -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  U[\"使用者\"] --> AAD[\"Azure AD\"]\n  AAD --> IC[\"IAM Identity Center\"]\n  IC --> PS[\"Permission Sets\"]\n  PS --> TMP[\"临时凭证\"]\n  TMP --> ACC[\"目标帐号\"]\n  MAD[\"Managed AD + RAM\"] --> IC\n"
  },
  "262": {
    "blocker": "20 个不常跑但关键的 Java/Node 批次，要共用一种部署、依记忆体扩、省成本。",
    "requirements": "1) 单一部署方法；2) 多应用共资源；3) 依记忆体扩缩。",
    "steps": [
      "ECS on EC2，丛集依记忆体 75% Auto Scaling。",
      "每应用一个 ECS service/task。",
      "task 级也可扩。",
      "CloudWatch 监服务与主机。"
    ],
    "solutions": "正确答案 B。多任务共 EC2 丛集比 20 套 Beanstalk／乱共 VM 更标准省钱。",
    "result_flow": "批次触发 → ECS task 在共用地 EC2 跑 → 记忆体高 → 加 EC2；任务少 → 缩。",
    "options": {
      "A": "错。长批次可能碰 Lambda 限制与 20 函数难管。",
      "B": "✓ 正确。ECS 共丛集 + 记忆体扩缩。",
      "C": "错。20 套 Beanstalk 重。",
      "D": "错。3 年 RI 绑死间歇负载风险高。"
    },
    "diagram_before": "flowchart TB\n  B1[\"批次1 Java\"]\n  B2[\"批次2 Node\"]\n  B20[\"…共 20 个不常跑\"]\n  X{{\"缺口: 要共用部署<br/>依记忆体扩、省成本\"}}\n  B1 -.-> X\n  B2 -.->|存在但未接上| X\n  B20 -.->|存在但未接上| X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  TRIG[\"批次触发\"] --> ECS[\"ECS Task\"]\n  ECS --> CLUS[\"共用 EC2 丛集\"]\n  CLUS -->|记忆体高| SCALE[\"加 EC2\"]\n  CLUS -->|任务少| DOWN[\"缩容省成本\"]\n"
  },
  "263": {
    "blocker": "EMR 每天 1 点跑 6 小时，目前全 On-Demand，要降运算成本。",
    "requirements": "1) 降成本；2) 关键节点稳定；3) 跑完不留闲置。",
    "steps": [
      "Primary/Core 用 On-Demand。",
      "Task 用 Spot instance fleet。",
      "跑完终止整个丛集。",
      "On-Demand 部分买 Compute Savings Plans。"
    ],
    "solutions": "正确答案 B。稳定节点 On-Demand、可中断 task 用 Spot、下班关丛集 + SP。",
    "result_flow": "1:00 起丛集（Core OD + Task Spot）→ 跑 6h → 全终止；OD 用量吃 SP 折扣。",
    "options": {
      "A": "错。全 Spot 易让主节点挂掉作业。",
      "B": "✓ 正确。OD+Spot+终止+SP 正确。",
      "C": "错。全 OD 省得少。",
      "D": "错。只杀 task 留 master 仍闲置计费。"
    },
    "diagram_before": "flowchart TB\n  EMR[\"EMR 每天 1 点跑 6h\"] --> OD[\"全 On-Demand\"]\n  OD --> COST{{\"运算成本高\"}}\n  X{{\"缺口: 关键稳 + 可中断省钱<br/>跑完不留闲置\"}}\n  COST -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  T1[\"1:00 起丛集\"] --> CORE[\"Core On-Demand\"]\n  T1 --> TASK[\"Task Spot\"]\n  CORE --> RUN[\"跑 6 小时\"]\n  TASK --> RUN\n  RUN --> STOP[\"全终止\"]\n  OD[\"OD 用量\"] --> SP[\"Savings Plan\"]\n"
  },
  "264": {
    "blocker": "三 AZ private EC2 + 公有 ALB；要连地端，但地端防火墙只白名单一个 IP，还要自动恢复。",
    "requirements": "1) 出站固定单一 EIP；2) 故障自动在其他子网重建；3) 白名单不变。",
    "steps": [
      "公有子网放单一 NAT Gateway，绑该 EIP。",
      "Private 子网 0.0.0.0/0 指 NAT。",
      "CloudWatch 自订指标监 NAT 健康。",
      "不健康时 Lambda 在其他子网建新 NAT 并重绑同一 EIP。"
    ],
    "solutions": "正确答案 C。只能一个白名单 IP，故单 NAT+EIP；Lambda 负责自动重建。",
    "result_flow": "EC2 → NAT（单一 EIP）→ 地端；NAT 挂 → Lambda 换子网新 NAT 绑回同一 EIP。",
    "options": {
      "A": "错。三 NAT 要三 EIP，白名单不够。",
      "B": "错。NLB 不做 outbound NAT。",
      "C": "✓ 正确。单 NAT + 监控 + Lambda 重建。",
      "D": "错。ALB 不配 EIP 做出站 NAT。"
    },
    "diagram_before": "flowchart TB\n  EC2[\"三 AZ 私有 EC2\"] --> ALB[\"公有 ALB\"]\n  EC2 -.-> OP[\"要连地端\"]\n  FW[\"地端防火墙只白名单 1 个 IP\"]\n  X{{\"缺口: 固定 EIP + 故障自动重建\"}}\n  FW -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  EC2[\"私有 EC2\"] --> NAT[\"单一 NAT + EIP\"]\n  NAT --> OP[\"地端白名单 IP\"]\n  MON[\"监控 NAT 挂掉\"] --> L[\"Lambda\"]\n  L --> NEW[\"其他子网新 NAT<br/>绑回同一 EIP\"]\n"
  },
  "265": {
    "blocker": "540 个可独立运作的开发帐号要从旧 Organization 搬到新 Organization。",
    "requirements": "1) 离开旧 Org；2) 被新 Org 邀请；3) 接受加入。（选三项）",
    "steps": [
      "在各开发帐号执行 RemoveAccountFromOrganization 离开旧组织。",
      "新组织管理帐号 InviteAccountToOrganization。",
      "各开发者登入帐号接受邀请。",
      "确认帐号出现在新 Org。"
    ],
    "solutions": "正确答案 C、E、F。先变 standalone，再邀请与接受；不能直接 MoveAccount 跨 Org。",
    "result_flow": "成员帐号离开旧 Org → standalone → 新 Org 邀请 → 使用者接受 → 成为新成员。",
    "options": {
      "A": "错。不能直接 MoveAccount 到另一 Org。",
      "B": "错。管理帐号移除成员流程不适用此迁移叙述。",
      "C": "✓ 正确。各帐号自行离开。",
      "D": "错。不需 placeholder 帐号。",
      "E": "✓ 正确。新 Org 发邀请。",
      "F": "✓ 正确。各帐号确认加入。"
    },
    "diagram_before": "flowchart TB\n  OLD[\"旧 Organization\"] --> ACC[\"540 个开发帐号\"]\n  NEW[\"新 Organization\"]\n  ACC -.-> NEW\n  X{{\"缺口: 不能直接跨 Org Move<br/>要离旧→邀请→接受\"}}\n  ACC -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  ACC[\"成员帐号\"] --> LEAVE[\"离开旧 Org\"]\n  LEAVE --> SA[\"Standalone\"]\n  SA --> INV[\"新 Org 发邀请\"]\n  INV --> ACCPT[\"帐号接受\"]\n  ACCPT --> MEM[\"成为新成员\"]\n"
  },
  "266": {
    "blocker": "CloudFront+S3 图床，第三方偶尔上传坏图；已有 Python 侦测，要在被服务前尽快跑、延迟最低。",
    "requirements": "1) 上传后立刻侦测；2) 低延迟；3) 服务前处理。",
    "steps": [
      "S3 上传完成发 event notification。",
      "直接触发 Lambda 跑侦测逻辑。",
      "坏图删除或移到隔离前缀。",
      "好图才给 CloudFront 长期快取服务。"
    ],
    "solutions": "正确答案 C。S3 事件 + Lambda 在源头处理，比边缘回应时再查更早、更单纯。",
    "result_flow": "上传 → S3 事件 → Lambda 侦测 → 隔离坏图；用户经 CloudFront 多半只拿到好图。",
    "options": {
      "A": "错。viewer-response 已对用户回应后，太晚。",
      "B": "错。origin-response 已拉到坏图，延迟与快取风险。",
      "C": "✓ 正确。S3 事件 + Lambda 最低延迟源头处理。",
      "D": "错。Step Functions 对单步侦测过重。"
    },
    "diagram_before": "flowchart TB\n  UP[\"第三方上传\"] --> S3[\"S3 图床\"]\n  S3 --> CF[\"CloudFront\"]\n  BAD[\"偶尔坏图\"] --> S3\n  X{{\"缺口: 服务前要尽快侦测<br/>延迟最低\"}}\n  BAD -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  UP[\"上传\"] --> S3[\"S3\"]\n  S3 --> EVT[\"S3 事件\"]\n  EVT --> L[\"Lambda 侦测\"]\n  L -->|坏图| ISO[\"隔离\"]\n  U[\"用户\"] --> CF[\"CloudFront 多半只拿到好图\"]\n"
  },
  "267": {
    "blocker": "CodePipeline 部署到 ASG，实例因扩缩一直变；每次还要手装 CodeDeploy agent 并挂 deployment group，24h 内要上线且运维最低。",
    "requirements": "1) 新实例自动可部署；2) 与 ASG 整合；3) 低运维。",
    "steps": [
      "做含 CodeDeploy agent 的 AMI。",
      "Launch template 用该 AMI。",
      "CodeDeploy deployment group 关联整个 ASG，不是单一实例。",
      "之后扩出来的机器自动进部署组。"
    ],
    "solutions": "正确答案 D。Agent 进 AMI + deployment group 绑 ASG 是官方低运维做法。",
    "result_flow": "ASG 扩出新机（已含 agent）→ 自动属 deployment group → CodePipeline/CodeDeploy 发版。",
    "options": {
      "A": "错。EventBridge+Lambda 手挂实例，维护重。",
      "B": "错。暂停 ASG 不适合常扩缩。",
      "C": "错。每次 CodeBuild 做 AMI+refresh 偏重。",
      "D": "✓ 正确。AMI 预装 agent + 绑 ASG 正确。"
    },
    "diagram_before": "flowchart TB\n  CP[\"CodePipeline\"] --> CD[\"CodeDeploy\"]\n  ASG[\"ASG 实例常变\"] \n  MAN{{\"手装 agent<br/>手挂 deployment group\"}}\n  ASG -.-> MAN\n  X{{\"缺口: 24h 上线低运维<br/>新机要自动可部署\"}}\n  MAN -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  AMI[\"AMI 预装 CodeDeploy agent\"] --> ASG[\"ASG 扩出新机\"]\n  ASG --> DG[\"自动属 Deployment Group\"]\n  CP[\"CodePipeline\"] --> CD[\"CodeDeploy\"]\n  CD --> DG\n  DG --> DEP[\"自动发版\"]\n"
  },
  "268": {
    "blocker": "网站用四台 EC2（虚拟伺服器）放在 ALB（应用负载平衡器：把访客流量分到多台伺服器）后面。有伺服器挂掉时，只会跳 CloudWatch 告警（监控警示），然后要运维同事手动加一台新伺服器，中间可能停机、也慢。",
    "requirements": "要高可用：故障时自动补上新实例；切换到新方案时停机时间尽量短，最好保留现有 ALB 与正在跑的机器。",
    "steps": [
      "建立 Launch Template（启动范本：规定新机器用哪种映像、规格、设定）。",
      "建立 Auto Scaling 群组（自动增减伺服器数量的机制），并挂上这个启动范本。",
      "把 Auto Scaling 群组挂到现有的 ALB（不要删掉重建）。",
      "把目前正在跑的四台 EC2 手动加入 Auto Scaling 群组，让它们也受群组管理。"
    ],
    "solutions": "正确答案 B。核心是「保留现有 ALB + 现有 EC2，再让 Auto Scaling 接管」。之后 ALB 健康检查失败时，群组会自动依启动范本开新机器，不用人手。删掉 ALB 或整批删机器会多一次中断；选项 D 以为 ALB 会自动把旧机器注册进群组，这不会发生。",
    "result_flow": "使用者请求 → ALB 健康检查 → 某台 EC2 不健康 → Auto Scaling 终止／替换该实例 → 依 Launch Template 启动新 EC2 → 新实例自动挂到 ALB 目标群组 → 流量恢复正常，全程无需手动加机。",
    "options": {
      "A": "错。删掉现有 ALB 再建新的会造成不必要停机，违反「切换时最小化 downtime」。",
      "B": "✓ 正确。保留 ALB 与现有实例，用 Auto Scaling 实现自动替换，迁移风险最低。",
      "C": "错。删掉 ALB 与所有 EC2 再重建，停机时间最长。",
      "D": "错。已存在、非由 Auto Scaling 启动的 EC2 不会被 ALB「自动注册进群组」；必须手动 attach 现有实例。"
    },
    "diagram_before": "flowchart TB\n  U[\"使用者\"] --> ALB[\"ALB\"]\n  ALB --> EC2[\"4 台固定 EC2\"]\n  EC2 -.-> CW[\"CloudWatch 告警\"]\n  X{{\"故障要人手加机<br/>中间可能停机\"}}\n  CW -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  U[\"使用者\"] --> ALB[\"既有 ALB\"]\n  ALB --> ASG[\"Auto Scaling 群组<br/>含原 4 台 EC2\"]\n  ASG --> LT[\"Launch Template\"]\n  ALB -->|不健康| ASG\n  ASG -->|\"自动开新机\"| NEW[\"新 EC2 挂回目标群组\"]"
  },
  "269": {
    "blocker": "Organizations（多帐户组织）里开发者帐户每天从 S3 拉约 1TB 资料。流量走 NAT Gateway（私有子网路出网关），产生大量资料传输与 NAT 处理费，运算成本也偏高；又没有统一「核准架构」强制大家照做。",
    "requirements": "1) 主动强制核准的 VPC／EC2 架构；2) 降低 S3 传输与 NAT 费用；3) 不拖慢开发者自助部署速度；4) 最划算。",
    "steps": [
      "在 Service Catalog（服务目录：给同事自助开「已审核好」的环境）建立 portfolio，内含核准的 VPC 范本。",
      "范本内建 S3 Gateway Endpoint（闸道型端点：私有子网路存 S3 不用走网际网路／NAT）。",
      "范本只允许核准的 EC2 实例类型。",
      "用 launch constraint 指定核准的 IAM 角色，并把开发者权限收窄成只能用 Service Catalog。"
    ],
    "solutions": "正确答案 C。Service Catalog 让开发者「只能按核准按钮部署」，同时内建 S3 Gateway Endpoint 省 NAT 钱。Interface Endpoint 较贵；Budget 终止资源是事后反应；Config 删资源会中断开发。",
    "result_flow": "开发者在 Service Catalog 选核准产品 → 用核准角色部署 VPC + S3 Gateway Endpoint + 核准 EC2 → EC2 存 S3 走 VPC 内 Gateway Endpoint（不经 NAT）→ 传输与 NAT 费用下降，架构仍受控。",
    "options": {
      "A": "错。S3 Interface Endpoint 通常比 Gateway 贵；只允许 CloudFormation 部署也偏僵硬。",
      "B": "错。预算告警属事后；到 100% 就砍资源会打断开发，也无法强制架构模式。",
      "C": "✓ 正确。Service Catalog + S3 Gateway Endpoint + 核准实例，兼顾治理、成本与自助速度。",
      "D": "错。Config 侦测后终止资源是事后补救，可能中断进行中的工作。"
    },
    "diagram_before": "flowchart TB\n  DEV[\"开发者帐户 EC2\"] --> NAT[\"NAT Gateway\"]\n  NAT -->|\"约 1TB/天\"| S3[\"S3\"]\n  DEV -.-> NO[\"无统一核准架构\"]\n  X{{\"NAT 费高<br/>架构不受控\"}}\n  NAT -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  DEV[\"开发者\"] --> SC[\"Service Catalog<br/>核准产品\"]\n  SC --> VPC[\"VPC + 核准 EC2\"]\n  VPC --> GW[\"S3 Gateway Endpoint\"]\n  GW --> S3[\"S3\"]\n  GW -.-> SAVE[\"不经 NAT，费用下降\"]"
  },
  "270": {
    "blocker": "公司要扩到数百个 AWS 帐户、多个 Region（地理区域），但必须禁止在「未核准 Region」做任何操作；用逐帐户 IAM 很难管。",
    "requirements": "大规模多帐户下，统一拒绝非指定 Region 的操作；要可扩展、集中治理。",
    "steps": [
      "用 AWS Control Tower 建 landing zone（标准多帐户起点环境）。",
      "把帐户放进适当的 OU（组织单位：帐户分组资料夹）。",
      "在 OU 上挂 SCP（服务控制政策：组织层级禁止规则，下层帐户改不掉）。",
      "SCP 明确 Deny 在非核准 Region 执行服务。"
    ],
    "solutions": "正确答案 C。Region 边界要用预防性的 SCP，不是 IAM Allow 条件或 Security Hub 侦测。Control Tower 适合数百帐户落地。",
    "result_flow": "使用者／角色在成员帐户呼叫 API → Organizations 先评估 SCP → 非核准 Region 直接拒绝 → 核准 Region 才进入该帐户 IAM 授权 → 达成全组织 Region 锁定。",
    "options": {
      "A": "错。IAM 条件式 Allow 无法像 SCP 那样全面 Deny，帐户一多更难维护。",
      "B": "错。逐帐户建 IAM User 不可扩展；IAM 政策也无法在组织层级强制拒绝。",
      "C": "✓ 正确。Control Tower + OU + SCP 是大规模 Region 限制标准做法。",
      "D": "错。Security Hub 是安全合规检测，不能禁止 Region 操作。"
    },
    "diagram_before": "flowchart TB\n  ACC[\"数百成员帐户\"] --> IAM[\"逐帐户 IAM\"]\n  IAM --> REG[\"任意 Region 操作\"]\n  X{{\"无法集中禁止<br/>未核准 Region\"}}\n  IAM -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  CT[\"Control Tower\"] --> OU[\"帐户放入 OU\"]\n  OU --> SCP[\"SCP Deny<br/>非核准 Region\"]\n  API[\"成员帐户 API\"] --> SCP\n  SCP -->|核准区| IAM[\"帐户 IAM 授权\"]\n  SCP -->|未核准| DENY[\"直接拒绝\"]"
  },
  "271": {
    "blocker": "零售下单系统把网页、资料库 API、业务逻辑都塞在一群有负载平衡的 EC2 上，耦合重、不好扩、失败订单也没地方好好留著，营运成本高。",
    "requirements": "重构成解耦、可扩展架构；失败订单要能保留；营运成本尽量低。",
    "steps": [
      "前端静态网站改放 S3（物件储存）托管。",
      "资料库 API 用 AppSync（GraphQL／API 托管服务）对外。",
      "订单先丢进 SQS（简易伫列：讯息排队缓冲）。",
      "业务逻辑用 Lambda（事件触发、按次计费的无伺服器函数）处理。",
      "为 SQS 设定 DLQ（死信伫列：反复失败的讯息隔离存放），保留失败订单。"
    ],
    "solutions": "正确答案 C。S3 + AppSync + SQS + Lambda + DLQ 是典型低营运成本事件驱动订单架构。ECS／EKS／Amazon MQ／SES 要嘛贵要嘛用错（SES 是寄信不是伫列）。",
    "result_flow": "使用者下单 → 前端（S3）→ API（AppSync）→ 订单进 SQS → Lambda 处理 → 成功则完成；失败超过重试 → 进 DLQ 供事后审查，主流程不堵死。",
    "options": {
      "A": "错。ECS 长轮询维运成本高于 Lambda；整体不如全无伺服器省。",
      "B": "错。Amazon MQ 成本较高；Glacier Deep Archive 不适合失败订单要可查、可重试的场景。",
      "C": "✓ 正确。Serverless 解耦 + DLQ 保留失败订单，扩展与成本最佳。",
      "D": "错。SES 不是讯息伫列；Lightsail／EKS 过度复杂且成本高。"
    },
    "diagram_before": "flowchart TB\n  U[\"下单请求\"] --> EC2[\"一群 EC2<br/>网页+API+逻辑全塞\"]\n  EC2 --> DB[\"资料库\"]\n  X{{\"耦合重难扩展<br/>失败订单没地方留\"}}\n  EC2 -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  U[\"使用者\"] --> S3[\"S3 静态前端\"]\n  S3 --> AS[\"AppSync API\"]\n  AS --> SQS[\"SQS 订单伫列\"]\n  SQS --> L[\"Lambda 业务逻辑\"]\n  SQS -->|重试失败| DLQ[\"DLQ 保留失败单\"]"
  },
  "272": {
    "blocker": "应用在 us-east-1，资料库是 EC2 上的自建 MySQL。已规划 us-west-2 应用伺服器与 Route 53（DNS）健康检查／容错转移，但资料库还没有能满足极严 RTO／RPO 的跨 Region 方案。",
    "requirements": "跨 Region 灾难复原：RTO（复原时间目标）< 5 分钟、RPO（可容忍资料流失）< 1 分钟。",
    "steps": [
      "把 EC2 MySQL 迁移到 Amazon Aurora（托管相容 MySQL／PostgreSQL 的高可用资料库）。",
      "建立 Aurora Global Database（全球资料库：跨 Region 近即时复写）。",
      "Primary 放 us-east-1，Secondary 放 us-west-2。",
      "配合既有 Route 53 健康检查与 DNS failover，故障时提升次要 Region。"
    ],
    "solutions": "正确答案 B。Aurora Global Database 典型 RPO 约 1 秒内、跨 Region 容错可在约一分钟内完成，符合 <1 分 RPO 与 <5 分 RTO。RDS 跨 Region 唯读复本 lag 常更大且提升较慢；Multi-AZ 只在同 Region；EC2 自建 standby 难保证指标。",
    "result_flow": "日常写入 us-east-1 Aurora Primary → 近即时复写到 us-west-2 Secondary → 主 Region 故障 → Route 53 健康检查失败 → DNS 切到 us-west-2 → 提升 Secondary 接写入 → 应用继续服务。",
    "options": {
      "A": "错。RDS 跨 Region 唯读复本非同步，RPO 常难稳压在 1 分钟内，failover 也较慢。",
      "B": "✓ 正确。Aurora Global Database 专为低 RPO／RTO 跨 Region DR 设计。",
      "C": "错。Multi-AZ 只做同 Region 高可用，不解跨 Region DR。",
      "D": "错。EC2 自建 MySQL standby 管理重、RPO／RTO 难保证。"
    },
    "diagram_before": "flowchart TB\n  APP[\"us-east-1 应用\"] --> MYSQL[\"EC2 自建 MySQL\"]\n  APP2[\"us-west-2 应用已就绪\"]\n  R53[\"Route 53 Failover\"]\n  X{{\"DB 无跨区 DR<br/>RTO/RPO 达不到\"}}\n  MYSQL -.-> X\n  APP2 -.->|存在但未接上| X\n  R53 -.->|存在但未接上| X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  W[\"写入\"] --> PRI[\"Aurora Primary<br/>us-east-1\"]\n  PRI -->|\"近即时复写\"| SEC[\"Secondary<br/>us-west-2\"]\n  R53[\"Route 53 健康检查\"] -->|故障| PRO[\"提升 Secondary\"]\n  PRO --> SEC\n  APP[\"应用\"] --> R53"
  },
  "273": {
    "blocker": "Organizations 管理多帐户。法规要求：特定成员帐户只能在某些 Region 部署；资源要依群组标准强制标签；要集中管、设定越少越好。",
    "requirements": "Region 限制 + 标签强制 + 集中管理 + 最小设定量。",
    "steps": [
      "新建一个 OU，把要受限的成员帐户放进去（不要全塞在 root 下混管）。",
      "在该 OU 套用 Tag Policy（标签政策：规定标签键值标准）。",
      "在同一 OU 套用带 Region 条件的 SCP，拒绝未核准 Region 的操作。",
      "之后相关帐户自动继承，无需逐帐户重复设定。"
    ],
    "solutions": "正确答案 D。OU + SCP + Tag Policy 是 Organizations 标准治理。Config 逐帐户是侦测性；Billing 停用 Region 已不适合作治理主手段；挂在 root 不利分层。",
    "result_flow": "帐户移入专用 OU → 建立资源时 SCP 挡非核准 Region → Tag Policy 要求符合群组标签标准 → 管理帐户集中维护政策，成员帐户无法自行放宽。",
    "options": {
      "A": "错。各帐户各自 Config 规则营运开销大，且多为侦测非预防。",
      "B": "错。帐单主控台停用 Region 不是此场景首选；Tag Policy 只挂 root 也不利分群治理。",
      "C": "错。帐户直接挂 root 难以对「特定帐户」差异化政策。",
      "D": "✓ 正确。新 OU + Tag Policy + SCP 集中、设定最少。"
    },
    "diagram_before": "flowchart TB\n  ORG[\"Organizations\"] --> ACC[\"成员帐户混管\"]\n  ACC --> REG[\"任意 Region\"]\n  ACC --> TAG[\"标签不标准\"]\n  X{{\"Region/标签<br/>无法集中强制\"}}\n  ACC -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  OU[\"专用 OU\"] --> ACC[\"受限成员帐户\"]\n  OU --> SCP[\"SCP 挡未核准 Region\"]\n  OU --> TP[\"Tag Policy 强制标签\"]\n  ACC -->|\"建立资源\"| CHK[\"同时受两政策约束\"]\n  CHK --> OK[\"合规才成功\"]"
  },
  "274": {
    "blocker": "应用把报告放 S3，正常应靠 signed URL（签章网址：短时间授权下载）给使用者。安全团队发现档案其实是公开的，任何人都能下载；已暂停产生新报告。",
    "requirements": "立刻堵住公开存取；不能破坏应用既有的 signed URL 下载流程。",
    "steps": [
      "在该 S3 bucket 开启 Block Public Access（封锁公开存取）。",
      "把 IgnorePublicAcls 设为 TRUE（忽略物件上的公开 ACL）。",
      "确认应用仍用 IAM 凭证产生 signed URL（此机制不受 Block Public Access 挡合法签章存取影响）。",
      "恢复产生报告，并复查 bucket／物件不再匿名可读。"
    ],
    "solutions": "正确答案 D。问题多半是公开 ACL。IgnorePublicAcls 可立即让公开 ACL 失效。Lambda 排程、Trusted Advisor、逐物件改 ACL 都较慢或不彻底。",
    "result_flow": "匿名直接开物件 URL → 被 Block Public Access 挡下；合法使用者 → 应用验证后签 signed URL → 持签章短时下载 → 报告可取且不再公开裸奔。",
    "options": {
      "A": "错。Lambda 排程套 Deny 复杂且非最即时。",
      "B": "错。Trusted Advisor 是建议，不能一键立刻修。",
      "C": "错。逐一改 private ACL 慢、易漏，新物件仍可能公开。",
      "D": "✓ 正确。Block Public Access + IgnorePublicAcls 最快且不影响 signed URL 流程。"
    },
    "diagram_before": "flowchart TB\n  APP[\"应用产报告\"] --> S3[\"S3 物件\"]\n  S3 --> PUB[\"公开 ACL 生效\"]\n  ANY[\"任何人\"] --> S3\n  X{{\"报告可匿名下载<br/>应只用 signed URL\"}}\n  PUB -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  ANY[\"匿名直连\"] -.->|挡下| BPA[\"Block Public Access<br/>IgnorePublicAcls\"]\n  BPA --> S3[\"S3 报告桶\"]\n  USER[\"合法使用者\"] --> APP[\"应用验证\"]\n  APP --> URL[\"Signed URL\"]\n  URL --> S3"
  },
  "275": {
    "blocker": "要把帐户 A 私有子网路里的 RDS Oracle 迁到另一帐户的 RDS PostgreSQL，要零停机、尽量快，迁移期间新旧资料都要跟上，完成后资料要一致；应用靠 Route 53 CNAME 指资料库。",
    "requirements": "跨帐户异质迁移、零停机、含存量与增量、结束时一致、用 CNAME 切换。",
    "steps": [
      "在目标帐户准备 PostgreSQL，并用 SCT（结构转换工具）处理／迁移 schema（题库正确组合以连线与 DMS 为主）。",
      "两帐户 VPC 做 VPC Peering（私有网路对等），安全群组放行资料库埠。",
      "在目标帐户用 DMS（资料库迁移服务）做 Full Load + CDC（全量载入 + 变更资料撷取）持续同步。",
      "追上后改 Route 53 CNAME 指到目标端点，完成切换。"
    ],
    "solutions": "正确答案 C、E、F（依题库）。C 建立私有连线；E／F 为 DMS 迁移与完成后改 CNAME 的组合（PDF 选项文字常合并）。不要把来源库临时改公开上网。注意：实务上 Full Load+CDC（E）才能涵盖既有资料；仅 CDC（F 常见写法）不足以搬存量，作答以题库标示为准。",
    "result_flow": "来源 Oracle（私有）↔ VPC Peering ↔ 目标 DMS → Full Load 搬历史 → CDC 追新写入 → lag 接近 0 → 改 CNAME → 应用连新 PostgreSQL，旧库可退役。",
    "options": {
      "A": "建立目标库 + SCT 迁 schema 实务上必要，但题库三选未含此项。",
      "B": "错。SCT 不会「顺便建 RDS 并载入全部初始资料」成完整迁移。",
      "C": "✓ 正确。VPC Peering + 安全群组让 DMS 在私网连两端资料库。",
      "D": "错。来源改公开可达不安全，违反私有子网路原则。",
      "E": "✓ 正确（题库）。DMS Full Load + CDC 可持续同步至一致。",
      "F": "✓ 正确（题库标示）。迁移完成后改 CNAME；若选项为「仅 CDC」则实务不足，仍以题库为准。"
    },
    "diagram_before": "flowchart TB\n  APP[\"应用\"] --> CNAME[\"Route 53 CNAME\"]\n  CNAME --> ORA[\"帐户A RDS Oracle<br/>私有子网\"]\n  TGT[\"帐户B 要 PostgreSQL\"]\n  X{{\"跨帐户异质迁移<br/>要零停机+增量\"}}\n  ORA -.-> X\n  TGT -.->|存在但未接上| X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  ORA[\"来源 Oracle\"] <--> PEER[\"VPC Peering\"]\n  PEER <--> DMS[\"DMS Full Load+CDC\"]\n  DMS --> PG[\"目标 PostgreSQL\"]\n  APP[\"应用\"] --> CNAME[\"改 CNAME 切换\"]\n  CNAME --> PG"
  },
  "276": {
    "blocker": "事件驱动订单系统用 SQS 标准伫列。一则「毒讯息」一直处理失败，不断重试，后面订单也被卡住；visibility timeout 30 秒、后端逾时 10 秒。",
    "requirements": "隔离故障讯息以便分析；系统要能继续处理后续订单。",
    "steps": [
      "新建一条 SQS 标准伫列当 DLQ（死信伫列）。",
      "在主伫列设定 redrive policy（重导政策），例如 maxReceiveCount 达门槛就移走。",
      "让后端持续从主伫列取讯息；毒讯息达次数后自动进 DLQ。",
      "到 DLQ 分析／修正有问题的订单内容。"
    ],
    "solutions": "正确答案 D。DLQ 必须与来源伫列同类型（标准对标准）。改逾时或缩 visibility 都不能「移走」毒讯息；FIFO 不能当标准伫列的 DLQ。",
    "result_flow": "新订单 → 主 SQS → 消费者处理成功则删讯息；毒讯息反复失败 → 达 maxReceiveCount → 移入标准 DLQ → 主伫列继续消化后续订单。",
    "options": {
      "A": "错。拉长后端逾时不解决逻辑错误，讯息仍会重试。",
      "B": "错。缩 visibility 不会移除故障讯息，可能更快重试空转。",
      "C": "错。DLQ 类型必须与来源相同，标准伫列不能配 FIFO DLQ。",
      "D": "✓ 正确。标准 DLQ 是隔离 poison message 的标准做法。"
    },
    "diagram_before": "flowchart TB\n  ORD[\"新订单\"] --> SQS[\"主 SQS 标准伫列\"]\n  SQS --> CON[\"消费者\"]\n  POI[\"毒讯息反复失败\"] --> SQS\n  X{{\"一直重试卡住<br/>后面订单消化不了\"}}\n  POI -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  ORD[\"新订单\"] --> SQS[\"主 SQS\"]\n  SQS --> CON[\"成功则删讯息\"]\n  SQS -->|\"达 maxReceiveCount\"| DLQ[\"标准 DLQ\"]\n  DLQ --> ANA[\"事后分析修正\"]\n  SQS --> NEXT[\"后续订单继续处理\"]"
  },
  "277": {
    "blocker": "Step Functions（工作流程编排）每晚重训 ML 模型，多步 Lambda 任一步失败会让整条流程失败；连续多晚失败都没人知道。",
    "requirements": "所有类型失败都要通知；可靠把失败事件送到团队。",
    "steps": [
      "依题库路线：在 SES（简易电子邮件服务）验证团队用的邮件地址。",
      "在状态机新增名为 Email 的任务，把输入转去发信（题库用 SES）。",
      "建立会把参数转给 SES 的 Email 任务状态。",
      "（完整实作还会在各 Task／Map／Parallel 加 Catch；题库正确组合为 B、D、E。）"
    ],
    "solutions": "正确答案 B、D、E（依题库）。题库路径走 SES 验证信箱 + Email 任务转发至 SES。常见教材会偏好 SNS Email + Catch States.ALL；若考题选项如此，以题库 B/D/E 为准。注意 E 选项文字常与 F（Catch States.Runtime）PDF 合并。",
    "result_flow": "夜间 Step Functions 某步失败 →（依设计）进入 Email 任务 → SES 寄出失败通知 → 团队收信介入；避免 silently fail 多晚。",
    "options": {
      "A": "SNS Topic + Email 订阅是常见更简做法，但非本题题库三选。",
      "B": "✓ 正确。建立 Email 任务把输入转到通知管道。",
      "C": "Catch States.ALL 是涵盖所有错误的好做法，但题库未选。",
      "D": "✓ 正确（题库）。SES 验证邮件地址以便发信。",
      "E": "✓ 正确（题库）。Email 任务转发至 SES；PDF 可能并有 F 的 Catch 叙述。",
      "F": "Catch 只抓 States.Runtime 涵盖不全；且是否单独成项视题本而定。"
    },
    "diagram_before": "flowchart TB\n  SF[\"Step Functions<br/>夜间重训\"] --> L1[\"Lambda 多步骤\"]\n  L1 -.-> FAIL[\"任一步失败\"]\n  X{{\"连续失败<br/>没人收到通知\"}}\n  FAIL -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  SF[\"Step Functions\"] --> TASK[\"各步骤任务\"]\n  TASK -.->|失败| EMAIL[\"Email 任务状态\"]\n  EMAIL --> SES[\"SES 寄失败信\"]\n  SES --> TEAM[\"团队收信介入\"]\n  OK[\"已验证邮件地址\"] --> SES"
  },
  "278": {
    "blocker": "VPC 内新私有服务要叫地端 company.example 主机名，该 DNS 区只活在公司内网；已有 Site-to-Site VPN，但 VPC 还不会把查询转去地端 DNS。",
    "requirements": "VPC 内服务能解析 on-premises 的 company.example，架构要标准、可维护。",
    "steps": [
      "开启 VPC 的 DNS hostnames。",
      "建立 Route 53 Resolver Outbound Endpoint（出站解析端点：VPC 把 DNS 问出去）。",
      "建立 Resolver 规则：company.example 转发到地端名称伺服器。",
      "确认 VPN 路径可到达地端 DNS IP。"
    ],
    "solutions": "正确答案 B。AWS 查地端要用 Outbound + Forwarding Rule。Inbound 是地端查 AWS，方向反了。空 Private Zone 改 NS、或 hosts 档都难维护。",
    "result_flow": "EC2 查 foo.company.example → VPC DNS → Outbound Resolver → VPN → 地端 DNS → 回传内网 IP → 应用连上地端服务。",
    "options": {
      "A": "错。空 Private Zone 再改地端 NS，复杂且易影响既有 DNS。",
      "B": "✓ 正确。Outbound Endpoint + 转发规则是混合 DNS 标准。",
      "C": "错。Inbound 方向相反（地端→AWS）。",
      "D": "错。hosts 档不可扩展，新主机要一直手改。"
    },
    "diagram_before": "flowchart TB\n  EC2[\"VPC 内私有服务\"] --> DNS[\"VPC DNS\"]\n  VPN[\"Site-to-Site VPN\"] --> ONDNS[\"地端 DNS\"]\n  DNS -.->|未转发| VPN\n  X{{\"解不到<br/>company.example\"}}\n  DNS -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  EC2[\"EC2 查 foo.company.example\"] --> VPC[\"VPC DNS\"]\n  VPC --> OUT[\"Outbound Resolver\"]\n  OUT --> RULE[\"转发规则\"]\n  RULE -->|VPN| ONDNS[\"地端 DNS\"]\n  ONDNS -->|\"回传内网 IP\"| EC2"
  },
  "279": {
    "blocker": "多 VPC 都挂在 Transit Gateway（传输闸道：多 VPC／地端的中枢路由器），且用预设 TGW 路由表，结果任一 VPC 的 EC2 几乎可跟所有其他 VPC 互通，审计认为过宽。",
    "requirements": "每个 VPC 只能跟预先授权的少数 VPC 通讯（微分段）。",
    "steps": [
      "不要再用「单一预设 TGW 路由表让所有 attachment 互联」。",
      "为每个 VPC attachment 建专用 TGW 路由表。",
      "在各路由表只写入允许到达的 VPC 附件路由。",
      "验证未授权 VPC 之间路径不通。"
    ],
    "solutions": "正确答案 C。控制点在 TGW 路由表。NACL／安全群组在实例或子网层，管不了「TGW 预设全通」的根因；只改 VPC 主路由表也无法细控 TGW 转发。",
    "result_flow": "VPC-A 封包 → TGW → 查 VPC-A 专用路由表 → 仅转到授权的 VPC-B → 未授权 VPC-C 无路由 → 被隔离。",
    "options": {
      "A": "错。NACL 无状态、难维护 VPC 间精细授权矩阵。",
      "B": "错。安全群组挡的是 ENI 层，不是 TGW 路由层治理。",
      "C": "✓ 正确。每 attachment 专用 TGW 路由表实现授权互通。",
      "D": "错。改 VPC 主路由表无法单独决定 TGW 上跨 VPC 转发策略。"
    },
    "diagram_before": "flowchart TB\n  A[\"VPC-A\"] --> TGW[\"Transit Gateway<br/>预设路由表\"]\n  B[\"VPC-B\"] --> TGW\n  C[\"VPC-C\"] --> TGW\n  X{{\"任一 VPC 几乎<br/>可通所有其他 VPC\"}}\n  TGW -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  A[\"VPC-A\"] --> TGW[\"Transit Gateway\"]\n  TGW --> RTA[\"A 专用路由表\"]\n  RTA -->|\"允许\"| B[\"授权 VPC-B\"]\n  RTA -.->|\"无路由\"| C[\"未授权 VPC-C\"]\n  C -.-> ISO[\"被隔离\"]"
  },
  "280": {
    "blocker": "原本 Windows 桌面应用装在员工 Windows 机。并购后有大量 Linux 使用者，要搬上 AWS 且要验证；地端有 AD，希望少改程式。",
    "requirements": "重托管到 AWS、Windows／Linux 使用者都能用、要认证、开发量最少。",
    "steps": [
      "用 AppStream 2.0 Image Builder（应用串流映像制作）把桌面应用打进映像。",
      "建 On-Demand Fleet，必要时动态 Auto Scaling。",
      "用 AppStream 使用者池（或整合 AD）做登入验证。",
      "员工用浏览器开串流工作阶段跑应用，不必本机安装 Windows 版。"
    ],
    "solutions": "正确答案 C。AppStream 专攻「把既有桌面应用串流出去」，开发量最小。WorkSpaces 是整台桌面较重；EC2+RDP Linux 难用；重构成 Web 开发最大。",
    "result_flow": "员工浏览器登入 AppStream → 验证通过 → 串流到含应用的映像执行个体 → 操作桌面应用 → 无需本机 Windows 安装或大改程式。",
    "options": {
      "A": "错。WorkSpaces 每人一台虚拟桌面，成本与管理重，过度。",
      "B": "错。EC2+RDP 要管桌面机群，Linux 使用者体验差。",
      "C": "✓ 正确。AppStream 2.0 串流应用，开发量最少。",
      "D": "错。重构容器 Web 化开发最大，违反 LEAST development effort。"
    },
    "diagram_before": "flowchart TB\n  WIN[\"Windows 员工本机\"] --> APP[\"桌面应用\"]\n  LIN[\"Linux 使用者\"] -.-> X{{\"装不了 Windows 版\"}}\n  AD[\"地端 AD 验证\"]\n  X2{{\"要上云、要验证<br/>少改程式\"}}\n  APP -.-> X2\n  AD -.->|存在但未接上| X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n  style X2 fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  USER[\"员工浏览器\"] --> AS[\"AppStream 2.0\"]\n  AS --> AUTH[\"使用者池 / AD 验证\"]\n  AUTH --> IMG[\"含应用的映像\"]\n  IMG --> STREAM[\"串流桌面应用\"]\n  STREAM --> OK[\"无需本机 Windows 安装\"]"
  },
  "281": {
    "blocker": "IoT 资料以 ORC 存在常驻 EMR（大数据丛集）HDFS，用 Presto SQL 查；查询 <15 分钟且只在 5–10 PM，但 24/7 丛集很贵。",
    "requirements": "能跑 SQL、最省成本、符合现有查询时间型态。",
    "steps": [
      "把资料放到 S3，不必养常驻 HDFS。",
      "用 Glue Data Catalog（资料目录：表格／栏位中继资料）登录 schema。",
      "用 Athena（对 S3 直接跑 SQL、按扫描量计费）查询。",
      "仅在查询时付费，离峰不付丛集费。"
    ],
    "solutions": "正确答案 B。间歇 SQL 首选 S3+Glue+Athena。Redshift／Spectrum 要丛集成本；继续 EMR+Presto 省不了多少；整库进 Redshift 更不划算。",
    "result_flow": "IoT／批次写入 ORC 到 S3 → Glue Catalog 描述表 → 分析师 5–10 PM 用 Athena SQL → 按扫描付费 → 无需 24/7 EMR。",
    "options": {
      "A": "错。Redshift Spectrum 仍常伴随著 Redshift 丛集成本。",
      "B": "✓ 正确。S3 + Glue + Athena 最符合间歇查询成本模型。",
      "C": "错。EMRFS+Presto 仍要 EMR 丛集。",
      "D": "错。资料全进 Redshift 持续计费，不适合每天只查几小时。"
    },
    "diagram_before": "flowchart TB\n  IOT[\"IoT ORC 资料\"] --> HDFS[\"常驻 EMR HDFS\"]\n  HDFS --> PRE[\"Presto SQL\"]\n  ANA[\"分析师 5–10 PM 才查\"] --> PRE\n  X{{\"24/7 丛集很贵<br/>查询其实很短\"}}\n  HDFS -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  IOT[\"IoT/批次\"] --> S3[\"S3 存 ORC\"]\n  S3 --> GLUE[\"Glue Data Catalog\"]\n  ANA[\"分析师 5–10 PM\"] --> ATH[\"Athena SQL\"]\n  ATH --> GLUE\n  ATH --> S3\n  ATH -.-> PAY[\"按扫描付费\"]"
  },
  "282": {
    "blocker": "Organizations 多帐户 RDS／DynamoDB 费用突然升高；标签策略不一致，财务看不到 cost center、project ID；基础设施虽多用 CloudFormation，但旧资源与未来建立都要管。",
    "requirements": "现有资源补标、启用成本分摊标签、未来强制标签，提升帐单可见性。",
    "steps": [
      "用 Tag Editor 帮现有 RDS／DynamoDB 补上 cost center、project ID。",
      "启用 Cost Allocation Tags（成本分配标签）让帐单维度出现。",
      "用 SCP 拒绝建立没有这两个标签的资源。",
      "之后新资源必须带标，旧资源也可在 Cost Explorer 分析。"
    ],
    "solutions": "正确答案 C。补标 + 成本标签 + SCP 预防形成闭环。只补标不够；Lambda 每小时补标是事后；只改 federated IAM 难覆盖所有建立路径。",
    "result_flow": "旧资源 Tag Editor 补标 → 帐单出现 project／cost center → 新建立请求若缺标被 SCP 拒绝 → 财务可用 Cost Explorer 依专案收费。",
    "options": {
      "A": "错。只标记现有、无预防，未来仍会出现未标资源。",
      "B": "错。每小时 Lambda 补标营运重，且是事后。",
      "C": "✓ 正确。现有补标 + Cost Allocation Tags + SCP 强制。",
      "D": "错。仅更新联邦角色权限无法跨帐户全面强制。"
    },
    "diagram_before": "flowchart TB\n  ACC[\"多帐户\"] --> RDS[\"RDS / DynamoDB\"]\n  RDS --> BILL[\"费用突然升高\"]\n  TAG[\"标签不一致\"]\n  X{{\"财务看不到<br/>cost center / project\"}}\n  TAG -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  OLD[\"旧资源\"] --> TE[\"Tag Editor 补标\"]\n  TE --> CE[\"Cost Explorer 可依专案看\"]\n  NEW[\"新建资源\"] --> SCP[\"SCP 缺标就拒\"]\n  SCP --> OK[\"强制 cost center<br/>+ project ID\"]\n  OK --> CE"
  },
  "283": {
    "blocker": "地端要把资料送到三个不同帐户的 S3，不能走公网；目前没有专线。",
    "requirements": "私有连线到 AWS；私有路径写入 S3；架构可服务多帐户桶。",
    "steps": [
      "建 networking 帐户与私有 VPC。",
      "拉 Direct Connect（专线）并建 Private VIF（私有虚拟介面：进 VPC 私网）。",
      "在 networking VPC 建 S3 Gateway Endpoint。",
      "依需要把路径／权限接到各帐户的 S3（题库两步骤重点在 Private VIF + Gateway Endpoint）。"
    ],
    "solutions": "正确答案 A、D。Private VIF 进私网；S3 Gateway Endpoint 让 VPC 内流量私有到 S3。Public VIF 偏公有服务路径；Interface Endpoint 较贵；只靠乱 peer 各帐户不一定最简。",
    "result_flow": "地端 → Direct Connect Private VIF → networking 私有 VPC → S3 Gateway Endpoint → 目标帐户 S3（私有路径，不经网际网路）。",
    "options": {
      "A": "✓ 正确。Networking 帐户 + Private VIF 建立私有专线入口。",
      "B": "错。Public VIF 不适合「完全私有到 S3」这条要求主路径。",
      "C": "Interface Endpoint 可连 S3 但成本通常高于 Gateway。",
      "D": "✓ 正确。S3 Gateway Endpoint 私有、无按小时 ENI 费。",
      "E": "与各 S3 帐户 VPC peering 复杂度高，非题库正确组合。"
    },
    "diagram_before": "flowchart TB\n  OP[\"地端资料\"] -.-> X{{\"要送三帐户 S3<br/>不能走公网\"}}\n  A[\"帐户 A S3\"]\n  B[\"帐户 B S3\"]\n  C[\"帐户 C S3\"]\n  NO[\"目前没有专线\"]\n  A -.->|未接通/未生效| B\n  B -.->|存在但未接上| X\n  C -.->|存在但未接上| X\n  NO -.->|存在但未接上| X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  OP[\"地端\"] --> DX[\"Direct Connect<br/>Private VIF\"]\n  DX --> VPC[\"Networking 私有 VPC\"]\n  VPC --> GW[\"S3 Gateway Endpoint\"]\n  GW --> S3[\"各目标帐户 S3\"]\n  GW -.-> PRIV[\"全程私有路径\"]"
  },
  "284": {
    "blocker": "速食点餐后端用 DynamoDB，固定 provisioned 10 万 RCU／8 万 WCU 撑每天 4 小时高峰，其余时间很低，钱与人手都痛。",
    "requirements": "降成本、营运负担低，仍撑得住可预期高峰。",
    "steps": [
      "维持 provisioned 模式（可预期尖峰通常比 on-demand 好控成本）。",
      "开启 DynamoDB Auto Scaling（自动依用量调 RCU／WCU）。",
      "设定目标利用率与上下限，涵盖高峰但不整天顶配。",
      "观察尖峰是否被限流，再微调上下限。"
    ],
    "solutions": "正确答案 C。Auto Scaling 随尖峰升降。手动砍容量会爆；On-demand 在高度可预期尖峰往往更贵；Reserved 锁容量难跟离峰缩。",
    "result_flow": "离峰低用量 → Auto Scaling 调降 RCU／WCU → 每日 4 小时尖峰 → 自动升容量 → 过后再降 → 帐单贴近实际，又少人手。",
    "options": {
      "A": "错。固定砍容量无法应对每日高峰，可能 Throttling。",
      "B": "错。On-demand 在此可预期尖峰场景通常更贵。",
      "C": "✓ 正确。Provisioned + Auto Scaling 最划算且省事。",
      "D": "错。预留容量锁高峰，离峰浪费。"
    },
    "diagram_before": "flowchart TB\n  APP[\"点餐后端\"] --> DDB[\"DynamoDB\"]\n  DDB --> FIX[\"固定 10万 RCU<br/>8万 WCU\"]\n  PEAK[\"每日仅 4 小时高峰\"]\n  X{{\"离峰也顶配<br/>钱与人手都痛\"}}\n  FIX -.-> X\n  PEAK -.->|存在但未接上| X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  APP[\"点餐后端\"] --> DDB[\"DynamoDB provisioned\"]\n  DDB --> AS[\"Auto Scaling\"]\n  AS -->|离峰| LOW[\"调降 RCU/WCU\"]\n  AS -->|尖峰 4h| HIGH[\"自动升容量\"]\n  HIGH --> LOW"
  },
  "285": {
    "blocker": "部落格用 API Gateway + DynamoDB + Lambda，留言区很热闹，但现况偏请求／轮询，留言无法「即时跳出来」，体验差。",
    "requirements": "降低留言延迟、提升即时互动体验。",
    "steps": [
      "引入 AppSync（托管 GraphQL，原生支援订阅）。",
      "留言用 WebSocket 订阅推给在线客户端。",
      "新留言写入后透过订阅通道推播。",
      "前端改为订阅更新，不必狂轮询 GET。"
    ],
    "solutions": "正确答案 C。即时互动要用推送。CloudFront 快取反而可能看旧资料；10 秒轮询又慢又耗；改 Lambda 并发不解决「即时推送」。",
    "result_flow": "使用者 A 发留言 → AppSync 写入后端 → WebSocket 订阅推给使用者 B／C → 画面即时更新。",
    "options": {
      "A": "错。CDN 快取 API 不利即时留言。",
      "B": "错。轮询延迟高、增加负载。",
      "C": "✓ 正确。AppSync + WebSocket 订阅即时推送。",
      "D": "错。并发设定与即时推送模型无关。"
    },
    "diagram_before": "flowchart TB\n  U[\"留言使用者\"] --> API[\"API Gateway\"]\n  API --> L[\"Lambda\"]\n  L --> DDB[\"DynamoDB\"]\n  X{{\"要轮询才看到<br/>留言无法即时跳出\"}}\n  U -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  A[\"使用者 A 发留言\"] --> AS[\"AppSync\"]\n  AS --> DDB[\"写入后端\"]\n  AS -->|\"WebSocket 订阅\"| B[\"使用者 B/C\"]\n  B --> UI[\"画面即时更新\"]\n  AS --> SUB[\"订阅通道推播\"]"
  },
  "286": {
    "blocker": "数百帐户开始让产品团队自建 S3 Access Point（存取点：另开一组受控进入 S3 的端点），但规定只能从 VPC 内存取、不能从网际网路；要最省营运。",
    "requirements": "全组织强制 Access Point 网路来源必须是 VPC；一次管全部帐户。",
    "steps": [
      "在 Organizations root 建 SCP。",
      "Deny s3:CreateAccessPoint，除非条件 s3:AccessPointNetworkOrigin = VPC。",
      "SCP 自动套到所有成员帐户。",
      "产品团队建 Access Point 时若选网际网路来源会直接失败。"
    ],
    "solutions": "正确答案 B。组织层 SCP 一次到位。资源政策管的是用、不是建；StackSets 铺 IAM 很累；Bucket policy 也控不好 CreateAccessPoint 全局行为。",
    "result_flow": "任一帐户呼叫 CreateAccessPoint → SCP 检查 NetworkOrigin → 非 VPC 拒绝 → 仅 VPC 来源 Access Point 可建立 → 全组织一致。",
    "options": {
      "A": "错。Access Point 资源政策无法有效挡住「建立」行为本身的组织级要求。",
      "B": "✓ 正确。Root SCP 预防性控制，营运最低。",
      "C": "错。StackSets 逐帐户 IAM 维护成本高。",
      "D": "错。Bucket policy 不是管全组织 CreateAccessPoint 的正确层级。"
    },
    "diagram_before": "flowchart TB\n  TEAM[\"产品团队\"] --> AP[\"自建 S3 Access Point\"]\n  AP --> NET[\"可能从网际网路\"]\n  ACC[\"数百帐户\"]\n  X{{\"要强制只能 VPC 来源<br/>营运要最省\"}}\n  AP -.-> X\n  ACC -.->|存在但未接上| X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  TEAM[\"CreateAccessPoint\"] --> SCP[\"组织层 SCP\"]\n  SCP -->|\"NetworkOrigin=VPC\"| OK[\"允许建立\"]\n  SCP -->|\"网际网路来源\"| DENY[\"拒绝\"]\n  OK --> AP[\"VPC-only Access Point\"]\n  SCP --> ALL[\"全组织一致\"]"
  },
  "287": {
    "blocker": "Elastic Beanstalk 要做蓝绿部署：已建好与正式相同的新环境并部好版，但还没切流量。",
    "requirements": "完成蓝绿切换，步骤要对、尽量用平台内建能力。",
    "steps": [
      "确认绿色（新）环境健康、应用版本正确。",
      "在 Beanstalk 对蓝／绿两个环境执行 Swap Environment URLs（交换环境网址）。",
      "验证使用者已打到新环境。",
      "有问题可再 swap 回来快速回滚。"
    ],
    "solutions": "正确答案 B。Beanstalk 内建 Swap URL 就是蓝绿最后一步。手改 Route 53 可以但较绕；换 Launch Configuration 是滚动更新思路。",
    "result_flow": "旧环境（蓝）服务中 → 新环境（绿）就绪 → Swap Environment URLs → CNAME 对调 → 流量到绿 → 蓝保留作回滚。",
    "options": {
      "A": "可行但非 Beanstalk 最直接下一步。",
      "B": "✓ 正确。Swap Environment URLs 是标准完成步骤。",
      "C": "错。那是滚动／组态更新，不是蓝绿切换。",
      "D": "错。手动改 DNS 比内建 swap 麻烦。"
    },
    "diagram_before": "flowchart TB\n  BLUE[\"蓝环境 正式中\"] --> EB[\"Elastic Beanstalk\"]\n  GREEN[\"绿环境 新版就绪\"] --> EB\n  X{{\"还没切流量<br/>不知最后一步\"}}\n  GREEN -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  BLUE[\"蓝 服务中\"] --> SWAP[\"Swap Environment URLs\"]\n  GREEN[\"绿 就绪\"] --> SWAP\n  SWAP --> CNAME[\"CNAME 对调\"]\n  CNAME --> TRAF[\"流量到绿\"]\n  BLUE --> ROLL[\"蓝保留可回滚\"]"
  },
  "288": {
    "blocker": "全球最多约 1 万人上传图片，要叠字后再公开；需要可扩展、非同步处理与 CDN 发布。",
    "requirements": "可扩展上传与处理管线；处理后透过 CloudFront 配信。",
    "steps": [
      "原图上传到 S3，事件通知丢进 SQS。",
      "EC2 工作者从 SQS 拉任务做叠字。",
      "成品写入另一个 S3 bucket。",
      "CloudFront（CDN）Origin 指到成品 S3；依伫列深度扩 EC2。"
    ],
    "solutions": "正确答案 C。S3→SQS→EC2→S3→CloudFront 经典。EFS／共享 EBS 不适大量图片物件；SNS 推送竞争消费不如 SQS；Spot+共享碟可靠度差。",
    "result_flow": "使用者上传 → S3 → 事件入 SQS → EC2 处理叠字 → 成品 S3 → CloudFront 全球配信；伫列变深就加机器。",
    "options": {
      "A": "错。EFS 存海量图片成本高，CloudFront 指单一 EC2 也差。",
      "B": "错。SNS 不适合多工作者可靠拉取；成品放 EFS 不佳。",
      "C": "✓ 正确。S3+SQS+EC2+S3+CloudFront 标准可扩展。",
      "D": "错。共享 EBS+Spot 脆弱，架构复杂。"
    },
    "diagram_before": "flowchart TB\n  U[\"全球上传者\"] --> UP[\"上传图片\"]\n  NEED[\"要叠字再公开\"]\n  X{{\"缺非同步处理<br/>与 CDN 发布架构\"}}\n  UP -.-> X\n  NEED -.->|存在但未接上| X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  U[\"上传\"] --> S3A[\"S3 原图\"]\n  S3A --> SQS[\"SQS 任务\"]\n  SQS --> EC2[\"EC2 叠字\"]\n  EC2 --> S3B[\"S3 成品\"]\n  S3B --> CF[\"CloudFront 全球配信\"]"
  },
  "289": {
    "blocker": "RDS MySQL 在 us-east-1，欧洲客户也要同一份资料、要读写、不能高延迟或过期资料，欧美更新要近即时互看。",
    "requirements": "跨大西洋双向读写、低延迟本地存取、近即时一致。",
    "steps": [
      "在 eu-west-1 建立跨 Region 复本（题库选项叙述为可把写入送回主库的复本设定）。",
      "欧洲部署应用，连当地端点以降低读写延迟。",
      "美国仍连 us-east-1 主库。",
      "两地更新透过复写机制互相可见。"
    ],
    "solutions": "正确答案 B（题库）。选项描述在复本上处理写入并回到 primary。A 要停写升级流程重；C 快照+逻辑复写难即时双向；D 转 Aurora Global 也是常见正解思路，但本题答案键为 B。",
    "result_flow": "欧洲使用者 → eu-west-1 端点读写 → 变更与 us-east-1 同步 → 美国使用者看到更新（反之亦然）→ 双方都走本地端点降延迟。",
    "options": {
      "A": "错。需暂停写入升级，干扰大。",
      "B": "✓ 正确（题库）。跨 Region 复本并让欧洲应用连本地端点。",
      "C": "错。快照+逻辑复写难达双向即时。",
      "D": "Aurora Global + write forwarding 概念接近，但非本题正确选项。"
    },
    "diagram_before": "flowchart TB\n  US[\"美国客户\"] --> PRI[\"RDS MySQL<br/>us-east-1\"]\n  EU[\"欧洲客户\"] --> PRI\n  X{{\"跨洋延迟高<br/>要本地读写同资料\"}}\n  EU -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  EU[\"欧洲使用者\"] --> REP[\"eu-west-1 复本端点\"]\n  REP -->|\"写入送回\"| PRI[\"us-east-1 Primary\"]\n  US[\"美国使用者\"] --> PRI\n  PRI <-->|\"近即时互看\"| REP\n  APP[\"各地应用连本地端点\"] --> REP"
  },
  "290": {
    "blocker": "SFTP 跑在单台 EC2 + Elastic IP，客户用 EIP 连、SSH 验证，安全群组放行客户 IP。单点故障、要自己顾机器，又不能改客户连线方式。",
    "requirements": "提高可用、少管基础设施、少打扰客户；连线方式（EIP、SSH、IP 限制）尽量不变。",
    "steps": [
      "从 EC2 解除 Elastic IP。",
      "建 S3 当档案后端，同步旧 SFTP 档案。",
      "建 AWS Transfer Family（托管 SFTP）VPC 托管、面向网际网路的端点。",
      "把原 EIP 绑到新端点，并挂上原客户 IP 安全群组。"
    ],
    "solutions": "正确答案 B。VPC-hosted internet-facing 才能绑 EIP 与安全群组。纯 public endpoint 难套同一套 SG；自建 Fargate/NLB/ASG 太重。",
    "result_flow": "客户仍连同一 EIP → Transfer Family 端点 → 验证 SSH → 读写 S3 档案；无单台 EC2 维护。",
    "options": {
      "A": "错。Public endpoint 不易沿用客户 IP 安全群组模型。",
      "B": "✓ 正确。VPC 端点 + EIP + SG + S3 后端。",
      "C": "错。自建 Fargate SFTP 营运重。",
      "D": "错。Multi-attach EBS + ASG 自建高可用更重。"
    },
    "diagram_before": "flowchart TB\n  CLI[\"客户\"] --> EIP[\"Elastic IP\"]\n  EIP --> EC2[\"单台 EC2 SFTP\"]\n  EC2 --> DISK[\"本机/磁碟档案\"]\n  SG[\"安全群组放行客户 IP\"]\n  X{{\"单点故障<br/>要自己顾机器\"}}\n  EC2 -.-> X\n  SG -.->|存在但未接上| X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  CLI[\"客户连同一 EIP\"] --> TF[\"Transfer Family<br/>VPC 托管端点\"]\n  TF --> AUTH[\"SSH 验证\"]\n  AUTH --> S3[\"读写 S3\"]\n  SG[\"原客户 IP 安全群组\"] --> TF\n  TF -.-> HA[\"无单台 EC2 维护\"]"
  },
  "291": {
    "blocker": "串流行情 24/7 用 RI EC2 收进本机 EBS，夜间 4 小时统计不关键、失败可下轮再算；RI 快到期，要重新评估成本。",
    "requirements": "最省钱；撷取稳定；夜间批次可中断重来。",
    "steps": [
      "撷改用 Kinesis Data Firehose（托管串流投递）直接存 S3。",
      "夜间用 AWS Batch（批次运算服务）跑统计。",
      "Batch 运算用 Spot（抢用闲置容量、便宜，可被回收）并设最高价例如 On-Demand 50%。",
      "不再养 24/7 撷取机群与 NFS 共享。"
    ],
    "solutions": "正确答案 B。Firehose 按量；非关键批次用 Spot 最省。A 用 On-Demand 批次较贵；C 仍 24/7 EC2；D Redshift+Lambda 过重。",
    "result_flow": "行情 → Firehose → S3 → 夜间 Batch Spot 读 S3 算统计 → 完成即结束；失败下一轮再跑。",
    "options": {
      "A": "错。夜间全 On-Demand 未吃到 Spot 折扣。",
      "B": "✓ 正确。Firehose + Batch Spot 成本最优。",
      "C": "错。保留 24/7 撷取 RI／NLB 没必要。",
      "D": "错。Redshift 对此非关键统计过贵。"
    },
    "diagram_before": "flowchart TB\n  TICK[\"串流行情 24/7\"] --> EC2[\"RI EC2\"]\n  EC2 --> EBS[\"写入本机 EBS\"]\n  NIGHT[\"夜间 4h 统计<br/>失败可下轮再算\"]\n  X{{\"RI 快到期<br/>常驻成本不划算\"}}\n  EC2 -.-> X\n  NIGHT -.->|存在但未接上| X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  TICK[\"行情串流\"] --> FH[\"Kinesis Firehose\"]\n  FH --> S3[\"S3\"]\n  S3 --> BATCH[\"夜间 Batch\"]\n  BATCH --> SPOT[\"Spot 算统计\"]\n  SPOT -.-> DONE[\"完成即结束\"]"
  },
  "292": {
    "blocker": "地端 Linux VM 跑 SFTP，档案用 NFS 给下游；要迁 AWS、高可用、给外部厂商一组可白名单的静态公网 IP；已有 Direct Connect。",
    "requirements": "高可用 SFTP、静态公网 IP、下游仍像 NFS 取档、营运负担最低。",
    "steps": [
      "建 Transfer Family，使用 internet-facing VPC endpoint。",
      "每个子网指定 Elastic IP（固定公网 IP 给厂商白名单）。",
      "档案落到 Multi-AZ 的 EFS（弹性档案系统，NFS 相容）。",
      "下游应用改 mount EFS，取代旧 NFS。"
    ],
    "solutions": "正确答案 A。VPC endpoint 才能配每子网 EIP；纯 public endpoint 做不到这组静态 IP 需求。MGN 搬单机无高可用；FSx Lustre 不是这题 NFS 首选。",
    "result_flow": "厂商 SFTP → 静态 EIP → Transfer Family → 写入 EFS → 下游 NFS 协定挂 EFS 读档；跨 AZ 高可用。",
    "options": {
      "A": "✓ 正确。Transfer Family VPC 端点 + EIP + EFS。",
      "B": "错。Public endpoint 无法为各子网配一组可白名单 EIP 模型。",
      "C": "错。单一 EC2 仍是单点。",
      "D": "错。MGN 不能直接变成 Transfer Family；FSx Lustre 非本题最佳。"
    },
    "diagram_before": "flowchart TB\n  VEN[\"外部厂商\"] --> SFTP[\"地端 Linux SFTP\"]\n  SFTP --> NFS[\"NFS 给下游\"]\n  DOWN[\"下游应用\"] --> NFS\n  X{{\"要迁 AWS、HA<br/>还要静态公网 IP\"}}\n  SFTP -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  VEN[\"厂商 SFTP\"] --> EIP[\"静态 EIP\"]\n  EIP --> TF[\"Transfer Family<br/>VPC endpoint\"]\n  TF --> EFS[\"EFS Multi-AZ\"]\n  DOWN[\"下游 NFS 挂载\"] --> EFS\n  EFS -.-> HA[\"跨 AZ 高可用\"]"
  },
  "293": {
    "blocker": "VPC 10.0.0.0/23 切成两个 /24 给 AZ1／AZ2，ASG max 20，已接 on-premises 不能中断。Region 新开第三 AZ，但不能加新 IPv4 空间、不能停机。",
    "requirements": "用现有 CIDR 重划出三个子网；ASG 覆盖三 AZ；零停机。",
    "steps": [
      "先把 ASG 暂时只跑在 AZ2，清空 AZ1 依赖。",
      "删除并用「一半旧空间」重建 AZ1 子网，ASG 再纳入新 AZ1。",
      "健康后改只跑 AZ1，释放并重划 AZ2 空间。",
      "用剩余空间建 AZ3 子网，最后 ASG 同时挂三个新子网。"
    ],
    "solutions": "正确答案 A。子网 CIDR 不能直接「缩小改」；要先迁走实例再删建。B 直接砍 AZ1 会中断；C 新 VPC 影响连线；D 假设可原地改 CIDR 不可行。",
    "result_flow": "流量集中 AZ2 → 重划 AZ1 → 双 AZ 轮替重划 → 建立 AZ3 → ASG 三 AZ 运作；VPN／既有 VPC CIDR 不变。",
    "options": {
      "A": "✓ 正确。滚动重划子网 + 轮替 ASG，零停机。",
      "B": "错。直接终止 AZ1 实例造成中断。",
      "C": "错。新 VPC 要重做连线，风险大。",
      "D": "错。不能对使用中子网直接改 CIDR。"
    },
    "diagram_before": "flowchart TB\n  VPC[\"VPC 10.0.0.0/23\"] --> AZ1[\"AZ1 /24\"]\n  VPC --> AZ2[\"AZ2 /24\"]\n  ASG[\"ASG max 20\"] --> AZ1\n  ASG --> AZ2\n  X{{\"新开第三 AZ<br/>不能加 IPv4、不能停机\"}}\n  VPC -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  STEP1[\"流量集中 AZ2\"] --> STEP2[\"重划 AZ1 子网\"]\n  STEP2 --> STEP3[\"轮替重划 AZ2\"]\n  STEP3 --> AZ3[\"用剩余空间建 AZ3\"]\n  AZ3 --> ASG[\"ASG 三 AZ 运作\"]\n  ASG -.-> SAME[\"VPC CIDR 不变\"]"
  },
  "294": {
    "blocker": "全部基础设施用 CloudFormation；财务要依 project 标签 chargeback，但 Cost Explorer 看到不合规 project 值；要强制新资源遵守，工作量最小。",
    "requirements": "强制 project 标签（允许值清单）；新资源合规；LEAST effort。",
    "steps": [
      "在管理帐户建立 Tag Policy，列出允许的 project 值。",
      "建立 SCP：若无 project 标签则拒绝 cloudformation:CreateStack。",
      "把 SCP 挂到各 OU。",
      "之后不合规堆叠建立会被挡。"
    ],
    "solutions": "正确答案 A。Tag Policy 在管理帐户集中定义；SCP 挡 CreateStack。B 在各 OU 各建 Tag Policy 易不一致；C IAM 难组织级强制；D 全改 Service Catalog 工作量大。",
    "result_flow": "开发者 CloudFormation CreateStack → SCP 检查 project 标签 → Tag Policy 约束允许值 → 合规才建得成 → 财务依标签 chargeback。",
    "options": {
      "A": "✓ 正确。管理帐户 Tag Policy + SCP，工作量最小。",
      "B": "错。Tag Policy 应集中在管理帐户，不要每 OU 各搞一套为主。",
      "C": "错。逐使用者 IAM 难覆盖且可被绕过。",
      "D": "错。全面改 Service Catalog 产品化，effort 大。"
    },
    "diagram_before": "flowchart TB\n  DEV[\"开发者\"] --> CFN[\"CloudFormation\"]\n  CFN --> RES[\"资源 project 标签乱\"]\n  FIN[\"财务 Cost Explorer\"]\n  X{{\"不合规 project 值<br/>无法可靠 chargeback\"}}\n  RES -.-> X\n  FIN -.->|存在但未接上| X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  DEV[\"CreateStack\"] --> SCP[\"SCP 检查 project 标签\"]\n  SCP --> TP[\"Tag Policy 约束允许值\"]\n  TP -->|合规| OK[\"堆叠建立成功\"]\n  TP -->|不合规| DENY[\"拒绝建立\"]\n  OK --> FIN[\"财务依标签 chargeback\"]"
  },
  "295": {
    "blocker": "ASG 只用一种偏大的实例类型，CPU／记忆体长期偏低，钱浪费；希望永久降成本，未来少改设定。",
    "requirements": "永久降 EC2 成本、提高利用率、未来设定变更最少。",
    "steps": [
      "依监控的 CPU／记忆体选真正符合需求的实例类型。",
      "更新 ASG／启动范本，加入新类型。",
      "移除旧的过大类型。",
      "让实例汰换后长期跑在合适规格。"
    ],
    "solutions": "正确答案 B。先「对症选型」再替换，最直接。混多种相似类型增加复杂；Launch Template 不能只写 CPU／记忆体就自动选型；Price List 脚本持续维护重。",
    "result_flow": "分析利用率 → 选定合适实例类型 → 更新 ASG → 旧大机汰换成新类型 → 成本下降且设定单纯。",
    "options": {
      "A": "错。无谓混合多类型增加未来变更面。",
      "B": "✓ 正确。依利用率换对类型，一劳永逸。",
      "C": "错。不能只填 CPU／记忆体需求就自动选型。",
      "D": "错。脚本动态选型持续维护多。"
    },
    "diagram_before": "flowchart TB\n  ASG[\"ASG\"] --> BIG[\"单一偏大实例类型\"]\n  BIG --> LOW[\"CPU/记忆体长期偏低\"]\n  X{{\"钱浪费<br/>设定又想保持单纯\"}}\n  LOW -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  MON[\"分析利用率\"] --> TYPE[\"选定合适实例类型\"]\n  TYPE --> UPD[\"更新 ASG / 启动范本\"]\n  UPD --> SWAP[\"汰换旧大机\"]\n  SWAP --> SAVE[\"成本下降且设定单纯\"]"
  },
  "296": {
    "blocker": "ECS + API Gateway 应用，资料在 Aurora 与 DynamoDB，用 CloudFormation／CodePipeline 部署；要 DR，RPO 2 小时、RTO 4 小时，尽量省钱。",
    "requirements": "跨 Region DR 达 RPO／RTO；成本效益佳。",
    "steps": [
      "Aurora 用 Global Database 复写到次要 Region。",
      "DynamoDB 用 Global Tables 多 Region 复写。",
      "两 Region 都建 Regional API Gateway。",
      "CloudFront 设 origin failover，灾难时流量切次要 Region。"
    ],
    "solutions": "正确答案 A。托管全球复写 + CloudFront failover，营运与 RTO 较友善。B 自建 DMS／Stream 重；C Backup 还原可能达不到 RTO；D 用 Route 53 也可，但本题键为 A（CloudFront failover）。",
    "result_flow": "主 Region 服务 → DB 持续复写到备援 → 主故障 → CloudFront 侦测 origin 失败 → 切到备援 Region API → 读写已复写的 Global DB／Tables。",
    "options": {
      "A": "✓ 正确。Global DB/Tables + CloudFront origin failover。",
      "B": "错。自建复写链营运重。",
      "C": "错。Backup／还原难稳达 2h RPO／4h RTO。",
      "D": "Route 53 failover 可行，但非本题正确选项。"
    },
    "diagram_before": "flowchart TB\n  API[\"API Gateway\"] --> ECS[\"ECS 应用\"]\n  ECS --> AUR[\"Aurora\"]\n  ECS --> DDB[\"DynamoDB\"]\n  X{{\"单 Region<br/>要省钱做 DR\"}}\n  API -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  PRI[\"主 Region API\"] --> GDB[\"Aurora Global DB\"]\n  PRI --> GT[\"DynamoDB Global Tables\"]\n  CF[\"CloudFront\"] -->|正常| PRI\n  CF -->|origin 失败| SEC[\"备援 Region API\"]\n  SEC --> GDB\n  SEC --> GT"
  },
  "297": {
    "blocker": "CloudFront 快取命中率一直掉；同一页 query string 参数顺序乱、大小写混用，被当成不同快取键。",
    "requirements": "尽快提高 cache hit ratio。",
    "steps": [
      "写 Lambda@Edge（边缘执行的小函数）在 Viewer Request 触发。",
      "把 query 参数依名称排序。",
      "全部转小写，统一快取键。",
      "部署后观察命中率回升。"
    ],
    "solutions": "正确答案 A。在边缘正规化最快速。关 query 快取会更差；后端反向代理慢且重；CloudFront 没有「忽略大小写 query」开关。",
    "result_flow": "浏览器请求（乱序／混大小写 query）→ Lambda@Edge 正规化 → CloudFront 用统一键找快取 → 命中率上升、源站压力下降。",
    "options": {
      "A": "✓ 正确。Viewer Request 排序并小写化参数。",
      "B": "错。停用 query 快取通常更伤命中率。",
      "C": "错。多一层 proxy，慢且复杂。",
      "D": "错。无此内建 casing-insensitive 设定。"
    },
    "diagram_before": "flowchart TB\n  B1[\"请求 ?a=1&b=2\"] --> CF[\"CloudFront\"]\n  B2[\"请求 ?B=2&A=1\"] --> CF\n  CF --> ORIG[\"源站\"]\n  X{{\"query 乱序/大小写<br/>快取键不同命中率掉\"}}\n  CF -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  REQ[\"浏览器请求\"] --> EDGE[\"Lambda@Edge<br/>Viewer Request\"]\n  EDGE --> NORM[\"排序+转小写 query\"]\n  NORM --> CF[\"CloudFront 统一快取键\"]\n  CF -->|命中| HIT[\"回快取\"]\n  CF -->|未命中| ORIG[\"源站\"]"
  },
  "298": {
    "blocker": "单 Region 电商 Aurora MySQL 五节点写入很重；要复制到另一 Region 做 DR，RPO 1 小时，要最低成本。",
    "requirements": "跨 Region 可复原、RPO 1 小时、最低成本。",
    "steps": [
      "用 DMS 建 CDC 任务，持续抓 Aurora 变更。",
      "目标写到另一 Region 的 S3（低成本存放复本）。",
      "维持持续复写，落后控制在 1 小时内。",
      "灾难时再从 S3 复原／重建。"
    ],
    "solutions": "正确答案 C。1 小时 RPO 不必上最贵的 Global Database。Backtrack 不是跨 Region DR；关自动备份改自管风险高。",
    "result_flow": "Aurora 持续写入 → DMS CDC → 另一 Region S3 → 保留近 1 小时内变更轨迹 → 灾难时用 S3 资料复原。",
    "options": {
      "A": "错。Global Database 对 1h RPO 往往过贵。",
      "B": "错。Backtrack＋日快照无法达跨 Region 1h RPO。",
      "C": "✓ 正确。DMS CDC 到 S3 成本最低且达 RPO。",
      "D": "错。关自动备份危险，且管理成本高。"
    },
    "diagram_before": "flowchart TB\n  SHOP[\"电商写入很重\"] --> AUR[\"Aurora MySQL<br/>单 Region 五节点\"]\n  NEED[\"要跨 Region DR\"]\n  X{{\"RPO 1 小时<br/>要最低成本\"}}\n  NEED -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  AUR[\"Aurora 持续写入\"] --> DMS[\"DMS CDC\"]\n  DMS --> S3[\"另一 Region S3\"]\n  S3 --> KEEP[\"保留近 1 小时变更\"]\n  KEEP --> DR[\"灾难时从 S3 复原\"]\n  DMS -.-> COST[\"比 Global DB 省\"]"
  },
  "299": {
    "blocker": "多年前架构：单一大型 EC2 跑无状态应用、另一台 EC2 跑 MySQL；CPU 常 100% 卡死；手动修补还造成停机。要高可用、开发时间最少。",
    "requirements": "高可用、自动扩展、减少修补停机；LEAST development time。",
    "steps": [
      "做含 SSM Agent 的新 AMI（机器映像）。",
      "用较小实例组成 ASG，前面加 ALB，依 CPU 扩缩。",
      "资料库迁到 Aurora MySQL（托管、可 Multi-AZ）。",
      "用 SSM 等工具辅助修补，减少登入手修。"
    ],
    "solutions": "正确答案 D。沿用「EC2 网页层 + 关联式 MySQL」思维，改 ASG+ALB+Aurora，开发最少。Lambda／DynamoDB／Neptune／容器化改动都大。",
    "result_flow": "使用者 → ALB → ASG 多台较小 EC2 → Aurora MySQL；CPU 高就加机器；单机挂掉有其他实例与 Multi-AZ 资料库。",
    "options": {
      "A": "错。重写 Lambda + DocumentDB 开发巨大。",
      "B": "错。换小 Graviton 仍要正确 HA；DynamoDB 迁移重。",
      "C": "错。容器化 + Neptune 开发远大于本题。",
      "D": "✓ 正确。ASG+ALB+Aurora，改动最小的高可用路径。"
    },
    "diagram_before": "flowchart TB\n  U[\"使用者\"] --> BIG[\"单一大型 EC2 应用\"]\n  BIG --> MYSQL[\"另一台 EC2 MySQL\"]\n  X{{\"CPU 常 100%<br/>手动修补会停机\"}}\n  BIG -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  U[\"使用者\"] --> ALB[\"ALB\"]\n  ALB --> ASG[\"ASG 多台较小 EC2\"]\n  ASG --> AUR[\"Aurora MySQL\"]\n  ASG -->|CPU 高| SCALE[\"自动加机器\"]\n  AUR -.-> HA[\"Multi-AZ 高可用\"]"
  },
  "300": {
    "blocker": "要迁一堆应用，其中一个依赖很多、对延迟敏感，用自订 IP 协定 port 1000；已装 Application Discovery Agent 收了数月资料，但不知哪些机器要同一波迁移。",
    "requirements": "找出 port 1000 相关相依伺服器，组成同一 move group。",
    "steps": [
      "在 Migration Hub 选应用所在伺服器，看网路关系图。",
      "开启 Athena 探索 Discovery 资料。",
      "查询哪些伺服器在 port 1000 通讯。",
      "回 Migration Hub 依结果建 move group。"
    ],
    "solutions": "正确答案 A。Discovery Agent 资料 + Migration Hub + Athena 是标准相依分析。MGN 是搬迁执行；Network Access Analyzer／另装 CloudWatch Agent 不是此资料路径。",
    "result_flow": "Agent 月累积连线资料 → Migration Hub 视觉化 → Athena 筛 port 1000 → 标记相依主机 → 同一阶段迁移，保留低延迟介面。",
    "options": {
      "A": "✓ 正确。Migration Hub 图 + Athena 查 port 1000 + move group。",
      "B": "错。Application Migration Service 重在搬迁非发现。",
      "C": "错。Network Access Analyzer 用途不同。",
      "D": "错。不必另推 CloudWatch Agent；Discovery 已有资料。"
    },
    "diagram_before": "flowchart TB\n  APP[\"延迟敏感应用\"] --> P1000[\"自订协定 port 1000\"]\n  P1000 --> DEPS[\"多台相依主机\"]\n  AGENT[\"Discovery Agent 已收数月\"]\n  X{{\"不知哪些机器<br/>要同一波迁移\"}}\n  DEPS -.-> X\n  AGENT -.->|存在但未接上| X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  AGENT[\"Discovery Agent 资料\"] --> MH[\"Migration Hub 视觉化\"]\n  MH --> ATH[\"Athena 筛 port 1000\"]\n  ATH --> MARK[\"标记相依主机\"]\n  MARK --> WAVE[\"同一阶段迁移\"]\n  WAVE -.-> LOW[\"保留低延迟介面\"]"
  },
  "301": {
    "blocker": "几百个客户共用一个 Lambda 应用，每家要有不同「一段时间内可呼叫次数」配额，有的要更高配额但更短周期。",
    "requirements": "依客户设定不同 request quota／时间窗；可发 API 金钥给使用者。",
    "steps": [
      "建 API Gateway REST API，代理整合到 Lambda。",
      "为每位客户建 Usage Plan（用量方案：配额与节流）。",
      "在方案里设符合该客户的 request quota。",
      "从方案建立 API Key 发给客户端使用者。"
    ],
    "solutions": "正确答案 A。REST API 的 Usage Plan + API Key 最能做每客户差异化配额。HTTP API 能力较受限；Lambda Alias 并发不是「每客户配额」；ALB+WAF 难精准按客户方案。",
    "result_flow": "客户带 API Key 呼叫 → API Gateway 对照 Usage Plan → 在配额内才转 Lambda → 超额被拒／节流 → 不同客户不同上限。",
    "options": {
      "A": "✓ 正确。REST API + Usage Plan + API Key 标准多租户配额。",
      "B": "错。HTTP API 对 Usage Plan／每客户配额支援不如 REST 完整。",
      "C": "错。Alias 并发不是客户级配额模型。",
      "D": "错。ALB+WAF 难做细致每客户时间窗配额。"
    },
    "diagram_before": "flowchart TB\n  C1[\"客户 A\"] --> L[\"共用 Lambda\"]\n  C2[\"客户 B\"] --> L\n  C3[\"客户 C\"] --> L\n  X{{\"每家配额不同<br/>周期也不同\"}}\n  L -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  CLI[\"客户带 API Key\"] --> APIGW[\"API Gateway REST\"]\n  APIGW --> PLAN[\"Usage Plan 配额\"]\n  PLAN -->|在额度内| L[\"Lambda\"]\n  PLAN -->|超额| THROTTLE[\"拒绝/节流\"]\n  PLAN --> DIFF[\"每客户不同上限\"]"
  },
  "302": {
    "blocker": "120 台各式 OS／自订套件的 VMware VM + 10TB NFS，有 10Gbps Direct Connect，要最快迁完。",
    "requirements": "最短时间完成 VM 与 NFS 资料上云。",
    "steps": [
      "用 Application Migration Service（MGN）连 VMware，持续复写 VM。",
      "建 EFS 承接档案资料。",
      "用 DataSync 经 Direct Connect 把 NFS 拷到 EFS。",
      "切换时启动已复写的测试／正式实例，完成迁移。"
    ],
    "solutions": "正确答案 B。有 10G 专线应最大化线上复写，不必 Snowball 物理运送；手动重建最慢。",
    "result_flow": "VMware → MGN 持续复写到 AWS → NFS → DataSync over DX → EFS → 切换窗口开机验证 → 完成。",
    "options": {
      "A": "错。Export/Import + Snowball 在已有 10G DX 时通常更慢。",
      "B": "✓ 正确。MGN + DataSync over DX 最快。",
      "C": "错。手动重建 120 台最耗时。",
      "D": "错。已有高频宽专线不优先 Snowball。"
    },
    "diagram_before": "flowchart TB\n  VM[\"120 台 VMware\"] --> OS[\"各式 OS/套件\"]\n  NFS[\"10TB NFS\"]\n  DX[\"10Gbps Direct Connect\"]\n  X{{\"要最快迁完\"}}\n  VM -.-> X\n  DX -.->|存在但未接上| X\n  NFS -.->|存在但未接上| X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  VM[\"VMware\"] --> MGN[\"MGN 持续复写\"]\n  MGN --> EC2[\"AWS 实例就绪\"]\n  NFS[\"地端 NFS\"] --> DS[\"DataSync over DX\"]\n  DS --> EFS[\"EFS\"]\n  CUT[\"切换窗口\"] --> EC2\n  CUT --> EFS"
  },
  "303": {
    "blocker": "问卷含敏感栏位，流量经 CloudFront→ALB→ECS 微服务；规定只有 data-handling 微服务能解密，其他服务就算经过也不能看明文。",
    "requirements": "传输路径上敏感栏位加密；仅指定微服务可解密。",
    "steps": [
      "为 data-handling 微服务建立 RSA 金钥对。",
      "公钥上传到 CloudFront。",
      "设定 Field-Level Encryption（栏位级加密）profile／configuration。",
      "挂到对应 cache behavior；私钥只放在 data-handling 服务。"
    ],
    "solutions": "正确答案 B。CloudFront 栏位级加密用非对称：边缘用公钥加密，只有持私钥者能解密。KMS 对称金钥难限制「只有一个微服务」；Lambda@Edge 自管金钥较绕且易用错公／私钥方向。",
    "result_flow": "使用者提交敏感栏位 → CloudFront 用公钥做栏位加密 → 中间微服务只见密文 → data-handling 用私钥解密处理。",
    "options": {
      "A": "错。对称 KMS 金钥难以保证只有单一微服务能解密整条链。",
      "B": "✓ 正确。RSA + Field-Level Encryption 标准解。",
      "C": "错。Lambda@Edge+KMS 难达「仅一服务可解密」模型。",
      "D": "错。用私钥加密方向错误，应公钥加密。"
    },
    "diagram_before": "flowchart TB\n  U[\"问卷提交\"] --> CF[\"CloudFront\"]\n  CF --> ALB[\"ALB\"]\n  ALB --> ECS[\"多个 ECS 微服务\"]\n  X{{\"中间服务也看得到<br/>敏感栏位明文\"}}\n  ECS -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  U[\"敏感栏位\"] --> CF[\"CloudFront<br/>栏位级加密 公钥\"]\n  CF --> MID[\"中间微服务 只见密文\"]\n  MID --> DH[\"data-handling 服务\"]\n  DH --> KEY[\"私钥解密\"]\n  KEY --> PROC[\"处理明文\"]"
  },
  "304": {
    "blocker": "既有 VPC 10.24.34.0/24 用 Route 53 Resolver；新规：DNS 要用 private hosted zone，且有公网 IP 的实例要拿到对应 public hostname。",
    "requirements": "Private Hosted Zone 正确解析；enable 公网主机名；DHCP 用 Amazon 提供的 DNS。",
    "steps": [
      "建立 Private Hosted Zone 并关联此 VPC。",
      "开启 enableDnsSupport 与 enableDnsHostnames。",
      "新建 DHCP option set：domain-name-servers=AmazonProvidedDNS。",
      "把 DHCP option set 关联到 VPC。"
    ],
    "solutions": "正确答案 B。要 Zone 关联 + 两个 DNS 属性都开 + AmazonProvidedDNS。自订 10.24.34.2 不标准；关掉 enableDnsSupport／Hostnames 会破坏需求。",
    "result_flow": "实例向 AmazonProvidedDNS 查询 → Private Hosted Zone 回私有名 → 有公网 IP 者同时取得 public hostname → VPC 内名称解析正确。",
    "options": {
      "A": "错。硬指定 10.24.34.2 非 AmazonProvidedDNS 标准路径。",
      "B": "✓ 正确。Zone 关联 + 双 enable + AmazonProvidedDNS。",
      "C": "错。关闭 enableDnsSupport 会坏 DNS。",
      "D": "错。关闭 enableDnsHostnames 则无 public hostname。"
    },
    "diagram_before": "flowchart TB\n  VPC[\"VPC 10.24.34.0/24\"] --> RES[\"Route 53 Resolver\"]\n  NEED1[\"要 Private Hosted Zone\"]\n  NEED2[\"有公网 IP 要 public hostname\"]\n  X{{\"DNS 属性/关联<br/>尚未就绪\"}}\n  RES -.-> X\n  NEED1 -.->|存在但未接上| X\n  NEED2 -.->|存在但未接上| X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  INST[\"实例查询\"] --> DNS[\"AmazonProvidedDNS\"]\n  DNS --> PHZ[\"Private Hosted Zone\"]\n  PHZ --> PRIV[\"回私有名\"]\n  DNS --> PUB[\"公网 IP → public hostname\"]\n  ATTR[\"DnsSupport+Hostnames 开启\"] --> DNS"
  },
  "305": {
    "blocker": "Redshift 多个 reserved 节点，稽核报告突发大量 CPU 密集唯读复杂查询，但业务要求读写查询都要一直能服务。",
    "requirements": "吸收突发读查询、不挡日常读写、最省成本。",
    "steps": [
      "在 Redshift 开启 Concurrency Scaling（并发扩展：尖峰自动加暂时容量）。",
      "让突发复杂读查询溢到扩展丛集。",
      "主丛集继续服务一般读写。",
      "按实际扩展秒数付费，尖峰过后自动收回。"
    ],
    "solutions": "正确答案 D。Concurrency Scaling 专治突发并发。EMR 卸载重；classic／elastic resize 慢或要介入，不适合「当下爆量」。",
    "result_flow": "日常查询走主丛集 → CPU／并发飙高 → Concurrency Scaling 自动加容量 → 稽核查询跑完 → 扩展结束计费停止。",
    "options": {
      "A": "错。丢 EMR 要另建管线，复杂。",
      "B": "错。Classic resize 慢且影响大。",
      "C": "错。Elastic resize 不如并发扩展贴合突发查询。",
      "D": "✓ 正确。Concurrency Scaling 最省事、按秒计费。"
    },
    "diagram_before": "flowchart TB\n  BI[\"日常读写查询\"] --> RS[\"Redshift<br/>reserved 节点\"]\n  AUD[\"稽核突发<br/>CPU 密集唯读\"] --> RS\n  X{{\"并发爆量时<br/>业务查询被挤爆\"}}\n  AUD -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  BI[\"日常查询\"] --> MAIN[\"主丛集\"]\n  AUD[\"突发稽核查询\"] --> CS[\"Concurrency Scaling\"]\n  CS --> TEMP[\"暂时加容量\"]\n  TEMP --> DONE[\"跑完即收回\"]\n  MAIN --> OK[\"读写持续服务\"]"
  },
  "306": {
    "blocker": "研究中心 1PB 物件在 S3，100 位科学家各有个人资料夹，同属一个 IAM 群组；担心互相偷看，且合规要报告「谁存取了哪个文件」；报告团队 AWS 经验少。",
    "requirements": "个人路径隔离；现成稽核报告；营运负担低。",
    "steps": [
      "IAM 身分政策允许读写，但条件限制 s3 路径前缀必须是 ${aws:username}/。",
      "政策附在科学家 IAM 群组。",
      "开 CloudTrail 记录该桶物件层级事件，输出到另一桶。",
      "用 Athena（SQL 查 S3 日志）产生存取报告。"
    ],
    "solutions": "正确答案 A、B。username 条件做家目录隔离；CloudTrail Data Events + Athena 现成好查。Server Access Logging 较难用；只开 bucket policy 给群组无法分人；CloudWatch 不替代物件级 CloudTrail。",
    "result_flow": "科学家登入 → 只能读写自己前缀 → 每次物件存取进 CloudTrail → Athena 查询出报告给合规。",
    "options": {
      "A": "✓ 正确。${aws:username} 路径隔离。",
      "B": "✓ 正确。CloudTrail 物件事件 + Athena 报告。",
      "C": "Server Access Logging 可做但较不友善，非最佳组合。",
      "D": "错。群组级 bucket policy 无法每人一夹。",
      "E": "错。物件级稽核应走 CloudTrail Data Events 为主。"
    },
    "diagram_before": "flowchart TB\n  SCI[\"100 位科学家\"] --> GRP[\"同一 IAM 群组\"]\n  GRP --> S3[\"1PB S3 个人资料夹\"]\n  X{{\"怕互相偷看<br/>合规要存取报告\"}}\n  S3 -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  SCI[\"科学家\"] --> IAM[\"IAM 限 ${username}/ 前缀\"]\n  IAM --> S3[\"只能读写自己资料夹\"]\n  S3 --> CT[\"CloudTrail 物件事件\"]\n  CT --> ATH[\"Athena 产报告\"]\n  ATH --> COMP[\"给合规团队\"]"
  },
  "307": {
    "blocker": "数百帐户 CI/CD 常推 Docker 映像到 ECR；只要组织内能拉；tagged 全留，untagged 只留最新 5 个；要最低营运。",
    "requirements": "仅 Org 内存取；lifecycle 清 untagged；少维护。",
    "steps": [
      "建私有 ECR repository。",
      "Repository policy 允许必要 ECR 动作，条件 aws:PrincipalOrgID = 公司 Org ID。",
      "加 lifecycle rule：untagged 超过 5 个就删。",
      "CI/CD 继续推 tagged 映像，永久保留策略依规则。"
    ],
    "solutions": "正确答案 A。私有库 + PrincipalOrgID + 原生 lifecycle。公开库不符；Lambda 日清不如 lifecycle；VPC endpoint 不能取代 Org 边界。",
    "result_flow": "组织内帐户推／拉映像 → policy 放行 → 组织外拒绝 → lifecycle 自动清多余 untagged → tagged 保留。",
    "options": {
      "A": "✓ 正确。私有 ECR + Org 条件 + lifecycle。",
      "B": "错。公开库不符合仅组织存取。",
      "C": "错。Lambda 清理增加营运。",
      "D": "错。公开库 + endpoint 仍可能暴露错误模型。"
    },
    "diagram_before": "flowchart TB\n  CICD[\"数百帐户 CI/CD\"] --> ECR[\"推 Docker 映像\"]\n  NEED[\"只要组织内能拉\"]\n  LIFE[\"tagged 全留<br/>untagged 只留 5\"]\n  X{{\"要最低营运治理\"}}\n  ECR -.-> X\n  LIFE -.->|存在但未接上| X\n  NEED -.->|存在但未接上| X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  ORG[\"组织内帐户\"] --> POL[\"ECR 政策<br/>PrincipalOrgID\"]\n  POL --> PULL[\"允许推/拉\"]\n  EXT[\"组织外\"] -.->|拒绝| POL\n  LIFE[\"Lifecycle 规则\"] --> CLEAN[\"清多余 untagged\"]\n  LIFE --> KEEP[\"tagged 全保留\"]"
  },
  "308": {
    "blocker": "RDS 现在每天自动快照留 7 天；要改成每 6 小时、留 30 天；Organizations 多帐户要集中看快照健康，营运要少。",
    "requirements": "频率／保留达标；跨帐户集中监控；LEAST overhead。",
    "steps": [
      "开启 AWS Backup 跨帐户管理。",
      "建 backup plan：每 6 小时、保留 30 天。",
      "给 RDS 打标签，用标签套用备份计划。",
      "在 Backup 主控台集中看各帐户备份状态。"
    ],
    "solutions": "正确答案 A。AWS Backup 跨帐户就是为此。RDS 无「全域快照政策」；StackSets+Lambda 太重；各帐户 DLM 无集中视图。",
    "result_flow": "标签命中 → Backup 每 6 小时快照 RDS → 保留 30 天 → 管理帐户集中看成功率／失败告警。",
    "options": {
      "A": "✓ 正确。Backup 跨帐户 + 标签套用计划。",
      "B": "错。RDS 没有这种跨帐户全域快照政策功能描述。",
      "C": "错。StackSets + Lambda 监控开销大。",
      "D": "错。DLM 逐帐户无集中健康视图；且 DLM 主战场偏 EBS。"
    },
    "diagram_before": "flowchart TB\n  RDS[\"多帐户 RDS\"] --> SNAP[\"每日自动快照 留 7 天\"]\n  NEED[\"要每 6 小时、留 30 天\"]\n  X{{\"缺集中检视<br/>快照健康难管\"}}\n  SNAP -.-> X\n  NEED -.->|存在但未接上| X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  TAG[\"标签命中\"] --> BAK[\"AWS Backup\"]\n  BAK --> SCH[\"每 6 小时快照\"]\n  SCH --> RET[\"保留 30 天\"]\n  BAK --> MGMT[\"管理帐户集中看\"]\n  MGMT --> ALERT[\"成功率/失败告警\"]"
  },
  "309": {
    "blocker": "多帐户有 SCP、资源政策、身分政策、信任政策、工作阶段政策；要让 Account A 的 IAM 使用者能 Assume Role 到 Account B。",
    "requirements": "跨帐户担任角色三个必要设定都齐。",
    "steps": [
      "确认 Account A 的 SCP 允许 sts:AssumeRole（没有被组织拒绝）。",
      "在 Account A 使用者身分政策允许 Assume 目标角色 ARN。",
      "在 Account B 目标角色的 Trust Policy（信任政策）允许该使用者／帐户。",
      "测试 AssumeRole 取得临时凭证。"
    ],
    "solutions": "正确答案 A、C、E。跨帐户 AssumeRole 三角：SCP 不挡、来源 Identity Policy 允许、目标 Trust Policy 信任。资源政策／B 帐户使用者政策／Session+GetSessionToken 不是此场景必要三选。",
    "result_flow": "User@A 呼叫 sts:AssumeRole → SCP 放行 → Identity Policy 放行 → Role@B Trust 放行 → 拿到临时金钥操作 B。",
    "options": {
      "A": "✓ 正确。SCP 必须允许该动作。",
      "B": "错。一般不是靠 resource-based policy 完成 AssumeRole 主路径。",
      "C": "✓ 正确。A 使用者 Identity Policy 要允许。",
      "D": "错。B 使用者政策与此无关。",
      "E": "✓ 正确。B 角色 Trust Policy 必须信任 A。",
      "F": "错。Session policy／GetSessionToken 非必要三步骤。"
    },
    "diagram_before": "flowchart TB\n  UA[\"Account A 使用者\"] -.-> X{{\"要 AssumeRole<br/>到 Account B\"}}\n  POL[\"SCP/身分/信任<br/>政策交错\"]\n  X2{{\"不知哪几层<br/>必须放行\"}}\n  POL -.-> X2\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff\n  style X2 fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  UA[\"User@A\"] --> STS[\"sts:AssumeRole\"]\n  STS --> SCP[\"SCP 放行\"]\n  SCP --> ID[\"A 的 Identity Policy\"]\n  ID --> TRUST[\"B 的 Role Trust\"]\n  TRUST --> TEMP[\"拿到临时金钥操作 B\"]"
  },
  "310": {
    "blocker": "地端档案储存支援 NFS，要备到 S3；5 天后归档；灾难复原可等几天取回，要最便宜。",
    "requirements": "NFS 相容备份路径；5 天后低成本归档；可接受数天取回。",
    "steps": [
      "部署 Storage Gateway File Gateway（档案闸道：NFS／SMB 介面背后是 S3）。",
      "地端把档案写入 File Gateway，进 S3。",
      "设 S3 Lifecycle：5 天后转 Glacier Deep Archive（最冷归档层）。",
      "DR 需要时再发起取回（可等数天）。"
    ],
    "solutions": "正确答案 D。File Gateway + Deep Archive 最贴。Standard-IA 较贵；Volume Gateway 是 iSCSI；Tape Gateway 是虚拟磁带。",
    "result_flow": "地端 NFS 写入 File Gateway → S3 标准层暂存 → 5 天后 Lifecycle 进 Deep Archive → 需要时取回还原。",
    "options": {
      "A": "错。5 天后只到 Standard-IA 不够省。",
      "B": "错。Volume Gateway 不是 NFS 档案介面。",
      "C": "错。Tape Gateway 不是直接 NFS 挂载备份模型。",
      "D": "✓ 正确。File Gateway + Deep Archive 最省。"
    },
    "diagram_before": "flowchart TB\n  OP[\"地端 NFS 档案\"] --> NEED[\"要备到 S3\"]\n  NEED2[\"5 天后归档\"]\n  NEED3[\"灾难可等几天取回\"]\n  X{{\"要最便宜路径\"}}\n  NEED -.-> X\n  NEED2 -.->|存在但未接上| X\n  NEED3 -.->|存在但未接上| X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  NFS[\"地端 NFS\"] --> FG[\"File Gateway\"]\n  FG --> S3[\"S3 标准层暂存\"]\n  S3 --> LC[\"Lifecycle 5 天后\"]\n  LC --> DA[\"Glacier Deep Archive\"]\n  DA --> REST[\"需要时取回还原\"]"
  },
  "311": {
    "blocker": "EC2 负载稳定、Lambda 忽高忽低、还有 MemoryDB for Redis 快取；要压低每月总成本。",
    "requirements": "依各服务用量型态选对的预留／节省方案。",
    "steps": [
      "EC2 稳定用量买 EC2 Instance Savings Plan。",
      "Lambda 买 Compute Savings Plan 覆盖「最低预期」用量。",
      "MemoryDB 买 reserved nodes。",
      "尖峰超出部分维持按需，避免过度承诺。"
    ],
    "solutions": "正确答案 A。分层最准。Reserved concurrency 不是省钱工具；单一 Compute SP 不涵盖 MemoryDB；Compute SP 也盖不住快取节点折扣模型。",
    "result_flow": "稳定 EC2 → Instance SP 折扣；Lambda 基底 → Compute SP；MemoryDB → Reserved nodes；波动尖峰仍按需。",
    "options": {
      "A": "✓ 正确。三种用量对三种折扣工具。",
      "B": "错。Lambda reserved concurrency 非成本优化主手段。",
      "C": "错。MemoryDB 不适合只靠一张 Compute SP 涵盖。",
      "D": "错。Compute SP 不涵盖 MemoryDB 节点。"
    },
    "diagram_before": "flowchart TB\n  EC2[\"EC2 负载稳定\"] --> BILL[\"每月总成本\"]\n  L[\"Lambda 忽高忽低\"] --> BILL\n  MEM[\"MemoryDB Redis\"] --> BILL\n  X{{\"要分层压低成本\"}}\n  BILL -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  EC2[\"稳定 EC2\"] --> ISP[\"Instance Savings Plan\"]\n  L[\"Lambda 基底\"] --> CSP[\"Compute Savings Plan\"]\n  MEM[\"MemoryDB\"] --> RI[\"Reserved nodes\"]\n  ISP --> SAVE[\"分层折扣压低总成本\"]\n  CSP --> SAVE\n  RI --> SAVE"
  },
  "312": {
    "blocker": "线上游戏要在 us-east-1／eu-west-1／ap-southeast-1 全球开，排行榜、库存、活动状态要跨 Region；任一 Region 要能扛总负载；使用者自动连最低延迟区。",
    "requirements": "跨 Region 状态同步、延迟路由、可扩展、营运少。",
    "steps": [
      "每 Region：ASG + NLB 承载游戏伺服器。",
      "Route 53 延迟型路由指到各 Region NLB。",
      "游戏中继资料放 DynamoDB Global Table（多 Region 多主复写）。",
      "ASG 依负载放大，必要时单区可扛全域流量。"
    ],
    "solutions": "正确答案 C。Global Table 适合排行榜／库存这类键值状态。RDS 复本难双向写；自建 DNS／EC2 MySQL 营运重。",
    "result_flow": "玩家 DNS 查询 → Route 53 选最低延迟 Region → NLB → ASG 游戏节点 → 读写 DynamoDB Global Table → 其他 Region 近即时看到状态。",
    "options": {
      "A": "错。RDS 读复本不支援真正全球双向写状态。",
      "B": "错。地理远近路由≠最低延迟；自建 MySQL 复写重。",
      "C": "✓ 正确。Latency 路由 + DynamoDB Global Table + ASG。",
      "D": "错。自建 DNS 判延迟营运高。"
    },
    "diagram_before": "flowchart TB\n  GAME[\"线上游戏\"] --> REG[\"要开三 Region\"]\n  STATE[\"排行榜/库存/活动\"]\n  X{{\"要跨区状态一致<br/>+ 最低延迟连线\"}}\n  STATE -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  P[\"玩家\"] --> R53[\"Route 53 最低延迟\"]\n  R53 --> NLB[\"NLB\"]\n  NLB --> ASG[\"ASG 游戏节点\"]\n  ASG --> GT[\"DynamoDB Global Table\"]\n  GT --> SYNC[\"其他 Region 近即时\"]"
  },
  "313": {
    "blocker": "要用 Marketplace 第三方防火墙检查离开 AWS 的流量，集中放 Shared Services VPC；要同 Region 内可靠、故障切换快。",
    "requirements": "出站流量经防火墙；跨 AZ 高可用；快速 failover。",
    "steps": [
      "在 Shared Services VPC 两个不同 AZ 各部署防火墙 appliance。",
      "建 Gateway Load Balancer（闸道型负载平衡器：专为虚拟网安设备），target group 挂两台防火墙。",
      "建 GWLB Endpoint（VPC 端点）。",
      "路由表把要检查的流量下一跳指到该 endpoint。"
    ],
    "solutions": "正确答案 A、C、F。GWLB+跨 AZ+Endpoint 是虚拟防火墙标准。NLB 不走 GENEVE 检查模型；同 AZ 两台无 AZ 容错；Interface endpoint 用途不同。",
    "result_flow": "业务 VPC 出站 → 路由到 Shared Services → GWLB Endpoint → GWLB → 某 AZ 防火墙检查 → 放行后出网；一 AZ 挂了切另一台。",
    "options": {
      "A": "✓ 正确。两 AZ 各一防火墙。",
      "B": "错。NLB 不是第三方防火墙透明插入首选。",
      "C": "✓ 正确。Gateway Load Balancer。",
      "D": "错。一般 Interface endpoint 模型不对。",
      "E": "错。同 AZ 无跨 AZ 可靠度。",
      "F": "✓ 正确。GWLB Endpoint 当路由下一跳。"
    },
    "diagram_before": "flowchart TB\n  APP[\"业务 VPC 出站流量\"] --> IGW[\"直接出网?\"]\n  NEED[\"Marketplace 防火墙\"]\n  SHARE[\"要集中 Shared Services\"]\n  X{{\"同 Region 可靠<br/>故障切换要快\"}}\n  NEED -.-> X\n  SHARE -.->|存在但未接上| X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  APP[\"业务 VPC\"] --> EP[\"GWLB Endpoint\"]\n  EP --> GWLB[\"Gateway Load Balancer\"]\n  GWLB --> FW1[\"AZ1 防火墙\"]\n  GWLB --> FW2[\"AZ2 防火墙\"]\n  FW1 --> OUT[\"放行后出网\"]\n  FW2 --> OUT"
  },
  "314": {
    "blocker": "旧应用授权档绑网卡 MAC，厂商重发授权要 12 小时；设定档写死资料库静态 IP、不支援 hostname；要在 AWS 做高可用。",
    "requirements": "快速换机仍有合法授权；设定档 IP 可管理更新；HA。",
    "steps": [
      "预先准备一池 ENI（弹性网卡，MAC 固定），向厂商一次申请对应授权。",
      "授权档存 S3。",
      "开机脚本：下载授权 + attach 对应 ENI。",
      "DB IP 放 Systems Manager Parameter Store，脚本写入本机设定档。"
    ],
    "solutions": "正确答案 A、D。ENI 池解决 MAC／授权时效；Parameter Store 避免 AMI 写死 IP。开机才跟厂商要授权等 12 小时不可 HA；授权打进 AMI 不灵活。",
    "result_flow": "ASG 起新实例 → 脚本 attach 预授 ENI → 从 S3 取授权 → 从 Parameter Store 取 DB IP 注入设定 → 服务上线，无需等 12 小时。",
    "options": {
      "A": "✓ 正确。ENI 池 + S3 授权 + bootstrap。",
      "B": "错。授权锁在单一 AMI／实例不灵活。",
      "C": "错。每次跟厂商申请太慢。",
      "D": "✓ 正确。Parameter Store 动态注入 DB IP。",
      "E": "错。AMI 写死 IP 难维护。"
    },
    "diagram_before": "flowchart TB\n  APP[\"旧应用\"] --> MAC[\"授权绑网卡 MAC\"]\n  APP --> IP[\"设定写死 DB 静态 IP\"]\n  VEN[\"厂商重发授权 12h\"]\n  X{{\"无法快速 HA<br/>换机就要等授权\"}}\n  MAC -.-> X\n  VEN -.->|存在但未接上| X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  ASG[\"ASG 起新实例\"] --> ENI[\"attach 预授 ENI\"]\n  ENI --> S3[\"从 S3 取授权\"]\n  ASG --> PS[\"Parameter Store 取 DB IP\"]\n  PS --> CFG[\"注入设定档\"]\n  CFG --> UP[\"服务上线\"]"
  },
  "315": {
    "blocker": "美国销售报表：API Gateway + Lambda + RDS MySQL，前端 S3+CloudFront；要扩到欧洲，>90% 读、要降欧洲下载延迟。欧洲已有 API／Lambda。",
    "requirements": "欧美读多写少；最小化欧洲延迟。",
    "steps": [
      "在欧洲 Region 建 RDS 跨 Region 读复本。",
      "欧洲 API／Lambda 读当地复本。",
      "Route 53 改 latency-based routing 指到最近 Region 的 API。",
      "写入仍回主 Region（读多写少可接受）。"
    ],
    "solutions": "正确答案 C。Read Replica + Latency 路由最贴。DMS full only 不持续；geolocation 不如真实延迟路由精准。",
    "result_flow": "欧洲使用者 → Route 53 选欧区 API → Lambda 读欧区 RDS 复本 → 报表低延迟下载；美国仍走美区。",
    "options": {
      "A": "错。DMS 仅 full load 非持续读复本架构。",
      "B": "错。Geolocation 不如 Latency；虽有 CDC 但路由非最佳。",
      "C": "✓ 正确。跨 Region 读复本 + Latency 路由。",
      "D": "错。Geolocation 非最低延迟最佳。"
    },
    "diagram_before": "flowchart TB\n  US[\"美国\"] --> API[\"API GW + Lambda\"]\n  API --> RDS[\"RDS MySQL 主库\"]\n  FE[\"S3 + CloudFront\"]\n  EU[\"欧洲使用者\"] --> API\n  X{{\"欧洲读延迟高<br/>>90% 是读\"}}\n  EU -.-> X\n  FE -.->|存在但未接上| X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  EU[\"欧洲使用者\"] --> R53[\"Route 53 延迟路由\"]\n  R53 --> EAPI[\"欧区 API + Lambda\"]\n  EAPI --> RR[\"欧区 RDS 读复本\"]\n  US[\"美国\"] --> UAPI[\"美区 API\"]\n  UAPI --> PRI[\"主库 写入\"]"
  },
  "316": {
    "blocker": "CI 要为每个 PR 开短命测试环境（单 EC2 in ASG），要回报结果到地端中央伺服器；已有 TGW + VPN；希望全自动、营运最少。",
    "requirements": "自动建删测试环境；能经 TGW 连地端；LEAST operational overhead。",
    "steps": [
      "建单一测试 VPC，先做好 TGW attachment 与路由。",
      "所有测试环境都部署进这个 VPC。",
      "用 CloudFormation 模板一键起 ASG／EC2 测试机。",
      "测完删堆叠，网路骨干不用每次重做。"
    ],
    "solutions": "正确答案 B。共用 VPC 网路最省事。每环境一 VPC／StackSet、每环境一帐户、或上 EKS 都过重。",
    "result_flow": "PR 触发 CloudFormation → 在共用 VPC 起测试 EC2 → 经 TGW／VPN 回报地端 → 删堆叠释放资源。",
    "options": {
      "A": "错。每 VPC 重复 TGW attachment 营运高。",
      "B": "✓ 正确。单 VPC + CFN 部署测试环境。",
      "C": "错。每环境新帐户过重。",
      "D": "错。EKS 化增加复杂度。"
    },
    "diagram_before": "flowchart TB\n  PR[\"每个 PR\"] --> NEED[\"短命测试 EC2\"]\n  NEED --> RPT[\"要回报地端中央\"]\n  NET[\"已有 TGW + VPN\"]\n  X{{\"要全自动<br/>营运最少\"}}\n  NEED -.-> X\n  NET -.->|存在但未接上| X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  PR[\"PR 触发\"] --> CFN[\"CloudFormation\"]\n  CFN --> VPC[\"共用测试 VPC\"]\n  VPC --> EC2[\"测试 EC2 / ASG\"]\n  EC2 --> TGW[\"TGW / VPN\"]\n  TGW --> OP[\"回报地端\"]\n  CFN --> DEL[\"删堆叠释放\"]"
  },
  "317": {
    "blocker": "Regional API Gateway + Lambda 读外部 vendor API，资料在 DynamoDB Global Table，vendor API key 在 Secrets Manager 且用客户 KMS 金钥加密；目前只单 Region，要 active-active 多 Region，营运少。",
    "requirements": "API／密钥／KMS 都能多 Region 主动-主动。",
    "steps": [
      "多 Region 部署 API，Route 53 自订网域 + multivalue answer 分散流量。",
      "建 KMS multi-Region 客户管理金钥，并在各 Region 建 replica key。",
      "把 Secrets Manager 密钥复写到各 Region，各选对应 KMS key。",
      "各 Region Lambda 读本地密钥与 Global Table。"
    ],
    "solutions": "正确答案 A、B、C。Multivalue + Multi-Region KMS + Secrets 复写。AWS managed key 不能当 multi-Region 客户密钥那套；手动 copy secret 不自动同步；API Gateway 没有一键「单一 API 多 Region 后端」开关。",
    "result_flow": "使用者打自订网域 → Route 53 multivalue 到某 Region API → Lambda 用本地 Secret（对应 MRK）→ 读写 DynamoDB Global Table → 全球 active-active。",
    "options": {
      "A": "✓ 正确。多 Region API + multivalue 路由。",
      "B": "✓ 正确。KMS multi-Region CMK + 各区 replica。",
      "C": "✓ 正确。Secrets 复写并绑各区 KMS。",
      "D": "错。不能把既有 key「转成」正确 multi-Region 模型如描述。",
      "E": "错。手动复制 secret 无自动同步。",
      "F": "错。不存在简单 multi-Region API 开关如选项所述。"
    },
    "diagram_before": "flowchart TB\n  API[\"单 Region API GW\"] --> L[\"Lambda\"]\n  L --> VEN[\"外部 vendor API\"]\n  L --> DDB[\"DynamoDB Global Table\"]\n  SEC[\"Secrets+KMS 只本地\"]\n  X{{\"要 active-active<br/>多 Region 营运少\"}}\n  API -.-> X\n  SEC -.->|存在但未接上| X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  U[\"自订网域\"] --> R53[\"Route 53 multivalue\"]\n  R53 --> API1[\"Region A API\"]\n  R53 --> API2[\"Region B API\"]\n  API1 --> SEC[\"本地 Secret + MRK\"]\n  API1 --> GT[\"DynamoDB Global Table\"]\n  API2 --> GT"
  },
  "318": {
    "blocker": "电商 stateful 网站 + MySQL 全在地端单机；行销要放大流量，迁 AWS 要最高可靠度。",
    "requirements": "应用与资料库高可用；Session 可跨实例；最高 reliability。",
    "steps": [
      "资料库迁 Aurora MySQL。",
      "应用放 ASG + ALB 多实例。",
      "Session 存 ElastiCache for Redis replication group（可复写的记忆体快取）。",
      "去掉单机状态绑定。"
    ],
    "solutions": "正确答案 B。Aurora + Redis 复写组 + ASG/ALB 可靠度最高。Neptune 不适合 session；DocumentDB／Firehose 不对；Memcached 无同等复写持久能力。",
    "result_flow": "使用者 → ALB → 任一 EC2 → Session 读写 Redis 复写组 → 业务资料 Aurora；单节点故障可转移。",
    "options": {
      "A": "错。Neptune 图资料库不适合 session。",
      "B": "✓ 正确。Aurora + Redis RG + ASG/ALB。",
      "C": "错。DocumentDB／Firehose 模型不对。",
      "D": "错。Memcached 可靠性低于 Redis 复写组。"
    },
    "diagram_before": "flowchart TB\n  U[\"电商流量\"] --> MONO[\"地端单机<br/>stateful 网站\"]\n  MONO --> MYSQL[\"本机 MySQL\"]\n  MKT[\"行销要放大流量\"]\n  X{{\"单点、难扩<br/>要最高可靠度上云\"}}\n  MONO -.-> X\n  MKT -.->|存在但未接上| X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  U[\"使用者\"] --> ALB[\"ALB\"]\n  ALB --> ASG[\"ASG 多 EC2\"]\n  ASG --> REDIS[\"ElastiCache Redis<br/>复写组 session\"]\n  ASG --> AUR[\"Aurora MySQL\"]\n  AUR -.-> HA[\"节点故障可转移\"]"
  },
  "319": {
    "blocker": "要给 VPC 内 Windows EC2 安全 RDP；整合地端 AD；连线走网际网路；可建 Site-to-Site VPN；要最省钱。",
    "requirements": "集中身分、RDP 管理、成本最低。",
    "steps": [
      "用 AD Connector 把 IAM Identity Center（SSO）接到地端 AD。",
      "设 permission set，授权使用 Systems Manager。",
      "工程师用 Fleet Manager 浏览器 RDP 进目标机。",
      "减少 Bastion／RD Gateway 常驻 EC2 成本。"
    ],
    "solutions": "正确答案 B。Fleet Manager RDP + Identity Center 最省常驻基础设施。Managed AD+Bastion／RD Gateway 较贵；纯 VPN RDP 不符合「经网际网路连 VPC」的便利模型（题目强调 internet connectivity 到 VPC 场景下的安全远端）。",
    "result_flow": "使用者 AD 身分登入 Identity Center → 取得 SSM／Fleet Manager 权限 → 浏览器 RDP 到 Windows EC2 → 操作过程受集中权限控制。",
    "options": {
      "A": "错。Managed AD + Bastion EC2 成本高。",
      "B": "✓ 正确。Identity Center + AD Connector + Fleet Manager RDP。",
      "C": "错。仅公司网 VPN RDP 不满足题述经网际网路连入的成本／模式要求。",
      "D": "错。RD Gateway 仍要额外基础设施费用。"
    },
    "diagram_before": "flowchart TB\n  ENG[\"工程师\"] --> NEED[\"安全 RDP<br/>Windows EC2\"]\n  AD[\"地端 AD\"]\n  NET[\"连线走网际网路\"]\n  X{{\"要整合 AD<br/>又要最省钱\"}}\n  NEED -.-> X\n  AD -.->|存在但未接上| X\n  NET -.->|存在但未接上| X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  ENG[\"工程师\"] --> IC[\"IAM Identity Center\"]\n  IC --> AD[\"AD Connector 接 AD\"]\n  IC --> SSM[\"Systems Manager 权限\"]\n  SSM --> FM[\"Fleet Manager 浏览器 RDP\"]\n  FM --> EC2[\"Windows EC2\"]"
  },
  "320": {
    "blocker": "稽核发现有 EBS 磁碟未加密；要保证之后新建的都加密，工作量最少。",
    "requirements": "所有新 EBS 预设加密；LEAST effort。",
    "steps": [
      "在帐户所有会用到的 Region 开启 EBS encryption by default。",
      "之后新建 volume／从快照建的预设路径自动加密。",
      "（既有未加密碟需另计划搬迁，本题重点是新磁碟。）"
    ],
    "solutions": "正确答案 D。一键预设加密。EventBridge 删碟危险；Audit Manager 不强制；Config+SSM 补救较重。",
    "result_flow": "开启预设加密 → 任何人建新 EBS → 自动用 KMS 加密存放 → 合规新资源达标。",
    "options": {
      "A": "错。删未加密碟可能误伤资料。",
      "B": "错。Audit Manager 不做强制加密。",
      "C": "错。侦测后自动化较预设加密费工。",
      "D": "✓ 正确。EBS 预设加密最省事。"
    },
    "diagram_before": "flowchart TB\n  AUD[\"稽核\"] --> EBS[\"部分 EBS 未加密\"]\n  NEW[\"之后还会建新磁碟\"]\n  X{{\"要保证新建都加密<br/>工作量最少\"}}\n  EBS -.-> X\n  NEW -.->|存在但未接上| X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  SET[\"各 Region 开<br/>EBS 预设加密\"] --> NEW[\"新建 volume\"]\n  NEW --> KMS[\"自动 KMS 加密\"]\n  SNAP[\"从快照建碟\"] --> KMS\n  KMS --> OK[\"新资源合规达标\"]"
  },
  "321": {
    "blocker": "数百台 Amazon Linux 2 跑模拟，偶需 SSH；政策禁止共用同一 SSH 金钥；所有连线要进 CloudTrail。",
    "requirements": "每连线不重用固定金钥；可稽核；实务可操作。",
    "steps": [
      "实例不预先放长期 SSH 公钥。",
      "启用 EC2 Instance Connect。",
      "工程师 IAM 允许 ec2-instance-connect:SendSSHPublicKey。",
      "从主控台浏览器 SSH；API 呼叫进 CloudTrail。"
    ],
    "solutions": "正确答案 C。Instance Connect 每次推临时公钥。Secrets Manager 仍是「可共享的密钥物料」；SSM 设钥或每日轮替都较绕。",
    "result_flow": "工程师按连线 → SendSSHPublicKey 临时授权 → 浏览器 SSH → CloudTrail 留下纪录 → 连线结束金钥失效。",
    "options": {
      "A": "错。金钥仍可能被多人取用，违「不可同一钥」精神。",
      "B": "错。仍在管理长期钥生命周期。",
      "C": "✓ 正确。Instance Connect 临时钥 + CloudTrail。",
      "D": "错。每日轮替 + 多服务过度复杂。"
    },
    "diagram_before": "flowchart TB\n  FLEET[\"数百台 Amazon Linux 2\"] --> SSH[\"偶需 SSH\"]\n  KEY[\"共用同一 SSH 金钥?\"]\n  X{{\"禁止共用金钥<br/>连线要进 CloudTrail\"}}\n  SSH -.-> X\n  KEY -.->|存在但未接上| X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  ENG[\"工程师连线\"] --> IC[\"EC2 Instance Connect\"]\n  IC --> PUSH[\"SendSSHPublicKey 临时\"]\n  PUSH --> BR[\"浏览器 SSH\"]\n  BR --> CT[\"CloudTrail 留下纪录\"]\n  PUSH -.-> EXP[\"连线结束金钥失效\"]"
  },
  "322": {
    "blocker": "VPC 内行动银行应用要解析地端 AD 网域 DNS；已有 Direct Connect；要最少管理。",
    "requirements": "混合 DNS 解析 AD 名称；LEAST admin overhead。",
    "steps": [
      "建立 Route 53 Resolver endpoints。",
      "加 conditional forwarding rules（条件转发）：AD 命名空间转去地端 DNS。",
      "必要时双向规则覆盖 AWS／地端命名空间。",
      "应用直接用 AD 主机名连后端。"
    ],
    "solutions": "正确答案 C。Resolver 条件转发最省事。自建 EC2 DNS、Private Zone NS 委派、VPC 再架一套 DC 都较重。",
    "result_flow": "VPC 应用查 AD 名称 → Resolver 规则 → DX → 地端 AD DNS → 回传 → 连后端服务。",
    "options": {
      "A": "错。自建 DNS 快取机要维护。",
      "B": "错。Private Zone NS 指向地端不是正确委派模型。",
      "C": "✓ 正确。Resolver 条件转发。",
      "D": "错。VPC 再布 AD DC 成本高。"
    },
    "diagram_before": "flowchart TB\n  APP[\"VPC 行动银行应用\"] --> DNS[\"要解析地端 AD 名\"]\n  DX[\"已有 Direct Connect\"]\n  ADDNS[\"地端 AD DNS\"]\n  X{{\"VPC 还转不过去<br/>要最少管理\"}}\n  DNS -.-> X\n  ADDNS -.->|存在但未接上| X\n  DX -.->|存在但未接上| X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  APP[\"应用查 AD 名称\"] --> RES[\"Route 53 Resolver\"]\n  RES --> RULE[\"条件转发规则\"]\n  RULE -->|DX| ADDNS[\"地端 AD DNS\"]\n  ADDNS --> IP[\"回传位址\"]\n  IP --> APP"
  },
  "323": {
    "blocker": "城市感测器持续丢 JSON，要即时进「不需要固定 schema」的资料库。",
    "requirements": "即时串流 + 弹性 schema 储存。",
    "steps": [
      "感测器资料进 Kinesis Data Streams（即时串流）。",
      "消费者写入 DynamoDB（NoSQL，无固定表格 schema 压力小）。",
      "后续分析／应用再读 DynamoDB。"
    ],
    "solutions": "正确答案 B。Streams + DynamoDB 贴即时 JSON。Redshift／Aurora 要偏固定 schema；Keyspaces 对此场景常过重。",
    "result_flow": "感测器 → Kinesis Data Streams → 写入 DynamoDB → 即时可查，无需先定死栏位。",
    "options": {
      "A": "错。Redshift 要 schema，不适合此约束。",
      "B": "✓ 正确。Kinesis Streams + DynamoDB。",
      "C": "错。MSK+Aurora 重且 schema 固定。",
      "D": "Keyspaces 非最简即时 JSON 首选。"
    },
    "diagram_before": "flowchart TB\n  SEN[\"城市感测器\"] --> JSON[\"持续丢 JSON\"]\n  NEED[\"要即时进资料库\"]\n  X{{\"不需要固定 schema<br/>又要即时\"}}\n  JSON -.-> X\n  NEED -.->|存在但未接上| X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  SEN[\"感测器\"] --> KS[\"Kinesis Data Streams\"]\n  KS --> DDB[\"DynamoDB\"]\n  DDB --> Q[\"即时可查\"]\n  DDB -.-> FLEX[\"无需先定死栏位\"]"
  },
  "324": {
    "blocker": "旧 MongoDB key-value 应用上云；EC2 必须私有子网无网际网路；DB 连线要加密；DB 要能随需求扩展。",
    "requirements": "Mongo 相容、私网、加密、可扩展。",
    "steps": [
      "使用 Amazon DocumentDB（MongoDB 相容）。",
      "用丛集端点（cluster endpoint）连线以利 HA／角色管理。",
      "应用 EC2 放私有子网，VPC 内连 DocumentDB，启用 TLS。",
      "储存随 DocumentDB 自动扩展。"
    ],
    "solutions": "正确答案 D。DocumentDB cluster endpoint 正确。Instance endpoint 非首选；DynamoDB 不相容 Mongo API（且 endpoint 类型叙述也常错）。",
    "result_flow": "私有 EC2 应用 → TLS → DocumentDB cluster endpoint → 读写扩展储存；无公网暴露。",
    "options": {
      "A": "错。应优先 cluster endpoint 而非 instance endpoint。",
      "B": "错。DynamoDB 非 Mongo 相容迁移首选。",
      "C": "错。DynamoDB 无 Interface endpoint 这种正确叙述组合，且 API 不相容。",
      "D": "✓ 正确。DocumentDB + cluster endpoint。"
    },
    "diagram_before": "flowchart TB\n  APP[\"旧 MongoDB 应用\"] --> NEED[\"上云\"]\n  EC2[\"EC2 必须私有子网\"]\n  SEC[\"DB 连线要加密\"]\n  X{{\"要 Mongo 相容<br/>且能随需求扩展\"}}\n  NEED -.-> X\n  EC2 -.->|存在但未接上| X\n  SEC -.->|存在但未接上| X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  EC2[\"私有 EC2 应用\"] -->|TLS| DOC[\"DocumentDB\"]\n  DOC --> EP[\"cluster endpoint\"]\n  EP --> RW[\"读写\"]\n  DOC --> SCALE[\"储存自动扩展\"]\n  EC2 -.-> PRIV[\"无公网暴露\"]"
  },
  "325": {
    "blocker": "地端 MongoDB replica set 经 DX 可达，要迁到 DocumentDB，需可持续同步策略。",
    "requirements": "Mongo → DocumentDB 迁移，含持续变更。",
    "steps": [
      "建 DMS replication instance。",
      "来源 endpoint：地端 MongoDB（CDC）。",
      "目标 endpoint：DocumentDB。",
      "跑 migration task 全量+变更，直到切换。"
    ],
    "solutions": "正确答案 B。DMS 是官方迁移路径。自建同步、Data Pipeline、Glue crawler 都不适合当主迁移工具。",
    "result_flow": "地端 Mongo → DMS CDC → DocumentDB → lag 低 → 应用切端点 → 完成迁移。",
    "options": {
      "A": "错。自建 EC2 同步负担大。",
      "B": "✓ 正确。DMS + CDC 到 DocumentDB。",
      "C": "错。Data Pipeline 非此场景。",
      "D": "错。Glue crawler 不做持续 DB 复写。"
    },
    "diagram_before": "flowchart TB\n  MONGO[\"地端 MongoDB<br/>replica set\"] --> DX[\"经 DX 可达\"]\n  TGT[\"要迁 DocumentDB\"]\n  X{{\"缺可持续同步<br/>迁移策略\"}}\n  TGT -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  MONGO[\"地端 Mongo\"] --> DMS[\"DMS CDC\"]\n  DMS --> DOC[\"DocumentDB\"]\n  DMS --> LAG[\"lag 降低\"]\n  LAG --> CUT[\"应用切端点\"]\n  CUT --> DONE[\"完成迁移\"]"
  },
  "326": {
    "blocker": "Windows EC2 都要加入 AD；开发权限分级；要 MFA 等强化；尽量用托管服务。",
    "requirements": "网域加入、MFA／GPO 等、托管优先。",
    "steps": [
      "建立 AWS Managed Microsoft AD（非 Simple AD）。",
      "用 Amazon WorkSpaces 作为管理网域安全设定的工作站（图形化管理）。",
      "Windows EC2 join 该网域。",
      "在网域政策启用 MFA 等强化。"
    ],
    "solutions": "正确答案 A。Managed Microsoft AD 支援企业功能；WorkSpaces 避免另养管理用 EC2。Simple AD 不支援 MFA 等需求。",
    "result_flow": "Managed AD 提供网域 → EC2 join → 管理员用 WorkSpaces 设定 GPO／MFA → 开发者依网域身分存取。",
    "options": {
      "A": "✓ 正确。Managed AD + WorkSpaces 管理。",
      "B": "次优：多一台管理 EC2，不符尽量托管。",
      "C": "错。Simple AD + EC2 功能不足。",
      "D": "错。Simple AD 仍无 MFA 等能力。"
    },
    "diagram_before": "flowchart TB\n  WIN[\"Windows EC2\"] --> NEED[\"都要加入 AD\"]\n  DEV[\"开发权限分级\"]\n  MFA[\"要 MFA 等强化\"]\n  X{{\"尽量用托管服务<br/>少自管 DC\"}}\n  NEED -.-> X\n  DEV -.->|存在但未接上| X\n  MFA -.->|存在但未接上| X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  MAD[\"Managed Microsoft AD\"] --> JOIN[\"EC2 join 网域\"]\n  MAD --> WS[\"WorkSpaces 管理站\"]\n  WS --> GPO[\"设 GPO / MFA\"]\n  DEV[\"开发者\"] --> ID[\"网域身分存取\"]\n  ID --> WIN[\"Windows 资源\"]"
  },
  "327": {
    "blocker": "应用有结构化产品资料与暂时 session；要解耦两者，且另一 Region 做 DR，要最高效能。",
    "requirements": "资料与 session 分离；跨 Region 复写；高效能。",
    "steps": [
      "产品结构化资料放 RDS，并建跨 Region 读复本。",
      "Session 放 DynamoDB Global Table。",
      "应用分层存取两种储存。",
      "DR Region 可读产品复本并用 Global Table 延续 session。"
    ],
    "solutions": "正确答案 D。关联资料用 RDS、短暂高速 session 用 DynamoDB Global Table。全塞同一 RDS、Memcached global、或产品也硬塞 DynamoDB 都非最高效能平衡。",
    "result_flow": "下单读产品 → RDS；使用者 session → DynamoDB Global Table 多 Region；灾难时 session 仍在、产品读复本。",
    "options": {
      "A": "错。同库不同 schema 未真正效能解耦。",
      "B": "错。Memcached global 能力弱于 DynamoDB GT。",
      "C": "产品资料全 DynamoDB 不一定最高效关联查询。",
      "D": "✓ 正确。RDS + 跨区复本 + DynamoDB Global Table session。"
    },
    "diagram_before": "flowchart TB\n  APP[\"应用\"] --> MIX[\"产品资料 + session<br/>混在一起\"]\n  NEED[\"要解耦\"]\n  DR[\"另一 Region DR\"]\n  X{{\"要最高效能<br/>分开储存策略\"}}\n  MIX -.-> X\n  DR -.->|存在但未接上| X\n  NEED -.->|存在但未接上| X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  ORDER[\"下单读产品\"] --> RDS[\"RDS + 跨区读复本\"]\n  SESS[\"使用者 session\"] --> GT[\"DynamoDB Global Table\"]\n  DR[\"灾难 Region\"] --> RR[\"产品读复本\"]\n  DR --> GT\n  APP[\"应用分层存取\"] --> RDS\n  APP --> GT"
  },
  "328": {
    "blocker": "Control Tower 下开发 OU 有数百开发帐户，要省钱：EC2／RDS 只能 burstable，其他不相干服务要禁。",
    "requirements": "强制 burstable、禁无关服务；开发 OU 范围。",
    "steps": [
      "写自订 SCP：允许的执行个体族为 burstable，Deny 其他。",
      "SCP 再 Deny 不需要的服务 API。",
      "把 SCP 附到 development OU。",
      "所有开发帐户自动继承。"
    ],
    "solutions": "正确答案 A。预防性 SCP 最直接。Detective guardrail／Config 只事后；Control Tower 预置 preventive 不一定细到「只有 burstable」这种自订粒度。",
    "result_flow": "开发者在开发帐户启动资源 → SCP 检查 → 非 burstable 或禁服务 → 拒绝 → 成本受控。",
    "options": {
      "A": "✓ 正确。自订 SCP 挂开发 OU。",
      "B": "错。Detective 不能预防建立。",
      "C": "错。预置 preventive guardrail 难精确到题述自订组合。",
      "D": "错。Config 是侦测，且部署面大。"
    },
    "diagram_before": "flowchart TB\n  CT[\"Control Tower\"] --> OU[\"开发 OU 数百帐户\"]\n  OU --> EC2[\"EC2 / RDS 乱开规格\"]\n  SVC[\"不相干服务也开\"]\n  X{{\"要强制 burstable<br/>并禁不必要服务\"}}\n  EC2 -.-> X\n  SVC -.->|存在但未接上| X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  DEV[\"开发者启动资源\"] --> SCP[\"开发 OU 上的 SCP\"]\n  SCP -->|\"burstable\"| OK[\"允许\"]\n  SCP -->|\"其他类型\"| DENY[\"拒绝\"]\n  SCP --> BAN[\"禁不需要服务 API\"]\n  OK --> SAVE[\"成本受控\"]"
  },
  "329": {
    "blocker": "金融多层应用用 CloudFormation 每次发版建整叠资源；S3 暂存档 45 分钟有效、24 小时删。删旧 stack 时因 S3 非空删不掉。",
    "requirements": "能删 stack；不大改架构。",
    "steps": [
      "写 Lambda 清空指定 bucket 物件。",
      "把 Lambda 做成 CloudFormation Custom Resource。",
      "设定 DependsOn，让删除顺序先清物件再删桶。",
      "之后 Delete Stack 可成功。"
    ],
    "solutions": "正确答案 A。非空桶不能直接删是 CFN 经典坑，用 custom resource 清空。改 EFS 是大改；Lifecycle 45 分不等于删 stack 当下清空；DeletionPolicy=Delete 仍删不了非空桶。",
    "result_flow": "Delete Stack → Custom Resource 先清空 S3 → 再删 bucket 与其他资源 → 旧版环境清干净。",
    "options": {
      "A": "✓ 正确。Lambda custom resource 清空后再删。",
      "B": "错。改 EFS 属大改架构。",
      "C": "错。Lifecycle 无法保证删 stack 当下已空。",
      "D": "错。DeletionPolicy Delete 不解非空桶。"
    },
    "diagram_before": "flowchart TB\n  CFN[\"CloudFormation 整叠发版\"] --> S3[\"S3 暂存档\"]\n  S3 --> LIFE[\"45 分有效、24h 删\"]\n  DEL[\"删旧 stack\"]\n  X{{\"S3 非空<br/>stack 删不掉\"}}\n  DEL -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  DEL[\"Delete Stack\"] --> CR[\"Custom Resource\"]\n  CR --> L[\"Lambda 清空 S3\"]\n  L --> EMPTY[\"桶已空\"]\n  EMPTY --> BUCKET[\"再删 bucket\"]\n  BUCKET --> REST[\"其他资源删除成功\"]"
  },
  "330": {
    "blocker": "手机游戏后端 REST API 多功能、session 在中央档案储存、用 API key 区流量；尖峰不够力、session 延迟高；不能改 API 模型。",
    "requirements": "弹性负载、低延迟 session、保持 REST。",
    "steps": [
      "用 API Gateway 继续暴露 REST。",
      "业务逻辑改 Lambda 自动扩展。",
      "Session 改 DynamoDB on-demand（毫秒级、按需容量）。",
      "沿用 API key 做节流／环境区分。"
    ],
    "solutions": "正确答案 C。API GW+Lambda+DynamoDB 保 REST。NLB+EC2 扩展弱；ALB 直挂 Lambda 非典型 REST 入口；AppSync 变 GraphQL 改模型。",
    "result_flow": "手游 REST 呼叫 → API Gateway（API key）→ Lambda → Session 读写 DynamoDB on-demand → 尖峰自动扩、延迟低。",
    "options": {
      "A": "错。NLB+EC2+Aurora 对 session KV 非最佳且扩展差。",
      "B": "错。ALB 非此 REST+API key 模型首选入口。",
      "C": "✓ 正确。API Gateway + Lambda + DynamoDB。",
      "D": "错。AppSync 改变 API 模型。"
    },
    "diagram_before": "flowchart TB\n  GAME[\"手游 REST API\"] --> KEY[\"API key 区流量\"]\n  SESS[\"session 在中央档案储存\"]\n  X{{\"尖峰不够力<br/>session 延迟高\"}}\n  SESS -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  MOB[\"手游 REST\"] --> APIGW[\"API Gateway + API key\"]\n  APIGW --> L[\"Lambda 自动扩\"]\n  L --> DDB[\"DynamoDB on-demand\"]\n  DDB --> SESS[\"session 毫秒级\"]\n  L -.-> SCALE[\"尖峰自动扩\"]"
  },
  "331": {
    "blocker": "地端每晚往 NFS 写数千张图；迁云后改 EC2+EFS。已有 Direct Connect，切换前要持续把新图复制到 EFS，要最省营运。",
    "requirements": "定期复制地端 NFS→EFS；走专线；高营运效率。",
    "steps": [
      "在能存取 NFS 的地端机部署 DataSync agent。",
      "经 Direct Connect Private VIF 连到 EFS 的 PrivateLink 介面端点。",
      "建 DataSync 任务来源 NFS、目标 EFS。",
      "排程每 24 小时执行。"
    ],
    "solutions": "正确答案 D。DataSync 直送 EFS over 私有路径最干净。经 S3+Lambda 中转多余；File Gateway 偏持续档案闸道场景。",
    "result_flow": "夜间地端写 NFS → DataSync 排程 → DX Private VIF → EFS endpoint → 图进 EFS → 切换后 EC2 直接用 EFS。",
    "options": {
      "A": "错。S3 中转 + Lambda 多一步。",
      "B": "错。File Gateway 非本题最省批次复制。",
      "C": "错。Public VIF 到 S3 再 Lambda 不优雅。",
      "D": "✓ 正确。DataSync + Private VIF + EFS 排程。"
    },
    "diagram_before": "flowchart TB\n  NIGHT[\"地端每晚写数千张图\"] --> NFS[\"NFS\"]\n  CLOUD[\"云上改 EC2 + EFS\"]\n  DX[\"已有 Direct Connect\"]\n  X{{\"切换前要持续<br/>把新图复制到 EFS\"}}\n  NFS -.-> X\n  CLOUD -.->|存在但未接上| X\n  DX -.->|存在但未接上| X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  NFS[\"地端 NFS\"] --> DS[\"DataSync 排程\"]\n  DS -->|DX Private VIF| EP[\"EFS PrivateLink\"]\n  EP --> EFS[\"EFS\"]\n  CUT[\"切换后\"] --> EC2[\"EC2 直接用 EFS\"]\n  DS -.-> DAY[\"每 24 小时\"]"
  },
  "332": {
    "blocker": "网站 CloudFront → ALB → ECS；稽核发现可直接打 ALB 绕过 CloudFront，但公司要求只能走 CloudFront。",
    "requirements": "ALB 只接受 CloudFront 来源；LEAST effort。",
    "steps": [
      "编辑 ALB 安全群组入站规则。",
      "只允许来自 AWS 管理的 CloudFront origin-facing prefix list（com.amazonaws.global.cloudfront.origin-facing）。",
      "移除 0.0.0.0/0 对 ALB 的开放。",
      "验证直连 ALB 失败、经 CloudFront 成功。"
    ],
    "solutions": "正确答案 B。托管 prefix list 自动更新 CloudFront IP。CloudFront 不能挂 SG；改 internal ALB 会让 CloudFront 到不了；手维 ip-ranges.json 累。",
    "result_flow": "使用者只打 CloudFront 网域 → 边缘回源 → ALB SG 核对 prefix list 放行 → ECS；使用者直打 ALB IP 被拒。",
    "options": {
      "A": "错。CloudFront 不是 EC2，不能这样挂 SG。",
      "B": "✓ 正确。ALB SG 引用 CloudFront managed prefix list。",
      "C": "错。改 internal 会害 CloudFront 无法当公网 origin 回源。",
      "D": "错。手动维护 IP 列表易过期。"
    },
    "diagram_before": "flowchart TB\n  U[\"使用者\"] --> CF[\"CloudFront\"]\n  CF --> ALB[\"ALB\"]\n  ALB --> ECS[\"ECS\"]\n  BYPASS[\"直接打 ALB IP\"] --> ALB\n  X{{\"可绕过 CloudFront<br/>违反公司要求\"}}\n  BYPASS -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  U[\"只打 CloudFront 网域\"] --> CF[\"CloudFront\"]\n  CF --> ALB[\"ALB\"]\n  SG[\"安全群组\"] -->|\"只放行 CloudFront<br/>prefix list\"| ALB\n  DIRECT[\"直打 ALB\"] -.->|拒绝| SG\n  ALB --> ECS[\"ECS\"]"
  },
  "333": {
    "blocker": "论坛：ALB + ECS（Docker）+ RDS MySQL + ECR。DR SLA：RTO≤24h、RPO≤8h，要最便宜。",
    "requirements": "达 RTO／RPO；最低成本（可接受备援冷启动）。",
    "steps": [
      "ECR 映像在两 Region 都有。",
      "RDS 每 8 小时快照并复制到备援 Region（满足 RPO）。",
      "平时不养完整双活基础设施。",
      "灾难时用 CloudFormation 在备援 Region 起 ALB／ECS／RDS，还原快照，改 DNS。"
    ],
    "solutions": "正确答案 B。Backup／Restore 冷备援最省。双 Region 长驻相同资源、pilot light 常驻 ALB/EC2 都较贵。",
    "result_flow": "日常主 Region 服务 → 快照每 8h 到备援 → 灾难 → CFN 部署 + 还原最新快照 → 改 DNS → 24h 内恢复。",
    "options": {
      "A": "错。两 Region 完整常驻资源贵。",
      "B": "✓ 正确。映像+快照跨区，灾难时再部署。",
      "C": "错。备援仍常驻完整堆叠成本高。",
      "D": "错。Pilot light 常驻元件成本高于纯 backup restore。"
    },
    "diagram_before": "flowchart TB\n  WEB[\"ALB + ECS\"] --> RDS[\"RDS MySQL\"]\n  ECR[\"ECR 映像\"]\n  SLA[\"RTO≤24h RPO≤8h\"]\n  X{{\"要最便宜 DR<br/>不必双活常驻\"}}\n  SLA -.-> X\n  ECR -.->|存在但未接上| X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  PRI[\"主 Region 服务\"] --> SNAP[\"每 8h 快照复制备援\"]\n  DIS[\"灾难\"] --> CFN[\"CloudFormation 部署\"]\n  CFN --> RES[\"还原最新快照\"]\n  RES --> DNS[\"改 DNS\"]\n  DNS --> OK[\"24h 内恢复\"]"
  },
  "334": {
    "blocker": "多专案不同合规，要多帐户基准安全／管理，又要弹性；还要接现有 on-prem AD FS；营运负担最低。",
    "requirements": "多帐户 baseline、合规弹性、联邦登入、LEAST overhead。",
    "steps": [
      "建 Organizations 并启用 Control Tower。",
      "检视内建 guardrails（护栏／控制项）与 SCP，不够再补 Config。",
      "按需要加 OU 分合规边界。",
      "IAM Identity Center 接到 on-prem AD FS。"
    ],
    "solutions": "正确答案 B。Control Tower 一篮子 landing zone 最省自建。A/C 大量手组 logging/Config；D 用 IAM IdP 而非 Identity Center 接 AD FS 较不完整。",
    "result_flow": "Control Tower 建帐与护栏 → OU 分专案合规 → 使用者经 AD FS／Identity Center 登入 → 各帐受 baseline 约束又可加严。",
    "options": {
      "A": "错。单一 OU+大量手作 logging，弹性与开销差。",
      "B": "✓ 正确。Control Tower + 检视护栏 + Identity Center 接 AD FS。",
      "C": "错。手组要素多，overhead 高。",
      "D": "错。联邦方式不如 Identity Center 整合完整。"
    },
    "diagram_before": "flowchart TB\n  MULTI[\"多专案不同合规\"] --> NEED[\"多帐户基准安全\"]\n  ADFS[\"现有 on-prem AD FS\"]\n  FLEX[\"又要弹性加严\"]\n  X{{\"自建 landing zone<br/>营运负担高\"}}\n  NEED -.-> X\n  ADFS -.->|存在但未接上| X\n  FLEX -.->|存在但未接上| X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  CT[\"Control Tower\"] --> OU[\"OU 分专案合规\"]\n  CT --> GR[\"内建护栏 / SCP\"]\n  USER[\"使用者\"] --> IC[\"Identity Center\"]\n  IC --> ADFS[\"接 AD FS\"]\n  IC --> ACC[\"登入各帐户\"]\n  ACC --> GR"
  },
  "335": {
    "blocker": "杂志全球发行，动态站 ALB+EC2+Aurora，多半读、有静态；预期流量暴冲，要全球低延迟一周内最佳表现。",
    "requirements": "降全球回应时间；读多、可扩、静态加速。",
    "steps": [
      "Route 53 延迟路由 + CloudFront 全球快取静态／可快取内容。",
      "Web／App 层都放 Auto Scaling。",
      "（搭配）跨 Region 部署与 Aurora 全球库／S3 CRR 等强化读效能（题库 D+E）。",
      "尖峰靠边缘与水平扩展吸收。"
    ],
    "solutions": "正确答案 D、E。CloudFront+Latency 路由+ASG 是全球读多站核心；D 补跨 Region 应用与 Aurora global、静态 S3 CRR。A 用 S3 取代动态 web 不对；B DX 不解决全球观众；C 迁 RDS 无帮助。",
    "result_flow": "全球读者 → CloudFront／Route 53 延迟路由 → 近区 ASG 应用 → 读 Aurora 全球／本地 → 静态走 S3+CDN。",
    "options": {
      "A": "错。动态站不能整层换成 S3。",
      "B": "错。DX 与全球观众延迟无关。",
      "C": "错。换 RDS 与私有子网不解决全球延迟。",
      "D": "✓ 正确。Aurora global + S3 CRR + 多 Region 层。",
      "E": "✓ 正确。Route 53 latency + CloudFront + ASG。"
    },
    "diagram_before": "flowchart TB\n  READER[\"全球读者\"] --> WEB[\"ALB + EC2 + Aurora\"]\n  STATIC[\"多数读 + 静态\"]\n  BURST[\"预期流量暴冲\"]\n  X{{\"全球低延迟<br/>一周内要到位\"}}\n  BURST -.-> X\n  STATIC -.->|存在但未接上| X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  R[\"全球读者\"] --> CF[\"CloudFront\"]\n  R --> R53[\"Route 53 延迟路由\"]\n  R53 --> ASG[\"近区 ASG 应用\"]\n  ASG --> AUR[\"Aurora 全球/本地\"]\n  STATIC[\"静态\"] --> S3[\"S3 + CDN / CRR\"]"
  },
  "336": {
    "blocker": "同一生产帐户：全年常驻游戏 EC2 必须一直在；分析应用读 S3、可中断。要最省。",
    "requirements": "游戏高可用常驻折扣；分析可抢 Spot。",
    "steps": [
      "游戏 EC2 买 EC2 Instance Savings Plan（承诺用量换折扣）。",
      "分析工作用 Spot Instances。",
      "中断后可从 S3 资料续跑。",
      "不要把游戏也改成 Spot。"
    ],
    "solutions": "正确答案 B。常驻用 Savings Plan，可中断用 Spot。游戏用 Spot 危险；分析用 On-Demand 偏贵。",
    "result_flow": "游戏流量 → Savings Plan 覆盖的稳定 EC2；分析 job → Spot 读 S3 运算 → 被回收就重排程。",
    "options": {
      "A": "错。分析用 On-Demand 不够省。",
      "B": "✓ 正确。游戏 SP + 分析 Spot。",
      "C": "错。游戏不能 Spot。",
      "D": "错。游戏 On-Demand 太贵。"
    },
    "diagram_before": "flowchart TB\n  GAME[\"全年常驻游戏 EC2\"] --> ACC[\"同一生产帐户\"]\n  ANA[\"分析应用读 S3\"] --> ACC\n  ANA2[\"分析可中断\"]\n  X{{\"两种负载混一起<br/>成本策略不对\"}}\n  ACC -.-> X\n  ANA2 -.->|存在但未接上| X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  GAME[\"游戏稳定流量\"] --> SP[\"EC2 Instance<br/>Savings Plan\"]\n  ANA[\"分析 job\"] --> SPOT[\"Spot 读 S3 运算\"]\n  SPOT -->|被回收| RETRY[\"重排程续跑\"]\n  SP --> SAVE[\"常驻有折扣\"]\n  SPOT --> SAVE"
  },
  "337": {
    "blocker": "数百生产帐户用 Organizations + 中央 AWS Backup；怕勒索／特权凭证外泄，要备份在「生产帐户特权被拿」时仍安全。",
    "requirements": "备份抗生产帐户特权破坏；多层保护。",
    "steps": [
      "跨帐户备份到非生产帐户的 Backup vault。",
      "Backup 使用的 IAM 服务角色最小权限。",
      "设定频率／生命周期／保留，确保冷层至少有一份可用备份。",
      "避免只把备份留在同一生产帐户。"
    ],
    "solutions": "正确答案 A、C、D。跨帐户 vault + 最小权限 + 保留策略。仅 SCP 锁 vault 不够完整；Backup 不是「写到 S3 Object Lock 桶」那种选项模型。",
    "result_flow": "生产资源 → AWS Backup → 复写到非生产帐户 vault → 攻击者即使拿下生产特权也删不掉隔离备份 → 可还原。",
    "options": {
      "A": "✓ 正确。跨帐户 Backup vault。",
      "B": "SCP 有帮助但非题库三选。",
      "C": "✓ 正确。Backup 角色最小权限。",
      "D": "✓ 正确。保留与冷层策略保证有干净点。",
      "E": "错。不是 Backup 写 S3 Object Lock 的标准正确组合。"
    },
    "diagram_before": "flowchart TB\n  PROD[\"数百生产帐户\"] --> BAK[\"中央 AWS Backup\"]\n  RISK[\"勒索 / 特权外泄\"]\n  X{{\"攻击者拿下生产特权<br/>可能删掉备份\"}}\n  BAK -.-> X\n  RISK -.->|存在但未接上| X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  PROD[\"生产资源\"] --> BAK[\"AWS Backup\"]\n  BAK --> VAULT[\"非生产帐户 vault\"]\n  ROLE[\"Backup 角色最小权限\"] --> BAK\n  RET[\"保留/生命周期策略\"] --> VAULT\n  VAULT -.-> SAFE[\"生产特权也删不掉\"]"
  },
  "338": {
    "blocker": "多帐户 CloudWatch Logs 要汇到中央 logging 帐户；日志必须留在产生的 Region；中央要正规化再送安全工具；量可能很大、下班较少，要能扩展。",
    "requirements": "跨帐户汇流、同 Region、可扩展、正规化。",
    "steps": [
      "中央帐户建 Kinesis Data Stream 当目的地。",
      "IAM 角色允许 CloudWatch Logs 写入该 stream，含信任政策。",
      "各成员帐户对 log group 建 subscription filter 指向 Kinesis。",
      "中央 Lambda 正规化后写入安全工具。"
    ],
    "solutions": "正确答案 A、C、E。Kinesis 适合大量可扩展摄取；SQS 非 CloudWatch Logs 订阅首选；正规化应在中央做。",
    "result_flow": "成员帐户 log group → subscription filter → 中央同 Region Kinesis → Lambda 正规化 → 安全工具；尖峰 Kinesis 扩展。",
    "options": {
      "A": "✓ 正确。中央 Kinesis stream。",
      "B": "错。SQS 非此订阅模型首选。",
      "C": "✓ 正确。IAM + 各帐户 subscription filter。",
      "D": "错。SQS 路径不对。",
      "E": "✓ 正确。中央 Lambda 正规化。",
      "F": "错。不应在各成员帐户各自正规化再送。"
    },
    "diagram_before": "flowchart TB\n  ACC[\"多帐户 Logs\"] --> LOCAL[\"必须留在产生 Region\"]\n  NEED[\"汇到中央 logging\"]\n  NORM[\"要正规化再送安全工具\"]\n  X{{\"量大要能扩展<br/>下班流量较少\"}}\n  NEED -.-> X\n  NORM -.->|存在但未接上| X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  LG[\"成员 log group\"] --> SUB[\"subscription filter\"]\n  SUB --> KIN[\"中央同 Region Kinesis\"]\n  KIN --> L[\"Lambda 正规化\"]\n  L --> SEC[\"安全工具\"]\n  KIN -.-> SCALE[\"尖峰自动扩\"]"
  },
  "339": {
    "blocker": "旧应用：应用伺服器 + SQL Server 各在 VMware，每台约 500TB 多碟；10Gbps DX 空著；要最少停机迁移。",
    "requirements": "两台大型 VM 迁 AWS；最少停机。",
    "steps": [
      "对资料库 VM 使用 AWS SMS（Server Migration Service）复写任务持续同步。",
      "对应用伺服器 VM 同样用 SMS 复写任务。",
      "利用 DX 频宽做持续复制，缩短切换窗口。",
      "切换时短暂停机完成最后同步并启动。"
    ],
    "solutions": "正确答案 A、D。SMS 复写任务适合整机持续同步降停机。VM Import 偏一次性；Snowball 在 10G 空线时非最少停机首选；DMS 到 RDS 要改架构且 500TB 级另议。",
    "result_flow": "地端 VM → SMS 持续复写 over DX → AWS 就绪 → 短窗口切换 → 应用与 SQL 在云上继续。",
    "options": {
      "A": "✓ 正确。SMS 迁资料库 VM。",
      "B": "错。Import 非最少停机主路径。",
      "C": "错。Snowball 不必要且拉长。",
      "D": "✓ 正确。SMS 迁应用 VM。",
      "E": "错。DMS 到 RDS 非本题两 VM 最少改动路径。"
    },
    "diagram_before": "flowchart TB\n  APPVM[\"应用伺服器 VM<br/>~500TB\"] --> VMW[\"VMware\"]\n  DBVM[\"SQL Server VM<br/>~500TB\"] --> VMW\n  DX[\"10Gbps DX 空著\"]\n  X{{\"两台大型 VM<br/>要最少停机迁移\"}}\n  VMW -.-> X\n  DX -.->|存在但未接上| X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  APPVM[\"应用 VM\"] --> SMS1[\"SMS 复写任务\"]\n  DBVM[\"资料库 VM\"] --> SMS2[\"SMS 复写任务\"]\n  SMS1 -->|over DX| AWS[\"AWS 就绪\"]\n  SMS2 --> AWS\n  CUT[\"短窗口切换\"] --> RUN[\"云上继续服务\"]"
  },
  "340": {
    "blocker": "地端机群 + Organizations 内数百 VPC；已有 Site-to-Site VPN 到单一帐户；要连所有帐户，并控制哪些 VPC 可互通；营运最少。",
    "requirements": "集中连线地端；VPC 间可控互通；LEAST effort。",
    "steps": [
      "在一帐户建 Transit Gateway，用 RAM（资源共用）分享给其他帐户。",
      "把所有 VPC 与 VPN 做成 TGW attachments。",
      "建 TGW 路由表，把 VPC／VPN 与路由表关联，精细放行。",
      "不要用大量 VPC peering 网状。"
    ],
    "solutions": "正确答案 A、B、C。TGW + RAM + 路由表是多帐户连线与分段标准。VPC peering 网状难扩；在 VPC 上各自管 VPN 路由最乱。",
    "result_flow": "地端 → VPN attachment → TGW → 依路由表只到授权 VPC；跨帐户 VPC 经 RAM 共享的同一 TGW 受控互通。",
    "options": {
      "A": "✓ 正确。TGW + RAM 跨帐户共享。",
      "B": "✓ 正确。VPC 与 VPN 都 attach。",
      "C": "✓ 正确。TGW 路由表控制可达性。",
      "D": "错。大量 peering 营运差。",
      "E": "描述含糊，非正确三选。",
      "F": "错。只在 VPC／VPN 各自路由表无法达集中控制。"
    },
    "diagram_before": "flowchart TB\n  OP[\"地端机群\"] --> VPN[\"Site-to-Site VPN<br/>只到单一帐户\"]\n  VPC[\"Organizations 数百 VPC\"]\n  X{{\"要连所有帐户<br/>并控制谁可互通\"}}\n  VPN -.-> X\n  VPC -.->|存在但未接上| X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  OP[\"地端\"] --> VPN[\"VPN attachment\"]\n  VPN --> TGW[\"Transit Gateway\"]\n  TGW --> RAM[\"RAM 分享给各帐户\"]\n  VPC[\"各 VPC attach\"] --> TGW\n  TGW --> RT[\"路由表精细放行\"]"
  },
  "341": {
    "blocker": "Lambda + Fargate 写多、Aurora MySQL 在记忆体优化固定实例撑不住；流量长期安静又突然暴冲；要最省且能扩。",
    "requirements": "资料库随流量伸缩；运算成本优化。",
    "steps": [
      "资料库改 Aurora Serverless v1（随负载自动启停／扩缩容量单位）。",
      "为 Lambda／Fargate 买 Compute Savings Plan。",
      "安静期 DB 降载省钱，尖峰自动升。",
      "避免为尖峰买死固定超大实例。"
    ],
    "solutions": "正确答案 D。Serverless DB 贴极端不均流量；Compute SP 覆盖 Lambda/Fargate。多 writer、Global、RI 组合对此不均模式不划算。",
    "result_flow": "长时间低流量 → Aurora Serverless 缩容；突发写入 → 自动扩 → Lambda/Fargate 享 Compute SP 折扣。",
    "options": {
      "A": "错。读复本不解写压力；固定 RI 不贴波动。",
      "B": "错。多 writer 与 Instance SP 不对 Fargate/Lambda 模式。",
      "C": "错。Global DB 过贵且非必要。",
      "D": "✓ 正确。Aurora Serverless v1 + Compute Savings Plans。"
    },
    "diagram_before": "flowchart TB\n  L[\"Lambda 写多\"] --> AUR[\"Aurora MySQL<br/>固定大实例\"]\n  F[\"Fargate 写多\"] --> AUR\n  QUIET[\"长期安静\"] \n  SPIKE[\"突然暴冲\"]\n  X{{\"固定实例撑不住<br/>又太贵\"}}\n  AUR -.-> X\n  QUIET -.->|存在但未接上| X\n  SPIKE -.->|存在但未接上| X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  L[\"Lambda / Fargate\"] --> AS[\"Aurora Serverless v1\"]\n  AS -->|安静| DOWN[\"自动缩容\"]\n  AS -->|暴冲| UP[\"自动升容量\"]\n  COMP[\"Compute Savings Plan\"] --> L\n  AS -.-> FIT[\"贴极端不均流量\"]"
  },
  "342": {
    "blocker": "两台 EC2+ALB，MySQL 在第三台 EC2；读很重尖峰撑不住；静态内容在各机 EBS 且常更新要互拷。",
    "requirements": "提升可靠与读扩展；静态内容共享；自动扩展。",
    "steps": [
      "应用容器化，ECS on Fargate，接 ALB，开 Application Auto Scaling。",
      "静态内容改放 EFS，容器共用挂载，免互拷 EBS。",
      "资料库迁 Aurora MySQL Serverless v2 并加 reader。",
      "尖峰读走 reader，应用水平扩。"
    ],
    "solutions": "正确答案 D。EFS 解静态同步；Aurora Serverless v2+reader 解读尖峰；Fargate 少管机器。Lambda 不能挂 EBS；Step Functions 不当 Web 目标；EBS 挂 ECS 丛集不适合多任务共享档。",
    "result_flow": "请求 → ALB → Fargate 任务（挂 EFS 静态）→ 读 Aurora reader／写 writer → 尖峰自动加任务与读容量。",
    "options": {
      "A": "错。Lambda 不适挂 EBS 静态模型。",
      "B": "错。Step Functions 不当 ALB 网页目标。",
      "C": "错。单 EBS 不适合多容器共享常更新档。",
      "D": "✓ 正确。Fargate + EFS + Aurora Serverless v2 reader。"
    },
    "diagram_before": "flowchart TB\n  ALB[\"ALB\"] --> EC2[\"两台 EC2\"]\n  MYSQL[\"第三台 EC2 MySQL\"]\n  STATIC[\"静态在各机 EBS\"] --> COPY[\"常更新要互拷\"]\n  X{{\"读尖峰撑不住<br/>静态不同步\"}}\n  MYSQL -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  REQ[\"请求\"] --> ALB[\"ALB\"]\n  ALB --> FG[\"ECS on Fargate\"]\n  FG --> EFS[\"EFS 共享静态\"]\n  FG --> AUR[\"Aurora Serverless v2\"]\n  AUR --> R[\"Reader 扛读尖峰\"]"
  },
  "343": {
    "blocker": "新 API Gateway 端点只准有权的 IAM 使用者／角色呼叫，还要端到端看每次请求延迟与服务地图。",
    "requirements": "IAM 授权呼叫；分散式追踪。",
    "steps": [
      "方法授权设 AWS_IAM。",
      "给呼叫者 execute-api:Invoke 权限。",
      "用户端用 Signature Version 4 签请求。",
      "开 X-Ray 追踪 API Gateway 画服务地图与延迟。"
    ],
    "solutions": "正确答案 A。IAM 授权 + SigV4 + X-Ray 标准。CORS 不是授权；自写 key/secret authorizer 重复造轮；用户端凭证＋CloudWatch 不如 X-Ray 服务地图。",
    "result_flow": "呼叫者 SigV4 签名 → API Gateway IAM 验证 → 后端处理 → X-Ray 串起延迟与服务地图。",
    "options": {
      "A": "✓ 正确。AWS_IAM + Invoke + X-Ray。",
      "B": "错。CORS 非存取控制；CloudWatch 难画完整 service map。",
      "C": "错。自管 key/secret 多余。",
      "D": "错。用户端凭证模型与追踪工具不完整。"
    },
    "diagram_before": "flowchart TB\n  CLI[\"呼叫端\"] --> API[\"新 API Gateway\"]\n  NEED1[\"只准 IAM 使用者/角色\"]\n  NEED2[\"要看每次延迟\"]\n  X{{\"缺授权 + 分散式追踪\"}}\n  API -.-> X\n  NEED1 -.->|存在但未接上| X\n  NEED2 -.->|存在但未接上| X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  CLI[\"呼叫者 SigV4\"] --> API[\"API Gateway<br/>AWS_IAM\"]\n  API --> IAM[\"execute-api:Invoke\"]\n  IAM --> BE[\"后端处理\"]\n  API --> XR[\"X-Ray 追踪\"]\n  XR --> MAP[\"服务地图与延迟\"]"
  },
  "344": {
    "blocker": "CodePipeline 把产物丢 S3，用 user data 部署到 ASG；CloudFormation 一改资源就意外停机。",
    "requirements": "降低模板变更导致停机；可测、可回滚。",
    "steps": [
      "在测试环境用 CodeBuild 自动化测试。",
      "用 CloudFormation change sets 预览变更影响。",
      "用 CodeDeploy 蓝绿部署替代粗暴 user data 刷机。",
      "有问题可切回旧环境。"
    ],
    "solutions": "正确答案 B。测试 + change set + 蓝绿是完整 CI/CD 防护。纯人工测、IDE 外挂、或蓝绿但仍手动登入测都不足。",
    "result_flow": "提交 → 建置测试 → change set 审核 → CodeDeploy 蓝绿切流量 → 异常回滚 → 降低停机。",
    "options": {
      "A": "错。过度依赖人工测试计划。",
      "B": "✓ 正确。CodeBuild + change set + CodeDeploy 蓝绿。",
      "C": "错。手动验证为主，易漏。",
      "D": "错。仍靠人工登入测，不完整。"
    },
    "diagram_before": "flowchart TB\n  PIPE[\"CodePipeline\"] --> S3[\"产物 S3\"]\n  S3 --> UD[\"user data 刷 ASG\"]\n  CFN[\"CloudFormation 一改\"] --> DOWN[\"意外停机\"]\n  X{{\"缺可测可回滚<br/>的部署防护\"}}\n  DOWN -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  COMMIT[\"提交\"] --> CB[\"CodeBuild 测试\"]\n  CB --> CS[\"CloudFormation change set\"]\n  CS --> CD[\"CodeDeploy 蓝绿\"]\n  CD --> TRAF[\"切流量\"]\n  TRAF -->|异常| RB[\"快速回滚\"]"
  },
  "345": {
    "blocker": "美东新 Web 应用要动态扩展与韧性，且 us-west-1 做 active-passive DR。",
    "requirements": "同 Region 多 AZ HA；跨 Region 主备 failover。",
    "steps": [
      "us-east-1：ALB 跨多 AZ + ASG。",
      "us-west-1 部署相同 ALB+ASG 方案（备援）。",
      "Route 53 记录用 failover 路由 + 健康检查。",
      "主健康则走美东，失败切美西。"
    ],
    "solutions": "正确答案 B。各 Region 独立 ALB/ASG + Route 53 failover 是 active-passive 标准。跨 Region 单一 ASG／单一 ALB 不可行；两个独立记录无 failover 政策不完整。",
    "result_flow": "使用者 → Route 53 健康检查主 ALB → 正常打 us-east-1 ASG；主挂 → failover 到 us-west-1 ALB/ASG。",
    "options": {
      "A": "错。ASG 不能跨 Region 挂单一 ALB 如描述。",
      "B": "✓ 正确。双 Region 对称部署 + failover 路由。",
      "C": "错。ALB 不能跨 VPC/Region 那样单颗服务两 VPC。",
      "D": "错。缺少正确 failover 记录组设计。"
    },
    "diagram_before": "flowchart TB\n  WEB[\"美东新 Web 应用\"] --> NEED[\"动态扩展与韧性\"]\n  DR[\"us-west-1 active-passive\"]\n  X{{\"缺同区多 AZ HA<br/>+ 跨区 failover\"}}\n  WEB -.-> X\n  DR -.->|存在但未接上| X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  U[\"使用者\"] --> R53[\"Route 53 Failover\"]\n  R53 -->|主健康| E[\"us-east-1 ALB+ASG\"]\n  R53 -->|主挂| W[\"us-west-1 ALB+ASG\"]\n  E --> MULTI[\"跨多 AZ\"]\n  W --> MULTI2[\"备援对称部署\"]"
  },
  "346": {
    "blocker": "旧 .NET Framework + SQL Server + MSMQ 异步；要容器化 .NET Core，要复杂编排、要掌控网路与主机、资料强关联。",
    "requirements": "容器编排可控主机网路；关联式 DB；伫列异步。",
    "steps": [
      "ECS 用 EC2 launch type（可控实例／网路）。",
      "关联式库用 Aurora MySQL Serverless v2（题库选项）。",
      "异步改 SQS 取代 MSMQ。",
      "复杂编排用 ECS 服务／任务定义管理。"
    ],
    "solutions": "正确答案 D。要 full control 用 ECS on EC2 不是 Fargate／App Runner。DynamoDB 非强关联；Beanstalk 控制度较低。",
    "result_flow": ".NET Core 容器在 ECS EC2 → 交易资料 Aurora → 异步讯息 SQS → 可调安全群组／主机参数。",
    "options": {
      "A": "错。App Runner 控制度不足。",
      "B": "错。Fargate 较少主机控制；DynamoDB 非强关联。",
      "C": "错。Beanstalk 非「完全控网路主机」首选。",
      "D": "✓ 正确。ECS on EC2 + Aurora + SQS。"
    },
    "diagram_before": "flowchart TB\n  NET[\"旧 .NET Framework\"] --> SQL[\"SQL Server\"]\n  NET --> MSMQ[\"MSMQ 异步\"]\n  NEED[\"容器化 .NET Core\"]\n  X{{\"要可控主机网路<br/>+ 关联式 DB + 伫列\"}}\n  NEED -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  APP[\".NET Core 容器\"] --> ECS[\"ECS on EC2\"]\n  ECS --> AUR[\"Aurora MySQL<br/>Serverless v2\"]\n  ECS --> SQS[\"SQS 取代 MSMQ\"]\n  ECS --> NET[\"可控安全群组/主机\"]\n  ECS -.-> ORCH[\"任务定义编排\"]"
  },
  "347": {
    "blocker": "同一 AZ 的 placement group（放置群组：把实例放近以降低延迟）已有多机，要再加实例却 insufficient capacity。",
    "requirements": "排除容量不足、仍用原 placement group 策略。",
    "steps": [
      "停止（stop）placement group 内所有实例。",
      "再一起 start（启动时重新要容量）。",
      "重新尝试启动额外实例。",
      "若仍失败再考虑新群组或改类型／AZ。"
    ],
    "solutions": "正确答案 B。Cluster placement group 常见解法是 stop/start 整组以重新配置紧密容量。不能 merge 群组；改 spread／Dedicated Host 不对症。",
    "result_flow": "Stop 全组 → Start 重新放置 → 再 Launch 新实例 → 有机会取得连续容量。",
    "options": {
      "A": "错。改 spread 不解决 cluster 容量问题。",
      "B": "✓ 正确。Stop/start 全组后再启动。",
      "C": "错。Placement group 不能这样 merge。",
      "D": "错。Dedicated Host 非此错误标准解法。"
    },
    "diagram_before": "flowchart TB\n  PG[\"同 AZ placement group\"] --> INST[\"已有多机\"]\n  NEW[\"再加实例\"]\n  X{{\"insufficient capacity<br/>加不进去\"}}\n  NEW -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  STOP[\"Stop 全组实例\"] --> START[\"一起 Start 重放\"]\n  START --> CAP[\"重新取得紧密容量\"]\n  CAP --> LAUNCH[\"再 Launch 新实例\"]\n  LAUNCH --> OK[\"有机会成功加入\"]"
  },
  "348": {
    "blocker": "ASG 管流量尖峰；月修补要 reboot，结果 ASG 把实例当不健康砍掉，换成未修补新机，补丁白做。",
    "requirements": "修补＋重开后不要丢进度；新机也要带补丁。",
    "steps": [
      "调整 ASG 更新／替换策略，对准旧 launch configuration 替换逻辑（题库 A）。",
      "建自动化：先打好补丁的 AMI。",
      "更新 launch configuration／template。",
      "触发 instance refresh 用新映像滚动替换。"
    ],
    "solutions": "正确答案 A、D。补丁应进 AMI + refresh；并正确设定更新策略。Termination protection 会妨碍 ASG；只加 ELB 不解「换成未修补机」。",
    "result_flow": "修补管线产新 AMI → 更新启动组态 → instance refresh → 新机已含安全更新 → 重开不再回到未修补映像。",
    "options": {
      "A": "✓ 正确。Update policy 对准旧启动组态替换。",
      "B": "错。维护两套 ASG 笨重。",
      "C": "错。只加 ELB 不保证新机有补丁。",
      "D": "✓ 正确。自动打 AMI + 更新启动组态 + instance refresh。",
      "E": "错。termination protection 与 ASG 替换冲突。"
    },
    "diagram_before": "flowchart TB\n  ASG[\"ASG 管尖峰\"] --> PATCH[\"月修补要 reboot\"]\n  PATCH --> UNHEALTHY[\"ASG 当不健康\"]\n  UNHEALTHY --> REPLACE[\"换成未修补新机\"]\n  X{{\"补丁白做\"}}\n  REPLACE -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  PIPE[\"修补管线\"] --> AMI[\"打好补丁的 AMI\"]\n  AMI --> LC[\"更新 launch config\"]\n  LC --> IR[\"instance refresh\"]\n  IR --> NEW[\"新机已含安全更新\"]\n  POL[\"更新策略对准旧组态\"] --> IR"
  },
  "349": {
    "blocker": "SageMaker 在无网际网路 VPC，已有 S3／SageMaker Interface Endpoint；偶尔要装 PyPI 套件，又不能让实例上公网。",
    "requirements": "取用 PyPI、维持隔离。",
    "steps": [
      "建 CodeArtifact domain／repository。",
      "加 external connection 到 public:pypi。",
      "Python 用户端改指向 CodeArtifact。",
      "建 CodeArtifact VPC endpoint，仍无 IGW。"
    ],
    "solutions": "正确答案 D。CodeArtifact 当私有代理拉 PyPI。NAT／开网会破坏隔离；CodeCommit 同步每个包不现实。",
    "result_flow": "SageMaker pip install → VPC endpoint → CodeArtifact → （服务侧）取 public PyPI → 套件进隔离环境，实例无公网。",
    "options": {
      "A": "错。每包 CodeCommit 同步不可扩展。",
      "B": "错。NAT 等于给网际网路出路。",
      "C": "错。NAT instance 同样破坏隔离。",
      "D": "✓ 正确。CodeArtifact + pypi 外部连线 + VPC endpoint。"
    },
    "diagram_before": "flowchart TB\n  SM[\"SageMaker 无网际网路 VPC\"] --> S3EP[\"已有 S3 Endpoint\"]\n  SM --> SMEP[\"SageMaker Endpoint\"]\n  PIP[\"偶尔要装 PyPI\"]\n  X{{\"不能让实例上公网\"}}\n  PIP -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  SM[\"SageMaker pip\"] --> EP[\"CodeArtifact<br/>VPC endpoint\"]\n  EP --> CA[\"CodeArtifact repo\"]\n  CA --> EXT[\"external connection<br/>public:pypi\"]\n  EXT --> PKG[\"套件进隔离环境\"]\n  SM -.-> NOIGW[\"实例仍无公网\"]"
  },
  "350": {
    "blocker": "政府机关要求所有 EBS 快照至少再存两个额外 Region，营运负担要最低。",
    "requirements": "自动跨 Region 复制快照；最低 overhead。",
    "steps": [
      "在 Data Lifecycle Manager（DLM）建政策。",
      "排程每日执行。",
      "动作包含把快照 copy 到另外两个 Region。",
      "之后自动运行无需手写 Lambda。"
    ],
    "solutions": "正确答案 A。DLM 原生支援快照生命周期与跨区复制。Lambda 自管较重；S3 CRR 不用于 EBS 快照；Image Builder 做 AMI 非本题。",
    "result_flow": "EBS 快照产生 → DLM 政策每日 → 复制到 Region B、C → 满足多 Region 保留。",
    "options": {
      "A": "✓ 正确。DLM 自动跨 Region 复制。",
      "B": "错。自管 Lambda 营运高。",
      "C": "错。EBS 快照不是 S3 CRR 物件模型。",
      "D": "错。Image Builder 产 AMI 非要求。"
    },
    "diagram_before": "flowchart TB\n  GOV[\"政府机关\"] --> EBS[\"EBS 快照\"]\n  NEED[\"至少再存两个 Region\"]\n  X{{\"要自动复制<br/>营运负担最低\"}}\n  NEED -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  SNAP[\"EBS 快照产生\"] --> DLM[\"Data Lifecycle Manager\"]\n  DLM --> DAY[\"每日政策\"]\n  DAY --> R2[\"复制到 Region B\"]\n  DAY --> R3[\"复制到 Region C\"]\n  DLM -.-> AUTO[\"无需手写 Lambda\"]"
  },
  "351": {
    "blocker": "专案帐户因政策不能加入 Organizations；开发者乱开过大 EC2；只要允许 us-east-2 的 t3.small。",
    "requirements": "限制实例类型与 Region；帐户不在 Org 内。",
    "steps": [
      "写 IAM 政策：允许的 RunInstances 仅 t3.small 且在 us-east-2。",
      "政策附到开发者使用的角色／群组。",
      "测试其他类型／Region 会被拒。",
      "不使用 SCP（因不在 Organizations）。"
    ],
    "solutions": "正确答案 D。帐户不在 Org → SCP 无效。只能 IAM。RI 不限制启动；硬搬帐户进 Org 违反政策。",
    "result_flow": "开发者启动 EC2 → IAM 检查类型与 Region → 仅 t3.small@us-east-2 成功 → 其他拒绝。",
    "options": {
      "A": "错。政策禁止加入 Org。",
      "B": "错。不在 Org 无法有效用 SCP 挂该帐户。",
      "C": "错。RI 不阻止开错规格。",
      "D": "✓ 正确。IAM 政策限制类型与 Region。"
    },
    "diagram_before": "flowchart TB\n  ACC[\"专案帐户<br/>不能进 Organizations\"] --> DEV[\"开发者乱开过大 EC2\"]\n  NEED[\"只要 t3.small<br/>@ us-east-2\"]\n  X{{\"SCP 用不了<br/>只能帐户内控制\"}}\n  DEV -.-> X\n  NEED -.->|存在但未接上| X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  DEV[\"启动 EC2\"] --> IAM[\"IAM 政策\"]\n  IAM -->|\"t3.small + us-east-2\"| OK[\"允许\"]\n  IAM -->|\"其他类型/Region\"| DENY[\"拒绝\"]\n  IAM --> ROLE[\"附在开发者角色/群组\"]\n  DENY -.-> NOORG[\"不依赖 SCP\"]"
  },
  "352": {
    "blocker": "多雷达站上传 S3，已用复制规则整桶复到第二帐户；其中一站资料最准，要在上传后 30 分钟内完成复制并监控告警。",
    "requirements": "针对前缀加速／保证时间；监控超时。",
    "steps": [
      "新建复制规则，filter 该雷达站 key 前缀。",
      "开启 S3 Replication Time Control（RTC：可预期复制时间的功能）。",
      "监控到目的地的最大复制时间。",
      "EventBridge 规则在超过门槛时告警。"
    ],
    "solutions": "正确答案 D。RTC + 前缀规则正对 15 分钟级 SLA（题 30 分钟）。DataSync、另开桶、Transfer Acceleration 都不提供此 RTC 监控模型。",
    "result_flow": "高准雷达上传 → 前缀命中 RTC 规则 → 限时复到第二帐户 → 指标超时 → EventBridge 告警。",
    "options": {
      "A": "错。DataSync 非此跨帐户 S3 复制 RTC 场景。",
      "B": "错。另建桶拆规则无 RTC 保证。",
      "C": "错。Transfer Acceleration 不解跨帐户复制时间 SLA。",
      "D": "✓ 正确。前缀规则 + S3 RTC + 监控告警。"
    },
    "diagram_before": "flowchart TB\n  RAD[\"多雷达站\"] --> S3A[\"上传 S3\"]\n  S3A --> CRR[\"整桶复制到第二帐户\"]\n  BEST[\"一站资料最准\"]\n  X{{\"要 30 分内完成复制<br/>并监控告警\"}}\n  BEST -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  BEST[\"高准雷达上传\"] --> PRE[\"前缀规则\"]\n  PRE --> RTC[\"S3 Replication<br/>Time Control\"]\n  RTC --> DST[\"第二帐户\"]\n  RTC --> MET[\"最大复制时间指标\"]\n  MET -->|超时| EB[\"EventBridge 告警\"]"
  },
  "353": {
    "blocker": "上千 Linux/Windows 虚机、SAN、Java/PHP/MySQL/Oracle，文件过时，相依复杂；要摸清现况并估云成本。",
    "requirements": "探索环境、准备度／成本评估、迁移规划工具。",
    "steps": [
      "用 Application Discovery Service 收集伺服器与相依。",
      "用 Cloud Adoption Readiness Tool（CART）评估准备度。",
      "用 Migration Hub 汇总迁移专案视图。",
      "据此估资源与成本、排波次。"
    ],
    "solutions": "正确答案 A、D、F。Discovery + CART + Migration Hub。SMS 是搬迁；X-Ray 是应用追踪；Inspector 是漏洞扫描。",
    "result_flow": "Discovery 收集 → Migration Hub 可视化 → CART 准备度／成本洞察 → 产出迁移计划与粗估。",
    "options": {
      "A": "✓ 正确。Application Discovery Service。",
      "B": "错。SMS 偏搬迁执行。",
      "C": "错。X-Ray 非资料中心盘点。",
      "D": "✓ 正确。CART。",
      "E": "错。Inspector 非迁移盘点主工具。",
      "F": "✓ 正确。Migration Hub。"
    },
    "diagram_before": "flowchart TB\n  FLEET[\"上千 Linux/Windows\"] --> SAN[\"SAN 储存\"]\n  APP[\"Java/PHP/MySQL/Oracle\"]\n  DOC[\"文件过时 相依复杂\"]\n  X{{\"要摸清现况<br/>并估云成本\"}}\n  DOC -.-> X\n  APP -.->|存在但未接上| X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  ADS[\"Application Discovery\"] --> DATA[\"伺服器与相依\"]\n  DATA --> MH[\"Migration Hub\"]\n  CART[\"CART 准备度\"] --> PLAN[\"迁移/成本洞察\"]\n  MH --> PLAN\n  PLAN --> WAVE[\"波次与粗估\"]"
  },
  "354": {
    "blocker": "上线前检视：ASG min=max=1 单机、单 NAT、RDS 单 AZ；VPC 虽有三 AZ 子网，但架构仍怕单点。",
    "requirements": "应用跨多 AZ 可持续运作。",
    "steps": [
      "其他 AZ 也部署 NAT Gateway，更新路由。",
      "RDS 改 Multi-AZ。",
      "ASG 跨三 AZ 启动，min=max=3。",
      "避免单一 AZ 挂了整站挂。"
    ],
    "solutions": "正确答案 A。NAT／RDS／计算三层都要去单点。VGW 不替代 NAT 出网；换 PostgreSQL 无关；ASG 维持 1 仍单点。",
    "result_flow": "流量到三 AZ 各一实例 → 私网出网走各 AZ NAT → RDS Multi-AZ 备援 → 任一 AZ 故障仍有其他 AZ 服务。",
    "options": {
      "A": "✓ 正确。多 NAT + RDS Multi-AZ + ASG=3 跨 AZ。",
      "B": "错。VGW 不解私网出网 NAT 需求。",
      "C": "错。换引擎与 NAT instance 无意义。",
      "D": "错。ASG 维持 1 仍是计算单点。"
    },
    "diagram_before": "flowchart TB\n  ASG[\"ASG min=max=1\"] --> ONE[\"单机\"]\n  NAT[\"单一 NAT\"]\n  RDS[\"RDS 单 AZ\"]\n  VPC[\"VPC 虽有三 AZ 子网\"]\n  X{{\"计算/出网/资料库<br/>全是单点\"}}\n  ONE -.-> X\n  NAT -.->|存在但未接上| X\n  RDS -.->|存在但未接上| X\n  VPC -.->|存在但未接上| X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  ASG[\"ASG min=max=3<br/>跨三 AZ\"] --> APP[\"各 AZ 一实例\"]\n  NAT[\"每 AZ 一个 NAT\"] --> OUT[\"私网出网\"]\n  RDS[\"RDS Multi-AZ\"] --> HA[\"备援故障转移\"]\n  APP --> RDS\n  FAIL[\"任一 AZ 挂\"] -.-> OK[\"其他 AZ 仍服务\"]"
  },
  "355": {
    "blocker": "交易处理 Docker 在地端 VM，容器共享储存记交易；流量难测、低延迟、要自动扩吞吐；不能再开发、也不想继续管 Docker 主机。",
    "requirements": "托管容器、共享档储存、自动扩、低延迟。",
    "steps": [
      "容器改跑 ECS on Fargate（无伺服器容器，不管 EC2）。",
      "建 EFS 作共享档案系统。",
      "Task definition 挂 EFS volume。",
      "Fargate／EFS 随负载扩吞吐。"
    ],
    "solutions": "正确答案 B。Fargate+EFS 共享符合「不能再管 Docker 主机」。EKS 要管较多；EBS 难多任务共享；自管 EC2 Docker 违反要求。",
    "result_flow": "交易请求 → Fargate 任务 → 共享 EFS 记交易 → 尖峰自动加任务，储存吞吐跟需求走。",
    "options": {
      "A": "错。S3 非低延迟共享档系统模型；EKS 较重。",
      "B": "✓ 正确。Fargate + EFS volume。",
      "C": "错。EBS 不适合多任务共享同一交易档储。",
      "D": "错。仍自管 EC2 Docker。"
    },
    "diagram_before": "flowchart TB\n  TX[\"交易 Docker\"] --> VM[\"地端 VM\"]\n  SHARE[\"容器共享储存记交易\"]\n  NEED[\"低延迟自动扩\"]\n  X{{\"不能再开发<br/>也不想管 Docker 主机\"}}\n  VM -.-> X\n  NEED -.->|存在但未接上| X\n  SHARE -.->|存在但未接上| X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  REQ[\"交易请求\"] --> FG[\"ECS on Fargate\"]\n  FG --> EFS[\"EFS 共享档\"]\n  EFS --> TX[\"记交易\"]\n  FG -->|尖峰| SCALE[\"自动加任务\"]\n  FG -.-> NOHOST[\"不管 EC2/Docker 主机\"]"
  },
  "356": {
    "blocker": "Windows/Linux 实体与虚拟机、多种 DB，没有准确清单；要 rightsizing，还要网路连线与应用关系，才能写迁移计划。",
    "requirements": "盘点、相依、策略建议报告。",
    "steps": [
      "用 Migration Hub，在伺服器装 Application Discovery Agent（较完整收集行程／网路）。",
      "部署 Strategy Recommendations 资料收集器。",
      "产生 Strategy Recommendations 报告。",
      "依报告做 rightsizing 与波次计划。"
    ],
    "solutions": "正确答案 B。Agent + Strategy Recommendations 才能给应用关系与迁移策略。仅 Agentless／手动 import 资讯较薄；MGN 分组不是策略报告主工具。",
    "result_flow": "Discovery Agent 收集 → Migration Hub 汇总 → Strategy Recommendations 报告 → 权利规模与迁移路径建议。",
    "options": {
      "A": "错。Evaluator 路径不完整满足应用关系需求。",
      "B": "✓ 正确。Agent + Strategy Recommendations。",
      "C": "错。Agentless + MGN 分组非完整策略。",
      "D": "错。手动 import 缺即时收集深度。"
    },
    "diagram_before": "flowchart TB\n  MIX[\"Windows/Linux<br/>实体+虚拟机\"] --> DB[\"多种 DB\"]\n  NO[\"没有准确清单\"]\n  X{{\"要 rightsizing<br/>+ 网路/应用关系\"}}\n  NO -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  AGENT[\"Discovery Agent\"] --> MH[\"Migration Hub\"]\n  COL[\"Strategy Recommendations<br/>资料收集器\"] --> RPT[\"策略报告\"]\n  MH --> RPT\n  RPT --> SIZE[\"rightsizing 建议\"]\n  RPT --> WAVE[\"迁移路径与波次\"]"
  },
  "357": {
    "blocker": "金融 SaaS 公司用 AWS Organizations（组织：一次管理多个帐户）管住好多帐户，全球都有资源。合规要求必须稽核所有 AWS API 呼叫、追踪变更，并把日志永久安全存放，但而家未有「一次管晒全部帐户」嘅低维护做法。",
    "requirements": "1) 稽核组织内所有帐户嘅 API 活动；2) 日志要耐用、可加密、防误删；3) 涵盖所有 Region（区域）；4) 营运负担最低。",
    "steps": [
      "喺 Organizations 管理帐户建立一条 Organization Trail（组织级操作日志）。",
      "将 Trail 部署到所有 AWS Region，确保全球资源都被记录。",
      "建立专用 S3 储存贮体（物件储存桶）存放日志，开启版本控制。",
      "对 S3 启用加密同 MFA Delete（删除前要多重要素验证），防止日志被误删或篡改。",
      "确认成员帐户自动被纳入，无需逐帐户再开 Trail。"
    ],
    "solutions": "正确答案 C。核心系「管理帐户一条 Organization Trail + 新 S3 桶（版本控制）+ 全 Region + 加密／MFA Delete」。呢个系多帐户稽核嘅标准、最低营运负担做法；唔好每个成员帐户各自开 Trail。",
    "result_flow": "任何帐户／Region 嘅 API 呼叫 → CloudTrail Organization Trail 自动撷取 → 集中写入管理帐户加密 S3 桶（有版本控制）→ 合规团队可稽核变更历史与操作纪录。",
    "options": {
      "A": "错。用管理帐户既有 S3 桶可能得，但描述未明确做成涵盖所有成员帐户嘅 Organization Trail，方案不完整。",
      "B": "错。每个成员帐户各自建 Trail 同 S3 桶，管理分散、成本高、营运负担大。",
      "C": "✓ 正确。管理帐户 Organization Trail、全帐户全 Region、集中 S3（版本控制＋加密＋MFA Delete），合规兼最简。",
      "D": "错。加 SNS 通知外部系统增加复杂度，亦未解决「组织级集中稽核＋安全持久保存」核心。"
    },
    "diagram_before": "flowchart TB\n  Org[\"Organizations 多帐户\"]\n  Acc[\"各成员帐户全球资源\"]\n  API[\"AWS API 呼叫／变更\"]\n  X{{\"缺口: 无组织级集中<br/>稽核与安全日志\"}}\n  Org --> Acc --> API\n  API -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  API[\"任何帐户／Region API\"]\n  Trail[\"管理帐户<br/>Organization Trail\"]\n  S3[\"集中 S3 桶<br/>版本控制+加密+MFA Delete\"]\n  Audit[\"合规团队稽核\"]\n  API --> Trail --> S3 --> Audit"
  },
  "358": {
    "blocker": "公司要喺 EC2（虚拟伺服器）上跑分散式记忆体资料库：1 个主节点 + 8 个工作节点，节点之间要互相复制分区。而家最大卡点系：节点之间网络延迟要尽量低，否则效能上唔去。",
    "requirements": "1) 用合适实例类型应付记忆体密集负载；2) 节点间通讯延迟最低；3) 达到最大效能。",
    "steps": [
      "选择 memory optimized（记忆体最佳化）EC2 实例，满足 in-memory 资料库需求。",
      "建立 cluster placement group（丛集置放群组：把机器放喺同一可用区、硬件尽量接近）。",
      "将主节点同 8 个工作节点全部放进同一个 cluster placement group。",
      "验证节点间延迟是否达预期，再开启资料分区复制。"
    ],
    "solutions": "正确答案 C。记忆体资料库要「大记忆体 + 极低延迟」：memory optimized 实例配 cluster placement group 系标准组合。partition／spread 置放群组系为隔离或大规模分散，延迟反而较高。",
    "result_flow": "客户请求 → 主节点接收与分发 → 工作节点喺 cluster placement group 内以最低延迟互相同步分区 → 主节点汇总回复客户。",
    "options": {
      "A": "错。memory optimized 啱，但 partition placement group 跨 partition 延迟高过 cluster，唔适合极低延迟丛集。",
      "B": "错。compute optimized 唔系记忆体密集首选；partition 延迟亦较高。",
      "C": "✓ 正确。cluster placement group + memory optimized 同时满足记忆体与最低网络延迟。",
      "D": "错。spread 强调故障隔离分散，唔追求最低延迟；compute optimized 亦不适合。"
    },
    "diagram_before": "flowchart TB\n  Client[\"客户请求\"]\n  Primary[\"主节点 EC2\"]\n  Workers[\"8 个工作节点\"]\n  X{{\"缺口: 节点间延迟高<br/>记忆体库效能差\"}}\n  Client --> Primary --> Workers\n  Workers -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  Client[\"客户请求\"]\n  Primary[\"主节点<br/>memory optimized\"]\n  CPG[\"Cluster Placement Group<br/>同 AZ 极低延迟\"]\n  Workers[\"8 工作节点互相同步\"]\n  Reply[\"汇总回复客户\"]\n  Client --> Primary --> CPG --> Workers --> Reply"
  },
  "359": {
    "blocker": "地端约 100 万个 CSV（约 10TB，每周再增 1TB）要每日备份上云。已有 Direct Connect（专线），但需要自订筛选只备份指定目录，又想营运负担最低，唔想自己写大量程式。",
    "requirements": "1) 每日自动备份；2) 支援目录筛选；3) 走已有专线；4) 营运负担最低。",
    "steps": [
      "喺地端 hypervisor 安装 DataSync agent（资料同步代理程式）。",
      "建立 DataSync 任务，来源系地端档案系统，目的地系 S3。",
      "设定 include／exclude 筛选，只同步指定目录子集。",
      "将任务排程为每日执行，并透过 Direct Connect 传输。",
      "监控任务完成状态与传输量。"
    ],
    "solutions": "正确答案 C。DataSync 专为大量档案、排程、筛选、专线传输而设，托管服务所以维护最少。Snowball 适合一次性海量搬家；AWS Backup 唔系为呢种地端档案筛选场景而设。",
    "result_flow": "每日排程 → DataSync agent 按筛选读地端目录 → 经 Direct Connect → 写入 S3；新增／变更档案增量同步，唔使每次全量重传。",
    "options": {
      "A": "错。自订 CopyObject API 要大量开发维护，筛选同每日增量都要自己做。",
      "B": "错。AWS Backup 主要面向 AWS 资源，唔适合大量地端档案系统自订筛选备份。",
      "C": "✓ 正确。DataSync agent + 筛选 + 每日任务 + DX，营运负担最低。",
      "D": "错。Snowball 适合初始大批迁移，每日增量用 DataSync 就够；混合方案多余。"
    },
    "diagram_before": "flowchart TB\n  OnPrem[\"地端 100 万 CSV<br/>约 10TB + 每周 1TB\"]\n  Filter[\"要自订目录筛选\"]\n  DX[\"已有 Direct Connect\"]\n  X{{\"缺口: 每日筛选备份<br/>又唔想自己写程式\"}}\n  OnPrem --> Filter --> DX\n  DX -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  Sched[\"每日排程\"]\n  Agent[\"DataSync agent<br/>include/exclude 筛选\"]\n  DX[\"Direct Connect\"]\n  S3[\"写入 S3 增量同步\"]\n  Sched --> Agent --> DX --> S3"
  },
  "360": {
    "blocker": "金融公司要畀三种角色用 EMR（大数据丛集）做问卷分析：管理员开丛集、工程师处理、分析师查询。需要最小权限、只能启动核准版本／组态、仲要强制资源标签，而家未有统一自助治理。",
    "requirements": "1) 角色分离、最小权限；2) 只准启动核准 EMR 版本与组态；3) 强制标签；4) 集中治理。",
    "steps": [
      "用 AWS Service Catalog（服务目录：预先核准可启动嘅产品清单）封装 EMR 产品。",
      "控制可用 EMR 版本、丛集组态同启动参数。",
      "按 Administrator／Data engineer／Data analyst 分 portfolio 同权限。",
      "用 launch constraints 同 TagOption 强制标签与角色权限。",
      "使用者只从目录启动，唔再直接乱开 EMR。"
    ],
    "solutions": "正确答案 C。Service Catalog 系企业自助开 EMR 嘅标准治理做法：版本、权限、标签一次管晒。纯 IAM + Config 只系事后发现；Kerberos 只解决丛集内验证。",
    "result_flow": "使用者选角色对应产品 → Service Catalog 检查权限与标签约束 → 以核准组态启动 EMR → 各角色只能做自己被允许嘅动作。",
    "options": {
      "A": "错。IAM 角色＋Config 可定义动作与事后检查，但唔能限制只启动核准 EMR 产品目录。",
      "B": "错。Kerberos 解决丛集内部验证，唔解决角色自助治理与标签强制。",
      "C": "✓ 正确。Service Catalog 集中管版本、组态、权限与标签。",
      "D": "错。CloudFormation＋resource policy＋Config 仍难强制「只准核准产品」同完整自助治理。"
    },
    "diagram_before": "flowchart TB\n  Roles[\"管理员／工程师／分析师\"]\n  EMR[\"EMR 问卷分析丛集\"]\n  Tag[\"要版本核准＋强制标签\"]\n  X{{\"缺口: 无最小权限自助<br/>治理平台\"}}\n  Roles --> EMR\n  Tag -.-> EMR\n  EMR -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  User[\"使用者选角色产品\"]\n  SC[\"Service Catalog<br/>核准版本+标签约束\"]\n  EMR[\"以核准组态启动 EMR\"]\n  Act[\"各角色最小权限操作\"]\n  User --> SC --> EMR --> Act"
  },
  "361": {
    "blocker": "SaaS 用 PrivateLink（私有连线服务）喺 eu-west-2 提供服务（EC2 喺 NLB 后面）。新客户喺 us-east-1，已建跨 Region VPC peering，但唔想即刻喺 us-east-1 再部署一套 EC2 应用。",
    "requirements": "1) 让 us-east-1 客户用 PrivateLink 连服务；2) 唔使喺 us-east-1 部署应用 EC2；3) 沿用现有 eu-west-2 实例。",
    "steps": [
      "喺 us-east-1 建立 NLB（Network Load Balancer，网络负载平衡器）。",
      "建立 IP 类型 target group，目标填 eu-west-2 服务实例嘅私有 IP。",
      "确保跨 Region peering／路由令 NLB 可到达呢啲 IP。",
      "用呢个 NLB 建立 us-east-1 嘅 PrivateLink endpoint service。",
      "授权客户帐户连接 endpoint 使用服务。"
    ],
    "solutions": "正确答案 B。PrivateLink endpoint service 必须同 Region 有 NLB；用 IP target group 指向远端实例，就唔使本地再部署应用。唔可以用另一 Region 嘅 NLB 直接做本 Region endpoint service；ALB 亦唔能做 NLB 嘅 target。",
    "result_flow": "us-east-1 客户 VPC endpoint → 本地 NLB → 经跨 Region 连线转去 eu-west-2 实例 IP → 回传 SaaS 回应。",
    "options": {
      "A": "错。唔能喺 us-east-1 建立 endpoint service 直接挂 eu-west-2 嘅 NLB。",
      "B": "✓ 正确。本地 NLB + IP target 指向远端实例，再做 PrivateLink。",
      "C": "错。ALB 唔能作为 NLB target group 成员，架构不可行。",
      "D": "错。RAM 唔能把 EC2 分享出去做另一 Region NLB 嘅 instance target。"
    },
    "diagram_before": "flowchart TB\n  Client[\"us-east-1 客户\"]\n  Peer[\"跨 Region VPC Peering\"]\n  SaaS[\"eu-west-2 SaaS<br/>EC2 + NLB PrivateLink\"]\n  X{{\"缺口: 客户唔想喺 us-east-1<br/>再部署一套应用\"}}\n  Client --> Peer --> SaaS\n  Client -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  EP[\"us-east-1<br/>VPC Endpoint\"]\n  NLB[\"本 Region NLB<br/>IP target group\"]\n  Link[\"跨 Region 连线\"]\n  Inst[\"eu-west-2 既有 EC2\"]\n  EP --> NLB --> Link --> Inst"
  },
  "362": {
    "blocker": "公司两个 Region 有愈来愈多 S3 桶，要睇有几多桶、物件加密比例，仲要畀合规团队睇仪表板。而家若果自己写脚本统计会好重维护。",
    "requirements": "1) 跨 Region 睇 bucket 数量；2) 追踪加密比例；3) 合规仪表板；4) 营运负担最低。",
    "steps": [
      "开启并使用 S3 Storage Lens（S3 储存分析仪表板）预设仪表板。",
      "确认仪表板已涵盖需要嘅帐户／Region 指标。",
      "畀合规团队 S3 主控台存取权睇 Storage Lens。",
      "定期用内建加密与 bucket 指标做合规检视，无需自建 ETL。"
    ],
    "solutions": "正确答案 C。Storage Lens 内建跨帐户／跨 Region 储存与加密指标，开箱即用。自建 Lambda＋Athena＋QuickSight 或 CloudTrail 事件统计都贵维护。",
    "result_flow": "S3 使用情况自动汇总 → Storage Lens 预设仪表板显示 bucket 数与加密比例 → 合规团队喺 S3 主控台直接查看。",
    "options": {
      "A": "错。每 Region 自建再汇总去 QuickSight，整合与维护成本高。",
      "B": "错。Lambda 列举＋Athena＋QuickSight 要自订开发与排程。",
      "C": "✓ 正确。Storage Lens 预设仪表板最少营运负担。",
      "D": "错。CloudTrail 只记 API 事件，要自己计加密比例，好重。"
    },
    "diagram_before": "flowchart TB\n  Buckets[\"多 Region 多 S3 桶\"]\n  Need[\"要桶数＋加密比例\"]\n  Team[\"合规团队要仪表板\"]\n  X{{\"缺口: 自写脚本统计<br/>维护太重\"}}\n  Buckets --> Need\n  Team --> Need\n  Need -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  Use[\"S3 使用自动汇总\"]\n  Lens[\"S3 Storage Lens<br/>跨帐户／Region\"]\n  Dash[\"预设仪表板<br/>桶数+加密比例\"]\n  Team[\"合规团队主控台查看\"]\n  Use --> Lens --> Dash --> Team"
  },
  "363": {
    "blocker": "CISO 要求漏洞修补要又快又少停机，出错要即刻回滚。而家 Web 喺 ALB 后面嘅 EC2 机队，CI/CD 用 GitHub + CodePipeline + CodeBuild，但部署策略未达「可快速回滚」。",
    "requirements": "1) 修补部署尽快；2) 停机最少；3) 出错可快速回滚。",
    "steps": [
      "CodePipeline 建置通过后，部署阶段改用 CodeDeploy。",
      "将 CodeDeploy 设定为 blue/green（蓝绿部署：新旧两套环境，流量再切换）。",
      "新版本健康后先切流量；出问题就手动触发 CodeDeploy 回滚。",
      "持续监控新版本指标，确认稳定后再清理旧环境。"
    ],
    "solutions": "正确答案 B。blue/green 可比 in-place（原地覆盖）更快回滚，因为旧环境仲喺，一切换就返。CloudFormation 整 stack 换同 OpsWorks in-place 都唔系最快回滚。",
    "result_flow": "程式码合并 → CodePipeline／CodeBuild → CodeDeploy 起 green 环境 → 健康检查通过后切流量 → 异常则一键回滚返 blue。",
    "options": {
      "A": "错。in-place 停机较多，回滚要再推一版，唔够快。",
      "B": "✓ 正确。blue/green 支援快速流量切换与手动回滚。",
      "C": "错。CloudFormation 换 stack 回滚通常较慢，唔系应用层快速修补首选。",
      "D": "错。OpsWorks + in-place 同样难快速回滚。"
    },
    "diagram_before": "flowchart TB\n  Git[\"GitHub + CodePipeline\"]\n  Build[\"CodeBuild\"]\n  Fleet[\"ALB 后 EC2 机队\"]\n  X{{\"缺口: 修补部署<br/>难快速回滚\"}}\n  Git --> Build --> Fleet\n  Fleet -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  Code[\"程式码合并\"]\n  Pipe[\"CodePipeline／CodeBuild\"]\n  CD[\"CodeDeploy blue/green\"]\n  Green[\"健康检查后切流量\"]\n  Roll[\"异常一键回滚 blue\"]\n  Code --> Pipe --> CD --> Green\n  Green -.-> Roll"
  },
  "364": {
    "blocker": "Organizations 多帐户下，所有 EC2 都要有 BusinessUnit 标签先好计成本。审计发现有遗漏，人手补咗，但未来仲会有人唔带标签就开机。",
    "requirements": "1) 强制未来建立 EC2 时必须带 BusinessUnit 标签；2) 组织层级生效；3) 预防性控制，唔只事后报告。",
    "steps": [
      "撰写 SCP（Service Control Policy，组织禁止规则：下层帐户改不掉）。",
      "条件设为：若 aws:RequestTag/BusinessUnit 为 null，就 Deny ec2:RunInstances。",
      "将 SCP 附加到组织 root，覆盖所有成员帐户。",
      "抽样验证：唔带标签开机会失败，有标签可成功。"
    ],
    "solutions": "正确答案 C。SCP Deny + Null 条件可喺 API 层直接挡无标签建立。Tag policy 多用于报告／规范标签，唔似 SCP 咁硬挡；附加到管理帐户而唔系 root 亦覆盖唔到成员。",
    "result_flow": "使用者呼叫 RunInstances → Organizations 评估 root SCP → 无 BusinessUnit 标签即拒绝 → 有标签先准建立 → 成本可按业务单位归类。",
    "options": {
      "A": "错。Tag policy 可提升合规可见性，但唔如 SCP 直接拒绝建立。",
      "B": "错。附加到管理帐户方向错；tag policy 亦唔能硬挡 API。",
      "C": "✓ 正确。SCP 在 root 以 Null 条件强制 BusinessUnit 标签。",
      "D": "错。条件逻辑错误，且附加到管理帐户无法覆盖成员帐户。"
    },
    "diagram_before": "flowchart TB\n  Org[\"Organizations 多帐户\"]\n  EC2[\"建立 EC2\"]\n  Tag[\"BusinessUnit 标签\"]\n  X{{\"缺口: 仍可无标签开机<br/>成本难归类\"}}\n  Org --> EC2\n  EC2 -.->|常缺| Tag\n  EC2 -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  Call[\"RunInstances 呼叫\"]\n  SCP[\"Root SCP<br/>Deny 若缺标签\"]\n  Ok[\"有 BusinessUnit 先准建\"]\n  Cost[\"成本按业务单位归类\"]\n  Call --> SCP --> Ok --> Cost"
  },
  "365": {
    "blocker": "成千 EC2 要全面转 IPv6。公有子网已有 IGW，私有子网 IPv4 靠 NAT。私有子网实例唔可以俾公网入站存取，但又要可以对外连线；NAT Gateway 唔支援 IPv6 出站。",
    "requirements": "1) VPC／子网关联 IPv6；2) 私有子网不可从公网入站；3) 私有子网仍可 IPv6 出站。",
    "steps": [
      "为 VPC 与所有子网关联 Amazon 提供的 IPv6 CIDR。",
      "建立 egress-only internet gateway（只出站网关：IPv6 可出不可入）。",
      "私有子网路由表加入 ::/0 指向 egress-only IGW。",
      "确认实例取得 IPv6 地址后可出站，且外网不能直接入站连入。"
    ],
    "solutions": "正确答案 C。IPv6 私有出站标准系 egress-only IGW，唔系 NAT Gateway，亦唔好把 ::/0 指去普通 IGW（会变成可被公网存取）。",
    "result_flow": "私有子网 EC2（IPv6）→ 路由 ::/0 → egress-only IGW → 互联网出站；外来 IPv6 入站被挡，维持「私有」。",
    "options": {
      "A": "错。::/0 指 IGW 会令实例可被公网 IPv6 存取，违反私有要求。",
      "B": "错。NAT Gateway 唔支援 IPv6 出站。",
      "C": "✓ 正确。Amazon IPv6 CIDR + egress-only IGW 系标准做法。",
      "D": "错。NAT 唔支援 IPv6；自订 IPv6 CIDR 亦非必要。"
    },
    "diagram_before": "flowchart TB\n  Pub[\"公有子网 + IGW\"]\n  Priv[\"私有子网 IPv4 靠 NAT\"]\n  V6[\"要全面转 IPv6\"]\n  X{{\"缺口: NAT 唔支援 IPv6 出站<br/>又唔可公网入站\"}}\n  Pub --> Priv\n  V6 --> X\n  Priv -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  EC2[\"私有子网 EC2<br/>IPv6\"]\n  Route[\"路由 ::/0\"]\n  EIGW[\"Egress-only IGW\"]\n  Net[\"互联网出站<br/>入站被挡\"]\n  EC2 --> Route --> EIGW --> Net"
  },
  "366": {
    "blocker": "公司建咗 private REST API（API Gateway 私有 API），理论上只准 VPC 内应用存取，但 VPC 内 EC2 实际连唔到。",
    "requirements": "1) 只准指定 VPC 内存取；2) EC2 可正常呼叫 API；3) 用正确私有连线与授权。",
    "steps": [
      "建立 API Gateway 的 interface VPC endpoint（介面端点：VPC 内私有连 API）。",
      "启用 endpoint 的 private DNS，令 execute-api 域名解析到端点。",
      "endpoint policy 允许 execute-api:Invoke。",
      "API resource policy 限制只接受来自该 VPC endpoint 的请求。",
      "从 EC2 再测 API 连线。"
    ],
    "solutions": "正确答案 B。私有 API 标准三件套：interface endpoint + private DNS + resource policy 限 VPC endpoint。VPC link＋NLB／ALB 系「API 去连后端」，方向唔同。",
    "result_flow": "EC2 呼叫私有 API DNS → private DNS 指到 interface endpoint → 经 PrivateLink 到 API Gateway → resource policy 验证 endpoint 后回传资料。",
    "options": {
      "A": "错。停用 private DNS 令解析困难；apigateway:* 过宽；resource policy 亦唔正确。",
      "B": "✓ 正确。interface endpoint + private DNS + execute-api:Invoke + resource policy。",
      "C": "错。NLB + VPC link 用嚟整合私有后端，唔系让 EC2 存取私有 API。",
      "D": "错。ALB + VPC link 同样系后端整合，解决唔到私有 API 连入。"
    },
    "diagram_before": "flowchart TB\n  EC2[\"VPC 内 EC2\"]\n  API[\"private REST API<br/>API Gateway\"]\n  Policy[\"理论只准 VPC 内存取\"]\n  X{{\"缺口: 实际 EC2 连唔到\"}}\n  EC2 -.-> API\n  Policy --> API\n  EC2 -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  EC2[\"EC2 呼叫私有 DNS\"]\n  DNS[\"Private DNS → Interface EP\"]\n  PL[\"PrivateLink\"]\n  APIGW[\"API Gateway 私有 API\"]\n  Pol[\"Resource policy 验 endpoint\"]\n  EC2 --> DNS --> PL --> APIGW --> Pol"
  },
  "367": {
    "blocker": "两间公司合并，各业务单位有自己 AWS 帐户。已用 Organizations 由管理帐户邀请全部成员帐户，下一步要集中管帐单同存取政策，但未建立管理帐户进入成员帐户嘅标准角色。",
    "requirements": "1) 集中帐单；2) 集中管理存取；3) 管理帐户可进入各成员帐户操作。",
    "steps": [
      "喺每个成员帐户建立 OrganizationAccountAccessRole（组织帐户存取角色）。",
      "信任政策允许管理帐户 assume（暂时借用）呢个角色。",
      "畀角色足够管理权限以执行集中政策。",
      "由管理帐户 switch role 进入成员帐户验证可管理资源。"
    ],
    "solutions": "正确答案 C。Organizations 标准跨帐户管理靠成员帐户入面嘅 OrganizationAccountAccessRole，由管理帐户 assume。唔系 group、唔系只建 policy，亦唔应喺管理帐户建呢个角色再派畀各管理员。",
    "result_flow": "管理帐户管理员 → AssumeRole 到成员帐户 OrganizationAccountAccessRole → 集中配置政策与资源 → Organizations 合并帐单。",
    "options": {
      "A": "错。OrganizationAccountAccess 系 role 唔系 group。",
      "B": "错。应建立 role，唔只 policy。",
      "C": "✓ 正确。成员帐户建 OrganizationAccountAccessRole 畀管理帐户 assume。",
      "D": "错。角色应建喺成员帐户，唔系管理帐户。"
    },
    "diagram_before": "flowchart TB\n  Mgmt[\"管理帐户<br/>已邀请成员帐户\"]\n  Mem[\"各业务单位帐户\"]\n  Bill[\"要集中帐单与存取\"]\n  X{{\"缺口: 未建标准跨帐户角色\"}}\n  Mgmt --> Mem\n  Bill -.-> Mgmt\n  Mgmt -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  Admin[\"管理帐户管理员\"]\n  Role[\"Assume<br/>OrganizationAccountAccessRole\"]\n  Mem[\"成员帐户配置政策\"]\n  Bill[\"Organizations 合并帐单\"]\n  Admin --> Role --> Mem --> Bill"
  },
  "368": {
    "blocker": "容器化应用同 Kafka 都跑喺有公网 IP 嘅 EC2，PostgreSQL 已上 RDS。旗舰产品即将发布，订单会急升；而家自管 Kafka／节点营运重，扩展吃力。",
    "requirements": "1) 降低营运负担；2) 支援流量高峰扩展；3) 应用、讯息、静态内容一并优化。",
    "steps": [
      "应用改部署到 EKS（托管 Kubernetes）并用 Fargate（唔使自己管节点）自动扩展。",
      "前置 ALB 承接流量。",
      "Kafka 迁到 Amazon MSK（托管 Kafka）。",
      "RDS 加 read replica 分担读取。",
      "静态内容用 CloudFront（全球内容加速）分发。"
    ],
    "solutions": "正确答案 D。EKS Fargate + MSK + CloudFront 把运算、讯息、静态内容都托管化，营运最轻又可扩展。继续自建 Kafka on EC2 或自建 K8s 节点负担仍然高。",
    "result_flow": "用户请求 → ALB／CloudFront → EKS Fargate 自动扩展处理 → MSK 传讯息 → RDS（含 read replica）→ 高峰时自动撑住订单量。",
    "options": {
      "A": "错。自建 Kafka on EC2 营运重；只加 read replica 未必够写入高峰。",
      "B": "错。EC2 Auto Scaling 仍要自己管 Kafka 丛集。",
      "C": "错。自建 K8s on EC2 仍要管丛集与节点。",
      "D": "✓ 正确。EKS Fargate + MSK + CloudFront 最完整降低营运负担。"
    },
    "diagram_before": "flowchart TB\n  App[\"容器 App on EC2<br/>有公网 IP\"]\n  Kafka[\"自管 Kafka on EC2\"]\n  RDS[\"PostgreSQL RDS\"]\n  X{{\"缺口: 旗舰发布订单急升<br/>自管扩展吃力\"}}\n  App --> Kafka --> RDS\n  App -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  User[\"用户请求\"]\n  Edge[\"CloudFront + ALB\"]\n  EKS[\"EKS Fargate 自动扩展\"]\n  MSK[\"Amazon MSK\"]\n  DB[\"RDS + Read Replica\"]\n  User --> Edge --> EKS --> MSK --> DB"
  },
  "369": {
    "blocker": "员工用公司地端 VPN 去攞 Windows 家目录，遥距人数大增，进入资料中心频宽日间打满 100%。要减少入 DC 流量、支援遥距成长，又要低营运负担（选两项）。",
    "requirements": "1) 减少进入资料中心频宽；2) 支援更多遥距员工；3) 降低营运负担。",
    "steps": [
      "把 Windows 家目录迁移到 Amazon FSx for Windows File Server（托管 Windows 档案服务）。",
      "遥距用户改用 AWS Client VPN（客户端 VPN）直连 AWS。",
      "用户不再经地端 VPN 绕路攞档案。",
      "验证家目录存取同频宽下降。"
    ],
    "solutions": "正确答案 B、D。家目录上 FSx for Windows，遥距用 Client VPN 直连 AWS，流量唔再塞爆资料中心。FSx for Lustre 偏 HPC；Volume Gateway 偏备份；DX 贵又慢建。",
    "result_flow": "遥距员工 → AWS Client VPN → 直达 AWS → FSx for Windows 家目录；地端 VPN／DC 频宽明显下降。",
    "options": {
      "A": "错。Volume Gateway 主要帮备份到 S3，唔系取代 Windows 家目录共享。",
      "B": "✓ 正确。FSx for Windows 托管 SMB 家目录。",
      "C": "错。FSx for Lustre 适合高效能运算，唔适合 Windows 家目录。",
      "D": "✓ 正确。Client VPN 令用户直连 AWS，减少经 DC 流量。",
      "E": "错。Direct Connect 成本高、建置长，唔能快速解决。"
    },
    "diagram_before": "flowchart TB\n  Remote[\"遥距员工大增\"]\n  VPN[\"地端 VPN 入 DC\"]\n  Home[\"Windows 家目录\"]\n  X{{\"缺口: DC 频宽日间打满<br/>100%\"}}\n  Remote --> VPN --> Home\n  VPN -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  Staff[\"遥距员工\"]\n  CVPN[\"AWS Client VPN\"]\n  FSx[\"FSx for Windows<br/>家目录\"]\n  DC[\"地端 DC 流量下降\"]\n  Staff --> CVPN --> FSx\n  CVPN -.-> DC"
  },
  "370": {
    "blocker": "多帐户审计发现好多未加密 EBS（硬碟卷）挂喺 EC2。未加密卷要加密，未来要自动侦测，仲想用集中合规方式管多帐户（选两项）。注意：EBS 唔可以「就地」加密。",
    "requirements": "1) 加密现有未加密卷；2) 自动侦测／强制未来合规；3) 多帐户集中安全合规管理。",
    "steps": [
      "对每个未加密卷建立 snapshot（快照）。",
      "由 snapshot 建立新的加密卷，置换原卷（卸载旧、挂新）。",
      "建立 Organizations 并启用 Control Tower。",
      "开启 mandatory controls（强制护栏）侦测／约束未加密 EBS。",
      "帐户入组织并分类管理。"
    ],
    "solutions": "正确答案 C、D。现有卷：snapshot → 加密卷替换。未来：Control Tower mandatory guardrails 集中合规。就地加密脚本不可行；strongly recommended 不如 mandatory 严。",
    "result_flow": "未加密卷 → snapshot → 加密新卷替换；同时 Control Tower 强制护栏 → 多帐户持续侦测未加密 EBS → 合规集中可见。",
    "options": {
      "A": "错。strongly recommended 不如 mandatory；亦未完整解决现有卷加密流程描述重点。",
      "B": "错。EBS 唔能就地加密。",
      "C": "✓ 正确。snapshot 再建加密卷系标准迁移。",
      "D": "✓ 正确。Control Tower mandatory controls 集中强制加密合规。",
      "E": "错。CloudTrail＋EventBridge 唔能自动加密现有卷，亦不如护栏完整。"
    },
    "diagram_before": "flowchart TB\n  Acc[\"多帐户 EC2\"]\n  EBS[\"大量未加密 EBS\"]\n  Note[\"EBS 唔可就地加密\"]\n  X{{\"缺口: 现有要加密<br/>未来要自动合规\"}}\n  Acc --> EBS --> Note\n  Note -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  Snap[\"未加密卷 → Snapshot\"]\n  Enc[\"还原为加密卷替换\"]\n  CT[\"Control Tower<br/>mandatory guardrails\"]\n  Det[\"多帐户持续侦测未加密\"]\n  Snap --> Enc\n  CT --> Det"
  },
  "371": {
    "blocker": "内联网页喺 ALB 后面，而家用内部使用者资料库登入。公司要改为用现有 AWS Directory Service for Microsoft AD（托管 AD）验证，目录内所有用户都要可存取。",
    "requirements": "1) 用现有 Microsoft AD 验证；2) 目录内用户都能用；3) 尽量喺 ALB 层完成，少改应用。",
    "steps": [
      "建立 Amazon Cognito user pool（使用者池）。",
      "把 Directory Service AD 配成联合身分提供者（IdP）。",
      "建立 app client 并关联到 ALB。",
      "ALB listener 规则使用 authenticate-cognito 动作。",
      "用户经 Cognito／AD 登入后先进入应用。"
    ],
    "solutions": "正确答案 B。ALB 原生支援 authenticate-cognito；Cognito 联合 AD 后，所有目录用户可 SSO。Directory 唔系直接 OIDC IdP；IAM SAML／Identity Center 主要管 AWS 主控台／API，唔系呢类 ALB 网页验证。",
    "result_flow": "用户开内网 → ALB authenticate-cognito → Cognito 转去 AD 验证 → 成功后带身分入应用。",
    "options": {
      "A": "错。Directory Service 唔系标准 OIDC IdP，authenticate-oidc 唔能直接接 AD。",
      "B": "✓ 正确。Cognito 联合 AD + ALB authenticate-cognito。",
      "C": "错。IAM SAML federation 用于 AWS 存取，唔系 ALB 应用验证。",
      "D": "错。IAM Identity Center 偏 AWS 资源 SSO，架构唔啱 ALB 网页。"
    },
    "diagram_before": "flowchart TB\n  User[\"内网用户\"]\n  ALB[\"ALB 后网页\"]\n  LocalDB[\"内部使用者资料库登入\"]\n  X{{\"缺口: 要改用现有<br/>AWS Managed Microsoft AD\"}}\n  User --> ALB --> LocalDB\n  LocalDB -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  User[\"用户开内网\"]\n  ALB[\"ALB authenticate-cognito\"]\n  Cog[\"Cognito 联合 AD\"]\n  AD[\"Directory Service AD\"]\n  App[\"带身分进入应用\"]\n  User --> ALB --> Cog --> AD --> App"
  },
  "372": {
    "blocker": "全球站用 CloudFront + 多 Region 来源，而家靠 Route 53 健康检查做 failover，切换要超过 1 分钟。公司想要最快故障切换。",
    "requirements": "1) 来源故障时尽快切去备援；2) 快过现有 DNS failover。",
    "steps": [
      "为 CloudFront 设定 origin group（来源群组）。",
      "把主要 Region 同备援 Region 来源加入同一 group。",
      "启用 origin failover：主来源失败就自动试备援。",
      "用故障演练验证边缘层切换时间。"
    ],
    "solutions": "正确答案 D。CloudFront origin group 喺 CDN 边缘即时切来源，唔使等 DNS TTL。多 distribution + DNS、调低 TTL、latency routing 都唔系最快 failover。",
    "result_flow": "用户打 CloudFront → 边缘取主 origin 失败 → origin group 即切备援 origin → 继续回应用户（秒级，唔使等 DNS）。",
    "options": {
      "A": "错。多个 distribution + DNS failover 仍受 TTL 影响，更复杂。",
      "B": "错。TTL 再低仍通常慢过边缘 origin failover。",
      "C": "错。latency routing 系拣快路径，唔系故障自动切换机制。",
      "D": "✓ 正确。origin group failover 喺 CloudFront 边缘最快。"
    },
    "diagram_before": "flowchart TB\n  User[\"全球用户\"]\n  CF[\"CloudFront<br/>多 Region 来源\"]\n  R53[\"Route 53 健康检查<br/>failover > 1 分钟\"]\n  X{{\"缺口: 切换太慢\"}}\n  User --> CF\n  CF --> R53\n  R53 -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  User[\"用户\"]\n  CF[\"CloudFront\"]\n  OG[\"Origin Group\"]\n  Prim[\"主 origin 失败\"]\n  Sec[\"秒级切备援 origin\"]\n  User --> CF --> OG\n  OG --> Prim --> Sec"
  },
  "373": {
    "blocker": "多帐户、多 DevOps 团队，有啲 AWS 服务根本冇人用，想用 Organizations 集中禁止呢啲服务，又要保留正在用嘅服务，并用 OU 管帐户。题目要拣三项关键动作。",
    "requirements": "1) 中央限制未使用服务；2) 允许正在使用服务；3) 用 OU 管理帐户结构（答案依题库为 C、D、F）。",
    "steps": [
      "用 AWS Trusted Advisor 报告了解组织实际用紧边啲服务。",
      "移除预设 FullAWSAccess SCP，先可以真正套用限制。",
      "（题库选项 F）移除预设 DenyAWSAccess SCP（若环境描述有此项），避免政策互相卡住。",
      "再以 Deny list 策略撰写自订 SCP，禁止未使用服务。",
      "用 OU 分组帐户套用相应 SCP。"
    ],
    "solutions": "正确答案 C、D、F（依题库）。Trusted Advisor 帮睇使用中服务；移除 FullAWSAccess 先有真正限制效果；F 为移除 DenyAWSAccess。注意：Access Advisor 偏单一帐户／角色视角；实际考试有时会强调 OU 定义，但本题答案键为 C/D/F。",
    "result_flow": "Trusted Advisor 厘清使用中服务 → 调整预设 SCP → 套用自订 Deny list SCP → 未使用服务在组织层被拒 → 帐户按 OU 管理。",
    "options": {
      "A": "错（单独不足）。Deny list 方向对，但唔系题库三选之一。",
      "B": "错。IAM Access Advisor 较适合单一帐户角色，唔如 Trusted Advisor 做组织层概览。",
      "C": "✓ 正确。Trusted Advisor 协助识别近期使用服务。",
      "D": "✓ 正确。移除 FullAWSAccess 才能让自订 SCP 真正收紧权限。",
      "E": "题干有 OU 需求，但答案键未选 E；E 文本常与 F 连在同一选项字串。",
      "F": "✓ 正确（依题库）。移除预设 DenyAWSAccess SCP 以配合自订控制。"
    },
    "diagram_before": "flowchart TB\n  Org[\"Organizations 多帐户\"]\n  Teams[\"多 DevOps 团队\"]\n  Svc[\"有服务无人用\"]\n  X{{\"缺口: 想集中禁未用服务<br/>又保留正在用服务\"}}\n  Org --> Teams\n  Svc -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  TA[\"Trusted Advisor<br/>厘清使用中服务\"]\n  Rem[\"移除 FullAWSAccess SCP\"]\n  Deny[\"自订 Deny list SCP\"]\n  OU[\"OU 管帐户结构\"]\n  Block[\"未使用服务组织层被拒\"]\n  TA --> Rem --> Deny --> OU --> Block"
  },
  "374": {
    "blocker": "售票系统用 EC2 Auto Scaling + PostgreSQL，促销系「预知时间」嘅流量高峰，要喺活动期间最大化可用性。",
    "requirements": "1) 促销期间高可用；2) 运算与资料库都能提前放大；3) 活动后可缩回。",
    "steps": [
      "把资料库迁到 Aurora PostgreSQL（或使用 Aurora 能力）。",
      "活动前用 scheduled scaling（排程扩展）放大 EC2 Auto Scaling。",
      "预先增加／调整 Aurora replica，并可 failover 到较大副本。",
      "活动后再排程缩回，控制成本。"
    ],
    "solutions": "正确答案 D。已知时段高峰用 scheduled scaling 最准；Aurora replica 可快速放大读取与支援 failover。predictive scaling 较适合规律历史流量，对一次性档期活动未必更准。",
    "result_flow": "活动前排程放大 EC2 与 Aurora replica → 促销流量打入 → 高可用撑住 → 活动后排程缩容。",
    "options": {
      "A": "错。predictive 对一次性档期未必准；Serverless 预热亦较拐弯。",
      "B": "错。传统 RDS replica 弹性与速度通常不如 Aurora。",
      "C": "错。predictive scaling 唔系已知排程事件首选。",
      "D": "✓ 正确。scheduled scaling + Aurora replica 动态调整。"
    },
    "diagram_before": "flowchart TB\n  ASG[\"EC2 Auto Scaling\"]\n  PG[\"PostgreSQL\"]\n  Sale[\"预知时段促销高峰\"]\n  X{{\"缺口: 活动期要最大化可用<br/>运算／DB 要提前放大\"}}\n  Sale --> ASG --> PG\n  Sale -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  Sched[\"活动前 scheduled scaling\"]\n  EC2[\"放大 EC2 机队\"]\n  Aurora[\"放大 Aurora Replica\"]\n  Traffic[\"促销流量撑住\"]\n  Down[\"活动后排程缩容\"]\n  Sched --> EC2 --> Aurora --> Traffic --> Down"
  },
  "375": {
    "blocker": "地端内网应用要用 Elastic Disaster Recovery（弹性灾难复原）做云上备份。要求：复制流量唔走公网、应用唔可从互联网存取、又唔好食晒全部频宽（选三项）。",
    "requirements": "1) 复制走私有路径；2) 复原环境唔暴露公网；3) 控制频宽；4) 恢复时网络设定尽量一致。",
    "steps": [
      "建立至少两个私有子网的 VPC，配 NAT gateway 与 virtual private gateway。",
      "复制伺服器设定选用 private IP 做资料复制。",
      "启动设定选择恢复实例私有 IP 与来源一致。",
      "限制复制频宽，避免食尽专线／VPN。",
      "演练恢复确认应用唔经公网暴露。"
    ],
    "solutions": "正确答案 A、E、F。私有子网 VPC + 复制用 private IP + 恢复保持相同私有 IP，满足「私有复制＋唔暴露公网」。公有子网＋IGW 违反唔可从互联网存取。",
    "result_flow": "地端应用 → 私有连线到 AWS → 复制伺服器用 private IP 同步 → 灾难时启动恢复实例（同私有 IP）→ 内网继续用，唔经公网。",
    "options": {
      "A": "✓ 正确。私有子网 + NAT + VGW 构成私有目标环境。",
      "B": "错。公有子网 + IGW 可能令应用可从互联网存取。",
      "C": "错（本题未选）。Site-to-Site VPN 可作连线，但答案组合系 A/E/F。",
      "D": "错（本题未选）。DX 非必要且成本较高。",
      "E": "✓ 正确。复制选 private IP，避免走公网。",
      "F": "✓ 正确。恢复实例保持相同私有 IP，网络组态一致。"
    },
    "diagram_before": "flowchart TB\n  OnPrem[\"地端内网应用\"]\n  DRS[\"要 Elastic Disaster Recovery\"]\n  BW[\"复制唔好食晒频宽\"]\n  X{{\"缺口: 复制／复原<br/>都唔可走公网\"}}\n  OnPrem --> DRS\n  BW -.-> DRS\n  DRS -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  App[\"地端应用\"]\n  Priv[\"私有连线到 AWS\"]\n  RS[\"复制伺服器 private IP\"]\n  Rec[\"灾难启动恢复实例<br/>同私有 IP\"]\n  Intranet[\"内网继续用\"]\n  App --> Priv --> RS --> Rec --> Intranet"
  },
  "376": {
    "blocker": "百万客户会批次上传大图，要调整大小后存 S3 六个月。需求波动大，要可靠可重试，又要最省钱。",
    "requirements": "1) 可靠伫列缓冲高峰；2) 失败可重试；3) 储存分层降成本；4) 最具成本效益。",
    "steps": [
      "上传后把工作丢入 SQS（讯息伫列）解耦。",
      "Lambda 从伫列取讯息做缩图处理。",
      "处理结果存 S3 Standard-IA（较少存取、较平）。",
      "用 Lifecycle 六个月后转 Glacier Deep Archive 长期最低成本。",
      "失败讯息可重试，避免遗失。"
    ],
    "solutions": "正确答案 D。SQS 解耦＋Lambda 处理＋IA＋Deep Archive lifecycle 系可靠又平。原地覆写原档会失去重试原始资料；Step Functions／EventBridge 对呢类简单影像流水线未必最平。",
    "result_flow": "客户上传 → SQS 缓冲 → Lambda 缩图 → S3 Standard-IA → 六个月后 lifecycle 到 Deep Archive；失败可再从伫列重试。",
    "options": {
      "A": "错。Step Functions 对简单处理偏贵；原地覆写不利重试原档。",
      "B": "错。EventBridge 唔系高吞吐工作伫列；原地覆写有问题。",
      "C": "错。S3 通知直接触发且原地覆写，高峰缓冲与重试较弱。",
      "D": "✓ 正确。SQS + Lambda + 分层储存最具成本效益。"
    },
    "diagram_before": "flowchart TB\n  Cust[\"百万客户批次大图\"]\n  Need[\"缩图后存 S3 六个月\"]\n  Cost[\"需求波动大要省钱\"]\n  X{{\"缺口: 可靠重试＋储存分层\"}}\n  Cust --> Need --> Cost\n  Cost -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  Up[\"客户上传\"]\n  SQS[\"SQS 缓冲高峰\"]\n  L[\"Lambda 缩图\"]\n  IA[\"S3 Standard-IA\"]\n  Arch[\"六个月后 Deep Archive\"]\n  Up --> SQS --> L --> IA --> Arch"
  },
  "377": {
    "blocker": "多部门多帐户想减运算成本，又要部门级帐单可见，仲要保持选实例／服务嘅弹性，唔好绑死。",
    "requirements": "1) 降低运算成本；2) 部门成本可见；3) 唔失去资源弹性。",
    "steps": [
      "用 Organizations 合并帐单。",
      "制定并启用成本分配标签，按部门归类。",
      "购买 Compute Savings Plans（计算节省计划：覆盖 EC2／Lambda／Fargate，弹性较高）。",
      "用 Cost Explorer 按标签睇部门花费。"
    ],
    "solutions": "正确答案 C。合并帐单＋标签＋Compute Savings Plans 同时满足省钱、可见、弹性。Instance Savings Plans 绑实例族较死；SCP 唔能用来「套用标签」。",
    "result_flow": "各部门帐户用量 → 合并帐单计费 → 标签归到部门 → Compute Savings Plans 折扣 → 报表显示部门成本。",
    "options": {
      "A": "错。Instance Savings Plans 弹性较低；Budgets 只告警唔等于合并帐单。",
      "B": "错。SCP 唔能套标签；Instance SP 弹性不足。",
      "C": "✓ 正确。合并帐单 + 标签 + Compute Savings Plans。",
      "D": "错。SCP 无法套标签；Budgets 取代唔到合并帐单可见性架构。"
    },
    "diagram_before": "flowchart TB\n  Depts[\"多部门多帐户\"]\n  Compute[\"运算成本高\"]\n  Flex[\"要保留选实例弹性\"]\n  X{{\"缺口: 省钱＋部门帐单可见<br/>又唔好绑死\"}}\n  Depts --> Compute\n  Flex -.-> Compute\n  Compute -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  Acc[\"各部门帐户用量\"]\n  Bill[\"合并帐单\"]\n  Tag[\"标签归部门\"]\n  SP[\"Compute Savings Plans\"]\n  Report[\"部门成本报表\"]\n  Acc --> Bill --> Tag --> SP --> Report"
  },
  "378": {
    "blocker": "客户用 S3 presigned URL（预签网址：短时间授权上传）传 >100MB 档案好慢。要加速，又只准已验证使用者上传。",
    "requirements": "1) 提升大档上传效能；2) 维持只有验证使用者可上传。",
    "steps": [
      "S3 桶启用 Transfer Acceleration（传输加速：经边缘节点上传）。",
      "产生 presigned URL 时使用加速端点。",
      "客户端用 multipart upload（分段上传）传大档。",
      "验证只有持有效预签 URL 嘅使用者可上传。"
    ],
    "solutions": "正确答案 C。Transfer Acceleration + presigned + multipart 系大档上传标准加速法。API Gateway 有 payload 大小限制，唔适合大档代理。",
    "result_flow": "已验证使用者取得加速端点 presigned URL → 分段上传到最近边缘 → 回源到 S3 桶 → 上传完成。",
    "options": {
      "A": "错。API Gateway 代理有约 10MB 限制，唔适合 >100MB。",
      "B": "错。Regional API Gateway 同样有 payload 限制。",
      "C": "✓ 正确。Transfer Acceleration + presigned + multipart。",
      "D": "错。一般 CloudFront 唔系 S3 PUT 加速嘅直接标准做法。"
    },
    "diagram_before": "flowchart TB\n  User[\"已验证使用者\"]\n  URL[\"S3 presigned URL\"]\n  Big[\"上传 >100MB 好慢\"]\n  X{{\"缺口: 要加速又只准<br/>验证使用者\"}}\n  User --> URL --> Big -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  Auth[\"已验证使用者\"]\n  Pre[\"加速端点 presigned\"]\n  Multi[\"Multipart 分段上传\"]\n  Edge[\"最近边缘回源 S3\"]\n  Done[\"上传完成\"]\n  Auth --> Pre --> Multi --> Edge --> Done"
  },
  "379": {
    "blocker": "多业务单位各自有 AWS 帐户，要集中付款、睇到成本、集中做 IAM 控制，又想工作量最少（选两项）。",
    "requirements": "1) 集中付款；2) 成本可见；3) 集中 IAM 控制；4) 最少工作量。",
    "steps": [
      "建立 AWS Organizations，邀请各业务单位帐户。",
      "开启合并帐单与成本可见性。",
      "用参数化 CloudFormation 范本标准化各帐户 IAM 政策。",
      "各帐户套用同一套最小权限范本。"
    ],
    "solutions": "正确答案 A、B。Organizations 解决集中帐单与帐户结构；CloudFormation 标准化 IAM，工作量最少。合并成单一帐户会失去隔离。",
    "result_flow": "各单位帐户加入 Organizations → 一张帐单／可分帐 → CloudFormation 统一部署 IAM → 集中治理又保留帐户隔离。",
    "options": {
      "A": "✓ 正确。参数化 CloudFormation 标准化 IAM。",
      "B": "✓ 正确。Organizations 集中帐单与帐户管理。",
      "C": "错。各帐户独立难集中 IAM；Cost Explorer 取代唔到 Organizations。",
      "D": "错。单靠 SCP 唔等于完整 IAM 标准化（相对 A+B）。",
      "E": "错。合成单一帐户违反多单位隔离。"
    },
    "diagram_before": "flowchart TB\n  BU[\"多业务单位各自帐户\"]\n  Pay[\"各自付款\"]\n  IAM[\"各自 IAM\"]\n  X{{\"缺口: 要集中付款＋成本<br/>＋IAM，工作量最少\"}}\n  BU --> Pay\n  BU --> IAM\n  Pay -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  Join[\"帐户加入 Organizations\"]\n  Bill[\"一张帐单／可分帐\"]\n  CF[\"CloudFormation<br/>统一部署 IAM\"]\n  Iso[\"保留帐户隔离治理\"]\n  Join --> Bill --> CF --> Iso"
  },
  "380": {
    "blocker": "API Gateway + Lambda 会 call 第三方预处理服务，对方超载令请求失败。要保证资料唔遗失，失败后可以稍后再处理。",
    "requirements": "1) 不遗失请求资料；2) 第三方失败可延后重试；3) 解耦 API 与处理。",
    "steps": [
      "API 改为把请求写入 SQS 主伫列（非同步）。",
      "Lambda 从主伫列消费，再呼叫第三方服务。",
      "设定 DLQ（Dead-Letter Queue，死信伫列：多次失败讯息隔离存放）。",
      "稍后再处理 DLQ 中的失败讯息。"
    ],
    "solutions": "正确答案 B。主伫列＋消费者 Lambda＋DLQ 系标准可靠非同步模式。API Gateway 唔能直接把 SQS 当自己嘅 DLQ；EventBridge failure destination 亦唔如 SQS 咁适合大量缓冲。",
    "result_flow": "客户 → API Gateway → SQS 主伫列 → Lambda 呼叫第三方 → 成功完成；反复失败 → DLQ 保存 → 稍后重放。",
    "options": {
      "A": "错。API Gateway 无法直接配置 SQS 作为其 DLQ 嘅呢种架构。",
      "B": "✓ 正确。SQS 解耦 + DLQ 保证不遗失。",
      "C": "错。EventBridge 唔适合呢种高吞吐工作缓冲。",
      "D": "错。自订 bus 做 failure destination 唔如 SQS 持久伫列可靠。"
    },
    "diagram_before": "flowchart TB\n  Client[\"客户\"]\n  APIGW[\"API Gateway + Lambda\"]\n  Third[\"第三方预处理服务\"]\n  X{{\"缺口: 对方超载失败<br/>资料可能遗失\"}}\n  Client --> APIGW --> Third\n  Third -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  Client[\"客户\"]\n  APIGW[\"API Gateway\"]\n  SQS[\"SQS 主伫列\"]\n  L[\"Lambda 呼叫第三方\"]\n  DLQ[\"失败进 DLQ 稍后重放\"]\n  Client --> APIGW --> SQS --> L\n  L -.-> DLQ"
  },
  "381": {
    "blocker": "电商三层架构（CloudFront、EC2 Apache、Aurora MySQL）喺促销时购物车逾时。要改善高峰期间效能可见性，揾到瓶颈（选三项；答案依题库 A、E、F）。",
    "requirements": "1) 看清资料库慢查询／错误；2) 追踪 AWS API／资源活动；3) 提升端到端效能可见性。",
    "steps": [
      "Aurora 发布 slow query 与 error logs 到 CloudWatch Logs。",
      "启用 CloudTrail 收集 EC2／Aurora 等 API 活动。",
      "启用 Aurora performance benchmarking 并发布到 X-Ray（依题库选项 F）。",
      "用日志与追踪对照促销时段逾时问题。"
    ],
    "solutions": "正确答案 A、E、F（依题库）。重点系 DB 日志进 CloudWatch、CloudTrail 活动、Aurora 效能串流到 X-Ray。X-Ray SDK 或 Apache log agent 亦常见，但本题答案键为 A/E/F。",
    "result_flow": "促销流量进入 → Aurora 慢查询／错误进 CloudWatch → CloudTrail 记录资源 API → 效能指标进 X-Ray → 团队定位购物车逾时瓶颈。",
    "options": {
      "A": "✓ 正确。slow query／error log 到 CloudWatch 系 DB 分析基础。",
      "B": "错（本题未选）。X-Ray SDK 有用但答案键未包括。",
      "C": "错。串去 Kinesis 较拐弯，CloudWatch Logs 更直接。",
      "D": "错（本题未选）。Apache logs 有帮助但非答案键。",
      "E": "✓ 正确。CloudTrail 追踪 EC2／Aurora API 活动。",
      "F": "✓ 正确。Aurora 效能基准／串流到 X-Ray 提升可见性。"
    },
    "diagram_before": "flowchart TB\n  CF[\"CloudFront\"]\n  Web[\"EC2 Apache\"]\n  Aurora[\"Aurora MySQL\"]\n  X{{\"缺口: 促销购物车逾时<br/>睇唔到瓶颈\"}}\n  CF --> Web --> Aurora\n  Aurora -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  Traffic[\"促销流量\"]\n  CW[\"Aurora 慢查询<br/>→ CloudWatch\"]\n  CT[\"CloudTrail 记录 API\"]\n  XR[\"效能指标 → X-Ray\"]\n  Find[\"定位购物车逾时瓶颈\"]\n  Traffic --> CW --> CT --> XR --> Find"
  },
  "382": {
    "blocker": "旺季时 DynamoDB + EC2 后端读写变慢。要可扩展，但开发工作量要最少，唔想大翻修。",
    "requirements": "1) 提升读写扩展能力；2) 开发改动最少。",
    "steps": [
      "EC2 放入 Auto Scaling group，按负载加减机器。",
      "为 DynamoDB 表启用 auto scaling（自动调读写容量）。",
      "设定目标使用率与告警。",
      "旺季观察延迟与节流是否下降。"
    ],
    "solutions": "正确答案 C。喺现有 EC2 + DynamoDB 上加双边 Auto Scaling，改动最少。搬去 Lambda／Global Tables 要重构；加 SQS 写入路径亦增加开发。",
    "result_flow": "旺季流量上升 → EC2 Auto Scaling 加机器 → DynamoDB auto scaling 加容量 → 读写恢复顺畅。",
    "options": {
      "A": "错。改 Lambda 要重写后端，工作量大。",
      "B": "错。Lambda + global tables 同样重构大。",
      "C": "✓ 正确。EC2 ASG + DynamoDB auto scaling 最少开发。",
      "D": "错。SQS + Lambda 写入增加架构与开发复杂度。"
    },
    "diagram_before": "flowchart TB\n  EC2[\"EC2 后端\"]\n  DDB[\"DynamoDB\"]\n  Peak[\"旺季读写变慢\"]\n  X{{\"缺口: 要扩展<br/>开发改动要最少\"}}\n  Peak --> EC2 --> DDB\n  Peak -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  Load[\"旺季流量上升\"]\n  ASG[\"EC2 Auto Scaling\"]\n  DAS[\"DynamoDB auto scaling\"]\n  OK[\"读写恢复顺畅\"]\n  Load --> ASG --> DAS --> OK"
  },
  "383": {
    "blocker": "迁移前要收集 VM 的 CPU／记忆体／磁碟、程序清单同网络连线依赖图，想最平、最有效。",
    "requirements": "1) 效能指标；2) 程序清单；3) 网络依赖图；4) 最具成本效益。",
    "steps": [
      "在来源 VM 安装 Application Discovery Service agent。",
      "收集 CPU、记忆体、磁碟、程序与网络连线。",
      "在 Migration Hub 产生网络拓扑／依赖图。",
      "用资料做迁移分组与容量规划。"
    ],
    "solutions": "正确答案 A。Agent-based discovery 资料最完整，成本效益高。Agentless 欠程序级细节；Application Migration Service 偏执行迁移而非评估。",
    "result_flow": "Discovery Agent 持续采集 → 汇入 Migration Hub → 产出依赖图与效能基线 → 指导迁移波次。",
    "options": {
      "A": "✓ 正确。Agent-based discovery + Migration Hub 最完整。",
      "B": "错。Agentless 资料较少，欠程序层细节。",
      "C": "错。偏迁移执行／额外产品，唔系最精准评估首选。",
      "D": "错。非标准迁移评估组合。"
    },
    "diagram_before": "flowchart TB\n  VMs[\"地端多部 VM\"]\n  Perf[\"要 CPU／记忆体／磁碟\"]\n  Dep[\"程序清单＋网络依赖图\"]\n  X{{\"缺口: 迁移评估要平又有效\"}}\n  VMs --> Perf\n  VMs --> Dep\n  Dep -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  Agent[\"Discovery Agent 采集\"]\n  MH[\"Migration Hub\"]\n  Graph[\"依赖图 + 效能基线\"]\n  Plan[\"指导迁移波次\"]\n  Agent --> MH --> Graph --> Plan"
  },
  "384": {
    "blocker": "多 Region NLB SaaS 要畀客户 allow list 静态 IP，又要自动把用户导去最近健康 Region。",
    "requirements": "1) 固定少数静态 IP；2) 自动就近路由；3) 健康检查故障切换。",
    "steps": [
      "建立 AWS Global Accelerator standard accelerator。",
      "取得两个静态 Anycast IP 给客户 allow list。",
      "把各 Region NLB 加为端点。",
      "启用健康检查与延迟为本路由。"
    ],
    "solutions": "正确答案 B。Global Accelerator 提供稳定 Anycast IP + 就近／健康路由。CloudFront 边缘 IP 范围大且会变，唔适合严格 allow list；custom routing 用于固定映射场景。",
    "result_flow": "客户只放行两个静态 IP → Global Accelerator → 依延迟与健康导向最近 Region NLB → SaaS 服务。",
    "options": {
      "A": "错。CloudFront IP 范围唔适合静态 allow list。",
      "B": "✓ 正确。Global Accelerator 静态 IP + 延迟路由。",
      "C": "错。边缘 IP 会变动，allow list 难维护。",
      "D": "错。custom routing accelerator 唔系延迟最佳化场景。"
    },
    "diagram_before": "flowchart TB\n  SaaS[\"多 Region NLB SaaS\"]\n  Client[\"客户要 allow list\"]\n  Near[\"要导最近健康 Region\"]\n  X{{\"缺口: 要稳定静态 IP<br/>＋智慧路由\"}}\n  Client --> SaaS\n  Near -.-> SaaS\n  Client -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  Client[\"客户只放行两静态 IP\"]\n  GA[\"Global Accelerator\"]\n  Near[\"依延迟+健康路由\"]\n  NLB[\"最近 Region NLB\"]\n  App[\"SaaS 服务\"]\n  Client --> GA --> Near --> NLB --> App"
  },
  "385": {
    "blocker": "多个开发单位共用生产帐户，要防止单位之间互相 terminate 对方 EC2，但每人仍可管理自己工作负载。",
    "requirements": "1) 跨单位隔离终止权限；2) 可管理自己标签嘅资源；3) 配合联邦登入。",
    "steps": [
      "SAML 联邦登入时带上 DevelopmentUnit session tag。",
      "EC2 资源打上对应 DevelopmentUnit 标签。",
      "IAM 政策用 PrincipalTag 与资源标签比对（ABAC）。",
      "当标签唔一致时 Deny 终止等敏感操作。"
    ],
    "solutions": "正确答案 B。STS session tag + 资源标签 ABAC 最灵活。SCP 难做使用者级 PrincipalTag 细控；静态政策难动态跟联邦 tag。",
    "result_flow": "开发者联邦登入（带单位 tag）→ 操作 EC2 → IAM 比对单位 tag → 只可动自己单位资源，跨单位 terminate 被拒。",
    "options": {
      "A": "错。SCP 系组织层，难做使用者级 tag 细控。",
      "B": "✓ 正确。session tag + 资源 tag ABAC。",
      "C": "错。SCP 不适合此类 PrincipalTag 使用者隔离。",
      "D": "错。静态 IAM 难动态对齐联邦 session tag。"
    },
    "diagram_before": "flowchart TB\n  Devs[\"多开发单位<br/>共用生产帐户\"]\n  EC2[\"各单位 EC2\"]\n  Risk[\"可互相 terminate\"]\n  X{{\"缺口: 要只管自己单位资源\"}}\n  Devs --> EC2 --> Risk\n  Risk -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  Fed[\"联邦登入<br/>带单位 session tag\"]\n  Op[\"操作 EC2\"]\n  ABAC[\"IAM 比对资源 tag\"]\n  Own[\"只可管自己单位\"]\n  Deny[\"跨单位 terminate 被拒\"]\n  Fed --> Op --> ABAC --> Own\n  ABAC -.-> Deny"
  },
  "386": {
    "blocker": "企业要提供基础设施平台：最小权限、中央管理、跨帐户分发核准产品，仲要强制标签（选三项）。",
    "requirements": "1) 中央产品目录；2) 跨 Organizations 分发；3) 终端使用者最小权限；4) 强制标签。",
    "steps": [
      "用 CloudFormation 范本做成 Service Catalog 产品，放喺中央帐户 portfolio。",
      "把 portfolio 分享到 Organizations 结构。",
      "使用者只畀 ServiceCatalogEndUserAccess，并用脚本汇入 portfolio、launch constraints。",
      "用 TagOption Library 强制必要标签。",
      "使用者只能启动核准产品。"
    ],
    "solutions": "正确答案 B、D、E。Service Catalog 中央 portfolio + EndUser 权限 + TagOption 系企业自助治理标准。只丢 S3 范本或靠 SCP 几乎封锁所有服务都唔啱。",
    "result_flow": "中央上传产品 → 分享到组织 → 本地帐户汇入 → 使用者最小权限启动 → TagOption 强制标签落地。",
    "options": {
      "A": "错。S3 范本 + 直接 IAM 难限制只启动核准服务，亦缺标签强制。",
      "B": "✓ 正确。Service Catalog 产品与 portfolio 中央管理并分享。",
      "C": "错。SCP 几乎只留 CFN/S3 过于粗暴，亦无产品目录。",
      "D": "✓ 正确。EndUser 权限 + 自动化汇入 portfolio 与约束。",
      "E": "✓ 正确。TagOption Library 强制标签。",
      "F": "错。只靠 CloudFormation Resource Tags 不如 catalog 层 TagOption 强制。"
    },
    "diagram_before": "flowchart TB\n  Teams[\"多团队要自助基建\"]\n  Least[\"最小权限\"]\n  Tag[\"强制标签\"]\n  X{{\"缺口: 无跨帐户<br/>核准产品平台\"}}\n  Teams --> Least\n  Teams --> Tag\n  Least -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  Hub[\"中央上传 Service Catalog 产品\"]\n  Share[\"分享到组织\"]\n  Import[\"本地帐户汇入\"]\n  Launch[\"EndUser 最小权限启动\"]\n  Tag[\"TagOption 强制标签\"]\n  Hub --> Share --> Import --> Launch --> Tag"
  },
  "387": {
    "blocker": "Athena 查 WAF 日志愈嚟愈慢，资料日积月累扫描量爆大，想阻止查询时间持续恶化，又要最低营运负担。",
    "requirements": "1) 查询唔好随时间无限变慢；2) 营运负担最低。",
    "steps": [
      "用 Kinesis Data Firehose 写入 S3 时做动态分区（例如按日期）。",
      "Athena 表定义对应分割区。",
      "查询时带上日期等分割条件，只扫描相关资料。",
      "定期检查分割区与查询耗时。"
    ],
    "solutions": "正确答案 D。Partitioning（分割）系 Athena 效能标准优化。自建 Lambda 合并、每日不同 bucket、或转 Redshift Spectrum 都较重。",
    "result_flow": "WAF 日志 → Firehose 动态分区写 S3 → Athena 只扫相关 partition → 查询时间受控。",
    "options": {
      "A": "错。Lambda 合并日志要自维护，不如原生分割。",
      "B": "错。每日不同 bucket 管理复杂，未必减少扫描。",
      "C": "错。Redshift Spectrum 引入额外服务，负担高。",
      "D": "✓ 正确。分区表 + 查询指定分割系最低负担优化。"
    },
    "diagram_before": "flowchart TB\n  WAF[\"WAF 日志累积\"]\n  Ath[\"Athena 查询\"]\n  Slow[\"扫描量愈嚟愈大\"]\n  X{{\"缺口: 查询时间持续恶化\"}}\n  WAF --> Ath --> Slow\n  Slow -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  Log[\"WAF 日志\"]\n  FH[\"Firehose 动态分区写 S3\"]\n  Part[\"Athena 只扫相关 partition\"]\n  Fast[\"查询时间受控\"]\n  Log --> FH --> Part --> Fast"
  },
  "388": {
    "blocker": "ALB 后 Web 应用只准特定国家存取，又要记录被封锁请求，想维护最低（唔想人手维护成个国家 IP 表）。",
    "requirements": "1) 按国家允许／封锁；2) 记录封锁请求；3) 最低维护。",
    "steps": [
      "在 ALB 前（或关联）启用 AWS WAF。",
      "建立 geo match rule（地理匹配规则）只准目标国家。",
      "开启 WAF 日志记录被封锁请求。",
      "验证其他国家流量被挡并有日志。"
    ],
    "solutions": "正确答案 B。WAF geo match 内建国家级控制与日志，唔使维护 IP 清单。IPSet、Security Group 都要人工维护 IP；Shield 无地理封锁。",
    "result_flow": "用户请求 → WAF 地理规则判断 → 准许国家到 ALB；其他国家封锁并写日志。",
    "options": {
      "A": "错。IPSet 要持续更新国家 IP，维护高。",
      "B": "✓ 正确。WAF geo match 最低维护。",
      "C": "错。Shield 不做地理封锁。",
      "D": "错。Security group 难维护国家 IP，亦缺封锁请求日志能力。"
    },
    "diagram_before": "flowchart TB\n  User[\"互联网用户\"]\n  ALB[\"ALB 后 Web\"]\n  Geo[\"只要特定国家\"]\n  X{{\"缺口: 封锁要有日志<br/>唔想维护 IP 表\"}}\n  User --> ALB\n  Geo -.-> ALB\n  ALB -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  Req[\"用户请求\"]\n  WAF[\"WAF 地理规则\"]\n  OK[\"准许国家 → ALB\"]\n  Block[\"其他国家封锁+日志\"]\n  Req --> WAF\n  WAF --> OK\n  WAF --> Block"
  },
  "389": {
    "blocker": "FSx for Windows 有关键资料，要复制到另一 Region 做 DR，而且资料唔可以走公网。",
    "requirements": "1) 跨 Region 复制 FSx 资料；2) 全程私有网络；3) 可靠同步。",
    "steps": [
      "在目标 Region 建立 FSx for Windows。",
      "用 VPC peering 连接两个 Region 的 VPC。",
      "部署 DataSync，并用 interface VPC endpoint（PrivateLink）私有存取。",
      "建立任务把来源 FSx 同步到目标 FSx。"
    ],
    "solutions": "正确答案 C。DataSync + VPC peering + interface endpoint 走 AWS 私有路径。Transfer Family 偏 SFTP；File Gateway 架构拐弯。",
    "result_flow": "来源 FSx → DataSync（经 PrivateLink endpoint）→ VPC peering 跨 Region → 目标 FSx；资料唔经公网。",
    "options": {
      "A": "错。File Gateway + S3 非 Windows 档案系统原生 DR 最佳路径。",
      "B": "错。Site-to-Site VPN 可私有但较拐；peering + PrivateLink 更贴题。",
      "C": "✓ 正确。DataSync + peering + interface endpoint。",
      "D": "错。Transfer Family 非 FSx 间同步首选。"
    },
    "diagram_before": "flowchart TB\n  FSx[\"来源 Region<br/>FSx for Windows\"]\n  DR[\"要复制到另一 Region\"]\n  Key[\"关键资料\"]\n  X{{\"缺口: 资料唔可以走公网\"}}\n  FSx --> Key --> DR\n  DR -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  Src[\"来源 FSx\"]\n  DS[\"DataSync + PrivateLink EP\"]\n  Peer[\"VPC Peering 跨 Region\"]\n  Dst[\"目标 FSx\"]\n  Priv[\"全程唔经公网\"]\n  Src --> DS --> Peer --> Dst --> Priv"
  },
  "390": {
    "blocker": "10TB 资料库要跨 Region DR：RPO < 5 分钟、RTO < 10 分钟，又想最低成本。",
    "requirements": "1) RPO < 5 分；2) RTO < 10 分；3) 跨 Region；4) 成本尽量低。",
    "steps": [
      "建立 RDS cross-Region read replica 持续非同步复制。",
      "监控复制延迟确保符合 RPO。",
      "演练故障时 promote replica 成主库。",
      "应用连线切到新主库，验证 RTO。"
    ],
    "solutions": "正确答案 B。跨 Region read replica + promote 通常可达分钟级 RPO/RTO，成本低过双 Aurora + DMS 等重方案。每 5 分钟 snapshot 还原 RTO 易超标；同 Region replica 唔算跨 Region DR。",
    "result_flow": "主 Region 写入 → 跨 Region replica 持续复制 → 灾难 promote → 应用切换 → 满足 RPO/RTO。",
    "options": {
      "A": "错。定时 snapshot RTO 较慢，RPO 边界紧。",
      "B": "✓ 正确。cross-Region replica + promote 经济且达标。",
      "C": "错。双丛集 + DMS 成本与复杂度高。",
      "D": "错。同 Region replica 无跨 Region 保护。"
    },
    "diagram_before": "flowchart TB\n  DB[\"10TB 资料库\"]\n  DR[\"跨 Region DR\"]\n  SLA[\"RPO 少于 5 分<br/>RTO 少于 10 分\"]\n  X{{\"缺口: 又要低成本达 SLA\"}}\n  DB --> DR --> SLA\n  SLA -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  Write[\"主 Region 写入\"]\n  RR[\"跨 Region Read Replica\"]\n  Fail[\"灾难 promote\"]\n  Cut[\"应用切换\"]\n  OK[\"满足 RPO／RTO\"]\n  Write --> RR --> Fail --> Cut --> OK"
  },
  "391": {
    "blocker": "喺 Organizations 管理帐户新建咗成员帐户，而家要喺成员帐户建立 IAM 使用者，唔知正确入口。",
    "requirements": "1) 安全地进入新成员帐户；2) 建立 IAM 使用者；3) 跟 Organizations 最佳实务。",
    "steps": [
      "使用 Organizations 建立帐户时自动出现的 OrganizationAccountAccessRole。",
      "从管理帐户 AssumeRole／switch role 到该角色。",
      "进入成员帐户后建立所需 IAM 使用者与政策。",
      "避免使用 root 日常操作。"
    ],
    "solutions": "正确答案 B。标准系管理帐户 assume 成员帐户 OrganizationAccountAccessRole。唔好用 root；管理帐户 root 密码亦登唔入成员帐户。",
    "result_flow": "管理帐户 → Assume OrganizationAccountAccessRole → 成员帐户 → 建立 IAM 使用者。",
    "options": {
      "A": "错。唔应日常用 root。",
      "B": "✓ 正确。assume OrganizationAccountAccessRole。",
      "C": "错。管理帐户 root 无法登入成员帐户。",
      "D": "错。管理帐户 IAM 使用者不能直接登入成员帐户。"
    },
    "diagram_before": "flowchart TB\n  Mgmt[\"管理帐户<br/>刚新建成员帐户\"]\n  Need[\"要喺成员帐户建 IAM 使用者\"]\n  Root[\"唔应乱用 root\"]\n  X{{\"缺口: 唔知正确入口\"}}\n  Mgmt --> Need\n  Root -.-> Need\n  Need -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  Mgmt[\"管理帐户\"]\n  Assume[\"Assume<br/>OrganizationAccountAccessRole\"]\n  Mem[\"进入成员帐户\"]\n  IAM[\"建立 IAM 使用者\"]\n  Mgmt --> Assume --> Mem --> IAM"
  },
  "392": {
    "blocker": "API Gateway + Lambda + Aurora Serverless 因合作伙伴短时间大量重复相同查询，令 DB 记忆体错误。要改善效能并控制成本。",
    "requirements": "1) 减少重复查询打爆 DB；2) 改善效能；3) 控制成本。",
    "steps": [
      "引入 ElastiCache Redis（记忆体快取）。",
      "Lambda 先查快取，命中就直接回。",
      "未命中先查 Aurora，再把结果写入快取。",
      "观察 DB 负载与错误是否下降。"
    ],
    "solutions": "正确答案 B。重复读取最适合应用层 Redis 快取。只加 API caching、加 DB 记忆体或 throttling 都唔治本或伤害合法流量。",
    "result_flow": "重复请求 → Lambda 读 Redis → 命中即回；未命中 → Aurora → 回填 Redis → DB 压力大降。",
    "options": {
      "A": "错。边缘／API 快取未必解决 DB 层重复查询根因。",
      "B": "✓ 正确。ElastiCache Redis 快取热查询。",
      "C": "错。加 Aurora 记忆体成本高且未减重复查询。",
      "D": "错。throttling 会挡合法请求。"
    },
    "diagram_before": "flowchart TB\n  Partner[\"合作伙伴大量<br/>重复相同查询\"]\n  APIGW[\"API + Lambda\"]\n  Aurora[\"Aurora Serverless\"]\n  X{{\"缺口: DB 记忆体错误<br/>成本失控\"}}\n  Partner --> APIGW --> Aurora\n  Aurora -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  Req[\"重复请求\"]\n  L[\"Lambda 读 Redis\"]\n  Hit[\"命中即回\"]\n  Miss[\"未命中 → Aurora\"]\n  Fill[\"回填 Redis，DB 减压\"]\n  Req --> L\n  L --> Hit\n  L --> Miss --> Fill"
  },
  "393": {
    "blocker": "5TB MySQL 要迁到 RDS：敏感资料、唔走互联网、传输与静态都要加密、停机要最少。",
    "requirements": "1) 私有传输；2) 加密；3) 最少停机（需 CDC）；4) 完整迁移 5TB。",
    "steps": [
      "DMS 复制实例放私有子网，配 VPC endpoints。",
      "来源到 AWS 走 Direct Connect private VIF。",
      "DMS 做 full load + CDC（变更资料撷取）持续同步。",
      "用 KMS 管理加密。",
      "切换窗口只做最后追平与 DNS／连线 cutover。"
    ],
    "solutions": "正确答案 B。DMS + DX 私有路径 + CDC 系大型 DB 最短停机标准。Snowball 难单独做持续 CDC；DataSync 偏档案；File Gateway 流程长。",
    "result_flow": "地端 MySQL → DX 私有连线 → DMS full load + CDC → RDS（加密）→ 短切换上线。",
    "options": {
      "A": "错。Snowball 初始搬完仍要增量方案，整体较拐。",
      "B": "✓ 正确。DMS + 私有连线 + CDC 最少停机。",
      "C": "错。DataSync 唔系资料库 CDC 工具。",
      "D": "错。经 File Gateway／还原流程停机长。"
    },
    "diagram_before": "flowchart TB\n  OnPrem[\"地端 5TB MySQL\"]\n  Sens[\"敏感资料\"]\n  Net[\"唔可走互联网\"]\n  X{{\"缺口: 要加密+最短停机上 RDS\"}}\n  OnPrem --> Sens --> Net\n  Net -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  MySQL[\"地端 MySQL\"]\n  DX[\"Direct Connect 私有\"]\n  DMS[\"DMS full load + CDC\"]\n  RDS[\"加密 RDS\"]\n  Cut[\"短切换上线\"]\n  MySQL --> DX --> DMS --> RDS --> Cut"
  },
  "394": {
    "blocker": "多 AZ Linux 丛集需要 POSIX 相容、高可用、高吞吐嘅共享档案储存。",
    "requirements": "1) POSIX；2) 多实例共享；3) 多 AZ 高可用；4) 高吞吐。",
    "steps": [
      "建立 Amazon EFS（弹性档案系统）。",
      "选择 Max I/O performance mode（高并行吞吐模式）。",
      "在各 AZ 挂载目标，让所有 EC2 挂载同一档案系统。",
      "以 NFS 测试并行读写吞吐。"
    ],
    "solutions": "正确答案 D。EFS Max I/O 适合高吞吐丛集。General Purpose 偏低延迟但吞吐场景较弱；EBS 通常唔能多实例共享；Storage Gateway 非原生丛集首选。",
    "result_flow": "各 AZ EC2 → 挂载 EFS（Max I/O）→ 共享 POSIX 档案 → 高并行吞吐且多 AZ 可用。",
    "options": {
      "A": "错。Storage Gateway NFS 效能／架构不如原生 EFS。",
      "B": "错。General Purpose 非高吞吐首选。",
      "C": "错。EBS 难以作为多实例共享 POSIX 方案。",
      "D": "✓ 正确。EFS Max I/O 高吞吐丛集标准。"
    },
    "diagram_before": "flowchart TB\n  Cluster[\"多 AZ Linux 丛集\"]\n  POSIX[\"要 POSIX 相容共享档\"]\n  Perf[\"高可用高吞吐\"]\n  X{{\"缺口: 未有合适共享档案储存\"}}\n  Cluster --> POSIX --> Perf\n  Perf -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  EC2A[\"各 AZ EC2\"]\n  EFS[\"EFS Max I/O\"]\n  Share[\"共享 POSIX 档案\"]\n  OK[\"高并行＋多 AZ 可用\"]\n  EC2A --> EFS --> Share --> OK"
  },
  "395": {
    "blocker": "SAM 部署的 serverless 应用要跨 Region DR：RTO 5 分钟、RPO 1 分钟，好严。",
    "requirements": "1) RPO ≤ 1 分；2) RTO ≤ 5 分；3) 跨 Region。",
    "steps": [
      "资料层用 Aurora Global Database 跨 Region 复制（RPO 通常秒级）。",
      "在目标 Region 预先部署被动应用堆叠（SAM／被动环境）。",
      "设定监控与切换程序（DNS／端点）。",
      "演练 failover 验证 5 分钟内恢复。"
    ],
    "solutions": "正确答案 D。Global Database 满足严 RPO；目标 Region 预部署先满足严 RTO。只靠 runbook 临时部署或未预放应用，RTO 易爆。",
    "result_flow": "主 Region 写入 → Global Database 秒级复制到备援 → 灾难时提升备援 DB 并启用预部署应用 → 5 分钟内恢复。",
    "options": {
      "A": "错。Serverless v1／手动 runbook 难稳达 RTO。",
      "B": "错。有 Global DB 但无预部署应用，RTO 风险高。",
      "C": "错。架构组合唔符合 Global Database 最佳做法。",
      "D": "✓ 正确。Global Database + 预部署被动 Region。"
    },
    "diagram_before": "flowchart TB\n  SAM[\"SAM Serverless<br/>单 Region\"]\n  Need[\"跨 Region DR\"]\n  SLA[\"RTO 5 分／RPO 1 分\"]\n  X{{\"缺口: SLA 好严未达\"}}\n  SAM --> Need --> SLA\n  SLA -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  Write[\"主 Region 写入\"]\n  GD[\"Aurora Global Database<br/>秒级复制\"]\n  Pre[\"备援 Region 预部署应用\"]\n  Fail[\"提升 DB + 启用应用\"]\n  RTO[\"5 分钟内恢复\"]\n  Write --> GD --> Pre --> Fail --> RTO"
  },
  "396": {
    "blocker": "旅游资讯应用内容更新时，EC2 同自建 Redis 过载导致停机。要高可用并撑住更新期间负载。",
    "requirements": "1) 取代脆弱自建 Redis；2) 运算可扩展；3) 更新前可预先放大。",
    "steps": [
      "自建 Redis 改为 Amazon ElastiCache Redis。",
      "EC2 放入 Auto Scaling，前挂 ALB。",
      "内容更新前用 scheduled scaling 预先加容量。",
      "更新后再缩回。"
    ],
    "solutions": "正确答案 B。ElastiCache + ASG + ALB + scheduled scaling 完整。DAX 系 DynamoDB 加速器，唔能直接取代呢层 Redis 用法；Memcached 功能较少。",
    "result_flow": "更新前排程加机器 → 流量经 ALB 分散 → ElastiCache 抗快取压力 → 更新完成后缩容，避免停机。",
    "options": {
      "A": "错。DAX 唔取代通用 Redis 快取层。",
      "B": "✓ 正确。ElastiCache + Auto Scaling + scheduled scaling。",
      "C": "错。Memcached 能力较弱，唔如 Redis 适合。",
      "D": "错。DAX + CloudFront 解决唔到后端 Redis／运算过载全貌。"
    },
    "diagram_before": "flowchart TB\n  Content[\"内容更新尖峰\"]\n  EC2[\"固定 EC2\"]\n  Redis[\"自建 Redis\"]\n  X{{\"缺口: 过载停机\"}}\n  Content --> EC2 --> Redis\n  Redis -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  Sched[\"更新前 scheduled 加机\"]\n  ALB[\"ALB 分散流量\"]\n  ASG[\"Auto Scaling EC2\"]\n  Cache[\"ElastiCache Redis\"]\n  Down[\"更新后缩容\"]\n  Sched --> ALB --> ASG --> Cache --> Down"
  },
  "397": {
    "blocker": "行动 app 尖峰每分钟上千张图要处理，完成要通知用户。要可扩展（选三项；题库答案 A、C、D）。",
    "requirements": "1) 尖峰可扩展；2) 非同步处理；3) 依题库组合完成流水线。",
    "steps": [
      "手机直传 S3。",
      "S3 事件通知写入 Amazon MQ 伫列（依题库 A）。",
      "有讯息时用 Lambda 做影像处理（C）。",
      "同时可用 S3 Batch Operations 做批次处理（D）。",
      "（通知选项非本题答案键。）"
    ],
    "solutions": "正确答案 A、C、D（依题库）。注意实务上 SQS + SNS 更常见，但必须跟 batch correct_answers。题库选 Amazon MQ 事件、Lambda 处理、S3 Batch Operations。",
    "result_flow": "App 上传 S3 → 事件入 MQ → Lambda／Batch Operations 处理影像 → 使用者可获知完成（通知机制见其他选项）。",
    "options": {
      "A": "✓ 正确（依题库）。S3 事件 → Amazon MQ 解耦。",
      "B": "错（本题未选）。SQS 实务常见但答案键系 A。",
      "C": "✓ 正确。Lambda 事件驱动处理。",
      "D": "✓ 正确（依题库）。S3 Batch Operations 批次处理。",
      "E": "错（本题未选）。SNS push 常见但非答案键。",
      "F": "错。SES 系电邮，非典型 push。"
    },
    "diagram_before": "flowchart TB\n  App[\"行动 App\"]\n  Peak[\"尖峰每分钟上千张图\"]\n  Notify[\"完成要通知用户\"]\n  X{{\"缺口: 要可扩展处理流水线\"}}\n  App --> Peak --> Notify\n  Peak -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  Up[\"App 上传 S3\"]\n  Ev[\"S3 事件 → Amazon MQ\"]\n  L[\"Lambda 处理影像\"]\n  Batch[\"S3 Batch Operations\"]\n  Done[\"处理完成\"]\n  Up --> Ev\n  Ev --> L\n  Ev --> Batch\n  L --> Done\n  Batch --> Done"
  },
  "398": {
    "blocker": "OpenSearch 放喺 VPC 内，开发者在家同三个办公室都要直接分析日志，需要安全连入 VPC。",
    "requirements": "1) 家居与办公室都能连；2) 安全存取 VPC 内 OpenSearch；3) 合理成本与弹性。",
    "steps": [
      "建立 AWS Client VPN endpoint。",
      "授权开发者下载设定档并连 VPN。",
      "路由到 OpenSearch 所在子网。",
      "以 VPN 后私有地址存取 OpenSearch／Dashboard。"
    ],
    "solutions": "正确答案 A。Client VPN 覆盖在家与多办公室。Site-to-Site 难覆盖在家；DX 贵；Bastion SSH 隧道唔适合 Dashboard 体验。",
    "result_flow": "开发者 → Client VPN → VPC 私有网络 → OpenSearch 分析日志。",
    "options": {
      "A": "✓ 正确。Client VPN 适合分散开发者。",
      "B": "错。Site-to-Site 难覆盖在家工作者。",
      "C": "错。Direct Connect 成本高且唔解决在家。",
      "D": "错。Bastion 体验差、安全与操作负担高。"
    },
    "diagram_before": "flowchart TB\n  OS[\"VPC 内 OpenSearch\"]\n  Home[\"在家开发者\"]\n  Office[\"三个办公室\"]\n  X{{\"缺口: 安全连入 VPC<br/>分析日志\"}}\n  Home -.-> X\n  Office -.-> X\n  OS -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  Dev[\"在家／办公室开发者\"]\n  CVPN[\"Client VPN\"]\n  VPC[\"VPC 私有网络\"]\n  OS[\"OpenSearch 分析日志\"]\n  Dev --> CVPN --> VPC --> OS"
  },
  "399": {
    "blocker": "网站要容器化上 ECS，安全政策要求最小权限与正确网络权限。部署后仲有后续步骤（选两项；题库 C、D）。",
    "requirements": "1) 最小权限；2) 正确 security group／凭证处理；3) 依题库选项。",
    "steps": [
      "在 EC2 启动类型下，对 EC2 实例套用 security groups。",
      "用 IAM roles for EC2 instances 存取其他 AWS 资源（C）。",
      "对 tasks 套用 security groups，并在启动时传入 IAM 凭证（D，依题库）。",
      "完成后验证网路与权限最小。"
    ],
    "solutions": "正确答案 C、D（依题库）。实务最佳常系 awsvpc + task role（B/E），但本题 correct_answers 为 C、D，详解必须一致。",
    "result_flow": "部署 ECS → 实例／task 套 SG → 以角色或传入凭证存取资源 → 符合题库要求的权限与网络设定。",
    "options": {
      "A": "错。bridge 模式较难做细粒度任务级安全。",
      "B": "错（本题未选）。awsvpc 实务佳但非答案键。",
      "C": "✓ 正确（依题库）。EC2 SG + IAM role for EC2。",
      "D": "✓ 正确（依题库）。task SG + 启动时传入 IAM 凭证。",
      "E": "错（本题未选）。task role 实务佳但非答案键。"
    },
    "diagram_before": "flowchart TB\n  Site[\"网站要上 ECS\"]\n  Sec[\"最小权限\"]\n  Net[\"正确网络／SG\"]\n  X{{\"缺口: 部署后权限步骤未完成\"}}\n  Site --> Sec\n  Site --> Net\n  Sec -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  ECS[\"部署 ECS\"]\n  SG1[\"SG 套到 EC2 实例\"]\n  Role[\"IAM role for EC2 存资源\"]\n  SG2[\"SG 亦可套 tasks\"]\n  Cred[\"启动时传入 IAM 凭证\"]\n  ECS --> SG1 --> Role\n  ECS --> SG2 --> Cred"
  },
  "400": {
    "blocker": "Lambda 已用 DynamoDB，新功能要存取 VPC 内 Neptune。要同时保住对 DynamoDB 与 Neptune 的存取（选两项；题库 A、E）。",
    "requirements": "1) Lambda 可连 Neptune；2) 仍可存取 DynamoDB；3) 依题库架构。",
    "steps": [
      "在 Neptune VPC 建 public subnets 并经 IGW，把 Lambda 放喺呢啲子网（A，依题库）。",
      "另建 private／isolated subnets 放相关资源，并建 DynamoDB VPC endpoint（E）。",
      "调整 security group 允许 Lambda 到 Neptune。",
      "测试 Lambda 同时读写 Neptune 与 DynamoDB。"
    ],
    "solutions": "正确答案 A、E（依题库）。实务更常见系 private + NAT（B），但必须跟 batch。重点：Lambda 要进 VPC 先连到 Neptune；DynamoDB 用 gateway endpoint 私有出。",
    "result_flow": "Lambda（VPC 子网）→ SG 允许 → Neptune；同时 DynamoDB 流量走 VPC endpoint → 两种资料源都可达。",
    "options": {
      "A": "✓ 正确（依题库）。public subnets + IGW 放置 Lambda。",
      "B": "错（本题未选）。private + NAT 实务常见但非答案键。",
      "C": "错。VPC 外 Lambda 无法只靠 IP 范围稳妥连 Neptune。",
      "D": "错。Neptune 无可用于呢种场景的简单 VPC endpoint 取代「Lambda 入 VPC」。",
      "E": "✓ 正确。isolated／private + DynamoDB endpoint。"
    },
    "diagram_before": "flowchart TB\n  L[\"Lambda\"]\n  DDB[\"DynamoDB 已可存取\"]\n  Nep[\"要新增 VPC 内 Neptune\"]\n  X{{\"缺口: 两种资料源<br/>要同时可达\"}}\n  L --> DDB\n  L -.-> Nep\n  Nep -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  L[\"Lambda 放 Neptune VPC 子网\"]\n  SG[\"Security Group 放行\"]\n  Nep[\"存取 Neptune\"]\n  EP[\"DynamoDB VPC Endpoint\"]\n  DDB[\"DynamoDB 仍可达\"]\n  L --> SG --> Nep\n  L --> EP --> DDB"
  },
  "401": {
    "blocker": "DR 要透过 SMB 存取备份资料，5 分钟内要用到，资料好少存取，想平。",
    "requirements": "1) SMB 存取；2) 约 5 分钟内可用；3) 冷资料低成本。",
    "steps": [
      "部署 S3 File Gateway 提供 SMB 介面。",
      "资料放 S3 Standard-IA（不常存取）。",
      "需要时经 gateway 用 SMB 读回，满足约 5 分钟。",
      "避免用取回极慢的 Deep Archive。"
    ],
    "solutions": "正确答案 D。File Gateway + Standard-IA 平衡 SMB、时间与成本。Outposts／FSx Multi-AZ 较贵；Deep Archive 取回太慢。",
    "result_flow": "备份写入 S3 IA → 需要时 SMB 经 File Gateway 读 S3 → 数分钟内可用。",
    "options": {
      "A": "错。Outposts 成本高。",
      "B": "错。FSx Multi-AZ 贵过 IA + Gateway。",
      "C": "错。Deep Archive 无法保证 5 分钟取回。",
      "D": "✓ 正确。S3 File Gateway + Standard-IA。"
    },
    "diagram_before": "flowchart TB\n  Backup[\"DR 备份资料少存取\"]\n  SMB[\"要 SMB 存取\"]\n  Time[\"约 5 分钟内可用\"]\n  X{{\"缺口: 要平又够快\"}}\n  Backup --> SMB --> Time\n  Time -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  Store[\"备份写 S3 Standard-IA\"]\n  FG[\"File Gateway SMB\"]\n  Read[\"需要时读 S3\"]\n  OK[\"数分钟内可用\"]\n  Store --> FG --> Read --> OK"
  },
  "402": {
    "blocker": "灾难时 400 人要遥距开工：混 Windows／Linux 桌面、多种软件、要接 AD、要 MFA，并尽量复制现有桌面体验。",
    "requirements": "1) 完整桌面；2) AD 整合；3) MFA；4) 快速支援大量遥距。",
    "steps": [
      "部署 Amazon WorkSpaces 作为云端桌面。",
      "用 AD Connector 接 on-premises AD。",
      "整合 RADIUS 做 MFA。",
      "依现有映像／软件配置桌面，畀员工登入。"
    ],
    "solutions": "正确答案 C。WorkSpaces 提供完整桌面；AD Connector + RADIUS MFA 符合企业。AppStream 偏应用串流，难复制完整桌面与所有已装软件。",
    "result_flow": "员工登入 WorkSpaces → AD 验证 + RADIUS MFA → 完整云端桌面继续办公。",
    "options": {
      "A": "错。缺少企业级 RADIUS MFA 整合完整度。",
      "B": "错。AppStream 非完整桌面。",
      "C": "✓ 正确。WorkSpaces + AD Connector + RADIUS MFA。",
      "D": "错。AppStream 难提供完整桌面体验。"
    },
    "diagram_before": "flowchart TB\n  Staff[\"灾难 400 人遥距\"]\n  Desk[\"混 Windows／Linux<br/>多软件\"]\n  Need[\"AD + MFA\"]\n  X{{\"缺口: 要复制完整桌面体验\"}}\n  Staff --> Desk --> Need -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  User[\"员工登入\"]\n  WS[\"Amazon WorkSpaces\"]\n  AD[\"AD Connector 验证\"]\n  MFA[\"RADIUS MFA\"]\n  Desk[\"完整云端桌面办公\"]\n  User --> WS --> AD --> MFA --> Desk"
  },
  "403": {
    "blocker": "Amazon Connect 客服想一键标记垃圾电话并自动封锁该号码，要最有效率营运。",
    "requirements": "1) 客服可标记；2) 之后自动封锁；3) 高营运效率。",
    "steps": [
      "在 CCP（客服面板）加自订按钮。",
      "按钮触发 Lambda，更新联络属性并写入 DynamoDB 黑名单。",
      "Contact flow 进线时查属性／黑名单。",
      "命中则自动挂断或拒绝。"
    ],
    "solutions": "正确答案 A。自订 CCP + Lambda + DynamoDB + flow 系 Connect 扩展标准。Contact Lens 系分析；quick connect／语音提示输入都唔如客服一键标记有效。",
    "result_flow": "客服按标记 → Lambda 写 DynamoDB → 下次同号进线 → contact flow 查黑名单 → 自动封锁。",
    "options": {
      "A": "✓ 正确。CCP 自订 + Lambda + DynamoDB 黑名单。",
      "B": "错。Contact Lens 非垃圾电话封锁工具。",
      "C": "错。转接流程效率低于直接封锁。",
      "D": "错。要用户自己输入无法处理已接通垃圾来电场景。"
    },
    "diagram_before": "flowchart TB\n  Call[\"来电进 Amazon Connect\"]\n  Agent[\"客服\"]\n  Spam[\"垃圾电话\"]\n  X{{\"缺口: 想一键标记后自动封锁\"}}\n  Call --> Agent\n  Spam --> Call\n  Agent -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  Agent[\"客服按标记\"]\n  L[\"Lambda 写 DynamoDB\"]\n  Next[\"下次同号进线\"]\n  Flow[\"Contact flow 查黑名单\"]\n  Block[\"自动封锁\"]\n  Agent --> L --> Next --> Flow --> Block"
  },
  "404": {
    "blocker": "工厂感测器要即时串流分析，参数超出范围要即刻通知营运团队。",
    "requirements": "1) 即时撷取；2) 即时判断；3) 即时通知。",
    "steps": [
      "感测器资料送入 Kinesis Data Streams。",
      "Lambda 持续消费并判断阈值。",
      "超出范围即发 SNS 通知营运。",
      "监控延迟确保「即时」。"
    ],
    "solutions": "正确答案 C。Kinesis Streams + Lambda + SNS 简洁即时。Firehose 有缓冲延迟；MSK + Fargate 过重；自建分析服务负担高。",
    "result_flow": "感测器 → Kinesis → Lambda 判断 → 超标 SNS 推送 → 营运即时处理。",
    "options": {
      "A": "错。Firehose 近即时有缓冲，Step Functions 加延迟。",
      "B": "错。MSK + Fargate + SES 过重且通知唔如 SNS。",
      "C": "✓ 正确。Kinesis + Lambda + SNS 标准即时告警。",
      "D": "错。KDA + ECS 营运负担高于 Lambda。"
    },
    "diagram_before": "flowchart TB\n  Sensor[\"工厂感测器\"]\n  Stream[\"要即时串流分析\"]\n  Alert[\"超标要即刻通知\"]\n  X{{\"缺口: 端到端即时链未建\"}}\n  Sensor --> Stream --> Alert\n  Alert -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  Sensor[\"感测器\"]\n  KS[\"Kinesis Data Streams\"]\n  L[\"Lambda 判断\"]\n  SNS[\"SNS 推送\"]\n  Ops[\"营运即时处理\"]\n  Sensor --> KS --> L --> SNS --> Ops"
  },
  "405": {
    "blocker": "EKS 有不可预测的大量 stateless pod 突增，要最大化节点／可用区韧性，避免挤喺同一故障域。",
    "requirements": "1) 撑住突增；2) 最大化跨 AZ 韧性。",
    "steps": [
      "为工作负载设定 topology spread constraints（拓扑分散约束）。",
      "按 AZ 等拓扑键均匀散布 pod。",
      "配合 Cluster Autoscaler／节点组应对突增。",
      "演练单一 AZ 压力，确认仍可服务。"
    ],
    "solutions": "正确答案 D。topology spread 避免 pod 扎堆。减少 node group、刻意 underprovision 都会削弱韧性；control plane 由 EKS 托管，唔系本题重点。",
    "result_flow": "突增 pod 排程 → topology spread 均匀落到各 AZ 节点 → 单点故障影响面最小。",
    "options": {
      "A": "错。分离 control plane 非本题节点韧性关键。",
      "B": "错。更少更大节点降低分散度。",
      "C": "错。underprovision 令 pod 挂起，可用性更差。",
      "D": "✓ 正确。topology spread constraints 最大化韧性。"
    },
    "diagram_before": "flowchart TB\n  EKS[\"EKS\"]\n  Pod[\"不可预测大量<br/>stateless pod 突增\"]\n  Domain[\"易挤同一故障域\"]\n  X{{\"缺口: 跨 AZ 韧性不足\"}}\n  EKS --> Pod --> Domain\n  Domain -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  Surge[\"突增 pod 排程\"]\n  Topo[\"Topology Spread\"]\n  AZ[\"均匀落到各 AZ 节点\"]\n  Res[\"单点故障影响最小\"]\n  Surge --> Topo --> AZ --> Res"
  },
  "406": {
    "blocker": "ECS Fargate 微服务 + RDS MySQL 要跨 Region DR，想恢复时间最短。",
    "requirements": "1) 跨 Region DR；2) 最小化 RTO。",
    "steps": [
      "在备援 Region 预先部署 ECS 服务（冷／暖待命）。",
      "建立 RDS cross-Region read replica 持续同步。",
      "故障时 Lambda 自动 promote replica 并改 Route 53。",
      "流量切到备援 Region ECS。"
    ],
    "solutions": "正确答案 C。预部署 ECS + replica promote 比灾难时先建丛集／由 snapshot 还原快得多。改成 DynamoDB global table 等于重做资料模型。",
    "result_flow": "主 Region 服务中 → DB 持续复制到备援 → 灾难 promote + DNS 切换 → 预部署 ECS 立即接手。",
    "options": {
      "A": "错。事发才建 ECS／由 snapshot 还原 RTO 长。",
      "B": "错。事发才建 ECS 仍慢。",
      "C": "✓ 正确。预部署 + read replica promote 最短恢复。",
      "D": "错。snapshot 转 DynamoDB 不可行且改动过大。"
    },
    "diagram_before": "flowchart TB\n  ECS[\"ECS Fargate 微服务\"]\n  RDS[\"RDS MySQL\"]\n  DR[\"要跨 Region DR\"]\n  X{{\"缺口: 想 RTO 最短\"}}\n  ECS --> RDS --> DR -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  Primary[\"主 Region 服务中\"]\n  Repl[\"DB 持续复制到备援\"]\n  Promo[\"灾难 promote + DNS\"]\n  Pre[\"预部署 ECS 立即接手\"]\n  Primary --> Repl --> Promo --> Pre"
  },
  "407": {
    "blocker": "Organizations 要追踪 EC2 使用量，若每日用量比 30 天平均高 10% 就要告警。",
    "requirements": "1) 追踪 EC2 用量（如 running hours）；2) 相对 30 天平均 +10% 告警；3) 通知架构团队。",
    "steps": [
      "建立 AWS Budgets 用量型预算（EC2 running hours）。",
      "以历史／30 天平均设定阈值（+10%）。",
      "设定每日检查与告警通知架构团队。",
      "定期回顾预算准确度。"
    ],
    "solutions": "正确答案 A。Budgets 支援用量预算与自订阈值。Cost Anomaly Detection 偏金额异常；Trusted Advisor／Detective 唔做呢种用量告警。",
    "result_flow": "EC2 用量汇总 → Budgets 每日比对阈值 → 超过 30 天平均 10% → 通知架构团队。",
    "options": {
      "A": "✓ 正确。Budgets 用量预算 + 告警。",
      "B": "错。异常侦测难精确表达 +10% vs 30 天平均用量。",
      "C": "错。Trusted Advisor 无此自订用量告警。",
      "D": "错。Detective 系安全调查工具。"
    },
    "diagram_before": "flowchart TB\n  Org[\"Organizations\"]\n  EC2[\"EC2 使用量\"]\n  Avg[\"要比 30 天平均\"]\n  X{{\"缺口: 每日高 10% 要告警\"}}\n  Org --> EC2 --> Avg\n  Avg -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  Use[\"EC2 用量汇总\"]\n  Bud[\"AWS Budgets<br/>每日比阈值\"]\n  Over[\"超过 30 天平均 +10%\"]\n  Notify[\"通知架构团队\"]\n  Use --> Bud --> Over --> Notify"
  },
  "408": {
    "blocker": "电商订单要高可用、松耦合、撑促销突发，最后写入 DynamoDB。",
    "requirements": "1) 松耦合；2) 高可用自动扩展；3) 可靠写入 DynamoDB。",
    "steps": [
      "订单先入 SQS 伫列缓冲。",
      "Lambda 自动扩展消费伫列。",
      "处理后写入 DynamoDB。",
      "监控伫列深度与错误重试。"
    ],
    "solutions": "正确答案 B。SQS + Lambda 系经典松耦合。EC2 自管库、Step Functions + ECS、Kinesis + EC2 都较重或较耦。",
    "result_flow": "下单 → SQS 缓冲高峰 → Lambda 扩展处理 → DynamoDB 持久化。",
    "options": {
      "A": "错。EC2 收单偏紧耦合、扩展差。",
      "B": "✓ 正确。SQS + Lambda 松耦合自动扩展。",
      "C": "错。Step Functions + ECS 对简单订单过重。",
      "D": "错。Kinesis + EC2 要管实例。"
    },
    "diagram_before": "flowchart TB\n  Order[\"电商下单\"]\n  Peak[\"促销突发\"]\n  DDB[\"最终写 DynamoDB\"]\n  X{{\"缺口: 要松耦合高可用缓冲\"}}\n  Order --> Peak --> DDB\n  Peak -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  Order[\"下单\"]\n  SQS[\"SQS 缓冲高峰\"]\n  L[\"Lambda 自动扩展处理\"]\n  DDB[\"DynamoDB 持久化\"]\n  Order --> SQS --> L --> DDB"
  },
  "409": {
    "blocker": "Lambda 连 RDS PostgreSQL（QA 与 production），唔可以喺程式暴露密码，仲要自动轮换。",
    "requirements": "1) 凭证不进程式码；2) 分环境；3) 自动轮换密码。",
    "steps": [
      "在 Secrets Manager 分别存放 QA／prod 资料库密钥。",
      "启用自动轮换。",
      "Lambda 环境变数只放 secret ARN。",
      "执行时读取 secret 再连 RDS。"
    ],
    "solutions": "正确答案 B。Secrets Manager 原生支援 DB 密码轮换。Parameter Store 标准参数无完整自动轮换；KMS 管金钥唔管凭证轮换；S3 存密码不安全。",
    "result_flow": "Lambda 启动 → 用 ARN 取 Secrets Manager → 连 RDS；定期自动轮换 → 下次取新密码。",
    "options": {
      "A": "错。Parameter Store 缺完整自动轮换能力。",
      "B": "✓ 正确。Secrets Manager 储存 + 自动轮换。",
      "C": "错。KMS 不是凭证仓库。",
      "D": "错。S3 存凭证不安全且无轮换。"
    },
    "diagram_before": "flowchart TB\n  L[\"Lambda\"]\n  RDS[\"RDS PostgreSQL<br/>QA + Production\"]\n  Code[\"密码唔可进程式码\"]\n  X{{\"缺口: 又要自动轮换\"}}\n  L --> RDS\n  Code -.-> L\n  L -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  L[\"Lambda 启动\"]\n  SM[\"Secrets Manager 取密码\"]\n  RDS[\"连对应环境 RDS\"]\n  Rot[\"定期自动轮换\"]\n  Next[\"下次取新密码\"]\n  L --> SM --> RDS\n  Rot --> Next --> SM"
  },
  "410": {
    "blocker": "Control Tower OU 内所有 EC2（新旧）都唔可以有 public IP，要硬性阻止。",
    "requirements": "1) 禁止新实例取得 public IP；2) 禁止帮现有实例加 public IP；3) OU 层级强制。",
    "steps": [
      "撰写 SCP Deny 相关 EC2 动作（启动时要 public IP、associate address 等）。",
      "将 SCP 附加到目标 OU。",
      "测试新旧路径都会被拒。",
      "保留detective 工具作辅助而非唯一控制。"
    ],
    "solutions": "正确答案 C。SCP 系预防性硬挡。SSM runbook、Config + Lambda 多属事后补救；其他 control 力度不如 SCP。",
    "result_flow": "帐户尝试为 EC2 配 public IP → OU SCP 拒绝 → 机队保持无公网 IP。",
    "options": {
      "A": "错。runbook 事后修，阻唔住建立当下。",
      "B": "错。力度不如 SCP 直接 Deny API。",
      "C": "✓ 正确。SCP 预防性禁止 public IP。",
      "D": "错。Config + Lambda 系侦测补救。"
    },
    "diagram_before": "flowchart TB\n  CT[\"Control Tower OU\"]\n  EC2[\"EC2 机队\"]\n  Pub[\"仍可配 public IP\"]\n  X{{\"缺口: 新旧都要硬挡公网 IP\"}}\n  CT --> EC2 --> Pub -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  Try[\"帐户尝试为 EC2<br/>配 public IP\"]\n  SCP[\"OU 层 SCP 拒绝\"]\n  New[\"新实例挡公网 IP\"]\n  Old[\"现有实例亦唔准加\"]\n  Fleet[\"机队保持无公网 IP\"]\n  Try --> SCP\n  SCP --> New\n  SCP --> Old\n  New --> Fleet\n  Old --> Fleet"
  },
  "411": {
    "blocker": "第三方 Docker 应用跑 Fargate，只能畀特定互联网使用者用，又唔能改应用或接对方 IdP，但要 MFA。",
    "requirements": "1) 不改应用；2) 只准特定使用者；3) MFA；4) 从互联网存取。",
    "steps": [
      "ALB 放在 Fargate 服务前面。",
      "建立 Cognito user pool 管理允许的使用者。",
      "强制 MFA。",
      "ALB 使用 authenticate-cognito，通过后先转去应用。"
    ],
    "solutions": "正确答案 A。ALB + Cognito 在前端完成验证，应用零修改。IAM／Identity Center 不是这类互联网 App 使用者验证；Amplify 也不是答案。",
    "result_flow": "用户 → ALB → Cognito 登入＋MFA → 通过才到 Fargate 应用。",
    "options": {
      "A": "✓ 正确。Cognito + ALB authenticate-cognito + MFA。",
      "B": "错。IAM 管 AWS API 而非 App 用户。",
      "C": "错。Identity Center 偏 AWS SSO。",
      "D": "错。Amplify 不是此场景身分方案核心。"
    },
    "diagram_before": "flowchart TB\n  User[\"互联网使用者\"]\n  Far[\"Fargate 第三方 Docker\"]\n  NoChange[\"唔能改 App／接对方 IdP\"]\n  X{{\"缺口: 只要特定用户＋MFA\"}}\n  User --> Far\n  NoChange --> Far\n  Far -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  User[\"用户\"]\n  ALB[\"ALB\"]\n  Cog[\"Cognito 登入 + MFA\"]\n  App[\"通过才到 Fargate\"]\n  User --> ALB --> Cog --> App"
  },
  "412": {
    "blocker": "CloudFormation StackSet 要把含自订名称 IAM role 的范本部署到新 Region，所有 stack instance 都失败。",
    "requirements": "1) 新 Region 可部署；2) 可建立自订名称 IAM 资源。",
    "steps": [
      "确认并启用目标新 Region。",
      "StackSet 部署时宣告 CAPABILITY_NAMED_IAM。",
      "重新部署 stack instances。",
      "验证 IAM role 与资源建立成功。"
    ],
    "solutions": "正确答案 A。新 Region 未启用、又缺 CAPABILITY_NAMED_IAM，系常见双重失败原因。只有 CAPABILITY_IAM 不够建立自订名称 role。",
    "result_flow": "启用 Region → StackSet 带 NAMED_IAM 能力部署 → 各帐户／Region 成功建立具名 IAM role。",
    "options": {
      "A": "✓ 正确。启用 Region + CAPABILITY_NAMED_IAM。",
      "B": "错。CAPABILITY_IAM 不足以建具名 IAM。",
      "C": "错。权限模式不是此失败主因。",
      "D": "错。同样缺 NAMED_IAM。"
    },
    "diagram_before": "flowchart TB\n  SS[\"CloudFormation StackSet\"]\n  Tpl[\"范本含具名 IAM role\"]\n  Reg[\"部署到新 Region\"]\n  X{{\"缺口: 所有 stack instance 失败\"}}\n  SS --> Tpl --> Reg -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  Enable[\"启用目标 Region\"]\n  Cap[\"CAPABILITY_NAMED_IAM\"]\n  Deploy[\"StackSet 再部署\"]\n  OK[\"成功建立具名 IAM role\"]\n  Enable --> Cap --> Deploy --> OK"
  },
  "413": {
    "blocker": "Lambda 好频密对 Aurora replica 建短连线，出现 too many connections，可靠性差。",
    "requirements": "1) 解决连线暴增；2) 读取走 replica；3) 提升可靠性。",
    "steps": [
      "部署 RDS Proxy 做连线池。",
      "Lambda 改连 Proxy 而非直连 DB。",
      "使用 read-only 端点导向 replica。",
      "观察连线数与错误下降。"
    ],
    "solutions": "正确答案 A。RDS Proxy 专治 Lambda 短连线风暴。只加 max_connections 或加大实例不治本。",
    "result_flow": "大量 Lambda 并发 → RDS Proxy 池化连线 → 有序打到 Aurora replica → 不再 too many connections。",
    "options": {
      "A": "✓ 正确。RDS Proxy + read-only endpoint。",
      "B": "错。加 max_connections 不治本。",
      "C": "错。扩大实例不解决连线池问题。",
      "D": "错。配置方式不正确／不可行。"
    },
    "diagram_before": "flowchart TB\n  Many[\"大量 Lambda 短连线\"]\n  Aurora[\"Aurora Replica\"]\n  Err[\"too many connections\"]\n  X{{\"缺口: 可靠性差\"}}\n  Many --> Aurora --> Err\n  Err -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  L[\"大量 Lambda 并发\"]\n  Proxy[\"RDS Proxy 池化\"]\n  Aurora[\"有序打到 Aurora Replica\"]\n  OK[\"不再连线爆满\"]\n  L --> Proxy --> Aurora --> OK"
  },
  "414": {
    "blocker": "IoT 感测器出厂已有 CA 签发凭证，安装前唔可以传资料，装好后先准传送。",
    "requirements": "1) 信任出厂 CA；2) 安装前封锁；3) 安装后自动／受控启用。",
    "steps": [
      "在 IoT Core 注册 CA 并启用 auto-registration。",
      "设定 provisioning template。",
      "pre-provisioning hook Lambda 验证序号等条件。",
      "制造／安装流程 RegisterThing，通过后先允许上线传资料。"
    ],
    "solutions": "正确答案 C。CA 注册 + template + pre-provisioning hook 系凭证装置布建标准。缺 CA／用错 claim 模式都唔啱此题。",
    "result_flow": "装置出示 CA 凭证 → IoT 自动注册流程 → hook 验序号／安装状态 → 通过先 RegisterThing 并开始传资料。",
    "options": {
      "A": "错。缺完整 CA auto-registration 链。",
      "B": "错。非标准 IoT 布建流程。",
      "C": "✓ 正确。CA + template + pre-provisioning hook。",
      "D": "错。claim certificate 模式唔对此 CA 出厂场景。"
    },
    "diagram_before": "flowchart TB\n  Device[\"出厂已有 CA 凭证\"]\n  Before[\"安装前唔可传资料\"]\n  After[\"装好后先准送\"]\n  X{{\"缺口: 缺受控自动布建\"}}\n  Device --> Before\n  Device --> After\n  Before -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  Cert[\"装置出示 CA 凭证\"]\n  IoT[\"IoT 自动注册\"]\n  Hook[\"Pre-provisioning hook<br/>验安装状态\"]\n  Reg[\"通过先 RegisterThing\"]\n  Data[\"开始传资料\"]\n  Cert --> IoT --> Hook --> Reg --> Data"
  },
  "415": {
    "blocker": "CI/CD 要：GitHub 触发、跑单元测试、失败通知、零停机部署、快速回滚。",
    "requirements": "1) GitHub 自动触发；2) 测试；3) 失败告警；4) 零停机与可回滚。",
    "steps": [
      "GitHub webhook 触发 CodePipeline。",
      "CodeBuild（或整合测试步骤）跑单元测试。",
      "失败用 SNS 通知。",
      "CodeDeploy blue/green 零停机部署，异常可回滚。"
    ],
    "solutions": "正确答案 B。webhook + 测试 + SNS + blue/green 一次满足。in-place 难零停机；X-Ray 唔系单元测试工具。",
    "result_flow": "push GitHub → webhook → Pipeline 测试 → 成功则 blue/green 上线；失败 SNS 通知；有问题回滚。",
    "options": {
      "A": "错。触发方式不对且 in-place 非零停机。",
      "B": "✓ 正确。完整 CI/CD + blue/green。",
      "C": "错。X-Ray 不是测试工具。",
      "D": "错。X-Ray + in-place 都不符合。"
    },
    "diagram_before": "flowchart TB\n  Git[\"GitHub\"]\n  Test[\"要单元测试\"]\n  Deploy[\"零停机＋可回滚\"]\n  X{{\"缺口: CI/CD 链未齐\"}}\n  Git --> Test\n  Git --> Deploy\n  Test -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  Push[\"GitHub push\"]\n  WH[\"Webhook → Pipeline\"]\n  Test[\"单元测试\"]\n  BG[\"成功 blue/green 上线\"]\n  SNS[\"失败 SNS 通知／可回滚\"]\n  Push --> WH --> Test --> BG\n  Test -.-> SNS"
  },
  "416": {
    "blocker": "多租户 SaaS 共用 DynamoDB + Lambda，要按 tenant ID 分摊 DynamoDB 成本，想最低营运负担。",
    "requirements": "1) 按租户分成本；2) 尽量唔改表结构；3) 低营运负担。",
    "steps": [
      "Lambda 处理时记录每个 tenant 消耗的 RCU/WCU 到 CloudWatch Logs。",
      "排程另一支 Lambda 汇总各 tenant 用量。",
      "按比例分摊 DynamoDB 帐单。",
      "输出租户成本报表。"
    ],
    "solutions": "正确答案 B。应用层记容量单位最精准。表级标签分唔到共用表内租户；改 partition key 要大重构；Pricing Calculator 只系估算。",
    "result_flow": "请求带 tenant → Lambda 记 RCU/WCU → 排程汇总 → 产出各租户成本占比。",
    "options": {
      "A": "错。表级标签无法拆共用表内多租户。",
      "B": "✓ 正确。记录 RCU/WCU 做租户分摊。",
      "C": "错。改资料模型负担高。",
      "D": "错。Pricing Calculator 非实际用量分帐。"
    },
    "diagram_before": "flowchart TB\n  Multi[\"多租户 SaaS\"]\n  Share[\"共用 DynamoDB + Lambda\"]\n  Tenant[\"要按 tenant 分成本\"]\n  X{{\"缺口: 低营运负担做法\"}}\n  Multi --> Share --> Tenant\n  Tenant -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  Req[\"请求带 tenant ID\"]\n  L[\"Lambda 记 RCU/WCU\"]\n  Job[\"排程汇总\"]\n  Cost[\"各租户成本占比\"]\n  Req --> L --> Job --> Cost"
  },
  "417": {
    "blocker": "S3 资料要留 1 年，又惊长期凭证泄漏被人删光。要保护而家同未来物件。",
    "requirements": "1) 保留 1 年；2) 即使凭证泄漏亦难删；3) 覆盖现有与未来物件。",
    "steps": [
      "在独立安全帐户建新桶。",
      "开启 Versioning 与 Object Lock（物件锁定）合规保留 1 年。",
      "把现有资料复制过去。",
      "应用改写入受保护桶。"
    ],
    "solutions": "正确答案 A。跨帐户 Object Lock WORM 即使原帐户凭证泄漏都删唔甩。Config 补救、GuardDuty 侦测都阻唔住已授权删除。",
    "result_flow": "资料复制到安全帐户 Object Lock 桶 → 1 年内不可删改 → 原帐户失陷亦难破坏副本。",
    "options": {
      "A": "✓ 正确。安全帐户 + Object Lock 1 年。",
      "B": "错。事后补救挡唔住凭证滥用删除。",
      "C": "错。Service Catalog 只管未来建桶，唔护现有资料。",
      "D": "错。GuardDuty 只能侦测，不能防止删除。"
    },
    "diagram_before": "flowchart TB\n  S3[\"S3 资料要留 1 年\"]\n  Risk[\"长期凭证可能泄漏\"]\n  Del[\"已授权亦可删光\"]\n  X{{\"缺口: 泄漏后难保护资料\"}}\n  S3 --> Risk --> Del\n  Del -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  Src[\"原帐户 S3 资料\"]\n  Copy[\"复制到安全帐户\"]\n  Lock[\"Object Lock WORM<br/>1 年不可删改\"]\n  Safe[\"原帐户失陷亦难毁副本\"]\n  Src --> Copy --> Lock --> Safe"
  },
  "418": {
    "blocker": "CloudFront 后面有 API Gateway（已 JWT 授权）同 ALB；ALB 路径仍接受未验证请求，存在绕过风险。",
    "requirements": "1) 所有后端只回应已验证使用者；2) 与现有 JWT／IdP 体系一致。",
    "steps": [
      "为 ALB 设定 authenticate-oidc（或同等 OIDC 整合）。",
      "与 API Gateway 一样要求先登入／持有效身分。",
      "未通过验证直接拒绝，唔转后端。",
      "端到端测试两条路径都要验证。"
    ],
    "solutions": "正确答案 A。ALB OIDC 验证补上缺口。Signed URL、WAF、事后 CloudTrail 都唔等于使用者身分验证。",
    "result_flow": "用户 → CloudFront → API 走 JWT；ALB 走 OIDC 验证 → 只有已验证请求到后端。",
    "options": {
      "A": "✓ 正确。ALB 整合 OIDC 强制验证。",
      "B": "错。signed URL 唔等于使用者身分体系。",
      "C": "错。WAF 唔做登入验证。",
      "D": "错。事后分析阻唔住当下未验证请求。"
    },
    "diagram_before": "flowchart TB\n  User[\"用户\"]\n  CF[\"CloudFront\"]\n  API[\"API Gateway 有 JWT\"]\n  ALB[\"ALB 路径可绕过\"]\n  X{{\"缺口: 未验证请求可到 ALB\"}}\n  User --> CF\n  CF --> API\n  CF --> ALB\n  ALB -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  User[\"用户\"]\n  CF[\"CloudFront\"]\n  API[\"API：JWT 授权\"]\n  ALB[\"ALB：OIDC 验证\"]\n  OK[\"只有已验证到后端\"]\n  User --> CF\n  CF --> API --> OK\n  CF --> ALB --> OK"
  },
  "419": {
    "blocker": "Control Tower landing zone 要跨所有帐户集中睇安全状态，并配合 preventive／detective controls。",
    "requirements": "1) 组织级集中安全视图；2) 整合多帐户；3) 支援委派管理。",
    "steps": [
      "在 Organizations 启用 Security Hub。",
      "指定委派管理员帐户。",
      "开启安全标准与整合（Config、GuardDuty 等）。",
      "合规／安全团队用 Security Hub 仪表板总览。"
    ],
    "solutions": "正确答案 D。Security Hub 系集中安全态势标准服务。Config conformance pack 偏合规规则；Detective 偏调查。",
    "result_flow": "各帐户安全发现 → 汇入 Security Hub → 委派管理员集中检视 → 推动修复。",
    "options": {
      "A": "错。conformance packs 非完整安全态势中心。",
      "B": "错。Detective 重调查非全面态势。",
      "C": "错。非 Control Tower 标准集中视图方案。",
      "D": "✓ 正确。Security Hub 组织委派管理员。"
    },
    "diagram_before": "flowchart TB\n  CT[\"Control Tower landing zone\"]\n  Acc[\"多帐户安全发现\"]\n  Scatter[\"状态分散难睇\"]\n  X{{\"缺口: 无组织级集中安全视图\"}}\n  CT --> Acc --> Scatter\n  Scatter -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  Find[\"各帐户安全发现\"]\n  Hub[\"Security Hub 汇入\"]\n  Admin[\"委派管理员集中检视\"]\n  Fix[\"推动修复\"]\n  Find --> Hub --> Admin --> Fix"
  },
  "420": {
    "blocker": "欧洲约 60TB 软体映像要持续传到 ap-northeast-1，每日有新增，要加密、唔想自订开发。",
    "requirements": "1) 大批量持续传输；2) 每日增量；3) 加密；4) 无自订开发。",
    "steps": [
      "部署 DataSync agent。",
      "建立排程任务同步到目标 Region／S3。",
      "启用加密传输。",
      "每日自动抓新增映像。"
    ],
    "solutions": "正确答案 A。DataSync 专为持续档案同步。Snowball 偏一次性；自写 S3 multipart + VPN 要开发；Firehose 非档案同步工具。",
    "result_flow": "欧洲来源 → DataSync 排程加密传输 → ap-northeast-1 存放；每日增量自动跟上。",
    "options": {
      "A": "✓ 正确。DataSync 排程增量加密传输。",
      "B": "错。Firehose／加速器组合不适合此档案同步。",
      "C": "错。Snowball 非每日增量最佳。",
      "D": "错。自订开发多，负担高。"
    },
    "diagram_before": "flowchart TB\n  EU[\"欧洲约 60TB 映像\"]\n  Daily[\"每日有新增\"]\n  JP[\"要传到 ap-northeast-1\"]\n  X{{\"缺口: 加密持续同步<br/>唔想自订开发\"}}\n  EU --> Daily --> JP\n  JP -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  Src[\"欧洲来源\"]\n  DS[\"DataSync 排程加密\"]\n  Dst[\"ap-northeast-1 存放\"]\n  Inc[\"每日增量自动跟上\"]\n  Src --> DS --> Dst --> Inc"
  },
  "421": {
    "blocker": "API Gateway 约 20% 错误；Lambda throttle 只 1%、error 10%，错误时有 call DynamoDB。行销活动后变差，要改善回应时间。",
    "requirements": "1) 找出真正瓶颈；2) 改善延迟／错误；3) 快速见效。",
    "steps": [
      "解读指标：Lambda 节流很低，瓶颈较似 DynamoDB。",
      "为 DynamoDB 启用 auto scaling。",
      "观察错误率与延迟是否下降。",
      "必要时再优化热 key，但先做容量自动扩展。"
    ],
    "solutions": "正确答案 B。throttle 1% 代表并发唔系主因；错误伴随 DynamoDB 呼叫，应先 auto scaling 容量。",
    "result_flow": "活动流量 ↑ → DynamoDB auto scaling 加容量 → Lambda 呼叫成功 ↑ → API 错误率／延迟下降。",
    "options": {
      "A": "错。Lambda 节流只有 1%，加并发非主因。",
      "B": "✓ 正确。DynamoDB auto scaling 对症。",
      "C": "错。API throttle 未解决 DB 瓶颈。",
      "D": "错。重设 partition key 改动大，非即时首选。"
    },
    "diagram_before": "flowchart TB\n  APIGW[\"API Gateway 约 20% 错误\"]\n  L[\"Lambda throttle 1%<br/>error 10%\"]\n  DDB[\"错误时 call DynamoDB\"]\n  X{{\"缺口: 活动后变差<br/>要改善延迟\"}}\n  APIGW --> L --> DDB\n  APIGW -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  Load[\"活动流量上升\"]\n  Scale[\"DynamoDB auto scaling\"]\n  Cap[\"容量足够\"]\n  L[\"Lambda 呼叫成功↑\"]\n  API[\"API 错误／延迟下降\"]\n  Load --> Scale --> Cap --> L --> API"
  },
  "422": {
    "blocker": "3 台 Linux VM Web + 共享档案要快速上 AWS 做高可用，架构变更要最少。",
    "requirements": "1) 高可用多 AZ；2) 共享档案；3) 最少改应用。",
    "steps": [
      "3 台应用改为 3 AZ 的 EC2。",
      "共享储存改用 EFS（NFS）。",
      "前面加 ALB 做负载平衡。",
      "健康检查与跨 AZ 容错验证。"
    ],
    "solutions": "正确答案 B。EC2 + EFS + ALB 最接近 lift-and-shift。容器化或 EKS 要大改；EBS 难共享。",
    "result_flow": "用户 → ALB → 多 AZ EC2 → 共享 EFS 档案；单一 AZ 故障仍可服务。",
    "options": {
      "A": "错。容器化 + S3 改动大。",
      "B": "✓ 正确。EC2 + EFS + ALB 最少变更。",
      "C": "错。EKS + Lustre 重构大。",
      "D": "错。跨 Region + EBS 过度复杂且共享困难。"
    },
    "diagram_before": "flowchart TB\n  VM[\"3 台 Linux VM Web\"]\n  Share[\"共享档案\"]\n  HA[\"要高可用多 AZ\"]\n  X{{\"缺口: 上 AWS 架构改动要最少\"}}\n  VM --> Share --> HA\n  HA -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  User[\"用户\"]\n  ALB[\"ALB 多 AZ\"]\n  EC2[\"多 AZ EC2\"]\n  EFS[\"共享 EFS\"]\n  HA[\"单 AZ 故障仍可服务\"]\n  User --> ALB --> EC2 --> EFS --> HA"
  },
  "423": {
    "blocker": "Linux VMware 迁移前要网络依赖图（IP、hostname、连线关系）。",
    "requirements": "1) 收集连线资讯；2) 产生依赖图；3) 支援迁移规划。",
    "steps": [
      "在 VM 安装 Application Discovery Agent。",
      "收集进程与网络连线。",
      "于 Migration Hub 开启网络图权限与视觉化。",
      "用图规划迁移波次。"
    ],
    "solutions": "正确答案 A。Agent + Migration Hub 网络图系标准。Agentless 细节不足；MGN 偏搬迁执行。",
    "result_flow": "Agent 采集连线 → Migration Hub 产出依赖图 → 团队按依赖批次迁移。",
    "options": {
      "A": "✓ 正确。Discovery Agent + Migration Hub。",
      "B": "错。Agentless 欠详细连线图。",
      "C": "错。偏迁移执行非评估。",
      "D": "错。CSV + CloudWatch 非标准依赖分析。"
    },
    "diagram_before": "flowchart TB\n  VMware[\"Linux VMware\"]\n  Mig[\"迁移前规划\"]\n  Need[\"要 IP／hostname／连线图\"]\n  X{{\"缺口: 依赖关系未可视化\"}}\n  VMware --> Mig --> Need\n  Need -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  Agent[\"Application Discovery Agent\"]\n  Conn[\"采集进程与网络连线\"]\n  MH[\"Migration Hub 网络图\"]\n  Wave[\"按依赖规划迁移波次\"]\n  Agent --> Conn --> MH --> Wave"
  },
  "424": {
    "blocker": "Lambda + RDS MySQL Multi-AZ 在活动期连线过多、回应慢，要同时改善扩展、效能、可用性。",
    "requirements": "1) 更高资料库效能；2) 读扩展；3) 解决 Lambda 连线风暴。",
    "steps": [
      "迁移到 Aurora。",
      "加 Aurora Replica 扩展读取。",
      "前面加 RDS Proxy 池化 Lambda 连线。",
      "压测活动流量。"
    ],
    "solutions": "正确答案 D。Aurora + Replica + RDS Proxy 三位一体。外部自建连线池或只加 RDS replica 都较弱。",
    "result_flow": "Lambda → RDS Proxy 池化 → Aurora 写／Replica 读 → 活动期稳定快速。",
    "options": {
      "A": "错。传统 replica + 告警反应慢且无连线池。",
      "B": "错。自建连线池要维护。",
      "C": "错。Route 53 权重解决唔到连线池。",
      "D": "✓ 正确。Aurora + Proxy 最佳实务。"
    },
    "diagram_before": "flowchart TB\n  L[\"Lambda\"]\n  RDS[\"RDS MySQL Multi-AZ\"]\n  Peak[\"活动期连线过多慢\"]\n  X{{\"缺口: 要同时提升扩展<br/>效能与可用性\"}}\n  L --> RDS\n  Peak --> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  L[\"Lambda\"]\n  Proxy[\"RDS Proxy 池化\"]\n  Aurora[\"Aurora 写入\"]\n  RR[\"Aurora Replica 读\"]\n  OK[\"活动期稳定快速\"]\n  L --> Proxy\n  Proxy --> Aurora\n  Proxy --> RR\n  Aurora --> OK\n  RR --> OK"
  },
  "425": {
    "blocker": "地端 SMB 共享要最终上 S3，但迁移完成前应用仍要经 SMB 读写，之后先改 S3 API。",
    "requirements": "1) 迁移期间维持 SMB；2) 资料落 S3；3) 之后可切 API。",
    "steps": [
      "部署 S3 File Gateway。",
      "应用继续用 SMB 挂载 gateway。",
      "资料实际落在 S3。",
      "迁移完成后应用逐步改为直接 S3 API。"
    ],
    "solutions": "正确答案 D。File Gateway 系 SMB→S3 渐进桥梁。直接 copy 到 S3 会断 SMB；FSx 终态唔系 S3。",
    "result_flow": "地端 App SMB → File Gateway → S3；完成后 App 改 S3 API，gateway 可退役。",
    "options": {
      "A": "错。终态仍偏 FSx 非 S3。",
      "B": "错。直接上 S3 会令 SMB 应用中断。",
      "C": "错。SMS 系 VM 迁移。",
      "D": "✓ 正确。S3 File Gateway 渐进迁移。"
    },
    "diagram_before": "flowchart TB\n  App[\"地端 App 要 SMB\"]\n  Share[\"SMB 共享\"]\n  Goal[\"最终要上 S3\"]\n  X{{\"缺口: 迁移完成前<br/>仍要经 SMB 读写\"}}\n  App --> Share --> Goal\n  Share -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  App[\"地端 App SMB\"]\n  FG[\"S3 File Gateway\"]\n  S3[\"资料实际落 S3\"]\n  Later[\"完成后改 S3 API\"]\n  App --> FG --> S3 --> Later"
  },
  "426": {
    "blocker": "全球票券验证 API 要最低延迟，资料要在 3 个 Region 可用。",
    "requirements": "1) 全球低延迟；2) 多 Region 资料；3) 验证逻辑靠近用户。",
    "steps": [
      "DynamoDB global tables 做 3 Region 多主复制。",
      "CloudFront 分发 API。",
      "用 Lambda@Edge 在边缘执行验证逻辑读 global table。",
      "量测各区域延迟。"
    ],
    "solutions": "正确答案 D。Lambda@Edge + global tables 最贴用户。CloudFront Functions 不能做网络 I/O 打 DynamoDB；多 Region ECS/EKS 营运较重。",
    "result_flow": "用户就近打 CloudFront → Lambda@Edge 验证 → 读本地 Region global table → 低延迟回复。",
    "options": {
      "A": "错。GA + ECS 多 Region 营运重。",
      "B": "错。EKS 三 Region 负担高。",
      "C": "错。CloudFront Functions 不能呼叫 DynamoDB。",
      "D": "✓ 正确。Lambda@Edge + DynamoDB global tables。"
    },
    "diagram_before": "flowchart TB\n  User[\"全球用户\"]\n  API[\"票券验证 API\"]\n  Data[\"资料要 3 Region 可用\"]\n  X{{\"缺口: 延迟要最低\"}}\n  User --> API --> Data\n  API -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  User[\"用户就近\"]\n  CF[\"CloudFront\"]\n  Edge[\"Lambda@Edge 验证\"]\n  GT[\"DynamoDB Global Tables\"]\n  Fast[\"低延迟回复\"]\n  User --> CF --> Edge --> GT --> Fast"
  },
  "427": {
    "blocker": "CloudFront 唯一 origin 系 ALB，要防止有人绕过 CloudFront 直打 ALB。",
    "requirements": "1) 只接受来自 CloudFront 的请求；2) 秘密可轮换；3) 强化 origin 安全。",
    "steps": [
      "Secrets Manager 存放共享密钥并可轮换。",
      "CloudFront 对 origin 加自订 header 带密钥。",
      "ALB 关联 WAF，规则检查 header 是否正确。",
      "错误 header 一律封锁。"
    ],
    "solutions": "正确答案 A。自订 secret header + WAF 系保护 origin 标准。只靠 Shield 或错误挡 IP 会误伤。",
    "result_flow": "用户 → CloudFront（注入 secret header）→ WAF 验证 header → ALB；直打 ALB 无 header 被拒。",
    "options": {
      "A": "✓ 正确。secret header + WAF + Secrets Manager。",
      "B": "错。乱挡 CloudFront IP 会连正常流量都断。",
      "C": "错。ALB 本身要配合 WAF 才能有效检 header。",
      "D": "错。Shield Advanced 不做 origin 密钥验证。"
    },
    "diagram_before": "flowchart TB\n  User[\"用户\"]\n  CF[\"CloudFront\"]\n  ALB[\"唯一 origin ALB\"]\n  Bypass[\"可绕过 CF 直打 ALB\"]\n  X{{\"缺口: origin 未锁定\"}}\n  User --> CF --> ALB\n  Bypass --> ALB\n  Bypass -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  User[\"用户\"]\n  CF[\"CloudFront 注入 secret header\"]\n  WAF[\"WAF 验证 header\"]\n  ALB[\"ALB 只收合法请求\"]\n  Deny[\"直打无 header 被拒\"]\n  User --> CF --> WAF --> ALB\n  Deny -.-> ALB"
  },
  "428": {
    "blocker": "多 Region 关键资料存取唔可以走公网，要高可用又相对省钱的 WAN 方案。",
    "requirements": "1) 私有连线；2) 多 Region 存取；3) 成本效益高于每 Region 一条 DX。",
    "steps": [
      "建一条 Direct Connect 到 AWS。",
      "接 Direct Connect Gateway。",
      "把多个 Region 的 VPC 关联到 DX Gateway。",
      "地端经同一 DX 私有存取各 Region 资料。"
    ],
    "solutions": "正确答案 D。一条 DX + DX Gateway 跨 Region 最划算。每 Region 一条 DX 好贵；旧 transit VPC 较复杂。",
    "result_flow": "地端 → Direct Connect → DX Gateway → 各 Region VPC 私有存取资料。",
    "options": {
      "A": "错。每 Region 独立 DX 成本极高。",
      "B": "错。peering 方案无法优雅解决此多 Region DX 需求。",
      "C": "错。transit VPC 属旧式，较复杂。",
      "D": "✓ 正确。DX + DX Gateway 标准且省。"
    },
    "diagram_before": "flowchart TB\n  OnPrem[\"地端\"]\n  Multi[\"多 Region 关键资料\"]\n  Priv[\"唔可走公网\"]\n  X{{\"缺口: 高可用又要相对省 WAN\"}}\n  OnPrem --> Multi --> Priv\n  Priv -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  OnPrem[\"地端\"]\n  DX[\"一条 Direct Connect\"]\n  DXG[\"DX Gateway\"]\n  VPCs[\"各 Region VPC 私有存取\"]\n  OnPrem --> DX --> DXG --> VPCs"
  },
  "429": {
    "blocker": "Windows VMware 应用要临时 DR 到 AWS，RPO 5 分钟，灾后仲要可以 failback 返地端，想最低营运负担。",
    "requirements": "1) RPO 约 5 分；2) 快速在 AWS 起机；3) 可返回地端；4) 低负担。",
    "steps": [
      "部署 AWS Elastic Disaster Recovery。",
      "持续区块级复制到 AWS 暂存区。",
      "灾难时启动恢复实例。",
      "复原后可 failback 回 on-premises。"
    ],
    "solutions": "正确答案 B。Elastic Disaster Recovery 专为此。DataSync／Backup 还原难稳达 5 分 RPO 与低负担 failback。",
    "result_flow": "地端 Windows → 持续复制到 AWS → 灾难一键启动 → 事后可 failback。",
    "options": {
      "A": "错。DataSync 非持续区块复制，RPO 难。",
      "B": "✓ 正确。Elastic Disaster Recovery。",
      "C": "错。File Gateway + Backup RTO/RPO 差。",
      "D": "错。FSx + CloudFormation 非持续复制 DR。"
    },
    "diagram_before": "flowchart TB\n  Win[\"地端 Windows VMware\"]\n  DR[\"临时 DR 到 AWS\"]\n  FB[\"灾后要可 failback\"]\n  X{{\"缺口: RPO 5 分＋低负担\"}}\n  Win --> DR --> FB\n  DR -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  OnPrem[\"地端 Windows\"]\n  DRS[\"Elastic Disaster Recovery<br/>持续区块复制\"]\n  Fail[\"灾难一键启动\"]\n  Back[\"事后可 failback\"]\n  OnPrem --> DRS --> Fail --> Back"
  },
  "430": {
    "blocker": "新 Region 产生的资料要写去集中 eu-north-1 S3，跨区写入延迟好大，要最大程度改善。",
    "requirements": "1) 降低写入延迟；2) 最终仍可集中分析。",
    "steps": [
      "每个新 Region 建本地 S3 桶接收写入。",
      "开启 S3 Cross-Region Replication 到 eu-north-1 集中桶。",
      "应用只写本地桶。",
      "分析作业读集中桶。"
    ],
    "solutions": "正确答案 C。本地写 + CRR 非同步汇总，写入延迟最低。Transfer Acceleration 仍要跨洲到单一桶；加 Lambda 记忆体无补于地理延迟。",
    "result_flow": "本地应用 → 写本地 S3（低延迟）→ CRR → eu-north-1 集中桶 → 中央分析。",
    "options": {
      "A": "错。VPC endpoint 解决唔到跨洲写入距离。",
      "B": "错。加速后仍跨洲写单一桶。",
      "C": "✓ 正确。本地桶 + CRR。",
      "D": "错。加记忆体不减网络 RTT。"
    },
    "diagram_before": "flowchart TB\n  New[\"新 Region 应用\"]\n  Write[\"产生资料写入\"]\n  Central[\"集中 eu-north-1 S3\"]\n  X{{\"缺口: 跨区写入延迟好大\"}}\n  New --> Write --> Central\n  Write -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  App[\"本地应用\"]\n  Local[\"写本地 S3（低延迟）\"]\n  CRR[\"S3 Cross-Region Replication\"]\n  Hub[\"eu-north-1 集中桶\"]\n  Analyze[\"中央分析\"]\n  App --> Local --> CRR --> Hub --> Analyze"
  },
  "431": {
    "blocker": "共享 VPC 内 NLB 应用要畀 10 个业务 VPC 用，但 CIDR 重叠，又只准授权单位连。",
    "requirements": "1) 跨 VPC 存取服务；2) 容忍 CIDR 重叠；3) 授权控制。",
    "steps": [
      "用 NLB 建立 VPC endpoint service（PrivateLink）。",
      "各业务 VPC 建 interface endpoint。",
      "开启需要接受连线的 acceptance。",
      "只批准授权单位 endpoint。"
    ],
    "solutions": "正确答案 B。PrivateLink 唔受 CIDR 重叠影响。TGW／peering／VPN 在 CIDR 重叠时路由会爆。",
    "result_flow": "业务 VPC endpoint → PrivateLink → 共享服务 NLB → 应用；未授权 endpoint 连唔入。",
    "options": {
      "A": "错。Transit Gateway 怕 CIDR 重叠。",
      "B": "✓ 正确。PrivateLink + acceptance。",
      "C": "错。peering 要求 CIDR 不重叠。",
      "D": "错。VPN 同样解决唔到重叠。"
    },
    "diagram_before": "flowchart TB\n  Shared[\"共享 VPC + NLB 应用\"]\n  Biz[\"10 个业务 VPC\"]\n  Overlap[\"CIDR 重叠\"]\n  X{{\"缺口: peering／TGW 路由爆<br/>又要授权控制\"}}\n  Biz --> Overlap\n  Shared -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  EP[\"业务 VPC Interface Endpoint\"]\n  PL[\"PrivateLink\"]\n  NLB[\"共享服务 NLB\"]\n  App[\"应用\"]\n  Auth[\"只批准授权 endpoint\"]\n  EP --> PL --> NLB --> App\n  Auth --> EP"
  },
  "432": {
    "blocker": "地端 Kubernetes 微服务要上 AWS，manifest 已在版控，资料库系 PostgreSQL，想最少迁移工作量。",
    "requirements": "1) 重用 K8s manifest；2) 托管资料库；3) 最少改动。",
    "steps": [
      "建 Amazon EKS 丛集。",
      "映像推到 ECR。",
      "直接套用现有 Kubernetes manifest。",
      "资料库迁到 Aurora PostgreSQL。"
    ],
    "solutions": "正确答案 B。EKS 最直接吃 K8s manifest。ECS 要转 task def；App Runner 不吃任意 manifest；自建 K8s 负担高。",
    "result_flow": "版控 manifest → 部署到 EKS（映像来自 ECR）→ 应用连 Aurora PostgreSQL。",
    "options": {
      "A": "错。App Runner 不支援任意 K8s manifest。",
      "B": "✓ 正确。EKS + ECR + Aurora。",
      "C": "错。转 ECS 工作量大。",
      "D": "错。自建 K8s 营运重。"
    },
    "diagram_before": "flowchart TB\n  K8s[\"地端 Kubernetes\"]\n  Man[\"manifest 已版控\"]\n  PG[\"PostgreSQL\"]\n  X{{\"缺口: 上 AWS 工作量要最少\"}}\n  K8s --> Man\n  K8s --> PG\n  Man -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  Manifest[\"版控 K8s manifest\"]\n  EKS[\"Amazon EKS\"]\n  ECR[\"映像来自 ECR\"]\n  Aurora[\"Aurora PostgreSQL\"]\n  Manifest --> EKS\n  ECR --> EKS\n  EKS --> Aurora"
  },
  "433": {
    "blocker": "抽奖应用要减成本，比赛完就唔使留资料；而家 EC2 + ALB + RDS 偏贵。",
    "requirements": "1) 降成本；2) 比赛后可丢资料；3) 依题库方案。",
    "steps": [
      "引入 ElastiCache Redis 快取热资料，减少 RDS 压力。",
      "运算改 ECS Fargate 按需付费。",
      "设定 TTL 让资料自动过期。",
      "比赛结束删快取／缩容。"
    ],
    "solutions": "正确答案 C（依题库）。快取 + Fargate + TTL 降低 RDS 与固定 EC2 成本。完全改 DynamoDB/Lambda 亦可能平，但答案键系 C。",
    "result_flow": "流量 → ALB／Fargate → 多命中 Redis（TTL）→ 少量打 RDS → 赛后清空，成本下降。",
    "options": {
      "A": "错。改 DynamoDB + DAX 重构大（非本题键）。",
      "B": "错。Redshift 过重。",
      "C": "✓ 正确。ElastiCache + Fargate + TTL。",
      "D": "错（本题未选）。Serverless 重构非答案键。"
    },
    "diagram_before": "flowchart TB\n  App[\"抽奖应用\"]\n  Stack[\"EC2 + ALB + RDS 偏贵\"]\n  Temp[\"比赛完可丢资料\"]\n  X{{\"缺口: 要减成本\"}}\n  App --> Stack\n  Temp -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  Traffic[\"流量\"]\n  Far[\"ALB + ECS Fargate\"]\n  Redis[\"ElastiCache Redis + TTL\"]\n  RDS[\"少量打 RDS\"]\n  End[\"赛后清空／缩容\"]\n  Traffic --> Far --> Redis\n  Redis --> RDS\n  Redis --> End"
  },
  "434": {
    "blocker": "透明 proxy 用 EC2 做私有子网预设路由，但流量转唔出互联网。",
    "requirements": "1) EC2 可转发他人流量；2) 透明代理生效。",
    "steps": [
      "找到作 proxy 的 EC2。",
      "停用 source/destination check（来源／目的地检查）。",
      "确认路由表 0.0.0.0/0 指去该实例。",
      "再测私有子网出站。"
    ],
    "solutions": "正确答案 A。NAT／透明 proxy 实例必须关 source/destination check，否则只处理自己嘅封包。",
    "result_flow": "私有实例封包 → 路由到 proxy EC2 → 因已关 check 而转发 → 互联网。",
    "options": {
      "A": "✓ 正确。停用 source/destination check。",
      "B": "错。只改 SG 解决唔到转发限制。",
      "C": "错。DHCP DNS 无关转发。",
      "D": "错。额外 ENI 非关键。"
    },
    "diagram_before": "flowchart TB\n  Priv[\"私有子网实例\"]\n  Route[\"预设路由指向 proxy EC2\"]\n  Proxy[\"透明 proxy\"]\n  X{{\"缺口: 流量转唔出互联网\"}}\n  Priv --> Route --> Proxy\n  Proxy -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  Priv[\"私有实例封包\"]\n  Proxy[\"Proxy EC2<br/>已关 source/dest check\"]\n  Route[\"0.0.0.0/0 指该实例\"]\n  Net[\"转发到互联网\"]\n  Priv --> Route --> Proxy --> Net"
  },
  "435": {
    "blocker": "人手建嘅 VPC 想纳入 CloudFormation 自动化管理，想最少工作、唔好拆再建。",
    "requirements": "1) 纳管现有 VPC；2) 最少中断与工作量。",
    "steps": [
      "撰写与现况一致的 CloudFormation 范本。",
      "使用 resource import 把现有 VPC 等资源汇入 stack。",
      "确认 drift 正常。",
      "之后改动都经 CloudFormation。"
    ],
    "solutions": "正确答案 C。CloudFormation resource import 专为纳管现有资源。StackSet 系多帐户部署；SAM 偏 serverless。",
    "result_flow": "现有 VPC → import 进 stack → 之后以范本更新网络，无需重建。",
    "options": {
      "A": "错。CDK import 可行但不如直接 CFN import 贴题。",
      "B": "错。StackSet 不是 import 工具。",
      "C": "✓ 正确。CloudFormation resource import。",
      "D": "错。SAM 不用于 VPC 汇入。"
    },
    "diagram_before": "flowchart TB\n  VPC[\"人手建嘅 VPC\"]\n  Want[\"想纳入 CloudFormation\"]\n  Keep[\"唔好拆再建\"]\n  X{{\"缺口: 要最少工作纳管\"}}\n  VPC --> Want --> Keep\n  Keep -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  Exist[\"现有 VPC 资源\"]\n  Tpl[\"撰写一致范本\"]\n  Imp[\"Resource Import 入 stack\"]\n  Manage[\"之后改动走 CloudFormation\"]\n  Exist --> Tpl --> Imp --> Manage"
  },
  "436": {
    "blocker": "5GB 游戏档全球下载慢又贵，要改善效能与传输成本。",
    "requirements": "1) 全球加速下载；2) 降低传输成本；3) 简单架构。",
    "steps": [
      "档案放 S3。",
      "建 CloudFront 分发做边缘快取。",
      "Route 53 域名指到 CloudFront。",
      "用户就近下载，减少跨区回源。"
    ],
    "solutions": "正确答案 C。S3 + CloudFront 系大档全球分发标准。FTP on EC2 无边缘；Requester Pays 只系转嫁费用。",
    "result_flow": "用户 DNS → CloudFront 边缘命中快取 → 下载 5GB；少数回源 S3。",
    "options": {
      "A": "错。EC2 FTP 无全球 CDN。",
      "B": "错。EFS + FTP 同样无 CDN。",
      "C": "✓ 正确。S3 + CloudFront + Route 53。",
      "D": "错。Requester Pays 不降低公司成本结构问题。"
    },
    "diagram_before": "flowchart TB\n  Game[\"5GB 游戏档\"]\n  Global[\"全球下载\"]\n  Cost[\"传输又慢又贵\"]\n  X{{\"缺口: 效能与成本都差\"}}\n  Game --> Global --> Cost\n  Cost -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  DNS[\"Route 53\"]\n  CF[\"CloudFront 边缘快取\"]\n  S3[\"回源 S3\"]\n  Fast[\"用户就近下载 5GB\"]\n  DNS --> CF\n  CF --> Fast\n  CF -.->|少数 miss| S3"
  },
  "437": {
    "blocker": "电商 Tomcat 单实例 + MySQL 单 AZ，高峰不可靠，要改善可靠性（选三项 A、C、F）。",
    "requirements": "1) Web 层高可用；2) DB 高可用；3) 多 AZ 网络支援。",
    "steps": [
      "Tomcat 放入 Auto Scaling，前挂 ALB（A）。",
      "资料库改 Aurora 并加 replica（C）。",
      "在 website VPC 另一 AZ 加 public subnet 支援 ALB 跨 AZ（F）。",
      "验证跨 AZ 故障演练。"
    ],
    "solutions": "正确答案 A、C、F。Web ASG+ALB、Aurora replica、第二 AZ public subnet。VPC peering／NAT／把 Tomcat 塞入 DB VPC 都唔对症。",
    "result_flow": "用户 → 多 AZ ALB → ASG 多 Tomcat → Aurora＋replica；单实例故障不再整站挂。",
    "options": {
      "A": "✓ 正确。ASG + ALB。",
      "B": "错。peering 不提升本站可靠性。",
      "C": "✓ 正确。Aurora + replica。",
      "D": "错。NAT 非对外站关键。",
      "E": "错。Tomcat 移入 DB VPC 破坏分层。",
      "F": "✓ 正确。额外 AZ public subnet 支援多 AZ ALB。"
    },
    "diagram_before": "flowchart TB\n  Web[\"单实例 Tomcat\"]\n  DB[\"MySQL 单 AZ\"]\n  Peak[\"高峰\"]\n  X{{\"缺口: 单点故障<br/>整站易挂\"}}\n  Peak --> Web --> DB\n  Web -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  User[\"用户\"]\n  ALB[\"多 AZ ALB\"]\n  ASG[\"ASG 多 Tomcat\"]\n  Aurora[\"Aurora + Replica\"]\n  Net[\"第二 AZ public subnet\"]\n  User --> ALB --> ASG --> Aurora\n  Net --> ALB"
  },
  "438": {
    "blocker": "ALB 偶发 502，想显示自订错误页而唔系冷冰冰 ALB 页，要最低营运负担（选两项）。",
    "requirements": "1) 自订错误页；2) 拦截 origin 502；3) 低维护。",
    "steps": [
      "在 S3 放静态自订错误页（A）。",
      "CloudFront 设 custom error response，origin 5xx 时回该页（E）。",
      "ALB 作 CloudFront origin。",
      "制造 502 验证使用者看到自订页。"
    ],
    "solutions": "正确答案 A、E。S3 静态页 + CloudFront 自订错误最简单。Lambda 动态改 ALB 规则负担高；Route 53 挡唔到 ALB 已回 502。",
    "result_flow": "用户 → CloudFront → ALB 502 → CloudFront 改回 S3 自订错误页。",
    "options": {
      "A": "✓ 正确。S3 托管错误页。",
      "B": "错。Lambda 改 ALB 负担高。",
      "C": "错。DNS 健康检查拦截唔到已返回的 502。",
      "D": "错。同样过度复杂。",
      "E": "✓ 正确。CloudFront custom error response。"
    },
    "diagram_before": "flowchart TB\n  User[\"用户\"]\n  ALB[\"ALB 偶发 502\"]\n  Ugly[\"冷冰冰预设错误页\"]\n  X{{\"缺口: 想自订错误页<br/>低维护\"}}\n  User --> ALB --> Ugly -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  User[\"用户\"]\n  CF[\"CloudFront\"]\n  ALB[\"ALB origin 回 502\"]\n  S3[\"S3 静态自订错误页\"]\n  Nice[\"使用者看到友善页\"]\n  User --> CF --> ALB\n  ALB -.->|custom error| S3 --> Nice"
  },
  "439": {
    "blocker": "Aurora MySQL 要跨帐户（同 Organization）迁移，DNS cutover 前要最小中断（选两项）。",
    "requirements": "1) 跨帐户；2) cutover 前资料追平；3) 最短中断。",
    "steps": [
      "分享 snapshot 到目标帐户并还原成新 Aurora 丛集（A）。",
      "用 DMS 持续 CDC 同步增量（B）。",
      "窗口内停写、追平、改 DNS。",
      "验证应用。"
    ],
    "solutions": "正确答案 A、B。snapshot 建底 + DMS 追增量系最短 cutover。MGN 唔系 Aurora 工具。",
    "result_flow": "来源 snapshot → 目标帐户新丛集 → DMS CDC 追平 → DNS cutover → 短中断完成。",
    "options": {
      "A": "✓ 正确。跨帐户分享 snapshot。",
      "B": "✓ 正确。DMS 持续同步。",
      "C": "错（本题未选）。Backup 分享非首选组合。",
      "D": "错。Application Migration Service 不适用。"
    },
    "diagram_before": "flowchart TB\n  Src[\"来源帐户 Aurora MySQL\"]\n  Dst[\"目标帐户同 Org\"]\n  Cut[\"DNS cutover\"]\n  X{{\"缺口: cutover 前要最小中断\"}}\n  Src --> Dst --> Cut\n  Cut -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  Snap[\"分享 snapshot 还原新丛集\"]\n  DMS[\"DMS CDC 追增量\"]\n  Sync[\"窗口内停写追平\"]\n  DNS[\"DNS cutover\"]\n  OK[\"短中断完成\"]\n  Snap --> DMS --> Sync --> DNS --> OK"
  },
  "440": {
    "blocker": "50 个客户 VPC 要互相通讯，又要单向存取管理 VPC 做授权验证；VPC 数量仲会增长（选两项）。",
    "requirements": "1) 大量 VPC 互通；2) 可扩展；3) 管理 VPC 单向授权路径。",
    "steps": [
      "用 Transit Gateway 接所有客户 VPC，简化互通（A）。",
      "管理 VPC 以 peering 等方式提供受控单向授权存取（E）。",
      "路由表控制谁可去管理 VPC。",
      "新 VPC 只需挂上 TGW 即可扩展。"
    ],
    "solutions": "正确答案 A、E。TGW 解决 50+ 互通；管理 VPC peering 做授权入口。全 mesh peering／50 条 VPN 维护爆炸。",
    "result_flow": "客户 VPC ↔ Transit Gateway ↔ 其他客户 VPC；需要授权时 → 受控路径到管理 VPC 验证。",
    "options": {
      "A": "✓ 正确。Transit Gateway 大规模互通。",
      "B": "错。全 mesh peering 不可扩展。",
      "C": "错。PrivateLink 难让全部 VPC 任意互通。",
      "D": "错。大量 Site-to-Site VPN 难维护。",
      "E": "✓ 正确。管理 VPC peering 提供授权存取。"
    },
    "diagram_before": "flowchart TB\n  Cust[\"50 个客户 VPC<br/>仲会增长\"]\n  Need[\"互相通讯\"]\n  Mgmt[\"单向存取管理 VPC 授权\"]\n  X{{\"缺口: mesh／50 VPN 维护爆炸\"}}\n  Cust --> Need\n  Need --> Mgmt\n  Cust -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  VPCs[\"客户 VPC\"]\n  TGW[\"Transit Gateway 互通\"]\n  Peer[\"管理 VPC 受控路径\"]\n  Auth[\"授权验证\"]\n  Scale[\"新 VPC 挂 TGW 即扩展\"]\n  VPCs --> TGW\n  TGW --> Peer --> Auth\n  Scale --> TGW"
  },
  "441": {
    "blocker": "多 LOB 要：单一 AWS 帐单、LOB 成本可分、SCP 限制服务、但各 LOB 帐户管理员仍要完整管理员权限（选两项）。",
    "requirements": "1) 单一帐单；2) 成本分拆；3) 限制可用服务；4) 帐户内 admin 权限仍在 SCP 允许范围内。",
    "steps": [
      "所有 LOB 帐户加入同一个 Organization（B）。",
      "合并帐单并用帐户／标签分拆成本。",
      "用 SCP 限制允许的服务集合（D）。",
      "帐户内仍可授予 AdministratorAccess（受 SCP 服务边界限制）。"
    ],
    "solutions": "正确答案 B、D。单一 Organization 解决帐单；SCP 限服务但不取代帐户 IAM 管理员模型。每 LOB 一个 Org 无单一帐单。",
    "result_flow": "LOB 帐户 ∈ 同一 Org → 一张帐单可分帐 → SCP 挡禁用服务 → 帐户 admin 在允许服务内全权管理。",
    "options": {
      "A": "错。多 Organization 无单一帐单。",
      "B": "✓ 正确。单一 Organization。",
      "C": "错。Service Quotas 限配额非服务目录。",
      "D": "✓ 正确。SCP 限制服务。",
      "E": "错。合并帐单已含于 Organizations，非独立正确组合。"
    },
    "diagram_before": "flowchart TB\n  LOB[\"多 LOB\"]\n  Bill[\"要单一帐单＋成本分拆\"]\n  Scp[\"SCP 限服务\"]\n  X{{\"缺口: 帐户 admin 权限模型未定\"}}\n  LOB --> Bill\n  LOB --> Scp\n  Bill -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  Org[\"LOB 帐户 ∈ 同一 Org\"]\n  Bill[\"一张帐单可分帐\"]\n  SCP[\"SCP 限制可用服务\"]\n  Admin[\"帐户内 admin 仍在边界内\"]\n  Org --> Bill --> SCP --> Admin"
  },
  "442": {
    "blocker": "Route 53 latency routing + 各 Region 内 weighted 记录；演练时停咗一个 Region 全部 web server，流量竟然无自动切去另一 Region。题库答案 A、E。",
    "requirements": "1) 解释／对应故障未切换原因；2) 依题库选两项。",
    "steps": [
      "检查各 Region weighted 记录权重设定（A：停机 Region 权重较高会令更多流量仍指向该侧，若健康检查不完整更易出事）。",
      "为指向已停止伺服器的 weighted 记录设定 HTTP health check（E）。",
      "确认不健康端点不再被回传。",
      "重做 DR 演练验证自动切换。"
    ],
    "solutions": "正确答案 A、E（依题库）。题库强调：停机 Region 权重较高，以及部分 weighted 记录缺 HTTP health check，导致无法正确甩流。实务上 D（evaluate target health）亦常见，但必须跟 batch。",
    "result_flow": "用户查 DNS → latency 选 Region → weighted 选具体伺服器；缺健康检查／权重失衡 → 仍回已停机目标 → 修正 A/E 后先甩到健康 Region。",
    "options": {
      "A": "✓ 正确（依题库）。停机 Region 权重较高影响流量分配。",
      "B": "错。次要 Region 单机失败不是主因描述。",
      "C": "错。latency 可以搭配 weighted。",
      "D": "错（本题未选）。evaluate target health 实务重要但非答案键。",
      "E": "✓ 正确。weighted 记录缺少 HTTP health check。"
    },
    "diagram_before": "flowchart TB\n  User[\"用户查 DNS\"]\n  Lat[\"Route 53 latency<br/>选 Region\"]\n  W[\"Region 内 weighted 记录\"]\n  Stop[\"演练停晒一 Region 伺服器\"]\n  X{{\"缺口: 流量无自动切走\"}}\n  User --> Lat --> W\n  Stop --> W\n  Stop -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  FixW[\"调低停机 Region 权重\"]\n  HC[\"为 weighted 记录<br/>设 HTTP health check\"]\n  DNS[\"不健康端点不再回传\"]\n  OK[\"流量切到健康 Region\"]\n  FixW --> HC --> DNS --> OK"
  },
  "443": {
    "blocker": "上万水位感测器即时资料，而家靠地端应用伺服器，要降低维护、提高可用性，成本最佳。",
    "requirements": "1) 取代自管应用伺服器；2) 高可用；3) 成本优化；4) 可查询分析。",
    "steps": [
      "装置连 IoT Core 收资料。",
      "Kinesis Firehose 送 S3，Lambda 转成 Parquet。",
      "用 Athena 查询分析。",
      "全程 serverless，免管伺服器。"
    ],
    "solutions": "正确答案 B。IoT Core + Firehose + Lambda + S3/Athena 全托管、成本佳。Aurora 要养库；Flink 方案较重。",
    "result_flow": "感测器 → IoT Core → Firehose → Lambda 转 Parquet → S3 → Athena 查询；无自管伺服器。",
    "options": {
      "A": "错。Aurora 仍要维护资料库。",
      "B": "✓ 正确。全 serverless 管道成本与维护最佳。",
      "C": "错。Flink + Aurora 负担高。",
      "D": "错。较 B 重且成本较高。"
    },
    "diagram_before": "flowchart TB\n  Sensors[\"上万水位感测器\"]\n  AppSrv[\"地端应用伺服器\"]\n  Cost[\"维护重成本高\"]\n  X{{\"缺口: 要高可用＋成本最佳 serverless\"}}\n  Sensors --> AppSrv --> Cost\n  Cost -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  Sensor[\"感测器\"]\n  IoT[\"IoT Core\"]\n  FH[\"Firehose + Lambda→Parquet\"]\n  S3[\"S3\"]\n  Ath[\"Athena 查询\"]\n  Sensor --> IoT --> FH --> S3 --> Ath"
  },
  "444": {
    "blocker": "ALB health check 打产品页，DB 高负载时页面慢，ALB 误判实例不健康，Auto Scaling 不停换机（选两项）。",
    "requirements": "1) 减少误杀实例；2) 缓解 DB 读压；3) 健康检查与功能监控分离。",
    "steps": [
      "加 Aurora／RDS read replica 分散读取（A）。",
      "ALB health check 改打简单静态／健康 HTML，唔依赖重 DB 页（B）。",
      "完整功能可用性改由 Route 53 等更高层检查。",
      "观察 ASG 是否停止无谓替换。"
    ],
    "solutions": "正确答案 A、B。根因系 health check 与重 DB 页耦合 + DB 读压。TCP check 太浅；只靠 auto recover 唔够。",
    "result_flow": "读压被 replica 分走 → ALB 只查简单健康页 → 实例唔再被误判 → ASG 稳定；深层可用性另监控。",
    "options": {
      "A": "✓ 正确。read replica 降 DB 压力。",
      "B": "✓ 正确。ALB 简单 health check + 分层监控。",
      "C": "错。TCP check 看唔到应用／DB 问题全貌。",
      "D": "错。auto recover 不解决持续高负载误判。",
      "E": "错（本题未选）。快取有助但非答案键。"
    },
    "diagram_before": "flowchart TB\n  ALB[\"ALB health check<br/>打产品页\"]\n  DB[\"DB 高负载页面慢\"]\n  ASG[\"误判不健康不停换机\"]\n  X{{\"缺口: 健康检查与重 DB 耦合\"}}\n  ALB --> DB --> ASG -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  RR[\"Read Replica 分读压\"]\n  HC[\"ALB 改查简单健康页\"]\n  Stable[\"实例唔再被误杀\"]\n  ASG[\"ASG 稳定\"]\n  RR --> HC --> Stable --> ASG"
  },
  "445": {
    "blocker": "公司地端有资料中心，开发／测试用云上 EKS，但生产环境要求 Kubernetes 的 control plane 同 data plane 都必须留喺地端。需要 AWS 管理方案，又要最低营运负担。",
    "requirements": "1) 生产 control plane 在 on-premises；2) 生产 data plane 在 on-premises；3) AWS 托管／支援的 Kubernetes 管理；4) 营运负担最低。",
    "steps": [
      "在公司自有硬体安装 Amazon EKS Anywhere（地端版 EKS 发行与管理工具）。",
      "建立 EKS Anywhere 丛集承载生产工作负载。",
      "确保 control plane 与 worker 都跑在地端硬体。",
      "沿用与 EKS 相似的工具链管理开发／测试（云上 EKS）与生产（EKS Anywhere）。"
    ],
    "solutions": "正确答案 B。EKS Anywhere 专门让你在自有硬体跑与 EKS 一致的 Kubernetes，control plane 与 data plane 都在本地。Outposts 上的 extended cluster 会把 control plane 留在 AWS，违反「control plane 必须地端」；Outposts + Anywhere 多余。",
    "result_flow": "开发／测试 → 云上 EKS；生产 → 地端硬体上的 EKS Anywhere 丛集（本地 control plane + data plane）→ AWS 提供发行与支援，营运负担最低。",
    "options": {
      "A": "错。Outposts local cluster 可行但要买 Outposts，负担与弹性通常不如直接 EKS Anywhere。",
      "B": "✓ 正确。EKS Anywhere 在自有硬体，control plane 与 data plane 都在地端。",
      "C": "错。extended cluster 的 control plane 在 AWS，违反必须 on-premises。",
      "D": "错。Outposts 再装 EKS Anywhere 多余，直接用自有硬体即可。"
    },
    "diagram_before": "flowchart TB\n  Dev[\"开发／测试云上 EKS\"]\n  Prod[\"生产要求地端\"]\n  CP[\"control plane + data plane 都在地端\"]\n  X{{\"缺口: 要 AWS 管理方案低负担\"}}\n  Dev -.-> Prod --> CP\n  CP -.-> X\n  style X fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  Dev[\"开发／测试：云上 EKS\"]\n  Prod[\"生产：EKS Anywhere\"]\n  HW[\"公司地端硬体\"]\n  CP[\"本地 control plane\"]\n  DP[\"本地 data plane\"]\n  Dev -.->|对照| Prod\n  Prod --> HW\n  HW --> CP\n  HW --> DP"
  },
  "446": {
    "blocker": "公司用 AWS Organizations（组织：统一管理多个 AWS 帐户）管理开发环境。每个开发团队各自一个帐户、一个 VPC（虚拟私有网路），网段不重叠。共用服务帐户里有一套 Amazon Aurora（托管关联式资料库）丛集，但各开发帐户还没有低负担、可连到「即时」资料库的连线方式。",
    "requirements": "1) 所有开发团队都要能用 live 资料（不是副本延迟很久的资料）；2) 连线方案营运负担要最低；3) 尽量不要为此再搭一整套复杂网路。",
    "steps": [
      "确认 Aurora 丛集在共用服务帐户，且可透过 AWS RAM（资源共用服务：把某资源借给其他帐户用）跨帐户分享。",
      "在共用服务帐户建立 RAM resource share，把 DB cluster 加入分享范围。",
      "把各开发帐户加为分享对象，开发帐户接受分享。",
      "开发团队在自己帐户内依既有/既简网路路径连到已分享的 Aurora，避免另建整套 TGW 或 VPN。"
    ],
    "solutions": "正确答案是 A。核心是用 AWS RAM 直接分享 Aurora DB cluster，让开发帐户「看见并连到」同一套即时资料库，不必为了单一 DB 去建 Transit Gateway（跨 VPC 中枢路由器）、PrivateLink（私有服务入口）或 Site-to-Site VPN（站对站虚拟专线）。营运步骤最少。",
    "result_flow": "开发者应用 → 开发帐户 VPC →（接受 RAM 分享后）连到共用服务帐户的 Aurora 丛集 → 读写 live 资料。",
    "options": {
      "A": "✓ 正确。用 RAM 分享 Aurora 丛集给各开发帐户，跨帐户连即时 DB，架构最简单、维运最少。",
      "B": "错。Transit Gateway + RAM 分享适合大规模 VPC 互连，只为一个 DB 过度设计，营运成本高。",
      "C": "错。ALB（应用层负载平衡器）+ PrivateLink 适合 HTTP 服务，不适合当资料库连线入口。",
      "D": "错。Site-to-Site VPN 加各帐户 Marketplace VPN 软体，设定与维护最重。"
    },
    "diagram_before": "flowchart TB\n  DEV[\"开发帐户 VPC\"]\n  APP[\"开发应用\"]\n  SHARED[\"共用服务帐户<br/>Aurora 丛集\"]\n  GAP{{\"缺口: 无低负担<br/>跨帐户即时连线\"}}\n  APP --> DEV\n  DEV -.->|连不到 live DB| GAP\n  SHARED -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  APP[\"开发应用\"] --> DEV[\"开发帐户 VPC\"]\n  DEV -->|接受 RAM 分享| RAM[\"AWS RAM<br/>分享 Aurora 丛集\"]\n  RAM --> AUR[\"共用服务帐户<br/>Aurora 即时丛集\"]\n  AUR --> LIVE[\"读写 live 资料\"]\n"
  },
  "447": {
    "blocker": "基础设施多半用 CloudFormation（基础建设即程式码）建好、体量稳定，月费也稳定。但开发者常开测试资源忘记删，过几天就变「幽灵帐单」。公司想自动发现「帐单变贵」并找出是哪类资源搞大的，还要通知营运。",
    "requirements": "1) 自动化侦测成本异常上升；2) 能指出是哪个服务/资源类型造成；3) 自动通知 operations 团队。",
    "steps": [
      "启用 AWS Cost Anomaly Detection（成本异常侦测：用机器学习找帐单怪波动）。",
      "建立 monitor type 为 AWS services 的成本监控，按服务维度看异常（比按帐户更能对到资源类型）。",
      "建立 subscription，订定成本变异阈值。",
      "设定每日成本摘要与异常通知寄给营运团队。"
    ],
    "solutions": "正确答案是 D。Cost Anomaly Detection 的「AWS services」监控能指出「是哪种服务突然变贵」，比纯看总帐或只看 linked account 更符合「找出造成成本增加的资源」；搭配订阅即可自动通知，不必手调静态帐单警报。",
    "result_flow": "测试资源忘记删 → 某服务费用异常升高 → Cost Anomaly Detection 以服务维度抓到 → 订阅触发通知 → 营运收到并追查。",
    "options": {
      "A": "错。Cost Explorer 设固定总额阈值太粗，难对到「哪个资源」造成上升。",
      "B": "错。用三个月平均设静态警报，同样抓不到具体服务/资源。",
      "C": "错。Linked account 监控偏向帐户层级，题目重点是找出造成成本的服务/资源。",
      "D": "✓ 正确。以 AWS services 类型监控 + 订阅阈值，自动侦测服务级异常并通知。"
    },
    "diagram_before": "flowchart TB\n  DEV[\"开发者开测试资源\"]\n  RES[\"资源忘记删除\"]\n  BILL[\"月费突然升高\"]\n  GAP{{\"缺口: 无法自动发现<br/>哪类服务搞贵\"}}\n  DEV --> RES --> BILL\n  BILL -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  RES[\"测试资源漏删\"] --> SPIKE[\"某服务费用异常\"]\n  SPIKE --> CAD[\"Cost Anomaly Detection<br/>AWS services 监控\"]\n  CAD --> SUB[\"订阅触发通知\"]\n  SUB --> OPS[\"营运追查资源类型\"]\n"
  },
  "448": {
    "blocker": "新 Web 应用的 Linux 伺服器需要「大家共用同一份应用资料」的档案位置，活跃资料约 100GB。每天约 3 小时高峰，总读取要到 225 MiBps。还要 Multi-AZ（多可用区）思维的可用设计，并在另一 Region 有灾难备援副本，RPO（可接受的资料落后时间）小于 1 小时。",
    "requirements": "1) 多实例共享同一资料更新点；2) 高峰读取够用；3) DR 在另一 Region 且 RPO < 1 小时。",
    "steps": [
      "部署 Amazon FSx for Lustre（高效能共享档案系统，常给高效能计算/高吞吐读写用）。",
      "选 Bursting Throughput（爆发吞吐：平时省、高峰可冲高），对应每日短暂 3 小时高峰。",
      "用 AWS Backup（托管备份服务）定期备份档案系统。",
      "把备份复制到 DR Region，让 RPO 落在一小时内。"
    ],
    "solutions": "正确答案是 B。FSx for Lustre + Bursting 适合「间歇性高读取」；AWS Backup 跨 Region 备份可满足 RPO < 1 小时。A 的 EFS 只 provision 75 MiBps 不够 225；C 的 EBS Multi-Attach 本质同 AZ 限制；D 的双 Region FSx + DataSync 营运较重。",
    "result_flow": "Linux 实例挂载 FSx for Lustre 读写共享资料 → 高峰用 Bursting 撑吞吐 → AWS Backup 周期备份 → 复本到 DR Region 备援。",
    "options": {
      "A": "错。75 MiBps 预布建远低于 225 MiBps 高峰需求。",
      "B": "✓ 正确。Lustre Bursting 撑间歇高峰，AWS Backup 满足跨 Region RPO。",
      "C": "错。EBS Multi-Attach 多半同 AZ，不是跨 Region 共享档案的正解。",
      "D": "错。双 Region 各建 OpenZFS + DataSync 可行但营运负担通常高于 Backup 方案。"
    },
    "diagram_before": "flowchart TB\n  EC2[\"Linux 多实例\"]\n  DATA[\"共用应用资料 100GB\"]\n  PEAK[\"高峰需 225 MiBps\"]\n  GAP{{\"缺口: 缺共享高效能档案<br/>与跨 Region RPO&lt;1h\"}}\n  EC2 -.-> DATA\n  DATA -.-> PEAK\n  PEAK -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  EC2[\"Linux 实例\"] --> FSX[\"FSx for Lustre<br/>Bursting 吞吐\"]\n  FSX --> SHARE[\"共享读写资料\"]\n  FSX --> BAK[\"AWS Backup 周期备份\"]\n  BAK --> DR[\"DR Region 副本<br/>RPO &lt; 1 小时\"]\n"
  },
  "449": {
    "blocker": "实验在没有网际网路的偏远地点进行。感测器一周产生约 6TB 专有格式资料，只能定期用 FTP 上传，自己没有 FTP 伺服器，也不支援其他协定。公司要在实验结束后尽快把资料集中送进 AWS 的物件储存（S3）。",
    "requirements": "1) 现场必须能收 FTP；2) 无公网也能离线收集；3) 结束后尽快进 Amazon S3。",
    "steps": [
      "订购 AWS Snowcone（可携式小型资料搬运装置）并附 Amazon Linux 2 AMI。",
      "接上本地网路后，在装置上启动 EC2 风格实例。",
      "在实例上安装并设定 FTP server，让感测器把档案上传到这里。",
      "实验结束后把 Snowcone 寄回 AWS，把资料载入 S3。"
    ],
    "solutions": "正确答案是 C。感测器只会 FTP，所以必须在 Snowcone 上自己开 FTP 服务收档；Snowcone + Linux AMI 刚好能做。A 的 DataSync/NFS 对不上 FTP；B/D 最终落到 EBS 或协定不对，不符合「进物件储存」目标。",
    "result_flow": "感测器 → FTP 上传 → Snowcone 上的 EC2/FTP → 装置寄回 AWS → 资料载入 S3。",
    "options": {
      "A": "错。DataSync/NFS 路径无法直接满足「感测器只会 FTP」。",
      "B": "错。用脚本拉资料且最终当 EBS，不是要的 S3 物件储存路径。",
      "C": "✓ 正确。Snowcone 上装 FTP，感测器直传，寄回后进 S3。",
      "D": "错。Snowcone 不是这样接 FSx；最终载入 EBS 也不符 S3 需求。"
    },
    "diagram_before": "flowchart TB\n  SENSOR[\"偏远感测器\"]\n  FTP[\"只会 FTP 上传\"]\n  SITE[\"无公网 / 无 FTP 伺服器\"]\n  GAP{{\"缺口: 6TB 专有格式<br/>无法尽快进 S3\"}}\n  SENSOR --> FTP --> SITE\n  SITE -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  SENSOR[\"感测器\"] -->|FTP| SNOW[\"Snowcone 上 EC2<br/>FTP 服务\"]\n  SNOW --> STORE[\"装置本地暂存\"]\n  STORE -->|寄回 AWS| S3[\"资料载入 S3\"]\n  S3 --> DONE[\"实验资料集中\"]\n"
  },
  "450": {
    "blocker": "Organizations 全功能开启，每业务单位一个帐户。中央已有一份组织级 Cost and Usage Report（CUR：详细帐单明细）在 S3。各帐户管理员要用 Athena（用 SQL 查 S3 资料）只看自己帐户成本，不能看到别人。",
    "requirements": "1) 各帐户仅能看自己的成本利用率；2) 用 Athena 查；3) 营运复杂度最低。",
    "steps": [
      "在管理帐户，对中央 CUR 的 S3 储存贮体设事件通知。",
      "每次新 CUR 档案到达就触发 Lambda（无伺服器函数）。",
      "Lambda 依帐户拆出资料，写到各自 S3 prefix（路径前缀）。",
      "改 S3 bucket policy，只允许各成员帐户读自己的 prefix，再用 Athena 查询。"
    ],
    "solutions": "正确答案是 B。已有中央 CUR，最省事是「自动拆分 + prefix 隔离权限」，各帐户直接 Athena。RAM 不能拆 CUR 内容；各帐户自己开 CUR 或只存 Cost Explorer 报表都较重或不符合 Athena 需求。",
    "result_flow": "中央 CUR 写入 S3 → S3 事件 → Lambda 拆帐 → 各帐户 prefix → 成员帐户 Athena 只查自己 prefix。",
    "options": {
      "A": "错。RAM 是共用资源存取，不能把 CUR 内容按帐户切开。",
      "B": "✓ 正确。Lambda 自动拆分 + bucket policy 隔离，Athena 可查且复杂度低。",
      "C": "错。Cost Explorer 存报表无法满足 Athena 细查。",
      "D": "错。每帐户各建 CUR 与 bucket，营运与成本都变高。"
    },
    "diagram_before": "flowchart TB\n  CUR[\"中央 CUR 在 S3\"]\n  ADMIN[\"各帐户管理员\"]\n  ATHENA[\"想用 Athena 查成本\"]\n  GAP{{\"缺口: 会看到别人成本<br/>无帐户隔离\"}}\n  CUR --> ADMIN\n  ADMIN --> ATHENA\n  ATHENA -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  CUR[\"中央 CUR → S3\"] -->|事件| L[\"Lambda 依帐户拆帐\"]\n  L --> P1[\"帐户 A prefix\"]\n  L --> P2[\"帐户 B prefix\"]\n  P1 --> ATH[\"成员 Athena<br/>只查自己 prefix\"]\n  P2 --> ATH\n"
  },
  "451": {
    "blocker": "制造应用已用 1 Gbps Direct Connect（专线：地端机房到 AWS 的专用线路）并跑 BGP。业务成长后，需要把连线升级成高可用、容错、安全，而且要「最省成本」。",
    "requirements": "1) 高可用与容错；2) 传输要安全；3) 成本效益优先（不是无上限买第二条专线）。",
    "steps": [
      "保留现有 Direct Connect 当主路径。",
      "新增一条 AWS Site-to-Site VPN（站对站 VPN：走加密隧道的备援连线）作 secondary path。",
      "设定静态路由 VPN，与 DX 形成备援。",
      "正常流量走 DX；DX 故障时切到 VPN，VPN 本身提供传输加密。"
    ],
    "solutions": "正确答案是 D。AWS 常见「DX 主 + VPN 备」最具成本效益：VPN 比第二条 DX 便宜，又提供加密备援。A 加 MACsec 等通常更贵/条件更多；B 第二条 DX 最贵；C 多个 private VIF 仍共一条物理 DX，物理断线救不了。",
    "result_flow": "地端 ↔（主）Direct Connect → AWS；故障时 ↔（备）Site-to-Site VPN 加密隧道 → AWS。",
    "options": {
      "A": "错。动态 VPN 可行，但再上 MACsec 等常推高成本，非「最省」。",
      "B": "错。第二条 DX 韧性好但成本高。",
      "C": "错。多 VIF 不能取代物理专线备援。",
      "D": "✓ 正确。静态 Site-to-Site VPN 当 DX 备援，兼顾成本、韧性与传输加密。"
    },
    "diagram_before": "flowchart TB\n  ONP[\"地端机房\"]\n  DX[\"单条 1Gbps DX + BGP\"]\n  AWS[\"AWS\"]\n  GAP{{\"缺口: 无备援容错<br/>安全与成本要平衡\"}}\n  ONP --> DX --> AWS\n  DX -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  ONP[\"地端\"] -->|主路径| DX[\"Direct Connect\"]\n  ONP -.->|备援加密| VPN[\"Site-to-Site VPN\"]\n  DX --> AWS[\"AWS\"]\n  VPN --> AWS\n  AWS --> HA[\"高可用且较省成本\"]\n"
  },
  "452": {
    "blocker": "现代化应用：原本 on-prem MySQL 只有一张表存使用者文字资料。之后使用者会上传最大 4GB 影片，其他人要能下载。影片储存要能快速扩展，且不能拖垮应用效能。",
    "requirements": "1) 使用者 metadata 要能扩展；2) 大档影片快速扩展存取；3) 不影响应用效能。",
    "steps": [
      "用 AWS DMS（资料库迁移服务）+ AWS SCT（结构转换工具）把使用者资料迁到 DynamoDB（超大表 NoSQL）。",
      "影片档改存 Amazon S3（物件储存，擅长大档）。",
      "在 DynamoDB 项目中只存 S3 object key（物件路径），不把影片塞进资料库。",
      "下载时应用读 key 再从 S3 取档。"
    ],
    "solutions": "正确答案是 B。大档永远不该塞进资料库（base64 会爆效能与大小限制）。DynamoDB 存小 metadata、S3 存影片，是典型高扩展分工。Keyspaces 对此场景偏重；base64 进 DynamoDB 更不行。",
    "result_flow": "上传 → 影片进 S3、key 写 DynamoDB → 下载 → 读 DynamoDB 的 key → 从 S3 取档。",
    "options": {
      "A": "错。base64 影片进 Aurora TEXT 会严重拖垮效能与成本。",
      "B": "✓ 正确。DynamoDB 存 metadata + S3 存影片 key，扩展与效能兼顾。",
      "C": "错。Keyspaces 可做但对此需求过度，DynamoDB 更贴切。",
      "D": "错。DynamoDB item 有大小上限，base64 影片不可行。"
    },
    "diagram_before": "flowchart TB\n  APP[\"应用\"]\n  MYSQL[\"on-prem MySQL<br/>使用者文字表\"]\n  VIDEO[\"使用者要上传 4GB 影片\"]\n  GAP{{\"缺口: 大档塞 DB 会拖垮<br/>无法快速扩展\"}}\n  APP --> MYSQL\n  VIDEO -.-> GAP\n  MYSQL -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  UP[\"上传\"] --> S3[\"影片进 S3\"]\n  UP --> DDB[\"metadata + object key<br/>写 DynamoDB\"]\n  DL[\"下载\"] --> DDB\n  DDB -->|取 key| S3\n  S3 --> FILE[\"回传影片\"]\n"
  },
  "453": {
    "blocker": "文件在 EFS（托管 NFS 共享档案系统）上，用 KMS（金钥管理）加密，挂在跑专有软体的 EC2。已开 AWS Backup 预设备份计划。现在要：删掉的文件也能在 RPO 100 分钟内救回。",
    "requirements": "1) 删除后可恢复；2) RPO ≤ 100 分钟；3) 与现有备份/加密设定相容。",
    "steps": [
      "建立备份用的 IAM 角色（权限身分）。",
      "继续使用既有 backup plan，降低改动。",
      "更新 KMS key policy，允许该角色使用金钥加密/解密备份。",
      "对 EFS 启用 continuous backup（连续备份）以支援 point-in-time recovery（时间点还原）。"
    ],
    "solutions": "正确答案是 C。100 分钟 RPO 需要「连续/PITR」等级，不是一天一次或勉强每小时。启用 EFS 连续备份并让 KMS 允许备份角色，就能在删档后短时间内还原。跨 Region 复写解决的是异地 DR，不是本区删档快速救回。",
    "result_flow": "文件在 EFS → AWS Backup 连续备份 → 误删 → 以时间点还原救回（落在 100 分钟 RPO 内）。",
    "options": {
      "A": "错。另建计划 + 每小时备份较繁，且不如连续备份贴近 100 分钟 RPO。",
      "B": "错。每 30 分钟 cron 可逼近，但原生连续备份更合适。",
      "C": "✓ 正确。既有计划 + 新角色 KMS 授权 + 连续备份/PITR。",
      "D": "错。跨 Region 复写主打 DR，不直接解决删档快速恢复。"
    },
    "diagram_before": "flowchart TB\n  EC2[\"EC2 + 专有软体\"]\n  EFS[\"EFS KMS 加密文件\"]\n  BAK[\"预设 AWS Backup 计划\"]\n  GAP{{\"缺口: 删档 RPO 100 分<br/>需连续/PITR 等级\"}}\n  EC2 --> EFS\n  EFS --> BAK\n  BAK -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  EFS[\"EFS 文件\"] --> CB[\"AWS Backup<br/>连续备份 + KMS 授权\"]\n  CB --> PITR[\"时间点还原能力\"]\n  DEL[\"误删文件\"] --> PITR\n  PITR --> OK[\"100 分钟内救回\"]\n"
  },
  "454": {
    "blocker": "云端工程师要用 AWS CLI 上传物件到 S3。每人有 IAM user、access key 与虚拟 MFA。他们在 S3-access 群组。政策：任何 S3 动作都必须有 MFA。",
    "requirements": "1) CLI 可上传 S3；2) 强制 MFA；3) 与现有 IAM user/群组整合。",
    "steps": [
      "在 S3-access 群组挂上 deny 政策：若请求没有 MFA 条件就拒绝所有 S3。",
      "工程师用 MFA 向 STS（临时凭证服务）申请临时安全凭证（例如 GetSessionToken）。",
      "把临时凭证设进 CLI profile。",
      "用该 profile 呼叫 S3；因凭证带 MFA 上下文，policy 放行。"
    ],
    "solutions": "正确答案是 D。长期 access key 本身通常带不出「这次有 MFA」；要靠 STS 换含 MFA 的临时凭证，再配 group 上的「无 MFA 就 Deny」。Bucket 不能「跳出 MFA 输入框」；IAM 群组也没有 trust policy。",
    "result_flow": "工程师输入 MFA → STS 发临时凭证 → CLI 用临时凭证呼叫 S3 → IAM deny-unless-MFA 检查通过 → 上传成功。",
    "options": {
      "A": "错。S3 bucket policy 无法在 CLI 场景「提示输入 MFA」。",
      "B": "错。IAM 群组没有 trust policy（那是 role 的概念）。",
      "C": "错。只挂 deny policy 但继续用长期 key，常过不了 MFA 条件。",
      "D": "✓ 正确。群组 deny-unless-MFA + STS 临时凭证，CLI 才能合规操作 S3。"
    },
    "diagram_before": "flowchart TB\n  ENG[\"工程师 IAM user\"]\n  KEY[\"长期 access key\"]\n  CLI[\"AWS CLI 上传 S3\"]\n  GAP{{\"缺口: 政策要求 MFA<br/>长期 key 带不出 MFA\"}}\n  ENG --> KEY --> CLI\n  CLI -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  ENG[\"工程师输入 MFA\"] --> STS[\"STS GetSessionToken\"]\n  STS --> TMP[\"临时凭证\"]\n  TMP --> CLI[\"CLI 呼叫 S3\"]\n  CLI --> POL[\"群组 Deny-unless-MFA\"]\n  POL --> OK[\"上传成功\"]\n"
  },
  "455": {
    "blocker": "要迁 60 个 on-prem .NET Framework Windows 旧应用到 AWS。要最短迁移时间、不能改程式码、也不想自己管基础设施。",
    "requirements": "1) 最小程式变更（最好零改码）；2) 快；3) 平台托管、少管伺服器。",
    "steps": [
      "使用 Windows Web Application Migration Assistant（Windows 网站迁移助手）。",
      "把应用迁移到 AWS Elastic Beanstalk（PaaS：帮你部署与管执行环境）。",
      "由 Beanstalk 负责部署、容量与基础维运。",
      "避免容器重构或自己管一堆 EC2。"
    ],
    "solutions": "正确答案是 B。Migration Assistant → Elastic Beanstalk 是典型 rehost（搬上去少改码）路径，符合「快、不改码、少管 infra」。A/D 容器重构要改；C 落到自管 EC2 违反「不想管基础设施」。",
    "result_flow": "Windows 旧站 → Migration Assistant → Elastic Beanstalk 环境 → 托管执行，无自管机房。",
    "options": {
      "A": "错。容器重构需要改动，违反不改码。",
      "B": "✓ 正确。Migration Assistant + Beanstalk，快速 rehost 且少管基础设施。",
      "C": "错。落到 EC2 仍要自己管机器。",
      "D": "错。EKS 重构复杂且要改动。"
    },
    "diagram_before": "flowchart TB\n  APP[\"60 个 .NET Framework<br/>Windows 旧站\"]\n  ONP[\"地端自管基础设施\"]\n  TIME[\"迁移要快、不能改码\"]\n  GAP{{\"缺口: 不想管伺服器<br/>又要托管执行\"}}\n  APP --> ONP\n  ONP --> TIME\n  TIME -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  APP[\"Windows 旧站\"] --> MA[\"Migration Assistant\"]\n  MA --> EB[\"Elastic Beanstalk\"]\n  EB --> RUN[\"托管执行环境\"]\n  RUN --> DONE[\"零改码、少管 infra\"]\n"
  },
  "456": {
    "blocker": "S3 上有大量批次模拟工作，结果不赶时间、可中断。每份工作处理 15–20GB。输出写到另一个 S3。要最省钱。",
    "requirements": "1) 能跑大型批次；2) 可容忍中断；3) 成本最低。",
    "steps": [
      "建立 AWS Batch（托管批次排程/运算）运算环境。",
      "运算节点用 EC2 Spot（竞价实例：便宜但可能被回收）。",
      "分配策略选 SPOT_CAPACITY_OPTIMIZED（偏向较不易被中断的容量池）。",
      "工作读取来源 S3、写结果到目标 S3。"
    ],
    "solutions": "正确答案是 B。可中断 + 非即时 → 纯 Spot + Batch 最省。混 On-Demand 或上 EKS 都更贵/更重；Lambda 不适合 15–20GB 这类大批次模拟。",
    "result_flow": "工作提交 → AWS Batch 排程 → Spot 机群运算 → 读 S3 输入 → 写 S3 输出（可中断重跑）。",
    "options": {
      "A": "错。Lambda 不适合大型 15–20GB 批次模拟。",
      "B": "✓ 正确。Batch + 全 Spot + CAPACITY_OPTIMIZED，成本最低。",
      "C": "错。加 On-Demand 推高成本，题目可中断不需要。",
      "D": "错。EKS 维运重、成本通常高于 Batch。"
    },
    "diagram_before": "flowchart TB\n  JOB[\"大批次模拟 15–20GB\"]\n  S3I[\"S3 输入\"]\n  S3O[\"S3 输出\"]\n  GAP{{\"缺口: 可中断非即时<br/>需最省钱运算\"}}\n  S3I --> JOB --> S3O\n  JOB -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  SUB[\"提交工作\"] --> BATCH[\"AWS Batch 排程\"]\n  BATCH --> SPOT[\"EC2 Spot<br/>CAPACITY_OPTIMIZED\"]\n  SPOT --> R[\"读 S3 输入\"]\n  R --> W[\"写 S3 输出\"]\n"
  },
  "457": {
    "blocker": "地端每天产生大量约 1MB 影像，以 1GB 一批压缩后丢到 NFS 长期封存。有 Hyper-V 与算力，但没有储存空间，想把封存丢到 AWS，并要在非营业时间传、限制频宽，成本越低越好。",
    "requirements": "1) 从地端 NFS 封存到 AWS；2) 可排程离峰与限速；3) 长期保存成本最低。",
    "steps": [
      "在地端 Hyper-V 部署 AWS DataSync agent（托管资料搬运代理）。",
      "设定任务：来源 NFS → 目标 Amazon S3 Glacier Deep Archive（最便宜长期冰冻层）。",
      "排程在非营业时间跑，并设频宽限制。",
      "成功后删地端已复制资料，释放空间。"
    ],
    "solutions": "正确答案是 B。DataSync 原生支援 NFS、排程、限速；Deep Archive 最适合「几乎不读的长期封存」。GPU/Instant Retrieval/先 Standard 再转层都更贵或多余；Tape Gateway 多一层虚拟磁带复杂度。",
    "result_flow": "地端 NFS 批次压缩档 → DataSync agent（Hyper-V）离峰限速 → S3 Glacier Deep Archive 长期封存。",
    "options": {
      "A": "错。GPU 实例不必要；Instant Retrieval 比 Deep Archive 贵。",
      "B": "✓ 正确。Hyper-V 上 DataSync + Deep Archive，排程限速且最省。",
      "C": "错。先 Standard 再转层多付过渡成本。",
      "D": "错。Tape Gateway 流程更重，DataSync 更直接。"
    },
    "diagram_before": "flowchart TB\n  IMG[\"地端 1MB 影像批次\"]\n  NFS[\"NFS 长期封存\"]\n  CAP[\"有 Hyper-V 算力<br/>无本地储存空间\"]\n  GAP{{\"缺口: 要离峰限速<br/>最低成本封存 AWS\"}}\n  IMG --> NFS\n  NFS --> CAP\n  CAP -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  NFS[\"地端 NFS\"] --> AG[\"DataSync agent<br/>Hyper-V\"]\n  AG -->|离峰+限速| S3[\"S3 Glacier<br/>Deep Archive\"]\n  S3 --> LONG[\"长期低成本封存\"]\n"
  },
  "458": {
    "blocker": "多层应用已用 CloudWatch agent 把登入等 log 丢到 CloudWatch Logs。公司要改使用者授权计费，需要每天/周/月看「每个 client 有多少不重复使用者成功登入」，且希望最少改应用。",
    "requirements": "1) 从既有登入 log 算 unique users；2) 依 client 维度；3) 应用改动最少。",
    "steps": [
      "在 CloudWatch Logs 设 metric filter（指标筛选：从 log 抽事件变指标）。",
      "每次成功登入记一笔 metric。",
      "把 username、client name 设为 dimensions（维度）。",
      "后续用 CloudWatch 指标/仪表板聚合日周月使用情况。"
    ],
    "solutions": "正确答案是 A。Metric filter 吃既有 log，零改应用。B 要改程式打 SDK；C 用 agent 抽 metric 非最直接；D 再加 Lambda 更重。",
    "result_flow": "登入写入 log → CloudWatch agent → Logs → metric filter 记成功登入（user/client 维度）→ 报表聚合。",
    "options": {
      "A": "✓ 正确。Metric filter 从既有 log 抽登入指标，改动最少。",
      "B": "错。要改应用呼叫 SDK。",
      "C": "错。不如 Logs metric filter 标准直接。",
      "D": "错。多 Lambda 处理 stream，复杂度高。"
    },
    "diagram_before": "flowchart TB\n  APP[\"应用登入\"]\n  AGENT[\"CloudWatch agent\"]\n  LOGS[\"CloudWatch Logs\"]\n  GAP{{\"缺口: 要依 client 算<br/>不重复成功登入人数\"}}\n  APP --> AGENT --> LOGS\n  LOGS -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  LOGIN[\"成功登入 log\"] --> AGENT[\"CloudWatch agent\"]\n  AGENT --> LOGS[\"CloudWatch Logs\"]\n  LOGS --> MF[\"metric filter<br/>user/client 维度\"]\n  MF --> RPT[\"日/周/月报表聚合\"]\n"
  },
  "459": {
    "blocker": "GitHub Actions 要部署到 AWS，但不能在 GitHub 存长期 IAM access key。要安全地让 workflow 暂时取得 AWS 权限。",
    "requirements": "1) CI/CD 能 AssumeRole 到 AWS；2) 不用长期金钥；3) 与 GitHub 整合简单。",
    "steps": [
      "在 IAM 建立 OIDC identity provider，信任 GitHub。",
      "建立 IAM role，trust policy 只允许特定 GitHub repo/workflow 透过 OIDC 来 assume。",
      "GitHub Actions workflow 使用 OIDC 换临时凭证。",
      "用临时凭证部署资源。"
    ],
    "solutions": "正确答案是 B。GitHub Actions 官方推荐 OIDC → AssumeRoleWithWebIdentity，免长期 key。SAML/Cognito/Roles Anywhere 都更绕或更重。",
    "result_flow": "GitHub workflow 跑起来 → OIDC token → AWS STS AssumeRole → 临时权限部署 → 结束即失效。",
    "options": {
      "A": "错。SAML 整合 GitHub Actions 通常比 OIDC 重。",
      "B": "✓ 正确。IAM OIDC IdP + 可被 GitHub assume 的 role，无长期金钥。",
      "C": "错。多一层 Cognito 无必要。",
      "D": "错。Roles Anywhere 要管凭证，负担高。"
    },
    "diagram_before": "flowchart TB\n  GH[\"GitHub Actions\"]\n  KEY[\"长期 IAM access key\"]\n  AWS[\"部署到 AWS\"]\n  GAP{{\"缺口: 不能存长期金钥<br/>仍要安全取得权限\"}}\n  GH --> KEY --> AWS\n  KEY -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  WF[\"GitHub workflow\"] --> OIDC[\"OIDC token\"]\n  OIDC --> STS[\"STS AssumeRole<br/>WithWebIdentity\"]\n  STS --> ROLE[\"IAM role 临时权限\"]\n  ROLE --> DEP[\"部署后凭证失效\"]\n"
  },
  "460": {
    "blocker": "爬虫跑在 t2.micro，从 SQS 取 URL，结果写 EFS。任务 10 秒内完成，但实例常闲置，成本差。要最省成本优化（选两项）。",
    "requirements": "1) 降成本；2) 仍能处理伫列工作；3) 结果可保存。",
    "steps": [
      "把爬虫逻辑改成 Lambda 函数，由 SQS 触发或拉取。",
      "去掉长期开著的小型 EC2（消除闲置费）。",
      "结果改写入 S3，不再依赖 EFS 挂载。",
      "依实际呼叫量付费。"
    ],
    "solutions": "正确答案是 B 与 E。短任务 + 常闲置 → Lambda 按用量计费；S3 取代 EFS 让 Lambda 好写又不挂档案系统。加大 EC2 或上 Neptune/Aurora 都不对症。",
    "result_flow": "URL 进 SQS → Lambda 执行爬虫 → 结果写 S3（无常驻 EC2/EFS）。",
    "options": {
      "A": "错。更大实例更贵，闲置问题仍在。",
      "B": "✓ 正确。改 Lambda 消除闲置 EC2 成本。",
      "C": "错。Neptune 是图资料库，不适合当爬虫结果储存。",
      "D": "错。Aurora 对简单结果储存过度。",
      "E": "✓ 正确。结果改存 S3，搭配 Lambda 最自然。"
    },
    "diagram_before": "flowchart TB\n  SQS[\"SQS URL 伫列\"]\n  EC2[\"t2.micro 爬虫<br/>常闲置\"]\n  EFS[\"结果写 EFS\"]\n  GAP{{\"缺口: 闲置成本高<br/>短任务不划算\"}}\n  SQS --> EC2 --> EFS\n  EC2 -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  URL[\"URL 进 SQS\"] --> L[\"Lambda 爬虫\"]\n  L --> S3[\"结果写 S3\"]\n  S3 --> SAVE[\"可保存、按用量计费\"]\n  NOTE[\"无常驻 EC2/EFS\"] -.-> L\n"
  },
  "461": {
    "blocker": "要把地端网站迁到 AWS：有负载平衡、Linux CMS、MySQL。CMS 需要可持久的 NFS 相容共享档案。流量不可预测，EC2 要能从 2 扩到 30，网站程式不能改，还要防资料遗失。",
    "requirements": "1) NFS 共享储存；2) 2–30 自动扩展；3) 零改码；4) 资料不丢。",
    "steps": [
      "建立 Amazon EFS 档案系统作为 NFS 相容共享储存。",
      "用 AWS Elastic Beanstalk 部署 CMS，内建 ALB + Auto Scaling。",
      "用 .ebextensions 在实例启动时自动挂载 EFS。",
      "资料库用独立的 Amazon Aurora MySQL（与 Beanstalk 环境分离），避免环境重建打到资料。"
    ],
    "solutions": "正确答案是 A。EFS 满足 NFS；Beanstalk 用最少自管完成 ALB/ASG；独立 Aurora 防资料遗失。EBS Multi-Attach 限制多；自建 ASG/NLB 较重；ElastiCache 不能取代 MySQL。",
    "result_flow": "使用者 → ALB → Beanstalk ASG 上的 CMS（挂 EFS）→ Aurora MySQL；扩展 2–30 实例共享同一 EFS。",
    "options": {
      "A": "✓ 正确。EFS + Beanstalk + .ebextensions 挂载 + 独立 Aurora，符合扩展与不改码。",
      "B": "错。EBS Multi-Attach 限制多；NLB 也不如 ALB 适合 Web CMS。",
      "C": "错。自建 ASG+NLB 营运比 Beanstalk 重；lifecycle hook 挂载时机也不理想。",
      "D": "错。ElastiCache 不能取代关联式 MySQL。"
    },
    "diagram_before": "flowchart TB\n  WEB[\"地端网站 CMS\"]\n  MYSQL[\"MySQL\"]\n  NFS[\"需 NFS 共享档案\"]\n  GAP{{\"缺口: 2–30 自动扩<br/>零改码、资料不丢\"}}\n  WEB --> MYSQL\n  WEB --> NFS\n  NFS -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  U[\"使用者\"] --> ALB[\"ALB\"]\n  ALB --> EB[\"Beanstalk ASG<br/>CMS 2–30 实例\"]\n  EB --> EFS[\"EFS 共享 NFS\"]\n  EB --> AUR[\"Aurora MySQL\"]\n"
  },
  "462": {
    "blocker": "关键应用只在单一 Region：ALB 后 EC2 前端、RDS MySQL、S3 文件。财务团队直接查 DB 做报表，尖峰拖垮应用。需要跨 Region 灾难备援、少丢资料，并把报表查询与主负载分开。",
    "requirements": "1) DR 跨 Region；2) 最小化资料遗失；3) 财务查询不影响主应用。",
    "steps": [
      "在另一 Region 建 RDS 跨 Region read replica（唯读副本）。",
      "财务查询改打 read replica。",
      "为前端 EC2 建 AMI 并复制到备援 Region；S3 开 Cross-Region Replication。",
      "灾难时 promote 副本成独立 DB，从 AMI 起 EC2+ALB，应用指到新 S3 与新 DB。"
    ],
    "solutions": "正确答案是 C。跨 Region read replica 同时解决「报表分流」与「DR 快速 promote」；S3 CRR + AMI 备好运算。改 DynamoDB 改码太大；把实例硬塞进原 ALB 跨 Region 不可行；纯 snapshot 还原 RPO/RTO 较差。",
    "result_flow": "平时：写入主 RDS、财务读跨 Region 副本；S3 CRR / AMI 同步 → 灾难：promote 副本 → 起 EC2+ALB → 指到新 S3/DB。",
    "options": {
      "A": "错。迁 DynamoDB 改动大；Lambda 同步 S3 不可靠。",
      "B": "错。ALB 不能跨 Region 挂另一 Region 的实例。",
      "C": "✓ 正确。跨 Region 副本分流财务查询 + AMI/CRR，灾难 promote 启动。",
      "D": "错。小时 snapshot RPO 较差；ElastiCache 不能取代 SQL 报表查询。"
    },
    "diagram_before": "flowchart TB\n  ALB[\"ALB + EC2 前端\"]\n  RDS[\"RDS MySQL 单 Region\"]\n  FIN[\"财务直接查主库\"]\n  GAP{{\"缺口: 报表拖垮应用<br/>无跨 Region DR\"}}\n  ALB --> RDS\n  FIN --> RDS\n  RDS -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  APP[\"应用写主 RDS\"] --> PRI[\"主 Region RDS\"]\n  PRI --> RR[\"跨 Region read replica\"]\n  FIN[\"财务查询\"] --> RR\n  S3[\"S3 CRR + AMI\"] -.-> DR[\"灾难 promote 副本<br/>起 EC2/ALB\"]\n  RR --> DR\n"
  },
  "463": {
    "blocker": "地端服务敏感，已用 Direct Connect + IPSec VPN 连 AWS，流量不能走公网。公司想把服务开放给其他也在 AWS 的客户公司使用。",
    "requirements": "1) 其他 AWS 帐户可连；2) 不走 internet；3) 可接 DX 路径。",
    "steps": [
      "在 AWS 侧用 Network Load Balancer（四层负载平衡）承载 TCP 服务。",
      "建立 VPC Endpoint Service（PrivateLink 服务端）。",
      "允许消费者帐户建立 endpoint 连进来。",
      "连线路径可走 DX，维持私有、不经公网。"
    ],
    "solutions": "正确答案是 A。PrivateLink + NLB 支援任意 TCP，是跨帐户私有暴露服务的标准做法。ALB 只适合 HTTP(S)；IGW/NAT 会把模型导向公网，违反政策。",
    "result_flow": "消费者 VPC endpoint → PrivateLink → 你的 NLB → 后端服务；路径可经 DX 保持私有。",
    "options": {
      "A": "✓ 正确。NLB + VPC Endpoint Service，TCP 私有对接，可配合 DX。",
      "B": "错。ALB 只吃 HTTP/HTTPS，不适合任意 TCP 服务。",
      "C": "错。Internet Gateway 走公网，违规。",
      "D": "错。NAT 是出站上网，不是跨帐户入站服务模型。"
    },
    "diagram_before": "flowchart TB\n  ONP[\"地端敏感服务\"]\n  DX[\"DX + IPSec VPN\"]\n  AWS[\"AWS 私有路径\"]\n  GAP{{\"缺口: 其他 AWS 客户<br/>要连且不走公网\"}}\n  ONP --> DX --> AWS\n  AWS -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  CUST[\"消费者 VPC endpoint\"] --> PL[\"PrivateLink\"]\n  PL --> NLB[\"你的 NLB\"]\n  NLB --> SVC[\"后端 TCP 服务\"]\n  DX[\"可经 DX 保持私有\"] -.-> PL\n"
  },
  "464": {
    "blocker": "Organizations 多帐户。要规定：只有 administrator 角色能做 IAM 动作。架构师拿不到每一个帐户的登入权，要最低营运负担一次到位。",
    "requirements": "1) 全组织限制 IAM 操作；2) 不需逐帐户登入设定；3) 营运最轻。",
    "steps": [
      "撰写 SCP（服务控制政策：组织层级的上限/禁令，成员帐户改不掉）。",
      "内容用 Deny：拒绝所有非 administrator 角色的 IAM API。",
      "把 SCP 挂到 root OU，覆盖所有帐户。",
      "之后即使帐户内 IAM policy 放宽，也跨不过 SCP 这道天花板。"
    ],
    "solutions": "正确答案是 C。组织层 Deny SCP 才能「一把罩全公司」且不需进每个帐户。Allow 型 SCP 无法收回其他 Allow；CloudTrail+Lambda 是事后；permissions boundary 要逐角色处理。",
    "result_flow": "使用者呼叫 IAM API → 先过 SCP → 非 admin 角色直接 Deny；admin 角色才可能再被帐户内 policy 允许。",
    "options": {
      "A": "错。SCP 的 Allow 无法有效「只准 admin」，Deny 才是硬限制。",
      "B": "错。事后 Lambda 挡不住，也重。",
      "C": "✓ 正确。Root OU 上 Deny IAM（除 admin），一次覆盖全帐户。",
      "D": "错。permissions boundary 要逐帐户设定，架构师进不去所有帐户。"
    },
    "diagram_before": "flowchart TB\n  ORG[\"Organizations 多帐户\"]\n  IAM[\"任何人可能做 IAM 动作\"]\n  ARCH[\"架构师无逐户登入权\"]\n  GAP{{\"缺口: 无法一次限制<br/>仅 admin 能改 IAM\"}}\n  ORG --> IAM\n  ARCH -.-> GAP\n  IAM -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  USER[\"使用者呼叫 IAM API\"] --> SCP[\"组织层 Deny SCP\"]\n  SCP -->|非 admin 角色| DENY[\"直接 Deny\"]\n  SCP -->|administrator 角色| ALLOW[\"再经帐户 policy\"]\n  ALLOW --> OK[\"允许 IAM 操作\"]\n"
  },
  "465": {
    "blocker": "共用服务帐户 VPC 已接 Transit Gateway。新开发帐户要频繁删建资源，又要能连共用服务里的应用，且开发团队要能自己重建这条连线。",
    "requirements": "1) 开发帐户可连共享服务；2) 可反复删建 attachment；3) 开发团队自助。",
    "steps": [
      "在共用服务帐户对 Transit Gateway 开启 automatic acceptance（自动接受附件）。",
      "用 AWS RAM 把 TGW 分享给开发帐户。",
      "开发帐户接受 resource share。",
      "开发帐户自行建立 transit gateway attachment 并设路由；删掉重来也可自助。"
    ],
    "solutions": "正确答案是 B。RAM 分享 TGW + 自动接受，是跨帐户网路自助的标准。开发帐户自建 TGW 再 peering 多余；VPC endpoint 不能取代 TGW 连应用；EventBridge 自动接受过度设计。",
    "result_flow": "开发 VPC → 建 TGW attachment（RAM 已分享、自动接受）→ 共用服务 TGW → 共用服务 VPC 应用。",
    "options": {
      "A": "错。开发帐户另建 TGW 再 peering，偏离集中网路且更复杂。",
      "B": "✓ 正确。RAM 分享 TGW + 自动接受 + 开发帐户自建 attachment。",
      "C": "错。VPC endpoint 不是拿来取代 TGW 连一般应用 VPC。",
      "D": "错。自写 EventBridge/Lambda 接受附件没必要。"
    },
    "diagram_before": "flowchart TB\n  SHARED[\"共用服务 VPC<br/>已接 TGW\"]\n  APP[\"共用服务内应用\"]\n  DEV[\"新开发帐户常删建\"]\n  GAP{{\"缺口: 开发要自助<br/>重建连线到共用应用\"}}\n  SHARED --> APP\n  DEV -.->|尚无连线| GAP\n  APP -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  DEV[\"开发 VPC\"] -->|建 attachment| RAM[\"RAM 分享 TGW<br/>自动接受\"]\n  RAM --> TGW[\"共用服务 TGW\"]\n  TGW --> APP[\"共用服务 VPC 应用\"]\n"
  },
  "466": {
    "blocker": "公司要评估迁云 TCO（总拥有成本），但不能在现有 VM 上安装任何软体。需要可产出评估/TCO 报告的作法。",
    "requirements": "1) 不在业务 VM 装 agent；2) 能收集足够资讯；3) 产出 TCO 报告。",
    "steps": [
      "准备一台 EC2（或指定主机）部署 Migration Evaluator 的 agentless collector。",
      "用无代理方式（如读取虚拟化/网路管理资讯）收集环境数据。",
      "把资料汇入 Migration Evaluator。",
      "设定并产生 TCO / Quick Insights 类报告。"
    ],
    "solutions": "正确答案是 B。Migration Evaluator agentless collector 符合「不能在 VM 装软体」。Application Migration Service 主打迁移不是评估；只靠 Migration Hub 不够产 TCO；要装 agent 的工具直接出局。",
    "result_flow": "Agentless collector 收集 → Migration Evaluator 分析 → 汇出 TCO 报告给决策。",
    "options": {
      "A": "错。Application Migration Service 偏迁移，且常涉 agent。",
      "B": "✓ 正确。EC2 上跑 agentless collector，不碰业务 VM，产出 TCO。",
      "C": "错。Migration Hub 本身不直接给完整 TCO。",
      "D": "错。需在 VM 安装的评估方式违反限制。"
    },
    "diagram_before": "flowchart TB\n  VM[\"地端大量 VM\"]\n  POL[\"不能在 VM 装软体\"]\n  TCO[\"需要迁云 TCO 评估\"]\n  GAP{{\"缺口: 无 agentless<br/>评估路径\"}}\n  VM --> POL\n  TCO -.-> GAP\n  POL -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  COL[\"Agentless collector\"] --> DATA[\"收集库存/利用率\"]\n  DATA --> ME[\"Migration Evaluator\"]\n  ME --> RPT[\"TCO 报告\"]\n  RPT --> DEC[\"决策是否迁云\"]\n"
  },
  "467": {
    "blocker": "游戏资源要全球低延迟：两个 Region 各有 ALB。要用 DNS 把玩家导到延迟较低的 Region，且不健康时能切走。",
    "requirements": "1) 依延迟选 Region；2) 健康检查与 failover；3) 指到两边 ALB。",
    "steps": [
      "在 Route 53（DNS 服务）建立 latency-based 记录。",
      "记录类型用 alias 指到两个 Region 的 ALB。",
      "启用 health check，并打开 Evaluate Target Health。",
      "不健康的 Region 自动从解析结果排除。"
    ],
    "solutions": "正确答案是 D。Latency alias + 目标健康评估是多 Region 动态站的标准。CloudFront origin group 较适合源站备援静态/特定架构；纯 failover 不考虑延迟；两个 CloudFront 多余。",
    "result_flow": "玩家 DNS 查询 → Route 53 依延迟选 ALB → 该 Region 不健康则改解析到另一 Region ALB。",
    "options": {
      "A": "错。CloudFront origin group 不是「依延迟选最近游戏 ALB」的最佳模型。",
      "B": "错。Failover 只分主备，不优化延迟。",
      "C": "错。双 CloudFront 复杂，latency 直接指 ALB 更干脆。",
      "D": "✓ 正确。Latency alias + health/Evaluate Target Health，近且可切换。"
    },
    "diagram_before": "flowchart TB\n  P[\"全球玩家\"]\n  R1[\"Region A ALB\"]\n  R2[\"Region B ALB\"]\n  GAP{{\"缺口: DNS 未依延迟<br/>导流与健康切换\"}}\n  P -.-> R1\n  P -.-> R2\n  P -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  P[\"玩家 DNS 查询\"] --> R53[\"Route 53<br/>Latency + 健康评估\"]\n  R53 -->|较低延迟| A[\"Region A ALB\"]\n  R53 -.->|不健康改导| B[\"Region B ALB\"]\n  A --> GAME[\"游戏资源\"]\n  B --> GAME\n"
  },
  "468": {
    "blocker": "VPC Flow Logs 丢到 S3 后用 Athena 查询很慢/很贵。要优化查询效能与扫描量。",
    "requirements": "1) 降低 Athena 扫描成本；2) 加快查询；3) 改动合理。",
    "steps": [
      "把 Flow Logs 输出格式改成 Apache Parquet（列式压缩格式，Athena 友好）。",
      "依时间做 hourly partitions（小时分区）。",
      "Athena 查询时带分区条件，只扫需要的小时。",
      "避免只靠换 workgroup 或乱加加速功能。"
    ],
    "solutions": "正确答案是 C。对 Athena 来说，资料格式（Parquet）+ 分区通常是最大效益。bzip2、Transfer Acceleration、换 engine 都治标不治本。",
    "result_flow": "ENI 流量 → Flow Logs 以 Parquet 写入 S3（小时分区）→ Athena 只扫相关分区 → 更快更省。",
    "options": {
      "A": "错。bzip2 帮助有限，不如 Parquet+分区。",
      "B": "错。Transfer Acceleration/Intelligent-Tiering 不解决查询扫描。",
      "C": "✓ 正确。Parquet + 小时分区，Athena 效能与成本最佳化。",
      "D": "错。新 workgroup/引擎版无法补救烂资料布局。"
    },
    "diagram_before": "flowchart TB\n  ENI[\"VPC ENI 流量\"]\n  LOG[\"Flow Logs → S3\"]\n  ATH[\"Athena 查询\"]\n  GAP{{\"缺口: 扫描慢又贵<br/>格式/分区未优化\"}}\n  ENI --> LOG --> ATH\n  ATH -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  ENI[\"ENI 流量\"] --> FL[\"Flow Logs<br/>Parquet + 小时分区\"]\n  FL --> S3[\"S3\"]\n  S3 --> ATH[\"Athena 只扫相关分区\"]\n  ATH --> FAST[\"更快更省\"]\n"
  },
  "469": {
    "blocker": "要建 1 Gbps Direct Connect，架构含 Transit Gateway 与 Direct Connect Gateway，用 transit VIF 连多 VPC 与地端。需要正确宣告路由才能通。",
    "requirements": "1) 地端能到 VPC；2) VPC 能回地端；3) 走 transit VIF。",
    "steps": [
      "建立 transit VIF 接到 Direct Connect Gateway，并关联 Transit Gateway。",
      "在 transit VIF 上向 AWS 端广告 on-premises 网段前缀。",
      "由 Direct Connect Gateway 把 VPC/TGW 相关前缀广告回地端。",
      "确认两边路由表都有对应路径（不必为了 transit VIF 硬升 10G 或先搞 MACsec）。"
    ],
    "solutions": "正确答案是 B 与 C。Transit VIF 双向都要正确 BGP 广告：地端前缀进去、VPC 前缀出来。升速与 MACsec 不是「让 transit VIF 通」的必要组合。",
    "result_flow": "地端前缀 --BGP/transit VIF--> DXGW/TGW → VPC；VPC 前缀 --BGP--> 地端，双向可达。",
    "options": {
      "A": "错。1G 已可跑 transit VIF，升级非必要。",
      "B": "✓ 正确。必须广告 on-premises 前缀到 transit VIF。",
      "C": "✓ 正确。必须把 VPC 前缀从 DXGW 广告回地端。",
      "D": "错。MACsec 是加密选项，不是路由通断关键。",
      "E": "错。CKN/CAK 属 MACsec，非本题连线必备。"
    },
    "diagram_before": "flowchart TB\n  ONP[\"地端\"]\n  DX[\"1Gbps DX\"]\n  TGW[\"DXGW + TGW + transit VIF\"]\n  VPC[\"多 VPC\"]\n  GAP{{\"缺口: 路由未正确宣告<br/>双向不通\"}}\n  ONP --> DX --> TGW --> VPC\n  TGW -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  ONP[\"地端前缀\"] -->|BGP transit VIF| DXGW[\"DXGW / TGW\"]\n  DXGW --> VPC[\"VPC 可达\"]\n  VPC2[\"VPC 前缀\"] -->|BGP 回传| ONP2[\"地端可达\"]\n  NOTE[\"双向广告完成互通\"] -.-> DXGW\n"
  },
  "470": {
    "blocker": "用 WorkSpaces + 瘦客户端取代旧桌面，处理临床试验资料。资安要求只能从公司分公司位置连入；半年内可能再加分公司。要最省营运。",
    "requirements": "1) 限制来源 IP 为分公司；2) 易于新增分公司；3) 营运效率高。",
    "steps": [
      "整理各分公司的公用 IP 清单。",
      "建立 WorkSpaces 的 IP access control group 规则。",
      "把规则关联到 WorkSpaces directory。",
      "未来新分公司只需更新 IP 清单即可。"
    ],
    "solutions": "正确答案是 A。WorkSpaces 原生 IP access control group 最轻。WAF、装置凭证、自订映像防火墙都更重或不合适。",
    "result_flow": "员工从分公司公网 IP → WorkSpaces 检查 IP access control group → 允许进桌面应用。",
    "options": {
      "A": "✓ 正确。IP access control group 关联 directory，维护简单。",
      "B": "错。Firewall Manager/WAF 不这样直接护 WorkSpaces directory。",
      "C": "错。装置凭证管理重。",
      "D": "错。自订映像内防火墙难统一更新。"
    },
    "diagram_before": "flowchart TB\n  WS[\"WorkSpaces + 瘦客户端\"]\n  DATA[\"临床试验资料\"]\n  LOC[\"分公司位置不定\"]\n  GAP{{\"缺口: 只能从核准<br/>分公司 IP 连入\"}}\n  LOC --> WS --> DATA\n  WS -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  EMP[\"员工分公司公网 IP\"] --> IPG[\"WorkSpaces<br/>IP access control group\"]\n  IPG -->|允许| DESK[\"虚拟桌面\"]\n  IPG -->|拒绝| BLOCK[\"非核准位置挡下\"]\n  DESK --> APP[\"临床应用\"]\n"
  },
  "471": {
    "blocker": "集中网路帐户有两台手动设定的防火墙 EC2（固定私网 IP），成员帐户经 Transit Gateway 上网。曾被脚本误删两台防火墙。现有开机设定脚本，希望防火墙能水平扩展、自动复原，现代化部署。",
    "requirements": "1) 可水平扩展；2) 自动重建设定；3) 成员流量仍集中检查。",
    "steps": [
      "在集中帐户部署 Gateway Load Balancer（专为防火墙/检测设备设计的负载平衡）。",
      "以 GWLB 建立 PrivateLink endpoint service。",
      "用 Auto Scaling + launch template，user data 跑新脚本自动设定防火墙；target group 用 instance 类型。",
      "在集中网路路径部署 VPC endpoint（GWLB endpoint），成员帐户路由经 TGW/检查路径出去。"
    ],
    "solutions": "正确答案是 A、C、F。GWLB 是虚拟防火墙水平扩展的标准；ASG+launch template 解决误删与扩展；endpoint 放在集中检查路径（题库选项 F）。NLB 不走 GENEVE 检测模型；Launch Wizard/IP target 非首选。",
    "result_flow": "成员 VPC → TGW → 集中帐户 GWLB endpoint → GWLB → ASG 防火墙设备 → 出网；设备挂掉由 ASG 用脚本重建。",
    "options": {
      "A": "✓ 正确。GWLB + PrivateLink endpoint service，适合防火墙透明检测。",
      "B": "错。NLB 不是 GWLB 这类 appliance 检测模型。",
      "C": "✓ 正确。ASG + launch template + instance target，可水平扩展与自愈。",
      "D": "错。Launch Wizard + IP target 非此场景标准。",
      "E": "选项含 E/F 合并文字：成员帐户各自建 endpoint 的 E 非题库组合；F 在集中帐户建 endpoint 并配合路由才是题库正确组合之一。",
      "F": "✓ 正确。在集中网路帐户建立 VPC endpoints，并更新成员帐户路由，使流量进入检查路径。"
    },
    "diagram_before": "flowchart TB\n  MEM[\"成员帐户 → TGW\"]\n  FW[\"两台手动防火墙 EC2<br/>固定 IP\"]\n  NET[\"集中上网\"]\n  GAP{{\"缺口: 误删后无自动复原<br/>无法水平扩展\"}}\n  MEM --> FW --> NET\n  FW -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  MEM[\"成员 VPC\"] --> TGW[\"Transit Gateway\"]\n  TGW --> EP[\"GWLB endpoint\"]\n  EP --> GWLB[\"Gateway Load Balancer\"]\n  GWLB --> ASG[\"ASG 防火墙<br/>+ launch template 脚本\"]\n  ASG --> OUT[\"出网检查\"]\n"
  },
  "472": {
    "blocker": "RDS PostgreSQL 要多 Region 高可用，CloudFormation 两地都能建。已开自动备份；RTO 15 分钟、RPO 2 小时。应用用 Route 53 指到资料库端点。",
    "requirements": "1) RTO 15 分；2) RPO 2 小时内；3) DNS 可 failover。",
    "steps": [
      "在次要 Region 建立跨 Region read replica。",
      "准备 Lambda：侦测到故障时 promote 副本。",
      "在 Route 53 为资料库 DNS 设 failover 路由政策。",
      "主/备端点分别指向两 Region；故障时 DNS 切到已 promote 的库。"
    ],
    "solutions": "正确答案是 A 与 D。跨 Region 副本 + promote 才能贴近 15 分 RTO；Route 53 failover 完成流量切换。从 snapshot 重建往往太慢；手动每 2 小时拷备份风险高。",
    "result_flow": "主 Region RDS → 跨 Region 副本 → 故障 Lambda promote → Route 53 failover 把应用 DNS 指到新主库。",
    "options": {
      "A": "✓ 正确。跨 Region 副本 + Lambda promote，满足短 RTO。",
      "B": "错。快照重建难稳稳落在 15 分 RTO。",
      "C": "错。人工/定时拷贝备份不够稳。",
      "D": "✓ 正确。Route 53 failover 完成 DNS 切换。",
      "E": "错。事到临头从备份还 hot standby，RTO 常不达标。"
    },
    "diagram_before": "flowchart TB\n  APP[\"应用经 Route 53\"]\n  RDS[\"RDS PostgreSQL<br/>单 Region + 自动备份\"]\n  CFN[\"CloudFormation 两地模板\"]\n  GAP{{\"缺口: RTO 15 分 / RPO 2 时<br/>缺跨 Region 快速切换\"}}\n  APP --> RDS\n  CFN -.-> GAP\n  RDS -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  PRI[\"主 Region RDS\"] --> RR[\"跨 Region 副本\"]\n  FAIL[\"故障\"] --> L[\"Lambda promote\"]\n  L --> NEW[\"新主库\"]\n  R53[\"Route 53 failover\"] --> NEW\n  APP[\"应用 DNS\"] --> R53\n"
  },
  "473": {
    "blocker": "电商：API Gateway → Lambda → RDS PostgreSQL。促销时 Lambda 呼叫暴增、DB 连线暴增、CPU 高，应用变慢。",
    "requirements": "1) 缓解连线风暴；2) 保护 RDS；3) 少改业务逻辑。",
    "steps": [
      "在 Lambda 主控台建立 RDS Proxy（资料库连线池代理）。",
      "把 Lambda 连线字串改成 proxy endpoint。",
      "Proxy 重用/多工连线，避免每个调用都开新 DB 连线。",
      "观察连线数与 CPU 回落。"
    ],
    "solutions": "正确答案是 C。Lambda 高并发最痛是 DB 连线耗尽；RDS Proxy 就是为此。只加记忆体、只靠 handler 外连线、或上 ElastiCache 都无法完整取代连线池治理。",
    "result_flow": "API → Lambda 大量并发 → RDS Proxy 连线池 → 少量真实连线打到 RDS → 稳定。",
    "options": {
      "A": "错。加记忆体不解决连线数爆炸。",
      "B": "错。快取要改逻辑，且不治本连线池。",
      "C": "✓ 正确。RDS Proxy 专门吸收 Lambda 连线风暴。",
      "D": "错。自管连线重用有帮助但不如 Proxy 完整。"
    },
    "diagram_before": "flowchart TB\n  API[\"API Gateway\"]\n  L[\"Lambda 暴增\"]\n  RDS[\"RDS PostgreSQL\"]\n  GAP{{\"缺口: DB 连线耗尽<br/>CPU 高、应用变慢\"}}\n  API --> L --> RDS\n  L -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  API[\"API Gateway\"] --> L[\"Lambda 大量并发\"]\n  L --> PROXY[\"RDS Proxy 连线池\"]\n  PROXY --> RDS[\"少量真实连线 → RDS\"]\n  RDS --> STABLE[\"促销尖峰仍稳定\"]\n"
  },
  "474": {
    "blocker": "零售应用在 EC2 上：接单、退货、分析；资料在 MySQL 与 Oracle OLAP。元件多、资料来源多，每周 ETL 拷到分析库。要现代化成可扩展、事件驱动、偏向 serverless。",
    "requirements": "1) 微服务化；2) 营运资料与分析分离；3) 事件驱动、少管伺服器。",
    "steps": [
      "应用拆成微服务，跑在 EKS on Fargate（K8s 但节点由 AWS 管）。",
      "交易 MySQL 迁到 Aurora Serverless MySQL。",
      "分析库迁到 Redshift Serverless（资料仓储）。",
      "用 EventBridge 做事件路由，取代僵硬周更 ETL。"
    ],
    "solutions": "正确答案是 C。EKS Fargate + Aurora Serverless + Redshift Serverless + EventBridge 完整对上 serverless 与事件化。AppStream/IoT/Neptune 等选项不对景。",
    "result_flow": "订单事件 → EventBridge → 微服务（EKS Fargate）→ Aurora Serverless；分析负载 → Redshift Serverless。",
    "options": {
      "A": "错。分析用 Neptune、交易库留 EC2，不符合现代化目标。",
      "B": "错。仍大量自管 EC2 Auto Scaling，serverless 不足。",
      "C": "✓ 正确。EKS Fargate + Aurora/Redshift Serverless + EventBridge。",
      "D": "错。AppStream、IoT Core 不适合此零售交易事件架构。"
    },
    "diagram_before": "flowchart TB\n  APP[\"EC2 接单/退货/分析\"]\n  MYSQL[\"MySQL + Oracle OLAP\"]\n  ETL[\"每周 ETL 拷分析库\"]\n  GAP{{\"缺口: 元件耦合重<br/>非事件驱动 serverless\"}}\n  APP --> MYSQL\n  ETL --> MYSQL\n  APP -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  EVT[\"订单事件\"] --> EB[\"EventBridge\"]\n  EB --> MS[\"EKS Fargate 微服务\"]\n  MS --> AUR[\"Aurora Serverless\"]\n  ANAL[\"分析负载\"] --> RS[\"Redshift Serverless\"]\n"
  },
  "475": {
    "blocker": "多帐户 Organizations，帐户会持续增加。要在所有帐户打开 CloudTrail（API 稽核轨迹），营运最省。",
    "requirements": "1) 全帐户涵盖；2) 新帐户自动纳入；3) 最低营运。",
    "steps": [
      "在组织管理帐户建立 CloudTrail。",
      "设定为 organization trail（组织级追踪）。",
      "记录所有成员帐户事件（通常再集中到加密 S3）。",
      "新帐户加入组织即自动被涵盖，不必逐户建 trail。"
    ],
    "solutions": "正确答案是 B。Organization trail 一次设定管现在与未来。每日 Lambda/SSM 扫、或每户自建 trail 都更重。",
    "result_flow": "任一帐户 API 活动 → Organization trail 捕捉 → 集中存放，新帐户自动加入。",
    "options": {
      "A": "错。每日 Lambda 建 trail 多余且易漏。",
      "B": "✓ 正确。管理帐户 organization trail，涵盖全组织。",
      "C": "错。逐帐户建 trail 随帐户数爆营运。",
      "D": "错。SSM Automation 比 org trail 重。"
    },
    "diagram_before": "flowchart TB\n  ORG[\"Organizations\"]\n  ACC[\"帐户持续增加\"]\n  TRAIL[\"各户 CloudTrail 不一\"]\n  GAP{{\"缺口: 要全帐户开启<br/>且营运最省\"}}\n  ORG --> ACC --> TRAIL\n  TRAIL -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  API[\"任一帐户 API 活动\"] --> OT[\"Organization trail\"]\n  OT --> S3[\"集中存放日志\"]\n  NEW[\"新帐户加入\"] --> OT\n  S3 --> AUDIT[\"自动涵盖稽核\"]\n"
  },
  "476": {
    "blocker": "工程师远端办公。AD DS 跑在 EC2。政策：VPC 内非公开服务只能经 VPN 存取，且 VPN 必须 MFA。",
    "requirements": "1) 远端进 VPC；2) 与 AD 整合；3) 强制 MFA。",
    "steps": [
      "建立 AWS Client VPN endpoint（给个人笔电用的客户端 VPN）。",
      "用 AD Connector 连到现有 AD DS。",
      "在 AD Connector 启用 MFA。",
      "远端使用者连 Client VPN，通过 AD+MFA 后才能进 VPC 内部服务。"
    ],
    "solutions": "正确答案是 B。Client VPN + AD Connector + MFA 是远端使用者进 VPC 的标准。Site-to-Site 是站对站；WorkSpaces/WorkLink/Copilot 都不对题。",
    "result_flow": "远端笔电 → Client VPN（AD Connector 验证 + MFA）→ VPC 内私有服务。",
    "options": {
      "A": "错。Site-to-Site 不是个人远端 VPN；WorkSpaces client 也不是这题解法。",
      "B": "✓ 正确。Client VPN + AD Connector + MFA。",
      "C": "错。CloudHub/Copilot 与需求不符。",
      "D": "错。WorkLink 偏内部网站存取，不能取代 Client VPN。"
    },
    "diagram_before": "flowchart TB\n  REM[\"远端工程师\"]\n  AD[\"AD DS 在 EC2\"]\n  VPC[\"VPC 私有服务\"]\n  GAP{{\"缺口: 只能经 VPN<br/>且必须 MFA\"}}\n  REM -.-> VPC\n  AD -.-> GAP\n  REM -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  LAP[\"远端笔电\"] --> CVPN[\"Client VPN\"]\n  CVPN --> ADC[\"AD Connector + MFA\"]\n  ADC --> VPC[\"VPC 私有服务\"]\n  VPC --> OK[\"政策合规存取\"]\n"
  },
  "477": {
    "blocker": "三层 on-prem：Apache 前端、单体 Java、PostgreSQL。大促时三层都过载，DB 读爆。公司要现代化并选对迁移策略（选三项）。",
    "requirements": "1) 前端可扩展；2) 中间层可水平扩；3) 读负载可扩。",
    "steps": [
      "前端静态资源改放 S3，用 CloudFront（CDN）分发。",
      "Java 改 Docker，用 Fargate（无伺服器容器）跑。",
      "用 DMS 把 PostgreSQL 迁到 Aurora PostgreSQL，并对 read replica 做 Auto Scaling。",
      "让读多写少的流量打到副本，保护写入主库。"
    ],
    "solutions": "正确答案是 A、D、E。S3+CloudFront 卸载前端；Fargate 容器化中间层；Aurora 副本扩读。单纯 rehost 到更大 EC2/Beanstalk 扩展性不足。",
    "result_flow": "使用者 → CloudFront/S3 静态 → Fargate 上 Java API → Aurora（写主、读副本自动扩）。",
    "options": {
      "A": "✓ 正确。静态上 S3+CloudFront，卸载源站。",
      "B": "错。只 rehost Apache/EFS 现代化不足。",
      "C": "错。Beanstalk rehost 不如容器灵活。",
      "D": "✓ 正确。Java 容器化上 Fargate，可扩展且少管机。",
      "E": "✓ 正确。DMS 到 Aurora + 读副本扩展，解决读爆。",
      "F": "错。PostgreSQL rehost 更大 EC2 仍难水平扩读。"
    },
    "diagram_before": "flowchart TB\n  WEB[\"Apache 前端\"]\n  JAVA[\"单体 Java\"]\n  PG[\"PostgreSQL 读爆\"]\n  GAP{{\"缺口: 大促三层过载<br/>现代化策略不足\"}}\n  WEB --> JAVA --> PG\n  PG -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  U[\"使用者\"] --> CF[\"CloudFront + S3 静态\"]\n  U --> API[\"Fargate Java API\"]\n  API --> AUR[\"Aurora 写主\"]\n  API --> RR[\"读副本自动扩\"]\n"
  },
  "478": {
    "blocker": "EKS 受管节点 + ECR 映像。安全要求：AWS 上资源要持续扫描漏洞，营运负担最低。",
    "requirements": "1) 扫 EKS 节点；2) 扫 ECR 映像；3) 持续、少维运。",
    "steps": [
      "启用 Amazon Inspector（AWS 原生漏洞扫描）。",
      "对 ECR 仓库开启持续/自动映像扫描。",
      "对 EKS 节点（底层 EC2）纳入 Inspector 扫描。",
      "在主控台/Security Hub 聚合看结果，不必自建扫描机。"
    ],
    "solutions": "正确答案是 B。Inspector 原生覆盖 ECR 与 EC2/EKS 节点 CVE。Security Hub 是汇总不是扫描器；Marketplace 自建扫描机重；CloudWatch agent 不扫漏洞。",
    "result_flow": "推映像到 ECR / 节点运行 → Inspector 持续扫 CVE → 产出发现项供修复。",
    "options": {
      "A": "错。Security Hub 汇总发现，不直接当扫描引擎。",
      "B": "✓ 正确。Inspector 扫 EKS 节点与 ECR，负担最低。",
      "C": "错。自管 Marketplace 扫描机营运重。",
      "D": "错。CloudWatch agent 不做漏洞扫描。"
    },
    "diagram_before": "flowchart TB\n  EKS[\"EKS 受管节点\"]\n  ECR[\"ECR 容器映像\"]\n  SEC[\"安全要求持续扫漏洞\"]\n  GAP{{\"缺口: 营运负担要最低<br/>缺原生扫描\"}}\n  ECR --> EKS\n  EKS --> SEC\n  SEC -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  PUSH[\"推映像到 ECR\"] --> INS[\"Amazon Inspector\"]\n  NODE[\"EKS 节点运行\"] --> INS\n  INS --> CVE[\"持续扫 CVE\"]\n  CVE --> FIX[\"产出发现项供修复\"]\n"
  },
  "479": {
    "blocker": "售票应用在 ECS，CloudFront 源站是单一 ECS service。只有 JWT 带特定加密属性的人能进购票流，其他人进等候室。大流量时等候室拖垮购票。",
    "requirements": "1) 购票与等候室隔离扩展；2) 在边缘依 JWT 分流；3) 提高可靠性。",
    "steps": [
      "把等候室拆成 ECS 上另一个独立 service，用独立扩展设定。",
      "购票 service 维持自己的容量策略。",
      "写 CloudFront Function 检查 JWT 属性。",
      "符合条件转购票 origin，其余转等候室 origin。"
    ],
    "solutions": "正确答案是 C。边缘（CloudFront Function）分流 + 后端两 service 隔离，避免等候室吃光购票资源。搬 EKS/App Mesh 过重；只在应用内 forward 仍共用压力。",
    "result_flow": "使用者 → CloudFront Function 读 JWT → 合格者到购票 ECS service；其他人到等候室 service（各自扩展）。",
    "options": {
      "A": "错。没有边缘分流，压力仍挤在同一分发路径。",
      "B": "错。搬 EKS 成本高，未在边缘解决。",
      "C": "✓ 正确。独立等候室 service + CloudFront Function 依 JWT 路由。",
      "D": "错。EKS+App Mesh 过度复杂。"
    },
    "diagram_before": "flowchart TB\n  U[\"大量使用者\"]\n  CF[\"CloudFront\"]\n  ECS[\"单一 ECS service<br/>购票+等候室\"]\n  GAP{{\"缺口: 等候室拖垮购票<br/>JWT 分流未隔离\"}}\n  U --> CF --> ECS\n  ECS -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  U[\"使用者\"] --> CF[\"CloudFront\"]\n  CF --> FN[\"CloudFront Function<br/>读 JWT\"]\n  FN -->|合格| BUY[\"购票 ECS service\"]\n  FN -->|其他人| WAIT[\"等候室 service\"]\n  BUY --> ISO[\"各自独立扩展\"]\n"
  },
  "480": {
    "blocker": "用 CloudFormation 重现非正式环境。子帐户 EC2 用 instance profile assume 父帐户角色。模板用同名重建 role 后，EC2 再也 assume 不了。",
    "requirements": "1) 恢复跨帐户 AssumeRole；2) 找出信任断点。",
    "steps": [
      "到父帐户检查被 assume 的角色 trust policy。",
      "确认允许 sts:AssumeRole 的 principal/角色 ARN 仍指向「新」的子帐户角色 ARN。",
      "若 ARN 因重建而变或残留旧 ARN，更新为正确 ARN。",
      "重新从 EC2 测试 assume。"
    ],
    "solutions": "正确答案是 A。跨帐户信任看的是精确 ARN；重建 role 后父帐户 trust 常仍指旧 ARN。扩大信任整个子帐户 root 过宽；只补 CAPABILITY_NAMED_IAM 不解信任。",
    "result_flow": "EC2 instance profile → 子帐户 role → sts:AssumeRole 父帐户 role（trust 必须点名正确 ARN）→ 取得临时权限。",
    "options": {
      "A": "✓ 正确。修正父帐户 trust policy 中的目标 role ARN。",
      "B": "错。信任整个子帐户 root 过宽且未必是根因。",
      "C": "错。CAPABILITY 与跨帐户信任无关。",
      "D": "错。Capabilities 不能修好 trust policy。"
    },
    "diagram_before": "flowchart TB\n  EC2[\"子帐户 EC2<br/>instance profile\"]\n  ROLE[\"同名重建 role\"]\n  PARENT[\"父帐户角色\"]\n  GAP{{\"缺口: trust 仍指旧 ARN<br/>assume 失败\"}}\n  EC2 --> ROLE\n  ROLE -.->|assume 失败| GAP\n  PARENT -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  EC2[\"EC2 instance profile\"] --> CHILD[\"子帐户 role\"]\n  CHILD -->|sts:AssumeRole| PARENT[\"父帐户 role\"]\n  TRUST[\"trust 点名正确 ARN\"] --> PARENT\n  PARENT --> TMP[\"取得临时权限\"]\n"
  },
  "481": {
    "blocker": "全球客户的 Web 应用跑单台 EC2，读很重的 RDS MySQL。高负载会死机要人工重启。要提高可靠性且开发量最少。",
    "requirements": "1) 运算层高可用；2) 读负载可扩；3) 最少改码。",
    "steps": [
      "应用改跑在 Auto Scaling group 多实例。",
      "前面加 ELB 负载平衡。",
      "资料库换成 Amazon Aurora，使用 Aurora Replicas 扛读。",
      "避免大翻修成 Lambda 或只加 CloudFront 假装解决应用单点。"
    ],
    "solutions": "正确答案是 B。ASG+ELB 去单点；Aurora 副本扩读，属标准 re-platform、开发量相对小。CloudFront/Global Accelerator 不解应用单机；standby 不能拿来读；迁 Lambda 改动大。",
    "result_flow": "使用者 → ELB → ASG 多 EC2 → Aurora 写主、读副本；实例挂掉自动替换。",
    "options": {
      "A": "错。CloudFront 不治应用单点；RDS standby 不能当读库。",
      "B": "✓ 正确。ASG+ELB + Aurora Replicas，可靠性高、改动相对少。",
      "C": "错。Global Accelerator 不解单 EC2；standby 不能读。",
      "D": "错。改 Lambda 开发量大。"
    },
    "diagram_before": "flowchart TB\n  U[\"全球客户\"]\n  EC2[\"单台 EC2 Web\"]\n  RDS[\"RDS MySQL 读很重\"]\n  GAP{{\"缺口: 高负载死机<br/>要人工重启\"}}\n  U --> EC2 --> RDS\n  EC2 -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  U[\"使用者\"] --> ELB[\"ELB\"]\n  ELB --> ASG[\"ASG 多 EC2\"]\n  ASG --> W[\"Aurora 写主\"]\n  ASG --> R[\"Aurora 读副本\"]\n  ASG --> AUTO[\"实例挂掉自动替换\"]\n"
  },
  "482": {
    "blocker": "Transfer Family SFTP 收第三方 PGP 加密档到 S3。要 managed workflow 自动解密。已有可读 Secrets Manager 与 S3 的 IAM 角色。",
    "requirements": "1) 自动解密；2) 金钥安全存放；3) 走 Transfer managed workflow。",
    "steps": [
      "把 PGP 私钥存进 Secrets Manager（密钥保管库）。",
      "在 Transfer Family managed workflow 加 nominal step（正常流程步骤）做解密。",
      "步骤参数指向 Secrets Manager 私钥与解密设定。",
      "把 workflow 绑到 Transfer server，档案到达即解密。"
    ],
    "solutions": "正确答案是 C。解密一定要私钥；应放在正常步骤而非 exception handler。公钥只能加密不能解密。",
    "result_flow": "供应商 SFTP 上传密文 → Transfer managed workflow 正常步骤取 Secrets Manager 私钥 → 解密 → 明文进 S3。",
    "options": {
      "A": "错。公钥不能解密。",
      "B": "错。解密不该塞在 exception handler。",
      "C": "✓ 正确。私钥在 Secrets Manager + workflow 正常步骤解密。",
      "D": "错。公钥 + exception 路径双错。"
    },
    "diagram_before": "flowchart TB\n  VEN[\"第三方 SFTP\"]\n  TF[\"Transfer Family\"]\n  S3[\"S3 收到 PGP 密文\"]\n  GAP{{\"缺口: managed workflow<br/>未自动解密\"}}\n  VEN --> TF --> S3\n  S3 -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  UP[\"供应商 SFTP 上传\"] --> TF[\"Transfer managed workflow\"]\n  TF --> SM[\"Secrets Manager 私钥\"]\n  SM --> DEC[\"正常步骤解密\"]\n  DEC --> S3[\"明文进 S3\"]\n"
  },
  "483": {
    "blocker": "大型多人游戏排行榜要微秒级读、个位数毫秒写，资料约数 TB，主节点挂掉要在 1 分钟内可写，且资料要能持久给分析管线。要最低营运。",
    "requirements": "1) 极低延迟；2) 快速故障切换；3) 持久化；4) 少运维。",
    "steps": [
      "建立 Amazon MemoryDB for Redis（相容 Redis、资料持久的记忆体资料库）Multi-AZ 丛集。",
      "应用连 primary 做读写以达低延迟。",
      "Multi-AZ 在主节点失败时快速提供可写端点。",
      "持久资料可再进分析管线，不必自管 EC2 Redis。"
    ],
    "solutions": "正确答案是 C。MemoryDB 同时给 Redis 级延迟与持久化/Multi-AZ，营运低。一般 RDS 延迟达不到微秒读；自建 EC2 Redis 维运重。",
    "result_flow": "游戏服 → MemoryDB primary（微秒/毫秒）→ Multi-AZ 故障转移后继续写 → 持久资料进分析管线。",
    "options": {
      "B": "错。RDS 延迟远高于排行榜需求。",
      "C": "✓ 正确。MemoryDB Multi-AZ，低延迟 + 持久 + 少运维。",
      "D": "错。自建 Redis on EC2 维运与 HA 自理成本高。"
    },
    "diagram_before": "flowchart TB\n  GAME[\"大型多人游戏\"]\n  LB[\"排行榜 数 TB\"]\n  NEED[\"微秒读 / 毫秒写\"]\n  GAP{{\"缺口: 主挂 1 分内可写<br/>且要持久供分析\"}}\n  GAME --> LB --> NEED\n  NEED -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  GAME[\"游戏服\"] --> MDB[\"MemoryDB primary\"]\n  MDB --> FAST[\"微秒读 / 毫秒写\"]\n  MDB --> FA[\"Multi-AZ 故障转移\"]\n  FA --> WRITE[\"1 分内可再写\"]\n  MDB --> ANAL[\"持久资料进分析\"]\n"
  },
  "484": {
    "blocker": "Organizations 多帐户，要依 BusinessUnit 标签看各单位成本。要中央一致启用成本分配标签，并用 CUR + Athena + QuickSight 做报表。",
    "requirements": "1) 启用 BusinessUnit 成本分配标签；2) 中央 CUR；3) Athena/QuickSight 可视化。",
    "steps": [
      "在管理帐户启用 BusinessUnit 作为 cost allocation tag。",
      "设定/使用中央 Cost and Usage Report 进 S3。",
      "用 Athena 查 CUR。",
      "QuickSight 接 Athena 做各业务单位仪表板。"
    ],
    "solutions": "正确答案是 A。成本分配标签要在管理帐户统一启用；中央 CUR + Athena + QuickSight 是标准成本分析链。各帐户各自 CUR 或只靠 CloudWatch 都不理想。",
    "result_flow": "资源打 BusinessUnit 标签 → 管理帐户启用分配标签 → CUR 进 S3 → Athena 聚合 → QuickSight 展示。",
    "options": {
      "A": "✓ 正确。管理帐户启用标签 + 中央 CUR + Athena + QuickSight。",
      "B": "错。分散启用与 CloudWatch 不适合作细成本分析。",
      "C": "错。每帐户独立 CUR 管理重。",
      "D": "错。分散 CUR + CloudWatch dashboard 能力不足。"
    },
    "diagram_before": "flowchart TB\n  ACC[\"Organizations 多帐户\"]\n  TAG[\"BusinessUnit 标签\"]\n  COST[\"成本分散难归属\"]\n  GAP{{\"缺口: 中央未启用<br/>分配标签与报表链\"}}\n  ACC --> TAG\n  COST -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  RES[\"资源打 BusinessUnit\"] --> EN[\"管理帐户启用<br/>成本分配标签\"]\n  EN --> CUR[\"CUR 进 S3\"]\n  CUR --> ATH[\"Athena 聚合\"]\n  ATH --> QS[\"QuickSight 展示\"]\n"
  },
  "485": {
    "blocker": "架构出现 Lambda 写 DynamoDB 时限流/变慢。要选两项改善吞吐与执行效率。",
    "requirements": "1) 提高写入吞吐；2) 加快 Lambda；3) 直接有效。",
    "steps": [
      "提高 DynamoDB 写入容量（WCU 或 on-demand 调整），消除写入限流。",
      "增加 Lambda 记忆体（同时提高 CPU 配额），缩短单次执行时间。",
      "避免再加大 payload 或乱加伫列反而复杂化。",
      "观察限流错误与 duration 下降。"
    ],
    "solutions": "正确答案是 A 与 B。写入被 throttle 先加 DynamoDB 写容量；Lambda 加记忆体常能加速 CPU 密集工作。加大 payload、硬插 Kinesis/FIFO 非首选。",
    "result_flow": "请求 → 更大记忆体的 Lambda 更快算完 → 更高 WCU 的 DynamoDB 吞下写入。",
    "options": {
      "A": "✓ 正确。增加 DynamoDB 写入容量，解除 throttle。",
      "B": "✓ 正确。增加 Lambda 记忆体以加快执行。",
      "C": "错。更大 payload 通常更糟。",
      "D": "错。先加 Kinesis 过度设计。",
      "E": "错。SQS FIFO 可能加延迟，不治本。"
    },
    "diagram_before": "flowchart TB\n  L[\"Lambda\"]\n  DDB[\"DynamoDB\"]\n  THR[\"写入限流/变慢\"]\n  GAP{{\"缺口: 吞吐与执行<br/>效率不足\"}}\n  L --> DDB\n  DDB --> THR\n  THR -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  REQ[\"请求\"] --> L[\"更大记忆体 Lambda<br/>CPU 更快\"]\n  L --> DDB[\"提高 WCU 的 DynamoDB\"]\n  DDB --> OK[\"吞下写入、减少 throttle\"]\n"
  },
  "486": {
    "blocker": "WorkSpaces 概念验证成功，要在两个 Region 做高可用，failover Region 已有 WorkSpaces，Route 53 有 hosted zone。",
    "requirements": "1) 双 Region HA；2) DNS 可 failover；3) 与 directory 正确关联。",
    "steps": [
      "在 primary Region 建立 connection alias（连线别名）。",
      "依题库作法：将 alias 与 failover Region 的 directory 关联（见争议注记）。",
      "在 Route 53 设 failover 路由政策。",
      "开启 Evaluate Target Health，让不健康目标被切走。"
    ],
    "solutions": "正确答案是 D（依题库 correct_answers）。实务上较常见是两 Region 各建 connection alias 并各联本地 directory（近似选项 A）。若遇争议，以题库 D 为准作答，并理解 failover 路由 + 健康评估是 DNS 切换关键。",
    "result_flow": "使用者连线名称 → Route 53 failover → 指向可用 Region 的 WorkSpaces connection alias/directory。",
    "options": {
      "A": "错（依题库）。虽像最佳实务双 alias 各联本地 directory，但本题标记不选。",
      "B": "错。Multivalue 不适合 WorkSpaces 连线切换模型。",
      "C": "错。只有主 Region alias，无法真正双 Region HA。",
      "D": "✓ 正确。题库正解：connection alias 设定 + Route 53 failover + Evaluate Target Health。"
    },
    "diagram_before": "flowchart TB\n  WS[\"WorkSpaces PoC 成功\"]\n  R1[\"主 Region\"]\n  R2[\"Failover Region 已有 WS\"]\n  GAP{{\"缺口: 两 Region HA<br/>DNS 切换未完善\"}}\n  WS --> R1\n  R2 -.-> GAP\n  R1 -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  U[\"使用者连线名称\"] --> R53[\"Route 53 failover\"]\n  R53 -->|主| A1[\"Region A<br/>connection alias\"]\n  R53 -.->|备援| A2[\"Region B<br/>connection alias\"]\n  A1 --> DIR[\"本地 directory\"]\n  A2 --> DIR2[\"备援 directory\"]\n"
  },
  "487": {
    "blocker": "要盘点 on-prem 大量 VM 的迁移与相依性，需要在 Migration Hub 看清楚相依，并收集足够资料。",
    "requirements": "1) 收集伺服器资料；2) 看到应用相依；3) 支援迁移规划。",
    "steps": [
      "部署 Migration Evaluator Collector（或 Discovery 收集器）收集环境。",
      "在各 VM 安装 Application Discovery Agent 以抓程序/网路相依。",
      "资料汇入 Migration Hub。",
      "在主控台查看伺服器分组与相依关系图。"
    ],
    "solutions": "正确答案是 D。Collector + 各 VM Agent 才能兼顾盘点与应用层相依；只装一边资料不完整。",
    "result_flow": "Collector/Agent 收集 → Migration Hub 可视化相依 → 分批迁移规划。",
    "options": {
      "A": "错。只有 Agent 流程不完整。",
      "B": "错。只有 Collector 难见应用相依。",
      "C": "错。纯 agentless 相依可见度不足。",
      "D": "✓ 正确。Collector + Discovery Agent + Migration Hub 相依检视。"
    },
    "diagram_before": "flowchart TB\n  VM[\"on-prem 大量 VM\"]\n  DEP[\"应用相依不明\"]\n  MH[\"Migration Hub 待填\"]\n  GAP{{\"缺口: 盘点资料不完整<br/>无法分批规划\"}}\n  VM --> DEP --> MH\n  MH -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  COL[\"Migration Hub Collector\"] --> DATA[\"库存与基础资料\"]\n  AG[\"各 VM Agent\"] --> APP[\"应用层相依\"]\n  DATA --> MH[\"Migration Hub 可视化\"]\n  APP --> MH\n  MH --> PLAN[\"分批迁移规划\"]\n"
  },
  "488": {
    "blocker": "环境有 API Gateway 上的 API，也有地端 legacy API 在 EC2。要防护与监控：WAF 挡常见攻击、扫描旧 API 主机漏洞、侦测恶意行为。",
    "requirements": "1) 护 API Gateway；2) 分析 legacy 主机；3) 威胁监控。",
    "steps": [
      "用 AWS WAF 关联 API Gateway，挡 SQL injection 等。",
      "用 Amazon Inspector 扫描跑 legacy API 的 EC2。",
      "开 GuardDuty 做帐户/工作负载威胁侦测。",
      "三者分工，不把工具用错对象。"
    ],
    "solutions": "正确答案是 C。WAF→API Gateway、Inspector→EC2、GuardDuty→威胁监控，各司其职。",
    "result_flow": "外部请求 → WAF → API Gateway；EC2 legacy ← Inspector 扫漏洞；GuardDuty 持续监控异常。",
    "options": {
      "A": "错。WAF 不能直接那样护地端 EC2 API。",
      "B": "错。Inspector 不是拿来「分析 API Gateway API 层」当主手段。",
      "C": "✓ 正确。WAF 护 API Gateway，Inspector 扫 legacy EC2，GuardDuty 监控威胁。",
      "D": "错。工具职责对调/误解。"
    },
    "diagram_before": "flowchart TB\n  API[\"API Gateway API\"]\n  LEG[\"地端 legacy API on EC2\"]\n  THREAT[\"外部攻击与恶意行为\"]\n  GAP{{\"缺口: 缺 WAF/漏洞扫<br/>与威胁监控\"}}\n  THREAT --> API\n  THREAT --> LEG\n  API -.-> GAP\n  LEG -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  EXT[\"外部请求\"] --> WAF[\"AWS WAF\"]\n  WAF --> APIG[\"API Gateway\"]\n  EC2[\"EC2 legacy\"] --> INS[\"Inspector 扫漏洞\"]\n  GD[\"GuardDuty\"] --> MON[\"持续监控异常\"]\n"
  },
  "489": {
    "blocker": "Lambda 连 RDS 仍有连线与冷启动问题。要稳定连线池与降低冷启动。",
    "requirements": "1) 连线治理；2) 降低冷启动；3) 密码安全管理。",
    "steps": [
      "让 Lambda 透过 RDS Proxy endpoint 连资料库。",
      "资料库凭证放 Secrets Manager，由 Proxy/函数安全取用。",
      "对 Lambda 开 provisioned concurrency（预先备妥执行环境）。",
      "避免只靠加大 max_connections 或 reserved concurrency 限流。"
    ],
    "solutions": "正确答案是 B。RDS Proxy + Secrets Manager + provisioned concurrency 同时打连线与冷启动。",
    "result_flow": "请求 → 已预热 Lambda → RDS Proxy（Secrets 管理验证）→ RDS，连线被池化。",
    "options": {
      "A": "错。只优化连线重用通常不够。",
      "B": "✓ 正确。Proxy + Secrets Manager + provisioned concurrency。",
      "C": "错。硬加 max_connections、reserved concurrency 方向不对。",
      "D": "错。Reserved concurrency 是限额不是加速。"
    },
    "diagram_before": "flowchart TB\n  L[\"Lambda\"]\n  RDS[\"RDS\"]\n  COLD[\"冷启动慢\"]\n  CONN[\"连线不稳\"]\n  GAP{{\"缺口: 缺连线池<br/>与预热\"}}\n  L --> RDS\n  COLD --> GAP\n  CONN --> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  REQ[\"请求\"] --> L[\"Provisioned Concurrency<br/>预热 Lambda\"]\n  L --> PROXY[\"RDS Proxy\"]\n  PROXY --> SM[\"Secrets Manager 验证\"]\n  PROXY --> RDS[\"RDS 连线池化\"]\n"
  },
  "490": {
    "blocker": "VPC 里建了 interface VPC endpoint，但应用解析服务域名仍拿到公网 IP，流量没走 endpoint。",
    "requirements": "1) 私有 DNS 生效；2) 流量走 endpoint 弹性网卡。",
    "steps": [
      "到 VPC 设定检查 interface endpoint 的 Private DNS 是否启用。",
      "启用 Private DNS for interface endpoints。",
      "确认应用仍用官方服务 DNS 名称。",
      "解析应变为 endpoint 私有 IP。"
    ],
    "solutions": "正确答案是 B。Interface endpoint 要靠 Private DNS 把服务域名指到 endpoint。只改 route/SG 不解「仍解析成公网 IP」。",
    "result_flow": "应用查服务 DNS → Private DNS 回 endpoint 私有 IP → 流量走 interface endpoint 不经公网。",
    "options": {
      "A": "错。路由通常已处理，问题在 DNS。",
      "B": "✓ 正确。启用 Private DNS，让服务名解析到 endpoint。",
      "C": "错。SG 影响通不通，不是解析成公网 IP 的主因。",
      "D": "错。不必为此上自建 conditional forwarder。"
    },
    "diagram_before": "flowchart TB\n  APP[\"VPC 内应用\"]\n  DNS[\"解析服务域名\"]\n  PUB[\"拿到公网 IP\"]\n  EP[\"Interface endpoint 已建\"]\n  GAP{{\"缺口: 流量没走 endpoint\"}}\n  APP --> DNS --> PUB\n  EP -.-> GAP\n  PUB -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  APP[\"应用查服务 DNS\"] --> PDNS[\"启用 Private DNS\"]\n  PDNS --> IP[\"回 endpoint 私有 IP\"]\n  IP --> EP[\"Interface VPC endpoint\"]\n  EP --> SVC[\"AWS 服务私有路径\"]\n"
  },
  "491": {
    "blocker": "Java Lambda 冷启动慢，初始化逻辑很重。要最具成本效益地加速启动。",
    "requirements": "1) 降低冷启动；2) 成本效益；3) 初始化可重用。",
    "steps": [
      "把昂贵初始化留在 handler 外（执行环境重用时可保留）。",
      "发布 Lambda 版本。",
      "启用 SnapStart（对 Java 拍快照加速启动）。",
      "比较成本：通常低于长期大量 provisioned concurrency。"
    ],
    "solutions": "正确答案是 D。SnapStart 针对 Java 冷启动很划算；把初始化挪进 handler 反而更慢；长期 provisioned concurrency 较贵。",
    "result_flow": "部署 Java 版本 → SnapStart 快照含初始化状态 → 新环境从快照恢复 → 冷启动大幅缩短。",
    "options": {
      "A": "错。初始化放 handler 内每次更慢。",
      "B": "错。Alias+provisioned 成本通常高于 SnapStart。",
      "C": "错。纯 provisioned concurrency 持续计费较高。",
      "D": "✓ 正确。初始化在 handler 外 + 版本 + SnapStart，成本效益佳。"
    },
    "diagram_before": "flowchart TB\n  JAVA[\"Java Lambda\"]\n  INIT[\"初始化逻辑很重\"]\n  COLD[\"冷启动慢\"]\n  GAP{{\"缺口: 要具成本效益<br/>加速启动\"}}\n  JAVA --> INIT --> COLD\n  COLD -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  DEP[\"部署 Java 版本\"] --> SS[\"SnapStart 建立快照\"]\n  SS --> SNAP[\"含初始化状态\"]\n  NEW[\"新执行环境\"] --> SNAP\n  SNAP --> FAST[\"冷启动大幅缩短\"]\n"
  },
  "492": {
    "blocker": "用 VM Import 进 AMI 后在 public subnet 起 EC2（有公网 IP），但 Systems Manager 主控台看不到 managed instance。要选两项排查（依题库）。",
    "requirements": "1) 找出为何不是 managed instance；2) 依题库组合排查。",
    "steps": [
      "确认实例上 Systems Manager Agent 已安装且在跑。",
      "依题库再检查 Application Discovery Agent 相关设定（见注记）。",
      "同时理解实务上还常缺 IAM 角色与出网/endpoint，但本题标记为 A+D。",
      "修复后重新整理 Fleet Manager/SSM 主控台。"
    ],
    "solutions": "正确答案是 A 与 D（依题库）。实务上「SSM Agent + 适当 IAM instance profile」才是最常见正解（常选 A+B）；本题 correct_answers 为 A、D，作答跟题库，并知 Discovery Agent 与 SSM managed 无直接关系属争议点。",
    "result_flow": "EC2 开机 →（Agent 状态/题库所列检查）→ 通过后出现在 Systems Manager managed instances。",
    "options": {
      "A": "✓ 正确。确认 SSM Agent 安装并执行。",
      "B": "错（依题库未选）。实务常需要 IAM role，但本题不选。",
      "C": "错。public subnet 有公网 IP 时未必需要 VPC endpoint。",
      "D": "✓ 正确。题库要求检查 Application Discovery Agent 设定。",
      "E": "错。service-linked role 通常自动处理。"
    },
    "diagram_before": "flowchart TB\n  AMI[\"VM Import → AMI\"]\n  EC2[\"public subnet EC2<br/>有公网 IP\"]\n  SSM[\"Systems Manager 主控台\"]\n  GAP{{\"缺口: 看不到<br/>managed instance\"}}\n  AMI --> EC2\n  EC2 -.-> SSM\n  SSM -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  EC2[\"EC2 开机\"] --> CHK[\"检查 SSM Agent<br/>与题库所列项目\"]\n  CHK --> IAM[\"IAM / 连线条件\"]\n  IAM --> REG[\"注册成功\"]\n  REG --> MH[\"出现在 managed instances\"]\n"
  },
  "493": {
    "blocker": "要用现代化 CI/CD：测试、安全扫描、功能开关、人工核准再部署基础设施。",
    "requirements": "1) 建置测试扫描；2) 通知；3) 功能旗标；4) manual approval。",
    "steps": [
      "CodeBuild 跑单元测试与安全扫描。",
      "EventBridge/SNS 发通知。",
      "用 CDK 功能开关控制新功能暴露。",
      "Pipeline 加 manual approval 后再部署。"
    ],
    "solutions": "正确答案是 A。完整链覆盖测试、扫描、通知、旗标、人工核准。自管 Jenkins 或只 CodeDeploy 都不完整。",
    "result_flow": "提交程式 → CodeBuild 测/扫 → 通知 → 人工核准 → CDK/Pipeline 部署（功能开关控制流量）。",
    "options": {
      "A": "✓ 正确。CodeBuild + 通知 + CDK 旗标 + manual approval，一次满足。",
      "B": "错。Lambda/Amplify 组合不合基础设施全流程。",
      "C": "错。Jenkins 自管负担高。",
      "D": "错。CodeDeploy 不负责完整测试扫描链。"
    },
    "diagram_before": "flowchart TB\n  CODE[\"程式码提交\"]\n  TEST[\"测试与安全扫描缺失\"]\n  DEP[\"直接部署基础设施\"]\n  GAP{{\"缺口: 无功能开关<br/>与人工核准门槛\"}}\n  CODE --> TEST\n  TEST --> DEP\n  DEP -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  GIT[\"提交程式\"] --> CB[\"CodeBuild 测/扫\"]\n  CB --> N[\"通知\"]\n  N --> APPR[\"人工核准\"]\n  APPR --> PIPE[\"Pipeline / CDK 部署\"]\n  PIPE --> FF[\"功能开关控流量\"]\n"
  },
  "494": {
    "blocker": "地端应用需要 iSCSI 区块装置、低延迟快取，并用 AWS Backup 备份。",
    "requirements": "1) iSCSI；2) 快取模式低延迟；3) AWS Backup。",
    "steps": [
      "部署 Storage Gateway 的 Volume Gateway（区块磁碟区闸道）。",
      "使用 cached mode（热资料缓存在地端）。",
      "应用用 iSCSI 挂载。",
      "用 AWS Backup 备份 gateway volumes。"
    ],
    "solutions": "正确答案是 C。Volume Gateway cache mode 正好是 iSCSI + 低延迟热资料 + 可 Backup。Tape/File Gateway 介面不对。",
    "result_flow": "应用 iSCSI → Volume Gateway（cache）→ 后方 S3；AWS Backup 保护磁碟区。",
    "options": {
      "A": "错。Tape Gateway 不是 iSCSI 应用磁碟。",
      "B": "错。FSx/File 路径不是 iSCSI。",
      "C": "✓ 正确。Volume Gateway cache mode + AWS Backup。",
      "D": "错。File Gateway 是 NFS/SMB 不是 iSCSI。"
    },
    "diagram_before": "flowchart TB\n  APP[\"地端应用\"]\n  NEED[\"需要 iSCSI 区块\"]\n  CACHE[\"要低延迟快取\"]\n  GAP{{\"缺口: 介面不对<br/>且要 AWS Backup\"}}\n  APP --> NEED --> CACHE\n  CACHE -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  APP[\"应用 iSCSI\"] --> VG[\"Volume Gateway<br/>cache mode\"]\n  VG --> S3[\"后方 S3\"]\n  VG --> BAK[\"AWS Backup 保护磁碟区\"]\n  BAK --> OK[\"低延迟 + 可还原\"]\n"
  },
  "495": {
    "blocker": "资料要在多 Region 加解密，且希望金钥材料一致、管理简单。",
    "requirements": "1) 多 Region 可用同一逻辑金钥；2) 安全由 KMS 管。",
    "steps": [
      "建立 KMS multi-Region primary key。",
      "在其他 Region 建立 replica key。",
      "应用在各 Region 用当地 replica 加解密。",
      "避免每 Region 不同 CMK 导致密文无法互通。"
    ],
    "solutions": "正确答案是 A。Multi-Region keys 保证密文可跨 Region 用对应 replica 解密。ACM PCA 是凭证；汇出 key material 到 Parameter Store 不安全。",
    "result_flow": "Region A 用 multi-Region key 加密 → 资料到 Region B → 用 replica key 解密。",
    "options": {
      "A": "✓ 正确。KMS multi-Region primary + 各 Region replica。",
      "B": "错。各 Region 独立 key 密文不相通。",
      "C": "错。ACM/PCA 不解决资料密钥跨 Region。",
      "D": "错。汇出金钥材料不安全。"
    },
    "diagram_before": "flowchart TB\n  RA[\"Region A 加密\"]\n  RB[\"Region B 需解密\"]\n  KEY[\"金钥材料不一致\"]\n  GAP{{\"缺口: 跨 Region 解密<br/>管理要简单\"}}\n  RA -.-> RB\n  KEY --> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  A[\"Region A\"] -->|multi-Region key 加密| DATA[\"密文资料\"]\n  DATA --> B[\"Region B\"]\n  B --> RK[\"replica key 解密\"]\n  RK --> PLAIN[\"明文可用\"]\n"
  },
  "496": {
    "blocker": "ASG 实例启动后要从 S3 下载大量资料才就绪，但还没下完就被 ELB health check 判死、终止，形成循环。",
    "requirements": "1) 给足启动时间；2) 避免未就绪被砍。",
    "steps": [
      "找到 Auto Scaling 的 health check grace period。",
      "把宽限时间加长到超过 S3 下载+应用启动时间。",
      "宽限期内即使检查失败也不终止。",
      "就绪后再正常接受流量与健康检查。"
    ],
    "solutions": "正确答案是 D。Grace period 就是解决「启动慢被误杀」。换大机、改 ALB timeout、改 path 都不对根因。",
    "result_flow": "新实例启动 → grace period 内下载 S3 与初始化 → 完成后通过 health check → 稳定服务。",
    "options": {
      "A": "错。更大实例不保证下载策略正确。",
      "B": "错。ALB timeout 不解 ASG 终止循环。",
      "C": "错。改 path 若应用未就绪仍失败。",
      "D": "✓ 正确。加长 health check grace period。"
    },
    "diagram_before": "flowchart TB\n  ASG[\"ASG 新实例\"]\n  S3[\"从 S3 下载大量资料\"]\n  ELB[\"ELB health check\"]\n  GAP{{\"缺口: 未就绪被判死<br/>反复终止循环\"}}\n  ASG --> S3\n  ELB -->|过早失败| GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  NEW[\"新实例启动\"] --> GP[\"health check grace period\"]\n  GP --> DL[\"下载 S3 与初始化\"]\n  DL --> PASS[\"通过 health check\"]\n  PASS --> SVC[\"稳定加入服务\"]\n"
  },
  "497": {
    "blocker": "要把 Oracle 迁走，又要能用 foreign table 查地端剩余资料，并处理空间资料；用专线连地端。",
    "requirements": "1) 迁到合适引擎；2) foreign table；3) 经 Direct Connect。",
    "steps": [
      "目标选 Amazon RDS for PostgreSQL（支援 FDW 等扩展生态）。",
      "用 SCT/DMS 做结构与资料迁移。",
      "地端以 Direct Connect 连到 AWS。",
      "在 PostgreSQL 设 foreign table 查尚留在地端的资料。"
    ],
    "solutions": "正确答案是 D。PostgreSQL + FDW + DX 符合异质查询；DynamoDB 无 foreign table；自建 Oracle on EC2 管理重。",
    "result_flow": "应用 → RDS PostgreSQL（本地表 + foreign table）→ DX → 地端残留库；迁移期用 SCT/DMS。",
    "options": {
      "A": "错。DynamoDB 不支援 foreign table/空间场景。",
      "B": "错。SQL Server 非此 Oracle 迁移最佳搭配。",
      "C": "错。自管 Oracle + IGW 不符。",
      "D": "✓ 正确。RDS PostgreSQL + SCT/DMS + DX foreign table。"
    },
    "diagram_before": "flowchart TB\n  ORA[\"Oracle 要迁走\"]\n  REM[\"地端仍有残留资料\"]\n  GEO[\"空间资料需求\"]\n  GAP{{\"缺口: 要 foreign table<br/>查地端 + 专线\"}}\n  ORA --> REM\n  GEO -.-> GAP\n  REM -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  APP[\"应用\"] --> PG[\"RDS PostgreSQL\"]\n  PG --> LOCAL[\"本地表\"]\n  PG --> FDW[\"foreign table\"]\n  FDW -->|DX| ONP[\"地端残留库\"]\n  MIG[\"SCT / DMS 迁移期\"] -.-> PG\n"
  },
  "498": {
    "blocker": "CloudFormation 删 stack 时因 S3 bucket 非空而失败。要最小改动让删除能清掉物件。",
    "requirements": "1) 删 stack 成功；2) 清空 bucket；3) 最小变更。",
    "steps": [
      "加 Lambda-backed custom resource。",
      "在 stack 删除事件时列出并删除 bucket 物件（含版本）。",
      "再让 CloudFormation 删 bucket 与其他资源。",
      "避免大改成 EFS 等。"
    ],
    "solutions": "正确答案是 A。Custom resource 删前清空是常见手法。DeletionPolicy  alone 对非空 bucket 仍可能失败。",
    "result_flow": "Delete stack → custom resource Lambda 清空 S3 → CloudFormation 删除 bucket 成功。",
    "options": {
      "A": "✓ 正确。Lambda custom resource 在删除时清空物件。",
      "B": "错。DeletionPolicy Delete 遇非空常仍失败。",
      "C": "错。Snapshot 思维不适用要清空的 S3。",
      "D": "错。改 EFS 是大架构变更。"
    },
    "diagram_before": "flowchart TB\n  CFN[\"CloudFormation stack\"]\n  S3[\"S3 bucket 非空\"]\n  DEL[\"Delete stack\"]\n  GAP{{\"缺口: 删 bucket 失败<br/>stack 删除卡住\"}}\n  DEL --> S3\n  S3 -.-> GAP\n  CFN -.->|存在但未接上| GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff",
    "diagram_after": "flowchart TB\n  DEL[\"Delete stack\"] --> CR[\"Custom resource Lambda\"]\n  CR --> EMPTY[\"清空 S3 物件\"]\n  EMPTY --> CFN[\"CloudFormation 删 bucket\"]\n  CFN --> OK[\"删除成功\"]\n"
  },
  "499": {
    "blocker": "S3 成本偏高：有未完成 multipart、且 180 天后很少再存取。要选两项降成本。",
    "requirements": "1) 清 multipart 垃圾；2) 低频转储存类别。",
    "steps": [
      "设 lifecycle 中止未完成 multipart upload。",
      "对 180 天未再存取的物件转 Standard-IA（或同等低频层）。",
      "不要过早丢 Glacier 影响 180 天内存取。",
      "不要开 Transfer Acceleration 反而加钱。"
    ],
    "solutions": "正确答案是 C 与 E。清 multipart 与 180 天转 IA 精准对症。",
    "result_flow": "上传中断残留 → lifecycle 清除；物件满 180 天 → 转 Standard-IA → 月费下降。",
    "options": {
      "A": "错。Requester Pays 不解决储存费结构。",
      "B": "错。Transfer Acceleration 更贵。",
      "C": "✓ 正确。清未完成 multipart，避免幽灵储存费。",
      "D": "错。1 天就进 Glacier Instant 对 180 天内存取不友善。",
      "E": "✓ 正确。180 天后转 Standard-IA 降成本。"
    },
    "diagram_before": "flowchart TB\n  S3[\"S3 成本偏高\"]\n  MPU[\"未完成 multipart 残留\"]\n  COLD[\"180 天后很少存取\"]\n  GAP{{\"缺口: 无 lifecycle<br/>清残留与转层\"}}\n  MPU --> S3\n  COLD --> S3\n  S3 -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  MPU[\"中断 multipart\"] --> LC1[\"lifecycle 清除残留\"]\n  OBJ[\"物件满 180 天\"] --> LC2[\"转 Standard-IA\"]\n  LC1 --> SAVE[\"月费下降\"]\n  LC2 --> SAVE\n"
  },
  "500": {
    "blocker": "API Gateway + Lambda + RDS 电商要：防 Web 攻击、DB 成本优化、减冷启动。",
    "requirements": "1) WAF；2) DB 预留折扣；3) Lambda 预热。",
    "steps": [
      "CloudFront/API 前加 WAF。",
      "RDS 买 Reserved Instances 降稳定负载成本。",
      "Lambda 设 provisioned concurrency。",
      "避免不必要的 Shield Advanced 或把 OLTP 塞进 Redshift。"
    ],
    "solutions": "正确答案是 D。WAF + RI + provisioned concurrency 三点对齐。Shield Advanced 偏 DDoS 且贵；Redshift 不适合交易库。",
    "result_flow": "使用者 → WAF → API/Lambda（预热）→ RDS（RI 成本优化）。",
    "options": {
      "A": "错。加 timeout/Shield Advanced 不对症或过贵。",
      "B": "错。Redshift 非 OLTP；Inspector 非即时 WAF。",
      "C": "错。Aurora Serverless+Shield 组合不符成本/需求。",
      "D": "✓ 正确。WAF + RDS RI + Lambda provisioned concurrency。"
    },
    "diagram_before": "flowchart TB\n  API[\"API Gateway + Lambda\"]\n  RDS[\"RDS 电商库\"]\n  RISK[\"Web 攻击 / 冷启动 / 成本\"]\n  GAP{{\"缺口: 三点未同时治理\"}}\n  API --> RDS\n  RISK --> API\n  RISK -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  U[\"使用者\"] --> WAF[\"AWS WAF\"]\n  WAF --> API[\"API Gateway\"]\n  API --> L[\"Lambda 预热<br/>provisioned concurrency\"]\n  L --> RDS[\"RDS + Reserved Instances\"]\n"
  },
  "501": {
    "blocker": "ASG 要应付不可预测尖峰，但实例要跑 user data 安装才就绪。要又快又正确上线。",
    "requirements": "1) 动态扩展；2) 预热；3) 初始化完成才接流量。",
    "steps": [
      "使用 dynamic scaling 对应不可预测负载。",
      "建 warm pool（预热池）缩短从零开机时间。",
      "用 lifecycle hooks 等 user data 完成。",
      "完成后再进入服务/挂载目标群组。"
    ],
    "solutions": "正确答案是 D。Warm pool + lifecycle hooks + dynamic scaling 是经典。Predictive 较适合可预测；warmup 0 秒太激进。",
    "result_flow": "指标升高 → dynamic 扩展 → 从 warm pool 取实例 → lifecycle hook 跑完 user data → 接流量。",
    "options": {
      "A": "错。Predictive + warmup 0 不符不可预测与安装时间。",
      "B": "错。没 warm pool 仍慢。",
      "C": "错。Predictive 非首选。",
      "D": "✓ 正确。Dynamic + warm pool + lifecycle hooks。"
    },
    "diagram_before": "flowchart TB\n  ASG[\"ASG 不可预测尖峰\"]\n  UD[\"user data 安装才就绪\"]\n  SLOW[\"从冷启动太慢\"]\n  GAP{{\"缺口: 要又快又正确上线\"}}\n  ASG --> UD --> SLOW\n  SLOW -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  MET[\"指标升高\"] --> DYN[\"dynamic scaling\"]\n  DYN --> WP[\"从 warm pool 取实例\"]\n  WP --> LH[\"lifecycle hook<br/>跑完 user data\"]\n  LH --> TRAF[\"接流量\"]\n"
  },
  "502": {
    "blocker": "地端混有 SQL Server、MySQL、Oracle，有自订 schema 与 stored procedure，要迁到 RDS。题库选两项。",
    "requirements": "1) 分析/迁移程序；2) 搬资料到 RDS。",
    "steps": [
      "依题库：使用 Application Migration Service 分析来源库与 stored procedure（争议：实务多用 SCT）。",
      "使用 AWS DMS 把资料迁到 Amazon RDS。",
      "理解 SCT 常是分析 heterogeneous schema 的标准工具，但本题 correct_answers 为 B、D。",
      "迁移后验证程序与资料。"
    ],
    "solutions": "正确答案是 B 与 D（依题库）。业界更常选 SCT（分析）+ DMS（搬资料）。本题标记 Application Migration Service + DMS；作答跟题库，并知 MGN 主打主机迁移、SCT 才擅 schema/procedure 分析。",
    "result_flow": "来源多引擎库 →（题库）MGN 分析/DMS 搬迁 → Amazon RDS；再验证程序。",
    "options": {
      "A": "错。Migration Evaluator 不做 stored procedure 分析。",
      "B": "✓ 正确。题库：用 Application Migration Service 分析来源与程序。",
      "C": "错（依题库未选）。实务 SCT 很合适，但本题不选。",
      "D": "✓ 正确。DMS 迁移资料到 RDS。",
      "E": "错。DataSync 不是资料库迁移工具。"
    },
    "diagram_before": "flowchart TB\n  SQL[\"SQL Server\"]\n  MY[\"MySQL\"]\n  ORA[\"Oracle + SP/schema\"]\n  GAP{{\"缺口: 多引擎迁 RDS<br/>工具组合未定\"}}\n  SQL -.-> GAP\n  MY -.-> GAP\n  ORA -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  SRC[\"地端多引擎库\"] --> MGN[\"Application Migration Service\"]\n  SRC --> DMS[\"AWS DMS 搬资料\"]\n  MGN --> RDS[\"Amazon RDS\"]\n  DMS --> RDS\n  RDS --> VAL[\"验证程序与资料\"]\n"
  },
  "503": {
    "blocker": "部落格内容一天更新多次，现在在 NAS；已有 Site-to-Site VPN 与多 AZ EC2+ALB。还要尽快把 200TB 封存送 S3。题库选两项。",
    "requirements": "1) 内容持续更新不中断；2) 多实例共享内容；3) 200TB 尽快上云（题库组合）。",
    "steps": [
      "把 EFS 挂到地端当 NAS 角色，内容拷到 EFS，EC2 也挂同一 EFS 即时服务。",
      "依题库同时采用 EBS Multi-Attach 共享并周期同步 NAS（实务上 EFS 通常更贴 NFS 场景）。",
      "大封存另规划 Snow 系列装置搬运（选项 D 常合理，但题库选 B+C）。",
      "ALB 后多 AZ 实例都读共享档案系统。"
    ],
    "solutions": "正确答案是 B 与 C（依题库）。C 用 EFS 统一地端与云端内容合理；B 的 Multi-Attach+周同不少步。200TB 实务常加 Snowball（D），但题库组合是 B+C。",
    "result_flow": "作者更新 → EFS（地端与 EC2 共挂）→ ALB 服务读者；封存路径依题库未选 Snow。",
    "options": {
      "A": "错。每周 Lambda 同步太慢，内容一天多次更新。",
      "B": "✓ 正确。题库：EBS Multi-Attach 共享内容并与 NAS 同步。",
      "C": "✓ 正确。EFS 同时挂地端与 EC2，内容近即时。",
      "D": "未选。Snowball 搬 200TB 实务合理但非本题答案。",
      "E": "错。Snowcone 容量不够 200TB。"
    },
    "diagram_before": "flowchart TB\n  BLOG[\"部落格一天多次更新\"]\n  NAS[\"内容在 NAS\"]\n  VPN[\"已有 Site-to-Site VPN\"]\n  EC2[\"多 AZ EC2 + ALB\"]\n  GAP{{\"缺口: 云地共享内容<br/>与 200TB 封存路径\"}}\n  BLOG --> NAS\n  VPN --> EC2\n  NAS -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  AUTH[\"作者更新\"] --> EFS[\"EFS 统一内容\"]\n  ONP[\"地端路径\"] --> EFS\n  EC2[\"多 AZ EC2\"] --> EFS\n  ALB[\"ALB\"] --> EC2\n  U[\"读者\"] --> ALB\n"
  },
  "504": {
    "blocker": "Java/Tomcat 应用要上云，希望自动扩展、前面有 CDN/ALB、DB 用 PostgreSQL，改动少、营运轻。",
    "requirements": "1) 少改码；2) 自动扩展；3) 托管 DB。",
    "steps": [
      "用 Elastic Beanstalk 部署 Tomcat 应用。",
      "资料库用 RDS PostgreSQL。",
      "前面 CloudFront + ALB，Beanstalk 管扩展。",
      "避免重写成 Lambda 或自建大量 EC2/EKS。"
    ],
    "solutions": "正确答案是 D。Beanstalk 对传统 Java Web 最省事。重写 Python/Lambda 或上复杂 EKS 不符最少变更。",
    "result_flow": "使用者 → CloudFront → ALB/Beanstalk Tomcat 丛集 → RDS PostgreSQL。",
    "options": {
      "A": "错。自建 EC2+Step Functions 重。",
      "B": "错。EKS 跨 Region 过重。",
      "C": "错。重写语言/Lambda 改动大。",
      "D": "✓ 正确。Beanstalk Tomcat + RDS PostgreSQL + CloudFront/ALB。"
    },
    "diagram_before": "flowchart TB\n  JAVA[\"Java / Tomcat 应用\"]\n  NEED[\"要自动扩展 + CDN/ALB\"]\n  DB[\"PostgreSQL\"]\n  GAP{{\"缺口: 改动少、营运轻<br/>的上云路径\"}}\n  JAVA --> NEED --> DB\n  NEED -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  U[\"使用者\"] --> CF[\"CloudFront\"]\n  CF --> ALB[\"ALB\"]\n  ALB --> EB[\"Beanstalk Tomcat 丛集\"]\n  EB --> RDS[\"RDS PostgreSQL\"]\n"
  },
  "505": {
    "blocker": "物联网/报告平台要：长时间报告产生、装置资料收集、文件库从 MongoDB 迁出。选三项。",
    "requirements": "1) 报告编排；2) 装置连线；3) Mongo 相容托管。",
    "steps": [
      "用 Step Functions + Lambda 编排长报告，结果经 CloudFront 发布。",
      "装置用 AWS IoT Core 接入，规则触发 Lambda 处理。",
      "文件库迁到 DocumentDB（MongoDB 相容 API）。",
      "避免自管 Mongo on EC2 或过重 EKS。"
    ],
    "solutions": "正确答案是 A、D、E。Step Functions 长流程、IoT Core 装置、DocumentDB 少改 Mongo 应用。",
    "result_flow": "装置 → IoT Core → Lambda → DocumentDB；报告 → Step Functions/Lambda → S3/CloudFront。",
    "options": {
      "A": "✓ 正确。Step Functions/Lambda/CloudFront 处理报告。",
      "B": "错。自管排程连装置不如 IoT Core。",
      "C": "错。EKS 营运重。",
      "D": "✓ 正确。IoT Core + Lambda 收集资料。",
      "E": "✓ 正确。DocumentDB 取代 MongoDB。",
      "F": "错。自建 Mongo on EC2 负担高。"
    },
    "diagram_before": "flowchart TB\n  IOT[\"物联网装置资料\"]\n  RPT[\"长时间报告产生\"]\n  MONGO[\"MongoDB 文件库\"]\n  GAP{{\"缺口: 缺长流程编排<br/>装置接入与文件库迁移\"}}\n  IOT -.-> GAP\n  RPT -.-> GAP\n  MONGO -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  DEV[\"装置\"] --> IOT[\"IoT Core\"]\n  IOT --> L[\"Lambda\"]\n  L --> DOC[\"DocumentDB\"]\n  RPT[\"报告\"] --> SF[\"Step Functions\"]\n  SF --> OUT[\"S3 / CloudFront 发布\"]\n"
  },
  "506": {
    "blocker": "Production stage 的 API 被过度呼叫，要限流与配额，最好用 API Gateway 原生机制。",
    "requirements": "1) 限速；2) 配额；3) 绑 Production stage。",
    "steps": [
      "建立 API key。",
      "建立 usage plan，设定 throttle 与 quota。",
      "把 usage plan 关联到 Production stage 与 API key。",
      "客户带 key 呼叫，超出被拒。"
    ],
    "solutions": "正确答案是 D。Usage plan + API key 是 API Gateway 标准用量控制。SQS 改架构过重；provisioned concurrency 是加速不是限流。",
    "result_flow": "客户带 API key → API Gateway usage plan 检查配额/速率 → 通过才到后端。",
    "options": {
      "A": "错。加 SQS 改整合方式过重。",
      "B": "错。Provisioned concurrency 不限制客户用量。",
      "C": "错。WAF rate 可辅，但不如 usage plan 精细管配额。",
      "D": "✓ 正确。API key + usage plan 绑 Production stage。"
    },
    "diagram_before": "flowchart TB\n  CLI[\"客户\"]\n  API[\"API Gateway Production\"]\n  BACK[\"后端\"]\n  GAP{{\"缺口: 被过度呼叫<br/>无限速与配额\"}}\n  CLI --> API --> BACK\n  API -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  CLI[\"客户带 API key\"] --> GW[\"API Gateway\"]\n  GW --> UP[\"Usage plan<br/>throttle + quota\"]\n  UP -->|通过| BACK[\"后端\"]\n  UP -->|超限| DENY[\"拒绝 / 429\"]\n"
  },
  "507": {
    "blocker": "应用要在 EC2 上像本地档一样读最新定价档，档实际在 S3，希望少中介、常新。",
    "requirements": "1) POSIX 式存取 S3；2) 读到最新物件；3) 少自建同步。",
    "steps": [
      "在 AMI/实例安装 Mountpoint for Amazon S3。",
      "把定价 bucket 挂成本地路径。",
      "应用直接读挂载路径取得最新物件。",
      "避免 DynamoDB 改逻辑或手动拷 EBS。"
    ],
    "solutions": "正确答案是 C。Mountpoint for S3 让应用几乎零改码读 S3 最新物件。",
    "result_flow": "S3 更新定价物件 → EC2 Mountpoint 路径立即可见 → 应用读取。",
    "options": {
      "A": "错。DynamoDB 要改应用且不适档案模型。",
      "B": "错。EFS+Lambda 同步多一跳延迟与复杂度。",
      "C": "✓ 正确。Mountpoint for S3 直接挂定价 bucket。",
      "D": "错。EBS Multi-Attach 仍要自己更新档案。"
    },
    "diagram_before": "flowchart TB\n  APP[\"EC2 应用\"]\n  NEED[\"像本地档读定价\"]\n  S3[\"实际在 S3\"]\n  GAP{{\"缺口: 要 POSIX 式<br/>常新且少中介\"}}\n  APP --> NEED\n  S3 -.-> GAP\n  NEED -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  S3[\"S3 更新定价物件\"] --> MP[\"Mountpoint for S3\"]\n  MP --> PATH[\"EC2 本地挂载路径\"]\n  PATH --> APP[\"应用直接读取\"]\n  APP --> LATEST[\"读到最新物件\"]\n"
  },
  "508": {
    "blocker": "QA 只能启动「已核准」的资源组合，不能拿到主管那般广权限。已有 CloudFormation 模板。",
    "requirements": "1) 最小权限；2) 只能用核准产品；3) 用既有角色启动。",
    "steps": [
      "把模板做成 Service Catalog 产品。",
      "Launch constraint 指定用既有合格角色启动。",
      "只授 QA Service Catalog 相关 API。",
      "QA 从目录启动，无法任意开未核准资源。"
    ],
    "solutions": "正确答案是 B。Service Catalog 是自助但受控的标准。让 QA assume 主管角色等于放权。",
    "result_flow": "QA → Service Catalog 启动产品 → launch constraint 用受控角色 → CloudFormation 建核准资源。",
    "options": {
      "A": "错。Assume 主管角色权限过大。",
      "B": "✓ 正确。Service Catalog 产品 + launch constraint + 最小 SC 权限。",
      "C": "错。直接给 CFN/S3 仍太宽。",
      "D": "错。Beanstalk 不能直接当任意模板目录。"
    },
    "diagram_before": "flowchart TB\n  QA[\"QA 团队\"]\n  CFN[\"已有 CloudFormation 模板\"]\n  WIDE[\"不能拿主管广权限\"]\n  GAP{{\"缺口: 只能启动<br/>已核准资源组合\"}}\n  QA --> CFN\n  WIDE --> GAP\n  QA -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  QA[\"QA\"] --> SC[\"Service Catalog 产品\"]\n  SC --> LC[\"launch constraint<br/>受控角色\"]\n  LC --> CFN[\"CloudFormation\"]\n  CFN --> RES[\"只建核准资源\"]\n"
  },
  "509": {
    "blocker": "电商单 Region：ALB+EC2、DynamoDB、Route 53、ACM 凭证。要第二 Region 做 DR/成长/就近存取，行政负担低。选三项（含题库 F）。",
    "requirements": "1) 一键式复制 infra；2) 多 Region 资料；3) 流量路由（题库组合）。",
    "steps": [
      "用参数化 CloudFormation 模板在第二 Region 部署同等堆叠。",
      "既有 DynamoDB 开 Streams 并做成 global table 加第二 Region。",
      "依题库亦包含：新建表+Streams+global table 再一次性拷资料（选项 F）。",
      "DNS 层可用 latency 等策略（选项 D 合理，但题库答案为 A/E/F）。"
    ],
    "solutions": "正确答案是 A、E、F（依题库）。A 用 CloudFormation 降行政负担正确；E/F 在真实选择题通常二择一做 global table，题库同时收录。实务优先在现有表启用 global table（E）。",
    "result_flow": "CFN 在 Region2 起 ALB/EC2 → DynamoDB global table 双写/复写 → 使用者可被导到较近/备援 Region。",
    "options": {
      "A": "✓ 正确。参数化 CloudFormation 部署第二 Region，负担低。",
      "B": "错。主控台手工文件化易错且重。",
      "C": "错。题库未选 weighted 50/50。",
      "D": "未选。Latency routing 实务很好但非本题答案。",
      "E": "✓ 正确。既有表启用 Streams 成 global table 加第二 Region。",
      "F": "✓ 正确。题库：新建表+Streams+global table 并一次性拷贝资料。"
    },
    "diagram_before": "flowchart TB\n  R1[\"单 Region 电商\"]\n  ALB[\"ALB + EC2\"]\n  DDB[\"DynamoDB\"]\n  R53[\"Route 53 / ACM\"]\n  GAP{{\"缺口: 无第二 Region<br/>DR/就近/低行政负担\"}}\n  R1 --> ALB --> DDB\n  R53 --> ALB\n  R1 -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  CFN[\"参数化 CloudFormation\"] --> R2[\"Region2 ALB/EC2\"]\n  DDB[\"DynamoDB\"] --> GT[\"Global Tables 复写\"]\n  GT --> R2\n  U[\"使用者\"] --> DNS[\"导流较近/备援 Region\"]\n  DNS --> R2\n"
  },
  "510": {
    "blocker": "共用 S3 要让每人只能碰自己 username 前缀的物件，并要能稽核物件存取、用 Athena 出报告。",
    "requirements": "1) 前缀级隔离；2) 资料事件稽核；3) Athena 分析。",
    "steps": [
      "Permission set/IAM 条件用 ${aws:PrincipalTag/userName} 限制 s3 prefix。",
      "开 CloudTrail data events 记录 S3 物件级 API。",
      "日志进 S3，用 Athena 查询产报告。",
      "不要只开 management events（看不到 GetObject 细节）。"
    ],
    "solutions": "正确答案是 A 与 C。PrincipalTag 条件控 prefix；CloudTrail data events + Athena 做稽核报表。",
    "result_flow": "使用者操作自己 prefix → IAM 条件放行 → CloudTrail data events 记录 → Athena 报告。",
    "options": {
      "A": "✓ 正确。用 username 标签条件限制个人 prefix。",
      "B": "错。共用读写角色无法个人隔离。",
      "C": "✓ 正确。CloudTrail 资料事件 + Athena 报告。",
      "D": "错。Management events 不够细。",
      "E": "错。EMRFS 日志不适用一般情境。"
    },
    "diagram_before": "flowchart TB\n  S3[\"共用 S3\"]\n  USERS[\"多人存取\"]\n  AUDIT[\"需物件级稽核报告\"]\n  GAP{{\"缺口: 无 username 前缀隔离<br/>与 Athena 稽核\"}}\n  USERS --> S3\n  S3 --> AUDIT\n  AUDIT -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  U[\"使用者操作自己 prefix\"] --> IAM[\"PrincipalTag 条件放行\"]\n  IAM --> S3[\"S3 物件\"]\n  S3 --> CT[\"CloudTrail data events\"]\n  CT --> ATH[\"Athena 产稽核报告\"]\n"
  },
  "511": {
    "blocker": "处理任务可跑到 2 小时，要依档案类型选不同容器映像，用 Fargate 跑。输入希望用事件驱动。",
    "requirements": "1) 长任务；2) 依类型选容器；3) 少管伺服器。",
    "steps": [
      "输入放到 S3，设定事件通知。",
      "Lambda 被触发后依物件属性选择容器映像/任务定义。",
      "启动 ECS Fargate 任务跑最长可超 15 分的处理。",
      "不要用只能 15 分钟的 Lambda 当主处理器。"
    ],
    "solutions": "正确答案是 C。S3→Lambda（路由）→Fargate（长工）是标准。EFS 无原生等同 S3 的事件模型；纯 Lambda 超时。",
    "result_flow": "档案进 S3 → Lambda 判断类型 → 启动对应 Fargate 任务 → 跑完写回结果。",
    "options": {
      "A": "错。EFS 不支援这类事件通知模型。",
      "B": "错。无 EFS event notification 这条路。",
      "C": "✓ 正确。S3 事件 + Lambda 选容器 + Fargate 执行。",
      "D": "错。Lambda 上限 15 分钟，跑不了 2 小时。"
    },
    "diagram_before": "flowchart TB\n  FILE[\"多类型档案\"]\n  TASK[\"处理可达 2 小时\"]\n  NEED[\"依类型选容器\"]\n  GAP{{\"缺口: 长任务 + 事件驱动<br/>Fargate 路由未建\"}}\n  FILE --> TASK --> NEED\n  NEED -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  S3[\"档案进 S3\"] -->|事件| L[\"Lambda 判断类型\"]\n  L --> FG[\"启动对应 Fargate 任务\"]\n  FG --> RUN[\"长时间处理\"]\n  RUN --> OUT[\"结果写回\"]\n"
  },
  "512": {
    "blocker": "媒体资产在地端，MAM 系统要继续用档案介面；希望上云后用 Rekognition 丰富 metadata，改动要小。",
    "requirements": "1) 地端档案介面保留；2) 自动影像/影片分析；3) metadata 回写。",
    "steps": [
      "地端部署 S3 File Gateway，既有路径写入即进 S3。",
      "S3 事件触发 Lambda。",
      "Lambda 呼叫 Rekognition collection/分析。",
      "把标签/metadata 写回系统可读位置。"
    ],
    "solutions": "正确答案是 A。File Gateway 对 MAM 侵入最小；Tape/Kinesis Video/自管 OpenCV 都更重。",
    "result_flow": "MAM 写档 → File Gateway → S3 → Lambda → Rekognition → metadata 回写。",
    "options": {
      "A": "✓ 正确。File Gateway + Rekognition + Lambda 回写 metadata。",
      "B": "错。Tape Gateway 模型不适合互动式 MAM。",
      "C": "错。Kinesis Video 要大改整合。",
      "D": "错。自管 EC2+OpenCV 负担高。"
    },
    "diagram_before": "flowchart TB\n  MAM[\"地端 MAM 系统\"]\n  FILE[\"档案介面媒体资产\"]\n  META[\"metadata 要更丰富\"]\n  GAP{{\"缺口: 上云后 Rekognition<br/>且改动要小\"}}\n  MAM --> FILE --> META\n  META -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  MAM[\"MAM 写档\"] --> FG[\"S3 File Gateway\"]\n  FG --> S3[\"S3\"]\n  S3 --> L[\"Lambda\"]\n  L --> REK[\"Rekognition 分析\"]\n  REK --> META[\"metadata 回写\"]\n"
  },
  "513": {
    "blocker": "多帐户要买 Savings Plans/折扣，涵盖 EC2 与 serverless，三年期，平衡现金流。",
    "requirements": "1) 覆盖 EC2；2) 覆盖 Lambda 等；3) 3 年 No Upfront。",
    "steps": [
      "在管理帐户统一购买。",
      "买 3 年 EC2 Instance Savings Plan 锁定实例家族折扣。",
      "再买 3 年 Compute Savings Plan（No Upfront）覆盖 Lambda/Fargate/跨家族弹性。",
      "避免各帐户零散购买。"
    ],
    "solutions": "正确答案是 C。EC2 Instance SP + Compute SP 组合覆盖面完整；No Upfront 顾现金流。",
    "result_flow": "用量发生 → 先套用 SP 折扣（EC2 Instance SP / Compute SP）→ 帐单降低。",
    "options": {
      "A": "错。纯 RI All Upfront 弹性差且难盖 serverless。",
      "B": "错。1 年折扣通常不如 3 年。",
      "C": "✓ 正确。管理帐户 3 年 EC2 Instance SP + Compute SP（No Upfront）。",
      "D": "错。各帐户自买管理乱。"
    },
    "diagram_before": "flowchart TB\n  EC2[\"EC2 用量\"]\n  SVL[\"Lambda / serverless\"]\n  BILL[\"三年期要折扣\"]\n  GAP{{\"缺口: 覆盖面不全<br/>或现金流压力\"}}\n  EC2 --> BILL\n  SVL --> BILL\n  BILL -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  USE[\"用量发生\"] --> SP1[\"EC2 Instance SP<br/>3 年\"]\n  USE --> SP2[\"Compute SP<br/>3 年 No Upfront\"]\n  SP1 --> SAVE[\"帐单降低\"]\n  SP2 --> SAVE\n"
  },
  "514": {
    "blocker": "全球静态内容：客户在自己 AWS 帐户消费；公司用 S3 File Gateway 上传。要就近服务客户，且地上传路径低延迟、不走公网。题库选两项。",
    "requirements": "1) 就近读取；2) 上传私有低延迟；3) 少营运。",
    "steps": [
      "依题库：用 Lambda 追踪/路由客户到各 Region。",
      "用 PrivateLink + Direct Connect 接到 Multi-Region Access Point 路径，避免公网。",
      "实务上 MRAP（选项 A）常是更少营运的就近读取方案，但题库选 C+E。",
      "避免 Site-to-Site VPN 走公网。"
    ],
    "solutions": "正确答案是 C 与 E（依题库）。E 的 PrivateLink+DX 连 MRAP 符合「不走公网」；C 用 Lambda 路由营运较 MRAP 原生高。作答跟题库。",
    "result_flow": "地端 → DX/PrivateLink → MRAP/S3 多 Region；客户请求 →（题库）Lambda 路由逻辑 → 近处副本。",
    "options": {
      "A": "未选。MRAP 实务很合适但非题库答案。",
      "B": "错。只有 CRR 没有路由层不够。",
      "C": "✓ 正确。题库：Lambda 追踪客户路由到 Region。",
      "D": "错。VPN 走公网违规。",
      "E": "✓ 正确。PrivateLink + Direct Connect 连 Multi-Region Access Point。"
    },
    "diagram_before": "flowchart TB\n  GW[\"S3 File Gateway 上传\"]\n  S3[\"多 Region 静态内容\"]\n  CUST[\"客户在自己 AWS 帐户读\"]\n  GAP{{\"缺口: 就近读取<br/>上传要不走公网\"}}\n  GW --> S3\n  CUST -.-> S3\n  S3 -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  ONP[\"地端上传\"] -->|DX + PrivateLink| MRAP[\"MRAP / 多 Region S3\"]\n  CUST[\"客户请求\"] --> L[\"Lambda 路由逻辑\"]\n  L --> NEAR[\"近处 Region 副本\"]\n  NEAR --> OK[\"就近服务\"]\n"
  },
  "515": {
    "blocker": "大量 VM 与档案要尽快迁，地端合规限制不能在每台 hypervisor 乱装软体。要组合工具。",
    "requirements": "1) 大量 VM；2) 档案资料；3) 合规限制下尽快。",
    "steps": [
      "在 Migration Hub 建 portfolio 管迁移。",
      "用 Snowcone 等装置搬大量档案/离线资料。",
      "用 Application Migration Service 做主机复制迁移。",
      "避免逐台 VM Import 或每 hypervisor 强制 agent 违规。"
    ],
    "solutions": "正确答案是 C。Migration Hub + Snowcone + MGN 能同时覆盖规划、大量资料、VM 迁移。",
    "result_flow": "盘点进 Migration Hub → Snow 运档案/资料 → MGN 复制 VM → 切换上云。",
    "options": {
      "A": "错。VM Import/Export 逐台太慢。",
      "B": "错。只有 Discovery 不迁移。",
      "C": "✓ 正确。Migration Hub + Snowcone + Application Migration Service。",
      "D": "错。每 hypervisor 装 agent 可能违规。"
    },
    "diagram_before": "flowchart TB\n  VM[\"大量 VM\"]\n  FILE[\"大量档案\"]\n  COMP[\"合规: 不能乱装 hypervisor 软体\"]\n  GAP{{\"缺口: 尽快迁移的<br/>工具组合未定\"}}\n  VM --> COMP\n  FILE --> COMP\n  COMP -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  INV[\"盘点\"] --> MH[\"Migration Hub\"]\n  FILE[\"档案/资料\"] --> SNOW[\"Snowcone 搬运\"]\n  VM[\"VM\"] --> MGN[\"Application Migration Service\"]\n  SNOW --> AWS[\"上云\"]\n  MGN --> AWS\n"
  },
  "516": {
    "blocker": "要在组织范围用 SQL 查 CloudTrail 历史，集中在委派管理员。",
    "requirements": "1) 全帐户事件；2) SQL 查询；3) 委派管理。",
    "steps": [
      "在委派管理员帐户操作。",
      "建立 CloudTrail Lake event data store。",
      "启用组织内所有帐户事件。",
      "用 Lake 的 SQL 查询介面分析。"
    ],
    "solutions": "正确答案是 B。CloudTrail Lake 原生 SQL + organization 范围。Event history 只有 90 天且非 SQL 仓储。",
    "result_flow": "各帐户 API 活动 → CloudTrail Lake data store → 委派管理员 SQL 查询。",
    "options": {
      "A": "错。CloudWatch Logs 不适合作组织级 SQL 稽核仓。",
      "B": "✓ 正确。委派帐户建 CloudTrail Lake，涵盖所有帐户。",
      "C": "错。Event history 功能不足。",
      "D": "错。StackSets 逐户部署更重。"
    },
    "diagram_before": "flowchart TB\n  ORG[\"组织多帐户\"]\n  CT[\"CloudTrail 事件分散\"]\n  SQL[\"要 SQL 查历史\"]\n  GAP{{\"缺口: 无组织范围<br/>Lake + 委派管理\"}}\n  ORG --> CT --> SQL\n  SQL -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  API[\"各帐户 API 活动\"] --> LAKE[\"CloudTrail Lake<br/>event data store\"]\n  LAKE --> DEL[\"委派管理员\"]\n  DEL --> SQL[\"原生 SQL 查询\"]\n  SQL --> HIST[\"历史稽核洞察\"]\n"
  },
  "517": {
    "blocker": "HTTP API 要接公司既有第三方 OAuth IdP，应用传 token，API Gateway 要验证。",
    "requirements": "1) 第三方 IdP；2) 验证 access token；3) 保护 API。",
    "steps": [
      "整合第三方 IdP 发 token 的流程。",
      "在 API Gateway 设定 Lambda authorizer。",
      "Authorizer 向 IdP/用金钥验证 token。",
      "通过才转发到后端。"
    ],
    "solutions": "正确答案是 A。Lambda authorizer 是 HTTP API 接外部 OAuth 的弹性作法。",
    "result_flow": "客户端带 OAuth token → API Gateway → Lambda authorizer 验 token → 允许则到集成。",
    "options": {
      "A": "✓ 正确。第三方 IdP + Lambda authorizer 验 token。",
      "B": "错。Directory Service 不是这题 OAuth 解法。",
      "C": "错。IAM Identity Center 不直接当此 HTTP API OAuth。",
      "D": "错。IAM user 参数不是 OAuth。"
    },
    "diagram_before": "flowchart TB\n  APP[\"应用带 OAuth token\"]\n  API[\"HTTP API Gateway\"]\n  IDP[\"第三方 OAuth IdP\"]\n  GAP{{\"缺口: API 未验证<br/>外部 access token\"}}\n  APP --> API\n  IDP -.-> GAP\n  API -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  CLI[\"客户端 OAuth token\"] --> GW[\"API Gateway\"]\n  GW --> AUTH[\"Lambda authorizer\"]\n  AUTH -->|验 token| IDP[\"第三方 IdP / 金钥\"]\n  AUTH -->|允许| INT[\"后端集成\"]\n"
  },
  "518": {
    "blocker": "要确保 EBS 加密：已有未加密磁碟要修，新建预设要加密。",
    "requirements": "1) 修现有；2) 预防新建；3) 自动化。",
    "steps": [
      "开 AWS Config 规则侦测未加密 EBS。",
      "设定自动修复（或 SSM 自动化）处理违规。",
      "帐户启用 EBS encryption by default。",
      "之后新建磁碟自动加密。"
    ],
    "solutions": "正确答案是 D。Config 管存量，预设加密管增量。只靠 KMS deny 或手动 Fleet Manager 不够完整。",
    "result_flow": "新建 EBS → 预设加密；存量未加密 → Config 发现 → 自动修复流程。",
    "options": {
      "A": "错。KMS deny 无法完善强制所有建卷路径。",
      "B": "错。Fleet Manager 手动列出不够持续。",
      "C": "错。非持续自动监控。",
      "D": "✓ 正确。Config 自动修复 + EBS 预设加密。"
    },
    "diagram_before": "flowchart TB\n  OLD[\"既有未加密 EBS\"]\n  NEW[\"新建磁碟\"]\n  POL[\"加密合规要求\"]\n  GAP{{\"缺口: 存量未修<br/>增量未预设加密\"}}\n  POL --> OLD\n  POL --> NEW\n  OLD -.-> GAP\n  NEW -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  NEW[\"新建 EBS\"] --> DEF[\"encryption by default\"]\n  OLD[\"存量未加密\"] --> CFG[\"AWS Config 规则\"]\n  CFG --> FIX[\"自动修复 / SSM\"]\n  DEF --> OK[\"全量加密合规\"]\n  FIX --> OK\n"
  },
  "519": {
    "blocker": "要在服务配额使用到 80% 时 SNS 通知，用 CloudWatch 原生指标。",
    "requirements": "1) 监控配额使用率；2) 80% 警报；3) SNS。",
    "steps": [
      "在 CloudWatch 找 AWS/Usage 命名空间。",
      "选对应服务配额使用率指标。",
      "建警报：超过 80% 触发。",
      "动作设 SNS 通知。"
    ],
    "solutions": "正确答案是 B。AWS/Usage 就是配额使用监控的正确来源。Sample Count 或 Config 都不精准。",
    "result_flow": "API 用量上升 → AWS/Usage 指标 → 80% 警报 → SNS 通知申请提额。",
    "options": {
      "A": "错。Sample Count 不是配额使用率。",
      "B": "✓ 正确。CloudWatch AWS/Usage 监控配额，80% SNS。",
      "C": "错。自写 Lambda 轮询较重。",
      "D": "错。Config 非即时配额百分比。"
    },
    "diagram_before": "flowchart TB\n  API[\"服务 API 用量\"]\n  QUOTA[\"服务配额上限\"]\n  RISK[\"接近上限无预警\"]\n  GAP{{\"缺口: 到 80% 未警报<br/>无法提前提额\"}}\n  API --> QUOTA --> RISK\n  RISK -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  USE[\"API 用量上升\"] --> NS[\"CloudWatch AWS/Usage\"]\n  NS --> AL[\"80% 使用率警报\"]\n  AL --> SNS[\"SNS 通知\"]\n  SNS --> ASK[\"申请提高配额\"]\n"
  },
  "520": {
    "blocker": "要自动扫 Lambda 与 layer 的 CVE，部分函数还要程式码扫描侦测外泄，且能排除不需扫的函数。选三项。",
    "requirements": "1) CVE 扫描；2) 程式码扫描；3) 排除标签。",
    "steps": [
      "启用 Amazon Inspector。",
      "打开 Lambda standard scanning 与 Lambda code scanning。",
      "对不需程式码扫描的函数打 InspectorCodeExclusion=LambdaCodeScanning 标签。",
      "不要用 GuardDuty 当 CVE 扫描器。"
    ],
    "solutions": "正确答案是 A、B、E。Inspector 覆盖 CVE 与 code scanning，标签排除子集。",
    "result_flow": "部署 Lambda/layer → Inspector 标准扫 CVE → 未排除者再 code scan → 产出漏洞报告。",
    "options": {
      "A": "✓ 正确。启用 Inspector 做 CVE 扫描。",
      "B": "✓ 正确。启用 Lambda 标准与程式码扫描。",
      "C": "错。GuardDuty 偏威胁不是 CVE/code scan。",
      "D": "错。Lambda Monitor 设定不是控制方式。",
      "E": "✓ 正确。打 InspectorCodeExclusion 排除不需 code scan 的函数。",
      "F": "错。不扫 S3 里 zip 当已部署函数替代。"
    },
    "diagram_before": "flowchart TB\n  L[\"Lambda 与 layer\"]\n  CVE[\"可能有 CVE\"]\n  CODE[\"部分要扫外泄\"]\n  GAP{{\"缺口: 无自动扫描<br/>与排除机制\"}}\n  L --> CVE\n  CODE -.-> GAP\n  CVE -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  DEP[\"部署 Lambda/layer\"] --> INS[\"Inspector 标准扫 CVE\"]\n  INS --> CODE[\"未排除者 code scan\"]\n  TAG[\"Exclusion 标签\"] -.-> CODE\n  CODE --> RPT[\"漏洞报告\"]\n"
  },
  "521": {
    "blocker": "应用帐户 EC2 以前经 NAT 上网打 patch；核心帐户私有 VPC 有 patch 来源库。现在要：应用帐户实例完全不能上公网，但要能碰 S3、Systems Manager，以及核心帐户 patch repo。",
    "requirements": "1) 无公网；2) 私有存取 S3/SSM；3) 连核心 patch 库。",
    "steps": [
      "在应用 VPC 建 Systems Manager 与 S3 的 VPC endpoints。",
      "删除 NAT gateway，切断预设上网。",
      "与核心帐户私有 VPC 建 VPC peering。",
      "更新两边路由，让 patch 流量走 peering。"
    ],
    "solutions": "正确答案是 C。Endpoint 取代 NAT 上 AWS API；peering 连 patch repo。自建 VPN/NACL 花拳绣腿；Private VIF 是 DX 概念。",
    "result_flow": "Patch Manager → 经 SSM endpoint 管实例 → 实例经 peering 拉核心 repo；应用资料走 S3 endpoint，全程无 NAT/公网。",
    "options": {
      "A": "错。自建 VPN + NACL 复杂且不完整。",
      "B": "错。Private VIF 不适用此帐户间场景。",
      "C": "✓ 正确。SSM/S3 endpoints + 删 NAT + peering 到核心帐户。",
      "D": "错。TGW 更贵，NACL 方向也不对症。"
    },
    "diagram_before": "flowchart TB\n  APP[\"应用帐户 EC2\"]\n  NAT[\"经 NAT 上网打 patch\"]\n  CORE[\"核心帐户 patch 库\"]\n  GAP{{\"缺口: 要禁公网<br/>仍能碰 S3/SSM/patch\"}}\n  APP --> NAT\n  CORE -.-> GAP\n  NAT -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  EC2[\"应用 EC2 无公网\"] --> EP[\"SSM + S3 VPC endpoints\"]\n  EC2 --> PEER[\"VPC peering\"]\n  PEER --> REPO[\"核心帐户 patch repo\"]\n  EP --> S3[\"S3 / SSM 私有存取\"]\n  PM[\"Patch Manager\"] --> EP\n"
  },
  "522": {
    "blocker": "美国公司五个 us-east-2 VPC 的微服务，只要能连欧洲一个 eu-west-1 VPC，不能连到其他欧洲 VPC。CIDR 不重叠，要最省。",
    "requirements": "1) 五对一互通；2) 不随意全网全通；3) 成本最低。",
    "steps": [
      "为每个 us-east-2 VPC 建一条到 eu-west-1 目标 VPC 的 VPC peering。",
      "只在需要的路由表加对应路由。",
      "不要 full mesh，也不要双 Region TGW（更贵）。",
      "共 5 条 peering 完成最小连线。"
    ],
    "solutions": "正确答案是 D。五条点对点 peering 最便宜且精准。TGW 跨 Region 成本高；full mesh 连太多。",
    "result_flow": "us-east-2 VPC1..5 各自 peering → eu-west-1 指定 VPC；路由仅放行这五条路径。",
    "options": {
      "A": "错。单一 Region TGW 连不了另一 Region VPC。",
      "B": "错。双 TGW+peering 成本高。",
      "C": "错。Full mesh 远超需求。",
      "D": "✓ 正确。五条 VPC peering 到欧洲目标 VPC，最省。"
    },
    "diagram_before": "flowchart TB\n  US[\"5 个 us-east-2 VPC\"]\n  EU1[\"eu-west-1 目标 VPC\"]\n  EUX[\"其他欧洲 VPC\"]\n  GAP{{\"缺口: 只要五对一<br/>最省且不乱通\"}}\n  US -.-> EU1\n  US -.-> EUX\n  US -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  V1[\"us VPC1\"] -->|peering| EU[\"eu-west-1 指定 VPC\"]\n  V2[\"us VPC2..5\"] -->|各一条 peering| EU\n  RT[\"路由表只放行五条\"] --> EU\n  NOTE[\"无 full mesh / 无双 TGW\"] -.-> RT\n"
  },
  "523": {
    "blocker": "SES 寄信要记 log 以便排查投递，且能依收件人、主旨、时间搜寻。选两项。",
    "requirements": "1) SES 投递日志；2) 可搜寻栏位；3) 可分析。",
    "steps": [
      "建 SES configuration set，目的地用 Data Firehose 写入 S3。",
      "日志落地 S3 后用 Athena 以 SQL 查 recipient/subject/time。",
      "不要只靠 CloudTrail（没有邮件内容层细节）。",
      "CloudWatch 不如 S3+Athena 适合大量历史检索。"
    ],
    "solutions": "正确答案是 A 与 C。Configuration set → Firehose → S3 → Athena 是 SES 可搜寻日志标准链。",
    "result_flow": "SES 寄信 → configuration set 事件 → Firehose → S3 → Athena 按收件人/主旨/时间查。",
    "options": {
      "A": "✓ 正确。SES configuration set + Firehose 到 S3。",
      "B": "错。CloudTrail 无邮件层栏位。",
      "C": "✓ 正确。Athena 查 S3 日志。",
      "D": "错。CW Logs 非最佳大量检索。",
      "E": "错。Athena 直接查 CW 非标准 SES 路径。"
    },
    "diagram_before": "flowchart TB\n  SES[\"SES 寄信\"]\n  DEL[\"投递状态难查\"]\n  NEED[\"要依收件人/主旨/时间搜\"]\n  GAP{{\"缺口: 无可搜寻投递日志\"}}\n  SES --> DEL --> NEED\n  NEED -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  SES[\"SES 寄信\"] --> CS[\"Configuration set\"]\n  CS --> FH[\"Data Firehose\"]\n  FH --> S3[\"S3 日志\"]\n  S3 --> ATH[\"Athena 查收件人/主旨/时间\"]\n"
  },
  "524": {
    "blocker": "Business Support，多帐户 EC2 有部门等标签。开发机又贵又闲。定义：14 天内至少 4 天日均 CPU≤10% 且网路≤5MB 视为低利用，要侦测并停止。",
    "requirements": "1) 依标签监控；2) 符合低利用条件；3) 自动停止。",
    "steps": [
      "用 CloudWatch 仪表板/指标依标签看 EC2 利用率。",
      "EventBridge 规则定期或依条件触发 Lambda。",
      "Lambda 判断 14 天内低利用天数与标签（development）。",
      "符合则 StopInstances。"
    ],
    "solutions": "正确答案是 A。CloudWatch + EventBridge + Lambda 可自订 14 天/4 天逻辑。Trusted Advisor 难精准对这自订条件自动停机。",
    "result_flow": "CloudWatch 收集 CPU/网路 → Lambda 评估标签与门槛 → 停止低利用开发实例。",
    "options": {
      "A": "✓ 正确。CloudWatch 依标签监控 + EventBridge/Lambda 自动停止。",
      "B": "错。SSM 绕一圈不必要。",
      "C": "错。Trusted Advisor 难精准自订 14/4 天规则并自动停。",
      "D": "错。日批 Lambda+DynamoDB+QuickSight 最重且未必自动停。"
    },
    "diagram_before": "flowchart TB\n  DEV[\"开发 EC2 又贵又闲\"]\n  TAG[\"有部门等标签\"]\n  RULE[\"14天内≥4天低利用\"]\n  GAP{{\"缺口: 条件未自动停机\"}}\n  DEV --> TAG --> RULE\n  RULE -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  CW[\"CloudWatch CPU/网路\"] --> EB[\"EventBridge 定期触发\"]\n  EB --> L[\"Lambda 评估标签与门槛\"]\n  L -->|低利用开发机| STOP[\"StopInstances\"]\n  L -->|不符条件| KEEP[\"保留运行\"]\n"
  },
  "525": {
    "blocker": "专案 3 年：20 台 On-Demand 挂 NLB，常态 CPU 10%，忙碌数小时打到 100%，有人嫌慢。要最省地解决慢与成本。",
    "requirements": "1) 尖峰可扩；2) 常态不养 20 台；3) 长期折扣。",
    "steps": [
      "建 Auto Scaling group 挂到 NLB target group。",
      "min=4、max=28，让常态缩、尖峰扩。",
      "对 4 台基线买 Reserved Instances。",
      "尖峰额外 On-Demand 由 ASG 拉起。"
    ],
    "solutions": "正确答案是 D。常态 10% 代表 20 台过度布建；min4+RI 基线、max28 尖峰最省。min20+20RI 太贵；纯 Spot 风险与 NLB 场景不符。",
    "result_flow": "低峰 4 台（RI）→ 忙碌 ASG 扩到最多 28 → NLB 分散 → 过后缩回。",
    "options": {
      "A": "错。min20+desired28+20RI 过度且贵。",
      "B": "错。Spot Fleet 设定不符稳定 NLB 服务。",
      "C": "错。全 Spot 可能中断；换 ALB 无必要。",
      "D": "✓ 正确。ASG min4 max28 + 4 台 RI，成本与效能平衡。"
    },
    "diagram_before": "flowchart TB\n  NLB[\"NLB\"]\n  EC2[\"20 台 On-Demand\"]\n  CPU[\"常态 CPU 10%<br/>尖峰 100%\"]\n  GAP{{\"缺口: 过度布建又慢<br/>三年要最省\"}}\n  NLB --> EC2 --> CPU\n  CPU -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  LOW[\"低峰 4 台 + RI\"] --> ASG[\"Auto Scaling<br/>min4 max28\"]\n  BUSY[\"忙碌\"] --> ASG\n  ASG --> NLB[\"NLB 分散\"]\n  ASG --> SCALE[\"尖峰扩、过后缩\"]\n"
  },
  "526": {
    "blocker": "工厂感测器经 IoT Core 每 5 秒上报，要先丰富化再进 S3，30 分钟内要可见；无其他消费者抢资料。要简单。",
    "requirements": "1) 丰富化；2) <30 分钟进 S3；3) 架构单纯。",
    "steps": [
      "装置发到 IoT Core topic。",
      "IoT rule 直接 invoke Lambda。",
      "Lambda 丰富化后写 S3。",
      "避免 Firehose 900 秒缓冲或多余 Timestream/Kinesis。"
    ],
    "solutions": "正确答案是 A。Rule→Lambda→S3 最直接。Firehose 900s 缓冲易超过时限；多一层串流无益。",
    "result_flow": "感测器 → IoT Core topic → Rule → Lambda 丰富化 → S3 data lake（远低于 30 分）。",
    "options": {
      "A": "✓ 正确。IoT topic + Rule 调 Lambda 丰富化写 S3。",
      "B": "错。Firehose 900 秒缓冲风险超时。",
      "C": "错。经 Timestream 多余。",
      "D": "错。Kinesis Streams 增加复杂度与成本。"
    },
    "diagram_before": "flowchart TB\n  SEN[\"工厂感测器 每 5 秒\"]\n  IOT[\"IoT Core\"]\n  NEED[\"先丰富化再进 S3\"]\n  GAP{{\"缺口: &lt;30 分可见<br/>架构要单纯\"}}\n  SEN --> IOT --> NEED\n  NEED -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  SEN[\"感测器\"] --> IOT[\"IoT Core topic\"]\n  IOT --> RULE[\"IoT Rule\"]\n  RULE --> L[\"Lambda 丰富化\"]\n  L --> S3[\"S3 data lake\"]\n  S3 --> FAST[\"远低于 30 分可见\"]\n"
  },
  "527": {
    "blocker": "IoT 资料湖在 A 帐户 S3；资料科学家在 B 帐户公有子网 EC2，已有 S3 权限角色。政策：只有授权网路能碰 IoT 资料。选两项。",
    "requirements": "1) 跨帐户受控存取；2) 网路限制；3) 条件化 IAM。",
    "steps": [
      "在资料科学家帐户为 data lake 建 S3 Access Point。",
      "更新 EC2 角色政策：仅当 s3:DataAccessPointArn 为合法 access point 时允许 GetObject。",
      "利用 access point 网路/VPC 相关控制收紧来源。",
      "Route table 不能「路由到 access point」。"
    ],
    "solutions": "正确答案是 B 与 C（依题库）。Access Point + IAM 条件键限制从指定 AP 存取。Gateway endpoint  alone 不做跨帐户授权模型。",
    "result_flow": "EC2（B 帐户）→ 经 Access Point ARN 条件 → 读 A 帐户 data lake 物件。",
    "options": {
      "A": "错。仅 gateway endpoint 不解跨帐户授权模型。",
      "B": "✓ 正确。在资料科学家帐户建 S3 Access Point。",
      "C": "✓ 正确。EC2 role 用 DataAccessPointArn 条件限制。",
      "D": "错。路由表不能指到 access point。",
      "E": "未选。Bucket policy 常也需要，但题库选 B+C。"
    },
    "diagram_before": "flowchart TB\n  A[\"A 帐户 IoT data lake S3\"]\n  B[\"B 帐户公有子网 EC2\"]\n  ROLE[\"已有 S3 权限角色\"]\n  GAP{{\"缺口: 只有授权网路<br/>能碰 IoT 资料\"}}\n  B --> ROLE\n  ROLE -.-> A\n  A -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  EC2[\"B 帐户 EC2\"] --> AP[\"S3 Access Point\"]\n  AP --> IAM[\"IAM 条件<br/>DataAccessPointArn\"]\n  IAM --> LAKE[\"A 帐户 data lake\"]\n  NET[\"VPC/网路控制\"] -.-> AP\n"
  },
  "528": {
    "blocker": "地端 K8s 与 PostgreSQL 要迁 EKS（固定节点数 managed node）与 RDS。先要一份可靠 TCO/成本洞察报告。",
    "requirements": "1) 收集现况；2) 设定情境；3) 产出洞察报告。",
    "steps": [
      "申请/使用 Migration Evaluator。",
      "跑 Migration Evaluator Collector 汇入资料。",
      "设定 migration scenario。",
      "汇出 Quick Insights 报告做 TCO 决策。"
    ],
    "solutions": "正确答案是 A。Migration Evaluator 就是为迁移前 TCO。DMS assessment、MGN、Cloud Economics 网页都不能完整取代。",
    "result_flow": "Collector 收集 → Evaluator 建模 → Quick Insights TCO 报告 → 再规划 EKS/RDS 迁移。",
    "options": {
      "A": "✓ 正确。Migration Evaluator Collector + scenario + Quick Insights。",
      "B": "错。DMS 评估偏资料库非整体 TCO。",
      "C": "错。MGN 偏迁移执行非 TCO。",
      "D": "错。经济学框架网页无具体工作负载估算。"
    },
    "diagram_before": "flowchart TB\n  K8S[\"地端 K8s\"]\n  PG[\"PostgreSQL\"]\n  PLAN[\"要迁 EKS + RDS\"]\n  GAP{{\"缺口: 缺可靠 TCO<br/>/成本洞察报告\"}}\n  K8S --> PLAN\n  PG --> PLAN\n  PLAN -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  COL[\"Migration Evaluator<br/>Collector\"] --> DATA[\"汇入现况\"]\n  DATA --> SC[\"设定 migration scenario\"]\n  SC --> RPT[\"Quick Insights TCO\"]\n  RPT --> NEXT[\"再规划 EKS/RDS 迁移\"]\n"
  },
  "529": {
    "blocker": "售票平台活动时间已知；ECS on EC2 ASG 用 predictive scaling；常经 NAT 读同 Region S3。要在不降可用性下省成本。选两项。",
    "requirements": "1) 降 NAT 流量费；2) 尖峰有容量；3) 保持可用。",
    "steps": [
      "建 S3 gateway VPC endpoint，同 Region S3 不再走 NAT。",
      "对已知活动时段建立 On-Demand Capacity Reservations。",
      "避免用会中断的大量 Spot 降可用性。",
      "Transfer Acceleration 会加钱不适合。"
    ],
    "solutions": "正确答案是 A 与 C。Gateway endpoint 省 NAT 费；Capacity Reservation 保尖峰 On-Demand 容量。题库未选改 scheduled scaling（E）。",
    "result_flow": "ECS 任务 → S3 gateway endpoint 拉票券素材（免 NAT）→ 活动前 Capacity Reservation 保住 EC2 容量 → predictive/既有策略扩展接客。",
    "options": {
      "A": "✓ 正确。S3 gateway endpoint 消除 NAT 流量费。",
      "B": "错。同权重 Spot 可能影响可用性。",
      "C": "✓ 正确。活动时段 On-Demand Capacity Reservations 保容量。",
      "D": "错。Transfer Acceleration 更贵。",
      "E": "未选。改 scheduled scaling 非题库组合。"
    },
    "diagram_before": "flowchart TB\n  ECS[\"ECS on EC2 + predictive\"]\n  NAT[\"经 NAT 读同 Region S3\"]\n  EVENT[\"活动时间已知\"]\n  GAP{{\"缺口: NAT 费高<br/>尖峰容量要保住\"}}\n  ECS --> NAT\n  EVENT -.-> GAP\n  NAT -.-> GAP\n  style GAP fill:#5c2b2b,stroke:#ef5350,color:#fff\n",
    "diagram_after": "flowchart TB\n  ECS[\"ECS 任务\"] --> GW[\"S3 gateway endpoint\"]\n  GW --> S3[\"同 Region S3 免 NAT\"]\n  CR[\"On-Demand Capacity Reservation\"] --> CAP[\"活动前保住容量\"]\n  CAP --> SCALE[\"predictive/既有策略扩展\"]\n"
  }
};
