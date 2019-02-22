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
      this.getAllDates()
    }

    getAllDates() {
      axios.get(`${this.props.url}/${this.props.propertyId.slice(1)}`)
      .then((property) => {
        console.log(property.data.days)
        this.setState({dates: property.data.days});
      })
      .catch((err) => {
        console.log(err);
      });
    }

    handleCancelDate(e) {
      const bookingId = e.currentTarget.dataset.bookingid;
      axios.delete(`${this.props.url}/${this.props.propertyId.slice(1)}`, 
      {data: {bookingId: bookingId}})
      .then((property) => {
        let newDates = [];
        property.data.details.forEach((booking) => {
          newDates.push(booking.date);
        })
        this.setState({dates: newDates});
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