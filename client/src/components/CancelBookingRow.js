import React from 'react';
import './CancelBookingRow.css';
import closeBtn from '../assets/x-btn.png';

const CancelBookingRow = (props) => {
  return (
    <li className="cancel-booking-row">
      <ul className="cancel-booking-row-elements">
<<<<<<< HEAD
        <li className="cancel-btn"><img src={closeBtn} onClick={this.props.handleCancelDate}/></li>
        <li className="date-text">11-13-2019</li>
=======
        <li className="cancel-btn"><img src={closeBtn} onClick={props.handleCancelDate}/></li>
        <li className="date-text">{props.date}</li>
>>>>>>> bb456576b7eaf414c9db89837dee61a5b92aaff2
      </ul>
    </li>
  )
}

export default CancelBookingRow;