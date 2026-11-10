/* Shared beginner lessons. Question-specific reasoning comes from the existing explanations. */
'use strict';

const learningAssetBase = typeof document !== 'undefined' && document.currentScript
  ? new URL('.', document.currentScript.src).href : '';
const learningLessonCache = new Map();
const LEARNING_EXTRA_TERMS = [
  { id: 'iot-core', name: 'AWS IoT Core', abbr: 'IoT Core', aliases: ['AWS IoT', 'IoT Core', 'IoT 核心'], function: '连接物联网设备的托管服务，让设备安全地发送和接收消息。', analogy: '像设备和云端之间的消息接线中心，不用自己维护消息服务器。', source: 'https://docs.aws.amazon.com/iot/latest/developerguide/what-is-aws-iot.html' },
  { id: 'mqtt', name: 'MQTT', abbr: 'MQTT', aliases: ['MQTT'], function: '一种轻量的发布 / 订阅消息协议，常用于设备与云端之间传递消息。', analogy: '设备订阅自己关心的频道，有消息就收取，需要上报时再发布。', source: 'https://docs.aws.amazon.com/iot/latest/developerguide/mqtt.html' },
  { id: 'x509', name: 'X.509 证书', abbr: 'X.509', aliases: ['X.509'], function: '一种数字证书。在 AWS IoT 中，可以用证书验证设备身份；设备还需要对应的私钥和访问策略。', analogy: '像设备的身份证；有身份证也不代表能访问所有资源。', source: 'https://docs.aws.amazon.com/iot/latest/developerguide/x509-client-certs.html' },
  { id: 'capacity-reservation', name: 'On-Demand Capacity Reservation', abbr: '按需容量预留', aliases: ['On-Demand Capacity Reservation', 'On-Demand Capacity Reservations', '按需容量预留', 'Capacity Reservation'], function: '为指定可用区中的 EC2 实例预留计算容量。容量保障与价格折扣是不同的事情，预留本身不会自动带来折扣。', analogy: '像提前订好座位，保证有位置，但不代表票价更便宜。', source: 'https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-capacity-reservations.html' },
  { id: 'iot-thing', name: 'AWS IoT Thing', abbr: 'Thing（事物）', aliases: ['AWS IoT thing', 'Thing'], function: '在 AWS IoT 注册表中代表设备或其他对象的一条记录，用来组织名称、属性及关联信息。', analogy: '像给设备建一份云端档案；档案和设备本身不是一回事。', source: 'https://docs.aws.amazon.com/iot/latest/developerguide/thing-registry.html' }
];

