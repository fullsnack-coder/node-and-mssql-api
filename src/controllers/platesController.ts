import { Request, Response } from 'express';
import Connection from 'src/db/Connection';
import { PlatesResponseFailure, PlatesResponseSuccess } from './types';

const getAllPlates = async (
  req: Request,
  res: Response
): Promise<Response<PlatesResponseSuccess | PlatesResponseFailure>> => {
  const { category } = req.query;
  if (!category) {
    try {
      const objConnect = new Connection();
      await objConnect.getConnection().connect();
      const result = await objConnect.runQuery({
        statement: 'SP_CONSULTA_PLATOS',
        type: 'procedure',
      });
      await objConnect.closeConnection();
      return res.json({
        ok: true,
        data: {
          results: result?.recordset || [],
          count: result?.rowsAffected[0] || 0,
        },
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        error: {
          message: 'Internal error',
        },
      });
    }
  }
  // get plates by CATEGORY
  try {
    const objConnect = new Connection();
    await objConnect.getConnection().connect();
    const result = await objConnect.runQuery({
      statement: 'SP_CONSULTA_PLATOS_POR_CATEGORIA',
      type: 'procedure',
      params: {
        id_categoria: category.toString().toLowerCase() || '',
      },
    });
    await objConnect.closeConnection();
    return res.json({
      ok: true,
      data: {
        results: result?.recordset,
        count: result?.rowsAffected[0] || 0,
      },
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: {
        message: 'Internal error',
      },
    });
  }
};

const newPlate = (req: Request, res: Response): Response => {
  const { body } = req;
  return res.json({
    ok: true,
    message: `new plate created at: ${new Date()}`,
    data: body,
  });
};

const getPlatesByName = async (
  req: Request,
  res: Response
): Promise<Response<PlatesResponseSuccess | PlatesResponseFailure>> => {
  try {
    const { plateName } = req.body;
    const objConnect = new Connection();
    await objConnect.getConnection().connect();
    const result = await objConnect.runQuery({
      statement: 'SP_CONSULTA_PLATOS_POR_NOMBRE',
      type: 'procedure',
      params: {
        nombrePlato: plateName,
      },
    });
    return res.json({
      ok: true,
      data: {
        results: result?.recordset || [],
        count: result?.rowsAffected[0] || 0,
      },
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: {
        message: 'Internal error',
      },
    });
  }
};

const platesController = {
  getAllPlates,
  newPlate,
  getPlatesByName,
};

export default platesController;
