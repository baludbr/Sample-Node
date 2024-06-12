const express = require("express")
const dotenv = require('dotenv');
const mongoose=require("mongoose")
const bodyParser=require("body-parser")
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const empRoute=require("./routes/AuthenticationRoutes")


const app=express()
dotenv.config()

const options = {
    swaggerDefinition: {
        info: {
            title: 'Employee',
            version: '1.0.0',
            description: 'Description of your API',
        },
    },
    apis: ['./routes/AuthenticationRoutes.js'], // Path to the API routes
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));



app.use(bodyParser.json())

mongoose.connect(process.env.MONGO_URI).then((req,res)=>{
    console.log("DB Connected")
}).catch((err)=>{
    console.log(err)
})
const port=process.env.PORT || 3000


app.use("/emp",empRoute)

app.listen(port,(req,res)=>{
    console.log("Server Started")
})