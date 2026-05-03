interface HeadingProps {
  label: string;
}

export default function Heading({ label }: HeadingProps) {
  return <h1 className="text-3xl font-bold text-center pt-6">{label}</h1>;
}
