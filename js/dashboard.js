
/* ==========================================================
   DASHBOARD JS
========================================================== */


/* ==========================================================
   DASHBOARD INIT
========================================================== */


document.addEventListener(
    "DOMContentLoaded",
    ()=>{


        if(
            document.querySelector(
                ".dashboard"
            )
        ){

            loadDashboard();

        }


    }
);





/* ==========================================================
   LOAD DASHBOARD
========================================================== */


async function loadDashboard(){


    try{


        const purchases =
            await fetchData(
                "purchase"
            );


        const sales =
            await fetchData(
                "sales"
            );



        updateSummary(
            purchases,
            sales
        );


        loadRecentTransactions(
            purchases,
            sales
        );


        loadChartData(
            purchases,
            sales
        );



    }catch(error){


        console.error(
            "Dashboard Load Error :",
            error
        );


    }


}





/* ==========================================================
   SUMMARY CARD
========================================================== */


function updateSummary(
    purchases,
    sales
){


    const totalPurchase =
        purchases.reduce(
            (sum,item)=>
                sum + Number(
                    item.amount || 0
                ),
            0
        );



    const totalSales =
        sales.reduce(
            (sum,item)=>
                sum + Number(
                    item.amount || 0
                ),
            0
        );



    const profit =
        totalSales -
        totalPurchase;



    const transactionCount =
        purchases.length +
        sales.length;



    const purchaseElement =
        document.querySelector(
            "#totalPurchase"
        );


    const salesElement =
        document.querySelector(
            "#totalSales"
        );


    const profitElement =
        document.querySelector(
            "#totalProfit"
        );


    const countElement =
        document.querySelector(
            "#transactionCount"
        );



    if(purchaseElement)
        purchaseElement.textContent =
            formatMoney(
                totalPurchase
            );



    if(salesElement)
        salesElement.textContent =
            formatMoney(
                totalSales
            );



    if(profitElement)
        profitElement.textContent =
            formatMoney(
                profit
            );



    if(countElement)
        countElement.textContent =
            formatNumber(
                transactionCount
            );


}





/* ==========================================================
   RECENT TRANSACTIONS
========================================================== */


function loadRecentTransactions(
    purchases,
    sales
){


    const container =
        document.querySelector(
            ".recent-list"
        );



    if(!container){

        return;

    }



    const transactions = [


        ...purchases.map(item=>({

            type:"매입",

            name:item.product_name,

            amount:item.amount,

            date:item.created_at

        })),


        ...sales.map(item=>({

            type:"매출",

            name:item.product_name,

            amount:item.amount,

            date:item.created_at

        }))


    ];



    transactions.sort(
        (a,b)=>
            new Date(b.date)
            -
            new Date(a.date)
    );



    const recent =
        transactions.slice(
            0,
            5
        );



    container.innerHTML = "";



    recent.forEach(
        item=>{


            container.innerHTML += `

            <div class="recent-item">

                <div>

                    <div class="recent-name">

                        ${item.type}
                        ${item.name || ""}

                    </div>


                    <div class="recent-date">

                        ${formatDate(item.date)}

                    </div>

                </div>


                <div class="recent-price">

                    ${formatMoney(item.amount)}

                </div>

            </div>

            `;


        }
    );


}





/* ==========================================================
   CHART DATA
========================================================== */


function loadChartData(
    purchases,
    sales
){


    const chart =
        document.querySelector(
            "#salesChart"
        );



    if(!chart){

        return;

    }



    /*
        Chart.js 연결 예정

        예:
        new Chart(chart,{
            type:"line",
            data:{}
        })

    */


}





/* ==========================================================
   DATE FORMAT
========================================================== */


function formatDate(date){


    if(!date){

        return "";

    }


    return new Date(date)
        .toLocaleDateString(
            "ko-KR"
        );


}
