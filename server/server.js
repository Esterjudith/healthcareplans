const express = require("express");
const app = express();
const PORT = 8080;
const plansData = require("./data")

app.get("/api/home", (req, res) => {
    res.json(plansData)
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)  
})