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
<<<<<<< HEAD
               this.state.dates.map(function(item, i){
                console.log(item.toString().slice(0, 11));
                return <CancelBookingRow key={uniqid()} handleCancelDate={this.props.handleCancelDate} />
=======
               this.state.dates.map((date) => {
                 bookingIdReference++;
                return <CancelBookingRow key={uniqid()} date={date} bookingId={bookingIdReference - 1} handleCancelDate={this.handleCancelDate.bind(this)}/>
>>>>>>> bb456576b7eaf414c9db89837dee61a5b92aaff2
              })
            }
          </ul>
        </div>
      )
    }
    
  }

export default CancelBooking;