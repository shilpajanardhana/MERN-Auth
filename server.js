const express = require("express");
const mongoose = require("mongoose");
//  const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require('cors')

const users = require("./routes/api/users");

const app = express();

// Bodyparser middleware
//  app.use(
//    bodyParser.urlencoded({
//      extended: false
//        })
//  );
 app.use(express.json());
// DB Config

const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true}
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err=>{
    console.log(`db error ${err.message}`);
    process.exit(-1)
  })

  // Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);
app.use(cors());


// const port = process.env.PORT || 8000; // process.env.port is Heroku's port if you choose to deploy the app there
// app.listen(port, () => console.log(`Server up and running on port ${port} !`));

app.listen(4000, () => console.log("server is up and running "))