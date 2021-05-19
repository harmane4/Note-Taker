// Dependencies
require(‘dotenv’).config();
const fs = require("fs");
const express = require("express");
const http = require("http");
const path = require("path");

// Sets up Express App
const port = process.env.PORT || 3000;
const app = express();

// Serving Static Files
app.use(express.static("public"));
app.use(express.json());

// Routes
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

// Displays all notes
app.get("/api/notes", (req, res) => {
  // Read db.json file
  fs.readFile("./db/db.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log("File read filed:", err);
      return;
    }
    console.log("File data", jsonString);
    res.json(JSON.parse(jsonString)); // JSON to array
  });
});

// POST
app.post("/api/notes", (req, res) => {
  const newNote = req.body;
  newNote.id = Date.now()
  console.log("newnote", newNote);
  // POST
  fs.readFile("./db/db.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log("File read filed:", err);
      return;
    }
    console.log("File data", jsonString);
    // JSON to array
    var notes = JSON.parse(jsonString); 

    notes.push(newNote);
    // ARRAY back to string
    fs.writeFile("./db/db.json", JSON.stringify(notes), (err) => {
      if (err) throw err;
      return res.end();
    });
  });
});

// Starts the server to begin listening
app.listen(port, () => console.log(`App listening on PORT ${port}`));
