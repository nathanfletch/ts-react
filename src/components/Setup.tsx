import React, { useState, useReducer } from "react";

interface FormValues {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
}

//back button - nope
//enter - form submits
//left arrow - go back
//"save" a form?
//validation
//required
//auto focus
//error message for required inputs
//2 inputs: first/last

export default function Setup() {
  const [step, setStep] = useState(1);

  const reducer = (state: FormValues, updatedValues: Partial<FormValues>) => {
    return { ...state, ...updatedValues };
  };
  const [properties, dispatch] = useReducer(reducer, {
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
  });
  const { email, firstName, lastName, phone } = properties;

  // useEffect(() => {

  // }, [email]);

  // useEffect(() => {
  //   window.addEventListener("keydown", arrowHandler);
  //   // Remove event listeners on cleanup
  //   return () => {
  //     window.removeEventListener("keydown", arrowHandler);
  //   };
  // }, []);

  // const arrowHandler = (e) => {
  //   console.log(e);
  // };

  const previous = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const next = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const createAccount = () => {
    console.log("call api here");
  };

  const emailForm = (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        next();
      }}
    >
      <label>
        Email
        <input
          autoFocus
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={email}
          onChange={(e) => dispatch({ email: e.target.value })}
          type="email"
        />
      </label>
      <button
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 mt-3"
        type="submit"
      >
        Next
      </button>
    </form>
  );

  const nameForm = (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        next();
      }}
      className="mb-4"
    >
      <label>
        {`First Name${firstName ? "" : "*"}`}
        <input
          autoFocus
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={firstName}
          onChange={(e) => dispatch({ firstName: e.target.value })}
          type="text"
          required
        />
      </label>
      <label>
        Last Name
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={lastName}
          onChange={(e) => dispatch({ lastName: e.target.value })}
          type="text"
        />
      </label>
      <div className="flex justify-between mt-3">
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
          onClick={() => previous()}
        >
          Previous
        </button>
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
          type="submit"
        >
          Next
        </button>
      </div>
    </form>
  );

  const phoneForm = (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        next();
      }}
      className="mb-4"
    >
      <label>
        Phone
        <input
          autoFocus
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={phone}
          onChange={(e) => dispatch({ phone: e.target.value })}
          type="text"
        />
      </label>
      <div className="flex justify-between mt-3">
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
          onClick={() => previous()}
        >
          Previous
        </button>
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
          type="submit"
        >
          Next
        </button>
      </div>
    </form>
  );

  const confirmScreen = (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createAccount();
      }}
    >
      <h2>Please confirm your details</h2>
      <h3>{`Email: ${email}`}</h3>
      <h3>{`First Name: ${firstName}`}</h3>
      <h3>{`Last Name: ${lastName}`}</h3>
      <h3>{`Phone: ${phone}`}</h3>

      <div className="flex justify-between mt-3">
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
          onClick={() => previous()}
        >
          Previous
        </button>
        <button
          className={`bg-blue-500 text-white font-bold py-2 px-4 rounded${
            Object.values(properties).every((v) => v.length > 0)
              ? " hover:bg-blue-700"
              : " opacity-50 cursor-not-allowed"
          }`}
          type="submit"
        >
          Create Account
        </button>
      </div>
    </form>
  );

  return (
    <div className="w-full max-w-xs">
      <h1>Account Setup</h1>
      <h2>{`Step ${step}`}</h2>
      <div className="bg-white shadow-md rounded p-6">
        {step === 1
          ? emailForm
          : step === 2
          ? nameForm
          : step === 3
          ? phoneForm
          : confirmScreen}
      </div>
    </div>
  );
}

// <div className="flex justify-between">
//   <button
//     className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
//     onClick={() => previous()}
//   >
//     Previous
//   </button>
//   <button
//     className={`bg-blue-500 text-white font-bold py-2 px-4 rounded${
//       step >= 4 ? " opacity-50 cursor-not-allowed" : " hover:bg-blue-700"
//     }`}
//     disabled={step >= 4}
//     onClick={() => next()}
//   >
//     Next
//   </button>
// </div>
