import Link from 'next/link';
import { Briefcase } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 glass border-b border-slate-200">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-indigo-600 font-bold text-xl">
          <Briefcase className="w-6 h-6" />
          <span>ServiceBoard</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">
            Browse Jobs
          </Link>
          <Link href="/jobs/new" className="btn-primary shadow-lg shadow-indigo-200">
            Post a Job
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
