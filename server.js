const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const app = express();

const user = require("./routes/api/user");

const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("Mongo is listening"))
  .catch(err => console.log("Shit's fucked", err));

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Use routes
app.use("/api/user", user);

const port = process.env.PORT || 5000;

app.get("/", (req, res) => res.send("Hello World"));

app.listen(port, () => console.log(`Server listening on port ${port}`));