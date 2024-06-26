import React, { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Grid from '@material-ui/core/Grid';

export default function DatePicker({ changeDate }) {
    const [selectedDate, setSelectedDate] = useState(null);
    const handleDateChange = date => {
      setSelectedDate(date);
      if(changeDate){
        changeDate(date);
      }
    };
  
    return (
        <Grid container justify="space-around">
            Select Date
          <ReactDatePicker
            selected={selectedDate}
            onChange={handleDateChange}
          />
        </Grid>
    );
  }