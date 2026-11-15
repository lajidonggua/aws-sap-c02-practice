/* Source-backed individual option analysis; not an official AWS exam answer key. */
const QUESTION_EXPLANATIONS = {
  "1": {
    "blocker": "一家公司需要设计一个混合DNS解决方案。该解决方案将为存储在VPC内的资源使用Amazon Route 53私有托管区域，域名为cloud.example.com。公司有以下DNS解析要求：本地系统应该能够解析并连接到cloud.example.com。所有VPC应该能够解析cloud.example.com。已经有AWS Direct Connect连接介于本地公司网络和AWS Transit Gateway之间。哪种架构能够以最高性能满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：方向、关联范围和数据路径均满足要求。"
    ],
    "solutions": "正确答案为 A。所有业务VPC直接关联私有托管区域；本地DNS通过共享VPC的入站端点进入AWS解析，现有DX/TGW提供私网连通。这样VPC内部查询不必绕过中转DNS。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "方向、关联范围和数据路径均满足要求。",
      "B": "EC2转发器增加自行管理的DNS层，吞吐及可用性需自行维护。",
      "C": "出站端点用于AWS向外查询，不能作为本地查询的入站口。",
      "D": "只关联共享VPC不足以让全部业务VPC直接解析该私有区域。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-overview-DSN-queries-to-vpc.html",
        "title": "Resolving DNS queries between VPCs and your network",
        "supports": "入站端点接收远端网络查询，私有区域必须关联需要解析的VPC。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "2": {
    "blocker": "一家公司通过REST API向几个客户提供天气数据。API由Amazon API Gateway托管，并为每个API操作集成了不同的AWS Lambda函数。该公司使用Amazon Route 53进行DNS管理，并创建了weather.example.com的资源记录。该公司将API的数据存储在Amazon DynamoDB表中。该公司需要一个能够让API故障转移到不同AWS区域的解决方案。哪种解决方案能够满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：应用、数据、DNS三个层次均覆盖。"
    ],
    "solutions": "正确答案为 C。备用区域需要完整的API Gateway与Lambda部署，DynamoDB全球表解决区域间数据复制，Route 53故障转移记录实现主备切换。",
    "result_flow": "Evaluate Target Health仅覆盖区域级API Gateway故障；实际应用健康宜使用自定义健康检查。",
    "options": {
      "A": "边缘优化端点不会把两个区域Lambda自动变成区域故障转移系统。",
      "B": "多值路由返回多个健康记录，不表达指定的主备关系。",
      "C": "应用、数据、DNS三个层次均覆盖。",
      "D": "Lambda没有这里描述的global functions类型。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/apigateway/latest/developerguide/dns-failover.html",
        "title": "Configure custom health checks for DNS failover for an API Gateway API",
        "supports": "AWS明确支持以Route 53健康检查将API从主区域切换至备用区域。"
      }
    ],
    "audit_caveat": "Evaluate Target Health仅覆盖区域级API Gateway故障；实际应用健康宜使用自定义健康检查。",
    "audit_status": "confirmed"
  },
  "3": {
    "blocker": "一家公司使用AWS Organizations，其中有一个名为Production的单一OU来管理多个账户。所有账户都是Production OU的成员。管理员在组织根目录使用拒绝列表SCP来管理对受限服务的访问。该公司最近收购了一个新的业务部门，并邀请该新部门的现有AWS账户加入组织。加入后，新业务部门的管理员发现他们无法更新现有的AWS Config规则以符合公司的政策。哪个选项将允许管理员进行更改并继续执行当前政策，而不引入额外的长期维护？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：移动拒绝的附着层级，正确隔离临时例外。"
    ],
    "solutions": "正确答案为 D。根级显式拒绝会向所有后代继承。把既有拒绝移到Production OU，新账户暂放Onboarding，才能在不解除生产保护的情况下修改Config；完成后移回生产。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "解除根拒绝并换成Service Catalog改变了原有防护方式。",
      "B": "根级拒绝仍存在，下层允许不能覆盖。",
      "C": "额外Allow不能覆盖同一路径中的显式Deny。",
      "D": "移动拒绝的附着层级，正确隔离临时例外。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps_evaluation.html",
        "title": "SCP evaluation",
        "supports": "任一祖先SCP中的显式Deny优先于Allow。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "4": {
    "blocker": "一家公司在其数据中心运行一个两层Web应用程式。应用程式层由运行有状态应用程式的单一伺服器组成。应用程式连接到运行在另一台伺服器上的PostgreSQL数据库。该应用程式的用户群预计会显著增长，因此公司正在将应用程式和数据库迁移到AWS。解决方案将使用Amazon Aurora PostgreSQL、Amazon EC2 Auto Scaling和Elastic Load Balancing。哪种解决方案将提供一致的用户体验，同时允许应用程式层和数据库层扩展？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：副本伸缩和ALB黏性会话均为正确机制。"
    ],
    "solutions": "正确答案为 C。Aurora Auto Scaling增加或减少只读副本；ALB支持HTTP会话黏性，轮询为兼容方案，保持有状态应用的会话亲和性。",
    "result_flow": "黏性会话不能保证实例故障时会话数据不丢；生产架构宜外置会话状态。",
    "options": {
      "A": "NLB不提供该选项所述的least outstanding requests算法。",
      "B": "Aurora Auto Scaling不是增加writer数量。",
      "C": "副本伸缩和ALB黏性会话均为正确机制。",
      "D": "writer伸缩与NLB算法两处都不成立。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Integrating.AutoScaling.html",
        "title": "Amazon Aurora Auto Scaling with Aurora Replicas",
        "supports": "Aurora Auto Scaling只伸缩reader，不适用于writer。"
      }
    ],
    "audit_caveat": "黏性会话不能保证实例故障时会话数据不丢；生产架构宜外置会话状态。",
    "audit_status": "confirmed"
  },
  "5": {
    "blocker": "一家公司使用一个服务来收集其本地托管的应用程式的元数据。像电视和网络收音机这样的消费设备访问这些应用程式。许多旧设备不支持某些HTTP标头，当响应中包含这些标头时会出现错误。该公司已配置本地负载均衡器，从发送给旧设备的响应中移除不支持的标头，这些设备通过User-Agent标头进行识别。该公司希望将服务迁移到AWS，采用无伺服器技术，并保留对旧设备的支持能力。该公司已将应用程式迁移为一组AWS Lambda函数。哪种解决方案能满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：在viewer-response函数里读取request.headers并删除response.headers即可。"
    ],
    "solutions": "正确答案为 A。按原题只需检查User-Agent并删除响应头，CloudFront Functions的viewer-response事件包含request和response对象，可直接按请求头修改响应头；A满足需求，无需Lambda@Edge。",
    "result_flow": "原题未限定问题响应头名称；某些CloudFront保留头不可修改。D若仅泛指客户端请求而非viewer-request事件，也是可行实现；A是更直接的推荐答案。",
    "options": {
      "A": "在viewer-response函数里读取request.headers并删除response.headers即可。",
      "B": "Gateway Responses用于API Gateway生成的错误，不是所有Lambda业务响应的条件重写。",
      "C": "HTTP API响应参数映射不等于REST API的VTL响应模板，不能按所述方式附加模板。",
      "D": "若明确使用viewer-response的Lambda@Edge也能做，但原选项写viewer requests含糊，不能据此排除A。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/functions-event-structure.html",
        "title": "CloudFront Functions event structure",
        "supports": "函数事件提供request.headers、response.headers与viewer-response类型。"
      }
    ],
    "audit_caveat": "原题未限定问题响应头名称；某些CloudFront保留头不可修改。D若仅泛指客户端请求而非viewer-request事件，也是可行实现；A是更直接的推荐答案。",
    "audit_status": "corrected"
  },
  "6": {
    "blocker": "一家零售公司需要向另一家公司（其业务伙伴）提供一系列数据文件。这些文件存储在Amazon S3存储桶中，该存储桶属于零售公司的Account A。业务伙伴公司希望其IAM用户User_DataProcessor从其自己的AWS账户（Account B）访问这些文件。两家公司必须采取哪些步骤组合才能让User_DataProcessor成功访问S3存储桶？（选择两个。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：具有外部Principal，但ListBucket必须使用bucket ARN；当前只有object ARN。",
      "D：身份策略形式正确，但ListBucket资源同样写错。"
    ],
    "solutions": "参考选择为 C、D。出题意图是资源账户桶策略允许外部用户，调用账户IAM身份策略也允许S3访问，即双边授权。但原选项策略缺少桶级ARN，不能正确授权ListBucket。",
    "result_flow": "保留CD为出题意图，不应把CE武断判错；若要求列出并读取文件，应修复C/D的Resource，增加arn:aws:s3:::AccountABucketName。",
    "options": {
      "A": "CORS不授予IAM跨账户访问权限。",
      "B": "桶策略缺少Principal，不能作为所需资源策略。",
      "C": "具有外部Principal，但ListBucket必须使用bucket ARN；当前只有object ARN。",
      "D": "身份策略形式正确，但ListBucket资源同样写错。",
      "E": "若仅下载已知key，GetObject已足够；因此按当前题面不能唯一排除E。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/res/latest/ug/S3-buckets-cross-account-access.html",
        "title": "Cross account bucket access",
        "supports": "官方跨账户示例同时使用桶ARN和桶下对象ARN，并在双方配置权限。"
      }
    ],
    "audit_caveat": "保留CD为出题意图，不应把CE武断判错；若要求列出并读取文件，应修复C/D的Resource，增加arn:aws:s3:::AccountABucketName。",
    "audit_status": "ambiguous"
  },
  "7": {
    "blocker": "一家公司在Amazon EC2实例上运行传统的Web应用程式。该公司需要将应用程式重构为在容器中运行的微服务。该应用程式有两个独立的版本存在于两个不同的环境中：生产和测试。应用程式的负载是可变的，但最小负载和最大负载是已知的。解决方案架构师需要使用最小化操作复杂性的无伺服器架构来设计更新的应用程式。哪种解决方案能以最具成本效益的方式满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：ECR、ECS服务自动伸缩、Fargate及ALB满足容器与免节点运维。"
    ],
    "solutions": "正确答案为 B。ECS在Fargate上运行既有容器微服务，无需管理EC2节点；按负载伸缩task，并将生产与测试分离。题目无Kubernetes需求，ECS比额外引入EKS控制面更合适。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "普通容器镜像不一定能直接作为Lambda函数，需适配运行时与调用模型。",
      "B": "ECR、ECS服务自动伸缩、Fargate及ALB满足容器与免节点运维。",
      "C": "可运行容器，但增加Kubernetes管理复杂度和控制面成本。",
      "D": "Beanstalk底层仍需EC2环境，不符合这里要求的serverless容器方案。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html",
        "title": "Architect for AWS Fargate for Amazon ECS",
        "supports": "Fargate运行ECS容器且无需配置或伸缩EC2集群。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "8": {
    "blocker": "一家公司拥有一个多层Web应用程式，该应用程式运行在Application Load Balancer（ALB）后面的一组Amazon EC2实例上。这些实例在一个Auto Scaling组中。ALB和Auto Scaling组已在备份AWS区域中复制。Auto Scaling组的最小值和最大值设置为零。Amazon RDS Multi-AZ数据库实例存储应用程式的数据。该数据库实例在备份区域有一个读副本。应用程式使用Amazon Route 53记录向最终用户呈现端点。该公司需要通过使应用程式能够自动故障转移到备份区域来将其RTO降低到15分钟以下。该公司没有足够的预算来实施主动-主动策略。解决方案架构师应该推荐什么来满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：健康检查、SNS/Lambda恢复动作和failover DNS构成完整自动流程。"
    ],
    "solutions": "正确答案为 B。采用pilot-light式备用：健康失败触发自动化，提升跨区只读副本并扩大备用ASG，再由主备DNS引流，避免持续运行完整第二套计算。",
    "result_flow": "实现时健康检查告警经CloudWatch/SNS触发；需实际演练副本提升与实例启动，不能只凭配置保证15分钟RTO。",
    "options": {
      "A": "延迟路由不是指定主备；单一5xx指标也不能覆盖所有故障。",
      "B": "健康检查、SNS/Lambda恢复动作和failover DNS构成完整自动流程。",
      "C": "两边同等容量增加成本，快照也不是原生实例之间的连续复制机制。",
      "D": "等权Global Accelerator会把正常流量导向尚未启动实例的备用区域。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover-types.html",
        "title": "Active-active and active-passive failover",
        "supports": "Failover主备策略在主端点不健康时选择备用端点。"
      }
    ],
    "audit_caveat": "实现时健康检查告警经CloudWatch/SNS触发；需实际演练副本提升与实例启动，不能只凭配置保证15分钟RTO。",
    "audit_status": "confirmed"
  },
  "9": {
    "blocker": "一家公司在单个Amazon EC2实例上托管一个关键应用程式。该应用程式使用Amazon ElastiCache for Redis单节点集群作为内存数据存储。该应用程式使用Amazon RDS for MariaDB数据库实例作为关系型数据库。为了使应用程式正常运行，基础架构的每个部分都必须健康且处于活动状态。解决方案架构师需要改进应用程式的架构，以便基础架构能够以最少的停机时间自动从故障中恢复。哪些步骤组合将满足这些要求？（选择三个。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：多实例ASG加负载均衡可自动补充失败实例。",
      "D：RDS Multi-AZ提供备用与托管故障转移。",
      "F：Redis Multi-AZ会自动提升复制组副本。"
    ],
    "solutions": "正确答案为 A、D、F。应用、关系数据库和缓存三层都必须具备冗余与自动恢复。跨AZ的多实例ASG、RDS Multi-AZ、Redis复制组Multi-AZ分别消除单点。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "多实例ASG加负载均衡可自动补充失败实例。",
      "B": "Unlimited只影响可突增实例CPU积分，不提供冗余。",
      "C": "同AZ只读副本不能覆盖AZ故障，手工提升也非最短自动恢复。",
      "D": "RDS Multi-AZ提供备用与托管故障转移。",
      "E": "EC2 ASG不是管理ElastiCache节点的方式。",
      "F": "Redis Multi-AZ会自动提升复制组副本。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/AutoFailover.html",
        "title": "Minimizing downtime in ElastiCache by using Multi-AZ",
        "supports": "Multi-AZ自动把故障主节点角色切到只读副本。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "10": {
    "blocker": "一家零售公司在AWS上运行其电子商务应用程式。该应用程式运行在Application Load Balancer（ALB）后面的Amazon EC2实例上。该公司使用Amazon RDS数据库实例作为数据库后端。Amazon CloudFront配置了一个指向ALB的源。静态内容被缓存。Amazon Route 53用于托管所有公共区域。在应用程式更新后，ALB偶尔返回502状态码（Bad Gateway）错误。根本原因是返回给ALB的HTTP标头格式错误。当解决方案架构师在错误发生后立即重新加载网页时，网页成功返回。在公司解决问题的同时，解决方案架构师需要为访问者提供自定义错误页面，而不是标准的ALB错误页面。哪些步骤组合将以最少的操作开销满足这一要求？（选择两个。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：提供独立、低运维的错误页面源。",
      "E：CloudFront自定义错误响应是正确机制；附带改DNS不是必要步骤。"
    ],
    "solutions": "正确答案为 A、E。用S3保存静态错误页面，并在已有CloudFront上将502映射到该页面。无需在每次偶发502时切换整个域名或ALB路由。",
    "result_flow": "E后半句改DNS不严谨：通常保持DNS指向CloudFront，新增S3 origin与错误页路径即可。",
    "options": {
      "A": "提供独立、低运维的错误页面源。",
      "B": "Target.FailedHealthChecks不是CloudWatch中可直接照此使用的指标；改路由更复杂。",
      "C": "DNS切换处理不了每次请求的偶发502且存在缓存延迟。",
      "D": "所述健康检查reason不是配置自定义错误页的正确手段。",
      "E": "CloudFront自定义错误响应是正确机制；附带改DNS不是必要步骤。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/GeneratingCustomErrorResponses.html",
        "title": "Generate custom error responses",
        "supports": "CloudFront可按源站错误状态返回自定义页面，错误页可存放S3。"
      }
    ],
    "audit_caveat": "E后半句改DNS不严谨：通常保持DNS指向CloudFront，新增S3 origin与错误页路径即可。",
    "audit_status": "confirmed"
  },
  "11": {
    "blocker": "某公司拥有多个AWS帐户，并使用AWS Organizations来管理所有帐户。解决方案架构师必须实施一个解决方案，公司可以使用该解决方案在多个帐户之间共用公共网路。该公司的基础设施团队有一个专用的基础设施帐户，该帐户有VPC。基础设施团队必须使用此帐户来管理网路。个人帐户无法管理自己的网路。但是，个人帐户必须能够在子网内建立 AWS 资源。解决方案架构师应该执行哪些操作组合来满足这些要求？ （选两个。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：启用组织共享是共享给OU的前提。",
      "D：共享子网到指定OU正是VPC共享。"
    ],
    "solutions": "正确答案为 B、D。VPC共享通过AWS RAM共享子网，网络账户保留网络管理，参与账户在共享子网创建自己的资源。组织内共享先由管理账户启用。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "TGW连接不同VPC，不提供共享子网的所有权模型。",
      "B": "启用组织共享是共享给OU的前提。",
      "C": "重叠CIDR不能VPC peering，也不等于共享同一个网络。",
      "D": "共享子网到指定OU正是VPC共享。",
      "E": "prefix list仅是一组CIDR，不赋予在共享子网建资源的能力。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/ram/latest/userguide/getting-started-sharing.html",
        "title": "Sharing your AWS resources",
        "supports": "组织管理账户启用共享后，RAM可将资源共享给OU。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "12": {
    "blocker": "一家公司想要使用第三方软体即服务 (SaaS) 应用程式。第三方 SaaS 应用程式透过多个 API 呼叫来使用。第三方 SaaS 应用程式也在 VPC 内的 AWS 上运行。该公司将从 VPC 内使用第三方 SaaS 应用程式。该公司制定了内部安全政策，要求使用不穿越网路的私人连线。不允许从公司VPC外部存取在公司VPC内运作的资源。所有权限都必须符合最小权限原则。哪种解决方案满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：消费者端创建接口端点，方向与最小权限正确。"
    ],
    "solutions": "正确答案为 A。本公司是服务消费者，应建立interface endpoint连接供应商的endpoint service；安全组只放行必要客户端连接，服务方不能反向借此访问消费者VPC。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "消费者端创建接口端点，方向与最小权限正确。",
      "B": "Site-to-Site VPN通常经互联网隧道，且网络级互通超出必要服务访问。",
      "C": "Peering允许VPC网络互通，难以天然保证单向服务访问隔离。",
      "D": "把提供者与消费者角色倒置。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/vpc/latest/privatelink/privatelink-access-saas.html",
        "title": "Access SaaS products through AWS PrivateLink",
        "supports": "服务提供者建endpoint service，消费者建interface endpoint并关联安全组。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "13": {
    "blocker": "一家公司需要为其伺服器实施修补流程。 on-premises伺服器和Amazon EC2实例使用各种工具来执行修补。管理需要一份显示所有伺服器和实例的补丁状态的单一报告。解决方案架构师应该采取哪一组操作来满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：Patch Manager覆盖混合环境并提供补丁合规数据。"
    ],
    "solutions": "正确答案为 A。Systems Manager可把EC2与本地服务器注册成managed nodes，统一进行补丁扫描、安装和合规报告。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "Patch Manager覆盖混合环境并提供补丁合规数据。",
      "B": "OpsWorks并不提供题述QuickSight补丁报告集成，且服务已结束支持。",
      "C": "Inspector漏洞报告不是题目所需的统一补丁合规工作流。",
      "D": "X-Ray是分布式调用追踪，不是补丁状态汇总工具。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/systems-manager/latest/userguide/patch-manager.html",
        "title": "AWS Systems Manager Patch Manager",
        "supports": "Patch Manager支持EC2、本地服务器和虚拟机，支持缺失补丁扫描报告。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "14": {
    "blocker": "一家公司在Application Load Balancer后面的Auto Scaling组中的多个Amazon EC2实例上运行应用程式。应用程式的负载在一天中变化，EC2实例定期扩展和缩减。来自EC2实例的日志文件每15分钟复制到一个中央Amazon S3存储桶。安全团队发现一些已终止的EC2实例的日志文件缺失。哪组操作将确保日志文件从已终止的EC2实例复制到中央S3存储桶？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：暂停、远程执行、完成后继续三个步骤正确。"
    ],
    "solutions": "正确答案为 B。终止生命周期钩子把实例暂停在Terminating:Wait；Lambda通过SSM Run Command复制日志，等待复制成功后再CONTINUE，避免15分钟批次间的日志丢失。",
    "result_flow": "必须等待SendCommand执行完成并确认上传成功，再发送CONTINUE；发送命令后立即CONTINUE仍可能丢日志。",
    "options": {
      "A": "ABANDON不会取消实例终止，不能当作阻止终止命令。",
      "B": "暂停、远程执行、完成后继续三个步骤正确。",
      "C": "终止后才事件触发已太迟；user data也不是随事件自动重跑。",
      "D": "SNS通知本身不会调用SendCommand，缺少执行者；ABANDON还会跳过其他终止钩子。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/autoscaling/ec2/userguide/lifecycle-hooks.html",
        "title": "Amazon EC2 Auto Scaling lifecycle hooks",
        "supports": "终止钩子允许在实例完全终止前运行自定义动作、取回日志。"
      }
    ],
    "audit_caveat": "必须等待SendCommand执行完成并确认上传成功，再发送CONTINUE；发送命令后立即CONTINUE仍可能丢日志。",
    "audit_status": "confirmed"
  },
  "15": {
    "blocker": "一家公司正在使用多个 AWS 帐户。 DNS 记录储存在 Account A 中 Amazon Route 53 的私人托管区域。公司的应用程式和资料库运行在Account B。解决方案架构师将在新的VPC中部署两层应用程式。为了简化配置，Amazon RDS端点的 db.example.com CNAME 记录集是在Amazon Route 53的私有托管区域中建立的。部署期间，应用程式无法启动。故障排除显示 db.example.com 在 Amazon EC2 实例上无法解析。解决方案架构师确认在Route 53中正确创建了记录集。解决方案架构师应采取哪些步骤组合来解决此问题？ （选两个。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：由私有托管区域账户创建关联授权。",
      "E：VPC账户执行关联后清理授权，符合官方流程。"
    ],
    "solutions": "正确答案为 C、E。跨账户关联分两端：区域拥有者A先授权VPC B，然后VPC拥有者B完成关联；关联成功后可删除一次性授权，已有关系保留。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "无需把数据库搬到EC2；问题是DNS可见范围。",
      "B": "resolv.conf配置DNS服务器，不应放数据库IP。",
      "C": "由私有托管区域账户创建关联授权。",
      "D": "不存在这里描述的跨账户Route 53区域复制配置。",
      "E": "VPC账户执行关联后清理授权，符合官方流程。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/hosted-zone-private-associate-vpcs-different-accounts.html",
        "title": "Associating an Amazon VPC and a private hosted zone from different accounts",
        "supports": "官方流程为创建授权、关联VPC、建议删除授权；删除不影响已有关联。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "16": {
    "blocker": "一家公司使用Amazon EC2实例部署了一个Web机群来托管博客网站。EC2实例位于Application Load Balancer（ALB）后面，并配置在Auto Scaling组中。Web应用程式将所有博客内容存储在Amazon EFS卷上。该公司最近为博客作者添加了在帖子中添加视频的功能，吸引了以前10倍的用户流量。在一天的高峰时段，用户报告在尝试访问网站或观看视频时出现缓冲和超时问题。哪种最具成本效益和可扩展的部署将解决用户的问题？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：对象存储加CDN最适合视频分发。"
    ],
    "solutions": "正确答案为 C。视频是体积大且适合缓存的静态对象。改存S3并通过CloudFront分发，减轻EFS、EC2和ALB的源站流量。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "提高EFS I/O不解决全球分发与重复视频下载。",
      "B": "实例存储易失，扩缩容复制数据复杂且不可靠。",
      "C": "对象存储加CDN最适合视频分发。",
      "D": "可缓解缓存命中流量，但未命中仍由EC2/EFS处理，保留不必要源站成本。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/on-demand-video.html",
        "title": "Deliver video on demand with CloudFront",
        "supports": "AWS视频点播方案使用S3存储、CloudFront分发。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "17": {
    "blocker": "一家拥有全球办公室的公司有一个 1 Gbps AWS Direct Connect 连接到一个AWS Region。本公司的on-premises网路使用该连线与AWS云端中的公司资源进行通讯。此连接具有连接到单一VPC的单一私有虚拟介面。解决方案架构师必须实作一个在同一 Region 中新增冗余 Direct Connect 连接的解决方案。当公司扩展到其他 Regions 时，此解决方案也必须透过同一对 Direct Connect 连接提供与其他 Regions 的连接。哪种解决方案满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：通过DX gateway汇聚两条private VIF，再关联VPC的VGW。"
    ],
    "solutions": "正确答案为 A。Direct Connect gateway可把多条私有VIF连接到不同区域VPC的虚拟私有网关，既提供双线路冗余，也保留跨区域扩展。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "通过DX gateway汇聚两条private VIF，再关联VPC的VGW。",
      "B": "只直连原VPC，缺少跨区域网关层。",
      "C": "public VIF用于公有AWS服务，不是VPC私有连接。",
      "D": "TGW连接DX需要transit VIF与DX gateway，不能直接连接private VIF。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/directconnect/latest/UserGuide/direct-connect-gateways.html",
        "title": "Direct Connect gateways",
        "supports": "DX gateway支持私有VIF与跨区域虚拟私有网关关联。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "18": {
    "blocker": "一家公司有一个网路应用程序，允许用户上传短视频。影片储存在AmazonEBS卷中，并透过自订识别软体进行分析以进行分类。该网站包含的静态内容具有可变流量，并在某些月份达到高峰。此架构由在 Auto Scaling 群组中运行的用于 Web 应用程式的 Amazon EC2 实例和在 Auto Scaling 群组中运行的用于处理 Amazon SQS 伫列的 EC2 实例组成。该公司希望重新建构应用程序，以尽可能使用AWS托管服务来减少营运开销，并消除对第三方软体的依赖。哪种解决方案满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：托管对象存储、事件、队列和函数覆盖整个流程。"
    ],
    "solutions": "正确答案为 C。静态前端与视频存S3，上传事件进SQS，Lambda调用Rekognition，去除常驻EC2和自建识别服务。",
    "result_flow": "视频识别为异步流程，Lambda启动任务后应处理完成通知，不应一直等待分析完成。",
    "options": {
      "A": "仍保留容器/Spot集群运维。",
      "B": "仍需Web EC2，且Rekognition存储视频分析通常以S3对象为输入。",
      "C": "托管对象存储、事件、队列和函数覆盖整个流程。",
      "D": "Beanstalk仍管理EC2环境，运维负担高于全托管组合。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/rekognition/latest/dg/video.html",
        "title": "Working with stored video analysis operations",
        "supports": "Rekognition存储视频分析使用S3对象并提供异步识别API。"
      }
    ],
    "audit_caveat": "视频识别为异步流程，Lambda启动任务后应处理完成通知，不应一直等待分析完成。",
    "audit_status": "confirmed"
  },
  "19": {
    "blocker": "一家公司有一个由 Amazon CloudFront、Amazon API Gateway 和 AWS Lambda 函数组成的无伺服器应用程式。目前应用程式程式码的部署过程是建立 Lambda 函数的新版本号并执行 AWS CLI 脚本进行更新。如果新函数版本出现错误，另一个 CLI 脚本将透过部署函数的先前工作版本来还原。该公司希望减少部署 Lambda 函数提供的新版本应用程式逻辑的时间，并减少发现错误时检测和复原的时间。如何才能做到这一点？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：原生部署、钩子、渐变与回滚正好满足。"
    ],
    "solutions": "正确答案为 B。SAM集成CodeDeploy可按金丝雀或线性方式切换Lambda alias流量，执行前后验证钩子，并根据CloudWatch告警自动回滚。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "变更集用于预览更新，不提供题述自动流量渐变与告警回滚。",
      "B": "原生部署、钩子、渐变与回滚正好满足。",
      "C": "自行合并脚本仍需维护检测与回滚机制。",
      "D": "复制API并切换CloudFront origin增加部署步骤和传播等待。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/automating-updates-to-serverless-apps.html",
        "title": "Deploying serverless applications gradually with AWS SAM",
        "supports": "SAM使用CodeDeploy渐进转流量、测试钩子与告警回滚。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "20": {
    "blocker": "一家公司计划储存大量存档文档，并透过公司内部网路向员工提供这些文档。员工将透过连接到 VPC 的客户端 VPN 服务连接来存取系统。这些数据不得对公众开放。本公司储存的文件是其他地方实体媒体上保存的资料的副本。请求的数量将会很少。可用性和检索速度不是公司关心的问题。哪一种解决方案能够以最低的成本满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：EC2私有Web加EFS One Zone-IA可行，按实际存储付费，访问安全组限制到私网。"
    ],
    "solutions": "参考选择为 B。当前题面不能以A作为有效私网站点方案：S3接口端点明确不支持website endpoint。B/C是可行私有Web方案；在典型低使用归档前提下B的EFS One Zone-IA可避免预置闲置容量，推荐B，但费用仍依赖数据量、请求及区域。",
    "result_flow": "原题缺数据量与计费区域，不能严谨证明B绝对最便宜；EFS IA需生命周期转换且有最低存储期限。应作为歧义题，不将A继续当成正确架构。",
    "options": {
      "A": "接口端点不支持S3网站端点，违反私有访问要求。",
      "B": "EC2私有Web加EFS One Zone-IA可行，按实际存储付费，访问安全组限制到私网。",
      "C": "EC2私有Web加sc1亦可行；sc1需预置容量，最小容量和空置空间影响总成本。",
      "D": "除网站端点限制外，Deep Archive还必须先恢复对象，不能直接提供网页内容。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/privatelink-interface-endpoints.html",
        "title": "AWS PrivateLink for Amazon S3",
        "supports": "官方限制明确列出接口端点不支持Website endpoints。"
      }
    ],
    "audit_caveat": "原题缺数据量与计费区域，不能严谨证明B绝对最便宜；EFS IA需生命周期转换且有最低存储期限。应作为歧义题，不将A继续当成正确架构。",
    "audit_status": "ambiguous"
  },
  "21": {
    "blocker": "一家公司正在使用 on-premises Active Directory 服务进行使用者验证。该公司希望使用相同的身份验证服务登入该公司使用 AWS Organizations ​​的 AWS 帐户。 on-premises 环境与公司所有 AWS 帐户之间已存在AWS Site-to-Site VPN 连接。本公司的安全策略要求根据使用者群组和角色对帐户进行有条件的存取。使用者身分必须在单一位置进行管理。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：支持外部IdP的正确整体架构，但需AD联合身份提供者桥接。"
    ],
    "solutions": "正确答案为 A。A是选项中唯一保留已有目录为身份源、通过Identity Center统一多账户联合登录的方案；SAML负责认证、SCIM同步用户/组，ABAC可依据属性约束权限。",
    "result_flow": "AD DS本身不直接提供SAML/SCIM。需AD FS/Entra/其他支持的IdP或使用AD Connector；组/角色到permission sets分配仍应配置。",
    "options": {
      "A": "支持外部IdP的正确整体架构，但需AD联合身份提供者桥接。",
      "B": "把Identity Center内置目录作身份源不满足继续使用原AD认证。",
      "C": "SAML联合角色不要求创建映射IAM用户，也不存在cross-account IAM users这种授权模式。",
      "D": "AD联合控制台登录不采用这里描述的普通OIDC方案。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/singlesignon/latest/userguide/manage-your-identity-source-idp.html",
        "title": "External identity providers",
        "supports": "Identity Center以SAML外部IdP认证，并支持SCIM或手动预置用户和组。"
      }
    ],
    "audit_caveat": "AD DS本身不直接提供SAML/SCIM。需AD FS/Entra/其他支持的IdP或使用AD Connector；组/角色到permission sets分配仍应配置。",
    "audit_status": "confirmed"
  },
  "22": {
    "blocker": "一家软体公司部署了一个应用程序，该应用程式透过使用 Amazon API Gateway、AWS Lambda 函数和 Amazon DynamoDB 表来使用 REST API。应用程式显示 PUT 请求期间的错误数量有所增加。大多数 PUT 呼叫来自少数使用特定 API 金钥进行身份验证的用户端。解决方案架构师发现大量 PUT 请求源自于一个客户端。该 API 并不重要，客户端可以容忍重试不成功的呼叫。然而，这些错误会向客户显示，并对 API 的声誉造成损害。解决方案架构师应该建议什么来改善客户体验？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：API key关联usage plan可设限流及配额。"
    ],
    "solutions": "正确答案为 B。识别到单一API key客户造成突发负载，应通过usage plan为客户限流，防止其耗尽共享后端，并由客户端平稳处理429重试。",
    "result_flow": "API key本身不是身份认证；usage plan限流与配额为best effort，不应作为严格硬上限。",
    "options": {
      "A": "重试退避有帮助，但没有约束单个高流量客户造成的后端过载。",
      "B": "API key关联usage plan可设限流及配额。",
      "C": "PUT为写操作，缓存不能解决写入过载。",
      "D": "reserved concurrency是并发上限/预留，不会自动为后端增加容量，也不做按客户公平限流。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-api-usage-plans.html",
        "title": "Usage plans and API keys for REST APIs",
        "supports": "Usage plan按API key配置节流与配额。"
      }
    ],
    "audit_caveat": "API key本身不是身份认证；usage plan限流与配额为best effort，不应作为严格硬上限。",
    "audit_status": "confirmed"
  },
  "23": {
    "blocker": "一家公司正在 AWS 上运行资料密集型应用程式。该应用程式在数百个 Amazon EC2 实例的集群上运行。共享档案系统也在多个储存 200 TB 资料的 EC2 实例上运作。应用程式读取并修改共享档案系统上的资料并产生报告。该作业每月运行一次，从共享档案系统读取档案的子集，大约需要 72 小时才能完成。计算实例在Auto Scaling组中扩展，但托管共享档案系统的实例持续运行。计算实例和储存实例都位于同一个 AWS Region 中。解决方案架构师需要透过取代共享档案系统实例来降低成本。文件系统必须在 72 小时运行期间提供对所需资料的高效能存取。哪一种解决方案能够在满足这些要求的同时最大程度地降低整体成本？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：按需加载子集并按作业窗口付文件系统费用，最符合访问模式。"
    ],
    "solutions": "正确答案为 A。每月只处理200TB中的子集，S3负责长期保存，运行时临时启动高性能FSx for Lustre并按需加载，结束后导出变更再删除，避免整月保留高性能文件服务器。",
    "result_flow": "删除FSx前必须完成修改数据的export；不能假定写入会自动持久化到S3。",
    "options": {
      "A": "按需加载子集并按作业窗口付文件系统费用，最符合访问模式。",
      "B": "EBS Multi-Attach受单AZ和实例数限制，不适合数百节点200TB共享文件系统。",
      "C": "全量批量加载和持续S3 Standard存储通常增加不必要费用。",
      "D": "File Gateway缓存不是大规模HPC并行共享文件系统的等价替代。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/fsx/latest/LustreGuide/overview-dra-data-repo.html",
        "title": "Overview of data repositories",
        "supports": "FSx for Lustre可关联S3、导入元数据并导出处理结果。"
      }
    ],
    "audit_caveat": "删除FSx前必须完成修改数据的export；不能假定写入会自动持久化到S3。",
    "audit_status": "confirmed"
  },
  "24": {
    "blocker": "一家公司正在开发一项新服务，将在静态连接埠上使用 TCP 进行存取。解决方案架构师必须确保服务高度可用，在 Availability Zones 上具有冗余，并且可以使用可公开存取的 DNS 名称 my.service.com 进行存取。该服务必须使用固定地址分配，以便其他公司可以将地址新增至其允许清单。假设将资源部署在单一Region中的多个Availability Zones中，哪一种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：NLB每AZ静态EIP、实例目标组、DNS alias组成正确。"
    ],
    "solutions": "正确答案为 C。TCP服务需要NLB；给每个启用AZ的NLB节点分配EIP，合作方放行固定地址，Route 53 alias指向NLB统一域名。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "NS记录需要域名服务器名称，不是应用实例IP；也绕过负载均衡。",
      "B": "ECS cluster没有可直接登记的集群公网IP或cluster name目标类型。",
      "C": "NLB每AZ静态EIP、实例目标组、DNS alias组成正确。",
      "D": "ALB不提供任意TCP监听，CNAME也不能直接填IP。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/elasticloadbalancing/latest/network/network-load-balancers.html",
        "title": "Network Load Balancers",
        "supports": "NLB每启用AZ有固定IP，internet-facing NLB可配置EIP。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "25": {
    "blocker": "一家公司使用on-premises数据分析平台。该系统在公司资料中心的 12 台伺服器上采用完全冗余配置，具有高可用性。除了使用者的一次性请求之外，系统每小时和每天运行预定作业。排程作业可能需要 20 分钟到 2 小时才能完成执行并具有严格的 SLA。计划作业占系统使用量的 65%。使用者作业通常在 5 分钟内完成运行，并且没有 SLA。使用者作业占系统使用量的 35%。在系统故障期间，已排程的作业必须继续满足 SLA。但是，使用者作业可能会延迟。解决方案架构师需要将系统迁移到Amazon EC2实例，并采用基于消耗的模型来降低成本，而无需做出长期承诺。此解决方案必须保持高可用性，且不得影响 SLA。哪一种解决方案能够最具成本效益地满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：9台按需跨3AZ并预留容量，3台Spot用于可延迟负载。"
    ],
    "solutions": "正确答案为 D。12台为完全冗余容量，保留任一AZ故障后可用的按需容量来满足65%的重要定时负载，Spot只承接可延迟任务。三AZ各3台按需、1台Spot最稳妥。",
    "result_flow": "题目未给精确峰值资源需求；选项隐含12台为冗余配置，不应把65%机械理解成故障后必须留8台。",
    "options": {
      "A": "只有4台按需，Spot被回收后不足以可靠承载定时负载。",
      "B": "按需集中一AZ，AZ故障会失去全部可靠容量。",
      "C": "Savings Plan需1/3年承诺，违反无长期承诺。",
      "D": "9台按需跨3AZ并预留容量，3台Spot用于可延迟负载。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-capacity-reservations.html",
        "title": "Reserve compute capacity with EC2 On-Demand Capacity Reservations",
        "supports": "即时Capacity Reservation无长期期限承诺，并保障特定AZ容量。"
      }
    ],
    "audit_caveat": "题目未给精确峰值资源需求；选项隐含12台为冗余配置，不应把65%机械理解成故障后必须留8台。",
    "audit_status": "confirmed"
  },
  "26": {
    "blocker": "安全工程师确定现有应用程式从 Amazon S3 中的加密档案撷取 MySQL 资料库的 Amazon RDS 凭证。对于应用程式的下一版本，安全工程师希望实施以下应用程式设计变更以提高安全性： 资料库必须使用储存在安全的 AWS 托管服务中的随机产生的强密码。应用资源必须透过AWS CloudFormation进行部署。应用程式必须每 90 天轮换资料库的凭证。解决方案架构师将产生一个CloudFormation模板来部署应用程式。 CloudFormation 范本中指定的哪些资源能够以最少的营运开销满足安全工程师的要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：原生Secret、Lambda轮换、RotationSchedule满足要求。"
    ],
    "solutions": "正确答案为 A。Secrets Manager生成随机密码并用原生RotationSchedule关联轮换Lambda，CloudFormation管理所需资源，90天计划无需自建调度。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "原生Secret、Lambda轮换、RotationSchedule满足要求。",
      "B": "Parameter Store没有所述RotationSchedule资源，CloudFormation参数资源也不按此生成SecureString。",
      "C": "可自行编排但增加调度和状态协调。",
      "D": "AppSync DataSource不是RDS凭据自动轮换器。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-secretsmanager-rotationschedule.html",
        "title": "AWS::SecretsManager::RotationSchedule",
        "supports": "该资源配置Secret轮换函数及计划。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "27": {
    "blocker": "一家公司将资料储存在多个 Amazon DynamoDB 表中。解决方案架构师必须使用无伺服器架构，透过HTTPS透过简单的 API 公开存取资料。该解决方案必须根据需求自动扩展。哪些解决方案满足这些要求？ （选两个。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：REST API的AWS integration可直接调用DynamoDB。",
      "C：HTTP API的Lambda集成满足需要。"
    ],
    "solutions": "正确答案为 A、C。REST API支持通用AWS服务集成直接操作DynamoDB；HTTP API可经Lambda访问DynamoDB。两者均提供公开HTTPS且自动伸缩。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "REST API的AWS integration可直接调用DynamoDB。",
      "B": "HTTP API仅支持指定的AWS integration subtypes，不提供通用DynamoDB直接集成。",
      "C": "HTTP API的Lambda集成满足需要。",
      "D": "Global Accelerator不以Lambda@Edge为endpoint。",
      "E": "NLB不能直接把Lambda作为目标，ALB才支持Lambda targets。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations-aws-services.html",
        "title": "Create AWS service integrations for HTTP APIs",
        "supports": "HTTP API服务集成通过预定义integration subtype，不等同REST通用AWS集成。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "28": {
    "blocker": "某公司注册了 10 个新网域。该公司使用这些网域进行线上行销。该公司需要一种解决方案，将线上访客重新导向到每个网域的特定 URL。所有网域和目标 URL 均在 JSON 文件中定义。所有DNS记录皆由Amazon Route 53管理。解决方案架构师必须实现接受 HTTP 和 HTTPS 请求的重定向服务。解决方案架构师应采取哪种步骤组合才能以最少的操作工作量满足这些要求？ （选择三项。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：ALB提供两个协议监听及Lambda target集成。",
      "C：Lambda能根据请求host查表并返回重定向。",
      "F：SAN证书覆盖多个营销域名的TLS。"
    ],
    "solutions": "正确答案为 B、C、F。用ALB的HTTP/HTTPS监听器调用Lambda，函数根据Host与JSON映射返回Location重定向；一张包含所有域名SAN的ACM证书覆盖HTTPS。",
    "result_flow": "C+E+F也可设计出功能正确的架构，题目的LEAST operational effort缺少可量化比较，BCF是推荐组合，不能宣称CloudFront不可重定向。",
    "options": {
      "A": "EC2需要操作系统与Web服务维护。",
      "B": "ALB提供两个协议监听及Lambda target集成。",
      "C": "Lambda能根据请求host查表并返回重定向。",
      "D": "单个API自定义域名配置不足以直接描述十域名接入，需额外domain mapping。",
      "E": "CloudFront加Lambda@Edge也可实现，但需边缘部署及别名配置；本题BCF是直接组合。",
      "F": "SAN证书覆盖多个营销域名的TLS。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/elasticloadbalancing/latest/application/lambda-functions.html",
        "title": "Use Lambda functions as targets of an Application Load Balancer",
        "supports": "ALB可将HTTP/HTTPS请求转为事件调用Lambda，并把Lambda响应返回客户端。"
      }
    ],
    "audit_caveat": "C+E+F也可设计出功能正确的架构，题目的LEAST operational effort缺少可量化比较，BCF是推荐组合，不能宣称CloudFront不可重定向。",
    "audit_status": "confirmed"
  },
  "29": {
    "blocker": "拥有多个 AWS 帐户的公司正在使用 AWS Organizations。公司的 AWS 帐户托管 VPC、Amazon EC2 实例和容器。公司的合规团队已在公司部署的每个VPC中部署了安全工具。安全工具在 EC2 实例上运行，并将资讯传送至合规团队专用的 AWS 帐户。该公司已使用键“costCenter”和值或“compliance”标记所有与合规性相关的资源。该公司希望确定在 EC2 实例上运行的安全工具的成本，以便公司可以向合规团队的 AWS 帐户收费。成本计算必须尽可能准确。解决方案架构师应该怎么做才能满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：管理账户激活、集中CUR、按标签聚合正确。"
    ],
    "solutions": "正确答案为 A。组织账单中的用户自定义成本分配标签由管理账户激活；CUR包含成员账户用量与激活标签，可汇总costCenter=compliance的准确资源成本。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "管理账户激活、集中CUR、按标签聚合正确。",
      "B": "成员账户不能替代管理账户激活组织成本分配标签。",
      "C": "同样错误地在成员账户激活组织计费标签。",
      "D": "Trusted Advisor不提供题述按标签归集账单的报告机制。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/activating-tags.html",
        "title": "Activating user-defined cost allocation tags",
        "supports": "组织成本分配标签由管理账户激活，然后在成本报告中使用。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "30": {
    "blocker": "一家公司有 50 个 AWS 帐户，这些帐户是 AWS Organizations ​​组织的成员。每个帐户包含多个VPC。该公司希望使用 AWS Transit Gateway 在每个成员帐户中的 VPC 之间建立连接。每次建立新的会员帐户时，该公司都希望自动执行建立新 VPC 和中转网关附件的过程。哪一种步骤组合可以满足这些要求？ （选两个。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：RAM是TGW跨账户共享方式。",
      "C：StackSets自动部署VPC及VPC attachment满足新账户自动化。"
    ],
    "solutions": "正确答案为 A、C。RAM把中央TGW共享给成员账户；具有服务管理权限的StackSets对新加入组织/OU账户自动部署VPC和VPC attachment，关联共享TGW ID。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "RAM是TGW跨账户共享方式。",
      "B": "SCP只设权限护栏，不共享网络资源。",
      "C": "StackSets自动部署VPC及VPC attachment满足新账户自动化。",
      "D": "peering attachment连接两个TGW，不是VPC附着。",
      "E": "Service Catalog不是共享TGW访问权限的机制。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-orgs-manage-auto-deployment.html",
        "title": "Enable automatic deployments for StackSets in AWS Organizations",
        "supports": "StackSets可向新加入目标组织/OU的账户自动部署。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "31": {
    "blocker": "一家企业公司希望允许其开发人员透过AWS Marketplace 购买第三方软体。该公司使用启用了全部功能的 AWS Organizations ​​帐户结构，并在每个组织单位 (OU) 中拥有一个供采购经理使用的共享服务帐户。采购团队的政策表明，开发者应该只能从批准的清单中获取第三方软体，并使用AWS Marketplace中的Private Marketplace来实现这一要求。采购团队希望私人市场的管理仅限于名为采购经理角色的角色，该角色可以由采购经理承担。公司中的其他 IAM 使用者、群组、角色和帐户管理员应被拒绝 Private Marketplace 管理存取权限。设计架构以满足这些要求的最有效方法是什么？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：指定角色授权、组织拒绝、阻止同名角色冒充三层结合。"
    ],
    "solutions": "正确答案为 C。采购管理员角色只建在共享服务账户并授予专用管理策略；组织级SCP禁止其他主体管理Private Marketplace，也禁止自行创建同名角色绕过例外。",
    "result_flow": "SCP不约束Organizations管理账户本身；严格全组织限制还要配置管理账户IAM与角色修改/PassRole护栏。当前组织集成还要求管理账户或委派管理员。",
    "options": {
      "A": "PowerUserAccess不是所需最小权限，逐身份拒绝维护量高。",
      "B": "Admin权限过大，且权限边界不会给角色授予权限。",
      "C": "指定角色授权、组织拒绝、阻止同名角色冒充三层结合。",
      "D": "只在共享账户限制，却在开发账户授管理角色，范围倒置。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/aws-managed-policy/latest/reference/AWSPrivateMarketplaceAdminFullAccess.html",
        "title": "AWSPrivateMarketplaceAdminFullAccess",
        "supports": "专用AWS管理策略提供Private Marketplace管理权限。"
      }
    ],
    "audit_caveat": "SCP不约束Organizations管理账户本身；严格全组织限制还要配置管理账户IAM与角色修改/PassRole护栏。当前组织集成还要求管理账户或委派管理员。",
    "audit_status": "confirmed"
  },
  "32": {
    "blocker": "某公司正在实施AWS Organizations，以限制其开发人员仅使用Amazon EC2、Amazon S3和Amazon DynamoDB。开发者帐户驻留在专门的组织单位 (OU)。解决方案架构师已在开发人员帐户上实施以下SCP：部署此策略后，开发人员帐户中的IAM用户仍然可以使用策略中未列出的AWS服务。解决方案架构师应该采取什么措施来消除开发人员使用本政策范围以外的服务的能力？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：移除同限制层的全允许策略才使白名单生效。"
    ],
    "solutions": "参考选择为 B。白名单SCP与同级FullAWSAccess会合并允许，因此需移除开发账户所在限制层的宽泛FullAWSAccess，仅保留所需服务Allow。",
    "result_flow": "英文题干说following SCP但实际代码/图片缺失；B成立的前提是白名单附在OU限制层且该层同时存在FullAWSAccess。若白名单只附账户，移除OU的FullAWSAccess会使OU无Allow而全部拒绝，应先补回原策略。",
    "options": {
      "A": "维护所有其他服务Deny清单不高效，新增服务还需跟进。",
      "B": "移除同限制层的全允许策略才使白名单生效。",
      "C": "显式Deny全部服务也会禁止允许的三项。",
      "D": "通配Deny同样覆盖原Allow，导致所有服务不可用。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps_evaluation.html",
        "title": "SCP evaluation",
        "supports": "同一层多个SCP的Allow合并，显式Deny优先。"
      }
    ],
    "audit_caveat": "英文题干说following SCP但实际代码/图片缺失；B成立的前提是白名单附在OU限制层且该层同时存在FullAWSAccess。若白名单只附账户，移除OU的FullAWSAccess会使OU无Allow而全部拒绝，应先补回原策略。",
    "audit_status": "ambiguous"
  },
  "33": {
    "blocker": "一家公司正在 VPC 的公共子网路中的 ve 个 Amazon EC2 实例上托管一个基于 REST 的行动应用程式 API。行动用户端使用 Amazon Route 53 上托管的网域连接到 API。该公司使用所有 EC2 实例的 IP 位址建立了 Route 53 多值应答路由策略。最近，该应用程式因流量突然大幅增加而不堪重负。该应用程式无法跟上流量。解决方案架构师需要实作一个解决方案，以便应用程式可以处理新的和变化的负载。哪种解决方案能够以最少的营运开销满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：托管API与函数伸缩满足负载变化且运维最少。"
    ],
    "solutions": "正确答案为 A。突发流量需要自动增减处理容量。API Gateway配Lambda去除EC2集群管理，Lambda按并发请求扩展；D仅把现有五台实例放在ALB后，不能增加可用算力。",
    "result_flow": "重构有开发成本；本题问运营负担且允许拆API，因此不能以重构工作量为由选缺少伸缩的D。",
    "options": {
      "A": "托管API与函数伸缩满足负载变化且运维最少。",
      "B": "EKS与EC2节点增加集群运维。",
      "C": "ASG可扩展但自行维护DNS同步函数不如托管入口。",
      "D": "ALB分发请求但不创建实例，未解决容量不足。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/lambda/latest/dg/lambda-concurrency.html",
        "title": "Understanding Lambda scaling",
        "supports": "Lambda随请求并发自动增加执行环境，受配额限制。"
      }
    ],
    "audit_caveat": "重构有开发成本；本题问运营负担且允许拆API，因此不能以重构工作量为由选缺少伸缩的D。",
    "audit_status": "corrected"
  },
  "34": {
    "blocker": "一家公司在 AWS Organizations ​​中为其每个工程团队创建了一个 OU。每个OU拥有多个AWS帐户。该组织拥有数百个 AWS 帐户。解决方案架构师必须设计一个解决方案，以便每个OU 都可以查看其AWS 帐户的使用成本明细。哪种解决方案满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：集中CUR覆盖组织所有账户，适合团队视图。"
    ],
    "solutions": "正确答案为 B。管理账户CUR汇总所有成员账户成本，QuickSight按linked account与OU映射分组，并配置团队行级权限。",
    "result_flow": "CUR不会自动把每行标成OU；需维护账户到OU映射，并使用QuickSight行级权限隔离各团队。",
    "options": {
      "A": "RAM不生成按OU CUR。",
      "B": "集中CUR覆盖组织所有账户，适合团队视图。",
      "C": "每成员CUR仅有自身用量，增加数百份汇总工作。",
      "D": "Systems Manager不是CUR或账单报告生成服务。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/cur/latest/userguide/cur-consolidated-billing.html",
        "title": "Using Cost and Usage Reports for AWS Organizations",
        "supports": "成员CUR只有本账户，组织合并成本应从管理账户汇总。"
      }
    ],
    "audit_caveat": "CUR不会自动把每行标成OU；需维护账户到OU映射，并使用QuickSight行级权限隔离各团队。",
    "audit_status": "confirmed"
  },
  "35": {
    "blocker": "一家公司将资料储存在 Windows 档案伺服器上。该公司每天产生 5 GB 的新数据。该公司将部分基于 Windows 的工作负载迁移到AWS，并需要在云端中的档案系统上提供资料。本公司已经在on-premises网路和AWS之间建立了AWS Direct Connect连线。公司应该使用哪种资料迁移策略？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：DataSync支持SMB到FSx Windows并可周期复制。"
    ],
    "solutions": "正确答案为 B。Windows文件负载通常要求SMB与Windows ACL，FSx for Windows File Server保留这些语义；DataSync按每日任务通过现有DX复制变化文件。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "替换本地服务器不是必要迁移策略，S3 File Gateway也不等于云端Windows原生文件系统。",
      "B": "DataSync支持SMB到FSx Windows并可周期复制。",
      "C": "Data Pipeline不是合适文件迁移工具，EFS为NFS。",
      "D": "虽能复制部分数据，但EFS不能替代Windows SMB/ACL文件共享需求。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/fsx/latest/WindowsGuide/migrate-files-to-fsx-datasync.html",
        "title": "Migrating existing files to FSx for Windows using DataSync",
        "supports": "官方支持本地SMB迁移至FSx并周期执行。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "36": {
    "blocker": "一家公司的解决方案架构师正在审查在 AWS 上运行的 Web 应用程式。该应用程式引用 us-east-1 Region 中Amazon S3 储存桶中的静态资产。公司需要跨越多个 AWS Regions 的弹性。该公司已经在第二个Region中创建了一个S3桶。哪种解决方案能够以最少的营运开销满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：托管复制和自动源站故障转移组合运维最少。"
    ],
    "solutions": "正确答案为 C。S3跨区域复制持续复制静态资产；CloudFront origin group根据错误状态或超时自动向第二源取回对象，避免自写复制和故障切换代码。",
    "result_flow": "需开启桶版本控制；已有对象须Batch Replication，CRR为异步，不能保证零RPO。",
    "options": {
      "A": "应用双写和DNS分流需要额外维护且没有完整故障判断。",
      "B": "Lambda复制重复实现S3托管复制。",
      "C": "托管复制和自动源站故障转移组合运维最少。",
      "D": "故障时修改代码是人工恢复步骤。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/high_availability_origin_failover.html",
        "title": "Optimize high availability with CloudFront origin failover",
        "supports": "origin group有主备源，按指定错误/超时自动切源。"
      }
    ],
    "audit_caveat": "需开启桶版本控制；已有对象须Batch Replication，CRR为异步，不能保证零RPO。",
    "audit_status": "confirmed"
  },
  "37": {
    "blocker": "一家公司在 on-premises 环境中托管一个三层 Web 应用程式。由于最近流量激增导致停机并造成重大财务影响，公司管理层已下令将应用程式转移到AWS。该应用程式是用 .NET 编写的，并且依赖 MySQL 资料库。解决方案架构师必须设计可扩展且高度可用的解决方案，以满足 200,000 名日常用户的需求。解决方案架构师应该采取哪些步骤来设计合适的解决方案？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：多AZ应用与数据库、托管入口、基础设施模板完整。"
    ],
    "solutions": "参考选择为 B。ALB加多AZ ASG扩展.NET应用，Aurora MySQL跨AZ数据库副本提供故障转移，Retain防止误删栈同时删除数据库。",
    "result_flow": "A也可满足广义可伸缩与高可用要求，题面未给必须ALB的HTTP特性或Aurora性能条件；推荐B但不应把A判为技术不可行。",
    "options": {
      "A": "也可实现可用架构，NLB支持TCP上的HTTP流量，但B的ALB更贴合Web层且明确Aurora集群。",
      "B": "多AZ应用与数据库、托管入口、基础设施模板完整。",
      "C": "单一Beanstalk环境不能横跨区域。",
      "D": "仅Spot与单实例RDS不足以可靠保证高可用。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.managing.elb.html",
        "title": "Load balancer for your Elastic Beanstalk environment",
        "supports": "Beanstalk支持多种ELB类型；不能错误宣称NLB不支持.NET Web。"
      }
    ],
    "audit_caveat": "A也可满足广义可伸缩与高可用要求，题面未给必须ALB的HTTP特性或Aurora性能条件；推荐B但不应把A判为技术不可行。",
    "audit_status": "ambiguous"
  },
  "38": {
    "blocker": "一家公司正在使用 AWS Organizations ​​管理多个 AWS 帐户。出于安全目的，公司要求创建一个Amazon简单通知服务（Amazon SNS）主题，以便与所有组织成员帐户中的第三方警报系统整合。解决方案架构师使用 AWS CloudFormation 范本建立 SNS 主题和堆叠集，以自动部署 CloudFormation 堆叠。组织中已启用可信任存取。解决方案架构师应该如何在所有 AWS 帐户中部署 CloudFormation StackSet？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：与可信访问、组织目标及自动部署完整匹配。"
    ],
    "solutions": "正确答案为 C。在管理账户创建service-managed StackSet，目标指向组织，开启automatic deployment覆盖当前及未来成员账户。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "普通成员账户不能因此成为组织部署管理者，drift只检测差异。",
      "B": "组织自动权限是service-managed，不是self-service。",
      "C": "与可信访问、组织目标及自动部署完整匹配。",
      "D": "应创建StackSet不是单个stack，漂移检测不负责新增账户。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-orgs-manage-auto-deployment.html",
        "title": "Automatic deployments for StackSets in AWS Organizations",
        "supports": "服务管理StackSet对目标组织/OU自动部署。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "39": {
    "blocker": "一家公司希望将其工作负载从本地迁移到AWS。工作负载在 Linux 和 Windows 上运作。该公司拥有大型本地基础设施，由托管大量应用程式的实体机和虚拟机组成。公司必须撷取有关 on-premises 工作负载的系统配置、系统效能、运行进程和网路连接的详细资讯。公司还必须将on-premises应用程式分组以进行AWS迁移。该公司需要针对 Amazon EC2 执行个体类型的建议，以便公司能够以最具成本效益的方式在 AWS 上运行其工作负载。解决方案架构师应该采取哪些步骤组合来满足这些要求？ （选择三项。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：Discovery Agent采集题述依赖与性能数据。",
      "D：Migration Hub支持应用分组。",
      "E：Migration Hub EC2建议功能利用采集的配置与使用率。"
    ],
    "solutions": "正确答案为 A、D、E。Discovery Agent收集Windows/Linux物理机与VM配置、性能、进程、连接；Migration Hub把服务器分组为应用，并用采集数据给出EC2规格与成本建议。",
    "result_flow": "这是历史SAP-C02服务组合；若AWS对新客户可用性已改变，应遵循现有账户支持范围。",
    "options": {
      "A": "Discovery Agent采集题述依赖与性能数据。",
      "B": "SSM不是本题完整应用发现与迁移依赖映射工具。",
      "C": "Application Manager用于应用运维，不是迁移应用分组入口。",
      "D": "Migration Hub支持应用分组。",
      "E": "Migration Hub EC2建议功能利用采集的配置与使用率。",
      "F": "Trusted Advisor不通过导入本地服务器表来进行该迁移规格推荐。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/application-discovery/latest/userguide/discovery-agent.html",
        "title": "AWS Application Discovery Agent",
        "supports": "Agent收集配置、性能、进程与网络连接，覆盖Linux/Windows物理与VM。"
      }
    ],
    "audit_caveat": "这是历史SAP-C02服务组合；若AWS对新客户可用性已改变，应遵循现有账户支持范围。",
    "audit_status": "confirmed"
  },
  "40": {
    "blocker": "一家公司正在 VPC 中的 AWS 上托管影像处理服务。 VPC 横跨两个Availability Zones。每个Availability Zone包含1个公有子网和1个私有子网。此服务在私有子网路中的 Amazon EC2 实例上运作。公共子网路中的Application Load Balancer位于服务前面。该服务需要与互联网进行通信，并透过两个 NAT 网关进行通信。该服务使用Amazon S3进行影像储存。 EC2 实例每天从 S3 储存桶检索约 1 TB 资料。该公司将该服务宣传为高度安全的。解决方案架构师必须在不影响服务安全状况或增加持续营运时间的情况下尽可能减少云端支出。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：免费gateway endpoint保留私有架构并降低NAT成本。"
    ],
    "solutions": "正确答案为 C。S3 gateway endpoint让私有EC2访问S3不经过NAT，并可用端点策略限制到指定桶和动作，消除每日1TB的NAT数据处理费。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "NAT实例增加补丁、扩展与HA运维。",
      "B": "公有子网改变安全边界且并非必须。",
      "C": "免费gateway endpoint保留私有架构并降低NAT成本。",
      "D": "改成EFS改变存储接口并可能增加费用，无需迁移图片。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints-s3.html",
        "title": "Gateway endpoints for Amazon S3",
        "supports": "gateway endpoint无额外费用，访问S3无需NAT或IGW。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "41": {
    "blocker": "一家公司最近在AWS上部署了一个应用程式。该应用程式使用Amazon DynamoDB。该公司测量了应用程式负载，并在 DynamoDB 表上配置了 RCU 和 WCU，以匹配预期的峰值负载。尖峰负载每周出现一次，持续 4 小时，是平均负载的两倍。应用程式负载接近本周剩余时间的平均负载。存取模式包括对表的写入比对表的读取多得多。解决方案架构师需要实施一个解决方案来最大限度地降低表的成本。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：稳定基线折扣加短峰扩容匹配模式。"
    ],
    "solutions": "正确答案为 A。绝大多数时间为稳定基线，预留基线RCU/WCU取得折扣，再以定时或目标跟踪伸缩覆盖每周四小时峰值；写多读少不适合用DAX降总成本。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "稳定基线折扣加短峰扩容匹配模式。",
      "B": "按需简单，但高持续利用率下通常比已折扣预置容量贵。",
      "C": "DAX主要缓存读取，不减少写入WCU。",
      "D": "DAX增加缓存成本且不解决写主导成本。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/CostOptimization_TableCapacityMode.html",
        "title": "Evaluate your DynamoDB table capacity mode",
        "supports": "稳定可预测负载可用预置容量、预留折扣，并提前安排批量峰值扩容。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "42": {
    "blocker": "解决方案架构师需要就如何将其on-premises资料处理应用程式迁移到AWS云向公司提供建议。目前，使用者透过入口网站上传输入档案。然后，Web 伺服器将上传的档案储存在 NAS 上，并透过讯息伫列向处理伺服器发送讯息。每个媒体档案可能需要长达 1 小时来处理。该公司已确定，在工作时间等待处理的媒体文件数量显著增加，而在工作时间之后文件数量迅速下降。最具成本效益的迁移建议是什么？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：队列、ASG及S3适合可变长时批处理。"
    ],
    "solutions": "正确答案为 D。最长一小时任务超过Lambda十五分钟上限；SQS解耦并让EC2 worker按积压伸缩，业务低谷减少计算，S3保存媒体。",
    "result_flow": "伸缩宜使用每实例积压量，长任务应配置visibility timeout、心跳和scale-in protection。",
    "options": {
      "A": "一小时处理不能放单次Lambda。",
      "B": "逐消息启动单独实例与MQ broker增加成本/启动负担。",
      "C": "仍受Lambda时长限制。",
      "D": "队列、ASG及S3适合可变长时批处理。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-using-sqs-queue.html",
        "title": "Scaling policy based on Amazon SQS",
        "supports": "ASG可按SQS backlog per instance动态扩缩。"
      }
    ],
    "audit_caveat": "伸缩宜使用每实例积压量，长任务应配置visibility timeout、心跳和scale-in protection。",
    "audit_status": "confirmed"
  },
  "43": {
    "blocker": "一家公司正在使用Amazon OpenSearch Service来分析数据。该公司将资料从使用 S3 标准储存的 Amazon S3 储存桶载入到具有 10 个资料节点的 OpenSearch 服务集群中。数据在集群中驻留 1 个月，用于唯读分析。 1 个月后，该公司从集群中删除包含资料的索引。出于合规性目的，公司必须保留所有输入资料的副本。该公司担心持续的成本，并要求解决方案架构师推荐新的解决方案。哪一种解决方案能够最具成本效益地满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：少量热节点加UltraWarm并归档输入最匹配读后保留。"
    ],
    "solutions": "正确答案为 B。索引只读一个月可移到廉价UltraWarm，保留最少必要热节点接收写入；原始输入独立转Deep Archive满足长期合规保存。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "UltraWarm仍需热节点写入及迁移，不能全替换。",
      "B": "少量热节点加UltraWarm并归档输入最匹配读后保留。",
      "C": "删除原始输入违反保留所有input data要求；cold不是简单新增节点类型。",
      "D": "继续以instance-backed热存储承接只读索引成本更高。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/opensearch-service/latest/developerguide/ultrawarm.html",
        "title": "UltraWarm storage for Amazon OpenSearch Service",
        "supports": "UltraWarm适于不可变只读索引，成本低于热存储。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "44": {
    "blocker": "一家公司有 10 个帐户，这些帐户属于 AWS Organizations ​​中的组织。 AWS 配置在每个帐户中配置。所有帐号皆属于 Prod OU 或 NonProd OU。公司在每个AWS帐户中设定了AmazonEventBridge规则，当以0.0.0.0/0为源创建Amazon EC2安全组入站规则时，通知AmazonT简单通知服务（⟧T07221722。公司安全团队订阅了SNS主题。对于 NonProd OU 中的所有帐户，安全团队需要删除建立包含 0.0.0.0/0 作为来源的安全群组入站规则的功能。哪种解决方案能够以最少的营运开销满足这项要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：可事后自动撤销开放规则，仍有短暂暴露窗口。"
    ],
    "solutions": "参考选择为 A。aws:SourceIp表示发起AuthorizeSecurityGroupIngress API的调用者IP，不是待创建规则里的CIDR；C/D均用错条件。A能利用现有事件自动删除开放规则，是选项中可执行的补救，但不能严格阻止创建。",
    "result_flow": "没有严格满足remove ability to create的选项。应标记歧义/坏题：A是自动修复建议，真正预防需受控网络变更流程或支持规则参数的专用管控机制。",
    "options": {
      "A": "可事后自动撤销开放规则，仍有短暂暴露窗口。",
      "B": "Config规则检测合规，不会自动阻止创建且该规则仍可能允许授权端口公网开放。",
      "C": "SourceIp不是规则CIDR，Allow也不会变成精确预防。",
      "D": "若用IpAddress 0.0.0.0/0会拒绝所有公网调用者，不是在筛选开放规则。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_condition-keys.html#condition-keys-sourceip",
        "title": "AWS global condition keys: aws:SourceIp",
        "supports": "SourceIp比较请求者IP，只在特定请求上下文可用。"
      }
    ],
    "audit_caveat": "没有严格满足remove ability to create的选项。应标记歧义/坏题：A是自动修复建议，真正预防需受控网络变更流程或支持规则参数的专用管控机制。",
    "audit_status": "ambiguous"
  },
  "45": {
    "blocker": "一家公司在 on-premises 资料中心托管 Git 储存库。该公司使用 Webhook 来呼叫在 AWS 云端中运行的功能。该公司将 Webhook 逻辑托管在 Auto Scaling 群组中的一组 Amazon EC2 实例上，该公司将该群组设定为 Application Load Balancer (ALB) 的目标。 Git 伺服器为已设定的 Webhook 呼叫 ALB。该公司希望将解决方案迁移到无伺服器架构。哪种解决方案能够以最少的营运开销满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：官方明确支持以function URL作为webhook endpoint。"
    ],
    "solutions": "正确答案为 A。Lambda function URL直接提供稳定HTTPS webhook地址，Git服务按各URL调用对应函数，省掉API Gateway配置，是所给条件下最少运维的serverless接入。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "官方明确支持以function URL作为webhook endpoint。",
      "B": "功能可行，但没有要求统一路由、额外鉴权或API管理，新增API层非必要。",
      "C": "App Runner不能按题述作为ALB普通目标，且部署较重。",
      "D": "REST API不能直接以Fargate为通用目标，通常需VPC Link/ALB；组件多。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/lambda/latest/dg/urls-configuration.html",
        "title": "Creating and managing Lambda function URLs",
        "supports": "官方将function URL描述为专用HTTP(S)端点，并提供webhook教程。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "corrected"
  },
  "46": {
    "blocker": "某公司计划将 1,000 台 on-premises 伺服器迁移到 AWS。伺服器运行在公司资料中心的多个VMware集群上。作为迁移计划的一部分，该公司希望收集伺服器指标，例如 CPU 详细资讯、RAM 使用情况、作业系统资讯和正在运行的进程。然后该公司想要查询和分析资料。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：Agent数据、S3探索和Athena查询匹配。"
    ],
    "solutions": "正确答案为 D。需要运行进程与网络依赖等细节，应逐服务器安装Discovery Agent；Data Exploration把数据送到S3，Athena以SQL分析。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "agentless虚拟机统计不包含所需完整进程数据，S3 Select也不是该探索流程。",
      "B": "仅性能导出缺少OS与进程等信息。",
      "C": "put-resource-attributes不是写入任意详细性能数据的分析仓库。",
      "D": "Agent数据、S3探索和Athena查询匹配。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/application-discovery/latest/userguide/discovery-agent.html",
        "title": "AWS Application Discovery Agent",
        "supports": "Agent采集系统配置、性能、进程与网络连接。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "47": {
    "blocker": "一家公司正在建立一个无伺服器应用程序，该应用程式在附加到 VPC 的 AWS Lambda 函数上运行。该公司需要将该应用程式与外部提供者的新服务整合。外部提供者仅支援来自允许清单中的公共 IPv4 位址的请求。在应用程式可以开始使用新服务之前，公司必须向外部提供者提供单一公用 IP 位址。哪种解决方案将使应用程式能够存取新服务？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：NAT加EIP提供稳定IPv4出口。"
    ],
    "solutions": "正确答案为 A。VPC Lambda通过私有子网路由到public NAT gateway，NAT关联唯一EIP，对外请求即以该地址出现。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "NAT加EIP提供稳定IPv4出口。",
      "B": "egress-only IGW用于IPv6，不能关联EIP。",
      "C": "IGW不分配EIP给Lambda，Lambda ENI也不会自动获得公网地址。",
      "D": "把Lambda放公有子网并加IGW不提供公网IPv4。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/lambda/latest/dg/configuration-vpc-internet.html",
        "title": "Enable internet access for VPC-connected Lambda functions",
        "supports": "私有子网Lambda需经NAT及IGW访问互联网。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "48": {
    "blocker": "解决方案架构师开发了一个使用 Amazon API Gateway Regional 端点和 AWS Lambda 函数的 Web 应用程式。 Web 应用程式的使用者都靠近将部署应用程式的AWS Region。 Lambda 函数仅查询 Amazon Aurora MySQL 资料库。解决方案架构师已将资料库配置为具有三个唯读副本。在测试过程中，应用程式不符合效能要求。在高负载下，应用程式开启大量资料库连线。解决方案架构师必须提高应用程式的效能。解决方案架构师应该采取哪些行动来满足这些要求？ （选两个。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：代理连接池及只读端点减轻连接压力。",
      "D：handler外复用连接减少反复建连。"
    ],
    "solutions": "正确答案为 B、D。RDS Proxy复用数据库连接并通过read-only proxy endpoint利用Aurora replicas；将连接初始化放handler外，让暖Lambda执行环境复用连接。",
    "result_flow": "正确配置是RDS Proxy注册Aurora集群并新建read-only proxy endpoint；不是把普通Aurora reader DNS直接登记成任意代理目标。",
    "options": {
      "A": "cluster endpoint指向writer，未利用只读副本。",
      "B": "代理连接池及只读端点减轻连接压力。",
      "C": "预置并发主要减少冷启动，不解决数据库连接数。",
      "D": "handler外复用连接减少反复建连。",
      "E": "客户就在同区域，边缘优化不解决数据库瓶颈。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/rds-proxy-endpoints.html",
        "title": "Working with Amazon RDS Proxy endpoints",
        "supports": "Aurora proxy的read-only endpoint把查询分配到reader，支持连接管理。"
      }
    ],
    "audit_caveat": "正确配置是RDS Proxy注册Aurora集群并新建read-only proxy endpoint；不是把普通Aurora reader DNS直接登记成任意代理目标。",
    "audit_status": "confirmed"
  },
  "49": {
    "blocker": "一家公司计划在 AWS 上托管一个 Web 应用程序，并希望在一组 Amazon EC2 实例之间实现流量负载平衡。安全性要求之一是在客户端和 Web 伺服器之间的传输中启用端对端加密。哪种解决方案可以满足这个要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：ALB终止客户端TLS，再与HTTPS实例建立新TLS连接。"
    ],
    "solutions": "参考选择为 C。C始终能实现两段TLS：ACM证书放ALB，实例使用自己的服务器证书，HTTPS target group继续加密。原A在ACM新增可导出公有证书后也已可行。",
    "result_flow": "这是历史答案C，不是当前唯一技术可行答案。A取决于可导出选项；D导入证书后亦能端到端分段加密。题干若要求TLS绝不在负载均衡终止，需NLB TCP透传而非上述选项。",
    "options": {
      "A": "若申请时选择可导出ACM证书，现可导出私钥并装在EC2，不能再一概判错。",
      "B": "CloudFront不能以ALB target group直接作为origin。",
      "C": "ALB终止客户端TLS，再与HTTPS实例建立新TLS连接。",
      "D": "第三方证书须先导入ACM/IAM再关联NLB TLS listener；若直接写install on NLB过于简略，架构亦可行。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/acm/latest/userguide/acm-exportable-certificates.html",
        "title": "AWS Certificate Manager exportable public certificates",
        "supports": "ACM现支持申请可导出公有证书并部署到EC2。"
      }
    ],
    "audit_caveat": "这是历史答案C，不是当前唯一技术可行答案。A取决于可导出选项；D导入证书后亦能端到端分段加密。题干若要求TLS绝不在负载均衡终止，需NLB TCP透传而非上述选项。",
    "audit_status": "ambiguous"
  },
  "50": {
    "blocker": "一家公司希望将其资料分析环境从本地迁移到AWS。该环境由两个简单的 Node.js 应用程式组成。其中一个应用程式收集感测器资料并将其载入到MySQL资料库中。另一个应用程式将资料聚合到报告中。聚合作业执行时，部分载入作业无法正常运作。公司必须解决资料载入问题。该公司还需要在不中断或不改变公司客户的情况下进行迁移。解决方案架构师应该怎么做才能满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：迁移、读写隔离、托管采集与连接池均正确。"
    ],
    "solutions": "正确答案为 C。DMS持续复制降低迁移中断；报表在Aurora Replica读取，写入走writer，消除聚合与采集争抢；ALB调用Lambda并由RDS Proxy管理连接。",
    "result_flow": "切换仍需控制写入及验证复制延迟，以免旧新端同时写造成数据差异；不能保证字面零中断。",
    "options": {
      "A": "NLB不能直接以Lambda为目标。",
      "B": "报表仍与写负载共享writer，没有解决原始争抢。",
      "C": "迁移、读写隔离、托管采集与连接池均正确。",
      "D": "Firehose不能按所述直接把Kinesis流写入Aurora，且改变客户接口。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Task.CDC.html",
        "title": "Creating tasks for ongoing replication using AWS DMS",
        "supports": "DMS CDC复制源数据库持续变更，支持在线迁移。"
      }
    ],
    "audit_caveat": "切换仍需控制写入及验证复制延迟，以免旧新端同时写造成数据差异；不能保证字面零中断。",
    "audit_status": "confirmed"
  },
  "51": {
    "blocker": "一家健康保险公司将个人识别资讯 (PII) 储存在 Amazon S3 储存桶中。该公司使用具有 S3 托管加密金钥 (SSE-S3) 的伺服器端加密来加密物件。根据新要求，S3储存桶中目前和未来的所有物件都必须使用公司安全团队管理的金钥进行加密。 S3 储存桶未启用版本控制。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：SSE-KMS指定客户管理密钥并重写旧对象是正确路径。"
    ],
    "solutions": "正确答案为 B。把默认加密改为SSE-KMS并指定安全团队管理的customer managed KMS key，再复制/重上传现有对象以改写加密。仅改默认不会追溯加密已有对象。",
    "result_flow": "B的AWS KMS managed keys必须解释为KMS机制下的客户管理密钥，而非AWS managed aws/s3；桶策略还应校验指定key ID，单纯deny unencrypted不保证用指定密钥。",
    "options": {
      "A": "SSE-S3使用S3托管密钥，不支持customer managed key。",
      "B": "SSE-KMS指定客户管理密钥并重写旧对象是正确路径。",
      "C": "GET不会自动重加密旧对象，桶策略不能变成加密动作。",
      "D": "AES256默认指SSE-S3，不提供所述客户管理密钥模式。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/specifying-kms-encryption.html",
        "title": "Specifying server-side encryption with AWS KMS",
        "supports": "改默认加密不影响旧对象，可用Batch Operations Copy批量重写。"
      }
    ],
    "audit_caveat": "B的AWS KMS managed keys必须解释为KMS机制下的客户管理密钥，而非AWS managed aws/s3；桶策略还应校验指定key ID，单纯deny unencrypted不保证用指定密钥。",
    "audit_status": "confirmed"
  },
  "52": {
    "blocker": "一家公司正在 AWS 云端中运行 Web 应用程式。该应用程式由在一组 Amazon EC2 实例上建立的动态内容组成。 EC2 实例在配置为 Application Load Balancer (ALB) 目标组的 Auto Scaling 组中运行。该公司正在使用 Amazon CloudFront 发行版在全球范围内分发该应用程式。 CloudFront 发行版使用 ALB 作为原点。该公司使用 Amazon Route 53 代表 DNS，并为 CloudFront 分发创建了 www.example.com 的 A 记录。解决方案架构师必须配置应用程序，使其具有高可用性和容错能力。哪种解决方案满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：两个区域origin配CloudFront origin failover为原生方案。"
    ],
    "solutions": "正确答案为 B。保留全球CloudFront入口，第二区域部署独立ALB和ASG，并以origin group主备源自动取代失败区域。",
    "result_flow": "原生origin failover仅支持GET/HEAD/OPTIONS；题面dynamic content如含POST写入，还需额外跨区故障转移设计。",
    "options": {
      "A": "两个CloudFront distribution不能同时关联相同自定义域名，DNS主备并非这样直接配置。",
      "B": "两个区域origin配CloudFront origin failover为原生方案。",
      "C": "ALB不能把另一区域ASG直接当跨区target group，且无failover routing算法。",
      "D": "Global Accelerator不以CloudFront distribution为endpoint。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/high_availability_origin_failover.html",
        "title": "CloudFront origin failover",
        "supports": "CloudFront origin group支持主备源自动切换。"
      }
    ],
    "audit_caveat": "原生origin failover仅支持GET/HEAD/OPTIONS；题面dynamic content如含POST写入，还需额外跨区故障转移设计。",
    "audit_status": "confirmed"
  },
  "53": {
    "blocker": "某公司在AWS Organizations有一个组织，拥有大量AWS帐户。其中一个 AWS 帐户被指定为中转帐户，并具有与所有其他 AWS 帐户共享的中转网关。在公司的所有全球办事处和中转帐户之间配置AWS Site-to-Site VPN 连接。该公司在其所有帐户上启用了 AWS Config。本公司的网路团队需要集中管理属于全球办事处的内部 IP 位址范围清单。开发人员将参考此清单来安全地存取其应用程式。哪种解决方案能够以最少的营运开销满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：RAM共享prefix list适合跨账户统一CIDR。"
    ],
    "solutions": "正确答案为 C。把企业网段集中定义成customer-managed prefix list，通过RAM共享，所有引用该列表的安全组自动跟随更新，避免每账户复制自动化。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "S3+SNS+Lambda重复实现列表同步。",
      "B": "Config检测/修复需要额外规则，不是原生共享列表。",
      "C": "RAM共享prefix list适合跨账户统一CIDR。",
      "D": "安全组引用代表其他ENI身份，不递归继承对方规则中的CIDR。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/vpc/latest/userguide/managed-prefix-lists.html",
        "title": "Managed prefix lists",
        "supports": "prefix list集中管理CIDR，可被安全组引用并通过RAM共享。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "54": {
    "blocker": "一家公司在 Amazon S3 中运行一个新应用程式作为静态网站。该公司已将该应用程式部署到生产 AWS 帐户，并使用 Amazon CloudFront 交付网站。该网站呼叫 Amazon API Gateway REST API。 AWS Lambda 函数支援每个 API 方法。该公司希望每两周建立一个 CSV 报告，以显示每个 API Lambda 函数的建议配置记忆体、建议成本以及当前配置与建议之间的价格差异。公司将把报告存放在S3桶中。哪种解决方案能够以最短的开发时间满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：ExportLambdaFunctionRecommendations原生导出到S3 CSV。"
    ],
    "solutions": "正确答案为 B。Compute Optimizer已有Lambda内存和成本建议，并提供原生CSV导出API；定时Lambda调用即可，无需自己从日志推导推荐值。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "日志指标本身没有完整成本建议，需要自建模型。",
      "B": "ExportLambdaFunctionRecommendations原生导出到S3 CSV。",
      "C": "增强基础设施指标并非Lambda推荐的必需功能，控制台无题述双周自动导出任务。",
      "D": "Trusted Advisor不提供所述计划导出替代接口，Business Support非必需。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/compute-optimizer/latest/APIReference/API_ExportLambdaFunctionRecommendations.html",
        "title": "ExportLambdaFunctionRecommendations",
        "supports": "API将Lambda优化建议输出CSV与元数据到指定S3桶。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "55": {
    "blocker": "该公司的工厂和自动化应用程式在单一VPC中运作。超过 20 个应用程式在 Amazon EC2、Amazon Elastic Container Service (Amazon ECS) 和 Amazon RDS 的组合上运行。该公司的软体工程师分布在三个团队。三个团队之一拥有每个应用程序，并且每次都对其所有应用程式的成本和效能负责。团队资源具有代表其应用程式和团队的标签。团队使用 IAM 存取权限进行日常活动。公司需要确定每月AWS帐单上的哪些成本可归因于每个应用程式或团队。公司还必须能够创建报告来比较过去 12 个月的成本并帮助预测未来 12 个月的成本。解决方案架构师必须推荐提供这些成本报告的AWS 计费和成本管理解决方案。哪一种行动组合可以满足这些要求？ （选择三项。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：激活既有user-defined标签使费用可按应用/团队归集。",
      "D：团队日常使用IAM，需启用IAM billing access并授予适当权限。",
      "F：Cost Explorer支持按标签成本报告及预测。"
    ],
    "solutions": "正确答案为 A、D、F。团队已经给资源加应用/团队自定义标签，应激活成本分配标签、启用IAM对账单控制台访问，并开启Cost Explorer做历史分析与预测。成本类别不是按现有标签分析的必要步骤。",
    "result_flow": "Cost Explorer开启前历史标签数据不一定可追溯；现支持成本分配标签回填但需管理端配置。",
    "options": {
      "A": "激活既有user-defined标签使费用可按应用/团队归集。",
      "B": "application和team为用户自定义标签，不是AWS自动标签。",
      "C": "Cost Category可辅助归类，但无需为每个应用建一类即可按标签分析。",
      "D": "团队日常使用IAM，需启用IAM billing access并授予适当权限。",
      "E": "Budget用于阈值/预测告警，不代替历史比较报表。",
      "F": "Cost Explorer支持按标签成本报告及预测。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/control-access-billing.html",
        "title": "Overview of managing access permissions",
        "supports": "IAM用户/角色默认不可访问账单控制台，需root激活IAM Access并授权限。"
      }
    ],
    "audit_caveat": "Cost Explorer开启前历史标签数据不一定可追溯；现支持成本分配标签回填但需管理端配置。",
    "audit_status": "corrected"
  },
  "56": {
    "blocker": "AWS 客户有一个在本地运行的 Web 应用程式。 Web 应用程式从防火墙后面的第三方 API 取得资料。第三方仅接受每个客户端允许清单中的一个公共CIDR块。客户希望将其 Web 应用程式迁移到 AWS 云端。该应用程式将托管在 VPC 中 Application Load Balancer (ALB) 后面的一组 Amazon EC2 实例上。 ALB 位于公共子网路中。 EC2 实例位于私有子网路中。 NAT 闸道提供对私有子网路的网际网路存取。解决方案架构师应该如何确保Web应用程式在迁移后可以继续呼叫第三方API？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：NAT出口使用同一自有地址段的EIP，符合单CIDR限制。"
    ],
    "solutions": "正确答案为 B。把自有公有CIDR通过BYOIP带到EC2地址池，从同一网段分配多个EIP给各AZ NAT gateway，第三方只需放行该CIDR。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "仅关联VPC/启用公有子网地址不能控制私网应用的NAT出口。",
      "B": "NAT出口使用同一自有地址段的EIP，符合单CIDR限制。",
      "C": "ALB不支持按此固定EIP，且入站ALB地址不是应用出站地址。",
      "D": "Global Accelerator是入站加速，不替代私有实例的NAT出站。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-byoip.html",
        "title": "Bring your own IP addresses to Amazon EC2",
        "supports": "自有地址段导入后形成地址池，可分配EIP。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "57": {
    "blocker": "一家拥有多个 AWS 帐户的公司正在使用 AWS Organizations 和服务控制策略 (SCP)。管理员建立了以下 SCP，并将其附加到包含 AWS 帐户 1111-1111-1111 的组织单位 (OU)：\n\n{\n  \"Version\": \"2012-10-17\",\n  \"Statement\": [\n    {\n      \"Sid\": \"AllowsAllActions\",\n      \"Effect\": \"Allow\",\n      \"Action\": \"*\",\n      \"Resource\": \"*\"\n    },\n    {\n      \"Sid\": \"DenyCloudTrail\",\n      \"Effect\": \"Deny\",\n      \"Action\": \"cloudtrail:*\",\n      \"Resource\": \"*\"\n    }\n  ]\n}\n\n在帐户 1111-1111-1111 中工作的开发人员抱怨他们无法建立 Amazon S3 储存贮体。管理员该如何解决这个问题？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：检查并授予开发者所需S3权限才针对根因。"
    ],
    "solutions": "正确答案为 C。给定SCP允许所有动作，仅显式拒绝CloudTrail，因此不会禁止CreateBucket。SCP不授予身份权限，开发者仍需IAM policy中的S3 Allow。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "已存在Allow星号，重复增加无效。",
      "B": "换附着层不补足IAM权限。",
      "C": "检查并授予开发者所需S3权限才针对根因。",
      "D": "删除CloudTrail护栏不必要。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps_evaluation.html",
        "title": "SCP evaluation",
        "supports": "SCP是权限上限，不自行授予IAM动作。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "58": {
    "blocker": "一家公司拥有对其业务至关重要的整体应用程式。该公司在运行 Amazon Linux 2 的 Amazon EC2 实例上托管该应用程式。该公司的应用程式团队收到法律部门的指示，将实例的加密 Amazon 弹性块储存 (Amazon EBS) 卷中的资料备份到 Amazon S3 储存桶。应用程式团队没有实例的管理 SSH 金钥对。应用程式必须继续为用户服务。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：通过SSM安全shell读取已挂载解密卷并写S3。"
    ],
    "solutions": "正确答案为 A。Session Manager无需SSH密钥即可在运行实例执行命令；附加S3写权限并复制所需数据，无需重启关键应用。",
    "result_flow": "需SSM Agent、SSM连接与管理权限；应用一致性备份还需协调写入或数据库备份机制。",
    "options": {
      "A": "通过SSM安全shell读取已挂载解密卷并写S3。",
      "B": "reboot会中断当前生产。",
      "C": "EBS snapshot由AWS存储但不作为自有S3对象直接导出。",
      "D": "创建AMI默认可能重启，且额外启动实例不如原位SSM。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager.html",
        "title": "AWS Systems Manager Session Manager",
        "supports": "可不开放入站端口且不管理SSH key地访问EC2。"
      }
    ],
    "audit_caveat": "需SSM Agent、SSM连接与管理权限；应用一致性备份还需协调写入或数据库备份机制。",
    "audit_status": "confirmed"
  },
  "59": {
    "blocker": "解决方案架构师需要将数据从 AWS 账户中的 Amazon S3 存储桶复制到新 AWS 账户中的新 S3 存储桶。解决方案架构师必须实作使用AWS CLI 的解决方案。哪种步骤组合可以成功复制资料？ （选择三项。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：源桶允许目标用户读/列。",
      "D：目标用户IAM拥有源读和本地目标写。",
      "F：以目标账户授权用户运行sync与策略匹配。"
    ],
    "solutions": "正确答案为 B、D、F。用目标账户用户执行sync：源桶资源策略允许该外部用户读取，目标账户身份策略同时允许源读和目标写。",
    "result_flow": "新桶通常Bucket owner enforced禁用ACL，sync不必设置对象ACL；SSE-KMS对象另需源KMS解密授权。",
    "options": {
      "A": "桶不是可调用API的IAM Principal，不能授权source bucket用户。",
      "B": "源桶允许目标用户读/列。",
      "C": "源用户身份方案缺少正确目标桶跨账户资源授权。",
      "D": "目标用户IAM拥有源读和本地目标写。",
      "E": "与B/D授权主体不一致。",
      "F": "以目标账户授权用户运行sync与策略匹配。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/res/latest/ug/S3-buckets-cross-account-access.html",
        "title": "Cross account bucket access",
        "supports": "跨账户访问需要源资源授权与调用方身份授权。"
      }
    ],
    "audit_caveat": "新桶通常Bucket owner enforced禁用ACL，sync不必设置对象ACL；SSE-KMS对象另需源KMS解密授权。",
    "audit_status": "confirmed"
  },
  "60": {
    "blocker": "一家公司基于 AWS Lambda 建立了一个应用程序，部署在 AWS CloudFormation 堆叠中。 Web 应用程式的最后一个生产版本引入了一个问题，导致持续几分钟的中断。解决方案架构师必须调整部署流程以支援金丝雀版本。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：alias加权路由正确；客户端需始终调用该alias。"
    ],
    "solutions": "正确答案为 A。发布新版本后，用同一加权alias指向旧新两个版本，通过update-alias的RoutingConfig把少量流量送新版本，实现金丝雀并可快速回退。",
    "result_flow": "A说每版本创建alias不如更新稳定部署alias准确；真正承载流量的同一alias必须包含两版本权重。",
    "options": {
      "A": "alias加权路由正确；客户端需始终调用该alias。",
      "B": "需要额外完整入口与栈，原题无需如此复杂。",
      "C": "routing-config参数属于update-alias而非update-function-configuration。",
      "D": "CodeDeployDefault.OneAtATime用于EC2/on-prem，不是Lambda金丝雀配置。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/lambda/latest/dg/configuring-alias-routing.html",
        "title": "Implement Lambda canary deployments using a weighted alias",
        "supports": "一个alias可在两个已发布版本之间按权重路由。"
      }
    ],
    "audit_caveat": "A说每版本创建alias不如更新稳定部署alias准确；真正承载流量的同一alias必须包含两版本权重。",
    "audit_status": "confirmed"
  },
  "61": {
    "blocker": "一家金融公司在 Amazon S3 托管一个资料湖。该公司每晚从多个第三方接收超过SFTP的财务数据记录。该公司在 VPC 公共子网路中的 Amazon EC2 实例上运行自己的 SFTP 伺服器。文件上传后，透过在相同实例上执行的 cron 作业将它们移至资料湖。可透过使用 Amazon Route 53 在 DNS sftp.example.com 上存取 SFTP 伺服器。解决方案架构师应该如何提高SFTP解决方案的可靠性和可扩展性？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：托管SFTP兼容现有客户端且可直接落S3。"
    ],
    "solutions": "正确答案为 B。Transfer Family托管SFTP入口直接写S3数据湖，保留域名，去除单EC2与cron搬运的单点和扩容负担。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "ALB不代理SFTP/SSH协议。",
      "B": "托管SFTP兼容现有客户端且可直接落S3。",
      "C": "File Gateway提供SMB/NFS，不提供SFTP服务。",
      "D": "NLB只分发连接，单EC2和本地文件工作流仍为单点。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/transfer/latest/userguide/what-is-aws-transfer-family.html",
        "title": "What is AWS Transfer Family",
        "supports": "Transfer Family托管SFTP并直接访问S3或EFS。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "62": {
    "blocker": "一家公司希望将应用程式从在 on-premises 资料中心运行的 VMware 基础设施迁移到 Amazon EC2。解决方案架构师必须在迁移期间保留软体和组态设定。解决方案架构师应该怎么做才能满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：方案方向正确；OVF导出内容须打包为OVA或使用其VMDK磁盘。"
    ],
    "solutions": "正确答案为 B。VM Import/Export保留既有虚拟机OS、应用及配置，导出镜像上传S3后通过vmimport角色执行import-image。",
    "result_flow": "B的OVF不能当单一原生支持镜像直接import；AWS支持OVA/VMDK/VHD/VHDX/RAW，需补打包步骤。",
    "options": {
      "A": "DataSync复制文件不必先把VMware datastore迁入FSx。",
      "B": "方案方向正确；OVF导出内容须打包为OVA或使用其VMDK磁盘。",
      "C": "普通备份目录不能直接从控制台变成AMI。",
      "D": "SSM managed instance注册不等于把VM转成AWS Backup AMI。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/vm-import/latest/userguide/export-vm-image.html",
        "title": "Export your VM from its virtualization environment",
        "supports": "可从OVF导出包取得磁盘并打包OVA，再使用支持的镜像格式导入。"
      }
    ],
    "audit_caveat": "B的OVF不能当单一原生支持镜像直接import；AWS支持OVA/VMDK/VHD/VHDX/RAW，需补打包步骤。",
    "audit_status": "confirmed"
  },
  "63": {
    "blocker": "视频处理公司有一个应用程序，它从 Amazon S3 存储桶下载图像，处理图像，将转换后的图像存储在第二个 S3 存储桶中，并更新 Amazon DynamoDB 表中有关图像的元数据。该应用程式使用 Node.js 编写，并使用 AWS Lambda 函数运行。当新图像上传到Amazon S3时，将呼叫Lambda函数。该应用程式运行了一段时间没有发生任何事件。然而，影像的大小已显著增加。 Lambda 函数现在经常因逾时错误而失败。函数超时设定为其最大值。解决方案架构师需要重构应用程式的架构以防止呼叫失败。该公司不想管理底层基础设施。解决方案架构师应该采取哪些步骤组合来满足这些要求？ （选两个。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：把Node.js及依赖封成镜像。",
      "B：Fargate无需管理EC2节点且不受普通Lambda15分钟限制。"
    ],
    "solutions": "正确答案为 A、B。单次图像任务超过标准Lambda时限，应将代码封装ECR镜像并运行Fargate task；Lambda只做短时调度，不执行长任务。",
    "result_flow": "较新的Lambda Managed Instances存在特定异步90分钟模式；原题未使用该模式，不能混同标准Lambda限制。",
    "options": {
      "A": "把Node.js及依赖封成镜像。",
      "B": "Fargate无需管理EC2节点且不受普通Lambda15分钟限制。",
      "C": "增加并发不延长单次运行时限；Parallel也不会自动切分函数。",
      "D": "EC2 launch type需维护底层实例。",
      "E": "改存储与数据库不消除函数超时限制。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/lambda/latest/dg/configuration-timeout.html",
        "title": "Configure Lambda function timeout",
        "supports": "标准Lambda最大900秒，题述已达最大仍超时，应换长任务执行环境。"
      }
    ],
    "audit_caveat": "较新的Lambda Managed Instances存在特定异步90分钟模式；原题未使用该模式，不能混同标准Lambda限制。",
    "audit_status": "confirmed"
  },
  "64": {
    "blocker": "某公司在AWS Organizations设有组织。该公司正在使用 AWS Control Tower 为组织部署著陆区。该公司希望实施治理和政策执行。公司必须实施一项策略来侦测公司生产 OU 中未静态加密的 Amazon RDS 资料库实例。哪种解决方案可以满足这个要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：选择现成强烈推荐侦测控制最合适。"
    ],
    "solutions": "正确答案为 B。检测RDS未启用存储加密属于Control Tower strongly recommended detective control，按Production OU启用即可。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "该项不是默认mandatory控制。",
      "B": "选择现成强烈推荐侦测控制最合适。",
      "C": "用户不能把自建Config规则变成Control Tower mandatory分类。",
      "D": "SCP用于预防动作，不扫描现有RDS加密状态。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/controltower/latest/controlreference/strongly-recommended-detective-controls.html",
        "title": "Strongly recommended controls with detective behavior",
        "supports": "官方列出Detect Whether Storage Encryption is Enabled for Amazon RDS Database Instances。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "65": {
    "blocker": "一家新创公司使用最新的 Amazon Linux 2 AMI 在私有子网路中托管一组 Amazon EC2 执行个体。该公司的工程师严重依赖 SSH 存取实例来进行故障排除。该公司的现有架构包括以下内容： • 具有私人和公共子网路的VPC，以及NAT 闸道。 • Site-to-Site VPN 用于与on-premises 环境连接。 • EC2 安全群组可从on-premises 环境直接进行SSH 存取。该公司需要加强对 SSH 存取的安全控制，并对工程师运行的命令进行审核。解决方案架构师应该使用哪一种策略？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：SSM角色和start-session去除SSH key/入站端口并支持集中日志。"
    ],
    "solutions": "正确答案为 D。改用Session Manager直接会话，移除22端口并以IAM管控接入；配置会话日志到CloudWatch/S3记录命令与输出。",
    "result_flow": "D还需明确启用session logging与日志写入权限；仅CloudTrail StartSession事件不等于命令审计。SSH隧道/端口转发会话不支持完整内容日志。",
    "options": {
      "A": "Instance Connect最终仍需SSH网络访问，关22后不能按此连通。",
      "B": "仍保留SSH入站与主机审计配置维护。",
      "C": "Config/Firewall Manager记录规则变化，不记录工程师命令。",
      "D": "SSM角色和start-session去除SSH key/入站端口并支持集中日志。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager-logging.html",
        "title": "Enabling and disabling session logging",
        "supports": "Session Manager可记录会话命令和输出，取决于日志偏好设置。"
      }
    ],
    "audit_caveat": "D还需明确启用session logging与日志写入权限；仅CloudTrail StartSession事件不等于命令审计。SSH隧道/端口转发会话不支持完整内容日志。",
    "audit_status": "confirmed"
  },
  "66": {
    "blocker": "使用AWS Organizations的公司允许开发者在AWS上进行实验。作为公司部署的登陆区的一部分，开发人员使用他们的公司电子邮件地址来要求帐户。该公司希望确保开发人员不会推出昂贵的服务或运行不必要的服务。公司必须为开发商提供固定的每月预算，以限制他们的AWS成本。哪一种步骤组合可以满足这些要求？ （选择三项。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：Budget提供账户月度成本阈值。",
      "C：SCP可阻止开发账户使用特定昂贵服务。",
      "F：SNS加自定义Lambda可执行所需资源清理，须逐服务实现。"
    ],
    "solutions": "正确答案为 B、C、F。每账户Budget定义成本目标，SCP拒绝已知昂贵服务；预算SNS通知触发自定义Lambda清理允许的实验资源，可减少持续费用。",
    "result_flow": "预算数据延迟、资源计费及清理限制意味着这不是严格月度硬上限；F所称terminate all services不能无条件保证，需明确许可资源和清理范围。",
    "options": {
      "A": "SCP没有按当月费用计算的内置条件。",
      "B": "Budget提供账户月度成本阈值。",
      "C": "SCP可阻止开发账户使用特定昂贵服务。",
      "D": "IAM policy不能直接附在账户且可能被其他授权绕开。",
      "E": "Budget原生动作不能终止所有AWS服务。",
      "F": "SNS加自定义Lambda可执行所需资源清理，须逐服务实现。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-controls.html",
        "title": "Configuring budget actions",
        "supports": "Budget动作可应用IAM/SCP及针对特定EC2/RDS资源，不是全服务终止器。"
      }
    ],
    "audit_caveat": "预算数据延迟、资源计费及清理限制意味着这不是严格月度硬上限；F所称terminate all services不能无条件保证，需明确许可资源和清理范围。",
    "audit_status": "confirmed"
  },
  "67": {
    "blocker": "一家公司在名为 Source 的 AWS 帐户中拥有应用程式。该帐户位于AWS Organizations的组织中。其中一个应用程式使用 AWS Lambda 函数并将库存资料储存在 Amazon Aurora 资料库中。应用程式使用部署包部署 Lambda 函数。本公司已为Aurora配置了自动备份。该公司希望将 Lambda 函数和 Aurora 资料库迁移到名为 Target 的新 AWS 帐户。该应用程式处理关键数据，因此公司必须最大限度地减少停机时间。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：代码重建加RAM跨账户Aurora clone为正确组合。"
    ],
    "solutions": "正确答案为 B。Lambda部署包下载后在目标账户重新创建；Aurora可通过RAM授予跨账户clone，copy-on-write克隆比完整快照恢复快。",
    "result_flow": "clone是某一时间点独立副本，不持续同步源库写入；真正最小停机迁移还要切换写入并同步最后变更。Lambda配置/IAM/触发器也需迁移。",
    "options": {
      "A": "自动快照不能直接共享，需复制成手动快照；恢复也较慢。",
      "B": "代码重建加RAM跨账户Aurora clone为正确组合。",
      "C": "RAM不能按所述共享Lambda函数部署。",
      "D": "Lambda共享机制错误，自动快照也不能直接共享。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Managing.Clone.Cross-Account.html",
        "title": "Cross-account cloning with AWS RAM and Amazon Aurora",
        "supports": "Aurora通过RAM共享集群克隆权限，比创建恢复快照快。"
      }
    ],
    "audit_caveat": "clone是某一时间点独立副本，不持续同步源库写入；真正最小停机迁移还要切换写入并同步最后变更。Lambda配置/IAM/触发器也需迁移。",
    "audit_status": "confirmed"
  },
  "68": {
    "blocker": "某公司在 Amazon EC2 实例上运行 Python 脚本来处理资料。该脚本每 10 分钟运行一次。该脚本从 Amazon S3 储存桶中提取档案并处理这些档案。平均而言，脚本大约需要 5 分钟来处理每个档案。脚本不会重新处理脚本已经处理过的档案。该公司审查了 Amazon CloudWatch 指标，并注意到 EC2 实例由于文件处理速度的原因大约有 40% 的时间处于空闲状态。该公司希望使工作负载具有高可用性和可扩展性。该公司还希望减少长期管理费用。哪一种解决方案能够最具成本效益地满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：直接事件驱动、按用量计算、无需实例管理。"
    ],
    "solutions": "正确答案为 A。每文件平均五分钟适合Lambda，S3上传事件立即触发并按对象并行处理，消除定时轮询与空置EC2费用。",
    "result_flow": "S3事件至少一次交付，应保留幂等检查防止重复处理；核实最大文件处理时长在函数限制内。",
    "options": {
      "A": "直接事件驱动、按用量计算、无需实例管理。",
      "B": "ASG仍保留至少一台EC2及轮询运维。",
      "C": "单EC2容器没有增加高可用且仍空置。",
      "D": "Fargate可行但五分钟脚本无需额外容器调度组件。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/lambda/latest/dg/with-s3.html",
        "title": "Process Amazon S3 event notifications with Lambda",
        "supports": "S3对象创建事件可异步调用Lambda。"
      }
    ],
    "audit_caveat": "S3事件至少一次交付，应保留幂等检查防止重复处理；核实最大文件处理时长在函数限制内。",
    "audit_status": "confirmed"
  },
  "69": {
    "blocker": "北美的一家金融服务公司计划在 AWS 向其客户发布新的线上 Web 应用程式。该公司将在 us-east-1 Region 的 Amazon EC2 实例上启动该应用程式。应用程式必须具有高可用性，并且必须动态扩展以满足用户流量。该公司还希望透过使用主动-被动故障转移为 us-west-1 Region 中的应用程式实施灾难复原环境。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：区域内伸缩加区域间DNS主备完整。"
    ],
    "solutions": "正确答案为 C。每区域各有跨AZ ALB与ASG保证区域内HA与伸缩，再用Route 53 primary/secondary failover记录和健康检查做跨区域主动被动恢复。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "ALB/ASG不能同时跨两个区域VPC。",
      "B": "未指定failover策略，不能保证主动被动。",
      "C": "区域内伸缩加区域间DNS主备完整。",
      "D": "同样错误地把一个ALB和ASG跨区域。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover-types.html",
        "title": "Active-active and active-passive failover",
        "supports": "主动被动需primary/secondary failover DNS。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "70": {
    "blocker": "一家公司的环境有一个 AWS 帐户。解决方案架构师正在审查环境，以建议公司可以改进的方面，特别是在访问AWS管理控制台方面。该公司的 IT 支援人员目前访问控制台执行管理任务，透过已对应到其工作角色的指定 IAM 使用者进行身份验证。 IT 支援人员不再希望同时维护其 Active Directory 和 IAM 使用者帐户。他们希望能够使用现有的 Active Directory 凭证存取控制台。解决方案架构师使用 AWS IAM 身分中心（AWS 单一登入）来实现此功能。哪一种解决方案能够最具成本效益地满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：all features、AD Connector及原组权限集是最少新增目录组件。"
    ],
    "solutions": "正确答案为 D。Identity Center组织实例需要Organizations all features；已有本地AD只需AD Connector代理认证，避免额外托管AD及双向信任成本，再把组映射permission sets。",
    "result_flow": "需已有VPN/DX等私网连通AD；成本优势取决目录规模，题目假定单既有AD域。",
    "options": {
      "A": "托管AD与信任成本更高，Organizations描述也不精确。",
      "B": "未明确启用组织all features。",
      "C": "技术可行但Managed AD成本高于只做目录代理。",
      "D": "all features、AD Connector及原组权限集是最少新增目录组件。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/singlesignon/latest/userguide/gs-ad.html",
        "title": "Using Active Directory as an identity source",
        "supports": "Identity Center支持AD Connector或Managed Microsoft AD目录。"
      }
    ],
    "audit_caveat": "需已有VPN/DX等私网连通AD；成本优势取决目录规模，题目假定单既有AD域。",
    "audit_status": "confirmed"
  },
  "71": {
    "blocker": "一家视讯串流媒体公司最近推出了一款用于视讯共享的行动应用程式。该应用程式将各种档案上传到 us- east-1 Region 中的Amazon S3 储存桶。这些档案的大小范围为 1 GB 到 10 GB。从澳洲访问该应用程式的用户都经历过上传需要很长时间的情况。有时，这些使用者的档案无法完全上传。解决方案架构师必须提高应用程式的这些上传效能。哪些解决方案可以满足这些要求？ （选两个。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：针对远距离上传到集中S3桶。",
      "D：分片上传提升大文件吞吐与恢复性。"
    ],
    "solutions": "正确答案为 A、D。跨洲大文件上传用Transfer Acceleration进入就近边缘后走AWS网络；multipart并行上传且仅重试失败part，降低10GB整体失败重传成本。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "针对远距离上传到集中S3桶。",
      "B": "多区域入口可设计但增加桶和复制配置，不是此题最直接两步。",
      "C": "S3桶端点不能只靠延迟DNS变成多区域数据上传协议。",
      "D": "分片上传提升大文件吞吐与恢复性。",
      "E": "随机前缀不解决跨洲网络延迟，现代S3也不再要求此类前缀优化。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/transfer-acceleration.html",
        "title": "Configuring fast secure transfers using S3 Transfer Acceleration",
        "supports": "S3 TA用于全球客户端跨长距离上传到集中桶。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "72": {
    "blocker": "应用程式正在将 Amazon RDS 用于 us-east-1 Region 中的 MySQL Multi-AZ 资料库实例。故障转移测试后，应用程式遗失了与资料库的连接，并且无法重新建立连接。重新启动应用程式后，应用程式重新建立连线。解决方案架构师必须实作一个解决方案，以便应用程式可以重新建立与资料库的连接，而无需重新启动。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：现有RDS加代理即可增强故障恢复。"
    ],
    "solutions": "正确答案为 B。RDS Proxy维持应用侧连接并在数据库故障转移后连接新的数据库实例，减少应用受DNS缓存或连接重建影响。",
    "result_flow": "应用仍需正确事务重试；RDS Proxy不会保证故障时所有事务无错。",
    "options": {
      "A": "无需迁移到已淘汰的Aurora Serverless v1，reader endpoint也不支持所有写入。",
      "B": "现有RDS加代理即可增强故障恢复。",
      "C": "多做数据库迁移且仍写existing RDS endpoint为目标，逻辑不完整。",
      "D": "Athena并不是MySQL事务数据库替代。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy.html",
        "title": "Amazon RDS Proxy",
        "supports": "代理自动连接备用DB并尽量保留应用连接，提高故障恢复性。"
      }
    ],
    "audit_caveat": "应用仍需正确事务重试；RDS Proxy不会保证故障时所有事务无错。",
    "audit_status": "confirmed"
  },
  "73": {
    "blocker": "一家公司正在AWS 云端建置解决方案。数千台设备将连接到该解决方案并发送资料。每个设备都需要能够透过 MQTT 协定即时发送和接收资料。每个装置必须使用唯一的 X.509 凭证进行身份验证。哪种解决方案能够以最少的营运开销满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：IoT thing、独立证书、IoT Core MQTT为标准组合。"
    ],
    "solutions": "正确答案为 C。IoT Core原生托管MQTT消息与设备X.509认证，每设备独立证书便于吊销和权限控制，省去自建broker。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "IoT Core消息不需要每设备Amazon MQ队列。",
      "B": "NLB无所述Lambda authorizer功能，自建broker增加运维。",
      "C": "IoT thing、独立证书、IoT Core MQTT为标准组合。",
      "D": "HTTP API不是MQTT隧道，NLB直接入口也不会经过HTTP API证书认证。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/iot/latest/developerguide/x509-client-certs.html",
        "title": "X.509 client certificates",
        "supports": "AWS IoT通过X.509认证连接，推荐每设备独立证书。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "74": {
    "blocker": "一家公司在单一 AWS 帐户中运行多个工作负载。新的公司政策规定，工程师只能提供经过批准的资源，工程师必须使用AWS CloudFormation来提供这些资源。解决方案架构师需要创建一个解决方案来对工程师用于存取的IAM角色实施新的限制。解决方案架构师应该做什么来创建解决方案？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：CloudFormation service role分离调用者与部署权限。"
    ],
    "solutions": "正确答案为 C。工程师只能操作CloudFormation，受限service role才持有创建资源权限，避免工程师绕过栈直接创建资源；角色策略仅授批准资源动作。",
    "result_flow": "还需受限iam:PassRole、限制可传角色，并在资源类型之外需要批准配置时使用模板控制/CloudFormation Hooks。",
    "options": {
      "A": "没有服务角色就缺少底层资源创建权限，模板放S3也不防其他模板。",
      "B": "工程师保有直接建资源权限，不强制CloudFormation。",
      "C": "CloudFormation service role分离调用者与部署权限。",
      "D": "只限制已有stack访问不定义允许资源范围。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-iam-servicerole.html",
        "title": "CloudFormation service role",
        "supports": "CloudFormation可用独立服务角色执行资源API，角色可限制动作。"
      }
    ],
    "audit_caveat": "还需受限iam:PassRole、限制可传角色，并在资源类型之外需要批准配置时使用模板控制/CloudFormation Hooks。",
    "audit_status": "confirmed"
  },
  "75": {
    "blocker": "解决方案架构师正在为一家公司即将推出的新应用程式设计资料储存和检索架构。该应用程式旨在每分钟从世界各地的设备中获取数百万条小记录。每笔记录的大小小于 4 KB，需要储存在持久位置，以便以低延迟进行检索。资料是短暂的，公司只能将资料储存 120 天，之后可以删除资料。解决方案架构师计算出，一年内的储存需求约 10-15 TB。哪种储存策略最具成本效益且满足设计要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：DynamoDB吞吐与低延迟读取适合小记录，TTL减少清理作业。"
    ],
    "solutions": "正确答案为 B。大量小记录要求按键低延迟访问与高写吞吐，DynamoDB按分区键扩展；每条写入到期epoch时间，由TTL免费异步删除。",
    "result_flow": "TTL不是120天到秒硬删除；读操作须过滤已过期未删除条目，严格合规删除需额外机制。",
    "options": {
      "A": "每条一个S3对象产生大量PUT请求且不是键值索引数据库。",
      "B": "DynamoDB吞吐与低延迟读取适合小记录，TTL减少清理作业。",
      "C": "单RDS表承接海量写入与定时清理更难扩展。",
      "D": "对象用户元数据有大小限制，批记录索引/低延迟单条检索不由该描述自动实现。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/TTL.html",
        "title": "Using time to live in DynamoDB",
        "supports": "TTL以Number epoch秒指定过期，通常几天内异步免费删除。"
      }
    ],
    "audit_caveat": "TTL不是120天到秒硬删除；读操作须过滤已过期未删除条目，严格合规删除需额外机制。",
    "audit_status": "confirmed"
  },
  "76": {
    "blocker": "一家零售公司在 AWS 上跨多个 AWS Regions 托管电子商务网站。该公司希望该网站随时运行以进行线上购买。该网站将资料储存在 MySQL 资料库实例的 Amazon RDS 中。哪种解决方案将为资料库提供最高的可用性？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：预先运行跨区域副本比灾难时从备份恢复快。"
    ],
    "solutions": "正确答案为 D。RDS MySQL可通过跨区域只读副本提供区域灾难恢复，主库故障时提升副本、切换连接并补建新副本。",
    "result_flow": "同区域还应使用Multi-AZ自动故障转移。跨区副本异步复制、提升需时间，无法保证永远无中断或零丢失。",
    "options": {
      "A": "自动备份需恢复，不是直接promote已有运行副本。",
      "B": "RDS MySQL没有DynamoDB式global tables。",
      "C": "同样混淆global tables与RDS机制。",
      "D": "预先运行跨区域副本比灾难时从备份恢复快。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.Promote.html",
        "title": "Promoting a read replica to be a standalone DB instance",
        "supports": "官方列出提升副本、转移流量、补建副本的恢复流程。"
      }
    ],
    "audit_caveat": "同区域还应使用Multi-AZ自动故障转移。跨区副本异步复制、提升需时间，无法保证永远无中断或零丢失。",
    "audit_status": "confirmed"
  },
  "77": {
    "blocker": "范例公司在范例公司 AWS 帐户中拥有一个 on-premises 资料中心和一个名为 VPC A 的 VPC。 on-premises 网路透过 AWS 站点到站点 VPN 连接到 VPC A。 on-premises 伺服器可以正常存取VPC A. 范例公司刚刚收购了 AnyCompany，该公司有一个名为 VPC 的 VPC B. 这些网路之间没有 IP 位址重叠。 Example Corp. 已对等 VPC A 和 VPC B。 Example Corp. 希望从其本地伺服器连接到 VPC B。 Example Corp. 已正确设定网路 ACL 和安全群组。哪一种解决方案能够以最少的操作工作量满足此要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：TGW提供需要的转接路由。"
    ],
    "solutions": "正确答案为 A。VPC peering不支持借用另一VPC的VPN进行传递路由，应把本地VPN和两个VPC接到同一TGW，以TGW路由实现集中互通。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "TGW提供需要的转接路由。",
      "B": "额外VPN与客户端授权描述混乱，不能经peering自动转接。",
      "C": "只加路由无法突破peering非传递限制。",
      "D": "VGW不能同时附到两个VPC，不能拆分路由器。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/vpc/latest/peering/vpc-peering-basics.html",
        "title": "How VPC peering connections work",
        "supports": "VPC peering存在非传递与边缘路由限制。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "78": {
    "blocker": "一家公司最近使用平台重构策略完成了从on-premises资料中心到AWS云端的迁移。其中一台迁移的伺服器正在执行关键应用程式所依赖的旧版简单邮件传输协定 (SMTP) 服务。该应用程式向公司的客户发送出站电子邮件。旧版 SMTP 伺服器不支援 TLS 加密并使用 TCP 连接埠 25。应用程式只能使用 SMTP。本公司决定使用 Amazon 简单电子邮件服务 (Amazon SES) 并停用旧版 SMTP 伺服器。该公司已创建并验证了SES域名。该公司已取消SES限制。公司应该如何修改应用程式以从AmazonSES发送电子邮件？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：STARTTLS及SMTP凭据匹配SES接口。"
    ],
    "solutions": "正确答案为 B。SES SMTP要求TLS，可使用STARTTLS升级连接；SMTP客户端必须使用SES专用SMTP用户名/密码，普通EC2角色凭据不能直接当SMTP登录。",
    "result_flow": "若原客户端本身完全不支持任何TLS，必须升级客户端或增加受控TLS relay，不能认为STARTTLS无需客户端TLS能力；优先587避免EC2端口25限制。",
    "options": {
      "A": "SMTP不直接使用附加实例角色来认证。",
      "B": "STARTTLS及SMTP凭据匹配SES接口。",
      "C": "应用只能SMTP，改API违反限制。",
      "D": "同样改变调用协议，且长期API key非必要。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/ses/latest/dg/smtp-connect.html",
        "title": "Connecting to an Amazon SES SMTP endpoint",
        "supports": "SES要求TLS，支持STARTTLS与TLS wrapper，并说明端口。"
      }
    ],
    "audit_caveat": "若原客户端本身完全不支持任何TLS，必须升级客户端或增加受控TLS relay，不能认为STARTTLS无需客户端TLS能力；优先587避免EC2端口25限制。",
    "audit_status": "confirmed"
  },
  "79": {
    "blocker": "一家公司最近收购了其他几家公司。每个公司都有一个单独的AWS帐户，具有不同的计费和报告方法。收购公司已将所有帐户合并为AWS Organizations ​​中的一个组织。然而，收购公司发现很难产生包含对所有团队有意义的群组的成本报告。收购公司的财务团队需要一个解决方案，透过自我管理的应用程式报告所有公司的成本。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：完整覆盖实际费用采集、分组、SQL分析与自助可视化。"
    ],
    "solutions": "正确答案为 A。组织CUR保留细粒度用量，成本标签/类别统一团队归集，Athena查询，QuickSight供财务自助构建与查看报表。",
    "result_flow": "标签与Cost Categories要在计费配置中定义/激活，不能仅在已导出的CUR文件里声明就追溯生成。",
    "options": {
      "A": "完整覆盖实际费用采集、分组、SQL分析与自助可视化。",
      "B": "Cost Explorer能报告费用，但没有所述专用模板驱动自管应用的数据流程。",
      "C": "Price List给服务公开价格，不是账户实际消费。",
      "D": "同样无法由价格表获得账户账单。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/cur/latest/userguide/cur-query-athena.html",
        "title": "Querying Cost and Usage Reports using Amazon Athena",
        "supports": "Athena直接以SQL分析S3中的CUR。"
      }
    ],
    "audit_caveat": "标签与Cost Categories要在计费配置中定义/激活，不能仅在已导出的CUR文件里声明就追溯生成。",
    "audit_status": "confirmed"
  },
  "80": {
    "blocker": "某公司在AWS上运作物联网平台。不同位置的 IoT 感测器将资料传送到在 Application Load Balancer 后面运行的 Amazon EC2 实例上的公司 Node.js API 伺服器。资料储存在使用 4 TB 通用 SSD 磁碟区的 Amazon RDS MySQL 资料库实例中。随著时间的推移，该公司在该领域部署的感测器数量不断增加，并且预计将大幅增长。 API 伺服器持续过载，RDS 指标显示写入延迟较高。下列哪一项步骤将永久解决这些问题，并随著新感测器的配置而成长，同时维持该平台的成本效益？ （选两个。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：流式缓冲与函数并发处理可扩展采集。",
      "E：DynamoDB支持按分区键扩展高吞吐写入。"
    ],
    "solutions": "正确答案为 C、E。Kinesis解耦设备突发数据与处理，Lambda伸缩消费者；写密集传感器记录改为可分区扩展的DynamoDB，避免单MySQL写入瓶颈。",
    "result_flow": "必须选均匀partition key并配置容量；没有任何架构能无限增长且永远无需调优。",
    "options": {
      "A": "增盘只延后单实例I/O瓶颈，不能长期匹配增长。",
      "B": "Aurora读副本不扩展主要写入容量。",
      "C": "流式缓冲与函数并发处理可扩展采集。",
      "D": "X-Ray是诊断，不能单独消除数据层写瓶颈。",
      "E": "DynamoDB支持按分区键扩展高吞吐写入。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/streams/latest/dev/key-concepts.html",
        "title": "Kinesis Data Streams concepts",
        "supports": "生产者持续写流，消费者处理后可存DynamoDB等托管服务。"
      }
    ],
    "audit_caveat": "必须选均匀partition key并配置容量；没有任何架构能无限增长且永远无需调优。",
    "audit_status": "confirmed"
  },
  "81": {
    "blocker": "一家公司正在建立一个电子文档管理系统，用户可以在其中上传文件。应用程式堆叠完全无伺服器，并在 eu-central-1 Region 中的 AWS 上运行。该系统包括一个 Web 应用程序，该应用程式使用 Amazon CloudFront 发行版以 Amazon S3 作为来源进行交付。 Web 应用程式与 Amazon API Gateway Regional 端点进行通讯。 API Gateway API 呼叫 AWS Lambda 函数，这些函数将元资料储存在 Amazon Aurora 无伺服器资料库中，并将文件放入 S3 储存桶中。该公司正在稳步发展，并已与其最大客户完成了概念验证。该公司必须改善欧洲以外地区的延迟。哪一种行动组合可以满足这些要求？ （选两个。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：上传走S3 TA而非先把文件塞进区域API。",
      "C：REST API边缘优化更贴近全球用户。"
    ],
    "solutions": "正确答案为 A、C。远端文档上传用S3加速预签名URL直接上传；API Gateway edge-optimized入口通过就近边缘优化API链路。",
    "result_flow": "A需让浏览器真正使用加速预签名上传URL；若文件仍经Lambda写入，单开TA无效。D受Aurora Serverless代际变化影响。",
    "options": {
      "A": "上传走S3 TA而非先把文件塞进区域API。",
      "B": "Global Accelerator不能附CloudFront为endpoint。",
      "C": "REST API边缘优化更贴近全球用户。",
      "D": "Aurora Serverless v1不支持Global Database；v2现已支持，但复制整栈远超必要且需写入设计。",
      "E": "RDS Proxy连接池不是跨洲网络延迟方案。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/transfer-acceleration.html",
        "title": "S3 Transfer Acceleration",
        "supports": "全球客户端通过边缘加速上传集中区域S3。"
      }
    ],
    "audit_caveat": "A需让浏览器真正使用加速预签名上传URL；若文件仍经Lambda写入，单开TA无效。D受Aurora Serverless代际变化影响。",
    "audit_status": "confirmed"
  },
  "82": {
    "blocker": "一家冒险公司在其行动应用程式上推出了一项新功能。用户可以使用该功能随时上传远足和漂流照片和影片。照片和影片储存在 Amazon S3 标准储存中的 S3 储存桶中，并透过 Amazon CloudFront 提供服务。公司需要优化储存成本。解决方案架构师发现，大多数上传的照片和影片在 30 天后就很少被存取。然而，一些上传的照片和影片在30天后被频繁访问。解决方案架构师需要实施一种解决方案，以尽可能低的成本维持照片和影片的毫秒检索可用性。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：按访问模式自动调整，不用猜对象热度。"
    ],
    "solutions": "正确答案为 A。访问热度不确定，Intelligent-Tiering自动在毫秒访问层间移动对象，既保留热门内容性能，也降低长期冷内容存储费。",
    "result_flow": "不要启用可选Archive Access/Deep Archive Access，否则相应对象不再毫秒可取。小于128KB对象不自动分层。",
    "options": {
      "A": "按访问模式自动调整，不用猜对象热度。",
      "B": "Deep Archive需恢复，不能毫秒取回。",
      "C": "EC2/EFS增加运维且偏离对象分发架构。",
      "D": "缓存头可能降传输与请求费，但不改变S3存储类别成本。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/intelligent-tiering-overview.html",
        "title": "How S3 Intelligent-Tiering works",
        "supports": "30天无访问转IA、90天转Archive Instant Access，保持访问性能。"
      }
    ],
    "audit_caveat": "不要启用可选Archive Access/Deep Archive Access，否则相应对象不再毫秒可取。小于128KB对象不自动分层。",
    "audit_status": "confirmed"
  },
  "83": {
    "blocker": "一家公司使用 Amazon S3 在各种储存类别中储存档案和影像。去年该公司的S3成本大幅增加。解决方案架构师需要查看过去 12 个月的资料趋势并确定物件的适当储存类别。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：高级指标扩展历史查询窗口到15个月。"
    ],
    "solutions": "正确答案为 C。Storage Lens高级指标提供最长15个月可查询历史、活动和存储趋势，适合一整年分析并找分层优化机会。",
    "result_flow": "Storage Lens分析用于规划类别；具体对象冷热还可配合Storage Class Analysis/Inventory，避免仅凭总存储量迁移。",
    "options": {
      "A": "账单可以看到花费但不等同对象访问与存储趋势。",
      "B": "storage class analysis可建议IA，但不提供题述现成12个月Storage Lens视图。",
      "C": "高级指标扩展历史查询窗口到15个月。",
      "D": "Access Analyzer关注访问权限，不是费用/存储层分析。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage_lens_basics_metrics_recommendations.html",
        "title": "Understanding Amazon S3 Storage Lens",
        "supports": "免费查询窗口14天，高级指标15个月。"
      }
    ],
    "audit_caveat": "Storage Lens分析用于规划类别；具体对象冷热还可配合Storage Class Analysis/Inventory，避免仅凭总存储量迁移。",
    "audit_status": "confirmed"
  },
  "84": {
    "blocker": "一家公司的云端基础设施位于AWS。解决方案架构师需要将基础架构定义为程式码。该基础设施目前部署在一个AWSRegion中。该公司的业务扩展计划包括跨多个 AWS 帐户在多个 Regions 中进行部署。解决方案架构师应该怎么做才能满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：StackSets专为多账户多区域模板部署。"
    ],
    "solutions": "正确答案为 C。CloudFormation模板定义基础设施，StackSets一次管理多个账户、多个区域的栈，Organizations提供账户范围和服务管理权限。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "普通模板可手动逐账户部署，但缺少集中扩展编排。",
      "B": "Control Tower针对landing zone治理，不是所有业务栈跨账户部署引擎。",
      "C": "StackSets专为多账户多区域模板部署。",
      "D": "nested stack在所属区域/账户，不能通过嵌套切换Region。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/what-is-cfnstacksets.html",
        "title": "Managing stacks across accounts and Regions with StackSets",
        "supports": "StackSets跨多账户多区域创建更新删除模板栈。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "85": {
    "blocker": "一家公司的云端基础设施位于AWS。解决方案架构师需要将基础架构定义为程式码。该基础设施目前部署在一个AWSRegion中。该公司的业务扩展计划包括跨多个 AWS 帐户在多个 Regions 中进行部署。解决方案架构师应该怎么做才能满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：正确的跨账户多区域IaC工具。"
    ],
    "solutions": "正确答案为 C。与Q84为完全重复题。StackSets把同一CloudFormation模板部署到多个账户和区域，适合组织级基础设施复制。",
    "result_flow": "此题与Q84重复，应在学习统计/题库说明中标识，避免把重复内容当新增知识点。",
    "options": {
      "A": "普通栈缺少集中多账户管理。",
      "B": "Control Tower不替代一般StackSets部署。",
      "C": "正确的跨账户多区域IaC工具。",
      "D": "嵌套栈不能据此改区域。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/what-is-cfnstacksets.html",
        "title": "CloudFormation StackSets",
        "supports": "StackSets以一个操作管理多个目标账户和区域的栈。"
      }
    ],
    "audit_caveat": "此题与Q84重复，应在学习统计/题库说明中标识，避免把重复内容当新增知识点。",
    "audit_status": "confirmed"
  },
  "86": {
    "blocker": "一家公司计划将单体应用程式重构为部署在 AWS 上的现代应用程式设计。 CI/CD 管道需要升级，以支援具有以下要求的应用程式的现代设计： • 它应该允许每小时发布几次更改。 • 它应该能够尽快回滚更改。哪种设计能够满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：托管蓝绿环境交换支持快速发布和回退。"
    ],
    "solutions": "正确答案为 B。预先在独立环境部署并测试新版本，然后交换Beanstalk环境CNAME；旧环境保留，回滚时交换回来，无需重新构建全部实例。",
    "result_flow": "数据库schema变化必须向后兼容，环境交换不自动回滚数据库。",
    "options": {
      "A": "每小时多次重建AMI/实例比切换现成环境慢。",
      "B": "托管蓝绿环境交换支持快速发布和回退。",
      "C": "每次重新provision与DNS加权调度更慢更复杂。",
      "D": "AMI渐替换仍需实例启动及多步回滚。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.CNAMESwap.html",
        "title": "Blue/Green deployments with Elastic Beanstalk",
        "supports": "官方支持独立环境部署测试后Swap environment URLs。"
      }
    ],
    "audit_caveat": "数据库schema变化必须向后兼容，环境交换不自动回滚数据库。",
    "audit_status": "confirmed"
  },
  "87": {
    "blocker": "一家公司有一个在 Amazon EC2 实例上运行的应用程式。解决方案架构师正在 AWS Region 中设计 VPC 基础设施，其中应用程式需要存取 Amazon Aurora 资料库集群。 EC2 实例均与相同安全群组关联。资料库集群与其自己的安全群组关联。解决方案架构师需要向安全性群组新增规则，以便为应用程式提供对资料库集群的最小权限存取权限。哪一种步骤组合可以满足这些要求？ （选两个。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：应用到数据库的出站方向正确。",
      "C：数据库接收应用连接的入站正确。"
    ],
    "solutions": "正确答案为 B、C。由EC2发起数据库连接：EC2出站允许到DB安全组的Aurora端口，DB入站允许来自EC2安全组的同端口。安全组有状态，返回流量自动允许。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "连接不是由DB发起到应用，不需此入站。",
      "B": "应用到数据库的出站方向正确。",
      "C": "数据库接收应用连接的入站正确。",
      "D": "响应流量不需另加DB出站同端口。",
      "E": "安全组有状态，不需为响应开放临时端口。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/vpc/latest/userguide/security-group-rules.html",
        "title": "Security group rules",
        "supports": "规则定义出/入站并可引用另一安全组；连接跟踪允许响应。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "88": {
    "blocker": "一家公司希望更改其每个业务部门的内部云端计费策略。目前，云端治理团队与每个业务部门的负责人分享总体云端支出的报告。公司使用AWS Organizations来管理每个业务部门单独的AWS帐户。组织中现有的标记标准包括应用程式、环境和所有者。云端治理团队需要一个集中式解决方案，以便每个业务部门都能收到有关其云端支出的月度报告。该解决方案还应该针对任何超过设定阈值的云端支出发送通知。哪一种解决方案是满足这些要求的最具成本效益的方式？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：统一计费视图和托管预算/报告组件最合适。"
    ],
    "solutions": "正确答案为 B。在管理账户集中按业务单元账户/标签建预算并通知各SNS订阅者，Cost Explorer按同一过滤维度做月度报告，避免各账户重复配置或自建CUR处理程序。",
    "result_flow": "Cost Explorer保存报告不自动等于邮件月报；可用Budget Reports计划邮件或受控导出完成实际定时发送。需激活自定义成本标签。",
    "options": {
      "A": "分散配置与集中管理目标不符。",
      "B": "统一计费视图和托管预算/报告组件最合适。",
      "C": "各账户账单dashboard并不提供中央自动分发机制。",
      "D": "可开发实现但自建查询与报警运维高于现有工具。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-controls.html",
        "title": "Configuring budget actions",
        "supports": "Budgets支持成本阈值后的通知与动作。"
      }
    ],
    "audit_caveat": "Cost Explorer保存报告不自动等于邮件月报；可用Budget Reports计划邮件或受控导出完成实际定时发送。需激活自定义成本标签。",
    "audit_status": "confirmed"
  },
  "89": {
    "blocker": "一家公司正在使用 AWS CloudFormation 部署其基础设施。该公司担心，如果删除生产CloudFormation堆叠，储存在Amazon RDS资料库或AmazonEBS卷中的重要资料也可能被删除。公司如何防止用户以这种方式意外删除资料？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：资源级删除策略正是删栈保护数据机制。"
    ],
    "solutions": "正确答案为 A。在资源上设置DeletionPolicy Retain可在删栈时保留数据库和卷，或用Snapshot先留备份。",
    "result_flow": "更新替换资源需另设UpdateReplacePolicy，DeletionPolicy不覆盖全部replace场景。",
    "options": {
      "A": "资源级删除策略正是删栈保护数据机制。",
      "B": "stack policy主要限制更新动作，不能阻止整个栈删除。",
      "C": "依赖IAM拒绝会使栈删除失败，且tag策略与权限例外维护更复杂。",
      "D": "Config只检测合规，不拦截删除API。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-attribute-deletionpolicy.html",
        "title": "DeletionPolicy attribute",
        "supports": "Retain保留资源，支持资源可用Snapshot保存备份。"
      }
    ],
    "audit_caveat": "更新替换资源需另设UpdateReplacePolicy，DeletionPolicy不覆盖全部replace场景。",
    "audit_status": "confirmed"
  },
  "90": {
    "blocker": "一家公司为其 NAT 网关启用了 VPC 流日志。该公司看到来自公用 IP 位址 198.51.100.2、发送至私有 Amazon EC2 实例的入站流量的 Action = ACCEPT。解决方案架构师必须确定流量是否代表来自网际网路的未经请求的入站连线。 VPC CIDR 区块的前两个八位元组是 203.0。解决方案架构师应采取哪一组步骤来满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：查询平台与源/目的方向均与官方排查相符。"
    ],
    "solutions": "正确答案为 B。CloudWatch Logs Insights查询来自可疑公有IP、目的为VPC地址的入站记录，并对NAT ENI与实例ENI同时比较：仅NAT私有地址出现而实例地址未出现，符合被NAT丢弃的未请求流量。",
    "result_flow": "Flow Log ACCEPT只代表该ENI规则允许记录，不能单凭此断言NAT允许互联网新建入站连接；还需检查实例ENI与TCP标志。",
    "options": {
      "A": "Flow Logs查询不是CloudTrail控制台日志组功能。",
      "B": "查询平台与源/目的方向均与官方排查相符。",
      "C": "平台错误，且此处看的是反向出站。",
      "D": "出站相关性可辅助判断，但不是题述官方入站ENI对比查询。"
    },
    "sources": [
      {
        "url": "https://repost.aws/knowledge-center/vpc-analyze-inbound-traffic-nat-gateway",
        "title": "Analyze inbound traffic for a NAT gateway",
        "supports": "AWS排查示例用dstAddr为VPC前两octets、srcAddr为公有IP，比较NAT与实例ENI日志。"
      }
    ],
    "audit_caveat": "Flow Log ACCEPT只代表该ENI规则允许记录，不能单凭此断言NAT允许互联网新建入站连接；还需检查实例ENI与TCP标志。",
    "audit_status": "confirmed"
  },
  "91": {
    "blocker": "公司由一个或两个独立的业务部门组成。每个业务部门在 AWS Organizations ​​的单一组织内都有自己的 AWS 帐户。业务部门定期相互共享敏感文件。为了便于共享，该公司在每个帐户中创建了一个Amazon S3储存桶，并在S3储存桶之间配置了低路复制。 S3 储存桶拥有数百万个物件。最近，安全审计发现S3储存桶均未启用静态加密。公司政策要求所有文件必须以静态加密方式储存。该公司希望使用 Amazon S3 托管加密金钥 (SSE- S3) 实施伺服器端加密。满足这些要求的最高效的营运解决方案是什么？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：原生批量复制可改变旧对象加密。"
    ],
    "solutions": "正确答案为 A。数百万既有对象用S3 Batch Operations原地复制并指定SSE-S3，两个桶开启默认加密覆盖未来上传，比自行脚本逐对象处理省运维。",
    "result_flow": "2023年后所有新上传默认SSE-S3，但更早的旧对象仍需检查/重写；有版本控制时旧版本也须按合规范围处理。",
    "options": {
      "A": "原生批量复制可改变旧对象加密。",
      "B": "要求SSE-S3而非自行建KMS key。",
      "C": "CLI逐一复制可行但维护和失败重试负担更高。",
      "D": "同样改成SSE-KMS，非所需加密模式。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/batch-ops-copy-object.html",
        "title": "Copy objects with S3 Batch Operations",
        "supports": "Batch Copy可把未加密旧对象写回同桶为加密对象。"
      }
    ],
    "audit_caveat": "2023年后所有新上传默认SSE-S3，但更早的旧对象仍需检查/重写；有版本控制时旧版本也须按合规范围处理。",
    "audit_status": "confirmed"
  },
  "92": {
    "blocker": "一家公司正在AWS云端中运行应用程式。该应用程式收集大量非结构化资料并将其储存在Amazon S3储存桶中。 S3 储存桶包含数 TB 的资料并使用 S3 标准储存类别。资料的大小每天都会增加几千兆位元组。公司需要对资料进行查询和分析。该公司不会存取超过 1 年的数据。然而，出于合规原因，公司必须无限期保留所有资料。哪一种解决方案能够最具成本效益地满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：serverless查询与冷归档匹配访问周期。"
    ],
    "solutions": "正确答案为 C。Athena配Glue Catalog按需查询S3，不需维持Redshift集群；一年以上不再查询的数据转Deep Archive长期低价保存。",
    "result_flow": "任意非结构化文件不能自动用SQL理解；须抽取为可查询格式或使用适合的SerDe，并把归档分区排除查询。",
    "options": {
      "A": "S3 Select只在单对象指定格式上查询，不是通用数据湖查询服务，且不再对新客户开放。",
      "B": "可行但通常新增Redshift计算与管理成本。",
      "C": "serverless查询与冷归档匹配访问周期。",
      "D": "不再访问的数据用Intelligent-Tiering通常不如直接Deep Archive低。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/athena/latest/ug/what-is.html",
        "title": "What is Amazon Athena",
        "supports": "Athena以SQL直接查S3并按查询付费，无需基础设施。"
      }
    ],
    "audit_caveat": "任意非结构化文件不能自动用SQL理解；须抽取为可查询格式或使用适合的SerDe，并把归档分区排除查询。",
    "audit_status": "confirmed"
  },
  "93": {
    "blocker": "一家视讯处理公司希望使用 600 TB 的压缩资料建立机器学习 (ML) 模型，这些资料以数千个档案的形式储存在该公司的on-premises 网路附加储存系统中。该公司没有本地机器学习实验所需的计算资源，因此希望使用 AWS。公司需在3周内完成向AWS的资料传输。资料传输将是一次性传输。资料在传输过程中必须加密。测得该公司网路连线的上传速度为100 Mbps。并且多个部门共享连接。哪一种解决方案能够最具成本效益地满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：离线并行设备运输绕过小带宽瓶颈。"
    ],
    "solutions": "正确答案为 A。600TB以100Mbps理论上传需约556天，三周不可能；一次性大规模数据用多个加密Snowball Edge离线搬运，不需长期专线投入。",
    "result_flow": "这是历史考试场景；订购资格、区域和物流时限需确认，不能保证所有新客户现在仍可下单或三周必达。",
    "options": {
      "A": "离线并行设备运输绕过小带宽瓶颈。",
      "B": "新建10Gbps DX周期和成本不适合一次性三周窗口。",
      "C": "VPN仍被100Mbps限制。",
      "D": "File Gateway仍受同一网络带宽限制。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/snowball/latest/developer-guide/whatisedge.html",
        "title": "What is Snowball Edge",
        "supports": "设备可离线运输S3数据，强制静态及物理运输中加密。"
      }
    ],
    "audit_caveat": "这是历史考试场景；订购资格、区域和物流时限需确认，不能保证所有新客户现在仍可下单或三周必达。",
    "audit_status": "confirmed"
  },
  "94": {
    "blocker": "一家公司已将其表单处理应用程式迁移到AWS。当使用者与应用程式互动时，他们透过 Web 应用程式将扫描的表单上传为档案。资料库储存使用者元资料和对储存在 Amazon S3 中的档案的引用。 Web 应用程式在 Amazon EC2 实例和 PostgreSQL 资料库的 Amazon RDS 上运行。上传表单后，应用程式透过Amazon简单通知服务（Amazon SNS）向团队发送通知。然后，团队成员登入并处理每个表单。团队成员在将资讯输入到使用 API 的另一个系统之前，对表单执行资料验证并提取相关资料。解决方案架构师需要自动化表单的手动处理。此解决方案必须提供准确的表单撷取。最大限度地缩短上市时间，并最大限度地减少长期营运费用。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：托管文档理解加serverless编排最贴合。"
    ],
    "solutions": "正确答案为 D。Textract提取扫描文档文字、表格及表单字段，Comprehend用于后续语义实体分析，Step Functions/Lambda编排验证与提交API，避免自训OCR和常驻集群。",
    "result_flow": "OCR实际由Textract执行，Comprehend不直接识别图片；低置信度字段仍需人工审核/业务验证。",
    "options": {
      "A": "自建OCR与EKS开发维护最高。",
      "B": "自行训练并托管EC2模型延长上线。",
      "C": "SageMaker自训与EC2中间层仍增加开发运维，ElastiCache也不是结果长期存储。",
      "D": "托管文档理解加serverless编排最贴合。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/textract/latest/dg/what-is.html",
        "title": "What is Amazon Textract",
        "supports": "Textract原生提取文字、表单和表格，无需用户具备ML训练经验。"
      }
    ],
    "audit_caveat": "OCR实际由Textract执行，Comprehend不直接识别图片；低置信度字段仍需人工审核/业务验证。",
    "audit_status": "confirmed"
  },
  "95": {
    "blocker": "一家公司正在AWS云端中重构其on-premises订单处理平台。该平台包括托管在一组虚拟机器上的 Web 前端、用于将前端连接到后端的 RabbitMQ 以及用于运行容器化后端系统来处理订单的Kubernetes 集群。该公司不想对应用程式进行任何重大更改。哪种解决方案能够以最少的营运开销满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：兼容三层现有技术并用托管服务。"
    ],
    "solutions": "正确答案为 A。尽量保留现有协议和运行方式：Web VM迁AMI+ASG，RabbitMQ迁Amazon MQ，Kubernetes后端迁EKS，减少应用改写与控制面运维。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "兼容三层现有技术并用托管服务。",
      "B": "Web VM改自定义Lambda runtime与API Gateway属于明显重构。",
      "C": "自建Kubernetes比EKS增加维护。",
      "D": "SQS与RabbitMQ协议不兼容，需修改消息客户端。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/amazon-mq/latest/developer-guide/",
        "title": "What is Amazon MQ",
        "supports": "Amazon MQ托管RabbitMQ和ActiveMQ，可保留标准消息协议。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "96": {
    "blocker": "解决方案架构师需要为将储存在新的Amazon S3储存桶中的物件实作客户端加密机制。为此，解决方案架构师创建了一个储存在 AWS Key Management Service (AWS KMS) 中的 CMK。解决方案架构师创建了以下 IAM 策略并将其附加到 IAM 角色：\n\n{\n  \"Version\": \"2012-10-17\",\n  \"Statement\": [\n    {\n      \"Sid\": \"DownloadUpload\",\n      \"Action\": [\n        \"s3:GetObject\",\n        \"s3:GetObjectVersion\",\n        \"s3:PutObject\",\n        \"s3:PutObjectAcl\"\n      ],\n      \"Effect\": \"Allow\",\n      \"Resource\": \"arn:aws:s3:::BucketName/*\"\n    },\n    {\n      \"Sid\": \"KMSAccess\",\n      \"Action\": [\n        \"kms:Decrypt\",\n        \"kms:Encrypt\"\n      ],\n      \"Effect\": \"Allow\",\n      \"Resource\": \"arn:aws:kms:Region:Account:key/Key ID\"\n    }\n  ]\n}\n\n在测试期间，解决方案架构师能够成功取得 S3 储存桶中的现有测试物件。但是，尝试上传新物件会导致错误讯息。错误讯息指出该操作被禁止。解决方案架构师必须将哪些操作新增至IAM策略才能满足所有要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：生成数据密钥是上传加密的缺失动作。"
    ],
    "solutions": "正确答案为 A。客户端信封加密需GenerateDataKey取得明文数据密钥加密对象，并把加密后的数据密钥随对象保存；已有Decrypt足以解开历史对象但缺少生成新数据密钥权限。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "生成数据密钥是上传加密的缺失动作。",
      "B": "GetKeyPolicy仅读取策略。",
      "C": "GetPublicKey用于非对称密钥，不是此信封加密。",
      "D": "Sign是数字签名，不生成加密对象所需数据密钥。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/kms/latest/APIReference/API_GenerateDataKey.html",
        "title": "GenerateDataKey",
        "supports": "返回明文与被KMS key加密的数据密钥，用于信封加密。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "97": {
    "blocker": "一家公司开发了一个网页应用程式。该公司将该应用程式托管在 Application Load Balancer 后面的一组 Amazon EC2 实例上。该公司希望改善应用程式的安全状况，并计划使用 AWS WAF Web ACL。该解决方案不得对应用程式的合法流量产生不利影响。解决方案架构师应如何设定 Web ACL 以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：官方推荐测试与count模式上线验证。"
    ],
    "solutions": "正确答案为 A。先以Count观察匹配并记录请求，不阻断合法流量；分析误报调规则后再逐步改Block。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "官方推荐测试与count模式上线验证。",
      "B": "只有限流不能覆盖常见攻击且高阈值可能无效。",
      "C": "直接Block可能立即误拦合法客户。",
      "D": "Allow为终结允许动作，可能跳过后续安全规则；不是无影响评估模式。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/waf/latest/developerguide/web-acl-testing.html",
        "title": "Testing and tuning AWS WAF protections",
        "supports": "生产流量先使用count模式测试后再执行防护。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "98": {
    "blocker": "某公司的组织在 AWS Organizations ​​中有许多 AWS 帐户。解决方案架构师必须改进公司管理组织中AWS帐户的通用安全群组规则的方式。本公司在每个 AWS 帐户的允许清单中都有一组通用的 IP CIDR 范围，以允许存取和从公司的本地网路存取。每个帐户内的开发人员负责为其安全群组新增新的 IP CIDR 范围。安全团队有自己的AWS帐户。目前，当允许清单发生变更时，安全团队会通知其他AWS帐户的拥有者。解决方案架构师必须设计一个解决方案，将一组通用的CIDR范围分布到所有帐户。哪种解决方案能够以最少的营运开销满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：共享单一权威列表降低维护。"
    ],
    "solutions": "正确答案为 C。安全账户统一维护customer-managed prefix list并RAM共享，成员安全组引用同一ID，后续CIDR更新自动生效。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "每账户Lambda订阅同步重复实现原生功能。",
      "B": "每账户各建列表仍要人工分发更新。",
      "C": "共享单一权威列表降低维护。",
      "D": "跨账户逐安全组改写需额外角色、脚本和失败恢复。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/vpc/latest/userguide/managed-prefix-lists.html",
        "title": "Managed prefix lists",
        "supports": "客户管理列表可跨账户共享，引用资源跟随条目更新。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "99": {
    "blocker": "一家公司推出了一项新政策，允许员工使用 VPN 连接在家中远端工作。该公司在多个 AWS 帐户中托管带有 VPC 的内部应用程式。目前，可以透过 AWS Site-to-Site VPN 连接从公司的 on-premises 办公室网路存取这些应用程式。公司主AWS帐户中的VPC与其他AWS帐户中的VPC建立了对等连接。解决方案架构师必须设计一个可扩展的 AWS Client VPN 解决方案，供员工在家工作时使用。满足这些要求的最具成本效益的解决方案是什么？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：复用现有peering拓扑，新增组件最少。"
    ],
    "solutions": "正确答案为 B。主账户VPC已与其他VPC直接peering，只需一个Client VPN endpoint及目标子网关联、路由和授权即可访问各应用，TGW不是必要前提。",
    "result_flow": "需同时配置Client VPN route、authorization、关联子网路由及安全组；Site-to-Site经VPC peering不可传递，不应与Client VPN本地终止流量混为一谈。",
    "options": {
      "A": "多账户每建端点增加每小时端点费用。",
      "B": "复用现有peering拓扑，新增组件最少。",
      "C": "TGW可扩展中心路由但在现有直接peering条件下新增成本。",
      "D": "连到本地VPN不能替代目标VPC路由/授权。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/vpn/latest/clientvpn-admin/how-it-works.html",
        "title": "How AWS Client VPN works",
        "supports": "官方场景明确支持Client VPN访问目标VPC及其peered VPC。"
      }
    ],
    "audit_caveat": "需同时配置Client VPN route、authorization、关联子网路由及安全组；Site-to-Site经VPC peering不可传递，不应与Client VPN本地终止流量混为一谈。",
    "audit_status": "confirmed"
  },
  "100": {
    "blocker": "一家公司正在AWS云端中运行应用程式。最近的应用程式指标显示回应时间不一致且错误率显著增加。对第三方服务的呼叫导致了延误。目前，应用程式透过直接呼叫AWS Lambda函数来同步呼叫第三方服务。解决方案架构师需要解耦第三方服务呼叫并确保所有呼叫最终完成。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：持久队列、消费重试与可调并发适合第三方调用。"
    ],
    "solutions": "正确答案为 A。用SQS可靠缓冲外部服务调用任务，Lambda消费者失败不删除消息，后续重试；将前端响应与第三方延迟解耦。",
    "result_flow": "必须配置DLQ/redrive与监控，外部动作需幂等；任何有限保留期队列都不能无条件保证无限期失败后最终完成。",
    "options": {
      "A": "持久队列、消费重试与可调并发适合第三方调用。",
      "B": "Step Functions可带重试实现，但仅pass events描述未提供所需持久队列和工作削峰。",
      "C": "EventBridge适合事件路由，但第三方长期失败需额外重试/保留设计。",
      "D": "SNS不是供消费者主动确认删除的持久工作队列。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/lambda/latest/dg/with-sqs.html",
        "title": "Using Lambda with Amazon SQS",
        "supports": "Lambda event source mapping处理SQS消息并支持失败重试。"
      }
    ],
    "audit_caveat": "必须配置DLQ/redrive与监控，外部动作需幂等；任何有限保留期队列都不能无条件保证无限期失败后最终完成。",
    "audit_status": "confirmed"
  },
  "101": {
    "blocker": "一家公司正在多帐户环境中的AWS上运行应用程式。本公司的销售团队和行销团队在AWS Organizations中使用单独的AWS帐户。销售团队将 PB 级资料储存在 Amazon S3 储存桶中。行销团队使用AmazonQuickSight进行资料视觉化。行销团队需要存取国家团队储存在S3储存桶中的资料。该公司已使用 AWS Key Management Service (AWS KMS) 金钥对S3 储存桶进行了加密。行销团队已为 QuickSight 创建 IAM 服务角色，以提供行销 AWS 帐户中的 QuickSight 存取权限。该公司需要一种解决方案，能够跨 AWS 帐户安全地存取 S3 储存桶中的资料。哪种解决方案能够以最少的营运开销满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：正确思路包括桶策略与KMS grant，但桶策略必须在sales资源账户更新。"
    ],
    "solutions": "参考选择为 C。最少运维是直接跨账户读sales桶：sales桶策略授权marketing QuickSight角色，该角色有S3读与KMS decrypt权限，密钥策略或grant允许它解密。无需复制PB数据。",
    "result_flow": "C英文把桶所在账户写成marketing，是明显错误；按原字面无完整正确选项，应标歧义而非直接把C当完美答案。需将C修为sales账户桶策略，并确保customer managed KMS key。",
    "options": {
      "A": "复制PB数据增加存储和同步费用。",
      "B": "SCP不授予权限，RAM不以此共享KMS key使用。",
      "C": "正确思路包括桶策略与KMS grant，但桶策略必须在sales资源账户更新。",
      "D": "信任方向写反且遗漏KMS解密；QuickSight也不能任意按描述自动链式assume角色。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/quick/latest/userguide/s3-admin-setup.html",
        "title": "Administrator setup: S3 cross-account permissions",
        "supports": "官方要求在源桶账户授权QuickSight服务角色，并为KMS加密数据配置密钥访问。"
      }
    ],
    "audit_caveat": "C英文把桶所在账户写成marketing，是明显错误；按原字面无完整正确选项，应标歧义而非直接把C当完美答案。需将C修为sales账户桶策略，并确保customer managed KMS key。",
    "audit_status": "ambiguous"
  },
  "102": {
    "blocker": "某公司正计划将其关键业务应用程式从on-premises资料中心迁移到AWS。该公司安装了 Microsoft SQL Server Always On 集群的on-premises。该公司希望迁移到 AWS 托管资料库服务。解决方案架构师必须在AWS上设计异质资料库迁移。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：结构转换加数据迁移职责正确分离。"
    ],
    "solutions": "正确答案为 C。SQL Server到MySQL是异构迁移，SCT转换schema/代码并生成不能自动转的评估，DMS迁移数据及CDC。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "SQL Server备份不能直接恢复到MySQL。",
      "B": "BULK INSERT是SQL Server功能，不能把SQL Server备份变成MySQL结构。",
      "C": "结构转换加数据迁移职责正确分离。",
      "D": "DataSync只搬文件，不解决数据库引擎差异。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/SchemaConversionTool/latest/userguide/CHAP_Welcome.html",
        "title": "AWS Schema Conversion Tool",
        "supports": "SCT支持SQL Server到RDS MySQL等跨引擎schema转换。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "103": {
    "blocker": "出版公司的设计团队更新电子商务 Web 应用程式使用的图示和其他静态资源。该公司透过托管在公司生产帐户中的Amazon S3储存桶提供图标和资产。该公司还使用设计团队成员可以存取的开发帐户。设计团队测试开发帐户中的静态资产后，设计团队需要将资产载入到生产帐户中的S3桶中。解决方案架构师必须为设计团队提供对生产帐户的存取权限，而不会使 Web 应用程式的其他部分面临不必要的变更的风险。哪一种步骤组合可以满足这些要求？ （选择三项。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：S3权限策略应在拥有资源的生产角色上。",
      "C：资源账户角色信任开发账户，方向正确。",
      "E：开发设计组获准assume生产角色。"
    ],
    "solutions": "正确答案为 A、C、E。生产账户建立只允许目标S3桶读写的角色并信任开发账户；开发组仅拥有AssumeRole到该角色的权限，使用临时身份上传。",
    "result_flow": "尽量限定生产桶静态资源prefix及具体设计组角色，避免信任整个开发账户中的任意主体。",
    "options": {
      "A": "S3权限策略应在拥有资源的生产角色上。",
      "B": "开发账户直接策略不是这组跨账户角色模型的完整授权。",
      "C": "资源账户角色信任开发账户，方向正确。",
      "D": "反向角色不会让开发团队进入生产受限角色。",
      "E": "开发设计组获准assume生产角色。",
      "F": "assume开发角色不提供生产访问。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/IAM/latest/UserGuide/tutorial_cross-account-with-roles.html",
        "title": "Delegate access across AWS accounts using IAM roles",
        "supports": "目标账户角色拥有资源权限，源账户用户获得assume目标角色权限。"
      }
    ],
    "audit_caveat": "尽量限定生产桶静态资源prefix及具体设计组角色，避免信任整个开发账户中的任意主体。",
    "audit_status": "confirmed"
  },
  "104": {
    "blocker": "一家公司使用 AWS Elastic Beanstalk 和 Java 开发了一个试点应用程式。为了节省开发成本，该公司的开发团队将应用程式部署到单一实例环境中。最近的测试表明该应用程式消耗的 CPU 超出预期。 CPU 使用率通常大于 85%，这会导致一些效能瓶颈。在公司将应用程式投入生产之前，解决方案架构师必须缓解效能问题。哪种解决方案能够以最少的营运开销满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：官方支持single-instance升级为可伸缩环境。"
    ],
    "solutions": "正确答案为 C。直接把现有Beanstalk环境切为load-balanced scalable类型，配置多AZ及CPU平均值伸缩，无需重建应用或手工维护新环境。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "新建application不必要，增加迁移工作。",
      "B": "traffic splitting是部署策略，不是按CPU扩容新环境。",
      "C": "官方支持single-instance升级为可伸缩环境。",
      "D": "rebuild不是修改环境类型的必要步骤，sum CPU也非合理阈值。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features-managing-env-types.html",
        "title": "Elastic Beanstalk environment types",
        "supports": "可从single-instance环境升级为load-balanced scalable。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "105": {
    "blocker": "一家金融公司正在当前一代 Linux EC2 实例上运行其关键业务应用程式。该应用程式包括一个执行大量 I/O 操作的自我管理的MySQL资料库。该应用程式在本月能够处理适量的流量。然而，尽管该公司在其基础设施中使用弹性负载平衡器和Auto Scaling来满足增加的需求，但由于月末报告，它在每个月的最后三天会放缓。下列哪一项操作可以让资料库处理月末负载，同时对效能的影响最小？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：只读副本分摊报表读取，托管DB降低维护。"
    ],
    "solutions": "正确答案为 B。月末报表主要读取，迁RDS后把报表路由到read replicas，隔离主库写入与分析I/O，应用层ASG本身无法扩展数据库。",
    "result_flow": "需修改报表连接到副本并确认复制延迟；仅创建副本而不路由查询不会自动分担负载。",
    "options": {
      "A": "预热ELB不解决数据库I/O，gp2也非保证提升。",
      "B": "只读副本分摊报表读取，托管DB降低维护。",
      "C": "EBS在线改IOPS可缓解存储瓶颈，但仍是单库计算/查询竞争，不能整体隔离负载。",
      "D": "每月快照换卷/回退风险和操作复杂度大，最大规格浪费。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html",
        "title": "Working with DB instance read replicas",
        "supports": "把读查询路由到read replica可减轻主DB负载并横向扩展读。"
      }
    ],
    "audit_caveat": "需修改报表连接到副本并确认复制延迟；仅创建副本而不路由查询不会自动分担负载。",
    "audit_status": "confirmed"
  },
  "106": {
    "blocker": "某公司运行的 Java 应用程式对公司资料中心内的虚拟机器有著复杂的依赖关系。应用稳定。但该公司希望实现技术堆叠的现代化。该公司希望将应用程式迁移到AWS，并最大限度地减少维护伺服器的管理开销。哪种解决方案能够以最少的程式码更改满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：依赖打包、ECR、Fargate和ALB适合传统Java Web现代化。"
    ],
    "solutions": "正确答案为 A。App2Container分析Java运行依赖并生成镜像，部署ECS Fargate免节点维护；保留应用运行模型比改成事件函数所需代码少。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "依赖打包、ECR、Fargate和ALB适合传统Java Web现代化。",
      "B": "容器镜像仍需适配Lambda运行时与调用模型。",
      "C": "EKS managed node group仍有节点与Kubernetes运维。",
      "D": "Lambda加ALB同样不自动兼容原Java服务器。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/app2container/latest/UserGuide/a2c-integrations-ecs.html",
        "title": "Deploy application containers to ECS with App2Container",
        "supports": "App2Container支持Java应用到ECS Fargate，并生成ECR/任务部署工件。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "107": {
    "blocker": "一家公司有一个非同步 HTTP 应用程序，该应用程式作为 AWS Lambda 函数托管。公用 Amazon API Gateway 端点呼叫 Lambda 函数。 Lambda 函数和 API Gateway 端点位于 us-east-1 Region 中。解决方案架构师需要重新设计应用程式以支援故障转移到另一个AWSRegion。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：两区域完整部署与DNS主备正确。"
    ],
    "solutions": "正确答案为 D。备用区域必须同时有API和Lambda，否则原区域故障仍无后端可用；Route 53 failover配健康检查实现区域切换。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "两入口仍依赖us-east-1函数，未消除区域单点。",
      "B": "同区域SQS只解耦，不提供跨区可用部署。",
      "C": "Global Accelerator不以API Gateway为endpoint，ALB也不是直接代理两个API的该机制。",
      "D": "两区域完整部署与DNS主备正确。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/apigateway/latest/developerguide/dns-failover.html",
        "title": "Configure custom health checks for DNS failover for an API Gateway API",
        "supports": "Route 53可将API主区域流量切换至备用区域。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "108": {
    "blocker": "一家零售公司已将其 AWS 帐户建置为 AWS Organizations ​​组织的一部分。该公司已设定合并计费，并将其部门映射到以下OU：财务、销售、人力资源 (HR)、行销和营运。每个 OU 都有多个 AWS 帐户，一个部门内的每个环境都有一个帐户。这些环境是开发、测试、预生产和生产。人力资源部门正在发布一个新系统，将于 3 个月后推出。在准备过程中，人力资源部门在其生产 AWS 帐户中购买了多个预留实例 (RI)。人力资源部门将在此帐户上安装新应用程式。人力资源部门希望确保其他部门不能分享 RI 折扣。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：管理账户控制个别成员RI共享。"
    ],
    "solutions": "正确答案为 C。RI折扣共享是组织账单设置，由管理账户针对HR生产账户关闭，不能用成员权限策略控制账单优惠流转。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "成员账户不是组织共享偏好控制入口。",
      "B": "退出组织不能同时保留所述旧式单独consolidated billing关系。",
      "C": "管理账户控制个别成员RI共享。",
      "D": "SCP限制API权限，不限制RI折扣归集。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/ri-turn-off.html",
        "title": "Reserved Instances and Savings Plans discount sharing",
        "supports": "组织管理账户可为指定账户启用/停用折扣共享。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "109": {
    "blocker": "一家大公司正在运行一个流行的 Web 应用程式。该应用程式在私有子网路中 Auto Scaling 群组中的多个 Amazon EC2 Linux 实例上运行。 Application Load Balancer 的目标是私有子网路中Auto Scaling 群组中的实例。 AWS Systems Manager 会话管理器已配置，且 AWS Systems Manager 代理正在所有 EC2 实例上运行。该公司最近发布了该应用程式的新版本。一些 EC2 实例现在被标记为不健康并且正在被终止。因此，应用程式的运行能力会降低。解决方案架构师尝试透过分析从应用程式收集的 Amazon CloudWatch 日志来确定根本原因，但这些日志并不确定。解决方案架构师应如何存取EC2实例来解决问题？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：Terminate明确覆盖健康失败等ASG终止动作。"
    ],
    "solutions": "正确答案为 D。暂停Terminate直接阻止ASG因不健康而销毁待查实例，再用已配置的Session Manager登录；调查后恢复进程。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "HealthCheck停止后续检查，不可靠地阻止已标记不健康实例被终止。",
      "B": "EC2 termination protection不阻止ASG自动终止。",
      "C": "termination policy只选对象，不阻止健康替换。",
      "D": "Terminate明确覆盖健康失败等ASG终止动作。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-suspend-resume-processes.html",
        "title": "Suspend and resume EC2 Auto Scaling processes",
        "supports": "Terminate进程负责缩容及健康失败等实例移除。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "110": {
    "blocker": "一家公司希望部署 AWS WAF 解决方案来管理多个 AWS 帐户的 AWS WAF 规则。这些帐户在AWS Organizations中的不同OU下进行管理。管理员必须能够根据需要从托管 AWS WAF 规则集中新增或删除帐户或 OU。管理员还必须能够自动更新和修复所有帐户中不合规的 AWS WAF 规则。哪种解决方案能够以最少的营运开销满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：使用原生跨账户策略引擎，额外自动化仅调整范围。"
    ],
    "solutions": "正确答案为 A。Firewall Manager原生集中管理组织WAF策略，按账户/OU限定范围并自动修复；参数变更触发小型策略更新比每账户自行部署规则轻。",
    "result_flow": "实际可直接修改Firewall Manager policy的scope，无需为简单人工增删强制引入Parameter Store/Lambda；A仍是选项中最合理方案。",
    "options": {
      "A": "使用原生跨账户策略引擎，额外自动化仅调整范围。",
      "B": "Config加StackSets重复编排策略分发与修复。",
      "C": "逐账户assume角色更新WAF需自行维护。",
      "D": "Control Tower/KMS并非所述规则管理与账户清单存储方案，长期key不合适。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/waf/latest/developerguide/fms-chapter.html",
        "title": "AWS Firewall Manager",
        "supports": "Firewall Manager一次设置防护并自动应用至组织账户与资源。"
      }
    ],
    "audit_caveat": "实际可直接修改Firewall Manager policy的scope，无需为简单人工增删强制引入Parameter Store/Lambda；A仍是选项中最合理方案。",
    "audit_status": "confirmed"
  },
  "111": {
    "blocker": "解决方案架构师正在审核公司的安全设定或AWS Lambda功能。 Lambda 函数从 Amazon Aurora 资料库撷取最新变更。 Lambda 函数和资料库在同一个VPC 中运作。 Lambda 环境变数向 Lambda 函数提供资料库凭证。 Lambda 函数聚合资料并使资料在 Amazon S3 储存桶中可用，该储存桶配置为使用 AWS KMS 托管加密金钥 (SSE-KMS) 进行伺服器端加密。资料不得透过互联网传输。如果任何资料库凭证遭到泄露，公司需要一种解决方案来最大限度地减少泄露的影响。解决方案架构师应该建议什么来满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：短期DB认证加私有S3路径同时覆盖两要求。"
    ],
    "solutions": "正确答案为 A。IAM DB authentication用临时签名token替代长期数据库密码；S3 gateway endpoint让上传留在AWS私网，不需要NAT互联网出口。",
    "result_flow": "15分钟是建立认证有效期，不会自动终止已建立会话；仍需最小权限数据库用户和TLS。SSE-KMS另需正确KMS权限。",
    "options": {
      "A": "短期DB认证加私有S3路径同时覆盖两要求。",
      "B": "HTTPS加密不等于不走互联网路径。",
      "C": "Parameter Store没有题述原生数据库密码轮换能力。",
      "D": "Secrets Manager可轮换但只HTTPS未保证私网到S3。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/UsingWithRDS.IAMDBAuth.html",
        "title": "IAM database authentication",
        "supports": "Aurora可用IAM token登录，token有效15分钟。"
      }
    ],
    "audit_caveat": "15分钟是建立认证有效期，不会自动终止已建立会话；仍需最小权限数据库用户和TLS。SSE-KMS另需正确KMS权限。",
    "audit_status": "confirmed"
  },
  "112": {
    "blocker": "一家大型行动游戏公司已成功将其所有on-premises基础设施迁移到AWS云端。解决方案架构师正在审查环境，以确保它是根据设计构建的，并且它的运行符合架构完善的框架。在检查 Cost Explorer 中之前的每月成本时，解决方案架构师注意到，多个大型实例类型的建立和后续终止占据了成本的很大一部分。解决方案架构师发现，公司的开发人员正在启动新的 Amazon EC2 执行个体作为测试的一部分，且开发人员没有使用适当的执行个体类型。解决方案架构师必须实作控制机制来限制只有开发人员可以启动的执行个体类型。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：IAM条件策略直接限定这些开发者。"
    ],
    "solutions": "正确答案为 C。用IAM ec2:InstanceType条件限制开发者RunInstances允许机型，并附开发组，可预先阻止昂贵实例创建。",
    "result_flow": "要避免其他宽泛Allow绕过，使用合适显式Deny或权限边界；组仅适用于IAM用户，现代联合角色应加对应角色策略。",
    "options": {
      "A": "Config为事后检测，不能防止启动与费用。",
      "B": "launch template不是强制授权边界，开发者仍可不用它启动。",
      "C": "IAM条件策略直接限定这些开发者。",
      "D": "Image Builder控制镜像，不控制实例机型权限。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ExamplePolicies_EC2.html",
        "title": "Example policies to control EC2 API access",
        "supports": "EC2 IAM示例支持按instance type等条件约束RunInstances。"
      }
    ],
    "audit_caveat": "要避免其他宽泛Allow绕过，使用合适显式Deny或权限边界；组仅适用于IAM用户，现代联合角色应加对应角色策略。",
    "audit_status": "confirmed"
  },
  "113": {
    "blocker": "一家公司正在AWS云端开发和托管多个专案。这些项目是在AWS Organizations同一组织下的多个AWS帐户开发的。该公司要求将云端基础设施的成本分配给自己的专案。负责所有 AWS 帐户的团队发现，多个 Amazon EC2 实例缺少用于成本分配的项目标签。解决方案架构师应该采取哪些行动来解决问题并防止未来再次发生？ （选择三项。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：检测存量缺标。",
      "B：组织级预防新实例缺标。",
      "E：组织aggregator汇总各账户Config结果。"
    ],
    "solutions": "正确答案为 A、B、E。Config required-tags找出既有缺Project标签实例，aggregator组织集中汇总；SCP以aws:RequestTag/Project缺失条件拒绝RunInstances防止新增缺标资源。",
    "result_flow": "还需授权负责团队补现有标签；SCP防RunInstances不能阻止日后DeleteTags，必要时另加保护。",
    "options": {
      "A": "检测存量缺标。",
      "B": "组织级预防新实例缺标。",
      "C": "Inspector检查漏洞，不做通用标签合规。",
      "D": "每账户IAM维护较高，且可能被其他允许覆盖，不如SCP统一。",
      "E": "组织aggregator汇总各账户Config结果。",
      "F": "Security Hub不替代这组required-tags组织聚合流程。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/config/latest/developerguide/required-tags.html",
        "title": "required-tags",
        "supports": "Config规则检测缺标但不阻止创建，需与预防策略分工。"
      }
    ],
    "audit_caveat": "还需授权负责团队补现有标签；SCP防RunInstances不能阻止日后DeleteTags，必要时另加保护。",
    "audit_status": "confirmed"
  },
  "114": {
    "blocker": "一家公司拥有一个 on-premises 监控解决方案，使用 PostgreSQL 资料库来持久保存事件。由于大量摄取，资料库无法扩展，并且经常耗尽储存空间。该公司希望创建混合解决方案，并已在其网路和 AWS 之间建立了 VPN 连接。此解决方案应包括以下属性： • 托管AWS 服务，以最大限度地降低营运复杂性。 • 缓冲区可自动扩展以符合资料吞吐量，且无需持续管理。 • 视觉化工具，用于建立仪表板以近乎即时地观察事件。 • 支援半结构化JSON 资料和动态模式。哪种组件组合将使公司能够创建满足这些要求的监控解决方案？ （选两个。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：全托管投递与缓冲，支持Lambda变换。",
      "D：托管OpenSearch接受JSON并附带仪表盘。"
    ],
    "solutions": "正确答案为 A、D。Firehose托管缓冲、Lambda转换并把JSON事件送OpenSearch；OpenSearch Dashboards/Kibana提供近实时检索和仪表盘，避免自管关系库扩容。",
    "result_flow": "Firehose为近实时不是零延迟；JSON字段可动态映射但应限制字段爆炸。",
    "options": {
      "A": "全托管投递与缓冲，支持Lambda变换。",
      "B": "Kinesis Data Streams现支持on-demand也能伸缩，但此选项还需自行实现目的地投递，运维更多。",
      "C": "关系schema与读副本扩展不如文档索引适合动态JSON事件搜索。",
      "D": "托管OpenSearch接受JSON并附带仪表盘。",
      "E": "Neptune图数据库与此事件监控目的不符。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/firehose/latest/dev/basic-deliver.html",
        "title": "Understand data delivery in Amazon Data Firehose",
        "supports": "Firehose向OpenSearch投递前按缓冲配置积攒记录。"
      }
    ],
    "audit_caveat": "Firehose为近实时不是零延迟；JSON字段可动态映射但应限制字段爆炸。",
    "audit_status": "confirmed"
  },
  "115": {
    "blocker": "团队收集并传送整个公司的行为资料。该公司运行具有公共子网路、私人子网路和 Internet 闸道的 Multi-AZ VPC 环境。每个公共子网路也包含一个NAT网关。公司的大多数应用程式都会读取和写入Amazon Kinesis Data Streams。大多数工作负载在私有子网路中运作。解决方案架构师必须审查基础架构。解决方案架构师需要降低成本并维护应用程式的功能。解决方案架构师使用 Cost Explorer 并注意到EC2-其他类别的成本始终很高。进一步的审查表明，NatGateway-Bytes 收费正在增加 EC2-其他类别的成本。解决方案架构师应该怎么做才能满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：端点私有路径加端点policy与工作负载兼容性最直接。"
    ],
    "solutions": "正确答案为 D。给Kinesis Data Streams建interface endpoint，让私有子网直接访问服务而绕过NAT字节费，并允许既有应用角色在端点策略中访问相应stream。",
    "result_flow": "B与D都含正确建端点动作，D更精确强调端点policy；还需private DNS、安全组443。低流量时须比较端点小时费与NAT节省。",
    "options": {
      "A": "阻断合法Kinesis流量会破坏应用，先分析并不能替代路径优化。",
      "B": "建端点方向正确，应用已有stream IAM权限；没有独立“use endpoint”IAM动作可普遍解决端点策略。",
      "C": "Detective不是必要流量成本分析组件。",
      "D": "端点私有路径加端点policy与工作负载兼容性最直接。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/streams/latest/dev/vpc.html",
        "title": "Use Kinesis Data Streams with interface VPC endpoints",
        "supports": "interface endpoint不需NAT且支持端点访问策略。"
      }
    ],
    "audit_caveat": "B与D都含正确建端点动作，D更精确强调端点policy；还需private DNS、安全组443。低流量时须比较端点小时费与NAT节省。",
    "audit_status": "confirmed"
  },
  "116": {
    "blocker": "一家零售公司在欧洲拥有一个on-premises资料中心。该公司还拥有多个Region AWS，其中包括 eu-west-1 和 us-east-1 Regions。该公司希望能够将网路流量从其 on-premises 基础设施路由到其中任一个 Regions 中的 VPC。公司还需要支援在那些 Regions 中的 VPC 之间直接路由的流量。网路上不能存在单点故障。该公司已从其 on-premises 资料中心创建了两个 1 Gbps AWS Direct Connect 连接。每个连接都进入欧洲的一个单独的Direct Connect位置，以实现高可用性。这两个位置分别命名为 DX-A 和 DX-B。每个 Region 都有一个 AWS Transit Gateway，配置为路由该 Region 内的所有VPC 间流量。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：VIF类型、双线冗余与跨区TGW互通均正确。"
    ],
    "solutions": "正确答案为 D。两个物理DX地点的transit VIF汇聚DX gateway，关联两区域TGW；TGW之间跨区peering承担VPC间路由，DX gateway不作TGW间转发。",
    "result_flow": "跨区TGW peering需配置静态路由及非重叠CIDR。",
    "options": {
      "A": "TGW关联要求transit VIF，不是private VIF。",
      "B": "DX gateway不能彼此peering。",
      "C": "DX gateway不是两TGW间的转接路由器。",
      "D": "VIF类型、双线冗余与跨区TGW互通均正确。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/directconnect/latest/UserGuide/direct-connect-transit-gateways.html",
        "title": "Direct Connect gateways and Transit Gateway associations",
        "supports": "DX gateway通过transit VIF连接所关联TGW，不可混接private VIF。"
      }
    ],
    "audit_caveat": "跨区TGW peering需配置静态路由及非重叠CIDR。",
    "audit_status": "confirmed"
  },
  "117": {
    "blocker": "一家公司正在AWS云端中运行应用程式。公司的安全团队必须批准所有新 IAM 用户的创建。建立新的 IAM 使用者时，必须自动删除该使用者的所有存取权限。然后，安全团队必须收到批准用户的通知。该公司在AWS帐户中有多条RegionAWSCloudTrail踪迹。哪一种步骤组合可以满足这些要求？ （选择三项。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：正确的API事件匹配入口。",
      "D：状态机适合多步撤权与等待审批。",
      "E：SNS提供直接通知。"
    ],
    "solutions": "正确答案为 A、D、E。EventBridge匹配CloudTrail CreateUser事件，Step Functions执行禁用凭据/附加拒绝与审批工作流，SNS通知安全团队，审批后才恢复授权。",
    "result_flow": "IAM全局CreateUser事件通常在us-east-1处理；需考虑事件延迟与新用户被立即附权的竞态，强制审批最好限制CreateUser/授权入口。",
    "options": {
      "A": "正确的API事件匹配入口。",
      "B": "CloudTrail SNS原生通知主要是日志交付，不直接按CreateUser执行业务过滤。",
      "C": "可编写容器实现但额外容器运维非必要。",
      "D": "状态机适合多步撤权与等待审批。",
      "E": "SNS提供直接通知。",
      "F": "Pinpoint是用户触达/营销体系，对内部审批通知过重。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-service-event-cloudtrail.html",
        "title": "AWS service events delivered via CloudTrail",
        "supports": "EventBridge可通过AWS API Call via CloudTrail事件匹配API调用。"
      }
    ],
    "audit_caveat": "IAM全局CreateUser事件通常在us-east-1处理；需考虑事件延迟与新用户被立即附权的竞态，强制审批最好限制CreateUser/授权入口。",
    "audit_status": "confirmed"
  },
  "118": {
    "blocker": "一家公司想要迁移到AWS。该公司希望使用多帐户结构来集中管理对所有帐户和应用程式的存取。该公司还希望将流量保持在专用网路上。登入时需要多重身份验证（MFA），并且为使用者群组指派特定角色。公司必须为开发创建单独的帐户。登台、制作和分享网路。生产帐户和共享网路帐户必须连接到所有帐户。开发帐户和临时帐户必须只能相互存取。解决方案架构师应采取哪些步骤组合才能满足这些要求？ （选择三项。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：组织账户治理与账户开通。",
      "C：TGW路由表可按环境组限制可达网络。",
      "D：中央身份源、permission sets与MFA满足访问管理。"
    ],
    "solutions": "正确答案为 A、C、D。Control Tower建立多账户landing zone，Identity Center统一组权限与MFA；TGW及隔离路由表为账户间私网连接和分段提供工具。",
    "result_flow": "网络文字存在矛盾：production/shared均连所有账户，而dev/staging又“only each other”。须明确其禁止的是相互发起访问还是所有方向。通常用中央共享TGW而非每账户一个TGW以降低费用。",
    "options": {
      "A": "组织账户治理与账户开通。",
      "B": "Security Hub汇总安全发现，不提供联合账户登录或强制MFA。",
      "C": "TGW路由表可按环境组限制可达网络。",
      "D": "中央身份源、permission sets与MFA满足访问管理。",
      "E": "Control Tower不管理所有应用网络路由，CloudTrail不强制MFA。",
      "F": "Cognito用于应用身份，不适合替代组织员工账户联合登录。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/controltower/latest/userguide/what-is-control-tower.html",
        "title": "What Is AWS Control Tower",
        "supports": "Control Tower编排Organizations和Identity Center建立治理landing zone。"
      }
    ],
    "audit_caveat": "网络文字存在矛盾：production/shared均连所有账户，而dev/staging又“only each other”。须明确其禁止的是相互发起访问还是所有方向。通常用中央共享TGW而非每账户一个TGW以降低费用。",
    "audit_status": "confirmed"
  },
  "119": {
    "blocker": "一家公司在 eu-west-1 Region 中运行其应用程序，并且每个环境都有一个帐户：开发、测试和生产。所有环境都使用有状态 Amazon EC2 实例和Amazon RDS MySQL 资料库，每周 7 天、每天 24 小时运行。资料库大小在 500 GB 到 800 GB 之间。开发团队和测试团队在工作日上班时间工作，但生产环境每周7天、每天24小时运行。该公司希望降低成本。所有资源都标有环境标签，以开发、测试或生产为键。解决方案架构师应该如何做才能以最少的营运工作来降低成本？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：按两条业务时间日程停启最简单。"
    ],
    "solutions": "正确答案为 B。工作日晚停、早启开发和测试EC2/RDS，保留有状态磁盘，生产不动；两条明确日程无需每小时轮询也不反复恢复大数据库。",
    "result_flow": "停机仍付存储/备份；应提前启动数据库以覆盖恢复耗时，并处理节假日超过7天后自动启动。题干tag的key/value表述也需统一。",
    "options": {
      "A": "每天一次无法同时准确表达早启与晚停两个时点。",
      "B": "按两条业务时间日程停启最简单。",
      "C": "terminate再restore耗时且有数据一致性风险。",
      "D": "反复备份恢复及每小时扫描多余。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_StopInstance.html",
        "title": "Stopping an RDS DB instance temporarily",
        "supports": "非生产RDS可临时停启节约实例小时费，停机最多7天。"
      }
    ],
    "audit_caveat": "停机仍付存储/备份；应提前启动数据库以覆盖恢复耗时，并处理节假日超过7天后自动启动。题干tag的key/value表述也需统一。",
    "audit_status": "confirmed"
  },
  "120": {
    "blocker": "一家公司正在 AWS 上建立软体即服务 (SaaS) 解决方案。该公司已在多个 AWS Regions 和同一个生产帐户中部署了 Amazon API Gateway REST API，并将 AWS Lambda 整合。该公司提供分级定价，使客户能够为每秒进行一定数量的 API 呼叫的容量付费。高级层每秒提供高达 3,000 次调用，并且透过唯一的 API 金钥来识别客户。多个 Regions 中的高级客户报告称，他们在高峰使用时段收到来自多个 API 方法的 429 Too Many Requests 错误回应。日志显示 Lambda 函数从未被呼叫。这些客户收到错误讯息的原因可能是什么？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：账户每区域总RPS被所有API/客户共享，可能触顶。"
    ],
    "solutions": "正确答案为 C。单客户3000RPS不代表账户整体配额足够，多客户在同一区域共享API Gateway账户节流上限；限流发生在调用Lambda之前，因而函数无调用日志。",
    "result_flow": "配额是每账户每区域，不能说所有区域共用10000；还应检查usage plan与stage/method定制节流。",
    "options": {
      "A": "Lambda并发超限通常在API已尝试调用后产生后端错误，不符合此处未调用。",
      "B": "同样是后端并发而非此API Gateway429机制。",
      "C": "账户每区域总RPS被所有API/客户共享，可能触顶。",
      "D": "没有题目暗示自定义method限制，默认方法上限不能独立解释跨方法共享峰值。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/apigateway/latest/developerguide/limits.html",
        "title": "Amazon API Gateway quotas",
        "supports": "多数区域账户总节流为10000RPS和5000burst，部分区域更低。"
      }
    ],
    "audit_caveat": "配额是每账户每区域，不能说所有区域共用10000；还应检查usage plan与stage/method定制节流。",
    "audit_status": "confirmed"
  },
  "121": {
    "blocker": "一家金融公司正计划将其 Web 应用程式从本地迁移到AWS。该公司使用第三方安全工具来监控应用程式的入站流量。该公司在过去 15 年中一直使用该安全工具，该工具的供应商没有提供任何云端解决方案。公司安全团队关心的是如何将安全工具与AWS技术整合。该公司计划在 Amazon EC2 实例上将应用程式迁移部署到AWS。 EC2 实例将在专用 VPC 中的 Auto Scaling 群组中运行。公司需要使用安全工具来检查所有进出VPC的封包。此检查必须即时进行，并且不得影响应用程式的效能。解决方案架构师必须在 AWS 上设计一个在 AWS Region 内高度可用的目标架构。解决方案架构师应该采取哪些步骤组合来满足这些要求？ （选两个。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：虚拟安全设备需可在EC2运行并扩展。",
      "D：GWLB用于透明网络安全设备分流。"
    ],
    "solutions": "正确答案为 A、D。把安全设备部署为多AZ EC2组，GWLB把IP流量透明分发给健康设备，路由经各AZ的GWLB endpoint完成双向检查。",
    "result_flow": "D把GWLB与每AZ endpoint混淆：通常一个跨AZ GWLB、每AZ一个GWLBE。设备必须支持GENEVE/合适适配，原题老工具未说明兼容性，不能承诺绝无性能影响。",
    "options": {
      "A": "虚拟安全设备需可在EC2运行并扩展。",
      "B": "NLB放应用前不等同全VPC双向包检查。",
      "C": "ALB只处理HTTP层，不能转发任意IP包给设备。",
      "D": "GWLB用于透明网络安全设备分流。",
      "E": "单应用VPC无需用TGW解决包检查。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/elasticloadbalancing/latest/gateway/introduction.html",
        "title": "What is a Gateway Load Balancer",
        "supports": "GWLB在网络层为防火墙/IDS等虚拟设备分发所有IP协议流量。"
      }
    ],
    "audit_caveat": "D把GWLB与每AZ endpoint混淆：通常一个跨AZ GWLB、每AZ一个GWLBE。设备必须支持GENEVE/合适适配，原题老工具未说明兼容性，不能承诺绝无性能影响。",
    "audit_status": "confirmed"
  },
  "122": {
    "blocker": "一家公司从不同的供应商购买了设备。这些设备都配备物联网感测器。感测器以供应商专有格式将状态资讯传送到遗留应用程序，该应用程式将资讯解析为JSON。解析很简单，但每个供应商都有独特的格式。应用程式每天一次解析所有 JSON 记录并将记录储存在关联式资料库中以供分析。该公司需要设计一种新的数据分析解决方案，可以更快地交付并优化成本。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：托管事件链把轻量解析与按需分析串联。"
    ],
    "solutions": "正确答案为 A。IoT Core接收设备消息，规则触发Lambda按vendor格式解析，S3+Glue+Athena/QuickSight直接分析，去掉每日关系库批处理等待。",
    "result_flow": "不能让大量小CSV长期无合并直接查询，实际宜批量写Parquet并分区；设备必须具备IoT Core支持的接入协议。",
    "options": {
      "A": "托管事件链把轻量解析与按需分析串联。",
      "B": "Fargate+Redshift能做但持续服务/数仓成本较高。",
      "C": "要求修改所有传感器改CSV/SFTP，开发侵入较大。",
      "D": "已有网络事件场景不需定期寄设备且延迟高。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/iot/latest/developerguide/iot-rules.html",
        "title": "Rules for AWS IoT",
        "supports": "IoT规则可调用Lambda、写S3并触发后续托管服务。"
      }
    ],
    "audit_caveat": "不能让大量小CSV长期无合并直接查询，实际宜批量写Parquet并分区；设备必须具备IoT Core支持的接入协议。",
    "audit_status": "confirmed"
  },
  "123": {
    "blocker": "一家公司正在将其部分应用程式迁移到AWS。该公司希望在确定网路和安全策略后快速迁移应用程式并使其现代化。该公司已在中央网路帐户中建立了AWS Direct Connect连线。该公司预计在不久的将来将拥有数百个AWS帐户和VPC。公司网路必须能够无缝存取AWS上的资源，并且还必须能够与所有VPC通讯。该公司还希望透过其on-premises资料中心将其云端资源路由到互联网。哪一种步骤组合可以满足这些要求？ （选择三项。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：DX gateway+TGW是集中混合路由骨干。",
      "D：共享TGW让各账户接入集中路由。",
      "F：私有子网配回本地默认路由和NAT符合要求。"
    ],
    "solutions": "正确答案为 B、D、F。中央DX gateway通过transit VIF关联共享TGW，各账户VPC经RAM附着；私有子网默认路由回本地NAT，统一互联网出口。",
    "result_flow": "需在DX allowed prefixes及本地路由中正确发布默认路由，检查路径对称、冗余与本地出口容量。",
    "options": {
      "A": "逐VPC VGW关联不适合数百VPC集中转接。",
      "B": "DX gateway+TGW是集中混合路由骨干。",
      "C": "IGW附VPC而非子网，且违反回本地出口目标。",
      "D": "共享TGW让各账户接入集中路由。",
      "E": "Peering不支持集中转接网络。",
      "F": "私有子网配回本地默认路由和NAT符合要求。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/directconnect/latest/UserGuide/direct-connect-transit-gateways.html",
        "title": "Direct Connect gateways and Transit Gateway associations",
        "supports": "DX gateway通过transit VIF接TGW。"
      }
    ],
    "audit_caveat": "需在DX allowed prefixes及本地路由中正确发布默认路由，检查路径对称、冗余与本地出口容量。",
    "audit_status": "confirmed"
  },
  "124": {
    "blocker": "一家公司有数百个AWS帐户。该公司最近实施了一个集中的内部流程来购买新的预留实例和修改现有的预留实例。此流程要求所有想要购买或修改预留实例的业务部门向专门的团队提交采购请求。此前，业务部门直接在各自的AWS帐户中自主购买或修改预留实例。解决方案架构师需要以尽可能最安全的方式实施新流程。解决方案架构师应该采取哪些步骤组合来满足这些要求？ （选两个。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：启用SCP所需组织能力。",
      "D：组织范围显式拒绝强制集中流程。"
    ],
    "solutions": "正确答案为 A、D。SCP仅在Organizations all features可用，统一拒绝成员账户购买/修改RI，采购团队以受控例外或管理账户执行集中流程。",
    "result_flow": "D若无采购角色例外会连成员账户采购团队也拒绝；应设计专用获准主体并限制角色创建/修改。",
    "options": {
      "A": "启用SCP所需组织能力。",
      "B": "Config只能事后报告，不阻止采购。",
      "C": "逐账户IAM策略不如组织护栏统一，易受其他授权/管理员修改影响。",
      "D": "组织范围显式拒绝强制集中流程。",
      "E": "仅consolidated billing模式不支持SCP。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html",
        "title": "Service control policies",
        "supports": "SCP为组织权限护栏，需all features，不影响管理账户。"
      }
    ],
    "audit_caveat": "D若无采购角色例外会连成员账户采购团队也拒绝；应设计专用获准主体并限制角色创建/修改。",
    "audit_status": "confirmed"
  },
  "125": {
    "blocker": "一家公司正在运行一个关键应用程序，该应用程式使用 Amazon RDS for MySQL 资料库来储存资料。 RDS实例采用Multi-AZ模式部署。最近的 RDS 资料库故障转移测试导致应用程式中断 40 秒。解决方案架构师需要设计解决方案，将中断时间减少到 20 秒以内。解决方案架构师应该采取哪些步骤组合来满足这些要求？ （选择三项。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：代理保留/恢复应用连接。",
      "D：Aurora架构优化副本提升路径。",
      "E：预部署Aurora Replica可被自动提升。"
    ],
    "solutions": "正确答案为 C、D、E。迁Aurora MySQL并部署跨AZ Replica提供快速自动提升，RDS Proxy减少连接重建和DNS缓存延迟，是所给选项中最能缩短故障中断的组合。",
    "result_flow": "官方典型时间不等于严格小于20秒SLA；必须用目标负载演练验证，应用重试和连接设置也影响总中断。",
    "options": {
      "A": "缓存不保证关键读写在DB故障中持续可用。",
      "B": "同样不能代替数据库写故障转移。",
      "C": "代理保留/恢复应用连接。",
      "D": "Aurora架构优化副本提升路径。",
      "E": "预部署Aurora Replica可被自动提升。",
      "F": "普通RDS只读副本非自动Multi-AZ故障替代。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Concepts.AuroraHighAvailability.html",
        "title": "High availability for Amazon Aurora",
        "supports": "Aurora副本自动failover通常少于30秒，RDS Proxy可进一步缩短。"
      }
    ],
    "audit_caveat": "官方典型时间不等于严格小于20秒SLA；必须用目标负载演练验证，应用重试和连接设置也影响总中断。",
    "audit_status": "confirmed"
  },
  "126": {
    "blocker": "AWS 合作伙伴公司正在使用其名为 org1 的组织在 AWS Organizations ​​中建立服务。此服务要求合作伙伴公司能够存取客户帐户中的AWS 资源，该帐户位于名为 org2 的单独组织中。公司必须使用 API 或命令列工具对客户帐户建立最低权限安全存取。允许 org1 存取 org2 中的资源的最安全方法是什么？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：角色、最小权限及external ID符合标准第三方委派。"
    ],
    "solutions": "正确答案为 D。客户账户建立最小权限角色，trust只允许合作方指定主体并要求其分配的external ID，合作方通过STS AssumeRole获得短期凭据，避免confused deputy。",
    "result_flow": "External ID应由服务提供方按客户唯一生成，不是密码；还需限定trust principal并管理session权限。",
    "options": {
      "A": "不能共享账户长期访问密钥。",
      "B": "长期IAM用户凭据风险高且不如临时角色。",
      "C": "角色优于用户，但第三方多租户服务仍需external ID隔离客户请求。",
      "D": "角色、最小权限及external ID符合标准第三方委派。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_common-scenarios_third-party.html",
        "title": "Access to AWS accounts owned by third parties",
        "supports": "第三方通过客户角色及ExternalId访问，无需共享安全凭据。"
      }
    ],
    "audit_caveat": "External ID应由服务提供方按客户唯一生成，不是密码；还需限定trust principal并管理session权限。",
    "audit_status": "confirmed"
  },
  "127": {
    "blocker": "某快递公司需要将第三方路径规划应用程式迁移至AWS。第三方从公共注册表提供受支援的 Docker 映像。该映像可以根据需要在任意多个容器中运行以产生路线图。该公司将配送区域划分为具有供应中心的区域，以便送货司机从中心到客户的距离尽可能短。为了减少生成路线图所需的时间，每个部分都使用自己的一组Docker容器，这些容器具有自订配置，仅处理该部分区域中的订单。公司需要能够根据运作的容器数量经济有效地分配资源。哪种解决方案能够以最少的营运开销满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：ECS Fargate run-task支持managed tags和自定义任务标签。"
    ],
    "solutions": "正确答案为 D。Fargate按task CPU/内存用量收费且免EC2节点，ECS任务标签区分区域与供应中心成本，无需维护Kubernetes控制面。",
    "result_flow": "自定义应用配置需通过任务定义、环境变量等设置，标签本身不改变容器逻辑；计费标签还需激活。",
    "options": {
      "A": "EC2/EKS运维较高，pod不是用EKS CLI --tags方式启动。",
      "B": "Kubernetes pod标签不是AWS tag-resource资源标签API。",
      "C": "ECS EC2仍需节点管理，所述run-tasks参数也不准确。",
      "D": "ECS Fargate run-task支持managed tags和自定义任务标签。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-using-tags.html",
        "title": "Tagging Amazon ECS resources",
        "supports": "ECS任务支持自定义/托管标签，并用于Cost and Usage报告。"
      }
    ],
    "audit_caveat": "自定义应用配置需通过任务定义、环境变量等设置，标签本身不改变容器逻辑；计费标签还需激活。",
    "audit_status": "confirmed"
  },
  "128": {
    "blocker": "一家软体公司在 AWS 上托管一个应用程序，其资源位于多个 AWS 帐户和 Regions 中。该应用程式在位于 us-east-1 Region 的应用程式 VPC 中的一组 Amazon EC2 实例上运行，其 IPv4 CIDR 区块为 10.10.0.0/16。在另一个 AWS 帐户中，共享服务 VPC 位于 us-east-2 Region 中，其 IPv4 CIDR 区块为 10.10.10.0/24。当云端工程师使用 AWS CloudFormation 尝试将应用程式 VPC 与共用服务 VPC 对等互连时，会出现错误讯息，指示对等互连失败。哪些因素可能导致此错误？ （选两个。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：明确地址重叠，足以使peering失败。",
      "E：跨账户接受角色权限不足也可失败。"
    ],
    "solutions": "正确答案为 A、E。10.10.10.0/24完全位于10.10.0.0/16内，CIDR重叠禁止peering；跨账户CloudFormation自动接受连接还需要接受方角色授权。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "明确地址重叠，足以使peering失败。",
      "B": "支持跨区域peering，不是错误原因。",
      "C": "Peering不依赖IGW。",
      "D": "VPC无需RAM共享才能peering。",
      "E": "跨账户接受角色权限不足也可失败。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/vpc/latest/peering/vpc-peering-basics.html",
        "title": "How VPC peering connections work",
        "supports": "请求方与接受方VPC不能CIDR重叠，接受方需接受连接。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "129": {
    "blocker": "对公司无伺服器应用程式的外部审计揭示了授予过多权限的IAM策略。这些政策附属于公司的AWS Lambda执行角色。该公司的数百个 Lambda 函数具有广泛的存取权限，例如对Amazon S3储存桶和Amazon DynamoDB表的完全存取权限。该公司希望每个功能仅拥有该功能完成其任务所需的最低权限。解决方案架构师必须确定每个 Lambda 函数需要哪些权限。解决方案架构师应该如何做才能以最少的努力满足此要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：官方原生策略生成工具。"
    ],
    "solutions": "正确答案为 B。Access Analyzer根据执行角色的CloudTrail实际调用生成权限模板，人工审查罕见操作/资源后收紧，比自写日志解析或EMR少工作。",
    "result_flow": "生成结果不是业务所需权限的完备证明；需覆盖罕见路径并配置相关数据事件，最终仍要审查和测试。",
    "options": {
      "A": "CodeGuru不自动生成完整IAM least-privilege策略。",
      "B": "官方原生策略生成工具。",
      "C": "自写解析重复实现服务能力。",
      "D": "EMR大数据作业和手工导出增加成本维护。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/IAM/latest/UserGuide/access-analyzer-policy-generation.html",
        "title": "IAM Access Analyzer policy generation",
        "supports": "根据指定时间范围CloudTrail活动生成实体使用权限模板。"
      }
    ],
    "audit_caveat": "生成结果不是业务所需权限的完备证明；需覆盖罕见路径并配置相关数据事件，最终仍要审查和测试。",
    "audit_status": "confirmed"
  },
  "130": {
    "blocker": "解决方案架构师必须分析公司的 Amazon EC2 实例和 Amazon 弹性块储存 (Amazon EBS) 卷，以确定公司是否有效地使用资源。该公司正在运行多个大型高记忆体EC2实例来托管以主动/被动配置部署的资料库集群。这些EC2实例的利用率因使用资料库的应用程式而异，该公司尚未确定一种模式。解决方案架构师必须分析环境并根据结果采取行动。哪种解决方案最经济有效率地满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：agent加优化建议方向正确，但12小时不足以作为通用数据要求。"
    ],
    "solutions": "正确答案为 C。Compute Optimizer提供EC2/EBS规格建议，CloudWatch agent补充高内存实例的内存利用率；还要结合数据库主动/备用角色审查，避免把正常空闲备节点缩得不足。",
    "result_flow": "题目C“at least12h”不严谨，应改为满足官方数据要求并等待建议生成（可能再需24h）。备用数据库不能只按当前空闲率盲目缩容。",
    "options": {
      "A": "手工dashboard推断比托管建议费力，OpsCenter不是专门的right-sizing引擎。",
      "B": "详细监控不会自动采集内存，缺少数据库关键指标。",
      "C": "agent加优化建议方向正确，但12小时不足以作为通用数据要求。",
      "D": "Enterprise Support成本高，Trusted Advisor也不等于内存感知优化。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/compute-optimizer/latest/ug/requirements.html",
        "title": "Compute Optimizer resource requirements",
        "supports": "EC2/ASG需过去14天至少30小时指标，EBS需附到运行实例至少连续30小时。"
      }
    ],
    "audit_caveat": "题目C“at least12h”不严谨，应改为满足官方数据要求并等待建议生成（可能再需24h）。备用数据库不能只按当前空闲率盲目缩容。",
    "audit_status": "confirmed"
  },
  "131": {
    "blocker": "一家公司使用 AWS Organizations ​​在 AWS 云端中进行多重帐户设定。该公司使用 AWS Control Tower 进行治理，并使用 AWS Transit Gateway 进行 VPC 跨帐户连接。在AWS应用程式帐户中，公司的应用程式团队部署了一个使用AWS Lambda和Amazon RDS的Web应用程式。本公司的资料库管理员拥有独立的DBA帐户，并使用该帐户集中管理整个组织内的所有资料库。资料库管理员使用部署在 DBA 帐户中的 Amazon EC2 实例来存取部署在应用程式帐户中的 RDS 资料库。应用程式团队已将资料库凭证作为机密储存在应用程式帐户的AWS Secrets Manager中。应用程式团队正在与资料库管理员手动共用机密。这些秘密由应用程式帐户中 Secrets Manager 的预设 AWS 托管金钥进行加密。解决方案架构师需要实作一个解决方案，使资料库管理员能够存取资料库，并且无需手动共用机密。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：应用账户角色授权读secret并信任DBA角色，DBA角色获AssumeRole权限。"
    ],
    "solutions": "正确答案为 B。默认aws/secretsmanager密钥不能直接授权跨账户；从DBA实例先assume应用账户角色，再以该同账户身份读取secret即可保留默认密钥并避免手工分享。",
    "result_flow": "B需补应用角色trust policy允许DBA-Admin；assume后是应用账户身份，与直接外部主体使用AWS托管密钥不同。",
    "options": {
      "A": "Secrets Manager不通过RAM按此共享secret。",
      "B": "应用账户角色授权读secret并信任DBA角色，DBA角色获AssumeRole权限。",
      "C": "AWS managed key不可编辑策略以添加跨账户主体。",
      "D": "SCP不授予资源访问且未处理密钥限制。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/secretsmanager/latest/userguide/auth-and-access_examples_cross.html",
        "title": "Access Secrets Manager secrets from a different account",
        "supports": "直接跨账户访问必须改customer managed KMS key；aws/secretsmanager不可跨账户使用。"
      }
    ],
    "audit_caveat": "B需补应用角色trust policy允许DBA-Admin；assume后是应用账户身份，与直接外部主体使用AWS托管密钥不同。",
    "audit_status": "confirmed"
  },
  "132": {
    "blocker": "某公司透过AWS Organizations管理多个AWS帐户。在根OU下，该公司有两个OU：研究和数据运营。由于监管要求，公司在组织中部署的所有资源都必须驻留在 ap-northeast-1 Region 中。此外，公司在 DataOps OU 中部署的 EC2 实例必须使用预先定义的实例类型清单。解决方案架构师必须实施应用这些限制的解决方案。此解决方案必须最大限度地提高营运效率，并最大限度地减少持续维护。哪一种步骤组合可以满足这些要求？ （选两个。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：根级全局区域条件覆盖组织成员。",
      "E：DataOps OU机型SCP范围精确。"
    ],
    "solutions": "正确答案为 C、E。根层用aws:RequestedRegion全局条件拒绝非目标区域；DataOps OU另以ec2:InstanceType约束机型，继承到该OU所有现有及未来账户。",
    "result_flow": "SCP不约束管理账户；IAM/CloudFront/Route53等全球服务需例外，RequestedRegion限制API端点并不自动证明所有数据副本都在目标区域。",
    "options": {
      "A": "只给一个账户角色限制，覆盖不全。",
      "B": "逐用户策略维护巨大且可绕过。",
      "C": "根级全局区域条件覆盖组织成员。",
      "D": "ec2:Region只覆盖EC2，不满足全部服务区域约束，重复挂各OU也多余。",
      "E": "DataOps OU机型SCP范围精确。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps_syntax.html",
        "title": "SCP syntax and Region restriction examples",
        "supports": "官方SCP示例用aws:RequestedRegion限制区域，并为全球服务使用NotAction例外。"
      }
    ],
    "audit_caveat": "SCP不约束管理账户；IAM/CloudFront/Route53等全球服务需例外，RequestedRegion限制API端点并不自动证明所有数据副本都在目标区域。",
    "audit_status": "confirmed"
  },
  "133": {
    "blocker": "一家公司在单一 AWS Region 中运行无伺服器应用程式。该应用程式存取外部 URL 并从这些网站提取元资料。该公司使用 Amazon 简单通知服务 (Amazon SNS) 主题将 URL 发布到 Amazon Simple Queue Service (Amazon SQS) 队列。 AWS Lambda 函数使用伫列作为事件来源并处理来自伫列的 URL。结果保存到Amazon S3存储桶中。该公司希望处理其他 Regions 中的每个 URL，以比较网站在地化中可能存在的差异。 URL 必须从现有的 Region 发布。结果必须写入目前Region中现有的S3储存桶。哪种更改组合将产生满足这些要求的多Region部署？ （选两个。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：SQS event source与Lambda同区域部署。",
      "C：SNS支持跨区域向SQS投递。"
    ],
    "solutions": "正确答案为 A、C。每目标区域部署本地SQS与Lambda，把这些queue订阅原区域SNS，SNS跨区fan-out使每区域均处理同一URL，结果写原S3桶。",
    "result_flow": "S3写入跨区需正确桶/KMS权限与传输成本评估；不同区域Lambda出站IP也不保证网站按该区域定位。",
    "options": {
      "A": "SQS event source与Lambda同区域部署。",
      "B": "订阅方向相反：是queue订阅topic。",
      "C": "SNS支持跨区域向SQS投递。",
      "D": "SQS不主动发布到SNS，且这会改变主发布机制。",
      "E": "复制SNS不是必需，缺少各区队列触发链。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/sns/latest/dg/sns-cross-region-delivery.html",
        "title": "Sending SNS messages to SQS or Lambda in a different Region",
        "supports": "SNS支持跨区SQS/Lambda订阅，并需资源policy允许投递。"
      }
    ],
    "audit_caveat": "S3写入跨区需正确桶/KMS权限与传输成本评估；不同区域Lambda出站IP也不保证网站按该区域定位。",
    "audit_status": "confirmed"
  },
  "134": {
    "blocker": "一家公司在 Amazon EC2 Linux 实例上运行专有的无状态 ETL 应用程式。该应用程式是 Linux 二进位文件，原始程式码无法修改。该应用程式是单线程的，使用 2 GB 的 RAM，并且是高度 CPU 密集型的。该应用程式计划每 4 小时运行一次，最多运行 20 分钟。解决方案架构师想要修改解决方案的架构。解决方案架构师应该使用哪一种策略？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：Fargate容器加EventBridge周期启动最直接。"
    ],
    "solutions": "正确答案为 C。把现有Linux二进制放容器，由EventBridge定时启动Fargate，任务结束停止付计算费，不改源代码且支持20分钟运行。",
    "result_flow": "单线程CPU密集任务多配vCPU未必提速，应选合适task规格；封装镜像不等于修改应用源代码。",
    "options": {
      "A": "标准Lambda15分钟不够，CloudWatch Logs也不是调度器。",
      "B": "Batch能执行但Step Functions本身不是周期调度器，此选项缺调度入口且多编排。",
      "C": "Fargate容器加EventBridge周期启动最直接。",
      "D": "CodeDeploy部署不负责按4小时调度运行，Spot中断还需容错。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/tasks-scheduled-eventbridge-scheduler.html",
        "title": "Schedule ECS tasks using EventBridge Scheduler",
        "supports": "托管调度支持rate/cron启动ECS任务。"
      }
    ],
    "audit_caveat": "单线程CPU密集任务多配vCPU未必提速，应选合适task规格；封装镜像不等于修改应用源代码。",
    "audit_status": "confirmed"
  },
  "135": {
    "blocker": "一家公司正在为一款流行的线上游戏制作续集。游戏上线后的第一周内就会有大量来自世界各地的用户玩游戏。目前，游戏由部署在单一AWS Region 中的以下组件组成： • 储存游戏资产的Amazon S3 储存桶 • 储存玩家得分的Amazon DynamoDB 表 解决方案架构师需要设计一个多⟦T126T051⟧ 表 解决方案架构师需要设计一个多Region 工作量来减少解决方案架构师应该怎么做才能满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：资产CRR+origin group及全球表覆盖数据和入口。"
    ],
    "solutions": "正确答案为 C。静态资产跨区复制后由CloudFront主备origin分发，DynamoDB global table提供各区域本地读写与托管复制，兼顾全球延迟和区域恢复。",
    "result_flow": "默认MREC使用DynamoDB Streams异步复制；需处理并发写入和分数冲突。新一致性模式不可与历史MREC条件混淆。",
    "options": {
      "A": "缺CloudFront origin failover配置，且全球表副本由服务创建/关联，不是任意现存表直接当目标。",
      "B": "SRR没有跨区域资产保护，DMS也不是DynamoDB全球表替代。",
      "C": "资产CRR+origin group及全球表覆盖数据和入口。",
      "D": "资产两个桶仍同一区域，区域故障时同时不可达。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GlobalTables.html",
        "title": "Global tables multi-active multi-Region replication",
        "supports": "DynamoDB全球表自动复制且任一replica可本地读写。"
      }
    ],
    "audit_caveat": "默认MREC使用DynamoDB Streams异步复制；需处理并发写入和分数冲突。新一致性模式不可与历史MREC条件混淆。",
    "audit_status": "confirmed"
  },
  "136": {
    "blocker": "一家公司有一个 on-premises 网站应用程序，为潜在租户和买家提供房地产资讯。该网站使用 Java 后端和 NoSQL MongoDB 资料库来储存订阅者资料。该公司需要将整个应用程式迁移到具有类似结构的AWS。必须部署应用程式以实现高可用性，且公司不能对应用程式进行更改。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：托管兼容数据库加多AZ应用是推荐架构。"
    ],
    "solutions": "正确答案为 C。DocumentDB MongoDB兼容API配跨AZ实例，Java层多AZ ASG保留原应用结构，比改SQL库或自管单AZ部署更符合。",
    "result_flow": "MongoDB兼容不等于全部功能完全一致，严格零代码变更必须验证应用使用的operators、transactions和驱动选项。",
    "options": {
      "A": "Aurora关系模型不是MongoDB无改动替代。",
      "B": "应用层单AZ不具备AZ故障容忍。",
      "C": "托管兼容数据库加多AZ应用是推荐架构。",
      "D": "传统DocumentDB实例集群没有题述DynamoDB式on-demand capacity mode。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/documentdb/latest/devguide/what-is.html",
        "title": "What is Amazon DocumentDB",
        "supports": "DocumentDB提供托管MongoDB兼容API及熟悉驱动/工具。"
      }
    ],
    "audit_caveat": "MongoDB兼容不等于全部功能完全一致，严格零代码变更必须验证应用使用的operators、transactions和驱动选项。",
    "audit_status": "confirmed"
  },
  "137": {
    "blocker": "一家数位行销公司拥有多个属于不同团队的 AWS 帐户。创意团队在其 AWS 帐户中使用 Amazon S3 储存桶来安全地储存用作公司行销活动内容的图像和媒体档案。创意团队希望与策略团队分享S3储存桶，以便策略团队可以查看物件。解决方案架构师在策略帐户中建立了一个名为strategy_reviewer 的IAM 角色。解决方案架构师还在 Creative 帐户中设定了自订 AWS Key Management Service (AWS KMS) 金钥，并将该金钥与 S3 储存桶相关联。但是，当策略帐户的使用者承担 IAM 角色并尝试存取 S3 储存桶中的物件时，他们会收到「存取被拒绝」错误。解决方案架构师必须确保策略帐户中的使用者可以存取 S3 储存桶。该解决方案必须仅向这些使用者提供他们所需的最低权限。解决方案架构师应该采取哪些步骤组合来满足这些要求？ （选择三项。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：源桶策略授Strategy账户读权限，配F将实际授权收敛到角色。",
      "C：源KMS key policy允许外部strategy_reviewer解密。",
      "F：角色只读S3且decrypt指定KMS key，符合最小权限。"
    ],
    "solutions": "正确答案为 A、C、F。跨账户读取SSE-KMS对象需要源桶资源策略、调用者S3只读+KMS decrypt身份策略，以及源KMS key policy允许decrypt。ACF三项各补一层，B全权限不符合最小授权。",
    "result_flow": "实际桶策略优先直接限定role ARN，而不是整个Strategy账户；A给账户授权仍由F最小权限身份策略控制。",
    "options": {
      "A": "源桶策略授Strategy账户读权限，配F将实际授权收敛到角色。",
      "B": "S3 full permissions超出只看对象需求，且不能替代桶的跨账户授权。",
      "C": "源KMS key policy允许外部strategy_reviewer解密。",
      "D": "匿名读暴露敏感营销内容。",
      "E": "只需解密，不需encrypt。",
      "F": "角色只读S3且decrypt指定KMS key，符合最小权限。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/kms/latest/developerguide/key-policy-modifying-external-accounts.html",
        "title": "Allowing users in other accounts to use a KMS key",
        "supports": "跨账户KMS必须在密钥策略与外部身份策略双方授权。"
      }
    ],
    "audit_caveat": "实际桶策略优先直接限定role ARN，而不是整个Strategy账户；A给账户授权仍由F最小权限身份策略控制。",
    "audit_status": "corrected"
  },
  "138": {
    "blocker": "一家生命科学公司正在使用开源工具组合来管理资料分析工作流程，并使用在其 on-premises 资料中心的伺服器上运行的 Docker 容器来处理基因组资料。产生定序资料并将其储存在本机储存区域网路（SAN）上，然后对资料进行处理。研发团队遇到了容量问题，并决定在AWS上重新建构其基因组分析平台，以根据工作负载需求进行扩展，并将周转时间从几周缩短到几天。本公司拥有高速AWS Direct Connect连线。定序仪将为每个基因组产生约 200 GB 的数据，并且单一作业可能需要几个小时才能以理想的运算能力处理数据。最终结果将储存在Amazon S3中。该公司预计每天会收到 10-15 个工作请求。哪种解决方案满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：DataSync、编排、ECR及Batch职责匹配且弹性处理。"
    ],
    "solutions": "正确答案为 C。已有高速DX，DataSync持续/按需传大型基因文件到S3；事件触发Step Functions编排Batch容器，Batch按作业需求扩展数小时计算。",
    "result_flow": "可通过EventBridge把S3事件提交Batch，但C提供更完整多步工作流。",
    "options": {
      "A": "运输设备增加天级延迟，标准Lambda也不适合数小时任务。",
      "B": "Data Pipeline并非最适合托管文件同步，直接事件启动ASG缺少作业编排。",
      "C": "DataSync、编排、ECR及Batch职责匹配且弹性处理。",
      "D": "File Gateway可搬文件但S3事件不能直接原生触发Batch，缺少调度/编排与失败恢复。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/batch/latest/userguide/what-is-batch.html",
        "title": "What is AWS Batch",
        "supports": "Batch按作业数量与规模动态配置资源，适合高计算密度容器批处理。"
      }
    ],
    "audit_caveat": "可通过EventBridge把S3事件提交Batch，但C提供更完整多步工作流。",
    "audit_status": "confirmed"
  },
  "139": {
    "blocker": "一家公司在开发环境中的单一 Windows Amazon EC2 实例上运行内容管理应用程式。应用程式将静态内容读取并写入到作为根设备附加到实例的 2 TB Amazon 弹性块存储 (Amazon EBS) 卷。该公司计划将此应用程式部署在生产中，作为一个高度可用且容错的解决方案，该解决方案在跨多个 Availability Zones 的至少三个 EC2 实例上运行。解决方案架构师必须设计一个解决方案，将所有执行应用程式的实例加入到 Active Directory 域。该解决方案还必须实作 Windows ACL 来控制对档案内容的存取。应用程式始终必须在任何给定时间点在所有正在运行的实例上维护完全相同的内容。哪种解决方案能够以最少的管理开销来满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：原生Windows共享存储、域加入与多AZ实例完整。"
    ],
    "solutions": "正确答案为 C。FSx Windows提供所有应用实例共享的同一SMB内容、AD集成和Windows ACL，避免各实例独立卷同步；应用ASG多AZ，文件系统应选Multi-AZ。",
    "result_flow": "C必须明确FSx Multi-AZ；应用还需支持并发访问/锁定，不能让客户端本地缓存破坏共享一致性。",
    "options": {
      "A": "EFS为NFS，不提供原生Windows SMB/NTFS ACL。",
      "B": "Lustre面向Linux HPC，不是Windows AD文件共享。",
      "C": "原生Windows共享存储、域加入与多AZ实例完整。",
      "D": "EFS同样不满足Windows文件语义。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/fsx/latest/WindowsGuide/what-is.html",
        "title": "What is FSx for Windows File Server",
        "supports": "原生Windows文件系统、SMB、AD集成，适合内容管理。"
      }
    ],
    "audit_caveat": "C必须明确FSx Multi-AZ；应用还需支持并发访问/锁定，不能让客户端本地缓存破坏共享一致性。",
    "audit_status": "confirmed"
  },
  "140": {
    "blocker": "一家基于软体即服务 (SaaS) 的公司向客户提供案例管理解决方案 A3 解决方案的一部分。该公司使用独立的简单邮件传输协定 (SMTP) 伺服器从应用程式发送电子邮件。该应用程式还储存用于确认电子邮件讯息的电子邮件模板，该模板在应用程式将电子邮件讯息发送给客户之前填充客户资料。该公司计划将此讯息功能迁移到AWS云，并需要最大限度地减少营运开销。哪一种解决方案能够最具成本效益地满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：SES模板渲染加托管邮件发送最直接。"
    ],
    "solutions": "正确答案为 D。SES托管发送并存带占位符的模板，Lambda调用模板发送API传客户数据与收件人即可，去除SMTP服务器和自行合并模板逻辑。",
    "result_flow": "SendTemplatedEmail为v1 API；v2可用SendEmail的Template内容，概念相同。需验证域名及处理退信/渲染失败通知。",
    "options": {
      "A": "保留EC2 SMTP运维且自建合并。",
      "B": "SES发送正确，但S3取模板和自行合并比原生模板更费开发。",
      "C": "既建SES模板又保留Marketplace SMTP，组件冗余。",
      "D": "SES模板渲染加托管邮件发送最直接。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/ses/latest/dg/send-personalized-email-api.html",
        "title": "Using templates to send personalized email with SES API",
        "supports": "SES支持保存模板并在发送时注入变量。"
      }
    ],
    "audit_caveat": "SendTemplatedEmail为v1 API；v2可用SendEmail的Template内容，概念相同。需验证域名及处理退信/渲染失败通知。",
    "audit_status": "confirmed"
  },
  "141": {
    "blocker": "某公司正在使用 Auto Scaling 群组中的 Amazon EC2 实例处理AWS 云端中的影片。处理一个视讯需要 30 分钟 多个 EC2 实例根据 Amazon Simple Queue Service (Amazon SQS) 伫列中的视讯数量进行缩放。该公司已使用重新驱动策略来配置 SQS 伫列，该策略指定目标死信伫列且 maxReceiveCount 为 1。该公司已将 SQS 队列的可见度逾时设定为 1 小时。公司设定了AmazonCloudWatch警报，当死信队列中有讯息时通知开发团队。白天好几次。开发团队收到讯息位于死信队列中且影片尚未处理的通知。调查发现应用程式日志中没有错误。公司如何解决这个问题？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：保护正在处理任务的实例免遭缩容。"
    ],
    "solutions": "正确答案为 C。视频处理中实例被缩容终止，消息未删除，再次接收即触发maxReceiveCount=1而进DLQ；在处理期间开启实例缩容保护、完成后解除。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "EC2终止保护不阻止Auto Scaling缩容终止。",
      "B": "处理30分钟且可见性已1小时，延长不能防止实例被杀。",
      "C": "保护正在处理任务的实例免遭缩容。",
      "D": "maxReceiveCount不能用0来解决任务中断。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-using-sqs-queue.html",
        "title": "Scaling policy based on Amazon SQS",
        "supports": "AWS示例在处理消息时启用instance scale-in protection，完成后解除。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "142": {
    "blocker": "一家公司开发了使用 Amazon API Gateway 和 Regional 端点的 API。 API 呼叫使用 API Gateway 验证机制的 AWS Lambda 函数。经过设计审查后，解决方案架构师确定了一组不需要公共存取的 API。解决方案架构师必须设计一个解决方案，使这组 API 只能从 VPC 存取。所有 API 都需要由经过验证的使用者呼叫 哪种解决方案能够以最少的努力满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：私有API与接口端点、资源策略共同限制VPC访问。"
    ],
    "solutions": "正确答案为 C。将REST API改为private，通过interface VPC endpoint访问，资源策略限制来源，同时保留原API Gateway身份认证。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "ALB替换API Gateway会丢失现有API认证配置，改动较大。",
      "B": "DNS隐藏不构成访问控制。",
      "C": "私有API与接口端点、资源策略共同限制VPC访问。",
      "D": "自建Apache代理增加维护，Lambda入VPC不等于API私有。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-private-api-create.html",
        "title": "Create a private API",
        "supports": "私有REST API通过接口端点调用，并用SourceVpc/SourceVpce资源策略授予访问。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "143": {
    "blocker": "气象服务透过托管在 eu-west-1 Region 的 AWS 上的 Web 应用程式提供高解析度天气地图。天气地图经常更新并与静态 HTML 内容一起储存在 Amazon S3 中。 Web 应用程式的前端是 Amazon CloudFront。该公司最近扩展到为 us-east-1 Region 的用户提供服务，这些新用户报告说，查看各自的天气地图有时很慢。哪种步骤组合可以解决 us-east-1 效能问题？ （选两个。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：跨区域复制提供本地源数据。",
      "D：按用户地域切换到已复制的本地源站。"
    ],
    "solutions": "正确答案为 B、D。频繁更新使缓存未命中时跨大西洋回源，先复制到us-east-1，再用origin-request Lambda@Edge为北美用户选择当地S3源站。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "Global Accelerator不能直接将S3桶设为标准加速器端点。",
      "B": "跨区域复制提供本地源数据。",
      "C": "Transfer Acceleration用于到桶传输，不是创建us-east-1内容副本。",
      "D": "按用户地域切换到已复制的本地源站。",
      "E": "S3不是Global Accelerator标准支持端点。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-examples.html",
        "title": "Lambda@Edge example functions",
        "supports": "官方示例通过CloudFront-Viewer-Country在origin-request改变S3源站区域以降低时延。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "144": {
    "blocker": "解决方案架构师正在调查公司无法在 Amazon 工作区中建立新会话的问题。初步分析显示该问题涉及使用者设定档。 Amazon 工作空间环境配置为使用 Windows 档案伺服器的 Amazon FSx 作为设定档共用储存。 Windows 档案伺服器档案系统的FSx 配置了 10 TB 的储存空间。解决方案架构师发现档案系统已达到最大容量。解决方案架构师必须确保使用者可以重新获得存取权限。解决方案还必须防止问题再次发生。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：立即扩容与后续自动扩容兼顾。"
    ],
    "solutions": "正确答案为 B。先通过update-file-system扩容恢复空间，再监测FreeStorageCapacity并自动触发Lambda扩容，避免再次耗尽。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "Lustre不是Windows用户配置文件SMB共享的直接替代。",
      "B": "立即扩容与后续自动扩容兼顾。",
      "C": "仅监测和描述Step Functions，未明确立即扩容或报警触发机制。",
      "D": "拆分用户文件系统需要迁移管理，仍会再次满。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/fsx/latest/WindowsGuide/automate-storage-capacity-increase.html",
        "title": "Increasing FSx storage capacity dynamically",
        "supports": "官方方案以空闲容量阈值、CloudWatch告警、Lambda增加容量。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "145": {
    "blocker": "一家国际快递公司在AWS上托管了一个快递管理系统。司机使用该系统上传交货确认讯息。确认包括收件人的签名或收件人与包裹的照片。驾驶者的手持装置透过FTP将签名和照片上传到单一Amazon EC2实例。每个手持设备都会根据登入使用者在目录中保存一个文件，并且文件名称与交付编号相符。然后，EC2 实例在查询中央资料库以提取传递资讯后将元资料新增至档案。然后将该档案放置在 Amazon S3 中进行存档。随著公司的扩张，司机报告说系统拒绝连接。 FTP 伺服器因连线中断和记忆体问题而出现问题，为了因应这些问题，系统工程师安排了一个 cron 任务，每 30 分钟重新启动 EC2 实例。计费团队报告说，文件并不总是在存档中，并且中央系统并不总是更新。解决方案架构师需要设计一个解决方案，最大限度地提高可扩充性，以确保存档始终收到档案并且系统始终更新。手持设备无法修改，因此公司无法部署新的应用程式。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：托管FTP入口和事件处理消除单机上传处理瓶颈。"
    ],
    "solutions": "正确答案为 C。保留设备FTP协议，用Transfer Family托管上传至S3，通过事件驱动Lambda补充元数据和更新配送系统。",
    "result_flow": "FTP端点须经支持的VPC网络访问；事件处理需幂等与重试，不能承诺业务绝不丢失。",
    "options": {
      "A": "ALB不支持FTP，多台实例也不能修复协议支持问题。",
      "B": "EFS方案仍由原EC2串行处理，保留瓶颈。",
      "C": "托管FTP入口和事件处理消除单机上传处理瓶颈。",
      "D": "题干明确设备不可修改。"
    },
    "sources": [
      {
        "url": "https://aws.amazon.com/aws-transfer-family/faqs/",
        "title": "AWS Transfer Family FAQs",
        "supports": "Transfer Family支持FTP到S3及上传后事件/Lambda工作流。"
      }
    ],
    "audit_caveat": "FTP端点须经支持的VPC网络访问；事件处理需幂等与重试，不能承诺业务绝不丢失。",
    "audit_status": "confirmed"
  },
  "146": {
    "blocker": "一家公司正在AWS云端中运行应用程式。该应用程式在Amazon Elastic Container Service (Amazon ECS)集群中的容器上运行。 ECS 任务使用 Fargate 启动类型。应用程式的资料是关系型的，储存在AmazonAuroraMySQL中。为了满足监管要求，应用程式必须能够在应用程式发生故障时恢复到单独的 AWS Region。如果发生故障，任何资料都不会遗失。哪种解决方案能够以最少的营运开销满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：跨区域只读集群能容灾但有复制延迟，不等于零数据丢失。"
    ],
    "solutions": "参考选择为 A。A是选项中跨区域恢复运维最少的方案，但跨区域Aurora复制是异步，无法保证突发区域故障下RPO=0；本题的绝不丢数据要求无严格满足选项。",
    "result_flow": "题干“no data can be lost”与所有选项冲突；保留A为最接近答案，不能当作严格标准答案。",
    "options": {
      "A": "跨区域只读集群能容灾但有复制延迟，不等于零数据丢失。",
      "B": "DataSync不用于持续同步Aurora数据库事务。",
      "C": "DMS持续复制异步且运维更复杂，也不保证RPO=0。",
      "D": "DLM管理EBS快照，不提供Aurora跨区域零损失恢复。"
    },
    "sources": [
      {
        "url": "https://aws.amazon.com/rds/faqs/",
        "title": "Amazon RDS FAQs",
        "supports": "官方明确RDS/Aurora只读副本复制异步。"
      }
    ],
    "audit_caveat": "题干“no data can be lost”与所有选项冲突；保留A为最接近答案，不能当作严格标准答案。",
    "audit_status": "ambiguous"
  },
  "147": {
    "blocker": "一家金融服务公司从其信用卡服务合作伙伴处定期接收资料。每 15 分钟就会以明文形式发送约 5,000 笔记录，透过伺服器端加密透过 HTTPS 直接传送到Amazon S3 储存桶中。此 Feed 包含敏感的信用卡主帐号 (PAN) 资料。该公司需要在将资料发送到另一个S3储存桶进行额外的内部处理之前自动屏蔽 PAN。公司还需要删除并合并特定字段，然后将记录转换为JSON格式。此外，未来可能会添加额外的提要，因此任何设计都需要易于扩展。哪些解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：Glue提供托管ETL与JSON输出，符合可扩展转换。"
    ],
    "solutions": "正确答案为 C。Glue以crawler/classifier识别数据格式，在ETL中遮蔽PAN、删除合并字段并输出JSON到另一S3桶，易扩展更多输入。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "队列清空并不代表全部处理完成，多Lambda汇总复杂且不可靠。",
      "B": "单容器轮询及清空判断增加编排和容量管理。",
      "C": "Glue提供托管ETL与JSON输出，符合可扩展转换。",
      "D": "Athena查询不是启动EMR作业的原生触发机制，且需管理EMR。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/glue/latest/dg/aws-glue-programming-etl-format-json-home.html",
        "title": "Using the JSON format in AWS Glue",
        "supports": "Glue DynamicFrame写入支持format=json并输出S3。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "148": {
    "blocker": "一家公司希望使用 AWS 创建业务连续性解决方案，以防公司的主要 on-premises 应用程式出现故障。该应用程式在也运行其他应用程式的实体伺服器上运行。该公司计划迁移的 on-premises 应用程式使用 MySQL 资料库作为资料储存。本公司所有on-premises应用程式均使用与Amazon EC2相容的作业系统。哪种解决方案能够以最少的营运开销实现公司的目标？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：DRS专门处理持续灾备、恢复和回切。"
    ],
    "solutions": "正确答案为 B。DRS将物理服务器块级复制到AWS，以恢复启动设置启动EC2，并执行灾备演练及回切，减少重建应用的工作。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "描述较像一次性迁移，未明确DRS初始化及恢复流程。",
      "B": "DRS专门处理持续灾备、恢复和回切。",
      "C": "SCT不提供所述本地CDC任务，且手工重装应用开销高。",
      "D": "需改造存储并依赖周期快照、手工恢复。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/drs/latest/userguide/quick-start-guide-gs.html",
        "title": "Elastic Disaster Recovery quick start guide",
        "supports": "DRS通过Replication Agent纳管源服务器，配置launch settings后启动drill/recovery实例。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "149": {
    "blocker": "公司须接受对其财务资讯的监管审计。使用单一AWS帐户的外部审计师需要存取公司的AWS帐户。解决方案架构师必须为审核员提供对公司AWS帐户的安全性、唯读存取权限。此解决方案必须符合AWS安全最佳实务。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：跨账户角色、最小权限及ExternalId是推荐组合。"
    ],
    "solutions": "正确答案为 B。在公司账户建立只读跨账户角色，信任审计方账户并要求唯一ExternalId，以临时凭证授权并降低混淆代理风险。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "并非所有资源支持资源策略，ExternalId是AssumeRole信任条件。",
      "B": "跨账户角色、最小权限及ExternalId是推荐组合。",
      "C": "共享长期访问密钥不符合最佳实践。",
      "D": "逐人本地IAM用户增加长期凭证与人员管理。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_common-scenarios_third-party.html",
        "title": "Access to AWS accounts owned by third parties",
        "supports": "第三方通过带ExternalId条件的信任策略承担角色，获得临时凭证。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "150": {
    "blocker": "一家公司拥有一个对延迟敏感的交易平台，该平台使用Amazon DynamoDB作为储存后端。该公司将DynamoDB表配置为使用按需容量模式。解决方案架构师需要设计一个解决方案来提高交易平台的效能。新的解决方案必须确保交易平台的高可用性。哪种解决方案能够以最少的延迟满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：三节点并缓存读；写直达表可省去缓存写路径。"
    ],
    "solutions": "正确答案为 B。高可用DAX需至少3节点并分散AZ，读走缓存可降至微秒；B在给定选项中同时满足缓存读与容错。",
    "result_flow": "写绕过DAX会导致缓存旧值保留到TTL；交易业务若要求强一致读取，DAX不适用。题干未要求强一致。",
    "options": {
      "A": "两节点不满足DAX故障容错建议。",
      "B": "三节点并缓存读；写直达表可省去缓存写路径。",
      "C": "读直接DynamoDB不能获得DAX缓存读取时延优势。",
      "D": "单节点不容错。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DAX.concepts.cluster.html",
        "title": "DAX cluster components",
        "supports": "AWS明确生产容错至少三节点跨AZ部署。"
      }
    ],
    "audit_caveat": "写绕过DAX会导致缓存旧值保留到TTL；交易业务若要求强一致读取，DAX不适用。题干未要求强一致。",
    "audit_status": "confirmed"
  },
  "151": {
    "blocker": "一家公司已将应用程式从本地迁移到AWS。应用程式前端是一个静态网站，在 Application Load Balancer (ALB) 后面的两个 Amazon EC2 实例上运行。应用程式后端是一个 Python 应用程序，在另一个 ALB 后面的三个 EC2 实例上运行。 EC2 实例是大型通用按需实例，其大小可满足应用程式峰值所使用的on-premises 规范。该应用程式平均每月有数十万个请求。然而，该应用程式主要在午餐时间使用，在一天的其余时间接收的流量很少。解决方案架构师需要优化应用程式的基础架构成本，而不会对应用程式可用性产生负面影响。哪一种步骤组合可以满足这些要求？ （选两个。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：S3托管静态资源无需两台Web服务器。",
      "E：突发型在低负载积累积分以承接短高峰。"
    ],
    "solutions": "正确答案为 B、E。静态前端迁到S3消除常驻EC2；后端长时间低负载、午间突发，适合可累积CPU积分的T系列突发型。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "相同核数计算优化未必适配且不能消除低利用成本。",
      "B": "S3托管静态资源无需两台Web服务器。",
      "C": "Beanstalk沿用相同实例，成本没有根本降低。",
      "D": "后端全Spot增加被中断风险。",
      "E": "突发型在低负载积累积分以承接短高峰。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/burstable-credits-baseline-concepts.html",
        "title": "Key concepts for burstable performance instances",
        "supports": "低于baseline积累CPU credits，短时高于baseline消耗积分。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "152": {
    "blocker": "一家公司正在AWS上运行活动票务平台，并希望优化该平台的成本效益。该平台部署在 Amazon Elastic Kubernetes Service (Amazon EKS) 和 Amazon EC2 上，并由 MySQL 资料库实例的 Amazon RDS 支援。该公司正在开发新的应用程式功能，可在 Amazon EKS 和 AWS Fargate 上运行。该平台很少出现需求高峰。需求的激增取决于活动日期。哪种解决方案将为平台提供最具成本效益的设定？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：基线Compute SP+峰值Spot兼顾折扣和Fargate灵活性。"
    ],
    "solutions": "正确答案为 D。按稳定基线购买Compute Savings Plans，兼容现有EC2及将来Fargate；短峰用Spot，RDS只为基线购全预付预留、峰期临时扩容。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "数据库按全年峰值买RI导致长期闲置，且计算RI不能覆盖Fargate。",
      "B": "按中位负载承诺容易浪费，容量预留本身不带折扣。",
      "C": "EC2 Instance Savings Plans不能覆盖Fargate。",
      "D": "基线Compute SP+峰值Spot兼顾折扣和Fargate灵活性。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/savingsplans/latest/userguide/sp-services.html",
        "title": "Services eligible for Savings Plans benefits",
        "supports": "Compute SP适用EC2、Fargate、Lambda；EC2 Instance SP仅EC2。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "corrected"
  },
  "153": {
    "blocker": "某公司在AWSElastic Beanstalk上部署了一个应用程式。该应用程式使用 Amazon Aurora 作为资料库层。 Amazon CloudFront 发行版服务 Web 请求，并包含 Elastic Beanstalk 网域作为来源伺服器。此分发配置了访客在存取应用程式时使用的备用网域名称。每周，该公司都会停止使用该应用程式以进行日常维护。在应用程式无法使用期间，该公司希望访客收到资讯性讯息，而不是CloudFront错误讯息。解决方案架构师创建一个Amazon S3储存桶作为流程的第一步。解决方案架构师下一步应该采取哪些步骤组合来满足要求？ （选择三项。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：必须先有维护提示内容。",
      "C：原分配增加受保护S3源站。",
      "D：默认缓存行为可指向不同源站并在维护后恢复。"
    ],
    "solutions": "正确答案为 A、C、D。将维护提示静态文件上传S3，把其添加为原CloudFront分配的第二源站，用OAI限制桶访问，维护期间切换默认行为的源站。",
    "result_flow": "已有缓存可能继续返回旧页面，需按实际需求失效缓存和映射请求路径；新实现优先OAC，OAI为旧机制。",
    "options": {
      "A": "必须先有维护提示内容。",
      "B": "新建分配需额外域名切换，非必要。",
      "C": "原分配增加受保护S3源站。",
      "D": "默认缓存行为可指向不同源站并在维护后恢复。",
      "E": "另一个分配的行为不改变现有用户入口。",
      "F": "Beanstalk没有将环境配置成S3静态源站的该功能。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/DownloadDistValuesCacheBehavior.html",
        "title": "Cache behavior settings",
        "supports": "行为Origin或Origin group指定匹配请求发送的源站。"
      }
    ],
    "audit_caveat": "已有缓存可能继续返回旧页面，需按实际需求失效缓存和映射请求路径；新实现优先OAC，OAI为旧机制。",
    "audit_status": "confirmed"
  },
  "154": {
    "blocker": "一家公司让用户能够从自订应用程式上传图像。上传过程呼叫AWS Lambda函数来处理映像并将其储存在Amazon S3储存桶中。应用程式使用特定函数版本ARN呼叫Lambda函数。 Lambda 函数使用环境变数接受影像处理参数。公司经常调整Lambda函数的环境变数以达到最佳的影像处理输出。该公司测试了不同的参数，并在验证结果后发布了具有更新的环境变数的新函数版本。此更新过程还需要频繁更改自订应用程式以呼叫新功能版本ARN。这些变更会导致使用者中断。解决方案架构师需要简化此流程，以最大程度地减少对使用者的干扰。哪种解决方案能够以最少的营运开销满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：别名为版本提供可切换的稳定引用。"
    ],
    "solutions": "正确答案为 D。客户端只调用稳定alias ARN，测试后将别名指向新版本，不再每次改客户端版本ARN。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "已发布版本配置含环境变量不可变。",
      "B": "引入DynamoDB和代码改造比别名复杂。",
      "C": "硬编码仍需发布新版本并修改客户端。",
      "D": "别名为版本提供可切换的稳定引用。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/lambda/latest/dg/configuration-aliases.html",
        "title": "Create an alias for a Lambda function",
        "supports": "Lambda alias是指向特定函数版本的指针，可重新指向新版本。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "155": {
    "blocker": "一家全球媒体公司正在计划对应用程式进行多Region 部署。 Amazon DynamoDB 全域表将支援部署，以保持使用者集中的两大洲的使用者体验一致。每个部署都会有一个公共的Application Load Balancer (ALB)。公司内部管理公共DNS。该公司希望透过顶级网域提供该应用程式。哪种解决方案能够以最少的努力满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：固定IP直接用于现有DNS顶级域A记录。"
    ],
    "solutions": "正确答案为 C。Global Accelerator为多个区域ALB提供固定任播IP，现有DNS可在apex创建A记录，无需迁移DNS。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "apex不能使用普通CNAME。",
      "B": "CNAME不能指向IP且apex不能用普通CNAME。",
      "C": "固定IP直接用于现有DNS顶级域A记录。",
      "D": "额外代理且仍错误使用apex CNAME。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/global-accelerator/latest/dg/introduction-how-it-works.html",
        "title": "How AWS Global Accelerator works",
        "supports": "加速器固定IP关联一个或多个区域的ALB等端点。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "156": {
    "blocker": "一家公司正在使用 Amazon API Gateway 和 AWS Lambda 开发新的无伺服器 API。该公司将 Lambda 函数与 API Gateway 集成，以使用多个共享库和自订类别。解决方案架构师需要简化解决方案的部署并最佳化程式码重复使用。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：Lambda支持从ECR镜像部署，包含代码与依赖。"
    ],
    "solutions": "正确答案为 D。将代码与共享依赖打包为容器镜像、推送ECR，并作为Lambda镜像部署包复用；Lambda layer不是Docker镜像。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "Layer必须zip，不能用S3 Docker镜像作layer。",
      "B": "ECR镜像不能作为zip函数layer。",
      "C": "ECS运行的容器不是Lambda layer。",
      "D": "Lambda支持从ECR镜像部署，包含代码与依赖。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/lambda/latest/dg/images-create.html",
        "title": "Create a Lambda function using a container image",
        "supports": "镜像推送ECR并据此创建Lambda函数。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "157": {
    "blocker": "一家制造公司正在为其工厂建造检查解决方案。该公司在每条装配线的末端都配备了 IP 摄影机。该公司使用 Amazon SageMaker 训练机器学习 (ML) 模型，以识别静态影像中的常见缺陷。该公司希望在检测到缺陷时向工厂工人提供本地回馈。即使工厂的网路连线中断，公司也必须能够提供此回馈。该公司有一个本地 Linux 伺服器，托管一个 API，为员工提供本地回馈。公司应该如何部署ML模型来满足这些需求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：本地模型与处理组件消除实时云连接依赖。"
    ],
    "solutions": "正确答案为 B。在本地Linux运行Greengrass组件及模型，直接读取相机图像、推理并调用本地API，断网仍能反馈。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "云视频与云推理依赖互联网。",
      "B": "本地模型与处理组件消除实时云连接依赖。",
      "C": "Snowball不能部署SageMaker托管endpoint服务，且额外设备非必要。",
      "D": "Monitron用于设备状态监测，不是自定义相机视觉模型平台。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/greengrass/v2/developerguide/perform-machine-learning-inference.html",
        "title": "Perform machine learning inference",
        "supports": "Greengrass支持在边缘设备对本地产生数据运行云训练模型。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "158": {
    "blocker": "解决方案架构师必须创建一个业务案例，将公司的on-premises资料中心迁移到AWS云端。解决方案架构师将使用公司所有伺服器的组态管理资料库 (CMDB) 汇出来建立案例。哪一种解决方案能够最具成本效益地满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：已有数据导入Migration Evaluator正合场景。"
    ],
    "solutions": "正确答案为 B。Migration Evaluator专用于迁移商业论证，可用数据导入模板接收已有CMDB导出，避免重建自定义成本匹配工具。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "Well-Architected评估架构最佳实践，不直接导入CMDB生成迁移成本论证。",
      "B": "已有数据导入Migration Evaluator正合场景。",
      "C": "自建实例匹配和价格分析工作量高。",
      "D": "Application Discovery偏发现和迁移资产，不是此题最直接商业案例工具。"
    },
    "sources": [
      {
        "url": "https://aws.amazon.com/migration-evaluator/getting-started/",
        "title": "Getting Started with Migration Evaluator",
        "supports": "官方提供Data Import Template接收本地服务器工作负载信息。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "159": {
    "blocker": "一家公司有一个网站，在 Application Load Balancer (ALB) 后面的 Amazon EC2 实例上运行。这些实例位于 Auto Scaling 群组中。 ALB 与 AWS WAF Web ACL 关联。网站经常遭遇应用层攻击。这些攻击会导致应用程式伺服器上的流量突然显著增加。访问日志显示，每次攻击都源自于不同的IP位址。解决方案架构师需要实施一个解决方案来减轻这些攻击。哪种解决方案能够以最少的营运开销满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：Shield Advanced保护ALB并结合WAF识别应用层攻击。"
    ],
    "solutions": "正确答案为 B。攻击源IP不断变化，应利用Shield Advanced和WAF的应用层DDoS检测/缓解能力，避免手工维护单IP黑名单。",
    "result_flow": "保护资源后仍须按需配置WAF缓解；2026年官方优先推荐Anti-DDoS Managed Rule Group。",
    "options": {
      "A": "CloudWatch告警不能直接执行所述IP黑名单动作，需自定义流水线。",
      "B": "Shield Advanced保护ALB并结合WAF识别应用层攻击。",
      "C": "路由表不提供按来源IP拒绝规则。",
      "D": "地理DNS策略不等于拒绝访问且易误伤。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/waf/latest/developerguide/ddos-automatic-app-layer-response.html",
        "title": "Automating application layer DDoS mitigation with Shield Advanced",
        "supports": "Shield Advanced对受保护ALB结合WAF自动管理应用层缓解规则。"
      }
    ],
    "audit_caveat": "保护资源后仍须按需配置WAF缓解；2026年官方优先推荐Anti-DDoS Managed Rule Group。",
    "audit_status": "confirmed"
  },
  "160": {
    "blocker": "一家公司有一个关键应用程序，其中资料层部署在单一AWSRegion中。资料层使用Amazon DynamoDB表和AmazonAuroraMySQL资料库集群。目前的AuroraMySQL引擎版本支援全域资料库。应用层已部署在两个Regions中。公司政策规定，关键应用程式必须跨两个Regions部署应用程式层元件和资料层元件。 RTO 和 RPO 每个不得超过几分钟。解决方案架构师必须建议一个解决方案，使资料层符合公司政策。哪一种步骤组合可以满足这些要求？ （选两个。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：Aurora全球数据库在集群级添加区域副本。",
      "D：DynamoDB global table提供跨区域数据副本。"
    ],
    "solutions": "正确答案为 A、D。Aurora启用global database并增加第二Region，DynamoDB添加global table副本，两者持续跨区复制支持分钟级恢复目标。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "Aurora全球数据库在集群级添加区域副本。",
      "B": "不是逐表添加Aurora区域。",
      "C": "定时备份恢复难保几分钟RTO/RPO。",
      "D": "DynamoDB global table提供跨区域数据副本。",
      "E": "ARC不是通用数据库备份恢复服务。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database.html",
        "title": "Using Amazon Aurora global databases",
        "supports": "Aurora global database通过多个区域的集群提供跨区域灾备和低延迟复制。"
      },
      {
        "url": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GlobalTables.html",
        "title": "DynamoDB global tables",
        "supports": "global table托管多区域复制，提供各区域本地读写。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "161": {
    "blocker": "一家电信公司正在 AWS 上运行一个应用程式。本公司在公司on-premises资料中心与AWS之间建立了AWS Direct Connect连线。该公司将该应用程式部署在内部 Application Load Balancer (ALB) 后面的多个 Availability Zones 中的 Amazon EC2 实例上。本公司的客户端使用HTTPS从on-premises网路进行连线。 TLS 终止于ALB。本公司有多个目标群体，采用基于路径的路由，根据URL路径转送请求。该公司计划部署一个on-premises 防火墙设备，并具有基于 IP 位址的允许清单。解决方案架构师必须开发一种解决方案，允许流量从on-premises网路流向AWS，以便客户端可以继续存取应用程式。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：NLB前置ALB同时提供固定IP与七层路由。"
    ],
    "solutions": "正确答案为 B。内部NLB提供每AZ固定私有IP，把现有ALB注册为alb类型目标，保留TLS终止和路径路由，再将NLB地址加入防火墙白名单。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "ALB不能由用户配置固定IP。",
      "B": "NLB前置ALB同时提供固定IP与七层路由。",
      "C": "删除ALB会失去URL路径路由。",
      "D": "GWLB不是面向普通HTTPS客户端的NLB替代，也无alb目标类型。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/elasticloadbalancing/latest/network/application-load-balancer-target.html",
        "title": "Use Application Load Balancers as targets of a Network Load Balancer",
        "supports": "NLB可用ALB类型target group组合NLB固定IP与ALB七层路由。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "162": {
    "blocker": "一家公司在一组Amazon EC2实例上运行一个应用程序，这些实例位于面向互联网的Application Load Balancer (ALB)后面的私有子网中。 ALB 是Amazon CloudFront 发行版的起源。包含各种 AWS 托管规则的 AWS WAF Web ACL 与 CloudFront 发行版关联。该公司需要一种解决方案来阻止网路流量直接存取ALB。哪种解决方案能够以最少的营运开销满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：托管前缀列表随AWS地址变化自动维护。"
    ],
    "solutions": "正确答案为 C。ALB安全组引用AWS托管CloudFront origin-facing前缀列表，无需自行维护变化的边缘IP范围。",
    "result_flow": "前缀列表允许来自所有CloudFront分配的流量；如需仅允许自己的分配，另加自定义源站header验证。",
    "options": {
      "A": "复制WAF规则并不能禁止绕过CloudFront直接请求ALB。",
      "B": "CloudFront全局ACL不能直接复用于区域ALB，且WAF本身不限制来源。",
      "C": "托管前缀列表随AWS地址变化自动维护。",
      "D": "手工维护IP段比托管前缀列表开销高。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/LocationsOfEdgeServers.html",
        "title": "Use the CloudFront managed prefix list",
        "supports": "CloudFront origin-facing托管前缀列表可用于源站安全组。"
      }
    ],
    "audit_caveat": "前缀列表允许来自所有CloudFront分配的流量；如需仅允许自己的分配，另加自定义源站header验证。",
    "audit_status": "confirmed"
  },
  "163": {
    "blocker": "一家公司正在运行一个应用程序，该应用程式使用 Redis 集群的 Amazon ElastiCache 作为快取层。最近的安全审计显示，该公司已为 ElastiCache 配置静态加密。然而，该公司并未将ElastiCache配置为在传输过程中使用加密。此外，用户无需身份验证即可存取快取。解决方案架构师必须进行更改以要求用户身份验证并确保公司使用端对端加密。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：新集群同时启用TLS/AUTH并安全保存token，方案有效。"
    ],
    "solutions": "参考选择为 A。A新建开启TLS和AUTH的集群在支持AUTH的版本中成立；但新版Redis OSS 7+允许现有集群就地开启TLS并启用AUTH，因此B也可能成立，题干缺少引擎版本无法唯一排除B。",
    "result_flow": "版本未注明；不能把B泛称为错误。A为跨版本稳妥方案，现代版本B同样可行。",
    "options": {
      "A": "新集群同时启用TLS/AUTH并安全保存token，方案有效。",
      "B": "Redis7+可就地将TLS preferred迁到required，再以ROTATE/SET强制AUTH；旧版本须升级或重建。",
      "C": "ElastiCache不支持用自建客户端证书替代AUTH来做mTLS。",
      "D": "自建客户端证书不是ElastiCache支持的认证方案。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/in-transit-encryption.html",
        "title": "ElastiCache in-transit encryption (TLS)",
        "supports": "修改现有复制组TLS支持Redis OSS7+；ElastiCache不支持mTLS。"
      }
    ],
    "audit_caveat": "版本未注明；不能把B泛称为错误。A为跨版本稳妥方案，现代版本B同样可行。",
    "audit_status": "ambiguous"
  },
  "164": {
    "blocker": "一家公司正在使用 Auto Scaling 群组中的 Amazon EC2 Spot 实例运行计算工作负载。启动范本使用两个置放群组和单一实例类型。最近，监控系统报告了Auto Scaling实例启动失败，这与系统使用者等待时间较长有关。公司需要提高工作负载的整体可靠性。哪种解决方案可以满足这个要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：按vCPU、内存等属性选择多类型实例。"
    ],
    "solutions": "正确答案为 B。单实例类型Spot容量池不足造成启动失败，应在launch template采用属性选择，拓宽兼容实例池提升容量可用性。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "属性选择依赖launch template，不应退回launch configuration。",
      "B": "按vCPU、内存等属性选择多类型实例。",
      "C": "增加placement group不能扩展实例类型容量池。",
      "D": "仅换大规格仍是单一容量池。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/autoscaling/ec2/userguide/create-launch-template.html",
        "title": "Create a launch template for an Auto Scaling group",
        "supports": "launch template支持指定vCPU/内存等属性以自动匹配实例类型。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "165": {
    "blocker": "一家公司正在将文件处理工作负载迁移到AWS。该公司已经更新了许多应用程序，以本地使用Amazon S3 API 来储存、检索和修改处理伺服器以大约每秒 5 个文件的速度生成的文件。文件处理完成后，客户可以直接从Amazon S3下载文件。在迁移过程中，该公司发现无法立即更新产生大量文件的处理伺服器以支援S3 API。伺服器在 Linux 上运行，需要对伺服器产生和修改的档案进行快速本地存取。当伺服器完成处理后，这些文件必须在 30 分钟内可供公众下载。哪种解决方案能够以最少的努力满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：NFS挂载File Gateway保留文件接口，本地缓存支持低延迟。"
    ],
    "solutions": "正确答案为 B。S3 File Gateway提供NFS文件访问和本地缓存，写回S3；对象被其他S3应用修改后调用RefreshCache刷新网关目录/缓存，改造最少。",
    "result_flow": "File Gateway异步上传，需保证带宽和缓存容量以满足30分钟目标；RefreshCache用于S3侧变更，不会强制上传本地写入。",
    "options": {
      "A": "题干不能立即改造生成服务器，Lambda迁移违反前提。",
      "B": "NFS挂载File Gateway保留文件接口，本地缓存支持低延迟。",
      "C": "FSx Lustre须Lustre客户端以lustre协议挂载，不是NFS；选项包含致命协议错误。",
      "D": "DataSync需管理任务且双向同步冲突及调度更复杂。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/fsx/latest/LustreGuide/install-lustre-client.html",
        "title": "Installing the Lustre client",
        "supports": "FSx Lustre通过Lustre客户端访问，不支持该选项所说NFS挂载。"
      }
    ],
    "audit_caveat": "File Gateway异步上传，需保证带宽和缓存容量以满足30分钟目标；RefreshCache用于S3侧变更，不会强制上传本地写入。",
    "audit_status": "confirmed"
  },
  "166": {
    "blocker": "一家送货公司正在 AWS 云端运行无伺服器解决方案。该解决方案管理用户资料、送货资讯和过去的购买详细资讯。该解决方案由多个微服务组成。中央用户服务将敏感资料储存在Amazon DynamoDB表中。其他几个微服务将部分敏感资料的副本储存在不同的储存服务中。公司需要能够根据请求删除用户资讯。一旦中央用户服务删除用户，其他所有微服务也必须立即删除其资料副本。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：每服务独立EventBridge规则可扇出删除事件。"
    ],
    "solutions": "正确答案为 C。中心服务发布用户删除事件到EventBridge，各微服务各自规则订阅并删除自身数据副本，实现事件广播。",
    "result_flow": "异步系统为近实时最终一致，不能保证物理意义同时立即删除；生产须重试、DLQ与幂等。",
    "options": {
      "A": "单SQS队列是竞争消费，不能保证每个微服务都收到。",
      "B": "DynamoDB没有选项描述的原生SNS事件通知功能，应经Streams等处理。",
      "C": "每服务独立EventBridge规则可扇出删除事件。",
      "D": "SQS队列不提供给每个消费者的独立事件过滤订阅。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-event-bus.html",
        "title": "Amazon EventBridge event bus",
        "supports": "同一事件可匹配多个规则，每规则投递到目标。"
      }
    ],
    "audit_caveat": "异步系统为近实时最终一致，不能保证物理意义同时立即删除；生产须重试、DLQ与幂等。",
    "audit_status": "confirmed"
  },
  "167": {
    "blocker": "一家公司正在 VPC 中运行 Web 应用程式。 Web 应用程式在 Application Load Balancer (ALB) 后面的一组 Amazon EC2 实例上运行。 ALB正在使用AWSWAF。外部客户需要连接到 Web 应用程式。公司必须向所有外部客户提供 IP 位址。哪种解决方案能够以最少的营运开销满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：标准加速器可指向ALB并提供固定IP。"
    ],
    "solutions": "正确答案为 C。Global Accelerator为现有ALB提供固定公网IP，保留ALB上的WAF保护且不必重构。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "NLB不能直接关联WAF web ACL，替换会丢失既有防护。",
      "B": "不能将EIP直接绑定ALB。",
      "C": "标准加速器可指向ALB并提供固定IP。",
      "D": "CloudFront DNS解析出的共享边缘IP并非该分配固定地址。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/global-accelerator/latest/dg/introduction-how-it-works.html",
        "title": "How AWS Global Accelerator works",
        "supports": "Global Accelerator的固定任播IP可关联ALB端点。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "168": {
    "blocker": "一家公司有几个 AWS 帐户用于开发，并希望将其生产应用程式迁移到 AWS。本公司仅需要在目前生产帐户和未来生产帐户上强制执行 Amazon 弹性区块储存 (Amazon EBS) 加密。该公司需要一个包含内建蓝图和护栏的解决方案。哪一种步骤组合可以满足这些要求？ （选择三项。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：管理账户创建landing zone并分OU是正确基础。",
      "D：把现有账户纳入组织，SCP可限制不合规操作。",
      "F：对生产OU启用EBS加密检测控制可涵盖该OU账户。"
    ],
    "solutions": "正确答案为 C、D、F。在组织管理账户设置Control Tower landing zone，将现有账户纳入组织并按生产/开发OU分组，对生产OU启用EBS加密控制，以覆盖其现有与新增受管账户。",
    "result_flow": "“detect”控制只能发现不合规，不能自动加密既有卷；严格enforce还应启用默认加密及预防性策略。",
    "options": {
      "A": "单独StackSets无Control Tower内置蓝图体系。",
      "B": "landing zone必须在组织管理账户，不应直接用开发成员账户。",
      "C": "管理账户创建landing zone并分OU是正确基础。",
      "D": "把现有账户纳入组织，SCP可限制不合规操作。",
      "E": "管理账户级别不是仅生产OU的作用域。",
      "F": "对生产OU启用EBS加密检测控制可涵盖该OU账户。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/controltower/latest/userguide/how-control-tower-works.html",
        "title": "How AWS Control Tower works",
        "supports": "Control Tower在管理账户创建多账户landing zone，并以OU和controls管理治理。"
      }
    ],
    "audit_caveat": "“detect”控制只能发现不合规，不能自动加密既有卷；严格enforce还应启用默认加密及预防性策略。",
    "audit_status": "confirmed"
  },
  "169": {
    "blocker": "一家公司正在 Application Load Balancer (ALB) 后面的两个 Linux Amazon EC2 实例上运行一个关键的有状态 Web 应用程序，其中一个Amazon RDS 用于 MySQL 资料库。本公司在 Amazon Route 53 中托管申请的 DNS 记录。解决方案架构师必须推荐一种解决方案来提高应用程式的弹性。此解决方案必须满足以下目标： • 应用层：RPO 2 分钟。 RTO 30 分钟 • 资料库层：RPO 5 分钟。 RTO 30 分钟 公司不想对现有应用程式架构进行重大更改。公司必须确保故障转移后的最佳延迟。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：持续DRS、RDS只读副本及双区域入口完整覆盖目标。"
    ],
    "solutions": "正确答案为 A。应用服务器用DRS持续块复制满足分钟内RPO，数据库用跨区只读副本，备用ALB及Global Accelerator提供恢复后的低时延入口。",
    "result_flow": "仍需演练验证RDS复制延迟及恢复流程达标。",
    "options": {
      "A": "持续DRS、RDS只读副本及双区域入口完整覆盖目标。",
      "B": "周期EBS快照无法可靠满足2分钟RPO。",
      "C": "计划备份恢复通常不能满足所需分钟级RPO/RTO。",
      "D": "EBS周期快照不足2分钟RPO且未更新DNS入口。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/drs/latest/userguide/CloudEndure-Concepts.html",
        "title": "Elastic Disaster Recovery Concepts",
        "supports": "DRS可实现秒级RPO及通常5–20分钟恢复，取决于工作负载。"
      }
    ],
    "audit_caveat": "仍需演练验证RDS复制延迟及恢复流程达标。",
    "audit_status": "confirmed"
  },
  "170": {
    "blocker": "解决方案架构师希望在单一 AWS 帐户中最佳化成本并适当调整 Amazon EC2 实例的大小。解决方案架构师希望确保执行个体根据 CPU、记忆体和网路指标进行最佳化。解决方案架构师应该采取哪些步骤组合来满足这些要求？ （选两个。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：代理补充内存指标。",
      "D：启用Compute Optimizer得到规格建议。"
    ],
    "solutions": "正确答案为 C、D。Compute Optimizer分析CPU、网络等利用率，额外安装CloudWatch agent提供EC2默认不采集的内存指标，使规格建议更完整。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "付费支持不是启用Compute Optimizer的必要条件。",
      "B": "Trusted Advisor低利用率检查不等于完整内存规格优化。",
      "C": "代理补充内存指标。",
      "D": "启用Compute Optimizer得到规格建议。",
      "E": "Savings Plan给折扣，不评估实例是否合理。"
    },
    "sources": [
      {
        "url": "https://aws.amazon.com/compute-optimizer/faqs/",
        "title": "AWS Compute Optimizer FAQs",
        "supports": "Compute Optimizer自动分析CWAgent namespace中发布的内存利用率。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "171": {
    "blocker": "一家公司使用 AWS CodeCommit 储存库。公司必须在第二个AWSRegion中储存储存库中资料的备份副本。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：Git克隆和S3异地归档是可实施方案。"
    ],
    "solutions": "正确答案为 C。代码提交事件经EventBridge触发CodeBuild，克隆仓库打包并上传第二Region S3，建立事件驱动异地副本。",
    "result_flow": "若需完整Git历史与所有分支标签，应clone --mirror并归档.git，而非只压缩工作树。",
    "options": {
      "A": "DRS复制服务器块设备，不直接保护CodeCommit托管仓库。",
      "B": "AWS Backup无CodeCommit原生备份资源类型。",
      "C": "Git克隆和S3异地归档是可实施方案。",
      "D": "CodeCommit没有所述仓库快照API。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/prescriptive-guidance/latest/patterns/deploy-code-in-multiple-aws-regions-using-aws-codepipeline-aws-codecommit-and-aws-codebuild.html",
        "title": "Deploy code in multiple AWS Regions using CodePipeline CodeCommit CodeBuild",
        "supports": "CodeCommit更新事件可触发流水线，CodeBuild能读取仓库并以S3作产物存储。"
      }
    ],
    "audit_caveat": "若需完整Git历史与所有分支标签，应clone --mirror并归档.git，而非只压缩工作树。",
    "audit_status": "confirmed"
  },
  "172": {
    "blocker": "一家公司有多个业务部门，每个业务部门在 AWS 上都有单独的帐户。每个业务部门透过多个 VPC 管理自己的网络，这些CIDR 范围重叠。该公司的行销团队创建了一个新的内部应用程序，并希望所有其他业务部门都可以存取该应用程式。此解决方案必须仅使用私有 IP 位址。哪种解决方案能够以最少的营运开销满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：PrivateLink支持重叠网段并按账户授权服务。"
    ],
    "solutions": "正确答案为 C。PrivateLink按服务暴露应用，消费者在各自VPC中用私有接口端点连接，即使CIDR重叠也无需重编址。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "只要任一IPv4 CIDR重叠，新增不重叠副段仍不能建立VPC peering。",
      "B": "VPN和NAT虚拟设备管理复杂。",
      "C": "PrivateLink支持重叠网段并按账户授权服务。",
      "D": "API private integration仅使后端私有，不会自动使API前端私有。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/prescriptive-guidance/latest/integrate-third-party-services/architecture-1.html",
        "title": "Architecture 1 AWS PrivateLink",
        "supports": "PrivateLink提供跨VPC/账户私有连接，允许重叠CIDR。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "173": {
    "blocker": "某公司需要对新取得的AWS帐户进行安全态势审计。只有当Amazon S3储存桶公开暴露时，公司的资料安全团队才需要通知。本公司已经建立了Amazon简单通知服务（Amazon SNS）主题，并订阅了资料安全团队的电子邮件地址。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：Access Analyzer finding含isPublic，可按事件条件筛选并发SNS。"
    ],
    "solutions": "正确答案为 B。Access Analyzer分析桶策略和公开访问，使用EventBridge只匹配公开finding再发SNS，避免任何策略变更都告警。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "S3对象事件没有isPublic类型。",
      "B": "Access Analyzer finding含isPublic，可按事件条件筛选并发SNS。",
      "C": "PutBucketPolicy可能仍是私有策略，也遗漏ACL等公开路径。",
      "D": "cloudtrail-s3-dataevents-enabled检查数据事件日志而非公开桶。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/IAM/latest/UserGuide/access-analyzer-eventbridge.html",
        "title": "Monitoring IAM Access Analyzer with EventBridge",
        "supports": "Access Analyzer finding事件含isPublic及资源信息，可创建EventBridge规则。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "174": {
    "blocker": "解决方案架构师需要评估新收购的公司的应用程式和资料库组合。解决方案架构师必须建立一个业务案例以将产品组合迁移到AWS。新收购的公司在on-premises资料中心运行应用程式。数据中心没有很好的记录。解决方案架构师无法立即确定存在多少应用程式和资料库。应用程式的流量是可变的。有些应用程式是在每个月底运行的​​批次过程。在开始迁移到AWS之前，解决方案架构师必须更了解产品组合。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：发现、成本评估和依赖可视化组合匹配前期评估。"
    ],
    "solutions": "正确答案为 C。Migration Evaluator收集资源利用率构建商业论证，Application Discovery收集依赖，Migration Hub呈现资产组合，持续观察才能覆盖月末批处理。",
    "result_flow": "须收集足够长时间覆盖月末任务，瞬时清单不足以合理定容。",
    "options": {
      "A": "SMS/DMS用于迁移，Service Catalog不自动发现应用依赖。",
      "B": "MGN偏复制迁移，Storage Gateway不发现数据库依赖。",
      "C": "发现、成本评估和依赖可视化组合匹配前期评估。",
      "D": "Control Tower不发现本地应用资产。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/migrationhub/latest/ug/network-diagram.html",
        "title": "Viewing network connections in AWS Migration Hub",
        "supports": "Migration Hub使用Application Discovery Service网络连接数据展示服务器依赖。"
      }
    ],
    "audit_caveat": "须收集足够长时间覆盖月末任务，瞬时清单不足以合理定容。",
    "audit_status": "confirmed"
  },
  "175": {
    "blocker": "一家公司有一个应用程序，该应用程式作为 Amazon Elastic Kubernetes Service (Amazon EKS) 集群中多个 pod 的 ReplicaSet 运行。 EKS集群有多个Availability Zones节点。该应用程式产生许多小文件，这些文件必须可以在该应用程式的所有正在运行的实例中存取。公司需要对文件进行备份，并保留备份1年。哪种解决方案能够满足这些要求，同时提供最快的储存效能？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：共享NFS文件适配多AZ、多pod及小文件，配合Backup。"
    ],
    "solutions": "正确答案为 A。Regional EFS提供跨AZ共享文件系统，EKS各节点可挂载统一目录，AWS Backup设置一年保留。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "共享NFS文件适配多AZ、多pod及小文件，配合Backup。",
      "B": "EBS Multi-Attach限同AZ且需集群文件系统，不能跨AZ通用共享。",
      "C": "S3对象存储不是原生低时延POSIX小文件共享；Mountpoint也不提供完整文件语义。",
      "D": "本地pod存储不能让所有副本共享文件。"
    },
    "sources": [
      {
        "url": "https://aws.amazon.com/efs/faq/",
        "title": "Amazon EFS FAQs",
        "supports": "Regional EFS跨多个AZ冗余存储，可用AWS Backup保护。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "176": {
    "blocker": "一家公司经营一个客户服务中心，该中心接听电话并自动透过简讯向所有客户发送托管、互动式、双向体验调查。支援客户服务中心的应用程式在公司托管于 on-premises 资料中心的电脑上运行。该公司使用的硬体陈旧，该公司正在经历系统停机。该公司希望将系统迁移到AWS以提高可靠性。哪种解决方案能够以最少的持续营运开销满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：托管Connect与双向短信组合匹配历史题意。"
    ],
    "solutions": "正确答案为 A。Connect托管联络中心，Pinpoint原有双向SMS能力支持交互式问卷，比自建呼叫硬件及消息会话管理省维护。",
    "result_flow": "Pinpoint于2026-10-30结束支持；当前新设计应使用Connect配AWS End User Messaging SMS，A为历史题意答案。",
    "options": {
      "A": "托管Connect与双向短信组合匹配历史题意。",
      "B": "SNS SMS偏发送，不提供题目所需托管双向对话能力。",
      "C": "迁移EC2仍需维护呼叫中心软件和服务器。",
      "D": "Pinpoint不是替代电话呼叫中心的软件。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/pinpoint/latest/userguide/tutorials-two-way-sms.html",
        "title": "Set up an SMS registration system in Amazon Pinpoint",
        "supports": "原官方教程支持two-way SMS；当前通知说明短信API由AWS End User Messaging延续。"
      }
    ],
    "audit_caveat": "Pinpoint于2026-10-30结束支持；当前新设计应使用Connect配AWS End User Messaging SMS，A为历史题意答案。",
    "audit_status": "confirmed"
  },
  "177": {
    "blocker": "一家公司正在使用 Amazon Connect 建置呼叫中心。该公司的营运团队正在制定涵盖 AWS Regions 的灾难复原 (DR) 策略。该联络中心拥有数十个联络流程、数百个使用者和数十个已认领的电话号码。哪种解决方案将为 DR 提供最低的RTO？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：预建用户及流程减少恢复步骤，但号码迁移描述不完整。"
    ],
    "solutions": "参考选择为 D。D预建备用实例、用户与流程，把灾时创建工作减到电话号码配置，在题给方案中接近最低RTO；但不能假设灾时重新认领号码就能自动转移原号码的来电。",
    "result_flow": "严格可用的跨区DR需预建副本及Global Resiliency/traffic distribution group等号码分流；所有选项对原号码连续性均不完整。",
    "options": {
      "A": "灾后才创建实例、用户、流程最慢。",
      "B": "灾后创建大量流程会延长RTO。",
      "C": "灾后创建数百用户比预先配置慢，跨区号码也不能随意重复认领。",
      "D": "预建用户及流程减少恢复步骤，但号码迁移描述不完整。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/connect/latest/APIReference/API_ClaimPhoneNumber.html",
        "title": "ClaimPhoneNumber Amazon Connect",
        "supports": "ClaimPhoneNumber认领可用号码到实例或traffic distribution group，并要求对应Region调用。"
      }
    ],
    "audit_caveat": "严格可用的跨区DR需预建副本及Global Resiliency/traffic distribution group等号码分流；所有选项对原号码连续性均不完整。",
    "audit_status": "ambiguous"
  },
  "178": {
    "blocker": "一家公司在AWS上运行一个应用程式。该公司从多个不同来源收集数据。该公司使用专有演算法来执行资料转换和聚合。公司执行ETL流程后，将结果储存于AmazonRedshift表中。该公司将这些数据出售给其他公司。该公司从AmazonRedshift表中下载资料作为文件，并使用FTP将文件传输给多个资料客户。数据客户的数量显著成长。数据客户的管理变得困难。该公司将使用AWS Data Exchange 创建一个数据产品，该公司可以使用该产品与客户共享数据。该公司希望在共享数据之前确认客户的身份。当公司发布数据时，客户还需要存取最新的数据。哪种解决方案能够以最少的营运开销满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：原生Redshift datashare与订阅验证最直接。"
    ],
    "solutions": "正确答案为 B。Redshift datashare通过Data Exchange让订阅者查询实时共享数据，订阅验证在提供访问前核实身份，不必导出FTP文件。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "API代理与Redshift Data API增加实现维护。",
      "B": "原生Redshift datashare与订阅验证最直接。",
      "C": "周期导出S3增加延迟和同步运维。",
      "D": "Open Data不是按已核验付费订阅客户控制访问的方案，表也不是所述IAM资源策略对象。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/data-exchange/latest/userguide/publish-Redshift-product.html",
        "title": "Publishing a product containing Redshift data sets",
        "supports": "提供者创建Data Exchange Redshift datashare；订阅后可访问新增共享数据。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "179": {
    "blocker": "解决方案架构师正在设计处理事件的解决方案。解决方案必须能够根据解决方案接收的事件数量进行扩展和扩展。如果发生处理错误，则该事件必须移至单独的伫列中以供审核。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：SNS到Lambda加失败目的地完整满足自动扩缩和失败队列。"
    ],
    "solutions": "正确答案为 A。SNS异步触发Lambda随事件负载扩缩，Lambda处理重试耗尽后用on-failure destination把失败记录送SQS供审查。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "SNS到Lambda加失败目的地完整满足自动扩缩和失败队列。",
      "B": "按最旧消息年龄不是按事件数量/每实例积压扩缩，且需应用自写失败转移。",
      "C": "没有配置失败队列。",
      "D": "ALB不是EventBridge原生target；按选项无法直接实现。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/lambda/latest/dg/invocation-async-retain-records.html",
        "title": "Capturing records of Lambda asynchronous invocations",
        "supports": "Lambda异步调用支持标准SQS作为on-failure destination，记录重试后仍失败事件。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "corrected"
  },
  "180": {
    "blocker": "某公司在AWS云端中运行处理引擎。该引擎处理来自物流中心的环境数据以计算永续性指数。该公司在遍布欧洲的物流中心拥有数百万台设备。设备透过RESTful API 将讯息传送到处理引擎。 API 会经历不可预测的流量突发。公司必须实施一个解决方案来处理设备发送到处理引擎的所有资料。资料遗失是不可接受的。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：HTTP API支持SQS-SendMessage一等集成并由Lambda消费。"
    ],
    "solutions": "正确答案为 B。HTTP API原生SQS SendMessage集成先持久化流量，Lambda按队列处理，吸收突发并隔离接收和处理容量。",
    "result_flow": "要满足不丢数据，还需客户端确认与重试、SQS保留期、DLQ及消费幂等。",
    "options": {
      "A": "ALB不能把SQS队列作为target group目标。",
      "B": "HTTP API支持SQS-SendMessage一等集成并由Lambda消费。",
      "C": "不存在Auto Scaling group proxy integration类型，且无持久缓冲。",
      "D": "Kinesis stream不是CloudFront可直接设置的HTTP源站。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations-aws-services.html",
        "title": "Create AWS service integrations for HTTP APIs",
        "supports": "HTTP API first-class integration支持SQS-SendMessage。"
      }
    ],
    "audit_caveat": "要满足不丢数据，还需客户端确认与重试、SQS保留期、DLQ及消费幂等。",
    "audit_status": "confirmed"
  },
  "181": {
    "blocker": "一家公司正在AWS云端设计其网路配置。该公司使用 AWS Organizations ​​来管理多帐户设定。公司拥有三台OU。每个OU包含超过100个AWS帐户。每个帐户都有一个VPC，每个OU中的所有VPC都在同一个AWSRegion中。所有 AWS 帐户的 CIDR 范围不重叠。公司需要实现一个解决方案，使同一OU中的VPC可以互相通信，但不能与其他OU中的VPC通信。哪种解决方案能够以最少的营运开销满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：RAM共享TGW并按OU连接VPC，避免mesh。"
    ],
    "solutions": "正确答案为 C。每OU使用独立Transit Gateway，仅连接该OU的VPC，不互连各TGW，建立可管理的OU内传递路由和OU间隔离。",
    "result_flow": "共享给组织不等于自动隔离OU；每个TGW必须只接本OU并限制共享/路由。",
    "options": {
      "A": "百账户全互联peering连接数量大。",
      "B": "VPC共享不替代现有VPC路由，peering也不传递。",
      "C": "RAM共享TGW并按OU连接VPC，避免mesh。",
      "D": "VPN和第三方路由器运维重。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/vpc/latest/tgw/tgw-transit-gateways.html",
        "title": "Transit gateways in AWS Transit Gateway",
        "supports": "TGW可经RAM跨账户共享并连接VPC，路由表控制连接。"
      }
    ],
    "audit_caveat": "共享给组织不等于自动隔离OU；每个TGW必须只接本OU并限制共享/路由。",
    "audit_status": "confirmed"
  },
  "182": {
    "blocker": "一家公司正在将应用程式迁移到AWS。它希望在迁移过程中尽可能多地使用完全托管的服务。该公司需要在应用程式中储存大型重要文档，并满足以下要求： 1. 资料必须高度持久且可用 2. 资料在静态和传输过程中必须始终加密 3. 加密金钥必须由公司管理并定期轮换 解决方案架构师应推荐以下哪种解决方案？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：S3+TLS策略+SSE-KMS满足大文档和自管密钥。"
    ],
    "solutions": "正确答案为 B。S3提供托管耐久对象存储，桶策略拒绝非TLS访问并强制SSE-KMS，使用公司管理的customer managed KMS key并启用轮换。",
    "result_flow": "KMS应选customer managed key并显式启用符合要求的轮换，而非只写任意AWS托管key。",
    "options": {
      "A": "EBS卷加密不能替代S3对象端到端要求，网关也非必要。",
      "B": "S3+TLS策略+SSE-KMS满足大文档和自管密钥。",
      "C": "DynamoDB单项400KB，不适合大文档对象。",
      "D": "自管EC2存储不满足尽量全托管。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingKMSEncryption.html",
        "title": "SSE-KMS encryption",
        "supports": "S3支持通过客户管理KMS密钥进行服务端加密。"
      },
      {
        "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/example-bucket-policies.html",
        "title": "S3 bucket policies",
        "supports": "桶策略可使用aws:SecureTransport拒绝非TLS请求。"
      }
    ],
    "audit_caveat": "KMS应选customer managed key并显式启用符合要求的轮换，而非只写任意AWS托管key。",
    "audit_status": "confirmed"
  },
  "183": {
    "blocker": "公司的公共 API 作为任务在 Amazon Elastic Container Service (Amazon ECS) 上运行。这些任务在Application Load Balancer (ALB)后面的AWSFargate上运行，并根据CPU利用率为任务配置服务Auto Scaling。这项服务已经运作良好几个月了。最近，API 效能下降并导致应用程式无法使用。该公司发现该 API 发生了大量 SQL 注入攻击，且 API 服务已扩展至最大数量。解决方案架构师需要实作一个解决方案，防止 SQL 注入攻击到达ECS API 服务。此解决方案必须允许合法流量通过，并且必须最大限度地提高营运效率。哪种解决方案满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：SQLi托管规则阻断、其余默认Allow符合条件。"
    ],
    "solutions": "正确答案为 C。WAF SQL database托管规则组识别SQL注入并Block，web ACL关联ALB，在攻击到达Fargate任务前拦截。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "仅monitor不阻止攻击。",
      "B": "Bot Control不是最直接SQLi检测规则，托管组不能这样直接添加任意规则。",
      "C": "SQLi托管规则阻断、其余默认Allow符合条件。",
      "D": "依赖日志识别单IP复杂且攻击者可换IP。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/waf/latest/developerguide/aws-managed-rule-groups-use-case.html",
        "title": "Use-case specific rule groups",
        "supports": "AWSManagedRulesSQLiRuleSet包含SQLi_BODY/QUERYARGUMENTS等Block规则。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "184": {
    "blocker": "一家环保公司正在全国主要城市部署感测器来测量空气品质。感测器连接到AWS IoT Core 以取得时间序列资料读数。公司将资料储存在Amazon DynamoDB中。为了业务连续性，公司必须具备在两个AWSRegions中摄取和储存资料的能力。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：自定义域名、健康检查、故障DNS与global table匹配。"
    ],
    "solutions": "正确答案为 C。每区域配置IoT自定义域名和相应证书，DNS健康检查触发故障转移，DynamoDB global table让两区域可写入同一逻辑数据集。",
    "result_flow": "还须在两区域同步设备证书/策略/注册及规则；不能把DNS健康检查描述为IoT自动内建的跨区复制。",
    "options": {
      "A": "不存在Aurora global tables这种DynamoDB替代形式，IoT端点也不是所述Route53 alias支持目标。",
      "B": "MemoryDB方案改变数据库且未完整描述跨区可用接入。",
      "C": "自定义域名、健康检查、故障DNS与global table匹配。",
      "D": "仅地域端点DNS切换未解决自定义域名TLS配置，手工流复制开销高。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/iot/latest/developerguide/disaster-recovery-resiliency.html",
        "title": "Resilience in AWS IoT Core",
        "supports": "IoT资源按区域独立，跨区域需要显式复制和配置。"
      }
    ],
    "audit_caveat": "还须在两区域同步设备证书/策略/注册及规则；不能把DNS健康检查描述为IoT自动内建的跨区复制。",
    "audit_status": "confirmed"
  },
  "185": {
    "blocker": "一家公司使用 AWS Organizations ​​在 AWS 云端中进行多重帐户设定。该公司的财务团队有一个使用AWS Lambda和Amazon DynamoDB的资料处理应用程式。该公司的行销团队想要存取储存在 DynamoDB 表中的资料。 DynamoDB 表包含机密资料。行销团队只能存取DynamoDB表中资料的特定属性。财务团队和行销团队有独立的AWS帐户。解决方案架构师应该如何为行销团队提供 DynamoDB 表的适当存取权限？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：角色信任加细粒度属性策略是有效传统方案。"
    ],
    "solutions": "参考选择为 B。B通过财务账户角色的dynamodb:Attributes等条件限制属性，营销账户承担此角色。当前DynamoDB也支持C的跨账户资源策略，原题未给限制而不再能唯一排除C。",
    "result_flow": "2024年以来DynamoDB新增资源策略，B与C均有效；B是保留的传统答案，不能称C不受支持。",
    "options": {
      "A": "SCP不授予访问权，也不能作为跨账户授权策略。",
      "B": "角色信任加细粒度属性策略是有效传统方案。",
      "C": "当前DynamoDB表支持资源策略和跨账户访问，配合双方授权及Attributes条件同样可行。",
      "D": "权限边界只能限制已有授权；选项未建立跨账户角色信任。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/rbac-auth-iam-id-based-policies-DDB.html",
        "title": "Authorization with IAM identity-based and DynamoDB resource-based policies",
        "supports": "官方确认跨账户须身份与资源策略显式Allow，支持dynamodb:Attributes条件。"
      }
    ],
    "audit_caveat": "2024年以来DynamoDB新增资源策略，B与C均有效；B是保留的传统答案，不能称C不受支持。",
    "audit_status": "ambiguous"
  },
  "186": {
    "blocker": "解决方案架构师正在创建一个将物件储存在 Amazon S3 储存桶中的应用程式。解决方案架构师必须在两个同时使用的AWS Regions 中部署应用程式。两个S3桶中的物件必须保持彼此同步。哪种步骤组合能够以最少的营运开销满足这些要求？ （选择三项。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：MRAP按网络位置路由S3请求。",
      "B：双向CRR复制两侧新对象。",
      "E：CRR要求源与目标都启用Versioning。"
    ],
    "solutions": "正确答案为 A、B、E。两桶开启Versioning并配置双向CRR，MRAP提供单一多区域访问入口，避免应用双写和手工Lambda复制。",
    "result_flow": "复制是异步，MRAP本身不保证同步完成或跨区域读后写强一致。",
    "options": {
      "A": "MRAP按网络位置路由S3请求。",
      "B": "双向CRR复制两侧新对象。",
      "C": "应用双写增加失败补偿与运维。",
      "D": "Lifecycle不复制到另一桶。",
      "E": "CRR要求源与目标都启用Versioning。",
      "F": "自建复制需管理幂等、循环与失败重试。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/mrap-create-two-way-replication-rules.html",
        "title": "Create two-way replication rules for your Multi-Region Access Point",
        "supports": "双向CRR用于同步多区域桶，所有参与桶必须启用Versioning。"
      }
    ],
    "audit_caveat": "复制是异步，MRAP本身不保证同步完成或跨区域读后写强一致。",
    "audit_status": "confirmed"
  },
  "187": {
    "blocker": "一家公司有一个在on-premises环境中运作的物联网平台。该平台由使用 MQTT 协定连接到 IoT 设备的伺服器组成。该平台至少每 5 分钟从设备收集一次遥测资料。该平台还将设备元资料储存在 MongoDB 集群中。安装在on-premises机器上的应用程式运行定期作业来聚合和转换遥测和设备元资料。该应用程式会建立使用者透过使用在同一台 on-premises 电脑上执行的另一个 Web 应用程式查看的报告。定期作业需要 120-600 秒才能运作。但是，Web 应用程式始终在运行。该公司正在将平台迁移到AWS，并且必须减少堆叠的营运开销。哪种步骤组合能够以最少的营运开销满足这些要求？ （选择三项。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：IoT Core托管设备消息协议接入。",
      "D：DocumentDB提供托管MongoDB兼容存储。",
      "E：单任务最长600秒小于标准Lambda900秒上限，托管编排和静态发布省运维。"
    ],
    "solutions": "正确答案为 B、D、E。IoT Core托管MQTT接入，DocumentDB承接兼容MongoDB元数据，Step Functions+Lambda执行2–10分钟任务并写S3，再由CloudFront发布静态报表。",
    "result_flow": "DocumentDB兼容性须测试；不是对任意MongoDB功能的100%兼容。",
    "options": {
      "A": "Lambda不适合长期保持所有设备MQTT连接。",
      "B": "IoT Core托管设备消息协议接入。",
      "C": "自管MongoDB保留数据库维护。",
      "D": "DocumentDB提供托管MongoDB兼容存储。",
      "E": "单任务最长600秒小于标准Lambda900秒上限，托管编排和静态发布省运维。",
      "F": "EKS EC2与ingress引入节点和集群维护。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/lambda/latest/dg/configuration-timeout.html",
        "title": "Configure Lambda function timeout",
        "supports": "标准Lambda最长900秒，可覆盖120–600秒任务。"
      }
    ],
    "audit_caveat": "DocumentDB兼容性须测试；不是对任意MongoDB功能的100%兼容。",
    "audit_status": "confirmed"
  },
  "188": {
    "blocker": "一家全球制造公司计划将其大部分应用程式迁移到AWS。然而，由于资料监管要求或对个位数毫秒延迟的要求，该公司担心需要保留在特定国家或公司中央on-premises资料中心内的应用程式。该公司还担心一些工厂站点托管的应用程序，这些工厂的网路基础设施有限。该公司希望获得一致的开发人员体验，以便开发人员只需建置一次应用程式即可在本地、云端或混合架构中进行部署。开发人员必须能够使用他们熟悉的相同工具、API 和服务。哪种解决方案将提供一致的混合体验来满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：本地Outposts加离线边缘计算匹配原题混合场景。"
    ],
    "solutions": "正确答案为 C。Outposts把熟悉AWS服务和API带到本地以满足驻留与低延迟，受限网络工厂使用Snowball Edge Compute Optimized运行本地计算。",
    "result_flow": "Snowball Edge可用性及新客户限制随时间变化；此题是既有服务能力架构题。Outposts需区域服务链路，不是长期完全离线平台。",
    "options": {
      "A": "迁到Region不能保证本地数据驻留和个位毫秒时延。",
      "B": "Storage Optimized不是此处计算优选；Wavelength依赖支持的运营商5G边缘。",
      "C": "本地Outposts加离线边缘计算匹配原题混合场景。",
      "D": "Local Zone不保证在指定机房/国家，Wavelength不是任意工厂可部署。"
    },
    "sources": [
      {
        "url": "https://aws.amazon.com/outposts/rack/faqs/",
        "title": "AWS Outposts racks FAQs",
        "supports": "Outposts适用于本地低延迟、数据处理和驻留要求，复用AWS能力。"
      }
    ],
    "audit_caveat": "Snowball Edge可用性及新客户限制随时间变化；此题是既有服务能力架构题。Outposts需区域服务链路，不是长期完全离线平台。",
    "audit_status": "confirmed"
  },
  "189": {
    "blocker": "一家公司正在更新客户用于线上订购的应用程式。最近，不良行为者对应用程式的攻击数量有所增加。该公司将在Amazon Elastic Container Service (Amazon ECS)集群上托管更新后的应用程式。公司将使用Amazon DynamoDB来储存应用程式资料。公共Application Load Balancer (ALB)将为最终用户提供对该应用程式的存取权限。公司必须防止攻击并确保业务连续性，并在持续攻击期间将服务中断降至最低。哪一种步骤组合能够最经济有效地满足这些要求？ （选两个。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：CloudFront自定义源站header加ALB匹配限制直连绕过。",
      "E：WAF在CloudFront层过滤应用攻击。"
    ],
    "solutions": "正确答案为 A、E。CloudFront前置ALB，使用秘密源站header并在ALB校验防止绕过入口；CloudFront关联WAF规则组在边缘过滤攻击。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "CloudFront自定义源站header加ALB匹配限制直连绕过。",
      "B": "双Region等权不是最划算的攻击过滤方式。",
      "C": "扩容和DAX无法阻止恶意请求。",
      "D": "ElastiCache不能代替安全过滤。",
      "E": "WAF在CloudFront层过滤应用攻击。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/restrict-access-to-load-balancer.html",
        "title": "Restrict access to Application Load Balancers",
        "supports": "CloudFront给origin request添加自定义header，ALB listener检查该header；可再限制前缀列表。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "190": {
    "blocker": "一家公司在 AWS 上运行 Web 应用程式。 Web 应用程式从 Amazon CloudFront 发行版后面的 Amazon S3 储存桶传送静态内容。该应用程式透过使用 Application Load Balancer (ALB) 将请求分发到 Auto Scaling 群组中的一组 Amazon EC2 实例来提供动态内容。该应用程式使用Amazon Route 53中设定的网域名称。一些用户报告在高峰时段尝试访问网站时偶尔会出现问题。营运团队发现ALB有时会回传HTTP 503 Service Unavailable 错误。该公司希望在发生这些错误时显示自订错误讯息页面。应立即显示此错误代码的页面。哪种解决方案能够以最少的营运开销满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：origin failover支持503触发备用S3。"
    ],
    "solutions": "正确答案为 C。将动态请求也经CloudFront origin group，ALB作为主源，S3维护页为备源，将503设为failover code，收到该错误后切换源站。",
    "result_flow": "需确保备用源对原请求路径返回维护页；failover仅适用GET/HEAD/OPTIONS。若只是统一错误页，生产更直接使用CloudFront custom error response。",
    "options": {
      "A": "DNS故障检测和缓存导致非即时，且影响全站。",
      "B": "新分配加DNS切换额外复杂且非每请求错误处理。",
      "C": "origin failover支持503触发备用S3。",
      "D": "CloudFront Functions没有origin-response触发器，也不能进行网络读取S3。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/high_availability_origin_failover.html",
        "title": "Optimize high availability with CloudFront origin failover",
        "supports": "可设置503作为源站failover响应码并指定主/备用源。"
      }
    ],
    "audit_caveat": "需确保备用源对原请求路径返回维护页；failover仅适用GET/HEAD/OPTIONS。若只是统一错误页，生产更直接使用CloudFront custom error response。",
    "audit_status": "confirmed"
  },
  "191": {
    "blocker": "一家公司正计划将应用程式迁移到AWS。该应用程式作为 Docker 容器运行并使用 NFS 版本 4 档案共用。解决方案架构师必须设计一个安全且可扩展的容器化解决方案，该解决方案不需要配置或管理底层基础架构。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：Fargate+EFS是支持的托管NFS组合。"
    ],
    "solutions": "正确答案为 A。Fargate托管容器基础设施，EFS提供NFSv4共享，任务定义设置EFS volume/mountPoints及taskRole IAM授权，安全且省运维。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "Fargate+EFS是支持的托管NFS组合。",
      "B": "Lustre不是NFS且Fargate不能使用该Lustre客户端挂载方式。",
      "C": "EC2 launch type仍需管理容器宿主机。",
      "D": "EBS Multi-Attach并非通用多机NFS，EC2基础设施也需管理。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html",
        "title": "ECS task definition parameters for Fargate",
        "supports": "Fargate任务支持EFS volume及task IAM role授权；IAM授权须开启传输加密。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "192": {
    "blocker": "一家公司正在AWS云端中运行应用程式。核心业务逻辑在Auto Scaling群组中的一组Amazon EC2实例上运作。 Application Load Balancer (ALB) 将流量分配到 EC2 实例。 Amazon Route 53 记录 api.example.com 指向ALB。公司开发团队对业务逻辑进行了重大更新。该公司有一条规则，即部署变更后，只有 10% 的客户可以在测试视窗期间收到新逻辑。客户在测试视窗期间必须使用相同版本的业务逻辑。公司应如何部署更新来满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：加权目标组与目标组粘性同时满足灰度比例和版本一致。"
    ],
    "solutions": "正确答案为 B。新旧版本使用独立target group，listener按90/10权重转发，并启用target group stickiness让同一客户保持同一版本。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "DNS权重按解析而非精确客户分配，不能保证客户测试期固定版本。",
      "B": "加权目标组与目标组粘性同时满足灰度比例和版本一致。",
      "C": "MaxBatchSize是实例数而非10%客户，滚动更新不保会话版本。",
      "D": "LOR按未完成请求负载分配，不保证10%灰度比例。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/elasticloadbalancing/latest/application/rule-action-types.html",
        "title": "Action types for listener rules",
        "supports": "加权目标组须启用target group stickiness，ALB以AWSALBTG cookie固定目标组。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "193": {
    "blocker": "一家大型教育公司最近推出了Amazon工作区，以提供对多所大学内部应用程式的存取。该公司将用户设定档储存在 Windows 档案伺服器档案系统的Amazon FSx 上。档案系统配置了DNS别名，并连接到自我管理的Active Directory。随著越来越多的使用者开始使用工作区，登入时间会增加到不可接受的程度。一项调查显示档案系统的效能下降。该公司在 HDD 储存上创建了吞吐量为 16 MBps 的档案系统。解决方案架构师必须在定义的维护时段内提高档案系统的效能。解决方案架构师应该如何做才能以最少的管理工作来满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：直接更新throughput与HDD→SSD为支持路径。"
    ],
    "solutions": "正确答案为 B。当前FSx Windows支持将现有文件系统从HDD原地升级到SSD，并提高throughput至32MBps，无需迁移新文件系统，行政工作最少。",
    "result_flow": "旧文档曾要求备份恢复；当前HDD→SSD可原地做，SSD→HDD仍需恢复新文件系统。",
    "options": {
      "A": "备份恢复可行但比当前原地修改更多工作。",
      "B": "直接更新throughput与HDD→SSD为支持路径。",
      "C": "DataSync迁移可行但需额外代理和切换。",
      "D": "shadow copy不是创建另一FSx文件系统的完整恢复迁移机制。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/fsx/latest/WindowsGuide/managing-storage-configuration.html",
        "title": "Managing storage on FSx for Windows File Server",
        "supports": "官方现已明确支持通过控制台/CLI把HDD存储类型改成SSD。"
      }
    ],
    "audit_caveat": "旧文档曾要求备份恢复；当前HDD→SSD可原地做，SSD→HDD仍需恢复新文件系统。",
    "audit_status": "confirmed"
  },
  "194": {
    "blocker": "一家公司在 AWS 上托管一个应用程式。应用程式读取和写入储存在单一Amazon S3储存桶中的物件。公司必须修改应用程式才能将应用程式部署在两个AWSRegions中。哪种解决方案能够以最少的营运开销满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：双向CRR+MRAP同时解决数据分布和单入口。"
    ],
    "solutions": "正确答案为 B。两Region都可读写时需双向CRR，MRAP为应用提供统一访问端点并按区域路由，运维最少。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "Global Accelerator不能直接将S3桶作为标准端点，CloudFront不负责双向数据复制。",
      "B": "双向CRR+MRAP同时解决数据分布和单入口。",
      "C": "单向复制不能传播第二Region的新写入回第一Region。",
      "D": "S3 gateway endpoint是区域VPC路由目标，不是跨区应用源站。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/MultiRegionAccessPointBucketReplication.html",
        "title": "Configuring replication for use with Multi-Region Access Points",
        "supports": "MRAP搭配双向CRR可保持两桶更新异步同步。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "195": {
    "blocker": "一家线上游戏公司需要在AWS上重新托管其游戏平台。该公司的游戏应用程式需要高效能运算（HPC）处理，并且排行榜经常变化。针对计算生成进行最佳化的 Ubuntu 实例托管用于游戏显示的 Node.js 应用程式。游戏状态在 on-premises Redis 实例中进行追踪。该公司需要一个优化应用程式效能的迁移策略。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：C系列稳定计算加托管Redis实时排行。"
    ],
    "solutions": "正确答案为 C。计算密集应用用C系列，需稳定游戏服务用On-Demand；Redis sorted sets适合实时排行榜并兼容现有Redis状态。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "M系列非计算优化，且全Spot可被中断。",
      "B": "OpenSearch不是现有Redis实时排行榜最合适替代，全Spot有中断风险。",
      "C": "C系列稳定计算加托管Redis实时排行。",
      "D": "M系列及DynamoDB需重构排行逻辑，非本题性能最佳。"
    },
    "sources": [
      {
        "url": "https://aws.amazon.com/blogs/database/building-a-real-time-gaming-leaderboard-with-amazon-elasticache-for-redis/",
        "title": "Build a real-time gaming leaderboard with Amazon ElastiCache for Redis",
        "supports": "Redis sorted set按分数排序提供低延迟实时排行榜。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "196": {
    "blocker": "解决方案架构师正在设计一个应用程式来接受员工在行动装置上输入的时间表条目。时间表将每周提交一次，大部分提交发生在周五。资料的储存格式必须允许薪资管理员执行月度报告。基础架构必须具有高可用性并可扩展，以符合传入资料和报告请求的速率。哪种步骤组合可以满足这些要求，同时最大限度地减少营运开销？ （选两个。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：S3与API Gateway/Lambda最少基础设施管理。",
      "E：S3+Athena无服务器查询适合月报。"
    ],
    "solutions": "正确答案为 C、E。静态前端S3+CloudFront、API Gateway+Lambda后端按请求自动扩缩，S3存考勤并用Athena/QuickSight按需报告，无需维护容器节点或数据库集群。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "EC2定时扩容仍要维护实例。",
      "B": "ECS容器方案比全托管函数组合增加运行和容量管理。",
      "C": "S3与API Gateway/Lambda最少基础设施管理。",
      "D": "常驻Redshift对低频月报开销更高。",
      "E": "S3+Athena无服务器查询适合月报。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/decision-guides/latest/decision-guides/choosing-aws-serverless-service.html",
        "title": "Choosing an AWS serverless service",
        "supports": "API Gateway与Lambda用于Web/API后端，托管服务避免配置计算基础设施。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "corrected"
  },
  "197": {
    "blocker": "一家公司将敏感资料储存在 Amazon S3 储存桶中。公司必须记录S3储存桶中物件的所有活动，并且必须将日志保留 5 年。每次尝试删除 S3 储存桶中的资料时，公司的安全团队也必须收到电子邮件通知。哪一种步骤组合能够最经济有效地满足这些要求？ （选择三项。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：对象读写删除审计需CloudTrail data events。",
      "D：EventBridge到SNS可通知，但必须基于CloudTrail删除API调用而非仅Object Deleted事件。",
      "F：专用S3日志桶加生命周期控制成本与留存。"
    ],
    "solutions": "参考选择为 A、D、F。CloudTrail开启S3对象级data events并把日志保存专用S3桶以Lifecycle保留5年；EventBridge匹配删除API事件通知SNS邮件。",
    "result_flow": "D若按原生S3 Object Deleted事件理解，只报告成功删除，漏掉失败尝试；应匹配CloudTrail DeleteObject/DeleteObjects事件。题给ADF为最接近组合。",
    "options": {
      "A": "对象读写删除审计需CloudTrail data events。",
      "B": "server access logging为best effort，不是完整审计首选。",
      "C": "S3事件不能直接以SES为目标。",
      "D": "EventBridge到SNS可通知，但必须基于CloudTrail删除API调用而非仅Object Deleted事件。",
      "E": "Timestream不是最低成本长期审计日志存储。",
      "F": "专用S3日志桶加生命周期控制成本与留存。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/awscloudtrail/latest/userguide/logging-s3-data-events-governance.html",
        "title": "Logging CloudTrail S3 data events",
        "supports": "S3失败请求如AccessDenied按原API名称记录，可审计删除尝试。"
      }
    ],
    "audit_caveat": "D若按原生S3 Object Deleted事件理解，只报告成功删除，漏掉失败尝试；应匹配CloudTrail DeleteObject/DeleteObjects事件。题给ADF为最接近组合。",
    "audit_status": "ambiguous"
  },
  "198": {
    "blocker": "一家公司正在建构一个混合环境，其中包括on-premises资料中心和AWS云端中的伺服器。该公司已在三个 VPC 中部署了 Amazon EC2 实例。每个 VPC 位于不同的 AWS Region 中。公司建立了AWS直销。从距离资料中心最近的Region 连接到资料中心。该公司需要on-premises资料中心中的伺服器能够存取所有三个VPC中的EC2实例。本地资料中心的伺服器也必须能够存取AWS公共服务。哪一种步骤组合能够以最少的成本满足这些要求？ （选两个。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：DX gateway为全局资源可连多Region VGW；“在最近Region创建”措辞不严谨。",
      "D：public VIF可到AWS公共端点，并可承载公网Site-to-Site VPN。"
    ],
    "solutions": "参考选择为 A、D。利用既有物理DX：private VIF经全局DX gateway连接多Region VPC，public VIF访问AWS公共服务；D附加的VPN可走公共VIF访问远端Region。",
    "result_flow": "A经DX gateway已可达三VPC，D里的VPN冗余；真正最低成本架构只需private+public VIF，选项未提供单独public VIF。",
    "options": {
      "A": "DX gateway为全局资源可连多Region VGW；“在最近Region创建”措辞不严谨。",
      "B": "新建两条物理专线成本更高。",
      "C": "private VIF无法直接访问公网VPN端点。",
      "D": "public VIF可到AWS公共端点，并可承载公网Site-to-Site VPN。",
      "E": "VPC peering不支持让本地经DX传递到第三VPC。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/directconnect/latest/UserGuide/direct-connect-gateways-intro.html",
        "title": "Direct Connect gateways",
        "supports": "DX gateway全局可用，可用单一专线private VIF连接多个Region VPC。"
      }
    ],
    "audit_caveat": "A经DX gateway已可达三VPC，D里的VPN冗余；真正最低成本架构只需private+public VIF，选项未提供单独public VIF。",
    "audit_status": "ambiguous"
  },
  "199": {
    "blocker": "一家公司正在使用 AWS Organizations 来管理数百个 AWS 帐户。解决方案架构师正在开发一种解决方案，为开放 Web 应用程式安全专案 (OWASP) 十大 Web 应用程式漏洞提供基线保护。解决方案架构师将 AWS WAF 用于组织内部署的所有现有和新的 Amazon CloudFront 发行版。解决方案架构师应采取哪些步骤组合来提供基线保护？ （选择三项。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：Config用于Firewall Manager发现和合规追踪。",
      "C：Firewall Manager组织集成要求All features。",
      "D：Firewall Manager提供集中WAF策略部署。"
    ],
    "solutions": "正确答案为 A、C、D。Organizations开All features、所有账户启用Config，然后由Firewall Manager集中施加WAF托管基础规则到现有及新增CloudFront。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "Config用于Firewall Manager发现和合规追踪。",
      "B": "GuardDuty检测威胁，不部署WAF规则。",
      "C": "Firewall Manager组织集成要求All features。",
      "D": "Firewall Manager提供集中WAF策略部署。",
      "E": "Shield Advanced不是组织级WAF规则部署管理器。",
      "F": "Security Hub汇总安全发现，不部署WAF策略。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/waf/latest/developerguide/fms-prereq.html",
        "title": "AWS Firewall Manager prerequisites",
        "supports": "Firewall Manager要求Organizations及Config等前提，可集中管理组织安全策略。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "200": {
    "blocker": "解决方案架构师使用其公司的 on-premises 身分识别提供者 (IdP) 实施了 SAML 2.0 联合身分识别解决方案，以验证使用者对 AWS 环境的存取权限。当解决方案架构师透过联合身分识别 Web 入口网站测试验证时，将授予 AWS 环境的存取权限。但是，当测试使用者尝试透过联合身分 Web 入口网站进行身份验证时，他们无法存取 AWS 环境。解决方案架构师应检查哪些项目以确保身分联合配置正确？ （选择三项。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：角色信任必须指定正确SAML provider及AssumeRoleWithSAML。",
      "D：STS调用参数须正确。",
      "F：断言Role映射决定哪些用户可以承担哪些角色。"
    ],
    "solutions": "正确答案为 B、D、F。检查角色信任是否信任SAML provider、STS AssumeRoleWithSAML是否带正确provider/role ARN和断言，以及IdP用户/组到角色映射。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "SAML联邦用户无需先有IAM user。",
      "B": "角色信任必须指定正确SAML provider及AssumeRoleWithSAML。",
      "C": "AWSFederatedUsers不是AWS强制要求的IdP组名。",
      "D": "STS调用参数须正确。",
      "E": "AWS VPC可达IdP DNS不是浏览器SAML联邦必要条件。",
      "F": "断言Role映射决定哪些用户可以承担哪些角色。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/IAM/latest/UserGuide/troubleshoot_saml.html",
        "title": "Troubleshoot SAML federation with IAM",
        "supports": "SAML访问依赖角色信任sts:AssumeRoleWithSAML及正确SAML属性/断言。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "corrected"
  },
  "201": {
    "blocker": "解决方案架构师需要改进托管在 AWS 云端中的应用程式。应用程式使用的 Amazon Aurora MySQL 资料库实例出现连接过载。大多数应用程式的操作都会将记录插入资料库。该应用程式目前将凭证储存在基于文字的设定档中。解决方案架构师需要实作一个解决方案，以便应用程式可以处理目前的连线负载。此解决方案必须保证凭证的安全，并且必须提供定期自动轮调凭证的能力。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：连接池加Secrets Manager同时解决两问题。"
    ],
    "solutions": "正确答案为 A。RDS Proxy复用连接并吸收连接峰值，Secrets Manager保存数据库凭证并提供自动轮换。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "连接池加Secrets Manager同时解决两问题。",
      "B": "Parameter Store不提供相同内建数据库凭证自动轮换。",
      "C": "只读副本不扩展主要INSERT写入连接。",
      "D": "副本与Parameter Store均未完整解决要求。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy.html",
        "title": "Amazon RDS Proxy",
        "supports": "代理池化并复用数据库连接，支持Secrets Manager凭证认证。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "202": {
    "blocker": "一家公司需要为其电子商务网站建立灾难复原 (DR) 解决方案。该 Web 应用程式托管在一组 t3.large Amazon EC2 实例上，并使用 Amazon RDS 作为 MySQL 资料库实例。 EC2 实例位于跨多个Availability Zones 扩展的Auto Scaling 群组中。如果发生灾难，Web 应用程式必须故障转移到辅助环境，RPO 为 30 秒，RTO 为 10 分钟。哪一种解决方案能够最具成本效益地满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：持续复制和温备匹配秒级RPO、分钟级恢复意图。"
    ],
    "solutions": "正确答案为 B。DRS持续复制EC2、RDS跨区只读副本及最小容量温备，故障时扩容并DNS failover，比全容量双活便宜。",
    "result_flow": "RDS异步副本不硬保证30秒RPO，DRS也不保证任何负载10分钟RTO；须监测复制延迟并演练验证。",
    "options": {
      "A": "Backup不支持每30秒快照，geolocation不是故障转移。",
      "B": "持续复制和温备匹配秒级RPO、分钟级恢复意图。",
      "C": "不支持30秒计划备份，simple routing不自动failover。",
      "D": "全容量备用和更换Aurora成本更高。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/drs/latest/userguide/CloudEndure-Concepts.html",
        "title": "Elastic Disaster Recovery Concepts",
        "supports": "DRS复制可实现秒级RPO，恢复通常5–20分钟。"
      }
    ],
    "audit_caveat": "RDS异步副本不硬保证30秒RPO，DRS也不保证任何负载10分钟RTO；须监测复制延迟并演练验证。",
    "audit_status": "confirmed"
  },
  "203": {
    "blocker": "一家公司正在计划将 on-premises MySQL 资料库一次性迁移到 us-east-1 Region 中的 Amazon Aurora MySQL。该公司目前的网路连线频宽有限。 on-premises MySQL 资料库大小为 60 TB。该公司估计，透过目前的网路连线将资料传输到AWS需要一个月的时间。该公司需要一个能够更快迁移资料库的迁移解决方案。哪种解决方案会在最短的时间内迁移资料库？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：S3源DMS路径可行，但数据必须导出为DMS支持格式。"
    ],
    "solutions": "正确答案为 C。60TB经受限公网耗时一个月，物理Snowball Edge预装载到S3再由DMS导入可避免长网络传输。",
    "result_flow": "不能直接把任意MySQL备份/数据文件交给DMS；须先导出支持格式并考虑停机/CDC。Snowball新客户可用性需另核实。",
    "options": {
      "A": "专线交付时间通常较长且一次迁移不如物理预置。",
      "B": "DataSync不能突破物理带宽，MGN不能转化为Aurora数据库。",
      "C": "S3源DMS路径可行，但数据必须导出为DMS支持格式。",
      "D": "MGN不能将S3备份转为Aurora。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Source.S3.html",
        "title": "Using Amazon S3 as a source for AWS DMS",
        "supports": "DMS从S3源迁移需符合指定CSV/表定义或所支持Parquet格式。"
      }
    ],
    "audit_caveat": "不能直接把任意MySQL备份/数据文件交给DMS；须先导出支持格式并考虑停机/CDC。Snowball新客户可用性需另核实。",
    "audit_status": "confirmed"
  },
  "204": {
    "blocker": "某公司在AWS云端中有一个应用程式。该应用程式在 20 个 Amazon EC2 实例上运行。 EC2 实例是持久性的，并将资料储存在多个附加的 Amazon 弹性块储存 (Amazon EBS) 卷上。公司必须在单独的 AWS Region 中维护备份。公司必须能够在 1 个工作天内恢复EC2 实例及其配置，且遗失的资料不超过 1 天。该公司员工有限，需要一个能够优化营运效率和成本的备份解决方案。该公司已经创建了一个AWS CloudFormation模板，可以在辅助Region中部署所需的网路配置。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：集中计划、跨区副本和实例恢复最少运维。"
    ],
    "solutions": "正确答案为 C。AWS Backup按日备份完整EC2配置及其EBS卷，并跨区复制到vault；恢复时配合现有网络模板重建，适合一天RPO/RTO。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "手工Runbook、多卷快照和实例模板维护更多。",
      "B": "DLM不提供所述完整EC2配置恢复与自动流量接管。",
      "C": "集中计划、跨区副本和实例恢复最少运维。",
      "D": "全天运行同规格备用实例成本高，DataSync也不复制完整实例配置。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/aws-backup/latest/devguide/restoring-ec2.html",
        "title": "Restoring an Amazon EC2 instance",
        "supports": "AWS Backup可从EC2恢复点还原EC2实例及EBS卷。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "205": {
    "blocker": "一家公司正在设计一个托管静态内容的新网站。该网站将使用户能够上传和下载大型档案。根据公司要求，所有资料在传输和静态时都必须加密。解决方案架构师正在使用 Amazon S3 和 Amazon CloudFront 建构解决方案。哪种步骤组合可以满足加密要求？ （选择三项。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：S3 SSE保护静态对象。",
      "C：拒绝不安全传输需bucket policy。",
      "E：Viewer protocol policy可将HTTP改为HTTPS。"
    ],
    "solutions": "正确答案为 A、C、E。S3开启服务端加密保护静态数据，桶策略拒绝非TLS访问，CloudFront强制HTTPS以覆盖客户端和源站传输路径。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "S3 SSE保护静态对象。",
      "B": "ACL不能包含aws:SecureTransport条件，必须桶策略。",
      "C": "拒绝不安全传输需bucket policy。",
      "D": "CloudFront没有由用户配置SSE-KMS缓存加密的此项设置。",
      "E": "Viewer protocol policy可将HTTP改为HTTPS。",
      "F": "S3预签名没有RequireSSL选项，直接签发HTTPS URL并用桶策略约束。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingKMSEncryption.html",
        "title": "SSE-KMS encryption",
        "supports": "S3支持通过客户管理KMS密钥进行服务端加密。"
      },
      {
        "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/example-bucket-policies.html",
        "title": "S3 bucket policies",
        "supports": "桶策略可使用aws:SecureTransport拒绝非TLS请求。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "206": {
    "blocker": "一家公司正在使用需要存取 Amazon RDS 上的 Microsoft SQL Server 资料库执行个体的 AWS Lambda 函数来实作无伺服器架构。该公司拥有独立的开发和生产环境，包括资料库系统的克隆。该公司的开发人员可以存取开发资料库的凭证。但是，生产资料库的凭证必须使用只有 IT 安全团队的 IAM 使用者群组成员才能存取的金钥进行加密。该密钥必须定期轮换。解决方案架构师应该在生产环境中做什么来满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：Secret与自管KMS key支持集中访问控制和轮换。"
    ],
    "solutions": "正确答案为 D。生产凭证保存在Secrets Manager并用customer managed KMS key加密；仅安全团队拥有人员读取权限，Lambda执行角色获运行时读取/解密权，并定期轮换密钥。",
    "result_flow": "IAM group不能直接作为KMS key policy Principal；通过组内用户身份策略配合key policy授权。Lambda角色也须获必要权限，“only security team”应理解为人员权限。",
    "options": {
      "A": "SecureString可安全存储，但凭证管理与轮换集成不如Secrets Manager直接。",
      "B": "AWS托管Lambda key不能用自定义key policy仅授权安全组。",
      "C": "环境变量分散管理凭证，Secrets Manager更适合集中授权和轮换。",
      "D": "Secret与自管KMS key支持集中访问控制和轮换。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/secretsmanager/latest/userguide/security-encryption.html",
        "title": "Secret encryption and decryption in AWS Secrets Manager",
        "supports": "Secrets Manager使用KMS加密，customer managed key允许自定义授权与管理。"
      }
    ],
    "audit_caveat": "IAM group不能直接作为KMS key policy Principal；通过组内用户身份策略配合key policy授权。Lambda角色也须获必要权限，“only security team”应理解为人员权限。",
    "audit_status": "confirmed"
  },
  "207": {
    "blocker": "一家线上零售公司正在将其旧版 on-premises .NET 应用程式迁移到 AWS。该应用程式在负载平衡的前端 Web 伺服器、负载平衡的应用程式伺服器和 Microsoft SQL Server 资料库上运行。该公司希望尽可能使用 AWS 托管服务，并且不想重写应用程式。解决方案架构师需要实施一个解决方案来解决扩展问题并在应用程式扩展时最大限度地降低许可成本。哪一种解决方案能够最具成本效益地满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：Babelfish允许多数SQL Server客户端少量修改连接Aurora，兼顾降许可费。"
    ],
    "solutions": "正确答案为 A。Web/应用层保留EC2 Auto Scaling，数据库改Aurora PostgreSQL+Babelfish以支持SQL Server协议/T-SQL并降低SQL Server许可成本。",
    "result_flow": "不是零修改或全部T-SQL兼容，迁移前必须评估未支持特性；题目“不重写”不等于完全不改代码。",
    "options": {
      "A": "Babelfish允许多数SQL Server客户端少量修改连接Aurora，兼顾降许可费。",
      "B": "DMS不制作服务器镜像，DynamoDB需重写关系数据库逻辑。",
      "C": "仍用SQL Server保留许可成本，容器化/EKS改造更大。",
      "D": "拆Lambda及数据湖是大规模重写。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/babelfish.html",
        "title": "Using Babelfish for Aurora PostgreSQL",
        "supports": "Babelfish支持TDS并允许原SQL Server应用较少代码改动使用Aurora。"
      }
    ],
    "audit_caveat": "不是零修改或全部T-SQL兼容，迁移前必须评估未支持特性；题目“不重写”不等于完全不改代码。",
    "audit_status": "confirmed"
  },
  "208": {
    "blocker": "软体即服务 (SaaS) 供应商透过 Application Load Balancer (ALB) 公开 API。 ALB 连接到部署在 us-east-1 Region 中的 Amazon Elastic Kubernetes Service (Amazon EKS) 集群。公开的 API 包含一些非标准 REST 方法的使用：LINK、UNLINK、LOCK 和 UNLOCK。美国境外的使用者报告这些 API 的回应时间长且不一致。解决方案架构师需要透过最小化营运开销的解决方案来解决此问题。哪种解决方案满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：L4加速不限制应用层方法，ALB仍接原请求。"
    ],
    "solutions": "正确答案为 C。Global Accelerator工作在TCP/UDP层，可加速到ALB并透传自定义HTTP方法；不用多区域部署。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "CloudFront只支持GET/HEAD/OPTIONS/PUT/PATCH/POST/DELETE，不支持列出方法。",
      "B": "API Gateway普通REST方法集合不支持题中自定义方法。",
      "C": "L4加速不限制应用层方法，ALB仍接原请求。",
      "D": "多区域部署运维量更大。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/cloudfront/latest/APIReference/API_AllowedMethods.html",
        "title": "AllowedMethods Amazon CloudFront",
        "supports": "CloudFront允许的方法最多为七种标准方法，不含LINK/UNLINK/LOCK/UNLOCK。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "209": {
    "blocker": "一家公司在AWS云端中运行物联网应用程式。该公司拥有数百万个感测器，从美国的房屋收集数据。感测器使用 MQTT 协定连接并向自订 MQTT 代理程式发送资料。 MQTT 代理将资料储存在单一 Amazon EC2 实例上。感测器透过名为 iot.example.com 的网域连接到代理。该公司使用 Amazon Route 53 作为其 DNS 服务。公司将资料储存在Amazon DynamoDB中。在某些情况下，资料量会使 MQTT 代理超载并导致感测器资料遗失。公司必须提高解决方案的可靠性。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：托管IoT MQTT接入与规则写库匹配。"
    ],
    "solutions": "正确答案为 B。用IoT Core替代单机MQTT broker，自定义域名保留iot.example.com，IoT rule将遥测写DynamoDB，免除单点容量瓶颈。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "ALB不支持原生MQTT协议。",
      "B": "托管IoT MQTT接入与规则写库匹配。",
      "C": "NLB和GA不移除单台broker处理/存储瓶颈。",
      "D": "Greengrass是边缘运行时，不提供所述全局托管MQTT云端点。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/iot/latest/developerguide/iot-custom-endpoints-configurable-custom.html",
        "title": "Configurable endpoints AWS IoT custom domains",
        "supports": "IoT Core支持自定义域名及匹配证书，通过域名配置接入托管端点。"
      },
      {
        "url": "https://docs.aws.amazon.com/iot/latest/developerguide/iot-ddb-rule.html",
        "title": "Storing device data in DynamoDB",
        "supports": "AWS IoT rule可把MQTT设备消息数据写入DynamoDB。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "210": {
    "blocker": "某公司拥有基于 Linux 的 Amazon EC2 实例。使用者必须使用 SSH 和 EC2 SSH 金钥对来存取实例。每台机器都需要唯一的EC2金钥对。该公司希望实施金钥轮换政策，该政策将根据请求自动轮换所有 EC2 金钥对，并将金钥保存在安全加密的地方。本公司将接受金钥轮换期间少于 1 分钟的停机时间。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：Secrets Manager支持自定义Lambda轮换任意secret类型。"
    ],
    "solutions": "正确答案为 A。Secrets Manager加密保存每机独立私钥，自定义Lambda轮换生成新keypair、更新实例authorized_keys及secret，可按需触发且无需重启实例。",
    "result_flow": "先部署并验证新公钥，再移除旧钥，避免中断；修改EC2 keypair元数据本身不会自动更新已运行实例公钥。",
    "options": {
      "A": "Secrets Manager支持自定义Lambda轮换任意secret类型。",
      "B": "明文String不是安全加密参数，且维护窗口不等于按需自动安全轮换。",
      "C": "KMS自动轮换密钥材料不轮换实例SSH authorized_keys。",
      "D": "Fleet Manager脚本未解决私钥安全集中保存。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotate-secrets_lambda-functions.html",
        "title": "Lambda rotation functions",
        "supports": "可创建自定义轮换Lambda，更新secret及对应服务。"
      }
    ],
    "audit_caveat": "先部署并验证新公钥，再移除旧钥，避免中断；修改EC2 keypair元数据本身不会自动更新已运行实例公钥。",
    "audit_status": "confirmed"
  },
  "211": {
    "blocker": "一家公司想要迁移到AWS。该公司在 VMware ESXi 环境中运行数千台虚拟机器。该公司没有配置管理资料库，对VMware产品组合的使用知之甚少。解决方案架构师必须为公司提供准确的清单，以便公司能够规划经济高效的迁移。哪种解决方案能够以最少的营运开销满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：无代理采集与评估最符合已知甚少的VMware资产。"
    ],
    "solutions": "正确答案为 C。Migration Evaluator的无代理采集器利用虚拟化管理信息收集VM清单和利用率，识别闲置服务器后构建迁移成本评估，比逐VM装代理省维护。",
    "result_flow": "采集器部署为可访问VMware管理接口的虚拟机，不是往ESXi内核安装插件。",
    "options": {
      "A": "Migration Evaluator不是按选项通过Patch Manager逐VM部署的工具；高利用率不应直接剔除。",
      "B": "只看磁盘利用率不足定容，MGN不是资产CSV成本评估工具。",
      "C": "无代理采集与评估最符合已知甚少的VMware资产。",
      "D": "MGN复制代理加自建Redshift/QuickSight成本分析过于复杂。"
    },
    "sources": [
      {
        "url": "https://aws.amazon.com/cn/migration-evaluator/features/",
        "title": "Migration Evaluator Features",
        "supports": "Migration Evaluator无代理采集器本地部署，通过只读接口收集VMware等基础设施的清单与利用率，可视化依赖。"
      }
    ],
    "audit_caveat": "采集器部署为可访问VMware管理接口的虚拟机，不是往ESXi内核安装插件。",
    "audit_status": "confirmed"
  },
  "212": {
    "blocker": "一家公司将微服务作为 AWS Lambda 函数运行。微服务将资料写入支援有限数量并发连线的on-premises SQL 资料库。当Lambda函数呼叫次数过多时，资料库崩溃并导致应用程式停机。该公司在其 VPC 和 on-premises 资料中心之间建立了 AWS Direct Connect 连接。该公司希望保护资料库免于崩溃。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：排队和保留并发硬上限同时解决缓冲与连接保护。"
    ],
    "solutions": "正确答案为 A。SQS持久排队吸收突发，Lambda reserved concurrency限制同时写库数在本地数据库连接上限以下。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "排队和保留并发硬上限同时解决缓冲与连接保护。",
      "B": "DataSync不能直接把SQL数据库迁到Aurora，且改变数据库非必要。",
      "C": "RDS Proxy只支持受支持RDS/Aurora数据库，不能直接代理本地SQL。",
      "D": "provisioned concurrency预热执行环境，不设置并发最大值。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/lambda/latest/dg/provisioned-concurrency.html",
        "title": "Configuring provisioned concurrency",
        "supports": "reserved concurrency可限制函数并发以避免压垮下游数据库连接。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "213": {
    "blocker": "A company uses a Grafana data visualization solution that runs on a single Amazon EC2 instance to monitor the health of the company's AWS workloads.该公司投入了时间和精力来创建了时间和精力来创建公司希望保留的仪表板。仪表板需要具有高可用性，并且停机时间不能超过 10 分钟。公司需要最大限度地减少持续维护。哪种解决方案能够以最少的营运开销满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：托管workspace支持导入dashboard。"
    ],
    "solutions": "正确答案为 B。Amazon Managed Grafana托管服务承接现有仪表盘JSON导入，保留已有投入并消除单EC2维护与可用性责任。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "重做CloudWatch dashboards浪费现有Grafana资产。",
      "B": "托管workspace支持导入dashboard。",
      "C": "仅一个ASG实例故障后要重建，且自管Grafana/EFS仍需维护。",
      "D": "小时备份恢复不能可靠保证小于10分钟停机。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/grafana/latest/userguide/v12-dash-importing.html",
        "title": "Importing dashboards Amazon Managed Grafana",
        "supports": "Managed Grafana允许上传或粘贴已有dashboard JSON定义。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "214": {
    "blocker": "一家公司需要将其客户交易资料库从本地迁移到AWS。此资料库驻留在 Linux 伺服器上执行的 Oracle 资料库执行个体上。根据新的安全要求，该公司必须每年轮换资料库密码。哪种解决方案能够以最少的营运开销满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：托管Oracle加Secrets Manager轮换最少维护。"
    ],
    "solutions": "正确答案为 B。RDS for Oracle保留关系数据库引擎并降低运维，Secrets Manager提供数据库凭证自动轮换，可设年度cron计划。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "DynamoDB重构量大，CloudWatch alarm不是年度调度。",
      "B": "托管Oracle加Secrets Manager轮换最少维护。",
      "C": "EC2自管Oracle与轮换函数比RDS维护更多。",
      "D": "Neptune图数据库不适合直接替代Oracle事务库。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotate-secrets_schedule.html",
        "title": "Rotation schedules Secrets Manager",
        "supports": "支持cron/rate轮换窗口，最长不超过一年。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "215": {
    "blocker": "解决方案架构师正在为一家由多个团队组成的公司设计AWS 帐户结构。所有团队将在同一个AWSRegion工作。公司需要一个连接到 on-premises 网路的 VPC。该公司预计进出on-premises网路的总流量将低于 50 Mbps。哪一种步骤组合能够最经济有效地满足这些要求？ （选两个。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：共享VPC减少重复网络基础设施。",
      "D：VPN足以满足小流量经济连接。"
    ],
    "solutions": "正确答案为 B、D。同Region多团队共用由共享服务账户管理的VPC/subnets，RAM共享子网；低于50Mbps的本地连接选Site-to-Site VPN，无需TGW或专线。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "每账户独立VPC增加网络互联成本。",
      "B": "共享VPC减少重复网络基础设施。",
      "C": "单共享VPC不需额外TGW小时及流量费。",
      "D": "VPN足以满足小流量经济连接。",
      "E": "专线交付与成本对该小流量非最划算。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-sharing.html",
        "title": "Share your VPC subnets with other accounts",
        "supports": "同组织多个账户可在共享的中央管理VPC子网创建资源。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "216": {
    "blocker": "大公司的解决方案架构师需要为 AWS Organizations ​​组织内所有 AWS 帐户到 Internet 的出站流量设定网路安全。该组织拥有 100 多个AWS 帐户，帐户之间透过集中式AWS Transit Gateway 相互路由。每个帐户都有一个互联网网关和一个NAT网关，用于到互联网的出站流量。本公司仅将资源部署到单一AWSRegion。公司需要能够对组织中所有 AWS 帐户的所有互联网出站流量添加集中管理的基于规则的过滤。每个Availability Zone的出站流量峰值负载不会超过25Gbps。哪种解决方案满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：托管Network Firewall支持集中出口规则过滤。"
    ],
    "solutions": "正确答案为 B。现有TGW汇聚到集中出口VPC，每AZ部署Network Firewall端点加NAT，并统一调整路由强制出站流量经过规则检查。",
    "result_flow": "须正确配置对称路由、跨AZ路径及TGW appliance mode，不能只把所有路由粗略改同一端点。",
    "options": {
      "A": "ASG不能直接作为VPC route target，且自管代理工作量大。",
      "B": "托管Network Firewall支持集中出口规则过滤。",
      "C": "每账户部署增加重复成本与规则管理。",
      "D": "各账户自管代理运维最高。"
    },
    "sources": [
      {
        "url": "https://aws.amazon.com/network-firewall/faqs/",
        "title": "AWS Network Firewall FAQs",
        "supports": "Network Firewall支持集中TGW部署并过滤internet/NAT等路径流量。"
      }
    ],
    "audit_caveat": "须正确配置对称路由、跨AZ路径及TGW appliance mode，不能只把所有路由粗略改同一端点。",
    "audit_status": "confirmed"
  },
  "217": {
    "blocker": "A company uses a load balancer to distribute tra c to Amazon EC2 instances in a single Availability Zone.该公司关注安全性，希望解决方案架构师重新架构解决方案以满足以下要求： • 必须针对常见漏洞攻击过滤入站请求。 • Rejected requests must be sent to a third-party auditing application. • 所有资源都应该高度可用。哪种解决方案满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：多AZ应用、WAF过滤与Firehose审计均完整。"
    ],
    "solutions": "正确答案为 D。应用实例在多AZ ASG，ALB关联WAF managed规则过滤漏洞攻击，WAF日志经Firehose送第三方审计。",
    "result_flow": "AWS Managed Rules本身通过WAF配置；Marketplace供应商规则组才需相应订阅，原选项用语混合但不影响架构选择。",
    "options": {
      "A": "Inspector扫描漏洞不是ALB请求实时过滤，报告不能替代拒绝请求日志。",
      "B": "原实例仍单AZ，不满足所有资源高可用。",
      "C": "缺少多AZ实例组。",
      "D": "多AZ应用、WAF过滤与Firehose审计均完整。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/waf/latest/developerguide/logging.html",
        "title": "Logging AWS WAF web ACL traffic",
        "supports": "WAF日志支持CloudWatch Logs、S3或Amazon Data Firehose，可记录动作与请求信息。"
      }
    ],
    "audit_caveat": "AWS Managed Rules本身通过WAF配置；Marketplace供应商规则组才需相应订阅，原选项用语混合但不影响架构选择。",
    "audit_status": "confirmed"
  },
  "218": {
    "blocker": "一家公司正在AWS云中运行应用程序。该应用程序由微服务组成，这些微服务在 Application Load Balancer 后面的多个 Availability Zones 中的一组 Amazon EC2 实例上运行。该公司最近添加了一个新的 REST API，该 API 已在 Amazon API Gateway 中实现。一些在 EC2 实例上运行的旧微服务需要调用这个新 API。该公司不希望可以从公共互联网访问 API，也不希望专有数据遍历公共互联网。解决方案架构师应该怎么做才能满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：private API加接口端点与双策略满足私有访问。"
    ],
    "solutions": "正确答案为 B。将API Gateway REST API设private，VPC interface endpoint及API资源策略限制来源，流量留在AWS私网。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "不存在VPC到API Gateway的该VPN连接方式；API key也不是身份认证。",
      "B": "private API加接口端点与双策略满足私有访问。",
      "C": "IAM授权不等于私有端点，API Gateway不部署在客户VPC里。",
      "D": "Global Accelerator不支持API Gateway作为标准端点，API key不能代替认证。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-private-api-create.html",
        "title": "Create a private API",
        "supports": "私有REST API经interface endpoint调用，资源策略可限制SourceVpce。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "219": {
    "blocker": "A company has set up its entire infrastructure on AWS. The company uses Amazon EC2 instances to host its ecommerce website and uses Amazon S3 to store static data. Three engineers at the company handle the cloud administ and clo​​ion yleica the clo​​ions alters an EC2 security group configuration of another engineer and causes noncompliance issues in the environment.解决方案架构师必须建立一个系统来追踪工程师所做的更改。 The system must send alerts when the engineers make noncompliant changes to the security settings for the EC2 instances. What is the FASTEST way for the solutions architect to meet these requirements?",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：Config具配置记录及规则合规评估。"
    ],
    "solutions": "正确答案为 D。AWS Config记录安全组配置历史并按managed/custom规则评估合规，SNS发送变更与不合规通知，最快形成检测闭环。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "SCP限制操作，不记录变更或主动告警。",
      "B": "CloudTrail记录API但单靠事件规则无法判断所有配置是否合规。",
      "C": "SCP不会主动发告警。",
      "D": "Config具配置记录及规则合规评估。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/config/latest/developerguide/notifications-for-AWS-Config.html",
        "title": "Notifications AWS Config sends to SNS",
        "supports": "Config通过SNS发送配置变更和规则评估通知。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "220": {
    "blocker": "一家公司拥有物联网感测器，可以监控整个大城市的交通模式。该公司希望从感测器读取和收集数据并对数据进行聚合。解决方案架构师设计了一个解决方案，其中物联网设备串流传输到Amazon Kinesis Data Streams。多个应用程式正在从流中读取资料。但是，一些用户遇到了限制，并且定期遇到 ReadProvisionedThroughputExceeded 错误。解决方案架构师应采取哪些措施来解决此问题？ （选择三项。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：扩分片增加总吞吐。",
      "C：EFO避免多个消费者共享每分片读上限。",
      "E：退避重试防止立即重试放大限流。"
    ],
    "solutions": "正确答案为 A、C、E。增加分片提高总读容量，enhanced fan-out为每个消费者提供每分片独立读吞吐，对暂时限流用指数退避重试。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "扩分片增加总吞吐。",
      "B": "KPL是生产者库，不解决消费者读限流。",
      "C": "EFO避免多个消费者共享每分片读上限。",
      "D": "减少分片会降低容量。",
      "E": "退避重试防止立即重试放大限流。",
      "F": "动态分区是Firehose等场景能力，不增加Kinesis读配额。"
    },
    "sources": [
      {
        "url": "https://aws.amazon.com/kinesis/data-streams/faqs/",
        "title": "Amazon Kinesis Data Streams FAQs",
        "supports": "enhanced fan-out为每消费者/分片提供独立2MB/s读取通道。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "221": {
    "blocker": "某公司使用 AWS Organizations ​​管理其 AWS 帐户。该公司需要一份 CPU 或记忆体使用率未充分利用的所有 Amazon EC2 实例的清单。 The company also needs recommendations for how to downsize these underutilized instances.哪种解决方案能够以最少的努力满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：中央建议和agent内存指标最少工作。"
    ],
    "solutions": "正确答案为 B。用Systems Manager批量安装CloudWatch agent补充内存，在组织管理账户集中获取Cost Explorer rightsizing建议，避免逐账户自建分析。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "自建监控和匹配脚本维护量高。",
      "B": "中央建议和agent内存指标最少工作。",
      "C": "逐成员账户检索比管理账户汇总多操作。",
      "D": "Lambda/Athena自建评估不如原生建议直接。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/cost-management/latest/userguide/rr-getting-started.html",
        "title": "Getting started with rightsizing recommendations",
        "supports": "Cost Explorer可用已发布的内存/磁盘指标改进建议，管理与成员账户有相应访问设置。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "222": {
    "blocker": "一家公司想要运行自订网路分析软体包来检查流量离开和进入VPC。该公司透过在 Auto Scaling 群组中的三个 Amazon EC2 实例上使用 AWS CloudFormation 部署了该解决方案。所有网路路由均已建立，以将流量引导至EC2 实例。每当分析软体停止工作时，Auto Scaling组就会替换一个实例。发生实例替换时，网路路由不会更新。哪种步骤组合可以解决此问题？ （选择三项。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：procstat能发送进程运行状态和资源指标。",
      "D：自定义进程失败指标触发SNS。",
      "E：Lambda执行替换与网络路由更新。"
    ],
    "solutions": "正确答案为 B、D、E。CloudWatch agent procstat监控进程，告警发SNS，Lambda负责实例退出服务/替换并在新实例就绪后修正路由。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "EC2状态检查不能检测任意应用进程停止，也不更新路由。",
      "B": "procstat能发送进程运行状态和资源指标。",
      "C": "SSM agent不是指定procstat指标采集器。",
      "D": "自定义进程失败指标触发SNS。",
      "E": "Lambda执行替换与网络路由更新。",
      "F": "CloudFormation condition只在创建/更新stack求值，不在ASG自动替换时回调。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Agent-procstat-process-metrics.html",
        "title": "Collect process metrics with the procstat plugin",
        "supports": "CloudWatch agent procstat支持监控单独进程并导出指标。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "223": {
    "blocker": "一家公司正在开发一种基于微服务的新点播视讯应用程式。该应用程式在发布时将拥有 500 万用户，6 个月后将拥有 3,000 万用户。该公司已在AWSFargate上部署了Amazon Elastic Container Service (Amazon ECS)上的应用程式。该公司透过使用HTTPS协议的ECS服务开发了该应用程式。解决方案架构师需要使用蓝/绿部署来实作应用程式更新。此解决方案必须透过负载平衡器将流量分配给每个ECS服务。应用程式必须自动调整任务数量以回应 Amazon CloudWatch 警报。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：服务层自动扩缩匹配Fargate任务容量控制。"
    ],
    "solutions": "正确答案为 D。ECS服务蓝绿部署使用ALB转发HTTPS流量，Service Auto Scaling根据CloudWatch指标调节Fargate任务数。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "只调task quota不提供自动任务扩缩。",
      "B": "Cluster Autoscaler是Kubernetes节点机制，不适用于ECS Fargate。",
      "C": "同样错误使用Cluster Autoscaler和EC2 ASG。",
      "D": "服务层自动扩缩匹配Fargate任务容量控制。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/deployment-type-bluegreen.html",
        "title": "CodeDeploy blue green deployments for ECS",
        "supports": "ECS蓝绿支持ALB/NLB并可与service auto scaling使用。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "224": {
    "blocker": "一家公司正在AWS云端中运行容器化应用程式。该应用程式透过在一组 Amazon EC2 实例上使用 Amazon Elastic Container Service (Amazon ECS) 来运行。 EC2 实例在 Auto Scaling 组中运行。该公司使用Amazon Elastic Container Registry (Amazon ECR)来存放其容器镜像。当上传新的图像版本时，新的图像版本会收到一个唯一的标签。该公司需要一种解决方案来检查新映像版本是否有常见漏洞和暴露。该解决方案必须自动删除具有“严重”或“高”严重性结果的新图像标签。当发生此类删除时，解决方案也必须通知开发团队。哪种解决方案满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：扫描事件到自动编排可实施删除及告警。"
    ],
    "solutions": "正确答案为 A。ECR scan-on-push在每个新镜像上传后扫描，EventBridge捕获scan completed及severity counts，经Step Functions删除风险tag并SNS通知。",
    "result_flow": "删除tag不一定删除被其他tag引用的manifest；必须按需求调用BatchDeleteImage并避免误删其他标签。",
    "options": {
      "A": "扫描事件到自动编排可实施删除及告警。",
      "B": "扫描不会按此选项自动把结果直接推送SQS。",
      "C": "小时扫描延后处置，不如push事件及时。",
      "D": "periodic scan和直接SQS/Step Functions触发描述不完整。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonECR/latest/userguide/ecr-eventbridge.html",
        "title": "Amazon ECR events and EventBridge",
        "supports": "基本扫描完成事件含finding-severity-counts及镜像标识。"
      }
    ],
    "audit_caveat": "删除tag不一定删除被其他tag引用的manifest；必须按需求调用BatchDeleteImage并避免误删其他标签。",
    "audit_status": "confirmed"
  },
  "225": {
    "blocker": "一家公司在AWS上运行许多工作负载，并使用AWS Organizations来管理其帐户。工作负载托管在 Amazon EC2 上。 AWSFargate。和AWS Lambda。有些工作负载的需求是不可预测的。帐户在某些月份记录高使用率，而在其他月份记录低使用率。该公司希望在未来 3 年内优化其运算成本。解决方案架构师取得整个组织中每个帐户 6 个月的平均值来计算使用情况。哪种解决方案将为组织的所有计算使用提供最大程度的成本节省？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：Compute SP涵盖全部题定计算服务并支持组织共享。"
    ],
    "solutions": "正确答案为 B。Compute Savings Plans覆盖EC2、Fargate、Lambda，管理账户按全组织聚合建议购买并共享优惠，利用跨账户负载互补减少承诺浪费。",
    "result_flow": "购买额仍应基于稳定可承诺的基线，六个月均值不保证未来每小时全部用满。",
    "options": {
      "A": "EC2 RI不能覆盖Fargate/Lambda。",
      "B": "Compute SP涵盖全部题定计算服务并支持组织共享。",
      "C": "仅按高峰账户买EC2 RI覆盖窄且易闲置。",
      "D": "EC2 Instance SP不涵盖Lambda/Fargate且限制更多。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/savingsplans/latest/userguide/sp-services.html",
        "title": "Services eligible for Savings Plans benefits",
        "supports": "Compute Savings Plans适用于EC2、Lambda及Fargate。"
      }
    ],
    "audit_caveat": "购买额仍应基于稳定可承诺的基线，六个月均值不保证未来每小时全部用满。",
    "audit_status": "confirmed"
  },
  "226": {
    "blocker": "一家公司有数百个AWS帐户。公司使用AWS Organizations中的组织来管理所有帐户。该公司已启用所有功能。财务团队分配了AWS 费用的每日预算。如果组织的 AWS 成本超过分配预算的 80%，财务团队必须收到电子邮件通知。解决方案架构师需要实施一个解决方案来追踪成本并发送通知。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：Budgets原生支持成本阈值及SNS通知。"
    ],
    "solutions": "正确答案为 A。在组织管理账户创建每日成本预算、80% actual cost阈值并用SNS通知财务，覆盖合并账单。",
    "result_flow": "账单数据有延迟，预算通知不是实时硬性停止花费。",
    "options": {
      "A": "Budgets原生支持成本阈值及SNS通知。",
      "B": "Trusted Advisor不是按日预算告警器。",
      "C": "Control Tower没有所述80%成本guardrail参数。",
      "D": "自建CUR/Athena计算和CloudWatch告警繁琐且描述缺少实现。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/cost-management/latest/userguide/bcm-lite-use-budget.html",
        "title": "Use a budget in Billing and Cost Management",
        "supports": "成本预算在接近/超出阈值时通知，可投递SNS。"
      }
    ],
    "audit_caveat": "账单数据有延迟，预算通知不是实时硬性停止花费。",
    "audit_status": "confirmed"
  },
  "227": {
    "blocker": "一家公司提供艺术品拍卖服务，其用户遍布北美和欧洲。该公司将其应用程式托管在 us-east-1 Region 的 Amazon EC2 实例中。艺术家上传他们的大尺寸作品照片。将高解析度影像档案从手机传输到在 us-east-1 Region 建立的集中式 Amazon S3 储存桶。欧洲用户报告图像上传速度缓慢。解决方案架构师如何提高图像上传过程的效能？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：S3加速专为长距离桶传输设计。"
    ],
    "solutions": "正确答案为 C。欧洲到美东大文件上传使用S3 Transfer Acceleration边缘接入和AWS优化骨干传输，提高长距离上传性能。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "multipart可并行但不专门解决跨洲网络路径问题，且与加速可组合。",
      "B": "应用自定义origin的CloudFront分配不自动加速直接S3上传。",
      "C": "S3加速专为长距离桶传输设计。",
      "D": "EC2扩容不改变S3跨洲上传链路。"
    },
    "sources": [
      {
        "url": "https://aws.amazon.com/s3/faqs/",
        "title": "Amazon S3 FAQs Transfer Acceleration",
        "supports": "通过CloudFront边缘站点及优化网络路径改善远距离传输。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "228": {
    "blocker": "一家公司希望对多层 Web 应用程式进行容器化，并将应用程式从 on-premises 资料中心移至 AWS。该应用程式包括网路。应用层和资料库层。公司需要使应用程式具有容错性和可扩展性。一些经常存取的资料必须始终跨应用程式伺服器可用。前端 Web 伺服器需要会话持久性，并且必须扩展以满足流量的成长。哪种解决方案能够以最少的持续营运开销满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：DynamoDB会话加EFS共享文件同时满足条件。"
    ],
    "solutions": "正确答案为 D。EKS managed nodes减少节点管理，Kubernetes deployment管理副本，DynamoDB外置会话支持Web水平扩展，EFS跨实例共享频繁访问文件。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "SQS是消息队列，不能当随机读取的持久会话存储。",
      "B": "EBS Multi-Attach限同AZ，无法按选项跨AZ共享。",
      "C": "EFS可存文件但会话数据库方案D更适合高并发会话与文件分离，ReplicaSet也较低级。",
      "D": "DynamoDB会话加EFS共享文件同时满足条件。"
    },
    "sources": [
      {
        "url": "https://aws.amazon.com/documentation-overview/efs/",
        "title": "Amazon EFS Documentation",
        "supports": "EFS提供跨AZ共享文件系统，支持EKS/容器与多连接共享访问。"
      },
      {
        "url": "https://docs.aws.amazon.com/sdk-for-ruby/aws-sessionstore-dynamodb/api/",
        "title": "AWS DynamoDB Session Store",
        "supports": "DynamoDB可在应用扩展到多个Web服务器后安全且可扩展地集中保存共享会话。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "229": {
    "blocker": "解决方案架构师正计划将关键的 Microsoft SQL Server 资料库迁移到AWS。由于资料库是遗留系统，解决方案架构师会将资料库迁移到现代资料架构。解决方案架构师必须在近乎零停机的情况下迁移资料库。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：原生备份/日志恢复或支持的复制方案可做低停机RDS迁移。"
    ],
    "solutions": "正确答案为 C。用原生SQL Server可用性/复制技术把源库持续同步到RDS，最后切换以减少停机，避免经S3全量重新导入。",
    "result_flow": "RDS不能任意作为SQL Server Always On AG副本；须选官方支持原生复制/日志恢复方法，不能把本题泛化成任意HA连接。",
    "options": {
      "A": "应用迁移后再导出Aurora增加多次切换和停机。",
      "B": "同步到S3后再加载RDS仍有导入停机窗口。",
      "C": "原生备份/日志恢复或支持的复制方案可做低停机RDS迁移。",
      "D": "RDS不支持直接detach/attach本地数据库文件。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/prescriptive-guidance/latest/migration-sql-server/native-backup-restore.html",
        "title": "Native SQL Server backup restore",
        "supports": "RDS SQL Server支持full/differential/log restore用于最小停机迁移。"
      }
    ],
    "audit_caveat": "RDS不能任意作为SQL Server Always On AG副本；须选官方支持原生复制/日志恢复方法，不能把本题泛化成任意HA连接。",
    "audit_status": "confirmed"
  },
  "230": {
    "blocker": "一家公司的解决方案架构师正在分析多应用程式环境的成本。此环境跨多个 Availability Zones 部署在单一 AWS Region 中。经过最近的收购，该公司在AWS Organizations管理两个组织。该公司在一个组织中创建了多个服务提供者应用程序，作为 AWS PrivateLink 支援的 VPC 端点服务。该公司已在其他组织中创建了多个服务用户应用程式。资料传输费用远高于公司预期，解决方案架构师需要降低成本。解决方案架构师必须向开发人员推荐在部署服务时应遵循的指南。这些准则必须最大限度地减少整个环境的资料传输费用。哪些指南符合这些要求？ （选两个。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：关闭NLB cross-zone避免跨AZ送到目标。",
      "D：使用zonal endpoint并同AZ消费减少跨AZ路径。"
    ],
    "solutions": "正确答案为 C、D。NLB关闭跨区分发并在每AZ部署服务后端，消费者使用本AZ endpoint DNS，将流量保持AZ内以避免regional跨AZ传输费。",
    "result_flow": "关cross-zone前每个启用AZ必须有足够健康目标，避免为省费损失可用性。",
    "options": {
      "A": "子网共享不能跨不同组织，并非一般PrivateLink跨AZ费用解决方式。",
      "B": "组织归属不取消跨AZ网络收费。",
      "C": "关闭NLB cross-zone避免跨AZ送到目标。",
      "D": "使用zonal endpoint并同AZ消费减少跨AZ路径。",
      "E": "Savings Plans不覆盖跨AZ数据传输用量。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/vpc/latest/privatelink/create-endpoint-service.html",
        "title": "Create a service powered by AWS PrivateLink",
        "supports": "官方指出启用cross-zone负载均衡产生regional data transfer charges。"
      }
    ],
    "audit_caveat": "关cross-zone前每个启用AZ必须有足够健康目标，避免为省费损失可用性。",
    "audit_status": "confirmed"
  },
  "231": {
    "blocker": "一家公司有一个 on-premises Microsoft SQL Server 资料库，每晚将 200 GB 汇出资料写入本机磁碟机。该公司希望将备份移至Amazon S3上更强大的云端储存。该公司已在on-premises资料中心和AWS之间建立了10 Gbps AWS Direct Connect连线。哪种解决方案最经济有效率地满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：File Gateway支持SMB与S3持久存储。"
    ],
    "solutions": "正确答案为 A。S3 File Gateway提供SMB共享，将SQL Server备份写成S3对象，利用现有10Gbps DX，不需昂贵常驻FSx容量。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "File Gateway支持SMB与S3持久存储。",
      "B": "FSx加其备份成本高于只保存导出的S3方案。",
      "C": "Multi-AZ FSx更昂贵且非必要文件处理。",
      "D": "Volume Gateway提供iSCSI块卷，不提供所述SMB共享。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/filegateway/latest/files3/SQL-Backup-Best-Practices.html",
        "title": "Optimizing S3 File Gateway for SQL Server database backups",
        "supports": "官方推荐数据库备份使用S3 File Gateway，并可lifecycle降低存储成本。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "232": {
    "blocker": "某公司需要建立on-premises资料中心到AWS的连线。该公司需要将位于不同 AWS Regions 的所有 VPC 连接起来，并在 VPC 网路之间提供可传递路由功能。公司还必须降低网路出站流量成本，提高频宽吞吐量，并为最终用户提供一致的网路体验。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：所需专线与多Region骨干基础正确，但缺TGW跨区peering。"
    ],
    "solutions": "参考选择为 B。专线+transit VIF+DX gateway+每Region TGW提供本地到多区域VPC的专用连接及区域内传递路由；跨Region VPC互通还必须配置TGW peering。",
    "result_flow": "如果题干要求所有跨区域VPC彼此传递互通，B按文字并不完整；须补TGW peering与路由。",
    "options": {
      "A": "VPC peering不传递路由且VPN不满足专线的稳定吞吐。",
      "B": "所需专线与多Region骨干基础正确，但缺TGW跨区peering。",
      "C": "单Region TGW不能直接附加其他Region VPC，且VPN非稳定专线。",
      "D": "混用所有VPC VPN/peering复杂且peering不传递。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/directconnect/latest/UserGuide/direct-connect-gateways-intro.html",
        "title": "Direct Connect gateways",
        "supports": "DX gateway不允许同一gateway上的不同gateway associations互相发送流量。"
      }
    ],
    "audit_caveat": "如果题干要求所有跨区域VPC彼此传递互通，B按文字并不完整；须补TGW peering与路由。",
    "audit_status": "ambiguous"
  },
  "233": {
    "blocker": "一家公司正在将其开发和生产工作负载迁移到AWS Organizations ​​的新组织。该公司创建了一个用于开发的单独的会员帐户和一个用于生产的单独的会员帐户。合并帐单连结到管理帐户。在管理帐户中，解决方案架构师需要建立一个 IAM 用户，该用户可以停止或终止两个成员帐户中的资源。哪种解决方案可以满足这个要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：目标账户角色+跨账户信任为正确模式。"
    ],
    "solutions": "正确答案为 D。IAM角色应建在资源所在成员账户，授予停止/终止权限并信任管理账户用户；该用户再获sts:AssumeRole权限。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "仅在管理账户建角色不会自动获得成员资源权限。",
      "B": "方向反了，用户应位于题定管理账户、角色位于目标账户。",
      "C": "不能把外账户IAM用户添加到本账户IAM group。",
      "D": "目标账户角色+跨账户信任为正确模式。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user.html",
        "title": "Create a role to give permissions to an IAM user",
        "supports": "跨账户角色信任源账户principal，源用户需AssumeRole权限。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "234": {
    "blocker": "一家公司希望使用 AWS 对 on-premises 应用程式进行灾难复原。该公司拥有数百台运行该应用程式的基于 Windows 的伺服器。所有伺服器都安装一个公共共用。该公司的RTO为15分钟，RPO为5分钟。此解决方案必须支援本机故障转移和回退功能。哪一种解决方案能够最具成本效益地满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：DRS与FSx Windows最匹配灾备及Windows共享。"
    ],
    "solutions": "正确答案为 D。DRS持续复制Windows服务器并原生执行恢复/回切，共享SMB数据用FSx Windows与DataSync复制，符合原有共享访问模型。",
    "result_flow": "FSx共享的复制频率和耗时需单独验证5分钟RPO；DataSync常规计划最短间隔不能直接当作5分钟保证，需自定义触发与测试。",
    "options": {
      "A": "每日备份无法5分钟RPO，恢复慢。",
      "B": "EFS不是Windows原生SMB共享，DataSync非服务器原生故障恢复工具。",
      "C": "双活全容量成本高，s3 sync不复制完整Windows/共享文件语义。",
      "D": "DRS与FSx Windows最匹配灾备及Windows共享。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/drs/latest/userguide/CloudEndure-Concepts.html",
        "title": "Elastic Disaster Recovery Concepts",
        "supports": "DRS可提供秒级RPO、分钟级RTO并支持恢复工作流。"
      }
    ],
    "audit_caveat": "FSx共享的复制频率和耗时需单独验证5分钟RPO；DataSync常规计划最短间隔不能直接当作5分钟保证，需自定义触发与测试。",
    "audit_status": "confirmed"
  },
  "235": {
    "blocker": "一家公司在AWS中建构了一个高效能运算（HPC）集群，用于紧密耦合的工作负载，该工作负载会产生储存在Amazon EFS中的大量共享档案。当集群中Amazon EC2实例数量为100时，集群表现良好。但是，当公司将集群规模增加到1.000个EC2实例时，整体效能远低于预期。解决方案架构师应该做出哪些设计选择才能实现 HPC 集群的最大效能？ （选择三项。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：同AZ减低节点往返时延。",
      "C：EFA优化紧耦合节点间通信。",
      "F：Lustre专为高性能并行文件访问。"
    ],
    "solutions": "正确答案为 A、C、F。紧耦合HPC需要同AZ低时延网络、支持EFA的实例及并行共享FSx Lustre，以避免多AZ时延和EFS小文件吞吐瓶颈。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "同AZ减低节点往返时延。",
      "B": "没有按四倍数附加ENI的通用优化规则。",
      "C": "EFA优化紧耦合节点间通信。",
      "D": "多AZ增加时延，不利最大紧耦合性能。",
      "E": "EBS RAID不提供千实例共享并行文件系统。",
      "F": "Lustre专为高性能并行文件访问。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/fsx/latest/LustreGuide/configure-efa-clients.html",
        "title": "Configuring EFA clients FSx for Lustre",
        "supports": "EFA Lustre客户端须在文件系统同AZ并使用支持的EFA实例。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "236": {
    "blocker": "某公司正在设计AWS Organizations结构。该公司希望标准化在整个组织中应用标签的流程。当使用者建立新资源时，公司将要求具有特定值的标签。公司的每个OU都将具有唯一的标签值。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：SCP补齐缺标签控制，各OU policy限定其值。"
    ],
    "solutions": "正确答案为 A。SCP拒绝缺少必需request tags的创建请求，tag policy在各OU标准化允许值和键名格式，两者配合控制标签。",
    "result_flow": "Tag policy本身不强制所有资源都具备标签，仅覆盖支持的资源类型；SCP须针对支持request tags的创建API。",
    "options": {
      "A": "SCP补齐缺标签控制，各OU policy限定其值。",
      "B": "仅附管理账户不能按成员OU区分值，SCP也不限制管理账户。",
      "C": "SCP Allow不能对其他已Allow路径形成有效显式限制，Deny策略更可靠。",
      "D": "只列标签并附SCP缺少题定标签值标准化策略，虽可手工写条件但描述不完整。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies.html",
        "title": "Managing organization policies",
        "supports": "Tag policies标准化资源标签，SCP用于权限上限而非资源元数据本身。"
      }
    ],
    "audit_caveat": "Tag policy本身不强制所有资源都具备标签，仅覆盖支持的资源类型；SCP须针对支持request tags的创建API。",
    "audit_status": "confirmed"
  },
  "237": {
    "blocker": "一家公司拥有 10,000 多个感测器，这些感测器使用讯息伫列遥测传输 (MQTT) 协定将资料传送到 on-premises Apache Kafka 伺服器。 on-premises Kafka 伺服器转换数据，然后将结果作为物件储存在 Amazon S3 储存桶中。最近，Kafka伺服器崩溃了。该公司在恢复伺服器时丢失了感测器资料。解决方案架构师必须在AWS上创建高度可用且可扩展的新设计，以防止类似情况发生。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：IoT Core+Firehose/Lambda为托管弹性消息数据管道。"
    ],
    "solutions": "正确答案为 C。IoT Core托管MQTT接入，规则写Firehose，Lambda做转换后Firehose交付S3，消除单机broker与处理瓶颈。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "两台自管Kafka加DNS对持久消息高可用的配置描述不足且维护高。",
      "B": "MSK支持Kafka协议，不直接支持MQTT客户端。",
      "C": "IoT Core+Firehose/Lambda为托管弹性消息数据管道。",
      "D": "单EC2 Kafka仍是处理单点。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/iot/latest/developerguide/kinesis-firehose-rule-action.html",
        "title": "Amazon Data Firehose AWS IoT rule action",
        "supports": "IoT rule可将消息数据发送Data Firehose，再交付存储。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "238": {
    "blocker": "一家公司最近开始在AWS云端中托管新的应用程式工作负载。该公司正在使用 Amazon EC2 实例。 Amazon Elastic File System (Amazon EFS) 档案系统和 Amazon RDS 资料库实例。为了满足法规和业务要求，公司必须对资料备份进行以下更改： • 必须根据自订的每日、每周和每月要求保留Backup。 • Backup 必须在捕获后立即复制到至少一个其他AWS Region。 • 备份解决方案必须在整个AWS 环境中提供单一的备份状态来源。 • 备份解决方案必须在任何资源备份失败时立即发送通知。哪种步骤组合能够以最少的营运开销满足这些要求？ （选择三项。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：每保留要求一条规则提供集中策略。",
      "B：原生copy action最少自建复制工作。",
      "D：失败通知应通过vault通知或EventBridge筛选job状态发送SNS。"
    ],
    "solutions": "正确答案为 A、B、D。AWS Backup统一管理EC2/EFS/RDS，多条rule实现日周月保留，跨Region copy规则复制恢复点，失败事件通知SNS。",
    "result_flow": "D写“把SNS加到backup plan”不精确：配置于backup vault或EventBridge。跨区copy为异步，不能保证捕获后零延迟完成。",
    "options": {
      "A": "每保留要求一条规则提供集中策略。",
      "B": "原生copy action最少自建复制工作。",
      "C": "Lambda复制非必要且增加维护。",
      "D": "失败通知应通过vault通知或EventBridge筛选job状态发送SNS。",
      "E": "DLM主要EBS，不能统一EFS/RDS。",
      "F": "逐库快照缺跨服务统一管理。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/aws-backup/latest/devguide/backup-notifications.html",
        "title": "Notification options with AWS Backup",
        "supports": "AWS Backup可配置SNS通知备份事件及失败。"
      }
    ],
    "audit_caveat": "D写“把SNS加到backup plan”不精确：配置于backup vault或EventBridge。跨区copy为异步，不能保证捕获后零延迟完成。",
    "audit_status": "confirmed"
  },
  "239": {
    "blocker": "一家公司正在开发一种基因报告设备，该设备将收集基因组信息，以帮助研究人员从不同人群中收集大量数据样本。该设备每秒将 8 KB 的基因组数据推送到需要处理和分析数据并向研究人员提供资讯的数据平台。资料平台必须满足以下要求： • 提供入站基因组资料的近即时分析 • 确保资料灵活、并行且持久性 • 将处理结果交付至资料仓储 解决方案架构师应使用哪种策略来满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：Streams+流消费者/EMR+Redshift满足实时处理与仓库目标。"
    ],
    "solutions": "正确答案为 B。Kinesis Data Streams为持续8KB/s事件提供持久分片和并行消费者，EMR可读取分析流并将结果装入Redshift数据仓库。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "Firehose不是供Kinesis client多消费者读取的stream，RDS不是数据仓库。",
      "B": "Streams+流消费者/EMR+Redshift满足实时处理与仓库目标。",
      "C": "SQS不能按选项直接由Kinesis消费者分析，缺流处理路径。",
      "D": "队列方案没有题意并行流分析机制，额外EMR环节表述不合理。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/streams/latest/dev/using-other-services-emr.html",
        "title": "Read data from Kinesis Data Streams using EMR",
        "supports": "EMR可以直接读取和处理Kinesis Streams，支持与其他数据集联结。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "240": {
    "blocker": "解决方案架构师需要为具有 Web、应用程式和 NoSQL 资料层的三层应用程式解决方案定义参考架构。参考架构必须满足以下要求：\n• AWS Region 内的高可用性\n• 能够在 1 分钟内故障转移到另一个 AWS Region 以进行灾难恢复\n• 提供最高效率的解决方案，同时尽量减少对使用者体验的影响\n哪一种步骤组合可以满足这些要求？ （选择三项。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：failover记录和30秒TTL是题给快速DNS切换方案。",
      "C：global table令备用区域无需现场恢复数据库。",
      "E：热备容量可立即接流量，多AZ保证区域内HA。"
    ],
    "solutions": "正确答案为 B、C、E。双区域热备Web/应用组跨AZ部署，DynamoDB global table持续复制数据，Route53 failover短TTL快速引导到灾备，稳定基线用zonal RI保留容量。",
    "result_flow": "30秒TTL不保证端到端1分钟RTO，仍受健康检查阈值、递归缓存和客户端行为影响；需演练或更直接流量切换机制。",
    "options": {
      "A": "1小时TTL不满足1分钟故障切换目标。",
      "B": "failover记录和30秒TTL是题给快速DNS切换方案。",
      "C": "global table令备用区域无需现场恢复数据库。",
      "D": "小时备份与导入无法1分钟恢复。",
      "E": "热备容量可立即接流量，多AZ保证区域内HA。",
      "F": "Spot中断风险不适合全部必需资源及快速恢复保证。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover-configuring.html",
        "title": "Configuring DNS failover",
        "supports": "Route53健康检查与failover路由可在主资源不健康时返回备用记录。"
      }
    ],
    "audit_caveat": "30秒TTL不保证端到端1分钟RTO，仍受健康检查阈值、递归缓存和客户端行为影响；需演练或更直接流量切换机制。",
    "audit_status": "confirmed"
  },
  "241": {
    "blocker": "一家公司生产智慧汽车。该公司使用客制化应用程式来收集车辆数据。车辆使用 MQTT 协定连接到应用程式。该公司每 5 分钟处理一次数据。然后，该公司将车辆远端资讯处理资料复制到本地储存。自订应用程式分析这些数据以检测异常情况。发送资料的车辆数量不断增加。较新的车辆会产生大量数据。 on-premises 储存解决方案无法针对峰值流量进行扩展，导致资料遗失。公司必须对解决方案进行现代化改造并将解决方案迁移到AWS，以解决扩展挑战。哪种解决方案能够以最少的营运开销满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：在旧版KDA SQL支持FirehoseInput时该管道有效。"
    ],
    "solutions": "正确答案为 B。历史架构以IoT Core接收MQTT，经Firehose写S3，Kinesis Data Analytics for SQL可把Firehose delivery stream作输入做异常分析。",
    "result_flow": "Kinesis Data Analytics for SQL已于2026-01停止运行；当前需改用Kinesis Data Streams+Managed Service for Apache Flink等。B是历史能力答案，不能直接作为新部署方案。",
    "options": {
      "A": "Greengrass到MSK加自建Kafka应用及预训练异常模型管理更多。",
      "B": "在旧版KDA SQL支持FirehoseInput时该管道有效。",
      "C": "Glue内建ML transforms不能泛指任意实时车辆异常检测。",
      "D": "Amazon MQ for RabbitMQ不支持题中MQTT接入方式，Lookout也有停服变更。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/kinesisanalytics/latest/dev/API_KinesisFirehoseInput.html",
        "title": "KinesisFirehoseInput",
        "supports": "官方API明确Firehose delivery stream可作旧KDA SQL streaming source。"
      }
    ],
    "audit_caveat": "Kinesis Data Analytics for SQL已于2026-01停止运行；当前需改用Kinesis Data Streams+Managed Service for Apache Flink等。B是历史能力答案，不能直接作为新部署方案。",
    "audit_status": "confirmed"
  },
  "242": {
    "blocker": "在审核期间，安全团队发现开发团队将 IAM 使用者秘密存取金钥放入其程式码中，然后将其提交至 AWS CodeCommit 储存库。安全团队希望自动寻找并修复此安全漏洞的实例。哪种解决方案将确保凭证自动受到适当保护？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：push trigger支持Lambda，Lambda可自定义扫描与禁用IAM key。"
    ],
    "solutions": "正确答案为 D。CodeCommit push trigger调用Lambda扫描提交内容，发现泄露access key后立即IAM禁用并通知责任人，及时事件驱动处置。",
    "result_flow": "禁用泄露key后还需清理Git历史并改用角色临时凭证，扫描不能追回已经泄露的数据。",
    "options": {
      "A": "夜间扫描不及时且Secrets Manager不能自动轮换未纳管IAM keys。",
      "B": "定时扫描慢，KMS不是存放任意访问密钥的secret库。",
      "C": "Macie原生扫描S3而非CodeCommit。",
      "D": "push trigger支持Lambda，Lambda可自定义扫描与禁用IAM key。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/codecommit/latest/userguide/how-to-notify.html",
        "title": "Manage triggers for a CodeCommit repository",
        "supports": "代码push事件可直接触发Lambda函数。"
      }
    ],
    "audit_caveat": "禁用泄露key后还需清理Git历史并改用角色临时凭证，扫描不能追回已经泄露的数据。",
    "audit_status": "confirmed"
  },
  "243": {
    "blocker": "一家公司在 Amazon S3 中有一个资料湖，需要由许多 AWS 帐户中的数百个应用程式存取。该公司的资讯安全政策规定，不得透过公共网路存取S3储存桶，且每个应用程式应具有运作所需的最低权限。为了满足这些要求，解决方案架构师计划使用S3接入点，该接入点仅限于每个应用程式的特定VPC。解决方案架构师应采取哪些步骤组合来实作该解决方案？ （选两个。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：桶拥有账户创建AP是有效模式，需为目标VPC和跨账户权限配置。",
      "C：各消费VPC gateway endpoint与对应route tables提供私网S3路径。"
    ],
    "solutions": "参考选择为 A、C。VPC限制的每应用Access Point配合各应用VPC内的S3 gateway endpoint及最小权限策略实现私网访问；但当前也支持D的跨账户Access Point，因此创建位置不再唯一。",
    "result_flow": "A+C为原保留组合；当前D+C也可成立，不能再以AP必须与桶同账户排除D。",
    "options": {
      "A": "桶拥有账户创建AP是有效模式，需为目标VPC和跨账户权限配置。",
      "B": "interface endpoint没有所述VPC gateway attachment，混淆接口/网关端点。",
      "C": "各消费VPC gateway endpoint与对应route tables提供私网S3路径。",
      "D": "当前可在消费账户创建关联另一账户桶的AP，桶主须显式授权；不是天然错误。",
      "E": "只在数据湖VPC创建endpoint不能供其他不互通VPC自动使用。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/creating-access-points.html",
        "title": "Creating an access point",
        "supports": "官方支持关联其他AWS账户桶的cross-account access point，需桶拥有者授予访问。"
      }
    ],
    "audit_caveat": "A+C为原保留组合；当前D+C也可成立，不能再以AP必须与桶同账户排除D。",
    "audit_status": "ambiguous"
  },
  "244": {
    "blocker": "一家公司开发了其资料中心和AWS之间的混合解决方案。该公司使用 Amazon VPC 和 Amazon EC2 实例将应用程式日志传送到 Amazon CloudWatch。 EC2 执行个体从本地托管的多个关联式资料库读取资料。该公司希望近乎即时地监控哪些 EC2 实例连接到资料库。该公司已经拥有在本地使用 Splunk 的监控解决方案。解决方案架构师需要确定如何将网路流量传送到 Splunk。解决方案架构师应该如何满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：Flow Logs到Logs subscription到Firehose/Splunk是流式路径。"
    ],
    "solutions": "正确答案为 B。VPC Flow Logs提供源/目标IP与端口连接元数据，写CloudWatch Logs后订阅Firehose，经解包预处理投递Splunk，近实时且少手动搬运。",
    "result_flow": "Flow Logs不是数据包镜像且有聚合/交付延迟；需选最短支持聚合窗口。",
    "options": {
      "A": "周期导出S3延迟高并使用长期密钥。",
      "B": "Flow Logs到Logs subscription到Firehose/Splunk是流式路径。",
      "C": "要求应用逐请求写日志再多次导出查询过于复杂。",
      "D": "普通应用日志未必包含连接信息，异常检测也不是本题连接清单需要。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/firehose/latest/dev/writing-with-cloudwatch-logs-decompression.html",
        "title": "Decompress CloudWatch Logs",
        "supports": "Firehose可接CloudWatch Logs订阅并解压日志记录供交付。"
      }
    ],
    "audit_caveat": "Flow Logs不是数据包镜像且有聚合/交付延迟；需选最短支持聚合窗口。",
    "audit_status": "confirmed"
  },
  "245": {
    "blocker": "一家公司有 5 个开发团队，每个团队都创建了 5 个 AWS 帐户来开发和托管应用程式。为了追踪支出，开发团队每月登入每个帐户，从AWS计费和成本管理控制台记录当前成本，并将资讯提供给公司的财务团队。公司有严格的合规要求，需要确保资源仅在美国的AWSRegions创建。不过，在其他Regions中已经创建了一些资源。解决方案架构师需要实施一个解决方案，使财务团队能够追踪和合并所有帐户的支出。该解决方案还必须确保公司只能在美国的Regions 创建资源。哪一种步骤组合能够以最有效率的方式满足这些要求？ （选择三项。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：邀请全部账户进入组织形成合并账单和治理。",
      "D：显式Deny非美国区域能可靠收紧权限。",
      "E：管理账户账单只读角色提供集中访问。"
    ],
    "solutions": "正确答案为 B、D、E。Organizations All features集中组织账单与SCP，将成员放开发OU并显式拒绝非美国区域操作；财务承担管理账户只读账单角色看Cost Explorer。",
    "result_flow": "全局IAM/Route53等服务需NotAction例外，SCP只影响受管成员账户而非管理账户。",
    "options": {
      "A": "只建管理账户和CUR而不组织现有账户不解决聚合。",
      "B": "邀请全部账户进入组织形成合并账单和治理。",
      "C": "单独Allow规则不能覆盖其他Allow路径中的非美国操作。",
      "D": "显式Deny非美国区域能可靠收紧权限。",
      "E": "管理账户账单只读角色提供集中访问。",
      "F": "逐账户角色比集中管理费时，不能解决创建区域约束。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/prescriptive-guidance/latest/security-reference-architecture/multi-region-architecture.html",
        "title": "Multi Region Architecture AWS SRA",
        "supports": "使用aws:RequestedRegion显式Deny SCP并对全球服务配置例外。"
      }
    ],
    "audit_caveat": "全局IAM/Route53等服务需NotAction例外，SCP只影响受管成员账户而非管理账户。",
    "audit_status": "confirmed"
  },
  "246": {
    "blocker": "公司需要从一个中心位置为多个部门建立和管理多个 AWS 帐户。安全团队要求自己的 AWS 帐户对所有帐户具有唯读存取权。该公司正在使用AWS Organizations并为安全团队建立了一个帐户。解决方案架构师应该如何满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：每成员账户专用只读role符合最小权限。"
    ],
    "solutions": "正确答案为 B。用管理账户原组织访问角色在每个成员账户创建安全团队专用ReadOnly角色，信任安全账户并授权承担，避免授予管理员角色。",
    "result_flow": "被邀请的既有账户不自动有此角色，需另建访问或用StackSets等部署。",
    "options": {
      "A": "IAM policy不能有跨账户可assume的信任关系，必须role。",
      "B": "每成员账户专用只读role符合最小权限。",
      "C": "OrganizationAccountAccessRole主要位于成员账户且授管理员权，不在管理账户提供所有只读。",
      "D": "原角色通常信任管理账户并有管理员权，不能直接当安全团队只读。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_accounts_access-cross-account-role.html",
        "title": "Accessing member account with OrganizationAccountAccessRole",
        "supports": "组织创建成员账户时默认角色拥有该成员完整管理员权限，信任管理账户。"
      }
    ],
    "audit_caveat": "被邀请的既有账户不自动有此角色，需另建访问或用StackSets等部署。",
    "audit_status": "confirmed"
  },
  "247": {
    "blocker": "一家大公司在 VPC 中运行工作负载，这些工作负载部署在数百个 AWS 帐户中。每个VPC 由公共子网和跨越多个Availability Zones 的私有子网组成。 NAT 闸道部署在公用子网路中，并允许从私有子网路出站连接到 Internet。解决方案架构师正在研究中心辐射型设计。分支 VPC 中的所有私有子网路必须透过出口 VPC 将流量路由到网际网路。解决方案架构师已在中央 AWS 帐户的出口 VPC 中部署了 NAT 网关。解决方案架构师应该采取哪一组附加步骤来满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：TGW提供多账户spoke到中央egress的路由。"
    ],
    "solutions": "正确答案为 B。共享TGW连接各spoke及egress VPC，spoke默认路由经TGW到出口NAT，返回路径也经对应TGW，实现集中出网。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "peering不支持借用对端NAT实现传递出网。",
      "B": "TGW提供多账户spoke到中央egress的路由。",
      "C": "NAT不是可直接附加TGW的资源，应附egress VPC。",
      "D": "PrivateLink暴露服务，不提供任意互联网转发。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/vpc/latest/tgw/transit-gateway-nat-igw.html",
        "title": "Transit Gateway centralized egress",
        "supports": "TGW与集中出口VPC中的NAT/IGW组合提供出站路径。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "248": {
    "blocker": "一家教育公司正在运行一个供世界各地大学生使用的网路应用程式。该应用程式在Application Load Balancer (ALB)后面的Auto Scaling组中的Amazon Elastic Container Service (Amazon ECS)集群中运行。系统管理员侦测到每周失败的登入尝试次数激增，这导致应用程式的身份验证服务不堪负荷。所有失败的登入尝试均来自约 500 个每周都会变更的不同 IP 位址。解决方案架构师必须防止失败的登入尝试淹没身分验证服务。哪种解决方案能够以最高的营运效率满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：托管速率规则无需每周维护攻击IP清单。"
    ],
    "solutions": "正确答案为 B。WAF rate-based规则按请求速率自动阻断超量来源，IP每周变化仍可工作，ALB前拦截登录洪泛。",
    "result_flow": "应以登录路径scope-down，分布式低速攻击可能需聚合键/ATP规则，单IP阈值不保证覆盖所有botnet。",
    "options": {
      "A": "安全组只支持Allow，不能配置显式Deny。",
      "B": "托管速率规则无需每周维护攻击IP清单。",
      "C": "固定允许CIDR不适合全球学生公网来源。",
      "D": "固定IP set需持续更新，不如速率规则自动。"
    },
    "sources": [
      {
        "url": "https://aws.amazon.com/waf/faqs/",
        "title": "AWS WAF FAQs",
        "supports": "rate-based rules适用于暴力登录、坏bot和Web层DDoS。"
      }
    ],
    "audit_caveat": "应以登录路径scope-down，分布式低速攻击可能需聚合键/ATP规则，单IP阈值不保证覆盖所有botnet。",
    "audit_status": "confirmed"
  },
  "249": {
    "blocker": "一家公司经营一个 on-premises 软体即服务 (SaaS) 解决方案，每天都会摄取多个档案。该公司向客户提供多个公共SFTP端点以促进文件传输。客户将 SFTP 端点 IP 位址新增至出站流量的防火墙允许清单中。不允许更改SFTP端点IP位址。该公司希望将 SaaS 解决方案迁移到AWS，并减少文件传输服务的营运开销。哪种解决方案满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：BYOIP EIP+Transfer Family保留原IP且少运维。"
    ],
    "solutions": "正确答案为 A。将符合BYOIP要求的原有公网地址段引入AWS并分配EIP，绑定Transfer Family internet-facing VPC endpoint，保持客户白名单IP并托管SFTP到S3。",
    "result_flow": "前提必须拥有可引入AWS的IP前缀及路由授权；无法保留ISP不允许转移的普通租用IP。",
    "options": {
      "A": "BYOIP EIP+Transfer Family保留原IP且少运维。",
      "B": "不能向ALB绑定EIP，且FTP不等于SFTP。",
      "C": "Route53不注册BYOIP地址段，EC2自管也更重。",
      "D": "S3 endpoint不能这样绑定EIP或启用桶原生SFTP。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/transfer/latest/userguide/create-server-in-vpc.html",
        "title": "Create a server in a VPC AWS Transfer Family",
        "supports": "VPC-hosted internet-facing SFTP端点可关联EIP，客户用固定IP防火墙白名单。"
      }
    ],
    "audit_caveat": "前提必须拥有可引入AWS的IP前缀及路由授权；无法保留ISP不允许转移的普通租用IP。",
    "audit_status": "confirmed"
  },
  "250": {
    "blocker": "一家公司有一个新应用程序，需要在单一 AWS Region 中的 5 个 Amazon EC2 实例上运行。该应用程式需要在运行该应用程式的所有EC2实例之间建立高吞吐量、低延迟的网路连线。应用程式不要求具有容错能力。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：cluster placement专门面向紧密网络互联。"
    ],
    "solutions": "正确答案为 A。cluster placement group把实例集中在同AZ低时延网络位置，配合enhanced networking提供高吞吐低时延，不要求故障隔离。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "cluster placement专门面向紧密网络互联。",
      "B": "额外ENI不自动提高实例网络上限，ASG也不保证紧邻放置。",
      "C": "partition为故障域隔离，不是最低网络时延。",
      "D": "spread分散硬件，与低时延集中放置目标相反。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/placement-strategies.html",
        "title": "Placement strategies for placement groups",
        "supports": "cluster group推荐低时延/高吞吐应用，enhanced networking提升包性能。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "251": {
    "blocker": "一家公司正在创建一个 REST API，以与位于美国的六个合作伙伴共享资讯。该公司创建了一个 Amazon API Gateway Regional 端点。六个合作伙伴中的每一个每天都会存取 API 一次，以发布每日销售数据。在初始部署后，该公司观察到每秒来自全球 500 个不同 IP 位址的 1,000 个请求。该公司认为该流量源自僵尸网络，并希望保护其 API，同时最大限度地降低成本。公司应采取哪种方法来保护其 API 安全？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：WAF限制IP并用usage plan管理配额是题给完整方案。"
    ],
    "solutions": "正确答案为 D。六家固定合作伙伴用WAF IP allowlist限制来源，API Gateway usage plan+API key设置每客户请求配额与节流，无需CloudFront额外层。",
    "result_flow": "API key用于计量不是认证；实际敏感API还应IAM/Lambda/Cognito认证，配额为best effort而非严格限额。",
    "options": {
      "A": "OAI用于S3，不能授权API Gateway；WAF速率窗口不支持按天5次该方式。",
      "B": "额外CloudFront不必要，API key不构成安全身份认证。",
      "C": "resource policy不设置请求数量配额。",
      "D": "WAF限制IP并用usage plan管理配额是题给完整方案。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-api-usage-plans.html",
        "title": "Usage plans and API keys for REST APIs",
        "supports": "usage plan以API key识别客户端并定义目标速率/配额。"
      }
    ],
    "audit_caveat": "API key用于计量不是认证；实际敏感API还应IAM/Lambda/Cognito认证，配额为best effort而非严格限额。",
    "audit_status": "confirmed"
  },
  "252": {
    "blocker": "一家公司为单一 AWS Region 中的应用程式使用 Amazon Aurora PostgreSQL 资料库集群。公司的资料库团队必须监控所有资料库上的所有资料活动。哪种解决方案将实现这一目标？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：DAS+Kinesis+Firehose是官方支持管道。"
    ],
    "solutions": "正确答案为 C。Aurora Database Activity Streams在集群级记录所有实例数据库活动并推到自动创建的Kinesis stream，Firehose可消费归档到S3。",
    "result_flow": "DAS负载经KMS数据密钥加密，明文分析前需正确解密/解压，Firehose归档不等于自动明文解析。",
    "options": {
      "A": "DMS CDC只捕捉数据变更，不覆盖全部查询与审计活动。",
      "B": "活动流原生目标是Kinesis Data Streams而非EventBridge。",
      "C": "DAS+Kinesis+Firehose是官方支持管道。",
      "D": "DMS没有该Firehose目标，CDC也不记录所有活动。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/DBActivityStreams.html",
        "title": "Monitoring Aurora with Database Activity Streams",
        "supports": "DAS在集群级开启，活动近实时推Kinesis，可由Firehose/Lambda消费。"
      }
    ],
    "audit_caveat": "DAS负载经KMS数据密钥加密，明文分析前需正确解密/解压，Firehose归档不等于自动明文解析。",
    "audit_status": "confirmed"
  },
  "253": {
    "blocker": "一家娱乐公司最近推出了一款新游戏。为了确保上线期间为玩家提供良好的体验，公司在Network Load Balancer后面静态部署了12个r6g.16xlarge（内存优化）Amazon EC2实例。该公司的营运团队使用 Amazon CloudWatch 代理和自订指标将记忆体利用率纳入其监控策略。对发布期间的CloudWatch指标的分析显示，CPU和记忆体的消耗约为公司预期的四分之一。最初对游戏的需求已经减弱，并且变得更加多变。该公司决定使用Auto Scaling组来监控CPU和记忆体消耗，以动态扩展实例组。解决方案架构师需要配置Auto Scaling组，以便以最具成本效益的方式满足需求。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：同系列四分之一规格适配观察到的CPU/内存比。"
    ],
    "solutions": "正确答案为 C。CPU和内存同时约为原配置四分之一，r6g.4xlarge保持相同内存CPU比例且为16xlarge的四分之一；ASG从3台到12台按需求弹性。",
    "result_flow": "仍需验证三台最小容量在游戏会话、网络带宽及单节点失效下可用，观察数据不是无限期容量保证。",
    "options": {
      "A": "c6g同核数内存明显更少，不能保原内存需求。",
      "B": "m6g内存比例低于r6g，可能内存不足。",
      "C": "同系列四分之一规格适配观察到的CPU/内存比。",
      "D": "8xlarge仍是原一半规格，对当前负载偏大。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/ec2/latest/instancetypes/mo.html",
        "title": "Memory optimized instances",
        "supports": "R系列为内存优化，r6g规格随尺寸增加维持同系列内存/CPU比例。"
      }
    ],
    "audit_caveat": "仍需验证三台最小容量在游戏会话、网络带宽及单节点失效下可用，观察数据不是无限期容量保证。",
    "audit_status": "confirmed"
  },
  "254": {
    "blocker": "一家金融服务公司将数百万笔历史股票交易加载到Amazon DynamoDB 表中。此表采用按需扩容模式。每天午夜一次，数百万笔新记录会载入到表格中。针对表的应用程式读取活动全天突然发生。并且重复寻找一组有限的按键。公司需要降低与DynamoDB相关的成本。解决方案架构师应该推荐哪种策略来满足此要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：DAX降低重复读，provisioned配auto scaling降低容量成本。"
    ],
    "solutions": "正确答案为 D。重复少量热点键适合DAX缓存减少读容量，改provisioned并autoscaling让容量随需求调整，比仅按需读更可能省费。",
    "result_flow": "预配autoscaling有响应延迟，已知午夜批量写应预先计划扩容；现今Database Savings Plans能力不应与旧Compute SP混淆。",
    "options": {
      "A": "ElastiCache可缓存但需自定义DynamoDB集成与缓存失效。",
      "B": "未切provisioned不能使用表读写auto scaling，且Savings Plan不是题目主要缓存方案。",
      "C": "缺少DAX热点缓存及自动扩缩，不能完整对应需求。",
      "D": "DAX降低重复读，provisioned配auto scaling降低容量成本。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/prescriptive-guidance/latest/optimize-costs-microsoft-workloads/net-caching.html",
        "title": "Use caching to reduce database demand",
        "supports": "DAX对热点键重复读取可减少DynamoDB RCU和过度预配成本。"
      }
    ],
    "audit_caveat": "预配autoscaling有响应延迟，已知午夜批量写应预先计划扩容；现今Database Savings Plans能力不应与旧Compute SP混淆。",
    "audit_status": "confirmed"
  },
  "255": {
    "blocker": "一家公司正在创建一个在 Amazon EC2 上运行的集中式日志记录服务，该服务将接收和分析来自数百个 AWS 帐户的日志。 AWS PrivateLink 用于提供客户端服务和日志记录服务之间的连线。在每个具有客户端的AWS帐户中，已为日志记录服务建立了一个介面端点并且可用。在具有 Network Load Balancer (NLB) 的 EC2 实例上执行的日志服务部署在不同的子网路中。用户端无法使用 VPC 端点提交日志。解决方案架构师应采取哪些步骤组合来解决此问题？ （选两个。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：NLB与后端EC2的双向stateless ACL必查。",
      "C：允许NLB来源符合PrivateLink源IP处理。"
    ],
    "solutions": "正确答案为 A、C。PrivateLink后端看到的客户端源地址为NLB私有IP，EC2安全组允许NLB子网/相应来源，NACL需允许NLB与EC2子网双向通信及返回端口。",
    "result_flow": "旧解析“NLB永远没有SG”已过时；2023后创建NLB可附SG。若附SG且强制PrivateLink inbound检查也需检查它，但A/C是题干既有架构预期检查。",
    "options": {
      "A": "NLB与后端EC2的双向stateless ACL必查。",
      "B": "endpoint ENI子网不是后端看到的原始路由源。",
      "C": "允许NLB来源符合PrivateLink源IP处理。",
      "D": "仅允许终端客户源IP不能匹配PrivateLink到后端流量。",
      "E": "新NLB可有安全组，需按实际inbound规则检查；但它不替代题意后端来源检查。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/elasticloadbalancing/latest/network/edit-target-group-attributes.html",
        "title": "Edit target group attributes for NLB",
        "supports": "PrivateLink流量不保留原客户端IP，后端源为NLB地址。"
      }
    ],
    "audit_caveat": "旧解析“NLB永远没有SG”已过时；2023后创建NLB可附SG。若附SG且强制PrivateLink inbound检查也需检查它，但A/C是题干既有架构预期检查。",
    "audit_status": "confirmed"
  },
  "256": {
    "blocker": "一家公司在 Amazon S3 储存桶中有数百万个物件。这些物件属于 S3 标准储存类别。所有S3物件都被频繁存取。访问对象的用户和应用程式的数量正在迅速增加。这些物件透过使用 AWS KMS 金钥 (SSE-KMS) 的伺服器端加密进行加密。解决方案架构师检查了公司每月的 AWS 发票，并注意到由于 Amazon S3 的请求数量较多，AWS KMS 成本正在增加。解决方案架构师需要透过对应用程式进行最小的更改来优化成本。哪种解决方案能够以最少的营运开销满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：SSE-S3由S3托管密钥，不产生该KMS请求费用。"
    ],
    "solutions": "正确答案为 B。题给选项中改SSE-S3消除KMS逐次请求成本，且无客户密钥管理逻辑改造；高频访问无需转冷层。",
    "result_flow": "实际最少改动通常先启用S3 Bucket Keys保留SSE-KMS；选项未提供。若合规强制KMS，则B不满足，需核验要求。",
    "options": {
      "A": "SSE-C要求应用每次请求携带客户密钥，开销大。",
      "B": "SSE-S3由S3托管密钥，不产生该KMS请求费用。",
      "C": "CloudHSM不能按选项直接作S3原生SSE密钥源，成本维护高。",
      "D": "频繁访问对象不会冷归档，也不解决KMS请求费。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingKMSEncryption.html",
        "title": "Using server side encryption with AWS KMS keys",
        "supports": "AWS说明S3 Bucket Keys可减少KMS请求费用；SSE-KMS按KMS调用产生费用。"
      }
    ],
    "audit_caveat": "实际最少改动通常先启用S3 Bucket Keys保留SSE-KMS；选项未提供。若合规强制KMS，则B不满足，需核验要求。",
    "audit_status": "confirmed"
  },
  "257": {
    "blocker": "媒体储存应用程式将使用者照片上传到Amazon S3以供AWS Lambda函数处理。应用程式状态储存在Amazon DynamoDB表中。用户报告称，某些上传的照片未正确处理。应用程式开发人员追踪日志发现，当数千名用户同时上传照片时，Lambda 遇到了照片处理问题。这些问题是 Lambda 并发限制和保存资料时DynamoDB的效能造成的。解决方案架构师应该采取哪种操作组合来提高应用程式的效能和可靠性？ （选两个。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：提升WCU处理写峰。",
      "D：队列缓冲、重试与DLQ增加可靠性。"
    ],
    "solutions": "正确答案为 B、D。写入失败应提高DynamoDB WCU，S3事件先入SQS后Lambda按可用并发消费并重试，防止高峰耗尽并发导致处理丢失。",
    "result_flow": "需配置足够visibility timeout、部分批次失败响应、最大并发及DLQ；重复投递要求处理幂等。",
    "options": {
      "A": "问题是保存写入，读容量不是主要瓶颈。",
      "B": "提升WCU处理写峰。",
      "C": "缓存不能解决图片处理并发与写限流。",
      "D": "队列缓冲、重试与DLQ增加可靠性。",
      "E": "上传加速不增加Lambda/DynamoDB处理能力。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/lambda/latest/dg/with-sqs.html",
        "title": "Using Lambda with Amazon SQS",
        "supports": "Lambda通过event source mapping轮询SQS并处理批次，失败消息重试。"
      },
      {
        "url": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/read-write-operations.html",
        "title": "DynamoDB read and write operations",
        "supports": "插入/更新/删除消耗write capacity，写入高峰应调整WCU。"
      }
    ],
    "audit_caveat": "需配置足够visibility timeout、部分批次失败响应、最大并发及DLQ；重复投递要求处理幂等。",
    "audit_status": "confirmed"
  },
  "258": {
    "blocker": "一家公司在 on-premises 资料中心运行应用程式。该应用程式使用户能够上传媒体档案。文件保留在文件伺服器中。 Web 应用程式有很多使用者。应用程式伺服器使用率过高，偶尔会导致资料上传失败。该公司经常向文件伺服器添加新储存。该公司希望透过将应用程式迁移到AWS来解决这些挑战。来自美国和加拿大各地的用户访问该应用程式。只有经过身份验证的使用者才能存取应用程式来上传档案。公司会考虑重构应用程式的解决方案，公司需要加速应用程式开发。哪种解决方案能够以最少的营运开销满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：Amplify Hosting+S3 Storage+Cognito为托管Web上传组合。"
    ],
    "solutions": "正确答案为 D。Amplify加速前端开发与托管，CloudFront分发网站，Cognito认证后直接上传S3，消除原服务器上传/存储瓶颈。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "EC2+ALB仍需应用和基础设施维护。",
      "B": "Identity Center主要服务员工AWS访问，非此公网客户认证首选。",
      "C": "AppSync/Lambda中转媒体多一层复杂性和负载限制。",
      "D": "Amplify Hosting+S3 Storage+Cognito为托管Web上传组合。"
    },
    "sources": [
      {
        "url": "https://aws.amazon.com/blogs/storage/allowing-external-users-to-securely-and-directly-upload-files-to-amazon-s3/",
        "title": "Allowing external users to securely directly upload to S3",
        "supports": "官方方案用Amplify、CloudFront和Cognito使浏览器用户认证后直接上传S3，避免服务器中转。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "259": {
    "blocker": "一家公司有一个应用程式部署在 Application Load Balancer (ALB) 后面的 Amazon EC2 实例上。这些实例是 Auto Scaling 群组的一部分。该应用程式具有不可预测的工作负载，并且经常横向扩展和收缩。该公司的开发团队希望分析应用程式日志，以找到提高应用程式效能的方法。但是，在实例缩减后，日志将不再可用。哪种解决方案将使开发团队能够在缩减事件后查看应用程式日志？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：外部日志收集不随实例终止消失。"
    ],
    "solutions": "正确答案为 B。统一CloudWatch agent实时把实例应用日志送CloudWatch Logs，日志独立于EC2寿命，在缩容后仍可分析。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "ALB access log不含应用内部日志。",
      "B": "外部日志收集不随实例终止消失。",
      "C": "更换扩缩策略不保存日志。",
      "D": "X-Ray追踪不能替代完整应用日志归档。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/QuickStartEC2Instance.html",
        "title": "Configure CloudWatch Logs agent on EC2",
        "supports": "统一CloudWatch agent可从EC2收集日志和指标。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "260": {
    "blocker": "一家公司运行一个未经身份验证的静态网站 (www.example.com)，其中包含用户注册表单。该网站使用 Amazon S3 进行托管，并使用 Amazon CloudFront 作为内容交付网络，并配置了 AWS WAF。提交注册表单后，网站会呼叫 Amazon API Gateway API 端点，该端点会呼叫 AWS Lambda 函数来处理有效负载并将有效负载转送到外部 API 呼叫。在测试过程中，解决方案架构师遇到跨来源资源共享 (CORS) 错误。解决方案架构师确认 CloudFront 分发来源的 Access-Control-Allow-Origin 标头设定为 www.example.com。解决方案架构师应该如何解决该错误？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：在实际被跨源访问的API配置CORS。"
    ],
    "solutions": "正确答案为 C。浏览器从网站跨源调用API，必须由API响应包含正确CORS header并处理preflight，修改S3静态源站头不能授权另一个API域。",
    "result_flow": "Access-Control-Allow-Origin须精确为https://www.example.com等带scheme的origin，裸www.example.com无效；REST proxy需Lambda正确返回各类响应头。",
    "options": {
      "A": "S3 CORS只影响访问S3，不影响API Gateway端点。",
      "B": "WAF没有该一键CORS设置。",
      "C": "在实际被跨源访问的API配置CORS。",
      "D": "Lambda proxy可返回CORS header但Lambda本身无通用“开启CORS”开关，仍须处理API预检/错误响应。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-cors.html",
        "title": "Configure CORS for HTTP APIs",
        "supports": "API Gateway可为不同origin的浏览器API请求配置allowOrigins和预检。"
      }
    ],
    "audit_caveat": "Access-Control-Allow-Origin须精确为https://www.example.com等带scheme的origin，裸www.example.com无效；REST proxy需Lambda正确返回各类响应头。",
    "audit_status": "confirmed"
  },
  "261": {
    "blocker": "一家公司拥有许多独立的 AWS 帐户，并且不使用集中计费或管理。每个AWS帐户为公司不同部门提供服务。该公司已部署 Microsoft Azure Active Directory。解决方案架构师需要集中公司AWS帐户的计费和管理。该公司希望开始使用身份联合而不是手动用户管理。该公司还希望使用临时凭证而不是长期存取密钥。哪一种步骤组合可以满足这些要求？ （选择三项。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：邀请现有账户形成集中组织。",
      "C：IdP集成与SCIM自动同步避免本地IAM用户管理。",
      "E：permission set定义多账户授权。"
    ],
    "solutions": "正确答案为 A、C、E。Organizations集中账户账单；Identity Center联接Azure AD外部IdP并同步用户组，permission sets按组与账户授予短期联邦会话。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "邀请现有账户形成集中组织。",
      "B": "邮箱别名不集中权限或账单。",
      "C": "IdP集成与SCIM自动同步避免本地IAM用户管理。",
      "D": "已有Azure AD无需新建Managed AD。",
      "E": "permission set定义多账户授权。",
      "F": "IAM不能按描述直接接Managed AD完成全账户身份管理。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/singlesignon/latest/userguide/permissionsets.html",
        "title": "Create manage delete permission sets",
        "supports": "permission sets定义用户组对一个或多个AWS账户的授权和会话时长。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "262": {
    "blocker": "一家公司希望透过迁移到 AWS 来管理与 20 个不经常使用但仍对业务至关重要的应用程式群组相关的成本。这些应用程式是 Java 和 Node.js 的混合体，分布在不同的实例集群上。该公司希望透过使用单一部署方法来实现标准化，同时最大限度地降低成本。大多数应用程式是具有少量并发用户的月末处理例程的一部分，但它们偶尔会在其他时间运行。平均应用程式记忆体消耗小于 1 GB。尽管某些应用程式在高峰处理期间使用多达 2.5 GB 的记忆体。该群组中最重要的应用程式是用 Java 编写的计费报告，它存取多个资料来源并且通常运行几个小时。哪一个是最具成本效益的解决方案？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：ECS支持长期任务、容器复用和实例按负载扩缩。"
    ],
    "solutions": "正确答案为 B。将Java/Node应用统一容器化运行ECS EC2，按任务和内存扩缩；数小时关键报表超出标准Lambda15分钟限制，不能全量迁函数。",
    "result_flow": "应避免24小时保持不用的EC2节点，按需求容量提供者/调度实现成本控制。",
    "options": {
      "A": "标准Lambda最长15分钟，无法直接跑数小时报表。",
      "B": "ECS支持长期任务、容器复用和实例按负载扩缩。",
      "C": "每应用独立Beanstalk环境有更多最低实例开销。",
      "D": "按GroupMaxSize买3年RI把偶发峰值固化成长期费用。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/lambda/latest/dg/configuration-timeout.html",
        "title": "Configure Lambda function timeout",
        "supports": "标准Lambda最长900秒，无法单次执行数小时。"
      }
    ],
    "audit_caveat": "应避免24小时保持不用的EC2节点，按需求容量提供者/调度实现成本控制。",
    "audit_status": "confirmed"
  },
  "263": {
    "blocker": "解决方案架构师需要检视使用 EMR 档案系统 (EMRFS) 的 Amazon EMR 集群的设计。集群执行对业务需求至关重要的任务。集群始终为所有任务、主节点和核心节点执行 Amazon EC2 按需实例。 EMR 任务每天早上运行，从凌晨 1:00 开始。并需要6小时才能完成运作。完成处理的时间量不是优先考虑的问题，因为直到当天晚些时候才会引用资料。解决方案架构师必须审查架构并提出解决方案以最大限度地降低计算成本。解决方案架构师应该推荐哪一种解决方案来满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：可靠主/core、Spot任务、全终止同时减运行时和单价。"
    ],
    "solutions": "正确答案为 B。保留主/core On-Demand保护集群稳定，将可中断任务节点用Spot，作业结束终止整个临时EMR集群，避免剩18小时空转。",
    "result_flow": "Compute SP是每小时持续承诺，单集群每天仅6小时不宜承诺全天峰额；需靠其他组织负载消化闲时。若完全接受重跑，A也可能更便宜，题目business-critical支持B。",
    "options": {
      "A": "全Spot可能中断primary/core，业务关键作业需允许重做才适用。",
      "B": "可靠主/core、Spot任务、全终止同时减运行时和单价。",
      "C": "全On-Demand错过容错任务的Spot节省。",
      "D": "只停task仍让primary/core全天空转，EMRFS数据在S3不需常驻集群。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-plan-instances-guidelines.html",
        "title": "EMR instance types and Spot best practices",
        "supports": "官方推荐主/core On-Demand、task Spot以平衡稳定与节省；可接受丢部分工作才考虑全Spot。"
      }
    ],
    "audit_caveat": "Compute SP是每小时持续承诺，单集群每天仅6小时不宜承诺全天峰额；需靠其他组织负载消化闲时。若完全接受重跑，A也可能更便宜，题目business-critical支持B。",
    "audit_status": "confirmed"
  },
  "264": {
    "blocker": "一家公司已将旧应用程式迁移到AWS 云端。该应用程式在分布于三个 Availability Zones 的三个 Amazon EC2 实例上运行。每个 Availability Zone 中有一个 EC2 实例。 EC2 实例在 VPC 的三个私有子网路中运行，并设定为与三个公共子网路关联的 Application Load Balancer (ALB) 的目标。应用程式需要与on-premises系统通讯。仅允许来自公司 IP 位址范围内的 IP 位址的流量存取on-premises 系统。该公司的安全团队仅将其内部 IP 位址范围中的一个 IP 位址引入云端。本公司已将此 IP 位址新增至公司防火墙的允许清单中。该公司还为此IP位址创建了一个弹性IP位址。解决方案架构师需要创建一个解决方案，使应用程式能够与on-premises系统进行通讯。该解决方案还必须能够自动缓解故障。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：单EIP约束下自动NAT重建是可用方案。"
    ],
    "solutions": "正确答案为 C。只有一个固定EIP可用，单NAT网关承担出站SNAT，检测故障后删除/替换到另一AZ并重新绑定EIP及更新路由。",
    "result_flow": "须先释放旧NAT对EIP的关联、等待新NAT就绪并更新私网默认路由；故障迁移有中断，不是三AZ同时高可用。",
    "options": {
      "A": "同一个EIP不能同时分给三台NAT网关。",
      "B": "NLB是入站负载均衡，不为应用出站执行NAT。",
      "C": "单EIP约束下自动NAT重建是可用方案。",
      "D": "ALB不能绑定EIP且不承担出站SNAT。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/vpc/latest/userguide/nat-gateway-working-with.html",
        "title": "Work with NAT gateways",
        "supports": "公网NAT关联EIP，删除NAT后EIP可用于重新配置。"
      }
    ],
    "audit_caveat": "须先释放旧NAT对EIP的关联、等待新NAT就绪并更新私网默认路由；故障迁移有中断，不是三AZ同时高可用。",
    "audit_status": "confirmed"
  },
  "265": {
    "blocker": "某公司使用AWS Organizations管理1000多个AWS帐户。该公司创建了一个新的开发者组织。有 540 个开发者成员帐号必须迁移到新的开发者组织。所有帐户均设定有所有必需的信息，以便每个帐户都可以作为独立帐户进行操作。解决方案架构师应采取哪些步骤组合将所有开发人员帐号移至新的开发人员组织？ （选择三项。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：RemoveAccountFromOrganization仅管理账户可调用。",
      "E：新组织必须发邀请。",
      "F：账户接受邀请后加入新组织。"
    ],
    "solutions": "正确答案为 B、E、F。旧组织管理账户逐个RemoveAccountFromOrganization，随后新组织管理账户InviteAccountToOrganization，各账户接受邀请。",
    "result_flow": "先提高新组织账户配额、检查委派管理员/控制集成与账单接管；邀请与接受期间账户临时独立。",
    "options": {
      "A": "MoveAccount仅在同组织OU之间移动，不跨组织。",
      "B": "RemoveAccountFromOrganization仅管理账户可调用。",
      "C": "成员账户应调用LeaveOrganization，不是RemoveAccountFromOrganization。",
      "D": "不需占位账户。",
      "E": "新组织必须发邀请。",
      "F": "账户接受邀请后加入新组织。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/organizations/latest/APIReference/API_RemoveAccountFromOrganization.html",
        "title": "RemoveAccountFromOrganization",
        "supports": "该操作仅原组织management account可调用，移除后成为独立账户。"
      }
    ],
    "audit_caveat": "先提高新组织账户配额、检查委派管理员/控制集成与账单接管；邀请与接受期间账户临时独立。",
    "audit_status": "confirmed"
  },
  "266": {
    "blocker": "一家公司的互动式 Web 应用程式使用 Amazon CloudFront 发行版来提供来自 Amazon S3 储存桶的图像。有时，第三方工具会将损坏的影像提取到 S3 储存桶中。此图像损坏会导致稍后应用程式中的使用者体验不佳。该公司已成功实施并测试了 Python 逻辑来检测损坏的图像。解决方案架构师必须推荐一种解决方案来整合检测逻辑，并在摄取和服务之间实现最小延迟。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：上传事件触发能直接GetObject检测并隔离坏图。"
    ],
    "solutions": "正确答案为 C。S3 ObjectCreated异步调用既有Python Lambda检测图像，在上传后尽快校验，比等请求到边缘才检测更适合。",
    "result_flow": "存在上传后校验前的竞态；如绝不允许坏图对外服务，使用隔离上传桶/前缀，验证通过才发布。",
    "options": {
      "A": "viewer-response阶段无法直接读取完整源站响应图像字节，且每访问执行。",
      "B": "origin-response也不提供原始响应body供该检测逻辑直接读取。",
      "C": "上传事件触发能直接GetObject检测并隔离坏图。",
      "D": "S3事件通知不能直接以Step Functions作目标，且单函数无需编排。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/lambda/latest/dg/with-s3.html",
        "title": "Process S3 event notifications with Lambda",
        "supports": "S3可在对象创建事件异步调用Lambda。"
      }
    ],
    "audit_caveat": "存在上传后校验前的竞态；如绝不允许坏图对外服务，使用隔离上传桶/前缀，验证通过才发布。",
    "audit_status": "confirmed"
  },
  "267": {
    "blocker": "一家公司有一个应用程式在 Amazon EC2 Auto Scaling 群组中的 Amazon EC2 实例上运行。该公司使用 AWS CodePipeline 来部署应用程式。由于扩展事件，Auto Scaling组中运行的实例不断变化。当公司部署新的应用程式程式码版本时，公司会在任何新目标 EC2 实例上安装 AWS CodeDeploy 代理，并将这些实例与 CodeDeploy 部署群组关联。该应用程式将在未来 24 小时内上线。解决方案架构师应该建议什么来以最少的营运开销实现应用程式部署流程的自动化？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：CodeDeploy原生追踪ASG实例并在launch lifecycle部署。"
    ],
    "solutions": "正确答案为 D。把CodeDeploy agent预装AMI纳入launch template，将deployment group关联ASG，扩容新实例可自动部署所需版本。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "手工Lambda关联逐实例不如原生ASG集成。",
      "B": "暂停扩缩及重打AMI流程复杂并降低可靠性。",
      "C": "构建不可变AMI可行但不是24小时内最少改动。",
      "D": "CodeDeploy原生追踪ASG实例并在launch lifecycle部署。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/codedeploy/latest/userguide/integrations-aws-auto-scaling.html",
        "title": "Integrating CodeDeploy with EC2 Auto Scaling",
        "supports": "deployment group可包含ASG，并支持预装agent AMI或启动安装。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "268": {
    "blocker": "一家公司的网站在 Application Load Balancer (ALB) 后面的四个 Amazon EC2 实例上运行。当ALB侦测到EC2实例不再可用时，AmazonCloudWatch告警进入ALARM状态。然后，公司营运团队的一名成员在 ALB 后面手动新增一个新的 EC2 实例。解决方案架构师需要设计一个高度可用的解决方案，自动处理EC2实例的替换。该公司需要最大限度地减少改用新解决方案期间的停机时间。解决方案架构师应采取哪一组步骤来满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：保留入口并纳管现有实例最平滑。"
    ],
    "solutions": "正确答案为 B。保留现有ALB，新建ASG与launch template并把运行中的EC2加入ASG/target group，避免迁移入口或先删实例。",
    "result_flow": "必须显式启用ELB健康检查并配置grace period，ASG默认EC2检查不等于ALB应用健康。",
    "options": {
      "A": "删除已有ALB导致不必要停机。",
      "B": "保留入口并纳管现有实例最平滑。",
      "C": "先删已有资源造成停机。",
      "D": "ALB不会自动把已有target加入ASG成员。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/autoscaling/ec2/userguide/attach-load-balancer-asg.html",
        "title": "Attach a load balancer to Auto Scaling group",
        "supports": "ASG关联target group并启用ELB health checks后可替换ALB判不健康实例。"
      }
    ],
    "audit_caveat": "必须显式启用ELB健康检查并配置grace period，ASG默认EC2检查不等于ALB应用健康。",
    "audit_status": "confirmed"
  },
  "269": {
    "blocker": "一家公司希望优化 AWS AWS Organizations ​​公司组织内开发人员帐户之间的资料传输成本和计算成本。开发人员可以在单一 AWS Region 中设定 VPC 并启动 Amazon EC2 实例。 EC2 实例每天从 Amazon S3 撷取大约 1 TB 的资料。开发人员活动会导致EC2实例和S3储存桶之间产生过高的每月资料传输费用和NAT网关处理费用，以及高昂的运算成本。该公司希望针对开发人员在 AWS 帐户中部署的任何 EC2 实例和 VPC 基础设施主动实施经批准的架构模式。该公司不希望这种强制执行对开发人员执行任务的速度产生负面影响。哪一种解决方案能够最具成本效益地满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：预批准产品和launch constraint在创建前强制标准。"
    ],
    "solutions": "正确答案为 C。Service Catalog提供预批准VPC+S3 gateway endpoint及实例产品，以launch role部署，开发者自助快速使用且不能绕过模板；S3 gateway endpoint不收小时/处理费。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "S3 interface endpoint有小时/处理费，不如gateway经济。",
      "B": "预算告警在资源创建后，且所述自动终止VPC不是标准预算动作。",
      "C": "预批准产品和launch constraint在创建前强制标准。",
      "D": "Config事后终止会影响开发进度且非预防。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/servicecatalog/latest/adminguide/constraints-launch.html",
        "title": "Service Catalog Launch Constraints",
        "supports": "launch constraint指定Service Catalog代终端用户执行部署的IAM role。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "270": {
    "blocker": "一家公司正在扩张。该公司计划将其资源分为多个 AWS Regions 中的数百个不同的 AWS 帐户。解决方案架构师必须推荐一种解决方案，拒绝存取特别指定的Regions以外的任何操作。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：OU级SCP提供组织级region限制。"
    ],
    "solutions": "正确答案为 C。Control Tower建立多账户landing zone并按OU挂载显式deny非批准区域的SCP，统一覆盖百账户。",
    "result_flow": "须为全球服务及必要应急角色配置例外；SCP不限制组织管理账户。",
    "options": {
      "A": "逐账户Allow策略难集中维护且其他授权可能绕过。",
      "B": "逐用户策略维护量高。",
      "C": "OU级SCP提供组织级region限制。",
      "D": "Security Hub检测安全发现，不是区域操作权限执行层。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/prescriptive-guidance/latest/security-reference-architecture/multi-region-architecture.html",
        "title": "Multi Region Architecture AWS SRA",
        "supports": "Region deny SCP按OU附加并用aws:RequestedRegion限制非批准区域。"
      }
    ],
    "audit_caveat": "须为全球服务及必要应急角色配置例外；SCP不限制组织管理账户。",
    "audit_status": "confirmed"
  },
  "271": {
    "blocker": "一家公司想要重构其零售订购 Web 应用程序，该应用程式目前具有用于 Web 托管、资料库 API 服务和业务逻辑的负载平衡 Amazon EC2 实例 eet。该公司需要创建一个解耦、可扩展的架构，并具有保留失败订单的机制，同时最大限度地降低营运成本。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：serverless组件及DLQ完整满足要求。"
    ],
    "solutions": "正确答案为 C。静态S3网站、AppSync API、SQS解耦及Lambda按量处理，SQS DLQ保留超过重试次数的失败订单，低空闲成本。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "long polling只是降低空轮询，不保留失败消息。",
      "B": "Beanstalk/MQ常驻成本更高，Deep Archive非失败队列。",
      "C": "serverless组件及DLQ完整满足要求。",
      "D": "SES不是订单消息队列，EKS/OpenSearch增加成本。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-configure-dead-letter-queue.html",
        "title": "Configure an SQS dead letter queue",
        "supports": "DLQ接收未被成功处理的源队列消息，需配置redrive。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "272": {
    "blocker": "一家公司在 us-east-1 Region 的 AWS 上托管一个 Web 应用程式。应用程式伺服器分布在 Application Load Balancer 后面的三个 Availability Zones 上。此资料库托管在 Amazon EC2 实例上的 MySQL 资料库中。解决方案架构师需使用AWS服务设计跨Region资料复原解决方案，RTO小于5分钟，RPO小于1分钟。解决方案架构师正在 us-west-2 中部署应用程式伺服器，并已配置 Amazon Route 53 运行状况检查和 DNS 故障转移到 us-west-2。解决方案架构师应该采取哪些额外步骤？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：全球数据库专为低RPO跨区恢复设计。"
    ],
    "solutions": "正确答案为 B。Aurora Global Database以存储层跨区复制通常低于秒级延迟，支持快速提升备用区，最接近<1分钟RPO和<5分钟RTO。",
    "result_flow": "实际RTO/RPO需综合复制延迟、提升及DNS缓存演练验证，非无条件SLA保证。",
    "options": {
      "A": "RDS跨区read replica依赖引擎异步复制、延迟和提升时间不如Aurora global优化。",
      "B": "全球数据库专为低RPO跨区恢复设计。",
      "C": "Multi-AZ限同Region，不是跨区DR。",
      "D": "自建MySQL standby需自行复制监测提升，运维更多。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database-disaster-recovery.html",
        "title": "Using switchover or failover in Aurora Global Database",
        "supports": "全球数据库支持计划switchover与非计划cross Region failover以缩短恢复。"
      }
    ],
    "audit_caveat": "实际RTO/RPO需综合复制延迟、提升及DNS缓存演练验证，非无条件SLA保证。",
    "audit_status": "confirmed"
  },
  "273": {
    "blocker": "一家公司正在使用AWS Organizations来管理多个帐户。由于监管要求，公司希望将特定会员帐户限制在某些AWSRegions，允许他们部署资源。帐户中的资源必须被标记、基于群组标准强制实施，并以最少的配置进行集中管理。解决方案架构师应该怎么做才能满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：OU选择性继承SCP与标签标准化，配置最少。"
    ],
    "solutions": "正确答案为 D。将特定受限账户分组到新OU，在OU附加Region条件SCP及tag policy，集中继承治理而不影响其他账户。",
    "result_flow": "tag policy单独不要求所有资源必须有标签，严格必填须加入request tag SCP或支持的预防控制。",
    "options": {
      "A": "Config为事后检测，不能阻止创建。",
      "B": "Billing控制台不能按此方式全面禁用成员区域。",
      "C": "根策略会波及全部成员，范围不匹配。",
      "D": "OU选择性继承SCP与标签标准化，配置最少。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies.html",
        "title": "Managing organization policies",
        "supports": "SCP限制权限、tag policy标准化标签，可按OU继承。"
      }
    ],
    "audit_caveat": "tag policy单独不要求所有资源必须有标签，严格必填须加入request tag SCP或支持的预防控制。",
    "audit_status": "confirmed"
  },
  "274": {
    "blocker": "一家公司有一个应用程序，可以产生报告并将其储存在 Amazon S3 储存桶中。当使用者存取其报告时，应用程式会产生一个签章 URL 以允许使用者下载报告。该公司的安全团队发现这些文件是公开的，任何人都可以在未经身份验证的情况下下载它们。该公司已暂停产生新报告，直到问题解决。哪一组操作会立即修复安全性问题而不影响应用程式的正常工作流程？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：BPA忽略公共ACL可集中即时处理已存对象。"
    ],
    "solutions": "参考选择为 D。若公开来自object ACL，IgnorePublicAcls=true立即使全部公共ACL失效，合法预签名URL仍以签名主体权限授权，改动最少。",
    "result_flow": "题干未说明公开来源。若桶策略公开，D单独不阻断，须移除public policy或RestrictPublicBuckets；按原文没有对所有公开路径充分的唯一选项。",
    "options": {
      "A": "定时Lambda不立即且粗暴Deny会阻止正常流程。",
      "B": "Trusted Advisor建议审查不是立即执行阻断。",
      "C": "遍历修改百万对象ACL慢且易漏新对象。",
      "D": "BPA忽略公共ACL可集中即时处理已存对象。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-control-block-public-access.html",
        "title": "Blocking public access to S3 storage",
        "supports": "IgnorePublicAcls忽略公共ACL；public bucket policy由其他BPA开关处理。"
      }
    ],
    "audit_caveat": "题干未说明公开来源。若桶策略公开，D单独不阻断，须移除public policy或RestrictPublicBuckets；按原文没有对所有公开路径充分的唯一选项。",
    "audit_status": "ambiguous"
  },
  "275": {
    "blocker": "一家公司计划将 Oracle 资料库的 Amazon RDS 迁移到另一个 AWS 帐户中的 PostgreSQL 资料库实例的 RDS。解决方案架构师需要设计一种无需停机并最大限度地减少完成迁移所需时间的迁移策略。迁移策略必须复制所有现有资料以及迁移期间建立的任何新资料。迁移过程完成时，目标资料库必须与来源资料库相同。目前，所有应用程式都使用 Amazon Route 53 CNAME 记录作为与 Oracle 资料库实例的 RDS 通讯的端点。 Oracle 资料库执行个体的 RDS 位于私有子网路。解决方案架构师应该采取哪些步骤组合来满足这些要求？ （选择三项。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：先创建目标实例并用SCT转schema。",
      "C：私有peering及安全组允许数据库端口。",
      "E：full load+CDC同时覆盖存量和变化。"
    ],
    "solutions": "参考选择为 A、C、E。SCT转换Oracle到PostgreSQL schema，私有VPC peering提供跨账户连接，DMS full load+CDC搬已有数据并追增量，切换时修改CNAME。",
    "result_flow": "异构引擎切换通常须应用兼容改造并短暂停止写入等待CDC追平；仅CNAME无法把Oracle客户端无缝改为PostgreSQL，严格零停机/完全相同不成立。",
    "options": {
      "A": "先创建目标实例并用SCT转schema。",
      "B": "SCT不按描述自动创建实例并迁移全部业务数据。",
      "C": "私有peering及安全组允许数据库端口。",
      "D": "不应为迁移把私有源库暴露公网。",
      "E": "full load+CDC同时覆盖存量和变化。",
      "F": "仅CDC不会迁移初始数据。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Task.CDC.html",
        "title": "Creating tasks for ongoing replication using DMS",
        "supports": "full load+CDC先迁现有数据再以源日志持续应用变化；不是实时复制。"
      }
    ],
    "audit_caveat": "异构引擎切换通常须应用兼容改造并短暂停止写入等待CDC追平；仅CNAME无法把Oracle客户端无缝改为PostgreSQL，严格零停机/完全相同不成立。",
    "audit_status": "ambiguous"
  },
  "276": {
    "blocker": "一家公司使用事件驱动架构实现了订购系统。在初始测试期间，系统停止处理订单。进一步的日志分析显示，Amazon Simple Queue Service (Amazon SQS)标准伫列中的一条订单讯息导致后端出现错误并阻塞所有后续订单讯息。伫列的可见性逾时设定为30秒，后端处理逾时设定为10秒。解决方案架构师需要分析错误的订单讯息并确保系统继续处理后续讯息。解决方案架构师应该采取哪一步来满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：同类型standard DLQ支持redrive隔离失败。"
    ],
    "solutions": "正确答案为 D。给standard源队列配置standard DLQ及maxReceiveCount，将持续报错消息隔离后可独立分析，正常订单继续消费。",
    "result_flow": "standard队列自身没有严格头阻塞；题中阻塞是消费者处理方式造成，需改为独立处理/部分批次失败。",
    "options": {
      "A": "延长处理时间不修复毒消息逻辑错误。",
      "B": "visibility超时只让消息重现，不自动删除。",
      "C": "FIFO DLQ必须与FIFO源搭配，不能接standard源。",
      "D": "同类型standard DLQ支持redrive隔离失败。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-configure-dead-letter-queue.html",
        "title": "Configure an SQS dead letter queue",
        "supports": "DLQ类型必须匹配源队列，standard只可用standard DLQ。"
      }
    ],
    "audit_caveat": "standard队列自身没有严格头阻塞；题中阻塞是消费者处理方式造成，需改为独立处理/部分批次失败。",
    "audit_status": "confirmed"
  },
  "277": {
    "blocker": "一家公司使用 AWS Step Functions 自动化了其机器学习模型的夜间重新训练。此工作流程由使用AWS Lambda的多个步骤组成。每个步骤都可能因各种原因而失败，任何失败都会导致整个工作流程的失败。审查显示，再培训连续多个晚上都失败了，而公司却没有注意到这一失败。解决方案架构师需要改进工作流程，以便针对再培训过程中的所有类型的故障发送通知。解决方案架构师应该采取哪些步骤组合来满足这些要求？ （选择三项。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：SNS邮件订阅提供通知出口。",
      "B：Step Functions可用SNS Publish task发送错误上下文。",
      "C：States.ALL捕获大多数已知错误，应放最后且单独使用。"
    ],
    "solutions": "参考选择为 A、B、C。SNS邮件订阅加Email publish task，并给可catch的Task/Map/Parallel使用States.ALL跳转通知，可捕获多数业务错误；但无法覆盖题称所有失败类型。",
    "result_flow": "严格“all types”无充分选项；应再用EventBridge监听执行FAILED/TIMED_OUT/ABORTED至SNS，覆盖工作流级失败。",
    "options": {
      "A": "SNS邮件订阅提供通知出口。",
      "B": "Step Functions可用SNS Publish task发送错误上下文。",
      "C": "States.ALL捕获大多数已知错误，应放最后且单独使用。",
      "D": "SES不是此组合必需。",
      "E": "增加SES没提供广泛失败捕捉。",
      "F": "仅States.Runtime不是全错误捕获，Runtime也不能按此方式正常catch。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/step-functions/latest/dg/concepts-error-handling.html",
        "title": "Handling errors in Step Functions workflows",
        "supports": "States.ALL不能捕获States.Runtime或DataLimitExceeded等终端错误（后者需显式匹配）。"
      }
    ],
    "audit_caveat": "严格“all types”无充分选项；应再用EventBridge监听执行FAILED/TIMED_OUT/ABORTED至SNS，覆盖工作流级失败。",
    "audit_status": "ambiguous"
  },
  "278": {
    "blocker": "一家公司计划在 VPC 内的 Amazon EC2 实例上部署新的私人 Intranet 服务。 AWS Site-to-Site VPN 将 VPC 连接到公司的 on-premises 网路。新服务必须与现有 on-premises 服务通讯。 on-premises 服务可透过使用驻留在 company.example DNS 区域中的主机名称进行存取。该DNS区域完全托管在本地，并且仅在公司的专用网路上可用。解决方案架构师必须确保新服务可以解析 company.example 网域上的主机名，以与现有服务整合。哪种解决方案满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：outbound endpoint和转发规则方向正确。"
    ],
    "solutions": "正确答案为 B。VPC内查询本地域名属于AWS→本地DNS方向，需Resolver outbound endpoint与company.example转发规则指向本地DNS，经VPN可达。",
    "result_flow": "须同时启用VPC DNS support，并放通UDP/TCP53与VPN往返路由。",
    "options": {
      "A": "空PHZ会遮蔽本地区域，NS委派不能这样指向私有zone公网名服。",
      "B": "outbound endpoint和转发规则方向正确。",
      "C": "inbound用于本地查询AWS，方向反了。",
      "D": "hosts文件手动同步不支持动态DNS维护。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-overview-DSN-queries-to-vpc.html",
        "title": "Resolving DNS queries between VPCs and your network",
        "supports": "Resolver端点与转发规则连接VPC Resolver和本地DNS。"
      }
    ],
    "audit_caveat": "须同时启用VPC DNS support，并放通UDP/TCP53与VPN往返路由。",
    "audit_status": "confirmed"
  },
  "279": {
    "blocker": "一家公司使用 AWS CloudFormation 在多个 VPC 中部署应用程序，所有这些VPC 都连接到中转网关。每个向公共互联网发送流量的VPC都必须透过共享服务VPC发送流量。 VPC 内的每个子网路都使用预设的 VPC 路由表，并且流量将路由到中转网关。中转网关对任何 VPC 连接使用其预设路由表。安全审核显示，部署在 VPC 中的 Amazon EC2 实例可以与部署在公司任何其他 VPC 中的 EC2 实例进行通讯。解决方案架构师需要限制VPC之间的流量。每个VPC 必须只能与一组预先定义的、有限的授权VPC 进行通讯。解决方案架构师应该怎么做才能满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：TGW入站attachment关联路由表决定可达目标。"
    ],
    "solutions": "正确答案为 C。每attachment关联专用或按授权组分段的TGW route table，仅传播/静态路由到授权VPC及必要共享出口，中央强制隔离。",
    "result_flow": "具有相同访问矩阵的VPC可共用路由表，不要求每VPC物理独立一张；同时排查经共享VPC转发绕行。",
    "options": {
      "A": "NACL逐子网维护繁复且可能阻断internet出口，非集中路由隔离。",
      "B": "安全组不能添加Deny规则。",
      "C": "TGW入站attachment关联路由表决定可达目标。",
      "D": "默认公网出口仍指TGW时，VPC路由不能仅靠目标列表消除所有经TGW可达性。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/solutions/latest/network-orchestration-aws-transit-gateway/using-and-customizing-route-tables.html",
        "title": "Using and customizing Transit Gateway route tables",
        "supports": "TGW segmentation由attachment关联及route propagation共同形成。"
      }
    ],
    "audit_caveat": "具有相同访问矩阵的VPC可共用路由表，不要求每VPC物理独立一张；同时排查经共享VPC转发绕行。",
    "audit_status": "confirmed"
  },
  "280": {
    "blocker": "一家公司有一个基于 Windows 的桌面应用程序，该应用程式被打包并部署到用户的 Windows 电脑上。该公司最近收购了另一家公司，该公司的员工主要使用装有 Linux 作业系统的机器。收购公司已决定将基于 Windows 的桌面应用程式迁移并重新托管到AWS。所有员工在使用应用程式之前都必须经过身份验证。收购公司在本地使用Active Directory，但希望采用一种简化的方式来管理所有员工对AWS上的应用程式的存取。哪种解决方案能够以最少的开发工作在 AWS 上重新托管应用程式？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：应用流式传送复用现有桌面程序，浏览器跨平台。"
    ],
    "solutions": "正确答案为 C。AppStream用含现有Windows软件的image与弹性On-Demand fleet，经HTML5浏览器跨Linux/Windows访问；user pool托管认证避免重写应用。",
    "result_flow": "user pool为独立用户库，不与本地AD自动同步；如须统一现有身份，用SAML联邦。AppStream服务命名可能更新，题目沿用旧名。",
    "options": {
      "A": "WorkSpaces不按选项通过Cognito identity pool认证桌面，每人整桌面开销更高。",
      "B": "自管Windows EC2/RDP和域加入管理工作较大。",
      "C": "应用流式传送复用现有桌面程序，浏览器跨平台。",
      "D": "改Web并容器化是大量重构。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/appstream2/latest/developerguide/user-pool.html",
        "title": "Amazon AppStream user pools",
        "supports": "AppStream用户池可创建和管理用户，并通过浏览器访问分配的应用。"
      }
    ],
    "audit_caveat": "user pool为独立用户库，不与本地AD自动同步；如须统一现有身份，用SAML联邦。AppStream服务命名可能更新，题目沿用旧名。",
    "audit_status": "confirmed"
  },
  "281": {
    "blocker": "一家公司正在从一组物联网设备收集大量数据。资料作为优化行列式 (ORC) 档案储存在持久性 Amazon EMR 集群上的 Hadoop 分散式档案系统 (HDFS) 中。该公司的资料分析团队使用部署在同一EMR集群上的Apache Presto中的SQL来查询资料。查询会扫描大量数据，运行时间始终少于 15 分钟，并且仅在下午 5 点到晚上 10 点之间运行。该公司担心当前解决方案的高成本。解决方案架构师必须提出最具成本效益的解决方案，以允许 SQL 资料查询。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：Athena直接查询S3文件，空闲时不维持查询集群。"
    ],
    "solutions": "正确答案为 B。只在晚间间歇运行SQL，不必维持全天EMR集群。把ORC文件放S3，由Glue目录提供表定义，Athena按扫描量收费查询，符合最低运维及按需成本。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "Spectrum需要Redshift计算资源，题设没有现成集群。",
      "B": "Athena直接查询S3文件，空闲时不维持查询集群。",
      "C": "EMRFS虽可用S3，Presto集群计算仍有成本。",
      "D": "Redshift需加载/管理数仓，间歇查询不占优势。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/athena/",
        "title": "Amazon Athena Documentation",
        "supports": "Athena可用SQL查询S3，serverless且仅对执行查询付费。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "282": {
    "blocker": "一家大公司最近发现Amazon RDS和Amazon DynamoDB成本意外增加。公司需要提高AWS计费和成本管理细节的可见度。有多种与AWS Organizations相关的帐户，包括许多开发和生产帐户。整个组织没有一致的标记策略，但有指导方针要求所有基础设施都使用AWS CloudFormation和一致的标记进行部署。管理阶层需要所有现有和未来的 DynamoDB 表和 RDS 实例的成本中心编号和项目 ID 编号。解决方案架构师应该提供哪种策略来满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：集中处理既有标签并以SCP约束新建资源，覆盖两个阶段。"
    ],
    "solutions": "正确答案为 C。先给既有RDS和DynamoDB资源补齐成本中心/项目标签并激活成本分配标签，再用组织SCP拒绝缺少必需请求标签的创建操作，使未来资源也符合规定。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "只补旧资源，没有强制未来创建时带标签。",
      "B": "事后告警/每小时补标存在空窗，自动推断成本中心也未解决。",
      "C": "集中处理既有标签并以SCP约束新建资源，覆盖两个阶段。",
      "D": "激活成本分配标签不会自动把标签加到资源上，且未补齐旧资源。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_tag-policies-enforcement.html",
        "title": "Enforce tagging consistency",
        "supports": "官方建议用SCP阻止缺少指定标签的资源创建；标签策略本身不补标。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "283": {
    "blocker": "一家公司希望将资料从其 on-premises 系统传送到 Amazon S3 储存桶。该公司在三个不同的帐户中创建了S3储存桶。公司必须私下发送数据，而不能透过网路传输数据。该公司目前没有与 AWS 的专用连接。解决方案架构师应该采取哪些步骤组合来满足这些要求？ （选两个。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：私有VIF提供到VPC的专线私网路径。",
      "C：S3接口端点可从本地经DX访问。"
    ],
    "solutions": "正确答案为 A、C。通过Direct Connect私有VIF进入专用VPC，再从S3接口端点私有IP访问三个账户的桶。跨账户授权需桶策略/IAM，但不要求每个桶有VPC。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "私有VIF提供到VPC的专线私网路径。",
      "B": "公共VIF连接AWS公共服务地址，不是选项描述的VPC私网连接。",
      "C": "S3接口端点可从本地经DX访问。",
      "D": "S3网关端点不能供DX另一侧的本地客户端直接使用。",
      "E": "S3桶本身不在客户VPC中，VPC对等不是访问桶的必要条件。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/privatelink-interface-endpoints.html",
        "title": "AWS PrivateLink for Amazon S3",
        "supports": "接口端点可供on-premises应用经Direct Connect使用；网关端点不允许本地访问。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "284": {
    "blocker": "一家公司经营快餐店。这些餐厅遵循可预测的模式，每天 4 小时的客流量很高。高峰时段以外的销售流量较低。销售点和管理平台部署在AWS云端中，并具有基于Amazon DynamoDB的后端。资料库表使用具有 100,000 个 RCU 和 80,000 个 WCU 的预配置吞吐量模式，以匹配已知的峰值资源消耗。该公司希望降低 DynamoDB 成本并最大限度地减少 IT 员工的营运开销。哪种解决方案最经济有效率地满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：自动调整读写容量以贴近实际消耗。"
    ],
    "solutions": "正确答案为 C。负载每天按可预测周期变化，保留预置容量并开启自动伸缩，在低谷缩容、高峰扩容，避免全天按峰值付费且减少人工调整。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "固定降低容量可能在高峰被节流。",
      "B": "按需适合不可预测流量；此处规律高峰更适合预置自动伸缩。",
      "C": "自动调整读写容量以贴近实际消耗。",
      "D": "按峰值购买预留容量仍会为非高峰时间的高容量付费。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/CostOptimization_TableCapacityMode.html",
        "title": "Evaluate your DynamoDB table capacity mode",
        "supports": "官方将稳定可预测的日周期流量列为预置模式适用场景，并说明auto scaling调整容量。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "285": {
    "blocker": "一家公司使用 Amazon API Gateway、Amazon DynamoDB 和 AWS Lambda 在 AWS 上托管部落格文章应用程式。该应用程式目前不使用 API 金钥来授权请求。 API 模型如下： GET /posts/{postId}：取得贴文详细资讯 GET /users/{userId}：取得使用者详细资讯 GET /comments/{commentId}：取得评论详细资讯 公司注意到使用者在评论部分积极讨论主题，公司希望透过即时显示评论来提高使用者参与度。应该采用哪种设计来减少评论延迟并提高用户体验？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：AppSync订阅管理WebSocket连接并实时分发变更。"
    ],
    "solutions": "正确答案为 C。目标是评论产生后立即推送给在线用户。AppSync订阅通过WebSocket保持连接并推送变更，避免客户端周期轮询。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "缓存可能返回旧评论，不能主动推送。",
      "B": "10秒轮询仍有等待且增加请求。",
      "C": "AppSync订阅管理WebSocket连接并实时分发变更。",
      "D": "并发上限不能替代实时订阅，降低上限还可能节流。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/appsync/latest/devguide/aws-appsync-real-time-data.html",
        "title": "Using subscriptions for real-time data applications",
        "supports": "AppSync自动建立安全WebSocket连接，订阅在mutation后分发实时更新。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "286": {
    "blocker": "一家公司在 AWS Organizations ​​的组织中集中管理数百个 AWS 帐户。该公司最近开始允许产品团队在其帐户中建立和管理自己的S3接入点。 S3接入点只能在VPC秒内访问，不能在互联网上访问。执行此要求最有效的操作方法是什么？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：官方文档直接给出此SCP示例，集中维护。"
    ],
    "solutions": "正确答案为 B。在组织根挂SCP，用s3:AccessPointNetworkOrigin条件拒绝非VPC来源的CreateAccessPoint，统一约束所有成员账户创建行为。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "接入点资源策略不能在接入点尚未创建时统一约束全组织创建。",
      "B": "官方文档直接给出此SCP示例，集中维护。",
      "C": "各账户IAM允许策略可能被其他授权扩展，且维护分散。",
      "D": "桶策略不是组织级创建接入点的统一护栏。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-points-policies.html",
        "title": "Configuring IAM policies for using access points",
        "supports": "Example 4使用SCP拒绝网络来源不是VPC的s3:CreateAccessPoint。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "287": {
    "blocker": "解决方案架构师必须使用蓝/绿部署方法更新AWSElastic Beanstalk内的应用程式环境。解决方案架构师创建一个与现有应用程式环境相同的环境，并将应用程式部署到新环境。接下来该做什么来完成更新？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：Swap Environment URLs是官方蓝绿部署步骤。"
    ],
    "solutions": "正确答案为 B。新环境部署并验证后交换两个环境的URL/CNAME，将原生产域名流量切到新环境，保留旧环境用于回滚。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "手工Route53不是Beanstalk提供的直接完成步骤。",
      "B": "Swap Environment URLs是官方蓝绿部署步骤。",
      "C": "修改启动配置不是蓝绿流量切换。",
      "D": "泛称改DNS可实现部分效果，但缺少Beanstalk的对称环境交换。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.CNAMESwap.html",
        "title": "Blue/Green deployments with Elastic Beanstalk",
        "supports": "官方步骤部署测试新环境后选择Swap environment URLs。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "288": {
    "blocker": "一家公司正在网路上建立图像服务，允许用户上传和搜寻随机照片。在使用高峰期，全球多达 10,000 名用户将上传他们的图像。然后，将在上传的图像上覆盖文本，然后将其发布在公司网站上。解决方案架构师应该实作哪种设计？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：SQS解耦上传和处理，S3/CloudFront适合全球图片分发。"
    ],
    "solutions": "正确答案为 C。S3上传事件入SQS，工作实例竞争领取任务，处理后另存S3，CloudFront分发成品；队列吸收高峰并作为扩缩容依据。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "依赖日志扫描作为任务队列不可靠，EFS/EC2源站增加管理。",
      "B": "SNS是推送服务，不支持实例像SQS一样拉取消息。",
      "C": "SQS解耦上传和处理，S3/CloudFront适合全球图片分发。",
      "D": "普通共享EBS不能按此方案跨实例任意挂载，Spot中断和自建任务状态更复杂。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-using-sqs-queue.html",
        "title": "Scaling policy based on Amazon SQS",
        "supports": "Auto Scaling可按SQS backlog随待处理工作扩缩容；推荐每实例积压量。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "289": {
    "blocker": "一家公司已将其资料库部署在 us-east-1 Region 中的 MySQL 资料库执行个体的 Amazon RDS 上。该公司需要向欧洲客户提供其数据。欧洲客户必须能够存取与美国 (US) 客户相同的数据，并且不能容忍高应用程式延迟或过时的数据。欧洲的客户和美国的客户需要写入资料库。两组客户都需要即时查看另一组的更新。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：Aurora副本提升是受支持迁移路径；Global Database次区域可转发写。"
    ],
    "solutions": "正确答案为 A。先通过Aurora只读副本迁移RDS MySQL，暂停源库写入并等复制追平后提升，再建立Aurora Global Database及欧洲写转发。A给出了有效迁移流程，B/C依赖RDS不支持的写转发，D把迁移简化成直接转换。",
    "result_flow": "A是选项中的最佳可实施方案；原题“实时、低延迟且无陈旧”表述过强。读一致性需设GLOBAL并可能等待复制，跨区写仍有网络时延，不能宣称零延迟。",
    "options": {
      "A": "Aurora副本提升是受支持迁移路径；Global Database次区域可转发写。",
      "B": "RDS跨区域只读副本不会自动把写请求转发给主库。",
      "C": "独立RDS MySQL实例没有Aurora全局数据库写转发功能。",
      "D": "RDS MySQL不能靠修改引擎就直接原地转换为Aurora集群。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/AuroraMySQL.Migrating.RDSMySQL.Replica.html",
        "title": "Migrating RDS MySQL by using an Aurora read replica",
        "supports": "迁移需要创建Aurora副本、停源写、追平并提升。"
      },
      {
        "url": "https://docs.aws.amazon.com/en_en/AmazonRDS/latest/AuroraUserGuide/aurora-global-database-write-forwarding.html",
        "title": "Using write forwarding in an Aurora global database",
        "supports": "次区域写仍在主区域执行后复制返回，不能消除跨区写延迟。"
      }
    ],
    "audit_caveat": "A是选项中的最佳可实施方案；原题“实时、低延迟且无陈旧”表述过强。读一致性需设GLOBAL并可能等待复制，跨区写仍有网络时延，不能宣称零延迟。",
    "audit_status": "confirmed"
  },
  "290": {
    "blocker": "一家公司透过可透过网路存取的 SFTP 伺服器向其客户提供文件。 SFTP 伺服器在附加了弹性 IP 位址的单一 Amazon EC2 实例上运作。客户透过其弹性IP位址连接到SFTP伺服器并使用SSH进行身份验证。 EC2 执行个体还具有附加的安全性群组，允许从所有客户 IP 位址进行存取。解决方案架构师必须实施一个解决方案来提高可用性、最大限度地降低基础设施管理的复杂性，并最大限度地减少对存取文件的客户的干扰。此解决方案不得改变客户的连线方式。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：VPC internet-facing端点同时支持EIP和安全组。"
    ],
    "solutions": "正确答案为 B。AWS Transfer Family使用面向互联网的VPC托管端点才能绑定现有EIP并使用客户IP安全组，S3存文件可消除单机SFTP维护。还应迁移SSH用户密钥及必要的服务器主机密钥以减少客户端信任变化。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "PUBLIC端点不能按此方式绑定客户EIP和安全组。",
      "B": "VPC internet-facing端点同时支持EIP和安全组。",
      "C": "自建Fargate SFTP增加运维，且结尾把文件同步S3与前述EFS不一致。",
      "D": "多挂载EBS仍需集群文件系统协调且受单AZ限制，自建实例运维重。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/transfer/latest/userguide/create-server-in-vpc.html",
        "title": "Create a server in a virtual private cloud",
        "supports": "VPC internet-facing端点可直接附加EIP并以安全组过滤来源。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "291": {
    "blocker": "一家公司摄取并处理流市场数据。数据速率是恒定的。每晚计算总计统计资料的过程需要 4 小时才能完成。统计分析对于业务来说并不重要，如果特定运行失败，资料点将在下一次迭代期间进行处理。目前架构使用 Amazon EC2 预留实例池，预留期为 1 年。这些 EC2 实例全职运行，以摄取流资料并将其储存在附加的 Amazon 弹性块储存 (Amazon EBS) 卷中。计划脚本每晚启动 EC2 按需实例以执行夜间处理。实例从摄取伺服器上的 NFS 共用存取储存的资料。处理完成后，脚本将终止实例。预留实例预留即将到期。公司需要确定是否购买新的预订或实施新的设计。哪一种解决方案能够最具成本效益地满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：托管摄取/S3加Batch Spot同时降低常驻和批处理成本。"
    ],
    "solutions": "正确答案为 B。持续流入的数据由Firehose托管写入S3，避免全天运行摄取实例；非关键夜间批处理可中断重试，用Batch Spot按需分配计算更省钱。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "On-Demand批处理比可容忍中断的Spot昂贵。",
      "B": "托管摄取/S3加Batch Spot同时降低常驻和批处理成本。",
      "C": "三年预留仍保留全天摄取实例，未利用托管摄取。",
      "D": "Redshift需常驻计算且Lambda最长15分钟，未说明4小时计算如何拆分。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/batch/latest/userguide/infrastructure-updates.html",
        "title": "AWS Batch compute configuration",
        "supports": "Batch支持Spot计算环境和bidPercentage最高按需价格比例。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "292": {
    "blocker": "某公司需要将on-premises SFTP站点迁移到AWS。 SFTP 站点目前在 Linux VM 上运行。上传的档案可透过 NFS 共享提供给下游应用程式。作为迁移到AWS的一部分，解决方案架构师必须实现高可用性。此解决方案必须向外部供应商提供一组供应商允许的静态公用 IP 位址。该公司已在其on-premises资料中心与其⟦T1​​79⟧之间建立了AWS Direct Connect连接。哪种解决方案能够以最少的营运开销满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：满足静态IP、SFTP托管、多AZ和NFS。"
    ],
    "solutions": "正确答案为 A。Transfer Family互联网VPC端点支持每子网EIP，跨AZ部署配合区域EFS提供NFS共享；本地应用经已有DX挂载EFS，托管服务减少运维。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "满足静态IP、SFTP托管、多AZ和NFS。",
      "B": "PUBLIC端点不提供客户可指定的静态EIP。",
      "C": "单EC2 SFTP仍为单点且需维护操作系统。",
      "D": "MGN不能把VM迁移成Transfer Family服务，Lustre也不是此NFS替代方案。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/transfer/latest/userguide/create-server-in-vpc.html",
        "title": "Create a server in a virtual private cloud",
        "supports": "互联网VPC端点可为各子网绑定EIP，并支持S3或EFS后端。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "293": {
    "blocker": "解决方案架构师将操作工作负载部署在 Auto Scaling 群组中的 Amazon EC2 实例上。 VPC 架构跨越两个Availability Zones (AZ)，每个Auto Scaling 组都有一个子网路。 VPC 连接到on-premises 环境，且连线不能中断。 Auto Scaling 群组的最大大小为 20 个服务实例。 VPC IPv4 定址如下： VPC CIDR：10.0.0.0/23 - AZ1 子网路 CIDR：10.0.0.0/24 - AZ2 子网路 ⟦自部署以来，第三个 AZ 已在 Region 中可用。解决方案架构师希望采用新的可用区，而无需新增额外的 IPv4 位址空间，也不会造成服务停机。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：逐步腾空并重建子网，保持至少一个AZ运行且不改VPC地址。"
    ],
    "solutions": "正确答案为 A。子网CIDR不能原地缩小，必须逐AZ先迁走实例、删除旧子网，再以/25重建。另一AZ持续承载业务，最终用原/23地址空间划出三个子网。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "逐步腾空并重建子网，保持至少一个AZ运行且不改VPC地址。",
      "B": "先直接终止一AZ实例并未保证健康替代容量，可能中断。",
      "C": "既有ASG不能通过更换子网直接跨VPC迁移。",
      "D": "子网CIDR不可原地改为一半。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_CreateSubnet.html",
        "title": "CreateSubnet",
        "supports": "创建后不能修改子网CIDR，子网之间地址不得重叠。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "294": {
    "blocker": "某公司使用AWS Organizations中的组织来管理公司的AWS帐户。该公司使用AWS CloudFormation来部署所有基础设施。一个财务团队想要建立一个退款模型。财务团队要求每个业务部门使用预先定义的项目值清单来标记资源。当财务团队使用AWS Cost Explorer 中的AWS 成本和使用情况报告并根据专案进行过滤时，团队注意到不合规的专案价值。该公司希望强制对新资源使用项目标签。哪种解决方案能够以最少的努力满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：组织集中标签值规范加创建时存在性约束，最少改造。"
    ],
    "solutions": "正确答案为 A。标签策略在组织管理账户定义允许的项目值并启用适用资源强制，SCP要求CloudFormation创建堆栈时携带project标签；无需逐用户管理或改造成Service Catalog。",
    "result_flow": "需在标签策略中启用相应资源强制并附加到根或OU；Stack标签并非对每一种嵌套资源都自动传播，实际部署还应检查支持范围。",
    "options": {
      "A": "组织集中标签值规范加创建时存在性约束，最少改造。",
      "B": "标签策略由管理账户创建并附加OU，不是在每个OU独立创建账户级策略。",
      "C": "逐用户赋权维护量大，无法覆盖所有角色。",
      "D": "Service Catalog TagOptions可控但需要重构现有全部CloudFormation部署路径。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_tag-policies-enforcement.html",
        "title": "Enforce tagging consistency",
        "supports": "标签策略约束值；缺少必需标签需另用SCP等创建护栏。"
      }
    ],
    "audit_caveat": "需在标签策略中启用相应资源强制并附加到根或OU；Stack标签并非对每一种嵌套资源都自动传播，实际部署还应检查支持范围。",
    "audit_status": "confirmed"
  },
  "295": {
    "blocker": "应用程式部署在 Auto Scaling 群组中执行的 Amazon EC2 实例上。 Auto Scaling 群组配置仅使用一种类型的实例。 CPU 和记忆体使用率指标显示实例未被充分利用。解决方案架构师需要实施一个解决方案来永久降低EC2成本并提高利用率。哪种解决方案将来能够以最少的配置更改来满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：属性选择可在启动模板或ASG指定vCPU/内存并自动匹配新型号。"
    ],
    "solutions": "正确答案为 C。依据监测到的CPU/内存需要定义实例属性范围，移除硬编码实例类型，ASG可自动纳入符合要求的新类型，减少以后维护清单的次数。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "相似类型列表不能保证调整到实际较小资源需求，且仍需更新列表。",
      "B": "一次换型能优化，但今后新型号仍需再改配置。",
      "C": "属性选择可在启动模板或ASG指定vCPU/内存并自动匹配新型号。",
      "D": "自写价格选择脚本增加长期维护。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/autoscaling/ec2/userguide/create-mixed-instances-group-attribute-based-instance-type-selection.html",
        "title": "Attribute-based instance type selection",
        "supports": "按vCPU及内存属性选择，自动使用匹配的新实例类型并提供价格保护。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "296": {
    "blocker": "某公司使用Amazon Elastic Container Service (Amazon ECS)和Amazon API Gateway实现了容器化应用，应用资料储存在AmazonAurora资料库和Amazon DynamoDB资料库中。该公司使用 AWS CloudFormation 实现基础设施配置自动化。该公司使用AWSCodePipeline自动化应用程式部署。解决方案架构师需要实作满足 2 小时的 RPO 和 4 小时的 RTO 的灾难复原 (DR) 策略。哪一种解决方案能够最具成本效益地满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：备份恢复匹配较宽松目标且无需一直运行完整数据库副本。"
    ],
    "solutions": "正确答案为 C。RPO两小时、RTO四小时允许备份恢复。跨区域定期备份Aurora与DynamoDB，在灾备时恢复并用既有CloudFormation/CodePipeline重建应用，Route53切换；比一直保有全局数据库副本更省钱。",
    "result_flow": "必须按小于等于两小时的有效恢复点间隔及复制延迟设计，并演练证实恢复能在四小时内完成；AWS Backup不保证固定复制完成时间。",
    "options": {
      "A": "全局表/全局库持续复制成本较高；CloudFront源站故障转移也不转发所有写方法。",
      "B": "自建多套复制链路复杂，运维与目标库持续成本较高。",
      "C": "备份恢复匹配较宽松目标且无需一直运行完整数据库副本。",
      "D": "可提供更小RPO/RTO，但超出本题需求且费用更高。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/aws-backup/latest/devguide/backup-feature-availability.html",
        "title": "AWS Backup feature availability",
        "supports": "Aurora与启用高级功能的DynamoDB支持跨区域备份复制。"
      }
    ],
    "audit_caveat": "必须按小于等于两小时的有效恢复点间隔及复制延迟设计，并演练证实恢复能在四小时内完成；AWS Backup不保证固定复制完成时间。",
    "audit_status": "confirmed"
  },
  "297": {
    "blocker": "一家公司拥有一个复杂的 Web 应用程序，该应用程式利用 Amazon CloudFront 实现全局可扩展性和性能。随著时间的推移，使用者报告 Web 应用程式速度变慢。该公司的营运团队报告称，CloudFront快取命中率一直在稳步下降。快取指标报告表明某些 URL 上的查询字串顺序不一致，并且有时以混合大小写字母指定，有时以小写字母指定。解决方案架构师应该采取哪一组操作来尽快提高快取命中率？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：viewer-request先于缓存命中判断，是归一化缓存键的合适位置。"
    ],
    "solutions": "正确答案为 A。在缓存查找之前的viewer-request触发器规范查询参数的顺序和大小写，让语义相同的请求共享缓存键，提高命中率。",
    "result_flow": "仅在应用语义允许时转为小写；若参数值区分大小写，不应不加判断地改写。",
    "options": {
      "A": "viewer-request先于缓存命中判断，是归一化缓存键的合适位置。",
      "B": "全部忽略参数可能把不同内容错误缓存成同一对象。",
      "C": "后端改写不能立即统一已到边缘的请求且改造更多。",
      "D": "CloudFront没有直接开启忽略大小写的此配置。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/QueryStringParameters.html",
        "title": "Cache content based on query string parameters",
        "supports": "参数顺序及大小写不同会形成独立缓存，官方建议统一。"
      }
    ],
    "audit_caveat": "仅在应用语义允许时转为小写；若参数值区分大小写，不应不加判断地改写。",
    "audit_status": "confirmed"
  },
  "298": {
    "blocker": "一家公司在单一 AWS Region 中运行电子商务应用程式。该应用程式使用 ve-node Amazon Aurora MySQL 资料库集群来储存有关客户及其最近订单的资讯。资料库集群全天经历大量写入事务。公司需要将Aurora资料库中的资料复制到另一个Region，以满足容灾需求。公司的RPO为1小时。哪一种解决方案能够以最低的成本满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：S3保存持续变更成本较低，DMS须放在目标桶区域。"
    ],
    "solutions": "正确答案为 C。只要求一小时RPO且未要求短RTO，可把Aurora变更经DMS CDC写入异地区域S3，避免长期运行第二套Aurora集群。恢复时需基线数据及按序重放变更。",
    "result_flow": "选C的前提是保留可恢复的全量基线和完整有序CDC，并监测复制延迟；单独保存零散变更不能直接当作可恢复数据库。",
    "options": {
      "A": "全局数据库恢复快但要维持次区域数据库，成本较高。",
      "B": "每天快照不满足一小时RPO，Backtrack也不是跨区域备份。",
      "C": "S3保存持续变更成本较低，DMS须放在目标桶区域。",
      "D": "Aurora自动备份不能按此方式改为每小时直接跨区域；关闭自动备份不合理。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Target.S3.html",
        "title": "Using Amazon S3 as a target for AWS DMS",
        "supports": "S3支持全量和CDC；目标桶须与DMS复制实例同区。"
      },
      {
        "url": "https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Task.CDC.html",
        "title": "Creating tasks for ongoing replication",
        "supports": "CDC捕获数据库日志变更；延迟需监测且并非实时保证。"
      }
    ],
    "audit_caveat": "选C的前提是保留可恢复的全量基线和完整有序CDC，并监测复制延迟；单独保存零散变更不能直接当作可恢复数据库。",
    "audit_status": "confirmed"
  },
  "299": {
    "blocker": "一家公司的解决方案架构师正在评估几年前部署的AWS工作负载。应用程式层是无状态的，并在从 AMI 启动的单一大型 Amazon EC2 执行个体上运行。该应用程式将资料储存在运行於单一 EC2 实例上的 MySQL 资料库中。应用伺服器EC2实例的CPU利用率经常达到100%，导致应用程式停止回应。公司在实例上手动安装补丁。过去，修补程式曾导致停机。公司需要使应用程式具有高可用性。哪种解决方案能够以最少的开发来满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：ASG/ALB扩展无状态层，Aurora保留MySQL接口，SSM利于自动维护。"
    ],
    "solutions": "正确答案为 D。保持现有EC2应用及MySQL兼容引擎，在多实例ASG+ALB分散CPU负载，用SSM管理补丁；迁移到Aurora MySQL比改写为NoSQL/图数据库或Lambda开发量小。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "重写Lambda和迁移DocumentDB均需明显改造。",
      "B": "Graviton需验证架构兼容，DynamoDB需重构数据模型。",
      "C": "容器化和改成Neptune与现有MySQL应用不兼容。",
      "D": "ASG/ALB扩展无状态层，Aurora保留MySQL接口，SSM利于自动维护。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/systems-manager/latest/userguide/integrations-aws.html",
        "title": "Systems Manager integrations with AWS services",
        "supports": "Systems Manager可自动维护ASG使用的AMI及补丁。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "300": {
    "blocker": "一家公司正计划将多个应用程式迁移到AWS。该公司对其整个应用领域并没有很好的了解。该资产由实体机和虚拟机混合组成。公司将迁移的一款应用程式具有许多对延迟敏感的依赖项。该公司不确定所有依赖项是什么。然而，该公司知道低延迟通讯使用在连接埠 1000 上运行的基于 IP 的自订协定。该公司希望将应用程式和这些依赖项一起迁移，以同时将所有低延迟介面移至AWS。该公司已安装AWS Application Discovery Agent，并已收集资料数月。公司应该如何识别需要与应用程式相同阶段迁移的依赖项？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：直接使用已采集的依赖/端口数据，符合目标。"
    ],
    "solutions": "正确答案为 A。使用已采集的Discovery Agent网络数据，在Migration Hub查看依赖图，再用Athena按目标端口1000筛出紧耦合服务器，一起组成迁移波次。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "直接使用已采集的依赖/端口数据，符合目标。",
      "B": "MGN做复制迁移，不提供这里描述的Discovery依赖分析流程。",
      "C": "Network Access Analyzer分析AWS网络配置可达性，不分析本地应用历史通信。",
      "D": "Discovery Agent不会按此流程推送CloudWatch Agent，重复采集无必要。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/application-discovery/latest/userguide/predefined-queries.html",
        "title": "Using predefined queries in Amazon Athena",
        "supports": "官方查询包含源/目标服务器、destination_port和通信频率，用于辨识依赖。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "301": {
    "blocker": "一家公司正在建立一个将在 AWS Lambda 函数上运行的应用程式。数百名客户将使用该应用程式。该公司希望为每个客户提供特定时间内的请求配额。配额必须符合客户的使用模式。有些客户必须在更短的时间内获得更高的配额。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：REST API+每客户使用计划/API key正是该功能。"
    ],
    "solutions": "正确答案为 A。REST API的使用计划可按API密钥设置周期配额/节流，为不同客户分配适合的使用计划；HTTP API不支持相同使用计划功能。",
    "result_flow": "API Gateway配额是尽力执行而非严格硬限额；API key不能代替身份认证。",
    "options": {
      "A": "REST API+每客户使用计划/API key正是该功能。",
      "B": "HTTP API不支持该REST使用计划/API key方案。",
      "C": "Lambda并发数控制同时执行，不是周期请求配额。",
      "D": "WAF速率规则不是客户分层的周期使用计划。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-api-usage-plans.html",
        "title": "Usage plans and API keys for REST APIs",
        "supports": "使用计划可给每个API key设置周期请求配额和速率。"
      }
    ],
    "audit_caveat": "API Gateway配额是尽力执行而非严格硬限额；API key不能代替身份认证。",
    "audit_status": "confirmed"
  },
  "302": {
    "blocker": "一家公司计划将其 on-premises VMware 包含 120 个虚拟机器的集群迁移到 AWS。 VM 安装了许多不同的作业系统和许多自订软体包。该公司还有一台 on-premises NFS 伺服器，大小为 10 TB。该公司已建立到 AWS 的 10 Gbps AWS Direct Connect 连接以进行迁移。哪一种解决方案可以在最短的时间内完成到AWS的迁移？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：MGN复制VM，DataSync经专线迁移NFS到EFS，并行进行。"
    ],
    "solutions": "正确答案为 B。大量异构VM及定制软件应采用MGN块级复制进行rehost，避免逐台重装；已有10Gbps专线可让DataSync直接把NFS数据传到EFS，无需等待离线设备运输。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "导出/导入及Snowball运输比利用现有高速DX慢。",
      "B": "MGN复制VM，DataSync经专线迁移NFS到EFS，并行进行。",
      "C": "重新构建所有系统和软件最耗时间，Lustre也并非直接NFS替代。",
      "D": "两次离线运输/导入/复制步骤更多。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/mgn/latest/ug/agentless-mgn.html",
        "title": "Agentless replication using AWS MGN",
        "supports": "MGN可用vCenter管理的VMware agentless复制，迁移现有VM。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "303": {
    "blocker": "一家线上调查公司在AWS云端中运行其应用程式。该应用程式是分散式的，由在自动扩展的Amazon Elastic Container Service (Amazon ECS)集群中运行的微服务组成。 ECS 集群是 Application Load Balancer (ALB) 的目标。 ALB 是Amazon CloudFront 发行版的自订来源。该公司有一项包含敏感数据的调查。敏感资料在应用程式中移动时必须进行加密。应用程式的资料处理微服务是唯一能够解密资料的微服务哪个解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：公钥上传CloudFront、私钥仅保留目标微服务，符合隔离解密。"
    ],
    "solutions": "正确答案为 B。CloudFront字段级加密用RSA公钥在边缘加密指定POST字段，只有持有私钥的数据处理微服务能解密；TLS终止后的中间服务也看不到敏感字段明文。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "CloudFront原生字段级加密接受RSA公钥，不是对称KMS键。",
      "B": "公钥上传CloudFront、私钥仅保留目标微服务，符合隔离解密。",
      "C": "自建边缘加密增加复杂度，且对称密钥的访问隔离不如该原生选项直接。",
      "D": "应公钥加密私钥解密，私钥加密不能提供这里的机密性。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/field-level-encryption.html",
        "title": "Use field-level encryption",
        "supports": "配置步骤是RSA密钥对、公钥上传、profile/configuration及缓存行为关联。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "304": {
    "blocker": "解决方案架构师正在为现有 VPC 确定DNS 策略。 VPC 设定为使用 10.24.34.0/24 CIDR 块。 VPC 也使用 Amazon Route 53 解析器来处理 DNS。新要求强制DNS 查询必须使用私人托管区域。此外，具有公用 IP 位址的执行个体必须接收对应的公用主机名称。哪一种解决方案将满足这些要求，以确保在 VPC 内正确解析网域名称？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：完整满足私有区域关联、两个DNS属性与DHCP关联。"
    ],
    "solutions": "正确答案为 B。私有托管区域必须关联VPC，同时开启DNS支持和主机名。DHCP使用AmazonProvidedDNS让实例查询Route53 Resolver并为有公网IP实例获得公网主机名。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "没有明确把私有区域关联VPC；DHCP选项集也不能原地修改。",
      "B": "完整满足私有区域关联、两个DNS属性与DHCP关联。",
      "C": "关闭enableDnsSupport使Amazon提供的DNS解析失效。",
      "D": "关闭enableDnsHostnames不满足公网主机名及私有DNS要求。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/us_us/vpc/latest/userguide/AmazonDNS-concepts.html",
        "title": "Understanding Amazon DNS",
        "supports": "私有托管区域需同时将enableDnsHostnames和enableDnsSupport设为true。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "305": {
    "blocker": "某资料分析公司有一个AmazonRedshift集群，由多个预留节点组成。由于员工团队正在编写深入的审计分析报告，因此集群正在经历意外的使用激增。产生报告的查询是复杂的读取查询，并且是 CPU 密集的。业务需求决定集群必须能够始终为读写查询提供服务。解决方案架构师必须设计一个能够适应突发使用的解决方案。哪种解决方案最经济有效率地满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：Concurrency Scaling把合资格排队查询发送临时集群，按活跃时间收费。"
    ],
    "solutions": "正确答案为 D。并发扩展在突发并发查询时临时增加计算能力，主集群持续处理业务，避免resize切换中断和长期过度配置。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "另建EMR需搬数据/改查询，成本与运维较高。",
      "B": "Classic resize可能使读写不可用。",
      "C": "Elastic resize仍有切换时间，不保证所有时刻可读写。",
      "D": "Concurrency Scaling把合资格排队查询发送临时集群，按活跃时间收费。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/redshift/latest/dg/concurrency-scaling.html",
        "title": "Concurrency scaling",
        "supports": "Redshift自动增加临时容量处理并发读写，当前数据可见，按查询活跃时间收费。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "306": {
    "blocker": "某研究中心正在迁移到 AWS 云，并将其 on-premises 1 PB 物件储存移动到 Amazon S3 储存桶。一百名科学家正在使用此物件储存来储存他们的工作相关文件。每个科学家在物件储存上都有一个个人资料夹。所有科学家都是一个IAM用户组的成员。该研究中心的合规官员担心科学家将能够访问彼此的工作成果。研究中心有严格的义务报告哪些科学家访问了哪些文件。负责这些报告的团队几乎没有 AWS 经验，并且需要一个现成的解决方案来最大限度地减少营运开销。解决方案架构师应该采取哪些操作组合来满足这些要求？ （选两个。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：用户组统一策略使用用户名变量隔离个人目录。",
      "B：CloudTrail对象数据事件记录Get/Put等数据访问及调用身份。"
    ],
    "solutions": "正确答案为 A、B。以IAM策略变量把每个用户限制到自己的S3前缀，再启用CloudTrail S3对象数据事件，在独立桶保留日志并用Athena查询审计谁访问了哪个文档。",
    "result_flow": "英文选项A把策略变量误写为$(aws:username)，有效IAM写法是${aws:username}；判断按题意，实际配置必须修正。",
    "options": {
      "A": "用户组统一策略使用用户名变量隔离个人目录。",
      "B": "CloudTrail对象数据事件记录Get/Put等数据访问及调用身份。",
      "C": "服务器访问日志可辅助分析，但严格身份审计应使用CloudTrail数据事件，访问日志为尽力交付。",
      "D": "IAM用户组不能作为资源策略Principal，且此选项未限制个人目录。",
      "E": "CloudWatch再接Athena连接器增加组件和操作开销。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/awscloudtrail/latest/userguide/logging-s3-data-events-governance.html",
        "title": "Logging CloudTrail S3 data events",
        "supports": "S3数据事件可记录对象活动和发起API调用的主体。"
      }
    ],
    "audit_caveat": "英文选项A把策略变量误写为$(aws:username)，有效IAM写法是${aws:username}；判断按题意，实际配置必须修正。",
    "audit_status": "confirmed"
  },
  "307": {
    "blocker": "某公司使用AWS Organizations来管理多帐户结构。该公司拥有数百个AWS帐户，预计帐户数量还会增加。该公司正在建立一个使用 Docker 图像的新应用程式。公司将把Docker影像推送到Amazon Elastic Container Registry (Amazon ECR)。只有公司组织内的帐户才有权存取这些图像。该公司有一个频繁运作的CI/CD流程。该公司希望保留所有标记的图像。然而，该公司希望只保留最近 5 张未标记的图像。哪种解决方案能够以最少的营运开销满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：组织条件动态涵盖新成员，原生生命周期清理未标记镜像。"
    ],
    "solutions": "正确答案为 A。私有ECR仓库用aws:PrincipalOrgID限制组织成员，避免逐账户维护；生命周期规则只选择untagged且保留最新5个，不影响带标签镜像。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "组织条件动态涵盖新成员，原生生命周期清理未标记镜像。",
      "B": "公开仓库内容可公开拉取，不能达到组织独享。",
      "C": "枚举账户和Lambda清理增加长期维护。",
      "D": "公开仓库不能靠接口端点限制所有公网访问。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonECR/latest/userguide/lifecycle_policy_parameters.html",
        "title": "Lifecycle policy properties in Amazon ECR",
        "supports": "tagStatus=untagged及imageCountMoreThan/countNumber可按数量只清理未标记镜像。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "308": {
    "blocker": "解决方案架构师正在审查公司拍摄 Amazon RDS 资料库实例快照的流程。公司每天自动进行快照，快照保留7天。解决方案架构师需要建议每 6 小时拍摄一次快照并将快照保留 30 天的解决方案。该公司使用 AWS Organizations ​​管理其所有 AWS 帐户。公司需要对 RDS 快照的运作状况有一个综合视图。哪种解决方案能够以最少的营运开销满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：AWS Backup提供计划、保留、标签选择和跨账户监控。"
    ],
    "solutions": "正确答案为 A。用AWS Backup跨账户管理统一计划、标签资源分配和监控，计划cron每6小时执行并保留30天，满足组织集中可视化。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "AWS Backup提供计划、保留、标签选择和跨账户监控。",
      "B": "RDS没有所述snapshot global policy跨账户功能。",
      "C": "StackSets+Lambda监控可自建但比Backup原生跨账户监控复杂。",
      "D": "DLM主要管理EBS快照/AMI，不是这里的RDS组织备份计划。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/aws-backup/latest/devguide/manage-cross-account.html",
        "title": "Managing AWS Backup across multiple accounts",
        "supports": "跨账户管理包含监控、备份政策及委派管理。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "309": {
    "blocker": "一家公司正在使用具有多帐户架构的AWS Organizations。公司目前帐户架构的安全性配置包括SCP、基于资源的策略、基于身分的策略、信任策略和会话策略。解决方案架构师需要允许 Account A 中的 IAM 使用者承担Account B 中的角色。解决方案架构师必须采取哪些步骤组合才能满足此要求？ （选择三项。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：源账户SCP必须允许该操作或至少没有显式拒绝，作为权限上限。",
      "C：源用户必须有调用目标角色sts:AssumeRole的身份权限。",
      "E：目标角色的trust policy必须允许来源主体。"
    ],
    "solutions": "正确答案为 A、C、E。跨账户AssumeRole需要源用户身份策略允许sts:AssumeRole、源账户SCP不阻止，以及目标角色信任策略信任该用户/账户。会话策略不能主动授予权限。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "源账户SCP必须允许该操作或至少没有显式拒绝，作为权限上限。",
      "B": "目标角色信任策略本身是必需资源策略，泛称其他资源策略并非额外必需。",
      "C": "源用户必须有调用目标角色sts:AssumeRole的身份权限。",
      "D": "不是给账户B的某个用户赋权，执行者是账户A用户。",
      "E": "目标角色的trust policy必须允许来源主体。",
      "F": "GetSessionToken不用于传入AssumeRole的会话策略，session policy只能缩小权限。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/IAM/latest/UserGuide/tutorial_cross-account-with-roles.html",
        "title": "Delegate access across AWS accounts using IAM roles",
        "supports": "跨账户访问须有来源身份AssumeRole权限和目标角色信任。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "310": {
    "blocker": "一家公司想要使用 Amazon S3 来备份其 on-premises 档案储存解决方案。该公司的on-premises档案储存解决方案支援NFS，并且该公司希望其新解决方案支援NFS。该公司希望在 5 天后归档备份档案。如果公司需要归档文件进行灾难恢复，公司愿意等待几天来检索这些文件。哪种解决方案最经济有效率地满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：File Gateway满足NFS，生命周期深度归档满足宽松恢复时间。"
    ],
    "solutions": "正确答案为 D。S3 File Gateway提供NFS接口并把文件作为S3对象存储；5天后转Deep Archive适合可等待数日的灾难恢复，长期存储成本最低。",
    "result_flow": "归档后不可直接通过NFS读取，需要先在S3发起还原，完成后再供网关读取。",
    "options": {
      "A": "Standard-IA最短30天转移限制且费用高于深度归档。",
      "B": "Volume Gateway提供iSCSI块存储，不提供所需NFS文件共享。",
      "C": "Tape Gateway是虚拟磁带接口，不是NFS文件共享。",
      "D": "File Gateway满足NFS，生命周期深度归档满足宽松恢复时间。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/filegateway/latest/files3/storage-classes.html",
        "title": "Using storage classes",
        "supports": "File Gateway可结合S3存储类和生命周期；归档对象读取前须还原。"
      }
    ],
    "audit_caveat": "归档后不可直接通过NFS读取，需要先在S3发起还原，完成后再供网关读取。",
    "audit_status": "confirmed"
  },
  "311": {
    "blocker": "一家公司在 Amazon EC2 实例和 AWS Lambda 函数上运行其应用程式。 EC2 实例承受持续稳定的负载。 Lambda 函数会经历变化且不可预测的负载。该应用程式包括一个快取层，该层使用 Amazon MemoryDB 来支援 Redis 集群。解决方案架构师必须推荐一种解决方案，以最大限度地降低公司的每月整体成本。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：分别选择各服务适用承诺，并仅覆盖Lambda基线。"
    ],
    "solutions": "正确答案为 A。稳定EC2负载采用折扣较高的EC2 Instance Savings Plan；不可预测Lambda只承诺可持续的最低用量，MemoryDB Redis用预留节点单独折扣。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "分别选择各服务适用承诺，并仅覆盖Lambda基线。",
      "B": "Lambda reserved concurrency预留并发但不产生这种用量折扣。",
      "C": "Compute Savings Plan不覆盖MemoryDB。",
      "D": "Compute Savings Plan不覆盖MemoryDB，预留并发也不是购买折扣。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/savingsplans/latest/userguide/sp-ris.html",
        "title": "Comparing Savings Plans and RIs",
        "supports": "Compute Savings Plan覆盖EC2/Fargate/Lambda；EC2 Instance计划约束更窄折扣更高。"
      },
      {
        "url": "https://docs.aws.amazon.com/memorydb/latest/devguide/nodes.reservednodes.html",
        "title": "MemoryDB reserved nodes",
        "supports": "MemoryDB Redis预留节点提供相对按需节点的折扣。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "312": {
    "blocker": "一家公司正在 Amazon EC2 实例上推出一款新的线上游戏。该游戏必须在全球范围内发售。该公司计划在三个 AWS Regions us-east-1、eu-west-1 和 ap-southeast-1 上运行游戏。游戏的排行榜、玩家库存和活动状态必须在 Regions 上可用。解决方案架构师必须设计一个解决方案，使任何Region能够扩展以处理所有Regions的负载。此外，用户必须自动连接到提供最低延迟的Region。哪种解决方案能够以最少的营运开销满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：托管DNS延迟路由+全局表+ASG运维最少。"
    ],
    "solutions": "正确答案为 C。每区域ASG和NLB承接游戏服务，Route53延迟路由导向较低网络时延区域，DynamoDB全局表自动复制游戏元数据并可在各区域读写。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "Spot不是保障全区域故障接管容量的稳定选择，RDS异地只读副本也非多区域写。",
      "B": "地理邻近不等于最低延迟，EC2自管MySQL复制运维高。",
      "C": "托管DNS延迟路由+全局表+ASG运维最少。",
      "D": "EC2 Global View只提供资源查看，不是全球部署/调度服务，自建DNS增加维护。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/globaltables_HowItWorks.html",
        "title": "Global tables: How it works",
        "supports": "DynamoDB全局表在参与区域复制写入，适合多区域应用。"
      },
      {
        "url": "https://docs.aws.amazon.com/hi_in/Route53/latest/DeveloperGuide/routing-policy-latency.html",
        "title": "Latency-based routing",
        "supports": "Route53根据区域时延把DNS请求引导到资源。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "313": {
    "blocker": "一家公司正在部署来自 AWS Marketplace 的第三方防火墙设备解决方案，以监控和保护离开公司 AWS 环境的流量。该公司希望将此设备部署到共享服务VPC 中，并透过这些设备路由所有出站网路流量。解决方案架构师需要推荐一种部署方法，该方法优先考虑可靠性并最大限度地减少单一AWSRegion内防火墙设备之间的故障转移时间。本公司已设定从共享服务VPC到其他VPC的路由。解决方案架构师应该建议采取哪些步骤来满足这些要求？ （选择三项。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：跨AZ避免单AZ故障使全部防火墙失效。",
      "C：GWLB专为网络虚拟设备分发和故障转移。",
      "F：GWLB端点可作为路由表目标，把经过流量送入设备服务。"
    ],
    "solutions": "正确答案为 A、C、F。跨两个AZ部署防火墙实例作为GWLB目标，以GWLB端点作为路由下一跳，实现透明流量检查和健康目标切换。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "跨AZ避免单AZ故障使全部防火墙失效。",
      "B": "普通NLB不是透明三层安全设备插入和GENEVE封装方案。",
      "C": "GWLB专为网络虚拟设备分发和故障转移。",
      "D": "普通接口端点不能作为这种透明转发的路由下一跳。",
      "E": "同AZ部署不能抵御AZ失效。",
      "F": "GWLB端点可作为路由表目标，把经过流量送入设备服务。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/elasticloadbalancing/latest/gateway/getting-started.html",
        "title": "Getting started with Gateway Load Balancers",
        "supports": "官方流程在多个AZ配置设备及GWLB，并建立GWLB endpoint；推荐每AZ端点。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "314": {
    "blocker": "解决方案架构师需要将on-premises旧应用程式迁移到AWS。该应用程式在负载平衡器后面的两台伺服器上运行。该应用程式需要与伺服器网路介面卡的 MAC 位址关联的许可证文件 软体供应商需要 12 小时才能发送新的许可证文件。该应用程式还使用具有静态 IP 位址的设定档来存取资料库伺服器，不支援主机名称。考虑到这些需求，应该采取哪种步骤组合来实现AWS中应用伺服器的高可用架构？ （选两个。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：ENI属性随网卡保持，可预先准备MAC许可并匹配使用。",
      "D：启动时读取数据库IP，兼容应用只能读静态IP配置的限制。"
    ],
    "solutions": "正确答案为 A、D。提前为ENI池的固定MAC获取许可，实例启动时绑定对应ENI并下载匹配许可，避免12小时等待；数据库IP由Parameter Store动态注入配置，避免每次变更重制AMI。",
    "result_flow": "ENI绑定限定同一AZ；高可用应在每个AZ预备各自ENI和许可，不能把同一个ENI跨AZ移动。",
    "options": {
      "A": "ENI属性随网卡保持，可预先准备MAC许可并匹配使用。",
      "B": "仅把许可打包进AMI未确保新实例绑定与许可匹配的ENI。",
      "C": "每次启动等待供应商12小时无法快速故障恢复。",
      "D": "启动时读取数据库IP，兼容应用只能读静态IP配置的限制。",
      "E": "把IP烘焙入AMI会导致数据库IP变动时镜像过期。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-eni.html",
        "title": "Elastic network interfaces",
        "supports": "ENI包含MAC等属性，网卡在同AZ实例之间移动时保留属性。"
      }
    ],
    "audit_caveat": "ENI绑定限定同一AZ；高可用应在每个AZ预备各自ENI和许可，不能把同一个ENI跨AZ移动。",
    "audit_status": "confirmed"
  },
  "315": {
    "blocker": "一家公司在美国的 AWS Region 中运行其销售报告应用程式。该应用程式使用 Amazon API Gateway Regional API 和 AWS Lambda 函数根据 MySQL 资料库中的 Amazon RDS 中的资料产生按需报告。该应用程式的前端托管在 Amazon S3 上，用户可以透过 Amazon CloudFront 发行版进行存取。该公司正在使用 Amazon Route 53 作为域的 DNS 服务。 Route 53 配置了简单的路由策略，将流量路由到API Gateway API。未来6个月内，该公司计划将业务扩展至欧洲。超过 90% 的资料库流量是唯读流量。该公司已经在新的 Region 中部署了 API Gateway API 和 Lambda 函数。解决方案架构师必须设计一种解决方案，以最大限度地减少下载报告的使用者的延迟。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：原生只读副本持续复制，配合延迟路由降低读链路时延。"
    ],
    "solutions": "正确答案为 C。报表主要读数据库，在欧洲部署RDS跨区域只读副本让欧洲Lambda本地读取；DNS延迟路由选择低延迟API区域。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "只全量迁移不会持续更新欧洲数据。",
      "B": "DMS CDC可复制但管理复杂，地理路由也不是时延优化。",
      "C": "原生只读副本持续复制，配合延迟路由降低读链路时延。",
      "D": "地理位置策略按地区而非实测网络时延选择。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/hi_in/Route53/latest/DeveloperGuide/routing-policy-latency.html",
        "title": "Latency-based routing",
        "supports": "延迟路由从可用区域资源中选择较低时延目标。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "316": {
    "blocker": "软体公司需要创建短期测试环境来测试拉取请求，作为其开发过程的一部分。每个测试环境由位于 Auto Scaling 群组中的单一 Amazon EC2 实例组成。测试环境必须能够与中央伺服器通讯以报告测试结果。中央伺服器位于本地资料中心。解决方案架构师必须实施解决方案，以便公司无需任何手动干预即可建立和删除测试环境。该公司创建了一个中转网关，带有连接到 on-premises 网路的 VPN 附件。哪种解决方案能够以最少的营运开销满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：共享一次配置的连通网络，测试资源生命周期由CloudFormation管理。"
    ],
    "solutions": "正确答案为 B。把短期测试实例统一放在已有TGW连接的单VPC，CloudFormation仅创建/删除每组测试资源，复用网络即可自动向本地中央服务器报告。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "每测试环境新VPC/附件/路由增加资源和维护。",
      "B": "共享一次配置的连通网络，测试资源生命周期由CloudFormation管理。",
      "C": "每测试环境建立账户/组织资源远超需求。",
      "D": "重构容器/EKS增加开发和集群维护。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-autoscaling-launchconfiguration.html",
        "title": "AWS::AutoScaling::LaunchConfiguration",
        "supports": "CloudFormation中ASG通过VPCZoneIdentifier使用既有子网，无需为每组实例创建VPC。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "317": {
    "blocker": "一家公司正在向 AWS 部署新的 API。此 API 使用 Amazon API Gateway 以及 Regional API 端点和 AWS Lambda 函数进行托管。 API 从外部供应商 API 检索数据，将资料储存在 Amazon DynamoDB 全域表中，并从 DynamoDB 全域表检索资料。供应商 API 的 API 金钥储存在 AWS Secrets Manager 中，并使用 AWS Key Management Service 中的客户管理金钥进行加密（AWS KMS）。该公司已将自己的 API 部署到单一 AWS Region 中。解决方案架构师需要更改公司 API 的 API 元件，以确保这些元件可以在主动-主动配置中跨多个Regions 运行。哪种变更组合能够以最少的营运开销满足这项要求？ （选择三项。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：各区域API加DNS多值策略可活动活动分流，API区域资源仍需独立部署。",
      "B：新建multi-Region客户管理键并复制，不能转换已有单区域键。",
      "C：secret原生复制保持更新，在目标区域指定该区KMS键。"
    ],
    "solutions": "正确答案为 A、B、C。多区域分别部署Regional API和Lambda，以DNS分流；区域内使用KMS副本密钥和Secrets Manager自动复制的secret，避免跨区取密钥和手工同步。",
    "result_flow": "Secrets Manager可使用各自独立的区域KMS键；multi-Region键并非复制secret的硬性前提，但B是给定选项中合理的密钥方案。",
    "options": {
      "A": "各区域API加DNS多值策略可活动活动分流，API区域资源仍需独立部署。",
      "B": "新建multi-Region客户管理键并复制，不能转换已有单区域键。",
      "C": "secret原生复制保持更新，在目标区域指定该区KMS键。",
      "D": "AWS托管键不能自行创建或把单区域键转换成多区域。",
      "E": "手动复制secret值增加轮换同步维护。",
      "F": "API Gateway没有为既有API直接打开multi-Region选项的功能。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/en_en/secretsmanager/latest/userguide/replicate-secrets.html",
        "title": "Replicate Secrets Manager secrets across Regions",
        "supports": "原生复制secret时可选择目标区域的KMS键。"
      }
    ],
    "audit_caveat": "Secrets Manager可使用各自独立的区域KMS键；multi-Region键并非复制secret的硬性前提，但B是给定选项中合理的密钥方案。",
    "audit_status": "confirmed"
  },
  "318": {
    "blocker": "一家线上零售公司将其基于 Web 的有状态应用程式和 MySQL 资料库托管在单一伺服器上的 on-premises 资料中心中。该公司希望透过开展更多行销活动和促销活动来扩大客户群。在准备过程中，该公司希望将其应用程式和资料库迁移到AWS，以提高其架构的可靠性。哪种解决方案应提供最高等级的可靠性？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：Aurora加Redis复制组与无状态化应用形成适合Web会话的高可用架构。"
    ],
    "solutions": "正确答案为 B。Aurora MySQL保留关系型兼容并提供多AZ存储，应用用ALB+ASG跨AZ部署，Redis复制组外置会话并自动故障转移，避免实例本地状态成为单点。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "Neptune是图数据库，不是优先选择的高性能会话存储。",
      "B": "Aurora加Redis复制组与无状态化应用形成适合Web会话的高可用架构。",
      "C": "DocumentDB非MySQL兼容，Firehose不是会话数据库。",
      "D": "Memcached节点不复制会话，故障时缓存会丢失，可靠性弱于Redis复制组。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/AutoFailover.html",
        "title": "Minimizing downtime using Multi-AZ",
        "supports": "Redis复制组在跨AZ启用Multi-AZ后可自动提升副本，Memcached无此复制故障转移。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "319": {
    "blocker": "本公司的解决方案架构师需要为 VPC 中托管的 Amazon EC2 Windows 执行个体提供安全的远端桌面连线。此解决方案必须将集中用户管理与公司的on-premisesActive Directory整合。 VPC 透过网路连线。该公司拥有可用于建立 AWS Site-to-Site VPN 连接的硬体。哪一种解决方案能够最具成本效益地满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：直接VPN+本地AD已经满足集中用户管理和安全私网RDP，组件/费用更少。"
    ],
    "solutions": "正确答案为 C。已有VPN硬件时，Site-to-Site VPN让私有Windows实例直接加入本地AD并通过企业网络RDP，复用现有身份管理，避免AD Connector/Managed AD和堡垒机的额外费用。",
    "result_flow": "B技术上也可行；若组织已有免费复用的AD Connector/SSO，成本比较会改变。按题目仅已有本地AD和VPN硬件，C更符合最低成本。",
    "options": {
      "A": "新建Managed AD及堡垒机引入目录和实例常驻成本。",
      "B": "Fleet Manager本身无额外费用且支持Identity Center，但AD Connector仍收费且仍需要VPN/DX到本地AD。",
      "C": "直接VPN+本地AD已经满足集中用户管理和安全私网RDP，组件/费用更少。",
      "D": "Managed AD加RD Gateway集群成本高于复用本地AD。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/directoryservice/latest/admin-guide/ad_connector_getting_started.html",
        "title": "Getting started with AD Connector",
        "supports": "AD Connector连接本地AD仍要求VPC经VPN或DX连接本地网络。"
      },
      {
        "url": "https://aws.amazon.com/directoryservice/other-directories-pricing/",
        "title": "Other Directory Types Pricing",
        "supports": "AD Connector通常按小时收费；不因使用Fleet Manager自动免费。"
      },
      {
        "url": "https://docs.aws.amazon.com/systems-manager/latest/userguide/fleet-manager-remote-desktop-connections.html",
        "title": "Fleet Manager Remote Desktop",
        "supports": "Identity Center可用于Fleet Manager认证，但这是额外身份集成路径。"
      }
    ],
    "audit_caveat": "B技术上也可行；若组织已有免费复用的AD Connector/SSO，成本比较会改变。按题目仅已有本地AD和VPN硬件，C更符合最低成本。",
    "audit_status": "corrected"
  },
  "320": {
    "blocker": "一家公司的合规性审计显示，在 AWS 帐户中创建的一些 Amazon 弹性块存储 (Amazon EBS) 卷未加密。解决方案架构师必须实作一个解决方案来加密所有新的静态磁碟区EBS。哪种解决方案能够以最少的努力满足此要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：默认加密按区域生效，直接覆盖新建卷。"
    ],
    "solutions": "正确答案为 D。在账户使用的每个区域开启EBS默认加密，使后续新卷和从未加密快照复制的新快照自动加密，配置最少。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "事后删除未加密卷会损失数据且不是预防机制。",
      "B": "Audit Manager做审计，不负责自动加密所有新卷。",
      "C": "Config事后检测加修复更复杂，既有卷也不能原地开启加密。",
      "D": "默认加密按区域生效，直接覆盖新建卷。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/en_en/ebs/latest/userguide/encryption-by-default.html",
        "title": "Enable Amazon EBS encryption by default",
        "supports": "默认加密强制该区域新EBS卷及快照副本加密，不改动既有卷。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "321": {
    "blocker": "一家研究公司正在 AWS 云端中运行日常模拟，以满足高需求。模拟在数百个基于 Amazon Linux 2 的 Amazon EC2 实例上运行。偶尔，模拟会卡住，需要云端运维工程师透过 SSH 连接到 EC2 执行个体来解决问题。公司政策规定，任何 EC2 实例都不能使用相同的 SSH 金钥，且所有连线都必须在 AWS CloudTrail 中登入。解决方案架构师如何满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：SendSSHPublicKey使用短期公钥并可被CloudTrail记录，免常驻共享密钥。"
    ],
    "solutions": "正确答案为 C。EC2 Instance Connect按IAM权限临时推送SSH公钥，公钥仅60秒有效，控制台浏览器连接可为每次连接生成临时密钥，API调用可用CloudTrail审计。",
    "result_flow": "CloudTrail记录的是Instance Connect API连接授权，不记录SSH会话的每条命令；若要求命令级审计需另配会话日志。",
    "options": {
      "A": "取Secret的日志不等于实际SSH登录连接记录。",
      "B": "SSM运行改密钥的命令日志不等于随后SSH连接日志。",
      "C": "SendSSHPublicKey使用短期公钥并可被CloudTrail记录，免常驻共享密钥。",
      "D": "复杂的每日轮换不能确保每次SSH连接本身都被CloudTrail记录。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/ec2-instance-connect/latest/APIReference/API_SendSSHPublicKey.html",
        "title": "SendSSHPublicKey",
        "supports": "EIC将临时公钥发送到指定实例，保留60秒。"
      }
    ],
    "audit_caveat": "CloudTrail记录的是Instance Connect API连接授权，不记录SSH会话的每条命令；若要求命令级审计需另配会话日志。",
    "audit_status": "confirmed"
  },
  "322": {
    "blocker": "一家公司正在迁移行动银行应用程式以在 VPC 中的 Amazon EC2 实例上运行。后端服务应用程式在本地资料中心运行。资料中心有一个 AWS Direct Connect 连接到 AWS。在 VPC 中运行的应用程式需要将 DNS 请求解析到在资料中心运行的 on-premises Active Directory 域。哪种解决方案能够以最少的管理开销来满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：托管出站端点和转发规则是最少运维的混合DNS。"
    ],
    "solutions": "正确答案为 C。VPC应用查询本地AD域名应创建Resolver出站端点和该域的转发规则，利用既有DX把DNS查询交给本地AD DNS。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "自建DNS集群需要维护和高可用管理。",
      "B": "私有托管区域NS记录不能替代跨网段条件DNS转发。",
      "C": "托管出站端点和转发规则是最少运维的混合DNS。",
      "D": "新增域控及信任超过仅解析DNS的需要。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver.html",
        "title": "What is Route 53 VPC Resolver",
        "supports": "Outbound endpoint将VPC DNS查询转到本地，支持VPN/DX和按域转发规则。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "323": {
    "blocker": "一家公司处理环境资料。该公司设置了感测器来提供来自城市不同区域的连续数据流。数据以 JSON 格式提供。该公司希望使用 AWS 解决方案将资料传送到不需要固定架构储存的资料库。数据必须即时发送。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：实时流加无固定非键模式DynamoDB满足需求，需消费者完成写入。"
    ],
    "solutions": "正确答案为 B。Kinesis Data Streams接收实时事件，由Lambda或消费者写DynamoDB；DynamoDB可存JSON文档而无需固定非键字段模式。",
    "result_flow": "Data Streams并不会自动直接写DynamoDB；必须配置Lambda/消费者。",
    "options": {
      "A": "Redshift是有表结构的分析数仓，Firehose有缓冲。",
      "B": "实时流加无固定非键模式DynamoDB满足需求，需消费者完成写入。",
      "C": "Aurora是关系数据库，不符合此处无固定模式要求。",
      "D": "Firehose不提供这里描述的直接Keyspaces目标。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/lambda/latest/dg/with-kinesis.html",
        "title": "Using Lambda with Amazon Kinesis",
        "supports": "Lambda可持续消费Kinesis流并处理记录，需业务处理器写入目标。"
      }
    ],
    "audit_caveat": "Data Streams并不会自动直接写DynamoDB；必须配置Lambda/消费者。",
    "audit_status": "confirmed"
  },
  "324": {
    "blocker": "一家公司正在将遗留应用程式从on-premises资料中心迁移到AWS。该应用程式使用 MongoDB 作为键值资料库。根据该公司的技术指南，所有Amazon EC2实例必须托管在没有网路连线的私有子网路中。此外，应用程式和资料库之间的所有连接都必须加密。资料库必须能够根据需求进行扩展。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：网关端点可满足VPC内私有访问且无端点费，是本题首选。"
    ],
    "solutions": "参考选择为 B。原题以MongoDB作键值存储且要求按需伸缩，可改为DynamoDB on-demand并通过VPC网关端点访问，无需公网。HTTPS仍负责传输加密。",
    "result_flow": "本题未明确要求最低成本；按当前服务能力B和C都能满足网络和伸缩要求，题库若只判B会有歧义。历史“DynamoDB无接口端点”解析已过时；MongoDB到DynamoDB还需代码/数据模型改造。",
    "options": {
      "A": "DocumentDB不是创建DynamoDB式tables，选项的Provisioned IOPS描述也不是标准DocumentDB容量配置。",
      "B": "网关端点可满足VPC内私有访问且无端点费，是本题首选。",
      "C": "现今DynamoDB也支持接口端点，此选项技术上同样可行但有端点费。",
      "D": "DocumentDB cluster endpoint本身不提供自动计算伸缩，选项配置表述不准确。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/privatelink-interface-endpoints.html",
        "title": "AWS PrivateLink for DynamoDB",
        "supports": "DynamoDB目前同时支持gateway和interface端点；前者不计费、后者计费。"
      }
    ],
    "audit_caveat": "本题未明确要求最低成本；按当前服务能力B和C都能满足网络和伸缩要求，题库若只判B会有歧义。历史“DynamoDB无接口端点”解析已过时；MongoDB到DynamoDB还需代码/数据模型改造。",
    "audit_status": "ambiguous"
  },
  "325": {
    "blocker": "一家公司正在 AWS 云端中的 Amazon EC2 实例上运行应用程式。该应用程式使用 MongoDB 资料库，并将副本集作为其资料层。 MongoDB 资料库安装在公司on-premises 资料中心的系统上，可透过AWS Direct Connect 连接到资料中心环境存取。解决方案架构师必须将 on-premises MongoDB 资料库迁移到 Amazon DocumentDB（具有 MongoDB 相容性）。解决方案架构师应该选择哪种策略来执行此迁移？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：DMS复制实例、源/目标端点和任务是受支持在线迁移流程。"
    ],
    "solutions": "正确答案为 B。DMS支持MongoDB副本集作为源，通过全量迁移加CDC读取oplog，把持续变更复制到DocumentDB，实现低停机迁移。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "自建EC2 MongoDB不是迁移到DocumentDB，且所谓同步复制未满足目标。",
      "B": "DMS复制实例、源/目标端点和任务是受支持在线迁移流程。",
      "C": "Data Pipeline不是这里适合的MongoDB持续CDC迁移方案。",
      "D": "Glue crawler只发现schema，不提供持续数据库复制。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/reference-architecture-diagrams/latest/data-analytics/migration-mongodb-documentdb.html",
        "title": "Migration from MongoDB to Amazon DocumentDB",
        "supports": "AWS参考架构采用DMS全量复制和CDC把MongoDB迁移DocumentDB。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "326": {
    "blocker": "一家公司正在重新架构其应用程式以在 AWS 上运行。该公司的基础设施包括多个Amazon EC2实例。公司的开发团队需要不同程度的存取权限。该公司希望实施一项策略，要求所有 Windows EC2 实例加入到 AWS 上的 Active Directory 域。该公司还希望实施增强的安全流程，例如多重身份验证 (MFA)。该公司希望尽可能使用托管 AWS 服务。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：Managed Microsoft AD加域内管理实例是官方常见管理做法。"
    ],
    "solutions": "参考选择为 B。需要Windows域管理和MFA集成，应使用AWS Managed Microsoft AD而非Simple AD。在域内管理EC2安装RSAT进行用户、组和策略配置是标准管理方式。",
    "result_flow": "A和B都可实现目录管理；题目“尽可能托管”对WorkSpaces有利，但未要求现有WorkSpaces或桌面。不能把A解析成不可用。AD的RADIUS MFA不等于自动为所有Windows交互登录启用MFA。",
    "options": {
      "A": "WorkSpaces也可安装管理工具，技术上可行，但额外引入桌面服务。",
      "B": "Managed Microsoft AD加域内管理实例是官方常见管理做法。",
      "C": "Simple AD不支持MFA等所需高级功能。",
      "D": "Simple AD不支持MFA；换管理终端不能补足目录能力。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/directoryservice/latest/admin-guide/directory_simple_ad.html",
        "title": "Simple AD",
        "supports": "Simple AD不支持MFA等特性。"
      },
      {
        "url": "https://docs.aws.amazon.com/workspaces/latest/adminguide/directory_administration.html",
        "title": "Active Directory Administration Tools",
        "supports": "WorkSpaces能装管理工具，官方也建议集中到EC2管理较大部署。"
      }
    ],
    "audit_caveat": "A和B都可实现目录管理；题目“尽可能托管”对WorkSpaces有利，但未要求现有WorkSpaces或桌面。不能把A解析成不可用。AD的RADIUS MFA不等于自动为所有Windows交互登录启用MFA。",
    "audit_status": "ambiguous"
  },
  "327": {
    "blocker": "一家公司想要将其on-premises应用程式迁移到AWS。应用程式的资料库储存结构化产品资料和临时使用者会话资料。公司需要将产品资料与使用者会话资料解耦。该公司还需要在另一个AWSRegion中实现复制以进行灾难复原。哪种解决方案能够以最高的效能满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：两个全局表加DAX均满足数据分离和区域复制，读缓存性能最高。"
    ],
    "solutions": "参考选择为 C。产品数据只说明为结构化数据，没有声明关系连接或SQL依赖。两个DynamoDB全局表将产品与会话分离，并可跨区域复制，DAX对可接受最终一致的读取提供内存级性能，符合最高性能目标。",
    "result_flow": "若产品数据隐含关系模型/连接查询或必须立即看见跨区会话更新，D更稳妥；原题未给出这些约束，不应仅凭structured推断必须RDS。建议标注歧义，不将D简单判错。",
    "options": {
      "A": "单库分schema不充分解耦，并且没有内存缓存。",
      "B": "Memcached没有Global Datastore；Global Datastore仅适用于Redis/Valkey支持配置。",
      "C": "两个全局表加DAX均满足数据分离和区域复制，读缓存性能最高。",
      "D": "RDS加DynamoDB能满足，但RDS产品读取没有DAX缓存优势，且原题并未要求关系模型。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DAX.concepts.html",
        "title": "DAX: How it works",
        "supports": "缓存命中时DAX直接返回数据，不读DynamoDB。"
      },
      {
        "url": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/dax-config-considerations.html",
        "title": "Configuring your DAX cluster",
        "supports": "DAX区域级缓存不立刻感知另一Region的全局表复制，需考虑TTL陈旧。"
      }
    ],
    "audit_caveat": "若产品数据隐含关系模型/连接查询或必须立即看见跨区会话更新，D更稳妥；原题未给出这些约束，不应仅凭structured推断必须RDS。建议标注歧义，不将D简单判错。",
    "audit_status": "ambiguous"
  },
  "328": {
    "blocker": "某公司透过AWS Control Tower在AWS上编排了多帐户结构。该公司正在使用 AWS Organizations、AWS Config 和 AWS Trusted Advisor。该公司有一个专门用于开发帐户的OU，开发人员可以用它来在AWS上进行实验。公司拥有数百名开发者，每个开发者都有一个单独的开发帐户。该公司希望优化这些开发帐户的成本。这些帐户中的Amazon EC2实例和Amazon RDS实例必须是可突发的。该公司希望禁止使用其他不相关的服务。解决方案架构师应该建议什么来满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：自定义SCP可直接预防不合规创建并覆盖该OU全部账户。"
    ],
    "solutions": "正确答案为 A。自定义规则用Organizations SCP附加到开发OU，按ec2:InstanceType和rds:DatabaseClass限制T系列，并拒绝无关服务。Control Tower内置控制不等于可直接创建任意自定义控制。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "自定义SCP可直接预防不合规创建并覆盖该OU全部账户。",
      "B": "侦测控制只能事后发现，不能阻止。",
      "C": "Control Tower托管预防控制由SCP实现，但任意自定义SCP应在Organizations部署，不是创建自定义Control Tower控制。",
      "D": "Config事后侦测不能拒绝创建。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/prescriptive-guidance/latest/designing-control-tower-landing-zone/controls.html",
        "title": "Using controls to govern resources",
        "supports": "官方说明自定义SCP/Config规则不在Control Tower内实现，而是在Organizations/Config实现。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "corrected"
  },
  "329": {
    "blocker": "一家金融服务公司在 Amazon EC2 实例和 AWS Lambda 函数上运行复杂的多层应用程式。应用程式将暂存资料储存在Amazon S3中。 S3物件的有效期限仅45分钟，24小时后将删除。该公司透过启动 AWS CloudFormation 堆叠来部署应用程式的每个版本。该堆叠创建运行应用程式所需的所有资源。当公司部署并验证新的应用程式版本时，公司会删除旧版的CloudFormation堆叠。该公司最近尝试删除旧应用程式版本的CloudFormation堆叠，但操作失败。分析发现CloudFormation删除已有的S3桶失败。解决方案架构师需要在不对应用程式架构进行重大变更的情况下解决此问题。哪种解决方案满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：自定义资源Delete事件执行清空，再响应成功，允许桶删除。"
    ],
    "solutions": "正确答案为 A。CloudFormation无法删除非空桶。自定义资源在删除时清空桶，依赖桶使删除顺序为先清理后删桶，从而无需改应用架构。",
    "result_flow": "若启用版本控制，清理函数还需删除所有对象版本和删除标记；设置错误的依赖方向会导致先删桶失败。",
    "options": {
      "A": "自定义资源Delete事件执行清空，再响应成功，允许桶删除。",
      "B": "改EFS需改应用及网络，超出最小变更。",
      "C": "S3 Lifecycle不能以45分钟为单位精确到期，异步删除也不保证堆栈删除前已空。",
      "D": "DeletionPolicy Delete不会让非空S3桶自动清空。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-s3-bucket.html",
        "title": "AWS::S3::Bucket",
        "supports": "删除S3桶前必须清空全部对象；DeletionPolicy本身不清空桶。"
      }
    ],
    "audit_caveat": "若启用版本控制，清理函数还需删除所有对象版本和删除标记；设置错误的依赖方向会导致先删桶失败。",
    "audit_status": "confirmed"
  },
  "330": {
    "blocker": "一家公司开发了一款手机游戏。游戏的后端在位于on-premises资料中心的多个虚拟机器上运行。业务逻辑使用具有多种功能的REST API 公开。玩家会话资料储存在中央档案储存中。后端服务使用不同的 API 金钥进行限制并区分即时流量和测试流量。游戏后端的负载全天都在变化。尖峰时段，伺服器容量不足。取得玩家会话资料时也存在延迟问题。管理层要求解决方案架构师提供一个云端架构，该架构可以处理游戏的变化负载并提供低延迟的资料存取。 API 模型不应更改。哪种解决方案满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：满足REST/API key管理并使计算与会话存储自动扩展。"
    ],
    "solutions": "正确答案为 C。API Gateway REST API保留现有REST模型并支持API key使用计划/节流，Lambda按流量扩展，DynamoDB按需容量存低延迟会话数据。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "NLB不实现REST路由和API key使用计划，单EC2仍是容量限制。",
      "B": "ALB不能提供API Gateway的API key使用计划。",
      "C": "满足REST/API key管理并使计算与会话存储自动扩展。",
      "D": "AppSync主要GraphQL/WebSocket，改变现有API模型且Aurora不如DynamoDB直接适合键值会话。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-api-usage-plans.html",
        "title": "Usage plans and API keys for REST APIs",
        "supports": "REST API使用计划/API key支持分客户和阶段节流、配额。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "331": {
    "blocker": "一家公司正在将应用程式迁移到AWS 云端。该应用程式在 on-premises 资料中心中运行，每晚将数千个映像写入已安装的 NFS 档案系统中。公司迁移应用程式后，本公司将在安装 Amazon Elastic File System (Amazon EFS) 档案系统的 Amazon EC2 实例上托管该应用程式。本公司已与 AWS 建立AWS Direct Connect 连接。在迁移切换之前，解决方案架构师必须建立一个流程，将新建立的 on-premises 映像复制到 EFS 档案系统。复制影像最有效的操作方法是什么？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：选择了最适合的DataSync直接定时同步机制，但端点名称写错，必须修正。"
    ],
    "solutions": "参考选择为 D。意图应为部署本地DataSync代理，使用专线私有VIF连接DataSync VPC服务端点，再由DataSync挂载EFS目标，按日增量同步。这样无需S3中转或自建复制程序。",
    "result_flow": "D英文写成“interface VPC endpoint for Amazon EFS”，这是错误：EFS PrivateLink端点是管理API，不承载NFS数据。应改为DataSync服务端点；按字面四项均不完整，D仅为可修复的出题意图。",
    "options": {
      "A": "S3加Lambda中转比原生DataSync到EFS复杂。",
      "B": "File Gateway后端是S3，不能直接形成EFS副本。",
      "C": "DataSync先到S3再Lambda转EFS引入额外组件。",
      "D": "选择了最适合的DataSync直接定时同步机制，但端点名称写错，必须修正。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/datasync/latest/userguide/choose-service-endpoint.html",
        "title": "Choosing a service endpoint for DataSync",
        "supports": "私有数据路径使用DataSync VPC service endpoint。"
      },
      {
        "url": "https://docs.aws.amazon.com/datasync/latest/userguide/create-efs-location.html",
        "title": "Configuring DataSync transfers with EFS",
        "supports": "DataSync通过VPC网络接口挂载EFS文件系统目标。"
      }
    ],
    "audit_caveat": "D英文写成“interface VPC endpoint for Amazon EFS”，这是错误：EFS PrivateLink端点是管理API，不承载NFS数据。应改为DataSync服务端点；按字面四项均不完整，D仅为可修复的出题意图。",
    "audit_status": "ambiguous"
  },
  "332": {
    "blocker": "一家公司最近将 Web 应用程式从on-premises 资料中心迁移到AWS 云端。 Web 应用程式基础架构由路由到 Application Load Balancer (ALB) 的 Amazon CloudFront 发行版组成，并使用 Amazon Elastic Container Service (Amazon ECS) 来处理请求。最近的安全审计显示，可以使用 CloudFront 和 ALB 端点存取该 Web 应用程式。但是，该公司要求 Web 应用程式必须只能透过使用 CloudFront 端点进行存取。哪种解决方案能够以最少的努力满足此要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：AWS托管前缀列表自动跟踪CloudFront回源地址，最少管理。"
    ],
    "solutions": "正确答案为 B。把ALB安全组来源限制到AWS维护的CloudFront origin-facing前缀列表，可免维护动态IP清单并阻止普通客户端直接访问ALB。",
    "result_flow": "前缀列表允许所有CloudFront分发的回源IP，不单独识别本公司分发；若要求只能来自指定分发，应再配秘密回源标头/ALB规则或适用的VPC origin。",
    "options": {
      "A": "CloudFront分发不能关联普通EC2安全组。",
      "B": "AWS托管前缀列表自动跟踪CloudFront回源地址，最少管理。",
      "C": "ELB接口端点用于管理API，不把ALB数据面接入CloudFront。",
      "D": "手动维护ip-ranges比托管前缀列表工作多且易过期。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/restrict-access-to-load-balancer.html",
        "title": "Restrict access to Application Load Balancers",
        "supports": "可用CloudFront托管前缀列表限制ALB网络来源；文档还建议自定义秘密标头。"
      }
    ],
    "audit_caveat": "前缀列表允许所有CloudFront分发的回源IP，不单独识别本公司分发；若要求只能来自指定分发，应再配秘密回源标头/ALB规则或适用的VPC origin。",
    "audit_status": "confirmed"
  },
  "333": {
    "blocker": "一家公司使用 Application Load Balancer (ALB) 和托管在 Amazon ECS 集群中的 Docker 应用程式托管社群论坛网站。 MySQL 的站点资料储存在 Amazon RDS 中，容器镜像储存在 ECR 中。该公司需要为其客户提供RTO不超过24小时和RPO不超过8小时的灾难复原SLA。下列哪一个解决方案是满足要求的最具成本效益的方法？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：预存构建物和异地快照，恢复时创建资源，符合成本最低。"
    ],
    "solutions": "正确答案为 B。RTO24小时、RPO8小时允许备份恢复：预复制镜像和每8小时数据库快照，灾难时再用CloudFormation创建计算和恢复数据库，平时只付备份存储成本。",
    "result_flow": "实际RPO应把快照间隔加复制延迟一起计算；每8小时触发不自动保证最新可用异地恢复点永远小于8小时，需留余量并演练。",
    "options": {
      "A": "同时运行两套完整资源成本高且复制/快照逻辑冗余。",
      "B": "预存构建物和异地快照，恢复时创建资源，符合成本最低。",
      "C": "预建完整第二套集群仍有闲置费用。",
      "D": "Pilot light与常驻数据库副本提供更快恢复但比备份恢复昂贵。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/aws-backup/latest/devguide/cross-region-backup.html",
        "title": "Creating backup copies across Regions",
        "supports": "AWS Backup可按计划复制恢复点到灾备区域。"
      }
    ],
    "audit_caveat": "实际RPO应把快照间隔加复制延迟一起计算；每8小时触发不自动保证最新可用异地恢复点永远小于8小时，需留余量并演练。",
    "audit_status": "confirmed"
  },
  "334": {
    "blocker": "一家公司正在将其基础设施迁移到AWS云端。公司必须遵守针对不同项目的各种监管标准。公司需要一个多帐户环境。解决方案架构师需要准备基线基础架构。此解决方案必须提供一致的管理和安全基线，但它必须允许灵活地满足各种AWS帐户内的不同合规性要求。此解决方案还需要与现有的 on-premises Active Directory 联合身份验证服务 (AD FS) 伺服器整合。哪种解决方案能够以最少的营运开销满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：托管登陆区+可定制OU控制+Identity Center联邦是完整治理方案。"
    ],
    "solutions": "正确答案为 B。Control Tower建立组织登陆区和日志/审计基线，用OU分组应用不同控制，再经Identity Center接入AD FS，减少手动搭建治理/跨账户单点登录。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "单一OU/SCP无法灵活区分项目合规，自建日志/Config更多工作。",
      "B": "托管登陆区+可定制OU控制+Identity Center联邦是完整治理方案。",
      "C": "手工构建可实现，但操作维护比Control Tower多。",
      "D": "仅IAM IdP需要自行在多账户管理角色和联邦，不如Identity Center集中。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/controltower/latest/userguide/sso-guidance.html",
        "title": "IAM Identity Center guidance",
        "supports": "Control Tower可使用Identity Center并连接外部身份提供者。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "335": {
    "blocker": "一本线上杂志将于本月推出最新一期。该版本将是第一个在全球发行的版本。该杂志的动态网站目前在 Web 层前面使用一个 Application Load Balancer，一组用于 Web 和应用程式伺服器的 Amazon EC2 实例，以及 Amazon Aurora MySQL。网站的部分内容包含静态内容，几乎所有流量都是唯读的。该杂志预计新版推出后网路流量将大幅增加。最佳性能是发布后一周的首要任务。解决方案架构师应采取哪些步骤组合来减少全球受众的系统回应时间？ （选两个。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：全局Aurora复制加区域应用栈让动态读取更靠近用户。",
      "E：DNS延迟路由/边缘缓存/自动伸缩处理全球访问及高峰。"
    ],
    "solutions": "正确答案为 D、E。将应用与只读数据靠近全球用户：Aurora Global Database跨区域物理复制、S3复制静态资源；Route53延迟路由加CloudFront及ASG同时提升访问距离、缓存和突发容量。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "S3不能直接代替动态Web服务器，逻辑复制也非全局库优化路径。",
      "B": "Direct Connect不优化普通互联网读者访问，且缺少内容缓存。",
      "C": "换RDS MySQL和私有子网不提升全球读性能。",
      "D": "全局Aurora复制加区域应用栈让动态读取更靠近用户。",
      "E": "DNS延迟路由/边缘缓存/自动伸缩处理全球访问及高峰。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database.html",
        "title": "Amazon Aurora Global Database",
        "supports": "跨区域存储级复制及本地只读副本降低全球读访问延迟。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "336": {
    "blocker": "一家线上游戏公司需要优化 AWS 上的工作负载成本。该公司使用专用帐户来托管其线上游戏应用程式和分析应用程式的生产环境。 Amazon EC2 实例托管游戏应用程序，并且必须始终可用。 EC2 实例全年运行。分析应用程式使用储存在Amazon S3中的资料。分析应用程式可以毫无问题地中断和恢复。哪一种解决方案能够最具成本效益地满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：分别匹配稳定负载承诺折扣与可中断Spot。"
    ],
    "solutions": "正确答案为 B。全年常驻且不能中断的游戏实例用EC2 Instance Savings Plan降低稳定用量费用，可中断恢复的分析任务用Spot获取剩余容量折扣。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "分析可容忍中断，使用On-Demand比Spot贵。",
      "B": "分别匹配稳定负载承诺折扣与可中断Spot。",
      "C": "游戏必须持续可用，不能全靠可被回收的Spot；Service Catalog不提供折扣。",
      "D": "游戏On-Demand没有利用全年稳定用量的承诺折扣，Service Catalog也不折价。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/savingsplans/latest/userguide/sp-ris.html",
        "title": "Savings Plans and Reserved Instances",
        "supports": "EC2 Instance Savings Plans以承诺用量换取特定区域实例族的折扣。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "337": {
    "blocker": "一家公司在数百个生产 AWS 帐户中运行应用程式。该公司使用 AWS Organizations ​​并启用所有功能，并使用 AWS Backup 进行集中备份作业。该公司担心勒索软体攻击。为了解决这个问题，该公司制定了一项新政策，即所有备份都必须能够抵御任何生产帐户中特权用户凭证的泄露。哪种步骤组合可以满足这项新要求？ （选择三项。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：跨账户保管使生产管理员不能直接控制灾备副本。",
      "B：组织SCP可阻止成员账户管理员执行危险备份修改。",
      "C：Vault Lock合规模式宽限期后连root也不能提前删除恢复点。"
    ],
    "solutions": "参考选择为 A、B、C。按选项的语义，最直接的三层保护是跨账户隔离备份、组织SCP禁止危险修改、Vault Lock合规模式锁定保留期。冷层存储不能防恶意删除，最小权限有益但不能单独抵御已泄露的高权限管理员。",
    "result_flow": "原题选项标签损坏为A/B/C/C/D/E；须先按位置修成A/B/C/D/E/F。当前ACD会误选冷层。建议人工复核ABC与ACD（修标签后的最小权限方案）的歧义，优先保留可抵御管理员的SCP。",
    "options": {
      "A": "跨账户保管使生产管理员不能直接控制灾备副本。",
      "B": "组织SCP可阻止成员账户管理员执行危险备份修改。",
      "C": "Vault Lock合规模式宽限期后连root也不能提前删除恢复点。",
      "D": "第二个C实际应标D：服务角色最小权限是好实践，但管理员权限泄露仍可绕过，不是本题三项最直接控制。",
      "E": "实际第5项应标E：冷层是成本/保留层级，不等于不可变。",
      "F": "实际第6项应标F：AWS Backup并非把所有服务备份都写到用户S3桶，S3 Object Lock不能统一覆盖。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/aws-backup/latest/devguide/vault-lock.html",
        "title": "AWS Backup Vault Lock",
        "supports": "合规锁宽限期后不可被客户或root删除/修改，恢复点保留至生命周期结束。"
      }
    ],
    "audit_caveat": "原题选项标签损坏为A/B/C/C/D/E；须先按位置修成A/B/C/D/E/F。当前ACD会误选冷层。建议人工复核ABC与ACD（修标签后的最小权限方案）的歧义，优先保留可抵御管理员的SCP。",
    "audit_status": "ambiguous"
  },
  "338": {
    "blocker": "一家公司需要将其 AWS 帐户中的 Amazon CloudWatch 日志聚合到一个中央日志帐户中。收集的日志必须保留在创建时的AWSRegion中。然后，中央日志记录帐户将处理日志，将日志标准化为标准输出格式，并将输出日志串流传输到安全工具以进行更多处理。解决方案架构师必须设计一个能够处理需要摄取的大量日志记录资料的解决方案。正常工作时间之外发生的日志记录比正常工作时间内发生的日志记录少。日志记录解决方案必须根据预期负载进行扩充。解决方案架构师决定使用AWS Control Tower设计来处理多帐户日志记录流程。解决方案架构师应该采取哪些步骤组合来满足要求？ （选择三项。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：Kinesis流适合大批量实时日志及弹性消费。",
      "C：正确授权Logs把记录发到接收账户的destination/stream。",
      "E：中央Lambda在集中账户转换并输出，符合需求。"
    ],
    "solutions": "正确答案为 A、C、E。各区域设置集中日志账户的Kinesis流和CloudWatch Logs destination/IAM授权，成员账户日志组订阅转发，中央Lambda归一化后送安全工具；每个区域保留本区处理资源。",
    "result_flow": "跨账户订阅应指向CloudWatch Logs destination ARN，不直接使用stream ARN；Kinesis/Lambda应和来源日志同区以满足数据驻留。",
    "options": {
      "A": "Kinesis流适合大批量实时日志及弹性消费。",
      "B": "SQS不是CloudWatch Logs原生订阅目标。",
      "C": "正确授权Logs把记录发到接收账户的destination/stream。",
      "D": "SQS订阅目标与“单个过滤器所有日志组”的描述不符合该机制。",
      "E": "中央Lambda在集中账户转换并输出，符合需求。",
      "F": "在成员账户处理与要求集中处理不一致。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CrossAccountSubscriptions-Kinesis-Account.html",
        "title": "Cross-account subscriptions using Kinesis",
        "supports": "接收账户创建含Kinesis stream/IAM role/access policy的destination；发送账户订阅destination ARN。"
      }
    ],
    "audit_caveat": "跨账户订阅应指向CloudWatch Logs destination ARN，不直接使用stream ARN；Kinesis/Lambda应和来源日志同区以满足数据驻留。",
    "audit_status": "confirmed"
  },
  "339": {
    "blocker": "一家公司正在将遗留应用程式从on-premises资料中心迁移到AWS。该应用程式由单一应用程式伺服器和 Microsoft SQL Server 资料库伺服器组成。每台伺服器都部署在VMware VM 上，该 VM 跨多个附加磁碟区消耗 500 TB 的资料。该公司已建立从最近的 AWS Region 到其 on-premises 资料中心的 10 Gbps AWS Direct Connect 连接。 Direct Connect 连线目前未被其他服务使用。解决方案架构师应采取哪种步骤组合来以最短的停机时间迁移应用程式？ （选两个。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：历史SMS可复制VM卷；当前服务已停止，不能新部署。",
      "D：历史SMS连续复制应用VM，比静态导入停机少。"
    ],
    "solutions": "参考选择为 A、D。按历史题意，应用与数据库VM都用SMS连续增量复制，利用现有10Gbps专线传输大量卷数据，最终切换时只同步尾部变更以缩短停机。",
    "result_flow": "这是过时选项题，A/D仅表示原题历史意图。现在应使用Application Migration Service持续块复制，并针对SQL Server一致性/切换单独设计；不可把SMS作为现行可操作答案。",
    "options": {
      "A": "历史SMS可复制VM卷；当前服务已停止，不能新部署。",
      "B": "VM Import/Export是离线导入，没有持续同步，停机长。",
      "C": "Snowball运输及静态镜像不能持续追赶源库变化。",
      "D": "历史SMS连续复制应用VM，比静态导入停机少。",
      "E": "DMS迁数据库可用，但需确认500TB及SQL特性/RDS兼容；并不能单独迁移整台应用VM。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/general/latest/gr/full_shutdown_services.html",
        "title": "Services in Full Shutdown",
        "supports": "AWS Server Migration Service已于2023-04-01完全停止。"
      }
    ],
    "audit_caveat": "这是过时选项题，A/D仅表示原题历史意图。现在应使用Application Migration Service持续块复制，并针对SQL Server一致性/切换单独设计；不可把SMS作为现行可操作答案。",
    "audit_status": "ambiguous"
  },
  "340": {
    "blocker": "一家公司在本地运营一组伺服器，并在其位于 AWS Organizations 的组织中运营一组 Amazon EC2 实例。该公司的AWS帐户包含数百个VPC。该公司希望将其 AWS 帐户连接到其 on-premises 网路。 AWS Site-to-Site VPN 已与单一 AWS 帐户建立连线。该公司希望控制哪些VPC可以与其他VPC进行通讯。\n哪一种步骤组合能够以最少的操作工作量实现这种等级的控制？ （选择三项。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：TGW可跨账户通过RAM共享。",
      "B：VPC/VPN均以附件接入集中网关。",
      "C：分离路由表关联和传播实现互通/隔离。"
    ],
    "solutions": "正确答案为 A、B、C。用RAM共享中央TGW，所有VPC及VPN建立附件，再按TGW路由表关联/传播控制不同VPC的互通范围，避免数百VPC的全网对等管理。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "TGW可跨账户通过RAM共享。",
      "B": "VPC/VPN均以附件接入集中网关。",
      "C": "分离路由表关联和传播实现互通/隔离。",
      "D": "大量VPC对等不支持经中心VPC传递路由，维护规模大。",
      "E": "VPC与VPN不是以此方式直接建附件，应分别挂到TGW。",
      "F": "VPC侧路由必要但仅修改这些表不能替代中央TGW路由隔离控制。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/vpc/latest/tgw/tgw-transit-gateways.html",
        "title": "Transit gateways in AWS Transit Gateway",
        "supports": "TGW经RAM跨账户共享，连接VPC/VPN并按附件关联的路由表决定下一跳。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "341": {
    "blocker": "一家公司需要优化在AWS上的应用成本。该应用程式使用 AWS Lambda 函数和在 AWS Fargate 上运行的 Amazon Elastic Container Service (Amazon ECS) 容器。该应用程式是写入密集型的，并将资料储存在 Amazon Aurora MySQL 资料库中。应用程式的负载不一致。应用程式会经历长时间未使用，然后流量突然显著增加和减少。资料库在无法处理负载的记忆体优化资料库执行个体上运行。解决方案架构师必须设计一个可以扩展以处理流量变化的解决方案。哪一种解决方案能够最具成本效益地满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：Serverless适合弹性容量；Compute计划可覆盖Fargate和Lambda，但应只承诺实际基线。"
    ],
    "solutions": "参考选择为 D。题目历史意图是用可暂停并自动扩容的Aurora Serverless处理长时间闲置与突发写，Compute Savings Plans覆盖Lambda及Fargate的稳定基线。读副本不能解决写瓶颈。",
    "result_flow": "D明确写v1，当前已不可作为新部署方案，应标过时历史题。现行方案采用支持自动暂停/零ACU的适配版本Aurora Serverless v2；不可宣称v1仍可新建。",
    "options": {
      "A": "读副本不扩展写吞吐，EC2 Instance Savings Plans也不覆盖Fargate/Lambda。",
      "B": "普通Aurora集群不是任意多writer，EC2 Instance计划不适用于此计算层。",
      "C": "Global Database不扩展单区域主库写能力，预留固定容量不适合长时闲置。",
      "D": "Serverless适合弹性容量；Compute计划可覆盖Fargate和Lambda，但应只承诺实际基线。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/WhatsNew.html",
        "title": "Amazon Aurora document history",
        "supports": "Aurora Serverless v1已于2025-03-31结束生命周期，2025-01-08停止新建。"
      }
    ],
    "audit_caveat": "D明确写v1，当前已不可作为新部署方案，应标过时历史题。现行方案采用支持自动暂停/零ACU的适配版本Aurora Serverless v2；不可宣称v1仍可新建。",
    "audit_status": "ambiguous"
  },
  "342": {
    "blocker": "一家公司将应用程式迁移到AWS云端。该应用程式在 Application Load Balancer (ALB) 后面的两个 Amazon EC2 实例上运行。应用程式资料储存在 MySQL 资料库中，该资料库在附加 EC2 实例上运行。应用程式对资料库的使用是大量读取的。应用程式从附加到每个 EC2 实例的 Amazon 弹性块储存 (Amazon EBS) 磁碟区载入静态内容。静态内容更新频繁，必须复制到每个EBS卷。应用程式的负载全天都在变化。在高峰时段，应用程式无法处理所有传入请求。追踪资料显示资料库无法处理高峰时段的读取负载。哪种解决方案将提高应用程式的可靠性？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：共享EFS加可伸缩ECS服务和Aurora reader覆盖全部问题。"
    ],
    "solutions": "正确答案为 D。Fargate服务按负载伸缩，所有任务共享EFS避免静态文件副本不一致，Aurora Serverless v2读实例分担读流量，分别解决计算、共享文件和数据库读瓶颈。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "Lambda不能把普通EBS卷按此方式共享挂载。",
      "B": "Step Functions不是ALB可直接转发的应用目标，也不作为文件处理Web容器。",
      "C": "ECS各任务共享单EBS卷的设计不适用；任务的EBS卷不是EFS式共享目录。",
      "D": "共享EFS加可伸缩ECS服务和Aurora reader覆盖全部问题。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/efs-volumes.html",
        "title": "Use Amazon EFS volumes with ECS",
        "supports": "EFS可为容器任务提供持久、共享文件系统并支持Fargate。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "343": {
    "blocker": "解决方案架构师希望确保只有具有适当权限的 AWS 使用者或角色才能存取新的 Amazon API Gateway 端点。解决方案架构师希望获得每个请求的端到端视图，以分析请求的延迟并建立服务映射。解决方案架构师如何设计API Gateway存取控制并执行请求检查？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：IAM签名授权与X-Ray正好对应访问控制和分布式追踪两个要求。"
    ],
    "solutions": "正确答案为 A。AWS_IAM方法授权结合execute-api:Invoke权限及SigV4签名认证AWS主体；X-Ray提供整条请求及下游服务的时延追踪和服务图。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "IAM签名授权与X-Ray正好对应访问控制和分布式追踪两个要求。",
      "B": "CORS只是浏览器跨域策略，不是身份权限控制，普通CloudWatch日志也非完整分布式服务图。",
      "C": "不应把访问密钥明文交给自定义authorizer验证，IAM原生签名更合适。",
      "D": "API Gateway客户端证书是后端连接认证机制之一，不替代IAM用户角色授权。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/en_en/apigateway/latest/developerguide/apigateway-xray.html",
        "title": "Trace requests to REST APIs using X-Ray",
        "supports": "X-Ray服务图可查看整条请求及集成下游服务延迟。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "344": {
    "blocker": "一家公司正在使用 AWS CodePipeline 作为向 Amazon EC2 Auto Scaling 组申请的 CI/CD。所有AWS资源均在AWS CloudFormation模板中定义。应用程式工件储存在Amazon S3储存桶中，并使用实例使用者资料脚本部署到Auto Scaling群组。随著应用程式变得更加复杂，CloudFormation 模板中最近的资源变更导致了计划外停机。解决方案架构师应如何改进CI/CD管道以减少模板更改导致停机的可能性？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：自动测试+变更预览+蓝绿回滚覆盖关键风险。"
    ],
    "solutions": "正确答案为 B。在测试环境自动构建测试，变更集预览资源替换影响，再以CodeDeploy蓝绿部署验证新版本并可回切，减少模板变更直接冲击生产。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "只告警和人工测试不足以预防资源变更导致停机。",
      "B": "自动测试+变更预览+蓝绿回滚覆盖关键风险。",
      "C": "语法验证不能识别运行时兼容性和所有替换后果。",
      "D": "蓝绿有帮助，但手工登录验证缺少持续自动测试和变更集评估。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/continuous-delivery-codepipeline-basic-walkthrough.html",
        "title": "Pipeline for test and production stacks",
        "supports": "官方流水线在测试后创建并执行变更集，控制生产更新。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "345": {
    "blocker": "一家总部位于东海岸的北美公司正在部署一个在 us-east-1 Region 的 Amazon EC2 上运行的新 Web 应用程式。应用程式应动态扩展以满足用户需求并保持弹性。此外，应用程式必须具有采用 us-west-1 Region 主动-被动配置的灾难复原功能。在 us-east-1 Region 中建立 VPC 后，解决方案架构师应采取哪些步骤？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：各区域独立资源栈+DNS failover符合主动被动。"
    ],
    "solutions": "正确答案为 B。每区域独立多AZ ALB和ASG，区域间用Route53主备记录配健康检查完成主动被动灾备；单个ALB/ASG不能跨Region。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "同一ASG不能横跨两个区域VPC。",
      "B": "各区域独立资源栈+DNS failover符合主动被动。",
      "C": "单ALB不能跨区域VPC。",
      "D": "两个普通区域记录加健康检查没有明确主备选择策略，不能保证主动被动。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover-types.html",
        "title": "Types of Route53 DNS failover",
        "supports": "主动被动故障转移使用主/次记录及健康状态选择可用目标。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "346": {
    "blocker": "一家公司有一个在多个 NET Framework 元件上运行的遗留应用程式。这些元件共用相同的 Microsoft SQL Server 资料库，并使用 Microsoft 讯息伫列 (MSMQ) 相互非同步通讯。该公司正在开始迁移到容器化 .NET Core 元件，并希望重构应用程式以在 AWS 上运行。 .NET Core 元件需要复杂的编排。公司必须完全控制网路和主机配置。应用程式的资料库模型是强相关的。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：ECS EC2保留主机控制，SQS异步解耦，Aurora关系型存储。"
    ],
    "solutions": "正确答案为 D。明确要求控制宿主机和网络，应采用ECS EC2模式；SQS替代异步队列，Aurora MySQL提供关系型模型。现有SQL Server迁移到MySQL仍需模式/SQL兼容改造。",
    "result_flow": "D是给定选项中匹配控制需求的方案，不代表SQL Server到Aurora MySQL可无改造迁移。",
    "options": {
      "A": "App Runner不提供所要求的宿主机完整配置控制。",
      "B": "Fargate不提供宿主机控制且DynamoDB不是强关系模型。",
      "C": "Beanstalk不能像ECS EC2一样直接满足这里复杂容器编排及宿主机控制。",
      "D": "ECS EC2保留主机控制，SQS异步解耦，Aurora关系型存储。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/launch_types.html",
        "title": "Amazon ECS launch types",
        "supports": "EC2启动类型由用户管理实例；Fargate抽象底层基础设施。"
      }
    ],
    "audit_caveat": "D是给定选项中匹配控制需求的方案，不代表SQL Server到Aurora MySQL可无改造迁移。",
    "audit_status": "confirmed"
  },
  "347": {
    "blocker": "解决方案架构师在单一 Availability Zone 的置放群组中启动了多个 Amazon EC2 实例。由于系统上有额外负载，解决方案架构师尝试将新执行个体新增至置放群组。然而，解决方案架构师收到容量不足的错误。解决方案架构师应该如何解决这个问题？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：官方明确建议停启全部组内实例后重试。"
    ],
    "solutions": "正确答案为 B。停止再启动集群置放组全部实例可让AWS把实例重新放到有足够连续容量的硬件上，然后重试扩容，这是官方容量错误建议。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "Spread每AZ最多7实例而非最少8，且改变放置语义。",
      "B": "官方明确建议停启全部组内实例后重试。",
      "C": "置放组不能合并。",
      "D": "Dedicated Host不是解决现有集群置放容量不足的直接方法。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/placement-strategies.html",
        "title": "Placement strategies",
        "supports": "已有运行实例的placement group新增遇容量错误时，停止并启动所有实例后重试。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "348": {
    "blocker": "一家公司使用基础设施即程式码 (IaC) 来配置一组两个 Amazon EC2 实例。这些实例多年来一直保持不变。过去几个月，该公司的业务成长迅速。对此，公司营运团队实施了Auto Scaling组来管理突然增加的流量。公司政策要求每月在所有正在运行的作业系统上安装安全性更新。最新的安全性更新需要重新启动。结果，Auto Scaling 群组终止了这些实例，并用新的、未打补丁的实例取代它们。解决方案架构师应该建议采取哪些步骤组合来避免再次出现此问题？ （选两个。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：按题意应是OldestLaunchConfiguration终止策略，使旧配置实例先替换。",
      "D：自动制作已修补AMI并刷新实例从源头解决反复启动旧镜像。"
    ],
    "solutions": "正确答案为 A、D。核心是把补丁固化进新AMI并更新启动模板/配置，再滚动刷新ASG；优先替换旧启动配置实例使新实例不会继续从未打补丁镜像启动。",
    "result_flow": "A英文“Update policy”名称不准确，应区分ASG终止策略OldestLaunchConfiguration与CloudFormation UpdatePolicy；D是必要核心。实际现行部署优先启动模板而非已弃用的launch configuration。",
    "options": {
      "A": "按题意应是OldestLaunchConfiguration终止策略，使旧配置实例先替换。",
      "B": "双ASG中手工打补丁不改变以后启动的未修补AMI。",
      "C": "负载均衡健康检查不能修复基础AMI。",
      "D": "自动制作已修补AMI并刷新实例从源头解决反复启动旧镜像。",
      "E": "终止保护不能阻止ASG所有健康替换情况，也不更新基础镜像。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/autoscaling/ec2/userguide/instance-refresh-overview.html",
        "title": "How an instance refresh works",
        "supports": "更新启动模板AMI后启动instance refresh可用新配置滚动替换实例。"
      }
    ],
    "audit_caveat": "A英文“Update policy”名称不准确，应区分ASG终止策略OldestLaunchConfiguration与CloudFormation UpdatePolicy；D是必要核心。实际现行部署优先启动模板而非已弃用的launch configuration。",
    "audit_status": "confirmed"
  },
  "349": {
    "blocker": "资料科学家团队正在使用 Amazon SageMaker 实例和 SageMaker API 来训练机器学习 (ML) 模型。 SageMaker 实例部署在无法存取网际网路或从网际网路存取的VPC 中。 ML 模型训练的资料集储存在Amazon S3 储存桶中。介面 VPC 端点提供对 Amazon S3 和 SageMaker API 的存取。有时，资料科学家需要存取 Python 套件索引 (PyPI) 储存库来更新他们在工作流程中使用的 Python 套件。解决方案架构师必须提供对 PyPI 储存库的访问，同时确保SageMaker 执行个体与网际网路保持隔离。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：CodeArtifact提供包仓库外部连接和VPC端点。"
    ],
    "solutions": "正确答案为 D。CodeArtifact连接public:pypi上游并缓存依赖，私有SageMaker通过CodeArtifact接口端点取包，无需实例直接连互联网。",
    "result_flow": "实际需要CodeArtifact API与repositories端点、S3网关端点和相应DNS/权限，不是仅建一个端点就完成所有包下载。",
    "options": {
      "A": "CodeCommit是Git源码库，不提供PyPI依赖代理/仓库协议。",
      "B": "NAT使实例可访问互联网，不满足隔离要求，NACL也不能按域名PyPI过滤。",
      "C": "NAT实例同样引入互联网路径且额外运维。",
      "D": "CodeArtifact提供包仓库外部连接和VPC端点。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/codeartifact/latest/ug/vpc-endpoints.html",
        "title": "Working with Amazon VPC endpoints",
        "supports": "CodeArtifact可使用接口VPC端点进行私有服务访问。"
      }
    ],
    "audit_caveat": "实际需要CodeArtifact API与repositories端点、S3网关端点和相应DNS/权限，不是仅建一个端点就完成所有包下载。",
    "audit_status": "confirmed"
  },
  "350": {
    "blocker": "解决方案架构师为具有严格灾难复原要求的政府机构工作。所有Amazon弹性块储存（AmazonEBS）快照都需要保存在至少两个额外的AWSRegions中。该机构还需要保持尽可能低的营运费用。哪种解决方案满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：DLM可配置多个跨区复制目标，覆盖额外两区。"
    ],
    "solutions": "正确答案为 A。DLM原生快照生命周期策略可定时创建并复制到多个区域，配置后持续执行，运维少于自建Lambda。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "DLM可配置多个跨区复制目标，覆盖额外两区。",
      "B": "Lambda自行调度复制、追踪失败和保留管理增加维护。",
      "C": "EBS快照不可通过用户S3桶的CRR复制。",
      "D": "Image Builder用于构建镜像，非管理所有EBS卷快照的最小开销方案。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/powershell/v4/reference/items/New-DLMLifecyclePolicy.html",
        "title": "New-DLMLifecyclePolicy",
        "supports": "DLM默认策略的CrossRegionCopyTargets可指定最多3个目标区域。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "351": {
    "blocker": "一家公司有一个专案正在启动大于所需的 Amazon EC2 实例。由于政策限制，该专案的帐户不能属于 AWS Organizations ​​公司组织的一部分，以将此活动保留在公司 IT 之外。该公司希望仅允许开发人员在专案帐户中启动 t3.small EC2 执行个体。这些 EC2 实例必须限制在 us-east-2 Region。解决方案架构师应该怎么做才能满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：开发者实际使用的角色/组IAM策略可限制创建请求。"
    ],
    "solutions": "正确答案为 D。账户明确不能加入Organizations，只能以账户内IAM权限限制开发者；对RunInstances按实例类型和Region设置条件，仅允许us-east-2的t3.small。",
    "result_flow": "确保没有其他宽泛Allow绕过限制，实际可使用显式Deny或权限边界统一约束。",
    "options": {
      "A": "加入组织违反明确政策，标签也不强制启动限制。",
      "B": "独立账户无法挂组织SCP。",
      "C": "预留实例是计费折扣，不限制开发者启动其他型号/区域。",
      "D": "开发者实际使用的角色/组IAM策略可限制创建请求。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-policies-ec2-console.html",
        "title": "Example policies to control EC2 console access",
        "supports": "官方示例按特定实例类型、子网和Region限制RunInstances。"
      }
    ],
    "audit_caveat": "确保没有其他宽泛Allow绕过限制，实际可使用显式Deny或权限边界统一约束。",
    "audit_status": "confirmed"
  },
  "352": {
    "blocker": "一家科技公司需要处理来自Amazon S3储存桶的文字和图像资料。这些数据是在深空任务的即时、时间关键阶段从多个雷达站收集的。雷达站将资料上传至来源S3储存桶。资料以雷达站识别号为前缀。该公司在第二个帐户中创建了目标 S3 储存桶。必须将资料从来源 S3 储存桶复制到目标 S3 储存桶才能满足合规性目标。此复制透过使用 S3 复制规则来覆写来源 S3 储存桶中的所有物件来进行。一个特定的雷达站被认为拥有最准确的数据。必须监控该雷达站的资料复制是否在雷达站将物件上传到来源S3储存桶后30分钟内完成。解决方案架构师应该怎么做才能满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：按前缀隔离复制规则，RTC及复制指标提供所需可视化。"
    ],
    "solutions": "正确答案为 D。给精确雷达前缀单独设置复制规则及RTC，按规则监测ReplicationLatency并以CloudWatch告警对接EventBridge通知，能独立观察关键数据复制延迟。",
    "result_flow": "RTC本身阈值为15分钟；30分钟告警应在CloudWatch配置相应阈值再由EventBridge消费告警状态，不能说EventBridge直接监测指标。",
    "options": {
      "A": "DataSync处于TRANSFERRING不代表具体对象已在30分钟内完成。",
      "B": "不必新建桶即可按前缀区分，且无RTC/明确指标链路。",
      "C": "Transfer Acceleration改善上传，不监测桶间复制，TotalRequestLatency不是复制延迟。",
      "D": "按前缀隔离复制规则，RTC及复制指标提供所需可视化。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/repl-metrics.html",
        "title": "Using S3 Replication metrics",
        "supports": "ReplicationLatency表示规则目标落后源的最大秒数，RTC自动启用指标。"
      }
    ],
    "audit_caveat": "RTC本身阈值为15分钟；30分钟告警应在CloudWatch配置相应阈值再由EventBridge消费告警状态，不能说EventBridge直接监测指标。",
    "audit_status": "confirmed"
  },
  "353": {
    "blocker": "某公司希望将其on-premises资料中心迁移到AWS云端。其中包括数千个虚拟化 Linux 和 Microsoft Windows 伺服器、SAN 储存、带有 MySQL 的 Java 和 PHP 应用程式以及 Oracle 资料库。有许多依赖服务托管在同一资料中心或外部。技术文档不完整且过时。解决方案架构师需要了解目前环境并估算迁移后的云端资源成本。解决方案架构师应该使用哪些工具或服务来规划云端迁移？ （选择三项。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：发现服务器配置/利用率/依赖，支持容量成本估算。",
      "D：CART识别采用云的组织准备度与差距。",
      "F：Migration Hub汇总发现资产并分组成应用/迁移波次。"
    ],
    "solutions": "正确答案为 A、D、F。Discovery Service收集服务器利用率和网络依赖，Migration Hub集中分组和跟踪迁移，CART评估组织云采用准备度；这三项支持迁移规划而非执行搬迁或漏洞扫描。",
    "result_flow": "CART不直接测量服务器成本，应与Discovery采集数据和成本估算工具配合；迁移评估产品名称/新客户可用性应按当前AWS公告核对。",
    "options": {
      "A": "发现服务器配置/利用率/依赖，支持容量成本估算。",
      "B": "SMS执行迁移而非评估，现已停止。",
      "C": "X-Ray追踪已插桩应用请求，不是全数据中心资产发现。",
      "D": "CART识别采用云的组织准备度与差距。",
      "E": "Inspector检查漏洞，不完成迁移资源依赖盘点。",
      "F": "Migration Hub汇总发现资产并分组成应用/迁移波次。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/application-discovery/latest/userguide/what-is-appdiscovery.html",
        "title": "What is AWS Application Discovery Service",
        "supports": "发现服务器性能数据可输入成本模型，连接数据用于识别依赖和分组迁移。"
      }
    ],
    "audit_caveat": "CART不直接测量服务器成本，应与Discovery采集数据和成本估算工具配合；迁移评估产品名称/新客户可用性应按当前AWS公告核对。",
    "audit_status": "confirmed"
  },
  "354": {
    "blocker": "解决方案架构师正在应用程式启动前审查其弹性。该应用程式在部署在 VPC 的私有子网路中的 Amazon EC2 实例上运行。 EC2 实例由最小容量为 1、最大容量为 1 的 Auto Scaling 群组配置。应用程式将资料储存在 MySQL 资料库实例的 Amazon RDS 上。 VPC 在三个Availability Zones 中配置了子网，并配置了单一NAT 网关。解决方案架构师需要推荐一个解决方案，以确保应用程式能够跨多个Availability Zones运行。哪种解决方案可以满足这个要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：三层都消除单AZ依赖。"
    ],
    "solutions": "正确答案为 A。应用实例、数据库和出站网络都需跨AZ：ASG在三AZ保持3实例，RDS开启Multi-AZ，每AZ各自NAT并使用本AZ路由。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "三层都消除单AZ依赖。",
      "B": "虚拟私有网关用于VPN，不提供NAT互联网出口。",
      "C": "NAT实例单点且无必要改数据库引擎。",
      "D": "ASG仍只有1实例，备份也不能代替Multi-AZ数据库高可用。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/vpc/latest/userguide/nat-gateway-basics.html",
        "title": "NAT gateway basics",
        "supports": "每AZ建立NAT并路由到同AZ网关可避免共享单NAT所在AZ故障。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "355": {
    "blocker": "一家公司计划将其 on-premises 事务处理应用程式迁移到 AWS。该应用程式在 Docker 容器内运行，这些容器托管在公司资料中心的虚拟机器上。 Docker 容器具有应用程式记录事务资料的共用储存。交易对时间敏感。应用程式内的交易量是不可预测的。公司必须实施低延迟储存解决方案，该解决方案将自动扩展吞吐量以满足不断增长的需求。该公司无法进一步开发该应用程序，也无法继续管理Docker托管环境。公司应该如何将应用程式迁移到AWS来满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：Fargate免宿主机维护，EFS可同时挂到多个任务。"
    ],
    "solutions": "正确答案为 B。应用已容器化且不能再管理主机，Fargate接管容器基础设施；EFS提供多任务共享POSIX文件系统及弹性吞吐，保持应用文件接口。",
    "result_flow": "EFS应选择适合时敏交易文件的General Purpose性能及Elastic吞吐，并按需求验证延迟；不能将EFS说成最低单次IO延迟的块存储。",
    "options": {
      "A": "S3对象API不是直接共享文件系统，需改应用。",
      "B": "Fargate免宿主机维护，EFS可同时挂到多个任务。",
      "C": "Fargate支持EBS的现行能力不等于同一EBS能共享挂到所有任务。",
      "D": "继续管理EC2/Docker违反不再管理托管环境的要求。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/efs-volumes.html",
        "title": "Use Amazon EFS volumes with ECS",
        "supports": "Fargate支持EFS共享持久存储。"
      }
    ],
    "audit_caveat": "EFS应选择适合时敏交易文件的General Purpose性能及Elastic吞吐，并按需求验证延迟；不能将EFS说成最低单次IO延迟的块存储。",
    "audit_status": "confirmed"
  },
  "356": {
    "blocker": "一家公司正计划迁移到AWS云端。该公司在 Windows 伺服器和 Linux 伺服器上托管许多应用程式。有些伺服器是实体伺服器，有些伺服器是虚拟伺服器。该公司在其 on-premises 环境中使用多种类型的资料库。该公司没有其 on-premises 伺服器和应用程式的准确清单。该公司希望在迁移过程中调整其资源规模。解决方案架构师需要获取有关网路连接和应用程式关系的资讯。解决方案架构师必须评估公司目前的环境并制定迁移计划。哪种解决方案将为解决方案架构师提供制定迁移计划所需的资讯？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：Agent覆盖物理/虚拟机，应用采集器补充迁移策略分析。"
    ],
    "solutions": "正确答案为 B。物理及虚拟服务器混合且缺少清单，需要Discovery Agent采集系统和网络关系，再由Strategy Recommendations采集应用信息并生成迁移策略建议。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "Migration Evaluator成本报告不等于完整应用网络依赖分析，Agentless也不覆盖所有物理主机。",
      "B": "Agent覆盖物理/虚拟机，应用采集器补充迁移策略分析。",
      "C": "Agentless Collector为VMware虚拟设备，不是逐台安装在所有服务器；MGN不负责应用分组分析。",
      "D": "未知资产的手工导入不能自动发现准确网络依赖。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/migrationhub-strategy/latest/userguide/getting-started-prerequisites.html",
        "title": "Prerequisites for Strategy Recommendations",
        "supports": "Discovery Agent捕获系统信息及网络连接，Strategy数据采集器用于应用/数据库分析。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "357": {
    "blocker": "一家金融服务公司向大型跨国银行出售其用于应用程式合规性的软体即服务 (SaaS) 平台。 SaaS 平台在 AWS 上运行，并使用在 AWS Organizations ​​的组织中管理的多个 AWS 帐户。 SaaS 平台在全球使用许多AWS 资源。为了遵守法规，对 AWS 资源的所有 API 呼叫都必须经过审核、追踪更改，并储存在持久且安全的资料储存中。哪种解决方案能够以最少的营运开销满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：组织trail覆盖所有成员并自动适配新增账户，集中存储保护日志。"
    ],
    "solutions": "正确答案为 C。在管理账户创建多区域组织跟踪，把全部成员账户日志集中到启用版本控制和加密的S3桶，MFA Delete进一步保护版本永久删除，免逐账户维护。",
    "result_flow": "必须明确启用multi-Region以及所需data events；默认管理事件不等于每一种数据平面API都记录。",
    "options": {
      "A": "普通跨区域trail不自动涵盖组织所有账户。",
      "B": "每成员单独建trail和桶运维多。",
      "C": "组织trail覆盖所有成员并自动适配新增账户，集中存储保护日志。",
      "D": "通知外部系统不能代替组织级覆盖，仍未覆盖所有成员。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/awscloudtrail/latest/userguide/creating-trail-organization.html",
        "title": "Creating a trail for an organization",
        "supports": "组织trail记录管理与所有成员账户，成员不能修改/删除组织trail。"
      }
    ],
    "audit_caveat": "必须明确启用multi-Region以及所需data events；默认管理事件不等于每一种数据平面API都记录。",
    "audit_status": "confirmed"
  },
  "358": {
    "blocker": "一家公司正在一组 Amazon EC2 实例上部署分散式记忆体资料库。 eet 由一个主节点和八个工作节点组成。主节点负责监控集群健康状况、接受使用者请求、将使用者请求分发到工作节点以及将聚合回应传送回客户端。工作节点相互通讯以复制资料分区。该公司需要尽可能低的网路延迟才能达到最佳效能。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：内存优化+Cluster同时对应内存容量与低时延通信。"
    ],
    "solutions": "正确答案为 C。内存数据库选内存优化实例；cluster placement group把实例放在同AZ相近硬件，以最低网络时延和高吞吐支持节点间复制/聚合。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "Partition适合隔离硬件故障，不追求最短节点时延。",
      "B": "计算优化不匹配内存数据库，Partition不优先低时延。",
      "C": "内存优化+Cluster同时对应内存容量与低时延通信。",
      "D": "Spread分散硬件且每AZ数量限制，不适合此9节点低延迟集群。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/placement-strategies.html",
        "title": "Placement strategies",
        "supports": "Cluster在单AZ靠近放置实例，为节点间低延迟高吞吐设计。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "359": {
    "blocker": "一家公司在虚拟机器上托管的约 100 万个 .csv 档案中维护本地资讯。数据最初大小为 10 TB，并以每周 1 TB 的速度成长。该公司需要将资料自动备份到AWS云。 Backups 资料必须每天出现。该公司需要一种解决方案，应用自订过滤器来仅备份位于指定来源目录中的资料子集。公司已建立AWS Direct Connect连线。哪种解决方案能够以最少的营运开销满足备份要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：DataSync内建过滤/计划和增量传输，最少运维。"
    ],
    "solutions": "正确答案为 C。DataSync代理读取本地目录，任务包含/排除过滤器按日增量复制到S3，利用现有DX无需离线设备或自写枚举上传程序。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "CopyObject只能在S3对象之间复制，不能直接从本地文件系统上传。",
      "B": "AWS Backup不能直接对任意本地CSV目录按此方式过滤复制到S3。",
      "C": "DataSync内建过滤/计划和增量传输，最少运维。",
      "D": "已有专线且仅10TB，Snowball增加物流步骤，无需先离线传输。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DataSync.html",
        "title": "AWS DataSync API reference",
        "supports": "DataSync任务支持include/exclude过滤和计划执行。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "360": {
    "blocker": "一家金融服务公司拥有一款资产管理产品，全世界数以千计的客户都在使用。客户透过调查提供有关产品的回馈。该公司正在建立一个在Amazon EMR上运行的新分析解决方案，以分析这些调查的数据。以下使用者角色需要存取分析解决方案以执行不同的操作： • 管理员：根据分析团队的要求为分析团队配置EMR 集群 • 资料工程师：执行 ETL 脚本来处理、转换和丰富资料集 • 资料分析师：对资料执行 SQL 和 Hive 查询 解决方案架构师必须确保所有使用者角色仅对他们需要的资源具有最低存取权限。使用者角色必须能够仅启动经过批准和授权的应用程式。该解决方案还必须确保对使用者角色创建的所有资源进行标记。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：原生服务目录结合产品与约束/标签支持所需治理。"
    ],
    "solutions": "正确答案为 C。Service Catalog把获批EMR配置封装为产品，用组合/访问权限和启动约束落实角色权限、版本/配置范围，并用TagOptions控制标签。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "IAM加事后Config无法保证只能启动获批应用且创建时标签完整。",
      "B": "Kerberos做身份认证，不管理所有获批配置和资源标签。",
      "C": "原生服务目录结合产品与约束/标签支持所需治理。",
      "D": "EMR资源策略不能替代角色/产品权限，事后告警不能预防不合规创建。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/servicecatalog/latest/adminguide/tagoptions-launching.html",
        "title": "Launching a Product with TagOptions",
        "supports": "Service Catalog在产品启动时应用组合和产品TagOptions。"
      },
      {
        "url": "https://docs.aws.amazon.com/servicecatalog/latest/adminguide/constraints-launch.html",
        "title": "AWS Service Catalog Launch Constraints",
        "supports": "启动约束指定角色，以所授予权限部署已批准产品。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "361": {
    "blocker": "一家软体即服务 (SaaS) 公司使用 AWS 托管由 AWS PrivateLink 提供支援的服务。该服务由专有软体组成，该软体在 Network Load Balancer (NLB) 后面的三个 Amazon EC2 实例上运行。这些实例位于 eu-west-2 Region 中多个 Availability Zones 的私有子网中。该公司的所有客户均位于 eu-west-2。然而，该公司现在在 us-east-1 Region 获得了一个新客户。该公司在 us-east-1 中创建了新的 VPC 和新子网。公司在两个 Regions 中的 VPC 之间建立Region VPC 间对等互连。公司希望让新客户能够存取 SaaS 服务，但公司不希望立即在 us-east-1 中部署新的 EC2 资源。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：NLB的IP目标可指向可路由的异地区域私有IP，服务和NLB保持同区。"
    ],
    "solutions": "正确答案为 B。在us-east-1部署NLB，用IP目标组指向经跨区VPC对等可达的欧洲EC2私有IP，再发布该区PrivateLink服务；无需在美国立即新增应用EC2。",
    "result_flow": "现行PrivateLink支持原生跨区域访问，可在eu-west-2已有服务启用us-east-1消费者区域，可能比新建NLB更直接；但A写的是反向异区绑定NLB，仍不成立。",
    "options": {
      "A": "跨区域PrivateLink是消费者端点访问提供者所在区的服务，不是把us-east-1 endpoint service绑定到eu-west-2 NLB。",
      "B": "NLB的IP目标可指向可路由的异地区域私有IP，服务和NLB保持同区。",
      "C": "NLB的ALB类型目标要求ALB和NLB同VPC，不能跨区域。",
      "D": "RAM不能把普通EC2实例这样共享后注册到异区instance-type目标组。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/vpc/latest/privatelink/create-endpoint-service.html",
        "title": "Create a service powered by PrivateLink",
        "supports": "端点服务基于所在区域负载均衡器；跨区域访问需在提供者服务启用支持区域。"
      }
    ],
    "audit_caveat": "现行PrivateLink支持原生跨区域访问，可在eu-west-2已有服务启用us-east-1消费者区域，可能比新建NLB更直接；但A写的是反向异区绑定NLB，仍不成立。",
    "audit_status": "confirmed"
  },
  "362": {
    "blocker": "公司需要监控两个 AWS Regions 中越来越多的 Amazon S3 储存桶。该公司还需要追踪在 Amazon S3 中加密的物件的百分比。该公司需要一个仪表板来为内部合规团队显示这些资讯。哪种解决方案能够以最少的营运开销满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：默认板提供现成全账户指标并可按Region/桶下钻。"
    ],
    "solutions": "正确答案为 C。Storage Lens默认账户仪表板已聚合全账户及跨Region存储/对象/加密指标，每日更新，合规团队直接访问无需另建分析链路。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "按区域分别建板再QuickSight聚合多余。",
      "B": "自建列举加密状态扫描大量对象开销大。",
      "C": "默认板提供现成全账户指标并可按Region/桶下钻。",
      "D": "事件只覆盖新对象且需自行维护状态/仪表盘。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage_lens_view_metrics_dashboard.html",
        "title": "Viewing S3 Storage Lens metrics",
        "supports": "默认仪表板预配置全账户汇总，可按Region/桶下钻。"
      },
      {
        "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage_lens_metrics_glossary.html",
        "title": "Storage Lens metrics glossary",
        "supports": "免费数据保护指标包括加密对象/字节的数量和比例。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "363": {
    "blocker": "一家公司的 CISO 已要求解决方案架构师重新设计该公司当前的 CI/CD 实践，以确保在发现漏洞时尽快对其应用程式进行修补部署，同时将停机时间降至最低。公司还必须能够在发生错误时快速回滚变更。 Web 应用程式部署在 Application Load Balancer 后面的一组 Amazon EC2 实例中。该公司目前使用 GitHub 托管应用程式原始码，并配置了AWS CodeBuild 专案来建立应用程式。该公司还打算使用 AWS CodePipeline 使用现有的 CodeBuild 专案触发来自 GitHub 提交的建置。什么CI/CD配置满足所有要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：蓝绿隔离新旧环境，CodeDeploy支持回滚部署。"
    ],
    "solutions": "正确答案为 B。CodePipeline触发CodeBuild后让CodeDeploy把新版本部署到独立绿色EC2环境，验证再切ALB流量，有问题可回切旧环境，实现低停机与快速回滚。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "原地更新影响当前实例，另推代码修复不是快速回滚。",
      "B": "蓝绿隔离新旧环境，CodeDeploy支持回滚部署。",
      "C": "仅创建测试/生产栈未明确低停机流量切换和快速回滚。",
      "D": "OpsWorks原地部署同样影响生产，且是过时服务路径。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-groups.html",
        "title": "Working with deployment groups",
        "supports": "EC2蓝绿部署从原始实例集切换负载均衡流量到替代实例集，可配置回滚。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "364": {
    "blocker": "某公司透过 AWS Organizations ​​中的组织管理多个 AWS 帐户。公司不同业务部门在Amazon EC2实例上运行应用程式。所有 EC2 实例都必须具有 BusinessUnit 标签，以便公司可以追踪每个业务部门的成本。最近的审计显示，某些实例缺少此标签。该公司手动将遗失的标签新增至实例。解决方案架构师应该做什么来强制执行未来的标记要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：Null=true代表请求中缺少标签，挂根可涵盖各成员OU。"
    ],
    "solutions": "正确答案为 C。组织根SCP对RunInstances的实例资源检查aws:RequestTag/BusinessUnit是否缺失，为true就拒绝，预防成员账户创建未标记EC2。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "普通标签策略约束已有标签值，不能阻止完全不带标签资源。",
      "B": "附管理账户既不覆盖成员，SCP也不约束管理账户。",
      "C": "Null=true代表请求中缺少标签，挂根可涵盖各成员OU。",
      "D": "Null=false反而拒绝带标签请求，且SCP不作用管理账户。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_tag-policies-enforcement.html",
        "title": "Enforce tagging consistency",
        "supports": "强制创建时必需标签需SCP；标签策略基本规则不约束完全未标记资源。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "365": {
    "blocker": "一家公司正在运行由数千个 Amazon EC2 实例组成的工作负载。此工作负载在包含多个公共子网和私有子网的VPC中运作。公有子网路有一条从 0.0.0.0/0 到现有 Internet 闸道的路由。私有子网路有一条从 0.0.0.0/0 到现有 NAT 闸道的路由。解决方案架构师需要迁移整个EC2实例以使用IPv6。私有子网路中的 EC2 实例不得从公用 Internet 存取。解决方案架构师应该怎么做才能满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：egress-only IGW专为IPv6状态化仅出站访问。"
    ],
    "solutions": "正确答案为 C。为VPC/子网分配IPv6 CIDR，私有子网的::/0指向egress-only internet gateway，允许出站及返回流量，阻止互联网主动发起连接。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "普通IGW支持IPv6入站，不符合私网仅出站要求。",
      "B": "NAT gateway不是IPv6到IPv6的仅出站网关。",
      "C": "egress-only IGW专为IPv6状态化仅出站访问。",
      "D": "NAT64可转换IPv6到IPv4，并非启用一个IPv6 NAT来代替egress-only gateway。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/vpc/latest/userguide/egress-only-internet-gateway.html",
        "title": "Enable outbound IPv6 using egress-only IGW",
        "supports": "提供IPv6出站通信并防止互联网主动与VPC实例建立连接。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "366": {
    "blocker": "一家公司正在使用 Amazon API Gateway 部署私人 REST API，该 API 将提供对敏感资料的存取。该 API 必须只能从部署在 VPC 中的应用程式存取。该公司成功部署了 API。但是，无法从部署在 VPC 中的 Amazon EC2 实例存取该 API。哪一种解决方案将提供 EC2 实例和 API 之间的连接？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：端点、DNS和两侧策略共同提供允许的调用路径。"
    ],
    "solutions": "正确答案为 B。私有REST API数据面通过execute-api接口端点访问；端点策略允许execute-api:Invoke，私有DNS解析API名到端点，API资源策略允许指定vpce。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "apigateway:*是管理平面，不授权execute-api调用；且禁私有DNS需额外Host/API标识。",
      "B": "端点、DNS和两侧策略共同提供允许的调用路径。",
      "C": "VPC Link解决API到私有后端的方向，不解决EC2客户端到私有API。",
      "D": "ALB VPC Link同样是后端集成，不能替代私有API端点。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-private-api-create.html",
        "title": "Create a private API",
        "supports": "需execute-api VPC端点、private DNS和API资源策略允许来源。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "367": {
    "blocker": "一家大型薪资公司最近与一家小型固定公司合并。 uni ed公司现在拥有多个业务部门，每个部门都有自己现有的AWS帐户。解决方案架构师必须确保公司能够集中管理所有AWS帐户的计费和存取策略。解决方案架构师透过从集中管理帐户向公司的所有成员帐户发送邀请来配置AWS Organizations。解决方案架构师接下来该做什么来满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：官方明确建议邀请账户手动创建该角色并授权管理账户。"
    ],
    "solutions": "正确答案为 C。邀请加入的既有账户不会自动创建OrganizationAccountAccessRole，需在每个成员账户手动建角色并信任管理账户，使管理者可跨账户管理。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "不存在所述自动关联IAM组的机制。",
      "B": "仅建policy不建立跨账户可扮演身份。",
      "C": "官方明确建议邀请账户手动创建该角色并授权管理账户。",
      "D": "角色应在被管理的成员账户，反方向建管理角色不提供成员管理权限。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_accounts_create-cross-account-role.html",
        "title": "Creating OrganizationAccountAccessRole for an invited account",
        "supports": "邀请账户不自动获得该角色，须手动创建并信任管理账户。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "368": {
    "blocker": "某公司的应用程式服务已容器化并部署在多个具有公用 IP 的Amazon EC2 实例上。 Apache Kafka 集群已部署到 EC2 实例。 PostgreSQL 资料库已迁移到 Amazon RDS。该公司预计，当新版本的agship产品发布时，其平台上的订单将大幅增加。目前架构的哪些变化将减少营运开销并支援产品发布？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：托管EKS+Fargate及MSK保留容器/Kafka生态，消除大量主机管理。"
    ],
    "solutions": "正确答案为 D。Fargate托管EKS Pod基础计算，MSK替代自管Kafka，数据库读副本分担读取，S3+CloudFront分发静态内容，整体减少运维并提升高峰容量。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "保留自管EC2且从Kafka改Kinesis需更多应用变化。",
      "B": "同样保留EC2且数据库Multi-AZ不直接增加读取容量。",
      "C": "在EC2自建Kubernetes仍需维护控制面/节点。",
      "D": "托管EKS+Fargate及MSK保留容器/Kafka生态，消除大量主机管理。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/eks/latest/userguide/fargate.html",
        "title": "AWS Fargate on Amazon EKS",
        "supports": "Fargate使Pod运行无需用户配置或管理底层EC2服务器。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "369": {
    "blocker": "一家公司在 on-premises 资料中心托管VPN。员工目前连接到 VPN 来存取其 Windows 主目录中的档案。最近，远距工作的员工数量大幅增加。因此，在工作时间内连接到资料中心的频宽使用率已开始达到 100%。公司必须在 AWS 上设计一个解决方案，以支援公司远端员工的成长，减少连接资料中心的频宽使用量，并减少营运开销。哪种步骤组合能够以最少的营运开销满足这些要求？ （选两个。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：FSx Windows支持Windows文件共享/AD集成。",
      "D：Client VPN将远程用户直接接入AWS私网，减少机房VPN瓶颈。"
    ],
    "solutions": "正确答案为 B、D。把Windows主目录迁到FSx Windows托管SMB服务，用户通过AWS Client VPN直接进入AWS访问文件，避免所有远程文件流量绕回本地数据中心。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "Volume Gateway仍需本地文件服务器且用户流量仍入机房。",
      "B": "FSx Windows支持Windows文件共享/AD集成。",
      "C": "Lustre面向Linux高性能计算，不是Windows用户主目录的SMB服务。",
      "D": "Client VPN将远程用户直接接入AWS私网，减少机房VPN瓶颈。",
      "E": "仅增加DX连接不会让远程用户不经本地VPN，且运维/专线成本更高。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/fsx/latest/WindowsGuide/supported-fsx-clients.html",
        "title": "Accessing FSx Windows data",
        "supports": "FSx Windows通过网络私有连接供Windows/SMB客户端访问。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "370": {
    "blocker": "某公司有多个AWS帐户。该公司最近进行了一次安全审计，发现许多未加密的 Amazon 弹性块存储 (Amazon EBS) 卷附加到 Amazon EC2 实例。解决方案架构师必须对未加密的磁碟区进行加密，并确保将来能够自动侦测到未加密的磁碟区。此外，该公司希望有一个解决方案能够集中管理多个AWS帐户，并专注于合规性和安全性。解决方案架构师应该采取哪些步骤组合来满足这些要求？ （选两个。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：强烈建议的控制明确包含侦测已附加EBS卷是否加密，满足持续合规。",
      "C：快照→新加密卷→替换是支持的加密迁移方法。"
    ],
    "solutions": "正确答案为 A、C。既有EBS卷不能原地加密，应创建快照并从快照创建加密卷后替换；未来检测应启用Control Tower强烈建议的EBS加密侦测控制，不是仅mandatory控制。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "强烈建议的控制明确包含侦测已附加EBS卷是否加密，满足持续合规。",
      "B": "EBS不能通过脚本对现有卷原地开启加密。",
      "C": "快照→新加密卷→替换是支持的加密迁移方法。",
      "D": "mandatory控制不包含这里需要的EBS encryption侦测，单独不足。",
      "E": "CloudTrail/EventBridge只能触发检测/自动化，不能直接原地加密卷。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/controltower/latest/controlreference/strongly-recommended-detective-controls.html",
        "title": "Strongly recommended detective controls",
        "supports": "Detect Whether Encryption is Enabled for Amazon EBS Volumes Attached to EC2是strongly recommended。"
      },
      {
        "url": "https://docs.aws.amazon.com/en_en/ebs/latest/userguide/encryption-by-default.html",
        "title": "EBS encryption by default",
        "supports": "默认加密不影响既有卷，既有资源需创建加密副本。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "corrected"
  },
  "371": {
    "blocker": "一家公司在 Application Load Balancer (ALB) 后面的 Amazon EC2 实例上托管一个 Intranet Web 应用程式。目前，用户根据内部用户资料库向应用程式进行身份验证。该公司需要使用 Microsoft Active Directory 目录的现有 AWS Directory Service 对应用程式的使用者进行身份验证。目录中拥有帐户的所有使用者都必须有权存取该应用程式。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：Cognito联合身份加ALB认证是给定选项的正确集成链路。"
    ],
    "solutions": "正确答案为 B。ALB原生authenticate-cognito动作可将用户引向Cognito，Cognito再通过与目录集成的SAML/OIDC身份提供者认证，应用获得已验证用户声明。",
    "result_flow": "Managed Microsoft AD不直接提供SAML元数据，需AD FS或其他与目录连接的联合IdP；“metadata from directory”是题目简写，不能教成目录可直接联邦。",
    "options": {
      "A": "Managed Microsoft AD本身不是直接提供这些OIDC端点的IdP，不能直接创建此app client。",
      "B": "Cognito联合身份加ALB认证是给定选项的正确集成链路。",
      "C": "IAM的SAML角色授权不等于ALB OIDC用户认证。",
      "D": "Identity Center与目录的此描述不建立Cognito user pool/app client，ALB动作配置不完整。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/elasticloadbalancing/latest/application/listener-authenticate-users.html",
        "title": "Authenticate users using an ALB",
        "supports": "ALB支持Cognito用户池及OIDC，Cognito可联合SAML等社会/企业IdP。"
      }
    ],
    "audit_caveat": "Managed Microsoft AD不直接提供SAML元数据，需AD FS或其他与目录连接的联合IdP；“metadata from directory”是题目简写，不能教成目录可直接联邦。",
    "audit_status": "confirmed"
  },
  "372": {
    "blocker": "一家公司有一个为许多访客提供服务的网站。该公司在主 AWS Region 和灾难复原 (DR) Region 中为网站部署了后端服务。为网站部署了一个 Amazon CloudFront 发行版。该公司为主 Region 的后端服务创建了一个 Amazon Route 53 记录集，其中包含运行状况检查和故障转移路由策略。该公司将 Route 53 记录集配置为 CloudFront 分发的来源。该公司配置了另一个记录集，该记录集指向 DR Region 中的后端服务端点，作为辅助故障转移记录类型。两个记录集的 TTL 均为 60 秒。目前，故障转移需要 1 分钟以上。解决方案架构师必须设计一个能够提供最快故障转移时间的解决方案。哪种解决方案将实现这一目标？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：原生源站组按错误码/连接失败转备，可调低连接次数/超时。"
    ],
    "solutions": "正确答案为 D。CloudFront origin group对当前源站失败的请求直接转到备源，不依赖Route53 DNS缓存过期和健康检查传播，因此能获得更快切换。",
    "result_flow": "源站故障转移仅支持GET/HEAD/OPTIONS，不能推广为POST/PUT写请求也自动重试。",
    "options": {
      "A": "增加分发仍依赖DNS故障检测与缓存。",
      "B": "降低TTL不能消除健康检测及DNS多层缓存时间。",
      "C": "延迟路由不会按主备进行快速请求级回退。",
      "D": "原生源站组按错误码/连接失败转备，可调低连接次数/超时。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/high_availability_origin_failover.html",
        "title": "Optimize availability with CloudFront origin failover",
        "supports": "源站组主站失败后请求备站，连接超时/尝试次数可调。"
      }
    ],
    "audit_caveat": "源站故障转移仅支持GET/HEAD/OPTIONS，不能推广为POST/PUT写请求也自动重试。",
    "audit_status": "confirmed"
  },
  "373": {
    "blocker": "一家公司使用多个 AWS 帐户，并拥有多个 DevOps 团队在这些帐户中运行生产和非生产工作负载。该公司希望集中限制对 DevOps 团队不使用的某些 AWS 服务的存取。公司决定使用AWS Organizations，并成功邀请所有AWS帐户加入组织。他们希望允许存取目前正在使用的服务并拒绝一些特定的服务。他们还希望将多个帐户作为一个整体进行管理。解决方案架构师应采取哪些步骤组合来满足这些要求？ （选择三项。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：拒绝少数服务用deny-list，其他服务仍可按IAM授权。",
      "B：Access Advisor提供服务最近访问数据。",
      "E：OU把多个账户作为一个治理单元。"
    ],
    "solutions": "正确答案为 A、B、E。只禁止少数不使用服务应采用deny-list，利用IAM Access Advisor查看最近服务使用，再把账户按OU管理并附SCP；保留默认FullAWSAccess作为允许上限基线。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "拒绝少数服务用deny-list，其他服务仍可按IAM授权。",
      "B": "Access Advisor提供服务最近访问数据。",
      "C": "Trusted Advisor建议成本/安全等，不提供这里所需主体服务最近使用表。",
      "D": "deny-list不应移除FullAWSAccess而未提供其他允许，否则全部被隐式拒绝。",
      "E": "OU把多个账户作为一个治理单元。",
      "F": "不存在默认DenyAWSAccess SCP。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_tutorials_basic.html",
        "title": "Creating and configuring an organization",
        "supports": "deny-list策略在FullAWSAccess基线上加拒绝；仅allow-list时替换允许基线。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "corrected"
  },
  "374": {
    "blocker": "一家现场活动公司正在为其 AWS 上的门票应用程式设计扩展解决方案。该应用程式在促销活动期间的使用率很高。每个销售活动都是预定的一次性活动。该应用程式在 Auto Scaling 群组中的 Amazon EC2 实例上运行。该应用程式使用PostgreSQL作为资料库层。该公司需要一个扩展解决方案，以最大限度地提高销售活动期间的可用性。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：定时扩容+Aurora副本提升允许提前准备大writer容量。"
    ],
    "solutions": "正确答案为 D。售票事件已知且只发生一次，scheduled scaling可提前扩EC2；Aurora先建大规格副本并计划故障转移为writer，再在低峰缩回，避免活动中才改主库容量。",
    "result_flow": "故障转移仍有短暂连接中断，应在销售开始前完成并让应用具备重连能力；结束后应调整实际writer/实例，而非只缩一个不承载写的副本。",
    "options": {
      "A": "预测扩容需历史周期数据，不适合首次一次性峰值。",
      "B": "普通RDS PostgreSQL没有所述自动读副本扩展/直接计划failover到read replica的完整方案。",
      "C": "预测和普通RDS自动副本假设均不合适。",
      "D": "定时扩容+Aurora副本提升允许提前准备大writer容量。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/autoscaling/ec2/userguide/scheduled-scaling-create-scheduled-action.html",
        "title": "Create a scheduled action",
        "supports": "ASG支持指定时点的一次性计划扩容。"
      }
    ],
    "audit_caveat": "故障转移仍有短暂连接中断，应在销售开始前完成并让应用具备重连能力；结束后应调整实际writer/实例，而非只缩一个不承载写的副本。",
    "audit_status": "confirmed"
  },
  "375": {
    "blocker": "一家公司在本地运行 Intranet 应用程式。该公司希望配置应用程式的云端备份。该公司为此解决方案选择了 AWS Elastic Disaster Recovery。该公司要求复制流量不透过公共互联网传输。该应用程式也不能透过网路存取。该公司不希望该解决方案消耗所有可用的网路频宽，因为其他应用程式需要频宽。哪一种步骤组合可以满足这些要求？ （选择三项。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：私有子网无公网直接入站，NAT仅供必要出站控制访问。",
      "D：DX专线提供非公共互联网数据路径。",
      "E：private IP复制使DRS流量走既有私有路径。"
    ],
    "solutions": "参考选择为 A、D、E。私有子网隔离应用，Direct Connect建立不经公共互联网的专线路径，DRS选择private IP复制；另需配置DRS带宽限速，避免复制占满可用带宽。",
    "result_flow": "给定选项没有带宽节流设置，ADE满足网络/隔离但不能单独满足全部要求；必须补充Throttle network bandwidth。F不能代替限流。",
    "options": {
      "A": "私有子网无公网直接入站，NAT仅供必要出站控制访问。",
      "B": "公开子网及IGW不是隔离应用的最佳选择。",
      "C": "Site-to-Site VPN通常经公网传输，不符合题目明确不经公共互联网。",
      "D": "DX专线提供非公共互联网数据路径。",
      "E": "private IP复制使DRS流量走既有私有路径。",
      "F": "保留源IP不控制复制路径或带宽，且需相应CIDR规划。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/drs/latest/userguide/data-routing.html",
        "title": "Data routing and throttling",
        "supports": "DRS使用private IP需先建VPN/DX等私网，Throttle network bandwidth才控制传输速率。"
      }
    ],
    "audit_caveat": "给定选项没有带宽节流设置，ADE满足网络/隔离但不能单独满足全部要求；必须补充Throttle network bandwidth。F不能代替限流。",
    "audit_status": "ambiguous"
  },
  "376": {
    "blocker": "一家提供影像储存服务的公司希望将面向客户的解决方案部署到AWS。数百万个人客户将使用该解决方案。此解决方案将接收大量大图像文件，调整文件大小，并将文件储存在 Amazon S3 储存桶中长达 6 个月。该解决方案必须能够处理需求的显著变化。此解决方案还必须在企业规模上可靠，并且能够在发生故障时重新执行处理作业。哪一种解决方案能够最具成本效益地满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：编排保留失败状态/重跑能力并设置6个月到期，最符合完整要求。"
    ],
    "solutions": "参考选择为 A。需要失败后可重跑且最多保存6个月，Step Functions可编排Lambda并配置Retry/Catch或redrive，S3到期规则在6个月后删除。D虽有可靠SQS队列，却把数据转深度归档而非到期删除，不满足保留上限。",
    "result_flow": "A原地覆写同键若仍触发同一S3事件规则会造成循环，实际需前缀/输出桶过滤；若忽略保留上限而强调队列，D可辩护。原题选项均简写，不宜无保留宣称唯一绝对标准。",
    "options": {
      "A": "编排保留失败状态/重跑能力并设置6个月到期，最符合完整要求。",
      "B": "EventBridge+异步Lambda也能重试/配DLQ，但选项未设置重跑保留机制。",
      "C": "6个月才转IA并未到期删除，且文件处理描述不清。",
      "D": "SQS可靠处理，但6个月转Deep Archive继续保留，违反up to 6 months，频繁图片直接IA也未必最省。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/step-functions/latest/dg/redrive-executions.html",
        "title": "Restarting executions with redrive",
        "supports": "Standard Workflow支持对14天内失败/超时执行从失败步骤重跑。"
      }
    ],
    "audit_caveat": "A原地覆写同键若仍触发同一S3事件规则会造成循环，实际需前缀/输出桶过滤；若忽略保留上限而强调队列，D可辩护。原题选项均简写，不宜无保留宣称唯一绝对标准。",
    "audit_status": "ambiguous"
  },
  "377": {
    "blocker": "一家公司在 AWS Organizations ​​中有一个组织，其中包括公司每个部门的单独 AWS 帐户。不同部门的应用团队独立开发和部署解决方案。该公司希望降低计算成本并适当管理跨部门的成本。该公司还希望提高各部门计费的可见度。公司不希望在选择运算资源时失去营运弹性。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：集中账单、可分摊标签和灵活的Compute承诺折扣相匹配。"
    ],
    "solutions": "正确答案为 C。Organizations合并账单保留分账户/部门费用视图，标签进一步分摊，Tag Editor补标签；Compute Savings Plans跨实例族、区域及Fargate/Lambda保持计算选择灵活。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "仅Budgets监测预算不提供完整组织合账，EC2 Instance计划灵活性较小。",
      "B": "SCP不能主动给资源加标签，且EC2 Instance计划限制实例族/区域。",
      "C": "集中账单、可分摊标签和灵活的Compute承诺折扣相匹配。",
      "D": "SCP不会自动打标签，Budgets也不替代合并账单。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/savingsplans/latest/userguide/sp-ris.html",
        "title": "Savings Plans and Reserved Instances",
        "supports": "Compute计划跨实例族/区域且覆盖Fargate/Lambda，比EC2 Instance计划灵活。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "378": {
    "blocker": "一家公司有一个 Web 应用程序，可以将图片和影片安全地上传到 Amazon S3 储存桶。该公司要求只有经过身份验证的用户才可以发布内容。该应用程式产生一个预签名 URL，用于透过浏览器介面上传物件。大多数使用者报告大于 100 MB 的物件上传速度缓慢。解决方案架构师可以采取哪些措施来提高这些上传的效能，同时确保只允许经过验证的使用者发布内容？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：加速端点加multipart适合远程大文件，签名权限保持。"
    ],
    "solutions": "正确答案为 C。保持认证后签发短期预签名上传权限，用S3 Transfer Acceleration通过近端边缘接入AWS骨干，并将大对象分片并行上传/重试。",
    "result_flow": "分片上传需分别对UploadPart等签名并由已认证后台限制目标键/有效期；单个普通PutObject预签名URL不能直接变成整套multipart流程。",
    "options": {
      "A": "API Gateway请求负载上限不适合100MB以上文件直传。",
      "B": "Regional API同样有负载上限并增加转发瓶颈。",
      "C": "加速端点加multipart适合远程大文件，签名权限保持。",
      "D": "CloudFront/OAI配置未提供最终用户认证，不能仅凭OAI允许写就限制到已认证用户。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/transfer-acceleration-examples.html",
        "title": "Enabling and using S3 Transfer Acceleration",
        "supports": "加速上传可使用multipart，浏览器比较工具也用分片。"
      }
    ],
    "audit_caveat": "分片上传需分别对UploadPart等签名并由已认证后台限制目标键/有效期；单个普通PutObject预签名URL不能直接变成整套multipart流程。",
    "audit_status": "confirmed"
  },
  "379": {
    "blocker": "一家大公司正在将整个 IT 产品组合迁移到AWS。公司每个业务部门都有独立的AWS帐户，支援开发和测试环境。很快将需要新帐户来支援生产工作负载。财务部门需要一种集中的付款方式，但必须保持对每个组的支出的可见性以分配成本。安全团队需要一个集中机制来控制公司所有帐户中IAM的使用情况。以下选项的哪一种组合能够以最少的努力满足公司的需求？ （选两个。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：组织集中账单与账户层级是财务治理基础。",
      "D：all features启用SCP，用组织护栏限制成员权限。"
    ],
    "solutions": "正确答案为 B、D。Organizations建立统一付款与账户/OU层级，开启全部功能后以SCP统一限定成员IAM权限上限；保留每个业务账户费用明细满足分摊。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "逐账户CloudFormation自建IAM基线比集中SCP管理复杂，且易被账户管理员改掉。",
      "B": "组织集中账单与账户层级是财务治理基础。",
      "C": "仅独立账户和标签没有统一付款及组织权限控制。",
      "D": "all features启用SCP，用组织护栏限制成员权限。",
      "E": "合并为单账户削弱隔离并非最少改造，Access Advisor不是权限强制工具。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_tutorials_basic.html",
        "title": "Creating and configuring an organization",
        "supports": "Organizations管理账户邀请/创建成员，并可启用SCP策略治理OU。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "corrected"
  },
  "380": {
    "blocker": "一家公司有一个解决方案可以分析来自数千个气象站的天气数据。气象站透过具有 AWS Lambda 功能整合的 Amazon API Gateway REST API 发送资料。 Lambda函数呼叫第三方服务进行资料预处理。第三方服务过载，预处理失败，导致资料遗失。解决方案架构师必须提高解决方案的弹性。解决方案架构师必须确保不会遗失任何数据，并且在发生故障时可以稍后处理数据。解决方案架构师应该怎么做才能满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：队列吸收峰值、控制消费速率，DLQ保存反复失败的任务。"
    ],
    "solutions": "正确答案为 B。REST API先持久写SQS主队列，再异步触发Lambda调用第三方；失败消息重试，多次失败进入DLQ保留供排障和重放，避免第三方暂时过载导致丢数据。",
    "result_flow": "必须仅在第三方处理成功后确认消息，处理器幂等，并把DLQ保留期和重放流程配置妥当。",
    "options": {
      "A": "API Gateway没有此种直接对同步API配置DLQ来保留全部失败处理的机制。",
      "B": "队列吸收峰值、控制消费速率，DLQ保存反复失败的任务。",
      "C": "EventBridge失败目标与Lambda失败目标机制混杂，且未明确持久队列平滑第三方负载。",
      "D": "仅Lambda异步失败目标不能改变当前API同步调用/失效丢失路径。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/lambda/latest/dg/services-sqs-configure.html",
        "title": "Creating an SQS event source mapping",
        "supports": "SQS事件源处理多次失败可由队列redrive policy发送DLQ，给Lambda重试机会。"
      }
    ],
    "audit_caveat": "必须仅在第三方处理成功后确认消息，处理器幂等，并把DLQ保留期和重放流程配置妥当。",
    "audit_status": "confirmed"
  },
  "381": {
    "blocker": "一家公司使用三层 Web 架构在AWS 上建立了一个电子商务网站。该应用程式基于 Java，由 Amazon CloudFront 发行版、Auto Scaling 群组中的 Amazon EC2 实例组成的 Apache Web 伺服器层以及后端 Amazon Aurora 层以及后端 142⟧ 资料库组成。上个月，在促销活动期间，用户报告在将商品添加到购物车时出现错误和超时。营运团队恢复了 Web 伺服器建立的日志并审查了Aurora 资料库集群效能指标。一些 Web 伺服器在收集日志之前被终止，且 Aurora 指标不足以进行查询效能分析。解决方案架构师必须采取哪些步骤组合来提高高峰流量事件期间的应用程式效能可见度？ （选择三项。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：原生导出慢查询/错误日志以分析数据库瓶颈。",
      "B：X-Ray Java SDK可关联HTTP请求与SQL子段分析。",
      "D：实例终止前持续集中日志，无需事后抢救本地文件。"
    ],
    "solutions": "正确答案为 A、B、D。Aurora慢查询/错误日志提供SQL诊断，Java X-Ray追踪HTTP和JDBC调用定位端到端延迟，CloudWatch日志代理持续外送Apache日志，避免ASG终止实例后日志丢失。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "原生导出慢查询/错误日志以分析数据库瓶颈。",
      "B": "X-Ray Java SDK可关联HTTP请求与SQL子段分析。",
      "C": "Aurora不能按此方式直接原生流式导出到Kinesis替代CloudWatch日志。",
      "D": "实例终止前持续集中日志，无需事后抢救本地文件。",
      "E": "CloudTrail是AWS API审计，不提供应用购物车/SQL执行活动与时延。",
      "F": "不存在把Aurora性能benchmark流发布到X-Ray的此功能。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/AuroraMySQL.Integrating.CloudWatch.html",
        "title": "Publishing Aurora MySQL logs to CloudWatch",
        "supports": "Aurora支持general/slow/audit/error日志导出CloudWatch Logs。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "corrected"
  },
  "382": {
    "blocker": "为季节性劳动力提供招聘网站的公司的流量和使用量都在增加。后端服务在Application Load Balancer后面的一对Amazon EC2实例上运行，并以Amazon DynamoDB作为资料储存。旺季时应用程序读写流量较慢。哪个选项提供了可扩展的应用程式架构，以最少的开发工作来应对旺季？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：不改应用接口即可让EC2与DynamoDB容量随负载扩展。"
    ],
    "solutions": "正确答案为 C。最少开发改动是保留EC2后端，以ASG自动扩实例，DynamoDB自动调整预置读写容量，解决季节高峰两端瓶颈。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "改为Lambda需重构执行模型，开发量较大。",
      "B": "改Lambda开发多，全局表解决区域复制而非本区读写容量瓶颈。",
      "C": "不改应用接口即可让EC2与DynamoDB容量随负载扩展。",
      "D": "新增队列/写入Lambda改变写入语义，开发更多且没处理读瓶颈。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/AutoScaling.Console.html",
        "title": "Using DynamoDB auto scaling",
        "supports": "现有表可为读/写容量开启auto scaling并设置范围。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "383": {
    "blocker": "一家公司正在迁移到云端。它希望评估现有资料中心环境中虚拟机器的配置，以确保能够准确调整新的Amazon EC2实例的大小。该公司希望收集 CPU、记忆体和磁碟使用率等指标，并且需要详细了解每个执行个体上正在运行的进程。该公司还希望监控网路连接以映射伺服器之间的通讯。哪一种方式能够最经济有效地收集这些数据？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：Agent采集系统性能、进程和网络连接，正好覆盖需求。"
    ],
    "solutions": "正确答案为 A。需进程清单及服务器网络通信，逐机Discovery Agent比agentless采集提供更细粒度应用与连接数据，同时采集CPU/内存/磁盘用于选型。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "Agent采集系统性能、进程和网络连接，正好覆盖需求。",
      "B": "CloudWatch需自定义进程依赖采集和额外指标/日志成本。",
      "C": "Agentless VMware采集不能提供同等完整的逐进程网络依赖数据。",
      "D": "仅开服务加防火墙扫描不会自动收集操作系统内部进程数据。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/application-discovery/latest/userguide/what-is-appdiscovery.html",
        "title": "What is AWS Application Discovery Service",
        "supports": "Agent在本地服务器采集配置、利用率和网络连接，供迁移成本与依赖分析。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "384": {
    "blocker": "一家公司提供在 AWS 云端中运行的软体即服务 (SaaS) 应用程式。该应用程式在 Network Load Balancer (NLB) 后面的 Amazon EC2 实例上运行。这些实例位于 Auto Scaling 群组中，并分布在单一 AWS Region 中的三个 Availability Zones 中。该公司正在将该应用程式部署到其他Regions中。公司必须向客户提供应用程式的静态 IP 位址，以便客户可以将 IP 位址新增至允许清单。解决方案必须自动将客户路由到地理位置最接近他们的Region。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：标准加速器支持NLB端点和固定IP并自动按客户端位置/健康分流。"
    ],
    "solutions": "正确答案为 B。标准Global Accelerator提供固定任播IP，把客户端引向健康且位置/网络较优的区域NLB，扩区域也无需更新客户IP白名单。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "CloudFront IP范围并非专属固定少量地址，源站组也只含主备两个源。",
      "B": "标准加速器支持NLB端点和固定IP并自动按客户端位置/健康分流。",
      "C": "CloudFront无按此多源自动选择地理区域的功能，且IP地址范围会变化。",
      "D": "custom routing是把用户显式映射到EC2子网目的端口，不是NLB健康就近分流。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/global-accelerator/latest/dg/introduction-components.html",
        "title": "Global Accelerator components",
        "supports": "standard按位置、健康及权重选择最优端点，支持NLB；custom routing是确定性EC2映射。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "385": {
    "blocker": "一家公司在 AWS 云端运行多个工作负载。该公司拥有独立的软体开发部门。该公司使用AWS Organizations以及与SAML的联合来向开发人员授予管理其AWS帐户中的资源的权限。每个开发单元将其生产工作负载部署到一个公共生产帐户。最近，生产帐户中发生了一起事件，开发单位的成员终止了属于不同开发单位的EC2实例。解决方案架构师必须创建一个解决方案，以防止将来发生类似事件。该解决方案还必须允许开发人员能够管理用于其工作负载的执行个体。哪种策略可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：ABAC会话标签与资源标签比较并显式拒绝不匹配，适用共享账户。"
    ],
    "solutions": "正确答案为 B。共享生产账户内无法按OU区分业务单元。SAML传DevelopmentUnit会话标签，IAM将资源标签与PrincipalTag比较，对不匹配操作显式Deny，使开发者只能管理本组资源。",
    "result_flow": "必须防止开发者任意修改DevelopmentUnit资源标签或伪造SAML属性，否则可绕过ABAC边界。",
    "options": {
      "A": "同一个生产账户不能同时按各团队OU分别施加不同账户边界。",
      "B": "ABAC会话标签与资源标签比较并显式拒绝不匹配，适用共享账户。",
      "C": "SCP的Allow不会授予权限，默认FullAWSAccess下新增Allow也不构成排他限制。",
      "D": "STS不支持按此在SAML时任意附加新的角色IAM身份策略；会话策略也只能进一步限制。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_session-tags.html",
        "title": "Passing session tags in AWS STS",
        "supports": "STS会话标签可用于aws:PrincipalTag ABAC，支持SAML传递。"
      }
    ],
    "audit_caveat": "必须防止开发者任意修改DevelopmentUnit资源标签或伪造SAML属性，否则可绕过ABAC边界。",
    "audit_status": "confirmed"
  },
  "386": {
    "blocker": "一家企业公司正在为其用户建立基础设施服务平台。该公司有以下要求： • 在启动AWS 基础设施时向使用者提供最低权限存取权限，以便使用者无法提供未经批准的服务。 • 使用中央帐户来管理基础设施服务的建立。 • 提供将基础设施服务分发到AWS Organizations ​​中的多个帐户的能力。 • 提供在使用者启动的任何基础设施上强制执行标签的能力。使用 AWS 服务的哪一种操作组合可以满足这些要求？ （选择三项。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：中央组合分享维护一致批准产品。",
      "D：EndUserAccess加启动约束使用户无需底层服务宽权限。",
      "E：TagOptions维护并应用强制的标签选项。"
    ],
    "solutions": "正确答案为 B、D、E。中央Service Catalog产品/组合封装CloudFormation并向组织分享，终端用户仅有Service Catalog权限，通过启动角色受控部署，TagOptions在启动时要求标签。",
    "result_flow": "组织共享无需再手工import；现在可启用TagOption sharing自动传播，D的自动化复制是旧做法但给定组合中仍用于受控授权/启动约束。",
    "options": {
      "A": "S3模板访问不限制只能启动批准服务或强制标签。",
      "B": "中央组合分享维护一致批准产品。",
      "C": "直接CloudFormationFullAccess过宽，SCP只许CFN/S3还可能阻止部署底层资源。",
      "D": "EndUserAccess加启动约束使用户无需底层服务宽权限。",
      "E": "TagOptions维护并应用强制的标签选项。",
      "F": "并非所有CFN资源支持统一的Resource Tags属性，不能凭此属性全局强制。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/servicecatalog/latest/adminguide/catalogs_portfolios_sharing_how-to-share.html",
        "title": "Sharing a Portfolio",
        "supports": "组合可向Organizations分享并同步产品/约束，TagOptions可共享且启动时选择。"
      }
    ],
    "audit_caveat": "组织共享无需再手工import；现在可启用TagOption sharing自动传播，D的自动化复制是旧做法但给定组合中仍用于受控授权/启动约束。",
    "audit_status": "confirmed"
  },
  "387": {
    "blocker": "一家公司部署了一个新的 Web 应用程式。作为设定的一部分，本公司将 AWS WAF 配置为透过 Amazon Kinesis Data Firehose 登入 Amazon S3。该公司开发了一个 Amazon Athena 查询，每天运行一次，以返回过去 24 小时的 AWS WAF 日志资料。每日日志量是恒定的。然而，随著时间的推移，相同的查询将花费更多的时间来运行。解决方案架构师需要设计一个解决方案来防止查询时间持续增加。此解决方案必须最大限度地减少营运开销。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：保留既有Firehose/Athena，只改分区和查询最简单。"
    ],
    "solutions": "正确答案为 D。数据按日期/时间分区，Athena查询WHERE显式限定最近24小时分区，就不再扫描不断增长的历史日志，查询耗时/费用随每日数据而非总历史增长。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "每天合成大文件不排除历史扫描且有Lambda大小/时长限制。",
      "B": "每天新桶管理开销大，分区即可实现数据裁剪。",
      "C": "无需改为Redshift Spectrum，引入额外平台。",
      "D": "保留既有Firehose/Athena，只改分区和查询最简单。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/athena/latest/ug/partitions.html",
        "title": "Partition your data",
        "supports": "WHERE限制分区时Athena仅扫描相关分区。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "388": {
    "blocker": "一家公司正在开发一个 Web 应用程序，该应用程式在面向公众的 Application Load Balancer (ALB) 后面的 Auto Scaling 群组中的 Amazon EC2 实例上运行。仅允许来自特定国家/地区的使用者存取该应用程式。公司需要能够记录已被阻止的存取请求。此解决方案需要尽可能少的维护。哪种解决方案满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：原生地理匹配+日志满足地域限制及审计。"
    ],
    "solutions": "正确答案为 B。WAF GeoMatch使用AWS维护的IP地理位置判断，默认允许指定国家或阻止其他国家，并启用WAF日志记录阻止请求，免维护IP列表。",
    "result_flow": "需另开启WAF logging，规则本身不会自动保存全部日志；基于IP的地域判断并不能识别绕过代理/VPN后的实际人所在地。",
    "options": {
      "A": "手工维护国家IP段易过时且工作多。",
      "B": "原生地理匹配+日志满足地域限制及审计。",
      "C": "Shield主要DDoS保护，不提供此应用GeoMatch规则。",
      "D": "安全组无法按国家动态选择来源，也不提供WAF式请求日志。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/waf/latest/developerguide/waf-rule-statement-type-geo-match.html",
        "title": "Geographic match rule statement",
        "supports": "WAF geo match按请求IP推断国家并进行规则匹配。"
      }
    ],
    "audit_caveat": "需另开启WAF logging，规则本身不会自动保存全部日志；基于IP的地域判断并不能识别绕过代理/VPN后的实际人所在地。",
    "audit_status": "confirmed"
  },
  "389": {
    "blocker": "一家公司正在将应用程式从on-premises基础架构迁移到AWS云端。在迁移设计会议期间，该公司对其旧版 Windows 档案伺服器的可用性和复原选项表示担忧。文件伺服器包含敏感的关键业务数据，这些数据在数据损坏或遗失时无法重新建立。根据合规要求，资料不得透过公共网路传输。该公司希望尽可能转向AWS 托管服务。公司决定将资料储存在 Windows 档案伺服器档案系统的 Amazon FSx 中。解决方案架构师必须设计一种解决方案，将资料复制到另一个AWSRegion以实现灾难复原 (DR) 目的。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：FSx+DataSync支持私有网络跨区域文件复制。"
    ],
    "solutions": "正确答案为 C。两区域FSx Windows使用DataSync复制文件，跨区域VPC对等加DataSync私有服务端点及私有数据接口，数据沿AWS骨干不经公网。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "FSx File Gateway不是把FSx连续备份到用户S3桶的功能。",
      "B": "VPN通常走公共互联网，不满足明确限制，DataSync也无所谓VPN endpoint类型。",
      "C": "FSx+DataSync支持私有网络跨区域文件复制。",
      "D": "Transfer Family不以FSx Windows作为原生双端文件复制后端。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/datasync/latest/userguide/create-fsx-location.html",
        "title": "Configuring DataSync transfers with FSx Windows",
        "supports": "DataSync可创建FSx Windows文件位置，通过VPC网络连接数据。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "390": {
    "blocker": "一家公司目前正处于应用程式的设计阶段，该应用程式需要 RPO 少于 5 分钟，RTO 少于 10 分钟。解决方案架构团队预测该资料库将储存约 10 TB 的资料。作为设计的一部分，他们正在寻找一种资料库解决方案，该解决方案将为公司提供故障转移到辅助Region的能力。哪一种解决方案能够以最低的成本满足这些业务需求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：原生异地副本持续追赶，可提升为可写独立实例。"
    ],
    "solutions": "正确答案为 B。跨区RDS只读副本预先持续复制10TB数据，灾难时提升而不从备份重载，符合较短恢复目标且通常比自建第二套Aurora+DMS成本低。",
    "result_flow": "异步复制和提升没有无条件5/10分钟保证；需基于具体引擎、复制延迟、故障侦测和切流演练验证目标。",
    "options": {
      "A": "每5分钟10TB快照及异区复制/恢复无法保证10分钟RTO。",
      "B": "原生异地副本持续追赶，可提升为可写独立实例。",
      "C": "Aurora双集群另加DMS成本/运维高于原生RDS复制。",
      "D": "同区域副本不能覆盖区域失效。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.XRgn.html",
        "title": "Creating a read replica in a different Region",
        "supports": "RDS支持跨区域只读副本，需要故障时手动/自动化提升。"
      }
    ],
    "audit_caveat": "异步复制和提升没有无条件5/10分钟保证；需基于具体引擎、复制延迟、故障侦测和切流演练验证目标。",
    "audit_status": "confirmed"
  },
  "391": {
    "blocker": "一家金融公司需要为新的数位钱包应用程式创建一个单独的AWS帐户。公司使用AWS Organizations来管理其帐户。解决方案架构师使用管理帐户中的 IAM 使用者 Support1 建立新的成员帐户，并将 nance1@example.com 作为电子邮件地址。解决方案架构师应该如何在新会员帐户中建立 IAM 使用者？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：新建成员默认跨账户管理角色提供管理员权限。"
    ],
    "solutions": "正确答案为 B。Organizations创建新成员时自动建立OrganizationAccountAccessRole；管理账户具备sts:AssumeRole权限的Support1切换到该成员角色后即可管理IAM。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "不会通过初始邮件发送64字符root密码。",
      "B": "新建成员默认跨账户管理角色提供管理员权限。",
      "C": "成员root密码不等于管理账户root密码；未设置时需独立恢复流程。",
      "D": "IAM用户只存在于其本账户，不能直接拿同名凭证登录另一个账户。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_accounts_access.html",
        "title": "Accessing member accounts",
        "supports": "Organizations创建的成员具有OrganizationAccountAccessRole，允许从管理账户访问。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "392": {
    "blocker": "一家汽车租赁公司建立了一个无伺服器 REST API 来为其行动应用程式提供资料。该应用程式由 Amazon API Gateway API 和 Regional 端点、AWS Lambda 函数和 Amazon Aurora MySQL 无伺服器资料库集群组成。该公司最近向合作伙伴的行动应用程式开放了API。结果请求数量显著增加，导致偶发的资料库记忆体错误。对 API 流量的分析表明，客户端在短时间内对相同查询发出多个 HTTP GET 请求。流量集中在工作时间，假日和其他活动期间流量高峰。该公司需要提高支援额外使用的能力，同时最大限度地减少与解决方案相关的成本增加。哪种策略可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：阶段缓存直接消除重复GET后端调用，保留客户端接口。"
    ],
    "solutions": "参考选择为 A。重复且短时集中的GET查询适合在API Gateway阶段缓存响应，缓存命中可完全绕开Lambda与数据库，减少数据库内存压力。A同时改edge-optimized并非缓存前提，但仍是有效方案；B是另一种需修改Lambda的数据库结果缓存。",
    "result_flow": "A/B都能减负，题目没有缓存大小、查询结果复用范围或命中率，无法严格证明最低总成本；应明确API缓存对Regional也支持，edge-optimized不是必要条件。",
    "options": {
      "A": "阶段缓存直接消除重复GET后端调用，保留客户端接口。",
      "B": "Redis缓存也能减轻数据库压力，但仍执行Lambda且新增缓存集群及代码维护。",
      "C": "只增数据库上限会增加峰值成本，未消除相同查询。",
      "D": "节流丢弃/拒绝部分伙伴调用，不等于支持额外使用量。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-caching.html",
        "title": "Cache settings for REST APIs",
        "supports": "REST API阶段缓存可减少后端调用并改善响应时延，GET方法默认可缓存。"
      }
    ],
    "audit_caveat": "A/B都能减负，题目没有缓存大小、查询结果复用范围或命中率，无法严格证明最低总成本；应明确API缓存对Regional也支持，edge-optimized不是必要条件。",
    "audit_status": "ambiguous"
  },
  "393": {
    "blocker": "一家公司正在将 on-premises 应用程式和 MySQL 资料库迁移到 AWS。应用程式处理高度敏感的数据，新数据在资料库中不断更新。资料不得透过互联网传输。公司还必须对传输中和静态的资料进行加密。该资料库大小为 5 TB。该公司已在 MySQL 资料库实例的 Amazon RDS 中建立了资料库架构。该公司已建立到 AWS 的 1 Gbps AWS Direct Connect 连接。该公司还设立了公共 VIF 和私人 VIF。解决方案架构师需要设计一个解决方案，以尽可能少的停机时间将资料迁移到AWS。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：持续CDC结合私网与TLS最适合少停机迁移。"
    ],
    "solutions": "正确答案为 B。DMS在私有子网通过DX私有VIF连接源MySQL，full-load+CDC先迁基线再追写，切换时仅短暂停写；源/目标数据库TLS和KMS静态加密分别满足传输/静态保护。",
    "result_flow": "DMS接口端点是DMS管理API私有访问，不承担源库到目标库复制数据路径；数据平面依靠复制实例私有路由及数据库TLS。RDS存储也必须启用加密，不能只加密DMS复制盘。",
    "options": {
      "A": "离线备份不持续同步新数据，运输/导入会拉长停机。",
      "B": "持续CDC结合私网与TLS最适合少停机迁移。",
      "C": "只传备份没有追赶持续写入，也未直接说明正确的数据库恢复路径。",
      "D": "File Gateway复制备份仍没有数据库级CDC。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Task.CDC.html",
        "title": "Creating tasks for ongoing replication",
        "supports": "DMS全量+CDC先迁数据再持续读取数据库日志捕获变更。"
      }
    ],
    "audit_caveat": "DMS接口端点是DMS管理API私有访问，不承担源库到目标库复制数据路径；数据平面依靠复制实例私有路由及数据库TLS。RDS存储也必须启用加密，不能只加密DMS复制盘。",
    "audit_status": "confirmed"
  },
  "394": {
    "blocker": "Accompany 正在 AWS 上部署用于大数据分析的新集群。此集群将在分布于多个 Availability Zones 的许多 Linux Amazon EC2 实例上运行。集群中的所有节点都必须具有对公共底层档案储存的读写存取权限。文件储存必须具有高可用性、具有弹性、必须与便携式作业系统介面 (POSIX) 相容，并且必须适应高水准的吞吐量。哪种储存解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：EFS区域存储及Max I/O支持并行工作负载，符合历史题意，但不是当前通用首选。"
    ],
    "solutions": "参考选择为 D。共享POSIX文件存储且需跨AZ，应采用区域EFS。旧版考题以Max I/O对应大量并行节点高吞吐，但现今General Purpose配Elastic吞吐是官方优先建议。",
    "result_flow": "B/D按当前能力都能满足描述，旧题“高吞吐一定Max I/O”已不成立。若按现行最佳实践重写题目应优先B（Regional、General Purpose、Elastic throughput）。",
    "options": {
      "A": "File Gateway是S3文件接口缓存，不适合作为跨AZ大数据集群的主要低延迟POSIX共享层。",
      "B": "区域EFS General Purpose同样满足POSIX和跨AZ共享，且现今官方优先推荐。",
      "C": "EBS单卷/多挂载限定AZ且需文件系统协调，不能跨多AZ共享。",
      "D": "EFS区域存储及Max I/O支持并行工作负载，符合历史题意，但不是当前通用首选。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/en_en/efs/latest/ug/performance.html",
        "title": "Amazon EFS performance specifications",
        "supports": "Max I/O为上一代高并行模式，延迟较高且不支持Elastic吞吐；官方建议所有文件系统用General Purpose。"
      }
    ],
    "audit_caveat": "B/D按当前能力都能满足描述，旧题“高吞吐一定Max I/O”已不成立。若按现行最佳实践重写题目应优先B（Regional、General Purpose、Elastic throughput）。",
    "audit_status": "ambiguous"
  },
  "395": {
    "blocker": "一家公司在 AWS 上托管软体即服务 (SaaS) 解决方案。该解决方案有一个 Amazon API Gateway API，为 HTTPS 端点提供服务。 API 使用 AWS Lambda 函数进行计算。 Lambda 函数将资料储存在 Amazon Aurora Serverless v1 资料库中。该公司使用AWS无伺服器应用程式模型（AWSSAM）来部署此解决方案。该解决方案跨越多个Availability Zones，并且没有灾难复原 (DR) 计划。解决方案架构师必须设计一个灾难复原策略，该策略可以在另一个AWSRegion中复原解决方案。此解决方案的 RTO 为 5 分钟，RPO 为 1 分钟。解决方案架构师应该怎么做才能满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：全局库复制加预建应用栈缩短恢复路径。"
    ],
    "solutions": "正确答案为 D。一分钟RPO和五分钟RTO要求异区数据库持续复制且应用提前部署。迁为Aurora Global Database并在异区预部署API/Lambda，主备切换时不再临时创建完整应用。",
    "result_flow": "v1已停止服务，新部署应评估Provisioned或受支持Aurora Serverless v2全局库；RPO/RTO需结合检测、提升、DNS切换演练验证。",
    "options": {
      "A": "Serverless v1不支持所述异区只读副本。",
      "B": "灾难时再用SAM部署全部应用可能无法保证5分钟恢复。",
      "C": "Serverless v1不支持多writer集群，不能这样构建复制。",
      "D": "全局库复制加预建应用栈缩短恢复路径。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database.html",
        "title": "Using Aurora Global Database",
        "supports": "主区域写通过专用基础设施复制到次区域，通常小于1秒，可进行区域故障转移。"
      }
    ],
    "audit_caveat": "v1已停止服务，新部署应评估Provisioned或受支持Aurora Serverless v2全局库；RPO/RTO需结合检测、提升、DNS切换演练验证。",
    "audit_status": "confirmed"
  },
  "396": {
    "blocker": "一家公司拥有一家连锁旅行社，并在 AWS 云端中运行应用程式。公司员工使用该应用程式搜寻有关旅行目的地的资讯。目的地内容每年更新四次。两个固定的 Amazon EC2 实例为应用程式提供服务。该公司使用具有 Travel.example.com 多值记录的 Amazon Route 53 公共托管区域，该区域传回 EC2 实例的弹性 IP 位址。该应用程式使用Amazon DynamoDB作为其主要资料储存。该公司使用自托管的 Redis 实例作为快取解决方案。在内容更新期间，EC2实例和快取解决方案的负载急剧增加。负载的增加多次导致停机。解决方案架构师必须更新应用程序，以便应用程式具有高可用性，并且可以处理内容更新产生的负载。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：DAX匹配DynamoDB，ALB/ASG和scheduled scaling是有效完整链路。"
    ],
    "solutions": "正确答案为 A。DynamoDB前用托管多节点DAX替代自管缓存，EC2放入ASG由ALB路由，并在已知季度更新前计划扩容，避免固定两实例与单缓存节点的瓶颈。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "DAX匹配DynamoDB，ALB/ASG和scheduled scaling是有效完整链路。",
      "B": "CloudFront origin不能直接填Auto Scaling group，且手工扩容不如计划扩容稳妥。",
      "C": "Memcached可缓存但需更改Redis兼容实现且无复制HA，DAX更贴合现有主存。",
      "D": "同样不能把ASG直接用作CloudFront源站。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DAX.html",
        "title": "In-memory acceleration with DAX",
        "supports": "DAX为DynamoDB兼容托管缓存，最终一致读可由毫秒降至微秒。"
      },
      {
        "url": "https://docs.aws.amazon.com/autoscaling/ec2/userguide/scheduled-scaling-create-scheduled-action.html",
        "title": "Create a scheduled action",
        "supports": "可提前计划已知内容更新时间扩容。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "corrected"
  },
  "397": {
    "blocker": "公司需要储存和处理将使用自订行动应用程式从行动装置上传的影像资料。使用高峰期为平日上午 8 点至下午 5 点，每分钟上传数千次。该应用程式在其他时间很少使用。当影像处理完成时，使用者会收到通知。解决方案架构师应该采取哪种操作组合来确保影像处理可以扩展以处理负载？ （选择三项。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：S3支持SQS标准队列，可靠缓冲并发任务。",
      "C：Lambda可由SQS事件源伸缩执行图片处理。",
      "E：SNS支持移动推送通知。"
    ],
    "solutions": "正确答案为 B、C、E。移动端直接上传S3，事件进入SQS标准队列吸收工作日高峰，Lambda按队列消费图片任务，完成后SNS向移动设备推送。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "S3原生通知不直接以Amazon MQ队列为目的地。",
      "B": "S3支持SQS标准队列，可靠缓冲并发任务。",
      "C": "Lambda可由SQS事件源伸缩执行图片处理。",
      "D": "Batch Operations不按队列单消息直接自动启动图片处理且额外作业管理。",
      "E": "SNS支持移动推送通知。",
      "F": "SES发送电子邮件，不是移动推送服务。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/notification-how-to-event-types-and-destinations.html",
        "title": "S3 event notification destinations",
        "supports": "S3支持SQS/SNS/Lambda/EventBridge目的地，不包含Amazon MQ；SNS可向移动设备推送。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "corrected"
  },
  "398": {
    "blocker": "一家公司正在 AWS 上建立应用程式。应用程式将日志传送到Amazon OpenSearch Service集群进行分析。所有资料必须储存在VPC中。该公司的一些开发人员在家工作。其他开发人员在三个不同的公司办公地点工作。开发人员需要存取OpenSearch服务来直接从本地开发机器分析和视觉化日志。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：远程接入VPN面向个人客户端，配置自助门户便于分发客户端配置。"
    ],
    "solutions": "正确答案为 A。Client VPN支持来自家庭或多个办公室的单独远程客户端经TLS隧道进入VPC，直接访问私有OpenSearch而无需公开服务。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "远程接入VPN面向个人客户端，配置自助门户便于分发客户端配置。",
      "B": "Site-to-Site VPN连接网关网络，不让个人OpenVPN客户端直接连接。",
      "C": "公共VIF不连接TGW私网，且Direct Connect不适合分散家庭用户。",
      "D": "SSH堡垒/隧道需维护实例且只允许公司CIDR未覆盖家庭用户。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/vpn/latest/clientvpn-admin/what-is.html",
        "title": "What is AWS Client VPN",
        "supports": "托管客户端VPN让远程用户从任何位置访问AWS及本地私有资源。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "399": {
    "blocker": "一家公司希望将其网站从on-premises资料中心迁移到AWS。同时，希望将网站迁移到基于容器化微服务的架构，以提高可用性和成本效率。该公司的安全策略规定，必须根据最佳实践，使用最小权限来配置权限和网路权限。解决方案架构师必须创建满足安全要求的容器化架构，并将应用程式部署到Amazon ECS集群。部署后需要采取哪些步骤才能满足要求？ （选两个。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：awsvpc使任务拥有独立网络接口和安全组。",
      "E：每任务安全组和IAM角色实现网络及资源访问双重最小权限。"
    ],
    "solutions": "正确答案为 B、E。awsvpc给每个任务独立ENI和安全组实现网络最小权限，任务IAM角色按服务分配短期凭证，避免所有容器共享实例权限或注入长期密钥。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "bridge主要按宿主机网络管理，不能以任务ENI安全组精细隔离。",
      "B": "awsvpc使任务拥有独立网络接口和安全组。",
      "C": "实例角色权限会被同宿主机任务共享，粒度过粗。",
      "D": "把IAM凭证注入容器有泄露/轮换风险，应用应使用任务角色自动临时凭证。",
      "E": "每任务安全组和IAM角色实现网络及资源访问双重最小权限。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/security-network.html",
        "title": "Network security best practices for ECS",
        "supports": "任务ENI可分配独立安全组。"
      },
      {
        "url": "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-iam-roles.html",
        "title": "Amazon ECS task IAM role",
        "supports": "任务角色提供任务权限并可阻止容器访问EC2实例profile凭证。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "corrected"
  },
  "400": {
    "blocker": "一家公司正在运行一个无伺服器应用程序，该应用程式由多个 AWS Lambda 函数和 Amazon DynamoDB 表组成。该公司创建了需要 Lambda 函数来存取 Amazon Neptune 资料库集群的新功能。 Neptune 资料库集群位于 VPC 的三个子网路中。哪种可能的解决方案将允许 Lambda 函数存取 Neptune 资料库集群和 DynamoDB 表？ （选两个。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：私有子网路由NAT访问DynamoDB，VPC本地路由访问Neptune。",
      "E：私有子网Lambda加DynamoDB端点可同时访问两个私有/服务目标。"
    ],
    "solutions": "正确答案为 B、E。Lambda需接入Neptune所在VPC私网访问数据库，同时以NAT访问DynamoDB公共端点，或用DynamoDB VPC端点保持隔离私网，两种路径都可行。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "普通VPC Lambda连接公共子网不会自动获得公网IP，只有IGW不能访问DynamoDB。",
      "B": "私有子网路由NAT访问DynamoDB，VPC本地路由访问Neptune。",
      "C": "VPC外Lambda没有可固定允许的服务IP范围直接访问私有Neptune。",
      "D": "Neptune管理接口端点不是供VPC外Lambda直接访问数据库数据的公共路径。",
      "E": "私有子网Lambda加DynamoDB端点可同时访问两个私有/服务目标。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/lambda/latest/dg/configuration-vpc-internet.html",
        "title": "Internet access for VPC-connected Lambda",
        "supports": "VPC Lambda连公共子网不获得互联网；私有子网用NAT。"
      },
      {
        "url": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/network-isolation.html",
        "title": "Infrastructure security in DynamoDB",
        "supports": "VPC网关端点访问DynamoDB不需要IGW/NAT或公网IP。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "corrected"
  },
  "401": {
    "blocker": "一家公司想要为在公司资料中心运行的应用程式设计灾难复原 (DR) 解决方案。应用程式写入 SMB 档案共用并在第二个档案共用上建立副本。两个共享都位于资料中心。该应用程式使用两种类型的档案：元资料档案和图像档案。公司希望将副本存放在AWS上。该公司需要能够在灾难发生时使用 SMB 从资料中心或AWS 存取资料。资料副本很少被访问，但必须在 5 分钟内可用。",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：Standard-IA提供毫秒级对象取回，网关支持SMB并匹配低频访问。"
    ],
    "solutions": "正确答案为 D。S3 File Gateway提供SMB文件共享并缓存活跃数据，S3 Standard-IA适合少读且需立即可取的灾备副本；元数据和图像都能在需要时读取，不必等待归档还原。",
    "result_flow": "网关故障时在AWS侧挂载/重建网关及缓存准备也应演练；Standard-IA立即取回不等于整个灾备流程无条件5分钟完成。",
    "options": {
      "A": "Outposts及自建Windows服务器成本/维护多于托管网关，灾备同址也需审视。",
      "B": "FSx Multi-AZ SSD适合频繁低延迟使用，罕用灾备副本成本更高。",
      "C": "Deep Archive通常需数小时至数日还原，不满足5分钟。",
      "D": "Standard-IA提供毫秒级对象取回，网关支持SMB并匹配低频访问。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/filegateway/latest/files3/storage-classes.html",
        "title": "Using storage classes",
        "supports": "File Gateway支持S3 Standard-IA；归档对象需先还原后才能从文件共享读取。"
      }
    ],
    "audit_caveat": "网关故障时在AWS侧挂载/重建网关及缓存准备也应演练；Standard-IA立即取回不等于整个灾备流程无条件5分钟完成。",
    "audit_status": "confirmed"
  },
  "402": {
    "blocker": "一家公司正在创建一种解决方案，可以在发生意外灾难时将 400 名员工转移到远端工作环境。使用者桌面混合使用 Windows 和 Linux 作业系统。每个桌面上都安装了多种类型的软体，例如网页浏览器和邮件用户端。解决方案架构师需要实施一个可以与公司的 on-premises Active Directory 整合的解决方案，以允许员工使用他们现有的身份凭证。此解决方案必须提供多重身份验证 (MFA)，并且必须复制现有桌面的使用者体验。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：完整桌面+目录连接+RADIUS包含所有关键能力。"
    ],
    "solutions": "正确答案为 C。WorkSpaces提供完整Windows/Linux虚拟桌面，AD Connector经VPN复用本地身份，RADIUS集成为目录用户添加MFA；相比只流式应用更接近现有桌面体验。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "控制台启用MFA还必须配置RADIUS地址/共享密钥，不能只点击开启就完整工作。",
      "B": "AppStream面向应用流，且此选项未配置MFA。",
      "C": "完整桌面+目录连接+RADIUS包含所有关键能力。",
      "D": "AppStream未完整覆盖Windows/Linux完整桌面体验及目录接入设计。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/workspaces/latest/adminguide/connect-mfa.html",
        "title": "MFA AD Connector for WorkSpaces",
        "supports": "WorkSpaces经AD Connector启用MFA需指定RADIUS服务器和相关端口/共享密钥。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "403": {
    "blocker": "一家公司部署了Amazon Connect 联络中心。联络中心代理报告大量电脑产生的呼叫。该公司担心这些电话对成本和生产力的影响。该公司希望有一个解决方案，允许客服人员将通话标记为垃圾邮件，并自动阻止这些号码将来转给客服人员。满足这些要求的最高效的解决方案是什么？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：同时包含代理标记、号码持久化及未来呼叫读取判断。"
    ],
    "solutions": "正确答案为 A。CCP按钮记录代理确认的spam属性，Lambda把主叫号码写DynamoDB；入站流程先查DynamoDB命中即阻断，实现人工识别后自动拦截后续来电。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "同时包含代理标记、号码持久化及未来呼叫读取判断。",
      "B": "Contact Lens规则不能直接可靠识别所有机器电话，且不体现代理手动标记需求。",
      "C": "quick connect可低代码记录号码，但未说明未来入站流程读取名单阻断，方案不完整。",
      "D": "只看输入缺失误报高且不满足直接标记后自动阻断的完整工作流。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/connect/latest/adminguide/attribs-with-lambda.html",
        "title": "Store Lambda values as contact attributes",
        "supports": "Connect流程可调用Lambda并把返回值用作contact attributes完成路由判断。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "404": {
    "blocker": "一家公司安装了感测器来收集该公司所有工厂的环境参数信息，例如湿度和光线。公司需要即时传输和分析AWS云端中的资料。如果任何参数超出可接受的范围，工厂营运团队必须立即收到通知。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：流+Lambda+SNS完成实时判断和通知。"
    ],
    "solutions": "正确答案为 C。Kinesis Data Streams持续接收传感器事件，Lambda流消费者检查阈值，异常时SNS立即通知团队，组件原生支持低延迟实时处理。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "Firehose侧重缓冲投递，Step Functions不是其原生流消费者。",
      "B": "MSK没有直接触发Fargate task的所述简单原生消费机制，需自建消费者。",
      "C": "流+Lambda+SNS完成实时判断和通知。",
      "D": "Kinesis Data Analytics不是通常由ECS再消费分析的源流，链路描述多余。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/lambda/latest/dg/with-kinesis.html",
        "title": "Lambda Kinesis stream processing",
        "supports": "Lambda流事件映射轮询/增强扇出消费记录，支持低延迟处理。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "405": {
    "blocker": "某公司正准备为工作负载部署Amazon Elastic Kubernetes Service (Amazon EKS)集群。该公司预计该集群将支援数量不可预测的无状态 Pod。许多 Pod 将在短时间内创建，因为工作负载会自动扩展工作负载使用的副本数量。哪种解决方案将最大限度地提高节点弹性？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：AZ拓扑分散约束是官方提高工作负载容灾建议。"
    ],
    "solutions": "正确答案为 D。topology spread按AZ分散副本，突发调度时避免所有Pod集中在少数节点/单AZ，单故障域失效时仍有其他区域副本可服务。",
    "result_flow": "此措施提高Pod/应用的容灾分布，并非直接让某个节点更可靠；还需各AZ节点容量/自动扩容可用。",
    "options": {
      "A": "EKS控制平面由AWS管理，不能用自有launch template这样另部署。",
      "B": "更少更大节点扩大单节点故障影响范围。",
      "C": "故意容量不足会让Pod等待调度，降低可用性。",
      "D": "AZ拓扑分散约束是官方提高工作负载容灾建议。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/prescriptive-guidance/latest/ha-resiliency-amazon-eks-apps/spread-workloads.html",
        "title": "Spread workloads across nodes and AZs",
        "supports": "Pod topology constraints把副本分散到AZ/节点等故障域提升可用性。"
      }
    ],
    "audit_caveat": "此措施提高Pod/应用的容灾分布，并非直接让某个节点更可靠；还需各AZ节点容量/自动扩容可用。",
    "audit_status": "confirmed"
  },
  "406": {
    "blocker": "一家公司需要为 Web 应用程式实施灾难复原 (DR) 计划。该应用程式在单一 AWS Region 中运行。该应用程式使用在容器中运行的微服务。容器托管在 Amazon Elastic Container Service (Amazon ECS) 的 AWS Fargate 上。该应用程式将 MySQL 资料库实例的 Amazon RDS 作为其资料层，并使用 Amazon Route 53 进行 DNS 解析。如果应用程式遇到故障，Amazon CloudWatch 警报将呼叫 Amazon EventBridge 规则。解决方案架构师必须设计一个灾难复原解决方案，以向单独的Region提供应用程式复原。此解决方案必须最大限度地缩短从故障中恢复所需的时间。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：预建计算+持续复制数据库把恢复工作减到提升和切流。"
    ],
    "solutions": "正确答案为 C。提前部署异区ECS服务并维持RDS跨区只读副本，失败时只需提升数据库并切DNS，比故障后创建数据库/搬快照明显缩短RTO。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "故障后取快照可能源库不可用，复制恢复时间长。",
      "B": "故障后连应用也新建更慢。",
      "C": "预建计算+持续复制数据库把恢复工作减到提升和切流。",
      "D": "RDS快照不能直接转换DynamoDB全局表。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.XRgn.html",
        "title": "RDS cross-Region read replicas",
        "supports": "异区副本可在故障时提升为独立实例，需准备切换。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "407": {
    "blocker": "一家公司在 AWS Organizations ​​的组织中拥有 AWS 帐户。该公司希望将 Amazon EC2 使用情况作为指标进行追踪。如果 EC2 使用率比过去 30 天的平均 EC2 使用率高出 10% 以上，公司的架构团队必须收到每日警报。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：Budgets可按用量类型和每日周期报警。"
    ],
    "solutions": "正确答案为 A。使用用量预算而非费用异常监测，EC2 running hours日预算阈值设为近30天平均日用量的110%，达到阈值向架构团队告警。",
    "result_flow": "若要求每天滚动近30天均值，固定填一次金额不够；应启用适用的历史自动调整预算或每日计算更新。题目A仅描述一次Cost Explorer基线，属最佳意图但需补充更新机制。",
    "options": {
      "A": "Budgets可按用量类型和每日周期报警。",
      "B": "Cost Anomaly Detection针对费用模型异常，不支持该精确EC2小时30日用量规则。",
      "C": "Trusted Advisor没有此精确自定义日用量阈值告警。",
      "D": "Detective用于安全调查，不是EC2小时预算。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-create.html",
        "title": "Creating a budget",
        "supports": "Budgets支持usage budget及日/月/季度等时间周期，并能配置阈值通知。"
      },
      {
        "url": "https://docs.aws.amazon.com/cli/latest/reference/budgets/describe-budgets.html",
        "title": "describe-budgets",
        "supports": "预算支持HISTORICAL自动调整及DAILY粒度历史窗口。"
      }
    ],
    "audit_caveat": "若要求每天滚动近30天均值，固定填一次金额不够；应启用适用的历史自动调整预算或每日计算更新。题目A仅描述一次Cost Explorer基线，属最佳意图但需补充更新机制。",
    "audit_status": "confirmed"
  },
  "408": {
    "blocker": "某电商公司正在改造其IT基础设施，并计划使用AWS服务。该公司的 CIO 要求解决方案架构师设计一个简单、高度可用且松散耦合的订单处理应用程式。该应用程式负责接收和处理订单，然后将其储存在Amazon DynamoDB表中。该应用程式具有零星的流量模式，并且应该能够在行销活动期间进行扩展，以最小的延迟处理订单。下列哪一项是满足要求最可靠的方法？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：托管队列和函数具备弹性/重试，最贴近简单可靠订单处理。"
    ],
    "solutions": "正确答案为 B。SQS持久化订单并解耦接收/处理，Lambda随队列积压自动扩展并写DynamoDB，失败可重试，适合零散流量和营销高峰。",
    "result_flow": "订单处理必须幂等并配置失败DLQ；SQS标准队列至少一次交付不保证业务只执行一次。",
    "options": {
      "A": "自管EC2数据库/工作实例增加扩容和维护，耦合度高。",
      "B": "托管队列和函数具备弹性/重试，最贴近简单可靠订单处理。",
      "C": "每单启动容器编排复杂且冷启动/调度延迟更高。",
      "D": "Kinesis可做流处理但自管EC2消费者不是最简单的按需方案。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/lambda/latest/dg/services-sqs-scaling.html",
        "title": "Scaling behavior for SQS event mappings",
        "supports": "Lambda按SQS可用消息增加并发，低流量时缩减轮询并发。"
      }
    ],
    "audit_caveat": "订单处理必须幂等并配置失败DLQ；SQS标准队列至少一次交付不保证业务只执行一次。",
    "audit_status": "confirmed"
  },
  "409": {
    "blocker": "一家公司正在部署 AWS Lambda 函数来存取 PostgreSQL 资料库的 Amazon RDS。该公司需要在 QA 环境和生产环境中启动 Lambda 函数。公司不得在应用程式代码中公开凭证，并且必须自动轮换密码。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：Secrets Manager专用于机密存储和数据库自动轮换。"
    ],
    "solutions": "正确答案为 B。不同环境使用独立Secrets Manager secret存凭据，Lambda环境变量只存secret ARN，运行时按执行角色读取；Secrets Manager轮换同时更新secret和数据库密码。",
    "result_flow": "“distinct key entry”应实现为隔离的secret及访问权限；环境变量存引用而非明文secret，执行角色需限定对应环境。",
    "options": {
      "A": "Parameter Store加密值不原生自动轮换数据库密码。",
      "B": "Secrets Manager专用于机密存储和数据库自动轮换。",
      "C": "KMS保存加密密钥，不是应用数据库凭据库，轮换KMS键不轮换DB密码。",
      "D": "S3加密文件不提供数据库密码自动轮换。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotate-secrets_turn-on-for-db.html",
        "title": "Automatic rotation for database secrets",
        "supports": "Secrets Manager自动轮换更新secret及数据库，轮换函数需数据库网络访问。"
      }
    ],
    "audit_caveat": "“distinct key entry”应实现为隔离的secret及访问权限；环境变量存引用而非明文secret，执行角色需限定对应环境。",
    "audit_status": "confirmed"
  },
  "410": {
    "blocker": "一家公司正在使用 AWS Control Tower 管理 AWS Organizations ​​组织中的 AWS 帐户。该公司有一个包含帐户的OU。公司必须阻止 OU 帐户中的任何新的或现有的 Amazon EC2 执行个体取得公用 IP 位址。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：SCP作为成员账户权限上限可拒绝创建与后续关联公网地址。"
    ],
    "solutions": "正确答案为 C。OU级SCP预防创建时自动分配公网IPv4，并禁止现有实例通过AssociateAddress等操作获得公网EIP，同时限制可改变子网/网卡默认分配行为的操作。",
    "result_flow": "SCP不会自动移除已存在公网地址，需另做清理；还须考虑IPv6、ENI及其他地址获取路径。题目只要求防止新增/取得公网IP，具体策略应覆盖所有相关操作。",
    "options": {
      "A": "SSM事后执行脚本不是全账户API权限预防控制。",
      "B": "主动控制仅覆盖CloudFormation受检新资源，不能覆盖既有实例所有后续关联方式。",
      "C": "SCP作为成员账户权限上限可拒绝创建与后续关联公网地址。",
      "D": "Config事后检测修复有暴露窗口，不是禁止取得地址。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/eks/latest/userguide/auto-controls.html",
        "title": "Update organization controls for EKS Auto Mode",
        "supports": "官方SCP示例用ec2:AssociatePublicIpAddress拒绝未明确关闭公网IP的RunInstances请求。"
      }
    ],
    "audit_caveat": "SCP不会自动移除已存在公网地址，需另做清理；还须考虑IPv6、ENI及其他地址获取路径。题目只要求防止新增/取得公网IP，具体策略应覆盖所有相关操作。",
    "audit_status": "confirmed"
  },
  "411": {
    "blocker": "一家公司正在 AWS 上部署第三方 Web 应用程式。该应用程式打包为Docker图像。该公司已将 Docker 映像部署为 Amazon Elastic Container Service (Amazon ECS) 中的 AWS Fargate 服务。 Application Load Balancer (ALB) 将流量引导至应用程式。该公司只需为特定的用户清单提供从互联网访问该应用程式的能力。公司无法更改应用程序，也无法将应用程式与身分提供者整合。所有使用者都必须通过多重身份验证 (MFA) 进行身份验证。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：Cognito存指定名单并强制MFA，ALB可在应用外完成认证。"
    ],
    "solutions": "正确答案为 A。无需更改第三方应用，ALB HTTPS监听器先通过Cognito hosted UI验证指定用户，用户池强制MFA，认证完成才转发到Fargate。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "Cognito存指定名单并强制MFA，ALB可在应用外完成认证。",
      "B": "Fargate没有这种网页IAM资源策略认证，ALB也无authenticate-iam动作。",
      "C": "Identity Center不是此ALB资源保护规则的直接用户认证功能。",
      "D": "Amplify可使用Cognito但没有独立的Amplify user pool及ALB认证动作。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/elasticloadbalancing/latest/application/listener-authenticate-users.html",
        "title": "Authenticate users using an ALB",
        "supports": "ALB支持authenticate-cognito动作和托管登录界面，在转发前完成认证。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "412": {
    "blocker": "解决方案架构师正准备将新的安全工具部署到多个先前未使用的AWSRegions中。解决方案架构师将使用AWS CloudFormation堆叠集部署该工具。堆叠集的范本包含一个具有自订名称的 IAM 角色。建立堆叠集后，没有成功建立堆叠实例。解决方案架构师应该怎么做才能成功部署堆叠？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：覆盖区域启用与命名IAM确认。"
    ],
    "solutions": "正确答案为 A。使用需手动启用的区域前必须在各目标账户启用，模板内自定义名称IAM角色则需CAPABILITY_NAMED_IAM明确确认，两个前提同时满足。",
    "result_flow": "“previously unused”不自动表示所有区域均需opt-in；A适用于题意的未启用opt-in区域，已默认启用区域无需重复操作。",
    "options": {
      "A": "覆盖区域启用与命名IAM确认。",
      "B": "未使用区域不是默认堆栈配额耗尽，CAPABILITY_IAM也不足命名资源。",
      "C": "SELF_MANAGED不是问题根因，也未解决Region未启用。",
      "D": "仅管理角色ARN不启用Region，CAPABILITY_IAM不足自定义名角色。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AWSCloudFormation/latest/APIReference/API_CreateStackSet.html",
        "title": "CreateStackSet",
        "supports": "指定自定义名称IAM资源必须确认CAPABILITY_NAMED_IAM。"
      }
    ],
    "audit_caveat": "“previously unused”不自动表示所有区域均需opt-in；A适用于题意的未启用opt-in区域，已默认启用区域无需重复操作。",
    "audit_status": "confirmed"
  },
  "413": {
    "blocker": "一家公司的应用程式使用 Amazon Aurora PostgreSQL 资料库集群作为应用程式的资料库。资料库集群包含一个小型主实例和三个较大的副本实例。该应用程式在 AWS Lambda 函数上运行。应用程式与资料库的副本实例建立许多短期连接以执行唯读操作。在高流量期间，应用程式变得不可靠，并且资料库报告正在建立太多连接。高流量时段的频率是无法预测的。哪种解决方案将提高应用程式的可靠性？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：连接池化加reader endpoint直接解决短连接爆发。"
    ],
    "solutions": "正确答案为 A。RDS Proxy复用/池化大量Lambda短连接，增加只读proxy端点使查询分配到现有Aurora readers，避免把全部读连接压到较小writer。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "连接池化加reader endpoint直接解决短连接爆发。",
      "B": "单纯加连接上限会增加内存压力，cluster endpoint还导向小writer。",
      "C": "新增实例解决计算不足不如池化短连接直接，扩容也需时间。",
      "D": "Aurora Data API不是配置在RDS Proxy上的read-only端点。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/rds-proxy-endpoints.html",
        "title": "Working with RDS Proxy endpoints",
        "supports": "额外read-only proxy endpoint把只读连接分配到Aurora reader实例。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "414": {
    "blocker": "A retail company is mounting IoT sensors in all of its stores worldwide. During the manufacturing of each sensor, the company’s private certi cate authority (CA) issues an X.509 private certi cate authority (CA) issues an X.509 private certi cate authority (CA) issues an X。 A solutions architect needs to give the sensors the ability to send data to AWS after they are installed.在安装之前，感测器不得将资料传送至AWS。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：CA自动注册与JITP模板方向正确，但pre-provisioning hook仅支持fleet provisioning，按字面不可实施。"
    ],
    "solutions": "参考选择为 C。题目意图是用预植私有CA证书在设备首次连接时JITP注册，按证书序号查验已安装状态后才授权发布，避免在制造阶段就授予数据权限。",
    "result_flow": "C混用了两种不兼容机制：CreateProvisioningTemplate官方API明确preProvisioningHook只支持FLEET_PROVISIONING，不支持JITP，因此按字面C不可实施。首次连接也不证明已安装，必须有安装授权清单；四项均不完整，C仅是接近JITP的出题意图。",
    "options": {
      "A": "制造时RegisterThing会过早注册，违背装好后才允许的要求。",
      "B": "provisioning template预钩子不是Step Functions，StartThingRegistrationTask是批量注册任务。",
      "C": "CA自动注册与JITP模板方向正确，但pre-provisioning hook仅支持fleet provisioning，按字面不可实施。",
      "D": "claim证书流程与已有每设备CA证书不匹配，模板本身也不能查询安装状态。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/us_en/iot/latest/developerguide/jit-provisioning.html",
        "title": "Just-in-time provisioning",
        "supports": "CA关联JITP模板并allow-auto-registration，设备首次连接时自动注册。"
      },
      {
        "url": "https://docs.aws.amazon.com/iot/latest/developerguide/pre-provisioning-hook.html",
        "title": "Pre-provisioning hooks",
        "supports": "预钩子为Lambda，每次设备RegisterThing请求验证参数并返回allowProvisioning。"
      },
      {
        "url": "https://docs.aws.amazon.com/iot/latest/apireference/API_CreateProvisioningTemplate.html",
        "title": "CreateProvisioningTemplate",
        "supports": "preProvisioningHook仅支持FLEET_PROVISIONING，不能附加到JITP模板。"
      }
    ],
    "audit_caveat": "C混用了两种不兼容机制：CreateProvisioningTemplate官方API明确preProvisioningHook只支持FLEET_PROVISIONING，不支持JITP，因此按字面C不可实施。首次连接也不证明已安装，必须有安装授权清单；四项均不完整，C仅是接近JITP的出题意图。",
    "audit_status": "ambiguous"
  },
  "415": {
    "blocker": "一家新创公司最近将一个大型电子商务网站迁移到AWS。该网站的销售额增长了 70%。软体工程师正在使用私人 GitHub 储存库来管理程式码。 DevOps 团队正在使用 Jenkins 进行建置和单元测试。工程师需要在部署期间收到有关不良建置和零停机的通知。工程师还需要确保对用户的任何生产变更都是无缝的，并且在出现重大问题时可以回滚。软体工程师决定使用 AWS CodePipeline 来管理他们的建置和部署流程。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：webhook、构建测试、SNS、蓝绿部署组成可回滚流水线。"
    ],
    "solutions": "正确答案为 B。GitHub webhook触发流水线，Jenkins通过CodeBuild插件运行构建测试，失败经SNS通知；CodeDeploy蓝绿把新版本隔离验证再切流，可快速回滚。",
    "result_flow": "任何架构都不能绝对保证零停机，数据库变更、健康检查、容量与会话兼容仍需设计验证。",
    "options": {
      "A": "websocket不是源代码推送触发方式，all-at-once原地部署会影响全部实例。",
      "B": "webhook、构建测试、SNS、蓝绿部署组成可回滚流水线。",
      "C": "X-Ray不是单元测试/静态分析工具，websocket也不对。",
      "D": "X-Ray不能替代测试，原地all-at-once不满足低停机。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/codebuild/latest/userguide/jenkins-plugin.html",
        "title": "Use AWS CodeBuild with Jenkins",
        "supports": "CodeBuild Jenkins插件可把Jenkins构建作业发送CodeBuild执行。"
      },
      {
        "url": "https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-groups.html",
        "title": "Deployment groups",
        "supports": "蓝绿部署把负载均衡流量从旧实例集切到替代实例集。"
      }
    ],
    "audit_caveat": "任何架构都不能绝对保证零停机，数据库变更、健康检查、容量与会话兼容仍需设计验证。",
    "audit_status": "confirmed"
  },
  "416": {
    "blocker": "一家软体即服务 (SaaS) 公司开发了多租户环境。本公司使用租户共享的Amazon DynamoDB表作为储存层。该公司使用AWS Lambda功能进行应用服务。该公司希望提供基于每个租户的资源消耗的分层订阅模式。每个租用户都由唯一的租用户 ID 来标识，该 ID 作为每个请求的一部分传送到 Lambda 函数。本公司已在 AWS 帐户中建立了 AWS 成本和使用情况报告 (AWS CUR)。该公司希望将 DynamoDB 成本分配给每个租户，以符合该租户的资源消耗。哪种解决方案能够以最少的营运工作量提供每个租户的DynamoDB成本的详细视图？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：ConsumedCapacity提供实际请求容量，结合tenant可细粒度分摊。"
    ],
    "solutions": "正确答案为 B。共享表无法按租户打资源成本标签。每请求记录tenant ID及DynamoDB返回的ConsumedCapacity，按各租户读写容量占比把实际表费用分摊，定期汇总成本。",
    "result_flow": "预置容量、存储、备份及空闲容量仍需制定共享成本分摊规则；按RCU/WCU比重并非AWS原生逐租户账单。",
    "options": {
      "A": "表标签不能为同一表内各租户分别分配用量，CUR也无逐项tenant指标。",
      "B": "ConsumedCapacity提供实际请求容量，结合tenant可细粒度分摊。",
      "C": "项目数量不代表读写请求数/项大小带来的实际计算消耗。",
      "D": "响应大小和调用时长并非DynamoDB读写计费单位，Pricing Calculator也不是实际账单。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Query.Other.html",
        "title": "Other aspects of Query",
        "supports": "ReturnConsumedCapacity返回读容量消耗，计费按读取项大小而非响应数据量。"
      }
    ],
    "audit_caveat": "预置容量、存储、备份及空闲容量仍需制定共享成本分摊规则；按RCU/WCU比重并非AWS原生逐租户账单。",
    "audit_status": "confirmed"
  },
  "417": {
    "blocker": "一家公司有一个应用程序，将资料储存在单一 Amazon S3 储存桶中。公司必须将所有资料保留一年。该公司的安全团队担心攻击者可能透过泄漏的长期凭证存取AWS帐户。哪种解决方案将确保 S3 储存桶中现有​​和未来的物件受到保护？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：跨账户+不可变保留同时保护既有及未来对象。"
    ],
    "solutions": "正确答案为 A。在独立安全账户保留带版本的Object Lock副本，默认一年保留，复制新对象并用Batch Replication补齐已有对象，使生产长期凭证泄露无法删除隔离备份。",
    "result_flow": "要保证高权限也无法提前删，应使用Object Lock compliance mode并严格控制跨账户角色；仅开启默认governance模式仍可能被有绕过权限者删除。",
    "options": {
      "A": "跨账户+不可变保留同时保护既有及未来对象。",
      "B": "Lambda不能用普通角色自动启用MFA Delete，版本本身也不提供合规不可变保留。",
      "C": "只控制未来建桶不保护现有数据，且MFA Delete配置假设不对。",
      "D": "GuardDuty做检测，Lifecycle删除不能阻止攻击者提前删除。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/en_en/AmazonS3/latest/userguide/s3-batch-replication-batch.html",
        "title": "Replicating existing objects with Batch Replication",
        "supports": "Batch Replication可复制既有对象，常规复制规则覆盖未来对象。"
      },
      {
        "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock-managing.html",
        "title": "Object Lock considerations",
        "supports": "Object Lock与复制可结合，需版本控制及相应IAM权限。"
      }
    ],
    "audit_caveat": "要保证高权限也无法提前删，应使用Object Lock compliance mode并严格控制跨账户角色；仅开启默认governance模式仍可能被有绕过权限者删除。",
    "audit_status": "confirmed"
  },
  "418": {
    "blocker": "一家公司需要提高AWS上基于Web的应用程式的安全性。该应用程式使用具有两个自订来源的Amazon CloudFront。第一个自订来源将请求路由到 Amazon API Gateway HTTP API。第二个自订来源将流量路由至Application Load Balancer (ALB)。该应用程式与OpenID Connect (OIDC) 身分提供者 (IdP) 整合以进行使用者管理。安全审核显示JSON Web 令牌 (JWT) 授权者提供对 API 的存取。安全审计也显示ALB接受未经身份验证的使用者的请求。解决方案架构师必须设计一个解决方案，以确保所有后端服务仅回应经过验证的使用者。哪种解决方案可以满足这个要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：ALB原生OIDC认证直接复用现有身份提供者。"
    ],
    "solutions": "正确答案为 A。HTTP API已有JWT authorizer，缺口是ALB公开匿名流量；ALB HTTPS监听器加OIDC IdP认证动作，认证成功后才转发后端。",
    "result_flow": "ALB完成身份认证不自动提供所有业务细粒度授权；应用需校验可信用户声明或配置后端授权规则。",
    "options": {
      "A": "ALB原生OIDC认证直接复用现有身份提供者。",
      "B": "任意请求都允许的签名政策不形成用户认证，且可绕过CloudFront直达ALB。",
      "C": "WAF不直接实现通用OIDC交互登录/完整JWT授权替代。",
      "D": "CloudTrail不记录每个ALB应用请求供实时认证，事后封禁也有窗口。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/elasticloadbalancing/latest/application/listener-authenticate-users.html",
        "title": "Authenticate users using ALB",
        "supports": "ALB支持OIDC企业身份认证动作。"
      }
    ],
    "audit_caveat": "ALB完成身份认证不自动提供所有业务细粒度授权；应用需校验可信用户声明或配置后端授权规则。",
    "audit_status": "confirmed"
  },
  "419": {
    "blocker": "一家公司创建一个 AWS Control Tower 登陆区来管理和治理多个帐户 AWS 环境。公司的安全团队将部署预防性控制和侦测控制来监控所有帐户的AWS服务。安全团队需要集中查看所有帐户的安全状态。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：Security Hub组织集成和委派管理员提供多账户中央安全视图。"
    ],
    "solutions": "正确答案为 D。Security Hub汇聚组织多账户安全检查和发现，委派安全账户集中查看/管理安全态势，Control Tower继续负责治理护栏。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "Config conformance pack检查配置，单独不等于汇聚全部安全服务发现的中央视图。",
      "B": "Detective做安全调查/关联分析，不替代Security Hub安全态势汇总。",
      "C": "自动部署Detective仍是调查工具，且不是题目中央态势平台。",
      "D": "Security Hub组织集成和委派管理员提供多账户中央安全视图。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/securityhub/latest/userguide/central-configuration-intro.html",
        "title": "Central configuration in Security Hub CSPM",
        "supports": "委派管理员可为组织账户/OU集中开启配置安全标准和控制。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "420": {
    "blocker": "一家在欧洲和亚洲设有办事处的消费性电子产品开发公司在欧洲储存了 60 TB 的软体映像。该公司希望将影像传输到 ap-northeast-1 Region 中的Amazon S3 储存桶。每天都会建立新的软体映像，并且必须在传输过程中进行加密。该公司需要一种不需要客制化开发的解决方案，可以自动将所有现有的和新的软体映像传输到Amazon S3。转移过程的下一步是什么？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：原生在线批量/增量文件传输并支持任务调度。"
    ],
    "solutions": "正确答案为 A。DataSync代理读取本地文件，创建到东京S3的计划任务，先传60TB基线再增量同步每日新增，内建加密和校验无需自研传输程序。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "原生在线批量/增量文件传输并支持任务调度。",
      "B": "Firehose不是从目录自动同步60TB镜像的文件传输服务。",
      "C": "Snowball适合一次离线搬迁，不自动持续传每日新增。",
      "D": "VPN加S3 multipart仍需自建文件枚举、调度、重试及校验。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/datasync/latest/userguide/how-datasync-transfer-works.html",
        "title": "How AWS DataSync works",
        "supports": "DataSync比较源/目标并只传更改数据，提供传输后完整性检查。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "421": {
    "blocker": "一家公司有一个使用 Amazon API Gateway 的 Web 应用程式。 AWS Lambda和Amazon DynamoDB。最近的营销活动增加了需求。监控软体报告称，许多请求的回应时间比行销活动之前要长得多。解决方案架构师启用了 Amazon CloudWatch API Gateway 日志，并注意到 20% 的请求发生了错误。在 CloudWatch 中，Lambda 函数 Throttles 指标代表 1% 的请求，Errors 指标代表 10% 的请求。应用程式日志表明，当发生错误时，会呼叫DynamoDB。随著 Web 应用程式变得越来越流行，解决方案架构师应该做出哪些改变来改善当前的回应时间？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：按流量调整表吞吐量，与日志定位的瓶颈对应。"
    ],
    "solutions": "正确答案为 B。错误发生在调用 DynamoDB 时，应先扩展表的预置吞吐量。B 能随负载增加读写容量，减少限流和重试造成的延迟。",
    "result_flow": "应先确认 DynamoDB 的具体异常和限流指标；题目未提供完整诊断，B 为给定信息下最合理选择，不能承诺消除全部错误。",
    "options": {
      "A": "只增加 Lambda 并发不能解决下游表的容量瓶颈。",
      "B": "按流量调整表吞吐量，与日志定位的瓶颈对应。",
      "C": "未给出 API Gateway 限流证据。",
      "D": "没有热点分区证据，重建主键不是应先采取的操作。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/AutoScaling.html",
        "title": "DynamoDB auto scaling",
        "supports": "自动扩展调整预置读写容量。"
      }
    ],
    "audit_caveat": "应先确认 DynamoDB 的具体异常和限流指标；题目未提供完整诊断，B 为给定信息下最合理选择，不能承诺消除全部错误。",
    "audit_status": "confirmed"
  },
  "422": {
    "blocker": "一家公司有一个带有 Web 前端的应用程式。该应用程式在该公司的on-premises资料中心运行，需要存取关键资料的档案储存。该应用程式在三个 Linux VM 上运行以实现冗余。该架构包括一个具有HTTP基于请求的路由的负载平衡器。公司需要尽快将应用程式迁移到AWS。 AWS上的架构必须是高可用的。哪种解决方案能够以最少的架构变更来满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：保留 VM 和共享文件架构，并消除单可用区故障点。"
    ],
    "solutions": "正确答案为 B。三台 Linux VM 迁为跨三个可用区的 EC2，Regional EFS 提供共享 NFS，ALB 保留 HTTP 请求路由。无需重写为容器。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "S3 不是共享 POSIX 文件系统，NLB 不提供 HTTP 请求路由。",
      "B": "保留 VM 和共享文件架构，并消除单可用区故障点。",
      "C": "引入 Kubernetes 改造，且 NLB 不符合原 HTTP 路由需求。",
      "D": "ALB 不跨区域关联这些目标；EBS 也不是跨区域共享文件存储。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/efs/latest/ug/whatisefs.html",
        "title": "Amazon EFS overview",
        "supports": "Regional EFS 跨可用区提供 NFS 共享文件语义。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "423": {
    "blocker": "某公司计划将on-premises资料中心迁移至AWS。该公司目前在基于 Linux 的 VMware 虚拟机器上托管资料中心。解决方案架构师必须收集有关虚拟机器之间网路依赖性的资讯。此资讯必须采用图表形式，详细说明主机 IP 位址、主机名称和网路连线资讯。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：正确服务、代理和图访问权限组合。"
    ],
    "solutions": "正确答案为 A。依赖图需要 Discovery Agent 收集主机和网络连接信息，再由 Migration Hub 展示。Agentless 的 VM 清单不能替代该图要求的代理采集。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "正确服务、代理和图访问权限组合。",
      "B": "此网络依赖图要求 Discovery Agent；不能用无代理清单替代。",
      "C": "Application Migration Service 负责复制迁移，不是此依赖图采集代理。",
      "D": "CSV 放入 CloudWatch 不会自动构成 Migration Hub 网络图。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/migrationhub/latest/ug/network-diagram-how-to.html",
        "title": "Migration Hub network diagram",
        "supports": "图展示服务器主机名、IP 与连接。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "424": {
    "blocker": "一家公司在 AWS 上运行软体即服务 (SaaS) 应用程式。该应用程式由 AWS Lambda 函数和用于 MySQL Multi-AZ 资料库的 Amazon RDS 组成。在市场活动期间，应用程式的工作负载比平常高得多。使用者注意到高峰期间由于资料库连线较多，回应时间很慢。公司需要提高资料库的可扩展效能和可用性。哪种解决方案满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：Proxy 管连接，Aurora Replica 支持可用性和读取扩展。"
    ],
    "solutions": "正确答案为 D。大量 Lambda 执行环境容易放大数据库连接数。RDS Proxy 在函数之间复用连接池，Aurora Replica 提供读取扩展与故障转移目标。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "副本不能直接解决所有函数的连接风暴。",
      "B": "单个执行环境内复用连接不等于跨环境集中连接池。",
      "C": "DNS 权重不是数据库连接管理。",
      "D": "Proxy 管连接，Aurora Replica 支持可用性和读取扩展。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy.html",
        "title": "Amazon RDS Proxy",
        "supports": "连接池复用并改善故障期间连接韧性。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "425": {
    "blocker": "一家公司正计划将应用程式从本地迁移到AWS 云端。该公司将透过将应用程式的底层资料储存移动到AWS来开始迁移。应用程式资料储存在本机共用档案系统上，应用程式伺服器透过 SMB 连接到共用档案系统。解决方案架构师必须实作一个使用 Amazon S3 储存桶进行共享储存的解决方案。在应用程式完全迁移并重写程式码以使用本机Amazon S3 API 之前，应用程式必须继续透过 SMB 存取资料。解决方案架构师必须将应用程式资料迁移到 AWS 到新位置，同时仍允许 on-premises 应用程式存取资料。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：文件网关将 SMB 请求转换为 S3 对象操作。"
    ],
    "solutions": "正确答案为 D。S3 File Gateway 向本地应用暴露 SMB 文件共享，并将文件作为对象保存在指定 S3 桶中，适合先迁数据、后改应用。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "FSx 不满足最终以 S3 为存储的位置要求。",
      "B": "只复制到 S3 后原 SMB 客户端无法直接使用。",
      "C": "迁整个服务器没有建立 S3 后端 SMB 访问。",
      "D": "文件网关将 SMB 请求转换为 S3 对象操作。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/filegateway/latest/files3/CreatingAnSMBFileShare.html",
        "title": "Create an SMB file share",
        "supports": "SMB 文件共享可关联指定 S3 桶。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "426": {
    "blocker": "一家跨国公司拥有一款可显示票据条码的行动应用程式。客户使用行动应用程式上的门票参加现场活动。事件扫描器读取票据条码并呼叫后端 API 以根据资料库中的资料验证条码资料。扫描条码后，后端逻辑写入资料库的单一表以将条码标记为已使用。公司需要在 AWS 上部署应用程序，DNS 名称为 api.example.com。该公司将在全球三个AWSRegions托管该资料库。哪种解决方案能够以最低的延迟满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：Lambda@Edge 可使用 SDK/网络访问邻近区域 DynamoDB 副本。"
    ],
    "solutions": "正确答案为 D。DynamoDB global tables 支持多区域本地读写；Lambda@Edge 可联网调用数据库，CloudFront Functions 不能进行此类网络调用。D 是选项中满足边缘业务逻辑和多区域写入的方案。",
    "result_flow": "票码核销还必须防重放。若采用最终一致的 global tables，不能把它误解为跨区域严格一次性核销；需条件写、路由与一致性设计。",
    "options": {
      "A": "Aurora global database 的主写入区域增加远端写延迟。",
      "B": "CloudFront 不会因配置三个来源就自动择近；Aurora 仍有主写入限制。",
      "C": "CloudFront Functions 不支持访问 DynamoDB 的网络调用。",
      "D": "Lambda@Edge 可使用 SDK/网络访问邻近区域 DynamoDB 副本。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/edge-functions-choosing.html",
        "title": "CloudFront Functions versus Lambda@Edge",
        "supports": "Lambda@Edge 支持 SDK 与网络访问；Functions 不支持。"
      }
    ],
    "audit_caveat": "票码核销还必须防重放。若采用最终一致的 global tables，不能把它误解为跨区域严格一次性核销；需条件写、路由与一致性设计。",
    "audit_status": "confirmed"
  },
  "427": {
    "blocker": "一家医疗公司正在一组 Amazon EC2 实例上执行 REST API。 EC2 实例在Application Load Balancer (ALB) 后面的Auto Scaling 组中运行。 ALB 在三个公有子网路中运行，EC2 实例在三个私有子网路中运行。该公司部署了一个以 ALB 作为唯一来源的 Amazon CloudFront 发行版。解决方案架构师应该推荐哪一种解决方案来增强源安全性？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：实现来源身份标记和 ALB 端校验。"
    ],
    "solutions": "正确答案为 A。由 CloudFront 注入保密来源请求头，ALB 关联 WAF 检查该头，可减少绕过指定分发直接访问源站。Secrets Manager 的自定义轮换函数应同时协调头值和 WAF 规则。",
    "result_flow": "当前也可使用 CloudFront VPC origins；B 不能省略该配置便将私网 ALB 作为原普通来源。",
    "options": {
      "A": "实现来源身份标记和 ALB 端校验。",
      "B": "只允许全部 CloudFront IP 不能识别本公司的分发；移为私网还需要 VPC origin，选项未配置。",
      "C": "Parameter Store 没有这里声称的内建自动密钥轮换。",
      "D": "Shield Advanced 不通过此类安全组策略进行来源头授权。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/restrict-access-to-load-balancer.html",
        "title": "Restrict access to ALB",
        "supports": "CloudFront 添加自定义头，ALB 校验后转发。"
      }
    ],
    "audit_caveat": "当前也可使用 CloudFront VPC origins；B 不能省略该配置便将私网 ALB 作为原普通来源。",
    "audit_status": "confirmed"
  },
  "428": {
    "blocker": "为了遵守产业法规，解决方案架构师必须设计一个解决方案，将公司的关键资料储存在多个公共AWSRegions，包括公司总部所在的美国。解决方案架构师需要向公司的全球 WAN 网路提供对储存在 AWS 中的资料的存取。安全团队要求存取此资料的流量不得穿越公共网路。解决方案架构师应该如何设计一个既满足需求又经济高效的高可用解决方案？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：DX gateway 将冗余连接扩展到多区域 VPC。"
    ],
    "solutions": "正确答案为 D。使用冗余 Direct Connect 连接加全球 Direct Connect gateway，访问多个区域 VPC，避免为每个区域购买独立专线。",
    "result_flow": "真实高可用应选择不同设备/位置并核对 WAN 与运营商冗余；两个连接本身不自动保证端到端高可用。",
    "options": {
      "A": "每区域单独专线成本更高且未明确冗余。",
      "B": "VPC peering 不支持从另一 VPC 的 DX 网关做传递路由。",
      "C": "自建 transit VPC 增加设备和运维成本。",
      "D": "DX gateway 将冗余连接扩展到多区域 VPC。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/directconnect/latest/UserGuide/direct-connect-gateways-intro.html",
        "title": "Direct Connect gateways",
        "supports": "DX gateway 是全球资源，可连接多个区域。"
      }
    ],
    "audit_caveat": "真实高可用应选择不同设备/位置并核对 WAN 与运营商冗余；两个连接本身不自动保证端到端高可用。",
    "audit_status": "confirmed"
  },
  "429": {
    "blocker": "一家公司开发了一个在该公司本地托管的 VMware vSphere VM 上运行 Windows Server 的应用程式。应用程式资料以必须透过应用程式读取的专有格式储存。该公司手动配置伺服器和应用程式。作为灾难复原计划的一部分，该公司希望在该公司的 on-premises 环境不可用时能够暂时在 AWS 上托管其应用程式。该公司希望应用程式在灾难复原事件完成后返回on-premises 托管。 RPO 5分钟。哪种解决方案能够以最少的营运开销满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：持续复制、恢复启动和回切符合本题。"
    ],
    "solutions": "正确答案为 B。Elastic Disaster Recovery 持续块级复制整机状态，故障时启动恢复实例，并支持回切本地；比手工备份文件再重建应用少运维。",
    "result_flow": "5 分钟 RPO 需要监控复制延迟并通过演练确认，不能仅凭部署服务视为保证。",
    "options": {
      "A": "DataSync 不直接以 EBS 卷作为这种复制目标，也不是整机持续恢复。",
      "B": "持续复制、恢复启动和回切符合本题。",
      "C": "文件网关备份不能直接还原完整可启动应用环境。",
      "D": "文件复制不包含手工配置的操作系统和应用整机状态。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/drs/latest/userguide/what-is-drs.html",
        "title": "AWS Elastic Disaster Recovery",
        "supports": "持续复制、恢复实例和 failback。"
      }
    ],
    "audit_caveat": "5 分钟 RPO 需要监控复制延迟并通过演练确认，不能仅凭部署服务视为保证。",
    "audit_status": "confirmed"
  },
  "430": {
    "blocker": "一家公司在 eu-north-1 Region 的 Amazon EC2 上运行高度可用的资料收集应用程式。该应用程式从最终用户设备收集数据，并将记录写入AmazonKinesis数据流和一组处理记录的AWS Lambda函数。该公司将记录处理的输出持久保存到 eu-north-1 中的Amazon S3 储存桶中。本公司使用S3桶中的资料作为AmazonAthena的资料来源。该公司希望扩大其全球影响力。解决方案架构师必须在 sa-east-1 和 ap-north-1 Regions 中启动资料收集功能。解决方案架构师在两个新的 Regions 中部署应用程式、Kinesis 资料流和 Lambda 函数。解决方案架构师将S3储存桶保留在eu-north-1中，以满足集中资料分析的要求。在测试新设定期间，解决方案架构师注意到资料从新的Regions到达S3储存桶有明显的延迟。哪种解决方案将最大程度地改善此延迟时间？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：本地摄取加后台跨区域复制是选项中的合理路径。"
    ],
    "solutions": "正确答案为 C。各区域先写本地 S3，再通过 CRR 自动向分析桶复制，避免 Lambda 每次同步跨洲上传。B 还有明确区域限制：该文档支持清单未包含 eu-north-1。",
    "result_flow": "普通 CRR 无确定到达时间保证；严格复制时限需要评估 S3 RTC。",
    "options": {
      "A": "S3 gateway endpoint 不把跨区域目标变为本地访问。",
      "B": "目标 eu-north-1 不在该 Transfer Acceleration 支持清单中，且不能假定 AWS 内部调用必然受益。",
      "C": "本地摄取加后台跨区域复制是选项中的合理路径。",
      "D": "没有 CPU 或大对象瓶颈证据，内存与分片不保证解决跨区域延迟。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication.html",
        "title": "S3 replication",
        "supports": "CRR 在不同区域桶之间异步复制。"
      },
      {
        "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/transfer-acceleration.html",
        "title": "S3 Transfer Acceleration",
        "supports": "支持区域列表未列 eu-north-1。"
      }
    ],
    "audit_caveat": "普通 CRR 无确定到达时间保证；严格复制时限需要评估 S3 RTC。",
    "audit_status": "confirmed"
  },
  "431": {
    "blocker": "一家公司提供托管在单一共享 VPC 中的集中式 Amazon EC2 应用程式。集中式应用程式必须可从其他业务部门的 VPC 中执行的用户端应用程式存取。集中式应用程式前端配置了Network Load Balancer (NLB)以实现可扩展性。最多 10 个业务单元 VPC 需要连接到共享 VPC。一些业务单元VPCCIDR块与共享VPC重叠，并且一些业务单元相互重叠VPC中集中式应用程式的网路连接应仅允许来自授权业务单元VPC。解决方案架构师应使用哪种网路配置来提供从业务部门VPC中的客户端应用程式到共享VPC中的集中式应用程式的连接？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：NLB endpoint service 加接入审批满足服务访问。"
    ],
    "solutions": "正确答案为 B。PrivateLink 在消费者 VPC 创建服务端点，通过 NLB 访问指定服务，不需要互通重叠 CIDR；要求手动接受连接可限制获准业务单元。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "Transit Gateway 不能为重叠地址自动提供无冲突路由。",
      "B": "NLB endpoint service 加接入审批满足服务访问。",
      "C": "重叠 CIDR 不支持 VPC peering。",
      "D": "VPN 不会自动解决地址冲突，配置和管理也更复杂。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/vpc/latest/privatelink/privatelink-share-your-services.html",
        "title": "Share services through PrivateLink",
        "supports": "NLB 服务端点与获准主体连接。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "432": {
    "blocker": "一家公司想要将其网站迁移到AWS。该网站使用微服务并在部署在 on-premises、自管理 Kubernetes 集群中的容器上运行。定义 Kubernetes 部署中容器的部署的所有清单均位于原始码控制中。网站的所有资料都储存在PostgreSQL资料库中。开源容器镜像储存库与 on-premises 环境一起运作。解决方案架构师需要确定公司将用于 AWS 网站的架构。哪一种解决方案能够以最少的迁移成本满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：复用 Kubernetes 部署，托管节点与数据库减少管理。"
    ],
    "solutions": "正确答案为 B。已有 Kubernetes manifests，应迁到 EKS 并复用部署声明；ECR 保存镜像，Aurora PostgreSQL 承接原 PostgreSQL 数据。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "App Runner 不接受 Kubernetes manifests，且仅支持特定镜像来源。",
      "B": "复用 Kubernetes 部署，托管节点与数据库减少管理。",
      "C": "需将 Kubernetes 声明改写成 ECS task/service，迁移工作更多。",
      "D": "自建集群与数据库需继续负责控制平面、补丁和高可用。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html",
        "title": "What is Amazon EKS",
        "supports": "EKS 提供托管 Kubernetes。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "433": {
    "blocker": "一家公司使用AWS上的行动应用程式来举办线上竞赛。公司在每次比赛结束时随机选出一名获胜者。比赛的持续时间长短不一。比赛结束后，公司不需要保留比赛的任何数据。该公司使用 Amazon EC2 实例上托管的自订程式码来处理竞赛资料并选择获胜者。 EC2 实例在 Application Load Balancer 后面运行，并将竞赛条目储存在 Amazon RDS 资料库实例上。该公司必须设计一种新的架构来降低举办竞赛的成本。哪一种解决方案能够最具成本效益地满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：按需计算、键值存储和 TTL 清理与场景匹配。"
    ],
    "solutions": "正确答案为 D。赛事时长不固定、结束后数据无保留需求，按请求计费的 Lambda 与 DynamoDB 比持续保留 RDS、Redis 和 Fargate 更符合降成本目标。TTL 用于异步清理过期条目。",
    "result_flow": "TTL 通常在过期后数天内删除，并非比赛结束瞬间删除；结果逻辑应过滤过期记录。",
    "options": {
      "A": "DAX 和持续运行容器引入额外常驻成本。",
      "B": "Redshift 面向分析仓库，不适合低成本赛事条目写入。",
      "C": "仍保留 RDS 再加 Redis；缓存过期不会删除 RDS 数据。",
      "D": "按需计算、键值存储和 TTL 清理与场景匹配。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/TTL.html",
        "title": "DynamoDB TTL",
        "supports": "TTL 异步删除过期条目，不消耗源表写吞吐量。"
      }
    ],
    "audit_caveat": "TTL 通常在过期后数天内删除，并非比赛结束瞬间删除；结果逻辑应过滤过期记录。",
    "audit_status": "corrected"
  },
  "434": {
    "blocker": "一家公司实施了新的安全要求。根据新要求，公司必须扫描公司VPC中来自公司AWS实例的所有流量是否违反公司安全策略。透过这些扫描，该公司可以阻止对特定 IP 位址的存取。为了满足新的要求，该公司在私有子网路中部署了一组Amazon EC2实例作为透明代理。该公司在这些 EC2 实例上安装了经批准的代理伺服器软体。本公司修改了所有子网路上的路由表，以使用带有代理软体的对应EC2实例作为预设路由。本公司也会建立符合安全策略的安全群组，并将这些安全群组指派给EC2实例。尽管进行了这些配置，EC2 实例在其私有子网路中的流量并未正确转送到网际网路。解决方案架构师应该做什么来解决这个问题？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：解除 EC2 转发设备的检查限制。"
    ],
    "solutions": "正确答案为 A。转发设备处理的包源地址和目的地址通常都不是自身，EC2 默认源/目标检查会丢弃这些流量，应在代理实例网卡禁用。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "解除 EC2 转发设备的检查限制。",
      "B": "安全组放行不关闭源/目标检查。",
      "C": "DNS 设置不修复 IP 转发。",
      "D": "增加网卡不自动禁用检查，也非必要前提。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/vpc/latest/userguide/work-with-nat-instances.html",
        "title": "NAT instances source/destination checks",
        "supports": "作为转发设备的实例需要关闭 source/destination check。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "435": {
    "blocker": "一家公司正在手动创建的 VPC 中的 AWS 上运行其解决方案。该公司正在使用AWS CloudFormation来配置基础设施的其他部分。根据新的要求，公司必须以自动方式管理所有基础设施。公司应该如何做才能以最少的努力满足这项新要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：CloudFormation 原生资源导入符合最少工作量。"
    ],
    "solutions": "正确答案为 C。将现存 VPC 及实际配置写入 CloudFormation 模板，再通过资源导入纳入新 stack 管理；避免删除重建或换一套工具。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "CDK 可以支持导入工作流，但改用 CDK 比已有 CloudFormation 增加迁移工作。",
      "B": "StackSets 不是这里直接导入手工 VPC 的机制。",
      "C": "CloudFormation 原生资源导入符合最少工作量。",
      "D": "SAM CLI 不提供题述通用 VPC 资源导入能力。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/import-resources.html",
        "title": "Import AWS resources into CloudFormation",
        "supports": "现有资源可不重建而导入 stack。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "436": {
    "blocker": "一家公司开发了一款流行视频游戏的新版本，并希望将其提供给公众下载。新版本包大小约5GB。该公司从托管在 on-premises 资料中心的基于 Linux 的面向公众的 FTP 网站提供现有版本的下载。该公司预计新版本将被全球用户下载。该公司希望有一种解决方案能够提供改进的下载效能和较低的传输成本，而无论用户位于何处。",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：全球 CDN 加 S3 适合公开安装包分发。"
    ],
    "solutions": "正确答案为 C。S3 提供分发源，CloudFront 将大文件缓存到全球边缘节点，改善全球下载并降低重复回源流量。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "ALB 不承载 FTP 协议。",
      "B": "ALB 不支持 FTP，且自建服务器运维更多。",
      "C": "全球 CDN 加 S3 适合公开安装包分发。",
      "D": "Requester Pays 转嫁账单，不提供全球缓存加速。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html",
        "title": "CloudFront overview",
        "supports": "边缘节点缓存并分发源站内容。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "437": {
    "blocker": "一家公司在云端中运行一个由资料库和网站组成的应用程式。用户可以将数据发布到网站，处理数据，然后透过电子邮件将数据发送回给他们。资料储存在 Amazon EC2 实例上运行的 MySQL 资料库中。此资料库在具有两个私有子网路的 VPC 中运作。该网站在 Apache Tomcat 上运行，该实例位于具有一个公共子网的不同 VPC 中的单一 EC2 实例中。资料库和网站 VPC 之间有一个 VPC 对等连接。由于高流量，该网站在上个月遭受了几次中断。解决方案架构师应该采取哪些措施来提高应用程式的可靠性？ （选择三项。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：多实例与负载均衡提高 Web 可靠性。",
      "C：Aurora Replica 提供故障转移目标。",
      "F：为跨 AZ ALB 和 Web 部署提供第二子网。"
    ],
    "solutions": "正确答案为 A、C、F。Web 层必须跨 AZ：增加另一 AZ 公有子网，把 Tomcat 放进 ALB 后的多实例 Auto Scaling；数据库迁 Aurora 并配置副本，消除单实例故障点。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "多实例与负载均衡提高 Web 可靠性。",
      "B": "单个 peering 连接不是这里的单机容量故障点。",
      "C": "Aurora Replica 提供故障转移目标。",
      "D": "数据库私网出站 NAT 不解决 Web 实例过载。",
      "E": "移动 VPC 并未消除单实例风险。",
      "F": "为跨 AZ ALB 和 Web 部署提供第二子网。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/elasticloadbalancing/latest/application/application-load-balancers.html",
        "title": "Application Load Balancer subnets",
        "supports": "ALB 需要至少两个不同 AZ 子网。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "438": {
    "blocker": "一家零售公司正在AWS上运行其电子商务应用程式。该应用程式在 Application Load Balancer (ALB) 后面的 Amazon EC2 实例上运行。该公司使用Amazon RDS资料库实例作为资料库后端。 Amazon CloudFront 配置有一个指向 ALB 的原点。静态内容被快取。 Amazon Route 53 用于托管所有公共区域。应用程式更新后，ALB偶尔会回传 502 状态码（网关错误）错误。根本原因是回到 ALB 的HTTP 标头格式错误。当解决方案架构师在错误发生后立即重新载入网页时，网页会成功返回。当公司正在解决该问题时，解决方案架构师需要向访客提供自订错误页面，而不是标准的 ALB 错误页面。哪种步骤组合能够以最少的营运开销满足这项要求？ （选两个。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：独立 S3 静态错误页来源合理。",
      "E：应只配置 CloudFront 错误响应路径；不应按字面把网站 DNS 改去错误页面。"
    ],
    "solutions": "参考选择为 A、E。A 提供独立 S3 错误页来源，E 中配置 CloudFront custom error response 是预期做法。但 E 后半句要求修改 DNS 指向公开页面是不必要且会改变全部正常流量的错误步骤，因此这是一道有缺陷的组合题。",
    "result_flow": "AE 是出题意图，但 E 含错误附加动作；原题不能作为严格唯一答案考核。",
    "options": {
      "A": "独立 S3 静态错误页来源合理。",
      "B": "ALB 健康检查告警改路由不是每次 502 自定义错误页。",
      "C": "DNS 故障切换不处理单次应用 502。",
      "D": "改 ALB 全局规则复杂且会影响正常请求。",
      "E": "应只配置 CloudFront 错误响应路径；不应按字面把网站 DNS 改去错误页面。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/custom-error-pages-procedure.html",
        "title": "CloudFront custom error responses",
        "supports": "错误页路径由分发配置，无需将网站 DNS 重定向。"
      }
    ],
    "audit_caveat": "AE 是出题意图，但 E 含错误附加动作；原题不能作为严格唯一答案考核。",
    "audit_status": "ambiguous"
  },
  "439": {
    "blocker": "一家公司希望将 Amazon Aurora MySQL 资料库集群从现有 AWS 帐户迁移到同一 AWS Region 中的新 AWS Region 中的新 ⟧T178⟧T178。两个帐户都是 AWS Organizations ​​中同一组织的成员。在执行DNS切换到新资料库之前，公司必须尽量减少资料库服务中断。哪种迁移策略可以满足此要求？ （选两个。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：共享快照可快速建立目标库的基线。",
      "B：CDC 可在基线迁移后持续同步变更。"
    ],
    "solutions": "正确答案为 A、B。常见组合是跨账户共享快照初始化目标 Aurora，再由 DMS CDC 同步切换前新增数据，追平后短暂停写并切 DNS。",
    "result_flow": "快照加 CDC 必须正确对齐日志起点、配置 binlog 与一致性；不能仅导入旧快照就切换。",
    "options": {
      "A": "共享快照可快速建立目标库的基线。",
      "B": "CDC 可在基线迁移后持续同步变更。",
      "C": "AWS Backup 跨账户复制本身不是持续同步，不能独立减少最新数据切换停机。",
      "D": "MGN 迁服务器，不用于托管 Aurora 库间复制。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Task.CDC.html",
        "title": "AWS DMS ongoing replication",
        "supports": "DMS 可在初始迁移后复制持续变更。"
      }
    ],
    "audit_caveat": "快照加 CDC 必须正确对齐日志起点、配置 binlog 与一致性；不能仅导入旧快照就切换。",
    "audit_status": "confirmed"
  },
  "440": {
    "blocker": "软体即服务 (SaaS) 公司为客户提供媒体软体解决方案。此解决方案托管在跨各种 AWS Regions 和 AWS 帐户的 50 个 VPC 上。其中一个VPC被指定为管理VPC。 VPC 中的计算资源独立工作。该公司开发了一项新功能，要求所有 50 个VPC 能够相互通讯。新功能还需要从每个客户的VPC到公司管理层VPC的单向访问。管理VPC托管运算资源，用于验证媒体软体解决方案的授权。随著解决方案的成长，公司用于托管解决方案的VPC数量将持续增加。哪种步骤组合能够以最少的营运开销提供所需的 VPC 连接？ （选两个。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：用区域 TGW 汇聚公司 VPC，跨区域 TGW 再建立对等。",
      "C：服务端点将访问限制到许可证服务，适合多客户接入。"
    ],
    "solutions": "正确答案为 A、C。公司内部大量 VPC 用 Transit Gateway 汇聚，客户只发起到许可证服务的连接则用 NLB + PrivateLink。E 的 peering 提供网络级双向可路由性，不是题述最少运维的单向服务访问。",
    "result_flow": "TGW 是区域资源，A 应理解为各区域部署 TGW 并设置跨区域互连；一个 TGW 不能直接跨区域附加全部 VPC。",
    "options": {
      "A": "用区域 TGW 汇聚公司 VPC，跨区域 TGW 再建立对等。",
      "B": "全网状 peering 数量随规模平方增长。",
      "C": "服务端点将访问限制到许可证服务，适合多客户接入。",
      "D": "每客户 VPN 设备运维高。",
      "E": "每客户 peering 路由与权限管理复杂，可能暴露更大网络范围。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/vpc/latest/privatelink/privatelink-share-your-services.html",
        "title": "PrivateLink service sharing",
        "supports": "消费者通过 NLB endpoint service 发起指定服务连接。"
      },
      {
        "url": "https://docs.aws.amazon.com/vpc/latest/tgw/what-is-transit-gateway.html",
        "title": "Transit Gateway",
        "supports": "跨区域需连接多个 TGW。"
      }
    ],
    "audit_caveat": "TGW 是区域资源，A 应理解为各区域部署 TGW 并设置跨区域互连；一个 TGW 不能直接跨区域附加全部 VPC。",
    "audit_status": "corrected"
  },
  "441": {
    "blocker": "一家公司拥有多个汇总到母公司的业务线 (LOB)。该公司已要求其解决方案架构师开发符合以下要求的解决方案： • 为其 LOB 使用的所有AWS 帐户产生一张AWS 发票。 • 每个LOB 帐户的成本应在发票上详细列出。 • 根据公司治理政策的规定，提供限制LOB 帐户中的服务和功能的能力。 • 无论治理策略如何，每个LOB 帐号都应被授予完全管理员权限。解决方案架构师应该采取哪些步骤组合来满足这些要求？ （选两个。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：单一组织提供合并账单和成员账户成本明细。",
      "D：SCP 定义成员账户可使用服务的权限边界。"
    ],
    "solutions": "正确答案为 B、D。一个 Organizations 组织集中计费，SCP 规定各成员账户权限上限；成员内部可授予管理员 IAM 策略，但实际权限仍受 SCP 限制。",
    "result_flow": "原文 regardless of governance 若理解为可无视 SCP，则与前一要求矛盾；BD 按管理员在治理边界内自治的合理含义作答。",
    "options": {
      "A": "多个组织不形成一个统一组织治理结构。",
      "B": "单一组织提供合并账单和成员账户成本明细。",
      "C": "配额是容量限制，不能替代权限治理。",
      "D": "SCP 定义成员账户可使用服务的权限边界。",
      "E": "仅账单关联不提供题述完整 SCP 治理。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html",
        "title": "Service control policies",
        "supports": "SCP 限制管理员实际权限，不能被 AdministratorAccess 绕过。"
      }
    ],
    "audit_caveat": "原文 regardless of governance 若理解为可无视 SCP，则与前一要求矛盾；BD 按管理员在治理边界内自治的合理含义作答。",
    "audit_status": "confirmed"
  },
  "442": {
    "blocker": "解决方案架构师部署了一个 Web 应用程序，为自订网域下的两个 AWS Regions 的使用者提供服务。该应用程式使用Amazon Route 53基于延迟的路由。解决方案架构师将加权记录集与每个Region的单独Availability Zones中的一对Web伺服器相关联。解决方案架构师运行灾难复原场景。当一个 Region 中的所有 Web 伺服器停止时，Route 53 不会自动将使用者重新导向到另一个 Region。下列哪些可能是此问题的根本原因？ （选两个。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：未评估目标健康，父节点不能感知区域全部失败。",
      "E：未配置健康检查的记录会被当作健康。"
    ],
    "solutions": "正确答案为 D、E。多层记录树中，叶子节点必须有健康检查，顶层 latency alias 必须评估目标健康，才会从整个故障区域撤走响应。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "权重不覆盖健康状态；且本题跨区域顶层是延迟路由。",
      "B": "备用区域单服务器失败不解释主区域仍被选择。",
      "C": "延迟 alias 与加权记录可以组成树。",
      "D": "未评估目标健康，父节点不能感知区域全部失败。",
      "E": "未配置健康检查的记录会被当作健康。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover-complex-configs.html",
        "title": "Route 53 complex health checks",
        "supports": "官方以 latency alias 加 weighted records 展示健康树。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "corrected"
  },
  "443": {
    "blocker": "某洪水监测机构部署了10000多个水位监测感测器。感测器发送连续的资料更新，每次更新的大小小于 1 MB。该机构拥有一组on-premises应用程式伺服器。这些伺服器接收来自感测器的更新，将原始资料转换为人类可读的格式，并将结果写入on-premises关系资料库伺服器。然后，资料分析师使用简单的 SQL 查询来监控资料。该机构希望提高应用程式的整体可用性并减少执行维护任务所需的工作量。这些维护任务（包括应用程式伺服器的更新和修补程式）会导致停机。当应用程式伺服器关闭时，感测器中的资料会遗失，因为其余伺服器无法处理整个工作负载。该机构需要一种能够优化营运管理费用和成本的解决方案。解决方案架构师建议使用AWS IoT Core 收集感测器资料。解决方案架构师还应该建议什么来满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：Firehose/S3/Athena 组合适合按需分析。"
    ],
    "solutions": "正确答案为 B。IoT Core 接入，Firehose 缓冲与交付，Lambda 做业务转换，S3 列式文件由 Athena 无服务器查询，避免维护应用服务器和数据库。",
    "result_flow": "选项 B 简写为 Lambda 转 Parquet；落地应让 Lambda 返回受支持的记录格式，由 Firehose 的格式转换模块生成 Parquet。",
    "options": {
      "A": "为简单分析保留 Aurora 并自写插入增加成本运维。",
      "B": "Firehose/S3/Athena 组合适合按需分析。",
      "C": "额外流处理和 Aurora 导入链路复杂。",
      "D": "Flink 可做处理，但为简单转换持续运行应用的运维更高。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/firehose/latest/dev/record-format-conversion.html",
        "title": "Firehose format conversion",
        "supports": "推荐 Lambda 先转换 JSON，再由 Firehose 转 Parquet。"
      }
    ],
    "audit_caveat": "选项 B 简写为 Lambda 转 Parquet；落地应让 Lambda 返回受支持的记录格式，由 Firehose 的格式转换模块生成 Parquet。",
    "audit_status": "confirmed"
  },
  "444": {
    "blocker": "公共零售 Web 应用程式在 Amazon EC2 实例前面使用 Application Load Balancer (ALB)，这些实例跨由 Amazon RDS MySQL Multi-AZ 部署支援的 ⟦T126AZ⧦ 中的多个执行 ⟧ 运行。目标群体健康检查配置为使用HTTP并指向产品目录页面。 Auto Scaling 配置为根据 ALB 运行状况检查来维护网路大小。最近，该应用程式遇到了中断。 Auto Scaling 在中断期间不断更换实例。随后的调查确定 Web 伺服器指标在正常范围内，但资料库层负载较高，导致查询回应时间严重延长。下列哪些变更可以共同解决这些问题，同时提高整个应用程式堆叠的可用性和功能的监控能力，以实现未来的成长？ （选两个。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：简单 HTML 用作 ALB 检查，完整产品页另做外部监控。",
      "E：产品数据缓存降低重复读取数据库的压力。"
    ],
    "solutions": "正确答案为 B、E。B 将实例存活检查与完整业务检查分开，避免数据库慢导致 ASG 误杀健康实例；E 缓存产品读取可减轻 RDS 压力。A 声称普通 RDS MySQL 多只读副本有统一 reader endpoint，是将 Aurora 能力混用。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "普通 RDS MySQL 只读副本各有端点，不能假定有 Aurora 式统一 reader endpoint。",
      "B": "简单 HTML 用作 ALB 检查，完整产品页另做外部监控。",
      "C": "ALB target group 不支持 TCP 健康检查。",
      "D": "EC2 recover 类告警动作不能如此恢复高负载 RDS。",
      "E": "产品数据缓存降低重复读取数据库的压力。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html",
        "title": "DB instance read replicas",
        "supports": "普通 RDS 实例副本需分别处理连接端点。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "corrected"
  },
  "445": {
    "blocker": "某公司拥有一个on-premises资料中心，并正在使用Kubernetes在AWS上开发新的解决方案。该公司使用Amazon Elastic Kubernetes Service (Amazon EKS)集群作为其开发和测试环境。用于生产工作负载的EKS控制平面和资料平面必须驻留在本地。该公司需要一个AWS托管解决方案来进行Kubernetes管理。哪种解决方案能够以最少的营运开销满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：架构方向正确，但 server 必须改为 rack 才受支持。"
    ],
    "solutions": "参考选择为 A。预期架构应为 EKS local cluster on Outposts rack，控制面和工作节点均在本地且由 AWS 管理。原文 A 却明确写 Outposts server，官方只支持 rack，故不能按原文作为无瑕疵标准答案。",
    "result_flow": "四项按字面均不完整满足；A 仅是把 server 纠为 rack 后的意图答案。应标题目缺陷并免于判错。",
    "options": {
      "A": "架构方向正确，但 server 必须改为 rack 才受支持。",
      "B": "EKS Anywhere 为客户自行运维控制面，不满足 AWS 托管管理要求。",
      "C": "Extended cluster 控制面在 AWS 区域，违反控制面本地要求。",
      "D": "EKS Anywhere 仍需客户管理 Kubernetes 控制面。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/eks/latest/userguide/eks-outposts-local-cluster-create.html",
        "title": "EKS local cluster considerations",
        "supports": "Local clusters support Outpost racks only。"
      }
    ],
    "audit_caveat": "四项按字面均不完整满足；A 仅是把 server 纠为 rack 后的意图答案。应标题目缺陷并免于判错。",
    "audit_status": "ambiguous"
  },
  "446": {
    "blocker": "一家公司使用AWS Organizations来管理其开发环境。公司每个开发团队都有自己的AWS帐户。每个帐户都有一个不重叠的VPC和CIDR块。该公司在共享服务帐户中有一个 Amazon Aurora 资料库集群。所有开发团队都需要使用资料库集群中的即时资料。哪种解决方案能够以最少的营运开销提供与资料库集群所需的连接？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：共享 TGW 加正确路由与安全组提供数据库连通。"
    ],
    "solutions": "正确答案为 B。不重叠 VPC 通过共享 Transit Gateway 汇聚到共享服务 VPC，再连接 Aurora 数据库。普通 Aurora DB cluster 不能靠 RAM 分享就获得实时 SQL 网络访问。",
    "result_flow": "同组织启用 RAM 组织共享时通常无需手动接受邀请，B 的接受步骤可省略。",
    "options": {
      "A": "普通 Aurora 集群不是可这样 RAM 共享的数据库访问资源；不要与 Aurora DSQL 分享混淆。",
      "B": "共享 TGW 加正确路由与安全组提供数据库连通。",
      "C": "ALB 不代理原生 MySQL/PostgreSQL TCP 协议，PrivateLink 服务需 NLB。",
      "D": "自建 VPN 设备和每账户隧道运维更高。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/vpc/latest/tgw/what-is-transit-gateway.html",
        "title": "Transit Gateway",
        "supports": "TGW 用于多 VPC 互连并支持共享。"
      }
    ],
    "audit_caveat": "同组织启用 RAM 组织共享时通常无需手动接受邀请，B 的接受步骤可省略。",
    "audit_status": "corrected"
  },
  "447": {
    "blocker": "一家公司使用 AWS CloudFormation 在其 AWS 成员帐户中建立所有新的基础设施。资源很少发生变化，大小适合预期负载。每月的AWS帐单是一致的。有时，开发人员会建立新资源进行测试，但在测试完成后忘记删除该资源。大多数测试会持续几天，然后不再需要资源。该公司希望自动化寻找未使用资源的流程。解决方案架构师需要设计一个解决方案来确定AWS帐单中的成本是否增加。此解决方案必须协助识别导致成本增加的资源，并且必须自动通知公司的营运团队。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：服务维度监视器直接覆盖所有新旧服务，符合题意。"
    ],
    "solutions": "参考选择为 D。AWS services 类型异常监视器可从稳定账单基线中识别服务级异常支出，并订阅通知；调查维度包含账户、区域和用量类型。",
    "result_flow": "C 与 D 均可构成可行监测方案；题干没有充分限制排除 C。D 为预期选择但不应硬判 C 的架构错误。",
    "options": {
      "A": "仅月累计阈值不能及时定位短期异常来源。",
      "B": "月累计阈值仍缺少异常归因。",
      "C": "Linked account 也可检测账户支出异常；不能简单说它无效。",
      "D": "服务维度监视器直接覆盖所有新旧服务，符合题意。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/cost-management/latest/userguide/getting-started-ad.html",
        "title": "Cost Anomaly Detection monitors",
        "supports": "服务和账户监视器都受支持并提供异常根因。"
      }
    ],
    "audit_caveat": "C 与 D 均可构成可行监测方案；题干没有充分限制排除 C。D 为预期选择但不应硬判 C 的架构错误。",
    "audit_status": "ambiguous"
  },
  "448": {
    "blocker": "一家公司正在部署一个新的基于 Web 的应用程序，需要一个适用于 Linux 应用程式伺服器的储存解决方案。该公司希望创建一个位置来更新所有实例的应用程式资料。活动资料集的大小最大为 100 GB。解决方案架构师已确定每天将出现 3 小时的高峰操作，并且总共需要 225 MiBps 的读取吞吐量。解决方案架构师必须设计一个 Multi-AZ 解决方案，使资料副本可在另一个 AWS Region 中用于灾难复原 (DR)。 DR 副本的 RPO 不到 1 小时。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：75×3=225 MiB/s 读取，配合 EFS 跨区域复制。"
    ],
    "solutions": "正确答案为 A。EFS 读取按其他操作的三分之一计量，75 MiB/s 预置可承载约 225 MiB/s 纯读；Regional EFS 多 AZ，EFS replication 的目标 RPO 为分钟级，适合小于一小时目标。",
    "result_flow": "需要将元数据/写入开销和复制延迟纳入容量验证；RPO 不是零丢失保证。",
    "options": {
      "A": "75×3=225 MiB/s 读取，配合 EFS 跨区域复制。",
      "B": "FSx Lustre 不是题述 Multi-AZ/bursting 模式组合。",
      "C": "gp3 不支持 Multi-Attach，EBS 卷也不跨 AZ 共享。",
      "D": "DataSync 最短周期不支持题述每 10 分钟计划；还需核对生产多 AZ。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/efs/latest/ug/performance.html",
        "title": "EFS performance specifications",
        "supports": "读取以三分之一吞吐量计量。"
      },
      {
        "url": "https://docs.aws.amazon.com/efs/latest/ug/efs-replication.html",
        "title": "EFS replication",
        "supports": "多数文件系统初始复制后目标 RPO 为15分钟。"
      }
    ],
    "audit_caveat": "需要将元数据/写入开销和复制延迟纳入容量验证；RPO 不是零丢失保证。",
    "audit_status": "corrected"
  },
  "449": {
    "blocker": "一家公司需要从没有网路连线的远端位置的实验中收集数据。实验期间，连接到本地网路的感测器将在 1 周内以专有格式产生 6 TB 资料。感测器可以配置为定期将其资料档案上传到FTP伺服器，但感测器没有自己的FTP伺服器。感测器也不支援其他协定。公司需要在实验结束后尽快集中收集资料并将资料移至AWS云端中的物件储存。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：本地 FTP 接收和离线 S3 导入符合题意。"
    ],
    "solutions": "正确答案为 C。按这道历史题的 Snowcone 能力，设备本地 EC2 上运行 FTP server 接收传感器主动上传，离线收集后寄回导入 S3；其他选项没有提供传感器支持的 FTP 服务。",
    "result_flow": "Snowcone 已退出新订购场景；此为历史服务题，不能当作当前可直接采购部署建议。",
    "options": {
      "A": "传感器不支持 NFS；DataSync 也不是 FTP server。",
      "B": "传感器没有 FTP server，主动拉取不可行，目标 EBS 也不符。",
      "C": "本地 FTP 接收和离线 S3 导入符合题意。",
      "D": "FSx 不提供该设备所称集成，且目标 EBS 不符。"
    },
    "sources": [
      {
        "url": "https://aws.amazon.com/about-aws/whats-new/2022/06/aws-snowcone-ssd-available-aws-europe-paris-region/",
        "title": "AWS Snowcone capacity and edge compute",
        "supports": "Snowcone HDD8TB/SSD14TB并可运行EC2。"
      },
      {
        "url": "https://aws.amazon.com/blogs/storage/migrating-and-managing-large-datasets-on-amazon-s3/",
        "title": "Snow Family S3 offline migration",
        "supports": "Snowcone8TB用于离线数据导入S3。"
      }
    ],
    "audit_caveat": "Snowcone 已退出新订购场景；此为历史服务题，不能当作当前可直接采购部署建议。",
    "audit_status": "confirmed"
  },
  "450": {
    "blocker": "一家拥有多个业务部门的公司正在使用 AWS Organizations ​​并启用所有功能。本公司实行每个业务部门都有自己的AWS帐户的帐户结构。每个AWS帐户的管理员需要使用AmazonAthena查看其帐户的详细成本和利用率资料。每个业务部门只能存取自己的成本和利用率资料。管理设定 AWS 成本和使用情况报告能力的 IAM 政策已到位。 Amazon S3 储存桶中已提供包含组织所有资料的中央成本和使用情况报告。哪种解决方案能够以最低的操作复杂度满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：成员自建 CUR 和自有桶是文档原生支持方案。"
    ],
    "solutions": "正确答案为 D。成员账户可以创建只包含本账户数据的 CUR 并交付到自己拥有的桶，再用 Athena 查询，天然隔离账单数据且不需要开发拆分管道。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "RAM 不直接把中央 CUR 按账户过滤共享。",
      "B": "Lambda 拆分虽可设计但明显增加开发、重试和数据隔离管理。",
      "C": "Cost Explorer 保存报表不是 Athena 可查的原始 CUR 数据。",
      "D": "成员自建 CUR 和自有桶是文档原生支持方案。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/cur/latest/userguide/cur-consolidated-billing.html",
        "title": "CUR with Organizations",
        "supports": "管理账户与成员账户都可创建 CUR；成员报表仅含自己数据。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "corrected"
  },
  "451": {
    "blocker": "一家公司正在为制造应用程式设计AWS 环境。该应用程式在客户中获得了成功，并且该应用程式的用户群也有所增加。该公司已透过 1 Gbps AWS Direct Connect 连接将AWS 环境连接到该公司的on-premises 资料中心。本公司已配置BGP进行连接。公司必须更新现有的网路连线解决方案，以确保该解决方案具有高可用性、容错性和安全性。哪一种解决方案能够最具成本效益地满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：独立公网 VPN 可作为低成本加密备用路径。"
    ],
    "solutions": "参考选择为 D。已有 1 Gbps DX 的廉价独立备用路径是公网 Site-to-Site VPN。MACsec 不能用在该 1 Gbps 链路上，多个 VIF 也不提供物理链路冗余。",
    "result_flow": "D 只加密备用 VPN，不能使原 DX 流量自动加密；若安全要求涵盖主路径所有流量，题目没有完整满足选项。静态 VPN 与 BGP DX 的路由切换也需要正确配置监测。",
    "options": {
      "A": "私网 IP VPN 仍依赖 DX，且 1 Gbps 不支持 MACsec。",
      "B": "现有 1 Gbps 不支持 MACsec，新增专线成本更高。",
      "C": "同物理连接上的多个 VIF 不消除连接故障。",
      "D": "独立公网 VPN 可作为低成本加密备用路径。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/directconnect/latest/UserGuide/MACsec.html",
        "title": "MACsec support",
        "supports": "MACsec 仅支持指定地点的 10/100/400 Gbps 专用连接。"
      }
    ],
    "audit_caveat": "D 只加密备用 VPN，不能使原 DX 流量自动加密；若安全要求涵盖主路径所有流量，题目没有完整满足选项。静态 VPN 与 BGP DX 的路由切换也需要正确配置监测。",
    "audit_status": "ambiguous"
  },
  "452": {
    "blocker": "公司需要对应用程式进行现代化改造并将应用程式迁移到AWS。该应用程式将使用者设定档资料以文字形式储存在 on-premises MySQL 资料库的单一表中。现代化后，用户将使用该应用程式上传最大 4 GB 的影片档案。其他用户必须能够从应用程式下载影片档案。该公司需要一种能够快速扩展的视讯储存解决方案。该解决方案不得影响应用程式效能。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：S3 大对象加 DynamoDB 元数据符合伸缩要求。"
    ],
    "solutions": "正确答案为 B。4 GB 视频属于对象存储，放在 S3 并在 DynamoDB 中保存对象键，使大文件传输与用户元数据访问分离。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "将视频编码放入关系库 TEXT 造成大小与性能问题。",
      "B": "S3 大对象加 DynamoDB 元数据符合伸缩要求。",
      "C": "Keyspaces 不是本题明确需要的 Cassandra 模型，选项的 DMS/SCT 迁移组合也不如 DynamoDB 明确。",
      "D": "DynamoDB 单项上限 400 KB，无法保存 4 GB 视频。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-use-s3-too.html",
        "title": "Store large attributes in S3",
        "supports": "大对象存 S3，在 DynamoDB 保存对象标识。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "453": {
    "blocker": "一家公司在Amazon Elastic File System (Amazon EFS) 文件系统中储存和管理文件。档案系统使用 AWS Key Management Service (AWS KMS) 金钥进行加密。档案系统安装到运行专有软体的Amazon EC2实例。该公司已启用档案系统的自动备份。自动备份使用 AWS Backup 预设备份计划。解决方案架构师必须确保可以在 RPO 100 分钟内恢复已删除的文件。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：小时级快照计划是给定选项中受支持做法。"
    ],
    "solutions": "正确答案为 A。EFS 不支持 AWS Backup continuous/PITR。应新建每小时备份计划，授权备份角色使用 KMS 密钥，以恢复点满足约 100 分钟的数据恢复目标。",
    "result_flow": "RPO 取决于成功完成的恢复点；需调整开始窗口并监控任务，不应把每小时计划等同于永远保证 60 分钟 RPO。",
    "options": {
      "A": "小时级快照计划是给定选项中受支持做法。",
      "B": "AWS Backup 最短常规计划周期不支持每 30 分钟且错误使用服务关联角色。",
      "C": "EFS 不在 continuous/PITR 支持资源中。",
      "D": "EFS replication 会同步文件删除，不能替代历史恢复点。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/aws-backup/latest/devguide/backup-feature-availability.html",
        "title": "AWS Backup feature availability",
        "supports": "EFS 支持快照备份，不支持 continuous backups。"
      }
    ],
    "audit_caveat": "RPO 取决于成功完成的恢复点；需调整开始窗口并监控任务，不应把每小时计划等同于永远保证 60 分钟 RPO。",
    "audit_status": "corrected"
  },
  "454": {
    "blocker": "解决方案架构师必须为云端工程师团队提供一种安全的方法，以使用AWS CLI 将物件上传到Amazon S3 储存桶。每个云端工程师都有一个IAM用户、IAM存取金钥和虚拟多重验证（MFA）设备。云端工程师的 IAM 用户位于名为 S3-access 的群组中。云端工程师必须使用 MFA 来执行 Amazon S3 中的任何操作。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：STS 临时凭据携带 MFA 上下文供策略检查。"
    ],
    "solutions": "正确答案为 D。长期 access key 请求不带 MFA 上下文。先用 MFA 调用 STS GetSessionToken 获取临时凭据，再由显式拒绝缺少 MFA 的策略强制 S3 操作。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "S3 桶策略不能交互弹出 MFA 提示。",
      "B": "IAM group 不能像 role 被 assume，也没有该 trust policy。",
      "C": "长期 key 不会因策略自动附带 MFA，结果仅被拒绝。",
      "D": "STS 临时凭据携带 MFA 上下文供策略检查。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa_sample-code.html",
        "title": "Request credentials with MFA",
        "supports": "GetSessionToken/AssumeRole 可带 MFA 参数获取临时凭据。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "455": {
    "blocker": "某公司需要将 60 个on-premises 旧应用程式迁移到AWS。这些应用程式基于 NET Framework，并在 Windows 上运行。该公司需要一种能够最大限度地减少迁移时间且无需更改应用程式程式码的解决方案。该公司也不想管理基础设施。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：迁 IIS 应用到 Beanstalk 并管理容量、补丁等。"
    ],
    "solutions": "正确答案为 B。历史 Windows Web Application Migration Assistant 可搬迁 IIS 网站及配置到 Elastic Beanstalk，减少应用改写并交由托管平台维护环境。",
    "result_flow": "题干只写 .NET legacy apps，B 实际限兼容 IIS Web 应用；不能推导任意 Windows 后台程序都可自动搬到 Beanstalk。",
    "options": {
      "A": "要求重构与容器化，违反不改代码。",
      "B": "迁 IIS 应用到 Beanstalk 并管理容量、补丁等。",
      "C": "自管 EC2 仍需管理基础设施。",
      "D": "要求重构且 Windows .NET Framework 不能直接按此 Fargate Kubernetes 组合处理。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/whitepapers/latest/develop-deploy-dotnet-apps-on-aws/aws-elastic-beanstalk.html",
        "title": "Elastic Beanstalk for .NET",
        "supports": "Windows web migration assistant 面向 IIS ASP.NET 网站。"
      }
    ],
    "audit_caveat": "题干只写 .NET legacy apps，B 实际限兼容 IIS Web 应用；不能推导任意 Windows 后台程序都可自动搬到 Beanstalk。",
    "audit_status": "confirmed"
  },
  "456": {
    "blocker": "公司需要对储存在 Amazon S3 储存桶中的资料执行大型批次作业。这些作业执行模拟。作业的结果对时间不敏感，过程可以承受中断。当资料储存在S3桶中时，每个作业必须处理15-20GB的资料。该公司将把作业的输出储存在不同的Amazon S3储存桶中以供进一步分析。哪一种解决方案能够最具成本效益地满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：Batch 管队列和资源，Spot 降低可中断计算成本。"
    ],
    "solutions": "正确答案为 B。可中断且无紧迫时限的大型模拟任务适合 AWS Batch 加纯 Spot 容量，容量优化分配策略降低被中断风险。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "Lambda 时限和执行资源限制不适合默认承担大型模拟，预置容量也增加成本。",
      "B": "Batch 管队列和资源，Spot 降低可中断计算成本。",
      "C": "混入按需资源对本题无时限任务增加费用。",
      "D": "自管 Kubernetes 资源比专门 Batch 调度更复杂。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/batch/latest/userguide/allocation-strategies.html",
        "title": "AWS Batch allocation strategies",
        "supports": "SPOT_CAPACITY_OPTIMIZED 选择较充足 Spot 容量。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "457": {
    "blocker": "一家公司有一个可以在本地分析和储存影像资料的应用程式。该应用程式每天都会收到数百万个新图像档案。档案的平均大小为 1 MB。文件以 1 GB 为单位进行分析。当应用程式分析一批图像时，应用程式会将图像压缩在一起。然后，应用程式将映像档作为单一档案归档到 on-premises NFS 伺服器中以进行长期储存。该公司拥有 Microsoft Hyper-V 环境并拥有可用的运算能力。该公司没有储存容量，希望将影像存档在AWS上。该公司需要能够在收到请求后 1 周内检索存档资料。该公司在其 on-premises 资料中心和 AWS 之间拥有 10 Gbps AWS Direct Connect 连接。公司需要设定频宽限制并安排在非工作时间将存档影像复制到AWS。哪一种解决方案能够最具成本效益地满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：复用本地计算并直接选择长期归档级。"
    ],
    "solutions": "正确答案为 B。利用现有 Hyper-V 运行 DataSync agent，设任务计划和带宽限制，将 NFS 归档直接写 Deep Archive；一周取回时限允许使用廉价冷存储。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "GPU 代理不必要，Instant Retrieval 存储更贵。",
      "B": "复用本地计算并直接选择长期归档级。",
      "C": "新 EC2 和先存 Standard 增加不必要资源与步骤。",
      "D": "Tape Gateway 需要磁带备份软件接口，不能直接当普通 NFS 归档目标。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/datasync/latest/userguide/create-s3-location.html",
        "title": "DataSync with S3",
        "supports": "DataSync 可选择 S3 存储类别。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "458": {
    "blocker": "一家公司希望记录其应用程式的关键绩效指标 (KPI)，作为转换为基于使用者的授权模式策略的一部分。该应用程式是一个多层应用程序，具有基于 Web 的 UI。公司透过CloudWatch代理将所有日志档案保存到AmazonCloudWatch。应用程式的所有登入都保存在日志档案中。作为新许可证架构的一部分，公司需要找出每个客户每天、每周和每月有多少唯一用户。哪种解决方案将在对应用程式进行最少更改的情况下提供此资讯？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：无需改应用，但必须额外统计活跃用户维度，不能把 Sum 当唯一用户数。"
    ],
    "solutions": "参考选择为 A。日志 metric filter 无需改应用即可按 user/client 提取成功登录指标。但其累加得到登录次数，不会直接给日/周/月去重人数，因此 A 仅是预期采集方式，完整 KPI 还需要去重计算。",
    "result_flow": "高基数 user/client 维度产生大量指标与费用；实际推荐 Logs Insights count_distinct 等去重查询。四项均未完整实现去重人数。",
    "options": {
      "A": "无需改应用，但必须额外统计活跃用户维度，不能把 Sum 当唯一用户数。",
      "B": "需要改业务 SDK 调用，且累加仍不去重。",
      "C": "CloudWatch agent 不提供此类通用日志字段转指标的配置能力。",
      "D": "Lambda 可处理日志但增加代码，按选项仅累加仍未去重。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/FilterAndPatternSyntaxForMetricFilters.html",
        "title": "CloudWatch Logs metric filters",
        "supports": "每次匹配递增指标，不等于 distinct count。"
      }
    ],
    "audit_caveat": "高基数 user/client 维度产生大量指标与费用；实际推荐 Logs Insights count_distinct 等去重查询。四项均未完整实现去重人数。",
    "audit_status": "ambiguous"
  },
  "459": {
    "blocker": "一家公司正在使用 GitHub Actions 运行CI/CD 管道来存取 AWS 上的资源。该公司有一个 IAM 用户，该用户使用管道中的金钥对 AWS 进行身份验证。具有附加策略的现有 IAM 角色授予部署资源所需的权限。该公司的安全团队实施了一项新要求，即管道不能再使用长期金钥。解决方案架构师必须用短期解决方案取代金钥。哪种解决方案能够以最少的营运开销满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：OIDC 信任和短期 STS 凭据适合 CI/CD。"
    ],
    "solutions": "正确答案为 B。GitHub Actions OIDC token 联合到 IAM role，通过 AssumeRoleWithWebIdentity 取短期凭据，省去长期 IAM 用户 key。",
    "result_flow": "信任策略必须限制 token 的 aud 和 sub 到获准仓库/分支或环境。",
    "options": {
      "A": "GitHub Actions 此用例使用 OIDC，且 SAML 角色动作也非普通 AssumeRole。",
      "B": "OIDC 信任和短期 STS 凭据适合 CI/CD。",
      "C": "额外 Cognito 层并非原生最少管理方案。",
      "D": "证书生命周期和辅助工具增加管理，动作与信任描述也不正确。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_create_oidc.html",
        "title": "IAM OIDC identity provider",
        "supports": "OIDC role 可让外部 IdP 使用临时凭据访问 AWS。"
      }
    ],
    "audit_caveat": "信任策略必须限制 token 的 aud 和 sub 到获准仓库/分支或环境。",
    "audit_status": "confirmed"
  },
  "460": {
    "blocker": "一家公司正在目标 URL 清单上运行网路爬行过程，以获取机器学习训练演算法的训练文件。一组 Amazon EC2 t2.micro 实例从 Amazon Simple Queue Service (Amazon SQS) 伫列中撷取目标 URL。然后，实例将爬网演算法的结果以 .csv 档案形式写入Amazon Elastic File System (Amazon EFS) 磁碟区。 EFS 卷安装在 eet 的所有实例上。一个单独的系统以较低的频率将 URL 新增至 SQS 伫列。实例在 10 秒或更短时间内抓取每个 URL。指标表明，当 SQS 伫列中没有 URL 时，某些实例处于空闲状态。解决方案架构师需要重新设计架构以最佳化成本。哪一种步骤组合能够最经济有效地满足这些要求？ （选两个。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：事件驱动函数按任务运行。",
      "E：对象存储适合独立结果文件。"
    ],
    "solutions": "正确答案为 B、E。任务只需十秒且队列间歇到达，Lambda 的 SQS 事件源映射按需处理；输出 CSV 放 S3 即可，无需保留空闲 EC2 或共享文件系统。",
    "result_flow": "应处理至少一次投递，使用幂等输出键与适当可见性超时。",
    "options": {
      "A": "更大常驻实例不解决空闲成本。",
      "B": "事件驱动函数按任务运行。",
      "C": "图数据库与 CSV 归档无关。",
      "D": "关系库不是该输出的必要存储。",
      "E": "对象存储适合独立结果文件。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/lambda/latest/dg/with-sqs.html",
        "title": "Lambda with SQS",
        "supports": "事件源映射轮询队列并分批调用函数。"
      }
    ],
    "audit_caveat": "应处理至少一次投递，使用幂等输出键与适当可见性超时。",
    "audit_status": "confirmed"
  },
  "461": {
    "blocker": "某公司需要将其网站从on-premises资料中心迁移到AWS。该网站由负载平衡器、在 Linux 作业系统上运行的内容管理系统 (CMS) 和 MySQL 资料库组成。 CMS 需要为档案系统提供与 NFS 相容的持久性储存。 AWS 上的新解决方案必须能够从 2 个Amazon EC2 实例扩展到 30 个EC2 实例，以应对不可预测的流量增长。新的解决方案还必须不需要对网站进行任何更改，并且必须防止资料遗失。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：共享持久存储与独立数据库符合伸缩和保留要求。"
    ],
    "solutions": "正确答案为 A。EFS 提供多实例共享 NFS，Beanstalk 管 ALB/ASG；将 Aurora 放在环境生命周期之外，避免删除或重建应用环境时连带丢数据库。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "共享持久存储与独立数据库符合伸缩和保留要求。",
      "B": "EBS Multi-Attach 不提供30实例跨 AZ NFS，数据库绑环境有生命周期风险。",
      "C": "scale-in hook 在实例退出时执行，不能正确用于启动挂载。",
      "D": "EBS 不是跨 AZ NFS，缓存也不能取代持久 MySQL。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/efs/latest/ug/whatisefs.html",
        "title": "Amazon EFS",
        "supports": "NFS 文件语义可跨 EC2 实例共享。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "462": {
    "blocker": "某公司需要对在单一AWSRegion中运行的关键应用程式实施灾难复原。该应用程式的使用者与托管在 Application Load Balancer (ALB) 后面的 Amazon EC2 实例上的 Web 前端进行互动。应用程式写入 MySQL 资料库实例的 Amazon RDS。该应用程式还输出储存在Amazon S3储存桶中的已处理文件。该公司的财务团队直接查询资料库来运行报告。在繁忙期间，这些查询会消耗资源并对应用程式效能产生负面影响。解决方案架构师必须设计一个能够在灾难期间提供弹性的解决方案。此解决方案必须最大限度地减少资料遗失，并且必须解决财务团队查询导致的效能问题。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：副本减轻读取，跨区域副本和文档复制提供恢复基础。"
    ],
    "solutions": "正确答案为 C。跨区域 RDS 只读副本承接财务查询并持续复制，S3 CRR 保存文档副本，复制 AMI 为灾难恢复准备前端。故障时提升副本并在新区域创建 ALB/实例。",
    "result_flow": "异步 RDS/S3 复制仍可能丢最近数据；故障切换需要应用改连新主端点。",
    "options": {
      "A": "换 DynamoDB 要重写关系查询和应用，定时同步也有更大丢失窗口。",
      "B": "ALB 不直接把其他区域实例作为该选项中的普通实例目标。",
      "C": "副本减轻读取，跨区域副本和文档复制提供恢复基础。",
      "D": "小时快照 RPO 更大，缓存不直接转移财务 SQL 查询。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html",
        "title": "RDS read replicas",
        "supports": "只读副本扩展读取；部分引擎支持跨区域与提升。"
      }
    ],
    "audit_caveat": "异步 RDS/S3 复制仍可能丢最近数据；故障切换需要应用改连新主端点。",
    "audit_status": "confirmed"
  },
  "463": {
    "blocker": "某公司的on-premises资料中心运作著许多服务。资料中心使用 AWS Direct Connect (DX) 和 IPSec VPN 连接到 AWS。服务资料敏感，连线无法穿越网路。该公司希望扩展到新的细分市场，并开始向使用AWS的其他公司提供服务。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：NLB endpoint service 可将本地 IP 目标经 DX 提供给消费者。"
    ],
    "solutions": "正确答案为 A。在 VPC 中以 NLB 的私有 IP 目标访问经 DX 可达的本地服务，向客户提供 PrivateLink endpoint service；全程不需要公开互联网入口。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "NLB endpoint service 可将本地 IP 目标经 DX 提供给消费者。",
      "B": "PrivateLink 不能直接选 ALB 作为此端点服务负载均衡器。",
      "C": "公网入口违反限制。",
      "D": "NAT 是出站地址转换，不能按此为外部客户发布私有服务。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/vpc/latest/privatelink/privatelink-share-your-services.html",
        "title": "PrivateLink service sharing",
        "supports": "服务提供方通过 NLB 发布 endpoint service。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "464": {
    "blocker": "某公司使用 AWS Organizations ​​管理其 AWS 帐户。解决方案架构师必须设计一个解决方案，其中仅允许管理员角色使用IAM操作。然而，解决方案架构师无法存取整个公司的所有AWS帐户。哪种解决方案能够以最少的营运开销满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：显式 Deny 加角色例外实现集中权限上限。"
    ],
    "solutions": "正确答案为 C。在组织根挂显式 Deny IAM 操作的 SCP，并按 aws:PrincipalArn 排除获准管理员角色。下级额外 Allow 无法绕过该 Deny。",
    "result_flow": "SCP 不约束管理账户，也不授予角色本身权限；题干 all accounts 应限受 SCP 约束的成员账户。",
    "options": {
      "A": "仅额外 Allow 不会移除现存 FullAWSAccess 对其他主体的许可。",
      "B": "CloudTrail 是事后审计，不能撤销已完成 API。",
      "C": "显式 Deny 加角色例外实现集中权限上限。",
      "D": "只给管理员边界不能限制其他已有主体。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html",
        "title": "Service control policies",
        "supports": "SCP 管成员账户权限上限且显式拒绝优先。"
      }
    ],
    "audit_caveat": "SCP 不约束管理账户，也不授予角色本身权限；题干 all accounts 应限受 SCP 约束的成员账户。",
    "audit_status": "confirmed"
  },
  "465": {
    "blocker": "某公司使用AWS Organizations中的组织来管理多个AWS帐户。该公司在公司共享服务帐户的VPC 中托管一些应用程式。该公司已将中转网关附加到共享服务帐户中的VPC。该公司正在开发一项新功能，并创建了一个需要存取共享服务帐户中的应用程式的开发环境。该公司打算频繁删除和重新创建开发帐户中的资源。该公司还希望让开发团队能够根据需要重新建立团队与共享服务帐户的连结。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：共享 TGW 与 VPC attachment 自动接收对应需求。"
    ],
    "solutions": "正确答案为 B。用 RAM 分享现有 TGW，并开启 auto-accept shared attachments，开发账户即可随 VPC 重建新的 attachment，减少共享账户管理员反复批准。",
    "result_flow": "同组织启用 RAM 组织共享后无需接受分享邀请，仍要开启共享 attachment 自动接收。",
    "options": {
      "A": "TGW peering 没有题述自动接受开关；还增加不必要 TGW。",
      "B": "共享 TGW 与 VPC attachment 自动接收对应需求。",
      "C": "VPC endpoint 不能作为跨账户分享 TGW 的替代。",
      "D": "Network Manager 不是该 TGW 资源共享机制。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/vpc/latest/tgw/tgw-transit-gateways.html",
        "title": "Transit gateways across accounts",
        "supports": "RAM 共享后账户拥有者可创建 VPC attachment。"
      }
    ],
    "audit_caveat": "同组织启用 RAM 组织共享后无需接受分享邀请，仍要开启共享 attachment 自动接收。",
    "audit_status": "confirmed"
  },
  "466": {
    "blocker": "一家公司希望将虚拟 Microsoft 工作负载从on-premises 资料中心迁移到AWS。该公司已成功在AWS上测试了一些范例工作负载。该公司还创建了与 VPC 的 AWS Site-to-Site VPN 连接。解决方案架构师需要为从资料中心迁移所有工作负载产生总拥有成本 (TCO) 报告。资料中心内的每台虚拟机器均已启用简单网路管理协定 (SNMP)。公司无法在资料中心增加更多虚拟机，也无法在虚拟机上安装额外的软体。发现资料必须自动汇入到AWS Migration Hub。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：无代理 collector 加 Evaluator 成本评估符合限制。"
    ],
    "solutions": "正确答案为 B。Migration Evaluator 的无代理 collector 可通过 SNMP/WMI 收集本地资源，Windows EC2 经现有 VPN 访问，不必给源 VM 装软件或再占本地 VM。Evaluator 用于 TCO 评估。",
    "result_flow": "需单独配置 Migration Hub 导入/关联，不能假定安装 collector 就自动完成全部集成。",
    "options": {
      "A": "MGN 是迁移复制，不是本题所需 TCO 采集。",
      "B": "无代理 collector 加 Evaluator 成本评估符合限制。",
      "C": "Migration Hub 不直接生成此 Evaluator TCO 报告。",
      "D": "Readiness Assessment 是准备度评估，非自动采集器。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/prescriptive-guidance/latest/migration-tools/discovery-migration-evaluator.html",
        "title": "Migration Evaluator",
        "supports": "支持无代理 SNMP/WMI 及与 Migration Hub 相关的发现流程。"
      }
    ],
    "audit_caveat": "需单独配置 Migration Hub 导入/关联，不能假定安装 collector 就自动完成全部集成。",
    "audit_status": "confirmed"
  },
  "467": {
    "blocker": "一家正在开发手机游戏的公司正在提供两种 AWS Regions 的游戏资产。游戏资产由每个 Region 中 Application Load Balancer (ALB) 后面的一组 Amazon EC2 实例提供。公司要求从最近的Region取得游戏资源。如果最近的Region中的游戏资源不可用，则应从其他Region获取它们。解决方案架构师应该怎么做才能满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：延迟路由加目标健康满足择近与故障绕行。"
    ],
    "solutions": "正确答案为 D。Route 53 latency alias 在健康区域中择低延迟 ALB，evaluate target health 让故障区域不再被选择。",
    "result_flow": "延迟最小不等同于地理距离最近；DNS 缓存也意味着切换非瞬时。",
    "options": {
      "A": "固定 primary 的 origin group 不按用户选择最近区域。",
      "B": "Failover 固定主备，不满足平时择近。",
      "C": "两分发加固定主备仍不择近。",
      "D": "延迟路由加目标健康满足择近与故障绕行。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-latency.html",
        "title": "Latency-based routing",
        "supports": "多区域记录选择低延迟区域。"
      }
    ],
    "audit_caveat": "延迟最小不等同于地理距离最近；DNS 缓存也意味着切换非瞬时。",
    "audit_status": "confirmed"
  },
  "468": {
    "blocker": "一家公司在多个 AWS 帐户中部署工作负载。每个帐户都有一个 VPC，其中 VPC 流日志以文字日志格式发布到集中式 Amazon S3 储存桶。每个日志档案都使用 gzip 压缩进行压缩。公司必须无限期保留日志档案。安全工程师偶尔会使用AmazonAthena查询VPC流日志来分析日志。随著摄取日志数量的增加，查询效能会随著时间的推移而下降。解决方案架构师必须提高日志分析的效能并减少VPC流日志使用的储存空间。哪种解决方案能够满足这些要求并具有最大的效能改进？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：列式文件和分区直接优化分析扫描。"
    ],
    "solutions": "正确答案为 C。Parquet 列式读取配合小时分区，减少 Athena 扫描的列和时间范围，兼顾压缩占用与查询性能。",
    "result_flow": "修改配置仅影响新日志，历史文件若需加速应另行转 Parquet 并保持原始保留要求。",
    "options": {
      "A": "更换压缩算法不具备列裁剪优势。",
      "B": "上传加速与存储类别不减少 Athena 扫描数据。",
      "C": "列式文件和分区直接优化分析扫描。",
      "D": "移除用量限额和使用旧引擎不优化文件布局。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs-s3-path.html",
        "title": "VPC flow log files",
        "supports": "支持 Parquet 与小时分区。"
      }
    ],
    "audit_caveat": "修改配置仅影响新日志，历史文件若需加速应另行转 Parquet 并保持原始保留要求。",
    "audit_status": "confirmed"
  },
  "469": {
    "blocker": "某公司希望在其 on-premises 基础设施和 AWS 之间建立专用连接。该公司正在建立与其帐户 VPC 的 1 Gbps AWS Direct Connect 连线。该架构包括一个中转网关和一个Direct Connect网关，用于连接多个VPC和on-premises基础设施。公司必须使用 Direct Connect 连接透过中转 VIF 连接到 VPC 资源。哪一种步骤组合可以满足这些要求？ （选两个。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：向 AWS 宣告本地前缀才能有返回路径。",
      "C：向本地宣告允许的 VPC 前缀才能抵达 AWS。"
    ],
    "solutions": "正确答案为 B、C。Transit VIF 的 BGP 必须交换本地网络前缀与 AWS VPC 可达前缀；1 Gbps 也可使用 transit VIF，不需要为此升级 10 Gbps 或开启 MACsec。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "1 Gbps 不妨碍 transit VIF。",
      "B": "向 AWS 宣告本地前缀才能有返回路径。",
      "C": "向本地宣告允许的 VPC 前缀才能抵达 AWS。",
      "D": "MACsec 不是路由可达性的条件。",
      "E": "CAK/CKN 是加密配置，不是 BGP 路由条件。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/directconnect/latest/UserGuide/direct-connect-transit-gateways.html",
        "title": "DX gateway and TGW",
        "supports": "Transit VIF 经 DX gateway 连接 TGW。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "470": {
    "blocker": "一家公司希望将AmazonWorkSpaces与瘦客户端设备结合使用来取代老化的桌上型电脑。员工使用桌面存取处理临床试验数据的应用程式。公司安全策略规定，对应用程式的存取必须仅限于公司分公司位置。该公司正在考虑在未来 6 个月内增设一个分公司。哪种解决方案能够以最高的营运效率满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：原生按可信客户端来源网络限制访问。"
    ],
    "solutions": "正确答案为 A。WorkSpaces IP access control group 在目录级列出办公室公网 CIDR，新增网点时只增加规则，无需重建镜像或安装终端证书。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "原生按可信客户端来源网络限制访问。",
      "B": "WAF 不能关联 WorkSpaces directory。",
      "C": "设备证书限制设备，不确保设备当前位于分公司网络。",
      "D": "来宾 Windows 防火墙不是 WorkSpaces 客户端连接位置的正确控制点。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/workspaces/latest/adminguide/amazon-workspaces-ip-access-control-groups.html",
        "title": "WorkSpaces IP access control groups",
        "supports": "目录可关联可信 CIDR 访问组。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "471": {
    "blocker": "某公司使用AWS Organizations。该公司在一个集中网路帐户中运行两个防火墙设备。每个防火墙设备都在手动配置的高可用Amazon EC2实例上运行。中转网关将集中网路帐户的VPC连接到成员帐户的VPC。每个防火墙设备都使用静态专用 IP 位址，然后用于将流量从成员帐户路由到网际网路。在最近的事件中，配置不当的脚本启动了两个防火墙设备的终止。在重建防火墙设备期间，该公司编写了一个新脚本来在启动时配置防火墙设备。该公司希望对防火墙设备的部署进行现代化改造。防火墙设备需要能够水平扩展，以在网路扩展时处理增加的流量。公司必须继续使用重新墙设备以遵守公司政策。防火墙设备提供者已确认最新版本的防火墙代码适用于所有AWS 服务。解决方案架构师应该推荐哪种步骤组合来最经济有效地满足这些要求？ （选择三项。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：GWLB 面向透明虚拟安全设备。",
      "C：启动模板和实例型 target group 支持 ASG 自动注册。",
      "E：在各消费者 VPC 创建端点并路由到本地端点。"
    ],
    "solutions": "正确答案为 A、C、E。GWLB 将流量透明分发给防火墙，ASG/launch template 用启动脚本自动恢复与扩展。消费者 VPC 中的 GWLBe 才可作为该 VPC 路由目标；F 将成员路由直接指向别的 VPC 的 endpoint 不成立。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "GWLB 面向透明虚拟安全设备。",
      "B": "NLB 不提供题需的全 IP 透明检查链路。",
      "C": "启动模板和实例型 target group 支持 ASG 自动注册。",
      "D": "Launch Wizard 不是通用 ASG 启动脚本配置机制。",
      "E": "在各消费者 VPC 创建端点并路由到本地端点。",
      "F": "成员 VPC 不能直接路由到集中 VPC 的 endpoint；集中检查需先路由 TGW。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/vpc/latest/privatelink/vpce-gateway-load-balancer.html",
        "title": "Gateway Load Balancer endpoints",
        "supports": "消费者在自己的 VPC 建 GWLBe 接入设备。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "corrected"
  },
  "472": {
    "blocker": "解决方案架构师必须为支援 Web 应用程式的 Amazon RDS for PostgreSQL 资料库实作多Region 架构。该资料库从AWS CloudFormation模板启动，该模板包括主要和辅助Regions中都存在的AWS服务和功能。此资料库配置为自动备份，其RTO 为 15 分钟，RPO 为 2 小时。 Web 应用程式设定为使用Amazon Route 53 记录将流量路由到资料库。哪种步骤组合将产生满足所有要求的高可用架构？ （选两个。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：预置副本显著缩短数据库重建时间。",
      "D：将域名故障切换到已提升的备用端点。"
    ],
    "solutions": "正确答案为 A、D。跨区域只读副本预先复制，故障时提升后切换 Route 53 记录，比临时从快照恢复更可能满足15分钟RTO。",
    "result_flow": "提升与 DNS 切换需要编排；私有 DB 不能让 Route 53 公网健康检查直接探测，应使用指标或代理检查。RTO/RPO需演练验证。",
    "options": {
      "A": "预置副本显著缩短数据库重建时间。",
      "B": "故障时恢复大数据库无法可靠满足15分钟RTO。",
      "C": "每两小时复制快照没有解决快速启动与最新恢复问题。",
      "D": "将域名故障切换到已提升的备用端点。",
      "E": "将备份再恢复到所谓 hot standby 描述不一致且慢。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html",
        "title": "RDS read replicas",
        "supports": "跨区域副本可提升为独立数据库。"
      }
    ],
    "audit_caveat": "提升与 DNS 切换需要编排；私有 DB 不能让 Route 53 公网健康检查直接探测，应使用指标或代理检查。RTO/RPO需演练验证。",
    "audit_status": "confirmed"
  },
  "473": {
    "blocker": "一家电子商务公司在AWS上运行一个应用程式。该应用程式有一个 Amazon API Gateway API，可呼叫 AWS Lambda 函数。资料储存在 PostgreSQL 资料库实例的 Amazon RDS 中。在该公司最近一次灰烬销售期间，API 呼叫的突然增加对应用程式的效能产生了负面影响。解决方案架构师审查了这段时间内的AmazonCloudWatch指标，并注意到 Lambda 呼叫和资料库连接显著增加。资料库执行个体上的 CPU 使用率也很高。解决方案架构师应该建议什么来优化应用程式的效能？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：Proxy 直接针对跨执行环境连接池。"
    ],
    "solutions": "正确答案为 C。并发 Lambda 导致连接数激增，RDS Proxy 集中复用连接，降低重复建立连接的CPU开销并限制数据库承接的连接数量。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "每次关闭连接反而放大连接建立成本。",
      "B": "缓存能减读量但题干主要证据是连接风暴。",
      "C": "Proxy 直接针对跨执行环境连接池。",
      "D": "单环境复用有帮助，但不能跨并发实例集中限流连接。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy.html",
        "title": "RDS Proxy",
        "supports": "池化连接避免快速新建连接造成资源过载。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "474": {
    "blocker": "一家零售公司希望改进其应用程式架构。该公司的应用程式注册新订单、处理商品退货并提供分析。这些应用程式将零售资料储存在MySQL资料库和Oracle OLAP分析资料库中。所有应用程式和资料库都托管在 Amazon EC2 实例上。每个应用程式都由多个组件组成，这些组件处理订单流程的不同部分。这些组件使用来自不同来源的传入资料。每周都会执行一个单独的 ETL 作业，并将资料从每个应用程式复制到分析资料库。解决方案架构师必须将架构重新设计为使用无伺服器服务的事件驱动解决方案。该解决方案必须提供近乎即时的更新分析。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：计算、事务、分析服务分工匹配。"
    ],
    "solutions": "正确答案为 C。Aurora Serverless 承接事务 MySQL，Redshift Serverless 承接分析，Fargate 提供容器算力，EventBridge 负责事件分发，是选项中最接近全托管事件架构的组合。",
    "result_flow": "不能认为 EventBridge 会直接把任意事件自动写进 EKS 服务或 Redshift 表；需消费队列/处理器、API或数据摄取集成。",
    "options": {
      "A": "保留自管 MySQL，Neptune 也不是 OLAP 仓库替代。",
      "B": "EC2 与自管式组件不满足 serverless 目标。",
      "C": "计算、事务、分析服务分工匹配。",
      "D": "AppStream 是应用流式桌面服务，不是微服务运行平台。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-targets.html",
        "title": "EventBridge targets",
        "supports": "事件路由需要配置受支持目标与消费机制。"
      }
    ],
    "audit_caveat": "不能认为 EventBridge 会直接把任意事件自动写进 EKS 服务或 Redshift 表；需消费队列/处理器、API或数据摄取集成。",
    "audit_status": "confirmed"
  },
  "475": {
    "blocker": "一家公司正在计划从on-premises资料中心迁移到AWS云端。该公司计划使用在 AWS Organizations ​​的组织中管理的多个 AWS 帐户。该公司最初将创建少量帐户，并根据需要添加帐户。解决方案架构师必须设计一个在所有 AWS 帐户中启用 AWS CloudTrail 的解决方案。满足这些要求的最高效的营运解决方案是什么？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：组织 trail 原生覆盖组织成员。"
    ],
    "solutions": "正确答案为 B。创建应用于整个组织的 CloudTrail organization trail，可自动覆盖新加入的成员账户，避免逐账户部署。",
    "result_flow": "管理事件与数据事件仍需正确选择；“所有事件”不代表默认记录全部 S3/Lambda 数据事件。",
    "options": {
      "A": "每日脚本存在覆盖延迟和额外管理。",
      "B": "组织 trail 原生覆盖组织成员。",
      "C": "手工创建每账户 trail 和维护 SCP 更繁琐。",
      "D": "Automation 不是比原生组织 trail 更简洁的做法。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/awscloudtrail/latest/userguide/creating-trail-organization.html",
        "title": "Organization trail",
        "supports": "组织 trail 记录管理与成员账户事件。"
      }
    ],
    "audit_caveat": "管理事件与数据事件仍需正确选择；“所有事件”不代表默认记录全部 S3/Lambda 数据事件。",
    "audit_status": "confirmed"
  },
  "476": {
    "blocker": "一家软体开发公司有多名远距工作的工程师。该公司正在 Amazon EC2 实例上运行 Active Directory 域服务 (AD DS)。该公司的安全策略规定，部署在 VPC 中的所有内部非公共服务必须可透过 VPN 存取。必须使用多重身份验证 (MFA) 才能存取 VPN。解决方案架构师应该怎么做才能满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：Client VPN 与目录身份验证对应用户接入。"
    ],
    "solutions": "正确答案为 B。远程用户需 Client VPN；AD Connector 对接既有 AD DS，并通过支持的 RADIUS MFA 机制验证第二因素。",
    "result_flow": "AD Connector 的 MFA 需配置RADIUS基础设施，不能只勾一个开关便自动启用。",
    "options": {
      "A": "Site-to-Site VPN 不面向每位远程客户端，WorkSpaces client也不是VPN client。",
      "B": "Client VPN 与目录身份验证对应用户接入。",
      "C": "CloudHub 面向站点连接，Copilot不是VPN客户端。",
      "D": "WorkLink不是该VPN身份验证方案。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/vpn/latest/clientvpn-admin/client-authentication.html",
        "title": "Client VPN authentication",
        "supports": "支持Active Directory用户验证。"
      }
    ],
    "audit_caveat": "AD Connector 的 MFA 需配置RADIUS基础设施，不能只勾一个开关便自动启用。",
    "audit_status": "confirmed"
  },
  "477": {
    "blocker": "一家公司正在 on-premises 资料中心运行一个三层 Web 应用程式。前端由 Apache Web 伺服器提供服务，中间层是一个整体 Java 应用程序，储存层是一个 PostgreSQL 资料库。在最近的一次行销促销中，客户无法透过该应用程式下订单，因为该应用程式崩溃了。分析显示，三层均超载。应用程式变得无响应，并且资料库由于读取操作而达到其容量限制。该公司已在不久的将来安排了几次类似的促销活动。解决方案架构师必须制定迁移到AWS的计划来解决这些问题。此解决方案必须最大限度地提高可扩展性并最大限度地减少营运工作量 哪种步骤组合可以满足这些要求？ （选择三项。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：静态内容无需维持Web服务器群。",
      "D：Fargate承接容器算力，需配置服务伸缩。",
      "E：Aurora读副本自动扩展针对读容量瓶颈。"
    ],
    "solutions": "正确答案为 A、D、E。S3/CloudFront 卸载静态前端，Fargate 运行容器化Java应用，Aurora PostgreSQL读副本自动扩展承接读高峰，三层分别扩容。",
    "result_flow": "Fargate本身不自动为单体应用配置多任务伸缩，应设计无状态服务；容器化不等同于拆成微服务。",
    "options": {
      "A": "静态内容无需维持Web服务器群。",
      "B": "能扩展但EC2/EFS前端运维较高。",
      "C": "Beanstalk也可用，但本题优化持续运维时Fargate避免节点管理。",
      "D": "Fargate承接容器算力，需配置服务伸缩。",
      "E": "Aurora读副本自动扩展针对读容量瓶颈。",
      "F": "固定更大EC2未消除单机和扩展上限。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html",
        "title": "AWS Fargate",
        "supports": "托管容器算力省去服务器管理。"
      }
    ],
    "audit_caveat": "Fargate本身不自动为单体应用配置多任务伸缩，应设计无状态服务；容器化不等同于拆成微服务。",
    "audit_status": "confirmed"
  },
  "478": {
    "blocker": "一家公司正在 AWS 上部署新应用程式。该应用程式由 Amazon Elastic Kubernetes Service (Amazon EKS) 集群和 Amazon Elastic Container Registry (Amazon ECR) 储存库组成。 EKS 群集有一个 AWS 受管节点组。该公司的安全准则规定，AWS 上的所有资源都必须持续扫描安全漏洞。哪种解决方案能够以最少的营运开销满足这项要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：Inspector提供对应资源的持续扫描能力。"
    ],
    "solutions": "正确答案为 B。Inspector 支持 EC2 节点漏洞与 ECR enhanced continuous scanning，适合发现 EKS managed node group 的实例漏洞和镜像漏洞。",
    "result_flow": "需要启用相应扫描类型、满足受支持操作系统/代理条件；不是只开启一个服务便覆盖任何类型资源。",
    "options": {
      "A": "Security Hub汇聚与管理发现，不取代扫描引擎。",
      "B": "Inspector提供对应资源的持续扫描能力。",
      "C": "自建扫描器增加管理，scan-on-push不随新漏洞持续重扫。",
      "D": "CloudWatch agent不是漏洞扫描器。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/inspector/latest/user/what-is-inspector.html",
        "title": "Amazon Inspector",
        "supports": "自动发现并持续扫描EC2/ECR等工作负载。"
      }
    ],
    "audit_caveat": "需要启用相应扫描类型、满足受支持操作系统/代理条件；不是只开启一个服务便覆盖任何类型资源。",
    "audit_status": "confirmed"
  },
  "479": {
    "blocker": "公司需要提高其票务应用程式的可靠性。该应用程式在Amazon Elastic Container Service (Amazon ECS)集群上运行。该公司使用Amazon CloudFront来服务该应用程式。 ECS 集群的单一 ECS 服务是 CloudFront 发行版的起源。该应用程式仅允许特定数量的活跃用户进入购票流程。这些使用者透过其 JSON Web 令牌 (JWT) 中的加密属性进行识别。所有其他使用者都会被重新导向到等候室模组，直到有可用容量进行购买。该应用程式正在经历高负载。候诊室模组按设计工作，但候诊室的负载正在扰乱应用程式的可用性。这种中断对应用程式的门票销售交易产生了负面影响。哪种解决方案将为高负载期间的门票销售交易提供最高的可靠性？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：独立服务加边缘分流针对可靠性根因。"
    ],
    "solutions": "正确答案为 C。将等待室独立成可伸缩服务，并在CloudFront边缘检查令牌后选择来源，等待流量无需先穿过购票服务，从而隔离资源耗尽。",
    "result_flow": "必须验证JWT，按支持的加密方式处理属性；不能只解码就信任。动态来源能力与老版Functions限制不同。",
    "options": {
      "A": "仍先经过购票服务路由，不能最好隔离高峰。",
      "B": "迁Kubernetes不直接消除入口共享和路由瓶颈。",
      "C": "独立服务加边缘分流针对可靠性根因。",
      "D": "mTLS不解决等待流量挤占购票入口。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/helper-functions-origin-modification.html",
        "title": "CloudFront origin modification",
        "supports": "runtime2.0的viewer-request函数可动态选择来源。"
      }
    ],
    "audit_caveat": "必须验证JWT，按支持的加密方式处理属性；不能只解码就信任。动态来源能力与老版Functions限制不同。",
    "audit_status": "confirmed"
  },
  "480": {
    "blocker": "解决方案架构师正在从现有手动建立的非生产 AWS 环境建立AWS CloudFormation 范本。 CloudFormation模板可以根据需要销毁并重新建立。此环境包含一个 Amazon EC2 实例。 EC2 实例具有一个实例设定文件，EC2 实例使用该实例设定档来承担父帐户中的角色。解决方案架构师在 CloudFormation 范本中重新建立角色并使用相同的角色名称。当在子帐户中启动CloudFormation范本时，由于权限不足，EC2实例无法再承担父帐户中的角色。解决方案架构师应该如何解决此问题？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：重新保存Principal角色ARN以绑定新角色ID。"
    ],
    "solutions": "正确答案为 A。角色ARN在保存trust policy时映射为内部principal ID。删除重建同名角色产生新ID，需要在父账户重新保存正确的子账户角色ARN信任。",
    "result_flow": "A中的target role ARN应理解为trust policy的Principal里子账户来源角色ARN，而不是Resource里被假设角色的ARN。",
    "options": {
      "A": "重新保存Principal角色ARN以绑定新角色ID。",
      "B": "信任整个子账户扩大授权范围，虽然可配合身份策略工作但非最小修复。",
      "C": "capability声明不修复父账户旧PrincipalID。",
      "D": "额外capability不会更改父账户trust policy。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_principal.html",
        "title": "IAM role principals",
        "supports": "删除重建角色不保留资源策略中的内部principal绑定。"
      }
    ],
    "audit_caveat": "A中的target role ARN应理解为trust policy的Principal里子账户来源角色ARN，而不是Resource里被假设角色的ARN。",
    "audit_status": "confirmed"
  },
  "481": {
    "blocker": "某公司的 Web 应用程式有可靠性问题。该应用程式为全球客户提供服务。该应用程式在单一 Amazon EC2 执行个体上运行，并对 MySQL 资料库的 Amazon RDS 执行读取密集型操作。在高负载期间，应用程式变得无回应，需要手动重新启动 EC2 执行个体。解决方案架构师必须提高应用程式的可靠性。哪种解决方案能够以最少的开发工作满足此要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：多实例Web加可读Aurora副本提高可靠性。"
    ],
    "solutions": "正确答案为 B。ASG/负载均衡消除Web单实例并支持自动替换；Aurora MySQL副本承接读取，改动小于将应用重写为Lambda。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "RDS传统Multi-AZ standby不可用于读取。",
      "B": "多实例Web加可读Aurora副本提高可靠性。",
      "C": "Global Accelerator不消除单机；standby不能承接读取。",
      "D": "Lambda重写需要更多开发。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html",
        "title": "RDS read replica distinction",
        "supports": "读取扩展应使用可读副本而非传统Multi-AZ standby。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "482": {
    "blocker": "公司需要使用支援 AWS Transfer Family SFTP 的伺服器和 Amazon S3 储存桶来接收来自第三方资料供应商的更新。资料使用 Pretty Good Privacy (PGP) 加密技术进行加密。该公司需要一种解决方案，能够在公司收到资料后自动解密资料。解决方案架构师将使用 Transfer Family 管理的工作流程。该公司使用 IAM 策略创建了 IAM 服务角色，该策略允许存取 AWS Secrets Manager 和 S3 储存桶。该角色的信任关系允许传输 amazonaws.com 服务承担该角色。解决方案架构师接下来该做什么来完成自动解密的解决方案？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：私钥、正常解密步骤和服务器关联正确。"
    ],
    "solutions": "正确答案为 C。PGP解密需要私钥；在Secrets Manager保管后给正常工作流添加DECRYPT步骤，并把工作流关联到Transfer Family server。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "公钥用于加密，不能解密接收的密文。",
      "B": "正常文件处理不应只放异常分支，工作流关联也应在服务器。",
      "C": "私钥、正常解密步骤和服务器关联正确。",
      "D": "公钥和异常流程均不符合。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/transfer/latest/userguide/workflow-decrypt-tutorial.html",
        "title": "Managed PGP decrypt workflow",
        "supports": "私钥存Secrets Manager，解密工作流关联服务器。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "483": {
    "blocker": "一家公司正在将其大型多人游戏的基础设施迁移到AWS。游戏的应用程式设有排行榜，玩家可以即时查看排名。排行榜需要微秒读取和个位数毫秒写入延迟。资料集的大小为个位数太字节，如果发生主节点故障，必须能够在不到一分钟的时间内接受写入。该公司需要一种解决方案，使数据能够透过数据管道持久保存以进行进一步的分析处理。哪种解决方案能够以最少的营运开销满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：MemoryDB提供内存性能与多AZ持久性。"
    ],
    "solutions": "参考选择为 C。MemoryDB以多AZ持久事务日志结合内存数据提供微秒读、低毫秒写，比自建Redis集群少运维，符合持久排行榜。",
    "result_flow": "原题缺失A选项，B还有ROS笔误。C在现有选项中匹配，但缺失选项使原题不完整。",
    "options": {
      "B": "关系数据库通常不满足微秒读，且原文ROS疑为RDS。",
      "C": "MemoryDB提供内存性能与多AZ持久性。",
      "D": "自建Redis实例要管理故障检测、恢复和备份。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/memorydb/latest/devguide/what-is-memorydb.html",
        "title": "MemoryDB overview",
        "supports": "微秒读取、低毫秒写入与多AZ事务日志。"
      }
    ],
    "audit_caveat": "原题缺失A选项，B还有ROS笔误。C在现有选项中匹配，但缺失选项使原题不完整。",
    "audit_status": "ambiguous"
  },
  "484": {
    "blocker": "一家公司正在 AWS 云端中运行多个应用程式。这些应用程式特定于公司中的各个业务部门。该公司正在 AWS Organizations ​​组织中的多个 AWS 帐户中运行应用程式的元件。公司组织中的每个云端资源都有一个名为 BusinessUnit 的标签。每个标签都已具有适当的业务单位名称值。公司需要将其云端成本分配给不同的业务部门。该公司还需要可视化每个业务部门的云端成本。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：管理账户激活标签与集中报表链路正确。"
    ],
    "solutions": "正确答案为 A。在管理账户激活已存在的BusinessUnit标签为成本分配标签，组织CUR导出S3，Athena聚合再由QuickSight展示。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "管理账户激活标签与集中报表链路正确。",
      "B": "成员不能作为组织成本分配标签的集中激活管理点，CloudWatch不直接展示CUR。",
      "C": "分散CUR并直接CloudWatch展示增加复杂性且缺查询层。",
      "D": "标签激活应在管理账户，分散报表不是本题最简方式。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/activating-tags.html",
        "title": "Activate user-defined cost allocation tags",
        "supports": "资源标签需在账单中激活后进入成本报表。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "485": {
    "blocker": "一家公用事业公司希望每 5 分钟从其智慧电表收集一次使用数据，以便于进行使用时间计量。当仪表将资料传送到AWS时，资料会传送到Amazon API Gateway，并由AWS Lambda函数进行处理。并储存于Amazon DynamoDB表中。在试验阶段，Lambda 函数需要 3 到 5 秒才能完成。随著更多智慧电表的部署，工程师注意到 Lambda 函数需要 1 到 2 分钟才能完成。随著从设备收集新类型的指标，这些功能的持续时间也在增加。在 DynamoDB 上执行 PUT 操作时出现许多 ProvisionedThroughputExceededException 错误，且 Lambda 中也出现许多 TooManyRequestsException 错误。哪种更改组合可以解决这些问题？ （选两个。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：提高表或相应索引WCU针对ProvisionedThroughputExceededException。",
      "D：流缓冲和批处理平滑输入并控制并发。"
    ],
    "solutions": "正确答案为 A、D。A增加DynamoDB写容量以消除明确的写限流；D让API Gateway先写Kinesis、Lambda按分片批处理，降低请求与执行环境并发压力。增加内存不能直接消除TooManyRequests并发配额限流。",
    "result_flow": "AB对CPU瓶颈也可能有效，但题目主要证据是下游吞吐与Lambda并发限流。D需设计分片与消费并发；批处理并不减少每条写入消耗的WCU，A仍必需。",
    "options": {
      "A": "提高表或相应索引WCU针对ProvisionedThroughputExceededException。",
      "B": "CPU密集时加内存可能提速，但未证明内存不足，也不会提高并发配额。",
      "C": "增大payload不解决后端限流。",
      "D": "流缓冲和批处理平滑输入并控制并发。",
      "E": "FIFO可缓冲但逐消息处理未提供相同流批处理收益，且需正确分组与吞吐设计。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/lambda/latest/dg/with-kinesis.html",
        "title": "Lambda with Kinesis",
        "supports": "分片批量读取并按并发资源执行。"
      }
    ],
    "audit_caveat": "AB对CPU瓶颈也可能有效，但题目主要证据是下游吞吐与Lambda并发限流。D需设计分片与消费并发；批处理并不减少每条写入消耗的WCU，A仍必需。",
    "audit_status": "corrected"
  },
  "486": {
    "blocker": "一家公司最近成功完成了AmazonWorkSpaces的概念验证。解决方案架构师需要使解决方案在两个 AWS Regions 上高度可用。 Amazon WorkSpaces 部署在故障转移 Region 中，托管区域部署在 Amazon Route 53 中。解决方案架构师应该做什么来配置解决方案的高可用性？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：主备分别建alias/目录关联，再配置故障切换。"
    ],
    "solutions": "参考选择为 A。官方跨区域重定向要求在主、备区域分别创建connection alias并关联本区域目录，再通过DNS健康检查策略返回合适连接标识。D只建主区alias再关联备用目录，缺少完整主备配置。",
    "result_flow": "WorkSpaces连接标识通过DNS TXT配置，需显式健康检查/CloudWatch警报；不能只认为Evaluate Target Health自动检查WorkSpaces。A最接近官方步骤，但原文此开关描述不严谨。 原选项均未准确描述TXT记录与健康检查；不作为唯一标准答案判分。",
    "options": {
      "A": "主备分别建alias/目录关联，再配置故障切换。",
      "B": "两个alias都关联主区不能提供备用目录连接。",
      "C": "单alias加权并不构成跨区故障切换。",
      "D": "缺少主备分别的alias和目录关联。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/workspaces/latest/adminguide/cross-region-redirection.html",
        "title": "WorkSpaces cross-Region redirection",
        "supports": "每主备区域创建connection alias。"
      }
    ],
    "audit_caveat": "WorkSpaces连接标识通过DNS TXT配置，需显式健康检查/CloudWatch警报；不能只认为Evaluate Target Health自动检查WorkSpaces。A最接近官方步骤，但原文此开关描述不严谨。 原选项均未准确描述TXT记录与健康检查；不作为唯一标准答案判分。",
    "audit_status": "ambiguous"
  },
  "487": {
    "blocker": "某公司计划将许多虚拟机器从on-premises环境迁移到AWS。该公司需要在迁移之前对本地环境进行初步评估、虚拟机器上运行的应用程式之间的依赖关系的可视化以及提供on-premises环境评估的报告。为了获取此信息，该公司已发起迁移评估员评估请求。该公司能够在其 on-premises 环境中安装收集器软体，不受任何限制 哪种解决方案能够以最少的营运开销为公司提供所需的资讯？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：同时配置两种采集并从正确服务取得图和评估报告。"
    ],
    "solutions": "正确答案为 D。Migration Evaluator collector负责资产/利用率和Quick Insights成本评估；Discovery Agent采集网络依赖并在Migration Hub展示，两者分别解决报告与依赖图。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "Quick Insights报告由Migration Evaluator提供，不是直接从Migration Hub下载。",
      "B": "Evaluator collector不是每VM安装的代理，QuickSight也不生成该Quick Insights报告。",
      "C": "Agentless collector不满足该Migration Hub网络依赖图的Discovery Agent前提。",
      "D": "同时配置两种采集并从正确服务取得图和评估报告。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/migrationhub/latest/ug/network-diagram-how-to.html",
        "title": "Migration Hub network diagram",
        "supports": "网络图基于Discovery Agent主机连接数据。"
      },
      {
        "url": "https://docs.aws.amazon.com/prescriptive-guidance/latest/migration-tools/discovery-migration-evaluator.html",
        "title": "Migration Evaluator",
        "supports": "Evaluator用于迁移成本评估。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "488": {
    "blocker": "一家公司透过使用 Amazon API Gateway API 和包含 API 方法逻辑的 AWS Lambda 函数在 AWS 上托管其主要 API。公司的内部应用程式使用 API 来实现核心功能和业务逻辑。该公司的客户使用 API 存取其帐户中的资料。一些客户还可以存取在单一独立 Amazon EC2 实例上运行的旧版 API。该公司希望提高这些 API 的安全性，以便更好地防止拒绝服务 (DoS) 攻击、检查漏洞并防范常见漏洞。解决方案架构师应该怎么做才能满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：各服务职责分工正确。"
    ],
    "solutions": "正确答案为 C。WAF可直接保护受支持的API Gateway REST API，Inspector检查EC2遗留服务主机漏洞，GuardDuty负责威胁检测；后三者不能混成自动阻断或漏洞修补服务。",
    "result_flow": "完整保护独立EC2遗留API应加ALB/CloudFront并关联WAF；C是选项中职责正确者，并未覆盖遗留API所有Web防护需求。",
    "options": {
      "A": "独立EC2 API不能直接关联WAF，需先配置CloudFront/ALB等受支持资源。",
      "B": "Inspector不是HTTP API扫描器，GuardDuty不自动阻断所有攻击。",
      "C": "各服务职责分工正确。",
      "D": "Inspector不直接阻断请求，GuardDuty也非该拦截层。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/inspector/latest/user/what-is-inspector.html",
        "title": "Amazon Inspector",
        "supports": "Inspector扫描EC2软件漏洞和网络暴露。"
      }
    ],
    "audit_caveat": "完整保护独立EC2遗留API应加ALB/CloudFront并关联WAF；C是选项中职责正确者，并未覆盖遗留API所有Web防护需求。",
    "audit_status": "confirmed"
  },
  "489": {
    "blocker": "一家公司正在 AWS 上运行无伺服器电子商务应用程式。应用程式使用 Amazon API Gateway 呼叫 AWS Lambda Java 函数。 Lambda 函数连接到 MySQL 资料库的 Amazon RDS 来储存资料。在最近的促销活动中，网路流量突然增加导致 API 效能不佳和资料库连线失败。该公司需要实施一种解决方案来最大限度地减少 Lambda 函数的延迟并支援流量突发。哪种解决方案能够以最少的应用程式更改来满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：连接池与预初始化分别针对两项问题。"
    ],
    "solutions": "正确答案为 B。RDS Proxy处理数据库连接风暴，provisioned concurrency预先初始化执行环境降低Java冷启动。Reserved concurrency只预留并限制并发额度，不预热环境。",
    "result_flow": "预置并发需覆盖预计峰值，超出的按需执行仍可能冷启动。",
    "options": {
      "A": "单执行环境复用不能统一管理连接池。",
      "B": "连接池与预初始化分别针对两项问题。",
      "C": "仅增加max_connections可能进一步耗尽内存，reserved不预热。",
      "D": "Proxy正确但reserved不直接减少冷启动延迟。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy.html",
        "title": "RDS Proxy",
        "supports": "Proxy集中管理可复用连接。"
      }
    ],
    "audit_caveat": "预置并发需覆盖预计峰值，超出的按需执行仍可能冷启动。",
    "audit_status": "confirmed"
  },
  "490": {
    "blocker": "公司要求所有内部应用程式连线都使用私人 IP 位址。为了促进此策略，解决方案架构师创建了介面端点来连接到AWS公共服务。经过测试，解决方案架构师注意到服务名称正在解析为公用 IP 位址，且内部服务无法连接到介面端点。解决方案架构师应该采取哪一步来解决这个问题？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：VPC DNS属性与端点private DNS均须配置。"
    ],
    "solutions": "正确答案为 B。应同时启用VPC的DNS支持/主机名与interface endpoint的private DNS，使服务默认域名解析为端点ENI私有IP。B是预期对应项，但把private DNS说成VPC attribute并不精确。",
    "result_flow": "如VPC DNS已开启而仅端点private DNS关闭，按B字面操作仍不够，需明确检查端点配置。",
    "options": {
      "A": "Interface endpoint通过ENI可达，不需像gateway endpoint那样加路由。",
      "B": "VPC DNS属性与端点private DNS均须配置。",
      "C": "安全组影响连接但不会将公共DNS改为私有IP。",
      "D": "私有托管区域没有题述内建条件转发器，且本题通常无需手建。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/vpc/latest/privatelink/privatelink-access-aws-services.html",
        "title": "PrivateLink private DNS",
        "supports": "端点private DNS与VPC DNS属性共同决定服务名解析。"
      }
    ],
    "audit_caveat": "如VPC DNS已开启而仅端点private DNS关闭，按B字面操作仍不够，需明确检查端点配置。",
    "audit_status": "confirmed"
  },
  "491": {
    "blocker": "一家公司正在开发延迟敏感的应用程式。该应用程式的一部分包括多个需要尽快初始化的AWS Lambda功能。 Lambda 函数是用 Java 编写的，并包含处理程序外部的初始化程式码，用于载入函式库、初始化类别并产生唯一 ID。哪一种解决方案能够最经济有效地满足启动效能要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：发布版本使用SnapStart并将唯一数据放恢复后生成。"
    ],
    "solutions": "正确答案为 D。SnapStart对已发布版本保存初始化快照；预先加载类库可复用，但唯一ID必须在handler或after-restore阶段生成，防止快照克隆导致重复。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "$LATEST不支持SnapStart且把全部初始化移handler增加每次工作。",
      "B": "Provisioned concurrency可降低启动延迟，但有持续预置资源成本。",
      "C": "同一版本不能同时启用SnapStart与provisioned concurrency。",
      "D": "发布版本使用SnapStart并将唯一数据放恢复后生成。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/lambda/latest/dg/snapstart-uniqueness.html",
        "title": "SnapStart uniqueness",
        "supports": "唯一ID等状态必须在初始化快照后重新生成。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "492": {
    "blocker": "解决方案架构师正在使用 AWS 汇入/汇出的 Amazon EC2 VM 汇入功能从 on-premises 环境汇入 VM。解决方案架构师建立了一个 AMI，并且配置了一个基于该 AMI 的 Amazon EC2 执行个体。 EC2 实例在 VPC 的公共子网路内运行，并分配有公共 IP 位址。 EC2 实例不会在 AWS Systems Manager 控制台中显示为托管实例。解决方案架构师应采取哪些步骤组合来解决此问题？ （选两个。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：检查SSM Agent安装、运行与联网。",
      "B：检查实例profile角色和SSM所需权限。"
    ],
    "solutions": "正确答案为 A、B。Systems Manager托管节点需要运行SSM Agent与适当实例IAM权限；导入的VM未必预装agent。公有子网有公网IP时可通过公网服务端点连接，VPC endpoint不是必需。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "检查SSM Agent安装、运行与联网。",
      "B": "检查实例profile角色和SSM所需权限。",
      "C": "有公网出站路径时不强制需要端点。",
      "D": "Application Discovery Agent用于发现，不是SSM管理代理。",
      "E": "服务关联角色不能替代节点实例profile。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/systems-manager/latest/userguide/troubleshooting-ssm-agent.html",
        "title": "Troubleshoot SSM Agent",
        "supports": "检查代理、节点权限与服务端点连接。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "corrected"
  },
  "493": {
    "blocker": "一家公司正在使用AWS CloudFormation作为所有应用程式的部署工具。它将所有应用程式二进位档案和模板存放在启用版本控制的Amazon S3储存桶中。开发人员可以存取托管整合开发环境 (IDE) 的Amazon EC2 实例。开发人员将应用程式二进位档案从Amazon S3下载到EC2实例，进行更改，并在本地运行单元测试后将二进位档案上传到S3储存桶。开发者希望改善现有的部署机制，使用AWSCodePipeline实作CI/CD。开发人员有以下要求： • 使用AWS CodeCommit 进行原始码控制。 • 自动化单元测试和安全扫描。 • 当单元测试失败时提醒开发人员。 • 作为CI/CD 的一部分，开启和关闭应用程式功能并动态自订部署。 • 在部署应用程式之前让首席开发人员批准。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：各阶段使用对应托管服务，支持自动测试与人工批准。"
    ],
    "solutions": "正确答案为 A。CodeBuild执行测试/扫描，失败事件经EventBridge通知SNS；CDK按配置选择部署特性，CodePipeline原生manual approval让负责人审核。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "各阶段使用对应托管服务，支持自动测试与人工批准。",
      "B": "后续阶段通常不会在前阶段失败后照常执行，SES也非批准机制。",
      "C": "自建Jenkins与Lambda批准增加运维。",
      "D": "CodeDeploy负责部署而非通用构建测试扫描。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/codepipeline/latest/userguide/approvals.html",
        "title": "CodePipeline manual approval",
        "supports": "可在流水线加入人工批准动作。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "494": {
    "blocker": "一家全球电子商务公司在世界各地拥有许多资料中心。随著储存资料的成长，该公司需要建立一个解决方案，为遗留的on-premises档案应用程式提供可扩展的储存。公司必须能够使用 AWS Backup 取得磁碟区的时间点副本，并且必须保留对频繁存取的资料的低延迟存取。该公司还需要拥有可以作为互联网小型电脑系统介面 (iSCSI) 设备从该公司的 on-premises 应用伺服器安装的储存磁碟区。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：缓存卷匹配本地低延迟热数据与云端容量。"
    ],
    "solutions": "正确答案为 C。Cached Volume Gateway以iSCSI块设备提供本地热数据缓存，主要数据存云端，并能由AWS Backup保护卷恢复点。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "Tape Gateway提供VTL磁带，不是普通iSCSI数据卷。",
      "B": "File Gateway提供文件协议，非iSCSI块卷。",
      "C": "缓存卷匹配本地低延迟热数据与云端容量。",
      "D": "File Gateway非iSCSI卷，不能按此做卷级快照。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/storagegateway/latest/vgw/StorageGatewayConcepts.html",
        "title": "Volume Gateway",
        "supports": "支持cached/stored volumes架构。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "495": {
    "blocker": "一家公司有一个使用 AWS Key Management Service (AWS KMS) 来加密和解密资料的应用程式。该应用程式将资料储存在 AWS Region 的 Amazon S3 储存桶中。公司安全策略要求在将资料放入S3储存桶之前对资料进行加密。当应用程式从 S3 储存桶读取档案时，应用程式必须解密资料。该公司将S3储存桶复制到其他Regions。解决方案架构师必须设计一个解决方案，以便应用程式可以跨Regions加密和解密资料。应用程式必须使用相同的金钥来解密每个Region中的资料。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：多区域相关密钥可在本地解密同一加密材料。"
    ],
    "solutions": "正确答案为 A。KMS multi-Region主键与副本共享密钥材料和key ID，可在各自区域用相应ARN完成相同密文的加解密，适合客户端加密后跨区域保存。",
    "result_flow": "这是应用侧加密场景；S3 SSE-KMS跨区域复制仍按目标区域服务配置加密，不能混为S3自动识别同一键。",
    "options": {
      "A": "多区域相关密钥可在本地解密同一加密材料。",
      "B": "独立KMS密钥材料不同，不能直接解密原密文。",
      "C": "证书颁发与对称数据解密不是同一功能。",
      "D": "KMS生成的密钥材料不能导出到Parameter Store。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/kms/latest/developerguide/multi-region-keys-overview.html",
        "title": "KMS multi-Region keys",
        "supports": "相关主/副本共享密钥材料与key ID。"
      }
    ],
    "audit_caveat": "这是应用侧加密场景；S3 SSE-KMS跨区域复制仍按目标区域服务配置加密，不能混为S3自动识别同一键。",
    "audit_status": "confirmed"
  },
  "496": {
    "blocker": "一家公司托管一个应用程序，该应用程式使用 Application Load Balancer (ALB) 后面的 Auto Scaling 组中的多个 Amazon EC2 实例。在 EC2 实例初始启动期间，EC2 执行个体执行使用者资料脚本以从 Amazon S3 储存桶下载应用程式的关键内容。 EC2 实例正在正确启动。但是，一段时间后，EC2 实例被终止，并显示以下错误讯息：「实例因 ELB 系统运作状况检查失败而停止服务。」EC2 实例会因无限循环中的 Auto Scaling 事件而继续启动和终止。最近部署的唯一变化是该公司为 S3 储存桶添加了大量关键内容。该公司不想在生产中更改用户资料脚本。解决方案架构师应该怎么做才能成功部署生产环境？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：延长ASG健康检查宽限允许启动脚本完成。"
    ],
    "solutions": "正确答案为 D。新增大量下载内容使启动准备时间变长，ASG grace period应覆盖初始化时间，避免尚未就绪被ELB健康结果提前终止。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "增实例不是直接处理初始化被误判机制。",
      "B": "ALB单次检查timeout不等同于启动宽限。",
      "C": "修改路径不保证应用真正就绪，且掩盖问题。",
      "D": "延长ASG健康检查宽限允许启动脚本完成。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/autoscaling/ec2/userguide/health-check-grace-period.html",
        "title": "ASG health check grace period",
        "supports": "宽限期间避免因启动后健康检查未通过而过早替换。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "497": {
    "blocker": "某公司需要将一些on-premises Oracle 资料库迁移到AWS。出于业务合规性原因，该公司选择将一些资料库保留在本地。 on-premises 资料库包含空间资料并执行 cron 作业进行维护。公司需要从AWS直接连接到on-premises系统，以外部表的形式查询资料。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：PostgreSQL扩展组合与DX路径符合要求。"
    ],
    "solutions": "正确答案为 D。RDS PostgreSQL可使用PostGIS空间扩展、pg_cron调度与oracle_fdw查询远端Oracle，SCT/DMS做异构迁移，DX提供私有网络路径。",
    "result_flow": "“native spatial”应落实为PostGIS；托管RDS不能登录OS执行cron，需pg_cron扩展。DX只提供网络，不能单独实现外表。",
    "options": {
      "A": "DynamoDB/API Gateway不具备该Oracle外表查询方案。",
      "B": "Glue crawler只采元数据，不使SQL Server获得Oracle外表。",
      "C": "MGN不提供题述双向数据库CDC，IGW也不提供foreign table能力。",
      "D": "PostgreSQL扩展组合与DX路径符合要求。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/postgresql-oracle-fdw.html",
        "title": "PostgreSQL oracle_fdw",
        "supports": "RDS PostgreSQL可通过oracle_fdw连接Oracle外部服务器。"
      }
    ],
    "audit_caveat": "“native spatial”应落实为PostGIS；托管RDS不能登录OS执行cron，需pg_cron扩展。DX只提供网络，不能单独实现外表。",
    "audit_status": "confirmed"
  },
  "498": {
    "blocker": "Accompany 在 Amazon EC2 和 AWS Lambda 上运行应用程式。应用程式将暂存资料储存在Amazon S3中。 S3 物件将在 24 小时后删除。该公司透过启动 AWS CloudFormation 堆叠来部署该应用程式的新版本。堆叠创建所需的资源。验证新版本后，公司将删除旧堆叠。最近删除旧开发堆叠失败。解决方案架构师需要在不进行重大架构变更的情况下解决此问题。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：正确实现Delete处理并回复CloudFormation后清空桶。"
    ],
    "solutions": "正确答案为 A。CloudFormation删除S3桶要求先清空。自定义资源在Delete事件清理对象，再允许桶资源删除；DependsOn使清理资源先于桶删除。",
    "result_flow": "如开启版本控制需连历史版本/删除标记一并清理；函数必须幂等并按协议回报结果。",
    "options": {
      "A": "正确实现Delete处理并回复CloudFormation后清空桶。",
      "B": "Delete不代表自动清空非空桶。",
      "C": "S3不支持该Snapshot删除策略。",
      "D": "换EFS和VPC属于大架构变更。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-s3-bucket.html",
        "title": "AWS::S3::Bucket",
        "supports": "删除桶前必须删除桶内所有对象。"
      }
    ],
    "audit_caveat": "如开启版本控制需连历史版本/删除标记一并清理；函数必须幂等并按协议回报结果。",
    "audit_status": "confirmed"
  },
  "499": {
    "blocker": "一家公司有一个应用程序，将用户上传的影片储存在使用 S3 标准储存的 Amazon S3 储存桶中。用户在影片上传后的前180天内频繁存取影片。 180 天后造访的情况很少见。指定使用者和匿名使用者存取影片。大多数影片的大小都超过 100 MB。用户在上传影片时经常会遇到网路连线较差的情况，导致上传失败。该公司对影片使用分段上传。解决方案架构师需要优化应用程式的S3成本。哪一种行动组合可以满足这些要求？ （选两个。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：AbortIncompleteMultipartUpload清理失败上传残留。",
      "E：冷却期后进入Standard-IA匹配访问模式。"
    ],
    "solutions": "正确答案为 C、E。清理未完成multipart parts可停止无用存储计费；180天后再转Standard-IA符合先热后冷，仍保持即时取回。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "Requester Pays不支持匿名请求。",
      "B": "Transfer Acceleration增加额外传输费，不是存储成本优化。",
      "C": "AbortIncompleteMultipartUpload清理失败上传残留。",
      "D": "首180天频繁读取，首日进Glacier Instant增加读取费用。",
      "E": "冷却期后进入Standard-IA匹配访问模式。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/mpu-abort-incomplete-mpu-lifecycle-config.html",
        "title": "Abort incomplete multipart uploads",
        "supports": "Lifecycle可自动中止长期未完成上传。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "500": {
    "blocker": "一家公司在 AWS 上运行电子商务 Web 应用程式。 Web 应用程式以静态网站托管在 Amazon S3 上，并使用 Amazon CloudFront 进行内容交付。 Amazon API Gateway API 呼叫 AWS Lambda 函数来处理 Web 应用程式的使用者请求和订单处理 Lambda 函数将资料储存在使用按需实例的 MySQL 资料库集群的 Amazon ROS 中。资料库集群使用情况在过去 12 个月中保持一致。近期，该网站遭遇SQL注入和Web漏洞攻击。客户还报告说，在使用高峰期，订单处理时间增加。在此期间，Lambda 函数通常会冷启动。随著公司的发展，公司需要保证流量高峰时的可扩展性和低延迟存取。该公司还必须优化资料库成本并增加对 SQL 注入和 Web 攻击尝试的保护。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：分别对应延迟、稳定数据库折扣和Web防护。"
    ],
    "solutions": "正确答案为 D。Provisioned concurrency降低高峰冷启动；稳定数据库基线适合RDS Reserved Instances节费；WAF在CloudFront检查SQL注入等应用层攻击。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "超时不预热；Shield不是SQL注入规则引擎。",
      "B": "Redshift不适合替代订单事务库，Inspector不是请求拦截服务。",
      "C": "预置并发合理，但稳定负载未必需改数据库，Shield不替代WAF规则。",
      "D": "分别对应延迟、稳定数据库折扣和Web防护。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/waf/latest/developerguide/waf-rule-statement-type-sqli-match.html",
        "title": "AWS WAF SQL injection match",
        "supports": "WAF可检查Web请求的SQL注入模式。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "501": {
    "blocker": "一家公司在单一 Amazon EC2 实例上运行 Web 应用程式。最终用户在使用高峰期（CPU 使用率始终高于 95%）会遇到应用程式效能缓慢的情况。使用者资料脚本在 EC2 实例上安装所需的自订套件。启动实例的过程需要几分钟。该公司正在创建一个 Auto Scaling 组，该组具有混合实例组、不同的 CPU 和最大容量限制。 Auto Scaling 群组将使用各种设定选项的启动模板。该公司需要在自动扩展期间启动新实例时减少应用程式延迟。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：动态伸缩、预热池与生命周期协调各有对应作用。"
    ],
    "solutions": "正确答案为 D。Warm pool预先安装自定义包，扩容时减少冷启动准备；lifecycle hook让初始化完成后再进入待命或接流量，动态伸缩响应CPU负载。",
    "result_flow": "混合组当前只支持非加权、纯On-Demand的warm pool；若题干varied CPUs指按vCPU加权，则D不能直接使用，应先调整配置。",
    "options": {
      "A": "maintenance policy不负责执行user data，warmup=0不会减少实际启动。",
      "B": "生命周期能协调准备，但没有预初始化池仍需等待安装。",
      "C": "maintenance policy不是执行初始化脚本的机制。",
      "D": "动态伸缩、预热池与生命周期协调各有对应作用。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-warm-pools.html",
        "title": "EC2 Auto Scaling warm pools",
        "supports": "预热池减少启动延迟，但混合组有支持限制。"
      }
    ],
    "audit_caveat": "混合组当前只支持非加权、纯On-Demand的warm pool；若题干varied CPUs指按vCPU加权，则D不能直接使用，应先调整配置。",
    "audit_status": "confirmed"
  },
  "502": {
    "blocker": "某公司需要将on-premises资料库群组迁移到Amazon RDS。该公司目前混合使用 Microsoft SQL Server、MySQL 和 Oracle 资料库。一些资料库具有自订架构和预存程序。公司应该采取哪些步骤组合来进行迁移？ （选两个。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：SCT评估并辅助转换schema和代码。",
      "D：DMS复制数据库数据到受支持RDS目标。"
    ],
    "solutions": "正确答案为 C、D。SCT评估模式/存储过程的转换工作，DMS迁移表数据并可持续复制，二者分工不同。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "Evaluator评估基础设施成本，不分析SQL过程转换。",
      "B": "MGN复制服务器，不提供数据库模式转换评估。",
      "C": "SCT评估并辅助转换schema和代码。",
      "D": "DMS复制数据库数据到受支持RDS目标。",
      "E": "DataSync不是关系数据库迁移工具。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/SchemaConversionTool/latest/userguide/CHAP_Welcome.html",
        "title": "AWS Schema Conversion Tool",
        "supports": "转换schema及多数数据库代码，不能自动转的部分提供评估。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "corrected"
  },
  "503": {
    "blocker": "一家公司正在将其部落格平台迁移到AWS。公司的 on-premises 伺服器透过 AWS Site-to-Site VPN 连接连接到 AWS。部落格内容每天由多个作者更新多次，并透过网路附加储存 (NAS) 伺服器上的档案共用提供。公司需要在不耽误内容更新的情况下迁移部落格平台。该公司已在多个 Availability Zones 上部署了 Amazon EC2 实例，以在 Application Load Balancer 后面运行博客平台。该公司还需要尽快将 200 TB 存档资料从其on-premises 伺服器移至Amazon S3。哪一种停靠点组合可以满足这些要求？ （选两个。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：EFS可由本地和云端NFS客户端共同挂载。",
      "D：Storage Optimized离线设备适合大体量迁移。"
    ],
    "solutions": "正确答案为 C、D。把共享内容迁到EFS，让本地作者经VPN持续更新、跨AZ EC2同时读取；大批量历史档案用Snowball Edge离线搬入S3。",
    "result_flow": "需计划NFS权限、首次复制/切换与Snow设备当前订购可用性；离线设备服务有历史版本差异。",
    "options": {
      "A": "每周同步会延迟更新。",
      "B": "EBS Multi-Attach不能跨AZ提供本题共享文件语义，每周同步也延迟。",
      "C": "EFS可由本地和云端NFS客户端共同挂载。",
      "D": "Storage Optimized离线设备适合大体量迁移。",
      "E": "Snowcone容量不足承接200TB批量存储。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/efs/latest/ug/whatisefs.html",
        "title": "Amazon EFS",
        "supports": "NFS共享文件存储适合多EC2共同读取。"
      }
    ],
    "audit_caveat": "需计划NFS权限、首次复制/切换与Snow设备当前订购可用性；离线设备服务有历史版本差异。",
    "audit_status": "corrected"
  },
  "504": {
    "blocker": "一家公司计划将旧版 on-premises 应用程式迁移到 AWS。该应用程式是一个 Java Web 应用程序，在 Apache Tomcat 上运行，并带有 PostgreSQL 资料库。该公司无权存取原始程式码，但可以部署应用程式 Java 存档 (JAR) 档案。该应用程式的流量在每个月末都会增加。哪种解决方案能够以最少的营运开销满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：托管平台最接近无需重构迁移。"
    ],
    "solutions": "正确答案为 D。Beanstalk的Tomcat平台与RDS PostgreSQL可尽量复用既有二进制和数据库，ALB/ASG跨AZ提供Web扩展。",
    "result_flow": "Tomcat通常部署WAR包，题目写JAR可能需确认可部署形式；仅有不兼容二进制时并非直接上传就能运行。",
    "options": {
      "A": "自管Tomcat/数据库运维更高，Step Functions不是常规负载伸缩。",
      "B": "自建数据库容器和跨区域Kubernetes引入复杂性。",
      "C": "没有源代码无法按要求重写Python。",
      "D": "托管平台最接近无需重构迁移。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create_deploy_Java.html",
        "title": "Elastic Beanstalk Java platforms",
        "supports": "提供Tomcat等Java部署平台。"
      }
    ],
    "audit_caveat": "Tomcat通常部署WAR包，题目写JAR可能需确认可部署形式；仅有不兼容二进制时并非直接上传就能运行。",
    "audit_status": "confirmed"
  },
  "505": {
    "blocker": "一家公司正在将其on-premises IoT 平台迁移到AWS。此平台由以下元件组成： • MongoDB 集群作为所有收集和处理的物联网资料的资料储存。 • 使用讯息伫列遥测传输(MQTT) 每5 分钟连接到IoT 装置以收集资料的应用程式。 • 定期执行作业以根据IoT 资料产生报表的应用程式。这些作业需要 120-600 秒才能完成运行。 • 在Web 伺服器上执行的Web 应用程式。最终使用者使用 Web 应用程式产生可供公众存取的报告。该公司需要将平台迁移到AWS，以在保持效能的同时减少营运开销。哪种步骤组合能够以最少的营运开销满足这些要求？ （选择三项。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：编排短任务并以对象/CDN发布报告。",
      "D：IoT规则触发Lambda符合MQTT数据摄取。",
      "E：DocumentDB减少数据库节点运维。"
    ],
    "solutions": "正确答案为 A、D、E。IoT Core负责MQTT接入，Lambda转换设备消息，DocumentDB承接兼容MongoDB工作负载；2–10分钟报表可用Step Functions/Lambda，结果S3/CloudFront公开分发。",
    "result_flow": "DocumentDB并非MongoDB全部功能完全兼容，迁移需验证查询与索引；Lambda任务需控制在15分钟内。",
    "options": {
      "A": "编排短任务并以对象/CDN发布报告。",
      "B": "Lambda layer是依赖包，不是临时消息队列。",
      "C": "自管节点EKS比该场景托管函数运维更多。",
      "D": "IoT规则触发Lambda符合MQTT数据摄取。",
      "E": "DocumentDB减少数据库节点运维。",
      "F": "EC2自管MongoDB仍需补丁备份高可用。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/iot/latest/developerguide/iot-rules.html",
        "title": "AWS IoT rules",
        "supports": "IoT规则可处理消息并调用AWS目标。"
      }
    ],
    "audit_caveat": "DocumentDB并非MongoDB全部功能完全兼容，迁移需验证查询与索引；Lambda任务需控制在15分钟内。",
    "audit_status": "confirmed"
  },
  "506": {
    "blocker": "一家公司创建了一个Amazon API Gateway API 并与外部开发团队分享该 API。此 API 使用 AWS Lambda 函数并部署到名为 Production 的阶段。外部开发团队是 API 的唯一使用者。 API 在特定时间的使用量突然增加，导致人们担心成本增加。该公司需要在不重新设计 Lambda 函数的情况下限制成本和使用量。哪一种解决方案能够最具成本效益地满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：使用计划原生提供每key节流与周期配额。"
    ],
    "solutions": "正确答案为 D。API key配usage plan可按该唯一外部消费方设置节流与配额，无需改Lambda；比额外WAF规则更直接。",
    "result_flow": "Usage plan不是严格成本封顶，API key也不是认证机制；仍需授权、预算告警和监控。",
    "options": {
      "A": "改变请求链路且需改函数。",
      "B": "预置并发增加成本，不能限制API调用。",
      "C": "WAF可限速，但额外费用与管理高于原生usage plan。",
      "D": "使用计划原生提供每key节流与周期配额。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-api-usage-plans.html",
        "title": "API Gateway usage plans",
        "supports": "支持节流/配额但为best-effort限制。"
      }
    ],
    "audit_caveat": "Usage plan不是严格成本封顶，API key也不是认证机制；仍需授权、预算告警和监控。",
    "audit_status": "confirmed"
  },
  "507": {
    "blocker": "一家娱乐公司在 Auto Scaling 群组中的一组 Linux Amazon EC2 实例上托管票务服务。票务服务使用定价文件。定价文件储存在具有 S3 标准储存的 Amazon S3 储存桶中。由第三方托管的中央定价解决方案更新定价文件。定价文件每 1-15 分钟更新一次，包含数千个订单项目。当实例启动时，定价档案会下载到每个 EC2 实例。 EC2 实例有时会使用过时的定价讯息，这可能会导致客户收取不正确的费用。哪一种解决方案能够最经济有效地解决这个问题？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：直接读取S3对象路径与现有定价文件对应。"
    ],
    "solutions": "正确答案为 C。Mountpoint把S3对象映射为Linux可读取路径，避免每台实例仅在启动时下载一份永久过期的文件，且不额外部署数据库或文件同步服务。",
    "result_flow": "要关闭或限制缓存并在更新后重新open文件；长期开着的文件句柄和缓存不能保证每次价格即时刷新。",
    "options": {
      "A": "可设计，但新增DynamoDB与转换逻辑，成本复杂性较高。",
      "B": "额外EFS与每次同步函数不是最低额外组件。",
      "C": "直接读取S3对象路径与现有定价文件对应。",
      "D": "EBS Multi-Attach不支持跨AZ普通共享文件方式，新实例还会写旧数据。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/mountpoint-usage.html",
        "title": "Mountpoint configuration",
        "supports": "文件访问映射到S3对象操作并可配置缓存。"
      }
    ],
    "audit_caveat": "要关闭或限制缓存并在更新后重新open文件；长期开着的文件句柄和缓存不能保证每次价格即时刷新。",
    "audit_status": "confirmed"
  },
  "508": {
    "blocker": "某公司有一个应用程序，该应用程式使用 Auto Scaling 组中的 Amazon EC2 实例。品质保证 (QA) 部门需要启动大量短期环境来测试应用程式。应用程式环境目前由部门经理使用AWS CloudFormation模板启动。为了启动堆叠，管理器使用有权使用 CloudFormation、EC2 和 Auto Scaling API 的角色。经理希望允许测试人员启动自己的环境，但不希望向每个使用者授予广泛的权限。哪种设定可以实现这些目标？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：产品加启动角色是标准受控自助部署。"
    ],
    "solutions": "正确答案为 B。Service Catalog product固定获准模板，launch constraint让服务以专用部署角色创建资源，测试员无需直接获得广泛EC2/ASG权限。",
    "result_flow": "部署角色必须信任Service Catalog并具有正确模板资源权限，不能直接假定原经理角色trust已满足。",
    "options": {
      "A": "直接让用户assume经理角色仍扩大授权且模板限制难可靠覆盖。",
      "B": "产品加启动角色是标准受控自助部署。",
      "C": "仅给CloudFormation权限通常还需底层资源权限或服务角色。",
      "D": "Beanstalk不直接使用任意CloudFormation模板创建产品。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/servicecatalog/latest/adminguide/constraints-launch.html",
        "title": "Service Catalog launch constraints",
        "supports": "产品启动可使用指定IAM角色。"
      }
    ],
    "audit_caveat": "部署角色必须信任Service Catalog并具有正确模板资源权限，不能直接假定原经理角色trust已满足。",
    "audit_status": "confirmed"
  },
  "509": {
    "blocker": "一家公司为其电子商务网站使用单一 AWS Region。该网站包含一个 Web 应用程序，该应用程式在 Application Load Balancer (ALB) 后面的多个 Amazon EC2 实例上运行。该网站还包括一个 Amazon DynamoDB 表。 Amazon Route 53 中的自订网域连结到ALB。本公司在AWS证书管理器（ACM）中创建了SSL/TLS证书，并将证书附加到ALB。该公司没有使用内容交付网路作为其设计的一部分。该公司希望在第二个Region内复制其整个应用程式堆叠，以提供灾难复原、规划未来成长并为用户提供更好的存取时间。解决方案架构师需要实施一个解决方案来实现这些目标并最大限度地减少管理开销。解决方案架构师应该采取哪些步骤组合来满足这些要求？ （选择三项。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：IaC复用降低重复部署与漂移。",
      "D：延迟路由对应跨区域访问时延目标。",
      "E：为原表添加副本可复用现有数据。"
    ],
    "solutions": "正确答案为 A、D、E。CloudFormation复用基础设施，延迟路由将用户导向较近区域，扩展原DynamoDB表为global table同步数据。E/F二选一而非一起选，F无必要新表和数据搬迁。",
    "result_flow": "ACM证书需要在第二区域申请或导入；Route53记录应结合健康检查，副本容量与应用冲突策略要验证。",
    "options": {
      "A": "IaC复用降低重复部署与漂移。",
      "B": "手工复制管理成本高。",
      "C": "固定50/50不优化用户延迟。",
      "D": "延迟路由对应跨区域访问时延目标。",
      "E": "为原表添加副本可复用现有数据。",
      "F": "不必要重建表增加迁移工作。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/V2globaltables_HowItWorks.html",
        "title": "DynamoDB global tables",
        "supports": "可在现有表中添加跨区域副本。"
      }
    ],
    "audit_caveat": "ACM证书需要在第二区域申请或导入；Route53记录应结合健康检查，副本容量与应用冲突策略要验证。",
    "audit_status": "corrected"
  },
  "510": {
    "blocker": "一家公司希望为其资料科学家创建一个 Amazon S3 储存桶来储存与工作相关的文件。该公司使用 AWS IAM Identity Center 对所有用户进行身份验证。创建了一个资料科学家小组。该公司希望资料科学家只能存取他们自己的工作成果。该公司还希望创建月度报告，显示每个用户访问了哪些文件。哪一种步骤组合可以满足这些要求？ （选两个。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：permission set结合会话PrincipalTag限制前缀。",
      "C：S3数据事件记录对象访问，Athena可汇总月报。"
    ],
    "solutions": "正确答案为 A、C。Identity Center会话标签驱动ABAC，只允许各自前缀；S3 GetObject等数据操作需要CloudTrail data events，Athena按身份与对象查询。",
    "result_flow": "必须配置Identity Center属性映射，ListBucket用s3:prefix条件，Get/PutObject的Resource限制到个人前缀；不能只添加任意名为path的Condition。",
    "options": {
      "A": "permission set结合会话PrincipalTag限制前缀。",
      "B": "单一组角色整桶读写不区分个人数据。",
      "C": "S3数据事件记录对象访问，Athena可汇总月报。",
      "D": "管理事件不记录每份文档GetObject。",
      "E": "EMRFS不是S3访问日志投递目标。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_variables.html",
        "title": "IAM policy variables",
        "supports": "会话标签可作为权限策略变量。"
      }
    ],
    "audit_caveat": "必须配置Identity Center属性映射，ListBucket用s3:prefix条件，Get/PutObject的Resource限制到个人前缀；不能只添加任意名为path的Condition。",
    "audit_status": "confirmed"
  },
  "511": {
    "blocker": "一家公司在 Amazon EC2 实例上托管资料处理应用程式。该应用程式轮询 Amazon Elastic File System (Amazon EFS) 档案系统以查找新上传的档案。当侦测到新档案时，应用程式会从档案中提取资料并运行逻辑来选择Docker容器映像来处理该档案。应用程式启动适当的容器映像并将档案位置作为参数传递。容器执行的资料处理可能需要长达 2 小时。处理完成后，容器内运行的程式码将档案写回Amazon EFS并退出。该公司需要重构应用程式以消除运行容器的EC2实例。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：S3事件、短选择函数与长时Fargate处理对应工作边界。"
    ],
    "solutions": "正确答案为 C。S3 object-created事件触发短Lambda选择容器并RunTask；2小时处理交给Fargate。EFS本身没有原生逐文件创建通知，Lambda也不能执行2小时。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "EFS不原生发出该逐文件创建事件供EventBridge使用。",
      "B": "不存在该EFS文件创建通知到服务的集成。",
      "C": "S3事件、短选择函数与长时Fargate处理对应工作边界。",
      "D": "Lambda即使用容器镜像仍有15分钟执行上限。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/lambda/latest/dg/with-s3.html",
        "title": "Using Lambda with S3",
        "supports": "S3对象创建可通过通知调用Lambda。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "512": {
    "blocker": "一家媒体公司拥有 30-T8 的数位新闻影片储存库。这些影片储存在on-premises磁带库中的磁带上，并由媒体资产管理 (MAM) 系统引用。该公司希望以自动化的方式丰富这些影片的元数据，并使用 MAM 功能将它们放入可搜寻的目录中。公司必须能够根据影片中的资讯进行搜索，例如物体、风景或人脸。提供了一个目录，其中包含影片中出现的人员的脸孔，其中包括每个人的图像。该公司希望将这些影片迁移到AWS。该公司拥有与 AWS 的高速AWS Direct Connect 连接，并希望直接从其当前的档案系统移动 MAM 解决方案视讯内容。如何透过使用最少的持续管理开销并对现有系统造成最小的干扰来满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：保留文件工作流并利用S3视频分析。"
    ],
    "solutions": "正确答案为 A。File Gateway保留本地文件接口并把视频落为可直接分析的S3对象；Rekognition存储视频异步分析和人脸collection生成元数据回写MAM。",
    "result_flow": "应使用异步Start/Get作业与完成通知，不可在单个Lambda中等待所有长视频处理完。",
    "options": {
      "A": "保留文件工作流并利用S3视频分析。",
      "B": "虚拟磁带数据不能直接作为Rekognition存储视频输入。",
      "C": "历史视频无需改造成实时流，且KVS不按该选项自动持久到S3。",
      "D": "自建OpenCV服务器模型与故障管理更多。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/rekognition/latest/dg/video.html",
        "title": "Stored video analysis",
        "supports": "Rekognition存储视频从S3处理。"
      }
    ],
    "audit_caveat": "应使用异步Start/Get作业与完成通知，不可在单个Lambda中等待所有长视频处理完。",
    "audit_status": "confirmed"
  },
  "513": {
    "blocker": "公司需要优化 AWS Organizations ​​组织中包含多个帐户的 AWS 环境的成本。该公司在 3 年前进行了成本优化活动，并购买了最近过期的Amazon EC2 标准预留实例。公司还需要 EC2 实例 3 年。此外，该公司还部署了新的无伺服器工作负载。哪种策略将为公司节省最多的成本？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：稳定EC2长约加全预付Compute SP覆盖新增计算。"
    ],
    "solutions": "正确答案为 A。已知同样EC2资源还需三年，三年All Upfront标准RI通常提供高折扣；新增Lambda/Fargate等由Compute Savings Plan覆盖。C是No Upfront，D又遗漏serverless覆盖。",
    "result_flow": "serverless泛称不代表全部服务可用Savings Plans；API Gateway/DynamoDB等不在Compute SP覆盖内。还需基于实际用量避免过度承诺。",
    "options": {
      "A": "稳定EC2长约加全预付Compute SP覆盖新增计算。",
      "B": "一年无预付相对三年全预付通常折扣较少。",
      "C": "两类覆盖合理，但No Upfront并非最大折扣方式。",
      "D": "EC2 Instance SP不覆盖Lambda/Fargate。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/savingsplans/latest/userguide/plan-types.html",
        "title": "Savings Plans types",
        "supports": "Compute SP覆盖EC2、Fargate与Lambda；EC2 Instance SP仅特定实例族/区域。"
      }
    ],
    "audit_caveat": "serverless泛称不代表全部服务可用Savings Plans；API Gateway/DynamoDB等不在Compute SP覆盖内。还需基于实际用量避免过度承诺。",
    "audit_status": "corrected"
  },
  "514": {
    "blocker": "一家公司经营一个为全球客户提供服务的静态内容分发平台。客户使用自己的 AWS 帐户中的内容。该公司透过 Amazon S3 储存桶提供其内容。该公司使用 S3 档案闸道将内容从其 on-premises 环境上传到 S3 储存桶。该公司希望透过从距离客户最近的AWS Region 提供内容来提高平台的性能和可靠性。公司必须以最小延迟且不暴露于公共互联网的方式将on-premises资料路由到Amazon S3。哪种步骤组合能够以最少的营运开销满足这些要求？ （选两个。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：托管全局接入与区域路由。",
      "E：DX与PrivateLink组成不走公网的接入路径。"
    ],
    "solutions": "正确答案为 A、E。S3 MRAP提供多区域统一端点与网络路由；本地经DX加PrivateLink访问MRAP避免公网。自建Lambda追踪路由没有必要。",
    "result_flow": "MRAP不会复制数据，参与区域桶必须另行配置CRR或已有完整内容副本；题目只选两项时AE是入口架构，不能省略数据复制前提。",
    "options": {
      "A": "托管全局接入与区域路由。",
      "B": "复制用于确保区域桶内容存在，但单独CRR不提供全局私有路由入口。",
      "C": "自写路由跟踪不如MRAP原生机制。",
      "D": "公网Site-to-Site VPN会跨互联网。",
      "E": "DX与PrivateLink组成不走公网的接入路径。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/MultiRegionAccessPointsPrivateLink.html",
        "title": "MRAP with PrivateLink",
        "supports": "MRAP可用PrivateLink接口端点并结合本地私网连接。"
      }
    ],
    "audit_caveat": "MRAP不会复制数据，参与区域桶必须另行配置CRR或已有完整内容副本；题目只选两项时AE是入口架构，不能省略数据复制前提。",
    "audit_status": "corrected"
  },
  "515": {
    "blocker": "某公司正在将资料中心迁移至AWS云，需要尽快完成迁移。该公司有许多应用程序在数据中心的数百个 VMware 虚拟机上运行。每个虚拟机器都配置有一个共用 Windows 资料夹，其中包含常见的共用档案。档案共享大小超过 100 GB。该公司的合规团队要求每个虚拟机器的每次软体安装和修改都需要编辑和批准变更请求。该公司在 AWS 和资料中心之间拥有 10 GB 频宽的 AWS Direct Connect 连线。公司应采取哪一组步骤才能在最短的时间内完成迁移？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：历史MGN无代理复制与FSx SMB匹配。"
    ],
    "solutions": "正确答案为 C。按题目历史能力，MGN vCenter agentless方案避免给每台VM装代理审批，FSx Windows提供兼容SMB共享。源选项有重复C，需修复后再判分。",
    "result_flow": "原标签A/B/C/C/D应修复为A/B/C/D/E；MGN agentless新部署已不可用，此为历史题，不作为当前直接部署方案。",
    "options": {
      "A": "EFS不是SMB共享，VM Import未提供该MGN编排。",
      "B": "Discovery发现不迁移。",
      "C": "历史MGN无代理复制与FSx SMB匹配。",
      "D": "Snowcone容量与VM导出流程不成立。",
      "E": "不能把每VM代理安装在hypervisor上代替。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/mgn/latest/ug/installing-vcenter-appliance-mgn.html",
        "title": "MGN vCenter Client",
        "supports": "官方标明agentless replication不再向新部署提供。"
      }
    ],
    "audit_caveat": "原标签A/B/C/C/D应修复为A/B/C/D/E；MGN agentless新部署已不可用，此为历史题，不作为当前直接部署方案。",
    "audit_status": "confirmed"
  },
  "516": {
    "blocker": "一家公司在 AWS Organizations ​​的组织中拥有多个 AWS 帐户。该公司需要储存 AWS 帐户活动并使用 SQL 从中央位置查询资料。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：组织event data store和Lake SQL符合要求。"
    ],
    "solutions": "正确答案为 B。组织级CloudTrail Lake event data store集中接收成员账户管理事件，并直接用SQL查询，避免每账户独立查询与聚合。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "多账户日志查询可另行设计，但不是本题直接集中SQL最简方案。",
      "B": "组织event data store和Lake SQL符合要求。",
      "C": "Event history不是任意历史的组织SQL数据仓库。",
      "D": "每账户独立data store默认设置不会自动集中成组织数据。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-lake.html",
        "title": "CloudTrail Lake",
        "supports": "可存储审计事件并以SQL查询。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "517": {
    "blocker": "一家公司正在使用 AWS 来开发和管理其生产 Web 应用程式。该应用程式包括呼叫 AWS Lambda 函数的 Amazon API Gateway HTTP API。 Lambda 函数处理数据，然后将数据储存在资料库中。该公司希望以整合的方式实现Web应用程式的用户授权。该公司已经使用第三方身分提供者为公司的其他应用程式发行OAuth代币。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：自定义authorizer验证令牌并返回授权结果。"
    ],
    "solutions": "正确答案为 A。HTTP API支持Lambda authorizer，可验证第三方IdP的OAuth访问令牌并在所有路由强制授权。",
    "result_flow": "若IdP发兼容JWT也可优先评估原生JWT authorizer；校验issuer/audience/有效期/签名及必要scope。",
    "options": {
      "A": "自定义authorizer验证令牌并返回授权结果。",
      "B": "Directory Service不是API Gateway原生authorizer类型。",
      "C": "Identity Center没有题述零配置HTTP API授权模式。",
      "D": "IAM users不是从外部OAuth参数自动构成签名鉴权的方式。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-lambda-authorizer.html",
        "title": "HTTP API Lambda authorizers",
        "supports": "Lambda authorizer可实现自定义API访问控制。"
      }
    ],
    "audit_caveat": "若IdP发兼容JWT也可优先评估原生JWT authorizer；校验issuer/audience/有效期/签名及必要scope。",
    "audit_status": "confirmed"
  },
  "518": {
    "blocker": "一家公司已将应用程式部署到 AWS 帐户中的数千个 Amazon EC2 实例。安全审核发现多个未加密的 Amazon 弹性块储存 (Amazon EBS) 磁碟区附加到 EC2 实例。本公司的安全策略要求对EBS卷进行加密。该公司需要实施自动化解决方案来加密 EBS 卷。此解决方案还必须防止开发团队创建未加密的EBS卷。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：Config修复历史资源并开启区域默认加密。"
    ],
    "solutions": "正确答案为 D。Config发现未加密卷并触发Automation创建加密替代卷；默认EBS加密保护以后新建卷。现存卷不能通过改一个属性原地加密。",
    "result_flow": "需逐区域启用并限制停用权限；替换已挂载卷需停机/一致性/设备映射编排，不能无条件直接换卷。",
    "options": {
      "A": "KMS key policy不能拒绝不调用该密钥的未加密卷创建。",
      "B": "Fleet Manager不是本题原生EBS加密合规检测器。",
      "C": "同样缺Config的持续合规发现。",
      "D": "Config修复历史资源并开启区域默认加密。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/ebs/latest/userguide/encryption-by-default.html",
        "title": "EBS encryption by default",
        "supports": "默认加密为区域级设置，不自动加密既有资源。"
      }
    ],
    "audit_caveat": "需逐区域启用并限制停用权限；替换已挂载卷需停机/一致性/设备映射编排，不能无条件直接换卷。",
    "audit_status": "confirmed"
  },
  "519": {
    "blocker": "一家公司正在AWS云端中运行大型容器化工作负载。此工作负载由大约 100 个不同的服务组成。该公司使用Amazon Elastic Container Service (Amazon ECS)来协调工作负载。最近，公司开发团队开始在ECS集群中使用AWSFargate代替Amazon EC2实例。过去，工作负载已接近运行帐户中可用的最大数量的EC2实例。公司担心工作量可能会达到允许的最大ECS任务数。解决方案架构师必须实作一个解决方案，当Fargate达到最大任务数的 80% 时，该解决方案将通知开发团队。解决方案架构师应该做什么来满足这个要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：用量/对应服务配额得到百分比并告警。"
    ],
    "solutions": "正确答案为 B。AWS/Usage公布Fargate配额相关用量，CloudWatch SERVICE_QUOTA表达式可计算使用百分比，再用SNS告警。",
    "result_flow": "当前Fargate主要按On-Demand/Spot vCPU配额计量，不能把任务数和vCPU数混为同一单位。",
    "options": {
      "A": "SampleCount不是当前运行任务或vCPU总量。",
      "B": "用量/对应服务配额得到百分比并告警。",
      "C": "硬编码80个任务不是80%且需维护轮询。",
      "D": "Config不以该表达式监控实时资源利用率。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/monitoring-fargate-usage.html",
        "title": "Fargate usage metrics",
        "supports": "AWS/Usage与服务配额结合可监视用量。"
      }
    ],
    "audit_caveat": "当前Fargate主要按On-Demand/Spot vCPU配额计量，不能把任务数和vCPU数混为同一单位。",
    "audit_status": "confirmed"
  },
  "520": {
    "blocker": "一家公司有多个用 Python 写的 AWS Lambda 函数。这些功能使用 .zip 套件部署类型进行部署。这些函数使用 Lambda 层，其中包含 .zip 档案中的公共库和套件。 Lambda .zip 套件和 Lambda 层 .zip 档案储存在 Amazon S3 储存桶中。公司必须实作 Lambda 函数和 Lambda 层的自动扫描以识别 CVE。 Lambda 函数的子集必须接收自动程式码扫描，以侦测潜在的资料外泄和其他漏洞。程式码扫描必须仅针对选定的 Lambda 函数进行，而不是针对所有 Lambda 函数。哪一种行动组合可以满足这些要求？ （选择三项。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：启用Inspector的自动漏洞扫描。",
      "B：同时启用standard与code两种扫描类型。",
      "E：排除标签只控制代码扫描，不关闭标准依赖扫描。"
    ],
    "solutions": "正确答案为 A、B、E。Inspector Lambda standard扫描依赖含layers的CVE，code scanning扫描函数代码；用InspectorCodeExclusion=LambdaCodeScanning排除不应做代码扫描的函数。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "启用Inspector的自动漏洞扫描。",
      "B": "同时启用standard与code两种扫描类型。",
      "C": "GuardDuty检测运行时威胁，不替代静态CVE/代码漏洞扫描。",
      "D": "Lambda Monitor设置不是该Inspector扫描选择机制。",
      "E": "排除标签只控制代码扫描，不关闭标准依赖扫描。",
      "F": "Inspector不以扫描任意S3 zip桶方式完成Lambda code scanning。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/inspector/latest/user/scanning_resources_lambda_code_exclude_functions.html",
        "title": "Exclude Lambda code scans",
        "supports": "官方支持指定排除标签。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "521": {
    "blocker": "一家公司正在改变其应用程式帐户中处理 Amazon EC2 实例修补的方式。该公司目前透过在应用程式帐户中的VPC中使用NAT网关来透过互联网修补实例。该公司在核心帐户的专用私有 VPC 中将 EC2 实例设定为补丁来源储存库。该公司希望使用AWS Systems Manager补丁管理器和核心帐户中的补丁来源储存库来修补应用程式帐户中的EC2实例。公司必须阻止应用程式帐户中的所有EC2实例存取网际网路。应用程式帐户中的EC2实例需要存取储存应用程式资料的Amazon S3。这些 EC2 实例需要连接到 Systems Manager 以及核心帐户中私有 VPC 中的补丁来源储存库。哪种解决方案可以满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：端点加peering分别解决AWS API与跨VPC仓库访问。"
    ],
    "solutions": "正确答案为 C。SSM接口端点和S3端点满足私网AWS服务访问，移除NAT路径阻止互联网出站；VPC peering和双端路由连接私有补丁仓库。",
    "result_flow": "还需核对实例角色、端点安全组、DNS与补丁源依赖，并确保无其他IGW/NAT/代理出站路径。",
    "options": {
      "A": "只封80不能封443公网访问，自建VPN也增加不必要管理。",
      "B": "Private VIF不是对每个AWS服务单独创建的VPC端点。",
      "C": "端点加peering分别解决AWS API与跨VPC仓库访问。",
      "D": "入站80限制不阻止实例出站上网。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/systems-manager/latest/userguide/setup-create-vpc.html",
        "title": "Systems Manager VPC endpoints",
        "supports": "私网节点可使用SSM接口端点并配置S3访问。"
      }
    ],
    "audit_caveat": "还需核对实例角色、端点安全组、DNS与补丁源依赖，并确保无其他IGW/NAT/代理出站路径。",
    "audit_status": "confirmed"
  },
  "522": {
    "blocker": "美国 (US) 的一家公司收购了欧洲的一家公司。两家公司都使用AWS云。这家美国公司建构了一个采用微服务架构的新应用程式。这家美国公司在 us-east-2 Region 的 5 个 VPC 上托管该应用程式。应用程式必须能够存取 eu-west-1 Region 中的一个 VPC 中的资源。但是，应用程式不得存取任何其他VPC。两个 Regions 中的 VPC 没有重叠的 CIDR 范围。所有帐户均已合并到 AWS Organizations ​​的一个组织中。哪一种解决方案能够最具成本效益地满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：五条定向peering覆盖需求且无传递路由。"
    ],
    "solutions": "正确答案为 D。五个美国VPC各自与唯一获准欧洲VPC建立跨区域peering，连接数量小且无TGW小时费；非传递性防止借此访问其他VPC。",
    "result_flow": "检查所选方案是否同时满足协议、权限、容量、可用性和题目指定的优化目标。",
    "options": {
      "A": "单TGW不能跨区域直接附加远端VPC。",
      "B": "区域TGW互联可行但对仅五条目标连接成本更高。",
      "C": "全网状增加不需要的VPC互访与连接数。",
      "D": "五条定向peering覆盖需求且无传递路由。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering.html",
        "title": "VPC peering",
        "supports": "支持不同区域的两个VPC私有互连且不支持传递路由。"
      }
    ],
    "audit_caveat": "",
    "audit_status": "confirmed"
  },
  "523": {
    "blocker": "一家旅游公司建立了一个 Web 应用程序，该应用程式使用 Amazon 简单电子邮件服务 (Amazon SES) 向用户发送电子邮件通知。该公司需要启用日志记录以协助解决电子邮件传送问题。该公司还需要能够根据收件人、主题和发送时间进行搜寻。解决方案架构师应该采取哪些步骤组合来满足这些要求？ （选两个。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：SES事件发布到Firehose/S3提供邮件投递日志。",
      "C：Athena查询S3结构化事件日志。"
    ],
    "solutions": "正确答案为 A、C。SES configuration set将投递/退信等事件送Firehose再入S3，Athena查询事件中的收件人、commonHeaders.subject与时间。",
    "result_flow": "发送邮件时必须关联configuration set并启用所需事件类型。",
    "options": {
      "A": "SES事件发布到Firehose/S3提供邮件投递日志。",
      "B": "CloudTrail主要审计API调用，不能代替完整投递事件发布。",
      "C": "Athena查询S3结构化事件日志。",
      "D": "不是题述SES原生投递日志到普通log group的组合。",
      "E": "CloudWatch联邦查询不是缺失SES事件发布配置的替代。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/ses/latest/dg/event-publishing-retrieving-firehose.html",
        "title": "SES events with Firehose",
        "supports": "事件记录经Firehose交付到S3。"
      }
    ],
    "audit_caveat": "发送邮件时必须关联configuration set并启用所需事件类型。",
    "audit_status": "confirmed"
  },
  "524": {
    "blocker": "一家公司迁移到 AWS 并使用 AWS 业务支援。该公司希望跨 AWS 帐户监控 Amazon EC2 实例的成本效益。 EC2 实例具有部门、业务单位和环境的标签。开发EC2实例成本高但利用率低。公司需要侦测并停止任何未充分利用的开发EC2实例。如果执行个体在过去 14 天内至少有 4 天内平均每日 CPU 利用率为 10% 或更低且网路 I/O 为 5 MB 或更低，则执行个体未充分利用。哪种解决方案能够以最少的营运开销满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "C：复用Trusted Advisor既有检查与事件通知。"
    ],
    "solutions": "正确答案为 C。题干阈值正是Trusted Advisor的低利用率EC2检查；已有Business Support可使用该建议，通过EventBridge/Lambda筛选开发标签后停止实例，比自建统计更省运维。",
    "result_flow": "需启用检查刷新/事件、跨账户权限并设置避免误停的标签筛选。",
    "options": {
      "A": "Dashboard仅展示，不原生生成这个14日规则的检测事件。",
      "B": "需自建利用率采集与条件评估。",
      "C": "复用Trusted Advisor既有检查与事件通知。",
      "D": "保存整套数据和BI报表比原生检查复杂，也不能直接由图表自动停止。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/awssupport/latest/user/cost-optimization-checks.html",
        "title": "Trusted Advisor cost optimization checks",
        "supports": "低利用率检查使用14日内至少4日CPU≤10%、网络≤5MB条件。"
      }
    ],
    "audit_caveat": "需启用检查刷新/事件、跨账户权限并设置避免误停的标签筛选。",
    "audit_status": "corrected"
  },
  "525": {
    "blocker": "一家公司正在 AWS 上托管一个将在未来 3 年运行的专案的申请。该应用程式由 20 个 Amazon EC2 按需实例组成，这些实例在 Network Load Balancer (NLB) 的目标群组中注册。这些实例分布在两个Availability Zones上。该应用程式是无状态的，每周 7 天、每天 24 小时运行。该公司收到用户的报告，称应用程式响应缓慢。效能指标显示，在正常应用程式使用期间，执行个体的 CPU 使用率为 10%。然而，CPU 使用率在繁忙时会增加到 100%，通常会持续几个小时。公司需要一种新的架构来解决应用程式响应缓慢的问题。哪一种解决方案能够最具成本效益地满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "D：较小稳定基线加动态容量匹配峰谷。"
    ],
    "solutions": "正确答案为 D。正常20台仅10%CPU，降低常驻基线并在高峰伸缩到28台；四台RI覆盖长期基础容量，NLB继续承载流量。",
    "result_flow": "四台是选项给定的合理基线，真实最小容量应按CPU、并发、内存和AZ故障演练确定，并配置实际伸缩策略。",
    "options": {
      "A": "常驻至少20台仍浪费大量低谷容量。",
      "B": "固定20按需容量未解决动态高峰。",
      "C": "固定20Spot且无中断保障不能保持可用性目标。",
      "D": "较小稳定基线加动态容量匹配峰谷。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-scale-based-on-demand.html",
        "title": "Dynamic scaling",
        "supports": "依据负载指标自动调整所需容量。"
      }
    ],
    "audit_caveat": "四台是选项给定的合理基线，真实最小容量应按CPU、并发、内存和AZ故障演练确定，并配置实际伸缩策略。",
    "audit_status": "confirmed"
  },
  "526": {
    "blocker": "Accompany 正在建立一个应用程式来收集和传输来自工厂的感测器资料。该应用程式将使用AWS IoT Core 将资料从数百个装置发送到Amazon S3 资料湖。公司必须在将资料载入到Amazon S3之前丰富资料。应用程式将每 5 秒传输一次感测器资料。新的感测器资料必须在应用程式收集资料后 30 分钟内Amazon S3 可用。没有其他应用程式正在处理来自 AWS IoT Core 的感测器资料。哪一种解决方案能够最具成本效益地满足这些要求？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：Basic Ingest加缓冲交付减少无必要消息与小对象开销。"
    ],
    "solutions": "正确答案为 B。无其他订阅者时Basic Ingest绕过MQTT消息broker节费；Firehose缓冲聚合后做Lambda转换和批量S3交付，900秒缓冲在30分钟目标内。",
    "result_flow": "缓冲间隔是交付提示而非硬性端到端SLA，需包含转换、重试和失败处理时间。",
    "options": {
      "A": "每5秒逐消息Lambda/S3写入且付broker消息费。",
      "B": "Basic Ingest加缓冲交付减少无必要消息与小对象开销。",
      "C": "多一层时序库和读取流程。",
      "D": "Kinesis stream与消费者对无其他实时应用场景增加成本管理。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/iot/latest/developerguide/iot-basic-ingest.html",
        "title": "IoT Basic Ingest",
        "supports": "移除发布订阅broker摄取路径，不产生broker messaging费用。"
      }
    ],
    "audit_caveat": "缓冲间隔是交付提示而非硬性端到端SLA，需包含转换、重试和失败处理时间。",
    "audit_status": "corrected"
  },
  "527": {
    "blocker": "一家公司正在从大量物联网设备收集数据。资料储存在Amazon S3资料湖中。资料科学家对在单独的 AWS 帐户中的 VPC 的两个公共子网中运行的 Amazon EC2 实例进行分析。资料科学家需要从 EC2 实例存取资料湖。 EC2 实例已指派有权存取 Amazon S3 的角色。根据公司政策，只有授权网路才允许存取物联网资料。解决方案架构师应该采取哪些步骤组合来满足这些要求？ （选两个。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "B：必须将access point的network origin显式设为指定VPC。",
      "E：桶资源策略按s3:DataAccessPointArn授权指定access point，并应显式防止其他访问绕过。"
    ],
    "solutions": "参考选择为 B、E。跨账户访问数据湖需要在资源侧授予访问，BE构成access point和bucket policy授权组合；仅改EC2身份策略C不能代替另一个账户桶的许可。但题目没有明确B必须建VPC-only access point，因而网络限制要求缺条件。",
    "result_flow": "BE是补齐VPC-only与endpoint条件后的意图答案。原文未说明VPC-only/获准网络且只用Allow不足以排除其他路径，故原题不宜严格判分。",
    "options": {
      "A": "S3 gateway endpoint提供私有路径，但单独创建不限制桶只能从此网络访问。",
      "B": "必须将access point的network origin显式设为指定VPC。",
      "C": "当前role已有权限，追加Allow不会撤销原有更宽授权，也不解决跨账户资源许可。",
      "D": "access point不是路由表下一跳；gateway endpoint才修改路由。",
      "E": "桶资源策略按s3:DataAccessPointArn授权指定access point，并应显式防止其他访问绕过。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-points-vpc.html",
        "title": "VPC-only S3 access points",
        "supports": "access point需指定VPC network origin才限制请求来源。"
      }
    ],
    "audit_caveat": "BE是补齐VPC-only与endpoint条件后的意图答案。原文未说明VPC-only/获准网络且只用Allow不足以排除其他路径，故原题不宜严格判分。",
    "audit_status": "ambiguous"
  },
  "528": {
    "blocker": "一家公司想要将其网站迁移到AWS。该网站使用部署在 on-premises、自我管理的 Kubernetes 集群中的容器。网站的所有资料都储存在 on-premises PostgreSQL 资料库中。公司决定将on-premisesKubernetes集群迁移至Amazon Elastic Kubernetes Service (Amazon EKS)集群。 EKS 集群将使用具有静态节点数的 EKS 受管节点组。该公司也将把on-premises资料库迁移到PostgreSQL资料库的Amazon RDS。解决方案架构师需要在迁移之前估算此工作负载的总拥有成本 (TCO)。哪种解决方案将提供所需的 TCO 资讯？",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：评估工具与成本场景报告对应TCO。"
    ],
    "solutions": "正确答案为 A。Migration Evaluator以采集的利用率/库存建立迁移成本场景并提供Quick Insights，是选项中用于迁前TCO的专门服务。",
    "result_flow": "EKS控制平面、RDS、网络及存储等托管服务费用仍需按目标架构补充估算，不能只拿EC2重托管数字当完整账单。",
    "options": {
      "A": "评估工具与成本场景报告对应TCO。",
      "B": "DMS assessment评估数据库迁移兼容性，Pricing Calculator不自动构成完整原环境TCO对比。",
      "C": "MGN提供复制/测试迁移，不生成该TCO报告。",
      "D": "Cloud Value Framework不是可直接生成用量CUR的服务。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/prescriptive-guidance/latest/migration-tools/discovery-migration-evaluator.html",
        "title": "Migration Evaluator",
        "supports": "用于发现并估算迁移财务收益和成本。"
      }
    ],
    "audit_caveat": "EKS控制平面、RDS、网络及存储等托管服务费用仍需按目标架构补充估算，不能只拿EC2重托管数字当完整账单。",
    "audit_status": "confirmed"
  },
  "529": {
    "blocker": "一家活动公司在AWS上经营一个票务平台。该公司的客户在该平台上配置和安排他们的活动。这些事件导致平台流量大幅增加。本公司知道每个客户活动的日期和时间。该公司在Amazon Elastic Container Service (Amazon ECS)集群上运行该平台。 ECS 群集由 Auto Scaling 群组中的 Amazon EC2 按需实例组成。 Auto Scaling 组使用预测扩展策略。 ECS集群经常向Amazon S3储存桶发出请求以下载票证资产。 ECS集群和S3桶位于同一个AWSRegion和同一个AWS帐户中。 ECS集群和S3储存桶之间的流量经由NAT网关流动。公司需要在不降低平台可用性的情况下优化平台成本。哪一种步骤组合可以满足这些要求？ （选两个。）",
    "requirements": "按英文原题的完整条件比较所有选项；以下结论是根据所列 AWS 资料作出的学习用判断。",
    "steps": [
      "A：S3 gateway endpoint无额外小时/数据处理费。",
      "E：按已知时间设置容量减少多余运行。"
    ],
    "solutions": "正确答案为 A、E。同区域S3改gateway endpoint可消除该流量的NAT处理费；已知事件时间用scheduled scaling精确预扩/缩容，避免不匹配的预测容量。",
    "result_flow": "scheduled scaling必须覆盖活动前启动时间与活动后回落，并保留故障容量；并不表示所有预测伸缩都不合适。",
    "options": {
      "A": "S3 gateway endpoint无额外小时/数据处理费。",
      "B": "50%Spot会引入中断风险，题目要求不降低可用性。",
      "C": "On-Demand Capacity Reservation保证容量但没有价格折扣，不能直接降低实例费。",
      "D": "同区域内部S3访问无需付费传输加速。",
      "E": "按已知时间设置容量减少多余运行。"
    },
    "sources": [
      {
        "url": "https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-scheduled-scaling.html",
        "title": "Scheduled scaling",
        "supports": "可按预先已知时间调整ASG容量。"
      }
    ],
    "audit_caveat": "scheduled scaling必须覆盖活动前启动时间与活动后回落，并保留故障容量；并不表示所有预测伸缩都不合适。",
    "audit_status": "corrected"
  }
};
