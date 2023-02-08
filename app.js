const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");


const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use("/public",express.static(__dirname+"/public"));

app.set("view engine","ejs");

let mainJoke ="";


app.get("/",function(req,res){
   res.render("JokePage",{
        jokeLine : mainJoke
   })
});

app.post("/",function(req,res){

     var add1 =req.body.any;                
     var add2 = req.body.dark;
     var add3 = req.body.Programming;
     var add4 = req.body.pun;
     var add5 = req.body.misc;
    
     var remove1 = req.body.religious;
     var remove2 = req.body.political;          
     var remove3 = req.body.racist;
     var remove4 = req.body.sexist;

     var Number1 =Number(req.body.number);  

    
     var addOptions = [add2,add3,add4,add5];
     var removeOptions = [remove1,remove2,remove3,remove4];

     var addExistingOptions = "";
     var blackListOptions = "";
     

     
     if(add1 === "Any"){
        addExistingOptions = add1;
       }
       else{
      for(let i=0;i<4;i++){
        if(addOptions[i] != undefined) {
            if(addExistingOptions === ""){
             addExistingOptions = addOptions[i];
            }
            else{
            addExistingOptions += ","+addOptions[i];
            }
        }
        
      }
    }

     for(let i=0;i<3;i++){
        if(removeOptions[i] != undefined){
            if(blackListOptions === ""){
                blackListOptions = removeOptions[i];
            }
            else{
            blackListOptions += ","+removeOptions[i];
        }
      }
   }

    //  console.log(addExistingOptions);
    //  console.log(blackListOptions);  
    //  console.log(typeof(Number1));
       
     
     var url = "https://v2.jokeapi.dev/joke/"+addExistingOptions+"?blacklistFlags="+blackListOptions+"&type=single"+"&amount="+Number1;

    https.get(url,function(response){

        response.on("data",function(data){
           const jokeData = JSON.parse(data);
           
           const joke = jokeData.joke;

          mainJoke = joke;
          res.redirect("/");
        });
    });
});

app.listen(3000,function(){
    console.log("server is running on port 3000...");
});


