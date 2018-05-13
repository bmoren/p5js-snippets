'use babel';

import { CompositeDisposable } from 'atom'

// Load Shell, fs and path for launching
// external website urls, and loading json
// files with all the references
shell = require('shell');
fs = require('fs');
path = require('path');

// Load JSON Snippets
var testFile = path.join(__dirname, '/../snippets/p5js-snippets.json');
var initialFileContents = JSON.parse(fs.readFileSync(testFile));

// List Items that should possibly be
// removed on the context menu
var ban_menus = {
  "Find in p5 Reference": true
};

export default {

  subscriptions: null,
  referenceUrl: false,

  activate() {
    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'p5js-snippets:fetch': () => this.fetch(),
      'p5js-snippets:ref': () => this.ref()
    }));

    let editor;
    let self = this;

    // Add p5 reference link to contextMenu
    // This can be done through menus/p5js-snippets.cson
    // but had issues adding a shouldDisplay(function)
    // so I moved adding the item to the context menu to
    // the activation function.
    atom.contextMenu.add({
      'atom-text-editor': [
        {type: 'separator'},
        {

          'label': 'Find in p5js Reference',
          'command': 'p5js-snippets:fetch',
          shouldDisplay: function shouldDisplay(event) {
            //console.log(event);
            if (editor = atom.workspace.getActiveTextEditor()) {

              // Find cursor
              let cursor = editor.getLastCursor();

              if(cursor.isInsideWord()){

                // If not ( { - + / }) ect;
                var word = editor.buffer.getTextInRange(cursor.getCurrentWordBufferRange());

                // find Reference
                self.referenceUrl = self.findRefence(word) || false;

                if(self.referenceUrl !== false) {
                  return true; //show p5 link;
                } else {
                  return false; //hide p5 link;
                }
              }
            }

          }
        },
        {type: 'separator'}
      ]
    });
  },

  deactivate() {
    this.subscriptions.dispose()
  },

  findRefence(word){
    var isWordFound = false;
    for (p5Ref in initialFileContents['.source.js']) {
      for (subItem in initialFileContents['.source.js'][p5Ref]) {
        var name = initialFileContents['.source.js'][p5Ref].leftLabel.toString();
        name = name.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');  // strip special characters for comparison with your selection
        //console.log(initialFileContents['.source.js'][p5Ref]);
        //console.log(initialFileContents['.source.js'][p5Ref].leftLabel);
        //console.log(initialFileContents['.source.js'][p5Ref].descriptionMoreURL);
        //console.log(name + '  ' + word);
        if(name == word){
          return initialFileContents['.source.js'][p5Ref].descriptionMoreURL;
        }
      }
    };
    return isWordFound;
  },

  fetch() {
    let self = this;
    shell.openExternal(self.referenceUrl);
  },

  ref(){
    shell.openExternal('https://p5js.org/reference/');
  }
};
