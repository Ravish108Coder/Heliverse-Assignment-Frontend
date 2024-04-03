import { useLocation, useNavigate, useParams } from "react-router-dom"
import { UsersList } from "../data"
import UserCard from "./UserCard"
import React, { useEffect, useState } from "react"
import axios from "axios"

import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

import { Input } from "@material-tailwind/react";

function InputDefault({ searchName, handleFilterSearch }) {
  return (
    <div className="w-72">
      {/* <Input label="Username" value={searchName} onChange={(e) => handleFilterSearch(e.target.value)} /> */}
      <Input label="Username" value={searchName} onChange={(e) => handleFilterSearch(e.target.value)} />
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
  const [fetchUrl, setFetchUrl] = useState('http://localhost:8080/api/users?page=1&limit=20')


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
    let url = `http://localhost:8080/api/users?page=${active}&limit=${limit}`

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

    if (searchName !== '') {
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
        // console.log(res.data);
        if (res.data.data.length === 0) {
          navigator('/404')
        }
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
    // const searchParams = new URLSearchParams(location.search);
    // searchParams.set('page', 1)
    // navigator({ search: searchParams.toString() });
    setSearchName(value)
    // let url = fetchUrl
    // if (value === '') return;
    // url += `&searchName=${value}`
    // const abortController = new AbortController();
    // const signal = abortController.signal;

    // const fetchUsers = async () => {
    //   try {
    //     setActive(active => 1)
    //     setLoading(true);
    //     // console.log(url )
    //     const res = await axios.get(url, {
    //       signal: signal
    //     });
    //     console.log(res.data);
    //     setUsers(res.data.data);
    //     setTotalPages(Math.ceil(res.data.total / limit));
    //   } catch (error) {
    //     if (error.name === 'AbortError') {
    //       // console.log('Request aborted');
    //     } else {
    //       // console.error(error);
    //     }
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // fetchUsers();
  }


  return (
    <div>

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