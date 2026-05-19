'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { jobService } from '@/services/api';
import Badge from '@/components/Badge';
import Skeleton from '@/components/Skeleton';
import { 
  ArrowLeft, 
  Trash2, 
  Mail, 
  User, 
  MapPin, 
  Clock, 
  Settings,
  ChevronDown,
  Loader2
} from 'lucide-react';
import Link from 'next/link';

export default function JobDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [error, setError] = useState(null);

  const fetchJob = async () => {
    try {
      setLoading(true);
      const data = await jobService.getById(id);
      setJob(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJob();
  }, [id]);

  const handleStatusChange = async (newStatus) => {
    try {
      setUpdating(true);
      setIsDropdownOpen(false);
      await jobService.updateStatus(id, newStatus);
      setJob(prev => ({ ...prev, status: newStatus }));
    } catch (err) {
      alert('Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this job request?')) return;
    
    try {
      setDeleting(true);
      await jobService.delete(id);
      router.push('/');
    } catch (err) {
      alert('Failed to delete job');
      setDeleting(false);
    }
  };

  if (loading) return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Skeleton className="h-6 w-32" />
      <div className="bg-white p-8 rounded-2xl border border-slate-200 space-y-6">
        <div className="flex justify-between">
          <Skeleton className="h-10 w-2/3" />
          <Skeleton className="h-8 w-24" />
        </div>
        <Skeleton className="h-32 w-full" />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      </div>
    </div>
  );

  if (error || !job) return (
    <div className="text-center py-20">
      <h2 className="text-2xl font-bold text-slate-800">Job not found</h2>
      <Link href="/" className="text-indigo-600 hover:underline mt-4 inline-block">Return to Board</Link>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Board</span>
        </Link>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              disabled={updating}
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 font-semibold transition-all disabled:opacity-50"
            >
              {updating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Settings className="w-4 h-4" />}
              <span>Update Status</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setIsDropdownOpen(false)}
                ></div>
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-20 overflow-hidden">
                  {['Open', 'In Progress', 'Closed'].map(status => (
                    <button
                      key={status}
                      onClick={() => handleStatusChange(status)}
                      className={`w-full text-left px-4 py-2 hover:bg-slate-50 transition-colors ${job.status === status ? 'text-indigo-600 font-bold bg-indigo-50/50' : 'text-slate-600'}`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <button 
            onClick={handleDelete}
            disabled={deleting}
            className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg font-semibold transition-all disabled:opacity-50"
          >
            {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
            <span>Delete</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 md:p-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="space-y-2">
              <span className="text-sm font-bold text-indigo-600 uppercase tracking-widest">{job.category}</span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                {job.title}
              </h1>
            </div>
            <div className="flex items-center">
              <Badge status={job.status}>{job.status}</Badge>
            </div>
          </div>

          <div className="prose prose-slate max-w-none mb-12">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Job Description</h3>
            <p className="text-slate-600 whitespace-pre-wrap leading-relaxed text-lg">
              {job.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 border-t border-slate-100">
            <div className="space-y-6">
              <h4 className="font-bold text-slate-900 text-lg">Contact Information</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-600">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-indigo-600">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium uppercase">Client Name</p>
                    <p className="font-semibold text-slate-800">{job.contactName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-indigo-600">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium uppercase">Email Address</p>
                    <a href={`mailto:${job.contactEmail}`} className="font-semibold text-indigo-600 hover:underline">
                      {job.contactEmail}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="font-bold text-slate-900 text-lg">Job Details</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-600">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-indigo-600">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium uppercase">Location</p>
                    <p className="font-semibold text-slate-800">{job.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-indigo-600">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium uppercase">Posted On</p>
                    <p className="font-semibold text-slate-800">{new Date(job.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
