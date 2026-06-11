/* global React, useI18n, Icon, PrimaryButton, SecondaryButton, TextButton,
   TextField, TextArea, Checkbox, Chip, FilterPills, SegmentedTabs,
   TopBar, AppTopBar, IconButton, BottomNav, OrDivider, SectionHeader,
   ListRow, Card, EmptyState, ImageTile, Dot, Screen, ScrollArea */

const { useState: useStateEv } = React;

// ═══ 08. Home ═══════════════════════════════════════════════════════
function HomeScreen({ onOpenEvent, onProfile, onNotifications, onOpenTalk, onNavigate }) {
  const { t } = useI18n();
  return (
    <Screen>
      <AppTopBar greeting={t('home.greeting')} name={t('home.userName')} onProfile={onProfile} onNotifications={onNotifications} notifBadge={2} />
      <ScrollArea padding="0 16px 12px">
        {/* Subtitle */}
        <p style={{ font: '400 14px/1.5 var(--font-body)', color: 'var(--fg-2)', margin: '0 4px 16px' }}>
          {t('home.subtitle')}
        </p>

        {/* Featured talk */}
        <div onClick={onOpenTalk}
          style={{
            margin: '0 0 8px', height: 168, borderRadius: 24, overflow: 'hidden',
            position: 'relative',
            background: 'linear-gradient(135deg, #FF7A88 0%, #FF8A5C 45%, #FFB659 100%)',
            cursor: 'pointer',
          }}>
          <div style={{ position: 'absolute', right: -10, top: -10, width: 240, height: 200,
            background: 'radial-gradient(circle at 70% 50%, rgba(255,255,255,0.55), transparent 55%)', opacity: 0.7 }} />
          <Icon name="local_florist" size={130} style={{ position: 'absolute', right: 6, bottom: -12, color: 'rgba(255,255,255,0.6)' }} filled />
          <div style={{ position: 'absolute', left: 20, top: 20, color: '#fff' }}>
            <div style={{ font: '700 11px var(--font-body)', opacity: 0.85, letterSpacing: '0.18em', textTransform: 'uppercase' }}>{t('home.newTalk')}</div>
          </div>
          <div style={{ position: 'absolute', left: 20, bottom: 18, color: '#fff' }}>
            <h3 style={{ font: '700 22px/1.2 var(--font-display)', margin: '4px 0 6px', letterSpacing: '-0.01em' }}>{t('data.talks.doiCanh')}</h3>
            <div style={{ font: '500 12px var(--font-body)', opacity: 0.85 }}>{t('data.speakers.minhNiem')} · {t('common.minutes', { n: 42 })}</div>
          </div>
          <button style={{
            position: 'absolute', right: 16, bottom: 18,
            width: 48, height: 48, borderRadius: '50%',
            background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.3)', color: '#fff',
            display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer',
          }}><Icon name="play_arrow" size={26} filled /></button>
        </div>

        {/* Latest Dharma Talks */}
        <div style={{ marginTop: 22 }}>
          <SectionHeader title={t('home.latestTalks')} action={t('common.viewAll')} onAction={() => onNavigate && onNavigate('talks')} />
          <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 6, scrollbarWidth: 'none' }}>
            <TalkCard tint="mint" icon="spa" type={t('common.video')} title={t('data.talks.troVe')} speaker={t('data.speakers.minhNiem')} duration={t('common.minutes', { n: 22 })} onClick={onOpenTalk} />
            <TalkCard tint="sky" icon="headphones" type={t('common.audio')} title={t('data.talks.tinhLang')} speaker={t('data.speakers.minhNiem')} duration={t('common.minutes', { n: 18 })} onClick={onOpenTalk} />
            <TalkCard tint="sunset" icon="auto_awesome" type={t('common.video')} title={t('data.talks.boiTam17')} speaker={t('data.speakers.vietcetera')} duration={t('common.minutes', { n: 45 })} onClick={onOpenTalk} />
          </div>
        </div>

        {/* Featured event */}
        <div style={{ marginTop: 28 }}>
          <SectionHeader title={t('home.upcomingEvents')} action={t('common.viewAll')} onAction={() => onNavigate && onNavigate('events')} />
          <div onClick={onOpenEvent}
            style={{
              background: '#fff', borderRadius: 20, padding: 16,
              display: 'flex', gap: 16, alignItems: 'center',
              boxShadow: 'var(--shadow-soft)', cursor: 'pointer',
            }}>
            <div style={{
              width: 80, height: 92, borderRadius: 14,
              background: '#EEF4FF', color: 'var(--primary)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{ font: '700 28px var(--font-display)', lineHeight: 1, letterSpacing: '-0.01em' }}>{t('home.eventDay')}</div>
              <div style={{ font: '700 9px var(--font-body)', letterSpacing: '0.12em', marginTop: 4 }}>{t('home.eventMonth')}</div>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h4 style={{ font: '700 16px/1.3 var(--font-display)', color: 'var(--fg-1)', margin: '0 0 10px' }}>{t('events.data.tay-phat.title')}</h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--fg-3)', font: '500 13px var(--font-body)', marginBottom: 4 }}>
                <Icon name="schedule" size={16} color="var(--primary)" /> {t('events.data.tay-phat.time')}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--fg-3)', font: '500 13px var(--font-body)' }}>
                <Icon name="location_on" size={16} color="var(--primary)" /> {t('events.data.tay-phat.location')}
              </div>
            </div>
          </div>
        </div>

        {/* Reminder quote card */}
        <div style={{
          marginTop: 22,
          background: 'linear-gradient(135deg, #FFF1D6 0%, #DDF1FF 100%)',
          borderRadius: 24, padding: '22px 22px 20px',
          boxShadow: 'var(--shadow-soft)',
        }}>
          <Icon name="format_quote" size={28} color="var(--accent-warm)" filled style={{ marginBottom: 4 }} />
          <p style={{
            font: 'italic 500 16px/1.55 var(--font-body)', color: 'var(--fg-1)',
            margin: 0, textAlign: 'center',
          }}>
            {t('home.quote')}<br/>{t('home.quote2')}
          </p>
          <div style={{ textAlign: 'center', marginTop: 12, font: '700 11px var(--font-body)', letterSpacing: '0.2em', color: 'var(--primary)' }}>{t('home.quoteAuthor')}</div>
        </div>
        <div style={{ height: 8 }} />
      </ScrollArea>
      <BottomNav active="home" onNavigate={onNavigate} />
    </Screen>
  );
}

