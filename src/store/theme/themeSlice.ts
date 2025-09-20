import { createSlice } from "@reduxjs/toolkit"
import { getFromLocalStorage, setLocalStorage } from "../../utils/storage"

type initialStateProps = {
    isThemeToggled: boolean
}

const initialState: initialStateProps = {
    isThemeToggled: getFromLocalStorage('theme').isThemeToggled
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.isThemeToggled = !state.isThemeToggled
            setLocalStorage('theme', {"isThemeToggled": state.isThemeToggled})
        }
    }
})

export const {toggleTheme } = themeSlice.actions

export default themeSlice.reducer

