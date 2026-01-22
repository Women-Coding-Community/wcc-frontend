// src/utils/mentorshipConstants.ts

export const SKILL_LEVELS = [
  'Expert',
  'Proficient',
  'Experienced',
  'Familiar',
  'Not Applicable'
];

export const PREFERENCE_LEVELS = [
  'Low',
  'Medium',
  'High',
  'Not Applicable'
];

export const DOMAIN_GROUPS = [
  {
    title: "AI, Data & ML",
    fields: [
      { name: 'dataEngineering', label: 'Data Engineering' },
      { name: 'dataScience', label: 'Data Science' },
      { name: 'genAI', label: 'Generative AI and LLMs' },
      { name: 'machineLearning', label: 'Machine Learning and AI' },
      { name: 'mlOps', label: 'MLOps and AI Deployment' },
    ]
  },
  {
    title: "Infrastructure & Operations",
    fields: [
      { name: 'cloudComputing', label: 'Cloud Computing' },
      { name: 'devOps', label: 'DevOps' },
      { name: 'networkEngineering', label: 'Network Engineering' },
      { name: 'platformEngineering', label: 'Platform Engineering' },
      { name: 'security', label: 'Security and Cybersecurity' },
      { name: 'sre', label: 'Site Reliability Engineering' },
    ]
  },
  {
    title: "Product, Leadership & Delivery",
    fields: [
      { name: 'agile', label: 'Agile and Scrum Practices' },
      { name: 'businessAnalysis', label: 'Business Analysis' },
      { name: 'engineeringMgmt', label: 'Engineering Management' },
      { name: 'productMgmt', label: 'Product Management' },
      { name: 'projectMgmt', label: 'Project Management' },
      { name: 'technicalLeadership', label: 'Technical Leadership' },
    ]
  },
  {
    title: "Software Development",
    fields: [
      { name: 'backend', label: 'Backend Development' },
      { name: 'frontend', label: 'Frontend Development' },
      { name: 'fullstack', label: 'Fullstack Development' },
      { name: 'mobileAndroid', label: 'Mobile Development - Android' },
      { name: 'mobileIos', label: 'Mobile Development - iOS' },
      { name: 'qaAutomation', label: 'QA and Test Automation' },
      { name: 'systemDesign', label: 'System Design and Software Architecture' },
    ]
  },
];

export const CAREER_GOALS = [
  { name: 'careerSwitch', label: 'Switch career to IT' },
  { name: 'beginnerToMid', label: 'Grow from beginner to mid-level' },
  { name: 'midToSenior', label: 'Grow from mid-level to senior-level' },
  { name: 'seniorPlus', label: 'Grow beyond senior level' },
  { name: 'icToManager', label: 'Switch from IC to management position' },
  { name: 'specialisationSwitch', label: 'Change specialisation within IT' },
];

export const PROGRAMMING_LANGUAGES = [
  { name: 'c', label: 'C' },
  { name: 'cSharp', label: 'C#' },
  { name: 'go', label: 'Go' },
  { name: 'java', label: 'Java' },
  { name: 'javascript', label: 'JavaScript' },
  { name: 'kotlin', label: 'Kotlin' },
  { name: 'python', label: 'Python' },
  { name: 'rust', label: 'Rust' },
  { name: 'scala', label: 'Scala' },
  { name: 'sql', label: 'SQL' },
  { name: 'swift', label: 'Swift' },
  { name: 'typescript', label: 'TypeScript' },
];

export const COUNTRIES = [
  { code: 'GB', name: 'United Kingdom' },
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'AU', name: 'Australia' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'ES', name: 'Spain' },
  { code: 'IT', name: 'Italy' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'SE', name: 'Sweden' },
  { code: 'NO', name: 'Norway' },
  { code: 'DK', name: 'Denmark' },
  { code: 'FI', name: 'Finland' },
  { code: 'IE', name: 'Ireland' },
  { code: 'PL', name: 'Poland' },
  { code: 'PT', name: 'Portugal' },
  { code: 'GR', name: 'Greece' },
  { code: 'CH', name: 'Switzerland' },
  { code: 'AT', name: 'Austria' },
  { code: 'BE', name: 'Belgium' },
  { code: 'CZ', name: 'Czech Republic' },
  { code: 'IN', name: 'India' },
  { code: 'SG', name: 'Singapore' },
  { code: 'JP', name: 'Japan' },
  { code: 'CN', name: 'China' },
  { code: 'BR', name: 'Brazil' },
  { code: 'MX', name: 'Mexico' },
  { code: 'AR', name: 'Argentina' },
  { code: 'ZA', name: 'South Africa' },
  { code: 'NZ', name: 'New Zealand' },
  { code: 'OTHER', name: 'Other' },
];
