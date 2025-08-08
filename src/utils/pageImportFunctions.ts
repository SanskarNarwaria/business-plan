// Page import functions with API integration and fallback to empty values

export interface PageImportData {
  [key: string]: string;
}

// Dynamic card data interfaces
export interface StatsCard {
  label: string;
  value: string;
  icon?: string;
  color?: string;
}

export interface MarketSegment {
  name: string;
  value: string;
  percentage: string;
  color: string;
}

export interface Stakeholder {
  id: number;
  name: string;
  role: string;
  stake: string;
  experience: string;
  email: string;
  linkedin: string;
}

export interface ProductFeature {
  name: string;
  description: string;
  percentage: string;
  color: string;
  icon: string;
}

export interface MarketingChannel {
  name: string;
  percentage: string;
  color: string;
  icon: string;
}

export interface FinancialMetric {
  label: string;
  value: string;
  description: string;
  percentage?: string;
  color: string;
}

export interface FundingAllocation {
  category: string;
  amount: string;
  percentage: string;
  color: string;
  icon: string;
}

// API configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.businessplan.com';
const API_TIMEOUT = 5000; // 5 seconds timeout

// Generic API fetch function with error handling
const fetchFromAPI = async (endpoint: string): Promise<any> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_API_TOKEN || ''}`,
      },
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.warn(`API fetch failed for ${endpoint}:`, error);
    return null;
  }
};

// Page 1: Cover Page
export const importCoverPageData = async (data: PageImportData) => {
  const apiData = await fetchFromAPI('/cover-page');
  
  return {
    companyName: apiData?.companyName || data.companyName || '',
    subtitle: apiData?.subtitle || data.subtitle || '',
    year: apiData?.year || data.year || '',
    preparedBy: apiData?.preparedBy || data.preparedBy || '',
    // Dynamic stats cards
    statsCards: apiData?.statsCards || (data.statsCards ? JSON.parse(data.statsCards) : []) as StatsCard[]
  };
};

// Page 2: Table of Contents
export const importTableOfContentsData = async (data: PageImportData) => {
  const apiData = await fetchFromAPI('/table-of-contents');
  
  return {
    showPageNumbers: apiData?.showPageNumbers ?? (data.showPageNumbers === 'false' ? false : true),
    includeSubsections: apiData?.includeSubsections ?? (data.includeSubsections === 'true' ? true : false)
  };
};

// Page 3: Company Description
export const importCompanyDescriptionData = async (data: PageImportData) => {
  const apiData = await fetchFromAPI('/company-description');
  
  return {
    legalStructure: apiData?.legalStructure || data.legalStructure || '',
    companyHistory: apiData?.companyHistory || data.companyHistory || '',
    industry: apiData?.industry || data.industry || '',
    visionStatement: apiData?.visionStatement || data.visionStatement || '',
    uniqueValueProposition: apiData?.uniqueValueProposition || data.uniqueValueProposition || '',
    // Dynamic stats cards
    statsCards: apiData?.statsCards || (data.statsCards ? JSON.parse(data.statsCards) : []) as StatsCard[]
  };
};

// Page 4: Market Analysis
export const importMarketAnalysisData = async (data: PageImportData) => {
  const apiData = await fetchFromAPI('/market-analysis');
  
  return {
    industryAnalysis: apiData?.industryAnalysis || data.industryAnalysis || '',
    targetMarket: apiData?.targetMarket || data.targetMarket || '',
    marketSize: apiData?.marketSize || data.marketSize || '',
    competitorAnalysis: apiData?.competitorAnalysis || data.competitorAnalysis || '',
    competitiveAdvantage: apiData?.competitiveAdvantage || data.competitiveAdvantage || '',
    // Dynamic market data
    totalMarket: apiData?.totalMarket || data.totalMarket || '',
    marketGrowth: apiData?.marketGrowth || data.marketGrowth || '',
    marketSegments: apiData?.marketSegments || (data.marketSegments ? JSON.parse(data.marketSegments) : []) as MarketSegment[]
  };
};

// Page 5: Organization and Management
export const importOrganizationManagementData = async (data: PageImportData) => {
  const apiData = await fetchFromAPI('/organization-management');
  
  return {
    stakeholderInfo: apiData?.stakeholderInfo || data.stakeholderInfo || '',
    leadershipTeam: apiData?.leadershipTeam || data.leadershipTeam || '',
    organizationalStructure: apiData?.organizationalStructure || data.organizationalStructure || '',
    advisoryBoard: apiData?.advisoryBoard || data.advisoryBoard || '',
    keyPersonnel: apiData?.keyPersonnel || data.keyPersonnel || '',
    // Dynamic stakeholder data
    stakeholders: apiData?.stakeholders || (data.stakeholders ? JSON.parse(data.stakeholders) : []) as Stakeholder[]
  };
};

// Page 6: Service or Product Line
export const importProductServiceData = async (data: PageImportData) => {
  const apiData = await fetchFromAPI('/product-service');
  
  return {
    productDescription: apiData?.productDescription || data.productDescription || '',
    benefitsToCustomers: apiData?.benefitsToCustomers || data.benefitsToCustomers || '',
    developmentStage: apiData?.developmentStage || data.developmentStage || '',
    intellectualProperty: apiData?.intellectualProperty || data.intellectualProperty || '',
    futureProducts: apiData?.futureProducts || data.futureProducts || '',
    // Dynamic product features
    productFeatures: apiData?.productFeatures || (data.productFeatures ? JSON.parse(data.productFeatures) : []) as ProductFeature[]
  };
};

// Page 7: Marketing & Sales Strategy
export const importMarketingSalesData = async (data: PageImportData) => {
  const apiData = await fetchFromAPI('/marketing-sales');
  
  return {
    marketingStrategy: apiData?.marketingStrategy || data.marketingStrategy || '',
    salesStrategy: apiData?.salesStrategy || data.salesStrategy || '',
    pricingStrategy: apiData?.pricingStrategy || data.pricingStrategy || '',
    distributionChannels: apiData?.distributionChannels || data.distributionChannels || '',
    promotionStrategy: apiData?.promotionStrategy || data.promotionStrategy || '',
    // Dynamic marketing channels
    marketingChannels: apiData?.marketingChannels || (data.marketingChannels ? JSON.parse(data.marketingChannels) : []) as MarketingChannel[]
  };
};

// Page 8: Financial Projections
export const importFinancialProjectionsData = async (data: PageImportData) => {
  const apiData = await fetchFromAPI('/financial-projections');
  
  return {
    startupCosts: apiData?.startupCosts || data.startupCosts || '',
    salesForecast: apiData?.salesForecast || data.salesForecast || '',
    expenseProjections: apiData?.expenseProjections || data.expenseProjections || '',
    breakEvenAnalysis: apiData?.breakEvenAnalysis || data.breakEvenAnalysis || '',
    fundingNeeds: apiData?.fundingNeeds || data.fundingNeeds || '',
    // Dynamic financial metrics
    financialMetrics: apiData?.financialMetrics || (data.financialMetrics ? JSON.parse(data.financialMetrics) : []) as FinancialMetric[],
    projectedRevenue: apiData?.projectedRevenue || data.projectedRevenue || '',
    revenueTimeline: apiData?.revenueTimeline || data.revenueTimeline || ''
  };
};

// Page 9: Funding Request
export const importFundingRequestData = async (data: PageImportData) => {
  const apiData = await fetchFromAPI('/funding-request');
  
  return {
    currentFundingNeeds: apiData?.currentFundingNeeds || data.currentFundingNeeds || '',
    futureFundingNeeds: apiData?.futureFundingNeeds || data.futureFundingNeeds || '',
    useOfFunds: apiData?.useOfFunds || data.useOfFunds || '',
    strategicFinancialSituation: apiData?.strategicFinancialSituation || data.strategicFinancialSituation || '',
    exitStrategy: apiData?.exitStrategy || data.exitStrategy || '',
    // Dynamic funding allocation
    fundingAllocation: apiData?.fundingAllocation || (data.fundingAllocation ? JSON.parse(data.fundingAllocation) : []) as FundingAllocation[]
  };
};

// Page 10: Appendix
export const importAppendixData = async (data: PageImportData) => {
  const apiData = await fetchFromAPI('/appendix');
  
  return {
    resumes: apiData?.resumes || data.resumes || '',
    permits: apiData?.permits || data.permits || '',
    legalDocuments: apiData?.legalDocuments || data.legalDocuments || '',
    marketResearch: apiData?.marketResearch || data.marketResearch || '',
    additionalInfo: apiData?.additionalInfo || data.additionalInfo || ''
  };
};

// Page 11: Government Policy
export const importGovernmentPolicyData = async (data: PageImportData) => {
  const apiData = await fetchFromAPI('/government-policy');
  
  return {
    industryRegulations: apiData?.industryRegulations || data.industryRegulations || '',
    complianceRequirements: apiData?.complianceRequirements || data.complianceRequirements || '',
    licensingRequirements: apiData?.licensingRequirements || data.licensingRequirements || '',
    policyChanges: apiData?.policyChanges || data.policyChanges || '',
    taxIncentives: apiData?.taxIncentives || data.taxIncentives || ''
  };
};

// Page 12: NGO Landscape
export const importNGOLandscapeData = async (data: PageImportData) => {
  const apiData = await fetchFromAPI('/ngo-landscape');
  
  return {
    relevantNGOs: apiData?.relevantNGOs || data.relevantNGOs || '',
    potentialPartnerships: apiData?.potentialPartnerships || data.potentialPartnerships || '',
    resourcesOffered: apiData?.resourcesOffered || data.resourcesOffered || '',
    contactInformation: apiData?.contactInformation || data.contactInformation || '',
    successStories: apiData?.successStories || data.successStories || ''
  };
};

// Page 13: Grants & Funding
export const importGrantsData = async (data: PageImportData) => {
  const apiData = await fetchFromAPI('/grants');
  
  return {
    governmentGrants: apiData?.governmentGrants || data.governmentGrants || '',
    ngoGrants: apiData?.ngoGrants || data.ngoGrants || '',
    eligibilityCriteria: apiData?.eligibilityCriteria || data.eligibilityCriteria || '',
    applicationProcess: apiData?.applicationProcess || data.applicationProcess || '',
    applicationDeadlines: apiData?.applicationDeadlines || data.applicationDeadlines || '',
    grantAcquisitionStrategy: apiData?.grantAcquisitionStrategy || data.grantAcquisitionStrategy || '',
    // Dynamic funding stats
    fundingStats: apiData?.fundingStats || (data.fundingStats ? JSON.parse(data.fundingStats) : []) as StatsCard[]
  };
};

// Master function to import data for all pages with API integration
export const importAllPagesData = async (jsonData: any) => {
  try {
    // Execute all API calls in parallel for better performance
    const [
      coverPage,
      tableOfContents,
      companyDescription,
      marketAnalysis,
      organizationManagement,
      productService,
      marketingSales,
      financialProjections,
      fundingRequest,
      appendix,
      governmentPolicy,
      ngoLandscape,
      grants
    ] = await Promise.all([
      importCoverPageData(jsonData.coverPage || {}),
      importTableOfContentsData(jsonData.tableOfContents || {}),
      importCompanyDescriptionData(jsonData.companyDescription || {}),
      importMarketAnalysisData(jsonData.marketAnalysis || {}),
      importOrganizationManagementData(jsonData.organizationManagement || {}),
      importProductServiceData(jsonData.productService || {}),
      importMarketingSalesData(jsonData.marketingSales || {}),
      importFinancialProjectionsData(jsonData.financialProjections || {}),
      importFundingRequestData(jsonData.fundingRequest || {}),
      importAppendixData(jsonData.appendix || {}),
      importGovernmentPolicyData(jsonData.governmentPolicy || {}),
      importNGOLandscapeData(jsonData.ngoLandscape || {}),
      importGrantsData(jsonData.grants || {})
    ]);

    return {
      coverPage,
      tableOfContents,
      companyDescription,
      marketAnalysis,
      organizationManagement,
      productService,
      marketingSales,
      financialProjections,
      fundingRequest,
      appendix,
      governmentPolicy,
      ngoLandscape,
      grants
    };
  } catch (error) {
    console.error('Error importing all pages data:', error);
    
    // Fallback to synchronous processing if parallel fails
    return {
      coverPage: await importCoverPageData(jsonData.coverPage || {}),
      tableOfContents: await importTableOfContentsData(jsonData.tableOfContents || {}),
      companyDescription: await importCompanyDescriptionData(jsonData.companyDescription || {}),
      marketAnalysis: await importMarketAnalysisData(jsonData.marketAnalysis || {}),
      organizationManagement: await importOrganizationManagementData(jsonData.organizationManagement || {}),
      productService: await importProductServiceData(jsonData.productService || {}),
      marketingSales: await importMarketingSalesData(jsonData.marketingSales || {}),
      financialProjections: await importFinancialProjectionsData(jsonData.financialProjections || {}),
      fundingRequest: await importFundingRequestData(jsonData.fundingRequest || {}),
      appendix: await importAppendixData(jsonData.appendix || {}),
      governmentPolicy: await importGovernmentPolicyData(jsonData.governmentPolicy || {}),
      ngoLandscape: await importNGOLandscapeData(jsonData.ngoLandscape || {}),
      grants: await importGrantsData(jsonData.grants || {})
    };
  }
};

// Function to get constant keys for each page (useful for documentation/validation)
export const getPageKeys = () => {
  return {
    coverPage: ['companyName', 'subtitle', 'year', 'preparedBy', 'statsCards'],
    tableOfContents: ['showPageNumbers', 'includeSubsections'],
    companyDescription: ['legalStructure', 'companyHistory', 'industry', 'visionStatement', 'uniqueValueProposition', 'statsCards'],
    marketAnalysis: ['industryAnalysis', 'targetMarket', 'marketSize', 'competitorAnalysis', 'competitiveAdvantage', 'totalMarket', 'marketGrowth', 'marketSegments'],
    organizationManagement: ['stakeholderInfo', 'leadershipTeam', 'organizationalStructure', 'advisoryBoard', 'keyPersonnel', 'stakeholders'],
    productService: ['productDescription', 'benefitsToCustomers', 'developmentStage', 'intellectualProperty', 'futureProducts', 'productFeatures'],
    marketingSales: ['marketingStrategy', 'salesStrategy', 'pricingStrategy', 'distributionChannels', 'promotionStrategy', 'marketingChannels'],
    financialProjections: ['startupCosts', 'salesForecast', 'expenseProjections', 'breakEvenAnalysis', 'fundingNeeds', 'financialMetrics', 'projectedRevenue', 'revenueTimeline'],
    fundingRequest: ['currentFundingNeeds', 'futureFundingNeeds', 'useOfFunds', 'strategicFinancialSituation', 'exitStrategy', 'fundingAllocation'],
    appendix: ['resumes', 'permits', 'legalDocuments', 'marketResearch', 'additionalInfo'],
    governmentPolicy: ['industryRegulations', 'complianceRequirements', 'licensingRequirements', 'policyChanges', 'taxIncentives'],
    ngoLandscape: ['relevantNGOs', 'potentialPartnerships', 'resourcesOffered', 'contactInformation', 'successStories'],
    grants: ['governmentGrants', 'ngoGrants', 'eligibilityCriteria', 'applicationProcess', 'applicationDeadlines', 'grantAcquisitionStrategy', 'fundingStats']
  };
};

// Utility function to test API connectivity
export const testAPIConnectivity = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.ok;
  } catch (error) {
    console.warn('API connectivity test failed:', error);
    return false;
  }
};

// Function to get API endpoints for reference
export const getAPIEndpoints = () => {
  return {
    coverPage: `${API_BASE_URL}/cover-page`,
    tableOfContents: `${API_BASE_URL}/table-of-contents`,
    companyDescription: `${API_BASE_URL}/company-description`,
    marketAnalysis: `${API_BASE_URL}/market-analysis`,
    organizationManagement: `${API_BASE_URL}/organization-management`,
    productService: `${API_BASE_URL}/product-service`,
    marketingSales: `${API_BASE_URL}/marketing-sales`,
    financialProjections: `${API_BASE_URL}/financial-projections`,
    fundingRequest: `${API_BASE_URL}/funding-request`,
    appendix: `${API_BASE_URL}/appendix`,
    governmentPolicy: `${API_BASE_URL}/government-policy`,
    ngoLandscape: `${API_BASE_URL}/ngo-landscape`,
    grants: `${API_BASE_URL}/grants`,
    health: `${API_BASE_URL}/health`
  };
};