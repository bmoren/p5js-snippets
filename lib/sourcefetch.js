'use babel';

import { CompositeDisposable } from 'atom'
//import request from 'request'
//import cheerio from 'cheerio'
//import google from 'google'

//google.resultsPerPage = 1

shell = require('shell');
fs = require('fs');
path = require('path');

// Load JSON Snippets
var testFile = path.join(__dirname, '/../snippets/p5js-snippets.json');
var initialFileContents = JSON.parse(fs.readFileSync(testFile));

export default {

  subscriptions: null,

  activate() {
    this.subscriptions = new CompositeDisposable()

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'sourcefetch:fetch': () => this.fetch()
    }))
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
    let editor
    let self = this

    if (editor = atom.workspace.getActiveTextEditor()) {
      let query = editor.getSelectedText()
      let language = editor.getGrammar().name
      let cursor = editor.getLastCursor()

      //cursor.getCurrentWordBufferRange());

      

      console.log(initialFileContents);



      if(cursor.isInsideWord()){
        // If not ( { - + / }) ect
        var word = editor.buffer.getTextInRange(cursor.getCurrentWordBufferRange());
        console.log('word found == '+ editor.buffer.getTextInRange(cursor.getCurrentWordBufferRange()));
        var referenceUrl = self.findRefence(word);
          //console.log()
          if(referenceUrl != false) {
           shell.openExternal(referenceUrl);
          } else {
            atom.notifications.addWarning('This is not inside the p5 references');
          }
      }
      //self.search(query, language).then((url) => {
        //atom.notifications.addSuccess('Found google results!');

//        return self.download(url)
      //}).then((html) => {
       //let answer = self.scrape(html)
       //if (answer === '') {
       //  atom.notifications.addWarning('No answer found :(')
       //} else {
       //  atom.notifications.addSuccess('Found snippet!')
       //  editor.insertText(answer)
       //}
      //}).catch((error) => {
        //atom.notifications.addWarning(error.reason)
      //})
    }
  },


//open links externally by default


//  search(query, language) {
//    return new Promise((resolve, reject) => {
//      let searchString = `${query} in ${language} site:stackoverflow.com`
//
//      google(searchString, (err, res) => {
//        if (err) {
//          reject({
//            reason: 'A search error has occured :('
//          })
//        } else if (res.links.length === 0) {
//          reject({
//            reason: 'No results found :('
//          })
//        } else {
//          resolve(res.links[0].href)
//        }
//      })
//    })
//  },

//  scrape(html) {
//    $ = cheerio.load(html)
//    return $('div.accepted-answer pre code').text()
//  },

//  download(url) {
//    return new Promise((resolve, reject) => {
//      request(url, (error, response, body) => {
//        if (!error && response.statusCode == 200) {
//          resolve(body)
//        } else {
//          reject({
//            reason: 'Unable to download page'
//          })
//        }
//      })
//    })
//  }
};