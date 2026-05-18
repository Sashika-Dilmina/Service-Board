import Link from 'next/link';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';
import Badge from './Badge';

const JobCard = ({ job }) => {
  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200 card-hover flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg">
          {job.category}
        </span>
        <Badge status={job.status}>{job.status}</Badge>
      </div>
      
      <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-1">
        {job.title}
      </h3>
      
      <p className="text-slate-500 mb-6 line-clamp-2 text-sm flex-grow">
        {job.description}
      </p>
      
      <div className="space-y-2 mb-6">
        <div className="flex items-center gap-2 text-slate-400 text-sm">
          <MapPin className="w-4 h-4" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-400 text-sm">
          <Calendar className="w-4 h-4" />
          <span>{new Date(job.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
      
      <Link 
        href={`/jobs/${job._id}`}
        className="flex items-center justify-center gap-2 w-full py-2.5 bg-slate-50 text-slate-700 font-semibold rounded-lg hover:bg-indigo-600 hover:text-white transition-all group"
      >
        View Details
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
};

export default JobCard;
