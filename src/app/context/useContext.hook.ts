import { useEffect, useState } from 'react';
import { Context, defaultContext } from './context';

export type ContextHook = [Context, (context: Context) => void];

export function useContextData(): ContextHook {
  const [context, setContext] = useState<Context>(defaultContext);
  const [error, setError] = useState('');

  const getContext = async () => {
   return defaultContext;
  };

    const postContext = async (context: Context) => {
        setContext(context)
    }


  useEffect(() => {
    getContext();
  }, []);

  return [context,postContext] ;
}
