import { useEffect, useState } from 'react';
import { Placement } from './placement';

export type PlacementHook = [boolean, Placement[], (placement: Placement) => void];

export function usePlacementData(legalEntityId: string) : PlacementHook{
  const [Placementes, setPlacementes] = useState<Placement[]>([]);
  const [error, setError] = useState('');

  const getPlacementes = async () => {
    const url = 'http://localhost:3000/placementes';
    setError('');

    try {
      const response = await fetch(url);
      const placementes = await response.json();
      setPlacementes(placementes);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const postPlacement = async (placement: Placement) => {
    const body = JSON.stringify(placement);
    const method = 'POST';
    const headers = {'Content-Type': 'application/json'};
    const url = 'http://localhost:3000/placementes';
    setError('');
    try {
      const response = await fetch(url, {method, body, headers});
      const placementes = await response.json();
      setPlacementes(placementes);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  useEffect(() => {
    getPlacementes();
  }, []);

  return [!!Placementes.length, Placementes, postPlacement];
}
