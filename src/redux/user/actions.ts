import { UserType } from "@/Types/UserType";
import ActionsUserType from "./actionTypes";

export const loginUser = (payload: UserType, token: string) => ({
  type: ActionsUserType.LOGIN,
  payload: payload,
  token: token,
})