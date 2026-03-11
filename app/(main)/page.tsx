import { redirect } from 'next/navigation';

export default function Home() {
  // Redireciona o tráfego da index raiz (/) para o produto principal (Braz)
  // seguindo a taxonomia SEO de produtos do V3
  redirect('/braz');
}
