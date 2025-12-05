import React, { useState } from 'react';
import { generateShoeEdit } from '../services/shoeService';

export default function ShoeEditor(){
  const [fileData,setFileData]=useState<string|null>(null);
  const [personType,setPersonType]=useState<'man'|'woman'|'child'>('man');
  const [sceneType,setSceneType]=useState<'cinematic'|'studio'|'street'>('cinematic');
  const [clothingStyle,setClothingStyle]=useState('casual');
  const [facialFeatures,setFacialFeatures]=useState('neutral');
  const [showShoeOnly,setShowShoeOnly]=useState(false);
  const [bgColor,setBgColor]=useState('#ffffff');
  const [result,setResult]=useState<string|null>(null);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState<string|null>(null);

  const onFile=(e:any)=>{
    const f=e.target.files?.[0]; if(!f) return;
    const r=new FileReader(); r.onload=()=>{ const s=r.result as string; setFileData(s.split(',')[1]); }; r.readAsDataURL(f);
  };

  const onSubmit=async()=>{
    setError(null); setResult(null);
    if(!fileData){ setError('ارفع صورة الحذاء أولاً'); return; }
    setLoading(true);
    try{
      const res = await generateShoeEdit([{data:fileData,mimeType:'image/png'}], { personType, facialFeatures, clothingStyle, showShoeOnly, sceneType, backgroundColor: bgColor } as any);
      setResult(res.newImage);
    }catch(e:any){
      setError(e.message||'خطأ في المعالجة');
    }finally{ setLoading(false); }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>محرر الأحذية</h2>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
          <div>
            <label>ارفع صورة الحذاء</label><br/>
            <input type="file" accept="image/*" onChange={onFile} />
            <div style={{marginTop:10}}>
              <label>عرض على</label><br/>
              <select value={personType} onChange={e=>setPersonType(e.target.value as any)}>
                <option value="man">رجل</option><option value="woman">امرأة</option><option value="child">طفل</option>
              </select>
            </div>
            <div style={{marginTop:8}}><label>ستايل اللبس</label><br/><input value={clothingStyle} onChange={e=>setClothingStyle(e.target.value)}/></div>
            <div style={{marginTop:8}}><label>ملامح الوجه</label><br/><input value={facialFeatures} onChange={e=>setFacialFeatures(e.target.value)}/></div>
            <div style={{marginTop:8}}><label>نوع المشهد</label><br/><select value={sceneType} onChange={e=>setSceneType(e.target.value as any)}><option value="cinematic">سينمائي</option><option value="studio">استوديو</option><option value="street">شارع</option></select></div>
            <div style={{marginTop:8}}><label>إظهار الحذاء فقط</label><input type="checkbox" checked={showShoeOnly} onChange={e=>setShowShoeOnly(e.target.checked)} style={{marginLeft:8}}/></div>
            <div style={{marginTop:8}}><label>لون الخلفية</label><br/><input type="color" value={bgColor} onChange={e=>setBgColor(e.target.value)}/></div>
            <div style={{marginTop:12}}><button onClick={onSubmit} disabled={loading} style={{padding:'8px 16px',background:'#06b6d4',color:'#04203a',borderRadius:8}}>{loading?'جارٍ المعالجة...':'تحرير الصورة'}</button></div>
            {error && <div style={{color:'#ff7b7b',marginTop:10}}>{error}</div>}
          </div>
          <div>
            <div style={{minHeight:200,display:'flex',alignItems:'center',justifyContent:'center',background:'#0b1220',borderRadius:8}}>{fileData ? <img src={`data:image/png;base64,${fileData}`} style={{maxWidth:'100%',maxHeight:300}}/> : <div style={{color:'#9ca3af'}}>لم تقم برفع صورة بعد</div>}</div>
            {result && (<div style={{marginTop:12}}><h4>النتيجة</h4><img src={`data:image/png;base64,${result}`} style={{maxWidth:'100%'}}/></div>)}
          </div>
        </div>
      </div>
    </div>
  );
}