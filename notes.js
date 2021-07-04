const fs = require('fs');
const fileName = 'notes.json';

const getAllNotes = () => {
  let rawData = null;
  try {
    rawData = fs.readFileSync(fileName).toString();
  } catch (e) {
    rawData = '[]';
  }

  return JSON.parse(rawData);
};

const getNoteWithTitle = title => {
  const allNotes = getAllNotes();
  const indexToRead = allNotes.findIndex(note => note.title == title);
  return ~indexToRead ? allNotes[indexToRead] : null;
};

const addNote = (title, body) => {
  const allNotes = getAllNotes();
  allNotes.push({ title, body });
  fs.writeFileSync(fileName, JSON.stringify(allNotes));
}

const removeNote = title => {
  const allNotes = getAllNotes();
  const indextToDelete = allNotes.findIndex(note => note.title == title);

  if(~indextToDelete) {
    allNotes.splice(indextToDelete, 1);
    fs.writeFileSync(fileName, JSON.stringify(allNotes));
    return true;
  }
  
  return false;
};

const displayNote = (title, body) => {
  console.log(`Title: ${title}
Body: ${body}
`);
};

module.exports = {
  getAllNotes,
  getNoteWithTitle,
  addNote,
  removeNote,
  displayNote
};