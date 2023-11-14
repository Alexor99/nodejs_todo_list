const path = require('path');

const filePath = path.resolve(__dirname, '../views/index.html');
// console.log(filePath);

const getrootHandler = (req, res) => {
    res.sendFile(filePath);
    // res.send('Get root');
};

module.exports = {
    getrootHandler,
};
