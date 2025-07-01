import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import { toast } from 'react-toastify';

const MissionVisionPage = () => {
  const values = [
    {
      icon: 'Target',
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, from our platform features to customer service.'
    },
    {
      icon: 'Users',
      title: 'Inclusivity',
      description: 'We believe in creating opportunities for everyone, regardless of background or experience level.'
    },
    {
      icon: 'Shield',
      title: 'Integrity',
      description: 'We maintain the highest standards of honesty and transparency in all our interactions.'
    },
    {
      icon: 'Zap',
      title: 'Innovation',
      description: 'We continuously innovate to provide cutting-edge solutions for job seekers and employers.'
    },
    {
      icon: 'Heart',
      title: 'Empathy',
      description: 'We understand the challenges of job searching and hiring, and we care about making it better.'
    },
    {
      icon: 'Globe',
      title: 'Impact',
      description: 'We aim to make a positive impact on careers and communities around the world.'
    }
  ];

  const milestones = [
    {
      year: '2020',
      title: 'Founded',
      description: 'TalentBridge was born from the vision to revolutionize how people find careers.',
      icon: 'Rocket'
    },
    {
      year: '2021',
      title: 'First 1000 Users',
      description: 'Reached our first milestone with 1,000 successful job placements.',
      icon: 'Users'
    },
    {
      year: '2022',
      title: 'Partnership Network',
      description: 'Established partnerships with 50+ leading companies across industries.',
      icon: 'Handshake'
    },
    {
      year: '2023',
      title: 'Global Expansion',
      description: 'Expanded our services to serve job seekers and employers worldwide.',
      icon: 'Globe'
    },
    {
      year: '2024',
      title: 'AI Integration',
      description: 'Launched AI-powered matching to connect talent with perfect opportunities.',
      icon: 'Brain'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Our Mission & Vision
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Empowering careers, connecting dreams, and building the future of work through innovative technology and human-centered design.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-3xl p-12 shadow-xl border border-gray-100"
            >
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mr-6">
                  <ApperIcon name="Target" className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                To bridge the gap between exceptional talent and remarkable opportunities by providing an innovative, user-friendly platform that simplifies the job search and hiring process.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We are committed to democratizing access to career opportunities, ensuring that every individual has the tools and resources needed to achieve their professional aspirations, while helping companies find the perfect talent to drive their success.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white rounded-3xl p-12 shadow-xl border border-gray-100"
            >
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mr-6">
                  <ApperIcon name="Eye" className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                To become the world's most trusted and innovative career platform, where every professional journey is supported, every talent is recognized, and every opportunity leads to meaningful growth.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We envision a future where geographical boundaries don't limit career potential, where skills and passion matter more than credentials, and where technology enhances rather than replaces the human element in career development.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These principles guide every decision we make and every feature we build.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 rounded-2xl p-8 hover:bg-white hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <ApperIcon name={value.icon} className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From a simple idea to a global platform - here's how we've grown.
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-blue-500 to-purple-600"></div>
            
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'} mb-12`}
              >
                <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                    <div className="flex items-center mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center ${index % 2 === 0 ? 'ml-auto mr-4' : 'mr-auto ml-4'}`}>
                        <ApperIcon name={milestone.icon} className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-600">{milestone.year}</div>
                        <h3 className="text-xl font-bold text-gray-900">{milestone.title}</h3>
                      </div>
                    </div>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>
                
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white"
          >
            <h2 className="text-3xl font-bold mb-6">Join Our Mission</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Whether you're looking for your dream job or the perfect candidate, let's build the future of work together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="secondary"
                size="lg"
                icon="Search"
                className="px-8 py-4 bg-white text-blue-600 hover:bg-gray-100"
                onClick={() => window.location.href = '/jobs'}
              >
                Find Jobs
              </Button>
              <Button
                variant="outline"
                size="lg"
                icon="Plus"
                className="px-8 py-4 border-white text-white hover:bg-white hover:text-blue-600"
                onClick={() => window.location.href = '/employers'}
              >
                Post Jobs
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default MissionVisionPage;