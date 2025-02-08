interface ICreateVolunteerDTO {
  id?: string;
  user_id: string;
  name?: string;
  RA?: string;
  start_date: Date;
  end_date: Date | null;
  status: boolean;
  certificate_url: string;
}

export { ICreateVolunteerDTO };
