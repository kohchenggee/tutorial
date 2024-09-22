'use server';

import { revalidatePath } from 'next/cache';
import prisma from './db';

export const deleteTask = async (formData: FormData) => {
  const id = formData.get('id') as string;
  await prisma.task.delete({
    where: { id },
  });
  revalidatePath('/tasks');
};
