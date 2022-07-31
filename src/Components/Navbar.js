import {
  CgArrowsExchange,
  CgArrowsExchangeAltV,
  CgNotes,
  CgUser,
} from "react-icons/cg";

export default function Navbar() {
  return (
    <>
      <div className="w-screen fixed bottom-5 grid place-items-center">
        <div
          className="shadow-[0_0_25px_-5px_rgba(0,0,0,0.1)] rounded-3xl
        inline-flex flex-row gap-5 justify-center p-3 "
        >
          <div className="text-neutral-400 text-center text-5xl">
            <CgArrowsExchange />
          </div>
          <div className="text-neutral-400 text-center text-5xl">
            <CgArrowsExchangeAltV />
          </div>
          <div className="text-neutral-400 text-center text-5xl">
            <CgNotes />
          </div>
          <div className="text-neutral-400 text-center text-5xl">
            <CgUser />
          </div>
        </div>
      </div>
    </>
  );
}

// CgArrowsExchange; transfer
// CgArrowsExchangeAltV; transaction
// CgNotes; history
// CgUser; Profile

// CgUserList; search user
// CgUserAdd; aprove user
// CgPlayListCheck; aprove transaction
