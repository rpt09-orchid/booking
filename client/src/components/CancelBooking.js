import React from 'react';
import './CancelBooking.css';
import closeBtn from '../assets/x-btn.png';

const CancelBooking = () => {
  return (
    <div id="cancel-booking-wrapper">
      <ul>
        <li>
          <ul className="cancel-booking-row">
            <li className="cancel-btn"><img src={closeBtn} /></li>
            <li className="date-text">11-13-2019</li>
          </ul>
        </li>
        <li>Hello</li>
        <li>Hello</li>
        <li>Hello</li>
        <li>Hello</li>
      </ul>
    </div>
  )
}

export default CancelBooking;