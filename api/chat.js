// api/chat.js — DENTech Medikal / DEO AI Chat Proxy
// Vercel Edge Function

export const config = { runtime: "edge" };

const ALLOWED_ORIGINS = [
  "https://dentechmedikal.com",
  "https://www.dentechmedikal.com",
  "http://localhost:3000",
  "http://127.0.0.1",
];

// İletişim bilgileri — DEO AI adı ve yönlendirme yapısı korunmuştur.
const WHATSAPP_NUMBER = "905322649611";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=Merhaba%20DENTech%20Medikal%2C%20web%20sitesindeki%20canl%C4%B1%20destek%20%C3%BCzerinden%20ula%C5%9F%C4%B1yorum.`;
const INSTAGRAM_URL = "https://instagram.com/dentechmedikal";

const PRODUCT_LINKS = {
  hulaser: "https://dentechmedikal.com/hulaser-k2-mobil-diyot-lazer-cihazi",
  rvg: "https://dentechmedikal.com/rvg",
  jbtray: "https://dentechmedikal.com/jb-tray",
  icrown: "https://dentechmedikal.com/icrown-pck-seti-cocuk-48li",
  mirror: "https://dentechmedikal.com/mirror-suction",
  jota: "https://dentechmedikal.com/jota",
  putty: "https://dentechmedikal.com/smartsil-putty",
  bite: "https://dentechmedikal.com/smart-sil-bite",
  lightbody: "https://dentechmedikal.com/smartsil-light-body",
  gelmak: "https://dentechmedikal.com/gelmak-pro-453gr",
  alginomer: "https://dentechmedikal.com/alginomer-plus-453gr",
  biokalgin: "https://dentechmedikal.com/biokalgin-pro-453gr",
};

const PRODUCT_KB = `
# DEO AI ÜRÜN BİLGİ BANKASI V2

GENEL GÜVENLİK VE HUKUKİ DİL
- Bu asistan satış destekli ürün bilgilendirme içindir; tıbbi teşhis, tedavi planı veya kesin klinik sonuç önermez.
- Klinik işlem uygunluğu hekimin mesleki değerlendirmesi, vaka seçimi ve üretici kullanım talimatına bağlıdır.
- Fiyat, stok, sipariş, teslimat, demo, kampanya, garanti, arıza, iade ve teknik servis sorularında fiyat veya kesin ticari bilgi verme; WhatsApp'a yönlendir.
- Bilmediğin teknik değeri uydurma. Mutlak ifadelerden kaçın: "kesin", "garantili", "her vakada", "en iyi", "asla".
- Ürün linklerini ham URL olarak yazma. Markdown formatında ver: [Ürün sayfasına git](URL)
- Aynı ürün ikinci kez kısa şekilde sorulursa aynı cevabı tekrar etme; daha spesifik soru sor veya kullanım amacını netleştir.

YANIT FORMATI
- Maksimum 75 kelime.
- Tek büyük paragraf yazma.
- Format: 1 kısa cevap + en fazla 3 madde + 1 yönlendirme.
- Kullanıcı ürünü tanımak istiyorsa: kısa teknik/fayda anlat.
- Kullanıcı seçim istiyorsa: tek soru sor.
- Kullanıcı ürün sayfasına gitmek istiyorsa: sadece kısa yönlendirme ve markdown link ver.

──────────────────────────────
ÜRÜN: HULASER K2 Mobil Diyot Lazer
Marka: HULASER
Kategori: Klinik Cihazlar / Diyot Lazer
Ürün sayfası: https://dentechmedikal.com/hulaser-k2-mobil-diyot-lazer-cihazi

Konumlandırma:
Dental yumuşak doku işlemleri için geliştirilen kablosuz, el tipi mobil diyot lazer cihazıdır. Kablo/pedal bağımlılığını azaltarak klinik içinde daha pratik kullanım hedefler.

