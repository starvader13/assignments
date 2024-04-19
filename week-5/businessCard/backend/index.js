const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { cardRoutes } = require("./routes/server");

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
}));

app.use("/api", cardRoutes);

app.get("/*",(req, res)=>{
    res.status(404).json({
        msg: "Route not defined"
    })
})

app.listen(port, ()=>{
    console.log(`Server is listening at PORT ${port}`)
});