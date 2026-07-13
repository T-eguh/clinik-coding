export interface TechItem {
  name: string;
  category: "frontend" | "backend" | "database" | "cloud" | "other";
  iconName: string;
  description: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  features: string[];
  gradient: string;
  targetIndustries: string[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  client: string;
  industry: string;
  description: string;
  image: string;
  tags: string[];
  results: string[];
  techUsed: string[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  industry: string;
  avatar: string;
  rating: number;
  content: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface ConsultationRequest {
  clientName: string;
  companyType: string;
  projectType: string;
  designStyle: string;
  features: string[];
  urgency: "Normal" | "Express";
}

export interface ConsultationResponse {
  recommendedStack: {
    name: string;
    reason: string;
  }[];
  estimatedDuration: string;
  estimatedCostRange: string;
  timelineBreakdown: {
    stage: string;
    duration: string;
    description: string;
  }[];
  expertAdvice: string;
  proposalSummary: string;
}

export interface InquiryFormInput {
  name: string;
  email: string;
  company: string;
  industry: string;
  message: string;
}
