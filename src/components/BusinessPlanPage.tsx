import React, { forwardRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { BusinessPlanSection, BusinessPlanTheme } from '../types/businessPlan';
import { Building, Building2, TrendingUp, Users, Target, DollarSign, BarChart3, Lightbulb, FileText, Calendar, Award, Zap, Globe, Shield, Rocket, Star, Heart, List, ArrowRight } from 'lucide-react';
import { StatsCard, MarketSegment, Stakeholder, ProductFeature, MarketingChannel, FinancialMetric, FundingAllocation, getPageKeys } from '../utils/pageImportFunctions';

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
        Building2,    // 1 - Cover
        List,         // 2 - Table of Contents
        Building,     // 3 - Company Description
        TrendingUp,   // 4 - Market Analysis
        Users,        // 5 - Organization
        Lightbulb,    // 6 - Products/Services
        Target,       // 7 - Marketing
        DollarSign,   // 8 - Financial
        DollarSign,   // 9 - Funding
        FileText,     // 10 - Appendix
        Award,        // 11 - Government Policy
        Users,        // 12 - NGO Landscape
        DollarSign    // 13 - Grants
      ];
    
      const whitePages = [1, 2, 5, 7, 8, 9]; 
    
      const IconComponent = icons[pageNumber - 1] || FileText;
      const colorClass = whitePages.includes(pageNumber) ? 'text-white' : 'text-blue-600';
    
      return <IconComponent size={24} className={colorClass} />;
    };

    const renderCoverPage = () => (
      <div 
        className="relative overflow-hidden"
        style={{
          height: '100%',
          width: '100%',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-16 left-12 w-16 h-16 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-24 right-16 w-12 h-12 bg-white/15 rounded-full"></div>
          <div className="absolute top-1/2 left-1/3 w-10 h-10 bg-white/20 rounded-full"></div>
          <div className="absolute top-1/4 right-1/4 w-6 h-6 bg-white/10 rounded-full"></div>
          
          {/* Geometric shapes */}
          <div className="absolute top-32 right-24 w-10 h-10 border-2 border-white/20 rotate-45"></div>
          <div className="absolute bottom-32 left-20 w-8 h-8 border-2 border-white/15 rotate-12"></div>
        </div>
        
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-8 py-12">
          {/* Logo Section */}
          <div className="mb-8">
            <div className="relative">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 mx-auto shadow-2xl border border-white/30">
                <Building2 size={24} className="text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                <Star size={10} className="text-white" />
              </div>
            </div>
          </div>
          
          {/* Title Section */}
          <div className="mb-8">
            <h1 className="text-2xl font-black text-white mb-3 leading-tight tracking-tight">
              {section.content.companyName || 'Your Company Name'}
            </h1>
            
            <div className="flex items-center justify-center mb-4">
              <div className="h-1 w-8 bg-white/40 rounded-full"></div>
              <div className="h-1.5 w-4 bg-white rounded-full mx-2"></div>
              <div className="h-1 w-8 bg-white/40 rounded-full"></div>
            </div>
            
            <h2 className="text-lg font-bold text-white/90 mb-2">{section.content.subtitle || 'Business Plan'}</h2>
            <p className="text-sm text-white/70">Strategic Vision & Growth Roadmap</p>
          </div>
          
          {/* Info Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 shadow-2xl border border-white/20 max-w-xs">
            <div className="flex items-center justify-center mb-3">
              <Heart size={12} className="text-red-400 mr-2" />
              <span className="text-white font-semibold text-xs">Prepared with passion by:</span>
            </div>
            <p className="text-sm font-bold text-white mb-2">
              {section.content.preparedBy || '[Your Name]'}
            </p>
            <div className="flex items-center justify-center space-x-2 text-white/80">
              <Calendar size={12} />
              <p className="text-xs">{section.content.year || new Date().getFullYear()}</p>
            </div>
          </div>
        </div>
      </div>
    );

    const tableOfContents = [
      { title: 'Company Description', description: 'Foundation & Vision', page: 3, icon: Building },
      { title: 'Market Analysis', description: 'Market Opportunity & Competitive Landscape', page: 4, icon: TrendingUp },
      { title: 'Organization and Management', description: 'Leadership Team & Organizational Structure', page: 5, icon: Users },
      { title: 'Service or Product Line', description: 'Innovation Meets Excellence', page: 6, icon: Lightbulb },
      { title: 'Marketing & Sales Strategy', description: 'Customer Acquisition & Growth Strategy', page: 7, icon: Target },
      { title: 'Financial Projections', description: '5-Year Financial Roadmap', page: 8, icon: BarChart3 },
      { title: 'Funding Request', description: 'Investment Opportunity & Capital Requirements', page: 9, icon: DollarSign },
      { title: 'Appendix', description: 'Supporting Documents & Additional Information', page: 10, icon: FileText },
      { title: 'Government Policy', description: 'Regulatory Environment & Compliance', page: 11, icon: Award },
      { title: 'NGO Landscape', description: 'Partnership Opportunities & Resources', page: 12, icon: Users },
      { title: 'Grants & Funding', description: 'Available Grants & Application Strategy', page: 13, icon: DollarSign }
    ];

    const renderTableOfContents = () => (
      <div 
        className="relative overflow-hidden"
        style={{
          height: '100%',
          width: '100%',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)'
        }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-16 left-12 w-12 h-12 bg-white/10 rounded-xl rotate-12"></div>
          <div className="absolute bottom-24 right-16 w-16 h-16 bg-white/5 rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-10 h-10 bg-white/15 rounded-lg rotate-45"></div>
          <div className="absolute top-1/4 right-1/3 w-12 h-12 border-2 border-white/20 rounded-full"></div>
          
          {/* Page indicators floating */}
          <div className="absolute top-12 right-12 flex space-x-1">
            {[1,2,3].map(i => (
              <div key={i} className="w-2 h-3 bg-white/20 rounded-sm"></div>
            ))}
          </div>
        </div>
        
        <div className="relative z-10 flex flex-col h-full px-6 py-6">
          {/* Header Section */}
          <div className="text-center mb-4 flex-shrink-0">
            <div className="inline-flex items-center space-x-3 bg-white/20 backdrop-blur-md px-6 py-2 rounded-xl mb-2 shadow-2xl border border-white/30">
              <List size={20} className="text-white" />
              <h1 className="text-lg font-black text-white">Table of Contents</h1>
            </div>
            <p className="text-xs text-white/80">Navigate Your Business Journey</p>
          </div>
          
          {/* Contents Grid */}
          <div className="flex-1 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-2xl border border-white/30 min-h-0">
            <div className="grid grid-cols-1 gap-1 h-full overflow-y-auto">
              {tableOfContents.map((item, index) => (
                <div 
                  key={index}
                  className="group flex items-center justify-between bg-gradient-to-r from-white to-gray-50 rounded-md p-1 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.01] border border-gray-100"
                >
                  <div className="flex items-center space-x-2 flex-1">
                    <div className="p-1.5 bg-gradient-to-br from-purple-500 to-blue-500 rounded-md shadow-sm group-hover:shadow-md transition-all">
                      <item.icon size={12} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xs font-bold text-gray-800 group-hover:text-purple-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-600 mt-0.5 leading-tight">{item.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="text-right">
                      <div className="text-sm font-black text-purple-600">{item.page}</div>
                      <div className="text-xs text-gray-500 uppercase font-medium">Page</div>
                    </div>
                    <ArrowRight size={12} className="text-gray-400 group-hover:text-purple-600 transition-colors" />
                  </div>
                </div>
              ))}
            </div>
            
            {/* Footer note */}
            
          </div>
        </div>
      </div>
    );

    const renderCompanyDescription = () => (
      <div 
        className="relative"
        style={{
          height: '100%',
          width: '100%',
          background: 'linear-gradient(to bottom right, #f8fafc, #e2e8f0)'
        }}
      >
        {/* Header with floating elements */}
        <div className="relative mb-4">
          <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-b-xl shadow-lg"></div>
          <div className="relative pt-2 pb-1.5 px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 bg-white rounded-md shadow-lg">
                  {getPageIcon(pageNumber)}
                </div>
                <div>
                  <h1 className="text-lg font-black text-white">{section.title}</h1>
                  <p className="text-purple-100 mt-0.5 text-xs">Foundation & Vision</p>
                </div>
              </div>
              <div className="text-right text-white">
                <div className="text-xs font-bold">EST.</div>
                <div className="text-sm font-black">2024</div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 space-y-1.5 flex flex-col mt-3" style={{ height: 'calc(100% - 80px)' }}>
          {/* Company Stats Cards */}
          {section.content.statsCards && section.content.statsCards.length > 0 && (
            <div className="grid grid-cols-4 gap-1 mb-1.5 flex-shrink-0">
              {section.content.statsCards.map((card: StatsCard, index: number) => {
                const borderColors = {
                  purple: 'border-purple-500',
                  blue: 'border-blue-500',
                  green: 'border-green-500',
                  orange: 'border-orange-500',
                  red: 'border-red-500',
                  yellow: 'border-yellow-500'
                };
                const textColors = {
                  purple: 'text-purple-600',
                  blue: 'text-blue-600',
                  green: 'text-green-600',
                  orange: 'text-orange-600',
                  red: 'text-red-600',
                  yellow: 'text-yellow-600'
                };
                return (
                  <div key={index} className={`bg-white rounded-md p-1.5 shadow-sm border-l-2 ${borderColors[card.color as keyof typeof borderColors] || 'border-gray-500'} hover:shadow-md transition-shadow`}>
                    <div className="text-center">
                      <div className={`text-sm font-black ${textColors[card.color as keyof typeof textColors] || 'text-gray-600'}`}>{card.value}</div>
                      <div className="text-xs text-gray-600 font-medium">{card.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Content with modern card design */}
          <div className="bg-white/95 backdrop-blur-sm rounded-lg p-3 flex-1 shadow-md min-h-0 flex flex-col">
             <div className="flex items-center mb-3 flex-shrink-0">
               <Globe size={14} className="text-purple-600 mr-2" />
               <h3 className="text-sm font-bold text-gray-800">Market Intelligence</h3>
             </div>
             <div className="flex-1 overflow-y-auto min-h-0">
               {renderContent()}
             </div>
           </div>
        </div>
      </div>
    );

    const renderMarketAnalysis = () => (
      <div 
        className="relative"
        style={{
          height: '100%',
          width: '100%',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)'
        }}
      >
        {/* Floating geometric shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-12 right-16 w-12 h-12 border-2 border-white/20 rounded-full"></div>
          <div className="absolute bottom-24 left-12 w-16 h-16 bg-white/10 rounded-lg rotate-12"></div>
          <div className="absolute top-1/2 right-1/3 w-10 h-10 bg-white/15 rounded-full"></div>
        </div>

        <div className="relative z-10 p-5 h-full flex flex-col">
          {/* Header */}
          <div className="text-center mb-3 flex-shrink-0">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full mb-2 shadow-lg border border-white/30">
              {React.cloneElement(getPageIcon(pageNumber), { className: "text-white", size: 20 })}
              <h1 className="text-lg font-black text-white">{section.title}</h1>
            </div>
            <p className="text-white/80 text-xs">Market Opportunity & Competitive Landscape</p>
          </div>

          {/* Market Size Visualization */}
          {(section.content.totalMarket || section.content.marketSegments) && (
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-2 mb-2 border border-white/20 flex-shrink-0">
              {section.content.totalMarket && (
                <div className="text-center mb-2">
                  <h3 className="text-sm font-bold text-white mb-1">Total Addressable Market</h3>
                  <div className="text-xl font-black text-white">{section.content.totalMarket}</div>
                  {section.content.marketGrowth && (
                    <p className="text-white/70 text-xs">Growing at {section.content.marketGrowth}</p>
                  )}
                </div>
              )}
              
              {/* Market segments with progress bars */}
              {section.content.marketSegments && section.content.marketSegments.length > 0 && (
                <div className="grid grid-cols-2 gap-1.5">
                  {section.content.marketSegments.map((segment: MarketSegment, index: number) => (
                    <div key={index} className="bg-white/20 rounded-md p-1.5">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-white font-semibold text-xs">{segment.name}</span>
                        <span className="text-white/80 text-xs">{segment.value}</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-1">
                        <div className={`bg-gradient-to-r ${segment.color} h-1 rounded-full`} style={{width: segment.percentage}}></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Content */}
          <div className="bg-white/95 backdrop-blur-sm rounded-lg p-3 flex-1 shadow-md min-h-0 flex flex-col">
             <div className="flex items-center mb-3 flex-shrink-0">
               <Globe size={14} className="text-purple-600 mr-2" />
               <h3 className="text-sm font-bold text-gray-800">Market Intelligence</h3>
             </div>
             <div className="flex-1 overflow-y-auto min-h-0">
               {renderContent()}
             </div>
          </div>
        </div>
      </div>
    );

    const renderOrganization = () => (
      <div 
        className="relative"
        style={{
          height: '100%',
          width: '100%',
          background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)'
        }}
      >
        {/* Background pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-12 left-12 w-14 h-14 bg-white/10 rounded-full"></div>
          <div className="absolute bottom-20 right-16 w-20 h-20 bg-white/5 rounded-xl rotate-45"></div>
          <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-white/15 rounded-full"></div>
        </div>

        <div className="relative z-10 p-6 h-full flex flex-col">
          {/* Header */}
          <div className="text-center mb-4 flex-shrink-0">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2 rounded-full mb-3 shadow-xl">
              {React.cloneElement(getPageIcon(pageNumber), { className: "text-white", size: 24 })}
              <h1 className="text-lg font-black text-white">{section.title}</h1>
            </div>
            <p className="text-gray-700 text-sm font-medium">Leadership Team & Organizational Structure</p>
          </div>

          {/* Team showcase */}
          <div className="bg-white/80 backdrop-blur-md rounded-xl p-4 flex-1 shadow-xl border border-white/50 min-h-0">
            <h3 className="text-base font-bold text-center text-gray-800 mb-3">Meet Our Stakeholders</h3>
            
            {section.content.stakeholders && section.content.stakeholders.length > 0 && (
              <div className="grid grid-cols-2 gap-2 mb-3 flex-1">
                {section.content.stakeholders.map((stakeholder: Stakeholder) => (
                  <div key={stakeholder.id} className="bg-gradient-to-br from-white to-gray-50 rounded-lg p-3 shadow-md hover:shadow-lg transition-all hover:scale-102 border border-gray-100">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="relative">
                        <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-md">
                          <span className="text-white font-black text-sm">{stakeholder.id}</span>
                        </div>
                        <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border border-white"></div>
                      </div>
                      <div>
                        <div className="font-black text-gray-800 text-sm">{stakeholder.name}</div>
                        <div className="text-orange-600 font-semibold text-xs">{stakeholder.role}</div>
                      </div>
                    </div>
                    
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Stake:</span>
                        <span className="font-bold text-orange-600">{stakeholder.stake}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Experience:</span>
                        <span className="font-bold text-gray-800">{stakeholder.experience}</span>
                      </div>
                      <div className="pt-0.5 border-t border-gray-200">
                        <div className="text-xs text-gray-500 truncate flex items-center gap-1">
                          <FontAwesomeIcon icon={faEnvelope} className="w-3.5 h-3.5" />
                          <span>{stakeholder.email}</span>
                        </div>
                        <div className="text-xs text-gray-500 truncate flex items-center gap-1">
                          <FontAwesomeIcon icon={faLinkedin} className="w-3.5 h-3.5" />
                          <span>{stakeholder.linkedin}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {(!section.content.stakeholders || section.content.stakeholders.length === 0) && (
              <div className="text-center">
                <p className="text-xs text-gray-600 bg-orange-50 rounded-lg p-3 border border-orange-200">
                  💡 <strong>Note:</strong> No stakeholder data available. Please provide stakeholder information in the backend data.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );

    const renderProductService = () => (
      <div 
        className="relative"
        style={{
          height: '100%',
          width: '100%',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}
      >
        {/* Tech-inspired background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-16 h-16 border-2 border-white/20 rounded-lg rotate-12"></div>
          <div className="absolute bottom-32 right-24 w-20 h-20 bg-white/10 rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-white/15 rounded-xl rotate-45"></div>
          
          {/* Circuit-like lines */}
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>

        <div className="relative z-10 p-6 h-full flex flex-col">
          {/* Header */}
          <div className="text-center mb-4 flex-shrink-0">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-3 shadow-lg border border-white/30">
              <Lightbulb size={24} className="text-yellow-300" />
              <h1 className="text-lg font-black text-white">{section.title}</h1>
            </div>
            <p className="text-white/80 text-sm">Innovation Meets Excellence</p>
          </div>

          {/* Product showcase */}
          {section.content.productFeatures && section.content.productFeatures.length > 0 && (
            <div className="grid grid-cols-2 gap-2 mb-3 flex-shrink-0">
              {section.content.productFeatures.map((feature: ProductFeature, index: number) => {
                const IconComponent = feature.icon === 'Zap' ? Zap : Shield;
                return (
                  <div key={index} className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 hover:bg-white/15 transition-all">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className={`p-1.5 bg-gradient-to-br ${feature.color} rounded-lg`}>
                        <IconComponent size={20} className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white">{feature.name}</h3>
                        <p className="text-white/70 text-xs">{feature.description}</p>
                      </div>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-1.5">
                      <div className={`bg-gradient-to-r ${feature.color} h-1.5 rounded-full`} style={{width: feature.percentage}}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Content */}
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 flex-1 shadow-lg min-h-0 flex flex-col">
             <div className="flex items-center mb-4 flex-shrink-0">
               <Globe size={16} className="text-purple-600 mr-2" />
               <h3 className="text-sm font-bold text-gray-800">Market Intelligence</h3>
             </div>
             <div className="flex-1 overflow-y-auto min-h-0">
               {renderContent()}
             </div>
           </div>
        </div>
      </div>
    );

    const renderMarketingSales = () => (
      <div 
        className="relative"
        style={{
          height: '100%',
          width: '100%',
          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
        }}
      >
        {/* Marketing-themed background */}
        <div className="absolute inset-0">
          <div className="absolute top-16 right-20 w-20 h-20 border-2 border-white/20 rounded-full"></div>
          <div className="absolute bottom-24 left-16 w-16 h-16 bg-white/10 rounded-xl rotate-12"></div>
          <div className="absolute top-1/3 left-1/3 w-14 h-14 bg-white/15 rounded-full"></div>
          
          {/* Target rings */}
          <div className="absolute top-1/2 right-1/4 w-24 h-24">
            <div className="absolute inset-0 border-2 border-white/20 rounded-full"></div>
            <div className="absolute inset-3 border-2 border-white/30 rounded-full"></div>
            <div className="absolute inset-6 border-2 border-white/40 rounded-full"></div>
          </div>
        </div>

        <div className="relative z-10 p-6 h-full flex flex-col">
          {/* Header */}
          <div className="text-center mb-4 flex-shrink-0">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-3 shadow-lg border border-white/30">
              <Target size={24} className="text-white" />
              <h1 className="text-lg font-black text-white">{section.title}</h1>
            </div>
            <p className="text-white/80 text-sm">Customer Acquisition & Growth Strategy</p>
          </div>

          {/* Marketing channels */}
          {section.content.marketingChannels && section.content.marketingChannels.length > 0 && (
            <div className="grid grid-cols-4 gap-1.5 mb-3 flex-shrink-0">
              {section.content.marketingChannels.map((channel: MarketingChannel) => (
                <div key={channel.name} className="bg-white/20 backdrop-blur-md rounded-lg p-2 text-center border border-white/30 hover:bg-white/25 transition-all">
                  <div className="text-lg mb-1">{channel.icon}</div>
                  <div className="text-sm font-black text-white mb-1">{channel.percentage}</div>
                  <div className="text-white/80 font-medium text-xs">{channel.name}</div>
                  <div className="mt-1 w-full bg-white/20 rounded-full h-1.5">
                    <div className={`bg-gradient-to-r ${channel.color} h-1.5 rounded-full`} style={{width: channel.percentage}}></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Content */}
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 flex-1 shadow-lg min-h-0 flex flex-col">
            <div className="flex items-center mb-4 flex-shrink-0">
              <Target size={16} className="text-cyan-600 mr-2" />
              <h3 className="text-sm font-bold text-gray-800">Marketing Strategy</h3>
            </div>
            <div className="flex-1 overflow-y-auto min-h-0">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    );

    const renderFinancialProjections = () => (
      <div 
        className="relative"
        style={{
          height: '100%',
          width: '100%',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)'
        }}
      >
        {/* Financial-themed background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-16 w-16 h-16 border-2 border-white/20 rounded-lg rotate-45"></div>
          <div className="absolute bottom-32 right-20 w-20 h-20 bg-white/10 rounded-full"></div>
          <div className="absolute top-1/2 right-1/3 w-14 h-14 bg-white/15 rounded-xl rotate-12"></div>
          
          {/* Chart-like lines */}
          <div className="absolute bottom-1/4 left-1/4 w-24 h-px bg-white/30"></div>
          <div className="absolute bottom-1/4 left-1/4 w-px h-12 bg-white/30"></div>
        </div>

        <div className="relative z-10 p-6 h-full flex flex-col">
          {/* Header */}
          <div className="text-center mb-4 flex-shrink-0">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-3 shadow-lg border border-white/30">
              <BarChart3 size={24} className="text-white" />
              <h1 className="text-lg font-black text-white">{section.title}</h1>
            </div>
            <p className="text-white/80 text-sm">5-Year Financial Roadmap</p>
          </div>

          {/* Key metrics */}
          {section.content.financialMetrics && section.content.financialMetrics.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mb-3 flex-shrink-0">
              {section.content.financialMetrics.map((metric: FinancialMetric, index: number) => (
                <div key={index} className="bg-white/20 backdrop-blur-md rounded-xl p-3 text-center border border-white/30">
                  <div className="text-xl font-black text-white mb-1">{metric.value}</div>
                  <div className="text-white/80 font-medium text-xs">{metric.label}</div>
                  {metric.percentage && (
                    <div className="mt-1 w-full bg-white/20 rounded-full h-1.5">
                      <div className={`bg-gradient-to-r ${metric.color} h-1.5 rounded-full`} style={{width: metric.percentage}}></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Revenue projection */}
          {(section.content.projectedRevenue || section.content.revenueTimeline) && (
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 mb-3 border border-white/20 flex-shrink-0">
              <div className="text-center mb-2">
                <h3 className="text-sm font-bold text-white mb-1">Projected Revenue Growth</h3>
                {section.content.projectedRevenue && (
                  <div className="text-xl font-black text-white">{section.content.projectedRevenue}</div>
                )}
                {section.content.revenueTimeline && (
                  <p className="text-white/70 text-xs">{section.content.revenueTimeline}</p>
                )}
              </div>
            </div>
          )}

          {/* Content */}
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 flex-1 shadow-lg min-h-0 flex flex-col">
            <div className="flex items-center mb-4 flex-shrink-0">
              <BarChart3 size={16} className="text-purple-600 mr-2" />
              <h3 className="text-sm font-bold text-gray-800">Financial Analysis</h3>
            </div>
            <div className="flex-1 overflow-y-auto min-h-0">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    );

    const renderFundingRequest = () => (
      <div 
        className="relative"
        style={{
          height: '100%',
          width: '100%',
          background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)'
        }}
      >
        {/* Money-themed background */}
        <div className="absolute inset-0">
          <div className="absolute top-16 left-20 w-20 h-20 bg-white/10 rounded-full"></div>
          <div className="absolute bottom-24 right-16 w-16 h-16 border-2 border-white/20 rounded-xl rotate-45"></div>
          <div className="absolute top-1/3 right-1/4 w-14 h-14 bg-white/15 rounded-full"></div>
          
          {/* Dollar signs */}
          <div className="absolute top-1/4 left-1/3 text-4xl text-white/10 font-black">$</div>
          <div className="absolute bottom-1/3 right-1/3 text-3xl text-white/10 font-black">$</div>
        </div>

        <div className="relative z-10 p-6 h-full flex flex-col">
          {/* Header */}
          <div className="text-center mb-4 flex-shrink-0">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-3 shadow-lg border border-white/30">
              <DollarSign size={24} className="text-white" />
              <h1 className="text-lg font-black text-white">{section.title}</h1>
            </div>
            <p className="text-white/80 text-sm">Investment Opportunity & Capital Requirements</p>
          </div>

          {/* Funding breakdown */}
          {section.content.fundingAllocation && section.content.fundingAllocation.length > 0 && (
            <div className="bg-white/20 backdrop-blur-md rounded-xl p-3 mb-3 border border-white/30 flex-shrink-0">
              <h3 className="text-sm font-bold text-white text-center mb-3">Funding Allocation</h3>
              
              <div className="grid grid-cols-2 gap-2">
                {section.content.fundingAllocation.map((item: FundingAllocation) => (
                  <div key={item.category} className="bg-white/90 rounded-lg p-3 shadow-md hover:shadow-lg transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-1.5">
                        <span className="text-sm">{item.icon}</span>
                        <span className="font-bold text-gray-800 text-xs break-words">{item.category}</span>
                      </div>
                      <span className="text-sm font-black text-green-600">{item.amount}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className={`bg-gradient-to-r ${item.color} h-1.5 rounded-full transition-all duration-1000`}
                        style={{ width: item.percentage }}
                      ></div>
                    </div>
                    <div className="text-right mt-0.5">
                      <span className="text-xs font-semibold text-gray-600">{item.percentage}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Content */}
      
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 flex-1 shadow-lg min-h-0 flex flex-col">
             <div className="flex items-center mb-4 flex-shrink-0">
               <Globe size={16} className="text-green-600 mr-2" />
               <h3 className="text-sm font-bold text-gray-800">Market Intelligence</h3>
             </div>
             <div className="flex-1 overflow-y-auto min-h-0">
               {renderContent()}
             </div>
           </div>
        </div>
      </div>
    );

    const renderAppendix = () => (
      <div 
        className="relative"
        style={{
          height: '100%',
          width: '100%',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}
      >
        {/* Document-themed background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-24 w-16 h-20 bg-white/10 rounded-lg"></div>
          <div className="absolute bottom-32 left-20 w-18 h-24 bg-white/5 rounded-lg rotate-12"></div>
          <div className="absolute top-1/2 left-1/3 w-14 h-16 bg-white/15 rounded-lg rotate-6"></div>
        </div>

        <div className="relative z-10 p-6 h-full flex flex-col">
          {/* Header */}
          <div className="text-center mb-4 flex-shrink-0">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-3 shadow-lg border border-white/30">
              <FileText size={24} className="text-white" />
              <h1 className="text-lg font-black text-white">{section.title}</h1>
            </div>
            <p className="text-white/80 text-sm">Supporting Documents & Additional Information</p>
          </div>


          {/* Content */}
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 flex-1 shadow-lg min-h-0 flex flex-col">
             <div className="flex items-center mb-4 flex-shrink-0">
               <FileText size={16} className="text-purple-600 mr-2" />
               <h3 className="text-sm font-bold text-gray-800">Supporting Documents</h3>
             </div>
             <div className="flex-1 overflow-y-auto min-h-0">
               {renderContent()}
             </div>
           </div>
        </div>
      </div>
    );

    const renderGovernmentPolicy = () => (
      <div 
        className="relative"
        style={{
          height: '100%',
          width: '100%',
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
        }}
      >
        {/* Government-themed background */}
        <div className="absolute inset-0">
          <div className="absolute top-16 left-16 w-20 h-20 bg-white/10 rounded-full"></div>
          <div className="absolute bottom-24 right-20 w-16 h-16 border-2 border-white/20 rounded-lg rotate-45"></div>
          <div className="absolute top-1/3 right-1/4 w-14 h-14 bg-white/15 rounded-xl rotate-12"></div>
          
          {/* Government building silhouette */}
          <div className="absolute bottom-1/4 left-1/4 w-24 h-16 bg-white/10 rounded-t-lg"></div>
          <div className="absolute bottom-1/4 left-1/3 w-4 h-20 bg-white/15"></div>
        </div>

        <div className="relative z-10 p-6 h-full flex flex-col">
          {/* Header */}
          <div className="text-center mb-4 flex-shrink-0">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-3 shadow-lg border border-white/30">
              <Award size={24} className="text-white" />
              <h1 className="text-lg font-black text-white">{section.title}</h1>
            </div>
            <p className="text-white/80 text-sm">Regulatory Environment & Compliance</p>
          </div>

          {/* Content */}
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 flex-1 shadow-lg min-h-0 flex flex-col">
            <div className="flex items-center mb-4 flex-shrink-0">
              <Award size={16} className="text-pink-600 mr-2" />
              <h3 className="text-sm font-bold text-gray-800">Government Regulations</h3>
            </div>
            <div className="flex-1 overflow-y-auto min-h-0">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    );

    const renderNGOLandscape = () => (
      <div 
        className="relative"
        style={{
          height: '100%',
          width: '100%',
          background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
        }}
      >
        {/* NGO-themed background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-18 h-18 bg-white/15 rounded-full"></div>
          <div className="absolute bottom-32 left-16 w-16 h-16 bg-white/10 rounded-xl rotate-12"></div>
          <div className="absolute top-1/2 left-1/3 w-12 h-12 bg-white/20 rounded-full"></div>
          
          {/* Heart shapes for NGO theme */}
          <div className="absolute top-1/4 right-1/3 text-3xl text-white/10">♥</div>
          <div className="absolute bottom-1/3 left-1/4 text-2xl text-white/15">♥</div>
        </div>

        <div className="relative z-10 p-6 h-full flex flex-col">
          {/* Header */}
          <div className="text-center mb-4 flex-shrink-0">
            <div className="inline-flex items-center space-x-2 bg-white/30 backdrop-blur-md px-4 py-2 rounded-full mb-3 shadow-lg border border-white/40">
              <Heart size={24} className="text-pink-600" />
              <h1 className="text-lg font-black text-gray-800">{section.title}</h1>
            </div>
            <p className="text-gray-700 text-sm font-medium">Partnership Opportunities & Resources</p>
          </div>

          {/* Content */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 flex-1 shadow-lg min-h-0 flex flex-col border border-white/50">
            <div className="flex items-center mb-4 flex-shrink-0">
              <Users size={16} className="text-teal-600 mr-2" />
              <h3 className="text-sm font-bold text-gray-800">NGO Partnerships</h3>
            </div>
            <div className="flex-1 overflow-y-auto min-h-0">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    );

    const renderGrantsFunding = () => (
      <div 
        className="relative"
        style={{
          height: '100%',
          width: '100%',
          background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
        }}
      >
        {/* Grants-themed background */}
        <div className="absolute inset-0">
          <div className="absolute top-16 left-20 w-20 h-20 bg-white/15 rounded-full"></div>
          <div className="absolute bottom-24 right-16 w-16 h-16 border-2 border-white/25 rounded-xl rotate-45"></div>
          <div className="absolute top-1/2 right-1/4 w-14 h-14 bg-white/20 rounded-lg rotate-12"></div>
          
          {/* Money/grant symbols */}
          <div className="absolute top-1/4 left-1/3 text-4xl text-white/15 font-black">$</div>
          <div className="absolute bottom-1/3 right-1/3 text-3xl text-white/20 font-black">€</div>
        </div>

        <div className="relative z-10 p-6 h-full flex flex-col">
          {/* Header */}
          <div className="text-center mb-4 flex-shrink-0">
            <div className="inline-flex items-center space-x-2 bg-white/30 backdrop-blur-md px-4 py-2 rounded-full mb-3 shadow-lg border border-white/40">
              <DollarSign size={24} className="text-orange-600" />
              <h1 className="text-lg font-black text-gray-800">{section.title}</h1>
            </div>
            <p className="text-gray-700 text-sm font-medium">Available Grants & Application Strategy</p>
          </div>

          {/* Funding stats */}
          {section.content.fundingStats && section.content.fundingStats.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mb-3 flex-shrink-0">
              {section.content.fundingStats.map((stat: StatsCard, index: number) => {
                const textColors = {
                  orange: 'text-orange-600',
                  green: 'text-green-600',
                  blue: 'text-blue-600',
                  purple: 'text-purple-600',
                  red: 'text-red-600',
                  yellow: 'text-yellow-600'
                };
                return (
                  <div key={index} className="bg-white/40 backdrop-blur-md rounded-lg p-2 text-center border border-white/50">
                    <div className={`text-lg font-black ${textColors[stat.color as keyof typeof textColors] || 'text-gray-600'}`}>{stat.value}</div>
                    <div className="text-xs text-gray-700 font-medium">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Content */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 flex-1 shadow-lg min-h-0 flex flex-col border border-white/50">
            <div className="flex items-center mb-4 flex-shrink-0">
              <Rocket size={16} className="text-orange-600 mr-2" />
              <h3 className="text-sm font-bold text-gray-800">Funding Opportunities</h3>
            </div>
            <div className="flex-1 overflow-y-auto min-h-0">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    );
    const renderContent = () => {
      if (section.contentType === 'structured' && typeof section.content === 'object') {
        const contentObj = section.content as Record<string, string>;
        
        // Get the page keys to identify structured data fields
        const pageKeys = getPageKeys();
        const currentPageKeys = Object.values(pageKeys).flat();
        
        // Define structured data keys that should not be rendered as text
        const structuredDataKeys = [
          'statsCards', 'marketSegments', 'stakeholders', 'productFeatures', 
          'marketingChannels', 'financialMetrics', 'fundingAllocation', 'fundingStats'
        ];
        
        // Filter out structured data and only keep string/primitive values
        const entries = Object.entries(contentObj).filter(([key, value]) => {
          // Skip if it's a known structured data key
          if (structuredDataKeys.includes(key)) {
            return false;
          }
          // Skip if the value looks like JSON (starts with [ or {)
          if (typeof value === 'string' && (value.trim().startsWith('[') || value.trim().startsWith('{'))) {
            return false;
          }
          // Only include string values
          return typeof value === 'string' && value.trim().length > 0;
        });
        
        return (
          <div className="space-y-3">
            {entries.map(([key, value], index) => (
              <div key={index} className="bg-gradient-to-r from-gray-50 to-white p-2 rounded-md border-l-2 border-blue-500 shadow-sm hover:shadow-md transition-shadow">
                <div>
                  <h4 className="font-bold text-gray-900 mb-1 flex items-center text-xs">
                    <div className="w-1 h-1 bg-blue-500 rounded-full mr-1.5"></div>
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
                  </h4>
                  <p className="text-xs leading-relaxed text-gray-700 ml-3">
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        );
      }
      
      // Fallback for any legacy content
      return (
        <div className="text-xs leading-relaxed text-gray-700 whitespace-pre-line space-y-1">
          {typeof section.content === 'string' ? section.content : JSON.stringify(section.content)}
        </div>
      );
    };

    const getPageLayout = () => {
      switch (pageNumber) {
        case 1: return renderCoverPage();
        case 2: return renderTableOfContents();
        case 3: return renderCompanyDescription();
        case 4: return renderMarketAnalysis();
        case 5: return renderOrganization();
        case 6: return renderProductService();
        case 7: return renderMarketingSales();
        case 8: return renderFinancialProjections();
        case 9: return renderFundingRequest();
        case 10: return renderAppendix();
        case 11: return renderGovernmentPolicy();
        case 12: return renderNGOLandscape();
        case 13: return renderGrantsFunding();
        default: return renderCoverPage();
      }
    };

    return (
  <>
    <div
      ref={ref}
      className="bg-white relative print:shadow-none overflow-visible"
      style={{
        width: '140mm',
        height: '198mm',
        minWidth: '140mm',
        maxWidth: '140mm',
        minHeight: '198mm',
        maxHeight: '198mm',
        margin: 0,
        padding: '0',
        boxSizing: 'border-box',
        overflow: 'hidden',
        position: 'relative',
        transform: 'scale(1)',
        transformOrigin: 'top left',
        zoom: '1',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          width: '100%',
          height: pageNumber === 1 ? '100%' : 'calc(100% - 36px)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {getPageLayout()}
      </div>

      {pageNumber !== 1 && (
        <div
          className="absolute flex justify-between items-center text-xs text-gray-400 border-t border-gray-200 pt-1.5"
          style={{
            bottom: '8px',
            left: '16px',
            right: '16px',
            height: '16px',
          }}
        >
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">B</span>
            </div>
            <span className="text-xs">Business Plan</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs">Page {pageNumber} of {totalPages}</span>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <span className="text-xs">{new Date().getFullYear()}</span>
          </div>
        </div>
      )}
    </div>
  </>
);

  }
);

BusinessPlanPage.displayName = 'BusinessPlanPage';