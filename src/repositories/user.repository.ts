import { hashPassword } from '../lib/password';
import {prisma} from '../lib/prisma';
import {User, roles} from '@prisma/client';

export const createTeacher = async (name: string, email: string, password: string): Promise<User> => {
  return prisma.user.create({
    data: {
      name,
      email,
      password: await hashPassword(password),
      role: roles.TEACHER,
    },
  });
}

export const createStudent = async (name: string, email: string, password: string): Promise<User> => {
  return prisma.user.create({
    data: {
      name,
      email,
      password: await hashPassword(password),
      role: roles.STUDENT,
    },
  });
}

export const deleteUserById = async (id: number): Promise<User> => {
  return prisma.user.delete({
    where: { id },
  });
}