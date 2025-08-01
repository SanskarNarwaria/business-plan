import React, { useState } from 'react';
import { BusinessPlanStart } from './components/BusinessPlanStart';
import { BusinessPlanEditor } from './components/BusinessPlanEditor';
import { BusinessPlanTemplate } from './types/businessPlan';

type AppState = 'start' | 'editing';

function App() {
  const [appState, setAppState] = useState<AppState>('start');
  const [currentTemplate, setCurrentTemplate] = useState<BusinessPlanTemplate | null>(null);

  const handleStartEditing = (template: BusinessPlanTemplate) => {
    setCurrentTemplate(template);
    setAppState('editing');
  };

  const handleBack = () => {
    setAppState('start');
    setCurrentTemplate(null);
  };

  return (
    <div className="min-h-screen">
      {appState === 'start' && (
        <BusinessPlanStart onStartEditing={handleStartEditing} />
      )}

      {appState === 'editing' && currentTemplate && (
        <BusinessPlanEditor
          template={currentTemplate}
          onBack={handleBack}
        />
      )}
    </div>
  );
}

export default App;