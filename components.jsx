/* global React, useI18n */
// Shared MTT mobile components — MVP01.
// Plus Jakarta Sans + Material Symbols + token colors.

const { useState: useStateMtt } = React;

// ─── Logo ──────────────────────────────────────────────────────────
function Logo({ size = 96, stacked = false }) {
  const src = stacked ? "assets/logo-stacked.png" : "assets/logo-mark.png";
  return <img src={src} alt="Miền Tỉnh Thức" style={{ height: size, width: 'auto', display: 'block' }} />;
}

// ─── Icon ──────────────────────────────────────────────────────────
function Icon({ name, size = 24, filled = false, color, style = {} }) {
  return (
    <span className="material-symbols-outlined"
      style={{
        fontSize: size,
        color: color || 'currentColor',
        fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' ${filled ? 500 : 400}, 'GRAD' 0, 'opsz' 24`,
        userSelect: 'none',
        ...style,
      }}>{name}</span>
  );
}

// ─── Buttons ───────────────────────────────────────────────────────
function PrimaryButton({ children, onClick, icon, variant = 'blue', fullWidth = true, disabled, size = 'md' }) {
  const isWarm = variant === 'warm';
  const bg = isWarm ? '#E57321' : 'var(--primary)';
  const shadow = isWarm ? 'var(--shadow-button-warm)' : 'var(--shadow-button-primary)';
  const h = size === 'lg' ? 56 : 52;
  return (
    <button onClick={onClick} disabled={disabled}
      style={{
        width: fullWidth ? '100%' : 'auto',
        minHeight: h,
        padding: '0 28px',
        background: bg, color: '#fff', border: 0, borderRadius: 9999,
        font: '700 16px var(--font-body)', boxShadow: shadow, cursor: 'pointer',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
        transition: 'transform 150ms cubic-bezier(0.2,0,0,1), background 220ms',
        opacity: disabled ? 0.5 : 1,
      }}
      onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
      onMouseUp={e => e.currentTarget.style.transform = ''}
      onMouseLeave={e => e.currentTarget.style.transform = ''}>
      {icon && <Icon name={icon} size={20} />}
      {children}
    </button>
  );
}

function SecondaryButton({ children, onClick, icon, fullWidth = true }) {
  return (
    <button onClick={onClick}
      style={{
        width: fullWidth ? '100%' : 'auto', minHeight: 52, padding: '0 24px',
        background: '#fff', color: 'var(--primary)',
        border: '1.5px solid var(--outline-soft)', borderRadius: 9999,
        font: '600 16px var(--font-body)', cursor: 'pointer',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
      }}>
      {icon}
      {children}
    </button>
  );
}

function TextButton({ children, onClick, color = 'var(--primary)' }) {
  return (
    <button onClick={onClick}
      style={{
        background: 'transparent', border: 0, color,
        font: '600 15px var(--font-body)', cursor: 'pointer', padding: '8px 4px',
      }}>{children}</button>
  );
}

// ─── Form field ────────────────────────────────────────────────────
function TextField({ label, value, onChange, placeholder, type = 'text', icon, error, required }) {
  const [focused, setFocused] = useStateMtt(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {label && (
        <label style={{ font: '500 14px var(--font-body)', color: 'var(--fg-1)' }}>
          {label}{required && <span style={{ color: 'var(--accent-warm)' }}> *</span>}
        </label>
      )}
      <div style={{
        position: 'relative', display: 'flex', alignItems: 'center', background: '#fff',
        border: `1.5px solid ${error ? 'var(--error)' : focused ? 'var(--primary)' : 'var(--outline-soft)'}`,
        borderRadius: 12,
        boxShadow: focused ? '0 0 0 4px rgba(0,99,132,0.18)' : 'none',
        transition: 'all 150ms', height: 52, padding: '0 16px',
      }}>
        {icon && <Icon name={icon} size={20} style={{ color: 'var(--fg-3)', marginRight: 10 }} />}
        <input type={type}
          value={value || ''}
          onChange={e => onChange && onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          style={{
            flex: 1, border: 0, outline: 'none', background: 'transparent',
            font: '400 16px var(--font-body)', color: 'var(--fg-1)', minWidth: 0,
          }} />
      </div>
      {error && <span style={{ font: 'var(--type-caption)', color: 'var(--error)' }}>{error}</span>}
    </div>
  );
}

function TextArea({ label, value, onChange, placeholder, rows = 4 }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {label && <label style={{ font: '500 14px var(--font-body)', color: 'var(--fg-1)' }}>{label}</label>}
      <textarea value={value || ''} onChange={e => onChange && onChange(e.target.value)}
        placeholder={placeholder} rows={rows}
        style={{
          padding: 14, background: '#fff',
          border: '1.5px solid var(--outline-soft)', borderRadius: 12,
          font: '400 15px var(--font-body)', color: 'var(--fg-1)',
          outline: 'none', resize: 'vertical',
        }} />
    </div>
  );
}

