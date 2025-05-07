export const loader = async ({params})=>{
        const {country} = params
        const res = await fetch(`http://localhost:5000/country/${country}`);
        const data = await res.json()
        return {data}
    }
