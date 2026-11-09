/* Per-question five-second cues. Every cue is traceable to the Simplified Chinese question bank. */
const QUICK_ANSWER_CARDS = {
  "1": {
    "when": "所有VPC应该能够解析cloud.example.com + 本地系统应该能够解析并连接到cloud.example.com",
    "target": "将私有托管区域关联到所有VPC + 在共享服务VPC中创建一个Route 53入站解析器",
    "avoid": "别选“将私有托管区域关联到共享服务VPC”；认准“将私有托管区域关联到所有VPC”。",
    "questionCues": [
      "所有VPC应该能够解析cloud.example.com",
      "本地系统应该能够解析并连接到cloud.example.com"
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
    "when": "该公司需要一个能够让API故障转移到不同AWS区域的解决方案 + 该公司使用Amazon Route 53进行DNS管理",
    "target": "将Route 53 DNS记录更改为故障转移记录 + 将DynamoDB表转换为全局表",
    "avoid": "别选“将Route 53 DNS记录更改为多值答案”；认准“将Route 53 DNS记录更改为故障转移记录”。",
    "questionCues": [
      "该公司需要一个能够让API故障转移到不同AWS区域的解决方案",
      "该公司使用Amazon Route 53进行DNS管理"
    ],
    "answerCues": {
      "C": [
        "将Route 53 DNS记录更改为故障转移记录",
        "将DynamoDB表转换为全局表"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "3": {
    "when": "管理员在组织根目录使用拒绝列表SCP来管理对受限服务的访问 + 其中有一个名为Production的单一OU来管理多个账户",
    "target": "将组织的根目录SCP移至Production OU + 为新账户创建一个名为Onboarding的临时OU",
    "avoid": "别选“为公司的标准AWS Config规则创建AWS Service Catalog产品”。",
    "questionCues": [
      "管理员在组织根目录使用拒绝列表SCP来管理对受限服务的访问",
      "其中有一个名为Production的单一OU来管理多个账户"
    ],
    "answerCues": {
      "D": [
        "将组织的根目录SCP移至Production OU",
        "为新账户创建一个名为Onboarding的临时OU"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "4": {
    "when": "同时允许应用程式层和数据库层扩展 + 因此公司正在将应用程式和数据库迁移到AWS + Amazon EC2 Auto Scaling",
    "target": "使用具有轮询路由和启用粘性会话的Application Load Balancer + 为Aurora Replicas启用Aurora Auto Scaling",
    "avoid": "别选“为Aurora writers启用Aurora Auto Scaling”。",
    "questionCues": [
      "同时允许应用程式层和数据库层扩展",
      "因此公司正在将应用程式和数据库迁移到AWS",
      "Amazon EC2 Auto Scaling"
    ],
    "answerCues": {
      "C": [
        "使用具有轮询路由和启用粘性会话的Application Load Balancer",
        "为Aurora Replicas启用Aurora Auto Scaling"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "5": {
    "when": "该公司希望将服务迁移到AWS + 该公司已将应用程式迁移为一组AWS Lambda函数 + 并保留对旧设备的支持能力",
    "target": "创建一个Lambda@Edge函数 + 配置CloudFront分发将请求转发给ALB",
    "avoid": "别选“创建一个CloudFront函数”；认准“创建一个Lambda@Edge函数”。",
    "questionCues": [
      "该公司希望将服务迁移到AWS",
      "该公司已将应用程式迁移为一组AWS Lambda函数",
      "并保留对旧设备的支持能力"
    ],
    "answerCues": {
      "D": [
        "创建一个Lambda@Edge函数",
        "配置CloudFront分发将请求转发给ALB"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "6": {
    "when": "一家零售公司需要向另一家公司（其业务伙伴）提供一系列数据文件 + 这些文件存储在Amazon S3存储桶中 + IAM",
    "target": "C：\"Principal\": {\"AWS\": \"arn:aws:iam::AccountB:user/User_DataProcessor\"}；D：在Account B中，将User_DataProcessor的权限设置为以下内容 + s3:ListBucket",
    "avoid": "C 看 Bucket Policy 的 Principal；D 看 Account B 用户自身权限，两边都要授权。",
    "questionCues": [
      "一家零售公司需要向另一家公司（其业务伙伴）提供一系列数据文件",
      "这些文件存储在Amazon S3存储桶中",
      "IAM"
    ],
    "answerCues": {
      "C": [
        "\"Principal\": {\"AWS\": \"arn:aws:iam::AccountB:user/User_DataProcessor\"}"
      ],
      "D": [
        "在Account B中，将User_DataProcessor的权限设置为以下内容",
        "s3:ListBucket"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "7": {
    "when": "解决方案架构师需要使用最小化操作复杂性的无伺服器架构来设计更新的应用程式 + 该公司需要将应用程式重构为在容器中运行的微服务",
    "target": "配置两个自动扩展的Amazon Elastic Container Service（Amazon ECS）集群",
    "avoid": "别选“配置两个自动扩展的Amazon Elastic Kubernetes Service（Amazon EKS）集群”。",
    "questionCues": [
      "解决方案架构师需要使用最小化操作复杂性的无伺服器架构来设计更新的应用程式",
      "该公司需要将应用程式重构为在容器中运行的微服务"
    ],
    "answerCues": {
      "B": [
        "配置两个自动扩展的Amazon Elastic Container Service（Amazon ECS）集群"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "8": {
    "when": "该公司需要通过使应用程式能够自动故障转移到备份区域来将其RTO降低到15分钟以下 + Auto Scaling组的最小值和最大值设置为零",
    "target": "配置Route 53 + 当健康检查失败时将流量路由到备份区域的ALB",
    "avoid": "别选“使用基于延迟的路由策略重新配置应用程式的Route 53记录”；认准“配置Route 53”。",
    "questionCues": [
      "该公司需要通过使应用程式能够自动故障转移到备份区域来将其RTO降低到15分钟以下",
      "Auto Scaling组的最小值和最大值设置为零"
    ],
    "answerCues": {
      "B": [
        "配置Route 53",
        "当健康检查失败时将流量路由到备份区域的ALB"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "9": {
    "when": "以便基础架构能够以最少的停机时间自动从故障中恢复 + 解决方案架构师需要改进应用程式的架构 + 基础架构的每个部分都必须健康且处于活动状态",
    "target": "A：确保EC2实例是Auto Scaling组的一部分；D：创建一个跨两个可用区域的Multi-AZ部署；F：在集群上启用Multi-AZ",
    "avoid": "别选“配置集群使用一个最小容量为两个实例的Auto Scaling组”；认准“确保EC2实例是Auto Scaling组的一部分”。",
    "questionCues": [
      "以便基础架构能够以最少的停机时间自动从故障中恢复",
      "解决方案架构师需要改进应用程式的架构",
      "基础架构的每个部分都必须健康且处于活动状态"
    ],
    "answerCues": {
      "A": [
        "确保EC2实例是Auto Scaling组的一部分"
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
    "when": "解决方案架构师需要为访问者提供自定义错误页面 + ALB偶尔返回502状态码（Bad Gateway）错误 + 而不是标准的ALB错误页面",
    "target": "A：配置S3存储桶以托管静态网页；E：通过配置CloudFront自定义错误页面来添加自定义错误响应",
    "avoid": "别选“通过添加健康检查来修改现有的Amazon Route 53记录”；认准“配置S3存储桶以托管静态网页”。",
    "questionCues": [
      "解决方案架构师需要为访问者提供自定义错误页面",
      "ALB偶尔返回502状态码（Bad Gateway）错误",
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
    "when": "个人帐户必须能够在子网内建立 AWS 资源 + 个人帐户无法管理自己的网路 + 基础设施团队必须使用此帐户来管理网路",
    "target": "B：从AWS Organizations管理帐户启用资源共享；D：选择与资源共享关联的每个子网路",
    "avoid": "别选“在基础架构帐户的AWS Resource Access Manager中建立资源共用”。",
    "questionCues": [
      "个人帐户必须能够在子网内建立 AWS 资源",
      "个人帐户无法管理自己的网路",
      "基础设施团队必须使用此帐户来管理网路"
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
    "when": "所有权限都必须符合最小权限原则 + 要求使用不穿越网路的私人连线 + 该公司制定了内部安全政策",
    "target": "建立 AWS PrivateLink 介面 VPC 端点 + 将安全性群组与端点关联",
    "avoid": "别选“建立 AWS PrivateLink 端点服务”；认准“建立 AWS PrivateLink 介面 VPC 端点”。",
    "questionCues": [
      "所有权限都必须符合最小权限原则",
      "要求使用不穿越网路的私人连线",
      "该公司制定了内部安全政策"
    ],
    "answerCues": {
      "A": [
        "建立 AWS PrivateLink 介面 VPC 端点",
        "将安全性群组与端点关联"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "13": {
    "when": "管理需要一份显示所有伺服器和实例的补丁状态的单一报告 + 一家公司需要为其伺服器实施修补流程 + Amazon EC2",
    "target": "使用AWS Systems Manager管理on-premises伺服器和EC2实例上的修补程式 + 使用 Systems Manager 产生补丁合规性报告",
    "avoid": "别选“使用 AWS OpsWorks 管理 on-premises 伺服器和 EC2 实例上的修补程式”。",
    "questionCues": [
      "管理需要一份显示所有伺服器和实例的补丁状态的单一报告",
      "一家公司需要为其伺服器实施修补流程",
      "Amazon EC2"
    ],
    "answerCues": {
      "A": [
        "使用AWS Systems Manager管理on-premises伺服器和EC2实例上的修补程式",
        "使用 Systems Manager 产生补丁合规性报告"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "14": {
    "when": "安全团队发现一些已终止的EC2实例的日志文件缺失 + EC2实例定期扩展和缩减 + 复制到中央S3存储桶",
    "target": "并向Auto Scaling组发送CONTINUE以终止实例 + 其中包含将日志文件复制到Amazon S3的脚本",
    "avoid": "别选“并将脚本存储在EC2实例上的文件中”；认准“并向Auto Scaling组发送CONTINUE以终止实例”。",
    "questionCues": [
      "安全团队发现一些已终止的EC2实例的日志文件缺失",
      "EC2实例定期扩展和缩减",
      "复制到中央S3存储桶"
    ],
    "answerCues": {
      "B": [
        "并向Auto Scaling组发送CONTINUE以终止实例",
        "其中包含将日志文件复制到Amazon S3的脚本"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "15": {
    "when": "故障排除显示 db.example.com 在 Amazon EC2 实例上无法解析 + 应用程式无法启动 + DNS",
    "target": "C：建立授权以将 Account A 中的私人托管区域与 Account B 中的新 VPC 关联。；E：将 Account B 中的新 VPC 与 Account A 中的托管区域关联",
    "avoid": "别选“将资料库部署在新 VPC 中的单独 EC2 实例上”。",
    "questionCues": [
      "故障排除显示 db.example.com 在 Amazon EC2 实例上无法解析",
      "应用程式无法启动",
      "DNS"
    ],
    "answerCues": {
      "C": [
        "建立授权以将 Account A 中的私人托管区域与 Account B 中的新 VPC 关联。"
      ],
      "E": [
        "将 Account B 中的新 VPC 与 Account A 中的托管区域关联"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "16": {
    "when": "用户报告在尝试访问网站或观看视频时出现缓冲和超时问题 + EC2实例位于Application Load Balancer（ALB）后面",
    "target": "将分发指向S3存储桶 + 并将视频从EFS迁移到Amazon S3",
    "avoid": "别选“在关闭时复制到Amazon S3”；认准“将分发指向S3存储桶”。",
    "questionCues": [
      "用户报告在尝试访问网站或观看视频时出现缓冲和超时问题",
      "EC2实例位于Application Load Balancer（ALB）后面"
    ],
    "answerCues": {
      "C": [
        "将分发指向S3存储桶",
        "并将视频从EFS迁移到Amazon S3"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "17": {
    "when": "此解决方案也必须透过同一对 Direct Connect 连接提供与其他 Regions 的连接 + 当公司扩展到其他 Regions 时",
    "target": "并将两个私有虚拟介面连接到Direct Connect网关 + 配置Direct Connect网关",
    "avoid": "别选“并将新的私有虚拟介面连接到单一VPC”；认准“并将两个私有虚拟介面连接到Direct Connect网关”。",
    "questionCues": [
      "此解决方案也必须透过同一对 Direct Connect 连接提供与其他 Regions 的连接",
      "当公司扩展到其他 Regions 时"
    ],
    "answerCues": {
      "A": [
        "并将两个私有虚拟介面连接到Direct Connect网关",
        "配置Direct Connect网关"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "18": {
    "when": "该公司希望重新建构应用程序 + 运行的用于处理 Amazon SQS 伫列的 EC2 实例组成 + Amazon EC2",
    "target": "使用S3事件通知将事件发布到SQS队列 + 将上传的影片储存在Amazon S3中",
    "avoid": "别选“并将档案系统挂载到Web应用程式的EC2实例”；认准“使用S3事件通知将事件发布到SQS队列”。",
    "questionCues": [
      "该公司希望重新建构应用程序",
      "运行的用于处理 Amazon SQS 伫列的 EC2 实例组成",
      "Amazon EC2"
    ],
    "answerCues": {
      "C": [
        "使用S3事件通知将事件发布到SQS队列",
        "将上传的影片储存在Amazon S3中"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "19": {
    "when": "该公司希望减少部署 Lambda 函数提供的新版本应用程式逻辑的时间 + AWS CLI + AWS Lambda",
    "target": "使用AWSSAM和内建的AWS CodeDeploy部署新的Lambda版本 + Amazon CloudWatch",
    "avoid": "别选“建立AWS CloudFormation更改集并部署”。",
    "questionCues": [
      "该公司希望减少部署 Lambda 函数提供的新版本应用程式逻辑的时间",
      "AWS CLI",
      "AWS Lambda"
    ],
    "answerCues": {
      "B": [
        "使用AWSSAM和内建的AWS CodeDeploy部署新的Lambda版本",
        "Amazon CloudWatch"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "20": {
    "when": "可用性和检索速度不是公司关心的问题 + 员工将透过连接到 VPC 的客户端 VPN 服务连接来存取系统 + 请求的数量将会很少",
    "target": "将S3储存桶配置为预设使用S3一区不频繁存取（S3一区-IA）储存类别 + 配置 S3 储存桶用于网站托管",
    "avoid": "别选“将 S3 储存桶配置为预设使用 S3 Glacier Deep Archive 储存类别”。",
    "questionCues": [
      "可用性和检索速度不是公司关心的问题",
      "员工将透过连接到 VPC 的客户端 VPN 服务连接来存取系统",
      "请求的数量将会很少"
    ],
    "answerCues": {
      "A": [
        "将S3储存桶配置为预设使用S3一区不频繁存取（S3一区-IA）储存类别",
        "配置 S3 储存桶用于网站托管"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "21": {
    "when": "使用者身分必须在单一位置进行管理 + 本公司的安全策略要求根据使用者群组和角色对帐户进行有条件的存取 + 该公司希望",
    "target": "使用基于属性的存取控制 (ABAC) 授予对 AWS 帐户的存取权限 + 配置AWSIAM身分中心（AWS单一登入）以使用SAML2.0连接到Active Directory",
    "avoid": "别选“使用 IAM Identity Center 权限集授予对 AWS 帐户的存取权限”。",
    "questionCues": [
      "使用者身分必须在单一位置进行管理",
      "本公司的安全策略要求根据使用者群组和角色对帐户进行有条件的存取",
      "该公司希望"
    ],
    "answerCues": {
      "A": [
        "使用基于属性的存取控制 (ABAC) 授予对 AWS 帐户的存取权限",
        "配置AWSIAM身分中心（AWS单一登入）以使用SAML2.0连接到Active Directory"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "22": {
    "when": "解决方案架构师应该建议什么来改善客户体验 + AWS Lambda + Amazon DynamoDB",
    "target": "透过API Gateway级别的使用计划实施API限制 + 确保客户端应用程式处理代码 429 回应时不会发生错误",
    "avoid": "别选“在 Lambda 函数层级实现预留并发”；认准“透过API Gateway级别的使用计划实施API限制”。",
    "questionCues": [
      "解决方案架构师应该建议什么来改善客户体验",
      "AWS Lambda",
      "Amazon DynamoDB"
    ],
    "answerCues": {
      "B": [
        "透过API Gateway级别的使用计划实施API限制",
        "确保客户端应用程式处理代码 429 回应时不会发生错误"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "23": {
    "when": "解决方案架构师需要透过取代共享档案系统实例来降低成本 + 计算实例在Auto Scaling组中扩展 + 大约需要 72 小时才能完成",
    "target": "使用 Amazon S3 中的资料建立新的档案系统 + 使用 Lustre 的 Amazon FSx 透过延迟加载",
    "avoid": "别选“将资料从现有共用档案系统迁移到使用 S3 标准储存类别的 Amazon S3 储存桶”。",
    "questionCues": [
      "解决方案架构师需要透过取代共享档案系统实例来降低成本",
      "计算实例在Auto Scaling组中扩展",
      "大约需要 72 小时才能完成"
    ],
    "answerCues": {
      "A": [
        "使用 Amazon S3 中的资料建立新的档案系统",
        "使用 Lustre 的 Amazon FSx 透过延迟加载"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "24": {
    "when": "解决方案架构师必须确保服务高度可用 + 该服务必须使用固定地址分配 + DNS",
    "target": "建立目标群组并向 NLB 注册 EC2 实例 + 为服务建立 Amazon EC2 实例",
    "avoid": "别选“将 EC2 实例的弹性 IP 位址提供给其他公司以新增至其允许清单”；认准“建立目标群组并向 NLB 注册 EC2 实例”。",
    "questionCues": [
      "解决方案架构师必须确保服务高度可用",
      "该服务必须使用固定地址分配",
      "DNS"
    ],
    "answerCues": {
      "C": [
        "建立目标群组并向 NLB 注册 EC2 实例",
        "为服务建立 Amazon EC2 实例"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "25": {
    "when": "解决方案架构师需要将系统迁移到Amazon EC2实例 + 此解决方案必须保持高可用性 + 并采用基于消耗的模型来降低成本",
    "target": "每个 Availability Zone 中运行三个实例作为具有容量预留的按需实例 + 每个 Availability Zone 中运行一个实例作为 Spot 实例",
    "avoid": "别选“每个 Availability Zone 中运行两个实例作为具有容量预留的按需实例”。",
    "questionCues": [
      "解决方案架构师需要将系统迁移到Amazon EC2实例",
      "此解决方案必须保持高可用性",
      "并采用基于消耗的模型来降低成本"
    ],
    "answerCues": {
      "D": [
        "每个 Availability Zone 中运行三个实例作为具有容量预留的按需实例",
        "每个 Availability Zone 中运行一个实例作为 Spot 实例"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "26": {
    "when": "CloudFormation 范本中指定的哪些资源能够以最少的营运开销满足安全工程师的要求 + 安全工程师希望 + 资料库必须",
    "target": "指定 Secrets Manager RotationSchedule 资源以每 90 天轮换一次资料库密码 + 使用 AWS Secrets Manager 产生资料库密码作为秘密资源",
    "avoid": "别选“建立 Amazon EventBridge 计划规则资源以每 90 天触发一次 Lambda 函数密码轮替”。",
    "questionCues": [
      "CloudFormation 范本中指定的哪些资源能够以最少的营运开销满足安全工程师的要求",
      "安全工程师希望",
      "资料库必须"
    ],
    "answerCues": {
      "A": [
        "指定 Secrets Manager RotationSchedule 资源以每 90 天轮换一次资料库密码",
        "使用 AWS Secrets Manager 产生资料库密码作为秘密资源"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "27": {
    "when": "该解决方案必须根据需求自动扩展 + 解决方案架构师必须使用无伺服器架构 + 透过HTTPS透过简单的 API 公开存取资料",
    "target": "A：Amazon API Gateway REST API；C：配置此 API 与 AWS Lambda 函数的集成",
    "avoid": "别选“在AWS Global Accelerator中创建加速器”；认准“Amazon API Gateway REST API”。",
    "questionCues": [
      "该解决方案必须根据需求自动扩展",
      "解决方案架构师必须使用无伺服器架构",
      "透过HTTPS透过简单的 API 公开存取资料"
    ],
    "answerCues": {
      "A": [
        "Amazon API Gateway REST API"
      ],
      "C": [
        "配置此 API 与 AWS Lambda 函数的集成"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "28": {
    "when": "所有DNS记录皆由Amazon Route 53管理 + 解决方案架构师必须实现接受 HTTP 和 HTTPS 请求的重定向服务",
    "target": "B：建立一个包含 HTTP 和 HTTPS 侦听器的 Application Load Balancer。；C：建立一个 AWS Lambda 函数；F：使用 AWS 证书管理器 (ACM) 建立SSL 证书",
    "avoid": "别选“使用具有自订域的 Amazon API Gateway API 来发布 AWS Lambda 函数”。",
    "questionCues": [
      "所有DNS记录皆由Amazon Route 53管理",
      "解决方案架构师必须实现接受 HTTP 和 HTTPS 请求的重定向服务"
    ],
    "answerCues": {
      "B": [
        "建立一个包含 HTTP 和 HTTPS 侦听器的 Application Load Balancer。"
      ],
      "C": [
        "建立一个 AWS Lambda 函数"
      ],
      "F": [
        "使用 AWS 证书管理器 (ACM) 建立SSL 证书"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "29": {
    "when": "该公司希望确定在 EC2 实例上运行的安全工具的成本 + 公司的合规团队已在公司部署的每个VPC中部署了安全工具 + 成本计算必须尽可能准确",
    "target": "配置每月 AWS 成本和使用情况报告以储存到管理帐户中的 Amazon S3 储存桶 + 使用报告中的标签细分来取得 costCenter 标记资源的总成本",
    "avoid": "别选“AWS Lambda”；认准“配置每月 AWS 成本和使用情况报告以储存到管理帐户中的 Amazon S3 储存桶”。",
    "questionCues": [
      "该公司希望确定在 EC2 实例上运行的安全工具的成本",
      "公司的合规团队已在公司部署的每个VPC中部署了安全工具",
      "成本计算必须尽可能准确"
    ],
    "answerCues": {
      "A": [
        "配置每月 AWS 成本和使用情况报告以储存到管理帐户中的 Amazon S3 储存桶",
        "使用报告中的标签细分来取得 costCenter 标记资源的总成本"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "30": {
    "when": "该公司都希望自动执行建立新 VPC 和中转网关附件的过程 + 该公司希望 + 每个帐户包含多个VPC",
    "target": "A：使用 AWS Resource Access Manager 与成员帐户共用中转网关；C：该堆叠集会自动在成员帐户中建立新的 VPC 和 VPC 中转网关附件",
    "avoid": "别选“该堆叠集会自动在成员帐户中建立新的VPC和对等中转网关附件”。",
    "questionCues": [
      "该公司都希望自动执行建立新 VPC 和中转网关附件的过程",
      "该公司希望",
      "每个帐户包含多个VPC"
    ],
    "answerCues": {
      "A": [
        "使用 AWS Resource Access Manager 与成员帐户共用中转网关"
      ],
      "C": [
        "该堆叠集会自动在成员帐户中建立新的 VPC 和 VPC 中转网关附件"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "31": {
    "when": "采购团队希望私人市场的管理仅限于名为采购经理角色的角色 + 一家企业公司希望允许其开发人员透过AWS Marketplace 购买第三方软体",
    "target": "以拒绝向组织中的每个人建立名为采购经理角色的 IAM 角色 + 创建组织根级别 SCP",
    "avoid": "别选“在开发人员将使用的所有AWS帐户中建立名为采购经理角色的IAM角色”。",
    "questionCues": [
      "采购团队希望私人市场的管理仅限于名为采购经理角色的角色",
      "一家企业公司希望允许其开发人员透过AWS Marketplace 购买第三方软体"
    ],
    "answerCues": {
      "C": [
        "以拒绝向组织中的每个人建立名为采购经理角色的 IAM 角色",
        "创建组织根级别 SCP"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "32": {
    "when": "解决方案架构师应该采取什么措施来消除开发人员使用本政策范围以外的服务的能力 + 解决方案架构师已在开发人员帐户上实施以下SCP",
    "target": "从开发者帐户的 OU 中删除完整AWS存取权限 SCP",
    "avoid": "别选“修改 FullAWSAccess SCP 以明确拒绝所有服务”；认准“从开发者帐户的 OU 中删除完整AWS存取权限 SCP”。",
    "questionCues": [
      "解决方案架构师应该采取什么措施来消除开发人员使用本政策范围以外的服务的能力",
      "解决方案架构师已在开发人员帐户上实施以下SCP"
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
    "when": "解决方案架构师需要实作一个解决方案 + 该应用程式无法跟上流量 + 建立了 Route 53 多值应答路由策略",
    "target": "更新Route 53记录以指向ALB + 新增 EC2 实例作为 ALB 的目标",
    "avoid": "别选“该函数对 Auto Scaling 组变更做出反应并更新 Route 53 记录”；认准“更新Route 53记录以指向ALB”。",
    "questionCues": [
      "解决方案架构师需要实作一个解决方案",
      "该应用程式无法跟上流量",
      "建立了 Route 53 多值应答路由策略"
    ],
    "answerCues": {
      "D": [
        "更新Route 53记录以指向ALB",
        "新增 EC2 实例作为 ALB 的目标"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "34": {
    "when": "以便每个OU 都可以查看其AWS 帐户的使用成本明细 + 解决方案架构师必须设计一个解决方案 + 每个OU拥有多个AWS帐户",
    "target": "从 AWS Organizations ​​管理帐户建立 AWS 成本和使用情况报告 (CUR) + 允许每个团队透过 Amazon QuickSight 仪表板可视化 CUR",
    "avoid": "别选“在每个 AWS Organizations ​​会员帐户中建立AWS 成本和使用情况报告 (CUR)”。",
    "questionCues": [
      "以便每个OU 都可以查看其AWS 帐户的使用成本明细",
      "解决方案架构师必须设计一个解决方案",
      "每个OU拥有多个AWS帐户"
    ],
    "answerCues": {
      "B": [
        "从 AWS Organizations ​​管理帐户建立 AWS 成本和使用情况报告 (CUR)",
        "允许每个团队透过 Amazon QuickSight 仪表板可视化 CUR"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "35": {
    "when": "并需要在云端中的档案系统上提供资料 + 该公司将部分基于 Windows 的工作负载迁移到AWS + 迁移策略",
    "target": "Amazon FSx + AWS DataSync",
    "avoid": "别选“Amazon EFS”；认准“Amazon FSx”。",
    "questionCues": [
      "并需要在云端中的档案系统上提供资料",
      "该公司将部分基于 Windows 的工作负载迁移到AWS",
      "迁移策略"
    ],
    "answerCues": {
      "B": [
        "Amazon FSx",
        "AWS DataSync"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "36": {
    "when": "公司需要跨越多个 AWS Regions 的弹性 + 该公司已经在第二个Region中创建了一个S3桶 + Amazon S3",
    "target": "在 us-east-1 中的S3储存桶上配置复制 + 设定一个 Amazon CloudFront 分配",
    "avoid": "别选“将物件从 us-east-1 中的 S3 储存桶复制到第二个 Region 中的 S3 储存桶”。",
    "questionCues": [
      "公司需要跨越多个 AWS Regions 的弹性",
      "该公司已经在第二个Region中创建了一个S3桶",
      "Amazon S3"
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
    "when": "解决方案架构师必须设计可扩展且高度可用的解决方案 + 解决方案架构师应该采取哪些步骤来设计合适的解决方案 + 并且依赖 MySQL 资料库",
    "target": "堆叠应启动具有保留删除策略的 Amazon Aurora MySQL 资料库集群的 Multi-AZ 部署 + 使用Amazon Route 53别名记录将流量从公司域路由到ALB",
    "avoid": "别选“将 Amazon Route 53 与地理位置邻近路由策略结合使用”。",
    "questionCues": [
      "解决方案架构师必须设计可扩展且高度可用的解决方案",
      "解决方案架构师应该采取哪些步骤来设计合适的解决方案",
      "并且依赖 MySQL 资料库"
    ],
    "answerCues": {
      "B": [
        "堆叠应启动具有保留删除策略的 Amazon Aurora MySQL 资料库集群的 Multi-AZ 部署",
        "使用Amazon Route 53别名记录将流量从公司域路由到ALB"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "38": {
    "when": "解决方案架构师应该如何在所有 AWS 帐户中部署 CloudFormation StackSet + 公司要求 + SNS",
    "target": "启用CloudFormation StackSets 自动部署 + 使用服务管理的权限",
    "avoid": "别选“使用CloudFormation StackSets 漂移检测”。",
    "questionCues": [
      "解决方案架构师应该如何在所有 AWS 帐户中部署 CloudFormation StackSet",
      "公司要求",
      "SNS"
    ],
    "answerCues": {
      "C": [
        "启用CloudFormation StackSets 自动部署",
        "使用服务管理的权限"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "39": {
    "when": "以便公司能够以最具成本效益的方式在 AWS 上运行其工作负载 + 公司还必须将on-premises应用程式分组以进行AWS迁移",
    "target": "A：AWS Application Discovery Agent；D：使用 AWS Migration Hub 将伺服器分组到应用程式中进行迁移；E：使用 AWS Migration Hub 产生建议的实例类型和相关成本",
    "avoid": "别选“透过在实体机和虚拟机器上安装AWS Systems Manager Agent 来评估现有应用程式”。",
    "questionCues": [
      "以便公司能够以最具成本效益的方式在 AWS 上运行其工作负载",
      "公司还必须将on-premises应用程式分组以进行AWS迁移"
    ],
    "answerCues": {
      "A": [
        "AWS Application Discovery Agent"
      ],
      "D": [
        "使用 AWS Migration Hub 将伺服器分组到应用程式中进行迁移"
      ],
      "E": [
        "使用 AWS Migration Hub 产生建议的实例类型和相关成本"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "40": {
    "when": "解决方案架构师必须在不影响服务安全状况或增加持续营运时间的情况下尽可能减少云端支出 + 该服务需要与互联网进行通信 + S3",
    "target": "以允许对 S3 储存桶执行所需的操作 + 在 VPA 中设定 S3 闸道 VPC 端点",
    "avoid": "别选“建立从私有子网路到 NAT 实例的路由”；认准“以允许对 S3 储存桶执行所需的操作”。",
    "questionCues": [
      "解决方案架构师必须在不影响服务安全状况或增加持续营运时间的情况下尽可能减少云端支出",
      "该服务需要与互联网进行通信",
      "S3"
    ],
    "answerCues": {
      "C": [
        "以允许对 S3 储存桶执行所需的操作",
        "在 VPA 中设定 S3 闸道 VPC 端点"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "41": {
    "when": "解决方案架构师需要实施一个解决方案来最大限度地降低表的成本 + 并在 DynamoDB 表上配置了 RCU 和 WCU",
    "target": "使用AWS应用程式Auto Scaling在高峰期增加容量 + 购买预留的 RCU 和 WCU 以符合平均负载",
    "avoid": "别选“在桌子前面配置DynamoDB Accelerator (DAX)”。",
    "questionCues": [
      "解决方案架构师需要实施一个解决方案来最大限度地降低表的成本",
      "并在 DynamoDB 表上配置了 RCU 和 WCU"
    ],
    "answerCues": {
      "A": [
        "使用AWS应用程式Auto Scaling在高峰期增加容量",
        "购买预留的 RCU 和 WCU 以符合平均负载"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "42": {
    "when": "最具成本效益的迁移建议是什么 + 解决方案架构师需要就如何将其on-premises资料处理应用程式迁移到AWS云向公司提供建议",
    "target": "使用 EC2 Auto Scaling 群组中的 Amazon EC2 实例从伫列中提取请求并处理档案 + 根据 SQS 伫列长度缩放 EC2 实例",
    "avoid": "别选“任务完成后关闭EC2实例”。",
    "questionCues": [
      "最具成本效益的迁移建议是什么",
      "解决方案架构师需要就如何将其on-premises资料处理应用程式迁移到AWS云向公司提供建议"
    ],
    "answerCues": {
      "D": [
        "使用 EC2 Auto Scaling 群组中的 Amazon EC2 实例从伫列中提取请求并处理档案",
        "根据 SQS 伫列长度缩放 EC2 实例"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "43": {
    "when": "公司必须保留所有输入资料的副本 + 并要求解决方案架构师推荐新的解决方案 + 该公司担心持续的成本",
    "target": "使用 S3 生命周期策略将输入资料转换为 S3 Glacier Deep Archive + 将集群中的资料节点数量减少到 2 个 新增 UltraWarm 节点来处理预期容量",
    "avoid": "别选“使用 S3 生命周期策略从 S3 储存桶中删除输入资料”。",
    "questionCues": [
      "公司必须保留所有输入资料的副本",
      "并要求解决方案架构师推荐新的解决方案",
      "该公司担心持续的成本"
    ],
    "answerCues": {
      "B": [
        "使用 S3 生命周期策略将输入资料转换为 S3 Glacier Deep Archive",
        "将集群中的资料节点数量减少到 2 个 新增 UltraWarm 节点来处理预期容量"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "44": {
    "when": "安全团队需要删除建立包含 0.0.0.0/0 作为来源的安全群组入站规则的功能 + 公司安全团队订阅了SNS主题 + OU",
    "target": "值为 0.0.0.0/0 时拒绝 ec2:AuthorizeSecurityGroupIngress 操作",
    "avoid": "别选“配置 SCP 以在 aws:SourceIp 条件键的值不是 0.0.0.0/0 时”。",
    "questionCues": [
      "安全团队需要删除建立包含 0.0.0.0/0 作为来源的安全群组入站规则的功能",
      "公司安全团队订阅了SNS主题",
      "OU"
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
    "when": "该公司希望将解决方案迁移到无伺服器架构 + Git 伺服器为已设定的 Webhook 呼叫 ALB + Amazon EC2",
    "target": "Amazon API Gateway HTTP API + 更新 Git 伺服器以呼叫 API Gateway 端点",
    "avoid": "别选“建立并配置一个 AWS Lambda 函数 URL”；认准“Amazon API Gateway HTTP API”。",
    "questionCues": [
      "该公司希望将解决方案迁移到无伺服器架构",
      "Git 伺服器为已设定的 Webhook 呼叫 ALB",
      "Amazon EC2"
    ],
    "answerCues": {
      "B": [
        "Amazon API Gateway HTTP API",
        "更新 Git 伺服器以呼叫 API Gateway 端点"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "46": {
    "when": "某公司计划将 1,000 台 on-premises 伺服器迁移到 AWS + 该公司希望收集伺服器指标 + 作为迁移计划的一部分",
    "target": "使用 Amazon Athena 对 Amazon S3 中的资料执行预先定义查询 + 将 AWS Application Discovery Agent 部署到每个 on-premises 伺服器",
    "avoid": "别选“使用Amazon S3 Select 查询资料”。",
    "questionCues": [
      "某公司计划将 1,000 台 on-premises 伺服器迁移到 AWS",
      "该公司希望收集伺服器指标",
      "作为迁移计划的一部分"
    ],
    "answerCues": {
      "D": [
        "使用 Amazon Athena 对 Amazon S3 中的资料执行预先定义查询",
        "将 AWS Application Discovery Agent 部署到每个 on-premises 伺服器"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "47": {
    "when": "公司必须向外部提供者提供单一公用 IP 位址 + 该公司需要将该应用程式与外部提供者的新服务整合 + VPC",
    "target": "部署NAT网关 + 配置VPC使用NAT网关",
    "avoid": "别选“在公共VPC路由表中配置预设路由以使用互联网网关”；认准“部署NAT网关”。",
    "questionCues": [
      "公司必须向外部提供者提供单一公用 IP 位址",
      "该公司需要将该应用程式与外部提供者的新服务整合",
      "VPC"
    ],
    "answerCues": {
      "A": [
        "部署NAT网关",
        "配置VPC使用NAT网关"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "48": {
    "when": "解决方案架构师必须提高应用程式的效能 + 应用程式不符合效能要求 + Lambda",
    "target": "B：使用RDS代理设定到Aurora资料库的读取端点的连接池；D：将 Lambda 函数中用于开启资料库连线的程式码移至事件处理程序之外",
    "avoid": "别选“使用 Aurora 资料库的集群端点”；认准“使用RDS代理设定到Aurora资料库的读取端点的连接池”。",
    "questionCues": [
      "解决方案架构师必须提高应用程式的效能",
      "应用程式不符合效能要求",
      "Lambda"
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
    "when": "安全性要求之一是在客户端和 Web 伺服器之间的传输中启用端对端加密 + 并希望在一组 Amazon EC2 实例之间实现流量负载平衡",
    "target": "设定第三方 SSL 凭证并将其安装在每个 EC2 实例上 + 使用 AWS 证书管理器 (ACM) 配置 SSL 证书",
    "avoid": "别选“汇出 SSL 凭证并将其安装在每个 EC2 实例上”；认准“设定第三方 SSL 凭证并将其安装在每个 EC2 实例上”。",
    "questionCues": [
      "安全性要求之一是在客户端和 Web 伺服器之间的传输中启用端对端加密",
      "并希望在一组 Amazon EC2 实例之间实现流量负载平衡"
    ],
    "answerCues": {
      "C": [
        "设定第三方 SSL 凭证并将其安装在每个 EC2 实例上",
        "使用 AWS 证书管理器 (ACM) 配置 SSL 证书"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "50": {
    "when": "该公司还需要在不中断或不改变公司客户的情况下进行迁移 + 一家公司希望将其资料分析环境从本地迁移到AWS + 公司必须解决资料载入问题",
    "target": "将收集端点设定为Application Load Balancer (ALB)后面的AWS Lambda函数 + 将收集器DNS记录指向ALB",
    "avoid": "别选“将聚合作业移至针对 Aurora MySQL 资料库运行”。",
    "questionCues": [
      "该公司还需要在不中断或不改变公司客户的情况下进行迁移",
      "一家公司希望将其资料分析环境从本地迁移到AWS",
      "公司必须解决资料载入问题"
    ],
    "answerCues": {
      "C": [
        "将收集端点设定为Application Load Balancer (ALB)后面的AWS Lambda函数",
        "将收集器DNS记录指向ALB"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "51": {
    "when": "S3储存桶中目前和未来的所有物件都必须使用公司安全团队管理的金钥进行加密 + 根据新要求 + S3 储存桶未启用版本控制",
    "target": "使用 AWS KMS 托管加密金钥 (SSE- KMS) 的伺服器端加密 + 使用AWS CLI重新上传S3储存桶中的所有物件",
    "avoid": "别选“设定 S3 储存桶策略以自动加密 GetObject 和 PutObject 请求上的物件”。",
    "questionCues": [
      "S3储存桶中目前和未来的所有物件都必须使用公司安全团队管理的金钥进行加密",
      "根据新要求",
      "S3 储存桶未启用版本控制"
    ],
    "answerCues": {
      "B": [
        "使用 AWS KMS 托管加密金钥 (SSE- KMS) 的伺服器端加密",
        "使用AWS CLI重新上传S3储存桶中的所有物件"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "52": {
    "when": "使其具有高可用性和容错能力 + 解决方案架构师必须配置应用程序 + 该公司使用 Amazon Route 53 代表 DNS",
    "target": "在不同的 AWS Region 中配置 ALB、Auto Scaling 群组和 EC2 实例 + 更新CloudFront分布",
    "avoid": "别选“在ALB上设定故障转移路由演算法”。",
    "questionCues": [
      "使其具有高可用性和容错能力",
      "解决方案架构师必须配置应用程序",
      "该公司使用 Amazon Route 53 代表 DNS"
    ],
    "answerCues": {
      "B": [
        "在不同的 AWS Region 中配置 ALB、Auto Scaling 群组和 EC2 实例",
        "更新CloudFront分布"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "53": {
    "when": "本公司的网路团队需要集中管理属于全球办事处的内部 IP 位址范围清单 + 开发人员将参考此清单来安全地存取其应用程式",
    "target": "建立包含所有内部 IP 位址范围的 VPC 前缀清单 + 使用共用前缀清单在其他帐户中设定安全群组规则",
    "avoid": "别选“将 AWS Lambda 函数订阅至 SNS 主题”；认准“建立包含所有内部 IP 位址范围的 VPC 前缀清单”。",
    "questionCues": [
      "本公司的网路团队需要集中管理属于全球办事处的内部 IP 位址范围清单",
      "开发人员将参考此清单来安全地存取其应用程式"
    ],
    "answerCues": {
      "C": [
        "建立包含所有内部 IP 位址范围的 VPC 前缀清单",
        "使用共用前缀清单在其他帐户中设定安全群组规则"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "54": {
    "when": "以显示每个 API Lambda 函数的建议配置记忆体、建议成本以及当前配置与建议之间的价格差异 + 该公司希望每两周建立一个 CSV 报告",
    "target": "将 .csv 档案汇出到 S3 储存桶 + 建立 Amazon EventBridge 规则以安排 Lambda 函数每 2 周运行一次",
    "avoid": "别选“将资料以 .csv 档案形式储存在 S3 储存桶中”；认准“将 .csv 档案汇出到 S3 储存桶”。",
    "questionCues": [
      "以显示每个 API Lambda 函数的建议配置记忆体、建议成本以及当前配置与建议之间的价格差异",
      "该公司希望每两周建立一个 CSV 报告"
    ],
    "answerCues": {
      "B": [
        "将 .csv 档案汇出到 S3 储存桶",
        "建立 Amazon EventBridge 规则以安排 Lambda 函数每 2 周运行一次"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "55": {
    "when": "公司还必须能够创建报告来比较过去 12 个月的成本并帮助预测未来 12 个月的成本 + 该公司的工厂和自动化应用程式在单一VPC中运作",
    "target": "A：启动代表应用程式和团队的使用者定义成本分配标签；C：在计费和成本管理中为每个应用程式建立成本类别；F：启用 Cost Explorer",
    "avoid": "别选“启动IAM对计费和成本管理的存取权限”；认准“启动代表应用程式和团队的使用者定义成本分配标签”。",
    "questionCues": [
      "公司还必须能够创建报告来比较过去 12 个月的成本并帮助预测未来 12 个月的成本",
      "该公司的工厂和自动化应用程式在单一VPC中运作"
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
    "when": "解决方案架构师应该如何确保Web应用程式在迁移后可以继续呼叫第三方API + 客户希望将其 Web 应用程式迁移到 AWS 云端",
    "target": "从位址区块建立弹性IP位址并将其指派给VPC中的NAT网关 + 在 AWS 帐户中注册一组客户拥有的公共 IP 位址",
    "avoid": "别选“将客户拥有的公共 IP 位址区块关联到 VPC”；认准“从位址区块建立弹性IP位址并将其指派给VPC中的NAT网关”。",
    "questionCues": [
      "解决方案架构师应该如何确保Web应用程式在迁移后可以继续呼叫第三方API",
      "客户希望将其 Web 应用程式迁移到 AWS 云端"
    ],
    "answerCues": {
      "B": [
        "从位址区块建立弹性IP位址并将其指派给VPC中的NAT网关",
        "在 AWS 帐户中注册一组客户拥有的公共 IP 位址"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "57": {
    "when": "管理员建立了以下 SCP + 管理员该如何解决这个问题 + 在帐户 1111-1111-1111 中工作的开发人员抱怨他们无法",
    "target": "指导开发人员为其IAM实体新增Amazon S3权限",
    "avoid": "别选“将具有「允许」效果的 s3:CreateBucket 加入到SCP”；认准“指导开发人员为其IAM实体新增Amazon S3权限”。",
    "questionCues": [
      "管理员建立了以下 SCP",
      "管理员该如何解决这个问题",
      "在帐户 1111-1111-1111 中工作的开发人员抱怨他们无法"
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
    "when": "应用程式必须继续为用户服务 + 应用程式团队没有实例的管理 SSH 金钥对 + Amazon S3",
    "target": "将具有写入Amazon S3权限的角色附加到实例 + 使用AWS Systems Manager会话管理器选项来存取实例并执行命令将资料复制到Amazon S3",
    "avoid": "别选“从映像启动新的 EC2 实例”；认准“将具有写入Amazon S3权限的角色附加到实例”。",
    "questionCues": [
      "应用程式必须继续为用户服务",
      "应用程式团队没有实例的管理 SSH 金钥对",
      "Amazon S3"
    ],
    "answerCues": {
      "A": [
        "将具有写入Amazon S3权限的角色附加到实例",
        "使用AWS Systems Manager会话管理器选项来存取实例并执行命令将资料复制到Amazon S3"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "59": {
    "when": "解决方案架构师必须实作使用AWS CLI 的解决方案 + 解决方案架构师需要将数据从 AWS 账户中的 Amazon S3 存储桶",
    "target": "B：将储存桶策略附加到来源储存桶；D：在目标帐户中建立IAM策略；F：以目标帐户中的使用者身分执行 aws s3 sync 命令",
    "avoid": "别选“以来源帐户中的使用者身分执行 aws s3 sync 命令”；认准“将储存桶策略附加到来源储存桶”。",
    "questionCues": [
      "解决方案架构师必须实作使用AWS CLI 的解决方案",
      "解决方案架构师需要将数据从 AWS 账户中的 Amazon S3 存储桶"
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
    "when": "导致持续几分钟的中断 + 解决方案架构师必须调整部署流程以支援金丝雀版本 + 部署在 AWS CloudFormation 堆叠中",
    "target": "为 Lambda 函数的每个新部署版本建立一个别名 + 使用带有routing-config 参数的AWS CLI update-alias 指令来分配负载",
    "avoid": "别选“为每个新部署的 Lambda 函数建立一个版本”；认准“为 Lambda 函数的每个新部署版本建立一个别名”。",
    "questionCues": [
      "导致持续几分钟的中断",
      "解决方案架构师必须调整部署流程以支援金丝雀版本",
      "部署在 AWS CloudFormation 堆叠中"
    ],
    "answerCues": {
      "A": [
        "为 Lambda 函数的每个新部署版本建立一个别名",
        "使用带有routing-config 参数的AWS CLI update-alias 指令来分配负载"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "61": {
    "when": "解决方案架构师应该如何提高SFTP解决方案的可靠性和可扩展性 + 一家金融公司在 Amazon S3 托管一个资料湖",
    "target": "更新 Route 53 中的 DNS 记录 sftp.example.com 以指向伺服器端点主机名称 + 将SFTP伺服器迁移到AWS传输SFTP",
    "avoid": "别选“更新 Route 53 中的 DNS 记录 sftp.example.com 以指向 le 闸道端点”。",
    "questionCues": [
      "解决方案架构师应该如何提高SFTP解决方案的可靠性和可扩展性",
      "一家金融公司在 Amazon S3 托管一个资料湖"
    ],
    "answerCues": {
      "B": [
        "更新 Route 53 中的 DNS 记录 sftp.example.com 以指向伺服器端点主机名称",
        "将SFTP伺服器迁移到AWS传输SFTP"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "62": {
    "when": "解决方案架构师必须在迁移期间保留软体和组态设定 + 迁移到 Amazon EC2",
    "target": "使用AWS CLI 运行EC2 导入指令 + 为 VM 汇入建立并套用 IAM 角色",
    "avoid": "别选“启动基于 AMI 的 EC2 实例”；认准“使用AWS CLI 运行EC2 导入指令”。",
    "questionCues": [
      "解决方案架构师必须在迁移期间保留软体和组态设定",
      "迁移到 Amazon EC2"
    ],
    "answerCues": {
      "B": [
        "使用AWS CLI 运行EC2 导入指令",
        "为 VM 汇入建立并套用 IAM 角色"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "63": {
    "when": "该公司不想管理底层基础设施 + 解决方案架构师需要重构应用程式的架构以防止呼叫失败 + 函数超时设定为其最大值",
    "target": "A：透过建立包含应用程式程式码的Docker映像来修改应用程式部署；B：AWS Fargate",
    "avoid": "别选“Amazon EC2”；认准“透过建立包含应用程式程式码的Docker映像来修改应用程式部署”。",
    "questionCues": [
      "该公司不想管理底层基础设施",
      "解决方案架构师需要重构应用程式的架构以防止呼叫失败",
      "函数超时设定为其最大值"
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
    "when": "公司必须实施一项策略来侦测公司生产 OU 中未静态加密的 Amazon RDS 资料库实例 + 该公司希望实施治理和政策执行",
    "target": "从AWS Control Tower中强烈建议的护栏清单中启用适当的护栏 + 将护栏应用于生产OU",
    "avoid": "别选“在生产上应用强制护栏OU”；认准“从AWS Control Tower中强烈建议的护栏清单中启用适当的护栏”。",
    "questionCues": [
      "公司必须实施一项策略来侦测公司生产 OU 中未静态加密的 Amazon RDS 资料库实例",
      "该公司希望实施治理和政策执行"
    ],
    "answerCues": {
      "B": [
        "从AWS Control Tower中强烈建议的护栏清单中启用适当的护栏",
        "将护栏应用于生产OU"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "65": {
    "when": "该公司需要加强对 SSH 存取的安全控制 + EC2 安全群组可从on-premises 环境直接进行SSH 存取 + 解决方案架构师应该",
    "target": "将 IAM 角色附加到所有 EC2 实例 + 建立附加了 AmazonSSMManagedInstanceCore 托管策略的 IAM 角色",
    "avoid": "别选“在 EC2 实例上安装并设定 EC2 Instance Connect”；认准“将 IAM 角色附加到所有 EC2 实例”。",
    "questionCues": [
      "该公司需要加强对 SSH 存取的安全控制",
      "EC2 安全群组可从on-premises 环境直接进行SSH 存取",
      "解决方案架构师应该"
    ],
    "answerCues": {
      "D": [
        "将 IAM 角色附加到所有 EC2 实例",
        "建立附加了 AmazonSSMManagedInstanceCore 托管策略的 IAM 角色"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "66": {
    "when": "以限制他们的AWS成本 + 公司必须为开发商提供固定的每月预算 + 该公司希望确保开发人员不会推出昂贵的服务或运行不必要的服务",
    "target": "B：使用 AWS 预算为每个开发者帐户建立固定的每月预算；C：创建 SCP 来拒绝访问昂贵的服务和组件；F：以在达到预算金额时发送 Amazon 简单通知服务 (Amazon SNS) 通知",
    "avoid": "别选“建立 SCP 以设定固定的每月帐户使用限制”；认准“使用 AWS 预算为每个开发者帐户建立固定的每月预算”。",
    "questionCues": [
      "以限制他们的AWS成本",
      "公司必须为开发商提供固定的每月预算",
      "该公司希望确保开发人员不会推出昂贵的服务或运行不必要的服务"
    ],
    "answerCues": {
      "B": [
        "使用 AWS 预算为每个开发者帐户建立固定的每月预算"
      ],
      "C": [
        "创建 SCP 来拒绝访问昂贵的服务和组件"
      ],
      "F": [
        "以在达到预算金额时发送 Amazon 简单通知服务 (Amazon SNS) 通知"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "67": {
    "when": "因此公司必须最大限度地减少停机时间 + 本公司已为Aurora配置了自动备份 + 该公司希望将 Lambda 函数和 Aurora 资料库",
    "target": "授予目标帐户克隆Aurora资料库集群的权限 + 从来源帐户下载 Lambda 函数部署套件",
    "avoid": "别选“与目标帐户共用自动 Aurora 资料库集群快照”；认准“授予目标帐户克隆Aurora资料库集群的权限”。",
    "questionCues": [
      "因此公司必须最大限度地减少停机时间",
      "本公司已为Aurora配置了自动备份",
      "该公司希望将 Lambda 函数和 Aurora 资料库"
    ],
    "answerCues": {
      "B": [
        "授予目标帐户克隆Aurora资料库集群的权限",
        "从来源帐户下载 Lambda 函数部署套件"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "68": {
    "when": "该公司希望使工作负载具有高可用性和可扩展性 + 该公司还希望减少长期管理费用 + 脚本大约需要 5 分钟来处理每个档案",
    "target": "透过S3事件通知呼叫Lambda函数处理物件 + 将资料处理脚本移转到AWS Lambda函数",
    "avoid": "别选“使用 S3 事件通知来呼叫 Lambda 函数”；认准“透过S3事件通知呼叫Lambda函数处理物件”。",
    "questionCues": [
      "该公司希望使工作负载具有高可用性和可扩展性",
      "该公司还希望减少长期管理费用",
      "脚本大约需要 5 分钟来处理每个档案"
    ],
    "answerCues": {
      "A": [
        "透过S3事件通知呼叫Lambda函数处理物件",
        "将资料处理脚本移转到AWS Lambda函数"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "69": {
    "when": "并且必须动态扩展以满足用户流量 + 应用程式必须具有高可用性 + 使用主动-被动故障转移为 us-west-1 Region 中的应用程式",
    "target": "在 us-west-1 VPC 建立一个 Amazon Route 53 托管区域中设定相同的配置 + 启用运作状况检查并为每个记录设定故障转移路由策略",
    "avoid": "别选“在 us-west-1 VPC 中设定相同的配置”。",
    "questionCues": [
      "并且必须动态扩展以满足用户流量",
      "应用程式必须具有高可用性",
      "使用主动-被动故障转移为 us-west-1 Region 中的应用程式"
    ],
    "answerCues": {
      "C": [
        "在 us-west-1 VPC 建立一个 Amazon Route 53 托管区域中设定相同的配置",
        "启用运作状况检查并为每个记录设定故障转移路由策略"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "70": {
    "when": "他们希望能够使用现有的 Active Directory 凭证存取控制台 + 该公司的 IT 支援人员目前访问控制台执行管理任务",
    "target": "配置 IAM Identity Center 并将 AD Connector 设定为身分来源 + 在AWS Organizations创建一个组织",
    "avoid": "别选“配置IAM身分中心并将AWS托管Microsoft AD目录设定为身分来源”。",
    "questionCues": [
      "他们希望能够使用现有的 Active Directory 凭证存取控制台",
      "该公司的 IT 支援人员目前访问控制台执行管理任务"
    ],
    "answerCues": {
      "D": [
        "配置 IAM Identity Center 并将 AD Connector 设定为身分来源",
        "在AWS Organizations创建一个组织"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "71": {
    "when": "从澳洲访问该应用程式的用户都经历过上传需要很长时间的情况 + 解决方案架构师必须提高应用程式的这些上传效能 + 这些使用者的档案无法完全上传",
    "target": "A：在 S3 储存桶上启用 S3 传输加速；D：使用分段上传将档案传输到Amazon S3",
    "avoid": "别选“使用S3跨Region复制将档案复制到分发S3储存桶”；认准“在 S3 储存桶上启用 S3 传输加速”。",
    "questionCues": [
      "从澳洲访问该应用程式的用户都经历过上传需要很长时间的情况",
      "解决方案架构师必须提高应用程式的这些上传效能",
      "这些使用者的档案无法完全上传"
    ],
    "answerCues": {
      "A": [
        "在 S3 储存桶上启用 S3 传输加速"
      ],
      "D": [
        "使用分段上传将档案传输到Amazon S3"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "72": {
    "when": "解决方案架构师必须实作一个解决方案 + 并且无法重新建立连接 + 故障转移测试后",
    "target": "建立一个 RDS 代理 + 更新应用程式中的连线设定以指向 RDS 代理端点",
    "avoid": "题目只需解决故障切换后的连接；别额外迁移到 Aurora。",
    "questionCues": [
      "解决方案架构师必须实作一个解决方案",
      "并且无法重新建立连接",
      "故障转移测试后"
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
    "when": "每个设备都需要能够透过 MQTT 协定即时发送和接收资料 + 每个装置必须使用唯一的 X.509 凭证进行身份验证",
    "target": "将每个装置连接到AWS IoT Core + 建立相应的AWS IoT 事物并提供证书",
    "avoid": "别选“将每个设备连接到Amazon MQ”；认准“将每个装置连接到AWS IoT Core”。",
    "questionCues": [
      "每个设备都需要能够透过 MQTT 协定即时发送和接收资料",
      "每个装置必须使用唯一的 X.509 凭证进行身份验证"
    ],
    "answerCues": {
      "C": [
        "将每个装置连接到AWS IoT Core",
        "建立相应的AWS IoT 事物并提供证书"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "74": {
    "when": "解决方案架构师需要创建一个解决方案来对工程师用于存取的IAM角色实施新的限制 + 解决方案架构师应该做什么来创建解决方案",
    "target": "在堆叠创建过程中将IAM服务角色指派给AWS CloudFormation + 将工程师 IAM 角色的 IAM 策略更新为仅允许 AWS CloudFormation 操作",
    "avoid": "别选“将工程师IAM角色的IAM策略更新为仅允许存取Amazon S3和AWS CloudFormation”。",
    "questionCues": [
      "解决方案架构师需要创建一个解决方案来对工程师用于存取的IAM角色实施新的限制",
      "解决方案架构师应该做什么来创建解决方案"
    ],
    "answerCues": {
      "C": [
        "在堆叠创建过程中将IAM服务角色指派给AWS CloudFormation",
        "将工程师 IAM 角色的 IAM 策略更新为仅允许 AWS CloudFormation 操作"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "75": {
    "when": "以便以低延迟进行检索 + 需要储存在持久位置 + 一年内的储存需求约 10-15 TB",
    "target": "配置 DynamoDB 生存时间 (TTL) 功能以删除超过 120 天的记录 + 设计应用程式以将每个传入记录储存在为秤正确配置的Amazon DynamoDB表中",
    "avoid": "别选“并使用 Amazon S3 元资料搜寻功能来检索资料”。",
    "questionCues": [
      "以便以低延迟进行检索",
      "需要储存在持久位置",
      "一年内的储存需求约 10-15 TB"
    ],
    "answerCues": {
      "B": [
        "配置 DynamoDB 生存时间 (TTL) 功能以删除超过 120 天的记录",
        "设计应用程式以将每个传入记录储存在为秤正确配置的Amazon DynamoDB表中"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "76": {
    "when": "该公司希望该网站随时运行以进行线上购买 + 该网站将资料储存在 MySQL 资料库实例的 Amazon RDS 中",
    "target": "在 Amazon RDS 上设定唯读副本 + 将跨Region和唯读副本提升为独立的资料库实例",
    "avoid": "别选“在Amazon RDS上配置全域表和自动备份”；认准“在 Amazon RDS 上设定唯读副本”。",
    "questionCues": [
      "该公司希望该网站随时运行以进行线上购买",
      "该网站将资料储存在 MySQL 资料库实例的 Amazon RDS 中"
    ],
    "answerCues": {
      "D": [
        "在 Amazon RDS 上设定唯读副本",
        "将跨Region和唯读副本提升为独立的资料库实例"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "77": {
    "when": "Example Corp. 希望从其本地伺服器连接到 VPC B + Example Corp. 已正确设定网路 ACL 和安全群组",
    "target": "将 Site-to-Site VPN、VPC A 和 VPC B 连接到中转闸道 + 更新所有网路的中转网关路由表",
    "avoid": "别选“并将 VPN 连接连接到中转网关”；认准“将 Site-to-Site VPN、VPC A 和 VPC B 连接到中转闸道”。",
    "questionCues": [
      "Example Corp. 希望从其本地伺服器连接到 VPC B",
      "Example Corp. 已正确设定网路 ACL 和安全群组"
    ],
    "answerCues": {
      "A": [
        "将 Site-to-Site VPN、VPC A 和 VPC B 连接到中转闸道",
        "更新所有网路的中转网关路由表"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "78": {
    "when": "旧版 SMTP 伺服器不支援 TLS 加密并使用 TCP 连接埠 25 + 公司应该如何修改应用程式以从AmazonSES发送电子邮件",
    "target": "使用凭证透过 Amazon SES 进行身份验证 + 使用 STARTTLS 将应用程式设定为连接到Amazon SES",
    "avoid": "别选“将 IAM 角色附加到 Amazon EC2 实例”；认准“使用凭证透过 Amazon SES 进行身份验证”。",
    "questionCues": [
      "旧版 SMTP 伺服器不支援 TLS 加密并使用 TCP 连接埠 25",
      "公司应该如何修改应用程式以从AmazonSES发送电子邮件"
    ],
    "answerCues": {
      "B": [
        "使用凭证透过 Amazon SES 进行身份验证",
        "使用 STARTTLS 将应用程式设定为连接到Amazon SES"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "79": {
    "when": "透过自我管理的应用程式报告所有公司的成本 + 收购公司的财务团队需要一个解决方案 + AWS Organizations",
    "target": "在AmazonAthena中建立一个表 + 基于Athena表建立AmazonQuickSight资料集",
    "avoid": "别选“建立一个 Amazon QuickSight 资料集”；认准“在AmazonAthena中建立一个表”。",
    "questionCues": [
      "透过自我管理的应用程式报告所有公司的成本",
      "收购公司的财务团队需要一个解决方案",
      "AWS Organizations"
    ],
    "answerCues": {
      "A": [
        "在AmazonAthena中建立一个表",
        "基于Athena表建立AmazonQuickSight资料集"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "80": {
    "when": "RDS 指标显示写入延迟较高 + 同时维持该平台的成本效益 + 运行的 Amazon EC2 实例上的公司 Node.js API 伺服器",
    "target": "C：AWS Lambda；E：Amazon DynamoDB",
    "avoid": "别选“重新架构资料库层以使用 Amazon Aurora 而不是 RDS MySQL 资料库实例并新增唯读副本”。",
    "questionCues": [
      "RDS 指标显示写入延迟较高",
      "同时维持该平台的成本效益",
      "运行的 Amazon EC2 实例上的公司 Node.js API 伺服器"
    ],
    "answerCues": {
      "C": [
        "AWS Lambda"
      ],
      "E": [
        "Amazon DynamoDB"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "81": {
    "when": "该公司必须改善欧洲以外地区的延迟 + 并已与其最大客户完成了概念验证 + 一家公司正在建立一个电子文档管理系统",
    "target": "A：在 S3 储存桶上启用 S3 传输加速；C：将 API Gateway Regional 端点改为边缘最佳化端点",
    "avoid": "别选“将加速器连接到 CloudFront 发行版”；认准“在 S3 储存桶上启用 S3 传输加速”。",
    "questionCues": [
      "该公司必须改善欧洲以外地区的延迟",
      "并已与其最大客户完成了概念验证",
      "一家公司正在建立一个电子文档管理系统"
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
    "when": "以尽可能低的成本维持照片和影片的毫秒检索可用性 + 公司需要优化储存成本 + 一些上传的照片和影片在30天后被频繁访问",
    "target": "在S3储存桶上配置S3Intelligent-Tiering",
    "avoid": "别选“配置 S3 生命周期策略”；认准“在S3储存桶上配置S3Intelligent-Tiering”。",
    "questionCues": [
      "以尽可能低的成本维持照片和影片的毫秒检索可用性",
      "公司需要优化储存成本",
      "一些上传的照片和影片在30天后被频繁访问"
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
    "when": "去年该公司的S3成本大幅增加 + 解决方案架构师需要查看过去 12 个月的资料趋势并确定物件的适当储存类别 + Amazon S3",
    "target": "使用Amazon S3 Storage Lens + 升级预设仪表板以包含储存趋势的高级指标",
    "avoid": "别选“下载过去 12 个月的 S3 使用情况的 AWS 成本和使用情况报告”；认准“使用Amazon S3 Storage Lens”。",
    "questionCues": [
      "去年该公司的S3成本大幅增加",
      "解决方案架构师需要查看过去 12 个月的资料趋势并确定物件的适当储存类别",
      "Amazon S3"
    ],
    "answerCues": {
      "C": [
        "使用Amazon S3 Storage Lens",
        "升级预设仪表板以包含储存趋势的高级指标"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "84": {
    "when": "该公司的业务扩展计划包括跨多个 AWS 帐户在多个 Regions 中进行部署 + 解决方案架构师需要将基础架构定义为程式码",
    "target": "从具有必要的 IAM 权限的帐户部署 Cloud Formation 范本 + 使用AWS Organizations和AWS CloudFormation堆叠集",
    "avoid": "别选“新增IAM策略来控制各个帐户”；认准“从具有必要的 IAM 权限的帐户部署 Cloud Formation 范本”。",
    "questionCues": [
      "该公司的业务扩展计划包括跨多个 AWS 帐户在多个 Regions 中进行部署",
      "解决方案架构师需要将基础架构定义为程式码"
    ],
    "answerCues": {
      "C": [
        "从具有必要的 IAM 权限的帐户部署 Cloud Formation 范本",
        "使用AWS Organizations和AWS CloudFormation堆叠集"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "85": {
    "when": "该公司的业务扩展计划包括跨多个 AWS 帐户在多个 Regions 中进行部署 + 解决方案架构师需要将基础架构定义为程式码",
    "target": "从具有必要的 IAM 权限的帐户部署 Cloud Formation 范本 + 使用AWS Organizations和AWS CloudFormation堆叠集",
    "avoid": "别选“新增IAM策略来控制各个帐户”；认准“从具有必要的 IAM 权限的帐户部署 Cloud Formation 范本”。",
    "questionCues": [
      "该公司的业务扩展计划包括跨多个 AWS 帐户在多个 Regions 中进行部署",
      "解决方案架构师需要将基础架构定义为程式码"
    ],
    "answerCues": {
      "C": [
        "从具有必要的 IAM 权限的帐户部署 Cloud Formation 范本",
        "使用AWS Organizations和AWS CloudFormation堆叠集"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "86": {
    "when": "它应该能够尽快回滚更改 + 它应该允许每小时发布几次更改 + 以支援具有以下要求的应用程式的现代设计",
    "target": "AWS Elastic Beanstalk + 若要部署",
    "avoid": "别选“透过替换 Amazon EC2 实例来部署应用程式”；认准“AWS Elastic Beanstalk”。",
    "questionCues": [
      "它应该能够尽快回滚更改",
      "它应该允许每小时发布几次更改",
      "以支援具有以下要求的应用程式的现代设计"
    ],
    "answerCues": {
      "B": [
        "AWS Elastic Beanstalk",
        "若要部署"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "87": {
    "when": "解决方案架构师需要向安全性群组新增规则 + EC2 实例均与相同安全群组关联 + 以便为应用程式提供对资料库集群的最小权限存取权限",
    "target": "B：将出站规则加入到EC2实例的安全群组；C：将 EC2 实例的安全群组指定为预设 Aurora 连接埠上的来源",
    "avoid": "别选“将 EC2 执行个体的安全群组指定为预设 Aurora 连接埠上的目标”；认准“将出站规则加入到EC2实例的安全群组”。",
    "questionCues": [
      "解决方案架构师需要向安全性群组新增规则",
      "EC2 实例均与相同安全群组关联",
      "以便为应用程式提供对资料库集群的最小权限存取权限"
    ],
    "answerCues": {
      "B": [
        "将出站规则加入到EC2实例的安全群组"
      ],
      "C": [
        "将 EC2 实例的安全群组指定为预设 Aurora 连接埠上的来源"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "88": {
    "when": "公司使用AWS Organizations来管理每个业务部门单独的AWS帐户 + 该解决方案还应该针对任何超过设定阈值的云端支出发送通知",
    "target": "在组织的管理帐户中配置 AWS 预算 + 在组织的管理帐户中使用 Cost Explorer 为每个业务部门建立每月报告",
    "avoid": "别选“配置每个帐户中的 AWS 预算”；认准“在组织的管理帐户中配置 AWS 预算”。",
    "questionCues": [
      "公司使用AWS Organizations来管理每个业务部门单独的AWS帐户",
      "该解决方案还应该针对任何超过设定阈值的云端支出发送通知"
    ],
    "answerCues": {
      "B": [
        "在组织的管理帐户中配置 AWS 预算",
        "在组织的管理帐户中使用 Cost Explorer 为每个业务部门建立每月报告"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "89": {
    "when": "储存在Amazon RDS资料库或AmazonEBS卷中的重要资料也可能被删除 + 如果删除生产CloudFormation堆叠",
    "target": "修改 CloudFormation 模板 + 将 DeletionPolicy 属性加入 RDS 和 EBS 资源",
    "avoid": "别选“不允许删除RDS和EBS资源”；认准“修改 CloudFormation 模板”。",
    "questionCues": [
      "储存在Amazon RDS资料库或AmazonEBS卷中的重要资料也可能被删除",
      "如果删除生产CloudFormation堆叠"
    ],
    "answerCues": {
      "A": [
        "修改 CloudFormation 模板",
        "将 DeletionPolicy 属性加入 RDS 和 EBS 资源"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "90": {
    "when": "解决方案架构师必须确定流量是否代表来自网际网路的未经请求的入站连线 + VPC CIDR 区块的前两个八位元组是 203.0",
    "target": "选择包含NAT网关弹性网路介面和私有实例弹性网路介面的日志组 + 目标位址设定为“like 203.0”",
    "avoid": "别选“选择包含NAT网关的弹性网路介面和私有实例的弹性网路介面的日志组”。",
    "questionCues": [
      "解决方案架构师必须确定流量是否代表来自网际网路的未经请求的入站连线",
      "VPC CIDR 区块的前两个八位元组是 203.0"
    ],
    "answerCues": {
      "B": [
        "选择包含NAT网关弹性网路介面和私有实例弹性网路介面的日志组",
        "目标位址设定为“like 203.0”"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "91": {
    "when": "该公司希望使用 Amazon S3 托管加密金钥 (SSE- S3) 实施伺服器端加密 + 公司政策要求所有文件必须以静态加密方式储存",
    "target": "使用 S3 Batch 操作在相同位置复制和加密物件 + 在两个 S3 储存桶上开启 SSE-S3",
    "avoid": "别选“使用 AWS CLI 中的 S3 复制指令加密现有物件”；认准“使用 S3 Batch 操作在相同位置复制和加密物件”。",
    "questionCues": [
      "该公司希望使用 Amazon S3 托管加密金钥 (SSE- S3) 实施伺服器端加密",
      "公司政策要求所有文件必须以静态加密方式储存"
    ],
    "answerCues": {
      "A": [
        "使用 S3 Batch 操作在相同位置复制和加密物件",
        "在两个 S3 储存桶上开启 SSE-S3"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "92": {
    "when": "公司必须无限期保留所有资料 + 出于合规原因 + 公司需要对资料进行查询和分析",
    "target": "使用 AWS Glue Data Catalog 和 Amazon Athena 查询资料 + 建立 S3 生命周期策略",
    "avoid": "别选“使用S3选择查询资料”；认准“使用 AWS Glue Data Catalog 和 Amazon Athena 查询资料”。",
    "questionCues": [
      "公司必须无限期保留所有资料",
      "出于合规原因",
      "公司需要对资料进行查询和分析"
    ],
    "answerCues": {
      "C": [
        "使用 AWS Glue Data Catalog 和 Amazon Athena 查询资料",
        "建立 S3 生命周期策略"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "93": {
    "when": "资料在传输过程中必须加密 + 一家视讯处理公司希望使用 600 TB 的压缩资料建立机器学习 (ML) 模型 + 因此希望使用 AWS",
    "target": "使用目标 S3 储存桶配置设备 + 使用 AWS 管理控制台订购多个 AWS Snowball 边缘储存最佳化设备",
    "avoid": "别选“使用目标 S3 储存桶设定档闸道”；认准“使用目标 S3 储存桶配置设备”。",
    "questionCues": [
      "资料在传输过程中必须加密",
      "一家视讯处理公司希望使用 600 TB 的压缩资料建立机器学习 (ML) 模型",
      "因此希望使用 AWS"
    ],
    "answerCues": {
      "A": [
        "使用目标 S3 储存桶配置设备",
        "使用 AWS 管理控制台订购多个 AWS Snowball 边缘储存最佳化设备"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "94": {
    "when": "解决方案架构师需要自动化表单的手动处理 + 并最大限度地减少长期营运费用 + 最大限度地缩短上市时间",
    "target": "Amazon Textract + Amazon Comprehend",
    "avoid": "别选“配置此层以使用在EC2实例上训练和托管的人工智慧和机器学习 (AI/ML) 模型”；认准“Amazon Textract”。",
    "questionCues": [
      "解决方案架构师需要自动化表单的手动处理",
      "并最大限度地减少长期营运费用",
      "最大限度地缩短上市时间"
    ],
    "answerCues": {
      "D": [
        "Amazon Textract",
        "Amazon Comprehend"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "95": {
    "when": "该公司不想对应用程式进行任何重大更改 + 一家公司正在AWS云端中重构其on-premises订单处理平台",
    "target": "建立使用 AMI 和 Application Load Balancer 的 Amazon EC2 Auto Scaling 群组 + 设定 Amazon MQ + 配置 Amazon Elastic Kubernetes Service (Amazon EKS)",
    "avoid": "别选“在一组不同的 EC2 实例上安装 Kubernetes 以托管订单处理后端”。",
    "questionCues": [
      "该公司不想对应用程式进行任何重大更改",
      "一家公司正在AWS云端中重构其on-premises订单处理平台"
    ],
    "answerCues": {
      "A": [
        "建立使用 AMI 和 Application Load Balancer 的 Amazon EC2 Auto Scaling 群组",
        "设定 Amazon MQ",
        "配置 Amazon Elastic Kubernetes Service (Amazon EKS)"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "96": {
    "when": "解决方案架构师需要为将储存在新的Amazon S3储存桶中的物件实作客户端加密机制 + 新增至IAM策略才能满足所有要求",
    "target": "kms:GenerateDataKey",
    "avoid": "别选“kms:GetKeyPolicy”；认准“kms:GenerateDataKey”。",
    "questionCues": [
      "解决方案架构师需要为将储存在新的Amazon S3储存桶中的物件实作客户端加密机制",
      "新增至IAM策略才能满足所有要求"
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
    "when": "该公司希望改善应用程式的安全状况 + 并计划使用 AWS WAF Web ACL + Amazon EC2",
    "target": "启用 AWS WAF 日志记录 + 将Web ACL规则的操作设定为计数",
    "avoid": "别选“使用 Amazon CloudWatch 指标和 AWS WAF 取样请求或 AWS WAF 日志来评估规则群组”。",
    "questionCues": [
      "该公司希望改善应用程式的安全状况",
      "并计划使用 AWS WAF Web ACL",
      "Amazon EC2"
    ],
    "answerCues": {
      "A": [
        "启用 AWS WAF 日志记录",
        "将Web ACL规则的操作设定为计数"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "98": {
    "when": "解决方案架构师必须改进公司管理组织中AWS帐户的通用安全群组规则的方式 + 解决方案架构师必须设计一个解决方案 + CIDR",
    "target": "使用所有内部 CIDR 范围填入客户管理的前缀清单 + 使用 AWS Resource Access Manager 与组织共用客户管理的前缀清单",
    "avoid": "别选“使用所有内部 CIDR 范围填入每个帐户中的前缀清单”；认准“使用所有内部 CIDR 范围填入客户管理的前缀清单”。",
    "questionCues": [
      "解决方案架构师必须改进公司管理组织中AWS帐户的通用安全群组规则的方式",
      "解决方案架构师必须设计一个解决方案",
      "CIDR"
    ],
    "answerCues": {
      "C": [
        "使用所有内部 CIDR 范围填入客户管理的前缀清单",
        "使用 AWS Resource Access Manager 与组织共用客户管理的前缀清单"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "99": {
    "when": "解决方案架构师必须设计一个可扩展的 AWS Client VPN 解决方案 + 该公司在多个 AWS 帐户中托管带有 VPC 的内部应用程式",
    "target": "在主 AWS 帐户中建立 Client VPN 端点 + 配置允许存取内部应用程式的所需路由",
    "avoid": "已有账户间 VPC 对等连接，不要每个账户各建端点，也不要额外添加 Transit Gateway。",
    "questionCues": [
      "解决方案架构师必须设计一个可扩展的 AWS Client VPN 解决方案",
      "该公司在多个 AWS 帐户中托管带有 VPC 的内部应用程式"
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
    "when": "解决方案架构师需要解耦第三方服务呼叫并确保所有呼叫最终完成 + 应用程式透过直接呼叫AWS Lambda函数来同步呼叫第三方服务",
    "target": "Amazon SQS + Amazon Simple Queue Service",
    "avoid": "别选“使用 AWS Step Functions 状态机将事件传递给 Lambda 函数”；认准“Amazon SQS”。",
    "questionCues": [
      "解决方案架构师需要解耦第三方服务呼叫并确保所有呼叫最终完成",
      "应用程式透过直接呼叫AWS Lambda函数来同步呼叫第三方服务"
    ],
    "answerCues": {
      "A": [
        "Amazon SQS",
        "Amazon Simple Queue Service"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "101": {
    "when": "能够跨 AWS 帐户安全地存取 S3 储存桶中的资料 + 行销团队需要存取国家团队储存在S3储存桶中的资料 + 该公司需要一种解决方案",
    "target": "更新QuickSight角色 + 以与销售帐户中的新IAM角色创建信任关系",
    "avoid": "别选“在销售帐户中建立 S3 复制规则”；认准“更新QuickSight角色”。",
    "questionCues": [
      "能够跨 AWS 帐户安全地存取 S3 储存桶中的资料",
      "行销团队需要存取国家团队储存在S3储存桶中的资料",
      "该公司需要一种解决方案"
    ],
    "answerCues": {
      "D": [
        "更新QuickSight角色",
        "以与销售帐户中的新IAM角色创建信任关系"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "102": {
    "when": "解决方案架构师必须在AWS上设计异质资料库迁移 + 该公司希望迁移到 AWS 托管资料库服务 + 迁移到AWS",
    "target": "使用AWS架构转换工具将MySQL的资料库架构转换为Amazon RDS + 迁移到Amazon RDS",
    "avoid": "别选“使用 S3 与 SQL Server 功能集成”；认准“使用AWS架构转换工具将MySQL的资料库架构转换为Amazon RDS”。",
    "questionCues": [
      "解决方案架构师必须在AWS上设计异质资料库迁移",
      "该公司希望迁移到 AWS 托管资料库服务",
      "迁移到AWS"
    ],
    "answerCues": {
      "C": [
        "使用AWS架构转换工具将MySQL的资料库架构转换为Amazon RDS",
        "迁移到Amazon RDS"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "103": {
    "when": "设计团队需要将资产载入到生产帐户中的S3桶中 + 解决方案架构师必须为设计团队提供对生产帐户的存取权限 + Amazon S3",
    "target": "A：在生产帐户中，建立一个新的 IAM 策略 + 允许对 S3 储存桶进行读写存取；C：将开发帐户定义为受信任的实体；E：允许对生产帐户中的角色执行 sts:AssumeRole 操作",
    "avoid": "别选“允许对开发帐户中的角色执行 sts:AssumeRole 操作”；认准“在生产帐户中，建立一个新的 IAM 策略”。",
    "questionCues": [
      "设计团队需要将资产载入到生产帐户中的S3桶中",
      "解决方案架构师必须为设计团队提供对生产帐户的存取权限",
      "Amazon S3"
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
    "when": "解决方案架构师必须缓解效能问题 + 为了节省开发成本 + CPU 使用率通常大于 85%",
    "target": "如果平均 CPU 使用率超过 85% 持续 5 分钟 + 修改现有环境的容量配置以使用负载平衡的环境类型",
    "avoid": "别选“如果最大 CPU 使用率超过 85% 持续 5 分钟”；认准“如果平均 CPU 使用率超过 85% 持续 5 分钟”。",
    "questionCues": [
      "解决方案架构师必须缓解效能问题",
      "为了节省开发成本",
      "CPU 使用率通常大于 85%"
    ],
    "answerCues": {
      "C": [
        "如果平均 CPU 使用率超过 85% 持续 5 分钟",
        "修改现有环境的容量配置以使用负载平衡的环境类型"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "105": {
    "when": "同时对效能的影响最小 + 该应用程式在本月能够处理适量的流量 + 该应用程式包括一个执行大量 I/O 操作的自我管理的MySQL资料库",
    "target": "将资料库集群一次迁移到Amazon RDS + 并建立多个额外的唯读副本来处理月底的负载",
    "avoid": "别选“将所有 Amazon EBS 磁碟区变更为 GP2 磁碟区”；认准“将资料库集群一次迁移到Amazon RDS”。",
    "questionCues": [
      "同时对效能的影响最小",
      "该应用程式在本月能够处理适量的流量",
      "该应用程式包括一个执行大量 I/O 操作的自我管理的MySQL资料库"
    ],
    "answerCues": {
      "B": [
        "将资料库集群一次迁移到Amazon RDS",
        "并建立多个额外的唯读副本来处理月底的负载"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "106": {
    "when": "并最大限度地减少维护伺服器的管理开销 + 该公司希望将应用程式迁移到AWS + 但该公司希望实现技术堆叠的现代化",
    "target": "授予ECS任务执行角色10存取ECR镜像仓库的权限 + 配置 Amazon ECS 以使用 Application Load Balancer (ALB)",
    "avoid": "别选“授予EKS节点存取ECR镜像储存库的权限”；认准“授予ECS任务执行角色10存取ECR镜像仓库的权限”。",
    "questionCues": [
      "并最大限度地减少维护伺服器的管理开销",
      "该公司希望将应用程式迁移到AWS",
      "但该公司希望实现技术堆叠的现代化"
    ],
    "answerCues": {
      "A": [
        "授予ECS任务执行角色10存取ECR镜像仓库的权限",
        "配置 Amazon ECS 以使用 Application Load Balancer (ALB)"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "107": {
    "when": "解决方案架构师需要重新设计应用程式以支援故障转移到另一个AWSRegion + 该应用程式作为 AWS Lambda 函数托管",
    "target": "将 Lambda 函数和 API Gateway 端点部署到 us-west-2 Region + 设定 Amazon Route 53 使用故障转移路由策略来路由两个 API Gateway 端点的流量",
    "avoid": "别选“以将流量导向至 us-east-1 中的 Lambda 函数”。",
    "questionCues": [
      "解决方案架构师需要重新设计应用程式以支援故障转移到另一个AWSRegion",
      "该应用程式作为 AWS Lambda 函数托管"
    ],
    "answerCues": {
      "D": [
        "将 Lambda 函数和 API Gateway 端点部署到 us-west-2 Region",
        "设定 Amazon Route 53 使用故障转移路由策略来路由两个 API Gateway 端点的流量"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "108": {
    "when": "人力资源部门希望确保其他部门不能分享 RI 折扣 + 每个 OU 都有多个 AWS 帐户 + 并将其部门映射到以下OU",
    "target": "使用组织的管理帐户关闭 HR 部门生产 AWS 帐户的 RI 共用 + 在AWS 计费和成本管理控制台中",
    "avoid": "别选“将SCP套用到其他部门的OU”；认准“使用组织的管理帐户关闭 HR 部门生产 AWS 帐户的 RI 共用”。",
    "questionCues": [
      "人力资源部门希望确保其他部门不能分享 RI 折扣",
      "每个 OU 都有多个 AWS 帐户",
      "并将其部门映射到以下OU"
    ],
    "answerCues": {
      "C": [
        "使用组织的管理帐户关闭 HR 部门生产 AWS 帐户的 RI 共用",
        "在AWS 计费和成本管理控制台中"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "109": {
    "when": "AWS Systems Manager 会话管理器已配置 + 解决方案架构师应如何存取EC2实例来解决问题 + Auto Scaling",
    "target": "暂停Auto Scaling组的终止进程 + 使用会话管理器登入标记为不正常的实例",
    "avoid": "别选“将 Auto Scaling 群组上的终止策略设定为 OldestInstance”。",
    "questionCues": [
      "AWS Systems Manager 会话管理器已配置",
      "解决方案架构师应如何存取EC2实例来解决问题",
      "Auto Scaling"
    ],
    "answerCues": {
      "D": [
        "暂停Auto Scaling组的终止进程",
        "使用会话管理器登入标记为不正常的实例"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "110": {
    "when": "管理员还必须能够自动更新和修复所有帐户中不合规的 AWS WAF 规则 + 管理员必须能够根据需要从托管 AWS WAF 规则集中",
    "target": "根据需要更新参数以新增或删除帐户或OU + 使用 AWS 防火墙管理器来管理组织中跨帐户的 AWS WAF 规则",
    "avoid": "别选“透过在 Lambda 函数中使用 AWS 安全性令牌服务 (AWS STS) 来承担角色”。",
    "questionCues": [
      "管理员还必须能够自动更新和修复所有帐户中不合规的 AWS WAF 规则",
      "管理员必须能够根据需要从托管 AWS WAF 规则集中"
    ],
    "answerCues": {
      "A": [
        "根据需要更新参数以新增或删除帐户或OU",
        "使用 AWS 防火墙管理器来管理组织中跨帐户的 AWS WAF 规则"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "111": {
    "when": "该储存桶配置为使用 AWS KMS 托管加密金钥 (SSE-KMS) 进行伺服器端加密 + 公司需要一种解决方案来最大限度地减少泄露的影响",
    "target": "在 VPC 中为 Amazon S3 部署网关 VPC 端点 + 变更 Lambda 函数的 IAM 角色",
    "avoid": "别选“更改 Lambda 函数的 IAM 角色以允许该函数存取 Parameter Store”。",
    "questionCues": [
      "该储存桶配置为使用 AWS KMS 托管加密金钥 (SSE-KMS) 进行伺服器端加密",
      "公司需要一种解决方案来最大限度地减少泄露的影响"
    ],
    "answerCues": {
      "A": [
        "在 VPC 中为 Amazon S3 部署网关 VPC 端点",
        "变更 Lambda 函数的 IAM 角色"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "112": {
    "when": "解决方案架构师必须实作控制机制来限制只有开发人员可以启动的执行个体类型 + 多个大型实例类型的建立和后续终止占据了成本的很大一部分",
    "target": "将策略附加到包含开发人员的 IAM 帐户的 IAM 群组 + 建立新的IAM策略",
    "avoid": "别选“在EC2控制台中”；认准“将策略附加到包含开发人员的 IAM 帐户的 IAM 群组”。",
    "questionCues": [
      "解决方案架构师必须实作控制机制来限制只有开发人员可以启动的执行个体类型",
      "多个大型实例类型的建立和后续终止占据了成本的很大一部分"
    ],
    "answerCues": {
      "C": [
        "将策略附加到包含开发人员的 IAM 帐户的 IAM 群组",
        "建立新的IAM策略"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "113": {
    "when": "该公司要求将云端基础设施的成本分配给自己的专案 + 多个 Amazon EC2 实例缺少用于成本分配的项目标签",
    "target": "A：AWS Config；B：则在组织中建立一个 SCP；E：以收集缺少项目标签的 EC2 实例清单",
    "avoid": "别选“使用 AWS Security Hub 聚合缺少项目标签的 EC2 实例清单”；认准“AWS Config”。",
    "questionCues": [
      "该公司要求将云端基础设施的成本分配给自己的专案",
      "多个 Amazon EC2 实例缺少用于成本分配的项目标签"
    ],
    "answerCues": {
      "A": [
        "AWS Config"
      ],
      "B": [
        "则在组织中建立一个 SCP"
      ],
      "E": [
        "以收集缺少项目标签的 EC2 实例清单"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "114": {
    "when": "缓冲区可自动扩展以符合资料吞吐量 + 资料库无法扩展 + 且无需持续管理",
    "target": "A：使用Amazon Kinesis Data Firehose来缓冲事件；D：Amazon ES",
    "avoid": "别选“建立 Amazon Kinesis 资料流来缓冲事件”。",
    "questionCues": [
      "缓冲区可自动扩展以符合资料吞吐量",
      "资料库无法扩展",
      "且无需持续管理"
    ],
    "answerCues": {
      "A": [
        "使用Amazon Kinesis Data Firehose来缓冲事件"
      ],
      "D": [
        "Amazon ES"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "115": {
    "when": "解决方案架构师需要降低成本并维护应用程式的功能 + NatGateway-Bytes 收费正在增加 EC2-其他类别的成本",
    "target": "确保VPC端点策略允许来自应用程式的流量 + 将 Kinesis 资料流的介面 VPC 端点加入 VPC",
    "avoid": "别选“确保应用程式具有正确的 IAM 权限来使用介面 VPC 端点”；认准“确保VPC端点策略允许来自应用程式的流量”。",
    "questionCues": [
      "解决方案架构师需要降低成本并维护应用程式的功能",
      "NatGateway-Bytes 收费正在增加 EC2-其他类别的成本"
    ],
    "answerCues": {
      "D": [
        "确保VPC端点策略允许来自应用程式的流量",
        "将 Kinesis 资料流的介面 VPC 端点加入 VPC"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "116": {
    "when": "网路上不能存在单点故障 + 公司还需要支援在那些 Regions 中的 VPC 之间直接路由的流量 + 以实现高可用性",
    "target": "将Transit Gateways彼此对等以支援跨Region 路由 + 建立从 DX-B 连接到相同 Direct Connect 闸道的中转 VIF",
    "avoid": "别选“建立从 DX-8 连接到单独的 Direct Connect 闸道的中转 VIF”。",
    "questionCues": [
      "网路上不能存在单点故障",
      "公司还需要支援在那些 Regions 中的 VPC 之间直接路由的流量",
      "以实现高可用性"
    ],
    "answerCues": {
      "D": [
        "将Transit Gateways彼此对等以支援跨Region 路由",
        "建立从 DX-B 连接到相同 Direct Connect 闸道的中转 VIF"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "117": {
    "when": "公司的安全团队必须批准所有新 IAM 用户的创建 + 安全团队必须收到批准用户的通知 + 必须自动删除该使用者的所有存取权限",
    "target": "A：Amazon CloudWatch；D：呼叫 AWS Step Functions 状态机来删除存取权限；E：使用Amazon简单通知服务（Amazon SNS）通知安全团队",
    "avoid": "别选“使用 Amazon Pinpoint 通知安全团队”；认准“Amazon CloudWatch”。",
    "questionCues": [
      "公司的安全团队必须批准所有新 IAM 用户的创建",
      "安全团队必须收到批准用户的通知",
      "必须自动删除该使用者的所有存取权限"
    ],
    "answerCues": {
      "A": [
        "Amazon CloudWatch"
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
    "when": "该公司希望使用多帐户结构来集中管理对所有帐户和应用程式的存取 + 开发帐户和临时帐户必须只能相互存取 + 公司必须为开发创建单独的帐户",
    "target": "A：使用AWS Control Tower部署登陆区环境；C：在每个帐户中建立中转网关和中转网关 VPC 附件；D：设定并启用 AWS IAM 身分中心（AWS 单一登入）",
    "avoid": "别选“在所有帐户中启用AWS Control Tower以管理帐户之间的路由”。",
    "questionCues": [
      "该公司希望使用多帐户结构来集中管理对所有帐户和应用程式的存取",
      "开发帐户和临时帐户必须只能相互存取",
      "公司必须为开发创建单独的帐户"
    ],
    "answerCues": {
      "A": [
        "使用AWS Control Tower部署登陆区环境"
      ],
      "C": [
        "在每个帐户中建立中转网关和中转网关 VPC 附件"
      ],
      "D": [
        "设定并启用 AWS IAM 身分中心（AWS 单一登入）"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "119": {
    "when": "解决方案架构师应该如何做才能以最少的营运工作来降低成本 + 该公司希望降低成本 + 但生产环境每周7天、每天24小时运行",
    "target": "配置第二个规则以呼叫另一个 Lambda 函数 + 建立在每个工作日晚上运行的 Amazon EventBridge 规则",
    "avoid": "别选“配置该规则以呼叫基于滞后终止实例的 AWS Lambda 函数”；认准“配置第二个规则以呼叫另一个 Lambda 函数”。",
    "questionCues": [
      "解决方案架构师应该如何做才能以最少的营运工作来降低成本",
      "该公司希望降低成本",
      "但生产环境每周7天、每天24小时运行"
    ],
    "answerCues": {
      "B": [
        "配置第二个规则以呼叫另一个 Lambda 函数",
        "建立在每个工作日晚上运行的 Amazon EventBridge 规则"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "120": {
    "when": "使客户能够为每秒进行一定数量的 API 呼叫的容量付费 + 日志显示 Lambda 函数从未被呼叫 + 并将 AWS Lambda 整合",
    "target": "该公司达到了 API Gateway 帐户每秒调用次数限制",
    "avoid": "别选“该公司达到了其 API Gateway 预设每种方法的每秒调用次数限制”。",
    "questionCues": [
      "使客户能够为每秒进行一定数量的 API 呼叫的容量付费",
      "日志显示 Lambda 函数从未被呼叫",
      "并将 AWS Lambda 整合"
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
    "when": "公司需要使用安全工具来检查所有进出VPC的封包 + 解决方案架构师必须在 AWS 上设计一个在 AWS Region 内高度可用的目标架构",
    "target": "A：Auto Scaling；D：以将流量重定向到安全工具",
    "avoid": "别选“提供中转网关以促进VPC之间的通讯”；认准“Auto Scaling”。",
    "questionCues": [
      "公司需要使用安全工具来检查所有进出VPC的封包",
      "解决方案架构师必须在 AWS 上设计一个在 AWS Region 内高度可用的目标架构"
    ],
    "answerCues": {
      "A": [
        "Auto Scaling"
      ],
      "D": [
        "以将流量重定向到安全工具"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "122": {
    "when": "可以更快地交付并优化成本 + 该公司需要设计一种新的数据分析解决方案 + 但每个供应商都有独特的格式",
    "target": "S3 使用 AWS Glue 对文件进行编目 + 将 IoT 感测器连接到 AWS IoT Core",
    "avoid": "别选“为 SFTP 伺服器建立 AWS 传输”；认准“S3 使用 AWS Glue 对文件进行编目”。",
    "questionCues": [
      "可以更快地交付并优化成本",
      "该公司需要设计一种新的数据分析解决方案",
      "但每个供应商都有独特的格式"
    ],
    "answerCues": {
      "A": [
        "S3 使用 AWS Glue 对文件进行编目",
        "将 IoT 感测器连接到 AWS IoT Core"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "123": {
    "when": "该公司希望在确定网路和安全策略后快速迁移应用程式并使其现代化 + 并且还必须能够与所有VPC通讯 + 公司网路必须能够无缝存取AWS上的资源",
    "target": "B：使用中转 VIF 将中转闸道连接到 Direct Connect 闸道；D：将 VPC 连接到中转网关；F：以允许来自AWS的出站网路流量流经在资料中心运行的NAT服务",
    "avoid": "别选“使用 Direct Connect 网关和每个虚拟专用网关的帐户 ID 建立关联提案”。",
    "questionCues": [
      "该公司希望在确定网路和安全策略后快速迁移应用程式并使其现代化",
      "并且还必须能够与所有VPC通讯",
      "公司网路必须能够无缝存取AWS上的资源"
    ],
    "answerCues": {
      "B": [
        "使用中转 VIF 将中转闸道连接到 Direct Connect 闸道"
      ],
      "D": [
        "将 VPC 连接到中转网关"
      ],
      "F": [
        "以允许来自AWS的出站网路流量流经在资料中心运行的NAT服务"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "124": {
    "when": "解决方案架构师需要以尽可能最安全的方式实施新流程 + 此流程要求所有想要购买或修改预留实例的业务部门向专门的团队提交采购请求",
    "target": "A：确保所有 AWS 帐户都是 AWS Organizations ​​中组织的一部分；D：将SCP附加到组织的每个OU",
    "avoid": "别选“确保所有 AWS 帐户都是使用合并计费功能的 AWS Organizations ​​组织的一部分”。",
    "questionCues": [
      "解决方案架构师需要以尽可能最安全的方式实施新流程",
      "此流程要求所有想要购买或修改预留实例的业务部门向专门的团队提交采购请求"
    ],
    "answerCues": {
      "A": [
        "确保所有 AWS 帐户都是 AWS Organizations ​​中组织的一部分"
      ],
      "D": [
        "将SCP附加到组织的每个OU"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "125": {
    "when": "最近的 RDS 资料库故障转移测试导致应用程式中断 40 秒 + 将中断时间减少到 20 秒以内 + 解决方案架构师需要设计解决方案",
    "target": "C：在资料库前面使用RDS代理；D：将资料库迁移到AmazonAuroraMySQL；E：Amazon Aurora",
    "avoid": "别选“为 MySQL 只读副本建立 RDS”；认准“在资料库前面使用RDS代理”。",
    "questionCues": [
      "最近的 RDS 资料库故障转移测试导致应用程式中断 40 秒",
      "将中断时间减少到 20 秒以内",
      "解决方案架构师需要设计解决方案"
    ],
    "answerCues": {
      "C": [
        "在资料库前面使用RDS代理"
      ],
      "D": [
        "将资料库迁移到AmazonAuroraMySQL"
      ],
      "E": [
        "Amazon Aurora"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "126": {
    "when": "公司必须使用 API 或命令列工具对客户帐户建立最低权限安全存取 + 此服务要求合作伙伴公司能够存取客户帐户中的AWS 资源",
    "target": "合作伙伴公司应使用 IAM 角色的 Amazon 资源名称 (ARN) + 包括 IAM 角色信任策略中的外部 ID",
    "avoid": "别选“客户应建立IAM用户并将所需的权限分配给IAM用户”；认准“合作伙伴公司应使用 IAM 角色的 Amazon 资源名称 (ARN)”。",
    "questionCues": [
      "公司必须使用 API 或命令列工具对客户帐户建立最低权限安全存取",
      "此服务要求合作伙伴公司能够存取客户帐户中的AWS 资源"
    ],
    "answerCues": {
      "D": [
        "合作伙伴公司应使用 IAM 角色的 Amazon 资源名称 (ARN)",
        "包括 IAM 角色信任策略中的外部 ID"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "127": {
    "when": "公司需要能够根据运作的容器数量经济有效地分配资源 + 某快递公司需要将第三方路径规划应用程式迁移至AWS + 仅处理该部分区域中的订单",
    "target": "使用 AWS CLI 执行任务命令并将enableECSManagedTags 设为 true 以启动规划应用程式",
    "avoid": "别选“使用运行任务设定为 true 的 AWS CLI 来启动规划应用程序”。",
    "questionCues": [
      "公司需要能够根据运作的容器数量经济有效地分配资源",
      "某快递公司需要将第三方路径规划应用程式迁移至AWS",
      "仅处理该部分区域中的订单"
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
    "when": "其 IPv4 CIDR 区块为 10.10.10.0/24 + 共享服务 VPC 位于 us-east-2 Region 中",
    "target": "A：两个 VPC 的 IPv4 CIDR 范围重叠；E：对等接受方帐户中的IAM角色没有正确的权限",
    "avoid": "别选“其中一个 VPC 未透过 AWS 资源存取管理员共享”；认准“两个 VPC 的 IPv4 CIDR 范围重叠”。",
    "questionCues": [
      "其 IPv4 CIDR 区块为 10.10.10.0/24",
      "共享服务 VPC 位于 us-east-2 Region 中"
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
    "when": "解决方案架构师必须确定每个 Lambda 函数需要哪些权限 + 该公司希望每个功能仅拥有该功能完成其任务所需的最低权限",
    "target": "AWS Identity and Access Management Access Analyzer + 开启 AWS 帐号的 AWS CloudTrail 日志记录",
    "avoid": "别选“透过 Lambda 执行角色搜寻 AWS API 调用”。",
    "questionCues": [
      "解决方案架构师必须确定每个 Lambda 函数需要哪些权限",
      "该公司希望每个功能仅拥有该功能完成其任务所需的最低权限"
    ],
    "answerCues": {
      "B": [
        "AWS Identity and Access Management Access Analyzer",
        "开启 AWS 帐号的 AWS CloudTrail 日志记录"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "130": {
    "when": "解决方案架构师必须分析环境并根据结果采取行动 + 这些EC2实例的利用率因使用资料库的应用程式而异 + Amazon EC2",
    "target": "在每个 EC2 实例上安装 Amazon CloudWatch 代理 + 并让它运行至少 12 小时",
    "avoid": "别选“配置与 EC2 实例及其 EBS 卷关联的 Amazon CloudWatch 指标的可视化”。",
    "questionCues": [
      "解决方案架构师必须分析环境并根据结果采取行动",
      "这些EC2实例的利用率因使用资料库的应用程式而异",
      "Amazon EC2"
    ],
    "answerCues": {
      "C": [
        "在每个 EC2 实例上安装 Amazon CloudWatch 代理",
        "并让它运行至少 12 小时"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "131": {
    "when": "使资料库管理员能够存取资料库 + 这些秘密由应用程式帐户中 Secrets Manager 的预设 AWS 托管金钥进行加密",
    "target": "将 DBA-Admin 角色附加到 EC2 实例以存取跨帐户机密 + 建立一个名为 DBA-Secret 的 IAM 角色",
    "avoid": "别选“将 DBA 管理员角色附加到 EC2 实例以存取跨帐户机密”。",
    "questionCues": [
      "使资料库管理员能够存取资料库",
      "这些秘密由应用程式帐户中 Secrets Manager 的预设 AWS 托管金钥进行加密"
    ],
    "answerCues": {
      "B": [
        "将 DBA-Admin 角色附加到 EC2 实例以存取跨帐户机密",
        "建立一个名为 DBA-Secret 的 IAM 角色"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "132": {
    "when": "此解决方案必须最大限度地提高营运效率 + 公司在 DataOps OU 中部署的 EC2 实例必须使用预先定义的实例类型清单",
    "target": "C：aws:RequestedRegion 条件键 + 将 SCP 应用于根OU；E：ec2:InstanceType 条件键 + 将 SCP 应用到 DataOps OU",
    "avoid": "别选“使用 ec2:Region 条件键限制对 ap-northeast-1 以外的所有 AWS Regions 的存取”。",
    "questionCues": [
      "此解决方案必须最大限度地提高营运效率",
      "公司在 DataOps OU 中部署的 EC2 实例必须使用预先定义的实例类型清单"
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
    "when": "结果必须写入目前Region中现有的S3储存桶 + URL 必须从现有的 Region 发布 + 结果保存到Amazon S3存储桶中",
    "target": "A：使用 Lambda 函数将SQS队列部署到其他Regions；C：将每个Region中的SQS队列订阅到SNS主题",
    "avoid": "别选“将每个Region中的SNS主题订阅到SQS队列”；认准“使用 Lambda 函数将SQS队列部署到其他Regions”。",
    "questionCues": [
      "结果必须写入目前Region中现有的S3储存桶",
      "URL 必须从现有的 Region 发布",
      "结果保存到Amazon S3存储桶中"
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
    "when": "原始程式码无法修改 + 一家公司在 Amazon EC2 Linux 实例上运行专有的无状态 ETL 应用程式 + 解决方案架构师应该",
    "target": "使用AmazonEventBridge（AmazonCloudWatch事件）每4小时呼叫一次Fargate任务",
    "avoid": "别选“使用 Amazon CloudWatch 日志每 4 小时呼叫一次 Lambda 函数”。",
    "questionCues": [
      "原始程式码无法修改",
      "一家公司在 Amazon EC2 Linux 实例上运行专有的无状态 ETL 应用程式",
      "解决方案架构师应该"
    ],
    "answerCues": {
      "C": [
        "使用AmazonEventBridge（AmazonCloudWatch事件）每4小时呼叫一次Fargate任务"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "135": {
    "when": "Amazon S3 + Amazon DynamoDB + 游戏由部署在单一AWS Region 中的以下组件组成",
    "target": "在新的Region中创建另一个S3桶 + 并配置桶之间的S3跨Region复制",
    "avoid": "别选“配置S3交叉Region复制”；认准“在新的Region中创建另一个S3桶”。",
    "questionCues": [
      "Amazon S3",
      "Amazon DynamoDB",
      "游戏由部署在单一AWS Region 中的以下组件组成"
    ],
    "answerCues": {
      "C": [
        "在新的Region中创建另一个S3桶",
        "并配置桶之间的S3跨Region复制"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "136": {
    "when": "必须部署应用程式以实现高可用性 + 该公司需要将整个应用程式迁移到具有类似结构的AWS + 且公司不能对应用程式进行更改",
    "target": "配置为 Amazon DocumentDB（与 MongoDB 相容）作为订阅者资料的资料库 + 部署 Auto Scaling 群组中的 Amazon EC2 实例",
    "avoid": "别选“在 Amazon EC2 实例上使用 MongoDB 作为订阅者资料的资料库”。",
    "questionCues": [
      "必须部署应用程式以实现高可用性",
      "该公司需要将整个应用程式迁移到具有类似结构的AWS",
      "且公司不能对应用程式进行更改"
    ],
    "answerCues": {
      "C": [
        "配置为 Amazon DocumentDB（与 MongoDB 相容）作为订阅者资料的资料库",
        "部署 Auto Scaling 群组中的 Amazon EC2 实例"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "137": {
    "when": "该解决方案必须仅向这些使用者提供他们所需的最低权限 + 解决方案架构师必须确保策略帐户中的使用者可以存取 S3 储存桶",
    "target": "B：以授予S3 储存桶的完整权限；C：以向 Strategy_reviewer IAM 角色授予解密权限；F：以授予S3 储存桶的读取权限",
    "avoid": "别选“以向 Strategy_reviewer IAM 角色授予加密权限”；认准“以授予S3 储存桶的完整权限”。",
    "questionCues": [
      "该解决方案必须仅向这些使用者提供他们所需的最低权限",
      "解决方案架构师必须确保策略帐户中的使用者可以存取 S3 储存桶"
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
    "when": "并且单一作业可能需要几个小时才能以理想的运算能力处理数据 + 以根据工作负载需求进行扩展 + 最终结果将储存在Amazon S3中",
    "target": "使用AWSDataSync将定序资料传输至Amazon S3 + 此函数启动 AWS Step Functions 工作流程",
    "avoid": "别选“使用S3事件触发AWS Lambda函数来处理资料”；认准“使用AWSDataSync将定序资料传输至Amazon S3”。",
    "questionCues": [
      "并且单一作业可能需要几个小时才能以理想的运算能力处理数据",
      "以根据工作负载需求进行扩展",
      "最终结果将储存在Amazon S3中"
    ],
    "answerCues": {
      "C": [
        "使用AWSDataSync将定序资料传输至Amazon S3",
        "此函数启动 AWS Step Functions 工作流程"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "139": {
    "when": "一家公司在开发环境中的单一 Windows Amazon EC2 实例上运行内容管理应用程式 + 解决方案架构师必须设计一个解决方案",
    "target": "实作使用者资料脚本来安装应用程式并挂载 Windows 档案伺服器档案系统的 FSx + 为 Windows 档案伺服器档案系统建立 Amazon FSx",
    "avoid": "别选“从目前正在运行的 EC2 实例建立新的 AMI”。",
    "questionCues": [
      "一家公司在开发环境中的单一 Windows Amazon EC2 实例上运行内容管理应用程式",
      "解决方案架构师必须设计一个解决方案"
    ],
    "answerCues": {
      "C": [
        "实作使用者资料脚本来安装应用程式并挂载 Windows 档案伺服器档案系统的 FSx",
        "为 Windows 档案伺服器档案系统建立 Amazon FSx"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "140": {
    "when": "并需要最大限度地减少营运开销 + 一家基于软体即服务 (SaaS) 的公司向客户提供案例管理解决方案 A3 解决方案的一部分",
    "target": "将电子邮件范本与客户资料参数储存在 Amazon SES 上 + 设定 Amazon 简单电子邮件服务 (Amazon SES) 以发送电子邮件",
    "avoid": "别选“将电子邮件范本储存在 Amazon S3 储存桶中”；认准“将电子邮件范本与客户资料参数储存在 Amazon SES 上”。",
    "questionCues": [
      "并需要最大限度地减少营运开销",
      "一家基于软体即服务 (SaaS) 的公司向客户提供案例管理解决方案 A3 解决方案的一部分"
    ],
    "answerCues": {
      "D": [
        "将电子邮件范本与客户资料参数储存在 Amazon SES 上",
        "设定 Amazon 简单电子邮件服务 (Amazon SES) 以发送电子邮件"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "141": {
    "when": "该公司已将 SQS 队列的可见度逾时设定为 1 小时 + 该公司已使用重新驱动策略来配置 SQS 伫列 + 白天好几次",
    "target": "配置处理过程中实例的缩容保护",
    "avoid": "别选“将 SQS 伫列的可见度逾时更新为 3 小时”；认准“配置处理过程中实例的缩容保护”。",
    "questionCues": [
      "该公司已将 SQS 队列的可见度逾时设定为 1 小时",
      "该公司已使用重新驱动策略来配置 SQS 伫列",
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
    "when": "解决方案架构师必须设计一个解决方案 + 解决方案架构师确定了一组不需要公共存取的 API + 使这组 API 只能从 VPC 存取",
    "target": "使用VPC端点从VPC呼叫API + 将 API 端点从 Regional 更新为 API Gateway 中的私有端点",
    "avoid": "别选“使用CNAME记录从VPC呼叫API”；认准“使用VPC端点从VPC呼叫API”。",
    "questionCues": [
      "解决方案架构师必须设计一个解决方案",
      "解决方案架构师确定了一组不需要公共存取的 API",
      "使这组 API 只能从 VPC 存取"
    ],
    "answerCues": {
      "C": [
        "使用VPC端点从VPC呼叫API",
        "将 API 端点从 Regional 更新为 API Gateway 中的私有端点"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "143": {
    "when": "该公司最近扩展到为 us-east-1 Region 的用户提供服务 + Web 应用程式的前端是 Amazon CloudFront",
    "target": "B：配置S3跨Region复制以从eu-west-1中的S3储存桶进行同步；D：使用Lambda@Edge修改来自北美的请求以使用us-east-1中的S3存储桶",
    "avoid": "别选“使用 Lambda@Edge 修改来自北美的请求以使用 us-east-1 中的 S3 传输加速端点”。",
    "questionCues": [
      "该公司最近扩展到为 us-east-1 Region 的用户提供服务",
      "Web 应用程式的前端是 Amazon CloudFront"
    ],
    "answerCues": {
      "B": [
        "配置S3跨Region复制以从eu-west-1中的S3储存桶进行同步"
      ],
      "D": [
        "使用Lambda@Edge修改来自北美的请求以使用us-east-1中的S3存储桶"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "144": {
    "when": "解决方案还必须防止问题再次发生 + 解决方案架构师必须确保使用者可以重新获得存取权限 + 解决方案架构师发现档案系统已达到最大容量",
    "target": "实作一个监控可用空间的 Amazon CloudWatch 指标 + 使用AmazonEventBridge呼叫AWS Lambda函数来增加容量",
    "avoid": "别选“依需求使用AWS Step Functions增加容量”；认准“实作一个监控可用空间的 Amazon CloudWatch 指标”。",
    "questionCues": [
      "解决方案还必须防止问题再次发生",
      "解决方案架构师必须确保使用者可以重新获得存取权限",
      "解决方案架构师发现档案系统已达到最大容量"
    ],
    "answerCues": {
      "B": [
        "实作一个监控可用空间的 Amazon CloudWatch 指标",
        "使用AmazonEventBridge呼叫AWS Lambda函数来增加容量"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "145": {
    "when": "FTP 伺服器因连线中断和记忆体问题而出现问题 + 因此公司无法部署新的应用程式 + 手持设备无法修改",
    "target": "透过Amazon简单通知服务（Amazon SNS）使用S3事件通知来呼叫AWS Lambda函数 + 将档案放置在 Amazon S3 中",
    "avoid": "别选“更新手持装置以将档案直接放入Amazon S3”。",
    "questionCues": [
      "FTP 伺服器因连线中断和记忆体问题而出现问题",
      "因此公司无法部署新的应用程式",
      "手持设备无法修改"
    ],
    "answerCues": {
      "C": [
        "透过Amazon简单通知服务（Amazon SNS）使用S3事件通知来呼叫AWS Lambda函数",
        "将档案放置在 Amazon S3 中"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "146": {
    "when": "应用程式必须能够在应用程式发生故障时恢复到单独的 AWS Region + 如果发生故障 + 为了满足监管要求",
    "target": "在不同的 Region 中配置 Aurora 副本",
    "avoid": "别选“设定 AWS DataSync 将资料连续复制到不同的 Region”；认准“在不同的 Region 中配置 Aurora 副本”。",
    "questionCues": [
      "应用程式必须能够在应用程式发生故障时恢复到单独的 AWS Region",
      "如果发生故障",
      "为了满足监管要求"
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
    "when": "该公司需要在将资料发送到另一个S3储存桶进行额外的内部处理之前自动屏蔽 PAN + 因此任何设计都需要易于扩展 + HTTPS",
    "target": "请 ETL 作业将结果传送到另一个 S3 储存桶进行内部处理 + 在档案传递上呼叫AWS Lambda函数来启动AWSGlueETL作业",
    "avoid": "别选“将结果写入Amazon S3中的暂存位置”；认准“请 ETL 作业将结果传送到另一个 S3 储存桶进行内部处理”。",
    "questionCues": [
      "该公司需要在将资料发送到另一个S3储存桶进行额外的内部处理之前自动屏蔽 PAN",
      "因此任何设计都需要易于扩展",
      "HTTPS"
    ],
    "answerCues": {
      "C": [
        "请 ETL 作业将结果传送到另一个 S3 储存桶进行内部处理",
        "在档案传递上呼叫AWS Lambda函数来启动AWSGlueETL作业"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "148": {
    "when": "该公司计划迁移的 on-premises 应用程式使用 MySQL 资料库作为资料储存 + 一家公司希望使用 AWS 创建业务连续性解决方案",
    "target": "经常从最近的时间点执行故障转移和回退 + AWS Elastic Disaster Recovery",
    "avoid": "别选“在发生故障事件时切换到测试执行个体以对工作负载进行故障转移”；认准“经常从最近的时间点执行故障转移和回退”。",
    "questionCues": [
      "该公司计划迁移的 on-premises 应用程式使用 MySQL 资料库作为资料储存",
      "一家公司希望使用 AWS 创建业务连续性解决方案"
    ],
    "answerCues": {
      "B": [
        "经常从最近的时间点执行故障转移和回退",
        "AWS Elastic Disaster Recovery"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "149": {
    "when": "此解决方案必须符合AWS安全最佳实务 + 解决方案架构师必须为审核员提供对公司AWS帐户的安全性、唯读存取权限",
    "target": "创建信任审计师的AWS帐户的IAM角色 + 建立具有所需权限的IAM策略",
    "avoid": "别选“将所需的 IAM 策略附加到 IAM 使用者”；认准“创建信任审计师的AWS帐户的IAM角色”。",
    "questionCues": [
      "此解决方案必须符合AWS安全最佳实务",
      "解决方案架构师必须为审核员提供对公司AWS帐户的安全性、唯读存取权限"
    ],
    "answerCues": {
      "B": [
        "创建信任审计师的AWS帐户的IAM角色",
        "建立具有所需权限的IAM策略"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "150": {
    "when": "新的解决方案必须确保交易平台的高可用性 + 解决方案架构师需要设计一个解决方案来提高交易平台的效能 + 一家公司拥有一个对延迟敏感的交易平台",
    "target": "配置应用程式使用DAX读取资料并将资料直接写入DynamoDB表 + 建立一个三节点DynamoDB Accelerator (DAX)集群",
    "avoid": "别选“使用 DAX 设定应用程式来读取和写入资料”；认准“配置应用程式使用DAX读取资料并将资料直接写入DynamoDB表”。",
    "questionCues": [
      "新的解决方案必须确保交易平台的高可用性",
      "解决方案架构师需要设计一个解决方案来提高交易平台的效能",
      "一家公司拥有一个对延迟敏感的交易平台"
    ],
    "answerCues": {
      "B": [
        "配置应用程式使用DAX读取资料并将资料直接写入DynamoDB表",
        "建立一个三节点DynamoDB Accelerator (DAX)集群"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "151": {
    "when": "解决方案架构师需要优化应用程式的基础架构成本 + 而不会对应用程式可用性产生负面影响 + 一家公司已将应用程式从本地迁移到AWS",
    "target": "B：将应用程式前端移至托管在 Amazon S3 上的静态网站；E：部署到与现有 EC2 实例具有相同核心数量的通用可突发 EC2 实例",
    "avoid": "别选“将所有 EC2 实例变更为计算具有与现有 EC2 实例相同核心数的最佳化实例”。",
    "questionCues": [
      "解决方案架构师需要优化应用程式的基础架构成本",
      "而不会对应用程式可用性产生负面影响",
      "一家公司已将应用程式从本地迁移到AWS"
    ],
    "answerCues": {
      "B": [
        "将应用程式前端移至托管在 Amazon S3 上的静态网站"
      ],
      "E": [
        "部署到与现有 EC2 实例具有相同核心数量的通用可突发 EC2 实例"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "152": {
    "when": "并希望优化该平台的成本效益 + 可在 Amazon EKS 和 AWS Fargate 上运行 + Amazon EC2",
    "target": "为 EKS 集群的预测中等负载购买计算节省计划 + 透过按需容量预留来扩展集群",
    "avoid": "别选“为 EKS 集群在其基准负载中使用的 EC2 实例购买标准预留实例”；认准“为 EKS 集群的预测中等负载购买计算节省计划”。",
    "questionCues": [
      "并希望优化该平台的成本效益",
      "可在 Amazon EKS 和 AWS Fargate 上运行",
      "Amazon EC2"
    ],
    "answerCues": {
      "B": [
        "为 EKS 集群的预测中等负载购买计算节省计划",
        "透过按需容量预留来扩展集群"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "153": {
    "when": "该公司希望访客收到资讯性讯息 + 在应用程式无法使用期间 + 解决方案架构师创建一个Amazon S3储存桶作为流程的第一步",
    "target": "A：将静态资讯内容上传到S3储存桶；C：配置分配和 S3 储存桶以使用来源存取身分 (OAI)；D：编辑预设快取行为以使用S3来源",
    "avoid": "别选“将S3桶设定为原点”；认准“将静态资讯内容上传到S3储存桶”。",
    "questionCues": [
      "该公司希望访客收到资讯性讯息",
      "在应用程式无法使用期间",
      "解决方案架构师创建一个Amazon S3储存桶作为流程的第一步"
    ],
    "answerCues": {
      "A": [
        "将静态资讯内容上传到S3储存桶"
      ],
      "C": [
        "配置分配和 S3 储存桶以使用来源存取身分 (OAI)"
      ],
      "D": [
        "编辑预设快取行为以使用S3来源"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "154": {
    "when": "以最大程度地减少对使用者的干扰 + 解决方案架构师需要简化此流程 + 这些变更会导致使用者中断",
    "target": "重新配置 Lambda 别名以指向函数的新版本 + 建立 Lambda 函数别名",
    "avoid": "别选“直接修改已发布的Lambda函数版本的环境变数”；认准“重新配置 Lambda 别名以指向函数的新版本”。",
    "questionCues": [
      "以最大程度地减少对使用者的干扰",
      "解决方案架构师需要简化此流程",
      "这些变更会导致使用者中断"
    ],
    "answerCues": {
      "D": [
        "重新配置 Lambda 别名以指向函数的新版本",
        "建立 Lambda 函数别名"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "155": {
    "when": "公司内部管理公共DNS + 该公司希望透过顶级网域提供该应用程式 + Amazon DynamoDB 全域表将支援部署",
    "target": "创建一个具有多个端点组的 AWS Global Accelerator 加速器 + 使用加速器的静态 IP 位址在公用DNS 中为顶点域建立记录",
    "avoid": "别选“将公共DNS迁移到Amazon Route 53”。",
    "questionCues": [
      "公司内部管理公共DNS",
      "该公司希望透过顶级网域提供该应用程式",
      "Amazon DynamoDB 全域表将支援部署"
    ],
    "answerCues": {
      "C": [
        "创建一个具有多个端点组的 AWS Global Accelerator 加速器",
        "使用加速器的静态 IP 位址在公用DNS 中为顶点域建立记录"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "156": {
    "when": "解决方案架构师需要简化解决方案的部署并最佳化程式码重复使用 + 该公司将 Lambda 函数与 API Gateway 集成",
    "target": "将 API 的 Lambda 函数设定为使用该 Docker 映像作为部署套件 + 将共用程式库、自订类别以及 API 的 Lambda 函数程式码一并部署到 Docker 映像",
    "avoid": "别选“配置套件以使用 Lambda 层”；认准“将 API 的 Lambda 函数设定为使用该 Docker 映像作为部署套件”。",
    "questionCues": [
      "解决方案架构师需要简化解决方案的部署并最佳化程式码重复使用",
      "该公司将 Lambda 函数与 API Gateway 集成"
    ],
    "answerCues": {
      "D": [
        "将 API 的 Lambda 函数设定为使用该 Docker 映像作为部署套件",
        "将共用程式库、自订类别以及 API 的 Lambda 函数程式码一并部署到 Docker 映像"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "157": {
    "when": "公司也必须能够提供此回馈 + 公司应该如何部署ML模型来满足这些需求 + 即使工厂的网路连线中断",
    "target": "在本地伺服器上部署 AWS IoT Greengrass + 配置元件在侦测到缺陷时呼叫本机 API",
    "avoid": "别选“使用 ML 模型部署 SageMaker 端点”；认准“在本地伺服器上部署 AWS IoT Greengrass”。",
    "questionCues": [
      "公司也必须能够提供此回馈",
      "公司应该如何部署ML模型来满足这些需求",
      "即使工厂的网路连线中断"
    ],
    "answerCues": {
      "B": [
        "在本地伺服器上部署 AWS IoT Greengrass",
        "配置元件在侦测到缺陷时呼叫本机 API"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "158": {
    "when": "解决方案架构师将使用公司所有伺服器的组态管理资料库 (CMDB) 汇出来建立案例 + 将公司的on-premises资料中心迁移到AWS云端",
    "target": "使用迁移评估器执行分析 + 使用资料汇入模板从 CMDB 汇出上传资料",
    "avoid": "别选“使用AWS Well-Architected Tool汇入CMDB资料以执行分析并产生建议”；认准“使用迁移评估器执行分析”。",
    "questionCues": [
      "解决方案架构师将使用公司所有伺服器的组态管理资料库 (CMDB) 汇出来建立案例",
      "将公司的on-premises资料中心迁移到AWS云端"
    ],
    "answerCues": {
      "B": [
        "使用迁移评估器执行分析",
        "使用资料汇入模板从 CMDB 汇出上传资料"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "159": {
    "when": "解决方案架构师需要实施一个解决方案来减轻这些攻击 + 访问日志显示 + ALB 与 AWS WAF Web ACL 关联",
    "target": "还部署 AWS Shield 高级版 + AWS WAF",
    "avoid": "别选“使用 Amazon Route 53 地理位置路由策略来拒绝来自托管这些 IP 位址的国家的流量”。",
    "questionCues": [
      "解决方案架构师需要实施一个解决方案来减轻这些攻击",
      "访问日志显示",
      "ALB 与 AWS WAF Web ACL 关联"
    ],
    "answerCues": {
      "B": [
        "还部署 AWS Shield 高级版",
        "AWS WAF"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "160": {
    "when": "解决方案架构师必须建议一个解决方案 + 关键应用程式必须跨两个Regions部署应用程式层元件和资料层元件 + 使资料层符合公司政策",
    "target": "A：将另一个 Region 加入到 Aurora MySQL 资料库集群；D：将现有 DynamoDB 表转换为全域表",
    "avoid": "Aurora 扩展集群，不是给集群中的每个表加 Region；两种数据库都要跨区。",
    "questionCues": [
      "解决方案架构师必须建议一个解决方案",
      "关键应用程式必须跨两个Regions部署应用程式层元件和资料层元件",
      "使资料层符合公司政策"
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
    "when": "解决方案架构师必须开发一种解决方案 + TLS 终止于ALB + 本公司的客户端使用HTTPS从on-premises网路进行连线",
    "target": "将NLB与多个Availability Zones中的一个静态IP位址关联 + 为 NLB 建立 ALB 类型目标群组",
    "avoid": "别选“删除 ALB 将 NLB IP 位址新增至防火墙设备”。",
    "questionCues": [
      "解决方案架构师必须开发一种解决方案",
      "TLS 终止于ALB",
      "本公司的客户端使用HTTPS从on-premises网路进行连线"
    ],
    "answerCues": {
      "B": [
        "将NLB与多个Availability Zones中的一个静态IP位址关联",
        "为 NLB 建立 ALB 类型目标群组"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "162": {
    "when": "该公司需要一种解决方案来阻止网路流量直接存取ALB + 一家公司在一组Amazon EC2实例上运行一个应用程序 + CloudFront",
    "target": "以仅允许来自AWS托管前缀清单的流量CloudFront + 将安全群组规则新增至ALB",
    "avoid": "别选“以仅允许各种CloudFront IP 位址范围”；认准“以仅允许来自AWS托管前缀清单的流量CloudFront”。",
    "questionCues": [
      "该公司需要一种解决方案来阻止网路流量直接存取ALB",
      "一家公司在一组Amazon EC2实例上运行一个应用程序",
      "CloudFront"
    ],
    "answerCues": {
      "C": [
        "以仅允许来自AWS托管前缀清单的流量CloudFront",
        "将安全群组规则新增至ALB"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "163": {
    "when": "解决方案架构师必须进行更改以要求用户身份验证并确保公司使用端对端加密 + 该公司并未将ElastiCache配置为在传输过程中使用加密",
    "target": "使用 AUTH 建立新集群 + 将令牌作为加密参数储存在AWS系统管理器Parameter Store中",
    "avoid": "别选“更新应用程式以在必要时从 Secrets Manager 检索 AUTH 令牌”；认准“使用 AUTH 建立新集群”。",
    "questionCues": [
      "解决方案架构师必须进行更改以要求用户身份验证并确保公司使用端对端加密",
      "该公司并未将ElastiCache配置为在传输过程中使用加密"
    ],
    "answerCues": {
      "A": [
        "使用 AUTH 建立新集群",
        "将令牌作为加密参数储存在AWS系统管理器Parameter Store中"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "164": {
    "when": "公司需要提高工作负载的整体可靠性 + 监控系统报告了Auto Scaling实例启动失败 + Amazon EC2 Spot",
    "target": "配置 Auto Scaling 群组以使用新的启动范本版本 + 建立使用基于属性的实例类型选择的新启动范本版本",
    "avoid": "别选“以使用使用基于属性的实例类型选择的Auto Scaling组”；认准“配置 Auto Scaling 群组以使用新的启动范本版本”。",
    "questionCues": [
      "公司需要提高工作负载的整体可靠性",
      "监控系统报告了Auto Scaling实例启动失败",
      "Amazon EC2 Spot"
    ],
    "answerCues": {
      "B": [
        "配置 Auto Scaling 群组以使用新的启动范本版本",
        "建立使用基于属性的实例类型选择的新启动范本版本"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "165": {
    "when": "该公司发现无法立即更新产生大量文件的处理伺服器以支援S3 API + 这些文件必须在 30 分钟内可供公众下载 + 在迁移过程中",
    "target": "发起RefreshCache API呼叫以更新S3档案闸道 + 使用 NFS 将档案共用挂载到 Amazon EC2 实例上",
    "avoid": "别选“使用汇入和汇出策略为 Lustre 配置 Amazon FSx”；认准“发起RefreshCache API呼叫以更新S3档案闸道”。",
    "questionCues": [
      "该公司发现无法立即更新产生大量文件的处理伺服器以支援S3 API",
      "这些文件必须在 30 分钟内可供公众下载",
      "在迁移过程中"
    ],
    "answerCues": {
      "B": [
        "发起RefreshCache API呼叫以更新S3档案闸道",
        "使用 NFS 将档案共用挂载到 Amazon EC2 实例上"
      ]
    },
    "disputed": true,
    "legacyMismatch": true
  },
  "166": {
    "when": "公司需要能够根据请求删除用户资讯 + 其他所有微服务也必须立即删除其资料副本 + 该解决方案管理用户资料、送货资讯和过去的购买详细资讯",
    "target": "并呼叫微服务中的逻辑以从DynamoDB表中删除使用者 + 为每个微服务建立EventBridge规则以符合使用者删除事件模式",
    "avoid": "别选“在 DynamoDB 表上启动 DynamoDB 流”；认准“并呼叫微服务中的逻辑以从DynamoDB表中删除使用者”。",
    "questionCues": [
      "公司需要能够根据请求删除用户资讯",
      "其他所有微服务也必须立即删除其资料副本",
      "该解决方案管理用户资料、送货资讯和过去的购买详细资讯"
    ],
    "answerCues": {
      "C": [
        "并呼叫微服务中的逻辑以从DynamoDB表中删除使用者",
        "为每个微服务建立EventBridge规则以符合使用者删除事件模式"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "167": {
    "when": "公司必须向所有外部客户提供 IP 位址 + 外部客户需要连接到 Web 应用程式 + ALB正在使用AWSWAF",
    "target": "指定 ALB 作为加速器的端点 + 创建AWS Global Accelerator标准加速器",
    "avoid": "别选“为NLB分配弹性IP位址”；认准“指定 ALB 作为加速器的端点”。",
    "questionCues": [
      "公司必须向所有外部客户提供 IP 位址",
      "外部客户需要连接到 Web 应用程式",
      "ALB正在使用AWSWAF"
    ],
    "answerCues": {
      "C": [
        "指定 ALB 作为加速器的端点",
        "创建AWS Global Accelerator标准加速器"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "168": {
    "when": "并希望将其生产应用程式迁移到 AWS + 该公司需要一个包含内建蓝图和护栏的解决方案 + Amazon EBS",
    "target": "C：将生产和开发帐户添加到生产和开发OUs；D：创建SCP以确保合规性；F：为生产OU 建立护栏以侦测EBS 加密",
    "avoid": "别选“分别将生产和开发帐户添加到生产和开发OU”；认准“将生产和开发帐户添加到生产和开发OUs”。",
    "questionCues": [
      "并希望将其生产应用程式迁移到 AWS",
      "该公司需要一个包含内建蓝图和护栏的解决方案",
      "Amazon EBS"
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
    "when": "公司必须确保故障转移后的最佳延迟 + 此解决方案必须满足以下目标 + 解决方案架构师必须推荐一种解决方案来提高应用程式的弹性",
    "target": "配置 EC2 实例以使用 AWS Elastic Disaster Recovery + 并将该端点与ALB关联",
    "avoid": "别选“配置RDS自动备份”；认准“配置 EC2 实例以使用 AWS Elastic Disaster Recovery”。",
    "questionCues": [
      "公司必须确保故障转移后的最佳延迟",
      "此解决方案必须满足以下目标",
      "解决方案架构师必须推荐一种解决方案来提高应用程式的弹性"
    ],
    "answerCues": {
      "A": [
        "配置 EC2 实例以使用 AWS Elastic Disaster Recovery",
        "并将该端点与ALB关联"
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
    "when": "公司必须在第二个AWSRegion中储存储存库中资料的备份副本 + 一家公司使用 AWS CodeCommit 储存库",
    "target": "将档案复制到第二个 Region 中的 S3 储存桶 + AWS CodeBuild",
    "avoid": "别选“配置工作流程以将快照复制到第二个Region中的S3储存桶”；认准“将档案复制到第二个 Region 中的 S3 储存桶”。",
    "questionCues": [
      "公司必须在第二个AWSRegion中储存储存库中资料的备份副本",
      "一家公司使用 AWS CodeCommit 储存库"
    ],
    "answerCues": {
      "C": [
        "将档案复制到第二个 Region 中的 S3 储存桶",
        "AWS CodeBuild"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "172": {
    "when": "此解决方案必须仅使用私有 IP 位址 + 每个业务部门透过多个 VPC 管理自己的网络 + 并希望所有其他业务部门都可以存取该应用程式",
    "target": "在其他帐户中建立介面VPC端点以使用私有IP位址存取应用程式 + 创建 AWS PrivateLink 端点服务以共享行销应用程式",
    "avoid": "别选“并使用辅助范围中的私有NAT网关将流量路由至行销团队”；认准“在其他帐户中建立介面VPC端点以使用私有IP位址存取应用程式”。",
    "questionCues": [
      "此解决方案必须仅使用私有 IP 位址",
      "每个业务部门透过多个 VPC 管理自己的网络",
      "并希望所有其他业务部门都可以存取该应用程式"
    ],
    "answerCues": {
      "C": [
        "在其他帐户中建立介面VPC端点以使用私有IP位址存取应用程式",
        "创建 AWS PrivateLink 端点服务以共享行销应用程式"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "173": {
    "when": "公司的资料安全团队才需要通知 + 某公司需要对新取得的AWS帐户进行安全态势审计 + 并订阅了资料安全团队的电子邮件地址",
    "target": "在AWS Identity and Access ManagementAccess Analyzer中建立分析器",
    "avoid": "别选“启动 AWS Config 并新增 cloudtrail-s3-dataevents-enabled 规则”。",
    "questionCues": [
      "公司的资料安全团队才需要通知",
      "某公司需要对新取得的AWS帐户进行安全态势审计",
      "并订阅了资料安全团队的电子邮件地址"
    ],
    "answerCues": {
      "B": [
        "在AWS Identity and Access ManagementAccess Analyzer中建立分析器"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "174": {
    "when": "解决方案架构师必须建立一个业务案例以将产品组合迁移到AWS + 解决方案架构师必须更了解产品组合 + 在开始迁移到AWS之前",
    "target": "使用 AWS 迁移中心查看产品组合 + 使用AWS应用程式发现服务来了解应用程式依赖性",
    "avoid": "别选“使用 AWS Service Catalog 了解应用程式和资料库依赖性”；认准“使用 AWS 迁移中心查看产品组合”。",
    "questionCues": [
      "解决方案架构师必须建立一个业务案例以将产品组合迁移到AWS",
      "解决方案架构师必须更了解产品组合",
      "在开始迁移到AWS之前"
    ],
    "answerCues": {
      "C": [
        "使用 AWS 迁移中心查看产品组合",
        "使用AWS应用程式发现服务来了解应用程式依赖性"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "175": {
    "when": "并保留备份1年 + 公司需要对文件进行备份 + 这些文件必须可以在该应用程式的所有正在运行的实例中存取",
    "target": "Amazon EFS + Amazon Elastic File System",
    "avoid": "别选“使用第三方工具备份EKS集群1年”；认准“Amazon EFS”。",
    "questionCues": [
      "并保留备份1年",
      "公司需要对文件进行备份",
      "这些文件必须可以在该应用程式的所有正在运行的实例中存取"
    ],
    "answerCues": {
      "A": [
        "Amazon EFS",
        "Amazon Elastic File System"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "176": {
    "when": "该公司希望将系统迁移到AWS以提高可靠性 + 该公司正在经历系统停机 + 该公司使用的硬体陈旧",
    "target": "使用 Amazon Pinpoint 向客户发送简讯调查 + 使用Amazon Connect 取代旧的呼叫中心硬体",
    "avoid": "别选“使用Amazon简单通知服务（Amazon SNS）向客户发送简讯调查”。",
    "questionCues": [
      "该公司希望将系统迁移到AWS以提高可靠性",
      "该公司正在经历系统停机",
      "该公司使用的硬体陈旧"
    ],
    "answerCues": {
      "A": [
        "使用 Amazon Pinpoint 向客户发送简讯调查",
        "使用Amazon Connect 取代旧的呼叫中心硬体"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "177": {
    "when": "一家公司正在使用 Amazon Connect 建置呼叫中心 + 该联络中心拥有数十个联络流程、数百个使用者和数十个已认领的电话号码",
    "target": "建立一个 AWS Lambda 函数来部署 AWS CloudFormation 模板 + 在第二个 Region 中设定一个新的 Amazon Connect 实例与所有现有使用者和联系流",
    "avoid": "别选“建立 AWS Lambda 函数来部署配置所有使用者的 AWS CloudFormation 范本”。",
    "questionCues": [
      "一家公司正在使用 Amazon Connect 建置呼叫中心",
      "该联络中心拥有数十个联络流程、数百个使用者和数十个已认领的电话号码"
    ],
    "answerCues": {
      "D": [
        "建立一个 AWS Lambda 函数来部署 AWS CloudFormation 模板",
        "在第二个 Region 中设定一个新的 Amazon Connect 实例与所有现有使用者和联系流"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "178": {
    "when": "客户还需要存取最新的数据 + 该公司希望在共享数据之前确认客户的身份 + 数据客户的管理变得困难",
    "target": "AWS Data Exchange datashare + 透过将 AWS Data Exchange 连接到 Redshift 集群来",
    "avoid": "别选“使用AWS资料交换S3与客户共享资料”；认准“AWS Data Exchange datashare”。",
    "questionCues": [
      "客户还需要存取最新的数据",
      "该公司希望在共享数据之前确认客户的身份",
      "数据客户的管理变得困难"
    ],
    "answerCues": {
      "B": [
        "AWS Data Exchange datashare",
        "透过将 AWS Data Exchange 连接到 Redshift 集群来"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "179": {
    "when": "解决方案必须能够根据解决方案接收的事件数量进行扩展和扩展 + 则该事件必须移至单独的伫列中以供审核 + 如果发生处理错误",
    "target": "建立一个 Amazon EC2 Auto Scaling 群组 + 将事件发布到 Amazon Simple Queue Service (Amazon SQS) 伫列",
    "avoid": "别选“将 AWS Lambda 函数配置为 SNS 主题的订阅者来处理事件”。",
    "questionCues": [
      "解决方案必须能够根据解决方案接收的事件数量进行扩展和扩展",
      "则该事件必须移至单独的伫列中以供审核",
      "如果发生处理错误"
    ],
    "answerCues": {
      "B": [
        "建立一个 Amazon EC2 Auto Scaling 群组",
        "将事件发布到 Amazon Simple Queue Service (Amazon SQS) 伫列"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "180": {
    "when": "公司必须实施一个解决方案来处理设备发送到处理引擎的所有资料 + API 会经历不可预测的流量突发 + 某公司在AWS云端中运行处理引擎",
    "target": "建立AWS Lambda函数来处理SQS伫列中的消息 + Amazon API Gateway HTTP API",
    "avoid": "别选“Fargate”；认准“建立AWS Lambda函数来处理SQS伫列中的消息”。",
    "questionCues": [
      "公司必须实施一个解决方案来处理设备发送到处理引擎的所有资料",
      "API 会经历不可预测的流量突发",
      "某公司在AWS云端中运行处理引擎"
    ],
    "answerCues": {
      "B": [
        "建立AWS Lambda函数来处理SQS伫列中的消息",
        "Amazon API Gateway HTTP API"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "181": {
    "when": "但不能与其他OU中的VPC通信 + 该公司使用 AWS Organizations ​​来管理多帐户设定 + 公司需要实现一个解决方案",
    "target": "在每个OU的帐户中配置一个中转网关（transit gateway） + 使用 AWS Resource Access Manager (AWS RAM) 在整个组织内共用中转网关",
    "avoid": "别选“在每个OU中”；认准“在每个OU的帐户中配置一个中转网关（transit gateway）”。",
    "questionCues": [
      "但不能与其他OU中的VPC通信",
      "该公司使用 AWS Organizations ​​来管理多帐户设定",
      "公司需要实现一个解决方案"
    ],
    "answerCues": {
      "C": [
        "在每个OU的帐户中配置一个中转网关（transit gateway）",
        "使用 AWS Resource Access Manager (AWS RAM) 在整个组织内共用中转网关"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "182": {
    "when": "它希望在迁移过程中尽可能多地使用完全托管的服务 + 该公司需要在应用程式中储存大型重要文档 + 一家公司正在将应用程式迁移到AWS",
    "target": "将 Amazon S3 与储存桶策略结合使用 + 并使用 AWS KMS 进行物件加密",
    "avoid": "别选“使用 Amazon EBS 磁碟区加密”；认准“将 Amazon S3 与储存桶策略结合使用”。",
    "questionCues": [
      "它希望在迁移过程中尽可能多地使用完全托管的服务",
      "该公司需要在应用程式中储存大型重要文档",
      "一家公司正在将应用程式迁移到AWS"
    ],
    "answerCues": {
      "B": [
        "将 Amazon S3 与储存桶策略结合使用",
        "并使用 AWS KMS 进行物件加密"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "183": {
    "when": "并且必须最大限度地提高营运效率 + 且 API 服务已扩展至最大数量 + 此解决方案必须允许合法流量通过",
    "target": "设定 Web ACL 以允许与这些规则不符的所有其他流量 + 将 Web ACL 附加到 ECS 任务前面的 ALB",
    "avoid": "别选“以监控转送至 ECS 任务前面的 ALB 的 HTTP 请求和 HTTPS 请求”。",
    "questionCues": [
      "并且必须最大限度地提高营运效率",
      "且 API 服务已扩展至最大数量",
      "此解决方案必须允许合法流量通过"
    ],
    "answerCues": {
      "C": [
        "设定 Web ACL 以允许与这些规则不符的所有其他流量",
        "将 Web ACL 附加到 ECS 任务前面的 ALB"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "184": {
    "when": "公司必须具备在两个AWSRegions中摄取和储存资料的能力 + 公司将资料储存在Amazon DynamoDB中 + 为了业务连续性",
    "target": "建立评估域配置运作状况的Amazon Route 53运转状况检查 + 使用 AWS IoT Core 网域配置中的网域名称值建立故障转移路由策略",
    "avoid": "别选“创建Amazon Route 53基于延迟的路由策略”；认准“建立评估域配置运作状况的Amazon Route 53运转状况检查”。",
    "questionCues": [
      "公司必须具备在两个AWSRegions中摄取和储存资料的能力",
      "公司将资料储存在Amazon DynamoDB中",
      "为了业务连续性"
    ],
    "answerCues": {
      "C": [
        "建立评估域配置运作状况的Amazon Route 53运转状况检查",
        "使用 AWS IoT Core 网域配置中的网域名称值建立故障转移路由策略"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "185": {
    "when": "解决方案架构师应该如何为行销团队提供 DynamoDB 表的适当存取权限 + 行销团队只能存取DynamoDB表中资料的特定属性",
    "target": "透过使用特定 DynamoDB 属性的 IAM 策略条件（细微存取控制） + 在财务团队的帐户中建立 IAM 角色",
    "avoid": "别选“将策略附加到 DynamoDB 表”；认准“透过使用特定 DynamoDB 属性的 IAM 策略条件（细微存取控制）”。",
    "questionCues": [
      "解决方案架构师应该如何为行销团队提供 DynamoDB 表的适当存取权限",
      "行销团队只能存取DynamoDB表中资料的特定属性"
    ],
    "answerCues": {
      "B": [
        "透过使用特定 DynamoDB 属性的 IAM 策略条件（细微存取控制）",
        "在财务团队的帐户中建立 IAM 角色"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "186": {
    "when": "两个S3桶中的物件必须保持彼此同步 + 解决方案架构师必须在两个同时使用的AWS Regions 中部署应用程式 + Amazon S3",
    "target": "A：建立 S3 Multi-Region 接入点 变更应用程式以引用 Multi-Region 接入点；B：在两个S3存储桶之间配置双向S3交叉Region复制（CRR）；E：为每个S3存储桶启用S3版本控制",
    "avoid": "别选“修改应用程式以在每个S3储存桶中储存对象”。",
    "questionCues": [
      "两个S3桶中的物件必须保持彼此同步",
      "解决方案架构师必须在两个同时使用的AWS Regions 中部署应用程式",
      "Amazon S3"
    ],
    "answerCues": {
      "A": [
        "建立 S3 Multi-Region 接入点 变更应用程式以引用 Multi-Region 接入点"
      ],
      "B": [
        "在两个S3存储桶之间配置双向S3交叉Region复制（CRR）"
      ],
      "E": [
        "为每个S3存储桶启用S3版本控制"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "187": {
    "when": "定期作业需要 120-600 秒才能运作 + 并且必须减少堆叠的营运开销 + 该公司正在将平台迁移到AWS",
    "target": "B：AWS IoT Core；D：将元资料写入AmazonDocumentDB（相容于MongoDB）；E：使用 Amazon CloudFront 和 S3 来源来提供报告",
    "avoid": "别选“使用AWS Lambda功能连接物联网设备”；认准“AWS IoT Core”。",
    "questionCues": [
      "定期作业需要 120-600 秒才能运作",
      "并且必须减少堆叠的营运开销",
      "该公司正在将平台迁移到AWS"
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
    "when": "由于资料监管要求或对个位数毫秒延迟的要求 + 开发人员必须能够使用他们熟悉的相同工具、API 和服务 + 该公司希望获得一致的开发人员体验",
    "target": "安装AWS Outposts + 使用 AWS Snowball 边缘运算最佳化设备来托管工厂站点中的工作负载",
    "avoid": "别选“部署Direct Connect网关”；认准“安装AWS Outposts”。",
    "questionCues": [
      "由于资料监管要求或对个位数毫秒延迟的要求",
      "开发人员必须能够使用他们熟悉的相同工具、API 和服务",
      "该公司希望获得一致的开发人员体验"
    ],
    "answerCues": {
      "C": [
        "安装AWS Outposts",
        "使用 AWS Snowball 边缘运算最佳化设备来托管工厂站点中的工作负载"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "189": {
    "when": "并在持续攻击期间将服务中断降至最低 + 公司必须防止攻击并确保业务连续性 + 公司将使用Amazon DynamoDB来储存应用程式资料",
    "target": "A：配置 ALB 以在标头和值匹配的情况下有条件地转送流量；E：部署包含适当规则群组的 AWS WAF Web ACL",
    "avoid": "别选“配置 Amazon Route 53 以相同的权重路由到两个 Regions”。",
    "questionCues": [
      "并在持续攻击期间将服务中断降至最低",
      "公司必须防止攻击并确保业务连续性",
      "公司将使用Amazon DynamoDB来储存应用程式资料"
    ],
    "answerCues": {
      "A": [
        "配置 ALB 以在标头和值匹配的情况下有条件地转送流量"
      ],
      "E": [
        "部署包含适当规则群组的 AWS WAF Web ACL"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "190": {
    "when": "该公司希望在发生这些错误时显示自订错误讯息页面 + 一些用户报告在高峰时段尝试访问网站时偶尔会出现问题 + ALB",
    "target": "更新 S3 静态网站以合并自订错误页面 + 设定一个配置为托管静态网站的 S3 储存桶 为 CloudFront 分发设定来源故障转移",
    "avoid": "别选“将自订错误页面上传到S3储存桶作为故障转移”；认准“更新 S3 静态网站以合并自订错误页面”。",
    "questionCues": [
      "该公司希望在发生这些错误时显示自订错误讯息页面",
      "一些用户报告在高峰时段尝试访问网站时偶尔会出现问题",
      "ALB"
    ],
    "answerCues": {
      "C": [
        "更新 S3 静态网站以合并自订错误页面",
        "设定一个配置为托管静态网站的 S3 储存桶 为 CloudFront 分发设定来源故障转移"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "191": {
    "when": "解决方案架构师必须设计一个安全且可扩展的容器化解决方案 + 该解决方案不需要配置或管理底层基础架构 + 一家公司正计划将应用程式迁移到AWS",
    "target": "参考ECS任务定义中的EFS档案系统ID、容器挂载点和EFS授权IAM角色 + 使用Amazon Elastic File System (Amazon EFS)进行共享储存",
    "avoid": "别选“并启用 Amazon EC2 启动类型并启用自动缩放”。",
    "questionCues": [
      "解决方案架构师必须设计一个安全且可扩展的容器化解决方案",
      "该解决方案不需要配置或管理底层基础架构",
      "一家公司正计划将应用程式迁移到AWS"
    ],
    "answerCues": {
      "A": [
        "参考ECS任务定义中的EFS档案系统ID、容器挂载点和EFS授权IAM角色",
        "使用Amazon Elastic File System (Amazon EFS)进行共享储存"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "192": {
    "when": "客户在测试视窗期间必须使用相同版本的业务逻辑 + Amazon Route 53 记录 api.example.com 指向ALB",
    "target": "将新逻辑部署到此新目标群组中的 EC2 实例 + 配置ALB目标组黏性",
    "avoid": "别选“配置 ALB 将流量分配到 EC2 实例”；认准“将新逻辑部署到此新目标群组中的 EC2 实例”。",
    "questionCues": [
      "客户在测试视窗期间必须使用相同版本的业务逻辑",
      "Amazon Route 53 记录 api.example.com 指向ALB"
    ],
    "answerCues": {
      "B": [
        "将新逻辑部署到此新目标群组中的 EC2 实例",
        "配置ALB目标组黏性"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "193": {
    "when": "解决方案架构师必须在定义的维护时段内提高档案系统的效能 + 并连接到自我管理的Active Directory + 档案系统配置了DNS别名",
    "target": "将吞吐能力更新为32MBps + 将储存类型更新为SSD",
    "avoid": "别选“将 AWS DataSync 代理部署到新的 Amazon EC2 实例上”；认准“将吞吐能力更新为32MBps”。",
    "questionCues": [
      "解决方案架构师必须在定义的维护时段内提高档案系统的效能",
      "并连接到自我管理的Active Directory",
      "档案系统配置了DNS别名"
    ],
    "answerCues": {
      "B": [
        "将吞吐能力更新为32MBps",
        "将储存类型更新为SSD"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "194": {
    "when": "公司必须修改应用程式才能将应用程式部署在两个AWSRegions中 + 应用程式读取和写入储存在单一Amazon S3储存桶中的物件",
    "target": "配置使用两个 S3 储存桶的 S3 多Region 接入点 + 在原始 S3 储存桶和新 S3 储存桶之间设定双向 S3 交叉Region 复制 (CRR)",
    "avoid": "别选“使用AWS Global Accelerator存取S3桶中的资料”。",
    "questionCues": [
      "公司必须修改应用程式才能将应用程式部署在两个AWSRegions中",
      "应用程式读取和写入储存在单一Amazon S3储存桶中的物件"
    ],
    "answerCues": {
      "B": [
        "配置使用两个 S3 储存桶的 S3 多Region 接入点",
        "在原始 S3 储存桶和新 S3 储存桶之间设定双向 S3 交叉Region 复制 (CRR)"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "195": {
    "when": "该公司需要一个优化应用程式效能的迁移策略 + 该公司的游戏应用程式需要高效能运算（HPC）处理 + 并且排行榜经常变化",
    "target": "使用 Amazon ElastiCache 对应 Redis 集群来维护排行榜 + 建立一个由 c5.large Amazon EC2 按需实例组成的 Auto Scaling 群组",
    "avoid": "别选“使用Amazon DynamoDB表来维护排行榜”。",
    "questionCues": [
      "该公司需要一个优化应用程式效能的迁移策略",
      "该公司的游戏应用程式需要高效能运算（HPC）处理",
      "并且排行榜经常变化"
    ],
    "answerCues": {
      "C": [
        "使用 Amazon ElastiCache 对应 Redis 集群来维护排行榜",
        "建立一个由 c5.large Amazon EC2 按需实例组成的 Auto Scaling 群组"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "196": {
    "when": "基础架构必须具有高可用性并可扩展 + 资料的储存格式必须允许薪资管理员执行月度报告 + 同时最大限度地减少营运开销",
    "target": "B：使用预定服务 Auto Scaling 在周五大量提交之前增加容量；E：将时间表提交资料储存在Amazon S3中",
    "avoid": "别选“将应用程式前端部署到由 Amazon CloudFront 提供服务的 Amazon S3 储存桶”。",
    "questionCues": [
      "基础架构必须具有高可用性并可扩展",
      "资料的储存格式必须允许薪资管理员执行月度报告",
      "同时最大限度地减少营运开销"
    ],
    "answerCues": {
      "B": [
        "使用预定服务 Auto Scaling 在周五大量提交之前增加容量"
      ],
      "E": [
        "将时间表提交资料储存在Amazon S3中"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "197": {
    "when": "并且必须将日志保留 5 年 + 公司的安全团队也必须收到电子邮件通知 + 公司必须记录S3储存桶中物件的所有活动",
    "target": "A：配置 AWS CloudTrail 以记录 S3 资料事件；D：Amazon SNS；F：设定新的 S3 储存桶来储存具有 S3 生命周期策略的日志",
    "avoid": "别选“为S3储存桶配置S3伺服器存取日志记录”；认准“配置 AWS CloudTrail 以记录 S3 资料事件”。",
    "questionCues": [
      "并且必须将日志保留 5 年",
      "公司的安全团队也必须收到电子邮件通知",
      "公司必须记录S3储存桶中物件的所有活动"
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
    "when": "该公司需要on-premises资料中心中的伺服器能够存取所有三个VPC中的EC2实例 + 本地资料中心的伺服器也必须能够存取AWS公共服务",
    "target": "A：使用Direct Connect网关连接另外两个Regions中的VPC；D：创建公共 VIF",
    "avoid": "别选“透过专用 VIF 与其他两个 Regions 中的 VPC 建立AWS Site-to-Site VPN 连接”。",
    "questionCues": [
      "该公司需要on-premises资料中心中的伺服器能够存取所有三个VPC中的EC2实例",
      "本地资料中心的伺服器也必须能够存取AWS公共服务"
    ],
    "answerCues": {
      "A": [
        "使用Direct Connect网关连接另外两个Regions中的VPC"
      ],
      "D": [
        "创建公共 VIF"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "199": {
    "when": "一家公司正在使用 AWS Organizations 来管理数百个 AWS 帐户 + AWS WAF + Amazon CloudFront",
    "target": "A：在所有帐户中启用 AWS Config；C：启用组织的所有功能；D：AWS Firewall Manager",
    "avoid": "别选“使用 AWS Shield 高级在所有 CloudFront 发行版的所有帐户中部署 AWS WAF 规则”。",
    "questionCues": [
      "一家公司正在使用 AWS Organizations 来管理数百个 AWS 帐户",
      "AWS WAF",
      "Amazon CloudFront"
    ],
    "answerCues": {
      "A": [
        "在所有帐户中启用 AWS Config"
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
    "when": "他们无法存取 AWS 环境 + 解决方案架构师应检查哪些项目以确保身分联合配置正确 + 将授予 AWS 环境的存取权限",
    "target": "B：建立的 IAM 角色已将 SAML 提供者；C：测试使用者不属于公司 IdP 中的 AWSFederatedUsers 群组；E：on-premises IdP 的 DNS 主机名称可从 AWS 环境 VPC 存取",
    "avoid": "别选“IAM 使用者的权限策略允许该使用者使用 SAML 联合”；认准“建立的 IAM 角色已将 SAML 提供者”。",
    "questionCues": [
      "他们无法存取 AWS 环境",
      "解决方案架构师应检查哪些项目以确保身分联合配置正确",
      "将授予 AWS 环境的存取权限"
    ],
    "answerCues": {
      "B": [
        "建立的 IAM 角色已将 SAML 提供者"
      ],
      "C": [
        "测试使用者不属于公司 IdP 中的 AWSFederatedUsers 群组"
      ],
      "E": [
        "on-premises IdP 的 DNS 主机名称可从 AWS 环境 VPC 存取"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "201": {
    "when": "并且必须提供定期自动轮调凭证的能力 + 此解决方案必须保证凭证的安全 + 解决方案架构师需要实作一个解决方案",
    "target": "部署 Amazon RDS 代理层 + 将连接凭证作为秘密储存在 AWS Secrets Manager 中",
    "avoid": "别选“在资料库实例前面部署 Amazon RDS 代理层”；认准“部署 Amazon RDS 代理层”。",
    "questionCues": [
      "并且必须提供定期自动轮调凭证的能力",
      "此解决方案必须保证凭证的安全",
      "解决方案架构师需要实作一个解决方案"
    ],
    "answerCues": {
      "A": [
        "部署 Amazon RDS 代理层",
        "将连接凭证作为秘密储存在 AWS Secrets Manager 中"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "202": {
    "when": "Web 应用程式必须故障转移到辅助环境 + 一家公司需要为其电子商务网站建立灾难复原 (DR) 解决方案 + RTO 为 10 分钟",
    "target": "以 DR Region 中的最小容量运行 EC2 实例 + 增加Auto Scaling组所需的容量",
    "avoid": "别选“在 DR Region 中以满载运行 Auto Scaling 组 EC2 实例”。",
    "questionCues": [
      "Web 应用程式必须故障转移到辅助环境",
      "一家公司需要为其电子商务网站建立灾难复原 (DR) 解决方案",
      "RTO 为 10 分钟"
    ],
    "answerCues": {
      "B": [
        "以 DR Region 中的最小容量运行 EC2 实例",
        "增加Auto Scaling组所需的容量"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "203": {
    "when": "该公司需要一个能够更快迁移资料库的迁移解决方案 + 迁移到 us-east-1 Region 中的 Amazon Aurora MySQL",
    "target": "使用S3介面将资料载入到Amazon S3桶中 + 使用 AWS Database Migration Service（AWS DMS）将Amazon S3的资料",
    "avoid": "别选“使用AWS应用迁移服务将Amazon S3的资料迁移到AuroraMySQL”。",
    "questionCues": [
      "该公司需要一个能够更快迁移资料库的迁移解决方案",
      "迁移到 us-east-1 Region 中的 Amazon Aurora MySQL"
    ],
    "answerCues": {
      "C": [
        "使用S3介面将资料载入到Amazon S3桶中",
        "使用 AWS Database Migration Service（AWS DMS）将Amazon S3的资料"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "204": {
    "when": "公司必须能够在 1 个工作天内恢复EC2 实例及其配置 + 需要一个能够优化营运效率和成本的备份解决方案 + 且遗失的资料不超过 1 天",
    "target": "使用 AWS Backup 为 EC2 实例建立计划的每日备份计划 + 从备份保管库还原执行个体磁碟区和配置",
    "avoid": "别选“使用 AWS Systems Manager 自动化运作手册运行每日多磁碟区快照”。",
    "questionCues": [
      "公司必须能够在 1 个工作天内恢复EC2 实例及其配置",
      "需要一个能够优化营运效率和成本的备份解决方案",
      "且遗失的资料不超过 1 天"
    ],
    "answerCues": {
      "C": [
        "使用 AWS Backup 为 EC2 实例建立计划的每日备份计划",
        "从备份保管库还原执行个体磁碟区和配置"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "205": {
    "when": "所有资料在传输和静态时都必须加密 + 根据公司要求 + 该网站将使用户能够上传和下载大型档案",
    "target": "A：为 Web 应用程式使用的 S3 储存桶开启 S3 伺服器端加密；C：拒绝 Web 应用程式使用的 S3 储存桶中的任何未加密操作；E：配置HTTP请求重定向到CloudFront中的HTTPS请求",
    "avoid": "别选“在为 Web 应用程式使用的 S3 储存桶建立预签章 URL 时”。",
    "questionCues": [
      "所有资料在传输和静态时都必须加密",
      "根据公司要求",
      "该网站将使用户能够上传和下载大型档案"
    ],
    "answerCues": {
      "A": [
        "为 Web 应用程式使用的 S3 储存桶开启 S3 伺服器端加密"
      ],
      "C": [
        "拒绝 Web 应用程式使用的 S3 储存桶中的任何未加密操作"
      ],
      "E": [
        "配置HTTP请求重定向到CloudFront中的HTTPS请求"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "206": {
    "when": "生产资料库的凭证必须使用只有 IT 安全团队的 IAM 使用者群组成员才能存取的金钥进行加密 + 该密钥必须定期轮换",
    "target": "将角色附加到每个 Lambda 函数以提供对金钥的存取 + 作为与 AWS Key Management Service (AWS KMS) 客户管理金钥关联的机密",
    "avoid": "别选“将角色附加到每个 Lambda 函数以提供对 SecureString 参数的存取”。",
    "questionCues": [
      "生产资料库的凭证必须使用只有 IT 安全团队的 IAM 使用者群组成员才能存取的金钥进行加密",
      "该密钥必须定期轮换"
    ],
    "answerCues": {
      "D": [
        "将角色附加到每个 Lambda 函数以提供对金钥的存取",
        "作为与 AWS Key Management Service (AWS KMS) 客户管理金钥关联的机密"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "207": {
    "when": "解决方案架构师需要实施一个解决方案来解决扩展问题并在应用程式扩展时最大限度地降低许可成本 + 该公司希望尽可能使用 AWS 托管服务",
    "target": "部署 Amazon EC2 实例 + Amazon Aurora PostgreSQL",
    "avoid": "别选“部署基于 on-premises 导入的 Amazon EC2 实例”；认准“部署 Amazon EC2 实例”。",
    "questionCues": [
      "解决方案架构师需要实施一个解决方案来解决扩展问题并在应用程式扩展时最大限度地降低许可成本",
      "该公司希望尽可能使用 AWS 托管服务"
    ],
    "answerCues": {
      "A": [
        "部署 Amazon EC2 实例",
        "Amazon Aurora PostgreSQL"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "208": {
    "when": "解决方案架构师需要透过最小化营运开销的解决方案来解决此问题 + ALB + Amazon EKS",
    "target": "AWS Global Accelerator + 配置ALB作为原点",
    "avoid": "别选“将ALB配置为目标”；认准“AWS Global Accelerator”。",
    "questionCues": [
      "解决方案架构师需要透过最小化营运开销的解决方案来解决此问题",
      "ALB",
      "Amazon EKS"
    ],
    "answerCues": {
      "C": [
        "AWS Global Accelerator",
        "配置ALB作为原点"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "209": {
    "when": "公司必须提高解决方案的可靠性 + 该公司使用 Amazon Route 53 作为其 DNS 服务 + Amazon EC2",
    "target": "更新 Route 53 中的 DNS 记录以指向 AWS IoT Core Data-ATS 端点 + 配置AWS IoT 规则来储存资料",
    "avoid": "别选“更新 Route 53 中的 DNS 记录以指向 AWS IoT Greengrass 端点”。",
    "questionCues": [
      "公司必须提高解决方案的可靠性",
      "该公司使用 Amazon Route 53 作为其 DNS 服务",
      "Amazon EC2"
    ],
    "answerCues": {
      "B": [
        "更新 Route 53 中的 DNS 记录以指向 AWS IoT Core Data-ATS 端点",
        "配置AWS IoT 规则来储存资料"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "210": {
    "when": "并将金钥保存在安全加密的地方 + 该政策将根据请求自动轮换所有 EC2 金钥对 + 每台机器都需要唯一的EC2金钥对",
    "target": "更新Secrets Manager中的私钥 + AWS Secrets Manager",
    "avoid": "别选“将EC2金钥对导入AWS Key Management Service（AWSKMS）”。",
    "questionCues": [
      "并将金钥保存在安全加密的地方",
      "该政策将根据请求自动轮换所有 EC2 金钥对",
      "每台机器都需要唯一的EC2金钥对"
    ],
    "answerCues": {
      "A": [
        "更新Secrets Manager中的私钥",
        "AWS Secrets Manager"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "211": {
    "when": "以便公司能够规划经济高效的迁移 + 解决方案架构师必须为公司提供准确的清单 + 该公司没有配置管理资料库",
    "target": "在迁移评估器中查看收集的资料 + 从迁移清单中删除不活动的伺服器",
    "avoid": "别选“使用AWS Systems Manager Patch Manager 将迁移评估器部署到每个虚拟机器”。",
    "questionCues": [
      "以便公司能够规划经济高效的迁移",
      "解决方案架构师必须为公司提供准确的清单",
      "该公司没有配置管理资料库"
    ],
    "answerCues": {
      "C": [
        "在迁移评估器中查看收集的资料",
        "从迁移清单中删除不活动的伺服器"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "212": {
    "when": "该公司希望保护资料库免于崩溃 + 资料库崩溃并导致应用程式停机 + 当Lambda函数呼叫次数过多时",
    "target": "对 Lambda 函数设定保留并发限制 + 配置 Lambda 函数以从伫列读取资料并将其写入现有资料库",
    "avoid": "别选“重新配置 Lambda 函数以写入Aurora”；认准“对 Lambda 函数设定保留并发限制”。",
    "questionCues": [
      "该公司希望保护资料库免于崩溃",
      "资料库崩溃并导致应用程式停机",
      "当Lambda函数呼叫次数过多时"
    ],
    "answerCues": {
      "A": [
        "对 Lambda 函数设定保留并发限制",
        "配置 Lambda 函数以从伫列读取资料并将其写入现有资料库"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "213": {
    "when": "并且停机时间不能超过 10 分钟 + 公司需要最大限度地减少持续维护 + 仪表板需要具有高可用性",
    "target": "配置新的 Amazon CloudWatch 资料来源 + 从现有 Grafana 实例导出仪表板",
    "avoid": "别选“迁移到 Amazon CloudWatch 仪表板”；认准“配置新的 Amazon CloudWatch 资料来源”。",
    "questionCues": [
      "并且停机时间不能超过 10 分钟",
      "公司需要最大限度地减少持续维护",
      "仪表板需要具有高可用性"
    ],
    "answerCues": {
      "B": [
        "配置新的 Amazon CloudWatch 资料来源",
        "从现有 Grafana 实例导出仪表板"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "214": {
    "when": "根据新的安全要求 + 一家公司需要将其客户交易资料库从本地迁移到AWS + 该公司必须每年轮换资料库密码",
    "target": "将资料库迁移到 Oracle 的Amazon RDS + Store the password in AWS Secrets Manager.开启自动旋转",
    "avoid": "别选“将资料库迁移到Amazon EC2实例”；认准“将资料库迁移到 Oracle 的Amazon RDS”。",
    "questionCues": [
      "根据新的安全要求",
      "一家公司需要将其客户交易资料库从本地迁移到AWS",
      "该公司必须每年轮换资料库密码"
    ],
    "answerCues": {
      "B": [
        "将资料库迁移到 Oracle 的Amazon RDS",
        "Store the password in AWS Secrets Manager.开启自动旋转"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "215": {
    "when": "公司需要一个连接到 on-premises 网路的 VPC + 该公司预计进出on-premises网路的总流量将低于 50 Mbps",
    "target": "B：使用 AWS Resource Access Manager 共用子网路；D：使用 AWS Site-to-Site VPN 连接到 on-premises 网路",
    "avoid": "别选“使用 AWS Resource Access Manager 共用中转网关”。",
    "questionCues": [
      "公司需要一个连接到 on-premises 网路的 VPC",
      "该公司预计进出on-premises网路的总流量将低于 50 Mbps"
    ],
    "answerCues": {
      "B": [
        "使用 AWS Resource Access Manager 共用子网路"
      ],
      "D": [
        "使用 AWS Site-to-Site VPN 连接到 on-premises 网路"
      ]
    },
    "disputed": false,
    "legacyMismatch": true
  },
  "216": {
    "when": "公司需要能够对组织中所有 AWS 帐户的所有互联网出站流量添加集中管理的基于规则的过滤 + 设定网路安全 + NAT",
    "target": "Configure a new NAT gateway.使用AWS网路防火墙进行基于规则的过滤 + 修改所有预设路由以指向网路防火墙端点",
    "avoid": "别选“配置新的NAT网关”；认准“Configure a new NAT gateway.使用AWS网路防火墙进行基于规则的过滤”。",
    "questionCues": [
      "公司需要能够对组织中所有 AWS 帐户的所有互联网出站流量添加集中管理的基于规则的过滤",
      "设定网路安全",
      "NAT"
    ],
    "answerCues": {
      "B": [
        "Configure a new NAT gateway.使用AWS网路防火墙进行基于规则的过滤",
        "修改所有预设路由以指向网路防火墙端点"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "217": {
    "when": "必须针对常见漏洞攻击过滤入站请求",
    "target": "使用应用程式的 AMI 配置 Multi-AZ Auto Scaling 群组 + 创建Web ACL",
    "avoid": "别选“使用AmazonInspector监控ALB和EC2实例的流量”。",
    "questionCues": [
      "必须针对常见漏洞攻击过滤入站请求"
    ],
    "answerCues": {
      "D": [
        "使用应用程式的 AMI 配置 Multi-AZ Auto Scaling 群组",
        "创建Web ACL"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "218": {
    "when": "该公司不希望可以从公共互联网访问 API + 一些在 EC2 实例上运行的旧微服务需要调用这个新 API + 也不希望专有数据遍历公共互联网",
    "target": "为API网关建立介面VPC端点 + 仅允许来自 VPC 终端节点的存取",
    "avoid": "别选“更新指派给 EC2 执行个体的 IAM 角色的 IAM 策略以允许存取 API Gateway”。",
    "questionCues": [
      "该公司不希望可以从公共互联网访问 API",
      "一些在 EC2 实例上运行的旧微服务需要调用这个新 API",
      "也不希望专有数据遍历公共互联网"
    ],
    "answerCues": {
      "B": [
        "为API网关建立介面VPC端点",
        "仅允许来自 VPC 终端节点的存取"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "219": {
    "when": "EC2",
    "target": "在 EC2 安全群组上启用 AWS Config 以追踪任何不合规的变更 + 透过 Amazon 简单通知服务 (Amazon SNS) 主题将变更作为警报发送",
    "avoid": "别选“启用 AWS CloudTrail 以撷取对 EC2 安全性群组的变更”。",
    "questionCues": [
      "EC2"
    ],
    "answerCues": {
      "D": [
        "在 EC2 安全群组上启用 AWS Config 以追踪任何不合规的变更",
        "透过 Amazon 简单通知服务 (Amazon SNS) 主题将变更作为警报发送"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "220": {
    "when": "该公司希望从感测器读取和收集数据并对数据进行聚合 + 其中物联网设备串流传输到Amazon Kinesis Data Streams",
    "target": "A：对流进行重新分片以增加流中的分片数量；C：使用具有增强扇出功能的消费者；E：在消费者逻辑中使用错误重试和指数退避机制",
    "avoid": "别选“使用 Kinesis 制作者库 (KPL)”；认准“对流进行重新分片以增加流中的分片数量”。",
    "questionCues": [
      "该公司希望从感测器读取和收集数据并对数据进行聚合",
      "其中物联网设备串流传输到Amazon Kinesis Data Streams"
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
    "when": "该公司需要一份 CPU 或记忆体使用率未充分利用的所有 Amazon EC2 实例的清单 + AWS Organizations",
    "target": "从组织管理帐户中的AWS Cost Explorer 撷取资源最佳化建议 + 使用 AWS Systems Manager 在所有 EC2 实例上安装 Amazon CloudWatch 代理",
    "avoid": "别选“从组织每个帐户中的AWS Cost Explorer 检索资源优化建议”。",
    "questionCues": [
      "该公司需要一份 CPU 或记忆体使用率未充分利用的所有 Amazon EC2 实例的清单",
      "AWS Organizations"
    ],
    "answerCues": {
      "B": [
        "从组织管理帐户中的AWS Cost Explorer 撷取资源最佳化建议",
        "使用 AWS Systems Manager 在所有 EC2 实例上安装 Amazon CloudWatch 代理"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "222": {
    "when": "以将流量引导至EC2 实例 + Auto Scaling组就会替换一个实例 + 一家公司想要运行自订网路分析软体包来检查流量离开和进入VPC",
    "target": "B：配置CloudWatch代理发送应用程式的进程指标；D：Amazon SNS；E：AWS Lambda",
    "avoid": "别选“更新 CloudFormation 范本以在 EC2 执行个体上”；认准“配置CloudWatch代理发送应用程式的进程指标”。",
    "questionCues": [
      "以将流量引导至EC2 实例",
      "Auto Scaling组就会替换一个实例",
      "一家公司想要运行自订网路分析软体包来检查流量离开和进入VPC"
    ],
    "answerCues": {
      "B": [
        "配置CloudWatch代理发送应用程式的进程指标"
      ],
      "D": [
        "Amazon SNS"
      ],
      "E": [
        "AWS Lambda"
      ]
    },
    "disputed": false,
    "legacyMismatch": true
  },
  "223": {
    "when": "应用程式必须自动调整任务数量以回应 Amazon CloudWatch 警报 + 此解决方案必须透过负载平衡器将流量分配给每个ECS服务",
    "target": "为每个 ECS 服务实施服务 Auto Scaling + 配置 ECS 服务以使用蓝/绿部署类型和 Application Load Balancer",
    "avoid": "别选“使用群集自动缩放器为每个 ECS 服务实作 Auto Scaling 群组”。",
    "questionCues": [
      "应用程式必须自动调整任务数量以回应 Amazon CloudWatch 警报",
      "此解决方案必须透过负载平衡器将流量分配给每个ECS服务"
    ],
    "answerCues": {
      "D": [
        "为每个 ECS 服务实施服务 Auto Scaling",
        "配置 ECS 服务以使用蓝/绿部署类型和 Application Load Balancer"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "224": {
    "when": "该解决方案必须自动删除具有“严重”或“高”严重性结果的新图像标签 + 解决方案也必须通知开发团队 + EC2",
    "target": "使用 Step Functions 状态机删除这些映像的映像标签 + 使用 Amazon EventBridge 呼叫 AWS Step Functions 状态机",
    "avoid": "别选“安排一个AWS Lambda功能每小时启动一次手动影像扫描”。",
    "questionCues": [
      "该解决方案必须自动删除具有“严重”或“高”严重性结果的新图像标签",
      "解决方案也必须通知开发团队",
      "EC2"
    ],
    "answerCues": {
      "A": [
        "使用 Step Functions 状态机删除这些映像的映像标签",
        "使用 Amazon EventBridge 呼叫 AWS Step Functions 状态机"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "225": {
    "when": "该公司希望在未来 3 年内优化其运算成本 + 使用提供最大程度的成本节省 + 并使用AWS Organizations来管理其帐户",
    "target": "使用管理帐户层级的建议从管理帐户为组织购买计算储蓄计划",
    "avoid": "别选“为EC2 使用率较高的每个会员帐户购买预留实例”；认准“使用管理帐户层级的建议从管理帐户为组织购买计算储蓄计划”。",
    "questionCues": [
      "该公司希望在未来 3 年内优化其运算成本",
      "使用提供最大程度的成本节省",
      "并使用AWS Organizations来管理其帐户"
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
    "when": "解决方案架构师需要实施一个解决方案来追踪成本并发送通知 + 公司使用AWS Organizations中的组织来管理所有帐户",
    "target": "新增警报阈值并将值设为 80% + 使用 AWS 预算建立具有每日周期的预算",
    "avoid": "别选“以便在总成本超过分配预算的 80% 时发送 Amazon CloudWatch 警报”；认准“新增警报阈值并将值设为 80%”。",
    "questionCues": [
      "解决方案架构师需要实施一个解决方案来追踪成本并发送通知",
      "公司使用AWS Organizations中的组织来管理所有帐户"
    ],
    "answerCues": {
      "A": [
        "新增警报阈值并将值设为 80%",
        "使用 AWS 预算建立具有每日周期的预算"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "227": {
    "when": "该公司将其应用程式托管在 us-east-1 Region 的 Amazon EC2 实例中 + 建立的集中式 Amazon S3 储存桶",
    "target": "配置储存桶以使用 S3 传输加速",
    "avoid": "别选“重新部署应用程式以使用S3分段上传”；认准“配置储存桶以使用 S3 传输加速”。",
    "questionCues": [
      "该公司将其应用程式托管在 us-east-1 Region 的 Amazon EC2 实例中",
      "建立的集中式 Amazon S3 储存桶"
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
    "when": "并且必须扩展以满足流量的成长 + 一些经常存取的资料必须始终跨应用程式伺服器可用 + 公司需要使应用程式具有容错性和可扩展性",
    "target": "将 Web 伺服器和应用程式作为 EKS 集群中的 Kubernetes 部署运行 + 在Amazon Elastic Kubernetes Service (Amazon EKS)上部署应用程式",
    "avoid": "别选“在所有 EKS Pod 上安装 EFS 档案系统以储存前端 Web 伺服器会话资料”。",
    "questionCues": [
      "并且必须扩展以满足流量的成长",
      "一些经常存取的资料必须始终跨应用程式伺服器可用",
      "公司需要使应用程式具有容错性和可扩展性"
    ],
    "answerCues": {
      "D": [
        "将 Web 伺服器和应用程式作为 EKS 集群中的 Kubernetes 部署运行",
        "在Amazon Elastic Kubernetes Service (Amazon EKS)上部署应用程式"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "229": {
    "when": "解决方案架构师必须在近乎零停机的情况下迁移资料库 + 解决方案架构师会将资料库迁移到现代资料架构 + 迁移到AWS",
    "target": "将来源系统连接到 Microsoft SQL Server 资料库执行个体的Amazon RDS + 将工作负载转移到 Microsoft SQL Server 资料库执行个体的Amazon RDS",
    "avoid": "别选“将 Amazon S3 设定为目标”。",
    "questionCues": [
      "解决方案架构师必须在近乎零停机的情况下迁移资料库",
      "解决方案架构师会将资料库迁移到现代资料架构",
      "迁移到AWS"
    ],
    "answerCues": {
      "C": [
        "将来源系统连接到 Microsoft SQL Server 资料库执行个体的Amazon RDS",
        "将工作负载转移到 Microsoft SQL Server 资料库执行个体的Amazon RDS"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "230": {
    "when": "这些准则必须最大限度地减少整个环境的资料传输费用 + 解决方案架构师需要降低成本 + 该公司在AWS Organizations管理两个组织",
    "target": "C：部署中关闭Network Load Balancer的跨区域负载平衡；D：使用端点的本机 DNS 名称来",
    "avoid": "别选“使用 AWS 资源存取管理员与组织中的其他帐户共用托管服务提供者应用程式的子网路”。",
    "questionCues": [
      "这些准则必须最大限度地减少整个环境的资料传输费用",
      "解决方案架构师需要降低成本",
      "该公司在AWS Organizations管理两个组织"
    ],
    "answerCues": {
      "C": [
        "部署中关闭Network Load Balancer的跨区域负载平衡"
      ],
      "D": [
        "使用端点的本机 DNS 名称来"
      ]
    },
    "disputed": false,
    "legacyMismatch": true
  },
  "231": {
    "when": "该公司希望将备份移至Amazon S3上更强大的云端储存 + 建立了10 Gbps AWS Direct Connect连线",
    "target": "在连接到 Direct Connect 连接的 VPC 中部署AWS Storage Gateway 档案闸道",
    "avoid": "别选“并自动将此资料复制到S3 储存桶”。",
    "questionCues": [
      "该公司希望将备份移至Amazon S3上更强大的云端储存",
      "建立了10 Gbps AWS Direct Connect连线"
    ],
    "answerCues": {
      "A": [
        "在连接到 Direct Connect 连接的 VPC 中部署AWS Storage Gateway 档案闸道"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "232": {
    "when": "公司还必须降低网路出站流量成本 + 该公司需要将位于不同 AWS Regions 的所有 VPC 连接起来 + 某公司需要",
    "target": "并将其连接到 Direct Connect 闸道 + 使用每个 Region 中的中转闸道将 Direct Connect 闸道连接到所有其他 VPC",
    "avoid": "别选“创建从中央 VPC 到所有其他 VPC 发起的 VPC 对等连接”；认准“并将其连接到 Direct Connect 闸道”。",
    "questionCues": [
      "公司还必须降低网路出站流量成本",
      "该公司需要将位于不同 AWS Regions 的所有 VPC 连接起来",
      "某公司需要"
    ],
    "answerCues": {
      "B": [
        "并将其连接到 Direct Connect 闸道",
        "使用每个 Region 中的中转闸道将 Direct Connect 闸道连接到所有其他 VPC"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "233": {
    "when": "解决方案架构师需要建立一个 IAM 用户 + 一家公司正在将其开发和生产工作负载迁移到AWS Organizations ​​的新组织",
    "target": "使用信任策略授予 IAM 使用者对角色的存取权限 + 在管理帐户中建立IAM用户",
    "avoid": "别选“使用信任策略授予 IAM 使用者对跨帐户角色的存取权限”；认准“使用信任策略授予 IAM 使用者对角色的存取权限”。",
    "questionCues": [
      "解决方案架构师需要建立一个 IAM 用户",
      "一家公司正在将其开发和生产工作负载迁移到AWS Organizations ​​的新组织"
    ],
    "answerCues": {
      "D": [
        "使用信任策略授予 IAM 使用者对角色的存取权限",
        "在管理帐户中建立IAM用户"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "234": {
    "when": "此解决方案必须支援本机故障转移和回退功能 + 一家公司希望使用 AWS 对 on-premises 应用程式进行灾难复原",
    "target": "使用 AWS Elastic Disaster Recovery 复制on-premises伺服器 + 使用 AWS DataSync 将资料复制到 Windows 档案伺服器档案系统的 Amazon FSx",
    "avoid": "别选“使用DataSync对资料进行故障恢复”。",
    "questionCues": [
      "此解决方案必须支援本机故障转移和回退功能",
      "一家公司希望使用 AWS 对 on-premises 应用程式进行灾难复原"
    ],
    "answerCues": {
      "D": [
        "使用 AWS Elastic Disaster Recovery 复制on-premises伺服器",
        "使用 AWS DataSync 将资料复制到 Windows 档案伺服器档案系统的 Amazon FSx"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "235": {
    "when": "解决方案架构师应该做出哪些设计选择才能实现 HPC 集群的最大效能 + 当公司将集群规模增加到1.000个EC2实例时",
    "target": "A：确保 HPC 集群在单一Availability Zone内启动；C：选择启用了 Elastic Fabric Adapter (EFA) 的 EC2 执行个体类型。；F：Amazon FSx for Lustre",
    "avoid": "别选“启动 EC2 实例并以四个的倍数附加弹性网路介面”；认准“确保 HPC 集群在单一Availability Zone内启动”。",
    "questionCues": [
      "解决方案架构师应该做出哪些设计选择才能实现 HPC 集群的最大效能",
      "当公司将集群规模增加到1.000个EC2实例时"
    ],
    "answerCues": {
      "A": [
        "确保 HPC 集群在单一Availability Zone内启动"
      ],
      "C": [
        "选择启用了 Elastic Fabric Adapter (EFA) 的 EC2 执行个体类型。"
      ],
      "F": [
        "Amazon FSx for Lustre"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "236": {
    "when": "公司将要求具有特定值的标签 + 该公司希望标准化在整个组织中应用标签的流程 + 公司的每个OU都将具有唯一的标签值",
    "target": "将标签策略附加到OU + 使用 SCP 拒绝建立不具有所需标签的资源",
    "avoid": "别选“使用 SCP 仅当资源具有所需标签时才允许建立资源”；认准“将标签策略附加到OU”。",
    "questionCues": [
      "公司将要求具有特定值的标签",
      "该公司希望标准化在整个组织中应用标签的流程",
      "公司的每个OU都将具有唯一的标签值"
    ],
    "answerCues": {
      "A": [
        "将标签策略附加到OU",
        "使用 SCP 拒绝建立不具有所需标签的资源"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "237": {
    "when": "解决方案架构师必须在AWS上创建高度可用且可扩展的新设计 + 该公司在恢复伺服器时丢失了感测器资料 + Amazon S3",
    "target": "使用AWS Lambda函数来处理资料转换 + 并将其连接到 Amazon Kinesis Data Firehose 传输流",
    "avoid": "别选“并启动 Amazon EC2 执行个体来托管 Kafka 伺服器”；认准“使用AWS Lambda函数来处理资料转换”。",
    "questionCues": [
      "解决方案架构师必须在AWS上创建高度可用且可扩展的新设计",
      "该公司在恢复伺服器时丢失了感测器资料",
      "Amazon S3"
    ],
    "answerCues": {
      "C": [
        "使用AWS Lambda函数来处理资料转换",
        "并将其连接到 Amazon Kinesis Data Firehose 传输流"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "238": {
    "when": "必须根据自订的每日、每周和每月要求保留Backup + 备份解决方案必须在任何资源备份失败时立即发送通知 + 公司必须对资料备份进行以下更改",
    "target": "A：建立包含每个保留要求的备份规则的 AWS Backup 计划；B：配置一个 AWS Backup 计划将备份复制到另一个 Region；D：Amazon SNS",
    "avoid": "别选“建立一个AWS Lambda函数将备份复制到另一个Region并在发生故障时发送通知”。",
    "questionCues": [
      "必须根据自订的每日、每周和每月要求保留Backup",
      "备份解决方案必须在任何资源备份失败时立即发送通知",
      "公司必须对资料备份进行以下更改"
    ],
    "answerCues": {
      "A": [
        "建立包含每个保留要求的备份规则的 AWS Backup 计划"
      ],
      "B": [
        "配置一个 AWS Backup 计划将备份复制到另一个 Region"
      ],
      "D": [
        "Amazon SNS"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "239": {
    "when": "该设备每秒将 8 KB 的基因组数据推送到需要处理和分析数据并向研究人员提供资讯的数据平台 + 以帮助研究人员从不同人群中收集大量数据样本",
    "target": "使用Amazon Kinesis Data Streams收集入站感测器数据 + 并使用Amazon EMR将结果储存到AmazonRedshift集群",
    "avoid": "别选“使用AWS Lambda函数分析数据”；认准“使用Amazon Kinesis Data Streams收集入站感测器数据”。",
    "questionCues": [
      "该设备每秒将 8 KB 的基因组数据推送到需要处理和分析数据并向研究人员提供资讯的数据平台",
      "以帮助研究人员从不同人群中收集大量数据样本"
    ],
    "answerCues": {
      "B": [
        "使用Amazon Kinesis Data Streams收集入站感测器数据",
        "并使用Amazon EMR将结果储存到AmazonRedshift集群"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "240": {
    "when": "能够在 1 分钟内故障转移到另一个 AWS Region 以进行灾难恢复 + 提供最高效率的解决方案 + AWS Region 内的高可用性",
    "target": "B：将生存时间 (TTL) 设定为 30 秒；C：在Amazon DynamoDB中使用全域表；E：对任何其他资源使用按需实例",
    "avoid": "别选“使用S3跨Region复制”；认准“将生存时间 (TTL) 设定为 30 秒”。",
    "questionCues": [
      "能够在 1 分钟内故障转移到另一个 AWS Region 以进行灾难恢复",
      "提供最高效率的解决方案",
      "AWS Region 内的高可用性"
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
    "when": "公司必须对解决方案进行现代化改造并将解决方案迁移到AWS + on-premises 储存解决方案无法针对峰值流量进行扩展",
    "target": "使用AWS IoT Core接收车辆资料 + 建立一个 Amazon Kinesis 资料分析应用程序",
    "avoid": "别选“使用Amazon Kinesis Data Firehose传输流将资料储存在Amazon S3中”。",
    "questionCues": [
      "公司必须对解决方案进行现代化改造并将解决方案迁移到AWS",
      "on-premises 储存解决方案无法针对峰值流量进行扩展"
    ],
    "answerCues": {
      "B": [
        "使用AWS IoT Core接收车辆资料",
        "建立一个 Amazon Kinesis 资料分析应用程序"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "242": {
    "when": "安全团队希望自动寻找并修复此安全漏洞的实例 + 安全团队发现开发团队将 IAM 使用者秘密存取金钥放入其程式码中 + 在审核期间",
    "target": "请在 AWS IAM 中停用它们并通知使用者 + 配置 CodeCommit 触发器以呼叫 AWS Lambda 函数来扫描新提交的程式码以取得凭证",
    "avoid": "别选“使用预定的AWS Lambda功能从CodeCommit下载并扫描应用程式程式码”。",
    "questionCues": [
      "安全团队希望自动寻找并修复此安全漏洞的实例",
      "安全团队发现开发团队将 IAM 使用者秘密存取金钥放入其程式码中",
      "在审核期间"
    ],
    "answerCues": {
      "D": [
        "请在 AWS IAM 中停用它们并通知使用者",
        "配置 CodeCommit 触发器以呼叫 AWS Lambda 函数来扫描新提交的程式码以取得凭证"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "243": {
    "when": "且每个应用程式应具有运作所需的最低权限 + 该公司的资讯安全政策规定 + 需要由许多 AWS 帐户中的数百个应用程式存取",
    "target": "A：为拥有 S3 储存桶的 AWS 帐户中的每个应用程式建立 S3 存取点；C：以允许存取 S3 存取点",
    "avoid": "别选“设定端点策略以允许存取 S3 接入点”；认准“为拥有 S3 储存桶的 AWS 帐户中的每个应用程式建立 S3 存取点”。",
    "questionCues": [
      "且每个应用程式应具有运作所需的最低权限",
      "该公司的资讯安全政策规定",
      "需要由许多 AWS 帐户中的数百个应用程式存取"
    ],
    "answerCues": {
      "A": [
        "为拥有 S3 储存桶的 AWS 帐户中的每个应用程式建立 S3 存取点"
      ],
      "C": [
        "以允许存取 S3 存取点"
      ]
    },
    "disputed": false,
    "legacyMismatch": true
  },
  "244": {
    "when": "该公司希望近乎即时地监控哪些 EC2 实例连接到资料库 + 解决方案架构师需要确定如何将网路流量传送到 Splunk",
    "target": "建立一个 CloudWatch 日志订阅 + 该处理器从 CloudWatch 日志订阅过滤器发送的记录中提取单一日志事件",
    "avoid": "别选“配置 Splunk 以使用这些凭证从 S3 储存桶中提取日志”；认准“建立一个 CloudWatch 日志订阅”。",
    "questionCues": [
      "该公司希望近乎即时地监控哪些 EC2 实例连接到资料库",
      "解决方案架构师需要确定如何将网路流量传送到 Splunk"
    ],
    "answerCues": {
      "B": [
        "建立一个 CloudWatch 日志订阅",
        "该处理器从 CloudWatch 日志订阅过滤器发送的记录中提取单一日志事件"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "245": {
    "when": "从AWS计费和成本管理控制台记录当前成本 + 公司有严格的合规要求 + 该解决方案还必须确保公司只能在美国的Regions 创建资源",
    "target": "B：在 AWS Organizations ​​中部署一个组织并启用所有功能；D：创建一个 SCP；E：在管理帐户中建立IAM角色",
    "avoid": "别选“建立一个 SCP”；认准“在 AWS Organizations ​​中部署一个组织并启用所有功能”。",
    "questionCues": [
      "从AWS计费和成本管理控制台记录当前成本",
      "公司有严格的合规要求",
      "该解决方案还必须确保公司只能在美国的Regions 创建资源"
    ],
    "answerCues": {
      "B": [
        "在 AWS Organizations ​​中部署一个组织并启用所有功能"
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
    "when": "安全团队要求自己的 AWS 帐户对所有帐户具有唯读存取权 + 公司需要从一个中心位置为多个部门建立和管理多个 AWS 帐户",
    "target": "要求安全团队使用 IAM 角色来取得存取权限 + 各成员帐户中的IAM角色与安全帐户之间建立信任关系",
    "avoid": "别选“要求安全团队使用IAM策略来取得存取权限”；认准“要求安全团队使用 IAM 角色来取得存取权限”。",
    "questionCues": [
      "安全团队要求自己的 AWS 帐户对所有帐户具有唯读存取权",
      "公司需要从一个中心位置为多个部门建立和管理多个 AWS 帐户"
    ],
    "answerCues": {
      "B": [
        "要求安全团队使用 IAM 角色来取得存取权限",
        "各成员帐户中的IAM角色与安全帐户之间建立信任关系"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "247": {
    "when": "分支 VPC 中的所有私有子网路必须透过出口 VPC 将流量路由到网际网路 + 并允许从私有子网路出站连接到 Internet",
    "target": "将现有的VPC连接到中转网关 + 建立中转网关",
    "avoid": "别选“在出口 VPC 和分支 VPC 之间建立对等连接”；认准“将现有的VPC连接到中转网关”。",
    "questionCues": [
      "分支 VPC 中的所有私有子网路必须透过出口 VPC 将流量路由到网际网路",
      "并允许从私有子网路出站连接到 Internet"
    ],
    "answerCues": {
      "B": [
        "将现有的VPC连接到中转网关",
        "建立中转网关"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "248": {
    "when": "解决方案架构师必须防止失败的登入尝试淹没身分验证服务 + 系统管理员侦测到每周失败的登入尝试次数激增 + ALB",
    "target": "建立包含基于速率的规则的 AWS WAF Web ACL + 将 Web ACL 连接到 ALB",
    "avoid": "别选“建立包含 IP 设定匹配规则的 AWS WAF Web ACL”；认准“建立包含基于速率的规则的 AWS WAF Web ACL”。",
    "questionCues": [
      "解决方案架构师必须防止失败的登入尝试淹没身分验证服务",
      "系统管理员侦测到每周失败的登入尝试次数激增",
      "ALB"
    ],
    "answerCues": {
      "B": [
        "建立包含基于速率的规则的 AWS WAF Web ACL",
        "将 Web ACL 连接到 ALB"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "249": {
    "when": "该公司希望将 SaaS 解决方案迁移到AWS + 不允许更改SFTP端点IP位址 + 该公司向客户提供多个公共SFTP端点以促进文件传输",
    "target": "使用AWS Transfer 将档案储存到Amazon S3 + 从位址池建立弹性 IP 位址并将其指派给 SFTP 端点的 AWS 传输",
    "avoid": "别选“使用 Amazon Route 53 注册客户拥有的 IP 位址区块”。",
    "questionCues": [
      "该公司希望将 SaaS 解决方案迁移到AWS",
      "不允许更改SFTP端点IP位址",
      "该公司向客户提供多个公共SFTP端点以促进文件传输"
    ],
    "answerCues": {
      "A": [
        "使用AWS Transfer 将档案储存到Amazon S3",
        "从位址池建立弹性 IP 位址并将其指派给 SFTP 端点的 AWS 传输"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "250": {
    "when": "该应用程式需要在运行该应用程式的所有EC2实例之间建立高吞吐量、低延迟的网路连线 + 应用程式不要求具有容错能力 + Amazon EC2",
    "target": "将 5 个新的 EC2 实例启动到群集置放群组 + 确保EC2实例类型支援增强联网",
    "avoid": "别选“将额外的弹性网路介面附加到每个 EC2 实例”；认准“将 5 个新的 EC2 实例启动到群集置放群组”。",
    "questionCues": [
      "该应用程式需要在运行该应用程式的所有EC2实例之间建立高吞吐量、低延迟的网路连线",
      "应用程式不要求具有容错能力",
      "Amazon EC2"
    ],
    "answerCues": {
      "A": [
        "将 5 个新的 EC2 实例启动到群集置放群组",
        "确保EC2实例类型支援增强联网"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "251": {
    "when": "同时最大限度地降低成本 + 并希望保护其 API + 该公司创建了一个 Amazon API Gateway Regional 端点",
    "target": "建立 API 金钥并将其新增至使用计划 + 建立具有请求限制的使用计划并将其与 API 关联",
    "avoid": "别选“将 Web ACL 与 CloudFront 发行版关联”；认准“建立 API 金钥并将其新增至使用计划”。",
    "questionCues": [
      "同时最大限度地降低成本",
      "并希望保护其 API",
      "该公司创建了一个 Amazon API Gateway Regional 端点"
    ],
    "answerCues": {
      "D": [
        "建立 API 金钥并将其新增至使用计划",
        "建立具有请求限制的使用计划并将其与 API 关联"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "252": {
    "when": "公司的资料库团队必须监控所有资料库上的所有资料活动 + Amazon Aurora PostgreSQL",
    "target": "使用Kinesis资料流并将资料传送到Amazon S3进行进一步分析 + 以将活动流推送到 Amazon Kinesis 资料流",
    "avoid": "别选“并将所有资料库活动发布到 Amazon S3 以便进一步分析”。",
    "questionCues": [
      "公司的资料库团队必须监控所有资料库上的所有资料活动",
      "Amazon Aurora PostgreSQL"
    ],
    "answerCues": {
      "C": [
        "使用Kinesis资料流并将资料传送到Amazon S3进行进一步分析",
        "以将活动流推送到 Amazon Kinesis 资料流"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "253": {
    "when": "解决方案架构师需要配置Auto Scaling组 + 以便以最具成本效益的方式满足需求 + 以动态扩展实例组",
    "target": "配置 Auto Scaling 群组以部署 r6g.4xlarge（记忆体最佳化）实例 + 配置最小容量为 3、所需容量为 3、最大容量为 12",
    "avoid": "别选“配置 Auto Scaling 群组以部署 c6g.4xlarge（计算最佳化）实例”。",
    "questionCues": [
      "解决方案架构师需要配置Auto Scaling组",
      "以便以最具成本效益的方式满足需求",
      "以动态扩展实例组"
    ],
    "answerCues": {
      "C": [
        "配置 Auto Scaling 群组以部署 r6g.4xlarge（记忆体最佳化）实例",
        "配置最小容量为 3、所需容量为 3、最大容量为 12"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "254": {
    "when": "公司需要降低与DynamoDB相关的成本 + 一家金融服务公司将数百万笔历史股票交易加载到Amazon DynamoDB 表中",
    "target": "部署DynamoDB Accelerator (DAX) + 使用预配置容量模式 + 配置DynamoDB自动缩放",
    "avoid": "别选“在 Cost Explorer 购买 Savings Plans”；认准“部署DynamoDB Accelerator (DAX)”。",
    "questionCues": [
      "公司需要降低与DynamoDB相关的成本",
      "一家金融服务公司将数百万笔历史股票交易加载到Amazon DynamoDB 表中"
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
    "when": "用户端无法使用 VPC 端点提交日志 + 已为日志记录服务建立了一个介面端点并且可用 + 创建一个在 Amazon EC2 上",
    "target": "A：以允许与EC2 实例上运行的日志记录服务子网进行通讯；C：检查EC2实例上运行的日志服务的安全群组",
    "avoid": "别选“以允许与 EC2 实例上执行的日志记录服务子网路进行通讯”；认准“以允许与EC2 实例上运行的日志记录服务子网进行通讯”。",
    "questionCues": [
      "用户端无法使用 VPC 端点提交日志",
      "已为日志记录服务建立了一个介面端点并且可用",
      "创建一个在 Amazon EC2 上"
    ],
    "answerCues": {
      "A": [
        "以允许与EC2 实例上运行的日志记录服务子网进行通讯"
      ],
      "C": [
        "检查EC2实例上运行的日志服务的安全群组"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "256": {
    "when": "解决方案架构师需要透过对应用程式进行最小的更改来优化成本 + 使用 AWS KMS 金钥 (SSE-KMS) 的伺服器端加密进行加密",
    "target": "并使用 Amazon S3 托管金钥 (SSE-S3) 作为加密类型 + 指定 SSE-S3",
    "avoid": "别选“建立 S3 Intelligent-Tiering 存档配置”。",
    "questionCues": [
      "解决方案架构师需要透过对应用程式进行最小的更改来优化成本",
      "使用 AWS KMS 金钥 (SSE-KMS) 的伺服器端加密进行加密"
    ],
    "answerCues": {
      "B": [
        "并使用 Amazon S3 托管金钥 (SSE-S3) 作为加密类型",
        "指定 SSE-S3"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "257": {
    "when": "媒体储存应用程式将使用者照片上传到Amazon S3以供AWS Lambda函数处理 + Lambda 遇到了照片处理问题",
    "target": "B：评估并调整 DynamoDB 表的 WCU；D：Amazon S3",
    "avoid": "别选“使用S3传输加速为用户提供更低的延迟”；认准“评估并调整 DynamoDB 表的 WCU”。",
    "questionCues": [
      "媒体储存应用程式将使用者照片上传到Amazon S3以供AWS Lambda函数处理",
      "Lambda 遇到了照片处理问题"
    ],
    "answerCues": {
      "B": [
        "评估并调整 DynamoDB 表的 WCU"
      ],
      "D": [
        "Amazon S3"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "258": {
    "when": "该公司希望透过将应用程式迁移到AWS来解决这些挑战 + 公司需要加速应用程式开发 + 来自美国和加拿大各地的用户访问该应用程式",
    "target": "使用Amazon S3储存上传的媒体档案 + 使用 AWS Amplify 建立一个用于上传媒体档案的静态网站",
    "avoid": "别选“修改应用程式以使用Amazon S3来储存档案”；认准“使用Amazon S3储存上传的媒体档案”。",
    "questionCues": [
      "该公司希望透过将应用程式迁移到AWS来解决这些挑战",
      "公司需要加速应用程式开发",
      "来自美国和加拿大各地的用户访问该应用程式"
    ],
    "answerCues": {
      "D": [
        "使用Amazon S3储存上传的媒体档案",
        "使用 AWS Amplify 建立一个用于上传媒体档案的静态网站"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "259": {
    "when": "日志将不再可用 + 该公司的开发团队希望分析应用程式日志 + 并且经常横向扩展和收缩",
    "target": "配置EC2实例使用统一的CloudWatch代理将日志发布到AmazonCloudWatch日志",
    "avoid": "别选“修改Auto Scaling组以使用步进扩展策略”。",
    "questionCues": [
      "日志将不再可用",
      "该公司的开发团队希望分析应用程式日志",
      "并且经常横向扩展和收缩"
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
    "when": "解决方案架构师应该如何解决该错误 + 该网站使用 Amazon S3 进行托管 + 并配置了 AWS WAF",
    "target": "在 API Gateway API 端点上启用 CORS 设定 + 确保 API 端点",
    "avoid": "别选“更改S3存储桶上的CORS配置”；认准“在 API Gateway API 端点上启用 CORS 设定”。",
    "questionCues": [
      "解决方案架构师应该如何解决该错误",
      "该网站使用 Amazon S3 进行托管",
      "并配置了 AWS WAF"
    ],
    "answerCues": {
      "C": [
        "在 API Gateway API 端点上启用 CORS 设定",
        "确保 API 端点"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "261": {
    "when": "该公司希望开始使用身份联合而不是手动用户管理 + 解决方案架构师需要集中公司AWS帐户的计费和管理 + 并且不使用集中计费或管理",
    "target": "A：在AWS Organizations部署一个组织；C：配置 IAM Identity Center 以自动同步使用者和群组；E：将权限集附加到适当的 IAM Identity Center 群组和 AWS 帐户",
    "avoid": "别选“以使用 AWS Managed Microsoft AD 进行身份验证和授权”。",
    "questionCues": [
      "该公司希望开始使用身份联合而不是手动用户管理",
      "解决方案架构师需要集中公司AWS帐户的计费和管理",
      "并且不使用集中计费或管理"
    ],
    "answerCues": {
      "A": [
        "在AWS Organizations部署一个组织"
      ],
      "C": [
        "配置 IAM Identity Center 以自动同步使用者和群组"
      ],
      "E": [
        "将权限集附加到适当的 IAM Identity Center 群组和 AWS 帐户"
      ]
    },
    "disputed": false,
    "legacyMismatch": true
  },
  "262": {
    "when": "同时最大限度地降低成本 + 迁移到 AWS 来管理与 20 个不经常 + 哪一个是最具成本效益的解决方案",
    "target": "在 Amazon EC2 上部署 Amazon ECS 容器 + 并将 Auto Scaling 配置为记忆体利用率为 75%",
    "avoid": "别选“购买等于 Auto Scaling 组的 GroupMaxSize 参数的 3 年预留实例预留”。",
    "questionCues": [
      "同时最大限度地降低成本",
      "迁移到 AWS 来管理与 20 个不经常",
      "哪一个是最具成本效益的解决方案"
    ],
    "answerCues": {
      "B": [
        "在 Amazon EC2 上部署 Amazon ECS 容器",
        "并将 Auto Scaling 配置为记忆体利用率为 75%"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "263": {
    "when": "解决方案架构师必须审查架构并提出解决方案以最大限度地降低计算成本 + 并需要6小时才能完成运作 + EMR 任务每天早上运行",
    "target": "在实例群组中的 Spot 实例上启动任务节点 + 终止集群，包括所有实例 + 购买计算节省计划来满足按需实例的使用",
    "avoid": "别选“继续启动按需实例上的所有节点”；认准“在实例群组中的 Spot 实例上启动任务节点”。",
    "questionCues": [
      "解决方案架构师必须审查架构并提出解决方案以最大限度地降低计算成本",
      "并需要6小时才能完成运作",
      "EMR 任务每天早上运行"
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
    "when": "该解决方案还必须能够自动缓解故障 + EC2 实例在 VPC 的三个私有子网路中运行 + 使应用程式能够与on-premises系统进行通讯",
    "target": "将弹性IP位址分配给NAT网关 + 在公共子网路中部署单一NAT网关",
    "avoid": "别选“部署三个 NAT 网关”；认准“将弹性IP位址分配给NAT网关”。",
    "questionCues": [
      "该解决方案还必须能够自动缓解故障",
      "EC2 实例在 VPC 的三个私有子网路中运行",
      "使应用程式能够与on-premises系统进行通讯"
    ],
    "answerCues": {
      "C": [
        "将弹性IP位址分配给NAT网关",
        "在公共子网路中部署单一NAT网关"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "265": {
    "when": "有 540 个开发者成员帐号必须迁移到新的开发者组织 + 某公司使用AWS Organizations管理1000多个AWS帐户",
    "target": "B：在管理帐户中；E：以传送邀请给开发者帐户；F：让每个开发者登入他们的帐户并确认加入新的开发者组织",
    "avoid": "别选“从旧组织的管理帐户呼叫 Organizations API 中的 MoveAccount 操作”；认准“在管理帐户中”。",
    "questionCues": [
      "有 540 个开发者成员帐号必须迁移到新的开发者组织",
      "某公司使用AWS Organizations管理1000多个AWS帐户"
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
    "when": "并在摄取和服务之间实现最小延迟 + 解决方案架构师必须推荐一种解决方案来整合检测逻辑 + 第三方工具会将损坏的影像提取到 S3 储存桶中",
    "target": "使用呼叫 AWS Lambda 函数的 S3 事件通知",
    "avoid": "别选“使用呼叫 AWS Step Functions 状态机的 S3 事件通知”。",
    "questionCues": [
      "并在摄取和服务之间实现最小延迟",
      "解决方案架构师必须推荐一种解决方案来整合检测逻辑",
      "第三方工具会将损坏的影像提取到 S3 储存桶中"
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
    "when": "解决方案架构师应该建议什么来以最少的营运开销实现应用程式部署流程的自动化 + 由于扩展事件 + 公司会在任何新目标 EC2 实例上",
    "target": "将 CodeDeploy 部署群组与 Auto Scaling 群组而非 EC2 实例关联 + 配置 Auto Scaling 群组的启动模板以使用新的 AMI",
    "avoid": "别选“对 Lambda 函数进行编码以将 EC2 实例与 CodeDeploy 部署群组关联”。",
    "questionCues": [
      "解决方案架构师应该建议什么来以最少的营运开销实现应用程式部署流程的自动化",
      "由于扩展事件",
      "公司会在任何新目标 EC2 实例上"
    ],
    "answerCues": {
      "D": [
        "将 CodeDeploy 部署群组与 Auto Scaling 群组而非 EC2 实例关联",
        "配置 Auto Scaling 群组的启动模板以使用新的 AMI"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "268": {
    "when": "该公司需要最大限度地减少改用新解决方案期间的停机时间 + 解决方案架构师需要设计一个高度可用的解决方案 + 自动处理EC2实例的替换",
    "target": "将 Auto Scaling 组附加到现有 ALA将现有 EC2 实例附加到 Auto Scaling 组 + 将新的启动模板附加到 Auto Scaling 群组",
    "avoid": "别选“将现有 EC2 实例附加到 Auto Scaling 群组”。",
    "questionCues": [
      "该公司需要最大限度地减少改用新解决方案期间的停机时间",
      "解决方案架构师需要设计一个高度可用的解决方案",
      "自动处理EC2实例的替换"
    ],
    "answerCues": {
      "B": [
        "将 Auto Scaling 组附加到现有 ALA将现有 EC2 实例附加到 Auto Scaling 组",
        "将新的启动模板附加到 Auto Scaling 群组"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "269": {
    "when": "该公司不希望这种强制执行对开发人员执行任务的速度产生负面影响 + 以及高昂的运算成本 + 该公司希望针对开发人员在 AWS 帐户中",
    "target": "配置 AWS Service Catalog 启动约束以使用核准的 IAM 角色 + 将开发人员的 IAM 权限范围限制为仅允许存取 AWS Service Catalog",
    "avoid": "别选“以部署经批准的VPC配置以及S3介面端点”；认准“配置 AWS Service Catalog 启动约束以使用核准的 IAM 角色”。",
    "questionCues": [
      "该公司不希望这种强制执行对开发人员执行任务的速度产生负面影响",
      "以及高昂的运算成本",
      "该公司希望针对开发人员在 AWS 帐户中"
    ],
    "answerCues": {
      "C": [
        "配置 AWS Service Catalog 启动约束以使用核准的 IAM 角色",
        "将开发人员的 IAM 权限范围限制为仅允许存取 AWS Service Catalog"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "270": {
    "when": "解决方案架构师必须推荐一种解决方案 + 拒绝存取特别指定的Regions以外的任何操作 + 一家公司正在扩张",
    "target": "创建OU并附加SCP + 启动AWS Control Tower著陆区",
    "avoid": "别选“建立具有条件允许权限的 IAM 策略”；认准“创建OU并附加SCP”。",
    "questionCues": [
      "解决方案架构师必须推荐一种解决方案",
      "拒绝存取特别指定的Regions以外的任何操作",
      "一家公司正在扩张"
    ],
    "answerCues": {
      "C": [
        "创建OU并附加SCP",
        "启动AWS Control Tower著陆区"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "271": {
    "when": "同时最大限度地降低营运成本 + 该公司需要创建一个解耦、可扩展的架构 + 并具有保留失败订单的机制",
    "target": "使用 AWS Lambda 进行业务逻辑 + 并使用 Amazon SQS 死信队列来保留失败的订单",
    "avoid": "别选“并使用Amazon SQS长轮询来保留失败的订单”；认准“使用 AWS Lambda 进行业务逻辑”。",
    "questionCues": [
      "同时最大限度地降低营运成本",
      "该公司需要创建一个解耦、可扩展的架构",
      "并具有保留失败订单的机制"
    ],
    "answerCues": {
      "C": [
        "使用 AWS Lambda 进行业务逻辑",
        "并使用 Amazon SQS 死信队列来保留失败的订单"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "272": {
    "when": "并已配置 Amazon Route 53 运行状况检查和 DNS 故障转移到 us-west-2 + 解决方案架构师应该采取哪些额外步骤",
    "target": "将资料库迁移到 Amazon Aurora 全域资料库 + 辅助资料库位于 us-west-2",
    "avoid": "别选“将资料库迁移到 MySQL 实例的 Amazon RDS”；认准“将资料库迁移到 Amazon Aurora 全域资料库”。",
    "questionCues": [
      "并已配置 Amazon Route 53 运行状况检查和 DNS 故障转移到 us-west-2",
      "解决方案架构师应该采取哪些额外步骤"
    ],
    "answerCues": {
      "B": [
        "将资料库迁移到 Amazon Aurora 全域资料库",
        "辅助资料库位于 us-west-2"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "273": {
    "when": "并以最少的配置进行集中管理 + 一家公司正在使用AWS Organizations来管理多个帐户 + 由于监管要求",
    "target": "将特定会员帐号与新的OU相关联 + 应用标签策略和 SCP 使用条件来限制 Regions",
    "avoid": "别选“将特定成员帐号与 root 关联”；认准“将特定会员帐号与新的OU相关联”。",
    "questionCues": [
      "并以最少的配置进行集中管理",
      "一家公司正在使用AWS Organizations来管理多个帐户",
      "由于监管要求"
    ],
    "answerCues": {
      "D": [
        "将特定会员帐号与新的OU相关联",
        "应用标签策略和 SCP 使用条件来限制 Regions"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "274": {
    "when": "哪一组操作会立即修复安全性问题而不影响应用程式的正常工作流程 + 可以产生报告并将其储存在 Amazon S3 储存桶中",
    "target": "使用 Amazon S3 中的阻止公共存取功能将储存桶上的 IgnorePublicAcIs 选项设为 TRUE",
    "avoid": "别选“查看 AWS Trusted Advisor 储存桶权限检查并实作建议的操作”。",
    "questionCues": [
      "哪一组操作会立即修复安全性问题而不影响应用程式的正常工作流程",
      "可以产生报告并将其储存在 Amazon S3 储存桶中"
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
    "when": "解决方案架构师需要设计一种无需停机并最大限度地减少完成迁移所需时间的迁移策略 + 迁移策略必须复制所有现有资料以及迁移期间建立的任何新资料",
    "target": "A：使用AWS架构转换工具（AWSSCT）将资料库架构从来源资料库迁移到目标资料库；C：配置两个 AWS 帐户中的 VPC 之间的 VPC 对等互连；E：执行从来源资料库到目标资料库的完整载入加变更资料撷取（CDC）迁移",
    "avoid": "别选“转换工具 (AWS SCT)”；认准“使用AWS架构转换工具（AWSSCT）将资料库架构从来源资料库迁移到目标资料库”。",
    "questionCues": [
      "解决方案架构师需要设计一种无需停机并最大限度地减少完成迁移所需时间的迁移策略",
      "迁移策略必须复制所有现有资料以及迁移期间建立的任何新资料"
    ],
    "answerCues": {
      "A": [
        "使用AWS架构转换工具（AWSSCT）将资料库架构从来源资料库迁移到目标资料库"
      ],
      "C": [
        "配置两个 AWS 帐户中的 VPC 之间的 VPC 对等互连"
      ],
      "E": [
        "执行从来源资料库到目标资料库的完整载入加变更资料撷取（CDC）迁移"
      ]
    },
    "disputed": true,
    "legacyMismatch": true
  },
  "276": {
    "when": "解决方案架构师需要分析错误的订单讯息并确保系统继续处理后续讯息 + 后端处理逾时设定为10秒 + 伫列的可见性逾时设定为30秒",
    "target": "配置一个新的SQS标准伫列作为死信伫列来隔离错误讯息",
    "avoid": "别选“配置一个新的SQS FIFO伫列作为死信伫列来隔离错误讯息”；认准“配置一个新的SQS标准伫列作为死信伫列来隔离错误讯息”。",
    "questionCues": [
      "解决方案架构师需要分析错误的订单讯息并确保系统继续处理后续讯息",
      "后端处理逾时设定为10秒",
      "伫列的可见性逾时设定为30秒"
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
    "when": "一家公司使用 AWS Step Functions 自动化了其机器学习模型的夜间重新训练 + 以便针对再培训过程中的所有类型的故障发送通知",
    "target": "A：Amazon SNS；B：将输入参数转送到 SNS 主题；C：[「States.ALL」] 和「Next」",
    "avoid": "别选“Amazon SES”；认准“Amazon SNS”。",
    "questionCues": [
      "一家公司使用 AWS Step Functions 自动化了其机器学习模型的夜间重新训练",
      "以便针对再培训过程中的所有类型的故障发送通知"
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
    "when": "解决方案架构师必须确保新服务可以解析 company.example 网域上的主机名 + 并且仅在公司的专用网路上可用",
    "target": "使用 Amazon Route 53 解析器配置新的出站端点 + 开启 VPC 的 DNS 主机名称",
    "avoid": "别选“使用 Amazon Route 53 解析器开启新的入站解析器端点上的 VPC 主机名称”。",
    "questionCues": [
      "解决方案架构师必须确保新服务可以解析 company.example 网域上的主机名",
      "并且仅在公司的专用网路上可用"
    ],
    "answerCues": {
      "B": [
        "使用 Amazon Route 53 解析器配置新的出站端点",
        "开启 VPC 的 DNS 主机名称"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "279": {
    "when": "每个VPC 必须只能与一组预先定义的、有限的授权VPC 进行通讯 + 解决方案架构师需要限制VPC之间的流量 + 安全审核显示",
    "target": "仅将交通路由至授权的VPC + 为每个 VPC 连线建立专用中转网关路由表",
    "avoid": "别选“以仅允许出站流量流向授权的VPC”；认准“仅将交通路由至授权的VPC”。",
    "questionCues": [
      "每个VPC 必须只能与一组预先定义的、有限的授权VPC 进行通讯",
      "解决方案架构师需要限制VPC之间的流量",
      "安全审核显示"
    ],
    "answerCues": {
      "C": [
        "仅将交通路由至授权的VPC",
        "为每个 VPC 连线建立专用中转网关路由表"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "280": {
    "when": "但希望采用一种简化的方式来管理所有员工对AWS上的应用程式的存取 + 所有员工在使用应用程式之前都必须经过身份验证",
    "target": "使用 Amazon AppStream 2.0 映像产生器建立包含应用程式和所需配置的映像 + 使用动态伫列 Auto Scaling 策略配置AppStream 2.0 按需团队来运行映像",
    "avoid": "别选“将每个 EC2 实例加入公司的 Active Directory 域”。",
    "questionCues": [
      "但希望采用一种简化的方式来管理所有员工对AWS上的应用程式的存取",
      "所有员工在使用应用程式之前都必须经过身份验证"
    ],
    "answerCues": {
      "C": [
        "使用 Amazon AppStream 2.0 映像产生器建立包含应用程式和所需配置的映像",
        "使用动态伫列 Auto Scaling 策略配置AppStream 2.0 按需团队来运行映像"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "281": {
    "when": "解决方案架构师必须提出最具成本效益的解决方案 + 该公司担心当前解决方案的高成本 + 并且仅在下午 5 点到晚上 10 点之间运行",
    "target": "使用 AWS Glue Data Catalog 和 Amazon Athena 查询资料 + 将资料储存在Amazon S3中",
    "avoid": "别选“使用AmazonRedshift频谱查询资料”。",
    "questionCues": [
      "解决方案架构师必须提出最具成本效益的解决方案",
      "该公司担心当前解决方案的高成本",
      "并且仅在下午 5 点到晚上 10 点之间运行"
    ],
    "answerCues": {
      "B": [
        "使用 AWS Glue Data Catalog 和 Amazon Athena 查询资料",
        "将资料储存在Amazon S3中"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "282": {
    "when": "公司需要提高AWS计费和成本管理细节的可见度 + 但有指导方针要求所有基础设施都使用AWS CloudFormation和一致的标记进行部署",
    "target": "使用 SCPs 限制资源上没有成本中心和专案 ID 的资源建立 + 使用标签编辑器来标记现有资源",
    "avoid": "别选“使用跨帐户角色每小时标记未标记的 RDS 资料库和 DynamoDB 资源”。",
    "questionCues": [
      "公司需要提高AWS计费和成本管理细节的可见度",
      "但有指导方针要求所有基础设施都使用AWS CloudFormation和一致的标记进行部署"
    ],
    "answerCues": {
      "C": [
        "使用 SCPs 限制资源上没有成本中心和专案 ID 的资源建立",
        "使用标签编辑器来标记现有资源"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "283": {
    "when": "一家公司希望将资料从其 on-premises 系统传送到 Amazon S3 储存桶 + 而不能透过网路传输数据 + 公司必须私下发送数据",
    "target": "A：建立与私有 VIF 的 AWS Direct Connect 连线；C：在网路帐户中建立Amazon S3介面端点",
    "avoid": "别选“来自托管 S3 储存桶的帐户的对等 VPC 以及网路帐户中的 VPC”。",
    "questionCues": [
      "一家公司希望将资料从其 on-premises 系统传送到 Amazon S3 储存桶",
      "而不能透过网路传输数据",
      "公司必须私下发送数据"
    ],
    "answerCues": {
      "A": [
        "建立与私有 VIF 的 AWS Direct Connect 连线"
      ],
      "C": [
        "在网路帐户中建立Amazon S3介面端点"
      ]
    },
    "disputed": false,
    "legacyMismatch": true
  },
  "284": {
    "when": "该公司希望降低 DynamoDB 成本并最大限度地减少 IT 员工的营运开销 + 销售点和管理平台部署在AWS云端中",
    "target": "为表格启用 Dynamo DB 自动缩放",
    "avoid": "别选“更改 DynamoDB 表以使用按需容量”；认准“为表格启用 Dynamo DB 自动缩放”。",
    "questionCues": [
      "该公司希望降低 DynamoDB 成本并最大限度地减少 IT 员工的营运开销",
      "销售点和管理平台部署在AWS云端中"
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
    "when": "公司希望透过即时显示评论来提高使用者参与度 + AWS Lambda + Amazon DynamoDB",
    "target": "使用 AWS AppSync 并利用 WebSocket 来传递评论",
    "avoid": "别选“使用边缘优化的 API 和 Amazon CloudFront 来快取 API 回应”。",
    "questionCues": [
      "公司希望透过即时显示评论来提高使用者参与度",
      "AWS Lambda",
      "Amazon DynamoDB"
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
    "when": "不能在互联网上访问 + S3接入点只能在VPC秒内访问 + 该公司最近开始允许产品团队在其帐户中建立和管理自己的S3接入点",
    "target": "在组织的根层级建立 SCP 以拒绝 s3:CreateAccessPoint 操作 + 除非 s3:AccessPointNetworkOrigin 条件键的计算结果为 VPC",
    "avoid": "别选“设定 S3 存取点资源策略以拒绝 s3:CreateAccessPoint 操作”。",
    "questionCues": [
      "不能在互联网上访问",
      "S3接入点只能在VPC秒内访问",
      "该公司最近开始允许产品团队在其帐户中建立和管理自己的S3接入点"
    ],
    "answerCues": {
      "B": [
        "在组织的根层级建立 SCP 以拒绝 s3:CreateAccessPoint 操作",
        "除非 s3:AccessPointNetworkOrigin 条件键的计算结果为 VPC"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "287": {
    "when": "解决方案架构师必须使用蓝/绿部署方法更新AWSElastic Beanstalk内的应用程式环境 + 接下来该做什么来完成更新",
    "target": "选择交换环境 URL 选项",
    "avoid": "别选“使用Amazon Route 53重定向到新环境”；认准“选择交换环境 URL 选项”。",
    "questionCues": [
      "解决方案架构师必须使用蓝/绿部署方法更新AWSElastic Beanstalk内的应用程式环境",
      "接下来该做什么来完成更新"
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
    "when": "全球多达 10,000 名用户将上传他们的图像 + 然后将其发布在公司网站上 + 将在上传的图像上覆盖文本",
    "target": "使用 Amazon CloudWatch 伫列深度指标来横向扩展 EC2 实例 + 启用Amazon CloudFront并将来源配置为包含已处理影像的S3储存桶",
    "avoid": "别选“启用Amazon CloudFront并将原点配置为EC2实例前面的ALB”。",
    "questionCues": [
      "全球多达 10,000 名用户将上传他们的图像",
      "然后将其发布在公司网站上",
      "将在上传的图像上覆盖文本"
    ],
    "answerCues": {
      "C": [
        "使用 Amazon CloudWatch 伫列深度指标来横向扩展 EC2 实例",
        "启用Amazon CloudFront并将来源配置为包含已处理影像的S3储存桶"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "289": {
    "when": "并且不能容忍高应用程式延迟或过时的数据 + 欧洲客户必须能够存取与美国 (US) 客户相同的数据 + 两组客户都需要即时查看另一组的更新",
    "target": "将 Aurora 副本提升为独立资料库集群 + 重新配置应用程式以使用Aurora资料库并恢复写入",
    "avoid": "别选“将 MySQL 资料库实例的 RDS 转换为 Amazon Aurora MySQL 资料库集群”。",
    "questionCues": [
      "并且不能容忍高应用程式延迟或过时的数据",
      "欧洲客户必须能够存取与美国 (US) 客户相同的数据",
      "两组客户都需要即时查看另一组的更新"
    ],
    "answerCues": {
      "A": [
        "将 Aurora 副本提升为独立资料库集群",
        "重新配置应用程式以使用Aurora资料库并恢复写入"
      ]
    },
    "disputed": true,
    "legacyMismatch": true
  },
  "290": {
    "when": "解决方案架构师必须实施一个解决方案来提高可用性、最大限度地降低基础设施管理的复杂性 + EC2 执行个体还具有附加的安全性群组",
    "target": "使用 VPC 托管、面向 Internet 的端点设定 Transfer Family 伺服器 + 将具有客户 IP 位址的安全群组附加到新端点",
    "avoid": "别选“使用可公开存取的端点设定 Transfer Family 伺服器”。",
    "questionCues": [
      "解决方案架构师必须实施一个解决方案来提高可用性、最大限度地降低基础设施管理的复杂性",
      "EC2 执行个体还具有附加的安全性群组"
    ],
    "answerCues": {
      "B": [
        "使用 VPC 托管、面向 Internet 的端点设定 Transfer Family 伺服器",
        "将具有客户 IP 位址的安全群组附加到新端点"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "291": {
    "when": "每晚计算总计统计资料的过程需要 4 小时才能完成 + 公司需要确定是否购买新的预订或实施新的设计 + 这些 EC2 实例全职运行",
    "target": "更新摄取流程以使用Amazon Kinesis Data Firehose将资料储存至Amazon S3 + 将 AWS Batch 与 Spot 实例结合使用",
    "avoid": "别选“使用计划脚本每晚启动一组EC2按需实例来执行S3资料的批次”。",
    "questionCues": [
      "每晚计算总计统计资料的过程需要 4 小时才能完成",
      "公司需要确定是否购买新的预订或实施新的设计",
      "这些 EC2 实例全职运行"
    ],
    "answerCues": {
      "B": [
        "更新摄取流程以使用Amazon Kinesis Data Firehose将资料储存至Amazon S3",
        "将 AWS Batch 与 Spot 实例结合使用"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "292": {
    "when": "某公司需要将on-premises SFTP站点迁移到AWS + 解决方案架构师必须实现高可用性 + 作为迁移到AWS的一部分",
    "target": "为 Transfer Family 伺服器配置面向网际网路的 VPC 端点 + 修改存取现有 NFS 共享的下游应用程式的配置以挂载 EFS 端点",
    "avoid": "别选“为 Transfer Family 伺服器配置可公开存取的端点”。",
    "questionCues": [
      "某公司需要将on-premises SFTP站点迁移到AWS",
      "解决方案架构师必须实现高可用性",
      "作为迁移到AWS的一部分"
    ],
    "answerCues": {
      "A": [
        "为 Transfer Family 伺服器配置面向网际网路的 VPC 端点",
        "修改存取现有 NFS 共享的下游应用程式的配置以挂载 EFS 端点"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "293": {
    "when": "解决方案架构师希望采用新的可用区 + 且连线不能中断 + Auto Scaling 群组的最大大小为 20 个服务实例",
    "target": "调整 Auto Scaling 组以也使用新的 AZ1 子网路 + 删除目前的 AZ2 子网路",
    "avoid": "别选“调整 Auto Scaling 组以再次使用 AZ1 子网路”。",
    "questionCues": [
      "解决方案架构师希望采用新的可用区",
      "且连线不能中断",
      "Auto Scaling 群组的最大大小为 20 个服务实例"
    ],
    "answerCues": {
      "A": [
        "调整 Auto Scaling 组以也使用新的 AZ1 子网路",
        "删除目前的 AZ2 子网路"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "294": {
    "when": "某公司使用AWS Organizations中的组织来管理公司的AWS帐户 + 该公司希望强制对新资源使用项目标签",
    "target": "建立标签策略 + 其中包含组织管理帐户中允许的项目标签值",
    "avoid": "别选“其中包含每个 OU 中允许的项目标签值”；认准“建立标签策略”。",
    "questionCues": [
      "某公司使用AWS Organizations中的组织来管理公司的AWS帐户",
      "该公司希望强制对新资源使用项目标签"
    ],
    "answerCues": {
      "A": [
        "建立标签策略",
        "其中包含组织管理帐户中允许的项目标签值"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "295": {
    "when": "解决方案架构师需要实施一个解决方案来永久降低EC2成本并提高利用率 + Auto Scaling 群组配置仅使用一种类型的实例",
    "target": "使用有关应用程式的 CPU 和记忆体利用率的资讯在 Auto Scaling 群组启动范本的新版本中 + 从配置中删除目前实例类型",
    "avoid": "别选“修改 Auto Scaling 群组的启动范本配置以使用清单中的多种实例类型”。",
    "questionCues": [
      "解决方案架构师需要实施一个解决方案来永久降低EC2成本并提高利用率",
      "Auto Scaling 群组配置仅使用一种类型的实例"
    ],
    "answerCues": {
      "C": [
        "使用有关应用程式的 CPU 和记忆体利用率的资讯在 Auto Scaling 群组启动范本的新版本中",
        "从配置中删除目前实例类型"
      ]
    },
    "disputed": true,
    "legacyMismatch": true
  },
  "296": {
    "when": "该公司使用 AWS CloudFormation 实现基础设施配置自动化 + 该公司使用AWSCodePipeline自动化应用程式部署",
    "target": "AWS Backup + 实作Amazon Route 53故障转移路由",
    "avoid": "别选“Lambda 将DynamoDB 资料库复制到辅助资料库⟦T12​​6⟧”；认准“AWS Backup”。",
    "questionCues": [
      "该公司使用 AWS CloudFormation 实现基础设施配置自动化",
      "该公司使用AWSCodePipeline自动化应用程式部署"
    ],
    "answerCues": {
      "C": [
        "AWS Backup",
        "实作Amazon Route 53故障转移路由"
      ]
    },
    "disputed": true,
    "legacyMismatch": true
  },
  "297": {
    "when": "该应用程式利用 Amazon CloudFront 实现全局可扩展性和性能 + CloudFront快取命中率一直在稳步下降",
    "target": "选择CloudFront查看器请求触发器来呼叫函数 + 部署 Lambda@Edge 函数会依名称对参数进行排序并强制它们为小写",
    "avoid": "别选“更新 CloudFront 发行版以根据查询字串参数停用快取”；认准“选择CloudFront查看器请求触发器来呼叫函数”。",
    "questionCues": [
      "该应用程式利用 Amazon CloudFront 实现全局可扩展性和性能",
      "CloudFront快取命中率一直在稳步下降"
    ],
    "answerCues": {
      "A": [
        "选择CloudFront查看器请求触发器来呼叫函数",
        "部署 Lambda@Edge 函数会依名称对参数进行排序并强制它们为小写"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "298": {
    "when": "公司需要将Aurora资料库中的资料复制到另一个Region + 公司的RPO为1小时 + 资料库集群全天经历大量写入事务",
    "target": "将正在进行的变更从 Aurora 资料库复制到另一个 Region 中的 Amazon S3 储存桶 + 使用 AWS Database Migration Service（AWSDMS）",
    "avoid": "别选“将Aurora资料库修改为Aurora全域资料库”。",
    "questionCues": [
      "公司需要将Aurora资料库中的资料复制到另一个Region",
      "公司的RPO为1小时",
      "资料库集群全天经历大量写入事务"
    ],
    "answerCues": {
      "C": [
        "将正在进行的变更从 Aurora 资料库复制到另一个 Region 中的 Amazon S3 储存桶",
        "使用 AWS Database Migration Service（AWSDMS）"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "299": {
    "when": "公司需要使应用程式具有高可用性 + 修补程式曾导致停机 + 应用伺服器EC2实例的CPU利用率经常达到100%",
    "target": "使用 Auto Scaling 组中较小的实例 + 使用新的 AMI 为 Auto Scaling 群组建立启动模板",
    "avoid": "别选“将资料库迁移到Amazon DynamoDB”；认准“使用 Auto Scaling 组中较小的实例”。",
    "questionCues": [
      "公司需要使应用程式具有高可用性",
      "修补程式曾导致停机",
      "应用伺服器EC2实例的CPU利用率经常达到100%"
    ],
    "answerCues": {
      "D": [
        "使用 Auto Scaling 组中较小的实例",
        "使用新的 AMI 为 Auto Scaling 群组建立启动模板"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "300": {
    "when": "公司应该如何识别需要与应用程式相同阶段迁移的依赖项 + 该公司希望将应用程式和这些依赖项一起迁移 + 以同时将所有低延迟介面移至AWS",
    "target": "以识别在连接埠 1000 上通讯的伺服器 + 在 Amazon Athena 中开启资料探索",
    "avoid": "别选“使用 Amazon Athena 查询日志以寻找在连接埠 1000 上通讯的伺服器”。",
    "questionCues": [
      "公司应该如何识别需要与应用程式相同阶段迁移的依赖项",
      "该公司希望将应用程式和这些依赖项一起迁移",
      "以同时将所有低延迟介面移至AWS"
    ],
    "answerCues": {
      "A": [
        "以识别在连接埠 1000 上通讯的伺服器",
        "在 Amazon Athena 中开启资料探索"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "301": {
    "when": "有些客户必须在更短的时间内获得更高的配额 + 配额必须符合客户的使用模式 + 该公司希望为每个客户提供特定时间内的请求配额",
    "target": "Amazon API Gateway REST API + 为每位客户配置一个API Gateway 使用计划",
    "avoid": "别选“Amazon API Gateway HTTP API”；认准“Amazon API Gateway REST API”。",
    "questionCues": [
      "有些客户必须在更短的时间内获得更高的配额",
      "配额必须符合客户的使用模式",
      "该公司希望为每个客户提供特定时间内的请求配额"
    ],
    "answerCues": {
      "A": [
        "Amazon API Gateway REST API",
        "为每位客户配置一个API Gateway 使用计划"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "302": {
    "when": "该公司已建立到 AWS 的 10 Gbps AWS Direct Connect 连接以进行迁移 + 迁移到 AWS",
    "target": "配置 AWS DataSync + 透过 Direct Connect 连接将 NFS 伺服器资料复制到 EFS 档案系统",
    "avoid": "别选“将 NFS 伺服器资料从 Amazon S3 复制到 EFS 档案系统”；认准“配置 AWS DataSync”。",
    "questionCues": [
      "该公司已建立到 AWS 的 10 Gbps AWS Direct Connect 连接以进行迁移",
      "迁移到 AWS"
    ],
    "answerCues": {
      "B": [
        "配置 AWS DataSync",
        "透过 Direct Connect 连接将 NFS 伺服器资料复制到 EFS 档案系统"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "303": {
    "when": "敏感资料在应用程式中移动时必须进行加密 + ALB 是Amazon CloudFront 发行版的自订来源 + ECS",
    "target": "将公钥上传到CloudFront发行版 + 建立现场级加密设定档和配置",
    "avoid": "别选“将 KMS 键和配置与 CloudFront 快取行为相关联”；认准“将公钥上传到CloudFront发行版”。",
    "questionCues": [
      "敏感资料在应用程式中移动时必须进行加密",
      "ALB 是Amazon CloudFront 发行版的自订来源",
      "ECS"
    ],
    "answerCues": {
      "B": [
        "将公钥上传到CloudFront发行版",
        "建立现场级加密设定档和配置"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "304": {
    "when": "新要求强制DNS 查询必须使用私人托管区域 + 具有公用 IP 位址的执行个体必须接收对应的公用主机名称 + VPC",
    "target": "建立私人托管区域 将私人托管区域与 VPC 关联 + 并配置domain-name-servers=AmazonProvidedDNS",
    "avoid": "别选“更新 VPC DHCP 选项集以包含domain-name-servers=10.24.34.2”。",
    "questionCues": [
      "新要求强制DNS 查询必须使用私人托管区域",
      "具有公用 IP 位址的执行个体必须接收对应的公用主机名称",
      "VPC"
    ],
    "answerCues": {
      "B": [
        "建立私人托管区域 将私人托管区域与 VPC 关联",
        "并配置domain-name-servers=AmazonProvidedDNS"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "305": {
    "when": "解决方案架构师必须设计一个能够适应突发使用的解决方案 + 业务需求决定集群必须能够始终为读写查询提供服务 + 产生报告的查询是复杂的读取查询",
    "target": "开启 Amazon Redshift 集群的并发扩充功能",
    "avoid": "别选“配置一个Amazon EMR集群来承担复杂的资料处理任务”；认准“开启 Amazon Redshift 集群的并发扩充功能”。",
    "questionCues": [
      "解决方案架构师必须设计一个能够适应突发使用的解决方案",
      "业务需求决定集群必须能够始终为读写查询提供服务",
      "产生报告的查询是复杂的读取查询"
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
    "when": "该研究中心的合规官员担心科学家将能够访问彼此的工作成果 + 并且需要一个现成的解决方案来最大限度地减少营运开销 + 迁移到 AWS 云",
    "target": "A：指定 S3 路径必须以 $(aws:username) 为前缀；B：使用 AWS CloudTrail 配置追踪以撷取 S3 储存桶中的所有物件级事件",
    "avoid": "别选“为科学家的 IAM 使用者群组中的使用者授予读写存取权限”；认准“指定 S3 路径必须以 $(aws:username) 为前缀”。",
    "questionCues": [
      "该研究中心的合规官员担心科学家将能够访问彼此的工作成果",
      "并且需要一个现成的解决方案来最大限度地减少营运开销",
      "迁移到 AWS 云"
    ],
    "answerCues": {
      "A": [
        "指定 S3 路径必须以 $(aws:username) 为前缀"
      ],
      "B": [
        "使用 AWS CloudTrail 配置追踪以撷取 S3 储存桶中的所有物件级事件"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "307": {
    "when": "该公司希望只保留最近 5 张未标记的图像 + 该公司希望保留所有标记的图像 + 某公司使用AWS Organizations来管理多帐户结构",
    "target": "为储存库建立仅允许所需的 ECR 操作的权限策略 + 则包括允许 ECR 操作的条件",
    "avoid": "别选“配置 Amazon ECR 以使用介面 VPC 端点以及端点策略”；认准“为储存库建立仅允许所需的 ECR 操作的权限策略”。",
    "questionCues": [
      "该公司希望只保留最近 5 张未标记的图像",
      "该公司希望保留所有标记的图像",
      "某公司使用AWS Organizations来管理多帐户结构"
    ],
    "answerCues": {
      "A": [
        "为储存库建立仅允许所需的 ECR 操作的权限策略",
        "则包括允许 ECR 操作的条件"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "308": {
    "when": "解决方案架构师需要建议每 6 小时拍摄一次快照并将快照保留 30 天的解决方案 + 公司需要对 RDS 快照的运作状况有一个综合视图",
    "target": "使用 AWS Backup 监控备份的状态 + 使用标签套用备份计划",
    "avoid": "别选“建立指定频率和保留需求的 Amazon Data Lifecycle Manager 生命周期策略”。",
    "questionCues": [
      "解决方案架构师需要建议每 6 小时拍摄一次快照并将快照保留 30 天的解决方案",
      "公司需要对 RDS 快照的运作状况有一个综合视图"
    ],
    "answerCues": {
      "A": [
        "使用 AWS Backup 监控备份的状态",
        "使用标签套用备份计划"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "309": {
    "when": "解决方案架构师需要允许 Account A 中的 IAM 使用者承担Account B 中的角色 + 公司目前帐户架构的安全性",
    "target": "A：将 SCP 配置为 Account A 以允许该操作；C：在 Account A 中为使用者配置基于身分的策略以允许该操作；E：在Account B中配置目标角色的信任策略以允许该操作",
    "avoid": "别选“配置基于资源的策略以允许该操作”；认准“将 SCP 配置为 Account A 以允许该操作”。",
    "questionCues": [
      "解决方案架构师需要允许 Account A 中的 IAM 使用者承担Account B 中的角色",
      "公司目前帐户架构的安全性"
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
    "when": "如果公司需要归档文件进行灾难恢复 + 并且该公司希望其新解决方案支援NFS + 该公司希望在 5 天后归档备份档案",
    "target": "AWS Storage Gateway 档案闸道 + 在 5 天后将档案移至 S3 Glacier Deep Archive",
    "avoid": "别选“部署与 S3 储存桶关联的 AWS Storage Gateway 卷闸网关”。",
    "questionCues": [
      "如果公司需要归档文件进行灾难恢复",
      "并且该公司希望其新解决方案支援NFS",
      "该公司希望在 5 天后归档备份档案"
    ],
    "answerCues": {
      "D": [
        "AWS Storage Gateway 档案闸道",
        "在 5 天后将档案移至 S3 Glacier Deep Archive"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "311": {
    "when": "以最大限度地降低公司的每月整体成本 + 解决方案架构师必须推荐一种解决方案 + EC2 实例承受持续稳定的负载",
    "target": "购买 EC2 实例储蓄计划以涵盖 EC2 实例 + 购买 Lambda 运算节省计划以满足 Lambda 函数的最低预期消耗",
    "avoid": "别选“购买计算节省计划以涵盖 EC2 实例”；认准“购买 EC2 实例储蓄计划以涵盖 EC2 实例”。",
    "questionCues": [
      "以最大限度地降低公司的每月整体成本",
      "解决方案架构师必须推荐一种解决方案",
      "EC2 实例承受持续稳定的负载"
    ],
    "answerCues": {
      "A": [
        "购买 EC2 实例储蓄计划以涵盖 EC2 实例",
        "购买 Lambda 运算节省计划以满足 Lambda 函数的最低预期消耗"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "312": {
    "when": "用户必须自动连接到提供最低延迟的Region + 使任何Region能够扩展以处理所有Regions的负载 + 该游戏必须在全球范围内发售",
    "target": "该条目使用基于延迟的路由并指向该 Region 中的 NLB + Amazon DynamoDB",
    "avoid": "别选“在每个 Region 中的资料库 EC2 实例之间设定复制”；认准“该条目使用基于延迟的路由并指向该 Region 中的 NLB”。",
    "questionCues": [
      "用户必须自动连接到提供最低延迟的Region",
      "使任何Region能够扩展以处理所有Regions的负载",
      "该游戏必须在全球范围内发售"
    ],
    "answerCues": {
      "C": [
        "该条目使用基于延迟的路由并指向该 Region 中的 NLB",
        "Amazon DynamoDB"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "313": {
    "when": "该方法优先考虑可靠性并最大限度地减少单一AWSRegion内防火墙设备之间的故障转移时间 + 该公司希望将此设备部署到共享服务VPC 中",
    "target": "A：单独的 Availability Zone；C：Gateway Load Balancer；F：建立 VPC Gateway Load Balancer 端点",
    "avoid": "别选“在共享服务VPC中建立新的Network Load Balancer”；认准“单独的 Availability Zone”。",
    "questionCues": [
      "该方法优先考虑可靠性并最大限度地减少单一AWSRegion内防火墙设备之间的故障转移时间",
      "该公司希望将此设备部署到共享服务VPC 中"
    ],
    "answerCues": {
      "A": [
        "单独的 Availability Zone"
      ],
      "C": [
        "Gateway Load Balancer"
      ],
      "F": [
        "建立 VPC Gateway Load Balancer 端点"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "314": {
    "when": "解决方案架构师需要将on-premises旧应用程式迁移到AWS + 关联的许可证文件 软体供应商需要 12 小时才能发送新的许可证文件",
    "target": "A：附加到 Amazon EC2 实例；D：AWS Systems ManagerParameter Store",
    "avoid": "别选“将许可证文件储存在 Amazon EC2 实例上”；认准“附加到 Amazon EC2 实例”。",
    "questionCues": [
      "解决方案架构师需要将on-premises旧应用程式迁移到AWS",
      "关联的许可证文件 软体供应商需要 12 小时才能发送新的许可证文件"
    ],
    "answerCues": {
      "A": [
        "附加到 Amazon EC2 实例"
      ],
      "D": [
        "AWS Systems ManagerParameter Store"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "315": {
    "when": "以最大限度地减少下载报告的使用者的延迟 + 解决方案架构师必须设计一种解决方案 + 该公司计划将业务扩展至欧洲",
    "target": "配置跨Region只读副本将Route 53记录更改为基于延迟的路由以连接到API GatewayAPI + 在新的Region中为RDS资料库",
    "avoid": "别选“将Route 53记录更改为地理位置路由以连接到API Gateway API”。",
    "questionCues": [
      "以最大限度地减少下载报告的使用者的延迟",
      "解决方案架构师必须设计一种解决方案",
      "该公司计划将业务扩展至欧洲"
    ],
    "answerCues": {
      "C": [
        "配置跨Region只读副本将Route 53记录更改为基于延迟的路由以连接到API GatewayAPI",
        "在新的Region中为RDS资料库"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "316": {
    "when": "测试环境必须能够与中央伺服器通讯以报告测试结果 + 解决方案架构师必须实施解决方案 + 软体公司需要创建短期测试环境来测试拉取请求",
    "target": "使用AWS CloudFormation将所有测试环境部署到VPC中 + 为测试环境建立一个 VPC",
    "avoid": "别选“为每个测试环境部署新的VPC”；认准“使用AWS CloudFormation将所有测试环境部署到VPC中”。",
    "questionCues": [
      "测试环境必须能够与中央伺服器通讯以报告测试结果",
      "解决方案架构师必须实施解决方案",
      "软体公司需要创建短期测试环境来测试拉取请求"
    ],
    "answerCues": {
      "B": [
        "使用AWS CloudFormation将所有测试环境部署到VPC中",
        "为测试环境建立一个 VPC"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "317": {
    "when": "解决方案架构师需要更改公司 API 的 API 元件 + 供应商 API 的 API 金钥储存在 AWS Secrets Manager 中",
    "target": "A：实施 Route 53 多值应答路由策略；B：建立新的 KMS 多Region 客户管理金钥；C：选择适当的 KMS 金钥",
    "avoid": "别选“在每个范围内 Region 中建立新的 AWS 托管 KMS 金钥”；认准“实施 Route 53 多值应答路由策略”。",
    "questionCues": [
      "解决方案架构师需要更改公司 API 的 API 元件",
      "供应商 API 的 API 金钥储存在 AWS Secrets Manager 中"
    ],
    "answerCues": {
      "A": [
        "实施 Route 53 多值应答路由策略"
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
    "when": "该公司希望将其应用程式和资料库迁移到AWS + 该公司希望透过开展更多行销活动和促销活动来扩大客户群 + 以提高其架构的可靠性",
    "target": "将会话储存在 Redis 复制群组的 Amazon ElastiCache 中 + 将资料库迁移到AmazonAuroraMySQL",
    "avoid": "别选“将资料库迁移到Amazon RDS MariaDB Multi-AZ 资料库实例”。",
    "questionCues": [
      "该公司希望将其应用程式和资料库迁移到AWS",
      "该公司希望透过开展更多行销活动和促销活动来扩大客户群",
      "以提高其架构的可靠性"
    ],
    "answerCues": {
      "B": [
        "将会话储存在 Redis 复制群组的 Amazon ElastiCache 中",
        "将资料库迁移到AmazonAuroraMySQL"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "319": {
    "when": "此解决方案必须将集中用户管理与公司的on-premisesActive Directory整合 + 该公司拥有可用于",
    "target": "配置存取AWS Systems Manager的权限集 + 使用 Systems Manager Fleet Manager 透过 RDP 存取目标实例",
    "avoid": "别选“在 VPC 中部署 EC2 实例作为堡垒主机”；认准“配置存取AWS Systems Manager的权限集”。",
    "questionCues": [
      "此解决方案必须将集中用户管理与公司的on-premisesActive Directory整合",
      "该公司拥有可用于"
    ],
    "answerCues": {
      "B": [
        "配置存取AWS Systems Manager的权限集",
        "使用 Systems Manager Fleet Manager 透过 RDP 存取目标实例"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "320": {
    "when": "解决方案架构师必须实作一个解决方案来加密所有新的静态磁碟区EBS + 一家公司的合规性审计显示 + Amazon EBS",
    "target": "所有 AWS Regions 预设开启 EBS 加密",
    "avoid": "别选“使用 AWS Systems Manager 自动化加密磁碟区”；认准“所有 AWS Regions 预设开启 EBS 加密”。",
    "questionCues": [
      "解决方案架构师必须实作一个解决方案来加密所有新的静态磁碟区EBS",
      "一家公司的合规性审计显示",
      "Amazon EBS"
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
    "when": "需要云端运维工程师透过 SSH 连接到 EC2 执行个体来解决问题 + 任何 EC2 实例都不能使用相同的 SSH 金钥",
    "target": "指导工程师使用基于浏览器的 SSH 用户端从 EC2 控制台连线到执行个体 + 在每个实例上设定 EC2 Instance Connect",
    "avoid": "别选“并使用 GetSecretValue 操作的允许语句将其附加到工程师的 IAM 角色”。",
    "questionCues": [
      "需要云端运维工程师透过 SSH 连接到 EC2 执行个体来解决问题",
      "任何 EC2 实例都不能使用相同的 SSH 金钥"
    ],
    "answerCues": {
      "C": [
        "指导工程师使用基于浏览器的 SSH 用户端从 EC2 控制台连线到执行个体",
        "在每个实例上设定 EC2 Instance Connect"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "322": {
    "when": "一家公司正在迁移行动银行应用程式以在 VPC 中的 Amazon EC2 实例上运行 + 运行的应用程式需要将 DNS 请求解析到在资料中心",
    "target": "使用 Amazon Route 53 解析器建立 DNS 端点 + 新增条件转送规则以解析on-premises资料中心和VPC之间的DNS命名空间",
    "avoid": "别选“在 VPC 中的两个 Availability Zones 上配置一组 EC2 实例作为快取 DNS 伺服器”。",
    "questionCues": [
      "一家公司正在迁移行动银行应用程式以在 VPC 中的 Amazon EC2 实例上运行",
      "运行的应用程式需要将 DNS 请求解析到在资料中心"
    ],
    "answerCues": {
      "C": [
        "使用 Amazon Route 53 解析器建立 DNS 端点",
        "新增条件转送规则以解析on-premises资料中心和VPC之间的DNS命名空间"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "323": {
    "when": "该公司希望使用 AWS 解决方案将资料传送到不需要固定架构储存的资料库 + 数据必须即时发送 + 数据以 JSON 格式提供",
    "target": "使用Amazon Kinesis Data Streams将资料传送到Amazon DynamoDB",
    "avoid": "别选“使用Amazon Kinesis Data Firehose将资料传送到AmazonRedshift”。",
    "questionCues": [
      "该公司希望使用 AWS 解决方案将资料传送到不需要固定架构储存的资料库",
      "数据必须即时发送",
      "数据以 JSON 格式提供"
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
    "when": "资料库必须能够根据需求进行扩展 + 所有Amazon EC2实例必须托管在没有网路连线的私有子网路中 + 迁移到AWS",
    "target": "使用 DynamoDB 的闸道 VPC 端点连接到 DynamoDB 表 + 为具有按需容量的应用程式建立新的Amazon DynamoDB表",
    "avoid": "别选“使用 DynamoDB 的介面 VPC 端点连接到 DynamoDB 表”。",
    "questionCues": [
      "资料库必须能够根据需求进行扩展",
      "所有Amazon EC2实例必须托管在没有网路连线的私有子网路中",
      "迁移到AWS"
    ],
    "answerCues": {
      "B": [
        "使用 DynamoDB 的闸道 VPC 端点连接到 DynamoDB 表",
        "为具有按需容量的应用程式建立新的Amazon DynamoDB表"
      ]
    },
    "disputed": true,
    "legacyMismatch": true
  },
  "325": {
    "when": "迁移到 Amazon DocumentDB（具有 MongoDB 相容性） + 解决方案架构师应该 + Amazon EC2",
    "target": "建立并运行DMS迁移任务 + 为 Amazon DocumentDB 资料库建立目标端点",
    "avoid": "别选“在EC2实例上安装MongoDB社群版”；认准“建立并运行DMS迁移任务”。",
    "questionCues": [
      "迁移到 Amazon DocumentDB（具有 MongoDB 相容性）",
      "解决方案架构师应该",
      "Amazon EC2"
    ],
    "answerCues": {
      "B": [
        "建立并运行DMS迁移任务",
        "为 Amazon DocumentDB 资料库建立目标端点"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "326": {
    "when": "该公司还希望实施增强的安全流程 + 要求所有 Windows EC2 实例加入到 AWS 上的 Active Directory 域",
    "target": "为 Microsoft Active Directory 实作建立 AWS Directory Service + 启动 EC2 实例",
    "avoid": "别选“建立一个 AWS Directory Service 简单的 AD 实作”。",
    "questionCues": [
      "该公司还希望实施增强的安全流程",
      "要求所有 Windows EC2 实例加入到 AWS 上的 Active Directory 域"
    ],
    "answerCues": {
      "B": [
        "为 Microsoft Active Directory 实作建立 AWS Directory Service",
        "启动 EC2 实例"
      ]
    },
    "disputed": true,
    "legacyMismatch": true
  },
  "327": {
    "when": "该公司还需要在另一个AWSRegion中实现复制以进行灾难复原 + 公司需要将产品资料与使用者会话资料解耦 + 迁移到AWS",
    "target": "建立一个 Amazon DynamoDB 全域表来托管使用者会话资料 + 建立一个 Amazon RDS 资料库执行个体来托管产品资料",
    "avoid": "别选“使用DynamoDB Accelerator (DAX)进行快取”。",
    "questionCues": [
      "该公司还需要在另一个AWSRegion中实现复制以进行灾难复原",
      "公司需要将产品资料与使用者会话资料解耦",
      "迁移到AWS"
    ],
    "answerCues": {
      "D": [
        "建立一个 Amazon DynamoDB 全域表来托管使用者会话资料",
        "建立一个 Amazon RDS 资料库执行个体来托管产品资料"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "328": {
    "when": "该公司希望优化这些开发帐户的成本 + 该公司希望禁止使用其他不相关的服务 + 该公司有一个专门用于开发帐户的OU",
    "target": "在AWS Control Tower中建立自订预防控制（护栏） + 将控制（护栏）应用到开发OU",
    "avoid": "别选“配置 AWS Cong 规则以仅允许部署可突发实例并禁止不相关的服务”。",
    "questionCues": [
      "该公司希望优化这些开发帐户的成本",
      "该公司希望禁止使用其他不相关的服务",
      "该公司有一个专门用于开发帐户的OU"
    ],
    "answerCues": {
      "C": [
        "在AWS Control Tower中建立自订预防控制（护栏）",
        "将控制（护栏）应用到开发OU"
      ]
    },
    "disputed": false,
    "legacyMismatch": true
  },
  "329": {
    "when": "解决方案架构师需要在不对应用程式架构进行重大变更的情况下解决此问题 + 分析发现CloudFormation删除已有的S3桶失败",
    "target": "从给定的 S3 储存桶中删除所有档案 + 确保自订资源具有指向 S3 储存桶资源的 DependsOn 属性",
    "avoid": "别选“修改 CloudFormation 堆叠以建立 S3 生命周期规则”；认准“从给定的 S3 储存桶中删除所有档案”。",
    "questionCues": [
      "解决方案架构师需要在不对应用程式架构进行重大变更的情况下解决此问题",
      "分析发现CloudFormation删除已有的S3桶失败"
    ],
    "answerCues": {
      "A": [
        "从给定的 S3 储存桶中删除所有档案",
        "确保自订资源具有指向 S3 储存桶资源的 DependsOn 属性"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "330": {
    "when": "管理层要求解决方案架构师提供一个云端架构 + 该架构可以处理游戏的变化负载并提供低延迟的资料存取 + 取得玩家会话资料时也存在延迟问题",
    "target": "使用 Amazon API Gateway 实作 REST API + 运行AWS Lambda中的业务逻辑",
    "avoid": "别选“使用 Application Load Balancer (ALB) 实作 REST API”。",
    "questionCues": [
      "管理层要求解决方案架构师提供一个云端架构",
      "该架构可以处理游戏的变化负载并提供低延迟的资料存取",
      "取得玩家会话资料时也存在延迟问题"
    ],
    "answerCues": {
      "C": [
        "使用 Amazon API Gateway 实作 REST API",
        "运行AWS Lambda中的业务逻辑"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "331": {
    "when": "解决方案架构师必须建立一个流程 + 在迁移切换之前 + 公司迁移应用程式后",
    "target": "配置DataSync计划任务 + 每24小时将影像传送至EFS档案系统",
    "avoid": "别选“并将影像从Amazon S3复制到EFS档案系统”；认准“配置DataSync计划任务”。",
    "questionCues": [
      "解决方案架构师必须建立一个流程",
      "在迁移切换之前",
      "公司迁移应用程式后"
    ],
    "answerCues": {
      "D": [
        "配置DataSync计划任务",
        "每24小时将影像传送至EFS档案系统"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "332": {
    "when": "该公司要求 Web 应用程式必须只能透过使用 CloudFront 端点进行存取 + 最近的安全审计显示 + 迁移到AWS 云端",
    "target": "面向 com.amazonaws.global.cloudfront.origin 的 CloudFront 托管前缀清单",
    "avoid": "别选“建立一个新的安全群组并将其附加到CloudFront发行版”。",
    "questionCues": [
      "该公司要求 Web 应用程式必须只能透过使用 CloudFront 端点进行存取",
      "最近的安全审计显示",
      "迁移到AWS 云端"
    ],
    "answerCues": {
      "B": [
        "面向 com.amazonaws.global.cloudfront.origin 的 CloudFront 托管前缀清单"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "333": {
    "when": "下列哪一个解决方案是满足要求的最具成本效益的方法 + 该公司需要为其客户提供RTO不超过24小时和RPO不超过8小时的灾难复原SLA",
    "target": "使用AWS CloudFormation部署Secondary Region中的ALB、EC2、ECS、RDS资源",
    "avoid": "别选“部署到EC2实例”。",
    "questionCues": [
      "下列哪一个解决方案是满足要求的最具成本效益的方法",
      "该公司需要为其客户提供RTO不超过24小时和RPO不超过8小时的灾难复原SLA"
    ],
    "answerCues": {
      "B": [
        "使用AWS CloudFormation部署Secondary Region中的ALB、EC2、ECS、RDS资源"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "334": {
    "when": "但它必须允许灵活地满足各种AWS帐户内的不同合规性要求 + 此解决方案必须提供一致的管理和安全基线 + 解决方案架构师需要准备基线基础架构",
    "target": "根据需要添加OU + 在组织上启用AWS Control Tower",
    "avoid": "别选“创建 SCP 以获得最低权限访问”；认准“根据需要添加OU”。",
    "questionCues": [
      "但它必须允许灵活地满足各种AWS帐户内的不同合规性要求",
      "此解决方案必须提供一致的管理和安全基线",
      "解决方案架构师需要准备基线基础架构"
    ],
    "answerCues": {
      "B": [
        "根据需要添加OU",
        "在组织上启用AWS Control Tower"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "335": {
    "when": "最佳性能是发布后一周的首要任务 + 一组用于 Web 和应用程式伺服器的 Amazon EC2 实例 + 网站的部分内容包含静态内容",
    "target": "D：将 Amazon S3 与跨 Region 复制结合使用以取得静态内容和资源；E：Amazon Route 53",
    "avoid": "别选“以跨Region复制模式部署S3桶”；认准“将 Amazon S3 与跨 Region 复制结合使用以取得静态内容和资源”。",
    "questionCues": [
      "最佳性能是发布后一周的首要任务",
      "一组用于 Web 和应用程式伺服器的 Amazon EC2 实例",
      "网站的部分内容包含静态内容"
    ],
    "answerCues": {
      "D": [
        "将 Amazon S3 与跨 Region 复制结合使用以取得静态内容和资源"
      ],
      "E": [
        "Amazon Route 53"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "336": {
    "when": "分析应用程式可以毫无问题地中断和恢复 + 并且必须始终可用 + 一家线上游戏公司需要优化 AWS 上的工作负载成本",
    "target": "为线上游戏应用程式实例购买EC2实例节省计划 + 将 Spot 实例用于分析应用程式",
    "avoid": "别选“将按需实例用于分析应用程式”；认准“为线上游戏应用程式实例购买EC2实例节省计划”。",
    "questionCues": [
      "分析应用程式可以毫无问题地中断和恢复",
      "并且必须始终可用",
      "一家线上游戏公司需要优化 AWS 上的工作负载成本"
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
    "when": "即所有备份都必须能够抵御任何生产帐户中特权用户凭证的泄露 + 并使用 AWS Backup 进行集中备份作业 + 该公司制定了一项新政策",
    "target": "A：使用指定非生产帐户中的AWSBackup保管库实施跨帐户备份；C：为分配给 AWS Backup 的 IAM 服务角色实现最小权限存取；D：配置备份频率、生命周期和保留期限",
    "avoid": "别选“确保S3储存桶已启用S3物件锁定”；认准“使用指定非生产帐户中的AWSBackup保管库实施跨帐户备份”。",
    "questionCues": [
      "即所有备份都必须能够抵御任何生产帐户中特权用户凭证的泄露",
      "并使用 AWS Backup 进行集中备份作业",
      "该公司制定了一项新政策"
    ],
    "answerCues": {
      "A": [
        "使用指定非生产帐户中的AWSBackup保管库实施跨帐户备份"
      ],
      "C": [
        "为分配给 AWS Backup 的 IAM 服务角色实现最小权限存取"
      ],
      "D": [
        "配置备份频率、生命周期和保留期限"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "338": {
    "when": "解决方案架构师必须设计一个能够处理需要摄取的大量日志记录资料的解决方案 + 收集的日志必须保留在创建时的AWSRegion中",
    "target": "A：Amazon Kinesis；C：Amazon Kinesis；E：以规范中央日志记录帐户中的日志并将日志写入安全性工具",
    "avoid": "别选“以规范成员帐户中的日志并将日志写入安全性工具”；认准“Amazon Kinesis”。",
    "questionCues": [
      "解决方案架构师必须设计一个能够处理需要摄取的大量日志记录资料的解决方案",
      "收集的日志必须保留在创建时的AWSRegion中"
    ],
    "answerCues": {
      "A": [
        "Amazon Kinesis"
      ],
      "C": [
        "Amazon Kinesis"
      ],
      "E": [
        "以规范中央日志记录帐户中的日志并将日志写入安全性工具"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "339": {
    "when": "一家公司正在将遗留应用程式从on-premises资料中心迁移到AWS + 迁移应用程式 + Direct Connect",
    "target": "A：AWS SMS；D：AWS SMS",
    "avoid": "别选“AWS Snowball”；认准“AWS SMS”。",
    "questionCues": [
      "一家公司正在将遗留应用程式从on-premises资料中心迁移到AWS",
      "迁移应用程式",
      "Direct Connect"
    ],
    "answerCues": {
      "A": [
        "AWS SMS"
      ],
      "D": [
        "AWS SMS"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "340": {
    "when": "该公司希望控制哪些VPC可以与其他VPC进行通讯 + 该公司希望将其 AWS 帐户连接到其 on-premises 网路",
    "target": "A：AWS RAM；B：配置所有 VPC 和 VPN 的附件；C：将 VPC 和 VPN 与路由表关联",
    "avoid": "别选“配置 VPC 和 VPN 之间的附件”；认准“AWS RAM”。",
    "questionCues": [
      "该公司希望控制哪些VPC可以与其他VPC进行通讯",
      "该公司希望将其 AWS 帐户连接到其 on-premises 网路"
    ],
    "answerCues": {
      "A": [
        "AWS RAM"
      ],
      "B": [
        "配置所有 VPC 和 VPN 的附件"
      ],
      "C": [
        "将 VPC 和 VPN 与路由表关联"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "341": {
    "when": "解决方案架构师必须设计一个可以扩展以处理流量变化的解决方案 + 一家公司需要优化在AWS上的应用成本 + AWS Lambda",
    "target": "将资料库迁移到Aurora Serverless v1 + 购买计算节省计划",
    "avoid": "别选“购买计算节省计划和 RDS 预留实例”；认准“将资料库迁移到Aurora Serverless v1”。",
    "questionCues": [
      "解决方案架构师必须设计一个可以扩展以处理流量变化的解决方案",
      "一家公司需要优化在AWS上的应用成本",
      "AWS Lambda"
    ],
    "answerCues": {
      "D": [
        "将资料库迁移到Aurora Serverless v1",
        "购买计算节省计划"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "342": {
    "when": "追踪资料显示资料库无法处理高峰时段的读取负载 + 应用程式无法处理所有传入请求 + 必须复制到每个EBS卷",
    "target": "将 EFS 档案系统安装到每个容器 + 使用读取器资料库执行个体将资料库迁移到 Amazon Aurora MySQL Serverless v2",
    "avoid": "别选“将资料库迁移到 MySQL Multi-AZ 资料库集群的 Amazon RDS”；认准“将 EFS 档案系统安装到每个容器”。",
    "questionCues": [
      "追踪资料显示资料库无法处理高峰时段的读取负载",
      "应用程式无法处理所有传入请求",
      "必须复制到每个EBS卷"
    ],
    "answerCues": {
      "D": [
        "将 EFS 档案系统安装到每个容器",
        "使用读取器资料库执行个体将资料库迁移到 Amazon Aurora MySQL Serverless v2"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "343": {
    "when": "以分析请求的延迟并建立服务映射 + 解决方案架构师希望获得每个请求的端到端视图 + API Gateway",
    "target": "允许 API 呼叫者在存取端点时使用 AWS 签章对请求进行签署 + 对于API Gateway方法",
    "avoid": "别选“使用AmazonCloudWatch来追踪分析用户对API Gateway的请求”。",
    "questionCues": [
      "以分析请求的延迟并建立服务映射",
      "解决方案架构师希望获得每个请求的端到端视图",
      "API Gateway"
    ],
    "answerCues": {
      "A": [
        "允许 API 呼叫者在存取端点时使用 AWS 签章对请求进行签署",
        "对于API Gateway方法"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "344": {
    "when": "CloudFormation 模板中最近的资源变更导致了计划外停机 + 解决方案架构师应如何改进CI/CD管道以减少模板更改导致停机的可能性",
    "target": "在部署之前使用CloudFormation更改集评估更改 + 使用AWS CodeDeploy利用蓝/绿部署模式来允许评估和恢复变更的能力（如果需要）",
    "avoid": "别选“使用AWS CodeDeploy和CloudFormation的蓝/绿部署模式来取代使用者资料部署脚本”。",
    "questionCues": [
      "CloudFormation 模板中最近的资源变更导致了计划外停机",
      "解决方案架构师应如何改进CI/CD管道以减少模板更改导致停机的可能性"
    ],
    "answerCues": {
      "B": [
        "在部署之前使用CloudFormation更改集评估更改",
        "使用AWS CodeDeploy利用蓝/绿部署模式来允许评估和恢复变更的能力（如果需要）"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "345": {
    "when": "应用程式必须具有采用 us-west-1 Region 主动-被动配置的灾难复原功能 + 应用程式应动态扩展以满足用户需求并保持弹性",
    "target": "建立 Amazon Route 53 记录集 + 并启用故障转移路由策略和运行状况检查",
    "avoid": "别选“使用 Route 53 运行状况检查来跨 Regions 提供高可用性”；认准“建立 Amazon Route 53 记录集”。",
    "questionCues": [
      "应用程式必须具有采用 us-west-1 Region 主动-被动配置的灾难复原功能",
      "应用程式应动态扩展以满足用户需求并保持弹性"
    ],
    "answerCues": {
      "B": [
        "建立 Amazon Route 53 记录集",
        "并启用故障转移路由策略和运行状况检查"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "346": {
    "when": "公司必须完全控制网路和主机配置 + .NET Core 元件需要复杂的编排 + 并希望重构应用程式以在 AWS 上运行",
    "target": "将资料库托管在 Amazon Aurora MySQL Serverless v2 上 + 使用Amazon Simple Queue Service (Amazon SQS)进行非同步讯息传递",
    "avoid": "别选“Amazon SNS”；认准“将资料库托管在 Amazon Aurora MySQL Serverless v2 上”。",
    "questionCues": [
      "公司必须完全控制网路和主机配置",
      ".NET Core 元件需要复杂的编排",
      "并希望重构应用程式以在 AWS 上运行"
    ],
    "answerCues": {
      "D": [
        "将资料库托管在 Amazon Aurora MySQL Serverless v2 上",
        "使用Amazon Simple Queue Service (Amazon SQS)进行非同步讯息传递"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "347": {
    "when": "解决方案架构师应该如何解决这个问题 + Amazon EC2 + 解决方案架构师收到容量不足的错误",
    "target": "再次尝试启动 + 停止并启动置放群组中的所有实例",
    "avoid": "别选“使用分散安置组”；认准“再次尝试启动”。",
    "questionCues": [
      "解决方案架构师应该如何解决这个问题",
      "Amazon EC2",
      "解决方案架构师收到容量不足的错误"
    ],
    "answerCues": {
      "B": [
        "再次尝试启动",
        "停止并启动置放群组中的所有实例"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "348": {
    "when": "最新的安全性更新需要重新启动 + 公司政策要求每月在所有正在运行的作业系统上安装安全性更新 + Auto Scaling 群组终止了这些实例",
    "target": "A：透过设定更新策略来修改Auto Scaling组以将最旧的启动配置作为替换目标；D：建立自动化脚本来修补 AMI、更新启动配置并呼叫 Auto Scaling 实例刷新",
    "avoid": "别选“配置监控以确保目标群组运作状况检查在 Auto Scaling 群组替换终止的执行个体后恢复正常”。",
    "questionCues": [
      "最新的安全性更新需要重新启动",
      "公司政策要求每月在所有正在运行的作业系统上安装安全性更新",
      "Auto Scaling 群组终止了这些实例"
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
    "when": "解决方案架构师必须提供对 PyPI 储存库的访问 + SageMaker 实例部署在无法存取网际网路或从网际网路存取的VPC 中",
    "target": "为 CodeArtifact 建立一个 VPC 端点 + AWS CodeArtifact",
    "avoid": "别选“设定 VPC 路由以允许使用仅允许存取 PyPI 储存库端点的网路 ACL 存取网际网路”。",
    "questionCues": [
      "解决方案架构师必须提供对 PyPI 储存库的访问",
      "SageMaker 实例部署在无法存取网际网路或从网际网路存取的VPC 中"
    ],
    "answerCues": {
      "D": [
        "为 CodeArtifact 建立一个 VPC 端点",
        "AWS CodeArtifact"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "350": {
    "when": "该机构还需要保持尽可能低的营运费用 + 解决方案架构师为具有严格灾难复原要求的政府机构工作",
    "target": "在 Amazon Data Lifecycle Manager (Amazon DLM) 中配置策略每天运行一次",
    "avoid": "别选“配置Amazon S3跨Region复制”。",
    "questionCues": [
      "该机构还需要保持尽可能低的营运费用",
      "解决方案架构师为具有严格灾难复原要求的政府机构工作"
    ],
    "answerCues": {
      "A": [
        "在 Amazon Data Lifecycle Manager (Amazon DLM) 中配置策略每天运行一次"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "351": {
    "when": "这些 EC2 实例必须限制在 us-east-2 Region + 以将此活动保留在公司 IT 之外 + 该公司希望仅",
    "target": "仅允许在 us-east-2 中启动 t3.small EC2 实例 + 建立一个 IAM 策略",
    "avoid": "别选“将所有 EC2 实例、使用者和资产移至 us-east-2”。",
    "questionCues": [
      "这些 EC2 实例必须限制在 us-east-2 Region",
      "以将此活动保留在公司 IT 之外",
      "该公司希望仅"
    ],
    "answerCues": {
      "D": [
        "仅允许在 us-east-2 中启动 t3.small EC2 实例",
        "建立一个 IAM 策略"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "352": {
    "when": "必须将资料从来源 S3 储存桶复制到目标 S3 储存桶才能满足合规性目标 + 该公司在第二个帐户中创建了目标 S3 储存桶",
    "target": "启用S3复制时间控制（S3RTC） + 在来源 S3 储存桶上建立新的 S3 复制规则",
    "avoid": "别选“将前缀资料从来源 S3 储存桶复制到目标 S3 储存桶”；认准“启用S3复制时间控制（S3RTC）”。",
    "questionCues": [
      "必须将资料从来源 S3 储存桶复制到目标 S3 储存桶才能满足合规性目标",
      "该公司在第二个帐户中创建了目标 S3 储存桶"
    ],
    "answerCues": {
      "D": [
        "启用S3复制时间控制（S3RTC）",
        "在来源 S3 储存桶上建立新的 S3 复制规则"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "353": {
    "when": "解决方案架构师需要了解目前环境并估算迁移后的云端资源成本 + 解决方案架构师应该使用哪些工具或服务来规划云端迁移 + 迁移到AWS云端",
    "target": "A：AWS 应用发现服务；D：AWS 云采用准备工具 (CART)；F：AWS 迁移中心",
    "avoid": "别选“Amazon Inspector”；认准“AWS 应用发现服务”。",
    "questionCues": [
      "解决方案架构师需要了解目前环境并估算迁移后的云端资源成本",
      "解决方案架构师应该使用哪些工具或服务来规划云端迁移",
      "迁移到AWS云端"
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
    "when": "EC2 实例由最小容量为 1、最大容量为 1 的 Auto Scaling 群组配置 + 解决方案架构师需要推荐一个解决方案",
    "target": "将 MySQL 资料库实例的 RDS 修改为 Multi-AZ 配置 + 配置 Auto Scaling 群组以跨 Availability Zones 启动实例",
    "avoid": "别选“修改MySQL资料库实例的RDS开启自动备份”；认准“将 MySQL 资料库实例的 RDS 修改为 Multi-AZ 配置”。",
    "questionCues": [
      "EC2 实例由最小容量为 1、最大容量为 1 的 Auto Scaling 群组配置",
      "解决方案架构师需要推荐一个解决方案"
    ],
    "answerCues": {
      "A": [
        "将 MySQL 资料库实例的 RDS 修改为 Multi-AZ 配置",
        "配置 Auto Scaling 群组以跨 Availability Zones 启动实例"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "355": {
    "when": "也无法继续管理Docker托管环境 + 该解决方案将自动扩展吞吐量以满足不断增长的需求 + 公司必须实施低延迟储存解决方案",
    "target": "将磁碟区新增至任务定义以指向EFS 档案系统 + 建立一个Fargate任务定义",
    "avoid": "别选“Amazon EBS”；认准“将磁碟区新增至任务定义以指向EFS 档案系统”。",
    "questionCues": [
      "也无法继续管理Docker托管环境",
      "该解决方案将自动扩展吞吐量以满足不断增长的需求",
      "公司必须实施低延迟储存解决方案"
    ],
    "answerCues": {
      "B": [
        "将磁碟区新增至任务定义以指向EFS 档案系统",
        "建立一个Fargate任务定义"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "356": {
    "when": "解决方案架构师必须评估公司目前的环境并制定迁移计划 + 该公司希望在迁移过程中调整其资源规模 + 一家公司正计划迁移到AWS云端",
    "target": "部署迁移中心策略建议应用程式资料收集器 + AWS Application Discovery Agent",
    "avoid": "别选“使用AWS Migration Hub导入工具载入公司on-premises环境的详细资料”。",
    "questionCues": [
      "解决方案架构师必须评估公司目前的环境并制定迁移计划",
      "该公司希望在迁移过程中调整其资源规模",
      "一家公司正计划迁移到AWS云端"
    ],
    "answerCues": {
      "B": [
        "部署迁移中心策略建议应用程式资料收集器",
        "AWS Application Discovery Agent"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "357": {
    "when": "并使用在 AWS Organizations ​​的组织中管理的多个 AWS 帐户 + 并储存在持久且安全的资料储存中",
    "target": "建立一个新的Amazon S3储存桶并开启版本控制来储存日志 + 在 S3 储存桶上启用 MFA 删除和加密",
    "avoid": "别选“使用组织管理帐户中现有的 Amazon S3 储存桶来储存日志”。",
    "questionCues": [
      "并使用在 AWS Organizations ​​的组织中管理的多个 AWS 帐户",
      "并储存在持久且安全的资料储存中"
    ],
    "answerCues": {
      "C": [
        "建立一个新的Amazon S3储存桶并开启版本控制来储存日志",
        "在 S3 储存桶上启用 MFA 删除和加密"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "358": {
    "when": "该公司需要尽可能低的网路延迟才能达到最佳效能 + 一家公司正在一组 Amazon EC2 实例上部署分散式记忆体资料库",
    "target": "在群集置放群组中启动记忆体最佳化的 EC2 实例",
    "avoid": "别选“在分区置放群组中启动记忆体最佳化的 EC2 实例”；认准“在群集置放群组中启动记忆体最佳化的 EC2 实例”。",
    "questionCues": [
      "该公司需要尽可能低的网路延迟才能达到最佳效能",
      "一家公司正在一组 Amazon EC2 实例上部署分散式记忆体资料库"
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
    "when": "该公司需要将资料自动备份到AWS云 + Backups 资料必须每天出现 + 该公司需要一种解决方案",
    "target": "每天将资料复制到Amazon S3 + 配置DataSync任务",
    "avoid": "别选“将现有资料复制到Amazon S3”；认准“每天将资料复制到Amazon S3”。",
    "questionCues": [
      "该公司需要将资料自动备份到AWS云",
      "Backups 资料必须每天出现",
      "该公司需要一种解决方案"
    ],
    "answerCues": {
      "C": [
        "每天将资料复制到Amazon S3",
        "配置DataSync任务"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "360": {
    "when": "使用者角色必须能够仅启动经过批准和授权的应用程式 + 使用者角色仅对他们需要的资源具有最低存取权限 + 一家金融服务公司拥有一款资产管理产品",
    "target": "Amazon EMR + AWS Service Catalog",
    "avoid": "别选“在集群建立过程中将基于资源的策略附加到EMR集群”；认准“Amazon EMR”。",
    "questionCues": [
      "使用者角色必须能够仅启动经过批准和授权的应用程式",
      "使用者角色仅对他们需要的资源具有最低存取权限",
      "一家金融服务公司拥有一款资产管理产品"
    ],
    "answerCues": {
      "C": [
        "Amazon EMR",
        "AWS Service Catalog"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "361": {
    "when": "公司希望让新客户能够存取 SaaS 服务 + 但公司不希望立即在 us-east-1 中部署新的 EC2 资源 + NLB",
    "target": "该群组使用 eu-west-2 中托管 SaaS 服务的公司实例的 IP 位址 + 配置使用 us-east-1 中的 NLB 的 PrivateLink 端点服务",
    "avoid": "别选“在 us-east-1 中配置 PrivateLink 端点服务以使用 eu-west-2 中的现有 NLB”。",
    "questionCues": [
      "公司希望让新客户能够存取 SaaS 服务",
      "但公司不希望立即在 us-east-1 中部署新的 EC2 资源",
      "NLB"
    ],
    "answerCues": {
      "B": [
        "该群组使用 eu-west-2 中托管 SaaS 服务的公司实例的 IP 位址",
        "配置使用 us-east-1 中的 NLB 的 PrivateLink 端点服务"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "362": {
    "when": "该公司还需要追踪在 Amazon S3 中加密的物件的百分比 + 该公司需要一个仪表板来为内部合规团队显示这些资讯",
    "target": "使用 S3 Storage Lens 预设仪表板来追踪储存桶和加密指标 + 让合规团队可以直接在 S3 控制台中存取仪表板",
    "avoid": "别选“使用 Amazon QuickSight 在仪表板中为合规团队显示指标”。",
    "questionCues": [
      "该公司还需要追踪在 Amazon S3 中加密的物件的百分比",
      "该公司需要一个仪表板来为内部合规团队显示这些资讯"
    ],
    "answerCues": {
      "C": [
        "使用 S3 Storage Lens 预设仪表板来追踪储存桶和加密指标",
        "让合规团队可以直接在 S3 控制台中存取仪表板"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "363": {
    "when": "公司还必须能够在发生错误时快速回滚变更 + 同时将停机时间降至最低 + 什么CI/CD配置满足所有要求",
    "target": "使用为蓝/绿部署配置的 AWS CodeDeploy 配置 CodePipeline 和部署阶段 + 请使用 CodeDeploy 触发手动回滚",
    "avoid": "别选“使用为就地部署配置的 AWS CodeDeploy 配置 CodePipeline 和部署阶段”。",
    "questionCues": [
      "公司还必须能够在发生错误时快速回滚变更",
      "同时将停机时间降至最低",
      "什么CI/CD配置满足所有要求"
    ],
    "answerCues": {
      "B": [
        "使用为蓝/绿部署配置的 AWS CodeDeploy 配置 CodePipeline 和部署阶段",
        "请使用 CodeDeploy 触发手动回滚"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "364": {
    "when": "解决方案架构师应该做什么来强制执行未来的标记要求 + 所有 EC2 实例都必须具有 BusinessUnit 标签 + Amazon EC2",
    "target": "建立一个 SCP 并将 SCP 附加到组织的根目录 + { \"Sid\": \"否认EC2创造\"",
    "avoid": "别选“建立 SCP 并将 SCP 附加到组织的管理帐户”；认准“建立一个 SCP 并将 SCP 附加到组织的根目录”。",
    "questionCues": [
      "解决方案架构师应该做什么来强制执行未来的标记要求",
      "所有 EC2 实例都必须具有 BusinessUnit 标签",
      "Amazon EC2"
    ],
    "answerCues": {
      "C": [
        "建立一个 SCP 并将 SCP 附加到组织的根目录",
        "{ \"Sid\": \"否认EC2创造\""
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "365": {
    "when": "解决方案架构师需要迁移整个EC2实例以使用IPv6 + 私有子网路中的 EC2 实例不得从公用 Internet 存取",
    "target": "并将 ::/0 的路由新增至仅出口 Internet 闸道 + 更新所有私有子网路的 VPC 路由表",
    "avoid": "别选“并将自订 IPv6 CIDR 区块与 VPC 和所有子网路关联”；认准“并将 ::/0 的路由新增至仅出口 Internet 闸道”。",
    "questionCues": [
      "解决方案架构师需要迁移整个EC2实例以使用IPv6",
      "私有子网路中的 EC2 实例不得从公用 Internet 存取"
    ],
    "answerCues": {
      "C": [
        "并将 ::/0 的路由新增至仅出口 Internet 闸道",
        "更新所有私有子网路的 VPC 路由表"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "366": {
    "when": "无法从部署在 VPC 中的 Amazon EC2 实例存取该 API + 该 API 必须只能从部署在 VPC 中的应用程式存取",
    "target": "为 VPC 端点启用私有 DNS 命名 + 配置允许从VPC端点存取的API资源策略",
    "avoid": "别选“配置允许从VPC存取的API资源策略”；认准“为 VPC 端点启用私有 DNS 命名”。",
    "questionCues": [
      "无法从部署在 VPC 中的 Amazon EC2 实例存取该 API",
      "该 API 必须只能从部署在 VPC 中的应用程式存取"
    ],
    "answerCues": {
      "B": [
        "为 VPC 端点启用私有 DNS 命名",
        "配置允许从VPC端点存取的API资源策略"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "367": {
    "when": "解决方案架构师必须确保公司能够集中管理所有AWS帐户的计费和存取策略 + 解决方案架构师透过从集中管理帐户向公司的所有成员帐户发送邀请来",
    "target": "授予管理帐号承担 IAM 角色的权限 + 在每个成员帐户中建立 OrganizationAccountAccessRole IAM 角色",
    "avoid": "别选“将 AdministratorAccess AWS 托管策略附加到 IAM 角色”；认准“授予管理帐号承担 IAM 角色的权限”。",
    "questionCues": [
      "解决方案架构师必须确保公司能够集中管理所有AWS帐户的计费和存取策略",
      "解决方案架构师透过从集中管理帐户向公司的所有成员帐户发送邀请来"
    ],
    "answerCues": {
      "C": [
        "授予管理帐号承担 IAM 角色的权限",
        "在每个成员帐户中建立 OrganizationAccountAccessRole IAM 角色"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "368": {
    "when": "PostgreSQL 资料库已迁移到 Amazon RDS + Apache Kafka 集群已部署到 EC2 实例",
    "target": "为数据库实例创建额外的只读副本 + 并在 Application Load Balancer 后面启用自动缩放",
    "avoid": "别选“以Multi-AZ模式部署资料库实例”；认准“为数据库实例创建额外的只读副本”。",
    "questionCues": [
      "PostgreSQL 资料库已迁移到 Amazon RDS",
      "Apache Kafka 集群已部署到 EC2 实例"
    ],
    "answerCues": {
      "D": [
        "为数据库实例创建额外的只读副本",
        "并在 Application Load Balancer 后面启用自动缩放"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "369": {
    "when": "公司必须在 AWS 上设计一个解决方案 + 员工目前连接到 VPN 来存取其 Windows 主目录中的档案 + 并减少营运开销",
    "target": "B：将 Windows 档案伺服器的主目录移转到 Amazon FSx；D：将远端用户迁移到AWSClient VPN",
    "avoid": "别选“将 Lustre 的主目录迁移到 Amazon FSx”；认准“将 Windows 档案伺服器的主目录移转到 Amazon FSx”。",
    "questionCues": [
      "公司必须在 AWS 上设计一个解决方案",
      "员工目前连接到 VPN 来存取其 Windows 主目录中的档案",
      "并减少营运开销"
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
    "when": "该公司希望有一个解决方案能够集中管理多个AWS帐户 + 并确保将来能够自动侦测到未加密的磁碟区 + 并专注于合规性和安全性",
    "target": "C：建立每个未加密磁碟区的快照 + 将其替换为加密卷；D：开启强制控制（护栏）",
    "avoid": "别选“并开启强烈建议的控制项（护栏）”；认准“建立每个未加密磁碟区的快照”。",
    "questionCues": [
      "该公司希望有一个解决方案能够集中管理多个AWS帐户",
      "并确保将来能够自动侦测到未加密的磁碟区",
      "并专注于合规性和安全性"
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
    "when": "目录中拥有帐户的所有使用者都必须有权存取该应用程式 + 该公司需要 + ALB",
    "target": "配置 Amazon Cognito 用户池 + 为 AL 建立侦听器规则为侦听器规则指定「authenticate-cognito」操作",
    "avoid": "别选“配置允许存取ALB的角色策略”；认准“配置 Amazon Cognito 用户池”。",
    "questionCues": [
      "目录中拥有帐户的所有使用者都必须有权存取该应用程式",
      "该公司需要",
      "ALB"
    ],
    "answerCues": {
      "B": [
        "配置 Amazon Cognito 用户池",
        "为 AL 建立侦听器规则为侦听器规则指定「authenticate-cognito」操作"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "372": {
    "when": "解决方案架构师必须设计一个能够提供最快故障转移时间的解决方案 + 故障转移需要 1 分钟以上 + 作为辅助故障转移记录类型",
    "target": "建立一个 CloudFront 来源群组 + 将来源故障转移",
    "avoid": "别选“建立一个新的 Route 53 故障转移记录集”；认准“建立一个 CloudFront 来源群组”。",
    "questionCues": [
      "解决方案架构师必须设计一个能够提供最快故障转移时间的解决方案",
      "故障转移需要 1 分钟以上",
      "作为辅助故障转移记录类型"
    ],
    "answerCues": {
      "D": [
        "建立一个 CloudFront 来源群组",
        "将来源故障转移"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "373": {
    "when": "他们还希望将多个帐户作为一个整体进行管理 + 他们希望允许存取目前正在使用的服务并拒绝一些特定的服务 + AWS Organizations",
    "target": "C：查看AWS Trusted Advisor 报告以确定最近使用的服务；D：删除预设的 FullAWSAccess SCP；F：删除预设的 DenyAWSAccess SCP",
    "avoid": "别选“查看 AWS IAM 中的访问顾问以确定最近使用的服务”。",
    "questionCues": [
      "他们还希望将多个帐户作为一个整体进行管理",
      "他们希望允许存取目前正在使用的服务并拒绝一些特定的服务",
      "AWS Organizations"
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
    "when": "以最大限度地提高销售活动期间的可用性 + 该公司需要一个扩展解决方案 + 一家现场活动公司正在为其 AWS 上的门票应用程式设计扩展解决方案",
    "target": "故障转移到更大的 Aurora 副本 + 对 EC2 实例使用计划的扩展策略",
    "avoid": "别选“将资料库托管在 PostgreSQL 多可用区资料库执行个体的 Amazon RDS 上”。",
    "questionCues": [
      "以最大限度地提高销售活动期间的可用性",
      "该公司需要一个扩展解决方案",
      "一家现场活动公司正在为其 AWS 上的门票应用程式设计扩展解决方案"
    ],
    "answerCues": {
      "D": [
        "故障转移到更大的 Aurora 副本",
        "对 EC2 实例使用计划的扩展策略"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "375": {
    "when": "该公司不希望该解决方案消耗所有可用的网路频宽 + 因为其他应用程式需要频宽 + 该应用程式也不能透过网路存取",
    "target": "A：建立一个至少具有两个私有子网路、两个 NAT 闸道和一个虚拟私有闸道的 VPC；E：在配置复制伺服器期间；F：在设定目标伺服器的启动设定期间",
    "avoid": "别选“建立一个至少有两个公用子网路、一个虚拟专用闸道和一个 Internet 闸道的 VPC”。",
    "questionCues": [
      "该公司不希望该解决方案消耗所有可用的网路频宽",
      "因为其他应用程式需要频宽",
      "该应用程式也不能透过网路存取"
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
    "when": "并且能够在发生故障时重新执行处理作业 + 该解决方案必须能够处理需求的显著变化 + 此解决方案还必须在企业规模上可靠",
    "target": "并将调整后的档案储存在使用 S3 标准不频繁存取 (S3 标准 IA) 的 S3 储存桶中 + 以在 6 个月后将所有储存的影像移至 S3 Glacier Deep Archive",
    "avoid": "别选“使用S3事件通知呼叫AWS Lambda函数”。",
    "questionCues": [
      "并且能够在发生故障时重新执行处理作业",
      "该解决方案必须能够处理需求的显著变化",
      "此解决方案还必须在企业规模上可靠"
    ],
    "answerCues": {
      "D": [
        "并将调整后的档案储存在使用 S3 标准不频繁存取 (S3 标准 IA) 的 S3 储存桶中",
        "以在 6 个月后将所有储存的影像移至 S3 Glacier Deep Archive"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "377": {
    "when": "该公司希望降低计算成本并适当管理跨部门的成本 + 公司不希望在选择运算资源时失去营运弹性 + 该公司还希望提高各部门计费的可见度",
    "target": "使用标签编辑器将标签套用到适当的资源 + 购买计算节省计划",
    "avoid": "别选“购买 EC2 实例节省计划”；认准“使用标签编辑器将标签套用到适当的资源”。",
    "questionCues": [
      "该公司希望降低计算成本并适当管理跨部门的成本",
      "公司不希望在选择运算资源时失去营运弹性",
      "该公司还希望提高各部门计费的可见度"
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
    "when": "可以将图片和影片安全地上传到 Amazon S3 储存桶 + 该公司要求只有经过身份验证的用户才可以发布内容 + 用于透过浏览器介面上传物件",
    "target": "在 S3 储存桶上启用 S3 传输加速端点 + 让浏览器介面使用 S3 分段上传 API 将物件上传到此 URL",
    "avoid": "别选“配置此资源的 PUT 方法以公开 S3 PutObject 操作”；认准“在 S3 储存桶上启用 S3 传输加速端点”。",
    "questionCues": [
      "可以将图片和影片安全地上传到 Amazon S3 储存桶",
      "该公司要求只有经过身份验证的用户才可以发布内容",
      "用于透过浏览器介面上传物件"
    ],
    "answerCues": {
      "C": [
        "在 S3 储存桶上启用 S3 传输加速端点",
        "让浏览器介面使用 S3 分段上传 API 将物件上传到此 URL"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "379": {
    "when": "安全团队需要一个集中机制来控制公司所有帐户中IAM的使用情况 + 但必须保持对每个组的支出的可见性以分配成本 + 迁移到AWS",
    "target": "A：要求所有新帐户和现有帐户启动适当的堆叠以强制执行最小权限模型；B：使用AWS Organizations从选定的付款人帐户",
    "avoid": "别选“过滤IAM子帐户的权限”；认准“要求所有新帐户和现有帐户启动适当的堆叠以强制执行最小权限模型”。",
    "questionCues": [
      "安全团队需要一个集中机制来控制公司所有帐户中IAM的使用情况",
      "但必须保持对每个组的支出的可见性以分配成本",
      "迁移到AWS"
    ],
    "answerCues": {
      "A": [
        "要求所有新帐户和现有帐户启动适当的堆叠以强制执行最小权限模型"
      ],
      "B": [
        "使用AWS Organizations从选定的付款人帐户"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "380": {
    "when": "并且在发生故障时可以稍后处理数据 + 解决方案架构师必须确保不会遗失任何数据 + 解决方案架构师必须提高解决方案的弹性",
    "target": "将 Lambda 函数配置为主队列的调用目标 + 创建两个Amazon Simple Queue Service (Amazon SQS)队列",
    "avoid": "别选“建立一个Amazon Simple Queue Service (Amazon SQS)队列”。",
    "questionCues": [
      "并且在发生故障时可以稍后处理数据",
      "解决方案架构师必须确保不会遗失任何数据",
      "解决方案架构师必须提高解决方案的弹性"
    ],
    "answerCues": {
      "B": [
        "将 Lambda 函数配置为主队列的调用目标",
        "创建两个Amazon Simple Queue Service (Amazon SQS)队列"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "381": {
    "when": "营运团队恢复了 Web 伺服器建立的日志并审查了Aurora 资料库集群效能指标 + 且 Aurora 指标不足以进行查询效能分析",
    "target": "A：将慢查询和错误日志发布到AmazonCloudWatch日志；E：启用并配置 AWS CloudTrail 以收集和分析来自 Amazon EC2 和 Aurora 的应用程式活动；F：启用 Aurora MySQL 资料库集群效能基准测试并将串流发布到 AWS X-Ray",
    "avoid": "别选“在 EC2 实例上安装并设定 Amazon CloudWatch 日志代理”。",
    "questionCues": [
      "营运团队恢复了 Web 伺服器建立的日志并审查了Aurora 资料库集群效能指标",
      "且 Aurora 指标不足以进行查询效能分析"
    ],
    "answerCues": {
      "A": [
        "将慢查询和错误日志发布到AmazonCloudWatch日志"
      ],
      "E": [
        "启用并配置 AWS CloudTrail 以收集和分析来自 Amazon EC2 和 Aurora 的应用程式活动"
      ],
      "F": [
        "启用 Aurora MySQL 资料库集群效能基准测试并将串流发布到 AWS X-Ray"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "382": {
    "when": "以最少的开发工作来应对旺季 + 哪个选项提供了可扩展的应用程式架构 + 并以Amazon DynamoDB作为资料储存",
    "target": "使用DynamoDB自动缩放 + 使用Auto Scaling组作为后端服务",
    "avoid": "别选“Amazon SQS”；认准“使用DynamoDB自动缩放”。",
    "questionCues": [
      "以最少的开发工作来应对旺季",
      "哪个选项提供了可扩展的应用程式架构",
      "并以Amazon DynamoDB作为资料储存"
    ],
    "answerCues": {
      "C": [
        "使用DynamoDB自动缩放",
        "使用Auto Scaling组作为后端服务"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "383": {
    "when": "以确保能够准确调整新的Amazon EC2实例的大小 + 该公司还希望监控网路连接以映射伺服器之间的通讯 + 一家公司正在迁移到云端",
    "target": "使用AWS应用程式发现服务并将资料收集代理程式部署到资料中心的每个虚拟机器",
    "avoid": "别选“在本地环境中的所有伺服器上配置 Amazon CloudWatch 代理”。",
    "questionCues": [
      "以确保能够准确调整新的Amazon EC2实例的大小",
      "该公司还希望监控网路连接以映射伺服器之间的通讯",
      "一家公司正在迁移到云端"
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
    "when": "解决方案必须自动将客户路由到地理位置最接近他们的Region + 公司必须向客户提供应用程式的静态 IP 位址 + NLB",
    "target": "在每个附加 Region 中为 NLB 创建一个标准加速器端点 + 创建AWS Global Accelerator标准加速器",
    "avoid": "别选“在每个附加 Region 中新增 NLB 的 IP 位址和连接埠”。",
    "questionCues": [
      "解决方案必须自动将客户路由到地理位置最接近他们的Region",
      "公司必须向客户提供应用程式的静态 IP 位址",
      "NLB"
    ],
    "answerCues": {
      "B": [
        "在每个附加 Region 中为 NLB 创建一个标准加速器端点",
        "创建AWS Global Accelerator标准加速器"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "385": {
    "when": "该解决方案还必须允许开发人员能够管理用于其工作负载的执行个体 + 解决方案架构师必须创建一个解决方案 + 授予管理其AWS帐户中的资源的权限",
    "target": "更新开发人员假定的 IAM 角色的 IAM 策略 + 将 DevelopmentUnit 的属性作为 AWS 安全令牌服务 (AWS STS) 会话标记传递",
    "avoid": "别选“使用AWS安全令牌服务（AWSSTS）指派IAM策略并将开发单元名称与假定的IAM角色相符”。",
    "questionCues": [
      "该解决方案还必须允许开发人员能够管理用于其工作负载的执行个体",
      "解决方案架构师必须创建一个解决方案",
      "授予管理其AWS帐户中的资源的权限"
    ],
    "answerCues": {
      "B": [
        "更新开发人员假定的 IAM 角色的 IAM 策略",
        "将 DevelopmentUnit 的属性作为 AWS 安全令牌服务 (AWS STS) 会话标记传递"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "386": {
    "when": "使用中央帐户来管理基础设施服务的建立 + 以便使用者无法提供未经批准的服务 + 在启动AWS 基础设施时向使用者提供最低权限存取权限",
    "target": "B：AWS Service Catalog；D：分配使用者存取权限并套用启动约束；E：AWS Service Catalog",
    "avoid": "别选“并新增需要存取 S3 储存桶策略的 IAM 角色或使用者”；认准“AWS Service Catalog”。",
    "questionCues": [
      "使用中央帐户来管理基础设施服务的建立",
      "以便使用者无法提供未经批准的服务",
      "在启动AWS 基础设施时向使用者提供最低权限存取权限"
    ],
    "answerCues": {
      "B": [
        "AWS Service Catalog"
      ],
      "D": [
        "分配使用者存取权限并套用启动约束"
      ],
      "E": [
        "AWS Service Catalog"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "387": {
    "when": "此解决方案必须最大限度地减少营运开销 + 解决方案架构师需要设计一个解决方案来防止查询时间持续增加 + 每天运行一次",
    "target": "修改Kinesis资料Firehose配置和Athena表定义 + 依日期和时间对资料进行分区",
    "avoid": "别选“透过设定 AWS WAF 每天将日志传送到不同的 S3 储存桶”。",
    "questionCues": [
      "此解决方案必须最大限度地减少营运开销",
      "解决方案架构师需要设计一个解决方案来防止查询时间持续增加",
      "每天运行一次"
    ],
    "answerCues": {
      "D": [
        "修改Kinesis资料Firehose配置和Athena表定义",
        "依日期和时间对资料进行分区"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "388": {
    "when": "公司需要能够记录已被阻止的存取请求 + 此解决方案需要尽可能少的维护 + ALB",
    "target": "配置规则以阻止任何并非源自指定国家/地区的请求 + 将 Web ACL 与 ALB 关联",
    "avoid": "别选“配置规则以封锁并非源自 IPSet 中的 IP 范围的任何请求”；认准“配置规则以阻止任何并非源自指定国家/地区的请求”。",
    "questionCues": [
      "公司需要能够记录已被阻止的存取请求",
      "此解决方案需要尽可能少的维护",
      "ALB"
    ],
    "answerCues": {
      "B": [
        "配置规则以阻止任何并非源自指定国家/地区的请求",
        "将 Web ACL 与 ALB 关联"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "389": {
    "when": "根据合规要求 + 解决方案架构师必须设计一种解决方案 + 该公司希望尽可能转向AWS 托管服务",
    "target": "配置 AWS DataSync 使用介面 VPC 端点与 AWS PrivateLink 进行通讯 + 透过使用 VPC 对等互连",
    "avoid": "别选“配置 AWS DataSync 使用 VPN 端点进行通讯”。",
    "questionCues": [
      "根据合规要求",
      "解决方案架构师必须设计一种解决方案",
      "该公司希望尽可能转向AWS 托管服务"
    ],
    "answerCues": {
      "C": [
        "配置 AWS DataSync 使用介面 VPC 端点与 AWS PrivateLink 进行通讯",
        "透过使用 VPC 对等互连"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "390": {
    "when": "该应用程式需要 RPO 少于 5 分钟 + 该解决方案将为公司提供故障转移到辅助Region的能力 + RTO 少于 10 分钟",
    "target": "在辅助 Region 中部署具有跨 Region 只读副本的 Amazon RDS 实例 + 请将唯读副本提升为主副本",
    "avoid": "别选“在同一 Region 中部署具有唯读副本的 Amazon RDS 实例”。",
    "questionCues": [
      "该应用程式需要 RPO 少于 5 分钟",
      "该解决方案将为公司提供故障转移到辅助Region的能力",
      "RTO 少于 10 分钟"
    ],
    "answerCues": {
      "B": [
        "在辅助 Region 中部署具有跨 Region 只读副本的 Amazon RDS 实例",
        "请将唯读副本提升为主副本"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "391": {
    "when": "解决方案架构师使用管理帐户中的 IAM 使用者 Support1 建立新的成员帐户 + 使用AWS Organizations来管理其帐户",
    "target": "切换角色以使用新成员帐户的帐户 ID 承担 OrganizationAccountAccessRole 角色 + 从管理帐户中",
    "avoid": "别选“使用新会员帐号的帐号 ID 和 Support1 IAM 凭证登入”。",
    "questionCues": [
      "解决方案架构师使用管理帐户中的 IAM 使用者 Support1 建立新的成员帐户",
      "使用AWS Organizations来管理其帐户"
    ],
    "answerCues": {
      "B": [
        "切换角色以使用新成员帐户的帐户 ID 承担 OrganizationAccountAccessRole 角色",
        "从管理帐户中"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "392": {
    "when": "同时最大限度地减少与解决方案相关的成本增加 + 该公司需要提高支援额外使用的能力 + HTTP",
    "target": "修改 Lambda 函数以使用快取 + Amazon ElastiCache",
    "avoid": "别选“将 API Gateway Regional 端点转换为边缘最佳化端点”；认准“修改 Lambda 函数以使用快取”。",
    "questionCues": [
      "同时最大限度地减少与解决方案相关的成本增加",
      "该公司需要提高支援额外使用的能力",
      "HTTP"
    ],
    "answerCues": {
      "B": [
        "修改 Lambda 函数以使用快取",
        "Amazon ElastiCache"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "393": {
    "when": "以尽可能少的停机时间将资料迁移到AWS + 公司还必须对传输中和静态的资料进行加密 + 解决方案架构师需要设计一个解决方案",
    "target": "在私有子网路中建立 DMS 复制实例 + 配置 DMS 任务",
    "avoid": "别选“使用具有 Amazon S3 托管加密金钥 (SSE-S3) 的伺服器端加密进行静态加密”。",
    "questionCues": [
      "以尽可能少的停机时间将资料迁移到AWS",
      "公司还必须对传输中和静态的资料进行加密",
      "解决方案架构师需要设计一个解决方案"
    ],
    "answerCues": {
      "B": [
        "在私有子网路中建立 DMS 复制实例",
        "配置 DMS 任务"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "394": {
    "when": "文件储存必须具有高可用性、具有弹性、必须与便携式作业系统介面 (POSIX) 相容 + 并且必须适应高水准的吞吐量 + Amazon EC2",
    "target": "使用最大 I/O 效能模式的新 Amazon Elastic File System (Amazon EFS) 档案系统",
    "avoid": "别选“配置使用通用效能模式的新Amazon Elastic File System (Amazon EFS)档案系统”。",
    "questionCues": [
      "文件储存必须具有高可用性、具有弹性、必须与便携式作业系统介面 (POSIX) 相容",
      "并且必须适应高水准的吞吐量",
      "Amazon EC2"
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
    "when": "解决方案架构师必须设计一个灾难复原策略 + Lambda 函数将资料储存在 Amazon Aurora Serverless v1 资料库中",
    "target": "标准 Aurora MySQL 全域资料库 + 在主动-被动配置中工作",
    "avoid": "别选“使用 AWS SAM 建立 Runbook 以将解决方案部署到目标 Region”。",
    "questionCues": [
      "解决方案架构师必须设计一个灾难复原策略",
      "Lambda 函数将资料储存在 Amazon Aurora Serverless v1 资料库中"
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
    "when": "以便应用程式具有高可用性 + 解决方案架构师必须更新应用程序 + 负载的增加多次导致停机",
    "target": "在内容更新之前手动扩充EC2实例 + 为 Redis 设定 Amazon ElastiCache",
    "avoid": "别选“更新 Route 53 记录以使用针对 ALB 的 DNS 别名的简单路由策略”；认准“在内容更新之前手动扩充EC2实例”。",
    "questionCues": [
      "以便应用程式具有高可用性",
      "解决方案架构师必须更新应用程序",
      "负载的增加多次导致停机"
    ],
    "answerCues": {
      "B": [
        "在内容更新之前手动扩充EC2实例",
        "为 Redis 设定 Amazon ElastiCache"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "397": {
    "when": "公司需要储存和处理将使用自订行动应用程式从行动装置上传的影像资料 + 确保影像处理可以扩展以处理负载 + 每分钟上传数千次",
    "target": "A：使用 S3 事件通知在 Amazon MQ 伫列中建立讯息；C：AWS Lambda；D：呼叫 S3 Batch 操作作业来执行影像处理",
    "avoid": "别选“将手机软体中的档案直接上传到Amazon S3”；认准“使用 S3 事件通知在 Amazon MQ 伫列中建立讯息”。",
    "questionCues": [
      "公司需要储存和处理将使用自订行动应用程式从行动装置上传的影像资料",
      "确保影像处理可以扩展以处理负载",
      "每分钟上传数千次"
    ],
    "answerCues": {
      "A": [
        "使用 S3 事件通知在 Amazon MQ 伫列中建立讯息"
      ],
      "C": [
        "AWS Lambda"
      ],
      "D": [
        "呼叫 S3 Batch 操作作业来执行影像处理"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "398": {
    "when": "开发人员需要存取OpenSearch服务来直接从本地开发机器分析和视觉化日志 + 所有资料必须储存在VPC中",
    "target": "配置并设定 AWS Client VPN 端点 + 将 Client VPN 端点与 VPC 中的子网路关联",
    "avoid": "别选“并将其连接到VPC”；认准“配置并设定 AWS Client VPN 端点”。",
    "questionCues": [
      "开发人员需要存取OpenSearch服务来直接从本地开发机器分析和视觉化日志",
      "所有资料必须储存在VPC中"
    ],
    "answerCues": {
      "A": [
        "配置并设定 AWS Client VPN 端点",
        "将 Client VPN 端点与 VPC 中的子网路关联"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "399": {
    "when": "解决方案架构师必须创建满足安全要求的容器化架构 + 部署后需要采取哪些步骤才能满足要求 + 以提高可用性和成本效率",
    "target": "C：并为EC2实例使用IAM角色来存取其他资源；D：并在启动时将 IAM 凭证传递到容器中以存取其他资源",
    "avoid": "别选“并使用IAM任务角色来存取其他资源”；认准“并为EC2实例使用IAM角色来存取其他资源”。",
    "questionCues": [
      "解决方案架构师必须创建满足安全要求的容器化架构",
      "部署后需要采取哪些步骤才能满足要求",
      "以提高可用性和成本效率"
    ],
    "answerCues": {
      "C": [
        "并为EC2实例使用IAM角色来存取其他资源"
      ],
      "D": [
        "并在启动时将 IAM 凭证传递到容器中以存取其他资源"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "400": {
    "when": "该公司创建了需要 Lambda 函数来存取 Amazon Neptune 资料库集群的新功能 + VPC + DynamoDB",
    "target": "A：在 Neptune VPC 中建立三个公共子网；E：并将DynamoDB流量路由至VPC端点",
    "avoid": "别选“并透过 NAT 网关路由互联网流量”；认准“在 Neptune VPC 中建立三个公共子网”。",
    "questionCues": [
      "该公司创建了需要 Lambda 函数来存取 Amazon Neptune 资料库集群的新功能",
      "VPC",
      "DynamoDB"
    ],
    "answerCues": {
      "A": [
        "在 Neptune VPC 中建立三个公共子网"
      ],
      "E": [
        "并将DynamoDB流量路由至VPC端点"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "401": {
    "when": "该公司需要能够在灾难发生时使用 SMB 从资料中心或AWS 存取资料 + 但必须在 5 分钟内可用 + 资料副本很少被访问",
    "target": "配置S3档案闸道对元资料档案和影像档案使用Amazon S3标准不频繁存取（S3标准-IA） + 部署 Amazon S3 档案闸道",
    "avoid": "别选“并对影像档案使用 S3 Glacier Deep Archive”。",
    "questionCues": [
      "该公司需要能够在灾难发生时使用 SMB 从资料中心或AWS 存取资料",
      "但必须在 5 分钟内可用",
      "资料副本很少被访问"
    ],
    "answerCues": {
      "D": [
        "配置S3档案闸道对元资料档案和影像档案使用Amazon S3标准不频繁存取（S3标准-IA）",
        "部署 Amazon S3 档案闸道"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "402": {
    "when": "并且必须复制现有桌面的使用者体验 + 此解决方案必须提供多重身份验证 (MFA) + 以允许员工使用他们现有的身份凭证",
    "target": "设定与 on-premises 网路的 VPN 连接 + 为 MFA 设定 RADIUS 伺服器",
    "avoid": "别选“使用 AWS 管理控制台启动 Amazon WorkSpaces 的 MFA”。",
    "questionCues": [
      "并且必须复制现有桌面的使用者体验",
      "此解决方案必须提供多重身份验证 (MFA)",
      "以允许员工使用他们现有的身份凭证"
    ],
    "answerCues": {
      "C": [
        "设定与 on-premises 网路的 VPN 连接",
        "为 MFA 设定 RADIUS 伺服器"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "403": {
    "when": "并自动阻止这些号码将来转给客服人员 + 该公司希望有一个解决方案 + 该公司担心这些电话对成本和生产力的影响",
    "target": "修改联络人流以寻找更新的属性并使用 Lambda 函数读取和写入 DynamoDB 表 + 该按钮将呼叫呼叫 UpdateContactAttributes API 的 AWS Lambda 函数",
    "avoid": "别选“修改联系流以查找规则并呼叫AWS Lambda函数来读取和写入DynamoDB表”。",
    "questionCues": [
      "并自动阻止这些号码将来转给客服人员",
      "该公司希望有一个解决方案",
      "该公司担心这些电话对成本和生产力的影响"
    ],
    "answerCues": {
      "A": [
        "修改联络人流以寻找更新的属性并使用 Lambda 函数读取和写入 DynamoDB 表",
        "该按钮将呼叫呼叫 UpdateContactAttributes API 的 AWS Lambda 函数"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "404": {
    "when": "工厂营运团队必须立即收到通知 + 公司需要即时传输和分析AWS云端中的资料 + 如果任何参数超出可接受的范围",
    "target": "建立一个 AWS Lambda 函数来使用 Kinesis 资料流并分析资料 + 将资料串流传输到 Amazon Kinesis 资料流",
    "avoid": "别选“使用AWS Step Functions消费并分析Kinesis资料Firehose传输流中的资料”。",
    "questionCues": [
      "工厂营运团队必须立即收到通知",
      "公司需要即时传输和分析AWS云端中的资料",
      "如果任何参数超出可接受的范围"
    ],
    "answerCues": {
      "C": [
        "建立一个 AWS Lambda 函数来使用 Kinesis 资料流并分析资料",
        "将资料串流传输到 Amazon Kinesis 资料流"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "405": {
    "when": "因为工作负载会自动扩展工作负载使用的副本数量 + Amazon EKS + 许多 Pod 将在短时间内创建",
    "target": "配置工作负载以使用基于 Availability Zone 的拓扑扩展约束",
    "avoid": "别选“使用单独的启动模板将 EKS 控制平面部署到与工作负载节点组分离的第二个集群”。",
    "questionCues": [
      "因为工作负载会自动扩展工作负载使用的副本数量",
      "Amazon EKS",
      "许多 Pod 将在短时间内创建"
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
    "when": "此解决方案必须最大限度地缩短从故障中恢复所需的时间 + 解决方案架构师必须设计一个灾难复原解决方案 + 如果应用程式遇到故障",
    "target": "配置 Lambda 函数以更新 Route 53 + 建立一个 AWS Lambda 函数以将唯读副本提升为主资料库",
    "avoid": "别选“并更新Route 53集以将流量路由至第二个群集”；认准“配置 Lambda 函数以更新 Route 53”。",
    "questionCues": [
      "此解决方案必须最大限度地缩短从故障中恢复所需的时间",
      "解决方案架构师必须设计一个灾难复原解决方案",
      "如果应用程式遇到故障"
    ],
    "answerCues": {
      "C": [
        "配置 Lambda 函数以更新 Route 53",
        "建立一个 AWS Lambda 函数以将唯读副本提升为主资料库"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "407": {
    "when": "该公司希望将 Amazon EC2 使用情况作为指标进行追踪 + 公司的架构团队必须收到每日警报 + 使用率比过去 30 天的平均 EC2",
    "target": "指定EC2运行时间的使用类型 + 将预算金额设定为比 AWS Cost Explorer 报告的过去 30 天平均使用量高出 10%",
    "avoid": "别选“以便在 EC2 使用率比过去 30 天报告的平均使用率高出 10% 时通知架构团队”；认准“指定EC2运行时间的使用类型”。",
    "questionCues": [
      "该公司希望将 Amazon EC2 使用情况作为指标进行追踪",
      "公司的架构团队必须收到每日警报",
      "使用率比过去 30 天的平均 EC2"
    ],
    "answerCues": {
      "A": [
        "指定EC2运行时间的使用类型",
        "将预算金额设定为比 AWS Cost Explorer 报告的过去 30 天平均使用量高出 10%"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "408": {
    "when": "并且应该能够在行销活动期间进行扩展 + 以最小的延迟处理订单 + 下列哪一项是满足要求最可靠的方法",
    "target": "Amazon SQS + AWS Lambda",
    "avoid": "别选“在Amazon EC2托管的资料库中接收订单并使用EC2实例来处理它们”；认准“Amazon SQS”。",
    "questionCues": [
      "并且应该能够在行销活动期间进行扩展",
      "以最小的延迟处理订单",
      "下列哪一项是满足要求最可靠的方法"
    ],
    "answerCues": {
      "B": [
        "Amazon SQS",
        "AWS Lambda"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "409": {
    "when": "并且必须自动轮换密码 + 该公司需要在 QA 环境和生产环境中启动 Lambda 函数 + AWS Lambda",
    "target": "AWS Secrets Manager + 提供 Secrets Manager 键的引用作为 Lambda 函数的环境变数",
    "avoid": "别选“为 Lambda 函数添加角色以提供对 Parameter Store 参数的存取”；认准“AWS Secrets Manager”。",
    "questionCues": [
      "并且必须自动轮换密码",
      "该公司需要在 QA 环境和生产环境中启动 Lambda 函数",
      "AWS Lambda"
    ],
    "answerCues": {
      "B": [
        "AWS Secrets Manager",
        "提供 Secrets Manager 键的引用作为 Lambda 函数的环境变数"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "410": {
    "when": "公司必须阻止 OU 帐户中的任何新的或现有的 Amazon EC2 执行个体取得公用 IP 位址 + 该公司有一个包含帐户的OU",
    "target": "将 SCP 连接至 OU + 配置 SCP 以防止将公用 IP 位址附加到现有实例",
    "avoid": "别选“将OU中每个帐户的所有实例配置为使用AWS Systems Manager”；认准“将 SCP 连接至 OU”。",
    "questionCues": [
      "公司必须阻止 OU 帐户中的任何新的或现有的 Amazon EC2 执行个体取得公用 IP 位址",
      "该公司有一个包含帐户的OU"
    ],
    "answerCues": {
      "C": [
        "将 SCP 连接至 OU",
        "配置 SCP 以防止将公用 IP 位址附加到现有实例"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "411": {
    "when": "所有使用者都必须通过多重身份验证 (MFA) 进行身份验证 + 也无法将应用程式与身分提供者整合 + 公司无法更改应用程序",
    "target": "配置池以要求 MF 在 ALB 上配置侦听器规则 + Amazon Cognito",
    "avoid": "别选“将资源策略附加到Fargate服务”；认准“配置池以要求 MF 在 ALB 上配置侦听器规则”。",
    "questionCues": [
      "所有使用者都必须通过多重身份验证 (MFA) 进行身份验证",
      "也无法将应用程式与身分提供者整合",
      "公司无法更改应用程序"
    ],
    "answerCues": {
      "A": [
        "配置池以要求 MF 在 ALB 上配置侦听器规则",
        "Amazon Cognito"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "412": {
    "when": "解决方案架构师应该怎么做才能成功部署堆叠 + 解决方案架构师正准备将新的安全工具部署到多个先前未使用的AWSRegions中",
    "target": "在所有相关帐户中启用新的Regions + 在建立堆叠集期间指定 CAPABILITY_NAMED_IAM 功能",
    "avoid": "别选“使用服务配额控制台请求增加所有相关帐户中每个新Region 中的CloudFormation 堆叠数量的配额”。",
    "questionCues": [
      "解决方案架构师应该怎么做才能成功部署堆叠",
      "解决方案架构师正准备将新的安全工具部署到多个先前未使用的AWSRegions中"
    ],
    "answerCues": {
      "A": [
        "在所有相关帐户中启用新的Regions",
        "在建立堆叠集期间指定 CAPABILITY_NAMED_IAM 功能"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "413": {
    "when": "该应用程式在 AWS Lambda 函数上运行 + Amazon Aurora PostgreSQL + 并且资料库报告正在建立太多连接",
    "target": "为代理程式配置只读端点 + 更新 Lambda 函数以连接到代理终端节点",
    "avoid": "别选“在代理程式上为 Aurora 资料 API 设定唯读端点”；认准“为代理程式配置只读端点”。",
    "questionCues": [
      "该应用程式在 AWS Lambda 函数上运行",
      "Amazon Aurora PostgreSQL",
      "并且资料库报告正在建立太多连接"
    ],
    "answerCues": {
      "A": [
        "为代理程式配置只读端点",
        "更新 Lambda 函数以连接到代理终端节点"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "414": {
    "when": "感测器不得将资料传送至AWS",
    "target": "向AWS IoT Core 注册 CA + 并设定允许自动注册参数",
    "avoid": "别选“授予 AWS IoT Core 服务权限”；认准“向AWS IoT Core 注册 CA”。",
    "questionCues": [
      "感测器不得将资料传送至AWS"
    ],
    "answerCues": {
      "C": [
        "向AWS IoT Core 注册 CA",
        "并设定允许自动注册参数"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "415": {
    "when": "工程师需要在部署期间收到有关不良建置和零停机的通知 + 软体工程师决定使用 AWS CodePipeline 来管理他们的建置和部署流程",
    "target": "使用 GitHub webhooks 触发 CodePipeline 管道 + 使用AWSCodeBuild的Jenkins插件进行单元测试 + 使用 AWS CodeDeploy 在蓝色/绿色部署中进行部署",
    "avoid": "别选“使用 AWS CodeDeploy 在就地、一次性部署配置中进行部署”。",
    "questionCues": [
      "工程师需要在部署期间收到有关不良建置和零停机的通知",
      "软体工程师决定使用 AWS CodePipeline 来管理他们的建置和部署流程"
    ],
    "answerCues": {
      "B": [
        "使用 GitHub webhooks 触发 CodePipeline 管道",
        "使用AWSCodeBuild的Jenkins插件进行单元测试",
        "使用 AWS CodeDeploy 在蓝色/绿色部署中进行部署"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "416": {
    "when": "该公司希望将 DynamoDB 成本分配给每个租户 + 本公司已在 AWS 帐户中建立了 AWS 成本和使用情况报告 (AWS CUR)",
    "target": "设定 Lambda 函数 + AWS Cost Explorer API",
    "avoid": "别选“使用AWS定价计算器取得DynamoDB总体成本并计算租户成本”；认准“设定 Lambda 函数”。",
    "questionCues": [
      "该公司希望将 DynamoDB 成本分配给每个租户",
      "本公司已在 AWS 帐户中建立了 AWS 成本和使用情况报告 (AWS CUR)"
    ],
    "answerCues": {
      "B": [
        "设定 Lambda 函数",
        "AWS Cost Explorer API"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "417": {
    "when": "公司必须将所有资料保留一年 + 该公司的安全团队担心攻击者可能透过泄漏的长期凭证存取AWS帐户 + S3",
    "target": "启用 S3 版本控制和 S3 物件锁定 + 设定从现有 S3 储存桶到新 S3 储存桶的复制",
    "avoid": "别选“新增 S3 生命周期规则以在 1 年后删除物件”；认准“启用 S3 版本控制和 S3 物件锁定”。",
    "questionCues": [
      "公司必须将所有资料保留一年",
      "该公司的安全团队担心攻击者可能透过泄漏的长期凭证存取AWS帐户",
      "S3"
    ],
    "answerCues": {
      "A": [
        "启用 S3 版本控制和 S3 物件锁定",
        "设定从现有 S3 储存桶到新 S3 储存桶的复制"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "418": {
    "when": "一家公司需要提高AWS上基于Web的应用程式的安全性 + 安全审计也显示ALB接受未经身份验证的使用者的请求 + 使用者管理",
    "target": "配置 ALB + 透过将 ALB 与 IdP 整合来强制执行身份验证和授权",
    "avoid": "别选“启用 AWS CloudTrail 记录所有到达 ALB 的请求”；认准“配置 ALB”。",
    "questionCues": [
      "一家公司需要提高AWS上基于Web的应用程式的安全性",
      "安全审计也显示ALB接受未经身份验证的使用者的请求",
      "使用者管理"
    ],
    "answerCues": {
      "A": [
        "配置 ALB",
        "透过将 ALB 与 IdP 整合来强制执行身份验证和授权"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "419": {
    "when": "安全团队需要集中查看所有帐户的安全状态 + 一家公司创建一个 AWS Control Tower 登陆区来管理和治理多个帐户 AWS 环境",
    "target": "为AWS Organizations中的组织启用AWSSecurity Hub + 指定一个AWS帐户为Security Hub的委派管理员",
    "avoid": "别选“为AWS Organizations中的组织启用Amazon侦探”。",
    "questionCues": [
      "安全团队需要集中查看所有帐户的安全状态",
      "一家公司创建一个 AWS Control Tower 登陆区来管理和治理多个帐户 AWS 环境"
    ],
    "answerCues": {
      "D": [
        "为AWS Organizations中的组织启用AWSSecurity Hub",
        "指定一个AWS帐户为Security Hub的委派管理员"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "420": {
    "when": "该公司需要一种不需要客制化开发的解决方案 + 并且必须在传输过程中进行加密 + 可以自动将所有现有的和新的软体映像传输到Amazon S3",
    "target": "部署AWSDataSync代理并配置任务将影像传输到S3储存桶",
    "avoid": "别选“配置 Amazon Kinesis Data Firehose 使用 S3 传输加速传输影像”。",
    "questionCues": [
      "该公司需要一种不需要客制化开发的解决方案",
      "并且必须在传输过程中进行加密",
      "可以自动将所有现有的和新的软体映像传输到Amazon S3"
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
    "when": "解决方案架构师应该做出哪些改变来改善当前的回应时间 + Lambda 函数 Throttles 指标代表 1% 的请求",
    "target": "在桌面上实作DynamoDB自动缩放",
    "avoid": "别选“使用更好分区的主索引重新建立 DynamoDB 表”；认准“在桌面上实作DynamoDB自动缩放”。",
    "questionCues": [
      "解决方案架构师应该做出哪些改变来改善当前的回应时间",
      "Lambda 函数 Throttles 指标代表 1% 的请求"
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
    "when": "公司需要尽快将应用程式迁移到AWS + 需要存取关键资料的档案储存 + 该架构包括一个具有HTTP基于请求的路由的负载平衡器",
    "target": "在所有三个 EC2 实例上安装档案储存 + 将应用程式迁移到三个Availability Zones中的Amazon EC2实例",
    "avoid": "别选“为所有三个 EC2 实例启用跨Region 复制 (CRR)”；认准“在所有三个 EC2 实例上安装档案储存”。",
    "questionCues": [
      "公司需要尽快将应用程式迁移到AWS",
      "需要存取关键资料的档案储存",
      "该架构包括一个具有HTTP基于请求的路由的负载平衡器"
    ],
    "answerCues": {
      "B": [
        "在所有三个 EC2 实例上安装档案储存",
        "将应用程式迁移到三个Availability Zones中的Amazon EC2实例"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "423": {
    "when": "此资讯必须采用图表形式 + 解决方案架构师必须收集有关虚拟机器之间网路依赖性的资讯 + 迁移至AWS",
    "target": "选择 AWS Migration Hub 主目录 AWS Region + 授予 Application Discovery Service 使用 Migration Hub 网路图的权限",
    "avoid": "别选“使用 AWS 上的工作负载发现中的 AWS Migration Hub 资料产生网路图”。",
    "questionCues": [
      "此资讯必须采用图表形式",
      "解决方案架构师必须收集有关虚拟机器之间网路依赖性的资讯",
      "迁移至AWS"
    ],
    "answerCues": {
      "A": [
        "选择 AWS Migration Hub 主目录 AWS Region",
        "授予 Application Discovery Service 使用 Migration Hub 网路图的权限"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "424": {
    "when": "公司需要提高资料库的可扩展效能和可用性 + Multi-AZ + AWS Lambda",
    "target": "并新增Aurora副本 + Amazon RDS Proxy",
    "avoid": "别选“此操作会触发 Lambda 函数为 MySQL 只读副本新增 Amazon RDS”；认准“并新增Aurora副本”。",
    "questionCues": [
      "公司需要提高资料库的可扩展效能和可用性",
      "Multi-AZ",
      "AWS Lambda"
    ],
    "answerCues": {
      "D": [
        "并新增Aurora副本",
        "Amazon RDS Proxy"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "425": {
    "when": "解决方案架构师必须将应用程式资料迁移到 AWS 到新位置 + 在应用程式完全迁移并重写程式码以使用本机Amazon S3 API 之前",
    "target": "将资料储存在S3储存桶中 + 在 on-premises 虚拟机器上部署新的 AWS Storage Gateway 档案闸道",
    "avoid": "别选“将on-premises储存中的资料复制到S3储存桶”；认准“将资料储存在S3储存桶中”。",
    "questionCues": [
      "解决方案架构师必须将应用程式资料迁移到 AWS 到新位置",
      "在应用程式完全迁移并重写程式码以使用本机Amazon S3 API 之前"
    ],
    "answerCues": {
      "D": [
        "将资料储存在S3储存桶中",
        "在 on-premises 虚拟机器上部署新的 AWS Storage Gateway 档案闸道"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "426": {
    "when": "公司需要在 AWS 上部署应用程序 + DNS 名称为 api.example.com + 后端逻辑写入资料库的单一表以将条码标记为已使用",
    "target": "将 CloudFront 发行版与 Lambda@Edge 函数关联 + 建立一个 Amazon Route 53 记录",
    "avoid": "别选“将 CloudFront 发行版与包含用于验证条码的后端逻辑的 CloudFront 函数相关联”。",
    "questionCues": [
      "公司需要在 AWS 上部署应用程序",
      "DNS 名称为 api.example.com",
      "后端逻辑写入资料库的单一表以将条码标记为已使用"
    ],
    "answerCues": {
      "D": [
        "将 CloudFront 发行版与 Lambda@Edge 函数关联",
        "建立一个 Amazon Route 53 记录"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "427": {
    "when": "EC2 实例在三个私有子网路中运行 + 一家医疗公司正在一组 Amazon EC2 实例上执行 REST API + ALB",
    "target": "将 Web ACL 与 ALB 关联 + 建立一个用于自动秘密轮换的AWS Lambda函数",
    "avoid": "别选“将 Web ACL 与 AL 将 ALB 关联到三个私有子网路”；认准“将 Web ACL 与 ALB 关联”。",
    "questionCues": [
      "EC2 实例在三个私有子网路中运行",
      "一家医疗公司正在一组 Amazon EC2 实例上执行 REST API",
      "ALB"
    ],
    "answerCues": {
      "A": [
        "将 Web ACL 与 ALB 关联",
        "建立一个用于自动秘密轮换的AWS Lambda函数"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "428": {
    "when": "解决方案架构师应该如何设计一个既满足需求又经济高效的高可用解决方案 + 安全团队要求存取此资料的流量不得穿越公共网路",
    "target": "使用Direct Connect网关存取其他AWSRegions中的资料 + 建立从公司总部到AWS Region 的两条AWS Direct Connect 连接",
    "avoid": "别选“使用区域间VPC对等存取其他AWSRegions中的资料”。",
    "questionCues": [
      "解决方案架构师应该如何设计一个既满足需求又经济高效的高可用解决方案",
      "安全团队要求存取此资料的流量不得穿越公共网路"
    ],
    "answerCues": {
      "D": [
        "使用Direct Connect网关存取其他AWSRegions中的资料",
        "建立从公司总部到AWS Region 的两条AWS Direct Connect 连接"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "429": {
    "when": "该公司希望在该公司的 on-premises 环境不可用时能够暂时在 AWS 上托管其应用程式 + RPO 5分钟",
    "target": "使用Elastic Disaster Recovery启动使用复制卷的EC2实例 + 将资料复制到附加到 Amazon 弹性块储存 (Amazon EBS) 卷的复制 Amazon EC2 实例",
    "avoid": "别选“使用AWS CloudFormation模板置备Amazon EC2实例并附加EBS卷”。",
    "questionCues": [
      "该公司希望在该公司的 on-premises 环境不可用时能够暂时在 AWS 上托管其应用程式",
      "RPO 5分钟"
    ],
    "answerCues": {
      "B": [
        "使用Elastic Disaster Recovery启动使用复制卷的EC2实例",
        "将资料复制到附加到 Amazon 弹性块储存 (Amazon EBS) 卷的复制 Amazon EC2 实例"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "430": {
    "when": "解决方案架构师注意到资料从新的Regions到达S3储存桶有明显的延迟 + 解决方案架构师将S3储存桶保留在eu-north-1中",
    "target": "设定S3跨Region复制 + 将资料复制到eu-north-1中的S3储存桶",
    "avoid": "别选“将应用程式变更为使用新的S3加速端点”；认准“设定S3跨Region复制”。",
    "questionCues": [
      "解决方案架构师注意到资料从新的Regions到达S3储存桶有明显的延迟",
      "解决方案架构师将S3储存桶保留在eu-north-1中"
    ],
    "answerCues": {
      "C": [
        "设定S3跨Region复制",
        "将资料复制到eu-north-1中的S3储存桶"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "431": {
    "when": "最多 10 个业务单元 VPC 需要连接到共享 VPC + 集中式应用程式必须可从其他业务部门的 VPC 中执行的用户端应用程式存取",
    "target": "使用集中式应用程式 NLB 建立 VPC 端点服务 + 使用端点服务的服务名称在每个业务部门 VPC 中建立一个 VPC 端点",
    "avoid": "别选“设定 VPC 路由表以将流量传送至中转网关”；认准“使用集中式应用程式 NLB 建立 VPC 端点服务”。",
    "questionCues": [
      "最多 10 个业务单元 VPC 需要连接到共享 VPC",
      "集中式应用程式必须可从其他业务部门的 VPC 中执行的用户端应用程式存取"
    ],
    "answerCues": {
      "B": [
        "使用集中式应用程式 NLB 建立 VPC 端点服务",
        "使用端点服务的服务名称在每个业务部门 VPC 中建立一个 VPC 端点"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "432": {
    "when": "解决方案架构师需要确定公司将用于 AWS 网站的架构 + 一家公司想要将其网站迁移到AWS",
    "target": "将清单从本地部署到 EKS 集群 + Amazon EKS",
    "avoid": "别选“为每个任务定义配置 ECS 服务以符合原始 Kubernetes 部署”；认准“将清单从本地部署到 EKS 集群”。",
    "questionCues": [
      "解决方案架构师需要确定公司将用于 AWS 网站的架构",
      "一家公司想要将其网站迁移到AWS"
    ],
    "answerCues": {
      "B": [
        "将清单从本地部署到 EKS 集群",
        "Amazon EKS"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "433": {
    "when": "该公司必须设计一种新的架构来降低举办竞赛的成本 + 公司不需要保留比赛的任何数据 + 并将竞赛条目储存在 Amazon RDS 资料库实例上",
    "target": "ElastiCache + 在 RDS 资料库实例前面为 Redis 集群",
    "avoid": "别选“删除DynamoDB表”；认准“ElastiCache”。",
    "questionCues": [
      "该公司必须设计一种新的架构来降低举办竞赛的成本",
      "公司不需要保留比赛的任何数据",
      "并将竞赛条目储存在 Amazon RDS 资料库实例上"
    ],
    "answerCues": {
      "C": [
        "ElastiCache",
        "在 RDS 资料库实例前面为 Redis 集群"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "434": {
    "when": "公司必须扫描公司VPC中来自公司AWS实例的所有流量是否违反公司安全策略 + 本公司也会建立符合安全策略的安全群组 + 实施了新的安全要求",
    "target": "停用对执行代理软体的 EC2 实例的来源/目标检查",
    "avoid": "别选“在指派给代理程式EC2实例的安全群组新增一条规则”；认准“停用对执行代理软体的 EC2 实例的来源/目标检查”。",
    "questionCues": [
      "公司必须扫描公司VPC中来自公司AWS实例的所有流量是否违反公司安全策略",
      "本公司也会建立符合安全策略的安全群组",
      "实施了新的安全要求"
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
    "when": "公司应该如何做才能以最少的努力满足这项新要求 + 公司必须以自动方式管理所有基础设施 + 根据新的要求",
    "target": "严格规定现有的VPC资源和配置 + 创建一个新的CloudFormation模板",
    "avoid": "别选“使用堆叠集将VPC导入堆叠”；认准“严格规定现有的VPC资源和配置”。",
    "questionCues": [
      "公司应该如何做才能以最少的努力满足这项新要求",
      "公司必须以自动方式管理所有基础设施",
      "根据新的要求"
    ],
    "answerCues": {
      "C": [
        "严格规定现有的VPC资源和配置",
        "创建一个新的CloudFormation模板"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "436": {
    "when": "该公司希望有一种解决方案能够提供改进的下载效能和较低的传输成本 + 并希望将其提供给公众下载 + 新版本包大小约5GB",
    "target": "网站使用Amazon CloudFront + 配置 Amazon Route 53 和 Amazon S3 储存桶用于网站托管",
    "avoid": "别选“设定请求者为 S3 储存桶付费”；认准“网站使用Amazon CloudFront”。",
    "questionCues": [
      "该公司希望有一种解决方案能够提供改进的下载效能和较低的传输成本",
      "并希望将其提供给公众下载",
      "新版本包大小约5GB"
    ],
    "answerCues": {
      "C": [
        "网站使用Amazon CloudFront",
        "配置 Amazon Route 53 和 Amazon S3 储存桶用于网站托管"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "437": {
    "when": "此资料库在具有两个私有子网路的 VPC 中运作 + 该网站在上个月遭受了几次中断 + 解决方案架构师应该采取哪些措施来提高应用程式的可靠性",
    "target": "A：其中 Application Load Balancer 后面有多个 EC2 实例；C：并使用 Aurora 副本；F：在网站 VPC 的不同Availability Zone 中建立一个额外的公有子网路",
    "avoid": "别选“提供额外的 VPC 对等连接”；认准“其中 Application Load Balancer 后面有多个 EC2 实例”。",
    "questionCues": [
      "此资料库在具有两个私有子网路的 VPC 中运作",
      "该网站在上个月遭受了几次中断",
      "解决方案架构师应该采取哪些措施来提高应用程式的可靠性"
    ],
    "answerCues": {
      "A": [
        "其中 Application Load Balancer 后面有多个 EC2 实例"
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
    "when": "解决方案架构师需要向访客提供自订错误页面 + ALB偶尔会回传 502 状态码（网关错误）错误 + 而不是标准的 ALB 错误页面",
    "target": "A：配置S3储存桶来托管静态网页；E：透过配置 CloudFront 自订错误页面来新增自订错误回应",
    "avoid": "别选“透过新增健康检查来修改现有的Amazon Route 53记录”；认准“配置S3储存桶来托管静态网页”。",
    "questionCues": [
      "解决方案架构师需要向访客提供自订错误页面",
      "ALB偶尔会回传 502 状态码（网关错误）错误",
      "而不是标准的 ALB 错误页面"
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
    "when": "公司必须尽量减少资料库服务中断 + 一家公司希望将 Amazon Aurora MySQL 资料库集群从现有 AWS 帐户",
    "target": "A：拍摄现有 Aurora 资料库的快照；B：AWS Database Migration Service",
    "avoid": "别选“使用 AWS Backup 将现有 AWS 帐户中的 Aurora 资料库备份共用到新 AWS 帐户”。",
    "questionCues": [
      "公司必须尽量减少资料库服务中断",
      "一家公司希望将 Amazon Aurora MySQL 资料库集群从现有 AWS 帐户"
    ],
    "answerCues": {
      "A": [
        "拍摄现有 Aurora 资料库的快照"
      ],
      "B": [
        "AWS Database Migration Service"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "440": {
    "when": "新功能还需要从每个客户的VPC到公司管理层VPC的单向访问 + 要求所有 50 个VPC 能够相互通讯 + 管理VPC托管运算资源",
    "target": "A：将公司的所有 VPC 和相关子网路连接到中转网关；E：在公司管理层VPC和每个客户的VPC之间创建VPC对等连接",
    "avoid": "别选“在公司所有 VPC 之间创建 VPC 对等连接”；认准“将公司的所有 VPC 和相关子网路连接到中转网关”。",
    "questionCues": [
      "新功能还需要从每个客户的VPC到公司管理层VPC的单向访问",
      "要求所有 50 个VPC 能够相互通讯",
      "管理VPC托管运算资源"
    ],
    "answerCues": {
      "A": [
        "将公司的所有 VPC 和相关子网路连接到中转网关"
      ],
      "E": [
        "在公司管理层VPC和每个客户的VPC之间创建VPC对等连接"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "441": {
    "when": "该公司已要求其解决方案架构师开发符合以下要求的解决方案 + 每个LOB 帐号都应被授予完全管理员权限 + 无论治理策略如何",
    "target": "B：使用 AWS Organizations ​​在父帐户中建立单一组织；D：建立仅允许批准的服务和功能的 SCP",
    "avoid": "别选“使用 AWS Organizations ​​在父帐户中为每个 LOB 建立组织”。",
    "questionCues": [
      "该公司已要求其解决方案架构师开发符合以下要求的解决方案",
      "每个LOB 帐号都应被授予完全管理员权限",
      "无论治理策略如何"
    ],
    "answerCues": {
      "B": [
        "使用 AWS Organizations ​​在父帐户中建立单一组织"
      ],
      "D": [
        "建立仅允许批准的服务和功能的 SCP"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "442": {
    "when": "Route 53 不会自动将使用者重新导向到另一个 Region + 该应用程式使用Amazon Route 53基于延迟的路由",
    "target": "A：Web 伺服器停止的Region 的权重高于其他Region 的权重；E：设定 HTTP",
    "avoid": "别选“辅助 Region 中的其中一台 Web 伺服器未通过其 HTTP 运行状况检查”。",
    "questionCues": [
      "Route 53 不会自动将使用者重新导向到另一个 Region",
      "该应用程式使用Amazon Route 53基于延迟的路由"
    ],
    "answerCues": {
      "A": [
        "Web 伺服器停止的Region 的权重高于其他Region 的权重"
      ],
      "E": [
        "设定 HTTP"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "443": {
    "when": "该机构需要一种能够优化营运管理费用和成本的解决方案 + 该机构希望提高应用程式的整体可用性并减少执行维护任务所需的工作量",
    "target": "并将其储存到 Amazon S3 储存桶中 + 使用 AWS Lambda 函数读取 Kinesis Data Firehose 数据",
    "avoid": "别选“以将资料转换为 .csv 格式并将其储存在 Amazon S3 储存桶中”；认准“并将其储存到 Amazon S3 储存桶中”。",
    "questionCues": [
      "该机构需要一种能够优化营运管理费用和成本的解决方案",
      "该机构希望提高应用程式的整体可用性并减少执行维护任务所需的工作量"
    ],
    "answerCues": {
      "B": [
        "并将其储存到 Amazon S3 储存桶中",
        "使用 AWS Lambda 函数读取 Kinesis Data Firehose 数据"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "444": {
    "when": "Auto Scaling 在中断期间不断更换实例 + 同时提高整个应用程式堆叠的可用性和功能的监控能力 + 该应用程式遇到了中断",
    "target": "A：配置 Amazon RDS MySQL 的唯读副本；B：并针对产品页面进行 Amazon Route 53 运行状况检查",
    "avoid": "别选“为 Amazon RDS 配置 Amazon CloudWatch 警报”。",
    "questionCues": [
      "Auto Scaling 在中断期间不断更换实例",
      "同时提高整个应用程式堆叠的可用性和功能的监控能力",
      "该应用程式遇到了中断"
    ],
    "answerCues": {
      "A": [
        "配置 Amazon RDS MySQL 的唯读副本"
      ],
      "B": [
        "并针对产品页面进行 Amazon Route 53 运行状况检查"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "445": {
    "when": "该公司需要一个AWS托管解决方案来进行Kubernetes管理 + 用于生产工作负载的EKS控制平面和资料平面必须驻留在本地",
    "target": "将 Amazon EKS 安装在 on-premises 资料中心的公司硬体上的任何位置 + 在 EKS Anywhere 集群上部署生产工作负载",
    "avoid": "别选“在 Outposts 伺服器上的任何位置安装 Amazon EKS”。",
    "questionCues": [
      "该公司需要一个AWS托管解决方案来进行Kubernetes管理",
      "用于生产工作负载的EKS控制平面和资料平面必须驻留在本地"
    ],
    "answerCues": {
      "B": [
        "将 Amazon EKS 安装在 on-premises 资料中心的公司硬体上的任何位置",
        "在 EKS Anywhere 集群上部署生产工作负载"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "446": {
    "when": "一家公司使用AWS Organizations来管理其开发环境 + 所有开发团队都需要使用资料库集群中的即时资料 + VPC",
    "target": "为资料库集群建立 AWS Resource Access Manager (AWS RAM) 资源共用 + 与所有开发帐户共用资料库集群",
    "avoid": "别选“为中转网关建立 AWS Resource Access Manager (AWS RAM) 资源共享”。",
    "questionCues": [
      "一家公司使用AWS Organizations来管理其开发环境",
      "所有开发团队都需要使用资料库集群中的即时资料",
      "VPC"
    ],
    "answerCues": {
      "A": [
        "为资料库集群建立 AWS Resource Access Manager (AWS RAM) 资源共用",
        "与所有开发帐户共用资料库集群"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "447": {
    "when": "并且必须自动通知公司的营运团队 + 此解决方案必须协助识别导致成本增加的资源 + 该公司希望自动化寻找未使用资源的流程",
    "target": "使用 AWS 成本异常侦测建立监控类型为 AWS 服务的成本监控器 + 建立订阅以将每日 AWS 成本摘要发送给营运团队",
    "avoid": "别选“使用 AWS Cost Explorer 确定过去 3 个月的平均每月成本”。",
    "questionCues": [
      "并且必须自动通知公司的营运团队",
      "此解决方案必须协助识别导致成本增加的资源",
      "该公司希望自动化寻找未使用资源的流程"
    ],
    "answerCues": {
      "D": [
        "使用 AWS 成本异常侦测建立监控类型为 AWS 服务的成本监控器",
        "建立订阅以将每日 AWS 成本摘要发送给营运团队"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "448": {
    "when": "解决方案架构师必须设计一个 Multi-AZ 解决方案 + 并且总共需要 225 MiBps 的读取吞吐量 + 该公司希望",
    "target": "为 Lustre le 系统部署新的 Amazon FSx + 为档案系统配置突发吞吐量模式",
    "avoid": "别选“在生产 Region 和 DR Region 中为 OpenZFS 档案系统部署 Amazon FSx”。",
    "questionCues": [
      "解决方案架构师必须设计一个 Multi-AZ 解决方案",
      "并且总共需要 225 MiBps 的读取吞吐量",
      "该公司希望"
    ],
    "answerCues": {
      "B": [
        "为 Lustre le 系统部署新的 Amazon FSx",
        "为档案系统配置突发吞吐量模式"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "449": {
    "when": "公司需要在实验结束后尽快集中收集资料并将资料移至AWS云端中的物件储存 + 一家公司需要从没有网路连线的远端位置的实验中收集数据",
    "target": "配置感测器将资料上传到EC2实例 + 在 EC2 实例上安装并设定 FTP 伺服器",
    "avoid": "别选“配置设备以使用 Amazon FSx”；认准“配置感测器将资料上传到EC2实例”。",
    "questionCues": [
      "公司需要在实验结束后尽快集中收集资料并将资料移至AWS云端中的物件储存",
      "一家公司需要从没有网路连线的远端位置的实验中收集数据"
    ],
    "answerCues": {
      "C": [
        "配置感测器将资料上传到EC2实例",
        "在 EC2 实例上安装并设定 FTP 伺服器"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "450": {
    "when": "每个AWS帐户的管理员需要使用AmazonAthena查看其帐户的详细成本和利用率资料 + 每个业务部门只能存取自己的成本和利用率资料",
    "target": "修改S3桶策略 + 配置 S3 事件",
    "avoid": "别选“建立一个新的S3储存桶来储存成本和使用情况报告资料”；认准“修改S3桶策略”。",
    "questionCues": [
      "每个AWS帐户的管理员需要使用AmazonAthena查看其帐户的详细成本和利用率资料",
      "每个业务部门只能存取自己的成本和利用率资料"
    ],
    "answerCues": {
      "B": [
        "修改S3桶策略",
        "配置 S3 事件"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "451": {
    "when": "以确保该解决方案具有高可用性、容错性和安全性 + 公司必须更新现有的网路连线解决方案 + AWS Direct Connect",
    "target": "新增静态 AWS Site-to-Site VPN 作为辅助路径 + 以保护传输中的资料并为 Direct Connect 连接提供弹性",
    "avoid": "别选“设定 MACsec 以加密Direct Connect 连线内的流量”。",
    "questionCues": [
      "以确保该解决方案具有高可用性、容错性和安全性",
      "公司必须更新现有的网路连线解决方案",
      "AWS Direct Connect"
    ],
    "answerCues": {
      "D": [
        "新增静态 AWS Site-to-Site VPN 作为辅助路径",
        "以保护传输中的资料并为 Direct Connect 连接提供弹性"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "452": {
    "when": "该公司需要一种能够快速扩展的视讯储存解决方案 + 其他用户必须能够从应用程式下载影片档案 + 使用该应用程式上传最大 4 GB 的影片档案",
    "target": "将S3金钥储存在对应的DynamoDB项中 + 将影片作为物件储存在Amazon S3中",
    "avoid": "别选“将 S3 物件标识符储存在对应的 Amazon Keyspaces 条目中”；认准“将S3金钥储存在对应的DynamoDB项中”。",
    "questionCues": [
      "该公司需要一种能够快速扩展的视讯储存解决方案",
      "其他用户必须能够从应用程式下载影片档案",
      "使用该应用程式上传最大 4 GB 的影片档案"
    ],
    "answerCues": {
      "B": [
        "将S3金钥储存在对应的DynamoDB项中",
        "将影片作为物件储存在Amazon S3中"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "453": {
    "when": "解决方案架构师必须确保可以在 RPO 100 分钟内恢复已删除的文件 + 自动备份使用 AWS Backup 预设备份计划",
    "target": "使用现有的备份计划 + 启用连续备份以进行时间点复原",
    "avoid": "别选“使用新的 IAM 角色建立备份”；认准“使用现有的备份计划”。",
    "questionCues": [
      "解决方案架构师必须确保可以在 RPO 100 分钟内恢复已删除的文件",
      "自动备份使用 AWS Backup 预设备份计划"
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
    "when": "解决方案架构师必须为云端工程师团队提供一种安全的方法 + 云端工程师必须使用 MFA 来执行 Amazon S3 中的任何操作",
    "target": "将临时凭证附加到当使用者在 Amazon S3 中执行操作时 Amazon S3 将引用的设定档中 + AWS STS",
    "avoid": "别选“将策略附加到 S3 储存桶”。",
    "questionCues": [
      "解决方案架构师必须为云端工程师团队提供一种安全的方法",
      "云端工程师必须使用 MFA 来执行 Amazon S3 中的任何操作"
    ],
    "answerCues": {
      "D": [
        "将临时凭证附加到当使用者在 Amazon S3 中执行操作时 Amazon S3 将引用的设定档中",
        "AWS STS"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "455": {
    "when": "该公司需要一种能够最大限度地减少迁移时间且无需更改应用程式程式码的解决方案 + 该公司也不想管理基础设施 + 迁移到AWS",
    "target": "使用 Windows Web 应用程式迁移助手将应用程式移转到 AWS Elastic Beanstalk + 使用Elastic Beanstalk来部署和管理应用程式",
    "avoid": "别选“使用EC2实例来部署和管理应用程式”。",
    "questionCues": [
      "该公司需要一种能够最大限度地减少迁移时间且无需更改应用程式程式码的解决方案",
      "该公司也不想管理基础设施",
      "迁移到AWS"
    ],
    "answerCues": {
      "B": [
        "使用 Windows Web 应用程式迁移助手将应用程式移转到 AWS Elastic Beanstalk",
        "使用Elastic Beanstalk来部署和管理应用程式"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "456": {
    "when": "公司需要对储存在 Amazon S3 储存桶中的资料执行大型批次作业 + 每个作业必须处理15-20GB的资料 + 过程可以承受中断",
    "target": "建立包含 Amazon EC2 Spot 实例的 AWS Batch 计算环境 + 指定 SPOT_CAPACITY_OPTIMIZED 分配策略",
    "avoid": "别选“建立包含 Amazon EC2 按需实例和 Spot 实例的 AWS Batch 计算环境”。",
    "questionCues": [
      "公司需要对储存在 Amazon S3 储存桶中的资料执行大型批次作业",
      "每个作业必须处理15-20GB的资料",
      "过程可以承受中断"
    ],
    "answerCues": {
      "B": [
        "建立包含 Amazon EC2 Spot 实例的 AWS Batch 计算环境",
        "指定 SPOT_CAPACITY_OPTIMIZED 分配策略"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "457": {
    "when": "该公司需要能够在收到请求后 1 周内检索存档资料 + 公司需要设定频宽限制并安排在非工作时间将存档影像复制到AWS + NFS",
    "target": "将 AWS DataSync 代理部署为本机 Hyper-V VM + 复制到 Amazon S3 Glacier Deep Archive",
    "avoid": "别选“创建 S3 生命周期规则”；认准“将 AWS DataSync 代理部署为本机 Hyper-V VM”。",
    "questionCues": [
      "该公司需要能够在收到请求后 1 周内检索存档资料",
      "公司需要设定频宽限制并安排在非工作时间将存档影像复制到AWS",
      "NFS"
    ],
    "answerCues": {
      "B": [
        "将 AWS DataSync 代理部署为本机 Hyper-V VM",
        "复制到 Amazon S3 Glacier Deep Archive"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "458": {
    "when": "公司需要找出每个客户每天、每周和每月有多少唯一用户 + 一家公司希望记录其应用程式的关键绩效指标 (KPI) + CloudWatch",
    "target": "配置 Amazon CloudWatch 日志指标过滤器 + 将使用者名称和客户名称配置为指标的维度",
    "avoid": "别选“使每次成功登入都会产生对AWS SDK 的调用”；认准“配置 Amazon CloudWatch 日志指标过滤器”。",
    "questionCues": [
      "公司需要找出每个客户每天、每周和每月有多少唯一用户",
      "一家公司希望记录其应用程式的关键绩效指标 (KPI)",
      "CloudWatch"
    ],
    "answerCues": {
      "A": [
        "配置 Amazon CloudWatch 日志指标过滤器",
        "将使用者名称和客户名称配置为指标的维度"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "459": {
    "when": "该公司的安全团队实施了一项新要求 + 解决方案架构师必须用短期解决方案取代金钥 + 即管道不能再使用长期金钥",
    "target": "使用适当的信任策略创建一个新的 IAM 角色 + 更新 GitHub 以承担管道的角色",
    "avoid": "别选“将现有 IAM 策略附加到新的 IAM 角色”；认准“使用适当的信任策略创建一个新的 IAM 角色”。",
    "questionCues": [
      "该公司的安全团队实施了一项新要求",
      "解决方案架构师必须用短期解决方案取代金钥",
      "即管道不能再使用长期金钥"
    ],
    "answerCues": {
      "B": [
        "使用适当的信任策略创建一个新的 IAM 角色",
        "更新 GitHub 以承担管道的角色"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "460": {
    "when": "解决方案架构师需要重新设计架构以最佳化成本 + 当 SQS 伫列中没有 URL 时 + EFS 卷安装在 eet 的所有实例上",
    "target": "B：将网路爬虫过程转换为AWS Lambda函数；E：将结果储存在Amazon S3中",
    "avoid": "别选“使用 m5.8xlarge 实例而不是 t2.micro 实例进行网路爬行过程”。",
    "questionCues": [
      "解决方案架构师需要重新设计架构以最佳化成本",
      "当 SQS 伫列中没有 URL 时",
      "EFS 卷安装在 eet 的所有实例上"
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
    "when": "AWS 上的新解决方案必须能够从 2 个Amazon EC2 实例扩展到 30 个EC2 实例 + 并且必须防止资料遗失",
    "target": "使用 .ebextensions 将 EFS 档案系统挂载到 EC2 实例 + 使用 Application Load Balancer 和 Auto Scaling 组将 CMS",
    "avoid": "别选“建立启动模板和 Auto Scaling 群组来启动 EC2 实例以支援 CMS”。",
    "questionCues": [
      "AWS 上的新解决方案必须能够从 2 个Amazon EC2 实例扩展到 30 个EC2 实例",
      "并且必须防止资料遗失"
    ],
    "answerCues": {
      "A": [
        "使用 .ebextensions 将 EFS 档案系统挂载到 EC2 实例",
        "使用 Application Load Balancer 和 Auto Scaling 组将 CMS"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "462": {
    "when": "此解决方案必须最大限度地减少资料遗失 + 解决方案架构师必须设计一个能够在灾难期间提供弹性的解决方案 + ALB",
    "target": "配置应用程式以指向新的 S3 储存桶 + 在单独的 Region 中建立 RDS 资料库实例的唯读副本",
    "avoid": "别选“启动 EC2 实例并在单独的 Region 中建立一个 ALB”；认准“配置应用程式以指向新的 S3 储存桶”。",
    "questionCues": [
      "此解决方案必须最大限度地减少资料遗失",
      "解决方案架构师必须设计一个能够在灾难期间提供弹性的解决方案",
      "ALB"
    ],
    "answerCues": {
      "C": [
        "配置应用程式以指向新的 S3 储存桶",
        "在单独的 Region 中建立 RDS 资料库实例的唯读副本"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "463": {
    "when": "该公司希望扩展到新的细分市场 + 连线无法穿越网路 + VPN",
    "target": "建立接受 TCP 流量的 VPC 端点服务 + 将其托管在 Network Load Balancer 后面",
    "avoid": "别选“建立接受 HTTP 或 HTTPS 流量的 VPC 端点服务”；认准“建立接受 TCP 流量的 VPC 端点服务”。",
    "questionCues": [
      "该公司希望扩展到新的细分市场",
      "连线无法穿越网路",
      "VPN"
    ],
    "answerCues": {
      "A": [
        "建立接受 TCP 流量的 VPC 端点服务",
        "将其托管在 Network Load Balancer 后面"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "464": {
    "when": "其中仅允许管理员角色使用IAM操作 + 某公司使用 AWS Organizations ​​管理其 AWS 帐户",
    "target": "以拒绝除具有管理员角色的使用者之外的所有使用者的 IAM 操作 + 建立适用于所有 AWS 帐户的 SCP",
    "avoid": "别选“以仅允许管理员角色执行 IAM 操作”；认准“以拒绝除具有管理员角色的使用者之外的所有使用者的 IAM 操作”。",
    "questionCues": [
      "其中仅允许管理员角色使用IAM操作",
      "某公司使用 AWS Organizations ​​管理其 AWS 帐户"
    ],
    "answerCues": {
      "C": [
        "以拒绝除具有管理员角色的使用者之外的所有使用者的 IAM 操作",
        "建立适用于所有 AWS 帐户的 SCP"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "465": {
    "when": "该公司还希望让开发团队能够根据需要重新建立团队与共享服务帐户的连结 + 使用AWS Organizations中的组织来管理多个AWS帐户",
    "target": "AWS RAM + AWS Resource Access Manager",
    "avoid": "别选“使用端点策略为开发帐户授予VPC端点的权限”；认准“AWS RAM”。",
    "questionCues": [
      "该公司还希望让开发团队能够根据需要重新建立团队与共享服务帐户的连结",
      "使用AWS Organizations中的组织来管理多个AWS帐户"
    ],
    "answerCues": {
      "B": [
        "AWS RAM",
        "AWS Resource Access Manager"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "466": {
    "when": "解决方案架构师需要为从资料中心迁移所有工作负载产生总拥有成本 (TCO) 报告 + 发现资料必须自动汇入到AWS Migration Hub",
    "target": "安装 Migration Evaluator 无代理程式收集器 + 配置迁移评估器以产生 TCO 报告",
    "avoid": "别选“配置 Migration Hub 以产生 TCO 报告”；认准“安装 Migration Evaluator 无代理程式收集器”。",
    "questionCues": [
      "解决方案架构师需要为从资料中心迁移所有工作负载产生总拥有成本 (TCO) 报告",
      "发现资料必须自动汇入到AWS Migration Hub"
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
    "when": "如果最近的Region中的游戏资源不可用 + 公司要求从最近的Region取得游戏资源 + ALB",
    "target": "为每个ALB 建立Amazon Route 53 运行状况检查 + 建立指向两个 ALB 的 Route 53 延迟别名记录",
    "avoid": "别选“建立指向两个 ALB 的 Route 53 故障转移路由记录”。",
    "questionCues": [
      "如果最近的Region中的游戏资源不可用",
      "公司要求从最近的Region取得游戏资源",
      "ALB"
    ],
    "answerCues": {
      "D": [
        "为每个ALB 建立Amazon Route 53 运行状况检查",
        "建立指向两个 ALB 的 Route 53 延迟别名记录"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "468": {
    "when": "公司必须无限期保留日志档案 + 解决方案架构师必须提高日志分析的效能并减少VPC流日志使用的储存空间 + 安全工程师偶尔会",
    "target": "更新 VPC 流日志配置 + 指定日志档案每小时的分割区",
    "avoid": "别选“建立一个 AWS Lambda 函数来解压缩 gzip 档案并使用 bzip2 压缩来压缩档案”；认准“更新 VPC 流日志配置”。",
    "questionCues": [
      "公司必须无限期保留日志档案",
      "解决方案架构师必须提高日志分析的效能并减少VPC流日志使用的储存空间",
      "安全工程师偶尔会"
    ],
    "answerCues": {
      "C": [
        "更新 VPC 流日志配置",
        "指定日志档案每小时的分割区"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "469": {
    "when": "公司必须使用 Direct Connect 连接透过中转 VIF 连接到 VPC 资源 + AWS Direct Connect",
    "target": "B：透过中转 VIF 通告 on-premises 网路前缀；C：透过中转 VIF 将 VPC 前缀从 Direct Connect 闸道通告到 on-premises 网路",
    "avoid": "别选“将 1 Gbps Direct Connect 连线更新为 10 Gbps”。",
    "questionCues": [
      "公司必须使用 Direct Connect 连接透过中转 VIF 连接到 VPC 资源",
      "AWS Direct Connect"
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
    "when": "对应用程式的存取必须仅限于公司分公司位置 + 公司安全策略规定 + 一家公司希望将AmazonWorkSpaces与瘦客户端设备结合",
    "target": "使用分公司的公共位址清单建立 IP 存取控制组规则 + 将 IP 存取控制组与WorkSpaces 目录关联",
    "avoid": "别选“将 Web ACL 与 WorkSpaces 目录关联”；认准“使用分公司的公共位址清单建立 IP 存取控制组规则”。",
    "questionCues": [
      "对应用程式的存取必须仅限于公司分公司位置",
      "公司安全策略规定",
      "一家公司希望将AmazonWorkSpaces与瘦客户端设备结合"
    ],
    "answerCues": {
      "A": [
        "使用分公司的公共位址清单建立 IP 存取控制组规则",
        "将 IP 存取控制组与WorkSpaces 目录关联"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "471": {
    "when": "防火墙设备需要能够水平扩展 + 每个防火墙设备都在手动配置的高可用Amazon EC2实例上运行 + 以在网路扩展时处理增加的流量",
    "target": "A：部署Gateway Load Balancer；C：建立使用实例目标类型的目标群组；F：在集中网路帐号中建立 VPC 端点",
    "avoid": "别选“更新路由表以指向 VPC 端点”；认准“部署Gateway Load Balancer”。",
    "questionCues": [
      "防火墙设备需要能够水平扩展",
      "每个防火墙设备都在手动配置的高可用Amazon EC2实例上运行",
      "以在网路扩展时处理增加的流量"
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
    "when": "此资料库配置为自动备份 + Web 应用程式设定为使用Amazon Route 53 记录将流量路由到资料库 + RPO 为 2 小时",
    "target": "A：在辅助 Region 中配置 AWS Lambda 功能；D：在 Route 53 中为资料库 DNS 记录建立故障转移路由策略",
    "avoid": "别选“并更新资料库的 Route 53 主机记录”；认准“在辅助 Region 中配置 AWS Lambda 功能”。",
    "questionCues": [
      "此资料库配置为自动备份",
      "Web 应用程式设定为使用Amazon Route 53 记录将流量路由到资料库",
      "RPO 为 2 小时"
    ],
    "answerCues": {
      "A": [
        "在辅助 Region 中配置 AWS Lambda 功能"
      ],
      "D": [
        "在 Route 53 中为资料库 DNS 记录建立故障转移路由策略"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "473": {
    "when": "解决方案架构师应该建议什么来优化应用程式的效能 + 并注意到 Lambda 呼叫和资料库连接显著增加 + 可呼叫 AWS Lambda 函数",
    "target": "修改 Lambda 函数以使用代理终端节点 + 使用 Lambda 控制台建立 RDS 代理程式",
    "avoid": "别选“修改 Lambda 函数以在检索资料时关闭资料库连线”；认准“修改 Lambda 函数以使用代理终端节点”。",
    "questionCues": [
      "解决方案架构师应该建议什么来优化应用程式的效能",
      "并注意到 Lambda 呼叫和资料库连接显著增加",
      "可呼叫 AWS Lambda 函数"
    ],
    "answerCues": {
      "C": [
        "修改 Lambda 函数以使用代理终端节点",
        "使用 Lambda 控制台建立 RDS 代理程式"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "474": {
    "when": "该解决方案必须提供近乎即时的更新分析 + 解决方案架构师必须将架构重新设计为使用无伺服器服务的事件驱动解决方案 + Amazon EC2",
    "target": "使用 Amazon EventBridge 将所有传入资料传送至微服务和分析资料库 + 将零售 MySQL 资料库迁移到 Amazon Aurora Serverless MySQL",
    "avoid": "别选“将零售 MySQL 资料库保留在 Amazon EC2 上”。",
    "questionCues": [
      "该解决方案必须提供近乎即时的更新分析",
      "解决方案架构师必须将架构重新设计为使用无伺服器服务的事件驱动解决方案",
      "Amazon EC2"
    ],
    "answerCues": {
      "C": [
        "使用 Amazon EventBridge 将所有传入资料传送至微服务和分析资料库",
        "将零售 MySQL 资料库迁移到 Amazon Aurora Serverless MySQL"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "475": {
    "when": "解决方案架构师必须设计一个在所有 AWS 帐户中启用 AWS CloudTrail 的解决方案 + 并根据需要添加帐户",
    "target": "配置追踪以记录组织中所有 AWS 帐户的所有事件 + 在组织的管理帐户中建立新的 CloudTrail 追踪",
    "avoid": "别选“使用 Systems Manager 状态管理器呼叫自动化”；认准“配置追踪以记录组织中所有 AWS 帐户的所有事件”。",
    "questionCues": [
      "解决方案架构师必须设计一个在所有 AWS 帐户中启用 AWS CloudTrail 的解决方案",
      "并根据需要添加帐户"
    ],
    "answerCues": {
      "B": [
        "配置追踪以记录组织中所有 AWS 帐户的所有事件",
        "在组织的管理帐户中建立新的 CloudTrail 追踪"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "476": {
    "when": "必须使用多重身份验证 (MFA) 才能存取 VPN + 部署在 VPC 中的所有内部非公共服务必须可透过 VPN 存取",
    "target": "建立 AWS Client VPN 端点 + 为 AD 连接器启用 MFA",
    "avoid": "别选“配置 VPN 和 AD DS 之间的整合”；认准“建立 AWS Client VPN 端点”。",
    "questionCues": [
      "必须使用多重身份验证 (MFA) 才能存取 VPN",
      "部署在 VPC 中的所有内部非公共服务必须可透过 VPN 存取"
    ],
    "answerCues": {
      "B": [
        "建立 AWS Client VPN 端点",
        "为 AD 连接器启用 MFA"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "477": {
    "when": "解决方案架构师必须制定迁移到AWS的计划来解决这些问题 + 客户无法透过该应用程式下订单 + 该公司已在不久的将来安排了几次类似的促销活动",
    "target": "A：以便静态资源可以托管在Amazon S3上；D：使用 AWS Fargate 托管容器；E：使用 Aurora Auto Scaling 作为唯读副本",
    "avoid": "别选“在 Auto Scaling 组前面使用负载平衡器”；认准“以便静态资源可以托管在Amazon S3上”。",
    "questionCues": [
      "解决方案架构师必须制定迁移到AWS的计划来解决这些问题",
      "客户无法透过该应用程式下订单",
      "该公司已在不久的将来安排了几次类似的促销活动"
    ],
    "answerCues": {
      "A": [
        "以便静态资源可以托管在Amazon S3上"
      ],
      "D": [
        "使用 AWS Fargate 托管容器"
      ],
      "E": [
        "使用 Aurora Auto Scaling 作为唯读副本"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "478": {
    "when": "AWS 上的所有资源都必须持续扫描安全漏洞 + 该公司的安全准则规定 + EKS 群集有一个 AWS 受管节点组",
    "target": "启动AmazonInspector扫描EKS节点和ECR储存库",
    "avoid": "别选“配置EC2实例扫描EKS节点”；认准“启动AmazonInspector扫描EKS节点和ECR储存库”。",
    "questionCues": [
      "AWS 上的所有资源都必须持续扫描安全漏洞",
      "该公司的安全准则规定",
      "EKS 群集有一个 AWS 受管节点组"
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
    "when": "这种中断对应用程式的门票销售交易产生了负面影响 + 但候诊室的负载正在扰乱应用程式的可用性 + 直到有可用容量进行购买",
    "target": "CloudFront + 在ECS群集中为候诊室创建一个单独的服务",
    "avoid": "别选“确保票务服务使用 JWT 资讯并将请求适当转发到候诊室服务”；认准“CloudFront”。",
    "questionCues": [
      "这种中断对应用程式的门票销售交易产生了负面影响",
      "但候诊室的负载正在扰乱应用程式的可用性",
      "直到有可用容量进行购买"
    ],
    "answerCues": {
      "C": [
        "CloudFront",
        "在ECS群集中为候诊室创建一个单独的服务"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "480": {
    "when": "EC2实例无法再承担父帐户中的角色 + CloudFormation模板可以根据需要销毁并重新建立 + 解决方案架构师应该如何解决此问题",
    "target": "确保允许 sts:AssumeRole 操作的现有语句中的目标角色 ARN 正确 + 编辑EC2实例需要承担的角色的信任策略",
    "avoid": "别选“允许子帐号的根主体执行 sts:AssumeRole 运算”。",
    "questionCues": [
      "EC2实例无法再承担父帐户中的角色",
      "CloudFormation模板可以根据需要销毁并重新建立",
      "解决方案架构师应该如何解决此问题"
    ],
    "answerCues": {
      "A": [
        "确保允许 sts:AssumeRole 操作的现有语句中的目标角色 ARN 正确",
        "编辑EC2实例需要承担的角色的信任策略"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "481": {
    "when": "需要手动重新启动 EC2 执行个体 + 解决方案架构师必须提高应用程式的可靠性 + 该应用程式在单一 Amazon EC2 执行个体上运行",
    "target": "使用 Aurora 副本进行读取密集型操作 + 在 Auto Scaling 群组中的 EC2 实例上执行应用程式",
    "avoid": "别选“指定 EC2 实例作为分布的起源”；认准“使用 Aurora 副本进行读取密集型操作”。",
    "questionCues": [
      "需要手动重新启动 EC2 执行个体",
      "解决方案架构师必须提高应用程式的可靠性",
      "该应用程式在单一 Amazon EC2 执行个体上运行"
    ],
    "answerCues": {
      "B": [
        "使用 Aurora 副本进行读取密集型操作",
        "在 Auto Scaling 群组中的 EC2 实例上执行应用程式"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "482": {
    "when": "能够在公司收到资料后自动解密资料 + 资料使用 Pretty Good Privacy (PGP) 加密技术进行加密",
    "target": "在标称步骤中配置PGP解密参数 + 将 PGP 私钥储存在Secrets Manager中",
    "avoid": "别选“将工作流程与SFTP使用者关联”；认准“在标称步骤中配置PGP解密参数”。",
    "questionCues": [
      "能够在公司收到资料后自动解密资料",
      "资料使用 Pretty Good Privacy (PGP) 加密技术进行加密"
    ],
    "answerCues": {
      "C": [
        "在标称步骤中配置PGP解密参数",
        "将 PGP 私钥储存在Secrets Manager中"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "483": {
    "when": "必须能够在不到一分钟的时间内接受写入 + 排行榜需要微秒读取和个位数毫秒写入延迟 + 使数据能够透过数据管道持久保存以进行进一步的分析处理",
    "target": "在Muit-AZ模式下为Redis集群建立AmazonMemoryDB 设定应用程式与主节点互动",
    "avoid": "别选“配置备份到Amazon S3”。",
    "questionCues": [
      "必须能够在不到一分钟的时间内接受写入",
      "排行榜需要微秒读取和个位数毫秒写入延迟",
      "使数据能够透过数据管道持久保存以进行进一步的分析处理"
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
    "when": "该公司还需要可视化每个业务部门的云端成本 + 公司需要将其云端成本分配给不同的业务部门 + AWS Organizations",
    "target": "在组织的管理帐户中，建立一个名为 BusinessUnit 的成本分配标签 + 使用AmazonAthena查询AWSCUR资料 + 使用 Amazon QuickSight 进行视觉化",
    "avoid": "别选“将每个 S3 储存桶配置为其各自 AWS CUR 的目的地”。",
    "questionCues": [
      "该公司还需要可视化每个业务部门的云端成本",
      "公司需要将其云端成本分配给不同的业务部门",
      "AWS Organizations"
    ],
    "answerCues": {
      "A": [
        "在组织的管理帐户中，建立一个名为 BusinessUnit 的成本分配标签",
        "使用AmazonAthena查询AWSCUR资料",
        "使用 Amazon QuickSight 进行视觉化"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "485": {
    "when": "工程师注意到 Lambda 函数需要 1 到 2 分钟才能完成 + Lambda 函数需要 3 到 5 秒才能完成 + DynamoDB",
    "target": "A：DynamoDB；B：增加 Lambda 函数可用的记忆体",
    "avoid": "别选“Amazon SQS FIFO”；认准“DynamoDB”。",
    "questionCues": [
      "工程师注意到 Lambda 函数需要 1 到 2 分钟才能完成",
      "Lambda 函数需要 3 到 5 秒才能完成",
      "DynamoDB"
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
    "when": "解决方案架构师应该做什么来配置解决方案的高可用性 + 解决方案架构师需要使解决方案在两个 AWS Regions 上高度可用",
    "target": "将连接别名与故障转移 Region 中的目录关联 + 建立Route 53故障转移路由策略",
    "avoid": "别选“建立 Route 53 多值应答路由策略”；认准“将连接别名与故障转移 Region 中的目录关联”。",
    "questionCues": [
      "解决方案架构师应该做什么来配置解决方案的高可用性",
      "解决方案架构师需要使解决方案在两个 AWS Regions 上高度可用"
    ],
    "answerCues": {
      "D": [
        "将连接别名与故障转移 Region 中的目录关联",
        "建立Route 53故障转移路由策略"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "487": {
    "when": "该公司能够在其 on-premises 环境中安装收集器软体 + 该公司已发起迁移评估员评估请求 + 迁移到AWS",
    "target": "在每个虚拟机器上安装 AWS 应用程式发现代理 + 在 on-premises 环境中设定迁移评估器收集器",
    "avoid": "别选“从迁移中心下载快速洞察评估报告”；认准“在每个虚拟机器上安装 AWS 应用程式发现代理”。",
    "questionCues": [
      "该公司能够在其 on-premises 环境中安装收集器软体",
      "该公司已发起迁移评估员评估请求",
      "迁移到AWS"
    ],
    "answerCues": {
      "D": [
        "在每个虚拟机器上安装 AWS 应用程式发现代理",
        "在 on-premises 环境中设定迁移评估器收集器"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "488": {
    "when": "该公司希望提高这些 API 的安全性 + 一些客户还可以存取在单一独立 Amazon EC2 实例上运行的旧版 API",
    "target": "配置 Amazon Inspector 来分析旧版 API + 使用 AWS WAF 来保护 API Gateway API",
    "avoid": "别选“配置 Amazon Inspector 来分析这两个 API”；认准“配置 Amazon Inspector 来分析旧版 API”。",
    "questionCues": [
      "该公司希望提高这些 API 的安全性",
      "一些客户还可以存取在单一独立 Amazon EC2 实例上运行的旧版 API"
    ],
    "answerCues": {
      "C": [
        "配置 Amazon Inspector 来分析旧版 API",
        "使用 AWS WAF 来保护 API Gateway API"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "489": {
    "when": "该公司需要实施一种解决方案来最大限度地减少 Lambda 函数的延迟并支援流量突发 + Amazon RDS + 在最近的促销活动中",
    "target": "为资料库建立一个 RDS 代理端点 + 增加 Lambda 函数的预先配置并发性",
    "avoid": "别选“增加 Lambda 函数的保留并发度”；认准“为资料库建立一个 RDS 代理端点”。",
    "questionCues": [
      "该公司需要实施一种解决方案来最大限度地减少 Lambda 函数的延迟并支援流量突发",
      "Amazon RDS",
      "在最近的促销活动中"
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
    "when": "解决方案架构师应该采取哪一步来解决这个问题 + 且内部服务无法连接到介面端点 + 公司要求所有内部应用程式连线都使用私人 IP 位址",
    "target": "启用 VPC 属性上的私有 DNS 选项",
    "avoid": "别选“为内部应用程式配置具有条件转发器的 Amazon Route 53 私人托管区域”；认准“启用 VPC 属性上的私有 DNS 选项”。",
    "questionCues": [
      "解决方案架构师应该采取哪一步来解决这个问题",
      "且内部服务无法连接到介面端点",
      "公司要求所有内部应用程式连线都使用私人 IP 位址"
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
    "when": "该应用程式的一部分包括多个需要尽快初始化的AWS Lambda功能 + 一家公司正在开发延迟敏感的应用程式",
    "target": "更新 Lambda 函数以新增预快照挂钩 + 为 Lambda 函数的已发布版本启动 Lambda SnapStart",
    "avoid": "别选“为每个 Lambda 函数启动 Lambda SnapStart”；认准“更新 Lambda 函数以新增预快照挂钩”。",
    "questionCues": [
      "该应用程式的一部分包括多个需要尽快初始化的AWS Lambda功能",
      "一家公司正在开发延迟敏感的应用程式"
    ],
    "answerCues": {
      "D": [
        "更新 Lambda 函数以新增预快照挂钩",
        "为 Lambda 函数的已发布版本启动 Lambda SnapStart"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "492": {
    "when": "EC2 实例不会在 AWS Systems Manager 控制台中显示为托管实例 + EC2 实例在 VPC 的公共子网路内运行",
    "target": "A：验证 Systems Manager 代理程式是否已安装在实例上并且正在执行；D：确认AWS Application Discovery Agent 已配置",
    "avoid": "别选“验证是否为实例指派了适当的 Systems Manager IAM 角色”。",
    "questionCues": [
      "EC2 实例不会在 AWS Systems Manager 控制台中显示为托管实例",
      "EC2 实例在 VPC 的公共子网路内运行"
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
    "when": "自动化单元测试和安全扫描 + 开发人员有以下要求 + 开发者希望改善现有的部署机制",
    "target": "使用 AWS CodeBuild 运行单元测试和安全扫描 + 并使用清单档案在 AWS CDK 应用程式中开启和关闭功能",
    "avoid": "别选“使用 AWS Lambda 运行单元测试和安全扫描”；认准“使用 AWS CodeBuild 运行单元测试和安全扫描”。",
    "questionCues": [
      "自动化单元测试和安全扫描",
      "开发人员有以下要求",
      "开发者希望改善现有的部署机制"
    ],
    "answerCues": {
      "A": [
        "使用 AWS CodeBuild 运行单元测试和安全扫描",
        "并使用清单档案在 AWS CDK 应用程式中开启和关闭功能"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "494": {
    "when": "并且必须保留对频繁存取的资料的低延迟存取 + 公司必须能够使用 AWS Backup 取得磁碟区的时间点副本 + 该公司需要建立一个解决方案",
    "target": "在快取模式下配置 AWS Storage Gateway 磁碟区 + 使用 AWS Backup 备份 on-premises Storage Gateway 卷",
    "avoid": "别选“设定磁带闸道将资料储存在Amazon S3储存桶中”；认准“在快取模式下配置 AWS Storage Gateway 磁碟区”。",
    "questionCues": [
      "并且必须保留对频繁存取的资料的低延迟存取",
      "公司必须能够使用 AWS Backup 取得磁碟区的时间点副本",
      "该公司需要建立一个解决方案"
    ],
    "answerCues": {
      "C": [
        "在快取模式下配置 AWS Storage Gateway 磁碟区",
        "使用 AWS Backup 备份 on-premises Storage Gateway 卷"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "495": {
    "when": "公司安全策略要求在将资料放入S3储存桶之前对资料进行加密 + 应用程式必须使用相同的金钥来解密每个Region中的资料",
    "target": "建立KMS多Region主键 + 使用 KMS multi-Region 主键在应用程式",
    "avoid": "别选“更新应用程式程式码以在每个 Region 中使用特定的 KMS 金钥”；认准“建立KMS多Region主键”。",
    "questionCues": [
      "公司安全策略要求在将资料放入S3储存桶之前对资料进行加密",
      "应用程式必须使用相同的金钥来解密每个Region中的资料"
    ],
    "answerCues": {
      "A": [
        "建立KMS多Region主键",
        "使用 KMS multi-Region 主键在应用程式"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "496": {
    "when": "解决方案架构师应该怎么做才能成功部署生产环境 + 最近部署的唯一变化是该公司为 S3 储存桶添加了大量关键内容 + EC2 实例被终止",
    "target": "增加Auto Scaling组健康检查宽限期",
    "avoid": "别选“修改ALB的健康检查路径”；认准“增加Auto Scaling组健康检查宽限期”。",
    "questionCues": [
      "解决方案架构师应该怎么做才能成功部署生产环境",
      "最近部署的唯一变化是该公司为 S3 储存桶添加了大量关键内容",
      "EC2 实例被终止"
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
    "when": "某公司需要将一些on-premises Oracle 资料库迁移到AWS + 公司需要从AWS直接连接到on-premises系统",
    "target": "使用AWS Direct Connect将资料库实例连接到on-premises环境以获得外部表支援 + 为 PostgreSQL 资料库实例建立 Amazon RDS",
    "avoid": "别选“建立启用自动缩放的Amazon DynamoDB全域表”。",
    "questionCues": [
      "某公司需要将一些on-premises Oracle 资料库迁移到AWS",
      "公司需要从AWS直接连接到on-premises系统"
    ],
    "answerCues": {
      "D": [
        "使用AWS Direct Connect将资料库实例连接到on-premises环境以获得外部表支援",
        "为 PostgreSQL 资料库实例建立 Amazon RDS"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "498": {
    "when": "解决方案架构师需要在不进行重大架构变更的情况下解决此问题 + S3 物件将在 24 小时后删除 + Amazon S3",
    "target": "建立一个 Lambda 函数以从 S3 储存桶中删除物件 + 并使用指向 S3 储存桶资源的 DependsOn 属性",
    "avoid": "别选“将值为Delete的DeletionPolicy属性附加到S3储存桶”。",
    "questionCues": [
      "解决方案架构师需要在不进行重大架构变更的情况下解决此问题",
      "S3 物件将在 24 小时后删除",
      "Amazon S3"
    ],
    "answerCues": {
      "A": [
        "建立一个 Lambda 函数以从 S3 储存桶中删除物件",
        "并使用指向 S3 储存桶资源的 DependsOn 属性"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "499": {
    "when": "解决方案架构师需要优化应用程式的S3成本 + 将用户上传的影片储存在使用 S3 标准储存的 Amazon S3 储存桶中",
    "target": "C：建立 S3 生命周期配置；E：建立 S3 生命周期配置",
    "avoid": "别选“将S3储存桶配置为请求者付款储存桶”；认准“建立 S3 生命周期配置”。",
    "questionCues": [
      "解决方案架构师需要优化应用程式的S3成本",
      "将用户上传的影片储存在使用 S3 标准储存的 Amazon S3 储存桶中"
    ],
    "answerCues": {
      "C": [
        "建立 S3 生命周期配置"
      ],
      "E": [
        "建立 S3 生命周期配置"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "500": {
    "when": "公司需要保证流量高峰时的可扩展性和低延迟存取 + 该公司还必须优化资料库成本并增加对 SQL 注入和 Web 攻击尝试的保护",
    "target": "将 AWS WAF 与 CloudFront 集成 + 使用具有预先配置并发性的 Lambda 函数在高峰时段进行计算",
    "avoid": "别选“将 Lambda 函数配置为在高峰时段增加逾时值”；认准“将 AWS WAF 与 CloudFront 集成”。",
    "questionCues": [
      "公司需要保证流量高峰时的可扩展性和低延迟存取",
      "该公司还必须优化资料库成本并增加对 SQL 注入和 Web 攻击尝试的保护"
    ],
    "answerCues": {
      "D": [
        "将 AWS WAF 与 CloudFront 集成",
        "使用具有预先配置并发性的 Lambda 函数在高峰时段进行计算"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "501": {
    "when": "该公司需要在自动扩展期间启动新实例时减少应用程式延迟 + 启动实例的过程需要几分钟 + 该组具有混合实例组、不同的 CPU 和最大容量限制",
    "target": "为 Auto Scaling 组启用暖池 + 使用动态扩展策略",
    "avoid": "别选“使用预测性扩展策略”；认准“为 Auto Scaling 组启用暖池”。",
    "questionCues": [
      "该公司需要在自动扩展期间启动新实例时减少应用程式延迟",
      "启动实例的过程需要几分钟",
      "该组具有混合实例组、不同的 CPU 和最大容量限制"
    ],
    "answerCues": {
      "D": [
        "为 Auto Scaling 组启用暖池",
        "使用动态扩展策略"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "502": {
    "when": "某公司需要将on-premises资料库群组迁移到Amazon RDS + 一些资料库具有自订架构和预存程序",
    "target": "B：使用AWS应用迁移服务分析来源资料库并识别需要迁移的预存程序；D：AWS Database Migration Service",
    "avoid": "别选“使用AWSDataSync将来源资料库中的资料迁移到Amazon RDS”。",
    "questionCues": [
      "某公司需要将on-premises资料库群组迁移到Amazon RDS",
      "一些资料库具有自订架构和预存程序"
    ],
    "answerCues": {
      "B": [
        "使用AWS应用迁移服务分析来源资料库并识别需要迁移的预存程序"
      ],
      "D": [
        "AWS Database Migration Service"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "503": {
    "when": "公司需要在不耽误内容更新的情况下迁移部落格平台 + 一家公司正在将其部落格平台迁移到AWS + 部署了 Amazon EC2 实例",
    "target": "B：为 EC2 实例；C：将 EFS 档案系统安装到 C2 实例以提供内容",
    "avoid": "别选“使用 cron 作业呼叫 AWS Lambda 函数以从 NAS 伺服器更新 EC2 实例”；认准“为 EC2 实例”。",
    "questionCues": [
      "公司需要在不耽误内容更新的情况下迁移部落格平台",
      "一家公司正在将其部落格平台迁移到AWS",
      "部署了 Amazon EC2 实例"
    ],
    "answerCues": {
      "B": [
        "为 EC2 实例"
      ],
      "C": [
        "将 EFS 档案系统安装到 C2 实例以提供内容"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "504": {
    "when": "一家公司计划将旧版 on-premises 应用程式迁移到 AWS + 该应用程式的流量在每个月末都会增加 + 该公司无权存取原始程式码",
    "target": "部署 Amazon CloudFront 和 Application Load Balancer 以扩展以增加流量",
    "avoid": "别选“在多个 Availability Zones 中启动 Amazon EC2 实例”。",
    "questionCues": [
      "一家公司计划将旧版 on-premises 应用程式迁移到 AWS",
      "该应用程式的流量在每个月末都会增加",
      "该公司无权存取原始程式码"
    ],
    "answerCues": {
      "D": [
        "部署 Amazon CloudFront 和 Application Load Balancer 以扩展以增加流量"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "505": {
    "when": "该公司需要将平台迁移到AWS + 这些作业需要 120-600 秒才能完成运行 + 以在保持效能的同时减少营运开销",
    "target": "A：配置具有 S3 来源的 Amazon CloudFront 发行版来提供报告；D：配置呼叫AWS Lambda函数的规则；E：将MongoDB集群迁移到AmazonDocumentDB（相容于MongoDB）",
    "avoid": "别选“创建一个 AWS Lambda 函数”；认准“配置具有 S3 来源的 Amazon CloudFront 发行版来提供报告”。",
    "questionCues": [
      "该公司需要将平台迁移到AWS",
      "这些作业需要 120-600 秒才能完成运行",
      "以在保持效能的同时减少营运开销"
    ],
    "answerCues": {
      "A": [
        "配置具有 S3 来源的 Amazon CloudFront 发行版来提供报告"
      ],
      "D": [
        "配置呼叫AWS Lambda函数的规则"
      ],
      "E": [
        "将MongoDB集群迁移到AmazonDocumentDB（相容于MongoDB）"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "506": {
    "when": "该公司需要在不重新设计 Lambda 函数的情况下限制成本和使用量 + 导致人们担心成本增加 + AWS Lambda",
    "target": "建立 API Gateway API 金钥和使用计划 + 在使用计划中定义限制和配额",
    "avoid": "别选“AWS WAF Regional Web ACL”；认准“建立 API Gateway API 金钥和使用计划”。",
    "questionCues": [
      "该公司需要在不重新设计 Lambda 函数的情况下限制成本和使用量",
      "导致人们担心成本增加",
      "AWS Lambda"
    ],
    "answerCues": {
      "D": [
        "建立 API Gateway API 金钥和使用计划",
        "在使用计划中定义限制和配额"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "507": {
    "when": "EC2 实例有时会使用过时的定价讯息 + 定价档案会下载到每个 EC2 实例 + 定价文件每 1-15 分钟更新一次",
    "target": "配置Amazon S3的挂载点以挂载包含定价档案的S3储存桶 + 将 Amazon S3 的装载点载入到 EC2 实例的 AMI 上",
    "avoid": "别选“当新的 EC2 实例启动时”；认准“配置Amazon S3的挂载点以挂载包含定价档案的S3储存桶”。",
    "questionCues": [
      "EC2 实例有时会使用过时的定价讯息",
      "定价档案会下载到每个 EC2 实例",
      "定价文件每 1-15 分钟更新一次"
    ],
    "answerCues": {
      "C": [
        "配置Amazon S3的挂载点以挂载包含定价档案的S3储存桶",
        "将 Amazon S3 的装载点载入到 EC2 实例的 AMI 上"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "508": {
    "when": "但不希望向每个使用者授予广泛的权限 + 经理希望允许测试人员启动自己的环境 + 品质保证 (QA) 部门需要启动大量短期环境来测试应用程式",
    "target": "仅授予 QA 部门的使用者使用AWS Service Catalog API 的权限 + 从环境模板创建AWS Service Catalog产品",
    "avoid": "别选“授予 QA 部门的使用者使用 CloudFormation 和 S3 API 的权限”。",
    "questionCues": [
      "但不希望向每个使用者授予广泛的权限",
      "经理希望允许测试人员启动自己的环境",
      "品质保证 (QA) 部门需要启动大量短期环境来测试应用程式"
    ],
    "answerCues": {
      "B": [
        "仅授予 QA 部门的使用者使用AWS Service Catalog API 的权限",
        "从环境模板创建AWS Service Catalog产品"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "509": {
    "when": "解决方案架构师需要实施一个解决方案来实现这些目标并最大限度地减少管理开销 + 本公司在AWS证书管理器（ACM）中创建了SSL/TLS证书",
    "target": "A：为目前基础设施设计创建AWS CloudFormation模板；E：透过启用 DynamoDB 流来更新现有 DynamoDB 表的配置；F：为新表启用DynamoDB流",
    "avoid": "别选“更新应用程式的Route 53托管区域记录以使用加权路由”；认准“为目前基础设施设计创建AWS CloudFormation模板”。",
    "questionCues": [
      "解决方案架构师需要实施一个解决方案来实现这些目标并最大限度地减少管理开销",
      "本公司在AWS证书管理器（ACM）中创建了SSL/TLS证书"
    ],
    "answerCues": {
      "A": [
        "为目前基础设施设计创建AWS CloudFormation模板"
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
    "when": "一家公司希望为其资料科学家创建一个 Amazon S3 储存桶来储存与工作相关的文件 + 显示每个用户访问了哪些文件",
    "target": "A：以授予资料科学家存取与其使用者名称标签相符的 S3 储存桶前缀的权限；C：配置AWSCloudTrail记录S3资料事件并将日志投递到S3桶",
    "avoid": "别选“新增允许存取 IAM Identity Center 角色的 S3 储存桶策略”。",
    "questionCues": [
      "一家公司希望为其资料科学家创建一个 Amazon S3 储存桶来储存与工作相关的文件",
      "显示每个用户访问了哪些文件"
    ],
    "answerCues": {
      "A": [
        "以授予资料科学家存取与其使用者名称标签相符的 S3 储存桶前缀的权限"
      ],
      "C": [
        "配置AWSCloudTrail记录S3资料事件并将日志投递到S3桶"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "511": {
    "when": "该公司需要重构应用程式以消除运行容器的EC2实例 + 容器执行的资料处理可能需要长达 2 小时 + Amazon EC2",
    "target": "配置 S3 事件通知以在建立物件时呼叫 Lambda 函数 + 提取容器选择逻辑以作为启动适当的 Fargate 任务的 AWS Lambda 函数运行",
    "avoid": "别选“配置 S3 事件通知以在建立物件时呼叫决策 Lambda 函数”；认准“配置 S3 事件通知以在建立物件时呼叫 Lambda 函数”。",
    "questionCues": [
      "该公司需要重构应用程式以消除运行容器的EC2实例",
      "容器执行的资料处理可能需要长达 2 小时",
      "Amazon EC2"
    ],
    "answerCues": {
      "C": [
        "配置 S3 事件通知以在建立物件时呼叫 Lambda 函数",
        "提取容器选择逻辑以作为启动适当的 Fargate 任务的 AWS Lambda 函数运行"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "512": {
    "when": "该公司希望将这些影片迁移到AWS + 公司必须能够根据影片中的资讯进行搜索 + 该公司希望以自动化的方式丰富这些影片的元数据",
    "target": "让 Rekognition 从支援文件网关的 Amazon S3 文件中提取视频 + 建立一个调用 Rekognition Javascript SDK 的 AWS Lambda 函数",
    "avoid": "别选“建立一个 AWS Lambda 函数”；认准“让 Rekognition 从支援文件网关的 Amazon S3 文件中提取视频”。",
    "questionCues": [
      "该公司希望将这些影片迁移到AWS",
      "公司必须能够根据影片中的资讯进行搜索",
      "该公司希望以自动化的方式丰富这些影片的元数据"
    ],
    "answerCues": {
      "A": [
        "让 Rekognition 从支援文件网关的 Amazon S3 文件中提取视频",
        "建立一个调用 Rekognition Javascript SDK 的 AWS Lambda 函数"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "513": {
    "when": "公司需要优化 AWS Organizations ​​组织中包含多个帐户的 AWS 环境的成本 + 公司还需要 EC2 实例 3 年",
    "target": "在管理帐户中购买 3 年期 EC2 实例节省计划 + 以支付每个 AWS Region 的 EC2 成本",
    "avoid": "别选“购买 3 年期 EC2 实例储蓄计划”；认准“在管理帐户中购买 3 年期 EC2 实例节省计划”。",
    "questionCues": [
      "公司需要优化 AWS Organizations ​​组织中包含多个帐户的 AWS 环境的成本",
      "公司还需要 EC2 实例 3 年"
    ],
    "answerCues": {
      "C": [
        "在管理帐户中购买 3 年期 EC2 实例节省计划",
        "以支付每个 AWS Region 的 EC2 成本"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "514": {
    "when": "公司必须以最小延迟且不暴露于公共互联网的方式将on-premises资料路由到Amazon S3 + 客户使用自己的 AWS 帐户中的内容",
    "target": "C：建立一个 AWS Lambda 函数来追踪客户端到 Regions 的路由；E：AWS PrivateLink",
    "avoid": "别选“使用S3跨Region复制（CRR）将内容复制到不同的Regions”。",
    "questionCues": [
      "公司必须以最小延迟且不暴露于公共互联网的方式将on-premises资料路由到Amazon S3",
      "客户使用自己的 AWS 帐户中的内容"
    ],
    "answerCues": {
      "C": [
        "建立一个 AWS Lambda 函数来追踪客户端到 Regions 的路由"
      ],
      "E": [
        "AWS PrivateLink"
      ]
    },
    "disputed": true,
    "legacyMismatch": false
  },
  "515": {
    "when": "该公司的合规团队要求每个虚拟机器的每次软体安装和修改都需要编辑和批准变更请求 + 需要尽快完成迁移 + 某公司正在将资料中心迁移至AWS云",
    "target": "AWS Snowcone + 在 AWS 迁移中心建立并查看投资组合",
    "avoid": "别选“将每个 VM 的文件共享数据复制到 Windows 文件服务器文件系统的新 Amazon FSx”；认准“AWS Snowcone”。",
    "questionCues": [
      "该公司的合规团队要求每个虚拟机器的每次软体安装和修改都需要编辑和批准变更请求",
      "需要尽快完成迁移",
      "某公司正在将资料中心迁移至AWS云"
    ],
    "answerCues": {
      "C": [
        "AWS Snowcone",
        "在 AWS 迁移中心建立并查看投资组合"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "516": {
    "when": "该公司需要储存 AWS 帐户活动并使用 SQL 从中央位置查询资料 + AWS Organizations",
    "target": "使用委派管理员帐户建立 AWS CloudTrail Lake 资料储存 + 为组织中的所有帐户启用资料储存",
    "avoid": "别选“部署 AWS CloudTrail Lake 资料储存”。",
    "questionCues": [
      "该公司需要储存 AWS 帐户活动并使用 SQL 从中央位置查询资料",
      "AWS Organizations"
    ],
    "answerCues": {
      "B": [
        "使用委派管理员帐户建立 AWS CloudTrail Lake 资料储存",
        "为组织中的所有帐户启用资料储存"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "517": {
    "when": "该公司希望以整合的方式实现Web应用程式的用户授权 + 一家公司正在使用 AWS 来开发和管理其生产 Web 应用程式",
    "target": "所有 API 路由都需要 Lambda 授权者 + 将公司的第三方身分提供者与API Gateway整合",
    "avoid": "别选“配置IAM用户呼叫API GatewayHTTPAPI的权限”；认准“所有 API 路由都需要 Lambda 授权者”。",
    "questionCues": [
      "该公司希望以整合的方式实现Web应用程式的用户授权",
      "一家公司正在使用 AWS 来开发和管理其生产 Web 应用程式"
    ],
    "answerCues": {
      "A": [
        "所有 API 路由都需要 Lambda 授权者",
        "将公司的第三方身分提供者与API Gateway整合"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "518": {
    "when": "该公司需要实施自动化解决方案来加密 EBS 卷 + 本公司的安全策略要求对EBS卷进行加密 + 创建未加密的EBS卷",
    "target": "配置识别未加密 EBS 卷的 AWS 配置托管规则 + 配置自动修复操作 + 修改 EBS 加密的 AWS 帐户设置，以始终加密新的 EBS 卷",
    "avoid": "别选“建立 SCP 以拒绝建立未加密的 EBS 磁碟区”；认准“配置识别未加密 EBS 卷的 AWS 配置托管规则”。",
    "questionCues": [
      "该公司需要实施自动化解决方案来加密 EBS 卷",
      "本公司的安全策略要求对EBS卷进行加密",
      "创建未加密的EBS卷"
    ],
    "answerCues": {
      "D": [
        "配置识别未加密 EBS 卷的 AWS 配置托管规则",
        "配置自动修复操作",
        "修改 EBS 加密的 AWS 帐户设置，以始终加密新的 EBS 卷"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "519": {
    "when": "工作负载已接近运行帐户中可用的最大数量的EC2实例 + 解决方案架构师应该做什么来满足这个要求 + 允许的最大ECS任务数",
    "target": "使用 Amazon CloudWatch 监控在 AWS/Usage 指标命名空间下发布的服务配额 + 当数学表达式指标/SERVICE_QUOTA(metric)*100大于80时设定警报",
    "avoid": "别选“使用AmazonCloudWatch监控ECS集群中每个服务的Sample Count统计资料”。",
    "questionCues": [
      "工作负载已接近运行帐户中可用的最大数量的EC2实例",
      "解决方案架构师应该做什么来满足这个要求",
      "允许的最大ECS任务数"
    ],
    "answerCues": {
      "B": [
        "使用 Amazon CloudWatch 监控在 AWS/Usage 指标命名空间下发布的服务配额",
        "当数学表达式指标/SERVICE_QUOTA(metric)*100大于80时设定警报"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "520": {
    "when": "Lambda 函数的子集必须接收自动程式码扫描 + 公司必须实作 Lambda 函数和 Lambda 层的自动扫描以识别 CVE",
    "target": "A：启动自动 CVE 扫描；B：在AmazonInspector中启动Lambda标准扫描和Lambda扫码；E：标记不需要程式码扫描的 Lambda 函数",
    "avoid": "别选“在 GuardDuty 中启用 Lambda 保护功能”；认准“启动自动 CVE 扫描”。",
    "questionCues": [
      "Lambda 函数的子集必须接收自动程式码扫描",
      "公司必须实作 Lambda 函数和 Lambda 层的自动扫描以识别 CVE"
    ],
    "answerCues": {
      "A": [
        "启动自动 CVE 扫描"
      ],
      "B": [
        "在AmazonInspector中启动Lambda标准扫描和Lambda扫码"
      ],
      "E": [
        "标记不需要程式码扫描的 Lambda 函数"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "521": {
    "when": "应用程式帐户中的EC2实例需要存取储存应用程式资料的Amazon S3 + 公司必须阻止应用程式帐户中的所有EC2实例存取网际网路",
    "target": "建立VPC对等连接以存取核心帐户中的补丁来源储存库EC2实例 + 为 Systems Manager 和 Amazon S3 建立 VPC 端点",
    "avoid": "别选“建立中转网关以存取核心帐户中的补丁来源储存库EC2实例”；认准“建立VPC对等连接以存取核心帐户中的补丁来源储存库EC2实例”。",
    "questionCues": [
      "应用程式帐户中的EC2实例需要存取储存应用程式资料的Amazon S3",
      "公司必须阻止应用程式帐户中的所有EC2实例存取网际网路"
    ],
    "answerCues": {
      "C": [
        "建立VPC对等连接以存取核心帐户中的补丁来源储存库EC2实例",
        "为 Systems Manager 和 Amazon S3 建立 VPC 端点"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "522": {
    "when": "应用程式必须能够存取 eu-west-1 Region 中的一个 VPC 中的资源 + 应用程式不得存取任何其他VPC",
    "target": "为 us-east-2 中的每个 VPC 到 eu-west-1 中的 VPC 建立一个 VPC 对等连接 + 以便透过VPC对等连接路由流量",
    "avoid": "别选“将 us-east-2 中的 VPC 和 eu-west-1 中的 VPC 连接到中转网关”。",
    "questionCues": [
      "应用程式必须能够存取 eu-west-1 Region 中的一个 VPC 中的资源",
      "应用程式不得存取任何其他VPC"
    ],
    "answerCues": {
      "D": [
        "为 us-east-2 中的每个 VPC 到 eu-west-1 中的 VPC 建立一个 VPC 对等连接",
        "以便透过VPC对等连接路由流量"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "523": {
    "when": "该公司还需要能够根据收件人、主题和发送时间进行搜寻 + 该公司需要启用日志记录以协助解决电子邮件传送问题 + Amazon SES",
    "target": "A：选择将日志传送到Amazon S3储存桶；C：使用AmazonAthena查询Amazon S3储存桶中的日志",
    "avoid": "别选“启用 AWS CloudTrail 日志记录”；认准“选择将日志传送到Amazon S3储存桶”。",
    "questionCues": [
      "该公司还需要能够根据收件人、主题和发送时间进行搜寻",
      "该公司需要启用日志记录以协助解决电子邮件传送问题",
      "Amazon SES"
    ],
    "answerCues": {
      "A": [
        "选择将日志传送到Amazon S3储存桶"
      ],
      "C": [
        "使用AmazonAthena查询Amazon S3储存桶中的日志"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "524": {
    "when": "该公司希望跨 AWS 帐户监控 Amazon EC2 实例的成本效益 + 公司需要侦测并停止任何未充分利用的开发EC2实例",
    "target": "根据部门、业务单位和环境的标签监控 EC2 实例利用率 + 配置 Amazon CloudWatch 仪表板",
    "avoid": "别选“AWS Systems Manager”；认准“根据部门、业务单位和环境的标签监控 EC2 实例利用率”。",
    "questionCues": [
      "该公司希望跨 AWS 帐户监控 Amazon EC2 实例的成本效益",
      "公司需要侦测并停止任何未充分利用的开发EC2实例"
    ],
    "answerCues": {
      "A": [
        "根据部门、业务单位和环境的标签监控 EC2 实例利用率",
        "配置 Amazon CloudWatch 仪表板"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "525": {
    "when": "公司需要一种新的架构来解决应用程式响应缓慢的问题 + 该应用程式由 20 个 Amazon EC2 按需实例组成 + 通常会持续几个小时",
    "target": "为四个实例购买预留实例 + 将最小容量设定为 4",
    "avoid": "别选“购买 20 个实例的预留实例”；认准“为四个实例购买预留实例”。",
    "questionCues": [
      "公司需要一种新的架构来解决应用程式响应缓慢的问题",
      "该应用程式由 20 个 Amazon EC2 按需实例组成",
      "通常会持续几个小时"
    ],
    "answerCues": {
      "D": [
        "为四个实例购买预留实例",
        "将最小容量设定为 4"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "526": {
    "when": "新的感测器资料必须在应用程式收集资料后 30 分钟内Amazon S3 可用 + 公司必须在将资料载入到Amazon S3之前丰富资料",
    "target": "配置AWS IoT 规则操作以呼叫 Lambda 函数 + 建立AWS Lambda函数来丰富资料并将资料写入Amazon S3",
    "avoid": "别选“配置Lambda函数丰富资料并将资料写入Amazon S3”；认准“配置AWS IoT 规则操作以呼叫 Lambda 函数”。",
    "questionCues": [
      "新的感测器资料必须在应用程式收集资料后 30 分钟内Amazon S3 可用",
      "公司必须在将资料载入到Amazon S3之前丰富资料"
    ],
    "answerCues": {
      "A": [
        "配置AWS IoT 规则操作以呼叫 Lambda 函数",
        "建立AWS Lambda函数来丰富资料并将资料写入Amazon S3"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "527": {
    "when": "资料科学家需要从 EC2 实例存取资料湖 + EC2 实例已指派有权存取 Amazon S3 的角色 + VPC",
    "target": "B：在资料科学家的资料湖 AWS 帐户中建立一个 S3 存取点；C：更新 EC2 实例角色",
    "avoid": "别选“将 S3 流量路由至 S3 接入点”；认准“在资料科学家的资料湖 AWS 帐户中建立一个 S3 存取点”。",
    "questionCues": [
      "资料科学家需要从 EC2 实例存取资料湖",
      "EC2 实例已指派有权存取 Amazon S3 的角色",
      "VPC"
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
    "when": "解决方案架构师需要在迁移之前估算此工作负载的总拥有成本 (TCO) + 迁移到PostgreSQL资料库的Amazon RDS",
    "target": "配置一个场景 + 请求存取迁移评估器",
    "avoid": "别选“在 AWS 定价计算器中建立 EKS 迁移成本的估算”；认准“配置一个场景”。",
    "questionCues": [
      "解决方案架构师需要在迁移之前估算此工作负载的总拥有成本 (TCO)",
      "迁移到PostgreSQL资料库的Amazon RDS"
    ],
    "answerCues": {
      "A": [
        "配置一个场景",
        "请求存取迁移评估器"
      ]
    },
    "disputed": false,
    "legacyMismatch": false
  },
  "529": {
    "when": "公司需要在不降低平台可用性的情况下优化平台成本 + Auto Scaling 组使用预测扩展策略 + S3",
    "target": "A：为 S3 储存桶建立网关 VPC 端点；C：在计划的扩展策略的时间段内为适用的实例类型建立按需容量预留",
    "avoid": "别选“在 S3 储存桶上启用 S3 传输加速”；认准“为 S3 储存桶建立网关 VPC 端点”。",
    "questionCues": [
      "公司需要在不降低平台可用性的情况下优化平台成本",
      "Auto Scaling 组使用预测扩展策略",
      "S3"
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
