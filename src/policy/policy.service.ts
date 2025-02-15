import { Injectable } from '@nestjs/common';
import client from 'src/Client';
import { QueryDto } from './dto/query.dto';

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

  async chatqueries(query: QueryDto) {
    // add when policy useState is available in the frontend
    // let condition = 'false';

    // if (query.policy) {
    //   condition = 'true';
    // }

    const prompt = `
    You are a data scientist named Insight. you will be looking in to a query and answer based on your knowledge if the policy is good or something similar was implemented before (with supporting evidence) in countries around the world.

    return the response in json format. below is an example of the response:

    {
      "condition": "true",
      "response": "The policy is good and something similar was implemented before in countries around the world."
    }

    policy: ${query.query}
    `;

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
      console.error('Error in chatqueries:', error);
      throw new Error('Failed to get AI response');
    }
  }
}