const LEARNING_QUESTION_GUIDES = {
  1: {
    blocker: '公司想把内部域名统一交给 AWS 管理，同时让本地机房和多个 VPC 都能查到这些域名。专线和网络中转枢纽已经存在，现在还需要把“查询地址”的路径接好。',
    requirements: '内部域名保存在私有托管区域；所有需要查询的 VPC 都要关联；本地机房也要能通过已有网络查询',
    solutions: '先分清两件事：DNS 负责“查到地址”，应用再按地址“连接业务”。私有托管区域保存域名记录；关联 VPC 后，VPC 内可以查询。本地 DNS 则把特定域名交给 AWS 的入站解析器查询。因此，这道题既要关联全部相关 VPC，也要接好本地到入站解析器的转发路径。',
    steps: ['把私有托管区域关联到所有需要查询的 VPC，相当于允许它们查询这本内部通讯录。', '在共享服务 VPC 建立入站解析器，给本地 DNS 一个查询 AWS 内部域名的入口。', '本地 DNS 遇到 cloud.example.com 时，按条件转发规则把查询交给入站解析器。', '通过已有 Direct Connect 和 Transit Gateway 访问入站端点；应用拿到私有 IP 后，再连接真正的业务资源。'],
    diagram_after: 'flowchart TB\n subgraph DNS["第一段：先查到地址"]\n A["本地应用要访问内部域名"] --> B["本地 DNS：按域名转发"]\n B -->|"经已有 DX + TGW 网络"| C["Inbound Resolver：接收查询"]\n C --> D["PHZ：查询域名记录"]\n D --> E["把业务资源的私有 IP 返回应用"]\n end\n subgraph BUSINESS["第二段：再连接业务"]\n E --> F["应用按 IP 发起业务请求"]\n F --> G["经已有 DX + TGW 网络"]\n G --> H["真正的 EC2 / ALB 等业务资源"]\n end'
  },
  2: {
    solutions: '只复制应用还不够：备用区域也必须有可用的数据，并且用户要能找到它。另一套 API Gateway + Lambda 负责接手请求，DynamoDB 全球表提供跨区域的数据副本，Route 53 故障转移记录配合健康检查决定何时把域名解析到备用入口。'
  },
  3: {
    solutions: '把“账户怎么分组”和“权限被谁限制”分开看。OU 用来分组账户，SCP 给成员账户设置权限边界。本题把新账户暂放到 Onboarding OU，并把原本位于根层的限制移到 Production OU，避免新账户继续继承根层限制。注意：SCP 的 Allow 并不直接授予操作权限，还需要相应 IAM 或资源策略允许操作。'
  },
  73: {
    blocker: '几千台设备要实时发送和接收消息，还必须让云端辨认每一台设备。题目要求使用 MQTT 和独立的 X.509 证书，并尽量少维护服务器。',
    solutions: '设备需要三样东西：能收发消息的通道、能验证身份的证书，以及允许它操作的策略。IoT Core 已提供相应的设备连接和消息能力，不必再自己维护 MQTT 消息服务器。Thing 是云端设备档案，证书用于验证身份，策略则控制设备能做哪些操作。'
  },
  100: {
    solutions: '同步调用意味着主应用要一直等待第三方处理。把任务先交给 SQS 后，主应用可以与处理方分开工作，再由消费者处理队列中的任务。重试、幂等处理和失败监控需要配合配置；消息进入死信队列意味着需要继续处理，并不代表业务任务已经完成。'
  }
};

const LEARNING_TERM_ALIASES = {
  'vpc-gateway-endpoint': ['gateway VPC endpoint', 'gateway VPC endpoints', '网关 VPC 端点', '网关VPC端点', '网关端点'],
  'vpc-interface-endpoint': ['interface VPC endpoint', 'interface VPC endpoints', '接口端点', '接口 VPC 端点'],
  'route53-failover-routing': ['failover records', '故障转移记录'],
  'route53-health-check': ['health checks'],
  'availability-zone': ['AZ', 'AZs', '可用区']
};

