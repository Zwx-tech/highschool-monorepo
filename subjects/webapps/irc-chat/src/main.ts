import { EmoJQuery, MessageData, NewMessagesResponse } from '../types/types';
import './style.css'
import moment from 'moment'

// element refs 
const messageFormRef: HTMLFormElement = document.querySelector('.message-input')!;
const messageInputRef: HTMLInputElement = document.querySelector('.message-input>input')!;
const chatDivRef: HTMLDivElement = document.querySelector('.chat')!;

// env var
const env = import.meta.env;

// program specific stuff
const userObject = {
    name: prompt("What's your username") || 'Anonymous',
    color: generateRandomHSLColor()
};
let lastMessageId = 1;
console.log(userObject.name);

function generateRandomHSLColor() {
    return `hsl(${Math.floor(Math.random() * 360)}, 70%, 78%)`;
}

function addMessage(data: MessageData) {
    if(data.author === "__system_info__") {
        addSystemMessage(data.content);
        return;
    }
    const messageRef = document.createElement('div');
    messageRef.className = `message ${data.author === userObject.name ? 'self' : ''}`;
    messageRef.innerHTML = `<div class="message__author" style="color: ${data.color};">${data.author}</div>
        <div class="message__content">${data.content}</div>
        <div class="message__date">${moment(data.date).format("HH:mm:ss")}</div>`;
    chatDivRef.appendChild(messageRef);
    ($('.message__content') as EmoJQuery).emoticonize();
}

function addSystemMessage(content: string) {
    const messageRef = document.createElement('div');
    messageRef.className = `system-message`;
    messageRef.innerText = content;
    chatDivRef.appendChild(messageRef);
}
async function sendSystemMessage(content: string) {
    await fetch(`https://${env.VITE_API_ENDPOINT}/index.php`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            author: "__system_info__",
            color: "system",
            content: content
        })
    });
}

messageFormRef?.addEventListener('submit', e => {
    e.preventDefault();
    const messageContent = messageInputRef.value;
    messageInputRef.value = '';
    console.log(messageContent);
    sendMessage(userObject, messageContent);
})

async function sendMessage(userObj: { name: string; color: string }, messageContent: string) {
    if(messageContent.startsWith("/color")){
        const deg = messageContent.split(" ")[1];
        userObj.color = `hsl(${deg}, 70%, 78%)`;
        sendSystemMessage(`${userObj.name}'s color has been changed to ${userObj.color}`);
        return;
    }
    if(messageContent.startsWith("/nick")){
        const name = messageContent.replace("/nick ", "");
        sendSystemMessage(`${userObj.name}'s name has been changed to ${name}`);
        userObj.name = name;
        return;
    }
    if(messageContent.startsWith("/clear")){
        chatDivRef.innerHTML = "";
        addSystemMessage(`Cleared chat`);
        return;
    }
    if(messageContent.startsWith("/help")){
        addSystemMessage(`LIST OF ALL COMMANDS\n/clear - Clears the chat\n/nick <name> - Changes your name\n/color <deg> - Changes your color\n/coin - flips a coin \n/help - list of all commands`);
        return;
    }
    if(messageContent.startsWith("/coin")){
        // flips a coin
        sendSystemMessage(`${userObj.name} has flipped a coin! It landed on ${Math.random() < 0.5? "heads" : "tails"}!`);
        return;
    }

    await fetch(`https://${env.VITE_API_ENDPOINT}/index.php`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            author: userObj.name,
            color: userObj.color,
            content: messageContent
        })
    });
}

async function startReq() {
    const response = await fetch(`https://${env.VITE_API_ENDPOINT}/index.php?lastMessageId=-1`);

    if (response.ok) {
        let data: { highestMessageId: number } = await response.json();
        lastMessageId = data.highestMessageId || 0;
    }

    fetchMessages();
}

async function fetchMessages() {
    try {
        const response = await fetch(`https://${env.VITE_API_ENDPOINT}/index.php?lastMessageId=${lastMessageId}`);
        if (!response.ok) {
            throw new Error("Request went wrong");
        }
        const data: NewMessagesResponse = await response.json();
        await data.newMessages.forEach(message => {
            addMessage({
                id: message.id,
                author: message.author,
                content: message.content,
                color: message.color,
                date: message.date
            });
        });
        lastMessageId = data.highestMessageId;
        fetchMessages();
        return;
    }
    catch {
        // try again after one sec
        setTimeout(() => fetchMessages(), 1000);
    }
}
async function test() {
    const response = await fetch('https://v-irc.vercel.app/api/index.php')!;
    console.log(await response.json());
}
addSystemMessage(`LIST OF ALL COMMANDS\n/clear - Clears the chat\n/nick <name> - Changes your name\n/color <deg> - Changes your color\n/coin - flips a coin \n/help - list of all commands`);
startReq();


test();