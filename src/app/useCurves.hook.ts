import { useEffect, useState } from 'react';
import { Curve } from './Curve';

export function useCurveData(legalEntityId: string) {
  const [Curves, setCurves] = useState<Curve[]>([]);
  const [error, setError] = useState('');

  const getCurves = async () => {
    const url = 'http://localhost:3000/curves';
    setError('');

    try {
      const response = await fetch(url);
      const curves = await response.json();
      setCurves(curves);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  useEffect(() => {
    getCurves();
  }, []);

  return [!!Curves.length, Curves] as [boolean, Curve[]];
}
