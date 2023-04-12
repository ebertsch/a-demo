/* eslint-disable react/style-prop-object */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { Timeline } from './timeline';
import  { useFarmData } from './useFarms.hook';
import { BatchEntry,defaultBatch } from './BatchEntry';
import { House } from './House';
import { useHouseData } from './useHouses.hook';
import { useCurveData } from './useCurves.hook';
import { useBatchData } from './useBatches.hook';
import { Batch } from './Batch';

export function App() {
  const [hasFarms, farms] = useFarmData("");
  const [hasHouses, houses] = useHouseData("");
  const [hasCurves, curves] = useCurveData("");
  const [hasBatches, batches, setBatches] = useBatchData("");

  console.log('App Render');

  const saveBatch =(batch: Batch) => {
    setBatches(batch);
    console.log(batches, batch);
  }

  return (
    <div>
      <BatchEntry houses={houses} farms={farms} curves={curves} batch={defaultBatch} onSave={saveBatch}/>
      {hasFarms && <Timeline farms={farms}></Timeline>}
    </div>
  );
}

export default App;