// Everyday comparisons describe one aspect of a service, not its complete implementation.
const LEARNING_TERM_HELP = {
  dns: ['把域名转换成 IP 地址，让应用知道要连接到哪里。', '像查通讯录：知道名字，先查出地址，再去找对方。', '查到地址和成功连接是两件事；还要检查网络与访问权限。'],
  route53: ['AWS 的 DNS 服务，管理域名解析，也支持按健康状态等规则选择解析结果。', '像负责查地址和指路的前台。', 'DNS 返回目标地址，业务请求通常再由客户端直接发给目标。'],
  'route53-inbound-resolver': ['接收从本地网络发往 AWS 的 DNS 查询，使本地能够查询关联的私有域名。', '像 AWS 内网通讯录的查询窗口，本地 DNS 可以来这里问地址。', '入站是“本地查 AWS”；出站则是“AWS 查本地”。'],
  'route53-outbound-resolver': ['把 VPC 中特定域名的 DNS 查询转发到本地或其他网络的 DNS 服务器。', '像从 AWS 内网向外部通讯录发起查询的窗口。', '要根据转发规则确定哪些域名交给哪个 DNS 服务器。'],
  'route53-private-hosted-zone': ['保存私有域名及其对应记录，供关联的 VPC 等受控网络查询。', '像公司内部通讯录，里面是名字与地址的对应关系。', '它保存 DNS 记录；真正运行应用的是记录指向的资源。'],
  vpc: ['AWS 中逻辑隔离的虚拟网络，可以在里面安排子网、路由和安全规则。', '像云端的一片独立园区，里面的楼栋需要道路和门禁才能互通。', '在同一个 VPC 中，也不等于所有资源都自动能互相访问。'],
  'direct-connect': ['通过专用网络连接把本地网络接入 AWS。', '像公司到云端修了一条专用道路。', '道路连通后，仍要设置路由、DNS 和需要的安全控制。'],
  'transit-gateway': ['连接多个 VPC 和本地网络的网络中转枢纽。', '像多条道路汇合的交通枢纽，减少逐个网络互连的复杂度。', '能转发流量不等于能解析域名，网络和 DNS 要分别考虑。'],
  ec2: ['云端的虚拟服务器，可以安装操作系统、软件并运行应用。', '像租一台远程电脑；你仍要管理里面运行的软件。', '增加服务器数量前，要考虑会话、共享数据和流量如何分配。'],
  lambda: ['由事件或请求触发执行代码的服务，无需自行管理底层服务器。', '像按需叫来处理一项任务的工作人员。', '不用管理服务器，不等于没有运行时间、权限和并发等限制。'],
  s3: ['按“对象”存储文件和数据的服务，每个对象通过桶和键来定位。', '像一个用编号取件的大型仓库。', '对象存储、服务器磁盘和共享文件系统，使用方式不同。'],
  ebs: ['为 EC2 提供块存储卷，供操作系统当作磁盘使用。', '像装在服务器上的一块硬盘。', '多台服务器共享文件时，需要另外核对挂载与文件系统的限制。'],
  efs: ['托管的共享文件系统，可以让多个计算资源通过 NFS 访问文件。', '像多台服务器一起使用的共享文件夹。', '适合共享文件的需求；不要和 S3 对象存储、EBS 磁盘混为一谈。'],
  sqs: ['让生产者先存入消息、消费者随后取出处理的消息队列服务。', '像待办任务箱：先放进去，处理方按自己的速度领取。', '失败重试需要正确配置；应用也要考虑重复消息和处理失败。'],
  sns: ['把发布的消息推送给订阅者的发布 / 订阅服务。', '像广播通知，同一条消息可以通知多个接收方。', '要区分“通知多个人”和“把任务排队等待处理”的需求。'],
  eventbridge: ['根据事件及匹配规则，把事件送往相应目标的服务。', '像按内容把消息分发给不同部门的调度台。', '先看题目需要事件路由、任务队列，还是多步骤工作流。'],
  'step-functions': ['用状态机组织多个处理步骤、分支、等待和错误处理。', '像一张可执行的办事流程单。', '需要编排多个步骤时，再考虑如何处理重试、超时与分支。'],
  'api-gateway': ['为应用提供 API 入口，接收请求并与后端服务集成。', '像对外办事窗口，按接口规则把请求交给后端。', '入口接收请求；具体业务通常由后端服务执行。'],
  alb: ['处理 HTTP / HTTPS 请求的负载均衡器，支持按主机名或路径等规则分配请求。', '像能看懂办事内容的接待员，把请求分给合适的柜台。', '需要网站路径、域名或 HTTP 会话相关能力时，要关注应用层。'],
  nlb: ['在传输层分配 TCP / UDP 等连接的负载均衡器。', '像按连接把车辆分到不同车道的分流器。', '选择负载均衡器时，先看协议与流量入口的要求。'],
  cloudfront: ['利用分布在多地的边缘节点交付内容、降低用户访问延迟。', '像把常用商品提前放到离顾客更近的配送站。', '边缘缓存、后端扩容、数据库优化分别解决不同问题。'],
  dynamodb: ['托管的 NoSQL 键值和文档数据库。', '像按预定索引快速查找记录的资料柜。', '需要先理解访问模式、分区键以及一致性和容量要求。'],
  rds: ['帮助管理关系型数据库的服务，减少自行维护数据库基础设施的工作。', '像租一个有管理员协助维护的数据库机房。', '高可用备机和用于分担读取的副本，目的不完全一样。'],
  aurora: ['兼容 MySQL 或 PostgreSQL 的关系型数据库，采用集群架构。', '像一个数据库团队：写入与读取可以由不同角色承担。', '区分写入节点、读取副本和底层存储各自负责的工作。'],
  'aurora-replica': ['Aurora 中用于处理只读请求的副本，也可参与故障转移。', '像专门回答查询的助手，帮助主节点分担读取工作。', '增加读副本主要扩展读取能力。'],
  'aurora-writer': ['Aurora 集群中负责写入的节点。', '像负责修改正式账本的记账员。', '不要把增加读副本理解成可以增加任意数量的写入节点。'],
  'read-replica': ['通过复制数据库数据建立的只读副本，用来分担读取等工作。', '像提供查询的账本副本。', '读取扩展与故障恢复需要分别核对，不能只看“有副本”。'],
  elasticache: ['把常用数据放在内存中供应用快速读取的托管缓存服务。', '像把常用材料放在手边，减少每次去仓库取货。', '要考虑缓存过期、数据更新和未命中时如何读取原始数据。'],
  iam: ['控制谁可以对哪些 AWS 资源执行哪些操作的身份和权限服务。', '像为不同人员发放不同权限的门禁卡。', '身份验证说明“你是谁”，权限策略决定“你能做什么”。'],
  scp: ['在 AWS Organizations 中约束成员账户权限上限的组织级策略。', '像公司统一规定的权限红线，部门不能自行越过。', 'SCP 本身不授予权限；仍需要 IAM 或资源策略允许相应操作。'],
  ou: ['AWS Organizations 中用于把账户分组的组织单元。', '像存放同类账户的文件夹，便于统一应用组织策略。', '移动账户会影响继承的组织策略，要检查上层策略。'],
  organizations: ['集中组织和管理多个 AWS 账户的服务。', '像集团总部管理多个分公司的账户与统一规则。', '账户是管理边界；OU 负责分组，SCP 负责限制权限上限。'],
  kms: ['创建和管理加密密钥，并控制密钥使用权限的服务。', '像管理保险柜钥匙的钥匙管理员。', '能读取存储资源，不一定就有权使用解密密钥。'],
  'secrets-manager': ['管理密码、API 密钥等敏感信息，并支持配置自动轮换。', '像保管并定期更换密码的保险箱。', '应用需要合适的权限才能读取机密。'],
  cloudwatch: ['收集指标、日志等运行信息，并设置告警的监控服务。', '像系统的仪表盘和报警器。', '关注运行状态；审计“谁调用了什么 API”则要区分 CloudTrail。'],
  cloudtrail: ['记录 AWS 账户中的 API 活动等操作事件，用于审计和追踪。', '像记录谁在什么时候做了什么的操作登记簿。', '操作记录和应用性能监控是不同的需求。'],
  config: ['记录资源配置及变化，并评估配置是否符合规则。', '像检查设备设置是否合规的巡检员。', '关注资源如何配置；不要和用户操作审计混淆。'],
  'auto-scaling': ['按策略调整计算资源数量，适应负载变化。', '像根据客流增加或减少营业柜台。', '资源数量调整、健康检查和负载分配需要配合使用。'],
  'availability-zone': ['AWS 区域内由一个或多个独立数据中心组成的隔离位置。', '像同一城市里相互隔离的多个机房园区。', '跨可用区和跨区域是两种不同的故障隔离范围。'],
  region: ['AWS 在一个地理区域部署的一组基础设施，包含多个可用区。', '像在不同城市设立的云服务基地。', '选择区域时，要考虑距离、合规、服务支持和跨区域恢复。'],
  'multi-az': ['把资源部署到多个可用区，以应对单个可用区的故障。', '像在同一地区准备多个独立营业地点。', '具体能否分担读取或自动切换，要看服务与部署模式。'],
  nat: ['通过地址转换让私有网络资源向外发起连接；公有 NAT 网关常用于私有子网访问互联网。', '像统一的出站出口，外部看到的是出口地址。', '出站上网、外部主动访问，以及私有访问 AWS 服务，是不同场景。'],
  'vpc-gateway-endpoint': ['通过 VPC 路由表访问 S3 或 DynamoDB 的网关端点，无需经过 NAT 网关。', '像从园区直达指定仓库的通道，省去绕互联网出口。', '只适用于支持的服务和访问范围；不能把它当成任意服务的通用端点。'],
  'vpc-interface-endpoint': ['通过 VPC 中的网络接口，以 PrivateLink 私有访问受支持的服务。', '像服务在你的园区里设立的专用接待窗口。', '与网关端点的支持范围和计费方式不同。'],
  'disaster-recovery': ['为严重故障后恢复业务而准备的数据、系统和操作方案。', '像提前安排备用营业地点和恢复流程。', '先明确允许丢失多少数据，以及多久必须恢复。'],
  rpo: ['故障后最多能接受丢失多长时间范围内的数据。', '像问“最多能丢掉最近几分钟的账”。', '它描述可容忍的数据损失，不是恢复系统耗时。'],
  rto: ['业务中断后，目标是在多长时间内恢复。', '像问“停业后多久必须重新开门”。', '它描述恢复时间，不是最多允许丢多少数据。']
};

