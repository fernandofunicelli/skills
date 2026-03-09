import type { Schema, Struct } from '@strapi/strapi';

export interface LpBenefitsGrid extends Struct.ComponentSchema {
  collectionName: 'components_lp_benefits_grids';
  info: {
    description: 'Grid de benef\u00EDcios com \u00EDcones e descri\u00E7\u00F5es';
    displayName: 'LP Benefits Grid';
    icon: 'grid';
  };
  attributes: {
    cta_text: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
      }>;
    headline: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
    items: Schema.Attribute.Component<'shared.trust-badge', true> &
      Schema.Attribute.Required;
    sub_headline: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 500;
      }>;
  };
}

export interface LpComparisonTable extends Struct.ComponentSchema {
  collectionName: 'components_lp_comparison_tables';
  info: {
    description: 'Tabela de compara\u00E7\u00E3o (ex: antes vs depois)';
    displayName: 'LP Comparison Table';
    icon: 'layout';
  };
  attributes: {
    columns: Schema.Attribute.JSON & Schema.Attribute.Required;
    cta_text: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
      }>;
    headline: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
    rows: Schema.Attribute.JSON & Schema.Attribute.Required;
  };
}

export interface LpContentBlock extends Struct.ComponentSchema {
  collectionName: 'components_lp_content_blocks';
  info: {
    description: 'Bloco de conte\u00FAdo gen\u00E9rico com rich text';
    displayName: 'LP Content Block';
    icon: 'file-text';
  };
  attributes: {
    alignment: Schema.Attribute.Enumeration<['left', 'center']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'left'>;
    body: Schema.Attribute.RichText & Schema.Attribute.Required;
    cta_text: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
      }>;
    headline: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
  };
}

export interface LpCustomHtml extends Struct.ComponentSchema {
  collectionName: 'components_lp_custom_htmls';
  info: {
    description: 'HTML customizado para embeds espec\u00EDficos';
    displayName: 'LP Custom HTML';
    icon: 'code';
  };
  attributes: {
    cta_text: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
      }>;
    html_content: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface LpFaqAccordion extends Struct.ComponentSchema {
  collectionName: 'components_lp_faq_accordions';
  info: {
    description: 'FAQ em formato accordion para matar obje\u00E7\u00F5es';
    displayName: 'LP FAQ Accordion';
    icon: 'help-circle';
  };
  attributes: {
    cta_text: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
      }>;
    headline: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }> &
      Schema.Attribute.DefaultTo<'Perguntas Frequentes'>;
    items: Schema.Attribute.Component<'shared.faq-item', true> &
      Schema.Attribute.Required;
  };
}

export interface LpGuarantee extends Struct.ComponentSchema {
  collectionName: 'components_lp_guarantees';
  info: {
    description: 'Se\u00E7\u00E3o de garantia com \u00EDcone e texto';
    displayName: 'LP Guarantee';
    icon: 'shield';
  };
  attributes: {
    body: Schema.Attribute.Text & Schema.Attribute.Required;
    cta_text: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
      }>;
    days: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 365;
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<30>;
    headline: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }> &
      Schema.Attribute.DefaultTo<'Garantia Incondicional'>;
    icon_style: Schema.Attribute.Enumeration<['shield', 'badge', 'stamp']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'shield'>;
  };
}

export interface LpHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_lp_hero_sections';
  info: {
    description: 'Hero section da Landing Page com badge, headline, imagem/v\u00EDdeo e CTA';
    displayName: 'LP Hero Section';
    icon: 'star';
  };
  attributes: {
    badge_text: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
      }>;
    cta_text: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
      }> &
      Schema.Attribute.DefaultTo<'QUERO COME\u00C7AR AGORA'>;
    headline: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
    hero_image: Schema.Attribute.Media<'images'>;
    hero_video_url: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 500;
      }>;
    sub_headline: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 500;
      }>;
    trust_items: Schema.Attribute.Component<'shared.trust-badge', true>;
  };
}

