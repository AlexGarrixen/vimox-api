import { Request, Response, NextFunction } from 'express';
import { TypeModel } from '../../models/type';

interface Querys {
  name?: string;
}

const makeFilter = ({ name }: Pick<Querys, 'name'>) => {
  const filter: Record<string, unknown> = {};

  if (name) filter.name = { $regex: new RegExp(name, 'gi') };

  return filter;
};

export const findTypes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name }: Querys = req.query;
  const filter = makeFilter({ name });

  try {
    const response = await TypeModel.find(filter);
    res.status(200).json(response);
  } catch (reason) {
    next(reason);
  }
};
