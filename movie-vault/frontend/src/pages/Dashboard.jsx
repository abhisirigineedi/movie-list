import { useState, useEffect } from "react";
import api from "../api/axios";
import { PlusCircle, Search } from "lucide-react";
import MovieCard from "../components/MovieCard";
import MovieForm from "../components/MovieForm";

export default function Dashboard() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchMovies = async () => {
    try {
      const { data } = await api.get("/movies/");
      setMovies(data);
    } catch (err) {
      console.error("Failed to fetch movies", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      try {
        await api.delete(`/movies/${id}`);
        // instantly update UI without fetching again
        setMovies(movies.filter(m => m.id !== id));
      } catch (err) {
        console.error("Failed to delete movie", err);
      }
    }
  };

  const handleEdit = (movie) => {
    setEditingMovie(movie);
    setIsFormOpen(true);
  };

  const handleSaved = () => {
    setIsFormOpen(false);
    setEditingMovie(null);
    fetchMovies(); // Refresh list to get new data
  };

  const filteredMovies = movies.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-extrabold text-white mb-2">My Movies</h1>
          <p className="text-slate-400 flex items-center gap-2">
            You have a total of <span className="text-indigo-400 font-bold px-2 py-0.5 bg-indigo-500/10 rounded-md">{movies.length}</span> movies in your collection
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="text"
              placeholder="Search movies..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-700/50 text-white rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder-slate-500"
            />
          </div>
          <button
            onClick={() => {
              setEditingMovie(null);
              setIsFormOpen(true);
            }}
            className="w-full sm:w-auto bg-indigo-500 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-indigo-400 transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2"
          >
            <PlusCircle className="w-5 h-5" />
            Add Movie
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
        </div>
      ) : movies.length === 0 ? (
        <div className="text-center py-24 bg-slate-800/30 rounded-3xl border border-slate-700/50 border-dashed">
          <div className="flex justify-center mb-4">
            <PlusCircle className="w-16 h-16 text-slate-600" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No movies yet</h3>
          <p className="text-slate-400 max-w-sm mx-auto">
            Your vault is empty. Keep track of your favorite movies by adding your first one!
          </p>
          <button
            onClick={() => setIsFormOpen(true)}
            className="mt-6 text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
          >
            + Add First Movie
          </button>
        </div>
      ) : filteredMovies.length === 0 ? (
        <div className="text-center py-20 text-slate-400">
          No movies found matching "{searchTerm}"
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMovies.map(movie => (
             <MovieCard 
              key={movie.id} 
              movie={movie} 
              onEdit={handleEdit}
              onDelete={handleDelete}
             />
          ))}
        </div>
      )}

      {isFormOpen && (
        <MovieForm 
          movie={editingMovie} 
          onClose={() => setIsFormOpen(false)} 
          onSaved={handleSaved} 
        />
      )}
    </div>
  );
}
