import axios from "axios";
import { useContext, useEffect, useState } from "react";
import SideBar from "../../Components/SideBar";
import AuthContext from "../../context/auth-context";
import { useParams } from "react-router-dom";
import ToastContext from "../../context/toast-context";
import { WarningToast } from "../../Components/Toast";

export default function AdminProfile() {
  const authCtx = useContext(AuthContext);
  const toastsCtx = useContext(ToastContext);

  const { username } = useParams();

  const [customer, setCustomer] = useState({
    account: { username: "", role: "" },
    customer: { username: "", name: "", identity_photo: "", balance: 0 },
  });
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [history, setHistory] = useState([]);

  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [isTransactionsLoading, setIsTransactionsLoading] = useState(true);

  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    setIsProfileLoading(true);
    axios
      .get(`http://localhost:3001/admin/profile/${username}`, {
        headers: { Authorization: authCtx.token },
      })
      .then((response) => {
        // console.log(response.data);
        setCustomer(response.data);
        setIsNotFound(false);
      })
      .catch((error) => {
        // console.log(error);
        setIsNotFound(true);

        if (error.response.status === 404) return;

        toastsCtx.push(
          <WarningToast
            message="Internal server error."
            key={toastsCtx.toasts.length}
          />
        );
      })
      .finally(() => {
        setIsProfileLoading(false);
      });
  }, []);

  useEffect(() => {
    setIsTransactionsLoading(true);
    axios
      .get(`http://localhost:3001/admin/history/${username}/${page}`, {
        headers: { Authorization: authCtx.token },
      })
      .then((response) => {
        // console.log(response.data);
        setTotal(response.data.total);
        setHistory(response.data.result);
      })
      .catch((error) => {
        // console.log(error);
        toastsCtx.push(
          <WarningToast
            message="Internal server error."
            key={toastsCtx.toasts.length}
          />
        );
      })
      .finally(() => {
        setIsTransactionsLoading(false);
      });
  }, [page]);

  return (
    <>
      <SideBar />
      {isNotFound ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="pl-16 font-bold text-primary uppercase text-lg">
            Customer is Not Registered
          </h1>
        </div>
      ) : (
        <div className="w-screen pl-16 py-5">
          <div className="px-5">
            {isProfileLoading ? (
              <div className="flex items-center justify-center h-28">
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
            ) : (
              <div className="my-5 flex justify-between items-stretch">
                <div className="flex items-center space-x-4">
                  <img
                    className="w-16 h-16 rounded-2xl"
                    src={customer.customer.identity_photo}
                    alt=""
                  />
                  <div>
                    <div className="font-bold dark:text-white md:text-lg">
                      {customer.customer.name}
                    </div>
                    <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                      {customer.customer.username}
                    </div>
                    {customer.account.role === "customer" ? (
                      <span className="upercase bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                        CUSTOMER
                      </span>
                    ) : customer.account.role === "unverified" ? (
                      <span className="upercase bg-yellow-100 text-yellow-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                        UNVERIFIED CUSTOMER
                      </span>
                    ) : (
                      <span className="upercase bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">
                        DENIED
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3 md:gap-5">
                  <h1 className="text-xs md:text-base text-primary text-right font-bold">
                    IDR{" "}
                    {customer.customer.balance.toLocaleString("id", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </h1>
                </div>
              </div>
            )}
            {isTransactionsLoading ? (
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
            ) : history.length === 0 ? (
              <h1 className="text-center text-primary font-semibold text-lg m-10">
                No Transactions
              </h1>
            ) : (
              <>
                <div className="overflow-x-auto relative shadow-md rounded-lg mb-10">
                  <table className="w-full text-xs md:text-sm lg:text-base text-left text-primary">
                    <thead className="text-xs md:text-sm text-secondary uppercase bg-tertiary-400 text-center font-extrabold">
                      <tr>
                        <th scope="col" className="py-3 px-6">
                          Time
                        </th>
                        <th scope="col" className="py-3 px-6">
                          Type
                        </th>
                        <th scope="col" className="py-3 px-6">
                          Amount
                        </th>
                        <th scope="col" className="py-3 px-6">
                          Status
                        </th>
                        <th scope="col" className="py-3 px-6">
                          To / From
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {history.map((transaction, index) => {
                        return (
                          <tr
                            className="bg-white border-b text-center"
                            key={index}
                          >
                            <td className="py-4 px-6">
                              {new Date(transaction.timestamp).toLocaleString(
                                "id"
                              )}
                            </td>
                            {transaction.type === "deposit" ? (
                              <td className="py-4 px-6 uppercase text-green-600 font-bold">
                                deposit
                              </td>
                            ) : transaction.type === "withdraw" ? (
                              <td className="py-4 px-6 uppercase text-red-600 font-bold">
                                withdraw
                              </td>
                            ) : transaction.type === "transfer-receive" ? (
                              <td className="py-4 px-6 uppercase text-green-600 font-bold">
                                transfer
                              </td>
                            ) : (
                              <td className="py-4 px-6 uppercase text-red-600 font-bold">
                                transfer
                              </td>
                            )}
                            <td className="py-4 px-6">
                              IDR{" "}
                              {transaction.amount.toLocaleString("id", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </td>
                            {transaction.status === "pending" ? (
                              <td className="py-4 px-6 uppercase text-yellow-500 font-bold">
                                pending
                              </td>
                            ) : transaction.status === "rejected" ? (
                              <td className="py-4 px-6 uppercase text-red-600 font-bold">
                                rejected
                              </td>
                            ) : transaction.status === "accepted" ? (
                              <td className="py-4 px-6 uppercase text-green-600 font-bold">
                                accepted
                              </td>
                            ) : (
                              <td className="py-4 px-6 uppercase text-green-500 font-bold">
                                success
                              </td>
                            )}
                            {transaction.type === "deposit" ? (
                              <td />
                            ) : transaction.type === "withdraw" ? (
                              <td />
                            ) : transaction.type === "transfer-receive" ? (
                              <td className="py-4 px-6 uppercase text-green-600 font-bold">
                                {transaction.sender}
                              </td>
                            ) : (
                              <td className="py-4 px-6 uppercase text-red-600 font-bold">
                                {transaction.receiver}
                              </td>
                            )}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </>
            )}
            {history.length === 0 ? (
              <></>
            ) : (
              <div className="flex flex-col items-center">
                <span className="text-sm text-gray-700 ">
                  Showing{" "}
                  <span className="font-semibold text-gray-900 ">
                    {(page - 1) * 10 + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-semibold text-gray-900 ">
                    {Math.min(total, page * 10)}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-gray-900 ">{total}</span>{" "}
                  Entries
                </span>
                <div className="inline-flex mt-2 xs:mt-0">
                  <button
                    className="inline-flex items-center py-2 px-4 text-sm font-medium text-white bg-tertiary-400 rounded-l hover:bg-tertiary-500"
                    onClick={() => {
                      setPage(Math.max(1, page - 1));
                    }}
                  >
                    <svg
                      aria-hidden="true"
                      className="mr-2 w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Prev
                  </button>
                  <button
                    className="inline-flex items-center py-2 px-4 text-sm font-medium text-white bg-tertiary-400 rounded-r border-0 border-l border-gray-700 hover:bg-tertiary-500"
                    onClick={() => {
                      setPage(Math.min(Math.ceil(total / 10), page + 1));
                    }}
                  >
                    Next
                    <svg
                      aria-hidden="true"
                      className="ml-2 w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
