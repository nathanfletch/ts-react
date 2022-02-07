import React, { useState, useReducer } from "react";

interface User {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export default function Setup() {
  const [step, setStep] = useState(1);

  const reducer = (state: User, updatedValues: Partial<User>) => {
    return { ...state, ...updatedValues };
  };
  const [properties, dispatch] = useReducer(reducer, {
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
  });
  const { email, firstName, lastName, phone } = properties;

  const hasRequired = (() => {
    const requiredOnly = { ...properties };
    delete requiredOnly.phone;
    return Object.values(requiredOnly).every((v) => v.length > 0);
  })();

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

  // const handleArrowKey = (e: KeyboardEvent) => {
  //   if (e.key !== "ArrowLeft" || "ArrowRight") {
  //     return;
  //   } else {
  //     if (e.key === "ArrowLeft") {
  //       previous();
  //     } else {
  //       next();
  //     }
  //   }
  // };

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
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          autoFocus
          onFocus={(e) => e.currentTarget.select()}
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
          onFocus={(e) => e.currentTarget.select()}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={firstName}
          onChange={(e) => dispatch({ firstName: e.target.value })}
          type="text"
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
      <div className="flex justify-between mt-3 flex-row-reverse">
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
          type="submit"
        >
          Next
        </button>
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
          onClick={() => {
            previous();
          }}
        >
          Previous
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
          onFocus={(e) => e.currentTarget.select()}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={phone}
          onChange={(e) => dispatch({ phone: e.target.value })}
          type="text"
        />
      </label>
      <div className="flex justify-between mt-3 flex-row-reverse">
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
          type="submit"
        >
          Next
        </button>
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
          onClick={() => previous()}
        >
          Previous
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

      <div className="flex justify-between mt-3 flex-row-reverse">
        <button
          className={`bg-blue-500 text-white font-bold py-2 px-4 rounded${
            hasRequired
              ? " hover:bg-blue-700"
              : " opacity-50 cursor-not-allowed"
          }`}
          type="submit"
        >
          Create Account
        </button>
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
          onClick={() => previous()}
        >
          Previous
        </button>
      </div>
    </form>
  );

  return (
    <div className="w-full max-w-xs">
      <h1>Account Setup</h1>
      <div className="flex justify-around">
        <div onClick={() => setStep(1)}>Email</div>
        <div onClick={() => setStep(2)}>Name</div>
        <div onClick={() => setStep(3)}>Phone</div>
        <div onClick={() => setStep(4)}>Confirm</div>
      </div>
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
