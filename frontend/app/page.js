'use client';

import { useState, useEffect } from 'react';
import { jobService } from '@/services/api';
import JobCard from '@/components/JobCard';
import Skeleton from '@/components/Skeleton';
import { Search, Filter, AlertCircle } from 'lucide-react';

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    status: '',
  });
  const [search, setSearch] = useState('');

const fetchJobs = async () => {
  try {
    setLoading(true);

    const jobsData = await jobService.getAll();

    setJobs(jobsData || []);

    setError(null);
  } catch (err) {
    console.error(err);

    setError('Failed to fetch jobs');
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      (job.title || '')
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (job.description || '')
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      !filters.category ||
      job.category === filters.category;

    const matchesStatus =
      !filters.status ||
      job.status === filters.status;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="text-center py-12 space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Find Professional{' '}
          <span className="text-indigo-600">
            Service Providers
          </span>
        </h1>

        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
          Post your service requests and get connected
          with experts in minutes. Manage everything
          from one simple dashboard.
        </p>
      </section>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
        {/* Search */}
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />

          <input
            type="text"
            placeholder="Search for services..."
            className="input-field pl-10"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>

        {/* Filters */}
        <div className="flex gap-4">
          {/* Category */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />

            <select
              className="input-field pl-10 pr-8 appearance-none bg-white"
              value={filters.category}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  category: e.target.value,
                }))
              }
            >
              <option value="">
                All Categories
              </option>

              <option value="Home Maintenance">
                Home Maintenance
              </option>

              <option value="IT Services">
                IT Services
              </option>

              <option value="Creative">
                Creative
              </option>

              <option value="Cleaning">
                Cleaning
              </option>

              <option value="General">
                General
              </option>
            </select>
          </div>

          {/* Status */}
          <select
            className="input-field appearance-none bg-white"
            value={filters.status}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                status: e.target.value,
              }))
            }
          >
            <option value="">
              All Statuses
            </option>

            <option value="Open">
              Open
            </option>

            <option value="In Progress">
              In Progress
            </option>

            <option value="Closed">
              Closed
            </option>
          </select>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-6 border border-slate-100 space-y-4"
            >
              <div className="flex justify-between">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-16" />
              </div>

              <Skeleton className="h-8 w-full" />

              <Skeleton className="h-16 w-full" />

              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-700 p-8 rounded-2xl border border-red-100 flex flex-col items-center gap-4">
          <AlertCircle className="w-12 h-12" />

          <p className="text-xl font-bold">
            Failed to load jobs
          </p>

          <p>{error}</p>

          <button
            onClick={fetchJobs}
            className="btn-primary bg-red-600 hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
          <p className="text-slate-500 text-lg">
            No job requests found matching your
            criteria.
          </p>

          <button
            onClick={() => {
              setFilters({
                category: '',
                status: '',
              });

              setSearch('');
            }}
            className="mt-4 text-indigo-600 font-bold hover:underline"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
            />
          ))}
        </div>
      )}
    </div>
  );
}