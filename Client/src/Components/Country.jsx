import { useEffect, useState, useContext } from 'react'
import { NavLink, Outlet } from 'react-router'
import { themeContext } from './themeProvider'

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
    const [test, setTest] = useState(false)
    const [regionFilter, setRegionFilter] = useState('')
    const [searchTerm, setSearchTerm] = useState('')
    let {mode} = useContext(themeContext)

    useEffect(()=>{
        const controller = new AbortController();
        const signal = controller.signal;

        const fetchdata = async()=>{
            const res = await fetch('http://localhost:5000/load', {signal});
            const data = await res.json();
            setData(data);
            console.log(data)
        }

        fetchdata()

        return ()=>{
            controller.abort()
        }
    }, [])

    useEffect( ()=>{
        const mainBg = document.getElementById('mainBg')
        let element = document.getElementsByClassName('element')
        let filter = document.getElementsByClassName('filter')
        let filterBg = document.getElementById('filterBg')

        mainBg.classList.toggle('darkmodeBg')//switch to the dark enviroment
        
        if(filterBg){
            filterBg.classList.toggle('bg-white')
        }

        Array.from(filter).forEach((elements=>{
            elements.classList.toggle('darkmode')
        }))//to switch dark mode for elements

        Array.from(element).forEach((elements=>{
            elements.classList.toggle('darkmode')
        }))//to switch dark mode for elements
    }, [mode])//This useEffect hook handles changes in theme

    const showOption = ()=>{  
        const filterBg = document.getElementById('filterBg')      
        setRegionFilter(null)
        if (show === false){
            setShow(true)
        }else setShow(false)
        
        filterBg.classList.toggle('hidden')//This toggles the filter options to show or hide    
    }//This switches show between true or false and shows the filter options

    const filterRegion = (filter)=>{
        console.log(filter)   
        setRegionFilter(filter)
    }//This function filters the region sets the filter

    const handleSearch = (e)=>{setSearchTerm(e.target.value)}

    const filteredData = data.filter(country=>{
        const matchesRegion = regionFilter? country.region === regionFilter : true;
        const matchesSearch = searchTerm? country.name.toLowerCase().includes(searchTerm.toLowerCase()) : true;
        return matchesRegion && matchesSearch
    })//handles the filtering of the data based on the region and search term
    

    return(
        <>
            <div id='mainBg' className="grid grid-cols-1 px-2 md:px-20 main">

                <div className='grid grid-cols-1 md:flex md:justify-between py-10'>

                    <div className="element w-[90%] mb-5 shadow pl-7 py-3 rounded-[5px]  mx-auto md:pl-[-28px] md:w-80 md:mx-0">
                        <img src={mode? whiteSearchSvg : searchSvg} alt="search icon" className="inline-block w-5 mr-5"/>
                        <input type="search" 
                        placeholder="search for a country..." 
                        className="element outline-none md:w-60"
                        onChange={handleSearch}
                        value={searchTerm} 
                        />
                    </div>

                    <div className='element relative pt-2 shadow w-52 px-5 rounded-[5px] cursor-pointer z-1 ml-5'>
                        
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

                        <div id='filterBg' className='element hidden bg-white absolute top-4 mt-17 w-52 right-0 pl-5 rounded-[10px] py-4'>
                            <div id='Africa' className='filter'  onClick={(e)=>{filterRegion(e.target.id)}}>Africa</div>
                            <div id='Americas' className='filter'  onClick={(e)=>{filterRegion(e.target.id)}}>America</div>
                            <div id='Asia' className='filter'  onClick={(e)=>{filterRegion(e.target.id)}}>Asia</div>
                            <div id='Europe' className='filter'  onClick={(e)=>{filterRegion(e.target.id)}}>Europe</div>
                            <div id='Oceania' className='filter'  onClick={(e)=>{filterRegion(e.target.id)}}>Oceania</div>
                        </div>

                    </div>

                </div>

                <div className='grid grid-cols-1 gap-6 mx-2 mt-15 md:grid-cols-2 md:gap-10 lg:grid-cols-4 lg:gap-14'>
                    {filteredData.map((datas)=>(
                            <NavLink to={`/country/${datas.name}`} className='element cards shadow cursor-pointer mx-6 rounded-l pb-6 md:mx-0' key={datas.name}>
                                <img src={datas.flag} alt={datas.name} className='w-full mb-2 object-cover md:h-52'/> 
                                <div>
                                    <div className='p-5'>
                                        <div className='font-bold my-3'>{datas.name}</div>
                                        <div><span className='font-semibold'>Population: </span> <span className='font-light'>{(datas.population).toLocaleString()}</span></div>
                                        <div><span className='font-semibold'>Region: </span> <span className='font-light'>{datas.region}</span></div>
                                        <div><span className='font-semibold'>Capital: </span> <span className='font-light'>{datas.capital}</span></div>
                                    </div>
                                </div>
                            </NavLink>
                        ))
                    }
                </div>

            </div>
            <Outlet/>
        </>
    )
}