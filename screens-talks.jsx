/* global React, useI18n, Icon, PrimaryButton, SecondaryButton, TextButton,
   TextField, Checkbox, Chip, FilterPills, SegmentedTabs,
   TopBar, AppTopBar, IconButton, BottomNav, OrDivider, SectionHeader,
   ListRow, Card, EmptyState, ImageTile, Dot, Screen, ScrollArea */

const { useState: useStateTalks } = React;

// ─── Sample data ───────────────────────────────────────────────────
// Category names are programme/series names and stay the same in both languages.
// Talk titles & speakers resolve through the i18n dictionary (data.talks.* / data.speakers.*).
const TALK_CATEGORIES = [
  { id: 'truong-thanh', label: 'Trưởng Thành', tint: 'sky',    icon: 'psychology',     count: 24 },
  { id: 'boi-tam',      label: 'Bói Tâm',      tint: 'plum',   icon: 'auto_awesome',   count: 18 },
  { id: 'i-see-you',    label: 'I See You',    tint: 'rose',   icon: 'favorite',       count: 12 },
  { id: 'bbb',          label: 'Bạn Thân Bản Thân', tint: 'mint', icon: 'self_improvement', count: 32 },
  { id: 'tay-phat',     label: 'Tay Phật Trong Tay Con', tint: 'sunset', icon: 'spa', count: 8 },
  { id: 'htv7',         label: 'Không Sao Đâu (HTV7)', tint: 'sand', icon: 'movie', count: 16 },
];

const AUDIO_TRACKS = [
  { id: 'a1', tint: 'ocean',  titleKey: 'troVe',       speakerKey: 'minhNiem', duration: '22:14' },
  { id: 'a2', tint: 'forest', titleKey: 'tinhLang',    speakerKey: 'minhNiem', duration: '18:30' },
  { id: 'a3', tint: 'plum',   titleKey: 'langNgheTim', speakerKey: 'minhNiem', duration: '15:42' },
  { id: 'a4', tint: 'sand',   titleKey: 'buongBo',     speakerKey: 'minhNiem', duration: '25:08' },
];

// ═══ 16. Talks library ═════════════════════════════════════════════
function TalksLibraryScreen({ onOpenCategory, onOpenContent, onSaved, onPlaylists, onProfile, onNotifications, onNavigate }) {
  const { t } = useI18n();
  const [filter, setFilter] = useStateTalks('all');
  const filters = [
    { key: 'all', label: t('talks.filters.all') },
    { key: 'new', label: t('talks.filters.new') },
    { key: 'video', label: t('talks.filters.video') },
    { key: 'audio', label: t('talks.filters.audio') },
    { key: 'saved', label: t('talks.filters.saved') },
    { key: 'listening', label: t('talks.filters.listening') },
  ];
  return (
    <Screen>
      <AppTopBar title={t('talks.title')} name="A" onProfile={onProfile} onNotifications={onNotifications} notifBadge={2} />
      <div style={{ padding: '4px 16px 8px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px',
          background: '#fff', borderRadius: 14, boxShadow: 'var(--shadow-soft)', marginBottom: 12,
        }}>
          <Icon name="search" size={20} color="var(--fg-3)" />
          <input placeholder={t('talks.search')} style={{
            flex: 1, border: 0, outline: 'none', background: 'transparent',
            font: '400 15px var(--font-body)', color: 'var(--fg-1)',
          }} />
        </div>
        <FilterPills items={filters} active={filter} onChange={setFilter} />
      </div>

      <ScrollArea padding="16px 16px 12px">
        {/* Quick links */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 22 }}>
          <QuickLink icon="bookmark" iconColor="var(--accent-warm)" bg="linear-gradient(135deg, #FFE5D0, #FFC890)" label={t('talks.savedLabel')} sub={t('talks.savedSub')} onClick={onSaved} />
          <QuickLink icon="queue_music" iconColor="var(--primary)" bg="linear-gradient(135deg, #C1E8FF, #74D1FF)" label={t('talks.playlistsLabel')} sub={t('talks.playlistsSub')} onClick={onPlaylists} />
        </div>

        {/* Categories grid */}
        <SectionHeader title={t('talks.topics')} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {TALK_CATEGORIES.map(c => (
            <button key={c.id} onClick={() => onOpenCategory && onOpenCategory(c)}
              style={{
                background: '#fff', border: 0, padding: 14, borderRadius: 18,
                boxShadow: 'var(--shadow-soft)', cursor: 'pointer', textAlign: 'left',
                display: 'flex', flexDirection: 'column', gap: 10, minHeight: 140,
              }}>
              <ImageTile tint={c.tint} icon={c.icon} size={56} radius={14} />
              <div style={{ flex: 1 }} />
              <div style={{ font: '700 14px/1.25 var(--font-display)', color: 'var(--fg-1)' }}>{c.label}</div>
              <div style={{ font: '500 12px var(--font-body)', color: 'var(--fg-3)' }}>{t('common.items', { n: c.count })}</div>
            </button>
          ))}
        </div>

        {/* Audio section */}
        <div style={{ marginTop: 28 }}>
          <SectionHeader title={t('talks.latestAudio')} action={t('common.viewAll')} onAction={() => onOpenCategory && onOpenCategory({ id: 'audio', label: t('talks.audioCategory') })} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {AUDIO_TRACKS.map(a => (
              <AudioRow key={a.id} tint={a.tint}
                title={t('data.talks.' + a.titleKey)}
                speaker={t('data.speakers.' + a.speakerKey)}
                duration={a.duration}
                onClick={() => onOpenContent && onOpenContent({ ...a, kind: 'audio' })} />
            ))}
          </div>
        </div>
        <div style={{ height: 16 }} />
      </ScrollArea>
      <BottomNav active="talks" onNavigate={onNavigate} />
    </Screen>
  );
}

