import { prisma } from '../utils/prisma'

const defaultMessageCount = 10

export function findLastNMessagesEachUser (
  userId: number, messageCount = defaultMessageCount
) {
  return prisma.message.findMany({
    where: {
      OR: [{ fromUserId: userId }, { toUserId: userId }]
    },
    take: -messageCount
  })
}

export function findNMessagesBeforeId (
  userAId: number, userBId: number, messageId: number, messageCount = defaultMessageCount
) {
  return prisma.message.findMany({
    where: {
      OR: [{ fromUserId: userAId, toUserId: userBId },
        { fromUserId: userBId, toUserId: userAId }]
    },
    cursor: { id: messageId },
    skip: 1,
    take: -messageCount
  })
}
