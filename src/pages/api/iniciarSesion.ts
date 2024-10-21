import type { APIRoute } from "astro";
import { supabase } from "../../lib/database";

export const POST: APIRoute = async ({ request }) => {
  try {
    // Se obtiene los datos del formulario
    const formData = await request.formData();

    // Se extraen los valores del formulario
    const correo = formData.get("email")?.toString() || "";
    var password = formData.get("contraseña")?.toString() || "";

    if (!correo || !password) {
      return new Response("Faltan datos del formulario", { status: 400 });
    }

    // Se verifica si el usuario existe y las credenciales son correctas
    const { data: usuario, error } = await supabase
      .from("usuarios")
      .select("*")
      .eq("correo", correo)
      .eq("password", password)  
      .single();

    // Si hay error o el usuario no se encuentra
    if (error || !usuario) {
      return new Response("Usuario o contraseña incorrectos", { status: 401 });
    }

    // Variable que contiene la pagina correspondiente al usuario
    var tipoUsuario = ""

    if(correo.endsWith("@jselectronics.org")){
      tipoUsuario = "/contacto" //Reemplazar con la pagina de administrador
    }else{
      tipoUsuario = "/Layout"
    }

    //Verifica si es un trabajador o un cliente
    return new Response(null, {
      status: 302,
      headers: {
        Location: tipoUsuario,
      },
    });

  } catch (err) {
    console.error("Error en la API de inicio de sesión:", err);
    return new Response("Error interno del servidor", { status: 500 });
  }
};