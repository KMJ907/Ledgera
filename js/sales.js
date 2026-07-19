
/* ==========================================================
   SALES JS
========================================================== */


/* ==========================================================
   SALES INIT
========================================================== */


document.addEventListener(
    "DOMContentLoaded",
    ()=>{


        if(
            document.querySelector(
                "#salesTable"
            )
        ){

            loadSales();

            initSalesForm();

        }


    }
);





/* ==========================================================
   LOAD SALES
========================================================== */


async function loadSales(){


    const sales =
        await fetchData(
            "sales"
        );



    renderSalesTable(
        sales
    );


}





/* ==========================================================
   RENDER TABLE
========================================================== */


function renderSalesTable(
    data
){


    const tbody =
        document.querySelector(
            "#salesTable tbody"
        );



    if(!tbody){

        return;

    }



    tbody.innerHTML = "";



    if(data.length === 0){


        tbody.innerHTML = `

        <tr>

            <td colspan="7"
                class="text-center">

                등록된 매출 내역이 없습니다.

            </td>

        </tr>

        `;


        return;

    }




    data.forEach(
        item=>{


            tbody.innerHTML += `

            <tr>


                <td>

                    ${item.sales_date || "-"}

                </td>



                <td>

                    ${item.product_name || "-"}

                </td>



                <td>

                    ${item.partner_name || "-"}

                </td>



                <td>

                    ${formatNumber(
                        item.quantity
                    )}

                </td>



                <td>

                    ${formatMoney(
                        item.price
                    )}

                </td>



                <td>

                    ${formatMoney(
                        item.amount
                    )}

                </td>



                <td>


                    <button

                    class="table-btn edit"

                    onclick="editSales(${item.id})">

                        수정

                    </button>



                    <button

                    class="table-btn delete"

                    onclick="removeSales(${item.id})">

                        삭제

                    </button>


                </td>


            </tr>

            `;


        }
    );


}





/* ==========================================================
   SALES FORM
========================================================== */


function initSalesForm(){


    const form =
        document.querySelector(
            "#salesForm"
        );



    if(!form){

        return;

    }



    form.addEventListener(
        "submit",
        async(e)=>{


            e.preventDefault();



            const formData =
                new FormData(
                    form
                );



            const quantity =
                Number(
                    formData.get(
                        "quantity"
                    )
                );



            const price =
                Number(
                    formData.get(
                        "price"
                    )
                );



            const payload = {


                product_name:
                    formData.get(
                        "product_name"
                    ),


                partner_name:
                    formData.get(
                        "partner_name"
                    ),



                quantity,


                price,



                amount:
                    quantity * price,



                sales_date:
                    formData.get(
                        "sales_date"
                    )


            };



            const result =
                await insertData(
                    "sales",
                    payload
                );



            if(result){


                alert(
                    "매출 등록 완료"
                );



                form.reset();



                loadSales();


            }


        }
    );


}





/* ==========================================================
   DELETE
========================================================== */


async function removeSales(id){


    if(
        !confirmDelete()
    ){

        return;

    }



    const result =
        await deleteData(
            "sales",
            id
        );



    if(result){


        alert(
            "삭제 완료"
        );



        loadSales();


    }


}





/* ==========================================================
   EDIT
========================================================== */


async function editSales(id){


    const sales =
        await fetchData(
            "sales"
        );



    const item =
        sales.find(
            data =>
                data.id === id
        );



    if(!item){

        return;

    }



    document.querySelector(
        "[name='product_name']"
    ).value =
        item.product_name;



    document.querySelector(
        "[name='partner_name']"
    ).value =
        item.partner_name;



    document.querySelector(
        "[name='quantity']"
    ).value =
        item.quantity;



    document.querySelector(
        "[name='price']"
    ).value =
        item.price;



    document.querySelector(
        "[name='sales_date']"
    ).value =
        item.sales_date;



}
