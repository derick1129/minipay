import { useState } from "react";
import api from "../lib/axios";
import { useNavigate } from "react-router-dom";
import AuthCard from "../components/auth/AuthCard";
import Heading from "../components/auth/Heading";
import SubHeading from "../components/auth/SubHeading";
import InputBox from "../components/auth/InputBox";
import Button from "../components/auth/Button";
import BottomWarning from "../components/auth/BottomWarning";

export default function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  async function handleSignin() {
    try {
      const response = await api.post("/user/signup", {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Signup Failed");
    }
  }
  return (
    <div className="h-screen bg-slate-200 flex justify-center items-center">
      <AuthCard>
        <Heading label="Sign In" />

        <SubHeading label="Enter your credentials" />

        <InputBox
          label="Email"
          placeholder="john@example.com"
          value={username}
          onChange={setUsername}
        />

        <InputBox
          label="Password"
          placeholder="••••••••"
          type="password"
          value={password}
          onChange={setPassword}
        />

        <Button label="Sign In" onClick={handleSignin} />

        <BottomWarning
          label="Don't have an account?"
          buttonText="Sign up"
          to="/signup"
        />
      </AuthCard>
    </div>
  );
}
