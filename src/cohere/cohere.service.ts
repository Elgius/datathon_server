import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class CohereService {
  async embedder(query: string) {
    const response = await this.cohere_embedder(query);

    return response;
  }

  private async cohere_embedder(query: string) {
    const jina_api = process.env.JINA_API_KEY;

    if (!jina_api) {
      throw new Error('JINA_API_KEY not found in environment variables');
    }

    try {
      const response = await fetch('https://api.jina.ai/v1/embeddings', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${jina_api}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input: [query],
          model: 'jina-embeddings-v3',
        }),
      });

      const data = await response.json();

      if (!data?.data?.[0]?.embedding) {
        throw new Error('No embedding returned from Jina AI');
      }

      return data.data[0].embedding;
    } catch (error) {
      console.error('Jina AI embedding error:', error);
      throw new Error(`Embedding generation failed: ${error.message}`);
    }
  }
}

// embed-english-v3.0
