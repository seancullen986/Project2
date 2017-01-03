var express = require('express');
var router = express.Router();
// var planet_dal = require('../model/planet_dal');
// var supervillain_dal = require('../model/supervillain_dal');
var planet_dal = require('../model/planet_dal');

// View All schools
router.get('/all', function(req, res) {
    planet_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('planet/planetViewAll', { 'result':result });
        }
    });

});

// View the planet for the given id
router.get('/', function(req, res){
    if(req.query.planet_id == null) {
        res.send('planet_id is null');
    }
    else {
        planet_dal.getById(req.query.planet_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('planet/planetViewById', {'result': result});
            }
        });
    }
});

// Return the add a new planet form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    planet_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('planet/planetAdd', {'planet': result});
        }
    });
});


// insert a planet record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.planet_name == null) {
        res.send('Planet Name must be provided.');
    }
    /*else if(req.query.address_id == null) {
        res.send('An Address must be selected');
    }*/
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        planet_dal.insert(req.query, function(err,result) {
            if (err) {
                console.log(err)
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/planet/all');
            }
        });
    }
});

router.get('/edit', function(req, res){
    if(req.query.planet_id == null) {
        res.send('A planet ID is required');
    }
    else {
        planet_dal.edit(req.query.planet_id, function(err, result){
            res.render('planet/planetUpdate', {planet: result/*[0]*/[0]});//, address: result[1]});
        });
    }

});

router.get('/edit2', function(req, res){
    if(req.query.planet_id == null) {
        res.send('A planet ID is required');
    }
    else {
        planet_dal.getById(req.query.planet_id, function(err, planet){
            //address_dal.getAll(function(err, address) {
                res.render('planet/planetUpdate', {planet: planet[0]});//, address: address});
            //});
        });
    }

});

router.get('/update', function(req, res){
    planet_dal.update(req.query, function(err, result){
        res.redirect(302, '/planet/all');
    });
});


// Delete a planet for the given planet_id
router.get('/delete', function(req, res){
    if(req.query.planet_id == null) {
        res.send('planet ID is null');
    }
    else {
        planet_dal.delete(req.query.planet_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/planet/all');
            }
        });
    }
});

module.exports = router;
