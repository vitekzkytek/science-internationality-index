var express = require('express');
var router = express.Router();

const fetcher = require('../prisma/fetchPrisma.js');


const pgres = require('../routes/postgres.js');


//
// const client = new Client({
//     connectionString: connectionString,
// });


// function getCountries(request, response) {
//     //await db.query('SELECT * FROM users WHERE id = $1', [id])
//     client.query('select i.country_code, i.value, c.name from interindex i\n' +
//         'inner join country c on c.country_code = i.country_code\n' +
//         'where i.method_code = \'euclid\' and i.field_code = \'All\' and i.period = 2017 and c.type = \'country\'', (error, results) => {
//
//         if (error) {
//             throw error
//         }
//         response.status(200).json(results.rows);
//         client.end();
//
//     })
// };
//
//

router.post('/map',function (req,res,next) {
    let quer = 'select i.country_code, i.value, c.name from interindex i \n' +
        'inner join country c on c.country_code = i.country_code \n' +
        'where i.method_code = $1 and i.field_code = $2 and i.period = $3 and c.type = \'country\'';

    let resp = pgres.query(quer, [req.body.method_code,req.body.field_code,req.body.period]);
    resp.then(result => {
        res.send(result)}
    ).catch(result => {
        res.send('Map Query failed! ' + result)
    })
});



/* POST home page. */
router.post('/prisma', function(req, res, next) {
    let queryFunction;

    switch (req.body.id) {
        case 'queryInterindex':
            queryFunction = fetcher.queryInterindex;
            break;

        case 'queryFields':
            queryFunction = fetcher.queryFields;
            break;

        case 'queryCountries':
            queryFunction = fetcher.queryCountries;
            break;

        case 'queryMethods':
            queryFunction = fetcher.queryMethods;
            break;

        // case 'queryMap':
        //     const { reqbody } = req.body;
        //     queryFunction = pgres.query('SELECT * FROM country', [reqbody]);
        //     break;
        default:
            console.log('wrong post request: ' + JSON.stringify(req.body))
    }
    let resp = queryFunction(req.body);
    resp.then(result => {
        res.send(result)}
     ).catch(result => {
         res.send('Query failed! ' + result)
     })
});

module.exports = router;