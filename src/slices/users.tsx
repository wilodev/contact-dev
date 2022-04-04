import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HttpPut } from "../utils/Http";

const initialState = {
  users: [],
  count: 0,
  perPage: 0,
  currentPage: 0,
  totalPages: 0,
  error: "",
  loading: false,
};

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (data: PaginationProps, { dispatch }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}contacts?perPage=${data.totalPerPages}&page=${data.page}`
      );
      const users = await response.json();
      dispatch(setUsers(users.results));
      dispatch(setPagination(users));
    } catch (error) {
      return false;
    }
  }
);

export const fetchUpdateUser = createAsyncThunk(
  "users/fetchUpdateUser",
  async (data: Inputs, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(""));
      const responseServer: any = await HttpPut(data?.id, data);
      if (responseServer.status === 200) {
        dispatch(setUpdateUser(responseServer.results));
      } else {
        dispatch(setError(responseServer?.results.message));
      }
      dispatch(setLoading(false));
    } catch (error) {
      return false;
    }
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setPagination: (state, action) => {
      state.count = action.payload.count;
      state.perPage = action.payload.perPage;
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
    },
    setUser: (state, action) => {
      state.users.push(action.payload);
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setRemoveUser: (state, action) => {
      state.users = state.users.filter(
        (user: UserProps) => user.id !== action.payload
      );
    },
    setUpdateUser: (state, action) => {
      // Update user state
      state.users = state.users.map((user: UserProps) => {
        if (user.id === action.payload.id) {
          return action.payload;
        }
        return user;
      });
    },
  },
});

export const {
  setUsers,
  setPagination,
  setUser,
  setError,
  setLoading,
  setRemoveUser,
  setUpdateUser,
} = usersSlice.actions;
export default usersSlice.reducer;
