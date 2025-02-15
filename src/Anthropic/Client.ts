import Anthropic from '@anthropic-ai/sdk';

const key = process.env.ANTHROPIC_KEY;

const client = new Anthropic({
  apiKey: key,
});

export default client;
