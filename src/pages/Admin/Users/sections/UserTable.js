import React, {useEffect, useState} from "react";
import {getAllProductsAdmin, getAllUsers} from "../../../../features/Api";
import {Link} from "react-router-dom";
import Loading from "../../../../Loading";
import {numberFormat} from "../../../LandingPages/Home/function/FormatMoney";
import DataTable from "react-data-table-component";

const UsersTable = () => {
    const [users, setUsers] = useState([]);
    const [searchData, setSearchList] = useState();
    const [pending, setPending] = useState(true);

    useEffect(() => {
        getAllUsers()
            .then((res) => {
                setUsers(res.data.data);
                setSearchList(res.data.data);
                setPending(false);
            })
            .catch(err => {
                console.log(err);
                setPending(false);
            })
    }, [getAllUsers]);

    const searchProduct = (e) => {
        let searchList = [];
        let searchKey = e.target.value;
        users.forEach(user => {
            if ((user.name.toString().toLowerCase().indexOf(searchKey) > -1)
                || (user.email.toString().toLowerCase().indexOf(searchKey) > -1)
                || (user.phone.toString().toLowerCase().indexOf(searchKey) > -1)
                || (user.roles.toString().toLowerCase().indexOf(searchKey) > -1)
                || ((user.address).toString().toLowerCase().indexOf(searchKey) > -1)
            ) {
                searchList.push(user);
            }
        })
        setUsers(searchList);
        if (searchKey == null || searchKey == "") {
            setUsers(searchData);
        }
    }
    const columns = [
        {
            name: 'No',
            sortable: true,
            grow: 0.5,
            width: "100px",
            selector: row => row.no,
        },
        {
            name: 'Avatar',
            selector: row => <div><img src={row.avatar}/></div>,
            disableFilters: true,
        },
        {
            name: 'Name',
            sortable: true,
            selector: row => row.name,

        },
        {
            name: 'Email',
            sortable: true,
            grow: 2,
            selector: row => row.email,

        },
        {
            name: 'Phone',
            sortable: true,
            selector: row => row.phone,
        },
        {
            name: 'Address',
            sortable: true,
            grow: 4,
            wrap: true,
            selector: row => row.address,

        },
    ];
    const customStyles = {
        headCells: {
            style: {
                color: "#B45309",
                background: "#E2E8F0",
                font: "bold"
            },
        },
    };
    const data = []
    for (let i = 0; i < users.length; i++) {
        const user = {
            no: i + 1,
            id: users[i].id,
            avatar: users[i].image,
            email: users[i].email,
            name: users[i].name,
            phone: users[i].phone,
            roles: users[i].roles,
            address: users[i].address,
        }
        data.push(user);
    }
    const paginationComponentOptions = {
        rowsPerPageText: 'Items per page',
    };
    return (
        <>
            <div className="w-full max-w-9xl mx-auto">
                <h2 className="font-bold md:text-4xl text-2xl text-amber-600 uppercase mb-5">
                    <i className="fa fa-users" aria-hidden="true"></i> user list</h2>
                <div className="flex space-x-2 md:justify-end justify-start mb-5">
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
                                className="btn px-6 py-2.5 bg-amber-500
                                text-white font-medium text-xs leading-tight uppercase rounded shadow-md
                                 hover:bg-amber-600 hover:shadow-lg focus:bg-amber-600  focus:shadow-lg
                                  focus:outline-none focus:ring-0 active:bg-amber-600 active:shadow-lg
                                  transition duration-150 ease-in-out flex items-center"
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
                {pending ? <Loading adminPage={true}/>
                    :
                    <DataTable
                        columns={columns}
                        data={data}
                        pagination
                        customStyles={customStyles}
                        progressPending={pending}
                        paginationComponentOptions={paginationComponentOptions}
                        // progressComponent={<Loading />}
                    />
                }
            </div>

        </>

    )
}

export default UsersTable;