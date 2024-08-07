import React from "react";
import Chart from "react-apexcharts";
import { useGetUsersQuery } from "../../redux/api/usersApiSlice";
import {
  useGetTotalOrdersQuery,
  useGetTotalSalesByDateQuery,
  useGetTotalSalesQuery,
} from "../../redux/api/orderApiSlice";
import { useState, useEffect } from "react";
import OrderList from "./OrderList";
import Loader from "../../components/Loader/Loader";

const AdminDashboard = () => {
  const { data: sales, isLoading: loadingSales } = useGetTotalSalesQuery();
  const { data: customers, isLoading: loadingCustomers } = useGetUsersQuery();
  const { data: orders, isLoading: loadingOrders } = useGetTotalOrdersQuery();
  const { data: salesDetail } = useGetTotalSalesByDateQuery();

  const [state, setState] = useState({
    options: {
      chart: {
        type: "line",
      },
      tooltip: {
        theme: "dark",
      },
      colors: ["#00E396"],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Sales Trend",
        align: "left",
      },
      grid: {
        borderColor: "#ccc",
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: [],
        title: {
          text: "Date",
        },
      },
      yaxis: {
        title: {
          text: "Sales",
        },
        min: 0,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    },
    series: [{ name: "Sales", data: [] }],
  });

  useEffect(() => {
    if (salesDetail) {
      const formattedSalesDate = salesDetail.map((item) => ({
        x: item._id,
        y: item.totalSales,
      }));

      setState((prevState) => ({
        ...prevState,
        options: {
          ...prevState.options,
          xaxis: {
            categories: formattedSalesDate.map((item) => item.x),
          },
        },
        series: [
          { name: "Sales", data: formattedSalesDate.map((item) => item.y) },
        ],
      }));
    }
  }, [salesDetail]);

  return (
    <section className="p-4 lg:p-8">
      <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
        <div className="bg-black p-6 rounded-lg w-full sm:w-[20rem] lg:w-[15rem] text-white">
          <div className="bg-pink-500 rounded-full w-12 h-12 flex items-center justify-center text-2xl">
            $
          </div>
          <p className="mt-4 text-sm">Sales</p>
          <h1 className="text-2xl font-bold mt-2">
            RS: {loadingSales ? <Loader /> : sales.totalSales.toFixed(2)}
          </h1>
        </div>
        <div className="bg-black p-6 rounded-lg w-full sm:w-[20rem] lg:w-[15rem] text-white">
          <div className="bg-pink-500 rounded-full w-12 h-12 flex items-center justify-center text-2xl">
            $
          </div>
          <p className="mt-4 text-sm">Customers</p>
          <h1 className="text-2xl font-bold mt-2">
            {loadingCustomers ? <Loader /> : customers?.length}
          </h1>
        </div>
        <div className="bg-black p-6 rounded-lg w-full sm:w-[20rem] lg:w-[15rem] text-white">
          <div className="bg-pink-500 rounded-full w-12 h-12 flex items-center justify-center text-2xl">
            $
          </div>
          <p className="mt-4 text-sm">All Orders</p>
          <h1 className="text-2xl font-bold mt-2">
            {loadingOrders ? <Loader /> : orders?.totalOrders}
          </h1>
        </div>
      </div>

      <div className="mt-8">
        <Chart
          options={state.options}
          series={state.series}
          type="line"
          width="100%"
          height="400"
        />
      </div>

      <div className="mt-8">
        <OrderList />
      </div>
    </section>
  );
};

export default AdminDashboard;
