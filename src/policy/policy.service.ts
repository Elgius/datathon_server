import { Injectable } from '@nestjs/common';
import client from 'src/Anthropic/Client';

@Injectable()
export class PolicyService {
  async filesPuller() {
    const files = ['file1, file2, file4'];
    return files;
  }

  async chatTest() {
    const Prompt = `

    You are a data scientist name james, please communicate as one

    `;

    try {
      const response = await client.messages.create({
        messages: [
          {
            role: 'user',
            content: Prompt,
          },
        ],
        model: 'claude-3-5-haiku-latest',
        max_tokens: 1024,
      });

      const data = await response;

      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
