import React, { useState, useRef } from 'react';
import { Rnd } from 'react-rnd';
import './App.css';

function App() {
  const [highlights, setHighlights] = useState([]);
  const [notes, setNotes] = useState([]);
  const [selectedText, setSelectedText] = useState('');
  const [notePosition, setNotePosition] = useState({ x: 100, y: 100 });
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [anchorPosition, setAnchorPosition] = useState({ top: 0, left: 0 });
  const textareaRef = useRef(null);

  const handleMouseUp = (event) => {
    const selectedText = window.getSelection().toString().trim();
    if (selectedText) {
      setSelectedText(selectedText);
      setAnchorPosition({ top: event.pageY, left: event.pageX });
      setShowOptions(true);
    } else {
      setShowOptions(false);
    }
  };

  const handleHighlight = () => {
    if (selectedText) {
      setHighlights([...highlights, selectedText]);
      setSelectedText('');
      setShowOptions(false);
    }
  };

  const handleAddNote = () => {
    const noteText = textareaRef.current.value.trim();
    if (selectedText && noteText) {
      setNotes([...notes, { id: Date.now(), text: selectedText, note: noteText, position: notePosition }]);
      setSelectedText('');
      setShowNoteInput(false);
      setShowOptions(false);
    }
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className="App" onMouseUp={handleMouseUp}>
      <div className="text-content">
        The dog is chasing the cat. Or perhaps they're just playing? Select some text to highlight it.
      </div>
      {highlights.map((word, index) => (
        <span key={index} className="highlight">
          {word}
        </span>
      ))}
      {notes.map((note) => (
        <Rnd
          key={note.id}
          default={{
            x: note.position.x,
            y: note.position.y,
            width: 200,
            height: 150,
          }}
          bounds="parent"
        >
          <div className="note">
            <button className="delete-note" onClick={() => handleDeleteNote(note.id)}>Delete</button>
            <strong>{note.text}</strong>
            <p>{note.note}</p>
          </div>
        </Rnd>
      ))}
      {showOptions && (
        <div
          className="options"
          style={{ position: 'absolute', top: anchorPosition.top, left: anchorPosition.left }}
        >
          <button onClick={handleHighlight}>Highlight</button>
          <button onClick={() => setShowNoteInput(true)}>Add Note</button>
        </div>
      )}
      {showNoteInput && (
        <Rnd
          default={{
            x: notePosition.x,
            y: notePosition.y,
            width: 200,
            height: 150,
          }}
          bounds="parent"
          onDragStop={(e, d) => setNotePosition({ x: d.x, y: d.y })}
        >
          <div className="note-input">
            <textarea ref={textareaRef} rows="5" placeholder="Enter your note here..."></textarea>
            <button onClick={handleAddNote}>Add Note</button>
          </div>
        </Rnd>
      )}
    </div>
  );
}

export default App;
