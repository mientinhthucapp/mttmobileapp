/* global React, Logo, Icon, PrimaryButton, SecondaryButton, TextButton,
   TextField, TextArea, Checkbox, Toggle, Chip, FilterPills, SegmentedTabs,
   TopBar, AppTopBar, IconButton, BottomNav, SocialButton, OrDivider,
   SectionHeader, ListRow, Card, EmptyState, ImageTile, Dot */

const { useState: useStateAuth } = React;

// Shared screen wrapper
function Screen({ children, bg = 'var(--background)', noBottomPad, topSafe = true }) {
  return (
    <div style={{
      width: '100%', height: '100%', background: bg, overflow: 'hidden',
      display: 'flex', flexDirection: 'column', position: 'relative',
      paddingTop: topSafe ? 60 : 0,
      paddingBottom: noBottomPad ? 0 : 72,
      boxSizing: 'border-box',
    }}>{children}</div>
  );
}

function ScrollArea({ children, padding = '0 16px' }) {
  return <div style={{ flex: 1, overflow: 'auto', padding, boxSizing: 'border-box' }}>{children}</div>;
}

// ═══ 01. Splash ═════════════════════════════════════════════════════
function SplashScreen({ onContinue }) {
  return (
    <Screen noBottomPad topSafe={false} bg="#FFF6E5">
      <div style={{ position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(180deg, #FFDDB0 0%, #FFE7C2 25%, #C7EAFF 60%, #FFFDF9 88%)',
      }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '60%',
        backgroundImage: 'radial-gradient(circle at 72% 32%, rgba(255,194,71,0.65), transparent 50%), radial-gradient(circle at 22% 60%, rgba(94,179,232,0.45), transparent 55%), radial-gradient(circle at 50% 12%, rgba(255,107,126,0.30), transparent 45%)',
      }} />
      <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop: 120, gap: 22 }}>
        <div style={{
          width: 132, height: 132, borderRadius: '50%', background: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 24px 60px rgba(229,115,33,0.18)',
        }}>
          <img src="assets/logo-mark.png" alt="" style={{ width: 88, height: 'auto' }} />
        </div>
        <h1 style={{ font: '700 32px var(--font-display)', color: 'var(--primary)', margin: 0, letterSpacing: '-0.01em' }}>Miền Tỉnh Thức</h1>
        <div style={{ position: 'relative', padding: '18px 28px', maxWidth: 320 }}>
          <div style={{ position: 'absolute', top: 0, left: 8, font: '700 36px var(--font-display)', color: 'rgba(0,99,132,0.18)', lineHeight: 1 }}>“</div>
          <p style={{
            font: 'italic 500 15px/1.7 var(--font-body)',
            color: 'var(--fg-2)', margin: 0, textAlign: 'center',
          }}>
            Tay Phật trong tay con<br/>
            Từng bước về tỉnh thức<br/>
            Chưa bao giờ gần hơn<br/>
            Cõi linh thiêng rất thật
          </p>
          <div style={{ textAlign: 'center', marginTop: 10, font: '600 11px var(--font-body)', letterSpacing: '0.22em', color: 'var(--primary)' }}>— MINH NIỆM —</div>
        </div>
      </div>
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, paddingBottom: 56 }}>
        <Icon name="spa" size={48} style={{ color: 'rgba(184,91,0,0.18)' }} />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--primary)', animation: 'mtt-pulse 1.6s ease-in-out infinite' }} />
          <span style={{ font: '600 11px var(--font-body)', letterSpacing: '0.22em', color: 'var(--fg-3)' }}>ĐANG KHỞI TẠO…</span>
        </div>
        <button onClick={onContinue} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', background: 'transparent', border: 0 }} aria-label="Tap to continue" />
      </div>
      <style>{`@keyframes mtt-pulse { 0%,100% { opacity: 1 } 50% { opacity: 0.35 } }`}</style>
    </Screen>
  );
}

