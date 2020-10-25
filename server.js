const express = require('express');
const path = require('path');
const userRouter = require('./routes/user');
const cors = require('cors');
const { generateToken } = require('./controllers/auth');
const { PORT } = require('./config');
require('./connection')

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, './front-end/dist/wd-m1-ui/')));

app.use('/api/auth', generateToken);
app.use('/api/user', userRouter);
app.use('/*', (req, res) => {
    res.sendFile(path.join(__dirname, './front-end/dist/wd-m1-ui/index.html'));
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
