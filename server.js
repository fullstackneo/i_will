const path = require('path');
const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const session = require('express-session');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

const SequelizeStore = require('connect-session-sequelize')(session.Store);

require('dotenv').config();

const sess = {
  secret: process.env.COOKIES_SECRECT,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};
// enable CORS
app.use(cors());

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// set up handlebars
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`🌏server is running on ${PORT}`));
});
