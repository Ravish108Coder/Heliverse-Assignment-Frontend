import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-screen flex flex-col items-center gap-20">
    <div>Home</div>
    <div className="flex w-max gap-4">
    <Link to={"/create-user"}>
      <Button color="blue">Create User</Button></Link>
      <Link to={"/users/all"}>
      <Button color="red">Get Users</Button></Link>
      <Link to="create-team">
      <Button color="green">Create Team</Button></Link>
        <Link to="get-team">
      <Button color="amber">Get Team</Button></Link>
    </div>
    </div>
  )
}

export default Home