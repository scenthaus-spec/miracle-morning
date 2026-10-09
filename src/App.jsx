import { useState, useEffect, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const ADMIN_EMAIL = "dotemiracle@gmail.com"; // 관리자 이메일

const DAYS = ["일", "월", "화", "수", "목", "금", "토"];

const ALL_CHALLENGES = [
  { name: "01 감정 아로마 21일 챌린지", icon: "💚", routines: [
    { id:1, icon:"🌸", name:"오늘의 향기 체크", duration:5 },
    { id:2, icon:"🧘", name:"향기 명상", duration:10 },
    { id:3, icon:"📓", name:"감사 일기 쓰기", duration:10 },
  ]},
  { name: "02 차크라 아로마 21일 챌린지", icon: "🧘", routines: [
    { id:1, icon:"🧘", name:"차크라 명상", duration:10 },
    { id:2, icon:"📓", name:"차크라 저널링", duration:10 },
    { id:3, icon:"🌿", name:"차크라 오일 바르기", duration:5 },
    { id:4, icon:"📝", name:"EMC 저널링", duration:10 },
  ]},
  { name: "03 성경 아로마 21일 챌린지", icon: "✝️", routines: [
    { id:1, icon:"📖", name:"오늘의 말씀 읽기", duration:10 },
    { id:2, icon:"🌿", name:"성경 오일 묵상", duration:10 },
    { id:3, icon:"📓", name:"챌린지북 작성", duration:10 },
  ]},
  { name: "04 뉴로 아로마 21일 챌린지", icon: "🧠", routines: [
    { id:1, icon:"🧠", name:"뉴로헬스 인증", duration:5 },
    { id:2, icon:"👃", name:"후각 호흡 3분", duration:3 },
    { id:3, icon:"🤲", name:"향기 뉴로터치 8", duration:10 },
    { id:4, icon:"🌿", name:"신경 안정 오일 수시로 맡기", duration:5 },
    { id:5, icon:"📓", name:"챌린지북 작성", duration:10 },
  ]},
  { name: "05 인지후각 아로마 21일 챌린지", icon: "👃", routines: [
    { id:1, icon:"🌸", name:"오늘의 향기 체크", duration:5 },
    { id:2, icon:"🧠", name:"향기 기억 훈련", duration:10 },
    { id:3, icon:"📓", name:"향기 표현 저널링", duration:10 },
    { id:4, icon:"📝", name:"인지후각 챌린지북 작성", duration:10 },
  ]},
  { name: "06 셀톡스 아로마 21일 챌린지", icon: "🔬", routines: [
    { id:1, icon:"🌿", name:"셀톡스 집중 오일 바르기", duration:5 },
    { id:2, icon:"💧", name:"레몬수 물 마시기 체크", duration:3 },
    { id:3, icon:"💆", name:"복부 또는 림프 마사지", duration:10 },
    { id:4, icon:"💊", name:"영양제 먹기", duration:3 },
  ]},
  { name: "07 두톡스 아로마 21일 챌린지", icon: "💆", routines: [
    { id:1, icon:"🌿", name:"두피 오일 케어", duration:10 },
    { id:2, icon:"🪄", name:"목·어깨 괄사 마사지", duration:10 },
    { id:3, icon:"✅", name:"두피 순환 체크", duration:5 },
    { id:4, icon:"📸", name:"두톡스 루틴 인증", duration:5 },
  ]},
  { name: "08 경피독 아로마 21일 챌린지", icon: "🛡️", routines: [
    { id:1, icon:"🔍", name:"오늘의 경피독 체크", duration:5 },
    { id:2, icon:"🏷️", name:"생활용품 성분 확인", duration:10 },
    { id:3, icon:"🌿", name:"천연 아로마 대체 루틴", duration:10 },
    { id:4, icon:"📸", name:"경피독 줄이기 미션 인증", duration:5 },
  ]},
  { name: "09 호르몬 밸런스 아로마 21일 챌린지", icon: "⚖️", routines: [
    { id:1, icon:"📊", name:"여성 리듬 체크", duration:5 },
    { id:2, icon:"🌿", name:"하복부 또는 발목 오일 바르기", duration:5 },
    { id:3, icon:"🌬️", name:"호르몬 밸런스 호흡", duration:10 },
    { id:4, icon:"📓", name:"호르몬 저널링북 완성", duration:10 },
  ]},
  { name: "10 엄마 마음 회복 아로마 21일 챌린지", icon: "💗", routines: [
    { id:1, icon:"💗", name:"오늘의 엄마 마음 체크", duration:5 },
    { id:2, icon:"🌿", name:"나를 위한 향기 루틴", duration:10 },
    { id:3, icon:"🧘", name:"5분 쉼 명상", duration:5 },
    { id:4, icon:"📓", name:"엄마 마음 저널링", duration:10 },
  ]},
  { name: "11 키즈 아로마 21일 챌린지", icon: "🧒", routines: [
    { id:1, icon:"👩‍🏫", name:"미라클 선생님 만나기", duration:10 },
    { id:2, icon:"🤲", name:"8종 터치", duration:10 },
    { id:3, icon:"📓", name:"키즈 아로마 일기장 쓰기", duration:10 },
  ]},
  { name: "12 키즈 성장 아로마 21일 챌린지", icon: "🌱", routines: [
    { id:1, icon:"🤸", name:"성장 스트레칭", duration:10 },
    { id:2, icon:"🌿", name:"발바닥 오일 케어", duration:5 },
    { id:3, icon:"😴", name:"수면 루틴 체크", duration:5 },
    { id:4, icon:"📓", name:"키즈 성장 기록 작성", duration:10 },
  ]},
  { name: "13 청소년 마음키우기 아로마 21일 챌린지", icon: "🌟", routines: [
    { id:1, icon:"🌤️", name:"오늘의 마음 날씨 체크", duration:5 },
    { id:2, icon:"👃", name:"나에게 맞는 향기 찾기", duration:10 },
    { id:3, icon:"🌿", name:"집중 또는 안정 오일 사용", duration:5 },
    { id:4, icon:"📓", name:"감정 표현 저널링", duration:10 },
  ]},
  { name: "14 아로마터치 21일 챌린지", icon: "🤲", routines: [
    { id:1, icon:"📚", name:"오늘의 터치 부위 배우기", duration:10 },
    { id:2, icon:"🤲", name:"손·발 아로마터치", duration:10 },
    { id:3, icon:"🌿", name:"오일 사용 루틴", duration:5 },
    { id:4, icon:"📓", name:"케어 후 느낌 기록", duration:5 },
  ]},
  { name: "15 19금 아로마 21일 챌린지", icon: "🔞", routines: [
    { id:1, icon:"💫", name:"나의 몸 감각 체크", duration:5 },
    { id:2, icon:"🌹", name:"분위기 오일 루틴", duration:10 },
    { id:3, icon:"🤲", name:"터치 또는 셀프케어 루틴", duration:10 },
    { id:4, icon:"📓", name:"나를 위한 감각 저널링", duration:10 },
  ]},
];

function getRoutinesForChallenge(name) {
  const found = ALL_CHALLENGES.find(c => c.name === name);
  if (found) return found.routines;
  return [
    { id:1, icon:"🌅", name:"명상", duration:10 },
    { id:2, icon:"📓", name:"저널링", duration:10 },
    { id:3, icon:"🌿", name:"아로마 오일 바르기", duration:5 },
    { id:4, icon:"📝", name:"EMC 저널링", duration:10 },
  ];
}

function getTodayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}
function formatDate(d = new Date()) {
  return `${d.getFullYear()}년 ${d.getMonth()+1}월 ${d.getDate()}일 (${DAYS[d.getDay()]})`;
}
function formatTime(d = new Date()) {
  return `${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}`;
}
function daysSince(dateStr) {
  return Math.floor((new Date() - new Date(dateStr)) / 86400000) + 1;
}
function isActive(c) {
  const now = new Date();
  const start = new Date(c.start_date);
  const end = c.end_date ? new Date(c.end_date) : null;
  return start <= now && (!end || end >= now);
}

