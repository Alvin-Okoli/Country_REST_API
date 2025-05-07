import { lazy, useContext } from 'react'
import { NavLink } from 'react-router'
const LazyLoadImage = lazy(()=> import('react-lazy-load-image-component').then(module=>({default: module.LazyLoadImage})))
import { themeContext } from '../themeProvider'

const Cards = ({datas})=>{

    let {mode} = useContext(themeContext)

    return (
        <NavLink to={`/country/${datas.name}`} className={`element cards shadow cursor-pointer mx-6 rounded-l pb-6 md:mx-0 ${mode? 'darkmode' : ''}`} key={datas.name}>
        <LazyLoadImage src={datas.flag} alt={datas.name} className='w-full mb-2 object-cover md:h-52'/> 
        <div>
            <div className='p-5'>
                <div className='font-bold my-3'>{datas.name}</div>
                <div><span className='font-semibold'>Population: </span> <span className='font-light'>{(datas.population).toLocaleString()}</span></div>
                <div><span className='font-semibold'>Region: </span> <span className='font-light'>{datas.region}</span></div>
                <div><span className='font-semibold'>Capital: </span> <span className='font-light'>{datas.capital}</span></div>
            </div>
        </div>
    </NavLink>
    )
}

export default Cards
