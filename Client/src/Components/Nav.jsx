import { Outlet } from "react-router";
import { useState } from "react";
import darkModeSvg from "../assets/moon-svgrepo-com (1).svg" ;
import darkModeInUseSvg from "../assets/sunny-night-svgrepo-com.svg";

export default function Nav(){
    const [mode, setMode] = useState(false);

    const changeMode = ()=>{
        if(mode === false){
            setMode(true)
        }else setMode(false)

        const navBg = document.getElementById('navBg')
        navBg.classList.toggle('darkmode')
    }

    return(
        <>
            <div id="navBg" className="flex justify-between px-6 pt-5 lg:px-20 mx-[-1px] h-18 border border-gray-100 shadow">
            <div className="font-bold">Where in the world?</div>

            <div 
            className="text-[12px] pt-2 cursor-pointer" 
            onClick={changeMode}
            > 
                {mode?

                <div> <img src={darkModeInUseSvg} alt="dark mode" className="inline-block w-3"/> 
                <span className="ml-1">Light Mode</span></div>

        : 

                <div> <img src={darkModeSvg} alt="dark mode" className="inline-block w-3"/> <span className="ml-1"> Dark Mode</span></div> 
                }
                
                </div>
        </div>

        <Outlet/>
        </>
    )
}