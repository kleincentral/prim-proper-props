import axios from "axios"

function GuestListItem ({guest,getGuests}){
    const deleteGuest = () => {
        console.log(guest.id)
        const guestId = guest.id
        axios.delete(`/guests/${guestId}`)
          .then(response => {
            getGuests();
          })
          .catch(err => {
            alert('Error Deleting Guest');
            console.log(err);
          })
    }
    return(
        <tr>
        <td>{guest.name}</td>
        <td>{String(guest.kidsMeal)}</td>
        <td><button onClick={deleteGuest}>Delete</button></td>
        </tr>
    )
}
export default GuestListItem