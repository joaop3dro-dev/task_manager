function Header({ titulo, subtitulo }) {
  return (
    <header className="bg-gray-900 border-b border-gray-800 px-4 py-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-xl font-bold text-white">{titulo}</h1>
        <p className="text-sm text-gray-400">{subtitulo}</p>
      </div>
    </header>
  );
}

export default Header;
