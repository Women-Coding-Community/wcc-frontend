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

interface Country {
  code: string;
  name: string;
}

const createFields = (fields: Array<[string, string]>): DomainField[] => {
  return fields.map(([name, label]) => ({ name, label }));
};

const createCountries = (data: Array<[string, string]>): Country[] => {
  return data.map(([code, name]) => ({ code, name }));
};

const createGroup = (title: string, fieldData: Array<[string, string]>): DomainGroup => {
  return {
    title,
    fields: createFields(fieldData)
  };
};

export const DOMAIN_GROUPS: DomainGroup[] = [
  createGroup("AI, Data & ML", [
    ['dataEngineering', 'Data Engineering'],
    ['dataScience', 'Data Science'],
    ['genAI', 'Generative AI and LLMs'],
    ['machineLearning', 'Machine Learning and AI'],
    ['mlOps', 'MLOps and AI Deployment'],
  ]),
  createGroup("Infrastructure & Operations", [
    ['cloudComputing', 'Cloud Computing'],
    ['devOps', 'DevOps'],
    ['networkEngineering', 'Network Engineering'],
    ['platformEngineering', 'Platform Engineering'],
    ['security', 'Security and Cybersecurity'],
    ['sre', 'Site Reliability Engineering'],
  ]),
  createGroup("Product, Leadership & Delivery", [
    ['agile', 'Agile and Scrum Practices'],
    ['businessAnalysis', 'Business Analysis'],
    ['engineeringMgmt', 'Engineering Management'],
    ['productMgmt', 'Product Management'],
    ['projectMgmt', 'Project Management'],
    ['technicalLeadership', 'Technical Leadership'],
  ]),
  createGroup("Software Development", [
    ['backend', 'Backend Development'],
    ['frontend', 'Frontend Development'],
    ['fullstack', 'Fullstack Development'],
    ['mobileAndroid', 'Mobile Development - Android'],
    ['mobileIos', 'Mobile Development - iOS'],
    ['qaAutomation', 'QA and Test Automation'],
    ['systemDesign', 'System Design and Software Architecture'],
  ]),
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

export const COUNTRIES = createCountries([
  ['GB', 'United Kingdom'],
  ['US', 'United States'],
  ['CA', 'Canada'],
  ['AU', 'Australia'],
  ['DE', 'Germany'],
  ['FR', 'France'],
  ['ES', 'Spain'],
  ['IT', 'Italy'],
  ['NL', 'Netherlands'],
  ['SE', 'Sweden'],
  ['NO', 'Norway'],
  ['DK', 'Denmark'],
  ['FI', 'Finland'],
  ['IE', 'Ireland'],
  ['PL', 'Poland'],
  ['PT', 'Portugal'],
  ['GR', 'Greece'],
  ['CH', 'Switzerland'],
  ['AT', 'Austria'],
  ['BE', 'Belgium'],
  ['CZ', 'Czech Republic'],
  ['IN', 'India'],
  ['SG', 'Singapore'],
  ['JP', 'Japan'],
  ['CN', 'China'],
  ['BR', 'Brazil'],
  ['MX', 'Mexico'],
  ['AR', 'Argentina'],
  ['ZA', 'South Africa'],
  ['NZ', 'New Zealand'],
  ['OTHER', 'Other'],
]);
