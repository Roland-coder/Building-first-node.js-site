const express = require('express');
const bookController = require('../controllers/bookController');
// Since in goodreadsService.js we are returning the function as an object, we dont need to add the () at the end since its
// not a function ie require('../services/goodreadsService')(); as per the video but then I tried it that way and it did not
// work for me, I eventually had to switch back to adding the ()

const bookService = require('../services/goodreadsService')();
bookRouter = express.Router();


function router(nav) {
    
    const { getIndex, getById, middleware } = bookController(nav, bookService);
    // bookRouter.use(middleware);
    bookRouter.route('/bookListView')
        .all((req, res, next) => {
            if (req.user) {
                next();
            } else {
                res.redirect('/');
            }
        })
        .get(getIndex);

    bookRouter.route('/bookListView/:id')
        .all((req, res, next) => {
            if (req.user) {
                next();
            } else {
                res.redirect('/');
            }
        })
        .get(getById);
    
    return bookRouter;
}

module.exports = router;