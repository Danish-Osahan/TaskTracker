import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    tasks: [],
  },
  reducers: {
    taskAdded(state, action) {
      state.tasks.push({
        id: action.payload.id,
        title: action.payload.title,
        description: action.payload.description,
       completed: false
      });
      state.tasks.reverse();
    },
    deleteAllTasks(state) {
      state.tasks.length = 0;
    },
    toggleTasks(state,action){
      const task = state.tasks.find(t=>t.id === action.payload)
      if(task){
        task.completed=!task.completed;
      }
    }
  },
});

export const { taskAdded, deleteAllTasks,toggleTasks } = todoSlice.actions;
export default todoSlice.reducer;
