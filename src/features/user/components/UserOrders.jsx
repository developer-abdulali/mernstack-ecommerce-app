import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "../../auth/authSlice";
import { fetchLoggedInUserOrders } from "../userAPI";
import { selectUserOrders } from "../userSlice";

const UserOrders = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const orders = useSelector(selectUserOrders);

  useEffect(() => {
    if (user && user.id) {
      dispatch(fetchLoggedInUserOrders(user.id));
    }
  }, [dispatch, user]);

  return (
    <div>
      {orders?.map((order) => (
        <p key={order.id}>{order.id}</p>
      ))}
    </div>
  );
};

export default UserOrders;
