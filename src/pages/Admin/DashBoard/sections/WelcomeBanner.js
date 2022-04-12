import React, {useEffect, useState} from 'react';
import {getReports, getReportsChart} from "../../../../features/Api";
import Loading from "../../../../Loading";
import {numberFormat} from "../../../LandingPages/Home/function/FormatMoney";
import {Doughnut, Line} from 'react-chartjs-2';
import {
    Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

function WelcomeBanner() {
    const [report, setReport] = useState();
    const [lineChart, setLineChart] = useState([]);
    const [pending, setPending] = useState(1);
    const [approved, setApproved] = useState(1);
    useEffect(() => {
        getReports()
            .then(response => {
                setReport(response.data);
                setPending(response.data.order.pending)
                setApproved(response.data.order.approved)
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
    console.log(lineChart);
    let lineChartLables=[];
    let lineChartData=[];

    if(lineChart) {
        lineChart.reverse().forEach(chart  => {
            lineChartLables.push(chart.year +"/"+ chart.month);
            lineChartData.push(chart.revenue);
        })
    }

    console.log(lineChartLables);
    console.log(lineChartData);
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
            'Pending',
            'Approved',
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

    return (
        report ?
            <div>
                <div className="accordion" id="accordionExample">
                    <div className="bg-white ">
                        <h2 className="text-xl font-bold  mb-0" id="headingOne">
                            <button
                                className="relative flex items-center w-full py-4 px-5 text-3xl font-bold
                                 text-slate-600 text-left bg-white border-0 rounded-none transition focus:outline-no uppercase"
                                type="button"
                            >
                                General report
                            </button>
                        </h2>
                        <div
                            id="collapseOne"
                            className="accordion-collapse collapse show"
                        >
                            <div className="accordion-body py-4 px-5">
                                <div className="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-4">
                                    <div className="block p-4 bg-slate-10 rounded-md dark:bg-darker
                hover:scale-110 transition duration-300 ease-in-out border-2 border-red-600 hover:shadow-red-400
                hover:shadow-lg">
                                        <div className="flex justify-end">
                                            <div className="text-red-600 text-4xl">
                                                <i className="fa fa-usd" aria-hidden="true"></i>
                                            </div>
                                        </div>
                                        <div className="block ">
                                            <h5 className="font-bold leading-tight text-2xl mt-0 mb-2 text-slate-800">{numberFormat(report.totalRevenue)}</h5>
                                            <p className="font-medium leading-tight text-md mt-0 text-slate-400 uppercase">Items
                                                Sales</p>
                                        </div>
                                    </div>
                                    <div className="block p-4 bg-slate-10 rounded-md dark:bg-darker
                hover:scale-110 transition duration-300 ease-in-out border-2 border-green-600 hover:shadow-green-400
                hover:shadow-lg">
                                        <div className="flex justify-end">
                                            <div className="text-green-600 text-4xl">
                                                <i className="fa fa-bar-chart" aria-hidden="true"></i>
                                            </div>
                                        </div>
                                        <div className="block ">
                                            <h5 className="font-bold leading-tight text-2xl mt-0 mb-2 text-slate-800">{report.totalProduct}</h5>
                                            <p className="font-medium leading-tight text-md mt-0 text-slate-400 uppercase">products
                                                total</p>
                                        </div>
                                    </div>
                                    <div className="block p-4 bg-slate-10 rounded-md dark:bg-darker
                hover:scale-110 transition duration-300 ease-in-out border-2 border-amber-500 hover:shadow-amber-400
                hover:shadow-lg">
                                        <div className="flex justify-end">
                                            <div className="text-amber-500 text-4xl">
                                                <i className="fa fa-home" aria-hidden="true"></i>
                                            </div>
                                        </div>
                                        <div className="block ">
                                            <h5 className="font-bold leading-tight text-2xl mt-0 mb-2 text-slate-800">{report.order.pending}</h5>
                                            <p className="font-medium leading-tight text-md mt-0 text-slate-400 uppercase">Pending order</p>
                                        </div>
                                    </div>
                                    <div className="block p-4 bg-slate-10 rounded-md dark:bg-darker
                hover:scale-110 transition duration-300 ease-in-out border-2 border-blue-600 hover:shadow-blue-600
                hover:shadow-lg">
                                        <div className="flex justify-end">
                                            <div className="text-blue-600 text-4xl">
                                                <i className="fa fa-home" aria-hidden="true"></i>
                                            </div>
                                        </div>
                                        <div className="block ">
                                            <h5 className="font-bold leading-tight text-2xl mt-0 mb-2 text-slate-800">{report.totalOrder}</h5>
                                            <p className="font-medium leading-tight text-md mt-0 text-slate-400 uppercase">All order</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/*----------------------------------------------------*/}

                <div className="grid grid-cols-1 gap-8 p-4 lg:grid-cols-3 ">
                    <div className="mx-auto w-full col-span-2">
                        <h2 className="text-xl font-bold  mb-0" id="headingOne">
                            <button
                                className="relative flex items-center w-full py-4 px-5 text-2xl font-bold
                                 6 text-left bg-white border-0 rounded-none transition focus:outline-no uppercase"
                                type="button"

                            >
                                monthly revenue report
                            </button>
                        </h2>
                        <Line data={dataLine}/>
                    </div>
                    <div className="mx-auto full dataDoughnut">
                        <h2 className="text-xl font-bold mb-0 " id="headingOne">
                            <button
                                className="relative flex items-center justify-center w-full py-4 px-5 text-2xl font-bold
                                 text-slate-600 text-left bg-white border-0 rounded-none transition focus:outline-no uppercase "
                                type="button"

                            >
                                new order status report
                            </button>
                        </h2>
                        <Doughnut data={dataDoughnut}/>
                    </div>
                </div>
            </div>
            : <Loading/>
    );
}

export default WelcomeBanner;
