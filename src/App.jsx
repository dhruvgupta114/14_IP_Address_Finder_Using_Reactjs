import { useState,useEffect } from 'react'
import './App.css'

function App() {
  const [ipAddress, setIpAddress] = useState('')
  const [geoInfo, setGeoInfo] = useState({})

  

  useEffect(()=>{
    // invoke function to get IP Address
    getVisitorIP()
  },[])



  const getVisitorIP = async () =>{
   try {
    const response = await fetch('https://api.ipify.org')
    const data = await response.text();
    // console.log("getvisitordata", data)
    setIpAddress(data)
   } catch (error) {
    console.log('failed to fetch IP:', error)
   } 
  }


  const handleInputChange = (e) =>{
    setIpAddress(e.target.value)
  }



  const fetchIPInfo = async () => {
    try {
      const response = await fetch(`http://ip-api.com/json/${ipAddress}`)
      const data = await response.json()
      // console.log("geoloaction",data)
      setGeoInfo(data)
    } catch (error) {
      console.log('failed to location info:',error)
    }
  }

  return (
    <>
      <div className='App w-full bg-slate-300 p-8'>
        <h3 className='font-bold p-2'>IP to Address</h3>
        <div className="form-area ">
          <input className='p-2' type="text" value={ipAddress} onChange={handleInputChange} />
          <button className='bg-blue-500 p-2 text-white hover:text-black' onClick={fetchIPInfo}>Get Info</button>
        </div>
        </div>
        {geoInfo.country && (
          <div className="result flex flex-rwo items-center justify-center gap-2 mt-5 flex-wrap text-center">
            <div className=" p-5 flex flex-col gap-2"><strong>Country: </strong> {geoInfo.country} ({geoInfo.countryCode})
            <br /></div>
            <div className=" p-5 flex flex-col gap-2"><strong>Region: </strong> {geoInfo.regionName} ({geoInfo.region})
            <br /></div>

            <div className=" p-5 flex flex-col gap-2"><strong>Zip: </strong> {geoInfo.zip}
            <br /></div>

            <div className=" p-5 flex flex-col gap-2"><strong>Latitude: </strong> {geoInfo.lat} 
            <br /></div>

            <div className=" p-5 flex flex-col gap-2"><strong>Longitude: </strong> {geoInfo.lon} 
            <br /></div>
            <div className=" p-5 flex flex-col gap-2"><strong>Timezone: </strong> {geoInfo.timezone} 
            <br /></div>
            <div className=" p-5 flex flex-col gap-2"><strong>ISP: </strong> {geoInfo.isp} 
            <br /></div>
            <div className=" p-5 flex flex-col gap-2"><strong>Organization: </strong> {geoInfo.org} 
            <br /></div>
            <div className=" p-5 flex flex-col gap-2"><strong>AS: </strong> {geoInfo.as} 
            <br /></div>
            <div className=" p-5 flex flex-col gap-2"></div>
            <div className=" p-5 flex flex-col gap-2"><strong>IP Address: </strong> {geoInfo.query} 
            <br /></div>
          </div>
        )}
      
    </>
  )
}

export default App
