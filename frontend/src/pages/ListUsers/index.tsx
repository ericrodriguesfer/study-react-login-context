import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TableUsers from '../../components/Table/Users';
import api from '../../services/api';

interface UserData {
  id: string;
  name: string;
  email: string;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const ListUsers: React.FC = () => {
  const [users, setUsers] = useState<Array<UserData>>([]);

  useEffect(() => {
    async function listAllUsers() {
      const response = await api.get('/users');

      setUsers(response.data);
    }

    listAllUsers();
  }, []);

  return (
    <div>
      <TableUsers tableName="Lista de usuários" usersList={users} />
      <Link to="/">Volta a home</Link>
    </div>
  );
};

export default ListUsers;
