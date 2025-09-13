<script>
import { nextTick } from 'vue';
import AppH1 from '../components/AppH1.vue';
import { saveGlobalChatMessage, subscribeToGlobalChatNewMessages, loadLastGlobalChatMessages } from '../services/global-chat';

export default {
    name: 'GlobalChat',
    components: { AppH1, },

    data() {
        return {
            messages: [],
            newMessage: {
                email: '',
                body: '',
            }
        }
    }, 

    methods: {
       async sendMessage() {
        await saveGlobalChatMessage({
            email: this.newMessage.email,
            body: this.newMessage.body,
        });
            this.newMessage.body = "";
        }
    },
    async mounted() {
        //suscripción
        subscribeToGlobalChatNewMessages( async newMessageReceived => {
        this.messages.push(newMessageReceived);
        await nextTick(); //scroll hacia abajo, para que se muestren los último msjs
            this.$refs.chatContainer.scrollTop = this.$refs.chatContainer.scrollHeight; 
    });

        //traemos los mensajes iniciales
        try {
            this.messages = await loadLastGlobalChatMessages();
            await nextTick();
            this.$refs.chatContainer.scrollTop = this.$refs.chatContainer.scrollHeight;
        } catch (error) {
            //manejar el error!!
        }
    }

}
</script>

<template>
    <AppH1>Chat general</AppH1>

    <div class="flex gap-4">
        <section 
        ref="chatContainer"
        class="overflow-y-auto w-9/12 h-100 p-4 border border-blue-200 rounded">
            <h2 class="sr-only">Lista de mensajes</h2>

            <ul class="flex flex-col gap-4">
                <li
                    v-for="message in messages"
                    :key="message.id"
                    class="flex flex-col gap-0.5"
                >
                <div><b>{{ message.email }}</b> dijo:</div>
                <div>{{ message.body }}</div>
                <div class="text-sm text-gray-500 italic">{{ message.created_at }}</div>
                </li>
            </ul>
        </section>
        <section class="w-3/12">
            <h2 class="mb-4 text-xl">Enviar un mensaje</h2>
            <form action="#"
            @submit.prevent="() => sendMessage()"
            >
                <div class="mb-4">
                    <label for="email" class="block mb-1">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        class="w-full p-2 border border-blue-300 rounded"
                        v-model="newMessage.email"
                        >
                </div>
                <div class="mb-4">
                    <label for="body" class="block mb-1">Mensaje</label>
                    <textarea 
                        id="body" 
                        class="w-full p-2 border border-blue-300 rounded"
                        v-model="newMessage.body"
                        ></textarea>
                </div>
                <button type="submit" class="w-full transition px-4 py-2 rounded cursor-pointer bg-blue-600 hover:bg-blue-500 focus:bg-blue-500 active:bg-blue-700 text-white"
                >Enviar
                </button>
            </form>
        </section>
    </div>
</template>