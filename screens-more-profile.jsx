/* global React, useI18n, Icon, PrimaryButton, SecondaryButton, TextButton,
   TextField, TextArea, Toggle, Chip, FilterPills, SegmentedTabs,
   TopBar, IconButton, BottomNav, SectionHeader,
   ListRow, Card, EmptyState, ImageTile, Screen, ScrollArea,
   SettingsCard, SettingsItem, Divider */

const { useState: useStateMore } = React;

// ═══ 25. More menu ══════════════════════════════════════════════════
function MoreScreen({ onCheckin, onContact, onCourses, onSaved, onPlaylists, onMyEvents, onSettings, onPrivacy, onSupport, onAbout, onProfile, onNotifications, onNavigate }) {
  const { t } = useI18n();
  return (
    <Screen>
      <TopBar title={t('more.title')} right={<><IconButton icon="notifications" badge={2} onClick={onNotifications} /><IconButton icon="account_circle" onClick={onProfile} /></>} />
      <ScrollArea padding="4px 16px 24px">
        <p style={{ font: '400 14px/1.55 var(--font-body)', color: 'var(--fg-2)', margin: '0 0 18px' }}>
          {t('more.intro')}
        </p>

        <SectionHeader title={t('more.otherFeatures')} />
        <SettingsCard>
          <SettingsItem icon="qr_code_scanner" iconBg="#C1E8FF" iconColor="#006384" title={t('more.checkin')} subtitle={t('more.checkinSub')} onClick={onCheckin} />
          <Divider />
          <SettingsItem icon="chat_bubble" iconBg="#FFDCC7" iconColor="#B85B00" title={t('more.contact')} subtitle={t('more.contactSub')} onClick={onContact} />
        </SettingsCard>


        <div style={{ height: 26 }} />
        <SectionHeader title={t('more.upcoming')} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <ComingSoonTile icon="self_improvement" label={t('more.tileMeditation')} tint="mint" />
          <ComingSoonTile icon="edit_note" label={t('more.tileJournal')} tint="sand" />
          <ComingSoonTile icon="groups" label={t('more.tileBell')} tint="sky" />
          <ComingSoonTile icon="school" label={t('more.tileQA')} tint="plum" />
        </div>
      </ScrollArea>
      <BottomNav active="more" onNavigate={onNavigate} />
    </Screen>
  );
}

function ComingSoonTile({ icon, label, tint }) {
  const { t } = useI18n();
  return (
    <div style={{
      background: '#fff', padding: 14, borderRadius: 18, boxShadow: 'var(--shadow-soft)',
      display: 'flex', flexDirection: 'column', gap: 10, minHeight: 110, position: 'relative',
    }}>
      <ImageTile tint={tint} icon={icon} size={48} radius={12} />
      <div style={{ flex: 1 }} />
      <div style={{ font: '700 13px/1.3 var(--font-display)', color: 'var(--fg-1)' }}>{label}</div>
      <div style={{
        position: 'absolute', top: 10, right: 10,
        padding: '3px 8px', borderRadius: 9999,
        background: '#FFDCC7', color: '#723600',
        font: '700 9px var(--font-body)', letterSpacing: '0.1em', textTransform: 'uppercase',
      }}>{t('common.comingSoon')}</div>
    </div>
  );
}