function learningEscape(value) {
  return String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function learningPlain(value) {
  const replacements = {
    '唔可以': '不能', '唔好': '不要', '唔系': '不是', '唔係': '不是', '唔使': '不需要', '唔到': '不到', '唔啱': '不合适',
    '而家': '目前', '呢个': '这个', '呢种': '这种', '边个': '哪个', '边部': '哪台', '入嚟': '加入',
    '喺': '在', '嘅': '的', '冇': '没有', '唔': '不', '伺服器': '服务器', '资料库': '数据库', '资料': '数据',
    '网路': '网络', '网域': '域名', '储存': '存储', '快取': '缓存', '执行个体': '实例', '帐户': '账户',
    '连线': '连接', '营运': '运维', '档案': '文件', '设定': '设置', '使用者': '用户', '讯息': '消息',
    '伫列': '队列', '程式': '程序', '支援': '支持', '复写': '复制', '身分': '身份', '地端': '本地机房',
    '备援': '备用', '丛集': '集群', '自订': '自定义', '相容': '兼容', '效能': '性能', '透过': '通过', '装置': '设备'
  };
  let text = String(value ?? '');
  for (const [from, to] of Object.entries(replacements)) text = text.split(from).join(to);
  return text.replace(/(?<![\u3400-\u9fff])同(?= AWS|各 VPC|所有 VPC|数据|应用|网络|错误|安全|权限)/g, '和').replace(/系(?=标准|负责|用来)/g, '是');
}

function learningAliases(term) {
  return [...new Set([term.abbr, term.name, term.full_name, ...(term.aliases || []), ...(LEARNING_TERM_ALIASES[term.id] || [])].filter(x => x && x.length > 1 && !(term.id === 'vpc-interface-endpoint' && x.toLowerCase() === 'vpc endpoint')))]
    .map(alias => new RegExp('(?<![a-z0-9])' + alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/ /g, '\\s*') + '(?![a-z0-9])', 'i'));
}

