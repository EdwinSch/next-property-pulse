"use client";
import { FaBookmark } from "react-icons/fa";
import BookmarkProperty from "@/app/actions/BookmarkProperty";
import CheckBookmarkStatus from "@/app/actions/CheckBookmarkStatus";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { BeatLoader } from "react-spinners";

const BookmarkButton = ({ property }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    // ELSE
    CheckBookmarkStatus(property._id).then((response) => {
      if (response.error) {
        toast.error(response.error);
      }
      if (response.isBookmarked) {
        setIsBookmarked(response.isBookmarked);
      }
      setLoading(false);
    });
  }, [property._id, userId, CheckBookmarkStatus]);

  const handleClick = async () => {
    // Check for user/login
    if (!userId) {
      toast.error("Please login to bookmark this property");
      return;
    }

    BookmarkProperty(property._id).then((response) => {
      if (response.error) return toast.error(response.error);
      // Else
      setIsBookmarked(response.isBookmarked);
      toast.success(response.message);
    });
  };

  if (loading) {
    return (
      <BeatLoader
        color="#3b82f6"
        size={10}
        aria-label="Loading Spinner"
        className="text-center"
      />
    );
  }

  return isBookmarked ? (
    <button
      onClick={handleClick}
      className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2" /> Remove bookmark
    </button>
  ) : (
    <button
      onClick={handleClick}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2" /> Bookmark Property
    </button>
  );
};
export default BookmarkButton;
