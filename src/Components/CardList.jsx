import React from "react";
import Card from "./Card";
import add from "../assets/add.svg";
import Dot3Menu from "../assets/Dot3Menu.svg";
import noPriority from "../assets/noPriority.svg";
import lowPriority from "../assets/lowPriority.svg";
import mediumPriority from "../assets/mediumPriority.svg";
import highPriority from "../assets/highPriority.svg";
import urgentPriority from "../assets/urgentPriorityColour.svg";
import toDo from "../assets/toDo.svg";
import inProgress from "../assets/in-progress.svg";
import backlog from "../assets/backlog.svg";

import { TODO, INPROGRESS, BACKLOGS } from "../constants";

const CardList = ({ cards, users, groupBy, sortBy }) => {
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
    INPROGRESS: (
      <div className="flex gap-2">
        <img src={inProgress} alt="In Progress" /> INPROGRESS
      </div>
    ),
    TODO: (
      <div className="flex gap-2">
        <img src={toDo} alt="Todo" /> TODO
      </div>
    ),
    BACKLOGS: (
      <div className="flex gap-2">
        <img src={backlog} alt="Backlogs" /> BACKLOGS
      </div>
    ),
  };

  const Circle = ({ letter }) => {
    return <div className="user-avatar">{letter}</div>;
  };

  const groupedCards = groupCards();

  return (
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
  );
};

export default CardList;
