const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./router/authRouter");
const PORT = 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Routes
app.use(router);

app.listen(PORT, () => {
  console.log("Running at Port : ", PORT);
});
