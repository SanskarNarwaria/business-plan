export interface BusinessPlanSection {
  id: string;
  title: string;
  content: Record<string, any>;
  contentType: 'structured';
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

// Fixed structure for each page
export interface CoverPageData {
  companyName: string;
  subtitle: string;
  year: string;
  preparedBy: string;
}

export interface TableOfContentsData {
  showPageNumbers: boolean;
  includeSubsections: boolean;
}

export interface CompanyDescriptionData {
  legalStructure: string;
  companyHistory: string;
  industry: string;
  visionStatement: string;
  uniqueValueProposition: string;
}

export interface MarketAnalysisData {
  industryAnalysis: string;
  targetMarket: string;
  marketSize: string;
  competitorAnalysis: string;
  competitiveAdvantage: string;
}

export interface OrganizationManagementData {
  stakeholderInfo: string;
  leadershipTeam: string;
  organizationalStructure: string;
  advisoryBoard: string;
  keyPersonnel: string;
}

export interface ProductServiceData {
  productDescription: string;
  benefitsToCustomers: string;
  developmentStage: string;
  intellectualProperty: string;
  futureProducts: string;
}

export interface MarketingSalesData {
  marketingStrategy: string;
  salesStrategy: string;
  pricingStrategy: string;
  distributionChannels: string;
  promotionStrategy: string;
}

export interface FinancialProjectionsData {
  startupCosts: string;
  salesForecast: string;
  expenseProjections: string;
  breakEvenAnalysis: string;
  fundingNeeds: string;
}

export interface FundingRequestData {
  currentFundingNeeds: string;
  futureFundingNeeds: string;
  useOfFunds: string;
  strategicFinancialSituation: string;
  exitStrategy: string;
}

export interface AppendixData {
  resumes: string;
  permits: string;
  legalDocuments: string;
  marketResearch: string;
  additionalInfo: string;
}

export interface GovernmentPolicyData {
  industryRegulations: string;
  complianceRequirements: string;
  licensingRequirements: string;
  policyChanges: string;
  taxIncentives: string;
}

export interface NGOLandscapeData {
  relevantNGOs: string;
  potentialPartnerships: string;
  resourcesOffered: string;
  contactInformation: string;
  successStories: string;
}

export interface GrantsData {
  governmentGrants: string;
  ngoGrants: string;
  eligibilityCriteria: string;
  applicationProcess: string;
  applicationDeadlines: string;
  grantAcquisitionStrategy: string;
}

export interface BusinessPlanData {
  coverPage?: CoverPageData;
  tableOfContents?: TableOfContentsData;
  companyDescription?: CompanyDescriptionData;
  marketAnalysis?: MarketAnalysisData;
  organizationManagement?: OrganizationManagementData;
  productService?: ProductServiceData;
  marketingSales?: MarketingSalesData;
  financialProjections?: FinancialProjectionsData;
  fundingRequest?: FundingRequestData;
  appendix?: AppendixData;
  governmentPolicy?: GovernmentPolicyData;
  ngoLandscape?: NGOLandscapeData;
  grants?: GrantsData;
}

export interface UploadData {
  type: 'json' | 'text';
  content: string;
}