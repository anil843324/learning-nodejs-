const dbConnect=require('./mongodb')



const updateData= async()=>{

  let data= await dbConnect();

  let result= await data.updateOne({name:'svmsun 10'} ,{$set:{name:'m40'}})
 
     console.log(result)


}

updateData()