function QuickAction({ tint, icon, label, sub, color, onClick }) {
  return (
    <button onClick={onClick} style={{
      background: tint, borderRadius: 18, padding: 16,
      border: 0, cursor: 'pointer', textAlign: 'left',
      display: 'flex', flexDirection: 'column', gap: 10, minHeight: 110,
      boxShadow: 'var(--shadow-soft)',
    }}>
      <div style={{ width: 38, height: 38, borderRadius: 12, background: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color }}>
        <Icon name={icon} size={22} filled />
      </div>
      <div style={{ flex: 1 }} />
      <div style={{ font: '700 14px var(--font-display)', color: 'var(--fg-1)', lineHeight: 1.25 }}>{label}</div>
      <div style={{ font: '500 12px var(--font-body)', color, opacity: 0.85 }}>{sub}</div>
    </button>
  );
}

function TalkCard({ tint, icon, type, title, speaker, duration, onClick }) {
  return (
    <button onClick={onClick} style={{
      width: 200, flex: '0 0 auto', background: 'transparent', border: 0, padding: 0, cursor: 'pointer', textAlign: 'left',
      display: 'flex', flexDirection: 'column', gap: 10,
    }}>
      <div style={{ position: 'relative' }}>
        <ImageTile tint={tint} icon={icon} size={200} radius={18} style={{ height: 130, width: 200 }} />
        <div style={{
          position: 'absolute', top: 10, left: 10,
          padding: '4px 10px', borderRadius: 9999,
          background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)',
          color: 'var(--primary)', font: '700 10px var(--font-body)',
          letterSpacing: '0.12em', textTransform: 'uppercase',
        }}>{type}</div>
        <div style={{
          position: 'absolute', bottom: 10, right: 10,
          width: 36, height: 36, borderRadius: '50%',
          background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)',
          color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(7,29,48,0.18)',
        }}>
          <Icon name="play_arrow" size={20} filled />
        </div>
      </div>
      <div>
        <h4 style={{ font: '700 14px/1.3 var(--font-display)', color: 'var(--fg-1)', margin: '0 0 4px' }}>{title}</h4>
        <div style={{ font: '400 12px var(--font-body)', color: 'var(--fg-3)' }}>{speaker} · {duration}</div>
      </div>
    </button>
  );
}

