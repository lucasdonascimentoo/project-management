import Item from "./Item";
function List(){
    return(
        <>
         <h1>My List</h1>
         <ul>
            <Item brand="Ferrari" year_release={1985}/>
            <Item brand="Fiat" year_release={1964}/>
            <Item brand="Renault"/>
            <Item brand="Chevrolet"/>
            <Item/>
         </ul>
        </>
    )
}

export default List;