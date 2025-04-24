/*
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('MERN App is running!');
});

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> console.log("MongoDB connected"))
.catch(err => console.log('Error connecting to MongoDB:', err));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

*/

const express = require("express");
const signupRoute = require("./routes/signup");
const loginRoute = require("./routes/login");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const createAdminAccount = require("./scripts/admin");
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

createAdminAccount();

app.use("/user", signupRoute);
app.use("/auth", loginRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})