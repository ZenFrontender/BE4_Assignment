const express = require('express')
const app = express();
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
const {initializeDatabase} = require('./db/db.connect');
const Book = require("./models/book.models")

initializeDatabase();

const addBookToDb = async(reqBody)=>{
    try{
        const book = new Book(reqBody);
    const saveBook = await book.save();
        if(!saveBook){;
            console.log("Error in adding book");
        }
        else{
            return saveBook;
        }
    }
    catch(error){
        console.log("Error in adding book");
        }
        
    }



app.post('/books', async (req, res)=>{
    try{
        const newBook = await addBookToDb(req.body);
        if(newBook){
            res.status(200).json({message: "Book has been successfully saved to DB", book: newBook})
        }
        else{
             res.status(400).json({error: "an error occurred while saving book"})
        }
    }
    catch(error){
        res.status(500).json({error: "an error occurred while saving book"})
    }
    

});


const getBooksFromDb = async()=>{
    try{
       
    const books = await Book.find();
    console.log(books);
    
        if(!books){;
            console.log("Error in retreiving books");
        }
        else{
            console.log(books);
            
            return books;
        }
    }
    catch(error){
        console.log("Error in retreiving books");
        }
        
    }



app.get('/books', async (req, res)=>{
    try{
        const books = await getBooksFromDb();
        if(books){
            res.status(200).json({Books: books})
        }
        else{
             res.status(400).json({error: "an error occurred while retreiving books"})
        }
    }
    catch(error){
        res.status(500).json({error: "an error occurred while retreiving books"})
    }
    

})



const getBookFromDb = async(bookTitle)=>{
    try{
       
    const book = await Book.findOne({ title: bookTitle });
    
    
        if(!book){;
            console.log("Error in retreiving books");
        }
        else{
            console.log(book);
            
            return book;
        }
    }
    catch(error){
        console.log("Error in retreiving books");
        }
        
    }



app.get('/books/:title', async (req, res)=>{
    try{
        const book = await getBookFromDb(req.params.title);
        if(book){
            res.status(200).json({Book: book})
        }
        else{
             res.status(400).json({error: "an error occurred while retreiving book"})
        }
    }
    catch(error){
        res.status(500).json({error: "an error occurred while retreiving book"})
    }
    

})


const getBookFromDbByAuthor = async(bookAuthor)=>{
    try{
       
    const books = await Book.find({ author: bookAuthor });
    console.log(books);
    
    
        if(!books){;
            console.log("Error in retreiving books");
        }
        else{
            console.log(books);
            
            return books;
        }
    }
    catch(error){
        console.log("Error in retreiving books");
        }
        
    }



app.get('/books/author/:author', async (req, res)=>{
    try{
        const books = await getBookFromDbByAuthor(req.params.author);
        if(books){
            res.status(200).json({Books: books})
        }
        else{
             res.status(400).json({error: "an error occurred while retreiving books"})
        }
    }
    catch(error){
        res.status(500).json({error: "an error occurred while retreiving books"})
    }
    

})


const getBookFromDbByGenre = async(bookGenre)=>{
    try{
       
    const books = await Book.find({ genre: bookGenre });
    console.log(books);
    
    
        if(!books){;
            console.log("Error in retreiving books");
        }
        else{
            console.log(books);
            
            return books;
        }
    }
    catch(error){
        console.log("Error in retreiving books");
        }
        
    }



app.get('/books/genre/:genre', async (req, res)=>{
    try{
        const books = await getBookFromDbByGenre(req.params.genre);
        if(books){
            res.status(200).json({Books: books})
        }
        else{
             res.status(400).json({error: "an error occurred while retreiving books"})
        }
    }
    catch(error){
        res.status(500).json({error: "an error occurred while retreiving books"})
    }
    

})


const getBookFromDbByReleasedYear = async(bookReleasedYear)=>{
    try{
       
    const books = await Book.find({ publishedYear: bookReleasedYear });
    console.log(books);
    
    
        if(!books){;
            console.log("Error in retreiving books");
        }
        else{
            console.log(books);
            
            return books;
        }
    }
    catch(error){
        console.log("Error in retreiving books");
        }
        
    }



app.get('/books/publishedYear/:releasedYear', async (req, res)=>{
    try{
        const books = await getBookFromDbByReleasedYear(req.params.releasedYear);
        if(books){
            res.status(200).json({Books: books})
        }
        else{
             res.status(400).json({error: "an error occurred while retreiving books"})
        }
    }
    catch(error){
        res.status(500).json({error: "an error occurred while retreiving books"})
    }
    

})


const updatedBookRating = async(bookId, dataToUpdate)=>{
    try{
       
    const books = await Book.findByIdAndUpdate({ _id: bookId }, dataToUpdate, {new: true});
    console.log(books);
    
    
        if(!books){;
            console.log("Error in updating books");
        }
        else{
            console.log(books);
            
            return books;
        }
    }
    catch(error){
        console.log("Error in updating books");
        }
        
    }



app.post('/books/updateRating/:id', async (req, res)=>{
    try{
        const books = await updatedBookRating(req.params.id, req.body);
        if(books){
            res.status(200).json({Books: books})
        }
        else{
             res.status(400).json({error: "an error occurred while updating books"})
        }
    }
    catch(error){
        res.status(500).json({error: "an error occurred while updating books"})
    }
    

})


const updatedBookRatingFindByTitle = async(bookTitle, dataToUpdate)=>{
    try{
       
    const books = await Book.findOneAndUpdate({ title: bookTitle }, dataToUpdate, {new: true});
    console.log(books);
    
    
        if(!books){;
            console.log("Error in updating books");
        }
        else{
            console.log(books);
            
            return books;
        }
    }
    catch(error){
        console.log("Error in updating books");
        }
        
    }



app.post('/books/updateRating/title/:title', async (req, res)=>{
    try{
        const books = await updatedBookRatingFindByTitle(req.params.title, req.body);
        if(books){
            res.status(200).json({Books: books})
        }
        else{
             res.status(400).json({error: "an error occurred while updating books"})
        }
    }
    catch(error){
        res.status(500).json({error: "an error occurred while updating books"})
    }
    

});

const deleteBookFromDb = async(bookId) =>{
    try{

    
    const deletedBook = await Book.findOneAndDelete({_id: bookId }, {new: true});

    if(!deletedBook){;
            console.log("Error in updating books");
        }
        else{
            console.log(deletedBook);
            
            return deletedBook;
        }
    }

    catch(error){
        console.log("Error in updating books");
        }

}


app.delete('/books/deleteBook/:id', async(req, res)=>{
    try{
        const deletedBook = await deleteBookFromDb(req.params.id)
        if(deletedBook){
            res.status(200).json({Book: deletedBook})
        }
        else{
             res.status(400).json({error: "an error occurred while deleting books"})
        }
    }
    catch(error){
        res.status(500).json({error: "an error occurred while deleting books"})
    }
    
})



const PORT = 3000;

app.listen(PORT, ()=>{
    console.log("Server is running and listening at port", PORT);
    
})




