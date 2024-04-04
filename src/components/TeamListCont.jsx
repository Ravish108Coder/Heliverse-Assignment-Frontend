import React, { useEffect } from 'react'
import TeamCard from './TeamCard'
import axios from 'axios'

const TeamListCont = () => {
    const [team, setTeam] = React.useState([])
    useEffect(() => {
        const fetchTeam = async () => {
            try {
                // const res = await axios.get('http://localhost:8080/api/teams')
                const res = await axios.get(`${import.meta.env.VITE_SERVER}/api/teams`)
                const data = res.data.data
                console.log(data)
                setTeam(data)
            } catch (error) {
                console.log(error.message)
            }
        }
        fetchTeam()
    }, [])
  return (
    <>
        <div className='flex flex-wrap gap-2 w-[80%] mx-auto'>
            {
                team.map((_team, index)=>{
                    return (
                        <TeamCard key={index} team={_team} />
                    )
                })
            }
        </div>
    </>
  )
}

export default TeamListCont