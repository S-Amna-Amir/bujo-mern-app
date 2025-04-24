const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/users_bujo", { useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> console.log("MongoDB connected"))
.catch(err => console.log('Error connecting to MongoDB:', err));

mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDb");
});

mongoose.connection.on("error", (err) => {
    console.log(`MongoDB connection error: ${err}`)
})

module.exports = mongoose;