import "./tinyMC";
import "./style.css";
import { APIData } from "../types/types";
import { Fridge } from "./Fridge";

// env vars
const env = import.meta.env;
// element refs
const modalRef = document.querySelector('.modal');
const modalFormRef = document.querySelector('.modal>#boardSelectForm');

let currentFridge: Fridge | null;

async function fetchFridgeData(fridgeName: string): Promise<APIData | null> {
    try {
        const data = await fetch(`http://${env.VITE_ENDPOINT_URL}/fridge/index.php?fridgeName=${fridgeName}`);
        if(!data.ok) {
            throw new Error("")
        }
        const parsedData: APIData = await data.json();
        return parsedData;
    } catch(e) {
        console.log(`Something went wrong while fetching api data ${e}`);
        return null;
    }
    
}

// select board form submit event
modalFormRef?.addEventListener('submit', async (event) => {
    // check if event exists
    if(!event.target) return;
    // prevent site refresh
    await event.preventDefault();
    // get data from form
    const data = [...await new FormData(event.target as HTMLFormElement)];
    const fridgeName = `${data[0][1]}`;
    const fridgeData = await fetchFridgeData(fridgeName);
    console.log(fridgeData)
    // check if data was fetch successfully 
    if(fridgeData === null)
        return;
    currentFridge = Fridge.createFromApiData(fridgeData);
    console.log(currentFridge);
    modalRef?.setAttribute('style', 'opacity: 0;');
})