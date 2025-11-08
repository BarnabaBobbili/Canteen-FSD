import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { ArrowLeft, User, Package, Heart, LogOut } from 'lucide-react';
import OrderHistory from './OrderHistory';
import FavoriteItems from './FavoriteItems';
import ProfileDetails from './ProfileDetails';
import {
  fetchOrderHistory,
  fetchUserProfile,
  updateUserProfile,
  getFavorites,
  toggleFavorite
} from './profileService';

/**
 * Main User Profile Page Orchestrator
 * Displays order history, favorites, and profile management
 */
const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    loadProfileData();
    loadFavorites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, navigate]);

  const loadProfileData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      // Load orders and profile in parallel
      const [ordersData, userProfile] = await Promise.all([
        fetchOrderHistory(token),
        fetchUserProfile(token).catch(() => user) // Fallback to current user if API fails
      ]);

      setOrders(ordersData || []);
      setProfileData(userProfile || user);
    } catch (error) {
      console.error('Failed to load profile data:', error);
      // Use current user data as fallback
      setProfileData(user);
    } finally {
      setLoading(false);
    }
  };

  const loadFavorites = () => {
    const favs = getFavorites();
    setFavorites(favs);
  };

  const handleUpdateProfile = async (updatedData) => {
    try {
      setUpdating(true);
      const token = localStorage.getItem('token');
      const result = await updateUserProfile(updatedData, token);

      setProfileData(result);
      alert('Profile updated successfully!');
      return true;
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('Failed to update profile. Please try again.');
      return false;
    } finally {
      setUpdating(false);
    }
  };

  const handleRemoveFavorite = (itemId) => {
    const updatedFavorites = toggleFavorite(itemId);
    setFavorites(updatedFavorites);
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
      navigate('/');
    }
  };

  const tabs = [
    { id: 'orders', label: 'Order History', icon: Package },
    { id: 'favorites', label: 'Favorites', icon: Heart },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <div className="min-h-screen bg-white relative" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h100v100H0z' fill='%23fafafa'/%3E%3Cpath d='M10 10h80v80H10z' fill='none' stroke='%23e5e5e5' stroke-width='0.5'/%3E%3C/svg%3E")`,
      fontFamily: '"Comic Sans MS", "Marker Felt", cursive'
    }}>
      {/* Header */}
      <div className="bg-white border-b-4 border-gray-900 shadow-[0px_4px_0px_0px_rgba(0,0,0,0.2)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/order')}
                className="p-2 border-2 border-gray-900 hover:bg-gray-100 transition-all transform hover:-rotate-3"
              >
                <ArrowLeft className="w-6 h-6 text-gray-900" />
              </button>
              <div>
                <h1 className="text-2xl font-black text-gray-900">My Profile</h1>
                <p className="text-gray-600 text-sm font-medium">Welcome back, {user?.name}!</p>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-gray-900 border-4 border-gray-900 text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,0.4)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.6)] transition-all font-black transform hover:scale-105 hover:rotate-1"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Tabs */}
        <div className="mb-6 bg-white border-4 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] p-2 flex gap-2 overflow-x-auto transform -rotate-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 font-black whitespace-nowrap transition-all border-3 transform ${
                  activeTab === tab.id
                    ? 'bg-gray-900 border-gray-900 text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] scale-105 rotate-1'
                    : 'bg-white border-gray-900 text-gray-900 hover:bg-gray-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)] hover:-rotate-1'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="mb-8">
          {activeTab === 'orders' && (
            <OrderHistory orders={orders} loading={loading} />
          )}

          {activeTab === 'favorites' && (
            <FavoriteItems
              favoriteIds={favorites}
              onRemoveFavorite={handleRemoveFavorite}
            />
          )}

          {activeTab === 'profile' && (
            <ProfileDetails
              user={profileData || user}
              onUpdate={handleUpdateProfile}
              updating={updating}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
