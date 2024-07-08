import { useNavigate } from "react-router-dom";
import map from "lodash/map";
import { type User, Address } from "../../types/user";
import TableHeader from "./TableHeader";

interface UserListingProps {
  data: User[];
}

const UsersListing = (props: UserListingProps) => {
  const { data } = props;
  const navigate = useNavigate();

  const formatAddress = (address: Address) => {
    const { street, suite, city, zipcode } = address;
    return `${street}, ${suite}, ${city} ${zipcode}`;
  };

  return (
    <>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <TableHeader headers={["Name", "Username", "Email", "Address"]} />
          <tbody>
            {map(data, (user: User, index: number) => (
              <tr
                key={"user-table-body-tr-" + index}
                onClick={() => navigate(`/user/${user.id}`)}
              >
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{formatAddress(user.address)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UsersListing;
