import { BrowserRouter, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';

import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Route exact path="/" component={Home} />
        <Route path="/rooms/new" component={NewRoom} />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
