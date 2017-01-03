var express = require('express');
var router = express.Router();
var comic_dal = require('../model/comic_dal');
// var supervillain_dal = require('../model/supervillain_dal');


// View All schools
router.get('/all', function(req, res) {
    comic_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('comic/comicViewAll', { 'result':result });
        }
    });

});

// View the comic for the given id
router.get('/', function(req, res){
    if(req.query.brand_id == null) {
        res.send('brand_id is null');
    }
    else {
        comic_dal.getById(req.query.brand_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('comic/comicViewById', {'result': result});
            }
        });
    }
});

// Return the add a new comic form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    comic_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('comic/comicAdd', {'comic': result});
        }
    });
});


// insert a comic record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.brand_name == null) {
        res.send('Brand Name must be provided.');
    }
    /*else if(req.query.address_id == null) {
        res.send('An Address must be selected');
    }*/
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        comic_dal.insert(req.query, function(err,result) {
            if (err) {
                console.log(err)
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/comic/all');
            }
        });
    }
});

router.get('/edit', function(req, res){
    if(req.query.brand_id == null) {
        res.send('A comic id is required');
    }
    else {
        comic_dal.edit(req.query.brand_id, function(err, result){
            res.render('comic/comicUpdate', {comic: result/*[0]*/[0]});//, address: result[1]});
        });
    }

});

router.get('/edit2', function(req, res){
    if(req.query.brand_id == null) {
        res.send('A comic id is required');
    }
    else {
        comic_dal.getById(req.query.brand_id, function(err, comic){
            //address_dal.getAll(function(err, address) {
                res.render('comic/comicUpdate', {comic: comic[0]});//, address: address});
            //});
        });
    }

});

router.get('/update', function(req, res){
    comic_dal.update(req.query, function(err, result){
        res.redirect(302, '/comic/all');
    });
});

// Delete a comic for the given brand_id
router.get('/delete', function(req, res){
    if(req.query.brand_id == null) {
        res.send('comic ID is null');
    }
    else {
        comic_dal.delete(req.query.brand_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/comic/all');
            }
        });
    }
});

module.exports = router;
