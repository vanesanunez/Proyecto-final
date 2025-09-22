import supabase from "./supabase";

//caché local de los id de chats privados para evitar tener que buscarlo múltiples veces
//objeto que guarde los ids 
let privateChatIdsCache = {};

//levantamos del caché los ids que haya almacenados 
if(localStorage.getItem('privateChatIds')) {
    privateChatIdsCache = JSON.parse(localStorage.getItem('privateChatIds'));
}


/**
 * 
 * @param {string} sender_id 
 * @param {string} receiver_id 
 * @returns {Promise<number>}
 */
async function getPrivateChat(sender_id, receiver_id) {
    //al arrancar la peticion obtenemos la clave del caché (preguntamos si está el id en el caché)
    const cacheKey = [sender_id, receiver_id].sort().join('_');
    if(privateChatIdsCache[cacheKey]) return privateChatIdsCache[cacheKey];

    let chat_id = await fetchPrivateChat(sender_id, receiver_id);

    if(!chat_id) {
        chat_id = await createPrivateChat(sender_id, receiver_id);
    }

    //guardamos el id en el caché
    privateChatIdsCache[cacheKey] = chat_id;
    localStorage.setItem('privateChatIds', JSON.stringify(privateChatIdsCache));

    return chat_id;
}


/**
 * 
 * @param {string} sender_id 
 * @param {string} receiver_id 
 * @returns {Promise<number|null>}
 */
async function fetchPrivateChat(sender_id, receiver_id) {
    //ordenamos los ids para que siempre queden en un mismo orden
    const userIds = [sender_id, receiver_id].sort();


    const { data, error } = await supabase
    .from('private_chats')
    .select('id')
    .eq('user_id1', userIds[0])
    .eq('user_id2', userIds[1]);

    if(error) {
        console.error('[private-chats.js fetchPrivateChat] Error al traer el chat privado: ', error);
        throw error;
    }

    //leer el id solo si existe (conditional chaining operator)
    return data[0]?.id;
}


/**
 * 
 * @param {string} sender_id 
 * @param {string} receiver_id 
 * @returns {Promise<number>}
 */
async function createPrivateChat(sender_id, receiver_id) {

    //ordenamos los ids para que siempre queden en un mismo orden
    const userIds = [sender_id, receiver_id].sort();

    const { data, error } = await supabase
    .from('private_chats')
    .insert({
        user_id1: userIds[0],
        user_id2: userIds[1],
    })
    //llamando a .select() luego de un .insert() nos retorna el registro que acaba de ser insertado en la BBDD
    .select();

    if(error) {
        console.error('[private-chats.js createPrivateChat] Error al crear el chat privado: ', error);
        throw error;
    }

    return data[0].id;
}

/**
 * 
 * @param {string} sender_id 
 * @param {string} receiver_id 
 * @param {string} body 
 */
export async function sendPrivateChatMessage(sender_id, receiver_id, body) {
    const chat_id = await getPrivateChat(sender_id, receiver_id);
    
    const { error } = await supabase
    .from('private_messages')
    .insert({
        chat_id,
        sender_id,
        body,
    });

    if(error) {
        console.error('[private-chats.js sendPrivateChatMessage] Error al enviar el mensaje de chat privado: ', error);
        throw error;
    }
}

/**
 * 
 * @param {string} sender_id 
 * @param {string} receiver_id 
 * @param {() => {}} callback 
 */
export async function subscribeToPrivateChatNewMessages(sender_id, receiver_id, callback) {
    const chat_id = await getPrivateChat(sender_id, receiver_id);

    const privateChannel = supabase.channel('private-chats');
    privateChannel.on(
        'postgres_changes',
        {
            event: 'INSERT',
            schema: 'public',
            table: 'private_messages',
            filter: 'chat_id=eq.' + chat_id, //filter permite aclara una condición que debe cumplirse para aceptar una notificación de este evento (para que sean los msjs del chat en el que estamos involucrados )
        },
        payload => {
            callback(payload.new);
        }
    );   
    privateChannel.subscribe(); 
}

/**
 * 
 * @param {string} sender_id 
 * @param {string} receiver_id 
 * @returns {Promise<{id: number, chat_id: number, sender_id: string, body: string, created_at: string}[]>}
 */
export async function getLastPrivateChatMessages(sender_id, receiver_id) {
    const chat_id = await getPrivateChat(sender_id, receiver_id); 

    const {data, error} = await supabase
    .from('private_messages')
    .select()
    .eq('chat_id', chat_id);

    if(error) {
        console.error('[private-chats.js getLastPrivateChatMessages] Error al traer los últimos mensajes del chat privado: ', error);
        throw error;
    }

    return data;
}