function QuickLink({ icon, iconColor, bg, label, sub, onClick }) {
  return (
    <button onClick={onClick} style={{
      background: bg, border: 0, padding: 16, borderRadius: 18,
      cursor: 'pointer', textAlign: 'left',
      display: 'flex', flexDirection: 'column', gap: 8, minHeight: 100,
      boxShadow: 'var(--shadow-soft)',
    }}>
      <div style={{ width: 36, height: 36, borderRadius: 12, background: 'rgba(255,255,255,0.65)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: iconColor }}>
        <Icon name={icon} size={20} filled />
      </div>
      <div style={{ flex: 1 }} />
      <div style={{ font: '700 14px var(--font-display)', color: 'var(--fg-1)' }}>{label}</div>
      <div style={{ font: '500 12px var(--font-body)', color: iconColor, opacity: 0.9 }}>{sub}</div>
    </button>
  );
}

function AudioRow({ tint, title, speaker, duration, onClick, saved }) {
  return (
    <button onClick={onClick} style={{
      width: '100%', background: '#fff', border: 0, padding: 12, borderRadius: 16,
      boxShadow: 'var(--shadow-soft)', cursor: 'pointer', textAlign: 'left',
      display: 'flex', alignItems: 'center', gap: 14,
    }}>
      <div style={{ position: 'relative', flex: '0 0 auto' }}>
        <ImageTile tint={tint} size={60} radius={12} />
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', background: 'rgba(7,29,48,0.18)', borderRadius: 12,
        }}>
          <Icon name="play_arrow" size={26} filled />
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ font: '700 14px/1.3 var(--font-display)', color: 'var(--fg-1)', marginBottom: 4 }}>{title}</div>
        <div style={{ font: '400 12px var(--font-body)', color: 'var(--fg-3)' }}>{speaker} · {duration}</div>
      </div>
      <Icon name={saved ? 'bookmark' : 'bookmark_border'} size={22} color="var(--fg-3)" />
    </button>
  );
}

