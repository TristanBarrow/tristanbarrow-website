import express, { Express } from 'express';
import session from 'express-session';
import { join } from 'path';
import { pool } from './src/backend/api/database/pool';
import * as connectPgSimple from 'connect-pg-simple';
import endpoints from './src/backend/api/endpoints/gen/all';

require('dotenv').config();

declare module 'express-session' {
  export interface SessionData {
    username: string 
    isAdmin: boolean
    user_id: number
    loggedIn: boolean
  }
}

const pgSession = connectPgSimple.default(session);
const app: Express = express();

app.use(session({
    store: new pgSession({ pool }),
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));

app.use(express.static(join(__dirname, 'served', 'public')));

app.get('/bundle', (req, res) => {
    res.sendFile(join(__dirname, 'served', 'bundle.js'));
});

endpoints(app);

app.get('*', function(req, res) {
    res.json({ message: 'Not found' });
});

const PORT = parseInt(process.env.PORT) || 8000;
app.listen(PORT, () => console.log('Listening on PORT: ' + PORT));
