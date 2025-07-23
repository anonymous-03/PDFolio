// pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiPlus,
  FiGrid,
  FiList,
  FiSearch,
  FiFilter,
  FiMoreVertical,
  FiEdit2,
  FiTrash2,
  FiCopy,
  FiExternalLink,
  FiBarChart,
  FiCalendar,
  FiEye,
  FiDownload,
  FiShare2,
  FiUpload,
  FiLogOut
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import api from '../api';

const Dashboard = () => {
  const { user,logout } = useAuth();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalViews: 1,
    portfolioCount: 0,
    downloads: 0,
    shares: 0
  });
  
  const [uploading, setUploading] = useState(false);

  // Fetch portfolios and stats on component mount
  useEffect(() => {
    fetchPortfolios();
  }, []);

  const fetchPortfolios = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/api/portfolios');
      // console.log(response.data);
      if (response.data) {
        setPortfolios(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch portfolios:', error);
      setError('Failed to load portfolios. Please try again.');
    } finally {
      setLoading(false);
    }
  };



  const handleCreateNewPortfolio = () => {
    // Check if user has reached portfolio limit based on plan
    const portfolioLimit = user?.plan === 'free' ? 3 : user?.plan === 'pro' ? 10 : Infinity;

    if (portfolios.length >= portfolioLimit) {
      alert(`You've reached the maximum number of portfolios for your ${user?.plan} plan. Please upgrade to create more.`);
      navigate('/pricing');
      return;
    }

    // Navigate to create portfolio page
    navigate('/upload');
  };


  const handlePortfolioAction = async (action, portfolio) => {
    setSelectedPortfolio(null);

    switch (action) {

      case 'view':
        window.open(`${window.location.origin}/portfolio/${portfolio.template}/${user._id}`, '_blank');
        break;

      case 'share':
        navigator.clipboard.writeText(`${window.location.origin}/portfolio/${portfolio.url}`);
        setStats(prevStats => ({
          ...prevStats,shares: prevStats.shares + 1
        }));
        alert('Portfolio link copied to clipboard!');
        break;

    }
  };

  const filteredPortfolios = portfolios.filter(portfolio =>
    portfolio.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const statsData = [
    {
      label: 'Total Views',
      value: stats.totalViews?.toLocaleString() || '1',
      change: '+12%',
      icon: <FiEye className="w-5 h-5" />,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      label: 'Portfolios',
      value: portfolios.length,
      change: user?.plan === 'free' ? `${3 - portfolios.length} left` : 'Unlimited',
      icon: <FiGrid className="w-5 h-5" />,
      color: 'text-purple-600 bg-purple-100'
    },
    {
      label: 'Downloads',
      value: 'Download nahi hogaa bhai',
      change: '+8%',
      icon: <FiDownload className="w-5 h-5" />,
      color: 'text-green-600 bg-green-100'
    },
    {
      label: 'Shares',
      value: '0',
      change: '+23%',
      icon: <FiShare2 className="w-5 h-5" />,
      color: 'text-orange-600 bg-orange-100'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user?.name?.split(' ')[0] || 'there'}!
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your portfolios and track their performance
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* Hidden file input */}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCreateNewPortfolio}
                className="button-primary flex items-center"
              >
                <FiPlus className="w-5 h-5 mr-2" />
                Create New Portfolio
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => logout()}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <FiLogOut className="w-5 h-5" />
                Logout
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  {stat.icon}
                </div>
                <span className="text-sm text-green-600 font-medium">
                  {stat.change}
                </span>
              </div>
              <h3 className={`${stat.label==='Downloads'?'text-md':'text-2xl'} font-bold text-gray-900`}>{stat.value}</h3>
              <p className="text-gray-600 text-sm mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Portfolios Section */}
        <div className="bg-white rounded-xl shadow-sm">
          {/* Toolbar */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-bold text-gray-900">My Portfolios</h2>
                <div className="flex items-center bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
                  >
                    <FiGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
                  >
                    <FiList className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search portfolios..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <FiFilter className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Portfolios Grid/List */}
          <div className="p-6">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {portfolios.map((portfolio, index) => (
                  <motion.div
                    key={portfolio._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-all group"
                  >
                    {/* Thumbnail */}
                    <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100">
                      <img
                        src={portfolio.thumbnail || 'https://placehold.net/4.png'}
                        alt={portfolio.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-all flex gap-2">
                      
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handlePortfolioAction('view', portfolio)}
                            className="p-2 bg-white rounded-lg text-gray-700"
                          >
                            <FiExternalLink className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>
                      {/* Status Badge */}
                      <div className="absolute top-4 right-4">
                        <span className={`bg-green-100 text-green-700`}>
                          Published
                      </span>
                    </div>
                  </div>

                    {/* Content */ }
                  < div className = "p-4" >
                      <h3 className="font-semibold text-gray-900 mb-1">{portfolio.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">Template: {portfolio.template}</p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center">
                            <FiEye className="w-4 h-4 mr-1" />
                            {portfolio.views || 0}
                          </span>
                          <span className="flex items-center">
                            <FiCalendar className="w-4 h-4 mr-1" />
                            {new Date(portfolio.updatedAt || portfolio.lastUpdated).toLocaleDateString()}
                          </span>
                        </div>
                        <button
                          onClick={() => setSelectedPortfolio(portfolio)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <FiMoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}

          {/* Add New Portfolio Card */}
          {portfolios.length < (user?.plan === 'free' ? 3 : 999) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: filteredPortfolios.length * 0.1 }}
              className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors cursor-pointer group"
            >
              <div
                onClick={handleCreateNewPortfolio}
                className="flex flex-col items-center justify-center h-full min-h-[300px] p-6"
              >
                <div className="p-4 bg-gray-100 rounded-full group-hover:bg-blue-100 transition-colors mb-4">
                  <FiPlus className="w-8 h-8 text-gray-400 group-hover:text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-700 group-hover:text-blue-600">Create New Portfolio</h3>
                <p className="text-sm text-gray-500 mt-1">Start from scratch or import resume</p>
              </div>
            </motion.div>
          )}
        </div>
        ) : (
        /* List View */
        <div className="space-y-4">
          {filteredPortfolios.map((portfolio) => (
            <motion.div
              key={portfolio._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                                    <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg overflow-hidden">
                    <img
                      src={portfolio.thumbnail || 'https://placehold.net/4.png'}
                      alt={portfolio.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{portfolio.title}</h3>
                    <p className="text-sm text-gray-600">Template: {portfolio.template}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center">
                        <FiEye className="w-4 h-4 mr-1" />
                        {portfolio.views || 0} views
                      </span>
                      <span className="flex items-center">
                        <FiCalendar className="w-4 h-4 mr-1" />
                        Updated {new Date(portfolio.updatedAt || portfolio.lastUpdated).toLocaleDateString()}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700`}>
                        Published
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handlePortfolioAction('view', portfolio)}
                    className="p-2 text-gray-600 hover:bg-white rounded-lg transition-colors"
                  >
                    <FiExternalLink className="w-4 h-4" />
                  </motion.button>
                  <button
                    onClick={() => setSelectedPortfolio(portfolio)}
                    className="p-2 text-gray-600 hover:bg-white rounded-lg transition-colors"
                  >
                    <FiMoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        )}
        

        {/* Empty State */}
        {filteredPortfolios.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="p-4 bg-gray-100 rounded-full inline-flex mb-4">
              <FiGrid className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {searchQuery ? 'No portfolios found' : 'No portfolios yet'}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchQuery
                ? 'Try adjusting your search terms'
                : 'Create your first portfolio to get started'}
            </p>
            {!searchQuery && (
              <div className="flex items-center justify-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCreateNewPortfolio}
                  className="button-primary flex items-center"
                >
                  <FiPlus className="w-5 h-5 mr-2" />
                  Create Portfolio
                </motion.button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
      </div >

  {/* Action Menu Modal */ }
{
  selectedPortfolio && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={() => setSelectedPortfolio(null)}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Portfolio Actions
        </h3>
        <div className="space-y-2">
          <button
            onClick={() => handlePortfolioAction('share', selectedPortfolio)}
            className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
          >
            <FiShare2 className="w-5 h-5 text-gray-600" />
            <span>Share Portfolio</span>
          </button>
          <hr className="my-2" />
          
        </div>
      </motion.div>
    </motion.div>
  )
}

    </div >
  );
};

export default Dashboard;