// ═══ 17. Content list (after picking category) ═════════════════════
const CONTENT_LIST = [
  { id: 'c1', tint: 'forest',  icon: 'spa',          kind: 'video', titleKey: 'doiCanh',         speakerKey: 'minhNiem', durMin: 42 },
  { id: 'c2', tint: 'ocean',   icon: 'headphones',   kind: 'audio', titleKey: 'troVe',           speakerKey: 'minhNiem', durMin: 22 },
  { id: 'c3', tint: 'sunset',  icon: 'auto_awesome', kind: 'video', titleKey: 'boiTam17Full',    speakerKey: 'minhNiem', durMin: 38 },
  { id: 'c4', tint: 'dusk',    icon: 'nightlight',   kind: 'audio', titleKey: 'ngheTruocNgu',    speakerKey: 'minhNiem', durMin: 28 },
  { id: 'c5', tint: 'plum',    icon: 'favorite',     kind: 'video', titleKey: 'langNgheTimMinh', speakerKey: 'minhNiem', durMin: 35 },
];

function ContentListScreen({ category, onOpenContent, onBack, onNavigate }) {
  const { t } = useI18n();
  const [sort, setSort] = useStateTalks('newest');
  const sorts = [
    { key: 'newest', label: t('talks.sorts.newest') },
    { key: 'popular', label: t('talks.sorts.popular') },
    { key: 'short', label: t('talks.sorts.short') },
    { key: 'long', label: t('talks.sorts.long') },
  ];
  return (
    <Screen>
      <TopBar title={(category && category.label) || t('talks.contentFallback')} onBack={onBack} right={<IconButton icon="search" />} />
      <div style={{ padding: '4px 16px 12px' }}>
        <FilterPills items={sorts} active={sort} onChange={setSort} />
      </div>
      <ScrollArea padding="0 16px 12px">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {CONTENT_LIST.map(c => (
            <button key={c.id} onClick={() => onOpenContent && onOpenContent(c)}
              style={{
                width: '100%', background: '#fff', border: 0, padding: 12, borderRadius: 18,
                boxShadow: 'var(--shadow-soft)', cursor: 'pointer', textAlign: 'left',
                display: 'flex', gap: 14, alignItems: 'center',
              }}>
              <div style={{ position: 'relative', flex: '0 0 auto' }}>
                <ImageTile tint={c.tint} icon={c.icon} size={92} radius={14} />
                <div style={{
                  position: 'absolute', bottom: 6, right: 6,
                  width: 28, height: 28, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(6px)',
                  color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon name="play_arrow" size={18} filled />
                </div>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <Chip variant="soft" size="sm">{c.kind === 'audio' ? t('common.audio') : t('common.video')}</Chip>
                <h4 style={{ font: '700 15px/1.3 var(--font-display)', color: 'var(--fg-1)', margin: '8px 0 6px' }}>{t('data.talks.' + c.titleKey)}</h4>
                <div style={{ font: '400 12px var(--font-body)', color: 'var(--fg-3)' }}>{t('data.speakers.' + c.speakerKey)} · {t('common.minutes', { n: c.durMin })}</div>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
      <BottomNav active="talks" onNavigate={onNavigate} />
    </Screen>
  );
}

// ═══ 18. Content details ════════════════════════════════════════════
function ContentDetailsScreen({ content, onBack, onNavigate, onAddToPlaylist }) {
  const { t } = useI18n();
  const [saved, setSaved] = useStateTalks(false);
  const [playing, setPlaying] = useStateTalks(false);
  const c = content || { tint: 'forest', icon: 'spa', kind: 'video', titleKey: 'doiCanh', speakerKey: 'minhNiem', durMin: 42 };
  const isAudio = c.kind === 'audio';
  const title = c.titleKey ? t('data.talks.' + c.titleKey) : c.title;
  const speaker = c.speakerKey ? t('data.speakers.' + c.speakerKey) : c.speaker;
  const duration = c.durMin ? t('common.minutes', { n: c.durMin }) : c.duration;
  const typeLabel = isAudio ? t('common.audio') : t('common.video');
  const tints = {
    forest: 'linear-gradient(135deg, #7FCB94, #2E8A53)',
    ocean: 'linear-gradient(135deg, #6FD5E7, #0098B6)',
    sunset: 'linear-gradient(135deg, #FFD08A, #F77B3A)',
    dusk: 'linear-gradient(135deg, #B4C9FF, #5B6FE0)',
    plum: 'linear-gradient(135deg, #E8D8F2, #B68AD8)',
    sky: 'linear-gradient(135deg, #BBE6FA, #4FC3F7)',
  };
  return (
    <Screen>
      <TopBar onBack={onBack} title={t('talks.details.title')} right={<><IconButton icon="share" /><IconButton icon={saved ? 'bookmark' : 'bookmark_border'} onClick={() => setSaved(!saved)} color={saved ? 'var(--accent-warm)' : undefined} filled={saved} /></>} />
      <ScrollArea padding="0 0 24px">
        {/* Player area */}
        {!isAudio ? (
          <div style={{
            margin: '8px 16px 18px', height: 210, borderRadius: 22, overflow: 'hidden',
            background: tints[c.tint] || tints.forest, position: 'relative',
          }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 40%, rgba(255,255,255,0.18), transparent 55%)' }} />
            <Icon name={c.icon} size={140} style={{ position: 'absolute', right: -10, bottom: -16, color: 'rgba(255,255,255,0.22)' }} filled />
            <button onClick={() => setPlaying(!playing)} style={{
              position: 'absolute', inset: 0, margin: 'auto',
              width: 72, height: 72, borderRadius: '50%',
              background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(10px)',
              border: '1.5px solid rgba(255,255,255,0.4)',
              color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            }}>
              <Icon name={playing ? 'pause' : 'play_arrow'} size={40} filled />
            </button>
            <div style={{ position: 'absolute', left: 16, right: 16, bottom: 14, display: 'flex', alignItems: 'center', gap: 10, color: '#fff' }}>
              <span style={{ font: '600 12px var(--font-body)' }}>00:00</span>
              <div style={{ flex: 1, height: 4, background: 'rgba(255,255,255,0.28)', borderRadius: 2 }}>
                <div style={{ width: '12%', height: '100%', background: '#fff', borderRadius: 2 }} />
              </div>
              <span style={{ font: '600 12px var(--font-body)' }}>{duration}</span>
            </div>
          </div>
        ) : (
          <div style={{ margin: '8px 16px 18px' }}>
            <AudioPlayer tint={c.tint} title={title} duration={duration} playing={playing} onTogglePlay={() => setPlaying(!playing)} />
          </div>
        )}

        <div style={{ padding: '0 16px' }}>
          <Chip variant="soft" size="sm">{typeLabel}</Chip>
          <h1 style={{ font: '700 24px/1.25 var(--font-display)', color: 'var(--fg-1)', margin: '12px 0 6px', letterSpacing: '-0.01em' }}>{title}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--fg-3)', font: '500 13px var(--font-body)', marginBottom: 18 }}>
            <Icon name="person" size={16} color="var(--primary)" />{speaker}
            <span>•</span>
            <Icon name="schedule" size={16} color="var(--primary)" />{duration}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 22 }}>
            <ActionPill icon={playing ? 'pause' : 'play_arrow'} label={playing ? t('talks.details.pause') : t('talks.details.play')} onClick={() => setPlaying(!playing)} primary />
            <ActionPill icon={saved ? 'bookmark' : 'bookmark_border'} label={t('talks.details.save')} onClick={() => setSaved(!saved)} active={saved} />
            <ActionPill icon="playlist_add" label={t('talks.details.playlist')} onClick={onAddToPlaylist} />
            <ActionPill icon="share" label={t('talks.details.share')} />
          </div>

          <h3 style={{ font: '700 16px var(--font-display)', color: 'var(--fg-1)', margin: '0 0 8px' }}>{t('talks.details.about')}</h3>
          <p style={{ font: '400 14px/1.65 var(--font-body)', color: 'var(--fg-2)', margin: '0 0 14px' }}>
            {t('talks.details.aboutText')}
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
            <Chip variant="plain">{t('talks.details.tag1')}</Chip>
            <Chip variant="plain">{t('talks.details.tag2')}</Chip>
            <Chip variant="plain">{t('talks.details.tag3')}</Chip>
          </div>

          <SectionHeader title={t('talks.details.related')} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <AudioRow tint="ocean" title={t('data.talks.troVe')} speaker={t('data.speakers.minhNiem')} duration="22:14" />
            <AudioRow tint="plum" title={t('data.talks.langNgheTim')} speaker={t('data.speakers.minhNiem')} duration="15:42" />
          </div>
        </div>
      </ScrollArea>
      <BottomNav active="talks" onNavigate={onNavigate} />
    </Screen>
  );
}

function ActionPill({ icon, label, onClick, primary, active }) {
  return (
    <button onClick={onClick} style={{
      background: primary ? 'var(--primary)' : active ? 'var(--accent-warm-soft)' : '#fff',
      color: primary ? '#fff' : active ? 'var(--accent-warm)' : 'var(--fg-1)',
      border: primary ? 0 : '1px solid var(--outline-soft)',
      borderRadius: 14, padding: '10px 4px',
      cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
      font: '600 11px var(--font-body)',
      boxShadow: primary ? '0 6px 16px rgba(0,99,132,0.20)' : 'none',
    }}>
      <Icon name={icon} size={20} filled={primary || active} />
      {label}
    </button>
  );
}

// ─── Audio player (waveform-style placeholder) ─────────────────────
function AudioPlayer({ tint = 'ocean', title, duration, playing, onTogglePlay }) {
  const tints = {
    ocean: 'linear-gradient(135deg, #6FD5E7, #0098B6)',
    forest: 'linear-gradient(135deg, #7FCB94, #2E8A53)',
    plum: 'linear-gradient(135deg, #C7A8E1, #7A52B0)',
    sunset: 'linear-gradient(135deg, #FFC78A, #FF7A3A)',
    sand: 'linear-gradient(135deg, #FFD08A, #E08A34)',
  };
  return (
    <div style={{
      background: tints[tint] || tints.ocean, borderRadius: 22, padding: '22px 20px',
      color: '#fff', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.18), transparent 50%)' }} />
      {/* waveform */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 3, height: 56, marginBottom: 18 }}>
        {Array.from({ length: 44 }).map((_, i) => {
          const h = 8 + Math.abs(Math.sin(i * 0.5) * 38) + (i % 5) * 4;
          const past = i < 12;
          return <div key={i} style={{ flex: 1, height: Math.min(h, 52), borderRadius: 2, background: past ? '#fff' : 'rgba(255,255,255,0.32)' }} />;
        })}
      </div>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, font: '500 12px var(--font-body)', opacity: 0.85 }}>
        <span>03:24</span>
        <span>{duration || '18:30'}</span>
      </div>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 22 }}>
        <button style={{ background: 'transparent', border: 0, color: '#fff', cursor: 'pointer' }}><Icon name="replay_10" size={28} /></button>
        <button onClick={onTogglePlay} style={{
          width: 60, height: 60, borderRadius: '50%',
          background: '#fff', border: 0, color: tints[tint] ? '#1A2540' : 'var(--primary)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          boxShadow: '0 8px 22px rgba(0,0,0,0.22)',
        }}>
          <Icon name={playing ? 'pause' : 'play_arrow'} size={32} filled />
        </button>
        <button style={{ background: 'transparent', border: 0, color: '#fff', cursor: 'pointer' }}><Icon name="forward_10" size={28} /></button>
      </div>
    </div>
  );
}

