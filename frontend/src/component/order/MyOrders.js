import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import LaunchIcon from '@mui/icons-material/Launch';
import { useAlert } from 'react-alert';
import { myOrders, clearErrors } from '../../actions/orderAction';
import MetaData from '../layout/MetaData';
import Loader from '../layout/loader/Loader';

const MyOrders = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, orders } = useSelector((state) => state.myOrders);

  const columns = [
    { field: 'id', headerName: 'Order ID', minWidth: 300, flex: 1 },

    {
      field: 'status',
      headerName: 'Status',
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, 'status') === 'Delivered'
          ? 'text-green-500'
          : params.getValue(params.id, 'status') === 'Dispatched'
          ? 'text-yellow-500'
          : 'text-red-500';
      },
    },
    {
      field: 'itemsQty',
      headerName: 'Items Qty',
      type: 'number',
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: 'amount',
      headerName: 'Amount',
      type: 'number',
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: 'actions',
      flex: 0.3,
      headerName: 'Actions',
      minWidth: 150,
      type: 'number',
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.getValue(params.id, 'id')}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, alert, error]);

  return (
    <>
      <MetaData title="My Orders" />
      {loading ? (
        <Loader />
      ) : (
        <div className="container mx-auto mt-16 text-lg font-Roboto">
          <h1 className="text-3xl font-semibold text-indigo-600 mb-4">
            My Orders
          </h1>
          <DataGrid
            rows={rows}
            columns={columns}
            disableSelectionOnClick
            className="text-lg font-Roboto"
            autoHeight
          />
        </div>
      )}
    </>
  );
};

export default MyOrders;
