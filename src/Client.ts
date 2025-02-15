import { Anthropic } from '@anthropic-ai/sdk';
import * as dotenv from 'dotenv';

dotenv.config();

const key = process.env.KEY;

if (!key) {
  throw new Error('KEY environment variable is not set');
}

const client = new Anthropic({
  apiKey: key,
});

export default client;
