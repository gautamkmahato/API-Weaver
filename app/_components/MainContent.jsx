// src/components/MainContent/index.js
const MainContent = ({ 
    apiData, 
    path, 
    method, 
    activeTab, 
    viewType,
    onTabChange,
    onViewTypeChange 
  }) => {
    const tabs = {
      GET: ['parameters', 'response', 'errors'],
      POST: ['parameters', 'body', 'response', 'errors'],
      PUT: ['parameters', 'body', 'response', 'errors'],
      DELETE: ['parameters', 'response', 'errors']
    };
  
    const currentTabs = tabs[method] || tabs.GET;
  
    return (
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <EndpointInfo path={path} method={method} apiData={apiData} />
          <TabNav 
            tabs={currentTabs}
            activeTab={activeTab}
            onTabChange={onTabChange}
          />
          <TabContent 
            tab={activeTab}
            apiData={apiData[path][method]}
            viewType={viewType}
            onViewTypeChange={onViewTypeChange}
          />
        </div>
      </div>
    );
};