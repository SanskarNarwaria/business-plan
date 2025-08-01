import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit3, Type, List, Save } from 'lucide-react';
import { BusinessPlanSection, BusinessPlanTheme } from '../types/businessPlan';

interface SectionEditorProps {
  section: BusinessPlanSection;
  onUpdateSection: (sectionId: string, updates: Partial<BusinessPlanSection>) => void;
  theme: BusinessPlanTheme;
}

export const SectionEditor: React.FC<SectionEditorProps> = ({
  section,
  onUpdateSection,
  theme
}) => {
  const [editTitle, setEditTitle] = useState(section.title);
  const [editContent, setEditContent] = useState(
    Array.isArray(section.content) ? section.content : [section.content]
  );
  const [contentType, setContentType] = useState<'paragraph' | 'bullets'>(section.contentType);

  const handleSave = () => {
    const filteredContent = editContent.filter(item => item.trim() !== '');
    const finalContent = contentType === 'paragraph' 
      ? filteredContent.join('\n\n') 
      : filteredContent.length > 0 ? filteredContent : ['Add content here...'];
    
    onUpdateSection(section.id, {
      title: editTitle.trim() || 'Untitled Section',
      content: finalContent,
      contentType
    });
  };

  const addContentItem = () => {
    setEditContent(prev => [...prev, '']);
  };

  const removeContentItem = (index: number) => {
    if (editContent.length > 1) {
      setEditContent(prev => prev.filter((_, i) => i !== index));
    }
  };

  const updateContentItem = (index: number, value: string) => {
    setEditContent(prev => {
      const newContent = [...prev];
      newContent[index] = value;
      return newContent;
    });
  };

  const toggleContentType = (newType: 'paragraph' | 'bullets') => {
    setContentType(newType);
    
    if (newType === 'paragraph' && editContent.length > 1) {
      setEditContent([editContent.join('\n\n')]);
    } else if (newType === 'bullets' && editContent.length === 1) {
      const sentences = editContent[0].split(/[.\n]+/).filter(s => s.trim());
      setEditContent(sentences.length > 1 ? sentences.map(s => s.trim()) : editContent);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Edit3 size={18} className="text-blue-600" />
        </div>
        <div>
          <h3 className={`font-semibold text-gray-900 ${theme.fonts.heading}`}>
            Edit Section
          </h3>
          <p className={`text-sm text-gray-600 ${theme.fonts.body}`}>
            Page {section.pageNumber}
          </p>
        </div>
      </div>

      {/* Title Input */}
      <div>
        <label className={`block text-sm font-medium text-gray-700 mb-2 ${theme.fonts.body}`}>
          Section Title:
        </label>
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          className={`w-full p-3 border border-gray-300 rounded-lg font-semibold bg-white text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent ${theme.fonts.heading}`}
          placeholder="Section title"
        />
      </div>
      
      {/* Content Type Toggle */}
      <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
        <span className={`text-sm font-medium text-gray-700 ${theme.fonts.body}`}>Content Type:</span>
        <button
          onClick={() => toggleContentType('paragraph')}
          className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${
            contentType === 'paragraph' 
              ? 'bg-blue-100 text-blue-700' 
              : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Type size={16} />
          <span>Paragraph</span>
        </button>
        <button
          onClick={() => toggleContentType('bullets')}
          className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${
            contentType === 'bullets' 
              ? 'bg-blue-100 text-blue-700' 
              : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
        >
          <List size={16} />
          <span>Bullets</span>
        </button>
      </div>
      
      {/* Content Editing */}
      <div className="space-y-3">
        <label className={`block text-sm font-medium text-gray-700 ${theme.fonts.body}`}>
          Content:
        </label>
        {contentType === 'paragraph' ? (
          <textarea
            value={editContent[0] || ''}
            onChange={(e) => setEditContent([e.target.value])}
            className={`w-full p-4 border border-gray-300 rounded-lg resize-none bg-white text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent ${theme.fonts.body}`}
            rows={8}
            placeholder="Enter your paragraph content here..."
          />
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {editContent.map((item, index) => (
              <div key={index} className="flex items-start space-x-2">
                <span className="text-blue-500 mt-3 flex-shrink-0">•</span>
                <textarea
                  value={item}
                  onChange={(e) => updateContentItem(index, e.target.value)}
                  className={`flex-1 p-3 border border-gray-300 rounded-lg resize-none bg-white text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent ${theme.fonts.body}`}
                  rows={2}
                  placeholder="Bullet point content"
                />
                {editContent.length > 1 && (
                  <button
                    onClick={() => removeContentItem(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-1 flex-shrink-0"
                    title="Remove item"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            
            <button
              onClick={addContentItem}
              className="flex items-center space-x-2 text-blue-600 hover:bg-blue-50 p-3 rounded-lg transition-colors w-full justify-center border border-dashed border-blue-300"
            >
              <span>+</span>
              <span>Add bullet point</span>
            </button>
          </div>
        )}
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center space-x-2"
      >
        <Save size={18} />
        <span>Save Changes</span>
      </button>
    </motion.div>
  );
};