const learningTermIndex = (typeof GLOSSARY_TERMS === 'undefined' ? [] : GLOSSARY_TERMS).concat(LEARNING_EXTRA_TERMS)
  .filter(term => !['amazon', 'aws'].includes(term.id)).map(term => ({ ...term, matchers: learningAliases(term) }));

function learningHasTerm(term, text) { return term.matchers.some(pattern => pattern.test(text)); }

function learningTerms(q, exp, uncertain) {
  const answers = q.options.filter(o => q.correct_answers.includes(o.letter)).map(o => (o.text_zh || '') + ' ' + o.text).join(' ');
  const question = q.question + ' ' + (q.question_zh || '');
  const reasoning = uncertain ? '' : [exp.requirements, ...(exp.steps || []), exp.solutions].join(' ');
  return learningTermIndex.map(term => {
    const inAnswer = learningHasTerm(term, answers);
    let score = (inAnswer ? 12 : 0) + (learningHasTerm(term, question) ? 5 : 0) + (learningHasTerm(term, reasoning) ? 4 : 0);
    if (score && inAnswer && (term.id.startsWith('route53-') || term.id.startsWith('vpc-') || term.id === 'capacity-reservation')) score += 9;
    if (score && (LEARNING_TERM_HELP[term.id] || term.analogy)) score += 2;
    const help = LEARNING_TERM_HELP[term.id];
    return { ...term, score, meaning: learningPlain(help ? help[0] : term.function), analogy: help ? help[1] : term.analogy || '', watch: help ? help[2] : '' };
  }).filter(term => term.score).sort((a, b) => b.score - a.score || b.abbr.length - a.abbr.length).slice(0, 10);
}

