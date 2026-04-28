import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [open, setOpen] = useState(false);
  const [filterData, setFilterData] = useState([]);

  // Popop Open function

  const handlePopup = () => {
    setUser({ name: "", age: "", location: "" });
    setOpen(true);
  };

  // Popup Close Function

  const handleClosePopup = () => {
    setOpen(false);
  };

  //Get Api Call Function

  async function getData() {
    try {
      const data = await fetch(
        "Your Api",
      );
      const result = await data.json();
      setFilterData(result);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getData();
  }, []);

  //Add new user

  const [user, setUser] = useState({ name: "", age: "", location: "" });

  const handleNewUser = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  async function AddUser(e) {
    if (!user.id) {
      e.preventDefault();
      let response = await fetch(
        "Your Api",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        },
      );
      setOpen(false)
      getData();
    }
    else{
      let response = await fetch(
        `Your Api/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        },
      );

      setOpen(false)
      getData();

    }
  }

  //Update function

  const handleUpdate = (value) => {
    setOpen(true);
    setUser(value);
  };

  // Delete function

  async function handleDelete(id) {
    let response = await fetch(
      `Your Api/${id}`,
      {
        method: "DELETE",
      },
    );
    getData();
  }

  //Serach Function

  const handleSearch = (e) => {
    let searchUserdata = e.target.value.toLowerCase();

    if (searchUserdata) {
      let filteredData = filterData.filter((user) => {
        return (
          user.name.toLowerCase().includes(searchUserdata) ||
          user.location.toLowerCase().includes(searchUserdata)
        );
      });
      setFilterData(filteredData);
    } else {
      getData();
    }
  };

  return (
    <>
      {open && (
        <div className="popup">
          <div className="input-div">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Enter Your Name"
              id="name"
              name="name"
              value={user.name}
              onChange={handleNewUser}
            />
          </div>
          <div className="input-div">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              placeholder="Enter Your Number"
              id="age"
              name="age"
              value={user.age}
              onChange={handleNewUser}
            />
          </div>
          <div className="input-div">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              name="location"
              placeholder="Enter Your Location"
              id="location"
              value={user.location}
              onChange={handleNewUser}
            />
          </div>
          <button onClick={AddUser}>Add Data</button>
          <button onClick={handleClosePopup}>Close</button>
        </div>
      )}
      <div className="main-box">
        <div className="search-box">
          <input
            type="search"
            placeholder="Search Text..."
            onChange={handleSearch}
          />
          <button className="addbtn" onClick={handlePopup}>
            Add Record
          </button>
        </div>
        <div className="user-data">
          <table border="1">
            <thead>
              <tr>
                <td>S.No</td>
                <td>Name</td>
                <td>Age</td>
                <td>Location</td>
                <td>Edit</td>
                <td>Delete</td>
              </tr>
            </thead>
            <tbody>
              {filterData.map((value, index) => {
                return (
                  <tr key={value.id}>
                    <td>{index + 1}</td>
                    <td>{value.name}</td>
                    <td>{value.age}</td>
                    <td>{value.location}</td>
                    <td>
                      <button onClick={() => handleUpdate(value)}>Edit</button>
                    </td>
                    <td>
                      <button onClick={() => handleDelete(value.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
