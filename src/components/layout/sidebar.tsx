"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Contact,
  CheckSquare,
  CalendarDays,
  Building2,
  Inbox,
  BarChart2,
  Megaphone,
  UsersRound,
  Settings,
  Search,
  Sparkles,
  HelpCircle,
  Bell,
  Menu,
  X,
  Command,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/ui/theme-toggle";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
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
        icon: <LayoutDashboard className="w-4 h-4" />,
      },
    ],
  },
  {
    label: "CRM",
    items: [
      { label: "Leads", href: "/leads", icon: <Users className="w-4 h-4" /> },
      { label: "Deals", href: "/deals", icon: <Briefcase className="w-4 h-4" /> },
      { label: "Contacts", href: "/contacts", icon: <Contact className="w-4 h-4" /> },
      { label: "Tasks", href: "/tasks", icon: <CheckSquare className="w-4 h-4" /> },
      { label: "Calendar", href: "/calendar", icon: <CalendarDays className="w-4 h-4" /> },
      { label: "Properties", href: "/properties", icon: <Building2 className="w-4 h-4" /> },
    ],
  },
  {
    label: "Workspace",
    items: [
      { label: "Inbox", href: "/inbox", icon: <Inbox className="w-4 h-4" /> },
      { label: "Reports", href: "/reports", icon: <BarChart2 className="w-4 h-4" /> },
      { label: "Marketing", href: "/marketing", icon: <Megaphone className="w-4 h-4" /> },
    ],
  },
  {
    label: "Team",
    items: [
      { label: "Team", href: "/team", icon: <UsersRound className="w-4 h-4" /> },
    ],
  },
  {
    label: "Settings",
    items: [
      { label: "Settings", href: "/settings", icon: <Settings className="w-4 h-4" /> },
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
          "flex-shrink-0",
          active ? "text-brand-600" : "text-gray-400"
        )}
      >
        {item.icon}
      </span>
      <span>{item.label}</span>
    </Link>
  );
}

function SidebarContent({ pathname }: { pathname: string }) {
  const defaultOpen = useMemo(
    () =>
      Object.fromEntries(
        navGroups
          .map((g) => g.label)
          .filter((l): l is string => Boolean(l))
          .map((l) => [l, true])
      ) as Record<string, boolean>,
    []
  );
  const [openSections, setOpenSections] =
    useState<Record<string, boolean>>(defaultOpen);

  const toggleSection = (label: string) => {
    setOpenSections((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2.5 px-4 py-4 border-b border-gray-200 dark:border-gray-800">
        <Avatar className="w-8 h-8 flex-shrink-0">
          <AvatarImage src="/avatar-lina.jpg" alt="Lina Rahman" />
          <AvatarFallback className="bg-brand-100 text-brand-700 text-xs font-semibold">
            LR
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate leading-tight">
            Lina Rahman
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate leading-tight">Atlas Estates</p>
        </div>
        <span className="flex-shrink-0 text-[10px] font-semibold bg-brand-100 text-brand-600 px-1.5 py-0.5 rounded-full">
          Pro
        </span>
      </div>

      <div className="px-3 py-3">
        <div className="flex items-center gap-2 px-2.5 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <Search className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
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
                <button
                  type="button"
                  onClick={() => toggleSection(group.label!)}
                  className="w-full flex items-center gap-1 px-2.5 mb-1 text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider hover:text-gray-600 dark:hover:text-gray-400 text-left"
                  aria-expanded={openSections[group.label] !== false}
                >
                  <ChevronDown
                    className={cn(
                      "w-3.5 h-3.5 shrink-0 text-gray-400 transition-transform",
                      openSections[group.label] === false && "-rotate-90"
                    )}
                  />
                  {group.label}
                </button>
                {openSections[group.label] !== false && (
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

      <div className="mt-auto border-t border-gray-200 dark:border-gray-800 px-3 py-3 space-y-0.5">
        <button className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
          <Sparkles className="w-4 h-4 text-gray-400" />
          <span>AI Assistant</span>
          <span className="ml-auto text-[10px] font-semibold bg-brand-100 text-brand-600 px-1.5 py-0.5 rounded-full">
            New
          </span>
        </button>
        <button className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
          <Bell className="w-4 h-4 text-gray-400" />
          <span>Notifications</span>
        </button>
        <button className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
          <HelpCircle className="w-4 h-4 text-gray-400" />
          <span>Help & Support</span>
        </button>
        <ThemeToggle />
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

      <aside className="hidden lg:flex flex-col w-[224px] flex-shrink-0 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 h-screen sticky top-0 overflow-hidden">
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
