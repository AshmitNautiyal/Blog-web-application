import express from "express";
import bodyParser from "body-parser";
const app  = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let blogs = [];

app.get("/" , (req , res)=>{
      res.render("index.ejs" , {
           blogs: blogs
      });
});

app.get("/create-blog" , (req , res)=>{
    res.render("create.ejs" , {
         
    });

});



app.post("/submit-blog" , (req , res) =>{
    const { author, title, content } = req.body;

    blogs.push({
        author: author,
        title: title,
        content: content
      });

    res.redirect('/'); 
});

app.get("/blog/:id" , (req , res)=>{
    const blogId = req.params.id;
    const blog = blogs[blogId];

    res.render("view.ejs" , {
        blog : blog
    });
})

app.get("/edit-blog/:id", (req, res) => {
    const blogId = req.params.id;
    const blog = blogs[blogId];
  
   
    res.render("edit.ejs", { blog: blog, blogId: blogId });
  });

  app.post("/edit-blog/:id", (req, res) => {
    const blogId = req.params.id;
  
   
    blogs[blogId] = {
      author: req.body.author,
      title: req.body.title,
      content: req.body.content
    };
  
    res.redirect("/"); 
  });

  app.post("/delete-blog/:id", (req, res) => {
    const blogId = req.params.id;
    blogs.splice(blogId, 1);
    res.redirect("/");
  });
  
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });