const JobRequest = require('../models/JobRequest');
const asyncHandler = require('../middleware/asyncHandler');
const ApiResponse = require('../utils/apiResponse');

// @desc    Get all jobs (with filtering)
// @route   GET /api/jobs
// @access  Public
const getJobs = asyncHandler(async (req, res) => {
  const { category, status } = req.query;
  const filter = {};

  if (category) filter.category = category;
  if (status) filter.status = status;

  const jobs = await JobRequest.find(filter).sort({ createdAt: -1 });
  return ApiResponse.success(res, jobs, 'Jobs fetched successfully');
});

// @desc    Get single job
// @route   GET /api/jobs/:id
// @access  Public
const getJobById = asyncHandler(async (req, res) => {
  const job = await JobRequest.findById(req.params.id);

  if (!job) {
    res.status(404);
    throw new Error('Job not found');
  }

  return ApiResponse.success(res, job, 'Job fetched successfully');
});

// @desc    Create new job
// @route   POST /api/jobs
// @access  Public
const createJob = asyncHandler(async (req, res) => {
  const { title, description, category, location, contactName, contactEmail } = req.body;

  if (!title || !description || !contactName || !contactEmail) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }

  const job = await JobRequest.create({
    title,
    description,
    category,
    location,
    contactName,
    contactEmail
  });

  return ApiResponse.success(res, job, 'Job created successfully', 201);
});

// @desc    Update job status
// @route   PATCH /api/jobs/:id
// @access  Public
const updateJobStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  if (!['Open', 'In Progress', 'Closed'].includes(status)) {
    res.status(400);
    throw new Error('Invalid status');
  }

  const job = await JobRequest.findById(req.params.id);

  if (!job) {
    res.status(404);
    throw new Error('Job not found');
  }

  job.status = status;
  await job.save();

  return ApiResponse.success(res, job, 'Job status updated successfully');
});

// @desc    Delete job
// @route   DELETE /api/jobs/:id
// @access  Public
const deleteJob = asyncHandler(async (req, res) => {
  const job = await JobRequest.findById(req.params.id);

  if (!job) {
    res.status(404);
    throw new Error('Job not found');
  }

  await job.deleteOne();

  return ApiResponse.success(res, null, 'Job deleted successfully');
});

module.exports = {
  getJobs,
  getJobById,
  createJob,
  updateJobStatus,
  deleteJob
};
