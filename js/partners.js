
/* ==========================================================
   PARTNERS JS
========================================================== */


/* ==========================================================
   PARTNERS INIT
========================================================== */


document.addEventListener(
    "DOMContentLoaded",
    ()=>{


        if(
            document.querySelector(
                "#partnerTable"
            )
        ){

            loadPartners();

            initPartnerForm();

        }


    }
);





/* ==========================================================
   LOAD PARTNERS
========================================================== */


async function loadPartners(){


    const partners =
        await fetchData(
            "partners"
        );



    renderPartnerTable(
        partners
    );


}





/* ==========================================================
   RENDER TABLE
========================================================== */


function renderPartnerTable(
    data
){


    const tbody =
        document.querySelector(
            "#partnerTable tbody"
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

                등록된 거래처가 없습니다.

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

                    ${getPartnerType(
                        item.type
                    )}

                </td>



                <td>

                    ${item.business_number || "-"}

                </td>



                <td>

                    ${item.phone || "-"}

                </td>



                <td>

                    ${item.email || "-"}

                </td>



                <td>

                    ${item.address || "-"}

                </td>



                <td>


                    <button

                    class="table-btn edit"

                    onclick="editPartner(${item.id})">

                        수정

                    </button>



                    <button

                    class="table-btn delete"

                    onclick="removePartner(${item.id})">

                        삭제

                    </button>


                </td>


            </tr>

            `;


        }
    );


}





/* ==========================================================
   PARTNER FORM
========================================================== */


function initPartnerForm(){


    const form =
        document.querySelector(
            "#partnerForm"
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



                type:
                    formData.get(
                        "type"
                    ),



                business_number:
                    formData.get(
                        "business_number"
                    ),



                phone:
                    formData.get(
                        "phone"
                    ),



                email:
                    formData.get(
                        "email"
                    ),



                address:
                    formData.get(
                        "address"
                    )


            };



            const result =
                await insertData(
                    "partners",
                    payload
                );



            if(result){


                alert(
                    "거래처 등록 완료"
                );


                form.reset();


                loadPartners();


            }


        }
    );


}





/* ==========================================================
   DELETE PARTNER
========================================================== */


async function removePartner(id){


    if(
        !confirmDelete()
    ){

        return;

    }



    const result =
        await deleteData(
            "partners",
            id
        );



    if(result){


        alert(
            "거래처 삭제 완료"
        );


        loadPartners();


    }


}





/* ==========================================================
   EDIT PARTNER
========================================================== */


async function editPartner(id){


    const partners =
        await fetchData(
            "partners"
        );



    const item =
        partners.find(
            partner =>
                partner.id === id
        );



    if(!item){

        return;

    }



    document.querySelector(
        "[name='name']"
    ).value =
        item.name;



    document.querySelector(
        "[name='type']"
    ).value =
        item.type;



    document.querySelector(
        "[name='business_number']"
    ).value =
        item.business_number || "";



    document.querySelector(
        "[name='phone']"
    ).value =
        item.phone || "";



    document.querySelector(
        "[name='email']"
    ).value =
        item.email || "";



    document.querySelector(
        "[name='address']"
    ).value =
        item.address || "";


}





/* ==========================================================
   PARTNER TYPE
========================================================== */


function getPartnerType(type){


    switch(type){


        case "customer":

            return "고객";


        case "supplier":

            return "공급처";


        default:

            return "-";


    }


}





/* ==========================================================
   GET PARTNER LIST
   매입/매출 입력에서 사용
========================================================== */


async function getPartnerList(){


    return await fetchData(
        "partners"
    );


}
