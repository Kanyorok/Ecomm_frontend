import React from "react";

const Badge = ({ text }) => {
  return (
    <div className="bg-[#af8965] rounded-full hover:bg-[#424027] w-[92px] h-[35px] text-white flex justify-center items-center text-base font-semibold duration-300 cursor-pointer">
      {text}
    </div>
  );
};

export default Badge;
