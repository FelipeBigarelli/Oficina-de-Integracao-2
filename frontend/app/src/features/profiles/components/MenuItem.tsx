// components/Sidebar/MenuItem.tsx
import { ReactElement } from 'react';

interface MenuItemProps {
  title: string;
  icon: ReactElement;
  isActive?: boolean;
  onClick: () => void;
}

function MenuItem({ title, icon, isActive = false, onClick }: MenuItemProps) {
  return (
    <li>
      <button
        onClick={onClick}
        className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors
          ${isActive 
            ? 'bg-gray-700 text-white' 
            : 'hover:bg-gray-700 text-gray-300 hover:text-white'}
        `}
      >
        <span className="[&>svg]:w-5 [&>svg]:h-5">{icon}</span>
        <span className="font-medium">{title}</span>
      </button>
    </li>
  );
}

export default MenuItem;