import supabase from "./supabase";

async function fetchPrivateChat(sender_id, receiver_id) {
    const { data, error } = await supabase
    .from('private_chats')
    .select('id')
    .eq('user_id1', sender_id)
    .eq('user_id2', receiver_id);

    if(error) {
        console.error('[private-chats.js fetchPrivateChat] Error al traer el chat privado: ', error);
        throw error;
    }

    return data[0].id;
}


/**
 * 
 * @param {string} sender_id 
 * @param {string} receiver_id 
 * @returns {Promise<number>}
 */
async function createPrivateChat(sender_id, receiver_id) {
    const { data, error } = await supabase
    .from('private_chats')
    .insert({
        user_id1: sender_id,
        user_id2: receiver_id,
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
    let chat_id = await fetchPrivateChat(sender_id, receiver_id);

    if(!chat_id) {
        chat_id = await createPrivateChat(sender_id, receiver_id); 
    }
    
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
    
}