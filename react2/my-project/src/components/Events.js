import Button from './event/button'
function Events(){
    
    function myEvent(){
        console.log(`Activating first event`)
    }

    function secondEvent(){
        console.log(`Activating second event`)
    }

    return(
        <>
        <p>Click to trigger an event:</p>
        <Button event={myEvent}text="First Event"/>
        <Button event={secondEvent}text="Second Event"/>
        </>

    )
}

export default Events