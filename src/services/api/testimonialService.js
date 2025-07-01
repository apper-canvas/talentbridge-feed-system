import testimonialMockData from '@/services/mockData/testimonials.json';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let testimonials = [...testimonialMockData];
let nextId = Math.max(...testimonials.map(t => t.Id)) + 1;

export const testimonialService = {
  async getAll() {
    await delay(300);
    return [...testimonials];
  },

  async getById(id) {
    await delay(200);
    const testimonial = testimonials.find(t => t.Id === parseInt(id));
    if (!testimonial) {
      throw new Error('Testimonial not found');
    }
    return { ...testimonial };
  },

  async create(testimonialData) {
    await delay(400);
    const newTestimonial = {
      ...testimonialData,
      Id: nextId++,
      date: new Date().toISOString(),
      approved: false
    };
    testimonials.push(newTestimonial);
    return { ...newTestimonial };
  },

  async update(id, testimonialData) {
    await delay(300);
    const index = testimonials.findIndex(t => t.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Testimonial not found');
    }
    testimonials[index] = { ...testimonials[index], ...testimonialData };
    return { ...testimonials[index] };
  },

  async delete(id) {
    await delay(250);
    const index = testimonials.findIndex(t => t.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Testimonial not found');
    }
    testimonials.splice(index, 1);
    return true;
  },

async getApproved() {
    await delay(300);
    return testimonials.filter(t => t.approved).map(t => ({ ...t }));
  }
};

// Named export for component compatibility
export const getTestimonials = () => testimonialService.getAll();