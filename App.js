const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userSchema = require("./Scheme/userScheme");
const inventoryRouter = require("./routes/inventoryRoutes"); 
const app = express();
const PORT = 5000;
const url = `mongodb+srv://Gowri:vAr7FsLKbd1jYNR5@my-application.nbaf01g.mongodb.net/?retryWrites=true&w=majority&appName=My-Application`;

const User = mongoose.model("User", userSchema);

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());


mongoose.connect(url)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });


app.post("/save", async (req, res) => {
  try {
    const { name, email, mobile, age } = req.body;
    const user = new User({ name, email, mobile, age });

    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (e) {
    console.error("Error creating user", e);
    res.status(500).json({ error: "Error creating user" });
  }
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (e) {
    console.error("Error fetching users", e);
    res.status(500).json({ error: "Error fetching users" });
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
    console.error("Error fetching user by name", e);
    res.status(500).json({ error: "Error fetching user by name" });
  }
});


app.use('/inventory', inventoryRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
