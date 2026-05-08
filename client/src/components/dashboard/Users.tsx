import { useEffect, useState } from "react";
import api from "../../lib/axios";
import UserCard from "./UserCard";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
}

export default function Users() {
  const [filter, setFilter] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await api.get(
          `/user/bulk?filter=${filter}`
        );

        setUsers(response.data.users);
      } catch (error) {
        console.error(error);
      }
    }

    fetchUsers();
  }, [filter]);

  return (
    <div className="px-6 mt-6">
      <h2 className="text-xl font-bold mb-4">
        Users
      </h2>

      <input
        type="text"
        placeholder="Search users..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full px-3 py-2 border rounded-lg"
      />

      <div className="mt-4">
        {users.map((user) => (
          <UserCard
            key={user._id}
            id={user._id}
            name={`${user.firstName} ${user.lastName}`}
          />
        ))}
      </div>
    </div>
  );
}