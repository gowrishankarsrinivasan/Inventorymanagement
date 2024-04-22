// const mongoose = require("mongoose");
// const userSchema = require("./Scheme/userScheme");
// const url = `mongodb+srv://Gowri:vAr7FsLKbd1jYNR5@my-application.nbaf01g.mongodb.net/?retryWrites=true&w=majority&appName=My-Application`;

// Create a model based on the schema
// const User = mongoose.model("User", userSchema);

// mongoose.connect(url).then(() => {
//   console.log("Connected to Mongoose Server");
//   const newUser = new User({
//     name: "Gowri",
//     email: "gowri@my-application.nbaf01g.mongod",
//     mobile: 753888,
//     age: 20,
//   });
//   newUser
//     .save()
//     .then(() => {
//       console.log("Saved user");
//     })
//     .catch((err) => {
//       console.log("Failed to save user");
//     });
// });

//To reterive data

// const mongoose = require("mongoose");
// const userSchema = require("./Scheme/userScheme");

// const url = `mongodb+srv://Gowri:vAr7FsLKbd1jYNR5@my-application.nbaf01g.mongodb.net/?retryWrites=true&w=majority&appName=My-Application`;

// // Create a model based on the schema
// const User = mongoose.model("User", userSchema);

// mongoose.connect(url).then(() => {
//   console.log("connection established");
//   const user = new User({
//     name: "Gowri Shankar",
//     email: "gowri@gmail.com",
//     mobile: 7538875486,
//     age: 20,
//   });
//   user.save().then(() => {
//     console.log("User Saved");
//   });
//   User.updateOne({name:"Gowri Shankar",email:"@ggmail"}).then((user)=>{
//     console.log("User Fetched",user);
//   })
// //   User.deleteMany({}).then(()=>{
// //     console.log("get");
// //   })
// });

// Assuming you have already established the database connection and defined the User model

// Update a user document
// User.updateOne({ name: "John Doe" }, { age: 35 })
//   .then((result) => {
//     console.log("Update successful:", result);
//   })
//   .catch((err) => {
//     console.error("Error updating user:", err);
//   });

// Assuming you have already established the database connection and defined the User model

// Delete a user document
// User.deleteOne({ name: "John Doe" })
//   .then((result) => {
//     console.log("Deletion successful:", result);
//   })
//   .catch((err) => {
//     console.error("Error deleting user:", err);
//   });

// mongoose.connect(url).then(() => {
//   User.deleteMany({}).then((users) => {
//     console.log("Success", users);
//   });
// });

// mongoose.connect(url).then(() => {
//     User.updateOne({name:"John Doe"},{email:"gowri@gmail.com"}).then((users) => {
//       console.log("Update Success", users);
//     });
//   });

// here's a simpler version of the code that focuses on handling the POST request from Postman and saving the data to MongoDB:

const express = require("express");
const mongoose = require("mongoose");
const userSchema = require("./Scheme/userScheme");
const app = express();
const PORT = 5000;
const url = `mongodb+srv://Gowri:vAr7FsLKbd1jYNR5@my-application.nbaf01g.mongodb.net/?retryWrites=true&w=majority&appName=My-Application`;
const User = mongoose.model("User", userSchema);
const cors = require("cors");
app.use(cors({ origin: "http://localhost:3000" }));
mongoose.connect(url).then(() => {
  console.log("Connected to mongoDB");
});

app.use(express.json());

app.post("/save", async (req, res) => {
  try {
    const { name, email, mobile, age } = req.body;
    const user = new User({
      name,
      email,
      mobile,
      age,
    });

    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (e) {
    console.log("Error creating user", e);
  }
});
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (e) {
    console.log("Error creating user", e);
  }
});

app.get("/users/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const user = await User.findOne({ name: name });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (e) {
    console.log("Error fetching user by name", e);
    res.status(500).json({ error: "Error fetching user by name" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
