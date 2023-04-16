const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

let html = fs.readFile('public/c.html', 'utf8');

app.get("/", (req, res) => res.type('html').send(html));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
