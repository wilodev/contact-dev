type GlobalStateProps = {
  user: { users: UserProps[]; loading: boolean; error: string };
};
type PaginationProps = {
  page: number;
  totalPerPages: number;
};

type ResponseServer = {
  count: number;
  perPage: number;
  currentPage: number;
  totalPages: number;
  results: Array<UserProps>;
};

type Inputs = {
  id?: string | any;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

type ResponseCreate = {
  status: number;
  results: object | UserProps;
};

type InitialState = {
  users: UsersProps[];
  count: number;
  perPage: number;
  currentPage: number;
  totalPages: number;
  error: string;
  loading: boolean;
};
