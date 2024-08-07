import React, { useEffect, useState } from "react";
import { FaTrash, FaCheck, FaTimes, FaUserEdit } from "react-icons/fa";
import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
  useRegisterMutation,
} from "../../redux/api/usersApiSlice";
import { toast } from "react-toastify";
import EditUserPopup from "./EditUserPopup";
import AddUserPopup from "./AddUserPopup";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { useDispatch } from "react-redux";

const UserList = () => {
  const dispatch = useDispatch();
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [register] = useRegisterMutation();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    refetch();
  }, [refetch]);

  // delete user functionality
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

  const updateHandler = async (id, username, email) => {
    try {
      await updateUser({
        userId: id,
        username: username,
        email: email,
      });
      setSelectedUser(null);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const toggleEditPopup = (user) => {
    setSelectedUser(user);
    setIsEditOpen(!isEditOpen);
  };

  const toggleAddPopup = () => {
    setIsAddOpen(!isAddOpen);
  };

  const submitHandler = async (
    e,
    username,
    email,
    password,
    confirmPassword
  ) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({ username, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        setIsAddOpen(false);
        refetch();
        toast.success("User successfully registered");
      } catch (err) {
        console.log(err);
        toast.error(err.data.message);
      }
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold my-4">Users</h1>
        {/* <button
          onClick={toggleAddPopup}
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Add User
        </button> */}
      </div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full shadow-md border">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">NAME</th>
                <th className="px-4 py-2 text-left">EMAIL</th>
                <th className="px-4 py-2 text-left">ADMIN</th>
                <th className="px-4 py-2 text-left">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b hover:bg-orange-100 hover:text-black"
                >
                  <td className="px-4 py-2">{user._id}</td>
                  <td className="px-4 py-2">{user.username}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">
                    {user.isAdmin ? (
                      <FaCheck style={{ color: "green" }} />
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleEditPopup(user)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        <FaUserEdit />
                      </button>
                      <button
                        onClick={() => deleteHandler(user._id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isEditOpen && (
        <EditUserPopup
          user={selectedUser}
          togglePopup={toggleEditPopup}
          updateHandler={updateHandler}
        />
      )}

      {isAddOpen && (
        <AddUserPopup
          togglePopup={toggleAddPopup}
          submitHandler={submitHandler}
        />
      )}
    </div>
  );
};

export default UserList;
