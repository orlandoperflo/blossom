"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Settings, User, RefreshCcw } from 'lucide-react';

const Avatar = ({ src, active = false }) => (
  <div className={`relative w-10 h-10 md:w-11 md:h-11 rounded-full p-0.5 transition-all ${active ? 'bg-white shadow-sm ring-1 ring-black/5' : 'grayscale opacity-40'}`}>
    <Image src={src} width={44} height={44} className="w-full h-full rounded-full object-cover" alt="user" />
    {active && <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />}
  </div>
);

export default function HeroExperience() {
  const [visibleMessages, setVisibleMessages] = useState([]);
  const [typingState, setTypingState] = useState({ active: false, role: 'agent' });
  const [stage, setStage] = useState('intro_all');
  const [showPing, setShowPing] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const scrollContainerRef = useRef(null);

  const clientAvatar = "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&q=80";
  const blossomBlue = "#007AFF";
  const appleBezier = [0.23, 1, 0.32, 1];

  const chatMessages = [
    { id: 1, type: 'text', content: 'Hi, is 108 Sky Tower still available?', role: 'client', delay: 800 },
    { id: 2, type: 'text', content: "It is! Beautiful property. Here's a look at the main living area.", role: 'agent', delay: 1200 },
    { id: 3, type: 'image', content: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800', role: 'agent', delay: 600 },
  ];

  useEffect(() => {
    if (!hasStarted) return;
    let isMounted = true;
    const runSimulation = async () => {
      await new Promise((r) => setTimeout(r, 800));
      for (const msg of chatMessages) {
        if (!isMounted) break;
        setTypingState({ active: true, role: msg.role });
        await new Promise((r) => setTimeout(r, msg.delay));
        if (!isMounted) break;
        setTypingState({ active: false, role: msg.role });
        setVisibleMessages((prev) => [...prev, msg]);
        await new Promise((r) => setTimeout(r, 400));
      }
      if (!isMounted) return;
      setStage('notification');
      await new Promise((r) => setTimeout(r, 500));
      if (!isMounted) return;
      setShowPing(true);
      await new Promise((r) => setTimeout(r, 3000));
      if (!isMounted) return;
      setStage('accelerate');
    };
    runSimulation();
    return () => { isMounted = false; };
  }, [hasStarted]);

  useEffect(() => {
    if (!scrollContainerRef.current) return;
    const { scrollHeight, clientHeight } = scrollContainerRef.current;
    scrollContainerRef.current.scrollTo({ top: scrollHeight - clientHeight, behavior: 'smooth' });
  }, [visibleMessages, typingState.active]);

  return <section className="pt-20 md:pt-32"><div className="max-w-7xl mx-auto px-4">
    <AnimatePresence mode="wait">
      {stage === 'intro_all' && <motion.div key="intro" initial={{opacity:0}} animate={{opacity:1}} className="text-center py-20">
        <h1 className="text-4xl md:text-7xl font-black tracking-tight">Leads choose the first agent who responds.</h1>
        <button onClick={() => { setStage('chat'); setHasStarted(true); }} className="mt-8 px-8 py-4 bg-slate-900 text-white rounded-full font-bold">Watch How This Gets You Deals</button>
      </motion.div>}
      {stage === 'chat' && <motion.div key="chat" initial={{opacity:0}} animate={{opacity:1}} className="relative w-full max-w-4xl mx-auto h-[460px] bg-[#F2F2F2] rounded-[32px] flex overflow-hidden">
        <div className="w-16 bg-white/40 border-r border-black/5 flex flex-col items-center py-6 gap-5"><Search size={18}/><Avatar src={clientAvatar} active/><User size={18}/><Settings size={18}/></div>
        <div className="flex-1 flex flex-col"><div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-6 space-y-3">{visibleMessages.map((msg)=><div key={msg.id} className={`flex ${msg.role==='agent'?'justify-end':'justify-start'}`}><div className="bg-white rounded-2xl p-3 max-w-[80%]">{msg.type==='image'?<Image src={msg.content} width={800} height={420} alt="listing" className="rounded-xl"/>:msg.content}</div></div>)}{typingState.active && <div className="text-xs text-slate-500">typing…</div>}</div></div>
      </motion.div>}
      {stage === 'notification' && <motion.div key="notif" initial={{opacity:0}} animate={{opacity:1}} className="text-center py-20"><p className="text-2xl">Booked House Tour</p>{showPing && <p className="text-blue-600">Instant alert delivered</p>}</motion.div>}
      {stage === 'accelerate' && <motion.div key="acc" initial={{opacity:0}} animate={{opacity:1}} className="text-center py-20"><h2 className="text-5xl font-black">Stop losing deals.</h2><button onClick={()=>{setVisibleMessages([]);setStage('intro_all');setHasStarted(false);setShowPing(false);}} className="mt-6 inline-flex items-center gap-2 text-slate-500"><RefreshCcw size={14}/>Replay</button></motion.div>}
    </AnimatePresence>
  </div></section>;
}
