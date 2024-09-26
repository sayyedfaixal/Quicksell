import "./index.css";
import Card from "./Components/Card";
import { useEffect, useState } from "react";

function App() {
  const [cards, setCards] = useState([]);
  const [groupBy, setGroupBy] = useState(
    localStorage.getItem("groupBy") || "status"
  ); // Load from localStorage
  const [sortBy, setSortBy] = useState(
    localStorage.getItem("sortBy") || "priority"
  ); // Load from localStorage

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch(
          "https://api.quicksell.co/v1/internal/frontend-assignment"
        );
        const data = await response.json();
        setCards(data.tickets);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };
    fetchCards();
  }, []);

  // Save the current grouping and sorting to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("groupBy", groupBy);
    localStorage.setItem("sortBy", sortBy);
  }, [groupBy, sortBy]);

  // Grouping function
  const groupCards = () => {
    return cards.reduce((groups, card) => {
      let key;

      switch (groupBy) {
        case "user":
          key = card.userId;
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

  // Sorting function
  const sortCards = (cardsToSort) => {
    const sortedCards = [...cardsToSort];

    sortedCards.sort((a, b) => {
      switch (sortBy) {
        case "priority":
          return b.priority - a.priority; // Descending order
        case "title":
          return a.title.localeCompare(b.title); // Ascending order
        default:
          return 0; // No sorting
      }
    });

    return sortedCards;
  };

  const groupedCards = groupCards();

  return (
    <div>
      <h1 className="text-2xl font-bold text-center">
        QuickSell | Kanban Board
      </h1>

      <div className="flex justify-evenly mt-4">
        <label className="font-semibold">
          Group By:
          <select value={groupBy} onChange={(e) => setGroupBy(e.target.value)}>
            <option value="status">Status</option>
            <option value="user">User</option>
            <option value="priority">Priority</option>
          </select>
        </label>

        <label className="font-semibold">
          Sort By:
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </select>
        </label>
      </div>

      <div className="flex divide-y mt-4">
        {Object.entries(groupedCards).map(([key, group]) => (
          <div key={key} className="flex-1">
            <h2 className="font-semibold ml-2">{key}</h2>
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
