import { company as sharedCompany } from '../site.mjs';

const company = {
  ...sharedCompany,
  description: 'We study cognitive architectures and develop intelligent technology products for practical tasks.',
};

const research = {
  name: 'Stalyra Cognitive Architecture',
  english: 'Stalyra Cognitive Architecture',
  description: 'A cognitive architecture design that coordinates representation, prediction, goals and planning, updating its assessments as new information arrives.',
  overview: 'Stalyra focuses on how information processing, prediction, goals and planning work together. In this design, action results and new information update existing assessments to inform subsequent processing.',
  definition: 'Stalyra is a recursive cognitive architecture driven by joint belief updates. A parent node holds the joint belief and coordinates four types of processes: representation, prediction, goals and planning. Action results and new observations update the joint posterior, which is written back to the parent node as the basis for the next computation cycle.',
};

const product = {
  name: 'LIE | Learning Engine',
  english: 'Learning Intelligence Engine',
  description: 'A learning engine that helps applications interpret tasks, check responses, recommend learning activities and update learner state.',
  introduction: 'Analyse tasks, materials and responses to inform the next steps in learning.',
};

const contact = {
  description: 'Contact us for technical discussions, product applications and collaboration.',
};

const pages = [
  { key: 'home', file: 'index.html', label: 'Home', title: 'Exploring general intelligence', description: company.description },
  { key: 'research', file: 'research.html', label: 'Research', title: research.name, description: research.description },
  { key: 'product', file: 'product.html', label: 'Products', title: product.name, description: product.description },
  { key: 'about', file: 'about.html', label: 'About', title: 'About us', description: company.description },
  { key: 'contact', file: 'contact.html', label: 'Contact', title: 'Contact us', description: contact.description },
];

export default {
  id: 'en', lang: 'en', label: 'English', directory: 'en',
  company, research, product, contact, pages,
  ui: {
    skip: 'Skip to main content', mainNav: 'Main navigation', footerNav: 'Footer navigation', languageNav: 'Language',
    homeLabel: 'Home', researchLabel: 'Research', productLabel: 'Products',
    exploreResearch: 'Explore our research', viewProducts: 'View products', contactLink: 'Contact',
    researchContact: 'Research enquiries', productContact: 'Product enquiries',
    invitation: 'Contact us', contactEyebrow: 'CONTACT',
    heroTitle: ['Exploring', 'general intelligence'], mission: 'Exploring general intelligence',
    signature: 'Cognitive architectures / Intelligent technology products',
    scope: 'Cognitive architectures and intelligent technology products',
    footerScope: ['Cognitive architecture research', 'Intelligent technology products'],
    learnMore: 'Learn more', artCaption: 'Structure · Connections · Feedback',
    architectureName: 'Cognitive architecture', learnStalyra: 'Explore Stalyra',
    learningEngine: 'Learning engine', productTeaser: 'Explore capabilities, inputs, outputs and integration requirements.',
    learnLie: 'Explore LIE', dataApplications: 'Connecting tasks, analysis and actions',
    conceptDiagram: 'Architecture concept diagram',
    architectureAria: 'A parent node holds the joint belief and coordinates representation, prediction, goals and planning. Action results and new observations update the joint posterior, which is written back to the parent node. The four processes do not indicate a fixed execution order.',
    parentNode: 'Parent node', jointBelief: 'Joint belief', processes: ['Representation', 'Prediction', 'Goals', 'Planning'],
    actionResults: 'Action results', and: 'and', observations: 'New observations', jointPosterior: 'Joint posterior',
    update: 'Update', writeBack: 'Write back to parent node',
    architectureCaption: 'The joint belief coordinates the four processes. The posterior is written back to inform the next computation cycle.',
    overviewLabels: ['Information', 'Goals', 'Actions'], overviewCaption: 'Coordinating information, goals and actions',
    integrationDiagram: 'Integration diagram', input: 'Input', output: 'Output',
    learningData: 'Tasks, materials and responses', structuredResults: 'Analysis, suggested actions and state',
    integrationCaption: 'Connect task analysis, response checking, learning actions and state updates.',
    researchEyebrow: 'RESEARCH / STALYRA', designLabel: 'Design approach',
    designTitle: 'Connecting information, goals and actions', architectureDetails: 'View architecture details',
    architectureNote: 'The concept diagram shows the relationships between components, not a fixed execution order.',
    productEyebrow: 'PRODUCT / LIE', integrationContact: 'Discuss integration',
    applicationsLabel: 'Product applications', applicationsTitle: 'Discuss product applications',
    applicationsDescription: 'Define data requirements, integration conditions and validation goals based on your business needs.',
    discussions: [
      { title: 'Business needs', description: 'Review workflows, use cases and the problems to address.' },
      { title: 'Inputs and outputs', description: 'Define the format and content of input data, along with the expected outputs.' },
      { title: 'Integration and validation', description: 'Assess the integration environment, scope of use and validation conditions.' },
    ],
    aboutEyebrow: 'ABOUT / KIZHARYN TECHNOLOGIES', aboutTitle: ['About', 'Kizharyn Technologies'],
    directionLabel: 'Our focus', directionDescription: ['We study cognitive architectures', 'and develop intelligent technology products for practical tasks.'],
    contactTitle: ['Contact', 'us'], contactMethods: 'Contact details', cooperation: 'Collaboration enquiries',
    emailDescription: 'You can reach us at the email addresses below.',
  },
  form: {
    title: 'Contact information', description: 'Complete the form to prepare an email, then review and send it in your email app.',
    email: 'Email address', intent: 'Enquiry type', name: 'Name', organization: 'Organisation', message: 'Message',
    required: 'Required', requiredChoice: 'Required', optional: 'Optional',
    research: 'Research enquiry', product: 'Product enquiry',
    placeholder: 'Briefly describe your technical question, use case or collaboration enquiry.',
    notice: 'Please do not include sensitive business data or unpublished technical information in your initial enquiry.',
    submit: 'Prepare email', openMail: 'Open email app', copyMail: 'Copy email content',
    mailHelp: 'Review and send the message in your email app. If it does not open, copy the content and send it to an address above.',
    noScript: 'Please contact us directly at one of the email addresses on this page.',
    privacyTitle: 'How your contact information is used',
    privacyDescription: 'The information you enter is used only to prepare an email. This page does not automatically send or store it. Review the content in your email app before sending and include only the information needed for your enquiry.',
    changed: 'Your information has changed. Please prepare the email again.',
    messageRequired: 'Please briefly describe your enquiry.', emailRequired: 'Please enter your email address.',
    ready: 'Your email is ready. Please review and send it in your email app.',
    copied: 'Email content copied. Paste it into your email app to send it.',
    copyFailed: 'Unable to copy the content. Please contact us directly at an email address on this page.',
    recipient: 'To', subject: 'Subject', separator: ': ',
  },
};
