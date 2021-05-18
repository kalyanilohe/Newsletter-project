const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");


const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
	res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req,res){

const firstName=req.body.fName;
const lastName=req.body.lName;
const email=req.body.email;
const port=process.env.PORT || 4000;

const data =
{
 members:[
 {
   email_address: email,
   status: "subscribed",
   merge_fields:
   {
     FNAME:firstName,
     LNAME:lastName
   }
  }
 ]
};

const jsonData = JSON.stringify(data);

const url="https://us17.api.mailchimp.com/3.0/lists/a12186d157";

const options = {
	method : "POST",
	auth : "kalyani:6b9558ea383ee316a41275e071b48520-us17"
}

const request =https.request(url, options, function(response){

	if (response.statusCode===200)
	{
		res.sendFile(__dirname + "/success.html");
	}
	else
	{
		res.sendFile(__dirname + "/failure.html");
	}

response.on("data",function(data){
	console.log(JSON.parse(data));
   })
})

request.write(jsonData);
request.end();
});

app.post("/failure", function(req,res){
	res.redirect("/");
});

app.listen(port, function(){
	console.log("server is running at port 4000");
});


//API KEY

//102da5de98332e0a33092b18e18017dc-us17

//List id
//a12186d157

//https://us17.admin.mailchimp.com/lists/members?id=1070216#p:1-s:25-sa:last_update_time-so:false