import express from "express";
import * as dotenv from 'dotenv';
import authRouter from './routes/auth.route';
import kerajaanRouter from './routes/kerajaan.route';
import questionCategoryRouter from './routes/question_category.route';
import questionRouter from './routes/question.route';
import quizRouter from './routes/quiz.route';
import userRouter from './routes/user.route';
import cors from 'cors';
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/auth", authRouter);
app.use("/kerajaan", kerajaanRouter);
app.use("/question-category", questionCategoryRouter);
app.use("/question", questionRouter);
app.use("/quiz", quizRouter);
app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});