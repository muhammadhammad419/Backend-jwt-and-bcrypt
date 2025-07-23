const express = require("express");
const contactRoutes = require("./src/routes/contact.Routes.js")
const app = express();
require("dotenv").config();
const port = parseInt(process.env.PORT, 10) || 3000;

app.use("/api/contact" , contactRoutes);

app.listen(port , () => {
    console.log(`Server is running on port ${port}`)
})