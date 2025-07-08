import React from "react";

const teamMembers = [
  {
    name: "Sophia Rahman",
    role: "Senior Editor",
    bio: "Loves long-form journalism, fact-checking, and deep dives into social justice.",
    image:
      "https://images.unsplash.com/photo-1603415526960-f7e0328d1d3f?auto=format&fit=crop&w=400&q=80",
    article: {
      id: "686c372284187b44d4622552", // ✅ MongoDB article _id
      title: "The Future of AI in Everyday Life",
    },
  },
  {
    name: "Rafiq Ahmed",
    role: "Political Correspondent",
    bio: "Covers elections, policy breakdowns, and global diplomacy with clarity and depth.",
    image:
      "https://images.unsplash.com/photo-1614285374927-d07b59eeb87e?auto=format&fit=crop&w=400&q=80",
    article: {
      title: "Inside Bangladesh’s New Voter Reform",
      link: "/articles/voter-reform",
    },
  },
  {
    name: "Elina Chowdhury",
    role: "Culture & Lifestyle Writer",
    bio: "Explores daily life through pop culture, mental health, and urban youth trends.",
    image:
      "https://images.unsplash.com/photo-1603415527127-30e74b810bd5?auto=format&fit=crop&w=400&q=80",
    article: {
      title: "How Gen Z is Redefining Success",
      link: "/articles/genz-success",
    },
  },
];

const MeetTheTeam = () => {
  return (
    <section className="bg-indigo-50 py-14 px-6 md:px-10">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-indigo-700 mb-10">
          👥 Meet Our Journalists
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-all"
            >
              <img
                src={member.image}
                alt={member.name}
                className="h-56 w-full object-cover"
              />
              <div className="p-6 text-left">
                <h3 className="text-xl font-semibold text-gray-800">
                  {member.name}
                </h3>
                <p className="text-sm text-indigo-500 mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                <a
                  href={member.article.link}
                  className="text-indigo-600 font-medium hover:underline text-sm"
                >
                  📖 Favorite Article: {member.article.title}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetTheTeam;
