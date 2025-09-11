import { addTokoh, editTokoh, removeTokoh, listAllTokoh, getTokoh } from "../services/tokoh.service";
import { Request, Response } from "express";
import { sendSuccess, sendFail } from "../utils/send_responses";
import { AppError } from "../utils/app_error";

export const createTokohController = async (req: Request, res: Response) => {
  try {
    const { name, kerajaanId, birthdate, deathdate, description, photoUrl } = req.body;
    if (!name || !kerajaanId || !birthdate || !description) {
        throw AppError("All fields except deathdate and photoUrl are required", 400);
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
    const { name, kerajaanId, birthdate, deathdate, description, photoUrl } = req.body;
    if (!tokohId) {
        throw AppError("Invalid Tokoh ID", 400);
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
