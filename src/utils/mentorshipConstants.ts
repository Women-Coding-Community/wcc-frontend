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

interface DomainField {
  name: string;
  label: string;
}

interface DomainGroup {
  title: string;
  fields: DomainField[];
}

const createFields = (fields: Array<[string, string]>): DomainField[] => {
  return fields.map(([name, label]) => ({ name, label }));
};

export const DOMAIN_GROUPS: DomainGroup[] = [
  {
    title: "AI, Data & ML",
    fields: createFields([
      ['dataEngineering', 'Data Engineering'],
      ['dataScience', 'Data Science'],
      ['genAI', 'Generative AI and LLMs'],
      ['machineLearning', 'Machine Learning and AI'],
      ['mlOps', 'MLOps and AI Deployment'],
    ])
  },
  {
    title: "Infrastructure & Operations",
    fields: createFields([
      ['cloudComputing', 'Cloud Computing'],
      ['devOps', 'DevOps'],
      ['networkEngineering', 'Network Engineering'],
      ['platformEngineering', 'Platform Engineering'],
      ['security', 'Security and Cybersecurity'],
      ['sre', 'Site Reliability Engineering'],
    ])
  },
  {
    title: "Product, Leadership & Delivery",
    fields: createFields([
      ['agile', 'Agile and Scrum Practices'],
      ['businessAnalysis', 'Business Analysis'],
      ['engineeringMgmt', 'Engineering Management'],
      ['productMgmt', 'Product Management'],
      ['projectMgmt', 'Project Management'],
      ['technicalLeadership', 'Technical Leadership'],
    ])
  },
  {
    title: "Software Development",
    fields: createFields([
      ['backend', 'Backend Development'],
      ['frontend', 'Frontend Development'],
      ['fullstack', 'Fullstack Development'],
      ['mobileAndroid', 'Mobile Development - Android'],
      ['mobileIos', 'Mobile Development - iOS'],
      ['qaAutomation', 'QA and Test Automation'],
      ['systemDesign', 'System Design and Software Architecture'],
    ])
  },
];

export const CAREER_GOALS = createFields([
  ['careerSwitch', 'Switch career to IT'],
  ['beginnerToMid', 'Grow from beginner to mid-level'],
  ['midToSenior', 'Grow from mid-level to senior-level'],
  ['seniorPlus', 'Grow beyond senior level'],
  ['icToManager', 'Switch from IC to management position'],
  ['specialisationSwitch', 'Change specialisation within IT'],
]);

export const PROGRAMMING_LANGUAGES = createFields([
  ['c', 'C'],
  ['cSharp', 'C#'],
  ['go', 'Go'],
  ['java', 'Java'],
  ['javascript', 'JavaScript'],
  ['kotlin', 'Kotlin'],
  ['python', 'Python'],
  ['rust', 'Rust'],
  ['scala', 'Scala'],
  ['sql', 'SQL'],
  ['swift', 'Swift'],
  ['typescript', 'TypeScript'],
]);

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
