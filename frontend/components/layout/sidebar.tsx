import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { 
  BarChart3, 
  Coins, 
  Home, 
  LineChart, 
  MessagesSquare, 
  Settings, 
  TrendingUp, 
  Users 
} from 'lucide-react';

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const NavItem = ({ href, icon, label, isActive }: NavItemProps) => {
  const { sidebarOpen } = useAppStore();
  
  return (
    <Link 
      href={href}
      className={`flex items-center p-3 my-1 rounded-lg transition-colors ${
        isActive 
          ? 'bg-primary/10 text-primary' 
          : 'text-muted-foreground hover:bg-muted hover:text-primary'
      }`}
    >
      <span className="text-xl">{icon}</span>
      {sidebarOpen && (
        <span className="ml-3 font-medium">{label}</span>
      )}
    </Link>
  );
};

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarOpen, setSidebarOpen } = useAppStore();
  
  const navItems = [
    { href: '/', icon: <Home />, label: 'Dashboard' },
    { href: '/market', icon: <BarChart3 />, label: 'Market' },
    { href: '/portfolio', icon: <Coins />, label: 'Portfolio' },
    { href: '/strategies', icon: <LineChart />, label: 'Strategies' },
    { href: '/trends', icon: <TrendingUp />, label: 'Trends' },
    { href: '/social', icon: <MessagesSquare />, label: 'Social' },
    { href: '/creators', icon: <Users />, label: 'Creators' },
    { href: '/settings', icon: <Settings />, label: 'Settings' },
  ];
  
  return (
    <aside 
      className={`fixed inset-y-0 left-0 z-50 transform ${
        sidebarOpen ? 'w-64' : 'w-20'
      } bg-card shadow-md transition-all duration-300 ease-in-out`}
    >
      <div className="flex flex-col h-full p-4">
        <div className="flex items-center justify-between mb-8">
          {sidebarOpen ? (
            <h2 className="text-2xl font-bold text-primary">ZoraSage</h2>
          ) : (
            <h2 className="text-2xl font-bold text-primary">ZS</h2>
          )}
          
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-full hover:bg-muted text-muted-foreground"
          >
            {sidebarOpen ? (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            ) : (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            )}
          </button>
        </div>
        
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <NavItem 
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
              isActive={pathname === item.href}
            />
          ))}
        </nav>
        
        <div className="mt-auto pt-4 border-t border-border">
          <div className={`flex items-center ${sidebarOpen ? 'justify-between' : 'justify-center'}`}>
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
              AI
            </div>
            {sidebarOpen && (
              <span className="text-sm text-muted-foreground">
                AI Powered
              </span>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
} 