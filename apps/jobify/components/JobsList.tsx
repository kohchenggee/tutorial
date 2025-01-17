'use client';

import { useQuery } from '@tanstack/react-query';
import { getAllJobsAction } from '../utils/actions';
import { useSearchParams } from 'next/navigation';
import JobCard from './JobCard';
import ComplexButtonContainer from './ComplexButtonContainer';

function JobsList() {
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';
  const jobStatus = searchParams.get('jobStatus') || '';

  const pageNumber = Number(searchParams.get('page')) || 1;

  const { data, isPending } = useQuery({
    queryKey: ['jobs', search, jobStatus, pageNumber],
    queryFn: () => getAllJobsAction({ search, jobStatus, page: pageNumber }),
  });
  const { jobs, count, page, totalPages } = data || {
    jobs: [],
    count: 0,
    page: 0,
    totalPages: 0,
  };

  if (isPending) return <h2 className="text-xl">Please wait... </h2>;
  if (jobs.length < 1) return <h2 className="text-xl">No Jobs Found...</h2>;
  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-semibold capitalize">{count} jobs found</h2>
        {totalPages > 1 && (
          <ComplexButtonContainer currentPage={page} totalPages={totalPages} />
        )}
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </>
  );
}

export default JobsList;
