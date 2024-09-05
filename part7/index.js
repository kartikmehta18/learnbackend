const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  fs.readdir("./files", function (err, files) {
    res.render("index", { files: files });
    // console.log(files);
  });
});

app.get("/files/:filename", function (req, res) {
  fs.readFile(`./files/${req.params.filename}`, "utf-8", function (err, data) {
    if (err) console.log(err.message);
    else res.render("show", { filename: req.params.filename, data: data });
  });
});

app.post("/create", function (req, res) {
  fs.writeFile(
    `./files/${req.body.title.split("").join("")}.txt`,
    ` ${req.body.details}`,
    function (err) {
      if (err) console.log(err.message);
      else res.redirect("/");
    }
  );
});

app.get("/edit/:filename", function (req, res, err) {
  if (err) console.log(err.message);
  res.render("edit", { filename: req.params.filename });
});

app.post("/edit", function (req, res) {
  fs.rename(
    `./files/${req.body.pevname}`,
    `./files/${req.body.newname}`,function (err) {
      res.redirect("/");
    }
  );

  // res.render("edit",{filename: req.params.filename});
});

//edit text
app.get("/edittxt/:filename", function (req, res) {
  fs.readFile(`./files/${req.params.filename}`, "utf-8", function (err, data) {
    console.log(data);
    if (err) console.log(err.message);
    else res.render("edittxt", { filename: req.params.filename, data});
  });

});

app.post("/edittxt/:f_name", function (req, res) {
  let {f_name}=req.params;

  let updatedData = req.body.pevtxt.replace(req.body.pevtxt, req.body.newtxt) 
  fs.writeFile(
    `./files/${f_name}`,
    updatedData,function (err) {
      res.redirect("/");
    }
  );

  // res.render("edit",{filename: req.params.filename});
});



app.listen(3000, function () {
  console.log("server is running on port 3000");
});
