import { useEffect, useState } from "react";
import "./App.css";
import MainContant from "./Component/MainContant";
import { Container } from "@mui/material";
import { light } from "@mui/material/styles/createPalette";

function App() {
  const [mode, setMode] = useState(
    localStorage.getItem("activemode") ?? "dark"
  );
  useEffect(() => {
    if (mode === "light") {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    }
  }, [mode]);
  return (
    <>
      <button
        style={{
          margin: " 5px auto",
          display: "flex",
          border: "none",
          outline: "none",
        }}
        onClick={() => {
          localStorage.setItem(
            "currentmode",
            mode == "dark" ? "light" : "dark"
          );
          setMode(localStorage.getItem("currentmode"));
        }}
      >
        {mode == "light" ? <span>Light</span> : <span>Dark</span>}
      </button>

      <div
        style={{
          width: "100vw",
          display: "flex",
          justifyContent: "center",
        }}
        className=""
      >
        <Container maxWidth="xl">
          <MainContant />
        </Container>
      </div>
    </>
  );
}

export default App;