// ═══ 09. Events list ════════════════════════════════════════════════
// Structural data only — titles, dates, locations and descriptions live in the
// i18n dictionary under events.data.<id>.
const EVENTS = [
  { id: 'tay-phat',   tint: 'forest', icon: 'park',             status: 'open',       online: false },
  { id: 'suoi-nguon', tint: 'sunset', icon: 'wb_sunny',         status: 'open',       online: false },
  { id: 'chien-binh', tint: 'sand',   icon: 'child_care',       status: 'registered', online: false },
  { id: 'thien-10',   tint: 'mint',   icon: 'self_improvement', status: 'open',       online: false },
  { id: 'thien-tra',  tint: 'plum',   icon: 'local_cafe',       status: 'open',       online: true },
];

function EventsScreen({ onOpenEvent, onProfile, onNotifications, onNavigate }) {
  const { t } = useI18n();
  const [filter, setFilter] = useStateEv('all');
  const filters = [
    { key: 'all',        label: t('events.filters.all') },
    { key: 'upcoming',   label: t('events.filters.upcoming') },
    { key: 'registered', label: t('events.filters.registered') },
    { key: 'online',     label: t('events.filters.online') },
    { key: 'live',       label: t('events.filters.live') },
  ];
  const list = filter === 'registered' ? EVENTS.filter(e => e.status === 'registered')
            : filter === 'online' ? EVENTS.filter(e => e.online)
            : filter === 'live' ? EVENTS.filter(e => !e.online)
            : EVENTS;
  return (
    <Screen>
      <AppTopBar title={t('events.title')} name="A" onProfile={onProfile} onNotifications={onNotifications} notifBadge={2} />
      <div style={{ padding: '4px 16px 8px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px',
          background: '#fff', borderRadius: 14, boxShadow: 'var(--shadow-soft)', marginBottom: 12,
        }}>
          <Icon name="search" size={20} color="var(--fg-3)" />
          <input placeholder={t('events.search')} style={{
            flex: 1, border: 0, outline: 'none', background: 'transparent',
            font: '400 15px var(--font-body)', color: 'var(--fg-1)',
          }} />
        </div>
        <FilterPills items={filters} active={filter} onChange={setFilter} />
      </div>
      <ScrollArea padding="16px 16px 12px">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {list.map(ev => {
            const d = t('events.data.' + ev.id);
            return <EventCard key={ev.id} tint={ev.tint} icon={ev.icon} status={ev.status}
              title={d.title} date={d.date} time={d.time} location={d.location} desc={d.desc}
              onOpen={() => onOpenEvent && onOpenEvent(ev.id)} />;
          })}
          {list.length === 0 && (
            <EmptyState icon="event_busy" title={t('events.emptyTitle')} message={t('events.emptyMsg')} />
          )}
        </div>
      </ScrollArea>
      <BottomNav active="events" onNavigate={onNavigate} />
    </Screen>
  );
}

