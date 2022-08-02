import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FaChevronRight, FaSearch } from "react-icons/fa";
import SideBar from "../../Components/SideBar";
import AuthContext from "../../context/auth-context";
import { Link } from "react-router-dom";

export default function AdminSearch() {
  const authCtx = useContext(AuthContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const delayDebounceFn = setTimeout(() => {
      console.log(searchTerm);
      axios
        .post(
          "http://localhost:3001/admin/profile",
          { query: searchTerm },
          {
            headers: { Authorization: authCtx.token },
          }
        )
        .then((response) => {
          console.log(response.data);
          setCustomers(response.data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 1500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <>
      <SideBar />
      <div className="w-screen pl-16 py-5">
        <div className="flex flex-col gap-5 items-center">
          <form
            className="w-11/12 max-w-[704px]"
            onSubmit={(e) => {
              e.preventDefault();
            }}
            autoComplete="off"
          >
            <label className="sr-only">Search</label>
            <div className="relative w-full">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="simple-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-tertiary-500 focus:border-tertiary-500 block w-full pl-10 p-2.5"
                placeholder="Search"
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
              />
            </div>
          </form>
          {isLoading ? (
            <div className="flex items-center justify-center h-96">
              <div role="status m-auto">
                <svg
                  className="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-tertiary-500"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : customers.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-80 uppercase text-red-600 font-semibold text-lg">
              <svg
                aria-hidden="true"
                className="w-64 h-64 text-red-600"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <h1>404 Not Found</h1>
            </div>
          ) : (
            <div className="w-11/12 max-w-[704px] text-sm font-medium text-primary bg-white rounded-lg border border-gray-200">
              {customers.map((customer) => {
                return (
                  <Link
                    to={`${customer.username}`}
                    key={customer.username}
                    className="flex flex-row justify-between items-stretch py-2 px-4 w-full text-primary text-left border-b border-gray-200 cursor-pointer hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-tertiary-400 focus:text-tertiary-400"
                  >
                    <div className="flex flex-col w-5/12 md:w-8/12">
                      <h2 className="font-bold text-sm md:text-base truncate">
                        {customer.name}
                      </h2>
                      <h3 className="text-xs md:text-sm text-gray-500 truncate">
                        {customer.username}
                      </h3>
                    </div>
                    <div className="flex items-center gap-3 md:gap-5">
                      <h4 className="text-xs md:text-base text-green-600 text-right">
                        IDR{" "}
                        {customer.balance.toLocaleString("id", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </h4>
                      <FaChevronRight />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
