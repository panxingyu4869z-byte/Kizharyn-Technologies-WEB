"use strict";

const stepContent = [
  {
    name: "拆解",
    english: "Decompose",
    description: "拆解题目或学习任务，明确已知条件、要处理的问题和目标。",
    focus: "任务内容 · 条件与目标",
  },
  {
    name: "组合",
    english: "Compose",
    description: "围绕当前任务目标，组合相关信息和可用规则。",
    focus: "任务目标 · 信息与规则",
  },
  {
    name: "候选匹配",
    english: "Match Candidates",
    description: "匹配可能适用的解决内容，呈现对当前目标有用的候选。",
    focus: "可选结果 · 相关依据",
  },
  {
    name: "历史实例比较",
    english: "Compare Historical Instances",
    description: "结合可用的历史实例比较当前候选，为判断提供参考。",
    focus: "相关实例 · 候选比较",
  },
  {
    name: "选择正确做法",
    english: "Choose the Right Approach",
    description: "为当前学习任务选择合适的处理方式。",
    focus: "做法选择",
  },
  {
    name: "定位",
    english: "Locate",
    description: "定位处理结果及其依据，供产品功能继续使用。",
    focus: "结果位置 · 支持依据",
  },
];

const integrationContent = {
  a: {
    eyebrow: "SELECTED PATH · A",
    title: "直接把所选能力嵌入现有产品功能。",
    responsibilities: [
      "题目展示、作答提交或内容处理等产品环节。",
      "按需调用模型，执行任务处理、作答诊断等所选能力。",
      "将处理结果返回产品，用于展示、反馈或后续学习安排。",
    ],
  },
  b: {
    eyebrow: "SELECTED PATH · B",
    title: "连接已有模型或服务，为产品增加学习处理能力。",
    responsibilities: [
      "已有模型或业务服务产生结果之后。",
      "接收已有结果，完成候选比较、检查与定位等处理。",
      "将学习处理结果交给下游功能继续使用。",
    ],
  },
  c: {
    eyebrow: "SELECTED PATH · C",
    title: "从已有结构化数据起步，改善现有业务流程。",
    responsibilities: [
      "已有题库、内容数据或学习记录的处理流程。",
      "使用所选模块处理数据，生成任务、诊断或学习状态结果。",
      "将结果返回现有系统，用于内容处理、学习反馈或记录更新。",
    ],
  },
};

function activateStep(selectedButton, buttons, panel) {
  const selectedIndex = Number(selectedButton.dataset.step);
  const step = stepContent[selectedIndex];

  buttons.forEach((button) => {
    const isSelected = button === selectedButton;
    button.setAttribute("aria-selected", String(isSelected));
    button.tabIndex = isSelected ? 0 : -1;
  });

  panel.setAttribute("aria-labelledby", selectedButton.id);
  panel.replaceChildren();

  const eyebrow = document.createElement("p");
  eyebrow.className = "step-panel__eyebrow";
  eyebrow.textContent = `CURRENT STEP · ${String(selectedIndex + 1).padStart(2, "0")}`;

  const heading = document.createElement("h3");
  heading.append(document.createTextNode(step.name));
  const english = document.createElement("span");
  english.textContent = step.english;
  heading.append(english);

  const description = document.createElement("p");
  description.textContent = step.description;

  const meta = document.createElement("div");
  meta.className = "step-panel__meta";
  const label = document.createElement("span");
  label.textContent = "关注";
  const focus = document.createElement("strong");
  focus.textContent = step.focus;
  meta.append(label, focus);

  panel.append(eyebrow, heading, description, meta);
}

const stepButtons = Array.from(document.querySelectorAll("[data-step]"));
const stepPanel = document.getElementById("step-detail");

if (stepPanel && stepButtons.length > 0) {
  stepButtons.forEach((button, index) => {
    button.addEventListener("click", () => activateStep(button, stepButtons, stepPanel));
    button.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowDown" && event.key !== "ArrowUp" && event.key !== "ArrowLeft" && event.key !== "ArrowRight" && event.key !== "Home" && event.key !== "End") {
        return;
      }

      event.preventDefault();
      let nextIndex = index;
      if (event.key === "ArrowDown" || event.key === "ArrowRight") nextIndex = (index + 1) % stepButtons.length;
      if (event.key === "ArrowUp" || event.key === "ArrowLeft") nextIndex = (index - 1 + stepButtons.length) % stepButtons.length;
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = stepButtons.length - 1;

      stepButtons[nextIndex].focus();
      activateStep(stepButtons[nextIndex], stepButtons, stepPanel);
    });
  });
}

