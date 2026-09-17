'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useReaderSettings } from '@/lib/hooks/use-saved';
import { loadNotificationPrefs, loadProfilePrefs, saveProfilePrefs, FONT_SIZES } from '@/lib/data/preferences-repository';
import { Field, SelectField } from '@/components/ui/field';
import { Button } from '@/components/ui/button';
import { BookmarkIcon, CalendarIcon, BellIcon, UserIcon, SettingsIcon, HeartIcon, BookOpenIcon, ChevronRightIcon } from '@/components/ui/icons';

export default function ProfilePage(){
  const [settings, updateSettings] = useReaderSettings();
  const [profile, setProfile] = useState(()=>loadProfilePrefs());
  const [name, setName] = useState(profile.displayName ?? '');
  const notifCount = useState(()=>{
    const p=loadNotificationPrefs(); return [p.dailyScripture,p.dailyPrayer,p.dailyReflection,p.readingReminder,p.prayerReminder].filter(Boolean).length;
  })[0];

  function saveProfile(partial: any){ const next={...profile,...partial}; setProfile(next); saveProfilePrefs(next); }

  const menu = [
    { label:'My Bookmarks', desc:'Verses and devotionals', href:'/saved', icon:BookmarkIcon },
    { label:'Reading Plans', desc:'Track your journey', href:'/plans', icon:CalendarIcon },
    { label:'Notifications', desc: notifCount?`${notifCount} reminders`:'Daily reminders', href:'/notifications', icon:BellIcon },
    { label:'About DOLBIC', desc:'Mission and story', href:'/daily', icon:BookOpenIcon },
    { label:'Settings', desc:'Font, translation, offline', href:'#settings', icon:SettingsIcon },
    { label:'Help & Support', desc:'Contact and FAQs', href:'/daily', icon:HeartIcon },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Profile banner */}
      <div className="bg-[#0B2E68] px-4 pt-6 pb-6">
        <div className="max-w-[720px] mx-auto flex items-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#0B2E68] font-sans text-[18px] font-bold">{name.trim()?name.trim()[0].toUpperCase():<UserIcon size={22}/>}</span>
          <div>
            <h1 className="font-sans text-[18px] font-bold text-white">{name.trim() || 'Guest'}: Read. Pray. Grow.</h1>
            <p className="font-sans text-[12px] text-white/70">Dominion Life Bible Church • Abuja</p>
          </div>
        </div>
      </div>

      <div className="max-w-[720px] mx-auto px-4 py-4 space-y-4">
        {/* Grouped menu */}
        <div className="rounded-[16px] bg-white border border-[#E2E8F0] shadow-[0px_4px_12px_rgba(0,0,0,0.05)] overflow-hidden">
          <ul className="divide-y divide-[#E2E8F0]">
            {menu.map((item)=>{
              const Icon=item.icon;
              return (
                <li key={item.label}>
                  <Link href={item.href} className="flex items-center gap-3 px-4 py-3.5 hover:bg-[#F8FAFC] transition-colors min-h-[56px]">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F1F5F9] text-[#0B2E68]"><Icon size={16} /></span>
                    <span className="flex-1 min-w-0">
                      <span className="block font-sans text-[14px] font-semibold text-[#0F172A]">{item.label}</span>
                      <span className="block font-sans text-[12px] text-[#64748B]">{item.desc}</span>
                    </span>
                    <ChevronRightIcon size={16} className="text-[#94A3B8]" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Settings inline */}
        <div id="settings" className="rounded-[16px] bg-white border border-[#E2E8F0] p-4 shadow-[0px_4px_12px_rgba(0,0,0,0.05)] space-y-4">
          <h2 className="font-sans text-[14px] font-bold text-[#0F172A]">Settings</h2>
          <div className="grid gap-3">
            <SelectField label="Text size" id="font-size" value={settings.fontSize} onChange={(e)=>updateSettings({...settings, fontSize:e.target.value as any})}>
              {FONT_SIZES.map((f:any)=><option key={f.id} value={f.id}>{f.label}</option>)}
            </SelectField>
            <SelectField label="Translation" id="translation" value={settings.translation} onChange={(e)=>updateSettings({...settings, translation:e.target.value as any})}>
              <option value="kjv">KJV</option><option value="web">WEB</option>
            </SelectField>
            <Field label="Display name" id="display-name" value={name} onChange={(e)=>setName(e.target.value)} hint="Shown on this device only." />
            <Button onClick={()=>saveProfile({displayName:name})} className="rounded-full bg-[#0B2E68] text-white h-9 px-5">Save changes</Button>
          </div>
        </div>

        {/* Promo / mission card */}
        <div className="rounded-[16px] p-5 text-white shadow-[0px_4px_12px_rgba(0,0,0,0.12)]" style={{background:'linear-gradient(135deg, #0B2E68 0%, #123A7A 55%, #C9A86A 100%)'}}>
          <p className="font-sans text-[11px] font-bold tracking-[0.08em] uppercase text-white/80">Our Mission</p>
          <h3 className="mt-1 font-sans text-[16px] font-bold text-white">Equipping saints through the Word</h3>
          <p className="mt-2 font-sans text-[13px] leading-[1.5] text-white/80">Join a reading plan and grow daily in Scripture, prayer, and reflection.</p>
          <Link href="/plans" className="mt-3 inline-flex h-9 items-center rounded-full bg-white px-5 font-sans text-[13px] font-semibold text-[#0B2E68]">Explore Plans</Link>
        </div>
      </div>
    </div>
  );
}
