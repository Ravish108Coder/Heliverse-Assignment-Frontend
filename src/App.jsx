import { Button } from "@material-tailwind/react";

import {Routes, Route, Link} from 'react-router-dom'
import UsersListCont from './components/UsersListCont';
import Home from "./components/Home";
import Explore from "./components/Explore";
import CreateUserForm from "./components/CreateUserForm";
import TeamListCont from "./components/TeamListCont";
import UserWithIdDetails from "./components/UserWithIdDetails";
import TeamWithIdDetails from "./components/TeamWithIdDetails";
import UpdateUserForm from "./components/UpdateUserForm";
 
export function ButtonDefault() {
  return <Link to={"/"}><Button>Home</Button></Link>;
}

function App() {

  return (
    <div className='bg-blue-gray-900'>
    <ButtonDefault/>
    <br />
    <div className='min-h-[95vh]'>
    <Routes>
      <Route exact path='/' element={<Home />} />
      <Route exact path='/create-user' element={<CreateUserForm />} />
      <Route exact path='/get-all-teams' element={<TeamListCont />} />
      <Route exact path='/explore' element={<Explore />} />
      <Route exact path='/user/:userId' element={<UserWithIdDetails />} />
      <Route exact path='/updateUser/:userId' element={<UpdateUserForm />} />
      <Route exact path='/team/:teamId' element={<TeamWithIdDetails />} />
      <Route exact path='/users/all' element={<UsersListCont />} />
      <Route exact path='*' element="404 Not Found Page" />
    </Routes>
    </div>
    </div>
  )
}

export default App
