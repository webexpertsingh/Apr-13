var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'root',
	database: 'ice_creamDB'
});

connection.connect(function(err){
	if(err) throw err;
	console.log("connected as id "+connection.threadId);
});

connection.query("select * from music", function(err, res){
	if(err) throw err;
	console.log(res);
});

connection.query("select * from music", function(err, res){
	if(err) throw err;
	for(var i=0; i< res.length; i++){
		console.log(res[i].id + " | " + res[i].title + " | " + res[i].artist + " | " + res[i].genre);
	}
});