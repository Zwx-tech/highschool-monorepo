export type MessageData = {
    id: number;
    author: string;
    content: string;
    color: string;
    date: string;
}

export interface NewMessagesResponse {
    newMessages: Message[];
    highestMessageId: number;
}

export interface SendMessageResponse {
    status: string;
    type: string;
    response: string;
}

// jquery and css-emoticons fix
export interface EmoJQuery<TElement = HTMLElement> extends JQuery<TElement> {
    emoticonize(): void;
}