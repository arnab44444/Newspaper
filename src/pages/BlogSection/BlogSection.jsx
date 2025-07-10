import React from "react";

const blogPosts = [
  {
    id: 1,
    title: "The Power of Digital Journalism",
    author: "Mehedi Hasan",
    date: "July 10, 2025",
    image: "https://i.postimg.cc/44Lyyr5P/shutterstock-430087837.jpg",
    summary:
      "Digital journalism is transforming the way we consume information. Explore how modern newsrooms are evolving.",
  },
  {
    id: 2,
    title: "How AI is Revolutionizing News",
    author: "Farzana Akter",
    date: "July 8, 2025",
    image:
      "https://i.postimg.cc/65FQLnFG/AI-Anchors-Promise-a-Future-Where-Robots-Deliver-News.webp",
    summary:
      "AI-driven tools are changing news writing, recommendation systems, and even fact-checking. Let’s explore the future!",
  },
  {
    id: 3,
    title: "The Rise of Independent Journalism in 2025",
    author: "Rafsan Jamil",
    date: "July 5, 2025",
    image: "https://i.postimg.cc/rFDmrQZk/indpendent-journalism-TW.jpg",
    summary:
      "Independent journalists are gaining more influence in the digital age. With direct reader support and new platforms, their impact on public opinion is stronger than ever.",
  },
];

const truncate = (text, maxLength) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const BlogSection = () => {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-cyan-700 mb-10">
          📝 Latest From Our Blog
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-500 mb-2">
                  By {post.author} • {post.date}
                </p>
                <p className="text-gray-700 text-sm">
                  {truncate(post.summary, 100)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
