const express = require("express");
const mongoose = require("mongoose");
const addmanage=require('./sever');
const manage = require("./sever");

const app = express();
const port = 3000;
app.use(express.json());

mongoose.connect("mongodb+srv://ravidurgaprasad:ravi123@cluster0.r0fy2wg.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log("failed to connect", err);
  });
  app.post('/addbooks',async(req,res)=>{
    const {title,author,genre}=req.body;
    console.log(req.body)
    try{
        const newdata=new addmanage({title,author,genre});
        await newdata.save();
        const addusers=await addmanage.find();
        return res.send(addusers);
    }
    catch(err){
        console.log(err.message)
    }
  });
  app.get('/getallbooks',async(req,res)=>{
    try{
        const getalldata=await manage.find();
        return res.send(getalldata);
    }
    catch(err){
        console.log(err.message)
    }
  });
  app.put('/updatebook/:id', async (req, res) => {
    const { id } = req.params;
    const { title, author, genre } = req.body;
    try {
      const updatedBook = await manage.findByIdAndUpdate(id, { title, author, genre }, { new: true });
      if (!updatedBook) {
        return res.status(404).json({ error: 'Book not found' });
      }
      return res.json(updatedBook);
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ error: 'Server error' });
    }
  });
  app.delete('/deletebook/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const deletedBook = await manage.findByIdAndDelete(id);
      if (!deletedBook) {
        return res.status(404).json({ error: 'Book not found' });
      }
      return res.json({ message: 'Book deleted successfully' });
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ error: 'Server error' });
    }
  });
app.listen(port, () => {
  console.log("server running on the port", port);
});

