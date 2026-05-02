import { useState } from 'react'
import { Bell, Settings, LogOut, Search } from 'lucide-react'
import { Input } from '../ui/Input'

interface HeaderProps {
  onLogout: () => void
}

export function Header({ onLogout }: HeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false)

  return (
    <header className="border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-md px-8 py-4 sticky top-0 z-30">
      <div className="flex items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 mt-[1px] text-zinc-400 group-focus-within:text-indigo-500 transition-colors" />
            <Input
              placeholder="Search monitors..."
              className="pl-10 bg-zinc-950/50 border-zinc-800 group-focus-within:ring-1 group-focus-within:ring-indigo-500/50 group-focus-within:border-indigo-500/50 transition-all"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Notification Bell */}
          <button className="relative rounded-xl p-2.5 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 transition-all border border-transparent hover:border-zinc-700">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-zinc-950" />
          </button>

          {/* User Avatar Dropdown */}
          <div className="relative ml-2">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-3 rounded-xl p-1.5 pl-3 border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 transition-all"
            >
              <span className="text-sm font-medium text-zinc-300">John Doe</span>
              <div className="h-8 w-8 rounded-lg bg-indigo-500 flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-indigo-500/20">
                JD
              </div>
            </button>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-zinc-800 bg-zinc-900 p-2 shadow-2xl z-50">
                <div className="px-3 py-2.5 border-b border-zinc-800 mb-1">
                  <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Account</p>
                  <p className="text-sm font-medium text-zinc-200 mt-1">john@example.com</p>
                </div>
                <button className="w-full px-3 py-2 text-left text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white flex items-center gap-3 transition-all rounded-xl">
                  <Settings className="h-4 w-4 text-zinc-400" />
                  Settings
                </button>
                <button
                  onClick={() => {
                    setShowUserMenu(false)
                    onLogout()
                  }}
                  className="w-full px-3 py-2 text-left text-sm text-rose-400 hover:bg-rose-500/10 flex items-center gap-3 transition-all rounded-xl mt-1"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
