import UserType from "@/types/UserType";
import { makeVar, ReactiveVar } from "@apollo/client";

export const user : ReactiveVar<UserType | null> = makeVar(typeof(window) !== "undefined" && window.localStorage.getItem('currentuser') ? JSON.parse(window.localStorage.getItem('currentuser') as string) : null);