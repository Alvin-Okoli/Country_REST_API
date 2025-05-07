import { Outlet } from "react-router";
import { useState, useContext } from "react";
import darkModeSvg from "../assets/moon-svgrepo-com (1).svg" ;
import darkModeInUseSvg from "../assets/sunny-night-svgrepo-com.svg";
import { themeContext } from "./themeProvider";


export default function Nav(){
    let {mode ,setMode} = useContext(themeContext)   

    const changeMode = ()=>{
        if(mode === false){
            setMode(true)
            localStorage.setItem('mode', 'true')
        }else {
            setMode(false)
            localStorage.setItem('mode', 'false')
        }
    }

    return(
        <>
            <nav id="navBg" className={`flex justify-between px-6 pt-5 lg:px-20 mx-[-1px] h-18 shadow ${mode? 'darkmode' : ''}`}>

                <div className="font-bold">Where in the world?</div>

                <div 
                className="text-[12px] pt-2 cursor-pointer" 
                onClick={changeMode}
                > 
                    {mode?

                    <div> <img src={darkModeInUseSvg} alt="dark mode" className="inline-block w-3"/> 
                    <span className="ml-1 text-white">Light Mode</span></div>

            : 

                    <div> <img src={darkModeSvg} alt="dark mode" className="inline-block w-3"/> 
                    <span className="ml-1"> Dark Mode</span></div> 
                    }
                    
                </div>
        </nav>

        <Outlet/>
        </>
    )
}