var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));
var articles = {
  'article-one': {
	title: "Article One",
	heading: "Heading One",
	content: "<p> This is a long paragraph. </p>"
  },
  'article-two': {
	title: "Article Two",
	heading: "Heading Two",
	content: "<p> This is a long paragraph. </p>"
  },
  'article-three': {
	title: "Article 3",
	heading: "Heading 3",
	content: "<p> This is a long paragraph. </p>"
  }
};
function createTemplate(data){
var title = data.title;
var heading = data.heading;
var content = data.content;
var htmlTemplate = `
<html>
 <head>
 <title>${title}</title>
  <meta name = "viewport" content="width=device-width, initial-scale=1" />
  <link href="/ui/style.css" rel="stylesheet" /> 
 </head>
 <body>
  <div class="container">
   <div>
	<a ref="/">Home</a>
   </div>
   <hr/>
   <h3>${heading}</h3>
   <div>${content}</div>
  </div>
 </body>
</html>

`;
return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var counter = 0;
app.get('/counter', function (req, res) {
counter = counter + 1;  
res.send(counter.toString());
});

app.get('/:articleName', function (req, res) {
  var articleName = req.params.articleName;
  res.send(createTemplate(articles[articleName]));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/pks.jpeg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'pks.jpeg'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 8080;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
