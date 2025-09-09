import {createTeacher, createStudent, deleteUserById, getUserByEmail} from '../repositories/user.repository';

export const registerTeacher = async (name: string, email: string, password: string) => {
  return await createTeacher(name, email, password);
}

export const registerStudent = async (name: string, email: string, password: string) => {
    const user = await getUserByEmail(email);
    if (user) {
        throw new Error("User with this email already exists");
    }
    return await createStudent(name, email, password);
}

export const deleteUser = async (id: string) => {
  return await deleteUserById(id);
}

export const getUser = async (email: string) => {
  return await getUserByEmail(email);
}

export const isEmailTaken = async (email: string): Promise<boolean> => {
    const user = await getUserByEmail(email);
    return !!user;
}