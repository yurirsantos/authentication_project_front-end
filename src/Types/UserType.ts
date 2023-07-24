import { ContactType } from "./ContactType"

export type UserType = {
  id?: string
  name: string
  email: string
  password?: string
  acceptTerm: boolean
  receiveOffers: boolean
  contact: ContactType;
  status?: boolean;
}
