import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Download, ArrowLeft, Upload, ChevronLeft, ChevronRight, FileText } from 'lucide-react';
import { BusinessPlanTemplate, BusinessPlanSection } from '../types/businessPlan';
import { BusinessPlanPage } from './BusinessPlanPage';
import { SectionEditor } from './SectionEditor';
import { generateBusinessPlanPDF } from '../utils/businessPlanPdfGenerator';

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
  const pageRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const totalPages = 10;
  const currentSection = sections.find(section => section.pageNumber === currentPage);

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
      
      // Update sections with JSON data
      const updatedSections = sections.map(section => {
        const sectionKey = section.id.replace(/-/g, '');
        const matchingKey = Object.keys(jsonData).find(key => 
          key.toLowerCase().replace(/[^a-z]/g, '') === sectionKey ||
          sectionKey.includes(key.toLowerCase().replace(/[^a-z]/g, ''))
        );

        if (matchingKey && jsonData[matchingKey]) {
          const content = jsonData[matchingKey];
          return {
            ...section,
            content: Array.isArray(content) ? content : content.toString(),
            contentType: Array.isArray(content) ? 'bullets' as const : 'paragraph' as const
          };
        }

        return section;
      });

      setSections(updatedSections);
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
        sections,
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
              <p className="text-gray-600 mt-1">Professional 10-page business plan template</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowJsonInput(!showJsonInput)}
              className="px-4 py-2 bg-purple-100 text-purple-700 hover:bg-purple-200 rounded-xl transition-colors font-medium"
            >
              <Upload size={16} className="inline mr-2" />
              Import JSON
            </button>

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
        {showJsonInput && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-6 bg-white rounded-2xl shadow-lg border border-gray-200 max-w-7xl mx-auto"
          >
            <h3 className="text-lg font-semibold mb-4">Import JSON Data</h3>
            <p className="text-sm text-gray-600 mb-4">
              Paste your JSON data below. Use keys like "executiveSummary", "companyDescription", "marketAnalysis", etc.
            </p>
            <textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder='{"companyName": "Your Company", "executiveSummary": ["Point 1", "Point 2"], "companyDescription": "Your company description..."}'
              className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-mono"
            />
            <div className="flex space-x-3 mt-4">
              <button
                onClick={handleJsonImport}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Import Data
              </button>
              <button
                onClick={() => setShowJsonInput(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-12 gap-6 max-w-none">
          {/* Left Panel - Section Editor */}
          <motion.div
            className="col-span-4 bg-white rounded-2xl shadow-lg border border-gray-200 flex flex-col overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText size={20} className="text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Page Editor</h2>
                  <p className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto p-4">
              {currentSection && (
                <SectionEditor
                  section={currentSection}
                  onUpdateSection={updateSection}
                  theme={template.theme}
                />
              )}
            </div>

            {/* Page Navigation */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft size={16} />
                  <span>Previous</span>
                </button>

                <div className="flex space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
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
                  className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <span>Next</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right Panel - Page Preview */}
          <motion.div
            className="col-span-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
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
  );
};