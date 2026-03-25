"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutGrid,
  Users,
  User,
  CheckCircle2,
  Calendar,
  Building2,
  MessageSquare,
  BarChart2,
  Network,
  UsersRound,
  Settings,
  Search,
  HelpCircle,
  Bell,
  Menu,
  X,
  Command,
  ChevronDown,
  ChevronRight,
  Phone,
  KanbanSquare
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  hasArrow?: boolean;
}

interface NavGroup {
  label?: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    items: [
      {
        label: "Dashboard",
        href: "/dashboard",
        icon: <LayoutGrid className="w-4 h-4" />,
      },
    ],
  },
  {
    label: "CRM",
    items: [
      { label: "Inbox", href: "/inbox", icon: <MessageSquare className="w-4 h-4" /> },
      { label: "Leads", href: "/leads", icon: <User className="w-4 h-4" /> },
      { label: "Deals", href: "/deals", icon: <CheckCircle2 className="w-4 h-4" /> },
      { label: "Contacts", href: "/contacts", icon: <Phone className="w-4 h-4" /> },
      { label: "Tasks", href: "/tasks", icon: <KanbanSquare className="w-4 h-4" /> },
      { label: "Calendar", href: "/calendar", icon: <Calendar className="w-4 h-4" /> },
    ],
  },
  {
    label: "Workspace",
    items: [
      { label: "Properties", href: "/properties", icon: <Building2 className="w-4 h-4" />, hasArrow: true },
      { label: "Marketing", href: "/marketing", icon: <Network className="w-4 h-4" />, hasArrow: true },
      { label: "Reports", href: "/reports", icon: <BarChart2 className="w-4 h-4" />, hasArrow: true },
    ],
  },
];

function NavItemComponent({ item, active }: { item: NavItem; active: boolean }) {
  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm font-medium transition-colors",
        active
          ? "bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400"
          : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100"
      )}
    >
      <span
        className={cn(
          "shrink-0",
          active ? "text-brand-600" : "text-gray-400"
        )}
      >
        {item.icon}
      </span>
      <span>{item.label}</span>
      {item.hasArrow && (
        <ChevronRight className="w-4 h-4 ml-auto text-gray-400" />
      )}
    </Link>
  );
}

