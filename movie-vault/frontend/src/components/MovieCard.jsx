import { Star, StarHalf, Edit2, Trash2 } from "lucide-react";

export default function MovieCard({ movie, onEdit, onDelete }) {
  // Component to render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
        stars.push(<Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />);
    }
    if (hasHalfStar) {
        stars.push(<StarHalf key="half" className="w-5 h-5 fill-yellow-400 text-yellow-400" />);
    }
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
        stars.push(<Star key={`empty-${i}`} className="w-5 h-5 text-slate-600" />);
    }
    return stars;
  };

  return (
    <div className="group relative bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300">
      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onEdit(movie)}
          className="p-2 bg-slate-700/80 hover:bg-slate-600 rounded-lg text-slate-300 hover:text-white transition-colors"
          title="Edit Movie"
        >
          <Edit2 className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(movie.id)}
          className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-red-400 hover:text-red-300 transition-colors"
          title="Delete Movie"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-bold text-white mb-1 pr-16">{movie.name}</h3>
        <p className="text-sm font-medium text-slate-400">
          {movie.year} • <span className="text-indigo-400">{movie.genre}</span>
        </p>
      </div>

      <div className="flex items-center gap-1 mt-6">
        {renderStars(movie.rating)}
        <span className="ml-2 text-sm font-bold text-slate-300">{movie.rating.toFixed(1)}</span>
      </div>
    </div>
  );
}