export interface LpMediaLogos extends Struct.ComponentSchema {
  collectionName: 'components_lp_media_logos';
  info: {
    description: "Logos 'Visto em' para prova social";
    displayName: 'LP Media Logos';
    icon: 'image';
  };
  attributes: {
    cta_text: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
      }>;
    headline: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }> &
      Schema.Attribute.DefaultTo<'Visto em'>;
    logos: Schema.Attribute.Media<'images', true> & Schema.Attribute.Required;
  };
}

export interface LpOfferStack extends Struct.ComponentSchema {
  collectionName: 'components_lp_offer_stacks';
  info: {
    description: 'Stack de valor com itens inclu\u00EDdos, pre\u00E7o e parcelamento';
    displayName: 'LP Offer Stack';
    icon: 'package';
  };
  attributes: {
    actual_price: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 50;
      }>;
    cta_text: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
      }> &
      Schema.Attribute.DefaultTo<'GARANTIR MINHA VAGA AGORA'>;
    headline: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }> &
      Schema.Attribute.DefaultTo<'O Que Voc\u00EA Vai Receber'>;
    installment_text: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
      }>;
    items: Schema.Attribute.Component<'shared.trust-badge', true> &
      Schema.Attribute.Required;
    total_value: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 50;
      }>;
  };
}

export interface LpProblemAgitation extends Struct.ComponentSchema {
  collectionName: 'components_lp_problem_agitations';
  info: {
    description: 'Se\u00E7\u00E3o de problema e agita\u00E7\u00E3o com lista de dores';
    displayName: 'LP Problem & Agitation';
    icon: 'alert-triangle';
  };
  attributes: {
    cta_text: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
      }>;
    headline: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }> &
      Schema.Attribute.DefaultTo<'Voc\u00EA j\u00E1 sentiu isso?'>;
    pain_points: Schema.Attribute.Component<'shared.trust-badge', true> &
      Schema.Attribute.Required;
    transition_text: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 500;
      }>;
  };
}

export interface LpSocialProofNumbers extends Struct.ComponentSchema {
  collectionName: 'components_lp_social_proof_numbers';
  info: {
    description: 'N\u00FAmeros de impacto e m\u00E9tricas de prova social';
    displayName: 'LP Social Proof Numbers';
    icon: 'trending-up';
  };
  attributes: {
    bg_style: Schema.Attribute.Enumeration<['dark', 'brand', 'light']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'dark'>;
    cta_text: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
      }>;
    headline: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
    metrics: Schema.Attribute.Component<'shared.social-proof', true> &
      Schema.Attribute.Required;
  };
}

export interface LpTestimonials extends Struct.ComponentSchema {
  collectionName: 'components_lp_testimonials';
  info: {
    description: 'Se\u00E7\u00E3o de depoimentos com carousel/grid';
    displayName: 'LP Testimonials Section';
    icon: 'message-circle';
  };
  attributes: {
    cta_text: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
      }>;
    headline: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }> &
      Schema.Attribute.DefaultTo<'Veja o que nossos alunos dizem'>;
    items: Schema.Attribute.Component<'shared.testimonial', true> &
      Schema.Attribute.Required;
    style: Schema.Attribute.Enumeration<['carousel', 'grid', 'stack']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'carousel'>;
  };
}

export interface LpUrgencyCta extends Struct.ComponentSchema {
  collectionName: 'components_lp_urgency_ctas';
  info: {
    description: 'CTA final com urg\u00EAncia, countdown e escassez';
    displayName: 'LP Urgency CTA';
    icon: 'zap';
  };
  attributes: {
    countdown_end: Schema.Attribute.DateTime;
    countdown_type: Schema.Attribute.Enumeration<['fixed', 'evergreen']> &
      Schema.Attribute.DefaultTo<'evergreen'>;
    cta_text: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
      }> &
      Schema.Attribute.DefaultTo<'GARANTIR AGORA COM DESCONTO'>;
    cta_variant: Schema.Attribute.Enumeration<['primary', 'urgency']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'urgency'>;
    headline: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }> &
      Schema.Attribute.DefaultTo<'\u00DAltima Chance!'>;
    scarcity_pct: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 100;
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<87>;
    scarcity_text: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
  };
}

