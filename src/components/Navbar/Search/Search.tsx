import styles from "./Search.module.css";
import Image from "next/image";
import { useState, useContext, SyntheticEvent, useRef, Dispatch, SetStateAction, FormEvent } from "react";
import { SearchContext } from "@/contexts/SearchContext";
import Router from "next/router";

const Search = () => {
  const [text, setText] : [string, Dispatch<SetStateAction<string>>] = useState<string>("");

  // searchText
  const { setSearchText } = useContext(SearchContext);

  const handleSearch = () => {
    if(!setSearchText)
      throw new Error('Unable to set search text: setSearchText dispatch is not defined');

    if (text === "") setSearchText(null);
    else setSearchText(text);
    Router.push("/feed");
  };

  const handleChange = (e : FormEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);
  };

  return (
    <div className={styles.searchWrapper}>
      <div className={styles.inputWrapper}>
        <input
          value={text}
          placeholder="Search for questions"
          className={styles.searchField}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        ></input>
        <Image
          src="/images/magnifier.png"
          alt="search-icon"
          width={30}
          height={30}
          className={styles.searchIcon}
          onClick={handleSearch}
        ></Image>
      </div>
    </div>
  );
};

export default Search;
