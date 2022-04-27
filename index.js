const express = require("express");
const employeeRouter = require('./router/employee');

const registerRouter = require('./router/register');
const productRouter = require('./router/product')
const mongo = require('./shared/connect');
const dotenv = require('dotenv');

const authorize = require('./module/authorize');
const cors = require('cors');

dotenv.config();
const app = express();
// to convert req.body into json format
app.use(cors());
app.use(express.json());
mongo.connect();
mongo.connectMongoose();

app.use('/', (req, res, next) => {
    //Authorization, Authentication
    console.log("Hello middleware");
    next();
});

// app.get('/users', (req,res,next) => {
//     res.send({
//         name:'sathiyapriya',
//         age: 25
//     })
// })

app.use('/register', registerRouter);
app.use(authorize.authenticateToken );

app.use('/employee', employeeRouter);

app.use('/product', productRouter);


app.listen(3002);

// mongodb atlas connection string
// mongodb+srv://Gsathiya:FmAWfKqmHPKxHznc@cluster0.ktemn.mongodb.net/test
// mongodb+srv://Gsathiya:FmAWfKqmHPKxHznc@cluster0.ktemn.mongodb.net/test?retryWrites=true&w=majority


// cors => cross origin resource sharing