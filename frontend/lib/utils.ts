// ============================================
// UTILS.TS - Utility Functions
// ============================================

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combina classes do Tailwind CSS com suporte a condicionais
 * @param inputs - Classes a serem combinadas
 * @returns String com classes combinadas e otimizadas
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formata preço com moeda
 * @param price - Valor numérico
 * @param currency - Código da moeda (BRL, USD, EUR)
 * @returns Preço formatado (ex: R$ 197,00)
 */
export function formatPrice(price: number, currency: string = 'BRL'): string {
  const localeMap: Record<string, string> = {
    BRL: 'pt-BR',
    USD: 'en-US',
    EUR: 'de-DE',
  };

  return new Intl.NumberFormat(localeMap[currency] || 'pt-BR', {
    style: 'currency',
    currency,
  }).format(price);
}

/**
 * Trunca texto com reticências
 * @param text - Texto a ser truncado
 * @param maxLength - Comprimento máximo
 * @returns Texto truncado
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

/**
 * Gera slug a partir de texto
 * @param text - Texto a ser convertido
 * @returns Slug (ex: "meu-texto-aqui")
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/**
 * Formata data para exibição
 * @param date - String de data ISO ou Date object
 * @param locale - Locale (default: pt-BR)
 * @returns Data formatada (ex: "24 de fevereiro de 2026")
 */
export function formatDate(date: string | Date, locale: string = 'pt-BR'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Delay assíncrono
 * @param ms - Milissegundos
 * @returns Promise que resolve após o delay
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Extrai domínio de URL
 * @param url - URL completa
 * @returns Domínio (ex: "example.com")
 */
export function extractDomain(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace('www.', '');
  } catch {
    return '';
  }
}

/**
 * Verifica se está no ambiente do cliente (browser)
 * @returns true se estiver no cliente
 */
export function isClient(): boolean {
  return typeof window !== 'undefined';
}

/**
 * Verifica se dispositivo é mobile
 * @returns true se for mobile
 */
export function isMobile(): boolean {
  if (!isClient()) return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

/**
 * Obtém parâmetro de URL
 * @param param - Nome do parâmetro
 * @returns Valor do parâmetro ou null
 */
export function getUrlParam(param: string): string | null {
  if (!isClient()) return null;
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

/**
 * Obtém todos os parâmetros de URL
 * @returns Object com todos os parâmetros
 */
export function getAllUrlParams(): Record<string, string> {
  if (!isClient()) return {};
  const params: Record<string, string> = {};
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.forEach((value, key) => {
    params[key] = value;
  });
  return params;
}

/**
 * Scroll suave para elemento
 * @param elementId - ID do elemento
 * @param offset - Offset em pixels (default: 0)
 */
export function scrollToElement(elementId: string, offset: number = 0): void {
  if (!isClient()) return;
  const element = document.getElementById(elementId);
  if (!element) return;

  const y = element.getBoundingClientRect().top + window.pageYOffset + offset;
  window.scrollTo({ top: y, behavior: 'smooth' });
}

/**
 * Debounce function
 * @param func - Função a ser debounced
 * @param wait - Tempo de espera em ms
 * @returns Função debounced
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Gera ID único
 * @returns ID único
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Copia texto para clipboard
 * @param text - Texto a ser copiado
 * @returns Promise<boolean> - true se copiado com sucesso
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (!isClient()) return false;
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

/**
 * Obtém tempo de leitura estimado
 * @param text - Texto completo
 * @param wordsPerMinute - Palavras por minuto (default: 200)
 * @returns Tempo em minutos
 */
export function getReadingTime(text: string, wordsPerMinute: number = 200): number {
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

/**
 * Remove HTML tags de string
 * @param html - String com HTML
 * @returns String sem tags
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '');
}

/**
 * Valida email
 * @param email - Email a ser validado
 * @returns true se válido
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Formata número com separadores
 * @param num - Número a ser formatado
 * @param locale - Locale (default: pt-BR)
 * @returns Número formatado (ex: 10.000)
 */
export function formatNumber(num: number, locale: string = 'pt-BR'): string {
  return new Intl.NumberFormat(locale).format(num);
}

/**
 * Calcula porcentagem de desconto
 * @param original - Preço original
 * @param current - Preço atual
 * @returns Porcentagem de desconto
 */
export function calculateDiscount(original: number, current: number): number {
  return Math.round(((original - current) / original) * 100);
}
