import { Request, Response } from 'express';
import Connection from 'src/db/Connection';
import { PlatesResponseFailure, PlatesResponseSuccess } from './types';

const getIngredientsByPlate = async (
  req: Request,
  res: Response
): Promise<Response<PlatesResponseSuccess | PlatesResponseFailure>> => {
  try {
    const { plateId } = req.body;
    if (!plateId) {
      return res.status(403).json({
        ok: false,
        error: {
          message: 'Bad request',
        },
      });
    }
    const objConnect = new Connection();
    await objConnect.getConnection().connect();
    const results = await objConnect.runQuery({
      statement: 'SP_CONSULTA_INGREDIENTES_POR_PLATO',
      type: 'procedure',
      params: {
        id_plato: plateId,
      },
    });
    return res.json({
      ok: true,
      data: {
        results: results?.recordset || [],
        count: results?.rowsAffected[0] || 0,
      },
    });
  } catch (error) {
    console.error(error);
    console.log('Error at getIngredients method');
    return res.status(500).json({
      ok: false,
      error: {
        message: 'Internal server error',
      },
    });
  }
};

export default {
  getIngredientsByPlate,
};
