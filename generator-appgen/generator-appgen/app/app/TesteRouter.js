var schema = require('./../models/TesteSchema');

var express = require('express');
var router = express.Router();

router.get('/newTesteSchema', function(req,res){
	var reqs=[{'type':'text','text':'Author'},
		{'type':'text','text':'Text'}
		];
	res.render('processNewForm',{title: 'Form',reqs,href:'/insertmenu/TesteForm/processNewTeste'});
});

router.post('/processNewTeste', function(req, res, next) {
	if (req.body) {
		var form;
		var name;

		form = new schema();

		if(form != undefined){
			form.Type = 'Teste'
			form.Author = req.body.Author;
			form.Identification = req.body.Identification;
			form.Location = req.body.Location;
			form.Title = req.body.Title;
			form.Date = req.body.Date;
			form.Description = req.body.Description;
			form.Keywords = req.body.Keywords;
			form.Text = req.body.Text;
			form.Author = req.body.Author;
			form.Identification = req.body.Identification;
			form.Location = req.body.Location;
			form.Title = req.body.Title;
			form.Date = req.body.Date;
			form.Groom = req.body.Groom;
			form.Bride = req.body.Bride;
			form.Description = req.body.Description;
			form.Keywords = req.body.Keywords;
			form.Text = req.body.Text;
			form.Author = req.body.Author;
			form.Text = req.body.Text;
			}
		schema.collection.insert(form, function(err,docs) {
		if (err) {
			var message = 'Failed to create form!'
			res.render('error', {
				'Title': 'Error', 
				 message
			});
		} else {
			var message = 'Form created with success!'
			var href ='/insertmenu'
			res.render('success',{
				'Title': 'Success!',
				message,
				href
			});
		}
		});
	}else{
		var err = new Error('Unknown Type' + req.body);
		err.status = 404;
		next(err);
	}
});

module.exports = router;