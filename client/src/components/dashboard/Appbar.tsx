interface AppbarProps {
  name: string;
}

export default function Appbar({
  name,
}: AppbarProps) {
  return (
    <div className="shadow h-14 flex justify-between px-6 items-center bg-white">
      <div className="font-bold text-xl">
        Payments App
      </div>

      <div className="flex items-center gap-3">
        <span>Hello, {name}</span>

        <div className="rounded-full h-10 w-10 bg-slate-200 flex items-center justify-center">
          {name[0].toUpperCase()}
        </div>
      </div>
    </div>
  );
}