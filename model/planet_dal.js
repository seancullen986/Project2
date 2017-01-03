var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

/*
 create or replace view school_view as
 select s.*, a.street, a.zip_code from planet s
 join address a on a.address_id = s.address_id;
 */

exports.getAll = function(callback) {
    var query = 'SELECT * FROM planet;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(planet_id, callback) {
    var query = 'SELECT * FROM planet WHERE planet_id = ?';
    var queryData = [planet_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO planet( planet_name ) values (?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.planet_name];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

}

exports.delete = function(planet_id, callback) {
    var query = 'DELETE FROM planet WHERE planet_id = ?';
    var queryData = [planet_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

exports.update = function(params, callback) {
    var query = 'UPDATE planet SET planet_name = ? WHERE planet_id = ?';
    var queryData = [params.planet_name, params.planet_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

/*  Stored procedure used in this example
 DROP PROCEDURE IF EXISTS school_getinfo;

 DELIMITER //
 CREATE PROCEDURE school_getinfo (school_id int)
 BEGIN
 SELECT * FROM planet WHERE school_id = school_id;
 SELECT a.*, school_id FROM address a
 LEFT JOIN planet s on s.address_id = a.address_id;

 END //
 DELIMITER ;

 # Call the Stored Procedure
 CALL school_getinfo (4);

 */

exports.edit = function(planet_id, callback) {
    var query = 'SELECT * from planet WHERE planet_id = ?';
    var queryData = [planet_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.edit2 = function(planet_id, callback) {
    var query = 'SELECT * from planet WHERE planet_id = ?';
    var queryData = [planet_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};