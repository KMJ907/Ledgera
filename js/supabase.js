
/* ==========================================================
   SUPABASE CONFIG
========================================================== */


/*
    Supabase 프로젝트 정보 입력

    Supabase Dashboard
    → Project Settings
    → API

    URL, anon public key 입력
*/


const SUPABASE_URL = "https://svmsqobmypmauyyamcen.supabase.co";

const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2bXNxb2JteXBtYXV5eWFtY2VuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ0NDI3NzcsImV4cCI6MjEwMDAxODc3N30._z0_urFCLOUbGJmSup7h-KiOvITdBaf32cVOUVgxkq4";



/* ==========================================================
   SUPABASE CLIENT
========================================================== */


const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);



/* ==========================================================
   DATABASE COMMON FUNCTIONS
========================================================== */


/*
    데이터 조회
*/

async function fetchData(table){


    try{


        const { data, error } = await supabaseClient

            .from(table)

            .select("*")

            .order("created_at", {

                ascending:false

            });



        if(error){

            throw error;

        }



        return data;



    }catch(error){


        console.error(
            `${table} 조회 실패 :`,
            error
        );


        return [];

    }


}



/*
    데이터 추가
*/

async function insertData(table, payload){


    try{


        const { data, error } = await supabaseClient

            .from(table)

            .insert(payload)

            .select();



        if(error){

            throw error;

        }



        return data;



    }catch(error){


        console.error(
            `${table} 추가 실패 :`,
            error
        );


        return null;

    }


}



/*
    데이터 수정
*/

async function updateData(
    table,
    id,
    payload
){


    try{


        const { data, error } = await supabaseClient

            .from(table)

            .update(payload)

            .eq("id", id)

            .select();



        if(error){

            throw error;

        }



        return data;



    }catch(error){


        console.error(
            `${table} 수정 실패 :`,
            error
        );


        return null;

    }


}



/*
    데이터 삭제
*/

async function deleteData(
    table,
    id
){


    try{


        const { error } = await supabaseClient

            .from(table)

            .delete()

            .eq("id", id);



        if(error){

            throw error;

        }



        return true;



    }catch(error){


        console.error(
            `${table} 삭제 실패 :`,
            error
        );


        return false;

    }


}



/* ==========================================================
   REALTIME
========================================================== */


function subscribeTable(
    table,
    callback
){


    return supabaseClient

        .channel(`${table}-changes`)

        .on(
            "postgres_changes",
            {
                event:"*",
                schema:"public",
                table:table
            },
            callback
        )

        .subscribe();


}
