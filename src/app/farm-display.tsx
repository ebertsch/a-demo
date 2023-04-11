import { useState } from 'react';
import { Farm } from './Farm';

export interface FarmDisplayProps {
  farm: Farm;
  farmClicked: () => void;
}

export const FarmDisplay = (props: FarmDisplayProps) => {
  const [farmName, setState] = useState(props.farm.name);

  console.log('Farm Component');

  function onClicked() {
    props.farmClicked();
    setState('Clicked');
    console.log('I was clicked');
  }


  return (
    <h1>
      {farmName}
      <button onClick={onClicked}> click</button>
    </h1>
  );
};
