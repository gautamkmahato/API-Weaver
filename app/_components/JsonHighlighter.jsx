// Custom JSON highlighter component
const JsonHighlighter = ({ json }) => {
    // Convert JSON to formatted string with proper indentation
    const formattedJson = JSON.stringify(json, null, 2);
    
    // Function to highlight different parts of JSON
    const highlightJson = (str) => {
      return str.split('\n').map((line, i) => {
        // Replace different parts of JSON with styled spans
        const highlightedLine = line
          // Highlight keys (before colon)
          .replace(/"([^"]+)":/g, '<span class="text-purple-600">"$1"</span>:')
          // Highlight string values
          .replace(/: "([^"]+)"/g, ': <span class="text-green-600">"$1"</span>')
          // Highlight numbers
          .replace(/: (\d+)/g, ': <span class="text-blue-600">$1</span>')
          // Highlight booleans
          .replace(/: (true|false)/g, ': <span class="text-orange-600">$1</span>')
          // Highlight null
          .replace(/: (null)/g, ': <span class="text-gray-600">$1</span>');
  
        return (
          <div key={i} className="leading-6">
            <span 
              dangerouslySetInnerHTML={{ __html: highlightedLine }} 
              className="font-mono"
            />
          </div>
        );
      });
    };
  
    return (
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="text-sm overflow-x-auto whitespace-pre">
          {highlightJson(formattedJson)}
        </div>
      </div>
    );
}

export default JsonHighlighter;