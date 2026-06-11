/* global React, useI18n, Icon, PrimaryButton, SecondaryButton, TextButton,
   Toggle, Chip, FilterPills,
   TopBar, IconButton, BottomNav, SectionHeader,
   ListRow, Card, EmptyState, ImageTile, Dot, Screen, ScrollArea */

const { useState: useStateNotif } = React;

// ═══ 22. Notifications list ════════════════════════════════════════
// Structural data — titles, messages and times live in the i18n dictionary
// under notif.data.<id>.
const NOTIFICATIONS = [
  { id: 'n1', kind: 'event',  icon: 'event_note',   iconBg: '#FFDCC7', iconColor: '#B85B00', unread: true },
  { id: 'n2', kind: 'talk',   icon: 'spa',          iconBg: '#C1E8FF', iconColor: '#006384', unread: true },
  { id: 'n3', kind: 'event',  icon: 'check_circle', iconBg: '#D7F0D7', iconColor: '#2E7D32', unread: false },
  { id: 'n4', kind: 'system', icon: 'campaign',     iconBg: '#EEF4FF', iconColor: '#006384', unread: false },
  { id: 'n5', kind: 'talk',   icon: 'queue_music',  iconBg: '#DCD0E8', iconColor: '#5C3F86', unread: false },
];

