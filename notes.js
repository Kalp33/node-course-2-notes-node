console.log('Starting notes.js');

/*module.exports.addNote = () => {
    console.log('addNote');
    return 'New Note';
};*/

/*module.exports.add = (a,b) => {
    return a + b;
};*/

const fs = require('fs');

var fetchNotes = () => {
    try{
        var notesString=fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);
    }catch(e){
        return [];
    }
};

var saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json',JSON.stringify(notes));
}

var addNote = (title, body) => {
    var notes = fetchNotes();
    var note = {
      title,
      body
    };
    var duplicateNotes = notes.filter((note)=>{
        return note.title === title;
    });
    if(duplicateNotes.length === 0){
        notes.push(note);
        saveNotes(notes);
        return note;
    }
};

var getAll = () => {
    return fetchNotes();
};

var logNote = (note) => {
    console.log('Note retrieved......');
    console.log('Title:', note.title);
    console.log('Body:', note.body);
};

var getNote = (title) => {
    var notes = fetchNotes();
    var note = notes.filter((note) => note.title === title);
    return note[0];
};

var remove = (title) => {
    var notes = fetchNotes();
    var filteredNotes = notes.filter((note)=>note.title !== title);
    saveNotes(filteredNotes);
    return notes.length !== filteredNotes.length;
};

module.exports = {
    addNote, //addNote: addNote will work too
    getAll, //getAll : getAll will work too
    read: getNote,
    remove, //remove : remove will work too
    logNote
}
