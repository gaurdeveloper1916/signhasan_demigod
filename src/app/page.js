"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (!email) {
      setMessage("Please enter a valid email.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("https://demigodhouse.com/api/user/send/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Email sent successfully!");
        setEmail("");
      } else {
        setMessage(result.message || "Something went wrong.");
      }
    } catch (error) {
      setMessage("Failed to send email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-screen w-full flex items-center justify-center text-center px-5 overflow-hidden">

      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: 1.2 }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0"
        style={{
          backgroundImage: 'url(./bgimage.webp)',
        }}
      />

      <div className="absolute top-0 right-0 bottom-0 left-0 bg-gray-900 opacity-75 z-10"></div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="z-20 flex flex-col justify-center text-white w-full h-screen"
      >
        <span className="font-bol text-xl">SINGHASAN</span>
        <h1 className="text-7xl font-light ">
          We are Almost there!
        </h1>
        <p className="text-2xl">Stay tuned for something amazing!</p>
        <p className="text-lg">+91-8355897803</p>
        <p className="text-lg">+91-7023843975</p>

        <div className="sm:mt-40">
          <form
            className="w-full max-w-xl mx-auto"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="flex items-center border-b border-indigo-500 py-2">
              <input
                className="appearance-none bg-transparent border-none w-full rounded text-white text-lg mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text"
                placeholder="username@email.ext"
                aria-label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                className="flex-shrink-0 bg-indigo-500 cursor-pointer border-indigo-500 text-sm border-4 text-white py-1 px-2 rounded disabled:opacity-50"
                type="submit"
                disabled={loading}
              >
                {loading ? "Sending..." : "Email Us"}
              </button>
            </div>
            {message && (
              <p className="mt-3 text-sm text-yellow-300">{message}</p>
            )}
          </form>
        </div>
      </motion.div>
    </div>
  );
}
