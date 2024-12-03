interface ICreateUserDTO {
  name: string;
  RA: string;
  email: string;
  password: string;
  id?: string;
  is_admin?: boolean;
}

export { ICreateUserDTO };
