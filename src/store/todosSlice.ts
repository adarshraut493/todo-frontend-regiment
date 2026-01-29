import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Todo {
  _id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  status: string;
}

interface TodosState {
  todos: Todo[];
  page: number;
  totalPages: number;
  loading: boolean;
}

const initialState: TodosState = {
  todos: [],
  page: 1,
  totalPages: 1,
  loading: false,
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<{ todos: Todo[]; totalPages: number }>) => {
      state.todos = action.payload.todos;
      state.totalPages = action.payload.totalPages;
      state.loading = false;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setTodos, setPage, setLoading } = todosSlice.actions;
export default todosSlice.reducer;
