// import React from "react";
// import { Link, useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import Message from "../../components/Message";
// import Loader from "../../components/Loader";
// import {
//   useDeliverOrderMutation,
//   useGetOrderDetailsQuery,
// } from "../../redux/api/orderApiSlice";

// const Order = () => {
//   const { id: orderId } = useParams();

//   const {
//     data: order,
//     refetch,
//     isLoading,
//     error,
//   } = useGetOrderDetailsQuery(orderId);

//   const [deliverOrder, { isLoading: loadingDeliver }] =
//     useDeliverOrderMutation();
//   const { userInfo } = useSelector((state) => state.auth);

//   const deliverHandler = async () => {
//     await deliverOrder(orderId);
//     refetch();
//   };

//   return (
//     <div className="container mx-auto my-8 px-4 lg:px-4 xl:px-0 overflow-hidden">
//       {isLoading ? (
//         <div className="flex justify-center">
//           <Loader />
//         </div>
//       ) : error ? (
//         <Message variant="danger">{error.data.message}</Message>
//       ) : (
//         <div className="flex flex-col md:flex-row gap-8">
//           <div className="md:w-2/3">
//             <div className="border border-gray-300 rounded-md p-4 mb-4 overflow-x-auto">
//               {order.orderItems.length === 0 ? (
//                 <Message>Order is empty</Message>
//               ) : (
//                 <table className="w-full">
//                   <thead className="border-b-2">
//                     <tr>
//                       <th className="p-2 text-left">Image</th>
//                       <th className="p-2 text-left">Product</th>
//                       <th className="p-2 text-center">Quantity</th>
//                       <th className="p-2 text-right">Unit Price</th>
//                       <th className="p-2 text-right">Total</th>
//                     </tr>
//                   </thead>

//                   <tbody>
//                     {order.orderItems.map((item, index) => (
//                       <tr key={index}>
//                         <td className="p-2">
//                           <img
//                             src={new URL(
//                               item.image,
//                               "http://localhost:5000"
//                             ).toString()}
//                             alt={item.name}
//                             className="w-16 h-16 object-cover"
//                           />
//                         </td>

//                         <td className="p-2">
//                           <Link to={`/product/${item.product}`}>
//                             {item.name}
//                           </Link>
//                         </td>

//                         <td className="p-2 text-center">{item.qty}</td>
//                         <td className="p-2 text-right">{item.price}</td>
//                         <td className="p-2 text-right">
//                           RS: {(item.qty * item.price).toFixed(2)}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               )}
//             </div>
//           </div>

//           <div className="md:w-1/3">
//             <div className="border border-gray-300 rounded-md p-4 mb-4">
//               <h2 className="text-xl font-bold mb-4">Shipping</h2>
//               <p className="mb-3">
//                 <strong>Order:</strong> {order._id}
//               </p>

//               <p className="mb-3">
//                 <strong>Name:</strong> {order.user?.username}
//               </p>

//               <p className="mb-3">
//                 <strong>Email:</strong> {order.user?.email}
//               </p>

//               <p className="mb-3">
//                 <strong>Address:</strong> {order.shippingAddress.address},{" "}
//                 {order.shippingAddress.city} {order.shippingAddress.postalCode},{" "}
//                 {order.shippingAddress.country}
//               </p>

//               <p className="mb-3">
//                 <strong>Method:</strong> {order.paymentMethod}
//               </p>

//               {/* {order.isPaid ? ( */}
//               {/* <Message variant="success">Paid on {order.paidAt}</Message> */}
//               {/* // ) : ( */}
//               {/* //   <Message variant="danger">Not paid</Message> */}
//               {/* // )} */}
//             </div>

