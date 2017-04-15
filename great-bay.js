var mysql = require('mysql');
var inquirer = require('inquirer');
var choices = [];
var itemNames = "";
var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'root',
	database: 'greatBayDB'
});

connection.connect(function(err){
	if(err) throw err;
	console.log("connected as id "+connection.threadId);
});

var question1 = [
    {
        type:'list',
        name:'action',
        message:'What would you like to do?',
        choices:['Post an Item', 'Bid on an Item']
    }];
   
  var postQuestions =  [
     {
        type:'input',
        name:'name',
        message:'What is the name of the item?'
    },
    {
        type:'input',
        name:'reserve',
        message:'What is the reserve price of the item?'
    },
    {
        type:'input',
        name:'color',
        message:'What is the color of the item?'
    },
    {
        type:'input',
        name:'type',
        message:'What is the type of the item?'
    },
];

// var bidQuestions =  [
//     {

//     }
// ]
 inquirer.prompt(question1).then(function (answers){
    switch (answers.action) {
        case 'Post an Item':
        postItem();
        break;

        case 'Bid on an Item':
        bidItem();
        break;

    }
});

function postItem (){
    inquirer.prompt(postQuestions).then(function (answers){
    	var name = answers.name;
    	var reserve = answers.reserve;
    	var color = answers.color;
    	var type = answers.type;

    	connection.query("INSERT INTO items SET ?", {name:name, reserve:reserve, color:color,type:type}, function(err, res) {
			if(err) throw err;
			console.log("data saved");
		});
    });
}


function bidItem (){
	connection.query("SELECT * FROM items", function(err, res) {
	if(err) throw err;
	
  	for (var i = 0; i < res.length; i++) {
  		//console.log(res[i].name);
    	choices.push(res[i].name);
  	}
  	itemNames = [
    {
        type:'list',
        name:'item',
        message:'Select item to bid',
        choices:choices
    }];
  	inquirer.prompt(itemNames).then(function (answers){
    	var item = answers.item;
    	//console.log("test1----"+item);
    	//console.log(res);
     	connection.query("SELECT * FROM items where ?",{name:item}, function(err, res) {
		 if(err) throw err;
		 //console.log(res[0].name);
		console.log("Name: "+res[0].name + " | Color: " + res[0].color + " | Type: "+res[0].type+ " | Reserve price: " + res[0].reserve +" | High bid: "+res[0].high_bid);
	
     	bidAmount = [
    {
        type:'input',
        name:'newBid',
        message:'What is your bid ?',
        //choices:choices
    }];
    inquirer.prompt(bidAmount).then(function (answers){
    	if(answers.newBid <=  res[0].high_bid){
    		console.log("it's low, Bid again");
    		bidItem();
    	}
    });
    });
    });
});
    
    	//});
}
