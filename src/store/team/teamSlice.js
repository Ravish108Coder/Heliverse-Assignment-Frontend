import { createSlice } from '@reduxjs/toolkit';

export const teamSlice = createSlice({
    name: 'team',
    initialState: [],
    reducers: {
        addTeam: (state, action) => {
            const ateam = state.find((team) => team.domain === action.payload.domain)
            if(ateam) {
             alert('choose team with different domain')
             return state
            }
            state.push(action.payload);
        },      
        removeTeam: (state, action) => {
            return state.filter((team) => team.id !== action.payload.id);
        },
        resetTeam: (state) => {
            return []
        }
    },  
});

export const { addTeam, removeTeam, resetTeam } = teamSlice.actions;
export default teamSlice.reducer;