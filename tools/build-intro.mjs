import fs from "node:fs";
import path from "node:path";
import PptxGenJS from "pptxgenjs";
import { profile } from "../src/data/profile.js";

const root = path.resolve(new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const publicDir = path.join(root, "public");
const introDir = path.join(publicDir, "intro");
const filesDir = path.join(publicDir, "files");
const assetDir = path.join(publicDir, "assets");

const colors = {
  red: "A60B16",
  redDark: "7D0710",
  redSoft: "FFF1F2",
  ink: "111827",
  muted: "5B6472",
  line: "EAD7D9",
  paper: "FFFFFF",
  soft: "FAFAFA"
};

let pptx;

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function list(items) {
  return items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
}

function tagRow(items) {
  return items.map((item) => `<span>${escapeHtml(item)}</span>`).join("");
}

const slides = [
  {
    title: "封面",
    section: "Self Introduction",
    body: `
      <div class="cover-grid">
        <div>
          <p class="kicker">${profile.school} · ${profile.college}</p>
          <h1>${profile.name}</h1>
          <p class="lead">面向保研与科研交流，聚焦可穿戴感知、健康管理智能体、端云协同与时序信号识别。</p>
          <div class="tag-row">${tagRow(profile.focusTags)}</div>
        </div>
        <img class="portrait" src="/assets/resume-photo-li-shangyi-red-bg-gpt-image-2.jpg" alt="${profile.name}证件照" />
      </div>
    `,
    footer: `${profile.email} · ${profile.githubText}`
  },
  {
    title: "个人概况",
    section: "01",
    body: `
      <p class="kicker">Profile</p>
      <h2>${profile.school}${profile.major}本科生</h2>
      <div class="metric-grid">
        <div><b>${profile.gpa}</b><span>GPA</span></div>
        <div><b>${profile.rank}</b><span>专业成绩排名（${profile.rankPercent}）</span></div>
        <div><b>CET-4 551</b><span>CET-6 489；英语演讲与辩论 97</span></div>
      </div>
      <p class="wide-text">核心课程：${profile.courses.join("、")}。</p>
    `,
    footer: `${profile.period} · ${profile.college}`
  },
  {
    title: "项目主线",
    section: "02",
    body: `
      <p class="kicker">Direction</p>
      <h2>从戒指式传感接入，到健康智能体与时序识别</h2>
      <div class="flow">
        <div><b>设备接入</b><span>BLE、PPG、心率、血氧、体温、IMU</span></div>
        <div><b>数据链路</b><span>Android、Room/SQLite、云端接口同步</span></div>
        <div><b>智能辅助</b><span>结构化问诊、RAG、报告理解、干预任务</span></div>
        <div><b>实验评估</b><span>CSV 清洗、信号分段、特征提取、分类评估</span></div>
      </div>
    `,
    footer: profile.focusLine
  },
  {
    title: profile.projects[0].shortTitle,
    section: "03",
    body: `
      <div class="project-grid">
        <div class="media-frame"><img src="${profile.projects[0].image}" alt="${profile.projects[0].imageAlt}" /></div>
        <div>
          <p class="kicker">${profile.projects[0].period}</p>
          <h2>${profile.projects[0].title}</h2>
          <p class="subtitle">${profile.projects[0].subtitle}</p>
          <ul>${list(profile.projects[0].points.slice(0, 3))}</ul>
        </div>
      </div>
    `,
    footer: profile.projects[0].tags.join(" · ")
  },
  {
    title: "健康管理闭环",
    section: "04",
    body: `
      <p class="kicker">Health Agent Prototype</p>
      <h2>把传感指标整理为可追踪的健康建议与执行反馈</h2>
      <div class="loop-grid">
        <div><b>1. 感知输入</b><span>戒指式可穿戴设备采集生理与运动信号</span></div>
        <div><b>2. 状态分析</b><span>睡眠恢复、风险分层、用户状态整理</span></div>
        <div><b>3. AI 辅助</b><span>结构化问诊、RAG 上下文、医检报告理解</span></div>
        <div><b>4. 干预反馈</b><span>健康建议生成、干预任务与执行反馈</span></div>
      </div>
      <p class="wide-text">个人贡献集中在 Android 多模块应用、核心数据链路、BLE 接入、云端接口对接与 AI 辅助功能联调。</p>
    `,
    footer: "山东产业技术研究院（青岛）计算医学工程中心产学研合作项目"
  },
  {
    title: profile.projects[1].shortTitle,
    section: "05",
    body: `
      <div class="project-grid reverse">
        <div>
          <p class="kicker">${profile.projects[1].period}</p>
          <h2>${profile.projects[1].title}</h2>
          <p class="subtitle">${profile.projects[1].subtitle}</p>
          <ul>${list(profile.projects[1].points)}</ul>
        </div>
        <div class="media-frame"><img src="${profile.projects[1].image}" alt="${profile.projects[1].imageAlt}" /></div>
      </div>
    `,
    footer: profile.projects[1].tags.join(" · ")
  },
  {
    title: "技术能力",
    section: "06",
    body: `
      <p class="kicker">Skills</p>
      <h2>设备、数据、应用与实验流程的贯通能力</h2>
      <div class="skill-grid">
        ${profile.skills.map((skill) => `<div><h3>${escapeHtml(skill.title)}</h3><p>${escapeHtml(skill.text)}</p></div>`).join("")}
      </div>
    `,
    footer: "C/C++ · Python · Java/Kotlin Android · TypeScript"
  },
  {
    title: "竞赛与荣誉",
    section: "07",
    body: `
      <p class="kicker">Awards</p>
      <h2>竞赛结果与综合表现</h2>
      <div class="award-grid">${profile.awards.map((award) => `<div>${escapeHtml(award)}</div>`).join("")}</div>
    `,
    footer: "算法训练 · 工程开发 · 协作表达"
  },
  {
    title: "总结",
    section: "Q&A",
    body: `
      <p class="kicker">Thank You</p>
      <h2>希望继续围绕可穿戴健康感知与端侧智能做深入训练</h2>
      <p class="lead">目前优势是有从设备接入、移动端开发、端云联调到时序信号实验评估的连续实践经历。后续希望在导师指导下，进一步补足科研方法、实验设计、模型评估与论文表达能力。</p>
      <div class="contact-row">
        <a href="mailto:${profile.email}">${profile.email}</a>
        <a href="${profile.github}">${profile.githubText}</a>
        <a href="/cv.pdf">sdlsy.github.io/cv.pdf</a>
      </div>
    `,
    footer: `${profile.name} · ${profile.school}${profile.major}`
  }
];

function buildHtml() {
  const slideHtml = slides.map((slide, index) => `
    <section class="slide ${index === 0 ? "active" : ""}" data-title="${escapeHtml(slide.title)}">
      <div class="sheet">
        <header class="slide-head">
          <div class="brand"><img src="/assets/sdu-emblem.png" alt="山东大学校徽" /><span>${escapeHtml(profile.school)}</span></div>
          <div class="section-mark">${escapeHtml(slide.section)}</div>
        </header>
        <main class="content">${slide.body}</main>
        <footer class="slide-foot"><span>${escapeHtml(slide.title)}</span><span>${escapeHtml(slide.footer)}</span></footer>
      </div>
    </section>`).join("");

  return `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${profile.name}保研自我介绍在线演示。" />
    <title>${profile.name}｜保研自我介绍</title>
    <style>
      :root{color-scheme:light;--red:#${colors.red};--red-dark:#${colors.redDark};--red-soft:#${colors.redSoft};--ink:#${colors.ink};--muted:#${colors.muted};--line:#${colors.line};--paper:#fff;--soft:#${colors.soft};font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI","Microsoft YaHei","PingFang SC",sans-serif}
      *{box-sizing:border-box}html,body{margin:0;min-height:100%;background:#fff;color:var(--ink)}body{overflow:hidden}a{color:inherit;text-decoration:none}img{display:block;max-width:100%}.deck{position:relative;width:100vw;height:100vh;overflow:hidden;background:linear-gradient(90deg,rgba(166,11,22,.045) 0 1px,transparent 1px 76px),linear-gradient(0deg,rgba(166,11,22,.04) 0 1px,transparent 1px 76px),#fff}.slide{position:absolute;inset:0;display:grid;place-items:center;padding:clamp(18px,3vw,42px);opacity:0;pointer-events:none;transform:translateX(4%);transition:opacity .2s ease,transform .24s ease}.slide.active{opacity:1;pointer-events:auto;transform:translateX(0)}.sheet{position:relative;display:grid;grid-template-rows:auto 1fr auto;width:min(1440px,calc(100vw - 44px));aspect-ratio:16/9;max-height:calc(100vh - 44px);border:1px solid var(--line);background:var(--paper);box-shadow:0 22px 64px rgba(80,18,24,.12);overflow:hidden}.sheet:before{content:"";position:absolute;inset:0 auto 0 0;width:8px;background:var(--red)}.slide-head,.slide-foot{position:relative;z-index:1;display:flex;align-items:center;justify-content:space-between;gap:24px;padding:clamp(18px,2vw,30px) clamp(30px,4vw,62px)}.slide-head{padding-bottom:8px}.slide-foot{padding-top:8px;color:var(--muted);font-size:clamp(12px,1vw,15px)}.brand{display:inline-flex;align-items:center;gap:12px;color:var(--red);font-weight:900}.brand img{width:clamp(34px,3vw,46px);height:clamp(34px,3vw,46px);object-fit:contain}.section-mark{color:var(--muted);font-weight:900}.content{position:relative;z-index:1;padding:0 clamp(34px,4.2vw,74px);min-height:0}.kicker{margin:0 0 12px;color:var(--red);font-size:clamp(16px,1.35vw,21px);font-weight:900}h1,h2,h3,p{margin-top:0}h1{margin-bottom:20px;font-size:clamp(60px,7.5vw,112px);line-height:1;letter-spacing:0}h2{margin-bottom:22px;font-size:clamp(34px,4vw,62px);line-height:1.1;letter-spacing:0}h3{margin-bottom:10px;font-size:clamp(20px,1.8vw,30px);line-height:1.25}p,li{color:#2f3b4c;font-size:clamp(17px,1.45vw,23px);line-height:1.55}.lead{max-width:900px;font-size:clamp(20px,1.7vw,28px)}.cover-grid,.project-grid{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(260px,.9fr);gap:clamp(30px,4vw,68px);align-items:center}.project-grid.reverse{grid-template-columns:minmax(0,.95fr) minmax(260px,1.05fr)}.portrait{justify-self:end;width:min(28vw,320px);border:5px solid #fff;box-shadow:0 20px 48px rgba(90,18,24,.22)}.tag-row,.contact-row{display:flex;flex-wrap:wrap;gap:12px}.tag-row span{border:1px solid var(--line);background:var(--red-soft);color:var(--red-dark);padding:8px 13px;font-size:clamp(13px,1vw,16px);font-weight:900}.metric-grid,.flow,.loop-grid,.skill-grid,.award-grid{display:grid;gap:16px}.metric-grid{grid-template-columns:repeat(3,minmax(0,1fr));margin:20px 0 26px}.metric-grid div,.flow div,.loop-grid div,.skill-grid div,.award-grid div{border-left:5px solid var(--red);background:#fbf8f8;padding:18px 20px}.metric-grid b{display:block;color:var(--red-dark);font-size:clamp(28px,3.2vw,48px);line-height:1.05}.metric-grid span,.flow span,.loop-grid span{display:block;margin-top:8px;color:var(--muted);font-weight:800}.wide-text{max-width:1040px}.flow,.loop-grid,.skill-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.media-frame{display:grid;place-items:center;min-height:360px;border:1px solid var(--line);background:#fbf8f8;padding:20px}.media-frame img{max-height:410px;object-fit:contain}.subtitle{color:var(--muted);font-weight:800}.bullet-list,ul{margin:0;padding-left:1.15em}.bullet-list li+li,li+li{margin-top:10px}.award-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.award-grid div{font-size:clamp(17px,1.35vw,22px);font-weight:800}.contact-row a{border-bottom:2px solid rgba(166,11,22,.28);color:var(--red-dark);font-size:clamp(17px,1.45vw,22px);font-weight:900}.controls{position:fixed;right:22px;bottom:18px;z-index:10;display:flex;align-items:center;gap:10px}.control-btn,.counter{border:1px solid var(--line);background:rgba(255,255,255,.9);color:var(--red-dark);font-weight:900}.control-btn{display:grid;place-items:center;width:42px;height:42px;cursor:pointer;font-size:22px}.counter{min-width:68px;padding:10px 12px;color:var(--muted);text-align:center;font-size:13px}
      .project-grid h2{font-size:clamp(30px,3.2vw,48px);line-height:1.12}.project-grid p,.project-grid li{font-size:clamp(15px,1.25vw,19px);line-height:1.48}
      @media(max-width:900px){body{overflow:auto}.deck{height:auto;min-height:100vh;overflow:visible}.slide{position:relative;display:none;min-height:100vh;padding:12px}.slide.active{display:grid}.sheet{width:100%;aspect-ratio:auto;min-height:calc(100vh - 24px);max-height:none}.cover-grid,.project-grid,.project-grid.reverse,.metric-grid,.flow,.loop-grid,.skill-grid,.award-grid{grid-template-columns:1fr}.project-grid .media-frame{display:none}.portrait{justify-self:start;width:min(64vw,250px)}.slide-foot{align-items:flex-start;flex-direction:column;padding-bottom:116px;gap:8px}.slide-foot span:last-child{display:none}.controls{right:auto;left:50%;bottom:14px;transform:translateX(-50%)}}
    </style>
  </head>
  <body>
    <main class="deck" aria-live="polite">${slideHtml}</main>
    <nav class="controls" aria-label="幻灯片导航">
      <button class="control-btn" type="button" data-prev aria-label="上一页">‹</button>
      <div class="counter" data-counter>1 / ${slides.length}</div>
      <button class="control-btn" type="button" data-next aria-label="下一页">›</button>
    </nav>
    <script>
      const slides = Array.from(document.querySelectorAll(".slide"));
      const counter = document.querySelector("[data-counter]");
      let index = Math.max(0, Math.min(slides.length - 1, Number.parseInt(location.hash.replace("#", ""), 10) - 1 || 0));
      function render(){slides.forEach((slide,i)=>slide.classList.toggle("active",i===index));counter.textContent=\`\${index+1} / \${slides.length}\`;document.title=\`${profile.name}｜\${slides[index].dataset.title || "保研自我介绍"}\`;history.replaceState(null,"",\`#\${index+1}\`)}
      function go(next){index=Math.max(0,Math.min(slides.length-1,next));render()}
      document.querySelector("[data-prev]").addEventListener("click",()=>go(index-1));
      document.querySelector("[data-next]").addEventListener("click",()=>go(index+1));
      window.addEventListener("keydown",(event)=>{if(["ArrowRight","PageDown"," "].includes(event.key)){event.preventDefault();go(index+1)}if(["ArrowLeft","PageUp"].includes(event.key)){event.preventDefault();go(index-1)}if(event.key==="Home"){event.preventDefault();go(0)}if(event.key==="End"){event.preventDefault();go(slides.length-1)}});render();
    </script>
  </body>
</html>`;
}

function addHeader(slide, section) {
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 0.08, h: 7.5, fill: { color: colors.red }, line: { color: colors.red } });
  slide.addImage({ path: path.join(assetDir, "sdu-emblem.png"), x: 0.48, y: 0.28, w: 0.38, h: 0.38 });
  slide.addText(profile.school, { x: 0.94, y: 0.3, w: 2.1, h: 0.28, fontFace: "Microsoft YaHei", fontSize: 13, bold: true, color: colors.red });
  slide.addText(section, { x: 11.2, y: 0.32, w: 1.55, h: 0.26, fontFace: "Microsoft YaHei", fontSize: 12, bold: true, color: colors.muted, align: "right" });
}

