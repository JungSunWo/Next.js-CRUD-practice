import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {ko} from "date-fns/locale"
import {parse} from "date-fns"

const CustomDatepicker = (props) => {
  const {id,selected,name} = props;
  const [startDate, setStartDate] = useState();
  

  useEffect(()=>{ 
    if(selected != null){
        console.log(selected);
        const selDay = parse(selected,"yyyyMMdd",new Date());
        setStartDate(selDay);
    }else{
        setStartDate(new Date());
    }
    
  },[]);
  
  return (
     
      <DatePicker
        id={id}
        name={name}
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        locale={ko}
        dateFormat={"yyyy-MM-dd"}
        className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    
  );
};

export default CustomDatepicker;
