const validators = {
  required: (value) => {
    if (!value || (typeof value === 'string' && !value.trim())) {
      return 'This field is required';
    }
    return null;
  },

  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address';
    }
    return null;
  },

  minLength: (minLength) => (value) => {
    if (value && value.length < minLength) {
      return `Must be at least ${minLength} characters long`;
    }
    return null;
  },

  maxLength: (maxLength) => (value) => {
    if (value && value.length > maxLength) {
      return `Must be no more than ${maxLength} characters long`;
    }
    return null;
  },

  url: (value) => {
    try {
      new URL(value);
      return null;
    } catch {
      return 'Please enter a valid URL';
    }
  },

  number: (value) => {
    if (isNaN(value) || isNaN(parseFloat(value))) {
      return 'Please enter a valid number';
    }
    return null;
  },

positiveNumber: (value) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue <= 0) {
      return 'Please enter a positive number';
    }
    return null;
  },
skillName: (value) => {
    if (value && typeof value === 'string') {
      const trimmed = value.trim();
      if (trimmed.length < 2) {
        return 'Skill must be at least 2 characters long';
      }
      if (trimmed.length > 50) {
        return 'Skill must be no more than 50 characters long';
      }
      if (!/^[a-zA-Z0-9\s\-+.#]+$/.test(trimmed)) {
        return 'Skill contains invalid characters';
      }
    }
    return null;
  },

  skillsList: (value) => {
    if (!Array.isArray(value)) {
      return 'Skills must be provided as an array';
    }
    if (value.length > 20) {
      return 'Maximum 20 skills allowed';
    }
    for (const skill of value) {
      const error = validators.skillName(skill);
      if (error) {
        return `Invalid skill "${skill}": ${error}`;
      }
    }
    return null;
  },
};

export const validateField = (value, validationRules) => {
  for (const rule of validationRules) {
    const error = rule(value);
    if (error) {
      return error;
    }
  }
  return null;
};

export const validateForm = (formData, validationSchema) => {
  const errors = {};
  
  Object.keys(validationSchema).forEach(field => {
    const rules = validationSchema[field];
    const error = validateField(formData[field], rules);
    if (error) {
      errors[field] = error;
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export default validators;