const express = require ('express');
const cors = require ('cors');
//onst axios = require('axios');
const fs = require("fs");
const { send } = require('process');
//var bodyParser = require('body-parser');
const app = express();
const bodyParser = require('body-parser');
const url = require('url');

var corsOptions = {
origin: '*',
Access-Control-Allow-Origin:'*',
methods: "GET,POST, PUT"

}

//app.use(express.json({
//}));
app.use(express.json({limit: '50mb'}));
//app.use(bodyParser.urlencoded([]));
//app.use(bodyParser.json());
//app.use(express.urlencoded());
app.use(cors(corsOptions));


/*
create or update SQL data from remote client
*/
  app.post('/albums/',(req,res) =>{ 

   console.log(req.body);

  //  console.log(req.body.sharedData);
   // for(j =0; j <taulu.length; j++)
   //   console.log("taulu " + req.body.sharedData[j].title + " " + req.body.sharedData[j].photoUrls.length);   // console.log('request ' + JSON.stringify(req.body));
  //  req.json ({
  //      message: `hello ${tulos}`
    res.status(200);
   fs.writeFile('koe_text.txt', JSON.stringify(req.body.sharedData), err =>{
    //fs.writeFile('koe_text.txt', req.body.sharedData, err =>{
      if(err)console.log(`virhe kirjoituksess: ${err}`);
      else console.log("tiedosto kirjoitettu");
    });

    let addr = [];

   

  }
  )

  /*
  return photo urls on specific albums. Album name is given in req.query
  */
 
  app.get('/photos/',cors(),(req,res) => {
    let urlResult = [];
    let albumName = req.query.albumName;
    var data = [];


    fs.readFile('koe_text.txt', 'utf8', function (err, data) {
      if (err) {
          console.error(err)
          throw "unable to read .txt file.";
      }
      try {
        urlResult = searchPhotoUrls(JSON.parse(data), albumName);
    //console.log(obj);
        res.status(200).send(JSON.stringify(urlResult));
      }
      catch{
        res.status(500).send("not found")
      }
  });
  

  })

  function searchPhotoUrls(allAlbums,name){
    console.log(allAlbums.length)
    var value = allAlbums.find(element => element.title == name);
    console.log(value.title,value.photoCount,value.photoUrls.length);
    return value;
  }
    app.listen(8081, () => console.log("kuunnellaan porttia 8081"));
    
    


