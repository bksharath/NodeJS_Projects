import express from 'express';
import {promises as fs} from 'fs';

let app = express();

app.listen(3001,()=>{
    console.log("Server is listenning on port 3001");
    });


app.get('/books',(req,res)=>{
   res.send("Hello books");
});

app.get('/books/:id',async (req,res)=>{
    var data = await fs.readFile(__dirname + '/books.json');
    var { id } = req.params;
    let books = JSON.parse(data);
    var book = books.find(x => x.id === id);

    res.json(book);

});

app.get('/books-fs',async (req,res)=>{
      let data = await fs.readFile(__dirname + '/books.json');
      let books = JSON.parse(data);

      res.json(books);

})
