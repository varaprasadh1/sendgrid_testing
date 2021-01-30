const express = require("express");

const router = require("./router");



const app = express();


app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(router);

const PORT = process.env.PORT || 3000;

app.listen(3000, () => {
  console.log(`app running at port:${PORT}`);
});


