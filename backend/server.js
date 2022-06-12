const express = require('express');
const dotenv = require('dotenv');
const errorHandler = require('./middlewares/errorMiddleware');

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/goals', require('./routes/goalRoute'));

app.use(errorHandler);

app.listen(port, () => console.log(`Server listening on port ${port}`));