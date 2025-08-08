import { BusinessPlanTemplate, BusinessPlanTheme } from '../types/businessPlan';
import { importAllPagesData } from '../utils/pageImportFunctions';

const professionalTheme: BusinessPlanTheme = {
  name: 'Professional',
  fonts: {
    title: 'font-bold',
    heading: 'font-semibold',
    body: 'font-normal'
  },
  colors: {
    primary: 'text-blue-600',
    secondary: 'text-gray-600',
    accent: 'text-indigo-600',
    background: 'bg-white',
    text: 'text-gray-800',
    titleText: 'text-gray-900',
    sectionTitle: 'text-blue-900',
    sectionText: 'text-gray-700'
  },
  pageStyles: {
    borderRadius: 'rounded-lg',
    borderWidth: 'border',
    borderStyle: 'border-gray-200',
    shadow: 'shadow-lg'
  },
  sectionStyles: {
    borderRadius: 'rounded-md',
    borderWidth: 'border-l-4',
    borderStyle: 'border-blue-500',
    shadow: 'shadow-sm'
  }
};

export const businessPlanTemplate: BusinessPlanTemplate = {
  id: 'professional-business-plan',
  name: 'Professional Business Plan',
  description: 'Comprehensive 13-page business plan template',
  theme: professionalTheme,
  sections: [
    {
      id: 'cover-page',
      title: 'Cover Page',
      content: {},
      contentType: 'structured',
      pageNumber: 1
    },
    {
      id: 'table-of-contents',
      title: 'Table of Contents',
      content: {},
      contentType: 'structured',
      pageNumber: 2
    },
    {
      id: 'company-description',
      title: 'Company Description',
      content: {},
      contentType: 'structured',
      pageNumber: 3
    },
    {
      id: 'market-analysis',
      title: 'Market Analysis',
      content: {},
      contentType: 'structured',
      pageNumber: 4
    },
    {
      id: 'organization-management',
      title: 'Organization and Management',
      content: {},
      contentType: 'structured',
      pageNumber: 5
    },
    {
      id: 'service-product-line',
      title: 'Service or Product Line',
      content: {},
      contentType: 'structured',
      pageNumber: 6
    },
    {
      id: 'marketing-sales',
      title: 'Marketing & Sales Strategy',
      content: {},
      contentType: 'structured',
      pageNumber: 7
    },
    {
      id: 'financial-projections',
      title: 'Financial Projections',
      content: {},
      contentType: 'structured',
      pageNumber: 8
    },
    {
      id: 'funding-request',
      title: 'Funding Request',
      content: {},
      contentType: 'structured',
      pageNumber: 9
    },
    {
      id: 'appendix',
      title: 'Appendix',
      content: {},
      contentType: 'structured',
      pageNumber: 10
    },
    {
      id: 'appendix-government-policy',
      title: 'Appendix - Government Policy',
      content: {},
      contentType: 'structured',
      pageNumber: 11
    },
    {
      id: 'appendix-ngo-landscape',
      title: 'Appendix - NGO Landscape',
      content: {},
      contentType: 'structured',
      pageNumber: 12
    },
    {
      id: 'appendix-grants',
      title: 'Appendix - Government & NGO Grants',
      content: {},
      contentType: 'structured',
      pageNumber: 13
    }
  ]
};

export const createBusinessPlanFromJSON = (jsonData: BusinessPlanData): BusinessPlanTemplate => {
  const template = { ...businessPlanTemplate };
  
  // Process all page data through import functions only
  const processedData = importAllPagesData(jsonData);
  
  // Update sections with processed data (empty content, will be filled by import functions)
  template.sections = template.sections.map(section => {
    // Keep sections with empty content - data will come from import functions
    return { ...section, content: {} };
  });

  return template;
};