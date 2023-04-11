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
  farm: Farm[];
  curves?: string[];
  houses?: string[];
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
    

  const setForm = (event: React.ChangeEvent<HTMLSelectElement>) => { 
    console.log('setForm');
    setBatch({...props.batch, farmId: parseInt(event.target.value)});
  }

  const isSelected = (id: number) => id === props.batch.farmId;
    
  return (
    <form> 
      <div>
        <label htmlFor="farm">Farm</label>
        <select name="farm" id="farmID" onChange={setForm}> 
          {props.farm.map(farm => <option selected={isSelected(farm.id)} value={farm.name}>{farm.name}</option>)}
        </select>
      </div>
    </form>
  );
  
}