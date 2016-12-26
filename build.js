// var fs = require('fs');
// //
// var contents = fs.readFileSync('p5.js', 'utf8');
// // console.log(contents);
//
// var parser = require('jsdoc3-parser');
//
// parser('p5.js', function(error, ast) {
//
// console.log(ast)
//  // fs.writeFileSync("p5js-snippets.cson", ast, function(err) {
//  //     if(err) {
//  //         return console.log(err);
//  //     }
//  //
//  //     console.log("p5js-snippets.cson exported!");
//  // });
//
// });

var fs     = require('fs');
var parser = require('comments-parser');

var source = fs.readFileSync(__dirname + '/p5.js', 'utf-8');
// parser(options:{'parseJsDocTags':true});
var comments = parser(source);
console.log(comments)

  for (var i = 0; i < comments.length; i++) {
    console.log("~+~+~+~+~+~+~+~")
    if(comments[i].jsDoc){
      console.log( comments[i] )
    }
  }
  
 //check out fs.appendFile / appendFileSync for generating the file on the fly.

 // fs.writeFile(__dirname + "/p5js-snippets.cson", comments.toString(), function(err) {
 //     if(err) {
 //         return console.log(err);
 //     }
 //
 //     console.log("p5js-snippets.cson exported!");
 // });

// console.log(comments)

// Test parsed data
// expect(comments[0].lines).to.equal([ 'Class description' ]);