export interface LpVideoSection extends Struct.ComponentSchema {
  collectionName: 'components_lp_video_sections';
  info: {
    description: 'Se\u00E7\u00E3o de v\u00EDdeo VSL com facade pattern';
    displayName: 'LP Video Section';
    icon: 'video';
  };
  attributes: {
    cta_text: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
      }>;
    description: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 500;
      }>;
    headline: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
    thumbnail: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    video_url: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 500;
      }>;
  };
}

export interface SharedFaqItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_faq_items';
  info: {
    description: 'Item de pergunta e resposta para FAQ';
    displayName: 'FAQ Item';
    icon: 'question-circle';
  };
  attributes: {
    answer: Schema.Attribute.Text & Schema.Attribute.Required;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    question: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 255;
      }>;
  };
}

export interface SharedSocialProof extends Struct.ComponentSchema {
  collectionName: 'components_shared_social_proofs';
  info: {
    description: 'M\u00E9trica de prova social com valor, label e \u00EDcone';
    displayName: 'Social Proof Metric';
    icon: 'chart-line';
  };
  attributes: {
    description: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
    icon: Schema.Attribute.Enumeration<
      [
        'users',
        'star',
        'award',
        'trending-up',
        'check-circle',
        'heart',
        'globe',
        'calendar',
        'play',
        'download',
      ]
    > &
      Schema.Attribute.DefaultTo<'users'>;
    label: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
      }>;
    value: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 50;
      }>;
  };
}

export interface SharedTestimonial extends Struct.ComponentSchema {
  collectionName: 'components_shared_testimonials';
  info: {
    description: 'Depoimento de cliente com foto, nome, avalia\u00E7\u00E3o e conte\u00FAdo';
    displayName: 'Testimonial';
    icon: 'quote';
  };
  attributes: {
    author_name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
      }>;
    author_photo: Schema.Attribute.Media<'images'>;
    author_role: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
      }>;
    badge_text: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 50;
      }> &
      Schema.Attribute.DefaultTo<'Compra verificada'>;
    content: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 1000;
      }>;
    rating: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          max: 5;
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<5>;
    verified: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
  };
}

export interface SharedTrustBadge extends Struct.ComponentSchema {
  collectionName: 'components_shared_trust_badges';
  info: {
    description: 'Badge de confian\u00E7a com \u00EDcone e label';
    displayName: 'Trust Badge';
    icon: 'shield-check';
  };
  attributes: {
    description: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
    icon: Schema.Attribute.Enumeration<
      [
        'check-circle',
        'shield-check',
        'star',
        'lock',
        'clock',
        'users',
        'award',
        'zap',
        'heart',
        'thumbs-up',
      ]
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'check-circle'>;
    label: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
      }>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'lp.benefits-grid': LpBenefitsGrid;
      'lp.comparison-table': LpComparisonTable;
      'lp.content-block': LpContentBlock;
      'lp.custom-html': LpCustomHtml;
      'lp.faq-accordion': LpFaqAccordion;
      'lp.guarantee': LpGuarantee;
      'lp.hero-section': LpHeroSection;
      'lp.media-logos': LpMediaLogos;
      'lp.offer-stack': LpOfferStack;
      'lp.problem-agitation': LpProblemAgitation;
      'lp.social-proof-numbers': LpSocialProofNumbers;
      'lp.testimonials': LpTestimonials;
      'lp.urgency-cta': LpUrgencyCta;
      'lp.video-section': LpVideoSection;
      'shared.faq-item': SharedFaqItem;
      'shared.social-proof': SharedSocialProof;
      'shared.testimonial': SharedTestimonial;
      'shared.trust-badge': SharedTrustBadge;
    }
  }
}
