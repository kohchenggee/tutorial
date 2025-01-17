import { Button } from '@tutorial/shared-lib';
import styles from './page.module.css';
import Link from 'next/link';
import LandingImg from '../assets/main.svg';
import Image from 'next/image';
import Logo from '../assets/logo-2.png'

export default function Home() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.css file.
   */
  return (
    <main>
      <header className="max-w-6xl mx-auto px-4 sm:px-8 py-6">
        <Image src={Logo} alt='logo' width={200} />
      </header>
      <section className="max-w-6xl mx-auto px-4 sm:px-8 h-screen -mt-20 grid lg:grid-cols-[1fr,400px] items-center">
        <div>
          <h1 className="capitalize text-4xl md:text-7xl font-bold">
            job <span className="text-primary">tracking</span> app
          </h1>
          <p className="leading-loose max-w-md mt-4">
            Our web application helps you stay organized and informed throughout
            your job search journey. Add the jobs you’ve applied for, update
            their statuses (e.g., pending, interview set, declined), and gain
            valuable insights with real-time statistics. Whether you're managing
            multiple applications or tracking your progress, we make it simple
            to stay on top of your career goals.
          </p>
          <Button asChild className="mt-4">
            <Link href="add-job">Get Started</Link>
          </Button>
        </div>
        <Image src={LandingImg} alt="landing" className="hidden lg:block" />
      </section>
    </main>
  );
}
