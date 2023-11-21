import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import DinnerSupplies from '../DinnerSupplies/DinnerSupplies'
import GuestForm from '../GuestForm/GuestForm';
import GuestList from '../GuestList/GuestList';
import PartyLeader from '../PartyLeader/PartyLeader'

function App() {
  let [guestList, setGuestList] = useState([]);

  //On load, get guests
  useEffect(() => {
    getGuests()
  }, [])

  const getGuests = () => {
    axios.get('/guests')
      .then(response => {
        setGuestList(response.data)
      })
      .catch(err => {
        alert('error getting guests');
        console.log(err);
      })
  }


  return (
    <div className="App">
      <Header />
      <PartyLeader leader={guestList[0]}/>
      <GuestForm getGuests={getGuests}/>
      <GuestList guestList={guestList}/>
      <DinnerSupplies count={guestList.length}/>
      <Footer />
    </div>
  );
}

export default App;
