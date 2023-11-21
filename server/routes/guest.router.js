const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// Setup a GET route to get all the guest from the database
router.get('/', (req, res) => {
    // When you fetch all things in these GET routes, strongly encourage ORDER BY
    // so that things always come back in a consistent order 
    const sqlText = `SELECT * FROM guests ORDER BY name ASC;`;
    pool.query(sqlText)
        .then((result) => {
            console.log(`Got stuff back from the database`, result.rows);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error making database query ${sqlText}`, error);
            res.sendStatus(500); // Good server always responds
        })
})


// Setup a POST route to add a new guest to the database
router.post('/', (req, res) => {
    const guest = req.body;
    const sqlText = `INSERT INTO guests ("name", "kidsMeal")
                     VALUES ($1, $2)`;
    pool.query(sqlText, [guest.name, guest.kidsMeal])
        .then((result) => {
            console.log(`Added guest to the database`, guest);
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(`Error making database query ${sqlText}`, error);
            res.sendStatus(500); // Good server always responds
        })
})

router.delete('/:id', (req,res) =>{
    const sqlText = `
    DELETE FROM guests
    WHERE "id" = $1`
    const sqlValues = [req.params.id]
    pool.query(sqlText, sqlValues)
        .then((result) => {
            console.log("Deleted guest from database with ID:", req.params.id)
            res.sendStatus(201)
        })
        .catch((error) => {
            console.log(`Error making database query ${sqlText}`, error);
            res.sendStatus(500);
        })
})


module.exports = router;