// ═══ 02. Welcome ════════════════════════════════════════════════════
function WelcomeScreen({ onSignup, onLogin }) {
  const [agreed, setAgreed] = useStateAuth(false);
  return (
    <Screen noBottomPad topSafe={false} bg="#FFF6E5">
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(180deg, #FFDDB0 0%, #FFE7C2 25%, #C7EAFF 60%, #FFFDF9 88%)',
      }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '60%', zIndex: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle at 72% 32%, rgba(255,194,71,0.65), transparent 50%), radial-gradient(circle at 22% 60%, rgba(94,179,232,0.45), transparent 55%), radial-gradient(circle at 50% 12%, rgba(255,107,126,0.30), transparent 45%)',
      }} />
      <div style={{
        height: 320, width: '100%', position: 'relative', zIndex: 1,
        overflow: 'hidden',
      }}>
        <img
          src="assets/logo-mark.png"
          alt=""
          style={{
            position: 'absolute',
            left: '50%',
            bottom: 18,
            width: 120,
            height: 'auto',
            transform: 'translateX(-50%)',
            zIndex: 2,
          }}
        />
      </div>
      <div style={{ flex: 1, padding: '18px 24px 28px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, position: 'relative', zIndex: 1 }}>
        <h1 style={{ font: '700 30px var(--font-display)', color: 'var(--primary)', margin: 0, letterSpacing: '-0.01em' }}>Miền Tỉnh Thức</h1>
        <p style={{ font: '400 15px/1.55 var(--font-body)', color: 'var(--fg-2)', textAlign: 'center', margin: 0, maxWidth: 320 }}>
          Cộng đồng của những người thực hành Thiền và Tâm lý chữa lành nhằm xây dựng đời sống tỉnh thức, đời sống với giá trị Thật-Lành-Đẹp.
        </p>
        <div style={{ flex: 1 }} />
        <div style={{ width: '100%' }}>
          <Checkbox checked={agreed} onChange={setAgreed}>
            Tôi chấp thuận các <strong style={{ color: 'var(--primary)' }}>Điều khoản &amp; Điều kiện</strong> và xác nhận đã hiểu <strong style={{ color: 'var(--primary)' }}>Chính sách Bảo mật</strong> của Miền Tỉnh Thức.
          </Checkbox>
        </div>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <PrimaryButton onClick={onSignup} disabled={!agreed}>Đăng ký</PrimaryButton>
          <SecondaryButton onClick={onLogin}>Đăng nhập</SecondaryButton>
        </div>
      </div>
    </Screen>
  );
}

// ═══ 03. Sign-up chooser ════════════════════════════════════════════
function SignupChooserScreen({ onEmail, onLogin, onBack, onApple, onGoogle, onFacebook }) {
  return (
    <Screen noBottomPad topSafe={false}>
      <div style={{
        height: 280, width: '100%', position: 'relative',
        background: 'linear-gradient(180deg, #B7E1FF 0%, #FFD08A 55%, #FFE3D0 100%)',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(255,236,180,0.85), transparent 45%), radial-gradient(circle at 82% 28%, rgba(255,255,255,0.6), transparent 35%), radial-gradient(circle at 20% 85%, rgba(143,210,150,0.55), transparent 55%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 100,
          background: 'linear-gradient(180deg, transparent, var(--background))' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src="assets/logo-mark.png" alt="" style={{ width: 100, height: 'auto', zIndex: 1 }} />
        </div>
        {/* back button */}
        <div style={{ position: 'absolute', top: 60, left: 12, zIndex: 2 }}>
          <IconButton icon="arrow_back" onClick={onBack} />
        </div>
      </div>
      <div style={{ flex: 1, padding: '8px 24px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
        <h1 style={{ font: '700 28px var(--font-display)', color: 'var(--fg-1)', margin: '14px 0 4px' }}>Đăng ký tài khoản</h1>
        <p style={{ font: '400 15px var(--font-body)', color: 'var(--fg-2)', margin: 0, textAlign: 'center' }}>
          Bắt đầu hành trình quay về với chính mình
        </p>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12, marginTop: 22 }}>
          <PrimaryButton variant="warm" icon="mail" onClick={onEmail}>Tiếp tục với Email</PrimaryButton>
          <OrDivider />
          <SocialButton provider="google" onClick={onGoogle} />
          <SocialButton provider="facebook" onClick={onFacebook} />
          <SocialButton provider="apple" onClick={onApple} />
        </div>
        <div style={{ flex: 1 }} />
        <p style={{ font: '400 14px var(--font-body)', color: 'var(--fg-2)', textAlign: 'center', margin: 0 }}>
          Đã có tài khoản?{' '}
          <button onClick={onLogin} style={{ background: 'transparent', border: 0, color: 'var(--primary)', font: '700 14px var(--font-body)', cursor: 'pointer', padding: 0 }}>Đăng nhập</button>
        </p>
      </div>
    </Screen>
  );
}

// ═══ 04. Sign-in ════════════════════════════════════════════════════
function LoginScreen({ onLogin, onSignup, onForgot, onBack }) {
  const [email, setEmail] = useStateAuth('');
  const [pw, setPw] = useStateAuth('');
  return (
    <Screen>
      <TopBar onBack={onBack} />
      <ScrollArea>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '8px 0 20px' }}>
          <img src="assets/logo-mark.png" alt="" style={{ width: 88 }} />
          <h1 style={{ font: '700 32px var(--font-display)', color: 'var(--fg-1)', margin: '20px 0 4px', letterSpacing: '-0.01em' }}>Đăng nhập</h1>
          <p style={{ font: '400 14px var(--font-body)', color: 'var(--fg-2)', margin: 0 }}>Chào mừng bạn quay lại</p>
        </div>
        <div style={{
          background: 'rgba(255,255,255,0.85)', borderRadius: 24, padding: 22,
          boxShadow: 'var(--shadow-soft)', display: 'flex', flexDirection: 'column', gap: 16,
        }}>
          <TextField label="Email" value={email} onChange={setEmail} placeholder="example@email.com" type="email" />
          <TextField label="Mật khẩu" value={pw} onChange={setPw} placeholder="••••••••" type="password" icon="lock" />
          <div style={{ textAlign: 'right', marginTop: -4 }}>
            <TextButton onClick={onForgot} color="var(--accent-warm)">Quên mật khẩu?</TextButton>
          </div>
          <PrimaryButton variant="warm" onClick={onLogin}>Đăng nhập</PrimaryButton>
          <OrDivider />
          <SocialButton provider="google" />
          <SocialButton provider="facebook" />
          <SocialButton provider="apple" />
        </div>
        <p style={{ font: '400 14px var(--font-body)', color: 'var(--fg-2)', textAlign: 'center', margin: '20px 0' }}>
          Chưa có tài khoản?{' '}
          <button onClick={onSignup} style={{ background: 'transparent', border: 0, color: 'var(--accent-warm)', font: '700 14px var(--font-body)', cursor: 'pointer', padding: 0 }}>Tạo tài khoản</button>
        </p>
      </ScrollArea>
    </Screen>
  );
}

