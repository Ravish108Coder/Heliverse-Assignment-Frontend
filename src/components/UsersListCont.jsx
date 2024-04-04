import { useLocation, useNavigate, useParams } from "react-router-dom"
import { UsersList } from "../data"
import UserCard from "./UserCard"
import React, { useEffect, useState } from "react"
import axios from "axios"


import {
  Button, IconButton, Typography, useSelect, Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Textarea, Chip, Tooltip
} from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

import { Input } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux"
import { resetTeam } from "../store/team/teamSlice"

function InputDefault({ searchName, handleFilterSearch }) {
  return (
    <div className="w-72">
      <Input label="Username" value={searchName} onChange={(e) => handleFilterSearch(e.target.value)} />
    </div>
  );
}


export function MessageDialog({ currentRef }) {
  const [open, setOpen] = React.useState(false);
  const teams = useSelector(state => state.team)
  const handleOpen = () => setOpen(!open);
  const [teamDetails, setTeamDetails] = React.useState({
    teamName: '',
    description: ''
  })
  const dispatch = useDispatch()
  const navigator = useNavigate()

  const handleSubmitTeamForm = (e) => {
    e.preventDefault()
    console.log('kya hua brother')
    const fetchData = async () => {
      console.log('kya hua brother2')
      try {
        const data = {
          teamName: teamDetails.teamName,
          description: teamDetails.description,
          teams: teams
        }
        // const response = await axios.post('http://localhost:8080/api/teams', data);
        const response = await axios.post(`${import.meta.env.VITE_SERVER}/api/teams`, data);
        if (response.status !== 201) {
          console.log('error creating team')
          return
        }
        console.log(response.data);
        // alert('Team created');
        console.log('Team created')
        handleOpen()
        dispatch(resetTeam())

        navigator('/get-all-teams')
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchData()
    setTeamDetails({
      teamName: '',
      description: ''
    })
  }
  return (
    <div>
      <Button ref={currentRef} onClick={handleOpen}>Message Dialog</Button>
      <Dialog open={open} size="sm" handler={handleOpen}>
        <form onSubmit={handleSubmitTeamForm}>
          <div className="flex items-center justify-between">
            <DialogHeader className="flex flex-col items-start">
              {" "}
              <Typography className="mb-1" variant="h4">
                Create Team
              </Typography>
            </DialogHeader>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="mr-3 h-5 w-5 cursor-pointer hover:bg-black hover:text-white"
              onClick={handleOpen}
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <DialogBody>
            <Typography className="mb-10 -mt-7 " color="gray" variant="lead">
              Write team name and description and then click button.
            </Typography>
            <div className="grid gap-6">
              <Typography className="-mb-1" color="blue-gray" variant="h6">
                TeamName
              </Typography>
              <Input required label="TeamName" value={teamDetails.teamName} onChange={(e) => setTeamDetails({ ...teamDetails, teamName: e.target.value })} />
              <Textarea required label="Description" value={teamDetails.description} onChange={(e) => setTeamDetails({ ...teamDetails, description: e.target.value })} />
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {
                // Add logic to display the team members
                teams.map((member, index) => {
                  return (
                    <div key={index} className="flex items-center gap-4">
                      <Chip size="sm" value={member.first_name + " " + member.last_name} />
                    </div>
                  )
                })
              }
            </div>
          </DialogBody>
          <DialogFooter className="space-x-2">
            <Button variant="outlined" color="red" onClick={handleOpen}>
              cancel
            </Button>
            <Button type="submit" variant="gradient" color="amber">
              Create
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </div>
  );
}

const UsersListCont = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const navigator = useNavigate();

  const limit = 20
  const [users, setUsers] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [totalPages, setTotalPages] = React.useState(0)
  const [active, setActive] = React.useState(1);

  const [selectedGender, setSelectedGender] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('');
  const [selectedAvailability, setSelectedAvailability] = useState('');
  const [searchName, setSearchName] = useState('')
  const teams = useSelector(state => state.team)


  const handleGenderChange = (event) => {
    const newGender = event.target.value;
    setSelectedGender(newGender);
    const newSearchParams = new URLSearchParams(searchParams);
    if (newGender === '') {
      searchParams.has('gender') && newSearchParams.delete('gender')
    } else {
      newSearchParams.set('gender', newGender);
    }
    newSearchParams.set('page', 1)
    navigator({ search: newSearchParams.toString() });
    // Add logic to update URL with the selected gender
  };

  const handleDomainChange = (event) => {
    const newDomain = event.target.value;
    setSelectedDomain(newDomain);
    const newSearchParams = new URLSearchParams(searchParams);
    if (newDomain === '') {
      searchParams.has('domain') && newSearchParams.delete('domain')
    } else {
      newSearchParams.set('domain', newDomain);
    }
    newSearchParams.set('page', 1)
    navigator({ search: newSearchParams.toString() });
    // Add logic to update URL with the selected domain
  };

  const handleAvailabilityChange = (event) => {
    const newAvailability = event.target.value;
    setSelectedAvailability(newAvailability);
    const newSearchParams = new URLSearchParams(searchParams);
    if (newAvailability === '') {
      searchParams.has('available') && newSearchParams.delete('available')
    } else {
      newSearchParams.set('available', newAvailability);
    }
    newSearchParams.set('page', 1)
    navigator({ search: newSearchParams.toString() });
    // Add logic to update URL with the selected availability
  };

  useEffect(() => {

    const searchParams = new URLSearchParams(location.search);
    if (!searchParams.has('page')) {
      searchParams.set('page', 1)
      navigator({ search: searchParams.toString() });
    }

    let page = searchParams.get('page')
    // console.log(page, 'here we go')
    if (Number(page) < 1) {
      // console.log('hi')
      searchParams.set('page', 1)
      navigator({ search: searchParams.toString() });
    }
    // let url = `http://localhost:8080/api/users?page=${active}&limit=${limit}`
    let url = `${import.meta.env.VITE_SERVER}/api/users?page=${active}&limit=${limit}`

    if (searchParams.has('domain')) {
      setSelectedDomain(searchParams.get('domain'));
      url += `&domain=${searchParams.get('domain')}`
    }
    if (searchParams.has('gender')) {
      setSelectedGender(searchParams.get('gender'));
      url += `&gender=${searchParams.get('gender')}`
    }
    if (searchParams.has('available')) {
      setSelectedAvailability(searchParams.get('available'));
      url += `&available=${searchParams.get('available')}`
    }

    if (searchParams.has('searchName')) {
      setSearchName(searchParams.get('searchName'));
      searchParams.set('searchName', searchName)
      url += `&searchName=${searchName}`
    }

    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchUsers = async () => {
      try {
        setActive(active => Number(page))
        setLoading(true);
        // console.log(url )
        const res = await axios.get(url, {
          signal: signal
        });
        console.log(res.data);
        // if (res.data.data.length === 0) {
        //   navigator('/404')
        // }
        setUsers(res.data.data);
        setTotalPages(Math.ceil(res.data.total / limit));
      } catch (error) {
        if (error.name === 'AbortError') {
          // console.log('Request aborted');
        } else {
          // console.error(error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();

    return () => {
      abortController.abort(); // Cancel the ongoing request when the component is unmounted or when the active dependency changes
    };
  }, [active, searchName, selectedGender, selectedDomain, selectedAvailability]);

  const handleFilterSearch = (value) => {

    setSearchName(value)
    const searchParams = new URLSearchParams(location.search);
    if (value === '') {
      searchParams.has('searchName') && searchParams.delete('searchName')
    } else {
      searchParams.set('searchName', value);
    }
    searchParams.set('page', 1)
    navigator({ search: searchParams.toString() });
  }

  const currentRef = React.useRef(null)

  const handleCreateTeam = () => {
    console.log('hi')
    console.log(teams)
    if (teams.length === 0) return alert('Please add atleast one member to the team')
    console.log('hi2')
    currentRef.current.click()
    return
    const fetchData = async () => {
      try {
        // const response = await axios.post('http://localhost:8080/api/teams', teams);
        const response = await axios.post(`${import.meta.env.VITE_SERVER}/api/teams`, teams);
        console.log(response.data);
        alert('Team created');
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchData()
  }


  return (
    <div>
      <span className="hidden"><MessageDialog currentRef={currentRef} /></span>
      <div className="absolute top-0 right-0">
        <Button onClick={handleCreateTeam} color="green">Create Team</Button>
      </div>
      <div className="w-full flex justify-center mb-5">
        <InputDefault searchName={searchName} handleFilterSearch={handleFilterSearch} />
      </div>
      {loading ? "Loading..." :
        <>
          <div className='flex w-full items-center justify-center gap-5'>
            <select value={selectedGender} onChange={handleGenderChange}>
              <option value="">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            <select value={selectedDomain} onChange={handleDomainChange}>
              <option value="">Domain</option>
              <option value="Finance">Finance</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
              <option value="UI Designing">UI Designing</option>
              <option value="Management">Management</option>
              <option value="IT">IT</option>
              <option value="Business Development">Business Development</option>
            </select>

            <select value={selectedAvailability} onChange={handleAvailabilityChange}>
              <option value="">Availability</option>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>
          <div className="flex flex-wrap gap-5 items-center justify-center py-5">
            {
              users.map((user, index) => {
                return (
                  <UserCard key={index} user={user} />
                )
              })
            }
          </div>
        </>
      }
      <SimplePagination active={active} setActive={setActive} totalPages={totalPages} />
    </div>
  )
}

function SimplePagination({ active, setActive, totalPages }) {

  const navigate = useNavigate()

  const next = () => {
    if (active === totalPages) return;

    setActive(active => active + 1);
    const searchParams = new URLSearchParams(location.search);
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('page', active + 1)
    navigate({ search: newSearchParams.toString() });
    // navigate(`/users/all/${active + 1}`)
  };

  const prev = () => {
    if (active === 1) return;

    setActive(active => active - 1);
    // navigate(`/users/all/${active - 1}`)
    const searchParams = new URLSearchParams(location.search);
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('page', active - 1)
    navigate({ search: newSearchParams.toString() });
  };

  return (
    <div className="w-screen flex justify-center">
      <div className="flex items-center gap-8 fixed bottom-2 bg-white rounded-3xl py-2 px-4 shadow-[0px_10px_40px_10px_#4a5568]">
        <IconButton
          size="sm"
          variant="outlined"
          onClick={prev}
          disabled={active === 1}
        >
          <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
        </IconButton>
        <Typography color="gray" className="font-normal">
          Page <strong className="text-gray-900">{active}</strong> of{" "}
          <strong className="text-gray-900">{totalPages}</strong>
        </Typography>
        <IconButton
          size="sm"
          variant="outlined"
          onClick={next}
          disabled={active === totalPages}
        >
          <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
        </IconButton>
      </div>
    </div>
  );
}

export default UsersListCont