import React from 'react';
import './CancelBooking.css';
import CancelBookingRow from './CancelBookingRow'
import closeBtn from '../assets/x-btn.png';
import uniqid from 'uniqid';
import axios from 'axios';

  class CancelBooking extends React.Component {
    constructor() {
      super();

      this.state = {
        dates: []
      }
    }

    componentDidMount(){
      // Load all of the booked dates for this property into state
      this.getAllDates()
    }

    getAllDates() {
      axios.get(`${this.props.url}/${this.props.propertyId.slice(1)}`)
      .then((property) => {
        this.setState({dates: property.data.days});
      })
      .catch((err) => {
        console.log(err);
      });
    }

    render() {
      return (
        <div id="cancel-booking-wrapper">
          <ul>
            {
               this.state.dates.map(function(item, i){
                console.log('test');
                return <CancelBookingRow key={uniqid()}/>
              })
            }
          </ul>
        </div>
      )
    }
    
  }

export default CancelBooking;