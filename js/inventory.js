
/* ==========================================================
   INVENTORY JS
========================================================== */


/* ==========================================================
   INVENTORY INIT
========================================================== */


document.addEventListener(
    "DOMContentLoaded",
    ()=>{


        if(
            document.querySelector(
                "#inventoryTable"
            )
        ){

            loadInventory();

        }


    }
);





/* ==========================================================
   LOAD INVENTORY
========================================================== */


async function loadInventory(){


    const products =
        await fetchData(
            "products"
        );



    renderInventoryTable(
        products
    );


}





/* ==========================================================
   RENDER INVENTORY TABLE
========================================================== */


function renderInventoryTable(
    products
){


    const tbody =
        document.querySelector(
            "#inventoryTable tbody"
        );



    if(!tbody){

        return;

    }



    tbody.innerHTML = "";



    if(products.length === 0){


        tbody.innerHTML = `

        <tr>

            <td colspan="5"
            class="text-center">

                재고 데이터가 없습니다.

            </td>

        </tr>

        `;


        return;

    }





    products.forEach(
        product=>{


            const stock =
                Number(
                    product.stock || 0
                );



            tbody.innerHTML += `

            <tr>


                <td>

                    ${product.name}

                </td>



                <td>

                    ${product.category || "-"}

                </td>



                <td>

                    ${formatNumber(stock)}

                </td>



                <td>

                    ${getStockStatus(stock)}

                </td>



                <td>


                    <button

                    class="table-btn edit"

                    onclick="updateStock(${product.id})">

                        재고 수정

                    </button>


                </td>


            </tr>

            `;


        }
    );


}





/* ==========================================================
   STOCK STATUS
========================================================== */


function getStockStatus(
    stock
){


    if(stock <= 0){


        return `

        <span class="status cancel">

            품절

        </span>

        `;


    }


    if(stock <= 10){


        return `

        <span class="status pending">

            부족

        </span>

        `;


    }



    return `

    <span class="status complete">

        정상

    </span>

    `;


}





/* ==========================================================
   UPDATE STOCK
========================================================== */


async function updateStock(
    id
){


    const products =
        await fetchData(
            "products"
        );



    const product =
        products.find(
            item =>
                item.id === id
        );



    if(!product){

        return;

    }



    const newStock =
        prompt(
            "변경할 재고 수량을 입력하세요.",
            product.stock
        );



    if(
        newStock === null
    ){

        return;

    }



    const result =
        await updateData(
            "products",
            id,
            {
                stock:
                    Number(
                        newStock
                    )
            }
        );



    if(result){


        alert(
            "재고 수정 완료"
        );


        loadInventory();


    }


}





/* ==========================================================
   STOCK CONTROL
   매입/매출 연동용
========================================================== */


/*
    재고 증가
*/

async function increaseStock(
    productId,
    quantity
){


    const products =
        await fetchData(
            "products"
        );


    const product =
        products.find(
            item =>
                item.id === productId
        );



    if(!product){

        return false;

    }



    return await updateData(

        "products",

        productId,

        {

            stock:
                Number(product.stock || 0)
                +
                Number(quantity)

        }

    );


}





/*
    재고 감소
*/

async function decreaseStock(
    productId,
    quantity
){


    const products =
        await fetchData(
            "products"
        );


    const product =
        products.find(
            item =>
                item.id === productId
        );



    if(!product){

        return false;

    }



    const newStock =
        Number(product.stock || 0)
        -
        Number(quantity);



    return await updateData(

        "products",

        productId,

        {

            stock:
                Math.max(
                    0,
                    newStock
                )

        }

    );


}
