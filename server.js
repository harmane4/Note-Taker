// Dependencies 
const fs = require("fs");
const express = require("express");
const http = require("http");
const path = require("path");

// Sets up Express App
const PORT = 1000; 
const app = express();

// Starts the server to begin listening 

app.listen(PORT, () =>
console.log(`App listening on PORT ${PORT}`));