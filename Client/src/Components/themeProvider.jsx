import { createContext,useState } from "react";

const themeContext = createContext()

function ThemeProvider({children}){
    const [mode, setMode] = useState(false);

    return(
        <themeContext.Provider value={{mode, setMode}}>
            {children}
        </themeContext.Provider>
    )
}

export {themeContext, ThemeProvider}