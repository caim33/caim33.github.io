(function () {
  const data = window.NEWSLETTER_CONTENT;
  const issue = data.issues[data.defaultIssue];
  let activePerson = "all";

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

  function renderBasics() {
    document.title = `${issue.issueCode} | SAIL Newsletter`;
    $("#issue-month").textContent = issue.monthLabel;
    $("#issue-title").textContent = issue.title;
    $("#issue-subtitle").textContent = issue.subtitle;
    $("#issue-code").textContent = issue.issueCode;
    $("#source-pdf").href = issue.sourcePdf;

    const stats = $("#stats");
    stats.innerHTML = "";
    issue.stats.forEach((item) => {
      const stat = make("div", "stat-item");
      stat.append(make("strong", null, item.value));
      stat.append(make("span", null, item.label));
      stats.appendChild(stat);
    });
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
      const question = make("h3", null, `${index + 1}. ${item.question}`);
      article.appendChild(question);

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
      const date = make("time", null, deadline.date);
      const body = make("div");
      body.append(make("h3", null, deadline.name));
      body.append(make("p", null, deadline.fullName));
      item.append(date, body);
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

  function renderPdfPreview() {
    const root = $("#pdf-preview");
    root.innerHTML = "";
    issue.pdfPages.forEach((page, index) => {
      const figure = make("figure", "pdf-page");
      const img = make("img");
      img.src = page;
      img.alt = `${issue.issueCode} PDF 第 ${index + 1} 页`;
      img.loading = "lazy";
      const caption = make("figcaption", null, `Page ${index + 1}`);
      figure.append(img, caption);
      root.appendChild(figure);
    });
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

  function init() {
    renderBasics();
    renderHighlights();
    renderPapers();
    renderTeamUpdates();
    renderPersonFilter();
    renderInterview();
    renderDeadlines();
    renderResource();
    renderPdfPreview();
    renderFooter();
  }

  init();
})();
