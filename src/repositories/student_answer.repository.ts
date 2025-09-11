import { UUID } from "crypto";
import { prisma } from "../lib/prisma";
import { Student_Answer } from "@prisma/client";

export const createStudentAnswer = async(questionId: number, quizId: number, userId: UUID, selectedOption: string, isCorrect: boolean = false): Promise<Student_Answer> => {
    return prisma.student_Answer.create({
        data: {
            questionId,
            quizId,
            userId,
            selectedOption,
            isCorrect
        }
    })
}

export const updateStudentAnswer = async(id: string): Promise<Student_Answer | null> => {
    return prisma.student_Answer.update({
        where: { id },
        data: { isCorrect: true }
    })
}

export const getStudentAnswersByQuizId = async(quizId: number, page: number = 1, pageSize: number = 10): Promise<Student_Answer[] | null> => {
    return prisma.student_Answer.findMany({
        where: { quizId },
        skip: (page - 1) * pageSize,
        take: pageSize
    })
}