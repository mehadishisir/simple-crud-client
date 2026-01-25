import React, { use } from "react";
import { useLoaderData } from "react-router";

const editUser = () => {
  const user = useLoaderData();
  const handleEdit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const updatedUser = { name, email };
    console.log("updated user", updatedUser);
    // get updated user to database
    fetch(`http://localhost:3000/users/${user._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("after update", data);
        if (data.modifiedCount) {
          alert("User updated successfully");
        }
      });
  };
  return (
    <div>
      <form onSubmit={handleEdit}>
        <input
          type="text"
          name="name"
          placeholder="Username"
          defaultValue={user.name}
        />
        <br />
        <br />
        <input
          type="email"
          name="email"
          placeholder="Email"
          defaultValue={user.email}
        />
        <br />
        <button type="submit">Update User</button>
      </form>
    </div>
  );
};

export default editUser;
