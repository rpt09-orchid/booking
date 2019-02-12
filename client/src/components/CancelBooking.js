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

    handleCancelDate() {
      // api call to endpoint to cancel a date
      axios.delete(`${this.props.url}/${this.props.propertyId.slice(1)}`)
      .then((property) => {
        this.setState({dates: property.data.days});
      })
      .catch((err) => {
        console.log(err);
      });
    }

    render() {

      let bookingIdReference = 1;
      return (
        <div id="cancel-booking-wrapper">
          <ul>
            {
               this.state.dates.map((date) => {
                 bookingIdReference++;
                return <CancelBookingRow key={uniqid()} date={date} bookingId={bookingIdReference - 1} handleCancelDate={this.handleCancelDate.bind(this)}/>
              })
            }
          </ul>
        </div>
      )
    }
    
  }

export default CancelBooking;