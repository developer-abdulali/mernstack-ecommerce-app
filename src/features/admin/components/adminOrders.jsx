// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { MdOutlineRemoveRedEye } from "react-icons/md";
// import { CiEdit } from "react-icons/ci";
// import {
//   fetchAllOrdersAsync,
//   selectOrders,
//   selectTotalOrders,
//   updateOrderAsync,
// } from "../../order/orderSlice";

// const AdminOrders = () => {
//   const [editableOrderId, setEditableOrderId] = useState(-1);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [ordersPerPage] = useState(5); // Number of orders per page
//   const dispatch = useDispatch();
//   const orders = useSelector(selectOrders);
//   const totalOrders = useSelector(selectTotalOrders);

//   // Calculate indexes for pagination
//   const indexOfLastOrder = currentPage * ordersPerPage;
//   const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
//   const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

//   const handleShow = () => {
//     alert("handleShow");
//   };

//   const handleEdit = (order) => {
//     setEditableOrderId(order.id);
//   };

//   const handleUpdate = (e, order) => {
//     const updateOrder = { ...order, status: e.target.value };
//     dispatch(updateOrderAsync(updateOrder));
//     setEditableOrderId(-1);
//   };

//   const chooseColor = (status) => {
//     switch (status) {
//       case "pending":
//         return "bg-purple-200 text-purple-600";
//       case "dispatched":
//         return "bg-yellow-200 text-yellow-600";
//       case "delivered":
//         return "bg-green-200 text-green-600";
//       case "cancelled":
//         return "bg-red-200 text-red-600";
//       default:
//         return "bg-purple-200 text-purple-600";
//     }
//   };

//   useEffect(() => {
//     dispatch(fetchAllOrdersAsync());
//   }, [dispatch]);

//   // Handle pagination change
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   // Previous page handler
//   const handlePrevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   // Next page handler
//   const handleNextPage = () => {
//     if (currentPage < Math.ceil(totalOrders.length / ordersPerPage)) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   return (
//     <>
//       <div className="overflow-x-auto">
//         <div className="flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
//           <div className="w-full ">
//             <div className="bg-white shadow-md rounded my-6">
//               <table className="min-w-max w-full table-auto">
//                 <thead>
//                   <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
//                     <th className="py-3 px-6 text-left">Order#</th>
//                     <th className="py-3 px-6 text-left">Items</th>
//                     <th className="py-3 px-6 text-center">Total Amount</th>
//                     <th className="py-3 px-6 text-center">Shipping Address</th>
//                     <th className="py-3 px-6 text-center">Status</th>
//                     <th className="py-3 px-6 text-center">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="text-gray-600 text-sm font-light">
//                   {currentOrders.map((order) => (
//                     <tr
//                       key={order.id}
//                       className="border-b border-gray-200 hover:bg-gray-100"
//                     >
//                       <td className="py-3 px-6 text-left whitespace-nowrap">
//                         <div className="flex items-center">
//                           <span className="font-medium">{order.id}</span>
//                         </div>
//                       </td>
//                       <td className="py-3 px-6 text-left">
//                         {order.items.map((item) => (
//                           <div key={item.id} className="flex items-center">
//                             <div className="mr-2">
//                               <img
//                                 className="w-6 h-6 rounded-full"
//                                 src={item.thumbnail}
//                                 alt={item.title}
//                               />
//                             </div>
//                             <span>
//                               {item.title} - #{item.quantity} - ${item.price}
//                             </span>
//                           </div>
//                         ))}
//                       </td>

//                       <td className="py-3 px-6 text-center">
//                         <div className="flex items-center justify-center">
//                           ${order.totalAmount}
//                         </div>
//                       </td>
//                       <td className="py-3 px-6 text-center">
//                         <div>
//                           <strong>{order.selectedAddress.name}</strong>,
//                           <br />
//                           {order.selectedAddress.street}
//                           <br />
//                           {order.selectedAddress.city}
//                           <br />
//                           {order.selectedAddress.state}
//                           <br />
//                           {order.selectedAddress.pinCode}
//                           <br />
//                           {order.selectedAddress.phone}
//                         </div>
//                       </td>
//                       <td className="py-3 px-6 text-center">
//                         {order.id === editableOrderId ? (
//                           <select
//                             value={order.status}
//                             onChange={(e) => handleUpdate(e, order)}
//                           >
//                             <option value="pending">Pending</option>
//                             <option value="dispatched">Dispatched</option>
//                             <option value="delivered">Delivered</option>
//                             <option value="cancelled">Cancelled</option>
//                           </select>
//                         ) : (
//                           <span
//                             className={`${chooseColor(
//                               order.status
//                             )} py-1 px-3 rounded-full text-xs`}
//                           >
//                             {order.status}
//                           </span>
//                         )}
//                       </td>
//                       <td className="py-3 px-6 text-center">
//                         <div className="flex item-center justify-center">
//                           <div
//                             onClick={(e) => handleShow(order)}
//                             className="cursor-pointer mr-2 transform hover:text-purple-500 hover:scale-110"
//                           >
//                             <MdOutlineRemoveRedEye className="w-6 h-6" />
//                           </div>
//                           <div
//                             onClick={(e) => handleEdit(order)}
//                             className="cursor-pointer mr-2 transform hover:text-purple-500 hover:scale-110"
//                           >
//                             <CiEdit className="w-6 h-6" />
//                           </div>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//             {/* Pagination */}
//             <div className="mt-4 flex justify-center">
//               <button
//                 onClick={handlePrevPage}
//                 disabled={currentPage === 1}
//                 className={`mx-1 px-3 py-1 rounded ${
//                   currentPage === 1
//                     ? "bg-gray-300 text-gray-700 cursor-not-allowed"
//                     : "bg-gray-300 text-gray-700 hover:bg-gray-400"
//                 }`}
//               >
//                 Prev
//               </button>
//               {Array.from({
//                 length: Math.ceil(totalOrders / ordersPerPage),
//               }).map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => paginate(index + 1)}
//                   className={`mx-1 px-3 py-1 rounded ${
//                     currentPage === index + 1
//                       ? "bg-blue-500 text-white"
//                       : "bg-gray-300 text-gray-700 hover:bg-gray-400"
//                   }`}
//                 >
//                   {index + 1}
//                 </button>
//               ))}
//               <button
//                 onClick={handleNextPage}
//                 disabled={
//                   currentPage === Math.ceil(totalOrders / ordersPerPage)
//                 }
//                 className={`mx-1 px-3 py-1 rounded ${
//                   currentPage === Math.ceil(totalOrders / ordersPerPage)
//                     ? "bg-gray-300 text-gray-700 cursor-not-allowed"
//                     : "bg-gray-300 text-gray-700 hover:bg-gray-400"
//                 }`}
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AdminOrders;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import {
  fetchAllOrdersAsync,
  selectOrders,
  selectTotalOrders,
  updateOrderAsync,
} from "../../order/orderSlice";
import Pagination from "../../common/Pagination";
import { FaChevronUp, FaChevronDown } from "react-icons/fa6";

