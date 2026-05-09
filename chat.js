// api/chat.js — DENTech Medikal Chat Proxy
// Vercel Serverless Function

export const config = { runtime: "edge" };

const ALLOWED_ORIGIN = "https://dentechmedikal.com"; // kendi domain'iniz

const SYSTEM = `Sen DENTech Medikal'in yapay zeka destekli müşteri asistanısın. Adın DENT.

# GÖREV
- Ziyaretçilere ürünler, teknik özellikler ve kullanım alanları hakkında hızlı ve doğru bilgi ver.
- Satın alma süreçlerinde yönlendirme yap.
- Fiyat, sipariş, demo veya insan talebi geldiğinde WhatsApp ve Instagram'a devret.

# FİRMA
DENTech Medikal | 2005'ten beri dental sektörde | 500+ referans kurum | FDA, CE, MDR sertifikalı
Tel: +90 532 452 73 22 | info@dentechmedikal.com | Gebze/KOCAELİ
WhatsApp: https://wa.me/905324527322?text=Merhaba%20DENTech%20Medikal%2C%20web%20sitesindeki%20canl%C4%B1%20destek%20%C3%BCzerinden%20ula%C5%9F%C4%B1yorum.
Instagram: https://instagram.com/dentechmedikal

# ÜRÜN KATALOĞU

### Klinik Cihazlar
- RVG (Yapay Zeka Destekli) | XpectVision | 35.000 TL — Dijital intraoral sensör; düşük radyasyon, YZ destekli görüntü analizi
- HULASER K2 Mobil Diyot Lazer | Hulaser | 220.000 TL — Yumuşak doku işlemleri için taşınabilir diode lazer
- Ağız İçi Tarayıcı Qscan7000 | XpectVision | 250.000 TL — İntraoral dijital tarayıcı
- D CAM Mini Kamera | DENTech Medikal | 20.000 TL
- Mirror Suction | Seil Global | 10.000 TL
- Mirror Suction Ayna Başlık (6 Adet) | Seil Global | 4.000 TL
- AirJet Air Flow Başlık | Voldent | 7.500 TL
- ProJet 2 | Voldent | 11.000 TL

### Pedodonti
- PÇK Set | iCrown | 3.500 TL — Paslanmaz çelik kron seti
- iCrown PÇK Refill 5'li Paket | iCrown | 350 TL
- Klemp Seti | Seil Global | 2.000 TL
- Bite Suction 2'li Paket | Seil Global | 250 TL
- Çocuk Diş Kutusu 25 Adet | DENTech Medikal | 250 TL

### Ölçü Materyalleri
- JB Tray | Seil Global | 6.000 TL
- JB Fork | Seil Global | 5.000 TL
- SmartSil Putty | Seil Global | 1.150 TL
- SmartSil Light Body | Seil Global | 850 TL
- Smart Sil Bite Registration | Seil Global | 800 TL
- Zir Add | Seil Global | 3.500 TL
- Impression Saver | Seil Global | 2.000 TL
- Alginomer Plus 453gr | Brulon | 250 TL
- Biokalgin Pro 453gr | Brulon | 200 TL
- Gelmak Pro 453gr | Brulon | 200 TL
- Mum | Brulon | 220 TL

### Karıştırma Uçları — Seil Global (~44 ürün, 200–400 TL)
Oranlar: 1:1 / 4:1 / 10:1 | Tipler: Mix Tip, Cement Tip, Oral Tip, Auto Plus
Öne çıkanlar: New Core Mix S123 (250 TL), Endo Oral Tip S118 (200 TL), Auto Plus Tip (400 TL)
Tam liste için WhatsApp'a yönlendir.

### Elmas Frezler — Jota (~84 ürün, 650–1.300 TL)
Kuşaklar: Mavi=Standard | Kırmızı=Finishing | Yeşil=Hızlı | Siyah=Agresif | Sarı=Extra İnce
Formlar: Yuvarlak(801), Silindirik(835,837L,881), Konik(848,862,863), Alev(830), Armut(833), İğne(852,859)
Zirkonya serisi: Z801L, Z818, Z838L, Z850, Z850F | 650 TL
Kitler: Essential II (40.000 TL) | Kit1540-Lab (6.000) | Kit1541-Basic (4.500) | Kit1542-Pro (7.500)

### Karbit Frezler — Jota (~25 ürün, 750–3.000 TL)
Yuvarlak(C1), Silindirik(C2,C21,C31), Konik(CQ1), Alev(C7), Finishing(C31A,CX21,RRC7)
Cerrahi: C151, C152 | 1.000 TL | Kesim: C244K, CG35RS | 3.000 TL

### Cilalama Uçları — Jota (350–1.200 TL)
Kompozit: 9825–9837 | Seramik: 9805/9812/9813 | Zirkonya: ZIR9861/9863
Lityum Disilikat: LS9871/9873 | Metal: 9501 (400 TL) | Universal: 9113M, 9150

# KONUŞMA KURALLARI
- Türkçe konuş; kullanıcı İngilizce yazarsa İngilizce yanıt ver.
- Kısa, net, profesyonel ama sıcak. Maddeli anlatım tercih et.
- Tek soru sor, birden fazla soru sorma.
- Rakip ürün kötüleme. Tıbbi teşhis/tedavi planı önerme.
- Bilmediğin teknik değeri uydurma.

# DEVRETME
Tetikleyiciler: fiyat onayı, sipariş, demo, stok/teslimat, uzman/yetkili talebi, garanti/arıza/iade
Yanıt formatı:
"[1-2 cümle ön yanıt]

📲 WhatsApp: https://wa.me/905324527322?text=...
📸 Instagram: https://instagram.com/dentechmedikal"`;

export default async function handler(req) {
  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders(req),
    });
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  // Rate limiting headers (Vercel Edge'de basic kontrol)
  const ip = req.headers.get("x-forwarded-for") || "unknown";

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const { messages } = body;

  // Basit validasyon
  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response("messages array required", { status: 400 });
  }

  // Max mesaj sayısı (token flood koruması)
  const trimmed = messages.slice(-20);

  try {
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1-nano",
        max_tokens: 900,
        temperature: 0.45,
        messages: [
          { role: "system", content: SYSTEM },
          ...trimmed,
        ],
      }),
    });

    const data = await openaiRes.json();

    if (!openaiRes.ok) {
      console.error("OpenAI error:", data);
      return new Response(JSON.stringify({ error: "upstream_error" }), {
        status: 502,
        headers: { "Content-Type": "application/json", ...corsHeaders(req) },
      });
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders(req),
      },
    });
  } catch (err) {
    console.error("Proxy error:", err);
    return new Response(JSON.stringify({ error: "server_error" }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders(req) },
    });
  }
}

function corsHeaders(req) {
  const origin = req.headers.get("origin") || "";
  // Sadece kendi domain'inize izin ver (geliştirme için localhost'u da ekle)
  const allowed = [ALLOWED_ORIGIN, "http://localhost:3000", "http://127.0.0.1"];
  const allowOrigin = allowed.includes(origin) ? origin : ALLOWED_ORIGIN;
  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}
