/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import logo from './assets/images/logo.png';
import blackClasp from './assets/images/black_clasp_1779246260487.png';
import canvasToteBag from './assets/images/canvas_tote_bag_1779247537276.png';
import canvasApron from './assets/images/canvas_apron_1779247882675.png';
import { 
  Menu, 
  X, 
  ChevronRight, 
  ShieldCheck, 
  Globe, 
  Truck, 
  Search, 
  BarChart3, 
  Clock, 
  AlertCircle,
  Package,
  ArrowRight,
  Phone,
  PhoneCall,
  Mail,
  MapPin
} from 'lucide-react';

const colors = {
  blue: '#003087',
  orange: '#FF4D4D',
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedCase, setSelectedCase] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroContent = [
    { 
      img: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=2670&auto=format&fit=crop", 
      topic: "소상공인의 든든한 파트너" 
    },
    { 
      img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=2670&auto=format&fit=crop", 
      topic: "1:1 정밀 수입 컨설팅" 
    },
    { 
      img: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaad5b?q=80&w=2670&auto=format&fit=crop", 
      topic: "철저한 현지 전수 검수" 
    },
    { 
      img: "https://images.unsplash.com/photo-1517245385169-d231b176f112?q=80&w=2670&auto=format&fit=crop", 
      topic: "함께 만드는 성공 스토리" 
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroContent.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { title: 'Home', href: '#home' },
    { title: '회사소개', href: '#about' },
    { title: '서비스', href: '#services' },
    { title: '우리의 강점', href: '#strengths' },
    { title: '실제 사례', href: '#cases' },
    { title: '문의하기', href: '#contact' },
  ];

  const handlePhoneClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    
    // 업무 시간: 오전 10시 (10:00:00) ~ 오후 6시 (17:59:59)
    if (currentHour >= 10 && currentHour < 18) {
      window.location.href = 'tel:010-5821-7531';
    } else {
      alert('오전10 부터 오후 6시까지만 전화상담이 가능합니다');
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-brand-orange selection:text-white">
      <AnimatePresence mode="wait">
        {selectedCase ? (
          <motion.div
            key="detail"
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.02, y: -10 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-[60]"
          >
            <CaseDetail caseId={selectedCase} onBack={() => setSelectedCase(null)} />
          </motion.div>
        ) : (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-lg">
          <a href="#home" className="flex items-center gap-2">
            <div className={`transition-all duration-300 px-3 py-1.5 rounded-xl flex items-center justify-center ${
              scrolled ? 'bg-transparent shadow-none' : 'bg-white/95 backdrop-blur-sm shadow-sm'
            }`}>
              <img 
                src={logo} 
                alt="지빈스 로고" 
                className="h-8 w-auto object-contain brightness-100"
                referrerPolicy="no-referrer"
              />
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-sm font-bold">
            {navLinks.map((link) => (
              <a 
                key={link.title} 
                href={link.href} 
                className={`transition-colors ${scrolled ? 'text-slate-600 hover:text-brand-blue' : 'text-white/80 hover:text-white'}`}
              >
                {link.title}
              </a>
            ))}
            <a 
              href="#contact" 
              className={`px-5 py-2 rounded-full text-base font-bold transition-all ${
                scrolled 
                  ? 'bg-brand-blue text-white hover:bg-opacity-90' 
                  : 'bg-white text-brand-blue hover:bg-opacity-90'
              }`}
            >
              상담하기
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className={scrolled ? 'text-brand-blue' : 'text-white'} />
            ) : (
              <Menu className={scrolled ? 'text-brand-blue' : 'text-white'} />
            )}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 bg-white shadow-xl py-6 px-6 md:hidden flex flex-col gap-4 border-t border-slate-100"
            >
              {navLinks.map((link) => (
                <a 
                  key={link.title} 
                  href={link.href} 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-medium text-slate-700 hover:text-brand-blue py-2 border-b border-slate-50 last:border-0"
                >
                  {link.title}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* 1. Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Hero Background */}
        <div className="absolute inset-0 z-0 bg-slate-950">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent z-10" />
          <div className="absolute inset-0 opacity-[0.03] z-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
          <div className="absolute inset-0 opacity-10 z-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
          <AnimatePresence initial={false}>
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0"
            >
              <motion.img 
                src={heroContent[currentImageIndex].img} 
                alt="Dynamic Hero Background" 
                initial={{ scale: 1.15, x: "2%" }}
                animate={{ scale: 1, x: "0%" }}
                transition={{ 
                  duration: 6, 
                  ease: "linear"
                }}
                className="w-full h-full object-cover brightness-[0.45] contrast-[1.05]"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 text-center text-white">
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-4 bg-brand-orange/20 backdrop-blur-sm border border-brand-orange/30 rounded-full px-4 py-2 mb-8">
                <span className="text-brand-orange text-sm font-black uppercase tracking-[0.3em]">
                  Personal Import Partner
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-brand-orange/50 shadow-[0_0_8px_rgba(255,77,77,0.8)]" />
                <AnimatePresence mode="wait">
                  <motion.span 
                    key={currentImageIndex}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.5 }}
                    className="text-white text-xs font-bold whitespace-nowrap"
                  >
                    {heroContent[currentImageIndex].topic}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="font-display text-5xl md:text-[80px] font-black mb-8 leading-[1.1] tracking-tight drop-shadow-2xl"
            >
              소상공인·셀러를 위한 <br />
              <span className="text-brand-orange underline decoration-[8px] underline-offset-8 decoration-white/20">가장 든든한</span> 수입 파트너
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto font-medium leading-relaxed drop-shadow-md"
            >
              소량 수입부터 복잡한 행정 절차까지, 어려워 말고 문의하세요. <br className="hidden md:block" />
              18년 경력의 전문가가 사장님의 성장을 1:1로 밀착 서포트합니다.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-5 justify-center"
            >
              <a 
                href="#contact" 
                className="group relative px-12 py-5 bg-brand-orange text-white text-lg font-black rounded-2xl hover:scale-105 transition-all shadow-2xl shadow-brand-orange/40 flex items-center justify-center gap-2 overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative z-10">지금 바로 상담하기</span>
                <ArrowRight className="w-5 h-5 relative z-10" />
                <div className="absolute -inset-1 bg-brand-orange/50 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a 
                href="#services" 
                className="px-12 py-5 bg-white text-brand-blue text-lg font-black rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2 shadow-xl shadow-black/10"
              >
                우리의 서비스 보기
              </a>
            </motion.div>
          </div>
        </div>

        {/* Hero Progress Indicators */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {heroContent.map((_, i) => (
            <div 
              key={i} 
              className="w-12 h-1 bg-white/20 rounded-full overflow-hidden"
            >
              {currentImageIndex === i && (
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 5, ease: "linear" }}
                  className="h-full bg-brand-orange"
                />
              )}
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-white rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* 2. 회사소개 Section */}
      <section id="about" className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-brand-orange font-black text-sm tracking-[0.2em] uppercase mb-4">Our Mission</h2>
              <h3 className="text-4xl md:text-5xl font-black mb-10 leading-tight">
                사장님의 첫 걸음이 <br />
                <span className="text-brand-blue">확신으로</span> 바뀌는 순간
              </h3>
              <div className="space-y-8 text-lg text-slate-600 leading-relaxed">
                <p>
                  G.VINS는 규모가 아닌 <span className="text-slate-900 font-bold">'가치'</span>에 집중합니다. 
                  대형 기업뿐만 아니라 이제 막 시작하는 자영업자, 스마트스토어 셀러분들이 
                  중국 수입의 높은 장벽 앞에서 포기하지 않도록 돕는 것이 우리의 존재 이유입니다.
                </p>
                <p>
                  단순한 대행 업무를 넘어, 사장님의 아이템이 시장에서 성공할 수 있도록 
                  <span className="text-brand-blue font-bold"> 18년의 현지 노하우</span>를 아낌없이 공유합니다. 
                  우리는 사장님의 물류 창고이자, 구매 팀이며, 현지 지사입니다.
                </p>
                <div className="pt-4 flex flex-wrap gap-10">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center">
                      <ShieldCheck className="w-8 h-8 text-brand-blue" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-slate-900 leading-none mb-1">Safe</div>
                      <div className="text-sm font-bold text-slate-400">100% 안심 검수</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center">
                      <Clock className="w-8 h-8 text-brand-blue" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-slate-900 leading-none mb-1">Fast</div>
                      <div className="text-sm font-bold text-slate-400">직통 물류 라인</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-[5/4] rounded-[40px] overflow-hidden shadow-2xl border-8 border-slate-50">
                <img 
                  key="about-friendly-partner"
                  src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1000" 
                  alt="Friendly Partner Consultation" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 md:left-10 bg-white p-8 rounded-[32px] shadow-2xl border border-slate-100 flex items-center gap-6">
                <div className="w-14 h-14 rounded-full bg-brand-orange flex items-center justify-center text-white">
                  <Package className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Small Batch Welcome</div>
                  <div className="text-xl font-black text-slate-900">소량 수입 적극 지원</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. 우리가 해결하는 문제 Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-brand-orange font-black text-sm tracking-[0.2em] uppercase mb-4">Practical Solutions</h2>
            <h3 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">수입, 혼자 끙끙 앓지 마세요</h3>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">초보 셀러라면 누구나 겪는 이 문제들, G.VINS가 명쾌하게 해결해드립니다.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: <div className="w-16 h-16 rounded-2xl bg-brand-orange/10 flex items-center justify-center"><AlertCircle className="w-10 h-10 text-brand-orange" /></div>,
                title: "작은 수량은 안 된다고요?",
                desc: "재고 부담 때문에 망설여지는 소량 주문. G.VINS는 사장님의 초기 리스크를 최소화하기 위해 소량 수입 소싱을 적극 지원합니다."
              },
              {
                icon: <div className="w-16 h-16 rounded-2xl bg-brand-blue/10 flex items-center justify-center"><Search className="w-10 h-10 text-brand-blue" /></div>,
                title: "수입과 통관, 너무 막막해요",
                desc: "식약처 검역 등 까다로운 행정 작업. 18년 경력의 관세 전문 지식으로 사장님의 시간을 10배 아껴드립니다."
              },
              {
                icon: <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center"><ShieldCheck className="w-10 h-10 text-green-600" /></div>,
                title: "제품이 잘못 올까 봐 불안해요",
                desc: "사진만 믿고 주문했다가 낭패 보지 마세요. 현지 직원이 직접 공장을 방문하고 생산 과정을 확인하여 전수 검수를 진행합니다."
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-12 rounded-[32px] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] border border-slate-100 hover:-translate-y-2 transition-all duration-300"
              >
                <div className="mb-8">{item.icon}</div>
                <h4 className="text-2xl font-bold mb-5 tracking-tight">{item.title}</h4>
                <p className="text-slate-500 leading-relaxed font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. 우리의 강점 Section */}
      <section id="strengths" className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-brand-orange font-black text-sm tracking-[0.2em] uppercase mb-4">Why G.VINS?</h2>
              <h3 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">작지만 강력한 <br />사장님의 성공 파트너</h3>
            </div>
            <p className="text-xl text-slate-500 md:max-w-md font-medium leading-relaxed">우리는 사장님의 물건 하나하나에 진심을 담습니다. 꼼꼼함이 곧 경쟁력입니다.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                number: "01",
                icon: <ShieldCheck className="w-8 h-8" />,
                title: "진심을 담은 검수",
                desc: "내 물건을 검수한다는 마음으로, 실밥 하나 지퍼 하나까지 꼼꼼하게 현장에서 직접 확인합니다."
              },
              {
                number: "02",
                icon: <Globe className="w-8 h-8" />,
                title: "현지 밀착 소싱",
                desc: "18년 광저우 거주 노하우로 번역기 없는 실시간 공장 네고와 고퀄리티 공장 섭외가 가능합니다."
              },
              {
                number: "03",
                icon: <BarChart3 className="w-8 h-8" />,
                title: "투명한 비용 산출",
                desc: "중간 수수료 거품 없는 정직한 견적. 사장님의 마진을 1%라도 더 챙겨드리기 위해 노력합니다."
              },
              {
                number: "04",
                icon: <Search className="w-8 h-8" />,
                title: "1:1 집중 케어",
                desc: "담당 직원이 사장님의 질문에 24시간 내 응답하며, 수입의 모든 과정을 투명하게 공유합니다."
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative p-8 bg-slate-50 rounded-3xl hover:bg-white hover:shadow-2xl transition-all duration-500 overflow-hidden border border-transparent hover:border-slate-100"
              >
                <div className="absolute -top-4 -right-4 text-9xl font-display font-black text-slate-200 group-hover:text-brand-blue/5 transition-colors">
                  {item.number}
                </div>
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-brand-blue mb-8 shadow-sm group-hover:bg-brand-blue group-hover:text-white transition-colors">
                    {item.icon}
                  </div>
                  <h4 className="text-2xl font-bold mb-4 tracking-tight group-hover:text-brand-blue transition-colors">{item.title}</h4>
                  <p className="text-slate-500 leading-relaxed font-medium transition-colors">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. 서비스 Section */}
      <section id="services" className="py-24 bg-brand-blue text-white overflow-hidden rounded-[60px] mx-6 my-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-brand-orange font-black text-sm tracking-[0.2em] uppercase mb-6">Simple Process</h2>
            <h3 className="text-4xl md:text-6xl font-black mb-8 tracking-tight">사장님은 판매에만 집중하세요</h3>
            <p className="text-xl text-white/70 max-w-2xl mx-auto font-light">나머지 번거로운 일들은 G.VINS가 완벽하게 처리합니다.</p>
          </div>

          <div className="relative">
            <div className="grid lg:grid-cols-4 gap-12 relative z-10">
              {[
                { step: "01", title: "아이템 소싱", detail: "사장님의 아이디어를 현실화하는 최적의 공장 섭외" },
                { step: "02", title: "철저한 검수", detail: "불량 제로를 위한 꼼꼼한 현지 전문가 1:1 검품" },
                { step: "03", title: "신속한 통관", detail: "막힘없는 수출입 행정 처리와 관세 리스크 관리" },
                { step: "04", title: "안전 배송", detail: "사장님의 창구 앞까지 책임지고 논스톱 직배송" }
              ].map((item, idx) => (
                <div key={idx} className="group relative">
                  <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-2xl font-black mb-10 group-hover:bg-brand-orange transition-all border border-white/20">
                    {item.step}
                  </div>
                  <h4 className="text-2xl font-bold mb-4 tracking-tight">{item.title}</h4>
                  <p className="text-white/60 text-lg leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-24 text-center">
            <a 
              href="#contact" 
              className="inline-flex items-center gap-4 px-12 py-6 bg-brand-orange text-white text-xl font-black rounded-full hover:scale-105 transition-all shadow-[0_30px_60px_-15px_rgba(255,77,77,0.5)] group"
            >
              지금 바로 파트너 되기
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* 6. 실제 사례 Section */}
      <section id="cases" className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-brand-blue font-display text-lg font-bold tracking-widest uppercase mb-4">Case Studies</h2>
            <h3 className="text-4xl md:text-5xl font-black mb-4">실제로 이렇게 진행됐습니다</h3>
            <p className="text-xl text-slate-500">G.VINS와 함께한 성장 사례들입니다.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                cat: "패션/잡화",
                title: "A사 에코백 1,000개 어린이날 납품 사례",
                result: "어린이날 행사 5일전 전수 납품 (불량률 0.2%)",
                desc: "긴박한 일정에 맞춰 샘플 제작부터 전수 품질 검사, 불량률 0.2%의 무결점 진행",
                img: canvasToteBag
              },
              {
                cat: "의류/잡화",
                title: "B사 앞치마 500장 신속납기",
                result: "오픈 일정에 차질 없이 500장 전량 납품 완료",
                desc: "극히 한정된 생산 기간에도 불구하고, 미리 상호 조율된 해운 스케줄에 맞춰 오픈 당일 약속된 납기일에 500장 전량을 정밀 납품했습니다.",
                img: canvasApron
              },
              {
                cat: "가방/잡화 부자재",
                title: "가방/잡화 부자재 1,000개 납품",
                result: "정밀 주조 및 고정밀 무광 블랙 도금 완납",
                desc: "도금 기포나 구동 유격 없는 고품질 부자재를 완벽하게 전수 검역 및 검사하여 정시 납품을 완료했습니다.",
                img: blackClasp
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 1 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="group flex flex-col h-full bg-slate-50 rounded-2xl overflow-hidden hover:shadow-xl transition-all"
              >
                <div className="h-56 relative overflow-hidden bg-slate-200">
                  <img 
                    key={item.img}
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-brand-blue text-white text-xs font-bold rounded-md uppercase tracking-wider">
                    {item.cat}
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h4 className="text-2xl font-bold mb-2 group-hover:text-brand-blue transition-colors">{item.title}</h4>
                  <div className="text-brand-orange font-black text-xl mb-4">{item.result}</div>
                  <p className="text-slate-600 mb-6 flex-1">{item.desc}</p>
                  <div 
                    onClick={() => setSelectedCase(item.title)}
                    className="pt-6 border-t border-slate-200 flex items-center justify-between cursor-pointer group/btn"
                  >
                    <span className="text-brand-blue font-bold group-hover/btn:underline">상세 내용 보기</span>
                    <ArrowRight className="w-5 h-5 text-brand-blue group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Final CTA Section */}
      <section id="contact" className="py-24 md:py-48 relative overflow-hidden bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-brand-orange font-black text-sm tracking-[0.2em] uppercase mb-6">Let's Grow Together</h2>
            <h3 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter">망설임은 성공만 <br className="md:hidden" />늦출 뿐입니다</h3>
          </div>

          <div className="max-w-5xl mx-auto bg-white rounded-[60px] p-8 md:p-24 shadow-[0_100px_150px_-50px_rgba(0,0,0,0.1)] overflow-hidden relative border border-slate-100">
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-brand-blue/5 rounded-full blur-3xl" />
            
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <h4 className="text-3xl font-black mb-8 leading-tight">
                  지금 바로 전문가의 <br />
                  <span className="text-brand-blue">무료 진단</span>을 받아보세요
                </h4>
                <div className="space-y-6 mb-12 text-lg text-slate-600 font-medium">
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-brand-orange/10 flex items-center justify-center shrink-0 mt-1">
                      <ChevronRight className="w-4 h-4 text-brand-orange" />
                    </div>
                    <p>내 사업에 맞는 최적의 소싱 공장 상담</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-brand-orange/10 flex items-center justify-center shrink-0 mt-1">
                      <ChevronRight className="w-4 h-4 text-brand-orange" />
                    </div>
                    <p>정확한 수입 원가 및 관세 미리보기</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-brand-orange/10 flex items-center justify-center shrink-0 mt-1">
                      <ChevronRight className="w-4 h-4 text-brand-orange" />
                    </div>
                    <p>복잡한 수입 행정 절차 가이드 제공</p>
                  </div>
                </div>
                
                <motion.div 
                  animate={{ 
                    scale: [1, 1.01, 1],
                    borderColor: ["rgba(4, 38, 107, 0.1)", "rgba(249, 115, 22, 0.3)", "rgba(4, 38, 107, 0.1)"]
                  }}
                  transition={{ 
                    duration: 2.5, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className="p-6 bg-brand-blue/5 rounded-3xl border relative overflow-hidden group"
                >
                  <motion.div 
                    initial={{ left: "-100%" }}
                    animate={{ left: "200%" }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                    className="absolute top-0 bottom-0 w-20 bg-gradient-to-r from-transparent via-white/60 to-transparent -skew-x-[25deg] z-0 pointer-events-none"
                  />
                  <div className="flex items-center gap-4 text-brand-blue relative z-10">
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Truck className="w-6 h-6" />
                    </motion.div>
                    <span className="font-black text-lg md:text-xl shrink-0">초기 물류비 10% 자동 할인 혜택 적용 중</span>
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-2 h-2 rounded-full bg-brand-orange ml-auto shadow-[0_0_8px_rgba(249,115,22,0.6)]" 
                    />
                  </div>
                </motion.div>
              </div>

              <div className="flex flex-col gap-6">
                <a 
                  href="tel:070-4641-8182" 
                  onClick={handlePhoneClick}
                  className="relative group overflow-hidden px-10 py-7 bg-brand-blue text-white rounded-3xl text-2xl font-black hover:bg-slate-900 transition-all duration-300 shadow-2xl shadow-brand-blue/20 flex items-center justify-between min-h-[88px]"
                >
                  {/* Normal Text Section, slides up and fades out */}
                  <div className="flex items-center gap-4 transition-all duration-500 transform group-hover:-translate-y-12 group-hover:opacity-0">
                    <Phone className="w-7 h-7 text-white/90" />
                    <span>전화 상담하기</span>
                  </div>

                  {/* Hover/Active Text Section, slides up from below and fades in */}
                  <div className="absolute inset-x-10 top-0 bottom-0 flex items-center gap-4 transition-all duration-500 transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 text-brand-orange">
                    <PhoneCall className="w-7 h-7 animate-bounce shrink-0" />
                    <span className="text-lg md:text-2xl tracking-tighter shrink-0 font-black">070-4641-8182 전화 주세요</span>
                  </div>

                  {/* Arrow, which also gets a nice animation */}
                  <ArrowRight className="w-6 h-6 shrink-0 transition-transform duration-300 group-hover:translate-x-2 text-white group-hover:text-brand-orange relative z-10" />
                </a>
                <button 
                  className="group flex items-center justify-between gap-4 px-10 py-7 bg-brand-orange text-white rounded-3xl text-2xl font-black hover:bg-orange-600 transition-all shadow-2xl shadow-brand-orange/20"
                >
                  <div className="flex items-center gap-4">
                    <Mail className="w-7 h-7" />
                    카톡 실시간 문의
                  </div>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 pb-12 border-b border-white/10">
            <div>
              <div className="mb-4 inline-block bg-white/95 px-3 py-1.5 rounded-xl shadow-sm">
                <img 
                  src={logo} 
                  alt="지빈스 로고" 
                  className="h-10 w-auto object-contain brightness-100"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-white/50 max-w-sm">
                18년 경력의 중국 수입대행 전문 파트너. <br />
                소싱부터 문 앞 배송까지 완벽한 비즈니스 파이프라인.
              </p>
            </div>
            <div className="flex gap-6">
              {['About', 'Service', 'Case', 'Privacy', 'Terms'].map(t => (
                <a key={t} href="#" className="text-white/60 hover:text-white transition-colors">{t}</a>
              ))}
            </div>
          </div>
          <div className="pt-12 text-center md:text-left text-white/30 text-sm">
            <p>© 2026 G.VINS Logistics Co., Ltd. All rights reserved. </p>
          </div>
        </div>
      </footer>
    </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Case Detail Page Component
function CaseDetail({ caseId, onBack }: { caseId: string; onBack: () => void }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const cases = {
    "A사 에코백 1,000개 어린이날 납품 사례": {
      title: "A사 에코백 1,000개 어린이날 납품 사례",
      cat: "패션/잡화",
      result: "어린이날 행사 5일전 전수 납품 완료 (불량률 0.2%)",
      img: canvasToteBag,
      challenge: "고객사는 5월 5일 어린이날을 기념하여 학원 및 교육 기관에 납품할 이벤트용 에코백 제작을 의뢰했습니다. 초기에는 200개 주문을 고려하셨으나, 샘플의 가격 경쟁력과 품질을 확인하신 후 즉시 1,000개로 수량을 전격 확대하셨습니다. 어린이날 행사라는 확정된 일정 때문에 단 하루의 지연도 허용되지 않는 긴박한 생산 일정과, 아이들이 사용하는 제품인 만큼 전수 검수를 통한 0%에 가까운 불량률(실제 0.2% 달성)이 핵심 과제였습니다.",
      stats: [
        { label: "최종 납품량", value: "1,000개", icon: <Package className="w-5 h-5" /> },
        { label: "불량률", value: "0.2%", icon: <ShieldCheck className="w-5 h-5 text-green-500" /> },
        { label: "납기 일정", value: "5일 조기완료", icon: <Clock className="w-5 h-5 text-brand-orange" /> }
      ],
      process: [
        { 
          title: "긴급 샘플 제작 및 단가 최적화", 
          desc: "의뢰 즉시 48시간 내 샘플 제작을 완료하여 고객사에 전달했습니다. 중국 현지 공장과의 직접 네고를 통해 대량 생산 시의 단가를 최저로 낮춰 고객사의 예산 내에서 1,000개 제작이 가능하도록 조율했습니다." 
        },
        { 
          title: "어린이 안전 기준 및 전수 검수", 
          desc: "아이들이 사용하는 제품인 만큼 품질을 최우선으로 했습니다. 1,000개 물량 전체에 대해 1:1 전수 검수를 실시하여 봉제 상태와 로고 프린팅을 체크했고, 이를 통해 0.2%라는 경이로운 불량률을 달성했습니다." 
        },
        { 
          title: "생산 일정 가동 및 가속화", 
          desc: "추가 주문된 800개를 포함한 총 1,000개의 물량을 맞추기 위해 공장 가동 시간을 연장하고, 생산-검수-포장을 병렬로 진행하여 생산 기간을 4일 단축시켰습니다." 
        },
        { 
          title: "특송 물류 시스템 가동", 
          desc: "어린이날 전 배포 일정을 맞추기 위해 가장 빠른 항공/해운 연계 스케줄을 확보했습니다. 통관 절차를 사전 대비하여 국내 입항 후 반나절 만에 배송을 시작했습니다." 
        }
      ],
      finalResult: "수량이 5배로 늘어난 긴박한 상황에서도 어린이날 행사 5일 전에 전수 납품을 완료했습니다. 전수 검수를 통해 불량률 0.2%라는 성과를 거두었으며, 고객사는 매년 정기적인 모든 시즌 물량을 G.VINS에 위탁하기로 결정하셨습니다."
    },
    "B사 앞치마 500장 신속납기": {
      title: "B사 앞치마 500장 신속납기",
      cat: "의류/잡화",
      result: "오픈 일정에 차질 없이 500장 전량 납품 완료",
      img: canvasApron,
      challenge: "브랜드 그랜드 오픈을 앞두고, 정교한 로고와 소재 요건을 유지하며 극히 한정된 기간 내에 납기가 진행되어야 했습니다. 해운 물류 편으로 상호 긴밀하게 조율한 약속 일자에 맞추어 오차 없이 안전하게 정시 입고하는 것이 핵심적인 목표였습니다.",
      stats: [
        { label: "총 납품 실적", value: "500장 완납", icon: <Package className="w-5 h-5" /> },
        { label: "납기 조율", value: "해운 정시 납품", icon: <Clock className="w-5 h-5 text-brand-orange" /> },
        { label: "실시간 QC", value: "불량률 0.5%", icon: <ShieldCheck className="w-5 h-5 text-green-500" /> }
      ],
      process: [
        { 
          title: "고객 맞춤형 캔버스 원부자재 긴급 수급", 
          desc: "고객사의 원단 감도 조건과 일치하는 미색 가공 캔버스 마찰 원단을 광저우 현지 지사의 네트워크를 활용하여 검수 즉시 확보했습니다." 
        },
        { 
          title: "로고 자수 정밀 스티치 12시간 샘플 통과", 
          desc: "자수 전용 펀칭 정밀도를 조절하여 미세한 자수 로고의 명확도를 높였으며, 12시간 만에 최적의 시제품 품질 승인을 획득했습니다." 
        },
        { 
          title: "본생산 검수 전담 인력 현지 공장 직상주", 
          desc: "불량을 차단하고 속도를 극대화하기 위해 전문 생산 라인을 가동했으며, 현지에 직상주한 QC팀이 가죽 스트랩 접착 및 로고 정렬을 실시간 검사했습니다." 
        },
        { 
          title: "정밀 해운 연계 및 오차 없는 현장 수송", 
          desc: "사전에 조율된 일자에 맞춰 인천항 입항 즉시 통관되도록 관세 서류를 정비하고, 협상된 해운 일정 당일에 정시 오프라인 매장까지 안전히 배송했습니다." 
        }
      ],
      finalResult: "극히 타이트한 일정 상황에서도 상호 조율해 놓은 해운 물류 스케줄과 안전한 검수 프로세스를 거쳐 500장 전량을 정시 약속 납기일에 완벽히 수송 완료했습니다. 이를 통해 불량률 0.5% 미만이라는 수준 높은 성과를 완성해 냈습니다."
    },
    "가방/잡화 부자재 1,000개 납품": {
      title: "가방/잡화 부자재 1,000개 납품",
      cat: "가방/잡화 부자재",
      result: "정밀 주조 및 고정밀 무광 블랙 도금 완납",
      img: blackClasp,
      challenge: "프리미엄 가방 라인업 출시를 앞두고 스트랩 연결용 고품질 회전 부자재 1,000개 공급이 필요했습니다. 회전 기믹의 원활한 복원 텐션 유지, 표면 도금의 얼룩 및 기포 Zero화, 잦은 탈착 마찰에도 벗겨짐 없는 뛰어난 내구성이 핵심 요구조건이었습니다.",
      stats: [
        { label: "총 납품 실적", value: "1,000개 완납", icon: <Package className="w-5 h-5" /> },
        { label: "표면 도색 기준", value: "기포/얼룩 Zero", icon: <ShieldCheck className="w-5 h-5 text-green-500" /> },
        { label: "품질 기준", value: "Salt Spray 통과", icon: <BarChart3 className="w-5 h-5 text-brand-orange" /> }
      ],
      process: [
        { title: "고유 고강도 아연 합금 다이캐스팅 정밀 주조", desc: "소재 자체의 수축 변형과 크랙을 원천 차단하기 위해 원공정과 온도가 일정하게 유지되는 대칭 정밀 몰드로 주조 생산 공정을 개시했습니다." },
        { title: "다단계 샌딩 및 버핑 표면 사전 매끄러움 가공", desc: "도색 밀착력을 최대로 끌어올리기 위해 표면 결함과 미세 버(Burr)를 완벽히 깎아내는 하이그레이드 물리 연마 세정을 사전 가동했습니다." },
        { title: "특수 전기 영동 공법 고내식 아노다이징 코팅", desc: "무독성 매트 블랙 안료를 균일하게 도포하는 전착 도금 방식을 적용해 깊이 있는 무광 톤을 실현하고, 염수 분무 및 내마모 실선 검사를 완료했습니다." },
        { title: "고리 작동 텐션 1:1 전수 검수 및 안전 분류 패키징", desc: "회전부 및 개폐 스프링의 작동감을 100% 수동 검사하여 불량을 미연에 제외하고, 운송 중 마찰 스크래치를 예방하는 개별 실포장 및 안전한 정시 납품을 진행했습니다." }
      ],
      finalResult: "도금 얼룩이나 작동 결함이 없는 완전무결한 부자재 1,000개를 고품질 본생산 그대로 직배송했습니다. 까다로운 아웃도어 기준의 내구성을 온전히 입증해 내어 바이어의 압도적인 찬사와 함께 정기적인 패션 원부자재 수입 전체 독점 위탁사로 안착했습니다."
    }
  };

  const data = cases[caseId as keyof typeof cases];

  if (!data) return <div className="flex items-center justify-center h-screen font-bold text-slate-400">Case not found</div>;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="bg-white min-h-screen text-slate-900 overflow-x-hidden selection:bg-brand-orange selection:text-white">
      {/* Sticky Header Nav */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-[100] bg-white/80 backdrop-blur-xl border-b border-slate-100 py-4"
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <button 
            onClick={onBack} 
            className="group flex items-center gap-3 text-slate-900 hover:text-brand-blue font-black transition-all"
          >
            <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-brand-blue group-hover:border-brand-blue group-hover:text-white transition-all transform group-hover:-translate-x-1">
              <ArrowRight className="w-5 h-5 rotate-180" />
            </div>
            <span className="hidden sm:inline">사례 목록으로</span>
          </button>
          
          <div className="flex items-center gap-4">
            <div className="h-4 w-px bg-slate-200 hidden sm:block" />
            <div className="font-display font-black text-brand-blue text-sm tracking-widest uppercase">
              G.VINS SUCCESS FILE
            </div>
          </div>
        </div>
      </motion.nav>

      <main>
        {/* Dynamic Hero Section */}
        <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-slate-950">
          <motion.div 
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.6 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute inset-0 z-0"
          >
            <img 
              src={data.img} 
              alt={data.title} 
              className="w-full h-full object-cover grayscale-[30%]" 
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/20 to-slate-950" />
          </motion.div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-20">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-4xl"
            >
              <div className="inline-flex items-center gap-3 bg-brand-orange text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8">
                {data.cat}
              </div>
              <h1 className="text-5xl md:text-[75px] font-black text-white mb-10 leading-[1.05] tracking-tight">
                {data.title}
              </h1>
              
              <div className="grid sm:grid-cols-3 gap-8 p-1 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8">
                {data.stats?.map((stat, i) => (
                  <div key={i} className="flex flex-col">
                    <div className="flex items-center gap-2 text-white/50 text-xs font-black uppercase tracking-widest mb-2">
                       {stat.icon}
                       {stat.label}
                    </div>
                    <div className="text-[26px] font-display font-black text-brand-orange">
                       {stat.value}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* content sections */}
        <div className="bg-white rounded-t-[60px] -mt-20 relative z-20 pt-24 pb-48">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-12 gap-24">
              
              {/* Sidebar: Challenge */}
              <motion.aside 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="lg:col-span-4"
              >
                <motion.div variants={itemVariants} className="sticky top-32">
                  <div className="mb-12">
                    <div className="w-12 h-1 bg-brand-orange mb-6" />
                    <h2 className="text-4xl font-black mb-8 tracking-tight">The Challenge</h2>
                    <p className="text-xl text-slate-600 leading-relaxed font-medium">
                      {data.challenge}
                    </p>
                  </div>

                  <div className="p-10 bg-slate-50 rounded-[40px] border border-slate-100 shadow-sm">
                    <h3 className="font-black text-lg mb-8 flex items-center gap-3">
                      <ShieldCheck className="w-6 h-6 text-brand-blue" />
                      G.VINS 품질 약속
                    </h3>
                    <ul className="space-y-6">
                      {["중국 현지 전수 검수 완료", "국제 안전 기준 엄수", "프리미엄 부자재 사용 확인"].map((item, i) => (
                        <li key={i} className="flex items-start gap-4">
                          <div className="w-6 h-6 rounded-full bg-brand-blue/10 flex items-center justify-center shrink-0 mt-0.5">
                            <ChevronRight className="w-4 h-4 text-brand-blue" />
                          </div>
                          <span className="text-slate-700 font-bold leading-tight">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </motion.aside>

              {/* Main Content: Process */}
              <div className="lg:col-span-8">
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <motion.div variants={itemVariants} className="mb-20">
                    <h2 className="text-xs font-black text-brand-blue uppercase tracking-[0.4em] mb-4">Implementation</h2>
                    <h3 className="text-5xl font-black tracking-tighter">문제를 해결하는 여정</h3>
                  </motion.div>
                  
                  <div className="relative space-y-16">
                    {/* Timeline Line */}
                    <div className="absolute left-10 md:left-12 top-0 bottom-0 w-px bg-slate-100" />
                    
                    {data.process.map((step, idx) => (
                      <motion.div 
                        key={idx}
                        variants={itemVariants}
                        className="group relative flex gap-10 md:gap-16 items-start"
                      >
                        <div className="relative z-10 w-20 h-20 md:w-24 md:h-24 rounded-[32px] bg-slate-950 text-white flex items-center justify-center font-display font-black text-2xl shrink-0 group-hover:bg-brand-blue transition-all duration-500 shadow-2xl group-hover:shadow-brand-blue/30 group-hover:-translate-y-1">
                          {idx + 1}
                        </div>
                        <div className="flex-1 pt-4 pb-12 border-b border-slate-100 group-last:border-0">
                          <h4 className="text-2xl md:text-3xl font-black mb-6 group-hover:text-brand-blue transition-colors">
                            {step.title}
                          </h4>
                          <p className="text-lg md:text-xl text-slate-500 leading-relaxed font-light">
                            {step.desc}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Final Result Card */}
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="mt-32 p-12 md:p-20 bg-brand-blue rounded-[60px] text-white relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(4,38,107,0.3)]"
                >
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 right-0 w-[400px] h-[400px] border border-white/5 rounded-full -translate-y-1/2 translate-x-1/2"
                  />
                  <div className="relative z-10">
                    <div className="inline-flex items-center gap-3 px-5 py-2 bg-white text-brand-blue rounded-full text-xs font-black uppercase tracking-widest mb-10">
                      <Truck className="w-4 h-4" /> Final Outcome
                    </div>
                    <h3 className="text-3xl md:text-5xl font-black mb-8 leading-tight">
                      G.VINS와 함께 거둔 <br />
                      성공적인 비즈니스 결과
                    </h3>
                    <div className="text-xl md:text-3xl font-light leading-relaxed italic text-white/90 border-l-4 border-white/20 pl-8">
                      " {data.finalResult} "
                    </div>
                  </div>
                </motion.div>

                <div className="mt-20 flex justify-center">
                  <button 
                    onClick={onBack}
                    className="group flex items-center gap-4 px-10 py-5 bg-slate-50 text-slate-400 hover:text-brand-blue font-black rounded-3xl transition-all hover:bg-white hover:shadow-xl border border-transparent hover:border-slate-100"
                  >
                    목록으로 돌아가기
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Detail Footer */}
      <footer className="py-24 bg-slate-950 text-white selection:bg-brand-orange selection:text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="mb-12 inline-block bg-white/95 px-4 py-2 rounded-xl shadow-sm">
            <img src={logo} alt="Logo" className="h-8 mx-auto object-contain brightness-100" />
          </div>
          <p className="text-white/40 text-sm font-bold tracking-widest uppercase mb-8">
            Global Logistics Excellence — Personalized Service
          </p>
          <div className="flex justify-center gap-8 text-white/60 text-xs font-black">
            <span className="hover:text-brand-orange cursor-pointer transition-colors">PRIVACY</span>
            <span className="hover:text-brand-orange cursor-pointer transition-colors">TERMS OF SERVICE</span>
            <span className="hover:text-brand-orange cursor-pointer transition-colors">CONTACT SUPPORT</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
