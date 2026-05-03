interface subHeadProps {
    label: string;
}

export default function SubHeading({ label }: subHeadProps) {
  return (
    <p className="text-slate-500 text-center px-8 pt-2">
        {label}
    </p>
  )
}
