import React from 'react';
import './CancelBooking.css';
import CancelBookingRow from './CancelBookingRow'
import closeBtn from '../assets/x-btn.png';

  class CancelBooking extends React.Component {
    constructor() {
      super();
      this.state={
        dates: []
      }
    }

    componentDidMount(){
      // Load all of the booked dates for this property into state
    }

    render() {
      return (

        // Do a map of all of the dates in state and return a new row for each

        //To delete, each row should have a click handler to remove the date from 
        // the database, as well as from state to update the front end
        
        <div id="cancel-booking-wrapper">
          <ul>
            <CancelBookingRow />
            <CancelBookingRow />
            <CancelBookingRow />
            <CancelBookingRow />
            <CancelBookingRow />
            <CancelBookingRow />
            <CancelBookingRow />
            <CancelBookingRow />
            <CancelBookingRow />
            <CancelBookingRow />
            <CancelBookingRow />
            <CancelBookingRow />
            <CancelBookingRow />
            <CancelBookingRow />
            <CancelBookingRow />
          </ul>
        </div>
      )
    }
    
  }

export default CancelBooking;