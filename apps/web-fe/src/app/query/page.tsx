import Link from 'next/link';
import prisma from '../utils/db';

const prismaHandlers = async()=>{
    await prisma.task.create({
        data: {
            content: 'wake up'
        }
    })
    const allTasks = await prisma.task.findMany({
        orderBy:{
            createdAt: 'desc'}
    })
    return allTasks;
}

const QueryPage = async () => {
    const tasks = await prismaHandlers();
  return (
    <div style={{padding:40}}>
      <Link href="/">Homepage</Link>
      {tasks.map((item)=>{
        return <h2 key={item.id}>{item.content}</h2>
      })}
    </div>
  );
};

export default QueryPage;
