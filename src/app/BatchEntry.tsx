//make a form to have 4 dropdowns: ID, Farm, House, Curve, SetDate

import { useState } from 'react';
import { Farm } from './Farm';
import { House } from './House';
import { Curve } from './Curve';
import { Batch } from './Batch';
//make a definition for batches

//make  component for adding a batch

//when we click save, call AddItem on the component. This will add the batch to the database.


export interface BatchEntryProps {
  farms: Farm[];
  curves?: Curve[];
  houses?: House[];
  batch: Batch;
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
  
    

  const setFarmVal = (event: React.ChangeEvent<HTMLSelectElement>) => { 
    console.log('setFarm');
    setBatch({...props.batch, farmId: parseInt(event.target.value)});
  }

  const setHouseVal = (event: React.ChangeEvent<HTMLSelectElement>) => { 
    console.log('setHouse');
    setBatch({...props.batch, houseId: parseInt(event.target.value)});
  }

    
  return (
    <form> 
      <div>
        <label htmlFor="farm">Farm</label>
        <select name="farm" id="farmID" value={props.batch.farmId} onChange={setFarmVal}> 
          {props.farms.map(farm => <option value={farm.id}>{farm.name}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="house">House</label>
        <select name="house" id="houseID" value={props.batch.houseId} onChange={setHouseVal}>
          {props.houses?.map(house => <option value={house.id}>{house.name}</option>)}
        </select>
      </div>
    </form>
  );
  
}