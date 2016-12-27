var fs     = require('fs');
var parser = require('comment-parser');
var file = process.argv.slice(2)[0]; //get a path to the p5.js file from command line.

// PARSE TERMINAL INPUT.
if(file == undefined){
  console.log("no p5.js file specified");
  return
}
console.log('converting ' + file  + ' ...')

var source = fs.readFileSync( file, 'utf-8');
var comments = parser(source);
var out = {".source.js": {}}
// console.log(comments)


    // var PICKER = Math.round(Math.random() * comments.length);
    // console.log( comments[PICKER] )

    for (var PICKER = 0; PICKER < comments.length; PICKER++) {
      var params = [];
      var concatedName;
      var name;
      var type;

    //grab the tags and assemble the autocomplete
    for (var i = 0; i < comments[PICKER].tags.length; i++) {
      // console.log("~+~+~+~+~+~+~+~")

      // console.log(      comments[PICKER].tags[i] )
      if(comments[PICKER].tags[i].tag == 'param'){
        params.push(comments[PICKER].tags[i].name)
      }
      if( comments[PICKER].tags[i].tag == 'method' || comments[PICKER].tags[i].tag == 'property' ){
        type = comments[PICKER].tags[i].tag
        name = comments[PICKER].tags[i].name
      }

    }
    if(type == 'method'){
      concatedName = name + '(' + params + ')'
    }else{
      concatedName = name
    }

    // console.log(concatedName)
    // console.log(params)

    var entry =  {} //create the JSON object for the snippet to live in.
      //set the name
      entry[concatedName] = {
          'rightLabelHTML': '<span style="color:#ed225d;display:inline-block;font-weight:400;font-size:1.25em">p5</span>',
          'prefix': 0,
          'body': 0,
          'description': 0,
          'descriptionMoreURL': 0,
      }
      //set the prefix & body
      if(type == 'method'){
        entry[concatedName].prefix = name + '()'
        entry[concatedName].body = name + '('

        for (var i = 0; i < params.length; i++) {
          if(params.length <= 1 || i == params.length-1){
            entry[concatedName].body += '${' +(i+1)+ ':' + params[i] +'}'
          }else{ //use a comma
            entry[concatedName].body += '${' +(i+1)+ ':' + params[i] +'},'
          }
        }

        entry[concatedName].body += ')$'+ (i+1)

      }else{
        entry[concatedName].prefix = name
        entry[concatedName].body = name

      }

      //set the discriptions
      entry[concatedName].description = comments[PICKER].description.substring(0,100) + '...'
      entry[concatedName].descriptionMoreURL = 'http://p5js.org/reference/#/p5/' + name

    console.log(entry)
    console.log("~+~+~+~+~+~+~+~")
    fs.appendFileSync(__dirname + "/p5js-snippets.cson", JSON.stringify(entry) + ',')

  }



 //check out fs.appendFile / appendFileSync for generating the file on the fly.

 // fs.writeFile(__dirname + "/p5js-snippets.cson", out, function(err) {
 //     if(err) {
 //         return console.log(err);
 //     }
 //
 //     console.log("p5js-snippets.cson exported!");
 // });

