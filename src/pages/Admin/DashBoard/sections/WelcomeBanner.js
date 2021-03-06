import React, {useEffect, useState} from 'react';
import {getReports, getReportsChart, UpdateProduct} from "../../../../features/Api";
import Loading from "../../../../Loading";
import {numberFormat} from "../../../LandingPages/Home/function/FormatMoney";
import {Doughnut, Line} from 'react-chartjs-2';
import {useForm} from "react-hook-form";
import {compareAsc, format} from 'date-fns'
import {
    Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement
} from 'chart.js';


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

function WelcomeBanner() {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();
    const [report, setReport] = useState(
        {
            totalOrder: 0,
            totalProduct: 0,
            totalRevenue: 0,
            totalUser: 0
        }
    );
    const [lineChart, setLineChart] = useState([]);
    const [pending, setPending] = useState(1);
    const [approved, setApproved] = useState(1);
    console.log(report);
    useEffect(() => {
        const data = {
            fromDate: null,
            toDate: null
        }
        getReports(data)
            .then(response => {
                setReport(response.data);
                setPending(response.data.order.approved)
                setApproved(response.data.order.delivery)
            })
            .catch(err => {
                console.log(err);
            })

        getReportsChart()
            .then(response => {
                setLineChart(response.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);
    let lineChartLables = [];
    let lineChartData = [];

    if (lineChart) {
        lineChart.forEach(chart => {
            lineChartLables.push(chart.year + "/" + chart.month);
            lineChartData.push(chart.revenue);
        })
    }

    const dataDoughnut = {
        datasets: [{
            data: [pending, approved],
            backgroundColor: [
                'orange',
                'blue',
            ]
        },
        ],
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
            'Approved',
            'Delivery'
        ],
    };

    const dataLine = {
        labels: lineChartLables,
        datasets: [
            {
                label: "monthly revenue",
                data: lineChartData,
                fill: true,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)"
            }
        ]
    };
    const [errorFromDate, setErrorFromDate] = useState(false);
    const [errorToDate, setErrorToDate] = useState(false);
    const [errorDate, setErrorDate] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);
    const onSubmit = async (data, e) => {
        setShowSpinner(true);
        const today = format(new Date(), 'yyyy-MM-dd')
        if (today < data.fromDate) {
            setErrorFromDate(true);
        }
        if (today < data.toDate) {
            setErrorToDate(true);
        }
        if (data.fromDate > data.toDate) {
            setErrorDate(true);
        }

        const body = {
            fromDate: data.fromDate,
            toDate: data.toDate,
        }
        console.log(body);
        getReports(body)
            .then(response => {
                setShowSpinner(false);
                setErrorFromDate(false);
                setErrorToDate(false);
                setErrorDate(false);
                setReport(response.data);
                setPending(response.data.order.approved)
                setApproved(response.data.order.delivery)
            })
            .catch(err => {
                console.log(err);
            })

    };
    return (

        report ?
            <div>
                <div className="accordion" id="accordionExample">
                    <div>
                        <div className="bg-white flex md:flex-row flex-col justify-between">
                            <h2 className="text-xl font-bold mb-0 flex items-center" id="headingOne">
                                <button
                                    className="relative flex items-center w-full py-4 px-5 text-2xl font-bold
                                 text-amber-600 text-left bg-white border-0 rounded-none transition focus:outline-no cursor-default uppercase"
                                    type="button"
                                >
                                    General report
                                </button>
                            </h2>
                            <form className="flex md:flex-row flex-col justify-end md:w-1/2 w-full py-3 px-4 md:px-10"
                                  onSubmit={handleSubmit(onSubmit)}>
                                <div className="datepicker relative form-floating md:mr-2 mr-0 md:mb-0 mb-3">
                                    <input type="date"
                                           id="fromDate"
                                           name="fromDate"
                                           className="form-control block w-full px-2
                                            py-1.5 text-base font-normal text-gray-700 bg-white
                                            bg-clip-padding border border-solid border-gray-300
                                            rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                           placeholder="Select a date"
                                           {...register("fromDate", {required: true})}
                                    />
                                    <label htmlFor="floatingInput" className="text-gray-700">From</label>
                                    {errors.fromDate && errors.fromDate.type === "required" &&
                                        <p className="text-red-500 text-xs mt-3 italic">Invalid date</p>}
                                    {errorFromDate &&
                                        <p className="text-red-500 text-xs mt-3 italic">value cannot be greater than
                                            current date</p>}
                                    {errorDate &&
                                        <p className="text-red-500 text-xs mt-3 italic">From date invalid</p>}
                                </div>
                                <div className="datepicker relative form-floating md:mr-2 mr-0 md:mb-0 mb-3">
                                    <input type="date"
                                           id="toDate"
                                           name="toDate"
                                           className="form-control block w-full px-2
                                            py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                           placeholder="Select a date"
                                           {...register("toDate", {required: true})}
                                    />
                                    <label htmlFor="floatingInput" className="text-gray-700">To</label>
                                    {errors.toDate && errors.toDate.type === "required" &&
                                        <p className="text-red-500 text-xs mt-3 italic">Invalid date</p>}
                                    {errorToDate &&
                                        <p className="text-red-500 text-xs mt-3 italic">value cannot be greater than
                                            current date</p>}
                                </div>
                                <button type="submit"
                                        className="inline-block md:px-8 md:py-5 px-4 py-3 bg-amber-500 text-white font-medium h-fit md:mb-0 mb-3
                                        text-sm leading-tight uppercase rounded shadow-md hover:bg-amber-600
                                        hover:shadow-lg focus:bg-amber-600 focus:shadow-lg focus:outline-none focus:ring-0
                                         active:bg-amber-600 active:shadow-lg transition duration-150 ease-in-out">Filter
                                    {showSpinner && (
                                        <div
                                            class="spinner-border animate-spin inline-block w-4 h-4 border-3 ml-2 rounded-full"
                                            role="status"
                                        >
                                            <span class="visually-hidden">Loading...</span>
                                        </div>
                                    )}
                                </button>

                            </form>
                        </div>

                        <div
                            id="collapseOne"
                            className="accordion-collapse collapse show"
                        >
                            <div className="accordion-body py-4 px-5">
                                <div className="grid md:gap-8 gap-4 md:p-4 p-0 grid-cols-2 md:grid-cols-4">
                                    <div className="block p-4 bg-slate-10 rounded-md dark:bg-darker
                hover:scale-110 transition duration-300 ease-in-out border-2 border-red-600 hover:shadow-red-400
                hover:shadow-lg">
                                        <div className="flex justify-end">
                                            <div className="text-red-600 md:text-4xl text-lg">
                                                <i className="fa fa-usd" aria-hidden="true"></i>
                                            </div>
                                        </div>
                                        <div className="block ">
                                            <h5 className="font-bold leading-tight md:text-2xl text-lg mt-0 mb-2 text-slate-800">{numberFormat(report.totalRevenue)}</h5>
                                            <p className="font-medium leading-tight md:text-base text-sm mt-0 text-slate-400 uppercase">
                                                Revenues total
                                            </p>
                                        </div>
                                    </div>
                                    <div className="block p-4 bg-slate-10 rounded-md dark:bg-darker
                hover:scale-110 transition duration-300 ease-in-out border-2 border-green-600 hover:shadow-green-400
                hover:shadow-lg">
                                        <div className="flex justify-end">
                                            <div className="text-green-600 md:text-4xl text-lg">
                                                <i className="fa fa-bar-chart" aria-hidden="true"></i>
                                            </div>
                                        </div>
                                        <div className="block ">
                                            <h5 className="font-bold leading-tight md:text-2xl text-lg mt-0 mb-2 text-slate-800">{report.totalProduct}</h5>
                                            <p className="font-medium leading-tight md:text-base text-sm mt-0 text-slate-400 uppercase">products
                                                total</p>
                                        </div>
                                    </div>
                                    <div className="block p-4 bg-slate-10 rounded-md dark:bg-darker
                hover:scale-110 transition duration-300 ease-in-out border-2 border-amber-500 hover:shadow-amber-400
                hover:shadow-lg">
                                        <div className="flex justify-end">
                                            <div className="text-amber-500 md:text-4xl text-lg">
                                                <i className="fa fa-users" aria-hidden="true"></i>
                                            </div>
                                        </div>
                                        <div className="block ">
                                            <h5 className="font-bold leading-tight md:text-2xl text-lg mt-0 mb-2 text-slate-800">{report.totalUser}</h5>
                                            <p className="font-medium leading-tight md:text-base text-sm mt-0 text-slate-400 uppercase">
                                                Users Total
                                            </p>
                                        </div>
                                    </div>
                                    <div className="block p-4 bg-slate-10 rounded-md dark:bg-darker
                hover:scale-110 transition duration-300 ease-in-out border-2 border-blue-600 hover:shadow-blue-600
                hover:shadow-lg">
                                        <div className="flex justify-end">
                                            <div className="text-blue-600 md:text-4xl text-lg">
                                                <i className="fa fa-clipboard" aria-hidden="true"></i>
                                            </div>
                                        </div>
                                        <div className="block ">
                                            <h5 className="font-bold leading-tight md:text-2xl text-lg mt-0 mb-2 text-slate-800">{report.totalOrder}</h5>
                                            <p className="font-medium leading-tight md:text-base text-sm mt-0 text-slate-400 uppercase">All
                                                orders</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/*----------------------------------------------------*/}

                <div className="grid grid-cols-1 gap-8 md:p-4 p-0 lg:grid-cols-3 ">
                    <div className="mx-auto w-full md:col-span-2 col-span-1">
                        <h2 className="text-xl font-bold  mb-0" id="headingOne">
                            <button
                                className="relative flex items-center w-full py-4 px-5 text-2xl font-bold text-amber-600 cursor-default
                                 6 text-left bg-white border-0 rounded-none transition focus:outline-no uppercase"
                                type="button"

                            >
                                monthly revenue report
                            </button>
                        </h2>
                        <Line data={dataLine}/>
                    </div>
                    <div className="mx-auto w-full dataDoughnut col-span-1">
                        <h2 className="text-xl font-bold mb-0 " id="headingOne">
                            <button
                                className="relative flex items-center justify-center w-full py-4 px-5 text-2xl font-bold
                                 text-amber-600 cursor-default text-left bg-white border-0 rounded-none transition focus:outline-no uppercase "
                                type="button"

                            >
                                new order status report
                            </button>
                        </h2>
                        <Doughnut data={dataDoughnut}/>
                    </div>
                </div>
            </div>
            : <Loading adminPage={true}/>
    );
}

export default WelcomeBanner;
