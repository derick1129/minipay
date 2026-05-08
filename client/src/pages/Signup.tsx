import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/axios";
import AuthCard from "../components/auth/AuthCard";
import Heading from "../components/auth/Heading";
import SubHeading from "../components/auth/SubHeading";
import InputBox from "../components/auth/InputBox";
import Button from "../components/auth/Button";
import BottomWarning from "../components/auth/BottomWarning";

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleSignup() {
    try {
      const response = await api.post("/user/signup", {
        firstName,
        lastName,
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
        <Heading label="Sign Up" />

        <SubHeading label="Create your account" />

        <InputBox
          label="First Name"
          placeholder="John"
          value={firstName}
          onChange={setFirstName}
        />

        <InputBox
          label="Last Name"
          placeholder="Doe"
          value={lastName}
          onChange={setLastName}
        />

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

        <Button label="Sign Up" onClick={handleSignup} />

        <BottomWarning
          label="Already have an account?"
          buttonText="Sign in"
          to="/signin"
        />
      </AuthCard>
    </div>
  );
}
