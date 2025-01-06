import { setupServer } from "msw/node";
import { rest } from "msw";

export function createServer(handlerConfig) {
  const handlers = handlerConfig.map((config) => {
    // 1- Pega a requisição e verifica se é get,post ou delete com config.method
    // 2- Verifica caminho da URL informado na requisição e os parametros chamados
    // 3- Retorna a função com o próprio retorno indicado na requisição.
    return rest[config.method || "get"](config.path, (req, res, ctx) => {
      return res(ctx.json(config.res(req, res, ctx)));
    });
  });

  const server = setupServer(...handlers);

  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });
}
