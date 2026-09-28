export const company = {
  name: '岐曌KI',
  english: 'Kizharyn Technologies',
  description: '我们开展认知架构研究，并开发面向实际任务的智能技术产品。',
  email: 'panxingyu4869z@gmail.com',
  alternateEmail: 'p1172545066@163.com',
};

export const research = {
  name: 'Stalyra 认知架构',
  english: 'Stalyra Cognitive Architecture',
  description: '协调表征、预测、目标与规划，并根据新信息更新判断的认知架构设计。',
  overview: 'Stalyra 关注信息处理、预测、目标与规划之间的协作关系。设计中，行动结果和新信息用于更新已有判断，为后续处理提供依据。',
  definition: 'Stalyra 是一种联合信念更新驱动的递归认知架构。父节点保存联合信念，协调表征、预测、目标与规划四类过程；行动结果与新观测用于更新联合后验，后验回写父节点，作为下一轮计算的依据。',
};

export const product = {
  name: 'LIE｜学习引擎',
  english: 'Learning Intelligence Engine',
  description: '为应用提供任务理解、过程检查、学习建议与状态更新的学习引擎。',
  introduction: '从任务与材料出发，分析作答过程，为后续学习行动提供依据。',
};

export const lieAppUrl = 'https://demo.kizharyn.com/';

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
