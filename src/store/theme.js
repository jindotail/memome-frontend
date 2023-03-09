import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    themeColor: {
        startColor: undefined,
        middleColor: undefined,
        endColor: undefined
    }
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        resetTransactionForm(state, action) {
          const {startColor, middleColor, endColor} = action.payload;
          
          state.themeColor.startColor = startColor;
          state.themeColor.middleColor = middleColor;
          state.themeColor.endColor = endColor;
        }
    },
});

export const themeActions = themeSlice.actions;
export default themeSlice.reducer;
