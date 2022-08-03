import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import SideBar from "../../Components/SideBar";
import {
  DangerToast,
  SuccessToast,
  WarningToast,
} from "../../Components/Toast";
import AuthContext from "../../context/auth-context";
import ToastContext from "../../context/toast-context";

export default function Transaction() {
  const authCtx = useContext(AuthContext);
  const toastsCtx = useContext(ToastContext);

  const currentType = useRef();
  const currentCurrency = useRef();
  const currentAmount = useRef();

  const [currencies, setCurrencies] = useState([]);
  const [isGettingCurrencies, setIsGettingCurrencies] = useState(true);
  const [isRequesting, setIsRequesting] = useState(false);

  useEffect(() => {
    setIsGettingCurrencies(true);
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/currency`)
      .then((response) => {
        // console.log(response);
        setCurrencies(response.data);
      })
      .catch((error) => {
        // console.log(error);
        toastsCtx.push(
          <WarningToast
            message="Fail to load currencies."
            key={toastsCtx.toasts.length}
          />
        );
      })
      .finally(() => {
        setIsGettingCurrencies(false);
      });
    // eslint-disable-next-line
  }, []);

  const onRequestHandler = (e) => {
    e.preventDefault();
    if (isRequesting) return;

    setIsRequesting(true);
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/transaction`,
        {
          type: currentType.current.value,
          amount: currentAmount.current.value,
          currency: currentCurrency.current.value,
        },
        {
          headers: { Authorization: authCtx.token },
        }
      )
      .then((response) => {
        // console.log(response);
        toastsCtx.push(
          <SuccessToast
            message="Request submitted."
            key={toastsCtx.toasts.length}
          />
        );
      })
      .catch((error) => {
        // console.log(error.response.status);

        if (error.response.status === 400) {
          toastsCtx.push(
            <DangerToast
              message="Fail to submit request. Check balance (?)"
              key={toastsCtx.toasts.length}
            />
          );
          return;
        }

        toastsCtx.push(
          <WarningToast
            message="Internal server error."
            key={toastsCtx.toasts.length}
          />
        );
      })
      .finally(() => {
        currentType.current.value = "deposit";
        currentAmount.current.value = "";
        currentCurrency.current.value = "IDR";
        setIsRequesting(false);
      });
  };
  return (
    <>
      <SideBar />
      <div className="w-screen pl-16">
        <h1 className="block uppercase tracking-wide text-primary text-base md:text-lg font-bold my-4 text-center">
          Transaction
        </h1>
        <div className="flex flex-col items-center">
          <form className="w-11/12 max-w-[648px]" onSubmit={onRequestHandler}>
            <div className="mb-2">
              <label className="block mb-2 text-sm font-medium text-primary">
                Transaction Type
              </label>
              <select
                id="countries"
                className="bg-gray-50 cursor-pointer border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
                ref={currentType}
                defaultValue="deposit"
              >
                <option value="deposit">DEPOSIT</option>
                <option value="withdraw">WITHDRAW</option>
              </select>
            </div>
            <div className="mb-4 flex gap-5">
              <div>
                <label className="block mb-2 text-sm font-medium text-primary">
                  Currency
                </label>
                <select
                  id="currency"
                  className="bg-gray-50 cursor-pointer border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                  ref={currentCurrency}
                  defaultValue="IDR"
                  disabled={isGettingCurrencies}
                >
                  <option value="IDR" key="IDR">
                    IDR
                  </option>
                  {currencies.map((currency) => {
                    return (
                      <option value={currency} key={currency}>
                        {currency}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="grow">
                <label className="block mb-2 text-sm font-medium text-primary">
                  Amount
                </label>
                <input
                  type="number"
                  id="amount"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                  min="0.01"
                  step="0.01"
                  ref={currentAmount}
                />
              </div>
            </div>
            <button
              type="submit"
              className="text-white float-right  bg-tertiary-400 hover:bg-tertiary-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-40 px-5 py-2.5 text-center disabled:hover:bg-tertiary-400 disabled:cursor-not-allowed"
              disabled={isRequesting}
            >
              {isRequesting ? (
                <>
                  <svg
                    role="status"
                    class="inline mr-3 w-4 h-4 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                  Loading...
                </>
              ) : (
                <>Request</>
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
