'use client'

import Image from 'next/image'
import { ExternalLink } from 'lucide-react'

interface User {
  id: string
  username: string
  firstName: string | null
  lastName: string | null
  imageUrl: string | null
  bio: string | null
  title: string | null
  links: Array<{
    id: string
    title: string
    url: string
    description: string | null
    icon: string | null
    order: number
  }>
  theme: {
    backgroundColor: string
    textColor: string
    linkColor: string
    buttonStyle: string
    fontFamily: string
    backgroundType: string
    backgroundImage: string | null
    gradientFrom: string | null
    gradientTo: string | null
  } | null
}

interface VibrantTemplateProps {
  user: User
  onLinkClick: (linkId: string, url: string) => void
}

export function VibrantTemplate({ user, onLinkClick }: VibrantTemplateProps) {
  const theme = user.theme || {
    backgroundColor: '#ffffff',
    textColor: '#000000',
    linkColor: '#1a73e8',
    buttonStyle: 'rounded',
    fontFamily: 'Inter',
    backgroundType: 'solid',
    backgroundImage: null,
    gradientFrom: null,
    gradientTo: null,
  }

  const vibrantColors = [
    'from-pink-500 to-violet-500',
    'from-blue-500 to-cyan-500',
    'from-green-500 to-emerald-500',
    'from-yellow-500 to-orange-500',
    'from-purple-500 to-pink-500',
    'from-indigo-500 to-blue-500'
  ]

  return (
    <div 
      className="min-h-screen relative"
      style={{
        background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57, #ff9ff3)',
        backgroundSize: '400% 400%',
        animation: 'gradientShift 15s ease infinite',
        fontFamily: theme.fontFamily
      }}
    >
      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-white/15 rounded-full blur-lg" style={{ animation: 'float 6s ease-in-out infinite' }}></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-white/10 rounded-full blur-2xl" style={{ animation: 'float 8s ease-in-out infinite reverse' }}></div>
      </div>

      <div className="relative z-10 max-w-md mx-auto py-16 px-6">
        {/* Profile Header */}
        <div className="text-center mb-12">
          {user.imageUrl && (
            <div className="mb-6">
              <div className="relative inline-block" style={{ animation: 'pulse 4s ease-in-out infinite' }}>
                <Image
                  src={user.imageUrl}
                  alt={`${user.firstName} ${user.lastName}`}
                  width={120}
                  height={120}
                  className="rounded-full mx-auto border-4 border-white shadow-2xl"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/30 to-transparent"></div>
              </div>
            </div>
          )}
          
          <h1 className="text-3xl font-bold text-white mb-3 drop-shadow-lg">
            {user.firstName} {user.lastName}
          </h1>
          
          {user.title && (
            <p className="text-xl text-white/95 mb-4 drop-shadow font-medium">
              {user.title}
            </p>
          )}
          
          {user.bio && (
            <p className="text-white/90 leading-relaxed drop-shadow max-w-xs mx-auto text-lg">
              {user.bio}
            </p>
          )}
        </div>

        {/* Links */}
        <div className="space-y-4">
          {user.links.map((link, index) => (
            <button
              key={link.id}
              onClick={() => onLinkClick(link.id, link.url)}
              className={`w-full p-4 rounded-2xl bg-gradient-to-r ${vibrantColors[index % vibrantColors.length]} shadow-lg hover:shadow-2xl transition-all duration-300 group hover:scale-105 transform`}
              style={{ animation: `float ${3 + index * 0.5}s ease-in-out infinite` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {link.icon && (
                    <span className="text-2xl text-white drop-shadow">
                      {link.icon}
                    </span>
                  )}
                  <span className="font-bold text-white text-lg drop-shadow">
                    {link.title}
                  </span>
                </div>
                <ExternalLink className="w-5 h-5 text-white/90 group-hover:text-white transition-colors drop-shadow" />
              </div>
            </button>
          ))}
        </div>

        {user.links.length === 0 && (
          <div className="text-center py-16">
            <p className="text-white/80 text-lg drop-shadow">Nenhum link disponível no momento.</p>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-16">
          <p className="text-white/70 drop-shadow">
            Criado com{' '}
            <a 
              href="/" 
              className="text-white font-bold hover:text-white/90 transition-colors"
            >
              Unilink ✨
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
