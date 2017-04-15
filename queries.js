var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'root',
	database: 'playlistDB'
});

connection.connect(function(err){
	if(err) throw err;
	console.log("connected as id "+connection.threadId);
});

connection.query("INSERT INTO songs SET ?", {title:"Road", artist:'singh', genre:'hen'}, function(err, res) {
	if(err) throw err;
});

connection.query("update songs set ? where ? and ?",[{title:'rocket'},{id:5},{genre:'hen'}],function(err, res){
	if(err) throw err;
});

connection.query("delete from songs where?",[{id:6}],function(err, res){
	if(err) throw err;
});

connection.query("SELECT * FROM songs", function(err, res) {
	if(err) throw err;
  	for (var i = 0; i < res.length; i++) {
    	console.log(res[i].id + " | " + res[i].title + " | " + res[i].artist + " | " + res[i].genre);
  	}
  	console.log("-----------------------------------");
});