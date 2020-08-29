const express = require('express');
// const MongoClient = require('mongodb').MongoClient;
// An alternative way of writing the statement above is by using destructuring as seen below
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:adminRoutes');
adminRouter = express.Router();
const books = [
    {
        title: 'War and Peace',
        genre: 'Fiction',
        author: 'Neba and Roland',
        bookId: 656,
        read: 'false'
    },
    {
        title: `Brian's Saga`,
        genre: 'Drama',
        author: 'David and Atebusin',
        bookId: 50,
        read: 'false'
    },
    {
        title: 'Les Miserable',
        genre: 'Action',
        author: 'Neba',
        bookId: 24280,
        read: 'true'
    },
    {
        title: 'Master P Jerusalema',
        genre: 'Romance',
        author: 'Roland',
        read: 'false'
    },
    {
        title: 'Zaminamina Dance FLow',
        genre: 'Rock Town',
        author: 'Manzi',
        read: 'false'
    },
    {
        title: 'Epistle Of Peter and John',
        genre: 'Religion',
        author: 'Faith',
        read: 'false'
    },
];

function router(nav) {
    adminRouter.route('/')
        .get((req, res) =>  {
            const url = 'mongodb://localhost:27017';
            const dbName = 'LibraryApp';
            (async function mongo () {
                let client;
                try {
                    client = MongoClient.connect(url);
                    debug('Connected Correctly To Server');
                    const db = (await client).db(dbName);
                    const response = db.collection("books").insertMany(books);
                    debug('Books successfully inserted');
                    console.log(`Response: ${response}`);
                    res.json(response);
                } catch (err) {
                    debug(err.stack);
                }
                (await client).close;
        }())
        })
        return adminRouter;
}

module.exports = router;
