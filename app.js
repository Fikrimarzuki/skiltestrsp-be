const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;
const routes = require("./routes/index");
const errorHandlers = require("./middlewares/errorHandlers");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(routes);

app.use(errorHandlers);

app.listen(PORT, () => {
	console.log("listening to ", PORT);
})