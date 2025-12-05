import React, { useState } from 'react';
import Onboarding from './components/Onboarding';
import ShoeEditor from './components/ShoeEditor';

export default function App(){ const [started,setStarted]=useState(false); return started ? <ShoeEditor/> : <Onboarding onStart={()=>setStarted(true)}/>;}
