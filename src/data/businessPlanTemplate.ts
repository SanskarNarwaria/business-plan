import { BusinessPlanTemplate, BusinessPlanTheme } from '../types/businessPlan';

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
  description: 'Comprehensive 10-page business plan template',
  theme: professionalTheme,
  sections: [
    {
      id: 'cover-page',
      title: 'Cover Page',
      content: 'InnovateTech Solutions\nBusiness Plan\n2024\nPrepared by: Sarah Johnson, CEO',
      contentType: 'paragraph',
      pageNumber: 1
    },
    {
      id: 'executive-summary',
      title: 'Executive Summary',
      content: [
        'InnovateTech Solutions is a cutting-edge technology company focused on developing AI-powered business automation tools that help small and medium enterprises streamline their operations and increase productivity by up to 40%.',
        'Our proprietary AI platform combines machine learning algorithms with intuitive user interfaces, providing businesses with automated workflow management, predictive analytics, and intelligent decision-making capabilities.',
        'We are seeking $500,000 in Series A funding to accelerate product development, expand our engineering team, and scale our go-to-market strategy across North America and Europe.',
        'The global business process automation market is projected to reach $19.6 billion by 2026, growing at a CAGR of 12.2%. Our target market of SMEs represents a $4.2 billion opportunity with minimal direct competition.',
        'With our experienced leadership team, proven technology, and strong early customer traction, we project $2.5M in revenue by year three with a path to profitability within 18 months.'
      ],
      contentType: 'bullets',
      pageNumber: 2
    },
    {
      id: 'company-description',
      title: 'Company Description',
      content: [
        'Founded in 2024, InnovateTech Solutions emerged from the recognition that small and medium enterprises struggle with manual, time-consuming business processes that limit their growth potential and competitive advantage.',
        'Incorporated as a Delaware C-Corporation, our headquarters are located in Austin, Texas, with a distributed team of engineers and business professionals across North America.',
        'Our mission is to democratize enterprise-level automation technology, making it accessible and affordable for businesses of all sizes. We envision a future where every business can leverage AI to optimize their operations and focus on strategic growth.',
        'Our core values include innovation excellence, customer-centricity, transparency in all dealings, and sustainable business practices that benefit all stakeholders.',
        'We offer a comprehensive suite of AI-powered automation tools including workflow optimization, document processing, customer relationship management, and predictive business analytics.'
      ],
      contentType: 'bullets',
      pageNumber: 3
    },
    {
      id: 'market-analysis',
      title: 'Market Analysis',
      content: [
        'The business process automation industry is experiencing unprecedented growth, driven by digital transformation initiatives, labor shortages, and the need for operational efficiency in an increasingly competitive global marketplace.',
        'Our primary target market consists of small to medium enterprises (10-500 employees) in professional services, manufacturing, healthcare, and retail sectors that currently rely on manual processes for core business operations.',
        'The total addressable market (TAM) for business automation software is $19.6 billion globally, with our serviceable addressable market (SAM) representing $4.2 billion in North America and Europe.',
        'Key market trends include increased adoption of cloud-based solutions (growing 23% annually), rising demand for no-code/low-code platforms, and growing awareness of AI capabilities among SME decision-makers.',
        'While large enterprise solutions dominate the market, there is a significant gap in affordable, easy-to-implement automation tools for smaller businesses, representing our key competitive opportunity.'
      ],
      contentType: 'bullets',
      pageNumber: 4
    },
    {
      id: 'organization-management',
      title: 'Organization & Management',
      content: [
        'Our lean organizational structure promotes agility and rapid decision-making, with clear reporting lines and cross-functional collaboration between engineering, product, sales, and customer success teams.',
        'CEO Sarah Johnson brings 12 years of enterprise software experience, including 5 years at Salesforce leading product strategy. CTO Michael Chen has 15 years in AI/ML development with previous roles at Google and Microsoft.',
        'Our current team of 8 includes 4 senior engineers, 2 product managers, 1 sales director, and 1 customer success manager. We plan to expand to 15 employees within 12 months, focusing on engineering and sales talent.',
        'Our advisory board includes former executives from HubSpot, Zapier, and Atlassian, providing strategic guidance on product development, go-to-market strategy, and scaling operations.',
        'Strategic partnerships with leading cloud providers (AWS, Microsoft Azure) and system integrators ensure robust infrastructure and expanded market reach through established channel networks.'
      ],
      contentType: 'bullets',
      pageNumber: 5
    },
    {
      id: 'service-product-line',
      title: 'Service or Product Line',
      content: [
        'Our flagship product, AutoFlow AI, is a comprehensive business automation platform that combines workflow design, document processing, data analytics, and intelligent decision-making in a single, user-friendly interface.',
        'Key features include drag-and-drop workflow builder, natural language processing for document automation, predictive analytics dashboard, and seamless integration with 200+ popular business applications.',
        'Our R&D efforts focus on advancing our proprietary machine learning algorithms, expanding integration capabilities, and developing industry-specific automation templates for healthcare, legal, and financial services.',
        'We have filed 3 provisional patents for our core AI algorithms and user interface innovations, with plans to file additional patents for our predictive analytics and natural language processing technologies.',
        'Our product roadmap includes mobile applications (Q2 2025), advanced AI chatbot integration (Q3 2025), and industry-specific vertical solutions (Q4 2025), ensuring continuous innovation and market expansion.'
      ],
      contentType: 'bullets',
      pageNumber: 6
    },
    {
      id: 'marketing-sales',
      title: 'Marketing & Sales',
      content: [
        'Our marketing strategy positions InnovateTech as the "automation platform built for growing businesses," emphasizing ease of use, affordability, and rapid ROI compared to enterprise-level competitors.',
        'We employ a multi-channel approach including content marketing, SEO, paid digital advertising, industry conferences, and strategic partnerships to generate qualified leads and build brand awareness.',
        'Our sales process combines inbound lead qualification, product demonstrations, free trial offerings, and consultative selling to convert prospects into customers with an average sales cycle of 45 days.',
        'Pricing follows a SaaS subscription model with three tiers: Starter ($99/month), Professional ($299/month), and Enterprise ($599/month), designed to grow with customer needs and maximize lifetime value.',
        'Distribution channels include direct sales, partner referrals, and an emerging channel partner program with business consultants and system integrators who serve our target market segments.'
      ],
      contentType: 'bullets',
      pageNumber: 7
    },
    {
      id: 'funding-request',
      title: 'Funding Request',
      content: [
        'We are seeking $500,000 in Series A funding to accelerate our growth trajectory and capitalize on the expanding market opportunity for business automation solutions.',
        'This funding round will support our operations through the next 18 months, taking us to cash flow positive with projected monthly recurring revenue of $200,000 by month 18.',
        'Fund allocation: 40% for product development and engineering talent ($200K), 30% for sales and marketing expansion ($150K), 20% for operations and infrastructure ($100K), and 10% for working capital ($50K).',
        'Future funding requirements may include a Series B round of $2-3M in 24-30 months to support international expansion and accelerated customer acquisition in European markets.',
        'Our long-term strategic plan includes potential acquisition by a larger enterprise software company or IPO consideration once we achieve $50M+ annual recurring revenue, providing attractive exit opportunities for investors.'
      ],
      contentType: 'bullets',
      pageNumber: 8
    },
    {
      id: 'financial-projections',
      title: 'Financial Projections',
      content: [
        'Revenue projections: Year 1: $180K, Year 2: $750K, Year 3: $2.5M, based on customer acquisition rates of 15 new customers per month by month 12, growing to 50 new customers per month by month 36.',
        'Key assumptions include average customer lifetime value of $8,500, monthly churn rate of 3%, and average revenue per user growing from $250/month to $400/month as customers upgrade to higher-tier plans.',
        'Operating expenses include personnel costs (65% of revenue), sales and marketing (25% of revenue), technology infrastructure (5% of revenue), and general administrative expenses (5% of revenue).',
        'Break-even analysis shows positive cash flow by month 18 with gross margins of 85% and net margins reaching 15% by year 3, demonstrating strong unit economics and scalable business model.',
        'Financial ratios project customer acquisition cost (CAC) of $750, customer lifetime value to CAC ratio of 11:1, and monthly recurring revenue growth rate of 15% month-over-month through the first 24 months.'
      ],
      contentType: 'bullets',
      pageNumber: 9
    },
    {
      id: 'appendix',
      title: 'Appendix',
      content: [
        'Market research reports from Gartner, Forrester, and McKinsey supporting our market size estimates and growth projections for the business process automation industry.',
        'Detailed financial models including 5-year P&L projections, cash flow statements, balance sheet forecasts, and sensitivity analysis for key business metrics and assumptions.',
        'Customer testimonials and case studies demonstrating measurable ROI and productivity improvements achieved by early adopters of our automation platform.',
        'Technical architecture documentation, security certifications (SOC 2 Type II), and integration specifications for our core platform and API capabilities.',
        'Legal documentation including articles of incorporation, intellectual property filings, key employee agreements, and standard customer contract templates.'
      ],
      contentType: 'bullets',
      pageNumber: 10
    }
  ]
};

