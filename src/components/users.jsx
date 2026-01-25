import React, { use, useState } from "react";
import { Link } from "react-router";

const Users = ({ userPromise }) => {
  const initialUsers = use(userPromise);
  console.log(initialUsers);
  const [users, setUsers] = useState(initialUsers);
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const newUser = { name, email };
    console.log(newUser);

    // set user to database
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("after adding to db", data);

        if (data.insertedId) {
          alert("User added successfully");
          const newUsers = [...users, newUser];
          setUsers(newUsers);
        }
      });
  };
  const handleDelete = (id) => {
    // delete user from database
    console.log("delete user", id);
    fetch(`http://localhost:3000/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount) {
          const remainingUsers = users.filter((user) => user._id !== id);
          setUsers(remainingUsers);
          console.log("after delete", data);
        }
      });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Username" />
        <br />
        <input type="email" name="email" placeholder="Email" />
        <br />
        <button type="submit">Add User</button>
      </form>
      <h2>Users List:</h2>
      {users.map((user) => (
        <p key={user._id}>
          {user.name} - {user.email}
          <Link to={`/users/${user._id}`}>Details</Link>
          <br />
          <Link to={`/users/${user._id}/edit`}>Edit</Link>
          <button onClick={() => handleDelete(user._id)}>delete</button>
        </p>
      ))}
    </div>
  );
};

export default Users;
