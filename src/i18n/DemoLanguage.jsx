import React, {createContext, useContext, useEffect, useMemo, useState} from 'react';
import dictionary from './demo-translations.json';
import './demo-language.css';
import {useLanguage} from './LanguageContext';
export const demoLanguages = {en:'English',et:'Eesti',ru:'Русский',fi:'Suomi'};
const storageKey='toimu-language';
const Context=createContext({language:'en',tr:(text)=>text,setLanguage:()=>{}});
export function translateDemo(text,language='en',variables={}) {
 if(typeof text!=='string')return text;
 const translated=dictionary[text]?.[language] || text;
 return translated.replace(/\{(\w+)\}/g,(match,key)=>Object.prototype.hasOwnProperty.call(variables,key)?String(variables[key]):match);
}
export function DemoLanguageProvider({children}) {
 const [language,setLanguage]=useState(()=>{try {const url=new URL(window.location.href);const requested=url.searchParams.get('lang');if(demoLanguages[requested])return requested;const saved=localStorage.getItem(storageKey);return demoLanguages[saved]?saved:'en';}catch{return 'en';}});
 useEffect(()=>{document.documentElement.lang=language;try{localStorage.setItem(storageKey,language);}catch{}},[language]);
 const value=useMemo(()=>({language,setLanguage:(next)=>{if(demoLanguages[next])setLanguage(next)},tr:(text,variables)=>translateDemo(text,language,variables)}),[language]);
 return <Context.Provider value={value}>{children}</Context.Provider>;
}
export function useDemoLanguage(){const {language,setLanguage}=useLanguage();return useMemo(()=>({language,setLanguage,tr:(text,variables)=>translateDemo(text,language,variables)}),[language,setLanguage]);}
export function DemoLanguageSwitcher(){const {language,setLanguage,tr}=useDemoLanguage();return <label className="demo-language"><span className="demo-sr-only">{tr('Website language')}</span><select aria-label={tr('Website language')} value={language} onChange={e=>setLanguage(e.target.value)}>{Object.entries(demoLanguages).map(([code,name])=><option value={code} lang={code} key={code}>{name}</option>)}</select></label>;}
