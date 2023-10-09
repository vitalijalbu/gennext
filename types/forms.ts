export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  state: string;
  message?: string;
}

export interface ContactFormServerData extends ContactFormData {
  token: string;
}
