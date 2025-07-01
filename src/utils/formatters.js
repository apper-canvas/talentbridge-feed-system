import { format, formatDistanceToNow, parseISO } from 'date-fns';

export const formatSalary = (salary) => {
  if (!salary) return 'Salary not disclosed';
  
  if (salary.min && salary.max) {
    return `$${salary.min.toLocaleString()} - $${salary.max.toLocaleString()}`;
  }
  
  if (salary.amount) {
    return `$${salary.amount.toLocaleString()}`;
  }
  
  return 'Competitive salary';
};

export const formatDate = (dateString, formatString = 'MMM d, yyyy') => {
  try {
    const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
    return format(date, formatString);
  } catch (error) {
    return 'Invalid date';
  }
};

export const formatRelativeTime = (dateString) => {
  try {
    const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
    return formatDistanceToNow(date, { addSuffix: true });
  } catch (error) {
    return 'Unknown time';
  }
};

export const formatJobType = (type) => {
  const typeMap = {
    'full-time': 'Full-time',
    'part-time': 'Part-time',
    'contract': 'Contract',
    'freelance': 'Freelance',
    'internship': 'Internship',
  };
  
  return typeMap[type?.toLowerCase()] || type;
};

export const formatExperienceLevel = (level) => {
  const levelMap = {
    'entry': 'Entry Level',
    'mid': 'Mid Level',
    'senior': 'Senior Level',
    'executive': 'Executive',
  };
  
  return levelMap[level?.toLowerCase()] || level;
};