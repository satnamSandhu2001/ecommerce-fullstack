import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData';
import Loader from '../layout/loader/Loader';
import Sidebar from './Sidebar';
import { Link, useNavigate } from 'react-router-dom';

import { clearErrors, getAdminProducts } from '../../actions/productAction';
import { Button } from '@mui/material';

const ProductsList = () => {
  const dispatch = useDispatch();

  const alert = useAlert();
  const navigate = useNavigate();
  const { error, loading, products } = useSelector((state) => state.products);

  //   const { error: deleteError, isDeleted } = useSelector(
  //     (state) => state.product
  //   );

  /* 
        const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id));
      };
    */

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    // if (deleteError) {
    //   alert.error(deleteError);
    //   dispatch(clearErrors());
    // }

    //   if (isDeleted) {
    //     alert.success("Product Deleted Successfully");
    //     navigate("/admin/dashboard");
    //     dispatch({ type: DELETE_PRODUCT_RESET });
    //   }

    dispatch(getAdminProducts());
  }, [dispatch, alert, error, navigate]);

  const columns = [
    { field: 'id', headerName: 'Product ID', minWidth: 200, flex: 0.5 },

    {
      field: 'name',
      headerName: 'Name',
      minWidth: 350,
      flex: 1,
    },
    {
      field: 'stock',
      headerName: 'Stock',
      type: 'number',
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: 'price',
      headerName: 'Price',
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
          <>
            <Link to={`/admin/product/${params.getValue(params.id, 'id')}`}>
              <EditIcon />
            </Link>

            <Button
            // onClick={() =>
            //   deleteProductHandler(params.getValue(params.id, "id"))
            // }
            >
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.Stock,
        price: item.price,
        name: item.name,
      });
    });

  return (
    <>
      <MetaData title="All Products - Admin" />
      {loading && <Loader />}
      <div className="flex">
        <Sidebar activeTab={'productsList'} />
        <div className="w-full bg-gradient-to-tl from-indigo-100 to-blue-100">
          <div className="bg-white w-full py-6 shadow-sm sticky top-0">
            <h1 className="z-10 w-full text-center text-3xl text-indigo-600 tracking-wide">
              All Products
            </h1>
          </div>
          {/* body content */}
          {products && (
            <div className="p-6 rounded-md">
              <DataGrid
                rows={rows}
                columns={columns}
                disableSelectionOnClick
                className="text-lg font-Roboto"
                autoHeight
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductsList;
