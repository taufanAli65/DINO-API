import { UUID } from 'crypto';
import { prisma } from '../lib/prisma';
import { Quiz } from '@prisma/client';

export const createQuiz = async(userId: UUID, score: number = 0): Promise<Quiz> => {
  return prisma.quiz.create({
    data: {
      userId,
      score
    }
  })
}

export const getQuizById = async(id: number): Promise<Quiz | null> => {
  return prisma.quiz.findUnique({
    where: { id }
  })
}

export const getQuizByUserId = async(userId: UUID, page: number = 1, pageSize: number = 10): Promise<Quiz[] | null> => {
  return prisma.quiz.findMany({
    where: { userId },
    skip: (page - 1) * pageSize,
    take: pageSize
  })
}

export const updateScorePlus = async(id: number, score: number): Promise<Quiz | null> => {
    const data = await getQuizById(id);
    if (!data) return null;
    const scoreToAdd = score + data.score;
    return prisma.quiz.update({
        where: { id },
        data: { score: scoreToAdd }
    })
}

export const updateScoreMinus = async(id: number, score: number): Promise<Quiz | null> => {
    const data = await getQuizById(id);
    if (!data) return null;
    let scoreToMinus = data.score - score;
    if (scoreToMinus < 0) scoreToMinus = 0;
    return prisma.quiz.update({
        where: { id },
        data: { score: scoreToMinus }
    })
}