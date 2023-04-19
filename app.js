const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const fs = require('fs');
const path = require('path');

app.use(express.static(__dirname + '/tda7'))

let text = fs.readFileSync(`1.txt`, 'utf8')
// app.get("/", function(req, res) {
//   res.send('ok3');
// });
app.get("/igra228", function(req, res) {
  res.sendFile(__dirname + '/tda7/main/index.html');
});
app.get('/info', function(req, res){
  res.sendFile(__dirname + '/tda7/info.html');
  res.send(`<i>${text}</i>`);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
