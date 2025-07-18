// pages/Dashboard.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
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
  FiShare2
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);

  // Mock portfolio data
  const [portfolios] = useState([
    {
      id: 1,
      title: 'Software Developer Portfolio',
      template: 'Modern Tech',
      url: 'john-doe-dev',
      views: 1234,
      lastUpdated: '2024-01-20',
      thumbnail: 'https://via.placeholder.com/400x300',
      isPublished: true
    },
    {
      id: 2,
      title: 'Creative Designer Portfolio',
      template: 'Creative Pro',
      url: 'john-designer',
      views: 856,
      lastUpdated: '2024-01-18',
      thumbnail: 'https://via.placeholder.com/400x300',
      isPublished: true
    },
    {
      id: 3,
      title: 'Freelance Portfolio',
      template: 'Minimal Clean',
      url: 'john-freelance',
      views: 432,
      lastUpdated: '2024-01-15',
      thumbnail: 'https://via.placeholder.com/400x300',
      isPublished: false
    }
  ]);

  const stats = [
    { 
      label: 'Total Views', 
      value: '2,522', 
      change: '+12%', 
      icon: <FiEye className="w-5 h-5" />,
      color: 'text-blue-600 bg-blue-100'
    },
    { 
      label: 'Portfolios', 
      value: portfolios.length, 
      change: `${3 - portfolios.length} left`, 
      icon: <FiGrid className="w-5 h-5" />,
      color: 'text-purple-600 bg-purple-100'
    },
    { 
      label: 'Downloads', 
      value: '156', 
      change: '+8%', 
      icon: <FiDownload className="w-5 h-5" />,
      color: 'text-green-600 bg-green-100'
    },
    { 
      label: 'Shares', 
      value: '89', 
      change: '+23%', 
      icon: <FiShare2 className="w-5 h-5" />,
      color: 'text-orange-600 bg-orange-100'
    }
  ];

  const filteredPortfolios = portfolios.filter(portfolio =>
    portfolio.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user?.name?.split(' ')[0]}!
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your portfolios and track their performance
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="button-primary flex items-center"
            >
              <FiPlus className="w-5 h-5 mr-2" />
              Create New Portfolio
            </motion.button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
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
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-gray-600 text-sm mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

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
                {filteredPortfolios.map((portfolio, index) => (
                  <motion.div
                    key={portfolio.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-all group"
                  >
                    {/* Thumbnail */}
                    <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100">
                      <img
                        src={portfolio.thumbnail}
                        alt={portfolio.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-all flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 bg-white rounded-lg text-gray-700"
                          >
                            <FiEdit2 className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 bg-white rounded-lg text-gray-700"
                          >
                            <FiExternalLink className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 bg-white rounded-lg text-gray-700"
                          >
                            <FiBarChart className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>
                      {/* Status Badge */}
                      <div className="absolute top-4 right-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          portfolio.isPublished 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {portfolio.isPublished ? 'Published' : 'Draft'}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-1">{portfolio.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">Template: {portfolio.template}</p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center">
                            <FiEye className="w-4 h-4 mr-1" />
                            {portfolio.views}
                          </span>
                          <span className="flex items-center">
                            <FiCalendar className="w-4 h-4 mr-1" />
                            {new Date(portfolio.lastUpdated).toLocaleDateString()}
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
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: filteredPortfolios.length * 0.1 }}
                  className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors cursor-pointer group"
                >
                  <Link to="/create-portfolio" className="flex flex-col items-center justify-center h-full min-h-[300px] p-6">
                    <div className="p-4 bg-gray-100 rounded-full group-hover:bg-blue-100 transition-colors mb-4">
                      <FiPlus className="w-8 h-8 text-gray-400 group-hover:text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-700 group-hover:text-blue-600">Create New Portfolio</h3>
                    <p className="text-sm text-gray-500 mt-1">Start from scratch or import resume</p>
                  </Link>
                </motion.div>
              </div>
            ) : (
              /* List View */
              <div className="space-y-4">
                {filteredPortfolios.map((portfolio) => (
                  <motion.div
                    key={portfolio.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg overflow-hidden">
                          <img
                            src={portfolio.thumbnail}
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
                              {portfolio.views} views
                            </span>
                            <span className="flex items-center">
                              <FiCalendar className="w-4 h-4 mr-1" />
                              Updated {new Date(portfolio.lastUpdated).toLocaleDateString()}
                            </span>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              portfolio.isPublished 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {portfolio.isPublished ? 'Published' : 'Draft'}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 text-gray-600 hover:bg-white rounded-lg transition-colors"
                        >
                          <FiEdit2 className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 text-gray-600 hover:bg-white rounded-lg transition-colors"
                        >
                          <FiExternalLink className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 text-gray-600 hover:bg-white rounded-lg transition-colors"
                        >
                          <FiBarChart className="w-4 h-4" />
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
          </div>
        </div>
      </div>

      {/* Action Menu Modal */}
      {selectedPortfolio && (
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
              <button className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                <FiEdit2 className="w-5 h-5 text-gray-600" />
                <span>Edit Portfolio</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                <FiCopy className="w-5 h-5 text-gray-600" />
                <span>Duplicate</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                <FiDownload className="w-5 h-5 text-gray-600" />
                <span>Download as HTML</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                <FiShare2 className="w-5 h-5 text-gray-600" />
                <span>Share Portfolio</span>
              </button>
              <hr className="my-2" />
              <button className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-red-50 rounded-lg transition-colors text-red-600">
                <FiTrash2 className="w-5 h-5" />
                <span>Delete Portfolio</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Dashboard;