function EventCard({ tint, icon, title, date, time, location, desc, status, onOpen }) {
  const { t } = useI18n();
  const tints = {
    forest: 'linear-gradient(135deg, #7FCB94 0%, #2E8A53 60%, #1F6E3F 100%)',
    sunset: 'linear-gradient(135deg, #FFE89A 0%, #FFB659 50%, #FF7A3A 100%)',
    sand:   'linear-gradient(135deg, #FFE0B5 0%, #FFB659 100%)',
    mint:   'linear-gradient(135deg, #B7EBC8 0%, #4FC489 100%)',
    plum:   'linear-gradient(135deg, #E8D8F2 0%, #B68AD8 100%)',
  };
  const badgeLabel = status === 'registered' ? t('events.badgeRegistered') : t('events.badgeUpcoming');
  return (
    <div style={{ background: '#fff', borderRadius: 24, overflow: 'hidden', boxShadow: 'var(--shadow-card)', border: '1px solid rgba(7,29,48,0.04)' }}>
      <div style={{ height: 170, background: tints[tint] || tints.forest, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 50% 40%, rgba(255,235,180,0.4), transparent 55%)' }} />
        <Icon name={icon} size={120} style={{ position: 'absolute', right: 10, bottom: -8, color: 'rgba(255,255,255,0.28)' }} filled />
        <span style={{
          position: 'absolute', top: 14, left: 14,
          padding: '6px 12px', borderRadius: 12,
          background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)',
          color: status === 'registered' ? 'var(--success)' : 'var(--primary)',
          font: '700 11px var(--font-body)', letterSpacing: '0.12em', textTransform: 'uppercase',
          boxShadow: '0 6px 18px rgba(7,29,48,0.08)',
        }}>{badgeLabel}</span>
      </div>
      <div style={{ padding: 18 }}>
        <div style={{ display: 'flex', gap: 16, color: 'var(--fg-3)', font: '500 13px var(--font-body)', marginBottom: 8 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Icon name="calendar_month" size={16} color="var(--primary)" />{date}</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Icon name="schedule" size={16} color="var(--primary)" />{time}</span>
        </div>
        <h3 style={{ font: '700 19px/1.25 var(--font-display)', color: 'var(--fg-1)', margin: '0 0 6px', letterSpacing: '-0.01em' }}>{title}</h3>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, font: '500 13px var(--font-body)', color: 'var(--fg-3)' }}>
          <Icon name="location_on" size={16} color="var(--primary)" />{location}
        </div>
        <p style={{ font: '400 14px/1.5 var(--font-body)', color: 'var(--fg-2)', margin: '12px 0 14px' }}>{desc}</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={onOpen} style={{ background: 'transparent', border: 0, color: 'var(--primary)', font: '600 14px var(--font-body)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4, padding: 0 }}>
            {t('events.viewDetails')} <Icon name="chevron_right" size={18} />
          </button>
          {status === 'registered' ? (
            <button onClick={onOpen} style={{
              background: '#fff', color: 'var(--success)', border: '1.5px solid var(--success)',
              padding: '10px 22px', borderRadius: 14,
              font: '700 13px var(--font-body)', cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: 6,
            }}><Icon name="qr_code_2" size={16} />{t('events.viewQR')}</button>
          ) : (
            <button onClick={onOpen} style={{
              background: 'var(--primary)', color: '#fff', border: 0,
              padding: '11px 26px', borderRadius: 14,
              font: '700 13px var(--font-body)', cursor: 'pointer',
              boxShadow: '0 8px 22px rgba(0,99,132,0.20)',
            }}>{t('events.register')}</button>
          )}
        </div>
      </div>
    </div>
  );
}

// ═══ 10. Event details ══════════════════════════════════════════════
function EventDetailsScreen({ onRegister, onBack, onNavigate, onShowQR, isRegistered }) {
  const { t } = useI18n();
  return (
    <Screen>
      <TopBar title={t('events.details.title')} onBack={onBack} right={<><IconButton icon="share" /><IconButton icon="bookmark_border" /></>} />
      <ScrollArea padding="0 0 110px">
        <div style={{
          height: 230, margin: 0,
          background: 'linear-gradient(135deg, #4FC489 0%, #2E8A53 60%, #1F6E3F 100%)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 28%, rgba(255,238,180,0.7), transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,194,71,0.35), transparent 45%)' }} />
          <Icon name="forest" size={170} style={{ position: 'absolute', right: -8, bottom: -10, color: 'rgba(255,255,255,0.32)' }} filled />
          <div style={{ position: 'absolute', left: 20, bottom: 22 }}>
            <Chip variant="status">{t('events.details.liveChip')}</Chip>
          </div>
        </div>

        <div style={{ padding: '24px 16px 0', position: 'relative', marginTop: -32, borderRadius: '32px 32px 0 0', background: 'var(--background)' }}>
          <h1 style={{ font: '700 28px/1.2 var(--font-display)', color: 'var(--fg-1)', margin: '0 0 18px', letterSpacing: '-0.01em' }}>{t('events.data.tay-phat.title')}</h1>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <InfoRow icon="calendar_month" label={t('events.details.dateLabel')} value={t('events.details.dateValue')} />
            <InfoRow icon="schedule" label={t('events.details.timeLabel')} value={t('events.data.tay-phat.time')} />
            <InfoRow icon="location_on" label={t('events.details.locationLabel')} value={t('events.data.tay-phat.location')} />
          </div>

          <h3 style={{ font: '700 18px var(--font-display)', color: 'var(--fg-1)', margin: '26px 0 10px' }}>{t('events.details.about')}</h3>
          <p style={{ font: '400 15px/1.65 var(--font-body)', color: 'var(--fg-2)', margin: 0 }}>
            {t('events.details.aboutText')}
          </p>

          <h3 style={{ font: '700 18px var(--font-display)', color: 'var(--fg-1)', margin: '24px 0 10px' }}>{t('events.details.program')}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 14 }}>
            <Schedule time="17:00 – 18:00" title={t('events.details.schedule1')} />
            <Schedule time="18:00 – 20:00" title={t('events.details.schedule2')} />
            <Schedule time="20:00 – 20:30" title={t('events.details.schedule3')} />
            <Schedule time="20:30" title={t('events.details.schedule4')} />
          </div>

          <h3 style={{ font: '700 18px var(--font-display)', color: 'var(--fg-1)', margin: '20px 0 10px' }}>{t('events.details.bring')}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 22 }}>
            <Bullet>{t('events.details.bring1')}</Bullet>
            <Bullet>{t('events.details.bring2')}</Bullet>
            <Bullet>{t('events.details.bring3')}</Bullet>
          </div>

          <h3 style={{ font: '700 18px var(--font-display)', color: 'var(--fg-1)', margin: '0 0 10px' }}>{t('events.details.share')}</h3>
          <div style={{ display: 'flex', gap: 10, marginBottom: 28 }}>
            <ShareBtn icon="forum" label="Viber" color="#7360F2" />
            <ShareBtn icon="chat" label="Zalo" color="#0084FF" />
            <ShareBtn icon="facebook" label="Facebook" color="#1877F2" />
            <ShareBtn icon="link" label={t('events.details.copyLink')} color="var(--fg-2)" />
          </div>
        </div>
      </ScrollArea>

      <div style={{ position: 'absolute', left: 16, right: 16, bottom: 88, zIndex: 6 }}>
        {isRegistered
          ? <PrimaryButton icon="qr_code_2" onClick={onShowQR}>{t('events.viewQR')}</PrimaryButton>
          : <PrimaryButton variant="warm" icon="arrow_forward" onClick={onRegister}>{t('events.details.registerCta')}</PrimaryButton>
        }
      </div>

      <BottomNav active="events" onNavigate={onNavigate} />
    </Screen>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div style={{ background: '#EEF4FF', padding: '12px 16px', borderRadius: 14, display: 'flex', alignItems: 'center', gap: 14 }}>
      <span style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(0,99,132,0.10)', display:'inline-flex', alignItems:'center', justifyContent:'center', color: 'var(--primary)' }}>
        <Icon name={icon} size={20} />
      </span>
      <div>
        <div style={{ font: '700 10px var(--font-body)', letterSpacing: '0.18em', color: 'var(--fg-3)' }}>{label}</div>
        <div style={{ font: '700 15px var(--font-display)', color: 'var(--fg-1)' }}>{value}</div>
      </div>
    </div>
  );
}