function SidebarContent({ pathname }: { pathname: string }) {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <div className="flex flex-col h-full">
      <div className="px-3 py-3">
        <DropdownMenu open={profileOpen} onOpenChange={setProfileOpen}>
          <DropdownMenuTrigger className="w-full flex items-center justify-between gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <div className="flex items-center gap-2.5">
              <div className="relative shrink-0 w-8 h-8">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/avatar-lina.jpg" alt="Lina Rahman" />
                  <AvatarFallback className="bg-brand-100 text-brand-700 text-xs font-semibold">
                    LR
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                  <div className="w-3 h-3 grid grid-cols-2 gap-[1px] p-[1px]">
                    <div className="bg-red-500 rounded-[1px]"></div>
                    <div className="bg-blue-500 rounded-[1px]"></div>
                    <div className="bg-green-500 rounded-[1px]"></div>
                    <div className="bg-yellow-400 rounded-[1px]"></div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start text-left min-w-0">
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate leading-tight">
                  Lina Rahman
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate leading-none">Atlas Estates</p>
                  <span className="shrink-0 text-[9px] font-bold bg-brand-50 dark:bg-brand-900/40 text-brand-600 dark:text-brand-400 px-1.5 py-0.5 rounded leading-none">
                    Pro
                  </span>
                </div>
              </div>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[240px] p-2" align="start" sideOffset={8}>
            <div className="flex items-center gap-2.5 px-2 py-1.5 mb-1">
              <div className="w-8 h-8 rounded bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0 border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="w-full h-full flex flex-wrap p-0.5 gap-0.5 bg-white dark:bg-gray-900">
                   <div className="w-[calc(50%-1px)] h-[calc(50%-1px)] bg-red-400 rounded-[1px]"></div>
                   <div className="w-[calc(50%-1px)] h-[calc(50%-1px)] bg-blue-400 rounded-[1px]"></div>
                   <div className="w-[calc(50%-1px)] h-[calc(50%-1px)] bg-green-400 rounded-[1px]"></div>
                   <div className="w-[calc(50%-1px)] h-[calc(50%-1px)] bg-amber-400 rounded-[1px]"></div>
                </div>
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-bold text-gray-900 dark:text-gray-100">Atlas Estates</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Business · 12 members</p>
              </div>
            </div>
            
            <DropdownMenuSeparator className="my-1.5" />
            
            <DropdownMenuItem className="py-2 px-2.5 text-sm text-gray-600 dark:text-gray-300 focus:bg-gray-50 dark:focus:bg-gray-800 cursor-pointer">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 shrink-0"></div>
                  Online
                </div>
                <span className="text-[9px] font-bold text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-1.5 py-0.5 rounded leading-none uppercase tracking-wider">
                  Active
                </span>
              </div>
            </DropdownMenuItem>
            
            <DropdownMenuSeparator className="my-1.5" />
            
            <DropdownMenuItem className="py-2 px-2.5 text-sm text-gray-600 dark:text-gray-300 focus:bg-gray-50 dark:focus:bg-gray-800 cursor-pointer gap-2.5">
              <UsersRound className="w-4 h-4 shrink-0 text-gray-400" />
              My Profile
            </DropdownMenuItem>
            
            <DropdownMenuItem className="py-2 px-2.5 text-sm text-gray-600 dark:text-gray-300 focus:bg-gray-50 dark:focus:bg-gray-800 cursor-pointer gap-2.5 justify-between">
              <div className="flex items-center gap-2.5">
                <Bell className="w-4 h-4 shrink-0 text-gray-400" />
                Notifications
              </div>
              <span className="flex items-center justify-center min-w-[18px] h-[18px] px-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-[10px] font-bold rounded-full">
                2
              </span>
            </DropdownMenuItem>
            
            <DropdownMenuItem className="py-2 px-2.5 text-sm text-gray-600 dark:text-gray-300 focus:bg-gray-50 dark:focus:bg-gray-800 cursor-pointer gap-2.5">
              <HelpCircle className="w-4 h-4 shrink-0 text-gray-400" />
              Help & Support
            </DropdownMenuItem>
            
            <DropdownMenuSeparator className="my-1.5" />
            
            <DropdownMenuItem className="py-2 px-2.5 text-sm text-gray-600 dark:text-gray-300 focus:bg-gray-50 dark:focus:bg-gray-800 cursor-pointer gap-2.5">
              <svg className="w-4 h-4 shrink-0 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="px-3 py-3">
        <div className="flex items-center gap-2 px-2.5 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <Search className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <span className="text-sm text-gray-400 flex-1">Search...</span>
          <div className="flex items-center gap-0.5">
            <Command className="w-3 h-3 text-gray-300" />
            <span className="text-xs text-gray-300">K</span>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-1 overflow-y-auto space-y-4">
        {navGroups.map((group, gi) => (
          <div key={gi}>
            {group.label ? (
              <>
                <div className="flex items-center px-2.5 mb-2 mt-4 first:mt-0">
                  <span className="text-[11px] font-medium text-gray-400 dark:text-gray-500 tracking-wider">
                    {group.label}
                  </span>
                </div>
                <div className="space-y-0.5">
                  {group.items.map((item) => (
                    <NavItemComponent
                      key={item.href}
                      item={item}
                      active={
                        pathname === item.href ||
                        pathname.startsWith(item.href + "/")
                      }
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="space-y-0.5">
                {group.items.map((item) => (
                  <NavItemComponent
                    key={item.href}
                    item={item}
                    active={
                      pathname === item.href ||
                      pathname.startsWith(item.href + "/")
                    }
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      <div className="mt-auto px-3 py-3 space-y-0.5">
        <NavItemComponent
          item={{ label: "Team", href: "/team", icon: <Users className="w-4 h-4" /> }}
          active={pathname === "/team" || pathname.startsWith("/team/")}
        />
        <NavItemComponent
          item={{ label: "Settings", href: "/settings", icon: <Settings className="w-4 h-4" /> }}
          active={pathname === "/settings" || pathname.startsWith("/settings/")}
        />
      </div>
    </div>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm"
        onClick={() => setMobileOpen(true)}
        aria-label="Open navigation"
      >
        <Menu className="w-5 h-5 text-gray-600" />
      </button>

      <aside className="hidden lg:flex flex-col w-[224px] shrink-0 bg-transparent h-screen sticky top-0 overflow-hidden">
        <SidebarContent pathname={pathname} />
      </aside>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -224 }}
              animate={{ x: 0 }}
              exit={{ x: -224 }}
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
              className="fixed left-0 top-0 bottom-0 w-[224px] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-50 lg:hidden flex flex-col"
            >
              <button
                className="absolute top-4 right-4"
                onClick={() => setMobileOpen(false)}
                aria-label="Close navigation"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
              <SidebarContent pathname={pathname} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
