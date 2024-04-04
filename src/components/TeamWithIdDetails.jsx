import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Chip,
} from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function TeamCard({ team }) {
    console.log(team)
    return (
        <Card className="mt-6 w-96 min-h-[380px] scale-125">
            <CardBody>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="mb-4 h-12 w-12 text-gray-900"
                >
                    <path
                        fillRule="evenodd"
                        d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 019.75 22.5a.75.75 0 01-.75-.75v-4.131A15.838 15.838 0 016.382 15H2.25a.75.75 0 01-.75-.75 6.75 6.75 0 017.815-6.666zM15 6.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"
                        clipRule="evenodd"
                    />
                    <path d="M5.26 17.242a.75.75 0 10-.897-1.203 5.243 5.243 0 00-2.05 5.022.75.75 0 00.625.627 5.243 5.243 0 005.022-2.051.75.75 0 10-1.202-.897 3.744 3.744 0 01-3.008 1.51c0-1.23.592-2.323 1.51-3.008z" />
                </svg>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                    Name: {team.name}
                </Typography>
                <Typography>
                Description: {team.description}
                </Typography>
                <div className="flex flex-wrap gap-4 mt-4 bg-deep-orange-100 p-3 rounded-lg">
                    {team.members.map((member, index) => {
                        return (
                            <Chip color="teal" key={index} size="sm" value={member.first_name + " " + member.last_name} />
                        )
                    })}
                </div>
            </CardBody>
            <CardFooter className="absolute bottom-0 left-0">
                Team Card Footer
            </CardFooter>
        </Card>
    );
}

const TeamWithIdDetails = () => {
    const { teamId } = useParams()
    console.log(teamId)
    const [team, setTeam] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
            // fetch team with teamId
            try {
                // const response = await axios.get(`http://localhost:8080/api/teams/${teamId}`)
                const response = await axios.get(`${import.meta.env.VITE_SERVER}/api/teams/${teamId}`)
                const data = response.data.data
                console.log(data)
                setTeam(data)
            } catch (error) {
                console.log(error.message)
            }
        }
        fetchData()
    }, [])
    return (
        <div className="flex items-center justify-center w-full h-[90vh]">
            {team !== null ? <TeamCard team={team} /> : "No Team found with this user id"}
        </div>
    )
}

export default TeamWithIdDetails