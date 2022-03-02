import { AuthProvider } from './contexts/auth';
import Routes from './routes';
import GlobalStyle from './styles/global';

function App() {
  return (
    <AuthProvider>
      <GlobalStyle />
      <Routes />
    </AuthProvider>
  );
}

export default App;
