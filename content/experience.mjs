// Public task descriptions and fixed, paired illustrations; no service execution.
const moduleIds = ['task', 'diagnostic', 'action', 'state'];
const capabilityIds = ['N01', 'N02', 'N03', 'N04', 'N05', 'N06', 'N07', 'N08'];
const entries = (ids, rows) => rows.map(([name, description], index) => ({ id: ids[index], name, description }));

export const experience = {
  zh: {
    sampleTitle: '输入、结果与核验，放在一起',
    sampleIntro: '下面用一份数学版示例说明输入与结果。',
    input: '提供什么', output: '获得什么', verify: '怎样核验', sampleNav: '产品样例',
    samples: [
  {
    "id": "task",
    "name": "任务理解",
    "input": "题目：甲有18本书，比乙多6本。甲给乙3本后，两人各有多少本？",
    "output": "任务目标：求甲、乙转移后的书本数量。配套返回列出两个目标对象。",
    "verify": "逐项对应题干中“甲”“乙”与“两人各有多少本”。范围仅为 本示例的任务目标。"
  },
  {
    "id": "diagnostic",
    "name": "过程检查",
    "input": "配套作答：乙原有18-6=24本；甲现在有18-3=15本；乙现在有24+3=27本。",
    "output": "配套返回指出第一步片段 18-6=24 需复核；该减法结果应为 12。",
    "verify": "将原文片段与第一步对应，独立计算 18 − 6 = 12。返回另将最终答案标记为无法确定，不推断学习者整体状态。"
  },
  {
    "id": "statistics",
    "name": "事实汇总",
    "input": "本示例配套返回中的两条作答检查记录。",
    "output": "对这份固定返回逐项计数：确定需复核 1 条；无法确定 1 条；合计 2 条。",
    "verify": "分别对应第一步算式与最终答案两条记录，1 + 1 = 2。这是样例返回的事实摘要，未调用统计接口，不代表整体学习状态。"
  }
],
    moduleContracts: [{"input":"任务与可定位材料；必要的已知条件及所求目标。","output":"任务目标与条件、可用结果与求解说明；未完成时注明仍缺什么。"},{"input":"用户实际写出的过程或末答，以及对应任务材料。","output":"需复核的原文位置、对应解释与可检查范围；观察不足时保留未知。"},{"input":"明确的表现目标、已有表现事实、企业授权题库或材料。","output":"可执行的后续学习行动、材料引用或再测安排；需先完成内容接口接入。"},{"input":"有来源的实际表现记录、是否独立完成，以及本次考察范围。","output":"这些记录支持的表现状态变化与覆盖摘要；不凭一次阅读认定掌握。"}],
    modulesTitle: '四个可独立接入的模块', directoryTitle: '工作能力目录', directoryIntro: '按任务与预期结果选择入口。能力的包含关系、依赖和开放权限以正式交付材料为准。',
    status: '咨询接入', detail: '查看详情', console: '进入 LIE Console', consoleIntro: '能力目录、API 工作区与接入文档。', demo: '体验 LIE', moduleIntro: '四个模块可分别接入、部署、调用与验收。企业可按接口契约提供所需上游输入；Full Suite 提供可选组合，不要求固定调用顺序。',
    modules: entries(moduleIds, [['任务理解', '供应用处理与审核任务内容，整理条件与目标，并取得可用的任务结果。'], ['过程检查', '供学习应用复核用户实际作答，把需关注的结论对应到原文位置。'], ['学习行动', '供应用在已有表现基础上安排下一步学习，连接企业获授权的内容。'], ['学习状态', '供应用持续记录实际表现，区分独立完成、仍缺观察与尚未覆盖的范围。']]),
    capabilities: entries(capabilityIds, [['事实汇总', '汇总选定记录的数量、分布与来源，查看统计范围。'], ['任务推进', '查看当前进度、继续条件与可恢复的位置。'], ['目标探索', '在给定对象和约束范围内，查看可探索的结果。'], ['访问与展示', '为不同角色呈现其可访问的内容与操作入口。'], ['连续任务工作台', '在同一工作区衔接相关操作，查看各阶段结果。'], ['资料校正与内容管理', '依据来源校正资料，并管理获授权的内容。'], ['补充与复核', '补齐指定信息，查看再次核验的结果；补充测评依赖企业授权题库或材料接口。'], ['题目生成', '按约定题目要求生成题目，查看校验结果与采用范围。']]),
    conditionsTitle: '从明确场景开始接入', conditions: '先确定业务场景、可用输入、预期结果与验收标准，再核对能力授权、接口版本与交付范围。目录和样例不表示全部能力已开通。补充测评与内容采用需先确认企业授权题库或材料接口。',
    researchQuestion: '信息、目标与行动如何协调？', researchScope: '本页介绍研究方向。开展交流时，请说明关注的问题、已有材料和预期讨论范围。',
    sourcesTitle: '交流指南', sourceType: '研究交流', sourceDate: '联系时请说明研究主题', sourceTitle: 'Stalyra 研究交流指南', sourceLink: '查看使用指南',
    sourceScope: '请提供研究问题、应用场景和希望讨论的内容，通过联系页面发起交流。',
    researchIntro: '研究对象是表征、预测、目标与规划的协作关系，以及新信息对已有判断的影响。',
    contactTask: '希望完成什么任务？', contactInput: '已有何种输入？', contactResult: '希望验证什么结果？',
    availableInput: '已有输入', expectedResult: '希望获得的结果', acceptanceCriteria: '希望验证的标准',
    inputHint: '例如：题目、实际作答、获授权的记录；只描述类型与格式。', resultHint: '例如：定位作答中需复核的位置。', criteriaHint: '例如：结果能对应原文位置，并注明检查范围。',
  },
  en: {
    sampleTitle: 'Inputs, results and checks, together',
    sampleIntro: 'The following example from the mathematics edition illustrates inputs and results.',
    input: 'What you provide', output: 'What you receive', verify: 'How to check it', sampleNav: 'Product examples',
    samples: [
  {
    "id": "task",
    "name": "Task understanding",
    "input": "Question: A has 18 books, 6 more than B. After A gives B 3 books, how many does each have?",
    "output": "Task goals: determine the book counts for A and B after the transfer. The paired response lists two target objects.",
    "verify": "Match A, B and “how many does each have” to the question. Scope: task goals of this example question only."
  },
  {
    "id": "diagnostic",
    "name": "Process checking",
    "input": "Paired response: B initially has 18-6=24 books; A now has 18-3=15; B now has 24+3=27.",
    "output": "The paired result identifies 18-6=24 in the first step for review. The subtraction result should be 12.",
    "verify": "Locate the first-step quote and calculate 18 − 6 = 12 independently. The final answer is separately marked undetermined; no overall learner state is inferred."
  },
  {
    "id": "statistics",
    "name": "Fact summary",
    "input": "The two response-check records in the paired example result.",
    "output": "Count this fixed response: 1 definite review finding; 1 undetermined finding; 2 total.",
    "verify": "Match the first-step expression and the final answer to their two records: 1 + 1 = 2. This summarises the example response; no statistics request was made and no overall learner state is implied."
  }
],
    moduleContracts: [{"input":"A task and locatable materials, with necessary conditions and requested goals.","output":"Goals, conditions, available results and solution explanations; what is missing when incomplete."},{"input":"The user’s actual steps or final response, plus the corresponding task materials.","output":"Input positions to review, explanations and check scope; missing observations remain unknown."},{"input":"A defined performance goal, observed performance facts and authorised enterprise questions or materials.","output":"Next learning actions, material references or retest arrangements; the content interface must be connected first."},{"input":"Sourced performance records, whether work was independent and the assessed scope.","output":"Supported performance-state changes and coverage summaries; reading alone does not establish mastery."}],
    modulesTitle: 'Four independently integrable modules', directoryTitle: 'Work capability directory', directoryIntro: 'Choose by task and expected result. Inclusion, dependencies and access permissions are defined by the formal delivery materials.',
    status: 'Discuss access', detail: 'View details', console: 'Open LIE Console', consoleIntro: 'Capability directory, API workspace and integration documentation.', demo: 'Try LIE · Chinese', moduleIntro: 'Integrate, deploy, call and validate each module independently. Enterprises may supply the required upstream inputs under the interface contract. Full Suite offers optional composition, with no mandatory sequence.',
    modules: entries(moduleIds, [['Task understanding', 'Help applications process and review task content, organise conditions and goals, and obtain available task results.'], ['Process checking', 'Help learning applications review actual responses and link findings to positions in the original input.'], ['Learning actions', 'Help applications arrange next learning actions from observed performance and authorised enterprise content.'], ['Learning state', 'Help applications track actual performance, distinguishing independent work, missing observations and uncovered scope.']]),
    capabilities: entries(capabilityIds, [['Fact summary', 'Summarise counts, distributions and sources of selected records, with the statistical scope.'], ['Task progression', 'Review current progress, continuation conditions and recovery points.'], ['Goal exploration', 'Explore possible results within supplied objects and constraints.'], ['Access and presentation', 'Present content and actions that each role is authorised to access.'], ['Continuous task workspace', 'Connect related operations in one workspace and review each stage’s results.'], ['Source correction and content management', 'Correct materials against sources and manage authorised content.'], ['Supplement and review', 'Add specified information and review another check; further assessment requires an authorised enterprise question bank or materials interface.'], ['Question generation', 'Generate questions to agreed requirements and review validation and adoption scope.']]),
    conditionsTitle: 'Start with a concrete use case', conditions: 'Define the task, available inputs, expected results and acceptance criteria, then confirm capability access, interface versions and delivery scope. A directory entry or example does not grant access. Further assessment and content adoption require an authorised enterprise question bank or materials interface.',
    researchQuestion: 'How can information, goals and actions work together?', researchScope: 'This page introduces the research direction. For enquiries, describe your questions, available materials and intended discussion scope.',
    sourcesTitle: 'Enquiry guide', sourceType: 'Research enquiries', sourceDate: 'Include your research topic', sourceTitle: 'Stalyra research enquiry guide', sourceLink: 'View user guide',
    sourceScope: 'Describe your research question, use case and discussion topics, then use the contact page to start a conversation.',
    researchIntro: 'The research concerns coordination between representation, prediction, goals and planning, and how new information affects existing assessments.',
    contactTask: 'What task should be completed?', contactInput: 'What inputs are available?', contactResult: 'What result should be validated?',
    availableInput: 'Available inputs', expectedResult: 'Expected results', acceptanceCriteria: 'Acceptance criteria',
    inputHint: 'For example: questions, actual responses or authorised records. Describe types and formats only.', resultHint: 'For example: locate positions in a response that need review.', criteriaHint: 'For example: each finding points to its input position and states its scope.',
  },
  de: {
    sampleTitle: 'Eingabe, Ergebnis und Prüfung zusammen',
    sampleIntro: 'Das folgende Beispiel aus der Mathematik-Ausgabe zeigt Eingaben und Ergebnisse.',
    input: 'Was Sie bereitstellen', output: 'Was Sie erhalten', verify: 'Wie Sie es prüfen', sampleNav: 'Produktbeispiele',
    samples: [
  {
    "id": "task",
    "name": "Aufgabenverständnis",
    "input": "Aufgabe: A hat 18 Bücher, 6 mehr als B. A gibt B 3 Bücher. Wie viele hat dann jede Person?",
    "output": "Aufgabenziele: Buchanzahl von A und B nach der Übergabe bestimmen. Die zugeordnete Antwort nennt zwei Zielobjekte.",
    "verify": "A, B und die Frage nach der Anzahl mit dem Aufgabentext abgleichen. Umfang: nur die Ziele der Beispielaufgabe."
  },
  {
    "id": "diagnostic",
    "name": "Prüfung des Lösungswegs",
    "input": "Zugeordneter Lösungsweg: B hat anfangs 18-6=24 Bücher; A hat jetzt 18-3=15; B hat jetzt 24+3=27.",
    "output": "Das zugeordnete Ergebnis markiert 18-6=24 im ersten Schritt zur Prüfung. Die Subtraktion ergibt 12.",
    "verify": "Die zitierte Stelle im ersten Schritt finden und 18 − 6 = 12 unabhängig berechnen. Die Endantwort wird separat als unbestimmt markiert; ein allgemeiner Lernstand wird nicht abgeleitet."
  },
  {
    "id": "statistics",
    "name": "Faktenübersicht",
    "input": "Die zwei Prüfdatensätze der zugeordneten Antwort zu dieser Beispielaufgabe.",
    "output": "Zählung der festen Antwort: 1 eindeutig prüfbedürftiger Befund; 1 unbestimmter Befund; insgesamt 2.",
    "verify": "Erste Rechnung und Endantwort ihren zwei Datensätzen zuordnen: 1 + 1 = 2. Dies fasst die Beispielantwort zusammen; kein Statistikaufruf und keine Aussage zum allgemeinen Lernstand."
  }
],
    moduleContracts: [{"input":"Eine Aufgabe und auffindbare Materialien mit notwendigen Bedingungen und gesuchten Zielen.","output":"Ziele, Bedingungen, verfügbare Ergebnisse und Lösungserläuterungen; fehlende Angaben bei unvollständigen Ergebnissen."},{"input":"Tatsächlich geschriebene Schritte oder die Endantwort mit den zugehörigen Aufgabenmaterialien.","output":"Zu prüfende Eingabestellen, Erläuterungen und Prüfumfang; fehlende Beobachtungen bleiben unbekannt."},{"input":"Ein festgelegtes Leistungsziel, beobachtete Leistungsfakten und autorisierte Unternehmensaufgaben oder Materialien.","output":"Nächste Lernmaßnahmen, Materialverweise oder Wiederholungsprüfungen; die Inhaltsschnittstelle muss zuerst angebunden sein."},{"input":"Leistungsdatensätze mit Quelle, selbstständige oder unterstützte Bearbeitung und geprüfter Umfang.","output":"Belegte Änderungen des Leistungsstands und Abdeckungsübersichten; Lesen allein belegt keine Beherrschung."}],
    modulesTitle: 'Vier unabhängig integrierbare Module', directoryTitle: 'Verzeichnis der Arbeitsfunktionen', directoryIntro: 'Nach Aufgabe und erwartetem Ergebnis auswählen. Zugehörigkeit, Abhängigkeiten und Zugriffsrechte werden in den verbindlichen Lieferunterlagen festgelegt.',
    status: 'Zugang anfragen', detail: 'Details ansehen', console: 'LIE Console öffnen', consoleIntro: 'Funktionsverzeichnis, API-Arbeitsbereich und Integrationsdokumentation.', demo: 'LIE ausprobieren · Chinesisch', moduleIntro: 'Jedes Modul lässt sich separat integrieren, bereitstellen, aufrufen und abnehmen. Unternehmen können erforderliche vorgelagerte Eingaben gemäß Schnittstellenvertrag liefern. Full Suite bietet eine optionale Kombination ohne feste Aufrufreihenfolge.',
    modules: entries(moduleIds, [['Aufgabenverständnis', 'Anwendungen beim Verarbeiten und Prüfen von Aufgaben unterstützen, Bedingungen und Ziele ordnen und verfügbare Ergebnisse erhalten.'], ['Prüfung des Lösungswegs', 'Lernanwendungen bei der Prüfung tatsächlicher Antworten unterstützen und Befunde mit Stellen der Originaleingabe verbinden.'], ['Lernmaßnahmen', 'Anwendungen bei nächsten Lernmaßnahmen auf Grundlage beobachteter Leistungen und autorisierter Unternehmensinhalte unterstützen.'], ['Lernstand', 'Anwendungen beim Erfassen tatsächlicher Leistungen unterstützen: selbstständige Bearbeitung, fehlende Beobachtungen und nicht abgedeckte Bereiche unterscheiden.']]),
    capabilities: entries(capabilityIds, [['Faktenübersicht', 'Anzahl, Verteilung und Quellen ausgewählter Datensätze mit ihrem statistischen Umfang zusammenfassen.'], ['Aufgabenfortschritt', 'Aktuellen Fortschritt, Bedingungen zum Fortsetzen und Wiederaufnahmepunkte prüfen.'], ['Zielerkundung', 'Mögliche Ergebnisse innerhalb vorgegebener Objekte und Einschränkungen erkunden.'], ['Zugriff und Darstellung', 'Für jede Rolle zugängliche Inhalte und Aktionen darstellen.'], ['Arbeitsbereich für fortlaufende Aufgaben', 'Verwandte Vorgänge verbinden und Ergebnisse jeder Phase betrachten.'], ['Quellenkorrektur und Inhaltsverwaltung', 'Materialien anhand von Quellen korrigieren und autorisierte Inhalte verwalten.'], ['Ergänzung und erneute Prüfung', 'Angeforderte Informationen ergänzen und erneut prüfen; zusätzliche Erhebungen benötigen eine autorisierte Unternehmensaufgabenbank oder Materialschnittstelle.'], ['Aufgabengenerierung', 'Aufgaben gemäß vereinbarten Anforderungen erzeugen und Prüfung sowie Nutzungsumfang betrachten.']]),
    conditionsTitle: 'Mit einem konkreten Anwendungsfall beginnen', conditions: 'Aufgabe, verfügbare Eingaben, erwartete Ergebnisse und Abnahmekriterien festlegen. Danach Funktionszugang, Schnittstellenversion und Lieferumfang klären. Verzeichniseinträge und Beispiele erteilen keine Zugriffsrechte. Zusätzliche Erhebungen und Inhaltsnutzung benötigen eine autorisierte Unternehmensaufgabenbank oder Materialschnittstelle.',
    researchQuestion: 'Wie wirken Information, Ziele und Handlung zusammen?', researchScope: 'Diese Seite stellt die Forschungsrichtung vor. Nennen Sie bei Anfragen Ihre Fragen, vorhandene Materialien und den gewünschten Gesprächsumfang.',
    sourcesTitle: 'Leitfaden für Anfragen', sourceType: 'Forschungsanfragen', sourceDate: 'Bitte Forschungsthema angeben', sourceTitle: 'Leitfaden für Stalyra-Forschungsanfragen', sourceLink: 'Nutzungsleitfaden ansehen',
    sourceScope: 'Beschreiben Sie Forschungsfrage, Anwendungsszenario und Gesprächsthemen. Nutzen Sie anschließend die Kontaktseite für Ihre Anfrage.',
    researchIntro: 'Untersucht werden die Koordination von Repräsentation, Vorhersage, Zielen und Planung sowie der Einfluss neuer Informationen auf bestehende Einschätzungen.',
    contactTask: 'Welche Aufgabe soll gelöst werden?', contactInput: 'Welche Eingaben liegen vor?', contactResult: 'Welches Ergebnis soll geprüft werden?',
    availableInput: 'Vorhandene Eingaben', expectedResult: 'Erwartete Ergebnisse', acceptanceCriteria: 'Abnahmekriterien',
    inputHint: 'Zum Beispiel Aufgaben, tatsächliche Antworten oder autorisierte Datensätze. Nur Arten und Formate beschreiben.', resultHint: 'Zum Beispiel prüfbedürftige Stellen in einem Lösungsweg finden.', criteriaHint: 'Zum Beispiel verweist jedes Ergebnis auf die Eingabestelle und nennt seinen Geltungsbereich.',
  },
};

export const researchSourceUrl = './contact.html?intent=research';
