import React, { useState } from 'react';
import Highlighter from 'react-highlight-words';
import './App.css';

function App() {
  const [searchWords, setSearchWords] = useState([]);

  const handleMouseUp = () => {
    const selectedText = window.getSelection().toString().trim();
    if (selectedText && !searchWords.includes(selectedText)) {
      setSearchWords([...searchWords, selectedText]);
    }
  };

  return (
    <div className="App" onMouseUp={handleMouseUp}>
      <Highlighter
        highlightClassName="YourHighlightClass"
        searchWords={searchWords}
        autoEscape={true}
        textToHighlight="The dog is chasing the cat. Or perhaps they're just playing? Select some text to highlight it."
      />
    </div>
  );
}

export default App;
