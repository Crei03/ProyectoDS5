import type { APIRoute } from "astro";  
import { supabase } from "../../lib/database";

export const GET: APIRoute = async () => {
    try{

        const { data, error} = await supabase
        .from("laptops")
        .select("id,modelo,precio,en_stock,color,marca,procesador,ram,almacenamiento,tarjeta_grafica,anio,imagen")

        console.log(data)
        if(error){
            return new Response("Error al obtener los datos", {status: 500});
        } else {
            return new Response(JSON.stringify(data), {
                headers: {
                    "content-type": "application/json",
                },
            });
        }
        
    }catch(err){
        return new Response("Error interno del servidor", {status: 500});
    }
};