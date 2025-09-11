import { prisma } from '../lib/prisma';
import { Tokoh } from '@prisma/client';

export const getTokohById = async(id: number): Promise<Tokoh | null> => {
  return prisma.tokoh.findUnique({
    where: { id }
  })
}

export const getAllTokoh = async (page: number, pageSize: number): Promise<Tokoh[] | null> => {
  const skip = (page - 1) * pageSize;
  const take = pageSize;
  return prisma.tokoh.findMany({
    skip,
    take,
  });
};

export const createTokoh = async(name: string, kerajaanId: number, birthdate: Date, deathdate: Date | null, description: string, photoUrl?: string): Promise<Tokoh> => {
  return prisma.tokoh.create({
    data: {
      name,
      kerajaanId,
      birthdate,
      deathdate,
      description,
      photoUrl
    }
  })
}

export const updateTokoh = async(id: number, name?: string | null, kerajaanId?: number | null, birthdate?: Date | null, deathdate?: Date | null, description?: string | null, photoUrl?: string | null): Promise<Tokoh | null> => {
  const dataToUpdate: any = {};
  if(name != undefined && name != null) dataToUpdate.name = name;
  if(kerajaanId != undefined && kerajaanId != null) dataToUpdate.kerajaanId = kerajaanId;
  if(birthdate != undefined && birthdate != null) dataToUpdate.birthdate = birthdate;
  if(deathdate != undefined) dataToUpdate.deathdate = deathdate;
  if(description != undefined && description != null) dataToUpdate.description = description;
  if(photoUrl != undefined && photoUrl != null) dataToUpdate.photoUrl = photoUrl;

  return prisma.tokoh.update({
    where: { id },
    data: dataToUpdate
  })
}

export const deleteTokoh = async(id: number) => {
  return prisma.tokoh.delete({
    where: { id }
  })
}
