import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Explore = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const navigator = useNavigate();
    const [selectedSortBy, setSelectedSortBy] = useState('');
    const [selectedGender, setSelectedGender] = useState('');
    const [selectedDomain, setSelectedDomain] = useState('');
    const [selectedAvailability, setSelectedAvailability] = useState('');

    useEffect(() => {
        // Add logic to fetch data based on the selected filters
        const searchParams = new URLSearchParams(location.search);
        searchParams.has('sortBy') && setSelectedSortBy(searchParams.get('sortBy'));
        searchParams.has('gender') && setSelectedGender(searchParams.get('gender'));
        searchParams.has('domain') && setSelectedDomain(searchParams.get('domain'));
        searchParams.has('available') && setSelectedAvailability(searchParams.get('available'));
    }, []);

    const handleSortChange = (event) => {
        const newSortBy = event.target.value;
        setSelectedSortBy(newSortBy);
        const newSearchParams = new URLSearchParams(searchParams);
        if (newSortBy === ''){
            searchParams.has('sortBy') && newSearchParams.delete('sortBy')
        } else{
            newSearchParams.set('sortBy', newSortBy);
        }
        navigator({ search: newSearchParams.toString() });
    };

    const handleGenderChange = (event) => {
        const newGender = event.target.value;
        setSelectedGender(newGender);
        const newSearchParams = new URLSearchParams(searchParams);
        if (newGender === '') {
            searchParams.has('gender') && newSearchParams.delete('gender')
        } else {
            newSearchParams.set('gender', newGender);
        }
        navigator({ search: newSearchParams.toString() });
        // Add logic to update URL with the selected gender
    };

    const handleDomainChange = (event) => {
        const newDomain = event.target.value;
        setSelectedDomain(newDomain);
        const newSearchParams = new URLSearchParams(searchParams);
        if (newDomain === ''){
            searchParams.has('domain') && newSearchParams.delete('domain')
        } else{
            newSearchParams.set('domain', newDomain);
        }
        navigator({ search: newSearchParams.toString() });
        // Add logic to update URL with the selected domain
    };

    const handleAvailabilityChange = (event) => {
        const newAvailability = event.target.value;
        setSelectedAvailability(newAvailability);
        const newSearchParams = new URLSearchParams(searchParams);
        if (newAvailability === ''){
            searchParams.has('available') && newSearchParams.delete('available')
        }else{
            newSearchParams.set('available', newAvailability);
        } 
        navigator({ search: newSearchParams.toString() });
        // Add logic to update URL with the selected availability
    };

    return (
        <div>
            <h1>Explore Page</h1>
            <div className='flex w-screen items-center justify-center gap-5'>

            <select value={selectedSortBy} onChange={handleSortChange}>
                <option value="">All</option>
                <option value="date">Date</option>
                <option value="views">Views</option>
            </select>

            <select value={selectedGender} onChange={handleGenderChange}>
                <option value="">All Genders</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>

            <select value={selectedDomain} onChange={handleDomainChange}>
                <option value="">All Domains</option>
                <option value="Sales">Sales</option>
                <option value="Marketing">Marketing</option>
                <option value="IT">IT</option>
                {/* Add more options as needed */}
            </select>

            <select value={selectedAvailability} onChange={handleAvailabilityChange}>
                <option value="">All</option>
                <option value="true">Available</option>
                <option value="false">Not Available</option>
            </select>
            </div>
        </div>
    );
}

export default Explore;
