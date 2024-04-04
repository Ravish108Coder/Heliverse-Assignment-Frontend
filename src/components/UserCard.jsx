import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Tooltip,
    Checkbox,
    Button,
    IconButton
  } from "@material-tailwind/react";

  import { Avatar } from "@material-tailwind/react";
import { addTeam, removeTeam } from '../store/team/teamSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

  function AvatarDefault({src}) {
  return <Avatar size='xl' src={src} alt="avatar" />;
}
   
 function ProfileCard({user}) {
    const userfullName = user?.first_name + " " + user?.last_name;
    const team = useSelector(state => state.team)
    const included = team.some(member => member.id === user.id)
    const dispatch = useDispatch()
    const navigator = useNavigate()
    const [checked, setChecked] = React.useState(included)
    useEffect(() => {
      // console.log('hi')
      setChecked(team.some(member => member.id === user.id))
    }, [team])
    const handleCheckBoxChange = async(e) => {
      if(e.target.checked){
        // add to team member of redux
        let flag = true
        let length = team.length
        dispatch(addTeam(user))
        console.log(team.length, length)
      } else {
        // remove from team member of redux
        dispatch(removeTeam(user))
        console.log('removed')
      }

    }

    const handleDeleteUser = async () => {
      console.log(user)
      try {
        // const response = await axios.delete(`http://localhost:8080/api/users/${user._id}`);
        const response = await axios.delete(`${import.meta.env.VITE_SERVER}/api/users/${user.id}`);
        console.log(response.data);
        alert('User deleted');
        navigator('/')
      } catch (error) {
        console.log(error.message)
      }
    }
    return (
      <Card color='gray' className="w-80 min-h-80 relative pb-8">
        <div  className='flex justify-center'>
          <AvatarDefault src={user?.avatar} />
        </div>
        <div className='absolute bottom-0 flex justify-between w-full p-4'>
          <Button color='white' onClick={()=>navigator(`/user/${user._id}`)}>View</Button>
          <IconButton color="amber" onClick={handleDeleteUser}>
          <i className="fa-solid fa-trash"></i>
      </IconButton>
          <Button color='red' onClick={()=>navigator(`/updateUser/${user._id}`)}>Edit</Button>
        </div>
        <div className='absolute top-0 right-0'>
          <Checkbox color='amber' onChange={handleCheckBoxChange} className={`${user?.available ? "": "hidden"}`} checked={checked} />
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