import mockApplications from '@/services/mockData/applications.json';

// Mock delay for realistic loading states
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const applicationService = {
  async getAll() {
    await delay(300);
    return [...mockApplications];
  },

  async getById(id) {
    await delay(200);
    const application = mockApplications.find(app => app.Id === id);
    if (!application) {
      throw new Error('Application not found');
    }
    return { ...application };
  },

  async create(applicationData) {
    await delay(400);
    const newApplication = {
      ...applicationData,
      Id: Math.max(...mockApplications.map(a => a.Id)) + 1,
      appliedDate: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
    };
    mockApplications.push(newApplication);
    return { ...newApplication };
  },

  async update(id, applicationData) {
    await delay(300);
    const index = mockApplications.findIndex(app => app.Id === id);
    if (index === -1) {
      throw new Error('Application not found');
    }
    mockApplications[index] = { 
      ...mockApplications[index], 
      ...applicationData,
      lastUpdated: new Date().toISOString()
    };
    return { ...mockApplications[index] };
  },

  async delete(id) {
    await delay(250);
    const index = mockApplications.findIndex(app => app.Id === id);
    if (index === -1) {
      throw new Error('Application not found');
    }
    const deletedApplication = mockApplications.splice(index, 1)[0];
    return { ...deletedApplication };
  }
};