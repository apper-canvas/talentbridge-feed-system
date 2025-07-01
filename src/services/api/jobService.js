import mockJobs from '@/services/mockData/jobs.json';

// Mock delay for realistic loading states
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const jobService = {
  async getAll() {
    await delay(300);
    return [...mockJobs];
  },

  async getById(id) {
    await delay(200);
    const job = mockJobs.find(job => job.Id === id);
    if (!job) {
      throw new Error('Job not found');
    }
    return { ...job };
  },

  async create(jobData) {
    await delay(400);
    const newJob = {
      ...jobData,
      Id: Math.max(...mockJobs.map(j => j.Id)) + 1,
      postedDate: new Date().toISOString(),
    };
    mockJobs.push(newJob);
    return { ...newJob };
  },

  async update(id, jobData) {
    await delay(300);
    const index = mockJobs.findIndex(job => job.Id === id);
    if (index === -1) {
      throw new Error('Job not found');
    }
    mockJobs[index] = { ...mockJobs[index], ...jobData };
    return { ...mockJobs[index] };
  },

  async delete(id) {
    await delay(250);
    const index = mockJobs.findIndex(job => job.Id === id);
    if (index === -1) {
      throw new Error('Job not found');
    }
    const deletedJob = mockJobs.splice(index, 1)[0];
    return { ...deletedJob };
  }
};