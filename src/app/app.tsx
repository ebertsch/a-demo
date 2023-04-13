/* eslint-disable react/style-prop-object */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { PlacementTimeline, PlacementGraph, PlacementEntry, defaultPlacement, usePlacementData, Placement } from './placements';
import { useHouseData } from './houses';
import { useCurveData } from './curves';
import { useFarmData } from './farms';
import { ContextEntry, useContextData } from './context';

export function App() {
  const [hasFarms, farms] = useFarmData("");
  const [hasHouses, houses] = useHouseData("");
  const [hasCurves, curves] = useCurveData("");
  const [hasPlacements, placements, setPlacements] = usePlacementData("");
  const [context, setContext] = useContextData();

  const savePlacement =(placement: Placement) => {
    setPlacements(placement);
  }

  return (
    <div>
      <PlacementEntry houses={houses} farms={farms} curves={curves} placement={defaultPlacement} onSave={savePlacement}/>
      {hasFarms && <PlacementTimeline farms={farms}></PlacementTimeline>}
      <PlacementGraph placements={placements}></PlacementGraph>
      <ContextEntry context={context}></ContextEntry>
    </div>
  );
}

export default App;