import React, { useState } from 'react'
import { Bell, Settings, LogOut, Search } from 'lucide-react'
import { Input } from '../ui/Input'

interface HeaderProps {
  onLogout: () => void
}

export function Header({ onLogout }: HeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false)

  return (
    <header className="border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl px-10 py-5 sticky top-0 z-30">
      <div className="flex items-center justify-between gap-6">
        {/* Search Bar */}
        <div className="flex-1 max-w-xl">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 mt-[1px] text-zinc-500 group-focus-within:text-indigo-400 transition-colors" />
            <Input
              placeholder="Search monitors, integrations, or settings..."
              className="h-12 pl-12 bg-zinc-900/50 border-zinc-800 text-base rounded-2xl group-focus-within:ring-2 group-focus-within:ring-indigo-500/20 group-focus-within:border-indigo-500/50 group-hover:bg-zinc-900/80 transition-all shadow-inner"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Notification Bell */}
          <button className="relative rounded-2xl p-3 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 transition-all border border-transparent hover:border-zinc-700">
            <Bell className="h-6 w-6" />
            <span className="absolute top-3 right-3 h-2.5 w-2.5 rounded-full bg-rose-500 ring-4 ring-zinc-950" />
          </button>

          {/* User Avatar Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-4 rounded-2xl p-2 pl-4 border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-800 transition-all group"
            >
              <span className="text-sm font-semibold text-zinc-300 group-hover:text-white transition-colors">John Doe</span>
              <div className="h-10 w-10 rounded-xl bg-indigo-500 flex items-center justify-center text-sm font-bold text-white shadow-lg shadow-indigo-500/20">
                JD
              </div>
            </button>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-3 w-64 rounded-2xl border border-zinc-800 bg-zinc-900/95 backdrop-blur-xl p-2 shadow-2xl z-50">
                <div className="px-4 py-3 border-b border-zinc-800/80 mb-2">
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Account</p>
                  <p className="text-sm font-medium text-zinc-200 mt-1 truncate">john.doe@example.com</p>
                </div>
                <button className="w-full px-4 py-2.5 text-left text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white flex items-center gap-3 transition-all rounded-xl font-medium">
                  <Settings className="h-4 w-4 text-zinc-400" />
                  Preferences
                </button>
                <button
                  onClick={() => {
                    setShowUserMenu(false)
                    onLogout()
                  }}
                  className="w-full px-4 py-2.5 text-left text-sm text-rose-400 hover:bg-rose-500/10 flex items-center gap-3 transition-all rounded-xl mt-1 font-medium"
                >
                  <LogOut className="h-4 w-4" />
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export { Header }
