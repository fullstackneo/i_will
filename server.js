const path = require('path');
const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');
const session = require('express-session');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: process.env.COOKIE_SECRET,
  cookie: { maxAge: 24 * 60 * 60 * 1000 },
  // true: always force set-cookie to user in response header
  resave: false,
  // dont't generate sid if sid does not exist in db: save resources in db
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
    tableName: 'session',
    // clear expired sessions every 2 hours
    checkExpirationInterval: 2 * 60 * 60 * 1000
  })
};
// enable CORS
app.use(cors());

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// set up handlebars
const exphbs = require('express-handlebars');

// const helpers = require('./utils/helpers');
const hbs = exphbs.create({

});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`🌏 Server is running at ${PORT}`));
});
