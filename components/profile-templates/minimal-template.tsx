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

interface MinimalTemplateProps {
  user: User
  onLinkClick: (linkId: string, url: string) => void
}

export function MinimalTemplate({ user, onLinkClick }: MinimalTemplateProps) {
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
      className="min-h-screen bg-white"
      style={{
        fontFamily: theme.fontFamily
      }}
    >
      <div className="max-w-sm mx-auto py-16 px-6">
        {/* Profile Header */}
        <div className="text-center mb-12">
          {user.imageUrl && (
            <div className="mb-6">
              <Image
                src={user.imageUrl}
                alt={`${user.firstName} ${user.lastName}`}
                width={80}
                height={80}
                className="rounded-full mx-auto grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          )}
          
          <h1 className="text-xl font-light text-gray-900 mb-2 tracking-wide">
            {user.firstName} {user.lastName}
          </h1>
          
          {user.title && (
            <p className="text-sm text-gray-500 mb-3 font-light">
              {user.title}
            </p>
          )}
          
          {user.bio && (
            <p className="text-sm text-gray-600 leading-relaxed font-light max-w-xs mx-auto">
              {user.bio}
            </p>
          )}
        </div>

        {/* Links */}
        <div className="space-y-3">
          {user.links.map((link) => (
            <button
              key={link.id}
              onClick={() => onLinkClick(link.id, link.url)}
              className="w-full py-3 px-4 text-left border border-gray-200 hover:border-gray-300 transition-all duration-200 group bg-white hover:bg-gray-50"
              style={{ borderRadius: '2px' }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {link.icon && (
                    <span className="text-lg text-gray-400 group-hover:text-gray-600 transition-colors">
                      {link.icon}
                    </span>
                  )}
                  <span className="text-sm font-light text-gray-700 group-hover:text-gray-900 transition-colors">
                    {link.title}
                  </span>
                </div>
                <ExternalLink className="w-3 h-3 text-gray-300 group-hover:text-gray-500 transition-colors" />
              </div>
            </button>
          ))}
        </div>

        {user.links.length === 0 && (
          <div className="text-center py-16">
            <p className="text-sm text-gray-400 font-light">Nenhum link disponível</p>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-16">
          <p className="text-xs text-gray-300 font-light">
            <a 
              href="/" 
              className="hover:text-gray-400 transition-colors"
            >
              Unilink
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
