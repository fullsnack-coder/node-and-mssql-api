import Connection from '../db/Connection';
import { Request, Response } from 'express';

export const getCategories = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const objConnect = new Connection();
    await objConnect.getConnection().connect();
    const result = await objConnect.runQuery({
      type: 'procedure',
      statement: 'SP_CONSULTA_CATEGORIAS',
    });
    await objConnect.closeConnection();
    return res.json({
      ok: true,
      data: {
        results: result.recordset || [],
        count: result.rowsAffected[0] || 0,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      error: {
        message: 'Internal error',
      },
    });
  }
};
