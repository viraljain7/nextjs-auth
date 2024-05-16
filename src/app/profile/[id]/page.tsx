import React from "react";

const userProfilePage = ({ params }: any) => {
  return (
    <div className="flex  h-[100vh] bg-slate-400">
      <div
        className="flex flex-col border bg-black/40  rounded-xl
        justify-center items-center text-center text-white text-2xl w-[80vh] m-auto p-4"
      >
        <h1 className="m-4">User Profile Page {params.id} </h1>
      </div>
    </div>
  );
};

export default userProfilePage;
