import { prisma } from '../lib/prisma';
import { Kerajaan } from '@prisma/client';


export const getKerajaanById = async(id: number): Promise<Kerajaan | null> => {
  return prisma.kerajaan.findUnique({
    where: { id }
  })
}

export const getAllKerajaan = async (page: number, pageSize: number): Promise<Kerajaan[] | null> => {
  const skip = (page - 1) * pageSize;
  const take = pageSize;

  return prisma.kerajaan.findMany({
    skip,
    take,
  });
};


export const createKerajaan = async(name: string, startdate: Date, enddate: Date, king_name: string, description: string): Promise<Kerajaan> => {
  return prisma.kerajaan.create({
    data: {
      name,
      startdate,
      enddate,
      king_name,
      description
    }
  })
}

export const updateKerajaan = async(id: number, name?: string | null, startdate?: Date | null, enddate?: Date | null, king_name?: string | null, description?: string | null): Promise<Kerajaan | null> => {
  const dataToUpdate: any = {};
  if(name != undefined && name != null) dataToUpdate.name = name;
  if(startdate != undefined && startdate != null) dataToUpdate.startdate = startdate;
  if(enddate != undefined && enddate != null) dataToUpdate.enddate = enddate;
  if(king_name != undefined && king_name != null) dataToUpdate.king_name = king_name;
  if(description != undefined && description != null) dataToUpdate.description = description;

  return prisma.kerajaan.update({
    where: { id },
    data: dataToUpdate
  })
}

export const deleteKerajaan = async(id: number) => {
  prisma.$transaction(async (tx) => {
    await tx.kerajaan.delete({
      where: { id }
    })

    await tx.tokoh.deleteMany({
      where: { kerajaanId: id }
    })
  })
}