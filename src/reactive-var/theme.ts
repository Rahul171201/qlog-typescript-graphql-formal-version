import ThemeType from "@/types/ThemeType";
import { makeVar, ReactiveVar} from "@apollo/client";

const defaultTheme : ThemeType= 'light';

export const theme = makeVar(typeof(window) !== "undefined" && window.localStorage.getItem('theme') ? window.localStorage.getItem('theme') : defaultTheme);