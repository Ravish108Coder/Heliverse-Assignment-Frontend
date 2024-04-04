import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';

import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
  } from "@material-tailwind/react";

  import { Select, Option } from "@material-tailwind/react";
import { useNavigate, useParams } from 'react-router-dom';

const UpdateUserForm = () => {
    const [user, setUser] = useState(null)
    const { userId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const response = await axios.get(`http://localhost:8080/api/users/${userId}`);
                const response = await axios.get(`${import.meta.env.VITE_SERVER}/api/users/${userId}`);
                const data = response.data.data;
                console.log(data)
                setUser(data)
            } catch (error) {
                console.log(error.message)
            }
        }
        fetchData()
    }, [])
  return (
    <div className='flex justify-center items-center h-[90vh]'>
    <div className='bg-white p-8 rounded-md'>
        {user && <SimpleRegistrationForm User={user} />}
    </div>
    </div>
  )
}

export default UpdateUserForm


 
function ControlledSelect({value, setValue, items, name}) {
   
    return (
      <>
      <div className='flex justify-between items-center gap-2'>
      <Typography variant="h6" color="blue-gray" >
      {name}
      </Typography>
      <div className="w-72">
        <Select
          label={`Select ${name}`}
          value={value}
          onChange={(val) => setValue(val)}
          containerProps={{required: true}}
        >
        {/* <Option selected disabled value="">choose</Option> */}
        {/* <option style={{display: "none"}} selected disabled></option> */}
        {
          items.map((item, index)=>{
            return (
              <Option key={index} value={item}>{item}</Option>
            )
          })
        }
        </Select>
        </div>
      </div>
      </>
    );

  }
  
   
function SimpleRegistrationForm({User}) {
    // console.log(User)
    const genderItems = ['Male', 'Female']
    const domainItems = ["Finance", "Marketing", "Sales", "UI Designing", "Management", "IT", "Business Development"]
    const availabilityItems = ['True', 'False']

    const [gender, setGender] = useState(User.gender)
    const [domain, setDomain] = useState(User.domain)
    const [availibility, setAvailibility] = useState(User.available ? 'True' : 'False')
    const [user, setUser] = useState({
      first_name: User.first_name,
      last_name: User.last_name,
      email: User.email,
    });

    const navigator = useNavigate()

    const handlUpdateUserSubmit = async (e) => {
      e.preventDefault()
      if(gender === '' || domain === '' || availibility === '') return alert('Please fill all fields')
      console.log('User created')
    console.log(e.target)
    const userData = {
      id: User.id,
      first_name: e.target[0].value,
      last_name: e.target[1].value,
      email: e.target[2].value,
      gender: gender,
      domain: domain,
      available: availibility
    };
  
    try {
    //   const response = await axios.put(`http://localhost:8080/api/users/${User.id}`, userData);
      const response = await axios.put(`${import.meta.env.VITE_SERVER}/api/users/${User._id}`, userData);
      console.log(response.data);
      alert('User Updated Successfully');
      navigator(`/user/${User._id}`)
    } catch (error) {
      console.log(error.message);
    }
    setAvailibility('')
    setDomain('')
    setGender('')
    setUser({
      first_name: '',
      last_name: '',
      email: '',
    });
  };

    return (
       <Card style={{minWidth: '384px'}} className='items-center' color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Update User Details
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Nice to meet you! Enter User details to Update.
        </Typography>
        <form onSubmit={handlUpdateUserSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
          <div className='flex justify-between items-center gap-2'>
          <div className='w-full'>
            <Typography variant="h6" color="blue-gray" className=" w-1/2">
              First Name
            </Typography>
            <Input
            value={user.first_name}
            onChange={(e) => setUser({ ...user, first_name: e.target.value })}
              size="md"
              containerProps={{className:" min-w-0"}}
              placeholder={User.first_name}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              style={{width: '80%'}}
              required
            />
            </div>
            <div className='w-full'>
            <Typography variant="h6" color="blue-gray" className="w-1/2">
              Last Name
            </Typography>
            <Input
            value={user.last_name}
            onChange={(e) => setUser({ ...user, last_name: e.target.value })}
              size="md"
              containerProps={{className:" min-w-0"}}
              placeholder={User.last_name}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none sm:",
              }}
              style={{width: '80%'}}
              required
            />
            </div>
            </div>
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Email
            </Typography>
            <Input
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
              size="lg"
              placeholder={User.email}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              required
            />
            <ControlledSelect value={gender} setValue={setGender} items={genderItems} name={'Gender'} />
            <ControlledSelect value={domain} setValue={setDomain} items={domainItems} name={'Domain'} />
            <ControlledSelect value={availibility} setValue={setAvailibility} items={availabilityItems} name={'Availability'} />

          </div>
          <Button type='submit' className="mt-6" fullWidth>
            Update User
          </Button>
        </form>
      </Card>
    );
  }