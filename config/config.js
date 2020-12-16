var { createPool } = require("mysql");
const argv = process.argv;

let config = {
	connectionLimit: 5,
	port: 3306,
	host: "localhost",
	user: "mysql",
	password: "mysqlpass",
	debug: false
}

if (argv[2] !== "db:create") {
	config.database = "Meeting_Room"
}

var pool = createPool(config);

// Testing connection to database
// pool.getConnection(function (err) {
// 	if (!err) {
// 		console.log("Database is connected ...");
// 	} else {
// 		console.log(err)
// 		console.log("Error connecting database ...");
// 	}
// }); 

pool.on('connection', function (connection) {
  console.log('DB Connection established');

  connection.on('error', function (err) {
    console.error(new Date(), 'MySQL error', err.code);
  });
  connection.on('close', function (err) {
    console.error(new Date(), 'MySQL close', err);
  });

});

module.exports = pool;
