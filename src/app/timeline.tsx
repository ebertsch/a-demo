import { useState } from 'react';
import { Farm } from './Farm';
import { FarmDisplay } from './farm-display';

export interface TimelineProps {
  farms: Farm[];
  curves?: any[]; // Curve[];
  houses?: any[]; //House[];
  onDelete?: (id: string) => void;
  onUpdate?: (id: string) => void;
}

export const Timeline = (props: TimelineProps) => {
  // const [farmName, setState] = useState(props.farm.name);

  console.log('Timeline Component');

  function updateHandler() {
    //props.onUpdate('1');
  }
  function deleteHandler() {
    // props.onDelete('1');
  }

  return (
    <>
      {props.farms.map(farm => <FarmDisplay key={farm.id} farm={farm} farmClicked={updateHandler}></FarmDisplay>)}
    </>
  );
};
