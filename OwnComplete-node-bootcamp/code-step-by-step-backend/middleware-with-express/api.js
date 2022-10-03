const express = require("express");
const mongodb=require('mongodb')
const dbConnect = require("./mongodb");

const app = express();



app.use(express.json());

// get method

app.get("/", async (req, res) => {
  let data = await dbConnect();
  data = await data.find().toArray();
  res.send(data);

});

// post method
app.post('/', async (req,res)=>{



    console.log(req.body);

     let data=await dbConnect()

    let result= await data.insert(req.body)

   res.send(result)

})

// put method

app.put('/:name', async (req,res)=>{

 
  let data= await dbConnect();
 
  let result=data.updateOne(
    
       {
         name :req.params.name
       },
       {
          $set:req.body
       }
    )
  res.send({result:"updated"});
})

// delete method 
app.delete('/:id', async (req,res)=>{
 
   console.log(req.params.id);

    const data= await dbConnect();

    const result= await data.deleteOne({_id: new mongodb.ObjectId(req.params.id)})

    res.send(result)


})










app.listen(5000);
