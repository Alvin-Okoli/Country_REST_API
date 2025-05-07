

const SuspenseHandle = ()=>{

    return(
        
        <div className='my-6 grid grid-cols-1 md:grid-cols-2 md:gap-10 lg:grid-cols-4 lg:gap-10'>

            {[...Array(4)].map(()=>(
                <div className='m-6'>
                <div className='w-full h-72 md:h-52 animate-pulse bg-gray-300'></div> 
                <div className='p-2'>
                    <div className='px-3 h-5 w-3/4 animate-pulse bg-gray-300 rounded-4xl mb-2'></div>
                    <div className='px-3 h-5 w-3/4 animate-pulse bg-gray-300 rounded-4xl mb-2'></div>
                    <div className='px-3 h-5 w-3/4 animate-pulse bg-gray-300 rounded-4xl mb-2'></div>
                    <div className='px-3 h-5 w-3/4 animate-pulse bg-gray-300 rounded-4xl mb-2'></div>
                </div>
            </div>
            ))}
            
        </div>
    )
}

export default SuspenseHandle