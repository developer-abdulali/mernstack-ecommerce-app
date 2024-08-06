// import React from "react";
// import Message from "../../components/Message/Message";
// import Loader from "../../components/Loader/Loader";
// import { Link } from "react-router-dom";
// import { useGetMyOrdersQuery } from "../../redux/api/orderApiSlice";

// const UserOrders = () => {
//   const { data: orders, isLoading, error } = useGetMyOrdersQuery();

//   console.log("UserOrders: ", orders);

//   return (
//     <div className="container mx-auto p-4 md:p-6 lg:p-8">
//       <h2 className="text-3xl font-bold mb-4">My Orders</h2>
//       {isLoading ? (
//         <Loader />
//       ) : error ? (
//         <Message variant="danger">{error?.data?.error || error.error}</Message>
//       ) : orders.length === 0 ? (
//         <Message variant="info">No orders created yet!</Message>
//       ) : (
//         <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
//           <table className="w-full table-auto">
//             <thead className="bg-gray-200">
//               <tr>
//                 <th className="py-2">IMAGE</th>
//                 <th className="py-2">ID</th>
//                 <th className="py-2">DATE</th>
//                 <th className="py-2">TOTAL</th>
//                 <th className="py-2">PAID</th>
//                 <th className="py-2">DELIVERED</th>
//                 <th className="py-2"></th>
//               </tr>
//             </thead>
//             <tbody>
//               {orders.map((order) => (
//                 <tr key={order._id} className="border-b">
//                   <td className="py-2">
//                     <img
//                       src={`http://localhost:5000${order.orderItems[0].image}`}
//                       alt={order.user}
//                       className="w-[6rem] mb-5 rounded-lg object-cover"
//                     />
//                   </td>
//                   <td className="py-2">{order._id}</td>
//                   <td className="py-2">{order.createdAt.substring(0, 10)}</td>
//                   <td className="py-2">RS: {order.totalPrice}</td>
//                   <td className="py-2">
//                     {order.isPaid ? (
//                       <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full">
//                         Completed
//                       </p>
//                     ) : (
//                       <p className="p-1 text-center bg-red-400 w-[6rem] rounded-full">
//                         Pending
//                       </p>
//                     )}
//                   </td>
//                   <td className="px-2 py-2">
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
//                   <td className="px-2 py-2">
//                     <Link to={`/order/${order._id}`}>
//                       <button className="bg-pink-400 text-black py-2 px-3 rounded-lg hover:bg-pink-500 transition duration-300">
//                         View Details
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

// export default UserOrders;

import React from "react";
import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";
import { Link } from "react-router-dom";
import { useGetMyOrdersQuery } from "../../redux/api/orderApiSlice";

const UserOrders = () => {
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  console.log("UserOrders: ", orders);

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <h2 className="text-3xl font-bold mb-4">My Orders</h2>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.error || error.error}</Message>
      ) : orders.length === 0 ? (
        <Message variant="info">No orders created yet!</Message>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
          <table className="w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2">IMAGE</th>
                <th className="py-2">ID</th>
                <th className="py-2">DATE</th>
                <th className="py-2">TOTAL</th>
                <th className="py-2">PAID</th>
                <th className="py-2">DELIVERED</th>
                <th className="py-2"></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b">
                  <td className="py-2">
                    <img
                      src={`http://localhost:5000/${order.orderItems[0].image}`}
                      alt={order.orderItems[0].name} // Updated alt text to use item name
                      className="w-[6rem] mb-5 rounded-lg object-cover"
                    />
                  </td>
                  <td className="py-2">{order._id}</td>
                  <td className="py-2">{order.createdAt.substring(0, 10)}</td>
                  <td className="py-2">RS: {order.totalPrice.toFixed(2)}</td>
                  <td className="py-2">
                    {order.isPaid ? (
                      <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full">
                        Completed
                      </p>
                    ) : (
                      <p className="p-1 text-center bg-red-400 w-[6rem] rounded-full">
                        Pending
                      </p>
                    )}
                  </td>
                  <td className="px-2 py-2">
                    {order.isDelivered ? (
                      <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full">
                        Completed
                      </p>
                    ) : (
                      <p className="p-1 text-center bg-red-400 w-[6rem] rounded-full">
                        Pending
                      </p>
                    )}
                  </td>
                  <td className="px-2 py-2">
                    <Link to={`/order/${order._id}`}>
                      <button className="bg-pink-400 text-black py-2 px-3 rounded-lg hover:bg-pink-500 transition duration-300">
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
    </div>
  );
};

export default UserOrders;
