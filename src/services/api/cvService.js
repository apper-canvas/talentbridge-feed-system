// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let cvs = [];
let nextId = 1;

export const cvService = {
  async uploadFile(file) {
    await delay(1500); // Simulate file upload time
    
    const fileData = {
      Id: nextId++,
      name: file.name,
      size: file.size,
      type: file.type,
      uploadedAt: new Date().toISOString(),
      url: URL.createObjectURL(file) // In real app, this would be a server URL
    };
    
    return { ...fileData };
  },

  async submitApplication(applicationData) {
    await delay(800);
    
    const application = {
      Id: nextId++,
      ...applicationData,
      submittedAt: new Date().toISOString(),
      status: 'submitted'
    };
    
    cvs.push(application);
    return { ...application };
  },

  async getAll() {
    await delay(300);
    return [...cvs];
  },

  async getById(id) {
    await delay(200);
    const cv = cvs.find(c => c.Id === parseInt(id));
    if (!cv) {
      throw new Error('CV not found');
    }
    return { ...cv };
  },

  async updateStatus(id, status) {
    await delay(300);
    const index = cvs.findIndex(c => c.Id === parseInt(id));
    if (index === -1) {
      throw new Error('CV not found');
    }
    cvs[index] = { ...cvs[index], status, updatedAt: new Date().toISOString() };
    return { ...cvs[index] };
  },

  async delete(id) {
    await delay(250);
    const index = cvs.findIndex(c => c.Id === parseInt(id));
    if (index === -1) {
      throw new Error('CV not found');
    }
    cvs.splice(index, 1);
    return true;
  }
};