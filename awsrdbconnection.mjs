import mysql from 'mysql'

import './loadEnv.mjs'
var connection = mysql.createConnection({
    host: process.env.RDS_HOSTNAME,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    port: process.env.RDS_PORT
});


connection.connect(function (err) {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});

connection.query('USE bioattendancesysdb',function(err,result){
    if(err) throw err;
    // console.log(result)
});
connection.query('SHOW TABLES',function(err,result){
    if(err) throw err;
    console.log(result)
});

connection.query('SELECT * FROM Course',function(err,result){
    if(err) throw err;
    console.log(result)
});

connection.end()