// ═══ 05. Email sign-up ═════════════════════════════════════════════
function SignupEmailScreen({ onContinue, onLogin, onBack }) {
  const [vals, setVals] = useStateAuth({ last: '', first: '', email: '', phone: '', pw: '', confirm: '' });
  const set = k => v => setVals({ ...vals, [k]: v });
  return (
    <Screen>
      <TopBar onBack={onBack} right={
        <span style={{ font: '400 13px var(--font-body)', color: 'var(--fg-2)', paddingRight: 6 }}>
          Đã có tài khoản? <button onClick={onLogin} style={{ background:'transparent', border:0, color:'var(--accent-warm)', font: '700 13px var(--font-body)', cursor:'pointer', padding: 0 }}>Đăng nhập</button>
        </span>
      } />
      <ScrollArea>
        <h1 style={{ font: '700 28px var(--font-display)', color: 'var(--fg-1)', margin: '4px 0 22px', letterSpacing: '-0.01em' }}>Đăng ký bằng email</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ flex: '1 1 0', minWidth: 0 }}>
              <TextField label="Họ" value={vals.last} onChange={set('last')} placeholder="Nguyễn" />
            </div>
            <div style={{ flex: '1 1 0', minWidth: 0 }}>
              <TextField label="Tên" value={vals.first} onChange={set('first')} placeholder="An" />
            </div>
          </div>
          <TextField label="Email" value={vals.email} onChange={set('email')} placeholder="email@example.com" type="email" />
          <TextField label="Số điện thoại" value={vals.phone} onChange={set('phone')} placeholder="090 123 4567" type="tel" />
          <TextField label="Mật khẩu" value={vals.pw} onChange={set('pw')} placeholder="••••••••" type="password" />
          <TextField label="Xác nhận mật khẩu" value={vals.confirm} onChange={set('confirm')} placeholder="••••••••" type="password" />
        </div>
        <p style={{ font: '400 13px/1.55 var(--font-body)', color: 'var(--fg-2)', margin: '18px 0' }}>
          Bằng cách nhấn tiếp tục, bạn đồng ý với <strong style={{ color: 'var(--primary)' }}>điều khoản &amp; điều kiện</strong> và <strong style={{ color: 'var(--primary)' }}>chính sách bảo mật</strong> của đoàn thể.
        </p>
        <PrimaryButton variant="warm" onClick={onContinue}>Tạo tài khoản</PrimaryButton>
        <div style={{ height: 24 }} />
      </ScrollArea>
    </Screen>
  );
}

