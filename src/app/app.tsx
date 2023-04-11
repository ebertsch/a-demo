/* eslint-disable react/style-prop-object */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { Timeline } from './timeline';
import  { useFarmData } from './useFarms.hook';
import { BatchEntry,defaultBatch } from './BatchEntry';
export function App() {
  const [HAS_DATA, FARMS] = useFarmData("");
  console.log('App Render');

  const clicker =() => {
    console.log('click');
  }

  return (
    <div>
      <BatchEntry farm={FARMS} batch={defaultBatch}/>
      {HAS_DATA && <Timeline farms={FARMS}></Timeline>}
    </div>
  );
}

export default App;