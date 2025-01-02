import { FaPaperPlane } from "react-icons/fa";
import { useFormStatus } from "react-dom";

const SubmitMessageButton = () => {
  const status = useFormStatus();

  return (
    <button
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center capitalize"
      type="submit"
      disabled={status.pending}
    >
      <FaPaperPlane className="mr-2" />{" "}
      {status.pending ? "..." : "sent message"}
    </button>
  );
};
export default SubmitMessageButton;