export const createBusinessPlanFromJSON = (jsonData: any): BusinessPlanTemplate => {
  const template = { ...businessPlanTemplate };
  
  // Map JSON data to business plan sections
  const sectionMapping: { [key: string]: string } = {
    'companyName': 'cover-page',
    'executiveSummary': 'executive-summary',
    'companyDescription': 'company-description',
    'marketAnalysis': 'market-analysis',
    'organizationManagement': 'organization-management',
    'serviceProductLine': 'service-product-line',
    'marketingSales': 'marketing-sales',
    'fundingRequest': 'funding-request',
    'financialProjections': 'financial-projections',
    'appendix': 'appendix'
  };

  // Update sections with JSON data
  template.sections = template.sections.map(section => {
    const jsonKey = Object.keys(sectionMapping).find(key => sectionMapping[key] === section.id);
    
    if (jsonKey && jsonData[jsonKey]) {
      const content = jsonData[jsonKey];
      return {
        ...section,
        content: Array.isArray(content) ? content : content.toString(),
        contentType: Array.isArray(content) ? 'bullets' : 'paragraph'
      };
    }

    // Check for any other matching keys in JSON
    const matchingKey = Object.keys(jsonData).find(key => 
      key.toLowerCase().includes(section.title.toLowerCase().replace(/[^a-z]/g, '')) ||
      section.title.toLowerCase().includes(key.toLowerCase())
    );

    if (matchingKey && jsonData[matchingKey]) {
      const content = jsonData[matchingKey];
      return {
        ...section,
        content: Array.isArray(content) ? content : content.toString(),
        contentType: Array.isArray(content) ? 'bullets' : 'paragraph'
      };
    }

    return section;
  });

  return template;
};