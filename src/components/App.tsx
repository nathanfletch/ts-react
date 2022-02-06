import React, { useState } from "react";
import Wizard from "./Setup";

// interface Greetings: {
//   "Hello" | "Goodbye"
// }
interface AudienceProps {
  audience: string;
}
function Greeting({ audience }: AudienceProps) {
  const [message, setMessage] = useState<"Hello" | "Goodbye">("Hello");

  return (
    <button
      onClick={() => setMessage(message === "Goodbye" ? "Hello" : "Goodbye")}
    >
      {message} {audience}
    </button>
  );
}

function App() {
  return (
    <div className="App">
      <Greeting audience="World" />
      <Wizard />
    </div>
  );
}

export default App;
