"use client"

import { Navbar } from "@/components/navbar/Navbar"
import { HeroSection } from "@/components/hero/HeroSection"
import { StatsSection } from "@/components/stats/StatSection"
import { Box } from "@chakra-ui/react"
import LogisticServices from "@/components/services/LogisticServices"
import LogisticsFaqSection from "@/components/services/LogisticsFaqSection"
import Footer from "@/components/footer/Footer"
import TestimonialSlider from "@/components/testimonials/TestimonialSlider"

export default function Home() {

  return (
      <Box as="main" bg="white" minH="100vh">
        <Navbar />
        <HeroSection />
        <StatsSection />
        <LogisticServices />
        <TestimonialSlider />
        <LogisticsFaqSection />
        <Footer />
      </Box>
  )
}
