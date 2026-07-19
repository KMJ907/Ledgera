/* ==========================================================
   PRODUCTS JS
========================================================== */


/* ==========================================================
   PRODUCTS INIT
========================================================== */


document.addEventListener(
    "DOMContentLoaded",
    ()=>{


        if(
            document.querySelector(
                "#productTable"
            )
        ){

            loadProducts();

            initProductForm();

        }


    }
);





/* ==========================================================
   LOAD PRODUCTS
========================================================== */


async function loadProducts(){


    const products =
        await fetchData(
            "products"
        );


    renderProductTable(
        products
    );


}





/* ==========================================================
   RENDER TABLE
========================================================== */


function renderProductTable(
    data
){


    const tbody =
        document.querySelector(
            "#productTable tbody"
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

                등록된 상품이 없습니다.

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

                    ${item.name}

                </td>



                <td>

                    ${item.category || "-"}

                </td>



                <td>

                    ${item.unit || "-"}

                </td>



                <td>

                    ${formatMoney(
                        item.purchase_price
                    )}

                </td>



                <td>

                    ${formatMoney(
                        item.sales_price
                    )}

                </td>



                <td>

                    ${formatNumber(
                        item.stock
                    )}

                </td>



                <td>


                    <button

                    class="table-btn edit"

                    onclick="editProduct(${item.id})">

                        수정

                    </button>



                    <button

                    class="table-btn delete"

                    onclick="removeProduct(${item.id})">

                        삭제

                    </button>


                </td>


            </tr>

            `;


        }
    );


}





/* ==========================================================
   PRODUCT FORM
========================================================== */


function initProductForm(){


    const form =
        document.querySelector(
            "#productForm"
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



            const payload = {


                name:
                    formData.get(
                        "name"
                    ),



                category:
                    formData.get(
                        "category"
                    ),



                unit:
                    formData.get(
                        "unit"
                    ),



                purchase_price:
                    Number(
                        formData.get(
                            "purchase_price"
                        )
                    ),



                sales_price:
                    Number(
                        formData.get(
                            "sales_price"
                        )
                    ),



                stock:
                    Number(
                        formData.get(
                            "stock"
                        )
                    )


            };



            const result =
                await insertData(
                    "products",
                    payload
                );



            if(result){


                alert(
                    "상품 등록 완료"
                );


                form.reset();


                loadProducts();


            }


        }
    );


}





/* ==========================================================
   DELETE PRODUCT
========================================================== */


async function removeProduct(id){


    if(
        !confirmDelete()
    ){

        return;

    }



    const result =
        await deleteData(
            "products",
            id
        );



    if(result){


        alert(
            "상품 삭제 완료"
        );


        loadProducts();


    }


}





/* ==========================================================
   EDIT PRODUCT
========================================================== */


async function editProduct(id){


    const products =
        await fetchData(
            "products"
        );



    const item =
        products.find(
            product =>
                product.id === id
        );



    if(!item){

        return;

    }



    document.querySelector(
        "[name='name']"
    ).value =
        item.name;



    document.querySelector(
        "[name='category']"
    ).value =
        item.category || "";



    document.querySelector(
        "[name='unit']"
    ).value =
        item.unit || "";



    document.querySelector(
        "[name='purchase_price']"
    ).value =
        item.purchase_price;



    document.querySelector(
        "[name='sales_price']"
    ).value =
        item.sales_price;



    document.querySelector(
        "[name='stock']"
    ).value =
        item.stock;



}





/* ==========================================================
   GET PRODUCT LIST
   매입/매출 폼에서 사용
========================================================== */


async function getProductList(){


    return await fetchData(
        "products"
    );


}
