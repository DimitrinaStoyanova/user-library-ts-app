import { useSelector } from "react-redux";
import isEmpty from "lodash/isEmpty";
import { type User } from "../types/user";
import { useGetUsers } from "../store/api/userApi";
import { RootState } from "../store/store";
import UsersListing from "../components/user/UsersListing";

const UsersPage = () => {
  const { data, isLoading } = useGetUsers();
  const filter = useSelector((state: RootState) => state.userSlice.filter);

  const filteredUsers = data?.filter((user: User) =>
    user.name.toLowerCase().includes(filter.toLowerCase())
  ) ?? [];
  
  return (
    <>
     {isEmpty(data) && <div>No users found</div>}
     {!isLoading && !isEmpty(data) && <UsersListing data={filteredUsers}/>}
    </>
  );
};

export default UsersPage;
