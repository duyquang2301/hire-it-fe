import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "../services/userService";

export const get_information = createAsyncThunk(
  "users/get_information",
  async (_, { rejectWithValue }) => {
    try {
      const res = await userService.get_information();
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue("Access denied! Please try again.");
    }
  }
);
const initialState = {
  isLoading: false,
  file: null,
  user_infor: null,
  is_active: false,
  candidates: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers(builder) {
    builder.addCase(get_information.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(get_information.rejected, (state, action) => {
      state.isLoading = false;
      state.user_infor = null;
      state.file = null;
    });
    builder.addCase(get_information.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user_infor = action.payload;
      state.file = action.payload.pdf_file;
    });
  },
});
export const selectIsLoading = (state) => state.user.isLoading;
export const selectIsActive = (state) => state.user.is_active;
export const selectUserInfo = (state) => state.user.user_infor;
export const selectCandidates = (state) => state.user.candidates;
export const selectFile = (state) => state.user.file;
export default userSlice.reducer;
