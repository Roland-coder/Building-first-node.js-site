const express = require('express');
const chalk = require('chalk');
const app = express();
const debug = require('debug')('app');
const path = require('path');
const { title } = require('process');
const bodyParser = require('body-parser');
// passport is used to maintain user object in the session
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
var url = require('url');
const router = require('./src/routes/bookRoutes.js');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session( {secret: 'library'} ));

require('./src/config/passport.js')(app);

app.use(express.static(path.join(__dirname, '/public')));
app.use('/css',express.static(path.join(__dirname,'/node_modules/bootstrap/dist/css')));
app.use('/js',express.static(path.join(__dirname,'/node_modules/bootstrap/dist/js')));
app.use('/js',express.static(path.join(__dirname,'/node_modules/jquery/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');



const nav = [{link:'/bookListView',title:'Books'},{link: '/authors', title: 'Authors'}];
const bookRouter = require('./src/routes/bookRoutes')(nav);
const adminRouter = require('./src/routes/adminRoutes')(nav);
const authRouter  = require('./src/routes/authRoutes')(nav);
// url.parse(req.url).pathname;

app.use('/', bookRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);
app.route('/me')
.get((req, res) => {
    res.send('Worked right');
})

app.get('/', (req,res) =>{
    res.render(
        'index', 
        {
            nav : [{link:'/bookListView',title:'Books'},{link: '/authors', title: 'Authors'}],
            title: 'Library'
        }
    )
});


app.listen(3000, function() {
    debug(`Listening on the port ${chalk.green('3000')}`);
});

// console.log(authRouter.stack);