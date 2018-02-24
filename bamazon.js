var mysql = require("mysql");
var inquire = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: 3306,
  password: '',
  database: "bamazon"
});

connection.connect(function(err, res) {
  if (err) throw err; 
  console.log("connected as id " + connection.threadId);
  
  showComics();
});

function stop() {
	connection.end();
}

function showComics() {
	connection.query("Select id, comic_name, price FROM comics", function(err, res){
		console.log("\nListed below are the comics we have available.\n");
		for (i = 0; i < res.length; i++) {
			console.log(res[i].id, res[i].comic_name, res[i].price);
		};
		
		pickComic();
	});
}

function pickComic() {
	inquire.prompt([

	{
		name: "id",
		message: "Which comic ID would you like to purchase?"
	},
	{
		name: "quantity",
		message: "How many comics would you like?"
	}

	]).then(function(answers){
		connection.query("Select * FROM comics WHERE ?",
		{
			id: answers.id
		},
		function(err,res) {
			var item = res[0];

			if (err) throw err;
			
			var stock = item.quantity;

			if (answers.quantity > stock) {
				console.log("Sorry we don't have that many in stock.");
				stop();
			} else {
				stock -= answers.quantity;
				console.log("\nStock Remaining: " + stock);

				connection.query("UPDATE comics SET ? WHERE ?",

					[{
						quantity: stock
					},
					{
						item_id: answers.id
					}],

					function(err, res) {
						console.log("\n" + answers.quantity, "Comics purchased");
						console.log("Cost: $" + (item.price * answers.quantity).toFixed(2) + "\n");
						stop();
					}
				);
			}
		});
	});
};
