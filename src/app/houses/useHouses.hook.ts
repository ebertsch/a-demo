import { useEffect, useState } from 'react';
import { House } from './house';

export type HouseHook = [boolean, House[]];

export function useHouseData(legalEntityId: string) : HouseHook {
  const [houses, setHouses] = useState<House[]>([]);
  const [error, setError] = useState('');

  const getHouses = async () => {
    const url = 'http://localhost:3000/houses';
    setError('');

    try {
      const response = await fetch(url);
      const houses = await response.json();
      setHouses(houses);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  useEffect(() => {
    getHouses();
  }, []);

  return [!!houses.length, houses];
}
