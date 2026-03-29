import { useAuth } from "../context/AuthContext";
import { User, Calendar } from "lucide-react";

export default function Profile() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-20">
      <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-cyan-400 to-indigo-500"></div>
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
          <div className="p-6 bg-slate-900 border border-slate-700/50 rounded-full shadow-inner flex items-center justify-center">
            <User className="w-20 h-20 text-indigo-400" />
          </div>
          <div className="flex-1 text-center sm:text-left mt-4 sm:mt-0">
             <h1 className="text-3xl font-bold text-white mb-6">User Profile</h1>
             
             <div className="space-y-6">
                 <div>
                    <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Username</label>
                    <div className="mt-1 text-xl font-medium text-slate-300">
                        @{user.username}
                    </div>
                 </div>

                 <div className="h-px bg-slate-700/50 w-full"></div>

                 <div>
                    <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-center sm:justify-start gap-2">
                        <Calendar className="w-4 h-4" /> Account Created
                    </label>
                    <div className="mt-1 text-lg font-medium text-slate-300">
                        {new Date(user.created_at).toLocaleDateString("en-US", {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </div>
                 </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
