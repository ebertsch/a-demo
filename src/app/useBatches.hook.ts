import { useEffect, useState } from 'react';
import { Batch } from './Batch';

export function useBatchData(legalEntityId: string) {
  const [Batches, setBatches] = useState<Batch[]>([]);
  const [error, setError] = useState('');

  const getBatches = async () => {
    const url = 'http://localhost:3000/batches';
    setError('');

    try {
      const response = await fetch(url);
      const batches = await response.json();
      setBatches(batches);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const postBatch = async (batch: Batch) => {
    console.log('post log: ',batch);
    const body = JSON.stringify(batch);
    const method = 'POST';
    const headers = {'Content-Type': 'application/json'};
    const url = 'http://localhost:3000/batches';
    setError('');
    console.log('post log: ',body);
    try {
      const response = await fetch(url, {method, body, headers});
      const batches = await response.json();
      setBatches(batches);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  useEffect(() => {
    getBatches();
  }, []);

  return [!!Batches.length, Batches, postBatch] as [boolean, Batch[], (batch: Batch) => void];
}
