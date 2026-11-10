/* Per-question five-second cues. Every cue is traceable to the Simplified Chinese question bank. */
const QUICK_ANSWER_CARDS = {
  "1": {
    "when": "本地系统应该能够解析并连接 + 所有VPC应该能够解析",
    "target": "将私有托管区域关联到所有VPC + 在共享服务VPC中创建一个Route 53入站解析器",
    "avoid": "别选“将私有托管区域关联到共享服务VPC”。",
    "questionCues": [
      "本地系统应该能够解析并连接",
      "所有VPC应该能够解析"
    ],
    "answerCues": {
      "A": [
        "将私有托管区域关联到所有VPC",
        "在共享服务VPC中创建一个Route 53入站解析器"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "2": {
    "when": "DNS + 该公司需要一个能够让API故障转移到不同AWS区域的解决方案",
    "target": "故障转移记录 + 将DynamoDB表转换为全局表",
    "avoid": "",
    "questionCues": [
      "DNS",
      "该公司需要一个能够让API故障转移到不同AWS区域的解决方案"
    ],
    "answerCues": {
      "C": [
        "故障转移记录",
        "将DynamoDB表转换为全局表"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "3": {
    "when": "管理员在组织根目录使用拒绝列表SCP来管理对受限服务的访问 + 新业务部门的管理员发现他们无法",
    "target": "将组织的根目录SCP移至Production OU",
    "avoid": "",
    "questionCues": [
      "管理员在组织根目录使用拒绝列表SCP来管理对受限服务的访问",
      "新业务部门的管理员发现他们无法"
    ],
    "answerCues": {
      "D": [
        "将组织的根目录SCP移至Production OU"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "4": {
    "when": "因此公司正在将应用程式和数据库迁移到AWS + 同时允许应用程式层和数据库层扩展",
    "target": "为Aurora Replicas启用Aurora Auto Scaling + 粘性会话 + Application Load Balancer",
    "avoid": "别选“为Aurora writers启用Aurora Auto Scaling”。",
    "questionCues": [
      "因此公司正在将应用程式和数据库迁移到AWS",
      "同时允许应用程式层和数据库层扩展"
    ],
    "answerCues": {
      "C": [
        "为Aurora Replicas启用Aurora Auto Scaling",
        "粘性会话",
        "Application Load Balancer"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "5": {
    "when": "该公司希望将服务迁移到AWS + 该公司已将应用程式迁移为一组AWS Lambda函数",
    "target": "创建一个Lambda@Edge函数",
    "avoid": "别选“创建一个CloudFront函数”。",
    "questionCues": [
      "该公司希望将服务迁移到AWS",
      "该公司已将应用程式迁移为一组AWS Lambda函数"
    ],
    "answerCues": {
      "D": [
        "创建一个Lambda@Edge函数"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "6": {
    "when": "一家零售公司需要向另一家公司（其业务伙伴）提供一系列数据文件 + S3",
    "target": "C：将S3存储桶策略 + \"Principal\": {\"AWS\"；D：在Account B中 + s3:ListBucket",
    "avoid": "C 看 Bucket Policy；D 看用户权限，两边都要授权。",
    "questionCues": [
      "一家零售公司需要向另一家公司（其业务伙伴）提供一系列数据文件",
      "S3"
    ],
    "answerCues": {
      "C": [
        "将S3存储桶策略",
        "\"Principal\": {\"AWS\""
      ],
      "D": [
        "在Account B中",
        "s3:ListBucket"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "7": {
    "when": "生产和测试 + 解决方案架构师需要使用最小化操作复杂性的无伺服器架构来设计更新的应用程式",
    "target": "配置两个独立的Application Load Balancers将流量导向ECS集群",
    "avoid": "",
    "questionCues": [
      "生产和测试",
      "解决方案架构师需要使用最小化操作复杂性的无伺服器架构来设计更新的应用程式"
    ],
    "answerCues": {
      "B": [
        "配置两个独立的Application Load Balancers将流量导向ECS集群"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "8": {
    "when": "该公司需要通过使应用程式能够自动故障转移到备份区域来将其RTO降低到15分钟以下",
    "target": "配置Route 53",
    "avoid": "",
    "questionCues": [
      "该公司需要通过使应用程式能够自动故障转移到备份区域来将其RTO降低到15分钟以下"
    ],
    "answerCues": {
      "B": [
        "配置Route 53"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "9": {
    "when": "解决方案架构师需要改进应用程式的架构 + 以便基础架构能够以最少的停机时间自动从故障中恢复",
    "target": "A：该组的最小容量为两个实例；D：创建一个跨两个可用区域的Multi-AZ部署；F：在集群上启用Multi-AZ",
    "avoid": "",
    "questionCues": [
      "解决方案架构师需要改进应用程式的架构",
      "以便基础架构能够以最少的停机时间自动从故障中恢复"
    ],
    "answerCues": {
      "A": [
        "该组的最小容量为两个实例"
      ],
      "D": [
        "创建一个跨两个可用区域的Multi-AZ部署"
      ],
      "F": [
        "在集群上启用Multi-AZ"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "10": {
    "when": "解决方案架构师需要为访问者提供自定义错误页面 + 而不是标准的ALB错误页面",
    "target": "A：配置S3存储桶以托管静态网页；E：通过配置CloudFront自定义错误页面来添加自定义错误响应",
    "avoid": "",
    "questionCues": [
      "解决方案架构师需要为访问者提供自定义错误页面",
      "而不是标准的ALB错误页面"
    ],
    "answerCues": {
      "A": [
        "配置S3存储桶以托管静态网页"
      ],
      "E": [
        "通过配置CloudFront自定义错误页面来添加自定义错误响应"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "11": {
    "when": "个人帐户无法管理自己的网路 + 个人帐户必须能够在子网内建立 AWS 资源",
    "target": "B：从AWS Organizations管理帐户启用资源共享；D：选择与资源共享关联的每个子网路",
    "avoid": "",
    "questionCues": [
      "个人帐户无法管理自己的网路",
      "个人帐户必须能够在子网内建立 AWS 资源"
    ],
    "answerCues": {
      "B": [
        "从AWS Organizations管理帐户启用资源共享"
      ],
      "D": [
        "选择与资源共享关联的每个子网路"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "12": {
    "when": "要求使用不穿越网路的私人连线 + 所有权限都必须符合最小权限原则",
    "target": "将安全性群组与端点关联",
    "avoid": "",
    "questionCues": [
      "要求使用不穿越网路的私人连线",
      "所有权限都必须符合最小权限原则"
    ],
    "answerCues": {
      "A": [
        "将安全性群组与端点关联"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "13": {
    "when": "一家公司需要为其伺服器实施修补流程 + 管理需要一份显示所有伺服器和实例的补丁状态的单一报告",
    "target": "使用 Systems Manager 产生补丁合规性报告",
    "avoid": "",
    "questionCues": [
      "一家公司需要为其伺服器实施修补流程",
      "管理需要一份显示所有伺服器和实例的补丁状态的单一报告"
    ],
    "answerCues": {
      "A": [
        "使用 Systems Manager 产生补丁合规性报告"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "14": {
    "when": "EC2实例定期扩展和缩减 + 安全团队发现一些已终止的EC2实例的日志文件缺失",
    "target": "并向Auto Scaling组发送CONTINUE以终止实例",
    "avoid": "",
    "questionCues": [
      "EC2实例定期扩展和缩减",
      "安全团队发现一些已终止的EC2实例的日志文件缺失"
    ],
    "answerCues": {
      "B": [
        "并向Auto Scaling组发送CONTINUE以终止实例"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "15": {
    "when": "故障排除显示 db.example.com 在 Amazon EC2 实例上无法解析",
    "target": "C：建立授权以将 Account A 中的私人托管区域与 Account B 中的新 VPC 关联；E：删除Account A中的关联授权",
    "avoid": "",
    "questionCues": [
      "故障排除显示 db.example.com 在 Amazon EC2 实例上无法解析"
    ],
    "answerCues": {
      "C": [
        "建立授权以将 Account A 中的私人托管区域与 Account B 中的新 VPC 关联"
      ],
      "E": [
        "删除Account A中的关联授权"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "16": {
    "when": "并配置在Auto Scaling组中 + 用户报告在尝试访问网站或观看视频时出现缓冲和超时问题",
    "target": "将分发指向S3存储桶",
    "avoid": "",
    "questionCues": [
      "并配置在Auto Scaling组中",
      "用户报告在尝试访问网站或观看视频时出现缓冲和超时问题"
    ],
    "answerCues": {
      "C": [
        "将分发指向S3存储桶"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "17": {
    "when": "此解决方案也必须透过同一对 Direct Connect 连接提供与其他 Regions 的连接",
    "target": "配置Direct Connect网关",
    "avoid": "",
    "questionCues": [
      "此解决方案也必须透过同一对 Direct Connect 连接提供与其他 Regions 的连接"
    ],
    "answerCues": {
      "A": [
        "配置Direct Connect网关"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "18": {
    "when": "运行的用于处理 Amazon SQS 伫列的 EC2 实例组成 + 该公司希望重新建构应用程序",
    "target": "使用S3事件通知将事件发布到SQS队列",
    "avoid": "",
    "questionCues": [
      "运行的用于处理 Amazon SQS 伫列的 EC2 实例组成",
      "该公司希望重新建构应用程序"
    ],
    "answerCues": {
      "C": [
        "使用S3事件通知将事件发布到SQS队列"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "19": {
    "when": "AWS CLI + 该公司希望减少部署 Lambda 函数提供的新版本应用程式逻辑的时间",
    "target": "逐步将流量转移到新版本",
    "avoid": "",
    "questionCues": [
      "AWS CLI",
      "该公司希望减少部署 Lambda 函数提供的新版本应用程式逻辑的时间"
    ],
    "answerCues": {
      "B": [
        "逐步将流量转移到新版本"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "20": {
    "when": "VPC + 可用性和检索速度不是公司关心的问题",
    "target": "将S3储存桶配置为预设使用S3一区不频繁存取（S3一区-IA）储存类别",
    "avoid": "",
    "questionCues": [
      "VPC",
      "可用性和检索速度不是公司关心的问题"
    ],
    "answerCues": {
      "A": [
        "将S3储存桶配置为预设使用S3一区不频繁存取（S3一区-IA）储存类别"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "21": {
    "when": "本公司的安全策略要求根据 + 使用者身分必须在单一位置进行管理",
    "target": "使用基于属性的存取控制 (ABAC) 授予对 AWS 帐户的存取权限",
    "avoid": "",
    "questionCues": [
      "本公司的安全策略要求根据",
      "使用者身分必须在单一位置进行管理"
    ],
    "answerCues": {
      "A": [
        "使用基于属性的存取控制 (ABAC) 授予对 AWS 帐户的存取权限"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "22": {
    "when": "AWS Lambda + 解决方案架构师应该建议什么来改善客户体验",
    "target": "透过API Gateway级别的使用计划实施API限制",
    "avoid": "",
    "questionCues": [
      "AWS Lambda",
      "解决方案架构师应该建议什么来改善客户体验"
    ],
    "answerCues": {
      "B": [
        "透过API Gateway级别的使用计划实施API限制"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "23": {
    "when": "大约需要 72 小时才能完成 + 解决方案架构师需要透过取代共享档案系统实例来降低成本",
    "target": "使用 Amazon S3 中的资料建立新的档案系统",
    "avoid": "",
    "questionCues": [
      "大约需要 72 小时才能完成",
      "解决方案架构师需要透过取代共享档案系统实例来降低成本"
    ],
    "answerCues": {
      "A": [
        "使用 Amazon S3 中的资料建立新的档案系统"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "24": {
    "when": "解决方案架构师必须确保服务高度可用 + 该服务必须使用固定地址分配",
    "target": "为服务建立 Amazon EC2 实例",
    "avoid": "",
    "questionCues": [
      "解决方案架构师必须确保服务高度可用",
      "该服务必须使用固定地址分配"
    ],
    "answerCues": {
      "C": [
        "为服务建立 Amazon EC2 实例"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "25": {
    "when": "解决方案架构师需要将系统迁移到Amazon EC2实例 + 此解决方案必须保持高可用性",
    "target": "每个 Availability Zone 中运行一个实例作为 Spot 实例",
    "avoid": "",
    "questionCues": [
      "解决方案架构师需要将系统迁移到Amazon EC2实例",
      "此解决方案必须保持高可用性"
    ],
    "answerCues": {
      "D": [
        "每个 Availability Zone 中运行一个实例作为 Spot 实例"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "26": {
    "when": "CloudFormation 范本中指定的哪些资源能够以最少的营运开销满足安全工程师的要求",
    "target": "指定 Secrets Manager RotationSchedule 资源以每 90 天轮换一次资料库密码",
    "avoid": "",
    "questionCues": [
      "CloudFormation 范本中指定的哪些资源能够以最少的营运开销满足安全工程师的要求"
    ],
    "answerCues": {
      "A": [
        "指定 Secrets Manager RotationSchedule 资源以每 90 天轮换一次资料库密码"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "27": {
    "when": "解决方案架构师必须使用无伺服器架构 + 该解决方案必须根据需求自动扩展",
    "target": "A：Amazon API Gateway REST API；C：这些函数从 DynamoDB 表传回资料",
    "avoid": "",
    "questionCues": [
      "解决方案架构师必须使用无伺服器架构",
      "该解决方案必须根据需求自动扩展"
    ],
    "answerCues": {
      "A": [
        "Amazon API Gateway REST API"
      ],
      "C": [
        "这些函数从 DynamoDB 表传回资料"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "28": {
    "when": "JSON 文件中定义 + 接受 HTTP 和 HTTPS 请求的重定向服务",
    "target": "B：Application Load Balancer；C：建立一个 AWS Lambda 函数；F：AWS 证书管理器 (ACM) + 主题备用名称",
    "avoid": "",
    "questionCues": [
      "JSON 文件中定义",
      "接受 HTTP 和 HTTPS 请求的重定向服务"
    ],
    "answerCues": {
      "B": [
        "Application Load Balancer"
      ],
      "C": [
        "建立一个 AWS Lambda 函数"
      ],
      "F": [
        "AWS 证书管理器 (ACM)",
        "主题备用名称"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "29": {
    "when": "该公司希望确定在 EC2 实例上运行的安全工具的成本 + 成本计算必须尽可能准确",
    "target": "在组织的管理帐户中",
    "avoid": "",
    "questionCues": [
      "该公司希望确定在 EC2 实例上运行的安全工具的成本",
      "成本计算必须尽可能准确"
    ],
    "answerCues": {
      "A": [
        "在组织的管理帐户中"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "30": {
    "when": "该公司希望 + 该公司都希望自动执行建立新 VPC 和中转网关附件的过程",
    "target": "A：使用 AWS Resource Access Manager 与成员帐户共用中转网关；C：使用中转网关 ID 将附件与管理帐户中的中转网关关联",
    "avoid": "",
    "questionCues": [
      "该公司希望",
      "该公司都希望自动执行建立新 VPC 和中转网关附件的过程"
    ],
    "answerCues": {
      "A": [
        "使用 AWS Resource Access Manager 与成员帐户共用中转网关"
      ],
      "C": [
        "使用中转网关 ID 将附件与管理帐户中的中转网关关联"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "31": {
    "when": "一家企业公司希望 + 采购团队希望私人市场的管理仅限于名为采购经理角色的角色",
    "target": "创建组织根级别 SCP",
    "avoid": "",
    "questionCues": [
      "一家企业公司希望",
      "采购团队希望私人市场的管理仅限于名为采购经理角色的角色"
    ],
    "answerCues": {
      "C": [
        "创建组织根级别 SCP"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "32": {
    "when": "OU + 解决方案架构师应该采取什么措施来消除开发人员使用本政策范围以外的服务的能力",
    "target": "从开发者帐户的 OU 中删除完整AWS存取权限 SCP",
    "avoid": "",
    "questionCues": [
      "OU",
      "解决方案架构师应该采取什么措施来消除开发人员使用本政策范围以外的服务的能力"
    ],
    "answerCues": {
      "B": [
        "从开发者帐户的 OU 中删除完整AWS存取权限 SCP"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "33": {
    "when": "该应用程式无法跟上流量 + 解决方案架构师需要实作一个解决方案",
    "target": "更新Route 53记录以指向ALB",
    "avoid": "别选“该函数对 Auto Scaling 组变更做出反应并更新 Route 53 记录”。",
    "questionCues": [
      "该应用程式无法跟上流量",
      "解决方案架构师需要实作一个解决方案"
    ],
    "answerCues": {
      "D": [
        "更新Route 53记录以指向ALB"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "34": {
    "when": "解决方案架构师必须设计一个解决方案 + 以便每个OU 都可以查看其AWS 帐户的使用成本明细",
    "target": "从 AWS Organizations ​​管理帐户建立 AWS 成本和使用情况报告 (CUR)",
    "avoid": "",
    "questionCues": [
      "解决方案架构师必须设计一个解决方案",
      "以便每个OU 都可以查看其AWS 帐户的使用成本明细"
    ],
    "answerCues": {
      "B": [
        "从 AWS Organizations ​​管理帐户建立 AWS 成本和使用情况报告 (CUR)"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "35": {
    "when": "该公司将部分基于 Windows 的工作负载迁移到AWS + 并需要在云端中的档案系统上提供资料",
    "target": "Amazon FSx",
    "avoid": "",
    "questionCues": [
      "该公司将部分基于 Windows 的工作负载迁移到AWS",
      "并需要在云端中的档案系统上提供资料"
    ],
    "answerCues": {
      "B": [
        "Amazon FSx"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "36": {
    "when": "公司需要跨越多个 AWS Regions 的弹性 + 创建了一个S3桶",
    "target": "在 us-east-1 中的S3储存桶上配置复制 + 设定一个 Amazon CloudFront 分配",
    "avoid": "核对题目限制与完整选项。",
    "questionCues": [
      "公司需要跨越多个 AWS Regions 的弹性",
      "创建了一个S3桶"
    ],
    "answerCues": {
      "C": [
        "在 us-east-1 中的S3储存桶上配置复制",
        "设定一个 Amazon CloudFront 分配"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "37": {
    "when": "公司管理层已下令将应用程式转移到AWS + 解决方案架构师必须设计可扩展且高度可用的解决方案",
    "target": "堆叠应启动具有保留删除策略的 Amazon Aurora MySQL 资料库集群的 Multi-AZ 部署",
    "avoid": "",
    "questionCues": [
      "公司管理层已下令将应用程式转移到AWS",
      "解决方案架构师必须设计可扩展且高度可用的解决方案"
    ],
    "answerCues": {
      "B": [
        "堆叠应启动具有保留删除策略的 Amazon Aurora MySQL 资料库集群的 Multi-AZ 部署"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "38": {
    "when": "解决方案架构师应该如何在所有 AWS 帐户中部署 CloudFormation StackSet",
    "target": "在组织管理帐户中建立堆叠集",
    "avoid": "",
    "questionCues": [
      "解决方案架构师应该如何在所有 AWS 帐户中部署 CloudFormation StackSet"
    ],
    "answerCues": {
      "C": [
        "在组织管理帐户中建立堆叠集"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "39": {
    "when": "迁移到AWS + 以便公司能够以最具成本效益的方式在 AWS 上运行其工作负载",
    "target": "A：AWS Application Discovery Agent；D：AWS Migration Hub + 将伺服器分组到应用程式中进行迁移；E：产生建议的实例类型和相关成本",
    "avoid": "",
    "questionCues": [
      "迁移到AWS",
      "以便公司能够以最具成本效益的方式在 AWS 上运行其工作负载"
    ],
    "answerCues": {
      "A": [
        "AWS Application Discovery Agent"
      ],
      "D": [
        "AWS Migration Hub",
        "将伺服器分组到应用程式中进行迁移"
      ],
      "E": [
        "产生建议的实例类型和相关成本"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "40": {
    "when": "解决方案架构师必须在不影响服务安全状况或增加持续营运时间的情况下尽可能减少云端支出",
    "target": "将端点策略附加到端点",
    "avoid": "",
    "questionCues": [
      "解决方案架构师必须在不影响服务安全状况或增加持续营运时间的情况下尽可能减少云端支出"
    ],
    "answerCues": {
      "C": [
        "将端点策略附加到端点"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "41": {
    "when": "持续 4 小时 + 解决方案架构师需要实施一个解决方案来最大限度地降低表的成本",
    "target": "购买预留的 RCU 和 WCU 以符合平均负载",
    "avoid": "",
    "questionCues": [
      "持续 4 小时",
      "解决方案架构师需要实施一个解决方案来最大限度地降低表的成本"
    ],
    "answerCues": {
      "A": [
        "购买预留的 RCU 和 WCU 以符合平均负载"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "42": {
    "when": "每个媒体档案可能需要长达 1 小时来处理 + 最具成本效益的迁移建议是什么",
    "target": "根据 SQS 伫列长度缩放 EC2 实例",
    "avoid": "",
    "questionCues": [
      "每个媒体档案可能需要长达 1 小时来处理",
      "最具成本效益的迁移建议是什么"
    ],
    "answerCues": {
      "D": [
        "根据 SQS 伫列长度缩放 EC2 实例"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "43": {
    "when": "公司必须保留所有输入资料的副本 + 并要求解决方案架构师推荐新的解决方案",
    "target": "将集群中的资料节点数量减少到 2 个 新增 UltraWarm 节点来处理预期容量",
    "avoid": "",
    "questionCues": [
      "公司必须保留所有输入资料的副本",
      "并要求解决方案架构师推荐新的解决方案"
    ],
    "answerCues": {
      "B": [
        "将集群中的资料节点数量减少到 2 个 新增 UltraWarm 节点来处理预期容量"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "44": {
    "when": "OU + 安全团队需要删除建立包含 0.0.0.0/0 作为来源的安全群组入站规则的功能",
    "target": "值为 0.0.0.0/0 时拒绝 ec2:AuthorizeSecurityGroupIngress 操作",
    "avoid": "",
    "questionCues": [
      "OU",
      "安全团队需要删除建立包含 0.0.0.0/0 作为来源的安全群组入站规则的功能"
    ],
    "answerCues": {
      "D": [
        "值为 0.0.0.0/0 时拒绝 ec2:AuthorizeSecurityGroupIngress 操作"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "45": {
    "when": "ALB + 该公司希望将解决方案迁移到无伺服器架构",
    "target": "Amazon API Gateway HTTP API",
    "avoid": "",
    "questionCues": [
      "ALB",
      "该公司希望将解决方案迁移到无伺服器架构"
    ],
    "answerCues": {
      "B": [
        "Amazon API Gateway HTTP API"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "46": {
    "when": "某公司计划将 1,000 台 on-premises 伺服器迁移到 AWS + 迁移计划的一部分",
    "target": "使用 Amazon Athena 对 Amazon S3 中的资料执行预先定义查询",
    "avoid": "",
    "questionCues": [
      "某公司计划将 1,000 台 on-premises 伺服器迁移到 AWS",
      "迁移计划的一部分"
    ],
    "answerCues": {
      "D": [
        "使用 Amazon Athena 对 Amazon S3 中的资料执行预先定义查询"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "47": {
    "when": "该公司需要将该应用程式与外部提供者的新服务整合 + 公司必须向外部提供者提供单一公用 IP 位址",
    "target": "部署NAT网关",
    "avoid": "",
    "questionCues": [
      "该公司需要将该应用程式与外部提供者的新服务整合",
      "公司必须向外部提供者提供单一公用 IP 位址"
    ],
    "answerCues": {
      "A": [
        "部署NAT网关"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "48": {
    "when": "应用程式不符合效能要求 + 解决方案架构师必须提高应用程式的效能",
    "target": "B：使用RDS代理设定到Aurora资料库的读取端点的连接池；D：将 Lambda 函数中用于开启资料库连线的程式码移至事件处理程序之外",
    "avoid": "",
    "questionCues": [
      "应用程式不符合效能要求",
      "解决方案架构师必须提高应用程式的效能"
    ],
    "answerCues": {
      "B": [
        "使用RDS代理设定到Aurora资料库的读取端点的连接池"
      ],
      "D": [
        "将 Lambda 函数中用于开启资料库连线的程式码移至事件处理程序之外"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "49": {
    "when": "Amazon EC2 + 安全性要求之一是在客户端和 Web 伺服器之间的传输中启用端对端加密",
    "target": "设定第三方 SSL 凭证并将其安装在每个 EC2 实例上",
    "avoid": "",
    "questionCues": [
      "Amazon EC2",
      "安全性要求之一是在客户端和 Web 伺服器之间的传输中启用端对端加密"
    ],
    "answerCues": {
      "C": [
        "设定第三方 SSL 凭证并将其安装在每个 EC2 实例上"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "50": {
    "when": "公司必须解决资料载入问题 + 该公司还需要在不中断或不改变公司客户的情况下进行迁移",
    "target": "将收集器DNS记录指向ALB",
    "avoid": "",
    "questionCues": [
      "公司必须解决资料载入问题",
      "该公司还需要在不中断或不改变公司客户的情况下进行迁移"
    ],
    "answerCues": {
      "C": [
        "将收集器DNS记录指向ALB"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "51": {
    "when": "根据新要求 + S3储存桶中目前和未来的所有物件都必须使用公司安全团队管理的金钥进行加密",
    "target": "AWS KMS 托管加密金钥 (SSE- KMS) + 重新上传S3储存桶中的所有物件",
    "avoid": "核对题目限制与完整选项。",
    "questionCues": [
      "根据新要求",
      "S3储存桶中目前和未来的所有物件都必须使用公司安全团队管理的金钥进行加密"
    ],
    "answerCues": {
      "B": [
        "AWS KMS 托管加密金钥 (SSE- KMS)",
        "重新上传S3储存桶中的所有物件"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "52": {
    "when": "解决方案架构师必须配置应用程序 + 使其具有高可用性和容错能力",
    "target": "将一个来源配置为主要来源",
    "avoid": "",
    "questionCues": [
      "解决方案架构师必须配置应用程序",
      "使其具有高可用性和容错能力"
    ],
    "answerCues": {
      "B": [
        "将一个来源配置为主要来源"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "53": {
    "when": "AWS Config + 本公司的网路团队需要集中管理属于全球办事处的内部 IP 位址范围清单",
    "target": "在中转帐号中",
    "avoid": "",
    "questionCues": [
      "AWS Config",
      "本公司的网路团队需要集中管理属于全球办事处的内部 IP 位址范围清单"
    ],
    "answerCues": {
      "C": [
        "在中转帐号中"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "54": {
    "when": "以显示每个 API Lambda 函数的建议配置记忆体、建议成本以及当前配置与建议之间的价格差异",
    "target": "将 .csv 档案汇出到 S3 储存桶",
    "avoid": "",
    "questionCues": [
      "以显示每个 API Lambda 函数的建议配置记忆体、建议成本以及当前配置与建议之间的价格差异"
    ],
    "answerCues": {
      "B": [
        "将 .csv 档案汇出到 S3 储存桶"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "55": {
    "when": "公司还必须能够创建报告来比较过去 12 个月的成本并帮助预测未来 12 个月的成本",
    "target": "A：启动代表应用程式和团队的使用者定义成本分配标签；C：在计费和成本管理中为每个应用程式建立成本类别；F：启用 Cost Explorer",
    "avoid": "",
    "questionCues": [
      "公司还必须能够创建报告来比较过去 12 个月的成本并帮助预测未来 12 个月的成本"
    ],
    "answerCues": {
      "A": [
        "启动代表应用程式和团队的使用者定义成本分配标签"
      ],
      "C": [
        "在计费和成本管理中为每个应用程式建立成本类别"
      ],
      "F": [
        "启用 Cost Explorer"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "56": {
    "when": "VPC + 解决方案架构师应该如何确保Web应用程式在迁移后可以继续呼叫第三方API",
    "target": "从位址区块建立弹性IP位址并将其指派给VPC中的NAT网关",
    "avoid": "",
    "questionCues": [
      "VPC",
      "解决方案架构师应该如何确保Web应用程式在迁移后可以继续呼叫第三方API"
    ],
    "answerCues": {
      "B": [
        "从位址区块建立弹性IP位址并将其指派给VPC中的NAT网关"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "57": {
    "when": "管理员建立了以下 SCP + 管理员该如何解决这个问题",
    "target": "指导开发人员为其IAM实体新增Amazon S3权限",
    "avoid": "",
    "questionCues": [
      "管理员建立了以下 SCP",
      "管理员该如何解决这个问题"
    ],
    "answerCues": {
      "C": [
        "指导开发人员为其IAM实体新增Amazon S3权限"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "58": {
    "when": "应用程式团队没有实例的管理 SSH 金钥对 + 应用程式必须继续为用户服务",
    "target": "将具有写入Amazon S3权限的角色附加到实例",
    "avoid": "",
    "questionCues": [
      "应用程式团队没有实例的管理 SSH 金钥对",
      "应用程式必须继续为用户服务"
    ],
    "answerCues": {
      "A": [
        "将具有写入Amazon S3权限的角色附加到实例"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "59": {
    "when": "S3 + 解决方案架构师必须实作使用AWS CLI 的解决方案",
    "target": "B：将储存桶策略附加到来源储存桶；D：在目标帐户中建立IAM策略；F：以目标帐户中的使用者身分执行 aws s3 sync 命令",
    "avoid": "",
    "questionCues": [
      "S3",
      "解决方案架构师必须实作使用AWS CLI 的解决方案"
    ],
    "answerCues": {
      "B": [
        "将储存桶策略附加到来源储存桶"
      ],
      "D": [
        "在目标帐户中建立IAM策略"
      ],
      "F": [
        "以目标帐户中的使用者身分执行 aws s3 sync 命令"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "60": {
    "when": "导致持续几分钟的中断 + 解决方案架构师必须调整部署流程以支援金丝雀版本",
    "target": "为 Lambda 函数的每个新部署版本建立一个别名",
    "avoid": "",
    "questionCues": [
      "导致持续几分钟的中断",
      "解决方案架构师必须调整部署流程以支援金丝雀版本"
    ],
    "answerCues": {
      "A": [
        "为 Lambda 函数的每个新部署版本建立一个别名"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "61": {
    "when": "VPC + 解决方案架构师应该如何提高SFTP解决方案的可靠性和可扩展性",
    "target": "将SFTP伺服器迁移到AWS传输SFTP",
    "avoid": "",
    "questionCues": [
      "VPC",
      "解决方案架构师应该如何提高SFTP解决方案的可靠性和可扩展性"
    ],
    "answerCues": {
      "B": [
        "将SFTP伺服器迁移到AWS传输SFTP"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "62": {
    "when": "迁移到 Amazon EC2 + 解决方案架构师必须在迁移期间保留软体和组态设定",
    "target": "为 VM 汇入建立并套用 IAM 角色",
    "avoid": "",
    "questionCues": [
      "迁移到 Amazon EC2",
      "解决方案架构师必须在迁移期间保留软体和组态设定"
    ],
    "answerCues": {
      "B": [
        "为 VM 汇入建立并套用 IAM 角色"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "63": {
    "when": "解决方案架构师需要重构应用程式的架构以防止呼叫失败 + 该公司不想管理底层基础设施",
    "target": "A：透过建立包含应用程式程式码的Docker映像来修改应用程式部署；B：AWS Fargate",
    "avoid": "",
    "questionCues": [
      "解决方案架构师需要重构应用程式的架构以防止呼叫失败",
      "该公司不想管理底层基础设施"
    ],
    "answerCues": {
      "A": [
        "透过建立包含应用程式程式码的Docker映像来修改应用程式部署"
      ],
      "B": [
        "AWS Fargate"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "64": {
    "when": "公司必须实施一项策略来侦测公司生产 OU 中未静态加密的 Amazon RDS 资料库实例",
    "target": "将护栏应用于生产OU",
    "avoid": "",
    "questionCues": [
      "公司必须实施一项策略来侦测公司生产 OU 中未静态加密的 Amazon RDS 资料库实例"
    ],
    "answerCues": {
      "B": [
        "将护栏应用于生产OU"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "65": {
    "when": "该公司需要加强对 SSH 存取的安全控制 + 解决方案架构师应该",
    "target": "将 IAM 角色附加到所有 EC2 实例",
    "avoid": "",
    "questionCues": [
      "该公司需要加强对 SSH 存取的安全控制",
      "解决方案架构师应该"
    ],
    "answerCues": {
      "D": [
        "将 IAM 角色附加到所有 EC2 实例"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "66": {
    "when": "公司必须为开发商提供固定的每月预算 + 以限制他们的AWS成本",
    "target": "B：作为帐户建立过程的一部分；C：创建 SCP 来拒绝访问昂贵的服务和组件；F：AWS Lambda",
    "avoid": "",
    "questionCues": [
      "公司必须为开发商提供固定的每月预算",
      "以限制他们的AWS成本"
    ],
    "answerCues": {
      "B": [
        "作为帐户建立过程的一部分"
      ],
      "C": [
        "创建 SCP 来拒绝访问昂贵的服务和组件"
      ],
      "F": [
        "AWS Lambda"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "67": {
    "when": "本公司已为Aurora配置了自动备份 + 因此公司必须最大限度地减少停机时间",
    "target": "从来源帐户下载 Lambda 函数部署套件 + AWS RAM",
    "avoid": "别选“与目标帐户共用自动 Aurora 资料库集群快照”。",
    "questionCues": [
      "本公司已为Aurora配置了自动备份",
      "因此公司必须最大限度地减少停机时间"
    ],
    "answerCues": {
      "B": [
        "从来源帐户下载 Lambda 函数部署套件",
        "AWS RAM"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "68": {
    "when": "该公司希望使工作负载具有高可用性和可扩展性 + 该公司还希望减少长期管理费用",
    "target": "公司上传物件时",
    "avoid": "",
    "questionCues": [
      "该公司希望使工作负载具有高可用性和可扩展性",
      "该公司还希望减少长期管理费用"
    ],
    "answerCues": {
      "A": [
        "公司上传物件时"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "69": {
    "when": "应用程式必须具有高可用性 + 并且必须动态扩展以满足用户流量",
    "target": "为每个 ALB 建立单独的记录",
    "avoid": "",
    "questionCues": [
      "应用程式必须具有高可用性",
      "并且必须动态扩展以满足用户流量"
    ],
    "answerCues": {
      "C": [
        "为每个 ALB 建立单独的记录"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "70": {
    "when": "IAM + 他们希望能够使用现有的 Active Directory 凭证存取控制台",
    "target": "配置 IAM Identity Center 并将 AD Connector 设定为身分来源",
    "avoid": "",
    "questionCues": [
      "IAM",
      "他们希望能够使用现有的 Active Directory 凭证存取控制台"
    ],
    "answerCues": {
      "D": [
        "配置 IAM Identity Center 并将 AD Connector 设定为身分来源"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "71": {
    "when": "从澳洲访问该应用程式的用户都经历过上传需要很长时间的情况 + 这些使用者的档案无法完全上传",
    "target": "A：在 S3 储存桶上启用 S3 传输加速；D：配置应用程式将视讯档案分成区块",
    "avoid": "",
    "questionCues": [
      "从澳洲访问该应用程式的用户都经历过上传需要很长时间的情况",
      "这些使用者的档案无法完全上传"
    ],
    "answerCues": {
      "A": [
        "在 S3 储存桶上启用 S3 传输加速"
      ],
      "D": [
        "配置应用程式将视讯档案分成区块"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "72": {
    "when": "故障转移测试后 + 并且无法重新建立连接",
    "target": "建立一个 RDS 代理 + 更新应用程式中的连线设定以指向 RDS 代理端点",
    "avoid": "题目只需解决故障切换后的连接；别额外迁移到 Aurora。",
    "questionCues": [
      "故障转移测试后",
      "并且无法重新建立连接"
    ],
    "answerCues": {
      "B": [
        "建立一个 RDS 代理",
        "更新应用程式中的连线设定以指向 RDS 代理端点"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "73": {
    "when": "每个设备都需要能够透过 MQTT 协定即时发送和接收资料 + 每个装置必须",
    "target": "将每个装置连接到AWS IoT Core",
    "avoid": "",
    "questionCues": [
      "每个设备都需要能够透过 MQTT 协定即时发送和接收资料",
      "每个装置必须"
    ],
    "answerCues": {
      "C": [
        "将每个装置连接到AWS IoT Core"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "74": {
    "when": "工程师必须 + 解决方案架构师需要创建一个解决方案来对工程师用于存取的IAM角色实施新的限制",
    "target": "并将该策略指派给新的 IAM 服务角色",
    "avoid": "",
    "questionCues": [
      "工程师必须",
      "解决方案架构师需要创建一个解决方案来对工程师用于存取的IAM角色实施新的限制"
    ],
    "answerCues": {
      "C": [
        "并将该策略指派给新的 IAM 服务角色"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "75": {
    "when": "需要储存在持久位置 + 以便以低延迟进行检索",
    "target": "配置 DynamoDB 生存时间 (TTL) 功能以删除超过 120 天的记录",
    "avoid": "",
    "questionCues": [
      "需要储存在持久位置",
      "以便以低延迟进行检索"
    ],
    "answerCues": {
      "B": [
        "配置 DynamoDB 生存时间 (TTL) 功能以删除超过 120 天的记录"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "76": {
    "when": "该公司希望该网站随时运行以进行线上购买 + Amazon RDS",
    "target": "在 Amazon RDS 上设定唯读副本",
    "avoid": "",
    "questionCues": [
      "该公司希望该网站随时运行以进行线上购买",
      "Amazon RDS"
    ],
    "answerCues": {
      "D": [
        "在 Amazon RDS 上设定唯读副本"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "77": {
    "when": "VPN + Example Corp. 希望从其本地伺服器连接到 VPC B",
    "target": "更新所有网路的中转网关路由表",
    "avoid": "",
    "questionCues": [
      "VPN",
      "Example Corp. 希望从其本地伺服器连接到 VPC B"
    ],
    "answerCues": {
      "A": [
        "更新所有网路的中转网关路由表"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "78": {
    "when": "旧版 SMTP 伺服器不支援 TLS 加密并使用 TCP 连接埠 25 + 公司应该如何",
    "target": "Amazon SES SMTP",
    "avoid": "",
    "questionCues": [
      "旧版 SMTP 伺服器不支援 TLS 加密并使用 TCP 连接埠 25",
      "公司应该如何"
    ],
    "answerCues": {
      "B": [
        "Amazon SES SMTP"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "79": {
    "when": "收购公司的财务团队需要一个解决方案 + 透过自我管理的应用程式报告所有公司的成本",
    "target": "在AmazonAthena中建立一个表",
    "avoid": "",
    "questionCues": [
      "收购公司的财务团队需要一个解决方案",
      "透过自我管理的应用程式报告所有公司的成本"
    ],
    "answerCues": {
      "A": [
        "在AmazonAthena中建立一个表"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "80": {
    "when": "RDS 指标显示写入延迟较高 + 同时维持该平台的成本效益",
    "target": "C：AWS Lambda；E：重新架构资料库层以使用 Amazon DynamoDB 而不是 RDS MySQL 资料库实例",
    "avoid": "",
    "questionCues": [
      "RDS 指标显示写入延迟较高",
      "同时维持该平台的成本效益"
    ],
    "answerCues": {
      "C": [
        "AWS Lambda"
      ],
      "E": [
        "重新架构资料库层以使用 Amazon DynamoDB 而不是 RDS MySQL 资料库实例"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "81": {
    "when": "并已与其最大客户完成了概念验证 + 该公司必须改善欧洲以外地区的延迟",
    "target": "A：在 S3 储存桶上启用 S3 传输加速；C：将 API Gateway Regional 端点改为边缘最佳化端点",
    "avoid": "",
    "questionCues": [
      "并已与其最大客户完成了概念验证",
      "该公司必须改善欧洲以外地区的延迟"
    ],
    "answerCues": {
      "A": [
        "在 S3 储存桶上启用 S3 传输加速"
      ],
      "C": [
        "将 API Gateway Regional 端点改为边缘最佳化端点"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "82": {
    "when": "公司需要优化储存成本 + 以尽可能低的成本维持照片和影片的毫秒检索可用性",
    "target": "在S3储存桶上配置S3Intelligent-Tiering",
    "avoid": "",
    "questionCues": [
      "公司需要优化储存成本",
      "以尽可能低的成本维持照片和影片的毫秒检索可用性"
    ],
    "answerCues": {
      "A": [
        "在S3储存桶上配置S3Intelligent-Tiering"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "83": {
    "when": "使用 Amazon S3 在各种储存类别中储存档案和影像 + 去年该公司的S3成本大幅增加",
    "target": "升级预设仪表板以包含储存趋势的高级指标",
    "avoid": "",
    "questionCues": [
      "使用 Amazon S3 在各种储存类别中储存档案和影像",
      "去年该公司的S3成本大幅增加"
    ],
    "answerCues": {
      "C": [
        "升级预设仪表板以包含储存趋势的高级指标"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "84": {
    "when": "该公司的业务扩展计划包括跨多个 AWS 帐户在多个 Regions 中进行部署",
    "target": "从具有必要的 IAM 权限的帐户部署 Cloud Formation 范本",
    "avoid": "",
    "questionCues": [
      "该公司的业务扩展计划包括跨多个 AWS 帐户在多个 Regions 中进行部署"
    ],
    "answerCues": {
      "C": [
        "从具有必要的 IAM 权限的帐户部署 Cloud Formation 范本"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "85": {
    "when": "该公司的业务扩展计划包括跨多个 AWS 帐户在多个 Regions 中进行部署",
    "target": "从具有必要的 IAM 权限的帐户部署 Cloud Formation 范本",
    "avoid": "",
    "questionCues": [
      "该公司的业务扩展计划包括跨多个 AWS 帐户在多个 Regions 中进行部署"
    ],
    "answerCues": {
      "C": [
        "从具有必要的 IAM 权限的帐户部署 Cloud Formation 范本"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "86": {
    "when": "它应该允许每小时发布几次更改 + 它应该能够尽快回滚更改",
    "target": "交换暂存环境和生产环境 URL",
    "avoid": "",
    "questionCues": [
      "它应该允许每小时发布几次更改",
      "它应该能够尽快回滚更改"
    ],
    "answerCues": {
      "B": [
        "交换暂存环境和生产环境 URL"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "87": {
    "when": "EC2 实例均与相同安全群组关联 + 解决方案架构师需要向安全性群组新增规则",
    "target": "B：将出站规则加入到EC2实例的安全群组；C：将入站规则新增至资料库集群的安全性群组",
    "avoid": "",
    "questionCues": [
      "EC2 实例均与相同安全群组关联",
      "解决方案架构师需要向安全性群组新增规则"
    ],
    "answerCues": {
      "B": [
        "将出站规则加入到EC2实例的安全群组"
      ],
      "C": [
        "将入站规则新增至资料库集群的安全性群组"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "88": {
    "when": "公司使用AWS Organizations来管理每个业务部门单独的AWS帐户",
    "target": "在组织的管理帐户中配置 AWS 预算",
    "avoid": "",
    "questionCues": [
      "公司使用AWS Organizations来管理每个业务部门单独的AWS帐户"
    ],
    "answerCues": {
      "B": [
        "在组织的管理帐户中配置 AWS 预算"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "89": {
    "when": "该公司担心 + 储存在Amazon RDS资料库或AmazonEBS卷中的重要资料也可能被删除",
    "target": "修改 CloudFormation 模板",
    "avoid": "",
    "questionCues": [
      "该公司担心",
      "储存在Amazon RDS资料库或AmazonEBS卷中的重要资料也可能被删除"
    ],
    "answerCues": {
      "A": [
        "修改 CloudFormation 模板"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "90": {
    "when": "NAT + 解决方案架构师必须确定流量是否代表来自网际网路的未经请求的入站连线",
    "target": "打开AmazonCloudWatch控制台 + 目标位址设定为“like 203.0”",
    "avoid": "别选“选择包含NAT网关的弹性网路介面和私有实例的弹性网路介面的日志组”。",
    "questionCues": [
      "NAT",
      "解决方案架构师必须确定流量是否代表来自网际网路的未经请求的入站连线"
    ],
    "answerCues": {
      "B": [
        "打开AmazonCloudWatch控制台",
        "目标位址设定为“like 203.0”"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "91": {
    "when": "该公司希望使用 Amazon S3 托管加密金钥 (SSE- S3) 实施伺服器端加密",
    "target": "使用 S3 Batch 操作在相同位置复制和加密物件",
    "avoid": "",
    "questionCues": [
      "该公司希望使用 Amazon S3 托管加密金钥 (SSE- S3) 实施伺服器端加密"
    ],
    "answerCues": {
      "A": [
        "使用 S3 Batch 操作在相同位置复制和加密物件"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "92": {
    "when": "出于合规原因 + 公司必须无限期保留所有资料",
    "target": "使用 AWS Glue Data Catalog 和 Amazon Athena 查询资料",
    "avoid": "",
    "questionCues": [
      "出于合规原因",
      "公司必须无限期保留所有资料"
    ],
    "answerCues": {
      "C": [
        "使用 AWS Glue Data Catalog 和 Amazon Athena 查询资料"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "93": {
    "when": "因此希望使用 AWS + 资料在传输过程中必须加密",
    "target": "将资料复制到设备",
    "avoid": "",
    "questionCues": [
      "因此希望使用 AWS",
      "资料在传输过程中必须加密"
    ],
    "answerCues": {
      "A": [
        "将资料复制到设备"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "94": {
    "when": "解决方案架构师需要自动化表单的手动处理 + 并最大限度地减少长期营运费用",
    "target": "Amazon Textract",
    "avoid": "",
    "questionCues": [
      "解决方案架构师需要自动化表单的手动处理",
      "并最大限度地减少长期营运费用"
    ],
    "answerCues": {
      "D": [
        "Amazon Textract"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "95": {
    "when": "该公司不想对应用程式进行任何重大更改",
    "target": "AMI + Amazon MQ + Amazon EKS",
    "avoid": "别选“在一组不同的 EC2 实例上安装 Kubernetes 以托管订单处理后端”。",
    "questionCues": [
      "该公司不想对应用程式进行任何重大更改"
    ],
    "answerCues": {
      "A": [
        "AMI",
        "Amazon MQ",
        "Amazon EKS"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "96": {
    "when": "解决方案架构师需要为将储存在新的Amazon S3储存桶中的物件实作客户端加密机制",
    "target": "kms:GenerateDataKey",
    "avoid": "",
    "questionCues": [
      "解决方案架构师需要为将储存在新的Amazon S3储存桶中的物件实作客户端加密机制"
    ],
    "answerCues": {
      "A": [
        "kms:GenerateDataKey"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "97": {
    "when": "该公司希望改善应用程式的安全状况 + 并计划使用 AWS WAF Web ACL",
    "target": "将Web ACL规则的操作设定为计数",
    "avoid": "",
    "questionCues": [
      "该公司希望改善应用程式的安全状况",
      "并计划使用 AWS WAF Web ACL"
    ],
    "answerCues": {
      "A": [
        "将Web ACL规则的操作设定为计数"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "98": {
    "when": "解决方案架构师必须改进公司管理组织中AWS帐户的通用安全群组规则的方式 + CIDR",
    "target": "使用所有内部 CIDR 范围填入客户管理的前缀清单",
    "avoid": "",
    "questionCues": [
      "解决方案架构师必须改进公司管理组织中AWS帐户的通用安全群组规则的方式",
      "CIDR"
    ],
    "answerCues": {
      "C": [
        "使用所有内部 CIDR 范围填入客户管理的前缀清单"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "99": {
    "when": "多个 AWS 帐户 + 可扩展的 AWS Client VPN 解决方案",
    "target": "在主 AWS 帐户中建立 Client VPN 端点 + 配置允许存取内部应用程式的所需路由",
    "avoid": "已有 VPC 对等连接；不要各建端点或 Transit Gateway。",
    "questionCues": [
      "多个 AWS 帐户",
      "可扩展的 AWS Client VPN 解决方案"
    ],
    "answerCues": {
      "B": [
        "在主 AWS 帐户中建立 Client VPN 端点",
        "配置允许存取内部应用程式的所需路由"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "100": {
    "when": "AWS Lambda + 解决方案架构师需要解耦第三方服务呼叫并确保所有呼叫最终完成",
    "target": "Amazon SQS",
    "avoid": "",
    "questionCues": [
      "AWS Lambda",
      "解决方案架构师需要解耦第三方服务呼叫并确保所有呼叫最终完成"
    ],
    "answerCues": {
      "A": [
        "Amazon SQS"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "101": {
    "when": "该公司需要一种解决方案 + 能够跨 AWS 帐户安全地存取 S3 储存桶中的资料",
    "target": "从行销帐户中",
    "avoid": "",
    "questionCues": [
      "该公司需要一种解决方案",
      "能够跨 AWS 帐户安全地存取 S3 储存桶中的资料"
    ],
    "answerCues": {
      "D": [
        "从行销帐户中"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "102": {
    "when": "该公司希望迁移到 AWS 托管资料库服务 + 解决方案架构师必须在AWS上设计异质资料库迁移",
    "target": "迁移到Amazon RDS",
    "avoid": "",
    "questionCues": [
      "该公司希望迁移到 AWS 托管资料库服务",
      "解决方案架构师必须在AWS上设计异质资料库迁移"
    ],
    "answerCues": {
      "C": [
        "迁移到Amazon RDS"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "103": {
    "when": "Amazon S3 + 设计团队需要将资产载入到生产帐户中的S3桶中",
    "target": "A：在生产帐户中，建立一个新的 IAM 策略 + 允许对 S3 储存桶进行读写存取；C：将开发帐户定义为受信任的实体；E：允许对生产帐户中的角色执行 sts:AssumeRole 操作",
    "avoid": "",
    "questionCues": [
      "Amazon S3",
      "设计团队需要将资产载入到生产帐户中的S3桶中"
    ],
    "answerCues": {
      "A": [
        "在生产帐户中，建立一个新的 IAM 策略",
        "允许对 S3 储存桶进行读写存取"
      ],
      "C": [
        "将开发帐户定义为受信任的实体"
      ],
      "E": [
        "允许对生产帐户中的角色执行 sts:AssumeRole 操作"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "104": {
    "when": "为了节省开发成本 + 解决方案架构师必须缓解效能问题",
    "target": "修改现有环境的容量配置以使用负载平衡的环境类型",
    "avoid": "",
    "questionCues": [
      "为了节省开发成本",
      "解决方案架构师必须缓解效能问题"
    ],
    "answerCues": {
      "C": [
        "修改现有环境的容量配置以使用负载平衡的环境类型"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "105": {
    "when": "该应用程式在本月能够处理适量的流量 + 同时对效能的影响最小",
    "target": "并建立多个额外的唯读副本来处理月底的负载",
    "avoid": "",
    "questionCues": [
      "该应用程式在本月能够处理适量的流量",
      "同时对效能的影响最小"
    ],
    "answerCues": {
      "B": [
        "并建立多个额外的唯读副本来处理月底的负载"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "106": {
    "when": "该公司希望将应用程式迁移到AWS + 并最大限度地减少维护伺服器的管理开销",
    "target": "AWS Fargate",
    "avoid": "",
    "questionCues": [
      "该公司希望将应用程式迁移到AWS",
      "并最大限度地减少维护伺服器的管理开销"
    ],
    "answerCues": {
      "A": [
        "AWS Fargate"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "107": {
    "when": "HTTP + 解决方案架构师需要重新设计应用程式以支援故障转移到另一个AWSRegion",
    "target": "将 Lambda 函数和 API Gateway 端点部署到 us-west-2 Region",
    "avoid": "",
    "questionCues": [
      "HTTP",
      "解决方案架构师需要重新设计应用程式以支援故障转移到另一个AWSRegion"
    ],
    "answerCues": {
      "D": [
        "将 Lambda 函数和 API Gateway 端点部署到 us-west-2 Region"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "108": {
    "when": "每个 OU 都有多个 AWS 帐户 + 人力资源部门希望确保其他部门不能分享 RI 折扣",
    "target": "在AWS 计费和成本管理控制台中",
    "avoid": "",
    "questionCues": [
      "每个 OU 都有多个 AWS 帐户",
      "人力资源部门希望确保其他部门不能分享 RI 折扣"
    ],
    "answerCues": {
      "C": [
        "在AWS 计费和成本管理控制台中"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "109": {
    "when": "EC2 + AWS Systems Manager 会话管理器已配置",
    "target": "暂停Auto Scaling组的终止进程",
    "avoid": "",
    "questionCues": [
      "EC2",
      "AWS Systems Manager 会话管理器已配置"
    ],
    "answerCues": {
      "D": [
        "暂停Auto Scaling组的终止进程"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "110": {
    "when": "一家公司希望 + 管理员还必须能够自动更新和修复所有帐户中不合规的 AWS WAF 规则",
    "target": "根据需要更新参数以新增或删除帐户或OU",
    "avoid": "",
    "questionCues": [
      "一家公司希望",
      "管理员还必须能够自动更新和修复所有帐户中不合规的 AWS WAF 规则"
    ],
    "answerCues": {
      "A": [
        "根据需要更新参数以新增或删除帐户或OU"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "111": {
    "when": "该储存桶配置为使用 AWS KMS 托管加密金钥 (SSE-KMS) 进行伺服器端加密",
    "target": "变更 Lambda 函数的 IAM 角色 + 在 VPC 中为 Amazon S3 部署网关 VPC 端点",
    "avoid": "核对题目限制与完整选项。",
    "questionCues": [
      "该储存桶配置为使用 AWS KMS 托管加密金钥 (SSE-KMS) 进行伺服器端加密"
    ],
    "answerCues": {
      "A": [
        "变更 Lambda 函数的 IAM 角色",
        "在 VPC 中为 Amazon S3 部署网关 VPC 端点"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "112": {
    "when": "迁移到AWS云端 + 解决方案架构师必须实作控制机制来限制只有开发人员可以启动的执行个体类型",
    "target": "建立新的IAM策略",
    "avoid": "",
    "questionCues": [
      "迁移到AWS云端",
      "解决方案架构师必须实作控制机制来限制只有开发人员可以启动的执行个体类型"
    ],
    "answerCues": {
      "C": [
        "建立新的IAM策略"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "113": {
    "when": "该公司要求将云端基础设施的成本分配给自己的专案 + 多个 Amazon EC2 实例缺少用于成本",
    "target": "A：以寻找缺少标签的资源；B：如果缺少专案标签；E：以收集缺少项目标签的 EC2 实例清单",
    "avoid": "",
    "questionCues": [
      "该公司要求将云端基础设施的成本分配给自己的专案",
      "多个 Amazon EC2 实例缺少用于成本"
    ],
    "answerCues": {
      "A": [
        "以寻找缺少标签的资源"
      ],
      "B": [
        "如果缺少专案标签"
      ],
      "E": [
        "以收集缺少项目标签的 EC2 实例清单"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "114": {
    "when": "资料库无法扩展 + 缓冲区可自动扩展以符合资料吞吐量",
    "target": "A：使用Amazon Kinesis Data Firehose来缓冲事件；D：使用透过 Amazon ES 部署的 Kibana 端点来建立近乎即时的视觉化和仪表板",
    "avoid": "",
    "questionCues": [
      "资料库无法扩展",
      "缓冲区可自动扩展以符合资料吞吐量"
    ],
    "answerCues": {
      "A": [
        "使用Amazon Kinesis Data Firehose来缓冲事件"
      ],
      "D": [
        "使用透过 Amazon ES 部署的 Kibana 端点来建立近乎即时的视觉化和仪表板"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "115": {
    "when": "解决方案架构师必须审查基础架构 + 解决方案架构师需要降低成本并维护应用程式的功能",
    "target": "确保VPC端点策略允许来自应用程式的流量",
    "avoid": "",
    "questionCues": [
      "解决方案架构师必须审查基础架构",
      "解决方案架构师需要降低成本并维护应用程式的功能"
    ],
    "answerCues": {
      "D": [
        "确保VPC端点策略允许来自应用程式的流量"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "116": {
    "when": "网路上不能存在单点故障 + 以实现高可用性",
    "target": "中转 VIF + 将Transit Gateways彼此对等以支援跨Region 路由",
    "avoid": "别选“建立从 DX-8 连接到单独的 Direct Connect 闸道的中转 VIF”。",
    "questionCues": [
      "网路上不能存在单点故障",
      "以实现高可用性"
    ],
    "answerCues": {
      "D": [
        "中转 VIF",
        "将Transit Gateways彼此对等以支援跨Region 路由"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "117": {
    "when": "公司的安全团队必须批准所有新 IAM 用户的创建 + 安全团队必须收到批准用户的通知",
    "target": "A：定义一个模式；D：呼叫 AWS Step Functions 状态机来删除存取权限；E：使用Amazon简单通知服务（Amazon SNS）通知安全团队",
    "avoid": "",
    "questionCues": [
      "公司的安全团队必须批准所有新 IAM 用户的创建",
      "安全团队必须收到批准用户的通知"
    ],
    "answerCues": {
      "A": [
        "定义一个模式"
      ],
      "D": [
        "呼叫 AWS Step Functions 状态机来删除存取权限"
      ],
      "E": [
        "使用Amazon简单通知服务（Amazon SNS）通知安全团队"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "118": {
    "when": "该公司希望使用多帐户结构来集中管理对所有帐户和应用程式的存取 + 公司必须为开发创建单独的帐户",
    "target": "A：使用AWS Control Tower部署登陆区环境；C：配置适当的路由表；D：为现有帐户建立具有所需 MFA 的适当权限集",
    "avoid": "",
    "questionCues": [
      "该公司希望使用多帐户结构来集中管理对所有帐户和应用程式的存取",
      "公司必须为开发创建单独的帐户"
    ],
    "answerCues": {
      "A": [
        "使用AWS Control Tower部署登陆区环境"
      ],
      "C": [
        "配置适当的路由表"
      ],
      "D": [
        "为现有帐户建立具有所需 MFA 的适当权限集"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "119": {
    "when": "该公司希望降低成本 + 解决方案架构师应该如何做才能以最少的营运工作来降低成本",
    "target": "该函数根据标签停止实例",
    "avoid": "",
    "questionCues": [
      "该公司希望降低成本",
      "解决方案架构师应该如何做才能以最少的营运工作来降低成本"
    ],
    "answerCues": {
      "B": [
        "该函数根据标签停止实例"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "120": {
    "when": "并将 AWS Lambda 整合 + 使客户能够为每秒进行一定数量的 API 呼叫的容量付费",
    "target": "该公司达到了 API Gateway 帐户每秒调用次数限制",
    "avoid": "",
    "questionCues": [
      "并将 AWS Lambda 整合",
      "使客户能够为每秒进行一定数量的 API 呼叫的容量付费"
    ],
    "answerCues": {
      "C": [
        "该公司达到了 API Gateway 帐户每秒调用次数限制"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "121": {
    "when": "该公司在过去 15 年中一直使用该安全工具 + 公司需要使用安全工具来检查所有进出VPC的封包",
    "target": "A：在现有 VPC 中的新 Auto Scaling 群组中的 EC2 实例上部署安全工具；D：以将流量重定向到安全工具",
    "avoid": "",
    "questionCues": [
      "该公司在过去 15 年中一直使用该安全工具",
      "公司需要使用安全工具来检查所有进出VPC的封包"
    ],
    "answerCues": {
      "A": [
        "在现有 VPC 中的新 Auto Scaling 群组中的 EC2 实例上部署安全工具"
      ],
      "D": [
        "以将流量重定向到安全工具"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "122": {
    "when": "该公司需要设计一种新的数据分析解决方案 + 可以更快地交付并优化成本",
    "target": "AWS Lambda",
    "avoid": "",
    "questionCues": [
      "该公司需要设计一种新的数据分析解决方案",
      "可以更快地交付并优化成本"
    ],
    "answerCues": {
      "A": [
        "AWS Lambda"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "123": {
    "when": "该公司希望在确定网路和安全策略后快速迁移应用程式并使其现代化 + 并且还必须能够与所有VPC通讯",
    "target": "B：在中心网路帐户中建立Direct Connect网关和中转网关；D：与其他帐户共用中转网关；F：仅配置私有子网路",
    "avoid": "",
    "questionCues": [
      "该公司希望在确定网路和安全策略后快速迁移应用程式并使其现代化",
      "并且还必须能够与所有VPC通讯"
    ],
    "answerCues": {
      "B": [
        "在中心网路帐户中建立Direct Connect网关和中转网关"
      ],
      "D": [
        "与其他帐户共用中转网关"
      ],
      "F": [
        "仅配置私有子网路"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "124": {
    "when": "此流程要求所有想要购买或 + 解决方案架构师需要以尽可能最安全的方式实施新流程",
    "target": "A：并启用所有功能；D：将SCP附加到组织的每个OU",
    "avoid": "",
    "questionCues": [
      "此流程要求所有想要购买或",
      "解决方案架构师需要以尽可能最安全的方式实施新流程"
    ],
    "answerCues": {
      "A": [
        "并启用所有功能"
      ],
      "D": [
        "将SCP附加到组织的每个OU"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "125": {
    "when": "最近的 RDS 资料库故障转移测试导致应用程式中断 40 秒 + 将中断时间减少到 20 秒以内",
    "target": "C：在资料库前面使用RDS代理；D：将资料库迁移到AmazonAuroraMySQL；E：建立一个 Amazon Aurora 副本",
    "avoid": "",
    "questionCues": [
      "最近的 RDS 资料库故障转移测试导致应用程式中断 40 秒",
      "将中断时间减少到 20 秒以内"
    ],
    "answerCues": {
      "C": [
        "在资料库前面使用RDS代理"
      ],
      "D": [
        "将资料库迁移到AmazonAuroraMySQL"
      ],
      "E": [
        "建立一个 Amazon Aurora 副本"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "126": {
    "when": "公司必须使用 API 或命令列工具对客户帐户建立最低权限安全存取",
    "target": "包括 IAM 角色信任策略中的外部 ID",
    "avoid": "",
    "questionCues": [
      "公司必须使用 API 或命令列工具对客户帐户建立最低权限安全存取"
    ],
    "answerCues": {
      "D": [
        "包括 IAM 角色信任策略中的外部 ID"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "127": {
    "when": "该映像可以根据需要在任意多个容器中 + 公司需要能够根据运作的容器数量经济有效地分配资源",
    "target": "使用 AWS CLI 执行任务命令并将enableECSManagedTags 设为 true 以启动规划应用程式",
    "avoid": "",
    "questionCues": [
      "该映像可以根据需要在任意多个容器中",
      "公司需要能够根据运作的容器数量经济有效地分配资源"
    ],
    "answerCues": {
      "D": [
        "使用 AWS CLI 执行任务命令并将enableECSManagedTags 设为 true 以启动规划应用程式"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "128": {
    "when": "VPC + 其 IPv4 CIDR 区块为 10.10.10.0/24",
    "target": "A：两个 VPC 的 IPv4 CIDR 范围重叠；E：对等接受方帐户中的IAM角色没有正确的权限",
    "avoid": "",
    "questionCues": [
      "VPC",
      "其 IPv4 CIDR 区块为 10.10.10.0/24"
    ],
    "answerCues": {
      "A": [
        "两个 VPC 的 IPv4 CIDR 范围重叠"
      ],
      "E": [
        "对等接受方帐户中的IAM角色没有正确的权限"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "129": {
    "when": "IAM + 解决方案架构师必须确定每个 Lambda 函数需要哪些权限",
    "target": "AWS Identity and Access Management Access Analyzer",
    "avoid": "",
    "questionCues": [
      "IAM",
      "解决方案架构师必须确定每个 Lambda 函数需要哪些权限"
    ],
    "answerCues": {
      "B": [
        "AWS Identity and Access Management Access Analyzer"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "130": {
    "when": "这些EC2实例的利用率因 + 解决方案架构师必须分析环境并根据结果采取行动",
    "target": "并让它运行至少 12 小时",
    "avoid": "",
    "questionCues": [
      "这些EC2实例的利用率因",
      "解决方案架构师必须分析环境并根据结果采取行动"
    ],
    "answerCues": {
      "C": [
        "并让它运行至少 12 小时"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "131": {
    "when": "解决方案架构师需要实作一个解决方案 + 使资料库管理员能够存取资料库",
    "target": "授予角色存取机密所需的权限",
    "avoid": "",
    "questionCues": [
      "解决方案架构师需要实作一个解决方案",
      "使资料库管理员能够存取资料库"
    ],
    "answerCues": {
      "B": [
        "授予角色存取机密所需的权限"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "132": {
    "when": "部署的 EC2 实例必须 + 此解决方案必须最大限度地提高营运效率",
    "target": "C：aws:RequestedRegion 条件键 + 将 SCP 应用于根OU；E：ec2:InstanceType 条件键 + 将 SCP 应用到 DataOps OU",
    "avoid": "核对题目限制与完整选项。",
    "questionCues": [
      "部署的 EC2 实例必须",
      "此解决方案必须最大限度地提高营运效率"
    ],
    "answerCues": {
      "C": [
        "aws:RequestedRegion 条件键",
        "将 SCP 应用于根OU"
      ],
      "E": [
        "ec2:InstanceType 条件键",
        "将 SCP 应用到 DataOps OU"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "133": {
    "when": "URL 必须从现有的 Region 发布 + 结果必须写入目前Region中现有的S3储存桶",
    "target": "A：使用 Lambda 函数将SQS队列部署到其他Regions；C：将每个Region中的SQS队列订阅到SNS主题",
    "avoid": "",
    "questionCues": [
      "URL 必须从现有的 Region 发布",
      "结果必须写入目前Region中现有的S3储存桶"
    ],
    "answerCues": {
      "A": [
        "使用 Lambda 函数将SQS队列部署到其他Regions"
      ],
      "C": [
        "将每个Region中的SQS队列订阅到SNS主题"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "134": {
    "when": "原始程式码无法修改 + 解决方案架构师应该",
    "target": "使用 AWS Fargate 运行应用程式",
    "avoid": "",
    "questionCues": [
      "原始程式码无法修改",
      "解决方案架构师应该"
    ],
    "answerCues": {
      "C": [
        "使用 AWS Fargate 运行应用程式"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "135": {
    "when": "游戏上线后的第一周内",
    "target": "并在新的Region中新增副本表",
    "avoid": "",
    "questionCues": [
      "游戏上线后的第一周内"
    ],
    "answerCues": {
      "C": [
        "并在新的Region中新增副本表"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "136": {
    "when": "该公司需要将整个应用程式迁移到具有类似结构的AWS + 必须部署应用程式以实现高可用性",
    "target": "将多个 Availability Zones 中适当大小的实例",
    "avoid": "",
    "questionCues": [
      "该公司需要将整个应用程式迁移到具有类似结构的AWS",
      "必须部署应用程式以实现高可用性"
    ],
    "answerCues": {
      "C": [
        "将多个 Availability Zones 中适当大小的实例"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "137": {
    "when": "创意团队希望与策略团队分享S3储存桶 + 该解决方案必须仅向这些使用者提供他们所需的最低权限",
    "target": "B：以授予S3 储存桶的完整权限；C：以向 Strategy_reviewer IAM 角色授予解密权限；F：以授予S3 储存桶的读取权限",
    "avoid": "",
    "questionCues": [
      "创意团队希望与策略团队分享S3储存桶",
      "该解决方案必须仅向这些使用者提供他们所需的最低权限"
    ],
    "answerCues": {
      "B": [
        "以授予S3 储存桶的完整权限"
      ],
      "C": [
        "以向 Strategy_reviewer IAM 角色授予解密权限"
      ],
      "F": [
        "以授予S3 储存桶的读取权限"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "138": {
    "when": "以根据工作负载需求进行扩展 + 并且单一作业可能需要几个小时才能以理想的运算能力处理数据",
    "target": "Amazon ECR",
    "avoid": "",
    "questionCues": [
      "以根据工作负载需求进行扩展",
      "并且单一作业可能需要几个小时才能以理想的运算能力处理数据"
    ],
    "answerCues": {
      "C": [
        "Amazon ECR"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "139": {
    "when": "一家公司在开发环境中的单一 Windows Amazon EC2 实例上运行内容管理应用程式",
    "target": "为 Windows 档案伺服器档案系统建立 Amazon FSx",
    "avoid": "",
    "questionCues": [
      "一家公司在开发环境中的单一 Windows Amazon EC2 实例上运行内容管理应用程式"
    ],
    "answerCues": {
      "C": [
        "为 Windows 档案伺服器档案系统建立 Amazon FSx"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "140": {
    "when": "该公司计划将此讯息功能迁移到AWS云 + 并需要最大限度地减少营运开销",
    "target": "将电子邮件范本与客户资料参数储存在 Amazon SES 上",
    "avoid": "",
    "questionCues": [
      "该公司计划将此讯息功能迁移到AWS云",
      "并需要最大限度地减少营运开销"
    ],
    "answerCues": {
      "D": [
        "将电子邮件范本与客户资料参数储存在 Amazon SES 上"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "141": {
    "when": "该公司已将 SQS 队列的可见度逾时设定为 1 小时 + 白天好几次",
    "target": "配置处理过程中实例的缩容保护",
    "avoid": "",
    "questionCues": [
      "该公司已将 SQS 队列的可见度逾时设定为 1 小时",
      "白天好几次"
    ],
    "answerCues": {
      "C": [
        "配置处理过程中实例的缩容保护"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "142": {
    "when": "解决方案架构师确定了一组不需要公共存取的 API + 解决方案架构师必须设计一个解决方案",
    "target": "并将其附加到API",
    "avoid": "",
    "questionCues": [
      "解决方案架构师确定了一组不需要公共存取的 API",
      "解决方案架构师必须设计一个解决方案"
    ],
    "answerCues": {
      "C": [
        "并将其附加到API"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "143": {
    "when": "Amazon S3 + 该公司最近扩展到为 us-east-1 Region 的用户提供服务",
    "target": "B：在 us-east-1 中建立一个新的 S3 储存桶；D：使用Lambda@Edge修改来自北美的请求以使用us-east-1中的S3存储桶",
    "avoid": "",
    "questionCues": [
      "Amazon S3",
      "该公司最近扩展到为 us-east-1 Region 的用户提供服务"
    ],
    "answerCues": {
      "B": [
        "在 us-east-1 中建立一个新的 S3 储存桶"
      ],
      "D": [
        "使用Lambda@Edge修改来自北美的请求以使用us-east-1中的S3存储桶"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "144": {
    "when": "解决方案架构师必须确保使用者可以重新获得存取权限 + 解决方案还必须防止问题再次发生",
    "target": "update-le-system 指令增加容量",
    "avoid": "",
    "questionCues": [
      "解决方案架构师必须确保使用者可以重新获得存取权限",
      "解决方案还必须防止问题再次发生"
    ],
    "answerCues": {
      "B": [
        "update-le-system 指令增加容量"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "145": {
    "when": "FTP 伺服器因连线中断和记忆体问题而出现问题 + 因此公司无法部署新的应用程式",
    "target": "将档案放置在 Amazon S3 中",
    "avoid": "",
    "questionCues": [
      "FTP 伺服器因连线中断和记忆体问题而出现问题",
      "因此公司无法部署新的应用程式"
    ],
    "answerCues": {
      "C": [
        "将档案放置在 Amazon S3 中"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "146": {
    "when": "应用程式必须能够在应用程式发生故障时恢复到单独的 AWS Region + 如果发生故障",
    "target": "在不同的 Region 中配置 Aurora 副本",
    "avoid": "",
    "questionCues": [
      "应用程式必须能够在应用程式发生故障时恢复到单独的 AWS Region",
      "如果发生故障"
    ],
    "answerCues": {
      "A": [
        "在不同的 Region 中配置 Aurora 副本"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "147": {
    "when": "HTTPS + 该公司需要在将资料发送到另一个S3储存桶进行额外的内部处理之前自动屏蔽 PAN",
    "target": "根据处理和转换要求来转换整个记录",
    "avoid": "",
    "questionCues": [
      "HTTPS",
      "该公司需要在将资料发送到另一个S3储存桶进行额外的内部处理之前自动屏蔽 PAN"
    ],
    "answerCues": {
      "C": [
        "根据处理和转换要求来转换整个记录"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "148": {
    "when": "该公司计划迁移的 on-premises 应用程式使用 MySQL 资料库作为资料储存",
    "target": "定义启动设定",
    "avoid": "",
    "questionCues": [
      "该公司计划迁移的 on-premises 应用程式使用 MySQL 资料库作为资料储存"
    ],
    "answerCues": {
      "B": [
        "定义启动设定"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "149": {
    "when": "使用单一AWS帐户的外部审计师需要存取公司的AWS帐户 + 此解决方案必须符合AWS安全最佳实务",
    "target": "将策略附加到角色",
    "avoid": "",
    "questionCues": [
      "使用单一AWS帐户的外部审计师需要存取公司的AWS帐户",
      "此解决方案必须符合AWS安全最佳实务"
    ],
    "answerCues": {
      "B": [
        "将策略附加到角色"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "150": {
    "when": "一家公司拥有一个对延迟敏感的交易平台 + 新的解决方案必须确保交易平台的高可用性",
    "target": "三节点DynamoDB Accelerator (DAX)集群 + DAX读取资料并将资料直接写入DynamoDB表",
    "avoid": "别选“使用 DAX 设定应用程式来读取和写入资料”。",
    "questionCues": [
      "一家公司拥有一个对延迟敏感的交易平台",
      "新的解决方案必须确保交易平台的高可用性"
    ],
    "answerCues": {
      "B": [
        "三节点DynamoDB Accelerator (DAX)集群",
        "DAX读取资料并将资料直接写入DynamoDB表"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "151": {
    "when": "解决方案架构师需要优化应用程式的基础架构成本 + 而不会对应用程式可用性产生负面影响",
    "target": "B：将应用程式前端移至托管在 Amazon S3 上的静态网站；E：将后端 Python 应用程式部署到与现有 EC2 实例具有相同核心数量的通用可突发 EC2 实例",
    "avoid": "",
    "questionCues": [
      "解决方案架构师需要优化应用程式的基础架构成本",
      "而不会对应用程式可用性产生负面影响"
    ],
    "answerCues": {
      "B": [
        "将应用程式前端移至托管在 Amazon S3 上的静态网站"
      ],
      "E": [
        "将后端 Python 应用程式部署到与现有 EC2 实例具有相同核心数量的通用可突发 EC2 实例"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "152": {
    "when": "并希望优化该平台的成本效益 + 可在 Amazon EKS 和 AWS Fargate 上运行",
    "target": "根据高峰事件日期",
    "avoid": "别选“为 EKS 集群在其基准负载中使用的 EC2 实例购买标准预留实例”。",
    "questionCues": [
      "并希望优化该平台的成本效益",
      "可在 Amazon EKS 和 AWS Fargate 上运行"
    ],
    "answerCues": {
      "B": [
        "根据高峰事件日期"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "153": {
    "when": "在应用程式无法使用期间 + 该公司希望访客收到资讯性讯息",
    "target": "A：将静态资讯内容上传到S3储存桶；C：配置分配和 S3 储存桶以使用来源存取身分 (OAI)；D：维护完成后恢复变更",
    "avoid": "",
    "questionCues": [
      "在应用程式无法使用期间",
      "该公司希望访客收到资讯性讯息"
    ],
    "answerCues": {
      "A": [
        "将静态资讯内容上传到S3储存桶"
      ],
      "C": [
        "配置分配和 S3 储存桶以使用来源存取身分 (OAI)"
      ],
      "D": [
        "维护完成后恢复变更"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "154": {
    "when": "解决方案架构师需要简化此流程 + 以最大程度地减少对使用者的干扰",
    "target": "当公司完成测试时",
    "avoid": "",
    "questionCues": [
      "解决方案架构师需要简化此流程",
      "以最大程度地减少对使用者的干扰"
    ],
    "answerCues": {
      "D": [
        "当公司完成测试时"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "155": {
    "when": "公司内部管理公共DNS + 该公司希望透过顶级网域提供该应用程式",
    "target": "这些端点组以适当的 AWS Regions 中的端点为目标",
    "avoid": "",
    "questionCues": [
      "公司内部管理公共DNS",
      "该公司希望透过顶级网域提供该应用程式"
    ],
    "answerCues": {
      "C": [
        "这些端点组以适当的 AWS Regions 中的端点为目标"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "156": {
    "when": "Lambda + 解决方案架构师需要简化解决方案的部署并最佳化程式码重复使用",
    "target": "将 API 的 Lambda 函数设定为使用该 Docker 映像作为部署套件",
    "avoid": "",
    "questionCues": [
      "Lambda",
      "解决方案架构师需要简化解决方案的部署并最佳化程式码重复使用"
    ],
    "answerCues": {
      "D": [
        "将 API 的 Lambda 函数设定为使用该 Docker 映像作为部署套件"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "157": {
    "when": "公司也必须能够提供此回馈 + 公司应该如何部署ML模型来满足这些需求",
    "target": "配置元件在侦测到缺陷时呼叫本机 API",
    "avoid": "",
    "questionCues": [
      "公司也必须能够提供此回馈",
      "公司应该如何部署ML模型来满足这些需求"
    ],
    "answerCues": {
      "B": [
        "配置元件在侦测到缺陷时呼叫本机 API"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "158": {
    "when": "解决方案架构师将使用公司所有伺服器的组态管理资料库 (CMDB) 汇出来建立案例",
    "target": "使用迁移评估器执行分析",
    "avoid": "",
    "questionCues": [
      "解决方案架构师将使用公司所有伺服器的组态管理资料库 (CMDB) 汇出来建立案例"
    ],
    "answerCues": {
      "B": [
        "使用迁移评估器执行分析"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "159": {
    "when": "访问日志显示 + 解决方案架构师需要实施一个解决方案来减轻这些攻击",
    "target": "AWS WAF",
    "avoid": "",
    "questionCues": [
      "访问日志显示",
      "解决方案架构师需要实施一个解决方案来减轻这些攻击"
    ],
    "answerCues": {
      "B": [
        "AWS WAF"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "160": {
    "when": "关键应用程式必须跨两个Regions部署应用程式层元件和资料层元件",
    "target": "A：将另一个 Region 加入到 Aurora MySQL 资料库集群；D：将现有 DynamoDB 表转换为全域表",
    "avoid": "Aurora 扩展集群，不是给集群中的每个表加 Region；两种数据库都要跨区。",
    "questionCues": [
      "关键应用程式必须跨两个Regions部署应用程式层元件和资料层元件"
    ],
    "answerCues": {
      "A": [
        "将另一个 Region 加入到 Aurora MySQL 资料库集群"
      ],
      "D": [
        "将现有 DynamoDB 表转换为全域表"
      ]
    },
    "disputed": false,
    "legacyMismatch": true
  },
  "161": {
    "when": "TLS 终止于ALB + 解决方案架构师必须开发一种解决方案",
    "target": "为 NLB 建立 ALB 类型目标群组",
    "avoid": "",
    "questionCues": [
      "TLS 终止于ALB",
      "解决方案架构师必须开发一种解决方案"
    ],
    "answerCues": {
      "B": [
        "为 NLB 建立 ALB 类型目标群组"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "162": {
    "when": "一家公司在一组Amazon EC2实例上 + 该公司需要一种解决方案来阻止网路流量直接存取ALB",
    "target": "以仅允许来自AWS托管前缀清单的流量CloudFront",
    "avoid": "",
    "questionCues": [
      "一家公司在一组Amazon EC2实例上",
      "该公司需要一种解决方案来阻止网路流量直接存取ALB"
    ],
    "answerCues": {
      "C": [
        "以仅允许来自AWS托管前缀清单的流量CloudFront"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "163": {
    "when": "最近的安全审计显示 + 解决方案架构师必须进行更改以要求用户身份验证并确保公司使用端对端加密",
    "target": "使用 AUTH 建立新集群",
    "avoid": "别选“更新应用程式以在必要时从 Secrets Manager 检索 AUTH 令牌”。",
    "questionCues": [
      "最近的安全审计显示",
      "解决方案架构师必须进行更改以要求用户身份验证并确保公司使用端对端加密"
    ],
    "answerCues": {
      "A": [
        "使用 AUTH 建立新集群"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "164": {
    "when": "监控系统报告了Auto Scaling实例启动失败 + 公司需要提高工作负载的整体可靠性",
    "target": "建立使用基于属性的实例类型选择的新启动范本版本",
    "avoid": "",
    "questionCues": [
      "监控系统报告了Auto Scaling实例启动失败",
      "公司需要提高工作负载的整体可靠性"
    ],
    "answerCues": {
      "B": [
        "建立使用基于属性的实例类型选择的新启动范本版本"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "165": {
    "when": "在迁移过程中 + 该公司发现无法立即更新产生大量文件的处理伺服器以支援S3 API",
    "target": "当Amazon S3发生变更时",
    "avoid": "别选“使用汇入和汇出策略为 Lustre 配置 Amazon FSx”。",
    "questionCues": [
      "在迁移过程中",
      "该公司发现无法立即更新产生大量文件的处理伺服器以支援S3 API"
    ],
    "answerCues": {
      "B": [
        "当Amazon S3发生变更时"
      ]
    },
    "disputed": true,
    "legacyMismatch": true
  },
  "166": {
    "when": "公司需要能够根据请求删除用户资讯 + 其他所有微服务也必须立即删除其资料副本",
    "target": "设定中央使用者服务",
    "avoid": "",
    "questionCues": [
      "公司需要能够根据请求删除用户资讯",
      "其他所有微服务也必须立即删除其资料副本"
    ],
    "answerCues": {
      "C": [
        "设定中央使用者服务"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "167": {
    "when": "外部客户需要连接到 Web 应用程式 + 公司必须向所有外部客户提供 IP 位址",
    "target": "指定 ALB 作为加速器的端点",
    "avoid": "",
    "questionCues": [
      "外部客户需要连接到 Web 应用程式",
      "公司必须向所有外部客户提供 IP 位址"
    ],
    "answerCues": {
      "C": [
        "指定 ALB 作为加速器的端点"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "168": {
    "when": "并希望将其生产应用程式迁移到 AWS + 该公司需要一个包含内建蓝图和护栏的解决方案",
    "target": "C：将生产和开发帐户添加到生产和开发OUs；D：创建SCP以确保合规性；F：为生产OU 建立护栏以侦测EBS 加密",
    "avoid": "",
    "questionCues": [
      "并希望将其生产应用程式迁移到 AWS",
      "该公司需要一个包含内建蓝图和护栏的解决方案"
    ],
    "answerCues": {
      "C": [
        "将生产和开发帐户添加到生产和开发OUs"
      ],
      "D": [
        "创建SCP以确保合规性"
      ],
      "F": [
        "为生产OU 建立护栏以侦测EBS 加密"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "169": {
    "when": "此解决方案必须满足以下目标 + 公司必须确保故障转移后的最佳延迟",
    "target": "配置 EC2 实例以使用 AWS Elastic Disaster Recovery",
    "avoid": "",
    "questionCues": [
      "此解决方案必须满足以下目标",
      "公司必须确保故障转移后的最佳延迟"
    ],
    "answerCues": {
      "A": [
        "配置 EC2 实例以使用 AWS Elastic Disaster Recovery"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "170": {
    "when": "解决方案架构师希望在单一 AWS 帐户中最佳化成本并适当调整 Amazon EC2 实例的大小",
    "target": "C：安装 Amazon CloudWatch 代理并在 EC2 实例上配置记忆体指标收集；D：在 AWS 帐户中配置 AWS 计算优化器以接收结果和最佳化建议",
    "avoid": "别选“为 AWS Regions、实例系列和感兴趣的作业系统建立 EC2 实例节省计划”。",
    "questionCues": [
      "解决方案架构师希望在单一 AWS 帐户中最佳化成本并适当调整 Amazon EC2 实例的大小"
    ],
    "answerCues": {
      "C": [
        "安装 Amazon CloudWatch 代理并在 EC2 实例上配置记忆体指标收集"
      ],
      "D": [
        "在 AWS 帐户中配置 AWS 计算优化器以接收结果和最佳化建议"
      ]
    },
    "disputed": false,
    "legacyMismatch": true
  },
  "171": {
    "when": "AWS CodeCommit + 公司必须在第二个AWSRegion中储存储存库中资料的备份副本",
    "target": "AWS CodeBuild",
    "avoid": "",
    "questionCues": [
      "AWS CodeCommit",
      "公司必须在第二个AWSRegion中储存储存库中资料的备份副本"
    ],
    "answerCues": {
      "C": [
        "AWS CodeBuild"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "172": {
    "when": "每个业务部门透过多个 VPC 管理自己的网络 + 此解决方案必须仅使用私有 IP 位址",
    "target": "授予特定 AWS 帐户连接到服务的权限",
    "avoid": "",
    "questionCues": [
      "每个业务部门透过多个 VPC 管理自己的网络",
      "此解决方案必须仅使用私有 IP 位址"
    ],
    "answerCues": {
      "C": [
        "授予特定 AWS 帐户连接到服务的权限"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "173": {
    "when": "某公司需要对新取得的AWS帐户进行安全态势审计 + 公司的资料安全团队才需要通知",
    "target": "并使用「isPublic: true」过滤器",
    "avoid": "",
    "questionCues": [
      "某公司需要对新取得的AWS帐户进行安全态势审计",
      "公司的资料安全团队才需要通知"
    ],
    "answerCues": {
      "B": [
        "并使用「isPublic: true」过滤器"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "174": {
    "when": "解决方案架构师必须建立一个业务案例以将产品组合迁移到AWS + 解决方案架构师必须更了解产品组合",
    "target": "建立业务案例报告",
    "avoid": "",
    "questionCues": [
      "解决方案架构师必须建立一个业务案例以将产品组合迁移到AWS",
      "解决方案架构师必须更了解产品组合"
    ],
    "answerCues": {
      "C": [
        "建立业务案例报告"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "175": {
    "when": "公司需要对文件进行备份 + 并保留备份1年",
    "target": "Amazon EFS",
    "avoid": "",
    "questionCues": [
      "公司需要对文件进行备份",
      "并保留备份1年"
    ],
    "answerCues": {
      "A": [
        "Amazon EFS"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "176": {
    "when": "该公司正在经历系统停机 + 该公司希望将系统迁移到AWS以提高可靠性",
    "target": "使用 Amazon Pinpoint 向客户发送简讯调查",
    "avoid": "",
    "questionCues": [
      "该公司正在经历系统停机",
      "该公司希望将系统迁移到AWS以提高可靠性"
    ],
    "answerCues": {
      "A": [
        "使用 Amazon Pinpoint 向客户发送简讯调查"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "177": {
    "when": "一家公司正在使用 Amazon Connect 建置呼叫中心",
    "target": "该模板提供已宣告的电话号码",
    "avoid": "",
    "questionCues": [
      "一家公司正在使用 Amazon Connect 建置呼叫中心"
    ],
    "answerCues": {
      "D": [
        "该模板提供已宣告的电话号码"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "178": {
    "when": "该公司希望在共享数据之前确认客户的身份 + 客户还需要存取最新的数据",
    "target": "AWS Data Exchange datashare",
    "avoid": "",
    "questionCues": [
      "该公司希望在共享数据之前确认客户的身份",
      "客户还需要存取最新的数据"
    ],
    "answerCues": {
      "B": [
        "AWS Data Exchange datashare"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "179": {
    "when": "解决方案必须能够根据解决方案接收的事件数量进行扩展和扩展 + 如果发生处理错误",
    "target": "配置应用程式将失败的讯息写入死信伫列",
    "avoid": "别选“将 AWS Lambda 函数配置为 SNS 主题的订阅者来处理事件”。",
    "questionCues": [
      "解决方案必须能够根据解决方案接收的事件数量进行扩展和扩展",
      "如果发生处理错误"
    ],
    "answerCues": {
      "B": [
        "配置应用程式将失败的讯息写入死信伫列"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "180": {
    "when": "API 会经历不可预测的流量突发 + 公司必须实施一个解决方案来处理设备发送到处理引擎的所有资料",
    "target": "建立AWS Lambda函数来处理SQS伫列中的消息",
    "avoid": "",
    "questionCues": [
      "API 会经历不可预测的流量突发",
      "公司必须实施一个解决方案来处理设备发送到处理引擎的所有资料"
    ],
    "answerCues": {
      "B": [
        "建立AWS Lambda函数来处理SQS伫列中的消息"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "181": {
    "when": "使用 AWS Organizations ​​来管理多帐户 + 但不能与其他OU中的VPC通信",
    "target": "为每个 VPC 建立中转网关 VPC 附件",
    "avoid": "",
    "questionCues": [
      "使用 AWS Organizations ​​来管理多帐户",
      "但不能与其他OU中的VPC通信"
    ],
    "answerCues": {
      "C": [
        "为每个 VPC 建立中转网关 VPC 附件"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "182": {
    "when": "它希望在迁移过程中尽可能多地使用完全托管的服务 + 该公司需要在应用程式中储存大型重要文档",
    "target": "并使用 AWS KMS 进行物件加密",
    "avoid": "",
    "questionCues": [
      "它希望在迁移过程中尽可能多地使用完全托管的服务",
      "该公司需要在应用程式中储存大型重要文档"
    ],
    "answerCues": {
      "B": [
        "并使用 AWS KMS 进行物件加密"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "183": {
    "when": "且 API 服务已扩展至最大数量 + 并且必须最大限度地提高营运效率",
    "target": "新增一条新规则",
    "avoid": "",
    "questionCues": [
      "且 API 服务已扩展至最大数量",
      "并且必须最大限度地提高营运效率"
    ],
    "answerCues": {
      "C": [
        "新增一条新规则"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "184": {
    "when": "AWS IoT Core + 公司必须具备在两个AWSRegions中摄取和储存资料的能力",
    "target": "将 DynamoDB 表更新为全域表",
    "avoid": "",
    "questionCues": [
      "AWS IoT Core",
      "公司必须具备在两个AWSRegions中摄取和储存资料的能力"
    ],
    "answerCues": {
      "C": [
        "将 DynamoDB 表更新为全域表"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "185": {
    "when": "解决方案架构师应该如何为行销团队提供 DynamoDB 表的适当存取权限",
    "target": "与行销团队的帐户建立信任",
    "avoid": "",
    "questionCues": [
      "解决方案架构师应该如何为行销团队提供 DynamoDB 表的适当存取权限"
    ],
    "answerCues": {
      "B": [
        "与行销团队的帐户建立信任"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "186": {
    "when": "解决方案架构师必须在两个同时 + 两个S3桶中的物件必须保持彼此同步",
    "target": "A：S3 Multi-Region 接入点；B：双向S3交叉Region复制（CRR）；E：S3版本控制",
    "avoid": "",
    "questionCues": [
      "解决方案架构师必须在两个同时",
      "两个S3桶中的物件必须保持彼此同步"
    ],
    "answerCues": {
      "A": [
        "S3 Multi-Region 接入点"
      ],
      "B": [
        "双向S3交叉Region复制（CRR）"
      ],
      "E": [
        "S3版本控制"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "187": {
    "when": "定期作业需要 120-600 秒才能运作 + 并且必须减少堆叠的营运开销",
    "target": "B：AWS IoT Core；D：将元资料写入AmazonDocumentDB（相容于MongoDB）；E：使用 Amazon CloudFront 和 S3 来源来提供报告",
    "avoid": "",
    "questionCues": [
      "定期作业需要 120-600 秒才能运作",
      "并且必须减少堆叠的营运开销"
    ],
    "answerCues": {
      "B": [
        "AWS IoT Core"
      ],
      "D": [
        "将元资料写入AmazonDocumentDB（相容于MongoDB）"
      ],
      "E": [
        "使用 Amazon CloudFront 和 S3 来源来提供报告"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "188": {
    "when": "由于资料监管要求或对个位数毫秒延迟的要求 + 开发人员必须能够",
    "target": "安装AWS Outposts",
    "avoid": "",
    "questionCues": [
      "由于资料监管要求或对个位数毫秒延迟的要求",
      "开发人员必须能够"
    ],
    "answerCues": {
      "C": [
        "安装AWS Outposts"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "189": {
    "when": "公司必须防止攻击并确保业务连续性 + 并在持续攻击期间将服务中断降至最低",
    "target": "A：在 CloudFront 域上新增自订标头和随机值；E：部署包含适当规则群组的 AWS WAF Web ACL",
    "avoid": "",
    "questionCues": [
      "公司必须防止攻击并确保业务连续性",
      "并在持续攻击期间将服务中断降至最低"
    ],
    "answerCues": {
      "A": [
        "在 CloudFront 域上新增自订标头和随机值"
      ],
      "E": [
        "部署包含适当规则群组的 AWS WAF Web ACL"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "190": {
    "when": "使用Amazon Route 53中 + 该公司希望在发生这些错误时显示自订错误讯息页面",
    "target": "对于辅助来源",
    "avoid": "",
    "questionCues": [
      "使用Amazon Route 53中",
      "该公司希望在发生这些错误时显示自订错误讯息页面"
    ],
    "answerCues": {
      "C": [
        "对于辅助来源"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "191": {
    "when": "一家公司正计划将应用程式迁移到AWS + 解决方案架构师必须设计一个安全且可扩展的容器化解决方案",
    "target": "参考ECS任务定义中的EFS档案系统ID、容器挂载点和EFS授权IAM角色",
    "avoid": "",
    "questionCues": [
      "一家公司正计划将应用程式迁移到AWS",
      "解决方案架构师必须设计一个安全且可扩展的容器化解决方案"
    ],
    "answerCues": {
      "A": [
        "参考ECS任务定义中的EFS档案系统ID、容器挂载点和EFS授权IAM角色"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "192": {
    "when": "分配到 EC2 实例 + 客户在测试视窗期间必须使用相同版本的业务逻辑",
    "target": "配置ALB目标组黏性",
    "avoid": "",
    "questionCues": [
      "分配到 EC2 实例",
      "客户在测试视窗期间必须使用相同版本的业务逻辑"
    ],
    "answerCues": {
      "B": [
        "配置ALB目标组黏性"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "193": {
    "when": "档案系统配置了DNS别名 + 解决方案架构师必须在定义的维护时段内提高档案系统的效能",
    "target": "将储存类型更新为SSD",
    "avoid": "",
    "questionCues": [
      "档案系统配置了DNS别名",
      "解决方案架构师必须在定义的维护时段内提高档案系统的效能"
    ],
    "answerCues": {
      "B": [
        "将储存类型更新为SSD"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "194": {
    "when": "Amazon S3 + 公司必须修改应用程式才能将应用程式部署在两个AWSRegions中",
    "target": "将修改后的应用程式部署到两个Regions",
    "avoid": "",
    "questionCues": [
      "Amazon S3",
      "公司必须修改应用程式才能将应用程式部署在两个AWSRegions中"
    ],
    "answerCues": {
      "B": [
        "将修改后的应用程式部署到两个Regions"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "195": {
    "when": "该公司的游戏应用程式需要高效能运算（HPC）处理 + 该公司需要一个优化应用程式效能的迁移策略",
    "target": "使用 Amazon ElastiCache 对应 Redis 集群来维护排行榜",
    "avoid": "",
    "questionCues": [
      "该公司的游戏应用程式需要高效能运算（HPC）处理",
      "该公司需要一个优化应用程式效能的迁移策略"
    ],
    "answerCues": {
      "C": [
        "使用 Amazon ElastiCache 对应 Redis 集群来维护排行榜"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "196": {
    "when": "资料的储存格式必须允许薪资管理员执行月度报告 + 基础架构必须具有高可用性并可扩展",
    "target": "B：并在多个 Availability Zones 之间进行负载平衡；E：将时间表提交资料储存在Amazon S3中",
    "avoid": "",
    "questionCues": [
      "资料的储存格式必须允许薪资管理员执行月度报告",
      "基础架构必须具有高可用性并可扩展"
    ],
    "answerCues": {
      "B": [
        "并在多个 Availability Zones 之间进行负载平衡"
      ],
      "E": [
        "将时间表提交资料储存在Amazon S3中"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "197": {
    "when": "并且必须将日志保留 5 年 + 公司的安全团队也必须收到电子邮件通知",
    "target": "A：配置 AWS CloudTrail 以记录 S3 资料事件；D：Amazon SNS；F：设定新的 S3 储存桶来储存具有 S3 生命周期策略的日志",
    "avoid": "",
    "questionCues": [
      "并且必须将日志保留 5 年",
      "公司的安全团队也必须收到电子邮件通知"
    ],
    "answerCues": {
      "A": [
        "配置 AWS CloudTrail 以记录 S3 资料事件"
      ],
      "D": [
        "Amazon SNS"
      ],
      "F": [
        "设定新的 S3 储存桶来储存具有 S3 生命周期策略的日志"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "198": {
    "when": "该公司需要on-premises资料中心中的伺服器能够存取所有三个VPC中的EC2实例",
    "target": "A：在离资料中心最近的Region中建立Direct Connect网关；D：创建公共 VIF",
    "avoid": "",
    "questionCues": [
      "该公司需要on-premises资料中心中的伺服器能够存取所有三个VPC中的EC2实例"
    ],
    "answerCues": {
      "A": [
        "在离资料中心最近的Region中建立Direct Connect网关"
      ],
      "D": [
        "创建公共 VIF"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "199": {
    "when": "一家公司正在使用 AWS Organizations 来管理数百个 AWS 帐户",
    "target": "A：在所有帐户中启用 AWS Config；C：启用组织的所有功能；D：使用 AWS Firewall Manager 在所有 CloudFront 发行版的所有帐户中部署 AWS WAF 规则",
    "avoid": "",
    "questionCues": [
      "一家公司正在使用 AWS Organizations 来管理数百个 AWS 帐户"
    ],
    "answerCues": {
      "A": [
        "在所有帐户中启用 AWS Config"
      ],
      "C": [
        "启用组织的所有功能"
      ],
      "D": [
        "使用 AWS Firewall Manager 在所有 CloudFront 发行版的所有帐户中部署 AWS WAF 规则"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "200": {
    "when": "他们无法存取 AWS 环境 + 解决方案架构师应检查哪些项目以确保身分联合配置正确",
    "target": "B：SAML 提供者设定为主体；C：不属于公司 IdP 中的 AWSFederatedUsers 群组；E：DNS 主机名称可从 AWS 环境 VPC 存取",
    "avoid": "",
    "questionCues": [
      "他们无法存取 AWS 环境",
      "解决方案架构师应检查哪些项目以确保身分联合配置正确"
    ],
    "answerCues": {
      "B": [
        "SAML 提供者设定为主体"
      ],
      "C": [
        "不属于公司 IdP 中的 AWSFederatedUsers 群组"
      ],
      "E": [
        "DNS 主机名称可从 AWS 环境 VPC 存取"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "201": {
    "when": "此解决方案必须保证凭证的安全 + 并且必须提供定期自动轮调凭证的能力",
    "target": "在资料库实例前面 + 将连接凭证作为秘密储存在 AWS Secrets Manager 中",
    "avoid": "别选“在资料库实例前面部署 Amazon RDS 代理层”。",
    "questionCues": [
      "此解决方案必须保证凭证的安全",
      "并且必须提供定期自动轮调凭证的能力"
    ],
    "answerCues": {
      "A": [
        "在资料库实例前面",
        "将连接凭证作为秘密储存在 AWS Secrets Manager 中"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "202": {
    "when": "一家公司需要为其电子商务网站 + Web 应用程式必须故障转移到辅助环境",
    "target": "增加Auto Scaling组所需的容量",
    "avoid": "",
    "questionCues": [
      "一家公司需要为其电子商务网站",
      "Web 应用程式必须故障转移到辅助环境"
    ],
    "answerCues": {
      "B": [
        "增加Auto Scaling组所需的容量"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "203": {
    "when": "Amazon Aurora MySQL + 该公司需要一个能够更快迁移资料库的迁移解决方案",
    "target": "AWS Snowball Edge",
    "avoid": "",
    "questionCues": [
      "Amazon Aurora MySQL",
      "该公司需要一个能够更快迁移资料库的迁移解决方案"
    ],
    "answerCues": {
      "C": [
        "AWS Snowball Edge"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "204": {
    "when": "公司必须能够在 1 个工作天内恢复EC2 实例及其配置 + 且遗失的资料不超过 1 天",
    "target": "若发生故障",
    "avoid": "",
    "questionCues": [
      "公司必须能够在 1 个工作天内恢复EC2 实例及其配置",
      "且遗失的资料不超过 1 天"
    ],
    "answerCues": {
      "C": [
        "若发生故障"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "205": {
    "when": "根据公司要求 + 所有资料在传输和静态时都必须加密",
    "target": "A：为 Web 应用程式使用的 S3 储存桶开启 S3 伺服器端加密；C：建立一个储存桶策略；E：配置HTTP请求重定向到CloudFront中的HTTPS请求",
    "avoid": "",
    "questionCues": [
      "根据公司要求",
      "所有资料在传输和静态时都必须加密"
    ],
    "answerCues": {
      "A": [
        "为 Web 应用程式使用的 S3 储存桶开启 S3 伺服器端加密"
      ],
      "C": [
        "建立一个储存桶策略"
      ],
      "E": [
        "配置HTTP请求重定向到CloudFront中的HTTPS请求"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "206": {
    "when": "生产资料库的凭证必须使用只有 IT 安全团队的 IAM 使用者群组成员才能存取的金钥进行加密",
    "target": "限制对机密和客户管理金钥的访问",
    "avoid": "",
    "questionCues": [
      "生产资料库的凭证必须使用只有 IT 安全团队的 IAM 使用者群组成员才能存取的金钥进行加密"
    ],
    "answerCues": {
      "D": [
        "限制对机密和客户管理金钥的访问"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "207": {
    "when": "解决方案架构师需要实施一个解决方案来解决扩展问题并在应用程式扩展时最大限度地降低许可成本",
    "target": "部署 Amazon EC2 实例",
    "avoid": "",
    "questionCues": [
      "解决方案架构师需要实施一个解决方案来解决扩展问题并在应用程式扩展时最大限度地降低许可成本"
    ],
    "answerCues": {
      "A": [
        "部署 Amazon EC2 实例"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "208": {
    "when": "ALB + 解决方案架构师需要透过最小化营运开销的解决方案来解决此问题",
    "target": "AWS Global Accelerator",
    "avoid": "",
    "questionCues": [
      "ALB",
      "解决方案架构师需要透过最小化营运开销的解决方案来解决此问题"
    ],
    "answerCues": {
      "C": [
        "AWS Global Accelerator"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "209": {
    "when": "MQTT 代理将资料储存在单一 Amazon EC2 实例上 + 公司必须提高解决方案的可靠性",
    "target": "配置AWS IoT 规则来储存资料",
    "avoid": "",
    "questionCues": [
      "MQTT 代理将资料储存在单一 Amazon EC2 实例上",
      "公司必须提高解决方案的可靠性"
    ],
    "answerCues": {
      "B": [
        "配置AWS IoT 规则来储存资料"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "210": {
    "when": "该政策将根据请求自动轮换所有 EC2 金钥对 + 并将金钥保存在安全加密的地方",
    "target": "AWS Secrets Manager",
    "avoid": "",
    "questionCues": [
      "该政策将根据请求自动轮换所有 EC2 金钥对",
      "并将金钥保存在安全加密的地方"
    ],
    "answerCues": {
      "A": [
        "AWS Secrets Manager"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "211": {
    "when": "解决方案架构师必须为公司提供准确的清单 + 以便公司能够规划经济高效的迁移",
    "target": "识别不活动的伺服器",
    "avoid": "",
    "questionCues": [
      "解决方案架构师必须为公司提供准确的清单",
      "以便公司能够规划经济高效的迁移"
    ],
    "answerCues": {
      "C": [
        "识别不活动的伺服器"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "212": {
    "when": "资料库崩溃并导致应用程式停机 + 该公司希望保护资料库免于崩溃",
    "target": "Amazon SQS",
    "avoid": "",
    "questionCues": [
      "资料库崩溃并导致应用程式停机",
      "该公司希望保护资料库免于崩溃"
    ],
    "answerCues": {
      "A": [
        "Amazon SQS"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "213": {
    "when": "并且停机时间不能超过 10 分钟 + 公司需要最大限度地减少持续维护",
    "target": "将仪表板汇入新工作区",
    "avoid": "",
    "questionCues": [
      "并且停机时间不能超过 10 分钟",
      "公司需要最大限度地减少持续维护"
    ],
    "answerCues": {
      "B": [
        "将仪表板汇入新工作区"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "214": {
    "when": "一家公司需要将其客户交易资料库从本地迁移到AWS + 根据新的安全要求",
    "target": "将资料库迁移到 Oracle 的Amazon RDS",
    "avoid": "",
    "questionCues": [
      "一家公司需要将其客户交易资料库从本地迁移到AWS",
      "根据新的安全要求"
    ],
    "answerCues": {
      "B": [
        "将资料库迁移到 Oracle 的Amazon RDS"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "215": {
    "when": "公司需要一个连接到 on-premises 网路的 VPC",
    "target": "B：将模板部署到共享服务帐户；D：使用 AWS Site-to-Site VPN 连接到 on-premises 网路",
    "avoid": "别选“使用 AWS Resource Access Manager 共用中转网关”。",
    "questionCues": [
      "公司需要一个连接到 on-premises 网路的 VPC"
    ],
    "answerCues": {
      "B": [
        "将模板部署到共享服务帐户"
      ],
      "D": [
        "使用 AWS Site-to-Site VPN 连接到 on-premises 网路"
      ]
    },
    "disputed": false,
    "legacyMismatch": true
  },
  "216": {
    "when": "公司需要能够对组织中所有 AWS 帐户的所有互联网出站流量添加集中管理的基于规则的过滤",
    "target": "修改所有预设路由以指向网路防火墙端点",
    "avoid": "",
    "questionCues": [
      "公司需要能够对组织中所有 AWS 帐户的所有互联网出站流量添加集中管理的基于规则的过滤"
    ],
    "answerCues": {
      "B": [
        "修改所有预设路由以指向网路防火墙端点"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "217": {
    "when": "必须针对常见漏洞攻击过滤入站请求",
    "target": "创建Web ACL",
    "avoid": "",
    "questionCues": [
      "必须针对常见漏洞攻击过滤入站请求"
    ],
    "answerCues": {
      "D": [
        "创建Web ACL"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "218": {
    "when": "该公司不希望可以从公共互联网访问 API + 也不希望专有数据遍历公共互联网",
    "target": "为API网关建立介面VPC端点",
    "avoid": "",
    "questionCues": [
      "该公司不希望可以从公共互联网访问 API",
      "也不希望专有数据遍历公共互联网"
    ],
    "answerCues": {
      "B": [
        "为API网关建立介面VPC端点"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "219": {
    "when": "解决方案架构师必须建立一个系统来追踪工程师所做的更改",
    "target": "在 EC2 安全群组上启用 AWS Config 以追踪任何不合规的变更",
    "avoid": "",
    "questionCues": [
      "解决方案架构师必须建立一个系统来追踪工程师所做的更改"
    ],
    "answerCues": {
      "D": [
        "在 EC2 安全群组上启用 AWS Config 以追踪任何不合规的变更"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "220": {
    "when": "该公司希望从感测器读取和收集数据并对数据进行聚合 + 解决方案架构师应采取哪些措施来解决此问题",
    "target": "A：对流进行重新分片以增加流中的分片数量；C：使用具有增强扇出功能的消费者；E：在消费者逻辑中使用错误重试和指数退避机制",
    "avoid": "",
    "questionCues": [
      "该公司希望从感测器读取和收集数据并对数据进行聚合",
      "解决方案架构师应采取哪些措施来解决此问题"
    ],
    "answerCues": {
      "A": [
        "对流进行重新分片以增加流中的分片数量"
      ],
      "C": [
        "使用具有增强扇出功能的消费者"
      ],
      "E": [
        "在消费者逻辑中使用错误重试和指数退避机制"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "221": {
    "when": "该公司需要一份 CPU 或记忆体使用率未充分利用的所有 Amazon EC2 实例的清单",
    "target": "从组织管理帐户中的AWS Cost Explorer 撷取资源最佳化建议",
    "avoid": "",
    "questionCues": [
      "该公司需要一份 CPU 或记忆体使用率未充分利用的所有 Amazon EC2 实例的清单"
    ],
    "answerCues": {
      "B": [
        "从组织管理帐户中的AWS Cost Explorer 撷取资源最佳化建议"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "222": {
    "when": "以将流量引导至EC2 实例 + Auto Scaling组就会替换一个实例",
    "target": "B：配置CloudWatch代理发送应用程式的进程指标；D：在 Amazon CloudWatch 中针对故障场景为自订指标建立警报；E：更新网路路由以指向替换实例",
    "avoid": "别选“更新 CloudFormation 范本以在 EC2 执行个体上”。",
    "questionCues": [
      "以将流量引导至EC2 实例",
      "Auto Scaling组就会替换一个实例"
    ],
    "answerCues": {
      "B": [
        "配置CloudWatch代理发送应用程式的进程指标"
      ],
      "D": [
        "在 Amazon CloudWatch 中针对故障场景为自订指标建立警报"
      ],
      "E": [
        "更新网路路由以指向替换实例"
      ]
    },
    "disputed": false,
    "legacyMismatch": true
  },
  "223": {
    "when": "ECS + 应用程式必须自动调整任务数量以回应 Amazon CloudWatch 警报",
    "target": "为每个 ECS 服务实施服务 Auto Scaling",
    "avoid": "",
    "questionCues": [
      "ECS",
      "应用程式必须自动调整任务数量以回应 Amazon CloudWatch 警报"
    ],
    "answerCues": {
      "D": [
        "为每个 ECS 服务实施服务 Auto Scaling"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "224": {
    "when": "该解决方案必须自动删除具有“严重”或“高”严重性结果的新图像标签 + 解决方案也必须通知开发团队",
    "target": "当扫描完成具有「严重」或「高」严重性结果的影像时",
    "avoid": "",
    "questionCues": [
      "该解决方案必须自动删除具有“严重”或“高”严重性结果的新图像标签",
      "解决方案也必须通知开发团队"
    ],
    "answerCues": {
      "A": [
        "当扫描完成具有「严重」或「高」严重性结果的影像时"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "225": {
    "when": "该公司希望在未来 3 年内优化其运算成本 + 使用提供最大程度的成本节省",
    "target": "使用管理帐户层级的建议从管理帐户为组织购买计算储蓄计划",
    "avoid": "",
    "questionCues": [
      "该公司希望在未来 3 年内优化其运算成本",
      "使用提供最大程度的成本节省"
    ],
    "answerCues": {
      "B": [
        "使用管理帐户层级的建议从管理帐户为组织购买计算储蓄计划"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "226": {
    "when": "财务团队必须收到电子邮件通知 + 解决方案架构师需要实施一个解决方案来追踪成本并发送通知",
    "target": "新增警报阈值并将值设为 80%",
    "avoid": "",
    "questionCues": [
      "财务团队必须收到电子邮件通知",
      "解决方案架构师需要实施一个解决方案来追踪成本并发送通知"
    ],
    "answerCues": {
      "A": [
        "新增警报阈值并将值设为 80%"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "227": {
    "when": "该公司将其应用程式托管在 us-east-1 Region 的 Amazon EC2 实例中",
    "target": "配置储存桶以使用 S3 传输加速",
    "avoid": "",
    "questionCues": [
      "该公司将其应用程式托管在 us-east-1 Region 的 Amazon EC2 实例中"
    ],
    "answerCues": {
      "C": [
        "配置储存桶以使用 S3 传输加速"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "228": {
    "when": "一些经常存取的资料必须始终跨应用程式伺服器可用 + 并且必须扩展以满足流量的成长",
    "target": "Amazon DynamoDB",
    "avoid": "",
    "questionCues": [
      "一些经常存取的资料必须始终跨应用程式伺服器可用",
      "并且必须扩展以满足流量的成长"
    ],
    "answerCues": {
      "D": [
        "Amazon DynamoDB"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "229": {
    "when": "解决方案架构师会将资料库迁移到现代资料架构 + 解决方案架构师必须在近乎零停机的情况下迁移资料库",
    "target": "相应地配置复制",
    "avoid": "",
    "questionCues": [
      "解决方案架构师会将资料库迁移到现代资料架构",
      "解决方案架构师必须在近乎零停机的情况下迁移资料库"
    ],
    "answerCues": {
      "C": [
        "相应地配置复制"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "230": {
    "when": "解决方案架构师需要降低成本 + 这些准则必须最大限度地减少整个环境的资料传输费用",
    "target": "C：关闭Network Load Balancer的跨区域负载平衡；D：Availability Zone 特定端点服务",
    "avoid": "别选“使用 AWS 资源存取管理员与组织中的其他帐户共用托管服务提供者应用程式的子网路”。",
    "questionCues": [
      "解决方案架构师需要降低成本",
      "这些准则必须最大限度地减少整个环境的资料传输费用"
    ],
    "answerCues": {
      "C": [
        "关闭Network Load Balancer的跨区域负载平衡"
      ],
      "D": [
        "Availability Zone 特定端点服务"
      ]
    },
    "disputed": false,
    "legacyMismatch": true
  },
  "231": {
    "when": "该公司希望将备份移至Amazon S3上更强大的云端储存",
    "target": "将夜间资料库汇出写入新的 SMB 档案共用",
    "avoid": "",
    "questionCues": [
      "该公司希望将备份移至Amazon S3上更强大的云端储存"
    ],
    "answerCues": {
      "A": [
        "将夜间资料库汇出写入新的 SMB 档案共用"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "232": {
    "when": "某公司需要建立on-premises资料中心到AWS的连线 + 公司还必须降低网路出站流量成本",
    "target": "配置中转 VIF",
    "avoid": "",
    "questionCues": [
      "某公司需要建立on-premises资料中心到AWS的连线",
      "公司还必须降低网路出站流量成本"
    ],
    "answerCues": {
      "B": [
        "配置中转 VIF"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "233": {
    "when": "在管理帐户中 + 解决方案架构师需要建立一个 IAM 用户",
    "target": "使用信任策略授予 IAM 使用者对角色的存取权限",
    "avoid": "",
    "questionCues": [
      "在管理帐户中",
      "解决方案架构师需要建立一个 IAM 用户"
    ],
    "answerCues": {
      "D": [
        "使用信任策略授予 IAM 使用者对角色的存取权限"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "234": {
    "when": "一家公司希望 + 此解决方案必须支援本机故障转移和回退功能",
    "target": "将档案系统挂载到 AWS 伺服器",
    "avoid": "",
    "questionCues": [
      "一家公司希望",
      "此解决方案必须支援本机故障转移和回退功能"
    ],
    "answerCues": {
      "D": [
        "将档案系统挂载到 AWS 伺服器"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "235": {
    "when": "EC2 + 解决方案架构师应该做出哪些设计选择才能实现 HPC 集群的最大效能",
    "target": "A：单一Availability Zone内启动；C：启用了 Elastic Fabric Adapter；F：Amazon FSx for Lustre",
    "avoid": "",
    "questionCues": [
      "EC2",
      "解决方案架构师应该做出哪些设计选择才能实现 HPC 集群的最大效能"
    ],
    "answerCues": {
      "A": [
        "单一Availability Zone内启动"
      ],
      "C": [
        "启用了 Elastic Fabric Adapter"
      ],
      "F": [
        "Amazon FSx for Lustre"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "236": {
    "when": "该公司希望标准化在整个组织中应用标签的流程 + 公司将要求具有特定值的标签",
    "target": "使用 SCP 拒绝建立不具有所需标签的资源 + 将标签策略附加到OU",
    "avoid": "别选“使用 SCP 仅当资源具有所需标签时才允许建立资源”。",
    "questionCues": [
      "该公司希望标准化在整个组织中应用标签的流程",
      "公司将要求具有特定值的标签"
    ],
    "answerCues": {
      "A": [
        "使用 SCP 拒绝建立不具有所需标签的资源",
        "将标签策略附加到OU"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "237": {
    "when": "Amazon S3 + 解决方案架构师必须在AWS上创建高度可用且可扩展的新设计",
    "target": "使用AWS Lambda函数来处理资料转换",
    "avoid": "",
    "questionCues": [
      "Amazon S3",
      "解决方案架构师必须在AWS上创建高度可用且可扩展的新设计"
    ],
    "answerCues": {
      "C": [
        "使用AWS Lambda函数来处理资料转换"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "238": {
    "when": "公司必须对资料备份进行以下更改 + 必须根据自订的每日、每周和每月要求保留Backup",
    "target": "A：建立包含每个保留要求的备份规则的 AWS Backup 计划；B：配置一个 AWS Backup 计划将备份复制到另一个 Region；D：新增至备份计划",
    "avoid": "",
    "questionCues": [
      "公司必须对资料备份进行以下更改",
      "必须根据自订的每日、每周和每月要求保留Backup"
    ],
    "answerCues": {
      "A": [
        "建立包含每个保留要求的备份规则的 AWS Backup 计划"
      ],
      "B": [
        "配置一个 AWS Backup 计划将备份复制到另一个 Region"
      ],
      "D": [
        "新增至备份计划"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "239": {
    "when": "该设备每秒将 8 KB 的基因组数据推送到需要处理和分析数据并向研究人员提供资讯的数据平台",
    "target": "使用Amazon Kinesis Data Streams收集入站感测器数据",
    "avoid": "",
    "questionCues": [
      "该设备每秒将 8 KB 的基因组数据推送到需要处理和分析数据并向研究人员提供资讯的数据平台"
    ],
    "answerCues": {
      "B": [
        "使用Amazon Kinesis Data Streams收集入站感测器数据"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "240": {
    "when": "AWS Region 内的高可用性 + 1 分钟内故障转移到另一个 AWS Region",
    "target": "B：将生存时间 (TTL) 设定为 30 秒；C：在Amazon DynamoDB中使用全域表；E：对任何其他资源使用按需实例",
    "avoid": "",
    "questionCues": [
      "AWS Region 内的高可用性",
      "1 分钟内故障转移到另一个 AWS Region"
    ],
    "answerCues": {
      "B": [
        "将生存时间 (TTL) 设定为 30 秒"
      ],
      "C": [
        "在Amazon DynamoDB中使用全域表"
      ],
      "E": [
        "对任何其他资源使用按需实例"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "241": {
    "when": "公司必须对解决方案进行现代化改造并将解决方案迁移到AWS + 以解决扩展挑战",
    "target": "从传输流读取资料以侦测异常",
    "avoid": "",
    "questionCues": [
      "公司必须对解决方案进行现代化改造并将解决方案迁移到AWS",
      "以解决扩展挑战"
    ],
    "answerCues": {
      "B": [
        "从传输流读取资料以侦测异常"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "242": {
    "when": "安全团队发现开发团队将 IAM + 安全团队希望自动寻找并修复此安全漏洞的实例",
    "target": "请在 AWS IAM 中停用它们并通知使用者",
    "avoid": "",
    "questionCues": [
      "安全团队发现开发团队将 IAM",
      "安全团队希望自动寻找并修复此安全漏洞的实例"
    ],
    "answerCues": {
      "D": [
        "请在 AWS IAM 中停用它们并通知使用者"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "243": {
    "when": "该公司的资讯安全政策规定 + 且每个应用程式应具有运作所需的最低权限",
    "target": "A：为拥有 S3 储存桶的 AWS 帐户中的每个应用程式建立 S3 存取点；C：根据端点策略",
    "avoid": "别选“设定端点策略以允许存取 S3 接入点”。",
    "questionCues": [
      "该公司的资讯安全政策规定",
      "且每个应用程式应具有运作所需的最低权限"
    ],
    "answerCues": {
      "A": [
        "为拥有 S3 储存桶的 AWS 帐户中的每个应用程式建立 S3 存取点"
      ],
      "C": [
        "根据端点策略"
      ]
    },
    "disputed": false,
    "legacyMismatch": true
  },
  "244": {
    "when": "EC2 执行个体从本地托管的多个 + 该公司希望近乎即时地监控哪些 EC2 实例连接到资料库",
    "target": "建立一个 CloudWatch 日志订阅",
    "avoid": "",
    "questionCues": [
      "EC2 执行个体从本地托管的多个",
      "该公司希望近乎即时地监控哪些 EC2 实例连接到资料库"
    ],
    "answerCues": {
      "B": [
        "建立一个 CloudWatch 日志订阅"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "245": {
    "when": "从AWS计费和成本管理控制台记录当前成本 + 公司有严格的合规要求",
    "target": "B：确保每个帐户都接受邀请；D：创建一个 SCP；E：在管理帐户中建立IAM角色",
    "avoid": "别选“建立一个 SCP”。",
    "questionCues": [
      "从AWS计费和成本管理控制台记录当前成本",
      "公司有严格的合规要求"
    ],
    "answerCues": {
      "B": [
        "确保每个帐户都接受邀请"
      ],
      "D": [
        "创建一个 SCP"
      ],
      "E": [
        "在管理帐户中建立IAM角色"
      ]
    },
    "disputed": false,
    "legacyMismatch": true
  },
  "246": {
    "when": "建立和管理多个 AWS 帐户 + 安全团队要求自己的 AWS 帐户对所有帐户具有唯读存取权",
    "target": "建立一个具有唯读存取权的新 IAM 角色",
    "avoid": "",
    "questionCues": [
      "建立和管理多个 AWS 帐户",
      "安全团队要求自己的 AWS 帐户对所有帐户具有唯读存取权"
    ],
    "answerCues": {
      "B": [
        "建立一个具有唯读存取权的新 IAM 角色"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "247": {
    "when": "NAT + 分支 VPC 中的所有私有子网路必须透过出口 VPC 将流量路由到网际网路",
    "target": "建立中转网关",
    "avoid": "",
    "questionCues": [
      "NAT",
      "分支 VPC 中的所有私有子网路必须透过出口 VPC 将流量路由到网际网路"
    ],
    "answerCues": {
      "B": [
        "建立中转网关"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "248": {
    "when": "ALB + 解决方案架构师必须防止失败的登入尝试淹没身分验证服务",
    "target": "并将规则操作设定为阻止",
    "avoid": "",
    "questionCues": [
      "ALB",
      "解决方案架构师必须防止失败的登入尝试淹没身分验证服务"
    ],
    "answerCues": {
      "B": [
        "并将规则操作设定为阻止"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "249": {
    "when": "不允许更改SFTP端点IP位址 + 该公司希望将 SaaS 解决方案迁移到AWS",
    "target": "使用AWS Transfer 将档案储存到Amazon S3",
    "avoid": "",
    "questionCues": [
      "不允许更改SFTP端点IP位址",
      "该公司希望将 SaaS 解决方案迁移到AWS"
    ],
    "answerCues": {
      "A": [
        "使用AWS Transfer 将档案储存到Amazon S3"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "250": {
    "when": "该应用程式需要在运行该应用程式的所有EC2实例之间建立高吞吐量、低延迟的网路连线",
    "target": "将 5 个新的 EC2 实例启动到群集置放群组",
    "avoid": "",
    "questionCues": [
      "该应用程式需要在运行该应用程式的所有EC2实例之间建立高吞吐量、低延迟的网路连线"
    ],
    "answerCues": {
      "A": [
        "将 5 个新的 EC2 实例启动到群集置放群组"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "251": {
    "when": "并希望保护其 API + 同时最大限度地降低成本",
    "target": "建立 API 金钥并将其新增至使用计划",
    "avoid": "",
    "questionCues": [
      "并希望保护其 API",
      "同时最大限度地降低成本"
    ],
    "answerCues": {
      "D": [
        "建立 API 金钥并将其新增至使用计划"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "252": {
    "when": "公司的资料库团队必须监控所有资料库上的所有资料活动",
    "target": "以将活动流推送到 Amazon Kinesis 资料流",
    "avoid": "",
    "questionCues": [
      "公司的资料库团队必须监控所有资料库上的所有资料活动"
    ],
    "answerCues": {
      "C": [
        "以将活动流推送到 Amazon Kinesis 资料流"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "253": {
    "when": "解决方案架构师需要配置Auto Scaling组 + 以便以最具成本效益的方式满足需求",
    "target": "配置 Auto Scaling 群组以部署 r6g.4xlarge（记忆体最佳化）实例",
    "avoid": "",
    "questionCues": [
      "解决方案架构师需要配置Auto Scaling组",
      "以便以最具成本效益的方式满足需求"
    ],
    "answerCues": {
      "C": [
        "配置 Auto Scaling 群组以部署 r6g.4xlarge（记忆体最佳化）实例"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "254": {
    "when": "针对表的应用程式读取活动全天突然发生 + 公司需要降低与DynamoDB相关的成本",
    "target": "部署DynamoDB Accelerator (DAX) + 使用预配置容量模式 + 配置DynamoDB自动缩放",
    "avoid": "别选“在 Cost Explorer 购买 Savings Plans”。",
    "questionCues": [
      "针对表的应用程式读取活动全天突然发生",
      "公司需要降低与DynamoDB相关的成本"
    ],
    "answerCues": {
      "D": [
        "部署DynamoDB Accelerator (DAX)",
        "使用预配置容量模式",
        "配置DynamoDB自动缩放"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "255": {
    "when": "已为日志记录服务建立了一个介面端点并且可用 + 用户端无法使用 VPC 端点提交日志",
    "target": "A：以允许与 NLB 子网路进行通讯；C：以确保它允许来自NLB子网的入口",
    "avoid": "",
    "questionCues": [
      "已为日志记录服务建立了一个介面端点并且可用",
      "用户端无法使用 VPC 端点提交日志"
    ],
    "answerCues": {
      "A": [
        "以允许与 NLB 子网路进行通讯"
      ],
      "C": [
        "以确保它允许来自NLB子网的入口"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "256": {
    "when": "AWS KMS 成本正在增加 + 解决方案架构师需要透过对应用程式进行最小的更改来优化成本",
    "target": "指定 SSE-S3",
    "avoid": "",
    "questionCues": [
      "AWS KMS 成本正在增加",
      "解决方案架构师需要透过对应用程式进行最小的更改来优化成本"
    ],
    "answerCues": {
      "B": [
        "指定 SSE-S3"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "257": {
    "when": "媒体储存应用程式将使用者照片上传到Amazon S3以供AWS Lambda函数处理",
    "target": "B：DynamoDB 表的 WCU；D：新增 Amazon Simple Queue Service (Amazon SQS) 伫列",
    "avoid": "",
    "questionCues": [
      "媒体储存应用程式将使用者照片上传到Amazon S3以供AWS Lambda函数处理"
    ],
    "answerCues": {
      "B": [
        "DynamoDB 表的 WCU"
      ],
      "D": [
        "新增 Amazon Simple Queue Service (Amazon SQS) 伫列"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "258": {
    "when": "该公司希望透过将应用程式迁移到AWS来解决这些挑战 + 公司需要加速应用程式开发",
    "target": "使用Amazon S3储存上传的媒体档案",
    "avoid": "",
    "questionCues": [
      "该公司希望透过将应用程式迁移到AWS来解决这些挑战",
      "公司需要加速应用程式开发"
    ],
    "answerCues": {
      "D": [
        "使用Amazon S3储存上传的媒体档案"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "259": {
    "when": "该公司的开发团队希望分析应用程式日志 + 日志将不再可用",
    "target": "配置EC2实例使用统一的CloudWatch代理将日志发布到AmazonCloudWatch日志",
    "avoid": "",
    "questionCues": [
      "该公司的开发团队希望分析应用程式日志",
      "日志将不再可用"
    ],
    "answerCues": {
      "B": [
        "配置EC2实例使用统一的CloudWatch代理将日志发布到AmazonCloudWatch日志"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "260": {
    "when": "该网站使用 Amazon S3 进行托管 + 解决方案架构师应该如何解决该错误",
    "target": "确保 API 端点",
    "avoid": "",
    "questionCues": [
      "该网站使用 Amazon S3 进行托管",
      "解决方案架构师应该如何解决该错误"
    ],
    "answerCues": {
      "C": [
        "确保 API 端点"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "261": {
    "when": "该公司希望开始使用身份联合而不是手动用户管理 + 该公司还希望使用临时凭证而不是长期存取密钥",
    "target": "A：确保每个帐户都接受邀请；C：配置 IAM Identity Center 以自动同步使用者和群组；E：建立 AWS IAM 身分中心（AWS Single Sign-On）权限集",
    "avoid": "别选“以使用 AWS Managed Microsoft AD 进行身份验证和授权”。",
    "questionCues": [
      "该公司希望开始使用身份联合而不是手动用户管理",
      "该公司还希望使用临时凭证而不是长期存取密钥"
    ],
    "answerCues": {
      "A": [
        "确保每个帐户都接受邀请"
      ],
      "C": [
        "配置 IAM Identity Center 以自动同步使用者和群组"
      ],
      "E": [
        "建立 AWS IAM 身分中心（AWS Single Sign-On）权限集"
      ]
    },
    "disputed": false,
    "legacyMismatch": true
  },
  "262": {
    "when": "迁移到 AWS 来管理与 20 个不经常 + 同时最大限度地降低成本",
    "target": "使用AmazonCloudWatch监控服务和主机",
    "avoid": "",
    "questionCues": [
      "迁移到 AWS 来管理与 20 个不经常",
      "同时最大限度地降低成本"
    ],
    "answerCues": {
      "B": [
        "使用AmazonCloudWatch监控服务和主机"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "263": {
    "when": "并需要6小时才能完成运作 + 解决方案架构师必须审查架构并提出解决方案以最大限度地降低计算成本",
    "target": "在实例群组中的 Spot 实例上启动任务节点 + 终止集群，包括所有实例 + 购买计算节省计划来满足按需实例的使用",
    "avoid": "别选“继续启动按需实例上的所有节点”。",
    "questionCues": [
      "并需要6小时才能完成运作",
      "解决方案架构师必须审查架构并提出解决方案以最大限度地降低计算成本"
    ],
    "answerCues": {
      "B": [
        "在实例群组中的 Spot 实例上启动任务节点",
        "终止集群，包括所有实例",
        "购买计算节省计划来满足按需实例的使用"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "264": {
    "when": "EC2 实例在 VPC 的三个私有子网路中运行 + 该解决方案还必须能够自动缓解故障",
    "target": "建立新的NAT网关",
    "avoid": "",
    "questionCues": [
      "EC2 实例在 VPC 的三个私有子网路中运行",
      "该解决方案还必须能够自动缓解故障"
    ],
    "answerCues": {
      "C": [
        "建立新的NAT网关"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "265": {
    "when": "AWS Organizations + 有 540 个开发者成员帐号必须迁移到新的开发者组织",
    "target": "B：在管理帐户中；E：以传送邀请给开发者帐户；F：让每个开发者登入他们的帐户并确认加入新的开发者组织",
    "avoid": "核对题目限制与完整选项。",
    "questionCues": [
      "AWS Organizations",
      "有 540 个开发者成员帐号必须迁移到新的开发者组织"
    ],
    "answerCues": {
      "B": [
        "在管理帐户中"
      ],
      "E": [
        "以传送邀请给开发者帐户"
      ],
      "F": [
        "让每个开发者登入他们的帐户并确认加入新的开发者组织"
      ]
    },
    "disputed": false,
    "legacyMismatch": true
  },
  "266": {
    "when": "解决方案架构师必须推荐一种解决方案来整合检测逻辑 + 并在摄取和服务之间实现最小延迟",
    "target": "使用呼叫 AWS Lambda 函数的 S3 事件通知",
    "avoid": "",
    "questionCues": [
      "解决方案架构师必须推荐一种解决方案来整合检测逻辑",
      "并在摄取和服务之间实现最小延迟"
    ],
    "answerCues": {
      "C": [
        "使用呼叫 AWS Lambda 函数的 S3 事件通知"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "267": {
    "when": "由于扩展事件 + 解决方案架构师应该建议什么来以最少的营运开销实现应用程式部署流程的自动化",
    "target": "建立安装了 CodeDeploy 代理程式的新 AMI",
    "avoid": "",
    "questionCues": [
      "由于扩展事件",
      "解决方案架构师应该建议什么来以最少的营运开销实现应用程式部署流程的自动化"
    ],
    "answerCues": {
      "D": [
        "建立安装了 CodeDeploy 代理程式的新 AMI"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "268": {
    "when": "自动处理EC2实例的替换 + 该公司需要最大限度地减少改用新解决方案期间的停机时间",
    "target": "将 Auto Scaling 组附加到现有 ALA将现有 EC2 实例附加到 Auto Scaling 组",
    "avoid": "",
    "questionCues": [
      "自动处理EC2实例的替换",
      "该公司需要最大限度地减少改用新解决方案期间的停机时间"
    ],
    "answerCues": {
      "B": [
        "将 Auto Scaling 组附加到现有 ALA将现有 EC2 实例附加到 Auto Scaling 组"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "269": {
    "when": "以及高昂的运算成本 + 该公司不希望这种强制执行对开发人员执行任务的速度产生负面影响",
    "target": "与开发者帐户共享产品组合",
    "avoid": "",
    "questionCues": [
      "以及高昂的运算成本",
      "该公司不希望这种强制执行对开发人员执行任务的速度产生负面影响"
    ],
    "answerCues": {
      "C": [
        "与开发者帐户共享产品组合"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "270": {
    "when": "解决方案架构师必须推荐一种解决方案 + 拒绝存取特别指定的Regions以外的任何操作",
    "target": "创建OU并附加SCP",
    "avoid": "",
    "questionCues": [
      "解决方案架构师必须推荐一种解决方案",
      "拒绝存取特别指定的Regions以外的任何操作"
    ],
    "answerCues": {
      "C": [
        "创建OU并附加SCP"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "271": {
    "when": "该公司需要创建一个解耦、可扩展的架构 + 同时最大限度地降低营运成本",
    "target": "使用 AWS Lambda 进行业务逻辑",
    "avoid": "",
    "questionCues": [
      "该公司需要创建一个解耦、可扩展的架构",
      "同时最大限度地降低营运成本"
    ],
    "answerCues": {
      "C": [
        "使用 AWS Lambda 进行业务逻辑"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "272": {
    "when": "并已配置 Amazon Route 53 运行状况检查和 DNS 故障转移到 us-west-2",
    "target": "辅助资料库位于 us-west-2",
    "avoid": "",
    "questionCues": [
      "并已配置 Amazon Route 53 运行状况检查和 DNS 故障转移到 us-west-2"
    ],
    "answerCues": {
      "B": [
        "辅助资料库位于 us-west-2"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "273": {
    "when": "一家公司正在使用AWS Organizations来管理多个帐户 + 并以最少的配置进行集中管理",
    "target": "将特定会员帐号与新的OU相关联",
    "avoid": "",
    "questionCues": [
      "一家公司正在使用AWS Organizations来管理多个帐户",
      "并以最少的配置进行集中管理"
    ],
    "answerCues": {
      "D": [
        "将特定会员帐号与新的OU相关联"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "274": {
    "when": "Amazon S3 + 哪一组操作会立即修复安全性问题而不影响应用程式的正常工作流程",
    "target": "使用 Amazon S3 中的阻止公共存取功能将储存桶上的 IgnorePublicAcIs 选项设为 TRUE",
    "avoid": "",
    "questionCues": [
      "Amazon S3",
      "哪一组操作会立即修复安全性问题而不影响应用程式的正常工作流程"
    ],
    "answerCues": {
      "D": [
        "使用 Amazon S3 中的阻止公共存取功能将储存桶上的 IgnorePublicAcIs 选项设为 TRUE"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "275": {
    "when": "解决方案架构师需要设计一种无需停机并最大限度地减少完成迁移所需时间的迁移策略 + 迁移策略必须",
    "target": "A：AWS架构转换工具（AWSSCT）；C：VPC 对等互连；E：完整载入加变更资料撷取（CDC）迁移",
    "avoid": "别选“转换工具 (AWS SCT)”。",
    "questionCues": [
      "解决方案架构师需要设计一种无需停机并最大限度地减少完成迁移所需时间的迁移策略",
      "迁移策略必须"
    ],
    "answerCues": {
      "A": [
        "AWS架构转换工具（AWSSCT）"
      ],
      "C": [
        "VPC 对等互连"
      ],
      "E": [
        "完整载入加变更资料撷取（CDC）迁移"
      ]
    },
    "disputed": true,
    "legacyMismatch": true
  },
  "276": {
    "when": "后端处理逾时设定为10秒 + 解决方案架构师需要分析错误的订单讯息并确保系统继续处理后续讯息",
    "target": "配置一个新的SQS标准伫列作为死信伫列来隔离错误讯息",
    "avoid": "",
    "questionCues": [
      "后端处理逾时设定为10秒",
      "解决方案架构师需要分析错误的订单讯息并确保系统继续处理后续讯息"
    ],
    "answerCues": {
      "D": [
        "配置一个新的SQS标准伫列作为死信伫列来隔离错误讯息"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "277": {
    "when": "一家公司使用 AWS Step Functions 自动化了其机器学习模型的夜间重新训练",
    "target": "A：Amazon SNS；B：将输入参数转送到 SNS 主题；C：[「States.ALL」] 和「Next」",
    "avoid": "别选“Amazon SES”。",
    "questionCues": [
      "一家公司使用 AWS Step Functions 自动化了其机器学习模型的夜间重新训练"
    ],
    "answerCues": {
      "A": [
        "Amazon SNS"
      ],
      "B": [
        "将输入参数转送到 SNS 主题"
      ],
      "C": [
        "[「States.ALL」] 和「Next」"
      ]
    },
    "disputed": true,
    "legacyMismatch": true
  },
  "278": {
    "when": "解决方案架构师必须确保新服务可以解析 company.example 网域上的主机名",
    "target": "建立解析程序规则",
    "avoid": "",
    "questionCues": [
      "解决方案架构师必须确保新服务可以解析 company.example 网域上的主机名"
    ],
    "answerCues": {
      "B": [
        "建立解析程序规则"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "279": {
    "when": "安全审核显示 + 每个VPC 必须只能与一组预先定义的、有限的授权VPC 进行通讯",
    "target": "仅将交通路由至授权的VPC",
    "avoid": "",
    "questionCues": [
      "安全审核显示",
      "每个VPC 必须只能与一组预先定义的、有限的授权VPC 进行通讯"
    ],
    "answerCues": {
      "C": [
        "仅将交通路由至授权的VPC"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "280": {
    "when": "迁移并重新托管到AWS + 但希望采用一种简化的方式来管理所有员工对AWS上的应用程式的存取",
    "target": "使用AppStream2.0用户池实现身份验证",
    "avoid": "",
    "questionCues": [
      "迁移并重新托管到AWS",
      "但希望采用一种简化的方式来管理所有员工对AWS上的应用程式的存取"
    ],
    "answerCues": {
      "C": [
        "使用AppStream2.0用户池实现身份验证"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "281": {
    "when": "该公司担心当前解决方案的高成本 + 解决方案架构师必须提出最具成本效益的解决方案",
    "target": "使用 AWS Glue Data Catalog 和 Amazon Athena 查询资料",
    "avoid": "",
    "questionCues": [
      "该公司担心当前解决方案的高成本",
      "解决方案架构师必须提出最具成本效益的解决方案"
    ],
    "answerCues": {
      "B": [
        "使用 AWS Glue Data Catalog 和 Amazon Athena 查询资料"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "282": {
    "when": "公司需要提高AWS计费和成本管理细节的可见度 + 但有指导方针要求所有基础设施都",
    "target": "使用 SCPs 限制资源上没有成本中心和专案 ID 的资源建立",
    "avoid": "",
    "questionCues": [
      "公司需要提高AWS计费和成本管理细节的可见度",
      "但有指导方针要求所有基础设施都"
    ],
    "answerCues": {
      "C": [
        "使用 SCPs 限制资源上没有成本中心和专案 ID 的资源建立"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "283": {
    "when": "一家公司希望将资料从其 on-premises 系统传送到 Amazon S3 储存桶",
    "target": "A：在 on-premises 环境与私有 VPC 之间建立与私有 VIF 的 AWS Direct Connect 连线；C：在网路帐户中建立Amazon S3介面端点",
    "avoid": "别选“来自托管 S3 储存桶的帐户的对等 VPC 以及网路帐户中的 VPC”。",
    "questionCues": [
      "一家公司希望将资料从其 on-premises 系统传送到 Amazon S3 储存桶"
    ],
    "answerCues": {
      "A": [
        "在 on-premises 环境与私有 VPC 之间建立与私有 VIF 的 AWS Direct Connect 连线"
      ],
      "C": [
        "在网路帐户中建立Amazon S3介面端点"
      ]
    },
    "disputed": false,
    "legacyMismatch": true
  },
  "284": {
    "when": "该公司希望降低 DynamoDB 成本并最大限度地减少 IT 员工的营运开销",
    "target": "为表格启用 Dynamo DB 自动缩放",
    "avoid": "",
    "questionCues": [
      "该公司希望降低 DynamoDB 成本并最大限度地减少 IT 员工的营运开销"
    ],
    "answerCues": {
      "C": [
        "为表格启用 Dynamo DB 自动缩放"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "285": {
    "when": "AWS Lambda + 公司希望透过即时显示评论来提高使用者参与度",
    "target": "使用 AWS AppSync 并利用 WebSocket 来传递评论",
    "avoid": "",
    "questionCues": [
      "AWS Lambda",
      "公司希望透过即时显示评论来提高使用者参与度"
    ],
    "answerCues": {
      "C": [
        "使用 AWS AppSync 并利用 WebSocket 来传递评论"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "286": {
    "when": "S3接入点只能在VPC秒内访问 + 不能在互联网上访问",
    "target": "在组织的根层级建立 SCP 以拒绝 s3:CreateAccessPoint 操作",
    "avoid": "",
    "questionCues": [
      "S3接入点只能在VPC秒内访问",
      "不能在互联网上访问"
    ],
    "answerCues": {
      "B": [
        "在组织的根层级建立 SCP 以拒绝 s3:CreateAccessPoint 操作"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "287": {
    "when": "解决方案架构师必须使用蓝/绿部署方法更新AWSElastic Beanstalk内的应用程式环境",
    "target": "选择交换环境 URL 选项",
    "avoid": "",
    "questionCues": [
      "解决方案架构师必须使用蓝/绿部署方法更新AWSElastic Beanstalk内的应用程式环境"
    ],
    "answerCues": {
      "B": [
        "选择交换环境 URL 选项"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "288": {
    "when": "全球多达 10,000 名用户将上传他们的图像 + 然后将其发布在公司网站上",
    "target": "Amazon SQS",
    "avoid": "",
    "questionCues": [
      "全球多达 10,000 名用户将上传他们的图像",
      "然后将其发布在公司网站上"
    ],
    "answerCues": {
      "C": [
        "Amazon SQS"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "289": {
    "when": "欧洲客户必须能够存取与美国 (US) 客户相同的数据 + 并且不能容忍高应用程式延迟或过时的数据",
    "target": "暂停应用程式写入RDS 资料库实例",
    "avoid": "核对题目限制与完整选项。",
    "questionCues": [
      "欧洲客户必须能够存取与美国 (US) 客户相同的数据",
      "并且不能容忍高应用程式延迟或过时的数据"
    ],
    "answerCues": {
      "A": [
        "暂停应用程式写入RDS 资料库实例"
      ]
    },
    "disputed": true,
    "legacyMismatch": true
  },
  "290": {
    "when": "解决方案架构师必须实施一个解决方案来提高可用性、最大限度地降低基础设施管理的复杂性",
    "target": "将具有客户 IP 位址的安全群组附加到新端点",
    "avoid": "",
    "questionCues": [
      "解决方案架构师必须实施一个解决方案来提高可用性、最大限度地降低基础设施管理的复杂性"
    ],
    "answerCues": {
      "B": [
        "将具有客户 IP 位址的安全群组附加到新端点"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "291": {
    "when": "每晚计算总计统计资料的过程需要 4 小时才能完成 + 公司需要确定是否购买新的预订或实施新的设计",
    "target": "Amazon S3 + AWS Batch 与 Spot 实例",
    "avoid": "别选“使用计划脚本每晚启动一组EC2按需实例来执行S3资料的批次”。",
    "questionCues": [
      "每晚计算总计统计资料的过程需要 4 小时才能完成",
      "公司需要确定是否购买新的预订或实施新的设计"
    ],
    "answerCues": {
      "B": [
        "Amazon S3",
        "AWS Batch 与 Spot 实例"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "292": {
    "when": "某公司需要将on-premises SFTP站点迁移到AWS + 解决方案架构师必须实现高可用性",
    "target": "为每个子网路指定弹性 IP 位址",
    "avoid": "",
    "questionCues": [
      "某公司需要将on-premises SFTP站点迁移到AWS",
      "解决方案架构师必须实现高可用性"
    ],
    "answerCues": {
      "A": [
        "为每个子网路指定弹性 IP 位址"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "293": {
    "when": "且连线不能中断 + 解决方案架构师希望采用新的可用区",
    "target": "删除目前的 AZ2 子网路",
    "avoid": "",
    "questionCues": [
      "且连线不能中断",
      "解决方案架构师希望采用新的可用区"
    ],
    "answerCues": {
      "A": [
        "删除目前的 AZ2 子网路"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "294": {
    "when": "某公司使用AWS Organizations中的组织来管理公司的AWS帐户",
    "target": "建立标签策略",
    "avoid": "",
    "questionCues": [
      "某公司使用AWS Organizations中的组织来管理公司的AWS帐户"
    ],
    "answerCues": {
      "A": [
        "建立标签策略"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "295": {
    "when": "Amazon EC2 + 解决方案架构师需要实施一个解决方案来永久降低EC2成本并提高利用率",
    "target": "指定 CPU 和记忆体需求",
    "avoid": "别选“修改 Auto Scaling 群组的启动范本配置以使用清单中的多种实例类型”。",
    "questionCues": [
      "Amazon EC2",
      "解决方案架构师需要实施一个解决方案来永久降低EC2成本并提高利用率"
    ],
    "answerCues": {
      "C": [
        "指定 CPU 和记忆体需求"
      ]
    },
    "disputed": true,
    "legacyMismatch": true
  },
  "296": {
    "when": "该公司使用 AWS CloudFormation 实现基础设施配置自动化",
    "target": "使用 AWS Backup 在辅助 AWS Region 中建立 Aurora 资料库和 DynamoDB 资料库的备份",
    "avoid": "别选“Lambda 将DynamoDB 资料库复制到辅助资料库⟦T12​​6⟧”。",
    "questionCues": [
      "该公司使用 AWS CloudFormation 实现基础设施配置自动化"
    ],
    "answerCues": {
      "C": [
        "使用 AWS Backup 在辅助 AWS Region 中建立 Aurora 资料库和 DynamoDB 资料库的备份"
      ]
    },
    "disputed": true,
    "legacyMismatch": true
  },
  "297": {
    "when": "该应用程式利用 Amazon CloudFront 实现全局可扩展性和性能 + 随著时间的推移",
    "target": "选择CloudFront查看器请求触发器来呼叫函数",
    "avoid": "",
    "questionCues": [
      "该应用程式利用 Amazon CloudFront 实现全局可扩展性和性能",
      "随著时间的推移"
    ],
    "answerCues": {
      "A": [
        "选择CloudFront查看器请求触发器来呼叫函数"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "298": {
    "when": "公司需要将Aurora资料库中的资料复制到另一个Region + 公司的RPO为1小时",
    "target": "建立 DMS 变更资料撷取 (CDC) 任务",
    "avoid": "",
    "questionCues": [
      "公司需要将Aurora资料库中的资料复制到另一个Region",
      "公司的RPO为1小时"
    ],
    "answerCues": {
      "C": [
        "建立 DMS 变更资料撷取 (CDC) 任务"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "299": {
    "when": "修补程式曾导致停机 + 公司需要使应用程式具有高可用性",
    "target": "使用 Auto Scaling 组中较小的实例",
    "avoid": "",
    "questionCues": [
      "修补程式曾导致停机",
      "公司需要使应用程式具有高可用性"
    ],
    "answerCues": {
      "D": [
        "使用 Auto Scaling 组中较小的实例"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "300": {
    "when": "该公司希望将应用程式和这些依赖项一起迁移 + 公司应该如何识别需要与应用程式相同阶段迁移的依赖项",
    "target": "查询伺服器之间传输的数据",
    "avoid": "",
    "questionCues": [
      "该公司希望将应用程式和这些依赖项一起迁移",
      "公司应该如何识别需要与应用程式相同阶段迁移的依赖项"
    ],
    "answerCues": {
      "A": [
        "查询伺服器之间传输的数据"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "301": {
    "when": "配额必须符合客户的使用模式 + 有些客户必须在更短的时间内获得更高的配额",
    "target": "Amazon API Gateway REST API",
    "avoid": "",
    "questionCues": [
      "配额必须符合客户的使用模式",
      "有些客户必须在更短的时间内获得更高的配额"
    ],
    "answerCues": {
      "A": [
        "Amazon API Gateway REST API"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "302": {
    "when": "该公司已建立到 AWS 的 10 Gbps AWS Direct Connect 连接以进行迁移",
    "target": "为 VMS 建立复制作业",
    "avoid": "",
    "questionCues": [
      "该公司已建立到 AWS 的 10 Gbps AWS Direct Connect 连接以进行迁移"
    ],
    "answerCues": {
      "B": [
        "为 VMS 建立复制作业"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "303": {
    "when": "ECS + 敏感资料在应用程式中移动时必须进行加密",
    "target": "建立现场级加密设定档和配置",
    "avoid": "",
    "questionCues": [
      "ECS",
      "敏感资料在应用程式中移动时必须进行加密"
    ],
    "answerCues": {
      "B": [
        "建立现场级加密设定档和配置"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "304": {
    "when": "新要求强制DNS 查询必须使用私人托管区域 + 以确保在 VPC 内正确解析网域名称",
    "target": "建立私人托管区域 将私人托管区域与 VPC 关联",
    "avoid": "",
    "questionCues": [
      "新要求强制DNS 查询必须使用私人托管区域",
      "以确保在 VPC 内正确解析网域名称"
    ],
    "answerCues": {
      "B": [
        "建立私人托管区域 将私人托管区域与 VPC 关联"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "305": {
    "when": "产生报告的查询是复杂的读取查询 + 解决方案架构师必须设计一个能够适应突发使用的解决方案",
    "target": "开启 Amazon Redshift 集群的并发扩充功能",
    "avoid": "",
    "questionCues": [
      "产生报告的查询是复杂的读取查询",
      "解决方案架构师必须设计一个能够适应突发使用的解决方案"
    ],
    "answerCues": {
      "D": [
        "开启 Amazon Redshift 集群的并发扩充功能"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "306": {
    "when": "某研究中心正在迁移到 AWS 云 + 该研究中心的合规官员担心科学家将能够访问彼此的工作成果",
    "target": "A：新增一个条件；B：将追踪输出储存在另一个S3储存桶中",
    "avoid": "",
    "questionCues": [
      "某研究中心正在迁移到 AWS 云",
      "该研究中心的合规官员担心科学家将能够访问彼此的工作成果"
    ],
    "answerCues": {
      "A": [
        "新增一个条件"
      ],
      "B": [
        "将追踪输出储存在另一个S3储存桶中"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "307": {
    "when": "该公司希望保留所有标记的图像 + 该公司希望只保留最近 5 张未标记的图像",
    "target": "则包括允许 ECR 操作的条件",
    "avoid": "",
    "questionCues": [
      "该公司希望保留所有标记的图像",
      "该公司希望只保留最近 5 张未标记的图像"
    ],
    "answerCues": {
      "A": [
        "则包括允许 ECR 操作的条件"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "308": {
    "when": "快照保留7天 + 解决方案架构师需要建议每 6 小时拍摄一次快照并将快照保留 30 天的解决方案",
    "target": "使用标签套用备份计划",
    "avoid": "",
    "questionCues": [
      "快照保留7天",
      "解决方案架构师需要建议每 6 小时拍摄一次快照并将快照保留 30 天的解决方案"
    ],
    "answerCues": {
      "A": [
        "使用标签套用备份计划"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "309": {
    "when": "解决方案架构师需要允许 Account A 中的 IAM 使用者承担Account B 中的角色",
    "target": "A：将 SCP 配置为 Account A 以允许该操作；C：在 Account A 中为使用者配置基于身分的策略以允许该操作；E：在Account B中配置目标角色的信任策略以允许该操作",
    "avoid": "",
    "questionCues": [
      "解决方案架构师需要允许 Account A 中的 IAM 使用者承担Account B 中的角色"
    ],
    "answerCues": {
      "A": [
        "将 SCP 配置为 Account A 以允许该操作"
      ],
      "C": [
        "在 Account A 中为使用者配置基于身分的策略以允许该操作"
      ],
      "E": [
        "在Account B中配置目标角色的信任策略以允许该操作"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "310": {
    "when": "并且该公司希望其新解决方案支援NFS + 如果公司需要归档文件进行灾难恢复",
    "target": "档案闸道 + 移至 S3 Glacier Deep Archive",
    "avoid": "别选“部署与 S3 储存桶关联的 AWS Storage Gateway 卷闸网关”。",
    "questionCues": [
      "并且该公司希望其新解决方案支援NFS",
      "如果公司需要归档文件进行灾难恢复"
    ],
    "answerCues": {
      "D": [
        "档案闸道",
        "移至 S3 Glacier Deep Archive"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "311": {
    "when": "解决方案架构师必须推荐一种解决方案 + 以最大限度地降低公司的每月整体成本",
    "target": "购买 EC2 实例储蓄计划以涵盖 EC2 实例",
    "avoid": "",
    "questionCues": [
      "解决方案架构师必须推荐一种解决方案",
      "以最大限度地降低公司的每月整体成本"
    ],
    "answerCues": {
      "A": [
        "购买 EC2 实例储蓄计划以涵盖 EC2 实例"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "312": {
    "when": "解决方案架构师必须设计一个解决方案 + 用户必须自动连接到提供最低延迟的Region",
    "target": "Amazon DynamoDB",
    "avoid": "",
    "questionCues": [
      "解决方案架构师必须设计一个解决方案",
      "用户必须自动连接到提供最低延迟的Region"
    ],
    "answerCues": {
      "C": [
        "Amazon DynamoDB"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "313": {
    "when": "该方法优先考虑可靠性并最大限度地减少单一AWSRegion内防火墙设备之间的故障转移时间",
    "target": "A：单独的 Availability Zone；C：Gateway Load Balancer + 建立新的目标群组；F：建立 VPC Gateway Load Balancer 端点",
    "avoid": "",
    "questionCues": [
      "该方法优先考虑可靠性并最大限度地减少单一AWSRegion内防火墙设备之间的故障转移时间"
    ],
    "answerCues": {
      "A": [
        "单独的 Availability Zone"
      ],
      "C": [
        "Gateway Load Balancer",
        "建立新的目标群组"
      ],
      "F": [
        "建立 VPC Gateway Load Balancer 端点"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "314": {
    "when": "解决方案架构师需要将on-premises旧应用程式迁移到AWS + 考虑到这些需求",
    "target": "A：并将许可证文件储存在Amazon S3中；D：并将该值注入到本机设定档中",
    "avoid": "",
    "questionCues": [
      "解决方案架构师需要将on-premises旧应用程式迁移到AWS",
      "考虑到这些需求"
    ],
    "answerCues": {
      "A": [
        "并将许可证文件储存在Amazon S3中"
      ],
      "D": [
        "并将该值注入到本机设定档中"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "315": {
    "when": "解决方案架构师必须设计一种解决方案 + 以最大限度地减少下载报告的使用者的延迟",
    "target": "配置跨Region只读副本将Route 53记录更改为基于延迟的路由以连接到API GatewayAPI",
    "avoid": "",
    "questionCues": [
      "解决方案架构师必须设计一种解决方案",
      "以最大限度地减少下载报告的使用者的延迟"
    ],
    "answerCues": {
      "C": [
        "配置跨Region只读副本将Route 53记录更改为基于延迟的路由以连接到API GatewayAPI"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "316": {
    "when": "测试环境必须能够与中央伺服器通讯以报告测试结果 + 解决方案架构师必须实施解决方案",
    "target": "为测试环境建立一个 VPC",
    "avoid": "",
    "questionCues": [
      "测试环境必须能够与中央伺服器通讯以报告测试结果",
      "解决方案架构师必须实施解决方案"
    ],
    "answerCues": {
      "B": [
        "为测试环境建立一个 VPC"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "317": {
    "when": "并从 DynamoDB 全域表检索资料 + 解决方案架构师需要更改公司 API 的 API 元件",
    "target": "A：将 API 部署到多个 Regions；B：建立新的 KMS 多Region 客户管理金钥；C：选择适当的 KMS 金钥",
    "avoid": "",
    "questionCues": [
      "并从 DynamoDB 全域表检索资料",
      "解决方案架构师需要更改公司 API 的 API 元件"
    ],
    "answerCues": {
      "A": [
        "将 API 部署到多个 Regions"
      ],
      "B": [
        "建立新的 KMS 多Region 客户管理金钥"
      ],
      "C": [
        "选择适当的 KMS 金钥"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "318": {
    "when": "该公司希望将其应用程式和资料库迁移到AWS + 以提高其架构的可靠性",
    "target": "将资料库迁移到AmazonAuroraMySQL",
    "avoid": "",
    "questionCues": [
      "该公司希望将其应用程式和资料库迁移到AWS",
      "以提高其架构的可靠性"
    ],
    "answerCues": {
      "B": [
        "将资料库迁移到AmazonAuroraMySQL"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "319": {
    "when": "此解决方案必须将集中用户管理与公司的on-premisesActive Directory整合",
    "target": "使用者群组",
    "avoid": "",
    "questionCues": [
      "此解决方案必须将集中用户管理与公司的on-premisesActive Directory整合"
    ],
    "answerCues": {
      "B": [
        "使用者群组"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "320": {
    "when": "一家公司的合规性审计显示 + 解决方案架构师必须实作一个解决方案来加密所有新的静态磁碟区EBS",
    "target": "所有 AWS Regions 预设开启 EBS 加密",
    "avoid": "",
    "questionCues": [
      "一家公司的合规性审计显示",
      "解决方案架构师必须实作一个解决方案来加密所有新的静态磁碟区EBS"
    ],
    "answerCues": {
      "D": [
        "所有 AWS Regions 预设开启 EBS 加密"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "321": {
    "when": "需要云端运维工程师透过 SSH 连接到 EC2 执行个体来解决问题 + 任何 EC2 实例都不能",
    "target": "无需为实例设定任何 SSH 金钥",
    "avoid": "",
    "questionCues": [
      "需要云端运维工程师透过 SSH 连接到 EC2 执行个体来解决问题",
      "任何 EC2 实例都不能"
    ],
    "answerCues": {
      "C": [
        "无需为实例设定任何 SSH 金钥"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "322": {
    "when": "一家公司正在迁移行动银行应用程式以在 VPC 中的 Amazon EC2 实例上运行",
    "target": "使用 Amazon Route 53 解析器建立 DNS 端点",
    "avoid": "",
    "questionCues": [
      "一家公司正在迁移行动银行应用程式以在 VPC 中的 Amazon EC2 实例上运行"
    ],
    "answerCues": {
      "C": [
        "使用 Amazon Route 53 解析器建立 DNS 端点"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "323": {
    "when": "该公司希望使用 AWS 解决方案将资料传送到不需要固定架构储存的资料库 + 数据必须即时发送",
    "target": "使用Amazon Kinesis Data Streams将资料传送到Amazon DynamoDB",
    "avoid": "",
    "questionCues": [
      "该公司希望使用 AWS 解决方案将资料传送到不需要固定架构储存的资料库",
      "数据必须即时发送"
    ],
    "answerCues": {
      "B": [
        "使用Amazon Kinesis Data Streams将资料传送到Amazon DynamoDB"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "324": {
    "when": "应用程式和资料库之间的所有连接都必须加密 + 资料库必须能够根据需求进行扩展",
    "target": "使用 DynamoDB 的闸道 VPC 端点连接到 DynamoDB 表",
    "avoid": "别选“使用 DynamoDB 的介面 VPC 端点连接到 DynamoDB 表”。",
    "questionCues": [
      "应用程式和资料库之间的所有连接都必须加密",
      "资料库必须能够根据需求进行扩展"
    ],
    "answerCues": {
      "B": [
        "使用 DynamoDB 的闸道 VPC 端点连接到 DynamoDB 表"
      ]
    },
    "disputed": true,
    "legacyMismatch": true
  },
  "325": {
    "when": "迁移到 Amazon DocumentDB（具有 MongoDB 相容性）",
    "target": "建立并运行DMS迁移任务",
    "avoid": "",
    "questionCues": [
      "迁移到 Amazon DocumentDB（具有 MongoDB 相容性）"
    ],
    "answerCues": {
      "B": [
        "建立并运行DMS迁移任务"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "326": {
    "when": "该公司还希望实施增强的安全流程 + 该公司希望尽可能使用托管 AWS 服务",
    "target": "为 Microsoft Active Directory 实作 + 启动 EC2 实例",
    "avoid": "别选“建立一个 AWS Directory Service 简单的 AD 实作”。",
    "questionCues": [
      "该公司还希望实施增强的安全流程",
      "该公司希望尽可能使用托管 AWS 服务"
    ],
    "answerCues": {
      "B": [
        "为 Microsoft Active Directory 实作",
        "启动 EC2 实例"
      ]
    },
    "disputed": true,
    "legacyMismatch": true
  },
  "327": {
    "when": "迁移到AWS + 该公司还需要在另一个AWSRegion中实现复制以进行灾难复原",
    "target": "建立一个 Amazon DynamoDB 全域表来托管使用者会话资料",
    "avoid": "",
    "questionCues": [
      "迁移到AWS",
      "该公司还需要在另一个AWSRegion中实现复制以进行灾难复原"
    ],
    "answerCues": {
      "D": [
        "建立一个 Amazon DynamoDB 全域表来托管使用者会话资料"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "328": {
    "when": "该公司希望优化这些开发帐户的成本 + 该公司希望禁止使用其他不相关的服务",
    "target": "在AWS Control Tower中建立自订预防控制（护栏）",
    "avoid": "别选“配置 AWS Cong 规则以仅允许部署可突发实例并禁止不相关的服务”。",
    "questionCues": [
      "该公司希望优化这些开发帐户的成本",
      "该公司希望禁止使用其他不相关的服务"
    ],
    "answerCues": {
      "C": [
        "在AWS Control Tower中建立自订预防控制（护栏）"
      ]
    },
    "disputed": false,
    "legacyMismatch": true
  },
  "329": {
    "when": "24小时后将删除 + 解决方案架构师需要在不对应用程式架构进行重大变更的情况下解决此问题",
    "target": "实作一个 Lambda 函数",
    "avoid": "",
    "questionCues": [
      "24小时后将删除",
      "解决方案架构师需要在不对应用程式架构进行重大变更的情况下解决此问题"
    ],
    "answerCues": {
      "A": [
        "实作一个 Lambda 函数"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "330": {
    "when": "管理层要求解决方案架构师提供一个云端架构 + 该架构可以处理游戏的变化负载并提供低延迟的资料存取",
    "target": "使用 Amazon API Gateway 实作 REST API",
    "avoid": "",
    "questionCues": [
      "管理层要求解决方案架构师提供一个云端架构",
      "该架构可以处理游戏的变化负载并提供低延迟的资料存取"
    ],
    "answerCues": {
      "C": [
        "使用 Amazon API Gateway 实作 REST API"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "331": {
    "when": "在迁移切换之前 + 解决方案架构师必须建立一个流程",
    "target": "使用私有 VIF",
    "avoid": "",
    "questionCues": [
      "在迁移切换之前",
      "解决方案架构师必须建立一个流程"
    ],
    "answerCues": {
      "D": [
        "使用私有 VIF"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "332": {
    "when": "该公司要求 Web 应用程式必须只能透过使用 CloudFront 端点进行存取",
    "target": "CloudFront 托管前缀清单",
    "avoid": "",
    "questionCues": [
      "该公司要求 Web 应用程式必须只能透过使用 CloudFront 端点进行存取"
    ],
    "answerCues": {
      "B": [
        "CloudFront 托管前缀清单"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "333": {
    "when": "ALB + 下列哪一个解决方案是满足要求的最具成本效益的方法",
    "target": "当发生故障时",
    "avoid": "",
    "questionCues": [
      "ALB",
      "下列哪一个解决方案是满足要求的最具成本效益的方法"
    ],
    "answerCues": {
      "B": [
        "当发生故障时"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "334": {
    "when": "解决方案架构师需要准备基线基础架构 + 但它必须允许灵活地满足各种AWS帐户内的不同合规性要求",
    "target": "根据需要添加OU",
    "avoid": "",
    "questionCues": [
      "解决方案架构师需要准备基线基础架构",
      "但它必须允许灵活地满足各种AWS帐户内的不同合规性要求"
    ],
    "answerCues": {
      "B": [
        "根据需要添加OU"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "335": {
    "when": "以及 Amazon Aurora MySQL + 最佳性能是发布后一周的首要任务",
    "target": "D：使用 Aurora 全域资料库进行实体交叉 Region 复制；E：引入基于延迟的路由和 Amazon CloudFront 分布的 Amazon Route 53",
    "avoid": "",
    "questionCues": [
      "以及 Amazon Aurora MySQL",
      "最佳性能是发布后一周的首要任务"
    ],
    "answerCues": {
      "D": [
        "使用 Aurora 全域资料库进行实体交叉 Region 复制"
      ],
      "E": [
        "引入基于延迟的路由和 Amazon CloudFront 分布的 Amazon Route 53"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "336": {
    "when": "并且必须始终可用 + 分析应用程式可以毫无问题地中断和恢复",
    "target": "为线上游戏应用程式实例购买EC2实例节省计划 + 将 Spot 实例用于分析应用程式",
    "avoid": "别选“将按需实例用于分析应用程式”。",
    "questionCues": [
      "并且必须始终可用",
      "分析应用程式可以毫无问题地中断和恢复"
    ],
    "answerCues": {
      "B": [
        "为线上游戏应用程式实例购买EC2实例节省计划",
        "将 Spot 实例用于分析应用程式"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "337": {
    "when": "AWS Backup + 即所有备份都必须能够抵御任何生产帐户中特权用户凭证的泄露",
    "target": "A：使用指定非生产帐户中的AWSBackup保管库实施跨帐户备份；C：为分配给 AWS Backup 的 IAM 服务角色实现最小权限存取；D：确保冷层中始终存在至少一份备份",
    "avoid": "",
    "questionCues": [
      "AWS Backup",
      "即所有备份都必须能够抵御任何生产帐户中特权用户凭证的泄露"
    ],
    "answerCues": {
      "A": [
        "使用指定非生产帐户中的AWSBackup保管库实施跨帐户备份"
      ],
      "C": [
        "为分配给 AWS Backup 的 IAM 服务角色实现最小权限存取"
      ],
      "D": [
        "确保冷层中始终存在至少一份备份"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "338": {
    "when": "解决方案架构师必须设计一个能够处理需要摄取的大量日志记录资料的解决方案",
    "target": "A：在中央日志记录帐户中建立目标 Amazon Kinesis 资料流；C：为每个日志组建立订阅过滤器；E：以规范中央日志记录帐户中的日志并将日志写入安全性工具",
    "avoid": "",
    "questionCues": [
      "解决方案架构师必须设计一个能够处理需要摄取的大量日志记录资料的解决方案"
    ],
    "answerCues": {
      "A": [
        "在中央日志记录帐户中建立目标 Amazon Kinesis 资料流"
      ],
      "C": [
        "为每个日志组建立订阅过滤器"
      ],
      "E": [
        "以规范中央日志记录帐户中的日志并将日志写入安全性工具"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "339": {
    "when": "一家公司正在将遗留应用程式从on-premises资料中心迁移到AWS + 迁移应用程式",
    "target": "A：使用 AWS 伺服器迁移服务 (AWS SMS) 复制作业将资料库伺服器虚拟机器迁移到 AWS；D：使用 AWS 伺服器迁移服务 (AWS SMS) 复制作业将应用程式伺服器虚拟机器迁移到 AWS",
    "avoid": "",
    "questionCues": [
      "一家公司正在将遗留应用程式从on-premises资料中心迁移到AWS",
      "迁移应用程式"
    ],
    "answerCues": {
      "A": [
        "使用 AWS 伺服器迁移服务 (AWS SMS) 复制作业将资料库伺服器虚拟机器迁移到 AWS"
      ],
      "D": [
        "使用 AWS 伺服器迁移服务 (AWS SMS) 复制作业将应用程式伺服器虚拟机器迁移到 AWS"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "340": {
    "when": "该公司的AWS帐户包含数百个VPC + 该公司希望控制哪些VPC可以与其他VPC进行通讯",
    "target": "A：在 AWS 帐户中建立中转网关；B：配置所有 VPC 和 VPN 的附件；C：设定中转网关路由表",
    "avoid": "",
    "questionCues": [
      "该公司的AWS帐户包含数百个VPC",
      "该公司希望控制哪些VPC可以与其他VPC进行通讯"
    ],
    "answerCues": {
      "A": [
        "在 AWS 帐户中建立中转网关"
      ],
      "B": [
        "配置所有 VPC 和 VPN 的附件"
      ],
      "C": [
        "设定中转网关路由表"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "341": {
    "when": "AWS Lambda + 解决方案架构师必须设计一个可以扩展以处理流量变化的解决方案",
    "target": "将资料库迁移到Aurora Serverless v1",
    "avoid": "",
    "questionCues": [
      "AWS Lambda",
      "解决方案架构师必须设计一个可以扩展以处理流量变化的解决方案"
    ],
    "answerCues": {
      "D": [
        "将资料库迁移到Aurora Serverless v1"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "342": {
    "when": "应用程式无法处理所有传入请求 + 追踪资料显示资料库无法处理高峰时段的读取负载",
    "target": "将 EFS 档案系统安装到每个容器",
    "avoid": "",
    "questionCues": [
      "应用程式无法处理所有传入请求",
      "追踪资料显示资料库无法处理高峰时段的读取负载"
    ],
    "answerCues": {
      "D": [
        "将 EFS 档案系统安装到每个容器"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "343": {
    "when": "解决方案架构师希望获得每个请求的端到端视图 + 以分析请求的延迟并建立服务映射",
    "target": "将授权设为AWS_IAM",
    "avoid": "",
    "questionCues": [
      "解决方案架构师希望获得每个请求的端到端视图",
      "以分析请求的延迟并建立服务映射"
    ],
    "answerCues": {
      "A": [
        "将授权设为AWS_IAM"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "344": {
    "when": "Amazon S3 + CloudFormation 模板中最近的资源变更导致了计划外停机",
    "target": "在测试环境中使用AWSCodeBuild实现自动化测试",
    "avoid": "",
    "questionCues": [
      "Amazon S3",
      "CloudFormation 模板中最近的资源变更导致了计划外停机"
    ],
    "answerCues": {
      "B": [
        "在测试环境中使用AWSCodeBuild实现自动化测试"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "345": {
    "when": "应用程式必须具有采用 us-west-1 Region 主动-被动配置的灾难复原功能",
    "target": "并启用故障转移路由策略和运行状况检查",
    "avoid": "",
    "questionCues": [
      "应用程式必须具有采用 us-west-1 Region 主动-被动配置的灾难复原功能"
    ],
    "answerCues": {
      "B": [
        "并启用故障转移路由策略和运行状况检查"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "346": {
    "when": ".NET Core 元件需要复杂的编排 + 公司必须完全控制网路和主机配置",
    "target": "Amazon EC2",
    "avoid": "",
    "questionCues": [
      ".NET Core 元件需要复杂的编排",
      "公司必须完全控制网路和主机配置"
    ],
    "answerCues": {
      "D": [
        "Amazon EC2"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "347": {
    "when": "Amazon EC2 + 解决方案架构师应该如何解决这个问题",
    "target": "再次尝试启动",
    "avoid": "",
    "questionCues": [
      "Amazon EC2",
      "解决方案架构师应该如何解决这个问题"
    ],
    "answerCues": {
      "B": [
        "再次尝试启动"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "348": {
    "when": "公司政策要求每月在所有正在运行的作业系统上安装安全性更新 + 最新的安全性更新需要重新启动",
    "target": "A：透过设定更新策略来修改Auto Scaling组以将最旧的启动配置作为替换目标；D：建立自动化脚本来修补 AMI、更新启动配置并呼叫 Auto Scaling 实例刷新",
    "avoid": "",
    "questionCues": [
      "公司政策要求每月在所有正在运行的作业系统上安装安全性更新",
      "最新的安全性更新需要重新启动"
    ],
    "answerCues": {
      "A": [
        "透过设定更新策略来修改Auto Scaling组以将最旧的启动配置作为替换目标"
      ],
      "D": [
        "建立自动化脚本来修补 AMI、更新启动配置并呼叫 Auto Scaling 实例刷新"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "349": {
    "when": "VPC + 解决方案架构师必须提供对 PyPI 储存库的访问",
    "target": "AWS CodeArtifact",
    "avoid": "",
    "questionCues": [
      "VPC",
      "解决方案架构师必须提供对 PyPI 储存库的访问"
    ],
    "answerCues": {
      "D": [
        "AWS CodeArtifact"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "350": {
    "when": "解决方案架构师为具有严格灾难复原要求的政府机构工作 + 该机构还需要保持尽可能低的营运费用",
    "target": "以将 EBS 快照复制到附加 Regions",
    "avoid": "",
    "questionCues": [
      "解决方案架构师为具有严格灾难复原要求的政府机构工作",
      "该机构还需要保持尽可能低的营运费用"
    ],
    "answerCues": {
      "A": [
        "以将 EBS 快照复制到附加 Regions"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "351": {
    "when": "该公司希望仅 + 这些 EC2 实例必须限制在 us-east-2 Region",
    "target": "建立一个 IAM 策略",
    "avoid": "",
    "questionCues": [
      "该公司希望仅",
      "这些 EC2 实例必须限制在 us-east-2 Region"
    ],
    "answerCues": {
      "D": [
        "建立一个 IAM 策略"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "352": {
    "when": "必须将资料从来源 S3 储存桶复制到目标 S3 储存桶才能满足合规性目标 + 使用 S3",
    "target": "启用S3复制时间控制（S3RTC）",
    "avoid": "",
    "questionCues": [
      "必须将资料从来源 S3 储存桶复制到目标 S3 储存桶才能满足合规性目标",
      "使用 S3"
    ],
    "answerCues": {
      "D": [
        "启用S3复制时间控制（S3RTC）"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "353": {
    "when": "解决方案架构师需要了解目前环境并估算迁移后的云端资源成本 + 解决方案架构师应该",
    "target": "A：AWS 应用发现服务；D：AWS 云采用准备工具 (CART)；F：AWS 迁移中心",
    "avoid": "",
    "questionCues": [
      "解决方案架构师需要了解目前环境并估算迁移后的云端资源成本",
      "解决方案架构师应该"
    ],
    "answerCues": {
      "A": [
        "AWS 应用发现服务"
      ],
      "D": [
        "AWS 云采用准备工具 (CART)"
      ],
      "F": [
        "AWS 迁移中心"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "354": {
    "when": "EC2 实例由最小容量为 1、最大容量为 1 的 Auto Scaling 群组配置",
    "target": "将 MySQL 资料库实例的 RDS 修改为 Multi-AZ 配置",
    "avoid": "",
    "questionCues": [
      "EC2 实例由最小容量为 1、最大容量为 1 的 Auto Scaling 群组配置"
    ],
    "answerCues": {
      "A": [
        "将 MySQL 资料库实例的 RDS 修改为 Multi-AZ 配置"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "355": {
    "when": "该解决方案将自动扩展吞吐量以满足不断增长的需求 + 也无法继续管理Docker托管环境",
    "target": "将磁碟区新增至任务定义以指向EFS 档案系统",
    "avoid": "",
    "questionCues": [
      "该解决方案将自动扩展吞吐量以满足不断增长的需求",
      "也无法继续管理Docker托管环境"
    ],
    "answerCues": {
      "B": [
        "将磁碟区新增至任务定义以指向EFS 档案系统"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "356": {
    "when": "该公司希望在迁移过程中调整其资源规模 + 解决方案架构师必须评估公司目前的环境并制定迁移计划",
    "target": "部署迁移中心策略建议应用程式资料收集器",
    "avoid": "",
    "questionCues": [
      "该公司希望在迁移过程中调整其资源规模",
      "解决方案架构师必须评估公司目前的环境并制定迁移计划"
    ],
    "answerCues": {
      "B": [
        "部署迁移中心策略建议应用程式资料收集器"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "357": {
    "when": "并使用在 AWS Organizations ​​的组织中管理的多个 AWS 帐户",
    "target": "为组织中的所有帐户部署追踪",
    "avoid": "",
    "questionCues": [
      "并使用在 AWS Organizations ​​的组织中管理的多个 AWS 帐户"
    ],
    "answerCues": {
      "C": [
        "为组织中的所有帐户部署追踪"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "358": {
    "when": "一家公司正在一组 Amazon EC2 实例上 + 该公司需要尽可能低的网路延迟才能达到最佳效能",
    "target": "在群集置放群组中启动记忆体最佳化的 EC2 实例",
    "avoid": "",
    "questionCues": [
      "一家公司正在一组 Amazon EC2 实例上",
      "该公司需要尽可能低的网路延迟才能达到最佳效能"
    ],
    "answerCues": {
      "C": [
        "在群集置放群组中启动记忆体最佳化的 EC2 实例"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "359": {
    "when": "该公司需要将资料自动备份到AWS云 + Backups 资料必须每天出现",
    "target": "配置DataSync任务",
    "avoid": "",
    "questionCues": [
      "该公司需要将资料自动备份到AWS云",
      "Backups 资料必须每天出现"
    ],
    "answerCues": {
      "C": [
        "配置DataSync任务"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "360": {
    "when": "一家金融服务公司拥有一款资产管理产品 + 使用者角色必须能够仅启动经过批准和授权的应用程式",
    "target": "AWS Service Catalog",
    "avoid": "",
    "questionCues": [
      "一家金融服务公司拥有一款资产管理产品",
      "使用者角色必须能够仅启动经过批准和授权的应用程式"
    ],
    "answerCues": {
      "C": [
        "AWS Service Catalog"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "361": {
    "when": "公司希望让新客户能够存取 SaaS 服务 + 但公司不希望立即在 us-east-1 中",
    "target": "建立一个 IP 目标群组",
    "avoid": "核对题目限制与完整选项。",
    "questionCues": [
      "公司希望让新客户能够存取 SaaS 服务",
      "但公司不希望立即在 us-east-1 中"
    ],
    "answerCues": {
      "B": [
        "建立一个 IP 目标群组"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "362": {
    "when": "该公司还需要追踪在 Amazon S3 中加密的物件的百分比",
    "target": "让合规团队可以直接在 S3 控制台中存取仪表板",
    "avoid": "",
    "questionCues": [
      "该公司还需要追踪在 Amazon S3 中加密的物件的百分比"
    ],
    "answerCues": {
      "C": [
        "让合规团队可以直接在 S3 控制台中存取仪表板"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "363": {
    "when": "同时将停机时间降至最低 + 公司还必须能够在发生错误时快速回滚变更",
    "target": "请使用 CodeDeploy 触发手动回滚",
    "avoid": "",
    "questionCues": [
      "同时将停机时间降至最低",
      "公司还必须能够在发生错误时快速回滚变更"
    ],
    "answerCues": {
      "B": [
        "请使用 CodeDeploy 触发手动回滚"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "364": {
    "when": "以便公司可以追踪每个业务部门的成本 + 解决方案架构师应该做什么来强制执行未来的标记要求",
    "target": "建立一个 SCP 并将 SCP 附加到组织的根目录",
    "avoid": "",
    "questionCues": [
      "以便公司可以追踪每个业务部门的成本",
      "解决方案架构师应该做什么来强制执行未来的标记要求"
    ],
    "answerCues": {
      "C": [
        "建立一个 SCP 并将 SCP 附加到组织的根目录"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "365": {
    "when": "VPC + 解决方案架构师需要迁移整个EC2实例以使用IPv6",
    "target": "建立仅出口的网际网路闸道",
    "avoid": "",
    "questionCues": [
      "VPC",
      "解决方案架构师需要迁移整个EC2实例以使用IPv6"
    ],
    "answerCues": {
      "C": [
        "建立仅出口的网际网路闸道"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "366": {
    "when": "无法从部署在 VPC 中的 Amazon EC2 实例存取该 API",
    "target": "为 VPC 端点启用私有 DNS 命名",
    "avoid": "",
    "questionCues": [
      "无法从部署在 VPC 中的 Amazon EC2 实例存取该 API"
    ],
    "answerCues": {
      "B": [
        "为 VPC 端点启用私有 DNS 命名"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "367": {
    "when": "解决方案架构师必须确保公司能够集中管理所有AWS帐户的计费和存取策略",
    "target": "授予管理帐号承担 IAM 角色的权限",
    "avoid": "",
    "questionCues": [
      "解决方案架构师必须确保公司能够集中管理所有AWS帐户的计费和存取策略"
    ],
    "answerCues": {
      "C": [
        "授予管理帐号承担 IAM 角色的权限"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "368": {
    "when": "部署到 EC2 实例 + PostgreSQL 资料库已迁移到 Amazon RDS",
    "target": "部署应用程序",
    "avoid": "",
    "questionCues": [
      "部署到 EC2 实例",
      "PostgreSQL 资料库已迁移到 Amazon RDS"
    ],
    "answerCues": {
      "D": [
        "部署应用程序"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "369": {
    "when": "VPN + 公司必须在 AWS 上设计一个解决方案",
    "target": "B：将 Windows 档案伺服器的主目录移转到 Amazon FSx；D：将远端用户迁移到AWSClient VPN",
    "avoid": "",
    "questionCues": [
      "VPN",
      "公司必须在 AWS 上设计一个解决方案"
    ],
    "answerCues": {
      "B": [
        "将 Windows 档案伺服器的主目录移转到 Amazon FSx"
      ],
      "D": [
        "将远端用户迁移到AWSClient VPN"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "370": {
    "when": "并确保将来能够自动侦测到未加密的磁碟区 + 该公司希望有一个解决方案能够集中管理多个AWS帐户",
    "target": "C：建立每个未加密磁碟区的快照 + 将其替换为加密卷；D：开启强制控制（护栏）",
    "avoid": "",
    "questionCues": [
      "并确保将来能够自动侦测到未加密的磁碟区",
      "该公司希望有一个解决方案能够集中管理多个AWS帐户"
    ],
    "answerCues": {
      "C": [
        "建立每个未加密磁碟区的快照",
        "将其替换为加密卷"
      ],
      "D": [
        "开启强制控制（护栏）"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "371": {
    "when": "该公司需要 + 目录中拥有帐户的所有使用者都必须有权存取该应用程式",
    "target": "创建应用程式客户端",
    "avoid": "",
    "questionCues": [
      "该公司需要",
      "目录中拥有帐户的所有使用者都必须有权存取该应用程式"
    ],
    "answerCues": {
      "B": [
        "创建应用程式客户端"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "372": {
    "when": "故障转移需要 1 分钟以上 + 解决方案架构师必须设计一个能够提供最快故障转移时间的解决方案",
    "target": "将来源故障转移",
    "avoid": "",
    "questionCues": [
      "故障转移需要 1 分钟以上",
      "解决方案架构师必须设计一个能够提供最快故障转移时间的解决方案"
    ],
    "answerCues": {
      "D": [
        "将来源故障转移"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "373": {
    "when": "他们希望 + 他们还希望将多个帐户作为一个整体进行管理",
    "target": "C：查看AWS Trusted Advisor 报告以确定最近使用的服务；D：删除预设的 FullAWSAccess SCP；F：删除预设的 DenyAWSAccess SCP",
    "avoid": "别选“查看 AWS IAM 中的访问顾问以确定最近使用的服务”。",
    "questionCues": [
      "他们希望",
      "他们还希望将多个帐户作为一个整体进行管理"
    ],
    "answerCues": {
      "C": [
        "查看AWS Trusted Advisor 报告以确定最近使用的服务"
      ],
      "D": [
        "删除预设的 FullAWSAccess SCP"
      ],
      "F": [
        "删除预设的 DenyAWSAccess SCP"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "374": {
    "when": "该公司需要一个扩展解决方案 + 以最大限度地提高销售活动期间的可用性",
    "target": "故障转移到更大的 Aurora 副本",
    "avoid": "",
    "questionCues": [
      "该公司需要一个扩展解决方案",
      "以最大限度地提高销售活动期间的可用性"
    ],
    "answerCues": {
      "D": [
        "故障转移到更大的 Aurora 副本"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "375": {
    "when": "该公司不希望该解决方案消耗所有可用的网路频宽 + 因为其他应用程式需要频宽",
    "target": "A：建立一个至少具有两个私有子网路、两个 NAT 闸道和一个虚拟私有闸道的 VPC；E：在配置复制伺服器期间；F：在设定目标伺服器的启动设定期间",
    "avoid": "",
    "questionCues": [
      "该公司不希望该解决方案消耗所有可用的网路频宽",
      "因为其他应用程式需要频宽"
    ],
    "answerCues": {
      "A": [
        "建立一个至少具有两个私有子网路、两个 NAT 闸道和一个虚拟私有闸道的 VPC"
      ],
      "E": [
        "在配置复制伺服器期间"
      ],
      "F": [
        "在设定目标伺服器的启动设定期间"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "376": {
    "when": "该解决方案必须能够处理需求的显著变化 + 并且能够在发生故障时重新执行处理作业",
    "target": "执行 AWS Lambda 函数来调整影像大小",
    "avoid": "别选“使用S3事件通知呼叫AWS Lambda函数”。",
    "questionCues": [
      "该解决方案必须能够处理需求的显著变化",
      "并且能够在发生故障时重新执行处理作业"
    ],
    "answerCues": {
      "D": [
        "执行 AWS Lambda 函数来调整影像大小"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "377": {
    "when": "该公司希望降低计算成本并适当管理跨部门的成本 + 公司不希望在选择运算资源时失去营运弹性",
    "target": "使用标签编辑器将标签套用到适当的资源 + 购买计算节省计划",
    "avoid": "别选“购买 EC2 实例节省计划”。",
    "questionCues": [
      "该公司希望降低计算成本并适当管理跨部门的成本",
      "公司不希望在选择运算资源时失去营运弹性"
    ],
    "answerCues": {
      "C": [
        "使用标签编辑器将标签套用到适当的资源",
        "购买计算节省计划"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "378": {
    "when": "可以将图片和影片安全地上传到 Amazon S3 储存桶 + 用于透过浏览器介面上传物件",
    "target": "产生预签名 URL 时使用端点",
    "avoid": "",
    "questionCues": [
      "可以将图片和影片安全地上传到 Amazon S3 储存桶",
      "用于透过浏览器介面上传物件"
    ],
    "answerCues": {
      "C": [
        "产生预签名 URL 时使用端点"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "379": {
    "when": "财务部门需要一种集中的付款方式 + 安全团队需要一个集中机制来控制公司所有帐户中IAM的使用情况",
    "target": "A：要求所有新帐户和现有帐户启动适当的堆叠以强制执行最小权限模型；B：邀请现有帐户加入组织并使用组织建立新帐户",
    "avoid": "",
    "questionCues": [
      "财务部门需要一种集中的付款方式",
      "安全团队需要一个集中机制来控制公司所有帐户中IAM的使用情况"
    ],
    "answerCues": {
      "A": [
        "要求所有新帐户和现有帐户启动适当的堆叠以强制执行最小权限模型"
      ],
      "B": [
        "邀请现有帐户加入组织并使用组织建立新帐户"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "380": {
    "when": "解决方案架构师必须确保不会遗失任何数据 + 并且在发生故障时可以稍后处理数据",
    "target": "主队列和辅助队列",
    "avoid": "",
    "questionCues": [
      "解决方案架构师必须确保不会遗失任何数据",
      "并且在发生故障时可以稍后处理数据"
    ],
    "answerCues": {
      "B": [
        "主队列和辅助队列"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "381": {
    "when": "营运团队恢复了 Web 伺服器建立的日志并审查了Aurora 资料库集群效能指标",
    "target": "A：慢查询和错误日志发布到AmazonCloudWatch日志；E：AWS CloudTrail；F：效能基准测试并将串流发布到 AWS X-Ray",
    "avoid": "别选“在 EC2 实例上安装并设定 Amazon CloudWatch 日志代理”。",
    "questionCues": [
      "营运团队恢复了 Web 伺服器建立的日志并审查了Aurora 资料库集群效能指标"
    ],
    "answerCues": {
      "A": [
        "慢查询和错误日志发布到AmazonCloudWatch日志"
      ],
      "E": [
        "AWS CloudTrail"
      ],
      "F": [
        "效能基准测试并将串流发布到 AWS X-Ray"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "382": {
    "when": "哪个选项提供了可扩展的应用程式架构 + 以最少的开发工作来应对旺季",
    "target": "使用DynamoDB自动缩放",
    "avoid": "",
    "questionCues": [
      "哪个选项提供了可扩展的应用程式架构",
      "以最少的开发工作来应对旺季"
    ],
    "answerCues": {
      "C": [
        "使用DynamoDB自动缩放"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "383": {
    "when": "一家公司正在迁移到云端 + 以确保能够准确调整新的Amazon EC2实例的大小",
    "target": "使用AWS应用程式发现服务并将资料收集代理程式部署到资料中心的每个虚拟机器",
    "avoid": "",
    "questionCues": [
      "一家公司正在迁移到云端",
      "以确保能够准确调整新的Amazon EC2实例的大小"
    ],
    "answerCues": {
      "A": [
        "使用AWS应用程式发现服务并将资料收集代理程式部署到资料中心的每个虚拟机器"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "384": {
    "when": "NLB + 解决方案必须自动将客户路由到地理位置最接近他们的Region",
    "target": "创建AWS Global Accelerator标准加速器",
    "avoid": "",
    "questionCues": [
      "NLB",
      "解决方案必须自动将客户路由到地理位置最接近他们的Region"
    ],
    "answerCues": {
      "B": [
        "创建AWS Global Accelerator标准加速器"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "385": {
    "when": "解决方案架构师必须 + 该解决方案还必须允许开发人员能够管理用于其工作负载的执行个体",
    "target": "更新开发人员假定的 IAM 角色的 IAM 策略",
    "avoid": "",
    "questionCues": [
      "解决方案架构师必须",
      "该解决方案还必须允许开发人员能够管理用于其工作负载的执行个体"
    ],
    "answerCues": {
      "B": [
        "更新开发人员假定的 IAM 角色的 IAM 策略"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "386": {
    "when": "以便使用者无法提供未经批准的服务 + 使用中央帐户来管理基础设施服务的建立",
    "target": "B：与为公司创建的组织结构共享这些投资组合；D：复制TagOption；E：将 TagOption 应用于 AWS Service Catalog 产品或产品组合",
    "avoid": "",
    "questionCues": [
      "以便使用者无法提供未经批准的服务",
      "使用中央帐户来管理基础设施服务的建立"
    ],
    "answerCues": {
      "B": [
        "与为公司创建的组织结构共享这些投资组合"
      ],
      "D": [
        "复制TagOption"
      ],
      "E": [
        "将 TagOption 应用于 AWS Service Catalog 产品或产品组合"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "387": {
    "when": "以返回过去 24 小时的 AWS WAF 日志资料 + 此解决方案必须最大限度地减少营运开销",
    "target": "依日期和时间对资料进行分区",
    "avoid": "",
    "questionCues": [
      "以返回过去 24 小时的 AWS WAF 日志资料",
      "此解决方案必须最大限度地减少营运开销"
    ],
    "answerCues": {
      "D": [
        "依日期和时间对资料进行分区"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "388": {
    "when": "公司需要能够记录已被阻止的存取请求 + 此解决方案需要尽可能少的维护",
    "target": "配置规则以阻止任何并非源自指定国家/地区的请求",
    "avoid": "",
    "questionCues": [
      "公司需要能够记录已被阻止的存取请求",
      "此解决方案需要尽可能少的维护"
    ],
    "answerCues": {
      "B": [
        "配置规则以阻止任何并非源自指定国家/地区的请求"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "389": {
    "when": "根据合规要求 + 解决方案架构师必须设计一种解决方案",
    "target": "透过使用 VPC 对等互连",
    "avoid": "",
    "questionCues": [
      "根据合规要求",
      "解决方案架构师必须设计一种解决方案"
    ],
    "answerCues": {
      "C": [
        "透过使用 VPC 对等互连"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "390": {
    "when": "该应用程式需要 RPO 少于 5 分钟 + RTO 少于 10 分钟",
    "target": "在辅助 Region 中部署具有跨 Region 只读副本的 Amazon RDS 实例",
    "avoid": "",
    "questionCues": [
      "该应用程式需要 RPO 少于 5 分钟",
      "RTO 少于 10 分钟"
    ],
    "answerCues": {
      "B": [
        "在辅助 Region 中部署具有跨 Region 只读副本的 Amazon RDS 实例"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "391": {
    "when": "解决方案架构师使用管理帐户中的 IAM 使用者 Support1 建立新的成员帐户",
    "target": "从管理帐户中",
    "avoid": "",
    "questionCues": [
      "解决方案架构师使用管理帐户中的 IAM 使用者 Support1 建立新的成员帐户"
    ],
    "answerCues": {
      "B": [
        "从管理帐户中"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "392": {
    "when": "该公司需要提高支援额外使用的能力 + 同时最大限度地减少与解决方案相关的成本增加",
    "target": "修改 Lambda 函数以使用快取",
    "avoid": "",
    "questionCues": [
      "该公司需要提高支援额外使用的能力",
      "同时最大限度地减少与解决方案相关的成本增加"
    ],
    "answerCues": {
      "B": [
        "修改 Lambda 函数以使用快取"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "393": {
    "when": "公司还必须对传输中和静态的资料进行加密 + 以尽可能少的停机时间将资料迁移到AWS",
    "target": "配置 DMS 任务",
    "avoid": "",
    "questionCues": [
      "公司还必须对传输中和静态的资料进行加密",
      "以尽可能少的停机时间将资料迁移到AWS"
    ],
    "answerCues": {
      "B": [
        "配置 DMS 任务"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "394": {
    "when": "文件储存必须具有高可用性、具有弹性、必须与便携式作业系统介面 (POSIX) 相容",
    "target": "使用最大 I/O 效能模式的新 Amazon Elastic File System (Amazon EFS) 档案系统",
    "avoid": "",
    "questionCues": [
      "文件储存必须具有高可用性、具有弹性、必须与便携式作业系统介面 (POSIX) 相容"
    ],
    "answerCues": {
      "D": [
        "使用最大 I/O 效能模式的新 Amazon Elastic File System (Amazon EFS) 档案系统"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "395": {
    "when": "API 使用 AWS Lambda 函数进行计算 + 解决方案架构师必须设计一个灾难复原策略",
    "target": "标准 Aurora MySQL 全域资料库 + 在主动-被动配置中工作",
    "avoid": "别选“使用 AWS SAM 建立 Runbook 以将解决方案部署到目标 Region”。",
    "questionCues": [
      "API 使用 AWS Lambda 函数进行计算",
      "解决方案架构师必须设计一个灾难复原策略"
    ],
    "answerCues": {
      "D": [
        "标准 Aurora MySQL 全域资料库",
        "在主动-被动配置中工作"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "396": {
    "when": "解决方案架构师必须更新应用程序 + 以便应用程式具有高可用性",
    "target": "为 Redis 设定 Amazon ElastiCache",
    "avoid": "",
    "questionCues": [
      "解决方案架构师必须更新应用程序",
      "以便应用程式具有高可用性"
    ],
    "answerCues": {
      "B": [
        "为 Redis 设定 Amazon ElastiCache"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "397": {
    "when": "公司需要储存和处理将使用自订行动应用程式从行动装置上传的影像资料 + 每分钟上传数千次",
    "target": "A：将手机软体中的档案直接上传至Amazon S3；C：当伫列中有讯息时；D：当伫列中有可用讯息时",
    "avoid": "别选“将手机软体中的档案直接上传到Amazon S3”。",
    "questionCues": [
      "公司需要储存和处理将使用自订行动应用程式从行动装置上传的影像资料",
      "每分钟上传数千次"
    ],
    "answerCues": {
      "A": [
        "将手机软体中的档案直接上传至Amazon S3"
      ],
      "C": [
        "当伫列中有讯息时"
      ],
      "D": [
        "当伫列中有可用讯息时"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "398": {
    "when": "VPC + 开发人员需要存取OpenSearch服务来直接从本地开发机器分析和视觉化日志",
    "target": "配置Client VPN自助服务入口网站",
    "avoid": "",
    "questionCues": [
      "VPC",
      "开发人员需要存取OpenSearch服务来直接从本地开发机器分析和视觉化日志"
    ],
    "answerCues": {
      "A": [
        "配置Client VPN自助服务入口网站"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "399": {
    "when": "解决方案架构师必须创建满足安全要求的容器化架构 + 部署后需要采取哪些步骤才能满足要求",
    "target": "C：将安全群组套用到Amazon EC2实例；D：将安全性群组应用于任务",
    "avoid": "别选“并使用IAM任务角色来存取其他资源”。",
    "questionCues": [
      "解决方案架构师必须创建满足安全要求的容器化架构",
      "部署后需要采取哪些步骤才能满足要求"
    ],
    "answerCues": {
      "C": [
        "将安全群组套用到Amazon EC2实例"
      ],
      "D": [
        "将安全性群组应用于任务"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "400": {
    "when": "该公司创建了需要 Lambda 函数来存取 Amazon Neptune 资料库集群的新功能",
    "target": "A：并透过 Internet 网关路由流量；E：为DynamoDB建立VPC端点",
    "avoid": "别选“并透过 NAT 网关路由互联网流量”。",
    "questionCues": [
      "该公司创建了需要 Lambda 函数来存取 Amazon Neptune 资料库集群的新功能"
    ],
    "answerCues": {
      "A": [
        "并透过 Internet 网关路由流量"
      ],
      "E": [
        "为DynamoDB建立VPC端点"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "401": {
    "when": "该公司需要能够在灾难发生时使用 SMB 从资料中心或AWS 存取资料 + 资料副本很少被访问",
    "target": "配置S3档案闸道对元资料档案和影像档案使用Amazon S3标准不频繁存取（S3标准-IA）",
    "avoid": "",
    "questionCues": [
      "该公司需要能够在灾难发生时使用 SMB 从资料中心或AWS 存取资料",
      "资料副本很少被访问"
    ],
    "answerCues": {
      "D": [
        "配置S3档案闸道对元资料档案和影像档案使用Amazon S3标准不频繁存取（S3标准-IA）"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "402": {
    "when": "此解决方案必须提供多重身份验证 (MFA) + 并且必须复制现有桌面的使用者体验",
    "target": "为 MFA 设定 RADIUS 伺服器",
    "avoid": "",
    "questionCues": [
      "此解决方案必须提供多重身份验证 (MFA)",
      "并且必须复制现有桌面的使用者体验"
    ],
    "answerCues": {
      "C": [
        "为 MFA 设定 RADIUS 伺服器"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "403": {
    "when": "该公司希望有一个解决方案 + 并自动阻止这些号码将来转给客服人员",
    "target": "透过新增 ag 呼叫按钮来自订联络人控制面板 (CCP)",
    "avoid": "",
    "questionCues": [
      "该公司希望有一个解决方案",
      "并自动阻止这些号码将来转给客服人员"
    ],
    "answerCues": {
      "A": [
        "透过新增 ag 呼叫按钮来自订联络人控制面板 (CCP)"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "404": {
    "when": "公司需要即时传输和分析AWS云端中的资料 + 工厂营运团队必须立即收到通知",
    "target": "将资料串流传输到 Amazon Kinesis 资料流",
    "avoid": "",
    "questionCues": [
      "公司需要即时传输和分析AWS云端中的资料",
      "工厂营运团队必须立即收到通知"
    ],
    "answerCues": {
      "C": [
        "将资料串流传输到 Amazon Kinesis 资料流"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "405": {
    "when": "Amazon EKS + 因为工作负载会自动扩展工作负载使用的副本数量",
    "target": "配置工作负载以使用基于 Availability Zone 的拓扑扩展约束",
    "avoid": "",
    "questionCues": [
      "Amazon EKS",
      "因为工作负载会自动扩展工作负载使用的副本数量"
    ],
    "answerCues": {
      "D": [
        "配置工作负载以使用基于 Availability Zone 的拓扑扩展约束"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "406": {
    "when": "如果应用程式遇到故障 + 此解决方案必须最大限度地缩短从故障中恢复所需的时间",
    "target": "配置 Lambda 函数以更新 Route 53",
    "avoid": "",
    "questionCues": [
      "如果应用程式遇到故障",
      "此解决方案必须最大限度地缩短从故障中恢复所需的时间"
    ],
    "answerCues": {
      "C": [
        "配置 Lambda 函数以更新 Route 53"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "407": {
    "when": "该公司希望将 Amazon EC2 使用情况作为指标进行追踪 + 公司的架构团队必须收到每日警报",
    "target": "指定每天的时间段",
    "avoid": "",
    "questionCues": [
      "该公司希望将 Amazon EC2 使用情况作为指标进行追踪",
      "公司的架构团队必须收到每日警报"
    ],
    "answerCues": {
      "A": [
        "指定每天的时间段"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "408": {
    "when": "并且应该能够在行销活动期间进行扩展 + 以最小的延迟处理订单",
    "target": "Amazon SQS",
    "avoid": "",
    "questionCues": [
      "并且应该能够在行销活动期间进行扩展",
      "以最小的延迟处理订单"
    ],
    "answerCues": {
      "B": [
        "Amazon SQS"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "409": {
    "when": "该公司需要在 QA 环境和生产环境中启动 Lambda 函数 + 并且必须自动轮换密码",
    "target": "AWS Secrets Manager",
    "avoid": "",
    "questionCues": [
      "该公司需要在 QA 环境和生产环境中启动 Lambda 函数",
      "并且必须自动轮换密码"
    ],
    "answerCues": {
      "B": [
        "AWS Secrets Manager"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "410": {
    "when": "公司必须阻止 OU 帐户中的任何新的或现有的 Amazon EC2 执行个体取得公用 IP 位址",
    "target": "将 SCP 连接至 OU",
    "avoid": "",
    "questionCues": [
      "公司必须阻止 OU 帐户中的任何新的或现有的 Amazon EC2 执行个体取得公用 IP 位址"
    ],
    "answerCues": {
      "C": [
        "将 SCP 连接至 OU"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "411": {
    "when": "也无法将应用程式与身分提供者整合 + 所有使用者都必须通过多重身份验证 (MFA) 进行身份验证",
    "target": "Amazon Cognito",
    "avoid": "",
    "questionCues": [
      "也无法将应用程式与身分提供者整合",
      "所有使用者都必须通过多重身份验证 (MFA) 进行身份验证"
    ],
    "answerCues": {
      "A": [
        "Amazon Cognito"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "412": {
    "when": "解决方案架构师正准备将新的安全工具 + 解决方案架构师应该怎么做才能成功部署堆叠",
    "target": "在所有相关帐户中启用新的Regions",
    "avoid": "",
    "questionCues": [
      "解决方案架构师正准备将新的安全工具",
      "解决方案架构师应该怎么做才能成功部署堆叠"
    ],
    "answerCues": {
      "A": [
        "在所有相关帐户中启用新的Regions"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "413": {
    "when": "该应用程式在 AWS Lambda 函数上运行 + 并且资料库报告正在建立太多连接",
    "target": "为代理程式配置只读端点",
    "avoid": "",
    "questionCues": [
      "该应用程式在 AWS Lambda 函数上运行",
      "并且资料库报告正在建立太多连接"
    ],
    "answerCues": {
      "A": [
        "为代理程式配置只读端点"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "414": {
    "when": "感测器不得将资料传送至AWS",
    "target": "指定配置模板",
    "avoid": "",
    "questionCues": [
      "感测器不得将资料传送至AWS"
    ],
    "answerCues": {
      "C": [
        "指定配置模板"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "415": {
    "when": "工程师需要在部署期间收到有关不良建置和零停机的通知 + 工程师还需要",
    "target": "使用 GitHub webhooks + 使用AWSCodeBuild的Jenkins插件",
    "avoid": "别选“使用 AWS CodeDeploy 在就地、一次性部署配置中进行部署”。",
    "questionCues": [
      "工程师需要在部署期间收到有关不良建置和零停机的通知",
      "工程师还需要"
    ],
    "answerCues": {
      "B": [
        "使用 GitHub webhooks",
        "使用AWSCodeBuild的Jenkins插件"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "416": {
    "when": "Lambda + 该公司希望将 DynamoDB 成本分配给每个租户",
    "target": "设定 Lambda 函数",
    "avoid": "",
    "questionCues": [
      "Lambda",
      "该公司希望将 DynamoDB 成本分配给每个租户"
    ],
    "answerCues": {
      "B": [
        "设定 Lambda 函数"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "417": {
    "when": "公司必须将所有资料保留一年 + 该公司的安全团队担心攻击者可能透过泄漏的长期凭证存取AWS帐户",
    "target": "配置预设保留期为 1 年",
    "avoid": "",
    "questionCues": [
      "公司必须将所有资料保留一年",
      "该公司的安全团队担心攻击者可能透过泄漏的长期凭证存取AWS帐户"
    ],
    "answerCues": {
      "A": [
        "配置预设保留期为 1 年"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "418": {
    "when": "一家公司需要提高AWS上基于Web的应用程式的安全性 + 解决方案架构师必须设计一个解决方案",
    "target": "配置 ALB",
    "avoid": "",
    "questionCues": [
      "一家公司需要提高AWS上基于Web的应用程式的安全性",
      "解决方案架构师必须设计一个解决方案"
    ],
    "answerCues": {
      "A": [
        "配置 ALB"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "419": {
    "when": "AWS Control Tower + 安全团队需要集中查看所有帐户的安全状态",
    "target": "指定一个AWS帐户为Security Hub的委派管理员",
    "avoid": "",
    "questionCues": [
      "AWS Control Tower",
      "安全团队需要集中查看所有帐户的安全状态"
    ],
    "answerCues": {
      "D": [
        "指定一个AWS帐户为Security Hub的委派管理员"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "420": {
    "when": "并且必须在传输过程中进行加密 + 该公司需要一种不需要客制化开发的解决方案",
    "target": "部署AWSDataSync代理并配置任务将影像传输到S3储存桶",
    "avoid": "",
    "questionCues": [
      "并且必须在传输过程中进行加密",
      "该公司需要一种不需要客制化开发的解决方案"
    ],
    "answerCues": {
      "A": [
        "部署AWSDataSync代理并配置任务将影像传输到S3储存桶"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "421": {
    "when": "会呼叫DynamoDB + 解决方案架构师应该做出哪些改变来改善当前的回应时间",
    "target": "在桌面上实作DynamoDB自动缩放",
    "avoid": "",
    "questionCues": [
      "会呼叫DynamoDB",
      "解决方案架构师应该做出哪些改变来改善当前的回应时间"
    ],
    "answerCues": {
      "B": [
        "在桌面上实作DynamoDB自动缩放"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "422": {
    "when": "需要存取关键资料的档案储存 + 公司需要尽快将应用程式迁移到AWS",
    "target": "在所有三个 EC2 实例上安装档案储存",
    "avoid": "",
    "questionCues": [
      "需要存取关键资料的档案储存",
      "公司需要尽快将应用程式迁移到AWS"
    ],
    "answerCues": {
      "B": [
        "在所有三个 EC2 实例上安装档案储存"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "423": {
    "when": "解决方案架构师必须收集有关虚拟机器之间网路依赖性的资讯 + 此资讯必须采用图表形式",
    "target": "使用AWS应用程式发现服务",
    "avoid": "",
    "questionCues": [
      "解决方案架构师必须收集有关虚拟机器之间网路依赖性的资讯",
      "此资讯必须采用图表形式"
    ],
    "answerCues": {
      "A": [
        "使用AWS应用程式发现服务"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "424": {
    "when": "Multi-AZ + 公司需要提高资料库的可扩展效能和可用性",
    "target": "并新增Aurora副本",
    "avoid": "",
    "questionCues": [
      "Multi-AZ",
      "公司需要提高资料库的可扩展效能和可用性"
    ],
    "answerCues": {
      "D": [
        "并新增Aurora副本"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "425": {
    "when": "解决方案架构师必须实作一个 + 解决方案架构师必须将应用程式资料迁移到 AWS 到新位置",
    "target": "并与档案闸道关联",
    "avoid": "",
    "questionCues": [
      "解决方案架构师必须实作一个",
      "解决方案架构师必须将应用程式资料迁移到 AWS 到新位置"
    ],
    "answerCues": {
      "D": [
        "并与档案闸道关联"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "426": {
    "when": "公司需要在 AWS 上部署应用程序 + DNS 名称为 api.example.com",
    "target": "该函数包含用于验证条码的后端逻辑",
    "avoid": "",
    "questionCues": [
      "公司需要在 AWS 上部署应用程序",
      "DNS 名称为 api.example.com"
    ],
    "answerCues": {
      "D": [
        "该函数包含用于验证条码的后端逻辑"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "427": {
    "when": "ALB 在三个公有子网路中运行 + EC2 实例在三个私有子网路中运行",
    "target": "将 Web ACL 与 ALB 关联",
    "avoid": "",
    "questionCues": [
      "ALB 在三个公有子网路中运行",
      "EC2 实例在三个私有子网路中运行"
    ],
    "answerCues": {
      "A": [
        "将 Web ACL 与 ALB 关联"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "428": {
    "when": "包括公司总部所在的美国 + 解决方案架构师应该如何设计一个既满足需求又经济高效的高可用解决方案",
    "target": "使用Direct Connect网关存取其他AWSRegions中的资料",
    "avoid": "",
    "questionCues": [
      "包括公司总部所在的美国",
      "解决方案架构师应该如何设计一个既满足需求又经济高效的高可用解决方案"
    ],
    "answerCues": {
      "D": [
        "使用Direct Connect网关存取其他AWSRegions中的资料"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "429": {
    "when": "该公司希望在该公司的 on-premises 环境不可用时能够暂时在 AWS 上托管其应用程式",
    "target": "配置AWS弹性灾难复原",
    "avoid": "",
    "questionCues": [
      "该公司希望在该公司的 on-premises 环境不可用时能够暂时在 AWS 上托管其应用程式"
    ],
    "answerCues": {
      "B": [
        "配置AWS弹性灾难复原"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "430": {
    "when": "Lambda + 解决方案架构师注意到资料从新的Regions到达S3储存桶有明显的延迟",
    "target": "设定S3跨Region复制",
    "avoid": "",
    "questionCues": [
      "Lambda",
      "解决方案架构师注意到资料从新的Regions到达S3储存桶有明显的延迟"
    ],
    "answerCues": {
      "C": [
        "设定S3跨Region复制"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "431": {
    "when": "NLB + 最多 10 个业务单元 VPC 需要连接到共享 VPC",
    "target": "并启用要求端点接受的选项",
    "avoid": "",
    "questionCues": [
      "NLB",
      "最多 10 个业务单元 VPC 需要连接到共享 VPC"
    ],
    "answerCues": {
      "B": [
        "并启用要求端点接受的选项"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "432": {
    "when": "一家公司想要将其网站迁移到AWS + 解决方案架构师需要确定公司将用于 AWS 网站的架构",
    "target": "Amazon EKS",
    "avoid": "",
    "questionCues": [
      "一家公司想要将其网站迁移到AWS",
      "解决方案架构师需要确定公司将用于 AWS 网站的架构"
    ],
    "answerCues": {
      "B": [
        "Amazon EKS"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "433": {
    "when": "公司不需要保留比赛的任何数据 + 该公司必须设计一种新的架构来降低举办竞赛的成本",
    "target": "ElastiCache",
    "avoid": "别选“删除DynamoDB表”。",
    "questionCues": [
      "公司不需要保留比赛的任何数据",
      "该公司必须设计一种新的架构来降低举办竞赛的成本"
    ],
    "answerCues": {
      "C": [
        "ElastiCache"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "434": {
    "when": "实施了新的安全要求 + 公司必须扫描公司VPC中来自公司AWS实例的所有流量是否违反公司安全策略",
    "target": "停用对执行代理软体的 EC2 实例的来源/目标检查",
    "avoid": "",
    "questionCues": [
      "实施了新的安全要求",
      "公司必须扫描公司VPC中来自公司AWS实例的所有流量是否违反公司安全策略"
    ],
    "answerCues": {
      "A": [
        "停用对执行代理软体的 EC2 实例的来源/目标检查"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "435": {
    "when": "公司必须以自动方式管理所有基础设施 + 公司应该如何做才能以最少的努力满足这项新要求",
    "target": "透过汇入现有资源来建立新堆叠",
    "avoid": "",
    "questionCues": [
      "公司必须以自动方式管理所有基础设施",
      "公司应该如何做才能以最少的努力满足这项新要求"
    ],
    "answerCues": {
      "C": [
        "透过汇入现有资源来建立新堆叠"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "436": {
    "when": "并希望将其提供给公众下载 + 该公司希望有一种解决方案能够提供改进的下载效能和较低的传输成本",
    "target": "网站使用Amazon CloudFront",
    "avoid": "",
    "questionCues": [
      "并希望将其提供给公众下载",
      "该公司希望有一种解决方案能够提供改进的下载效能和较低的传输成本"
    ],
    "answerCues": {
      "C": [
        "网站使用Amazon CloudFront"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "437": {
    "when": "此资料库在具有两个私有子网路的 VPC 中运作 + 该网站在上个月遭受了几次中断",
    "target": "A：Auto Scaling；C：并使用 Aurora 副本；F：在网站 VPC 的不同Availability Zone 中建立一个额外的公有子网路",
    "avoid": "",
    "questionCues": [
      "此资料库在具有两个私有子网路的 VPC 中运作",
      "该网站在上个月遭受了几次中断"
    ],
    "answerCues": {
      "A": [
        "Auto Scaling"
      ],
      "C": [
        "并使用 Aurora 副本"
      ],
      "F": [
        "在网站 VPC 的不同Availability Zone 中建立一个额外的公有子网路"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "438": {
    "when": "ALB偶尔会回传 502 状态码（网关错误）错误 + 解决方案架构师需要向访客提供自订错误页面",
    "target": "A：配置S3储存桶来托管静态网页；E：透过配置 CloudFront 自订错误页面来新增自订错误回应",
    "avoid": "",
    "questionCues": [
      "ALB偶尔会回传 502 状态码（网关错误）错误",
      "解决方案架构师需要向访客提供自订错误页面"
    ],
    "answerCues": {
      "A": [
        "配置S3储存桶来托管静态网页"
      ],
      "E": [
        "透过配置 CloudFront 自订错误页面来新增自订错误回应"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "439": {
    "when": "在执行DNS切换到新资料库之前 + 公司必须尽量减少资料库服务中断",
    "target": "A：与新的 AWS 帐户共用快照；B：使用 AWS Database Migration Service（AWSDMS）在两个Aurora资料库集群之间迁移资料",
    "avoid": "",
    "questionCues": [
      "在执行DNS切换到新资料库之前",
      "公司必须尽量减少资料库服务中断"
    ],
    "answerCues": {
      "A": [
        "与新的 AWS 帐户共用快照"
      ],
      "B": [
        "使用 AWS Database Migration Service（AWSDMS）在两个Aurora资料库集群之间迁移资料"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "440": {
    "when": "新功能还需要从每个客户的VPC到公司管理层VPC的单向访问 + 管理VPC托管运算资源",
    "target": "A：建立中转网关；E：在公司管理层VPC和每个客户的VPC之间创建VPC对等连接",
    "avoid": "",
    "questionCues": [
      "新功能还需要从每个客户的VPC到公司管理层VPC的单向访问",
      "管理VPC托管运算资源"
    ],
    "answerCues": {
      "A": [
        "建立中转网关"
      ],
      "E": [
        "在公司管理层VPC和每个客户的VPC之间创建VPC对等连接"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "441": {
    "when": "该公司已要求其解决方案架构师开发符合以下要求的解决方案 + 授予完全管理员权限",
    "target": "B：邀请每个 LOB 的 AWS 帐户加入该组织；D：然后将该策略套用至 LOB 帐户",
    "avoid": "",
    "questionCues": [
      "该公司已要求其解决方案架构师开发符合以下要求的解决方案",
      "授予完全管理员权限"
    ],
    "answerCues": {
      "B": [
        "邀请每个 LOB 的 AWS 帐户加入该组织"
      ],
      "D": [
        "然后将该策略套用至 LOB 帐户"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "442": {
    "when": "Route 53 不会自动将使用者重新导向到另一个 Region",
    "target": "A：Web 伺服器停止的Region 的权重高于其他Region 的权重；E：尚未为与已停止的 Web 伺服器关联的一个或多个加权资源记录集设定 HTTP 运行状况检查",
    "avoid": "别选“辅助 Region 中的其中一台 Web 伺服器未通过其 HTTP 运行状况检查”。",
    "questionCues": [
      "Route 53 不会自动将使用者重新导向到另一个 Region"
    ],
    "answerCues": {
      "A": [
        "Web 伺服器停止的Region 的权重高于其他Region 的权重"
      ],
      "E": [
        "尚未为与已停止的 Web 伺服器关联的一个或多个加权资源记录集设定 HTTP 运行状况检查"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "443": {
    "when": "因为其余伺服器无法处理整个工作负载 + 该机构需要一种能够优化营运管理费用和成本的解决方案",
    "target": "并将其储存到 Amazon S3 储存桶中",
    "avoid": "",
    "questionCues": [
      "因为其余伺服器无法处理整个工作负载",
      "该机构需要一种能够优化营运管理费用和成本的解决方案"
    ],
    "answerCues": {
      "B": [
        "并将其储存到 Amazon S3 储存桶中"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "444": {
    "when": "该应用程式遇到了中断 + Auto Scaling 在中断期间不断更换实例",
    "target": "A：配置 Amazon RDS MySQL 的唯读副本；B：以评估完整的应用程式功能",
    "avoid": "",
    "questionCues": [
      "该应用程式遇到了中断",
      "Auto Scaling 在中断期间不断更换实例"
    ],
    "answerCues": {
      "A": [
        "配置 Amazon RDS MySQL 的唯读副本"
      ],
      "B": [
        "以评估完整的应用程式功能"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "445": {
    "when": "EKS + 该公司需要一个AWS托管解决方案来进行Kubernetes管理",
    "target": "将 Amazon EKS 安装在 on-premises 资料中心的公司硬体上的任何位置",
    "avoid": "别选“在 Outposts 伺服器上的任何位置安装 Amazon EKS”。",
    "questionCues": [
      "EKS",
      "该公司需要一个AWS托管解决方案来进行Kubernetes管理"
    ],
    "answerCues": {
      "B": [
        "将 Amazon EKS 安装在 on-premises 资料中心的公司硬体上的任何位置"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "446": {
    "when": "一家公司使用AWS Organizations来管理其开发环境 + 所有开发团队都需要",
    "target": "与所有开发帐户共用资料库集群",
    "avoid": "核对题目限制与完整选项。",
    "questionCues": [
      "一家公司使用AWS Organizations来管理其开发环境",
      "所有开发团队都需要"
    ],
    "answerCues": {
      "A": [
        "与所有开发帐户共用资料库集群"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "447": {
    "when": "此解决方案必须协助识别导致成本增加的资源 + 并且必须自动通知公司的营运团队",
    "target": "使用 AWS 成本异常侦测建立监控类型为 AWS 服务的成本监控器",
    "avoid": "",
    "questionCues": [
      "此解决方案必须协助识别导致成本增加的资源",
      "并且必须自动通知公司的营运团队"
    ],
    "answerCues": {
      "D": [
        "使用 AWS 成本异常侦测建立监控类型为 AWS 服务的成本监控器"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "448": {
    "when": "活动资料集的大小最大为 100 GB + 解决方案架构师必须设计一个 Multi-AZ 解决方案",
    "target": "为档案系统配置突发吞吐量模式",
    "avoid": "核对题目限制与完整选项。",
    "questionCues": [
      "活动资料集的大小最大为 100 GB",
      "解决方案架构师必须设计一个 Multi-AZ 解决方案"
    ],
    "answerCues": {
      "B": [
        "为档案系统配置突发吞吐量模式"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "449": {
    "when": "FTP + 公司需要在实验结束后尽快集中收集资料并将资料移至AWS云端中的物件储存",
    "target": "配置感测器将资料上传到EC2实例",
    "avoid": "",
    "questionCues": [
      "FTP",
      "公司需要在实验结束后尽快集中收集资料并将资料移至AWS云端中的物件储存"
    ],
    "answerCues": {
      "C": [
        "配置感测器将资料上传到EC2实例"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "450": {
    "when": "每个AWS帐户的管理员需要使用AmazonAthena查看其帐户的详细成本和利用率资料",
    "target": "修改S3桶策略",
    "avoid": "",
    "questionCues": [
      "每个AWS帐户的管理员需要使用AmazonAthena查看其帐户的详细成本和利用率资料"
    ],
    "answerCues": {
      "B": [
        "修改S3桶策略"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "451": {
    "when": "公司必须更新现有的网路连线解决方案 + 以确保该解决方案具有高可用性、容错性和安全性",
    "target": "新增静态 AWS Site-to-Site VPN 作为辅助路径",
    "avoid": "",
    "questionCues": [
      "公司必须更新现有的网路连线解决方案",
      "以确保该解决方案具有高可用性、容错性和安全性"
    ],
    "answerCues": {
      "D": [
        "新增静态 AWS Site-to-Site VPN 作为辅助路径"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "452": {
    "when": "其他用户必须能够从应用程式下载影片档案 + 该公司需要一种能够快速扩展的视讯储存解决方案",
    "target": "将S3金钥储存在对应的DynamoDB项中",
    "avoid": "",
    "questionCues": [
      "其他用户必须能够从应用程式下载影片档案",
      "该公司需要一种能够快速扩展的视讯储存解决方案"
    ],
    "answerCues": {
      "B": [
        "将S3金钥储存在对应的DynamoDB项中"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "453": {
    "when": "自动备份 + 解决方案架构师必须确保可以在 RPO 100 分钟内恢复已删除的文件",
    "target": "使用现有的备份计划 + 启用连续备份以进行时间点复原",
    "avoid": "别选“使用新的 IAM 角色建立备份”。",
    "questionCues": [
      "自动备份",
      "解决方案架构师必须确保可以在 RPO 100 分钟内恢复已删除的文件"
    ],
    "answerCues": {
      "C": [
        "使用现有的备份计划",
        "启用连续备份以进行时间点复原"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "454": {
    "when": "解决方案架构师必须为云端工程师团队提供一种安全的方法 + 云端工程师必须",
    "target": "AWS STS",
    "avoid": "",
    "questionCues": [
      "解决方案架构师必须为云端工程师团队提供一种安全的方法",
      "云端工程师必须"
    ],
    "answerCues": {
      "D": [
        "AWS STS"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "455": {
    "when": "迁移到AWS + 该公司需要一种能够最大限度地减少迁移时间且无需更改应用程式程式码的解决方案",
    "target": "使用Elastic Beanstalk来部署和管理应用程式",
    "avoid": "",
    "questionCues": [
      "迁移到AWS",
      "该公司需要一种能够最大限度地减少迁移时间且无需更改应用程式程式码的解决方案"
    ],
    "answerCues": {
      "B": [
        "使用Elastic Beanstalk来部署和管理应用程式"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "456": {
    "when": "公司需要对储存在 Amazon S3 储存桶中的资料执行大型批次作业 + 过程可以承受中断",
    "target": "指定 SPOT_CAPACITY_OPTIMIZED 分配策略",
    "avoid": "",
    "questionCues": [
      "公司需要对储存在 Amazon S3 储存桶中的资料执行大型批次作业",
      "过程可以承受中断"
    ],
    "answerCues": {
      "B": [
        "指定 SPOT_CAPACITY_OPTIMIZED 分配策略"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "457": {
    "when": "希望将影像存档在AWS上 + 该公司需要能够在收到请求后 1 周内检索存档资料",
    "target": "设定 DataSync 代理将批次档案从 NFS 本地伺服器",
    "avoid": "",
    "questionCues": [
      "希望将影像存档在AWS上",
      "该公司需要能够在收到请求后 1 周内检索存档资料"
    ],
    "answerCues": {
      "B": [
        "设定 DataSync 代理将批次档案从 NFS 本地伺服器"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "458": {
    "when": "CloudWatch + 公司需要找出每个客户每天、每周和每月有多少唯一用户",
    "target": "将每次成功登入储存为指标",
    "avoid": "",
    "questionCues": [
      "CloudWatch",
      "公司需要找出每个客户每天、每周和每月有多少唯一用户"
    ],
    "answerCues": {
      "A": [
        "将每次成功登入储存为指标"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "459": {
    "when": "该公司的安全团队实施了一项新要求 + 解决方案架构师必须用短期解决方案取代金钥",
    "target": "更新 GitHub 以承担管道的角色",
    "avoid": "",
    "questionCues": [
      "该公司的安全团队实施了一项新要求",
      "解决方案架构师必须用短期解决方案取代金钥"
    ],
    "answerCues": {
      "B": [
        "更新 GitHub 以承担管道的角色"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "460": {
    "when": "当 SQS 伫列中没有 URL 时 + 解决方案架构师需要重新设计架构以最佳化成本",
    "target": "B：将网路爬虫过程转换为AWS Lambda函数；E：将结果储存在Amazon S3中",
    "avoid": "",
    "questionCues": [
      "当 SQS 伫列中没有 URL 时",
      "解决方案架构师需要重新设计架构以最佳化成本"
    ],
    "answerCues": {
      "B": [
        "将网路爬虫过程转换为AWS Lambda函数"
      ],
      "E": [
        "将结果储存在Amazon S3中"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "461": {
    "when": "AWS 上的新解决方案必须能够从 2 个Amazon EC2 实例扩展到 30 个EC2 实例",
    "target": "使用 .ebextensions 将 EFS 档案系统挂载到 EC2 实例",
    "avoid": "",
    "questionCues": [
      "AWS 上的新解决方案必须能够从 2 个Amazon EC2 实例扩展到 30 个EC2 实例"
    ],
    "answerCues": {
      "A": [
        "使用 .ebextensions 将 EFS 档案系统挂载到 EC2 实例"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "462": {
    "when": "此解决方案必须最大限度地减少资料遗失 + 并且必须解决财务团队查询导致的效能问题",
    "target": "在单独的 Region 中建立 RDS 资料库实例的唯读副本",
    "avoid": "",
    "questionCues": [
      "此解决方案必须最大限度地减少资料遗失",
      "并且必须解决财务团队查询导致的效能问题"
    ],
    "answerCues": {
      "C": [
        "在单独的 Region 中建立 RDS 资料库实例的唯读副本"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "463": {
    "when": "连线无法穿越网路 + 该公司希望扩展到新的细分市场",
    "target": "建立接受 TCP 流量的 VPC 端点服务",
    "avoid": "",
    "questionCues": [
      "连线无法穿越网路",
      "该公司希望扩展到新的细分市场"
    ],
    "answerCues": {
      "A": [
        "建立接受 TCP 流量的 VPC 端点服务"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "464": {
    "when": "其中仅允许管理员角色使用IAM操作 + 解决方案架构师无法存取整个公司的所有AWS帐户",
    "target": "建立适用于所有 AWS 帐户的 SCP",
    "avoid": "",
    "questionCues": [
      "其中仅允许管理员角色使用IAM操作",
      "解决方案架构师无法存取整个公司的所有AWS帐户"
    ],
    "answerCues": {
      "C": [
        "建立适用于所有 AWS 帐户的 SCP"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "465": {
    "when": "VPC + 该公司还希望让开发团队能够根据需要重新建立团队与共享服务帐户的连结",
    "target": "AWS RAM",
    "avoid": "",
    "questionCues": [
      "VPC",
      "该公司还希望让开发团队能够根据需要重新建立团队与共享服务帐户的连结"
    ],
    "answerCues": {
      "B": [
        "AWS RAM"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "466": {
    "when": "迁移到AWS + 解决方案架构师需要为从资料中心迁移所有工作负载产生总拥有成本 (TCO) 报告",
    "target": "安装 Migration Evaluator 无代理程式收集器 + 配置迁移评估器以产生 TCO 报告",
    "avoid": "别选“配置 Migration Hub 以产生 TCO 报告”。",
    "questionCues": [
      "迁移到AWS",
      "解决方案架构师需要为从资料中心迁移所有工作负载产生总拥有成本 (TCO) 报告"
    ],
    "answerCues": {
      "B": [
        "安装 Migration Evaluator 无代理程式收集器",
        "配置迁移评估器以产生 TCO 报告"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "467": {
    "when": "公司要求从最近的Region取得游戏资源 + 如果最近的Region中的游戏资源不可用",
    "target": "建立指向两个 ALB 的 Route 53 延迟别名记录",
    "avoid": "",
    "questionCues": [
      "公司要求从最近的Region取得游戏资源",
      "如果最近的Region中的游戏资源不可用"
    ],
    "answerCues": {
      "D": [
        "建立指向两个 ALB 的 Route 53 延迟别名记录"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "468": {
    "when": "公司必须无限期保留日志档案 + 解决方案架构师必须提高日志分析的效能并减少VPC流日志",
    "target": "更新 VPC 流日志配置",
    "avoid": "",
    "questionCues": [
      "公司必须无限期保留日志档案",
      "解决方案架构师必须提高日志分析的效能并减少VPC流日志"
    ],
    "answerCues": {
      "C": [
        "更新 VPC 流日志配置"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "469": {
    "when": "公司必须使用 Direct Connect 连接透过中转 VIF 连接到 VPC 资源",
    "target": "B：透过中转 VIF 通告 on-premises 网路前缀；C：透过中转 VIF 将 VPC 前缀从 Direct Connect 闸道通告到 on-premises 网路",
    "avoid": "",
    "questionCues": [
      "公司必须使用 Direct Connect 连接透过中转 VIF 连接到 VPC 资源"
    ],
    "answerCues": {
      "B": [
        "透过中转 VIF 通告 on-premises 网路前缀"
      ],
      "C": [
        "透过中转 VIF 将 VPC 前缀从 Direct Connect 闸道通告到 on-premises 网路"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "470": {
    "when": "公司安全策略规定 + 对应用程式的存取必须仅限于公司分公司位置",
    "target": "使用分公司的公共位址清单建立 IP 存取控制组规则",
    "avoid": "",
    "questionCues": [
      "公司安全策略规定",
      "对应用程式的存取必须仅限于公司分公司位置"
    ],
    "answerCues": {
      "A": [
        "使用分公司的公共位址清单建立 IP 存取控制组规则"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "471": {
    "when": "每个防火墙设备都在手动配置的高可用Amazon EC2实例上运行 + 防火墙设备需要能够水平扩展",
    "target": "A：部署Gateway Load Balancer；C：建立使用实例目标类型的目标群组；F：在集中网路帐号中建立 VPC 端点",
    "avoid": "",
    "questionCues": [
      "每个防火墙设备都在手动配置的高可用Amazon EC2实例上运行",
      "防火墙设备需要能够水平扩展"
    ],
    "answerCues": {
      "A": [
        "部署Gateway Load Balancer"
      ],
      "C": [
        "建立使用实例目标类型的目标群组"
      ],
      "F": [
        "在集中网路帐号中建立 VPC 端点"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "472": {
    "when": "该资料库从AWS CloudFormation模板启动 + 此资料库配置为自动备份",
    "target": "A：以在故障转移事件期间提升唯读副本；D：将主要和次要端点设定为每个 Region 中的端点",
    "avoid": "",
    "questionCues": [
      "该资料库从AWS CloudFormation模板启动",
      "此资料库配置为自动备份"
    ],
    "answerCues": {
      "A": [
        "以在故障转移事件期间提升唯读副本"
      ],
      "D": [
        "将主要和次要端点设定为每个 Region 中的端点"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "473": {
    "when": "可呼叫 AWS Lambda 函数 + 解决方案架构师应该建议什么来优化应用程式的效能",
    "target": "修改 Lambda 函数以使用代理终端节点",
    "avoid": "",
    "questionCues": [
      "可呼叫 AWS Lambda 函数",
      "解决方案架构师应该建议什么来优化应用程式的效能"
    ],
    "answerCues": {
      "C": [
        "修改 Lambda 函数以使用代理终端节点"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "474": {
    "when": "一家零售公司希望改进其应用程式架构 + 该解决方案必须提供近乎即时的更新分析",
    "target": "Amazon EKS",
    "avoid": "",
    "questionCues": [
      "一家零售公司希望改进其应用程式架构",
      "该解决方案必须提供近乎即时的更新分析"
    ],
    "answerCues": {
      "C": [
        "Amazon EKS"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "475": {
    "when": "解决方案架构师必须设计一个在所有 AWS 帐户中启用 AWS CloudTrail 的解决方案",
    "target": "配置追踪以记录组织中所有 AWS 帐户的所有事件",
    "avoid": "",
    "questionCues": [
      "解决方案架构师必须设计一个在所有 AWS 帐户中启用 AWS CloudTrail 的解决方案"
    ],
    "answerCues": {
      "B": [
        "配置追踪以记录组织中所有 AWS 帐户的所有事件"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "476": {
    "when": "该公司的安全策略规定 + 必须使用多重身份验证 (MFA) 才能存取 VPN",
    "target": "为 AD 连接器启用 MFA",
    "avoid": "",
    "questionCues": [
      "该公司的安全策略规定",
      "必须使用多重身份验证 (MFA) 才能存取 VPN"
    ],
    "answerCues": {
      "B": [
        "为 AD 连接器启用 MFA"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "477": {
    "when": "客户无法透过该应用程式下订单 + 解决方案架构师必须制定迁移到AWS的计划来解决这些问题",
    "target": "A：重构前端；D：重构Java应用程序；E：AWS DMS",
    "avoid": "",
    "questionCues": [
      "客户无法透过该应用程式下订单",
      "解决方案架构师必须制定迁移到AWS的计划来解决这些问题"
    ],
    "answerCues": {
      "A": [
        "重构前端"
      ],
      "D": [
        "重构Java应用程序"
      ],
      "E": [
        "AWS DMS"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "478": {
    "when": "该公司的安全准则规定 + AWS 上的所有资源都必须持续扫描安全漏洞",
    "target": "启动AmazonInspector扫描EKS节点和ECR储存库",
    "avoid": "",
    "questionCues": [
      "该公司的安全准则规定",
      "AWS 上的所有资源都必须持续扫描安全漏洞"
    ],
    "answerCues": {
      "B": [
        "启动AmazonInspector扫描EKS节点和ECR储存库"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "479": {
    "when": "但候诊室的负载正在扰乱应用程式的可用性 + 这种中断对应用程式的门票销售交易产生了负面影响",
    "target": "CloudFront",
    "avoid": "",
    "questionCues": [
      "但候诊室的负载正在扰乱应用程式的可用性",
      "这种中断对应用程式的门票销售交易产生了负面影响"
    ],
    "answerCues": {
      "C": [
        "CloudFront"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "480": {
    "when": "CloudFormation模板可以根据需要销毁并重新 + EC2实例无法再承担父帐户中的角色",
    "target": "确保允许 sts:AssumeRole 操作的现有语句中的目标角色 ARN 正确",
    "avoid": "",
    "questionCues": [
      "CloudFormation模板可以根据需要销毁并重新",
      "EC2实例无法再承担父帐户中的角色"
    ],
    "answerCues": {
      "A": [
        "确保允许 sts:AssumeRole 操作的现有语句中的目标角色 ARN 正确"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "481": {
    "when": "需要手动重新启动 EC2 执行个体 + 解决方案架构师必须提高应用程式的可靠性",
    "target": "Amazon Aurora",
    "avoid": "",
    "questionCues": [
      "需要手动重新启动 EC2 执行个体",
      "解决方案架构师必须提高应用程式的可靠性"
    ],
    "answerCues": {
      "B": [
        "Amazon Aurora"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "482": {
    "when": "能够在公司收到资料后自动解密资料 + 解决方案架构师接下来该做什么来完成自动解密的解决方案",
    "target": "在标称步骤中配置PGP解密参数",
    "avoid": "",
    "questionCues": [
      "能够在公司收到资料后自动解密资料",
      "解决方案架构师接下来该做什么来完成自动解密的解决方案"
    ],
    "answerCues": {
      "C": [
        "在标称步骤中配置PGP解密参数"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "483": {
    "when": "排行榜需要微秒读取和个位数毫秒写入延迟 + 必须能够在不到一分钟的时间内接受写入",
    "target": "在Muit-AZ模式下为Redis集群建立AmazonMemoryDB 设定应用程式与主节点互动",
    "avoid": "",
    "questionCues": [
      "排行榜需要微秒读取和个位数毫秒写入延迟",
      "必须能够在不到一分钟的时间内接受写入"
    ],
    "answerCues": {
      "C": [
        "在Muit-AZ模式下为Redis集群建立AmazonMemoryDB 设定应用程式与主节点互动"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "484": {
    "when": "公司需要将其云端成本分配给不同的业务部门 + 该公司还需要可视化每个业务部门的云端成本",
    "target": "组织的管理帐户中 + 使用 Amazon QuickSight 进行视觉化",
    "avoid": "别选“将每个 S3 储存桶配置为其各自 AWS CUR 的目的地”。",
    "questionCues": [
      "公司需要将其云端成本分配给不同的业务部门",
      "该公司还需要可视化每个业务部门的云端成本"
    ],
    "answerCues": {
      "A": [
        "组织的管理帐户中",
        "使用 Amazon QuickSight 进行视觉化"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "485": {
    "when": "DynamoDB + 工程师注意到 Lambda 函数需要 1 到 2 分钟才能完成",
    "target": "A：DynamoDB；B：增加 Lambda 函数可用的记忆体",
    "avoid": "",
    "questionCues": [
      "DynamoDB",
      "工程师注意到 Lambda 函数需要 1 到 2 分钟才能完成"
    ],
    "answerCues": {
      "A": [
        "DynamoDB"
      ],
      "B": [
        "增加 Lambda 函数可用的记忆体"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "486": {
    "when": "部署在故障转移 Region 中 + 解决方案架构师应该做什么来配置解决方案的高可用性",
    "target": "将连接别名与故障转移 Region 中的目录关联",
    "avoid": "别选“建立 Route 53 多值应答路由策略”。",
    "questionCues": [
      "部署在故障转移 Region 中",
      "解决方案架构师应该做什么来配置解决方案的高可用性"
    ],
    "answerCues": {
      "D": [
        "将连接别名与故障转移 Region 中的目录关联"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "487": {
    "when": "该公司已发起迁移评估员评估请求 + 该公司能够在其 on-premises 环境中安装收集器软体",
    "target": "在每个虚拟机器上安装 AWS 应用程式发现代理",
    "avoid": "别选“从迁移中心下载快速洞察评估报告”。",
    "questionCues": [
      "该公司已发起迁移评估员评估请求",
      "该公司能够在其 on-premises 环境中安装收集器软体"
    ],
    "answerCues": {
      "D": [
        "在每个虚拟机器上安装 AWS 应用程式发现代理"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "488": {
    "when": "AWS Lambda + 该公司希望提高这些 API 的安全性",
    "target": "保护 API Gateway API + 监控对 API 存取的恶意尝试",
    "avoid": "别选“配置 Amazon Inspector 来分析这两个 API”。",
    "questionCues": [
      "AWS Lambda",
      "该公司希望提高这些 API 的安全性"
    ],
    "answerCues": {
      "C": [
        "保护 API Gateway API",
        "监控对 API 存取的恶意尝试"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "489": {
    "when": "该公司需要实施一种解决方案来最大限度地减少 Lambda 函数的延迟并支援流量突发",
    "target": "为资料库建立一个 RDS 代理端点 + 增加 Lambda 函数的预先配置并发性",
    "avoid": "别选“增加 Lambda 函数的保留并发度”。",
    "questionCues": [
      "该公司需要实施一种解决方案来最大限度地减少 Lambda 函数的延迟并支援流量突发"
    ],
    "answerCues": {
      "B": [
        "为资料库建立一个 RDS 代理端点",
        "增加 Lambda 函数的预先配置并发性"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "490": {
    "when": "且内部服务无法连接到介面端点 + 解决方案架构师应该采取哪一步来解决这个问题",
    "target": "启用 VPC 属性上的私有 DNS 选项",
    "avoid": "",
    "questionCues": [
      "且内部服务无法连接到介面端点",
      "解决方案架构师应该采取哪一步来解决这个问题"
    ],
    "answerCues": {
      "B": [
        "启用 VPC 属性上的私有 DNS 选项"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "491": {
    "when": "该应用程式的一部分包括多个需要尽快初始化的AWS Lambda功能",
    "target": "更新 Lambda 函数以新增预快照挂钩",
    "avoid": "",
    "questionCues": [
      "该应用程式的一部分包括多个需要尽快初始化的AWS Lambda功能"
    ],
    "answerCues": {
      "D": [
        "更新 Lambda 函数以新增预快照挂钩"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "492": {
    "when": "EC2 实例不会在 AWS Systems Manager 控制台中显示为托管实例",
    "target": "A：验证 Systems Manager 代理程式是否已安装在实例上并且正在执行；D：确认AWS Application Discovery Agent 已配置",
    "avoid": "别选“验证是否为实例指派了适当的 Systems Manager IAM 角色”。",
    "questionCues": [
      "EC2 实例不会在 AWS Systems Manager 控制台中显示为托管实例"
    ],
    "answerCues": {
      "A": [
        "验证 Systems Manager 代理程式是否已安装在实例上并且正在执行"
      ],
      "D": [
        "确认AWS Application Discovery Agent 已配置"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "493": {
    "when": "开发人员有以下要求 + 自动化单元测试和安全扫描",
    "target": "使用 AWS CodeBuild 运行单元测试和安全扫描",
    "avoid": "",
    "questionCues": [
      "开发人员有以下要求",
      "自动化单元测试和安全扫描"
    ],
    "answerCues": {
      "A": [
        "使用 AWS CodeBuild 运行单元测试和安全扫描"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "494": {
    "when": "公司必须能够 + 并且必须保留对频繁存取的资料的低延迟存取",
    "target": "在快取模式下配置 AWS Storage Gateway 磁碟区",
    "avoid": "",
    "questionCues": [
      "公司必须能够",
      "并且必须保留对频繁存取的资料的低延迟存取"
    ],
    "answerCues": {
      "C": [
        "在快取模式下配置 AWS Storage Gateway 磁碟区"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "495": {
    "when": "公司安全策略要求在将资料放入S3储存桶之前对资料进行加密 + 解决方案架构师必须设计一个解决方案",
    "target": "建立KMS多Region主键",
    "avoid": "",
    "questionCues": [
      "公司安全策略要求在将资料放入S3储存桶之前对资料进行加密",
      "解决方案架构师必须设计一个解决方案"
    ],
    "answerCues": {
      "A": [
        "建立KMS多Region主键"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "496": {
    "when": "EC2 实例被终止 + 解决方案架构师应该怎么做才能成功部署生产环境",
    "target": "增加Auto Scaling组健康检查宽限期",
    "avoid": "",
    "questionCues": [
      "EC2 实例被终止",
      "解决方案架构师应该怎么做才能成功部署生产环境"
    ],
    "answerCues": {
      "D": [
        "增加Auto Scaling组健康检查宽限期"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "497": {
    "when": "某公司需要将一些on-premises Oracle 资料库迁移到AWS + 出于业务合规性原因",
    "target": "使用PostgreSQL原生空间资料支援",
    "avoid": "",
    "questionCues": [
      "某公司需要将一些on-premises Oracle 资料库迁移到AWS",
      "出于业务合规性原因"
    ],
    "answerCues": {
      "D": [
        "使用PostgreSQL原生空间资料支援"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "498": {
    "when": "S3 物件将在 24 小时后删除 + 解决方案架构师需要在不进行重大架构变更的情况下解决此问题",
    "target": "建立一个 Lambda 函数以从 S3 储存桶中删除物件",
    "avoid": "",
    "questionCues": [
      "S3 物件将在 24 小时后删除",
      "解决方案架构师需要在不进行重大架构变更的情况下解决此问题"
    ],
    "answerCues": {
      "A": [
        "建立一个 Lambda 函数以从 S3 储存桶中删除物件"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "499": {
    "when": "大多数影片的大小都超过 100 MB + 解决方案架构师需要优化应用程式的S3成本",
    "target": "C：使不完整的分段上传在启动后 7 天到期；E：以在 180 天后将物件过渡到 S3 标准非频繁存取 (S3 标准 IA)",
    "avoid": "",
    "questionCues": [
      "大多数影片的大小都超过 100 MB",
      "解决方案架构师需要优化应用程式的S3成本"
    ],
    "answerCues": {
      "C": [
        "使不完整的分段上传在启动后 7 天到期"
      ],
      "E": [
        "以在 180 天后将物件过渡到 S3 标准非频繁存取 (S3 标准 IA)"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "500": {
    "when": "Lambda 函数通常会冷启动 + 公司需要保证流量高峰时的可扩展性和低延迟存取",
    "target": "将 AWS WAF 与 CloudFront 集成",
    "avoid": "",
    "questionCues": [
      "Lambda 函数通常会冷启动",
      "公司需要保证流量高峰时的可扩展性和低延迟存取"
    ],
    "answerCues": {
      "D": [
        "将 AWS WAF 与 CloudFront 集成"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "501": {
    "when": "启动实例的过程需要几分钟 + 该公司需要在自动扩展期间启动新实例时减少应用程式延迟",
    "target": "使用动态扩展策略 + 为 Auto Scaling 组启用暖池",
    "avoid": "别选“使用预测性扩展策略”。",
    "questionCues": [
      "启动实例的过程需要几分钟",
      "该公司需要在自动扩展期间启动新实例时减少应用程式延迟"
    ],
    "answerCues": {
      "D": [
        "使用动态扩展策略",
        "为 Auto Scaling 组启用暖池"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "502": {
    "when": "某公司需要将on-premises资料库群组迁移到Amazon RDS",
    "target": "B：使用AWS应用迁移服务分析来源资料库并识别需要迁移的预存程序；D：使用 AWS Database Migration Service（AWSDMS）将来源资料库迁移到Amazon RDS",
    "avoid": "别选“使用AWSDataSync将来源资料库中的资料迁移到Amazon RDS”。",
    "questionCues": [
      "某公司需要将on-premises资料库群组迁移到Amazon RDS"
    ],
    "answerCues": {
      "B": [
        "使用AWS应用迁移服务分析来源资料库并识别需要迁移的预存程序"
      ],
      "D": [
        "使用 AWS Database Migration Service（AWSDMS）将来源资料库迁移到Amazon RDS"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "503": {
    "when": "一家公司正在将其部落格平台迁移到AWS + 公司需要在不耽误内容更新的情况下迁移部落格平台",
    "target": "B：编写程式码以每周将 EBS 磁碟区与 NAS 伺服器同步；C：作为NAS伺服器",
    "avoid": "核对题目限制与完整选项。",
    "questionCues": [
      "一家公司正在将其部落格平台迁移到AWS",
      "公司需要在不耽误内容更新的情况下迁移部落格平台"
    ],
    "answerCues": {
      "B": [
        "编写程式码以每周将 EBS 磁碟区与 NAS 伺服器同步"
      ],
      "C": [
        "作为NAS伺服器"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "504": {
    "when": "一家公司计划将旧版 on-premises 应用程式迁移到 AWS + 该公司无权存取原始程式码",
    "target": "Amazon RDS",
    "avoid": "",
    "questionCues": [
      "一家公司计划将旧版 on-premises 应用程式迁移到 AWS",
      "该公司无权存取原始程式码"
    ],
    "answerCues": {
      "D": [
        "Amazon RDS"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "505": {
    "when": "这些作业需要 120-600 秒才能完成运行 + 该公司需要将平台迁移到AWS",
    "target": "A：Amazon CloudFront 发行版来提供报告；D：AWS IoT 规则；E：AmazonDocumentDB（相容于MongoDB）",
    "avoid": "",
    "questionCues": [
      "这些作业需要 120-600 秒才能完成运行",
      "该公司需要将平台迁移到AWS"
    ],
    "answerCues": {
      "A": [
        "Amazon CloudFront 发行版来提供报告"
      ],
      "D": [
        "AWS IoT 规则"
      ],
      "E": [
        "AmazonDocumentDB（相容于MongoDB）"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "506": {
    "when": "导致人们担心成本增加 + 该公司需要在不重新设计 Lambda 函数的情况下限制成本和使用量",
    "target": "在使用计划中定义限制和配额",
    "avoid": "",
    "questionCues": [
      "导致人们担心成本增加",
      "该公司需要在不重新设计 Lambda 函数的情况下限制成本和使用量"
    ],
    "answerCues": {
      "D": [
        "在使用计划中定义限制和配额"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "507": {
    "when": "定价档案会下载到每个 EC2 实例 + EC2 实例有时会使用过时的定价讯息",
    "target": "更新票务服务以指向挂载点和路径以存取 $3 对象",
    "avoid": "",
    "questionCues": [
      "定价档案会下载到每个 EC2 实例",
      "EC2 实例有时会使用过时的定价讯息"
    ],
    "answerCues": {
      "C": [
        "更新票务服务以指向挂载点和路径以存取 $3 对象"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "508": {
    "when": "经理希望允许测试人员启动自己的环境 + 但不希望向每个使用者授予广泛的权限",
    "target": "为具有现有角色的产品新增启动约束",
    "avoid": "",
    "questionCues": [
      "经理希望允许测试人员启动自己的环境",
      "但不希望向每个使用者授予广泛的权限"
    ],
    "answerCues": {
      "B": [
        "为具有现有角色的产品新增启动约束"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "509": {
    "when": "ALB + 解决方案架构师需要实施一个解决方案来实现这些目标并最大限度地减少管理开销",
    "target": "A：包括Region；E：透过启用 DynamoDB 流来更新现有 DynamoDB 表的配置；F：为新表启用DynamoDB流",
    "avoid": "别选“更新应用程式的Route 53托管区域记录以使用加权路由”。",
    "questionCues": [
      "ALB",
      "解决方案架构师需要实施一个解决方案来实现这些目标并最大限度地减少管理开销"
    ],
    "answerCues": {
      "A": [
        "包括Region"
      ],
      "E": [
        "透过启用 DynamoDB 流来更新现有 DynamoDB 表的配置"
      ],
      "F": [
        "为新表启用DynamoDB流"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "510": {
    "when": "一家公司希望为其资料科学家创建一个 Amazon S3 储存桶来储存与工作相关的文件",
    "target": "A：建立自订 IAM Identity Center 权限集；C：配置AWSCloudTrail记录S3资料事件并将日志投递到S3桶",
    "avoid": "",
    "questionCues": [
      "一家公司希望为其资料科学家创建一个 Amazon S3 储存桶来储存与工作相关的文件"
    ],
    "answerCues": {
      "A": [
        "建立自订 IAM Identity Center 权限集"
      ],
      "C": [
        "配置AWSCloudTrail记录S3资料事件并将日志投递到S3桶"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "511": {
    "when": "容器执行的资料处理可能需要长达 2 小时 + 该公司需要重构应用程式以消除运行容器的EC2实例",
    "target": "配置 S3 事件通知以在建立物件时呼叫 Lambda 函数",
    "avoid": "",
    "questionCues": [
      "容器执行的资料处理可能需要长达 2 小时",
      "该公司需要重构应用程式以消除运行容器的EC2实例"
    ],
    "answerCues": {
      "C": [
        "配置 S3 事件通知以在建立物件时呼叫 Lambda 函数"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "512": {
    "when": "公司必须能够根据影片中的资讯进行搜索 + 该公司希望将这些影片迁移到AWS",
    "target": "使用 MAM 解决方案从目前档案中提取影片并将其推送到档案闸道中",
    "avoid": "别选“建立一个 AWS Lambda 函数”。",
    "questionCues": [
      "公司必须能够根据影片中的资讯进行搜索",
      "该公司希望将这些影片迁移到AWS"
    ],
    "answerCues": {
      "A": [
        "使用 MAM 解决方案从目前档案中提取影片并将其推送到档案闸道中"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "513": {
    "when": "公司需要优化 AWS Organizations ​​组织中包含多个帐户的 AWS 环境的成本",
    "target": "在管理帐户中购买 3 年计算节省计划",
    "avoid": "",
    "questionCues": [
      "公司需要优化 AWS Organizations ​​组织中包含多个帐户的 AWS 环境的成本"
    ],
    "answerCues": {
      "C": [
        "在管理帐户中购买 3 年计算节省计划"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "514": {
    "when": "公司必须以最小延迟且不暴露于公共互联网的方式将on-premises资料路由到Amazon S3",
    "target": "C：建立一个 AWS Lambda 函数来追踪客户端到 Regions 的路由；E：使用 AWS PrivateLink 和 AWS Direct Connect 连接到多Region 接入点",
    "avoid": "别选“使用S3跨Region复制（CRR）将内容复制到不同的Regions”。",
    "questionCues": [
      "公司必须以最小延迟且不暴露于公共互联网的方式将on-premises资料路由到Amazon S3"
    ],
    "answerCues": {
      "C": [
        "建立一个 AWS Lambda 函数来追踪客户端到 Regions 的路由"
      ],
      "E": [
        "使用 AWS PrivateLink 和 AWS Direct Connect 连接到多Region 接入点"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "515": {
    "when": "需要尽快完成 + 该公司的合规团队要求每个虚拟机器的每次软体安装和修改都需要编辑和批准变更请求",
    "target": "AWS Snowcone",
    "avoid": "",
    "questionCues": [
      "需要尽快完成",
      "该公司的合规团队要求每个虚拟机器的每次软体安装和修改都需要编辑和批准变更请求"
    ],
    "answerCues": {
      "C": [
        "AWS Snowcone"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "516": {
    "when": "该公司需要储存 AWS 帐户活动并使用 SQL 从中央位置查询资料",
    "target": "为组织中的所有帐户启用资料储存",
    "avoid": "",
    "questionCues": [
      "该公司需要储存 AWS 帐户活动并使用 SQL 从中央位置查询资料"
    ],
    "answerCues": {
      "B": [
        "为组织中的所有帐户启用资料储存"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "517": {
    "when": "Lambda 函数处理数据 + 该公司希望以整合的方式实现Web应用程式的用户授权",
    "target": "更新 Web 应用程式以从身分提供者取得令牌",
    "avoid": "",
    "questionCues": [
      "Lambda 函数处理数据",
      "该公司希望以整合的方式实现Web应用程式的用户授权"
    ],
    "answerCues": {
      "A": [
        "更新 Web 应用程式以从身分提供者取得令牌"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "518": {
    "when": "本公司的安全策略要求对EBS卷进行加密 + 该公司需要实施自动化解决方案来加密 EBS 卷",
    "target": "配置识别未加密 EBS 卷的 AWS 配置托管规则 + 配置自动修复操作 + 始终加密新的 EBS 卷",
    "avoid": "别选“建立 SCP 以拒绝建立未加密的 EBS 磁碟区”。",
    "questionCues": [
      "本公司的安全策略要求对EBS卷进行加密",
      "该公司需要实施自动化解决方案来加密 EBS 卷"
    ],
    "answerCues": {
      "D": [
        "配置识别未加密 EBS 卷的 AWS 配置托管规则",
        "配置自动修复操作",
        "始终加密新的 EBS 卷"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "519": {
    "when": "工作负载已接近运行帐户中可用的最大数量的EC2实例 + 解决方案架构师应该做什么来满足这个要求",
    "target": "当数学表达式指标/SERVICE_QUOTA(metric)*100大于80时设定警报",
    "avoid": "",
    "questionCues": [
      "工作负载已接近运行帐户中可用的最大数量的EC2实例",
      "解决方案架构师应该做什么来满足这个要求"
    ],
    "answerCues": {
      "B": [
        "当数学表达式指标/SERVICE_QUOTA(metric)*100大于80时设定警报"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "520": {
    "when": "Lambda 函数的子集必须接收自动程式码扫描 + 而不是针对所有 Lambda 函数",
    "target": "A：启动自动 CVE 扫描；B：在AmazonInspector中启动Lambda标准扫描和Lambda扫码；E：在标签中",
    "avoid": "",
    "questionCues": [
      "Lambda 函数的子集必须接收自动程式码扫描",
      "而不是针对所有 Lambda 函数"
    ],
    "answerCues": {
      "A": [
        "启动自动 CVE 扫描"
      ],
      "B": [
        "在AmazonInspector中启动Lambda标准扫描和Lambda扫码"
      ],
      "E": [
        "在标签中"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "521": {
    "when": "该公司希望 + 应用程式帐户中的EC2实例需要存取储存应用程式资料的Amazon S3",
    "target": "建立VPC对等连接以存取核心帐户中的补丁来源储存库EC2实例",
    "avoid": "",
    "questionCues": [
      "该公司希望",
      "应用程式帐户中的EC2实例需要存取储存应用程式资料的Amazon S3"
    ],
    "answerCues": {
      "C": [
        "建立VPC对等连接以存取核心帐户中的补丁来源储存库EC2实例"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "522": {
    "when": "应用程式必须能够存取 eu-west-1 Region 中的一个 VPC 中的资源",
    "target": "为 us-east-2 中的每个 VPC 到 eu-west-1 中的 VPC 建立一个 VPC 对等连接",
    "avoid": "",
    "questionCues": [
      "应用程式必须能够存取 eu-west-1 Region 中的一个 VPC 中的资源"
    ],
    "answerCues": {
      "D": [
        "为 us-east-2 中的每个 VPC 到 eu-west-1 中的 VPC 建立一个 VPC 对等连接"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "523": {
    "when": "该公司需要 + 该公司还需要能够根据收件人、主题和发送时间进行搜寻",
    "target": "A：建立一个 Amazon SES 配置集；C：以了解收件者、主题和传送时间",
    "avoid": "",
    "questionCues": [
      "该公司需要",
      "该公司还需要能够根据收件人、主题和发送时间进行搜寻"
    ],
    "answerCues": {
      "A": [
        "建立一个 Amazon SES 配置集"
      ],
      "C": [
        "以了解收件者、主题和传送时间"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "524": {
    "when": "迁移到 AWS 并 + 该公司希望跨 AWS 帐户监控 Amazon EC2 实例的成本效益",
    "target": "配置 Amazon CloudWatch 仪表板",
    "avoid": "",
    "questionCues": [
      "迁移到 AWS 并",
      "该公司希望跨 AWS 帐户监控 Amazon EC2 实例的成本效益"
    ],
    "answerCues": {
      "A": [
        "配置 Amazon CloudWatch 仪表板"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "525": {
    "when": "通常会持续几个小时 + 公司需要一种新的架构来解决应用程式响应缓慢的问题",
    "target": "将最小容量设定为 4",
    "avoid": "",
    "questionCues": [
      "通常会持续几个小时",
      "公司需要一种新的架构来解决应用程式响应缓慢的问题"
    ],
    "answerCues": {
      "D": [
        "将最小容量设定为 4"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "526": {
    "when": "新的感测器资料必须在应用程式收集资料后 30 分钟内Amazon S3 可用",
    "target": "配置AWS IoT 规则操作以呼叫 Lambda 函数",
    "avoid": "",
    "questionCues": [
      "新的感测器资料必须在应用程式收集资料后 30 分钟内Amazon S3 可用"
    ],
    "answerCues": {
      "A": [
        "配置AWS IoT 规则操作以呼叫 Lambda 函数"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "527": {
    "when": "资料储存在Amazon S3资料湖中 + 资料科学家需要从 EC2 实例存取资料湖",
    "target": "B：在资料科学家的资料湖 AWS 帐户中建立一个 S3 存取点；C：更新 EC2 实例角色",
    "avoid": "别选“将 S3 流量路由至 S3 接入点”。",
    "questionCues": [
      "资料储存在Amazon S3资料湖中",
      "资料科学家需要从 EC2 实例存取资料湖"
    ],
    "answerCues": {
      "B": [
        "在资料科学家的资料湖 AWS 帐户中建立一个 S3 存取点"
      ],
      "C": [
        "更新 EC2 实例角色"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "528": {
    "when": "迁移到AWS + 解决方案架构师需要在迁移之前估算此工作负载的总拥有成本 (TCO)",
    "target": "配置一个场景",
    "avoid": "",
    "questionCues": [
      "迁移到AWS",
      "解决方案架构师需要在迁移之前估算此工作负载的总拥有成本 (TCO)"
    ],
    "answerCues": {
      "A": [
        "配置一个场景"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "529": {
    "when": "Auto Scaling 组使用预测扩展策略 + 公司需要在不降低平台可用性的情况下优化平台成本",
    "target": "A：为 S3 储存桶建立网关 VPC 端点；C：在计划的扩展策略的时间段内为适用的实例类型建立按需容量预留",
    "avoid": "",
    "questionCues": [
      "Auto Scaling 组使用预测扩展策略",
      "公司需要在不降低平台可用性的情况下优化平台成本"
    ],
    "answerCues": {
      "A": [
        "为 S3 储存桶建立网关 VPC 端点"
      ],
      "C": [
        "在计划的扩展策略的时间段内为适用的实例类型建立按需容量预留"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  }
};
