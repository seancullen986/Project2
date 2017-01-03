//done
var express = require('express');
var router = express.Router();
var superhero_dal = require('../model/superhero_dal');
// var supervillain_dal = require('../model/supervillain_dal');


// View All schools
router.get('/all', function(req, res) {
    superhero_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('superhero/superheroViewAll', { 'result':result });
        }
    });

});

// View the superhero for the given id
router.get('/', function(req, res){
    if(req.query.super_id == null) {
        res.send('super ID is null');
    }
    else {
        superhero_dal.getById(req.query.super_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('superhero/superheroViewById', {'result': result});
            }
        });
    }
});

// Return the add a new superhero form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    superhero_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('superhero/superheroAdd', {'superhero': result});
        }
    });
});


// insert a superhero record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.super_name == null) {
        res.send('Superhero Name must be provided.');
    }
    /*else if(req.query.planet_id == null) {
        res.send('An Address must be selected');
    }*/
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        superhero_dal.insert(req.query, function(err,result) {
            if (err) {
                console.log(err)
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/superhero/all');
            }
        });
    }
});

router.get('/edit', function(req, res){
    if(req.query.super_id == null) {
        res.send('A superhero id is required');
    }
    else {
        superhero_dal.edit(req.query.super_id, function(err, result){
            res.render('superhero/superheroUpdate', {superhero: result[0]/*[0]*/});//, address: result[1]});
        });
    }

});

router.get('/edit2', function(req, res){
    if(req.query.super_id == null) {
        res.send('A super id is required');
    }
    else {
        superhero_dal.getById(req.query.super_id, function(err, superhero){
            //planet_dal.getAll(function(err, address) {
                res.render('superhero/superheroUpdate', {superhero: superhero[0]//, planet: planet});
            });
        });
    }

});

router.get('/update', function(req, res){
    superhero_dal.update(req.query, function(err, result){
        res.redirect(302, '/superhero/all');
    });
});

// Delete a superhero for the given school_id
router.get('/delete', function(req, res){
    if(req.query.super_id == null) {
        res.send('super id is null');
    }
    else {
        superhero_dal.delete(req.query.super_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/superhero/all');
            }
        });
    }
});

module.exports = router;