// ─── Checkbox / Toggle ──────────────────────────────────────────────
function Checkbox({ checked, onChange, children }) {
  return (
    <label style={{ display: 'flex', gap: 12, alignItems: 'flex-start', cursor: 'pointer', font: '400 14px/1.5 var(--font-body)', color: 'var(--fg-2)' }}>
      <span onClick={() => onChange && onChange(!checked)}
        style={{
          flex: '0 0 auto', width: 22, height: 22, marginTop: 1,
          borderRadius: 6,
          border: '2px solid ' + (checked ? 'var(--primary)' : 'var(--outline)'),
          background: checked ? 'var(--primary)' : 'transparent',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 150ms',
        }}>
        {checked && <Icon name="check" size={16} color="#fff" />}
      </span>
      <span>{children}</span>
    </label>
  );
}

function Toggle({ on, onChange }) {
  return (
    <button onClick={() => onChange && onChange(!on)}
      style={{
        width: 50, height: 30, borderRadius: 9999, padding: 3,
        background: on ? 'var(--primary)' : '#D8DEE5',
        border: 0, cursor: 'pointer', position: 'relative',
        transition: 'background 200ms',
        display: 'flex', alignItems: 'center',
      }}>
      <span style={{
        width: 24, height: 24, borderRadius: '50%', background: '#fff',
        transform: on ? 'translateX(20px)' : 'translateX(0)',
        transition: 'transform 220ms cubic-bezier(0.2,0,0,1)',
        boxShadow: '0 2px 6px rgba(7,29,48,0.18)',
      }} />
    </button>
  );
}

// ─── Chip ──────────────────────────────────────────────────────────
function Chip({ children, variant = 'soft', size = 'md', icon }) {
  const styles = {
    primary: { bg: '#C1E8FF', fg: 'var(--primary)' },
    soft:    { bg: '#EEF4FF', fg: 'var(--primary)' },
    warm:    { bg: '#FFDCC7', fg: '#723600' },
    success: { bg: '#D7F0D7', fg: '#1B5E20' },
    status:  { bg: 'rgba(255,255,255,0.92)', fg: 'var(--primary)', upper: true, blur: true },
    plain:   { bg: '#fff',   fg: 'var(--fg-2)', border: true },
  };
  const s = styles[variant];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: size === 'sm' ? '4px 10px' : '6px 14px',
      borderRadius: 9999, background: s.bg, color: s.fg,
      font: `${s.upper ? '700' : '600'} ${s.upper ? '11px' : '13px'} var(--font-body)`,
      letterSpacing: s.upper ? '0.12em' : '0.02em',
      textTransform: s.upper ? 'uppercase' : 'none',
      backdropFilter: s.blur ? 'blur(8px)' : undefined,
      boxShadow: s.blur ? '0 6px 18px rgba(7,29,48,0.08)' : undefined,
      border: s.border ? '1px solid var(--outline-soft)' : undefined,
      whiteSpace: 'nowrap',
    }}>
      {icon && <Icon name={icon} size={14} />}
      {children}
    </span>
  );
}

// ─── Filter pill row ────────────────────────────────────────────────
function FilterPills({ items, active, onChange }) {
  return (
    <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'none' }}>
      {items.map(it => {
        const isActive = active === it.key;
        return (
          <button key={it.key} onClick={() => onChange && onChange(it.key)}
            style={{
              flex: '0 0 auto', padding: '8px 16px',
              borderRadius: 9999,
              background: isActive ? 'var(--primary)' : '#EEF4FF',
              color: isActive ? '#fff' : 'var(--primary)',
              border: 0, cursor: 'pointer',
              font: '600 13px var(--font-body)',
              boxShadow: isActive ? '0 6px 16px rgba(0,99,132,0.18)' : 'none',
              whiteSpace: 'nowrap',
            }}>{it.label}</button>
        );
      })}
    </div>
  );
}

