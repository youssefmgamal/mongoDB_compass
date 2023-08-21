const express = require('express');
const app = express();
const cors = require('cors');
require('./database');

app.use(cors());
app.use(express.json());





const personRoute = require('./routes/person.route');




app.use('/person', personRoute);


app.listen(5000, () => console.log('Server Running on port 5000'));