function NotificationsScreen({ onBack, onOpenNotif, onSettings, onNavigate }) {
  const { t } = useI18n();
  const [filter, setFilter] = useStateNotif('all');
  const filters = [
    { key: 'all', label: t('notif.filters.all') },
    { key: 'event', label: t('notif.filters.event') },
    { key: 'talk', label: t('notif.filters.talk') },
    { key: 'system', label: t('notif.filters.system') },
  ];
  const list = filter === 'all' ? NOTIFICATIONS : NOTIFICATIONS.filter(n => n.kind === filter);
  return (
    <Screen>
      <TopBar title={t('notif.title')} onBack={onBack} right={<IconButton icon="tune" onClick={onSettings} />} />
      <div style={{ padding: '4px 16px 12px' }}>
        <FilterPills items={filters} active={filter} onChange={setFilter} />
      </div>
      <ScrollArea padding="0 16px 12px">
        {list.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {list.map(n => {
              const d = t('notif.data.' + n.id);
              return (
              <button key={n.id} onClick={() => onOpenNotif && onOpenNotif(n)}
                style={{
                  width: '100%', background: n.unread ? '#fff' : '#FAFBFF',
                  border: 0, padding: 14, borderRadius: 16,
                  boxShadow: n.unread ? 'var(--shadow-soft)' : 'none',
                  cursor: 'pointer', textAlign: 'left',
                  display: 'flex', gap: 12, alignItems: 'flex-start',
                  position: 'relative',
                }}>
                <span style={{
                  width: 40, height: 40, borderRadius: 12, flex: '0 0 auto',
                  background: n.iconBg, color: n.iconColor,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon name={n.icon} size={22} filled />
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <h4 style={{ font: '700 14px/1.35 var(--font-display)', color: 'var(--fg-1)', margin: 0, flex: 1 }}>{d.title}</h4>
                    {n.unread && <Dot color="var(--accent-warm)" />}
                  </div>
                  <p style={{ font: '400 13px/1.5 var(--font-body)', color: 'var(--fg-2)', margin: '4px 0 6px' }}>{d.message}</p>
                  <div style={{ font: '500 11px var(--font-body)', color: 'var(--fg-3)' }}>{d.time}</div>
                </div>
              </button>
              );
            })}
          </div>
        ) : (
          <EmptyState icon="notifications_off" title={t('notif.emptyTitle')} />
        )}
      </ScrollArea>
      <BottomNav active="home" onNavigate={onNavigate} />
    </Screen>
  );
}

// ═══ 23. Notification details ══════════════════════════════════════
function NotificationDetailsScreen({ notif, onBack, onAction, onNavigate }) {
  const { t } = useI18n();
  const n = notif || NOTIFICATIONS[0];
  const d = t('notif.data.' + n.id);
  const actionLabel = n.kind === 'event' ? t('notif.details.viewEvent') : n.kind === 'talk' ? t('notif.details.viewTalk') : t('notif.details.openDetails');
  return (
    <Screen>
      <TopBar title={t('notif.details.title')} onBack={onBack} />
      <ScrollArea padding="0 16px 24px">
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          padding: '16px 0 22px', textAlign: 'center', gap: 14,
        }}>
          <span style={{
            width: 80, height: 80, borderRadius: 22,
            background: n.iconBg, color: n.iconColor,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon name={n.icon} size={40} filled />
          </span>
          <h1 style={{ font: '700 22px/1.3 var(--font-display)', color: 'var(--fg-1)', margin: 0, letterSpacing: '-0.01em' }}>{d.title}</h1>
          <div style={{ font: '500 12px var(--font-body)', color: 'var(--fg-3)' }}>{d.time}</div>
        </div>

        <div style={{
          background: '#fff', borderRadius: 20, padding: 20,
          boxShadow: 'var(--shadow-soft)', marginBottom: 18,
        }}>
          <p style={{ font: '400 15px/1.7 var(--font-body)', color: 'var(--fg-2)', margin: 0 }}>
            {d.message}{t('notif.details.extra')}
          </p>
          {n.kind === 'event' && (
            <div style={{ marginTop: 16, padding: 14, background: '#EEF4FF', borderRadius: 14 }}>
              <div style={{ font: '700 11px var(--font-body)', letterSpacing: '0.18em', color: 'var(--fg-3)', marginBottom: 4 }}>{t('notif.details.eventLabel')}</div>
              <div style={{ font: '700 15px var(--font-display)', color: 'var(--fg-1)' }}>{t('events.data.tay-phat.title')}</div>
              <div style={{ font: '500 12px var(--font-body)', color: 'var(--fg-3)', marginTop: 2 }}>{t('notif.details.eventMeta')}</div>
            </div>
          )}
        </div>

        <PrimaryButton icon="arrow_forward" onClick={onAction}>{actionLabel}</PrimaryButton>
      </ScrollArea>
      <BottomNav active="home" onNavigate={onNavigate} />
    </Screen>
  );
}

// ═══ 24. Notification settings ═════════════════════════════════════
function NotificationSettingsScreen({ onBack, onNavigate }) {
  const { t } = useI18n();
  const [vals, setVals] = useStateNotif({
    eventReminders: true,
    newTalks: true,
    community: true,
    system: false,
    quietHours: true,
  });
  const set = k => v => setVals({ ...vals, [k]: v });
  return (
    <Screen>
      <TopBar title={t('notif.settings.title')} onBack={onBack} />
      <ScrollArea padding="8px 16px 24px">
        <p style={{ font: '400 14px/1.55 var(--font-body)', color: 'var(--fg-2)', margin: '0 0 18px' }}>
          {t('notif.settings.intro')}
        </p>

        <SettingsCard>
          <SettingsItem icon="event_note" iconBg="#FFDCC7" iconColor="#B85B00"
            title={t('notif.settings.eventReminders')} subtitle={t('notif.settings.eventRemindersSub')}
            right={<Toggle on={vals.eventReminders} onChange={set('eventReminders')} />} />
          <Divider />
          <SettingsItem icon="spa" iconBg="#C1E8FF" iconColor="#006384"
            title={t('notif.settings.newTalks')} subtitle={t('notif.settings.newTalksSub')}
            right={<Toggle on={vals.newTalks} onChange={set('newTalks')} />} />
          <Divider />
          <SettingsItem icon="groups" iconBg="#D7F0D7" iconColor="#2E7D32"
            title={t('notif.settings.community')} subtitle={t('notif.settings.communitySub')}
            right={<Toggle on={vals.community} onChange={set('community')} />} />
          <Divider />
          <SettingsItem icon="campaign" iconBg="#EEF4FF" iconColor="#006384"
            title={t('notif.settings.system')} subtitle={t('notif.settings.systemSub')}
            right={<Toggle on={vals.system} onChange={set('system')} />} />
        </SettingsCard>

        <div style={{ marginTop: 22 }}>
          <SectionHeader title={t('notif.settings.dnd')} />
          <SettingsCard>
            <SettingsItem icon="bedtime" iconBg="#DCD0E8" iconColor="#5C3F86"
              title={t('notif.settings.quietHours')} subtitle={t('notif.settings.quietHoursSub')}
              right={<Toggle on={vals.quietHours} onChange={set('quietHours')} />} />
          </SettingsCard>
        </div>
      </ScrollArea>
      <BottomNav active="home" onNavigate={onNavigate} />
    </Screen>
  );
}

function SettingsCard({ children }) {
  return (
    <div style={{
      background: '#fff', borderRadius: 18, overflow: 'hidden',
      boxShadow: 'var(--shadow-soft)',
    }}>{children}</div>
  );
}

function SettingsItem({ icon, iconBg, iconColor, title, subtitle, right, onClick, danger }) {
  return (
    <div onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: 14, padding: 14,
      cursor: onClick ? 'pointer' : 'default',
    }}>
      {icon && (
        <span style={{
          width: 40, height: 40, borderRadius: 12, flex: '0 0 auto',
          background: iconBg || '#EEF4FF', color: danger ? 'var(--error)' : (iconColor || 'var(--primary)'),
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name={icon} size={22} filled />
        </span>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ font: '600 15px var(--font-body)', color: danger ? 'var(--error)' : 'var(--fg-1)' }}>{title}</div>
        {subtitle && <div style={{ font: '400 13px var(--font-body)', color: 'var(--fg-3)', marginTop: 2 }}>{subtitle}</div>}
      </div>
      {right !== undefined ? right : (onClick && <Icon name="chevron_right" size={20} color="var(--fg-3)" />)}
    </div>
  );
}

function Divider() {
  return <div style={{ height: 1, background: 'rgba(190,200,207,0.4)', marginLeft: 68 }} />;
}

Object.assign(window, {
  NotificationsScreen, NotificationDetailsScreen, NotificationSettingsScreen,
  SettingsCard, SettingsItem, Divider,
});
