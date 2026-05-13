export const profile = {
  name: "李上一",
  school: "山东大学",
  college: "计算机科学与技术学院菁英班",
  major: "计算机科学与技术",
  degree: "本科",
  period: "2023.09 - 2027.07",
  email: "202300130120@mail.sdu.edu.cn",
  github: "https://github.com/SDLSY",
  githubText: "github.com/SDLSY",
  homepage: "https://sdlsy.github.io/",
  gpa: "91.52 / 100",
  rank: "12 / 228",
  rankPercent: "前 5.26%",
  cet: "CET-4 551；CET-6 489；英语演讲与辩论 97",
  focusLine: "戒指式可穿戴健康管理智能体原型系统；戒指式可穿戴设备盲文触摸信号识别",
  focusTags: ["可穿戴感知", "健康管理智能体", "端云协同", "时序信号识别"],
  interests: ["可穿戴计算", "移动感知", "健康计算", "端侧智能", "时序信号识别"],
  courses: [
    "计算机网络 98",
    "离散数学 97",
    "高等数学 I/II 97/94",
    "数据库系统 95",
    "线性代数 94",
    "计算机组成原理 93",
    "概率论 92",
    "电路与电子技术基础 100"
  ],
  projects: [
    {
      id: "health-agent",
      label: "核心项目",
      title: "戒指式可穿戴多源生理信号驱动的健康管理智能体原型系统",
      shortTitle: "健康管理智能体原型系统",
      period: "2025.11 - 2026.03",
      subtitle: "山东产业技术研究院（青岛）计算医学工程中心产学研合作项目；全国大学生软件创新大赛 2026 年全国三等奖。",
      image: "/assets/project-health-agent-gpt-image.png",
      imageAlt: "健康管理智能体原型系统界面",
      points: [
        "面向睡眠恢复与居家健康管理场景，参与构建以戒指式可穿戴设备为数据入口的端云协同健康管理原型，串联生理信号采集、状态分析、AI 问诊、报告理解、建议生成与干预反馈流程。",
        "负责 Android 多模块应用与核心数据链路开发，完成 BLE 设备接入、实时数据展示、本地记录管理、云端接口对接和 AI 辅助功能调试。",
        "接入真实戒指式传感硬件，围绕 PPG、心率、血氧、体温、三轴加速度和三轴陀螺仪等多模态信号，完成采集、解析、展示与同步链路。",
        "联调结构化问诊、风险分层、RAG 上下文、医检报告理解和干预任务生成模块，将用户状态整理为可追踪的健康建议与执行反馈。"
      ],
      tags: ["Android", "BLE", "Room/SQLite", "Next.js", "Supabase", "RAG"]
    },
    {
      id: "braille-imu",
      label: "科研探索",
      title: "基于戒指式可穿戴设备的盲文触摸信号识别",
      shortTitle: "戒指式 IMU 盲文触摸信号识别",
      period: "2026.04 - 至今",
      subtitle: "在老师指导下开展；面向戒指式可穿戴设备 IMU 信号的盲文触摸动作识别与端侧实时识别探索。",
      image: "/assets/project-braille-imu-gpt-image.png",
      imageAlt: "戒指式 IMU 信号采集示意图",
      points: [
        "使用戒指式 IMU 采集设备采集 6 轴惯性数据，构建 26 个英文盲文字母触摸动作的单被试初步实验数据集，每类不少于 100 组，共 2600 组有效样本。",
        "搭建 Android 采集、CSV 清洗、基线校正、信号分段、特征提取和分类评估流程，对比手工时序特征、MiniROCKET、MultiRocketHydra 与小波包去噪等方法。",
        "在严格时序划分下将识别准确率由约 81% 提升至 87.2%，并分析单会话采集带来的 session bias 与跨用户泛化限制。"
      ],
      tags: ["IMU", "Android 采集", "Python", "CSV 清洗", "时序分类评估"]
    }
  ],
  skills: [
    {
      title: "编程与工程开发",
      text: "C/C++、Python、Java/Kotlin Android、TypeScript；Git、Linux、Android 多模块开发与接口联调。"
    },
    {
      title: "移动感知与时序评估",
      text: "BLE 接入、传感器采集、PPG/心率/血氧/体温/IMU 解析；CSV 清洗、分段、特征提取与分类评估。"
    },
    {
      title: "端云协同与 AI 应用",
      text: "Room/SQLite、Next.js、Supabase、REST API；结构化问诊、RAG、报告理解、健康建议生成。"
    }
  ],
  awards: [
    "全国大学生软件创新大赛：2026 年全国三等奖、2025 年华东赛区二等奖",
    "蓝桥杯全国软件和信息技术专业人才大赛：C/C++ 程序设计大学 A 组省赛一等奖",
    "全国大学生数学建模竞赛：省二等奖",
    "奖学金与综合荣誉：一等学业奖学金、二等学业奖学金、校级三好学生、山东大学黑客松二等奖、SDU Talk 铜奖、山东省优秀社会实践奖"
  ]
};
