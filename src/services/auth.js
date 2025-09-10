import supabase from "./supabase";

export async function register(email, password) {
    //método signUp() de auth de supabase
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });
    if(error) {
        console.error('[auth.js register] Error al crear una cuenta: ', error);
        throw error;
    }
    console.log("Usuario registrado: ", data);
    
}
export async function login(email, password) {
    
}
export async function logout() {
    
}
