import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    location: 'New York, USA',
    rating: 5,
    text: 'Finally found authentic masala peanuts! The quality is amazing and they taste exactly like the ones I had growing up in Mumbai. Fast shipping too!',
    verified: true,
    date: '2 weeks ago',
  },
  {
    id: 2,
    name: 'Raj Patel',
    location: 'Toronto, Canada',
    rating: 5,
    text: 'Ordered the spicy mixture and namkeen mix. Both were fresh, crispy, and packed with flavor. My whole family loved them. Will definitely order again!',
    verified: true,
    date: '1 month ago',
  },
  {
    id: 3,
    name: 'Sarah Johnson',
    location: 'London, UK',
    rating: 5,
    text: 'As someone who loves trying new snacks, I was impressed by the variety and quality. The roasted cashews are premium quality. Highly recommend!',
    verified: true,
    date: '3 weeks ago',
  },
  {
    id: 4,
    name: 'Amit Kumar',
    location: 'Sydney, Australia',
    rating: 5,
    text: 'Best Indian snacks I\'ve found online. The packaging was excellent and everything arrived fresh. The chakli brought back so many memories!',
    verified: true,
    date: '1 week ago',
  },
  {
    id: 5,
    name: 'Lisa Chen',
    location: 'San Francisco, USA',
    rating: 5,
    text: 'I\'ve tried many online stores for Indian snacks, but this one stands out. Authentic taste, great prices, and reliable delivery. 5 stars!',
    verified: true,
    date: '2 weeks ago',
  },
  {
    id: 6,
    name: 'Mohammed Ali',
    location: 'Dubai, UAE',
    rating: 5,
    text: 'The almond mix is incredible! Perfect balance of sweet and savory. Customer service was also very helpful when I had questions about shipping.',
    verified: true,
    date: '1 month ago',
  },
];

/**/ **
* Renders a testimonials section with customer quotes and ratings.
* @example
* Testimonials()
* <section>...</section>
* @param {{void}} {{none}} - No parameters.
* @returns {{JSX.Element}} JSX element with testimonial content.
**/*/
export default function Testimonials() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-gray-600 text-lg">
            Join thousands of satisfied customers worldwide
          </p>
          <div className="flex items-center justify-center mt-4 space-x-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-gray-700 font-semibold">4.9/5</span>
            <span className="text-gray-500">from 2,847 reviews</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start mb-4">
                <Quote className="w-8 h-8 text-primary-600 opacity-50 mr-2 shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic leading-relaxed">{testimonial.text}</p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
                {testimonial.verified && (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-semibold">
                    Verified Purchase
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-400 mt-2">{testimonial.date}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

