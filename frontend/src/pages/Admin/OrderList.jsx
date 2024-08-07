import React from "react";
import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  console.log("OrderList", orders);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div className="container mx-auto p-4">
          <table className="w-full border-collapse bg-white shadow-lg rounded-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="text-left pl-4 py-2">ITEM</th>
                <th className="text-left pl-4 py-2">ID</th>
                <th className="text-left pl-4 py-2">USER</th>
                <th className="text-left pl-4 py-2">CREATED AT</th>
                <th className="text-left pl-4 py-2">TOTAL</th>
                <th className="text-left pl-4 py-2">PAYMENT METHOD</th>
                {/* <th className="text-left pl-4 py-2">PAID</th> */}
                <th className="text-left pl-4 py-2">DELIVERED</th>
                <th className="text-left pl-4 py-2">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b">
                  <td className="py-4 px-2">
                    <img
                      src={`http://localhost:5000/${order.orderItems[0].image}`}
                      alt={order.orderItems[0].name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="py-4 px-2">{order._id}</td>
                  <td className="py-4 px-2">
                    {order.user ? order.user.username : "N/A"}
                  </td>
                  <td className="py-4 px-2">
                    {order.createdAt.substring(0, 10)}
                  </td>
                  <td className="py-4 px-2">
                    RS: {order.totalPrice.toFixed(2)}
                  </td>
                  <td className="py-4 px-2">{order.paymentMethod}</td>
                  <td className="py-4 px-2">
                    {order.isDelivered ? (
                      <span>Completed</span>
                    ) : (
                      <span>Pending</span>
                    )}
                  </td>
                  <td className="py-4 px-2">
                    <Link to={`/order/${order._id}`}>
                      <button>View Details</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default OrderList;
