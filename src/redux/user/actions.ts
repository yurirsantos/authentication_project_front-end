import { UserType } from "@/types/UserType";
import ActionsUserType from "./actionTypes";
import { TypeUserType } from "@/types/TypeUserType";
import { RestaurantType } from "@/types/RestaurantType";

export const loginUser = (payload: UserType, token: string, typeUser: TypeUserType, restaurant?: RestaurantType) => ({
  type: ActionsUserType.LOGIN,
  payload: payload,
  token: token,
  typeUser: typeUser,
  restaurant: restaurant,
})