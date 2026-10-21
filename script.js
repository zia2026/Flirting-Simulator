(function () {
  "use strict";

  /* ========== 题目配置 ========== */
  // 分值顺序：[主动, 感性, 热烈]
  const QUESTIONS = [
    {
      type: "主动",
      title: "晚上十一点，对方突然发来一句“睡了吗？”，你会——",
      options: [
        { text: "回“准备睡了”，然后真的去睡", responses: ["真睡啊..", "噢噢"], score: [1, 1, 1] },
        { text: "回“还没，怎么了？”，等对方说下文", responses: ["我也没睡，来骚扰你", "....没事"], score: [3, 1, 1] },
        { text: "回“没睡，在等你找我。”", responses: ["////噢...", "那我以后天天找你"], score: [4, 2, 2] },
        { text: "直接拨语音过去：“怎么了，想我了？”", responses: ["超级。", "……嗯，想了。"], score: [5, 2, 3] }
      ]
    },
    {
      type: "热烈",
      title: "一起吃饭时，对方嘴角沾了酱汁，你会——",
      options: [
        { text: "假装没看见，继续聊", responses: ["你真的不打算提醒我吗？", "嗯？"], score: [1, 1, 1] },
        { text: "递张纸巾，说“擦一下”", responses: ["哦……谢谢。", "好尴尬呀。"], score: [1, 2, 2] },
        { text: "笑着指自己嘴角，示意对方", responses: ["你这样有点可爱。", "知道了^^。"], score: [2, 3, 4] },
        { text: "直接伸手帮对方擦掉", responses: ["……你手也太快了吧。", "我心跳有点乱。"], score: [2, 4, 5] }
      ]
    },
    {
      type: "感性",
      title: "对方说“今天好累”，你会——",
      options: [
        { text: "回“那早点休息”", responses: ["嗯，你也早点睡。", "好，听你的。"], score: [1, 1, 1] },
        { text: "问“怎么了，发生什么事了？”", responses: ["没什么，就是有点想你。", "说出来好像也没那么累了。"], score: [1, 3, 1] },
        { text: "说“过来，借你靠一下”", responses: ["好宽的肩。", "那我真靠了啊。"], score: [2, 4, 2] },
        { text: "直接说“地址发我，我去找你”", responses: ["我会当真。", "你还真是行动派。"], score: [3, 5, 3] }
      ]
    },
    {
      type: "主动",
      title: "聊天时对方突然不回消息了，你会——",
      options: [
        { text: "放下手机，等对方回", responses: ["怎么不追问我TT", "刚刚在忙，抱歉。"], score: [1, 1, 1] },
        { text: "过一会儿发“在忙吗？”", responses: ["故意的。^^", "你说。"], score: [3, 1, 1] },
        { text: "发一句“你再不回我就要乱想了”", responses: ["别乱想，我在呢。", "乱想也还是想我吗"], score: [4, 2, 2] },
        { text: "直接打电话过去", responses: ["喂？", "想听你的声音"], score: [5, 2, 3] }
      ]
    },
    {
      type: "感性",
      title: "对方问“你觉得我怎么样？”，你会——",
      options: [
        { text: "认真说“挺好的，人不错”", responses: ["就……挺好？", "会不会太官方了。"], score: [1, 1, 1] },
        { text: "笑着说“看情况，看对谁”", responses: ["....对我呢", "话里有话。"], score: [1, 3, 1] },
        { text: "说“反正我挺喜欢跟你待着”", responses: ["所以......", "我也是。"], score: [2, 4, 2] },
        { text: "看着对方说“你心里没数吗？”", responses: ["……你犯规。", "有数，但想听你说。"], score: [3, 5, 3] }
      ]
    },
    {
      type: "热烈",
      title: "下雨天，对方只带了一把伞，你会——",
      options: [
        { text: "说“你打吧，我跑两步”", responses: ["别跑。", "伞给你。"], score: [1, 1, 1] },
        { text: "说“一起打吧，挤一挤”", responses: ["靠近点。", "这伞好像有点小。"], score: [1, 2, 2] },
        { text: "把伞往对方那边偏，自己淋一点", responses: ["你肩膀湿了。", "你怎么这么好。"], score: [2, 3, 4] },
        { text: "直接说“那我送你回去”", responses: ["我先送你。", "好有安全感^^。"], score: [2, 4, 5] }
      ]
    },
    {
      type: "主动",
      title: "对方发来一张自拍，你会——",
      options: [
        { text: "回“好看”", responses: ["敷衍！", "只是好看吗"], score: [1, 1, 1] },
        { text: "回“今天怎么想起发照片了？”", responses: ["爱豆瘾犯了。", "想让你看看。"], score: [3, 1, 1] },
        { text: "回“这张我要存下来”", responses: ["好", "！", "那我可存了。"], score: [4, 2, 2] },
        { text: "回“本人比照片好看”", responses: ["那我们该见面了。", "那你要不要来验证一下。😊"], score: [5, 2, 3] }
      ]
    },
    {
      type: "热烈",
      title: "对方说“我周末有空”，你会——",
      options: [
        { text: "回“那挺好的，好好休息”", responses: ["你呢。", "....笨蛋"], score: [1, 1, 1] },
        { text: "回“有什么安排吗？”", responses: ["和某人见面。", "听你的。"], score: [1, 2, 2] },
        { text: "回“那要不要一起出去走走？”", responses: ["我正等你这句话。", "你终于开口了。"], score: [2, 3, 4] },
        { text: "直接说“周六下午，我来接你”", responses: ["你都安排好啦？", "行，那我等你。😊"], score: [2, 4, 5] }
      ]
    },
    {
      type: "感性",
      title: "对方半开玩笑说“你是不是喜欢我？”，你会——",
      options: [
        { text: "回“别闹了”", responses: ["我认真的。", "当我没说。"], score: [1, 1, 1] },
        { text: "回“你猜”", responses: ["我猜是。", "别这样。"], score: [1, 3, 1] },
        { text: "回“你希望我怎么回答？”", responses: ["我希望你直接说。", "从心。"], score: [2, 4, 2] },
        { text: "回“被你发现了”", responses: ["因为我也喜欢你。", "那我坦白，我也是。"], score: [3, 5, 3] }
      ]
    },
    {
      type: "主动",
      title: "分别的时候，对方说“那……下次见？”，你会——",
      options: [
        { text: "点头说“嗯，下次见”", responses: ["好，路上小心。", "那说好了。"], score: [1, 1, 1] },
        { text: "回“下次是什么时候？”", responses: ["你想什么时候？", "你这是在预约我吗。"], score: [3, 1, 1] },
        { text: "回“别下次了，明天吧”", responses: ["好。", "明天见。"], score: [4, 2, 2] },
        { text: "拉住对方说“再待五分钟”", responses: ["再久一点也没关系。", "我不想走了。"], score: [5, 2, 3] }
      ]
    }
  ];

  /* ========== 结局配置 ========== */
  const ENDINGS = {
    straight: {
      name: "直球选手",
      desc: "你喜欢就会说，藏不住。对方可能被你的坦率吓一跳，但也会被你的真诚打动。你的恋爱关键词是：不绕弯子。",
      tags: ["主动", "热烈", "感性"]
    },
    slow: {
      name: "慢热观察家",
      desc: "你习惯先观察，再靠近。不是不喜欢，而是想确认安全。你的恋爱关键词是：慢慢来，比较快。",
      tags: ["克制", "理性", "慢热"]
    },
    pushpull: {
      name: "暧昧拉扯大师",
      desc: "你擅长制造心动，也擅长留白。你不急着定义关系，享受若即若离的张力。你的恋爱关键词是：欲擒故纵。",
      tags: ["主动", "克制", "感性"]
    },
    rational: {
      name: "理性恋爱脑",
      desc: "你嘴上说看条件，心里其实很在意感觉。你会为喜欢的人破例，但破例之前先算一遍。你的恋爱关键词是：清醒地沦陷。",
      tags: ["感性", "理性", "主动"]
    },
    gentle: {
      name: "温柔守门员",
      desc: "你不轻易开始，但一旦认定就很认真。你的温柔有门槛，进去的人才知道。你的恋爱关键词是：慢热但长情。",
      tags: ["被动", "感性", "热烈"]
    },
    solo: {
      name: "独美型选手",
      desc: "恋爱对你来说是选项，不是必答题。你更在意自己的节奏和边界。你的恋爱关键词是：先爱自己。",
      tags: ["克制", "理性", "独立"]
    },
    mixed: {
      name: "混合型选手",
      desc: "你很难被归进某一个类型，主动与克制、感性与理性在你身上同时存在。你更像一个看对象、看心情出牌的人。你的恋爱关键词是：看情况。",
      tags: ["混合", "灵活", "难以归类"]
    }
  };

  /* ========== 工具 ========== */
  const $ = (sel) => document.querySelector(sel);
  const STORAGE_KEY = "ambiguous_sim_v1";
  const MAX_HISTORY = 3;

  function loadStore() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { gender: "", nickname: "", progress: null, history: [] };
      const data = JSON.parse(raw);
      return {
        gender: data.gender || "",
        nickname: data.nickname || "",
        progress: data.progress || null,
        history: Array.isArray(data.history) ? data.history.slice(0, MAX_HISTORY) : []
      };
    } catch (e) {
      return { gender: "", nickname: "", progress: null, history: [] };
    }
  }

  function saveStore(store) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    } catch (e) { /* 忽略存储失败，降级为内存 */ }
  }

  let store = loadStore();

  /* ========== 页面切换 ========== */
  function showPage(id) {
    document.querySelectorAll(".page").forEach((p) => p.classList.remove("active"));
    $("#" + id).classList.add("active");
    window.scrollTo(0, 0);
  }

  /* ========== 欢迎页 ========== */
  let selectedGender = store.gender || "";

  function initWelcome() {
    $("#nickname").value = store.nickname || "";
    document.querySelectorAll(".gender-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.gender === selectedGender);
      btn.onclick = () => {
        selectedGender = btn.dataset.gender;
        document.querySelectorAll(".gender-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
      };
    });

    // 历史记录
    const historyBox = $("#historyBox");
    const historyList = $("#historyList");
    if (store.history.length > 0) {
      historyBox.classList.remove("hidden");
      historyList.innerHTML = store.history.map((h) => {
        const d = new Date(h.time);
        const dateStr = `${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
        return `<li><span>${h.endingName}</span><span>${h.nickname || "你"} · ${dateStr}</span></li>`;
      }).join("");
    } else {
      historyBox.classList.add("hidden");
    }

    // 继续上次
    const btnContinue = $("#btnContinue");
    if (store.progress && store.progress.answers && store.progress.index < QUESTIONS.length) {
      btnContinue.classList.remove("hidden");
      btnContinue.onclick = () => {
        resumeProgress();
        showPage("page-quiz");
      };
    } else {
      btnContinue.classList.add("hidden");
    }

    $("#btnStart").onclick = () => {
      const nickname = ($("#nickname").value || "").trim().slice(0, 12);
      store.gender = selectedGender;
      store.nickname = nickname;
      store.progress = { index: 0, answers: [], confirmed: false };
      saveStore(store);
      startQuizFresh();
      showPage("page-quiz");
    };

    $("#btnClear").onclick = () => {
      if (confirm("确定清除所有本机记录吗？")) {
        store = { gender: "", nickname: "", progress: null, history: [] };
        saveStore(store);
        selectedGender = "";
        $("#nickname").value = "";
        document.querySelectorAll(".gender-btn").forEach((b) => b.classList.remove("active"));
        initWelcome();
      }
    };
  }

  /* ========== 问卷逻辑 ========== */
  let currentIndex = 0;
  let answers = []; // [{qIndex, optionIndex, score:[a,b,c]}]
  let pendingOption = null;
  let responseTimer = null;

  function startQuizFresh() {
    currentIndex = 0;
    answers = [];
    pendingOption = null;
    renderQuestion();
  }

  function resumeProgress() {
    currentIndex = store.progress.index || 0;
    answers = store.progress.answers || [];
    pendingOption = null;
    renderQuestion();
  }

  function persistProgress() {
    store.progress = {
      index: currentIndex,
      answers: answers.map((a) => ({ qIndex: a.qIndex, optionIndex: a.optionIndex, score: a.score })),
      confirmed: false
    };
    saveStore(store);
  }

  function renderQuestion() {
    if (responseTimer) { clearTimeout(responseTimer); responseTimer = null; }
    const q = QUESTIONS[currentIndex];
    const progress = ((currentIndex + 1) / QUESTIONS.length) * 100;
    $("#progressText").textContent = `第 ${currentIndex + 1} / ${QUESTIONS.length} 题`;
    $("#progressFill").style.width = progress + "%";
    $("#questionTitle").textContent = q.title;
    $("#responseArea").classList.add("hidden");
    $("#responseText").textContent = "";
    $("#btnNext").classList.add("hidden");
    $("#submitArea").classList.add("hidden");

    const existing = answers.find((a) => a.qIndex === currentIndex);
    const list = $("#optionsList");
    list.innerHTML = "";
    q.options.forEach((opt, i) => {
      const btn = document.createElement("button");
      btn.className = "option-btn" + (existing && existing.optionIndex === i ? " active" : "");
      btn.textContent = opt.text;
      btn.onclick = () => onSelectOption(i);
      list.appendChild(btn);
    });

    $("#btnPrev").style.visibility = currentIndex === 0 ? "hidden" : "visible";
  }

  function onSelectOption(optionIndex) {
    const q = QUESTIONS[currentIndex];
    const opt = q.options[optionIndex];
    pendingOption = optionIndex;

    // 高亮
    document.querySelectorAll(".option-btn").forEach((b, i) => {
      b.classList.toggle("active", i === optionIndex);
    });

    // 记录/更新答案
    const existingIdx = answers.findIndex((a) => a.qIndex === currentIndex);
    const entry = { qIndex: currentIndex, optionIndex, score: opt.score.slice() };
    if (existingIdx >= 0) answers[existingIdx] = entry;
    else answers.push(entry);
    persistProgress();

    // 0.5s 后显示回应
    $("#responseArea").classList.remove("hidden");
    $("#responseText").textContent = "";
    $("#btnNext").classList.add("hidden");
    $("#submitArea").classList.add("hidden");

    if (responseTimer) clearTimeout(responseTimer);
    responseTimer = setTimeout(() => {
      const pool = opt.responses && opt.responses.length ? opt.responses : ["……"];
      const text = pool[Math.floor(Math.random() * pool.length)];
      $("#responseText").textContent = text;

      if (currentIndex === QUESTIONS.length - 1) {
        $("#submitArea").classList.remove("hidden");
      } else {
        $("#btnNext").classList.remove("hidden");
      }
    }, 500);
  }

  $("#btnNext").onclick = () => {
    if (currentIndex < QUESTIONS.length - 1) {
      currentIndex++;
      persistProgress();
      renderQuestion();
    }
  };

  $("#btnPrev").onclick = () => {
    if (currentIndex > 0) {
      currentIndex--;
      persistProgress();
      renderQuestion();
    }
  };

  $("#btnBackEdit").onclick = () => {
    renderQuestion();
  };

  $("#btnSubmit").onclick = () => {
    if (answers.length < QUESTIONS.length) return;
    finishQuiz();
  };

  /* ========== 计分与结局 ========== */
  function calcTotals() {
    let active = 0, emotional = 0, passionate = 0;
    answers.forEach((a) => {
      active += a.score[0];
      emotional += a.score[1];
      passionate += a.score[2];
    });
    return { active, emotional, passionate };
  }

  function levelOf(value) {
    // 满分约 35，按比例分档
    if (value >= 26) return "high";
    if (value >= 18) return "mid";
    return "low";
  }

  function decideEnding(totals) {
    const a = levelOf(totals.active);
    const e = levelOf(totals.emotional);
    const p = levelOf(totals.passionate);

    if (a === "high" && p === "high" && e === "high") return "straight";
    if (a === "low" && e === "low" && p === "low") return "slow";
    if (a === "high" && p === "low" && e === "high") return "pushpull";
    if (e === "high" && (a === "mid" || a === "high") && p !== "high") return "rational";
    if (a === "low" && e === "high" && p === "high") return "gentle";
    if (a === "low" && e === "low" && p !== "high") return "solo";
    return "mixed";
  }

  function finishQuiz() {
    const totals = calcTotals();
    const endingKey = decideEnding(totals);
    const ending = ENDINGS[endingKey];

    // 保存历史
    const record = {
      endingKey,
      endingName: ending.name,
      nickname: store.nickname || "你",
      gender: store.gender || "",
      time: Date.now(),
      answers: answers.map((a) => ({ qIndex: a.qIndex, optionIndex: a.optionIndex, score: a.score }))
    };
    store.history.unshift(record);
    store.history = store.history.slice(0, MAX_HISTORY);
    store.progress = null;
    saveStore(store);

    renderResult(ending, record);
    showPage("page-result");
  }

  /* ========== 结果页 ========== */
  let currentReviewAnswers = [];

  function renderResult(ending, record) {
    $("#resultName").textContent = ending.name;
    $("#resultDesc").textContent = ending.desc;
    $("#resultTags").innerHTML = ending.tags.map((t) => `<span>${t}</span>`).join("");

    currentReviewAnswers = record.answers || [];
    const reviewList = $("#reviewList");
    reviewList.innerHTML = currentReviewAnswers.map((a) => {
      const q = QUESTIONS[a.qIndex];
      const opt = q.options[a.optionIndex];
      return `<div class="review-item"><div class="q">${a.qIndex + 1}. ${q.title}</div><div class="a">你选了：${opt.text}</div></div>`;
    }).join("");
    reviewList.classList.add("hidden");
    $("#btnToggleReview").textContent = "查看答题回顾 ▾";

    $("#btnRestart").onclick = () => {
      store.progress = { index: 0, answers: [], confirmed: false };
      saveStore(store);
      startQuizFresh();
      showPage("page-quiz");
    };

    $("#btnHome").onclick = () => {
      initWelcome();
      showPage("page-welcome");
    };
  }

  $("#btnToggleReview").onclick = () => {
    const list = $("#reviewList
