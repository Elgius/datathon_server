import { Body, Controller, Get, Post } from '@nestjs/common';
import { PolicyService } from './policy.service';
import { QueryDto } from './dto/query.dto';

@Controller('policy')
export class PolicyController {
  constructor(private readonly policyService: PolicyService) {}
  @Get('file')
  async file() {
    return this.policyService.filesPuller();
  }

  @Get('test')
  async prompt() {
    return this.policyService.chatTest();
  }

  @Post('chat')
  async chatqueries(@Body() query: QueryDto) {
    return this.policyService.chatqueries(query);
  }
}
