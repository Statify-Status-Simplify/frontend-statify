import React, { useState } from 'react'
import { Bell, Settings, LogOut, Search } from 'lucide-react'
import { Input } from '../ui/Input'

interface HeaderProps {
  onLogout: () => void
}

export function Header({ onLogout }: HeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false)

  return (
    <header className="border-b border-gray-700 bg-secondary px-6 py-4">
      <div className="flex items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <Input
              placeholder="Search monitors..."
              className="pl-10"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Notification Bell */}
          <button className="relative rounded-lg p-2 text-muted hover:bg-background hover:text-foreground transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-danger" />
          </button>

          {/* User Avatar Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 rounded-lg p-2 text-muted hover:bg-background hover:text-foreground transition-colors"
            >
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-sm font-semibold text-black">
                JD
              </div>
            </button>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 rounded-lg border border-gray-700 bg-secondary shadow-lg">
                <div className="px-4 py-3 border-b border-gray-700">
                  <p className="text-sm font-medium text-foreground">John Doe</p>
                  <p className="text-xs text-muted">john@example.com</p>
                </div>
                <button className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-background flex items-center gap-2 transition-colors">
                  <Settings className="h-4 w-4" />
                  Settings
                </button>
                <button
                  onClick={() => {
                    setShowUserMenu(false)
                    onLogout()
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-danger hover:bg-background flex items-center gap-2 transition-colors rounded-b-lg"
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
