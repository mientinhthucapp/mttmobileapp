/* global React, Icon, PrimaryButton, SecondaryButton, TextButton,
   TextField, TextArea, Checkbox, Chip, FilterPills, SegmentedTabs,
   TopBar, AppTopBar, IconButton, BottomNav, OrDivider, SectionHeader,
   ListRow, Card, EmptyState, ImageTile, Dot, Screen, ScrollArea */

const { useState: useStateEv } = React;

// ═══ 08. Home ═══════════════════════════════════════════════════════
function HomeScreen({ onOpenEvent, onProfile, onNotifications, onOpenTalk, onNavigate }) {
  return (
    <Screen>
      <AppTopBar greeting="Chào buổi sáng," name="An Nhiên" onProfile={onProfile} onNotifications={onNotifications} notifBadge={2} />
      <ScrollArea padding="0 16px 12px">
        {/* Subtitle */}
        <p style={{ font: '400 14px/1.5 var(--font-body)', color: 'var(--fg-2)', margin: '0 4px 16px' }}>
          "Hít thở sâu, có mặt, và tận hưởng khoảnh khắc hiện tại"
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
            <div style={{ font: '700 11px var(--font-body)', opacity: 0.85, letterSpacing: '0.18em', textTransform: 'uppercase' }}>Pháp thoại mới</div>
          </div>
          <div style={{ position: 'absolute', left: 20, bottom: 18, color: '#fff' }}>
            <h3 style={{ font: '700 22px/1.2 var(--font-display)', margin: '4px 0 6px', letterSpacing: '-0.01em' }}>Đối Cảnh Vô Tâm</h3>
            <div style={{ font: '500 12px var(--font-body)', opacity: 0.85 }}>Thầy Minh Niệm · 42 phút</div>
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
          <SectionHeader title="Pháp thoại gần đây" action="Xem tất cả" onAction={() => onNavigate && onNavigate('talks')} />
          <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 6, scrollbarWidth: 'none' }}>
            <TalkCard tint="mint" icon="spa" type="Video" title="Trở về với hơi thở" speaker="Thầy Minh Niệm" duration="22 phút" onClick={onOpenTalk} />
            <TalkCard tint="sky" icon="headphones" type="Âm thanh" title="Tĩnh lặng giữa đời" speaker="Thầy Minh Niệm" duration="18 phút" onClick={onOpenTalk} />
            <TalkCard tint="sunset" icon="auto_awesome" type="Video" title="Bói Tâm · Tập 17" speaker="Vietcetera" duration="45 phút" onClick={onOpenTalk} />
          </div>
        </div>

        {/* Featured event */}
        <div style={{ marginTop: 28 }}>
          <SectionHeader title="Sự kiện sắp tới" action="Xem tất cả" onAction={() => onNavigate && onNavigate('events')} />
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
              <div style={{ font: '700 28px var(--font-display)', lineHeight: 1, letterSpacing: '-0.01em' }}>23</div>
              <div style={{ font: '700 9px var(--font-body)', letterSpacing: '0.12em', marginTop: 4 }}>THÁNG 05, 2026</div>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h4 style={{ font: '700 16px/1.3 var(--font-display)', color: 'var(--fg-1)', margin: '0 0 10px' }}>Tay Phật Trong Tay Con</h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--fg-3)', font: '500 13px var(--font-body)', marginBottom: 4 }}>
                <Icon name="schedule" size={16} color="var(--primary)" /> 17:00 – 20:30
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--fg-3)', font: '500 13px var(--font-body)' }}>
                <Icon name="location_on" size={16} color="var(--primary)" /> Chùa Minh Đạo, Tp HCM
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
            "Quay về với hơi thở,<br/>có mặt, mỉm cười, thư giãn."
          </p>
          <div style={{ textAlign: 'center', marginTop: 12, font: '700 11px var(--font-body)', letterSpacing: '0.2em', color: 'var(--primary)' }}>THẦY MINH NIỆM</div>
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
const EVENTS = [
  { id: 'tay-phat', tint: 'forest', icon: 'park', title: 'Tay Phật Trong Tay Con', date: '23 Tháng 05, 2026', time: '17:00 – 20:30', location: 'Chùa Minh Đạo, Tp HCM', desc: 'Một buổi sinh hoạt nhẹ nhàng với pháp thoại, vấn đáp và kết nối trong chánh niệm.', status: 'open' },
  { id: 'suoi-nguon', tint: 'sunset', icon: 'wb_sunny', title: 'Suối Nguồn Tỉnh Thức', date: '30 Tháng 05, 2026', time: '08:00 – 11:30', location: 'Trung tâm Văn hóa, Hà Nội', desc: 'Cùng nhau quay về với chính mình qua các bài thực tập hơi thở và đi trong thảnh thơi.', status: 'open' },
  { id: 'chien-binh', tint: 'sand', icon: 'child_care', title: 'Chiến Binh Nhí 2026', date: '12 Tháng 06, 2026', time: '08:00 – 17:00', location: 'Đà Lạt', desc: 'Khoá tu hè cho thiếu nhi, học cách hít thở, lắng nghe và yêu thương.', status: 'registered' },
  { id: 'thien-10', tint: 'mint', icon: 'self_improvement', title: 'Thiền Chuyên Sâu 10 Ngày', date: '01 Tháng 07, 2026', time: 'Toàn ngày', location: 'Tu viện Bát Nhã, Bảo Lộc', desc: 'Khoá thiền dài hạn dành cho hành giả đã có nền tảng thực tập.', status: 'open' },
  { id: 'thien-tra', tint: 'plum', icon: 'local_cafe', title: 'Thiền Trà & Kết Nối', date: '20 Tháng 06, 2026', time: '15:00 – 17:30', location: 'Online', desc: 'Một buổi trà chiều trực tuyến để cùng lắng nghe và chia sẻ.', status: 'open' },
];

