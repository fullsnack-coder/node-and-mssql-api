export type PlateElem = {
  id: string;
  Nombre: string;
  Precio: number;
  Categoría: string;
};

export type PlatesResponseSuccess = {
  ok: boolean;
  data: {
    results: PlateElem[];
    count: number;
  };
};

export type PlatesResponseFailure = {
  ok: boolean;
  error: {
    message: string;
  };
};
