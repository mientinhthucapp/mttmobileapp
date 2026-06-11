/* global React, ReactDOM, IOSDevice, LanguageProvider, useI18n,
   SplashScreen, WelcomeScreen, SignupChooserScreen, LoginScreen, SignupEmailScreen,
   ForgotPasswordScreen, OnboardingScreen, LanguageOnboardingScreen,
   HomeScreen, EventsScreen, EventDetailsScreen, RegisterEventScreen,
   ConfirmationScreen, EventQRScreen, MyEventsScreen,
   TalksLibraryScreen, ContentListScreen, ContentDetailsScreen,
   SavedContentScreen, PlaylistsScreen, PlaylistDetailsScreen,
   NotificationsScreen, NotificationDetailsScreen, NotificationSettingsScreen,
   MoreScreen, ContactScreen, ProfileScreen, ViewProfileScreen, EditProfileScreen,
   SettingsScreen, PrivacyScreen, SupportScreen, AboutScreen, CheckinScreen */

const { useState } = React;

// Screen keys organized by flow — labels come from the i18n dictionary (proto.*)
const FLOWS = [
  { titleKey: 'proto.flows.auth',  screens: ['langSelect', 'splash', 'welcome', 'signup', 'signupEmail', 'login', 'forgot', 'onboarding'] },
  { titleKey: 'proto.flows.home',  screens: ['home', 'events', 'eventDetails', 'register', 'confirmation', 'qrCode', 'myEvents'] },
  { titleKey: 'proto.flows.talks', screens: ['talks', 'contentList', 'contentDetails', 'saved', 'playlists', 'playlistDetails'] },
  { titleKey: 'proto.flows.notif', screens: ['notif', 'notifDetails', 'notifSettings'] },
  { titleKey: 'proto.flows.more',  screens: ['more', 'checkin', 'contact', 'profile', 'viewProfile', 'editProfile', 'settings', 'privacy', 'support', 'about'] },
];

