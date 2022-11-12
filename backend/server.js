require('dotenv').config()

// Routes
const userRoutes = require('./routes/userRoutes');
const organizerRoutes = require('./routes/organizerRoutes');
const eventRoutes = require('./routes/eventRoutes');

// Express Setup
const express = require('express');
const cors = require('cors');
const app = express();

// Parses incoming JSON requests and puts the parsed data in req.body
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

app.use('/api/users', userRoutes);
app.use('/api/organizers', organizerRoutes);
app.use('/api/events', eventRoutes);

app.listen(process.env.PORT, () => {
    console.log('App listening on port ' + process.env.PORT);
})