function EventsScreen({ onOpenEvent, onProfile, onNotifications, onNavigate }) {
  const [filter, setFilter] = useStateEv('all');
  const filters = [
    { key: 'all',        label: 'Tất cả' },
    { key: 'upcoming',   label: 'Sắp diễn ra' },
    { key: 'registered', label: 'Đã đăng ký' },
    { key: 'online',     label: 'Online' },
    { key: 'live',       label: 'Trực tiếp' },
  ];
  const list = filter === 'registered' ? EVENTS.filter(e => e.status === 'registered')
            : filter === 'online' ? EVENTS.filter(e => e.location.includes('Online'))
            : filter === 'live' ? EVENTS.filter(e => !e.location.includes('Online'))
            : EVENTS;
  return (
    <Screen>
      <AppTopBar title="Sự kiện" name="A" onProfile={onProfile} onNotifications={onNotifications} notifBadge={2} />
      <div style={{ padding: '4px 16px 8px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px',
          background: '#fff', borderRadius: 14, boxShadow: 'var(--shadow-soft)', marginBottom: 12,
        }}>
          <Icon name="search" size={20} color="var(--fg-3)" />
          <input placeholder="Tìm sự kiện" style={{
            flex: 1, border: 0, outline: 'none', background: 'transparent',
            font: '400 15px var(--font-body)', color: 'var(--fg-1)',
          }} />
        </div>
        <FilterPills items={filters} active={filter} onChange={setFilter} />
      </div>
      <ScrollArea padding="16px 16px 12px">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {list.map(ev => <EventCard key={ev.id} {...ev} onOpen={() => onOpenEvent && onOpenEvent(ev.id)} />)}
          {list.length === 0 && (
            <EmptyState icon="event_busy" title="Không có sự kiện" message="Không có sự kiện nào phù hợp bộ lọc hiện tại." />
          )}
        </div>
      </ScrollArea>
      <BottomNav active="events" onNavigate={onNavigate} />
    </Screen>
  );
}

function EventCard({ tint, icon, title, date, time, location, desc, status, onOpen }) {
  const tints = {
    forest: 'linear-gradient(135deg, #7FCB94 0%, #2E8A53 60%, #1F6E3F 100%)',
    sunset: 'linear-gradient(135deg, #FFE89A 0%, #FFB659 50%, #FF7A3A 100%)',
    sand:   'linear-gradient(135deg, #FFE0B5 0%, #FFB659 100%)',
    mint:   'linear-gradient(135deg, #B7EBC8 0%, #4FC489 100%)',
    plum:   'linear-gradient(135deg, #E8D8F2 0%, #B68AD8 100%)',
  };
  const badgeLabel = status === 'registered' ? 'ĐÃ ĐĂNG KÝ' : 'SẮP DIỄN RA';
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
            Xem chi tiết <Icon name="chevron_right" size={18} />
          </button>
          {status === 'registered' ? (
            <button onClick={onOpen} style={{
              background: '#fff', color: 'var(--success)', border: '1.5px solid var(--success)',
              padding: '10px 22px', borderRadius: 14,
              font: '700 13px var(--font-body)', cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: 6,
            }}><Icon name="qr_code_2" size={16} />Xem mã QR</button>
          ) : (
            <button onClick={onOpen} style={{
              background: 'var(--primary)', color: '#fff', border: 0,
              padding: '11px 26px', borderRadius: 14,
              font: '700 13px var(--font-body)', cursor: 'pointer',
              boxShadow: '0 8px 22px rgba(0,99,132,0.20)',
            }}>Đăng ký</button>
          )}
        </div>
      </div>
    </div>
  );
}

