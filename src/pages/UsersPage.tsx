import isEmpty from "lodash/isEmpty";
import UsersListing from "../components/user/UsersListing";
import { useGetUsers } from "../store/api/userApi";

const UsersPage = () => {
  const { data, isLoading } = useGetUsers();

  return (
    <>
     {isEmpty(data) && <div>No users found</div>}
     {!isLoading && !isEmpty(data) && <UsersListing data={data ?? []}/>}
    </>
  );
};

export default UsersPage;