function Schedule({ time, title }) {
  return (
    <div style={{ display: 'flex', gap: 14, alignItems: 'baseline' }}>
      <div style={{ width: 108, flex: '0 0 auto', font: '700 13px var(--font-body)', color: 'var(--primary)' }}>{time}</div>
      <div style={{ font: '500 14px/1.45 var(--font-body)', color: 'var(--fg-1)' }}>{title}</div>
    </div>
  );
}

function Bullet({ children }) {
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
      <Icon name="check_circle" size={20} color="var(--accent-warm)" filled />
      <span style={{ font: '400 14px/1.5 var(--font-body)', color: 'var(--fg-2)', flex: 1 }}>{children}</span>
    </div>
  );
}

function ShareBtn({ icon, label, color }) {
  return (
    <button style={{
      flex: 1, padding: '10px 6px', border: 0,
      background: '#fff', borderRadius: 14, cursor: 'pointer',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
      boxShadow: 'var(--shadow-soft)',
    }}>
      <Icon name={icon} size={22} color={color} />
      <span style={{ font: '600 11px var(--font-body)', color: 'var(--fg-2)' }}>{label}</span>
    </button>
  );
}

// ═══ 11. Register form ═════════════════════════════════════════════
function RegisterEventScreen({ onSubmit, onBack }) {
  const { t } = useI18n();
  const [vals, setVals] = useStateEv({
    last: 'Nguyen', first: 'An Nhiên',
    email: 'annhienn@example.com', phone: '0400 123 456',
    visited: 'no', needs: '', notes: '',
  });
  const [agreed, setAgreed] = useStateEv(true);
  const set = k => v => setVals({ ...vals, [k]: v });
  return (
    <Screen>
      <TopBar title={t('events.registerForm.title')} onBack={onBack} />
      <ScrollArea padding="8px 16px 24px">
        <div style={{ background:'#fff', borderRadius: 24, overflow: 'hidden', boxShadow: 'var(--shadow-soft)', marginBottom: 24 }}>
          <div style={{ height: 130, background:'linear-gradient(135deg, #4FC489 0%, #2E8A53 100%)', position:'relative' }}>
            <Icon name="forest" size={120} style={{ position: 'absolute', right: 0, bottom: -8, color: 'rgba(255,255,255,0.32)' }} filled />
            <div style={{ position:'absolute', left:14, top:14 }}><Chip variant="status">{t('events.badgeUpcoming')}</Chip></div>
          </div>
          <div style={{ padding: '16px 18px 18px' }}>
            <h3 style={{ font: '700 18px var(--font-display)', color: 'var(--fg-1)', margin: '0 0 10px' }}>{t('events.data.tay-phat.title')}</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--fg-3)', font: '500 13px var(--font-body)', marginBottom: 4 }}>
              <Icon name="calendar_month" size={18} color="var(--primary)" />24/05/2026 · {t('events.data.tay-phat.time')}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--fg-3)', font: '500 13px var(--font-body)' }}>
              <Icon name="location_on" size={18} color="var(--primary)" />{t('events.data.tay-phat.location')}
            </div>
          </div>
        </div>

        <h2 style={{ font: '700 20px var(--font-display)', color: 'var(--primary)', margin: '0 0 6px' }}>{t('events.registerForm.heading')}</h2>
        <p style={{ font: '400 14px/1.55 var(--font-body)', color: 'var(--fg-2)', margin: '0 0 18px' }}>
          {t('events.registerForm.desc')}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ flex: '1 1 0', minWidth: 0 }}>
              <TextField label={t('events.registerForm.lastName')} value={vals.last} onChange={set('last')} required />
            </div>
            <div style={{ flex: '1 1 0', minWidth: 0 }}>
              <TextField label={t('events.registerForm.firstName')} value={vals.first} onChange={set('first')} required />
            </div>
          </div>
          <TextField label={t('events.registerForm.email')} value={vals.email} onChange={set('email')} type="email" required />
          <TextField label={t('events.registerForm.phone')} value={vals.phone} onChange={set('phone')} type="tel" required />

          {/* Event-specific */}
          <div>
            <label style={{ font: '500 14px var(--font-body)', color: 'var(--fg-1)', display: 'block', marginBottom: 8 }}>
              {t('events.registerForm.visitedQ')}
            </label>
            <div style={{ display: 'flex', gap: 10 }}>
              {[{ k: 'no', l: t('events.registerForm.visitedNo') }, { k: 'few', l: t('events.registerForm.visitedFew') }, { k: 'reg', l: t('events.registerForm.visitedReg') }].map(o => {
                const on = vals.visited === o.k;
                return (
                  <button key={o.k} onClick={() => set('visited')(o.k)} style={{
                    flex: 1, padding: '10px 8px', borderRadius: 12,
                    background: on ? '#EEF4FF' : '#fff',
                    border: '1.5px solid ' + (on ? 'var(--primary)' : 'var(--outline-soft)'),
                    color: on ? 'var(--primary)' : 'var(--fg-2)',
                    font: '600 13px var(--font-body)', cursor: 'pointer',
                  }}>{o.l}</button>
                );
              })}
            </div>
          </div>

          <TextArea label={t('events.registerForm.needsLabel')} placeholder={t('events.registerForm.needsPlaceholder')} rows={3} value={vals.needs} onChange={set('needs')} />
          <TextArea label={t('events.registerForm.notesLabel')} placeholder={t('events.registerForm.notesPlaceholder')} rows={3} value={vals.notes} onChange={set('notes')} />

          <div style={{ marginTop: 6 }}>
            <Checkbox checked={agreed} onChange={setAgreed}>
              {t('events.registerForm.consent')}
            </Checkbox>
          </div>

          <PrimaryButton variant="warm" onClick={onSubmit} disabled={!agreed}>{t('events.registerForm.submit')}</PrimaryButton>
          <p style={{ font: 'var(--type-caption)', color: 'var(--fg-3)', textAlign: 'center', margin: '4px 0 0' }}>
            {t('events.registerForm.footnote')}
          </p>
        </div>
      </ScrollArea>
    </Screen>
  );
}