//             <div className="border border-gray-300 rounded-md p-4">
//               <h2 className="text-xl font-bold mb-4">Order Summary</h2>
//               <div className="flex justify-between mb-2">
//                 <span>Items</span>
//                 <span>RS: {order.itemsPrice}</span>
//               </div>
//               <div className="flex justify-between mb-2">
//                 <span>Shipping</span>
//                 <span>RS: {order.shippingPrice}</span>
//               </div>
//               <div className="flex justify-between mb-2">
//                 <span>Tax</span>
//                 <span>RS: {order.taxPrice}</span>
//               </div>
//               <div className="flex justify-between mb-2">
//                 <span>Total</span>
//                 <span>RS: {order.totalPrice}</span>
//               </div>

//               {loadingDeliver && (
//                 <div className="flex justify-center">
//                   <Loader />
//                 </div>
//               )}
//               {userInfo && userInfo.isAdmin && !order.isDelivered && (
//                 <button
//                   type="button"
//                   disabled={loadingDeliver}
//                   className="bg-pink-500 text-white w-full py-2 rounded-md"
//                   onClick={deliverHandler}
//                 >
//                   Mark As Delivered
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Order;

import React from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
} from "../../redux/api/orderApiSlice";

const Order = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const shop = useSelector((state) => state.shop);
  const { discountedPrice } = shop;

  const deliverHandler = async () => {
    await deliverOrder(orderId);
    refetch();
  };

  return (
    <div className="container mx-auto my-8 px-4 lg:px-4 xl:px-0 overflow-hidden">
      {isLoading ? (
        <div className="flex justify-center">
          <Loader />
        </div>
      ) : error ? (
        <Message variant="danger">{error.data.message}</Message>
      ) : (
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-2/3">
            <div className="border border-gray-300 rounded-md p-4 mb-4 overflow-x-auto">
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <table className="w-full">
                  <thead className="border-b-2">
                    <tr>
                      <th className="p-2 text-left">Image</th>
                      <th className="p-2 text-left">Product</th>
                      <th className="p-2 text-center">Quantity</th>
                      <th className="p-2 text-right">Unit Price</th>
                      <th className="p-2 text-right">Total</th>
                    </tr>
                  </thead>

                  <tbody>
                    {order.orderItems.map((item, index) => (
                      <tr key={index}>
                        <td className="p-2">
                          <img
                            src={new URL(
                              item.image,
                              "http://localhost:5000"
                            ).toString()}
                            alt={item.name}
                            className="w-16 h-16 object-cover"
                          />
                        </td>

                        <td className="p-2">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </td>

                        <td className="p-2 text-center">{item.qty}</td>
                        <td className="p-2 text-right">{item.price}</td>
                        <td className="p-2 text-right">
                          RS: {(item.qty * item.price).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          <div className="md:w-1/3">
            <div className="border border-gray-300 rounded-md p-4 mb-4">
              <h2 className="text-xl font-bold mb-4">Shipping</h2>
              <p className="mb-3">
                <strong>Order:</strong> {order._id}
              </p>

              <p className="mb-3">
                <strong>Name:</strong> {order.user?.username}
              </p>

              <p className="mb-3">
                <strong>Email:</strong> {order.user?.email}
              </p>

              <p className="mb-3">
                <strong>Address:</strong> {order.shippingAddress.address},{" "}
                {order.shippingAddress.city} {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>

              <p className="mb-3">
                <strong>Method:</strong> {order.paymentMethod}
              </p>
            </div>

            <div className="border border-gray-300 rounded-md p-4">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Items</span>
                <span>RS: {order.itemsPrice}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Discounted Price</span>
                <span>RS: {discountedPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>RS: {order.shippingPrice}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Tax</span>
                <span>RS: {order.taxPrice}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Total</span>
                <span>RS: {order.totalPrice}</span>
              </div>

              {loadingDeliver && (
                <div className="flex justify-center">
                  <Loader />
                </div>
              )}
              {userInfo && userInfo.isAdmin && !order.isDelivered && (
                <button
                  type="button"
                  disabled={loadingDeliver}
                  className="bg-pink-500 text-white w-full py-2 rounded-md"
                  onClick={deliverHandler}
                >
                  Mark As Delivered
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
