import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/utils/prisma';

const getResult = async (req: NextApiRequest, res: NextApiResponse) => {
  const { roomName } = req.query;
  const roomID = await prisma.room.findFirst({
    where: {
      ...(roomName !== undefined &&
        !Array.isArray(roomName) && { room_name: roomName }),
    },
  });

  const result = await prisma.room_state.findMany({
    orderBy: {
      created_date: 'desc',
    },
    take: 1,
    where: {
      ...(roomID !== null && !Array.isArray(roomID) && { room_id: roomID.id }),
    },
    select: {
      created_date: true,
      co2: true,
      humidity: true,
      light: true,
      pir: true,
      temperature: true,
    },
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
