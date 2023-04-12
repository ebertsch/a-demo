/* eslint-disable react/style-prop-object */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { Timeline } from './timeline';
import  { useFarmData } from './useFarms.hook';
import { BatchEntry,defaultBatch } from './BatchEntry';
import { House } from './House';
import { useHouseData } from './useHouses.hook';
export function App() {
  const [hasFarms, farms] = useFarmData("");
  const [hasHouses, houses] = useHouseData("");
  console.log('App Render');

  const clicker =() => {
    console.log('click');
  }

  return (
    <div>
      <BatchEntry houses={houses} farms={farms} batch={defaultBatch}/>
      {hasFarms && <Timeline farms={farms}></Timeline>}
    </div>
  );
}

export default App;