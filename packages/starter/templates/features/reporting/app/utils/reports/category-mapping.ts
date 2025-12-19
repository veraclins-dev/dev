import { type ReportCategory } from '#app/utils/db/enums';

const SAFETY_CATEGORIES: ReportCategory[] = [
  'under_18_content',
  'harassment_or_bullying',
  'suicide_self_harm',
  'violent_or_disturbing',
];

const CONTENT_QUALITY_CATEGORIES: ReportCategory[] = [
  'spam',
  'misinformation',
  'unwanted_content',
];

const LEGAL_CATEGORIES: ReportCategory[] = ['illegal_content'];

const USER_SPECIFIC_CATEGORIES: ReportCategory[] = [
  'impersonation_or_fake',
  'spam_account',
];

const CONTENT_ENTITY_CATEGORIES: ReportCategory[] = [
  ...SAFETY_CATEGORIES,
  ...CONTENT_QUALITY_CATEGORIES,
  ...LEGAL_CATEGORIES,
];

export const REPORT_CATEGORIES_BY_ENTITY: Record<string, ReportCategory[]> = {
  user: [
    ...SAFETY_CATEGORIES,
    ...LEGAL_CATEGORIES,
    ...USER_SPECIFIC_CATEGORIES,
  ],
};

export function getCategoriesForEntityType(
  entityType: string
): ReportCategory[] {
  return REPORT_CATEGORIES_BY_ENTITY[entityType] || CONTENT_ENTITY_CATEGORIES;
}

export function isValidCategoryForEntity(
  category: ReportCategory,
  entityType: string
): boolean {
  return getCategoriesForEntityType(entityType).includes(category);
}

export const REPORT_CATEGORY_LABELS: Record<ReportCategory, string> = {
  under_18_content: 'Problem involving someone under 18',
  harassment_or_bullying: 'Bullying, harassment or abuse',
  suicide_self_harm: 'Suicide or self-harm',
  violent_or_disturbing: 'Violent, hateful or disturbing content',
  spam: 'Spam',
  misinformation: 'Scam, fraud or false information',
  unwanted_content: "I don't want to see this",
  illegal_content: 'Selling or promoting restricted items',
  impersonation_or_fake: 'Impersonation or fake account',
  spam_account: 'Spam account',
};

export const REPORT_CATEGORY_DESCRIPTIONS: Record<ReportCategory, string> = {
  under_18_content:
    'Content involving or targeting someone under 18 years of age',
  harassment_or_bullying:
    'Harassing an individual, including doxing, threats, or persistent unwanted contact',
  suicide_self_harm:
    'Threatening or glorifying violence, serious harm, or self-harm',
  violent_or_disturbing:
    'Content that promotes violence, hate speech, or contains disturbing imagery',
  spam: 'Selling illegal goods, money scams, or repetitive unwanted content',
  misinformation:
    'False information, scams, fraud, or misleading claims that could cause harm',
  unwanted_content:
    "Content you find irrelevant, low quality, or simply don't want to see",
  illegal_content:
    'Selling or promoting restricted items, illegal goods, or unlawful activities',
  impersonation_or_fake:
    'Account pretending to be someone else or using false identity',
  spam_account:
    'Account created to spam, scam, or engage in harmful activities',
};

export function getCategoryLabel(category: ReportCategory) {
  return {
    label: REPORT_CATEGORY_LABELS[category] || category,
    description: REPORT_CATEGORY_DESCRIPTIONS[category] || '',
  };
}
