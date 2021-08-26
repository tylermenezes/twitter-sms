const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports.getLastProcessedId = async function getLastProcessedId(account) {
  const tweet = await prisma.processedTweet.findFirst({
    where: { account },
    orderBy: { postedAt: 'desc' }
  });
  return tweet?.id;
}

module.exports.markTweetProcessed = async function markTweetProcessed(id, account, postedAt) {
  await prisma.processedTweet.create({
    data: {
      id,
      account,
      postedAt,
    },
  });
}

module.exports.getSubscribers = async function getSubscribers() {
  return (await prisma.subscription.findMany()).map((s) => s.phoneNumber);
}

module.exports.subscribe = async function subscribe(phoneNumber) {
  await prisma.subscription.create({
    data: {
      phoneNumber,
    },
  });
}

module.exports.unsubscribe = async function unsubscribe(phoneNumber) {
  await prisma.subscription.delete({
    where: {
      phoneNumber,
    },
  });
}
