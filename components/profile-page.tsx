'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ExternalLink } from 'lucide-react'
import { trackClick } from '@/app/actions/analytics'

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

interface ProfilePageProps {
  user: User
}

export function ProfilePage({ user }: ProfilePageProps) {
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

  const handleLinkClick = async (linkId: string, url: string) => {
    // Track click
    await trackClick(linkId)
    
    // Open link
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const getBackgroundStyle = () => {
    if (theme.backgroundType === 'gradient' && theme.gradientFrom && theme.gradientTo) {
      return {
        background: `linear-gradient(135deg, ${theme.gradientFrom}, ${theme.gradientTo})`
      }
    }
    
    if (theme.backgroundType === 'image' && theme.backgroundImage) {
      return {
        backgroundImage: `url(${theme.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }
    }
    
    return {
      backgroundColor: theme.backgroundColor
    }
  }

  const getButtonStyle = () => {
    const baseStyle = {
      backgroundColor: theme.linkColor,
      color: theme.backgroundColor,
      border: 'none',
      padding: '12px 24px',
      margin: '8px 0',
      width: '100%',
      fontSize: '16px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      textDecoration: 'none'
    }

    switch (theme.buttonStyle) {
      case 'square':
        return { ...baseStyle, borderRadius: '4px' }
      case 'pill':
        return { ...baseStyle, borderRadius: '50px' }
      default:
        return { ...baseStyle, borderRadius: '8px' }
    }
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        ...getBackgroundStyle(),
        color: theme.textColor,
        fontFamily: theme.fontFamily
      }}
    >
      <div className="max-w-md w-full">
        {/* Profile Header */}
        <div className="text-center mb-8">
          {user.imageUrl && (
            <div className="mb-4">
              <Image
                src={user.imageUrl}
                alt={`${user.firstName} ${user.lastName}`}
                width={120}
                height={120}
                className="rounded-full mx-auto border-4 border-white shadow-lg"
              />
            </div>
          )}
          
          <h1 className="text-2xl font-bold mb-2">
            {user.firstName} {user.lastName}
          </h1>
          
          {user.title && (
            <p className="text-lg opacity-80 mb-2">
              {user.title}
            </p>
          )}
          
          {user.bio && (
            <p className="opacity-70 leading-relaxed">
              {user.bio}
            </p>
          )}
        </div>

        {/* Links */}
        <div className="space-y-4">
          {user.links.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id, link.url)}
              style={getButtonStyle()}
              className="hover:opacity-90 hover:scale-105 transform transition-all duration-200"
            >
              {link.icon && (
                <span className="text-xl">{link.icon}</span>
              )}
              <span>{link.title}</span>
              <ExternalLink className="w-4 h-4 ml-auto" />
            </button>
          ))}
        </div>

        {user.links.length === 0 && (
          <div className="text-center py-12 opacity-60">
            <p>Nenhum link disponível no momento.</p>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12 opacity-50">
          <p className="text-sm">
            Criado com{' '}
            <a 
              href="/" 
              className="underline hover:opacity-80"
              style={{ color: theme.linkColor }}
            >
              Unilink
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
