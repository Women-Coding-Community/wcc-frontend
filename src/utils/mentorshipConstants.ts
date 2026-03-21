// src/utils/mentorshipConstants.ts

export interface LabelValue {
  label: string;
  value: string;
}

export interface AreaGroup {
  title: string;
  areas: LabelValue[];
}

interface Country {
  code: string;
  name: string;
}

export const PROFICIENCY_LEVELS: LabelValue[] = [
  { label: 'Beginner', value: 'BEGINNER' },
  { label: 'Intermediate', value: 'INTERMEDIATE' },
  { label: 'Advanced', value: 'ADVANCED' },
  { label: 'Expert', value: 'EXPERT' },
];

export const MENTORSHIP_TYPES: LabelValue[] = [
  { label: 'Long-Term', value: 'LONG_TERM' },
  { label: 'Ad-Hoc', value: 'AD_HOC' },
];

export const MENTORSHIP_FOCUS_AREAS: LabelValue[] = [
  { label: 'Switch career to IT', value: 'SWITCH_CAREER_TO_IT' },
  { label: 'Grow from beginner to mid-level', value: 'GROW_BEGINNER_TO_MID' },
  { label: 'Grow from mid-level to senior-level', value: 'GROW_MID_TO_SENIOR' },
  { label: 'Grow beyond senior level', value: 'GROW_BEYOND_SENIOR' },
  {
    label: 'Switch from IC to management position',
    value: 'SWITCH_TO_MANAGEMENT',
  },
  { label: 'Change specialisation within IT', value: 'CHANGE_SPECIALISATION' },
];

export const TECHNICAL_AREA_GROUPS: AreaGroup[] = [
  {
    title: 'Software Development',
    areas: [
      { label: 'Backend', value: 'BACKEND' },
      { label: 'Distributed Systems', value: 'DISTRIBUTED_SYSTEMS' },
      { label: 'Frontend', value: 'FRONTEND' },
      { label: 'Fullstack', value: 'FULLSTACK' },
      { label: 'Mobile Android', value: 'MOBILE_ANDROID' },
      { label: 'Mobile iOS', value: 'MOBILE_IOS' },
      { label: 'Quality Assurance', value: 'QA' },
      { label: 'Other', value: 'OTHER' },
    ],
  },
  {
    title: 'AI, Data & ML',
    areas: [
      { label: 'Data Engineering', value: 'DATA_ENGINEERING' },
      { label: 'Data Science', value: 'DATA_SCIENCE' },
      { label: 'Machine Learning', value: 'MACHINE_LEARNING' },
    ],
  },
  {
    title: 'Infrastructure & Operations',
    areas: [
      { label: 'Cloud Engineer', value: 'CLOUD_ENGINEER' },
      { label: 'DevOps', value: 'DEVOPS' },
      { label: 'Network Engineering', value: 'NETWORK_ENGINEERING' },
      { label: 'Security', value: 'SECURITY' },
      { label: 'Site Reliability Engineering', value: 'SRE' },
    ],
  },
  {
    title: 'Product, Leadership & Delivery',
    areas: [
      { label: 'Business Analysis', value: 'BUSINESS_ANALYSIS' },
      { label: 'Engineering Management', value: 'ENG_MANAGEMENT' },
      { label: 'Product Management', value: 'PROD_MANAGEMENT' },
      { label: 'Project Management', value: 'PROJ_MANAGEMENT' },
    ],
  },
];

export const TECHNICAL_AREAS: LabelValue[] = TECHNICAL_AREA_GROUPS.flatMap(
  (g) => g.areas,
);

export const CODE_LANGUAGES: LabelValue[] = [
  { label: 'Bash', value: 'BASH' },
  { label: 'C', value: 'C_LANGUAGE' },
  { label: 'C++', value: 'C_PLUS_PLUS' },
  { label: 'C#', value: 'C_SHARP' },
  { label: 'Dart', value: 'DART' },
  { label: 'Go', value: 'GO' },
  { label: 'HCL', value: 'HCL' },
  { label: 'Java', value: 'JAVA' },
  { label: 'JavaScript', value: 'JAVASCRIPT' },
  { label: 'Kotlin', value: 'KOTLIN' },
  { label: 'OpenTofu', value: 'OPENTOFU' },
  { label: 'PHP', value: 'PHP' },
  { label: 'Python', value: 'PYTHON' },
  { label: 'Rego', value: 'REGO' },
  { label: 'Ruby', value: 'RUBY' },
  { label: 'Rust', value: 'RUST' },
  { label: 'Scala', value: 'SCALA' },
  { label: 'Swift', value: 'SWIFT' },
  { label: 'Terraform', value: 'TERRAFORM' },
  { label: 'TypeScript', value: 'TYPESCRIPT' },
  { label: 'Yaml', value: 'YAML' },
  { label: 'Other', value: 'OTHER' },
];

export const SPOKEN_LANGUAGES: LabelValue[] = [
  { label: 'English', value: 'English' },
  { label: 'French', value: 'French' },
  { label: 'German', value: 'German' },
  { label: 'Spanish', value: 'Spanish' },
  { label: 'Italian', value: 'Italian' },
  { label: 'Dutch', value: 'Dutch' },
  { label: 'Hindi', value: 'Hindi' },
  { label: 'Polish', value: 'Polish' },
  { label: 'Portuguese', value: 'Portuguese' },
  { label: 'Russian', value: 'Russian' },
  { label: 'Ukrainian', value: 'Ukrainian' },
  { label: 'Other', value: 'Other' },
];

export const MENTOR_EXPERIENCE_LEVELS: string[] = [
  '0–2 years',
  '3–5 years',
  '6–10 years',
  '10+ years',
];

export const MENTEE_EXPERIENCE_OPTIONS = [
  { label: 'No experience', value: 0 },
  { label: '0–1 year', value: 1 },
  { label: '1–2 years', value: 2 },
  { label: '3–5 years', value: 3 },
  { label: '6–9 years', value: 6 },
  { label: '10+ years', value: 10 },
];

export const FILTER_EXPERIENCE_OPTIONS = [
  { label: 'Any', value: '0' },
  { label: '3+ years', value: '3' },
  { label: '5+ years', value: '5' },
  { label: '10+ years', value: '10' },
];

const createCountries = (data: Array<[string, string]>): Country[] =>
  data.map(([code, name]) => ({ code, name }));

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

// Legacy — kept for backward compatibility with mentor form Step 3/4 until migrated
export const SKILL_LEVELS = [
  'Expert',
  'Proficient',
  'Experienced',
  'Familiar',
  'Not Applicable',
];
export const PREFERENCE_LEVELS = ['Low', 'Medium', 'High', 'Not Applicable'];
