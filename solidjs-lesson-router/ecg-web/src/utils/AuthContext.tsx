import {
  createContext,
  useContext,
  ParentComponent,
  Signal,
  createSignal,
  Accessor,
} from "solid-js";
import { Store, createStore, produce } from "solid-js/store";
import { User, defaultUser } from "../types/User";

// type AuthContextType = [
//   user: Accessor<User | null>;
//   sign_in: () => void;
//   sign_out: () => void;
// };

const AuthContext = createContext();

export const AuthProvider: ParentComponent = (props) => {
  const [user, setUser] = createSignal(null);

  const context = [
    user,
    {
      sign_in() {
        setUser(produce((user) => (user = defaultUser)));
      },
      sign_out() {
        setUser({});
      },
    },
  ];

  return (
    <AuthContext.Provider value={context}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
