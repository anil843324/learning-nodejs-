const dbConnect = require("./mongodb");



const insert = async () => {
 
      const db=await dbConnect();

       const result= await db.insert(
          [
               {
                    name:'not 10',
                    brand:"vivo",
                    category:'mobile',
                    quantity:1
               },
               {
                    name:'svmsun 10',
                    brand:"svmsumneg",
                    category:'mobile',
                    quantity:1
               },
               {
                    name:'svmsun 10',
                    brand:"svmsumneg",
                    category:'mobile',
                    quantity:1
               }

          ]
       
       )

     if(result.acknowledged){
           console.log('data inserted');
     }
};

insert();