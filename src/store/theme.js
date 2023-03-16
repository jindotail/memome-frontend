import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  themeColor: {
    startColor: "#dfe8ff",
    middleColor: "#f3c6f1",
    endColor: "#ffcfd1",
  },
  commentColor: {
    startColor: "#eb93f7",
    endColor: "#d398fd",
  }
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setThemeColor(state, action) {
            const {startColor, middleColor, endColor} = action.payload;

            state.themeColor.startColor = startColor;
            state.themeColor.middleColor = middleColor;
            state.themeColor.endColor = endColor;
        },

        setCommentColor(state, action) {
            const {startColor, endColor} = action.payload;

            state.commentColor.startColor = startColor;
            state.commentColor.endColor = endColor;
        }
    },
});

export const themeActions = themeSlice.actions;
export default themeSlice.reducer;
