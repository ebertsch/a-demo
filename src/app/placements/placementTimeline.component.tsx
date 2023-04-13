import { useState } from 'react';
import { Farm } from '../farms/farm';
import { FarmDisplay } from '../farms/farmDisplay.component';

export interface PlacementTimelineProps {
  farms: Farm[];
  curves?: any[]; // Curve[];
  houses?: any[]; //House[];
  onDelete?: (id: string) => void;
  onUpdate?: (id: string) => void;
}

export const PlacementTimeline = (props: PlacementTimelineProps) => {
  // const [farmName, setState] = useState(props.farm.name);


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