function Spinner() {
  return (
    <div style={{ display:"flex", justifyContent:"center", padding:"3rem" }}>
      <div style={{ width:32, height:32, border:"3px solid #e6e6e8", borderTop:"3px solid #111", borderRadius:"50%", animation:"spin 0.8s linear infinite" }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ── 사진 인증 팝업 ────────────────────────────────────────────────────────────
function PhotoModal({ routine, userId, challengeId, today, onClose, onUploaded }) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [done, setDone] = useState(false);

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target.result);
    reader.readAsDataURL(file);
    setUploading(true);
    const path = `${userId}/${challengeId}/${today}/routine_${routine.id}.jpg`;
    const { error } = await supabase.storage.from("photos").upload(path, file, { upsert: true });
    if (!error) {
      const { data } = supabase.storage.from("photos").getPublicUrl(path);
      onUploaded(routine.id, data.publicUrl);
      setDone(true);
    }
    setUploading(false);
  };

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.7)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:300, padding:"1rem" }}>
      <div style={{ background:"#fff", borderRadius:12, padding:"1.75rem", width:"100%", maxWidth:340, textAlign:"center" }}>
        <div className="mc-eb" style={{ marginBottom:8 }}>Photo · 사진 인증</div>
        <div style={{ fontWeight:700, fontSize:18, marginBottom:4 }}>{routine.name}</div>
        <div style={{ fontSize:14, color:"#888", marginBottom:20 }}>{done ? "인증 완료! 🎉" : "인증 사진을 올려주세요 📸"}</div>
        {preview && <img src={preview} alt="미리보기" style={{ width:"100%", borderRadius:4, marginBottom:16, maxHeight:220, objectFit:"cover" }} />}
        {done ? (
          <button onClick={onClose} style={{ width:"100%", padding:"13px", borderRadius:12, border:"1px solid #F2D27A", background:"#FADF96", color:"#4A3B00", fontWeight:700, fontSize:16, cursor:"pointer" }}>✓ 확인</button>
        ) : (
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            <label style={{ display:"block", padding:"13px", borderRadius:12, background:"#FADF96", color:"#4A3B00", fontWeight:600, fontSize:15, cursor:"pointer" }}>
              <input type="file" accept="image/*" capture="environment" style={{ display:"none" }} onChange={handleFile} />
              {uploading ? "업로드 중..." : "📷 지금 사진 찍기"}
            </label>
            <label style={{ display:"block", padding:"13px", borderRadius:12, border:"1.5px solid #ddd", background:"transparent", color:"#555", fontWeight:500, fontSize:15, cursor:"pointer" }}>
              <input type="file" accept="image/*" style={{ display:"none" }} onChange={handleFile} />
              🖼️ 갤러리에서 선택
            </label>
            <button onClick={onClose} style={{ padding:"11px", borderRadius:12, border:"none", background:"#f5f5f5", color:"#999", fontWeight:500, fontSize:14, cursor:"pointer" }}>나중에 할게요</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── 로그인 ───────────────────────────────────────────────────────────────────
function LoginScreen({ onBack }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = async () => {
    setLoading(true); setError("");
    const { error: err } = isSignUp
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });
    if (err) setError(err.message);
    setLoading(false);
  };

  return (
    <div className="mc-login">
      <section className="mc-hero">
        <div className="mc-eb">Miracle Challenge</div>
        <h1 className="mc-h">{isSignUp ? "회원가입" : "로그인"}</h1>
        <p className="mc-lead">21일 챌린지 참가 · 매일 인증</p>
      </section>
      <div className="mc-form">
        {error && <p className="mc-err">{error}</p>}
        <label className="mc-fld"><span>Email</span>
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="이메일" type="email" /></label>
        <label className="mc-fld"><span>Password</span>
          <input value={password} onChange={e => setPassword(e.target.value)} placeholder="비밀번호" type="password"
            onKeyDown={e => { if (e.key === "Enter") handleAuth(); }} /></label>
        <button className="mc-go" onClick={handleAuth} disabled={loading}>
          {loading ? "처리 중..." : isSignUp ? "회원가입" : "로그인"}
        </button>
        <div className="mc-alt">
          {onBack ? <button className="mc-link" onClick={onBack}>← 둘러보기</button> : <span />}
          <button className="mc-link" onClick={() => setIsSignUp(s => !s)}>{isSignUp ? "로그인으로" : "회원가입"}</button>
        </div>
      </div>
    </div>
  );
}

