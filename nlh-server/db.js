import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Momo1982',
    database:'nlh_db'
});

app.get('/projects', (req, res) => {
    const sql = "SELECT * FROM projects";
    /*const values = [
        req.body.name,
        req.body.email
    ];*/
    db.query(sql, (err, result) => {
        if(err) return res.json({Message: `Error in Node MYSQL:${err.message}`});
        return res.json(result);
    })

});

app.listen(8081, () => {
    console.log('====================================');
    console.log('Connecte to the server nlh-server');
    console.log('====================================');
    
    
});