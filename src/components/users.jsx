import React from "react";

const Users = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const users = { name, email };
    console.log(users);
    e.target.reset();
    // set user to database
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(users),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("after adding to db", data);

        if (data.insertedId) {
          alert("User added successfully");
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
    </div>
  );
};

export default Users;
