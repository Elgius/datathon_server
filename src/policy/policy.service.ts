import { Injectable } from '@nestjs/common';

@Injectable()
export class PolicyService {
  async filesPuller() {
    const files = ['file1, file2, file4'];
    return files;
  }
}
