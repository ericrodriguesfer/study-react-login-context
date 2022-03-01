import { ChakraProvider } from '@chakra-ui/react';

import { AuthProvider } from './contexts/auth';
import Routes from './routes';

function App() {
  return (
    // <ChakraProvider>
    <AuthProvider>
      <Routes />
    </AuthProvider>
    // </ChakraProvider>
  );
}

export default App;
