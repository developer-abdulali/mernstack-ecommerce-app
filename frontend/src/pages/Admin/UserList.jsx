import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../../redux/api/usersApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

const UserList = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [editableUserId, setEditableUserId] = useState(null);
  const [editableUserName, setEditableUserName] = useState("");
  const [editableUserEmail, setEditableUserEmail] = useState("");

  useEffect(() => {
    refetch();
  }, [refetch]);

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure")) {
      try {
        await deleteUser(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const toggleEdit = (id, username, email) => {
    setEditableUserId(id);
    setEditableUserName(username);
    setEditableUserEmail(email);
  };
  const updateHandler = async (id) => {
    try {
      const response = await updateUser({
        userId: id,
        username: editableUserName,
        email: editableUserEmail,
      });

      if (response.error) {
        const errorMessage = response.error.data || response.error.message;
        toast.error(errorMessage);
      } else {
        setEditableUserId(null);
        s;
        refetch();
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  // const updateHandler = async (id) => {
  //   try {
  //     await updateUser({
  //       userId: id,
  //       username: editableUserName,
  //       email: editableUserEmail,
  //     });
  //     setEditableUserId(null);
  //     refetch();
  //   } catch (err) {
  //     toast.error(err?.data?.message || err.error);
  //   }
  // };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4 !text-white">Users</h1>
      {isLoading ? (
        <div className="flex items-center justify-center h-[100ch]">
          <Loader />
        </div>
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div className="flex flex-col md:flex-row">
          <AdminMenu />
          <table className="w-full md:w-4/5 mx-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-white">ID</th>
                <th className="px-4 py-2 text-left text-white">NAME</th>
                <th className="px-4 py-2 text-left text-white">EMAIL</th>
                <th className="px-4 py-2 text-left text-white">ADMIN</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(users.users) &&
                users.users.map((user) => (
                  <tr key={user._id}>
                    <td className="px-4 py-2 text-white">{user._id}</td>
                    <td className="px-4 py-2 text-white">
                      {editableUserId === user._id ? (
                        <div className="flex items-center">
                          <input
                            type="text"
                            className="p-[5px] text-white border rounded-lg bg-transparent"
                            value={editableUserName}
                            onChange={(e) =>
                              setEditableUserName(e.target.value)
                            }
                          />
                          <button
                            onClick={() => updateHandler(user._id)}
                            className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
                          >
                            <FaCheck />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          {user.username}{" "}
                          <button
                            onClick={() =>
                              toggleEdit(user._id, user.username, user.email)
                            }
                          >
                            <FaEdit className="ml-[1rem]" />
                          </button>
                        </div>
                      )}
                    </td>

                    {/* email td */}
                    <td className="px-4 py-2 text-white">
                      {editableUserId === user._id ? (
                        <div className="flex items-center">
                          <input
                            type="text"
                            className="p-[5px] text-white border rounded-lg bg-transparent"
                            value={editableUserEmail}
                            onChange={(e) =>
                              setEditableUserEmail(e.target.value)
                            }
                          />
                          <button
                            onClick={() => updateHandler(user._id)}
                            className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
                          >
                            <FaCheck />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <p>{user.email}</p>
                          <button
                            onClick={() =>
                              toggleEdit(user._id, user.username, user.email)
                            }
                          >
                            <FaEdit className="ml-[1rem]" />
                          </button>
                        </div>
                      )}
                    </td>

                    <td className="px-4 py-2">
                      {user.isAdmin ? (
                        <FaCheck style={{ color: "green" }} />
                      ) : (
                        <FaTimes style={{ color: "red" }} />
                      )}
                    </td>
                    <td title="Delete User" className="px-4 py-2 text-white">
                      {!user.isAdmin && (
                        <button
                          onClick={() => deleteHandler(user._id)}
                          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                          <FaTrash />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserList;
