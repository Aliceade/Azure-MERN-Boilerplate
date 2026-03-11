var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var path = require('path');

// THE ABSOLUTE PATH FIX: Force dotenv to look exactly one folder up!
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// Pulling the secret URL securely from the environment
var url = process.env.MONGO_URI;

router.get('/', (req, res, next) => {
    console.log("Hey Node, what is my URI? ->", url ? "Secret Key Loaded Successfully! 🔐" : "Uh oh, still undefined");

	MongoClient.connect(url, function(err, db) {
		if (err) {
            console.error("Database connection failed:", err);
            return res.status(500).json({ error: "Failed to connect to the database" });
        }
        
		var dbo = db.db("azure_checkpoint_db"); 
		dbo.collection("collection1").find({}).toArray(function(err, result) {
			if (err) {
                console.error("Data fetch failed:", err);
                return res.status(500).json({ error: "Failed to fetch data" });
            }
            
			console.log('Mongo data coming in hot')
    		console.log(result);
    		res.json(result)
    		db.close();
    	});
	}); 
});

module.exports = router;