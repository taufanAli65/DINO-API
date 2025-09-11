import { addTokoh, editTokoh, removeTokoh, listAllTokoh, getTokoh } from "../services/tokoh.service";
import { Request, Response } from "express";
import { sendSuccess, sendFail } from "../utils/send_responses";
import { AppError } from "../utils/app_error";
import { supabase } from '../lib/supabase';
import path from 'path';

async function uploadPhotoToSupabase(file: Express.Multer.File): Promise<string> {
  const ext = path.extname(file.originalname);
  const fileName = `tokoh/${Date.now()}_${Math.random().toString(36).substring(2)}${ext}`;
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

export const createTokohController = async (req: Request, res: Response) => {
  try {
    const { name, kerajaanId, birthdate, deathdate, description } = req.body;
    let photoUrl = req.body.photoUrl;
    if (!name || !kerajaanId || !birthdate || !description) {
        throw AppError("All fields except deathdate and photoUrl are required", 400);
    }
    if (req.file) {
      photoUrl = await uploadPhotoToSupabase(req.file);
    }
    const newTokoh = await addTokoh(name, kerajaanId, new Date(birthdate), deathdate ? new Date(deathdate) : null, description, photoUrl);
    const data = {
        id: newTokoh.id,
        name: newTokoh.name,
        kerajaanId: newTokoh.kerajaanId,
        birthdate: newTokoh.birthdate,
        deathdate: newTokoh.deathdate,
        description: newTokoh.description,
        photoUrl: newTokoh.photoUrl,
    }
    sendSuccess(res, 200, "Tokoh created successfully", data);
  } catch (error) {
    sendFail(res, 500, "Failed to create Tokoh", error);
  }
}

export const updateTokohController = async (req: Request, res: Response) => {
  try {
    const tokohId = parseInt(req.params.id);
    const { name, kerajaanId, birthdate, deathdate, description } = req.body;
    let photoUrl = req.body.photoUrl;
    if (!tokohId) {
        throw AppError("Invalid Tokoh ID", 400);
    }
    let oldPhotoUrl: string | null = null;
    if (req.file) {
      const tokoh = await getTokoh(tokohId);
      oldPhotoUrl = tokoh.photoUrl;
      photoUrl = await uploadPhotoToSupabase(req.file);
    }
    if (oldPhotoUrl && photoUrl && oldPhotoUrl !== photoUrl) {
      await deletePhotoFromSupabase(oldPhotoUrl);
    }
    const updatedTokoh = await editTokoh(tokohId, name, kerajaanId, birthdate ? new Date(birthdate) : null, deathdate ? new Date(deathdate) : null, description, photoUrl);
    const data = {
        id: updatedTokoh?.id,
        name: updatedTokoh?.name,
        kerajaanId: updatedTokoh?.kerajaanId,
        birthdate: updatedTokoh?.birthdate,
        deathdate: updatedTokoh?.deathdate,
        description: updatedTokoh?.description,
        photoUrl: updatedTokoh?.photoUrl,
    }
    sendSuccess(res, 200, "Tokoh updated successfully", data);
  } catch (error) {
    sendFail(res, 500, "Failed to update Tokoh", error);
  }
}

export const deleteTokohController = async (req: Request, res: Response) => {
  try {
    const tokohId = parseInt(req.params.id);
    if (!tokohId) {
        throw AppError("Invalid Tokoh ID", 400);
    }
    await removeTokoh(tokohId);
    sendSuccess(res, 200, "Tokoh deleted successfully");
  } catch (error) {
    sendFail(res, 500, "Failed to delete Tokoh", error);
  }
}

export const getAllTokohController = async (req: Request, res: Response) => {
  try {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize as string) : 10;
    const tokohs = await listAllTokoh(page, pageSize);
    sendSuccess(res, 200, "Tokoh list fetched successfully", tokohs);
  } catch (error) {
    sendFail(res, 500, "Failed to fetch Tokoh list", error);
  }
}

export const getTokohByIdController = async (req: Request, res: Response) => {
  try {
    const tokohId = parseInt(req.params.id);
    if (!tokohId) {
        throw AppError("Invalid Tokoh ID", 400);
    }
    const tokoh = await getTokoh(tokohId);
    sendSuccess(res, 200, "Tokoh fetched successfully", tokoh);
  } catch (error) {
    sendFail(res, 500, "Failed to fetch Tokoh", error);
  }
}
