import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import JobsList from "apps/jobify/components/JobsList";
import SearchForm from "apps/jobify/components/SearchForm";
import { getAllJobsAction } from "apps/jobify/utils/actions";

async function JobsPage(){
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery({
        queryKey: ['jobs','', 'all', 1],
        queryFn:()=> getAllJobsAction({})
    })
    return <HydrationBoundary state={dehydrate(queryClient)}>
        <SearchForm />
        <JobsList />
    </HydrationBoundary>
}

export default JobsPage;