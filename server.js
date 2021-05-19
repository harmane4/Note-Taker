// Dependencies
require("dotenv").config();
const fs = require("fs");
const express = require("express");
const http = require("http");
const path = require("path");
const { response } = require("express");

// Sets up Express App
const port = process.env.PORT || 3000;
const app = express();

// Serving Static Files
app.use(express.static("public"));
app.use(express.json());

// Routes
app.get("/", (request, response) =>
  response.sendFile(path.join(__dirname, "/public/index.html"))
);

app.get("/notes", (request, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

// Displays all notes
app.get("/api/notes", (request, response) => {
  // Read db.json file
  fs.readFile("./db/db.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log("File read filed:", err);
      return;
    }
    response.json(JSON.parse(jsonString)); // JSON to array
  });
});

// POST
app.post("/api/notes", (request, response) => {
  const newNote = request.body;
  newNote.id = Date.now()
  // POST
  fs.readFile("./db/db.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log("File read filed:", err);
      return;
    }
    console.log("File data", jsonString);
    // JSON to array
    let notes = JSON.parse(jsonString); 

    notes.push(newNote);
    // ARRAY back to string
    fs.writeFile("./db/db.json", JSON.stringify(notes), (err) => {
      if (err) throw err;
      return response.end();
    });
  });
});

// DELETE 
// app.delete("/api/notes/:id" , (request, response) => {
//   fs.readFile("./db/db.json", "utf8", (err, jsonString) => {
//     if (err) {
//       console.log("File read filed:", err);
//       return;
//     }
//     let newNote = JSON.parse(jsonString);
//     // delete note here
//     fs.writeFile("./db/db.json", JSON.stringify(newNote), (err) => {
//       if (err) throw err;
//     });
//     response.send("DELETE Request Called")
// });
// });

// Starts the server to begin listening
app.listen(port, () => console.log(`App listening on PORT ${port}`));