// ── 관리자 패널 ───────────────────────────────────────────────────────────────
function AdminPanel({ userId, onBack }) {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [codes, setCodes] = useState([]);
  const [members, setMembers] = useState([]);
  const [tab, setTab] = useState("challenges");
  const [startDate, setStartDate] = useState(getTodayStr());
  const [endDate, setEndDate] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const loadChallenges = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from("challenges").select("*").order("created_at", { ascending: false });
    setChallenges(data || []);
    setLoading(false);
  }, []);

  useEffect(() => { loadChallenges(); }, [loadChallenges]);

  const createChallenge = async () => {
    if (!selectedTemplate) return;
    setCreating(true);
    const { data } = await supabase.from("challenges").insert({
      name: selectedTemplate.name,
      description: `${selectedTemplate.name} - ${startDate} ~ ${endDate || "무기한"}`,
      duration_days: 21,
      start_date: startDate,
      end_date: endDate || null,
      created_by: userId,
    }).select().single();
    if (data) {
      await supabase.from("challenge_members").insert({ challenge_id: data.id, user_id: userId, role: "admin" });
    }
    setSelectedTemplate(null);
    setCreating(false);
    loadChallenges();
  };

  const generateCode = async (challengeId) => {
    const code = Math.random().toString(36).substring(2, 10).toUpperCase();
    await supabase.from("activation_codes").insert({ code, challenge_id: challengeId });
    loadCodesForChallenge(challengeId);
  };

  const loadCodesForChallenge = async (challengeId) => {
    const { data } = await supabase.from("activation_codes").select("*").eq("challenge_id", challengeId).order("created_at", { ascending: false });
    setCodes(data || []);
  };

  const loadMembersForChallenge = async (challengeId) => {
    const { data: memberList } = await supabase.from("challenge_members").select("*, auth_users:user_id(email)").eq("challenge_id", challengeId);
    const { data: records } = await supabase.from("daily_records").select("*").eq("challenge_id", challengeId);
    const { data: completions } = await supabase.from("completions").select("*").eq("challenge_id", challengeId);
    const enriched = (memberList || []).map(m => {
      const myRec = (records || []).filter(r => r.user_id === m.user_id);
      const totalDone = myRec.reduce((a, r) => a + r.completed_routines, 0);
      const totalPossible = myRec.length * 4;
      const pct = totalPossible > 0 ? Math.round(totalDone / totalPossible * 100) : 0;
      const completion = (completions || []).find(c => c.user_id === m.user_id);
      const todayRec = myRec.find(r => r.record_date === getTodayStr());
      const todayPhotos = todayRec?.routine_photos ? Object.values(todayRec.routine_photos) : [];
      return { ...m, pct, days: myRec.length, completion, todayPhotos };
    });
    setMembers(enriched);
  };

  const setLeader = async (challengeId, memberId, currentRole) => {
    const newRole = currentRole === "leader" ? "member" : "leader";
    await supabase.from("challenge_members").update({ role: newRole }).eq("id", memberId);
    loadMembersForChallenge(challengeId);
  };

  const confirmCompletion = async (challengeId, memberUserId) => {
    await supabase.from("completions").upsert({
      challenge_id: challengeId, user_id: memberUserId,
      confirmed_by: userId, confirmed_at: new Date().toISOString(), gift_sent: true,
    }, { onConflict: "challenge_id,user_id" });
    loadMembersForChallenge(challengeId);
  };

  const toggleActive = async (challenge) => {
    const today = getTodayStr();
    if (isActive(challenge)) {
      await supabase.from("challenges").update({ end_date: today }).eq("id", challenge.id);
    } else {
      await supabase.from("challenges").update({ start_date: today, end_date: null }).eq("id", challenge.id);
    }
    loadChallenges();
  };

  if (selectedChallenge) {
    return (
      <div style={{ minHeight:"100vh", background:"#fafafa" }}>
        <div style={{ maxWidth:480, margin:"0 auto", background:"#fff", minHeight:"100vh" }}>
          <div style={{ padding:"1.25rem", display:"flex", alignItems:"center", gap:12, borderBottom:"0.5px solid #e6e6e8" }}>
            <button onClick={() => { setSelectedChallenge(null); setCodes([]); setMembers([]); }} style={{ background:"none", border:"none", fontSize:22, cursor:"pointer" }}>←</button>
            <div style={{ flex:1, fontWeight:700, fontSize:16 }}>{selectedChallenge.name}</div>
            <div style={{ fontSize:12, padding:"4px 10px", borderRadius:4, background: isActive(selectedChallenge) ? "#f4f4f2" : "#fee2e2", color: isActive(selectedChallenge) ? "#111" : "#991b1b", fontWeight:600 }}>
              {isActive(selectedChallenge) ? "활성" : "비활성"}
            </div>
          </div>

          <div style={{ display:"flex", borderBottom:"0.5px solid #e6e6e8" }}>
            {[{key:"members", label:"멤버"}, {key:"codes", label:"코드"}, {key:"settings", label:"설정"}].map(t => (
              <button key={t.key} onClick={() => { setTab(t.key); if(t.key==="codes") loadCodesForChallenge(selectedChallenge.id); if(t.key==="members") loadMembersForChallenge(selectedChallenge.id); }}
                style={{ flex:1, padding:"12px", border:"none", background:"none", borderBottom: tab===t.key ? "2px solid #111" : "none", color: tab===t.key ? "#111" : "#888", fontWeight: tab===t.key ? 700 : 400, cursor:"pointer", fontSize:14 }}>
                {t.label}
              </button>
            ))}
          </div>

          <div style={{ padding:"1rem 1.25rem" }}>
            {tab === "members" && (
              <div>
                <div style={{ fontWeight:600, marginBottom:12 }}>참가자 {members.length}명</div>
                {members.map(m => (
                  <div key={m.id} style={{ background:"#fafafa", borderRadius:4, padding:"1rem", marginBottom:10 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
                      <div style={{ flex:1 }}>
                        <div style={{ fontWeight:600, fontSize:14 }}>{m.nickname || "참가자"}</div>
                        <div style={{ fontSize:12, color:"#888" }}>{m.days}일 참가 · {m.pct}% 달성</div>
                      </div>
                      <div style={{ display:"flex", gap:6 }}>
                        <button onClick={() => setLeader(selectedChallenge.id, m.id, m.role)}
                          style={{ padding:"4px 10px", borderRadius:8, border:"none", background: m.role==="leader" ? "#f4f4f2" : "#f0f0f0", color: m.role==="leader" ? "#111" : "#888", fontSize:12, fontWeight:600, cursor:"pointer" }}>
                          {m.role === "leader" ? "⭐ 리더" : "리더지정"}
                        </button>
                        {m.days >= 21 && !m.completion && (
                          <button onClick={() => confirmCompletion(selectedChallenge.id, m.user_id)}
                            style={{ padding:"4px 10px", borderRadius:8, border:"none", background:"#f4f4f2", color:"#111", fontSize:12, fontWeight:600, cursor:"pointer" }}>
                            🎁 완료확인
                          </button>
                        )}
                        {m.completion && (
                          <div style={{ padding:"4px 10px", borderRadius:8, background:"#fafaf7", color:"#111", fontSize:12, fontWeight:600 }}>🎁 선물완료</div>
                        )}
                      </div>
                    </div>
                    <div style={{ height:6, background:"#e6e6e8", borderRadius:3, overflow:"hidden" }}>
                      <div style={{ height:"100%", width:`${Math.min(m.days/21*100,100)}%`, background:"#E6C25A", borderRadius:3 }} />
                    </div>
                    <div style={{ fontSize:11, color:"#999", marginTop:4 }}>{m.days}/21일 완료</div>
                    {m.todayPhotos.length > 0 && (
                      <div style={{ display:"flex", gap:6, marginTop:8, overflowX:"auto" }}>
                        {m.todayPhotos.map((url, j) => (
                          <img key={j} src={url} alt="인증" style={{ width:70, height:70, borderRadius:8, objectFit:"cover", flexShrink:0 }} />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                {members.length === 0 && <div style={{ textAlign:"center", color:"#bbb", padding:"2rem" }}>아직 참가자가 없어요</div>}
              </div>
            )}

            {tab === "codes" && (
              <div>
                <button onClick={() => generateCode(selectedChallenge.id)}
                  style={{ width:"100%", padding:"12px", borderRadius:12, border:"1px solid #F2D27A", background:"#FADF96", color:"#4A3B00", fontWeight:600, fontSize:15, cursor:"pointer", marginBottom:16 }}>
                  + 새 초대 코드 생성
                </button>
                {codes.map(c => (
                  <div key={c.id} style={{ background:"#fafafa", borderRadius:12, padding:"1rem", marginBottom:8, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                    <div>
                      <div style={{ fontWeight:700, fontSize:18, letterSpacing:3, color: c.used_by ? "#bbb" : "#111" }}>{c.code}</div>
                      <div style={{ fontSize:12, color:"#888", marginTop:2 }}>{c.used_by ? "✓ 사용됨" : "미사용"}</div>
                    </div>
                    <button onClick={() => navigator.clipboard.writeText(c.code)}
                      style={{ padding:"6px 12px", borderRadius:8, border:"1px solid #ddd", background:"#fff", fontSize:12, cursor:"pointer" }}>복사</button>
                  </div>
                ))}
                {codes.length === 0 && <div style={{ textAlign:"center", color:"#bbb", padding:"2rem" }}>코드를 생성해보세요</div>}
              </div>
            )}

            {tab === "settings" && (
              <div>
                <div style={{ marginBottom:16 }}>
                  <div style={{ fontSize:13, color:"#888", marginBottom:6 }}>활성화 상태</div>
                  <button onClick={() => toggleActive(selectedChallenge)}
                    style={{ width:"100%", padding:"12px", borderRadius:12, border:"none", background: isActive(selectedChallenge) ? "#fee2e2" : "#f4f4f2", color: isActive(selectedChallenge) ? "#991b1b" : "#111", fontWeight:600, fontSize:15, cursor:"pointer" }}>
                    {isActive(selectedChallenge) ? "🔒 챌린지 비활성화" : "🔓 챌린지 활성화"}
                  </button>
                </div>
                <div style={{ background:"#fafafa", borderRadius:12, padding:"1rem" }}>
                  <div style={{ fontSize:13, color:"#888", marginBottom:4 }}>시작일</div>
                  <div style={{ fontWeight:600 }}>{selectedChallenge.start_date}</div>
                  <div style={{ fontSize:13, color:"#888", marginTop:8, marginBottom:4 }}>종료일</div>
                  <div style={{ fontWeight:600 }}>{selectedChallenge.end_date || "무기한"}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight:"100vh", background:"#fafafa" }}>
      <div style={{ maxWidth:480, margin:"0 auto", background:"#fff", minHeight:"100vh" }}>
        <div style={{ padding:"1.25rem", display:"flex", alignItems:"center", gap:12, borderBottom:"0.5px solid #e6e6e8" }}>
          <button onClick={onBack} style={{ background:"none", border:"none", fontSize:22, cursor:"pointer" }}>←</button>
          <div style={{ flex:1, fontWeight:700, fontSize:18 }}>👑 관리자 패널</div>
        </div>

        <div style={{ padding:"1rem 1.25rem" }}>
          {/* 챌린지 생성 */}
          <div style={{ background:"#fafafa", borderRadius:4, padding:"1.25rem", marginBottom:16 }}>
            <div style={{ fontWeight:700, marginBottom:12 }}>새 챌린지 열기</div>
            <div style={{ display:"flex", flexDirection:"column", gap:6, maxHeight:200, overflowY:"auto", marginBottom:12 }}>
              {ALL_CHALLENGES.map(c => (
                <button key={c.name} onClick={() => setSelectedTemplate(c)}
                  style={{ padding:"10px 14px", borderRadius:10, border:`2px solid ${selectedTemplate?.name === c.name ? "#111" : "#e6e6e8"}`, background: selectedTemplate?.name === c.name ? "#f4f4f2" : "#fff", textAlign:"left", cursor:"pointer", fontSize:14, fontWeight: selectedTemplate?.name === c.name ? 700 : 400, color: selectedTemplate?.name === c.name ? "#111" : "#333" }}>
                  {c.icon} {c.name}
                </button>
              ))}
            </div>
            <div style={{ display:"flex", gap:8, marginBottom:10 }}>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:12, color:"#888", marginBottom:4 }}>시작일</div>
                <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)}
                  style={{ width:"100%", padding:"8px", borderRadius:8, border:"1px solid #ddd", fontSize:14, boxSizing:"border-box" }} />
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:12, color:"#888", marginBottom:4 }}>종료일 (선택)</div>
                <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)}
                  style={{ width:"100%", padding:"8px", borderRadius:8, border:"1px solid #ddd", fontSize:14, boxSizing:"border-box" }} />
              </div>
            </div>
            <button onClick={createChallenge} disabled={!selectedTemplate || creating}
              style={{ width:"100%", padding:"12px", borderRadius:10, border:"none", background: selectedTemplate ? "#FADF96" : "#eee", color: selectedTemplate ? "#4A3B00" : "#999", fontWeight:600, fontSize:15, cursor: selectedTemplate ? "pointer" : "default" }}>
              {creating ? "생성 중..." : "챌린지 열기 🚀"}
            </button>
          </div>

          {/* 챌린지 목록 */}
          <div style={{ fontWeight:700, marginBottom:10 }}>진행 중인 챌린지</div>
          {loading ? <Spinner /> : challenges.map(c => (
            <div key={c.id} onClick={() => { setSelectedChallenge(c); setTab("members"); loadMembersForChallenge(c.id); }}
              style={{ background:"#fff", border:`1.5px solid ${isActive(c) ? "#111" : "#e6e6e8"}`, borderRadius:4, padding:"1rem 1.25rem", marginBottom:8, cursor:"pointer" }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:600, fontSize:14 }}>{c.name}</div>
                  <div style={{ fontSize:12, color:"#888", marginTop:2 }}>{c.start_date} ~ {c.end_date || "무기한"}</div>
                </div>
                <div style={{ padding:"4px 10px", borderRadius:4, background: isActive(c) ? "#f4f4f2" : "#f0f0f0", color: isActive(c) ? "#111" : "#888", fontSize:12, fontWeight:600 }}>
                  {isActive(c) ? "활성" : "비활성"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── 리더 패널 ─────────────────────────────────────────────────────────────────
function LeaderPanel({ userId, challenges, onBack }) {
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadMembers = async (challengeId) => {
    setLoading(true);
    const { data: memberList } = await supabase.from("challenge_members").select("*").eq("challenge_id", challengeId);
    const { data: records } = await supabase.from("daily_records").select("*").eq("challenge_id", challengeId);
    const { data: completions } = await supabase.from("completions").select("*").eq("challenge_id", challengeId);
    const enriched = (memberList || []).map(m => {
      const myRec = (records || []).filter(r => r.user_id === m.user_id);
      const totalDays = myRec.length;
      const pct = totalDays > 0 ? Math.round(myRec.reduce((a, r) => a + (r.completed_routines / (r.total_routines || 4)), 0) / totalDays * 100) : 0;
      const completion = (completions || []).find(c => c.user_id === m.user_id);
      const todayRec = myRec.find(r => r.record_date === getTodayStr());
      const todayPhotos = todayRec?.routine_photos ? Object.values(todayRec.routine_photos) : [];
      return { ...m, pct, days: totalDays, completion, todayPhotos };
    });
    setMembers(enriched);
    setLoading(false);
  };

  if (selectedChallenge) {
    return (
      <div style={{ minHeight:"100vh", background:"#fafafa" }}>
        <div style={{ maxWidth:480, margin:"0 auto", background:"#fff", minHeight:"100vh" }}>
          <div style={{ padding:"1.25rem", display:"flex", alignItems:"center", gap:12, borderBottom:"0.5px solid #e6e6e8" }}>
            <button onClick={() => setSelectedChallenge(null)} style={{ background:"none", border:"none", fontSize:22, cursor:"pointer" }}>←</button>
            <div style={{ fontWeight:700, fontSize:16 }}>{selectedChallenge.name}</div>
          </div>
          <div style={{ padding:"1rem 1.25rem" }}>
            <div style={{ fontWeight:600, marginBottom:12 }}>멤버 현황 ({members.length}명)</div>
            {loading ? <Spinner /> : members.map(m => (
              <div key={m.id} style={{ background:"#fafafa", borderRadius:4, padding:"1rem", marginBottom:10 }}>
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:600, fontSize:14 }}>{m.nickname || "참가자"}</div>
                    <div style={{ fontSize:12, color:"#888" }}>{m.days}일 참가 · {m.pct}% 달성</div>
                  </div>
                  {m.completion
                    ? <div style={{ padding:"4px 10px", borderRadius:8, background:"#fafaf7", color:"#111", fontSize:12, fontWeight:600 }}>🎁 완료</div>
                    : m.days >= 21 ? <div style={{ padding:"4px 10px", borderRadius:8, background:"#f4f4f2", color:"#111", fontSize:12, fontWeight:600 }}>✅ 21일달성</div>
                    : null
                  }
                </div>
                <div style={{ height:6, background:"#e6e6e8", borderRadius:3, overflow:"hidden" }}>
                  <div style={{ height:"100%", width:`${Math.min(m.days/21*100,100)}%`, background:"#E6C25A", borderRadius:3 }} />
                </div>
                <div style={{ fontSize:11, color:"#999", marginTop:4 }}>{m.days}/21일</div>
                {m.todayPhotos.length > 0 && (
                  <div style={{ display:"flex", gap:6, marginTop:8, overflowX:"auto" }}>
                    {m.todayPhotos.map((url, j) => (
                      <img key={j} src={url} alt="인증" style={{ width:70, height:70, borderRadius:8, objectFit:"cover", flexShrink:0 }} />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight:"100vh", background:"#fafafa" }}>
      <div style={{ maxWidth:480, margin:"0 auto", background:"#fff", minHeight:"100vh" }}>
        <div style={{ padding:"1.25rem", display:"flex", alignItems:"center", gap:12, borderBottom:"0.5px solid #e6e6e8" }}>
          <button onClick={onBack} style={{ background:"none", border:"none", fontSize:22, cursor:"pointer" }}>←</button>
          <div style={{ fontWeight:700, fontSize:18 }}>⭐ 리더 패널</div>
        </div>
        <div style={{ padding:"1rem 1.25rem" }}>
          {challenges.filter(c => isActive(c)).map(c => (
            <div key={c.id} onClick={() => { setSelectedChallenge(c); loadMembers(c.id); }}
              style={{ background:"#fff", border:"1.5px solid #111", borderRadius:4, padding:"1rem 1.25rem", marginBottom:8, cursor:"pointer" }}>
              <div style={{ fontWeight:600, fontSize:14 }}>{c.name}</div>
              <div style={{ fontSize:12, color:"#888", marginTop:2 }}>멤버 현황 보기 →</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── 루틴 홈 ──────────────────────────────────────────────────────────────────
function ChallengeHome({ challenge, userId }) {
  const baseRoutines = getRoutinesForChallenge(challenge.name);
  const [routines, setRoutines] = useState(baseRoutines.map(r => ({ ...r, done: false, photoUrl: null })));
  const [checkedIn, setCheckedIn] = useState(false);
  const [checkinTime, setCheckinTime] = useState(null);
  const [saving, setSaving] = useState(false);
  const [celebration, setCelebration] = useState(false);
  const [photoModal, setPhotoModal] = useState(null);
  const today = getTodayStr();

  useEffect(() => {
    supabase.from("daily_records").select("*")
      .eq("challenge_id", challenge.id).eq("user_id", userId).eq("record_date", today)
      .single().then(({ data }) => {
        if (data) {
          setCheckedIn(data.checked_in);
          if (data.checkin_time) setCheckinTime(data.checkin_time);
          const photos = data.routine_photos || {};
          setRoutines(prev => prev.map((r, i) => ({ ...r, done: i < data.completed_routines, photoUrl: photos[r.id] || null })));
        }
      });
  }, [challenge.id, userId, today]);

  const doneCount = routines.filter(r => r.done).length;
  const pct = Math.round((doneCount / routines.length) * 100);
  const elapsed = daysSince(challenge.start_date);
  const progress = Math.min(100, Math.round((elapsed / challenge.duration_days) * 100));

  const saveRecord = useCallback(async (updatedRoutines, ci, ciTime) => {
    setSaving(true);
    const done = updatedRoutines.filter(r => r.done).length;
    const photos = {};
    updatedRoutines.forEach(r => { if (r.photoUrl) photos[r.id] = r.photoUrl; });
    await supabase.from("daily_records").upsert({
      challenge_id: challenge.id, user_id: userId, record_date: today,
      completed_routines: done, total_routines: updatedRoutines.length,
      checked_in: ci, checkin_time: ciTime, routine_photos: photos,
    }, { onConflict: "challenge_id,user_id,record_date" });
    setSaving(false);
  }, [challenge.id, userId, today]);

  const toggleRoutine = (routine) => {
    const wasNotDone = !routine.done;
    const updated = routines.map(r => r.id === routine.id ? { ...r, done: !r.done } : r);
    setRoutines(updated);
    saveRecord(updated, checkedIn, checkinTime);
    if (wasNotDone) setTimeout(() => setPhotoModal(routine), 200);
    if (updated.every(r => r.done) && !celebration) {
      setCelebration(true);
      setTimeout(() => setCelebration(false), 3000);
    }
  };

  const handleCheckin = () => {
    const t = formatTime();
    setCheckedIn(true); setCheckinTime(t);
    saveRecord(routines, true, t);
  };

  const handlePhotoUploaded = (routineId, url) => {
    const updated = routines.map(r => r.id === routineId ? { ...r, photoUrl: url } : r);
    setRoutines(updated);
    saveRecord(updated, checkedIn, checkinTime);
  };

  return (
    <div>
      {celebration && (
        <div style={{ position:"fixed", top:20, left:"50%", transform:"translateX(-50%)", background:"#FADF96", color:"#4A3B00", padding:"12px 28px", borderRadius:4, fontWeight:700, zIndex:300, fontSize:16 }}>
          🎉 오늘의 루틴 완료!
        </div>
      )}
      {photoModal && (
        <PhotoModal routine={photoModal} userId={userId} challengeId={challenge.id} today={today}
          onClose={() => setPhotoModal(null)} onUploaded={handlePhotoUploaded} />
      )}

      <div className="mc-card2 y">
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline" }}>
          <div className="mc-eb">Progress · 진행</div>
          <div style={{ fontFamily:"var(--mc-mono)", fontSize:12, color:"#111" }}>{elapsed} / 21일 · {progress}%</div>
        </div>
        <div style={{ height:4, background:"rgba(230,194,90,.25)", marginTop:12, borderRadius:2, overflow:"hidden" }}>
          <div style={{ height:"100%", width:`${progress}%`, background:"#E6C25A", borderRadius:2 }} />
        </div>
      </div>

      <div className="mc-card2">
        <div className="mc-eb">Today · 오늘</div>
        <div style={{ fontSize:22, fontWeight:400, color:"#111", marginTop:8, letterSpacing:"-.01em" }}>{formatDate()}</div>
        {checkinTime
          ? <div style={{ fontFamily:"var(--mc-mono)", fontSize:12, color:"#55555a", marginTop:8, letterSpacing:".04em" }}>✓ {checkinTime} 기상 체크인</div>
          : <button className="mc-go" onClick={handleCheckin} style={{ marginTop:14, width:"100%" }}>기상 체크인</button>
        }
      </div>

      <div style={{ marginTop:30, marginBottom:4 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:12 }}>
          <span className="mc-eb">Routine · 오늘 루틴</span>
          <span style={{ fontFamily:"var(--mc-mono)", fontSize:12, color:"#111" }}>{doneCount} / {routines.length}</span>
        </div>
        <div style={{ height:4, background:"#F3F2EE", borderRadius:2, overflow:"hidden" }}>
          <div style={{ height:"100%", width:`${pct}%`, background:"#E6C25A", borderRadius:2, transition:"width 0.4s" }} />
        </div>
      </div>

      <div style={{ display:"flex", flexDirection:"column", borderTop:"1px solid #dcdcde", marginTop:14 }}>
        {routines.map((r, i) => (
          <div key={r.id} style={{ borderBottom:"1px solid #ececec" }}>
            <div style={{ background:"#fff", padding:"18px 6px", display:"flex", alignItems:"center", gap:12 }}>
              <div style={{ width:34, height:34, borderRadius:8, flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", background: r.done ? "#FFF8E1" : "#F6F5F1", color: r.done ? "#4A3B00" : "#8a8a90", fontFamily:"var(--mc-mono)", fontSize:12 }}>{String(i+1).padStart(2,"0")}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:500, fontSize:15.5, color: r.done ? "#9a9aa0" : "#2b2b2e", textDecoration: r.done ? "line-through" : "none", textDecorationColor:"#c4c4c8" }}>{r.name}</div>
                <div style={{ fontFamily:"var(--mc-mono)", fontSize:11.5, letterSpacing:".04em", color:"#9a9aa0", marginTop:5, display:"flex", gap:8 }}>
                  {r.duration}분
                  {r.done && !r.photoUrl && <span style={{ color:"#a8463a" }}>· 사진 미제출</span>}
                  {r.photoUrl && <span style={{ color:"#111" }}>· 인증 완료</span>}
                </div>
              </div>
              {r.done && !r.photoUrl && (
                <button onClick={() => setPhotoModal(r)} style={{ background:"#fff", border:"1px solid #dcdcde", borderRadius:8, padding:"7px 12px", fontSize:13, fontWeight:600, color:"#2b2b2e", cursor:"pointer", flexShrink:0 }}>사진 인증</button>
              )}
              <button onClick={() => toggleRoutine(r)} aria-label="완료" style={{ width:28, height:28, borderRadius:6, border:"none", background: r.done ? "#FADF96" : "transparent", outline: r.done ? "none" : "1px solid #c4c4c8", color:"#4A3B00", fontWeight:800, fontSize:15, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                {r.done ? "✓" : ""}
              </button>
            </div>
            {r.photoUrl && <img src={r.photoUrl} alt="인증" style={{ width:"100%", maxHeight:200, objectFit:"cover", display:"block", marginBottom:16 }} />}
          </div>
        ))}
      </div>
      {saving && <div style={{ textAlign:"center", color:"#999", fontSize:12, marginTop:12 }}>저장 중...</div>}
    </div>
  );
}

// ── 리더보드 ─────────────────────────────────────────────────────────────────
function Leaderboard({ challenge }) {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const today = getTodayStr();

  useEffect(() => {
    async function load() {
      setLoading(true);
      const { data: memberList } = await supabase.from("challenge_members").select("*").eq("challenge_id", challenge.id);
      const { data: records } = await supabase.from("daily_records").select("*").eq("challenge_id", challenge.id);
      const routines = getRoutinesForChallenge(challenge.name);
      const enriched = (memberList || []).map(m => {
        const myRec = (records || []).filter(r => r.user_id === m.user_id);
        const totalPct = myRec.length > 0 ? Math.round(myRec.reduce((a, r) => a + (r.completed_routines / (r.total_routines || routines.length)), 0) / myRec.length * 100) : 0;
        const todayRec = myRec.find(r => r.record_date === today);
        const todayPct = todayRec ? Math.round((todayRec.completed_routines / (todayRec.total_routines || routines.length)) * 100) : 0;
        const todayPhotos = todayRec?.routine_photos ? Object.values(todayRec.routine_photos) : [];
        let streak = 0;
        const dates = myRec.map(r => r.record_date).sort().reverse();
        const d = new Date(); d.setHours(0,0,0,0);
        for (let i = 0; i < 100; i++) {
          const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
          d.setDate(d.getDate() - 1);
          if (dates.includes(key)) streak++; else break;
        }
        return { ...m, totalPct, todayPct, streak, totalDays: myRec.length, todayPhotos };
      });
      enriched.sort((a, b) => b.totalPct - a.totalPct || b.streak - a.streak);
      setMembers(enriched);
      setLoading(false);
    }
    load();
  }, [challenge.id, today]);

  if (loading) return <Spinner />;
  const routines = getRoutinesForChallenge(challenge.name);

  return (
    <div>
      <div style={{ marginBottom:16 }}>
        <div className="mc-eb">Ranking · 순위</div>
        <div style={{ fontSize:13, color:"#8a8a90", marginTop:8 }}>전체 기간 달성률 기준</div>
      </div>
      {members.length === 0 && <div style={{ color:"#9a9aa0", padding:"2rem 0", fontSize:14 }}>아직 기록 없음</div>}
      {members.map((m, i) => (
        <div key={m.id} style={{ background: i===0 ? "#FFF8E1" : "#fff", border: i===0 ? "1px solid #F5E6B8" : "none", borderRadius: i===0 ? 8 : 0, borderBottom: i===0 ? "1px solid #F5E6B8" : "1px solid #ececec", padding: i===0 ? "18px 14px" : "18px 6px", marginBottom: i===0 ? 8 : 0 }}>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <div style={{ width:34, height:34, borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", background: i===0 ? "#FADF96" : "#F6F5F1", color: i===0 ? "#4A3B00" : "#8a8a90", fontFamily:"var(--mc-mono)", fontSize:12, fontWeight: i===0 ? 700 : 400 }}>{String(i+1).padStart(2,"0")}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontWeight:500, fontSize:15.5, color:"#2b2b2e" }}>{m.nickname || "참가자"}{m.role==="leader" ? " · 리더" : ""}</div>
              <div style={{ display:"flex", gap:8, marginTop:4, flexWrap:"wrap" }}>
                <span style={{ fontFamily:"var(--mc-mono)", fontSize:11.5, color:"#9a9aa0" }}>연속 {m.streak}일 · {m.totalDays}/21일 · 오늘 {m.todayPct}% · 사진 {m.todayPhotos.length}/{routines.length}</span>
              </div>
            </div>
            <div style={{ fontSize:20, fontWeight:400, color:"#111" }}>{m.totalPct}%</div>
          </div>
          {m.todayPhotos.length > 0 && (
            <div style={{ display:"flex", gap:6, marginTop:10, overflowX:"auto", paddingBottom:4 }}>
              {m.todayPhotos.map((url, j) => (
                <img key={j} src={url} alt="인증" style={{ width:90, height:90, borderRadius:10, objectFit:"cover", flexShrink:0 }} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ── 챌린지 정보 ──────────────────────────────────────────────────────────────
function ChallengeInfo({ challenge, onLeave }) {
  const [copied, setCopied] = useState(false);
  const inviteUrl = `${window.location.origin}?code=${challenge.invite_code}`;
  const copyLink = () => {
    navigator.clipboard.writeText(inviteUrl).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };
  return (
    <div>
      <div className="mc-eb">Info · 정보</div>
      <div className="mc-rows" style={{ marginTop:14 }}>
        <div className="mc-r" style={{ display:"flex", justifyContent:"space-between", padding:"18px 6px", fontSize:15 }}><span style={{ color:"#55555a" }}>총 기간</span><span style={{ fontFamily:"var(--mc-mono)", color:"#111" }}>21일</span></div>
        <div className="mc-r" style={{ display:"flex", justifyContent:"space-between", padding:"18px 6px", fontSize:15 }}><span style={{ color:"#55555a" }}>진행일</span><span style={{ fontFamily:"var(--mc-mono)", color:"#111" }}>{daysSince(challenge.start_date)}일째</span></div>
      </div>
      <div className="mc-sec">
        <div className="mc-eb">Invite · 친구 초대</div>
        <div className="mc-card2 y" style={{ marginTop:14 }}>
          <div style={{ fontFamily:"var(--mc-mono)", fontSize:11.5, letterSpacing:".1em", color:"#8d8d8d" }}>CODE</div>
          <div style={{ fontFamily:"var(--mc-mono)", fontSize:26, letterSpacing:6, color:"#111", marginTop:8 }}>{challenge.invite_code || "—"}</div>
        </div>
        <button className="mc-go" onClick={copyLink} style={{ width:"100%", marginTop:18 }}>{copied ? "링크 복사됨" : "초대 링크 복사"}</button>
      </div>
      <div style={{ marginTop:40, textAlign:"center" }}>
        <button className="mc-link" onClick={onLeave} style={{ color:"#a8463a" }}>챌린지 나가기</button>
      </div>
    </div>
  );
}

// ── 챌린지 상세 ──────────────────────────────────────────────────────────────
function ChallengeDetail({ challenge, userId, userRole, onBack }) {
  const [tab, setTab] = useState("home");
  const handleLeave = async () => {
    if (!window.confirm("챌린지에서 나가시겠어요?")) return;
    await supabase.from("challenge_members").delete().eq("challenge_id", challenge.id).eq("user_id", userId);
    onBack();
    window.location.reload();
  };
  const tabs = [{ key:"home", label:"루틴" }, { key:"board", label:"순위" }, { key:"info", label:"정보" }];

  return (
    <div style={{ minHeight:"100vh", background:"#fff" }}>
      <div style={{ maxWidth:720, margin:"0 auto", background:"#fff", minHeight:"100vh", display:"flex", flexDirection:"column" }}>
        <div style={{ padding:"1.5rem 22px 0", display:"flex", alignItems:"center", gap:14 }}>
          <button onClick={onBack} aria-label="뒤로" style={{ width:40, height:40, flexShrink:0, border:"1px solid #dcdcde", borderRadius:10, background:"#fff", cursor:"pointer", fontSize:16, color:"#111" }}>‹</button>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontWeight:500, fontSize:18, color:"#111", letterSpacing:"-.01em" }}>{challenge.name.replace(/^\d+\s*/, "")}</div>
            <div style={{ fontFamily:"var(--mc-mono)", fontSize:11.5, letterSpacing:".06em", color:"#9a9aa0", marginTop:3 }}>{daysSince(challenge.start_date)}일째 / 21일{userRole === "leader" ? " · 리더" : ""}</div>
          </div>
        </div>
        <div style={{ flex:1, overflowY:"auto", padding:"1.5rem 22px 6rem" }}>
          {tab === "home" && <ChallengeHome challenge={challenge} userId={userId} />}
          {tab === "board" && <Leaderboard challenge={challenge} />}
          {tab === "info" && <ChallengeInfo challenge={challenge} onLeave={handleLeave} />}
        </div>
        <div style={{ position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:720, background:"rgba(255,255,255,.96)", borderTop:"1px solid #dcdcde", display:"flex", justifyContent:"space-around", padding:"0 0 calc(10px + env(safe-area-inset-bottom))" }}>
          {tabs.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} style={{ background:"none", border:"none", cursor:"pointer", padding:"8px 18px", color: tab===t.key ? "#111" : "#9a9aa0", fontWeight: tab===t.key ? 700 : 500, fontSize:14, borderTop: tab===t.key ? "3px solid #E6C25A" : "3px solid transparent" }}>{t.label}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── 참가자 챌린지 목록 ────────────────────────────────────────────────────────
function ChallengeList({ userId, userEmail, onSelect, guest, onNeedLogin }) {
  const [myChallenges, setMyChallenges] = useState([]);
  const [allChallenges, setAllChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [code, setCode] = useState(new URLSearchParams(window.location.search).get("code") || "");
  const [nickname, setNickname] = useState("");
  const [codeError, setCodeError] = useState("");
  const [codeLoading, setCodeLoading] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showLeader, setShowLeader] = useState(false);
  const [openName, setOpenName] = useState("");
  const isAdmin = !guest && userEmail === ADMIN_EMAIL;

  const load = useCallback(async () => {
    setLoading(true);
    if (!guest) {
      const { data: memberships } = await supabase.from("challenge_members").select("challenge_id, role, challenges(*)").eq("user_id", userId);
      const myList = (memberships || []).map(m => ({ ...m.challenges, myRole: m.role })).filter(Boolean);
      setMyChallenges(myList);
    }

    const { data: all } = await supabase.from("challenges").select("*").order("start_date", { ascending: false });
    setAllChallenges(all || []);
    setLoading(false);
  }, [userId, guest]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => {
    const c = new URLSearchParams(window.location.search).get("code");
    if (c) { if (guest) onNeedLogin && onNeedLogin(); else setShowCodeInput(true); }
  }, [guest]); // eslint-disable-line react-hooks/exhaustive-deps

  const joinWithCode = async () => {
    if (!code.trim()) { setCodeError("코드를 입력해주세요"); return; }
    setCodeLoading(true); setCodeError("");
    const { data: activationCode } = await supabase.from("activation_codes").select("*, challenges(*)").eq("code", code.trim().toUpperCase()).single();
    if (!activationCode) { setCodeError("유효하지 않은 코드예요"); setCodeLoading(false); return; }
    const challenge = activationCode.challenges;
    if (!challenge) { setCodeError("챌린지를 찾을 수 없어요"); setCodeLoading(false); return; }
    if (!isActive(challenge)) { setCodeError("현재 진행 중인 챌린지가 아니에요"); setCodeLoading(false); return; }
    const already = myChallenges.find(c => c.id === challenge.id);
    if (already) { setCodeError("이미 참가한 챌린지예요"); setCodeLoading(false); return; }
    await supabase.from("challenge_members").insert({ challenge_id: challenge.id, user_id: userId, nickname: nickname.trim() || "참가자", role: "member" });
    await supabase.from("activation_codes").update({ use_count: (activationCode.use_count || 0) + 1 }).eq("id", activationCode.id);
    setShowCodeInput(false); setCode(""); setNickname("");
    window.history.replaceState({}, "", "/");
    load();
  };

  const isLeader = myChallenges.some(c => c.myRole === "leader");

  if (loading) return <Spinner />;
  if (showAdmin && isAdmin) return <AdminPanel userId={userId} onBack={() => { setShowAdmin(false); load(); }} />;
  if (showLeader) return <LeaderPanel userId={userId} challenges={allChallenges} onBack={() => setShowLeader(false)} />;

  const Arrow = () => (<svg className="mc-ar" viewBox="0 0 24 24" fill="none"><path d="M9.5 5.5L16 12l-6.5 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>);
  const shortName = n => n.replace(/^\d+\s*/, "");
  const liveCount = ALL_CHALLENGES.filter(c => { const o = allChallenges.find(ac => ac.name === c.name); return o && isActive(o); }).length;

  return (
    <div className="mc">
      <nav className="mc-nav">
        <span className="mk"><i />MIRACLE</span>
        {isLeader && <button onClick={() => setShowLeader(true)}>리더</button>}
        {isAdmin && <button onClick={() => setShowAdmin(true)}>관리</button>}
        {guest
          ? <button className="dk" onClick={onNeedLogin}>로그인</button>
          : <button onClick={() => supabase.auth.signOut()}>로그아웃</button>}
      </nav>

      <section className="mc-hero">
        <div className="mc-eb">Miracle Challenge</div>
        <h1 className="mc-h">21일 아로마 챌린지</h1>
        <p className="mc-lead">하루 루틴 · 사진 인증 · 함께 21일</p>
        <div className="mc-stats">
          <div><b>{ALL_CHALLENGES.length}</b><span>PROGRAMS</span></div>
          <div className={liveCount ? "y" : ""}><b>{liveCount}</b><span>진행 중</span></div>
          <div><b>21</b><span>DAYS</span></div>
        </div>
        <div className="mc-act">
          {!showCodeInput && (
            <button className="mc-go" onClick={() => guest ? onNeedLogin() : setShowCodeInput(true)}>코드로 참가하기</button>
          )}
        </div>
      </section>

      {showCodeInput && (
        <div className="mc-form">
          {codeError && <p className="mc-err">{codeError}</p>}
          <label className="mc-fld"><span>Code</span>
            <input value={code} onChange={e => setCode(e.target.value.toUpperCase())} placeholder="예: AB12CD34" style={{ letterSpacing:3 }} /></label>
          <label className="mc-fld"><span>Nickname</span>
            <input value={nickname} onChange={e => setNickname(e.target.value)} placeholder="닉네임 (선택)" /></label>
          <div className="mc-btns">
            <button className="mc-go" onClick={joinWithCode} disabled={codeLoading}>{codeLoading ? "확인 중..." : "참가하기"}</button>
            <button className="mc-sub" onClick={() => { setShowCodeInput(false); setCodeError(""); }}>취소</button>
          </div>
        </div>
      )}

      {myChallenges.length > 0 && (
        <div className="mc-sec">
          <div className="mc-sech"><div className="mc-eb">My Challenge · 내 챌린지</div><span>{myChallenges.length}</span></div>
          <div className="mc-mine">
            {myChallenges.map(c => {
              const elapsed = daysSince(c.start_date);
              const pct = Math.min(100, Math.round((elapsed / 21) * 100));
              const active = isActive(c);
              return (
                <div key={c.id} className={"mc-mc" + (active ? "" : " off")} onClick={() => active && onSelect(c, c.myRole)}>
                  <div className="nm"><b>{shortName(c.name)}</b>
                    <small>{active ? `${elapsed}일째 / 21일` : "종료"}{c.myRole === "leader" ? " · 리더" : ""}</small>
                    <span className="mc-bar"><i style={{ width:`${pct}%` }} /></span></div>
                  <div className="pc">{active ? `${pct}%` : ""}</div>
                  <button className="mc-x" aria-label="목록에서 지우기" onClick={async (e) => {
                    e.stopPropagation();
                    if (!window.confirm("챌린지 목록에서 삭제할까요?")) return;
                    await supabase.from("challenge_members").delete().eq("challenge_id", c.id).eq("user_id", userId);
                    load();
                  }}>✕</button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="mc-sec">
        <div className="mc-sech"><div className="mc-eb">Programs · 전체 챌린지</div><span>{ALL_CHALLENGES.length}</span></div>
        <div className="mc-grid">
          {ALL_CHALLENGES.map((c, i) => {
            const opened = allChallenges.find(ac => ac.name === c.name);
            const active = opened && isActive(opened);
            const joined = myChallenges.find(mc => mc.name === c.name);
            const isOpen = openName === c.name;
            const total = c.routines.reduce((a, r) => a + r.duration, 0);
            return (
              <div key={c.name} className={"mc-card" + (isOpen ? " open" : "") + (active ? " live" : "")}>
                <button className="mc-ch" onClick={() => setOpenName(isOpen ? "" : c.name)}>
                  <span className="mc-no">{String(i + 1).padStart(2, "0")}</span>
                  <span className="mc-cn"><b>{shortName(c.name)}</b>
                    <small><span className={"mc-chip" + (active ? " on" : opened ? " done" : "")}>{active ? "진행 중" : opened ? "종료" : "준비 중"}</span>
                      루틴 {c.routines.length} · 하루 {total}분{joined ? " · 참가중" : ""}</small></span>
                  <Arrow />
                </button>
                {isOpen && (
                  <div className="mc-rt">
                    <ul>{c.routines.map((r, j) => (<li key={r.id}><i>{String(j + 1).padStart(2, "0")}</i><span>{r.name}</span><em>{r.duration}분</em></li>))}</ul>
                    <p><span className="mc-chip">21일</span><span className="mc-chip">매일</span><span className="mc-chip">사진 인증</span></p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── 메인 ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [userRole, setUserRole] = useState("member");
  const [wantLogin, setWantLogin] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => { setSession(session); setLoading(false); });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, s) => { setSession(s); setLoading(false); });
    return () => subscription.unsubscribe();
  }, []);

  if (loading) return <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center" }}><Spinner /></div>;
  if (!session) {
    if (wantLogin) return <LoginScreen onBack={() => setWantLogin(false)} />;
    return <ChallengeList guest onNeedLogin={() => setWantLogin(true)} onSelect={() => {}} />;
  }
  if (selectedChallenge) return (
    <ChallengeDetail
      challenge={selectedChallenge}
      userId={session.user.id}
      userRole={userRole}
      onBack={() => setSelectedChallenge(null)}
    />
  );
  return (
    <ChallengeList
      userId={session.user.id}
      userEmail={session.user.email}
      onSelect={(c, role) => { setSelectedChallenge(c); setUserRole(role || "member"); }}
    />
  );
}
