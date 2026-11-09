// AWS SAP-C02 Glossary - Auto-generated, do not edit manually
// Regenerate with: python3 generate_glossary.py

const GLOSSARY_CATEGORIES = [
  {
    "id": "all",
    "name": "全部"
  },
  {
    "id": "compute",
    "name": "计算"
  },
  {
    "id": "storage",
    "name": "储存"
  },
  {
    "id": "database",
    "name": "资料库"
  },
  {
    "id": "networking",
    "name": "网路"
  },
  {
    "id": "security",
    "name": "安全与身分"
  },
  {
    "id": "integration",
    "name": "整合与讯息"
  },
  {
    "id": "analytics",
    "name": "分析与 ML"
  },
  {
    "id": "management",
    "name": "管理与治理"
  },
  {
    "id": "migration",
    "name": "迁移"
  },
  {
    "id": "devops",
    "name": "开发与部署"
  },
  {
    "id": "concepts",
    "name": "架构概念"
  },
  {
    "id": "protocols",
    "name": "协定与标准"
  }
];

const GLOSSARY_TERMS = [
  {
    "id": "amazon",
    "name": "Amazon",
    "full_name": "Amazon",
    "abbr": "Amazon",
    "aliases": [
      "Amazon"
    ],
    "category": "concepts",
    "function": "AWS 服务的命名前缀，如 Amazon S3、Amazon EC2 等，代表 AWS 托管服务。",
    "use_cases": [
      "识别 AWS 托管服务",
      "与 AWS 开头服务区分"
    ],
    "related_questions": [
      1,
      2,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      13,
      14,
      15,
      16,
      18,
      19,
      20,
      22,
      23,
      24,
      25
    ],
    "question_count": 468
  },
  {
    "id": "api-gateway",
    "name": "Amazon API Gateway",
    "full_name": "Amazon API Gateway",
    "abbr": "API Gateway",
    "aliases": [
      "Amazon API Gateway",
      "API Gateway"
    ],
    "category": "networking",
    "function": "全受管的 API 管理服务，建立、发布和保护 REST/HTTP/WebSocket API。",
    "use_cases": [
      "搭配 Lambda 无伺服器 API",
      "API 版本管理",
      "流量控制和快取"
    ],
    "related_questions": [
      2,
      5,
      7,
      19,
      22,
      27,
      28,
      33,
      45,
      48,
      54,
      73,
      81,
      95,
      106,
      107,
      120,
      142,
      155,
      156
    ],
    "question_count": 53
  },
  {
    "id": "appstream",
    "name": "Amazon AppStream 2.0",
    "full_name": "Amazon AppStream 2.0",
    "abbr": "AppStream",
    "aliases": [
      "AppStream"
    ],
    "category": "compute",
    "function": "全受管的应用程式串流服务，将桌面应用程式串流至任何装置。",
    "use_cases": [
      "SaaS 应用交付",
      "远端桌面",
      "软体试用"
    ],
    "related_questions": [
      280,
      402,
      474
    ],
    "question_count": 3
  },
  {
    "id": "athena",
    "name": "Amazon Athena",
    "full_name": "Amazon Athena",
    "abbr": "Athena",
    "aliases": [
      "Athena"
    ],
    "category": "analytics",
    "function": "无伺服器互动式查询服务，使用标准 SQL 分析 S3 中的资料。",
    "use_cases": [
      "资料湖查询",
      "日志分析",
      "按查询量计费"
    ],
    "related_questions": [
      46,
      72,
      79,
      92,
      115,
      122,
      147,
      196,
      207,
      221,
      226,
      244,
      281,
      300,
      306,
      362,
      387,
      416,
      430,
      443
    ],
    "question_count": 26
  },
  {
    "id": "aurora",
    "name": "Amazon Aurora",
    "full_name": "Amazon Aurora",
    "abbr": "Aurora",
    "aliases": [
      "Aurora",
      "Amazon Aurora",
      "Aurora PostgreSQL",
      "Aurora MySQL"
    ],
    "category": "database",
    "function": "AWS 自研的 MySQL/PostgreSQL 相容关联式资料库。一个 Aurora 丛集通常有 1 个 Writer（写入）同 0～15 个 Aurora Replicas（读取副本）。",
    "use_cases": [
      "高效能 OLTP",
      "全球资料库",
      "Serverless 自动扩展",
      "读写分离扩展"
    ],
    "related_questions": [
      4,
      37,
      48,
      50,
      67,
      72,
      80,
      81,
      87,
      111,
      114,
      125,
      136,
      146,
      148,
      153,
      160,
      184,
      201,
      202
    ],
    "question_count": 59
  },
  {
    "id": "cloudfront",
    "name": "Amazon CloudFront",
    "full_name": "Amazon CloudFront",
    "abbr": "CloudFront",
    "aliases": [
      "Amazon CloudFront",
      "CloudFront",
      "CDN"
    ],
    "category": "networking",
    "function": "全球内容交付网路（CDN），透过边缘节点快取内容以降低延迟。",
    "use_cases": [
      "静态/动态内容加速",
      "搭配 S3 托管",
      "Lambda@Edge",
      "WAF 整合"
    ],
    "related_questions": [
      5,
      10,
      16,
      19,
      28,
      36,
      49,
      52,
      54,
      81,
      82,
      135,
      143,
      153,
      162,
      167,
      169,
      180,
      187,
      189
    ],
    "question_count": 57
  },
  {
    "id": "cloudwatch",
    "name": "Amazon CloudWatch",
    "full_name": "Amazon CloudWatch",
    "abbr": "CloudWatch",
    "aliases": [
      "CloudWatch"
    ],
    "category": "management",
    "function": "监控和可观测性服务，收集指标、日志和事件，设定告警和仪表板。",
    "use_cases": [
      "基础设施监控",
      "日志集中管理",
      "自动扩展触发",
      "合成监控"
    ],
    "related_questions": [
      8,
      10,
      19,
      54,
      65,
      68,
      90,
      97,
      105,
      109,
      117,
      130,
      134,
      141,
      144,
      159,
      170,
      177,
      213,
      214
    ],
    "question_count": 58
  },
  {
    "id": "cognito",
    "name": "Amazon Cognito",
    "full_name": "Amazon Cognito",
    "abbr": "Cognito",
    "aliases": [
      "Cognito"
    ],
    "category": "security",
    "function": "使用者身分验证服务，提供注册/登入、联合身分和管理使用者集区。",
    "use_cases": [
      "行动/Web 应用登入",
      "社交 IdP 整合",
      "API Gateway 授权"
    ],
    "related_questions": [
      118,
      258,
      280,
      371,
      378,
      411,
      459
    ],
    "question_count": 7
  },
  {
    "id": "documentdb",
    "name": "Amazon DocumentDB",
    "full_name": "Amazon DocumentDB (with MongoDB compatibility)",
    "abbr": "DocumentDB",
    "aliases": [
      "DocumentDB"
    ],
    "category": "database",
    "function": "全受管的 MongoDB 相容文件资料库服务。",
    "use_cases": [
      "文件型资料储存",
      "MongoDB 工作负载迁移"
    ],
    "related_questions": [
      136,
      187,
      299,
      318,
      324,
      325,
      505
    ],
    "question_count": 7
  },
  {
    "id": "dynamodb",
    "name": "Amazon DynamoDB",
    "full_name": "Amazon DynamoDB",
    "abbr": "DynamoDB",
    "aliases": [
      "Amazon DynamoDB",
      "DynamoDB"
    ],
    "category": "database",
    "function": "全受管的 NoSQL 键值和文件资料库，提供个位数毫秒延迟。",
    "use_cases": [
      "游戏状态",
      "行动应用后端",
      "IoT 资料",
      "DAX 快取加速"
    ],
    "related_questions": [
      2,
      22,
      27,
      32,
      41,
      63,
      75,
      76,
      80,
      94,
      129,
      135,
      150,
      154,
      155,
      160,
      166,
      179,
      182,
      184
    ],
    "question_count": 62
  },
  {
    "id": "ebs",
    "name": "Amazon EBS",
    "full_name": "Amazon Elastic Block Store",
    "abbr": "EBS",
    "aliases": [
      "EBS"
    ],
    "category": "storage",
    "function": "区块储存服务，为 EC2 执行个体提供持久性磁碟区。",
    "use_cases": [
      "资料库储存",
      "开机磁碟区",
      "快照备份",
      "gp3/io2 高效能工作负载"
    ],
    "related_questions": [
      18,
      20,
      23,
      54,
      58,
      76,
      80,
      89,
      105,
      130,
      136,
      139,
      151,
      159,
      168,
      169,
      175,
      182,
      190,
      191
    ],
    "question_count": 64
  },
  {
    "id": "ec2",
    "name": "Amazon EC2",
    "full_name": "Amazon Elastic Compute Cloud",
    "abbr": "EC2",
    "aliases": [
      "Amazon EC2",
      "EC2"
    ],
    "category": "compute",
    "function": "提供可调整大小的虚拟伺服器（执行个体），在 AWS 云端中运行应用程式。",
    "use_cases": [
      "Web 应用托管",
      "批次处理",
      "高效能运算",
      "开发测试环境",
      "Auto Scaling 扩展"
    ],
    "related_questions": [
      1,
      4,
      7,
      8,
      9,
      10,
      13,
      14,
      15,
      16,
      18,
      20,
      23,
      24,
      25,
      28,
      29,
      32,
      33,
      37
    ],
    "question_count": 250
  },
  {
    "id": "ecr",
    "name": "Amazon ECR",
    "full_name": "Amazon Elastic Container Registry",
    "abbr": "ECR",
    "aliases": [
      "Amazon Elastic Container Registry (Amazon ECR)",
      "Amazon ECR",
      "ECR"
    ],
    "category": "compute",
    "function": "全受管的 Docker 容器映像档储存库，与 ECS/EKS 深度整合。",
    "use_cases": [
      "私有容器映像档储存",
      "CI/CD 映像档推送",
      "映像档漏洞扫描"
    ],
    "related_questions": [
      7,
      19,
      26,
      63,
      101,
      106,
      110,
      111,
      131,
      137,
      138,
      156,
      163,
      201,
      204,
      206,
      210,
      213,
      214,
      224
    ],
    "question_count": 49
  },
  {
    "id": "ecs",
    "name": "Amazon ECS",
    "full_name": "Amazon Elastic Container Service",
    "abbr": "ECS",
    "aliases": [
      "Amazon Elastic Container Service (Amazon ECS)",
      "Amazon ECS",
      "ECS"
    ],
    "category": "compute",
    "function": "全受管的容器编排服务，用于在 AWS 上部署、管理和扩展 Docker 容器。",
    "use_cases": [
      "微服务架构",
      "搭配 Fargate 无伺服器运行",
      "与 ALB 整合负载平衡"
    ],
    "related_questions": [
      7,
      18,
      24,
      37,
      45,
      55,
      63,
      68,
      106,
      117,
      127,
      146,
      156,
      180,
      183,
      189,
      191,
      196,
      223,
      224
    ],
    "question_count": 49
  },
  {
    "id": "efs",
    "name": "Amazon EFS",
    "full_name": "Amazon Elastic File System",
    "abbr": "EFS",
    "aliases": [
      "Amazon Elastic File System (Amazon EFS)",
      "Amazon EFS",
      "EFS"
    ],
    "category": "storage",
    "function": "全受管的 NFS 档案系统，可同时被多个 EC2 执行个体挂载。",
    "use_cases": [
      "共享档案储存",
      "内容管理",
      "Web 伺服器共享内容",
      "容器持久储存"
    ],
    "related_questions": [
      16,
      18,
      20,
      35,
      40,
      42,
      63,
      82,
      139,
      145,
      175,
      191,
      213,
      228,
      234,
      235,
      238,
      288,
      290,
      292
    ],
    "question_count": 39
  },
  {
    "id": "eks",
    "name": "Amazon EKS",
    "full_name": "Amazon Elastic Kubernetes Service",
    "abbr": "EKS",
    "aliases": [
      "Amazon Elastic Kubernetes Service (Amazon EKS)",
      "Amazon EKS",
      "EKS",
      "Kubernetes"
    ],
    "category": "compute",
    "function": "受管的 Kubernetes 服务，简化在 AWS 上运行 Kubernetes 丛集的复杂度。",
    "use_cases": [
      "企业级容器编排",
      "混合云 Kubernetes",
      "搭配 Fargate 或 EC2 节点"
    ],
    "related_questions": [
      7,
      33,
      54,
      93,
      94,
      95,
      106,
      127,
      138,
      152,
      175,
      187,
      207,
      208,
      228,
      271,
      316,
      355,
      368,
      405
    ],
    "question_count": 32
  },
  {
    "id": "elasticache",
    "name": "Amazon ElastiCache",
    "full_name": "Amazon ElastiCache",
    "abbr": "ElastiCache",
    "aliases": [
      "Amazon ElastiCache",
      "ElastiCache",
      "Redis"
    ],
    "category": "database",
    "function": "受管的记忆体内快取服务，支援 Redis 和 Memcached。",
    "use_cases": [
      "资料库查询快取",
      "Session 储存",
      "即时排行榜",
      "Pub/Sub 讯息"
    ],
    "related_questions": [
      9,
      94,
      125,
      163,
      184,
      189,
      195,
      228,
      254,
      257,
      311,
      318,
      327,
      392,
      396,
      433,
      444,
      461,
      462,
      473
    ],
    "question_count": 21
  },
  {
    "id": "emr",
    "name": "Amazon EMR",
    "full_name": "Amazon Elastic MapReduce",
    "abbr": "EMR",
    "aliases": [
      "Amazon EMR",
      "EMR"
    ],
    "category": "compute",
    "function": "受管的大数据平台，用于执行 Apache Spark、Hadoop 等分散式框架。",
    "use_cases": [
      "日志分析",
      "ETL 处理",
      "机器学习资料准备"
    ],
    "related_questions": [
      129,
      147,
      239,
      263,
      281,
      305,
      360,
      510
    ],
    "question_count": 8
  },
  {
    "id": "eventbridge",
    "name": "Amazon EventBridge",
    "full_name": "Amazon EventBridge",
    "abbr": "EventBridge",
    "aliases": [
      "EventBridge"
    ],
    "category": "integration",
    "function": "无伺服器事件汇流排，连接 AWS 服务、SaaS 应用和自订应用的事件。",
    "use_cases": [
      "事件驱动架构",
      "排程任务",
      "跨帐户事件路由"
    ],
    "related_questions": [
      13,
      14,
      26,
      44,
      54,
      100,
      110,
      117,
      119,
      134,
      144,
      166,
      171,
      173,
      177,
      179,
      197,
      210,
      224,
      226
    ],
    "question_count": 46
  },
  {
    "id": "fsx",
    "name": "Amazon FSx",
    "full_name": "Amazon FSx",
    "abbr": "FSx",
    "aliases": [
      "FSx"
    ],
    "category": "storage",
    "function": "全受管的档案系统服务，支援 Windows File Server、Lustre、NetApp ONTAP 和 OpenZFS。",
    "use_cases": [
      "Windows 应用共享储存",
      "高效能运算",
      "SAP HANA"
    ],
    "related_questions": [
      23,
      35,
      62,
      139,
      144,
      165,
      191,
      193,
      231,
      234,
      235,
      292,
      302,
      369,
      389,
      401,
      422,
      425,
      429,
      448
    ],
    "question_count": 23
  },
  {
    "id": "guardduty",
    "name": "Amazon GuardDuty",
    "full_name": "Amazon GuardDuty",
    "abbr": "GuardDuty",
    "aliases": [
      "GuardDuty"
    ],
    "category": "security",
    "function": "智慧型威胁侦测服务，持续监控恶意活动和异常行为。",
    "use_cases": [
      "异常 API 呼叫侦测",
      "恶意 IP 识别",
      "自动化威胁回应"
    ],
    "related_questions": [
      199,
      299,
      417,
      488,
      520
    ],
    "question_count": 5
  },
  {
    "id": "inspector",
    "name": "Amazon Inspector",
    "full_name": "Amazon Inspector",
    "abbr": "Inspector",
    "aliases": [
      "Inspector"
    ],
    "category": "security",
    "function": "自动化安全评估服务，扫描 EC2 和容器映像档的漏洞。",
    "use_cases": [
      "漏洞管理",
      "合规检查",
      "持续安全评估"
    ],
    "related_questions": [
      13,
      113,
      217,
      353,
      478,
      488,
      500,
      520
    ],
    "question_count": 8
  },
  {
    "id": "firehose",
    "name": "Amazon Kinesis Data Firehose",
    "full_name": "Amazon Kinesis Data Firehose",
    "abbr": "Firehose",
    "aliases": [
      "Amazon Kinesis Data Firehose",
      "Firehose"
    ],
    "category": "analytics",
    "function": "全受管的资料传输服务，将串流资料自动载入 S3、Redshift、OpenSearch 等。",
    "use_cases": [
      "日志归档至 S3",
      "近即时 ETL",
      "无需管理消费者"
    ],
    "related_questions": [
      50,
      114,
      217,
      237,
      239,
      241,
      244,
      252,
      291,
      318,
      323,
      387,
      404,
      420,
      443,
      523,
      526
    ],
    "question_count": 17
  },
  {
    "id": "kinesis-streams",
    "name": "Amazon Kinesis Data Streams",
    "full_name": "Amazon Kinesis Data Streams",
    "abbr": "Kinesis Data Streams",
    "aliases": [
      "Amazon Kinesis Data Streams",
      "Kinesis"
    ],
    "category": "analytics",
    "function": "即时资料串流服务，撷取和处理大量串流资料。",
    "use_cases": [
      "即时日志分析",
      "IoT 资料撷取",
      "搭配 Lambda 处理"
    ],
    "related_questions": [
      50,
      80,
      114,
      115,
      157,
      180,
      209,
      217,
      220,
      237,
      239,
      241,
      244,
      252,
      291,
      318,
      323,
      338,
      368,
      381
    ],
    "question_count": 29
  },
  {
    "id": "lightsail",
    "name": "Amazon Lightsail",
    "full_name": "Amazon Lightsail",
    "abbr": "Lightsail",
    "aliases": [
      "Lightsail"
    ],
    "category": "compute",
    "function": "简化的虚拟私有伺服器服务，提供固定月费的计算、储存和网路资源。",
    "use_cases": [
      "小型网站",
      "开发测试",
      "简单应用托管"
    ],
    "related_questions": [
      271
    ],
    "question_count": 1
  },
  {
    "id": "macie",
    "name": "Amazon Macie",
    "full_name": "Amazon Macie",
    "abbr": "Macie",
    "aliases": [
      "Macie"
    ],
    "category": "security",
    "function": "使用机器学习发现和保护 S3 中的敏感资料（PII、财务资料等）。",
    "use_cases": [
      "资料分类",
      "合规稽核",
      "敏感资料外泄侦测"
    ],
    "related_questions": [
      242
    ],
    "question_count": 1
  },
  {
    "id": "msk",
    "name": "Amazon MSK",
    "full_name": "Amazon Managed Streaming for Apache Kafka",
    "abbr": "MSK",
    "aliases": [
      "Amazon Managed Streaming for Apache Kafka",
      "MSK",
      "Kafka"
    ],
    "category": "analytics",
    "function": "全受管的 Apache Kafka 服务，简化 Kafka 丛集建立和运维。",
    "use_cases": [
      "即时资料管线",
      "事件溯源",
      "微服务通讯"
    ],
    "related_questions": [
      237,
      241,
      323,
      346,
      368,
      404
    ],
    "question_count": 6
  },
  {
    "id": "mwaa",
    "name": "Amazon MWAA",
    "full_name": "Amazon Managed Workflows for Apache Airflow",
    "abbr": "MWAA",
    "aliases": [
      "MWAA"
    ],
    "category": "devops",
    "function": "受管的 Apache Airflow 服务，用于编排复杂的工作流程和资料管线。",
    "use_cases": [
      "ETL 排程",
      "ML 管线编排",
      "跨服务任务协调"
    ],
    "related_questions": [],
    "question_count": 0
  },
  {
    "id": "neptune",
    "name": "Amazon Neptune",
    "full_name": "Amazon Neptune",
    "abbr": "Neptune",
    "aliases": [
      "Neptune"
    ],
    "category": "database",
    "function": "全受管的图形资料库，支援属性图和 RDF 模型。",
    "use_cases": [
      "社交网路",
      "推荐引擎",
      "诈欺侦测",
      "知识图谱"
    ],
    "related_questions": [
      114,
      214,
      299,
      318,
      400,
      460,
      474
    ],
    "question_count": 7
  },
  {
    "id": "opensearch",
    "name": "Amazon OpenSearch Service",
    "full_name": "Amazon OpenSearch Service",
    "abbr": "OpenSearch",
    "aliases": [
      "Amazon OpenSearch Service",
      "OpenSearch"
    ],
    "category": "analytics",
    "function": "受管的搜寻和分析引擎，支援全文搜寻、日志分析和视觉化。",
    "use_cases": [
      "ELK 日志分析",
      "应用程式搜寻",
      "安全事件分析"
    ],
    "related_questions": [
      43,
      114,
      195,
      252,
      271,
      398
    ],
    "question_count": 6
  },
  {
    "id": "pinpoint",
    "name": "Amazon Pinpoint",
    "full_name": "Amazon Pinpoint",
    "abbr": "Pinpoint",
    "aliases": [
      "Pinpoint"
    ],
    "category": "integration",
    "function": "行销和参与服务，发送 Email、SMS 和推播通知并分析使用者行为。",
    "use_cases": [
      "行销活动",
      "使用者分群",
      "搭配 SNS 发送"
    ],
    "related_questions": [
      117,
      176
    ],
    "question_count": 2
  },
  {
    "id": "qldb",
    "name": "Amazon QLDB",
    "full_name": "Amazon Quantum Ledger Database",
    "abbr": "QLDB",
    "aliases": [
      "QLDB"
    ],
    "category": "database",
    "function": "全受管的帐本资料库，提供不可变、可验证的交易记录。",
    "use_cases": [
      "金融交易记录",
      "供应链追踪",
      "合规审计"
    ],
    "related_questions": [],
    "question_count": 0
  },
  {
    "id": "quicksight",
    "name": "Amazon QuickSight",
    "full_name": "Amazon QuickSight",
    "abbr": "QuickSight",
    "aliases": [
      "QuickSight"
    ],
    "category": "analytics",
    "function": "云端 BI 服务，建立和发布互动式仪表板和资料视觉化。",
    "use_cases": [
      "业务报表",
      "SPICE 记忆体内引擎",
      "嵌入分析"
    ],
    "related_questions": [
      13,
      34,
      46,
      79,
      83,
      101,
      114,
      122,
      196,
      211,
      213,
      362,
      484,
      487,
      524
    ],
    "question_count": 15
  },
  {
    "id": "rds",
    "name": "Amazon RDS",
    "full_name": "Amazon Relational Database Service",
    "abbr": "RDS",
    "aliases": [
      "Amazon RDS",
      "RDS"
    ],
    "category": "database",
    "function": "受管的关联式资料库服务，支援 MySQL、PostgreSQL、MariaDB、Oracle、SQL Server。",
    "use_cases": [
      "Web 应用后端",
      "Multi-AZ 高可用",
      "读取副本扩展",
      "跨区域灾难复原"
    ],
    "related_questions": [
      8,
      9,
      10,
      15,
      26,
      28,
      34,
      37,
      48,
      50,
      55,
      61,
      63,
      64,
      69,
      72,
      75,
      76,
      80,
      81
    ],
    "question_count": 102
  },
  {
    "id": "redshift",
    "name": "Amazon Redshift",
    "full_name": "Amazon Redshift",
    "abbr": "Redshift",
    "aliases": [
      "Redshift"
    ],
    "category": "analytics",
    "function": "全受管的云端资料仓储，使用 MPP 架构进行大规模分析查询。",
    "use_cases": [
      "商业智慧",
      "PB 级资料分析",
      "Spectrum 查询 S3"
    ],
    "related_questions": [
      92,
      122,
      178,
      196,
      211,
      239,
      252,
      281,
      291,
      305,
      323,
      387,
      433,
      474,
      497,
      500
    ],
    "question_count": 16
  },
  {
    "id": "route53",
    "name": "Amazon Route 53",
    "full_name": "Amazon Route 53",
    "abbr": "Route 53",
    "aliases": [
      "Amazon Route 53",
      "Route 53"
    ],
    "category": "networking",
    "function": "高度可用的 DNS 服务，同时提供网域注册和健康检查路由。",
    "use_cases": [
      "DNS 解析",
      "流量路由（加权/延迟/故障转移）",
      "私有 DNS 区域"
    ],
    "related_questions": [
      1,
      2,
      8,
      10,
      15,
      28,
      33,
      36,
      37,
      52,
      60,
      61,
      69,
      71,
      86,
      107,
      142,
      155,
      159,
      160
    ],
    "question_count": 60
  },
  {
    "id": "s3",
    "name": "Amazon S3",
    "full_name": "Amazon Simple Storage Service",
    "abbr": "S3",
    "aliases": [
      "Amazon S3",
      "S3"
    ],
    "category": "storage",
    "function": "物件储存服务，提供业界领先的可扩展性、资料可用性和安全性。",
    "use_cases": [
      "静态网站托管",
      "资料湖",
      "备份归档",
      "跨帐户存取",
      "生命周期管理"
    ],
    "related_questions": [
      6,
      8,
      10,
      14,
      16,
      18,
      20,
      23,
      26,
      29,
      32,
      36,
      40,
      42,
      43,
      46,
      51,
      53,
      54,
      57
    ],
    "question_count": 182
  },
  {
    "id": "sagemaker",
    "name": "Amazon SageMaker",
    "full_name": "Amazon SageMaker",
    "abbr": "SageMaker",
    "aliases": [
      "SageMaker"
    ],
    "category": "analytics",
    "function": "全受管的机器学习平台，涵盖资料准备、模型训练、部署和监控。",
    "use_cases": [
      "ML 模型训练",
      "即时推论端点",
      "MLOps 管线"
    ],
    "related_questions": [
      94,
      157,
      241,
      349
    ],
    "question_count": 4
  },
  {
    "id": "ses",
    "name": "Amazon SES",
    "full_name": "Amazon Simple Email Service",
    "abbr": "SES",
    "aliases": [
      "SES"
    ],
    "category": "integration",
    "function": "可扩展的 Email 发送服务，支援交易性和行销 Email。",
    "use_cases": [
      "应用程式通知",
      "大量 Email 发送"
    ],
    "related_questions": [
      1,
      2,
      3,
      4,
      5,
      9,
      10,
      11,
      13,
      14,
      15,
      17,
      18,
      21,
      22,
      23,
      24,
      25,
      28,
      31
    ],
    "question_count": 319
  },
  {
    "id": "sns",
    "name": "Amazon SNS",
    "full_name": "Amazon Simple Notification Service",
    "abbr": "SNS",
    "aliases": [
      "Amazon Simple Notification Service (Amazon SNS)",
      "Amazon SNS",
      "SNS"
    ],
    "category": "integration",
    "function": "发布/订阅讯息服务，支援多种传输协定（Email、SMS、HTTP、SQS 等）。",
    "use_cases": [
      "事件通知",
      "Fan-out 架构",
      "行动推播",
      "CloudWatch 告警"
    ],
    "related_questions": [
      8,
      14,
      38,
      44,
      53,
      66,
      88,
      94,
      98,
      100,
      117,
      133,
      145,
      166,
      173,
      176,
      179,
      197,
      212,
      219
    ],
    "question_count": 34
  },
  {
    "id": "sqs",
    "name": "Amazon SQS",
    "full_name": "Amazon Simple Queue Service",
    "abbr": "SQS",
    "aliases": [
      "Amazon Simple Queue Service (Amazon SQS)",
      "Amazon SQS",
      "SQS"
    ],
    "category": "integration",
    "function": "全受管的讯息伫列服务，解耦和扩展微服务、分散式系统和无伺服器应用。",
    "use_cases": [
      "非同步处理",
      "流量削峰",
      "死信伫列",
      "搭配 Lambda"
    ],
    "related_questions": [
      18,
      42,
      68,
      95,
      100,
      107,
      133,
      141,
      145,
      147,
      166,
      179,
      180,
      212,
      224,
      228,
      239,
      257,
      271,
      276
    ],
    "question_count": 32
  },
  {
    "id": "timestream",
    "name": "Amazon Timestream",
    "full_name": "Amazon Timestream",
    "abbr": "Timestream",
    "aliases": [
      "Timestream"
    ],
    "category": "database",
    "function": "全受管的时间序列资料库，自动管理资料生命周期。",
    "use_cases": [
      "IoT 感测器资料",
      "营运监控",
      "DevOps 指标"
    ],
    "related_questions": [
      197,
      526
    ],
    "question_count": 2
  },
  {
    "id": "vpc",
    "name": "Amazon VPC",
    "full_name": "Amazon Virtual Private Cloud",
    "abbr": "VPC",
    "aliases": [
      "Amazon VPC",
      "VPC"
    ],
    "category": "networking",
    "function": "在 AWS 云端中建立逻辑隔离的虚拟网路，完全控制网路环境。",
    "use_cases": [
      "子网路划分",
      "安全群组/NACL",
      "VPC Peering",
      "PrivateLink"
    ],
    "related_questions": [
      1,
      11,
      12,
      15,
      17,
      20,
      29,
      30,
      33,
      40,
      44,
      47,
      53,
      55,
      56,
      61,
      65,
      69,
      77,
      87
    ],
    "question_count": 108
  },
  {
    "id": "workspaces",
    "name": "Amazon WorkSpaces",
    "full_name": "Amazon WorkSpaces",
    "abbr": "WorkSpaces",
    "aliases": [
      "WorkSpaces"
    ],
    "category": "compute",
    "function": "受管的桌面即服务（DaaS），在云端提供 Windows 或 Linux 虚拟桌面。",
    "use_cases": [
      "远端办公",
      "临时员工桌面",
      "开发环境"
    ],
    "related_questions": [
      144,
      193,
      280,
      326,
      402,
      470,
      476,
      486
    ],
    "question_count": 8
  },
  {
    "id": "amazon-provided-dns",
    "name": "AmazonProvidedDNS",
    "full_name": "Amazon Provided DNS (VPC+2)",
    "abbr": "AmazonProvidedDNS",
    "aliases": [
      "AmazonProvidedDNS",
      "amazonprovideddns",
      "Amazon Provided DNS",
      "VPC+2",
      "enableDnsHostnames",
      "enableDnsSupport",
      "DNS hostnames"
    ],
    "category": "networking",
    "function": "VPC 预设 DNS 服务（VPC 位址范围+2），由 Route 53 Resolver 提供，解析 Private Hosted Zone 与 public hostname（需启用 DNS hostnames）。",
    "use_cases": [
      "VPC 内预设 DNS",
      "DHCP options 设为 AmazonProvidedDNS",
      "启用 enableDnsHostnames 取得 public DNS 名称"
    ],
    "related_questions": [
      278,
      304
    ],
    "question_count": 2
  },
  {
    "id": "alb",
    "name": "Application Load Balancer",
    "full_name": "Application Load Balancer",
    "abbr": "ALB",
    "aliases": [
      "Application Load Balancer (ALB)",
      "Application Load Balancer",
      "ALB"
    ],
    "category": "networking",
    "function": "第七层（HTTP/HTTPS）负载平衡器，支援路径和主机名称路由。",
    "use_cases": [
      "微服务路由",
      "容器负载平衡",
      "WebSocket",
      "OIDC 验证"
    ],
    "related_questions": [
      4,
      5,
      7,
      8,
      10,
      14,
      16,
      24,
      27,
      28,
      33,
      37,
      40,
      45,
      49,
      50,
      52,
      56,
      61,
      69
    ],
    "question_count": 96
  },
  {
    "id": "arn",
    "name": "ARN",
    "full_name": "Amazon Resource Name",
    "abbr": "ARN",
    "aliases": [
      "ARN"
    ],
    "category": "protocols",
    "function": "AWS 资源的唯一识别码，格式为 arn:partition:service:region:account:resource。",
    "use_cases": [
      "IAM 政策 Resource 栏位",
      "跨服务资源引用"
    ],
    "related_questions": [
      6,
      93,
      94,
      126,
      154,
      157,
      200,
      241,
      277,
      349,
      364,
      412,
      460,
      480,
      527
    ],
    "question_count": 15
  },
  {
    "id": "aurora-replica",
    "name": "Aurora Replica",
    "full_name": "Aurora Replica (Reader Instance)",
    "abbr": "Aurora Replica",
    "aliases": [
      "Aurora Replica",
      "Aurora Replicas",
      "Aurora replica",
      "Aurora replicas",
      "Aurora Reader",
      "Aurora Readers",
      "reader instance",
      "Reader Instance",
      "读取副本",
      "读节点"
    ],
    "category": "database",
    "function": "Aurora 丛集里的「只读」节点，与 Writer 共用同一份丛集储存，延迟通常很低。用来分担 SELECT 读取流量。可开多个，并用 Aurora Replica Auto Scaling 按 CPU／连线数自动加减副本数。",
    "use_cases": [
      "读写分离",
      "读取尖峰自动扩展",
      "Writer 故障时备援提升",
      "第 4 题：读取用 Aurora Replicas Auto Scaling"
    ],
    "related_questions": [
      4,
      9,
      50,
      72,
      125,
      146,
      201,
      289,
      374,
      413,
      424,
      437,
      481
    ],
    "question_count": 13
  },
  {
    "id": "aurora-writer",
    "name": "Aurora Writer",
    "full_name": "Aurora Writer Instance (Primary)",
    "abbr": "Writer",
    "aliases": [
      "Aurora Writer",
      "Aurora writer",
      "Aurora writers",
      "writer instance",
      "Writer Instance",
      "primary instance",
      "Aurora primary",
      "写入节点",
      "写入器",
      "主实例"
    ],
    "category": "database",
    "function": "Aurora 丛集里负责「写入」的那一台（主实例）。INSERT／UPDATE／DELETE 都必须打去 Writer；一个丛集同一时间通常只有 1 个 Writer。读取可以给 Replica，写入不能靠多开 Writer 水平扩展（要扩写入能力通常靠更大实例、分片或架构调整）。",
    "use_cases": [
      "应用写入连线指向 cluster writer endpoint",
      "Writer 故障时由 Replica 提升为新 Writer",
      "第 4 题：写入仍走单一 Writer"
    ],
    "related_questions": [
      4,
      50,
      341,
      395,
      413
    ],
    "question_count": 5
  },
  {
    "id": "auto-scaling",
    "name": "Auto Scaling",
    "full_name": "AWS Auto Scaling",
    "abbr": "Auto Scaling",
    "aliases": [
      "Auto Scaling"
    ],
    "category": "concepts",
    "function": "根据需求自动调整运算资源数量，维持效能同时降低成本。",
    "use_cases": [
      "EC2 Auto Scaling Group",
      "DynamoDB 自动扩展",
      "Application Auto Scaling"
    ],
    "related_questions": [
      4,
      8,
      9,
      14,
      16,
      18,
      23,
      33,
      37,
      41,
      42,
      45,
      50,
      52,
      61,
      68,
      69,
      73,
      86,
      95
    ],
    "question_count": 104
  },
  {
    "id": "availability-zone",
    "name": "Availability Zone",
    "full_name": "Availability Zone",
    "abbr": "AZ",
    "aliases": [
      "Availability Zone",
      "Availability Zones"
    ],
    "category": "concepts",
    "function": "AWS Region 内独立的资料中心，具备独立电力和网路，透过低延迟连线互联。",
    "use_cases": [
      "高可用架构设计",
      "灾难复原规划"
    ],
    "related_questions": [
      9,
      24,
      25,
      37,
      40,
      69,
      104,
      121,
      136,
      139,
      161,
      175,
      196,
      202,
      213,
      216,
      217,
      218,
      228,
      230
    ],
    "question_count": 47
  },
  {
    "id": "aws",
    "name": "AWS",
    "full_name": "Amazon Web Services",
    "abbr": "AWS",
    "aliases": [
      "AWS"
    ],
    "category": "concepts",
    "function": "亚马逊提供的云端运算平台，涵盖计算、储存、资料库、网路、安全等 200+ 服务。",
    "use_cases": [
      "云端基础设施",
      "多帐户管理",
      "全球部署"
    ],
    "related_questions": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      10,
      11,
      12,
      13,
      14,
      15,
      17,
      18,
      19,
      21,
      22,
      23
    ],
    "question_count": 489
  },
  {
    "id": "agentless-discovery-connector",
    "name": "AWS Agentless Discovery Connector",
    "full_name": "AWS Agentless Discovery Connector",
    "abbr": "Agentless Connector",
    "aliases": [
      "AWS Agentless Discovery Connector",
      "Agentless Discovery Connector",
      "agentless discovery connector",
      "Agentless Discovery",
      "agentless discovery",
      "无代理探索连接器",
      "无代理程式探索连接器"
    ],
    "category": "migration",
    "function": "部署在 VMware 环境的虚拟设备（OVA），无需在每台客体 VM 安装代理即可透过 vCenter 收集 VM 组态与效能。能搜集的程序/网路细节通常少于 Discovery Agent，不适合「要查 running processes 并深入分析」的场景。",
    "use_cases": [
      "VMware 丛集无代理盘点",
      "不方便装 Agent 时的初估",
      "第 46 题干扰项：无法满足完整程序指标需求"
    ],
    "related_questions": [
      46,
      383
    ],
    "question_count": 2
  },
  {
    "id": "amplify",
    "name": "AWS Amplify",
    "full_name": "AWS Amplify",
    "abbr": "Amplify",
    "aliases": [
      "Amplify"
    ],
    "category": "devops",
    "function": "全端开发平台，简化行动和 Web 应用的建置、部署和托管。",
    "use_cases": [
      "前端托管",
      "Cognito 整合",
      "GraphQL API"
    ],
    "related_questions": [
      258,
      411,
      493
    ],
    "question_count": 3
  },
  {
    "id": "appconfig",
    "name": "AWS AppConfig",
    "full_name": "AWS AppConfig",
    "abbr": "AppConfig",
    "aliases": [
      "AppConfig"
    ],
    "category": "management",
    "function": "安全地部署应用程式组态，支援渐进式部署和自动回滚。",
    "use_cases": [
      "功能开关",
      "组态变更管理",
      "金丝雀部署"
    ],
    "related_questions": [],
    "question_count": 0
  },
  {
    "id": "application-discovery-agent",
    "name": "AWS Application Discovery Agent",
    "full_name": "AWS Application Discovery Agent",
    "abbr": "Discovery Agent",
    "aliases": [
      "AWS Application Discovery Agent",
      "Application Discovery Agent",
      "application discovery agent",
      "Discovery Agent",
      "discovery agent",
      "应用程式发现代理程式",
      "应用程式探索代理"
    ],
    "category": "migration",
    "function": "安装在每台地端伺服器（实体机或 VM）上的代理程式，可收集 CPU、记忆体、OS、执行中程序、网路连线等详细资讯。比无代理方案更完整，适合需要程序与相依分析的大规模迁移（例如第 46 题正确做法）。",
    "use_cases": [
      "收集程序与网路相依",
      "VMware 与非 VMware 主机",
      "搭配 Migration Hub Data Exploration + Athena",
      "第 46 题：每台伺服器部署 Agent"
    ],
    "related_questions": [
      39,
      46,
      158,
      300,
      356,
      423,
      487,
      492
    ],
    "question_count": 8
  },
  {
    "id": "application-discovery-service",
    "name": "AWS Application Discovery Service",
    "full_name": "AWS Application Discovery Service",
    "abbr": "ADS",
    "aliases": [
      "Application Discovery Service",
      "application discovery service",
      "AWS Application Discovery Service",
      "应用程式探索服务",
      "应用程式发现服务"
    ],
    "category": "migration",
    "function": "自动收集地端伺服器的组态、效能、程序与网路连线等资讯，协助迁移规划；资料可汇入 Migration Hub 追踪与分析。",
    "use_cases": [
      "迁移前盘点资产",
      "相依性对应",
      "搭配 Migration Hub / Athena"
    ],
    "related_questions": [
      158,
      174,
      353,
      356,
      383,
      423,
      487,
      515
    ],
    "question_count": 8
  },
  {
    "id": "mgn",
    "name": "AWS Application Migration Service",
    "full_name": "AWS Application Migration Service (MGN)",
    "abbr": "MGN",
    "aliases": [
      "AWS Application Migration Service",
      "Application Migration Service",
      "AWS MGN",
      "MGN",
      "应用程式迁移服务"
    ],
    "category": "migration",
    "function": "主力 lift-and-shift 迁移服务（取代 SMS）：在来源安装复写代理，持续区块级复写到 AWS，可启动测试/切换执行个体。",
    "use_cases": [
      "大量伺服器 lift-and-shift",
      "最短停机切换",
      "搭配 Migration Hub 追踪状态"
    ],
    "related_questions": [
      174,
      203,
      211,
      229,
      258,
      292,
      300,
      302,
      356,
      423,
      439,
      466,
      497,
      502,
      515,
      528
    ],
    "question_count": 16
  },
  {
    "id": "appsync",
    "name": "AWS AppSync",
    "full_name": "AWS AppSync",
    "abbr": "AppSync",
    "aliases": [
      "AppSync"
    ],
    "category": "integration",
    "function": "全受管的 GraphQL 服务，简化应用程式资料存取和即时订阅。",
    "use_cases": [
      "行动应用后端",
      "即时资料同步",
      "多资料源聚合"
    ],
    "related_questions": [
      26,
      258,
      271,
      285,
      330
    ],
    "question_count": 5
  },
  {
    "id": "backup",
    "name": "AWS Backup",
    "full_name": "AWS Backup",
    "abbr": "Backup",
    "aliases": [
      "Backup"
    ],
    "category": "storage",
    "function": "集中式备份服务，跨 AWS 服务自动化和统一管理备份策略。",
    "use_cases": [
      "跨服务备份",
      "合规保留",
      "跨区域备份复制"
    ],
    "related_questions": [
      8,
      62,
      67,
      76,
      102,
      119,
      160,
      169,
      171,
      175,
      193,
      202,
      204,
      213,
      231,
      234,
      238,
      296,
      298,
      308
    ],
    "question_count": 37
  },
  {
    "id": "batch",
    "name": "AWS Batch",
    "full_name": "AWS Batch",
    "abbr": "Batch",
    "aliases": [
      "Batch"
    ],
    "category": "compute",
    "function": "全受管的批次处理服务，自动布建运算资源以执行大规模批次工作。",
    "use_cases": [
      "基因序列分析",
      "财务风险建模",
      "媒体转档"
    ],
    "related_questions": [
      23,
      75,
      91,
      134,
      138,
      174,
      192,
      256,
      291,
      376,
      397,
      417,
      456,
      457,
      485
    ],
    "question_count": 15
  },
  {
    "id": "cdk",
    "name": "AWS CDK",
    "full_name": "AWS Cloud Development Kit",
    "abbr": "CDK",
    "aliases": [
      "CDK"
    ],
    "category": "devops",
    "function": "使用熟悉的程式语言（TypeScript、Python 等）定义云端基础设施，生成 CloudFormation。",
    "use_cases": [
      "程式化 IaC",
      "高阶抽象元件",
      "单元测试基础设施"
    ],
    "related_questions": [
      234,
      435,
      493
    ],
    "question_count": 3
  },
  {
    "id": "acm",
    "name": "AWS Certificate Manager",
    "full_name": "AWS Certificate Manager",
    "abbr": "ACM",
    "aliases": [
      "AWS Certificate Manager",
      "ACM"
    ],
    "category": "security",
    "function": "免费提供、部署和管理 SSL/TLS 凭证。",
    "use_cases": [
      "ALB/CloudFront HTTPS",
      "自动凭证续期"
    ],
    "related_questions": [
      28,
      49,
      470,
      495,
      509
    ],
    "question_count": 5
  },
  {
    "id": "client-vpn",
    "name": "AWS Client VPN",
    "full_name": "AWS Client VPN",
    "abbr": "Client VPN",
    "aliases": [
      "Client VPN"
    ],
    "category": "networking",
    "function": "受管的 VPN 服务，让远端使用者安全存取 AWS 和本地资源。",
    "use_cases": [
      "远端员工存取",
      "开发者连线 VPC"
    ],
    "related_questions": [
      20,
      99,
      369,
      398,
      476
    ],
    "question_count": 5
  },
  {
    "id": "cloudformation",
    "name": "AWS CloudFormation",
    "full_name": "AWS CloudFormation",
    "abbr": "CloudFormation",
    "aliases": [
      "AWS CloudFormation",
      "CloudFormation"
    ],
    "category": "devops",
    "function": "基础设施即程式码（IaC）服务，使用 YAML/JSON 范本布建和管理 AWS 资源。",
    "use_cases": [
      "可重复部署",
      "StackSet 多帐户",
      "Drift Detection"
    ],
    "related_questions": [
      19,
      26,
      30,
      37,
      38,
      60,
      74,
      84,
      85,
      89,
      110,
      128,
      168,
      177,
      181,
      204,
      215,
      222,
      234,
      269
    ],
    "question_count": 47
  },
  {
    "id": "cloudhsm",
    "name": "AWS CloudHSM",
    "full_name": "AWS CloudHSM",
    "abbr": "CloudHSM",
    "aliases": [
      "CloudHSM"
    ],
    "category": "security",
    "function": "专用硬体安全模组（HSM），在 AWS 云端中提供金钥储存和密码编译操作。",
    "use_cases": [
      "FIPS 140-2 Level 3 合规",
      "自管金钥",
      "金融/政府合规"
    ],
    "related_questions": [
      256
    ],
    "question_count": 1
  },
  {
    "id": "cloudtrail",
    "name": "AWS CloudTrail",
    "full_name": "AWS CloudTrail",
    "abbr": "CloudTrail",
    "aliases": [
      "CloudTrail"
    ],
    "category": "management",
    "function": "记录 AWS 帐户的 API 呼叫活动，提供操作审计追踪。",
    "use_cases": [
      "安全分析",
      "合规审计",
      "操作故障排除",
      "跨帐户追踪"
    ],
    "related_questions": [
      57,
      90,
      117,
      118,
      129,
      173,
      197,
      219,
      252,
      262,
      306,
      321,
      357,
      362,
      370,
      381,
      418,
      464,
      475,
      510
    ],
    "question_count": 22
  },
  {
    "id": "codebuild",
    "name": "AWS CodeBuild",
    "full_name": "AWS CodeBuild",
    "abbr": "CodeBuild",
    "aliases": [
      "CodeBuild"
    ],
    "category": "devops",
    "function": "全受管的建置服务，编译原始码、执行测试并产出部署成品。",
    "use_cases": [
      "CI 建置",
      "Docker 映像档建置",
      "搭配 CodePipeline"
    ],
    "related_questions": [
      171,
      267,
      344,
      363,
      415,
      493
    ],
    "question_count": 6
  },
  {
    "id": "codedeploy",
    "name": "AWS CodeDeploy",
    "full_name": "AWS CodeDeploy",
    "abbr": "CodeDeploy",
    "aliases": [
      "AWS CodeDeploy",
      "CodeDeploy"
    ],
    "category": "devops",
    "function": "自动化部署服务，将应用程式部署至 EC2、Lambda、ECS 和本地伺服器。",
    "use_cases": [
      "蓝绿部署",
      "滚动更新",
      "ECS 部署"
    ],
    "related_questions": [
      19,
      60,
      134,
      267,
      344,
      363,
      415,
      493
    ],
    "question_count": 8
  },
  {
    "id": "codepipeline",
    "name": "AWS CodePipeline",
    "full_name": "AWS CodePipeline",
    "abbr": "CodePipeline",
    "aliases": [
      "CodePipeline"
    ],
    "category": "devops",
    "function": "全受管的 CI/CD 服务，自动化软体发布流程。",
    "use_cases": [
      "原始码至部署管线",
      "多阶段审批",
      "跨帐户部署"
    ],
    "related_questions": [
      234,
      267,
      296,
      344,
      363,
      415,
      493
    ],
    "question_count": 7
  },
  {
    "id": "compute-optimizer",
    "name": "AWS Compute Optimizer",
    "full_name": "AWS Compute Optimizer",
    "abbr": "Compute Optimizer",
    "aliases": [
      "AWS Compute Optimizer",
      "Compute Optimizer",
      "compute optimizer",
      "ComputeOptimizer",
      "运算优化器",
      "计算优化器"
    ],
    "category": "management",
    "function": "免费（需 opt-in）的运算资源 rightsizing 建议服务。分析 CloudWatch 指标与使用模式，对 EC2、EBS、Lambda、Auto Scaling、ECS on Fargate 等提出「过度配置／不足／已优化」建议，并可估算节省成本。提供主控台检视与汇出 API（例如 ExportLambdaFunctionRecommendations 汇出 CSV 到 S3），可搭配 EventBridge + Lambda 排程汇出。",
    "use_cases": [
      "EC2 / Lambda 规格 rightsizing",
      "降低过度配置成本",
      "汇出建议报告做定期审核",
      "第 54 题：EventBridge 每 2 周呼叫 ExportLambdaFunctionRecommendations 汇出 CSV",
      "搭配 CloudWatch agent 补记忆体指标后再分析"
    ],
    "related_questions": [
      54,
      130,
      170
    ],
    "question_count": 3
  },
  {
    "id": "config",
    "name": "AWS Config",
    "full_name": "AWS Config",
    "abbr": "Config",
    "aliases": [
      "AWS Config",
      "Config"
    ],
    "category": "management",
    "function": "追踪 AWS 资源组态变更，评估是否符合合规规则。",
    "use_cases": [
      "组态历史记录",
      "合规规则评估",
      "资源关系图"
    ],
    "related_questions": [
      3,
      5,
      7,
      8,
      9,
      10,
      11,
      12,
      15,
      16,
      20,
      21,
      25,
      27,
      28,
      29,
      33,
      36,
      39,
      41
    ],
    "question_count": 324
  },
  {
    "id": "control-tower",
    "name": "AWS Control Tower",
    "full_name": "AWS Control Tower",
    "abbr": "Control Tower",
    "aliases": [
      "AWS Control Tower"
    ],
    "category": "management",
    "function": "自动化多帐户 AWS 环境设定的最简方式，实施治理最佳实践。",
    "use_cases": [
      "Landing Zone 建立",
      "帐户自动布建",
      "合规监控"
    ],
    "related_questions": [
      64,
      84,
      85,
      110,
      118,
      131,
      168,
      174,
      226,
      270,
      328,
      334,
      338,
      370,
      410,
      419
    ],
    "question_count": 16
  },
  {
    "id": "datasync",
    "name": "AWS DataSync",
    "full_name": "AWS DataSync",
    "abbr": "DataSync",
    "aliases": [
      "DataSync"
    ],
    "category": "migration",
    "function": "线上资料传输服务，在本地储存和 AWS 服务之间高效移动资料。",
    "use_cases": [
      "NAS 至 S3/EFS 迁移",
      "排程传输",
      "验证传输完整性"
    ],
    "related_questions": [
      35,
      62,
      102,
      138,
      146,
      165,
      193,
      203,
      204,
      212,
      234,
      302,
      331,
      352,
      359,
      389,
      393,
      420,
      425,
      429
    ],
    "question_count": 24
  },
  {
    "id": "direct-connect",
    "name": "AWS Direct Connect",
    "full_name": "AWS Direct Connect",
    "abbr": "DX",
    "aliases": [
      "AWS Direct Connect",
      "Direct Connect",
      "DX",
      "dx",
      "AWS DX"
    ],
    "category": "networking",
    "function": "专用网路连线（简称 DX），从地端机房／资料中心用专线直连 AWS，不走公共互联网，延迟更稳、频宽更可预期。常与 Transit Gateway（TGW）一齐做混合云骨干。",
    "use_cases": [
      "混合云",
      "稳定频宽",
      "搭配 Transit Gateway（TGW）",
      "地端 DNS／资料库存取 AWS 私有资源"
    ],
    "related_questions": [
      1,
      17,
      35,
      93,
      116,
      123,
      138,
      161,
      188,
      198,
      203,
      212,
      215,
      231,
      232,
      283,
      292,
      302,
      322,
      325
    ],
    "question_count": 37
  },
  {
    "id": "directory-service",
    "name": "AWS Directory Service",
    "full_name": "AWS Directory Service",
    "abbr": "Directory Service",
    "aliases": [
      "Directory Service",
      "Active Directory"
    ],
    "category": "security",
    "function": "在 AWS 中托管 Microsoft Active Directory 或连接本地 AD。",
    "use_cases": [
      "企业 AD 整合",
      "WorkSpaces 验证",
      "跨帐户目录共享"
    ],
    "related_questions": [
      21,
      70,
      139,
      193,
      261,
      280,
      319,
      322,
      326,
      334,
      371,
      402,
      476,
      517
    ],
    "question_count": 14
  },
  {
    "id": "fargate",
    "name": "AWS Fargate",
    "full_name": "AWS Fargate",
    "abbr": "Fargate",
    "aliases": [
      "Fargate"
    ],
    "category": "compute",
    "function": "无伺服器容器运算引擎，让您无需管理 EC2 执行个体即可运行容器。",
    "use_cases": [
      "ECS/EKS 无伺服器部署",
      "减少基础设施管理负担"
    ],
    "related_questions": [
      7,
      45,
      63,
      68,
      106,
      117,
      122,
      127,
      134,
      146,
      147,
      152,
      156,
      180,
      183,
      191,
      223,
      225,
      228,
      280
    ],
    "question_count": 36
  },
  {
    "id": "global-accelerator",
    "name": "AWS Global Accelerator",
    "full_name": "AWS Global Accelerator",
    "abbr": "Global Accelerator",
    "aliases": [
      "AWS Global Accelerator",
      "Global Accelerator"
    ],
    "category": "networking",
    "function": "透过 AWS 全球网路将流量路由至最佳端点，提供固定 Anycast IP。",
    "use_cases": [
      "全球应用加速",
      "多区域故障转移",
      "UDP/TCP 加速"
    ],
    "related_questions": [
      8,
      27,
      52,
      56,
      81,
      107,
      143,
      155,
      167,
      169,
      194,
      208,
      209,
      218,
      312,
      384,
      426,
      481
    ],
    "question_count": 18
  },
  {
    "id": "glue",
    "name": "AWS Glue",
    "full_name": "AWS Glue",
    "abbr": "Glue",
    "aliases": [
      "Glue"
    ],
    "category": "analytics",
    "function": "全受管的 ETL 服务，提供资料目录、爬虫和 Spark 作业执行。",
    "use_cases": [
      "资料湖 ETL",
      "结构化资料转换",
      "Schema 探索"
    ],
    "related_questions": [
      46,
      92,
      122,
      147,
      241,
      281,
      325,
      497
    ],
    "question_count": 8
  },
  {
    "id": "iam",
    "name": "AWS IAM",
    "full_name": "AWS Identity and Access Management",
    "abbr": "IAM",
    "aliases": [
      "AWS Identity and Access Management",
      "IAM"
    ],
    "category": "security",
    "function": "管理 AWS 资源存取权限，透过使用者、群组、角色和政策控制身分验证与授权。",
    "use_cases": [
      "最小权限原则",
      "跨帐户角色",
      "服务角色",
      "S3 储存贮体政策"
    ],
    "related_questions": [
      6,
      21,
      31,
      32,
      55,
      57,
      58,
      59,
      62,
      65,
      66,
      70,
      74,
      78,
      84,
      85,
      89,
      96,
      98,
      101
    ],
    "question_count": 88
  },
  {
    "id": "sso",
    "name": "AWS IAM Identity Center",
    "full_name": "AWS IAM Identity Center (formerly AWS SSO)",
    "abbr": "SSO",
    "aliases": [
      "SSO"
    ],
    "category": "security",
    "function": "集中管理多个 AWS 帐户和应用程式的单一登入存取。",
    "use_cases": [
      "多帐户存取",
      "SAML/OIDC 整合",
      "权限集管理"
    ],
    "related_questions": [
      1,
      5,
      6,
      7,
      11,
      12,
      15,
      17,
      24,
      30,
      39,
      47,
      49,
      56,
      87,
      110,
      116,
      118,
      123,
      130
    ],
    "question_count": 67
  },
  {
    "id": "kms",
    "name": "AWS KMS",
    "full_name": "AWS Key Management Service",
    "abbr": "KMS",
    "aliases": [
      "AWS Key Management Service",
      "KMS"
    ],
    "category": "security",
    "function": "建立和管理加密金钥，与 AWS 服务整合实现静态和传输中加密。",
    "use_cases": [
      "S3/RDS/EBS 加密",
      "跨帐户金钥共享",
      "CloudTrail 日志加密"
    ],
    "related_questions": [
      51,
      91,
      96,
      101,
      110,
      111,
      131,
      137,
      182,
      205,
      206,
      210,
      242,
      256,
      303,
      317,
      393,
      409,
      453,
      495
    ],
    "question_count": 21
  },
  {
    "id": "lake-formation",
    "name": "AWS Lake Formation",
    "full_name": "AWS Lake Formation",
    "abbr": "Lake Formation",
    "aliases": [
      "Lake Formation"
    ],
    "category": "analytics",
    "function": "简化资料湖的建立、管理和保护，集中管理资料存取权限。",
    "use_cases": [
      "资料湖治理",
      "精细存取控制",
      "Glue 整合"
    ],
    "related_questions": [],
    "question_count": 0
  },
  {
    "id": "lambda",
    "name": "AWS Lambda",
    "full_name": "AWS Lambda",
    "abbr": "Lambda",
    "aliases": [
      "AWS Lambda",
      "Lambda"
    ],
    "category": "compute",
    "function": "无伺服器运算服务，以事件驱动方式执行程式码，仅按实际执行时间计费。",
    "use_cases": [
      "API 后端",
      "事件触发处理",
      "搭配 API Gateway",
      "S3 事件处理"
    ],
    "related_questions": [
      2,
      5,
      7,
      8,
      10,
      14,
      18,
      19,
      22,
      26,
      27,
      28,
      29,
      33,
      36,
      42,
      44,
      45,
      47,
      48
    ],
    "question_count": 189
  },
  {
    "id": "migration-hub",
    "name": "AWS Migration Hub",
    "full_name": "AWS Migration Hub",
    "abbr": "Migration Hub",
    "aliases": [
      "AWS Migration Hub",
      "Migration Hub",
      "migration hub",
      "迁移中心"
    ],
    "category": "migration",
    "function": "集中追踪与管理迁移进度的控制台。可汇入 Application Discovery Service 等工具收集的伺服器/应用资料，建立应用分组与迁移状态，并支援 Data Exploration（资料探索）把探索资料汇出到 S3，再用 Athena 查询分析。",
    "use_cases": [
      "统一检视多工具迁移进度",
      "伺服器分组成应用",
      "Data Exploration + Athena 分析",
      "第 46 题：探索后用 Athena 查询 S3 资料"
    ],
    "related_questions": [
      39,
      46,
      174,
      211,
      300,
      353,
      356,
      383,
      423,
      466,
      487,
      515
    ],
    "question_count": 12
  },
  {
    "id": "opsworks",
    "name": "AWS OpsWorks",
    "full_name": "AWS OpsWorks",
    "abbr": "OpsWorks",
    "aliases": [
      "OpsWorks"
    ],
    "category": "devops",
    "function": "组态管理服务，支援 Chef 和 Puppet 自动化伺服器组态。",
    "use_cases": [
      "旧版组态管理",
      "分层应用部署"
    ],
    "related_questions": [
      13,
      363
    ],
    "question_count": 2
  },
  {
    "id": "organizations",
    "name": "AWS Organizations",
    "full_name": "AWS Organizations",
    "abbr": "Organizations",
    "aliases": [
      "AWS Organizations"
    ],
    "category": "management",
    "function": "集中管理多个 AWS 帐户，提供 OU 分层、SCP 和整合帐单。",
    "use_cases": [
      "多帐户策略",
      "OU 结构",
      "SCP 权限限制",
      "跨帐户资源共享"
    ],
    "related_questions": [
      3,
      11,
      21,
      29,
      30,
      31,
      32,
      34,
      38,
      44,
      53,
      57,
      64,
      66,
      67,
      70,
      79,
      84,
      85,
      88
    ],
    "question_count": 87
  },
  {
    "id": "outposts",
    "name": "AWS Outposts",
    "full_name": "AWS Outposts",
    "abbr": "Outposts",
    "aliases": [
      "Outposts"
    ],
    "category": "compute",
    "function": "将 AWS 基础设施和服务延伸至本地资料中心，提供一致的混合云体验。",
    "use_cases": [
      "低延迟本地处理",
      "资料落地合规",
      "混合云架构"
    ],
    "related_questions": [
      188,
      401,
      445
    ],
    "question_count": 3
  },
  {
    "id": "privatelink",
    "name": "AWS PrivateLink",
    "full_name": "AWS PrivateLink",
    "abbr": "PrivateLink",
    "aliases": [
      "PrivateLink"
    ],
    "category": "networking",
    "function": "透过私有 IP 安全存取 AWS 服务和其他 VPC 服务，流量不经公共网际网路。",
    "use_cases": [
      "SaaS 服务私有存取",
      "跨帐户服务共享",
      "合规要求"
    ],
    "related_questions": [
      12,
      172,
      230,
      247,
      255,
      331,
      361,
      389,
      393,
      431,
      440,
      446,
      471,
      514
    ],
    "question_count": 14
  },
  {
    "id": "ram",
    "name": "AWS RAM",
    "full_name": "AWS Resource Access Manager",
    "abbr": "RAM",
    "aliases": [
      "AWS Resource Access Manager (AWS RAM)",
      "RAM"
    ],
    "category": "management",
    "function": "跨帐户安全共享 AWS 资源，无需复制资源。",
    "use_cases": [
      "共享 Transit Gateway",
      "共享子网路",
      "共享 Route 53 Resolver"
    ],
    "related_questions": [
      11,
      26,
      30,
      34,
      46,
      53,
      60,
      67,
      98,
      101,
      110,
      111,
      112,
      128,
      131,
      134,
      140,
      154,
      163,
      181
    ],
    "question_count": 61
  },
  {
    "id": "region",
    "name": "AWS Region",
    "full_name": "AWS Region",
    "abbr": "Region",
    "aliases": [
      "Region",
      "Regions"
    ],
    "category": "concepts",
    "function": "AWS 全球基础设施的地理区域，包含多个可用区域，资源预设不跨 Region 复制。",
    "use_cases": [
      "资料落地合规",
      "延迟优化",
      "灾难复原（跨区域）"
    ],
    "related_questions": [
      2,
      8,
      17,
      23,
      24,
      25,
      36,
      37,
      48,
      52,
      62,
      69,
      71,
      72,
      76,
      81,
      84,
      85,
      87,
      93
    ],
    "question_count": 122
  },
  {
    "id": "sam",
    "name": "AWS SAM",
    "full_name": "AWS Serverless Application Model",
    "abbr": "SAM",
    "aliases": [
      "SAM"
    ],
    "category": "devops",
    "function": "无伺服器应用程式框架，扩展 CloudFormation 简化 Lambda 应用部署。",
    "use_cases": [
      "Lambda + API Gateway 部署",
      "本地测试",
      "CI/CD 整合"
    ],
    "related_questions": [
      8,
      9,
      11,
      17,
      19,
      21,
      23,
      61,
      69,
      87,
      91,
      97,
      110,
      111,
      113,
      116,
      120,
      128,
      135,
      139
    ],
    "question_count": 63
  },
  {
    "id": "schema-conversion-tool",
    "name": "AWS Schema Conversion Tool",
    "full_name": "AWS Schema Conversion Tool",
    "abbr": "SCT",
    "aliases": [
      "Schema Conversion Tool",
      "schema conversion tool",
      "AWS Schema Conversion Tool",
      "AWS SCT",
      "结构转换工具"
    ],
    "category": "migration",
    "function": "将来源资料库 Schema（如 Oracle/SQL Server）转换为目标资料库（如 Aurora PostgreSQL）相容格式，并评估转换相容性。",
    "use_cases": [
      "异质资料库迁移",
      "搭配 DMS",
      "迁移前评估"
    ],
    "related_questions": [
      102,
      148,
      214,
      229,
      275,
      452,
      497,
      502
    ],
    "question_count": 8
  },
  {
    "id": "secrets-manager",
    "name": "AWS Secrets Manager",
    "full_name": "AWS Secrets Manager",
    "abbr": "Secrets Manager",
    "aliases": [
      "AWS Secrets Manager",
      "Secrets Manager"
    ],
    "category": "security",
    "function": "集中管理资料库凭证、API 金钥等机密，支援自动轮换。",
    "use_cases": [
      "RDS 凭证自动轮换",
      "应用程式密钥管理"
    ],
    "related_questions": [
      26,
      111,
      131,
      163,
      201,
      206,
      210,
      214,
      242,
      317,
      321,
      409,
      427,
      482,
      489
    ],
    "question_count": 15
  },
  {
    "id": "security-hub",
    "name": "AWS Security Hub",
    "full_name": "AWS Security Hub",
    "abbr": "Security Hub",
    "aliases": [
      "Security Hub"
    ],
    "category": "security",
    "function": "集中检视和管理安全警示，聚合 GuardDuty、Inspector、Macie 等发现。",
    "use_cases": [
      "安全态势总览",
      "合规标准检查",
      "跨帐户安全聚合"
    ],
    "related_questions": [
      113,
      118,
      199,
      270,
      419,
      478
    ],
    "question_count": 6
  },
  {
    "id": "sms",
    "name": "AWS Server Migration Service",
    "full_name": "AWS Server Migration Service (SMS)",
    "abbr": "SMS",
    "aliases": [
      "AWS Server Migration Service",
      "Server Migration Service",
      "AWS SMS",
      "Server Migration Service (AWS SMS)",
      "伺服器迁移服务"
    ],
    "category": "migration",
    "function": "旧版伺服器迁移服务（多用于 VM 映像增量复写）。新迁移应优先用 Application Migration Service（MGN）；考题仍可能出现 SMS 作为干扰选项。",
    "use_cases": [
      "历史题干中的 VM 迁移",
      "与 MGN 对比选型"
    ],
    "related_questions": [
      174,
      211,
      339,
      353,
      425
    ],
    "question_count": 5
  },
  {
    "id": "service-catalog",
    "name": "AWS Service Catalog",
    "full_name": "AWS Service Catalog",
    "abbr": "Service Catalog",
    "aliases": [
      "AWS Service Catalog"
    ],
    "category": "management",
    "function": "让组织建立和管理已核准的 IT 服务目录，使用者可自助布建。",
    "use_cases": [
      "标准化资源布建",
      "CloudFormation 产品目录"
    ],
    "related_questions": [
      3,
      30,
      174,
      269,
      294,
      336,
      360,
      386,
      417,
      508
    ],
    "question_count": 10
  },
  {
    "id": "shield",
    "name": "AWS Shield",
    "full_name": "AWS Shield",
    "abbr": "Shield",
    "aliases": [
      "Shield"
    ],
    "category": "security",
    "function": "DDoS 防护服务，Standard 免费，Advanced 提供进阶防护和 DDoS Response Team。",
    "use_cases": [
      "CloudFront/Route 53/ALB/NLB 防护"
    ],
    "related_questions": [
      159,
      199,
      248,
      388,
      427,
      500
    ],
    "question_count": 6
  },
  {
    "id": "snowball",
    "name": "AWS Snowball",
    "full_name": "AWS Snowball",
    "abbr": "Snowball",
    "aliases": [
      "Snowball"
    ],
    "category": "storage",
    "function": "实体资料传输装置，用于大规模资料迁移至 AWS（离线传输）。",
    "use_cases": [
      "PB 级资料迁移",
      "边缘运算",
      "离线环境资料汇入"
    ],
    "related_questions": [
      93,
      102,
      122,
      138,
      157,
      188,
      203,
      302,
      339,
      359,
      393,
      420,
      449,
      503
    ],
    "question_count": 14
  },
  {
    "id": "step-functions",
    "name": "AWS Step Functions",
    "full_name": "AWS Step Functions",
    "abbr": "Step Functions",
    "aliases": [
      "AWS Step Functions",
      "Step Functions"
    ],
    "category": "integration",
    "function": "视觉化工作流程服务，协调多个 AWS 服务组成伺服器less 应用。",
    "use_cases": [
      "订单处理流程",
      "ETL 编排",
      "人工审核步骤",
      "错误重试"
    ],
    "related_questions": [
      63,
      94,
      100,
      117,
      134,
      138,
      144,
      171,
      187,
      224,
      266,
      271,
      277,
      342,
      374,
      376,
      404,
      408,
      414,
      456
    ],
    "question_count": 23
  },
  {
    "id": "storage-gateway",
    "name": "AWS Storage Gateway",
    "full_name": "AWS Storage Gateway",
    "abbr": "Storage Gateway",
    "aliases": [
      "Storage Gateway"
    ],
    "category": "storage",
    "function": "混合云储存服务，连接本地环境与 AWS 云端储存。",
    "use_cases": [
      "本地快取 + S3 备份",
      "磁带替换",
      "灾难复原"
    ],
    "related_questions": [
      23,
      35,
      61,
      62,
      93,
      138,
      148,
      174,
      182,
      231,
      234,
      310,
      331,
      369,
      394,
      425,
      429,
      457,
      494,
      504
    ],
    "question_count": 21
  },
  {
    "id": "sts",
    "name": "AWS STS",
    "full_name": "AWS Security Token Service",
    "abbr": "STS",
    "aliases": [
      "STS"
    ],
    "category": "security",
    "function": "发放临时、有限权限的安全凭证，用于跨帐户存取和联合身分。",
    "use_cases": [
      "AssumeRole 跨帐户",
      "联合身分验证",
      "临时凭证"
    ],
    "related_questions": [
      4,
      5,
      16,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25,
      27,
      28,
      34,
      39,
      42,
      43,
      45,
      46,
      47
    ],
    "question_count": 180
  },
  {
    "id": "systems-manager",
    "name": "AWS Systems Manager",
    "full_name": "AWS Systems Manager",
    "abbr": "Systems Manager",
    "aliases": [
      "AWS Systems Manager"
    ],
    "category": "management",
    "function": "统一管理 AWS 和混合环境中的操作，包含 Patch Manager、Parameter Store 等。",
    "use_cases": [
      "执行个体管理",
      "Patch 管理",
      "Session Manager 远端连线",
      "自动化文件"
    ],
    "related_questions": [
      13,
      14,
      26,
      34,
      39,
      58,
      62,
      65,
      86,
      109,
      110,
      111,
      130,
      163,
      201,
      204,
      206,
      210,
      211,
      214
    ],
    "question_count": 38
  },
  {
    "id": "transfer-family",
    "name": "AWS Transfer Family",
    "full_name": "AWS Transfer Family",
    "abbr": "Transfer Family",
    "aliases": [
      "AWS Transfer Family"
    ],
    "category": "integration",
    "function": "全受管的 SFTP/FTPS/FTP 服务，将档案直接传输至 S3 或 EFS。",
    "use_cases": [
      "合作伙伴 B2B 档案交换",
      "取代本地 SFTP 伺服器"
    ],
    "related_questions": [
      145,
      290,
      292,
      389,
      482
    ],
    "question_count": 5
  },
  {
    "id": "transit-gateway",
    "name": "AWS Transit Gateway",
    "full_name": "AWS Transit Gateway",
    "abbr": "TGW",
    "aliases": [
      "AWS Transit Gateway",
      "Transit Gateway",
      "TGW",
      "tgw",
      "Transit GW",
      "中转网关",
      "中转闸道"
    ],
    "category": "networking",
    "function": "中枢网路闸道（简称 TGW），像云端里的「路由器汇流排」，把多个 VPC、地端网路（经 DX/VPN）接到同一个中心再转发，避免 VPC 两两 Peering 的复杂网状连线。比 VGW 更适合「地端一次连入、通多个 VPC」。",
    "use_cases": [
      "大型企业网路",
      "取代复杂 VPC Peering",
      "集中路由管理",
      "搭配 Direct Connect（DX）混合云",
      "第 77 题：VPN + VPC A + VPC B 统一 attach"
    ],
    "related_questions": [
      1,
      11,
      17,
      30,
      53,
      77,
      99,
      116,
      118,
      121,
      123,
      131,
      181,
      215,
      216,
      218,
      232,
      247,
      279,
      316
    ],
    "question_count": 31
  },
  {
    "id": "trusted-advisor",
    "name": "AWS Trusted Advisor",
    "full_name": "AWS Trusted Advisor",
    "abbr": "Trusted Advisor",
    "aliases": [
      "AWS Trusted Advisor",
      "Trusted Advisor",
      "trusted advisor",
      "TrustedAdvisor",
      "可信顾问"
    ],
    "category": "management",
    "function": "依 AWS 最佳实践扫描帐户，提供成本优化、效能、安全、容错、服务配额等检查建议（例如低利用率 EC2、开放安全群组、S3 桶权限）。Basic／Developer 支援仅有限免费检查；Business／Enterprise 才有完整检查。可开 Organizations 组织视图做跨帐户报告与通知；部分结果可经 EventBridge 触发自动化。不是 Cost Explorer／CUR 的帐单明细工具，也不是 Compute Optimizer 那种基于 CloudWatch 的深度 rightsizing 引擎。",
    "use_cases": [
      "低利用率 EC2／未使用 EBS 等成本检查",
      "S3 桶权限等安全检查",
      "组织视图：管理帐户看全组织 cost optimization 报告",
      "EventBridge + Lambda 依检查结果自动停机",
      "考试对比：需细粒度 S3 用量趋势 → Storage Lens；需 Lambda／EC2 规格建议汇出 → Compute Optimizer；需按 tag 帐单 → Cost Explorer／Cost Categories"
    ],
    "related_questions": [
      29,
      39,
      54,
      83,
      130,
      170,
      226,
      274,
      328,
      373,
      407,
      524
    ],
    "question_count": 12
  },
  {
    "id": "waf",
    "name": "AWS WAF",
    "full_name": "AWS Web Application Firewall",
    "abbr": "WAF",
    "aliases": [
      "WAF"
    ],
    "category": "security",
    "function": "Web 应用防火墙，保护应用免受常见 Web 攻击（SQL 注入、XSS 等）。",
    "use_cases": [
      "搭配 CloudFront/ALB",
      "速率限制",
      "地理封锁"
    ],
    "related_questions": [
      97,
      110,
      159,
      162,
      167,
      183,
      189,
      199,
      217,
      248,
      251,
      260,
      301,
      387,
      388,
      418,
      427,
      470,
      488,
      500
    ],
    "question_count": 21
  },
  {
    "id": "xray",
    "name": "AWS X-Ray",
    "full_name": "AWS X-Ray",
    "abbr": "X-Ray",
    "aliases": [
      "X-Ray"
    ],
    "category": "analytics",
    "function": "分散式追踪服务，分析和侦错生产环境中的微服务应用。",
    "use_cases": [
      "请求延迟分析",
      "服务地图",
      "错误根因分析"
    ],
    "related_questions": [
      13,
      80,
      259,
      343,
      353,
      381,
      415
    ],
    "question_count": 7
  },
  {
    "id": "bgp",
    "name": "BGP",
    "full_name": "Border Gateway Protocol",
    "abbr": "BGP",
    "aliases": [
      "BGP"
    ],
    "category": "protocols",
    "function": "网际网路路由协定，Direct Connect 使用 BGP 在本地和 AWS 之间交换路由。",
    "use_cases": [
      "Direct Connect 路由传播",
      "VPN 动态路由"
    ],
    "related_questions": [
      77,
      451
    ],
    "question_count": 2
  },
  {
    "id": "cicd",
    "name": "CI/CD",
    "full_name": "Continuous Integration / Continuous Delivery",
    "abbr": "CI/CD",
    "aliases": [
      "CI/CD",
      "DevOps"
    ],
    "category": "concepts",
    "function": "持续整合和持续交付实践，自动化建置、测试和部署流程。",
    "use_cases": [
      "CodePipeline 管线",
      "蓝绿/金丝雀部署"
    ],
    "related_questions": [
      86,
      307,
      344,
      363,
      373,
      415,
      459,
      493
    ],
    "question_count": 8
  },
  {
    "id": "cidr",
    "name": "CIDR",
    "full_name": "Classless Inter-Domain Routing",
    "abbr": "CIDR",
    "aliases": [
      "CIDR"
    ],
    "category": "protocols",
    "function": "IP 位址分配和路由聚合方法，用于定义 VPC 子网路范围。",
    "use_cases": [
      "VPC 子网路规划",
      "路由表设定",
      "安全群组规则"
    ],
    "related_questions": [
      11,
      56,
      90,
      98,
      128,
      172,
      181,
      248,
      293,
      304,
      365,
      398,
      431,
      446,
      522
    ],
    "question_count": 15
  },
  {
    "id": "clb",
    "name": "Classic Load Balancer",
    "full_name": "Classic Load Balancer",
    "abbr": "CLB",
    "aliases": [
      "CLB",
      "Elastic Load Balancing"
    ],
    "category": "networking",
    "function": "旧版负载平衡器，支援第四层和基本第七层路由（建议新部署使用 ALB/NLB）。",
    "use_cases": [
      "旧版 EC2-Classic 环境",
      "简单 TCP/HTTP 负载平衡"
    ],
    "related_questions": [
      4,
      332,
      481
    ],
    "question_count": 3
  },
  {
    "id": "cors",
    "name": "CORS",
    "full_name": "Cross-Origin Resource Sharing",
    "abbr": "CORS",
    "aliases": [
      "CORS"
    ],
    "category": "protocols",
    "function": "浏览器安全机制，控制网页从不同来源请求资源的权限。",
    "use_cases": [
      "S3 储存贮体 CORS 设定",
      "API Gateway 跨域"
    ],
    "related_questions": [
      6,
      260,
      343
    ],
    "question_count": 3
  },
  {
    "id": "cgw",
    "name": "Customer Gateway（CGW）",
    "full_name": "Customer Gateway",
    "abbr": "CGW",
    "aliases": [
      "CGW",
      "cgw",
      "Customer Gateway",
      "customer gateway",
      "客户闸道",
      "客户网关"
    ],
    "category": "networking",
    "function": "在 AWS 中代表「地端 VPN 装置／路由器」的设定物件（IP、路由类型 BGP/static 等）。真正的硬体在地端；CGW 只是 AWS 侧用来建立 Site-to-Site VPN 连线的地端端点定义。云端对端则是 VGW 或 TGW 的 VPN attachment。",
    "use_cases": [
      "建立 Site-to-Site VPN",
      "记录地端公网 IP 与 BGP ASN",
      "与 VGW／TGW 配对"
    ],
    "related_questions": [
      123,
      431
    ],
    "question_count": 2
  },
  {
    "id": "disaster-recovery",
    "name": "Disaster Recovery",
    "full_name": "Disaster Recovery (DR)",
    "abbr": "DR",
    "aliases": [
      "disaster recovery",
      "Disaster Recovery",
      "DR strategy",
      "灾难复原",
      "灾难恢复"
    ],
    "category": "concepts",
    "function": "在区域级或重大故障后恢复业务运作的策略与架构，常见模式包括备份还原、Pilot Light、Warm Standby、Multi-Site Active/Active。",
    "use_cases": [
      "跨 Region 备援",
      "Route 53 Failover",
      "RTO/RPO 规划",
      "Elastic Disaster Recovery"
    ],
    "related_questions": [
      2,
      69,
      148,
      169,
      171,
      177,
      202,
      234,
      240,
      272,
      296,
      298,
      310,
      327,
      333,
      345,
      350,
      372,
      375,
      389
    ],
    "question_count": 28
  },
  {
    "id": "dns",
    "name": "DNS",
    "full_name": "Domain Name System",
    "abbr": "DNS",
    "aliases": [
      "DNS"
    ],
    "category": "protocols",
    "function": "将网域名称解析为 IP 位址的分散式命名系统。",
    "use_cases": [
      "Route 53 托管",
      "私有 DNS 区域",
      "Alias 记录"
    ],
    "related_questions": [
      1,
      2,
      8,
      10,
      15,
      24,
      28,
      33,
      36,
      50,
      52,
      60,
      61,
      107,
      142,
      155,
      167,
      169,
      190,
      192
    ],
    "question_count": 44
  },
  {
    "id": "dns-conditional-forwarder",
    "name": "DNS Conditional Forwarder",
    "full_name": "DNS Conditional Forwarder",
    "abbr": "Conditional Forwarder",
    "aliases": [
      "conditional forwarder",
      "Conditional Forwarder",
      "EC2 conditional forwarder",
      "Amazon EC2 conditional forwarder",
      "条件转发器",
      "条件式转发"
    ],
    "category": "networking",
    "function": "DNS 伺服器功能：对特定网域的查询转发至另一台 DNS 伺服器。可在地端 DNS 或自建 EC2 DNS 伺服器上设定，非 AWS 托管服务。",
    "use_cases": [
      "地端 DNS 转送查询至 Route 53 Inbound Resolver",
      "Active Directory DNS 整合",
      "自建 DNS（较高维运成本）"
    ],
    "related_questions": [
      1,
      490
    ],
    "question_count": 2
  },
  {
    "id": "docker",
    "name": "Docker",
    "full_name": "Docker",
    "abbr": "Docker",
    "aliases": [
      "Docker"
    ],
    "category": "devops",
    "function": "容器化平台，ECS/EKS/Fargate 均支援 Docker 容器部署。",
    "use_cases": [
      "容器映像档建置",
      "ECS 任务定义",
      "ECR 映像档储存"
    ],
    "related_questions": [
      63,
      127,
      138,
      156,
      191,
      299,
      307,
      316,
      333,
      355,
      411,
      477,
      493,
      511
    ],
    "question_count": 14
  },
  {
    "id": "dax",
    "name": "DynamoDB Accelerator",
    "full_name": "DynamoDB Accelerator",
    "abbr": "DAX",
    "aliases": [
      "DynamoDB Accelerator (DAX)",
      "DAX"
    ],
    "category": "database",
    "function": "DynamoDB 的记忆体内快取服务，将读取延迟降至微秒级。",
    "use_cases": [
      "读取密集型应用",
      "减少 DynamoDB 读取成本"
    ],
    "related_questions": [
      41,
      150,
      189,
      254,
      327,
      396,
      433
    ],
    "question_count": 7
  },
  {
    "id": "ebs-multi-attach",
    "name": "EBS Multi-Attach",
    "full_name": "Amazon EBS Multi-Attach",
    "abbr": "Multi-Attach",
    "aliases": [
      "multi-attach",
      "Multi-Attach",
      "EBS Multi-Attach",
      "Multi-Attach enabled",
      "多重附加"
    ],
    "category": "storage",
    "function": "允许单一 io1/io2 EBS 磁区同时挂载至多个 EC2 执行个体（需丛集感知的档案系统），适用共享区块储存场景。",
    "use_cases": [
      "丛集应用共享磁区",
      "高可用丛集",
      "注意与 EFS 场景区分"
    ],
    "related_questions": [
      23,
      175,
      191,
      228,
      290,
      448,
      461,
      503,
      507
    ],
    "question_count": 9
  },
  {
    "id": "launch-template",
    "name": "EC2 Launch Template",
    "full_name": "Amazon EC2 Launch Template",
    "abbr": "Launch Template",
    "aliases": [
      "launch template",
      "Launch Template",
      "launch templates",
      "启动范本",
      "启动模板"
    ],
    "category": "compute",
    "function": "定义 EC2 执行个体启动设定的可版本化范本（AMI、执行个体类型、IAM 角色、User Data 等），供 Auto Scaling 和 EC2 启动使用。",
    "use_cases": [
      "Auto Scaling Group 启动",
      "标准化执行个体设定",
      "蓝绿部署"
    ],
    "related_questions": [
      23,
      112,
      164,
      267,
      268,
      295,
      299,
      405,
      461,
      471,
      501
    ],
    "question_count": 11
  },
  {
    "id": "egress-only-igw",
    "name": "Egress-only Internet Gateway",
    "full_name": "Egress-only Internet Gateway",
    "abbr": "EIGW",
    "aliases": [
      "Egress-only Internet Gateway",
      "egress-only internet gateway",
      "Egress-only IGW",
      "egress-only IGW",
      "EIGW",
      "仅限输出网际网路闸道"
    ],
    "category": "networking",
    "function": "只服务 IPv6 的出站闸道：允许 VPC 内 IPv6 资源连出互联网，并阻挡互联网主动连入。不能用来给 IPv4 固定白名单出站 IP。",
    "use_cases": [
      "IPv6 私有出站",
      "第 47 题干扰项：外部服务要 IPv4 白名单时不适用"
    ],
    "related_questions": [
      47,
      365
    ],
    "question_count": 2
  },
  {
    "id": "elastic-beanstalk",
    "name": "Elastic Beanstalk",
    "full_name": "AWS Elastic Beanstalk",
    "abbr": "EB",
    "aliases": [
      "Elastic Beanstalk"
    ],
    "category": "compute",
    "function": "PaaS 服务，自动处理部署、扩展和监控，让开发者专注于程式码。",
    "use_cases": [
      "快速部署 Web 应用",
      "Tomcat/Node.js 应用托管"
    ],
    "related_questions": [
      7,
      18,
      37,
      86,
      104,
      151,
      153,
      262,
      271,
      287,
      346,
      455,
      461,
      477,
      504,
      508
    ],
    "question_count": 16
  },
  {
    "id": "eip",
    "name": "Elastic IP（EIP）",
    "full_name": "Elastic IP Address",
    "abbr": "EIP",
    "aliases": [
      "Elastic IP",
      "Elastic IP address",
      "elastic IP",
      "EIP",
      "eip",
      "弹性 IP"
    ],
    "category": "networking",
    "function": "可动态分配并重新关联的静态公网 IPv4。常绑在 NAT Gateway 或 EC2 上，让出站或入站使用固定 IP。",
    "use_cases": [
      "NAT Gateway 固定出站 IP",
      "EC2 固定公网位址",
      "白名单对接外部服务"
    ],
    "related_questions": [
      24,
      44,
      47,
      56,
      167,
      249,
      264,
      290,
      292,
      396
    ],
    "question_count": 10
  },
  {
    "id": "etl",
    "name": "ETL",
    "full_name": "Extract, Transform, Load",
    "abbr": "ETL",
    "aliases": [
      "ETL",
      "etl",
      "Extract Transform Load",
      "Extract, Transform, Load",
      "资料撷取转换载入"
    ],
    "category": "concepts",
    "function": "资料整合流程三步骤：Extract（从来源撷取资料）→ Transform（清洗、转换、汇总成目标格式）→ Load（写入资料仓储、资料湖或分析系统）。AWS 常见用 Glue 做 ETL；第 46 题干扰项用 Glue ETL + S3 Select 并非最佳分析路径。",
    "use_cases": [
      "资料湖清洗与入仓",
      "多来源合并报表",
      "Glue Job / Spark ETL",
      "与 ELT（先载入再转换）对比"
    ],
    "related_questions": [
      46,
      134,
      147,
      178,
      360,
      474
    ],
    "question_count": 6
  },
  {
    "id": "glb",
    "name": "Gateway Load Balancer",
    "full_name": "Gateway Load Balancer",
    "abbr": "GLB",
    "aliases": [
      "Gateway Load Balancer",
      "GLB"
    ],
    "category": "networking",
    "function": "第三层负载平衡器，用于部署、扩展和管理第三方虚拟网路设备。",
    "use_cases": [
      "防火墙",
      "入侵侦测",
      "深度封包检测"
    ],
    "related_questions": [
      121,
      161,
      313,
      471
    ],
    "question_count": 4
  },
  {
    "id": "gdpr",
    "name": "GDPR",
    "full_name": "General Data Protection Regulation",
    "abbr": "GDPR",
    "aliases": [
      "GDPR"
    ],
    "category": "protocols",
    "function": "欧盟一般资料保护规则，影响资料储存位置和处理方式。",
    "use_cases": [
      "欧洲资料落地",
      "资料删除权"
    ],
    "related_questions": [],
    "question_count": 0
  },
  {
    "id": "hipaa",
    "name": "HIPAA",
    "full_name": "Health Insurance Portability and Accountability Act",
    "abbr": "HIPAA",
    "aliases": [
      "HIPAA"
    ],
    "category": "protocols",
    "function": "美国医疗资料隐私法规，AWS 提供符合 HIPAA 的服务和 BAA。",
    "use_cases": [
      "医疗资料处理合规"
    ],
    "related_questions": [],
    "question_count": 0
  },
  {
    "id": "https",
    "name": "HTTPS",
    "full_name": "Hypertext Transfer Protocol Secure",
    "abbr": "HTTPS",
    "aliases": [
      "HTTPS",
      "HTTP",
      "SSL",
      "TLS"
    ],
    "category": "protocols",
    "function": "加密的 HTTP 通讯协定，使用 TLS/SSL 保护资料传输安全。",
    "use_cases": [
      "ALB/CloudFront 终端 TLS",
      "ACM 凭证",
      "强制 HTTPS 重导向"
    ],
    "related_questions": [
      4,
      5,
      8,
      10,
      27,
      28,
      45,
      49,
      73,
      78,
      107,
      111,
      123,
      147,
      161,
      163,
      180,
      182,
      183,
      190
    ],
    "question_count": 40
  },
  {
    "id": "access-analyzer",
    "name": "IAM Access Analyzer",
    "full_name": "IAM Access Analyzer",
    "abbr": "Access Analyzer",
    "aliases": [
      "Access Analyzer"
    ],
    "category": "security",
    "function": "分析资源政策，识别可被外部实体存取的资源。",
    "use_cases": [
      "S3 储存贮体公开存取侦测",
      "IAM 政策审计"
    ],
    "related_questions": [
      83,
      129,
      173,
      300
    ],
    "question_count": 4
  },
  {
    "id": "igw",
    "name": "Internet Gateway（IGW）",
    "full_name": "Amazon VPC Internet Gateway",
    "abbr": "IGW",
    "aliases": [
      "IGW",
      "igw",
      "Internet Gateway",
      "Internet gateway",
      "internet gateway",
      "互联网闸道",
      "网际网路闸道"
    ],
    "category": "networking",
    "function": "挂在 VPC 上的水平扩展、高可用闸道，让 VPC 与公网 IPv4/IPv6 双向互通。公有子网路的 0.0.0.0/0 路由通常指向 IGW；资源本身还需公有 IP/EIP 才能真正从互联网连入或直接出站。IGW 本身不会「固定」多台私有资源的共用出站 IP。",
    "use_cases": [
      "公有子网路出站/入站",
      "ALB/NAT 所在公有子网路由",
      "第 47 题干扰项：私有 Lambda 不能靠 IGW 单独固定出站 IP"
    ],
    "related_questions": [
      47,
      115,
      123,
      128,
      216,
      365,
      375,
      400,
      463,
      497
    ],
    "question_count": 10
  },
  {
    "id": "ipv6",
    "name": "IPv6",
    "full_name": "Internet Protocol version 6",
    "abbr": "IPv6",
    "aliases": [
      "IPv6"
    ],
    "category": "protocols",
    "function": "新一代网际网路协定，提供更大的位址空间，VPC 和 ELB 均支援。",
    "use_cases": [
      "VPC 双堆叠子网路",
      "NLB IPv6 支援"
    ],
    "related_questions": [
      47,
      365
    ],
    "question_count": 2
  },
  {
    "id": "json",
    "name": "JSON",
    "full_name": "JavaScript Object Notation",
    "abbr": "JSON",
    "aliases": [
      "JSON"
    ],
    "category": "protocols",
    "function": "轻量级资料交换格式，AWS 政策文件和 API 请求/回应广泛使用。",
    "use_cases": [
      "IAM/S3 政策",
      "Lambda 事件",
      "Step Functions 定义"
    ],
    "related_questions": [
      28,
      53,
      114,
      122,
      147,
      323,
      332,
      418,
      479
    ],
    "question_count": 9
  },
  {
    "id": "lambda-edge",
    "name": "Lambda@Edge",
    "full_name": "Lambda@Edge",
    "abbr": "Lambda@Edge",
    "aliases": [
      "Lambda@Edge"
    ],
    "category": "compute",
    "function": "在 CloudFront 边缘位置执行 Lambda 函数，实现低延迟请求处理。",
    "use_cases": [
      "A/B 测试",
      "URL 重写",
      "边缘授权",
      "自订标头"
    ],
    "related_questions": [
      5,
      27,
      28,
      143,
      266,
      297,
      303,
      426
    ],
    "question_count": 8
  },
  {
    "id": "mariadb",
    "name": "MariaDB",
    "full_name": "MariaDB",
    "abbr": "MariaDB",
    "aliases": [
      "MariaDB"
    ],
    "category": "database",
    "function": "MySQL 分支的开源关联式资料库，RDS 支援的引擎之一。",
    "use_cases": [
      "RDS MariaDB 执行个体"
    ],
    "related_questions": [
      9,
      318
    ],
    "question_count": 2
  },
  {
    "id": "migration-evaluator",
    "name": "Migration Evaluator",
    "full_name": "AWS Migration Evaluator",
    "abbr": "Migration Evaluator",
    "aliases": [
      "Migration Evaluator",
      "migration evaluator",
      "AWS Migration Evaluator",
      "TSO Logic",
      "迁移评估器"
    ],
    "category": "migration",
    "function": "迁移商业论证（business case）工具，用 agentless collector 或汇入资料评估地端使用率与上云成本建议，可再汇入 Migration Hub。",
    "use_cases": [
      "上云成本评估",
      "识别闲置/低利用率伺服器",
      "产出商业论证报告"
    ],
    "related_questions": [
      158,
      174,
      211,
      356,
      466,
      487,
      502,
      528
    ],
    "question_count": 8
  },
  {
    "id": "multi-az",
    "name": "Multi-AZ",
    "full_name": "Multi-Availability Zone",
    "abbr": "Multi-AZ",
    "aliases": [
      "Multi-AZ"
    ],
    "category": "concepts",
    "function": "跨多个可用区域部署资源，提供高可用性和自动故障转移。",
    "use_cases": [
      "RDS Multi-AZ",
      "NAT Gateway 高可用",
      "负载平衡跨 AZ"
    ],
    "related_questions": [
      8,
      9,
      37,
      72,
      115,
      125,
      136,
      217,
      231,
      272,
      318,
      342,
      354,
      368,
      374,
      401,
      424,
      444,
      448,
      481
    ],
    "question_count": 21
  },
  {
    "id": "mysql",
    "name": "MySQL",
    "full_name": "MySQL",
    "abbr": "MySQL",
    "aliases": [
      "MySQL"
    ],
    "category": "database",
    "function": "开源关联式资料库引擎，RDS 和 Aurora 均支援。",
    "use_cases": [
      "RDS MySQL 执行个体",
      "Aurora MySQL 丛集"
    ],
    "related_questions": [
      26,
      37,
      48,
      50,
      72,
      75,
      76,
      80,
      102,
      105,
      119,
      125,
      146,
      148,
      152,
      160,
      169,
      201,
      202,
      203
    ],
    "question_count": 53
  },
  {
    "id": "nat",
    "name": "NAT Gateway",
    "full_name": "NAT Gateway",
    "abbr": "NAT",
    "aliases": [
      "NAT Gateway",
      "NAT gateway",
      "nat gateway",
      "NAT",
      "网路位址转换闸道"
    ],
    "category": "networking",
    "function": "部署在公有子网路，让私有子网路资源出站上网，但不接受互联网主动连入。可绑定 Elastic IP，使出站来源呈现固定公网 IPv4（适合外部 API 白名单）。",
    "use_cases": [
      "私有子网路出站",
      "Lambda in VPC 固定出站 IP",
      "软体更新下载",
      "第 47 题正确解：NAT + EIP"
    ],
    "related_questions": [
      6,
      9,
      10,
      11,
      14,
      15,
      22,
      28,
      30,
      32,
      39,
      40,
      47,
      53,
      55,
      56,
      59,
      62,
      63,
      65
    ],
    "question_count": 163
  },
  {
    "id": "nlb",
    "name": "Network Load Balancer",
    "full_name": "Network Load Balancer",
    "abbr": "NLB",
    "aliases": [
      "Network Load Balancer (NLB)",
      "Network Load Balancer",
      "NLB"
    ],
    "category": "networking",
    "function": "第四层（TCP/UDP）负载平衡器，提供极低延迟和百万级并发连线。",
    "use_cases": [
      "高效能 TCP 服务",
      "固定 IP",
      "PrivateLink 整合"
    ],
    "related_questions": [
      4,
      24,
      27,
      37,
      49,
      50,
      61,
      73,
      121,
      155,
      161,
      167,
      172,
      207,
      209,
      223,
      230,
      237,
      249,
      253
    ],
    "question_count": 39
  },
  {
    "id": "nodejs-tomcat",
    "name": "Node.js / Tomcat",
    "full_name": "Node.js / Apache Tomcat",
    "abbr": "Node.js/Tomcat",
    "aliases": [
      "Node.js",
      "Tomcat"
    ],
    "category": "devops",
    "function": "常见应用执行环境，Elastic Beanstalk 和 EC2 均支援部署。",
    "use_cases": [
      "Elastic Beanstalk 平台选择",
      "Web 应用托管"
    ],
    "related_questions": [
      50,
      63,
      80,
      195,
      262,
      437,
      504
    ],
    "question_count": 7
  },
  {
    "id": "oauth",
    "name": "OAuth",
    "full_name": "OAuth 2.0",
    "abbr": "OAuth",
    "aliases": [
      "OAuth"
    ],
    "category": "protocols",
    "function": "授权框架，允许第三方应用在不取得密码的情况下存取使用者资源。",
    "use_cases": [
      "社交登入",
      "API 存取权杖",
      "Cognito 整合"
    ],
    "related_questions": [
      517
    ],
    "question_count": 1
  },
  {
    "id": "on-premises",
    "name": "On-premises",
    "full_name": "On-premises",
    "abbr": "On-premises",
    "aliases": [
      "On-premises",
      "on-premises"
    ],
    "category": "concepts",
    "function": "指企业自有或托管的本地资料中心环境，与 AWS 云端透过 Direct Connect/VPN 连接。",
    "use_cases": [
      "混合云架构",
      "渐进式云端迁移",
      "Storage Gateway"
    ],
    "related_questions": [
      1,
      4,
      5,
      13,
      17,
      21,
      25,
      35,
      37,
      39,
      42,
      45,
      46,
      50,
      62,
      65,
      70,
      77,
      78,
      93
    ],
    "question_count": 113
  },
  {
    "id": "oidc",
    "name": "OpenID Connect",
    "full_name": "OpenID Connect",
    "abbr": "OIDC",
    "aliases": [
      "OpenID Connect",
      "OIDC"
    ],
    "category": "protocols",
    "function": "基于 OAuth 2.0 的身分验证层，用于验证使用者身分。",
    "use_cases": [
      "ALB 验证",
      "Cognito 整合",
      "API 授权"
    ],
    "related_questions": [
      21,
      371,
      418,
      459
    ],
    "question_count": 4
  },
  {
    "id": "ou",
    "name": "Organizational Unit",
    "full_name": "Organizational Unit (OU)",
    "abbr": "OU",
    "aliases": [
      "OU",
      "ou",
      "Organizational Unit",
      "organizational unit",
      "组织单位",
      "组织单元",
      "Organizations OU"
    ],
    "category": "management",
    "function": "OU（Organizational Unit，组织单位）是 AWS Organizations 里用来「分组帐户」的资料夹。把帐户放进不同 OU，就可以对该组套用不同 SCP（服务控制政策）和管理政策。例如 Production OU 限制严格，Onboarding OU 暂时宽松，方便新帐户先调整再搬入生产。",
    "use_cases": [
      "按部门/环境分组帐户",
      "分层 SCP 管理",
      "新帐户 onboarding 暂放独立 OU",
      "第 3 题：Production OU + 临时 Onboarding OU"
    ],
    "related_questions": [
      1,
      2,
      3,
      4,
      5,
      6,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21
    ],
    "question_count": 505
  },
  {
    "id": "pci-dss",
    "name": "PCI DSS",
    "full_name": "Payment Card Industry Data Security Standard",
    "abbr": "PCI DSS",
    "aliases": [
      "PCI DSS"
    ],
    "category": "protocols",
    "function": "支付卡产业资料安全标准，AWS 提供合规范围内的服务和责任共担模型。",
    "use_cases": [
      "支付处理合规",
      "责任共担模型理解"
    ],
    "related_questions": [],
    "question_count": 0
  },
  {
    "id": "pilot-light",
    "name": "Pilot Light",
    "full_name": "Pilot Light DR Strategy",
    "abbr": "Pilot Light",
    "aliases": [
      "pilot light",
      "Pilot Light",
      "引导灯",
      "引导灯策略"
    ],
    "category": "concepts",
    "function": "DR 策略：在备援 Region 仅保持核心资料/最小基础设施运行（如资料库副本），故障时快速扩展完整应用堆叠。",
    "use_cases": [
      "成本与 RTO 平衡",
      "Aurora Global Database",
      "跨 Region AMI/启动范本"
    ],
    "related_questions": [
      333
    ],
    "question_count": 1
  },
  {
    "id": "postgresql",
    "name": "PostgreSQL",
    "full_name": "PostgreSQL",
    "abbr": "PostgreSQL",
    "aliases": [
      "PostgreSQL"
    ],
    "category": "database",
    "function": "开源进阶关联式资料库，RDS 和 Aurora 均支援。",
    "use_cases": [
      "RDS PostgreSQL",
      "Aurora PostgreSQL",
      "PostGIS 地理资料"
    ],
    "related_questions": [
      4,
      94,
      114,
      207,
      252,
      275,
      346,
      354,
      368,
      374,
      409,
      413,
      432,
      452,
      472,
      473,
      477,
      497,
      504,
      528
    ],
    "question_count": 20
  },
  {
    "id": "rcu",
    "name": "RCU（读取容量单位）",
    "full_name": "DynamoDB Read Capacity Unit",
    "abbr": "RCU",
    "aliases": [
      "RCU",
      "RCUs",
      "read capacity unit",
      "read capacity units",
      "Read Capacity Unit",
      "Read Capacity Units",
      "provisioned read capacity",
      "读取容量"
    ],
    "category": "database",
    "function": "DynamoDB 布建模式（Provisioned）下的读取吞吐计量单位。1 个 RCU 约可支援每秒 1 次最多 4 KB 的强一致性读取，或每秒 2 次最多 4 KB 的最终一致性读取。可搭配 Auto Scaling 或 Reserved Capacity 控制成本。",
    "use_cases": [
      "依读取负载配置表容量",
      "尖峰用 Auto Scaling 调升 RCU",
      "平均负载购买预留 RCU 省成本",
      "第 41 题：峰值双倍读写与 Reserved + Auto Scaling"
    ],
    "related_questions": [
      41,
      257,
      284,
      416
    ],
    "question_count": 4
  },
  {
    "id": "read-replica",
    "name": "Read Replica",
    "full_name": "RDS / Aurora Read Replica",
    "abbr": "Read Replica",
    "aliases": [
      "read replica",
      "Read Replica",
      "read replicas",
      "Read Replicas",
      "读取副本",
      "读副本"
    ],
    "category": "database",
    "function": "从主要资料库复制出来的「只读」副本，用来分担查询（SELECT）流量。RDS 同 Aurora 都有；Aurora 上通常叫 Aurora Replica／Reader。",
    "use_cases": [
      "读写分离",
      "Aurora Auto Scaling",
      "跨 Region 读取副本 DR"
    ],
    "related_questions": [
      4,
      8,
      9,
      37,
      48,
      76,
      80,
      105,
      125,
      152,
      169,
      202,
      272,
      312,
      315,
      327,
      333,
      341,
      368,
      374
    ],
    "question_count": 30
  },
  {
    "id": "rest",
    "name": "REST",
    "full_name": "Representational State Transfer",
    "abbr": "REST",
    "aliases": [
      "REST"
    ],
    "category": "protocols",
    "function": "软体架构风格，API Gateway 支援 RESTful API 设计。",
    "use_cases": [
      "API Gateway REST API",
      "HTTP 方法路由"
    ],
    "related_questions": [
      2,
      3,
      5,
      22,
      26,
      27,
      31,
      33,
      41,
      45,
      50,
      54,
      64,
      71,
      72,
      74,
      91,
      93,
      102,
      106
    ],
    "question_count": 70
  },
  {
    "id": "route53-alias-record",
    "name": "Route 53 Alias Record",
    "full_name": "Amazon Route 53 Alias Record",
    "abbr": "Alias Record",
    "aliases": [
      "alias record",
      "Alias Record",
      "Route 53 alias",
      "Route 53 Alias",
      "Alias 记录"
    ],
    "category": "networking",
    "function": "Route 53 特殊记录类型，直接指向 AWS 资源（如 ALB、CloudFront、S3 网站），无需额外 CNAME 限制且可查询目标健康状态。",
    "use_cases": [
      "网域指向 ALB/NLB",
      "CloudFront 分发",
      "S3 静态网站"
    ],
    "related_questions": [
      37,
      184,
      209,
      249,
      467
    ],
    "question_count": 5
  },
  {
    "id": "route53-failover-routing",
    "name": "Route 53 Failover Routing",
    "full_name": "Route 53 Failover Routing Policy",
    "abbr": "Failover Routing",
    "aliases": [
      "failover routing",
      "Failover Routing",
      "failover record",
      "Route 53 failover",
      "故障转移路由"
    ],
    "category": "networking",
    "function": "Route 53 路由政策：设定主动-被动（Active-Passive）记录，主记录不健康时自动切换至备援记录。",
    "use_cases": [
      "跨 Region API DR",
      "备援站点 DNS 切换",
      "搭配 Health Check"
    ],
    "related_questions": [
      2,
      52,
      69,
      107,
      184,
      190,
      202,
      237,
      240,
      296,
      345,
      372,
      467,
      472,
      486
    ],
    "question_count": 15
  },
  {
    "id": "route53-health-check",
    "name": "Route 53 Health Check",
    "full_name": "Amazon Route 53 Health Check",
    "abbr": "Health Check",
    "aliases": [
      "health check",
      "Health Check",
      "Route 53 health check",
      "Route 53 Health Check",
      "健康检查"
    ],
    "category": "networking",
    "function": "Route 53 监控端点（HTTP/HTTPS/TCP 等）可用性的机制，用于路由政策自动切换流量至健康目标。",
    "use_cases": [
      "Failover 路由",
      "加权路由健康侦测",
      "CloudWatch 告警整合"
    ],
    "related_questions": [
      2,
      8,
      10,
      52,
      69,
      107,
      177,
      184,
      190,
      237,
      264,
      272,
      345,
      348,
      372,
      384,
      438,
      442,
      444,
      467
    ],
    "question_count": 22
  },
  {
    "id": "route53-inbound-resolver",
    "name": "Route 53 Inbound Resolver",
    "full_name": "Route 53 Inbound Resolver Endpoint",
    "abbr": "Inbound Resolver",
    "aliases": [
      "inbound resolver",
      "Inbound Resolver",
      "Route 53 inbound resolver",
      "inbound resolver endpoint",
      "Inbound Resolver Endpoint",
      "入站解析器",
      "入站解析器端点"
    ],
    "category": "networking",
    "function": "Route 53 Resolver 的入站端点，让地端 DNS 伺服器将特定网域查询转送至 AWS，以解析 Private Hosted Zone 中的记录。",
    "use_cases": [
      "地端解析 AWS 私有网域",
      "混合 DNS（on-premises → AWS）",
      "搭配 Direct Connect / Transit Gateway"
    ],
    "related_questions": [
      1,
      278
    ],
    "question_count": 2
  },
  {
    "id": "route53-multivalue-routing",
    "name": "Route 53 Multivalue Routing",
    "full_name": "Route 53 Multivalue Answer Routing",
    "abbr": "Multivalue Routing",
    "aliases": [
      "multivalue answer",
      "Multivalue Answer",
      "multivalue routing",
      "多值路由",
      "多值应答"
    ],
    "category": "networking",
    "function": "Route 53 路由政策：回传多个健康记录的 IP，提供简单负载分散（非完整取代 ELB，最多 8 个健康记录）。",
    "use_cases": [
      "多个健康端点负载分散",
      "与 Health Check 搭配",
      "区分于 Failover 的 DR 场景"
    ],
    "related_questions": [
      2,
      33,
      209,
      317,
      486
    ],
    "question_count": 5
  },
  {
    "id": "route53-outbound-resolver",
    "name": "Route 53 Outbound Resolver",
    "full_name": "Route 53 Outbound Resolver Endpoint",
    "abbr": "Outbound Resolver",
    "aliases": [
      "outbound resolver",
      "Outbound Resolver",
      "Route 53 outbound resolver",
      "outbound resolver endpoint",
      "Outbound Resolver Endpoint",
      "出站解析器",
      "出站解析器端点"
    ],
    "category": "networking",
    "function": "Route 53 Resolver 的出站端点，让 VPC 内资源将特定网域查询转送至地端或远端 DNS 伺服器解析。",
    "use_cases": [
      "AWS 解析地端 AD DNS",
      "混合 DNS（AWS → on-premises）",
      "搭配 Resolver Forwarding Rule"
    ],
    "related_questions": [
      1
    ],
    "question_count": 1
  },
  {
    "id": "route53-private-hosted-zone",
    "name": "Route 53 Private Hosted Zone",
    "full_name": "Amazon Route 53 Private Hosted Zone",
    "abbr": "PHZ",
    "aliases": [
      "private hosted zone",
      "Private Hosted Zone",
      "Route 53 private hosted zone",
      "Route 53 Private Hosted Zone",
      "PHZ",
      "phz",
      "私有托管区域",
      "私有 DNS 区域"
    ],
    "category": "networking",
    "function": "Route 53 的私有 DNS 区域（简称 PHZ），像一本「只在公司内网有效」的域名记录本（例如 cloud.example.com → 私有 IP）。只对已关联的 VPC 可解析，不会公开到互联网。混合 DNS 场景常搭配 Inbound Resolver 让地端也能查 PHZ。",
    "use_cases": [
      "VPC 内部 DNS",
      "混合云 DNS",
      "跨帐户 VPC 关联授权",
      "关联多个 VPC",
      "搭配 Inbound Resolver / TGW / DX"
    ],
    "related_questions": [
      1,
      15,
      304,
      322,
      490
    ],
    "question_count": 5
  },
  {
    "id": "route53-public-hosted-zone",
    "name": "Route 53 Public Hosted Zone",
    "full_name": "Amazon Route 53 Public Hosted Zone",
    "abbr": "Public Hosted Zone",
    "aliases": [
      "public hosted zone",
      "Public Hosted Zone",
      "Route 53 public hosted zone",
      "公共托管区域"
    ],
    "category": "networking",
    "function": "Route 53 的公共 DNS 区域，透过全球 DNS 系统对外提供网域解析，用于面向网际网路的应用。",
    "use_cases": [
      "公开 API/网站 DNS",
      "Alias 记录指向 ALB/CloudFront",
      "健康检查路由"
    ],
    "related_questions": [
      36,
      396
    ],
    "question_count": 2
  },
  {
    "id": "route53-resolver",
    "name": "Route 53 Resolver",
    "full_name": "Amazon Route 53 Resolver",
    "abbr": "Route 53 Resolver",
    "aliases": [
      "Route 53 Resolver",
      "route 53 resolver",
      "Amazon Route 53 Resolver",
      "Route 53 解析器"
    ],
    "category": "networking",
    "function": "VPC 内建的递回 DNS 解析器（位址通常为 VPC CIDR+2），支援 Resolver Endpoints 与转送/系统规则，实现混合云 DNS 互通。",
    "use_cases": [
      "VPC 预设 DNS",
      "混合 DNS 架构",
      "搭配 Inbound/Outbound Endpoint"
    ],
    "related_questions": [
      278,
      304,
      322
    ],
    "question_count": 3
  },
  {
    "id": "route53-resolver-rule",
    "name": "Route 53 Resolver Rule",
    "full_name": "Route 53 Resolver Rule (Forwarding / System)",
    "abbr": "Resolver Rule",
    "aliases": [
      "forwarding rule",
      "Forwarding Rule",
      "resolver rule",
      "Resolver Rule",
      "resolver forwarding rule",
      "转送规则",
      "解析器规则"
    ],
    "category": "networking",
    "function": "定义哪些 DNS 查询需由 Route 53 Resolver 转送至指定目标（如 Outbound Endpoint 或 Inbound Endpoint 关联的地端 DNS）。",
    "use_cases": [
      "转送 company.example 至地端 DNS",
      "跨 VPC 共享 Resolver 规则（RAM）",
      "系统规则关联 VPC"
    ],
    "related_questions": [
      1,
      10,
      278,
      322,
      438
    ],
    "question_count": 5
  },
  {
    "id": "rpo",
    "name": "RPO",
    "full_name": "Recovery Point Objective",
    "abbr": "RPO",
    "aliases": [
      "RPO"
    ],
    "category": "concepts",
    "function": "灾难复原目标：可接受的最大资料遗失量（以时间衡量）。",
    "use_cases": [
      "备份频率决策",
      "同步/非同步复写选择"
    ],
    "related_questions": [
      1,
      20,
      38,
      43,
      80,
      86,
      96,
      123,
      146,
      148,
      151,
      160,
      169,
      190,
      202,
      204,
      234,
      240,
      253,
      272
    ],
    "question_count": 38
  },
  {
    "id": "rto",
    "name": "RTO",
    "full_name": "Recovery Time Objective",
    "abbr": "RTO",
    "aliases": [
      "RTO"
    ],
    "category": "concepts",
    "function": "灾难复原目标：服务中断后必须恢复运作的最长可接受时间。",
    "use_cases": [
      "DR 策略选择",
      "Multi-AZ vs 跨区域备份",
      "热/温/冷备援决策"
    ],
    "related_questions": [
      8,
      148,
      160,
      169,
      177,
      202,
      204,
      234,
      240,
      272,
      296,
      333,
      390,
      395,
      406,
      429,
      472
    ],
    "question_count": 17
  },
  {
    "id": "s3-intelligent-tiering",
    "name": "S3 Intelligent-Tiering",
    "full_name": "Amazon S3 Intelligent-Tiering",
    "abbr": "Intelligent-Tiering",
    "aliases": [
      "S3 Intelligent-Tiering",
      "Intelligent-Tiering",
      "Intelligent Tiering",
      "S3Intelligent-Tiering",
      "intelligent-tiering",
      "智能分层",
      "智慧分层"
    ],
    "category": "storage",
    "function": "S3 储存类别：依实际存取模式自动在 Frequent Access（高频）与 Infrequent Access（低频）之间移动物件，无需自订生命周期规则。两层皆为毫秒级撷取、无撷取费用；可选开 Archive Access／Deep Archive Access 把更久未存取物件再降到归档层（有撷取延迟）。适合「大多数冷、少数仍热」或存取模式不规则的资料。与 S3 Lifecycle 差异：Lifecycle 依「经过天数」转层；Intelligent-Tiering 依「是否被存取」自动调层。",
    "use_cases": [
      "存取模式未知或不规则的物件",
      "长期资料湖成本优化",
      "搭配 FSx for Lustre 按需载入前的低成本 S3 底座",
      "可选 archive configuration 转 Glacier Instant／Flexible／Deep Archive",
      "考试对比：需毫秒存取勿用 Deep Archive；纯时间转层用 Lifecycle"
    ],
    "related_questions": [
      23,
      82,
      92,
      194,
      256,
      468
    ],
    "question_count": 6
  },
  {
    "id": "s3-object-lock",
    "name": "S3 Object Lock",
    "full_name": "Amazon S3 Object Lock",
    "abbr": "Object Lock",
    "aliases": [
      "object lock",
      "Object Lock",
      "WORM",
      "物件锁定"
    ],
    "category": "storage",
    "function": "以 WORM（一次写入多次读取）模式防止物件在保留期内被删除或覆写，满足合规与稽核要求。",
    "use_cases": [
      "法规合规",
      "勒索软体防护",
      "搭配 S3 Versioning"
    ],
    "related_questions": [
      337,
      417
    ],
    "question_count": 2
  },
  {
    "id": "s3-replication",
    "name": "S3 Replication Rule",
    "full_name": "Amazon S3 Replication Rule",
    "abbr": "Replication",
    "aliases": [
      "replication rule",
      "Replication Rule",
      "S3 replication",
      "CRR",
      "SRR",
      "复写规则"
    ],
    "category": "storage",
    "function": "自动将 S3 物件复写至同帐户或跨帐户/跨 Region 的目标储存贮体，支援 CRR（跨区域）与 SRR（同区域）。",
    "use_cases": [
      "跨 Region DR",
      "合规资料副本",
      "搭配 S3 Batch Operations"
    ],
    "related_questions": [
      36,
      71,
      101,
      135,
      143,
      186,
      194,
      335,
      350,
      352,
      422,
      430,
      462,
      514
    ],
    "question_count": 14
  },
  {
    "id": "s3-storage-lens",
    "name": "S3 Storage Lens",
    "full_name": "Amazon S3 Storage Lens",
    "abbr": "Storage Lens",
    "aliases": [
      "S3 Storage Lens",
      "Amazon S3 Storage Lens",
      "Storage Lens",
      "storage lens",
      "S3Storage Lens",
      "3 Storage Lens"
    ],
    "category": "storage",
    "function": "S3 专用的组织级储存分析与可见性服务。预设仪表板可看用量、物件数、成本趋势；升级 advanced metrics 可看更深指标（例如加密覆盖、不完全多部分上传、活动指标）。支援单一帐户或多帐户（Organizations），资料可汇出到 S3 再给 Athena／QuickSight。重点是「看清楚 S3 存了什么、哪里可省」，不是自动改储存类别或 rightsizing EC2。",
    "use_cases": [
      "跨桶／跨帐户 S3 用量与成本趋势",
      "找出未加密桶、冗余复本、不完整 multipart",
      "进阶指标看 storage trends",
      "考试对比：S3 成本优化洞察用 Storage Lens；通用帐户健康检查用 Trusted Advisor；运算 rightsizing 用 Compute Optimizer"
    ],
    "related_questions": [
      83,
      362
    ],
    "question_count": 2
  },
  {
    "id": "saml",
    "name": "SAML",
    "full_name": "Security Assertion Markup Language",
    "abbr": "SAML",
    "aliases": [
      "SAML"
    ],
    "category": "protocols",
    "function": "基于 XML 的开放标准，用于身分提供者与服务提供者之间交换验证资料。",
    "use_cases": [
      "企业 SSO",
      "IAM Identity Center 联合身分",
      "Cognito 联合"
    ],
    "related_questions": [
      21,
      200,
      371,
      385,
      459,
      517
    ],
    "question_count": 6
  },
  {
    "id": "savings-plans",
    "name": "Savings Plans",
    "full_name": "AWS Savings Plans",
    "abbr": "Savings Plans",
    "aliases": [
      "savings plan",
      "Savings Plans",
      "Savings Plan",
      "节省方案"
    ],
    "category": "management",
    "function": "承诺 1 或 3 年稳定运算用量（USD/小时），换取比 On-Demand 更低的 EC2、Fargate、Lambda 费率。",
    "use_cases": [
      "长期成本优化",
      "搭配 Compute Optimizer",
      "与 Reserved Instance 比较选型"
    ],
    "related_questions": [
      25,
      152,
      170,
      225,
      230,
      254,
      263,
      311,
      336,
      341,
      377,
      513
    ],
    "question_count": 12
  },
  {
    "id": "scp",
    "name": "Service Control Policy",
    "full_name": "Service Control Policy",
    "abbr": "SCP",
    "aliases": [
      "Service Control Policy",
      "SCP"
    ],
    "category": "security",
    "function": "AWS Organizations 中的集中权限管理政策，设定帐户中 IAM 实体的最大可用权限。",
    "use_cases": [
      "禁止特定区域",
      "限制 EC2 建立",
      "OU 层级权限控制"
    ],
    "related_questions": [
      3,
      30,
      31,
      32,
      44,
      57,
      64,
      66,
      101,
      108,
      113,
      124,
      131,
      132,
      168,
      185,
      219,
      236,
      245,
      246
    ],
    "question_count": 43
  },
  {
    "id": "sftp",
    "name": "SFTP",
    "full_name": "SSH File Transfer Protocol",
    "abbr": "SFTP",
    "aliases": [
      "SFTP"
    ],
    "category": "protocols",
    "function": "安全的档案传输协定，AWS Transfer Family 提供受管 SFTP 端点。",
    "use_cases": [
      "B2B 档案交换",
      "取代本地 SFTP 伺服器"
    ],
    "related_questions": [
      61,
      122,
      249,
      290,
      292,
      482
    ],
    "question_count": 6
  },
  {
    "id": "site-to-site-vpn",
    "name": "Site-to-Site VPN",
    "full_name": "AWS Site-to-Site VPN",
    "abbr": "Site-to-Site VPN",
    "aliases": [
      "Site-to-Site VPN",
      "VPN"
    ],
    "category": "networking",
    "function": "在本地网路和 VPC 之间建立加密的 IPsec VPN 通道。云端侧通常挂在 VGW（单一 VPC）或 attach 到 TGW（多 VPC 中枢）。",
    "use_cases": [
      "混合云连线",
      "备援连线",
      "快速部署",
      "第 77 题：地端经 VPN 进云"
    ],
    "related_questions": [
      12,
      20,
      21,
      53,
      65,
      77,
      93,
      99,
      114,
      172,
      181,
      198,
      215,
      218,
      232,
      247,
      278,
      316,
      319,
      340
    ],
    "question_count": 37
  },
  {
    "id": "soc-iso",
    "name": "SOC / ISO",
    "full_name": "SOC 2 / ISO 27001",
    "abbr": "SOC/ISO",
    "aliases": [
      "SOC",
      "ISO"
    ],
    "category": "protocols",
    "function": "常见安全合规认证标准。AWS 提供合规报告和责任共担模型支援客户达成合规。",
    "use_cases": [
      "合规选型",
      "责任共担模型",
      "审计报告"
    ],
    "related_questions": [
      1,
      5,
      7,
      11,
      12,
      15,
      17,
      24,
      29,
      30,
      39,
      47,
      49,
      54,
      56,
      83,
      87,
      110,
      116,
      123
    ],
    "question_count": 83
  },
  {
    "id": "spot-instance",
    "name": "Spot Instance",
    "full_name": "Amazon EC2 Spot Instance",
    "abbr": "Spot",
    "aliases": [
      "spot instance",
      "Spot Instance",
      "Spot Instances",
      "竞价实例",
      "Spot 实例"
    ],
    "category": "compute",
    "function": "使用 AWS 闲置运算容量的 EC2 执行个体，价格显著低于 On-Demand，但可能被中断（2 分钟通知）。",
    "use_cases": [
      "批次处理",
      "容错工作负载",
      "搭配 Spot Fleet / Auto Scaling"
    ],
    "related_questions": [
      18,
      25,
      37,
      134,
      151,
      152,
      164,
      195,
      240,
      263,
      288,
      291,
      336,
      456,
      529
    ],
    "question_count": 15
  },
  {
    "id": "parameter-store",
    "name": "Systems Manager Parameter Store",
    "full_name": "AWS Systems Manager Parameter Store",
    "abbr": "Parameter Store",
    "aliases": [
      "Parameter Store"
    ],
    "category": "management",
    "function": "安全的组态资料和机密管理服务，支援阶层式参数和版本控制。",
    "use_cases": [
      "应用程式组态",
      "AMI ID 管理",
      "搭配 KMS 加密"
    ],
    "related_questions": [
      26,
      110,
      111,
      163,
      201,
      206,
      210,
      214,
      314,
      409,
      427,
      495
    ],
    "question_count": 12
  },
  {
    "id": "tcp-udp",
    "name": "TCP / UDP",
    "full_name": "Transmission Control Protocol / User Datagram Protocol",
    "abbr": "TCP/UDP",
    "aliases": [
      "TCP",
      "UDP"
    ],
    "category": "protocols",
    "function": "传输层协定。TCP 提供可靠连线，UDP 提供低延迟无连线传输；NLB 支援两者。",
    "use_cases": [
      "NLB 第四层负载平衡",
      "Global Accelerator 加速"
    ],
    "related_questions": [
      24,
      65,
      78,
      143,
      208,
      444,
      463
    ],
    "question_count": 7
  },
  {
    "id": "terraform",
    "name": "Terraform",
    "full_name": "HashiCorp Terraform",
    "abbr": "Terraform",
    "aliases": [
      "Terraform"
    ],
    "category": "devops",
    "function": "第三方基础设施即程式码工具，支援多云资源布建（考试中常与 CloudFormation 比较）。",
    "use_cases": [
      "多云 IaC",
      "State 管理",
      "模组化基础设施"
    ],
    "related_questions": [],
    "question_count": 0
  },
  {
    "id": "vgw",
    "name": "Virtual Private Gateway（VGW）",
    "full_name": "Virtual Private Gateway",
    "abbr": "VGW",
    "aliases": [
      "VGW",
      "vgw",
      "Virtual Private Gateway",
      "virtual private gateway",
      "Virtual private gateway",
      "虚拟私有闸道",
      "虚拟专用闸道"
    ],
    "category": "networking",
    "function": "挂在「单一 VPC」上的 VPN／Direct Connect 云端侧闸道。地端 Customer Gateway（CGW）经 Site-to-Site VPN 连到 VGW 后，只能直接进入该 VGW 所属的那一个 VPC。一个 VGW 不能同时绑两个 VPC；也不能把「两个 router 拆去两个 VPC」。地端若要通多个 VPC，应改用 Transit Gateway（TGW）。",
    "use_cases": [
      "单一 VPC 的 Site-to-Site VPN",
      "该 VPC 的 Direct Connect 虚拟介面",
      "第 77 题 D 选项：VGW 无法同时涵盖 VPC A 与 B"
    ],
    "related_questions": [
      77,
      123,
      354,
      375,
      431
    ],
    "question_count": 5
  },
  {
    "id": "vmware",
    "name": "VMware Cloud on AWS",
    "full_name": "VMware Cloud on AWS",
    "abbr": "VMware",
    "aliases": [
      "VMware",
      "vSphere",
      "OVF"
    ],
    "category": "migration",
    "function": "在 AWS 上运行 VMware vSphere 环境，支援虚拟机器迁移和混合部署。",
    "use_cases": [
      "虚拟机器迁移",
      "灾难复原",
      "本地 vSphere 延伸"
    ],
    "related_questions": [
      46,
      62,
      211,
      302,
      339,
      423,
      429,
      515
    ],
    "question_count": 8
  },
  {
    "id": "vpc-dhcp-options",
    "name": "VPC DHCP Options Set",
    "full_name": "Amazon VPC DHCP Options Set",
    "abbr": "DHCP Options",
    "aliases": [
      "DHCP options",
      "DHCP options set",
      "DHCP Options Set",
      "dhcp options set",
      "VPC DHCP options",
      "DHCP 选项集"
    ],
    "category": "networking",
    "function": "控制 VPC 内 EC2 执行个体从 DHCP 取得的 DNS 伺服器、网域名称等设定，影响执行个体使用哪个 DNS 解析器。",
    "use_cases": [
      "设定 domain-name-servers=AmazonProvidedDNS",
      "自订 DNS 伺服器",
      "搭配 Private Hosted Zone"
    ],
    "related_questions": [
      304,
      434
    ],
    "question_count": 2
  },
  {
    "id": "vpc-gateway-endpoint",
    "name": "VPC Gateway Endpoint",
    "full_name": "Amazon VPC Gateway Endpoint",
    "abbr": "Gateway Endpoint",
    "aliases": [
      "gateway endpoint",
      "Gateway Endpoint",
      "S3 gateway endpoint",
      "DynamoDB gateway endpoint",
      "闸道端点"
    ],
    "category": "networking",
    "function": "透过路由表将 S3 或 DynamoDB 流量导向 AWS 私有网路端点，免费，无法用于其他 AWS 服务。",
    "use_cases": [
      "私有子网路存取 S3",
      "私有子网路存取 DynamoDB",
      "降低 NAT Gateway 成本"
    ],
    "related_questions": [
      19,
      45,
      48,
      61,
      107,
      111,
      194,
      218,
      243,
      269,
      283,
      343,
      425,
      430,
      527,
      529
    ],
    "question_count": 16
  },
  {
    "id": "vpc-interface-endpoint",
    "name": "VPC Interface Endpoint",
    "full_name": "Amazon VPC Interface Endpoint",
    "abbr": "Interface Endpoint",
    "aliases": [
      "interface endpoint",
      "Interface Endpoint",
      "VPC interface endpoint",
      "VPC endpoint",
      "介面端点"
    ],
    "category": "networking",
    "function": "透过 PrivateLink 技术在 VPC 内建立弹性网路介面（ENI），私有存取 AWS 服务或端点服务，按小时与流量计费。",
    "use_cases": [
      "私有存取 SSM/ECR/API",
      "跨帐户 PrivateLink 服务",
      "取代经 NAT 存取 AWS API"
    ],
    "related_questions": [
      12,
      20,
      40,
      111,
      115,
      142,
      172,
      218,
      230,
      243,
      249,
      255,
      269,
      283,
      292,
      307,
      313,
      324,
      331,
      332
    ],
    "question_count": 35
  },
  {
    "id": "warm-standby",
    "name": "Warm Standby",
    "full_name": "Warm Standby DR Strategy",
    "abbr": "Warm Standby",
    "aliases": [
      "warm standby",
      "Warm Standby",
      "温备援",
      "温待机"
    ],
    "category": "concepts",
    "function": "DR 策略：备援 Region 运行缩小版完整环境（常为生产规模一小部分），故障时扩展至全量处理流量。",
    "use_cases": [
      "较低 RTO 的 DR",
      "Auto Scaling 扩展备援",
      "Route 53 流量切换"
    ],
    "related_questions": [],
    "question_count": 0
  },
  {
    "id": "wcu",
    "name": "WCU（写入容量单位）",
    "full_name": "DynamoDB Write Capacity Unit",
    "abbr": "WCU",
    "aliases": [
      "WCU",
      "WCUs",
      "write capacity unit",
      "write capacity units",
      "Write Capacity Unit",
      "Write Capacity Units",
      "provisioned write capacity",
      "写入容量"
    ],
    "category": "database",
    "function": "DynamoDB 布建模式（Provisioned）下的写入吞吐计量单位。1 个 WCU 约可支援每秒 1 次最多 1 KB 的写入。写入密集工作负载需特别关注 WCU；可搭配 Auto Scaling、Reserved Capacity 或 On-Demand 模式优化成本。",
    "use_cases": [
      "写入密集型表容量规划",
      "尖峰写入用 Auto Scaling 调升 WCU",
      "平均负载购买预留 WCU 省成本",
      "第 41 题：写入远多于读取时的成本优化"
    ],
    "related_questions": [
      41,
      257,
      284,
      416,
      485
    ],
    "question_count": 5
  }
];
