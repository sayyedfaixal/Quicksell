import noPriority from "../assets/noPriority.svg";
import lowPriority from "../assets/lowPriority.svg";
import mediumPriority from "../assets/mediumPriority.svg";
import highPriority from "../assets/highPriority.svg";
import urgentPriority from "../assets/urgentPriorityColour.svg";
import toDo from "../assets/toDo.svg";
import inProgress from "../assets/in-progress.svg";
import backlog from "../assets/backlog.svg";
import "./Card.css";

const Card = ({
  title,
  id,
  points,
  priority,
  tag,
  userId,
  status,
  userName,
}) => {
  return (
    <div className="card-container">
      <div className="card-content">
        <div className="card-header">
          <div className="card-id">{id}</div>
          <div className="user-avatar">
            {userName ? userName.charAt(4) : userId.charAt(4)}
          </div>
        </div>
        <div className="status-title-wrapper">
          <div className="status-icon">
            {status === "Todo" && <img src={toDo} alt="ToDo" />}
            {status === "Backlog" && <img src={backlog} alt="Backlog" />}
            {status === "In progress" && (
              <img src={inProgress} alt="In Progress" />
            )}
          </div>
          <div className="card-title">{title}</div>
        </div>
      </div>
      <div className="card-details">
        <div className="card-points">{points}</div>
        <div className="priority-wrapper">
          {priority === 4 && <img src={urgentPriority} alt="Urgent" />}
          {priority === 3 && <img src={highPriority} alt="High" />}
          {priority === 2 && <img src={mediumPriority} alt="Medium" />}
          {priority === 1 && <img src={lowPriority} alt="Low" />}
          {priority === 0 && <img src={noPriority} alt="No Priority" />}
        </div>
        <div className="tag-wrapper">
          <div className="tag-color"></div>
          <div className="tag-text">{tag}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