// ═══ 12. Registration confirmation ═════════════════════════════════
function ConfirmationScreen({ onShowQR, onHome, onMyEvents, onBack, onNavigate }) {
  const { t } = useI18n();
  return (
    <Screen>
      <TopBar title={t('events.confirmation.title')} onBack={onBack} />
      <ScrollArea padding="16px 20px 24px">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: '12px 0 20px' }}>
          <div style={{
            width: 84, height: 84, borderRadius: '50%',
            background: 'rgba(46,125,50,0.10)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon name="check_circle" size={56} color="var(--success)" filled />
          </div>
          <h1 style={{ font: '700 26px var(--font-display)', color: 'var(--fg-1)', margin: 0, letterSpacing: '-0.01em', textAlign: 'center' }}>{t('events.confirmation.title')}</h1>
          <p style={{ font: '400 15px/1.55 var(--font-body)', color: 'var(--fg-2)', margin: 0, textAlign: 'center', maxWidth: 300 }}>
            {t('events.confirmation.thanks')}
          </p>
        </div>

        <div style={{
          background: '#fff', borderRadius: 24, padding: 20,
          boxShadow: 'var(--shadow-card)', marginBottom: 18,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <ImageTile tint="forest" icon="park" size={64} radius={16} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <h4 style={{ font: '700 16px/1.3 var(--font-display)', color: 'var(--fg-1)', margin: '0 0 6px' }}>{t('events.data.tay-phat.title')}</h4>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--primary)', font: '600 12px var(--font-body)' }}>
                <Icon name="calendar_month" size={14} /> 24/05/2026
              </div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 16, paddingTop: 16, borderTop: '1px solid rgba(190,200,207,0.4)' }}>
            <div>
              <div style={{ font: '700 10px var(--font-body)', letterSpacing: '0.18em', color: 'var(--fg-3)' }}>{t('events.confirmation.timeLabel')}</div>
              <div style={{ font: '700 14px var(--font-display)', color: 'var(--fg-1)', marginTop: 2 }}>{t('events.data.tay-phat.time')}</div>
            </div>
            <div>
              <div style={{ font: '700 10px var(--font-body)', letterSpacing: '0.18em', color: 'var(--fg-3)' }}>{t('events.confirmation.locationLabel')}</div>
              <div style={{ font: '700 14px var(--font-display)', color: 'var(--fg-1)', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t('events.confirmation.location')}</div>
            </div>
          </div>
        </div>

        <QRCodeBlock id="MT-20260524-001" />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 18 }}>
          <PrimaryButton icon="qr_code_2" onClick={onShowQR}>{t('events.confirmation.viewQR')}</PrimaryButton>
          <SecondaryButton onClick={onMyEvents} icon={<Icon name="event_available" size={20} color="var(--primary)" />}>{t('events.confirmation.viewMyEvents')}</SecondaryButton>
          <TextButton onClick={onHome}>{t('events.confirmation.backHome')}</TextButton>
        </div>
      </ScrollArea>
      <BottomNav active="events" onNavigate={onNavigate} />
    </Screen>
  );
}

