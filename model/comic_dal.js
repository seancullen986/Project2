var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

/*
 create or replace view school_view as
 select s.*, a.street, a.zip_code from comic s
 join address a on a.address_id = s.address_id;
 */

exports.getAll = function(callback) {
    var query = 'SELECT * FROM comic;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(brand_id, callback) {
    var query = 'SELECT * FROM comic WHERE brand_id = ?';
    var queryData = [brand_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO comic( brand_name, year_founded ) values (?, ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.brand_name, params.year_founded];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

}

exports.delete = function(brand_id, callback) {
    var query = 'DELETE FROM comic WHERE brand_id = ?';
    var queryData = [brand_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

exports.update = function(params, callback) {
    var query = 'UPDATE comic SET brand_name = ? WHERE brand_id = ?';
    var queryData = [params.brand_name, params.brand_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

/*  Stored procedure used in this example
 DROP PROCEDURE IF EXISTS school_getinfo;

 DELIMITER //
 CREATE PROCEDURE school_getinfo (school_id int)
 BEGIN
 SELECT * FROM comic WHERE school_id = school_id;
 SELECT a.*, school_id FROM address a
 LEFT JOIN comic s on s.address_id = a.address_id;

 END //
 DELIMITER ;

 # Call the Stored Procedure
 CALL school_getinfo (4);

 */

exports.edit = function(brand_id, callback) {
    var query = 'SELECT * from comic WHERE brand_id = ?';
    var queryData = [brand_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};