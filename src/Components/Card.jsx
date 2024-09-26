const Card = ({ title, id, points, priority, tag, userId, status }) => {
  return (
    /**
     * {
            "id": "CAM-1",
            "title": "Update User Profile Page UI",
            "tag": [
                "Feature request"
            ],
            "userId": "usr-1",
            "status": "Todo",
            "priority": 4
        },
         */

    <div className="border rounded-lg px-2 m-2 bg-gray-100">
      <div className="flex flex-col justify-between">
        <div className="flex justify-between mt-2">
          <div className="text-sm text-gray-500 font-semibold">{id}</div>
          <div className="w-8 h-8 bg-gray-300 text-white flex items-center justify-center rounded-full">
            u{userId.charAt(4)} {/* Display the first character of userId */}
          </div>
        </div>
        <div className="text-sm font-semibold">{title}</div>
      </div>
      <div className="flex justify-start py-2 text-sm">
        <div>{points}</div>
        <div className="mx-2 py-1">
          {priority === 4 && <span>🚨 Urgent</span>}
          {priority === 3 && <span>🔥 High</span>}
          {priority === 2 && <span>⚠️ Medium</span>}
          {priority === 1 && <span>🔽 Low</span>}
          {priority === 0 && <span>🔓 No priority</span>}
        </div>
        <div className="flex items-center border border-gray-300 rounded p-1 ml-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
          <div className="text-gray-500">{tag}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
