import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export default prisma;

// Usage example in an async route:
// const users = await prisma.user.findMany();