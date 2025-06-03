'use client'

import { useState, useRef, useEffect } from 'react'
import { Mic, MicOff, Volume2 } from 'lucide-react'

interface VoiceSearchProps {
  onVoiceResult: (query: string) => void
  onListening?: (isListening: boolean) => void
  className?: string
}

export default function VoiceSearch({ onVoiceResult, onListening, className = '' }: VoiceSearchProps) {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [confidence, setConfidence] = useState(0)
  const [isSupported, setIsSupported] = useState(false)
  const recognitionRef = useRef<any>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Check if speech recognition is supported
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      setIsSupported(!!SpeechRecognition)

      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = false
        recognitionRef.current.interimResults = true
        recognitionRef.current.lang = 'en-US'

        recognitionRef.current.onstart = () => {
          setIsListening(true)
          onListening?.(true)
        }

        recognitionRef.current.onresult = (event: any) => {
          let interimTranscript = ''
          let finalTranscript = ''

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript
            const confidence = event.results[i][0].confidence

            if (event.results[i].isFinal) {
              finalTranscript += transcript
              setConfidence(confidence)
            } else {
              interimTranscript += transcript
            }
          }

          setTranscript(finalTranscript || interimTranscript)

          if (finalTranscript) {
            onVoiceResult(finalTranscript)
            stopListening()
          }
        }

        recognitionRef.current.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error)
          stopListening()
        }

        recognitionRef.current.onend = () => {
          stopListening()
        }
      }
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [onVoiceResult, onListening])

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setTranscript('')
      setConfidence(0)
      recognitionRef.current.start()

      // Auto-stop after 10 seconds
      timeoutRef.current = setTimeout(() => {
        stopListening()
      }, 10000)
    }
  }

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
    }
    setIsListening(false)
    onListening?.(false)
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }

  const toggleListening = () => {
    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }

  if (!isSupported) {
    return (
      <div className={`flex items-center space-x-2 text-gray-500 ${className}`}>
        <MicOff className="w-5 h-5" />
        <span className="text-sm">Voice search not supported</span>
      </div>
    )
  }

  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      <div className="flex items-center space-x-3">
        <button
          onClick={toggleListening}
          className={`relative p-3 rounded-full transition-all duration-300 ${
            isListening
              ? 'bg-red-500 hover:bg-red-600 animate-pulse'
              : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
          } text-white shadow-lg hover:shadow-xl transform hover:scale-105`}
          disabled={!isSupported}
        >
          {isListening ? (
            <MicOff className="w-6 h-6" />
          ) : (
            <Mic className="w-6 h-6" />
          )}
          
          {isListening && (
            <div className="absolute inset-0 rounded-full border-2 border-white animate-ping" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            {isListening ? 'Listening...' : 'Voice Search'}
          </div>
          {transcript && (
            <div className="text-xs text-gray-600 dark:text-gray-400 truncate">
              "{transcript}"
            </div>
          )}
        </div>

        {confidence > 0 && (
          <div className="flex items-center space-x-1 text-xs text-green-600">
            <Volume2 className="w-3 h-3" />
            <span>{Math.round(confidence * 100)}%</span>
          </div>
        )}
      </div>

      {isListening && (
        <div className="flex items-center space-x-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex space-x-1">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`w-1 bg-blue-500 rounded-full animate-pulse`}
                style={{
                  height: `${8 + Math.random() * 16}px`,
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: '0.8s'
                }}
              />
            ))}
          </div>
          <div className="text-sm text-blue-700 dark:text-blue-300">
            {transcript || 'Speak your flight search...'}
          </div>
        </div>
      )}

      <div className="text-xs text-gray-500 dark:text-gray-400">
        Try: "Find flights from New York to Tokyo next Friday" or "Show me eco-friendly options to Paris"
      </div>
    </div>
  )
}
