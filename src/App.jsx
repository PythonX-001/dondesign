import React, { useState, useEffect, useRef } from 'react';
// You need to install this package: npm install @emailjs/browser
import emailjs from '@emailjs/browser'; 
import { 
  Palette, 
  Calendar, 
  Mic, 
  StopCircle, 
  Play, 
  Check, 
  Menu, 
  X, 
  Globe, 
  LogOut, 
  User, 
  Image as ImageIcon,
  Send,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Shield,
  Trash2,
  Mail,
  Server
} from 'lucide-react';

// --- Translations ---
const translations = {
  en: {
    title: "Don Design",
    subtitle: "Bringing your stories to visual life.",
    login: "Login",
    signup: "Sign Up",
    logout: "Logout",
    adminPanel: "Admin Panel",
    welcome: "Welcome",
    bookNow: "Book a Cover",
    portfolio: "Portfolio",
    about: "About",
    heroText: "Exclusive Cover Design Services",
    heroSub: "High demand, premium quality. Reserve your spot on my calendar.",
    email: "Email Address",
    password: "Password",
    name: "Full Name",
    haveAccount: "Already have an account?",
    noAccount: "Don't have an account?",
    calendarTitle: "Availability Calendar",
    booked: "Booked by",
    free: "Available",
    reservationForm: "New Reservation",
    descriptionPlaceholder: "Describe your vision, genre, and key elements...",
    voiceNote: "Or record a voice message:",
    startRec: "Start Recording",
    stopRec: "Stop Recording",
    playRec: "Play Preview",
    submit: "Submit Request",
    submitting: "Sending...",
    successTitle: "Request Received!",
    successMsg: "I have received your request. You will receive a confirmation email shortly.",
    close: "Close",
    selectDate: "Select a date on the calendar first.",
    contactMethod: "Preferred way to communicate (WhatsApp, Phone, etc.)",
    authError: "Invalid credentials. (Try admin@studio.com / admin123)",
    copyright: "© 2024 PythonX. All rights reserved.",
    recording: "Recording...",
    micPermission: "Microphone access is required.",
    loginToBook: "Please login to view availability and book.",
    adminHeader: "Booking Management",
    noBookings: "No bookings found.",
    status: "Status",
    pending: "Pending",
    approved: "Approved",
    delete: "Delete",
    serverError: "Could not connect to server. Ensure 'node api/index.js' is running."
  },
  fr: {
    title: "Don Design",
    subtitle: "Donner vie à vos histoires.",
    login: "Connexion",
    signup: "S'inscrire",
    logout: "Déconnexion",
    adminPanel: "Panneau Admin",
    welcome: "Bienvenue",
    bookNow: "Réserver",
    portfolio: "Portfolio",
    about: "À propos",
    heroText: "Services de Design de Couverture",
    heroSub: "Forte demande, qualité premium. Réservez votre place.",
    email: "Adresse Email",
    password: "Mot de passe",
    name: "Nom complet",
    haveAccount: "Déjà un compte ?",
    noAccount: "Pas de compte ?",
    calendarTitle: "Calendrier des disponibilités",
    booked: "Réservé par",
    free: "Disponible",
    reservationForm: "Nouvelle Réservation",
    descriptionPlaceholder: "Décrivez votre vision, le genre et les éléments clés...",
    voiceNote: "Ou enregistrez un message vocal :",
    startRec: "Commencer",
    stopRec: "Arrêter",
    playRec: "Écouter",
    submit: "Envoyer la demande",
    submitting: "Envoi...",
    successTitle: "Demande Reçue !",
    successMsg: "J'ai bien reçu votre demande. Un email de confirmation vous sera envoyé.",
    close: "Fermer",
    selectDate: "Sélectionnez d'abord une date sur le calendrier.",
    contactMethod: "Moyen de communication préféré (WhatsApp, Tél, etc.)",
    authError: "Identifiants invalides.",
    copyright: "© 2024 PythonX. Tous droits réservés.",
    recording: "Enregistrement...",
    micPermission: "L'accès au micro est requis.",
    loginToBook: "Veuillez vous connecter pour réserver.",
    adminHeader: "Gestion des Réservations",
    noBookings: "Aucune réservation trouvée.",
    status: "Statut",
    pending: "En attente",
    approved: "Approuvé",
    delete: "Supprimer",
    serverError: "Impossible de se connecter au serveur. Vérifiez que 'node api/index.js' est lancé."
  },
  ar: {
    title: "Don Design",
    subtitle: "نعطي قصصك شكلاً وحياة.",
    login: "دخول",
    signup: "تسجيل جديد",
    logout: "خروج",
    adminPanel: "لوحة التحكم",
    welcome: "مرحباً",
    bookNow: "احجز غلافك",
    portfolio: "المعرض",
    about: "من أنا",
    heroText: "خدمات تصميم أغلفة احترافية",
    heroSub: "طلب عالٍ، جودة ممتازة. احجز مكانك في التقويم الآن.",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    name: "الاسم الكامل",
    haveAccount: "لديك حساب بالفعل؟",
    noAccount: "ليس لديك حساب؟",
    calendarTitle: "تقويم الحجوزات",
    booked: "محجوز لـ",
    free: "متاح",
    reservationForm: "طلب حجز جديد",
    descriptionPlaceholder: "صف رؤيتك، نوع الكتاب، والعناصر الأساسية...",
    voiceNote: "أو سجل رسالة صوتية:",
    startRec: "بدء التسجيل",
    stopRec: "إيقاف",
    playRec: "استماع",
    submit: "إرسال الطلب",
    submitting: "جاري الإرسال...",
    successTitle: "تم استلام الطلب!",
    successMsg: "لقد استلمت طلبك. سيتم إرسال رسالة تأكيد قريباً.",
    close: "إغلاق",
    selectDate: "يرجى اختيار تاريخ من التقويم أولاً.",
    contactMethod: "طريقة التواصل المفضلة (واتساب، هاتف، إلخ)",
    authError: "بيانات الدخول غير صحيحة.",
    copyright: "© 2024 PythonX . جميع الحقوق محفوظة.",
    recording: "جاري التسجيل...",
    micPermission: "مطلوب السماح باستخدام الميكروفون.",
    loginToBook: "يرجى تسجيل الدخول للحجز.",
    adminHeader: "إدارة الحجوزات",
    noBookings: "لا توجد حجوزات.",
    status: "الحالة",
    pending: "قيد الانتظار",
    approved: "مقبول",
    delete: "حذف",
    serverError: "تعذر الاتصال بالخادم. تأكد من تشغيل 'node api/index.js'."
  }
};

