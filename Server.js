const mongoose = require("mongoose");
const express = require("express");
const app = express();

app.use(express.json());

const url = `mongodb+srv://Gowri:vAr7FsLKbd1jYNR5@my-application.nbaf01g.mongodb.net/?retryWrites=true&w=majority&appName=My-Application`;

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

app.get('/', (req, res) => {
  res.send('Hello, world');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
