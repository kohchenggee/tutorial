'use client';

import { useEffect } from 'react';
import { GET } from './api/hello/route';

export default function ApiResponse() {
  const test = process.env.NEXT_PUBLIC_NX_API_URL;
  useEffect(() => {
    fetch(`${test}/test`).then((res) => {
      console.log('test', res);
    });
  }, [process.env.NX_API_URL]);

  return;
}