function addFooter(slide, left, right = "") {
  slide.addText(left, { x: 0.62, y: 7.04, w: 6.7, h: 0.24, fontFace: "Microsoft YaHei", fontSize: 9, color: colors.muted });
  slide.addText(right, { x: 7.6, y: 7.04, w: 5.1, h: 0.24, fontFace: "Microsoft YaHei", fontSize: 9, color: colors.muted, align: "right" });
}

function addTitle(slide, kicker, title, y = 1.05) {
  slide.addText(kicker, { x: 0.78, y, w: 6.8, h: 0.28, fontFace: "Microsoft YaHei", fontSize: 13, bold: true, color: colors.red });
  slide.addText(title, { x: 0.78, y: y + 0.34, w: 9.9, h: 0.85, fontFace: "Microsoft YaHei", fontSize: 31, bold: true, color: colors.ink, fit: "shrink" });
}

function addBulletList(slide, items, x, y, w, fontSize = 14) {
  slide.addText(items.map((text) => ({ text, options: { bullet: { type: "ul" }, breakLine: true } })), {
    x,
    y,
    w,
    h: 2.7,
    fontFace: "Microsoft YaHei",
    fontSize,
    color: "2F3B4C",
    breakLine: false,
    fit: "shrink",
    paraSpaceAfterPt: 8
  });
}

