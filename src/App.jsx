import { useEffect, useState, useRef } from "react";
import "./App.css";

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
    return <div className="user-avatar">{letter}</div>;
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
      <div className="flex-container margin-top-medium">
        {Object.entries(groupedCards).map(([key, { cards, count }]) => (
          <div key={key} className="flex-grow">
            <div className="flex-container justify-between margin-right-small">
              <h3 className="font-semibold margin-left-small flex-container items-center">
                {groupBy === "user" ? (
                  <>
                    <Circle
                      letter={users
                        .find((user) => user.id === key)
                        ?.name.charAt(0)}
                    />
                    {users.find((user) => user.id === key)?.name || key}
                    <span style={{ fontSize: "1rem", marginLeft: "0.5rem" }}>
                      ({count})
                    </span>
                  </>
                ) : groupBy === "priority" ? (
                  <>
                    {priorityLabels[key]}
                    <span style={{ fontSize: "1rem", marginLeft: "0.5rem" }}>
                      ({count})
                    </span>
                  </>
                ) : groupBy === "status" ? (
                  <>
                    {statusLabels[key]}{" "}
                    <span style={{ fontSize: "1rem", marginLeft: "0.5rem" }}>
                      ({count})
                    </span>
                  </>
                ) : (
                  <span style={{ fontSize: "1rem", marginLeft: "0.5rem" }}>
                    ({count})
                  </span>
                )}
              </h3>
              <div className="flex-container justify-end gap-small items-center">
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
