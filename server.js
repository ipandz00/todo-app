const express = require('express');
const app = express();
const path = require('path');

//---------------------------------
//Body Parser
//---------------------------------
const bodyParser = require('body-parser');
app.use(bodyParser.json()); 

//---------------------------------
//Mongoose Settings
//---------------------------------
const mongoose = require('mongoose');

app.use((req, res, next) => {
	if(mongoose.connection.readyState) {
		next();
	}
	else {
		require('./mongo.js')().then(() => next());
	}
});

//---------------------------------
//Server
//---------------------------------
const port = process.env.PORT || process.argv[2] || 8081;
const host = "localhost";

let args;
process.env.NODE_ENV === "production" ? (args = [port]) : (args = [port, host]);

args.push(() => {
	console.log(`Listening: http://${host}:${port}\n`);
});

require('./app/routes/task.routes.js')(app);

if (require.main === module) {
  app.listen.apply(app, args);
}

//serve react files
app.use(express.static(path.join(__dirname, 'frontend-app/build')));

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/frontend-app/build/index.html'));
});
