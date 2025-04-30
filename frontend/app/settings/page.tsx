'use client';

import { useState } from 'react';
import { CircleUserIcon, MoonIcon, BellIcon, KeyIcon, ShieldIcon, EyeIcon, HelpCircleIcon } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Settings</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-gray-900 border border-gray-800 rounded-md p-4 flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center mr-3">
              <CircleUserIcon className="h-6 w-6 text-gray-400" />
            </div>
            <div>
              <div className="font-medium">Guest User</div>
              <div className="text-sm text-gray-400">Connect wallet to view profile</div>
            </div>
          </div>
          
          <nav className="bg-gray-900 border border-gray-800 rounded-md overflow-hidden">
            <ul className="divide-y divide-gray-800">
              <li>
                <button className="w-full text-left py-3 px-4 flex items-center hover:bg-gray-800">
                  <CircleUserIcon className="h-5 w-5 text-gray-400 mr-3" />
                  <span>Account</span>
                </button>
              </li>
              <li>
                <button className="w-full text-left py-3 px-4 flex items-center hover:bg-gray-800 bg-gray-800">
                  <MoonIcon className="h-5 w-5 text-gray-400 mr-3" />
                  <span>Appearance</span>
                </button>
              </li>
              <li>
                <button className="w-full text-left py-3 px-4 flex items-center hover:bg-gray-800">
                  <BellIcon className="h-5 w-5 text-gray-400 mr-3" />
                  <span>Notifications</span>
                </button>
              </li>
              <li>
                <button className="w-full text-left py-3 px-4 flex items-center hover:bg-gray-800">
                  <KeyIcon className="h-5 w-5 text-gray-400 mr-3" />
                  <span>Security</span>
                </button>
              </li>
              <li>
                <button className="w-full text-left py-3 px-4 flex items-center hover:bg-gray-800">
                  <ShieldIcon className="h-5 w-5 text-gray-400 mr-3" />
                  <span>Privacy</span>
                </button>
              </li>
              <li>
                <button className="w-full text-left py-3 px-4 flex items-center hover:bg-gray-800">
                  <HelpCircleIcon className="h-5 w-5 text-gray-400 mr-3" />
                  <span>Help & Support</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
        
        {/* Main settings area */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-gray-900 border border-gray-800 rounded-md p-6">
            <h2 className="text-xl font-medium mb-4">Appearance</h2>
            
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">Theme</div>
                  <div className="text-sm text-gray-400">Choose your preferred theme</div>
                </div>
                <ThemeToggle />
              </div>
              
              <div className="border-t border-gray-800 pt-6">
                <div className="font-medium mb-4">Color Mode</div>
                <div className="grid grid-cols-3 gap-4">
                  <button className="border-2 border-blue-500 rounded-md p-4 flex items-center justify-center bg-gray-800">
                    <span>Dark</span>
                  </button>
                  <button className="border border-gray-800 rounded-md p-4 flex items-center justify-center bg-gray-900">
                    <span>Light</span>
                  </button>
                  <button className="border border-gray-800 rounded-md p-4 flex items-center justify-center bg-gray-900">
                    <span>System</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-900 border border-gray-800 rounded-md p-6">
            <h2 className="text-xl font-medium mb-4">Notifications</h2>
            
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">Email Notifications</div>
                  <div className="text-sm text-gray-400">Receive notifications via email</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={emailNotifications} 
                    onChange={() => setEmailNotifications(!emailNotifications)} 
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">Push Notifications</div>
                  <div className="text-sm text-gray-400">Receive notifications in-app</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={pushNotifications} 
                    onChange={() => setPushNotifications(!pushNotifications)} 
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="border-t border-gray-800 pt-6">
                <div className="font-medium mb-2">Notification Preferences</div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 rounded border-gray-700 mr-2" defaultChecked />
                    <span>Price alerts</span>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 rounded border-gray-700 mr-2" defaultChecked />
                    <span>New coin listings</span>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 rounded border-gray-700 mr-2" defaultChecked />
                    <span>Trading opportunities</span>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 rounded border-gray-700 mr-2" />
                    <span>Marketing updates</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-4">
            <button className="px-4 py-2 rounded-md border border-gray-700 text-gray-400">
              Cancel
            </button>
            <button className="px-4 py-2 rounded-md bg-blue-600 text-white">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 