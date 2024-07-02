import React, { useState } from 'react';

const Notes = ({ group, onSave }) => {
  const [note, setNote] = useState('');

  const handleSave = () => {
    if (note.trim()) {
      onSave(note);
      setNote('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  return (
    <div className='typenotes' style={{backgroundColor:"#E8E8E8", padding:"2rem", borderRadius:"1rem"}}>
      {/* <h2>{group}</h2> */}
      <textarea name="text-area" value={note} onChange={(e) => setNote(e.target.value)} 
        onKeyPress={handleKeyPress} id="text-area" cols="100" rows="10" placeholder='Enter your text here...'></textarea>  
      <button onClick={handleSave}>Enter</button>
    </div>
  );
};

export default Notes;
