const express = require("express"); 

const v01Router = require("./v01/routes");

const bodyParser = require("body-parser");
const v01TaskRouter = require("./v01/routes/taskRoutes");
const v01UserRouter = require("./v01/routes/userRoutes");

const app = express(); 
const PORT = process.env.PORT || 3000; 

// For testing purposes 
app.get("/", (req, res) => { 
    res.send("<h2>It's Working!</h2>"); 
}); 

app.use("/api/v01", v01Router);

app.use(bodyParser.json());
app.use("/api/v01/tasks", v01TaskRouter);
app.use("/api/v01/users", v01UserRouter);

app.listen(PORT, () => { 
    console.log(`API is listening on port ${PORT}`); 
});