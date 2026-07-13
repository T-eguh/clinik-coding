export type AdminRole = 
  | "Super Admin"
  | "Admin"
  | "Editor"
  | "Marketing"
  | "Content Writer"
  | "Developer"
  | "Client";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  permissions: string[];
}

export type ActiveMenu =
  | "dashboard"
  | "portfolio"
  | "projects"
  | "services"
  | "pricing"
  | "testimonials"
  | "clients"
  | "blog"
  | "categories"
  | "faq"
  | "media"
  | "users"
  | "contact-messages"
  | "consultations"
  | "newsletter"
  | "analytics"
  | "seo"
  | "settings"
  | "backup"
  | "logs";
