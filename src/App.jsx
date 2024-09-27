import { useEffect, useState, useRef } from "react";
import "./App.css";
import CardList from "./Components/CardList";
import fetchCardsData from "../src/Api.js";
import display from "./assets/display.svg";

function App() {
  const [cards, setCards] = useState([]);
  const [users, setUsers] = useState([]); // State for users
  const [groupBy, setGroupBy] = useState(
    localStorage.getItem("groupBy") || "status"
  );
  const [sortBy, setSortBy] = useState(
    localStorage.getItem("sortBy") || "priority"
  );
  const [showDropdown, setShowDropdown] = useState(false); // State to control dropdown visibility
  const dropdownRef = useRef(null); // Ref for the dropdown

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  useEffect(() => {
    const fetchCards = async () => {
      const data = await fetchCardsData();
      setCards(data.tickets);
      setUsers(data.users);
    };
    fetchCards();
  }, []);

  useEffect(() => {
    localStorage.setItem("groupBy", groupBy);
    localStorage.setItem("sortBy", sortBy);
  }, [groupBy, sortBy]);

  const Circle = ({ letter }) => {
    return <div className="user-avatar">{letter}</div>;
  };

  return (
    <div className="content-wrapper">
      <nav className="main-nav flex-container justify-between items-center">
        <div className="dropdown-container" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setShowDropdown(!showDropdown)}
            className="dropdown-button"
          >
            <img src={display} className="margin-right-small" />
            Display
          </button>
          {showDropdown && (
            <div className="dropdown-menu">
              <div className="dropdown-content">
                <div
                  className="text-small flex-container gap-small"
                  style={{ marginTop: "0.2rem", marginBottom: "0.2rem" }}
                >
                  <span className="font-semibold">Grouping:</span>
                  <select
                    value={groupBy}
                    onChange={(e) => setGroupBy(e.target.value)}
                    className="form-select"
                  >
                    <option value="status">Status</option>
                    <option value="user">User</option>
                    <option value="priority">Priority</option>
                  </select>
                </div>
                <div
                  className="text-small flex-container gap-small"
                  style={{ marginTop: "0.2rem", marginBottom: "0.2rem" }}
                >
                  <span className="font-semibold">Sorting:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="form-select"
                  >
                    <option value="priority">Priority</option>
                    <option value="title">Title</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
        <h1 className="text-white text-large font-bold">QuickSell</h1>
        <div>
          <h2 className="text-white text-large">
            <span>
              Grouping by {groupBy.toUpperCase()} | Sorting by{" "}
              {sortBy.toUpperCase()}
            </span>
          </h2>
        </div>
      </nav>
      <CardList cards={cards} users={users} groupBy={groupBy} sortBy={sortBy} />
    </div>
  );
}

export default App;
