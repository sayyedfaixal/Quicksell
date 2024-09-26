import { useEffect, useState, useRef } from "react";
import "./index.css";
import Card from "./Components/Card";

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

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch(
          "https://api.quicksell.co/v1/internal/frontend-assignment"
        );
        const data = await response.json();
        setCards(data.tickets);
        setUsers(data.users); // Set users from the API response
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };
    fetchCards();
  }, []);

  useEffect(() => {
    localStorage.setItem("groupBy", groupBy);
    localStorage.setItem("sortBy", sortBy);
  }, [groupBy, sortBy]);

  const groupCards = () => {
    return cards.reduce((groups, card) => {
      let key;
      switch (groupBy) {
        case "user":
          key = card.userId; // Group by userId
          break;
        case "priority":
          key = card.priority;
          break;
        default:
          key = card.status;
      }

      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(card);
      return groups;
    }, {});
  };

  const sortCards = (cardsToSort) => {
    return [...cardsToSort].sort(
      (a, b) =>
        sortBy === "priority"
          ? b.priority - a.priority // Descending order
          : sortBy === "title"
          ? a.title.localeCompare(b.title) // Ascending order
          : 0 // No sorting
    );
  };

  const groupedCards = groupCards();

  return (
    <div className="mx-4">
      {" "}
      {/* Parent div with margin on left and right */}
      <nav className="bg-gray-800 p-4 flex justify-between items-center">
        <h1 className="text-white text-lg font-bold">QuickSell</h1>
        <div>
          <h2 className="text-white text-lg">
            <span>
              Grouping by {groupBy.toUpperCase()} | Sorting by{" "}
              {sortBy.toUpperCase()}
            </span>
          </h2>
        </div>
        <div className="relative inline-block text-left" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setShowDropdown(!showDropdown)} // Toggle dropdown
            className="inline-flex items-center text-white bg-gray-700 hover:bg-gray-600 focus:outline-none rounded-md px-4 py-2"
          >
            Display
          </button>

          {showDropdown && (
            <div className="absolute right-0 z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div
                className="py-1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <div className="px-4 py-2 text-sm text-gray-700">
                  <span className="font-semibold">Grouping:</span>
                  <select
                    value={groupBy}
                    onChange={(e) => setGroupBy(e.target.value)}
                    className="ml-2 p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="status">Group By Status</option>
                    <option value="user">Group By User</option>
                    <option value="priority">Group By Priority</option>
                  </select>
                </div>
                <div className="px-4 py-2 text-sm text-gray-700">
                  <span className="font-semibold">Sorting:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="ml-2 p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="priority">Sort By Priority</option>
                    <option value="title">Sort By Title</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
      <div className="flex mt-4">
        {Object.entries(groupedCards).map(([key, group]) => (
          <div key={key} className="flex-1">
            <h2 className="font-semibold ml-2">
              {groupBy === "user"
                ? users.find((user) => user.id === key)?.name || key
                : key}{" "}
              {/* Conditional rendering */}
            </h2>
            {sortCards(group).map((card) => (
              <Card
                key={card.id}
                title={card.title}
                id={card.id}
                points={card.points}
                tag={card.tag}
                status={card.status}
                userId={card.userId}
                userName={card.userName}
                priority={card.priority}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
