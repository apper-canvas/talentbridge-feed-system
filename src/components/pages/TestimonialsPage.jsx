import React, { useState, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';
import { toast } from 'react-toastify';
import { getTestimonials } from '@/services/api/testimonialService';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';

const TestimonialsPage = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getTestimonials();
        setTestimonials(data || []);
      } catch (err) {
        setError(err.message || 'Failed to fetch testimonials');
        toast.error('Failed to load testimonials');
        console.error('Testimonials fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  if (!testimonials?.length) return <Empty message="No testimonials available" />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Users Say
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover how TalentBridge has helped professionals and companies
            connect and grow together.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
            >
              {/* Quote Icon */}
              <div className="mb-4">
                <Quote className="w-8 h-8 text-blue-600 opacity-20" />
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.content || testimonial.message || testimonial.text}"
              </p>

              {/* Rating */}
              {testimonial.rating && (
                <div className="flex items-center mb-4">
                  {renderStars(testimonial.rating)}
                  <span className="ml-2 text-sm text-gray-600">
                    ({testimonial.rating}/5)
                  </span>
                </div>
              )}

              {/* Author Info */}
              <div className="flex items-center">
                {testimonial.avatar ? (
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name || 'User'}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center mr-4">
                    <span className="text-white font-semibold">
                      {(testimonial.name || 'U').charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {testimonial.name || 'Anonymous'}
                  </h4>
                  {testimonial.position && (
                    <p className="text-sm text-gray-600">
                      {testimonial.position}
                      {testimonial.company && ` at ${testimonial.company}`}
                    </p>
                  )}
                  {testimonial.location && (
                    <p className="text-xs text-gray-500">
                      {testimonial.location}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-blue-50 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Share Your Success Story?
            </h3>
            <p className="text-gray-600 mb-6">
              Join thousands of professionals who have found their dream jobs
              through TalentBridge.
            </p>
            <button
              onClick={() => toast.info('Contact form coming soon!')}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold"
            >
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsPage;