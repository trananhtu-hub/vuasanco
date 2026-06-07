"use client"

import React, { useState, useEffect } from "react"

type CountdownTimerProps = {
  endDate: string
}

export default function CountdownTimer({ endDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number
    hours: number
    minutes: number
    seconds: number
  } | null>(null)

  useEffect(() => {
    const target = new Date(endDate).getTime()

    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const difference = target - now

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 }
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    // Set initial value
    setTimeLeft(calculateTimeLeft())

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(interval)
  }, [endDate])

  if (!timeLeft) {
    return (
      <div className="flex gap-x-3 mt-4 animate-pulse">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="w-16 h-16 bg-editorial-dark/10 border-4 border-editorial-dark" />
            <div className="w-10 h-4 bg-editorial-dark/10 mt-1" />
          </div>
        ))}
      </div>
    )
  }

  const formatNumber = (num: number) => String(num).padStart(2, "0")

  const timeUnits = [
    { label: "NGÀY", value: timeLeft.days },
    { label: "GIỜ", value: timeLeft.hours },
    { label: "PHÚT", value: timeLeft.minutes },
    { label: "GIÂY", value: timeLeft.seconds },
  ]

  return (
    <div className="flex gap-x-3 mt-4">
      {timeUnits.map((unit, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="bg-editorial-dark text-editorial-neonVolt font-editorial font-black text-3xl md:text-4xl w-16 h-16 md:w-20 md:h-20 flex items-center justify-center border-4 border-editorial-dark shadow-[3px_3px_0px_#FF0055]">
            {formatNumber(unit.value)}
          </div>
          <span className="text-[10px] md:text-xs font-sans font-black tracking-widest text-editorial-dark mt-2">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  )
}
