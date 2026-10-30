import { createSlice } from "@reduxjs/toolkit";

interface SubjectsState {
  subjects: string[];
}
const initialState: SubjectsState = {
  subjects: [],
};
const subjectsSlice = createSlice({
  name: "subjectsSlice",
  initialState,
  reducers: {
    setSubjects: (state, action) => {
      const isExist = state.subjects.find((itm) => itm === action.payload);

      if (state.subjects.length === 0) {
        state.subjects.push(action.payload);
      } else {
        if (!isExist) {
          state.subjects.push(action.payload);
        }
      }
    },
    removeSubject: (state, action) => {
      state.subjects = state.subjects.filter((sub) => sub !== action.payload);
    },
  },
});

export const { setSubjects, removeSubject } = subjectsSlice.actions;

export default subjectsSlice.reducer;
