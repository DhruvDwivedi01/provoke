const express = require('express')
var bodyParser = require("body-parser");
const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const db_name = 'provoke';
const app = express();
const port = 5000;



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.get('/login.html', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

app.use(bodyParser.urlencoded({
    extended: true
}));
const db = client.db(db_name)
app.post('/', function (req, res) {
   const name =req.body.name
    const email = req.body.email
    
    
    const pass = req.body.password
    var data = {
       
        "name":name,
        "email": email,
        "password": pass,
        
    }
    

    db.collection('Signup').insertOne(data, function (err, collection) {
        if (err) console.log(err)
        else console.log("Record inserted")
    })

})


app.post('/login.html',async(req,res)=>{

    try{
        const login_user=req.body.email
        const password=req.body.password
        const useremail=await db.collection('Signup').findOne({email:login_user});
        if(useremail.password==password){
            console.log("Login Successfully");
            alert('Logged In Successfully')
            res.redirect("/");
            
        }
        else{
            console.log("Invalid Login Details")
            alert('Invalid Login Details')
        }
    }
    catch(error){
             console.log("Invalid login details");
              alert('Invalid Login Details')
             
    }
})

app.listen(5500, () => {
    console.log('Server started on port 5500');
});