"use client";

import React, { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Settings, User, RefreshCcw,
  Zap, ShieldCheck, Target, BarChart3,
  MessageSquare, Globe, ArrowRight, CheckCircle2,
  Layers, TrendingUp, Calculator,
  PieChart, Cpu, Repeat, Mail, Smartphone,
  Layout
} from 'lucide-react';


const LANGUAGE_STORAGE_KEY = 'blossom-preferred-language';
const DEFAULT_LANGUAGE = 'en';

const LANGUAGES = {
  en: { code: 'en', label: 'English', shortLabel: 'EN' },
  es: { code: 'es', label: 'Español', shortLabel: 'ES' },
};

const TRANSLATIONS = {
  en: {
    nav: {
      getStarted: 'Get Started',
      languageLabel: 'Language',
    },
    hero: {
      headlineLead: 'Leads choose the first agent who responds.',
      headlineAccent: 'So we built a system that puts you first — every time.',
      watchCtaTop: 'Watch How This',
      watchCtaBottom: 'Gets You Deals',
      inboxTitle: 'Lead Inbox',
      active: 'Active',
      inputPlaceholder: 'Type a response...',
      notificationIntro: 'Get notified anywhere.',
      bookedTitle: 'Booked House Tour',
      bookedTime: 'Thursday at 2pm',
      benefits: ['Instant Response', 'Qualifies the lead', 'Pushes to a booking'],
      channelLead: 'No matter where your',
      channelMiddle: 'leads come from,',
      channelAccent: 'we integrate with',
      channelAccentEnd: 'every channel you have.',
      accelerateLead: 'Stop',
      accelerateMiddle: 'losing deals',
      accelerateBeforeAccent: 'you already',
      accelerateAccent: 'paid for',
      speed: 'Speed decides',
      speedEnd: 'who wins the deal.',
      primaryCta: 'Start Capturing Every Lead',
      onboardingLimit: 'WE ONLY ONBOARD',
      onboardingLimitMiddle: 'A FEW CLIENTS',
      onboardingLimitEnd: 'each month to set this up properly.',
      replay: 'Replay Experience',
      chatMessages: [
        { id: 1, sender: '+1 (555) 012-3456', type: 'text', content: 'Hi, is 108 Sky Tower still available?', role: 'client', delay: 800 },
        { id: 2, sender: 'Blossom Agent', type: 'text', content: "It is! Beautiful property. Here's a look at the main living area.", role: 'agent', delay: 1200 },
        { id: 3, sender: 'Blossom Agent', type: 'image', content: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800', role: 'agent', delay: 600 },
        { id: 4, sender: 'Blossom Agent', type: 'text', content: 'Are you looking to move soon or just exploring options?', role: 'agent', delay: 1000 },
        { id: 5, sender: '+1 (555) 012-3456', type: 'text', content: 'Trying to move in the next couple months.', role: 'client', delay: 800 },
        { id: 6, sender: 'Blossom Agent', type: 'text', content: 'Got it. Have you already been pre-approved or still in that process?', role: 'agent', delay: 1200 },
        { id: 7, sender: '+1 (555) 012-3456', type: 'text', content: 'Yeah I’m pre-approved already.', role: 'client', delay: 800 },
        { id: 8, sender: 'Blossom Agent', type: 'text', content: 'Perfect — that helps a lot.', role: 'agent', delay: 1000 },
        { id: 10, sender: 'Blossom Agent', type: 'text', content: 'Based on your timeline, it would be smart to see it this week.', role: 'agent', delay: 1400 },
        { id: 11, sender: 'Blossom Agent', type: 'text', content: 'I have Thursday at 2pm or Friday at 10am open — which works better?', role: 'agent', delay: 1200 },
        { id: 12, sender: '+1 (555) 012-3456', type: 'text', content: 'Thursday works. The place looks incredible.', role: 'client', delay: 1000 },
        { id: 13, sender: 'Blossom Agent', type: 'text', content: 'Booked. See you Thursday!', role: 'agent', delay: 1400 },
      ],
    },
    visuals: {
      syncing: 'Syncing All Inlets',
      metrics: [
        { label: 'Equity Estimate', val: 'High ($200k+)' },
        { label: 'Buyer Intent Score', val: '94/100' },
        { label: 'Immediate Timeline', val: 'Ready Now' },
      ],
      followUp: '"Follow-up that feels human..."',
      meetingScheduled: 'Meeting Scheduled',
      pushedToCrm: 'Pushed to CRM',
      gciLift: 'GCI LIFT',
    },
    steps: {
      eyebrow: 'Core Infrastructure',
      titleLine1: 'The Architecture',
      titleLine2: 'of Success.',
      description: 'Five specialized layers working in perfect harmony to ensure no dollar is ever left on the table.',
      items: [
        { id: '01', title: 'Omni-Channel Capture', desc: 'Stop manually entering leads. We instantly sync every prospect from Zillow, Meta, Google, and your website into one unified intake engine.' },
        { id: '02', title: 'Intelligent Qualification', desc: 'Not all leads are created equal. Our AI analyzes behavioral data and public records to filter for serious buyers and high-equity sellers.' },
        { id: '03', title: 'Conversational Nurture', desc: 'We deploy persistent, multi-step follow-up sequences across SMS and Email that sound indistinguishable from a top-producing agent.' },
        { id: '04', title: 'Seamless Conversion', desc: 'Once a lead is qualified, we push the high-intent prospect directly into your CRM and notify you via Slack or Mobile to close the deal.' },
        { id: '05', title: 'Performance Optimization', desc: 'Monitor your pipeline velocity in real-time. Our deep analytics suite identifies bottlenecks and highlights your most profitable lead sources.' },
      ],
    },
    math: {
      locale: 'en-US',
      eyebrow: 'Yield Optimization',
      titleLine1: 'The Math of',
      titleLine2: 'Efficiency.',
      description: 'Most teams focus on ad spend. We focus on Yield. Adjust the model below to calculate your specific revenue expansion.',
      avgCommission: 'Avg. Commission',
      annualDeals: 'Annual Deals (Current)',
      projectedLift: '12-Month Projected Lift',
      currentGci: 'Current Annual GCI',
      recovery: 'Blossom Recovery',
      additionalDeals: 'Addtl. Deals',
      totalPotential: 'Total GCI Potential',
      cta: 'Apply for Installation',
    },
    problems: {
      titleLine1: 'Your Pipeline Is',
      titleLine2: 'Leaking Revenue.',
      quote: '"Most real estate teams don\'t have a lead problem—they have an infrastructure problem."',
      cards: [
        { title: 'Slow Response', desc: 'Leads go cold within 5 minutes. Most agents wait hours. Blossom responds in under 90 seconds, 24/7.' },
        { title: 'Zero Follow-up', desc: '80% of sales require 5+ follow-ups. Our engine never forgets a name or timeline.' },
        { title: 'Unqualified Volume', desc: 'Stop wasting hours on window shoppers. We verify intent, timeline, and budget before you pick up the phone.' },
        { title: 'Missed Calls', desc: 'Every missed call is a $12k+ commission lost. Blossom provides an institutional intake for every ring.' },
        { title: 'Manual Scaling', desc: 'Your growth is capped by human capacity. Our system has infinite bandwidth for infinite leads.' },
        { title: 'Disjointed Data', desc: 'Deals slip through messy spreadsheets. We provide a clean, high-performance operating system.' },
      ],
    },
    features: {
      titleLine1: 'Designed to capture,',
      titleLine2: 'qualify, and convert.',
      description: "{copy.features.description}",
      cards: [
        { title: 'Sub-5 Second Response', desc: "Our system engages every lead in under 5 seconds. In real estate, being first isn't just an advantage—it's the only way to win." },
        { title: 'Intelligent Qualification', desc: 'Our AI asks the right questions: Timeline, Budget, and Pre-approval. You only talk to leads that are ready to transact.' },
        { title: 'Automated Booking', desc: 'Sync your calendar and let Accelerate handle the scheduling. Your only job is showing up to the appointment ready to sign.' },
      ],
    },
    advantage: {
      eyebrow: 'The Blossom Advantage',
      titleLine1: "Your lead source doesn't matter.",
      titleLine2: 'Your speed does.',
      bullets: [
        'Integrates with Zillow, Realtor.com, Facebook Ads, and any tech stack you have.',
        'Works 24/7, including holidays and 3 AM inquiries.',
        'Multi-channel support (SMS, WhatsApp, Email and more).',
        'Direct-to-CRM syncing with no manual entry.',
      ],
      imageAlt: 'Luxury Home',
      stat: 'Increase in lead-to-tour conversion rate',
    },
    finalCta: {
      titleLine1: 'We recover the deals',
      titleLine2: 'you’re currently losing.',
      description: 'We only onboard a few clients each month to ensure every setup is optimized for maximum conversion.',
      button: 'Book Your Strategy Call',
      questions: [
        'Where do most of your leads come from?',
        'How fast are you replying right now?',
        'What happens after they message you?',
        'How many inbound leads you get per week?',
      ],
      inputPlaceholder: 'Type and press Enter',
      bookingPrompt: 'Book your setup call',
      calendarTitle: 'Blossom Setup Call Calendar',
    },
  },
  es: {
    nav: {
      getStarted: 'Comenzar',
      languageLabel: 'Idioma',
    },
    hero: {
      headlineLead: 'Los prospectos eligen al asesor que responde primero.',
      headlineAccent: 'Por eso construimos un sistema que te pone al frente — siempre.',
      watchCtaTop: 'Mira cómo esto',
      watchCtaBottom: 'te genera citas',
      inboxTitle: 'Bandeja de prospectos',
      active: 'Activo',
      inputPlaceholder: 'Escribe una respuesta...',
      notificationIntro: 'Recibe avisos estés donde estés.',
      bookedTitle: 'Recorrido agendado',
      bookedTime: 'Jueves, 2:00 p. m.',
      benefits: ['Respuesta inmediata', 'Califica al prospecto', 'Lo lleva a una cita'],
      channelLead: 'Sin importar de dónde',
      channelMiddle: 'lleguen tus prospectos,',
      channelAccent: 'nos integramos con',
      channelAccentEnd: 'todos tus canales.',
      accelerateLead: 'Deja de',
      accelerateMiddle: 'perder operaciones',
      accelerateBeforeAccent: 'por las que ya',
      accelerateAccent: 'invertiste',
      speed: 'La velocidad define',
      speedEnd: 'quién gana la operación.',
      primaryCta: 'Empieza a capturar cada prospecto',
      onboardingLimit: 'SOLO INTEGRAMOS',
      onboardingLimitMiddle: 'A POCOS CLIENTES',
      onboardingLimitEnd: 'cada mes para configurarlo con precisión.',
      replay: 'Repetir experiencia',
      chatMessages: [
        { id: 1, sender: '+1 (555) 012-3456', type: 'text', content: 'Hola, ¿sigue disponible la propiedad 108 Sky Tower?', role: 'client', delay: 800 },
        { id: 2, sender: 'Asesor Blossom', type: 'text', content: 'Sí, sigue disponible. Es una propiedad espectacular; te comparto una vista del área social.', role: 'agent', delay: 1200 },
        { id: 3, sender: 'Asesor Blossom', type: 'image', content: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800', role: 'agent', delay: 600 },
        { id: 4, sender: 'Asesor Blossom', type: 'text', content: '¿Estás buscando mudarte pronto o apenas estás evaluando opciones?', role: 'agent', delay: 1000 },
        { id: 5, sender: '+1 (555) 012-3456', type: 'text', content: 'Me gustaría moverme en los próximos meses.', role: 'client', delay: 800 },
        { id: 6, sender: 'Asesor Blossom', type: 'text', content: 'Perfecto. ¿Ya cuentas con preaprobación o estás en ese proceso?', role: 'agent', delay: 1200 },
        { id: 7, sender: '+1 (555) 012-3456', type: 'text', content: 'Sí, ya tengo preaprobación.', role: 'client', delay: 800 },
        { id: 8, sender: 'Asesor Blossom', type: 'text', content: 'Excelente — eso nos ayuda a avanzar con prioridad.', role: 'agent', delay: 1000 },
        { id: 10, sender: 'Asesor Blossom', type: 'text', content: 'Por tu calendario, conviene verla esta misma semana.', role: 'agent', delay: 1400 },
        { id: 11, sender: 'Asesor Blossom', type: 'text', content: 'Tengo jueves a las 2:00 p. m. o viernes a las 10:00 a. m. — ¿qué horario te acomoda mejor?', role: 'agent', delay: 1200 },
        { id: 12, sender: '+1 (555) 012-3456', type: 'text', content: 'El jueves me funciona. La propiedad se ve increíble.', role: 'client', delay: 1000 },
        { id: 13, sender: 'Asesor Blossom', type: 'text', content: 'Listo, quedó agendado. Nos vemos el jueves.', role: 'agent', delay: 1400 },
      ],
    },
    visuals: {
      syncing: 'Sincronizando todos los canales',
      metrics: [
        { label: 'Plusvalía estimada', val: 'Alta ($200k+)' },
        { label: 'Intención de compra', val: '94/100' },
        { label: 'Tiempo de decisión', val: 'Listo ahora' },
      ],
      followUp: '"Seguimiento con tono humano y profesional..."',
      meetingScheduled: 'Cita agendada',
      pushedToCrm: 'Enviado al CRM',
      gciLift: 'CRECIMIENTO GCI',
    },
    steps: {
      eyebrow: 'Infraestructura comercial',
      titleLine1: 'La arquitectura',
      titleLine2: 'para cerrar más.',
      description: 'Cinco capas especializadas trabajan en sincronía para que ningún prospecto de alto valor se quede sin atención.',
      items: [
        { id: '01', title: 'Captura omnicanal', desc: 'Deja de capturar prospectos a mano. Sincronizamos Zillow, Meta, Google, tu sitio web y tus fuentes actuales en un solo motor de atención.' },
        { id: '02', title: 'Calificación inteligente', desc: 'No todos los prospectos tienen la misma intención. Nuestra IA identifica presupuesto, urgencia, perfil y señales de valor para priorizar oportunidades reales.' },
        { id: '03', title: 'Seguimiento conversacional', desc: 'Activamos secuencias persistentes por SMS, WhatsApp y email con un tono natural, pulido y alineado a un asesor inmobiliario premium.' },
        { id: '04', title: 'Conversión sin fricción', desc: 'Cuando el prospecto está listo, lo enviamos a tu CRM y te notificamos en Slack o móvil para que llegues a la conversación con contexto completo.' },
        { id: '05', title: 'Optimización de desempeño', desc: 'Monitorea la velocidad de tu pipeline en tiempo real. Detectamos cuellos de botella y tus fuentes más rentables para invertir con mayor precisión.' },
      ],
    },
    math: {
      locale: 'es-MX',
      eyebrow: 'Optimización de rentabilidad',
      titleLine1: 'La matemática de la',
      titleLine2: 'conversión.',
      description: 'La mayoría de los equipos mira el gasto publicitario. Nosotros optimizamos el rendimiento de cada prospecto. Ajusta el modelo para estimar tu crecimiento potencial.',
      avgCommission: 'Comisión promedio',
      annualDeals: 'Operaciones anuales actuales',
      projectedLift: 'Crecimiento proyectado a 12 meses',
      currentGci: 'GCI anual actual',
      recovery: 'Recuperación Blossom',
      additionalDeals: 'Operaciones adicionales',
      totalPotential: 'Potencial total de GCI',
      cta: 'Solicitar implementación',
    },
    problems: {
      titleLine1: 'Tu pipeline está',
      titleLine2: 'dejando dinero en la mesa.',
      quote: '"La mayoría de los equipos inmobiliarios no tiene un problema de prospectos; tiene un problema de velocidad, seguimiento e infraestructura."',
      cards: [
        { title: 'Respuesta tardía', desc: 'Un prospecto premium se enfría en minutos. Mientras otros asesores tardan horas, Blossom responde en menos de 90 segundos, 24/7.' },
        { title: 'Seguimiento inconsistente', desc: 'La mayoría de las operaciones requiere múltiples seguimientos. Nuestro motor nunca olvida un nombre, un presupuesto ni una fecha objetivo.' },
        { title: 'Volumen sin prioridad', desc: 'Deja de invertir horas en curiosos. Verificamos intención, plazo y capacidad antes de que tomes la llamada.' },
        { title: 'Llamadas perdidas', desc: 'Cada llamada sin respuesta puede ser una comisión de alto valor perdida. Blossom ofrece atención institucional para cada contacto.' },
        { title: 'Escala manual', desc: 'Tu crecimiento no debería depender de estar pegado al teléfono. El sistema atiende más prospectos sin sacrificar calidad.' },
        { title: 'Datos dispersos', desc: 'Las oportunidades se pierden entre hojas de cálculo y chats. Centralizamos la operación en un flujo limpio, medible y de alto desempeño.' },
      ],
    },
    features: {
      titleLine1: 'Diseñado para captar,',
      titleLine2: 'calificar y convertir.',
      description: 'No solo enviamos notificaciones. Construimos un agente automatizado que responde con tu tono, aprende tu operación y agenda citas calificadas por ti.',
      cards: [
        { title: 'Respuesta en menos de 5 segundos', desc: 'El sistema atiende cada prospecto casi al instante. En bienes raíces de alto valor, llegar primero no es ventaja: es requisito.' },
        { title: 'Calificación inteligente', desc: 'La IA pregunta lo importante: zona, presupuesto, plazo, preaprobación e intención. Tú hablas con prospectos listos para avanzar.' },
        { title: 'Agenda automatizada', desc: 'Sincroniza tu calendario y deja que Accelerate gestione los horarios. Tú solo llegas a la cita con el contexto correcto.' },
      ],
    },
    advantage: {
      eyebrow: 'La ventaja Blossom',
      titleLine1: 'La fuente del prospecto no importa.',
      titleLine2: 'Tu velocidad sí.',
      bullets: [
        'Se integra con Zillow, Realtor.com, Meta Ads, Google y el stack que ya usa tu equipo.',
        'Opera 24/7, incluidos fines de semana, festivos y consultas de madrugada.',
        'Atención multicanal por SMS, WhatsApp, email y más.',
        'Sincronización directa con tu CRM sin captura manual.',
      ],
      imageAlt: 'Residencia de lujo',
      stat: 'Aumento en conversión de prospecto a recorrido',
    },
    finalCta: {
      titleLine1: 'Recuperamos las operaciones',
      titleLine2: 'que hoy estás perdiendo.',
      description: 'Solo incorporamos a pocos clientes cada mes para asegurar una implementación precisa, personalizada y optimizada para convertir.',
      button: 'Agenda tu llamada estratégica',
      questions: [
        '¿De dónde llegan la mayoría de tus prospectos?',
        '¿En cuánto tiempo estás respondiendo hoy?',
        '¿Qué sucede después de que te escriben?',
        '¿Cuántos prospectos entrantes recibes por semana?',
      ],
      inputPlaceholder: 'Escribe y presiona Enter',
      bookingPrompt: 'Agenda tu llamada de implementación',
      calendarTitle: 'Calendario de implementación Blossom',
    },
  },
};

/** * HERO ANIMATION COMPONENT */
const HeroAnimation = ({ onPrimaryCtaClick, copy }) => {
  const [visibleMessages, setVisibleMessages] = useState([]);
  const [typingState, setTypingState] = useState({ active: false, role: 'agent' });
  const [stage, setStage] = useState('intro_all'); 
  const [showPing, setShowPing] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [setupStep, setSetupStep] = useState(0);
  const [setupInput, setSetupInput] = useState("");
  const [setupAnswers, setSetupAnswers] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const scrollContainerRef = useRef(null);

  const clientAvatar = "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&q=80";
  const blossomBlue = "#007AFF"; 
  const appleBezier = [0.23, 1, 0.32, 1];

  const chatMessages = copy.chatMessages;



  useEffect(() => {
    if (!hasStarted) return;
    let isMounted = true;
    const runSimulation = async () => {
      await new Promise(r => setTimeout(r, 800));
      for (let i = 0; i < chatMessages.length; i++) {
        if (!isMounted) break;
        const msg = chatMessages[i];
        setTypingState({ active: true, role: msg.role });
        await new Promise(r => setTimeout(r, msg.delay));
        if (!isMounted) break;
        setTypingState({ active: false, role: msg.role });
        setVisibleMessages(prev => [...prev, msg]);
        await new Promise(r => setTimeout(r, 400));
      }
      await new Promise(r => setTimeout(r, 2000)); if (!isMounted) return; setStage('notification');
      await new Promise(r => setTimeout(r, 500)); if (!isMounted) return; setShowPing(true);
      await new Promise(r => setTimeout(r, 10000)); if (!isMounted) return; setStage('accelerate');
    };
    runSimulation();
    return () => { isMounted = false; };
  }, [hasStarted, chatMessages]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const { scrollHeight, clientHeight } = scrollContainerRef.current;
      scrollContainerRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: 'smooth'
      });
    }
  }, [visibleMessages, typingState.active]);

  return (
    <div className="relative min-h-[650px] lg:min-h-[850px] flex items-start justify-center overflow-hidden py-10 px-4">
      <AnimatePresence mode="wait">
        {stage === 'intro_all' && (
          <motion.div key="intro_all" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, filter: "blur(20px)", scale: 0.95 }} transition={{ duration: 1 }} className="flex flex-col items-center justify-center text-center max-w-5xl mt-12 md:mt-20">
            <div className="w-full max-w-4xl mb-12 px-4">
              <h2 className="text-4xl md:text-7xl font-bold tracking-tight leading-[1.05] text-slate-800">
                {copy.headlineLead} <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400 font-black">{copy.headlineAccent}</span>
              </h2>
            </div>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => { setStage('chat'); setHasStarted(true); }} className="px-10 py-5 bg-slate-900 text-white rounded-full font-bold text-xl md:text-2xl shadow-[0_20px_40px_rgba(0,0,0,0.2)]">
              {copy.watchCtaTop} <br className="md:hidden" /> {copy.watchCtaBottom}
            </motion.button>
          </motion.div>
        )}

        {stage === 'chat' && (
          <motion.div key="chat-ui" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05, filter: 'blur(20px)' }} transition={{ duration: 1, ease: appleBezier }} className="relative w-full max-w-5xl h-[600px] bg-[#F2F2F2] rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.1)] flex overflow-hidden border border-white mt-10">
            <div className="w-16 md:w-20 bg-white/40 backdrop-blur-md border-r border-black/5 flex flex-col items-center py-8 gap-8 flex-shrink-0">
              <div className="p-2.5 rounded-full bg-white shadow-sm border border-black/5"><Search size={20} className="text-slate-400" /></div>
              <div className="flex flex-col gap-6 flex-1">
                <Avatar src={clientAvatar} active />
                <Avatar src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" />
                <Avatar src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" />
              </div>
              <div className="flex flex-col gap-6 mt-auto"><User size={20} className="text-slate-400" /><Settings size={20} className="text-slate-400" /></div>
            </div>
            <div className="flex-1 flex flex-col h-full overflow-hidden">
              <header className="px-6 md:px-8 py-5 border-b border-black/5 flex items-center justify-between bg-white/50 backdrop-blur-sm z-10">
                <h1 className="text-lg md:text-xl font-bold tracking-tight">{copy.inboxTitle}</h1>
                <div className="flex items-center gap-3">
                  <div className="text-right hidden sm:block">
                    <p className="text-xs font-bold text-slate-500">+1 (555) 012-3456</p>
                    <p style={{ color: blossomBlue }} className="text-[10px] font-bold uppercase tracking-widest">{copy.active}</p>
                  </div>
                  <img src={clientAvatar} className="w-9 h-9 rounded-full object-cover border border-white shadow-sm" alt="client" />
                </div>
              </header>
              <div 
                ref={scrollContainerRef}
                className="flex-1 overflow-y-auto px-6 md:px-8 py-6 space-y-4 custom-scrollbar relative bg-[#F2F2F2]"
                style={{ overflowAnchor: 'none' }}
              >
                <AnimatePresence initial={false}>
                  {visibleMessages.map((msg) => (
                    <motion.div key={msg.id} initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.3, ease: appleBezier }} className={`flex flex-col ${msg.role === 'agent' ? 'items-end' : 'items-start'}`}>
                      <div className={`max-w-[85%] sm:max-w-[75%] rounded-[22px] p-4 text-[14px] leading-relaxed shadow-sm ${msg.role === 'agent' ? 'bg-white text-slate-800 rounded-tr-none' : 'bg-[#E5E5E7] text-slate-700 rounded-tl-none'} ${msg.type === 'image' ? 'p-0 overflow-hidden ring-4 ring-white' : ''}`}>
                        {msg.type === 'image' ? <img src={msg.content} className="w-full max-h-64 object-cover" alt="listing" /> : msg.content}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                <div className="h-10 w-full flex items-center">
                  <AnimatePresence>{typingState.active && (
                    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`flex w-full ${typingState.role === 'agent' ? 'justify-end' : 'justify-start'}`}>
                      <div className="flex gap-1.5 px-3 py-2 bg-white/60 backdrop-blur-sm rounded-full shadow-sm border border-black/5">
                        <div style={{ backgroundColor: blossomBlue }} className="w-1.5 h-1.5 rounded-full animate-bounce" />
                        <div style={{ backgroundColor: blossomBlue }} className="w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:0.2s]" />
                        <div style={{ backgroundColor: blossomBlue }} className="w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:0.4s]" />
                      </div>
                    </motion.div>
                  )}</AnimatePresence>
                </div>
              </div>
              <footer className="px-8 py-5 bg-white/50 backdrop-blur-sm border-t border-black/5"><div className="w-full bg-white border border-black/5 rounded-full py-3 px-6 text-sm text-slate-400 shadow-sm">{copy.inputPlaceholder}</div></footer>
            </div>
          </motion.div>
        )}

        {stage === 'notification' && (
          <motion.div key="notif-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 1 }} className="flex flex-col items-center gap-6 max-w-3xl text-center mt-20">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-slate-400 font-medium text-xl italic mb-4">{copy.notificationIntro}</motion.p>
            <motion.div key="notif" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: appleBezier }} className="bg-white p-8 rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.08)] border border-slate-100 flex items-center gap-10">
              <div className="relative w-12 h-12 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {showPing ? (
                    <motion.div key="ping-active" className="relative w-full h-full flex items-center justify-center">
                      <motion.div initial={{ scale: 1, opacity: 0.5 }} animate={{ scale: [1, 2.5], opacity: [0.5, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }} style={{ backgroundColor: blossomBlue }} className="absolute w-full h-full rounded-full" />
                      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} style={{ backgroundColor: blossomBlue }} className="w-4 h-4 rounded-full shadow-[0_0_15px_rgba(0,122,255,0.6)] z-10" />
                    </motion.div>
                  ) : ( <motion.div key="ping-static" className="w-4 h-4 rounded-full bg-slate-200 z-10" /> )}
                </AnimatePresence>
              </div>
              <div className="pr-4 z-10 text-left">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">{copy.bookedTitle}</h2>
                <p className="text-base text-slate-500 font-medium tracking-tight mt-1">{copy.bookedTime} <span className="mx-2 text-slate-200">/</span> 108 Sky Tower</p>
              </div>
            </motion.div>
            <div className="flex flex-col items-center gap-3 mt-6">
              {copy.benefits.map((benefit, idx) => (
                <motion.div key={benefit} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 + (idx * 0.8), duration: 0.8, ease: appleBezier }}>
                   <span className="text-2xl md:text-3xl font-bold tracking-tight text-slate-700/80">{benefit}</span>
                </motion.div>
              ))}
            </div>

            {/* NEW CHANNEL INTEGRATION MESSAGE */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 4.5, duration: 1.2, ease: appleBezier }}
              className="mt-8 px-8"
            >
              <h3 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight leading-tight">
                {copy.channelLead} <br className="md:hidden" /> {copy.channelMiddle} <br className="hidden md:block" />
                <span className="text-blue-600">{copy.channelAccent} <br className="md:hidden" /> {copy.channelAccentEnd}</span>
              </h3>
            </motion.div>
          </motion.div>
        )}

        {stage === 'accelerate' && (
          <motion.div key="accelerate" className="flex flex-col items-center px-6 text-center max-w-4xl mt-12 md:mt-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>
            <motion.h3 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 1 }} className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[1] mb-6">
              {copy.accelerateLead} <br className="md:hidden" /> {copy.accelerateMiddle} <br /> {copy.accelerateBeforeAccent} <span className="text-blue-600">{copy.accelerateAccent}</span>.
            </motion.h3>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-2xl md:text-3xl font-medium text-slate-400 tracking-tight mb-12">{copy.speed} <br className="md:hidden" /> {copy.speedEnd}</motion.p>
            <div className="flex flex-col items-center gap-6">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onPrimaryCtaClick} className="px-16 py-6 bg-slate-900 text-white rounded-full font-bold text-2xl shadow-2xl">{copy.primaryCta}</motion.button>
              
              {/* NEW ONBOARDING LIMIT TEXT */}
              <div className="flex flex-col items-center gap-6 mt-4">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 1 }}
                  className="text-sm font-bold uppercase tracking-[0.25em] text-black max-w-2xl"
                >
                  {copy.onboardingLimit} <br className="md:hidden" /> {copy.onboardingLimitMiddle} <br /> {copy.onboardingLimitEnd}
                </motion.p>

                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.8, duration: 1, ease: appleBezier }}
                >
                  <h1 className="text-2xl font-bold text-slate-900 lowercase tracking-tighter opacity-80">
                    blossom accelerate
                  </h1>
                </motion.div>
              </div>

              <button onClick={() => { setVisibleMessages([]); setStage('intro_all'); setHasStarted(false); setShowPing(false); setSetupStep(0); setSetupInput(""); setSetupAnswers([]); setIsAnalyzing(false); }} className="flex items-center gap-2 text-slate-400 font-bold hover:text-slate-600 transition-colors uppercase tracking-widest text-xs mt-8">
                <RefreshCcw size={14} /> {copy.replay}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Avatar = ({ src, active = false }) => (
  <div className={`relative w-10 h-10 md:w-11 md:h-11 rounded-full p-0.5 transition-all ${active ? 'bg-white shadow-sm ring-1 ring-black/5' : 'grayscale opacity-40'}`}>
    <img src={src} className="w-full h-full rounded-full object-cover" alt="user" />
    {active && <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />}
  </div>
);