function QRCodeBlock({ id }) {
  return (
    <div style={{
      background: '#fff', borderRadius: 24, padding: 22, textAlign: 'center',
      boxShadow: 'var(--shadow-soft)',
    }}>
      <div style={{
        width: 180, height: 180, margin: '0 auto 14px',
        background: 'linear-gradient(135deg, #EEF4FF, #fff)',
        borderRadius: 18, position: 'relative',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          width: '88%', height: '88%', borderRadius: 12,
          border: '2px dashed var(--primary-soft)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name="qr_code_2" size={108} color="var(--primary)" />
        </div>
      </div>
      <div style={{ font: '700 10px var(--font-body)', letterSpacing: '0.18em', color: 'var(--fg-3)' }}>ID: {id}</div>
    </div>
  );
}

// ═══ 14. Event QR code (standalone) ═════════════════════════════════
function EventQRScreen({ onBack, onOpenEvent, onNavigate, status = 'not-checked' }) {
  const { t } = useI18n();
  return (
    <Screen>
      <TopBar title={t('events.qr.title')} onBack={onBack} />
      <ScrollArea padding="12px 20px 24px">
        <div style={{ background: '#fff', borderRadius: 24, padding: 22, boxShadow: 'var(--shadow-card)', marginBottom: 16 }}>
          <h3 style={{ font: '700 20px/1.25 var(--font-display)', color: 'var(--fg-1)', margin: '0 0 12px' }}>{t('events.data.tay-phat.title')}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--fg-3)', font: '500 13px var(--font-body)' }}>
              <Icon name="calendar_month" size={16} color="var(--primary)" />24/05/2026 · {t('events.data.tay-phat.time')}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--fg-3)', font: '500 13px var(--font-body)' }}>
              <Icon name="person" size={16} color="var(--primary)" />{t('events.qr.person')}
            </div>
          </div>
        </div>

        <QRCodeBlock id="MT-20260524-001" />

        <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0 18px' }}>
          {status === 'checked' ? (
            <Chip variant="success" icon="check_circle">{t('events.qr.checkedIn')}</Chip>
          ) : (
            <Chip variant="warm" icon="schedule">{t('events.qr.notCheckedIn')}</Chip>
          )}
        </div>

        <p style={{ font: '400 14px/1.55 var(--font-body)', color: 'var(--fg-2)', textAlign: 'center', margin: '0 0 18px' }}>
          {t('events.qr.instruction')}
        </p>

        <SecondaryButton onClick={onOpenEvent} icon={<Icon name="info" size={20} color="var(--primary)" />}>{t('events.qr.viewEvent')}</SecondaryButton>
      </ScrollArea>
      <BottomNav active="events" onNavigate={onNavigate} />
    </Screen>
  );
}

