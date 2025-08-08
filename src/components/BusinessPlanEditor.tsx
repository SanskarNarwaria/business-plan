import React, { useState, useRef } from 'react';
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, ArrowLeft, Upload, ChevronLeft, ChevronRight, FileText } from 'lucide-react';
import { BusinessPlanTemplate, BusinessPlanSection } from '../types/businessPlan';
import { BusinessPlanPage } from './BusinessPlanPage';
import { generateBusinessPlanPDF } from '../utils/businessPlanPdfGenerator';
import { createBusinessPlanFromJSON } from '../data/businessPlanTemplate';
import { importAllPagesData } from '../utils/pageImportFunctions';

interface BusinessPlanEditorProps {
  template: BusinessPlanTemplate;
  onBack: () => void;
}

export const BusinessPlanEditor: React.FC<BusinessPlanEditorProps> = ({ template, onBack }) => {
  const [sections, setSections] = useState<BusinessPlanSection[]>(template.sections);
  const [currentPage, setCurrentPage] = useState(1);
  const [jsonInput, setJsonInput] = useState('');
  const [showJsonInput, setShowJsonInput] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [processedData, setProcessedData] = useState<any>(null);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const pageRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      setIsLoadingData(true);
      try {
        // Initialize with API data, fallback to empty structure
        const data = await importAllPagesData({
          // This empty object will trigger API calls with fallback to empty values
        });
        setProcessedData(data);
      } catch (error) {
        console.error('Error loading data:', error);
        // Fallback to empty structure if everything fails
        const emptyData = await importAllPagesData({});
        setProcessedData(emptyData);
      } finally {
        setIsLoadingData(false);
      }
    };

    loadData();
  }, []);

  const totalPages = 13;
  
  // Get current section with processed data
  const getCurrentSectionWithProcessedData = () => {
    if (!processedData) return null;
    
    const baseSection = sections.find(section => section.pageNumber === currentPage);
    if (!baseSection) return null;

    // Always use processed data from import functions
    let processedContent;
    
    switch (baseSection.id) {
      case 'cover-page':
        processedContent = processedData.coverPage;
        break;
      case 'table-of-contents':
        processedContent = processedData.tableOfContents;
        break;
      case 'company-description':
        processedContent = processedData.companyDescription;
        break;
      case 'market-analysis':
        processedContent = processedData.marketAnalysis;
        break;
      case 'organization-management':
        processedContent = processedData.organizationManagement;
        break;
      case 'service-product-line':
        processedContent = processedData.productService;
        break;
      case 'marketing-sales':
        processedContent = processedData.marketingSales;
        break;
      case 'financial-projections':
        processedContent = processedData.financialProjections;
        break;
      case 'funding-request':
        processedContent = processedData.fundingRequest;
        break;
      case 'appendix':
        processedContent = processedData.appendix;
        break;
      case 'appendix-government-policy':
        processedContent = processedData.governmentPolicy;
        break;
      case 'appendix-ngo-landscape':
        processedContent = processedData.ngoLandscape;
        break;
      case 'appendix-grants':
        processedContent = processedData.grants;
        break;
    }

    return {
      ...baseSection,
      content: processedContent
    };
  };
  const updateSection = (sectionId: string, updates: Partial<BusinessPlanSection>) => {
    setSections(prevSections =>
      prevSections.map(section =>
        section.id === sectionId ? { ...section, ...updates } : section
      )
    );
  };

  const handleJsonImport = () => {
    try {
      const jsonData = JSON.parse(jsonInput);
      
      // Process the JSON data through import functions (async)
      const loadNewData = async () => {
        setIsLoadingData(true);
        try {
          const newProcessedData = await importAllPagesData(jsonData);
          setProcessedData(newProcessedData);
        } catch (error) {
          console.error('Error processing JSON data:', error);
          alert('Error processing JSON data. Please check the format and try again.');
        } finally {
          setIsLoadingData(false);
        }
      };
      
      loadNewData();
      
      // Update sections with new processed data
      setSections(prevSections => 
        prevSections.map(section => {
          let newContent = section.content;
          
          switch (section.id) {
            case 'cover-page':
              newContent = newProcessedData.coverPage;
              break;
            case 'table-of-contents':
              newContent = newProcessedData.tableOfContents;
              break;
            case 'company-description':
              newContent = newProcessedData.companyDescription;
              break;
            case 'market-analysis':
              newContent = newProcessedData.marketAnalysis;
              break;
            case 'organization-management':
              newContent = newProcessedData.organizationManagement;
              break;
            case 'service-product-line':
              newContent = newProcessedData.productService;
              break;
            case 'marketing-sales':
              newContent = newProcessedData.marketingSales;
              break;
            case 'financial-projections':
              newContent = newProcessedData.financialProjections;
              break;
            case 'funding-request':
              newContent = newProcessedData.fundingRequest;
              break;
            case 'appendix':
              newContent = newProcessedData.appendix;
              break;
            case 'appendix-government-policy':
              newContent = newProcessedData.governmentPolicy;
              break;
            case 'appendix-ngo-landscape':
              newContent = newProcessedData.ngoLandscape;
              break;
            case 'appendix-grants':
              newContent = newProcessedData.grants;
              break;
          }
          
          return { ...section, content: newContent };
        })
      );
      
      setJsonInput('');
      setShowJsonInput(false);
    } catch (error) {
      alert('Invalid JSON format. Please check your input and try again.');
    }
  };

  const downloadPDF = async () => {
    setIsGeneratingPDF(true);
    
    try {
      // Store the original page to restore later
      const originalPage = currentPage;
      
      // Function to get the current page element
      const getCurrentPageElement = () => {
        const pageElement = document.querySelector('[data-page-content]') as HTMLDivElement;
        return pageElement;
      };
      
      // Generate PDF with all pages
      await generateBusinessPlanPDF(
        sections.map(section => {
          // Use processed data for PDF generation
          let processedContent = section.content;
          
          switch (section.id) {
            case 'cover-page':
              processedContent = processedData.coverPage;
              break;
            case 'table-of-contents':
              processedContent = processedData.tableOfContents;
              break;
            case 'company-description':
              processedContent = processedData.companyDescription;
              break;
            case 'market-analysis':
              processedContent = processedData.marketAnalysis;
              break;
            case 'organization-management':
              processedContent = processedData.organizationManagement;
              break;
            case 'service-product-line':
              processedContent = processedData.productService;
              break;
            case 'marketing-sales':
              processedContent = processedData.marketingSales;
              break;
            case 'financial-projections':
              processedContent = processedData.financialProjections;
              break;
            case 'funding-request':
              processedContent = processedData.fundingRequest;
              break;
            case 'appendix':
              processedContent = processedData.appendix;
              break;
            case 'appendix-government-policy':
              processedContent = processedData.governmentPolicy;
              break;
            case 'appendix-ngo-landscape':
              processedContent = processedData.ngoLandscape;
              break;
            case 'appendix-grants':
              processedContent = processedData.grants;
              break;
          }
          
          return { ...section, content: processedContent };
        }),
        template.theme,
        setCurrentPage,
        getCurrentPageElement,
        'business-plan.pdf'
      );
      
      // Restore original page after PDF generation
      setCurrentPage(originalPage);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert(`Error generating PDF: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentSection = getCurrentSectionWithProcessedData();

  // Show loading state
  if (isLoadingData) {
    return <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
      <div className="text-xl text-gray-600">Loading business plan data...</div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="w-full px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8 max-w-7xl mx-auto"
        >
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="p-3 hover:bg-white rounded-xl transition-colors shadow-sm border border-gray-200"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Business Plan Creator
              </h1>
             
            </div>
          </div>

          <div className="flex items-center space-x-3">
            

            <button
              data-download-button
              onClick={downloadPDF}
              disabled={isGeneratingPDF}
              className={`px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all font-medium shadow-lg ${
                isGeneratingPDF ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <Download size={16} className="inline mr-2" />
              {isGeneratingPDF ? 'Generating PDF...' : 'Download PDF'}
            </button>
          </div>
        </motion.div>

        {/* JSON Input Modal */}



        {/* Main Content */}
        <div className="flex justify-center max-w-none">
          <div className="w-full max-w-2xl">
            {/* Pagination - moved above and matching preview width */}
            <div className="w-full">
              <div className="p-2 border border-gray-200 bg-gray-50 rounded-t-lg">               
                <div className="flex items-center justify-between">                 
                  <button                   
                    onClick={prevPage}                   
                    disabled={currentPage === 1}                   
                    className="flex items-center space-x-1 px-1.5 py-1 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-xs"                 
                  >                   
                    <ChevronLeft size={12} />                   
                    <span>Previous</span>                 
                  </button>                  
                  
                  <div className="flex space-x-0.5">                   
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (                     
                      <button                       
                        key={page}                       
                        onClick={() => setCurrentPage(page)}                       
                        className={`w-5 h-5 rounded-md text-xs font-medium transition-colors ${                         
                          page === currentPage                           
                            ? 'bg-blue-600 text-white'                           
                            : 'bg-white text-gray-600 hover:bg-gray-100'                       
                        }`}                     
                      >                       
                        {page}                     
                      </button>                   
                    ))}                 
                  </div>                  
                  
                  <button                   
                    onClick={nextPage}                   
                    disabled={currentPage === totalPages}                   
                    className="flex items-center space-x-1 px-1.5 py-1 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-xs"                 
                  >                   
                    <span>Next</span>                   
                    <ChevronRight size={12} />                 
                  </button>               
                </div>             
              </div>
            </div>
                        
            {/* Page Preview - now below pagination */}
            <motion.div
              className="w-full"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white p-0 m-0 border border-gray-200 bg-gray-50 rounded-b-lg shadow-none flex justify-center items-center">
                {currentSection && (
                  <div data-page-content>
                    <BusinessPlanPage
                      ref={(el) => (pageRefs.current[currentPage] = el)}
                      section={currentSection}
                      theme={template.theme}
                      pageNumber={currentPage}
                      totalPages={totalPages}
                    />
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};