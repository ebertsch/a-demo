import { useState } from 'react';
import { Farm } from './farm';

export interface FarmDisplayProps {
  farm: Farm;
  farmClicked: () => void;
}

export const FarmDisplay = (props: FarmDisplayProps) => {
  const [farmName, setState] = useState(props.farm.name);

  function onClicked() {
    props.farmClicked();
    setState('Clicked');
  }


  return (
    <h1>
      {farmName}
      <button onClick={onClicked}> click</button>
    </h1>
  );
};
