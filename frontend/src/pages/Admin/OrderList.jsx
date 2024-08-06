// import React from "react";
// import Message from "../../components/Message/Message";
// import Loader from "../../components/Loader/Loader";
// import { Link } from "react-router-dom";
// import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";
// import AdminMenu from "./AdminMenu"; // Ensure AdminMenu is imported if used

// const OrderList = () => {
//   const { data: orders, isLoading, error } = useGetOrdersQuery();

//   console.log("OrderList", orders);

//   return (
//     <div className="container mx-auto p-4 md:p-6 lg:p-8">
//       <h2 className="text-3xl font-bold mb-4">Order List</h2>
//       {isLoading ? (
//         <Loader />
//       ) : error ? (
//         <Message variant="danger">
//           {error?.data?.message || error.error}
//         </Message>
//       ) : orders.length === 0 ? (
//         <Message variant="info">No orders found!</Message>
//       ) : (
//         <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
//           <table className="w-full table-auto border-collapse">
//             <thead className="bg-gray-200">
//               <tr>
//                 <th className="py-2 px-4 text-left">ITEMS</th>
//                 <th className="py-2 px-4 text-left">ID</th>
//                 <th className="py-2 px-4 text-left">USER</th>
//                 <th className="py-2 px-4 text-left">CREATED AT</th>
//                 <th className="py-2 px-4 text-left">TOTAL</th>
//                 <th className="py-2 px-4 text-left">PAID</th>
//                 <th className="py-2 px-4 text-left">DELIVERED</th>
//                 <th className="py-2 px-4"></th>
//               </tr>
//             </thead>
//             <tbody>
//               {orders.map((order) => (
//                 <tr key={order._id} className="border-b">
//                   <td className="py-2 px-4">
//                     <img
//                       src={`http://localhost:5000/${order.orderItems[0]?.image}`}
//                       alt={order.orderItems[0]?.name || "Order Item"}
//                       className="w-[5rem] rounded-lg object-cover"
//                     />
//                   </td>
//                   <td className="py-2 px-4">{order._id}</td>
//                   <td className="py-2 px-4">
//                     {order.user ? order.user.username : "N/A"}
//                   </td>
//                   <td className="py-2 px-4">
//                     {order.createdAt ? order.createdAt.substring(0, 10) : "N/A"}
//                   </td>
//                   <td className="py-2 px-4">
//                     RS: {order.totalPrice.toFixed(2)}
//                   </td>
//                   {/* <td className="py-2 px-4"> */}
//                   {/* {order.isPaid ? ( */}
//                   {/* <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full"> */}
//                   {/* Completed */}
//                   {/* </p> */}
//                   {/* ) : ( */}
//                   {/* <p> */}
//                   {/* <p className="p-1 text-center bg-red-400 w-[6rem] rounded-full"> */}
//                   {/* Pending */}
//                   {/* </p> */}
//                   {/* )} */}
//                   {/* </td> */}
//                   <td className="py-2 px-4">
//                     {order.isDelivered ? (
//                       <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full">
//                         Completed
//                       </p>
//                     ) : (
//                       <p className="p-1 text-center bg-red-400 w-[6rem] rounded-full">
//                         Pending
//                       </p>
//                     )}
//                   </td>
//                   <td className="py-2 px-4">
//                     <Link to={`/order/${order._id}`}>
//                       <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
//                         More
//                       </button>
//                     </Link>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrderList;

import React from "react";
import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";
import AdminMenu from "./AdminMenu";

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  console.log("OrderList", orders);

  const getPaymentStatus = (order) => {
    if (order.paymentMethod === "CashOnDelivery") {
      return "Pending";
    }
    // For other payment methods, check if payment is complete or not
    return order.isPaid ? "Paid" : "Pending";
  };

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
                <th className="text-left pl-4 py-2">PAID</th>
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
                  <td className="py-4 px-2">
                    {getPaymentStatus(order) === "Paid" ? (
                      <span className="bg-green-500 text-white py-1 px-3 rounded-full">
                        Paid
                      </span>
                    ) : (
                      <span className="bg-red-500 text-white py-1 px-3 rounded-full">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-2">
                    {order.isDelivered ? (
                      <span className="bg-green-500 text-white py-1 px-3 rounded-full">
                        Completed
                      </span>
                    ) : (
                      <span className="bg-red-500 text-white py-1 px-3 rounded-full">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-2">
                    <Link to={`/order/${order._id}`}>
                      <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                        View Details
                      </button>
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
