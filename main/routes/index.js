var express = require('express');
var router = express.Router();

const fetcher = require('../prisma/fetchPrisma.js');

/* POST home page. */
router.post('/', function(req, res, next) {
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

        default:
            console.log('wrong post request: ' + JSON.stringify(req.body))
    }
    let resp = queryFunction(req.body);
//    res.send(resp)
    resp.then(result => {
        res.send(result)}
     ).catch(result => {
         res.send('Query failed! ' + result)
     })
});

module.exports = router;