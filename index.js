import express from "express"
import bodyParser from "body-parser"
import methodOverride from "method-override";




const app = express();
var port = 3000;
const AllPosts = [];


app.use(methodOverride('_method'));
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));


app.get("/",(req,res)=>{
    res.render("index.ejs");
});

app.get("/posts",(req,res)=>{
    res.render("viewposts.ejs",{AllPosts : AllPosts});
});

app.post("/submit",(req,res) =>{
    const post = req.body.text;
    AllPosts.push(post);
    console.log(post);
    res.redirect("/posts");
});

app.get("/edit", (req,res) => {
    res.render("edit.ejs",{AllPosts:AllPosts});
});

app.post("/edit",(req,res)=>{
    const index = parseInt(req.body.index);
    const newText = req.body.newText;
  
    if (index >= 0 && index < AllPosts.length) {
      AllPosts[index-1] = newText;
      console.log(newText);
      res.redirect("/posts"); // Go back to see the updated list
    } else {
      res.send("Invalid post number.");
    }
});

app.get("/delete", (req, res) => {
    res.render("delete.ejs",{AllPosts:AllPosts})
});


app.post("/delete", (req, res) => {
    const index = parseInt(req.body.index);

    if (index >= 0 && index <= AllPosts.length){
        AllPosts.splice(index-1,1);
        res.redirect("/posts");
    }else{
        res.send("Invalid Post number");
    }
});


app.get("/home",(req,res)=>{
    res.redirect("/");
});

app.get("/about",(req,res)=>{
    res.render("about.ejs");
});


app.get("/contact",(req,res)=>{
res.render("contact.ejs")
});


app.post("/contact",(req,res)=>{
    
    console.log(req.body);
    res.redirect("/contact");
 });
    


app.listen(port, ()=>{
    console.log(`listening on ${port}`);
});
