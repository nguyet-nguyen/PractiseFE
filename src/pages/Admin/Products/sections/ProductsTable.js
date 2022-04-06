import $ from 'jquery'
import dt from 'datatables.net'

$.DataTable = dt
import React, {useEffect, useState} from "react";
import {DeleteProduct, getAllProductsAdmin} from "../../../../features/Api";
import {numberFormat} from "../../../LandingPages/Home/function/FormatMoney";
import Loading from "../../../../Loading";
import {Link} from "react-router-dom";
import ProductDetailPopup from "./ProductDetailPopup";

const ProductsTable = () => {
    const [productList, setProductList] = useState();
    const [searchData, setSearchList] = useState();
    const [idDelete, setIdDelete] = useState();
    useEffect(() => {
        getAllProductsAdmin()
            .then((response) => {
                setProductList(response.data);
                setSearchList(response.data);
            })
            .catch((err) => {
                console.warn(err);
            });
    }, [])
    const onHandDel = async (idDelete) => {
        DeleteProduct(idDelete);
        location.reload(false);
        getAllProductsAdmin()
            .then((response) => {
                setProductList(response.data);
            })
            .catch((err) => {
                console.warn(err);
            });
    };
    const getIdDelete = (id) => {
        setIdDelete(id)
    }
    const searchProduct = (e) => {
        let searchList = [];
      let searchKey = e.target.value;
        productList.forEach(product => {
            if ((product.name.toLowerCase().indexOf(searchKey) > -1)
                || (product.category.toLowerCase().indexOf(searchKey) > -1)
                || (product.color.toLowerCase().indexOf(searchKey) > -1)
                || (product.price.toString().toLowerCase().indexOf(searchKey) > -1)
            ) {
                searchList.push(product);
            }
        })
        setProductList(searchList);
        if(searchKey == null || searchKey == "" || searchKey.isEmpty()){
            setProductList(searchData);
        }
    }
    console.log("------------------------")
    console.log(productList);
    console.log("------------------------")

    return (
        <>
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                <div className="flex space-x-2 justify-between">
                    <Link to="/admin/products/add-product"
                          type="button"
                          data-mdb-ripple="true"
                          data-mdb-ripple-color="light"
                          className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs
                                leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700
                                focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition
                                duration-150 ease-in-out">Add Product
                    </Link>
                    <div className="xl:w-96">
                        <div className="input-group relative flex flex-wrap items-stretch w-full">
                            <input
                                onChange={searchProduct}
                                type="search"
                                className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                placeholder="Search"
                                aria-label="Search"
                                aria-describedby="button-addon2"
                            />
                            <button
                                className="btn inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center"
                                type="button"
                                id="button-addon2"
                            >
                                <svg
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fas"
                                    data-icon="search"
                                    className="w-4"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                {productList ?
                    <div className="flex flex-col">
                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="py-4 inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="overflow-hidden">
                                    <table className="min-w-full text-center">
                                        <thead className="border-b bg-gray-800">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="text-sm font-medium text-white px-6 py-4 uppercase">
                                                No
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-sm font-medium text-white px-6 py-4 uppercase">
                                                Name
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-sm font-medium text-white px-6 py-4 uppercase">
                                                price
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-sm font-medium text-white px-6 py-4 uppercase">
                                                Color
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-sm font-medium text-white px-6 py-4 uppercase">
                                                Category
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-sm font-medium text-white px-6 py-4 uppercase">
                                                Actions
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {productList && productList.map((product, index) => (
                                            <tr className="bg-white border-b">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {index + 1}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {product.name}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {numberFormat(product.price)}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {product.color}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {product.category}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    <button type="button"
                                                            className="inline-block px-6 py-2 border-2 border-green-800
                                                    text-green-800 font-medium text-xs leading-tight uppercase
                                                    rounded hover:bg-green-800 hover:text-white focus:outline-none
                                                    focus:ring-0 transition duration-150 ease-in-out"
                                                            data-bs-toggle="modal" data-bs-target="#exampleModalLg">
                                                        <i className="fa fa-eye" aria-hidden="true"></i>
                                                    </button>
                                                    <ProductDetailPopup products={product}/>
                                                    <Link to={`/admin/products/update-product/${product.id}`}
                                                          className="mx-4 inline-block px-6 py-2 border-2 border-yellow-600
                                                    text-yellow-600 font-medium text-xs leading-tight uppercase
                                                    rounded hover:bg-yellow-600 hover:text-white focus:outline-none
                                                    focus:ring-0 transition duration-150 ease-in-out">
                                                        <i className="fa fa-pencil" aria-hidden="true"></i>
                                                    </Link>
                                                    <button type="button" className="px-6 py-2.5 bg-white text-red-700 font-medium text-xs
                                            leading-tight uppercase border-2 border-red-700 rounded shadow-md hover:bg-red-700 hover:text-white
                                            hover:shadow-lg  focus:shadow-lg focus:outline-none
                                            focus:ring-0 transition duration-150
                                            ease-in-out"
                                                            type="button" typebutton="edit" size="small"
                                                            data-bs-toggle="modal" data-bs-target="#modalDeleteUser"
                                                            onClick={() => getIdDelete(product.id)}
                                                    >
                                                        <i className="fa fa-trash" aria-hidden="true"></i>
                                                    </button>


                                                </td>
                                            </tr>
                                        ))}

                                        </tbody>
                                        <tfoot className="border-b bg-gray-800">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="text-sm font-medium text-white px-6 py-4 uppercase">
                                                no
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-sm font-medium text-white px-6 py-4 uppercase">
                                                Name
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-sm font-medium text-white px-6 py-4 uppercase">
                                                price
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-sm font-medium text-white px-6 py-4 uppercase">
                                                color
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-sm font-medium text-white px-6 py-4 uppercase">
                                                category
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-sm font-medium text-white px-6 py-4 uppercase">
                                                Actions
                                            </th>
                                        </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    : <Loading/>}

                <div
                    className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
                    id="modalDeleteUser" tabIndex={-1} aria-labelledby="exampleModalCenterTitle" aria-modal="true"
                    role="dialog">
                    <div className="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
                        <div
                            className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                            <div
                                className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                                <h5 className="text-xl font-medium leading-normal text-gray-800"
                                    id="exampleModalScrollableLabel">
                                    DELETE
                                </h5>
                                <button type="button"
                                        className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                                        data-bs-dismiss="modal" aria-label="Close"/>
                            </div>
                            <div className="modal-body relative p-4">
                                <p>Are you sure you want to delete this item ?</p>
                            </div>
                            <div
                                className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                                <button type="button" className="inline-block px-6 py-2 border-2 border-neutral-800 text-neutral-800 font-medium text-xs
  leading-tight uppercase rounded hover:bg-neutral-800 hover:text-white focus:outline-none focus:ring-0 transition
  duration-150 ease-in-out mr-4" data-bs-dismiss="modal">
                                    Cancel
                                </button>
                                <button type="button" className="inline-block px-6 py-2 border-2 border-red-600 text-red-600 font-medium text-xs
  leading-tight uppercase rounded hover:bg-red-700 hover:text-white focus:outline-none focus:ring-0 transition
  duration-150 ease-in-out" data-bs-dismiss="modal" onClick={() => onHandDel(idDelete)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </>


    )
}

export default ProductsTable;