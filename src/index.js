// Loads express app and database module
const app = require('./app');
const connection = require('./database');

// Start express app on assigned port
app.listen(app.get('port'), () => {
	console.log('listening on port ' + app.get('port'));
});
