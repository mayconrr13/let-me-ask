import { Link } from 'react-router-dom'

import { Button } from '../components/Button'

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'

import '../styles/auth.scss'
import { useAuth } from '../hooks/useAuth'

export function NewRoom() {
  const { user } = useAuth()

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas"/>
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real</p>
      </aside>

      <main>
        <h1>{user?.name}</h1>
        <div className="main-content">
          <img src={logoImg} alt="let me ask"/>

          <h2>Criar nova sala</h2>

          <form>
            <input 
              type="text"
              placeholder="Nome da sala"
            />

            <Button type="submit" text="Criar sala" />
          </form>

          <p>Quer entrar em uma sala existente? 
            <Link to="/">
              clique aqui
            </Link>.
          </p>
        </div>
      </main>
    </div>
  )
}