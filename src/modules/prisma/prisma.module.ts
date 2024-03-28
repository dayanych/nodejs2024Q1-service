import { Module } from '@nestjs/common';
import { PrismaRepository } from './data/prisma.repository';

@Module({
  providers: [PrismaRepository],
  exports: [PrismaRepository],
})
export class PrismaModule {}
