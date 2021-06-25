import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).end();
  }

  const [, token] = authToken.split(" ");

  try {
    // Valida se o token está válido
    const { sub } = verify(token, "9440868299ac1571a7a63a0ae994aff7") as IPayload;

    // Recupera as informações do usuário
    request.user_id = sub;

    return next();
  } catch (err) {
    return response.status(401).end();
  }

}