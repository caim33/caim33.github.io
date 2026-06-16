(function () {
  const data = window.NEWSLETTER_CONTENT;
  const issueKeys = Object.keys(data.issues).sort().reverse();
  const initialKey = new URLSearchParams(window.location.search).get("issue") || data.defaultIssue || issueKeys[0];
  let activeIssueKey = data.issues[initialKey] ? initialKey : issueKeys[0];
  let issue = data.issues[activeIssueKey];
  let activePerson = "all";
  let railCollapsed = window.localStorage.getItem("newsletterRailCollapsed") === "true";

  const $ = (selector) => document.querySelector(selector);

  function make(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function appendParagraphs(parent, paragraphs) {
    paragraphs.forEach((text) => {
      const p = make("p", null, text);
      parent.appendChild(p);
    });
  }

  function getArchiveStats() {
    return issueKeys.reduce(
      (totals, key) => {
        const item = data.issues[key];
        totals.papers += item.spotlight.papers.length;
        totals.team += item.spotlight.teamUpdates.length;
        totals.deadlines += item.events.deadlines.length;
        totals.resources += item.resources ? 1 : 0;
        return totals;
      },
      { papers: 0, team: 0, deadlines: 0, resources: 0 }
    );
  }

  function renderIssueNav() {
    const root = $("#issue-nav");
    root.innerHTML = "";
    issueKeys.forEach((key) => {
      const item = data.issues[key];
      const button = make("button", "issue-button");
      button.type = "button";
      button.dataset.issue = key;
      button.dataset.short = item.issueCode.split(".").pop();
      button.title = `${item.issueCode} ${item.cnMonth || item.monthLabel}`;
      button.setAttribute("aria-current", key === activeIssueKey ? "page" : "false");
      button.append(make("strong", null, item.issueCode));
      button.append(make("span", null, item.cnMonth || item.monthLabel));
      button.addEventListener("click", () => selectIssue(key));
      root.appendChild(button);
    });
  }

  function selectIssue(key) {
    if (!data.issues[key]) return;
    activeIssueKey = key;
    issue = data.issues[key];
    activePerson = "all";
    const url = new URL(window.location.href);
    url.searchParams.set("issue", key);
    url.hash = "";
    window.history.replaceState({}, "", url);
    renderIssue();
    window.scrollTo({ top: document.querySelector(".current-issue-heading").offsetTop - 80, behavior: "smooth" });
  }

  function renderRailToggle() {
    const shell = $("#archive-shell");
    const button = $("#issue-toggle");
    shell.classList.toggle("rail-collapsed", railCollapsed);
    button.setAttribute("aria-expanded", String(!railCollapsed));
    button.setAttribute("aria-label", railCollapsed ? "展开期数目录" : "收起期数目录");
    button.querySelector("span").textContent = railCollapsed ? "›" : "‹";
  }

  function bindRailToggle() {
    $("#issue-toggle").addEventListener("click", () => {
      railCollapsed = !railCollapsed;
      window.localStorage.setItem("newsletterRailCollapsed", String(railCollapsed));
      renderRailToggle();
    });
  }

  function renderArchiveSummary() {
    $("#issue-total").textContent = `${issueKeys.length} Issue${issueKeys.length > 1 ? "s" : ""}`;

    const stats = getArchiveStats();
    const items = [
      { value: stats.papers, label: "论文发表" },
      { value: stats.team, label: "团队动态" },
      { value: stats.deadlines, label: "会议截稿" },
      { value: stats.resources, label: "资源推荐" }
    ];

    const root = $("#stats");
    root.innerHTML = "";
    items.forEach((item) => {
      const stat = make("div", "stat-item");
      stat.append(make("strong", null, String(item.value)));
      stat.append(make("span", null, item.label));
      root.appendChild(stat);
    });
  }

  function renderCurrentIssueTitle() {
    document.title = `${issue.issueCode} | SAIL Newsletter`;
    $("#current-issue-title").textContent = issue.cnMonth || issue.monthLabel;
    $("#current-issue-subtitle").textContent = `Issue ${issue.issueCode} · ${issue.subtitle}`;
  }

  function renderHighlights() {
    const root = $("#highlights");
    root.innerHTML = "";
    issue.highlights.forEach((item) => {
      const card = make("article", "highlight-card");
      card.append(make("span", "card-label", item.label));
      card.append(make("h3", null, item.title));
      card.append(make("p", null, item.text));
      root.appendChild(card);
    });
  }

  function renderPapers() {
    const papers = issue.spotlight.papers;
    $("#paper-count").textContent = `${papers.length} 篇`;
    const root = $("#papers");
    root.innerHTML = "";

    papers.forEach((paper) => {
      const article = make("article", "paper-card");
      const media = make("div", "paper-media");
      const img = make("img");
      img.src = paper.image;
      img.alt = `${paper.title} 方法示意图`;
      img.loading = "lazy";
      media.appendChild(img);

      const body = make("div", "paper-body");
      const meta = make("div", "paper-meta");
      meta.append(make("span", null, paper.date));
      meta.append(make("span", null, paper.venue));
      body.appendChild(meta);
      body.append(make("h3", null, paper.title));
      body.append(make("p", "paper-people", paper.people));
      body.append(make("p", "paper-badge", paper.badge));

      const summary = make("div", "paper-summary");
      appendParagraphs(summary, paper.summary);
      body.appendChild(summary);

      const tags = make("div", "tag-row");
      paper.tags.forEach((tag) => tags.append(make("span", null, tag)));
      body.appendChild(tags);

      article.append(media, body);
      root.appendChild(article);
    });
  }

  function renderTeamUpdates() {
    const updates = issue.spotlight.teamUpdates;
    $("#team-count").textContent = `${updates.length} 条`;
    const root = $("#team-updates");
    root.innerHTML = "";

    updates.forEach((item) => {
      const article = make("article", "timeline-item");
      const date = make("time", null, item.date);
      const body = make("div", "timeline-body");
      body.append(make("h3", null, item.title));
      body.append(make("p", null, item.text));
      if (item.image) {
        const img = make("img");
        img.src = item.image;
        img.alt = item.title;
        img.loading = "lazy";
        body.appendChild(img);
      }
      article.append(date, body);
      root.appendChild(article);
    });
  }

  function renderPersonFilter() {
    const root = $("#person-filter");
    root.innerHTML = "";
    issue.interview.people.forEach((person) => {
      const button = make("button", "filter-button", person.name);
      button.type = "button";
      button.dataset.person = person.id;
      button.setAttribute("aria-pressed", String(person.id === activePerson));
      button.addEventListener("click", () => {
        activePerson = person.id;
        renderPersonFilter();
        renderInterview();
      });
      root.appendChild(button);
    });
  }

  function renderInterview() {
    $("#interview-intro").textContent = issue.interview.intro;
    const root = $("#interview-list");
    root.innerHTML = "";
    const people = issue.interview.people.filter((person) => person.id !== "all");

    issue.interview.questions.forEach((item, index) => {
      const article = make("article", "qa-card");
      article.append(make("h3", null, `${index + 1}. ${item.question}`));
      people
        .filter((person) => activePerson === "all" || activePerson === person.id)
        .forEach((person) => {
          const answer = make("div", "answer-block");
          answer.append(make("strong", null, person.name));
          answer.append(make("p", null, item.answers[person.id]));
          article.appendChild(answer);
        });
      root.appendChild(article);
    });
  }

  function renderDeadlines() {
    const root = $("#deadlines");
    root.innerHTML = "";
    issue.events.deadlines.forEach((deadline) => {
      const item = make("article", "deadline-item");
      item.append(make("time", null, deadline.date));
      const body = make("div");
      body.append(make("h3", null, deadline.name));
      body.append(make("p", null, deadline.fullName));
      item.appendChild(body);
      root.appendChild(item);
    });
  }

  function renderResource() {
    const resource = issue.resources;
    const root = $("#resource-card");
    root.innerHTML = "";

    const article = make("article", "resource-card");
    const img = make("img");
    img.src = resource.image;
    img.alt = `${resource.title} 界面预览`;
    img.loading = "lazy";
    article.appendChild(img);

    const body = make("div", "resource-body");
    body.append(make("span", "card-label", `来自 ${resource.contributor} 的分享`));
    body.append(make("h3", null, resource.title));
    appendParagraphs(body, resource.text);
    article.appendChild(body);
    root.appendChild(article);
  }

  function renderFooter() {
    const contact = issue.contact;
    const footer = $(".site-footer");
    footer.innerHTML = "";
    const inner = make("div", "footer-inner");
    const left = make("div");
    left.append(make("strong", null, "Contact Us"));
    const mail = make("a", null, contact.email);
    mail.href = `mailto:${contact.email}`;
    left.appendChild(mail);

    const right = make("div", "footer-meta");
    right.append(make("span", null, `主编：${contact.chiefEditor}`));
    right.append(make("span", null, `编辑：${contact.editors.join("、")}`));
    inner.append(left, right);
    footer.appendChild(inner);
  }

  function renderIssue() {
    renderIssueNav();
    renderRailToggle();
    renderCurrentIssueTitle();
    renderHighlights();
    renderPapers();
    renderTeamUpdates();
    renderPersonFilter();
    renderInterview();
    renderDeadlines();
    renderResource();
    renderFooter();
  }

  renderArchiveSummary();
  bindRailToggle();
  renderIssue();
})();
