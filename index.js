const express = require('express')
const toDoRouter = require('./Routers/toDoRouter')
const bodyParser = require("body-parser");
const userRouter = require("./Routers/userRouter")
const mongoose = require("mongoose")
const morgan = require("morgan");
const cors = require('cors');
const loginRouter = require('./Routers/authRouter');
var cookieParser = require('cookie-parser');
const verifyToken = require('./Middleware/verifyToken');
const path = require('path');
require('dotenv').config();
const app = express();
const MONGO_URL = process.env.REACT_APP_MONGO_URL
const PORT = process.env.REACT_APP_PORT || 5000

app.use(bodyParser.json({limit: "30mb", extended: "false" }));
app.use(express.static(path.join(__dirname, './build')));
app.use(bodyParser.urlencoded({limit: "30mb", extended: "true" }));
app.use(morgan("tiny"));
app.use(cors());
app.use(cookieParser())
app.use(express.static("public"));

app.use("/auth", loginRouter)
app.use("/user", userRouter)
// app.use(verifyToken)
app.use("/todo",verifyToken, toDoRouter)


app.get('*',(req, res) => {
   res.sendFile(path.join(__dirname, './build', 'index.html'));
});

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then((res, rej) => console.log("Connect successfully!"))
.catch((err) => console.log(err.message));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
 