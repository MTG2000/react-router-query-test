import { useNavigation } from "react-router-dom";
import { HashLoader } from "react-spinners";

export default function GlobalLoader() {
  const navigation = useNavigation();

  return navigation.state === "loading" ? (
    <div className="fixed flex gap-16 items-center top-32 left-1/2 -translate-x-1/2 px-24 py-8 rounded-24 bg-violet-200 border border-violet-400 text-gray-600 font-bold">
      {navigation.location?.state?.loadingText ?? "Fetching new data..."}{" "}
      <HashLoader color="#646cff" size={28} />
    </div>
  ) : null;
}