const AdminOrders = () => {
  const [editableOrderId, setEditableOrderId] = useState(-1);
  const [sort, setSort] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10);
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const totalOrders = useSelector(selectTotalOrders);

  // Calculate indexes for pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const handleShow = () => {
    alert("handleShow");
  };

  const handleEdit = (order) => {
    setEditableOrderId(order.id);
  };

  const handleUpdate = (e, order) => {
    const updateOrder = { ...order, status: e.target.value };
    dispatch(updateOrderAsync(updateOrder));
    setEditableOrderId(-1);
  };

  const chooseColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-purple-200 text-purple-600";
      case "dispatched":
        return "bg-yellow-200 text-yellow-600";
      case "delivered":
        return "bg-green-200 text-green-600";
      case "cancelled":
        return "bg-red-200 text-red-600";
      default:
        return "bg-purple-200 text-purple-600";
    }
  };

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  // const handleSort = (option) => {
  const handleSort = (sortOption) => {
    const sort = { _sort: sortOption.sort, _order: sortOption.order };
    setSort(sort);
  };
  useEffect(() => {
    dispatch(fetchAllOrdersAsync({ sort }));
  }, [dispatch, sort]);

  return (
    <>
      <div className="overflow-x-auto">
        <div className="flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
          <div className="w-full ">
            <div className="bg-white shadow-md rounded my-6">
              <table className="min-w-max w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th
                      className="py-3 px-6 text-left cursor-pointer"
                      onClick={(e) =>
                        handleSort({
                          sort: "id",
                          order: sort?._order === "asc" ? "desc" : "asc",
                        })
                      }
                    >
                      Order#{" "}
                      {sort._sort === "id" &&
                        (sort._order === "asc" ? (
                          <FaChevronUp className="w-4 h-4 inline" />
                        ) : (
                          <FaChevronDown className="w-4 h-4 inline" />
                        ))}
                    </th>
                    <th className="py-3 px-6 text-left">Items</th>
                    <th className="py-3 px-6 text-center">Total Amount</th>
                    <th className="py-3 px-6 text-center">Shipping Address</th>
                    <th className="py-3 px-6 text-center">Status</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {currentOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="font-medium">{order.id}</span>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-left">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex items-center">
                            <div className="mr-2">
                              <img
                                className="w-6 h-6 rounded-full"
                                src={item.thumbnail}
                                alt={item.title}
                              />
                            </div>
                            <span>
                              {item.title} - #{item.quantity} - ${item.price}
                            </span>
                          </div>
                        ))}
                      </td>

                      <td className="py-3 px-6 text-center">
                        <div className="flex items-center justify-center">
                          ${order.totalAmount}
                        </div>
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div>
                          <strong>{order.selectedAddress.name}</strong>,
                          <br />
                          {order.selectedAddress.street}
                          <br />
                          {order.selectedAddress.city}
                          <br />
                          {order.selectedAddress.state}
                          <br />
                          {order.selectedAddress.pinCode}
                          <br />
                          {order.selectedAddress.phone}
                        </div>
                      </td>
                      <td className="py-3 px-6 text-center">
                        {order.id === editableOrderId ? (
                          <select
                            value={order.status}
                            onChange={(e) => handleUpdate(e, order)}
                          >
                            <option value="pending">Pending</option>
                            <option value="dispatched">Dispatched</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        ) : (
                          <span
                            className={`${chooseColor(
                              order.status
                            )} py-1 px-3 rounded-full text-xs`}
                          >
                            {order.status}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex item-center justify-center">
                          <div
                            onClick={(e) => handleShow(order)}
                            className="cursor-pointer mr-2 transform hover:text-purple-500 hover:scale-110"
                          >
                            <MdOutlineRemoveRedEye className="w-6 h-6" />
                          </div>
                          <div
                            onClick={(e) => handleEdit(order)}
                            className="cursor-pointer mr-2 transform hover:text-purple-500 hover:scale-110"
                          >
                            <CiEdit className="w-6 h-6" />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <Pagination
              page={currentPage}
              setPage={setCurrentPage}
              handlePage={handlePageChange}
              totalItems={totalOrders.length}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminOrders;
