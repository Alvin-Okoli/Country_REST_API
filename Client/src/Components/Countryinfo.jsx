import { useEffect, useState } from "react";
import { NavLink, useLoaderData, Outlet, useNavigate } from "react-router";


export default function Countryinfo(){

   const {data} = useLoaderData();
   console.log(data);
   const datas = data[0];
   const navigate = useNavigate();

   const displayNestedArray = (languages)=>{
        let language = languages.map((lang)=>{
            return lang.name.toString()
        })
        return language.join(', ');
    }

   

    return(
        <div className="px-4 mb-20">
            <button to='/' className="shadow py-2 m-5 mt-10 w-28 md:w-32 bg-white cursor-pointer" onClick={()=>navigate('/')}> &#8592; Back</button>
            
            <div className="grid grid-cols-1 md:grid-cols-2 mt-10">

                <div>
                    <img src={datas.flag} alt={datas.name} className="w-80 mx-auto md:w-140 "/>
                </div>

                <div className="mx-5">

                    <div className="font-bold my-10 text-xl md:text-2xl">
                        {datas.name}
                    </div>

                    <div className="grid grid-cols-1 my-10 md:grid-cols-2">
                        <div>

                            <div className="my-3 md:my-2">
                                <span className="font-semibold md:infoKey">Native Name : </span>
                                <span>{datas.nativeName}</span>
                            </div>

                            <div className="my-3 md:my-2">
                                <span className="font-semibold md:infoKey">Population : </span>
                                <span> {datas.population}</span>
                            </div>

                            <div className="my-3 md:my-2">
                                <span className="font-semibold md:infoKey">Region : </span>
                                <span>{datas.region}</span>
                            </div>

                            <div className="my-3 md:my-2">
                                <span className="font-semibold md:infoKey">Sub Region : </span>
                                <span>{datas.subregion}</span>
                            </div>

                            <div className="my-3 md:my-2">
                                <span className="font-semibold md:infoKey">Capital : </span>
                                <span> {datas.capital}</span>
                            </div>

                        </div>

                        <div>

                            <div className="mt-12 md:my-2">
                                <span className="font-semibold md:infoKey">Top Level Domain : </span>
                                <span>{datas.topLevelDomain}</span>
                            </div>

                            <div className="my-3 md:my-2">
                                <span className="font-semibold md:infoKey">Currencies : </span>
                                {datas.currencies? <span>{displayNestedArray(datas.currencies)}</span>: <span>n/a</span>}
                            </div>

                            <div className="my-3 md:my-2">
                                <span className="font-semibold md:infoKey">Languages : </span>
                                { datas.languages? <span>{displayNestedArray(datas.languages)}</span>: <span>n/a</span>}
                            </div>

                        </div>

                    </div>

                    <div>
                    <span className="font-semibold my-3 md:my-0 block md:inline md:infoKey">Border Countries : </span>

                    {datas.borders? 
                    datas.borders.map((border)=>(
                        <span className="shadow mx-2 p-2 text-[10px]">{border}</span>
                    )) 
                    : 
                    <span>n/a</span> }

                    </div>

                </div>

            </div>
        <Outlet/>
        </div>
    )
}

