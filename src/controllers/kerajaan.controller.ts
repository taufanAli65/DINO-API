import { addKerajaan, editKerajaan, removeKerajaan, listAllKerajaan, getKerajaan } from "../services/kerajaan.service";
import { Request, Response } from "express";
import { sendSuccess, sendFail } from "../utils/send_responses";
import { AppError } from "../utils/app_error";
import { supabase } from '../lib/supabase';
import path from 'path';

async function uploadPhotoToSupabase(file: Express.Multer.File): Promise<string> {
  const ext = path.extname(file.originalname);
  const fileName = `kerajaan/${Date.now()}_${Math.random().toString(36).substring(2)}${ext}`;
  const { error } = await supabase.storage.from('photos').upload(fileName, file.buffer, {
    contentType: file.mimetype,
    upsert: false,
  });
  if (error) throw AppError('Failed to upload image', 500);
  const { data } = supabase.storage.from('photos').getPublicUrl(fileName);
  return data.publicUrl;
}

async function deletePhotoFromSupabase(photoUrl: string) {
  if (!photoUrl) return;
  const urlParts = photoUrl.split('/photos/');
  if (urlParts.length < 2) return;
  const filePath = urlParts[1];
  await supabase.storage.from('photos').remove([filePath]);
}

export const createKerajaanController = async (req: Request, res: Response) => {
  try {
    const { name, startdate, enddate, king_name, description } = req.body;
    let photoUrl = req.body.photoUrl;
    if (!name || !startdate || !enddate || !king_name || !description) {
        throw AppError("All fields are required", 400);
    }
    if (req.file) {
      photoUrl = await uploadPhotoToSupabase(req.file);
    }
    const newKerajaan = await addKerajaan(name, new Date(startdate), new Date(enddate), king_name, description, photoUrl);
    const data = {
        id: newKerajaan.id,
        name: newKerajaan.name,
        startdate: newKerajaan.startdate,
        enddate: newKerajaan.enddate,
        king_name: newKerajaan.king_name,
        description: newKerajaan.description,
        photoUrl: newKerajaan.photoUrl,
    }
    sendSuccess(res, 200, "Kerajaan created successfully", data);
  } catch (error) {
    sendFail(res, 500, "Failed to create Kerajaan", error);
  }
}

export const updateKerajaanController = async (req: Request, res: Response) => {
  try {
    const kerajaanId = parseInt(req.params.id);
    const { name, startdate, enddate, king_name, description } = req.body;
    let photoUrl = req.body.photoUrl;
    if (!kerajaanId) {
        throw AppError("Invalid Kerajaan ID", 400);
    }
    let oldPhotoUrl: string | null = null;
    if (req.file) {
      const kerajaan = await getKerajaan(kerajaanId);
      oldPhotoUrl = kerajaan.photoUrl;
      photoUrl = await uploadPhotoToSupabase(req.file);
    }
    if (oldPhotoUrl && photoUrl && oldPhotoUrl !== photoUrl) {
      await deletePhotoFromSupabase(oldPhotoUrl);
    }
    const updatedKerajaan = await editKerajaan(kerajaanId, name, startdate ? new Date(startdate) : null, enddate ? new Date(enddate) : null, king_name, description, photoUrl);
    const data = {
        id: updatedKerajaan?.id,
        name: updatedKerajaan?.name,
        startdate: updatedKerajaan?.startdate,
        enddate: updatedKerajaan?.enddate,
        king_name: updatedKerajaan?.king_name,
        description: updatedKerajaan?.description,
        photoUrl: updatedKerajaan?.photoUrl,
    }
    sendSuccess(res, 200, "Kerajaan updated successfully", data);
  } catch (error) {
    sendFail(res, 500, "Failed to update Kerajaan", error);
  }
}

export const deleteKerajaanController = async (req: Request, res: Response) => {
  try {
    const kerajaanId = parseInt(req.params.id);
    if (!kerajaanId) {
        throw AppError("Invalid Kerajaan ID", 400);
    }
    await removeKerajaan(kerajaanId);
    sendSuccess(res, 200, "Kerajaan deleted successfully");
  } catch (error) {
    sendFail(res, 500, "Failed to delete Kerajaan", error);
  }
}

export const getAllKerajaanController = async (req: Request, res: Response) => {
  try {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize as string) : 10;
    const kingdoms = await listAllKerajaan(page, pageSize);
    sendSuccess(res, 200, "Kerajaan list fetched successfully", kingdoms);
  } catch (error) {
    sendFail(res, 500, "Failed to fetch Kerajaan list", error);
  }
}

export const getKerajaanByIdController = async (req: Request, res: Response) => {
  try {
    const kerajaanId = parseInt(req.params.id);
    if (!kerajaanId) {
        throw AppError("Invalid Kerajaan ID", 400);
    }
    const kerajaan = await getKerajaan(kerajaanId);
    sendSuccess(res, 200, "Kerajaan fetched successfully", kerajaan);
  } catch (error) {
    sendFail(res, 500, "Failed to fetch Kerajaan", error);
  }
}