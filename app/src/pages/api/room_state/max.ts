import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/utils/prisma';

const getResult = async (req: NextApiRequest, res: NextApiResponse) => {
  const { co2, humidity, light, pir, temperature } = req.query;

  const result = await prisma.room_state.findMany({
    orderBy: {
      ...(co2 !== undefined && !Array.isArray(co2) && { co2: 'desc' }),
      ...(humidity !== undefined &&
        !Array.isArray(humidity) && { humidity: 'desc' }),
      ...(light !== undefined && !Array.isArray(light) && { light: 'desc' }),
      ...(pir !== undefined && !Array.isArray(pir) && { pir: 'desc' }),
      ...(temperature !== undefined &&
        !Array.isArray(temperature) && { temperature: 'desc' }),
    },
    take: 1,
  });

  return res.status(200).json(result[0]);
};

const createArticle = async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200);
};

const updateArticle = async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200);
};

const deleteArticle = async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200);
};

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      return getResult(req, res);

    case 'POST':
      return createArticle(req, res);

    case 'PUT':
      return updateArticle(req, res);

    case 'DELETE':
      return deleteArticle(req, res);

    default:
      return res.status(404);
  }
};

export default handle;
