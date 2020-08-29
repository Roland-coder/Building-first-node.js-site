const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:bookController');


function bookController (nav, bookService) {
    function getIndex (req, res) {
            const url = 'mongodb://localhost:27017';
            const dbName = 'LibraryApp';
            (async function mongo() {
                let client;
                try {
                    client = MongoClient.connect(url);
                    debug('Connected Correctly To Server');
                    const db = (await client).db(dbName);
                    // const col = await db.collection("books")
                    const books = await db.collection('books').find().toArray()
                    res.render(
                        'bookListView',
                        {
                            nav,
                            title: 'Library',
                            books
                        }
                    );
                } catch (err) {
                    debug(err.stack)
                }
                (await client).close;
            }())
        
    };
    function getById (req, res) {
        
            const { id } = req.params;
            const url = 'mongodb://localhost:27017';
            const dbName = 'LibraryApp';
            (async function mongo() {
                let client;
                try {
                    client = MongoClient.connect(url);
                    // debug('Connected Correctly To Server');
                    const db = (await client).db(dbName);
                    const book = await db.collection('books').findOne({_id: new ObjectID(id)})
    
                    // await db.collection('books').find().toArray()
    
                    book.details = await bookService.getBookById(book.bookId);
                    res.render(
                        'bookView',
                        {
                            nav,
                            title: 'Library',
                            book
                        }
                    )
                } catch(err) {
                    debug(err.stack)
                }
                (await client).close
            }())    
    };

    function middleware (req, res, next) {
        // if (!req.user) {
        //     let postLoginRedirectUrl = req.originalUrl;
        //     console.log(postLoginRedirectUrl);
        //     res.redirect('/');
            
        // // }
        // } else {
        //     // app.use('/');
        //     next();
        // }
    };

    return {
        getIndex,
        getById,
        middleware
    };
};

module.exports =  bookController;