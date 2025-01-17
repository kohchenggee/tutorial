'use client';
import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@tutorial/shared-lib';
import { JobStatus } from '../utils/types';
import { FormEvent } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

function SearchForm() {
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';
  const jobStatus = searchParams.get('jobStatus') || 'all';
  const router = useRouter();
  const pathname = usePathname();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const search = formData.get('search') as string;
    const jobStatus = formData.get('jobStatus') as string;
    let params = new URLSearchParams();
    params.set('search', search);
    params.set('jobStatus', jobStatus);
    console.log(search, jobStatus);
    router.push(`${pathname}?${params.toString()}`);
  };
  return (
    <form
      className="bg-muted mb-16 p-8 grid sm:grid-cols-2 md:grid-cols-3 gap-4 rounded-lg"
      onSubmit={handleSubmit}
    >
      <Input
        type="text"
        placeholder="Search Jobs"
        name="search"
        defaultValue={search}
      />
      <Select name="jobStatus">
        <SelectTrigger defaultValue={jobStatus}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {['all', ...Object.values(JobStatus)].map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button type="submit">Search</Button>
    </form>
  );
  return <h1 className="text-4xl">SearchForm</h1>;
}

export default SearchForm;
