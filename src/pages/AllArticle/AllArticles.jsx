import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Select from "react-select";

const AllArticles = () => {
  const axiosSecure = useAxiosSecure();
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState("");
  const [publisher, setPublisher] = useState("");
  const [tags, setTags] = useState([]);

  const tagOptions = [
    { value: "Technology", label: "Technology" },
    { value: "Sports", label: "Sports" },
    { value: "Education", label: "Education" },
  ];

  useEffect(() => {
    const fetch = async () => {
      let url = `/articles?`;
      if (search) url += `search=${search}&`;
      if (publisher) url += `publisher=${publisher}&`;
      if (tags.length) url += `tags=${tags.map((t) => t.value).join(",")}&`;

      try {
        const res = await axiosSecure.get(url);
        setArticles(res.data);
      } catch (err) {
        console.error("Fetch failed", err);
      }
    };
    fetch();
  }, [search, publisher, tags]);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search title"
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 w-full"
        />
        <select
          onChange={(e) => setPublisher(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="">All Publishers</option>
          <option value="BBC">BBC</option>
          <option value="CNN">CNN</option>
        </select>
        <Select
          isMulti
          options={tagOptions}
          onChange={(val) => setTags(val)}
          className="w-full"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {articles.map((a) => (
          <div key={a._id} className="border p-4 rounded shadow">
            <img src={a.image} alt="" className="w-full h-40 object-cover" />
            <h2 className="text-xl font-bold mt-2">{a.title}</h2>
            <p className="text-sm text-gray-600">Publisher: {a.publisher}</p>
            <p>{a.description?.slice(0, 100)}...</p>
            <button className="mt-2 bg-cyan-600 text-white px-3 py-1 rounded">Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllArticles;
