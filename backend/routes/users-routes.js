const express = require('express');
const router = express.Router();

const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2;

// This is similar to salt in bcrypt
const jwtSecret = process.env.JWT_SECRET

const UserModel = require('../models/UserModel.js');
const passport = require('passport')

router.post('/register',
    function(req, res) {  
        let formData = {
            "firstName": req.body.firstName,
            "lastName": req.body.lastName,
            "email": req.body.email,
            "password": req.body.password
        };

        UserModel
        .findOne( { email: formData['email']} )
        .then(
            async function (dbDocument) {
                // If avatar file is included...
                if( Object.values(req.files).length > 0 ) {

                    const files = Object.values(req.files);
                    
                    
                    // upload to Cloudinary
                    await cloudinary.uploader.upload(
                        files[0].path,
                        (cloudinaryErr, cloudinaryResult) => {
                            if(cloudinaryErr) {
                                console.log(cloudinaryErr);
                                res.json(
                                    {
                                        status: "not ok",
                                        message: "Error occured during image upload"
                                    }
                                )
                            } else {
                                // Include the image url in formData
                                formData.avatar = cloudinaryResult.url;
                                console.log('formData.avatar', formData.avatar)
                            }
                        }
                    )
                };

                // If email is unique...
                if(!dbDocument) {
           
                    // Generate a salt
                    bcryptjs.genSalt(

                        function(bcryptError, theSalt) {
                        // Use the (a) and (b) salt user's password 
                        // and produce hashed password
                            bcryptjs.hash( 
                                formData.password,                  // first ingredient
                                theSalt,                            // second ingredient
                                function(hashError, theHash) {      // the hash
                                    // Reassign the original password formData
                                    formData['password'] = theHash;

                                    // Create the user's account with hashed password
                                    UserModel
                                    .create(formData)
                                    // If successful...
                                    .then(
                                        function(createdDocument) {
                                            // Express sends this...
                                           res.json({
                                               status: "ok",
                                               createdDocument
                                            });
                                        }
                                    )
                                    // If problem occurs, the catch the problem...
                                    .catch(
                                        function(dbError) {
                                            // For the developer
                                            console.log('An error occured during .create()', dbError);

                                            // For the client (frontend app)
                                            res.status(503).json(
                                                {
                                                    "status": "not ok",
                                                    "message": "Something went wrong with db"
                                                }
                                            )
                                        }
                                    )
                                }
                            )
                        }
                    )

                }
                // If email is NOT unique....
                else { 
                    // reject the request
                    res.status(403).json(
                        {
                            "status": "not ok",
                            "message": "Account already exists"
                        }
                    )
                }
            }
        )
        .catch(
            function(dbError) {

                // For the developer
                console.log(
                    'An error occured', dbError
                );

                // For the client (frontend app)
                res.status(503).json(
                    {
                        "status": "not ok",
                        "message": "Something went wrong with db"
                    }
                )

            }
        )
    }
    
);

router.post('/login', 
    (req, res) => {

        // Capture form data
        const formData = {
            email: req.body.email,
            password: req.body.password,
        }

        // Check if email exists
        UserModel
        .findOne({ email: formData.email })
        .then(
            (dbDocument) => {
                // If email exists
                if(dbDocument) {
                    // Compare the password sent againt password in database
                    bcryptjs.compare(
                        formData.password,          // password user sent
                        dbDocument.password         // password in database
                    )
                    .then(
                        (isMatch) => {
                            // If passwords match...
                            if(isMatch) {
                                // Generate the Payload
                                const payload = {
                                    _id: dbDocument._id,
                                    email: dbDocument.email
                                }
                                // Generate the jsonwebtoken
                                jwt
                                .sign(
                                    payload,
                                    jwtSecret,
                                    (err, jsonwebtoken) => {
                                        if(err) {
                                            console.log(err);
                                            res.status(501).json(
                                                {
                                                    "message": "Something went wrong"
                                                }
                                            );
                                        }
                                        else {
                                            // Send the jsonwebtoken to the client
                                            res.json(
                                                {
                                                    "status": "ok",
                                                    "message": {
                                                        email: dbDocument.email,
                                                        avatar: dbDocument.avatar,
                                                        firstName: dbDocument.firstName,
                                                        lastName: dbDocument.lastName,
                                                        jsonwebtoken: jsonwebtoken
                                                    }
                                                }
                                            );
                                        }
                                    }
                                )
                            }
                            // If passwords don't match, reject login
                            else {
                                res.status(401).json(
                                    {
                                        "message": "Wrong email or password"
                                    }
                                );
                            }
                        }
                    )
                    .catch(
                        (err) => {
                            console.log(err)
                        }
                    )
                }
                // If email does not exist
                else {
                    // reject the login
                    res.status(401).json(
                        {
                            "message": "Wrong email or password"
                        }
                    );
                }
            }
        )
        .catch(
            (err) => {
                console.log(err);

                res.status(503).json(
                    {
                        "status": "not ok",
                        "message": "Please try again later"
                    }
                );
            }
        )
    }
)

router.post('/find',
    function(req, res) {
        UserModel
        .find(
            { "email": req.body.email }
        )
        .then(
            function(dbDocument) {
                res.json(dbDocument)
            }
        )
        .catch(
            function(error) {

                console.log('/find error', error);

                res.send('An error occured');

            }
        )
    }
);


router.put('/update',
    function(req, res) {

        let updates = {}

        if (req.body.firstName){ 
            updates['firstName'] = req.body.firstName 
        };
        if (req.body.lastName) {
            updates['lastName'] = req.body.lastName;
        };
        if (req.body.phone) {
            updates['phone'] = req.body.phone;
        };
        if (req.body.address) {
            updates['address'] = req.body.address;
        };

        UserModel
        .findOneAndUpdate(
            {
                "email": req.body.email
            },
            {
                $set: updates
            },
            {
                new: true
            }
        )
        .then(
            function(dbDocument) {
                res.json(dbDocument)
            }
        )
        .catch(
            function(error) {
                console.log('/users/update error', error);
                res.send('An error occured');
            }
        )

    }
);




module.exports = router;
