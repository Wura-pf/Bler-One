import { PrismaService } from './prisma.service'

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaService | undefined
}

export const prisma =
  global.prisma ??
  new PrismaService()

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
}