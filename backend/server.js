//require('dotenv').config()
const dotenv = require('dotenv');

dotenv.config({ path: `${__dirname}/../.env` })

// Routes
const userRoutes = require('./routes/userRoutes');
const organizationRoutes = require('./routes/organizationRoutes');
const eventRoutes = require('./routes/eventRoutes');
const utilityRoutes = require('./routes/utilityRoutes');

// Express Setup
const express = require('express');
const cors = require('cors');
const app = express();

// Parses incoming JSON requests and puts the parsed data in req.body
app.use(express.json());
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
})

app.use('/api/users', userRoutes);
app.use('/api/organizations', organizationRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/utilities', utilityRoutes);

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));

app.listen(process.env.SERVER_PORT, () => {
  console.log('App listening on port ' + process.env.SERVER_PORT);
})