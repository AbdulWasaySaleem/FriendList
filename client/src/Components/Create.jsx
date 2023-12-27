import { useState, useEffect } from "react";
import Axios from "axios";

const Create = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [listOfFriends, setlistOfFriends] = useState([]);

  //Sending data through button
  const addFriend = () => {
    Axios.post("http://localhost:3001/addfriend", {
      name,
      age,
      description,
      image,
    })
      .then(() => {
        alert("added");
        // Refresh the list of friends after adding a friend
        fetchFriends();
        window.location.reload();
      })
      .catch(() => {
        console.log("Not added");
      });
  };

  //Grabbign all the data
  const fetchFriends = () => {
    Axios.get("http://localhost:3001/read")
      .then((response) => {
        setlistOfFriends(response.data);
      })
      .catch(() => {
        console.log("Error fetching friends");
      });
  };

  // Edit functionality
  const handleEdit = (id) => {
    const updatedName = prompt("Enter new name:");
    const updatedAge = prompt("Enter new age:");
    const updatedDescription = prompt("Enter new description:");
    const updatedImage = prompt("Enter Image URL");

    if (updatedName || updatedAge || updatedDescription || updatedImage) {
      const updatedData = {
        name: updatedName || undefined,
        age: updatedAge || undefined,
        description: updatedDescription || undefined,
        Image: updatedImage || undefined,
      };

      editFriend(id, updatedData);
    }
  };
  const editFriend = async (id, updatedData) => {
    try {
      await Axios.put(`http://localhost:3001/editfriend/${id}`, updatedData);
      alert("Friend updated successfully");
      // Refresh the list of friends after editing a friend || Refresh
      fetchFriends();
    } catch (error) {
      console.log("Error editing friend:", error);
    }
  };

  // Delete functionality
  const deleteFriend = async (id) => {
    try {
      await Axios.delete(`http://localhost:3001/deletefriend/${id}`);
      alert("Friend deleted successfully");
      // Refresh the list of friends after deleting a friend || REfresh
      fetchFriends();
    } catch (error) {
      console.log("Error deleting friend:", error);
    }
  };

  useEffect(() => {
    //REfresh page
    fetchFriends();
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:3001/read")
      .then((response) => {
        setlistOfFriends(response.data);
      })
      .catch(() => {
        console.log("Error");
      });
  }, []);

  return (
    <>
    <h1 className="text-4xl text-center text-gray-800 mb-2 font-bold">FriendLists App</h1>
      <div className="flex justify-center flex-col w-full border-2 rounded-md shadow-md">
        <div>
          <label className="text-gray-700 font-bold mb-2">Name</label>
          <input
            className="border-2 border-gray-300 rounded-md m-2 p-2 w-4/5 focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="Enter Friend Name..."
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div>
          <label className="text-gray-700 font-bold mb-2">Age</label>
          <input
            className="border-2 border-gray-300 rounded-md m-2 p-2 w-4/5 focus:outline-none focus:border-blue-500"
            type="Number"
            placeholder="Enter Friend Age..."
            onChange={(e) => {
              setAge(e.target.value);
            }}
          />
        </div>
        <div>
          <label className="text-gray-700 font-bold mb-2">Description</label>
          <input
            className="border-2 border-gray-300 rounded-md m-2 p-2 w-4/5 focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="Enter Friend Description...(optional)"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
        <div>
          <label className="text-gray-700 font-bold mb-2">Image</label>
          <input
            className="border-2 border-gray-300 rounded-md m-2 p-2 w-4/5 focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="Enter Friend Image...(optional)"
            onChange={(e) => {
              setImage(e.target.value);
            }}
          />
        </div>
        <button
          className=" text-lg font-semibold text-white py-1 px-4 border rounded-xl bg-blue-500 w-80 m-2 self-center hover:bg-blue-600"
          onClick={addFriend}
        >
          Add Friend
        </button>
      </div>

      <div className="bg-white border-2 p-4 flex flex-wrap gap-3 shadow-lg justify-center">
        {listOfFriends.map((friend, index) => (
          <div
            key={index}
            className="flex items-center gap-x-8 bg-gray-100 p-4 mb-4 rounded-md w-64 flex-col"
          >
            {/* Left Div with Image */}
            <div className="flex items-center w-40  h-40 ">
              <img
                className="rounded-full w-40 h-40 object-cover"
                src={friend.image}
                alt="avatar"
              />
            </div>

            {/* Right Div with Details, Edit, and Delete Buttons */}
            <div className="">
              <div className="border-slate-400 mt-6 mb-3 border-t-2 border-b-2">
                <p className="text-xl font-semibold mt-2">
                  Name: {friend.name}
                </p>
                <p className="text-xl font-semibold">Age: {friend.age}</p>
                <p className="text-gray-600 ">
                  description: {friend.description}
                </p>
              </div>
              <div className="flex justify-center gap-2">
                <button
                  className="text-white w-20 bg-blue-500 py-2 px-4 rounded-md hover:bg-blue-600"
                  onClick={() => handleEdit(friend._id)}
                >
                  Edit
                </button>
                <button
                  className="text-white w-20 bg-red-500 py-2 px-4 rounded-md hover:bg-red-600"
                  onClick={() => deleteFriend(friend._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Create;