// ═══ 19. Saved / Bookmarks ═════════════════════════════════════════
function SavedContentScreen({ onBack, onOpenContent, onNavigate }) {
  const { t } = useI18n();
  const [tab, setTab] = useStateTalks('all');
  const tabs = [
    { key: 'all', label: t('talks.saved.tabAll') },
    { key: 'video', label: t('talks.filters.video') },
    { key: 'audio', label: t('talks.filters.audio') },
  ];
  const saved = [
    { id: 's1', tint: 'forest', icon: 'spa',        kind: 'video', titleKey: 'doiCanh',         speakerKey: 'minhNiem', durMin: 42 },
    { id: 's2', tint: 'ocean',  icon: 'headphones', kind: 'audio', titleKey: 'troVe',           speakerKey: 'minhNiem', durMin: 22 },
    { id: 's3', tint: 'plum',   icon: 'favorite',   kind: 'video', titleKey: 'langNgheTimMinh', speakerKey: 'minhNiem', durMin: 35 },
  ];
  const list = tab === 'video' ? saved.filter(s => s.kind === 'video')
            : tab === 'audio' ? saved.filter(s => s.kind === 'audio')
            : saved;
  return (
    <Screen>
      <TopBar title={t('talks.saved.title')} onBack={onBack} />
      <div style={{ padding: '4px 16px 12px' }}>
        <SegmentedTabs items={tabs} active={tab} onChange={setTab} />
      </div>
      <ScrollArea padding="0 16px 12px">
        {list.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {list.map(c => (
              <button key={c.id} onClick={() => onOpenContent && onOpenContent(c)}
                style={{
                  width: '100%', background: '#fff', border: 0, padding: 12, borderRadius: 18,
                  boxShadow: 'var(--shadow-soft)', cursor: 'pointer', textAlign: 'left',
                  display: 'flex', gap: 14, alignItems: 'center',
                }}>
                <ImageTile tint={c.tint} icon={c.icon} size={84} radius={14} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <Chip variant="soft" size="sm">{c.kind === 'audio' ? t('common.audio') : t('common.video')}</Chip>
                  <h4 style={{ font: '700 15px/1.3 var(--font-display)', color: 'var(--fg-1)', margin: '8px 0 6px' }}>{t('data.talks.' + c.titleKey)}</h4>
                  <div style={{ font: '400 12px var(--font-body)', color: 'var(--fg-3)' }}>{t('data.speakers.' + c.speakerKey)} · {t('common.minutes', { n: c.durMin })}</div>
                </div>
                <Icon name="bookmark" size={20} color="var(--accent-warm)" filled />
              </button>
            ))}
          </div>
        ) : (
          <EmptyState icon="bookmark_border" title={t('talks.saved.emptyTitle')} message={t('talks.saved.emptyMsg')} action={t('talks.saved.emptyAction')} onAction={() => onNavigate && onNavigate('talks')} />
        )}
      </ScrollArea>
      <BottomNav active="talks" onNavigate={onNavigate} />
    </Screen>
  );
}

