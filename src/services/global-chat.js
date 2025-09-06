import supabase from '../services/supabase';

export async function saveGlobalChatMessage(data) {    
}

export async function subscribeToGlobalChatNewMessages(callback) {    
}

//  //setea un "listener" para recibir los msjs emitidos en tiempo real
//  const globalChatChannel = supabase.channel('global-chat', {
//     config: {
//         broadcast: { self: true }, // esto es para que reciba los mensajes que yo misma mando
//     }
//  }); 

//  export async function saveGlobalChatMessage(data) {
//     const res = await globalChatChannel.send({
//         type: 'broadcast',
//         event: 'new-message',
//         payload: {
//             ...data,
//         }
//     });
//  }
//  export async function subscribeToGlobalChatNewMessages(callback) {
//       //definimos que se escuche el evento de emisión "new-message"
//       globalChatChannel.on(
//         'broadcast',
//         {
//             event: 'new-message'
//         },
//         data => {
//             console.log("data recibida en tiempo real:", data);
//             //invocamos el callback que recibimos como argumento de la función.
//             callback(data.payload);
//         } //el callback para cada mensaje recibido
//     ); 
//     //nos suscribimos al canal
//     globalChatChannel.subscribe();

//  }