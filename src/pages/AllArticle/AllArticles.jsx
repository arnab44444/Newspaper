import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router";
import { FaEye, FaLock } from "react-icons/fa";
import { AuthContext } from "../../provider/AuthProvider";
import { toast } from "react-toastify";

const AllArticles = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState("");
  const [publisher, setPublisher] = useState("");
  const [tags, setTags] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);

  const tagOptions = [
    { value: "Technology", label: "Technology" },
    { value: "Politics", label: "Politics" },
    { value: "Sports", label: "Sports" },
    { value: "Entertainment", label: "Entertainment" },
    { value: "Health", label: "Health" },
    { value: "Business", label: "Business" },
    { value: "Science", label: "Science" },
    { value: "World", label: "World" },
    { value: "Lifestyle", label: "Lifestyle" },
    { value: "Education", label: "Education" },
    { value: "Finance", label: "Finance" },
    { value: "Art", label: "Art" },
  ];

  // ✅ Check subscription on mount
  useEffect(() => {
    const checkSub = async () => {
      if (user?.email) {
        const res = await axiosSecure.get(`/users/${user.email}`);
        const premiumTaken = res.data?.premiumTaken;
        const now = new Date();

        if (premiumTaken && new Date(premiumTaken) > now) {
          setHasActiveSubscription(true);
        } else {
          setHasActiveSubscription(false);
        }
      }
    };
    checkSub();
  }, [user]);

  // ✅ Fetch publishers
  useEffect(() => {
    axiosSecure.get("/publishers").then((res) => setPublishers(res.data));
  }, []);

  // ✅ Fetch articles based on filters
  useEffect(() => {
    let url = `/articles?`;
    if (search) url += `search=${search}&`;
    if (publisher) url += `publisher=${publisher}&`;
    if (tags.length) url += `tags=${tags.map((t) => t.value).join(",")}&`;

    axiosSecure
      .get(url)
      .then((res) => setArticles(res.data))
      .catch((err) => console.error("Fetch failed", err));
  }, [search, publisher, tags]);

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* 🔍 Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search title"
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 w-full rounded"
        />

        <select
          onChange={(e) => setPublisher(e.target.value)}
          className="border p-2 w-full rounded"
        >
          <option value="">All Publishers</option>
          {publishers.map((pub) => (
            <option key={pub._id} value={pub.name}>
              {pub.name}
            </option>
          ))}
        </select>

        <Select
          isMulti
          options={tagOptions}
          onChange={(val) => setTags(val)}
          className="w-full"
        />
      </div>

      {/* 🔄 Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((a) => {
          const isLocked = a.isPremium && !hasActiveSubscription;

          return (
            <div
              key={a._id}
              className={`flex flex-col border rounded-lg shadow-md overflow-hidden transition ${
                a.isPremium
                  ? "border-yellow-400 bg-yellow-50"
                  : "bg-white"
              }`}
            >
              <img
                src={a.image}
                alt={a.title}
                className="w-full h-48 object-cover"
              />

              <div className="p-4 flex flex-col flex-grow justify-between">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-lg font-bold text-gray-800 line-clamp-1">
                      {a.title}
                    </h2>
                    {a.isPremium && (
                      <span className="bg-yellow-400 text-black text-xs font-semibold px-2 py-1 rounded">
                        Premium
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-gray-600 mb-1">
                    Publisher:{" "}
                    <span className="font-medium text-gray-800">
                      {a.publisher}
                    </span>
                  </p>

                  <p className="text-gray-700 text-sm line-clamp-3 mb-4">
                    {a.description}
                  </p>
                </div>

                <Link
                  to={isLocked ? "#" : `/articles/${a._id}`}
                  onClick={(e) => {
                    if (isLocked) {
                      e.preventDefault();
                      toast.error("This is a premium article. Please subscribe to access it.");
                    }
                  }}
                  className={`mt-auto w-full flex justify-center items-center gap-2 py-2 rounded text-sm font-semibold transition ${
                    isLocked
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-cyan-600 hover:bg-cyan-700 text-white"
                  }`}
                >
                  {isLocked ? (
                    <>
                      <FaLock /> Premium Locked
                    </>
                  ) : (
                    <>
                      <FaEye /> View Details
                    </>
                  )}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllArticles;
