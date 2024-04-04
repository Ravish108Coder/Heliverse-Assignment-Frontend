import React, { useEffect } from 'react'

import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Tooltip,
    Checkbox,
    Button
  } from "@material-tailwind/react";

  import { Avatar } from "@material-tailwind/react";
import { useNavigate, useParams } from 'react-router-dom';

  function AvatarDefault({src}) {
  return <Avatar size='xl' src={src} alt="avatar" />;
}
   
 function ProfileCard({user}) {
    const userfullName = user?.first_name + " " + user?.last_name;
    return (
      <Card className="w-96 min-h-80 relative scale-150">
        <div  className='flex justify-center'>
          <AvatarDefault src={user?.avatar} />
        </div>
        
        <CardBody className="text-center">
          <Typography variant="h4" color="blue-gray" className="mb-2">
            Name: {userfullName}
          </Typography>
          <Typography color="blue-gray" className="font-medium" textGradient>
            Email : {user?.email}
          </Typography>
          <Typography color="blue-gray" className="font-medium" textGradient>
           Gender:  {user?.gender}
          </Typography>
          <Typography color="blue-gray" className="font-medium" textGradient>
            Domain : {user?.domain}
          </Typography>
          <Typography color="blue-gray" className="font-medium" textGradient>
            Available : {user?.available ? "true" : "false"}
          </Typography>
        </CardBody>
      </Card>
    );
  }

const UserWithIdDetails = () => {
    const { userId } = useParams();
    const [user, setUser] = React.useState(null)
    useEffect(() => {
        const fetchData = async () => {
            try {
                // const response = await fetch(`http://localhost:8080/api/users/${userId}`);
                const response = await fetch(`${import.meta.env.VITE_SERVER}/api/users/${userId}`);
                const data = await response.json();
                console.log(data)
                setUser(data.data)
            } catch (error) {
                console.log(error.message)
            }
        }
        fetchData()
    }, [])
  return (
    <div className='flex items-center justify-center h-[90vh]'>
    <ProfileCard user={user} />
    </div>
  )
}

export default UserWithIdDetails