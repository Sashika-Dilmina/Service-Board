const mongoose = require('mongoose');
const dotenv = require('dotenv');
const JobRequest = require('./models/JobRequest');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const jobs = [
  {
    title: 'Plumbing Repair',
    description: 'Fixing a leaky pipe in the kitchen sink.',
    category: 'Home Maintenance',
    location: 'New York, NY',
    contactName: 'John Doe',
    contactEmail: 'john@example.com',
    status: 'Open'
  },
  {
    title: 'Web Development',
    description: 'Create a simple portfolio website using React.',
    category: 'IT Services',
    location: 'Remote',
    contactName: 'Jane Smith',
    contactEmail: 'jane@example.com',
    status: 'In Progress'
  },
  {
    title: 'Graphic Design',
    description: 'Design a logo for a new startup.',
    category: 'Creative',
    location: 'Remote',
    contactName: 'Bob Johnson',
    contactEmail: 'bob@example.com',
    status: 'Open'
  },
  {
    title: 'House Cleaning',
    description: 'Full house cleaning for a 3-bedroom apartment.',
    category: 'Cleaning',
    location: 'Los Angeles, CA',
    contactName: 'Alice Brown',
    contactEmail: 'alice@example.com',
    status: 'Closed'
  }
];

const importData = async () => {
  try {
    await JobRequest.deleteMany();
    await JobRequest.insertMany(jobs);
    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await JobRequest.deleteMany();
    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