const Navbar = ({ onGetStartedClick, language, onLanguageChange, onLanguageFocus, copy }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md border-b border-black/5 py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
        <div className="text-lg sm:text-xl md:text-2xl font-black tracking-tighter text-slate-900">blossom accelerate</div>
        <div className="flex items-center gap-2 sm:gap-3">
          <button onClick={onGetStartedClick} className="bg-slate-900 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg active:scale-95 transition-transform whitespace-nowrap">{copy.getStarted}</button>
          <label className="sr-only" htmlFor="language-selector">{copy.languageLabel}</label>
          <select
            id="language-selector"
            value={language}
            onFocus={onLanguageFocus}
            onChange={(event) => onLanguageChange(event.target.value)}
            className="h-9 rounded-full border border-slate-200 bg-white/90 px-3 text-xs sm:text-sm font-black text-slate-700 shadow-lg outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            aria-label={copy.languageLabel}
          >
            {Object.values(LANGUAGES).map((option) => (
              <option key={option.code} value={option.code}>{`${option.shortLabel} — ${option.label}`}</option>
            ))}
          </select>
        </div>
      </div>
    </nav>
  );
};

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white p-10 rounded-[40px] border border-black/5 shadow-sm hover:shadow-xl transition-all duration-500 group">
    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-8 group-hover:scale-110 transition-transform duration-500">
      <Icon size={32} strokeWidth={2.5} />
    </div>
    <h3 className="text-2xl font-bold mb-4 tracking-tight">{title}</h3>
    <p className="text-slate-500 leading-relaxed font-medium">{description}</p>
  </div>
);

