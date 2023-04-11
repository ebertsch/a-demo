import { useEffect, useState } from 'react';
import { Farm } from './Farm';

export function useFarmData(legalEntityId: string) {
  const [farms, setFarms] = useState<Farm[]>([]);
  const [error, setError] = useState('');

  const getFarms = async () => {
    const url = 'http://localhost:3000/farms';
    setError('');

    try {
      const response = await fetch(url);
      const farms = await response.json();
      setFarms(farms);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  useEffect(() => {
    getFarms();
  }, []);

  return [!!farms.length, farms] as [boolean, Farm[]];
}
