// Dependencies 
const fs = require("fs");
const express = require("express");
const http = require("http");
const path = require("path");

// Sets up Express App
const PORT = 1000; 
const app = express();

// Serving Static Files 
app.use(express.static("public"));

// Routes 
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "/public/index.html")));

app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "/public/notes.html")));

// Displays all notes 
app.get("/api/notes", (req, res) => res.json(notes));



// Starts the server to begin listening 

app.listen(PORT, () =>
console.log(`App listening on PORT ${PORT}`));