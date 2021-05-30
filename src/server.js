import express from 'express';
import {promises as fs} from 'fs';
import bodyParser from 'body-parser';

let app = express();
app.use(bodyParser.json());

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

app.post('/books',async (req,res)=>{
   let newBook = req.body;

   var data = await fs.readFile(__dirname + '/books.json');

   var newData = JSON.parse(data);
    
   newData.push(newBook);

   var stringData = JSON.stringify(newData);
   
   await fs.writeFile(__dirname + '/books.json',stringData);
   res.json(newData);


});      


app.get('/books-fs',async (req,res)=>{
      let data = await fs.readFile(__dirname + '/books.json');
      let books = JSON.parse(data);

      res.json(books);

})
