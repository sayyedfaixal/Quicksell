import { useEffect, useState, useRef } from "react";
import "./index.css";
import Card from "./Components/Card";
import noPriority from "./assets/noPriority.svg";
import lowPriority from "./assets/lowPriority.svg";
import mediumPriority from "./assets/mediumPriority.svg";
import highPriority from "./assets/highPriority.svg";
import urgentPriority from "./assets/urgentPriorityColour.svg";
import add from "./assets/add.svg";
import Dot3Menu from "./assets/Dot3Menu.svg";
import toDo from "./assets/toDo.svg";
import inProgress from "./assets/in-progress.svg";
import backlog from "./assets/backlog.svg";
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
          key = card.priority; // Group by Priority
          break;
        default:
          key = card.status; // Group by Status
      }

      if (!groups[key]) {
        groups[key] = { cards: [], count: 0 }; // Initialize count
      }
      groups[key].cards.push(card);
      groups[key].count += 1; // Increment count
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
  const Circle = ({ letter }) => {
    return (
      <div className="w-8 h-8 flex items-center justify-center bg-gray-400 text-white rounded-full mr-2">
        {letter}
      </div>
    );
  };

  // Priority mapping
  const priorityLabels = {
    4: (
      <div className="flex gap-2">
        <img src={urgentPriority} alt="Urgent" /> Urgent
      </div>
    ),
    3: (
      <div className="flex gap-2">
        <img src={highPriority} alt="High" /> High
      </div>
    ),
    2: (
      <div className="flex gap-2">
        <img src={mediumPriority} alt="Medium" /> Medium
      </div>
    ),
    1: (
      <div className="flex gap-2">
        <img src={lowPriority} alt="Low Priority" /> Low
      </div>
    ),
    0: (
      <div className="flex gap-2">
        <img src={noPriority} alt="No priority" /> No priority
      </div>
    ),
  };

  const statusLabels = {
    "In progress": (
      <div className="flex gap-2">
        <img src={inProgress} alt="In Progress" /> In Progress
      </div>
    ),
    Todo: (
      <div className="flex gap-2">
        <img src={toDo} alt="Todo" /> Todo
      </div>
    ),
    Backlog: (
      <div className="flex gap-2">
        <img src={backlog} alt="Backlogs" /> Backlogs
      </div>
    ),
  };

  const groupedCards = groupCards();

  return (
    <div className="mx-4">
      {" "}
      {/* Parent div with margin on left and right */}
      <nav className="bg-gray-800 p-4 flex justify-between items-center">
        <div className="relative inline-block text-left" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setShowDropdown(!showDropdown)} // Toggle dropdown
            className="inline-flex items-center text-slate bg-white hover:bg-slate-700 hover:text-white focus:outline-none rounded-md px-4 py-2 ring-2 ring-blue"
          >
            <img src={display} className="mr-2" />
            Display
          </button>
          {showDropdown && (
            <div className="absolute left-5 mt-2 w-52 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div
                className="py-1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <div className="px-4 py-2 text-sm text-gray-700 flex gap-2">
                  <span className="font-semibold">Grouping:</span>
                  <select
                    value={groupBy}
                    onChange={(e) => setGroupBy(e.target.value)}
                    className="ml-2 p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="status">Status</option>
                    <option value="user">User</option>
                    <option value="priority">Priority</option>
                  </select>
                </div>
                <div className="px-4 py-2 text-sm text-gray-700 flex gap-2">
                  <span className="font-semibold">Sorting:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="ml-2 p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="priority">Priority</option>
                    <option value="title">Title</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
        <h1 className="text-white text-lg font-bold">QuickSell</h1>
        <div>
          <h2 className="text-white text-lg">
            <span>
              Grouping by {groupBy.toUpperCase()} | Sorting by{" "}
              {sortBy.toUpperCase()}
            </span>
          </h2>
        </div>
      </nav>
      <div className="flex mt-4">
        {Object.entries(groupedCards).map(([key, { cards, count }]) => (
          <div key={key} className="flex-1">
            <div className="flex justify-between mr-2">
              <h2 className="font-semibold ml-2 flex items-center">
                {groupBy === "user" ? (
                  <>
                    <Circle
                      letter={users
                        .find((user) => user.id === key)
                        ?.name.charAt(0)}
                    />{" "}
                    {/* Adding the profile icon as the first letter inside the circle */}
                    {users.find((user) => user.id === key)?.name || key}
                    <span className="ml-1">({count})</span>{" "}
                    {/* Display count */}
                  </>
                ) : groupBy === "priority" ? (
                  <>
                    {priorityLabels[key]}
                    <span className="ml-1">({count})</span>
                    {/* Display count */}
                  </>
                ) : groupBy === "status" ? (
                  <>
                    {statusLabels[key]} <span className="ml-1">({count})</span>{" "}
                    {/* Display count */}
                  </>
                ) : (
                  <span className="ml-1">({count})</span> // Display count for other cases
                )}
              </h2>
              <div className="flex justify-end gap-2">
                <img
                  src={add}
                  style={{ width: "16px", height: "24px" }}
                  alt="Add"
                />
                <img
                  src={Dot3Menu}
                  style={{ width: "16px", height: "24px" }}
                  alt="Medium"
                />
              </div>
            </div>

            {sortCards(cards).map((card) => (
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
