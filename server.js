const express = require('express');
const path = require('path');
const userRouter = require('./routes/user');
const cors = require('cors');
const { authenticateUser } = require('./controllers/auth');
const { PORT } = require('./config');
require('./connection')

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, './front-end/dist/wd-m1-ui/')));

app.use('/api/auth', authenticateUser);
app.use('/api/user', userRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
