import express from "express";
import * as dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

const app = express();
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});