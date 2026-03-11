
/*const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const dbURI ="mongodb://127.0.0.1:27017/blog_app_db";
    
    await mongoose.connect(dbURI);
    console.log("MongoDB Connected ✅");
  } catch (error) {
    console.error("Connection Error ❌", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;*/


const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const dbURI = "mongodb+srv://onkarkshirsagar2023comp_db_user:Onkar%408625@cluster0.fg4equa.mongodb.net/blog_app_db?retryWrites=true&w=majority";
    
    await mongoose.connect(dbURI);
    console.log("MongoDB Atlas Connected ✅");
  } catch (error) {
    console.error("Connection Error ❌", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;