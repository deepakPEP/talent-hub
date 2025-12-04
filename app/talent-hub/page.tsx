'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  ArrowRight, Users, CheckCircle2, Briefcase, Shield, TrendingUp, Clock, DollarSign, Target, Lightbulb,
  MessageSquare, BarChart3, Zap, Award
} from "lucide-react";
import { TalentInquiryForm } from "@/components/TalentHub/TalentInquiryForm";

const pepagoraLogo = "/assets/pepagora-logo.png";
const excelerateLogo = "/assets/excelerate-logo.png";

export default function TalentHubLanding() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="https://www.pepagora.com" target="_blank" rel="noopener noreferrer">
              <Image src={pepagoraLogo} alt="Pepagora" width={120} height={40} className="h-10 w-auto" />
            </a>
            <span className="text-muted-foreground">×</span>
            <a href="https://www.4excelerate.org" target="_blank" rel="noopener noreferrer">
              <Image src={excelerateLogo} alt="Excelerate" width={120} height={40} className="w-[90px] h-[20px] md:w-auto md:h-10" />
            </a>
          </div>
          <Button onClick={() => scrollToSection('inquiry-form')} variant="default" className="text-white hidden md:block">
            Get Started
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-[#1e3a8a] via-[#1e40af] to-[#06b6d4] text-white">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-size-[32px_32px]" />
        <div className="container relative mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-[12px] md:text-sm bg-white/20 text-white border-white/30">
              Pepagora × Excelerate: A Solution for Growing SMEs
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Build Your Team Without Breaking Your Budget
            </h1>

            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Access pre-trained candidates who understand real business problems. Pay nothing for recruitment.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6"
                onClick={() => scrollToSection('inquiry-form')}
              >
                Share Your Hiring Needs <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
                onClick={() => scrollToSection('how-it-works')}
              >
                Learn How It Works
              </Button>
            </div>

            {/* Stats Bar */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div>
                <div className="text-4xl font-bold mb-2">200,000+</div>
                <div className="text-blue-100">Learners Engaged</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">190+</div>
                <div className="text-blue-100">Countries</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">10,000+</div>
                <div className="text-blue-100">Projects Completed</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">60%</div>
                <div className="text-blue-100">Faster Hiring</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">You&apos;re Not Alone</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                76% of business leaders say finding the right people is their biggest challenge
              </h2>
              <p className="text-lg text-muted-foreground">
                You&apos;re already managing suppliers, clients, inventory, cash flow, and a hundred other things. Hiring shouldn&apos;t be another headache.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-destructive/20 bg-destructive">
                <CardHeader>
                  <Clock className="w-10 h-10 text-destructive mb-2" />
                  <CardTitle className="text-lg">Training Takes Forever</CardTitle>
                  <CardDescription>
                    Fresh graduates need months of handholding. Experienced people want salaries you can&apos;t always afford.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-destructive/20 bg-destructive">
                <CardHeader>
                  <TrendingUp className="w-10 h-10 text-destructive mb-2" />
                  <CardTitle className="text-lg">Crisis-Mode Hiring</CardTitle>
                  <CardDescription>
                    Someone quits, you scramble. Post ads, sift through resumes, interview dozens, and hope for the best.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-destructive/20 bg-destructive">
                <CardHeader>
                  <DollarSign className="w-10 h-10 text-destructive mb-2" />
                  <CardTitle className="text-lg">Expensive Agencies</CardTitle>
                  <CardDescription>
                    Paying 15-20% of annual salary for one hire? That&apos;s thousands you could spend on growth.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-destructive from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <Badge variant="default" className="mb-4 text-white">What If There Was Another Way?</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Get Access to Pre-Trained Candidates Who Prove Their Skills Before You Hire
            </h2>

            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm">
                <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Pre-trained candidates</h3>
                  <p className="text-muted-foreground text-sm">Understand real business problems from day one</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm">
                <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Build a talent pipeline</h3>
                  <p className="text-muted-foreground text-sm">Always ready when you need to scale</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm">
                <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Zero recruitment fees</h3>
                  <p className="text-muted-foreground text-sm">Pay nothing for candidate shortlisting</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm">
                <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Less time screening</h3>
                  <p className="text-muted-foreground text-sm">More time growing your business</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-section">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Five simple steps to connect with proven talent
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-5 gap-4">
              {[
                { step: 1, title: "Share Your Challenge", desc: "15-minute conversation about your roles and needs", icon: MessageSquare },
                { step: 2, title: "We Create Projects", desc: "Real-world projects based on your business needs", icon: Lightbulb },
                { step: 3, title: "Candidates Prove Skills", desc: "Learners from 190+ countries work on your challenges", icon: Target },
                { step: 4, title: "Get Shortlisted Talent", desc: "Curated list of candidates who demonstrated skills", icon: Users },
                { step: 5, title: "You Decide", desc: "Hire who you want, when you want. No fees.", icon: Award },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full text-center relative overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-3 font-bold text-lg text-white">
                        {item.step}
                      </div>
                      <item.icon className="w-8 h-8 mx-auto text-primary mb-2" />
                      <CardTitle className="text-base">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What You Get</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Beyond just candidates. Real business value from day one.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <BarChart3 className="w-10 h-10 text-primary mb-4" />
                <CardTitle>Market Research & Insights</CardTitle>
                <CardDescription>
                  Candidates analyze your market, competitors, and opportunities as part of their projects
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <Zap className="w-10 h-10 text-primary mb-4" />
                <CardTitle>Digital Support</CardTitle>
                <CardDescription>
                  Help with social media, content creation, website improvements, and online presence
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <Briefcase className="w-10 h-10 text-primary mb-4" />
                <CardTitle>Process Solutions</CardTitle>
                <CardDescription>
                  Fresh ideas for improving operations, customer service, or supply chain efficiency
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <Shield className="w-10 h-10 text-primary mb-4" />
                <CardTitle>Talent You Can Trust</CardTitle>
                <CardDescription>
                  People who&apos;ve already proven they can deliver before you make any hiring decision
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section id="benefits" className="py-20 bg-section">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why This Works for SMEs</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We&apos;ve designed this to need almost nothing from you
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { title: "Pre-trained talent", desc: "Candidates who&apos;ve completed real business projects and understand how companies work" },
              { title: "Skills validated through work", desc: "See actual deliverables before you hire. No more guessing based on interviews alone" },
              { title: "Fresh perspective", desc: "Get market insights, competitor research, and new ideas while evaluating talent" },
              { title: "No recruitment fees", desc: "Zero cost for accessing candidates. You only pay salaries if you hire" },
              { title: "Ongoing pipeline", desc: "As your business grows, your talent pipeline grows with it. Always ready when you need to scale" },
              { title: "Minimal time from you", desc: "No supervision needed. Just review final presentations and decide who to hire" },
            ].map((benefit, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm">
                <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form Section */}
      <section id="inquiry-form" className="py-20 bg-custom from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Build Your Team?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Share your hiring needs and we&apos;ll create customized talent opportunities for you
            </p>
          </motion.div>

          <TalentInquiryForm />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[#f1f5f980] ">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Questions You Might Have</h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-white rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold">
                  Do I have to commit to hiring anyone?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  No. You review candidate work, interview who you want, and decide if they&apos;re right for you. There&apos;s no obligation. All completing candidates receive digital certificates and scholarship opportunities regardless.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-white rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold">
                  What if I only need part-time or project-based help?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  That works too. We can match you with candidates looking for internships, project work, or part-time roles. Flexibility is built into the program.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-white rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold">
                  How long does it take to get candidates?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  For common roles, we can start creating opportunities within 2-3 weeks. Projects typically run 4 weeks, then you review presentations and shortlisted candidates.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-white rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold">
                  What if the candidate doesn&apos;t work out?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Since there&apos;s no placement fee, there&apos;s no financial risk. You simply let us know, and we&apos;ll create more opportunities to find better matches.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="bg-white rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold">
                  Is this only for tech roles?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  No. We support roles across sales, marketing, operations, finance, customer service, supply chain, research, content creation, and much more. If you have a business challenge, we can design projects around it.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="bg-white rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold">
                  What kind of business problems can candidates work on?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Market research, competitor analysis, digital marketing strategies, process improvements, customer experience design, supply chain optimization, content creation, and much more. We customize projects to your actual needs.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Your Next Great Hire Shouldn&apos;t Be This Hard to Find</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90 text-white">
              You don&apos;t need a big HR team. You don&apos;t need to pay agency fees. You just need access to the right people at the right time.
            </p>
            <Button 
              size="lg" 
              onClick={() => scrollToSection('inquiry-form')} 
              className="gap-2 bg-white text-primary hover:bg-white/90"
            >
              Get Started Today
              <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* About */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <Image src={pepagoraLogo} alt="Pepagora" width={120} height={40} className="h-10 w-auto" />
                <span className="text-muted-foreground">×</span>
                <Image src={excelerateLogo} alt="Excelerate" width={120} height={40} className="w-[120px] h-[25px] md:h-10 md:w-auto" />
              </div>
              <p className="text-sm text-muted-foreground">
                Together, we&apos;re solving one of the biggest challenges SMEs face: finding good people without breaking the budget.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => scrollToSection('how-it-works')} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    How It Works
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('benefits')} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Benefits
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('inquiry-form')} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Get Started
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold mb-4">Get in Touch</h3>
              <ul className="space-y-2">
                <li>
                  <a href="mailto:support@pepagora.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Email Support
                  </a>
                </li>
                <li>
                  <button onClick={() => scrollToSection('inquiry-form')} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Submit an Inquiry
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Pepagora × Excelerate. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              From verified partners to verified talent
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}