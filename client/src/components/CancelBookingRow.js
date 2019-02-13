import React from 'react';
import './CancelBookingRow.css';
import closeBtn from '../assets/x-btn.png';

const CancelBookingRow = (props) => {
  return (
    <li className="cancel-booking-row">
      <ul className="cancel-booking-row-elements">
        <li className="cancel-btn"><img src={closeBtn} onClick={props.handleCancelDate} data-bookingid={props.bookingId}/></li>
        <li className="date-text">{props.date}</li>
      </ul>
    </li>
  )
}

export default CancelBookingRow;