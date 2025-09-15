import supabase from "./supabase";
import { createUserProfile, getUserProfileById } from "./user-profiles";

//defino una variable que contenga los datos del usuario ("subject")
let user = {
    id: null,
    name: null,
    lastname: null,
    dni: null,
    email: null,
}
//Array para guardar la lista de observers que deben ser notificados de los cambios en "user"
let observers = [];

//pedimos cargar la data actual del usuario apenas arranca: 
loadInitialUserState();

//Carga la información del usuario autenticado,si es que existe alguno
async function loadInitialUserState() {
    const { data } = await supabase.auth.getUser();

    if(!data.user) return;
    //traemos los datos faltantes (los que agregué después, nombre,apellido y dni)
    getUserProfileById(data.user.id)
    .then(profileData => updateUser({
        name: profileData.name,
        lastname: profileData.lastname,
        dni: profileData.dni,
    }));

    updateUser({
        id: data.user.id,
        email: data.user.email,
    });
    // user = {
    //     ...user,
    //     id: data.user.id,
    //     email: data.user.email,
    // }
    // notifyAll();
}

export async function register(email, name, lastname, dni, password) {
    //método signUp() de auth de supabase
    const { data, error } = await supabase.auth.signUp({
        email,
        name,
        lastname,
        dni,
        password,
    });

    if(error) {
        console.error('[auth.js register] Error al crear una cuenta: ', error);
        throw error;
    }

    try {
        await createUserProfile({
            id: data.user.id,
            name,
            lastname,
            dni,
            email,
        });
    } catch (errorProfile) {
        throw errorProfile;
    }

    //guardar los datos del usuario autenticado notificar a los observers del cambio
    updateUser({
        id: data.user.id,
        email: data.user.email,
    });
    // user = {
    //     ...user,
    //     id: data.user.id,
    //     email: data.user.email,
    // }
    // notifyAll();
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
    //guardar los datos del usuario autenticado notificar a los observers del cambio
    updateUser({
        id: data.user.id,
        email: data.user.email,
    });
    // user = {
    //     ...user,
    //     id: data.user.id,
    //     email: data.user.email,
    // }
    // notifyAll();
    // return data.user;
}

export async function logout() {
    supabase.auth.signOut();

   updateUser({
    id: null, 
    email: null
});
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
/**
 * invoca un observer y le pasa los datos del usuario
 * @param {({id: string|null, email:string|null}) => void} callback
 */
export function notify(callback){
   callback({...user});
}

/**
 * notifica a todos los observers cada vez que ocurra un cambio (en la variable "user")
 */
function notifyAll() {
    observers.forEach(callback => notify(callback));
    //observers.forEach(notify);
}

/**
 * función para notificar a todos los observers de lso cambios del subject
 * @param {{id?: string||null, email?: string|null}} data 
 */
function updateUser(data) {
    user = {
        ...user,
        ...data,
    }
    notifyAll();
}