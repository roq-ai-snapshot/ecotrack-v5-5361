import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { environmentalGoalValidationSchema } from 'validationSchema/environmental-goals';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getEnvironmentalGoals();
    case 'POST':
      return createEnvironmentalGoal();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getEnvironmentalGoals() {
    const data = await prisma.environmental_goal
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'environmental_goal'));
    return res.status(200).json(data);
  }

  async function createEnvironmentalGoal() {
    await environmentalGoalValidationSchema.validate(req.body);
    const body = { ...req.body };

    const data = await prisma.environmental_goal.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
