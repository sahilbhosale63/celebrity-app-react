import { Accordian } from "./Components/Accordian";
import ListData from "./data/celebrities.json";
import "./CelebrityList.scss";
import React, { useEffect } from "react";

export const CelebrityList = () => {
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [query, setQuery] = React.useState<string>("");
  const [data, setData] = React.useState(ListData);
  const [allowAccOpen, setAllowAccOpen] = React.useState(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      if (!allowAccOpen) setExpanded(isExpanded ? panel : false);
    };

  const handleInputChange = (event: any) => {
    setQuery(event.target.value);
  };

  const deleteCelebrity = (user: any) => {
    const updatedList = data.filter((item) => item.email !== user.email);
    setData(updatedList);
  };

  useEffect(() => {
    const filteredUsers = ListData.filter(
      (item) =>
        item.first.toLowerCase().match(query.toLowerCase()) ||
        item.last.toLowerCase().match(query.toLowerCase())
    );
    setData(filteredUsers);
  }, [query]);

  return (
    <div className="celebrity-list-main">
      <input
        className="search-users"
        placeholder="Search for user"
        onChange={handleInputChange}
      />
      {data.map((list) => (
        <Accordian
          key={list.email}
          item={list}
          handleChange={handleChange}
          expanded={expanded}
          setAllowAccOpen={setAllowAccOpen}
          deleteCelebrity={deleteCelebrity}
        />
      ))}
    </div>
  );
};
