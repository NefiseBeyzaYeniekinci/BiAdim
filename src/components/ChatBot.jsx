import { useState, useRef, useEffect } from 'react';
import './ChatBot.css';

// ── Basit anahtar kelime tabanlı yerel cevaplar ──
// Gerçek AI entegrasyonu yapıldığında bu bölüm API çağrısıyla değiştirilecek.
const LOCAL_RESPONSES = [
  {
    keywords: ['merhaba', 'selam', 'hello', 'hi', 'naber', 'nasılsın'],
    reply: 'Merhaba! 👋 Ben BiAdım\'ın girişimcilik asistanıyım. Sana fikir geliştirme, yatırım alma, mentör bulma veya iş planı hakkında yardımcı olabilirim. Ne öğrenmek istersin?',
  },
  {
    keywords: ['iş planı', 'business plan', 'plan'],
    reply: '📋 **İş Planı Hazırlarken Temel Adımlar:**\n1. Pazar araştırması yapın\n2. Hedef kitleyi belirleyin\n3. Gelir modelini netleştirin\n4. Rekabet analizi yapın\n5. Finansal projeksiyonlar oluşturun\n\nBu konuların herhangi birini detaylı konuşmak ister misin?',
  },
  {
    keywords: ['yatırım', 'investor', 'fon', 'finans', 'para'],
    reply: '💰 **Türkiye\'deki Başlıca Yatırım Kaynakları:**\n• **Angel yatırımcılar** — erken aşama için idealdir\n• **VC fonlar** — büyüme aşaması girişimleri için\n• **KOSGEB destekleri** — hibe ve faizsiz kredi\n• **TÜBİTAK 1512** — teknoloji girişimleri için\n• **Crowdfunding platformları** — kitlesel fonlama\n\nBiAdım\'daki Yatırımcılar sayfasından detaylı bilgi alabilirsin!',
  },
  {
    keywords: ['mentör', 'mentor', 'rehber', 'danışman'],
    reply: '🎯 **İyi Bir Mentör Nasıl Bulunur?**\n• BiAdım\'daki mentörler arasından ilgi alanına göre filtrele\n• LinkedIn üzerinden sektörel topluluklara katıl\n• Startup etkinliklerine katıl\n• Mentörün geçmiş deneyimlerine bak\n\nBiAdım\'da 80+ aktif mentör sizi bekliyor!',
  },
  {
    keywords: ['fikir', 'idea', 'startup', 'girişim'],
    reply: '💡 **Girişim Fikri Doğrulama Adımları:**\n1. **Problem doğrula** — Gerçek bir acı noktası mı?\n2. **MVP oluştur** — En basit çalışan sürümü yap\n3. **İlk 10 müşteriyi bul** — Ödeme yapanları bul\n4. **Geri bildirim al** — Yinele, geliştir\n5. **Ölçekle** — Kanıtlanmış modeli büyüt\n\nHangi aşamadasın?',
  },
  {
    keywords: ['pazarlama', 'marketing', 'müşteri', 'satış'],
    reply: '📣 **Girişimler için Uygun Maliyetli Pazarlama:**\n• İçerik pazarlaması (blog, sosyal medya)\n• SEO ile organik trafik\n• Referral programları\n• Topluluk pazarlaması\n• Growth hacking teknikleri\n\nBütçen ve hedef kitlen hakkında daha fazla bilgi verirsen özelleştirilmiş tavsiye verebilirim!',
  },
  {
    keywords: ['şirket', 'kurmak', 'kuruluş', 'tescil', 'vergi'],
    reply: '🏢 **Türkiye\'de Şirket Kurma Süreci:**\n1. Şirket türünü seç (Ltd. Şti. en yaygın)\n2. Ticaret siciline başvur\n3. Vergi dairesi kaydı\n4. SGK bildirimi\n5. Banka hesabı aç\n\nOrtalama süre 3-7 iş günü, maliyet ≈ 5.000-15.000 TL arasında.',
  },
  {
    keywords: ['büyüme', 'scale', 'büyüt', 'genişle'],
    reply: '🚀 **Büyüme Stratejileri:**\n• **Product-led growth** — ürün kendiliğinden yayılsın\n• **Partnerships** — stratejik ortaklıklar\n• **Uluslararasılaşma** — yeni pazarlara aç\n• **Otomasyonla verimlilik artır**\n• **Ekip büyütme** — doğru insanları işe al\n\nŞu anki büyüme darboğazın ne?',
  },
];

const BOT_INTRO = {
  id: 'intro',
  role: 'bot',
  text: '👋 Merhaba! Ben **BiBot**, BiAdım\'ın girişimcilik asistanıyım.\n\nSana şu konularda yardımcı olabilirim:\n• 💡 İş fikri geliştirme\n• 💰 Yatırım & fon bulma\n• 🎯 Mentör seçimi\n• 📋 İş planı oluşturma\n• 📣 Pazarlama stratejileri\n\nSorunuzu yazın, başlayalım! 🚀',
  time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
};

