import React from 'react'

import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Tooltip,
  } from "@material-tailwind/react";

  import { Avatar } from "@material-tailwind/react";
 
export function AvatarDefault({src}) {
  return <Avatar size='xl' src={src} alt="avatar" />;
}
   
  export function ProfileCard({user}) {
    const userfullName = user?.first_name + " " + user?.last_name;
    return (
      <Card color='gray' className="w-80 min-h-80">
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

const UserCard = ({user}) => {
  return (
    <ProfileCard user={user} />
  )
}

export default UserCard