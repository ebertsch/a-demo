//make a form to have 4 dropdowns: ID, Farm, House, Curve, SetDate

import { useState } from 'react';
import { Farm } from '../farms';
import { House } from '../houses';
import { Curve } from '../curves';
import { Placement } from '.';

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
  
    
 const getHousesFiltered = (farmId?:Number) => props.houses?.filter(house => house.farmId === farmId)||[];
  
 const savePlacementValid = (placement:Placement) => {
  
    if(placement.farmId === 0 || placement.houseId === 0 || placement.curveId === 0 || placement.placementDate === undefined) {
      return true;

    }
    return false;
 }
 
  const setFarmVal = (event: React.ChangeEvent<HTMLSelectElement>) => { 
    event.preventDefault();
    props.placement.farmId = parseInt(event.target.value);
    setPlacement({...props.placement});
    
  }

  const setHouseVal = (event: React.ChangeEvent<HTMLSelectElement>) => { 
    event.preventDefault();
    props.placement.houseId = parseInt(event.target.value);
    setPlacement({...props.placement});
  }

  const setCurveVal = (event: React.ChangeEvent<HTMLSelectElement>) => { 
    event.preventDefault();
    props.placement.curveId = parseInt(event.target.value);
    setPlacement({...props.placement});
  }

  const setPlacementDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    props.placement.placementDate = new Date(event.target.value);
    setPlacement({...props.placement});
  }

  const handleSave = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    props.onSave?.(placement);
  }
  
  const getFormatDateInput = (date:Date) => {
    const dateObj = date;
    // get the month in this format of 04, the same for months
    const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
    const day = ("0" + dateObj.getDate()).slice(-2);
    const year = dateObj.getFullYear();
    const shortDate = `${year}-${month}-${day}`;
    return shortDate;
  };

  return (
    <>
      <form> 
        <div>
          <label htmlFor="farmID">Farm</label>
          <select name="farm" id="farmID" value={placement.farmId} onChange={setFarmVal}> 
            {props.farms.map(farm => <option key={farm.id} value={farm.id}>{farm.name}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="houseID">House</label>
          <select name="house" id="houseID" value={placement.houseId} onChange={setHouseVal}>
            <option value={0}>
              select option
            </option>
            {getHousesFiltered(placement?.farmId).map(house => <option key={house.id} value={house.id}>{house.name}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="curveID">Curve</label>
          <select name="curve" id="curveID" value={placement.curveId} onChange={setCurveVal}>
            {props.curves?.map(curve => <option key={curve.id} value={curve.id}>{curve.name}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="placementDate">Placement Date</label>
          <input type="date" name="placementDate" id="placementDate" onChange={setPlacementDate} value={getFormatDateInput(placement.placementDate)}/>
        </div>
        <div>
          <button type="button" onClick={handleSave} disabled={savePlacementValid(placement)}>thank you copilot</button>
        </div>
      </form>
    </>
  );
  
}