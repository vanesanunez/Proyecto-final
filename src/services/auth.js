import supabase from "./supabase";

//defino una variable que contenga los datos del usuario ("subject")
let user = {
    id: null,
    email: null,
}
//Array para guardar la lista de observers que deben ser notificados de los cambios en "user"
let observers = [];

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
     //método signInWithPassword() de auth de supabase
     const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    if(error) {
        console.error('[auth.js login] Error al iniciar sesión: ', error);
        throw error;
    }
    console.log("Usuario autenticado: ", data);
    return data.user;
}

export async function logout() {
    
}

//Métodos para el observer

/**
 * @param {({id: string|null, email:string|null}) => void} callback
 */
export function subscribeToUserState(callback){
    //Agregamos el callback al stack de observers
    observers.push(callback);

    //ejecutamos el callback para pasarle los datos actuales
    notify(callback);
}
