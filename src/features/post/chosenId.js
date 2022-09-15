import { createSlice  } from "@reduxjs/toolkit";

const initialState = {
    isOpened: false,
    isConfirmed: false,
    isDeclined: false
  };
  
  const slice = createSlice({
    name: 'confirmationModal',
    initialState,
    reducers: {
      open: state => {
        state.isOpened = true;
        state.isDeclined = false;
        state.isConfirmed = false;
      },
      confirm: state => {
        state.isConfirmed = true;
        state.isOpened = false;
      },
      decline: state => {
        state.isDeclined = true;
        state.isOpened = false;
      }
    }
  })

  export default slice.reducer;
  
   


