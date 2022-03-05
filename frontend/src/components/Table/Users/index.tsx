interface UserData {
  id: string;
  name: string;
  email: string;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Props {
  tableName: string;
  usersList: Array<UserData>;
}

const TableUsers: React.FC<Props> = ({ tableName, usersList }) => {
  return (
    <div>
      <h1>{tableName}</h1>
      <table border="1">
        <thead>
          <tr>
            <td>ID</td>
            <td>Nome</td>
            <td>Usuário</td>
            <td>E-mail</td>
            <td>Senha</td>
            <td>Criado Em</td>
            <td>Atualizado EM</td>
          </tr>
        </thead>
        <tbody>
          {usersList.length > 0 ? (
            usersList.map(user => (
              <tr>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>[Hidden]</td>
                <td>{user.createdAt}</td>
                <td>{user.updatedAt}</td>
              </tr>
            ))
          ) : (
            <h4>Sem usuários para listas</h4>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableUsers;
