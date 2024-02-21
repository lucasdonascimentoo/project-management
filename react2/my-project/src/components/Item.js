import PropTypes from 'prop-types'

function Item({brand, release_year}){
    return(
        <>
        <li>{brand} - {release_year}</li>
        </>
    )
}

Item.propTypes ={
    brand: PropTypes.string.isRequired,
    release_year: PropTypes.number,
}

Item.defaultProps ={
    brand: 'Random brand',
    release_year: 0,
}

export default Item