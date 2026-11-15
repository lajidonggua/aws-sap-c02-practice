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
    "when": "OU + 新业务部门的管理员发现无法更新现有 AWS Config 规则来满足公司政策",
    "target": "完成 AWS Config 调整后",
    "avoid": "",
    "questionCues": [
      "OU",
      "新业务部门的管理员发现无法更新现有 AWS Config 规则来满足公司政策"
    ],
    "answerCues": {
      "D": [
        "完成 AWS Config 调整后"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "4": {
    "when": "因此公司正在将应用程序和数据库迁移到AWS + 同时允许应用程序层和数据库层扩展",
    "target": "为Aurora Replicas启用Aurora Auto Scaling + 粘性会话 + Application Load Balancer",
    "avoid": "别选“为Aurora writers启用Aurora Auto Scaling”。",
    "questionCues": [
      "因此公司正在将应用程序和数据库迁移到AWS",
      "同时允许应用程序层和数据库层扩展"
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
    "when": "该公司希望将服务迁移到AWS + 该公司已将应用程序迁移为一组AWS Lambda函数",
    "target": "创建一个CloudFront函数",
    "avoid": "",
    "questionCues": [
      "该公司希望将服务迁移到AWS",
      "该公司已将应用程序迁移为一组AWS Lambda函数"
    ],
    "answerCues": {
      "A": [
        "创建一个CloudFront函数"
      ]
    },
    "disputed": false,
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
    "disputed": true,
    "legacyMismatch": false
  },
  "7": {
    "when": "生产和测试 + 解决方案架构师需要使用最小化操作复杂性的无服务器架构来设计更新的应用程序",
    "target": "配置两个独立的Application Load Balancers将流量导向ECS集群",
    "avoid": "",
    "questionCues": [
      "生产和测试",
      "解决方案架构师需要使用最小化操作复杂性的无服务器架构来设计更新的应用程序"
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
    "when": "该公司需要通过使应用程序能够自动故障转移到备份区域来将其RTO降低到15分钟以下",
    "target": "配置Route 53",
    "avoid": "",
    "questionCues": [
      "该公司需要通过使应用程序能够自动故障转移到备份区域来将其RTO降低到15分钟以下"
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
    "when": "解决方案架构师需要改进应用程序的架构 + 以便基础架构能够以最少的停机时间自动从故障中恢复",
    "target": "A：该组的最小容量为两个实例；D：创建一个跨两个可用区域的Multi-AZ部署；F：在集群上启用Multi-AZ",
    "avoid": "",
    "questionCues": [
      "解决方案架构师需要改进应用程序的架构",
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
    "when": "解决方案架构师需要向访问者显示自定义错误页 + 哪两项操作组合能以最少的运维工作满足要求",
    "target": "A：配置S3存储桶以托管静态网页；E：通过配置CloudFront自定义错误页面来添加自定义错误响应",
    "avoid": "",
    "questionCues": [
      "解决方案架构师需要向访问者显示自定义错误页",
      "哪两项操作组合能以最少的运维工作满足要求"
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
    "when": "团队必须使用这个账户管理网络 + 各成员账户不能自行管理网络",
    "target": "B：从AWS Organizations管理账户启用资源共享；D：创建资源共享",
    "avoid": "",
    "questionCues": [
      "团队必须使用这个账户管理网络",
      "各成员账户不能自行管理网络"
    ],
    "answerCues": {
      "B": [
        "从AWS Organizations管理账户启用资源共享"
      ],
      "D": [
        "创建资源共享"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "12": {
    "when": "内部安全政策要求使用不经过互联网的私有连接 + 所有权限都必须遵循最小权限原则",
    "target": "将安全性群组与端点关联",
    "avoid": "",
    "questionCues": [
      "内部安全政策要求使用不经过互联网的私有连接",
      "所有权限都必须遵循最小权限原则"
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
    "when": "一家公司需要为服务器建立补丁管理流程 + 管理层要求用一份统一报告展示所有服务器和实例的补丁状态",
    "target": "使用 Systems Manager 产生补丁合规性报告",
    "avoid": "",
    "questionCues": [
      "一家公司需要为服务器建立补丁管理流程",
      "管理层要求用一份统一报告展示所有服务器和实例的补丁状态"
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
    "when": "此解决方案也必须通过同一对 Direct Connect 连接提供与其他 Regions 的连接",
    "target": "配置Direct Connect网关",
    "avoid": "",
    "questionCues": [
      "此解决方案也必须通过同一对 Direct Connect 连接提供与其他 Regions 的连接"
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
    "when": "该公司希望重新建构应用程序 + 以尽可能使用AWS托管服务来减少运维开销",
    "target": "将上传的影片存储在Amazon S3中",
    "avoid": "",
    "questionCues": [
      "该公司希望重新建构应用程序",
      "以尽可能使用AWS托管服务来减少运维开销"
    ],
    "answerCues": {
      "C": [
        "将上传的影片存储在Amazon S3中"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "19": {
    "when": "AWS CLI + 该公司希望减少部署 Lambda 函数提供的新版本应用程序逻辑的时间",
    "target": "逐步将流量切换到新版本",
    "avoid": "",
    "questionCues": [
      "AWS CLI",
      "该公司希望减少部署 Lambda 函数提供的新版本应用程序逻辑的时间"
    ],
    "answerCues": {
      "B": [
        "逐步将流量切换到新版本"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "20": {
    "when": "员工将通过连接到 VPC 的客户端 VPN 服务连接来访问系统 + 请求的数量将会很少",
    "target": "配置实例安全组",
    "avoid": "别选“使用冷 HDD (sc1) 卷类型”。",
    "questionCues": [
      "员工将通过连接到 VPC 的客户端 VPN 服务连接来访问系统",
      "请求的数量将会很少"
    ],
    "answerCues": {
      "B": [
        "配置实例安全组"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "21": {
    "when": "本公司的安全策略要求根据用户群组和角色对账户进行有条件的访问 + 用户身份必须在单一位置进行管理",
    "target": "通过基于属性的访问控制（ABAC）授予 AWS 账户访问权限",
    "avoid": "",
    "questionCues": [
      "本公司的安全策略要求根据用户群组和角色对账户进行有条件的访问",
      "用户身份必须在单一位置进行管理"
    ],
    "answerCues": {
      "A": [
        "通过基于属性的访问控制（ABAC）授予 AWS 账户访问权限"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "22": {
    "when": "大量 PUT 请求来自同一个客户端",
    "target": "通过API Gateway级别的使用计划实施API限制",
    "avoid": "",
    "questionCues": [
      "大量 PUT 请求来自同一个客户端"
    ],
    "answerCues": {
      "B": [
        "通过API Gateway级别的使用计划实施API限制"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "23": {
    "when": "大约需要 72 小时才能完成 + 文件系统必须在 72 小时运行期间提供对所需数据的高性能访问",
    "target": "并通过延迟加载方式使用 S3 中的数据",
    "avoid": "",
    "questionCues": [
      "大约需要 72 小时才能完成",
      "文件系统必须在 72 小时运行期间提供对所需数据的高性能访问"
    ],
    "answerCues": {
      "A": [
        "并通过延迟加载方式使用 S3 中的数据"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "24": {
    "when": "并且可以使用可公开访问的 DNS 名称 my.service.com 进行访问",
    "target": "为服务创建 Amazon EC2 实例",
    "avoid": "",
    "questionCues": [
      "并且可以使用可公开访问的 DNS 名称 my.service.com 进行访问"
    ],
    "answerCues": {
      "C": [
        "为服务创建 Amazon EC2 实例"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "25": {
    "when": "计划作业需要 20 分钟至 2 小时完成 + 解决方案架构师需要将系统迁到 Amazon EC2",
    "target": "每个 Availability Zone 中运行一个实例作为 Spot 实例",
    "avoid": "",
    "questionCues": [
      "计划作业需要 20 分钟至 2 小时完成",
      "解决方案架构师需要将系统迁到 Amazon EC2"
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
    "when": "下一版应用需要以下安全改进 + 能以最少的运维工作满足要求",
    "target": "指定 Secrets Manager RotationSchedule 资源以每 90 天轮换一次数据库密码",
    "avoid": "",
    "questionCues": [
      "下一版应用需要以下安全改进",
      "能以最少的运维工作满足要求"
    ],
    "answerCues": {
      "A": [
        "指定 Secrets Manager RotationSchedule 资源以每 90 天轮换一次数据库密码"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "27": {
    "when": "方案必须能随需求自动扩展 + 哪些方案满足要求",
    "target": "A：Amazon API Gateway REST API；C：这些函数从 DynamoDB 表传回数据",
    "avoid": "",
    "questionCues": [
      "方案必须能随需求自动扩展",
      "哪些方案满足要求"
    ],
    "answerCues": {
      "A": [
        "Amazon API Gateway REST API"
      ],
      "C": [
        "这些函数从 DynamoDB 表传回数据"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "28": {
    "when": "JSON 文件中定义 + 接受 HTTP 和 HTTPS 请求的重定向服务",
    "target": "B：HTTP 和 HTTPS 侦听器；C：建立一个 AWS Lambda 函数；F：AWS Certificate Manager（ACM） + 主题备用名称",
    "avoid": "",
    "questionCues": [
      "JSON 文件中定义",
      "接受 HTTP 和 HTTPS 请求的重定向服务"
    ],
    "answerCues": {
      "B": [
        "HTTP 和 HTTPS 侦听器"
      ],
      "C": [
        "建立一个 AWS Lambda 函数"
      ],
      "F": [
        "AWS Certificate Manager（ACM）",
        "主题备用名称"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "29": {
    "when": "公司希望计算这些 EC2 上安全工具的成本 + 以将费用分摊给合规团队的 AWS 账户",
    "target": "在组织的管理账户中",
    "avoid": "",
    "questionCues": [
      "公司希望计算这些 EC2 上安全工具的成本",
      "以将费用分摊给合规团队的 AWS 账户"
    ],
    "answerCues": {
      "A": [
        "在组织的管理账户中"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "30": {
    "when": "公司希望 + 公司都希望自动创建一个新 VPC 及其 Transit Gateway 连接",
    "target": "A：使用 AWS Resource Access Manager 与成员账户共用中转网关；C：使用中转网关 ID 将附件与管理账户中的中转网关关联",
    "avoid": "",
    "questionCues": [
      "公司希望",
      "公司都希望自动创建一个新 VPC 及其 Transit Gateway 连接"
    ],
    "answerCues": {
      "A": [
        "使用 AWS Resource Access Manager 与成员账户共用中转网关"
      ],
      "C": [
        "使用中转网关 ID 将附件与管理账户中的中转网关关联"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "31": {
    "when": "OU + Private Marketplace 管理权限必须仅",
    "target": "在组织根上创建一项 SCP",
    "avoid": "",
    "questionCues": [
      "OU",
      "Private Marketplace 管理权限必须仅"
    ],
    "answerCues": {
      "C": [
        "在组织根上创建一项 SCP"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "32": {
    "when": "OU + 解决方案架构师应该采取什么措施来消除开发人员使用本政策范围以外的服务的能力",
    "target": "从开发人员账户所属的 OU 中移除 FullAWSAccess SCP",
    "avoid": "别选“修改 FullAWSAccess SCP 以明确拒绝所有服务”。",
    "questionCues": [
      "OU",
      "解决方案架构师应该采取什么措施来消除开发人员使用本政策范围以外的服务的能力"
    ],
    "answerCues": {
      "B": [
        "从开发人员账户所属的 OU 中移除 FullAWSAccess SCP"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "33": {
    "when": "无法处理新的流量 + 解决方案架构师需要使应用能够应对新增且不断变化的负载",
    "target": "将 API 分成单独的 AWS Lambda 函数",
    "avoid": "",
    "questionCues": [
      "无法处理新的流量",
      "解决方案架构师需要使应用能够应对新增且不断变化的负载"
    ],
    "answerCues": {
      "A": [
        "将 API 分成单独的 AWS Lambda 函数"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "34": {
    "when": "解决方案架构师必须设计一个解决方案 + 以便每个OU 都可以查看其AWS 账户的使用成本明细",
    "target": "从 AWS Organizations 管理账户建立 AWS 成本和使用情况报告 (CUR)",
    "avoid": "",
    "questionCues": [
      "解决方案架构师必须设计一个解决方案",
      "以便每个OU 都可以查看其AWS 账户的使用成本明细"
    ],
    "answerCues": {
      "B": [
        "从 AWS Organizations 管理账户建立 AWS 成本和使用情况报告 (CUR)"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "35": {
    "when": "需要让这些数据能从云中的文件系统访问 + 迁移策略",
    "target": "Amazon FSx",
    "avoid": "",
    "questionCues": [
      "需要让这些数据能从云中的文件系统访问",
      "迁移策略"
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
    "when": "公司需要具备跨多个 AWS 区域的故障恢复能力 + 且已在第二个区域创建 S3 桶",
    "target": "将对象复制到第二个区域的 S3 桶",
    "avoid": "",
    "questionCues": [
      "公司需要具备跨多个 AWS 区域的故障恢复能力",
      "且已在第二个区域创建 S3 桶"
    ],
    "answerCues": {
      "C": [
        "将对象复制到第二个区域的 S3 桶"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "37": {
    "when": "公司管理层已下令将应用程序转移到AWS + 解决方案架构师必须设计可扩展且高度可用的解决方案",
    "target": "堆栈应启动具有保留删除策略的 Amazon Aurora MySQL 数据库集群的 Multi-AZ 部署",
    "avoid": "别选“将 Amazon Route 53 与地理位置邻近路由策略结合使用”。",
    "questionCues": [
      "公司管理层已下令将应用程序转移到AWS",
      "解决方案架构师必须设计可扩展且高度可用的解决方案"
    ],
    "answerCues": {
      "B": [
        "堆栈应启动具有保留删除策略的 Amazon Aurora MySQL 数据库集群的 Multi-AZ 部署"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "38": {
    "when": "一家公司使用 AWS Organizations 管理多个 AWS 账户 + 出于安全要求",
    "target": "在组织管理账户中建立堆栈集",
    "avoid": "",
    "questionCues": [
      "一家公司使用 AWS Organizations 管理多个 AWS 账户",
      "出于安全要求"
    ],
    "answerCues": {
      "C": [
        "在组织管理账户中建立堆栈集"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "39": {
    "when": "配置、系统性能、 + 以便公司能够以最具成本效益的方式在 AWS 上运行其工作负载",
    "target": "A：AWS Application Discovery Agent；D：AWS Migration Hub + 将服务器分组到应用程序中进行迁移；E：产生建议的实例类型和相关成本",
    "avoid": "",
    "questionCues": [
      "配置、系统性能、",
      "以便公司能够以最具成本效益的方式在 AWS 上运行其工作负载"
    ],
    "answerCues": {
      "A": [
        "AWS Application Discovery Agent"
      ],
      "D": [
        "AWS Migration Hub",
        "将服务器分组到应用程序中进行迁移"
      ],
      "E": [
        "产生建议的实例类型和相关成本"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "40": {
    "when": "VPC 跨两个可用区 + 解决方案架构师必须在不降低安全性、也不增加持续运维工作时间的前提下",
    "target": "为端点附加端点策略",
    "avoid": "",
    "questionCues": [
      "VPC 跨两个可用区",
      "解决方案架构师必须在不降低安全性、也不增加持续运维工作时间的前提下"
    ],
    "answerCues": {
      "C": [
        "为端点附加端点策略"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "41": {
    "when": "持续 4 小时 + 解决方案架构师需要实施一个解决方案来最大限度地降低表的成本",
    "target": "购买与平均负载匹配的预留 RCU 和 WCU 容量",
    "avoid": "",
    "questionCues": [
      "持续 4 小时",
      "解决方案架构师需要实施一个解决方案来最大限度地降低表的成本"
    ],
    "answerCues": {
      "A": [
        "购买与平均负载匹配的预留 RCU 和 WCU 容量"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "42": {
    "when": "每个媒体文件可能需要长达 1 小时来处理 + 最具成本效益的迁移建议是什么",
    "target": "根据 SQS 队列长度缩放 EC2 实例",
    "avoid": "",
    "questionCues": [
      "每个媒体文件可能需要长达 1 小时来处理",
      "最具成本效益的迁移建议是什么"
    ],
    "answerCues": {
      "D": [
        "根据 SQS 队列长度缩放 EC2 实例"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "43": {
    "when": "公司必须保留所有输入数据的副本 + 并要求解决方案架构师推荐新的解决方案",
    "target": "在 1 个月后将输入数据转入 S3 Glacier Deep Archive",
    "avoid": "",
    "questionCues": [
      "公司必须保留所有输入数据的副本",
      "并要求解决方案架构师推荐新的解决方案"
    ],
    "answerCues": {
      "B": [
        "在 1 个月后将输入数据转入 S3 Glacier Deep Archive"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "44": {
    "when": "安全团队已订阅该主题 + 安全团队需要禁止创建来源为 0.0.0.0/0 的安全组入站规则",
    "target": "修改EventBridge规则",
    "avoid": "核对题目限制与完整选项。",
    "questionCues": [
      "安全团队已订阅该主题",
      "安全团队需要禁止创建来源为 0.0.0.0/0 的安全组入站规则"
    ],
    "answerCues": {
      "A": [
        "修改EventBridge规则"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "45": {
    "when": "ALB + 该公司希望将解决方案迁移到无服务器架构",
    "target": "对于每个 Webhook",
    "avoid": "",
    "questionCues": [
      "ALB",
      "该公司希望将解决方案迁移到无服务器架构"
    ],
    "answerCues": {
      "A": [
        "对于每个 Webhook"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "46": {
    "when": "某公司计划将 1,000 台 on-premises 服务器迁移到 AWS + 迁移计划的一部分",
    "target": "使用 Amazon Athena 对 Amazon S3 中的数据执行预先定义查询",
    "avoid": "",
    "questionCues": [
      "某公司计划将 1,000 台 on-premises 服务器迁移到 AWS",
      "迁移计划的一部分"
    ],
    "answerCues": {
      "D": [
        "使用 Amazon Athena 对 Amazon S3 中的数据执行预先定义查询"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "47": {
    "when": "该公司需要将该应用程序与外部提供者的新服务整合 + 公司必须向外部提供者提供单一公网 IP 地址",
    "target": "部署NAT网关",
    "avoid": "",
    "questionCues": [
      "该公司需要将该应用程序与外部提供者的新服务整合",
      "公司必须向外部提供者提供单一公网 IP 地址"
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
    "when": "应用程序不符合性能要求 + 解决方案架构师必须提高应用程序的性能",
    "target": "B：使用RDS代理设定到Aurora数据库的读取端点的连接池；D：将 Lambda 函数中用于开启数据库连接的代码移至事件处理程序之外",
    "avoid": "",
    "questionCues": [
      "应用程序不符合性能要求",
      "解决方案架构师必须提高应用程序的性能"
    ],
    "answerCues": {
      "B": [
        "使用RDS代理设定到Aurora数据库的读取端点的连接池"
      ],
      "D": [
        "将 Lambda 函数中用于开启数据库连接的代码移至事件处理程序之外"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "49": {
    "when": "Amazon EC2 + 安全性要求之一是在客户端和 Web 服务器之间的传输中启用端对端加密",
    "target": "设定第三方 SSL 凭证并将其安装在每个 EC2 实例上",
    "avoid": "别选“导出 SSL 凭证并将其安装在每个 EC2 实例上”。",
    "questionCues": [
      "Amazon EC2",
      "安全性要求之一是在客户端和 Web 服务器之间的传输中启用端对端加密"
    ],
    "answerCues": {
      "C": [
        "设定第三方 SSL 凭证并将其安装在每个 EC2 实例上"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "50": {
    "when": "而且迁移过程不能中断客户服务 + 也不能要求客户作任何更改",
    "target": "将收集器DNS记录指向ALB",
    "avoid": "",
    "questionCues": [
      "而且迁移过程不能中断客户服务",
      "也不能要求客户作任何更改"
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
    "when": "根据新要求 + S3存储桶中目前和未来的所有对象都必须使用公司安全团队管理的密钥进行加密",
    "target": "AWS KMS + 重新上传桶中的所有对象",
    "avoid": "",
    "questionCues": [
      "根据新要求",
      "S3存储桶中目前和未来的所有对象都必须使用公司安全团队管理的密钥进行加密"
    ],
    "answerCues": {
      "B": [
        "AWS KMS",
        "重新上传桶中的所有对象"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "52": {
    "when": "这些实例位于 Auto Scaling 组中 + 解决方案架构师必须使应用具备高可用性和容错能力",
    "target": "将一个设为主源站",
    "avoid": "",
    "questionCues": [
      "这些实例位于 Auto Scaling 组中",
      "解决方案架构师必须使应用具备高可用性和容错能力"
    ],
    "answerCues": {
      "B": [
        "将一个设为主源站"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "53": {
    "when": "该公司在其所有账户上启用了 AWS Config + 开发人员将参考此清单来安全地访问其应用程序",
    "target": "在中转账户中创建 VPC 前缀列表",
    "avoid": "",
    "questionCues": [
      "该公司在其所有账户上启用了 AWS Config",
      "开发人员将参考此清单来安全地访问其应用程序"
    ],
    "answerCues": {
      "C": [
        "在中转账户中创建 VPC 前缀列表"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "54": {
    "when": "以显示每个 API Lambda 函数的建议配置内存、建议成本以及当前配置与建议之间的价格差异",
    "target": "将 .csv 文件导出到 S3 存储桶",
    "avoid": "",
    "questionCues": [
      "以显示每个 API Lambda 函数的建议配置内存、建议成本以及当前配置与建议之间的价格差异"
    ],
    "answerCues": {
      "B": [
        "将 .csv 文件导出到 S3 存储桶"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "55": {
    "when": "各团队负责其所有应用的成本与性能 + 还需要比较过去 12 个月的成本",
    "target": "A：启动代表应用程序和团队的用户定义成本分配标签；D：启动IAM对计费和成本管理的访问权限；F：启用 Cost Explorer",
    "avoid": "",
    "questionCues": [
      "各团队负责其所有应用的成本与性能",
      "还需要比较过去 12 个月的成本"
    ],
    "answerCues": {
      "A": [
        "启动代表应用程序和团队的用户定义成本分配标签"
      ],
      "D": [
        "启动IAM对计费和成本管理的访问权限"
      ],
      "F": [
        "启用 Cost Explorer"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "56": {
    "when": "EC2 位于私有子网 + NAT 网关为私有子网提供互联网出站访问",
    "target": "从地址区块建立弹性IP地址并将其指派给VPC中的NAT网关",
    "avoid": "",
    "questionCues": [
      "EC2 位于私有子网",
      "NAT 网关为私有子网提供互联网出站访问"
    ],
    "answerCues": {
      "B": [
        "从地址区块建立弹性IP地址并将其指派给VPC中的NAT网关"
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
    "when": "应用团队没有该实例的管理员 SSH 密钥对 + 而且应用必须继续为用户提供服务",
    "target": "将具有写入Amazon S3权限的角色附加到实例",
    "avoid": "",
    "questionCues": [
      "应用团队没有该实例的管理员 SSH 密钥对",
      "而且应用必须继续为用户提供服务"
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
    "target": "B：将存储桶策略附加到来源存储桶；D：在目标账户中建立IAM策略；F：以目标账户中的用户身份执行 aws s3 sync 命令",
    "avoid": "",
    "questionCues": [
      "S3",
      "解决方案架构师必须实作使用AWS CLI 的解决方案"
    ],
    "answerCues": {
      "B": [
        "将存储桶策略附加到来源存储桶"
      ],
      "D": [
        "在目标账户中建立IAM策略"
      ],
      "F": [
        "以目标账户中的用户身份执行 aws s3 sync 命令"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "60": {
    "when": "导致服务中断数分钟 + 解决方案架构师必须调整部署流程",
    "target": "为 Lambda 函数的每个新部署版本建立一个别名",
    "avoid": "",
    "questionCues": [
      "导致服务中断数分钟",
      "解决方案架构师必须调整部署流程"
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
    "when": "VPC + 解决方案架构师应如何提高 SFTP 方案的可靠性和可扩展性",
    "target": "使其指向服务器端点的主机名",
    "avoid": "",
    "questionCues": [
      "VPC",
      "解决方案架构师应如何提高 SFTP 方案的可靠性和可扩展性"
    ],
    "answerCues": {
      "B": [
        "使其指向服务器端点的主机名"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "62": {
    "when": "迁移到 Amazon EC2 + 解决方案架构师必须在迁移期间保留软件和组态设定",
    "target": "为 VM 导入建立并套用 IAM 角色",
    "avoid": "",
    "questionCues": [
      "迁移到 Amazon EC2",
      "解决方案架构师必须在迁移期间保留软件和组态设定"
    ],
    "answerCues": {
      "B": [
        "为 VM 导入建立并套用 IAM 角色"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "63": {
    "when": "解决方案架构师需要重构应用程序的架构以防止调用失败 + 该公司不想管理底层基础设施",
    "target": "A：通过建立包含应用程序代码的Docker 镜像来修改应用程序部署；B：AWS Fargate",
    "avoid": "",
    "questionCues": [
      "解决方案架构师需要重构应用程序的架构以防止调用失败",
      "该公司不想管理底层基础设施"
    ],
    "answerCues": {
      "A": [
        "通过建立包含应用程序代码的Docker 镜像来修改应用程序部署"
      ],
      "B": [
        "AWS Fargate"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "64": {
    "when": "公司必须实施一项策略来侦测公司生产 OU 中未静态加密的 Amazon RDS 数据库实例",
    "target": "将护栏应用于生产OU",
    "avoid": "",
    "questionCues": [
      "公司必须实施一项策略来侦测公司生产 OU 中未静态加密的 Amazon RDS 数据库实例"
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
    "when": "该公司需要加强对 SSH 访问的安全控制 + 解决方案架构师应该",
    "target": "将角色附加到所有 EC2 实例",
    "avoid": "",
    "questionCues": [
      "该公司需要加强对 SSH 访问的安全控制",
      "解决方案架构师应该"
    ],
    "answerCues": {
      "D": [
        "将角色附加到所有 EC2 实例"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "66": {
    "when": "开发人员使用他们的公司电子邮件地址来要求账户 + 以限制他们的AWS成本",
    "target": "B：作为账户建立过程的一部分；C：创建 SCP 来拒绝访问昂贵的服务和组件；F：Amazon SNS",
    "avoid": "",
    "questionCues": [
      "开发人员使用他们的公司电子邮件地址来要求账户",
      "以限制他们的AWS成本"
    ],
    "answerCues": {
      "B": [
        "作为账户建立过程的一部分"
      ],
      "C": [
        "创建 SCP 来拒绝访问昂贵的服务和组件"
      ],
      "F": [
        "Amazon SNS"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "67": {
    "when": "本公司已为Aurora配置了自动备份 + 因此公司必须最大限度地减少停机时间",
    "target": "从来源账户下载 Lambda 函数部署套件 + AWS RAM",
    "avoid": "别选“与目标账户共用自动 Aurora 数据库集群快照”。",
    "questionCues": [
      "本公司已为Aurora配置了自动备份",
      "因此公司必须最大限度地减少停机时间"
    ],
    "answerCues": {
      "B": [
        "从来源账户下载 Lambda 函数部署套件",
        "AWS RAM"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "68": {
    "when": "该公司希望使工作负载具有高可用性和可扩展性 + 该公司还希望减少长期管理费用",
    "target": "公司上传对象时",
    "avoid": "",
    "questionCues": [
      "该公司希望使工作负载具有高可用性和可扩展性",
      "该公司还希望减少长期管理费用"
    ],
    "answerCues": {
      "A": [
        "公司上传对象时"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "69": {
    "when": "应用程序必须具有高可用性 + 并且必须动态扩展以满足用户流量",
    "target": "并为各记录配置故障转移路由策略",
    "avoid": "",
    "questionCues": [
      "应用程序必须具有高可用性",
      "并且必须动态扩展以满足用户流量"
    ],
    "answerCues": {
      "C": [
        "并为各记录配置故障转移路由策略"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "70": {
    "when": "IAM + 他们希望能够使用现有的 Active Directory 凭证访问控制台",
    "target": "配置 IAM Identity Center 并将 AD Connector 设定为身份来源",
    "avoid": "",
    "questionCues": [
      "IAM",
      "他们希望能够使用现有的 Active Directory 凭证访问控制台"
    ],
    "answerCues": {
      "D": [
        "配置 IAM Identity Center 并将 AD Connector 设定为身份来源"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "71": {
    "when": "这些用户的文件无法完全上传 + 解决方案架构师必须提高应用程序的这些上传性能",
    "target": "A：在 S3 存储桶上启用 S3 传输加速；D：配置应用程序将视讯文件分成区块",
    "avoid": "",
    "questionCues": [
      "这些用户的文件无法完全上传",
      "解决方案架构师必须提高应用程序的这些上传性能"
    ],
    "answerCues": {
      "A": [
        "在 S3 存储桶上启用 S3 传输加速"
      ],
      "D": [
        "配置应用程序将视讯文件分成区块"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "72": {
    "when": "重启应用后则恢复连接 + 解决方案架构师必须让应用在不重启的情况下重新建立数据库连接",
    "target": "建立一个 RDS 代理 + 更新应用程序中的连接设定以指向 RDS 代理端点",
    "avoid": "题目只需解决故障切换后的连接；别额外迁移到 Aurora。",
    "questionCues": [
      "重启应用后则恢复连接",
      "解决方案架构师必须让应用在不重启的情况下重新建立数据库连接"
    ],
    "answerCues": {
      "B": [
        "建立一个 RDS 代理",
        "更新应用程序中的连接设定以指向 RDS 代理端点"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "73": {
    "when": "数千台设备将连接该方案并发送数据 + 每台设备都必须能够通过 MQTT 协议实时发送和接收数据",
    "target": "将每台设备连接到 AWS IoT Core",
    "avoid": "",
    "questionCues": [
      "数千台设备将连接该方案并发送数据",
      "每台设备都必须能够通过 MQTT 协议实时发送和接收数据"
    ],
    "answerCues": {
      "C": [
        "将每台设备连接到 AWS IoT Core"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "74": {
    "when": "工程师必须 + 解决方案架构师需要创建一个解决方案来对工程师用于访问的IAM角色实施新的限制",
    "target": "并将该策略指派给新的 IAM 服务角色",
    "avoid": "",
    "questionCues": [
      "工程师必须",
      "解决方案架构师需要创建一个解决方案来对工程师用于访问的IAM角色实施新的限制"
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
    "when": "必须持久保存并可低延迟读取 + 公司仅需保留 120 天",
    "target": "删除超过 120 天的记录",
    "avoid": "",
    "questionCues": [
      "必须持久保存并可低延迟读取",
      "公司仅需保留 120 天"
    ],
    "answerCues": {
      "B": [
        "删除超过 120 天的记录"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "76": {
    "when": "要求网站随时可供用户在线购物 + Amazon RDS for MySQL",
    "target": "将跨区域只读副本提升为独立数据库实例",
    "avoid": "",
    "questionCues": [
      "要求网站随时可供用户在线购物",
      "Amazon RDS for MySQL"
    ],
    "answerCues": {
      "D": [
        "将跨区域只读副本提升为独立数据库实例"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "77": {
    "when": "本地服务器能够正常访问 VPC A + 现在希望本地服务器也能连接 VPC B",
    "target": "更新所有网络的中转网关路由表",
    "avoid": "",
    "questionCues": [
      "本地服务器能够正常访问 VPC A",
      "现在希望本地服务器也能连接 VPC B"
    ],
    "answerCues": {
      "A": [
        "更新所有网络的中转网关路由表"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "78": {
    "when": "旧版 SMTP 服务器不支持 TLS 加密并使用 TCP 连接埠 25 + 公司应该如何",
    "target": "Amazon SES SMTP",
    "avoid": "",
    "questionCues": [
      "旧版 SMTP 服务器不支持 TLS 加密并使用 TCP 连接埠 25",
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
    "when": "收购公司的财务团队需要一个解决方案 + 通过自我管理的应用程序报告所有公司的成本",
    "target": "在AmazonAthena中建立一个表",
    "avoid": "",
    "questionCues": [
      "收购公司的财务团队需要一个解决方案",
      "通过自我管理的应用程序报告所有公司的成本"
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
    "target": "C：AWS Lambda；E：重新架构数据库层以使用 Amazon DynamoDB 而不是 RDS MySQL 数据库实例",
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
        "重新架构数据库层以使用 Amazon DynamoDB 而不是 RDS MySQL 数据库实例"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "81": {
    "when": "并已与其最大客户完成了概念验证 + 该公司必须改善欧洲以外地区的延迟",
    "target": "A：在 S3 存储桶上启用 S3 传输加速；C：将 API Gateway Regional 端点改为边缘最佳化端点",
    "avoid": "",
    "questionCues": [
      "并已与其最大客户完成了概念验证",
      "该公司必须改善欧洲以外地区的延迟"
    ],
    "answerCues": {
      "A": [
        "在 S3 存储桶上启用 S3 传输加速"
      ],
      "C": [
        "将 API Gateway Regional 端点改为边缘最佳化端点"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "82": {
    "when": "公司需要优化存储成本 + 以尽可能低的成本维持照片和影片的毫秒检索可用性",
    "target": "在S3存储桶上配置S3Intelligent-Tiering",
    "avoid": "",
    "questionCues": [
      "公司需要优化存储成本",
      "以尽可能低的成本维持照片和影片的毫秒检索可用性"
    ],
    "answerCues": {
      "A": [
        "在S3存储桶上配置S3Intelligent-Tiering"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "83": {
    "when": "使用 Amazon S3 在各种存储类别中存储文件和影像 + 去年该公司的S3成本大幅增加",
    "target": "升级默认仪表板以包含存储趋势的高级指标",
    "avoid": "",
    "questionCues": [
      "使用 Amazon S3 在各种存储类别中存储文件和影像",
      "去年该公司的S3成本大幅增加"
    ],
    "answerCues": {
      "C": [
        "升级默认仪表板以包含存储趋势的高级指标"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "84": {
    "when": "该公司的业务扩展计划包括跨多个 AWS 账户在多个 Regions 中进行部署",
    "target": "从具有必要的 IAM 权限的账户部署 Cloud Formation 模板",
    "avoid": "",
    "questionCues": [
      "该公司的业务扩展计划包括跨多个 AWS 账户在多个 Regions 中进行部署"
    ],
    "answerCues": {
      "C": [
        "从具有必要的 IAM 权限的账户部署 Cloud Formation 模板"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "85": {
    "when": "该公司的业务扩展计划包括跨多个 AWS 账户在多个 Regions 中进行部署",
    "target": "从具有必要的 IAM 权限的账户部署 Cloud Formation 模板",
    "avoid": "",
    "questionCues": [
      "该公司的业务扩展计划包括跨多个 AWS 账户在多个 Regions 中进行部署"
    ],
    "answerCues": {
      "C": [
        "从具有必要的 IAM 权限的账户部署 Cloud Formation 模板"
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
    "when": "其中应用程序需要访问 Amazon Aurora 数据库集群 + 解决方案架构师需要向安全性群组",
    "target": "B：将出站规则加入到EC2实例的安全群组；C：将入站规则新增至数据库集群的安全性群组",
    "avoid": "",
    "questionCues": [
      "其中应用程序需要访问 Amazon Aurora 数据库集群",
      "解决方案架构师需要向安全性群组"
    ],
    "answerCues": {
      "B": [
        "将出站规则加入到EC2实例的安全群组"
      ],
      "C": [
        "将入站规则新增至数据库集群的安全性群组"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "88": {
    "when": "公司使用AWS Organizations来管理每个业务部门单独的AWS账户",
    "target": "在组织的管理账户中配置 AWS 预算",
    "avoid": "",
    "questionCues": [
      "公司使用AWS Organizations来管理每个业务部门单独的AWS账户"
    ],
    "answerCues": {
      "B": [
        "在组织的管理账户中配置 AWS 预算"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "89": {
    "when": "该公司担心 + 存储在Amazon RDS数据库或AmazonEBS卷中的重要数据也可能被删除",
    "target": "修改 CloudFormation 模板",
    "avoid": "",
    "questionCues": [
      "该公司担心",
      "存储在Amazon RDS数据库或AmazonEBS卷中的重要数据也可能被删除"
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
    "when": "NAT + 解决方案架构师必须确定流量是否代表来自互联网的未经请求的入站连接",
    "target": "打开 Amazon CloudWatch 控制台 + 将目的地址条件设为“like 203.0”",
    "avoid": "别选“源地址条件设为“like 203.0””。",
    "questionCues": [
      "NAT",
      "解决方案架构师必须确定流量是否代表来自互联网的未经请求的入站连接"
    ],
    "answerCues": {
      "B": [
        "打开 Amazon CloudWatch 控制台",
        "将目的地址条件设为“like 203.0”"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "91": {
    "when": "最近安全审计发现两个桶都未启用静态加密 + 但公司政策要求所有文档必须加密存储",
    "target": "使用 S3 Batch 操作在相同位置复制和加密对象",
    "avoid": "",
    "questionCues": [
      "最近安全审计发现两个桶都未启用静态加密",
      "但公司政策要求所有文档必须加密存储"
    ],
    "answerCues": {
      "A": [
        "使用 S3 Batch 操作在相同位置复制和加密对象"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "92": {
    "when": "该公司不会访问超过 1 年的数据 + 公司必须无限期保留所有数据",
    "target": "建立 S3 生命周期策略",
    "avoid": "",
    "questionCues": [
      "该公司不会访问超过 1 年的数据",
      "公司必须无限期保留所有数据"
    ],
    "answerCues": {
      "C": [
        "建立 S3 生命周期策略"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "93": {
    "when": "因此希望使用 AWS + 数据在传输过程中必须加密",
    "target": "将数据复制到设备",
    "avoid": "",
    "questionCues": [
      "因此希望使用 AWS",
      "数据在传输过程中必须加密"
    ],
    "answerCues": {
      "A": [
        "将数据复制到设备"
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
    "when": "该公司不想对应用程序进行任何重大更改",
    "target": "AMI + Amazon MQ + Amazon EKS",
    "avoid": "别选“在一组不同的 EC2 实例上安装 Kubernetes 以托管订单处理后端”。",
    "questionCues": [
      "该公司不想对应用程序进行任何重大更改"
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
    "when": "解决方案架构师需要为将存储在新的Amazon S3存储桶中的对象实作客户端加密机制",
    "target": "kms:GenerateDataKey",
    "avoid": "",
    "questionCues": [
      "解决方案架构师需要为将存储在新的Amazon S3存储桶中的对象实作客户端加密机制"
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
    "when": "该公司希望改善应用程序的安全状况 + 并计划使用 AWS WAF Web ACL",
    "target": "将Web ACL规则的操作设定为计数",
    "avoid": "",
    "questionCues": [
      "该公司希望改善应用程序的安全状况",
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
    "when": "解决方案架构师必须改进公司管理组织中AWS账户的通用安全群组规则的方式 + CIDR",
    "target": "使用所有内部 CIDR 范围填入客户管理的前缀清单",
    "avoid": "",
    "questionCues": [
      "解决方案架构师必须改进公司管理组织中AWS账户的通用安全群组规则的方式",
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
    "when": "多个 AWS 账户 + 可扩展的 AWS Client VPN 解决方案",
    "target": "在主 AWS 账户中建立 Client VPN 端点 + 配置允许访问内部应用程序的所需路由",
    "avoid": "已有 VPC 对等连接；不要各建端点或 Transit Gateway。",
    "questionCues": [
      "多个 AWS 账户",
      "可扩展的 AWS Client VPN 解决方案"
    ],
    "answerCues": {
      "B": [
        "在主 AWS 账户中建立 Client VPN 端点",
        "配置允许访问内部应用程序的所需路由"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "100": {
    "when": "AWS Lambda + 解决方案架构师需要解耦第三方服务调用并确保所有调用最终完成",
    "target": "Amazon SQS",
    "avoid": "",
    "questionCues": [
      "AWS Lambda",
      "解决方案架构师需要解耦第三方服务调用并确保所有调用最终完成"
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
    "when": "IAM + 公司需要一种能够跨 AWS 账户安全访问该 S3 存储桶数据的方案",
    "target": "授予 QuickSight 角色解密访问权限",
    "avoid": "别选“授予对该 S3 存储桶的访问权限”。",
    "questionCues": [
      "IAM",
      "公司需要一种能够跨 AWS 账户安全访问该 S3 存储桶数据的方案"
    ],
    "answerCues": {
      "C": [
        "授予 QuickSight 角色解密访问权限"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "102": {
    "when": "迁移到 AWS 托管数据库服务 + 解决方案架构师必须在 AWS 上设计一个异构数据库迁移方案",
    "target": "将本地数据库中的数据迁移到 Amazon RDS",
    "avoid": "",
    "questionCues": [
      "迁移到 AWS 托管数据库服务",
      "解决方案架构师必须在 AWS 上设计一个异构数据库迁移方案"
    ],
    "answerCues": {
      "C": [
        "将本地数据库中的数据迁移到 Amazon RDS"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "103": {
    "when": "使用设计团队成员可以访问的开发账户 + 解决方案架构师必须为设计团队提供对生产账户的访问权限",
    "target": "A：在生产账户中，建立一个新的 IAM 策略 + 允许对 S3 存储桶进行读写访问；C：将开发账户定义为受信任的实体；E：允许对生产账户中的角色执行 sts:AssumeRole 操作",
    "avoid": "",
    "questionCues": [
      "使用设计团队成员可以访问的开发账户",
      "解决方案架构师必须为设计团队提供对生产账户的访问权限"
    ],
    "answerCues": {
      "A": [
        "在生产账户中，建立一个新的 IAM 策略",
        "允许对 S3 存储桶进行读写访问"
      ],
      "C": [
        "将开发账户定义为受信任的实体"
      ],
      "E": [
        "允许对生产账户中的角色执行 sts:AssumeRole 操作"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "104": {
    "when": "这会导致一些性能瓶颈 + 解决方案架构师必须缓解性能问题",
    "target": "修改现有环境的容量配置以使用负载均衡的环境类型",
    "avoid": "",
    "questionCues": [
      "这会导致一些性能瓶颈",
      "解决方案架构师必须缓解性能问题"
    ],
    "answerCues": {
      "C": [
        "修改现有环境的容量配置以使用负载均衡的环境类型"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "105": {
    "when": "该应用程序在本月能够处理适量的流量 + 同时对性能的影响最小",
    "target": "并建立多个额外的只读副本来处理月底的负载",
    "avoid": "",
    "questionCues": [
      "该应用程序在本月能够处理适量的流量",
      "同时对性能的影响最小"
    ],
    "answerCues": {
      "B": [
        "并建立多个额外的只读副本来处理月底的负载"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "106": {
    "when": "该公司希望将应用程序迁移到AWS + 并最大限度地减少维护服务器的管理开销",
    "target": "AWS Fargate",
    "avoid": "",
    "questionCues": [
      "该公司希望将应用程序迁移到AWS",
      "并最大限度地减少维护服务器的管理开销"
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
    "when": "HTTP + 解决方案架构师需要重新设计应用程序以支持故障转移到另一个AWSRegion",
    "target": "将 Lambda 函数和 API Gateway 端点部署到 us-west-2 Region",
    "avoid": "",
    "questionCues": [
      "HTTP",
      "解决方案架构师需要重新设计应用程序以支持故障转移到另一个AWSRegion"
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
    "when": "每个 OU 都有多个 AWS 账户 + 人力资源部门希望确保其他部门不能分享 RI 折扣",
    "target": "在AWS 计费和成本管理控制台中",
    "avoid": "",
    "questionCues": [
      "每个 OU 都有多个 AWS 账户",
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
    "when": "一些 EC2 实例被标记为不健康并被终止 + 架构师应如何访问一个 EC2 实例来排查问题",
    "target": "暂停 Auto Scaling 组的 Terminate 流程",
    "avoid": "",
    "questionCues": [
      "一些 EC2 实例被标记为不健康并被终止",
      "架构师应如何访问一个 EC2 实例来排查问题"
    ],
    "answerCues": {
      "D": [
        "暂停 Auto Scaling 组的 Terminate 流程"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "110": {
    "when": "一家公司希望 + 管理员还必须能够自动更新和修复所有账户中不合规的 AWS WAF 规则",
    "target": "按需更新该参数",
    "avoid": "",
    "questionCues": [
      "一家公司希望",
      "管理员还必须能够自动更新和修复所有账户中不合规的 AWS WAF 规则"
    ],
    "answerCues": {
      "A": [
        "按需更新该参数"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "111": {
    "when": "VPC + 该存储桶使用由 AWS KMS 管理密钥的服务器端加密 (SSE-KMS)",
    "target": "变更 Lambda 函数的 IAM 角色 + 在 VPC 中为 Amazon S3 部署网关 VPC 端点",
    "avoid": "别选“在数据传输期间对与 Amazon S3 的连接强制执行 HTTPS”。",
    "questionCues": [
      "VPC",
      "该存储桶使用由 AWS KMS 管理密钥的服务器端加密 (SSE-KMS)"
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
    "when": "架构师必须实施一项控制机制 + 仅针对开发人员限制其能够启动的实例类型",
    "target": "建立新的IAM策略",
    "avoid": "",
    "questionCues": [
      "架构师必须实施一项控制机制",
      "仅针对开发人员限制其能够启动的实例类型"
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
    "when": "公司要求将云基础设施成本分配给对应的所属项目 + 多个 Amazon EC2 实例缺少用于成本",
    "target": "A：以寻找缺少标签的资源；B：在组织中创建一个 SCP；E：为组织创建一个 AWS Config 聚合器",
    "avoid": "",
    "questionCues": [
      "公司要求将云基础设施成本分配给对应的所属项目",
      "多个 Amazon EC2 实例缺少用于成本"
    ],
    "answerCues": {
      "A": [
        "以寻找缺少标签的资源"
      ],
      "B": [
        "在组织中创建一个 SCP"
      ],
      "E": [
        "为组织创建一个 AWS Config 聚合器"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "114": {
    "when": "数据库无法扩展 + 缓冲区可自动扩展以符合数据吞吐量",
    "target": "A：使用Amazon Kinesis Data Firehose来缓冲事件；D：Amazon Elasticsearch Service",
    "avoid": "",
    "questionCues": [
      "数据库无法扩展",
      "缓冲区可自动扩展以符合数据吞吐量"
    ],
    "answerCues": {
      "A": [
        "使用Amazon Kinesis Data Firehose来缓冲事件"
      ],
      "D": [
        "Amazon Elasticsearch Service"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "115": {
    "when": "解决方案架构师必须审查基础架构 + 解决方案架构师需要降低成本并维护应用程序的功能",
    "target": "确保VPC端点策略允许来自应用程序的流量",
    "avoid": "",
    "questionCues": [
      "解决方案架构师必须审查基础架构",
      "解决方案架构师需要降低成本并维护应用程序的功能"
    ],
    "answerCues": {
      "D": [
        "确保VPC端点策略允许来自应用程序的流量"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "116": {
    "when": "网络上不能存在单点故障 + 以实现高可用性",
    "target": "中转 VIF + 将Transit Gateways彼此对等以支持跨Region 路由",
    "avoid": "别选“将 eu-west-1 的中转网关关联到该 Direct Connect 网关”。",
    "questionCues": [
      "网络上不能存在单点故障",
      "以实现高可用性"
    ],
    "answerCues": {
      "D": [
        "中转 VIF",
        "将Transit Gateways彼此对等以支持跨Region 路由"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "117": {
    "when": "安全团队必须批准所有新 IAM 用户的创建 + 都必须自动移除该用户的全部访问权限",
    "target": "A：Amazon EventBridge + eventName 设为 CreateUser；D：AWS Step Functions + 删除访问权限；E：Amazon SNS + 通知安全团队",
    "avoid": "别选“使用 Amazon Pinpoint 通知安全团队”。",
    "questionCues": [
      "安全团队必须批准所有新 IAM 用户的创建",
      "都必须自动移除该用户的全部访问权限"
    ],
    "answerCues": {
      "A": [
        "Amazon EventBridge",
        "eventName 设为 CreateUser"
      ],
      "D": [
        "AWS Step Functions",
        "删除访问权限"
      ],
      "E": [
        "Amazon SNS",
        "通知安全团队"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "118": {
    "when": "生产账户和共享网络账户必须能够连接所有账户 + 开发账户和预发布账户必须只能相互访问",
    "target": "A：AWS Organizations；C：配置适当的路由表；D：为现有账户建立具有所需 MFA 的适当权限集",
    "avoid": "",
    "questionCues": [
      "生产账户和共享网络账户必须能够连接所有账户",
      "开发账户和预发布账户必须只能相互访问"
    ],
    "answerCues": {
      "A": [
        "AWS Organizations"
      ],
      "C": [
        "配置适当的路由表"
      ],
      "D": [
        "为现有账户建立具有所需 MFA 的适当权限集"
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
    "when": "并将 AWS Lambda 整合 + 使客户能够为每秒进行一定数量的 API 调用的容量付费",
    "target": "该公司达到了 API Gateway 账户每秒调用次数限制",
    "avoid": "",
    "questionCues": [
      "并将 AWS Lambda 整合",
      "使客户能够为每秒进行一定数量的 API 调用的容量付费"
    ],
    "answerCues": {
      "C": [
        "该公司达到了 API Gateway 账户每秒调用次数限制"
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
    "target": "设置一条规则",
    "avoid": "",
    "questionCues": [
      "该公司需要设计一种新的数据分析解决方案",
      "可以更快地交付并优化成本"
    ],
    "answerCues": {
      "A": [
        "设置一条规则"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "123": {
    "when": "公司网络必须能够无缝访问AWS上的资源 + 并且还必须能够与所有VPC通讯",
    "target": "B：在中心网络账户中；D：与其他账户共用中转网关；F：仅配置私有子网",
    "avoid": "",
    "questionCues": [
      "公司网络必须能够无缝访问AWS上的资源",
      "并且还必须能够与所有VPC通讯"
    ],
    "answerCues": {
      "B": [
        "在中心网络账户中"
      ],
      "D": [
        "与其他账户共用中转网关"
      ],
      "F": [
        "仅配置私有子网"
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
    "when": "最近一次 RDS 数据库故障转移测试导致应用程序中断 40 秒",
    "target": "C：在数据库前端使用 RDS Proxy；D：将数据库迁移到AmazonAuroraMySQL；E：建立一个 Amazon Aurora 副本",
    "avoid": "",
    "questionCues": [
      "最近一次 RDS 数据库故障转移测试导致应用程序中断 40 秒"
    ],
    "answerCues": {
      "C": [
        "在数据库前端使用 RDS Proxy"
      ],
      "D": [
        "将数据库迁移到AmazonAuroraMySQL"
      ],
      "E": [
        "建立一个 Amazon Aurora 副本"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "126": {
    "when": "公司必须使用 API 或命令列工具对客户账户建立最低权限安全访问",
    "target": "并为该角色授予所需权限",
    "avoid": "",
    "questionCues": [
      "公司必须使用 API 或命令列工具对客户账户建立最低权限安全访问"
    ],
    "answerCues": {
      "D": [
        "并为该角色授予所需权限"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "127": {
    "when": "该映像可以根据需要在任意多个容器中 + 公司需要能够根据运作的容器数量经济有效地分配资源",
    "target": "使用 AWS CLI 的 run-task 命令",
    "avoid": "",
    "questionCues": [
      "该映像可以根据需要在任意多个容器中",
      "公司需要能够根据运作的容器数量经济有效地分配资源"
    ],
    "answerCues": {
      "D": [
        "使用 AWS CLI 的 run-task 命令"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "128": {
    "when": "在另一个 AWS 账户中 + 其 IPv4 CIDR 区块为 10.10.10.0/24",
    "target": "A：两个 VPC 的 IPv4 CIDR 范围重叠；E：对等接受方账户中的IAM角色没有正确的权限",
    "avoid": "",
    "questionCues": [
      "在另一个 AWS 账户中",
      "其 IPv4 CIDR 区块为 10.10.10.0/24"
    ],
    "answerCues": {
      "A": [
        "两个 VPC 的 IPv4 CIDR 范围重叠"
      ],
      "E": [
        "对等接受方账户中的IAM角色没有正确的权限"
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
    "when": "部署在 DBA 账户中的 Amazon EC2 实例来访问 + 使数据库管理员能够访问数据库",
    "target": "授予角色访问机密所需的权限",
    "avoid": "",
    "questionCues": [
      "部署在 DBA 账户中的 Amazon EC2 实例来访问",
      "使数据库管理员能够访问数据库"
    ],
    "answerCues": {
      "B": [
        "授予角色访问机密所需的权限"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "132": {
    "when": "部署的 EC2 实例必须 + 此解决方案必须最大限度地提高运维效率",
    "target": "C：aws:RequestedRegion 条件键 + 将 SCP 应用于根OU；E：ec2:InstanceType 条件键 + 将 SCP 应用到 DataOps OU",
    "avoid": "核对题目限制与完整选项。",
    "questionCues": [
      "部署的 EC2 实例必须",
      "此解决方案必须最大限度地提高运维效率"
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
    "when": "该公司希望在其他区域分别处理每个 URL + 结果必须写入目前Region中现有的S3存储桶",
    "target": "A：将 SQS 队列和 Lambda 函数一起部署到其他区域；C：将每个Region中的SQS队列订阅到SNS主题",
    "avoid": "",
    "questionCues": [
      "该公司希望在其他区域分别处理每个 URL",
      "结果必须写入目前Region中现有的S3存储桶"
    ],
    "answerCues": {
      "A": [
        "将 SQS 队列和 Lambda 函数一起部署到其他区域"
      ],
      "C": [
        "将每个Region中的SQS队列订阅到SNS主题"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "134": {
    "when": "原始代码无法修改 + 解决方案架构师应该",
    "target": "使用 AWS Fargate 运行应用程序",
    "avoid": "",
    "questionCues": [
      "原始代码无法修改",
      "解决方案架构师应该"
    ],
    "answerCues": {
      "C": [
        "使用 AWS Fargate 运行应用程序"
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
    "when": "该公司需要将整个应用程序迁移到具有类似结构的AWS + 必须部署应用程序以实现高可用性",
    "target": "将多个 Availability Zones 中适当大小的实例",
    "avoid": "",
    "questionCues": [
      "该公司需要将整个应用程序迁移到具有类似结构的AWS",
      "必须部署应用程序以实现高可用性"
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
    "when": "他们会收到「访问被拒绝」错误 + 解决方案架构师必须确保策略账户中的用户可以访问 S3 存储桶",
    "target": "A：设定桶策略的principal为策略账户的账户ID；C：授予解密权限；F：以授予S3 存储桶的读取权限",
    "avoid": "",
    "questionCues": [
      "他们会收到「访问被拒绝」错误",
      "解决方案架构师必须确保策略账户中的用户可以访问 S3 存储桶"
    ],
    "answerCues": {
      "A": [
        "设定桶策略的principal为策略账户的账户ID"
      ],
      "C": [
        "授予解密权限"
      ],
      "F": [
        "以授予S3 存储桶的读取权限"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "138": {
    "when": "以根据工作负载需求进行扩展 + 并且单一作业可能需要几个小时才能以理想的运算能力处理数据",
    "target": "并触发AWSBatch运行容器并处理定序数据",
    "avoid": "",
    "questionCues": [
      "以根据工作负载需求进行扩展",
      "并且单一作业可能需要几个小时才能以理想的运算能力处理数据"
    ],
    "answerCues": {
      "C": [
        "并触发AWSBatch运行容器并处理定序数据"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "139": {
    "when": "运行内容管理应用程序 + 该解决方案还必须实作 Windows ACL 来控制对文件内容的访问",
    "target": "执行无缝域加入",
    "avoid": "",
    "questionCues": [
      "运行内容管理应用程序",
      "该解决方案还必须实作 Windows ACL 来控制对文件内容的访问"
    ],
    "answerCues": {
      "C": [
        "执行无缝域加入"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "140": {
    "when": "公司计划将这项消息发送功能迁移到 AWS 云 + 并希望尽量减少运维开销",
    "target": "将电子邮件模板与客户数据参数存储在 Amazon SES 上",
    "avoid": "",
    "questionCues": [
      "公司计划将这项消息发送功能迁移到 AWS 云",
      "并希望尽量减少运维开销"
    ],
    "answerCues": {
      "D": [
        "将电子邮件模板与客户数据参数存储在 Amazon SES 上"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "141": {
    "when": "每个视频需要处理 30 分钟 + 公司配置了 Amazon CloudWatch 告警",
    "target": "配置处理过程中实例的缩容保护",
    "avoid": "",
    "questionCues": [
      "每个视频需要处理 30 分钟",
      "公司配置了 Amazon CloudWatch 告警"
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
    "when": "解决方案架构师确定了一组不需要公共访问的 API + 使这组 API 只能从 VPC 访问",
    "target": "创建资源策略并附加到该 API",
    "avoid": "",
    "questionCues": [
      "解决方案架构师确定了一组不需要公共访问的 API",
      "使这组 API 只能从 VPC 访问"
    ],
    "answerCues": {
      "C": [
        "创建资源策略并附加到该 API"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "143": {
    "when": "Amazon S3 + 该公司最近扩展到为 us-east-1 Region 的用户提供服务",
    "target": "B：在 us-east-1 中建立一个新的 S3 存储桶；D：使用Lambda@Edge修改来自北美的请求以使用us-east-1中的S3存储桶",
    "avoid": "",
    "questionCues": [
      "Amazon S3",
      "该公司最近扩展到为 us-east-1 Region 的用户提供服务"
    ],
    "answerCues": {
      "B": [
        "在 us-east-1 中建立一个新的 S3 存储桶"
      ],
      "D": [
        "使用Lambda@Edge修改来自北美的请求以使用us-east-1中的S3存储桶"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "144": {
    "when": "该文件系统配置了 10 TB 存储空间 + 必须让用户恢复访问",
    "target": "使用 update-file-system 命令增加容量",
    "avoid": "",
    "questionCues": [
      "该文件系统配置了 10 TB 存储空间",
      "必须让用户恢复访问"
    ],
    "answerCues": {
      "B": [
        "使用 update-file-system 命令增加容量"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "145": {
    "when": "FTP 服务器因连接中断和内存问题而出现问题 + 因此公司无法部署新的应用程序",
    "target": "将文件放置在 Amazon S3 中",
    "avoid": "",
    "questionCues": [
      "FTP 服务器因连接中断和内存问题而出现问题",
      "因此公司无法部署新的应用程序"
    ],
    "answerCues": {
      "C": [
        "将文件放置在 Amazon S3 中"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "146": {
    "when": "应用程序必须能够在应用程序发生故障时恢复到单独的 AWS Region + 如果发生故障",
    "target": "在不同的 Region 中配置 Aurora 副本",
    "avoid": "别选“设定 AWS DataSync 将数据连续复制到不同的 Region”。",
    "questionCues": [
      "应用程序必须能够在应用程序发生故障时恢复到单独的 AWS Region",
      "如果发生故障"
    ],
    "answerCues": {
      "A": [
        "在不同的 Region 中配置 Aurora 副本"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "147": {
    "when": "公司需要在将数据发送到另一个 S3 桶供内部进一步处理之前 + 因此设计必须易于扩展",
    "target": "根据处理和转换要求来转换整个记录",
    "avoid": "",
    "questionCues": [
      "公司需要在将数据发送到另一个 S3 桶供内部进一步处理之前",
      "因此设计必须易于扩展"
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
    "when": "该公司计划迁移的 on-premises 应用程序使用 MySQL 数据库作为数据存储",
    "target": "并定义启动设置",
    "avoid": "",
    "questionCues": [
      "该公司计划迁移的 on-premises 应用程序使用 MySQL 数据库作为数据存储"
    ],
    "answerCues": {
      "B": [
        "并定义启动设置"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "149": {
    "when": "解决方案架构师必须为审核员提供对公司AWS账户的安全性、只读访问权限",
    "target": "将策略附加到角色",
    "avoid": "",
    "questionCues": [
      "解决方案架构师必须为审核员提供对公司AWS账户的安全性、只读访问权限"
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
    "target": "三节点DynamoDB Accelerator (DAX)集群 + DAX读取数据并将数据直接写入DynamoDB表",
    "avoid": "别选“使用 DAX 设定应用程序来读取和写入数据”。",
    "questionCues": [
      "一家公司拥有一个对延迟敏感的交易平台",
      "新的解决方案必须确保交易平台的高可用性"
    ],
    "answerCues": {
      "B": [
        "三节点DynamoDB Accelerator (DAX)集群",
        "DAX读取数据并将数据直接写入DynamoDB表"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "151": {
    "when": "解决方案架构师需要优化应用程序的基础架构成本 + 而不会对应用程序可用性产生负面影响",
    "target": "B：将应用程序前端移至托管在 Amazon S3 上的静态网站；E：将后端 Python 应用程序",
    "avoid": "",
    "questionCues": [
      "解决方案架构师需要优化应用程序的基础架构成本",
      "而不会对应用程序可用性产生负面影响"
    ],
    "answerCues": {
      "B": [
        "将应用程序前端移至托管在 Amazon S3 上的静态网站"
      ],
      "E": [
        "将后端 Python 应用程序"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "152": {
    "when": "并希望优化该平台的成本效益 + 可在 Amazon EKS 和 AWS Fargate 上运行",
    "target": "为 EKS 集群预测的基线负载购买 Compute Savings Plans",
    "avoid": "",
    "questionCues": [
      "并希望优化该平台的成本效益",
      "可在 Amazon EKS 和 AWS Fargate 上运行"
    ],
    "answerCues": {
      "D": [
        "为 EKS 集群预测的基线负载购买 Compute Savings Plans"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "153": {
    "when": "在应用程序无法使用期间 + 该公司希望访客收到资讯性消息",
    "target": "A：将静态资讯内容上传到S3存储桶；C：将 S3 存储桶；D：维护完成后恢复变更",
    "avoid": "",
    "questionCues": [
      "在应用程序无法使用期间",
      "该公司希望访客收到资讯性消息"
    ],
    "answerCues": {
      "A": [
        "将静态资讯内容上传到S3存储桶"
      ],
      "C": [
        "将 S3 存储桶"
      ],
      "D": [
        "维护完成后恢复变更"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "154": {
    "when": "解决方案架构师需要简化此流程 + 以最大程度地减少对用户的干扰",
    "target": "当公司完成测试时",
    "avoid": "",
    "questionCues": [
      "解决方案架构师需要简化此流程",
      "以最大程度地减少对用户的干扰"
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
    "when": "公司自行管理公共 DNS + 例如 example.com）访问应用",
    "target": "这些端点组以适当的 AWS Regions 中的端点为目标",
    "avoid": "",
    "questionCues": [
      "公司自行管理公共 DNS",
      "例如 example.com）访问应用"
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
    "when": "Lambda + 解决方案架构师需要简化解决方案的部署并最佳化代码重复使用",
    "target": "Amazon Elastic Container Registry",
    "avoid": "",
    "questionCues": [
      "Lambda",
      "解决方案架构师需要简化解决方案的部署并最佳化代码重复使用"
    ],
    "answerCues": {
      "D": [
        "Amazon Elastic Container Registry"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "157": {
    "when": "公司也必须能够提供此回馈 + 公司应该如何部署ML模型来满足这些需求",
    "target": "配置组件在侦测到缺陷时调用本机 API",
    "avoid": "",
    "questionCues": [
      "公司也必须能够提供此回馈",
      "公司应该如何部署ML模型来满足这些需求"
    ],
    "answerCues": {
      "B": [
        "配置组件在侦测到缺陷时调用本机 API"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "158": {
    "when": "解决方案架构师需要为一家公司将本地数据中心迁移到 AWS 云制定商业论证",
    "target": "并通过数据导入模板上传从 CMDB 导出的数据",
    "avoid": "",
    "questionCues": [
      "解决方案架构师需要为一家公司将本地数据中心迁移到 AWS 云制定商业论证"
    ],
    "answerCues": {
      "B": [
        "并通过数据导入模板上传从 CMDB 导出的数据"
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
    "when": "关键应用程序必须跨两个Regions部署应用程序层组件和数据层组件",
    "target": "A：将另一个 Region 加入到 Aurora MySQL 数据库集群；D：将现有 DynamoDB 表转换为全域表",
    "avoid": "Aurora 扩展集群，不是给集群中的每个表加 Region；两种数据库都要跨区。",
    "questionCues": [
      "关键应用程序必须跨两个Regions部署应用程序层组件和数据层组件"
    ],
    "answerCues": {
      "A": [
        "将另一个 Region 加入到 Aurora MySQL 数据库集群"
      ],
      "D": [
        "将现有 DynamoDB 表转换为全域表"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "161": {
    "when": "解决方案架构师必须开发一种解决方案 + 以便客户端可以继续访问应用程序",
    "target": "并更新客户端",
    "avoid": "",
    "questionCues": [
      "解决方案架构师必须开发一种解决方案",
      "以便客户端可以继续访问应用程序"
    ],
    "answerCues": {
      "B": [
        "并更新客户端"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "162": {
    "when": "一家公司在一组Amazon EC2实例上 + 该公司需要一种解决方案来阻止网络流量直接访问ALB",
    "target": "仅允许来自 CloudFront 的 AWS 托管前缀列表的流量",
    "avoid": "",
    "questionCues": [
      "一家公司在一组Amazon EC2实例上",
      "该公司需要一种解决方案来阻止网络流量直接访问ALB"
    ],
    "answerCues": {
      "C": [
        "仅允许来自 CloudFront 的 AWS 托管前缀列表的流量"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "163": {
    "when": "最近的安全审计显示 + 解决方案架构师必须进行更改以要求用户身份验证并确保公司使用端对端加密",
    "target": "并配置传输中加密",
    "avoid": "别选“创建SSL证书”。",
    "questionCues": [
      "最近的安全审计显示",
      "解决方案架构师必须进行更改以要求用户身份验证并确保公司使用端对端加密"
    ],
    "answerCues": {
      "A": [
        "并配置传输中加密"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "164": {
    "when": "监控系统报告了Auto Scaling实例启动失败 + 公司需要提高工作负载的整体可靠性",
    "target": "建立使用基于属性的实例类型选择的新启动模板版本",
    "avoid": "",
    "questionCues": [
      "监控系统报告了Auto Scaling实例启动失败",
      "公司需要提高工作负载的整体可靠性"
    ],
    "answerCues": {
      "B": [
        "建立使用基于属性的实例类型选择的新启动模板版本"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "165": {
    "when": "需要快速访问其生成和修改的本地文件 + 文件必须在 30 分钟内可供公众下载",
    "target": "当Amazon S3发生变更时",
    "avoid": "",
    "questionCues": [
      "需要快速访问其生成和修改的本地文件",
      "文件必须在 30 分钟内可供公众下载"
    ],
    "answerCues": {
      "B": [
        "当Amazon S3发生变更时"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "166": {
    "when": "公司需要能够根据请求删除用户资讯 + 其他所有微服务也必须立即删除其数据副本",
    "target": "并调用微服务中的逻辑以从DynamoDB表中删除用户",
    "avoid": "",
    "questionCues": [
      "公司需要能够根据请求删除用户资讯",
      "其他所有微服务也必须立即删除其数据副本"
    ],
    "answerCues": {
      "C": [
        "并调用微服务中的逻辑以从DynamoDB表中删除用户"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "167": {
    "when": "外部客户需要连接到 Web 应用程序 + 公司必须向所有外部客户提供 IP 地址",
    "target": "指定 ALB 作为加速器的端点",
    "avoid": "",
    "questionCues": [
      "外部客户需要连接到 Web 应用程序",
      "公司必须向所有外部客户提供 IP 地址"
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
    "when": "并希望将其生产应用程序迁移到 AWS + 该公司需要一个包含内建蓝图和护栏的解决方案",
    "target": "C：在公司的管理账户中；D：创建SCP以确保合规性；F：为生产OU 建立护栏以侦测EBS 加密",
    "avoid": "",
    "questionCues": [
      "并希望将其生产应用程序迁移到 AWS",
      "该公司需要一个包含内建蓝图和护栏的解决方案"
    ],
    "answerCues": {
      "C": [
        "在公司的管理账户中"
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
    "when": "公司不希望大幅修改现有架构 + 并且必须在故障转移后保持尽可能低的访问延迟",
    "target": "配置 EC2 实例以使用 AWS Elastic Disaster Recovery",
    "avoid": "",
    "questionCues": [
      "公司不希望大幅修改现有架构",
      "并且必须在故障转移后保持尽可能低的访问延迟"
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
    "when": "解决方案架构师希望在单一 AWS 账户中最佳化成本并适当调整 Amazon EC2 实例的大小",
    "target": "C：安装 Amazon CloudWatch 代理并在 EC2 实例上配置内存指标收集；D：以获取发现结果和优化建议",
    "avoid": "",
    "questionCues": [
      "解决方案架构师希望在单一 AWS 账户中最佳化成本并适当调整 Amazon EC2 实例的大小"
    ],
    "answerCues": {
      "C": [
        "安装 Amazon CloudWatch 代理并在 EC2 实例上配置内存指标收集"
      ],
      "D": [
        "以获取发现结果和优化建议"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "171": {
    "when": "AWS CodeCommit + 公司必须在第二个AWSRegion中存存储储库中数据的备份副本",
    "target": "建立内容的 .zip 文件",
    "avoid": "",
    "questionCues": [
      "AWS CodeCommit",
      "公司必须在第二个AWSRegion中存存储储库中数据的备份副本"
    ],
    "answerCues": {
      "C": [
        "建立内容的 .zip 文件"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "172": {
    "when": "并希望所有其他业务部门都可以访问该应用程序 + 此解决方案必须仅使用私有 IP 地址",
    "target": "授予特定 AWS 账户连接到服务的权限",
    "avoid": "",
    "questionCues": [
      "并希望所有其他业务部门都可以访问该应用程序",
      "此解决方案必须仅使用私有 IP 地址"
    ],
    "answerCues": {
      "C": [
        "授予特定 AWS 账户连接到服务的权限"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "173": {
    "when": "某公司需要对新取得的AWS账户进行安全态势审计 + 公司的数据安全团队才需要通知",
    "target": "并使用「isPublic: true」过滤器",
    "avoid": "",
    "questionCues": [
      "某公司需要对新取得的AWS账户进行安全态势审计",
      "公司的数据安全团队才需要通知"
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
    "when": "在开始迁移到 AWS 之前 + 架构师必须充分了解这些资产",
    "target": "通过 AWS Migration Hub 查看应用资产组合",
    "avoid": "",
    "questionCues": [
      "在开始迁移到 AWS 之前",
      "架构师必须充分了解这些资产"
    ],
    "answerCues": {
      "C": [
        "通过 AWS Migration Hub 查看应用资产组合"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "175": {
    "when": "这些文件必须可以在该应用程序的所有正在运行的实例中访问 + 并保留备份1年",
    "target": "让应用将文件保存到其中",
    "avoid": "",
    "questionCues": [
      "这些文件必须可以在该应用程序的所有正在运行的实例中访问",
      "并保留备份1年"
    ],
    "answerCues": {
      "A": [
        "让应用将文件保存到其中"
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
    "when": "该公司的运维团队正在制定涵盖 AWS Regions 的灾难恢复 (DR) 策略",
    "target": "通过 CloudFormation 模板创建已申请的电话号码",
    "avoid": "别选“通过 CloudFormation 模板创建全部用户”。",
    "questionCues": [
      "该公司的运维团队正在制定涵盖 AWS Regions 的灾难恢复 (DR) 策略"
    ],
    "answerCues": {
      "D": [
        "通过 CloudFormation 模板创建已申请的电话号码"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "178": {
    "when": "该公司希望在共享数据之前确认客户的身份 + 客户还需要访问最新的数据",
    "target": "AWS Data Exchange datashare",
    "avoid": "",
    "questionCues": [
      "该公司希望在共享数据之前确认客户的身份",
      "客户还需要访问最新的数据"
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
    "when": "方案必须能根据接收的事件数量扩容和缩容 + 必须将该事件移入独立队列以供检查",
    "target": "设定为目标",
    "avoid": "",
    "questionCues": [
      "方案必须能根据接收的事件数量扩容和缩容",
      "必须将该事件移入独立队列以供检查"
    ],
    "answerCues": {
      "A": [
        "设定为目标"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "180": {
    "when": "API 会经历不可预测的流量突发 + 公司必须实施一个解决方案来处理设备发送到处理引擎的所有数据",
    "target": "建立AWS Lambda函数来处理SQS队列中的消息",
    "avoid": "",
    "questionCues": [
      "API 会经历不可预测的流量突发",
      "公司必须实施一个解决方案来处理设备发送到处理引擎的所有数据"
    ],
    "answerCues": {
      "B": [
        "建立AWS Lambda函数来处理SQS队列中的消息"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "181": {
    "when": "并使用 AWS Organizations 管理多个账户 + 每个账户都有一个 VPC",
    "target": "为每个 VPC 建立中转网关 VPC 附件",
    "avoid": "",
    "questionCues": [
      "并使用 AWS Organizations 管理多个账户",
      "每个账户都有一个 VPC"
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
    "when": "它希望在迁移过程中尽可能多地使用完全托管的服务 + 该公司需要在应用程序中存储大型重要文档",
    "target": "并使用 AWS KMS 进行对象加密",
    "avoid": "",
    "questionCues": [
      "它希望在迁移过程中尽可能多地使用完全托管的服务",
      "该公司需要在应用程序中存储大型重要文档"
    ],
    "answerCues": {
      "B": [
        "并使用 AWS KMS 进行对象加密"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "183": {
    "when": "且 API 服务已扩展至最大数量 + 并且必须最大限度地提高运维效率",
    "target": "新增一条新规则",
    "avoid": "",
    "questionCues": [
      "且 API 服务已扩展至最大数量",
      "并且必须最大限度地提高运维效率"
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
    "when": "传感器连接到 AWS IoT Core + 公司必须能在两个 AWS 区域摄取并存储这些数据",
    "target": "将 DynamoDB 表更新为全域表",
    "avoid": "",
    "questionCues": [
      "传感器连接到 AWS IoT Core",
      "公司必须能在两个 AWS 区域摄取并存储这些数据"
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
    "when": "解决方案架构师应该如何为行销团队提供 DynamoDB 表的适当访问权限",
    "target": "创建一个 IAM 角色",
    "avoid": "别选“将策略附加到 DynamoDB 表”。",
    "questionCues": [
      "解决方案架构师应该如何为行销团队提供 DynamoDB 表的适当访问权限"
    ],
    "answerCues": {
      "B": [
        "创建一个 IAM 角色"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "186": {
    "when": "解决方案架构师必须在两个同时 + 两个S3桶中的对象必须保持彼此同步",
    "target": "A：S3 Multi-Region 接入点；B：双向S3交叉Region复制（CRR）；E：S3版本控制",
    "avoid": "",
    "questionCues": [
      "解决方案架构师必须在两个同时",
      "两个S3桶中的对象必须保持彼此同步"
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
    "when": "定期作业需要 120-600 秒才能运作 + 并且必须减少堆栈的运维开销",
    "target": "B：AWS IoT Core；D：将元数据写入AmazonDocumentDB（兼容于MongoDB）；E：Amazon S3",
    "avoid": "",
    "questionCues": [
      "定期作业需要 120-600 秒才能运作",
      "并且必须减少堆栈的运维开销"
    ],
    "answerCues": {
      "B": [
        "AWS IoT Core"
      ],
      "D": [
        "将元数据写入AmazonDocumentDB（兼容于MongoDB）"
      ],
      "E": [
        "Amazon S3"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "188": {
    "when": "由于数据监管要求或对个位数毫秒延迟的要求 + 开发人员必须能够",
    "target": "安装AWS Outposts",
    "avoid": "",
    "questionCues": [
      "由于数据监管要求或对个位数毫秒延迟的要求",
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
    "target": "A：在 CloudFront 域上新增自定义标头和随机值；E：部署包含适当规则群组的 AWS WAF Web ACL",
    "avoid": "",
    "questionCues": [
      "公司必须防止攻击并确保业务连续性",
      "并在持续攻击期间将服务中断降至最低"
    ],
    "answerCues": {
      "A": [
        "在 CloudFront 域上新增自定义标头和随机值"
      ],
      "E": [
        "部署包含适当规则群组的 AWS WAF Web ACL"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "190": {
    "when": "运维团队发现ALB有时会返回HTTP 503 Service Unavailable 错误",
    "target": "为分发配置源故障转移",
    "avoid": "",
    "questionCues": [
      "运维团队发现ALB有时会返回HTTP 503 Service Unavailable 错误"
    ],
    "answerCues": {
      "C": [
        "为分发配置源故障转移"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "191": {
    "when": "一家公司正计划将应用程序迁移到AWS + 解决方案架构师必须设计一个安全且可扩展的容器化解决方案",
    "target": "参考ECS任务定义中的EFS文件系统ID、容器挂载点和EFS授权IAM角色",
    "avoid": "",
    "questionCues": [
      "一家公司正计划将应用程序迁移到AWS",
      "解决方案架构师必须设计一个安全且可扩展的容器化解决方案"
    ],
    "answerCues": {
      "A": [
        "参考ECS任务定义中的EFS文件系统ID、容器挂载点和EFS授权IAM角色"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "192": {
    "when": "分配到 EC2 实例 + 客户在测试视窗期间必须使用相同版本的业务逻辑",
    "target": "使用加权目标组",
    "avoid": "",
    "questionCues": [
      "分配到 EC2 实例",
      "客户在测试视窗期间必须使用相同版本的业务逻辑"
    ],
    "answerCues": {
      "B": [
        "使用加权目标组"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "193": {
    "when": "调查发现文件系统性能下降 + 解决方案架构师必须在指定维护窗口内提高文件系统性能",
    "target": "将存储类型更新为SSD",
    "avoid": "",
    "questionCues": [
      "调查发现文件系统性能下降",
      "解决方案架构师必须在指定维护窗口内提高文件系统性能"
    ],
    "answerCues": {
      "B": [
        "将存储类型更新为SSD"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "194": {
    "when": "Amazon S3 + 公司必须修改应用程序才能将应用程序部署在两个AWSRegions中",
    "target": "将修改后的应用程序部署到两个Regions",
    "avoid": "",
    "questionCues": [
      "Amazon S3",
      "公司必须修改应用程序才能将应用程序部署在两个AWSRegions中"
    ],
    "answerCues": {
      "B": [
        "将修改后的应用程序部署到两个Regions"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "195": {
    "when": "游戏应用需要高性能计算（HPC） + 公司需要优化应用性能的迁移策略",
    "target": "在 ALB 后面创建由 c5.large Amazon EC2 按需实例组成的 Auto Scaling 组",
    "avoid": "",
    "questionCues": [
      "游戏应用需要高性能计算（HPC）",
      "公司需要优化应用性能的迁移策略"
    ],
    "answerCues": {
      "C": [
        "在 ALB 后面创建由 c5.large Amazon EC2 按需实例组成的 Auto Scaling 组"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "196": {
    "when": "基础设施需要高可用 + 并最大限度减少运维开销",
    "target": "C：将应用程序前端；E：以 S3 中的数据生成报表",
    "avoid": "",
    "questionCues": [
      "基础设施需要高可用",
      "并最大限度减少运维开销"
    ],
    "answerCues": {
      "C": [
        "将应用程序前端"
      ],
      "E": [
        "以 S3 中的数据生成报表"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "197": {
    "when": "并且必须将日志保留 5 年 + 公司的安全团队也必须收到电子邮件通知",
    "target": "A：配置 AWS CloudTrail 以记录 S3 数据事件；D：Amazon SNS；F：创建新的 S3 桶存放日志",
    "avoid": "别选“为S3存储桶配置S3服务器访问日志记录”。",
    "questionCues": [
      "并且必须将日志保留 5 年",
      "公司的安全团队也必须收到电子邮件通知"
    ],
    "answerCues": {
      "A": [
        "配置 AWS CloudTrail 以记录 S3 数据事件"
      ],
      "D": [
        "Amazon SNS"
      ],
      "F": [
        "创建新的 S3 桶存放日志"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "198": {
    "when": "本地服务器需要访问三个 VPC 中的全部 EC2 实例 + 哪两个步骤能以最低成本满足要求",
    "target": "A：在离数据中心最近的Region中建立Direct Connect网关；D：创建公共 VIF",
    "avoid": "核对题目限制与完整选项。",
    "questionCues": [
      "本地服务器需要访问三个 VPC 中的全部 EC2 实例",
      "哪两个步骤能以最低成本满足要求"
    ],
    "answerCues": {
      "A": [
        "在离数据中心最近的Region中建立Direct Connect网关"
      ],
      "D": [
        "创建公共 VIF"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "199": {
    "when": "一家公司正在使用 AWS Organizations 来管理数百个 AWS 账户",
    "target": "A：在所有账户中启用 AWS Config；C：启用组织的所有功能；D：AWS Firewall Manager",
    "avoid": "",
    "questionCues": [
      "一家公司正在使用 AWS Organizations 来管理数百个 AWS 账户"
    ],
    "answerCues": {
      "A": [
        "在所有账户中启用 AWS Config"
      ],
      "C": [
        "启用组织的所有功能"
      ],
      "D": [
        "AWS Firewall Manager"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "200": {
    "when": "将授予 AWS 环境的访问权限 + 他们无法访问 AWS 环境",
    "target": "B：为联合用户或联合组创建的 IAM 角色；D：Web 门户；F：公司的 IdP 定义的 SAML 断言",
    "avoid": "",
    "questionCues": [
      "将授予 AWS 环境的访问权限",
      "他们无法访问 AWS 环境"
    ],
    "answerCues": {
      "B": [
        "为联合用户或联合组创建的 IAM 角色"
      ],
      "D": [
        "Web 门户"
      ],
      "F": [
        "公司的 IdP 定义的 SAML 断言"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "201": {
    "when": "此解决方案必须保证凭证的安全 + 并且必须提供定期自动轮调凭证的能力",
    "target": "在数据库实例前部署 Amazon RDS Proxy",
    "avoid": "",
    "questionCues": [
      "此解决方案必须保证凭证的安全",
      "并且必须提供定期自动轮调凭证的能力"
    ],
    "answerCues": {
      "A": [
        "在数据库实例前部署 Amazon RDS Proxy"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "202": {
    "when": "建立灾难恢复 (DR) 解决方案 + Web 应用程序必须故障转移到辅助环境",
    "target": "增加Auto Scaling组所需的容量",
    "avoid": "",
    "questionCues": [
      "建立灾难恢复 (DR) 解决方案",
      "Web 应用程序必须故障转移到辅助环境"
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
    "when": "Amazon Aurora MySQL + 该公司需要一个能够更快迁移数据库的迁移解决方案",
    "target": "AWS Snowball Edge",
    "avoid": "",
    "questionCues": [
      "Amazon Aurora MySQL",
      "该公司需要一个能够更快迁移数据库的迁移解决方案"
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
    "when": "且遗失的数据不超过 1 天 + 需要一个能够优化运维效率和成本的备份解决方案",
    "target": "若发生故障",
    "avoid": "",
    "questionCues": [
      "且遗失的数据不超过 1 天",
      "需要一个能够优化运维效率和成本的备份解决方案"
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
    "when": "根据公司要求 + 所有数据在传输和静态时都必须加密",
    "target": "A：S3 服务器端加密；C：存储桶策略 + 拒绝；E：HTTP请求重定向 + HTTPS请求",
    "avoid": "",
    "questionCues": [
      "根据公司要求",
      "所有数据在传输和静态时都必须加密"
    ],
    "answerCues": {
      "A": [
        "S3 服务器端加密"
      ],
      "C": [
        "存储桶策略",
        "拒绝"
      ],
      "E": [
        "HTTP请求重定向",
        "HTTPS请求"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "206": {
    "when": "生产数据库的凭证必须使用只有 IT 安全团队的 IAM 用户群组成员才能访问的密钥进行加密",
    "target": "限制对机密及客户管理密钥的访问",
    "avoid": "",
    "questionCues": [
      "生产数据库的凭证必须使用只有 IT 安全团队的 IAM 用户群组成员才能访问的密钥进行加密"
    ],
    "answerCues": {
      "D": [
        "限制对机密及客户管理密钥的访问"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "207": {
    "when": "解决方案架构师需要实施一个解决方案来解决扩展问题并在应用程序扩展时最大限度地降低许可成本",
    "target": "将 SQL Server 数据库迁移到新平台",
    "avoid": "",
    "questionCues": [
      "解决方案架构师需要实施一个解决方案来解决扩展问题并在应用程序扩展时最大限度地降低许可成本"
    ],
    "answerCues": {
      "A": [
        "将 SQL Server 数据库迁移到新平台"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "208": {
    "when": "ALB + 解决方案架构师需要通过最小化运维开销的解决方案来解决此问题",
    "target": "AWS Global Accelerator",
    "avoid": "",
    "questionCues": [
      "ALB",
      "解决方案架构师需要通过最小化运维开销的解决方案来解决此问题"
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
    "when": "MQTT 代理将数据存储在单一 Amazon EC2 实例上 + 公司必须提高解决方案的可靠性",
    "target": "配置AWS IoT 规则来存储数据",
    "avoid": "",
    "questionCues": [
      "MQTT 代理将数据存储在单一 Amazon EC2 实例上",
      "公司必须提高解决方案的可靠性"
    ],
    "answerCues": {
      "B": [
        "配置AWS IoT 规则来存储数据"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "210": {
    "when": "用户必须使用 SSH 和 EC2 SSH 密钥对来访问实例 + 并将密钥保存在安全加密的地方",
    "target": "更新Secrets Manager中的私钥",
    "avoid": "",
    "questionCues": [
      "用户必须使用 SSH 和 EC2 SSH 密钥对来访问实例",
      "并将密钥保存在安全加密的地方"
    ],
    "answerCues": {
      "A": [
        "更新Secrets Manager中的私钥"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "211": {
    "when": "解决方案架构师必须为公司提供准确的清单 + 以便公司能够规划经济高效的迁移",
    "target": "识别不活动的服务器",
    "avoid": "",
    "questionCues": [
      "解决方案架构师必须为公司提供准确的清单",
      "以便公司能够规划经济高效的迁移"
    ],
    "answerCues": {
      "C": [
        "识别不活动的服务器"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "212": {
    "when": "数据库崩溃并导致应用程序停机 + 该公司希望保护数据库免于崩溃",
    "target": "Amazon SQS",
    "avoid": "",
    "questionCues": [
      "数据库崩溃并导致应用程序停机",
      "该公司希望保护数据库免于崩溃"
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
    "when": "停机时间不能超过 10 分钟 + 公司希望最大限度减少持续维护",
    "target": "将仪表板导入新工作区",
    "avoid": "",
    "questionCues": [
      "停机时间不能超过 10 分钟",
      "公司希望最大限度减少持续维护"
    ],
    "answerCues": {
      "B": [
        "将仪表板导入新工作区"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "214": {
    "when": "一家公司需要将其客户交易数据库从本地迁移到AWS + 根据新的安全要求",
    "target": "启用自动轮换",
    "avoid": "",
    "questionCues": [
      "一家公司需要将其客户交易数据库从本地迁移到AWS",
      "根据新的安全要求"
    ],
    "answerCues": {
      "B": [
        "启用自动轮换"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "215": {
    "when": "公司需要一个连接到 on-premises 网络的 VPC",
    "target": "B：将模板部署到共享服务账户；D：使用 AWS Site-to-Site VPN 连接到 on-premises 网络",
    "avoid": "",
    "questionCues": [
      "公司需要一个连接到 on-premises 网络的 VPC"
    ],
    "answerCues": {
      "B": [
        "将模板部署到共享服务账户"
      ],
      "D": [
        "使用 AWS Site-to-Site VPN 连接到 on-premises 网络"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "216": {
    "when": "公司需要能够对组织中所有 AWS 账户的所有互联网出站流量添加集中管理的基于规则的过滤",
    "target": "使其指向这些端点",
    "avoid": "",
    "questionCues": [
      "公司需要能够对组织中所有 AWS 账户的所有互联网出站流量添加集中管理的基于规则的过滤"
    ],
    "answerCues": {
      "B": [
        "使其指向这些端点"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "217": {
    "when": "公司希望架构师重新设计方案以满足以下安全要求 + 所有资源都应高可用",
    "target": "创建 ALB",
    "avoid": "",
    "questionCues": [
      "公司希望架构师重新设计方案以满足以下安全要求",
      "所有资源都应高可用"
    ],
    "answerCues": {
      "D": [
        "创建 ALB"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "218": {
    "when": "该公司不希望可以从公共互联网访问 API + 也不希望专有数据遍历公共互联网",
    "target": "仅允许来自 VPC 端点的访问",
    "avoid": "",
    "questionCues": [
      "该公司不希望可以从公共互联网访问 API",
      "也不希望专有数据遍历公共互联网"
    ],
    "answerCues": {
      "B": [
        "仅允许来自 VPC 端点的访问"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "219": {
    "when": "设置的 EC2 安全组 + 并在工程师对 EC2 安全设置做出不合规修改时发送告警",
    "target": "在 EC2 安全群组上启用 AWS Config 以追踪任何不合规的变更",
    "avoid": "",
    "questionCues": [
      "设置的 EC2 安全组",
      "并在工程师对 EC2 安全设置做出不合规修改时发送告警"
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
    "when": "需要读取、收集并聚合传感器数据 + Amazon Kinesis Data Streams",
    "target": "A：对流进行重新分片以增加流中的分片数量；C：使用具有增强扇出功能的消费者；E：在消费者逻辑中使用错误重试和指数退避机制",
    "avoid": "",
    "questionCues": [
      "需要读取、收集并聚合传感器数据",
      "Amazon Kinesis Data Streams"
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
    "when": "公司需要列出所有 CPU 或内存利用率偏低的 Amazon EC2 实例",
    "target": "从组织管理账户中的AWS Cost Explorer 撷取资源最佳化建议",
    "avoid": "",
    "questionCues": [
      "公司需要列出所有 CPU 或内存利用率偏低的 Amazon EC2 实例"
    ],
    "answerCues": {
      "B": [
        "从组织管理账户中的AWS Cost Explorer 撷取资源最佳化建议"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "222": {
    "when": "以将流量引导至EC2 实例 + Auto Scaling组就会替换一个实例",
    "target": "B：安装 Amazon CloudWatch 代理；D：创建告警；E：AWS Lambda",
    "avoid": "",
    "questionCues": [
      "以将流量引导至EC2 实例",
      "Auto Scaling组就会替换一个实例"
    ],
    "answerCues": {
      "B": [
        "安装 Amazon CloudWatch 代理"
      ],
      "D": [
        "创建告警"
      ],
      "E": [
        "AWS Lambda"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "223": {
    "when": "ECS + 应用程序必须自动调整任务数量以响应 Amazon CloudWatch 警报",
    "target": "为每个 ECS 服务实施服务 Auto Scaling",
    "avoid": "",
    "questionCues": [
      "ECS",
      "应用程序必须自动调整任务数量以响应 Amazon CloudWatch 警报"
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
    "when": "EC2 + 自动删除发现 Critical（严重）或 High（高危）问题的新镜像标签",
    "target": "由状态机删除相关镜像标签",
    "avoid": "",
    "questionCues": [
      "EC2",
      "自动删除发现 Critical（严重）或 High（高危）问题的新镜像标签"
    ],
    "answerCues": {
      "A": [
        "由状态机删除相关镜像标签"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "225": {
    "when": "使用 AWS Organizations 管理账户 + 公司希望优化未来 3 年的计算成本",
    "target": "使用管理账户层级的建议从管理账户为组织购买计算储蓄计划",
    "avoid": "",
    "questionCues": [
      "使用 AWS Organizations 管理账户",
      "公司希望优化未来 3 年的计算成本"
    ],
    "answerCues": {
      "B": [
        "使用管理账户层级的建议从管理账户为组织购买计算储蓄计划"
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
    "when": "应用托管在 us-east-1 区域的 EC2 实例上 + 架构师应如何改善上传性能",
    "target": "配置存储桶以使用 S3 传输加速",
    "avoid": "",
    "questionCues": [
      "应用托管在 us-east-1 区域的 EC2 实例上",
      "架构师应如何改善上传性能"
    ],
    "answerCues": {
      "C": [
        "配置存储桶以使用 S3 传输加速"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "228": {
    "when": "需要具备容错能力及可扩展性 + 某些频繁访问的数据必须能被所有应用服务器持续访问",
    "target": "所有应用程序将在部署时安装该卷",
    "avoid": "",
    "questionCues": [
      "需要具备容错能力及可扩展性",
      "某些频繁访问的数据必须能被所有应用服务器持续访问"
    ],
    "answerCues": {
      "D": [
        "所有应用程序将在部署时安装该卷"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "229": {
    "when": "解决方案架构师会将数据库迁移到现代数据架构 + 解决方案架构师必须在近乎零停机的情况下迁移数据库",
    "target": "使用数据库原生高可用工具",
    "avoid": "",
    "questionCues": [
      "解决方案架构师会将数据库迁移到现代数据架构",
      "解决方案架构师必须在近乎零停机的情况下迁移数据库"
    ],
    "answerCues": {
      "C": [
        "使用数据库原生高可用工具"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "230": {
    "when": "解决方案架构师需要降低成本 + 这些准则必须最大限度地减少整个环境的数据传输费用",
    "target": "C：在所有服务提供方应用部署中；D：访问对应可用区专属的端点服务",
    "avoid": "",
    "questionCues": [
      "解决方案架构师需要降低成本",
      "这些准则必须最大限度地减少整个环境的数据传输费用"
    ],
    "answerCues": {
      "C": [
        "在所有服务提供方应用部署中"
      ],
      "D": [
        "访问对应可用区专属的端点服务"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "231": {
    "when": "该公司希望将备份移至Amazon S3上更强大的云端存储",
    "target": "将夜间数据库导出写入新的 SMB 文件共用",
    "avoid": "",
    "questionCues": [
      "该公司希望将备份移至Amazon S3上更强大的云端存储"
    ],
    "answerCues": {
      "A": [
        "将夜间数据库导出写入新的 SMB 文件共用"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "232": {
    "when": "某公司需要建立on-premises数据中心到AWS的连接 + 公司还必须降低网络出站流量成本",
    "target": "配置中转 VIF",
    "avoid": "别选“创建从中央 VPC 到所有其他 VPC 发起的 VPC 对等连接”。",
    "questionCues": [
      "某公司需要建立on-premises数据中心到AWS的连接",
      "公司还必须降低网络出站流量成本"
    ],
    "answerCues": {
      "B": [
        "配置中转 VIF"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "233": {
    "when": "在管理账户中 + 解决方案架构师需要建立一个 IAM 用户",
    "target": "使用信任策略授予 IAM 用户对角色的访问权限",
    "avoid": "",
    "questionCues": [
      "在管理账户中",
      "解决方案架构师需要建立一个 IAM 用户"
    ],
    "answerCues": {
      "D": [
        "使用信任策略授予 IAM 用户对角色的访问权限"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "234": {
    "when": "一家公司希望使用 AWS 为本地应用提供灾难恢复 + 方案必须原生支持故障转移和回切",
    "target": "将该文件系统挂载到 AWS 服务器",
    "avoid": "",
    "questionCues": [
      "一家公司希望使用 AWS 为本地应用提供灾难恢复",
      "方案必须原生支持故障转移和回切"
    ],
    "answerCues": {
      "D": [
        "将该文件系统挂载到 AWS 服务器"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "235": {
    "when": "整体性能远低于预期 + 以最大限度提高集群性能",
    "target": "A：单一Availability Zone内启动；C：启用了 Elastic Fabric Adapter；F：Amazon FSx for Lustre",
    "avoid": "",
    "questionCues": [
      "整体性能远低于预期",
      "以最大限度提高集群性能"
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
    "target": "使用AWS Lambda函数来处理数据转换",
    "avoid": "",
    "questionCues": [
      "Amazon S3",
      "解决方案架构师必须在AWS上创建高度可用且可扩展的新设计"
    ],
    "answerCues": {
      "C": [
        "使用AWS Lambda函数来处理数据转换"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "238": {
    "when": "按自定义的每日、每周和每月要求保留备份 + 哪三个步骤能以最少运维开销满足要求",
    "target": "A：建立包含每个保留要求的备份规则的 AWS Backup 计划；B：配置一个 AWS Backup 计划将备份；D：新增至备份计划",
    "avoid": "",
    "questionCues": [
      "按自定义的每日、每周和每月要求保留备份",
      "哪三个步骤能以最少运维开销满足要求"
    ],
    "answerCues": {
      "A": [
        "建立包含每个保留要求的备份规则的 AWS Backup 计划"
      ],
      "B": [
        "配置一个 AWS Backup 计划将备份"
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
    "target": "B：将生存时间 (TTL) 设定为 30 秒；C：在Amazon DynamoDB中使用全域表；E：在各区域内",
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
        "在各区域内"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "241": {
    "when": "公司必须对解决方案进行现代化改造并将解决方案迁移到AWS + 以解决扩展挑战",
    "target": "从传输流读取数据以侦测异常",
    "avoid": "",
    "questionCues": [
      "公司必须对解决方案进行现代化改造并将解决方案迁移到AWS",
      "以解决扩展挑战"
    ],
    "answerCues": {
      "B": [
        "从传输流读取数据以侦测异常"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "242": {
    "when": "安全团队希望自动寻找并修复此安全漏洞的实例 + 确保凭证自动受到适当保护",
    "target": "如果发现凭据",
    "avoid": "",
    "questionCues": [
      "安全团队希望自动寻找并修复此安全漏洞的实例",
      "确保凭证自动受到适当保护"
    ],
    "answerCues": {
      "D": [
        "如果发现凭据"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "243": {
    "when": "需要由许多 AWS 账户中的数百个应用程序访问 + 不得通过公共网络访问S3存储桶",
    "target": "A：并更新桶策略；C：根据端点策略",
    "avoid": "别选“设定端点策略以允许访问 S3 接入点”。",
    "questionCues": [
      "需要由许多 AWS 账户中的数百个应用程序访问",
      "不得通过公共网络访问S3存储桶"
    ],
    "answerCues": {
      "A": [
        "并更新桶策略"
      ],
      "C": [
        "根据端点策略"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "244": {
    "when": "EC2 实例从本地托管的多个 + 该公司希望近乎即时地监控哪些 EC2 实例连接到数据库",
    "target": "建立一个 CloudWatch 日志订阅",
    "avoid": "",
    "questionCues": [
      "EC2 实例从本地托管的多个",
      "该公司希望近乎即时地监控哪些 EC2 实例连接到数据库"
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
    "target": "B：启用所有功能；D：创建 SCP；E：在管理账户中建立IAM角色",
    "avoid": "",
    "questionCues": [
      "从AWS计费和成本管理控制台记录当前成本",
      "公司有严格的合规要求"
    ],
    "answerCues": {
      "B": [
        "启用所有功能"
      ],
      "D": [
        "创建 SCP"
      ],
      "E": [
        "在管理账户中建立IAM角色"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "246": {
    "when": "建立和管理多个 AWS 账户 + 安全团队要求自己的 AWS 账户对所有账户具有只读访问权",
    "target": "建立一个具有只读访问权的新 IAM 角色",
    "avoid": "",
    "questionCues": [
      "建立和管理多个 AWS 账户",
      "安全团队要求自己的 AWS 账户对所有账户具有只读访问权"
    ],
    "answerCues": {
      "B": [
        "建立一个具有只读访问权的新 IAM 角色"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "247": {
    "when": "NAT + 分支 VPC 中的所有私有子网必须通过出口 VPC 将流量路由到互联网",
    "target": "建立中转网关",
    "avoid": "",
    "questionCues": [
      "NAT",
      "分支 VPC 中的所有私有子网必须通过出口 VPC 将流量路由到互联网"
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
    "when": "ALB + 解决方案架构师必须防止失败的登录尝试淹没身份验证服务",
    "target": "并将规则操作设定为阻止",
    "avoid": "",
    "questionCues": [
      "ALB",
      "解决方案架构师必须防止失败的登录尝试淹没身份验证服务"
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
    "when": "该公司希望将 SaaS 解决方案迁移到AWS + 并减少文件传输服务的运维开销",
    "target": "从该地址池创建 Elastic IP",
    "avoid": "",
    "questionCues": [
      "该公司希望将 SaaS 解决方案迁移到AWS",
      "并减少文件传输服务的运维开销"
    ],
    "answerCues": {
      "A": [
        "从该地址池创建 Elastic IP"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "250": {
    "when": "该应用程序需要在运行该应用程序的所有EC2实例之间建立高吞吐量、低延迟的网络连接",
    "target": "将 5 个新的 EC2 实例启动到群集置放群组",
    "avoid": "",
    "questionCues": [
      "该应用程序需要在运行该应用程序的所有EC2实例之间建立高吞吐量、低延迟的网络连接"
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
    "when": "六个合作伙伴中的每一个每天都会访问 API 一次 + 同时最大限度地降低成本",
    "target": "创建 API 密钥",
    "avoid": "",
    "questionCues": [
      "六个合作伙伴中的每一个每天都会访问 API 一次",
      "同时最大限度地降低成本"
    ],
    "answerCues": {
      "D": [
        "创建 API 密钥"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "252": {
    "when": "公司的数据库团队必须监控所有数据库上的所有数据活动",
    "target": "使其消费该 Kinesis 数据流",
    "avoid": "",
    "questionCues": [
      "公司的数据库团队必须监控所有数据库上的所有数据活动"
    ],
    "answerCues": {
      "C": [
        "使其消费该 Kinesis 数据流"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "253": {
    "when": "解决方案架构师需要配置Auto Scaling组 + 以便以最具成本效益的方式满足需求",
    "target": "配置 Auto Scaling 群组以部署 r6g.4xlarge（内存最佳化）实例",
    "avoid": "",
    "questionCues": [
      "解决方案架构师需要配置Auto Scaling组",
      "以便以最具成本效益的方式满足需求"
    ],
    "answerCues": {
      "C": [
        "配置 Auto Scaling 群组以部署 r6g.4xlarge（内存最佳化）实例"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "254": {
    "when": "应用程序对该表的读取在一天中呈突发性发生 + 公司需要降低 DynamoDB 相关成本",
    "target": "部署DynamoDB Accelerator (DAX) + 使用预配置容量模式 + 配置DynamoDB自动扩缩容",
    "avoid": "别选“在 Cost Explorer 购买 Savings Plans”。",
    "questionCues": [
      "应用程序对该表的读取在一天中呈突发性发生",
      "公司需要降低 DynamoDB 相关成本"
    ],
    "answerCues": {
      "D": [
        "部署DynamoDB Accelerator (DAX)",
        "使用预配置容量模式",
        "配置DynamoDB自动扩缩容"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "255": {
    "when": "且端点处于可用状态 + 客户端无法通过 VPC 端点提交日志",
    "target": "A：以允许与 NLB 子网进行通讯；C：确保其允许来自 NLB 所在子网的入站流量",
    "avoid": "",
    "questionCues": [
      "且端点处于可用状态",
      "客户端无法通过 VPC 端点提交日志"
    ],
    "answerCues": {
      "A": [
        "以允许与 NLB 子网进行通讯"
      ],
      "C": [
        "确保其允许来自 NLB 所在子网的入站流量"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "256": {
    "when": "所有S3对象都被频繁访问 + 解决方案架构师需要通过对应用程序进行最小的更改来优化成本",
    "target": "指定 SSE-S3",
    "avoid": "",
    "questionCues": [
      "所有S3对象都被频繁访问",
      "解决方案架构师需要通过对应用程序进行最小的更改来优化成本"
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
    "when": "媒体存储应用程序将用户照片上传到Amazon S3以供AWS Lambda函数处理",
    "target": "B：DynamoDB 表的 WCU；D：新增 Amazon Simple Queue Service (Amazon SQS) 队列",
    "avoid": "",
    "questionCues": [
      "媒体存储应用程序将用户照片上传到Amazon S3以供AWS Lambda函数处理"
    ],
    "answerCues": {
      "B": [
        "DynamoDB 表的 WCU"
      ],
      "D": [
        "新增 Amazon Simple Queue Service (Amazon SQS) 队列"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "258": {
    "when": "该公司希望通过将应用程序迁移到AWS来解决这些挑战 + 公司需要加速应用程序开发",
    "target": "使用Amazon S3存储上传的媒体文件",
    "avoid": "",
    "questionCues": [
      "该公司希望通过将应用程序迁移到AWS来解决这些挑战",
      "公司需要加速应用程序开发"
    ],
    "answerCues": {
      "D": [
        "使用Amazon S3存储上传的媒体文件"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "259": {
    "when": "以找到提高应用程序性能的方法 + 日志将不再可用",
    "target": "配置 EC2 实例",
    "avoid": "",
    "questionCues": [
      "以找到提高应用程序性能的方法",
      "日志将不再可用"
    ],
    "answerCues": {
      "B": [
        "配置 EC2 实例"
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
    "when": "解决方案架构师需要集中公司AWS账户的计费和管理 + 该公司还希望使用临时凭证而不是长期访问密钥",
    "target": "A：确保每个账户都接受邀请；C：AWS IAM Identity Center；E：将权限集",
    "avoid": "",
    "questionCues": [
      "解决方案架构师需要集中公司AWS账户的计费和管理",
      "该公司还希望使用临时凭证而不是长期访问密钥"
    ],
    "answerCues": {
      "A": [
        "确保每个账户都接受邀请"
      ],
      "C": [
        "AWS IAM Identity Center"
      ],
      "E": [
        "将权限集"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "262": {
    "when": "迁移到 AWS 来管理与 20 个不经常 + 同时最大限度地降低成本",
    "target": "并使用 ECS 任务伸缩",
    "avoid": "",
    "questionCues": [
      "迁移到 AWS 来管理与 20 个不经常",
      "同时最大限度地降低成本"
    ],
    "answerCues": {
      "B": [
        "并使用 ECS 任务伸缩"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "263": {
    "when": "并需要6小时才能完成运作 + 解决方案架构师必须审查架构并提出解决方案以最大限度地降低计算成本",
    "target": "将主节点和核心节点部署在按需实例上 + 终止整个集群",
    "avoid": "别选“继续将所有节点部署在按需实例上”。",
    "questionCues": [
      "并需要6小时才能完成运作",
      "解决方案架构师必须审查架构并提出解决方案以最大限度地降低计算成本"
    ],
    "answerCues": {
      "B": [
        "将主节点和核心节点部署在按需实例上",
        "终止整个集群"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "264": {
    "when": "EC2 实例在 VPC 的三个私有子网中运行 + 该解决方案还必须能够自动缓解故障",
    "target": "如果NAT网关不健康",
    "avoid": "",
    "questionCues": [
      "EC2 实例在 VPC 的三个私有子网中运行",
      "该解决方案还必须能够自动缓解故障"
    ],
    "answerCues": {
      "C": [
        "如果NAT网关不健康"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "265": {
    "when": "有 540 个开发者成员账户必须迁移到新的开发者组织 + 以便每个账户都可以作为独立账户进行操作",
    "target": "B：将每个开发者账户从旧组织中移除；E：以传送邀请给开发者账户；F：让每个开发者登录他们的账户并确认加入新的开发者组织",
    "avoid": "",
    "questionCues": [
      "有 540 个开发者成员账户必须迁移到新的开发者组织",
      "以便每个账户都可以作为独立账户进行操作"
    ],
    "answerCues": {
      "B": [
        "将每个开发者账户从旧组织中移除"
      ],
      "E": [
        "以传送邀请给开发者账户"
      ],
      "F": [
        "让每个开发者登录他们的账户并确认加入新的开发者组织"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "266": {
    "when": "解决方案架构师必须推荐一种集成该检测逻辑的方案 + 并尽量缩短图片写入到对外提供之间的延迟",
    "target": "使用调用 AWS Lambda 函数的 S3 事件通知",
    "avoid": "",
    "questionCues": [
      "解决方案架构师必须推荐一种集成该检测逻辑的方案",
      "并尽量缩短图片写入到对外提供之间的延迟"
    ],
    "answerCues": {
      "C": [
        "使用调用 AWS Lambda 函数的 S3 事件通知"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "267": {
    "when": "由于扩展事件 + 解决方案架构师应该建议什么来以最少的运维开销实现应用程序部署流程的自动化",
    "target": "建立安装了 CodeDeploy 代理程序的新 AMI",
    "avoid": "",
    "questionCues": [
      "由于扩展事件",
      "解决方案架构师应该建议什么来以最少的运维开销实现应用程序部署流程的自动化"
    ],
    "answerCues": {
      "D": [
        "建立安装了 CodeDeploy 代理程序的新 AMI"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "268": {
    "when": "自动处理EC2实例的替换 + 该公司需要最大限度地减少改用新解决方案期间的停机时间",
    "target": "为该组关联一个新的启动模板",
    "avoid": "",
    "questionCues": [
      "自动处理EC2实例的替换",
      "该公司需要最大限度地减少改用新解决方案期间的停机时间"
    ],
    "answerCues": {
      "B": [
        "为该组关联一个新的启动模板"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "269": {
    "when": "公司希望对开发者在这些 AWS 账户中部署的所有 EC2 实例和 VPC 基础设施",
    "target": "与开发者账户共享产品组合",
    "avoid": "",
    "questionCues": [
      "公司希望对开发者在这些 AWS 账户中部署的所有 EC2 实例和 VPC 基础设施"
    ],
    "answerCues": {
      "C": [
        "与开发者账户共享产品组合"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "270": {
    "when": "解决方案架构师必须推荐一种解决方案 + 拒绝访问特别指定的Regions以外的任何操作",
    "target": "创建组织单元（OU）",
    "avoid": "",
    "questionCues": [
      "解决方案架构师必须推荐一种解决方案",
      "拒绝访问特别指定的Regions以外的任何操作"
    ],
    "answerCues": {
      "C": [
        "创建组织单元（OU）"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "271": {
    "when": "公司需要创建一种解耦、可扩展的架构 + 同时尽量降低运营成本",
    "target": "使用 AWS Lambda 进行业务逻辑",
    "avoid": "",
    "questionCues": [
      "公司需要创建一种解耦、可扩展的架构",
      "同时尽量降低运营成本"
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
    "when": "分布在三个可用区中 + 解决方案架构师需要利用 AWS 服务设计一种跨区域数据恢复方案",
    "target": "辅助数据库位于 us-west-2",
    "avoid": "",
    "questionCues": [
      "分布在三个可用区中",
      "解决方案架构师需要利用 AWS 服务设计一种跨区域数据恢复方案"
    ],
    "answerCues": {
      "B": [
        "辅助数据库位于 us-west-2"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "273": {
    "when": "一家公司正在使用AWS Organizations来管理多个账户 + 并以最少的配置进行集中管理",
    "target": "将特定成员账户与新的OU相关联",
    "avoid": "",
    "questionCues": [
      "一家公司正在使用AWS Organizations来管理多个账户",
      "并以最少的配置进行集中管理"
    ],
    "answerCues": {
      "D": [
        "将特定成员账户与新的OU相关联"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "274": {
    "when": "当用户访问其报告时 + 哪一组操作会立即修复安全性问题而不影响应用程序的正常工作流程",
    "target": "使用 Amazon S3 的阻止公有访问功能",
    "avoid": "别选“查看 AWS Trusted Advisor 存储桶权限检查并实作建议的操作”。",
    "questionCues": [
      "当用户访问其报告时",
      "哪一组操作会立即修复安全性问题而不影响应用程序的正常工作流程"
    ],
    "answerCues": {
      "D": [
        "使用 Amazon S3 的阻止公有访问功能"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "275": {
    "when": "解决方案架构师需要设计一种无需停机、并尽可能缩短迁移所需时间的迁移策略 + 迁移完成时",
    "target": "A：AWS SCT + 数据库架构迁移到目标数据库；C：VPC 对等互连；E：完整载入加变更数据撷取（CDC）迁移 + 变更 CNAME 记录",
    "avoid": "别选“并包含源数据库的架构和初始数据”。",
    "questionCues": [
      "解决方案架构师需要设计一种无需停机、并尽可能缩短迁移所需时间的迁移策略",
      "迁移完成时"
    ],
    "answerCues": {
      "A": [
        "AWS SCT",
        "数据库架构迁移到目标数据库"
      ],
      "C": [
        "VPC 对等互连"
      ],
      "E": [
        "完整载入加变更数据撷取（CDC）迁移",
        "变更 CNAME 记录"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "276": {
    "when": "后端处理逾时设定为10秒 + 解决方案架构师需要分析错误的订单消息并确保系统继续处理后续消息",
    "target": "配置一个新的SQS标准队列作为死信队列来隔离错误消息",
    "avoid": "",
    "questionCues": [
      "后端处理逾时设定为10秒",
      "解决方案架构师需要分析错误的订单消息并确保系统继续处理后续消息"
    ],
    "answerCues": {
      "D": [
        "配置一个新的SQS标准队列作为死信队列来隔离错误消息"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "277": {
    "when": "一家公司使用 AWS Step Functions 自动化了其机器学习模型的夜间重新训练",
    "target": "A：Amazon SNS + 「电子邮件」类型订阅；B：将输入参数转送到 SNS 主题；C：Catch 字段 + 包含 \"ErrorEquals\": [\"States.ALL\"]",
    "avoid": "别选“Amazon SES”。",
    "questionCues": [
      "一家公司使用 AWS Step Functions 自动化了其机器学习模型的夜间重新训练"
    ],
    "answerCues": {
      "A": [
        "Amazon SNS",
        "「电子邮件」类型订阅"
      ],
      "B": [
        "将输入参数转送到 SNS 主题"
      ],
      "C": [
        "Catch 字段",
        "包含 \"ErrorEquals\": [\"States.ALL\"]"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "278": {
    "when": "VPC + 使用驻留在 company.example DNS 区域中的主机名称进行访问",
    "target": "建立解析程序规则",
    "avoid": "",
    "questionCues": [
      "VPC",
      "使用驻留在 company.example DNS 区域中的主机名称进行访问"
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
    "target": "仅将流量路由到获准通信的 VPC",
    "avoid": "",
    "questionCues": [
      "安全审核显示",
      "每个VPC 必须只能与一组预先定义的、有限的授权VPC 进行通讯"
    ],
    "answerCues": {
      "C": [
        "仅将流量路由到获准通信的 VPC"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "280": {
    "when": "迁移并重新托管到AWS + 但希望采用一种简化的方式来管理所有员工对AWS上的应用程序的访问",
    "target": "以访问该应用程序",
    "avoid": "",
    "questionCues": [
      "迁移并重新托管到AWS",
      "但希望采用一种简化的方式来管理所有员工对AWS上的应用程序的访问"
    ],
    "answerCues": {
      "C": [
        "以访问该应用程序"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "281": {
    "when": "该公司担心当前解决方案的高成本 + 解决方案架构师必须提出最具成本效益的解决方案",
    "target": "使用 AWS Glue Data Catalog 和 Amazon Athena 查询数据",
    "avoid": "",
    "questionCues": [
      "该公司担心当前解决方案的高成本",
      "解决方案架构师必须提出最具成本效益的解决方案"
    ],
    "answerCues": {
      "B": [
        "使用 AWS Glue Data Catalog 和 Amazon Athena 查询数据"
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
    "when": "一家公司希望将本地系统中的数据发送到 Amazon S3 存储桶 + 数据必须通过私有连接传输",
    "target": "A：建立与私有 VIF 的 AWS Direct Connect 连接；C：在网络账户中建立Amazon S3接口端点",
    "avoid": "",
    "questionCues": [
      "一家公司希望将本地系统中的数据发送到 Amazon S3 存储桶",
      "数据必须通过私有连接传输"
    ],
    "answerCues": {
      "A": [
        "建立与私有 VIF 的 AWS Direct Connect 连接"
      ],
      "C": [
        "在网络账户中建立Amazon S3接口端点"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "284": {
    "when": "该公司希望降低 DynamoDB 成本并最大限度地减少 IT 员工的运维开销",
    "target": "为表格启用 Dynamo DB 自动扩缩容",
    "avoid": "",
    "questionCues": [
      "该公司希望降低 DynamoDB 成本并最大限度地减少 IT 员工的运维开销"
    ],
    "answerCues": {
      "C": [
        "为表格启用 Dynamo DB 自动扩缩容"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "285": {
    "when": "AWS Lambda + 公司希望通过即时显示评论来提高用户参与度",
    "target": "使用 AWS AppSync 并利用 WebSocket 来传递评论",
    "avoid": "",
    "questionCues": [
      "AWS Lambda",
      "公司希望通过即时显示评论来提高用户参与度"
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
    "when": "这些 S3 接入点必须只能从 VPC 内访问 + 以最少运维工作强制实施这一要求的方法是什么",
    "target": "在组织的根层级建立 SCP 以拒绝 s3:CreateAccessPoint 操作",
    "avoid": "",
    "questionCues": [
      "这些 S3 接入点必须只能从 VPC 内访问",
      "以最少运维工作强制实施这一要求的方法是什么"
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
    "when": "解决方案架构师必须使用蓝/绿部署方法更新AWSElastic Beanstalk内的应用程序环境",
    "target": "选择交换环境 URL 选项",
    "avoid": "",
    "questionCues": [
      "解决方案架构师必须使用蓝/绿部署方法更新AWSElastic Beanstalk内的应用程序环境"
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
    "when": "欧洲客户必须能够访问与美国客户相同的数据 + 且不能接受较高的应用延迟或过时数据",
    "target": "然后恢复写入",
    "avoid": "",
    "questionCues": [
      "欧洲客户必须能够访问与美国客户相同的数据",
      "且不能接受较高的应用延迟或过时数据"
    ],
    "answerCues": {
      "A": [
        "然后恢复写入"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "290": {
    "when": "解决方案架构师必须实施一个解决方案来提高可用性、最大限度地降低基础设施管理的复杂性",
    "target": "将具有客户 IP 地址的安全群组附加到新端点",
    "avoid": "",
    "questionCues": [
      "解决方案架构师必须实施一个解决方案来提高可用性、最大限度地降低基础设施管理的复杂性"
    ],
    "answerCues": {
      "B": [
        "将具有客户 IP 地址的安全群组附加到新端点"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "291": {
    "when": "实例从摄取服务器上的 NFS 共用访问存储的数据 + 公司需要确定是否购买新的预订或实施新的设计",
    "target": "Amazon S3 + AWS Batch 与 Spot 实例",
    "avoid": "别选“使用计划脚本每晚启动一组EC2按需实例来执行S3数据的批次”。",
    "questionCues": [
      "实例从摄取服务器上的 NFS 共用访问存储的数据",
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
    "when": "一家公司需要将本地 SFTP 站点迁移到 AWS + 解决方案架构师必须实现高可用性",
    "target": "为每个子网指定弹性 IP 地址",
    "avoid": "",
    "questionCues": [
      "一家公司需要将本地 SFTP 站点迁移到 AWS",
      "解决方案架构师必须实现高可用性"
    ],
    "answerCues": {
      "A": [
        "为每个子网指定弹性 IP 地址"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "293": {
    "when": "且连接不能中断 + 架构师希望在不增加 IPv4 地址空间、不中断服务的情况下使用新可用区",
    "target": "删除目前的 AZ2 子网",
    "avoid": "",
    "questionCues": [
      "且连接不能中断",
      "架构师希望在不增加 IPv4 地址空间、不中断服务的情况下使用新可用区"
    ],
    "answerCues": {
      "A": [
        "删除目前的 AZ2 子网"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "294": {
    "when": "一家公司使用 AWS Organizations 中的一个组织管理其 AWS 账户",
    "target": "建立标签策略",
    "avoid": "",
    "questionCues": [
      "一家公司使用 AWS Organizations 中的一个组织管理其 AWS 账户"
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
    "target": "指定 CPU 和内存需求",
    "avoid": "",
    "questionCues": [
      "Amazon EC2",
      "解决方案架构师需要实施一个解决方案来永久降低EC2成本并提高利用率"
    ],
    "answerCues": {
      "C": [
        "指定 CPU 和内存需求"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "296": {
    "when": "该公司使用 AWS CloudFormation 实现基础设施配置自动化",
    "target": "使用 AWS Backup 在辅助 AWS Region 中建立 Aurora 数据库和 DynamoDB 数据库的备份",
    "avoid": "",
    "questionCues": [
      "该公司使用 AWS CloudFormation 实现基础设施配置自动化"
    ],
    "answerCues": {
      "C": [
        "使用 AWS Backup 在辅助 AWS Region 中建立 Aurora 数据库和 DynamoDB 数据库的备份"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "297": {
    "when": "该应用程序利用 Amazon CloudFront 实现全局可扩展性和性能 + 随著时间的推移",
    "target": "选择CloudFront查看器请求触发器来调用函数",
    "avoid": "",
    "questionCues": [
      "该应用程序利用 Amazon CloudFront 实现全局可扩展性和性能",
      "随著时间的推移"
    ],
    "answerCues": {
      "A": [
        "选择CloudFront查看器请求触发器来调用函数"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "298": {
    "when": "公司需要将 Aurora 数据库的数据复制到另一个区域 + 以满足灾难恢复要求",
    "target": "建立 DMS 变更数据撷取 (CDC) 任务",
    "avoid": "",
    "questionCues": [
      "公司需要将 Aurora 数据库的数据复制到另一个区域",
      "以满足灾难恢复要求"
    ],
    "answerCues": {
      "C": [
        "建立 DMS 变更数据撷取 (CDC) 任务"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "299": {
    "when": "修补程序曾导致停机 + 公司需要使应用程序具有高可用性",
    "target": "在组中使用较小的实例",
    "avoid": "",
    "questionCues": [
      "修补程序曾导致停机",
      "公司需要使应用程序具有高可用性"
    ],
    "answerCues": {
      "D": [
        "在组中使用较小的实例"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "300": {
    "when": "公司希望将该应用及其依赖项一起迁移 + 应如何确定哪些依赖项必须与该应用在同一阶段迁移",
    "target": "查询服务器之间传输的数据",
    "avoid": "",
    "questionCues": [
      "公司希望将该应用及其依赖项一起迁移",
      "应如何确定哪些依赖项必须与该应用在同一阶段迁移"
    ],
    "answerCues": {
      "A": [
        "查询服务器之间传输的数据"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "301": {
    "when": "配额必须符合客户的使用模式 + 有些客户必须在更短的时间内获得更高的配额",
    "target": "建立具有代理整合的 Amazon API Gateway REST API 以调用 Lambda 函数",
    "avoid": "",
    "questionCues": [
      "配额必须符合客户的使用模式",
      "有些客户必须在更短的时间内获得更高的配额"
    ],
    "answerCues": {
      "A": [
        "建立具有代理整合的 Amazon API Gateway REST API 以调用 Lambda 函数"
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
    "when": "ECS + 敏感数据在应用程序中移动时必须进行加密",
    "target": "将公钥上传到 CloudFront 分发",
    "avoid": "",
    "questionCues": [
      "ECS",
      "敏感数据在应用程序中移动时必须进行加密"
    ],
    "answerCues": {
      "B": [
        "将公钥上传到 CloudFront 分发"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "304": {
    "when": "新要求强制DNS 查询必须使用私人托管区域 + 以确保在 VPC 内正确解析网域名称",
    "target": "建立新的VPC DHCP选项集",
    "avoid": "",
    "questionCues": [
      "新要求强制DNS 查询必须使用私人托管区域",
      "以确保在 VPC 内正确解析网域名称"
    ],
    "answerCues": {
      "B": [
        "建立新的VPC DHCP选项集"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "305": {
    "when": "产生报告的查询是复杂的读取查询 + 解决方案架构师必须设计一个能够适应突发使用的解决方案",
    "target": "Amazon Redshift",
    "avoid": "",
    "questionCues": [
      "产生报告的查询是复杂的读取查询",
      "解决方案架构师必须设计一个能够适应突发使用的解决方案"
    ],
    "answerCues": {
      "D": [
        "Amazon Redshift"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "306": {
    "when": "某研究中心正在迁移到 AWS 云 + 并且需要一个现成的解决方案来最大限度地减少运维开销",
    "target": "A：新增一个条件；B：将追踪输出存储在另一个S3存储桶中",
    "avoid": "",
    "questionCues": [
      "某研究中心正在迁移到 AWS 云",
      "并且需要一个现成的解决方案来最大限度地减少运维开销"
    ],
    "answerCues": {
      "A": [
        "新增一个条件"
      ],
      "B": [
        "将追踪输出存储在另一个S3存储桶中"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "307": {
    "when": "该公司希望保留所有标记的图像 + 该公司希望只保留最近 5 张未标记的图像",
    "target": "才允许这些 ECR 操作",
    "avoid": "",
    "questionCues": [
      "该公司希望保留所有标记的图像",
      "该公司希望只保留最近 5 张未标记的图像"
    ],
    "answerCues": {
      "A": [
        "才允许这些 ECR 操作"
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
    "when": "公司目前账户架构的安全性配置包括SCP、基于资源的策略、基于身份的策略、信任策略和会话策略",
    "target": "A：使其允许该操作；C：在 Account A 中为用户；E：在Account B中配置目标角色的信任策略以允许该操作",
    "avoid": "",
    "questionCues": [
      "公司目前账户架构的安全性配置包括SCP、基于资源的策略、基于身份的策略、信任策略和会话策略"
    ],
    "answerCues": {
      "A": [
        "使其允许该操作"
      ],
      "C": [
        "在 Account A 中为用户"
      ],
      "E": [
        "在Account B中配置目标角色的信任策略以允许该操作"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "310": {
    "when": "并且该公司希望其新解决方案支持NFS + 如果公司需要归档文件进行灾难恢复",
    "target": "文件网关 + 移至 S3 Glacier Deep Archive",
    "avoid": "",
    "questionCues": [
      "并且该公司希望其新解决方案支持NFS",
      "如果公司需要归档文件进行灾难恢复"
    ],
    "answerCues": {
      "D": [
        "文件网关",
        "移至 S3 Glacier Deep Archive"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "311": {
    "when": "解决方案架构师需要推荐一种方案 + 尽量降低公司的每月总体成本",
    "target": "购买 EC2 实例储蓄计划以涵盖 EC2 实例",
    "avoid": "",
    "questionCues": [
      "解决方案架构师需要推荐一种方案",
      "尽量降低公司的每月总体成本"
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
    "target": "将游戏元数据存储到Amazon DynamoDB全域表",
    "avoid": "",
    "questionCues": [
      "解决方案架构师必须设计一个解决方案",
      "用户必须自动连接到提供最低延迟的Region"
    ],
    "answerCues": {
      "C": [
        "将游戏元数据存储到Amazon DynamoDB全域表"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "313": {
    "when": "该方法优先考虑可靠性并最大限度地减少单一AWSRegion内防火墙设备之间的故障转移时间",
    "target": "A：单独的 Availability Zone；C：新的 Gateway Load Balancer；F：VPC Gateway Load Balancer 端点",
    "avoid": "",
    "questionCues": [
      "该方法优先考虑可靠性并最大限度地减少单一AWSRegion内防火墙设备之间的故障转移时间"
    ],
    "answerCues": {
      "A": [
        "单独的 Availability Zone"
      ],
      "C": [
        "新的 Gateway Load Balancer"
      ],
      "F": [
        "VPC Gateway Load Balancer 端点"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "314": {
    "when": "解决方案架构师需要将on-premises旧应用程序迁移到AWS + 设定档来访问数据库服务器",
    "target": "A：下载许可证文件；D：并将该值注入到本机设定档中",
    "avoid": "",
    "questionCues": [
      "解决方案架构师需要将on-premises旧应用程序迁移到AWS",
      "设定档来访问数据库服务器"
    ],
    "answerCues": {
      "A": [
        "下载许可证文件"
      ],
      "D": [
        "并将该值注入到本机设定档中"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "315": {
    "when": "用户通过 Amazon CloudFront 分发访问 + 尽量降低用户下载报表时的延迟",
    "target": "配置跨Region只读副本将Route 53记录更改为基于延迟的路由以连接到API GatewayAPI",
    "avoid": "",
    "questionCues": [
      "用户通过 Amazon CloudFront 分发访问",
      "尽量降低用户下载报表时的延迟"
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
    "when": "测试环境必须能够与中央服务器通讯以报告测试结果 + 解决方案架构师必须实施解决方案",
    "target": "为测试环境建立一个 VPC",
    "avoid": "",
    "questionCues": [
      "测试环境必须能够与中央服务器通讯以报告测试结果",
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
    "when": "并从 DynamoDB 全域表检索数据 + 解决方案架构师需要更改公司 API 的 API 组件",
    "target": "A：将 API 部署到多个 Regions；B：建立新的 KMS 客户管理副本密钥；C：选择合适的 KMS 密钥",
    "avoid": "",
    "questionCues": [
      "并从 DynamoDB 全域表检索数据",
      "解决方案架构师需要更改公司 API 的 API 组件"
    ],
    "answerCues": {
      "A": [
        "将 API 部署到多个 Regions"
      ],
      "B": [
        "建立新的 KMS 客户管理副本密钥"
      ],
      "C": [
        "选择合适的 KMS 密钥"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "318": {
    "when": "该公司希望将其应用程序和数据库迁移到AWS + 以提高其架构的可靠性",
    "target": "将数据库迁移到 Amazon Aurora MySQL",
    "avoid": "",
    "questionCues": [
      "该公司希望将其应用程序和数据库迁移到AWS",
      "以提高其架构的可靠性"
    ],
    "answerCues": {
      "B": [
        "将数据库迁移到 Amazon Aurora MySQL"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "319": {
    "when": "集中管理用户 + 公司已有可用于建立 AWS Site-to-Site VPN 连接的硬件",
    "target": "让用户从公司网络连接到目标实例",
    "avoid": "",
    "questionCues": [
      "集中管理用户",
      "公司已有可用于建立 AWS Site-to-Site VPN 连接的硬件"
    ],
    "answerCues": {
      "C": [
        "让用户从公司网络连接到目标实例"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "320": {
    "when": "创建的部分 Amazon Elastic Block Store（Amazon EBS）卷未加密",
    "target": "所有 AWS Regions 默认开启 EBS 加密",
    "avoid": "",
    "questionCues": [
      "创建的部分 Amazon Elastic Block Store（Amazon EBS）卷未加密"
    ],
    "answerCues": {
      "D": [
        "所有 AWS Regions 默认开启 EBS 加密"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "321": {
    "when": "Amazon EC2 + 需要云运维工程师通过 SSH 连接到 EC2 实例解决问题",
    "target": "无需为实例设定任何 SSH 密钥",
    "avoid": "",
    "questionCues": [
      "Amazon EC2",
      "需要云运维工程师通过 SSH 连接到 EC2 实例解决问题"
    ],
    "answerCues": {
      "C": [
        "无需为实例设定任何 SSH 密钥"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "322": {
    "when": "一家公司正在迁移行动银行应用程序以在 VPC 中的 Amazon EC2 实例上运行",
    "target": "使用 Amazon Route 53 解析器建立 DNS 端点",
    "avoid": "",
    "questionCues": [
      "一家公司正在迁移行动银行应用程序以在 VPC 中的 Amazon EC2 实例上运行"
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
    "when": "公司希望 + 将数据实时发送到一个不要求固定数据模式（schema）的数据库中存储",
    "target": "使用Amazon Kinesis Data Streams将数据传送到Amazon DynamoDB",
    "avoid": "",
    "questionCues": [
      "公司希望",
      "将数据实时发送到一个不要求固定数据模式（schema）的数据库中存储"
    ],
    "answerCues": {
      "B": [
        "使用Amazon Kinesis Data Streams将数据传送到Amazon DynamoDB"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "324": {
    "when": "迁移到 AWS + 所有 Amazon EC2 实例必须部署在不能连接公共互联网的私有子网中",
    "target": "通过 DynamoDB 网关 VPC 端点连接到这些表",
    "avoid": "别选“通过 DynamoDB 接口 VPC 端点连接到这些表”。",
    "questionCues": [
      "迁移到 AWS",
      "所有 Amazon EC2 实例必须部署在不能连接公共互联网的私有子网中"
    ],
    "answerCues": {
      "B": [
        "通过 DynamoDB 网关 VPC 端点连接到这些表"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "325": {
    "when": "可通过AWS Direct Connect 连接到数据中心环境访问 + 解决方案架构师应该",
    "target": "建立并运行DMS迁移任务",
    "avoid": "",
    "questionCues": [
      "可通过AWS Direct Connect 连接到数据中心环境访问",
      "解决方案架构师应该"
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
    "when": "公司的开发团队需要不同程度的访问权限 + 该公司还希望实施增强的安全流程",
    "target": "Microsoft Active Directory。启动一个 EC2 实例",
    "avoid": "别选“启动一个 Amazon WorkSpace”。",
    "questionCues": [
      "公司的开发团队需要不同程度的访问权限",
      "该公司还希望实施增强的安全流程"
    ],
    "answerCues": {
      "B": [
        "Microsoft Active Directory。启动一个 EC2 实例"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "327": {
    "when": "迁移到AWS + 该公司还需要在另一个AWSRegion中实现复制以进行灾难恢复",
    "target": "使用一张全域表来托管产品数据",
    "avoid": "别选“在另一个 Region 中为数据库实例配置只读副本”。",
    "questionCues": [
      "迁移到AWS",
      "该公司还需要在另一个AWSRegion中实现复制以进行灾难恢复"
    ],
    "answerCues": {
      "C": [
        "使用一张全域表来托管产品数据"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "328": {
    "when": "该公司希望优化这些开发账户的成本 + 该公司希望禁止使用其他不相关的服务",
    "target": "建立自定义SCP",
    "avoid": "",
    "questionCues": [
      "该公司希望优化这些开发账户的成本",
      "该公司希望禁止使用其他不相关的服务"
    ],
    "answerCues": {
      "A": [
        "建立自定义SCP"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "329": {
    "when": "24小时后将删除 + 解决方案架构师需要在不对应用程序架构进行重大变更的情况下解决此问题",
    "target": "实作一个 Lambda 函数",
    "avoid": "",
    "questionCues": [
      "24小时后将删除",
      "解决方案架构师需要在不对应用程序架构进行重大变更的情况下解决此问题"
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
    "when": "管理层要求架构师提出一个云架构 + 又能低延迟访问数据",
    "target": "使用 Amazon API Gateway 实作 REST API",
    "avoid": "",
    "questionCues": [
      "管理层要求架构师提出一个云架构",
      "又能低延迟访问数据"
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
    "when": "架构师必须建立一个流程 + 以最少运维工作完成复制的方法是什么",
    "target": "使用私有 VIF",
    "avoid": "别选“并将影像从Amazon S3复制到EFS文件系统”。",
    "questionCues": [
      "架构师必须建立一个流程",
      "以最少运维工作完成复制的方法是什么"
    ],
    "answerCues": {
      "D": [
        "使用私有 VIF"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "332": {
    "when": "该公司要求 Web 应用程序必须只能通过使用 CloudFront 端点进行访问",
    "target": "更新 ALB 安全组的入站规则",
    "avoid": "",
    "questionCues": [
      "该公司要求 Web 应用程序必须只能通过使用 CloudFront 端点进行访问"
    ],
    "answerCues": {
      "B": [
        "更新 ALB 安全组的入站规则"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "333": {
    "when": "公司需要向客户提供灾难恢复 SLA + RPO 不超过 8 小时",
    "target": "从最新快照恢复数据库",
    "avoid": "",
    "questionCues": [
      "公司需要向客户提供灾难恢复 SLA",
      "RPO 不超过 8 小时"
    ],
    "answerCues": {
      "B": [
        "从最新快照恢复数据库"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "334": {
    "when": "公司需要一个多账户环境 + 但它必须允许灵活地满足各种AWS账户内的不同合规性要求",
    "target": "根据需要添加 OU",
    "avoid": "",
    "questionCues": [
      "公司需要一个多账户环境",
      "但它必须允许灵活地满足各种AWS账户内的不同合规性要求"
    ],
    "answerCues": {
      "B": [
        "根据需要添加 OU"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "335": {
    "when": "以及 Amazon Aurora MySQL + 最佳性能是发布后一周的首要任务",
    "target": "D：在全球多个区域部署 Web 层和应用层；E：并部署 Amazon CloudFront 分发",
    "avoid": "",
    "questionCues": [
      "以及 Amazon Aurora MySQL",
      "最佳性能是发布后一周的首要任务"
    ],
    "answerCues": {
      "D": [
        "在全球多个区域部署 Web 层和应用层"
      ],
      "E": [
        "并部署 Amazon CloudFront 分发"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "336": {
    "when": "并且必须始终可用 + 分析应用程序可以毫无问题地中断和恢复",
    "target": "为在线游戏应用程序实例购买EC2实例节省计划 + 将 Spot 实例用于分析应用程序",
    "avoid": "别选“将按需实例用于分析应用程序”。",
    "questionCues": [
      "并且必须始终可用",
      "分析应用程序可以毫无问题地中断和恢复"
    ],
    "answerCues": {
      "B": [
        "为在线游戏应用程序实例购买EC2实例节省计划",
        "将 Spot 实例用于分析应用程序"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "337": {
    "when": "AWS Backup + 即所有备份都必须能够抵御任何生产账户中特权用户凭证的泄露",
    "target": "A：使用指定非生产账户中的AWSBackup保管库实施跨账户备份；B：新增 SCP 限制对 AWS Backup 金库的修改；C：AWS Backup Vault Lock",
    "avoid": "别选“为分配给 AWS Backup 的 IAM 服务角色实现最小权限访问”。",
    "questionCues": [
      "AWS Backup",
      "即所有备份都必须能够抵御任何生产账户中特权用户凭证的泄露"
    ],
    "answerCues": {
      "A": [
        "使用指定非生产账户中的AWSBackup保管库实施跨账户备份"
      ],
      "B": [
        "新增 SCP 限制对 AWS Backup 金库的修改"
      ],
      "C": [
        "AWS Backup Vault Lock"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "338": {
    "when": "解决方案架构师必须设计一个能够处理需要摄取的大量日志记录数据的解决方案",
    "target": "A：建立目标 Amazon Kinesis 数据流；C：为每个日志组创建一个订阅过滤器；E：以规范中央日志记录账户中的日志并将日志写入安全性工具",
    "avoid": "",
    "questionCues": [
      "解决方案架构师必须设计一个能够处理需要摄取的大量日志记录数据的解决方案"
    ],
    "answerCues": {
      "A": [
        "建立目标 Amazon Kinesis 数据流"
      ],
      "C": [
        "为每个日志组创建一个订阅过滤器"
      ],
      "E": [
        "以规范中央日志记录账户中的日志并将日志写入安全性工具"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "339": {
    "when": "一家公司正在将遗留应用程序从on-premises数据中心迁移到AWS + 迁移应用程序",
    "target": "A：使用 AWS 服务器迁移服务 (AWS SMS) 复制作业将数据库服务器虚拟机迁移到 AWS；D：使用 AWS 服务器迁移服务 (AWS SMS) 复制作业将应用程序服务器虚拟机迁移到 AWS",
    "avoid": "别选“将 VM 映像导出至 AWS Snowball 边缘存储最佳化设备”。",
    "questionCues": [
      "一家公司正在将遗留应用程序从on-premises数据中心迁移到AWS",
      "迁移应用程序"
    ],
    "answerCues": {
      "A": [
        "使用 AWS 服务器迁移服务 (AWS SMS) 复制作业将数据库服务器虚拟机迁移到 AWS"
      ],
      "D": [
        "使用 AWS 服务器迁移服务 (AWS SMS) 复制作业将应用程序服务器虚拟机迁移到 AWS"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "340": {
    "when": "该公司的AWS账户包含数百个VPC + 该公司希望控制哪些VPC可以与其他VPC进行通讯",
    "target": "A：AWS RAM；B：为全部 VPC 和 VPN 配置连接（attachment）；C：设定中转网关路由表",
    "avoid": "",
    "questionCues": [
      "该公司的AWS账户包含数百个VPC",
      "该公司希望控制哪些VPC可以与其他VPC进行通讯"
    ],
    "answerCues": {
      "A": [
        "AWS RAM"
      ],
      "B": [
        "为全部 VPC 和 VPN 配置连接（attachment）"
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
    "target": "将数据库迁移到Aurora Serverless v1",
    "avoid": "别选“购买计算节省计划和 RDS 预留实例”。",
    "questionCues": [
      "AWS Lambda",
      "解决方案架构师必须设计一个可以扩展以处理流量变化的解决方案"
    ],
    "answerCues": {
      "D": [
        "将数据库迁移到Aurora Serverless v1"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "342": {
    "when": "高峰时无法处理全部传入请求 + 数据库在高峰时无法承受读取负载",
    "target": "并将其挂载到每个容器",
    "avoid": "",
    "questionCues": [
      "高峰时无法处理全部传入请求",
      "数据库在高峰时无法承受读取负载"
    ],
    "answerCues": {
      "D": [
        "并将其挂载到每个容器"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "343": {
    "when": "以分析请求的延迟并 + 解决方案架构师如何设计API Gateway访问控制并执行请求检查",
    "target": "将授权设为AWS_IAM",
    "avoid": "",
    "questionCues": [
      "以分析请求的延迟并",
      "解决方案架构师如何设计API Gateway访问控制并执行请求检查"
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
    "when": "Amazon S3 + 近期 CloudFormation 模板中的资源变更导致了计划外停机",
    "target": "在测试环境中使用AWSCodeBuild实现自动化测试",
    "avoid": "",
    "questionCues": [
      "Amazon S3",
      "近期 CloudFormation 模板中的资源变更导致了计划外停机"
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
    "when": "应用程序必须具有采用 us-west-1 Region 主动-被动配置的灾难恢复功能",
    "target": "以提供跨区域高可用性",
    "avoid": "",
    "questionCues": [
      "应用程序必须具有采用 us-west-1 Region 主动-被动配置的灾难恢复功能"
    ],
    "answerCues": {
      "B": [
        "以提供跨区域高可用性"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "346": {
    "when": ".NET Core 组件需要复杂编排 + 公司还必须能够完全控制网络与主机配置",
    "target": "Amazon EC2",
    "avoid": "",
    "questionCues": [
      ".NET Core 组件需要复杂编排",
      "公司还必须能够完全控制网络与主机配置"
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
    "when": "公司运维团队实施了Auto Scaling组来管理突然增加的流量 + 更新需要重新启动",
    "target": "A：通过设定更新策略来修改Auto Scaling组以将最旧的启动配置作为替换目标；D：建立自动化脚本来修补 AMI、更新启动配置并调用 Auto Scaling 实例刷新",
    "avoid": "",
    "questionCues": [
      "公司运维团队实施了Auto Scaling组来管理突然增加的流量",
      "更新需要重新启动"
    ],
    "answerCues": {
      "A": [
        "通过设定更新策略来修改Auto Scaling组以将最旧的启动配置作为替换目标"
      ],
      "D": [
        "建立自动化脚本来修补 AMI、更新启动配置并调用 Auto Scaling 实例刷新"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "349": {
    "when": "SageMaker 实例部署在无法访问互联网或从互联网访问的VPC 中 + Amazon S3",
    "target": "为 CodeArtifact 建立一个 VPC 端点",
    "avoid": "",
    "questionCues": [
      "SageMaker 实例部署在无法访问互联网或从互联网访问的VPC 中",
      "Amazon S3"
    ],
    "answerCues": {
      "D": [
        "为 CodeArtifact 建立一个 VPC 端点"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "350": {
    "when": "一位架构师为一个具有严格灾难恢复要求的政府机构工作 + 并尽可能减少运维工作",
    "target": "以将 EBS 快照复制到附加 Regions",
    "avoid": "",
    "questionCues": [
      "一位架构师为一个具有严格灾难恢复要求的政府机构工作",
      "并尽可能减少运维工作"
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
    "when": "需要通过 S3 复制规则 + 以满足合规要求",
    "target": "启用S3复制时间控制（S3RTC）",
    "avoid": "",
    "questionCues": [
      "需要通过 S3 复制规则",
      "以满足合规要求"
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
    "when": "由最小容量和最大容量都为 1 的 Auto Scaling 组提供 + 确保应用能够跨多个可用区",
    "target": "将 Auto Scaling 组配置为跨可用区启动实例",
    "avoid": "",
    "questionCues": [
      "由最小容量和最大容量都为 1 的 Auto Scaling 组提供",
      "确保应用能够跨多个可用区"
    ],
    "answerCues": {
      "A": [
        "将 Auto Scaling 组配置为跨可用区启动实例"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "355": {
    "when": "该解决方案将自动扩展吞吐量以满足不断增长的需求 + 也无法继续管理Docker托管环境",
    "target": "将卷新增至任务定义以指向EFS 文件系统",
    "avoid": "",
    "questionCues": [
      "该解决方案将自动扩展吞吐量以满足不断增长的需求",
      "也无法继续管理Docker托管环境"
    ],
    "answerCues": {
      "B": [
        "将卷新增至任务定义以指向EFS 文件系统"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "356": {
    "when": "该公司希望在迁移过程中调整其资源规模 + 解决方案架构师必须评估公司目前的环境并制定迁移计划",
    "target": "部署迁移中心策略建议应用程序数据收集器",
    "avoid": "",
    "questionCues": [
      "该公司希望在迁移过程中调整其资源规模",
      "解决方案架构师必须评估公司目前的环境并制定迁移计划"
    ],
    "answerCues": {
      "B": [
        "部署迁移中心策略建议应用程序数据收集器"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "357": {
    "when": "并使用在 AWS Organizations 的组织中管理的多个 AWS 账户 + 为了遵守法规",
    "target": "为组织中的所有账户部署追踪",
    "avoid": "",
    "questionCues": [
      "并使用在 AWS Organizations 的组织中管理的多个 AWS 账户",
      "为了遵守法规"
    ],
    "answerCues": {
      "C": [
        "为组织中的所有账户部署追踪"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "358": {
    "when": "公司要求尽可能低的网络延迟 + 以获得最高性能",
    "target": "在群集置放群组中启动内存最佳化的 EC2 实例",
    "avoid": "",
    "questionCues": [
      "公司要求尽可能低的网络延迟",
      "以获得最高性能"
    ],
    "answerCues": {
      "C": [
        "在群集置放群组中启动内存最佳化的 EC2 实例"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "359": {
    "when": "公司需要每天自动将这些数据备份到 AWS 云 + 方案必须支持自定义过滤器",
    "target": "配置DataSync任务",
    "avoid": "",
    "questionCues": [
      "公司需要每天自动将这些数据备份到 AWS 云",
      "方案必须支持自定义过滤器"
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
    "when": "一家金融服务公司拥有一款资产管理产品 + 确保所有用户角色仅对他们需要的资源具有最低访问权限",
    "target": "AWS Service Catalog",
    "avoid": "",
    "questionCues": [
      "一家金融服务公司拥有一款资产管理产品",
      "确保所有用户角色仅对他们需要的资源具有最低访问权限"
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
    "when": "公司希望让新客户能够访问 SaaS 服务 + 但公司不希望立即在 us-east-1 中",
    "target": "建立一个 IP 目标群组",
    "avoid": "",
    "questionCues": [
      "公司希望让新客户能够访问 SaaS 服务",
      "但公司不希望立即在 us-east-1 中"
    ],
    "answerCues": {
      "B": [
        "建立一个 IP 目标群组"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "362": {
    "when": "该公司还需要追踪在 Amazon S3 中加密的对象的百分比",
    "target": "让合规团队可以直接在 S3 控制台中访问仪表板",
    "avoid": "",
    "questionCues": [
      "该公司还需要追踪在 Amazon S3 中加密的对象的百分比"
    ],
    "answerCues": {
      "C": [
        "让合规团队可以直接在 S3 控制台中访问仪表板"
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
    "target": "并将其附加到组织根",
    "avoid": "",
    "questionCues": [
      "以便公司可以追踪每个业务部门的成本",
      "解决方案架构师应该做什么来强制执行未来的标记要求"
    ],
    "answerCues": {
      "C": [
        "并将其附加到组织根"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "365": {
    "when": "私有子网的同一默认路由指向现有 NAT 网关 + 并且不能让公共互联网主动访问私有子网中的实例",
    "target": "建立仅出口的互联网网关",
    "avoid": "",
    "questionCues": [
      "私有子网的同一默认路由指向现有 NAT 网关",
      "并且不能让公共互联网主动访问私有子网中的实例"
    ],
    "answerCues": {
      "C": [
        "建立仅出口的互联网网关"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "366": {
    "when": "无法从部署在 VPC 中的 Amazon EC2 实例访问该 API",
    "target": "启用端点的私有 DNS",
    "avoid": "",
    "questionCues": [
      "无法从部署在 VPC 中的 Amazon EC2 实例访问该 API"
    ],
    "answerCues": {
      "B": [
        "启用端点的私有 DNS"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "367": {
    "when": "各部门都有现有的 AWS 账户 + 架构师必须确保能够集中管理所有账户的账单与访问策略",
    "target": "授予管理账户承担 IAM 角色的权限",
    "avoid": "",
    "questionCues": [
      "各部门都有现有的 AWS 账户",
      "架构师必须确保能够集中管理所有账户的账单与访问策略"
    ],
    "answerCues": {
      "C": [
        "授予管理账户承担 IAM 角色的权限"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "368": {
    "when": "PostgreSQL 数据库已迁移到 Amazon RDS for PostgreSQL",
    "target": "部署应用程序",
    "avoid": "",
    "questionCues": [
      "PostgreSQL 数据库已迁移到 Amazon RDS for PostgreSQL"
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
    "when": "员工目前连接到 VPN 来访问其 Windows 主目录中的文件 + 并减少运维开销",
    "target": "B：将用户主目录迁移到 Amazon FSx for Windows File Server；D：将远端用户迁移到AWSClient VPN",
    "avoid": "",
    "questionCues": [
      "员工目前连接到 VPN 来访问其 Windows 主目录中的文件",
      "并减少运维开销"
    ],
    "answerCues": {
      "B": [
        "将用户主目录迁移到 Amazon FSx for Windows File Server"
      ],
      "D": [
        "将远端用户迁移到AWSClient VPN"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "370": {
    "when": "并确保将来能够自动侦测到未加密的卷 + 该公司希望有一个解决方案能够集中管理多个AWS账户",
    "target": "A：并开启强烈建议的控制项（护栏）；C：分离现有卷",
    "avoid": "",
    "questionCues": [
      "并确保将来能够自动侦测到未加密的卷",
      "该公司希望有一个解决方案能够集中管理多个AWS账户"
    ],
    "answerCues": {
      "A": [
        "并开启强烈建议的控制项（护栏）"
      ],
      "C": [
        "分离现有卷"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "371": {
    "when": "该公司需要 + 目录中拥有账户的所有用户都必须有权访问该应用程序",
    "target": "创建应用客户端",
    "avoid": "",
    "questionCues": [
      "该公司需要",
      "目录中拥有账户的所有用户都必须有权访问该应用程序"
    ],
    "answerCues": {
      "B": [
        "创建应用客户端"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "372": {
    "when": "故障转移需要 1 分钟以上 + 解决方案架构师必须设计一个能够提供最快故障转移时间的解决方案",
    "target": "其中包含两个源站",
    "avoid": "",
    "questionCues": [
      "故障转移需要 1 分钟以上",
      "解决方案架构师必须设计一个能够提供最快故障转移时间的解决方案"
    ],
    "answerCues": {
      "D": [
        "其中包含两个源站"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "373": {
    "when": "他们希望 + 他们还希望将多个账户作为一个整体进行管理",
    "target": "A：使用拒绝清单策略；B：查看 AWS IAM 中的访问顾问以确定最近使用的服务；E：定义组织单位 (OU) 并将成员账户放置在 OU 中",
    "avoid": "",
    "questionCues": [
      "他们希望",
      "他们还希望将多个账户作为一个整体进行管理"
    ],
    "answerCues": {
      "A": [
        "使用拒绝清单策略"
      ],
      "B": [
        "查看 AWS IAM 中的访问顾问以确定最近使用的服务"
      ],
      "E": [
        "定义组织单位 (OU) 并将成员账户放置在 OU 中"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "374": {
    "when": "公司需要一个伸缩方案 + 尽量提高售票活动期间的可用性",
    "target": "故障转移到更大的 Aurora 副本",
    "avoid": "",
    "questionCues": [
      "公司需要一个伸缩方案",
      "尽量提高售票活动期间的可用性"
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
    "when": "应用也不能被公共互联网访问 + 方案不能占用全部可用网络带宽",
    "target": "A：建立一个至少具有两个私有子网、两个 NAT 网关和一个虚拟私有网关的 VPC。；D：Direct Connect；E：在配置复制服务器期间",
    "avoid": "核对题目限制与完整选项。",
    "questionCues": [
      "应用也不能被公共互联网访问",
      "方案不能占用全部可用网络带宽"
    ],
    "answerCues": {
      "A": [
        "建立一个至少具有两个私有子网、两个 NAT 网关和一个虚拟私有网关的 VPC。"
      ],
      "D": [
        "Direct Connect"
      ],
      "E": [
        "在配置复制服务器期间"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "376": {
    "when": "方案需要接收成批的大图片文件 + 方案必须应对需求的大幅变化",
    "target": "使用 AWS Step Functions 处理用户存储图片时产生的 S3 事件",
    "avoid": "别选“使用S3事件通知调用AWS Lambda函数”。",
    "questionCues": [
      "方案需要接收成批的大图片文件",
      "方案必须应对需求的大幅变化"
    ],
    "answerCues": {
      "A": [
        "使用 AWS Step Functions 处理用户存储图片时产生的 S3 事件"
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
    "when": "可以将图片和影片安全地上传到 Amazon S3 存储桶 + 用于通过浏览器接口上传对象",
    "target": "产生预签名 URL 时使用端点",
    "avoid": "",
    "questionCues": [
      "可以将图片和影片安全地上传到 Amazon S3 存储桶",
      "用于通过浏览器接口上传对象"
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
    "when": "财务部门需要一种集中的付款方式 + 安全团队需要一个集中机制来控制公司所有账户中IAM的使用情况",
    "target": "B：邀请现有账户加入组织并使用组织建立新账户；D：并创建合适的服务控制策略",
    "avoid": "",
    "questionCues": [
      "财务部门需要一种集中的付款方式",
      "安全团队需要一个集中机制来控制公司所有账户中IAM的使用情况"
    ],
    "answerCues": {
      "B": [
        "邀请现有账户加入组织并使用组织建立新账户"
      ],
      "D": [
        "并创建合适的服务控制策略"
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
    "when": "并查看了 Aurora 数据库集群的性能指标 + 而 Aurora 指标不足以分析查询性能",
    "target": "A：慢查询日志 + Amazon CloudWatch Logs；B：AWS X-Ray SDK + SQL 查询追踪；D：CloudWatch Logs 代理 + Apache 日志",
    "avoid": "",
    "questionCues": [
      "并查看了 Aurora 数据库集群的性能指标",
      "而 Aurora 指标不足以分析查询性能"
    ],
    "answerCues": {
      "A": [
        "慢查询日志",
        "Amazon CloudWatch Logs"
      ],
      "B": [
        "AWS X-Ray SDK",
        "SQL 查询追踪"
      ],
      "D": [
        "CloudWatch Logs 代理",
        "Apache 日志"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "382": {
    "when": "哪个选项提供了可扩展的应用程序架构 + 以最少的开发工作来应对旺季",
    "target": "使用 DynamoDB 自动扩缩容",
    "avoid": "",
    "questionCues": [
      "哪个选项提供了可扩展的应用程序架构",
      "以最少的开发工作来应对旺季"
    ],
    "answerCues": {
      "C": [
        "使用 DynamoDB 自动扩缩容"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "383": {
    "when": "公司希望收集 CPU、内存和磁盘利用率等指标 + 公司还希望监控网络连接",
    "target": "使用AWS应用程序发现服务并将数据收集代理程序部署到数据中心的每个虚拟机",
    "avoid": "",
    "questionCues": [
      "公司希望收集 CPU、内存和磁盘利用率等指标",
      "公司还希望监控网络连接"
    ],
    "answerCues": {
      "A": [
        "使用AWS应用程序发现服务并将数据收集代理程序部署到数据中心的每个虚拟机"
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
    "when": "解决方案架构师必须创建一个解决方案 + 该解决方案还必须允许开发人员能够管理用于其工作负载的实例",
    "target": "添加 Deny 操作",
    "avoid": "",
    "questionCues": [
      "解决方案架构师必须创建一个解决方案",
      "该解决方案还必须允许开发人员能够管理用于其工作负载的实例"
    ],
    "answerCues": {
      "B": [
        "添加 Deny 操作"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "386": {
    "when": "在启动AWS 基础设施时向用户提供最低权限访问权限 + 使用中央账户来管理基础设施服务的建立",
    "target": "B：建立的组织结构；D：授予访问权限；E：AWS Service Catalog TagOption",
    "avoid": "",
    "questionCues": [
      "在启动AWS 基础设施时向用户提供最低权限访问权限",
      "使用中央账户来管理基础设施服务的建立"
    ],
    "answerCues": {
      "B": [
        "建立的组织结构"
      ],
      "D": [
        "授予访问权限"
      ],
      "E": [
        "AWS Service Catalog TagOption"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "387": {
    "when": "解决方案架构师需要设计一个方案 + 并尽量减少运维工作",
    "target": "使其仅查看相关分区",
    "avoid": "",
    "questionCues": [
      "解决方案架构师需要设计一个方案",
      "并尽量减少运维工作"
    ],
    "answerCues": {
      "D": [
        "使其仅查看相关分区"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "388": {
    "when": "公司需要能够记录已被阻止的访问请求 + 此解决方案需要尽可能少的维护",
    "target": "配置规则以阻止任何并非源自指定国家/地区的请求",
    "avoid": "",
    "questionCues": [
      "公司需要能够记录已被阻止的访问请求",
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
    "when": "公司对旧版 Windows 文件服务器的可用性和恢复方案表示担忧 + 合规要求规定",
    "target": "使用 VPC 对等连接",
    "avoid": "",
    "questionCues": [
      "公司对旧版 Windows 文件服务器的可用性和恢复方案表示担忧",
      "合规要求规定"
    ],
    "answerCues": {
      "C": [
        "使用 VPC 对等连接"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "390": {
    "when": "该应用程序需要 RPO 少于 5 分钟 + RTO 少于 10 分钟",
    "target": "将该只读副本提升为主实例",
    "avoid": "",
    "questionCues": [
      "该应用程序需要 RPO 少于 5 分钟",
      "RTO 少于 10 分钟"
    ],
    "answerCues": {
      "B": [
        "将该只读副本提升为主实例"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "391": {
    "when": "AWS Organizations + 解决方案架构师应该如何在新成员账户中建立 IAM 用户",
    "target": "从管理账户中",
    "avoid": "",
    "questionCues": [
      "AWS Organizations",
      "解决方案架构师应该如何在新成员账户中建立 IAM 用户"
    ],
    "answerCues": {
      "B": [
        "从管理账户中"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "392": {
    "when": "公司需要支持新增的使用量 + 同时尽量减少方案带来的成本增长",
    "target": "在生产阶段启用缓存",
    "avoid": "别选“在 API Gateway 的生产阶段启用限流”。",
    "questionCues": [
      "公司需要支持新增的使用量",
      "同时尽量减少方案带来的成本增长"
    ],
    "answerCues": {
      "A": [
        "在生产阶段启用缓存"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "393": {
    "when": "且必须同时进行传输中加密和静态加密 + 以尽可能少的停机时间将数据迁移到 AWS",
    "target": "配置 DMS 任务",
    "avoid": "",
    "questionCues": [
      "且必须同时进行传输中加密和静态加密",
      "以尽可能少的停机时间将数据迁移到 AWS"
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
    "when": "该文件存储必须具备高可用性和容错能力、兼容可移植操作系统接口（POSIX） + 并支持高吞吐量",
    "target": "Max I/O（最大 I/O）性能模式 + Amazon EFS",
    "avoid": "核对题目限制与完整选项。",
    "questionCues": [
      "该文件存储必须具备高可用性和容错能力、兼容可移植操作系统接口（POSIX）",
      "并支持高吞吐量"
    ],
    "answerCues": {
      "D": [
        "Max I/O（最大 I/O）性能模式",
        "Amazon EFS"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "395": {
    "when": "解决方案架构师必须设计一个灾难恢复策略 + 该策略可以在另一个AWSRegion中恢复解决方案",
    "target": "标准 Aurora MySQL 全域数据库 + 在主动-被动配置中工作",
    "avoid": "别选“使用 AWS SAM 建立 Runbook 以将解决方案部署到目标 Region”。",
    "questionCues": [
      "解决方案架构师必须设计一个灾难恢复策略",
      "该策略可以在另一个AWSRegion中恢复解决方案"
    ],
    "answerCues": {
      "D": [
        "标准 Aurora MySQL 全域数据库",
        "在主动-被动配置中工作"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "396": {
    "when": "解决方案架构师必须更新应用程序 + 以便应用程序具有高可用性",
    "target": "在内容更新之前配置EC2实例的计划扩充",
    "avoid": "",
    "questionCues": [
      "解决方案架构师必须更新应用程序",
      "以便应用程序具有高可用性"
    ],
    "answerCues": {
      "A": [
        "在内容更新之前配置EC2实例的计划扩充"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "397": {
    "when": "公司需要存储和处理将使用自定义行动应用程序从行动设备上传的影像数据 + 每分钟上传数千次",
    "target": "B：Amazon SQS；C：调用AWS Lambda函数来执行影像处理；E：Amazon SNS",
    "avoid": "",
    "questionCues": [
      "公司需要存储和处理将使用自定义行动应用程序从行动设备上传的影像数据",
      "每分钟上传数千次"
    ],
    "answerCues": {
      "B": [
        "Amazon SQS"
      ],
      "C": [
        "调用AWS Lambda函数来执行影像处理"
      ],
      "E": [
        "Amazon SNS"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "398": {
    "when": "VPC + 开发人员需要访问OpenSearch服务来直接从本地开发机器分析和视觉化日志",
    "target": "配置Client VPN自助服务入口网站",
    "avoid": "",
    "questionCues": [
      "VPC",
      "开发人员需要访问OpenSearch服务来直接从本地开发机器分析和视觉化日志"
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
    "target": "B：使用 awsvpc 网络模式建立任务；E：将安全群组应用于任务",
    "avoid": "",
    "questionCues": [
      "解决方案架构师必须创建满足安全要求的容器化架构",
      "部署后需要采取哪些步骤才能满足要求"
    ],
    "answerCues": {
      "B": [
        "使用 awsvpc 网络模式建立任务"
      ],
      "E": [
        "将安全群组应用于任务"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "400": {
    "when": "该公司创建了需要 Lambda 函数来访问 Amazon Neptune 数据库集群的新功能",
    "target": "B：并通过 NAT 网关路由互联网流量；E：为DynamoDB建立VPC端点",
    "avoid": "",
    "questionCues": [
      "该公司创建了需要 Lambda 函数来访问 Amazon Neptune 数据库集群的新功能"
    ],
    "answerCues": {
      "B": [
        "并通过 NAT 网关路由互联网流量"
      ],
      "E": [
        "为DynamoDB建立VPC端点"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "401": {
    "when": "该公司需要能够在灾难发生时使用 SMB 从数据中心或AWS 访问数据 + 数据副本很少被访问",
    "target": "配置S3文件网关对元数据文件和影像文件使用Amazon S3标准不频繁访问（S3标准-IA）",
    "avoid": "",
    "questionCues": [
      "该公司需要能够在灾难发生时使用 SMB 从数据中心或AWS 访问数据",
      "数据副本很少被访问"
    ],
    "answerCues": {
      "D": [
        "配置S3文件网关对元数据文件和影像文件使用Amazon S3标准不频繁访问（S3标准-IA）"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "402": {
    "when": "此解决方案必须提供多重身份验证 (MFA) + 并且必须复制现有桌面的用户体验",
    "target": "为 MFA 设定 RADIUS 服务器",
    "avoid": "",
    "questionCues": [
      "此解决方案必须提供多重身份验证 (MFA)",
      "并且必须复制现有桌面的用户体验"
    ],
    "answerCues": {
      "C": [
        "为 MFA 设定 RADIUS 服务器"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "403": {
    "when": "希望客服人员能够将通话标记为骚扰电话 + 并在以后自动阻止这些号码接入客服人员",
    "target": "使其检查更新后的属性",
    "avoid": "",
    "questionCues": [
      "希望客服人员能够将通话标记为骚扰电话",
      "并在以后自动阻止这些号码接入客服人员"
    ],
    "answerCues": {
      "A": [
        "使其检查更新后的属性"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "404": {
    "when": "公司需要即时传输和分析AWS云端中的数据 + 工厂运维团队必须立即收到通知",
    "target": "将数据串流传输到 Amazon Kinesis 数据流",
    "avoid": "",
    "questionCues": [
      "公司需要即时传输和分析AWS云端中的数据",
      "工厂运维团队必须立即收到通知"
    ],
    "answerCues": {
      "C": [
        "将数据串流传输到 Amazon Kinesis 数据流"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "405": {
    "when": "该集群需要支持数量不可预测的无状态 Pod + 随着工作负载自动扩展其使用的副本数量",
    "target": "为工作负载配置基于可用区的拓扑分布约束",
    "avoid": "",
    "questionCues": [
      "该集群需要支持数量不可预测的无状态 Pod",
      "随着工作负载自动扩展其使用的副本数量"
    ],
    "answerCues": {
      "D": [
        "为工作负载配置基于可用区的拓扑分布约束"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "406": {
    "when": "一家公司需要为一个 Web 应用实施灾难恢复（DR）计划 + 并尽可能缩短故障恢复所需的时间",
    "target": "配置 Lambda 函数以更新 Route 53",
    "avoid": "",
    "questionCues": [
      "一家公司需要为一个 Web 应用实施灾难恢复（DR）计划",
      "并尽可能缩短故障恢复所需的时间"
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
    "when": "公司希望跟踪 Amazon EC2 使用量 + 公司的架构团队必须收到每日告警",
    "target": "配置告警",
    "avoid": "",
    "questionCues": [
      "公司希望跟踪 Amazon EC2 使用量",
      "公司的架构团队必须收到每日告警"
    ],
    "answerCues": {
      "A": [
        "配置告警"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "408": {
    "when": "并且应该能够在行销活动期间进行扩展 + 以最小的延迟处理订单",
    "target": "接收Amazon SQS队列中的订单并调用AWS Lambda函数来处理它们",
    "avoid": "",
    "questionCues": [
      "并且应该能够在行销活动期间进行扩展",
      "以最小的延迟处理订单"
    ],
    "answerCues": {
      "B": [
        "接收Amazon SQS队列中的订单并调用AWS Lambda函数来处理它们"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "409": {
    "when": "公司需要在 QA 测试环境和生产环境中运行这些函数 + 并且必须自动轮换密码",
    "target": "启用自动轮换",
    "avoid": "",
    "questionCues": [
      "公司需要在 QA 测试环境和生产环境中运行这些函数",
      "并且必须自动轮换密码"
    ],
    "answerCues": {
      "B": [
        "启用自动轮换"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "410": {
    "when": "公司必须阻止 OU 账户中的任何新的或现有的 Amazon EC2 实例取得公网 IP 地址",
    "target": "将 SCP 连接至 OU",
    "avoid": "",
    "questionCues": [
      "公司必须阻止 OU 账户中的任何新的或现有的 Amazon EC2 实例取得公网 IP 地址"
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
    "when": "也无法将应用程序与身份提供者整合 + 所有用户都必须通过多重身份验证 (MFA) 进行身份验证",
    "target": "Amazon Cognito",
    "avoid": "",
    "questionCues": [
      "也无法将应用程序与身份提供者整合",
      "所有用户都必须通过多重身份验证 (MFA) 进行身份验证"
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
    "when": "解决方案架构师正准备将新的安全工具 + 解决方案架构师应该怎么做才能成功部署堆栈",
    "target": "在所有相关账户中启用新的Regions",
    "avoid": "",
    "questionCues": [
      "解决方案架构师正准备将新的安全工具",
      "解决方案架构师应该怎么做才能成功部署堆栈"
    ],
    "answerCues": {
      "A": [
        "在所有相关账户中启用新的Regions"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "413": {
    "when": "该应用程序在 AWS Lambda 函数上运行 + 并且数据库报告正在建立太多连接",
    "target": "为代理程序配置只读端点",
    "avoid": "",
    "questionCues": [
      "该应用程序在 AWS Lambda 函数上运行",
      "并且数据库报告正在建立太多连接"
    ],
    "answerCues": {
      "A": [
        "为代理程序配置只读端点"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "414": {
    "when": "在每个传感器的制造过程中 + 解决方案架构师需要让这些传感器在安装完成后能够向 AWS 发送数据",
    "target": "指定预置模板",
    "avoid": "别选“授予 AWS IoT Core 服务权限”。",
    "questionCues": [
      "在每个传感器的制造过程中",
      "解决方案架构师需要让这些传感器在安装完成后能够向 AWS 发送数据"
    ],
    "answerCues": {
      "C": [
        "指定预置模板"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "415": {
    "when": "软件工程师使用私有 GitHub 仓库管理代码 + 并要求部署期间零停机",
    "target": "使用 GitHub webhooks + 使用AWSCodeBuild的Jenkins插件",
    "avoid": "",
    "questionCues": [
      "软件工程师使用私有 GitHub 仓库管理代码",
      "并要求部署期间零停机"
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
    "when": "公司必须将所有数据保留一年 + 该公司的安全团队担心攻击者可能通过泄漏的长期凭证访问AWS账户",
    "target": "配置默认保留期为 1 年",
    "avoid": "",
    "questionCues": [
      "公司必须将所有数据保留一年",
      "该公司的安全团队担心攻击者可能通过泄漏的长期凭证访问AWS账户"
    ],
    "answerCues": {
      "A": [
        "配置默认保留期为 1 年"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "418": {
    "when": "一家公司需要提高其 AWS Web 应用的安全性 + 解决方案架构师必须设计一个方案",
    "target": "配置 ALB",
    "avoid": "",
    "questionCues": [
      "一家公司需要提高其 AWS Web 应用的安全性",
      "解决方案架构师必须设计一个方案"
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
    "when": "AWS Control Tower + 安全团队需要集中查看所有账户的安全状态",
    "target": "指定一个AWS账户为Security Hub的委派管理员",
    "avoid": "",
    "questionCues": [
      "AWS Control Tower",
      "安全团队需要集中查看所有账户的安全状态"
    ],
    "answerCues": {
      "D": [
        "指定一个AWS账户为Security Hub的委派管理员"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "420": {
    "when": "公司需要一个无需自定义开发、能够自动将所有现有和新增软件镜像传输到 Amazon S3 的方案",
    "target": "并配置任务",
    "avoid": "",
    "questionCues": [
      "公司需要一个无需自定义开发、能够自动将所有现有和新增软件镜像传输到 Amazon S3 的方案"
    ],
    "answerCues": {
      "A": [
        "并配置任务"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "421": {
    "when": "DynamoDB + Lambda 函数的 Throttles（限流）指标对应 1% 的请求",
    "target": "为 DynamoDB 表配置自动扩缩容",
    "avoid": "",
    "questionCues": [
      "DynamoDB",
      "Lambda 函数的 Throttles（限流）指标对应 1% 的请求"
    ],
    "answerCues": {
      "B": [
        "为 DynamoDB 表配置自动扩缩容"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "422": {
    "when": "需要访问关键数据的文件存储 + 公司需要尽快将应用程序迁移到AWS",
    "target": "并将文件系统挂载到全部三个 EC2 实例",
    "avoid": "",
    "questionCues": [
      "需要访问关键数据的文件存储",
      "公司需要尽快将应用程序迁移到AWS"
    ],
    "answerCues": {
      "B": [
        "并将文件系统挂载到全部三个 EC2 实例"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "423": {
    "when": "解决方案架构师必须收集有关虚拟机之间网络依赖性的资讯 + 此资讯必须采用图表形式",
    "target": "选择 AWS Migration Hub 的主区域（home Region）",
    "avoid": "",
    "questionCues": [
      "解决方案架构师必须收集有关虚拟机之间网络依赖性的资讯",
      "此资讯必须采用图表形式"
    ],
    "answerCues": {
      "A": [
        "选择 AWS Migration Hub 的主区域（home Region）"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "424": {
    "when": "由 AWS Lambda 函数和采用多可用区 + 公司需要提高数据库的可扩展性、性能和可用性",
    "target": "并新增Aurora副本",
    "avoid": "",
    "questionCues": [
      "由 AWS Lambda 函数和采用多可用区",
      "公司需要提高数据库的可扩展性、性能和可用性"
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
    "when": "应用必须继续通过 SMB 访问数据 + 架构师需要将数据迁移到 AWS 上的新位置",
    "target": "并与文件网关关联",
    "avoid": "",
    "questionCues": [
      "应用必须继续通过 SMB 访问数据",
      "架构师需要将数据迁移到 AWS 上的新位置"
    ],
    "answerCues": {
      "D": [
        "并与文件网关关联"
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
    "when": "ALB 在三个公有子网中运行 + EC2 实例在三个私有子网中运行",
    "target": "将 Web ACL 与 ALB 关联",
    "avoid": "",
    "questionCues": [
      "ALB 在三个公有子网中运行",
      "EC2 实例在三个私有子网中运行"
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
    "when": "解决方案架构师必须设计一个解决方案 + 安全团队要求访问此数据的流量不得穿越公共网络",
    "target": "使用Direct Connect网关访问其他AWSRegions中的数据",
    "avoid": "",
    "questionCues": [
      "解决方案架构师必须设计一个解决方案",
      "安全团队要求访问此数据的流量不得穿越公共网络"
    ],
    "answerCues": {
      "D": [
        "使用Direct Connect网关访问其他AWSRegions中的数据"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "429": {
    "when": "该公司希望在该公司的 on-premises 环境不可用时能够暂时在 AWS 上托管其应用程序",
    "target": "配置AWS弹性灾难恢复",
    "avoid": "",
    "questionCues": [
      "该公司希望在该公司的 on-premises 环境不可用时能够暂时在 AWS 上托管其应用程序"
    ],
    "answerCues": {
      "B": [
        "配置AWS弹性灾难恢复"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "430": {
    "when": "但为集中分析而保留 eu-north-1 的原 S3 桶 + 数据从新区域到达该桶的延迟明显增大",
    "target": "设定S3跨Region复制",
    "avoid": "",
    "questionCues": [
      "但为集中分析而保留 eu-north-1 的原 S3 桶",
      "数据从新区域到达该桶的延迟明显增大"
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
    "when": "其他业务部门 VPC 内的客户端应用需要访问它 + 只有获授权的业务部门 VPC 才能连接该应用",
    "target": "使用该端点服务的服务名称",
    "avoid": "",
    "questionCues": [
      "其他业务部门 VPC 内的客户端应用需要访问它",
      "只有获授权的业务部门 VPC 才能连接该应用"
    ],
    "answerCues": {
      "B": [
        "使用该端点服务的服务名称"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "432": {
    "when": "架构师需要确定网站在 AWS 上的目标架构 + 迁移工作量最少",
    "target": "Amazon EKS",
    "avoid": "",
    "questionCues": [
      "架构师需要确定网站在 AWS 上的目标架构",
      "迁移工作量最少"
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
    "target": "为每条记录设置 DynamoDB TTL 属性",
    "avoid": "",
    "questionCues": [
      "公司不需要保留比赛的任何数据",
      "该公司必须设计一种新的架构来降低举办竞赛的成本"
    ],
    "answerCues": {
      "D": [
        "为每条记录设置 DynamoDB TTL 属性"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "434": {
    "when": "一家公司提出新的安全要求 + 公司在私有子网部署一组 EC2 实例作为透明代理",
    "target": "禁用运行代理软件的 EC2 实例上的源/目标检查",
    "avoid": "",
    "questionCues": [
      "一家公司提出新的安全要求",
      "公司在私有子网部署一组 EC2 实例作为透明代理"
    ],
    "answerCues": {
      "A": [
        "禁用运行代理软件的 EC2 实例上的源/目标检查"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "435": {
    "when": "公司必须以自动方式管理所有基础设施 + 公司应该如何做才能以最少的努力满足这项新要求",
    "target": "通过导入现有资源来建立新堆栈",
    "avoid": "",
    "questionCues": [
      "公司必须以自动方式管理所有基础设施",
      "公司应该如何做才能以最少的努力满足这项新要求"
    ],
    "answerCues": {
      "C": [
        "通过导入现有资源来建立新堆栈"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "436": {
    "when": "并希望将其提供给公众下载 + 该公司希望有一种解决方案能够提供改进的下载性能和较低的传输成本",
    "target": "将游戏文件上传至S3存储桶",
    "avoid": "",
    "questionCues": [
      "并希望将其提供给公众下载",
      "该公司希望有一种解决方案能够提供改进的下载性能和较低的传输成本"
    ],
    "answerCues": {
      "C": [
        "将游戏文件上传至S3存储桶"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "437": {
    "when": "此数据库在具有两个私有子网的 VPC 中运作 + 该网站在上个月遭受了几次中断",
    "target": "A：Auto Scaling；C：并配置一个 Aurora 副本；F：建立一个额外的公有子网",
    "avoid": "",
    "questionCues": [
      "此数据库在具有两个私有子网的 VPC 中运作",
      "该网站在上个月遭受了几次中断"
    ],
    "answerCues": {
      "A": [
        "Auto Scaling"
      ],
      "C": [
        "并配置一个 Aurora 副本"
      ],
      "F": [
        "建立一个额外的公有子网"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "438": {
    "when": "架构师需要向访客显示自定义错误页面 + 哪两个步骤能以最少运维工作满足要求",
    "target": "A：配置S3存储桶来托管静态网页；E：通过配置 CloudFront 自定义错误页面来新增自定义错误响应",
    "avoid": "别选“通过新增健康检查来修改现有的Amazon Route 53记录”。",
    "questionCues": [
      "架构师需要向访客显示自定义错误页面",
      "哪两个步骤能以最少运维工作满足要求"
    ],
    "answerCues": {
      "A": [
        "配置S3存储桶来托管静态网页"
      ],
      "E": [
        "通过配置 CloudFront 自定义错误页面来新增自定义错误响应"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "439": {
    "when": "公司希望在将 DNS 切换到新数据库前 + 迁移策略能够满足要求",
    "target": "A：与新的 AWS 账户共用快照；B：AWS Database Migration Service",
    "avoid": "",
    "questionCues": [
      "公司希望在将 DNS 切换到新数据库前",
      "迁移策略能够满足要求"
    ],
    "answerCues": {
      "A": [
        "与新的 AWS 账户共用快照"
      ],
      "B": [
        "AWS Database Migration Service"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "440": {
    "when": "新功能要求全部 50 个公司 VPC 相互通信 + 哪两个步骤能以最少运维工作满足连接要求",
    "target": "A：建立中转网关；C：并将端点服务与 NLB 关联",
    "avoid": "",
    "questionCues": [
      "新功能要求全部 50 个公司 VPC 相互通信",
      "哪两个步骤能以最少运维工作满足连接要求"
    ],
    "answerCues": {
      "A": [
        "建立中转网关"
      ],
      "C": [
        "并将端点服务与 NLB 关联"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "441": {
    "when": "该公司已要求其解决方案架构师开发符合以下要求的解决方案 + 授予完全管理员权限",
    "target": "B：邀请每个 LOB 的 AWS 账户加入该组织；D：然后将该策略套用至 LOB 账户",
    "avoid": "",
    "questionCues": [
      "该公司已要求其解决方案架构师开发符合以下要求的解决方案",
      "授予完全管理员权限"
    ],
    "answerCues": {
      "B": [
        "邀请每个 LOB 的 AWS 账户加入该组织"
      ],
      "D": [
        "然后将该策略套用至 LOB 账户"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "442": {
    "when": "在灾难恢复测试中 + Route 53 没有自动将用户引导到另一区域",
    "target": "D：未启用评估目标运作状况的设定；E：尚未为与已停止的 Web 服务器关联的一个或多个加权资源记录集设定 HTTP 健康检查",
    "avoid": "",
    "questionCues": [
      "在灾难恢复测试中",
      "Route 53 没有自动将用户引导到另一区域"
    ],
    "answerCues": {
      "D": [
        "未启用评估目标运作状况的设定"
      ],
      "E": [
        "尚未为与已停止的 Web 服务器关联的一个或多个加权资源记录集设定 HTTP 健康检查"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "443": {
    "when": "因为其余服务器无法处理整个工作负载 + 该机构需要一种能够优化营运管理费用和成本的解决方案",
    "target": "并将其存储到 Amazon S3 存储桶中",
    "avoid": "",
    "questionCues": [
      "因为其余服务器无法处理整个工作负载",
      "该机构需要一种能够优化营运管理费用和成本的解决方案"
    ],
    "answerCues": {
      "B": [
        "并将其存储到 Amazon S3 存储桶中"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "444": {
    "when": "后端使用 Amazon RDS for MySQL 多可用区部署 + 最近发生故障时",
    "target": "B：以评估完整的应用程序功能；E：以减少后端数据库层的负载",
    "avoid": "",
    "questionCues": [
      "后端使用 Amazon RDS for MySQL 多可用区部署",
      "最近发生故障时"
    ],
    "answerCues": {
      "B": [
        "以评估完整的应用程序功能"
      ],
      "E": [
        "以减少后端数据库层的负载"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "445": {
    "when": "EKS + 该公司需要一个AWS托管解决方案来进行Kubernetes管理",
    "target": "通过在 Outposts 服务器上使用本地集群配置来部署 Amazon EKS 用于生产工作负载",
    "avoid": "别选“并在 EKS Anywhere 集群部署生产工作负载”。",
    "questionCues": [
      "EKS",
      "该公司需要一个AWS托管解决方案来进行Kubernetes管理"
    ],
    "answerCues": {
      "A": [
        "通过在 Outposts 服务器上使用本地集群配置来部署 Amazon EKS 用于生产工作负载"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "446": {
    "when": "一家公司使用 AWS Organizations 管理开发环境 + 各团队都需访问其中的实时数据",
    "target": "指示开发人员接受资源共享",
    "avoid": "",
    "questionCues": [
      "一家公司使用 AWS Organizations 管理开发环境",
      "各团队都需访问其中的实时数据"
    ],
    "answerCues": {
      "B": [
        "指示开发人员接受资源共享"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "447": {
    "when": "此解决方案必须协助识别导致成本增加的资源 + 并且必须自动通知公司的运维团队",
    "target": "使用 AWS 成本异常侦测建立监控类型为 AWS 服务的成本监控器",
    "avoid": "别选“使用 AWS Cost Explorer 确定过去 3 个月的平均每月成本”。",
    "questionCues": [
      "此解决方案必须协助识别导致成本增加的资源",
      "并且必须自动通知公司的运维团队"
    ],
    "answerCues": {
      "D": [
        "使用 AWS 成本异常侦测建立监控类型为 AWS 服务的成本监控器"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "448": {
    "when": "活动数据集的大小最大为 100 GB + 解决方案架构师必须设计一个 Multi-AZ 解决方案",
    "target": "实现到 DR Region 中的文件系统的复制",
    "avoid": "",
    "questionCues": [
      "活动数据集的大小最大为 100 GB",
      "解决方案架构师必须设计一个 Multi-AZ 解决方案"
    ],
    "answerCues": {
      "A": [
        "实现到 DR Region 中的文件系统的复制"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "449": {
    "when": "但自身不运行 FTP 服务器 + 公司需要集中收集数据",
    "target": "配置感测器将数据上传到EC2实例",
    "avoid": "",
    "questionCues": [
      "但自身不运行 FTP 服务器",
      "公司需要集中收集数据"
    ],
    "answerCues": {
      "C": [
        "配置感测器将数据上传到EC2实例"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "450": {
    "when": "每个AWS账户的管理员需要使用AmazonAthena查看其账户的详细成本和利用率数据",
    "target": "建立一个新的S3存储桶来存储成本和使用情况报告数据",
    "avoid": "",
    "questionCues": [
      "每个AWS账户的管理员需要使用AmazonAthena查看其账户的详细成本和利用率数据"
    ],
    "answerCues": {
      "D": [
        "建立一个新的S3存储桶来存储成本和使用情况报告数据"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "451": {
    "when": "公司必须更新现有的网络连接解决方案 + 以确保该解决方案具有高可用性、容错性和安全性",
    "target": "新增静态 AWS Site-to-Site VPN 作为辅助路径",
    "avoid": "别选“设定 MACsec 以加密Direct Connect 连接内的流量”。",
    "questionCues": [
      "公司必须更新现有的网络连接解决方案",
      "以确保该解决方案具有高可用性、容错性和安全性"
    ],
    "answerCues": {
      "D": [
        "新增静态 AWS Site-to-Site VPN 作为辅助路径"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "452": {
    "when": "其他用户必须能够从应用程序下载影片文件 + 该公司需要一种能够快速扩展的视讯存储解决方案",
    "target": "迁移到 Amazon DynamoDB",
    "avoid": "",
    "questionCues": [
      "其他用户必须能够从应用程序下载影片文件",
      "该公司需要一种能够快速扩展的视讯存储解决方案"
    ],
    "answerCues": {
      "B": [
        "迁移到 Amazon DynamoDB"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "453": {
    "when": "文件系统由 AWS KMS 密钥加密 + 架构师必须确保被删除的文档能够恢复",
    "target": "为文件系统实施每小时备份计划",
    "avoid": "",
    "questionCues": [
      "文件系统由 AWS KMS 密钥加密",
      "架构师必须确保被删除的文档能够恢复"
    ],
    "answerCues": {
      "A": [
        "为文件系统实施每小时备份计划"
      ]
    },
    "disputed": false,
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
    "when": "一家公司需要将本地的 60 个旧应用程序迁移到 AWS + 公司希望尽量缩短迁移时间",
    "target": "使用Elastic Beanstalk来部署和管理应用程序",
    "avoid": "",
    "questionCues": [
      "一家公司需要将本地的 60 个旧应用程序迁移到 AWS",
      "公司希望尽量缩短迁移时间"
    ],
    "answerCues": {
      "B": [
        "使用Elastic Beanstalk来部署和管理应用程序"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "456": {
    "when": "公司需要对存储在 Amazon S3 存储桶中的数据执行大型批次作业 + 过程可以承受中断",
    "target": "指定 SPOT_CAPACITY_OPTIMIZED 分配策略",
    "avoid": "",
    "questionCues": [
      "公司需要对存储在 Amazon S3 存储桶中的数据执行大型批次作业",
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
    "when": "公司要求收到取回请求后能在一周内取回数据 + 公司还需要限制传输带宽",
    "target": "设定 DataSync 代理将批次文件从 NFS 本地服务器",
    "avoid": "",
    "questionCues": [
      "公司要求收到取回请求后能在一周内取回数据",
      "公司还需要限制传输带宽"
    ],
    "answerCues": {
      "B": [
        "设定 DataSync 代理将批次文件从 NFS 本地服务器"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "458": {
    "when": "需要采集应用的关键绩效指标（KPI） + 公司希望按日、周、月统计每个客户去重后的用户数量",
    "target": "将每次成功登录存储为指标",
    "avoid": "别选“在每次成功登录时调用 AWS SDK”。",
    "questionCues": [
      "需要采集应用的关键绩效指标（KPI）",
      "公司希望按日、周、月统计每个客户去重后的用户数量"
    ],
    "answerCues": {
      "A": [
        "将每次成功登录存储为指标"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "459": {
    "when": "该公司的安全团队实施了一项新要求 + 解决方案架构师必须用短期解决方案取代密钥",
    "target": "配置适当的信任策略",
    "avoid": "",
    "questionCues": [
      "该公司的安全团队实施了一项新要求",
      "解决方案架构师必须用短期解决方案取代密钥"
    ],
    "answerCues": {
      "B": [
        "配置适当的信任策略"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "460": {
    "when": "架构师需要重新设计以优化成本 + 哪两个步骤最具成本效益",
    "target": "B：将网络爬虫过程转换为AWS Lambda函数；E：将结果存储在Amazon S3中",
    "avoid": "",
    "questionCues": [
      "架构师需要重新设计以优化成本",
      "哪两个步骤最具成本效益"
    ],
    "answerCues": {
      "B": [
        "将网络爬虫过程转换为AWS Lambda函数"
      ],
      "E": [
        "将结果存储在Amazon S3中"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "461": {
    "when": "AWS 上的新解决方案必须能够从 2 个Amazon EC2 实例扩展到 30 个EC2 实例",
    "target": "Amazon EFS",
    "avoid": "",
    "questionCues": [
      "AWS 上的新解决方案必须能够从 2 个Amazon EC2 实例扩展到 30 个EC2 实例"
    ],
    "answerCues": {
      "A": [
        "Amazon EFS"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "462": {
    "when": "用户通过 ALB 后的 EC2 Web 前端访问应用 + 并解决财务查询性能问题的方案",
    "target": "指示财务团队针对只读副本执行查询",
    "avoid": "",
    "questionCues": [
      "用户通过 ALB 后的 EC2 Web 前端访问应用",
      "并解决财务查询性能问题的方案"
    ],
    "answerCues": {
      "C": [
        "指示财务团队针对只读副本执行查询"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "463": {
    "when": "VPN + 公司希望进入新市场",
    "target": "建立接受 TCP 流量的 VPC 端点服务",
    "avoid": "",
    "questionCues": [
      "VPN",
      "公司希望进入新市场"
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
    "when": "其中仅允许管理员角色使用IAM操作 + 解决方案架构师无法访问整个公司的所有AWS账户",
    "target": "建立适用于所有 AWS 账户的 SCP",
    "avoid": "",
    "questionCues": [
      "其中仅允许管理员角色使用IAM操作",
      "解决方案架构师无法访问整个公司的所有AWS账户"
    ],
    "answerCues": {
      "C": [
        "建立适用于所有 AWS 账户的 SCP"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "465": {
    "when": "VPC + 该公司还希望让开发团队能够根据需要重新建立团队与共享服务账户的链接",
    "target": "在开发账户中接受共享",
    "avoid": "",
    "questionCues": [
      "VPC",
      "该公司还希望让开发团队能够根据需要重新建立团队与共享服务账户的链接"
    ],
    "answerCues": {
      "B": [
        "在开发账户中接受共享"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "466": {
    "when": "迁移到AWS + 解决方案架构师需要为从数据中心迁移所有工作负载产生总拥有成本 (TCO) 报告",
    "target": "启动 Windows EC2 实例",
    "avoid": "",
    "questionCues": [
      "迁移到AWS",
      "解决方案架构师需要为从数据中心迁移所有工作负载产生总拥有成本 (TCO) 报告"
    ],
    "answerCues": {
      "B": [
        "启动 Windows EC2 实例"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "467": {
    "when": "公司要求用户从最近的区域获取资源 + 若该区域不可用",
    "target": "建立指向两个 ALB 的 Route 53 延迟别名记录",
    "avoid": "",
    "questionCues": [
      "公司要求用户从最近的区域获取资源",
      "若该区域不可用"
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
    "when": "安全工程师偶尔会 + 解决方案架构师必须提高日志分析的性能并减少VPC流日志使用的存储空间",
    "target": "并将日志按小时分区",
    "avoid": "",
    "questionCues": [
      "安全工程师偶尔会",
      "解决方案架构师必须提高日志分析的性能并减少VPC流日志使用的存储空间"
    ],
    "answerCues": {
      "C": [
        "并将日志按小时分区"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "469": {
    "when": "公司必须使用 Direct Connect 连接通过中转 VIF 连接到 VPC 资源",
    "target": "B：通过中转 VIF 通告 on-premises 网络前缀；C：通过中转 VIF 将 VPC 前缀从 Direct Connect 网关通告到 on-premises 网络",
    "avoid": "",
    "questionCues": [
      "公司必须使用 Direct Connect 连接通过中转 VIF 连接到 VPC 资源"
    ],
    "answerCues": {
      "B": [
        "通过中转 VIF 通告 on-premises 网络前缀"
      ],
      "C": [
        "通过中转 VIF 将 VPC 前缀从 Direct Connect 网关通告到 on-premises 网络"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "470": {
    "when": "公司安全策略规定 + 对应用程序的访问必须仅限于公司分公司位置",
    "target": "使用分公司的公共地址清单建立 IP 访问控制组规则",
    "avoid": "",
    "questionCues": [
      "公司安全策略规定",
      "对应用程序的访问必须仅限于公司分公司位置"
    ],
    "answerCues": {
      "A": [
        "使用分公司的公共地址清单建立 IP 访问控制组规则"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "471": {
    "when": "使防火墙能随网络增长水平扩展 + 必须继续使用这些设备的政策",
    "target": "A：Gateway Load Balancer；C：创建 Auto Scaling 组和启动模板；E：在每个成员账户中建立 VPC 端点",
    "avoid": "",
    "questionCues": [
      "使防火墙能随网络增长水平扩展",
      "必须继续使用这些设备的政策"
    ],
    "answerCues": {
      "A": [
        "Gateway Load Balancer"
      ],
      "C": [
        "创建 Auto Scaling 组和启动模板"
      ],
      "E": [
        "在每个成员账户中建立 VPC 端点"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "472": {
    "when": "该数据库从AWS CloudFormation模板启动 + 此数据库配置为自动备份",
    "target": "A：在故障切换时提升该副本；D：将主要和次要端点设定为每个 Region 中的端点",
    "avoid": "",
    "questionCues": [
      "该数据库从AWS CloudFormation模板启动",
      "此数据库配置为自动备份"
    ],
    "answerCues": {
      "A": [
        "在故障切换时提升该副本"
      ],
      "D": [
        "将主要和次要端点设定为每个 Region 中的端点"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "473": {
    "when": "影响了应用性能 + Lambda 调用次数和数据库连接数显著增加",
    "target": "修改 Lambda 函数以使用代理端点",
    "avoid": "",
    "questionCues": [
      "影响了应用性能",
      "Lambda 调用次数和数据库连接数显著增加"
    ],
    "answerCues": {
      "C": [
        "修改 Lambda 函数以使用代理端点"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "474": {
    "when": "一家零售公司希望改进其应用程序架构 + 该解决方案必须提供近乎即时的更新分析",
    "target": "将各应用拆为微服务",
    "avoid": "",
    "questionCues": [
      "一家零售公司希望改进其应用程序架构",
      "该解决方案必须提供近乎即时的更新分析"
    ],
    "answerCues": {
      "C": [
        "将各应用拆为微服务"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "475": {
    "when": "解决方案架构师必须设计一个在所有 AWS 账户中启用 AWS CloudTrail 的解决方案",
    "target": "配置追踪以记录组织中所有 AWS 账户的所有事件",
    "avoid": "",
    "questionCues": [
      "解决方案架构师必须设计一个在所有 AWS 账户中启用 AWS CloudTrail 的解决方案"
    ],
    "answerCues": {
      "B": [
        "配置追踪以记录组织中所有 AWS 账户的所有事件"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "476": {
    "when": "该公司的安全策略规定 + 必须使用多重身份验证 (MFA) 才能访问 VPN",
    "target": "为 AD 连接器启用 MFA",
    "avoid": "",
    "questionCues": [
      "该公司的安全策略规定",
      "必须使用多重身份验证 (MFA) 才能访问 VPN"
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
    "when": "架构师必须制定迁移 AWS 的计划 + 在尽量提高可扩展性的同时尽量减少运维工作",
    "target": "A：重构前端；D：重构Java应用程序；E：Aurora",
    "avoid": "",
    "questionCues": [
      "架构师必须制定迁移 AWS 的计划",
      "在尽量提高可扩展性的同时尽量减少运维工作"
    ],
    "answerCues": {
      "A": [
        "重构前端"
      ],
      "D": [
        "重构Java应用程序"
      ],
      "E": [
        "Aurora"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "478": {
    "when": "该公司的安全准则规定 + AWS 上的所有资源都必须持续扫描安全漏洞",
    "target": "启动AmazonInspector扫描EKS节点和ECR存储库",
    "avoid": "",
    "questionCues": [
      "该公司的安全准则规定",
      "AWS 上的所有资源都必须持续扫描安全漏洞"
    ],
    "answerCues": {
      "B": [
        "启动AmazonInspector扫描EKS节点和ECR存储库"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "479": {
    "when": "通过其 JWT 中的加密属性识别这些用户 + 但它的流量影响了整个应用可用性",
    "target": "并将请求分别转发到票务服务或等候室服务",
    "avoid": "",
    "questionCues": [
      "通过其 JWT 中的加密属性识别这些用户",
      "但它的流量影响了整个应用可用性"
    ],
    "answerCues": {
      "C": [
        "并将请求分别转发到票务服务或等候室服务"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "480": {
    "when": "CloudFormation模板可以根据需要销毁并重新 + EC2实例无法再承担父账户中的角色",
    "target": "确认现有允许 sts:AssumeRole 的语句中角色 ARN 正确",
    "avoid": "",
    "questionCues": [
      "CloudFormation模板可以根据需要销毁并重新",
      "EC2实例无法再承担父账户中的角色"
    ],
    "answerCues": {
      "A": [
        "确认现有允许 sts:AssumeRole 的语句中角色 ARN 正确"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "481": {
    "when": "需要手工重启 EC2 + 以最少开发工作提高可靠性",
    "target": "Amazon Aurora",
    "avoid": "",
    "questionCues": [
      "需要手工重启 EC2",
      "以最少开发工作提高可靠性"
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
    "when": "公司希望收到后自动解密 + 接下来应如何完成自动解密配置",
    "target": "并在该步骤配置 PGP 解密参数",
    "avoid": "",
    "questionCues": [
      "公司希望收到后自动解密",
      "接下来应如何完成自动解密配置"
    ],
    "answerCues": {
      "C": [
        "并在该步骤配置 PGP 解密参数"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "483": {
    "when": "写入延迟需为个位数毫秒 + 必须在少于 1 分钟内恢复接受写入",
    "target": "并配置应用与主节点交互",
    "avoid": "别选“创建带只读副本的 Amazon ROS 数据库（英文原题如此”。",
    "questionCues": [
      "写入延迟需为个位数毫秒",
      "必须在少于 1 分钟内恢复接受写入"
    ],
    "answerCues": {
      "C": [
        "并配置应用与主节点交互"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "484": {
    "when": "公司需要将其云端成本分配给不同的业务部门 + 该公司还需要可视化每个业务部门的云端成本",
    "target": "组织的管理账户中 + 使用 Amazon QuickSight 进行视觉化",
    "avoid": "别选“将每个 S3 存储桶配置为其各自 AWS CUR 的目的地”。",
    "questionCues": [
      "公司需要将其云端成本分配给不同的业务部门",
      "该公司还需要可视化每个业务部门的云端成本"
    ],
    "answerCues": {
      "A": [
        "组织的管理账户中",
        "使用 Amazon QuickSight 进行视觉化"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "485": {
    "when": "DynamoDB + Lambda 也大量出现 TooManyRequestsException",
    "target": "A：DynamoDB；D：并批次处理数据",
    "avoid": "",
    "questionCues": [
      "DynamoDB",
      "Lambda 也大量出现 TooManyRequestsException"
    ],
    "answerCues": {
      "A": [
        "DynamoDB"
      ],
      "D": [
        "并批次处理数据"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "486": {
    "when": "部署在故障转移 Region 中 + 解决方案架构师应该做什么来配置解决方案的高可用性",
    "target": "将连接别名与每个 Region 中的目录相关联",
    "avoid": "别选“并创建 Route 53 多值应答路由策略”。",
    "questionCues": [
      "部署在故障转移 Region 中",
      "解决方案架构师应该做什么来配置解决方案的高可用性"
    ],
    "answerCues": {
      "A": [
        "将连接别名与每个 Region 中的目录相关联"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "487": {
    "when": "迁移到 AWS + 需要先评估本地环境、以图形查看虚拟机上各应用的依赖关系",
    "target": "在本地部署 Migration Evaluator Collector",
    "avoid": "",
    "questionCues": [
      "迁移到 AWS",
      "需要先评估本地环境、以图形查看虚拟机上各应用的依赖关系"
    ],
    "answerCues": {
      "D": [
        "在本地部署 Migration Evaluator Collector"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "488": {
    "when": "该公司的客户使用 API 访问其账户中的数据 + 该公司希望提高这些 API 的安全性",
    "target": "保护 API Gateway API + 监控对 API 访问的恶意尝试",
    "avoid": "别选“配置 Amazon Inspector 来分析这两个 API”。",
    "questionCues": [
      "该公司的客户使用 API 访问其账户中的数据",
      "该公司希望提高这些 API 的安全性"
    ],
    "answerCues": {
      "C": [
        "保护 API Gateway API",
        "监控对 API 访问的恶意尝试"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "489": {
    "when": "API 性能下降并出现数据库连接失败 + 公司希望尽量降低 Lambda 延迟并支持突发流量",
    "target": "为数据库建立一个 RDS 代理端点 + 增加 Lambda 函数的预置并发",
    "avoid": "别选“增加 Lambda 函数的保留并发度”。",
    "questionCues": [
      "API 性能下降并出现数据库连接失败",
      "公司希望尽量降低 Lambda 延迟并支持突发流量"
    ],
    "answerCues": {
      "B": [
        "为数据库建立一个 RDS 代理端点",
        "增加 Lambda 函数的预置并发"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "490": {
    "when": "公司要求所有内部应用程序连接都使用私有 IP 地址 + 且内部服务无法连接到接口端点",
    "target": "启用 VPC 属性上的私有 DNS 选项",
    "avoid": "",
    "questionCues": [
      "公司要求所有内部应用程序连接都使用私有 IP 地址",
      "且内部服务无法连接到接口端点"
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
    "when": "一家公司开发对延迟敏感的应用 + 其中多个 Java Lambda 函数需要尽快初始化",
    "target": "将产生唯一 ID 的代码移至处理程序中",
    "avoid": "",
    "questionCues": [
      "一家公司开发对延迟敏感的应用",
      "其中多个 Java Lambda 函数需要尽快初始化"
    ],
    "answerCues": {
      "D": [
        "将产生唯一 ID 的代码移至处理程序中"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "492": {
    "when": "EC2 实例不会在 AWS Systems Manager 控制台中显示为托管实例",
    "target": "A：验证 Systems Manager 代理程序是否已安装在实例上并且正在执行；B：验证是否为实例指派了适当的 Systems Manager IAM 角色",
    "avoid": "",
    "questionCues": [
      "EC2 实例不会在 AWS Systems Manager 控制台中显示为托管实例"
    ],
    "answerCues": {
      "A": [
        "验证 Systems Manager 代理程序是否已安装在实例上并且正在执行"
      ],
      "B": [
        "验证是否为实例指派了适当的 Systems Manager IAM 角色"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "493": {
    "when": "开发人员有以下要求 + 自动化单元测试和安全扫描",
    "target": "当单元测试失败时",
    "avoid": "",
    "questionCues": [
      "开发人员有以下要求",
      "自动化单元测试和安全扫描"
    ],
    "answerCues": {
      "A": [
        "当单元测试失败时"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "494": {
    "when": "公司需要为旧的本地文件应用提供可扩展存储 + 并保持对常用数据的低延迟访问",
    "target": "部署采用缓存卷模式的 AWS Storage Gateway 卷网关",
    "avoid": "",
    "questionCues": [
      "公司需要为旧的本地文件应用提供可扩展存储",
      "并保持对常用数据的低延迟访问"
    ],
    "answerCues": {
      "C": [
        "部署采用缓存卷模式的 AWS Storage Gateway 卷网关"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "495": {
    "when": "公司安全策略要求在将数据放入S3存储桶之前对数据进行加密 + 解决方案架构师必须设计一个解决方案",
    "target": "更新应用代码",
    "avoid": "",
    "questionCues": [
      "公司安全策略要求在将数据放入S3存储桶之前对数据进行加密",
      "解决方案架构师必须设计一个解决方案"
    ],
    "answerCues": {
      "A": [
        "更新应用代码"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "496": {
    "when": "最近唯一变化是 S3 桶内新增了大量关键内容 + 公司不希望修改生产环境的启动脚本",
    "target": "增加Auto Scaling组健康检查宽限期",
    "avoid": "",
    "questionCues": [
      "最近唯一变化是 S3 桶内新增了大量关键内容",
      "公司不希望修改生产环境的启动脚本"
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
    "when": "某公司需要将一些on-premises Oracle 数据库迁移到AWS + 出于业务合规性原因",
    "target": "Amazon RDS",
    "avoid": "",
    "questionCues": [
      "某公司需要将一些on-premises Oracle 数据库迁移到AWS",
      "出于业务合规性原因"
    ],
    "answerCues": {
      "D": [
        "Amazon RDS"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "498": {
    "when": "将临时数据存入 S3 + 架构师需要在不大幅更改架构的情况下解决",
    "target": "建立一个 Lambda 函数以从 S3 存储桶中删除对象",
    "avoid": "",
    "questionCues": [
      "将临时数据存入 S3",
      "架构师需要在不大幅更改架构的情况下解决"
    ],
    "answerCues": {
      "A": [
        "建立一个 Lambda 函数以从 S3 存储桶中删除对象"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "499": {
    "when": "用户在影片上传后的前180天内频繁访问影片 + 解决方案架构师需要优化应用程序的S3成本",
    "target": "C：使不完整的分段上传在启动后 7 天到期；E：以在 180 天后将对象过渡到 S3 标准非频繁访问 (S3 标准 IA)",
    "avoid": "",
    "questionCues": [
      "用户在影片上传后的前180天内频繁访问影片",
      "解决方案架构师需要优化应用程序的S3成本"
    ],
    "answerCues": {
      "C": [
        "使不完整的分段上传在启动后 7 天到期"
      ],
      "E": [
        "以在 180 天后将对象过渡到 S3 标准非频繁访问 (S3 标准 IA)"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "500": {
    "when": "方案需要保证高峰流量下的可扩展性和低延迟访问 + 同时优化数据库成本",
    "target": "将 AWS WAF 与 CloudFront 集成",
    "avoid": "",
    "questionCues": [
      "方案需要保证高峰流量下的可扩展性和低延迟访问",
      "同时优化数据库成本"
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
    "when": "启动实例的过程需要几分钟 + 该公司需要在自动扩展期间启动新实例时减少应用程序延迟",
    "target": "使用动态扩展策略 + 为 Auto Scaling 组启用暖池",
    "avoid": "别选“使用预测性扩展策略”。",
    "questionCues": [
      "启动实例的过程需要几分钟",
      "该公司需要在自动扩展期间启动新实例时减少应用程序延迟"
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
    "when": "某公司需要将on-premises数据库群组迁移到Amazon RDS",
    "target": "C：使用 AWS 架构转换工具 (AWS SCT) 分析来源数据库以寻找所需的变更；D：AWS Database Migration Service",
    "avoid": "",
    "questionCues": [
      "某公司需要将on-premises数据库群组迁移到Amazon RDS"
    ],
    "answerCues": {
      "C": [
        "使用 AWS 架构转换工具 (AWS SCT) 分析来源数据库以寻找所需的变更"
      ],
      "D": [
        "AWS Database Migration Service"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "503": {
    "when": "一家公司正在将其部落格平台迁移到AWS + 公司需要在不耽误内容更新的情况下迁移部落格平台",
    "target": "C：以提供内容；D：AWS Snowball Edge Storage Optimized",
    "avoid": "",
    "questionCues": [
      "一家公司正在将其部落格平台迁移到AWS",
      "公司需要在不耽误内容更新的情况下迁移部落格平台"
    ],
    "answerCues": {
      "C": [
        "以提供内容"
      ],
      "D": [
        "AWS Snowball Edge Storage Optimized"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "504": {
    "when": "一家公司计划将旧版 on-premises 应用程序迁移到 AWS + 该公司无权访问原始代码",
    "target": "使用 AWS Elastic Beanstalk",
    "avoid": "",
    "questionCues": [
      "一家公司计划将旧版 on-premises 应用程序迁移到 AWS",
      "该公司无权访问原始代码"
    ],
    "answerCues": {
      "D": [
        "使用 AWS Elastic Beanstalk"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "505": {
    "when": "该公司需要将平台迁移到AWS + 以在保持性能的同时减少运维开销",
    "target": "A：AWS Step Functions + Amazon CloudFront；D：AWS IoT Core 发布消息；E：迁移到 Amazon DocumentDB",
    "avoid": "",
    "questionCues": [
      "该公司需要将平台迁移到AWS",
      "以在保持性能的同时减少运维开销"
    ],
    "answerCues": {
      "A": [
        "AWS Step Functions",
        "Amazon CloudFront"
      ],
      "D": [
        "AWS IoT Core 发布消息"
      ],
      "E": [
        "迁移到 Amazon DocumentDB"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "506": {
    "when": "导致人们担心成本增加 + 该公司需要在不重新设计 Lambda 函数的情况下限制成本和使用量",
    "target": "在使用计划中定义节流限制和配额",
    "avoid": "",
    "questionCues": [
      "导致人们担心成本增加",
      "该公司需要在不重新设计 Lambda 函数的情况下限制成本和使用量"
    ],
    "answerCues": {
      "D": [
        "在使用计划中定义节流限制和配额"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "507": {
    "when": "定价文件会下载到每个 EC2 实例 + EC2 实例有时会使用过时的定价消息",
    "target": "挂载包含定价文件的 S3 存储桶",
    "avoid": "",
    "questionCues": [
      "定价文件会下载到每个 EC2 实例",
      "EC2 实例有时会使用过时的定价消息"
    ],
    "answerCues": {
      "C": [
        "挂载包含定价文件的 S3 存储桶"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "508": {
    "when": "经理希望允许测试人员启动自己的环境 + 但不希望向每个用户授予广泛的权限",
    "target": "为该产品添加启动约束",
    "avoid": "",
    "questionCues": [
      "经理希望允许测试人员启动自己的环境",
      "但不希望向每个用户授予广泛的权限"
    ],
    "answerCues": {
      "B": [
        "为该产品添加启动约束"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "509": {
    "when": "ALB + 解决方案架构师需要实施一个解决方案来实现这些目标并最大限度地减少管理开销",
    "target": "A：包括Region；D：使用基于延迟的路由；E：启用 DynamoDB 流来",
    "avoid": "",
    "questionCues": [
      "ALB",
      "解决方案架构师需要实施一个解决方案来实现这些目标并最大限度地减少管理开销"
    ],
    "answerCues": {
      "A": [
        "包括Region"
      ],
      "D": [
        "使用基于延迟的路由"
      ],
      "E": [
        "启用 DynamoDB 流来"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "510": {
    "when": "该公司希望数据科学家只能访问他们自己的工作成果 + 显示每个用户访问了哪些文件",
    "target": "A：建立自定义 IAM Identity Center 权限集；C：配置AWSCloudTrail记录S3数据事件并将日志投递到S3桶",
    "avoid": "",
    "questionCues": [
      "该公司希望数据科学家只能访问他们自己的工作成果",
      "显示每个用户访问了哪些文件"
    ],
    "answerCues": {
      "A": [
        "建立自定义 IAM Identity Center 权限集"
      ],
      "C": [
        "配置AWSCloudTrail记录S3数据事件并将日志投递到S3桶"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "511": {
    "when": "容器执行的数据处理可能需要长达 2 小时 + 该公司需要重构应用程序以消除运行容器的EC2实例",
    "target": "配置 S3 事件通知以在建立对象时调用 Lambda 函数",
    "avoid": "",
    "questionCues": [
      "容器执行的数据处理可能需要长达 2 小时",
      "该公司需要重构应用程序以消除运行容器的EC2实例"
    ],
    "answerCues": {
      "C": [
        "配置 S3 事件通知以在建立对象时调用 Lambda 函数"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "512": {
    "when": "公司必须能够根据影片中的资讯进行搜索 + 该公司希望将这些影片迁移到AWS",
    "target": "提取所需元数据",
    "avoid": "",
    "questionCues": [
      "公司必须能够根据影片中的资讯进行搜索",
      "该公司希望将这些影片迁移到AWS"
    ],
    "answerCues": {
      "A": [
        "提取所需元数据"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "513": {
    "when": "公司需要优化 AWS Organizations 组织中包含多个账户的 AWS 环境的成本",
    "target": "延长 3 年期限",
    "avoid": "",
    "questionCues": [
      "公司需要优化 AWS Organizations 组织中包含多个账户的 AWS 环境的成本"
    ],
    "answerCues": {
      "A": [
        "延长 3 年期限"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "514": {
    "when": "公司必须以最小延迟且不暴露于公共互联网的方式将on-premises数据路由到Amazon S3",
    "target": "A：实作 S3 多Region 接入点；E：AWS PrivateLink",
    "avoid": "",
    "questionCues": [
      "公司必须以最小延迟且不暴露于公共互联网的方式将on-premises数据路由到Amazon S3"
    ],
    "answerCues": {
      "A": [
        "实作 S3 多Region 接入点"
      ],
      "E": [
        "AWS PrivateLink"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "515": {
    "when": "需要尽快完成 + 该公司的合规团队要求每个虚拟机的每次软件安装和修改都必须提交变更请求并获得批准",
    "target": "将 AWS Application Migration Service 无代理设备部署到 VMware vCenter",
    "avoid": "",
    "questionCues": [
      "需要尽快完成",
      "该公司的合规团队要求每个虚拟机的每次软件安装和修改都必须提交变更请求并获得批准"
    ],
    "answerCues": {
      "C": [
        "将 AWS Application Migration Service 无代理设备部署到 VMware vCenter"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "516": {
    "when": "该公司需要存储 AWS 账户活动并使用 SQL 从中央位置查询数据",
    "target": "为组织中的所有账户启用该数据存储",
    "avoid": "",
    "questionCues": [
      "该公司需要存储 AWS 账户活动并使用 SQL 从中央位置查询数据"
    ],
    "answerCues": {
      "B": [
        "为组织中的所有账户启用该数据存储"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "517": {
    "when": "Lambda 函数处理数据 + 该公司希望以整合的方式实现Web应用程序的用户授权",
    "target": "更新 Web 应用程序以从身份提供者取得令牌",
    "avoid": "",
    "questionCues": [
      "Lambda 函数处理数据",
      "该公司希望以整合的方式实现Web应用程序的用户授权"
    ],
    "answerCues": {
      "A": [
        "更新 Web 应用程序以从身份提供者取得令牌"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "518": {
    "when": "本公司的安全策略要求对EBS卷进行加密 + 该公司需要实施自动化解决方案来加密 EBS 卷",
    "target": "AWS Config 托管规则 + 自动修复操作 + 使新建 EBS 卷始终加密",
    "avoid": "核对题目限制与完整选项。",
    "questionCues": [
      "本公司的安全策略要求对EBS卷进行加密",
      "该公司需要实施自动化解决方案来加密 EBS 卷"
    ],
    "answerCues": {
      "D": [
        "AWS Config 托管规则",
        "自动修复操作",
        "使新建 EBS 卷始终加密"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "519": {
    "when": "工作负载已接近运行账户中可用的最大数量的EC2实例 + 解决方案架构师应该做什么来满足这个要求",
    "target": "使用 Amazon CloudWatch 监控 AWS/Usage 指标命名空间中发布的服务配额",
    "avoid": "",
    "questionCues": [
      "工作负载已接近运行账户中可用的最大数量的EC2实例",
      "解决方案架构师应该做什么来满足这个要求"
    ],
    "answerCues": {
      "B": [
        "使用 Amazon CloudWatch 监控 AWS/Usage 指标命名空间中发布的服务配额"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "520": {
    "when": "Lambda 函数的子集必须接收自动代码扫描 + 而不是针对所有 Lambda 函数",
    "target": "A：启动自动 CVE 扫描；B：在 Amazon Inspector 中；E：在标签中",
    "avoid": "",
    "questionCues": [
      "Lambda 函数的子集必须接收自动代码扫描",
      "而不是针对所有 Lambda 函数"
    ],
    "answerCues": {
      "A": [
        "启动自动 CVE 扫描"
      ],
      "B": [
        "在 Amazon Inspector 中"
      ],
      "E": [
        "在标签中"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "521": {
    "when": "该公司希望 + 应用程序账户中的EC2实例需要访问存储应用程序数据的Amazon S3",
    "target": "建立VPC对等连接以访问核心账户中的补丁来源存储库EC2实例",
    "avoid": "",
    "questionCues": [
      "该公司希望",
      "应用程序账户中的EC2实例需要访问存储应用程序数据的Amazon S3"
    ],
    "answerCues": {
      "C": [
        "建立VPC对等连接以访问核心账户中的补丁来源存储库EC2实例"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "522": {
    "when": "应用程序必须能够访问 eu-west-1 Region 中的一个 VPC 中的资源",
    "target": "为 us-east-2 中的每个 VPC 到 eu-west-1 中的 VPC 建立一个 VPC 对等连接",
    "avoid": "",
    "questionCues": [
      "应用程序必须能够访问 eu-west-1 Region 中的一个 VPC 中的资源"
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
    "target": "A：创建一个 Amazon SES 配置集；C：按收件人、主题和发送时间查询 Amazon S3 存储桶中的日志",
    "avoid": "",
    "questionCues": [
      "该公司需要",
      "该公司还需要能够根据收件人、主题和发送时间进行搜寻"
    ],
    "answerCues": {
      "A": [
        "创建一个 Amazon SES 配置集"
      ],
      "C": [
        "按收件人、主题和发送时间查询 Amazon S3 存储桶中的日志"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "524": {
    "when": "迁移到 AWS 并 + 该公司希望跨 AWS 账户监控 Amazon EC2 实例的成本效益",
    "target": "并停止未充分利用的开发 EC2 实例",
    "avoid": "",
    "questionCues": [
      "迁移到 AWS 并",
      "该公司希望跨 AWS 账户监控 Amazon EC2 实例的成本效益"
    ],
    "answerCues": {
      "C": [
        "并停止未充分利用的开发 EC2 实例"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "525": {
    "when": "性能指标显示 + 公司需要一种新的架构来解决应用程序响应缓慢的问题",
    "target": "将最小容量设定为 4",
    "avoid": "",
    "questionCues": [
      "性能指标显示",
      "公司需要一种新的架构来解决应用程序响应缓慢的问题"
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
    "when": "AWS IoT Core + 必须在少于 30 分钟的时间内让数据在 Amazon S3 中可用",
    "target": "Amazon Kinesis Data Firehose",
    "avoid": "",
    "questionCues": [
      "AWS IoT Core",
      "必须在少于 30 分钟的时间内让数据在 Amazon S3 中可用"
    ],
    "answerCues": {
      "B": [
        "Amazon Kinesis Data Firehose"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "527": {
    "when": "数据科学家需要从 EC2 实例访问该数据湖 + 分配一个具有 Amazon S3 访问权限的角色",
    "target": "B：在数据科学家的 AWS 账户中；E：新增 S3 存储桶策略",
    "avoid": "别选“将 S3 流量路由至 S3 接入点”。",
    "questionCues": [
      "数据科学家需要从 EC2 实例访问该数据湖",
      "分配一个具有 Amazon S3 访问权限的角色"
    ],
    "answerCues": {
      "B": [
        "在数据科学家的 AWS 账户中"
      ],
      "E": [
        "新增 S3 存储桶策略"
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
    "target": "A：为 S3 存储桶建立网关 VPC 端点；E：将预测扩展策略替换为针对已安排活动的计划扩展策略",
    "avoid": "",
    "questionCues": [
      "Auto Scaling 组使用预测扩展策略",
      "公司需要在不降低平台可用性的情况下优化平台成本"
    ],
    "answerCues": {
      "A": [
        "为 S3 存储桶建立网关 VPC 端点"
      ],
      "E": [
        "将预测扩展策略替换为针对已安排活动的计划扩展策略"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  }
};
