// ============================================
// TYPES.TS - Interfaces TypeScript
// ============================================

export interface StrapiImage {
  id: number;
  name: string;
  alternativeText?: string;
  caption?: string;
  width: number;
  height: number;
  formats?: {
    thumbnail?: StrapiImageFormat;
    small?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    large?: StrapiImageFormat;
  };
  url: string;
  mime: string;
  size: number;
}

export interface StrapiImageFormat {
  name: string;
  url: string;
  width: number;
  height: number;
}

// ── SHARED COMPONENTS ──
export interface Testimonial {
  id: number;
  author_name: string;
  author_role?: string;
  author_photo?: StrapiImage;
  content: string;
  rating: number;
  badge_text?: string;
  verified: boolean;
}

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
  order?: number;
}

export interface TrustBadge {
  id: number;
  icon: string;
  label: string;
  description?: string;
}

export interface SocialProof {
  id: number;
  value: string;
  label: string;
  icon: string;
  description?: string;
}

// ── PRODUCT ──
export interface Product {
  id: number;
  name: string;
  slug: string;
  description?: string;
  short_description?: string;
  checkout_base_url: string;
  price: number;
  price_original?: number;
  currency: 'BRL' | 'USD' | 'EUR';
  featured_image?: StrapiImage;
  gallery?: StrapiImage[];
  is_active: boolean;
  testimonials?: Testimonial[];
  faq?: FaqItem[];
  trust_badges?: TrustBadge[];
  guarantee_text?: string;
  guarantee_days?: number;
  safe_page_slug?: string;
  seo_pages?: SeoPage[];
  landing_pages?: LandingPage[];
}

// ── SEO PAGE ──
export interface SeoPage {
  id: number;
  title: string;
  slug: string;
  h1?: string;
  product?: Product;
  page_type: 'product-main' | 'product-sub' | 'blog' | 'guide' | 'comparison';
  content: string;
  excerpt?: string;
  featured_image?: StrapiImage;
  meta_title?: string;
  meta_description?: string;
  keywords?: string;
  canonical_url?: string;
  noindex: boolean;
  schema_markup?: any;
  show_toc: boolean;
  show_faq: boolean;
  show_testimonials: boolean;
  related_pages?: SeoPage[];
  publishedAt?: string;
  updatedAt?: string;
}

// ── LANDING PAGE ──
export interface LandingPage {
  id: number;
  title: string;
  slug: string;
  product?: Product;
  body_sections: LpDynamicZone[];
  meta_title?: string;
  meta_description?: string;
  theme_override?: any;
  exit_popup_enabled: boolean;
  exit_popup_headline?: string;
  exit_popup_offer?: string;
  // Filtro
  filter_enabled: boolean;
  filter_access_code?: string;
  filter_access_param?: string;
  filter_required_sources?: string[];
  filter_required_params?: string[];
  filter_allowed_countries?: string[];
  filter_blocked_countries?: string[];
  filter_block_bots: boolean;
  filter_block_empty_ua: boolean;
  filter_block_direct: boolean;
  filter_redirect_url?: string;
  filter_safe_page_slug?: string;
  // Tracking
  tracking_google_ads_conversion_id?: string;
  tracking_google_ads_conversion_label?: string;
  tracking_google_ads_conversion_value?: number;
  tracking_meta_pixel_id?: string;
  tracking_meta_custom_event?: string;
  tracking_taboola_pixel_id?: string;
  tracking_taboola_event_name?: string;
  tracking_custom_scripts?: string;
}

// ── LP DYNAMIC ZONE COMPONENTS ──
export type LpDynamicZone =
  | LpHeroSection
  | LpProblemAgitation
  | LpBenefitsGrid
  | LpVideoSection
  | LpVturbSection
  | LpTestimonials
  | LpSocialProofNumbers
  | LpOfferStack
  | LpGuarantee
  | LpUrgencyCta
  | LpFaqAccordion
  | LpMediaLogos
  | LpContentBlock
  | LpComparisonTable
  | LpCustomHtml;

