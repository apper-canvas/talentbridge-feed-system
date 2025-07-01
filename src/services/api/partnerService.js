import partnerMockData from '@/services/mockData/partners.json';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let partners = [...partnerMockData];
let nextId = Math.max(...partners.map(p => p.Id)) + 1;

export const partnerService = {
  async getAll() {
    await delay(300);
    return [...partners];
  },

  async getById(id) {
    await delay(200);
    const partner = partners.find(p => p.Id === parseInt(id));
    if (!partner) {
      throw new Error('Partner not found');
    }
    return { ...partner };
  },

  async create(partnerData) {
    await delay(400);
    const newPartner = {
      ...partnerData,
      Id: nextId++,
      createdAt: new Date().toISOString(),
      featured: partnerData.featured || false
    };
    partners.push(newPartner);
    return { ...newPartner };
  },

  async update(id, partnerData) {
    await delay(300);
    const index = partners.findIndex(p => p.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Partner not found');
    }
    partners[index] = { ...partners[index], ...partnerData };
    return { ...partners[index] };
  },

  async delete(id) {
    await delay(250);
    const index = partners.findIndex(p => p.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Partner not found');
    }
    partners.splice(index, 1);
    return true;
  },

  async getFeatured() {
    await delay(300);
    return partners.filter(p => p.featured).map(p => ({ ...p }));
  }
};