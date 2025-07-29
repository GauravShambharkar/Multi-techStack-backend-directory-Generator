const express = require("express");
const app = express();
const cors = require("cors");
const { generateRoute } = require("./generate");

const corsOption = {
  methods: ["GET", "POST", "PUT", "DELETE"],
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOption));
app.use(express.json());

app.get("/read", (req, res) => {
  res.send({
    message: "Welcome to the backend generating server!",
  });
});

app.use("/", generateRoute);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running ${port}`);
});