const integrationButtons = Array.from(document.querySelectorAll("[data-integration]"));
const integrationPanel = document.getElementById("integration-detail");

function activateIntegration(selectedButton) {
  const selectedKey = selectedButton.dataset.integration;
  const content = integrationContent[selectedKey];

  integrationButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button === selectedButton));
  });

  if (!integrationPanel || !content) return;

  integrationPanel.replaceChildren();

  const eyebrow = document.createElement("p");
  eyebrow.className = "integration-detail__eyebrow";
  eyebrow.textContent = content.eyebrow;
  const heading = document.createElement("h3");
  heading.textContent = content.title;
  const responsibilities = document.createElement("div");
  responsibilities.className = "integration-responsibilities";

  ["接入位置", "增加的能力", "结果用途"].forEach((labelText, index) => {
    const item = document.createElement("div");
    const label = document.createElement("span");
    label.textContent = labelText;
    const description = document.createElement("p");
    description.textContent = content.responsibilities[index];
    item.append(label, description);
    responsibilities.append(item);
  });

  const note = document.createElement("p");
  note.className = "integration-detail__note";
  note.textContent = "从一个产品功能开始，按需组合所需能力。";
  integrationPanel.append(eyebrow, heading, responsibilities, note);
}

integrationButtons.forEach((button) => {
  button.addEventListener("click", () => activateIntegration(button));
});

const pilotForm = document.getElementById("pilot-form");
const pilotPreview = document.getElementById("pilot-preview");
const pilotStatus = document.getElementById("pilot-status");
const previewContent = pilotPreview?.querySelector(".preview-content");
const pilotScenario = pilotForm?.elements.namedItem("scenario");
let hasCurrentPreview = false;

function clearPreviewAfterEdit() {
  if (!hasCurrentPreview || !pilotPreview || !previewContent || !pilotStatus) return;
  hasCurrentPreview = false;
  previewContent.replaceChildren();
  pilotPreview.hidden = true;
  pilotStatus.textContent = "内容已修改，请重新生成预览。";
}

if (pilotForm && pilotPreview && pilotStatus && previewContent) {
  pilotForm.addEventListener("input", clearPreviewAfterEdit);
  pilotForm.addEventListener("change", clearPreviewAfterEdit);
  pilotForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!pilotForm.reportValidity()) return;

    const fields = [
      ["公司", "company"],
      ["产品", "product"],
      ["业务场景", "scenario"],
      ["当前流程", "currentWorkflow"],
      ["希望改善什么", "desiredOutcome"],
      ["当前可提供的输入", "dataFormat"],
      ["预计接入方式", "integrationMode"],
      ["联系人", "contact"],
    ];
    const definitionList = document.createElement("dl");

    fields.forEach(([labelText, fieldName]) => {
      const field = pilotForm.elements.namedItem(fieldName);
      const label = document.createElement("dt");
      const value = document.createElement("dd");
      label.textContent = labelText;
      value.textContent = field.value.trim();
      definitionList.append(label, value);
    });

    previewContent.replaceChildren(definitionList);
    pilotPreview.hidden = false;
    pilotStatus.textContent = "已生成申请预览，尚未提交。";
    hasCurrentPreview = true;
  });
}

document.querySelectorAll("[data-scenario]").forEach((button) => {
  button.addEventListener("click", () => {
    if (!(pilotScenario instanceof HTMLInputElement)) return;

    const requestedScenario = button.dataset.scenario ?? "";
    if (pilotScenario.value.trim() === "") {
      pilotScenario.value = requestedScenario;
      pilotScenario.dispatchEvent(new Event("input", { bubbles: true }));
      pilotStatus?.replaceChildren(document.createTextNode(`已选择“${requestedScenario}”，可继续填写试点信息。`));
    } else {
      pilotStatus?.replaceChildren(document.createTextNode("已保留你填写的业务场景；如需更换，请直接编辑此字段。"));
    }

    document.getElementById("pilot")?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => pilotScenario.focus({ preventScroll: true }), 250);
  });
});
