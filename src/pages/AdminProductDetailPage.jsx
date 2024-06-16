import React from "react";
import Navbar from "../features/navbar/Navbar";
import AdminProductDetail from "../features/admin/components/adminProductDetails";

const AdminProductDetailsPage = () => {
  return (
    <div>
      <Navbar>
        <AdminProductDetail />
      </Navbar>
    </div>
  );
};

export default AdminProductDetailsPage;
