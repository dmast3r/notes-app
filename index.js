const chalk = require('chalk');
const yargs = require('yargs');
const { getAllNotes, getNoteWithTitle, addNote, removeNote, displayNote } = require('./notes.js');
const { argv } = require('yargs');


// setup yargs version
yargs.version('1.1.0');

// add command
yargs.command({
  command: 'add',
  describe: 'Add a new note',

  builder: {
    title: {
      describe: 'Note Title',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: 'Note Body',
      demandOption: true,
      type: 'string'
    }
  },
  
  handler: argv => {
    console.log('Adding a new note...');
    addNote(argv.title, argv.body);  
    console.log(chalk.green.bold('Note added successfully!'));
  }
});

// remove command
yargs.command({
  command: 'remove',
  describe: 'Remove a new note',

  builder: {
    title: {
      describe: 'The title of the note to delete',
      type: 'string',
      demandOption: true
    }
  },

  handler: function() {
    console.log('Removing an existing note...');
    if(removeNote(argv.title)) console.log(chalk.green.bold('Note deleted successfully!'));
    else console.log(chalk.red.bold('Failed to delete the note with the specified title...'));
  }
})

// list command
yargs.command({
  command: 'list',
  describe: 'List all the notes',
  handler: function() {
    console.log('Listing all the notes...\n');
    const allNotes = getAllNotes();
    for(const {title, body} of allNotes) displayNote(title, body);
  }
})

// read command
yargs.command({
  command: 'read',
  describe: 'Read out a note',

  builder: {
    title: {
      describe: 'The title of the note to delete',
      type: 'string',
      demandOption: true
    }
  },

  handler: function() {
    console.log('Reading out an existing note');
    const note = getNoteWithTitle(argv.title);

    if(note) displayNote(note.title, note.body); 
    else console.log(chalk.red.bold('No such note exists'));
  }
})

yargs.parse();