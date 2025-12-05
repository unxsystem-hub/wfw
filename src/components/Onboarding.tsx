import React from 'react';
export default function Onboarding({onStart}:{onStart:()=>void}){
  return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'linear-gradient(180deg,#071025,#02111a)'}}>
      <div style={{width:560,background:'rgba(255,255,255,0.03)',padding:28,borderRadius:14,textAlign:'center'}}>
        <h1 style={{fontSize:34,margin:6}}>نوبي AI</h1>
        <p style={{color:'#cbd5e1'}}>ارفع صورة الحذاء وشاهد النتيجة على موديلات مختلفة.</p>
        <button onClick={onStart} style={{marginTop:18,padding:'10px 24px',background:'#ef476f',color:'white',border:'none',borderRadius:10,fontSize:16}}>ابدأ الآن</button>
      </div>
    </div>
  );
}