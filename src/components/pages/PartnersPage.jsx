import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import { partnerService } from '@/services/api/partnerService';

const PartnersPage = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPartners();
  }, []);

  const loadPartners = async () => {
    try {
      setLoading(true);
      const data = await partnerService.getAll();
      setPartners(data);
    } catch (err) {
      setError('Failed to load partners');
      toast.error('Failed to load partners');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadPartners} />;

  const featuredPartners = partners.filter(p => p.featured);
  const allPartners = partners.filter(p => !p.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Trusted Partners
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We collaborate with industry-leading companies to bring you the best job opportunities and career growth prospects.
          </p>
        </motion.div>

        {/* Featured Partners */}
        {featuredPartners.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Featured Partners</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPartners.map((partner, index) => (
                <motion.div
                  key={partner.Id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group cursor-pointer"
                >
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl group-hover:scale-110 transition-transform duration-300">
                      {partner.logo || partner.name.charAt(0)}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{partner.name}</h3>
                    <p className="text-gray-600 mb-4">{partner.industry}</p>
                    <p className="text-sm text-gray-500 mb-6">{partner.description}</p>
                    
                    <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 mb-6">
                      <div className="flex items-center">
                        <ApperIcon name="Users" className="w-4 h-4 mr-1" />
                        <span>{partner.employees}+ employees</span>
                      </div>
                      <div className="flex items-center">
                        <ApperIcon name="MapPin" className="w-4 h-4 mr-1" />
                        <span>{partner.location}</span>
                      </div>
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      icon="ExternalLink"
                      onClick={() => window.open(partner.website, '_blank')}
                      className="w-full"
                    >
                      Visit Website
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* All Partners Grid */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">All Partners</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {allPartners.map((partner, index) => (
              <motion.div
                key={partner.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 group cursor-pointer text-center"
                onClick={() => window.open(partner.website, '_blank')}
              >
                <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-r from-gray-400 to-gray-600 rounded-xl flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                  {partner.logo || partner.name.charAt(0)}
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{partner.name}</h3>
                <p className="text-xs text-gray-500">{partner.industry}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Partnership CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-20"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Become Our Partner</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join our network of trusted partners and help us connect top talent with amazing opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="secondary"
                size="lg"
                icon="Handshake"
                className="px-8 py-4 bg-white text-blue-600 hover:bg-gray-100"
                onClick={() => toast.info('Partnership inquiry form coming soon!')}
              >
                Partner With Us
              </Button>
              <Button
                variant="outline"
                size="lg"
                icon="Download"
                className="px-8 py-4 border-white text-white hover:bg-white hover:text-blue-600"
                onClick={() => toast.info('Partnership brochure download coming soon!')}
              >
                Download Brochure
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PartnersPage;