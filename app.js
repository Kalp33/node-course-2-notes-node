const fs = require('fs');
//const os = require('os');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');



/*var user = os.userInfo();
var filteredArray = _.uniq(['RJ',1,2,1,3,'KK','RJ','NM','G']);

//console.log(user);

fs.appendFile('greetings.txt', 'Hello ' + user.username + '!' + 'You are ' + notes.age, function(err){
    if(err){
        console.log('Unable to write to the file');
    }
});

//console.log(notes.addNote());
console.log(notes.add(10, 12));
console.log(_.isString('KK'));
console.log(filteredArray);*/

var titleOption = {
    describe: 'Title of a note',
    demand: true,
    alias: 't'
    };
var bodyOption = {
    describe: 'Body of a note',
    demand: true,
    alias: 'b'
    }

const argv = yargs
    .command('add', 'Adds a new note',{
        title: titleOption,
        body: bodyOption
    })
    .command('list', 'List all notes')
    .command('read', 'Read a note',{
        title:titleOption
    })
    .command('remove', 'Removes a note',{
        title:titleOption
    })
    .help()
    .argv;
var command = argv._[0];
console.log('Command', command);
//console.log('Process', process.argv);
console.log('Yargs', argv);

if(command === 'add'){
    var note=notes.addNote(argv.title, argv.body);
    if(_.isUndefined(note)){
        console.log('Note title is already in use');
    }else{
        console.log('Note added with title ', note.title);
    }
}else if(command === 'list'){
    var notesRecieved = notes.getAll();
    console.log('Note(s):');
    notesRecieved.forEach((note)=>{notes.logNote(note)});

}else if(command === 'read'){
    var note = notes.read(argv.title);
    if(!(_.isUndefined(note))){
        notes.logNote(note);
    }else{
        console.log('Note does not exist');
    }
}else if(command === 'remove'){
    if(notes.remove(argv.title)){
        console.log('Note Removed');
    }else{
        console.log('Note not removed');
    }
}else{
    console.log('Command not recognized');
}

