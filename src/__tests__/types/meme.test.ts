import { z } from "zod";

import { Meme } from "@/types/meme";

const MemeSchema = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string().url(),
});

test('Meme Schema', () => {
  const validMeme: Meme = { id: '1', name: 'Test Meme', url: 'https://example.com/meme.png' };

  expect(validMeme).toHaveProperty('id');
  expect(validMeme).toHaveProperty('name');
  expect(validMeme).toHaveProperty('url');

  expect(MemeSchema.parse(validMeme)).toEqual(validMeme);
  // expect(() => MemeSchema.parse(invalidMeme)).toThrow();
});