// ═══ 06. Forgot password ═══════════════════════════════════════════
function ForgotPasswordScreen({ onSubmit, onBack, sent }) {
  const [email, setEmail] = useStateAuth('');
  const [done, setDone] = useStateAuth(!!sent);
  const submit = () => { setDone(true); onSubmit && onSubmit(); };
  return (
    <Screen>
      <TopBar onBack={onBack} title="Quên mật khẩu" />
      <ScrollArea>
        {!done ? (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 0 28px', textAlign: 'center', gap: 14 }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#EEF4FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                <Icon name="lock_reset" size={44} />
              </div>
              <h1 style={{ font: '700 24px var(--font-display)', color: 'var(--fg-1)', margin: 0 }}>Quên mật khẩu</h1>
              <p style={{ font: '400 14px/1.55 var(--font-body)', color: 'var(--fg-2)', margin: 0, maxWidth: 300 }}>
                Nhập email của bạn để nhận hướng dẫn đặt lại mật khẩu.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <TextField label="Email" value={email} onChange={setEmail} placeholder="example@email.com" type="email" icon="mail" />
              <PrimaryButton variant="warm" onClick={submit}>Gửi hướng dẫn</PrimaryButton>
              <div style={{ textAlign: 'center' }}>
                <TextButton onClick={onBack}>Quay lại đăng nhập</TextButton>
              </div>
            </div>
          </>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 0', textAlign: 'center', gap: 14 }}>
            <div style={{ width: 88, height: 88, borderRadius: '50%', background: 'rgba(46,125,50,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="mark_email_read" size={48} color="var(--success)" filled />
            </div>
            <h1 style={{ font: '700 24px var(--font-display)', color: 'var(--fg-1)', margin: 0 }}>Kiểm tra email của bạn</h1>
            <p style={{ font: '400 14px/1.55 var(--font-body)', color: 'var(--fg-2)', margin: 0, maxWidth: 320 }}>
              Chúng tôi đã gửi hướng dẫn đặt lại mật khẩu nếu email này đã được đăng ký.
            </p>
            <div style={{ width: '100%', marginTop: 14 }}>
              <PrimaryButton onClick={onBack}>Quay lại đăng nhập</PrimaryButton>
            </div>
          </div>
        )}
      </ScrollArea>
    </Screen>
  );
}

// ═══ 07. Basic onboarding (interest chips) ═════════════════════════
function OnboardingScreen({ onFinish, onSkip }) {
  const [selected, setSelected] = useStateAuth(new Set(['Thiền tập']));
  const options = ['Thiền tập', 'Pháp thoại', 'Sự kiện cộng đồng', 'Kỹ năng sống', 'Nhật ký thực tập', 'Tâm lý chữa lành', 'Âm nhạc thư giãn'];
  const toggle = (opt) => {
    const next = new Set(selected);
    if (next.has(opt)) next.delete(opt); else next.add(opt);
    setSelected(next);
  };
  return (
    <Screen>
      <TopBar right={<TextButton onClick={onSkip}>Bỏ qua</TextButton>} />
      <ScrollArea>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px 0 22px', textAlign: 'center', gap: 12 }}>
          <Icon name="self_improvement" size={72} color="var(--accent-warm)" />
          <h1 style={{ font: '700 26px var(--font-display)', color: 'var(--fg-1)', margin: 0, letterSpacing: '-0.01em' }}>Một vài bước nhỏ để bắt đầu</h1>
          <p style={{ font: '400 15px/1.55 var(--font-body)', color: 'var(--fg-2)', margin: 0, maxWidth: 320 }}>
            Bạn quan tâm điều gì? Chọn vài chủ đề để chúng tôi gợi ý nội dung phù hợp.
          </p>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', margin: '12px 0 24px' }}>
          {options.map(opt => {
            const on = selected.has(opt);
            return (
              <button key={opt} onClick={() => toggle(opt)}
                style={{
                  padding: '12px 18px', borderRadius: 9999,
                  background: on ? 'var(--primary)' : '#fff',
                  color: on ? '#fff' : 'var(--fg-1)',
                  border: on ? 0 : '1.5px solid var(--outline-soft)',
                  font: '600 14px var(--font-body)', cursor: 'pointer',
                  boxShadow: on ? '0 6px 16px rgba(0,99,132,0.18)' : 'none',
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                }}>
                {on && <Icon name="check" size={16} />}
                {opt}
              </button>
            );
          })}
        </div>
        <div style={{ height: 20 }} />
        <PrimaryButton variant="warm" onClick={onFinish}>Hoàn tất</PrimaryButton>
        <div style={{ textAlign: 'center', marginTop: 12 }}>
          <TextButton onClick={onSkip}>Bỏ qua</TextButton>
        </div>
      </ScrollArea>
    </Screen>
  );
}

Object.assign(window, {
  Screen, ScrollArea,
  SplashScreen, WelcomeScreen, SignupChooserScreen, LoginScreen, SignupEmailScreen,
  ForgotPasswordScreen, OnboardingScreen,
});
