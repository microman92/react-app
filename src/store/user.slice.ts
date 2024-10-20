// PayloadAction является дженериком, вы можете указать любой тип данных для payload, будь то строка, число, объект и т.д.
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loadState } from './storage';
import axios, { AxiosError } from 'axios';
import { AuthResponse } from '@/interfaces/auth.interface';
import { PREFIX } from '@/helpers/API';
import { Profile } from '@/interfaces/user.inteface';
import { RootState } from './store';
// import { LoginForm } from '@/pages/Login/Login';



export const JWT_STATE = 'userData';

export interface userPersistentState {
    jwt: string | null
}
export interface userState {
    jwt: string | null;
    loginState?: string;
    registerError?: string;
    profile?: Profile;
}



const initialState: userState = {
    jwt: loadState<userPersistentState>(JWT_STATE)?.jwt ?? null
};

export const login = createAsyncThunk('user/login',
    async (params: { email: string, password: string }) => {
        try {
            const { data } = await axios.post<AuthResponse>(`${PREFIX}/auth/login`, {
                email: params.email,
                password: params.password
            });
            return data;
        } catch (e) {
            console.log(e);

            if (e instanceof AxiosError) {
                throw new Error(e.response?.data.message);
            }
        }
    });

export const register = createAsyncThunk('user/register',
    async (params: { email: string, password: string, name: string }) => {
        try {
            const { data } = await axios.post<AuthResponse>(`${PREFIX}/auth/register`, {
                email: params.email,
                password: params.password,
                name: params.name
            });
            return data;
        } catch (e) {
            console.log(e);

            if (e instanceof AxiosError) {
                throw new Error(e.response?.data.message);
            }
        }


    });

export const getProfile = createAsyncThunk<Profile, void, { state: RootState }>('user/getProfile',
    async (_, thunkApi) => {
        const jwt = thunkApi.getState().user.jwt;
        const { data } = await axios.get<Profile>(`${PREFIX}/user/profile`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        }
        );
        return data;
    }
);




export const userSlice = createSlice({

    /* название */
    name: 'user',

    /* Хранилище */
    initialState,

    /* функции для изменения состояния */
    reducers: {

        /* без extraReducers */
        // addJwt: (state, action: PayloadAction<string>) => {
        //     state.jwt = action.payload;

        // },

        logOut: (state) => {
            state.jwt = null;
        },
        clearError: (state) => {
            state.loginState = undefined;
        },
        clearRegisterError: (state) => {
            state.registerError = undefined;
        }

    },
    // Используются для обработки действий, созданных за пределами слайса,
    //  например, асинхронных действий, таких как createAsyncThunk.
    extraReducers: (builder) => {

        /* Запустится если функция login будет fulfilled */
        builder.addCase(login.fulfilled, (state, action) => {
            if (!action.payload) {
                return;
            }
            state.jwt = action.payload.access_token;
        });

        builder.addCase(login.rejected, (state, action) => {
            state.loginState = action.error.message;
        });

        builder.addCase(getProfile.fulfilled, (state, action) => {
            state.profile = action.payload;

        });

        builder.addCase(register.fulfilled, (state, action) => {
            if (!action.payload) {
                return;
            }
            state.jwt = action.payload.access_token;
        });

        builder.addCase(register.rejected, (state, action) => {
            state.registerError = action.error.message;
        });

    }
});

/* Это отправляются все actions в компоненты */
export const userActions = userSlice.actions;
export default userSlice.reducer;




