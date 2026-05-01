"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function Hero({ introText }: { introText: string }) {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-brand-dark z-0">
        <div className="absolute top-0 -right-1/4 w-[800px] h-[800px] bg-brand-red/10 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-brand-red/5 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 leading-tight text-white">
              SMASH <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-red-400">
                YOUR CRAVINGS.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl mx-auto lg:mx-0 font-medium">
              {introText || "Experience the best smash burgers, crispy hand-breaded fried chicken, and loaded sides in town."}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link 
                href="/menu"
                className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white bg-brand-red rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-xl shadow-brand-red/20"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-brand-red via-brand-red to-black opacity-0 group-hover:opacity-100 transition-opacity ease-out duration-300"></span>
                <span className="relative flex items-center gap-2">
                  View Menu <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="flex-1 relative w-full max-w-lg lg:max-w-none"
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        >
          {/* Floating Burger Image Illustration */}
          <div className="relative aspect-square rounded-full bg-gradient-to-tr from-black to-brand-red/5 flex items-center justify-center">
            <motion.img 
              src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop"
              alt="Delicious Smash Burger" 
              className="w-3/4 h-3/4 object-cover rounded-full shadow-2xl border-8 border-brand-card"
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            />
            {/* Floating Badges */}
            <motion.div 
              className="absolute top-10 right-10 glass px-4 py-2 rounded-2xl font-bold text-brand-red shadow-lg"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
            >
              100% Beef
            </motion.div>
            <motion.div 
              className="absolute bottom-20 left-4 glass px-4 py-2 rounded-2xl font-bold text-white shadow-lg"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }}
            >
              Hand-breaded Chicken
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
