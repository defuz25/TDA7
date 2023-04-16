const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const fs = require('fs')

let html = fs.readFile('public/c.html', 'utf8');

app.get("/", (req, res) => res.type('html').send('<p>w</p>'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
