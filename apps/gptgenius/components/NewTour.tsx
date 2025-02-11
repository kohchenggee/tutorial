'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormEvent } from 'react';
import {
  TourObject,
  createNewTour,
  generateTourResponse,
  getExistingTour,
} from '../utils/action';
import toast from 'react-hot-toast';
import TourInfo from './TourInfo';

const NewTour = () => {
  const queryClient = useQueryClient();
  const {
    mutate,
    isPending,
    data: tour,
  } = useMutation({
    mutationFn: async (destination: TourObject) => {
      const existingTour = await getExistingTour(destination);
      if (existingTour) return existingTour;
      const newTour = await generateTourResponse(destination);
      if (newTour) {
        await createNewTour(newTour);
        queryClient.invalidateQueries({ queryKey: ['tours'] });
        return newTour;
      }
      toast.error('No matching city found');
      return null;
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const destination = Object.fromEntries(formData.entries());
    mutate(destination as TourObject);
  };

  if (isPending) {
    return <span className="loading loading-lg"></span>;
  }
  return (
    <form onSubmit={handleSubmit} className="max-w-2xl">
      <h2 className="mb-4">Select your dream destination</h2>
      <div className="join w-full">
        <input
          type="text"
          className="input input-bordered join-item w-full"
          placeholder="city"
          name="city"
          required
        />
        <input
          type="text"
          className="input input-bordered join-item w-full"
          placeholder="country"
          name="country"
          required
        />
        <button className="btn btn-primary join-item" type="submit">
          generate tour
        </button>
      </div>
      <div className="mt-16">{tour && <TourInfo tour={tour} />}</div>
    </form>
  );
};

export default NewTour;
