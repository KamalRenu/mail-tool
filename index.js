const express = require('express');
require("dotenv").config();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const userRouter = require("./routes/users");
const mailRouter = require("./routes/mailbox");
PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json())
app.use(cors());

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use("/api/user", userRouter);
app.use("/api/mailer", mailRouter);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(_dirname, '/frontend/build')));

    app.get('*', (req, res) =>{
        res.sendFile(path.resolve(_dirname, 'frontend', 'build', 'index.html'))
    })
} else {
    app.get('/', (req, res) => {
        res.send('API is running');
    })
}

const url = process.env.MONGO_URI;
mongoose.connect(url).then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server is running on ${PORT}`)
    })
}).catch((error)=>{
    console.log(error)
})