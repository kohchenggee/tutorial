'use client';
import { useFormStatus } from 'react-dom';
import { deleteTask } from '../utils/actions';

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return <button disabled={pending}>{pending ? 'pending' : 'Delete'}</button>;
};
const DeleteForm = ({ id }: { id: string }) => {
  return (
    <form action={deleteTask}>
      <input type="hidden" name="id" value={id} />
      <SubmitButton />
    </form>
  );
};

export default DeleteForm;
