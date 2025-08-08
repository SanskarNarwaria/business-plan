import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Upload, ArrowRight, Sparkles } from 'lucide-react';
import { businessPlanTemplate, createBusinessPlanFromJSON } from '../data/businessPlanTemplate';
import { BusinessPlanTemplate } from '../types/businessPlan';
import { getPageKeys } from '../utils/pageImportFunctions';

interface BusinessPlanStartProps {
  onStartEditing: (template: BusinessPlanTemplate) => void;
}

export const BusinessPlanStart: React.FC<BusinessPlanStartProps> = ({ onStartEditing }) => {
  const [jsonInput, setJsonInput] = useState('');
  const [showJsonInput, setShowJsonInput] = useState(false);
  const [showJsonStructure, setShowJsonStructure] = useState(false);
  
  const pageKeys = getPageKeys();

  const handleStartFromTemplate = () => {
    onStartEditing(businessPlanTemplate);
  };

  const handleJsonImport = () => {
    try {
      const jsonData = JSON.parse(jsonInput);
      const customTemplate = createBusinessPlanFromJSON(jsonData);
      onStartEditing(customTemplate);
    } catch (error) {
      alert('Invalid JSON format. Please check your input and try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Business Plan
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {' '}Creator
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Create a comprehensive 10-page business plan with our professional template. 
            Start from scratch or import your data using JSON format.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Template Option */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="group cursor-pointer"
            onClick={handleStartFromTemplate}
          >
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="p-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                      <FileText size={32} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        Professional Business Plan Template
                      </h3>
                      <p className="text-gray-600 mt-1">
                        Complete 13-page business plan with all essential sections
                      </p>
                    </div>
                  </div>
                  
                  <ArrowRight 
                    size={24} 
                    className="text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300"
                  />
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Pages:</span>
                    <span className="font-medium">13</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Sections:</span>
                    <span className="font-medium">13</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    ✓ Executive Summary
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    ✓ Market Analysis
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    ✓ Financial Projections
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    ✓ JSON Import Ready
                  </span>
                </div>
              </div>
              
              <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-600 group-hover:opacity-80 transition-all duration-300"></div>
            </div>
          </motion.div>

          {/* JSON Import Option */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
          >
            <div className="p-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                  <Upload size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Import Your Data
                  </h3>
                  <p className="text-gray-600 mt-1">
                    Start with your existing business information using JSON format
                  </p>
                </div>
              </div>

              {!showJsonInput ? (
                <button
                  onClick={() => setShowJsonInput(true)}
                  className="w-full px-6 py-4 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors font-medium flex items-center justify-center space-x-2"
                >
                  <Sparkles size={20} />
                  <span>Import JSON Data</span>
                </button>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      JSON Data:
                    </label>
                    <textarea
                      value={jsonInput}
                      onChange={(e) => setJsonInput(e.target.value)}
                      placeholder='{"coverPage": {"companyName": "Your Company", "subtitle": "Business Plan", "year": "2024", "preparedBy": "Your Name"}, "companyDescription": {"legalStructure": "Your legal structure...", "companyHistory": "Your company history..."}, "marketAnalysis": {"industryAnalysis": "Your industry analysis..."}}'
                      className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm font-mono"
                    />
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={handleJsonImport}
                      disabled={!jsonInput.trim()}
                      className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Create Business Plan
                    </button>
                    <button
                      onClick={() => setShowJsonStructure(!showJsonStructure)}
                      className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      {showJsonStructure ? 'Hide' : 'Show'} Structure
                    </button>
                    <button
                      onClick={() => setShowJsonInput(false)}
                      className="px-4 py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {showJsonStructure && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg max-h-96 overflow-y-auto">
                  <h4 className="font-semibold text-gray-900 mb-3">Complete JSON Structure:</h4>
                  <div className="space-y-3 text-xs">
                    {Object.entries(pageKeys).map(([pageName, keys]) => (
                      <div key={pageName} className="bg-white p-3 rounded border">
                        <h5 className="font-bold text-purple-600 mb-2">{pageName}:</h5>
                        <div className="grid grid-cols-1 gap-1 ml-2">
                          {keys.map((key) => (
                            <div key={key} className="text-gray-600">• {key}</div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Quick Start Guide:</h4>
                <div className="text-sm text-gray-600 space-y-2">
                  <p><strong>Basic Structure:</strong> Each page has constant keys with your custom values.</p>
                  <p><strong>Empty Values:</strong> Leave values empty ("") to use default placeholders.</p>
                  <p><strong>Example:</strong> {"{"}"coverPage": {"{"}"companyName": "My Company", "year": "2024"{"}"}{"}"}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center space-x-2 text-gray-500">
                Complete 13-page business plan with all essential sections
            <span className="text-sm font-medium">Professional • Comprehensive • Export Ready</span>
            <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-gray-300"></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};