// ═══ 20. Playlists list ════════════════════════════════════════════
function PlaylistsScreen({ onBack, onOpenPlaylist, onNavigate }) {
  const { t } = useI18n();
  const playlists = [
    { id: 'p1', tint: 'sky',    icon: 'wb_sunny',   title: t('talks.playlists.morning'), count: 8 },
    { id: 'p2', tint: 'dusk',   icon: 'nightlight', title: t('talks.playlists.beforeSleep'), count: 6 },
    { id: 'p3', tint: 'sunset', icon: 'favorite',   title: t('talks.playlists.favorites'), count: 14 },
  ];
  return (
    <Screen>
      <TopBar title={t('talks.playlists.title')} onBack={onBack} right={<IconButton icon="add" />} />
      <ScrollArea padding="8px 16px 12px">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {playlists.map(p => (
            <button key={p.id} onClick={() => onOpenPlaylist && onOpenPlaylist(p)}
              style={{
                width: '100%', background: '#fff', border: 0, padding: 14, borderRadius: 18,
                boxShadow: 'var(--shadow-soft)', cursor: 'pointer', textAlign: 'left',
                display: 'flex', gap: 14, alignItems: 'center',
              }}>
              <ImageTile tint={p.tint} icon={p.icon} size={72} radius={14} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <h4 style={{ font: '700 16px/1.3 var(--font-display)', color: 'var(--fg-1)', margin: '0 0 6px' }}>{p.title}</h4>
                <div style={{ font: '400 13px var(--font-body)', color: 'var(--fg-3)' }}>{t('common.items', { n: p.count })}</div>
              </div>
              <Icon name="chevron_right" size={22} color="var(--fg-3)" />
            </button>
          ))}
          <button style={{
            background: 'transparent', border: '1.5px dashed var(--outline-soft)',
            borderRadius: 18, padding: 18, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            color: 'var(--primary)', font: '600 14px var(--font-body)',
          }}>
            <Icon name="add" size={20} />{t('talks.playlists.createNew')}
          </button>
        </div>
      </ScrollArea>
      <BottomNav active="talks" onNavigate={onNavigate} />
    </Screen>
  );
}