export interface LpHeroSection {
  __component: 'lp.hero-section';
  id: number;
  badge_text?: string;
  headline: string;
  sub_headline: string;
  hero_image?: StrapiImage;
  hero_video_url?: string;
  cta_text: string;
  trust_items?: TrustBadge[];
}

export interface LpProblemAgitation {
  __component: 'lp.problem-agitation';
  id: number;
  headline: string;
  pain_points: TrustBadge[];
  transition_text?: string;
  cta_text?: string;
}

export interface LpBenefitsGrid {
  __component: 'lp.benefits-grid';
  id: number;
  headline: string;
  sub_headline?: string;
  items: TrustBadge[];
  cta_text?: string;
}

export interface LpVideoSection {
  __component: 'lp.video-section';
  id: number;
  headline?: string;
  video_url: string;
  thumbnail: StrapiImage;
  description?: string;
  cta_text?: string;
}

export interface LpVturbSection {
  __component: 'lp.vturb-section';
  id: number;
  headline?: string;
  sub_headline?: string;
  publisher_id: string;
  video_id: string;
  delay_seconds?: number;
  max_width?: number;
  bg_dark?: boolean;
  tracking_milestone_pct?: number;
  cta_text?: string;
}

export interface LpTestimonials {
  __component: 'lp.testimonials';
  id: number;
  headline: string;
  style: 'carousel' | 'grid' | 'stack';
  items: Testimonial[];
  cta_text?: string;
}

export interface LpSocialProofNumbers {
  __component: 'lp.social-proof-numbers';
  id: number;
  headline?: string;
  metrics: SocialProof[];
  bg_style: 'dark' | 'brand' | 'light';
  cta_text?: string;
}

export interface LpOfferStack {
  __component: 'lp.offer-stack';
  id: number;
  headline: string;
  items: TrustBadge[];
  total_value?: string;
  actual_price: string;
  installment_text?: string;
  cta_text: string;
}

export interface LpGuarantee {
  __component: 'lp.guarantee';
  id: number;
  headline: string;
  body: string;
  days: number;
  icon_style: 'shield' | 'badge' | 'stamp';
  cta_text?: string;
}

export interface LpUrgencyCta {
  __component: 'lp.urgency-cta';
  id: number;
  headline: string;
  countdown_end?: string;
  countdown_type: 'fixed' | 'evergreen';
  scarcity_text?: string;
  scarcity_pct?: number;
  cta_text: string;
  cta_variant: 'primary' | 'urgency';
}

export interface LpFaqAccordion {
  __component: 'lp.faq-accordion';
  id: number;
  headline: string;
  items: FaqItem[];
  cta_text?: string;
}

export interface LpMediaLogos {
  __component: 'lp.media-logos';
  id: number;
  headline?: string;
  logos: StrapiImage[];
  cta_text?: string;
}

export interface LpContentBlock {
  __component: 'lp.content-block';
  id: number;
  headline?: string;
  body: string;
  alignment: 'left' | 'center';
  cta_text?: string;
}

export interface LpComparisonTable {
  __component: 'lp.comparison-table';
  id: number;
  headline?: string;
  columns: any;
  rows: any;
  cta_text?: string;
}

export interface LpCustomHtml {
  __component: 'lp.custom-html';
  id: number;
  html_content: string;
  cta_text?: string;
}

// ── GLOBAL SEO ──
export interface GlobalSeo {
  id: number;
  site_name: string;
  site_url: string;
  site_description?: string;
  default_meta_title?: string;
  default_meta_description?: string;
  og_image?: StrapiImage;
  favicon?: StrapiImage;
  gtm_id?: string;
  ga4_measurement_id?: string;
  google_ads_id?: string;
  meta_pixel_id?: string;
  taboola_account_id?: string;
  google_site_verification?: string;
  schema_organization?: any;
  social_links?: any;
  custom_head_scripts?: string;
  custom_body_scripts?: string;
}

// ── STRAPI API RESPONSE ──
export interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiSingleResponse<T> {
  data: {
    id: number;
    attributes: Omit<T, 'id'>;
  };
}

export interface StrapiCollectionResponse<T> {
  data: Array<{
    id: number;
    attributes: Omit<T, 'id'>;
  }>;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
