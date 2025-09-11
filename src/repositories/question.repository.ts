import { prisma } from "../lib/prisma";
import { Question } from "@prisma/client";

export const createQuestion = async(categoryId: number, text: string, optionA: string, optionB: string, optionC: string, optionD: string, correctOption: string): Promise<Question> => {
  return prisma.question.create({
    data: {
      categoryId,
      text,
      optionA,
      optionB,
      optionC,
      optionD,
      correctOption
    }
  })
}

export const getQuestionById = async(id: number): Promise<Question | null> => {
  return prisma.question.findUnique({
    where: { id }
  })
}

export const updateQuestion = async(id: number, categoryId?: number | null, text?: string | null, optionA?: string | null, optionB?: string | null, optionC?: string | null, optionD?: string | null, correctOption?: string | null): Promise<Question | null> => {
  const dataToUpdate: any = {};
  if(categoryId != undefined && categoryId != null) dataToUpdate.categoryId = categoryId;
  if(text != undefined && text != null) dataToUpdate.text = text;
  if(optionA != undefined && optionA != null) dataToUpdate.optionA = optionA;
  if(optionB != undefined && optionB != null) dataToUpdate.optionB = optionB;
  if(optionC != undefined && optionC != null) dataToUpdate.optionC = optionC;
  if(optionD != undefined && optionD != null) dataToUpdate.optionD = optionD;
  if(correctOption != undefined && correctOption != null) dataToUpdate.correctOption = correctOption;

  return prisma.question.update({
    where: { id },
    data: dataToUpdate
  })
}

export const deleteQuestion = async(id: number) => {
  return prisma.question.delete({
    where: { id }
  })
}

export const listQuestionsByCategory = async (categoryId: number, page: number = 1, pageSize: number = 10): Promise<Question[] | null> => {
  const skip = (page - 1) * pageSize;
  const take = pageSize;

  return prisma.question.findMany({
    where: { categoryId },
    skip,
    take,
    orderBy: { id: 'asc' }
  });
}

export const getCorrectOption = async(questionId: number): Promise<string | null> => {
  const question = await prisma.question.findUnique({
    where: { id: questionId },
    select: { correctOption: true }
  });
  return question ? question.correctOption : null;
}