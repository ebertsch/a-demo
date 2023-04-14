/* eslint-disable react/style-prop-object */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { PlacementTimeline, PlacementGraph, PlacementEntry, defaultPlacement, usePlacementData, Placement } from './placements';
import { useHouseData } from './houses';
import { useCurveData } from './curves';
import { useFarmData } from './farms';
import { ContextEntry, useContextData } from './context';
import {
  UIMainNav,
  UIMainNavTitle,
  UIRoot,
  UIAccordion,
  UIAccordionSummary,
  UIAccordionDetails,
  UITypography,
  UIDivider,
  UISidePanel,
  UIInput,
  UIButton,
  UISidePanelFooter,
  UIButtonContainer,
  UIDateTimePicker,
  UIMainNavLink,
} from '@apollo/apollo-ui-reactjs';
import { useState } from 'react';

export function App() {
  const [hasFarms, farms] = useFarmData("");
  const [hasHouses, houses] = useHouseData("");
  const [hasCurves, curves] = useCurveData("");
  const [hasPlacements, placements, setPlacements] = usePlacementData("");
  const [showSidePanel, setShowSidePanel] = useState(false);
  const [context, setContext] = useContextData();

  const savePlacement =(placement: Placement) => {
    setPlacements(placement);
  }

  return (
    <UIRoot theme="big-dutchman" layout="default">
    <UIMainNav>
      <UIMainNavTitle title="Apollo" subTitle="Production Planning" />
      <UIMainNavLink
        icon="plus"
        onClick={() => setShowSidePanel(true)}
      />
    </UIMainNav>

    <UISidePanel
        align="right"
        title="Add BE"
        onHide={() => setShowSidePanel(false)}
        show={showSidePanel}
      >
      <PlacementEntry houses={houses} farms={farms} curves={curves} placement={defaultPlacement} onSave={savePlacement}/>

    </UISidePanel>

    <div>
      {hasFarms && <PlacementTimeline farms={farms}></PlacementTimeline>}
      <PlacementGraph placements={placements}></PlacementGraph>
      <ContextEntry context={context}></ContextEntry>
    </div>
    </UIRoot>
  );
}

export default App;