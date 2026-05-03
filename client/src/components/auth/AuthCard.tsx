import type { ReactNode } from "react";

interface IauthCard {
  children: ReactNode;
}

export default function AuthCard({ children }: IauthCard) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-96">
        {children}
    </div>
  );
}
