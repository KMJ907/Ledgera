/* ==========================================================
   PURCHASE JS
========================================================== */


/* ==========================================================
   PURCHASE INIT
========================================================== */


document.addEventListener(
    "DOMContentLoaded",
    ()=>{


        if(
            document.querySelector(
                "#purchaseTable"
            )
        ){

            loadPurchases();

            initPurchaseForm();

        }


    }
);





/* ==========================================================
   LOAD PURCHASE DATA
========================================================== */


async function loadPurchases(){


    const purchases =
        await fetchData(
            "purchase"
        );


    renderPurchaseTable(
        purchases
    );


}





/* ==========================================================
   RENDER TABLE
========================================================== */


function renderPurchaseTable(
    data
){


    const tbody =
        document.querySelector(
            "#purchaseTable tbody"
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

                등록된 매입 내역이 없습니다.

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
                    ${item.purchase_date || "-"}
                </td>


                <td>
                    ${item.product_name || "-"}
                </td>


                <td>
                    ${item.partner_name || "-"}
                </td>


                <td>
                    ${formatNumber(item.quantity)}
                </td>


                <td>
                    ${formatMoney(item.price)}
                </td>


                <td>
                    ${formatMoney(item.amount)}
                </td>


                <td>


                    <button 
                    class="table-btn edit"
                    onclick="editPurchase(${item.id})">

                        수정

                    </button>


                    <button
                    class="table-btn delete"
                    onclick="removePurchase(${item.id})">

                        삭제

                    </button>


                </td>


            </tr>

            `;


        }
    );


}





/* ==========================================================
   PURCHASE FORM
========================================================== */


function initPurchaseForm(){


    const form =
        document.querySelector(
            "#purchaseForm"
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


                purchase_date:
                    formData.get(
                        "purchase_date"
                    )


            };



            const result =
                await insertData(
                    "purchase",
                    payload
                );



            if(result){


                alert(
                    "매입 등록 완료"
                );


                form.reset();


                loadPurchases();


            }


        }
    );


}





/* ==========================================================
   DELETE
========================================================== */


async function removePurchase(id){


    if(
        !confirmDelete()
    ){

        return;

    }



    const result =
        await deleteData(
            "purchase",
            id
        );



    if(result){


        alert(
            "삭제 완료"
        );


        loadPurchases();


    }


}





/* ==========================================================
   EDIT
========================================================== */


async function editPurchase(id){


    const purchases =
        await fetchData(
            "purchase"
        );



    const item =
        purchases.find(
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
        "[name='purchase_date']"
    ).value =
        item.purchase_date;



}
