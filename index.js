import bodyParser from "body-parser";
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
var isAuthorizedUser = false;

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended : true}));

function sceretAccess(req,res,next){
    const password = req.body["password"];
    console.log(req.body);
    if(password === "SecretWay"){
        isAuthorizedUser = true;
    }
    next();
}

app.get("/",(req,res)=>{
    res.sendFile( __dirname + "/public/index.html");
})

app.use(sceretAccess);

app.post("/check",(req,res)=>{
    if(isAuthorizedUser){
        res.sendFile( __dirname + "/public/secret.html");
    }
    else{
        res.sendFile( __dirname + "/public/index.html");
    }
});

app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
});