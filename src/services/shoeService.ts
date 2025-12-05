import type { ImagePart } from '../types';
import { editImage } from './geminiService';

type Options = { personType: 'man'|'woman'|'child'; facialFeatures?: string; clothingStyle?: string; showShoeOnly?: boolean; sceneType?: 'cinematic'|'studio'|'street'; backgroundColor?: string; };

export async function generateShoeEdit(images: ImagePart[], options: Options) {
  const { personType, facialFeatures, clothingStyle, showShoeOnly, sceneType, backgroundColor } = options;
  const lines: string[] = [];
  lines.push(`Place the uploaded shoe on a ${personType}.`);
  if (showShoeOnly) lines.push(`Show only the shoe on the ${personType}, tightly cropped to emphasize footwear.`);
  else lines.push(`Show the full ${personType} wearing the shoe with realistic proportions.`);
  if (facialFeatures) lines.push(`Facial features: ${facialFeatures}.`);
  if (clothingStyle) lines.push(`Clothing style: ${clothingStyle}.`);
  if (sceneType) lines.push(`Scene style: ${sceneType}, cinematic lighting.`);
  if (backgroundColor) lines.push(`Background color: ${backgroundColor}.`);
  lines.push('High-quality, photorealistic rendering, sharp detail on shoe textures and materials.');
  const prompt = lines.join(' ');
  const cinematicDetails = { aspectRatio: '1024x1024', quality: 'high' };
  return await editImage(images, prompt, cinematicDetails);
}