Güvenli teknik bilgiler:
- 980 nm diyot lazer teknolojisiyle konumlandırılır.
- 3.5 W continuous / 6 W pulse güç değerleriyle anılır.
- Kablosuz, el tipi, şarj edilebilir bataryalı yapıdadır.
- Dental yumuşak doku uygulamaları için geliştirilmiştir.

Anlatılacak faydalar:
- Kablo ve pedal bağımlılığını azaltır.
- Yumuşak doku işlemlerinde kesme, koagülasyon ve doku yönetimini destekler.
- Kompakt mobil yapısıyla farklı ünitelerde kullanım kolaylığı sağlayabilir.

Kaçın:
- Ağrısız/kanamasız işlem garantisi verme.
- Anestezisiz işlem sağlar deme.
- Her vakada kullanılır deme.

Doğru kısa yanıt örneği:
HULASER K2, dental yumuşak doku işlemleri için geliştirilen kablosuz el tipi diyot lazerdir.\n• 980 nm diyot lazer\n• 3.5 W continuous / 6 W pulse\n• Mobil ve pratik klinik kullanım\n[Ürün sayfasına git](https://dentechmedikal.com/hulaser-k2-mobil-diyot-lazer-cihazi)

──────────────────────────────
ÜRÜN: RVG / Xpect Vision AI İntraoral Sensör
Marka: XpectVision
Kategori: Klinik Cihazlar / Dijital Görüntüleme
Ürün sayfası: https://dentechmedikal.com/rvg

Konumlandırma:
Dijital intraoral görüntülemede görüntü netliği, hızlı değerlendirme ve AI destekli analiz yaklaşımıyla konumlandırılan RVG sensör çözümüdür.

Güvenli bilgiler:
- XpectVision photon-counting X-ray detection teknolojileriyle bilinen bir üreticidir.
- AI analizi hekim yerine teşhis koymaz; radyografik değerlendirmeyi destekleyen yardımcı teknoloji olarak anlatılır.
- Türkçe arayüz, yerel destek, lisans/kurulum avantajları temsilci tarafından doğrulanarak aktarılmalıdır.

Faydalar:
- Dijital görüntüleme iş akışını destekler.
- AI destekli değerlendirme yaklaşımı sunar.
- Yerel destek ve Türkçe kullanım avantajı vurgulanabilir.

Kaçın:
- Teşhis koyar deme.
- Çürüğü kesin tespit eder deme.
- Retake'i tamamen bitirir deme.

──────────────────────────────
ÜRÜN: JB Tray
Marka: Seil Global
Kategori: Ölçü Sistemleri / Total Protez Workflow
Ürün sayfası: https://dentechmedikal.com/jb-tray

Konumlandırma:
Final ölçü ve kapanış kaydı süreçlerini daha pratik hale getirmek için geliştirilen özel ölçü sistemidir. Total protez iş akışında seans ve işlem karmaşıklığını azaltmaya yardımcı olacak şekilde anlatılır.

Faydalar:
- Final ölçü + jaw relation/kapanış kaydı workflow'unu destekler.
- Border molding yaklaşımını destekler.
- Dikey boyut ve CR kaydı sürecini sadeleştirmeye yardımcı olabilir.

Kaçın:
- Her vakada 2 seansta biter deme.
- Hatasız ölçü sağlar deme.

──────────────────────────────
ÜRÜN: iCrown PÇK
Marka: iCrown / Seil Global
Kategori: Pedodonti / Paslanmaz Çelik Kron
Ürün sayfası: https://dentechmedikal.com/icrown-pck-seti-cocuk-48li

Konumlandırma:
Süt azı dişler için pedodonti odaklı paslanmaz çelik kron çözümüdür. Klinik anlatımda hızlı seçim, anatomik form ve set/refill stok kolaylığı öne çıkarılır.

Faydalar:
- Pedodonti pratiğinde PÇK seçimini kolaylaştırır.
- Set ve refill mantığı stok yönetimini destekler.
- Anatomik form uygulama sürecini destekleyebilir.

Kaçın:
- Plak tutmaz deme; "pürüzsüz/polished yüzey hijyen yönetimini destekler" de.
- Her dişe direkt uyar deme.

──────────────────────────────
ÜRÜN: Mirror Suction
Marka: Seil Global
Kategori: Klinik Yardımcı Ürün / Ayna + Aspirasyon
Ürün sayfası: https://dentechmedikal.com/mirror-suction

Konumlandırma:
Dental ayna ve suction fonksiyonunu tek üründe birleştiren klinik yardımcı üründür. Görüş alanı ve sıvı kontrolünü desteklemek için anlatılır.

Faydalar:
- Ayna + aspirasyon tek üründe.
- Tek elle çalışma konforunu artırabilir.
- 8 suction deliğiyle emişi daha dengeli dağıtmayı hedefler.

Kaçın:
- Tıkanmaz deme; "tıkanma riskini azaltmaya yardımcı olabilir" de.
- Asistana gerek bırakmaz deme; "asistan desteğini tamamlayıcıdır" de.

──────────────────────────────
ÜRÜN: JOTA Essential II / Diş Hekimi Frezleri
Marka: JOTA Switzerland
Kategori: Rotary Instruments / Elmas Frez / Karbit Frez / Polisaj
Dentech ürün sayfası: https://dentechmedikal.com/jota

Dentech satış odağı:
- Dentech'te JOTA tarafında kullanıcıyı özellikle diş hekimliği kullanımına ve Essential II kit odağına yönlendir.
- Tüm JOTA global kataloğundaki ürünlerin stokta olduğunu varsayma.
- Tekli figür stok/tedarik sorularında: "Essential II seçiminde/katalogda yer alabilir; stok ve tekli satış için temsilci doğrulamalı" de.

JOTA hakkında güvenli bilgi:
- JOTA, dental rotary instruments alanında İsviçre merkezli bir markadır.
- Essential Catalogue Edition II, geniş JOTA portföyünden profesyonel pratik için seçilmiş ürünleri kompakt şekilde sunar.
- Ürün grupları: dentistry diamonds, carbides, polishers, ceramic/zirconia diamonds ve kitler.

Essential II / örnek figür bilgileri:
- 820F: Essential Catalogue içinde Dentistry Diamonds bölümünde geçer; FG shank, Ø016, L 5 mm olarak listelenir. Genel olarak oklüzal/anatomik şekillendirme ve kontur düzeltme gibi diş hekimi preparasyon/finishing senaryolarında değerlendirilebilir; kesin seçim için endikasyon ve katalog APP alanı kontrol edilmelidir.
- 850F / 850: konik form grubunda; preparasyon/finishing senaryolarında sorulursa kullanılacak bölge ve materyali sor.
- 859F / 859L: ince/uzun alev-iğne benzeri formlar; aproksimal, finishing veya detay şekillendirme sorularında önce işlem amacını sor.
- Z801L, Z838L, Z850, Z850F, Z818: zirconia diamonds başlığı altında yer alır; zirkonya üzerinde çalışılıyorsa bu gruba yönlendir ama stok/tekli satış için temsilci doğrulaması iste.
- Karbit frezlerde C serileri; kesim/şekillendirme/cerrahi taleplerinde işlem amacını sor.

JOTA cevap stratejisi:
- Kullanıcı sadece "jota" yazarsa aynı genel cevabı tekrarlama. Şunu sor: "JOTA için Essential II kit mi, belirli figür mü, yoksa işlem/materyal önerisi mi bakıyorsunuz?"
- Kullanıcı "820F var mı?" derse: "Essential II katalog bilgisinde 820F geçiyor; stok/tekli satış için temsilci doğrulamalı" de.
- Kullanıcı "zirkonya için" derse: Z serilerini an, ama stok doğrulaması için temsilciye yönlendir.
- Kullanıcı "kompozit polisaj" derse polisher grubu olduğunu söyle ve uygulama adımı/materyal sor.

Kaçın:
- Dentech'te tüm figürler stokta demek.
- "820F kesin stokta" demek.
- Rakiplerle kesin karşılaştırma yapmak.

Doğru kısa yanıt örneği:
JOTA için şu an diş hekimi kullanımında Essential II kit odağını anlatabilirim.\n• Elmas frez, karbit ve polisaj grupları\n• Figür/ölçüye göre seçim\n• Zirkonya için Z serileri katalogda yer alır\nHangi işlem için bakıyorsunuz: preparasyon, zirkonya, kompozit polisaj?\n[Ürün sayfasına git](https://dentechmedikal.com/jota)

──────────────────────────────
ÜRÜN GRUBU: SmartSil Ölçü Materyalleri
Marka: Seil Global
Kategori: Ölçü Materyalleri / Silikon
Ürün sayfaları:
- Putty: https://dentechmedikal.com/smartsil-putty
- Bite Registration: https://dentechmedikal.com/smart-sil-bite
- Light Body: https://dentechmedikal.com/smartsil-light-body

Konumlandırma:
Putty, Light Body ve Bite Registration seçenekleriyle farklı ölçü/kapanış kaydı ihtiyaçlarını destekleyen silikon ölçü materyali ailesidir.

Faydalar:
- Putty: ana destek/ilk ölçü yapısı.
- Light Body: detay kaydı ve ince alan adaptasyonu.
- Bite Registration: kapanış kaydı sürecini destekler.

Kaçın:
- Hatasız ölçü, büzülmez, her vakada mükemmel sonuç deme.

──────────────────────────────
ÜRÜN GRUBU: Aljinat / Gelmak Pro / Alginomer Plus / Biokalgin Pro
Kategori: Ölçü Materyalleri / Aljinat
Ürün sayfaları:
- Gelmak Pro: https://dentechmedikal.com/gelmak-pro-453gr
- Alginomer Plus: https://dentechmedikal.com/alginomer-plus-453gr
- Biokalgin Pro: https://dentechmedikal.com/biokalgin-pro-453gr

Konumlandırma:
Günlük klinik ölçü ihtiyaçları, model ölçüsü, pedodonti/ortodonti gibi pratik ölçü senaryoları için aljinat seçenekleridir.

Faydalar:
- Günlük ölçü işlemlerinde pratik kullanım.
- 453 gr ambalaj seçeneği.
- Klinik ihtiyaca göre ürün seçimi.

Kaçın:
- Tozsuzdur, yırtılmaz, X saat stabil kalır gibi doğrulanmamış teknik iddialar.
`;

const SYSTEM = `Sen DENTech Medikal'in yapay zeka destekli müşteri asistanısın. Adın DEO AI.

# GÖREV
- Ziyaretçilere DENTech Medikal ürünleri, ürün sayfaları, teknik özellikler ve kullanım alanları hakkında hızlı, kısa ve doğru bilgi ver.
- Satın alma sürecinde kullanıcıyı sıkmadan yönlendir.
- Fiyat, sipariş, stok, demo, kampanya, garanti, arıza, iade, teknik servis veya insan temsilci isteğinde WhatsApp'a devret.
- Kullanıcı ürün sayfasına gitmek isterse ham link yazma; markdown link kullan: [Ürün sayfasına git](URL)

# FİRMA
DENTech Medikal | Dental ürünler ve klinik çözümler
Web: https://dentechmedikal.com
WhatsApp: ${WHATSAPP_URL}
Instagram: ${INSTAGRAM_URL}

# KAPALI SİSTEM / FİYAT KURALI
DENTech Medikal mevzuat gereği kapalı sistem olarak hizmet verir. Fiyat ve sipariş bilgisi, sağlık meslek mensubu doğrulaması sonrası paylaşılır. Kullanıcı fiyat sorarsa ürün fiyatı söyleme; WhatsApp'a yönlendir.

# KONUŞMA STİLİ
- Türkçe konuş; kullanıcı İngilizce yazarsa İngilizce yanıt ver.
- Kısa, net, profesyonel, yumuşak ve güven veren bir ton kullan.
- Maksimum 75 kelime yaz.
- Aynı cevabı tekrar etme. Kullanıcı aynı ürün adını tekrar yazarsa daha detaylı yönlendirme sorusu sor.
- Tek cevapta uzun ürün eğitimi verme.
- Aynı anda birden fazla soru sorma.
- Rakip ürün kötüleme.
- Tıbbi teşhis, tedavi planı veya kesin klinik sonuç önerme.

# KONU DIŞI SORULAR
- Selamlaşma ve nezaket mesajlarına doğal cevap ver; kaba şekilde reddetme.
- DENTech/dental ürünlerle ilgisiz sorularda kısa ve nazikçe kapsamı söyle; OpenAI'a gelmeden backend çoğunu filtreler.

# DEVRETME FORMATI
Fiyat ve sipariş bilgisi sağlık meslek mensubu doğrulaması sonrası paylaşılır.

📲 WhatsApp üzerinden ekibimize ulaşabilirsiniz:
${WHATSAPP_URL}

${PRODUCT_KB}
`;

export default async function handler(req) {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders(req) });
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: corsHeaders(req) });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid JSON", { status: 400, headers: corsHeaders(req) });
  }

  const { messages } = body;

  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response("messages array required", { status: 400, headers: corsHeaders(req) });
  }

  const cleanedMessages = sanitizeMessages(messages).slice(-14);
  const lastUserMessage = getLastUserMessage(cleanedMessages);
  const previousUserMessage = getPreviousUserMessage(cleanedMessages);

  if (!lastUserMessage) {
    return jsonReply("Size hangi ürün grubu için yardımcı olabilirim? Klinik cihazlar, pedodonti, ölçü sistemleri veya JOTA ürünleriyle ilerleyebiliriz.", req);
  }

  const direct = getDirectReply(lastUserMessage, previousUserMessage);
  if (direct) return jsonReply(direct, req);

  try {
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1-nano",
        max_tokens: 320,
        temperature: 0.28,
        presence_penalty: 0.25,
        frequency_penalty: 0.35,
        messages: [
          { role: "system", content: SYSTEM },
          ...cleanedMessages,
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
      headers: { "Content-Type": "application/json", ...corsHeaders(req) },
    });
  } catch (err) {
    console.error("Proxy error:", err);
    return new Response(JSON.stringify({ error: "server_error" }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders(req) },
    });
  }
}

function sanitizeMessages(messages) {
  return messages
    .filter(m => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .map(m => ({
      role: m.role,
      content: m.content.slice(0, 900),
    }));
}

function getLastUserMessage(messages) {
  return [...messages].reverse().find(m => m.role === "user")?.content?.trim() || "";
}

function getPreviousUserMessage(messages) {
  const users = messages.filter(m => m.role === "user");
  return users.length >= 2 ? users[users.length - 2].content.trim() : "";
}

function jsonReply(content, req) {
  return new Response(JSON.stringify({
    choices: [{ message: { role: "assistant", content } }],
  }), {
    status: 200,
    headers: { "Content-Type": "application/json", ...corsHeaders(req) },
  });
}

function getDirectReply(text, previousText = "") {
  const q = normalize(text);
  const prev = normalize(previousText);

  if (isGreetingOnly(q)) {
    return "Merhaba, teşekkür ederim. DEO AI olarak DENTech ürünleri hakkında yardımcı olabilirim.\n\nKlinik cihazlar, pedodonti, ölçü sistemleri veya JOTA ürünleriyle devam etmek ister misiniz?";
  }

  if (isCourtesyOnly(q)) {
    return "Haklısınız, nazik mesajınız için teşekkür ederim.\n\nDilerseniz ürün grubu üzerinden ilerleyelim: klinik cihazlar, pedodonti, ölçü sistemleri veya JOTA.";
  }

  const currentIntent = detectProductIntent(q);
  const previousIntent = detectProductIntent(prev);

  if (currentIntent && previousIntent === currentIntent && isShortProductRepeat(q)) {
    return repeatedProductReply(currentIntent);
  }

  if (isNavigationRequest(q)) {
    const intent = currentIntent || previousIntent;
    if (intent) return navigationReply(intent);
  }

  if (isOutOfScope(q)) {
    return "Bu konuda yardımcı olmam doğru olmaz; DEO AI yalnızca DENTech Medikal ürünleri, ürün sayfaları, sipariş süreci ve teknik ürün bilgilendirmesi için çalışır.\n\nİsterseniz bir ürün grubu seçerek devam edebiliriz.";
  }

  return null;
}

function repeatedProductReply(intent) {
  const replies = {
    jota: `JOTA için genel tanıtımı tekrar etmek yerine daha net ilerleyelim.\n\nŞu an diş hekimi tarafında Essential II kit odağıyla yardımcı olabilirim. Belirli figür mü soruyorsunuz, örn. 820F, yoksa işlem/materyal önerisi mi?\n[Ürün sayfasına git](${PRODUCT_LINKS.jota})`,
    hulaser: `HULASER K2 için aynı bilgiyi tekrarlamayayım.\n\nKlinik kullanım, teknik özellik, demo veya cihaz sayfası üzerinden mi ilerleyelim?\n[Ürün sayfasına git](${PRODUCT_LINKS.hulaser})`,
    rvg: `RVG için aynı genel cevabı tekrar etmeyeyim.\n\nGörüntü kalitesi, AI analiz, lisans/kurulum veya demo tarafında mı bilgi istersiniz?\n[Ürün sayfasına git](${PRODUCT_LINKS.rvg})`,
    jbtray: `JB Tray için genel tanıtımı tekrar etmeyeyim.\n\nFinal ölçü, kapanış kaydı, total protez workflow veya kullanım videosu tarafında mı ilerleyelim?\n[Ürün sayfasına git](${PRODUCT_LINKS.jbtray})`,
    icrown: `iCrown PÇK için set/refill, ölçü seçimi veya pedodonti uygulama avantajı tarafında mı bilgi istersiniz?\n[Ürün sayfasına git](${PRODUCT_LINKS.icrown})`,
    mirror: `Mirror Suction için bağlantı, kullanım alanı veya yedek ayna başlığı tarafında mı bilgi istersiniz?\n[Ürün sayfasına git](${PRODUCT_LINKS.mirror})`,
    smartsil: `SmartSil için Putty, Light Body veya Bite Registration seçeneklerinden hangisini incelemek istersiniz?\n[Putty sayfasına git](${PRODUCT_LINKS.putty})`,
    alginate: `Aljinat grubunda Gelmak Pro, Alginomer Plus ve Biokalgin Pro seçenekleri var. Hangi kullanım için bakıyorsunuz?\n[Alginomer sayfasına git](${PRODUCT_LINKS.alginomer})`,
  };
  return replies[intent] || null;
}

function navigationReply(intent) {
  const map = {
    jota: `[JOTA ürün sayfasına git](${PRODUCT_LINKS.jota})`,
    hulaser: `[HULASER K2 ürün sayfasına git](${PRODUCT_LINKS.hulaser})`,
    rvg: `[RVG ürün sayfasına git](${PRODUCT_LINKS.rvg})`,
    jbtray: `[JB Tray ürün sayfasına git](${PRODUCT_LINKS.jbtray})`,
    icrown: `[iCrown PÇK ürün sayfasına git](${PRODUCT_LINKS.icrown})`,
    mirror: `[Mirror Suction ürün sayfasına git](${PRODUCT_LINKS.mirror})`,
    smartsil: `[SmartSil Putty sayfasına git](${PRODUCT_LINKS.putty})\n[SmartSil Light Body sayfasına git](${PRODUCT_LINKS.lightbody})\n[SmartSil Bite sayfasına git](${PRODUCT_LINKS.bite})`,
    alginate: `[Alginomer Plus sayfasına git](${PRODUCT_LINKS.alginomer})\n[Biokalgin Pro sayfasına git](${PRODUCT_LINKS.biokalgin})\n[Gelmak Pro sayfasına git](${PRODUCT_LINKS.gelmak})`,
  };
  return map[intent] || null;
}

function detectProductIntent(q) {
  if (/(jota|frez|bur\b|burs|rotary|820f|850f|859f|z801l|z838l|z850|z818|karbit|carbide|diamond|elmas|zirkonya|polisher|polisaj)/.test(q)) return "jota";
  if (/(hulaser|k2|diyot lazer|diode laser|lazer|980\s?nm)/.test(q)) return "hulaser";
  if (/(rvg|xpect|xpectvision|sensör|sensor|intraoral|görüntüleme|goruntuleme|radyografi)/.test(q)) return "rvg";
  if (/(jb\s?tray|jb tray|final ölçü|final olcu|kapanış|kapanis|cr kaydı|cr kaydi|dikey boyut|border molding|total protez)/.test(q)) return "jbtray";
  if (/(icrown|i crown|pçk|pck|paslanmaz çelik kron|paslanmaz celik kron|çocuk kron|cocuk kron|süt azı|sut azi|pedodonti|kron)/.test(q)) return "icrown";
  if (/(mirror suction|mirror|suction|ayna|aspirasyon|emiş|emis)/.test(q)) return "mirror";
  if (/(smartsil|smart sil|putty|light body|bite registration|silikon ölçü|silikon olcu)/.test(q)) return "smartsil";
  if (/(aljinat|alginate|alginomer|biokalgin|gelmak|alginat)/.test(q)) return "alginate";
  return null;
}

function isShortProductRepeat(q) {
  return q.length <= 30 || /^(jota|hulaser|k2|rvg|jb tray|jb|icrown|pçk|pck|mirror|suction|smartsil|aljinat|alginate)$/.test(q);
}

function isNavigationRequest(q) {
  return /(git|gideyim|götür|gotur|yönlendir|yonlendir|sayfaya|ürün sayfası|urun sayfasi|link|aç|ac|tıkla|tikla)/.test(q);
}

function isGreetingOnly(q) {
  return /^(selam|selamlar|merhaba|mrb|slm|hey|iyi günler|iyi gunler|günaydın|gunaydin|naber|nasılsın|nasilsin|selam nasılsın|selam nasilsin)[.!?\s]*$/.test(q);
}

function isCourtesyOnly(q) {
  return /(kibarlık olsun|kibarlik olsun|teşekkür|tesekkur|sağ ol|sag ol|eyvallah|tamamdır|tamamdir)/.test(q) && q.length < 90;
}

function isOutOfScope(q) {
  if (detectProductIntent(q)) return false;
  if (isNavigationRequest(q)) return false;

  const allowed = [
    "dentech", "dentech medikal", "deo", "ürün", "urun", "sipariş", "siparis", "stok", "fiyat", "kampanya", "demo", "garanti", "teknik servis", "temsilci", "whatsapp", "instagram", "klinik", "hekim", "diş", "dis", "dental", "doktor", "muayenehane", "cihaz", "ölçü", "olcu", "materyal", "katalog", "sayfa", "link",
  ];
  if (allowed.some(k => q.includes(k))) return false;

  const blocked = [
    "hava durumu", "maç", "mac", "futbol", "siyaset", "borsa", "bitcoin", "kripto", "yemek", "tarif", "şiir", "siir", "hikaye", "film", "dizi", "magazin", "oyun", "tatil", "otel", "uçak", "ucak",
  ];
  if (blocked.some(k => q.includes(k))) return true;

  // Çok genel ve dental/ürün sinyali taşımayan kısa mesajları kapsam dışı say.
  return q.length < 45;
}

function normalize(text = "") {
  return text
    .toLowerCase()
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/\s+/g, " ")
    .trim();
}

function corsHeaders(req) {
  const origin = req.headers.get("origin") || "";
  const allowOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : "https://dentechmedikal.com";
  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}
