const express = require("express");
const cors = require('cors');
const { getMockChatbotResponse } = require("./mocks/getMockChatbotResponse");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/", (req, res) => {
  const response = getMockChatbotResponse();
  console.log(req.body);
  res.json(response);
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
