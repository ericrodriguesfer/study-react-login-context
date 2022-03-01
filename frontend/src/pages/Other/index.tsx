import { useAuth } from '../../contexts/auth';

const Other: React.FC = () => {
  const { user } = useAuth();

  return <h1>Other page {user?.email}</h1>;
};

export default Other;
