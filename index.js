const { MongoClient, ServerApiVersion, ObjectId  } = require('mongodb');
const express = require('express');
const app = express()
const cors = require('cors');
const port = process.env.PORT || 4000;

//midlleware 
app.use(cors());
app.use(express.json());

//oRbNMguD5e6wsQHv 
//to_do_list

const uri = "mongodb+srv://to_do_list:oRbNMguD5e6wsQHv@cluster0.4p16v.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 }); 
//  console.log(client);

async function run(){
    try{
        await client.connect();
        const toDoCollection =client.db("toDoLIst").collection("list");

        // Get Data
        app.get('/toDoList',async(req,res)=>{
            const query = {};
            const cursor = toDoCollection.find(query);
            const todo = await cursor.toArray();
            res.send(todo);
        })

        //Post Data

        app.post('/toDoList',async (req,res)=>{
            const newCollection= req.body;
            const result = await toDoCollection.insertOne(newCollection);
            res.send(result);
    
        })

            // delete Data 
            app.delete('/toDoList/:id', async (req,res)=>{
                const id = req.params.id;
                const query ={_id: ObjectId(id)};
                const deleteItem = await toDoCollection.deleteOne(query);
                res.send(deleteItem);
            })

           
    

    

    }
    finally{
        
    }

}

run().catch(console.dir);


app.get('/',(req,res)=>{
    res.send('todo list is running and waiting for you')
})


app.listen(port,()=>{
    console.log('john is running in runnig ',port);
})




// after porcees 

/* 
const express = require('express');
const app = express()
const cors = require('cors');
const port = process.env.PORT || 5000;

const { MongoClient, ServerApiVersion } = require('mongodb');


//midlleware 
app.use(cors());
app.use(express.json());

//================Connet to Cluster============== 


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.8c3ja.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{

    }
    finally{
        
    }

}

run().catch(console.dir);


//==============================================


app.get('/',(req,res)=>{
    res.send('john is running and waiting for you')
})


app.listen(port,()=>{
    console.log('john is running in runnig ',port);
})


*/