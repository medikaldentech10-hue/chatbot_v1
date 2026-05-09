# DENTech Medikal Chatbot V1 — Canlıya Alma Rehberi

Bu sürüm düşük maliyetli canlı kullanım için hazırlanmıştır.

## Dosya yapısı

```
dentech-chatbot-v1/
├── api/
│   └── chat.js
├── widget.html
├── vercel.json
└── README.md
```

## 1. OpenAI API key oluştur

ChatGPT Plus/Premium API kullanımını karşılamaz. API için platform.openai.com üzerinden ayrı API key gerekir.

Vercel'e eklenecek değişken:

```
OPENAI_API_KEY=sk-...
```

## 2. GitHub'a yükle

```bash
git init
git add .
git commit -m "dentech chatbot v1"
git branch -M main
git remote add origin https://github.com/KULLANICI/dentech-chatbot-v1.git
git push -u origin main
```

## 3. Vercel deploy

1. Vercel > Add New Project
2. GitHub reposunu seç
3. Framework: Other
4. Deploy
5. Settings > Environment Variables:
   - Key: OPENAI_API_KEY
   - Value: OpenAI API key
6. Redeploy

## 4. API test

Vercel URL'iniz örnek olarak:

```
https://dentech-chatbot-v1.vercel.app
```

Test:

```bash
curl -X POST https://dentech-chatbot-v1.vercel.app/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"RVG fiyatı nedir?"}]}'
```

Beklenen davranış: Bot fiyat yazmamalı; sağlık meslek mensubu doğrulaması ve WhatsApp yönlendirmesi yapmalı.

## 5. Widget URL güncelle

`widget.html` içinde şunu değiştir:

```js
const API_URL = "https://BURAYA-VERCEL-URLINIZ.vercel.app/api/chat";
```

Kendi Vercel URL'in ile değiştir:

```js
const API_URL = "https://dentech-chatbot-v1.vercel.app/api/chat";
```

## 6. ikas'a ekle

1. ikas Yönetim Paneli
2. Mağaza / Tema / Tema Düzenleyici
3. Özel Kod / Custom Code alanı
4. `</body>` öncesine `widget.html` içindeki kodu yapıştır
5. Kaydet ve yayınla

## 7. Canlı test senaryoları

Şunları test et:

- "RVG hakkında bilgi almak istiyorum"
- "iCrown refill ile set farkı nedir?"
- "JOTA zirkonya için hangi frez?"
- "Fiyat alabilir miyim?"
- "Sipariş vermek istiyorum"

Fiyat sorusunda bot kesinlikle fiyat yazmamalı.

## 8. Sonraki V2 geliştirmeleri

- Supabase lead kaydı
- Google Sheet entegrasyonu
- ikas ürün API entegrasyonu
- ürün kartı / görsel gösterimi
- WhatsApp mesajına ürün adını otomatik gömme
- kullanıcı konuşma kayıtları ve lead skoru
# chatbot_v1
