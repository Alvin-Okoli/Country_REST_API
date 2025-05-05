export const loader = async ({params})=>{
        const {country} = params
        const res = await fetch(`https://country-rest-api-tghk.onrender.com/country/${country}`);
        const data = await res.json()
        return {data}
    }
