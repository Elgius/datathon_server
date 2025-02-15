import { Injectable } from '@nestjs/common';
import client from 'src/Client';
import { QueryDto } from './dto/query.dto';

import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class PolicyService {
  async filesPuller() {
    const files = {
      tourist_arrivals: [
        { year: 2021, arrivals: 1321936 },
        { year: 2022, arrivals: 1675303 },
      ],
      registered_bed_capacity: [
        { year: 2021, beds: 54610 },
        { year: 2022, beds: 59132 },
      ],
      beds_in_operation: [
        { year: 2021, beds: 48960 },
        { year: 2022, beds: 57254 },
      ],
      tourist_bed_nights: [
        { year: 2021, bed_nights: 10073404 },
        { year: 2022, bed_nights: 12260009 },
      ],
      bed_utilization_rate: [
        { year: 2021, rate: 56.1 },
        { year: 2022, rate: 58.9 },
      ],
      tourism_gdp_contribution: [
        { year: 2015, contribution: 23.0 },
        { year: 2016, contribution: 22.8 },
        { year: 2017, contribution: 23.5 },
        { year: 2018, contribution: 22.7 },
        { year: 2019, contribution: 22.0 },
        { year: 2020, contribution: 16.0 },
        { year: 2021, contribution: 20.3 },
        { year: 2022, contribution: 22.1 },
      ],
      employment_by_nationality: [
        { category: 'Total Maldivian', percentage: 41 },
        { category: 'Total Foreign', percentage: 59 },
      ],
      employment_by_gender: [
        { category: 'Total Male', percentage: 89 },
        { category: 'Total Female', percentage: 11 },
      ],
      employment_by_bed_capacity: [
        { category: '<50', employees: 791 },
        { category: '50-150', employees: 13756 },
        { category: '151-250', employees: 16142 },
        { category: '251-350', employees: 13530 },
        { category: '>351', employees: 11655 },
      ],
      employment_by_area: [
        { category: 'Accommodation Services', percentage: 23 },
        { category: 'Food and Beverages Services', percentage: 33 },
        { category: 'Passenger Transport', percentage: 5 },
        { category: 'Sports, Cultural, Recreational', percentage: 3 },
        { category: 'Administrative Services', percentage: 15 },
        { category: 'Other', percentage: 21 },
      ],
    };
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

  // function needs to be rewritten cuz i got the vector dimensions wrong

  // async dataPuller() {
  //   try {
  //     const prompt = 'pull all the available datasets in this pdf';

  //     if (!process.env.PINECONE_INDEX_NAME) {
  //       throw new Error('PINECONE_INDEX_NAME environment variable is not set');
  //     }

  //     const index = pinecone.Index(process.env.PINECONE_INDEX_NAME);

  //     // Get vector embedding
  //     const prompt_vector = await this.cohereService.embedder(prompt);
  //     if (!prompt_vector) {
  //       throw new Error('Failed to generate vector embedding');
  //     }

  //     // Query Pinecone
  //     const response = await index.query({
  //       topK: 10,
  //       includeValues: true,
  //       includeMetadata: true,
  //       vector: prompt_vector,
  //     });

  //     if (!response?.matches) {
  //       throw new Error('Invalid response from Pinecone');
  //     }

  //     // Extract and join contexts
  //     const contexts = response.matches
  //       .map((match) => match.metadata?.text || '')
  //       .join('\n');

  //     if (!contexts) {
  //       throw new Error('No context found in matches');
  //     }

  //     const superContext = `
  //     using the following context:

  //     ${contexts}

  //     create a json response that can be used by recharts to create a line chart.
  //     `;

  //     if (!client) {
  //       throw new Error('AI client not initialized');
  //     }

  //     const info = await client.messages.create({
  //       messages: [
  //         {
  //           role: 'user',
  //           content: superContext,
  //         },
  //       ],
  //       model: 'claude-3-sonnet',
  //       max_tokens: 1024,
  //     });

  //     if (!info?.content?.[0]) {
  //       throw new Error('Invalid AI response');
  //     }

  //     return info;
  //   } catch (error) {
  //     console.error('Error in dataPuller:', error);
  //     throw new Error(
  //       error instanceof Error
  //         ? `Failed to pull data: ${error.message}`
  //         : 'Failed to pull data',
  //     );
  //   }
  // }

  async chatqueries(query: QueryDto) {
    // add when policy useState is available in the frontend
    // let condition = 'false';

    // if (query.policy) {
    //   condition = 'true';
    // }

    const prompt = `
    You are a data scientist named Insight. you will be looking in to a query and answer based on your knowledge if the policy is good or something similar was implemented before (with supporting evidence) in countries around the world.
    If you are not sure about the policy, you should say "I don't know"
    If the policy is not implemented yet, you should say "The policy is not implemented yet"
    Give a forecast of the policy if it is implemented in the next 10 years. the country is Maldives.
    Give an object called Forecast data that shows the forecast come as a recharts line chart.

    return the response in json format. below is an example of the response:

    {
      "response": "The policy is good and something similar was implemented before in countries around the world.",
      "forecast": "The policy if the policy is to be implemented in the next 10 years...."
      "forecast_data": {
        "xValues": [2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034],
        "yValues": [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]
      }
      "user_query": "query"
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

      const cleanedResponse = await this.cleaner(response.content[0]);

      return cleanedResponse;
    } catch (error) {
      console.error('Error in chatqueries:', error);
      throw new Error('Failed to get AI response');
    }
  }

  private async cleaner(response) {
    try {
      const cleanedData = JSON.parse(response.text);
      return cleanedData;
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return null;
    }
  }
}
