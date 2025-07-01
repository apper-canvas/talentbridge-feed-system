import mockCompanies from '@/services/mockData/companies.json';

// Mock delay for realistic loading states
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const companyService = {
  async getAll() {
    await delay(300);
    return [...mockCompanies];
  },

  async getById(id) {
    await delay(200);
    const company = mockCompanies.find(company => company.Id === id);
    if (!company) {
      throw new Error('Company not found');
    }
    return { ...company };
  },

  async create(companyData) {
    await delay(400);
    const newCompany = {
      ...companyData,
      Id: Math.max(...mockCompanies.map(c => c.Id)) + 1,
    };
    mockCompanies.push(newCompany);
    return { ...newCompany };
  },

  async update(id, companyData) {
    await delay(300);
    const index = mockCompanies.findIndex(company => company.Id === id);
    if (index === -1) {
      throw new Error('Company not found');
    }
    mockCompanies[index] = { ...mockCompanies[index], ...companyData };
    return { ...mockCompanies[index] };
  },

  async delete(id) {
    await delay(250);
    const index = mockCompanies.findIndex(company => company.Id === id);
    if (index === -1) {
      throw new Error('Company not found');
    }
    const deletedCompany = mockCompanies.splice(index, 1)[0];
    return { ...deletedCompany };
  }
};