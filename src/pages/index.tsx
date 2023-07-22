import { AlertInfo } from '@/components/alerts'

export default function Home() {
  return (
    <main>
      <p>Ainda não é cliente? </p>
      <a href="/register" className="font-bold text-lg hover:underline">
        Criar Conta
      </a>
    </main>
  )
}
