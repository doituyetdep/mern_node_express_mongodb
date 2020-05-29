const express=require("express");
const bodyParser=require("body-parser");
const cors=require("cors");
const app=express();
const corsOptions={
    origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
//parse requests of content-type: json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//connect mongodb
const db=require("./app/models");
db.mongoose
.connect(db.url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{
    console.log("Connected to the database");
    
})
.catch((err)=>{
    console.log("Cannot connect to the database");
    process.exit();
});
//Simple Route
app.get("/", function(req, res){
    res.json({message: "Welcome to the MERN Application"});
});
require("./app/routes/tutorial.routes")(app);
//set port, listion for requests
const PORT=process.env.PORT||8080;
app.listen(PORT, function(){
    console.log(`Server is running on port ${PORT}.`);
})