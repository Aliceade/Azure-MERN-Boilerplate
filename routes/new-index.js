var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;

// Pulling the secret URL securely from the environment
var url = process.env.MONGO_URI;

router.get('/', (req, res, next) => {
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
        // Replaced the placeholder with your actual database name
		var dbo = db.db("azure_checkpoint_db"); 
		dbo.collection("collection1").find({}).toArray(function(err, result) {
			if (err) throw err;
			console.log('Mongo data coming in hot')
    		console.log(result);
    		res.json(result)
    		db.close();
    	});
	}); 
});

module.exports = router;