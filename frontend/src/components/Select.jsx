import React, { useState } from "react";
import { useEffect } from "react";

import Select from "react-select";
import AddButton from "./AddButton";

function SelectInput({ data,param, onChange,defaultVal}) {
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [options, setOptions] = useState(data);
  const [d,setd] = useState(defaultVal)

  useEffect(() => {
    setd(defaultVal)
    if (options) {
      setIsLoading(false);
      return;
    }
    setOptions({ value: null, label: "No hay datos" });
  }, [options]);

  return (
    <>
    <div className="d-flex flex-row">
    <Select
      onChange={(e)=>{onChange(e)}}
        required={true}
        className="basic-single w-100 "
        classNamePrefix="select"
        isDisabled={isDisabled}
        isLoading={isLoading}
        isClearable={isClearable}
        isSearchable={isSearchable}
        defaultValue={d}
        name="color"
        options={data}
      />

     <AddButton param={param}></AddButton>
    </div>
     
    </>
  );
}

export default SelectInput;
