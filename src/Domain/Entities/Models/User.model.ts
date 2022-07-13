import Base from './Base.model';

interface User extends Base {
  name: string;
  email: string;
  password: string;
}

export default User;
