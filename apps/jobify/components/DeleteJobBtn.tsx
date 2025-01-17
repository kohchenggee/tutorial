import { Button, useToast } from '@tutorial/shared-lib';
import { JobType } from '../utils/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteJobAction } from '../utils/actions';

function DeleteJobBtn({ id }: { id: string }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => deleteJobAction(id),
    onSuccess: (data) => {
      if (!data) {
        toast({
          description: 'There was an error',
        });
        return;
      }
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      queryClient.invalidateQueries({ queryKey: ['charts'] });
      toast({ description: ' Job removed' });
    },
  });
  return (
    <Button
      size="sm"
      disabled={isPending}
      onClick={() => {
        mutate(id);
      }}
    >
      {isPending ? 'deleting...' : 'delete'}
    </Button>
  );
}

export default DeleteJobBtn;