function App() {
  // First launch (no saved choice) starts on the language screen; returning
  // users go straight to the splash. `onboarded` is read synchronously, so the
  // correct starting screen is chosen on the first render (no flash).
  const { onboarded, completeLangOnboarding } = useI18n();
  const [screen, setScreen] = useState(onboarded ? 'splash' : 'langSelect');
  const [openCategory, setOpenCategory] = useState(null);
  const [openContent, setOpenContent] = useState(null);
  const [openPlaylist, setOpenPlaylist] = useState(null);
  const [openNotif, setOpenNotif] = useState(null);

  const go = s => () => setScreen(s);
  const onNavigate = (tab) => {
    if (tab === 'home') setScreen('home');
    else if (tab === 'events') setScreen('events');
    else if (tab === 'talks') setScreen('talks');
    else if (tab === 'more') setScreen('more');
    else setScreen(tab);
  };

  // Common nav handlers
  const onProfile = go('profile');
  const onNotifications = go('notif');

  let content;
  switch (screen) {
    // First-launch language selection (shown once, before the splash)
    case 'langSelect':   content = <LanguageOnboardingScreen onContinue={(l) => { completeLangOnboarding(l); setScreen('splash'); }} />; break;

    // Auth
    case 'splash':       content = <SplashScreen onContinue={go('welcome')} />; break;
    case 'welcome':      content = <WelcomeScreen onSignup={go('signup')} onLogin={go('login')} />; break;
    case 'signup':       content = <SignupChooserScreen onEmail={go('signupEmail')} onLogin={go('login')} onBack={go('welcome')} onApple={go('onboarding')} onGoogle={go('onboarding')} onFacebook={go('onboarding')} />; break;
    case 'signupEmail':  content = <SignupEmailScreen onContinue={go('onboarding')} onLogin={go('login')} onBack={go('signup')} />; break;
    case 'login':        content = <LoginScreen onLogin={go('home')} onSignup={go('signup')} onForgot={go('forgot')} onBack={go('welcome')} />; break;
    case 'forgot':       content = <ForgotPasswordScreen onSubmit={() => {}} onBack={go('login')} />; break;
    case 'onboarding':   content = <OnboardingScreen onFinish={go('home')} onSkip={go('home')} />; break;

    // Home & Events
    case 'home':         content = <HomeScreen onOpenEvent={go('eventDetails')} onOpenTalk={() => { setOpenContent(null); setScreen('contentDetails'); }} onProfile={onProfile} onNotifications={onNotifications} onNavigate={onNavigate} />; break;
    case 'events':       content = <EventsScreen onOpenEvent={go('eventDetails')} onProfile={onProfile} onNotifications={onNotifications} onNavigate={onNavigate} />; break;
    case 'eventDetails': content = <EventDetailsScreen onRegister={go('register')} onShowQR={go('qrCode')} onBack={go('events')} onNavigate={onNavigate} />; break;
    case 'register':     content = <RegisterEventScreen onSubmit={go('confirmation')} onBack={go('eventDetails')} />; break;
    case 'confirmation': content = <ConfirmationScreen onShowQR={go('qrCode')} onHome={go('home')} onMyEvents={go('myEvents')} onBack={go('events')} onNavigate={onNavigate} />; break;
    case 'qrCode':       content = <EventQRScreen onBack={go('myEvents')} onOpenEvent={go('eventDetails')} onNavigate={onNavigate} />; break;
    case 'myEvents':     content = <MyEventsScreen onBack={go('more')} onOpenEvent={go('eventDetails')} onShowQR={go('qrCode')} onNavigate={onNavigate} onProfile={onProfile} />; break;

    // Talks
    case 'talks':           content = <TalksLibraryScreen onOpenCategory={c => { setOpenCategory(c); setScreen('contentList'); }} onOpenContent={c => { setOpenContent(c); setScreen('contentDetails'); }} onSaved={go('saved')} onPlaylists={go('playlists')} onProfile={onProfile} onNotifications={onNotifications} onNavigate={onNavigate} />; break;
    case 'contentList':     content = <ContentListScreen category={openCategory} onOpenContent={c => { setOpenContent(c); setScreen('contentDetails'); }} onBack={go('talks')} onNavigate={onNavigate} />; break;
    case 'contentDetails':  content = <ContentDetailsScreen content={openContent} onBack={() => setScreen(openCategory ? 'contentList' : 'talks')} onAddToPlaylist={go('playlists')} onNavigate={onNavigate} />; break;
    case 'saved':           content = <SavedContentScreen onBack={go('more')} onOpenContent={c => { setOpenContent(c); setScreen('contentDetails'); }} onNavigate={onNavigate} />; break;
    case 'playlists':       content = <PlaylistsScreen onBack={go('more')} onOpenPlaylist={p => { setOpenPlaylist(p); setScreen('playlistDetails'); }} onNavigate={onNavigate} />; break;
    case 'playlistDetails': content = <PlaylistDetailsScreen playlist={openPlaylist} onBack={go('playlists')} onOpenContent={c => { setOpenContent(c); setScreen('contentDetails'); }} onNavigate={onNavigate} />; break;

    // Notifications
    case 'notif':         content = <NotificationsScreen onBack={go('home')} onOpenNotif={n => { setOpenNotif(n); setScreen('notifDetails'); }} onSettings={go('notifSettings')} onNavigate={onNavigate} />; break;
    case 'notifDetails':  content = <NotificationDetailsScreen notif={openNotif} onBack={go('notif')} onAction={() => setScreen(openNotif && openNotif.kind === 'talk' ? 'contentDetails' : 'eventDetails')} onNavigate={onNavigate} />; break;
    case 'notifSettings': content = <NotificationSettingsScreen onBack={go('notif')} onNavigate={onNavigate} />; break;

    // More + Profile + Settings
    case 'more':         content = <MoreScreen onCheckin={go('checkin')} onContact={go('contact')} onCourses={go('about')} onSaved={go('saved')} onPlaylists={go('playlists')} onMyEvents={go('myEvents')} onSettings={go('settings')} onPrivacy={go('privacy')} onSupport={go('support')} onAbout={go('about')} onProfile={onProfile} onNotifications={onNotifications} onNavigate={onNavigate} />; break;
    case 'checkin':      content = <CheckinScreen onBack={go('more')} onNavigate={onNavigate} />; break;
    case 'contact':      content = <ContactScreen onBack={go('more')} onNavigate={onNavigate} />; break;
    case 'profile':      content = <ProfileScreen onBack={go('home')} onViewProfile={go('viewProfile')} onSaved={go('saved')} onPlaylists={go('playlists')} onMyEvents={go('myEvents')} onSettings={go('settings')} onPrivacy={go('privacy')} onSupport={go('support')} onAbout={go('about')} onLogout={go('welcome')} onNavigate={onNavigate} />; break;
    case 'viewProfile':  content = <ViewProfileScreen onBack={go('profile')} onEdit={go('editProfile')} onNavigate={onNavigate} />; break;
    case 'editProfile':  content = <EditProfileScreen onBack={go('viewProfile')} onSave={go('viewProfile')} onNavigate={onNavigate} />; break;
    case 'settings':     content = <SettingsScreen onBack={go('more')} onNotifSettings={go('notifSettings')} onLogout={go('welcome')} onNavigate={onNavigate} />; break;
    case 'privacy':      content = <PrivacyScreen onBack={go('more')} onNavigate={onNavigate} />; break;
    case 'support':      content = <SupportScreen onBack={go('more')} onContact={go('contact')} onNavigate={onNavigate} />; break;
    case 'about':        content = <AboutScreen onBack={go('more')} onNavigate={onNavigate} />; break;

    default: content = <SplashScreen onContinue={go('welcome')} />;
  }

  return (
    <div style={{
      minHeight: '100vh', boxSizing: 'border-box',
      display: 'grid', gridTemplateColumns: '300px 1fr',
      background: 'linear-gradient(180deg, #FFF6E5 0%, #E1F5FE 50%, #FFF3E0 100%)',
    }}>
      <Sidebar current={screen} onChoose={setScreen} />
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        padding: '28px 24px 40px', gap: 14, minWidth: 0,
      }}>
        <Header current={screen} />
        <IOSDevice width={402} height={874}>{content}</IOSDevice>
        <Footer />
      </div>
    </div>
  );
}

