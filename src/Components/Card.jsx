import noPriority from "../assets/noPriority.svg";
import lowPriority from "../assets/lowPriority.svg";
import mediumPriority from "../assets/mediumPriority.svg";
import highPriority from "../assets/highPriority.svg";
import urgentPriority from "../assets/urgentPriorityColour.svg";
import toDo from "../assets/toDo.svg";
import inProgress from "../assets/in-progress.svg";
import backlog from "../assets/backlog.svg";

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
    <div className="border rounded-lg px-2 m-2 bg-gray-100">
      <div className="flex flex-col justify-between">
        <div className="flex justify-between mt-2">
          <div className="text-sm text-gray-500 font-semibold">{id}</div>
          <div className="w-8 h-8 bg-gray-300 text-white flex items-center justify-center rounded-full">
            {userName ? userName.charAt(4) : userId.charAt(4)}{" "}
            {/* Display first character of userName or userId */}
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center">
            {status === "Todo" && <img src={toDo} alt="Urgent" />}
            {status === "Backlog" && <img src={backlog} alt="High" />}
            {status === "In progress" && <img src={inProgress} alt="Medium" />}
          </div>
          <div className="text-sm font-semibold">{title}</div>
        </div>
      </div>
      <div className="flex justify-start py-2 text-sm">
        <div>{points}</div>
        <div className="mx-2 py-1 border border-gray-300 rounded p-1">
          {priority === 4 && <img src={urgentPriority} alt="Urgent" />}
          {priority === 3 && <img src={highPriority} alt="High" />}
          {priority === 2 && <img src={mediumPriority} alt="Medium" />}
          {priority === 1 && <img src={lowPriority} alt="Urgent" />}
          {priority === 0 && <img src={noPriority} alt="No priority" />}
        </div>
        <div className="flex items-center border border-gray-300 rounded p-1 ml-2">
          <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
          <div className="text-gray-500">{tag}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
