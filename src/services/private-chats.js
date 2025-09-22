import supabase from "./supabase";

async function createPrivateChat(sender_id, receiver_id) {
    const { error } = await supabase
    .from('private_chats')
    .insert({
        user_id1: sender_id,
        user_id2: receiver_id,
    });
}

/**
 * 
 * @param {string} sender_id 
 * @param {string} receiver_id 
 * @param {string} body 
 */
export async function sendPrivateChatMessage(sender_id, receiver_id, body) {
    const chat_id = await createPrivateChat(sender_id, receiver_id); 

    const { error } = await supabase
    .from('private_messages')
    .insert({
        chat_id: null,
        sender_id,
        body,
    });
}

/**
 * 
 * @param {string} sender_id 
 * @param {string} receiver_id 
 * @param {() => {}} callback 
 */
export async function subscribeToPrivateChatNewMessages(sender_id, receiver_id, callback) {
    
}