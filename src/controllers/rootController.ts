import { Request, Response } from 'express';

const rootController = (req: Request, res: Response): Response => {
  return res.json({
    ok: true,
    message: 'API root path',
  });
};

export default rootController;
