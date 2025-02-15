import { Injectable } from '@nestjs/common';
import client from 'src/Client';

@Injectable()
export class PolicyService {
  async filesPuller() {
    const files = ['file1, file2, file4'];
    return files;
  }

  async chatTest() {
    const prompt = `You are a data scientist name james, please communicate as one`;

    try {
      const response = await client.messages.create({
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        model: 'claude-3-5-sonnet-latest',
        max_tokens: 1024,
      });

      return response.content[0];
    } catch (error) {
      console.error('Error in chatTest:', error);
      throw new Error('Failed to get AI response');
    }
  }
}
