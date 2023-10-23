import { NextResponse } from 'next/server';
import mysql from 'serverless-mysql';

const _pool = mysql({
  config: {
    host: process.env.DB_HOST,
    port: 3306,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
});

const getWithResponse = async (query: string, params: string[]): Promise<NextResponse> => {
  try {
    const { data, status } = await get<string | null>(query, params);
    return new NextResponse(data, { status });
  } catch (e) {
    return new NextResponse('Ocurrió un error interno del servidor al procesar la solicitud.', { status: 500 });
  }
};

const get = <T>(query: string, params: string[]): Promise<Data<T>> =>
  new Promise(async (resolve, reject) => {
    try {
      const result = await _pool.query<[]>(query, params);
      result.length ? resolve({ data: result as T, status: 200 }) : resolve({ data: null as T, status: 204 });
    } catch (err) {
      const { message } = err as Error;
      console.log(message);
      reject();
    }
  });

const crud = (query: String, params: string[]): Promise<void> =>
  new Promise(async (resolve, reject) => {
    try {
      const { affectedRows } = await _pool.query<CrudResponse>(query, params);
      affectedRows ? resolve() : reject();
    } catch (err) {
      const error = err as Error;
      console.log(error);
      reject();
    }
  });

interface Data<T> {
  data: T;
  status: number;
}

interface CrudResponse {
  affectedRows: number;
}

const query = {
  get,
  getWithResponse,
  crud,
};

export default query;
