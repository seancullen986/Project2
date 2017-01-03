var express = require('express');
var router = express.Router();
var superhero_dal = require('../model/superhero_dal');
var supervillain_dal = require('../model/supervillain_dal');


// View All schools
router.get('/all', function(req, res) {
    supervillain_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('supervillain/supervillainViewAll', { 'result':result });
        }
    });

});

// View the supervillain for the given id
router.get('/', function(req, res){
    if(req.query.villain_id == null) {
        res.send('villain_id is null');
    }
    else {
        supervillain_dal.getById(req.query.villain_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('supervillain/supervillainViewById', {'result': result});
            }
        });
    }
});

// Return the add a new supervillain form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    supervillain_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('supervillain/supervillainAdd', {'supervillain': result});
        }
    });
});


// insert a supervillain record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.villain_name == null) {
        res.send('Supervillain Name must be provided.');
    }
    /*else if(req.query.address_id == null) {
        res.send('An Address must be selected');
    }*/
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        supervillain_dal.insert(req.query, function(err,result) {
            if (err) {
                console.log(err)
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/supervillain/all');
            }
        });
    }
});

router.get('/edit', function(req, res){
    if(req.query.villain_id == null) {
        res.send('A Villain id is required');
    }
    else {
        supervillain_dal.edit(req.query.villain_id, function(err, result){
            res.render('supervillain/supervillainUpdate', {supervillain: result/*[0]*/[0]});//, address: result[1]});
        });
    }

});

router.get('/edit2', function(req, res){
    if(req.query.villain_id == null) {
        res.send('A villain id is required');
    }
    else {
        supervillain_dal.getById(req.query.villain_id, function(err, supervillain){
            //address_dal.getAll(function(err, address) {
                res.render('supervillain/supervillainUpdate', {supervillain: supervillain[0]});//, address: address});
            //});
        });
    }

});

router.get('/update', function(req, res){
    superhero_dal.update(req.query, function(err, result){
        res.redirect(302, '/supervillain/all');
    });
});

// Delete a supervillain for the given school_id
router.get('/delete', function(req, res){
    if(req.query.villain_id == null) {
        res.send('villain id is null');
    }
    else {
        supervillain_dal.delete(req.query.villain_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/supervillain/all');
            }
        });
    }
});

module.exports = router;
