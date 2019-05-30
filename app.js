/**
 * @author adityang5@gmail.com
 * @description A Single Page Web app attached to the custom api
 *              for Areacodes, Store Names and Offer Details management
 */

const fs = require('fs');
const express = require('express');
const Joi = require('joi');
const db = require('./db')

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;


fs.readFile('./index.html', (err, webapp) => {
    if (err) {
        throw err;
    }       
    initServer(webapp);
});

/**
 * Initializes all the endpoints and sets up listeners
 * @param {Buffer} webapp Single Page Webapp File Buffer
 */
function initServer (webapp) {
    app.get ('/', (req, res) => {
        res.write(webapp);
        res.end();
    });

    app.get ('/api/areacode', (req, res) => {
        res.status(200).send(db.getAreasList().data);
        res.end();
    });

    app.get ('/api/search/:qur', (req, res) => {
        res.status(200).send(db.searchOffers(req.params.qur));
        res.end();
    });

    app.post ('/api/areacode', (req, res) => {
        const schema = {
            areaID: Joi.string().length(6).required()
        }
        const inputValidation = Joi.validate(req.body, schema);

        if (inputValidation.error) {
            handleErrors(inputValidation.error.details, res)
            return;
        }
        db.setArea(req.body.areaID)
        res.status(200).send(req.body.areaID);
        res.end();
    });

    app.get ('/api/areacode/:areaID/storename', (req, res) => {
        result = db.getStoresList().find({areaID: req.params.areaID})
        if (result.length!=0) {
            res.status(200).send(result);
        } else {
            res.status(404).send("Not found");
        }
        //TODO : Return list of Store Names
        res.end();
    });

    app.post ('/api/areacode/:areaID/storename', (req, res) => {
        const schema = {
            storeName: Joi.string().max(32).required()
        }
        const inputValidation = Joi.validate(req.body, schema);

        if (inputValidation.error) {
            handleErrors(inputValidation.error.details, res)
            return;
        }
        let id = db.generateID();
        db.setStore(req.params.areaID, id, req.body.storeName)
        res.status(200).send(id);
        res.end();
    });

    app.put('/api/areacode/:areaID/storename/:storeID', (req, res) => {
        const schema = {
            storeID: Joi.string.length(9).required(),
            storeName: Joi.string().max(32).required()
        }
        const inputValidation = Joi.validate(req.body, schema);

        if (inputValidation.error) {
            handleErrors(inputValidation.error.details, res)
            return;
        }

        db.setStore(req.params.areaID, req.params.storeID, req.body.storeName)
        res.status(200).send(req.params.storeID);
        res.end();
    });

    app.get ('/api/areacode/:areaID/storename/:storeID/offers', (req, res) => {
        result = db.getOffersList().find({areaID: req.params.areaID, storeID: req.params.storeID})
        if (result.length!=0) {
            res.status(200).send(result);
        } else {
            res.status(404).send("Not found");
        }
        //TODO : Return list of Offer Codes
        res.end();
    });

    app.post ('/api/areacode/:areaID/storename/:storeID/offers', (req, res) => {
        const schema = {
            imageURL : Joi.string().max(200),
            productDetails : Joi.string().max(200),
            offerDetails : Joi.string().max(200),
            begins : Joi.date(),
            ends : Joi.date()
        }
        const inputValidation = Joi.validate(req.body, schema);

        if (inputValidation.error) {
            handleErrors(inputValidation.error.details, res)
            return;
        }
        let id = db.generateID();
        console.log(req.params)
        console.log(req.body)
        db.setOffer(req.params.areaID, req.params.storeID, id, req.body.imageURL, req.body.productDetails, req.body.offerDetails, req.body.begins, req.body.ends);
        //db.setOffer(req.params.areaID, req.params.storeID, id, req.body.imageURL, req.body.productDetails, req.body.offerDetails, req.body.begins, req.body.ends)
        res.status(200).send(id);
        res.end();
    });

    app.put('/api/areacode/:areaID/storename/:storeID/offers', (req, res) => {
        const schema = {
            offerID : Joi.string.length(9).required(),
            imageURL : Joi.string().max(200),
            productDetails : Joi.string().max(200),
            offerDetails : Joi.string().max(200),
            begins : Joi.date(),
            ends : Joi.date()
        }
        const inputValidation = Joi.validate(req.body, schema);

        if (inputValidation.error) {
            handleErrors(inputValidation.error.details, res)
            return;
        }

        db.setOffer(req.params.areaID, req.params.storeID, req.params.offerID, req.body.imageURL, req.body.productDetails, req.body.offerDetails, req.body.begins, req.body.ends);
        res.status(200).send(req.params.offerID);
        res.end();
    });

    app.delete('/api/areacode/:areaID/storename/:storeID/offers/:offerID', (req, res) => {
        
        //TODO Delete
        db.deleteOffer(req.params.areaID, req.params.storeID, req.params.offerID);
        
        res.status(200).send("Deleted : " + req.params.offerID);
        res.end();
    });

    app.get ('/api/areacode/:areaID/storename/:storeID/offers/:offerID', (req, res) => {
        result = db.getOffersList().findOne({areaID: req.params.areaID, storeID: req.params.storeID, offerID: req.params.offerID})
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(404).send("Not found");
        }
        res.end();
    });

    app.listen(PORT, () => {
        console.log("Listening on  port ", PORT);
    });
}

/**
 * One function to handle most of the error reporting
 * @param {array} errorList The list of errors
 * @param res Respond to Client with error message
 */
function handleErrors(errorList, res) {
    var errors = [errorList[0].message];
    // Gather Error Messages
    for (var i=1;i<errorList.length;i++) {
        errors.push(errorList[i].message);
    }
    console.log(errors);
    res.status(200).send(errors);
}