function getLearningLesson(q) {
  if (learningLessonCache.has(q.id)) return learningLessonCache.get(q.id);
  const original = typeof QUESTION_EXPLANATIONS === 'undefined' ? {} : QUESTION_EXPLANATIONS[q.id] || {};
  const exp = { ...original, ...(LEARNING_QUESTION_GUIDES[q.id] || {}) };
  const card = typeof QUICK_ANSWER_CARDS === 'undefined' ? {} : QUICK_ANSWER_CARDS[q.id] || {};
  const dispute = typeof DISPUTED_QUESTIONS === 'undefined' ? null : DISPUTED_QUESTIONS[q.id];
  const markedAnswers = Object.keys(exp.options || {}).filter(letter => /^\s*[✓✔]/.test(exp.options[letter]));
  const mismatch = Boolean(card.legacyMismatch || (markedAnswers.length && markedAnswers.slice().sort().join() !== q.correct_answers.slice().sort().join()));
  const uncertain = Boolean(mismatch || dispute || card.disputed);
  const requirements = uncertain ? card.questionCues || [q.question_zh || q.question] : String(exp.requirements || '').split(/(?:\d+[)）]\s*)|[；;\n]+/).map(x => x.trim()).filter(Boolean);
  const answers = q.options.filter(o => q.correct_answers.includes(o.letter));
  const lesson = {
    q, exp, card, dispute, mismatch, uncertain, answers,
    scenario: learningPlain(uncertain ? q.question_zh || q.question : exp.blocker || q.question_zh || q.question),
    requirements: requirements.map(learningPlain),
    steps: (uncertain ? answers.map(o => `${o.letter}：${o.text_zh || o.text}`) : exp.steps || []).map(learningPlain),
    conclusion: learningPlain(String(exp.solutions || exp.solution || '').replace(/^正确答案(?:是|为)?[^。]*[。]\s*/, '')),
    result: learningPlain(exp.result_flow || ''),
    terms: learningTerms(q, exp, uncertain)
  };
  learningLessonCache.set(q.id, lesson);
  return lesson;
}

function learningTermCard(term) {
  const sentences = term.meaning.match(/[^。！？]+[。！？]?/g) || [term.meaning];
  const meaning = sentences.slice(0, 2).join('');
  const url = term.source || learningAssetBase + 'glossary/index.html?term=' + encodeURIComponent(term.id);
  return `<article class="lesson-term"><h4>${learningEscape(term.abbr)}</h4><p class="lesson-term-name">${learningEscape(term.name)}</p><p>${learningEscape(meaning)}</p>${term.analogy ? `<p class="lesson-analogy"><b>打个比方</b>${learningEscape(term.analogy)}</p>` : ''}<a href="${learningEscape(url)}" target="_blank" rel="noopener">${term.source ? '阅读 AWS 官方说明' : '在术语表中继续了解'} ↗</a></article>`;
}

function learningDiagram(code, caption, result) {
  return `<figure class="lesson-diagram"><figcaption>${learningEscape(caption)}<span class="lesson-diagram-hint">图较宽时，可以左右滑动查看</span></figcaption><div class="lesson-diagram-canvas" aria-label="${learningEscape(caption)}"><pre class="learning-mermaid" hidden>${learningEscape(learningPlain(code))}</pre><p class="lesson-diagram-status" role="status">正在绘制示意图…</p></div>${result ? `<p class="lesson-diagram-caption"><b>跟着箭头读</b>${learningEscape(result)}</p>` : ''}</figure>`;
}

