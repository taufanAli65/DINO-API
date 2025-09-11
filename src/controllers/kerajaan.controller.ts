import { addKerajaan, editKerajaan, removeKerajaan, listAllKerajaan, getKerajaan } from "../services/kerajaan.service";
import { Request, Response } from "express";
import { sendSuccess, sendFail } from "../utils/send_responses";
import { AppError } from "../utils/app_error";

export const createKerajaanController = async (req: Request, res: Response) => {
  try {
    const { name, startdate, enddate, king_name, description } = req.body;
    if (!name || !startdate || !enddate || !king_name || !description) {
        throw AppError("All fields are required", 400);
    }
    const newKerajaan = await addKerajaan(name, new Date(startdate), new Date(enddate), king_name, description);
    const data = {
        id: newKerajaan.id,
        name: newKerajaan.name,
        startdate: newKerajaan.startdate,
        enddate: newKerajaan.enddate,
        king_name: newKerajaan.king_name,
        description: newKerajaan.description,
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
    if (!kerajaanId) {
        throw AppError("Invalid Kerajaan ID", 400);
    }
    const updatedKerajaan = await editKerajaan(kerajaanId, name, startdate ? new Date(startdate) : null, enddate ? new Date(enddate) : null, king_name, description);
    const data = {
        id: updatedKerajaan?.id,
        name: updatedKerajaan?.name,
        startdate: updatedKerajaan?.startdate,
        enddate: updatedKerajaan?.enddate,
        king_name: updatedKerajaan?.king_name,
        description: updatedKerajaan?.description,
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