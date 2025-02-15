import { Module } from '@nestjs/common';
import { PolicyService } from './policy.service';
import { PolicyController } from './policy.controller';
import { QueryDto } from './dto/query.dto';
@Module({
  providers: [PolicyService, QueryDto],
  controllers: [PolicyController],
})
export class PolicyModule {}