function buildLearningReview(q) {
  const l = getLearningLesson(q);
  const e = learningEscape;
  const warning = l.uncertain ? `<aside class="lesson-caution"><strong>${l.mismatch ? '旧解析与当前答案不一致，先核对再记忆' : '这道题有争议，题库答案不等于通用结论'}</strong><p>${l.dispute ? e(learningPlain(l.dispute.reason)) : '下面保留当前题库选项，并解释相关名词；旧解析的结论和架构图暂不作为学习依据。'}</p>${l.dispute ? `<p>题库：${e(l.dispute.current)} · 社区：${e(l.dispute.community)}。社区投票也需要结合条件核对。</p>` : ''}</aside>` : '';
  const terms = l.terms.slice(0, 4).map(learningTermCard).join('');
  const extraTerms = l.terms.length > 4 ? `<details class="lesson-more-terms"><summary>再认识 ${l.terms.length - 4} 个相关名词</summary><div class="lesson-term-grid">${l.terms.slice(4).map(learningTermCard).join('')}</div></details>` : '';
  const options = q.options.map(o => `<article class="lesson-option ${q.correct_answers.includes(o.letter) ? 'lesson-option-correct' : ''}"><h4>${e(o.letter)} · ${q.correct_answers.includes(o.letter) ? '题库答案' : '其他选项'}</h4><p>${e(learningPlain(o.text_zh || o.text))}</p>${!l.uncertain && l.exp.options?.[o.letter] ? `<p class="lesson-option-reason">${e(learningPlain(l.exp.options[o.letter]))}</p>` : ''}</article>`).join('');
  const visual = l.uncertain
    ? `<div class="lesson-check-flow" aria-label="核对思路"><div><b>先看条件</b><p>${e(l.requirements[0] || l.scenario)}</p></div><span aria-hidden="true">↓</span><div><b>逐项核对</b><p>当前题库选择 ${e(q.correct_answers.join(' + '))}；确认每一项是否满足题目限制。</p></div><span aria-hidden="true">↓</span><div><b>保留疑问</b><p>对照争议说明与服务文档，核对后再总结规律。</p></div></div>`
    : learningDiagram(l.exp.diagram_after, '采用题库方案后：每个组件怎样配合', l.result) + `<details class="lesson-before"><summary>对比：原来的问题出在哪里？</summary>${learningDiagram(l.exp.diagram_before, '改进前：题目描述的现状', '')}</details>`;
  const watch = l.terms.find(term => term.watch)?.watch;
  return `<section class="learning-review" tabindex="-1" data-question-id="${e(q.id)}" aria-label="第 ${e(q.id)} 题，小白解析">
    <header class="lesson-header"><div><span class="lesson-kicker">边做题，边理解</span><h2>把这道题讲明白</h2></div><span class="lesson-answer">题库答案 ${e(q.correct_answers.join(' + '))}</span></header>
    ${warning}
    <div class="lesson-scenario"><h3>先看懂：这题在解决什么？</h3><p>${e(l.scenario)}</p><ul>${l.requirements.map(r => `<li>${e(r)}</li>`).join('')}</ul></div>
    <section class="lesson-section"><h3><span>01</span> 本题知识点</h3><p class="lesson-intro">${l.uncertain ? '先理解题目条件与服务用途；当前选项如下，不能把存疑的旧结论直接当成原理。' : e(l.conclusion)}</p><ol class="lesson-steps">${l.steps.map((step, i) => `<li><span class="lesson-step-number">${i + 1}</span><p>${e(step.replace(/^\d+[.、)）]\s*/, ''))}</p></li>`).join('')}</ol></section>
    <section class="lesson-section"><h3><span>02</span> 名词解释 · 不懂缩写也能看</h3><p class="lesson-subtitle">先认识本题用到的组件，再看它们为什么要搭配使用。</p><div class="lesson-term-grid">${terms}</div>${extraTerms}</section>
    <section class="lesson-section"><h3><span>03</span> 图文理解 · 跟着流程走一遍</h3>${visual}</section>
    <details class="lesson-options"><summary>逐项对照：为什么选它，其他选项差在哪里？</summary>${options}</details>
    <section class="lesson-takeaway"><h3>下次再遇到，先这样想</h3><p>${e(watch || learningPlain(l.card.avoid || '先列出题目条件，再检查方案是否全部满足。'))}</p><details><summary>理解自测：试着用自己的话说一遍</summary><p>这题要解决什么问题？${l.terms[0] ? `${e(l.terms[0].abbr)} 在这里负责什么？` : ''}如果少了其中一个步骤，哪项要求可能无法满足？</p><p>回看上面的条件、步骤和图，能把它们连起来，就比只记答案字母更进一步。</p></details></section>
  </section>`;
}

