import ThemeType from "@/types/ThemeType";
import { makeVar, ReactiveVar, useReactiveVar } from "@apollo/client";
import { diamondPearlTheme } from "@/data/themes";

const defaultTheme : ThemeType = diamondPearlTheme;

export const theme : ReactiveVar<ThemeType> = makeVar(typeof(window) !== "undefined" && window.localStorage.getItem('theme') ? JSON.parse(window.localStorage.getItem('theme') as string) : defaultTheme);