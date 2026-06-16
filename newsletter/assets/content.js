// 每月更新入口：
// 1. 复制 issues["2026-06"] 这一整块，改成新月份编号，例如 "2026-09"。
// 2. 替换 monthLabel、cnMonth、sourcePdf、pdfPages 和各版块内容。
// 3. 把 defaultIssue 改成新月份编号，首页会自动显示最新一期。
window.NEWSLETTER_CONTENT = {
  defaultIssue: "2026-06",
  issues: {
    "2026-06": {
      issueCode: "2026.06",
      monthLabel: "June 2026",
      cnMonth: "2026年6月号",
      title: "NEWSLETTER",
      subtitle: "Learning and Vision Atelier",
      sourcePdf: "assets/pdf/2026.06.pdf",
      pdfPages: [
        "assets/pdf-pages/2026-06-page-1.png",
        "assets/pdf-pages/2026-06-page-2.png",
        "assets/pdf-pages/2026-06-page-3.png"
      ],
      stats: [
        { value: "4", label: "论文发表" },
        { value: "5", label: "团队动态" },
        { value: "3", label: "会议截稿" },
        { value: "1", label: "资源推荐" }
      ],
      highlights: [
        {
          label: "Pattern Recognition",
          title: "M3-HOI 被 PR 录用",
          text: "多模态时空图网络面向视频人体-物体交互识别，提升遮挡、高 IoU 阈值和开放集场景下的鲁棒性。"
        },
        {
          label: "RSS 2026",
          title: "TouchGuide 被 RSS 录用",
          text: "在推理阶段用触觉可行性分数引导动作采样，面向接触丰富的机器人操作任务。"
        },
        {
          label: "China3DV & ICRA",
          title: "多位同学线下参会交流",
          text: "同学们分享 poster 展示、demo 观摩、观点碰撞和 idea 沉淀的经验。"
        }
      ],
      spotlight: {
        papers: [
          {
            date: "2026年3月",
            title: "M3-HOI: Multi-modal mining network for video-based human-object interaction recognition",
            people: "硕士生吴波鸿为第一作者，高庆老师为通讯作者",
            venue: "Pattern Recognition",
            badge: "中科院计算机科学一区 TOP 期刊",
            image: "assets/images/ppt-image1.png",
            summary: [
              "视频人体-物体交互识别面临频繁遮挡、细粒度动作区分困难与跨环境泛化能力差等挑战。",
              "论文提出基于时空图的多模态挖掘网络 M3-HOI，引入多几何描述图、几何嵌入、字幕引导和视觉中心的消息聚合模块。",
              "在 MPHOI-72、Bimanual Actions 和 CAD-120 数据集上，M3-HOI 在多项评估指标上优于现有方法。"
            ],
            tags: ["HOI", "多模态", "时空图"]
          },
          {
            date: "2026年4月",
            title: "TouchGuide: Inference-Time Steering of Visuomotor Policies via Touch Guidance",
            people: "博士生麻家骅为共同第一作者",
            venue: "Robotics: Science and Systems",
            badge: "机器人领域顶会 RSS",
            image: "assets/images/ppt-image2.png",
            summary: [
              "现有视触觉策略常停留在特征级融合或策略级组合，难以在动作空间中实现有效协同。",
              "TouchGuide 在推理时先由视觉运动策略生成粗略动作，再用任务特定的接触物理模型输出触觉感知可行性分数，引导去噪或流匹配后期的动作采样。",
              "论文同时开发了低成本、高精度、可提供直接触觉反馈的 TacUMI 数据采集系统。"
            ],
            tags: ["触觉引导", "机器人操作", "扩散策略"]
          },
          {
            date: "2026年5月",
            title: "EAGPnP: Efficient and Accurate Generalized-Perspective-n-Point Solution via Optimized Null Space Analysis",
            people: "博士生张逸为第一作者，郭裕兰老师为通讯作者",
            venue: "IEEE Transactions on Robotics",
            badge: "CCF B 类期刊",
            image: "assets/images/ppt-image3.png",
            summary: [
              "多相机系统位姿估计需要高效精确地求解广义透视 n 点问题，现有方法在效率和精度之间存在权衡。",
              "EA-GPnP 基于旋转元素建立零空间分析模型，避免噪声敏感的中间变量，并针对平面配置设计专用求解分支。",
              "真实与合成实验表明，该方法在评估指标、速度、数值性能和噪声鲁棒性上均表现突出。"
            ],
            tags: ["gPnP", "位姿估计", "多相机系统"]
          },
          {
            date: "2026年6月",
            title: "GeoStyler: A Generalizable Geometry-aware Diffusion-based Approach for Direct 3D Gaussian Style Transfer",
            people: "博士生胡启滨为第一作者，郭裕兰老师为通讯作者",
            venue: "IEEE Transactions on Image Processing",
            badge: "CCF A 类期刊",
            image: "assets/images/ppt-image10.png",
            summary: [
              "从稀疏视图进行直接 3D 场景风格化仍面临速度慢、几何畸变和风格纹理与结构冲突等挑战。",
              "GeoStyler 用几何一致的扩散生成、混合查询机制和解耦重建网络，在数秒内生成高保真、多视图一致的风格化 3D 场景。",
              "在 RealEstate10K、ACID 等基准上，GeoStyler 在风格化质量、多视图一致性和速度上达到先进性能。"
            ],
            tags: ["3D Gaussian", "风格迁移", "扩散模型"]
          }
        ],
        teamUpdates: [
          {
            date: "3月29日",
            title: "校园开放日活动",
            image: "assets/images/ppt-image6.jpeg",
            text: "SAIL 部分同学前往深圳河套学院，参加 2026 年“探秘科研前沿，邂逅 SAIL 风采”校园开放日活动，参观具身智能与计算机视觉中心等科研展区，并与河套学院及国内外师生交流。"
          },
          {
            date: "4月17日",
            title: "China3DV 2026 参会",
            image: "assets/images/ppt-image5.png",
            text: "第五届中国三维视觉大会在杭州举办期间，郭裕兰教授带领部分教师和学生参会，围绕三维重建、具身智能等专题与学界和产业界专家交流。"
          },
          {
            date: "5月19日",
            title: "博士毕业答辩",
            image: "assets/images/ppt-image7.png",
            text: "祝贺王宇坤同学顺利完成博士毕业答辩。"
          },
          {
            date: "5月20日",
            title: "硕士毕业答辩",
            image: "assets/images/ppt-image9.jpeg",
            text: "祝贺实验室研三同学顺利完成硕士毕业答辩。"
          },
          {
            date: "5月31日",
            title: "ICRA 2026 参会",
            image: "assets/images/ppt-image8.jpeg",
            text: "ICRA 2026 于奥地利维也纳举行期间，课题组成先锋、赖缘川、谭佳颖三位同学前往参会，并以海报形式展示各自研究工作。"
          }
        ]
      },
      interview: {
        intro: "本期邀请参加 China3DV 的汪怡、姚傅明，以及参加 ICRA 的成先锋，分享线下参会的观察、收获与建议。",
        people: [
          { id: "all", name: "全部" },
          { id: "wangYi", name: "汪怡" },
          { id: "yaoFuming", name: "姚傅明" },
          { id: "chengXianfeng", name: "成先锋" }
        ],
        questions: [
          {
            question: "这次参会给你留下最深印象的是什么？为什么它让你印象比较深？",
            answers: {
              wangYi: "最让我印象深刻的是 poster session。我分享了前段时间发表在 CVPR 上的 MangoBench，从被动听转为主动介绍自己的工作，吸引了越来越多人停下来深入交流。大家提出的问题给了我新的视角和改进建议，也让我认识了同样在做 LLM Agent 生成方向的同行，这种线下连接感很真实，也很宝贵。",
              yaoFuming: "给我印象最深的不只是某一个 talk 或 poster，而是不同交流形式带来的信息差。报告呈现的是完整凝练的逻辑，poster 和 demo 则能进一步了解作者为什么选择这个问题、实验中遇到哪些困难，以及论文中没有充分展开的局限。很多真正有启发的信息并不一定写在论文里。",
              chengXianfeng: "给我留下最深印象的是 poster 交流环节。这是我第一次出国参加国际顶会，起初担心自己的工作受众较窄，但会场上大家都很积极开放。一个半小时里几乎一直有同行驻足讨论技术细节。我也对 ICRA 展商区的 demo 印象深刻，例如人形机器人精细操作和跳跃无人机展示。"
            }
          },
          {
            question: "参会之后，有没有发现之前没太关注、但现在觉得值得了解的方向或问题？",
            answers: {
              wangYi: "虞晶怡老师分享的 Towards Agentic 3D Vision 让我印象很深。他提到当前绝大多数 3D 视觉论文都在处理非常“干净”的场景，这让我重新思考自己的重建和生成研究是否也默认了干净假设。如果把方法放到更 messy、更不可控的真实环境中，哪些设计仍然成立，哪些需要改进？",
              yaoFuming: "参会后，我更加关注三维视觉与生成模型、具身智能以及真实场景应用之间的结合。以前读论文更关注模型结构和最终指标，这次会议让我意识到，数据如何构建、评价标准是否合理、方法能否在复杂真实环境中稳定工作，同样重要。",
              chengXianfeng: "多位学者围绕理想的具身智能操作系统和控制架构发表见解。目前主要有端到端数据驱动大模型，以及经典控制理论与现代深度学习结合两类路线。我个人更倾向于解释性更高的后者，这次参会也进一步坚定了我继续探索经典控制理论与深度学习、大模型融合路线的信心。"
            }
          },
          {
            question: "这次会议有没有激发新的 idea？线下参会和自己读论文有什么不同？",
            answers: {
              wangYi: "很多新想法是在 poster 分享和私下交流中慢慢浮现的。当你一边讲自己的工作，一边被不同的人追问“有没有试过”“换成这个 setting 会怎样”，大脑会被迫跳出熟悉叙事，去面对各种边界情况，这正是 idea 容易产生的时刻。",
              yaoFuming: "这次会议确实产生了一些新的想法，但它们更多来自不同信息之间的连接。听完报告后觉得某种方法有意思，在 poster 环节和作者交流，或和同行讨论它在其他任务中的适用性时，才逐渐形成可继续探索的问题。线下交流最大的价值是增加了观点碰撞的密度。",
              chengXianfeng: "现场确实萌生了一些新的科研想法。通过在 poster 展区浏览并与同行面对面交流，我厘清了手头工作的局限，也逐渐明确了后续扩展为期刊论文的技术路径。线下参会能在短时间内聚焦核心，直接向作者询问论文中未提及的实验细节，并自然建立学术联络。"
            }
          },
          {
            question: "如果给刚开始做科研的低年级同学建议，参会前、中、后应该如何准备和沉淀？",
            answers: {
              wangYi: "参会前可以看看大会议程，提前关注有哪些老师作报告，熟悉感兴趣老师近期的代表作。这样听报告时不至于一头雾水，也会对论文有不一样的理解。参会后可以做简短笔记，记录哪些 idea 有意思，哪些文献可以精读。",
              yaoFuming: "参会前可以准备三份清单：最想听的报告、最想弄清楚的问题、希望交流的老师或同学。现场听报告重点记录它解决什么问题、核心假设是什么、证据是否充分、还有什么没有解决。参会后一两天内整理笔记，把内容分为值得继续阅读的工作、可以联系的人和可能发展的 idea。",
              chengXianfeng: "科研初期要厚积薄发，培养学术品味；明确 idea 后尽快通过核心实验验证可行性，并大胆开始写论文。参会前要精准规划，筛选与课题强相关的环节；参会中积极记录、主动对话；参会后趁热打铁，把素材和交流笔记整理成可执行的研究方案或思考心得。"
            }
          }
        ]
      },
      events: {
        deadlines: [
          { date: "2026/06/21", name: "ACML", fullName: "Asian Conference on Machine Learning" },
          { date: "2026/07/06", name: "ACCV", fullName: "Asian Conference on Computer Vision" },
          { date: "2026/07/28", name: "AAAI", fullName: "AAAI Conference on Artificial Intelligence" }
        ]
      },
      resources: {
        title: "Notion",
        contributor: "蔡萌",
        image: "assets/images/ppt-image12.png",
        text: [
          "本期介绍 Notion 这一综合型效率工具。作为集笔记记录、知识管理、任务规划与团队协作于一体的平台，Notion 能显著提升学习与工作的整理效率。",
          "开发者和学生可通过页面、数据库、看板、日历等模块，搭建个人知识库、项目进度表、论文资料库和待办清单，将分散的信息统一管理起来。",
          "建议从学习笔记、任务清单和资料收藏库等基础页面开始，把 Notion 融入日常工作流。"
        ]
      },
      contact: {
        email: "lavanewsletter@163.com",
        chiefEditor: "郭裕兰老师",
        editors: ["蔡萌", "熊锐", "黎逸雄"]
      }
    }
  }
};
