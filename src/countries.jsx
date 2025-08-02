import { useEffect,useState } from "react"



const Card=({name, flag, abbr})=>{
    return (
        <div
        style={
            {
                display:"flex",
                flexDirection:"column",
                alignItems:"center",
                justifyContent:"center",
                gap:"4px",
                border:"1px solid black",
                borderRadius:"4px",
                height:"200px",
                width:"200px",
                textAlign:"center"

            }
        }
        >
            <img src={flag} alt={`flag of ${abbr}`} style={{
                height:"100px",
                width:"100px"
            }} />
            <h2>{name}</h2>
        </div>
    )
}
const API=" https://xcountries-backend.azurewebsites.net/all"

export default function Countries(){

    const [countries, setCountries]=useState([])
    const [error, setError]=useState(null)

    useEffect(()=>{
        const fetchCountries=async()=>{

            try{
                const res=await fetch("https://xcountries-backend.azurewebsites.net/all")
                if(!res.ok){
                    throw new Error(`HTTP status ${res.status}`)
                }
                const data=await res.json()
                setCountries(data)
            }catch(err){
                console.error('Error fetching data: ', err);
                setError('Failed to load country data.');
            }
        }
        fetchCountries()
    },[])

    if (error) return <p>{error}</p>;

    return (
        <div style={
            {
                display:"flex",
                gap:"10px",
                flexWrap:"wrap"
            }
        }>
        {countries.map(({name,flag,abbr})=>(<Card name={name} flag={flag} abbr={abbr} key={abbr}/>))}
        </div>
    )
} 