//make a form to have 4 dropdowns: ID, Farm, House, Curve, SetDate

import { useState } from 'react';
import { Farm } from './Farm';
import { House } from './House';
import { Curve } from './Curve';
import { Batch } from './Batch';
import { log } from 'console';
//make a definition for batches

//make  component for adding a batch

//when we click save, call AddItem on the component. This will add the batch to the database.


export interface BatchEntryProps {
  farms: Farm[];
  curves?: Curve[];
  houses?: House[];
  batch: Batch;
  onSave?: (batch: Batch) => void;
}
export const defaultBatch: Batch = {
  id: 0,
  farmId: 2,
  houseId: 0,
  curveId: 0,
  placementDate: new Date(),
}



//make a function to accept the BatchEntryProps and render them in 4 dropdowns, and re-render if the dropdowns change.
export const BatchEntry = (props: BatchEntryProps) => {
  const [batch, setBatch] = useState<Batch>(props.batch);
  
    
 const getHousesFiltered = (farmId?:Number) => props.houses?.filter(house => house.farmId === farmId)||[];
  
 const saveBatchValid = (batch:Batch) => {
  
    if(batch.farmId === 0 || batch.houseId === 0 || batch.curveId === 0 || batch.placementDate === undefined) {
      console.log("invalid batch");
      return true;

    }
    console.log("valid batch");
    return false;
 }
 
  const setFarmVal = (event: React.ChangeEvent<HTMLSelectElement>) => { 
    event.preventDefault();
    props.batch.farmId = parseInt(event.target.value);
    setBatch({...props.batch});
    
  }

  const setHouseVal = (event: React.ChangeEvent<HTMLSelectElement>) => { 
    event.preventDefault();
    props.batch.houseId = parseInt(event.target.value);
    setBatch({...props.batch});
  }

  const setCurveVal = (event: React.ChangeEvent<HTMLSelectElement>) => { 
    event.preventDefault();
    props.batch.curveId = parseInt(event.target.value);
    setBatch({...props.batch});
  }

  const setPlacementDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    props.batch.placementDate = new Date(event.target.value);
    setBatch({...props.batch});
  }

  const handleSave = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log(batch);
    props.onSave?.(batch);
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
          <select name="farm" id="farmID" value={batch.farmId} onChange={setFarmVal}> 
            {props.farms.map(farm => <option key={farm.id} value={farm.id}>{farm.name}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="houseID">House</label>
          <select name="house" id="houseID" value={batch.houseId} onChange={setHouseVal}>
            <option value={0}>
              select option
            </option>
            {getHousesFiltered(batch?.farmId).map(house => <option key={house.id} value={house.id}>{house.name}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="curveID">Curve</label>
          <select name="curve" id="curveID" value={batch.curveId} onChange={setCurveVal}>
            {props.curves?.map(curve => <option key={curve.id} value={curve.id}>{curve.name}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="placementDate">Placement Date</label>
          <input type="date" name="placementDate" id="placementDate" onChange={setPlacementDate} value={getFormatDateInput(batch.placementDate)}/>
        </div>
        <div>
          <button type="button" onClick={handleSave} disabled={saveBatchValid(batch)}>thank you copilot</button>
        </div>
      </form>
    </>
  );
  
}