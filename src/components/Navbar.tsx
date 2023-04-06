const Navbar = () => {
  return (
    <nav className="fixed backdrop-blur-sm px-2 md:px-4 bg-transparent dark:bg-zinc-800 z-50 top-0 left-0 right-0 h-16 border-b border-slate-300 shadow-sm flex items-center justify-between">
      <div className="container max-w-7xl mx-auto w-full flex justify-between">
        <h1 className="flex items-center text-2xl font-extrabold text-zinc-50">
          LOTR POKEMON
        </h1>
        <button className="btn">Sign In</button>
      </div>
    </nav>
  );
};

export default Navbar;
