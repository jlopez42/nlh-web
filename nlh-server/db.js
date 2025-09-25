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
    const sql = `Select p.id, p.title, p.description, p.location, p.typeId, p.title, pc.startDate, p.status, p.surface,
                    p.quantity, p.floor, p.materiality, p.enclosure, pr.mandatory1, pr.mandatory2, m.name, m.role, pr.contact,
                    pc.publicationDate, pc.startDate, pc.finishDate, pc.offersLimit, pc.asksLimit, pc.responseLimit, p.additionalInfo
                    from projects as p
                    inner join project_types as pt on p.typeId = pt.id
                    inner join project_config as pc on p.id = pc.projectId
                    inner join project_charges as pr on p.id = pr.projectId
                    inner join project_managers as pm on p.id = pm.projectId
                    inner join managers as m on pm.managerId = m.id`;

    db.query(sql, (err, result) => {
        if(err) return res.json({Message: `Error in Node MYSQL:${err.message}`});
        return res.json(result);
    })

});
app.get('/projects/:id', (req, res) => {
    const projectId = req.params.id;
    console.log('Fetching project with ID:', projectId);
    // Use parameterized query to prevent SQL injection
    const sql = `Select p.id, p.title, p.description, p.location, p.typeId, p.title, pc.startDate, p.status, p.surface,
                    p.quantity, p.floor, p.materiality, p.enclosure, pr.mandatory1, pr.mandatory2, m.name, m.role, pr.contact,
                    pc.publicationDate, pc.startDate, pc.finishDate, pc.offersLimit, pc.asksLimit, pc.responseLimit, p.additionalInfo
                    from projects as p
                    inner join project_types as pt on p.typeId = pt.id
                    inner join project_config as pc on p.id = pc.projectId
                    inner join project_charges as pr on p.id = pr.projectId
                    inner join project_managers as pm on p.id = pm.projectId
                    inner join managers as m on pm.managerId = m.id
                where p.id = ?`;
    console.log(sql);
    /*const values = [
        req.body.name,
        req.body.email
    ];*/
    db.query(sql, projectId, (err, result) => {
        if(err) return res.json({Message: `Error in Node MYSQL:${err.message}`});
        return res.json(result);
    })

});

app.listen(process.env.PORT_MYSQL || 8081, () => {
    console.log('====================================');
    console.log('Connecte to the server nlh-server');
    console.log('====================================');   
});