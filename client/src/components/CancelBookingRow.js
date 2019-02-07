import React from 'react';
import './CancelBookingRow.css';
import closeBtn from '../assets/x-btn.png';

const CancelBookingRow = () => {
  return (
    <li className="cancel-booking-row">
      <ul className="cancel-booking-row-elements">
        <li className="cancel-btn"><img src={closeBtn} /></li>
        <li className="date-text">11-13-2019</li>
      </ul>
    </li>
  )
}

export default CancelBookingRow;