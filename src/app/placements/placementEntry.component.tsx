//make a form to have 4 dropdowns: ID, Farm, House, Curve, SetDate

import { useState } from "react";
import { Farm, FarmSelector, mapFarmsToOptions } from "../farms";
import { House } from "../houses";
import { Curve } from "../curves";
import { Placement } from ".";
import { UIDateTimePicker, UISelect } from "@apollo/apollo-ui-reactjs";
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
    // setHouseUIState({
    //   ...houseUIState,
    //   open: false,
    //   id: "0",
    //   value: "Select House",
    //   options: mapToOptions(getHousesFiltered(props.placement.farmId), "0"),
    // });
  };

  const handleHouseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    props.placement.houseId = event.target.value;
    setPlacement({ ...props.placement });
    setHouseUIState({
      ...houseUIState,
      open: false,
      value:
        getHouses().find((house) => house.id === props.placement.houseId)
          ?.name || "Select House",
      options: mapToOptions(getHousesFiltered(), props.placement.houseId),
    });
  };
  const handleCurveChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    props.placement.curveId = event.target.value;
    setPlacement({ ...props.placement });
    setCurveUIState({
      ...curveUIState,
      open: false,
      value:
        props.curves?.find((curve) => curve.id === props.placement.curveId)
          ?.name || "Select Curve",
      options: mapToOptions(props.curves || [], props.placement.curveId),
    });
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
  // const setFarmIsOpen = (open: boolean) => {
  //   setFarmUIState({ ...farmUIState, open: open });
  // };
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
      {console.log("Rendering")}
      <form>
        <div>
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
        <br />
        <br />
        <br />
        {/* <pre>
          props.placement.farmId: {props.placement.farmId} <br />
          farmUIState.id: {farmUIState.id} <br />
          farmUIState.value: {farmUIState.value} <br />
          farmUIState.open: {farmUIState.open.toString()} <br />
          farmUIState.options:{" "}
          {(farmUIState.options||[]).map((option) => option.label).join("")} <br />
        </pre> */}
        <br />
        <br />
        <br />
        <div>
          <UISelect
            name="house"
            id="houseID"
            label={"House"}
            placeholder={houseUIState.value}
            open={houseUIState.open}
            onClose={() => {
              setHouseIsOpen(false);
            }}
            onOpen={() => {
              setHouseIsOpen(true);
            }}
            // onClickOutside={() => setHouseIsOpen(false)}
            onChange={handleHouseChange}
            options={houseUIState.options || []}
          />
        </div>
        {/* <div>
          <UISelect
            name="curve"
            id="curveID"
            label={"Curve"}
            placeholder={curveUIState.value}
            open={curveUIState.open}
            onClose={() => {
              setCurveIsOpen(false);
            }}
            onOpen={() => {
              setCurveIsOpen(true);
            }}
            onClickOutside={() => {
              setCurveIsOpen(false);
            }}
            onChange={handleCurveChange}
            options={(curveUIState.options||[])}
          />
        </div> */}
        <div>
          <UIDateTimePicker
            open={placementDateUIState.open}
            locale="en-GB"
            date={true}
            timeLabel="Time"
            value={placementDateUIState.id}
            displayValue={placementDateUIState.value}
            onChange={handlePlacementDateChange}
            // onClickOutside={() => setPlacementDateIsOpen(false)}
            onClose={() => setPlacementDateIsOpen(false)}
            onOpen={() => {
              setPlacementDateIsOpen(true);
            }}
            label="Date/time"
          />
          {/* <label htmlFor="placementDate">Placement Date</label>
          <input type="date" name="placementDate" id="placementDate" onChange={setPlacementDate} value={getFormatDateInput(placement.placementDate)}/> */}
        </div>
        <div>
          <button
            type="button"
            onClick={handleSave}
            disabled={savePlacementValid(placement)}
          >
            thank you copilot
          </button>
        </div>
      </form>
    </>
  );
};
