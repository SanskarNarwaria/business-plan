import React, { forwardRef } from 'react';
import { BusinessPlanSection, BusinessPlanTheme } from '../types/businessPlan';
import { Building2, Users, TrendingUp, DollarSign, Target, Award, Briefcase, FileText, Shield, Heart, Gift } from 'lucide-react';

interface BusinessPlanPageProps {
  section: BusinessPlanSection;
  theme: BusinessPlanTheme;
  pageNumber: number;
  totalPages: number;
}

export const BusinessPlanPage = forwardRef<HTMLDivElement, BusinessPlanPageProps>(
  ({ section, theme, pageNumber, totalPages }, ref) => {
    const renderContent = () => {
      const content = section.content || {};

      switch (section.id) {
        case 'cover-page':
          return (
            <div className="flex flex-col justify-center items-center h-full text-center space-y-8">
              <div className="space-y-4">
                <h1 className={`text-4xl ${theme.fonts.title} ${theme.colors.titleText}`}>
                  {content.companyName || 'Your Company Name'}
                </h1>
                <h2 className={`text-2xl ${theme.fonts.heading} ${theme.colors.primary}`}>
                  {content.subtitle || 'Business Plan'}
                </h2>
                <p className={`text-lg ${theme.colors.secondary}`}>
                  {content.year || new Date().getFullYear()}
                </p>
                <p className={`text-base ${theme.colors.text}`}>
                  Prepared by: {content.preparedBy || 'Your Name'}
                </p>
              </div>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                {(content.statsCards || [
                  { label: 'Founded', value: '2024', color: 'bg-blue-100 text-blue-800' },
                  { label: 'Market Size', value: '$1B+', color: 'bg-green-100 text-green-800' },
                  { label: 'Team Size', value: '10+', color: 'bg-purple-100 text-purple-800' },
                  { label: 'Funding Goal', value: '$500K', color: 'bg-orange-100 text-orange-800' }
                ]).map((card: any, index: number) => (
                  <div key={index} className={`p-3 rounded-lg ${card.color || 'bg-gray-100 text-gray-800'}`}>
                    <div className="text-xs font-medium opacity-75">{card.label}</div>
                    <div className="text-sm font-bold">{card.value}</div>
                  </div>
                ))}
              </div>
            </div>
          );

        case 'table-of-contents':
          const sections = [
            { title: 'Company Description', page: 3 },
            { title: 'Market Analysis', page: 4 },
            { title: 'Organization and Management', page: 5 },
            { title: 'Service or Product Line', page: 6 },
            { title: 'Marketing & Sales Strategy', page: 7 },
            { title: 'Financial Projections', page: 8 },
            { title: 'Funding Request', page: 9 },
            { title: 'Appendix', page: 10 },
            { title: 'Government Policy', page: 11 },
            { title: 'NGO Landscape', page: 12 },
            { title: 'Grants & Funding', page: 13 }
          ];

          return (
            <div className="space-y-6">
              <h1 className={`text-3xl ${theme.fonts.title} ${theme.colors.titleText} text-center mb-8`}>
                Table of Contents
              </h1>
              <div className="space-y-3">
                {sections.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className={`${theme.fonts.body} ${theme.colors.text}`}>{item.title}</span>
                    {content.showPageNumbers !== false && (
                      <span className={`${theme.fonts.body} ${theme.colors.secondary}`}>{item.page}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );

        case 'company-description':
          return (
            <div className="space-y-6">
              <h1 className={`text-3xl ${theme.fonts.title} ${theme.colors.titleText} mb-6`}>
                Company Description
              </h1>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {(content.statsCards || [
                  { label: 'Industry', value: 'Technology', color: 'bg-blue-100 text-blue-800' },
                  { label: 'Founded', value: '2024', color: 'bg-green-100 text-green-800' },
                  { label: 'Employees', value: '10+', color: 'bg-purple-100 text-purple-800' }
                ]).map((card: any, index: number) => (
                  <div key={index} className={`p-3 rounded-lg ${card.color || 'bg-gray-100 text-gray-800'}`}>
                    <div className="text-xs font-medium opacity-75">{card.label}</div>
                    <div className="text-sm font-bold">{card.value}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className={`text-lg ${theme.fonts.heading} ${theme.colors.sectionTitle} mb-2`}>Legal Structure</h3>
                  <p className={`text-sm ${theme.colors.sectionText}`}>
                    {content.legalStructure || 'Information about the legal structure of the company will be provided here.'}
                  </p>
                </div>
                
                <div>
                  <h3 className={`text-lg ${theme.fonts.heading} ${theme.colors.sectionTitle} mb-2`}>Company History</h3>
                  <p className={`text-sm ${theme.colors.sectionText}`}>
                    {content.companyHistory || 'The company history and background information will be detailed here.'}
                  </p>
                </div>
                
                <div>
                  <h3 className={`text-lg ${theme.fonts.heading} ${theme.colors.sectionTitle} mb-2`}>Industry</h3>
                  <p className={`text-sm ${theme.colors.sectionText}`}>
                    {content.industry || 'Industry analysis and positioning will be described here.'}
                  </p>
                </div>
                
                <div>
                  <h3 className={`text-lg ${theme.fonts.heading} ${theme.colors.sectionTitle} mb-2`}>Vision Statement</h3>
                  <p className={`text-sm ${theme.colors.sectionText}`}>
                    {content.visionStatement || 'The company vision and long-term goals will be outlined here.'}
                  </p>
                </div>
                
                <div>
                  <h3 className={`text-lg ${theme.fonts.heading} ${theme.colors.sectionTitle} mb-2`}>Unique Value Proposition</h3>
                  <p className={`text-sm ${theme.colors.sectionText}`}>
                    {content.uniqueValueProposition || 'The unique value proposition and competitive advantages will be explained here.'}
                  </p>
                </div>
              </div>
            </div>
          );

        case 'market-analysis':
          return (
            <div className="space-y-6">
              <h1 className={`text-3xl ${theme.fonts.title} ${theme.colors.titleText} mb-6`}>
                Market Analysis
              </h1>
              
              {/* Market Overview Cards */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    <h4 className="font-semibold text-blue-900">Total Market</h4>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">
                    {content.totalMarket || '$1B+'}
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Target className="w-5 h-5 text-green-600" />
                    <h4 className="font-semibold text-green-900">Growth Rate</h4>
                  </div>
                  <p className="text-2xl font-bold text-green-600">
                    {content.marketGrowth || '15% CAGR'}
                  </p>
                </div>
              </div>

              {/* Market Segments */}
              <div className="mb-6">
                <h3 className={`text-lg ${theme.fonts.heading} ${theme.colors.sectionTitle} mb-3`}>Market Segments</h3>
                <div className="grid grid-cols-2 gap-3">
                  {(content.marketSegments || [
                    { name: 'Enterprise', value: '$400M', percentage: '40%', color: 'bg-blue-100 text-blue-800' },
                    { name: 'SMB', value: '$300M', percentage: '30%', color: 'bg-green-100 text-green-800' },
                    { name: 'Startups', value: '$200M', percentage: '20%', color: 'bg-purple-100 text-purple-800' },
                    { name: 'Other', value: '$100M', percentage: '10%', color: 'bg-gray-100 text-gray-800' }
                  ]).map((segment: any, index: number) => (
                    <div key={index} className={`p-3 rounded-lg ${segment.color}`}>
                      <div className="font-semibold text-sm">{segment.name}</div>
                      <div className="text-xs opacity-75">{segment.value} ({segment.percentage})</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className={`text-lg ${theme.fonts.heading} ${theme.colors.sectionTitle} mb-2`}>Industry Analysis</h3>
                  <p className={`text-sm ${theme.colors.sectionText}`}>
                    {content.industryAnalysis || 'Comprehensive industry analysis including trends, growth drivers, and market dynamics will be presented here.'}
                  </p>
                </div>
                
                <div>
                  <h3 className={`text-lg ${theme.fonts.heading} ${theme.colors.sectionTitle} mb-2`}>Target Market</h3>
                  <p className={`text-sm ${theme.colors.sectionText}`}>
                    {content.targetMarket || 'Detailed description of the target market, customer segments, and addressable market size.'}
                  </p>
                </div>
                
                <div>
                  <h3 className={`text-lg ${theme.fonts.heading} ${theme.colors.sectionTitle} mb-2`}>Competitive Analysis</h3>
                  <p className={`text-sm ${theme.colors.sectionText}`}>
                    {content.competitorAnalysis || 'Analysis of key competitors, their strengths, weaknesses, and market positioning.'}
                  </p>
                </div>
                
                <div>
                  <h3 className={`text-lg ${theme.fonts.heading} ${theme.colors.sectionTitle} mb-2`}>Competitive Advantage</h3>
                  <p className={`text-sm ${theme.colors.sectionText}`}>
                    {content.competitiveAdvantage || 'Description of unique competitive advantages and differentiation factors.'}
                  </p>
                </div>
              </div>
            </div>
          );

        case 'organization-management':
          return (
            <div className="space-y-6">
              <h1 className={`text-3xl ${theme.fonts.title} ${theme.colors.titleText} mb-6`}>
                Organization and Management
              </h1>
              
              {/* Stakeholders Grid */}
              <div className="mb-6">
                <h3 className={`text-lg ${theme.fonts.heading} ${theme.colors.sectionTitle} mb-3`}>Key Stakeholders</h3>
                <div className="grid grid-cols-1 gap-3">
                  {(content.stakeholders || [
                    { id: 1, name: 'John Doe', role: 'CEO', stake: '40%', experience: '10+ years', email: 'john@company.com', linkedin: 'linkedin.com/in/johndoe' },
                    { id: 2, name: 'Jane Smith', role: 'CTO', stake: '30%', experience: '8+ years', email: 'jane@company.com', linkedin: 'linkedin.com/in/janesmith' },
                    { id: 3, name: 'Mike Johnson', role: 'CFO', stake: '20%', experience: '12+ years', email: 'mike@company.com', linkedin: 'linkedin.com/in/mikejohnson' }
                  ]).map((stakeholder: any, index: number) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-gray-900">{stakeholder.name}</h4>
                          <p className="text-sm text-blue-600">{stakeholder.role}</p>
                          <p className="text-xs text-gray-600">{stakeholder.experience} experience</p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-900">{stakeholder.stake}</div>
                          <div className="text-xs text-gray-500">Ownership</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className={`text-lg ${theme.fonts.heading} ${theme.colors.sectionTitle} mb-2`}>Leadership Team</h3>
                  <p className={`text-sm ${theme.colors.sectionText}`}>
                    {content.leadershipTeam || 'Information about the leadership team, their backgrounds, and key qualifications will be detailed here.'}
                  </p>
                </div>
                
                <div>
                  <h3 className={`text-lg ${theme.fonts.heading} ${theme.colors.sectionTitle} mb-2`}>Organizational Structure</h3>
                  <p className={`text-sm ${theme.colors.sectionText}`}>
                    {content.organizationalStructure || 'The organizational structure, reporting relationships, and governance model will be outlined here.'}
                  </p>
                </div>
                
                <div>
                  <h3 className={`text-lg ${theme.fonts.heading} ${theme.colors.sectionTitle} mb-2`}>Advisory Board</h3>
                  <p className={`text-sm ${theme.colors.sectionText}`}>
                    {content.advisoryBoard || 'Information about advisory board members, their expertise, and contributions to the company.'}
                  </p>
                </div>
                
                <div>
                  <h3 className={`text-lg ${theme.fonts.heading} ${theme.colors.sectionTitle} mb-2`}>Key Personnel</h3>
                  <p className={`text-sm ${theme.colors.sectionText}`}>
                    {content.keyPersonnel || 'Details about key personnel, their roles, responsibilities, and critical skills for company success.'}
                  </p>
                </div>
              </div>
            </div>
          );

        case 'service-product-line':
          return (
            <div className="space-y-6">
              <h1 className={`text-3xl ${theme.fonts.title} ${theme.colors.titleText} mb-6`}>
                Service or Product Line
              </h1>
              
              {/* Product Features */}
              <div className="mb-6">
                <h3 className={`text-lg ${theme.fonts.heading} ${theme.colors.sectionTitle} mb-3`}>Key Features</h3>
                <div className="grid grid-cols-2 gap-3">
                  {(content.productFeatures || [
                    { name: 'Core Platform', description: 'Main product offering', percentage: '40%', color: 'bg-blue-100 text-blue-800', icon: 'Building2' },
                    { name: 'Analytics', description: 'Data insights', percentage: '25%', color: 'bg-green-100 text-green-800', icon: 'TrendingUp' },
                    { name: 'Integration', description: 'Third-party APIs', percentage: '20%', color: 'bg-purple-100 text-purple-800', icon: 'Target' },
                    { name: 'Support', description: 'Customer service', percentage: '15%', color: 'bg-orange-100 text-orange-800', icon: 'Users' }
                  ]).map((feature: any, index: number) => (
                    <div key={index} className={`p-3 rounded-lg ${feature.color}`}>
                      <div className="font-semibold text-sm">{feature.name}</div>
                      <div className="text-xs opacity-75">{feature.description}</div>
                      <div className="text-xs font-medium mt-1">{feature.percentage}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className={`text-lg ${theme.fonts.heading} ${theme.colors.sectionTitle} mb-2`}>Product Description</h3>
                  <p className={`text-sm ${theme.colors.sectionText}`}>
                    {content.productDescription || 'Comprehensive description of products or services, including features, functionality, and technical specifications.'}
                  </p>
                </div>
                
                <div>
                  <h3 className={`text-lg ${theme.fonts.heading} ${theme.colors.sectionTitle} mb-2`}>Benefits to Customers</h3>
                  <p className={`text-sm ${theme.colors.sectionText}`}>
                    {content.benefitsToCustomers || 'Clear articulation of customer benefits, value proposition, and problem-solving capabilities.'}
                  </p>
                </div>
                
                <div>
                  <h3 className={`text-lg ${theme.fonts.heading} ${theme.colors.sectionTitle} mb-2`}>Development Stage</h3>
                  <p className={`text-sm ${theme.colors.sectionText}`}>
                    {content.developmentStage || 'Current development status, milestones achieved, and roadmap for future development.'}
                  </p>
                </div>
                
                <div>
                  <h3 className={`text-lg ${theme.fonts.heading} ${theme.colors.sectionTitle} mb-2`}>Intellectual Property</h3>
                  <p className={`text-sm ${theme.colors.sectionText}`}>
                    {content.intellectualProperty || 'Information about patents, trademarks, copyrights, and other intellectual property assets.'}
                  </p>
                </div>
                
                <div>
                  <h3 className={`text-lg ${theme.fonts.heading} ${theme.colors.sectionTitle} mb-2`}>Future Products</h3>
                  <p className={`text-sm ${theme.colors.sectionText}`}>
                    {content.futureProducts || 'Pipeline of future products and services, expansion plans, and innovation roadmap.'}
                  </p>
                </div>
              </div>
            </div>
          );

        case 'marketing-sales':
          return (
            <div className="space-y-6">
              <h1 className={`text-3xl ${theme.fonts.title} ${theme.colors.titleText} mb-6`}>
                Marketing & Sales Strategy
              </h1>
              
              {/* Marketing Channels */}
              <div className="mb-6">
                <h3 className={`text-lg ${theme.fonts.heading} ${theme.colors.sectionTitle} mb-3`}>Marketing Channels</h3>
                <div className="grid grid-cols-2 gap-3">
                  {(content.marketingChannels || [
                    { name: 'Digital Marketing', percentage: '40%', color: 'bg-blue-100 text-blue-800', icon: 'Target' },
                    { name: 'Content Marketing', percentage: '25%', color: 'bg-green-100 text-green-800', icon: 'FileText' },
                    { name: 'Social Media', percentage: '20%', color: 'bg-purple-100 text-purple-800', icon: 'Users' },
                    { name: 'Events & PR', percentage: '15%', color: 'bg-orange-100 text-orange-800', icon: 'Award' }
                  ]).map((channel: any, index: number) => (
                    <div key={index} className={`p-3 rounded-lg ${channel.color}`}>
                      <div className="font-semibold text-sm">{channel.name}</div>
                      <div className="text-xs font-medium mt-1">{channel.percentage}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className={`text-lg ${theme.fonts.heading} ${theme.colors.sectionTitle} mb-2`}>Marketing Strategy</h3>
                  <p className={`text-sm ${theme.colors.sectionText}`}>
                    {content.marketingStrategy || 'Comprehensive marketing strategy including target audience, positioning, messaging, and channel strategy.'}
                  </p>
                </div>
                
                <div>
                  <h3 className={`text-lg ${theme.fonts.heading} ${theme.colors.sectionTitle} mb-2`}>Sales Strategy</h3>
                  <p className={`text-sm ${theme.colors.sectionText}`}>
                    {content.salesStrategy || 'Sales strategy including sales process, team structure, targets, and customer acquisition approach.'}
                  </p>
                </div>
                
                <div>
                  <h3 className={`text-lg ${theme.fonts.heading} ${theme.colors.sectionTitle} mb-2`}>Pricing Strategy</h3>
                  <p className={`text-sm ${theme.colors.sectionText}`}>
                    {content.pricingStrategy || 'Pricing model, competitive analysis, value-based pricing rationale, and pricing optimization strategy.'}
                  </p>
                </div>
                
                <div>
                  <h3 className={`text-lg ${theme.fonts.heading} ${theme.colors.sectionTitle} mb-2`}>Distribution Channels</h3>
                  <p className={`text-sm ${theme.colors.sectionText}`}>
                    {content.distributionChannels || 'Distribution strategy, channel partnerships, direct vs. indirect sales, and market reach approach.'}
                  </p>
                </div>
                
                <div>
                  <h3 className={`text-lg ${theme.fonts.heading} ${theme.colors.sectionTitle} mb-2`}>Promotion Strategy</h3>
                  <p className={`text-sm ${theme.colors.sectionText}`}>
                    {content.promotionStrategy || 'Promotional activities, advertising campaigns, public relations, and brand building initiatives.'}
                  </p>
                </div>
              </div>
            </div>
          );

        case 'financial-projections':
          return (
            <div className="space-y-6">
              <h1 className={`text-3xl ${theme.fonts.title} ${theme.colors.titleText} mb-6`}>
                Financial Projections
              </h1>
              
              {/* Financial Metrics */}
              <div className="mb-6">
                <h3 className={`text-lg ${theme.fonts.heading} ${theme.colors.sectionTitle} mb-3`}>Key Financial Metrics</h3>
                <div className="grid grid-cols-2 gap-3">
                  {(content.financialMetrics || [
                    { label: 'Revenue (Y1)', value: '$500K', description: 'First year revenue', color: 'bg-green-100 text-green-800' },
                    { label: 'Revenue (Y3)', value: '$2.5M', description: 'Third year revenue', color: 'bg-blue-100 text-blue-800' },
                    { label: 'Break-even', value: 'Month 18', description: 'Break-even timeline', color: 'bg-purple-100 text-purple-800' },
                    { label: 'Gross Margin', value: '75%', description: 'Target gross margin', color: 'bg-orange-100 text-orange-800' }
                  ]).map((metric: any, index: number) => (
                    <div key={index} className={`p-3 rounded-lg ${metric.color}`}>
                      <div className="font-semibold text-sm">{metric.label}</div>
                      <div className="text-lg font-bold">{metric.value}</div>
                      <div className="text-xs opacity-75">{metric.description}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Revenue Timeline */}
              <div className="mb-6">
                <h3 className={`text-lg ${theme.fonts.heading} ${theme.colors.sectionTitle} mb-3`}>Revenue Projection</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900 mb-2">
                    {content.projectedRevenue || '$2.5M by Year 3'}
                  </div>
                  <div className="text-sm text-gray-600">
                    {content.revenueTimeline || 'Conservative growth projection based on market analysis and customer acquisition strategy'}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className={`text-lg ${theme.fonts.heading} ${theme.colors.sectionTitle} mb-2`}>Startup Costs</h3>
                  <p className={`text-sm ${theme.colors.sectionText}`}>
                    {content.startupCosts || 'Detailed breakdown of initial startup costs including equipment, technology, legal, and operational expenses.'}
                  </p>
                </div>
                
                <div>
                  <h3 className={`text-lg ${theme.fonts.heading} ${theme.colors.sectionTitle} mb-2`}>Sales Forecast</h3>
                  <p className={`text-sm ${theme.colors.sectionText}`}>
                    {content.salesForecast || 'Three-year sales forecast with monthly projections for the first year and quarterly for years 2-3.'}
                  </p>
                </div>
                
                <div>
                  <h3 className={`text-lg ${theme.fonts.heading} ${theme.colors.sectionTitle} mb-2`}>Expense Projections</h3>
                  <p className={`text-sm ${theme.colors.sectionText}`}>
                    {content.expenseProjections || 'Comprehensive expense projections including fixed and variable costs, personnel, and operational expenses.'}
                  </p>
                </div>
                
                <div>
                  <h3 className={`text-lg ${theme.fonts.heading} ${theme.colors.sectionTitle} mb-2`}>Break-Even Analysis</h3>
                  <p className={`text-sm ${theme.colors.sectionText}`}>
                    {content.breakEvenAnalysis || 'Break-even analysis showing when the company will become profitable and key assumptions.'}
                  </p>
                </div>
              </div>
            </div>
          );

        case 'funding-request':
          return (
            <div className="space-y-6">
              <h1 className={`text-3xl ${theme.fonts.title} ${theme.colors.titleText} mb-6`}>
                Funding Request
              </h1>
              
              {/* Funding Allocation */}
              <div className="mb-6">
                <h3 className={`text-lg ${theme.fonts.heading} ${theme.colors.sectionTitle} mb-3`}>Use of Funds</h3>
                <div className="grid grid-cols-2 gap-3">
                  {(content.fundingAllocation || [
                    { category: 'Product Development', amount: '$200K', percentage: '40%', color: 'bg-blue-100 text-blue-800', icon: 'Building2' },
                    { category: 'Marketing & Sales', amount: '$150K', percentage: '30%', color: 'bg-green-100 text-green-800', icon: 'Target' },
                    { category: 'Operations', amount: '$100K', percentage: '20%', color: 'bg-purple-100 text-purple-800', icon: 'Briefcase' },
                    { category: 'Working Capital', amount: '$50K', percentage: '10%', color: 'bg-orange-100 text-orange-800', icon: 'DollarSign' }
                  ]).map((allocation: any, index: number) => (
                    <div key={index} className={`p-3 rounded-lg ${allocation.color}`}>
                      <div className="font-semibold text-sm">{allocation.category}</div>
                      <div className="text-lg font-bold">{allocation.amount}</div>
                      <div className="text-xs opacity-75">{allocation.percentage}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className={`text-lg ${theme.fonts.heading} ${theme.colors.sectionTitle} mb-2`}>Current Funding Needs</h3>
                  <p className={`text-sm ${theme.colors.sectionText}`}>
                    {content.currentFundingNeeds || 'Detailed explanation of current funding requirements, amount needed, and timeline for deployment.'}
                  </p>
                </div>
                
                <div>
                  <h3 className={`text-lg ${theme.fonts.heading} ${theme.colors.sectionTitle} mb-2`}>Future Funding Needs</h3>
                  <p className={`text-sm ${theme.colors.sectionText}`}>
                    {content.futureFundingNeeds || 'Anticipated future funding rounds, growth capital requirements, and expansion financing needs.'}
                  </p>
                </div>
                
                <div>
                  <h3 className={`text-lg ${theme.fonts.heading} ${theme.colors.sectionTitle} mb-2`}>Strategic Financial Situation</h3>
                  <p className={`text-sm ${theme.colors.sectionText}`}>
                    {content.strategicFinancialSituation || 'Current financial position, cash flow status, and strategic financial planning approach.'}
                  </p>
                </div>
                
                <div>
                  <h3 className={`text-lg ${theme.fonts.heading} ${theme.colors.sectionTitle} mb-2`}>Exit Strategy</h3>
                  <p className={`text-sm ${theme.colors.sectionText}`}>
                    {content.exitStrategy || 'Potential exit strategies including acquisition opportunities, IPO timeline, and investor return projections.'}
                  </p>
                </div>
              </div>
            </div>
          );

        case 'appendix':
          return (
            <div className="space-y-6">
              <h1 className={`text-3xl ${theme.fonts.title} ${theme.colors.titleText} mb-6`}>
                Appendix
              </h1>
              
              <div className="space-y-4">
                <div>
                  <h3 className={`text-lg ${theme.fonts.heading} ${theme.colors.sectionTitle} mb-2`}>Resumes</h3>
                  <p className={`text-sm ${theme.colors.sectionText}`}>
                    {content.resumes || 'Key team member resumes and professional backgrounds will be included in this section.'}
                  </p>
                </div>
                
                <div>
                  <h3 className={`text-lg ${theme.fonts.heading} ${theme.colors.sectionTitle} mb-2`}>Permits and Licenses</h3>
                  <p className={`text-sm ${theme.colors.sectionText}`}>
                    {content.permits || 'Required business permits, licenses, and regulatory approvals will be documented here.'}
                  </p>
                </div>
                
                <div>
                  <h3 className={`text-lg ${theme.fonts.heading} ${theme.colors.sectionTitle} mb-2`}>Legal Documents</h3>
                  <p className={`text-sm ${theme.colors.sectionText}`}>
                    {content.legalDocuments || 'Important legal documents, contracts, and agreements will be referenced in this section.'}
                  </p>
                </div>
                
                <div>
                  <h3 className={`text-lg ${theme.fonts.heading} ${theme.colors.sectionTitle} mb-2`}>Market Research</h3>
                  <p className={`text-sm ${theme.colors.sectionText}`}>
                    {content.marketResearch || 'Supporting market research data, surveys, and industry reports will be provided here.'}
                  </p>
                </div>
                
                <div>
                  <h3 className={`text-lg ${theme.fonts.heading} ${theme.colors.sectionTitle} mb-2`}>Additional Information</h3>
                  <p className={`text-sm ${theme.colors.sectionText}`}>
                    {content.additionalInfo || 'Any additional supporting information, charts, graphs, and supplementary materials.'}
                  </p>
                </div>
              </div>
            </div>
          );

        case 'appendix-government-policy':
          return (
            <div className="space-y-6">
              <h1 className={`text-3xl ${theme.fonts.title} ${theme.colors.titleText} mb-6`}>
                Appendix - Government Policy
              </h1>
              
              <div className="space-y-4">
                <div>
                  <h3 className={`text-lg ${theme.fonts.heading} ${theme.colors.sectionTitle} mb-2`}>Industry Regulations</h3>
                  <p className={`text-sm ${theme.colors.sectionText}`}>
                    {content.industryRegulations || 'Relevant industry regulations, compliance requirements, and regulatory framework analysis.'}
                  </p>
                </div>
                
                <div>
                  <h3 className={`text-lg ${theme.fonts.heading} ${theme.colors.sectionTitle} mb-2`}>Compliance Requirements</h3>
                  <p className={`text-sm ${theme.colors.sectionText}`}>
                    {content.complianceRequirements || 'Specific compliance requirements, standards, and regulatory obligations for the business.'}
                  </p>
                </div>
                
                <div>
                  <h3 className={`text-lg ${theme.fonts.heading} ${theme.colors.sectionTitle} mb-2`}>Licensing Requirements</h3>
                  <p className={`text-sm ${theme.colors.sectionText}`}>
                    {content.licensingRequirements || 'Required business licenses, professional certifications, and regulatory approvals.'}
                  </p>
                </div>
                
                <div>
                  <h3 className={`text-lg ${theme.fonts.heading} ${theme.colors.sectionTitle} mb-2`}>Policy Changes</h3>
                  <p className={`text-sm ${theme.colors.sectionText}`}>
                    {content.policyChanges || 'Recent and anticipated policy changes that may impact the business operations and strategy.'}
                  </p>
                </div>
                
                <div>
                  <h3 className={`text-lg ${theme.fonts.heading} ${theme.colors.sectionTitle} mb-2`}>Tax Incentives</h3>
                  <p className={`text-sm ${theme.colors.sectionText}`}>
                    {content.taxIncentives || 'Available tax incentives, credits, and government programs that benefit the business.'}
                  </p>
                </div>
              </div>
            </div>
          );

        case 'appendix-ngo-landscape':
          return (
            <div className="space-y-6">
              <h1 className={`text-3xl ${theme.fonts.title} ${theme.colors.titleText} mb-6`}>
                Appendix - NGO Landscape
              </h1>
              
              <div className="space-y-4">
                <div>
                  <h3 className={`text-lg ${theme.fonts.heading} ${theme.colors.sectionTitle} mb-2`}>Relevant NGOs</h3>
                  <p className={`text-sm ${theme.colors.sectionText}`}>
                    {content.relevantNGOs || 'List of relevant NGOs, non-profit organizations, and social enterprises in the industry.'}
                  </p>
                </div>
                
                <div>
                  <h3 className={`text-lg ${theme.fonts.heading} ${theme.colors.sectionTitle} mb-2`}>Potential Partnerships</h3>
                  <p className={`text-sm ${theme.colors.sectionText}`}>
                    {content.potentialPartnerships || 'Potential partnership opportunities with NGOs, collaboration models, and mutual benefits.'}
                  </p>
                </div>
                
                <div>
                  <h3 className={`text-lg ${theme.fonts.heading} ${theme.colors.sectionTitle} mb-2`}>Resources Offered</h3>
                  <p className={`text-sm ${theme.colors.sectionText}`}>
                    {content.resourcesOffered || 'Resources, support services, and programs offered by relevant NGOs and organizations.'}
                  </p>
                </div>
                
                <div>
                  <h3 className={`text-lg ${theme.fonts.heading} ${theme.colors.sectionTitle} mb-2`}>Contact Information</h3>
                  <p className={`text-sm ${theme.colors.sectionText}`}>
                    {content.contactInformation || 'Contact information for key NGOs, program managers, and partnership coordinators.'}
                  </p>
                </div>
                
                <div>
                  <h3 className={`text-lg ${theme.fonts.heading} ${theme.colors.sectionTitle} mb-2`}>Success Stories</h3>
                  <p className={`text-sm ${theme.colors.sectionText}`}>
                    {content.successStories || 'Success stories and case studies of businesses that have partnered with NGOs successfully.'}
                  </p>
                </div>
              </div>
            </div>
          );

        case 'appendix-grants':
          return (
            <div className="space-y-6">
              <h1 className={`text-3xl ${theme.fonts.title} ${theme.colors.titleText} mb-6`}>
                Appendix - Government & NGO Grants
              </h1>
              
              {/* Funding Stats */}
              <div className="mb-6">
                <h3 className={`text-lg ${theme.fonts.heading} ${theme.colors.sectionTitle} mb-3`}>Funding Opportunities</h3>
                <div className="grid grid-cols-2 gap-3">
                  {(content.fundingStats || [
                    { label: 'Available Grants', value: '50+', color: 'bg-green-100 text-green-800' },
                    { label: 'Total Funding', value: '$10M+', color: 'bg-blue-100 text-blue-800' },
                    { label: 'Success Rate', value: '25%', color: 'bg-purple-100 text-purple-800' },
                    { label: 'Avg. Grant Size', value: '$200K', color: 'bg-orange-100 text-orange-800' }
                  ]).map((stat: any, index: number) => (
                    <div key={index} className={`p-3 rounded-lg ${stat.color}`}>
                      <div className="text-xs font-medium opacity-75">{stat.label}</div>
                      <div className="text-lg font-bold">{stat.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className={`text-lg ${theme.fonts.heading} ${theme.colors.sectionTitle} mb-2`}>Government Grants</h3>
                  <p className={`text-sm ${theme.colors.sectionText}`}>
                    {content.governmentGrants || 'Available government grants, funding programs, and public sector opportunities for the business.'}
                  </p>
                </div>
                
                <div>
                  <h3 className={`text-lg ${theme.fonts.heading} ${theme.colors.sectionTitle} mb-2`}>NGO Grants</h3>
                  <p className={`text-sm ${theme.colors.sectionText}`}>
                    {content.ngoGrants || 'NGO-sponsored grants, foundation funding, and private sector grant opportunities.'}
                  </p>
                </div>
                
                <div>
                  <h3 className={`text-lg ${theme.fonts.heading} ${theme.colors.sectionTitle} mb-2`}>Eligibility Criteria</h3>
                  <p className={`text-sm ${theme.colors.sectionText}`}>
                    {content.eligibilityCriteria || 'Eligibility requirements, qualification criteria, and prerequisites for various grant programs.'}
                  </p>
                </div>
                
                <div>
                  <h3 className={`text-lg ${theme.fonts.heading} ${theme.colors.sectionTitle} mb-2`}>Application Process</h3>
                  <p className={`text-sm ${theme.colors.sectionText}`}>
                    {content.applicationProcess || 'Step-by-step application process, required documentation, and submission procedures.'}
                  </p>
                </div>
                
                <div>
                  <h3 className={`text-lg ${theme.fonts.heading} ${theme.colors.sectionTitle} mb-2`}>Application Deadlines</h3>
                  <p className={`text-sm ${theme.colors.sectionText}`}>
                    {content.applicationDeadlines || 'Important deadlines, application cycles, and timeline for grant submissions.'}
                  </p>
                </div>
                
                <div>
                  <h3 className={`text-lg ${theme.fonts.heading} ${theme.colors.sectionTitle} mb-2`}>Grant Acquisition Strategy</h3>
                  <p className={`text-sm ${theme.colors.sectionText}`}>
                    {content.grantAcquisitionStrategy || 'Strategic approach to grant acquisition, prioritization, and application management.'}
                  </p>
                </div>
              </div>
            </div>
          );

        default:
          return (
            <div className="flex items-center justify-center h-full">
              <p className={`text-lg ${theme.colors.secondary}`}>
                Content for {section.title} will be displayed here.
              </p>
            </div>
          );
      }
    };

    return (
      <div
        ref={ref}
        className={`w-full h-full p-6 ${theme.colors.background} ${theme.colors.text} overflow-hidden`}
        style={{
          width: '140mm',
          height: '198mm',
          minWidth: '140mm',
          maxWidth: '140mm',
          minHeight: '198mm',
          maxHeight: '198mm'
        }}
      >
        <div className="h-full flex flex-col">
          <div className="flex-1 overflow-hidden">
            {renderContent()}
          </div>
          
          {/* Page Footer */}
          <div className="flex justify-between items-center pt-4 mt-auto border-t border-gray-200">
            <div className={`text-xs ${theme.colors.secondary}`}>
              {section.title}
            </div>
            <div className={`text-xs ${theme.colors.secondary}`}>
              Page {pageNumber} of {totalPages}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

BusinessPlanPage.displayName = 'BusinessPlanPage';