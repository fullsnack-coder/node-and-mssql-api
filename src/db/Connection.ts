import * as mssql from 'mssql';
import keys from '../config/keys';

const config = {
  ...keys.db,
  options: {
    encrypt: true,
    enableArithAbort: true,
  },
};

type RunQueryOptions = {
  statement: string;
  type: 'query' | 'procedure';
  params?: Record<string, unknown>;
};

class Connection {
  private connection: mssql.ConnectionPool;
  constructor() {
    this.connection = this.initConnection();
  }

  protected initConnection(): mssql.ConnectionPool {
    const connection = new mssql.ConnectionPool(config, (err) => {
      if (err) {
        throw err;
      }
    });
    return connection;
  }

  public async runQuery(
    opts: RunQueryOptions
  ): Promise<mssql.IResult<unknown>> {
    try {
      const { statement, type, params } = opts;
      if (type === 'query') {
        const result = await this.connection.query(statement);
        return result;
      } else {
        const request = new mssql.Request(this.connection);
        if (params) {
          Object.entries(params).forEach((el) => {
            const [key, value] = el;
            request.input(key, value);
          });
        }
        const resultProc = await request.execute(statement);
        return resultProc;
      }
    } catch (error) {
      console.error(error);
      console.log('Error at runQuery method...');
      throw new Error(error);
    }
  }

  public getConnection(): mssql.ConnectionPool {
    return this.connection;
  }

  public async closeConnection(): Promise<void> {
    await this.connection.close();
    console.log('Connection closed');
  }
}

export default Connection;
