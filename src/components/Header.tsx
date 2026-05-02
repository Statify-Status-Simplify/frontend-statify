import { Menu, Bell, Settings } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="bg-secondary border-b border-accent border-opacity-20 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-accent hover:bg-opacity-10 rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5 text-primary" />
        </button>
        <h1 className="text-2xl font-bold text-primary">Statify</h1>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 hover:bg-accent hover:bg-opacity-10 rounded-lg transition-colors">
          <Bell className="w-5 h-5 text-foreground" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-400 rounded-full"></span>
        </button>
        <button className="p-2 hover:bg-accent hover:bg-opacity-10 rounded-lg transition-colors">
          <Settings className="w-5 h-5 text-foreground" />
        </button>
      </div>
    </header>
  );
}
