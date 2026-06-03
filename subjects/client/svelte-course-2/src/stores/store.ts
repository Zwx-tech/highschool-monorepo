import type { Readable } from "svelte/motion";
import { writable, readable, type Writable } from "svelte/store";

export function getRandomArbitrary(min: number, max: number) {
    return Math.round(Math.random() * (max - min) + min);
  }

export const currentWord = writable("");
export const currentGuess = writable(0);
export const preferredColorScheme = writable('light');
export const prefersContrast = writable(false);
export const wordCheck = writable(false);
export const isHintActive = writable(false);
export const alphabet = 'qwertyuiopasdfghjklzxcvbnm';
export const inputLetters: Writable<string[][]> = writable([])
export const wordLength = writable(getRandomArbitrary(5, 9));

export const allWords: Writable<string[]> = writable([], (set) => {
    fetch('https://random-word-api.herokuapp.com/all')
        .then(res => res.json())  
        .then(data => set(data));  
});

export interface ILetterDict {
    [id: string]: number;
}


export const letterStatus = writable<ILetterDict>({}, (set) => {
    const result: ILetterDict = {};
    [...alphabet].forEach(l => {
        result[l] = 0;
    });
    set(result);
});

// const length = Math.floor(Math.random() * (9 - 4 + 1) + 4);