// ═══ 10. Event details ══════════════════════════════════════════════
function EventDetailsScreen({ onRegister, onBack, onNavigate, onShowQR, isRegistered }) {
  return (
    <Screen>
      <TopBar title="Chi tiết sự kiện" onBack={onBack} right={<><IconButton icon="share" /><IconButton icon="bookmark_border" /></>} />
      <ScrollArea padding="0 0 110px">
        <div style={{
          height: 230, margin: 0,
          background: 'linear-gradient(135deg, #4FC489 0%, #2E8A53 60%, #1F6E3F 100%)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 28%, rgba(255,238,180,0.7), transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,194,71,0.35), transparent 45%)' }} />
          <Icon name="forest" size={170} style={{ position: 'absolute', right: -8, bottom: -10, color: 'rgba(255,255,255,0.32)' }} filled />
          <div style={{ position: 'absolute', left: 20, bottom: 22 }}>
            <Chip variant="status">TRỰC TIẾP</Chip>
          </div>
        </div>

        <div style={{ padding: '24px 16px 0', position: 'relative', marginTop: -32, borderRadius: '32px 32px 0 0', background: 'var(--background)' }}>
          <h1 style={{ font: '700 28px/1.2 var(--font-display)', color: 'var(--fg-1)', margin: '0 0 18px', letterSpacing: '-0.01em' }}>Tay Phật Trong Tay Con</h1>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <InfoRow icon="calendar_month" label="NGÀY" value="Chủ Nhật, 24/05/2026" />
            <InfoRow icon="schedule" label="THỜI GIAN" value="17:00 – 20:30" />
            <InfoRow icon="location_on" label="ĐỊA ĐIỂM" value="Chùa Minh Đạo, Tp HCM" />
          </div>

          <h3 style={{ font: '700 18px var(--font-display)', color: 'var(--fg-1)', margin: '26px 0 10px' }}>Về buổi sinh hoạt</h3>
          <p style={{ font: '400 15px/1.65 var(--font-body)', color: 'var(--fg-2)', margin: 0 }}>
            Một buổi sinh hoạt nhẹ nhàng cho đại chúng cùng thực tập, lắng nghe pháp thoại và kết nối trong chánh niệm. Hãy mang theo một trái tim mở và một hơi thở thật nhẹ.
          </p>

          <h3 style={{ font: '700 18px var(--font-display)', color: 'var(--fg-1)', margin: '24px 0 10px' }}>Chương trình</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 14 }}>
            <Schedule time="17:00 – 18:00" title="Vào cửa & ổn định chỗ ngồi" />
            <Schedule time="18:00 – 20:00" title="Nghe pháp thoại" />
            <Schedule time="20:00 – 20:30" title="Vấn đáp" />
            <Schedule time="20:30" title="Chào tạm biệt" />
          </div>

          <h3 style={{ font: '700 18px var(--font-display)', color: 'var(--fg-1)', margin: '20px 0 10px' }}>Gợi ý mang theo</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 22 }}>
            <Bullet>Trang phục thoải mái, lịch sự</Bullet>
            <Bullet>Một cuốn sổ tay nhỏ và bút</Bullet>
            <Bullet>Tắt thông báo điện thoại trước khi vào</Bullet>
          </div>

          <h3 style={{ font: '700 18px var(--font-display)', color: 'var(--fg-1)', margin: '0 0 10px' }}>Chia sẻ</h3>
          <div style={{ display: 'flex', gap: 10, marginBottom: 28 }}>
            <ShareBtn icon="forum" label="Viber" color="#7360F2" />
            <ShareBtn icon="chat" label="Zalo" color="#0084FF" />
            <ShareBtn icon="facebook" label="Facebook" color="#1877F2" />
            <ShareBtn icon="link" label="Sao chép" color="var(--fg-2)" />
          </div>
        </div>
      </ScrollArea>

      <div style={{ position: 'absolute', left: 16, right: 16, bottom: 88, zIndex: 6 }}>
        {isRegistered
          ? <PrimaryButton icon="qr_code_2" onClick={onShowQR}>Xem mã QR</PrimaryButton>
          : <PrimaryButton variant="warm" icon="arrow_forward" onClick={onRegister}>Đăng ký tham dự</PrimaryButton>
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
  const [vals, setVals] = useStateEv({
    last: 'Nguyen', first: 'An Nhiên',
    email: 'annhienn@example.com', phone: '0400 123 456',
    visited: 'no', needs: '', notes: '',
  });
  const [agreed, setAgreed] = useStateEv(true);
  const set = k => v => setVals({ ...vals, [k]: v });
  return (
    <Screen>
      <TopBar title="Đăng ký sự kiện" onBack={onBack} />
      <ScrollArea padding="8px 16px 24px">
        <div style={{ background:'#fff', borderRadius: 24, overflow: 'hidden', boxShadow: 'var(--shadow-soft)', marginBottom: 24 }}>
          <div style={{ height: 130, background:'linear-gradient(135deg, #4FC489 0%, #2E8A53 100%)', position:'relative' }}>
            <Icon name="forest" size={120} style={{ position: 'absolute', right: 0, bottom: -8, color: 'rgba(255,255,255,0.32)' }} filled />
            <div style={{ position:'absolute', left:14, top:14 }}><Chip variant="status">SẮP DIỄN RA</Chip></div>
          </div>
          <div style={{ padding: '16px 18px 18px' }}>
            <h3 style={{ font: '700 18px var(--font-display)', color: 'var(--fg-1)', margin: '0 0 10px' }}>Tay Phật Trong Tay Con</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--fg-3)', font: '500 13px var(--font-body)', marginBottom: 4 }}>
              <Icon name="calendar_month" size={18} color="var(--primary)" />24/05/2026 · 17:00 – 20:30
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--fg-3)', font: '500 13px var(--font-body)' }}>
              <Icon name="location_on" size={18} color="var(--primary)" />Chùa Minh Đạo, Tp HCM
            </div>
          </div>
        </div>

        <h2 style={{ font: '700 20px var(--font-display)', color: 'var(--primary)', margin: '0 0 6px' }}>Thông tin đăng ký</h2>
        <p style={{ font: '400 14px/1.55 var(--font-body)', color: 'var(--fg-2)', margin: '0 0 18px' }}>
          Vui lòng kiểm tra và cập nhật thông tin của bạn trước khi đăng ký.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ flex: '1 1 0', minWidth: 0 }}>
              <TextField label="Họ" value={vals.last} onChange={set('last')} required />
            </div>
            <div style={{ flex: '1 1 0', minWidth: 0 }}>
              <TextField label="Tên" value={vals.first} onChange={set('first')} required />
            </div>
          </div>
          <TextField label="Email" value={vals.email} onChange={set('email')} type="email" required />
          <TextField label="Số điện thoại" value={vals.phone} onChange={set('phone')} type="tel" required />

          {/* Event-specific */}
          <div>
            <label style={{ font: '500 14px var(--font-body)', color: 'var(--fg-1)', display: 'block', marginBottom: 8 }}>
              Bạn đã từng tham gia sinh hoạt với Miền Tỉnh Thức chưa?
            </label>
            <div style={{ display: 'flex', gap: 10 }}>
              {[{ k: 'no', l: 'Chưa từng' }, { k: 'few', l: 'Một vài lần' }, { k: 'reg', l: 'Thường xuyên' }].map(o => {
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

          <TextArea label="Bạn có cần hỗ trợ gì đặc biệt không?" placeholder="Ví dụ: ăn chay, đi lại, không gian yên tĩnh…" rows={3} value={vals.needs} onChange={set('needs')} />
          <TextArea label="Ghi chú thêm" placeholder="Bạn muốn chia sẻ điều gì khác không?" rows={3} value={vals.notes} onChange={set('notes')} />

          <div style={{ marginTop: 6 }}>
            <Checkbox checked={agreed} onChange={setAgreed}>
              Tôi đồng ý nhận thông tin liên quan đến sự kiện này.
            </Checkbox>
          </div>

          <PrimaryButton variant="warm" onClick={onSubmit} disabled={!agreed}>Đăng ký</PrimaryButton>
          <p style={{ font: 'var(--type-caption)', color: 'var(--fg-3)', textAlign: 'center', margin: '4px 0 0' }}>
            Sau khi đăng ký, thông tin sự kiện sẽ được lưu trong hồ sơ của bạn.
          </p>
        </div>
      </ScrollArea>
    </Screen>
  );
}

// ═══ 12. Registration confirmation ═════════════════════════════════
function ConfirmationScreen({ onShowQR, onHome, onMyEvents, onBack, onNavigate }) {
  return (
    <Screen>
      <TopBar title="Đăng ký thành công" onBack={onBack} />
      <ScrollArea padding="16px 20px 24px">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: '12px 0 20px' }}>
          <div style={{
            width: 84, height: 84, borderRadius: '50%',
            background: 'rgba(46,125,50,0.10)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon name="check_circle" size={56} color="var(--success)" filled />
          </div>
          <h1 style={{ font: '700 26px var(--font-display)', color: 'var(--fg-1)', margin: 0, letterSpacing: '-0.01em', textAlign: 'center' }}>Đăng ký thành công</h1>
          <p style={{ font: '400 15px/1.55 var(--font-body)', color: 'var(--fg-2)', margin: 0, textAlign: 'center', maxWidth: 300 }}>
            Cảm ơn bạn đã đăng ký tham dự sự kiện. Hẹn gặp bạn trong sự kiện.
          </p>
        </div>

        <div style={{
          background: '#fff', borderRadius: 24, padding: 20,
          boxShadow: 'var(--shadow-card)', marginBottom: 18,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <ImageTile tint="forest" icon="park" size={64} radius={16} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <h4 style={{ font: '700 16px/1.3 var(--font-display)', color: 'var(--fg-1)', margin: '0 0 6px' }}>Tay Phật Trong Tay Con</h4>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--primary)', font: '600 12px var(--font-body)' }}>
                <Icon name="calendar_month" size={14} /> 24/05/2026
              </div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 16, paddingTop: 16, borderTop: '1px solid rgba(190,200,207,0.4)' }}>
            <div>
              <div style={{ font: '700 10px var(--font-body)', letterSpacing: '0.18em', color: 'var(--fg-3)' }}>THỜI GIAN</div>
              <div style={{ font: '700 14px var(--font-display)', color: 'var(--fg-1)', marginTop: 2 }}>17:00 – 20:30</div>
            </div>
            <div>
              <div style={{ font: '700 10px var(--font-body)', letterSpacing: '0.18em', color: 'var(--fg-3)' }}>ĐỊA ĐIỂM</div>
              <div style={{ font: '700 14px var(--font-display)', color: 'var(--fg-1)', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Chùa Minh Đạo, TPHCM</div>
            </div>
          </div>
        </div>

        <QRCodeBlock id="MT-20260524-001" />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 18 }}>
          <PrimaryButton icon="qr_code_2" onClick={onShowQR}>Xem mã QR</PrimaryButton>
          <SecondaryButton onClick={onMyEvents} icon={<Icon name="event_available" size={20} color="var(--primary)" />}>Xem sự kiện đã đăng ký</SecondaryButton>
          <TextButton onClick={onHome}>Quay về Trang chủ</TextButton>
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
  return (
    <Screen>
      <TopBar title="Mã QR sự kiện" onBack={onBack} />
      <ScrollArea padding="12px 20px 24px">
        <div style={{ background: '#fff', borderRadius: 24, padding: 22, boxShadow: 'var(--shadow-card)', marginBottom: 16 }}>
          <h3 style={{ font: '700 20px/1.25 var(--font-display)', color: 'var(--fg-1)', margin: '0 0 12px' }}>Tay Phật Trong Tay Con</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--fg-3)', font: '500 13px var(--font-body)' }}>
              <Icon name="calendar_month" size={16} color="var(--primary)" />24/05/2026 · 17:00 – 20:30
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--fg-3)', font: '500 13px var(--font-body)' }}>
              <Icon name="person" size={16} color="var(--primary)" />An Nhiên · annhien@example.com
            </div>
          </div>
        </div>

        <QRCodeBlock id="MT-20260524-001" />

        <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0 18px' }}>
          {status === 'checked' ? (
            <Chip variant="success" icon="check_circle">Đã check-in</Chip>
          ) : (
            <Chip variant="warm" icon="schedule">Chưa check-in</Chip>
          )}
        </div>

        <p style={{ font: '400 14px/1.55 var(--font-body)', color: 'var(--fg-2)', textAlign: 'center', margin: '0 0 18px' }}>
          Vui lòng đưa mã này cho người hỗ trợ check-in khi đến nơi.
        </p>

        <SecondaryButton onClick={onOpenEvent} icon={<Icon name="info" size={20} color="var(--primary)" />}>Xem chi tiết sự kiện</SecondaryButton>
      </ScrollArea>
      <BottomNav active="events" onNavigate={onNavigate} />
    </Screen>
  );
}

