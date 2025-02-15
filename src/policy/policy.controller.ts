import { Controller, Get } from '@nestjs/common';
import { PolicyService } from './policy.service';

@Controller('policy')
export class PolicyController {
  constructor(private readonly policyService: PolicyService) {}
  @Get('file')
  async file() {
    return this.policyService.filesPuller;
  }

  @Get('test')
  async prompt() {
    return this.policyService.chatTest();
  }
}
