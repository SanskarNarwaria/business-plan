import React, { forwardRef } from 'react';
import { BusinessPlanSection, BusinessPlanTheme } from '../types/businessPlan';
import { Building2, TrendingUp, Users, Target, DollarSign, BarChart3, Lightbulb, FileText, Calendar, Award } from 'lucide-react';

interface BusinessPlanPageProps {
  section: BusinessPlanSection;
  theme: BusinessPlanTheme;
  pageNumber: number;
  totalPages: number;
}

export const BusinessPlanPage = forwardRef<HTMLDivElement, BusinessPlanPageProps>(
  ({ section, theme, pageNumber, totalPages }, ref) => {
    
    const getPageIcon = (pageNumber: number) => {
      const icons = [
        Building2, // Cover
        FileText, // Executive Summary
        Building2, // Company Description
        TrendingUp, // Market Analysis
        Users, // Organization
        Lightbulb, // Products/Services
        Target, // Marketing
        DollarSign, // Funding
        BarChart3, // Financial
        Award // Appendix
      ];
      const IconComponent = icons[pageNumber - 1] || FileText;
      return <IconComponent size={24} className="text-blue-600" />;
    };

    const renderCoverPage = () => (
      <div className="flex flex-col items-center justify-center h-full text-center relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-purple-500 rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-indigo-500 rounded-full"></div>
        </div>
        
        <div className="relative z-10">
          <div className="mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg">
              <Building2 size={40} className="text-white" />
            </div>
          </div>
          
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            {section.content.toString().split('\n')[0] || 'Your Company Name'}
          </h1>
          
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8 rounded-full"></div>
          
          <h2 className="text-3xl font-semibold text-gray-700 mb-8">Business Plan</h2>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-100">
            <p className="text-xl text-gray-600 mb-4">Prepared by:</p>
            <p className="text-2xl font-semibold text-gray-800 mb-6">
              {section.content.toString().split('\n')[3] || '[Your Name]'}
            </p>
            <div className="flex items-center justify-center space-x-2 text-gray-500">
              <Calendar size={18} />
              <p className="text-lg">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </div>
        </div>
      </div>
    );

    const renderExecutiveSummary = () => (
      <div className="space-y-8">
        {/* Header with Icon */}
        <div className="flex items-center space-x-4 mb-8">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
            {getPageIcon(pageNumber)}
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">{section.title}</h1>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2"></div>
          </div>
        </div>

        {/* Key Highlights Cards */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
            <div className="flex items-center space-x-3 mb-3">
              <TrendingUp size={20} className="text-blue-600" />
              <h3 className="font-semibold text-blue-900">Growth Potential</h3>
            </div>
            <p className="text-blue-700 text-sm">Projected 25% annual growth</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
            <div className="flex items-center space-x-3 mb-3">
              <DollarSign size={20} className="text-green-600" />
              <h3 className="font-semibold text-green-900">Funding Goal</h3>
            </div>
            <p className="text-green-700 text-sm">$500K initial investment</p>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white border-l-4 border-blue-500 p-6 rounded-r-xl shadow-sm">
          {renderContent()}
        </div>
      </div>
    );

    const renderCompanyDescription = () => (
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-purple-100 to-blue-100 px-6 py-3 rounded-full mb-4">
            {getPageIcon(pageNumber)}
            <h1 className="text-3xl font-bold text-gray-900">{section.title}</h1>
          </div>
          <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto"></div>
        </div>

        {/* Company Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
            <div className="text-2xl font-bold text-purple-600">2024</div>
            <div className="text-sm text-purple-700">Founded</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
            <div className="text-2xl font-bold text-blue-600">10+</div>
            <div className="text-sm text-blue-700">Team Members</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl">
            <div className="text-2xl font-bold text-indigo-600">5</div>
            <div className="text-sm text-indigo-700">Markets</div>
          </div>
        </div>

        {/* Content with side decoration */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full"></div>
          <div className="pl-8">
            {renderContent()}
          </div>
        </div>
      </div>
    );

    const renderMarketAnalysis = () => (
      <div className="space-y-8">
        {/* Header with Market Size Visualization */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-2xl mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {getPageIcon(pageNumber)}
              <div>
                <h1 className="text-4xl font-bold text-gray-900">{section.title}</h1>
                <p className="text-gray-600 mt-1">Market Opportunity Assessment</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-600">$2.5B</div>
              <div className="text-sm text-green-700">Total Market Size</div>
            </div>
          </div>
        </div>

        {/* Market Segments */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              Primary Market
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div>Size: $800M</div>
              <div>Growth: 15% annually</div>
              <div>Competition: Moderate</div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              Secondary Market
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div>Size: $400M</div>
              <div>Growth: 22% annually</div>
              <div>Competition: Low</div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-gradient-to-r from-green-50 to-transparent p-6 rounded-xl border-l-4 border-green-500">
          {renderContent()}
        </div>
      </div>
    );

    const renderOrganization = () => (
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <div className="p-4 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl shadow-lg">
            {getPageIcon(pageNumber)}
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">{section.title}</h1>
            <p className="text-gray-600 mt-1">Leadership & Team Structure</p>
          </div>
        </div>

        {/* Org Chart Visual */}
        <div className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-2xl mb-8">
          <div className="text-center mb-6">
            <div className="inline-block bg-white p-4 rounded-xl shadow-md border border-orange-200">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full mx-auto mb-2"></div>
              <div className="font-semibold text-gray-900">CEO/Founder</div>
              <div className="text-sm text-gray-600">Leadership</div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {['CTO', 'CMO', 'CFO'].map((role, index) => (
              <div key={role} className="text-center">
                <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                  <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full mx-auto mb-2"></div>
                  <div className="font-medium text-gray-800 text-sm">{role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-orange-500">
          {renderContent()}
        </div>
      </div>
    );

    const renderProductService = () => (
      <div className="space-y-8">
        {/* Header with Product Showcase */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full mb-4">
            {React.cloneElement(getPageIcon(pageNumber), { className: "text-white" })}
            <h1 className="text-3xl font-bold">{section.title}</h1>
          </div>
          <p className="text-gray-600 mt-2">Innovation & Product Excellence</p>
        </div>

        {/* Product Features Grid */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
            <div className="flex items-center space-x-3 mb-4">
              <Lightbulb size={20} className="text-purple-600" />
              <h3 className="font-semibold text-purple-900">Innovation</h3>
            </div>
            <p className="text-purple-700 text-sm">Cutting-edge technology and user-centric design</p>
          </div>
          <div className="bg-gradient-to-br from-pink-50 to-red-50 p-6 rounded-xl border border-pink-200">
            <div className="flex items-center space-x-3 mb-4">
              <Award size={20} className="text-pink-600" />
              <h3 className="font-semibold text-pink-900">Quality</h3>
            </div>
            <p className="text-pink-700 text-sm">Premium quality with industry-leading standards</p>
          </div>
        </div>

        {/* Content with gradient background */}
        <div className="relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-100 via-pink-50 to-purple-100 opacity-50"></div>
          <div className="relative p-6 border-l-4 border-purple-500">
            {renderContent()}
          </div>
        </div>
      </div>
    );

    const renderMarketingSales = () => (
      <div className="space-y-8">
        {/* Header with Target Icon */}
        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-6 rounded-2xl mb-8">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl shadow-lg">
              {getPageIcon(pageNumber)}
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">{section.title}</h1>
              <p className="text-gray-600 mt-1">Customer Acquisition & Revenue Strategy</p>
            </div>
          </div>
        </div>

        {/* Marketing Channels */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { name: 'Digital', percentage: '40%', color: 'bg-cyan-500' },
            { name: 'Social', percentage: '25%', color: 'bg-blue-500' },
            { name: 'Direct', percentage: '20%', color: 'bg-indigo-500' },
            { name: 'Partners', percentage: '15%', color: 'bg-purple-500' }
          ].map((channel) => (
            <div key={channel.name} className="text-center p-4 bg-white rounded-xl shadow-md border border-gray-100">
              <div className={`w-full h-2 ${channel.color} rounded-full mb-2`}></div>
              <div className="font-semibold text-gray-900">{channel.percentage}</div>
              <div className="text-sm text-gray-600">{channel.name}</div>
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-6 rounded-xl border-l-4 border-cyan-500">
          {renderContent()}
        </div>
      </div>
    );

    const renderFundingRequest = () => (
      <div className="space-y-8">
        {/* Header with Dollar Sign */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-2xl mb-4 shadow-lg">
            {React.cloneElement(getPageIcon(pageNumber), { className: "text-white", size: 28 })}
            <h1 className="text-4xl font-bold">{section.title}</h1>
          </div>
          <p className="text-gray-600 mt-2">Investment Opportunity & Capital Requirements</p>
        </div>

        {/* Funding Breakdown */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl mb-8 border border-green-200">
          <h3 className="text-xl font-semibold text-green-900 mb-6 text-center">Funding Allocation</h3>
          <div className="grid grid-cols-2 gap-6">
            {[
              { category: 'Product Development', amount: '$200K', percentage: '40%' },
              { category: 'Marketing & Sales', amount: '$150K', percentage: '30%' },
              { category: 'Operations', amount: '$100K', percentage: '20%' },
              { category: 'Working Capital', amount: '$50K', percentage: '10%' }
            ].map((item) => (
              <div key={item.category} className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-900">{item.category}</span>
                  <span className="text-green-600 font-semibold">{item.amount}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" 
                    style={{ width: item.percentage }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500">
          {renderContent()}
        </div>
      </div>
    );

    const renderFinancialProjections = () => (
      <div className="space-y-8">
        {/* Header with Chart Icon */}
        <div className="flex items-center justify-between mb-8 bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-2xl">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl shadow-lg">
              {getPageIcon(pageNumber)}
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">{section.title}</h1>
              <p className="text-gray-600 mt-1">5-Year Financial Outlook</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-indigo-600">$2.5M</div>
            <div className="text-sm text-indigo-700">Projected Revenue (Year 3)</div>
          </div>
        </div>

        {/* Financial Metrics */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-indigo-500">
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-2">25%</div>
              <div className="text-sm text-gray-600">Gross Margin</div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-purple-500">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">18</div>
              <div className="text-sm text-gray-600">Months to Break-even</div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-pink-500">
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-600 mb-2">3.2x</div>
              <div className="text-sm text-gray-600">ROI (5 years)</div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border-l-4 border-indigo-500">
          {renderContent()}
        </div>
      </div>
    );

    const renderAppendix = () => (
      <div className="space-y-8">
        {/* Header with Award Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-full mb-4 shadow-lg">
            {React.cloneElement(getPageIcon(pageNumber), { className: "text-white" })}
            <h1 className="text-3xl font-bold">{section.title}</h1>
          </div>
          <p className="text-gray-600 mt-2">Supporting Documents & Additional Information</p>
        </div>

        {/* Document Categories */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {[
            { title: 'Market Research', icon: TrendingUp, color: 'from-blue-500 to-cyan-500' },
            { title: 'Financial Models', icon: BarChart3, color: 'from-green-500 to-emerald-500' },
            { title: 'Legal Documents', icon: FileText, color: 'from-purple-500 to-pink-500' },
            { title: 'Technical Specs', icon: Lightbulb, color: 'from-orange-500 to-red-500' }
          ].map((doc) => (
            <div key={doc.title} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <div className="flex items-center space-x-3 mb-3">
                <div className={`p-2 bg-gradient-to-r ${doc.color} rounded-lg`}>
                  <doc.icon size={18} className="text-white" />
                </div>
                <h3 className="font-semibold text-gray-900">{doc.title}</h3>
              </div>
              <p className="text-sm text-gray-600">Detailed documentation and supporting materials</p>
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-xl border-l-4 border-amber-500">
          {renderContent()}
        </div>
      </div>
    );

    const renderContent = () => {
      if (section.contentType === 'paragraph') {
        const content = typeof section.content === 'string' ? section.content : section.content.join(' ');
        return (
          <div className="text-base leading-relaxed text-gray-700 whitespace-pre-line">
            {content}
          </div>
        );
      } else {
        const contentArray = Array.isArray(section.content) ? section.content : [section.content];
        return (
          <div className="space-y-4">
            {contentArray.map((item, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2"></div>
                <span className="text-base leading-relaxed text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        );
      }
    };

    const getPageLayout = () => {
      switch (pageNumber) {
        case 1: return renderCoverPage();
        case 2: return renderExecutiveSummary();
        case 3: return renderCompanyDescription();
        case 4: return renderMarketAnalysis();
        case 5: return renderOrganization();
        case 6: return renderProductService();
        case 7: return renderMarketingSales();
        case 8: return renderFundingRequest();
        case 9: return renderFinancialProjections();
        case 10: return renderAppendix();
        default: return renderExecutiveSummary();
      }
    };

    return (
      <div
        ref={ref}
        className="w-full bg-white mx-auto relative overflow-hidden print:shadow-none"
        style={{ 
          width: '8.5in',
          minHeight: '11in',
          maxWidth: '8.5in',
          padding: pageNumber === 1 ? '2rem' : '3rem'
        }}
      >
        {/* Page Content */}
        <div className="h-full">
          {getPageLayout()}
        </div>

        {/* Footer - Hidden on cover page */}
        {pageNumber !== 1 && (
          <div className="absolute bottom-8 left-12 right-12 flex justify-between items-center text-sm text-gray-400 border-t border-gray-200 pt-4">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">B</span>
              </div>
              <span>Business Plan</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>Page {pageNumber} of {totalPages}</span>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <span>{new Date().getFullYear()}</span>
            </div>
          </div>
        )}
      </div>
    );
  }
);

BusinessPlanPage.displayName = 'BusinessPlanPage';