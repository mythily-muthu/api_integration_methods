import { EditableText } from "@blueprintjs/core";
import axios from "axios";
import React, { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");

  let url = "https://jsonplaceholder.typicode.com/users";

  const getAllUsers = async () => {
    let res = await axios.get(url);
    setUsers(res.data);
    // console.log(":", res.data);
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  const addUser = async () => {
    try {
      // step 1 : create a obj with those to be sent in the req
      const userData = {
        name,
        email,
        website,
      };

      // step 2 : make an axios post req (url , datas)
      let res = await axios.post(url, userData);
      console.log("current users:", users);

      // setUsers([...users, res.data]);
      setUsers((prevUsers) => [...prevUsers, res.data]);
      console.log("user added :", res.data);
      await getAllUsers();
      console.log("updated users:", users);

      // step 3 : clear the input fields
      setName("");
      setEmail("");
      setWebsite("");
    } catch (error) {
      // step 4 : handle errors
      console.log("error in adding user:", error);
    }
  };

  return (
    <div className=" flex w-screen px-10 py-10 h-full mx-auto ">
      <table className="w-full border border-gray-800 ">
        <thead className="bg-orange-600 text-white">
          <tr>
            <th className="flex px-5 py-5">ID</th>
            <th>USERNAME</th>
            <th>EMAIL</th>
            <th>WEBSITE</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody className="w-full">
          {users.map((user) => (
            <tr key={user.id} className="text-center border-b">
              <td className="py-5">{user.id}</td>
              <td>{user.username}</td>
              <td>
                <EditableText value={user.email} />
              </td>
              <td>
                <EditableText value={user.website} />
              </td>
              <td className="">
                <button className="mr-3 bg-blue-500 text-white py-1 px-2 rounded-md text-sm cursor-pointer">
                  UPDATE
                </button>
                <button className="mr-3 bg-red-500 text-white p-1 px-2 rounded-md text-sm cursor-pointer">
                  DELETE
                </button>
              </td>
            </tr>
          ))}
        </tbody>

        <tfoot className="">
          <tr className="py-5 w-full p-1 ">
            <td></td>
            <td>
              <input
                className="border-2 border-orange-700 p-2 w-[300px]"
                placeholder="Enter name... "
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </td>
            <td>
              {" "}
              <input
                placeholder="Enter email... "
                className="border-2 border-orange-700  p-2 w-[310px]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </td>
            <td>
              {" "}
              <input
                placeholder="Enter website..."
                className="border-2 border-orange-700  p-2 w-[300px]"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </td>
            <td>
              <button
                className="bg-green-600 py-1 px-3 rounded-md text-white"
                onClick={addUser}
              >
                Add user
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
export default App;
