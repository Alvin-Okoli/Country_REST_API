import { useEffect, useState } from 'react'
import searchSvg from '../assets/search-svgrepo-com.svg'
import arrowDown from '../assets/arrow-down-svgrepo-com.svg'
import arrowUp from '../assets/arrow-up-svgrepo-com.svg'
import { NavLink, Outlet } from 'react-router'

export default function Country(){

    const [data, setData] = useState([])
    const [show, setShow] = useState(false)
    const [regionFilter, setRegionFilter] = useState('')

    useEffect(()=>{
        const fetchdata = async()=>{
            const res = await fetch('http://localhost:5000/load');
            const data = await res.json();
            setData(data);
            console.log(data)
        }

        fetchdata()
    }, [])

    const showOption = ()=>{        
        setRegionFilter(null)
        if (show === false){
            setShow(true)
        }else setShow(false)
    }

    const filterRegion = (filter)=>{
        console.log(filter)   
        setRegionFilter(filter)
    }



    return(
        <>
            <div className="grid grid-cols-1 px-2 md:px-20 my-10 pb-60">

                <div className='grid grid-cols-1 md:flex md:justify-between'>

                    <div className="w-[90%] mb-5 shadow py-3 pl-7 rounded-[5px] bg-white mx-auto md:pl-[-28px] md:w-80 md:mx-0">
                        <img src={searchSvg} alt="search icon" className="inline-block w-5 mr-5"/>
                        <input type="search" placeholder="search for a country..." className="outline-none" />
                    </div>

                    <div className='relative pt-2 shadow w-52 px-5 bg-white rounded-[5px] cursor-pointer z-1 ml-5'>
                        
                        <div className="flex justify-between py-5 md:py-3" onClick={showOption}>
                        {show? <> <span>Reset Filters</span> 
                         <span className='text-sm'><img src={arrowDown} className='w-5 mt-1'/></span> </>
                         :
                         <><span>Filter by Region</span>
                         <span id='arrow'><img src={arrowUp} className='w-5 mt-1'/></span></>}
                         </div>

                        {show &&  
                        <div className='absolute top-4 mt-17 bg-white w-52 right-0 pl-5 rounded-[10px] py-4'>
                            <div id='Africa' className='filter'  onClick={(e)=>{filterRegion(e.target.id)}}>Africa</div>
                            <div id='America' className='filter'  onClick={(e)=>{filterRegion(e.target.id)}}>America</div>
                            <div id='Asia' className='filter'  onClick={(e)=>{filterRegion(e.target.id)}}>Asia</div>
                            <div id='Europe' className='filter'  onClick={(e)=>{filterRegion(e.target.id)}}>Europe</div>
                            <div id='Oceania' className='filter'  onClick={(e)=>{filterRegion(e.target.id)}}>Oceania</div>
                        </div>}

                    </div>

                </div>

                {regionFilter? null: <div className='grid grid-cols-1 gap-6 mx-2 mt-15 md:grid-cols-2 md:gap-10 lg:grid-cols-4'>
                    {data.map((datas)=>(
                            <NavLink to={`/country/${datas.name}`} className='cards shadow cursor-pointer bg-white mx-6 rounded-l pb-6 md:mx-0' key={datas.name}>
                                <img src={datas.flag} alt={datas.name} className='w-full mb-2 md:h-52'/> 
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
                    }

            </div>
            <Outlet/>
        </>
    )
}