import { Request, Response } from "express";

const rootController = (req: Request, res: Response): Response => {
  return res.send("Root Dir");
};

export default rootController;
