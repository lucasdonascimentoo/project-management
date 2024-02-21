function Salutation({name}){

    function generateGreeting(someName){
        return `Hello, ${someName}, what's up?`
    }

    return(
        <>
        {name &&<p>{generateGreeting (name)}</p>}
        </>
    )
}

export default Salutation