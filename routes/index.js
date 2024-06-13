const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const authRoutes = require('../authRoutes'); // atau path yang sesuai

require('dotenv').config();
app.use(express.json());
app.use('/api', routes);

app.get('/', (req, res) => {
  res.send('Welcome to MyTax API');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = (app) => {
  app.use('/', authRoutes);
};