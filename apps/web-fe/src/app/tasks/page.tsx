import Link from 'next/link';
import prisma from '../utils/db';
import DeleteForm from '../components/DeleteForm';

const TaskPage = async () => {
  const tasks = await prisma.task.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  if (tasks.length === 0) {
    return <h2>No tasks</h2>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Task List</h1>
      <ul>
        {tasks.map((item) => {
          return (
            <li key={item.id} style={{ width: 200, border: 'solid 1px black' }}>
              <h2>{item.content}</h2>
              <div
                style={{ display: 'flex', gap: 6, justifyContent: 'center' }}
              >
                <Link href={`/tasks/${item.id}`}>Edit</Link>
                <DeleteForm id={item.id} />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TaskPage;
