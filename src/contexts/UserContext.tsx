import {
	createContext,
	Dispatch,
	ReactElement,
	SetStateAction,
	useState,
} from "react";
import UserType from "@/types/UserType";

type UserContextType = {
	user: UserType | null;
	setUser: Dispatch<SetStateAction<UserType | null>> | null;
} ;

export const UserContext = createContext<UserContextType>({user: null, setUser: null});

const UserContextProvider = ({ children }: { children: ReactElement }) => {
	const [user, setUser] = useState<UserType | null>(null);

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
};

export default UserContextProvider;