const VisualStage = ({ activeId, copy }) => {
  const containerVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.05 }
  };

  const renderContent = () => {
    switch (activeId) {
      case "01":
        return (
          <motion.div key="v1" variants={containerVariants} initial="initial" animate="animate" exit="exit" className="relative w-full h-full flex flex-col items-center justify-center">
            <div className="relative w-64 h-64 mb-8">
              {[0, 1].map((i) => (
                <motion.div key={i} animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 3, repeat: Infinity, delay: i * 1.5 }} className="absolute inset-0 border-4 border-blue-400/30 rounded-full" />
              ))}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-5">
                  <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-blue-500"><Mail size={28}/></motion.div>
                  <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.3 }} className="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-blue-500"><Smartphone size={28}/></motion.div>
                  <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.6 }} className="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-blue-500"><Globe size={28}/></motion.div>
                  <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.9 }} className="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-blue-500"><Layout size={28}/></motion.div>
                </div>
              </div>
            </div>
            <span className="text-xs font-black text-blue-500 uppercase tracking-widest bg-blue-50 px-6 py-2 rounded-full border border-blue-100 shadow-sm">{copy.syncing}</span>
          </motion.div>
        );
      case "02":
        return (
          <motion.div key="v2" variants={containerVariants} initial="initial" animate="animate" exit="exit" className="w-full h-full flex items-center justify-center p-12">
            <div className="w-full max-w-[340px] space-y-5">
              {copy.metrics.map((item, idx) => (
                <motion.div key={idx} initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: idx * 0.15 }} className="bg-white p-5 rounded-2xl shadow-lg border border-slate-50 flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">{item.label}</span>
                    <span className="text-sm font-black text-slate-900">{item.val}</span>
                  </div>
                  <div className={`w-8 h-2 rounded-full ${['bg-green-500', 'bg-blue-500', 'bg-purple-500'][idx]} shadow-sm`} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        );
      case "03":
        return (
          <motion.div key="v3" variants={containerVariants} initial="initial" animate="animate" exit="exit" className="w-full h-full flex flex-col items-center justify-center">
             <div className="flex gap-4 mb-10">
                {[0, 1, 2, 3, 4].map(i => (
                  <motion.div
                    key={i}
                    animate={{ height: [30, 80, 30], backgroundColor: i % 2 === 0 ? ["#007AFF", "#3b82f6", "#007AFF"] : ["#cbd5e1", "#e2e8f0", "#cbd5e1"] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                    className="w-3 rounded-full bg-slate-200"
                  />
                ))}
             </div>
             <div className="flex items-center gap-6 bg-white p-6 rounded-[32px] shadow-2xl border border-slate-100">
                <div className="flex -space-x-3">
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop" className="w-12 h-12 rounded-full border-4 border-white shadow-xl" alt="nurture-person" />
                  <div className="w-12 h-12 rounded-full bg-blue-600 border-4 border-white shadow-xl flex items-center justify-center text-white font-black text-sm">AI</div>
                </div>
                <div className="h-8 w-[1px] bg-slate-100" />
                <p className="text-xs font-bold text-slate-500 italic">{copy.followUp}</p>
             </div>
          </motion.div>
        );
      case "04":
        return (
          <motion.div key="v4" variants={containerVariants} initial="initial" animate="animate" exit="exit" className="w-full h-full flex items-center justify-center">
             <div className="bg-white p-5 sm:p-8 rounded-[28px] sm:rounded-[40px] shadow-2xl border border-slate-50 flex flex-col items-center gap-6">
                <div className="w-20 h-20 bg-green-50 rounded-3xl flex items-center justify-center text-green-500 shadow-inner">
                   <Target size={40} />
                </div>
                <div className="text-center">
                   <p className="text-xl font-black text-slate-900">{copy.meetingScheduled}</p>
                   <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">{copy.pushedToCrm}</p>
                </div>
             </div>
          </motion.div>
        );
      case "05":
        return (
          <motion.div key="v5" variants={containerVariants} initial="initial" animate="animate" exit="exit" className="w-full h-full flex items-center justify-center">
            <div className="relative w-64 h-64 flex items-end justify-center gap-3 px-6">
              {[50, 90, 70, 130, 160].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: h }}
                  transition={{ delay: i * 0.1, duration: 1, ease: "circOut" }}
                  className="w-8 bg-blue-600 rounded-t-xl shadow-lg relative group"
                />
              ))}
              <div className="absolute top-2 right-2 p-4 bg-white rounded-2xl shadow-xl border border-slate-50 flex flex-col gap-1">
                 <div className="flex items-center gap-2">
                    <div className="p-2 bg-green-50 rounded-lg text-green-600"><TrendingUp size={16}/></div>
                    <p className="text-lg font-black text-slate-900">4.2x</p>
                 </div>
                 <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest text-center">{copy.gciLift}</p>
              </div>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full bg-white rounded-[48px] shadow-[inset_20px_20px_40px_#d1d9e6,inset_-20px_-20px_40px_#ffffff] flex items-center justify-center relative overflow-hidden">
      <AnimatePresence mode="wait">
        {renderContent()}
      </AnimatePresence>
    </div>
  );
};

