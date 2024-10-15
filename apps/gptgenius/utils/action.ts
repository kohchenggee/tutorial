'use server';
import OpenAI from 'openai';
import { ChatCompletionMessage } from 'openai/resources';
import prisma from './db';
import { revalidatePath } from 'next/cache';

export type TourObject = { city: string; country: string };
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const generateChatResponse = async (
  chatMessage: ChatCompletionMessage[]
) => {
  try {
    const response = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are a helpful assistant' },
        ...chatMessage,
      ],
      model: 'gpt-4',
      temperature: 0,
    });
    return response.choices[0].message;
  } catch (err) {
    return null;
  }
};

export const getExistingTour = async ({ city, country }: TourObject) => {
  return await prisma.tour.findUnique({
    where: {
      city_country: {
        city,
        country,
      },
    },
  });
};

export const generateTourResponse = async ({ city, country }: TourObject) => {
  const query = `Find a ${city} in this ${country}. 
  If ${city} in this ${country} exists, create a list of things families can do in this ${city},${country}.
  Once you have a list, create a one-day tour. Response should be in the following JSON format: 
  {
    "tour": {
      "city": "${city}",
      "country": "${country}",
      "title": "title of the tour",
      "description": "description of the city and tour",
      "stops": ["short paragraph on the stop 1 ", "short paragraph on the stop 2", "short paragraph on the stop 3"]
    }
  }
  If you can't find infor on exact ${city}, or ${city} does not existm or it's population is less than 1, or it is not located in the following ${country} return {"tour":null}, with no additional characters.`;
  try {
    const response = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are a tour guide' },
        { role: 'user', content: query },
      ],
      model: 'gpt-4',
      temperature: 0,
    });
    const tourData = JSON.parse(response?.choices?.[0]?.message?.content || '');
    if (!tourData.tour) {
      return null;
    }
    return tourData.tour;
  } catch (err) {
    return null;
  }
  return null;
};
export const createNewTour = async (tour: any) => {
  return await prisma.tour.create({ data: tour });
};

export const getAllTours = async (searchTerm= '') => {
  if (!searchTerm) {
    const tours = await prisma.tour.findMany({
      orderBy: {
        city: 'asc',
      },
    });
    return tours;
  }

  const tours = await prisma.tour.findMany({
    where: {
      OR: [
        { city: { contains: searchTerm } },
        { country: { contains: searchTerm } },
      ],
    },
    orderBy: {
      city: 'asc',
    },
  });
  return tours;
};

export const getSingleTour = async (id: string) => {
  return await prisma.tour.findUnique({
    where: {
      id,
    },
  });
};

export const generateTourImage = async ({ city, country }: TourObject) => {
  try {
    const tourImage = await openai.images.generate({
      prompt: `a panoramic view of the ${city} ${country}`,
      n: 1,
      size: '512x512',
    });
    return tourImage?.data[0]?.url;
  } catch (e) {
    return null;
  }
};

export const fetchUserTokensById = async (clerkId: string) => {
  const result = await prisma.token.findUnique({
    where: {
      clerkId,
    },
  });
  return result?.tokens;
};

export const generateUserTokensForId = async (clerkId: string) => {
  const result = await prisma.token.create({
    data: {
      clerkId,
    },
  });
  return result?.tokens;
};

export const fetchOrGenerateTokens = async (clerkId: string) => {
  const result = await fetchUserTokensById(clerkId);
  if (result) {
    return result;
  }

  return await generateUserTokensForId(clerkId);
};

export const subtractTokens = async (clerkId: string, tokens: number) => {
  const res = await prisma.token.update({
    where: {
      clerkId,
    },
    data: {
      tokens: {
        decrement: tokens,
      },
    },
  });
  revalidatePath('/profile');
  return res.tokens;
};
