import { render } from "preact";
import { LocationProvider, Router, Route } from "preact-iso";

import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";
import { Home } from "./pages/Home/index.jsx";
import { SignIn } from "./pages/SignIn.jsx";
import { SignUp } from "./pages/SignUp.jsx";
import { Profile } from "./pages/Profile.jsx";
import { NotFound } from "./pages/_404.jsx";
import { EditPassword } from "./pages/EditPassword.jsx";
import "./styles.css";

export function App() {
  return (
    <LocationProvider>
      <Header />
      <main>
        <Router>
          <Route path="/" component={Home} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/profile" component={Profile} />
          <Route default component={NotFound} />
		  <Route path="/password/change" component={EditPassword} />
        </Router>
      </main>
      <Footer />
    </LocationProvider>
  );
}

const appRoot = document.getElementById("app");
if (!appRoot) {
  throw new Error('Root element with id "app" not found.');
}

render(<App />, appRoot);
