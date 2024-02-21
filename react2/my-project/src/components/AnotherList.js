function AnotherList({items}){
    return(
        <>
        <h3>Good things list:</h3>
        { items.length > 0 ? (
            items.map((item, index) => (
                <p key={index}>{item}</p>
            ))):(
                <p>There are no items in the list</p>
            )
        }
        </>
    )
}

export default AnotherList