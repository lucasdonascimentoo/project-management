function Person({name, age, profession, photo}){
    return(
        <div>
            <img src={photo} alt={name}/>
            <h2>Name: {name}</h2>
            <p>Age: {age}</p>
            <p>Profession: {profession}</p>
        </div>
    )
}

export default Person