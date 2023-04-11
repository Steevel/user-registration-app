const mongoose = require("mongoose");

const connectToDB = async () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then((con) => {
      console.log(`Connected to ${con.connection.host}`);
    })
    .catch((error) => {
      console.log(error.message);
      process.exit(1);
    });
};

module.exports = connectToDB;
