import { useAppStore } from '@/lib/store';
import { BellIcon, MoonIcon, SearchIcon, SunIcon } from 'lucide-react';
import { ConnectKitButton } from 'connectkit';
import { useTheme } from 'next-themes';

export function Navbar() {
  const { sidebarOpen } = useAppStore();
  const { theme, setTheme } = useTheme();
  
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  
  return (
    <header 
      className={`sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur ${
        sidebarOpen ? 'ml-64' : 'ml-20'
      } transition-all duration-300 ease-in-out`}
    >
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="relative rounded-md">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <SearchIcon className="h-4 w-4 text-muted-foreground" />
            </div>
            <input 
              type="text" 
              placeholder="Search coins..." 
              className="h-9 w-64 rounded-md border border-input bg-background pl-9 text-sm outline-none focus:border-primary" 
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-muted text-muted-foreground" onClick={toggleTheme}>
            {theme === 'dark' ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </button>
          
          <button className="p-2 rounded-full hover:bg-muted text-muted-foreground relative">
            <BellIcon className="h-5 w-5" />
            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
              3
            </span>
          </button>
          
          <div className="hidden sm:block">
            <ConnectKitButton />
          </div>
        </div>
      </div>
    </header>
  );
} 