import {
	createContext,
	ReactElement,
	useState,
	Dispatch,
	SetStateAction,
} from "react";

type SearchType = string | null;
type SearchContextType = {
	searchText: SearchType ;
	setSearchText?: Dispatch<SetStateAction<SearchType>> | null;
};

export const SearchContext = createContext<SearchContextType>({
	searchText: null,
	setSearchText: null
});

const SearchContextProvider = ({ children }: { children: ReactElement }) => {
	const [searchText, setSearchText] = useState<SearchType>(null);
	const value = { searchText, setSearchText };

	return (
		<SearchContext.Provider value={value}>{children}</SearchContext.Provider>
	);
};

export default SearchContextProvider;
