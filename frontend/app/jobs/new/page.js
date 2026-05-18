'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { jobService } from '@/services/api';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function NewJob() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'General',
    location: '',
    contactName: '',
    contactEmail: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      await jobService.create(formData);
      router.push('/');
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Board</span>
      </Link>

      <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Post a New Service Request</h1>
          <p className="text-slate-500 mt-2">Fill in the details below to reach out to professional service providers.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-100 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Job Title *</label>
              <input
                required
                name="title"
                placeholder="e.g. Emergency Plumbing"
                className="input-field"
                value={formData.title}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Category *</label>
              <select
                name="category"
                className="input-field"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="General">General</option>
                <option value="Home Maintenance">Home Maintenance</option>
                <option value="IT Services">IT Services</option>
                <option value="Creative">Creative</option>
                <option value="Cleaning">Cleaning</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Description *</label>
            <textarea
              required
              name="description"
              rows={4}
              placeholder="Describe what needs to be done..."
              className="input-field resize-none"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Location *</label>
            <input
              required
              name="location"
              placeholder="e.g. New York, NY or Remote"
              className="input-field"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Contact Name *</label>
              <input
                required
                name="contactName"
                placeholder="Your Name"
                className="input-field"
                value={formData.contactName}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Contact Email *</label>
              <input
                required
                type="email"
                name="contactEmail"
                placeholder="email@example.com"
                className="input-field"
                value={formData.contactEmail}
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 btn-primary py-3 text-lg font-bold"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Save className="w-5 h-5" />
                <span>Post Request</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