// ─── Segmented tabs (large) ────────────────────────────────────────
function SegmentedTabs({ items, active, onChange }) {
  return (
    <div style={{
      background: '#EEF4FF', padding: 5, borderRadius: 9999,
      display: 'flex', gap: 4,
    }}>
      {items.map(it => {
        const isActive = active === it.key;
        return (
          <button key={it.key} onClick={() => onChange && onChange(it.key)}
            style={{
              flex: 1, padding: '10px 8px', border: 0, cursor: 'pointer', borderRadius: 9999,
              background: isActive ? 'var(--primary)' : 'transparent',
              color: isActive ? '#fff' : 'var(--primary)',
              font: '600 14px var(--font-body)',
              boxShadow: isActive ? '0 6px 16px rgba(0,99,132,0.18)' : 'none',
              transition: 'all 220ms cubic-bezier(0.2,0,0,1)',
            }}>{it.label}</button>
        );
      })}
    </div>
  );
}

// ─── Top app bar ───────────────────────────────────────────────────
function TopBar({ title, onBack, right, transparent }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '12px 8px', minHeight: 56,
      background: transparent ? 'transparent' : 'rgba(255,255,255,0.92)',
      backdropFilter: transparent ? 'none' : 'blur(12px)',
      position: 'sticky', top: 0, zIndex: 10,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        {onBack && <IconButton icon="arrow_back" onClick={onBack} />}
        {title && <span style={{ font: '600 18px var(--font-display)', color: 'var(--fg-1)', marginLeft: onBack ? 0 : 12 }}>{title}</span>}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, paddingRight: 8 }}>
        {right}
      </div>
    </div>
  );
}

// ─── Main app top bar (avatar + title + notif icon) ────────────────
function AppTopBar({ greeting, name, onProfile, onNotifications, notifBadge, title }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 16px 8px',
    }}>
      <button onClick={onProfile}
        style={{ background: 'transparent', border: 0, cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 44, height: 44, borderRadius: '50%',
          background: 'linear-gradient(135deg, #E57321, #B85B00)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', font: '700 16px var(--font-display)',
          boxShadow: '0 6px 14px rgba(229,115,33,0.30)',
        }}>{(name || 'A')[0]}</div>
        {title ? (
          <div style={{ font: '700 19px var(--font-display)', color: 'var(--fg-1)' }}>{title}</div>
        ) : (
          <div style={{ textAlign: 'left' }}>
            <div style={{ font: '400 12px var(--font-body)', color: 'var(--fg-3)' }}>{greeting}</div>
            <div style={{ font: '700 17px var(--font-display)', color: 'var(--fg-1)' }}>{name}</div>
          </div>
        )}
      </button>
      <IconButton icon="notifications" badge={notifBadge} onClick={onNotifications} />
    </div>
  );
}

function IconButton({ icon, onClick, badge, color, filled }) {
  return (
    <button onClick={onClick} style={{
      width: 40, height: 40, borderRadius: 9999,
      background: 'transparent', border: 0, cursor: 'pointer',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', color: color || 'var(--fg-1)',
    }}>
      <Icon name={icon} size={24} filled={filled} />
      {badge != null && (
        <span style={{
          position: 'absolute', top: 4, right: 4,
          minWidth: 16, height: 16, padding: '0 4px', borderRadius: 9999,
          background: 'var(--accent-warm)', color: '#fff',
          font: '700 10px var(--font-body)',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        }}>{badge}</span>
      )}
    </button>
  );
}