// ═══ 15. My events ══════════════════════════════════════════════════
function MyEventsScreen({ onBack, onOpenEvent, onShowQR, onNavigate, onProfile }) {
  const { t } = useI18n();
  const [tab, setTab] = useStateEv('upcoming');
  const tabs = [
    { key: 'upcoming', label: t('events.my.tabUpcoming') },
    { key: 'past', label: t('events.my.tabPast') },
    { key: 'cancelled', label: t('events.my.tabCancelled') },
  ];
  const myEvents = [
    { id: 'tay-phat', tint: 'forest', icon: 'park', status: 'checked-in' },
    { id: 'chien-binh', tint: 'sand', icon: 'child_care', status: 'pending' },
  ];
  const past = [
    { id: 'past1', tint: 'plum', icon: 'local_cafe', status: 'attended' },
  ];
  const list = tab === 'upcoming' ? myEvents : tab === 'past' ? past : [];
  return (
    <Screen>
      <TopBar title={t('events.my.title')} onBack={onBack} />
      <div style={{ padding: '4px 16px 14px' }}>
        <SegmentedTabs items={tabs} active={tab} onChange={setTab} />
      </div>
      <ScrollArea padding="0 16px 12px">
        {list.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {list.map(ev => {
              const d = t('events.my.data.' + ev.id);
              return (
              <div key={ev.id} style={{ background: '#fff', borderRadius: 20, padding: 16, boxShadow: 'var(--shadow-soft)' }}>
                <div style={{ display: 'flex', gap: 14 }}>
                  <ImageTile tint={ev.tint} icon={ev.icon} size={64} radius={14} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h4 style={{ font: '700 16px/1.3 var(--font-display)', color: 'var(--fg-1)', margin: '0 0 6px' }}>{d.title}</h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--fg-3)', font: '500 12px var(--font-body)', marginBottom: 2 }}>
                      <Icon name="calendar_month" size={14} color="var(--primary)" />{d.date} · {d.time}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--fg-3)', font: '500 12px var(--font-body)' }}>
                      <Icon name="location_on" size={14} color="var(--primary)" />{d.location}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 14, paddingTop: 14, borderTop: '1px solid rgba(190,200,207,0.35)' }}>
                  {ev.status === 'checked-in'
                    ? <Chip variant="success" icon="check_circle">{t('events.qr.checkedIn')}</Chip>
                    : ev.status === 'attended'
                      ? <Chip variant="soft" icon="task_alt">{t('events.my.attended')}</Chip>
                      : <Chip variant="warm" icon="schedule">{t('events.qr.notCheckedIn')}</Chip>}
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => onOpenEvent && onOpenEvent(ev.id)} style={{
                      background: '#fff', border: '1.5px solid var(--outline-soft)',
                      padding: '8px 14px', borderRadius: 10, color: 'var(--fg-2)',
                      font: '600 13px var(--font-body)', cursor: 'pointer',
                    }}>{t('events.my.details')}</button>
                    {ev.status !== 'attended' && (
                      <button onClick={onShowQR} style={{
                        background: 'var(--primary)', border: 0,
                        padding: '8px 14px', borderRadius: 10, color: '#fff',
                        font: '700 13px var(--font-body)', cursor: 'pointer',
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                      }}><Icon name="qr_code_2" size={14} />{t('events.my.viewQR')}</button>
                    )}
                  </div>
                </div>
              </div>
              );
            })}
          </div>
        ) : (
          <EmptyState
            icon="event_busy"
            title={t('events.my.emptyTitle')}
            message={t('events.my.emptyMsg')}
            action={t('events.my.emptyAction')}
            onAction={() => onNavigate && onNavigate('events')}
          />
        )}
      </ScrollArea>
      <BottomNav active="events" onNavigate={onNavigate} />
    </Screen>
  );
}

Object.assign(window, {
  HomeScreen, EventsScreen, EventDetailsScreen, RegisterEventScreen,
  ConfirmationScreen, EventQRScreen, MyEventsScreen,
});
