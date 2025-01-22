import video1 from "../assets/video1.mp4";
import video2 from "../assets/video2.mp4";
import video3 from "../assets/video3.mp4";

import { useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { useNavigate } from "react-router-dom";


const HeroSection = () => {
  const navigate = useNavigate();
  const [popupType, setPopupType] = useState(null);
  const [roomId, setRoomId] = useState("");
  const [generatedRoomId, setGeneratedRoomId] = useState("");

  // Handle "Create Room"
  const handleCreateRoom = () => {
    const newRoomId = uuidV4();
    setGeneratedRoomId(newRoomId);
    setPopupType("create");
  };

  // Handle "Join Room"
  const handleJoinRoom = () => {
    setPopupType("join");
  };

  return (
    <div className="flex flex-col items-center mt-6 lg:mt-20">
      <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide text-white">
        Real-time text editing 
        <span className="bg-gradient-to-r from-blue-500 to-blue-800 dark:from-blue-400 dark:to-blue-700 text-transparent bg-clip-text">
        {" "}
        for developers
        </span>
      </h1>
      <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl">
        "Collaborate effortlessly and transform your ideas into reality with our real-time text editor. Empower your creativity and streamline your workflow—start creating together today!"
      </p>
      <div className="flex justify-center my-10">
        <button className="bg-gradient-to-r from-blue-500 to-blue-700 py-3 px-4 mx-3 rounded-md text-white" onClick={handleCreateRoom}>
          Create Room
        </button>
        <button className="py-3 px-4 mx-3 rounded-md border text-white" onClick={handleJoinRoom}>
          Join Room
        </button>
      </div>
      <div className="flex mt-10 justify-center">
        <video
          autoPlay
          loop
          muted
          className="rounded-lg w-1/2 border border-blue-700 dark:border-blue-500 shadow-sm shadow-blue-400 dark:shadow-blue-600 mx-2 my-4">
          <source src={video1} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <video
          autoPlay
          loop
          muted
          className="rounded-lg w-1/2 border border-blue-700 dark:border-blue-500 shadow-sm shadow-blue-400 dark:shadow-blue-600 mx-2 my-4">
          <source src={video3} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      
      {popupType === "create" && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded shadow-lg text-center">
          <h2 className="text-xl font-bold mb-4">Room Created!</h2>
          <p className="mb-4">Room ID:</p>
          <div className="flex items-center justify-center mb-4">
            <input
              type="text"
              value={generatedRoomId}
              readOnly
              className="font-mono px-3 py-2 border rounded w-64 text-center"
            />
            <button className="ml-3 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={() => {
              navigator.clipboard.writeText(generatedRoomId);
              alert("Room ID copied to clipboard!");
              }}>
              Copy
            </button>
          </div>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => navigate(`/documents/${generatedRoomId}`)}>
            Go to Room
          </button>
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 ml-4"
            onClick={() => setPopupType(null)}>
            Close
          </button>
        </div>
      </div>
      )}


      {popupType === "join" && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded shadow-lg text-center">
        <h2 className="text-xl font-bold mb-4">Join a Room</h2>
        <input
          type="text"
          placeholder="Enter Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          className="border p-2 rounded w-full mb-4"
        />
        <button
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        onClick={() => {
          if (roomId.trim() === "") {
            alert("Please enter a valid Room ID!");
            return;
          }
          navigate(`/documents/${roomId}`);
        }}>
        Join Room
        </button>
        <button
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 ml-4"
          onClick={() => setPopupType(null)}>
          Close
        </button>
      </div>
    </div>
    )}


    </div>
  );
};

export default HeroSection;