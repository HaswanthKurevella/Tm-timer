import express from 'express';
import cors from 'cors';
import { db, connectToDB } from "./db.js";
const app = express();
app.use(express.json())
app.use(cors());
app.get('/', (req, res) => {
    res.send("server running successfully")
})
app.get('/members', async (req, res) => {
    const details = await db.collection('members').find().toArray();
    res.json(details);
});
app.get('/reports',async (req, res) => {
    const details = await db.collection('reports').find().toArray()
    res.json(details);  
    
})
app.post('/saveresult/:name/:date/:time/:type', async (req, res) => {
    const details=await db.collection('reports').insertOne(
        {Name:req.params.name,
        Time:req.params.time,
        Date:req.params.date,
        SpeechType:req.params.type
        }
    );
    res.json(details);
});
app.get('/reports', async (req, res) => {
    const details = await db.collection('reports').find().toArray();
    res.json(details);
});

connectToDB(() => {
    app.listen(8000, () => {
        console.log("server Running At Port 8000")
    })
})