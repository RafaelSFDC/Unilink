'use client'

import Image from 'next/image'
import { ExternalLink, MapPin, Mail, Phone } from 'lucide-react'

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

interface ProfessionalTemplateProps {
  user: User
  onLinkClick: (linkId: string, url: string) => void
}

export function ProfessionalTemplate({ user, onLinkClick }: ProfessionalTemplateProps) {
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
      className="min-h-screen bg-gray-50"
      style={{
        fontFamily: theme.fontFamily
      }}
    >
      <div className="max-w-2xl mx-auto py-12 px-6">
        {/* Header Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {user.imageUrl && (
              <div className="flex-shrink-0">
                <Image
                  src={user.imageUrl}
                  alt={`${user.firstName} ${user.lastName}`}
                  width={120}
                  height={120}
                  className="rounded-lg border-2 border-gray-100"
                />
              </div>
            )}
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {user.firstName} {user.lastName}
              </h1>
              
              {user.title && (
                <p className="text-xl text-blue-600 mb-3 font-medium">
                  {user.title}
                </p>
              )}
              
              {user.bio && (
                <p className="text-gray-600 leading-relaxed mb-4">
                  {user.bio}
                </p>
              )}

              {/* Contact Info Placeholder */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  <span>Contato disponível</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>Localização</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Links Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-2">
            Links Profissionais
          </h2>
          
          <div className="grid gap-3">
            {user.links.map((link) => (
              <button
                key={link.id}
                onClick={() => onLinkClick(link.id, link.url)}
                className="w-full p-4 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {link.icon && (
                      <span className="text-xl text-gray-600 group-hover:text-blue-600 transition-colors">
                        {link.icon}
                      </span>
                    )}
                    <div>
                      <span className="font-medium text-gray-900 group-hover:text-blue-900 transition-colors block">
                        {link.title}
                      </span>
                      {link.description && (
                        <span className="text-sm text-gray-500 group-hover:text-blue-600 transition-colors">
                          {link.description}
                        </span>
                      )}
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>
              </button>
            ))}
          </div>

          {user.links.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Nenhum link profissional disponível no momento.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-400">
            Perfil criado com{' '}
            <a 
              href="/" 
              className="text-blue-600 hover:text-blue-700 transition-colors font-medium"
            >
              Unilink
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
