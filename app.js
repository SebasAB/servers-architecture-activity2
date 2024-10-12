const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const connectDB = require('./config/db.config');
const postRoutes = require('./routes/post.routes');
const userRoutes = require('./routes/user.routes');

const app = express();
app.use(bodyParser.json());

connectDB();

app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
