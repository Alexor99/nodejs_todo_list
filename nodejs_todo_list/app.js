const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes/index');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//enable all CORS requests
app.use(cors());

app.use(router);

app.listen(5001, () => console.log('Server was started on port 5001'));

console.log('will try to fix');
