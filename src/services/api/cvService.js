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
  },

  async generateResume(userData) {
    await delay(500);
    
    const resumeData = {
      Id: nextId++,
      ...userData,
      generatedAt: new Date().toISOString(),
      template: 'professional',
      sections: {
        personalInfo: {
          name: userData.fullName,
          email: userData.email,
          phone: userData.phone,
          position: userData.position
        },
        experience: userData.experience,
        skills: userData.skills?.split(',').map(skill => skill.trim()) || [],
        education: 'Bachelor\'s Degree in Computer Science',
        summary: `Experienced ${userData.position} with ${userData.experience} of professional experience.`
      }
    };
    
    return { ...resumeData };
  },

  async downloadResume(userData) {
    await delay(300);
    
    // Import jsPDF dynamically to avoid SSR issues
    const { default: jsPDF } = await import('jspdf');
    
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    let yPosition = 30;
    
    // Header
    doc.setFontSize(24);
    doc.setFont(undefined, 'bold');
    doc.text(userData.fullName || 'Your Name', margin, yPosition);
    
    yPosition += 10;
    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');
    doc.text(userData.email || 'email@example.com', margin, yPosition);
    
    if (userData.phone) {
      yPosition += 6;
      doc.text(userData.phone, margin, yPosition);
    }
    
    // Position
    yPosition += 20;
    doc.setFontSize(16);
    doc.setFont(undefined, 'bold');
    doc.text('Target Position', margin, yPosition);
    
    yPosition += 8;
    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');
    doc.text(userData.position || 'Software Developer', margin, yPosition);
    
    // Experience
    if (userData.experience) {
      yPosition += 20;
      doc.setFontSize(16);
      doc.setFont(undefined, 'bold');
      doc.text('Experience', margin, yPosition);
      
      yPosition += 8;
      doc.setFontSize(12);
      doc.setFont(undefined, 'normal');
      doc.text(userData.experience, margin, yPosition);
    }
    
    // Skills
    if (userData.skills) {
      yPosition += 20;
      doc.setFontSize(16);
      doc.setFont(undefined, 'bold');
      doc.text('Skills', margin, yPosition);
      
      yPosition += 8;
      doc.setFontSize(12);
      doc.setFont(undefined, 'normal');
      const skills = userData.skills.split(',').map(skill => skill.trim()).join(', ');
      const splitSkills = doc.splitTextToSize(skills, pageWidth - 2 * margin);
      doc.text(splitSkills, margin, yPosition);
    }
    
    // Save the PDF
    doc.save(`${userData.fullName?.replace(/\s+/g, '_') || 'Resume'}.pdf`);
return true;
  }
};