const NOT_FOUND_REPLIES = [
  '🤔 Bu konuda şu an özel bilgim yok, ama yakında daha akıllı hale geleceğim! Girişimcilik, yatırım, mentörlük veya iş planı hakkında soru sorabilirsin.',
  '🔍 Hmm, bunu tam anlayamadım. Şu konularda uzmanım: yatırım, iş planı, mentör bulma, büyüme stratejileri. Başka nasıl yardımcı olabilirim?',
  '💭 Daha fazla bağlam verebilir misin? Girişimcilik yolculuğunun hangi aşamasındasın?',
];

function getBotReply(userText) {
  const lower = userText.toLowerCase();
  for (const item of LOCAL_RESPONSES) {
    if (item.keywords.some(kw => lower.includes(kw))) {
      return item.reply;
    }
  }
  return NOT_FOUND_REPLIES[Math.floor(Math.random() * NOT_FOUND_REPLIES.length)];
}

// Simple markdown-like renderer
function renderText(text) {
  return text
    .split('\n')
    .map((line, i) => {
      // Bold **text**
      const parts = line.split(/\*\*(.*?)\*\*/g);
      return (
        <span key={i}>
          {parts.map((part, j) => j % 2 === 1 ? <strong key={j}>{part}</strong> : part)}
          {i < text.split('\n').length - 1 && <br />}
        </span>
      );
    });
}

const SUGGESTED = [
  'İş planı nasıl yapılır?',
  'Yatırımcı nasıl bulunur?',
  'Mentör seçimi için ipuçları',
  'Şirket nasıl kurulur?',
];

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([BOT_INTRO]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(0);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open, typing]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 200);
      setUnread(0);
    }
  }, [open]);

  const sendMessage = async (text) => {
    const trimmed = (text || input).trim();
    if (!trimmed) return;

    const userMsg = {
      id: Date.now(),
      role: 'user',
      text: trimmed,
      time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    // Simulate AI thinking delay (replace with real API call later)
    await new Promise(r => setTimeout(r, 900 + Math.random() * 700));

    const reply = getBotReply(trimmed);
    const botMsg = {
      id: Date.now() + 1,
      role: 'bot',
      text: reply,
      time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
    };

    setTyping(false);
    setMessages(prev => [...prev, botMsg]);

    if (!open) setUnread(u => u + 1);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleClear = () => {
    setMessages([BOT_INTRO]);
    setUnread(0);
  };

  return (
    <>
      {/* Chat Window */}
      <div className={`chatbot-window ${open ? 'chatbot-window--open' : ''}`} role="dialog" aria-label="BiBot Girişimcilik Asistanı">
        {/* Header */}
        <div className="chatbot-header">
          <div className="chatbot-header-left">
            <div className="chatbot-avatar-sm">
              <span>🤖</span>
              <div className="chatbot-online-dot" />
            </div>
            <div>
              <p className="chatbot-name">BiBot</p>
              <p className="chatbot-status">Girişimcilik Asistanı</p>
            </div>
          </div>
          <div className="chatbot-header-actions">
            <button className="chatbot-header-btn" onClick={handleClear} title="Sohbeti temizle">🗑</button>
            <button className="chatbot-header-btn chatbot-close-btn" onClick={() => setOpen(false)} title="Kapat">✕</button>
          </div>
        </div>

        {/* Messages */}
        <div className="chatbot-messages" aria-live="polite">
          {messages.map(msg => (
            <div key={msg.id} className={`chatbot-msg chatbot-msg--${msg.role}`}>
              {msg.role === 'bot' && (
                <div className="chatbot-bot-icon">🤖</div>
              )}
              <div className="chatbot-bubble">
                <div className="chatbot-bubble-text">{renderText(msg.text)}</div>
                <span className="chatbot-time">{msg.time}</span>
              </div>
            </div>
          ))}

          {typing && (
            <div className="chatbot-msg chatbot-msg--bot">
              <div className="chatbot-bot-icon">🤖</div>
              <div className="chatbot-bubble chatbot-bubble--typing">
                <span /><span /><span />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions — always visible */}
        <div className="chatbot-suggestions">
          {SUGGESTED.map(q => (
            <button key={q} className="chatbot-suggestion-btn" onClick={() => sendMessage(q)} disabled={typing}>
              {q}
            </button>
          ))}
        </div>

        {/* AI Disclaimer */}
        <div className="chatbot-disclaimer">
          🧪 AI eğitimi devam ediyor — cevaplar yakında kişiselleşecek
        </div>

        {/* Input */}
        <div className="chatbot-input-area">
          <textarea
            ref={inputRef}
            className="chatbot-input"
            placeholder="Girişimcilik hakkında bir şey sor..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            id="chatbot-input"
          />
          <button
            className="chatbot-send-btn"
            onClick={() => sendMessage()}
            disabled={!input.trim() || typing}
            title="Gönder (Enter)"
          >
            {typing ? '⏳' : '➤'}
          </button>
        </div>
      </div>

      {/* Floating Toggle Button */}
      <button
        className={`chatbot-fab ${open ? 'chatbot-fab--open' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-label="BiBot Aç"
        id="chatbot-fab"
      >
        {open ? '✕' : '🤖'}
        {!open && unread > 0 && (
          <span className="chatbot-unread">{unread}</span>
        )}
        {!open && (
          <span className="chatbot-fab-label">BiBot</span>
        )}
      </button>
    </>
  );
};

export default ChatBot;
