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

interface ModernTemplateProps {
  user: User
  onLinkClick: (linkId: string, url: string) => void
}

export function ModernTemplate({ user, onLinkClick }: ModernTemplateProps) {
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

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        fontFamily: theme.fontFamily
      }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="relative z-10 max-w-md mx-auto py-16 px-6">
        {/* Profile Header */}
        <div className="text-center mb-12">
          {user.imageUrl && (
            <div className="mb-6">
              <div className="relative inline-block">
                <Image
                  src={user.imageUrl}
                  alt={`${user.firstName} ${user.lastName}`}
                  width={100}
                  height={100}
                  className="rounded-full mx-auto border-4 border-white/20 backdrop-blur-sm"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 to-transparent"></div>
              </div>
            </div>
          )}
          
          <h1 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
            {user.firstName} {user.lastName}
          </h1>
          
          {user.title && (
            <p className="text-lg text-white/90 mb-3 drop-shadow">
              {user.title}
            </p>
          )}
          
          {user.bio && (
            <p className="text-white/80 leading-relaxed drop-shadow max-w-xs mx-auto">
              {user.bio}
            </p>
          )}
        </div>

        {/* Links */}
        <div className="space-y-4">
          {user.links.map((link) => (
            <button
              key={link.id}
              onClick={() => onLinkClick(link.id, link.url)}
              className="w-full p-4 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300 group shadow-lg hover:shadow-xl hover:scale-105"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {link.icon && (
                    <span className="text-xl text-white/90 group-hover:text-white transition-colors">
                      {link.icon}
                    </span>
                  )}
                  <span className="font-medium text-white group-hover:text-white transition-colors">
                    {link.title}
                  </span>
                </div>
                <ExternalLink className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" />
              </div>
            </button>
          ))}
        </div>

        {user.links.length === 0 && (
          <div className="text-center py-16">
            <p className="text-white/60">Nenhum link disponível no momento.</p>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-16">
          <p className="text-sm text-white/50">
            Criado com{' '}
            <a 
              href="/" 
              className="text-white/70 hover:text-white transition-colors"
            >
              Unilink
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
