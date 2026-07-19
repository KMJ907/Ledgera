/* ==========================================================
   SUPABASE CONFIG
========================================================== */


const SUPABASE_URL = "https://svmsqobmypmauyyamcen.supabase.co";

const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2bXNxb2JteXBtYXV5eWFtY2VuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ0NDI3NzcsImV4cCI6MjEwMDAxODc3N30._z0_urFCLOUbGJmSup7h-KiOvITdBaf32cVOUVgxkq4";





/* ==========================================================
   CREATE CLIENT
========================================================== */


const supabaseClient =
    supabase.createClient(
        SUPABASE_URL,
        SUPABASE_ANON_KEY
    );





/* ==========================================================
   GET DATA
========================================================== */


async function getData(table){


    const {
        data,
        error
    } =
    await supabaseClient
        .from(table)
        .select("*")
        .order(
            "created_at",
            {
                ascending:false
            }
        );



    if(error){


        console.error(
            table,
            error
        );


        return [];

    }



    return data;


}





/* ==========================================================
   INSERT DATA
========================================================== */


async function addData(
    table,
    payload
){


    const {
        data,
        error
    } =
    await supabaseClient
        .from(table)
        .insert(
            payload
        )
        .select();



    if(error){


        console.error(
            table,
            error
        );


        return null;

    }



    return data;


}





/* ==========================================================
   UPDATE DATA
========================================================== */


async function editData(
    table,
    id,
    payload
){


    const {
        data,
        error
    } =
    await supabaseClient
        .from(table)
        .update(
            payload
        )
        .eq(
            "id",
            id
        )
        .select();



    if(error){


        console.error(
            table,
            error
        );


        return null;

    }



    return data;


}





/* ==========================================================
   DELETE DATA
========================================================== */


async function removeData(
    table,
    id
){


    const {
        error
    } =
    await supabaseClient
        .from(table)
        .delete()
        .eq(
            "id",
            id
        );



    if(error){


        console.error(
            table,
            error
        );


        return false;

    }



    return true;


}





/* ==========================================================
   SEARCH DATA
========================================================== */


async function searchData(
    table,
    column,
    keyword
){


    const {
        data,
        error
    } =
    await supabaseClient
        .from(table)
        .select("*")
        .ilike(
            column,
            `%${keyword}%`
        );



    if(error){


        console.error(
            table,
            error
        );


        return [];

    }



    return data;


}





/* ==========================================================
   COUNT DATA
========================================================== */


async function countData(
    table
){


    const {
        count,
        error
    }
    =
    await supabaseClient
        .from(table)
        .select(
            "*",
            {
                count:"exact",
                head:true
            }
        );



    if(error){

        console.error(error);

        return 0;

    }



    return count;


}





/* ==========================================================
   REALTIME
========================================================== */


function realtime(
    table,
    callback
){


    return supabaseClient
        .channel(
            table
        )
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
