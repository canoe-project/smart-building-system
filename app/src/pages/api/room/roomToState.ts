import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/utils/prisma';
import { room_state } from '@prisma/client';

const getResult = async (req: NextApiRequest, res: NextApiResponse) => {
  const result = await prisma.room.findMany({
    orderBy: {
      created_date: 'desc',
    },
    include:{
      room_room_state:{
        include:{
          room_state: true
        },
        take:1,
      }
    }
  });

  return res.status(200).json(result);
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
