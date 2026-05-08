import { useNavigate } from "react-router-dom";

interface UserCardProps {
  id: string;
  name: string;
}

export default function UserCard({
  id,
  name,
}: UserCardProps) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center py-4">
      <div className="flex items-center gap-3">
        <div className="rounded-full h-10 w-10 bg-slate-200 flex items-center justify-center">
          {name[0].toUpperCase()}
        </div>

        <span className="font-medium">
          {name}
        </span>
      </div>

      <button
        onClick={() =>
          navigate(`/send?id=${id}&name=${name}`)
        }
        className="bg-black text-white px-4 py-2 rounded-lg"
      >
        Send
      </button>
    </div>
  );
}