// ─── Bottom nav — MVP01 four-tab (Trang chủ / Talks / Sự kiện / Thêm) ───
function BottomNav({ active, onNavigate }) {
  const { t } = useI18n();
  const items = [
    { key: 'home',   icon: 'home',       label: t('nav.home') },
    { key: 'talks',  icon: 'spa',        label: t('nav.talks') },
    { key: 'events', icon: 'event_note', label: t('nav.events') },
    { key: 'more',   icon: 'menu',       label: t('nav.more') },
  ];
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      background: 'rgba(255,255,255,0.96)',
      backdropFilter: 'blur(12px)',
      borderTop: '1px solid rgba(190,200,207,0.4)',
      borderRadius: '24px 24px 0 0',
      padding: '8px 6px 14px',
      display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2,
      boxShadow: '0 -10px 30px rgba(7,29,48,0.06)',
      zIndex: 5,
    }}>
      {items.map(it => {
        const isActive = active === it.key;
        return (
          <button key={it.key} onClick={() => onNavigate && onNavigate(it.key)}
            style={{
              background: isActive ? 'rgba(193,232,255,0.45)' : 'transparent',
              border: 0, cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              padding: '8px 4px', borderRadius: 14,
              color: isActive ? 'var(--primary)' : 'var(--fg-3)',
              font: '600 11px var(--font-body)',
              letterSpacing: 0.02,
            }}>
            <Icon name={it.icon} size={24} filled={isActive} />
            <span>{it.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ─── Social auth buttons ───────────────────────────────────────────
const GoogleG = (
  <svg width="20" height="20" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const FacebookF = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const AppleA = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#000">
    <path d="M17.05 12.51c.03 2.99 2.6 3.99 2.63 4.01-.02.07-.41 1.42-1.36 2.81-.82 1.2-1.67 2.4-3.01 2.42-1.32.03-1.74-.79-3.25-.79-1.5 0-1.97.76-3.22.81-1.29.05-2.27-1.3-3.1-2.5C3.99 16.91 2.65 12.43 4.39 9.4c.85-1.49 2.37-2.44 4.04-2.46 1.27-.02 2.46.85 3.24.85.78 0 2.23-1.05 3.76-.9.64.03 2.43.26 3.59 1.94-.09.06-2.14 1.25-2.12 3.68zM14.6 5.16c.7-.85 1.17-2.03 1.04-3.2-1 .04-2.21.67-2.93 1.51-.65.75-1.21 1.95-1.06 3.1 1.12.09 2.26-.57 2.95-1.41z"/>
  </svg>
);

function SocialButton({ provider, onClick, label }) {
  const { t } = useI18n();
  const icons = { google: GoogleG, facebook: FacebookF, apple: AppleA };
  const labels = { google: t('auth.signup.withGoogle'), facebook: t('auth.signup.withFacebook'), apple: t('auth.signup.withApple') };
  return (
    <button onClick={onClick} style={{
      width: '100%', minHeight: 52, padding: '0 24px',
      background: '#fff', color: 'var(--fg-1)',
      border: '1.5px solid var(--outline-soft)', borderRadius: 9999,
      font: '600 15px var(--font-body)', cursor: 'pointer',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 12,
    }}>
      {icons[provider]}
      {label || labels[provider]}
    </button>
  );
}

// ─── Divider with text ─────────────────────────────────────────────
function OrDivider({ label }) {
  const { t } = useI18n();
  label = label || t('common.or');
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '4px 0' }}>
      <div style={{ flex: 1, height: 1, background: 'rgba(190,200,207,0.6)' }} />
      <span style={{ font: '500 12px var(--font-body)', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--fg-3)' }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: 'rgba(190,200,207,0.6)' }} />
    </div>
  );
}

// ─── Section header ────────────────────────────────────────────────
function SectionHeader({ title, action, onAction, eyebrow }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', margin: '0 0 12px' }}>
      <div>
        {eyebrow && <div style={{ font: '700 11px var(--font-body)', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--fg-3)', marginBottom: 4 }}>{eyebrow}</div>}
        <h2 style={{ font: '700 22px var(--font-display)', color: 'var(--fg-1)', margin: 0, letterSpacing: '-0.01em' }}>{title}</h2>
      </div>
      {action && (
        <button onClick={onAction} style={{
          background: 'transparent', border: 0, cursor: 'pointer',
          color: 'var(--primary)', font: '600 14px var(--font-body)',
        }}>{action}</button>
      )}
    </div>
  );
}

// ─── List row (for settings, more menus) ───────────────────────────
function ListRow({ icon, iconBg = '#EEF4FF', iconColor = 'var(--primary)', title, subtitle, right, onClick, danger }) {
  return (
    <button onClick={onClick} style={{
      width: '100%', display: 'flex', alignItems: 'center', gap: 14,
      padding: '14px 16px', background: 'transparent', border: 0, cursor: onClick ? 'pointer' : 'default',
      textAlign: 'left',
    }}>
      {icon && (
        <span style={{
          width: 40, height: 40, borderRadius: 12, flex: '0 0 auto',
          background: iconBg, color: danger ? 'var(--error)' : iconColor,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name={icon} size={22} />
        </span>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ font: '600 15px var(--font-body)', color: danger ? 'var(--error)' : 'var(--fg-1)' }}>{title}</div>
        {subtitle && <div style={{ font: '400 13px var(--font-body)', color: 'var(--fg-3)', marginTop: 2 }}>{subtitle}</div>}
      </div>
      {right !== undefined ? right : (onClick && <Icon name="chevron_right" size={20} color="var(--fg-3)" />)}
    </button>
  );
}

// ─── Card (rounded white) ──────────────────────────────────────────
function Card({ children, padding = 18, style = {} }) {
  return (
    <div style={{
      background: '#fff', borderRadius: 20, padding,
      boxShadow: 'var(--shadow-soft)', ...style,
    }}>{children}</div>
  );
}

// ─── Empty state ────────────────────────────────────────────────────
function EmptyState({ icon = 'inbox', title, message, action, onAction }) {
  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', padding: '40px 24px', textAlign: 'center', gap: 14,
    }}>
      <div style={{
        width: 72, height: 72, borderRadius: '50%',
        background: '#EEF4FF', display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--primary)',
      }}>
        <Icon name={icon} size={36} />
      </div>
      <h3 style={{ font: '700 18px var(--font-display)', color: 'var(--fg-1)', margin: 0 }}>{title}</h3>
      {message && <p style={{ font: '400 14px/1.55 var(--font-body)', color: 'var(--fg-2)', margin: 0, maxWidth: 280 }}>{message}</p>}
      {action && <div style={{ width: '100%', marginTop: 8 }}><PrimaryButton onClick={onAction}>{action}</PrimaryButton></div>}
    </div>
  );
}

// ─── Decorative image tile (used for content cards, news, etc.) ────
function ImageTile({ tint = 'mint', icon, size = 84, radius = 14, style = {} }) {
  const tints = {
    mint:   'linear-gradient(135deg, #B7EBC8, #4FC489)',
    sand:   'linear-gradient(135deg, #FFE5B5, #FFB659)',
    sky:    'linear-gradient(135deg, #BBE6FA, #4FC3F7)',
    rose:   'linear-gradient(135deg, #FFD0D8, #FF8094)',
    plum:   'linear-gradient(135deg, #E8D8F2, #B68AD8)',
    forest: 'linear-gradient(135deg, #7FCB94, #2E8A53)',
    sunset: 'linear-gradient(135deg, #FFD08A, #F77B3A)',
    ocean:  'linear-gradient(135deg, #6FD5E7, #0098B6)',
    dusk:   'linear-gradient(135deg, #B4C9FF, #5B6FE0)',
    fog:    'linear-gradient(135deg, #EDF3FA, #BFCFE4)',
    coral:  'linear-gradient(135deg, #FFC7CE, #FF6B7E)',
    sun:    'linear-gradient(135deg, #FFE89A, #FFC247)',
  };
  return (
    <div style={{
      width: size, height: size, borderRadius: radius, flex: '0 0 auto',
      background: tints[tint] || tints.mint, position: 'relative', overflow: 'hidden',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      ...style,
    }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.35), transparent 60%)' }} />
      {icon && <Icon name={icon} size={Math.min(size * 0.45, 40)} color="rgba(255,255,255,0.85)" filled />}
    </div>
  );
}

// ─── Status dot (notification unread, etc.) ─────────────────────────
function Dot({ color = 'var(--accent-warm)', size = 8 }) {
  return <span style={{ display: 'inline-block', width: size, height: size, borderRadius: '50%', background: color }} />;
}

Object.assign(window, {
  Logo, Icon, PrimaryButton, SecondaryButton, TextButton, TextField, TextArea,
  Checkbox, Toggle, Chip, FilterPills, SegmentedTabs,
  TopBar, AppTopBar, IconButton, BottomNav, SocialButton, OrDivider, SectionHeader,
  ListRow, Card, EmptyState, ImageTile, Dot,
});
