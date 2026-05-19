/* global React, Icon, PrimaryButton, SecondaryButton, TextButton,
   TextField, TextArea, Toggle, Chip, FilterPills, SegmentedTabs,
   TopBar, IconButton, BottomNav, SectionHeader,
   ListRow, Card, EmptyState, ImageTile, Screen, ScrollArea,
   SettingsCard, SettingsItem, Divider */

const { useState: useStateMore } = React;

// ═══ 25. More menu ══════════════════════════════════════════════════
function MoreScreen({ onCheckin, onContact, onCourses, onSaved, onPlaylists, onMyEvents, onSettings, onPrivacy, onSupport, onAbout, onProfile, onNotifications, onNavigate }) {
  return (
    <Screen>
      <TopBar title="Thêm" right={<><IconButton icon="notifications" badge={2} onClick={onNotifications} /><IconButton icon="account_circle" onClick={onProfile} /></>} />
      <ScrollArea padding="4px 16px 24px">
        <p style={{ font: '400 14px/1.55 var(--font-body)', color: 'var(--fg-2)', margin: '0 0 18px' }}>
          Các chức năng khác của ứng dụng.
        </p>

        <SectionHeader title="Cộng đồng" />
        <SettingsCard>
          <SettingsItem icon="qr_code_scanner" iconBg="#C1E8FF" iconColor="#006384" title="Check-in sự kiện" subtitle="Quét QR khi đến nơi" onClick={onCheckin} />
          <Divider />
          <SettingsItem icon="chat_bubble" iconBg="#FFDCC7" iconColor="#B85B00" title="Liên lạc" subtitle="Email, Zalo, Viber, Facebook" onClick={onContact} />
          <Divider />
          <SettingsItem icon="school" iconBg="#DCD0E8" iconColor="#5C3F86" title="Khóa học" subtitle="Các khoá tu, lớp học sắp tới" onClick={onCourses} />
        </SettingsCard>

        <div style={{ height: 22 }} />
        <SectionHeader title="Nội dung của tôi" />
        <SettingsCard>
          <SettingsItem icon="bookmark" iconBg="#FFE5D0" iconColor="#E57321" title="Nội dung đã lưu" subtitle="Video & audio bookmarks" onClick={onSaved} />
          <Divider />
          <SettingsItem icon="queue_music" iconBg="#C1E8FF" iconColor="#006384" title="Playlists" subtitle="3 danh sách" onClick={onPlaylists} />
          <Divider />
          <SettingsItem icon="event_available" iconBg="#D7F0D7" iconColor="#2E7D32" title="Sự kiện của tôi" subtitle="Mã QR và lịch tham dự" onClick={onMyEvents} />
        </SettingsCard>

        <div style={{ height: 22 }} />
        <SectionHeader title="Tài khoản & hỗ trợ" />
        <SettingsCard>
          <SettingsItem icon="settings" title="Cài đặt" onClick={onSettings} />
          <Divider />
          <SettingsItem icon="privacy_tip" title="Quyền riêng tư" onClick={onPrivacy} />
          <Divider />
          <SettingsItem icon="help_outline" title="Hỗ trợ" onClick={onSupport} />
          <Divider />
          <SettingsItem icon="info" title="Giới thiệu ứng dụng" onClick={onAbout} />
        </SettingsCard>

        <div style={{ height: 26 }} />
        <SectionHeader title="Sắp ra mắt" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <ComingSoonTile icon="self_improvement" label="Thiền tập hằng ngày" tint="mint" />
          <ComingSoonTile icon="edit_note" label="Nhật ký thực tập" tint="sand" />
          <ComingSoonTile icon="groups" label="Nhóm sinh hoạt" tint="sky" />
          <ComingSoonTile icon="school" label="Khóa học" tint="plum" />
        </div>
      </ScrollArea>
      <BottomNav active="more" onNavigate={onNavigate} />
    </Screen>
  );
}

function ComingSoonTile({ icon, label, tint }) {
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
      }}>Sắp ra mắt</div>
    </div>
  );
}