// ═══ 26. Contact ════════════════════════════════════════════════════
function ContactScreen({ onBack, onSubmit, onNavigate }) {
  const { t } = useI18n();
  const [vals, setVals] = useStateMore({ name: '', email: '', body: '' });
  const [sent, setSent] = useStateMore(false);
  const set = k => v => setVals({ ...vals, [k]: v });
  const submit = () => setSent(true);
  return (
    <Screen>
      <TopBar title={t('contact.title')} onBack={onBack} />
      <ScrollArea padding="8px 16px 24px">
        <p style={{ font: '400 14px/1.55 var(--font-body)', color: 'var(--fg-2)', margin: '0 0 18px' }}>
          {t('contact.intro')}
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
          <ContactTile icon="mail" label={t('contact.email')} sub="hello@mientinhthuc.vn" color="#006384" tint="#EEF4FF" />
          <ContactTile icon="call" label={t('contact.call')} sub="0901 234 567" color="#2E7D32" tint="#D7F0D7" />
          <ContactTile icon="forum" label={t('contact.zalo')} sub="@mientinhthuc" color="#0084FF" tint="#D8ECFF" />
          <ContactTile icon="chat" label={t('contact.viber')} sub={t('contact.viberSub')} color="#7360F2" tint="#EAE2FF" />
          <ContactTile icon="language" label={t('contact.website')} sub="mientinhthuc.vn" color="#B85B00" tint="#FFDCC7" />
          <ContactTile icon="facebook" label={t('contact.facebook')} sub="/mientinhthuc" color="#1877F2" tint="#D8ECFF" />
        </div>
        <SectionHeader title={t('contact.formTitle')} />
        {sent ? (
          <div style={{ background: '#fff', borderRadius: 20, padding: 22, boxShadow: 'var(--shadow-soft)', textAlign: 'center' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(46,125,50,0.10)', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="check_circle" size={40} color="var(--success)" filled />
            </div>
            <h3 style={{ font: '700 18px var(--font-display)', color: 'var(--fg-1)', margin: '0 0 6px' }}>{t('contact.sentTitle')}</h3>
            <p style={{ font: '400 14px/1.55 var(--font-body)', color: 'var(--fg-2)', margin: 0 }}>
              {t('contact.sentMsg')}
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <TextField label={t('contact.name')} value={vals.name} onChange={set('name')} placeholder="Nguyễn An Nhiên" />
            <TextField label={t('contact.emailField')} value={vals.email} onChange={set('email')} type="email" placeholder="annhien@example.com" />
            <TextArea label={t('contact.body')} value={vals.body} onChange={set('body')} placeholder={t('contact.bodyPlaceholder')} rows={5} />
            <PrimaryButton onClick={submit}>{t('contact.submit')}</PrimaryButton>
          </div>
        )}
      </ScrollArea>
      <BottomNav active="more" onNavigate={onNavigate} />
    </Screen>
  );
}

function ContactTile({ icon, label, sub, color, tint }) {
  return (
    <button style={{
      background: '#fff', border: 0, padding: 14, borderRadius: 16, cursor: 'pointer',
      boxShadow: 'var(--shadow-soft)', textAlign: 'left',
      display: 'flex', flexDirection: 'column', gap: 8, minHeight: 110,
    }}>
      <div style={{ width: 40, height: 40, borderRadius: 12, background: tint, color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon name={icon} size={22} filled />
      </div>
      <div style={{ flex: 1 }} />
      <div style={{ font: '700 14px var(--font-display)', color: 'var(--fg-1)' }}>{label}</div>
      <div style={{ font: '500 12px var(--font-body)', color: 'var(--fg-3)' }}>{sub}</div>
    </button>
  );
}

// ═══ 27. Profile ════════════════════════════════════════════════════
function ProfileScreen({ onBack, onViewProfile, onSaved, onPlaylists, onMyEvents, onSettings, onPrivacy, onSupport, onAbout, onLogout, onNavigate }) {
  const { t } = useI18n();
  return (
    <Screen>
      <TopBar title={t('profile.title')} onBack={onBack} />
      <ScrollArea padding="8px 16px 24px">
        <div style={{
          background: '#fff', borderRadius: 22, padding: 18, boxShadow: 'var(--shadow-card)',
          display: 'flex', gap: 14, alignItems: 'center', marginBottom: 22,
        }}>
          <div style={{
            width: 64, height: 64, borderRadius: '50%',
            background: 'linear-gradient(135deg, #E57321, #B85B00)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', font: '700 22px var(--font-display)',
            boxShadow: '0 6px 14px rgba(229,115,33,0.30)',
          }}>A</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h2 style={{ font: '700 19px var(--font-display)', color: 'var(--fg-1)', margin: '0 0 4px' }}>An Nhiên</h2>
            <div style={{ font: '500 13px var(--font-body)', color: 'var(--fg-3)' }}>annhien@example.com</div>
          </div>
          <button onClick={onViewProfile} style={{
            background: '#EEF4FF', border: 0, padding: '8px 14px', borderRadius: 12,
            color: 'var(--primary)', font: '700 13px var(--font-body)', cursor: 'pointer',
          }}>{t('profile.viewProfile')}</button>
        </div>

        <SettingsCard>
          <SettingsItem icon="person" iconBg="#EEF4FF" title={t('profile.personal')} onClick={onViewProfile} />
          <Divider />
          <SettingsItem icon="bookmark" iconBg="#FFE5D0" iconColor="#E57321" title={t('profile.savedContent')} onClick={onSaved} />
          <Divider />
          <SettingsItem icon="queue_music" iconBg="#C1E8FF" iconColor="#006384" title={t('profile.playlists')} onClick={onPlaylists} />
          <Divider />
          <SettingsItem icon="event_available" iconBg="#D7F0D7" iconColor="#2E7D32" title={t('profile.myQR')} onClick={onMyEvents} />
        </SettingsCard>

        <div style={{ height: 18 }} />
        <SettingsCard>
          <SettingsItem icon="settings" title={t('profile.settings')} onClick={onSettings} />
          <Divider />
          <SettingsItem icon="privacy_tip" title={t('profile.privacy')} onClick={onPrivacy} />
          <Divider />
          <SettingsItem icon="help_outline" title={t('profile.support')} onClick={onSupport} />
          <Divider />
          <SettingsItem icon="info" title={t('profile.aboutApp')} onClick={onAbout} />
        </SettingsCard>

        <div style={{ height: 18 }} />
        <SettingsCard>
          <SettingsItem icon="logout" iconBg="#FFDAD6" iconColor="var(--error)" title={t('profile.logout')} danger onClick={onLogout} />
        </SettingsCard>
      </ScrollArea>
      <BottomNav active="more" onNavigate={onNavigate} />
    </Screen>
  );
}

// ═══ 28. View profile ══════════════════════════════════════════════
function ViewProfileScreen({ onBack, onEdit, onNavigate }) {
  const { t } = useI18n();
  return (
    <Screen>
      <TopBar title={t('profile.personal')} onBack={onBack} right={<IconButton icon="edit" onClick={onEdit} />} />
      <ScrollArea padding="16px 16px 24px">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, padding: '12px 0 22px' }}>
          <div style={{
            width: 96, height: 96, borderRadius: '50%',
            background: 'linear-gradient(135deg, #E57321, #B85B00)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', font: '700 36px var(--font-display)',
            boxShadow: '0 10px 24px rgba(229,115,33,0.30)',
          }}>A</div>
          <h2 style={{ font: '700 22px var(--font-display)', color: 'var(--fg-1)', margin: 0 }}>An Nhiên</h2>
          <div style={{ font: '500 13px var(--font-body)', color: 'var(--fg-3)' }}>{t('profile.memberSince')}</div>
        </div>
        <SettingsCard>
          <ProfileField label={t('profile.fullName')} value="Nguyễn An Nhiên" />
          <Divider />
          <ProfileField label={t('profile.email')} value="annhien@example.com" />
          <Divider />
          <ProfileField label={t('profile.phone')} value="0400 123 456" />
          <Divider />
          <ProfileField label={t('profile.dob')} value="14/08/1990" />
          <Divider />
          <ProfileField label={t('profile.city')} value={t('profile.cityValue')} />
        </SettingsCard>
        <div style={{ height: 18 }} />
        <PrimaryButton icon="edit" onClick={onEdit}>{t('profile.edit')}</PrimaryButton>
      </ScrollArea>
      <BottomNav active="more" onNavigate={onNavigate} />
    </Screen>
  );
}

function ProfileField({ label, value }) {
  return (
    <div style={{ padding: '14px 16px' }}>
      <div style={{ font: '700 10px var(--font-body)', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--fg-3)', marginBottom: 4 }}>{label}</div>
      <div style={{ font: '500 15px var(--font-body)', color: 'var(--fg-1)' }}>{value}</div>
    </div>
  );
}

// ═══ 29. Edit profile ══════════════════════════════════════════════
function EditProfileScreen({ onBack, onSave, onNavigate }) {
  const { t } = useI18n();
  const [vals, setVals] = useStateMore({
    name: 'Nguyễn An Nhiên',
    phone: '0400 123 456',
    city: 'TP. Hồ Chí Minh',
    bio: '',
  });
  const set = k => v => setVals({ ...vals, [k]: v });
  return (
    <Screen>
      <TopBar title={t('profile.editTitle')} onBack={onBack} />
      <ScrollArea padding="12px 16px 24px">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, marginBottom: 22 }}>
          <div style={{ position: 'relative' }}>
            <div style={{
              width: 96, height: 96, borderRadius: '50%',
              background: 'linear-gradient(135deg, #E57321, #B85B00)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', font: '700 36px var(--font-display)',
            }}>A</div>
            <button style={{
              position: 'absolute', bottom: -2, right: -2,
              width: 32, height: 32, borderRadius: '50%',
              background: 'var(--primary)', color: '#fff', border: '3px solid #fff', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}><Icon name="camera_alt" size={16} /></button>
          </div>
          <TextButton>{t('profile.changePhoto')}</TextButton>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <TextField label={t('profile.fullName')} value={vals.name} onChange={set('name')} />
          <TextField label={t('profile.phone')} value={vals.phone} onChange={set('phone')} type="tel" />
          <TextField label={t('profile.city')} value={vals.city} onChange={set('city')} />
          <TextArea label={t('profile.bio')} value={vals.bio} onChange={set('bio')} placeholder={t('profile.bioPlaceholder')} rows={3} />
        </div>

        <div style={{ display: 'flex', gap: 12, marginTop: 22 }}>
          <div style={{ flex: 1 }}><SecondaryButton onClick={onBack}>{t('common.cancel')}</SecondaryButton></div>
          <div style={{ flex: 1 }}><PrimaryButton onClick={onSave}>{t('common.saveChanges')}</PrimaryButton></div>
        </div>
      </ScrollArea>
      <BottomNav active="more" onNavigate={onNavigate} />
    </Screen>
  );
}

// ═══ 30. Settings ═══════════════════════════════════════════════════
function SettingsScreen({ onBack, onNotifSettings, onLogout, onNavigate }) {
  const { t, lang, setLang } = useI18n();
  const [dark, setDark] = useStateMore(false);
  const [showLang, setShowLang] = useStateMore(false);
  const langOptions = [
    { code: 'vi', label: 'Tiếng Việt' },
    { code: 'en', label: 'English' },
  ];
  const currentLangLabel = (langOptions.find(o => o.code === lang) || langOptions[0]).label;
  return (
    <Screen>
      <TopBar title={t('settings.title')} onBack={onBack} />
      <ScrollArea padding="12px 16px 24px">
        <SectionHeader title={t('settings.account')} />
        <SettingsCard>
          <SettingsItem icon="account_circle" title={t('settings.accountRow')} subtitle="annhien@example.com" onClick={() => {}} />
          <Divider />
          <SettingsItem icon="lock" title={t('settings.changePassword')} onClick={() => {}} />
        </SettingsCard>

        <div style={{ height: 22 }} />
        <SectionHeader title={t('settings.appPrefs')} />
        <SettingsCard>
          <SettingsItem icon="language" title={t('settings.language')} right={<span style={{ font: '500 14px var(--font-body)', color: 'var(--fg-3)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>{currentLangLabel} <Icon name="chevron_right" size={18} color="var(--fg-3)" /></span>} onClick={() => setShowLang(true)} />
          <Divider />
          <SettingsItem icon="dark_mode" title={t('settings.darkMode')} right={<Toggle on={dark} onChange={setDark} />} />
          <Divider />
          <SettingsItem icon="notifications" title={t('settings.notifSettings')} onClick={onNotifSettings} />
        </SettingsCard>

        <div style={{ height: 22 }} />
        <SectionHeader title={t('settings.other')} />
        <SettingsCard>
          <SettingsItem icon="cleaning_services" title={t('settings.clearCache')} subtitle="124 MB" onClick={() => {}} />
          <Divider />
          <SettingsItem icon="logout" iconBg="#FFDAD6" iconColor="var(--error)" title={t('settings.logout')} danger onClick={onLogout} />
        </SettingsCard>
      </ScrollArea>

      {/* Language picker — bottom sheet */}
      {showLang && (
        <div onClick={() => setShowLang(false)} style={{
          position: 'absolute', inset: 0, zIndex: 30,
          background: 'rgba(7,29,48,0.35)',
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            background: '#fff', borderRadius: '24px 24px 0 0',
            padding: '14px 16px 40px',
            boxShadow: '0 -10px 30px rgba(7,29,48,0.12)',
          }}>
            <div style={{ width: 40, height: 4, borderRadius: 9999, background: 'rgba(190,200,207,0.7)', margin: '0 auto 14px' }} />
            <h3 style={{ font: '700 18px var(--font-display)', color: 'var(--fg-1)', margin: '0 0 4px' }}>{t('settings.language')}</h3>
            <p style={{ font: '400 13px/1.5 var(--font-body)', color: 'var(--fg-3)', margin: '0 0 14px' }}>{t('settings.languageSheetDesc')}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {langOptions.map(o => {
                const active = lang === o.code;
                return (
                  <button key={o.code} onClick={() => { setLang(o.code); setShowLang(false); }} style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '14px 16px', borderRadius: 14, cursor: 'pointer',
                    background: active ? '#EEF4FF' : '#fff',
                    border: '1.5px solid ' + (active ? 'var(--primary)' : 'var(--outline-soft)'),
                    font: '600 15px var(--font-body)',
                    color: active ? 'var(--primary)' : 'var(--fg-1)',
                    textAlign: 'left',
                  }}>
                    <span style={{ flex: 1 }}>{o.label}</span>
                    {active && <Icon name="check_circle" size={20} color="var(--primary)" filled />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <BottomNav active="more" onNavigate={onNavigate} />
    </Screen>
  );
}

// ═══ 31. Privacy ════════════════════════════════════════════════════
function PrivacyScreen({ onBack, onNavigate }) {
  const { t } = useI18n();
  return (
    <Screen>
      <TopBar title={t('privacy.title')} onBack={onBack} />
      <ScrollArea padding="12px 16px 24px">
        <p style={{ font: '400 14px/1.6 var(--font-body)', color: 'var(--fg-2)', margin: '0 0 18px' }}>
          {t('privacy.intro')}
        </p>
        <SettingsCard>
          <SettingsItem icon="badge" iconBg="#EEF4FF" title={t('privacy.personalData')} subtitle={t('privacy.personalDataSub')} onClick={() => {}} />
          <Divider />
          <SettingsItem icon="event_note" iconBg="#FFDCC7" iconColor="#B85B00" title={t('privacy.eventData')} subtitle={t('privacy.eventDataSub')} onClick={() => {}} />
          <Divider />
          <SettingsItem icon="lock" title={t('privacy.access')} subtitle={t('privacy.accessSub')} onClick={() => {}} />
        </SettingsCard>

        <div style={{ height: 22 }} />
        <SettingsCard>
          <SettingsItem icon="description" title={t('privacy.terms')} onClick={() => {}} />
          <Divider />
          <SettingsItem icon="shield" title={t('privacy.policy')} onClick={() => {}} />
          <Divider />
          <SettingsItem icon="delete_forever" iconBg="#FFDAD6" iconColor="var(--error)" title={t('privacy.deleteAccount')} danger onClick={() => {}} />
        </SettingsCard>
      </ScrollArea>
      <BottomNav active="more" onNavigate={onNavigate} />
    </Screen>
  );
}

// ═══ 32. Support ════════════════════════════════════════════════════
function SupportScreen({ onBack, onContact, onNavigate }) {
  const { t } = useI18n();
  return (
    <Screen>
      <TopBar title={t('support.title')} onBack={onBack} />
      <ScrollArea padding="12px 16px 24px">
        <div style={{
          background: 'linear-gradient(135deg, #C1E8FF 0%, #EEF4FF 100%)',
          borderRadius: 20, padding: 20, marginBottom: 22,
        }}>
          <Icon name="support_agent" size={36} color="var(--primary)" filled />
          <h3 style={{ font: '700 18px var(--font-display)', color: 'var(--fg-1)', margin: '10px 0 6px' }}>{t('support.heading')}</h3>
          <p style={{ font: '400 14px/1.5 var(--font-body)', color: 'var(--fg-2)', margin: '0 0 14px' }}>
            {t('support.sub')}
          </p>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px',
            background: '#fff', borderRadius: 12,
          }}>
            <Icon name="search" size={20} color="var(--fg-3)" />
            <input placeholder={t('support.searchPlaceholder')} style={{
              flex: 1, border: 0, outline: 'none', background: 'transparent',
              font: '400 14px var(--font-body)', color: 'var(--fg-1)',
            }} />
          </div>
        </div>

        <SettingsCard>
          <SettingsItem icon="quiz" iconBg="#EEF4FF" title={t('support.faq')} subtitle={t('support.faqSub')} onClick={() => {}} />
          <Divider />
          <SettingsItem icon="forum" iconBg="#FFDCC7" iconColor="#B85B00" title={t('support.contactOrganizers')} subtitle={t('support.contactOrganizersSub')} onClick={onContact} />
          <Divider />
          <SettingsItem icon="rate_review" iconBg="#D7F0D7" iconColor="#2E7D32" title={t('support.feedback')} subtitle={t('support.feedbackSub')} onClick={() => {}} />
          <Divider />
          <SettingsItem icon="bug_report" iconBg="#FFDAD6" iconColor="var(--error)" title={t('support.reportBug')} onClick={() => {}} />
        </SettingsCard>

        <div style={{ height: 22 }} />
        <SectionHeader title={t('support.directContact')} />
        <div style={{ background: '#fff', borderRadius: 18, padding: 18, boxShadow: 'var(--shadow-soft)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <Icon name="mail" size={18} color="var(--primary)" />
            <span style={{ font: '500 14px var(--font-body)', color: 'var(--fg-1)' }}>hello@mientinhthuc.vn</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Icon name="language" size={18} color="var(--primary)" />
            <span style={{ font: '500 14px var(--font-body)', color: 'var(--fg-1)' }}>mientinhthuc.vn</span>
          </div>
        </div>
      </ScrollArea>
      <BottomNav active="more" onNavigate={onNavigate} />
    </Screen>
  );
}

// ═══ 33. About app ══════════════════════════════════════════════════
function AboutScreen({ onBack, onNavigate }) {
  const { t } = useI18n();
  return (
    <Screen>
      <TopBar title={t('about.title')} onBack={onBack} />
      <ScrollArea padding="12px 16px 24px">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '20px 0 24px', gap: 14 }}>
          <div style={{
            width: 110, height: 110, borderRadius: '50%', background: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 16px 40px rgba(229,115,33,0.18)',
          }}>
            <img src="assets/logo-mark.png" alt="" style={{ width: 76 }} />
          </div>
          <h1 style={{ font: '700 28px var(--font-display)', color: 'var(--primary)', margin: 0, letterSpacing: '-0.01em' }}>Miền Tỉnh Thức</h1>
          <p style={{ font: '600 13px var(--font-body)', color: 'var(--fg-2)', letterSpacing: '0.04em', margin: 0 }}>
            {t('about.tagline')}
          </p>
          <p style={{ font: '400 15px/1.65 var(--font-body)', color: 'var(--fg-2)', margin: '8px 0 0', maxWidth: 320 }}>
            {t('about.desc')}
          </p>
          <Chip variant="soft">{t('about.version')}</Chip>
        </div>

        <SettingsCard>
          <SettingsItem icon="description" title={t('about.terms')} onClick={() => {}} />
          <Divider />
          <SettingsItem icon="shield" title={t('about.policy')} onClick={() => {}} />
          <Divider />
          <SettingsItem icon="favorite" iconColor="var(--accent-warm)" iconBg="#FFDCC7" title={t('about.thanks')} subtitle={t('about.thanksSub')} onClick={() => {}} />
        </SettingsCard>

        <p style={{ font: 'var(--type-caption)', color: 'var(--fg-3)', textAlign: 'center', margin: '22px 0 0' }}>
          {t('about.copyright')}
        </p>
      </ScrollArea>
      <BottomNav active="more" onNavigate={onNavigate} />
    </Screen>
  );
}

// ═══ 34. Check-in (QR scanner) ═════════════════════════════════════
function CheckinScreen({ onBack, onNavigate }) {
  const { t } = useI18n();
  return (
    <Screen>
      <TopBar title={t('checkin.title')} onBack={onBack} />
      <ScrollArea padding="16px 16px 24px">
        <p style={{ font: '400 14px/1.55 var(--font-body)', color: 'var(--fg-2)', margin: '0 0 18px', textAlign: 'center' }}>
          {t('checkin.instruction')}
        </p>
        <div style={{
          aspectRatio: '1 / 1', borderRadius: 28, position: 'relative', overflow: 'hidden',
          background: 'linear-gradient(135deg, #1A2540, #06314D)',
          boxShadow: 'var(--shadow-card)',
        }}>
          {/* viewfinder corners */}
          {[
            { top: 20, left: 20, br: '20px 0 0 0' },
            { top: 20, right: 20, br: '0 20px 0 0' },
            { bottom: 20, left: 20, br: '0 0 0 20px' },
            { bottom: 20, right: 20, br: '0 0 20px 0' },
          ].map((p, i) => (
            <div key={i} style={{
              position: 'absolute', width: 44, height: 44, borderRadius: p.br,
              borderTop: p.top !== undefined ? '4px solid #C1E8FF' : 'none',
              borderBottom: p.bottom !== undefined ? '4px solid #C1E8FF' : 'none',
              borderLeft: p.left !== undefined ? '4px solid #C1E8FF' : 'none',
              borderRight: p.right !== undefined ? '4px solid #C1E8FF' : 'none',
              ...p,
            }} />
          ))}
          <Icon name="qr_code_scanner" size={120} style={{ position: 'absolute', inset: 0, margin: 'auto', color: 'rgba(193,232,255,0.35)' }} />
          <div style={{
            position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
            width: '70%', height: 2, background: 'linear-gradient(90deg, transparent, #C1E8FF, transparent)',
            boxShadow: '0 0 14px #C1E8FF',
          }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
          <Chip variant="warm" icon="info">{t('checkin.waiting')}</Chip>
        </div>
        <div style={{ marginTop: 26, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <SecondaryButton icon={<Icon name="qr_code_2" size={20} color="var(--primary)" />}>{t('checkin.showMyQR')}</SecondaryButton>
          <SecondaryButton icon={<Icon name="edit_note" size={20} color="var(--primary)" />}>{t('checkin.manualEntry')}</SecondaryButton>
        </div>
      </ScrollArea>
      <BottomNav active="more" onNavigate={onNavigate} />
    </Screen>
  );
}

Object.assign(window, {
  MoreScreen, ContactScreen, ProfileScreen, ViewProfileScreen, EditProfileScreen,
  SettingsScreen, PrivacyScreen, SupportScreen, AboutScreen, CheckinScreen,
});
