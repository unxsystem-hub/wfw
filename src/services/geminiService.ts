import type { ImagePart, EditedImageResult, CinematicDetails } from '../types';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

async function callGeminiEdit(prompt: string, images: ImagePart[], cinematicDetails: CinematicDetails) {
  if (!API_KEY) throw new Error('VITE_GEMINI_API_KEY not set in environment.');
  // Note: update endpoint if your GenAI account requires a different path
  const url = 'https://generative.googleapis.com/v1/images:edit?key=' + encodeURIComponent(API_KEY);

  const body: any = {
    prompt,
    size: cinematicDetails?.aspectRatio || '1024x1024',
    images: images.map(i => i.data)
  };

  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  if (!resp.ok) {
    const txt = await resp.text();
    throw new Error('Gemini Images API error: ' + resp.status + ' ' + txt);
  }
  const data = await resp.json();
  const b64 = data?.data?.[0]?.b64_json || data?.images?.[0] || data?.artifacts?.[0]?.base64;
  if (!b64) throw new Error('No image returned from Gemini. Raw:' + JSON.stringify(data).slice(0,300));
  return b64;
}

export async function editImage(images: ImagePart[], prompt: string, cinematicDetails: CinematicDetails): Promise<EditedImageResult> {
  const b64 = await callGeminiEdit(prompt, images, cinematicDetails);
  return { newImage: b64, responseText: '' };
}