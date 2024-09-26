import "./index.css";
import Card from "./Components/Card";
import { useState, useEffect } from "react";
function App() {
  const TODO = "Todo";
  const IN_PROGRESS = "In progress";
  const BACKLOG = "Backlog";
  const [cards, setCards] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.quicksell.co/v1/internal/frontend-assignment"
        );
        const data = await response.json();
        // console.log(data);
        setCards(data.tickets); // Save tickets from the API response to state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  console.log(cards);
  /*
  *Priority levels: (This values you will receive in the api)**
  4 - Urgent
  3 - High
  2 - Medium
  1 - Low
  0 - No priority
  */
  // Status - todo, in progress, backlogs
  const todo = cards.filter((card) => card.status === TODO);
  const inProgress = cards.filter((card) => card.status === IN_PROGRESS);
  const backlogs = cards.filter((card) => card.status === BACKLOG);

  return (
    <div className="flex divide-y">
      <div className="flex-1">
        <h1 className="text-4xl font-bold p-2 text-gray-500">Todo</h1>
        {todo.map((card) => (
          <Card
            title={card.title}
            id={card.id}
            points={card.points}
            tag={card.tag}
            status={card.status}
            userId={card.userId}
            priority={card.priority}
          />
        ))}
      </div>
      <div className="flex-1">
        <h1 className="text-4xl font-bold p-2 text-gray-500 ">In Progress</h1>
        {inProgress.map((card) => (
          <Card
            title={card.title}
            id={card.id}
            points={card.points}
            tag={card.tag}
            status={card.status}
            userId={card.userId}
            priority={card.priority}
          />
        ))}
      </div>
      <div className="flex-1">
        <h1 className="text-4xl font-bold p-2 text-gray-500">Backlogs</h1>
        {backlogs.map((card) => (
          <Card
            title={card.title}
            id={card.id}
            points={card.points}
            tag={card.tag}
            status={card.status}
            userId={card.userId}
            priority={card.priority}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