const StepsSection = ({ copy, visualCopy }) => {
  const [activeStep, setActiveStep] = useState("01");

  const handleStepTap = (stepId) => {
    setActiveStep((current) => (current === stepId ? null : stepId));
  };

  const stepIcons = [<Globe size={24} />, <Cpu size={24} />, <Repeat size={24} />, <Target size={24} />, <PieChart size={24} />];
  const steps = copy.items.map((step, index) => ({ ...step, icon: stepIcons[index] }));

  return (
    <section className="bg-white py-32 px-6 overflow-hidden relative">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 text-left max-w-2xl">
          <div className="inline-block px-5 py-1.5 bg-slate-50 border border-slate-100 rounded-full text-blue-600 text-xs font-black uppercase tracking-[0.2em] shadow-sm mb-6">
            {copy.eyebrow}
          </div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 mb-8 leading-[0.95]">{copy.titleLine1} <br /> {copy.titleLine2}</h2>
          <p className="text-xl text-slate-500 font-medium leading-relaxed">
            {copy.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch min-h-[600px]">
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
            {steps.map((step) => (
              <motion.div 
                key={step.id}
                onMouseEnter={() => setActiveStep(step.id)}
                onClick={() => handleStepTap(step.id)}
                className={`relative group px-8 py-6 rounded-[32px] cursor-pointer transition-all duration-300 flex flex-wrap lg:flex-nowrap items-start gap-6 flex-1
                  ${activeStep === step.id 
                    ? 'bg-slate-50 shadow-[inset_8px_8px_16px_#d1d9e6,inset_-8px_-8px_16px_#ffffff]' 
                    : 'bg-white shadow-[12px_12px_24px_#d1d9e6,-12px_-12px_24px_#ffffff] hover:shadow-[6px_6px_12px_#d1d9e6,-6px_-6px_12px_#ffffff]'}
                `}
              >
                <div className={`w-14 h-14 rounded-2xl flex-shrink-0 flex items-center justify-center transition-all duration-300
                  ${activeStep === step.id 
                    ? 'bg-blue-600 text-white shadow-lg scale-110' 
                    : 'bg-slate-50 text-slate-400 group-hover:text-blue-500 shadow-[3px_3px_6px_#d1d9e6,-3px_-3px_6px_#ffffff]'}
                `}>
                  {step.icon}
                </div>
                <div className="pt-1">
                  <h3 className={`text-xl font-black tracking-tight transition-colors mb-2 ${activeStep === step.id ? 'text-slate-900' : 'text-slate-400'}`}>
                    {step.title}
                  </h3>
                  <p className={`text-[13px] leading-relaxed font-medium transition-colors ${activeStep === step.id ? 'text-slate-500' : 'text-slate-300'}`}>
                    {step.desc}
                  </p>
                </div>
                {activeStep === step.id && (
                  <motion.div layoutId="activeStepArrow" className="ml-auto mt-2 text-blue-500 flex-shrink-0">
                    <ArrowRight size={20} strokeWidth={3} className="rotate-90 lg:rotate-0" />
                  </motion.div>
                )}
                {activeStep === step.id && (
                  <div className="mt-2 w-full basis-full lg:hidden">
                    <VisualStage activeId={step.id} copy={visualCopy} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          <div className="lg:col-span-6 hidden lg:block">
            <VisualStage activeId={activeStep} copy={visualCopy} />
          </div>
        </div>
      </div>
    </section>
  );
};

const MathSection = ({ copy }) => {
  const [commission, setCommission] = useState(12500);
  const [deals, setDeals] = useState(24);
  const recoveryDeals = 12;

  const currentGCI = commission * deals;
  const liftGCI = commission * recoveryDeals;
  const targetGCI = currentGCI + liftGCI;

  const formatCurrency = (num) => new Intl.NumberFormat(copy.locale, {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(num);

  return (
    <section id="math" className="py-20 md:py-32 px-4 sm:px-6 bg-[#f8faff] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-white text-slate-600 rounded-full text-sm font-bold mb-8 uppercase tracking-widest shadow-sm">
              <TrendingUp size={18} />
              <span>{copy.eyebrow}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter mb-10 leading-[0.95]">{copy.titleLine1} <br className="hidden sm:block" /> {copy.titleLine2}</h2>
            <p className="text-lg sm:text-xl text-slate-500 font-medium leading-relaxed mb-10 sm:mb-12 max-w-xl">
              {copy.description}
            </p>
            <div className="space-y-8 sm:space-y-12">
              <div className="space-y-4 sm:space-y-6">
                <div className="flex justify-between items-end">
                  <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">{copy.avgCommission}</label>
                  <span className="text-2xl sm:text-3xl font-bold text-slate-900">{formatCurrency(commission)}</span>
                </div>
                <input type="range" min="5000" max="50000" step="500" value={commission} onChange={(e) => setCommission(Number(e.target.value))} className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
              </div>
              <div className="space-y-4 sm:space-y-6">
                <div className="flex justify-between items-end">
                  <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">{copy.annualDeals}</label>
                  <span className="text-2xl sm:text-3xl font-bold text-slate-900">{deals}</span>
                </div>
                <input type="range" min="5" max="200" step="1" value={deals} onChange={(e) => setDeals(Number(e.target.value))} className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-slate-900 rounded-[28px] sm:rounded-[56px] p-5 sm:p-10 md:p-16 text-white shadow-[0_60px_120px_-20px_rgba(0,0,0,0.4)] relative z-10">
              <h3 className="text-xl sm:text-2xl font-bold text-blue-400 mb-8 sm:mb-12 flex items-center gap-3 sm:gap-4"><Calculator size={24} /> {copy.projectedLift}</h3>
              <div className="space-y-6 sm:space-y-10">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4 pb-6 sm:pb-10 border-b border-white/10">
                  <span className="text-slate-400 font-medium text-base sm:text-lg">{copy.currentGci}</span>
                  <span className="text-3xl font-bold">{formatCurrency(currentGCI)}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4 pb-6 sm:pb-10 border-b border-white/10">
                  <div className="flex flex-col">
                    <span className="text-slate-400 font-medium text-base sm:text-lg">{copy.recovery}</span>
                    <span className="text-xs font-bold text-green-400 uppercase tracking-widest mt-1">+{recoveryDeals} {copy.additionalDeals}</span>
                  </div>
                  <span className="text-3xl sm:text-4xl font-black text-green-400">+{formatCurrency(liftGCI)}</span>
                </div>
                <div className="pt-4 sm:pt-6">
                  <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.22em] sm:tracking-[0.3em] text-blue-400 block mb-3 sm:mb-4">{copy.totalPotential}</span>
                  <div className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-[1]">{formatCurrency(targetGCI)}</div>
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-500 py-4 sm:py-8 rounded-[18px] sm:rounded-[32px] font-black text-base sm:text-2xl transition-all shadow-2xl shadow-blue-600/30 active:scale-[0.98] mt-6 sm:mt-10">{copy.cta}</button>
              </div>
            </div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-green-400/10 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

const LandingPage = ({ initialLanguage = DEFAULT_LANGUAGE }) => {
  const router = useRouter();
  const pathname = usePathname();
  const normalizedInitialLanguage = TRANSLATIONS[initialLanguage] ? initialLanguage : DEFAULT_LANGUAGE;
  const [language, setLanguage] = useState(normalizedInitialLanguage);
  const copy = TRANSLATIONS[language];
  const [setupStarted, setSetupStarted] = useState(false);
  const [setupStep, setSetupStep] = useState(0);
  const [setupInput, setSetupInput] = useState("");
  const [setupAnswers, setSetupAnswers] = useState([]);
  const [inputFocused, setInputFocused] = useState(false);
  const [animatedQuestionText, setAnimatedQuestionText] = useState("");
  const [isQuestionTyping, setIsQuestionTyping] = useState(false);

  const setupQuestions = copy.finalCta.questions;
  const problemIcons = [<Zap />, <Layers />, <ShieldCheck />, <BarChart3 />, <Target />, <MessageSquare />];

  useEffect(() => {
    const pathLanguage = pathname?.split('/')[1];

    if (pathLanguage && TRANSLATIONS[pathLanguage]) {
      setLanguage(pathLanguage);
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, pathLanguage);
      return;
    }

    const savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (savedLanguage && TRANSLATIONS[savedLanguage]) {
      setLanguage(savedLanguage);
    }
  }, [pathname]);

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }, [language]);

  const getLanguageHref = (nextLanguage) => `/${nextLanguage}`;

  const handleLanguageFocus = () => {
    document.documentElement.lang = language;
  };

  const handleLanguageChange = (nextLanguage) => {
    if (!TRANSLATIONS[nextLanguage]) return;
    setLanguage(nextLanguage);
    router.push(getLanguageHref(nextLanguage));
  };

  const scrollToDealRecovery = () => {
    document.getElementById("deal-recovery")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const calPrefillQuestionIds = ["leadsource", "howfast", "whathappens", "howmany"];
  const calBookingUrl = (() => {
    const params = new URLSearchParams({ layout: "month_view" });

    setupAnswers.forEach((answer, index) => {
      const fieldId = calPrefillQuestionIds[index];
      if (!fieldId || !answer) return;
      params.append(fieldId, answer);
    });

    return `https://cal.com/blossom-accelerate/leads?${params.toString()}`;
  })();

  useEffect(() => {
    if (!setupStarted || setupStep >= setupQuestions.length) return;

    const fullQuestion = setupQuestions[setupStep];
    setAnimatedQuestionText("");
    setIsQuestionTyping(true);
    let charIndex = 0;

    const typeInterval = window.setInterval(() => {
      charIndex += 1;
      setAnimatedQuestionText(fullQuestion.slice(0, charIndex));

      if (charIndex >= fullQuestion.length) {
        window.clearInterval(typeInterval);
        setIsQuestionTyping(false);
      }
    }, 28);

    return () => {
      window.clearInterval(typeInterval);
      setIsQuestionTyping(false);
    };
  }, [setupStarted, setupStep, setupQuestions]);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <Navbar onGetStartedClick={scrollToDealRecovery} language={language} onLanguageChange={handleLanguageChange} onLanguageFocus={handleLanguageFocus} copy={copy.nav} />
      
      {/* Hero Section */}
      <section className="pt-20 md:pt-32">
        <HeroAnimation onPrimaryCtaClick={scrollToDealRecovery} copy={copy.hero} />
      </section>

      {/* Problems Section */}
      <section className="py-20 md:py-32 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-7xl font-extrabold tracking-tighter mb-8">{copy.problems.titleLine1} <br className="hidden sm:block" /> {copy.problems.titleLine2}</h2>
            <p className="text-slate-400 text-2xl max-w-3xl mx-auto font-medium leading-relaxed italic">{copy.problems.quote}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {copy.problems.cards.map((item, i) => (
              <div key={item.title} className="p-6 sm:p-8 md:p-12 border border-black/5 bg-slate-50/40 rounded-[56px] hover:bg-white hover:shadow-2xl transition-all duration-500 group">
                <div className="mb-10 text-blue-600 group-hover:scale-110 transition-transform duration-300">{React.cloneElement(problemIcons[i], { size: 40, strokeWidth: 1.5 })}</div>
                <h3 className="text-2xl sm:text-3xl font-black mb-4 sm:mb-6 tracking-tight">{item.title}</h3>
                <p className="text-slate-500 text-base sm:text-lg leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Steps Section */}
      <StepsSection copy={copy.steps} visualCopy={copy.visuals} />

      {/* Math Calculator Section */}
      <MathSection copy={copy.math} />

      {/* Features Section */}
      <section id="features" className="py-20 md:py-32 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mb-24">
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tighter mb-10 leading-[0.95]">{copy.features.titleLine1} <br className="hidden sm:block" /> {copy.features.titleLine2}</h2>
            <p className="text-2xl text-slate-500 font-medium leading-relaxed">{copy.features.description}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <FeatureCard icon={Zap} title={copy.features.cards[0].title} description={copy.features.cards[0].desc} />
            <FeatureCard icon={Target} title={copy.features.cards[1].title} description={copy.features.cards[1].desc} />
            <FeatureCard icon={BarChart3} title={copy.features.cards[2].title} description={copy.features.cards[2].desc} />
          </div>
        </div>
      </section>

      {/* Transformation Section */}
      <section className="py-20 md:py-32 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-bold mb-8">
                <ShieldCheck size={16} />
                <span>{copy.advantage.eyebrow}</span>
              </div>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tighter mb-8 leading-none">{copy.advantage.titleLine1} <br className="hidden sm:block" /> {copy.advantage.titleLine2}</h2>
              <div className="space-y-4 sm:space-y-6">
                {copy.advantage.bullets.map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="mt-1 bg-green-500/10 text-green-600 p-1 rounded-full">
                      <CheckCircle2 size={20} />
                    </div>
                    <p className="text-xl font-medium text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent rounded-[60px]" />
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200" 
                alt={copy.advantage.imageAlt}
                className="w-full h-auto rounded-[60px] shadow-2xl"
              />
              <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-xl border border-black/5 max-w-xs">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white">
                    <Zap size={24} fill="currentColor" />
                  </div>
                  <div className="text-3xl font-black">+420%</div>
                </div>
                <p className="font-bold text-slate-500 leading-tight uppercase tracking-widest text-[10px]">{copy.advantage.stat}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="deal-recovery" className="py-14 md:py-20 px-4 sm:px-6 bg-white border-t border-black/5">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-tight text-slate-900">
            {copy.finalCta.titleLine1} <br className="hidden sm:block" /> {copy.finalCta.titleLine2}
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-slate-500 mb-8 max-w-2xl mx-auto font-medium">
            {copy.finalCta.description}
          </p>
          <div className="flex flex-col justify-center items-center gap-6 w-full">
            {!setupStarted ? (
              <motion.button
                onClick={() => setSetupStarted(true)}
                initial={{ opacity: 0, y: 16, scale: 0.98, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="bg-slate-900 text-white px-12 py-5 rounded-full font-bold text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
              >
                {copy.finalCta.button} <ArrowRight size={24} />
              </motion.button>
            ) : setupStep < setupQuestions.length ? (
              <motion.div
                key={`final-setup-step-${setupStep}`}
                initial={{ opacity: 0, y: 22, scale: 0.985, filter: "blur(12px)" }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-3xl"
              >
                <p className="text-center text-2xl sm:text-3xl md:text-4xl font-thin tracking-tight text-slate-900 mb-5 min-h-[3.25rem] md:min-h-[4.5rem] flex items-center justify-center">
                  <span>
                    {animatedQuestionText}
                    {isQuestionTyping && (
                      <span className="inline-block w-[1px] h-[0.9em] ml-1 align-[-0.08em] bg-slate-700 animate-pulse" />
                    )}
                  </span>
                </p>
                {!isQuestionTyping && (
                  <input
                    autoFocus
                    type="text"
                    value={setupInput}
                    onChange={(e) => setSetupInput(e.target.value)}
                    onFocus={() => setInputFocused(true)}
                    onBlur={() => setInputFocused(false)}
                    onKeyDown={(e) => {
                      if (e.key !== "Enter" || !setupInput.trim()) return;
                      const currentAnswer = setupInput.trim();
                      setSetupAnswers((prev) => [...prev, currentAnswer]);
                      setSetupInput("");
                      setSetupStep((prev) => prev + 1);
                    }}
                    placeholder={inputFocused ? "" : copy.finalCta.inputPlaceholder}
                    className="w-full max-w-xl mx-auto block bg-transparent border-0 border-b border-slate-300 px-1 py-2 text-center text-base md:text-xl font-light text-slate-700 focus:outline-none focus:border-slate-900 transition-colors"
                  />
                )}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-5xl"
              >
                <p className="text-center text-2xl md:text-3xl font-thin tracking-tight text-slate-900 mb-6">
                  {copy.finalCta.bookingPrompt}
                </p>
                <div className="w-full h-[760px] border border-slate-200 rounded-2xl overflow-hidden shadow-xl">
                  <iframe
                    title={copy.finalCta.calendarTitle}
                    src={calBookingUrl}
                    className="w-full h-full"
                  />
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <footer className="py-16 md:py-24 px-4 sm:px-6 border-t border-black/5 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-center items-center">
          <div className="text-2xl font-black tracking-tighter text-slate-900">blossom accelerate</div>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        html { scroll-behavior: smooth; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 20px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,0.2); }
        
        input[type='range'] {
          -webkit-appearance: none;
          background: transparent;
        }
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none; 
          height: 32px; width: 32px; 
          border-radius: 50%;
          background: #007AFF; 
          cursor: pointer; 
          box-shadow: 0 5px 15px rgba(0, 122, 255, 0.4);
          margin-top: -10px;
          border: 4px solid white;
        }
        input[type='range']::-webkit-slider-runnable-track {
          width: 100%;
          height: 12px;
          cursor: pointer;
          background: #E2E8F0;
          border-radius: 10px;
        }
      `}} />
    </div>
  );
};

export default LandingPage;
