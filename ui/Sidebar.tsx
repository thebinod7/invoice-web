'use client'

import { APP_NAME, APP_PATHS, USER_ROLES } from '@/app/constants'
import { ADMIN_SIDEBAR_GROUP, DASHBOARD_SIDEBAR_ITEMS } from '@/app/constants/api-routes'
import { useAuthContext } from '@/app/context/useAuthContext'
import { ICurrentUser } from '@/app/types'
import { ChevronDown, ChevronRight, ExternalLink, Flame } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { ProfileDropdown } from './ProfileDropdown'

interface SidebarProps {
    collapsed: boolean
    pathname: string
}

export default function Sidebar({ pathname, collapsed }: SidebarProps) {
    const { currentUser } = useAuthContext()
    const activePath = pathname.split('/').pop()
    const [adminOpen, setAdminOpen] = useState(true)
    const isAdmin = currentUser?.role === USER_ROLES.ADMIN
    const AdminIcon = ADMIN_SIDEBAR_GROUP.icon

    return (
        <aside
            className={`
        ${collapsed ? 'translate-x-0' : '-translate-x-full'}
        inset-y-0 left-0 z-50
        ${collapsed ? 'w-16' : 'w-80'}
        bg-white border-r border-gray-200
        transition-all duration-200
        flex flex-col
      `}
        >
            {/* Logo */}
            <div className="h-14 px-4 border-b border-gray-200 flex items-center justify-center">
                {!collapsed ? (
                    <div className="flex items-center gap-1">
                        <h1 className="font-semibold text-lg text-gray-900">{APP_NAME}</h1>
                        <Link href="/" target="_blank" title="Go to website">
                            <ExternalLink className="h-3.5 w-3.5" />
                        </Link>
                    </div>
                ) : (
                    <Link href="/" target="_blank" title="Go to website">
                        <ExternalLink className="h-3.5 w-3.5" />
                    </Link>
                )}
            </div>
            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto p-3 text-sm space-y-1">
                {DASHBOARD_SIDEBAR_ITEMS.map((item) => {
                    const Icon = item.icon
                    const isActive = activePath === item.key

                    return (
                        <Link
                            key={item.key}
                            href={item.href}
                            target={item.external ? '_blank' : undefined}
                            title={collapsed ? item.label : undefined}
                            className={`
                relative flex items-center gap-3 px-3 py-2 rounded-lg
                text-gray-700 hover:bg-gray-100 transition
                ${isActive ? 'bg-gray-100' : ''}
                ${collapsed ? 'justify-center' : ''}
              `}
                        >
                            <Icon className={`w-5 h-5 shrink-0`} />
                            {!collapsed && <span className="flex-1">{item.label}</span>}
                        </Link>
                    )
                })}

                {isAdmin && (
                    <div className="space-y-1">
                        <button
                            type="button"
                            title={collapsed ? ADMIN_SIDEBAR_GROUP.label : undefined}
                            onClick={() => setAdminOpen((o) => !o)}
                            className={`
                relative flex items-center gap-3 px-3 py-2 rounded-lg w-full
                text-gray-700 hover:bg-gray-100 transition
                ${collapsed ? 'justify-center' : ''}
              `}
                        >
                            <AdminIcon className="w-5 h-5 shrink-0" />
                            {!collapsed && (
                                <>
                                    <span className="flex-1 text-left">{ADMIN_SIDEBAR_GROUP.label}</span>
                                    {adminOpen ? (
                                        <ChevronDown className="w-4 h-4 shrink-0" />
                                    ) : (
                                        <ChevronRight className="w-4 h-4 shrink-0" />
                                    )}
                                </>
                            )}
                        </button>

                        {adminOpen &&
                            ADMIN_SIDEBAR_GROUP.children.map((child) => {
                                const ChildIcon = child.icon
                                const itemClass = `
                relative flex items-center gap-3 px-3 py-2 rounded-lg
                ${collapsed ? 'justify-center' : ''}
              `

                                if (child.disabled || !child.href) {
                                    return (
                                        <span
                                            key={child.key}
                                            title={collapsed ? child.label : undefined}
                                            aria-disabled="true"
                                            className={`${itemClass} text-gray-400 cursor-not-allowed`}
                                        >
                                            <ChildIcon className="w-5 h-5 shrink-0" />
                                            {!collapsed && child.label}
                                        </span>
                                    )
                                }

                                const isActive = activePath === child.key
                                return (
                                    <Link
                                        key={child.key}
                                        href={child.href}
                                        title={collapsed ? child.label : undefined}
                                        className={`
                      ${itemClass}
                      text-gray-700 hover:bg-gray-100 transition
                      ${isActive ? 'bg-gray-100' : ''}
                    `}
                                    >
                                        <ChildIcon className="w-5 h-5 shrink-0" />
                                        {!collapsed && <span className="flex-1">{child.label}</span>}
                                    </Link>
                                )
                            })}
                    </div>
                )}
            </nav>
            {/* User Profile */}
            {collapsed ? (
                <Link
                    style={{ marginLeft: 8 }}
                    className="p-2 text-center"
                    href={APP_PATHS.DASHBOARD.SUBSCRIPTION}
                >
                    <Flame />
                </Link>
            ) : (
                <Link
                    href={APP_PATHS.DASHBOARD.SUBSCRIPTION}
                    className="mb-2
    block
    w-full
    text-center
    font-medium
    text-white
    text-sm
    rounded-lg
    bg-emerald-500
    border border-transparent
    py-2
    shadow-md
    hover:bg-emerald-600
    transition-colors"
                >
                    Subscribe for more →
                </Link>
            )}
            <ProfileDropdown
                currentUser={currentUser as ICurrentUser | undefined}
                isCollapsed={collapsed}
            />{' '}
        </aside>
    )
}
