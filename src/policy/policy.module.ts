import { Module } from '@nestjs/common';
import { PolicyService } from './policy.service';
import { PolicyController } from './policy.controller';
import { QueryDto } from './dto/query.dto';
import { CohereService } from 'src/cohere/cohere.service';
@Module({
  providers: [PolicyService, QueryDto, CohereService],
  controllers: [PolicyController],
})
export class PolicyModule {}
