import { useState } from "react";
import { useParams } from "react-router-dom";
import map from "lodash/map";
import { type UserArticle, PopupMode } from "../types/user";
import { useDeleteUserArticleMutation, useGetUserArticle } from "../store/api/userApi";
import TableHeader from "../components/user/TableHeader";
import UserArticlePopup from "../components/user/UserArticlePopup";
import UserArticleForm from "../components/user/UserArticleForm";

const UserDetailsPage = () => {
  const { id } = useParams();
  const { data } = useGetUserArticle(Number(id));
  const [selectedUserArticle, setSelectedUserArticle] = useState<UserArticle|undefined>();
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [showUserPopup, setUserPopup] = useState<boolean>(false);

  const [deleteUserArticle] = useDeleteUserArticleMutation();

  const handleTogglePopupState = (mode: PopupMode) => {
    if (mode === "DELETE") {
      setShowPopup((prev) => {
        if(prev) {
          setSelectedUserArticle(undefined);
          return !prev
        }
        return !prev
      });
    } else if (mode === "UPDATE" || mode === "CREATE") {
      setUserPopup((prev) => {
        if(prev) {
          setSelectedUserArticle(undefined);
          return !prev
        }
        return !prev
      });
    }
  };

  const handleDeleteUserArticle = (user: UserArticle) => {
    setSelectedUserArticle(user);
    handleTogglePopupState("DELETE");
  };

  const confirmDeleteUserArticle = () => {
    selectedUserArticle && deleteUserArticle(selectedUserArticle.id);
    handleTogglePopupState("DELETE");
    setSelectedUserArticle(undefined);
  };

  const handleEditUserArticle = (user: UserArticle) => {
    setSelectedUserArticle(user);
    handleTogglePopupState("UPDATE");
  };

  return (
    <>
      <div className="d-flex justify-content-end mb-3">
        <button
          className="btn btn-primary"
          onClick={() => handleTogglePopupState("CREATE")}
        >
          <i className="fa-calendar fs-24" />
          Add User Article
        </button>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <TableHeader headers={["Title", "Body", "Actions"]} />
          <tbody>
            {map(data, (article: UserArticle, index: number) => (
              <tr key={"article-table-body-tr-" + index}>
                <td
                  className="col-4 flex-columm align-content-center text-truncate"
                  style={{ maxWidth: 100 }}
                >
                  {article.title}
                </td>
                <td
                  className="col-6 flex-columm align-content-center text-truncate"
                  style={{ maxWidth: 100 }}
                >
                  {article.body}
                </td>
                <td className="d-flex justify-content-around align-items-center">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEditUserArticle(article)}
                  >
                    <i className="bi bi-pencil"></i>
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteUserArticle(article)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create or edit User */}
      <UserArticlePopup
        show={showUserPopup}
        onHide={() => {console.log('d1d');
          handleTogglePopupState("UPDATE")}}
        size="md"
        title={selectedUserArticle ? "Edit User Article" : "Add User Article"}
        body={<UserArticleForm initialData={selectedUserArticle} userId={Number(id)} toggleFormPopup={handleTogglePopupState}/>}
        showFooter={false}
      />

      {/* CONFIRMATION POPUP */}
      <UserArticlePopup
        show={showPopup}
        onHide={() => handleTogglePopupState("DELETE")}
        onConfirm={confirmDeleteUserArticle}
        size="sm"
        title="Delete User Article"
        body={
          <p className="d-flex align-items-center my-3">
            Are you sure you want to delete this user article?
          </p>
        }
      />
    </>
  );
};

export default UserDetailsPage;
