const express = require('express');
const router = express.Router();

const ProductModel = require('../models/ProductModel.js');

router.post('/add',
    function(req, res) {

        // Receive data for MongoDB
        let newDocument = {
            "title": req.body.title,
            "description": req.body.description,
            "color": req.body.color,
            "price": req.body.price,
            "size": req.body.size,
            "categories": req.body.categories,
            "uploadedDate": req.body.uploadedDate,
        }

        // Create the document in MongoDB
        ProductModel
        .create(newDocument)
        .then(
            function(dbDocument) {
                // Send the document to client
                res.json(dbDocument)
            }
        )
        // Otherwise, if error occurs catch it...
        .catch(
            function(error) {
                console.log('/addproduct error', error);

                res.send('An error occured');
            }
        );
    }
);

router.post('/find',
    function(req, res) {
        ProductModel
        .find( { "title": req.body.title

        } )
        .then(
            function(dbDocument) {
                res.json(dbDocument)
            }
        )
        .catch(
            function(error) {
                console.log('/findproduct error', error);
                res.send('An error occured');

            }
        );
    }
);

router.put("/update", 
function (req, res) {
  let newDocument = {};

  if (req.body.title) {
    newDocument["title"] = req.body.title;
  }

  if (req.body.price) {
    newDocument["price"] = req.body.price;
  } 
  if (req.body.description) {
    newDocument["description"] = req.body.description;
  } 
  if (req.body.size) {
    newDocument["size"] = req.body.size;
  }

ProductModel.findOneAndUpdate(
    {
      title: req.body.title,
    },
    {
      $set: newDocument,
    },
    {
      new: true,
    }
  )
    .then(function (dbDocument) {
      res.json(dbDocument);
    })
    .catch(function (error) {
      console.log("/produts/update error", error);
      res.send("An error occured");
    }); });


module.exports = router;