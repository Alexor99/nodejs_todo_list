const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const router = require('./routes/index');

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//enable all CORS requests
app.use(cors());

app.use(router);

app.listen(5001, () => console.log('Server was started on port 5001'));


