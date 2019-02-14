import React from 'react';
import DateSelector from './components/DateSelector';
import Guests from './components/Guests';
import CancelBooking from './components/CancelBooking';
import { library } from '@fortawesome/fontawesome-svg-core';
import axios from 'axios';
import faker from 'faker';
import moment from 'moment';
import Overview from './components/Overview'
import { StickyContainer, Sticky } from 'react-sticky';
import { faStarHalf, faStar, faArrowRight, faIgloo, faPlusCircle, faMinusCircle} from '@fortawesome/free-solid-svg-icons';
import './App.css'

debugger;
library.add(faStarHalf, faStar, faIgloo, faPlusCircle, faMinusCircle, faArrowRight)

let id = '/1';
if (window.location.pathname !== '/') {
  id = window.location.pathname;
}

let URL;

if(process.env.NODE_ENV === 'development'){
   URL = 'http://localhost:3004/booking'
} else {
  console.log('PROD URI', process.env.PROD_URI)
  URL = process.env.PROD_URI;
}


class App extends React.Component {
  
  constructor() {
    super();
    this.state={
      startDate: '',
      endDate: '',
      guests: [],
      days: [],
      price: null,
  
      successMessage: null,
      errorMessage: '',
      showRemoveBooking: false
    }
  }


  // Life Cycle Methods
  componentDidMount(){
    this.handleGetBookedDates()
  }
  
  handleStartDate = (startDate) =>{
    this.setState({startDate})
  }

  handleEndDate = (endDate) => {
    this.setState({endDate})
  }

  handleGuests = (guests) => {
    this.setState({guests})
  }

  handleGetBookedDates = () => {

    axios.get(URL + `${id}`)
    .then(result => {
      const days = [];
      result.data.days.forEach((day) => {
        days.push(new Date(day))
      })
      this.setState({
        days: days,
        price: result.data.price
      })
    })
    .catch(err => {
      console.log(err)
    })
    }

    handleSubmitBooking = () =>{
      const startDate = moment(this.state.startDate).startOf('day')
      const endDate = moment(this.state.endDate).startOf('day')

       axios.post(URL + `${id}`, {
          startDate: startDate,
          endDate: endDate,
          guests: this.state.guests
        })
        .then(result => {
          this.handleGetBookedDates()
          this.setState({
            successMessage: result.data.validDates
          })

          setTimeout(() =>{
            this.setState({
              successMessage: ''
            })
          }, 3000)
        })
        .catch(err => {
          this.setState({
            errorMessage: err.response.data.invalid
          })

          setTimeout(() =>{
            this.setState({
              errorMessage: ''
            })
          }, 3000)

        })
     }

     showCancelBooking = () => {
       this.setState({
        showRemoveBooking: true
       })
     }

  render(){

    let successModal = null;
    
    if(this.state.successMessage){
      successModal = (
        <div className="success-modal">
          <div className="success-message">{this.state.successMessage}</div>
        </div>)
    } 

      if (!this.state.showRemoveBooking) {
        return(
        <div>
        <StickyContainer className="sticky-wrapper">
            <Sticky>
           { ({ style }) => (
          <div className="app-wrapper" style={style}>
  
            {successModal}
            <Overview price={this.state.price} id={id}/>
            <DateSelector
              handleStartDate={this.handleStartDate}
              handleEndDate={this.handleEndDate}
              bookedDates={this.state.days}
            />
  
             <Guests guests={this.guests} handleGuests={this.handleGuests} />
            <p className="error-message">{this.state.errorMessage}</p>
            <input className="submitButton" type="submit" onClick={this.handleSubmitBooking} value="Request to Book"/>
            <span className="removeBookingLink" onClick={this.showCancelBooking}>Cancel a booking</span>
          </div>
          )}
          </Sticky>
          <div style={{minHeight: 2000 }}></div>
        </StickyContainer>
        </div>
        )
      } else {
        return(
          <div>
          <StickyContainer className="sticky-wrapper">
              <Sticky>
             { ({ style }) => (
            <div className="app-wrapper" style={style}>
              <CancelBooking propertyId={id} url={URL} days={this.state.days} />
            </div>
            )}
            </Sticky>
            <div style={{minHeight: 2000 }}></div>
          </StickyContainer>
          </div>
          )
      }

  }
}

export default App;