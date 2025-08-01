export interface BusinessPlanSection {
  id: string;
  title: string;
  content: string | string[];
  contentType: 'paragraph' | 'bullets';
  pageNumber: number;
}

export interface BusinessPlanTemplate {
  id: string;
  name: string;
  description: string;
  sections: BusinessPlanSection[];
  theme: BusinessPlanTheme;
}

export interface BusinessPlanTheme {
  name: string;
  fonts: {
    title: string;
    heading: string;
    body: string;
  };
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    titleText: string;
    sectionTitle: string;
    sectionText: string;
  };
  pageStyles: {
    borderRadius: string;
    borderWidth: string;
    borderStyle: string;
    shadow: string;
  };
  sectionStyles: {
    borderRadius: string;
    borderWidth: string;
    borderStyle: string;
    shadow: string;
  };
}

export interface BusinessPlanData {
  companyName?: string;
  executiveSummary?: string | string[];
  companyDescription?: string | string[];
  marketAnalysis?: string | string[];
  organizationManagement?: string | string[];
  serviceProductLine?: string | string[];
  marketingSales?: string | string[];
  fundingRequest?: string | string[];
  financialProjections?: string | string[];
  appendix?: string | string[];
  [key: string]: string | string[] | undefined;
}

export interface UploadData {
  type: 'json' | 'text';
  content: string;
}