// --- Components ---

const Button = ({ children, onClick, variant = 'primary', className = '', disabled = false, type = 'button' }) => {
  const baseStyle = "px-6 py-2 rounded-lg font-medium transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-purple-500/30",
    secondary: "bg-gray-800 text-white border border-gray-700 hover:bg-gray-700",
    outline: "border-2 border-purple-500 text-purple-400 hover:bg-purple-500/10",
    danger: "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20"
  };

  return (
    <button 
      type={type}
      onClick={onClick} 
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </button>
  );
};

const LanguageSwitcher = ({ current, setLang }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative z-50">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
      >
        <Globe size={18} />
        <span className="uppercase">{current}</span>
      </button>
      
      {isOpen && (
        <div className="absolute top-8 right-0 bg-gray-900 border border-gray-700 rounded-md shadow-xl p-2 min-w-[100px] flex flex-col gap-1">
          {['en', 'fr', 'ar'].map(lang => (
            <button
              key={lang}
              onClick={() => { setLang(lang); setIsOpen(false); }}
              className={`text-left px-3 py-1 rounded hover:bg-gray-800 ${current === lang ? 'text-purple-400 font-bold' : 'text-gray-400'}`}
            >
              {lang === 'en' ? 'English' : lang === 'fr' ? 'Français' : 'العربية'}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// --- Main App Component ---

export default function App() {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('coverStudio_user');
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  });

  const [bookings, setBookings] = useState([]);
  const [lang, setLang] = useState('en');
  const [view, setView] = useState('landing'); 
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);
  
  // New State for Mobile Menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Load language settings on mount
  useEffect(() => {
    const browserLang = navigator.language.split('-')[0];
    if (['ar', 'fr'].includes(browserLang)) setLang(browserLang);
    fetchBookings();
  }, []);

  // Persist user state automatically (Session only)
  useEffect(() => {
    if (user) {
      localStorage.setItem('coverStudio_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('coverStudio_user');
    }
  }, [user]);

  // --- API Functions (Talk to server.js) ---

  const fetchBookings = async () => {
    try {
        const res = await fetch('/api/bookings');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setBookings(data);
        setServerError(false);
    } catch (err) {
        console.error("Server Error:", err);
        setServerError(true);
    }
  };

  const addBooking = async (bookingData) => {
    try {
        const newBooking = { id: Date.now().toString(), ...bookingData };
        
        const res = await fetch('/api/bookings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newBooking)
        });

        if (!res.ok) throw new Error('Failed to save');
        
        // Update UI
        await fetchBookings(); 
        return newBooking;
    } catch (err) {
        console.error(err);
        alert("Failed to connect to server.");
    }
  };

  const deleteBooking = async (id) => {
    try {
        const res = await fetch(`/api/bookings/${id}`, {
            method: 'DELETE'
        });
        if (!res.ok) throw new Error('Failed to delete');
        
        // Update UI
        setBookings(prev => prev.filter(b => b.id !== id));
    } catch (err) {
        console.error(err);
        alert("Failed to delete from server.");
    }
  };

  // Auth Functions
  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'admin@studio.com' && password === 'admin123') {
          const adminUser = { uid: 'admin-001', email, displayName: 'Admin User', isAdmin: true };
          setUser(adminUser);
          resolve(adminUser);
        } else if (password.length >= 6) {
          const normalUser = { uid: `user-${Date.now()}`, email, displayName: email.split('@')[0], isAdmin: false };
          setUser(normalUser);
          resolve(normalUser);
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 800);
    });
  };

  const signup = (email, name, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = { uid: `user-${Date.now()}`, email, displayName: name, isAdmin: false };
        setUser(newUser);
        resolve(newUser);
      }, 800);
    });
  };

  const logout = () => {
    setUser(null);
    setView('landing');
  };

  const dir = lang === 'ar' ? 'rtl' : 'ltr';
  const t = translations[lang];

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-purple-500"><Loader2 className="animate-spin" size={48}/></div>;

  return (
    <div className={`min-h-screen bg-black text-gray-100 font-sans selection:bg-purple-500 selection:text-white`} dir={dir}>
      {/* Server Error Banner */}
      {serverError && (
          <div className="bg-red-900/80 text-white text-center text-sm py-2 px-4 fixed top-0 w-full z-50 animate-pulse flex items-center justify-center gap-2">
              <Server size={16} /> {t.serverError}
          </div>
      )}

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-40 bg-black/80 backdrop-blur-md border-b border-gray-800 ${serverError ? 'mt-8' : ''} transition-all`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setView('landing'); setIsMobileMenuOpen(false); }}>
              <Palette className="text-purple-500" />
              <span className="font-bold text-xl tracking-tight">{t.title}</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {user ? (
                <>
                   {user.isAdmin && (
                     <button onClick={() => setView('admin')} className="text-yellow-500 flex items-center gap-2 hover:text-yellow-400 font-medium">
                        <Shield size={16} /> {t.adminPanel}
                     </button>
                   )}
                   <button onClick={() => setView('dashboard')} className="hover:text-purple-400">
                     {t.bookNow}
                   </button>
                   <span className="text-gray-400 text-sm flex items-center gap-2 border-l border-gray-700 pl-4 ml-4">
                    <User size={14}/> {user.displayName}
                   </span>
                   <Button variant="outline" onClick={logout} className="!py-1 !px-4 text-sm">
                     {t.logout}
                   </Button>
                </>
              ) : (
                <button onClick={() => setView('login')} className="text-sm font-medium hover:text-purple-400 transition-colors">
                  {t.login}
                </button>
              )}
              <LanguageSwitcher current={lang} setLang={setLang} />
            </div>

            {/* Mobile Menu Toggle (Hamburger) */}
            <div className="md:hidden flex items-center gap-4">
              <LanguageSwitcher current={lang} setLang={setLang} />
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                className="text-gray-300 hover:text-white p-2"
              >
                 {isMobileMenuOpen ? <X size={24}/> : <Menu size={24}/>}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown Panel */}
        {isMobileMenuOpen && (
           <div className="md:hidden bg-gray-900 border-b border-gray-800 animate-in slide-in-from-top-5 duration-200">
             <div className="px-4 pt-2 pb-6 space-y-4 flex flex-col">
                {user ? (
                <>
                   {user.isAdmin && (
                     <button onClick={() => { setView('admin'); setIsMobileMenuOpen(false); }} className="text-yellow-500 flex items-center gap-2 hover:text-yellow-400 font-medium py-2">
                        <Shield size={16} /> {t.adminPanel}
                     </button>
                   )}
                   <button onClick={() => { setView('dashboard'); setIsMobileMenuOpen(false); }} className="text-left hover:text-purple-400 text-gray-200 py-2 font-medium border-b border-gray-800">
                     {t.bookNow}
                   </button>
                   <div className="flex items-center justify-between pt-2">
                       <span className="text-gray-400 text-sm flex items-center gap-2">
                        <User size={14}/> {user.displayName}
                       </span>
                       <Button variant="outline" onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="!py-1 !px-4 text-xs">
                         {t.logout}
                       </Button>
                   </div>
                </>
              ) : (
                <>
                  <button onClick={() => { setView('login'); setIsMobileMenuOpen(false); }} className="text-left font-medium text-white hover:text-purple-400 py-2 border-b border-gray-800">
                    {t.login}
                  </button>
                   <button onClick={() => { setView('signup'); setIsMobileMenuOpen(false); }} className="text-left text-gray-400 hover:text-white py-2">
                    {t.signup}
                  </button>
                </>
              )}
             </div>
           </div>
        )}
      </nav>

      {/* Main Content Area */}
      <main className={`pt-20 pb-12 px-4 sm:px-6 ${serverError ? 'mt-8' : ''}`}>
        {view === 'landing' && (
          <LandingPage t={t} setView={setView} user={user} lang={lang} />
        )}
        
        {(view === 'login' || view === 'signup') && (
          <AuthPage t={t} view={view} setView={setView} login={login} signup={signup} />
        )}

        {view === 'dashboard' && user && (
          <Dashboard t={t} user={user} bookings={bookings} addBooking={addBooking} lang={lang} />
        )}

        {view === 'admin' && user?.isAdmin && (
           <AdminPanel t={t} bookings={bookings} deleteBooking={deleteBooking} lang={lang} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 text-center text-gray-500 text-sm">
        <p>{t.copyright}</p>
      </footer>
    </div>
  );
}

// --- Sub-Components ---

const LandingPage = ({ t, setView, user, lang }) => {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="min-h-[80vh] flex flex-col items-center justify-center text-center gap-6 relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-purple-600/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px]"></div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-white via-gray-200 to-gray-500 z-10 leading-tight py-2">
          {t.heroText}
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 max-w-2xl z-10 font-light">
          {t.heroSub}
        </p>
        
        <div className="mt-8 z-10">
          <Button onClick={() => setView(user ? 'dashboard' : 'login')} className="text-lg px-8 py-4 shadow-purple-500/20 shadow-2xl">
            {t.bookNow} <ChevronRight size={20} className={lang === 'ar' ? 'rotate-180' : ''} />
          </Button>
        </div>
      </section>

      {/* Artistic Portfolio Grid */}
      <section className="py-20">
        <div className="flex items-center gap-4 mb-12">
           <div className="h-px bg-gray-800 flex-1"></div>
           <h2 className="text-2xl font-bold uppercase tracking-widest text-gray-500">{t.portfolio}</h2>
           <div className="h-px bg-gray-800 flex-1"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {/* Mock Portfolio Items */}
           {[1, 2, 3, 4, 5, 6].map((item) => (
             <div key={item} className="group relative aspect-[2/3] bg-gray-900 rounded-xl overflow-hidden border border-gray-800 transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-900/20">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 z-10"></div>
                {/* Abstract CSS Art for Placeholders */}
                <div className={`w-full h-full opacity-50 ${item % 2 === 0 ? 'bg-indigo-900' : 'bg-purple-900'} flex items-center justify-center`}>
                    <ImageIcon size={48} className="text-white/20" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <h3 className="text-white font-bold text-lg">Project Alpha {item}</h3>
                  <p className="text-gray-400 text-sm">Fantasy / Sci-Fi</p>
                </div>
             </div>
           ))}
        </div>
      </section>
    </div>
  );
};

const AuthPage = ({ t, view, setView, login, signup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (view === 'signup') {
        await signup(email, name, password);
      } else {
        await login(email, password);
      }
      setView('dashboard'); // Redirect to dashboard on success
    } catch (err) {
      console.error(err);
      setError(t.authError);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-md mx-auto">
      <div className="w-full bg-gray-900/50 border border-gray-800 p-8 rounded-2xl shadow-xl backdrop-blur-sm">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">{view === 'login' ? t.login : t.signup}</h2>
        
        {error && <div className="mb-4 p-3 bg-red-900/20 border border-red-800 text-red-200 text-sm rounded">{error}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {view === 'signup' && (
             <div>
               <label className="block text-sm text-gray-400 mb-1">{t.name}</label>
               <input 
                 type="text" 
                 required
                 className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none transition-colors"
                 value={name}
                 onChange={e => setName(e.target.value)}
               />
             </div>
          )}
          
          <div>
            <label className="block text-sm text-gray-400 mb-1">{t.email}</label>
            <input 
              type="email" 
              required
              className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none transition-colors"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">{t.password}</label>
            <input 
              type="password" 
              required
              className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none transition-colors"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <Button type="submit" disabled={loading} className="mt-4 w-full">
             {loading ? <Loader2 className="animate-spin"/> : (view === 'login' ? t.login : t.signup)}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button 
            onClick={() => setView(view === 'login' ? 'signup' : 'login')}
            className="text-gray-400 hover:text-purple-400 text-sm transition-colors"
          >
            {view === 'login' ? t.noAccount : t.haveAccount}
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Dashboard & Calendar Logic ---

const Dashboard = ({ t, user, bookings, addBooking, lang }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Col: Calendar */}
      <div className="lg:col-span-2 space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Calendar className="text-purple-500" /> {t.calendarTitle}
        </h2>
        <CalendarView 
          bookings={bookings} 
          onSelectDate={setSelectedDate} 
          selectedDate={selectedDate}
          t={t}
          lang={lang}
        />
      </div>

      {/* Right Col: Reservation Form */}
      <div className="lg:col-span-1">
        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 sticky top-24">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Palette className="text-purple-400" size={20} />
            {t.reservationForm}
          </h3>
          
          {selectedDate ? (
            <div className="mb-4 text-purple-300 text-sm font-medium p-2 bg-purple-900/20 rounded border border-purple-500/30">
              Selected: {selectedDate}
            </div>
          ) : (
             <div className="mb-4 text-yellow-500/80 text-sm p-2 bg-yellow-900/10 rounded border border-yellow-700/30">
              {t.selectDate}
             </div>
          )}

          <ReservationForm 
            t={t} 
            user={user} 
            selectedDate={selectedDate} 
            addBooking={addBooking}
            onSuccess={() => {
              setShowSuccess(true);
              setSelectedDate(null);
            }} 
          />
        </div>
      </div>

      {/* Success Popup */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-gray-900 border border-purple-500 rounded-2xl p-8 max-w-sm w-full text-center relative shadow-2xl shadow-purple-900/40">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="text-white" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{t.successTitle}</h3>
            <p className="text-gray-400 mb-6">{t.successMsg}</p>
            <Button onClick={() => setShowSuccess(false)} className="w-full">
              {t.close}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

const CalendarView = ({ bookings, onSelectDate, selectedDate, t, lang }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const monthNames = lang === 'ar' 
    ? ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"]
    : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
  const weekDays = lang === 'ar' 
    ? ['أحد', 'إثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت']
    : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <button onClick={handlePrevMonth} className="p-2 hover:bg-gray-800 rounded-full text-gray-400 hover:text-white transition-colors">
          <ChevronLeft className={lang === 'ar' ? 'rotate-180' : ''} />
        </button>
        <h3 className="text-xl font-bold text-white">
          {monthNames[month]} {year}
        </h3>
        <button onClick={handleNextMonth} className="p-2 hover:bg-gray-800 rounded-full text-gray-400 hover:text-white transition-colors">
          <ChevronRight className={lang === 'ar' ? 'rotate-180' : ''} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 md:gap-4 mb-2">
        {weekDays.map(day => (
          <div key={day} className="text-center text-gray-500 text-xs uppercase tracking-wider font-semibold">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2 md:gap-4">
        {days.map((day, index) => {
          if (!day) return <div key={`empty-${index}`} className="aspect-square"></div>;

          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          
          // Find booking
          const booking = bookings.find(b => b.date === dateStr);
          const isSelected = selectedDate === dateStr;
          const isPast = new Date(dateStr) < new Date().setHours(0,0,0,0);

          return (
            <div 
              key={day}
              onClick={() => {
                if (!booking && !isPast) onSelectDate(dateStr);
              }}
              className={`
                aspect-square rounded-lg border flex flex-col items-center justify-between p-1 md:p-2 transition-all cursor-pointer relative overflow-hidden
                ${booking 
                  ? 'bg-gray-900 border-gray-800 opacity-70 cursor-not-allowed' // Booked
                  : isSelected 
                    ? 'bg-purple-600 border-purple-500 shadow-lg shadow-purple-500/20 text-white scale-105 z-10' // Selected
                    : isPast
                      ? 'bg-transparent border-gray-800 text-gray-600 cursor-not-allowed' // Past
                      : 'bg-black border-gray-800 hover:border-purple-500/50 hover:bg-gray-900' // Available
                }
              `}
            >
              <span className={`text-sm font-bold ${booking ? 'text-gray-500' : ''}`}>{day}</span>
              {booking && (
                <div className="w-full text-[10px] md:text-xs text-center truncate px-1 py-0.5 bg-gray-800 rounded text-gray-400">
                  {booking.userName.split(' ')[0]}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ReservationForm = ({ t, user, selectedDate, onSuccess, addBooking }) => {
  const [desc, setDesc] = useState('');
  const [contactMethod, setContactMethod] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [hasAudio, setHasAudio] = useState(false);
  const [audioBase64, setAudioBase64] = useState(null); // Stores audio as text
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef(null);

  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => setRecordingTime(prev => prev + 1), 1000);
    } else {
      setRecordingTime(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      const chunks = [];

      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' }); // webm is more compatible
        
        const reader = new FileReader();
        reader.readAsDataURL(blob); 
        reader.onloadend = () => {
            const base64data = reader.result;
            // No limit check here because we are using a real server now!
            setAudioBase64(base64data);
            setHasAudio(true);
        };
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error(err);
      alert(t.micPermission);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDate || !user) return;
    
    setIsSubmitting(true);

    const bookingData = {
        date: selectedDate,
        userId: user.uid,
        userName: user.displayName || 'Anonymous',
        userEmail: user.email,
        contactMethod: contactMethod,
        description: desc,
        hasAudioNote: hasAudio,
        audioData: audioBase64,
        createdAt: new Date().toISOString(),
        status: 'pending'
    };

    // --- EMAILJS CONFIGURATION ---
    // Uncomment and fill in details
    
 
    const serviceID = 'service_wfk4rq4';
    const templateID = 'template_72qy6xr';
    const publicKey = 'HkV8KWJJ-JMuCxJ_O';

    const templateParams = {
        name: user.displayName || 'Anonymous Client',
        time: new Date().toLocaleString(),
        message: `
New Booking Request Details:
----------------------------
Date Requested: ${selectedDate}
Contact Method: ${contactMethod}
Email: ${user.email}

Description:
${desc}
        `
    };

    try {
        await emailjs.send(serviceID, templateID, templateParams, publicKey);
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Email failed:", error);
    }


    // Real API call
    await addBooking(bookingData);
    
    setDesc('');
    setContactMethod('');
    setHasAudio(false);
    setAudioBase64(null);
    setIsSubmitting(false);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="block text-sm text-gray-400 mb-1">{t.contactMethod}</label>
        <input 
          type="text" 
          required
          value={contactMethod}
          onChange={(e) => setContactMethod(e.target.value)}
          className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none transition-colors"
          disabled={!selectedDate || isSubmitting}
        />
      </div>

      <div>
        <textarea
          required={!hasAudio}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder={t.descriptionPlaceholder}
          className="w-full h-32 bg-black border border-gray-700 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none resize-none transition-colors"
          disabled={!selectedDate || isSubmitting}
        ></textarea>
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-2">{t.voiceNote}</label>
        
        {!hasAudio ? (
          <button
            type="button"
            onClick={isRecording ? stopRecording : startRecording}
            disabled={!selectedDate || isSubmitting}
            className={`w-full py-3 rounded-lg border border-dashed flex items-center justify-center gap-2 transition-all ${
              isRecording 
                ? 'bg-red-900/20 border-red-500 text-red-400 animate-pulse' 
                : 'border-gray-700 text-gray-400 hover:border-purple-500 hover:text-purple-400'
            }`}
          >
            {isRecording ? (
              <>
                <StopCircle size={20} /> {t.stopRec} ({recordingTime}s)
              </>
            ) : (
              <>
                <Mic size={20} /> {t.startRec}
              </>
            )}
          </button>
        ) : (
          <div className="flex items-center justify-between bg-gray-800 p-3 rounded-lg border border-gray-700">
             <div className="flex items-center gap-2 text-purple-400">
               <Check size={18} />
               <span className="text-sm">Audio Recorded</span>
             </div>
             <button 
                type="button" 
                onClick={() => { setHasAudio(false); setAudioBase64(null); }}
                className="text-gray-500 hover:text-white"
             >
               <X size={18} />
             </button>
          </div>
        )}
      </div>

      <Button 
        type="submit" 
        disabled={!selectedDate || isSubmitting || (!desc && !hasAudio)}
        className="w-full mt-2"
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2"><Loader2 className="animate-spin" size={18}/> {t.submitting}</span>
        ) : (
          <span className="flex items-center gap-2"><Send size={18}/> {t.submit}</span>
        )}
      </Button>
    </form>
  );
};

// --- Admin Panel Component ---

const AdminPanel = ({ t, bookings, deleteBooking, lang }) => {
    // Sort bookings by date descending (newest first)
    const sortedBookings = [...bookings].sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold flex items-center gap-3">
                    <Shield className="text-yellow-500" /> 
                    {t.adminHeader}
                </h2>
                <div className="bg-gray-900 px-4 py-2 rounded-lg border border-gray-800 text-sm text-gray-400">
                    Total: <span className="text-white font-bold">{bookings.length}</span>
                </div>
            </div>

            {sortedBookings.length === 0 ? (
                <div className="text-center py-20 bg-gray-900/30 border border-gray-800 rounded-xl">
                    <p className="text-gray-500 text-lg">{t.noBookings}</p>
                </div>
            ) : (
                <div className="overflow-x-auto rounded-xl border border-gray-800">
                    <table className="w-full text-left text-sm text-gray-400">
                        <thead className="bg-gray-900 text-gray-200 uppercase font-bold">
                            <tr>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Client</th>
                                <th className="px-6 py-4">Contact Info</th>
                                <th className="px-6 py-4">Description</th>
                                <th className="px-6 py-4">Audio</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800 bg-black">
                            {sortedBookings.map((booking) => (
                                <tr key={booking.id} className="hover:bg-gray-900/50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-white whitespace-nowrap">
                                        {booking.date}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-white">{booking.userName}</div>
                                        <div className="text-xs text-gray-500">{booking.userEmail}</div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-300">
                                        {booking.contactMethod || "—"}
                                    </td>
                                    <td className="px-6 py-4 max-w-xs truncate" title={booking.description}>
                                        {booking.description || "—"}
                                    </td>
                                    <td className="px-6 py-4">
                                        {booking.audioData ? (
                                            <audio controls src={booking.audioData} className="w-40 h-8" />
                                        ) : booking.hasAudioNote ? (
                                            <span className="text-red-400 text-xs">Audio Missing (Format Error)</span>
                                        ) : (
                                            <span className="text-gray-600">—</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            {/* Simulated Email Notification Indicator */}
                                            <div className="group relative">
                                                <button className="p-2 hover:bg-green-900/20 text-green-700 rounded-lg cursor-default">
                                                    <Mail size={16} />
                                                </button>
                                                <span className="absolute bottom-full mb-2 right-0 w-32 bg-gray-800 text-xs p-2 rounded hidden group-hover:block">
                                                    Email notification sent (simulated)
                                                </span>
                                            </div>

                                            <button 
                                                onClick={() => deleteBooking(booking.id)}
                                                className="p-2 hover:bg-red-900/20 text-gray-500 hover:text-red-500 rounded-lg transition-colors"
                                                title={t.delete}
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};