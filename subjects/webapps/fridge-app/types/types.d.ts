export type APIData = {
    fridge: FridgeData,
    cards: CardData[]
}

export type CardData = {
    id: number,
    fridge_id: number,
    content: string,
    width: number,
    height: number,
    z_index: number,
    top_pos: number,
    left_pos: number
} 

export type FridgeData = {
    id: number,
    name: string,
    card_count: number
}