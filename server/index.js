const express = require('express');
const cors = require('cors');
const cookieparser = require("cookie-parser");
const MongoDBConnection = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const assessRoutes = require('./routes/assessRoutes');

const app = express();
app.use(express.json());
app.use(cookieparser());
app.use(cors({
  origin: ["http://localhost:5173"],
credentials: true
}));

MongoDBConnection();

app.use('/user', userRoutes);
app.use('/assess', assessRoutes);

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
