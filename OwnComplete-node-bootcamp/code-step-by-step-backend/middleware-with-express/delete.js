const dbConnect=require('./mongodb')


const deleteData= async()=>{
 
     let data= await dbConnect();

     let result= await data.deleteOne({name:'m40'})
   
      if(result.acknowledged){
        console.log('record deleted');
      }
    
}


// deleteData()