import { Avatar, AvatarFallback } from "../ui/avatar"

const UserInfo = ({user}) => {
  return (
    <div className="flex flex-row items-center gap-1.5">
      <Avatar className='size-10'>
        <AvatarFallback className="bg-black text-white font-medium">
          {user?.userName[0]?.toUpperCase() || 'U'}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col justify-center">
        <h2 className="text-md font-bold">
          {user?.userName || 'User'}
        </h2>
        <p className="text-muted-foreground text-xs">
          {user?.email || 'Email'}
        </p>
      </div>
    </div>
  )
}
export default UserInfo