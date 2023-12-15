const express = require('express');
const app = express();
const cors = require('cors');
const ErrorHandeler = require('./middleware/ErrorHandeler');
const colors = require('colors');
const dbConnection = require('./utils/db');
// port
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
dbConnection()


app.get("/",(req,res)=>{
    res.send("Route Is Working!!")
})
// listining to port
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`.yellow.bold);
})
app.all("*", (req, res) => {
    res.send("404 not found")
    })
app.use(ErrorHandeler)