import React from 'react';

const testimonials = [
  {
    name: 'Rahul Sharma',
    role: 'Content Creator',
    content: 'The AI reels I purchased have completely changed my social media strategy. The quality is amazing and my engagement has gone up by 300%!',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    name: 'Priya Patel',
    role: 'Entrepreneur',
    content: 'I was skeptical at first, but the premium software I bought has streamlined my workflow and saved me countless hours. Totally worth the investment!',
    image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    name: 'Aditya Verma',
    role: 'Data Analyst',
    content: 'The data sets I purchased were comprehensive and well-organized. They provided exactly the insights I needed for my research project.',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=600'
  }
];

const Testimonials: React.FC = () => {
  return (
    <div id="testimonials" className="py-16 bg-gradient-to-br from-indigo-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it — hear from the people who have purchased and used our digital products.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-xl shadow-md relative"
            >
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="h-16 w-16 rounded-full border-4 border-white object-cover"
                />
              </div>
              <div className="pt-12 text-center">
                <p className="text-gray-600 italic mb-6">"{testimonial.content}"</p>
                <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                <p className="text-sm text-indigo-600">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;