// ═══ 15. My events ══════════════════════════════════════════════════
function MyEventsScreen({ onBack, onOpenEvent, onShowQR, onNavigate, onProfile }) {
  const [tab, setTab] = useStateEv('upcoming');
  const tabs = [{ key: 'upcoming', label: 'Sắp tới' }, { key: 'past', label: 'Đã tham gia' }, { key: 'cancelled', label: 'Đã hủy' }];
  const myEvents = [
    { id: 'tay-phat', tint: 'forest', icon: 'park', title: 'Tay Phật Trong Tay Con', date: '24/05/2026', time: '17:00 – 20:30', location: 'Chùa Minh Đạo, TPHCM', status: 'checked-in' },
    { id: 'chien-binh', tint: 'sand', icon: 'child_care', title: 'Chiến Binh Nhí 2026', date: '12/06/2026', time: '08:00 – 17:00', location: 'Đà Lạt', status: 'pending' },
  ];
  const past = [
    { id: 'past1', tint: 'plum', icon: 'local_cafe', title: 'Thiền Trà Tháng 4', date: '15/04/2026', time: '15:00 – 17:00', location: 'Online', status: 'attended' },
  ];
  const list = tab === 'upcoming' ? myEvents : tab === 'past' ? past : [];
  return (
    <Screen>
      <TopBar title="Sự kiện của tôi" onBack={onBack} />
      <div style={{ padding: '4px 16px 14px' }}>
        <SegmentedTabs items={tabs} active={tab} onChange={setTab} />
      </div>
      <ScrollArea padding="0 16px 12px">
        {list.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {list.map(ev => (
              <div key={ev.id} style={{ background: '#fff', borderRadius: 20, padding: 16, boxShadow: 'var(--shadow-soft)' }}>
                <div style={{ display: 'flex', gap: 14 }}>
                  <ImageTile tint={ev.tint} icon={ev.icon} size={64} radius={14} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h4 style={{ font: '700 16px/1.3 var(--font-display)', color: 'var(--fg-1)', margin: '0 0 6px' }}>{ev.title}</h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--fg-3)', font: '500 12px var(--font-body)', marginBottom: 2 }}>
                      <Icon name="calendar_month" size={14} color="var(--primary)" />{ev.date} · {ev.time}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--fg-3)', font: '500 12px var(--font-body)' }}>
                      <Icon name="location_on" size={14} color="var(--primary)" />{ev.location}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 14, paddingTop: 14, borderTop: '1px solid rgba(190,200,207,0.35)' }}>
                  {ev.status === 'checked-in'
                    ? <Chip variant="success" icon="check_circle">Đã check-in</Chip>
                    : ev.status === 'attended'
                      ? <Chip variant="soft" icon="task_alt">Đã tham gia</Chip>
                      : <Chip variant="warm" icon="schedule">Chưa check-in</Chip>}
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => onOpenEvent && onOpenEvent(ev.id)} style={{
                      background: '#fff', border: '1.5px solid var(--outline-soft)',
                      padding: '8px 14px', borderRadius: 10, color: 'var(--fg-2)',
                      font: '600 13px var(--font-body)', cursor: 'pointer',
                    }}>Chi tiết</button>
                    {ev.status !== 'attended' && (
                      <button onClick={onShowQR} style={{
                        background: 'var(--primary)', border: 0,
                        padding: '8px 14px', borderRadius: 10, color: '#fff',
                        font: '700 13px var(--font-body)', cursor: 'pointer',
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                      }}><Icon name="qr_code_2" size={14} />Xem QR</button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon="event_busy"
            title="Bạn chưa đăng ký sự kiện nào."
            message="Khám phá những sự kiện sắp tới của Miền Tỉnh Thức."
            action="Xem sự kiện sắp tới"
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
