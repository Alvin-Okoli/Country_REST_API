import { useEffect, useState, useContext, lazy, useMemo, Suspense } from 'react'
import { NavLink, Outlet } from 'react-router'
import { themeContext } from './themeProvider'

const Cards = lazy(()=> import('./Homepage Components/Cards'))
const FilterOption = lazy(()=> import('./Homepage Components/Filter'))
import SuspenseHandle from './Homepage Components/Suspense'

//assets
import searchSvg from '../assets/search-svgrepo-com.svg'
import arrowDown from '../assets/arrow-down-svgrepo-com.svg'
import arrowUp from '../assets/arrow-up-svgrepo-com.svg'
import whiteSearchSvg from '../assets/white-search-alt-1-svgrepo-com.svg'
import whiteArrowDown from '../assets/white-arrow-down-svgrepo-com (1).svg' 
import whiteArrowUp from '../assets/white-arrow-up-svgrepo-com (1).svg'

export default function Country(){

    const [data, setData] = useState([])
    const [show, setShow] = useState(false)
    const [regionFilter, setRegionFilter] = useState('')
    const [searchTerm, setSearchTerm] = useState('')
    const [isError, setIsError] = useState('false')
    let {mode} = useContext(themeContext);
    const errorMessage = 'Unfortunately we were unable to fetch countries data :-('
    const fetchdata = async()=>{
        try{
            setIsError(false)
            const res = await fetch('https://country-rest-api-tghk.onrender.com');
            const data = await res.json();
            setData(data);
            console.log(data)
        }
        catch(err){
            setIsError(true)
            console.error(errorMessage)
            console.log(data)
        }
    }

    useEffect(()=>{
        fetchdata()

    }, [])

    const showOption = ()=>{  
        const filterBg = document.getElementById('filterBg')      
        setRegionFilter(null)
        if (show === false){
            setShow(true)
        }else setShow(false)
        
        filterBg.classList.toggle('hidden')//This toggles the filter options to show or hide    
    }//This switches show between true or false and shows the filter options

    const filterRegion = (filter)=>{
        setRegionFilter(filter)
    }//This function filters the region sets the filter

    const handleSearch = (e)=>{setSearchTerm(e.target.value)}

    const filteredData = data.filter(country=>{
        const matchesRegion = regionFilter? country.region === regionFilter : true;
        const matchesSearch = searchTerm? country.name.toLowerCase().includes(searchTerm.toLowerCase()) : true;
        return matchesRegion && matchesSearch
    })//handles the filtering of the data based on the region and search term

    const filters = [{id: 'Africa'},{id: 'Americas'},{id: 'Asia'},{id: 'Europe'},{id: 'Oceania'},{id: 'Polar'},]
    

    return(
        <>
            <div id='mainBg' className={`grid grid-cols-1 px-2 md:px-20 md:h-auto md:min-h-screen ${mode? 'darkmodeBg' : ''}`}>

                <div className='grid grid-cols-1 md:flex md:justify-between py-10'>

                    <div className={`element w-[90%] mb-5 shadow pl-7 py-3 rounded-[5px]  mx-auto md:pl-[-28px] md:w-80 md:mx-0 md:h-18 ${mode? 'darkmode' : ''}`}>
                        <img src={mode? whiteSearchSvg : searchSvg} alt="search icon" className="inline-block w-5 mr-5"/>
                        <input type="search" 
                        placeholder="search for a country..." 
                        className={`element outline-none md:w-60 ${mode? 'placeholder:text-white' : ''}`}
                        onChange={handleSearch}
                        value={searchTerm} 
                        />
                    </div>

                    <div className={`element relative pt-2 shadow w-52 px-5 rounded-[5px] cursor-pointer z-1 ml-5 h-18 ${mode? 'darkmode' : ''}`}>
                        
                        <div className="py-3 md:py-3 h-full w-full" onClick={showOption}>

                            {show? 
                            <div className='flex justify-between'>
                                <span>Reset Filters</span> 
                                <span><img src={mode? whiteArrowDown : arrowDown} className='pb-3 w-5 mt-1 inline-block ml-2'/></span>
                            </div>
                            : 
                            <div className='flex justify-between'>
                                <span>Filter by Region</span>
                                <span><img src={mode? whiteArrowUp : arrowUp} className='pb-3 w-5 mt-1 inline-block ml-2'/></span>
                            </div>}
                        </div>

                        <div id='filterBg' className={`element hidden absolute top-4 mt-17 w-52 right-0 pl-5 rounded-[10px] py-4 ${mode? 'darkmode': 'bg-white'}`}>
                            {filters.map((filter)=>(
                                <FilterOption id={filter.id} mode={mode} filter={filterRegion} key={filter.id}/>
                            ))}
                            
                        </div>

                    </div>

                </div>

                {isError?
                <Suspense fallback={<div><SuspenseHandle/><SuspenseHandle/></div>}>
                <div className='grid grid-cols-1 gap-6 mx-2 mt-15 md:grid-cols-2 md:gap-10 lg:grid-cols-4 lg:gap-14'>
                    {filteredData.map((datas)=>(
                            <Cards datas={datas} key={datas.name}/>
                        ))
                    }
                </div>
                </Suspense>
                :
                <>
                    <div className='text-red-400 mx-auto'>{errorMessage}</div>
                    <div onClick={fetchdata} className='mx-auto shadow p-2 pl-8 rounded-2xl h-14 w-40 hover:bg-gray-300 hover:text-white cursor-pointer text-3xl'>refresh</div>
                </>
                }

            </div>
            <Outlet/>
        </>
    )
}
