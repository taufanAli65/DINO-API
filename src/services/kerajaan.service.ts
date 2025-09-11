import { createKerajaan, updateKerajaan, deleteKerajaan, getKerajaanById, getAllKerajaan } from '../repositories/kerajaan.repository';
import { AppError } from '../utils/app_error';

export const addKerajaan = async(name: string, startdate: Date, enddate: Date, king_name: string, description: string) => {
  return await createKerajaan(name, startdate, enddate, king_name, description);
}

export const editKerajaan = async(id: number, name?: string | null, startdate?: Date | null, enddate?: Date | null, king_name?: string | null, description?: string | null) => {
  const existingKerajaan = await getKerajaanById(id);
  if (!existingKerajaan) {
    throw AppError("Kerajaan not found", 404);
  }
  return await updateKerajaan(id, name, startdate, enddate, king_name, description);
}

export const removeKerajaan = async(id: number) => {
  const existingKerajaan = await getKerajaanById(id);
  if (!existingKerajaan) {
    throw AppError("Kerajaan not found", 404);
  }
  return await deleteKerajaan(id);
}

export const listAllKerajaan = async (page: number = 1, pageSize: number = 10) => {
  return await getAllKerajaan(page, pageSize);
}

export const getKerajaan = async(id: number) => {
  const existingKerajaan = await getKerajaanById(id);
  if (!existingKerajaan) {
    throw AppError("Kerajaan not found", 404);
  }
  return existingKerajaan;
}