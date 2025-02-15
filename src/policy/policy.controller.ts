import { Controller, Get } from '@nestjs/common';

@Controller('policy')
export class PolicyController {
  @Get('file')
  async file() {
    const files = ['file1, file2, file4'];

    return files;
  }
}