// ═══ 21. Playlist details ══════════════════════════════════════════
function PlaylistDetailsScreen({ playlist, onBack, onOpenContent, onNavigate }) {
  const { t } = useI18n();
  const p = playlist || { tint: 'sky', icon: 'wb_sunny', title: t('talks.playlists.morning'), count: 8 };
  const items = [
    { id: 'pi1', tint: 'ocean',  kind: 'audio', titleKey: 'moMat',    speakerKey: 'minhNiem', duration: '08:10' },
    { id: 'pi2', tint: 'forest', kind: 'audio', titleKey: 'buocChan', speakerKey: 'minhNiem', duration: '12:24' },
    { id: 'pi3', tint: 'sunset', kind: 'audio', titleKey: 'lyTra',    speakerKey: 'minhNiem', duration: '06:48' },
    { id: 'pi4', tint: 'plum',   kind: 'audio', titleKey: 'quayVe',   speakerKey: 'minhNiem', duration: '15:02' },
  ];
  return (
    <Screen>
      <TopBar onBack={onBack} right={<IconButton icon="more_vert" />} />
      <ScrollArea padding="0 16px 12px">
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, padding: '8px 4px 20px' }}>
          <ImageTile tint={p.tint} icon={p.icon} size={108} radius={20} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ font: '700 11px var(--font-body)', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--fg-3)', marginBottom: 6 }}>{t('talks.playlists.label')}</div>
            <h1 style={{ font: '700 22px/1.2 var(--font-display)', color: 'var(--fg-1)', margin: '0 0 6px', letterSpacing: '-0.01em' }}>{p.title}</h1>
            <div style={{ font: '500 13px var(--font-body)', color: 'var(--fg-3)' }}>{t('talks.playlists.meta', { n: items.length })}</div>
          </div>
        </div>
        <p style={{ font: '400 14px/1.55 var(--font-body)', color: 'var(--fg-2)', margin: '0 0 16px' }}>
          {t('talks.playlists.desc')}
        </p>
        <PrimaryButton icon="play_arrow" onClick={() => onOpenContent && onOpenContent(items[0])}>{t('talks.playlists.playAll')}</PrimaryButton>
        <div style={{ height: 18 }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {items.map((it, i) => (
            <button key={it.id} onClick={() => onOpenContent && onOpenContent(it)}
              style={{
                width: '100%', background: '#fff', border: 0, padding: 12, borderRadius: 14,
                cursor: 'pointer', textAlign: 'left',
                display: 'flex', gap: 14, alignItems: 'center',
                boxShadow: '0 2px 8px rgba(7,29,48,0.04)',
              }}>
              <div style={{ width: 28, font: '700 14px var(--font-display)', color: 'var(--fg-3)', textAlign: 'center' }}>{i + 1}</div>
              <ImageTile tint={it.tint} size={48} radius={10} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ font: '700 14px/1.3 var(--font-display)', color: 'var(--fg-1)' }}>{t('data.talks.' + it.titleKey)}</div>
                <div style={{ font: '400 12px var(--font-body)', color: 'var(--fg-3)', marginTop: 2 }}>{t('data.speakers.' + it.speakerKey)} · {it.duration}</div>
              </div>
              <Icon name="play_circle" size={28} color="var(--primary)" filled />
            </button>
          ))}
        </div>
      </ScrollArea>
      <BottomNav active="talks" onNavigate={onNavigate} />
    </Screen>
  );
}

Object.assign(window, {
  TalksLibraryScreen, ContentListScreen, ContentDetailsScreen,
  SavedContentScreen, PlaylistsScreen, PlaylistDetailsScreen,
  AudioPlayer,
});
