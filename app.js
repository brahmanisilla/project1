const express=require("express");
const bodyParser=require("body-parser");
const https=require("https");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});
app.post("/weather",function(req,res){
  var country=req.body.place;
    var url="https://api.weatherapi.com/v1/current.json?key=f83519d24eb24d0abe5125304212707&q="+country+"&aqi=no/"
    https.get(url,function(response){
      response.on("data",function(data){
        var weatherData=JSON.parse(data);
        
        var city=weatherData.location.name;
        var place=weatherData.location.country;
        var temp=weatherData.current.temp_c;
     
      
        res.write("<h1>the temperture in "+city+","+place+" is "+temp+" degrees </h1> ");
        
      
        res.send();
      });
    });
})

app.post("/sports",function(req,res){
  var country=req.body.place;
    var url="https://api.weatherapi.com/v1/sports.json?key=f83519d24eb24d0abe5125304212707&q="+country+"";
    https.get(url,function(response){
      response.on("data",function(data){
        var sportsdata=JSON.parse(data);

        res.write("<h1>the ongoing sports are"+sportsdata+"+ </h1> ");
        
      
        res.send();
        
        
          
      });
    });
});



app.listen(3000,function(){
  console.log("server is up and running");
});
