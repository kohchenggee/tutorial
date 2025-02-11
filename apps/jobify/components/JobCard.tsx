import {
    Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Separator,
} from '@tutorial/shared-lib';
import { JobType } from '../utils/types';
import Link from 'next/link';
import DeleteJobBtn from './DeleteJobBtn';
import JobInfo from './JobInfo';
import { Briefcase, CalendarDays, MapPin, RadioTower } from 'lucide-react';

function JobCard({ job }: { job: JobType }) {
  const date = new Date(job.createdAt).toLocaleDateString();
  return (
    <Card className="bg-muted">
      <CardHeader>
        <CardTitle>{job.position}</CardTitle>
        <CardDescription>{job.company}</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="mt-4 grid grid-cols-2 gap-4">
        <JobInfo icon={<Briefcase />} text={job.mode} />
        <JobInfo icon={<MapPin />} text={job.location }/>
        <JobInfo icon={<CalendarDays />} text={date} />
        <Badge className='w-32 justify-center'>
            <JobInfo icon={<RadioTower className='w-4 h-4' />} text={job.status} />
        </Badge>
      </CardContent>
      <CardFooter className="flex gap-4">
        <Button asChild size="sm">
          <Link href={`/jobs/${job.id}`}>edit</Link>
        </Button>
        <DeleteJobBtn id={job.id}  />
      </CardFooter>
    </Card>
  );
  return <h1 className="text-4xl">JobCard</h1>;
}

export default JobCard;
