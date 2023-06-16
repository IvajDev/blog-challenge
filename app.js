import express, { request } from "express";
import "dotenv/config";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import _ from "lodash";
import connectDB from "./dbConn/db-connection.js"
import Entrance from "./models/post-schema.js"

const app = express();
const port = process.env.PORT || 3000;

//Connection to MongoDB calling the connection function in /dbConn.js
connectDB();

const homeStartingContent =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricies maximus nisl, vitae pulvinar metus efficitur at. Praesent id gravida velit. Pellentesque risus lacus, rhoncus vitae urna sit amet, accumsan congue leo. Phasellus bibendum odio ac felis commodo iaculis. Mauris pulvinar dui sit amet nisl facilisis, at tincidunt neque facilisis.";

const aboutContent =
  "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum volutpat, urna vitae eleifend imperdiet, mauris eros interdum enim, ac bibendum ligula magna ac nibh. Cras eget tempus arcu. Integer lorem nibh, vulputate eget mollis eget, laoreet eu risus. In augue tellus, luctus sit amet interdum et, finibus et augue. Nullam maximus tortor in neque scelerisque feugiat.";

const contactContent =
  "Aenean auctor lobortis ligula id posuere. Ut mollis consequat odio, eu consectetur diam rhoncus et. Fusce dapibus orci at nulla lobortis congue. Maecenas ultrices purus id ipsum mattis, in vulputate nulla rhoncus. Fusce ornare urna sit amet vehicula tincidunt. Curabitur facilisis posuere euismod. Proin convallis, sapien vitae imperdiet tincidunt, ligula lacus fermentum elit, id rhoncus arcu arcu id elit. Integer lacus eros, commodo id dolor eget, tempus efficitur nisi. Phasellus accumsan dapibus risus, in cursus nibh vehicula ac.";


let gloObjArr = [];

app.use(express.static("public"));

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  
  Entrance.find({})
    .then((documentsFounded) => {
      /* console.log(documentsFounded); */
      res.render("home", { ipsumHome: homeStartingContent, homeObjArr: documentsFounded });
    })
    .catch((error) => {
      console.log(error);
    });

});

app.get("/contact", (req, res) => {
  res.render("contact", { ipsumContact: contactContent });
});

app.get("/about", (req, res) => {
  res.render("about", { ipsumAbout: aboutContent });
});

app.get("/compose", (req, res) => {
res.render("compose");
});

app.get("/post/:_id", (req,res) => {

const requestedPost = req.params._id;

      Entrance.findOne({_id: requestedPost})
        .then((searchTitle) => {
            /* console.log(requestedPost); */
            res.render("post", {
                title: searchTitle.title,
                body: searchTitle.body,
              });
            
        })
        .catch((error) => {
          console.log(error);
        });
});

app.post("/compose", (req, res)=>{

  const postObj = {
    titleComp: req.body.titleComp,
    postComp: req.body.postComp,
  };

  const addPost = Entrance.create({title: `${postObj.titleComp}`, body: `${postObj.postComp}`});

  res.redirect("/");
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB.");
  app.listen(port, function () {
    console.log(`Server running on port ${port}`);
  });
});
