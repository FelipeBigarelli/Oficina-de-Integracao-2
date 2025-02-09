// components/Sidebar/Sidebar.tsx
import { ReactElement } from 'react';
import { logout } from '../../auth/services/Authentication';
import MenuItem from './MenuItem';

interface SidebarProps {
  menuItems: Array<{
    title: string;
    icon: ReactElement;
    path: string;
    isActive?: boolean;
  }>;
  onNavigate: (path: string) => void;
}

const Sidebar = ({ menuItems, onNavigate }: SidebarProps) => {
  return (
    <div className="flex flex-col justify-between bg-gray-800 text-white w-64 p-4 border-r border-gray-600 shadow-lg shadow-gray-500 min-h-screen">
      <div>
        <h1 className="text-2xl font-semibold mb-4 p-2 border-b border-gray-600">ELLP</h1>
        
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <MenuItem
                key={item.path}
                title={item.title}
                icon={item.icon}
                isActive={item.isActive}
                onClick={() => onNavigate(item.path)}
              />
            ))}
          </ul>
        </nav>
      </div>

      <div className="p-2">
        <button 
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;