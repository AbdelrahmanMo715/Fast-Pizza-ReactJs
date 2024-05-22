import { useSelector } from "react-redux"


function UserName() {
  const userName = useSelector((store)=> store.user.userName);

  if(userName === "") return null;
  return (
    <div className='hidden md:block font-semibold'>
     Welcome, {userName}
    </div>
  )
}

export default UserName
