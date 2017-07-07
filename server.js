const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

//Make all the pages stay in mantenance.
// app.use((req, res, next) => {
// 	res.render('maintenance.hbs');
// });

app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.url} ${req.method}`;
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if(err){
			console.log('Unable to append server log.');
		}
	});
	next();
});

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
})




app.get('/', (req, res) => {
//	res.send('<h1>Hello Express!</h1>');
	// res.send({
	// 	name: 'Andrew',
	// 	Likes: ['Biking', 'Books']
	// });
	res.render('home.hbs', {
		welcomeMsg: 'Welcome to my page.',
		pageTitle: 'Home',
	})
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page',
	});
})

app.get('/project', (req, res) => {
	res.render('project.hbs', {
		pageTitle: 'Project'
	});
})

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'Handling error'
	});
})

app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});