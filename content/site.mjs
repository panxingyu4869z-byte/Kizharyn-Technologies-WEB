export const company = {
  name: '岐曌KI',
  english: 'Kizharyn Technologies',
  description: '我们以 Stalyra 探索信息、目标与行动如何协调，并以 LIE 展示学习领域的产品应用。',
  email: 'panxingyu4869z@gmail.com',
  alternateEmail: 'p1172545066@163.com',
};

export const research = {
  name: 'Stalyra 认知架构',
  english: 'Stalyra Cognitive Architecture',
  description: '协调表征、预测、目标与规划，并根据新信息更新判断的认知架构设计。',
  overview: 'Stalyra 关注信息处理、预测、目标与规划之间的协作关系。设计中，行动结果和新信息用于更新已有判断，为后续处理提供依据。',
  definition: 'Stalyra 研究信息、目标与行动之间的协调。交流时请提供具体场景、可用信息、希望完成的目标及结果评价方式。',
};

export const product = {
  name: 'LIE｜学习引擎',
  english: 'Learning Intelligence Engine',
  description: 'LIE 是面向学习领域的产品示例，为企业应用提供任务处理、过程检查、后续行动与表现记录能力，可独立接入或组合使用。',
  introduction: '从任务与材料出发，分析作答过程，为后续学习行动提供依据。',
};

export const lieAppUrl = 'https://lie-cn-demo-math.kizharyn.com/';
export const lieConsoleUrl = 'https://lie-cn.kizharyn.com/';

export const contact = {
  description: '欢迎开展技术交流，咨询产品应用与合作。',
};

// No progress entries or capability claims are published without their source material.
export const pages = [
  { key: 'home', file: 'index.html', label: '首页', title: '探索通用智能', description: company.description },
  { key: 'research', file: 'research.html', label: '研究', title: research.name, description: research.description },
  { key: 'product', file: 'product.html', label: '产品', title: product.name, description: product.description },
  { key: 'about', file: 'about.html', label: '关于我们', title: '关于我们', description: company.description },
  { key: 'contact', file: 'contact.html', label: '联系合作', title: '与我们交流', description: contact.description },
];
