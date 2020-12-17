const database_setup = require("./database_setup");
const room_migration = require("./room_setup");
const user_migration = require("./user_setup");
const booking_migration = require("./booking_setup");
const room_seeding = require("../seeders/seedRoom");
const user_seeding = require("../seeders/seedUser");
const booking_seeding = require("../seeders/seedBooking");
const pool = require("../config/config");
const argv = process.argv;

let command = argv[2];
let input = argv.slice(3);

switch(command) {
	case "db:create":
		database_setup.up();
		break;
	case "db:drop":
		database_setup.down();
		break;
	case "migrate":
		console.log("migration start")
		if (input[0] === "undo") {
			booking_migration.down(() => {
				user_migration.down(() => {
					room_migration.down(() => {
						pool.end();
						console.log("done delete all table");
					});
				});
			});
		} else {
			user_migration.up(() => {
				room_migration.up(() => {
					booking_migration.up(() => {
						pool.end();
						console.log("done create all table");
					});
				});
			});
		}
		break;
	case "seed":
		console.log("seed start")
		if (input[0] === "undo") {
			booking_seeding.down(() => {
				console.log("Done delete all data from bookings");
				user_seeding.down(() => {
					console.log("Done delete all data from users");
					room_seeding.down(() => {
						console.log("Done delete all data from rooms");
						pool.end();
						console.log("done delete all data from table");
					});
				});
			});
		} else {
			user_seeding.up(() => {
				console.log("Done seeding to users");
				room_seeding.up(() => {
					console.log("Done seeding to rooms");
					booking_seeding.up(() => {
						console.log("Done seeding to bookings");
						pool.end();
						console.log("done seeding data to database");
					});
				});
			});
		}
		break;
	case "help":
	default:
		console.log("help");
		console.log("db:create = create databse");
		console.log("db:drop = drop databse");
		console.log("db:migrate = create table");
		console.log("db:migrate:undo = delete table");
		console.log("db:seed = seeding to database");
		console.log("db:seed:undo = delete data from database");
		break;
}

console.log(command, input);