// ═══ 26. Contact ════════════════════════════════════════════════════
function ContactScreen({ onBack, onSubmit, onNavigate }) {
  const [vals, setVals] = useStateMore({ name: '', email: '', body: '' });
  const [sent, setSent] = useStateMore(false);
  const set = k => v => setVals({ ...vals, [k]: v });
  const submit = () => setSent(true);
  return (
    <Screen>
      <TopBar title="Liên lạc" onBack={onBack} />
      <ScrollArea padding="8px 16px 24px">
        <p style={{ font: '400 14px/1.55 var(--font-body)', color: 'var(--fg-2)', margin: '0 0 18px' }}>
          Bạn có thể liên lạc với chúng tôi qua các kênh bên dưới.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
          <ContactTile icon="mail" label="Gửi email" sub="hello@mientinhthuc.vn" color="#006384" tint="#EEF4FF" />
          <ContactTile icon="call" label="Gọi điện thoại" sub="0901 234 567" color="#2E7D32" tint="#D7F0D7" />
          <ContactTile icon="forum" label="Nhắn tin Zalo" sub="@mientinhthuc" color="#0084FF" tint="#D8ECFF" />
          <ContactTile icon="chat" label="Nhóm Viber" sub="Tham gia ngay" color="#7360F2" tint="#EAE2FF" />
          <ContactTile icon="language" label="Website" sub="mientinhthuc.vn" color="#B85B00" tint="#FFDCC7" />
          <ContactTile icon="facebook" label="Facebook" sub="/mientinhthuc" color="#1877F2" tint="#D8ECFF" />
        </div>
        <SectionHeader title="Gửi liên hệ" />
        {sent ? (
          <div style={{ background: '#fff', borderRadius: 20, padding: 22, boxShadow: 'var(--shadow-soft)', textAlign: 'center' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(46,125,50,0.10)', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="check_circle" size={40} color="var(--success)" filled />
            </div>
            <h3 style={{ font: '700 18px var(--font-display)', color: 'var(--fg-1)', margin: '0 0 6px' }}>Đã gửi liên hệ</h3>
            <p style={{ font: '400 14px/1.55 var(--font-body)', color: 'var(--fg-2)', margin: 0 }}>
              Cảm ơn bạn. Chúng tôi sẽ liên lạc lại trong thời gian sớm nhất.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <TextField label="Họ và tên" value={vals.name} onChange={set('name')} placeholder="Nguyễn An Nhiên" />
            <TextField label="Email" value={vals.email} onChange={set('email')} type="email" placeholder="annhien@example.com" />
            <TextArea label="Nội dung cần liên lạc" value={vals.body} onChange={set('body')} placeholder="Bạn muốn chia sẻ điều gì với chúng tôi?" rows={5} />
            <PrimaryButton onClick={submit}>Gửi liên hệ</PrimaryButton>
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
  return (
    <Screen>
      <TopBar title="Hồ sơ" onBack={onBack} />
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
          }}>Xem hồ sơ</button>
        </div>

        <SettingsCard>
          <SettingsItem icon="person" iconBg="#EEF4FF" title="Hồ sơ cá nhân" onClick={onViewProfile} />
          <Divider />
          <SettingsItem icon="bookmark" iconBg="#FFE5D0" iconColor="#E57321" title="Nội dung đã lưu" onClick={onSaved} />
          <Divider />
          <SettingsItem icon="queue_music" iconBg="#C1E8FF" iconColor="#006384" title="Playlists" onClick={onPlaylists} />
          <Divider />
          <SettingsItem icon="event_available" iconBg="#D7F0D7" iconColor="#2E7D32" title="Mã QR / Sự kiện của tôi" onClick={onMyEvents} />
        </SettingsCard>

        <div style={{ height: 18 }} />
        <SettingsCard>
          <SettingsItem icon="settings" title="Cài đặt" onClick={onSettings} />
          <Divider />
          <SettingsItem icon="privacy_tip" title="Quyền riêng tư" onClick={onPrivacy} />
          <Divider />
          <SettingsItem icon="help_outline" title="Hỗ trợ" onClick={onSupport} />
          <Divider />
          <SettingsItem icon="info" title="Giới thiệu ứng dụng" onClick={onAbout} />
        </SettingsCard>

        <div style={{ height: 18 }} />
        <SettingsCard>
          <SettingsItem icon="logout" iconBg="#FFDAD6" iconColor="var(--error)" title="Đăng xuất" danger onClick={onLogout} />
        </SettingsCard>
      </ScrollArea>
      <BottomNav active="more" onNavigate={onNavigate} />
    </Screen>
  );
}

// ═══ 28. View profile ══════════════════════════════════════════════
function ViewProfileScreen({ onBack, onEdit, onNavigate }) {
  return (
    <Screen>
      <TopBar title="Hồ sơ cá nhân" onBack={onBack} right={<IconButton icon="edit" onClick={onEdit} />} />
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
          <div style={{ font: '500 13px var(--font-body)', color: 'var(--fg-3)' }}>Thành viên từ tháng 03/2025</div>
        </div>
        <SettingsCard>
          <ProfileField label="Họ và tên" value="Nguyễn An Nhiên" />
          <Divider />
          <ProfileField label="Email" value="annhien@example.com" />
          <Divider />
          <ProfileField label="Số điện thoại" value="0400 123 456" />
          <Divider />
          <ProfileField label="Ngày sinh" value="14/08/1990" />
          <Divider />
          <ProfileField label="Thành phố" value="TP. Hồ Chí Minh" />
        </SettingsCard>
        <div style={{ height: 18 }} />
        <PrimaryButton icon="edit" onClick={onEdit}>Chỉnh sửa hồ sơ</PrimaryButton>
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
  const [vals, setVals] = useStateMore({
    name: 'Nguyễn An Nhiên',
    phone: '0400 123 456',
    city: 'TP. Hồ Chí Minh',
    bio: '',
  });
  const set = k => v => setVals({ ...vals, [k]: v });
  return (
    <Screen>
      <TopBar title="Chỉnh sửa hồ sơ" onBack={onBack} />
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
          <TextButton>Thay ảnh đại diện</TextButton>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <TextField label="Họ và tên" value={vals.name} onChange={set('name')} />
          <TextField label="Số điện thoại" value={vals.phone} onChange={set('phone')} type="tel" />
          <TextField label="Thành phố" value={vals.city} onChange={set('city')} />
          <TextArea label="Giới thiệu ngắn" value={vals.bio} onChange={set('bio')} placeholder="Vài dòng về bạn (không bắt buộc)" rows={3} />
        </div>

        <div style={{ display: 'flex', gap: 12, marginTop: 22 }}>
          <div style={{ flex: 1 }}><SecondaryButton onClick={onBack}>Hủy</SecondaryButton></div>
          <div style={{ flex: 1 }}><PrimaryButton onClick={onSave}>Lưu thay đổi</PrimaryButton></div>
        </div>
      </ScrollArea>
      <BottomNav active="more" onNavigate={onNavigate} />
    </Screen>
  );
}

// ═══ 30. Settings ═══════════════════════════════════════════════════
function SettingsScreen({ onBack, onNotifSettings, onLogout, onNavigate }) {
  const [dark, setDark] = useStateMore(false);
  return (
    <Screen>
      <TopBar title="Cài đặt" onBack={onBack} />
      <ScrollArea padding="12px 16px 24px">
        <SectionHeader title="Tài khoản" />
        <SettingsCard>
          <SettingsItem icon="account_circle" title="Tài khoản" subtitle="annhien@example.com" onClick={() => {}} />
          <Divider />
          <SettingsItem icon="lock" title="Đổi mật khẩu" onClick={() => {}} />
        </SettingsCard>

        <div style={{ height: 22 }} />
        <SectionHeader title="Tuỳ chọn ứng dụng" />
        <SettingsCard>
          <SettingsItem icon="language" title="Ngôn ngữ" right={<span style={{ font: '500 14px var(--font-body)', color: 'var(--fg-3)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>Tiếng Việt <Icon name="chevron_right" size={18} color="var(--fg-3)" /></span>} onClick={() => {}} />
          <Divider />
          <SettingsItem icon="dark_mode" title="Giao diện tối" right={<Toggle on={dark} onChange={setDark} />} />
          <Divider />
          <SettingsItem icon="notifications" title="Cài đặt thông báo" onClick={onNotifSettings} />
        </SettingsCard>

        <div style={{ height: 22 }} />
        <SectionHeader title="Khác" />
        <SettingsCard>
          <SettingsItem icon="cleaning_services" title="Xoá bộ nhớ tạm" subtitle="124 MB" onClick={() => {}} />
          <Divider />
          <SettingsItem icon="logout" iconBg="#FFDAD6" iconColor="var(--error)" title="Đăng xuất" danger onClick={onLogout} />
        </SettingsCard>
      </ScrollArea>
      <BottomNav active="more" onNavigate={onNavigate} />
    </Screen>
  );
}

// ═══ 31. Privacy ════════════════════════════════════════════════════
function PrivacyScreen({ onBack, onNavigate }) {
  return (
    <Screen>
      <TopBar title="Quyền riêng tư" onBack={onBack} />
      <ScrollArea padding="12px 16px 24px">
        <p style={{ font: '400 14px/1.6 var(--font-body)', color: 'var(--fg-2)', margin: '0 0 18px' }}>
          Miền Tỉnh Thức cam kết bảo vệ thông tin cá nhân của bạn và chỉ sử dụng dữ liệu để mang đến trải nghiệm an lành hơn.
        </p>
        <SettingsCard>
          <SettingsItem icon="badge" iconBg="#EEF4FF" title="Dữ liệu cá nhân" subtitle="Quản lý thông tin bạn đã chia sẻ" onClick={() => {}} />
          <Divider />
          <SettingsItem icon="event_note" iconBg="#FFDCC7" iconColor="#B85B00" title="Dữ liệu sự kiện" subtitle="Lịch tham dự, mã QR, ghi chú" onClick={() => {}} />
          <Divider />
          <SettingsItem icon="lock" title="Quyền truy cập nội dung" subtitle="Microphone, thông báo, lịch" onClick={() => {}} />
        </SettingsCard>

        <div style={{ height: 22 }} />
        <SettingsCard>
          <SettingsItem icon="description" title="Điều khoản sử dụng" onClick={() => {}} />
          <Divider />
          <SettingsItem icon="shield" title="Chính sách quyền riêng tư" onClick={() => {}} />
          <Divider />
          <SettingsItem icon="delete_forever" iconBg="#FFDAD6" iconColor="var(--error)" title="Xoá tài khoản" danger onClick={() => {}} />
        </SettingsCard>
      </ScrollArea>
      <BottomNav active="more" onNavigate={onNavigate} />
    </Screen>
  );
}

// ═══ 32. Support ════════════════════════════════════════════════════
function SupportScreen({ onBack, onContact, onNavigate }) {
  return (
    <Screen>
      <TopBar title="Hỗ trợ" onBack={onBack} />
      <ScrollArea padding="12px 16px 24px">
        <div style={{
          background: 'linear-gradient(135deg, #C1E8FF 0%, #EEF4FF 100%)',
          borderRadius: 20, padding: 20, marginBottom: 22,
        }}>
          <Icon name="support_agent" size={36} color="var(--primary)" filled />
          <h3 style={{ font: '700 18px var(--font-display)', color: 'var(--fg-1)', margin: '10px 0 6px' }}>Bạn cần hỗ trợ điều gì?</h3>
          <p style={{ font: '400 14px/1.5 var(--font-body)', color: 'var(--fg-2)', margin: '0 0 14px' }}>
            Chúng tôi sẵn sàng đồng hành cùng bạn.
          </p>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px',
            background: '#fff', borderRadius: 12,
          }}>
            <Icon name="search" size={20} color="var(--fg-3)" />
            <input placeholder="Tìm câu hỏi, hướng dẫn…" style={{
              flex: 1, border: 0, outline: 'none', background: 'transparent',
              font: '400 14px var(--font-body)', color: 'var(--fg-1)',
            }} />
          </div>
        </div>

        <SettingsCard>
          <SettingsItem icon="quiz" iconBg="#EEF4FF" title="Câu hỏi thường gặp" subtitle="Đăng ký, sự kiện, mã QR…" onClick={() => {}} />
          <Divider />
          <SettingsItem icon="forum" iconBg="#FFDCC7" iconColor="#B85B00" title="Liên hệ ban tổ chức" subtitle="Email, Zalo, Viber" onClick={onContact} />
          <Divider />
          <SettingsItem icon="rate_review" iconBg="#D7F0D7" iconColor="#2E7D32" title="Gửi góp ý" subtitle="Giúp chúng tôi cải thiện ứng dụng" onClick={() => {}} />
          <Divider />
          <SettingsItem icon="bug_report" iconBg="#FFDAD6" iconColor="var(--error)" title="Báo lỗi ứng dụng" onClick={() => {}} />
        </SettingsCard>

        <div style={{ height: 22 }} />
        <SectionHeader title="Liên hệ trực tiếp" />
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
  return (
    <Screen>
      <TopBar title="Giới thiệu ứng dụng" onBack={onBack} />
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
            Lan tỏa những giá trị Thật – Lành – Đẹp
          </p>
          <p style={{ font: '400 15px/1.65 var(--font-body)', color: 'var(--fg-2)', margin: '8px 0 0', maxWidth: 320 }}>
            Ứng dụng hỗ trợ cộng đồng cùng thực tập tỉnh thức, tham gia sự kiện, lắng nghe pháp thoại và nuôi dưỡng đời sống bình an.
          </p>
          <Chip variant="soft">Phiên bản beta v0.1</Chip>
        </div>

        <SettingsCard>
          <SettingsItem icon="description" title="Điều khoản sử dụng" onClick={() => {}} />
          <Divider />
          <SettingsItem icon="shield" title="Chính sách quyền riêng tư" onClick={() => {}} />
          <Divider />
          <SettingsItem icon="favorite" iconColor="var(--accent-warm)" iconBg="#FFDCC7" title="Cảm ơn cộng đồng" subtitle="Gửi đến những bạn đã đồng hành" onClick={() => {}} />
        </SettingsCard>

        <p style={{ font: 'var(--type-caption)', color: 'var(--fg-3)', textAlign: 'center', margin: '22px 0 0' }}>
          © 2026 Miền Tỉnh Thức · Made with care
        </p>
      </ScrollArea>
      <BottomNav active="more" onNavigate={onNavigate} />
    </Screen>
  );
}

// ═══ 34. Check-in (QR scanner) ═════════════════════════════════════
function CheckinScreen({ onBack, onNavigate }) {
  return (
    <Screen>
      <TopBar title="Check-in sự kiện" onBack={onBack} />
      <ScrollArea padding="16px 16px 24px">
        <p style={{ font: '400 14px/1.55 var(--font-body)', color: 'var(--fg-2)', margin: '0 0 18px', textAlign: 'center' }}>
          Đưa mã QR sự kiện của bạn vào khung dưới đây để check-in.
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
          <Chip variant="warm" icon="info">Đang chờ mã QR…</Chip>
        </div>
        <div style={{ marginTop: 26, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <SecondaryButton icon={<Icon name="qr_code_2" size={20} color="var(--primary)" />}>Hiện mã QR của tôi</SecondaryButton>
          <SecondaryButton icon={<Icon name="edit_note" size={20} color="var(--primary)" />}>Nhập mã thủ công</SecondaryButton>
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
