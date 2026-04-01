export const navItems = [
  {
    section: "Pages",
    items: [
      {
        label: "Dashboards",
        icon: "📊",
        children: [
          { label: "Analytics", path: "/dashboards/analytics" },
          { label: "E-Commerce", path: "/dashboards/ecommerce", badge: "Pro" },
          { label: "Crypto", path: "/dashboards/crypto", badge: "Pro" },
        ],
      },

      {
        label: "Pages",
        icon: "📄",
        children: [
          { label: "Settings", path: "/pages/settings" },
          { label: "Projects", path: "/pages/projects", badge: "Pro" },
          { label: "Clients", path: "/pages/clients", badge: "Pro" },
          { label: "Orders", path: "/pages/orders", badge: "Pro" },
          { label: "Pricing", path: "/pages/pricing", badge: "Pro" },
          { label: "Chat", path: "/pages/chat", badge: "Pro" },
        ],
      },

      { label: "Profile", icon: "👤", path: "/profile" },
      { label: "Invoice", icon: "💳", path: "/invoice" },
      { label: "Tasks", icon: "☰", path: "/tasks", badge: "Pro" },
      { label: "Calendar", icon: "📅", path: "/calendar", badge: "Pro" },

      {
        label: "Auth",
        icon: "🔐",
        children: [
          { label: "Sign In", path: "/auth/sign-in" },
          { label: "Sign Up", path: "/auth/sign-up" },
          { label: "Reset Password", path: "/auth/reset-password", badge: "Pro" },
          { label: "404 Page", path: "/auth/404", badge: "Pro" },
          { label: "500 Page", path: "/auth/500", badge: "Pro" },
        ],
      },
    ],
  },
];