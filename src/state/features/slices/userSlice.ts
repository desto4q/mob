import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface userTypes {
  role:string;
  token:string;
  isLoggedIn: boolean;
  userData:[];
  mode:'light' | 'dark' | '';

}

const initialState: userTypes = {
  role:'',
  token:'',
  userData:[],
  isLoggedIn:false,
  mode:'',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

    setRole: (state, action: PayloadAction<string>) => {
      state.role = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setLoggedIn: (state) => {
      state.isLoggedIn = true;
    },
    setLogout: (state) => {
      state.isLoggedIn = false;
      state.token = ''
    },
    toggleMode: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.mode = action.payload;
    },
    // add more cases here...
   
  },
})


export const {setRole, setToken, setLoggedIn, toggleMode, setLogout } = userSlice.actions

export default userSlice.reducer