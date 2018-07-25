require("dotenv").config();

module.exports = {
  mongoURI: process.env.MONGODB_DEV,
  secretOrKey: process.env.SECRET
}