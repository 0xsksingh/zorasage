import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  HomeIcon, 
  LineChartIcon, 
  WalletIcon, 
  BrainCircuitIcon, 
  TrendingUpIcon, 
  MessagesSquareIcon, 
  UsersIcon, 
  SettingsIcon 
} from 'lucide-react';

export function Sidebar() {
  const pathname = usePathname();
  
  const navItems = [
    {
      name: 'Dashboard',
      href: '/',
      icon: HomeIcon,
    },
    {
      name: 'Market',
      href: '/market',
      icon: LineChartIcon,
    },
    {
      name: 'Portfolio',
      href: '/portfolio',
      icon: WalletIcon,
    },
    {
      name: 'Strategies',
      href: '/strategies',
      icon: BrainCircuitIcon,
    },
    {
      name: 'Trends',
      href: '/trends',
      icon: TrendingUpIcon,
    },
    {
      name: 'Social',
      href: '/social',
      icon: MessagesSquareIcon,
    },
    {
      name: 'Creators',
      href: '/creators',
      icon: UsersIcon,
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: SettingsIcon,
    },
  ];

  return (
    <div className="w-64 h-screen bg-black border-r border-gray-800 flex flex-col">
      {/* Logo */}
      <div className="p-6 pb-2 flex items-center">
        <h1 className="text-2xl font-bold text-white">ZoraSage</h1>
      </div>
      
      {/* Navigation */}
      <nav className="mt-6 px-3 flex-1">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            
            return (
              <li key={item.name}>
                <Link 
                  href={item.href}
                  className={`
                    flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors
                    ${isActive 
                      ? 'bg-gray-800 text-white' 
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'}
                  `}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      {/* AI Footer */}
      <div className="p-4 border-t border-gray-800 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="bg-black border border-gray-700 rounded-full h-8 w-8 flex items-center justify-center">
            <BrainCircuitIcon className="h-4 w-4 text-white" />
          </div>
          <span className="text-gray-400 text-sm">AI Powered</span>
        </div>
      </div>
    </div>
  );
} 