function Header({ current }) {
  const { t } = useI18n();
  // Find the label for the current screen
  let label = current;
  for (const f of FLOWS) {
    if (f.screens.includes(current)) { label = t('proto.screens.' + current); break; }
  }
  return (
    <div style={{ width: '100%', maxWidth: 720, textAlign: 'center' }}>
      <div style={{ font: '700 11px var(--font-body)', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--primary)', marginBottom: 4 }}>
        MVP01 · MIỀN TỈNH THỨC
      </div>
      <div style={{ font: '700 22px var(--font-display)', color: 'var(--fg-1)', letterSpacing: '-0.01em' }}>{label}</div>
    </div>
  );
}

function Sidebar({ current, onChoose }) {
  const { t } = useI18n();
  return (
    <aside style={{
      borderRight: '1px solid rgba(190,200,207,0.4)',
      background: 'rgba(255,255,255,0.55)',
      backdropFilter: 'blur(12px)',
      padding: '28px 18px 32px',
      overflowY: 'auto', maxHeight: '100vh', position: 'sticky', top: 0,
      boxSizing: 'border-box',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}>
        <img src="assets/logo-mark.png" alt="" style={{ height: 40 }} />
        <div>
          <div style={{ font: '700 15px var(--font-display)', color: 'var(--primary)', letterSpacing: '-0.01em' }}>Miền Tỉnh Thức</div>
          <div style={{ font: '500 11px var(--font-body)', color: 'var(--fg-3)' }}>MVP01 prototype</div>
        </div>
      </div>
      {FLOWS.map(flow => (
        <div key={flow.titleKey} style={{ marginBottom: 18 }}>
          <div style={{
            font: '700 10px var(--font-body)', letterSpacing: '0.18em', textTransform: 'uppercase',
            color: 'var(--fg-3)', padding: '0 8px 8px',
          }}>{t(flow.titleKey)}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {flow.screens.map(key => {
              const label = t('proto.screens.' + key);
              const isActive = current === key;
              return (
                <button key={key} onClick={() => onChoose(key)}
                  style={{
                    border: 0, cursor: 'pointer', textAlign: 'left',
                    padding: '9px 12px', borderRadius: 10,
                    background: isActive ? 'var(--primary)' : 'transparent',
                    color: isActive ? '#fff' : 'var(--fg-2)',
                    font: isActive ? '700 13px var(--font-body)' : '500 13px var(--font-body)',
                    boxShadow: isActive ? '0 6px 16px rgba(0,99,132,0.18)' : 'none',
                    display: 'flex', alignItems: 'center', gap: 8,
                  }}>
                  {isActive && <span style={{ width: 4, height: 4, borderRadius: 9999, background: '#fff' }} />}
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      ))}
      <div style={{ font: 'var(--type-caption)', color: 'var(--fg-3)', padding: '8px 12px', lineHeight: 1.5 }}>
        {t('proto.sidebarHint')}
      </div>
    </aside>
  );
}

function Footer() {
  const { t } = useI18n();
  return (
    <div style={{
      maxWidth: 720, textAlign: 'center',
      font: '400 12px/1.5 var(--font-body)', color: 'var(--fg-3)',
      padding: '4px 16px',
    }}>
      {t('proto.footerHint')}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<LanguageProvider><App /></LanguageProvider>);
