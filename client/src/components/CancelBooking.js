import React from 'react';
import './CancelBooking.css';
import CancelBookingRow from './CancelBookingRow'
import closeBtn from '../assets/x-btn.png';

const CancelBooking = () => {
  return (
    <div id="cancel-booking-wrapper">
      <ul>
        <CancelBookingRow />
      </ul>
    </div>
  )
}

export default CancelBooking;