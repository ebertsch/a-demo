//make a form to have 4 dropdowns: ID, Farm, House, Curve, SetDate

import { useState } from "react";
import { Farm, FarmSelector, mapFarmsToOptions } from "../farms";
import { House,HouseSelector } from "../houses";
import { Curve, CurveSelector } from "../curves";
import { Placement } from ".";
import { UIButton, UIDateTimePicker, UISelect } from "@apollo/apollo-ui-reactjs";
import {
  mapToOptions,
  getFormatDateInput,
  UISelectionStateWithOptions,
  UISelectionStateForDate,
} from "../core";
export interface PlacementEntryProps {
  farms: Farm[];
  curves?: Curve[];
  houses?: House[];
  placement: Placement;
  onSave?: (placement: Placement) => void;
}

//make a function to accept the PlacementEntryProps and render them in 4 dropdowns, and re-render if the dropdowns change.
export const PlacementEntry = (props: PlacementEntryProps) => {
  const [placement, setPlacement] = useState<Placement>(props.placement);

  const [placementDateUIState, setPlacementDateUIState] =
    useState<UISelectionStateForDate>({
      id: props.placement.placementDate.valueOf(),
      value: "Select Placement Date",
      open: false,
    });

  const getHouses = () => props?.houses || [];

  const getHousesFiltered = (farmId?: string) =>
    props.houses?.filter((house) => house.farmId === farmId) || [];
  const [houseUIState, setHouseUIState] = useState<UISelectionStateWithOptions>(
    {
      id: props.placement.houseId.toString(),
      value: "Select House",
      options: mapToOptions(getHousesFiltered(), placement.houseId.toString()),
      open: false,
    }
  );
  const [curveUIState, setCurveUIState] = useState<UISelectionStateWithOptions>(
    {
      id: props.placement.curveId.toString(),
      value: "Select Curve",
      options: mapToOptions(props?.curves || [], placement.curveId.toString()),
      open: false,
    }
  );
  const savePlacementValid = (placement: Placement) => {
    if (
      placement.farmId === "0" ||
      placement.houseId === "0" ||
      placement.curveId === "0" ||
      placement.placementDate === undefined
    ) {
      return true;
    }
    return false;
  };

  const setCurveVal = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    props.placement.curveId = event.target.value;
    setPlacement({ ...props.placement });
  };

  const setPlacementDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    props.placement.placementDate = new Date(event.target.value);
    setPlacement({ ...props.placement });
  };

  const handleSave = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    props.onSave?.(placement);
  };

  const handleFarmChange = (farm: Farm|null) => {
    props.placement.farmId = farm?.id || "0";
    setPlacement({ ...props.placement });
    setHouseUIState({
      ...houseUIState,
      open: false,
      id: "0",
      value: "Select House",
      options: mapToOptions(getHousesFiltered(props.placement.farmId), "0"),
    });
  };

  const handleHouseChange = (house: House | null) => {
    props.placement.houseId = house?.id || "0";
    setPlacement({ ...props.placement });
  };
  const handleCurveChange = (curve: Curve | null) => {
    props.placement.curveId = curve?.id || "0";
    setPlacement({ ...props.placement });
  };
  const handlePlacementDateChange = (event: Date) => {
    props.placement.placementDate = new Date(event);
    setPlacement({ ...props.placement });

    setPlacementDateUIState({
      ...placementDateUIState,
      open: false,
      value: getFormatDateInput(props.placement.placementDate),
    });
  };

  const setHouseIsOpen = (open: boolean) => {
    setHouseUIState({ ...houseUIState, open: open });
  };
  const setCurveIsOpen = (open: boolean) => {
    setCurveUIState({ ...curveUIState, open: open });
  };
  const setPlacementDateIsOpen = (open: boolean) => {
    setPlacementDateUIState({ ...placementDateUIState, open: open });
  };

  return (
    <>
      <form>
        <div className="form-field">
          <FarmSelector
            farms={props.farms}
            value={placement.farmId}
            open={false}
            onChange={(farm: Farm | null) => {
              handleFarmChange(farm)
              console.log(farm);
            }}
          ></FarmSelector>
        </div>
        <div className="form-field">
        <HouseSelector
            houses={props?.houses || []}
            value={placement.houseId}
            farmId={placement.farmId}
            open={false}
            onChange={(house: House | null) => {
              handleHouseChange(house)
              console.log(house);
            }}
          ></HouseSelector>
        </div>
        <div className="form-field">
          <CurveSelector
            curves={props?.curves || []}
            value={placement.curveId}
            open={false}
            onChange={(curve: Curve | null) => {
              handleCurveChange(curve)
              console.log(curve);
            }}
          ></CurveSelector>
        </div>
        <div className="form-field">
          <UIDateTimePicker
            open={placementDateUIState.open}
            locale="en-GB"
            date={true}
            timeLabel="Time"
            value={placementDateUIState.id}
            displayValue={placementDateUIState.value}
            onChange={handlePlacementDateChange}
            onClose={() => setPlacementDateIsOpen(false)}
            onOpen={() => {
              setPlacementDateIsOpen(true);
            }}
            label="Date/time"
          />
        </div>
        <div className="button-container">
          <UIButton
            type="button"
            onClick={handleSave}
            disabled={savePlacementValid(placement)}
            theme="primary-light"
          >
            Save
          </UIButton>
        </div>
      </form>
    </>
  );
};
