import React from "react";

const NameForm = ({ name, setName, handleSubmit }) => {
  return (
    <>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="outline-none w-full text-center py-3 font-bold text-xl bg-slate-700 text-slate-50"
        placeholder="Type Your Name Here"
      />
      <button
        className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-cyan-500 hover:to-blue-500 max-w-max rounded font-medium text-white"
        onClick={() => handleSubmit()}
      >
        Let's See
      </button>
    </>
  );
};

export default NameForm;
