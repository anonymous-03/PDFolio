// components/PricingSection.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiCheck, 
  FiX, 
  FiZap, 
  FiStar, 
  FiTrendingUp,
  FiShield,
  FiHelpCircle,
  FiArrowRight
} from 'react-icons/fi';

const PricingSection = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [hoveredPlan, setHoveredPlan] = useState(null);

  const plans = [
    {
      id: 'free',
      name: 'Free',
      icon: <FiStar className="w-6 h-6" />,
      description: 'Perfect for trying out our platform',
      price: {
        monthly: 0,
        yearly: 0
      },
      features: [
        { text: '1 Portfolio Website', included: true },
        { text: 'Basic Templates', included: true },
        { text: 'AI Resume Parsing', included: true },
        { text: 'Basic Customization', included: true },
        { text: 'ResumeBuildr Subdomain', included: true },
        { text: 'SSL Certificate', included: true },
        { text: 'Custom Domain', included: false },
        { text: 'Advanced Analytics', included: false },
        { text: 'Priority Support', included: false },
        { text: 'Remove Branding', included: false }
      ],
      cta: 'Get Started',
      popular: false
    },
    {
      id: 'pro',
      name: 'Pro',
      icon: <FiZap className="w-6 h-6" />,
      description: 'For professionals serious about their online presence',
      price: {
        monthly: 19,
        yearly: 190
      },
      features: [
        { text: '5 Portfolio Websites', included: true },
        { text: 'All Premium Templates', included: true },
        { text: 'Advanced AI Parsing', included: true },
        { text: 'Full Customization', included: true },
        { text: 'Custom Domain', included: true },
        { text: 'Advanced Analytics', included: true },
        { text: 'SEO Optimization', included: true },
        { text: 'Priority Support', included: true },
        { text: 'Remove Branding', included: true },
        { text: 'Export as HTML/CSS', included: false }
      ],
      cta: 'Start Pro Trial',
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      icon: <FiTrendingUp className="w-6 h-6" />,
      description: 'Custom solutions for teams and organizations',
      price: {
        monthly: 'Custom',
        yearly: 'Custom'
      },
      features: [
        { text: 'Unlimited Portfolios', included: true },
        { text: 'Custom Templates', included: true },
        { text: 'White Label Solution', included: true },
        { text: 'API Access', included: true },
        { text: 'Dedicated Support', included: true },
        { text: 'Team Collaboration', included: true },
        { text: 'Advanced Security', included: true },
        { text: 'SLA Guarantee', included: true },
        { text: 'Custom Integrations', included: true },
        { text: 'Training & Onboarding', included: true }
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  const faqs = [
    {
      question: 'Can I change plans later?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and wire transfers for enterprise.'
    },
    {
      question: 'Is there a free trial for Pro plan?',
      answer: 'Yes, we offer a 14-day free trial for the Pro plan with full features.'
    },
    {
      question: 'Can I cancel anytime?',
      answer: 'Absolutely! You can cancel your subscription at any time, no questions asked.'
    }
  ];

  const calculatePrice = (plan) => {
    if (plan.price.monthly === 'Custom') return 'Custom Pricing';
    
    const price = billingCycle === 'monthly' 
      ? plan.price.monthly 
      : Math.round(plan.price.yearly / 12);
    
    return price === 0 ? 'Free' : `$${price}`;
  };

  const getSavings = (plan) => {
    if (plan.price.monthly === 'Custom' || plan.price.monthly === 0) return null;
    
    const yearlyMonthly = Math.round(plan.price.yearly / 12);
    const savings = Math.round(((plan.price.monthly - yearlyMonthly) / plan.price.monthly) * 100);
    
    return savings > 0 ? `Save ${savings}%` : null;
  };

  return (
    <section id="pricing" className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4">
            <span className="gradient-text">Choose Your Perfect Plan</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Start free and scale as you grow. No hidden fees, cancel anytime.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-white rounded-full p-1 shadow-lg">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-8 py-3 rounded-full text-sm font-semibold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-8 py-3 rounded-full text-sm font-semibold transition-all ${
                billingCycle === 'yearly'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Yearly
              <span className="ml-2 inline-block px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setHoveredPlan(plan.id)}
              onMouseLeave={() => setHoveredPlan(null)}
              className={`relative bg-white rounded-2xl transition-all duration-300 ${
                plan.popular ? 'ring-2 ring-blue-600 shadow-2xl transform scale-105' : 'shadow-lg'
              } ${
                hoveredPlan === plan.id ? 'card-hover shadow-2xl' : ''
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-8">
                {/* Plan Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="p-3 bg-gradient-to-br from-blue-100 to-purple-100 text-blue-600 rounded-xl mr-3">
                      {plan.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                  </div>
                  {plan.id === 'enterprise' && (
                    <FiShield className="w-5 h-5 text-gray-400" />
                  )}
                </div>

                <p className="text-gray-600 mb-6">{plan.description}</p>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-5xl font-bold gradient-text">
                      {calculatePrice(plan)}
                    </span>
                    {plan.price.monthly !== 'Custom' && plan.price.monthly !== 0 && (
                      <span className="ml-2 text-gray-600">/month</span>
                    )}
                  </div>
                  {billingCycle === 'yearly' && getSavings(plan) && (
                    <p className="text-sm text-green-600 mt-1">{getSavings(plan)}</p>
                  )}
                </div>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 px-6 rounded-full font-semibold transition-all flex items-center justify-center ${
                    plan.popular
                      ? 'button-primary'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {plan.cta}
                  <FiArrowRight className="ml-2 w-4 h-4" />
                </motion.button>

                {/* Features */}
                <div className="mt-8 space-y-4">
                  <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                    What's included
                  </h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        {feature.included ? (
                          <FiCheck className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                        ) : (
                          <FiX className="w-5 h-5 text-gray-300 mt-0.5 mr-3 flex-shrink-0" />
                        )}
                        <span className={`text-sm ${
                          feature.included ? 'text-gray-700' : 'text-gray-400'
                        }`}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h3 className="text-3xl font-bold text-center mb-12">
            <span className="gradient-text">Frequently Asked Questions</span>
          </h3>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start">
                  <FiHelpCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">{faq.question}</h4>
                    <p className="text-gray-600 text-sm">{faq.answer}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="flex items-center">
              <FiShield className="w-5 h-5 text-gray-400 mr-2" />
              <span className="text-sm text-gray-600">SSL Secured</span>
            </div>
            <div className="flex items-center">
              <FiZap className="w-5 h-5 text-gray-400 mr-2" />
              <span className="text-sm text-gray-600">99.9% Uptime</span>
            </div>
            <div className="flex items-center">
              <FiStar className="w-5 h-5 text-gray-400 mr-2" />
              <span className="text-sm text-gray-600">4.9/5 Rating</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;