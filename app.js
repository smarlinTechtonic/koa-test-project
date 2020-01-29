const Koa = require('koa');
const KoaRouter = require('koa-router');
const json = require('koa-json');
const render = require('koa-ejs');
const bodyParser = require('koa-bodyparser');
const path = require('path');

const app = new Koa();
const router = new KoaRouter();

// Replace with DB connection
let things = [
    'Family', 'A happy home', 'Being a developer', 'The sun shining'
];

// json prettier middleware
app.use(json());

// Middleware for bodyparser
app.use(bodyParser());

// Simple middleware example
// app.use(async ctx => (ctx.body = {mes: 'Hello World!'}));

// Add additional properties to the context
app.context.user = 'Sonali';

render(app, {
    root: path.join(__dirname, 'views'),
    layout: 'layout',
    viewExt: 'html',
    cache: false,
    debug: false
})

// Route for the Index Page and Add Thing Pages
router.get('/', index);
router.get('/add', showAdd);
router.post('/add', add);

async function index(ctx) {
    await ctx.render('index', {
        title: 'I am thankful for...',
        things: things
    });
}

async function showAdd(ctx) {
    await ctx.render('add');
}

function add(ctx) {
    const body = ctx.request.body;
    things.push(body.thing);
    ctx.redirect('/');
}

// Router Test Routes
router.get('/test', ctx => (ctx.body = `Hello ${ctx.user}`));
router.get('/test/:name', ctx => (ctx.body = `Hello ${ctx.params.name}`));

// Router Middleware
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => console.log("Koa Server Started..."));