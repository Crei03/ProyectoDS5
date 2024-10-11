import type { APIRoute } from "astro";
import { supabase } from "../../lib/database"; // Asumiendo que estás usando Supabase

export const POST: APIRoute = async ({ request, redirect }) => {
  try {
    // Obtener los datos del formulario
    const formData = await request.formData();
    
    // Extraer los valores del formulario
    const nombre = formData.get("Nombre")?.toString() || "";
    const apellido = formData.get("Apellido")?.toString() || "";
    const direccion = formData.get("Direccion")?.toString() || "";
    const celular = formData.get("Celular")?.toString() || "";
    const correo = formData.get("Correo")?.toString() || "";
    const password = formData.get("Passw")?.toString() || "";
    let tipo_usuario = null;

    // Validar los datos del formulario
    if(correo.endsWith("@jselectronics.org")){
      tipo_usuario = "Empleado";
      const { error } = await supabase
        .from("usuarios")
        .insert([{ nombre, apellido, correo, password, direccion, celular, tipo_usuario }]);
  
      if (error) {
        throw new Error("Error al crear el usuario: " + error.message);
      }
    } else {
      tipo_usuario = "Cliente";
      const { error } = await supabase
        .from("usuarios")
        .insert([{ nombre, apellido, correo, password, direccion, celular, tipo_usuario }]);
  
      if (error) {
        throw new Error("Error al crear el usuario: " + error.message);
      } 
    }
    
    // Redirigir a la página de inicio de sesión después de crear el usuario
    return redirect("/login");

  } catch (err) {
    // Redirigir a una página de error o mostrar un mensaje en la misma página
    return new Response("/CrearCuenta", { status: 500 });
  }
};
