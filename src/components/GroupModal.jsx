import React, { useState, useRef } from 'react';

const GroupModal = ({ show, onClose, onSave }) => {
  const [groupName, setGroupName] = useState('');
  const modalRef = useRef();

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  const handleSave = () => {
    onSave(groupName);
    setGroupName('');
  };

  return show ? (
    <div className="modal-overlay">
      <div className="modal" ref={modalRef}>
        <h2>Create Group</h2>
        <textarea name="text-area" value={groupName} onChange={(e) => setGroupName(e.target.value)}placeholder='Enter your text here....'>

        </textarea>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  ) : null;
};

export default GroupModal;
