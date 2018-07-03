var schema = require('./../models/WeddingSchema');

var express = require('express');
var router = express.Router();

router.get('/newWeddingSchema', function(req,res){
	var reqs=[{'type':'text','text':'Author'},
		{'type':'text','text':'Identification'},
		{'type':'text','text':'Location'},
		{'type':'text','text':'Title'},
		{'type':'date','text':'Date'},
		{'type':'text','text':'Groom'},
		{'type':'text','text':'Bride'},
		{'type':'text','text':'Description'},
		{'type':'text','text':'Keywords'},
		{'type':'text','text':'Text'}
		];
	res.render('processNewForm',{title: 'Form',reqs,href:'/insertmenu/WeddingForm/processNewWedding'});
});

router.post('/processNewWedding', function(req, res, next) {
	if (req.body) {
		var form;
		var name;

		form = new schema();

		if(form != undefined){
			form.Type = 'Wedding'
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
			}
		schema.collection.insert(form, function(err,docs) {
		if (err) {
			var message = 'Failed to create form!'
			res.render('error', {
				'Title': 'Error', 
				 message
			});
		} else {
			var message = 'Wedding inserted with success!'
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