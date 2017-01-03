var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

/*
 create or replace view school_view as
 select s.*, a.street, a.zipcode from superhero s
 join address a on a.address_id = s.address_id;
 */

exports.getAll = function(callback) {
    var query = 'SELECT * FROM superherogetinfo;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(super_id, callback) {
    var query = 'select * FROM superherogetinfo WHERE super_id = ?';
    var queryData = [super_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO superhero( super_name, secret_identity, weakness, superpower, love_interest , gender, sidekick, cape ) values (?,?,?,?,?,?,?,?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.super_name, params.secret_identity, params.weakness, params.superpower, params.love_interest , params.gender, params.sidekick, params.cape];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

}

exports.delete = function(super_id, callback) {
    var query = 'DELETE FROM superhero WHERE super_id = ?';
    var queryData = [super_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

exports.update = function(params, callback) {
    var query = 'UPDATE superhero SET super_name = ?, secret_identity = ?, weakness = ?, superpower = ?, love_interest  = ?, gender = ?, sidekick = ?, cape = ? WHERE super_id = ? ';
    var queryData = [params.super_name, params.secret_identity, params.weakness, params.superpower, params.love_interest , params.gender, params.sidekick, params.cape, params.super_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

/*  Stored procedure used in this example
 DROP PROCEDURE IF EXISTS school_getinfo;

 DELIMITER //
 CREATE PROCEDURE school_getinfo (school_id int)
 BEGIN
 SELECT * FROM superhero WHERE school_id = school_id;
 SELECT a.*, school_id FROM address a
 LEFT JOIN superhero s on s.address_id = a.address_id;

 END //
 DELIMITER ;

 # Call the Stored Procedure
 CALL school_getinfo (4);

 */

exports.edit = function(super_id, callback) {
    var query = 'SELECT * from superhero WHERE super_id = ?';
    var queryData = [super_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};