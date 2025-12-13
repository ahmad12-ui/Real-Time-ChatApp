import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CheckLogin from "../components/checklogin";

function HomePage() {
  const { status } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (status) {
      navigate("/chat");
    }
  }, [status, navigate]);

  return (
    <div className="min-h-screen bg-black text-gray-100 relative">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-maroon-900/50 backdrop-blur-md shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Visible Logo */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#8B0000] drop-shadow-2xl tracking-wider">
            ChatApp
          </h1>

          {/* Header Button (CheckLogin) */}
          <div className="transition-all duration-300 hover:scale-105">
            <div className="bg-[#8B0000] hover:bg-maroon-700 text-white font-semibold px-8 py-3 rounded-full shadow-xl border border-maroon-800 transition-all duration-300 hover:shadow-2xl hover:shadow-[#8B0000]/60">
              <CheckLogin />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="pt-32 min-h-screen flex flex-col items-center justify-center px-6">
        <div className="text-center max-w-4xl">
          <h2 className="text-6xl md:text-8xl font-black text-white leading-tight mb-8">
            Welcome to
            <br />
            <span className="text-[#8B0000] drop-shadow-2xl">Chat App</span>
          </h2>

          <p className="text-xl md:text-2xl text-gray-400 mb-12">
            Seamless conversations in a bold, modern space.
          </p>

          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <Link
              to="/login"
              className="group relative px-16 py-6 bg-[#8B0000] hover:bg-maroon-700 text-white font-bold text-xl rounded-2xl shadow-2xl transition-all duration-500 transform hover:scale-110 hover:shadow-[#8B0000]/60 overflow-hidden"
            >
              <span className="relative z-10">Login</span>
              <div className="absolute inset-0 bg-maroon-600 opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
            </Link>

            <Link
              to="/signup"
              className="group relative px-16 py-6 bg-gray-900 hover:bg-gray-800 text-white font-bold text-xl rounded-2xl shadow-2xl border border-gray-800 transition-all duration-500 transform hover:scale-110 hover:shadow-gray-700/60 overflow-hidden"
            >
              <span className="relative z-10">Signup</span>
              <div className="absolute inset-0 bg-gray-700 opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
// import React, { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import CheckLogin from "../components/checklogin";
// function HomePage() {
//   const { status } = useSelector((state) => state.auth);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (status) {
//       navigate("/chat");
//     }
//   }, [status, navigate]);

//   return (
//     <div>
//       <header>
//         <p>logo</p>
//         <div>
//           <CheckLogin />
//         </div>
//       </header>
//       <h1>Welcome</h1>
//       <Link to="/login">Login</Link>
//       <br />
//       <Link to="/signup">Signup</Link>
//     </div>
//   );
// }

// export default HomePage;
