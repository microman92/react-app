import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface cartItem {
    id: number
    count: number
}

export interface cartState {
    items: cartItem[]
}

const initialState: cartState = {
    items: []
};


export const cartSlice = createSlice({
    name: 'Cart',
    initialState,
    reducers: {
        remove: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(i => i.id !== action.payload);
        },

        decrease: (state, action: PayloadAction<number>) => {
            const existed = state.items.find(e => e.id === action.payload);

            if (!existed) {
                return;
            }

            if (existed.count === 1) {
                state.items = state.items.filter(i => i.id !== action.payload);
            } else {

                state.items.map(i => {
                    if (i.id === action.payload) {
                        i.count -= 1;
                    }
                    return i;
                });
                return;
            }

        },

        increase: (state, action: PayloadAction<number>) => {
            const existed = state.items.find(e => e.id === action.payload);

            if (!existed) {
                state.items.push({ id: action.payload, count: 1 });
                return;
            }

            state.items.map(i => {
                if (i.id === action.payload) {
                    i.count += 1;
                }
                return i;
            });

        },
        clearCart(state) {
            state.items = [];
        }
    }
});



export default cartSlice.reducer;
export const cartActions = cartSlice.actions;