function addCard(slide, x, y, w, h, title, body) {
  slide.addShape(pptx.ShapeType.rect, { x, y, w, h, rectRadius: 0.04, fill: { color: "FBF8F8" }, line: { color: colors.line, width: 1 } });
  slide.addShape(pptx.ShapeType.rect, { x, y, w: 0.06, h, fill: { color: colors.red }, line: { color: colors.red } });
  slide.addText(title, { x: x + 0.22, y: y + 0.16, w: w - 0.38, h: 0.28, fontFace: "Microsoft YaHei", fontSize: 14, bold: true, color: colors.ink, fit: "shrink" });
  slide.addText(body, { x: x + 0.22, y: y + 0.55, w: w - 0.38, h: h - 0.64, fontFace: "Microsoft YaHei", fontSize: 11, color: "2F3B4C", fit: "shrink", breakLine: false });
}

function buildPptx() {
  const deck = new PptxGenJS();
  pptx = deck;
  deck.layout = "LAYOUT_WIDE";
  deck.author = profile.name;
  deck.company = profile.school;
  deck.subject = "保研自我介绍";
  deck.title = `${profile.name} 保研自我介绍`;
  deck.lang = "zh-CN";
  deck.theme = {
    headFontFace: "Microsoft YaHei",
    bodyFontFace: "Microsoft YaHei",
    lang: "zh-CN"
  };

  let slide = deck.addSlide();
  slide.background = { color: colors.paper };
  addHeader(slide, "Self Introduction");
  slide.addText(profile.name, { x: 0.78, y: 1.62, w: 4.2, h: 0.9, fontFace: "Microsoft YaHei", fontSize: 50, bold: true, color: colors.ink });
  slide.addText(`${profile.school} · ${profile.college}`, { x: 0.82, y: 1.1, w: 5.6, h: 0.28, fontFace: "Microsoft YaHei", fontSize: 14, bold: true, color: colors.red });
  slide.addText("面向保研与科研交流，聚焦可穿戴感知、健康管理智能体、端云协同与时序信号识别。", { x: 0.82, y: 2.65, w: 6.8, h: 0.68, fontFace: "Microsoft YaHei", fontSize: 20, color: "2F3B4C", fit: "shrink" });
  slide.addText(profile.focusTags.join("  ·  "), { x: 0.82, y: 3.55, w: 6.4, h: 0.36, fontFace: "Microsoft YaHei", fontSize: 14, bold: true, color: colors.redDark });
  slide.addImage({ path: path.join(assetDir, "resume-photo-li-shangyi-red-bg-gpt-image-2.jpg"), x: 9.25, y: 1.28, w: 2.1, h: 2.63 });
  addCard(slide, 0.82, 4.45, 3.05, 1.05, profile.gpa, "GPA / 100");
  addCard(slide, 4.12, 4.45, 3.05, 1.05, profile.rank, `专业成绩排名（${profile.rankPercent}）`);
  addCard(slide, 7.42, 4.45, 3.05, 1.05, "2", "核心可穿戴项目");
  addFooter(slide, profile.email, profile.githubText);

  slide = deck.addSlide();
  slide.background = { color: colors.paper };
  addHeader(slide, "01");
  addTitle(slide, "Profile", `${profile.school}${profile.major}本科生`);
  addCard(slide, 0.82, 2.35, 3.6, 1.18, profile.gpa, "GPA");
  addCard(slide, 4.75, 2.35, 3.6, 1.18, profile.rank, `专业成绩排名（${profile.rankPercent}）`);
  addCard(slide, 8.68, 2.35, 3.6, 1.18, "CET-4 551", "CET-6 489；英语演讲与辩论 97");
  slide.addText(`核心课程：${profile.courses.join("、")}。`, { x: 0.82, y: 4.08, w: 11.2, h: 1.2, fontFace: "Microsoft YaHei", fontSize: 16, color: "2F3B4C", fit: "shrink" });
  addFooter(slide, profile.period, profile.college);

  slide = deck.addSlide();
  slide.background = { color: colors.paper };
  addHeader(slide, "02");
  addTitle(slide, "Direction", "从戒指式传感接入，到健康智能体与时序识别");
  addCard(slide, 0.82, 2.24, 2.7, 1.25, "设备接入", "BLE、PPG、心率、血氧、体温、IMU");
  addCard(slide, 3.8, 2.24, 2.7, 1.25, "数据链路", "Android、Room/SQLite、云端接口同步");
  addCard(slide, 6.78, 2.24, 2.7, 1.25, "智能辅助", "结构化问诊、RAG、报告理解、干预任务");
  addCard(slide, 9.76, 2.24, 2.7, 1.25, "实验评估", "CSV 清洗、信号分段、特征提取、分类评估");
  slide.addText(profile.focusLine, { x: 0.82, y: 4.35, w: 11.2, h: 0.55, fontFace: "Microsoft YaHei", fontSize: 18, bold: true, color: colors.redDark, fit: "shrink" });
  addFooter(slide, "可穿戴计算 · 移动感知 · 健康计算", "Android / BLE / IMU / Time Series");

  slide = deck.addSlide();
  slide.background = { color: colors.paper };
  addHeader(slide, "03");
  addTitle(slide, profile.projects[0].period, profile.projects[0].title, 0.92);
  slide.addImage({ path: path.join(assetDir, "health-agent-status.png"), x: 0.82, y: 2.2, w: 4.55, h: 3.15, sizing: { type: "contain", w: 4.55, h: 3.15 } });
  slide.addText(profile.projects[0].subtitle, { x: 5.72, y: 2.08, w: 6.4, h: 0.55, fontFace: "Microsoft YaHei", fontSize: 13, bold: true, color: colors.muted, fit: "shrink" });
  addBulletList(slide, profile.projects[0].points.slice(0, 3), 5.72, 2.86, 6.4, 13);
  addFooter(slide, "Android · BLE · Room/SQLite · Next.js · Supabase", "2026 年全国三等奖");

  slide = deck.addSlide();
  slide.background = { color: colors.paper };
  addHeader(slide, "04");
  addTitle(slide, "Health Agent Prototype", "从传感指标到健康建议与执行反馈");
  addCard(slide, 0.82, 2.18, 5.35, 1.1, "1. 感知输入", "戒指式可穿戴设备采集生理与运动信号");
  addCard(slide, 6.55, 2.18, 5.35, 1.1, "2. 状态分析", "睡眠恢复、风险分层、用户状态整理");
  addCard(slide, 0.82, 3.7, 5.35, 1.1, "3. AI 辅助", "结构化问诊、RAG 上下文、医检报告理解");
  addCard(slide, 6.55, 3.7, 5.35, 1.1, "4. 干预反馈", "健康建议生成、干预任务与执行反馈");
  slide.addText("个人贡献集中在 Android 多模块应用、核心数据链路、BLE 接入、云端接口对接与 AI 辅助功能联调。", { x: 0.82, y: 5.35, w: 11.1, h: 0.52, fontFace: "Microsoft YaHei", fontSize: 15, color: "2F3B4C", fit: "shrink" });
  addFooter(slide, "山东产业技术研究院（青岛）计算医学工程中心产学研合作项目", "结构化问诊 · RAG · 报告理解");

  slide = deck.addSlide();
  slide.background = { color: colors.paper };
  addHeader(slide, "05");
  addTitle(slide, profile.projects[1].period, profile.projects[1].title, 0.92);
  addBulletList(slide, profile.projects[1].points, 0.92, 2.15, 6.0, 13);
  slide.addImage({ path: path.join(assetDir, "ring-signal-from-fourth-ppt.jpg"), x: 7.22, y: 2.05, w: 4.75, h: 3.3, sizing: { type: "contain", w: 4.75, h: 3.3 } });
  addCard(slide, 7.22, 5.55, 2.2, 0.74, "2600", "有效样本");
  addCard(slide, 9.75, 5.55, 2.2, 0.74, "87.2%", "阶段准确率");
  addFooter(slide, "单被试初步实验 · 不夸大跨用户泛化", "Android 采集 · IMU · Python");

  slide = deck.addSlide();
  slide.background = { color: colors.paper };
  addHeader(slide, "06");
  addTitle(slide, "Skills", "设备、数据、应用与实验流程的贯通能力");
  profile.skills.forEach((skill, index) => {
    addCard(slide, 0.92 + index * 3.92, 2.35, 3.45, 1.65, skill.title, skill.text);
  });
  addFooter(slide, "C/C++ · Python · Java/Kotlin Android · TypeScript", "系统实现 + 实验评估");

  slide = deck.addSlide();
  slide.background = { color: colors.paper };
  addHeader(slide, "07");
  addTitle(slide, "Awards", "竞赛结果与综合表现");
  profile.awards.forEach((award, index) => {
    const col = index % 2;
    const row = Math.floor(index / 2);
    addCard(slide, 0.92 + col * 5.8, 2.1 + row * 1.22, 5.25, 0.92, award.split("：")[0], award.includes("：") ? award.split("：").slice(1).join("：") : award);
  });
  addFooter(slide, "算法训练 · 工程开发 · 协作表达", "可穿戴健康系统开发能力");

  slide = deck.addSlide();
  slide.background = { color: colors.paper };
  addHeader(slide, "Q&A");
  addTitle(slide, "Thank You", "希望继续围绕可穿戴健康感知与端侧智能做深入训练");
  slide.addText("目前优势是有从设备接入、移动端开发、端云联调到时序信号实验评估的连续实践经历。后续希望在导师指导下，进一步补足科研方法、实验设计、模型评估与论文表达能力。", {
    x: 0.82,
    y: 2.45,
    w: 8.8,
    h: 1.1,
    fontFace: "Microsoft YaHei",
    fontSize: 18,
    color: "2F3B4C",
    fit: "shrink"
  });
  addCard(slide, 0.82, 4.3, 5.2, 1.25, "联系", `${profile.email}\n${profile.githubText}`);
  addCard(slide, 6.45, 4.3, 4.4, 1.25, "公开材料", "sdlsy.github.io\nsdlsy.github.io/cv.pdf\nsdlsy.github.io/intro/");
  addFooter(slide, `${profile.name} · ${profile.school}${profile.major}`, "Q&A");

  return deck;
}

ensureDir(introDir);
ensureDir(filesDir);
fs.writeFileSync(path.join(introDir, "index.html"), buildHtml(), "utf8");
const introDeck = buildPptx();
await introDeck.writeFile({ fileName: path.join(filesDir, "li-shangyi-intro.pptx") });

console.log("Generated public/intro/index.html");
console.log("Generated public/files/li-shangyi-intro.pptx");
