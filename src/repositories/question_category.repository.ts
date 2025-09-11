import { prisma } from '../lib/prisma';
import { Question_Category } from '@prisma/client';

export const createQuestionCategory = async(isKerajaan: boolean, kerajaanId?: number, tokohId?: number): Promise<Question_Category> => {
  return prisma.question_Category.create({
    data: {
      isKerajaan,
      kerajaanId,
      tokohId
    }
  })
}

export const getQuestionCategoryById = async(id: number): Promise<Question_Category | null> => {
  return prisma.question_Category.findUnique({
    where: { id }
  })
}

export const updateQuestionCategory = async(id: number, isKerajaan?: boolean | null, kerajaanId?: number | null, tokohId?: number | null): Promise<Question_Category | null> => {
  const dataToUpdate: any = {};
  if (isKerajaan !== undefined && isKerajaan !== null) dataToUpdate.isKerajaan = isKerajaan;
  if (kerajaanId !== undefined && kerajaanId !== null) dataToUpdate.kerajaanId = kerajaanId;
  if (tokohId !== undefined && tokohId !== null) dataToUpdate.tokohId = tokohId;

  return prisma.question_Category.update({
    where: { id },
    data: dataToUpdate
  })
}

export const deleteQuestionCategory = async(id: number) => {
  return prisma.question_Category.delete({
    where: { id }
  })
}

export const listQuestionCategoriesByCategory = async (isKerajaan: boolean, page: number = 1, pageSize: number = 10): Promise<Question_Category[] | null> => {
  const includeRelation = isKerajaan? { kerajaan: true } : { tokoh: true };
  const skip = (page - 1) * pageSize;
  const take = pageSize;

  return prisma.question_Category.findMany({
    where: { isKerajaan },
    relationLoadStrategy: "join",
    include: includeRelation,
    skip,
    take,
    orderBy: { id: 'asc' }
  });
};

export const bulkDeleteQuestionCategoriesByCategory = async (isKerajaan: boolean) => {
  return prisma.question_Category.deleteMany({
    where: { isKerajaan }
  })
}