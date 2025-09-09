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

export const deleteUserById = async (id: string): Promise<User> => {
  return prisma.user.delete({
    where: { id },
  });
}

export const getUserByEmail = async (email: string): Promise<User | null> => {
  return prisma.user.findUnique({
    where: { email },
    select: { id: true, name: true, email: true, role: true, password: true, createdAt: true, updatedAt: true },
  });
}
