

const FilterOption = ({id, mode, filter})=>{
    return(
        <div id={id} className={`filter ${mode? 'darkmode' : ''}`}  onClick={(e)=>{filter(id)}}>{id}</div>
    )
}

export default FilterOption