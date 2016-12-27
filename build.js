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



// parser(options:{'parseJsDocTags':true});
var comments = parser(source);
// console.log(comments)

  // for (var i = 0; i < comments.length; i++) {
  //   console.log("~+~+~+~+~+~+~+~")
  //
  //   name = comments[i].tags
  //
  // }
    console.log("~+~+~+~+~+~+~+~")

    // name = comments[50].tags
    var params = [];
    var concatedName;
    var name;
    var type;

    var PICKER = Math.round(Math.random() * comments.length);
    console.log( comments[PICKER] )


    //grab the tags and assemble the autocomplete
    for (var i = 0; i < comments[PICKER].tags.length; i++) {
      console.log("~+~+~+~+~+~+~+~")

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

    console.log(concatedName)
    console.log(params)

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
    // 'attr($name, $value = null)':
    //   'rightLabelHTML': '<span style="color:white;transform:rotate(-90deg);display:inline-block;font-weight:400;font-size:1.25em">K</span>'
    //   'prefix': 'attr()       '
    //   'body': 'attr(${1:$name}, ${2:$value = null})${3}'
    //   'leftLabel': 'Helpers'
    //   'description': 'Creates attributes for an HTML tag'
    //   'descriptionMoreURL': 'https://getkirby.com/docs/cheatsheet/helpers/attr'



  // console.log(name)
  // console.log(params)
  // console.log(name + '(' + params + ')')



/*
'.source.js':
   'fancy console.log':
     'prefix': 'log'
     'body': 'console.log(${2:"$1"}) $3'


'attr($name, $value = null)':
  'rightLabelHTML': '<span style="color:white;transform:rotate(-90deg);display:inline-block;font-weight:400;font-size:1.25em">K</span>'
  'prefix': 'attr()       '
  'body': 'attr(${1:$name}, ${2:$value = null})${3}'
  'leftLabel': 'Helpers'
  'description': 'Creates attributes for an HTML tag'
  'descriptionMoreURL': 'https://getkirby.com/docs/cheatsheet/helpers/attr'
 */




 //check out fs.appendFile / appendFileSync for generating the file on the fly.

 // fs.writeFile(__dirname + "/p5js-snippets.cson", comments, function(err) {
 //     if(err) {
 //         return console.log(err);
 //     }
 //
 //     console.log("p5js-snippets.cson exported!");
 // });

