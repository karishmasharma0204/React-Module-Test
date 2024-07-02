import React, { useState, useEffect } from 'react';
import GroupModal from './components/GroupModal';
import Notes from './components/Notes';
import './App.css'; // Importing the CSS file for better styling

const App = () => {
  const [groups, setGroups] = useState(JSON.parse(localStorage.getItem('groups')) || []);
  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem('notes')) || {});
  const [currentGroup, setCurrentGroup] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    localStorage.setItem('groups', JSON.stringify(groups));
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [groups, notes]);

  const handleAddGroup = (groupName) => {
    setGroups([...groups, groupName]);
    setShowModal(false);
  };

  const handleAddNote = (note) => {
    const newNotes = notes[currentGroup] || [];
    const timestamp = new Date();
    newNotes.push({ text: note, created: timestamp, updated: timestamp });
    setNotes({ ...notes, [currentGroup]: newNotes });
  };

  const handleGroupChange = (group) => {
    setCurrentGroup(group);
  };

  return (
    <div className="container">
      <div className="sidebar">
        <h1>Pocket Notes</h1>
        <button className="create-group-btn" onClick={() => setShowModal(true)}>+ Create Notes Group</button>
        <GroupModal show={showModal} onClose={() => setShowModal(false)} onSave={handleAddGroup} />

        {/* Groups */}
        <ul className="groups-list">
          {groups.map((group) => (
            <li key={group}>
              <span>
                <button className='group-btn-1'>{group.charAt(0).toUpperCase()}</button>
                <button className="group-btn-2" onClick={() => handleGroupChange(group)} style={{ backgroundColor: "transparent" }}>
                  {<b>{group}</b>}
                  {/*  {group} */}
                </button>

              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="notes-section">
        {currentGroup ? (
          <div className="notes-container">
            <div className="notes-list">
              <div className="group-header">
                <h2>{currentGroup}</h2>
              </div>

              {notes[currentGroup] && notes[currentGroup].map((note, index) => (
                <div key={index} className="note">
                  <div className='activity'>
                    {new Date(note.created).toLocaleString()} <br />
                  </div>
                  <div className='content'>
                    <p>{note.text}</p>
                  </div>
                </div>
              ))}

              {/* Text area for adding new notes */}
              <Notes group={currentGroup} onSave={handleAddNote} />
            </div>
          </div>
        ) : (
          <div className="welcome-section">
            <img
              src="https://s3-alpha-sig.figma.com/img/f2b5/d356/00b6d4748cd536df01bd2b4fecc1d821?Expires=1721001600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ux~VIcqU6rCuspIUlKrS823Gn3Ac7sHL94h3ks1~bgHwHa3Fl4oOpnj0f2Fgh4LnGuj4zm9dLQ1cuXkwhgAdPYqSC3lan6UnwwNU5xSR7SuoSL3LoyHTZ-kyE8Z9OYn9sTIKU4V9X1ndOUYthCIGs9wohQEsePFvbEpFqQVfNfr-tUlGdATlAVmkoYvSUBCKVZBCGaPDw8FY01x9BbJT6DToUMnuV2TBHhppSrtaL2oGqSN3B-AFfP3NovDvuILRuWosp~gD4kw8-fI3T3kN6pAslkOvC0D~qgqN4F12ReSFIrIkSH3AR2EzXfn8yFnxTNrlgBKbLV~5m94SvNDXRA__"
              alt="Pocket Notes"
            />
            <h1>Pocket Notes</h1>
            <p>Send and receive messages without keeping your phone online.</p>
            <p>Use Pocket Notes on up to 4 linked devices and 1 mobile phone.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
