const express = require('express');
const app = express();
const path = require('path');

// TODO: Break out the variables into ENV variables so that the application can run on AZURE.
// TODO: Convert to TS
// TODO: Debating whether API calls should go through the node server or FE. Leaning to the former.

const buildPath = path.join(__dirname, '..', 'dist')

app.use(express.static(buildPath));

app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'))
});

app.listen(3000, () => {
    console.log('server is running');
});