let learningMermaidPromise;
function loadLearningMermaid() {
  if (typeof mermaid !== 'undefined') return Promise.resolve(mermaid);
  if (!learningMermaidPromise) learningMermaidPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = learningAssetBase + 'vendor/mermaid.min.js';
    script.onload = () => resolve(window.mermaid);
    script.onerror = () => { learningMermaidPromise = null; script.remove(); reject(new Error('Diagram library unavailable')); };
    document.head.appendChild(script);
  });
  return learningMermaidPromise;
}

let learningDiagramSerial = 0;
async function renderLearningDiagrams(container) {
  if (!container) return;
  const nodes = [...container.querySelectorAll('pre.learning-mermaid')].filter(node => !node.dataset.rendering && !node.closest('details:not([open])'));
  if (!nodes.length) return;
  nodes.forEach(node => { node.dataset.rendering = 'true'; });
  try {
    const engine = await loadLearningMermaid();
    if (!window.__sapLearningMermaidReady) {
      engine.initialize({ startOnLoad: false, securityLevel: 'strict', theme: 'base', themeVariables: { primaryColor: '#edf5f1', primaryTextColor: '#193e34', primaryBorderColor: '#82b6a2', lineColor: '#658d7e', fontFamily: 'system-ui, sans-serif' }, flowchart: { htmlLabels: false, curve: 'linear', useMaxWidth: true } });
      window.__sapLearningMermaidReady = true;
    }
    for (const node of nodes) {
      if (!node.isConnected) continue;
      try {
        let code = node.textContent.replace(/<br\s*\/?\s*>/gi, '\n');
        if (window.matchMedia('(max-width: 600px)').matches) code = code.replace(/^(flowchart|graph)\s+(LR|RL)\b/, '$1 TB');
        const { svg } = await engine.render('learning-diagram-' + (++learningDiagramSerial), code);
        if (!node.isConnected) continue;
        const canvas = node.parentElement;
        canvas.innerHTML = svg;
        const diagram = canvas.querySelector('svg');
        diagram.setAttribute('role', 'img');
        diagram.setAttribute('aria-label', canvas.getAttribute('aria-label'));
        const naturalWidth = Number((diagram.getAttribute('viewBox') || '').split(/\s+/)[2]);
        if (naturalWidth) diagram.style.minWidth = Math.min(naturalWidth, 560) + 'px';
      } catch (_) {
        if (node.isConnected) node.parentElement.innerHTML = '<p class="lesson-diagram-status">本图暂未显示，可按上面的解题步骤和下方文字理解流程。</p>';
      }
    }
  } catch (_) {
    nodes.forEach(node => { if (node.isConnected) node.parentElement.innerHTML = '<p class="lesson-diagram-status">示意图暂未加载，解题步骤和流程文字仍可阅读。</p>'; });
  }
}

if (typeof document !== 'undefined') document.addEventListener('toggle', event => {
  if (event.target.tagName === 'DETAILS' && event.target.open && event.target.querySelector('.learning-mermaid')) renderLearningDiagrams(event.target);
}, true);
