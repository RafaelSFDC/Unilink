'use client'

import Image from 'next/image'
import { ExternalLink, Sparkles, Heart, Star } from 'lucide-react'

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

interface CreativeTemplateProps {
  user: User
  onLinkClick: (linkId: string, url: string) => void
}

export function CreativeTemplate({ user, onLinkClick }: CreativeTemplateProps) {
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

  const decorativeElements = [
    { icon: Sparkles, color: 'text-yellow-400', delay: '0s' },
    { icon: Heart, color: 'text-pink-400', delay: '2s' },
    { icon: Star, color: 'text-purple-400', delay: '4s' },
  ]

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        background: 'linear-gradient(45deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)',
        fontFamily: theme.fontFamily
      }}
    >
      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(3deg); }
          75% { transform: rotate(-3deg); }
        }
        @keyframes float-random {
          0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(120deg); }
          66% { transform: translate(-20px, 20px) rotate(240deg); }
        }
      `}</style>

      {/* Decorative Background Elements */}
      <div className="absolute inset-0">
        {decorativeElements.map((element, index) => (
          <div
            key={index}
            className={`absolute ${element.color} opacity-20`}
            style={{
              top: `${20 + index * 25}%`,
              left: `${10 + index * 30}%`,
              animation: `float-random ${8 + index * 2}s ease-in-out infinite`,
              animationDelay: element.delay
            }}
          >
            <element.icon className="w-8 h-8" />
          </div>
        ))}
        
        {/* More decorative elements */}
        <div className="absolute top-1/4 right-10 text-blue-300 opacity-30" style={{ animation: 'bounce-slow 6s ease-in-out infinite' }}>
          <Sparkles className="w-6 h-6" />
        </div>
        <div className="absolute bottom-1/3 left-8 text-green-300 opacity-30" style={{ animation: 'wiggle 4s ease-in-out infinite' }}>
          <Heart className="w-5 h-5" />
        </div>
      </div>

      <div className="relative z-10 max-w-md mx-auto py-16 px-6">
        {/* Profile Header */}
        <div className="text-center mb-12">
          {user.imageUrl && (
            <div className="mb-6">
              <div 
                className="relative inline-block"
                style={{ animation: 'wiggle 8s ease-in-out infinite' }}
              >
                <Image
                  src={user.imageUrl}
                  alt={`${user.firstName} ${user.lastName}`}
                  width={120}
                  height={120}
                  className="rounded-full mx-auto border-4 border-white shadow-2xl"
                />
                {/* Decorative border */}
                <div className="absolute -inset-2 rounded-full border-2 border-dashed border-white/50 animate-spin" style={{ animationDuration: '20s' }}></div>
              </div>
            </div>
          )}
          
          <h1 className="text-3xl font-bold text-white mb-3 drop-shadow-lg" style={{ animation: 'bounce-slow 4s ease-in-out infinite' }}>
            {user.firstName} {user.lastName} ✨
          </h1>
          
          {user.title && (
            <p className="text-xl text-white/95 mb-4 drop-shadow font-medium">
              {user.title} 🎨
            </p>
          )}
          
          {user.bio && (
            <p className="text-white/90 leading-relaxed drop-shadow max-w-xs mx-auto text-lg">
              {user.bio} 💫
            </p>
          )}
        </div>

        {/* Links */}
        <div className="space-y-4">
          {user.links.map((link, index) => (
            <button
              key={link.id}
              onClick={() => onLinkClick(link.id, link.url)}
              className="w-full p-4 rounded-3xl bg-white/20 backdrop-blur-sm border-2 border-white/30 hover:bg-white/30 hover:border-white/50 transition-all duration-300 group shadow-lg hover:shadow-xl transform hover:scale-105"
              style={{ 
                animation: `bounce-slow ${4 + index * 0.5}s ease-in-out infinite`,
                animationDelay: `${index * 0.2}s`
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {link.icon && (
                    <span className="text-2xl group-hover:animate-bounce">
                      {link.icon}
                    </span>
                  )}
                  <span className="font-bold text-white text-lg drop-shadow">
                    {link.title}
                  </span>
                </div>
                <ExternalLink className="w-5 h-5 text-white/90 group-hover:text-white transition-colors drop-shadow group-hover:animate-pulse" />
              </div>
            </button>
          ))}
        </div>

        {user.links.length === 0 && (
          <div className="text-center py-16">
            <p className="text-white/80 text-lg drop-shadow">Nenhum link criativo disponível ainda! 🎭</p>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-16">
          <p className="text-white/70 drop-shadow">
            Criado com muito{' '}
            <Heart className="inline w-4 h-4 text-red-300 animate-pulse" />
            {' '}no{' '}
            <a 
              href="/" 
              className="text-white font-bold hover:text-white/90 transition-colors"
            >
              Unilink 🌈
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
