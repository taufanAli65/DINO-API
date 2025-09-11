import { createStudentAnswer, getStudentAnswersByQuizId, updateStudentAnswer} from "../repositories/student_answer.repository";
import { getCorrectOption } from "../repositories/question.repository";
import { incrementScore, decrementScore } from "./quiz.service";
import { UUID } from "crypto";

export const addStudentAnswer = async(questionId: number, quizId: number, userId: UUID, selectedOption: string) => {
    try {
        const studentAnswer = await createStudentAnswer(questionId, quizId, userId, selectedOption);
        const correctOption = await getCorrectOption(questionId);
        if(correctOption === selectedOption) {
            await incrementScore(quizId, 10);
            await updateStudentAnswer(studentAnswer.id);
            return {student_answer: selectedOption, correct_answer: correctOption, correct: true};
        } else {
            await decrementScore(quizId, 10);
            return {student_answer: selectedOption, correct_answer: correctOption, correct: false};
        }
    } catch (error) {
        throw new Error("Error adding student answer");
    }
}

export const getStudentAnswerServiceByQuizId = async(id: number) => {
    const existingAnswer = await getStudentAnswersByQuizId(id);
    if (!existingAnswer) {
        throw new Error("Student Answer not found");
    }
    return existingAnswer;
}
