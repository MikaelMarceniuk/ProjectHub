import withChildren from '@/@types/withChildren'
import { ThemeToggle } from '@/components/shadcn/theme-toggle'
import { Github, Kanban } from 'lucide-react'
import { NextPage } from 'next'
import Link from 'next/link'
import Navbar from './components/navbar'

type AuthProps = withChildren

const AuthLayout: NextPage<AuthProps> = ({ children }) => {
  return (
    <div className="min-h-screen">
      <header className="flex justify-between h-16 px-8 items-center">
        <Link href="#">
          <div className="flex gap-2">
            <Kanban />
            <span>Project Hub</span>
          </div>
        </Link>
        <Navbar />
      </header>
      <main className="h-page-children-wrapper">{children}</main>
      <footer className="h-20 px-6 py-7 flex justify-between items-center">
        <div className="flex gap-2">
          <Link href="#">
            <div className="flex gap-2">
              <Kanban />
              <span>Project Hub</span>
            </div>
          </Link>
          <p>© {new Date().getFullYear()}</p>
        </div>
        <div className="flex gap-2 items-center">
          <Link
            href="https://github.com/MikaelMarceniuk/ProjectHub-Frontend"
            target="_blank"
          >
            <Github
              size={20}
              className="hover:text-black text-gray-500 dark:hover:text-white"
            />
          </Link>
          <ThemeToggle />
        </div>
      </footer>
    </div>
  )
}

export default AuthLayout
