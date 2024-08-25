let express=require('express')
require('dotenv').config()
let port=process.env.PORT
let cors=require('cors')
let app=express()
let connection=require('./db')
const cookieParser = require('cookie-parser');
 connection()
let product_router=require('./route/Routes')
let userrouter=require('./route/userRoutes')

app.use(cors())

app.use(express.json()

)

app.use(express.urlencoded({ extended: true, limit: "16kb" }))

app.use(cookieParser());   // logout

app.use(express.static('UploadImage'))


app.use('/user',userrouter)
app.use('/product',product_router)
app.get('/',(req,res)=>{
    res.send('Hello world')
});

app.listen(port,()=>{
    console.log(` server is runing on port ${port}`)
})
