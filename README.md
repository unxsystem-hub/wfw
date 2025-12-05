نوبي - محرر الأحذية (Image-to-Image)
===============================

### محتويات المشروع
- Vite + React + TypeScript frontend
- شاشة بداية (Onboarding)
- محرر (ShoeEditor) لرفع صورة الحذاء وتكوين prompt
- services/geminiService.ts يستخدم REST call إلى Google GenAI Images (edit)

### خطوات التشغيل في AI Studio
1. ارفع هذا ZIP كـ "Upload your own web app" عبر AI Studio (Apps → Create App).
2. بعد الرفع افتح App → Settings → Environment / Secrets وأضف متغير: VITE_GEMINI_API_KEY = YOUR_KEY
3. اضغط Run / Deploy داخل AI Studio.
4. افتح الرابط المعطى وجرب رفع صورة والضغط على "تحرير الصورة".

### ملاحظات
- قد تحتاج تعديل endpoint داخل src/services/geminiService.ts ليتناسب مع حسابك وإصدار API.
- لأمان أفضل، احفظ API Key كسِر داخل AI Studio وليس داخل الكود.
