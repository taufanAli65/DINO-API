import { createTokoh, updateTokoh, deleteTokoh, getTokohById, getAllTokoh } from '../repositories/tokoh.repository';
import { AppError } from '../utils/app_error';

export const addTokoh = async(name: string, kerajaanId: number, birthdate: Date, deathdate: Date | null, description: string, photoUrl?: string) => {
  return await createTokoh(name, kerajaanId, birthdate, deathdate, description, photoUrl);
}

export const editTokoh = async(id: number, name?: string | null, kerajaanId?: number | null, birthdate?: Date | null, deathdate?: Date | null, description?: string | null, photoUrl?: string | null) => {
  const existingTokoh = await getTokohById(id);
  if (!existingTokoh) {
    throw AppError("Tokoh not found", 404);
  }
  return await updateTokoh(id, name, kerajaanId, birthdate, deathdate, description, photoUrl);
}

export const removeTokoh = async(id: number) => {
  const existingTokoh = await getTokohById(id);
  if (!existingTokoh) {
    throw AppError("Tokoh not found", 404);
  }
  return await deleteTokoh(id);
}

export const listAllTokoh = async (page: number = 1, pageSize: number = 10) => {
  return await getAllTokoh(page, pageSize);
}

export const getTokoh = async(id: number) => {
  const existingTokoh = await getTokohById(id);
  if (!existingTokoh) {
    throw AppError("Tokoh not found", 404);
  }
  return existingTokoh;
}
